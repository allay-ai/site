// Run with `pnpm test` (node --test). Node runs this TypeScript as it is and
// provides the same fetch, Request, and Response the Worker gets.

import assert from 'node:assert/strict'
import { afterEach, describe, it } from 'node:test'
import worker, {
  clientResponse,
  type Env,
  isBackendPath,
  localeRedirect,
  originRequest,
  releaseAsset,
  withLegalNotice,
  withRange,
} from './index.ts'

const origin = 'https://origin.allay.chat'

function env(): Env & { assetPaths: string[] } {
  const assetPaths: string[] = []
  return {
    ORIGIN: `${origin}/`,
    assetPaths,
    ASSETS: {
      async fetch(request: Request) {
        assetPaths.push(new URL(request.url).pathname)
        return new Response('asset')
      },
    },
  }
}

const realFetch = globalThis.fetch
afterEach(() => {
  globalThis.fetch = realFetch
})

/** Replaces fetch with a handler and returns the requests it saw. */
function stubOrigin(handler: (request: Request) => Response | Promise<Response>): Request[] {
  const seen: Request[] = []
  globalThis.fetch = (async (input: RequestInfo | URL) => {
    const request = input as Request
    seen.push(request)
    return handler(request)
  }) as typeof fetch
  return seen
}

describe('isBackendPath', () => {
  it('takes the API and the admin panel', () => {
    for (const path of [
      '/api',
      '/api/health',
      '/api/v2/chat',
      '/api/telegram/webhook',
      '/admin',
      '/admin/',
      '/admin/settings',
    ]) {
      assert.equal(isBackendPath(path), true, path)
    }
  })

  it('leaves pages alone', () => {
    for (const path of ['/', '/wiki/', '/apis', '/administration', '/ru/', '/assets/x.js']) {
      assert.equal(isBackendPath(path), false, path)
    }
  })
})

describe('releaseAsset', () => {
  it('maps the latest jar and a pinned one to GitHub', () => {
    assert.equal(
      releaseAsset('/download/allay-fabric.jar'),
      'https://github.com/allay-ai/minecraft/releases/latest/download/allay-fabric.jar',
    )
    assert.equal(
      releaseAsset('/download/allay-spigot-6.11.0.jar'),
      'https://github.com/allay-ai/minecraft/releases/download/v6.11.0/allay-spigot-6.11.0.jar',
    )
  })

  it('takes nothing else', () => {
    for (const path of [
      '/download/',
      '/download/allay-forge.jar',
      '/download/../x.jar',
      '/download/allay-spigot.jar/x',
    ]) {
      assert.equal(releaseAsset(path), null, path)
    }
  })
})

describe('download', () => {
  it('follows GitHub itself and answers with the jar and small headers', async () => {
    const seen = stubOrigin(
      () =>
        new Response('jar bytes', {
          headers: { 'content-length': '9', 'set-cookie': 'logged_in=no' },
        }),
    )
    const response = await worker.fetch(
      new Request('https://allay.chat/download/allay-neoforge.jar'),
      env(),
    )
    assert.equal(response.status, 200)
    assert.equal(await response.text(), 'jar bytes')
    assert.equal(response.headers.get('content-type'), 'application/java-archive')
    assert.equal(
      response.headers.get('content-disposition'),
      'attachment; filename="allay-neoforge.jar"',
    )
    assert.equal(response.headers.get('content-length'), '9')
    assert.equal(response.headers.get('set-cookie'), null)
    assert.equal(
      seen[0].url,
      'https://github.com/allay-ai/minecraft/releases/latest/download/allay-neoforge.jar',
    )
    assert.equal(seen[0].redirect, 'follow')
  })

  it('says 404 for a version GitHub doesn’t have', async () => {
    stubOrigin(() => new Response('Not Found', { status: 404 }))
    const response = await worker.fetch(
      new Request('https://allay.chat/download/allay-spigot-1.0.0.jar'),
      env(),
    )
    assert.equal(response.status, 404)
    assert.equal(response.headers.get('cache-control'), 'no-store')
  })

  it('refuses anything but GET and HEAD', async () => {
    stubOrigin(() => new Response('jar'))
    const response = await worker.fetch(
      new Request('https://allay.chat/download/allay-spigot.jar', { method: 'POST' }),
      env(),
    )
    assert.equal(response.status, 405)
  })
})

