// The Worker in front of allay.chat. Assets (scripts, styles, pictures) are dist/,
// answered by Cloudflare without running this script. wrangler.jsonc sends the
// pages here too (run_worker_first), only to add Spain's legal notice for
// visitors from Spain (withLegalNotice), to open the front page in the visitor's
// language (localeRedirect), to answer byte ranges of the videos (withRange), the
// jars under /download/ (download), and the backend's paths: the plugin's API, Telegram's webhook, and the admin
// panel. Those go to the origin, the Allay
// backend behind a Cloudflare Tunnel, as they came: method, headers, body, and
// the answer as a stream, so the chat's server-sent events reach the plugin
// token by token.

// The few binding members this file uses. Written out rather than pulled from
// @cloudflare/workers-types, which would drag the Workers globals into the
// React build's type check.
export interface Env {
  ASSETS: { fetch(request: Request): Promise<Response> }
  /** The backend's address, like https://origin.allay.chat; no trailing slash, no path. */
  ORIGIN: string
  /**
   * One line for visitors from Spain: the provider's name, tax id, address, and
   * email, as Spain's LSSI (Art. 10) asks. A Worker secret, never in the repository
   * or the built pages; without it nobody sees a notice.
   */
  LEGAL_NOTICE?: string
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

const escapeHtml = (text: string) =>
  text.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;')

/** The country Cloudflare saw the visitor in. */
function countryOf(request: Request): string | undefined {
  const cf = (request as Request & { cf?: { country?: string } }).cf
  return cf?.country ?? request.headers.get('cf-ipcountry') ?? undefined
}

/**
 * Adds LEGAL_NOTICE as the last line of an HTML page for visitors from Spain. The
 * line sits outside React's root, so hydration never touches it and nothing
 * flashes. With a notice set, every page varies by country and stays out of
 * shared caches, so one country's page never reaches another.
 */
export async function withLegalNotice(
  response: Response,
  request: Request,
  env: Env,
): Promise<Response> {
  const notice = env.LEGAL_NOTICE?.trim()
  if (!notice || !response.headers.get('content-type')?.includes('text/html')) return response
  const headers = new Headers(response.headers)
  const vary = headers.get('vary')
  headers.set('vary', vary ? `${vary}, cf-ipcountry` : 'cf-ipcountry')
  headers.set('cache-control', 'private, no-cache')
  // Without a validator the browser can't reuse a page made for another country.
  headers.delete('etag')
  headers.delete('last-modified')
  const init = { status: response.status, statusText: response.statusText, headers }
  if (countryOf(request) !== 'ES') return new Response(response.body, init)
  const html = await response.text()
  const line = `<p class="legal-notice" lang="es">${escapeHtml(notice)}</p>`
  const end = html.lastIndexOf('</body>')
  headers.delete('content-length')
  return new Response(end === -1 ? html + line : html.slice(0, end) + line + html.slice(end), init)
}

// Where a visitor's country speaks one of the front page's other languages, a
// visit to / from outside the site (a typed address, a bookmark, a search result)
// opens that language instead. A move inside the site, the switcher's English
// included, never redirects. Ukraine is left out on purpose.
const countryLocales: Record<string, 'ru' | 'es'> = {
  RU: 'ru',
  BY: 'ru',
  KZ: 'ru',
  KG: 'ru',
  ES: 'es',
  MX: 'es',
  AR: 'es',
  CO: 'es',
  CL: 'es',
  PE: 'es',
  VE: 'es',
  EC: 'es',
  GT: 'es',
  CU: 'es',
  BO: 'es',
  DO: 'es',
  HN: 'es',
  PY: 'es',
  SV: 'es',
  NI: 'es',
  CR: 'es',
  PA: 'es',
  UY: 'es',
  PR: 'es',
  GQ: 'es',
}

function fromThisSite(request: Request, host: string): boolean {
  const site = request.headers.get('sec-fetch-site')
  if (site === 'same-origin' || site === 'same-site') return true
  const referer = request.headers.get('referer')
  if (!referer) return false
  try {
    return new URL(referer).host === host
  } catch {
    return false
  }
}

/** A redirect from / to /<locale>/ for a visitor from a country of that language, or null. */
export function localeRedirect(request: Request): Response | null {
  if (request.method !== 'GET' && request.method !== 'HEAD') return null
  const url = new URL(request.url)
  if (url.pathname !== '/' || fromThisSite(request, url.host)) return null
  const locale = countryLocales[countryOf(request) ?? '']
  if (!locale) return null
  return new Response(null, {
    status: 302,
    headers: {
      location: `/${locale}/${url.search}`,
      'cache-control': 'private, no-store',
      vary: 'cf-ipcountry, sec-fetch-site, referer',
    },
  })
}

/**
 * Answers a byte range of a video. Safari asks for ranges and stops a looping
 * video at its end when it gets the whole file back instead; the static assets
 * answer the whole file, so the Worker cuts the range out itself. The videos
 * are under a megabyte.
 */
export async function withRange(response: Response, request: Request): Promise<Response> {
  const type = response.headers.get('content-type') ?? ''
  if (response.status !== 200 || !type.startsWith('video/')) return response
  const headers = new Headers(response.headers)
  headers.set('accept-ranges', 'bytes')
  const range = request.headers.get('range')?.match(/^bytes=(\d*)-(\d*)$/)
  if (!range || (range[1] === '' && range[2] === '')) {
    return new Response(response.body, { status: 200, headers })
  }
  // A HEAD answer carries no body, only the whole file's length.
  const body = request.method === 'HEAD' ? null : await response.arrayBuffer()
  const size = body ? body.byteLength : Number(response.headers.get('content-length'))
  if (!Number.isFinite(size) || size <= 0) return new Response(null, { status: 200, headers })
  let start: number
  let end: number
  if (range[1] === '') {
    // bytes=-N: the last N bytes.
    start = Math.max(0, size - Number(range[2]))
    end = size - 1
  } else {
    start = Number(range[1])
    end = range[2] === '' ? size - 1 : Math.min(Number(range[2]), size - 1)
  }
  headers.delete('content-length')
  if (start >= size || start > end) {
    headers.set('content-range', `bytes */${size}`)
    return new Response(null, { status: 416, headers })
  }
  headers.set('content-range', `bytes ${start}-${end}/${size}`)
  headers.set('content-length', String(end - start + 1))
  const part = body ? body.slice(start, end + 1) : null
  return new Response(part, { status: 206, headers })
}

// The plugin's and the mods' jars, as allay.chat/download/allay-<platform>.jar
// for the latest release and allay-<platform>-X.Y.Z.jar for one version. GitHub
// answers its own download links with a redirect whose headers outgrow what
// itzg/minecraft-server's downloader accepts (itzg/mc-image-helper#913), so the
// Worker follows it and hands the jar over itself, with small headers.
const releases = 'https://github.com/allay-ai/minecraft/releases'
const jarPath = /^\/download\/(allay-(?:spigot|fabric|neoforge)(?:-(\d+\.\d+\.\d+))?\.jar)$/

/** The GitHub address of a jar under /download/, or null for any other path. */
export function releaseAsset(pathname: string): string | null {
  const match = pathname.match(jarPath)
  if (!match) return null
  const [, name, version] = match
  return version
    ? `${releases}/download/v${version}/${name}`
    : `${releases}/latest/download/${name}`
}

/** The jar from GitHub, cached at the edge: a version for a day, the latest for five minutes. */
export async function download(request: Request, asset: string): Promise<Response> {
  const name = asset.slice(asset.lastIndexOf('/') + 1)
  if (request.method !== 'GET' && request.method !== 'HEAD') {
    return new Response('Only GET and HEAD.', { status: 405, headers: { allow: 'GET, HEAD' } })
  }
  const pinned = !asset.includes('/latest/')
  const ttl = pinned ? 86_400 : 300
  let response: Response
  try {
    const init = {
      method: request.method,
      redirect: 'follow',
      cf: { cacheEverything: true, cacheTtl: ttl },
    }
    response = await fetch(new Request(asset, init as RequestInit))
  } catch {
    response = new Response(null, { status: 502 })
  }
  if (!response.ok) {
    const status = response.status === 404 ? 404 : 502
    const text =
      status === 404
        ? `No ${name} in Allay's releases.`
        : 'GitHub is unreachable. Try again in a minute.'
    return new Response(text, {
      status,
      headers: { 'content-type': 'text/plain; charset=utf-8', 'cache-control': 'no-store' },
    })
  }
  const headers = new Headers({
    'content-type': 'application/java-archive',
    'content-disposition': `attachment; filename="${name}"`,
    'cache-control': `public, max-age=${ttl}`,
  })
  const length = response.headers.get('content-length')
  if (length) headers.set('content-length', length)
  return new Response(request.method === 'HEAD' ? null : response.body, { status: 200, headers })
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url)
    const asset = releaseAsset(url.pathname)
    if (asset) return download(request, asset)
    if (!isBackendPath(url.pathname)) {
      const redirect = localeRedirect(request)
      if (redirect) return redirect
      const response = await withRange(await env.ASSETS.fetch(request), request)
      return withLegalNotice(response, request, env)
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
