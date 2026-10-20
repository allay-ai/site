// Run with `pnpm test` (node --test). Node runs this TypeScript as it is and
// provides the same fetch, Request, and Response the Worker gets.

import assert from 'node:assert/strict'
import { afterEach, describe, it } from 'node:test'
import worker, { clientResponse, type Env, isBackendPath, originRequest } from './index.ts'

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