describe('originRequest', () => {
  it('keeps method, path, query, body, and headers, and sets the forwarding ones', async () => {
    const incoming = new Request('https://allay.chat/api/v2/chat?x=1', {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        authorization: 'Bearer license',
        'cf-connecting-ip': '203.0.113.7',
        'x-forwarded-for': '10.0.0.1',
        'x-real-ip': '10.0.0.2',
        connection: 'keep-alive, x-private',
        'x-private': 'secret',
        'keep-alive': 'timeout=5',
      },
      body: '{"message":"hi"}',
    })
    const out = originRequest(incoming, origin)
    assert.equal(out.url, `${origin}/api/v2/chat?x=1`)
    assert.equal(out.method, 'POST')
    assert.equal(out.redirect, 'manual')
    assert.equal(await out.text(), '{"message":"hi"}')
    assert.equal(out.headers.get('authorization'), 'Bearer license')
    assert.equal(out.headers.get('content-type'), 'application/json')
    assert.equal(out.headers.get('x-forwarded-for'), '203.0.113.7')
    assert.equal(out.headers.get('x-real-ip'), '203.0.113.7')
    assert.equal(out.headers.get('x-forwarded-host'), 'allay.chat')
    assert.equal(out.headers.get('x-forwarded-proto'), 'https')
    assert.equal(out.headers.get('keep-alive'), null)
    assert.equal(out.headers.get('x-private'), null)
  })

  it('drops forwarding headers a client made up when Cloudflare names no address', () => {
    const out = originRequest(
      new Request('https://allay.chat/admin', { headers: { 'x-forwarded-for': '1.2.3.4' } }),
      origin,
    )
    assert.equal(out.headers.get('x-forwarded-for'), null)
    assert.equal(out.headers.get('x-real-ip'), null)
  })
})

describe('clientResponse', () => {
  it('points redirects to the origin back at allay.chat', () => {
    const response = clientResponse(
      new Response(null, { status: 302, headers: { location: `${origin}/admin/login` } }),
      origin,
      'https://allay.chat',
    )
    assert.equal(response.status, 302)
    assert.equal(response.headers.get('location'), 'https://allay.chat/admin/login')
  })

  it('marks event streams as not to be buffered', () => {
    const response = clientResponse(
      new Response('data: x\n\n', { headers: { 'content-type': 'text/event-stream' } }),
      origin,
      'https://allay.chat',
    )
    assert.equal(response.headers.get('cache-control'), 'no-cache, no-transform')
  })
})

