// The Worker in front of allay.chat. Every page and asset is dist/, answered by
// Cloudflare without running this script. wrangler.jsonc sends only the
// backend's paths here (run_worker_first): the plugin's API, Telegram's webhook,
// and the admin panel. They go to the origin, the Allay backend behind a
// Cloudflare Tunnel, as they came: method, headers, body, and the answer as a
// stream, so the chat's server-sent events reach the plugin token by token.

// The few binding members this file uses. Written out rather than pulled from
// @cloudflare/workers-types, which would drag the Workers globals into the
// React build's type check.
export interface Env {
  ASSETS: { fetch(request: Request): Promise<Response> }
  /** The backend's address, like https://origin.allay.chat; no trailing slash, no path. */
  ORIGIN: string
}

/** Paths that belong to the backend; wrangler.jsonc's run_worker_first lists the same. */
export function isBackendPath(pathname: string): boolean {
  return (
    pathname === '/api' ||
    pathname.startsWith('/api/') ||
    pathname === '/admin' ||
    pathname.startsWith('/admin/')
  )
}

// Hop-by-hop headers belong to one connection, never to the next (RFC 9110,
// 7.6.1), plus whatever a Connection header names.
const hopByHop = [
  'connection',
  'keep-alive',
  'proxy-authenticate',
  'proxy-authorization',
  'proxy-connection',
  'te',
  'trailer',
  'transfer-encoding',
  'upgrade',
]

function stripHopByHop(headers: Headers): Headers {
  const named = (headers.get('connection') ?? '')
    .split(',')
    .map((name) => name.trim().toLowerCase())
    .filter(Boolean)
  for (const name of [...hopByHop, ...named]) headers.delete(name)
  return headers
}

/** The request as the origin should see it. */
export function originRequest(request: Request, origin: string): Request {
  const incoming = new URL(request.url)
  const target = new URL(`${incoming.pathname}${incoming.search}`, origin)
  const headers = stripHopByHop(new Headers(request.headers))
  // fetch() sets Host from the target; allay.chat's would send it astray.
  headers.delete('host')

  // The backend reads who asked from a forwarding header (its CLIENT_IP_HEADER
  // and TRUSTED_PROXIES settings). Cloudflare puts the visitor's address in
  // CF-Connecting-IP; whatever a client wrote into the others is replaced, so
  // nobody can claim another address through them.
  const client = request.headers.get('cf-connecting-ip')
  headers.delete('x-forwarded-for')
  headers.delete('x-real-ip')
  if (client) {
    headers.set('x-forwarded-for', client)
    headers.set('x-real-ip', client)
  }
  // The panel builds links and checks Origin against the address the browser
  // used, which is allay.chat, not the origin's own host name.
  headers.set('x-forwarded-host', incoming.host)
  headers.set('x-forwarded-proto', incoming.protocol.replace(':', ''))

  const hasBody = request.method !== 'GET' && request.method !== 'HEAD'
  const init: RequestInit & { duplex?: 'half' } = {
    method: request.method,
    headers,
    // Streamed through, never read: a large or slow upload costs no memory here.
    body: hasBody ? request.body : null,
    // A redirect goes back to the browser or the plugin, which follow it
    // themselves, after its Location is rewritten below.
    redirect: 'manual',
  }
  // Node's fetch, which the tests run on, wants this for a streamed body;
  // Workers ignore it.
  if (hasBody) init.duplex = 'half'
  return new Request(target, init)
}

/** The origin's answer as the client should see it. The body is never read. */
export function clientResponse(response: Response, origin: string, publicOrigin: string): Response {
  const headers = stripHopByHop(new Headers(response.headers))
  const location = headers.get('location')
  if (location?.startsWith(origin)) {
    headers.set('location', `${publicOrigin}${location.slice(origin.length)}`)
  }
  // Any proxy on the way must pass events on at once, not collect them.
  if (headers.get('content-type')?.startsWith('text/event-stream')) {
    headers.set('cache-control', 'no-cache, no-transform')
    headers.set('x-accel-buffering', 'no')
  }
  return new Response(response.body, {
    status: response.status,
    statusText: response.statusText,
    headers,
  })
}

// The plugin asks again, up to 3 times, after a 502, 503, or 504 that carries
// no error body of the backend's (allay-ai/minecraft, Retry.kt). Cloudflare
// reports an unreachable origin as 520–530 instead, which the plugin wouldn't
// retry, so those become a plain 502. The backend's own errors are JSON and
// pass untouched.
function unreachable(): Response {
  return new Response('The Allay backend is restarting or unreachable. Try again in a minute.', {
    status: 502,
    headers: {
      'content-type': 'text/plain; charset=utf-8',
      'cache-control': 'no-store',
      'retry-after': '15',
    },
  })
}

function isCloudflareOriginError(response: Response): boolean {
  return (
    response.status >= 520 &&
    response.status <= 530 &&
    !response.headers.get('content-type')?.includes('application/json')
  )
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url)
    if (!isBackendPath(url.pathname)) {
      return env.ASSETS.fetch(request)
    }
    const origin = env.ORIGIN.replace(/\/+$/, '')
    let response: Response
    try {
      response = await fetch(originRequest(request, origin))
    } catch {
      return unreachable()
    }
    if (isCloudflareOriginError(response)) {
      return unreachable()
    }
    return clientResponse(response, origin, url.origin)
  },
}
