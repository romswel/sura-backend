import test from 'node:test'
import assert from 'node:assert/strict'
import { request } from 'node:http'
import type { AddressInfo } from 'node:net'
import { createHttpServer } from '../src/http-server.ts'

test('shared HTTP transport preserves query routing, HEAD, methods, and error headers', async () => {
  const server = createHttpServer()
  await new Promise<void>((resolve) => server.listen(0, '127.0.0.1', resolve))
  const port = (server.address() as AddressInfo).port
  const origin = 'http://127.0.0.1:' + port
  try {
    const health = await fetch(origin + '/api/health?probe=release')
    assert.equal(health.status, 200)
    assert.equal((await health.json()).integrations.inquiries, 'not-configured')
    const head = await fetch(origin + '/api/health', { method: 'HEAD' })
    assert.equal(head.status, 200)
    assert.equal(await head.text(), '')
    const denied = await fetch(origin + '/api/health', { method: 'POST' })
    assert.equal(denied.status, 405)
    assert.equal(denied.headers.get('allow'), 'GET, HEAD')
    const missing = await fetch(origin + '/api/inquiries', { method: 'POST' })
    assert.equal(missing.status, 404)
    for (const response of [health, head, denied, missing]) {
      assert.equal(response.headers.get('cache-control'), 'no-store')
      assert.equal(response.headers.get('x-content-type-options'), 'nosniff')
      assert.equal(response.headers.get('referrer-policy'), 'no-referrer')
    }
    const invalid = await new Promise<{
      status: number | undefined
      headers: import('node:http').IncomingHttpHeaders
      body: string
    }>((resolve, reject) => {
      const req = request({ hostname: '127.0.0.1', port, path: 'http://[' }, (response) => {
        let body = ''
        response.setEncoding('utf8')
        response.on('data', (chunk) => {
          body += chunk
        })
        response.on('end', () =>
          resolve({ status: response.statusCode, headers: response.headers, body }),
        )
        response.on('error', reject)
      })
      req.on('error', reject)
      req.end()
    })
    assert.equal(invalid.status, 400)
    assert.deepEqual(JSON.parse(invalid.body), { error: 'Invalid request' })
    assert.equal(invalid.headers['cache-control'], 'no-store')
    assert.equal(invalid.headers['x-content-type-options'], 'nosniff')
    assert.equal(invalid.headers['referrer-policy'], 'no-referrer')
  } finally {
    server.closeAllConnections()
    await new Promise<void>((resolve, reject) =>
      server.close((error) => (error ? reject(error) : resolve())),
    )
  }
})