describe('fetch', () => {
  it('serves pages from the assets without touching the origin', async () => {
    const seen = stubOrigin(() => new Response('origin'))
    const bindings = env()
    const response = await worker.fetch(new Request('https://allay.chat/wiki/'), bindings)
    assert.equal(await response.text(), 'asset')
    assert.deepEqual(bindings.assetPaths, ['/wiki/'])
    assert.equal(seen.length, 0)
  })

  it('passes the origin’s status and JSON errors through', async () => {
    stubOrigin(() =>
      Response.json({ error: { code: 'QUEUE_ERROR', message: 'busy' } }, { status: 503 }),
    )
    const response = await worker.fetch(
      new Request('https://allay.chat/api/v2/chat', { method: 'POST', body: '{}' }),
      env(),
    )
    assert.equal(response.status, 503)
    assert.deepEqual(await response.json(), { error: { code: 'QUEUE_ERROR', message: 'busy' } })
  })

  it('turns an unreachable origin into a plain 502 the plugin retries', async () => {
    stubOrigin(
      () =>
        new Response('<html>1033</html>', {
          status: 530,
          headers: { 'content-type': 'text/html' },
        }),
    )
    const response = await worker.fetch(new Request('https://allay.chat/api/health'), env())
    assert.equal(response.status, 502)
    assert.match(response.headers.get('content-type') ?? '', /text\/plain/)

    stubOrigin(() => {
      throw new TypeError('fetch failed')
    })
    const failed = await worker.fetch(new Request('https://allay.chat/api/health'), env())
    assert.equal(failed.status, 502)
  })

  it('streams an event stream chunk by chunk', async () => {
    const encoder = new TextEncoder()
    let release: () => void = () => {}
    const secondChunk = new Promise<void>((resolve) => {
      release = resolve
    })
    stubOrigin(
      () =>
        new Response(
          new ReadableStream({
            async start(controller) {
              controller.enqueue(encoder.encode('event: text\ndata: "Hel"\n\n'))
              await secondChunk
              controller.enqueue(encoder.encode('event: text\ndata: "lo"\n\n'))
              controller.close()
            },
          }),
          { headers: { 'content-type': 'text/event-stream' } },
        ),
    )
    const response = await worker.fetch(
      new Request('https://allay.chat/api/v2/chat', { method: 'POST', body: '{}' }),
      env(),
    )
    const reader = (response.body as ReadableStream<Uint8Array>).getReader()
    const decoder = new TextDecoder()
    // The first event arrives while the origin still holds the second back.
    const first = await reader.read()
    assert.equal(decoder.decode(first.value), 'event: text\ndata: "Hel"\n\n')
    release()
    const second = await reader.read()
    assert.equal(decoder.decode(second.value), 'event: text\ndata: "lo"\n\n')
    assert.equal((await reader.read()).done, true)
  })
})

describe('withLegalNotice', () => {
  const page = () =>
    new Response('<html><body><div id="root">page</div></body></html>', {
      headers: { 'content-type': 'text/html; charset=utf-8', etag: '"abc"' },
    })
  const from = (country: string) =>
    new Request('https://allay.chat/privacy/', { headers: { 'cf-ipcountry': country } })
  const withNotice = { ...env(), LEGAL_NOTICE: 'Name <Surname>, NIE X0000000X, Street 1, Madrid' }

  it('adds the escaped line at the end of the page for visitors from Spain', async () => {
    const response = await withLegalNotice(page(), from('ES'), withNotice)
    const html = await response.text()
    assert.match(
      html,
      /<\/div><p class="legal-notice" lang="es">Name &lt;Surname&gt;, NIE X0000000X, Street 1, Madrid<\/p><\/body>/,
    )
    assert.equal(response.headers.get('cache-control'), 'private, no-cache')
    assert.equal(response.headers.get('vary'), 'cf-ipcountry')
    assert.equal(response.headers.get('etag'), null)
  })

  it('leaves the page alone for other countries, but keeps it out of shared caches', async () => {
    const response = await withLegalNotice(page(), from('FR'), withNotice)
    assert.doesNotMatch(await response.text(), /legal-notice/)
    assert.equal(response.headers.get('vary'), 'cf-ipcountry')
    assert.equal(response.headers.get('cache-control'), 'private, no-cache')
  })

  it('shows nothing and changes nothing without the secret', async () => {
    const original = page()
    const response = await withLegalNotice(original, from('ES'), env())
    assert.equal(response, original)
    assert.doesNotMatch(await response.text(), /legal-notice/)
  })

  it('never touches what isn\u2019t a page', async () => {
    const script = new Response('x', { headers: { 'content-type': 'text/javascript' } })
    assert.equal(await withLegalNotice(script, from('ES'), withNotice), script)
  })

  it('adds it to pages the Worker serves from the assets', async () => {
    const pages = {
      ...withNotice,
      ASSETS: { fetch: async () => page() },
    }
    const response = await worker.fetch(from('ES'), pages)
    assert.match(await response.text(), /legal-notice/)
  })
})

describe('localeRedirect', () => {
  const visit = (country: string, headers: Record<string, string> = {}, path = '/') =>
    new Request(`https://allay.chat${path}`, {
      headers: { 'cf-ipcountry': country, 'sec-fetch-site': 'none', ...headers },
    })

  it('opens the Russian page for a visitor from Russia', () => {
    const response = localeRedirect(visit('RU'))
    assert.equal(response?.status, 302)
    assert.equal(response?.headers.get('location'), '/ru/')
    assert.equal(response?.headers.get('cache-control'), 'private, no-store')
  })

  it('opens the Spanish page for Spain and Latin America, keeping the query', () => {
    assert.equal(localeRedirect(visit('ES'))?.headers.get('location'), '/es/')
    assert.equal(
      localeRedirect(
        new Request('https://allay.chat/?ref=x', { headers: { 'cf-ipcountry': 'MX' } }),
      )?.headers.get('location'),
      '/es/?ref=x',
    )
  })

  it('leaves other countries, Ukraine included, on the English page', () => {
    assert.equal(localeRedirect(visit('US')), null)
    assert.equal(localeRedirect(visit('UA')), null)
    assert.equal(localeRedirect(new Request('https://allay.chat/')), null)
  })

  it('never redirects a move inside the site, or any page but /', () => {
    assert.equal(localeRedirect(visit('RU', { 'sec-fetch-site': 'same-origin' })), null)
    assert.equal(localeRedirect(visit('RU', { referer: 'https://allay.chat/ru/' })), null)
    assert.equal(localeRedirect(visit('RU', {}, '/wiki/')), null)
    assert.equal(localeRedirect(visit('RU', {}, '/es/')), null)
  })

  it('runs before the assets in the Worker', async () => {
    const bindings = env()
    const response = await worker.fetch(visit('BY'), bindings)
    assert.equal(response.status, 302)
    assert.deepEqual(bindings.assetPaths, [])
  })
})

describe('withRange', () => {
  const video = () =>
    new Response(new Uint8Array([0, 1, 2, 3, 4, 5, 6, 7, 8, 9]), {
      headers: { 'content-type': 'video/mp4', 'content-length': '10' },
    })
  const asking = (range?: string) =>
    new Request('https://allay.chat/shots/en/status.mp4', {
      headers: range ? { range } : {},
    })

  it('answers a range with 206 and just those bytes', async () => {
    const response = await withRange(video(), asking('bytes=2-4'))
    assert.equal(response.status, 206)
    assert.equal(response.headers.get('content-range'), 'bytes 2-4/10')
    assert.equal(response.headers.get('content-length'), '3')
    assert.deepEqual([...new Uint8Array(await response.arrayBuffer())], [2, 3, 4])
  })

  it('answers open and suffix ranges', async () => {
    const open = await withRange(video(), asking('bytes=7-'))
    assert.equal(open.headers.get('content-range'), 'bytes 7-9/10')
    const suffix = await withRange(video(), asking('bytes=-3'))
    assert.deepEqual([...new Uint8Array(await suffix.arrayBuffer())], [7, 8, 9])
  })

  it('answers a HEAD range from the length alone', async () => {
    const head = new Response(null, {
      headers: { 'content-type': 'video/mp4', 'content-length': '10' },
    })
    const request = new Request('https://allay.chat/shots/en/status.mp4', {
      method: 'HEAD',
      headers: { range: 'bytes=0-4' },
    })
    const response = await withRange(head, request)
    assert.equal(response.status, 206)
    assert.equal(response.headers.get('content-range'), 'bytes 0-4/10')
  })

  it('refuses a range past the end with 416', async () => {
    const response = await withRange(video(), asking('bytes=20-30'))
    assert.equal(response.status, 416)
    assert.equal(response.headers.get('content-range'), 'bytes */10')
  })

  it('says it takes ranges on a whole answer, and leaves pages alone', async () => {
    const whole = await withRange(video(), asking())
    assert.equal(whole.status, 200)
    assert.equal(whole.headers.get('accept-ranges'), 'bytes')
    const page = new Response('x', { headers: { 'content-type': 'text/html' } })
    assert.equal(await withRange(page, asking('bytes=0-1')), page)
  })
})
