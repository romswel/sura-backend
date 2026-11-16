import test from 'node:test'
import assert from 'node:assert/strict'
import { handleRequest } from '../src/app.ts'

test('health distinguishes process availability from unconfigured integrations', () => {
  const response = handleRequest('GET', '/api/health')
  assert.equal(response.status, 200)
  const health = JSON.parse(response.body)
  assert.equal(health.status, 'ok')
  assert.equal(health.integrations.database, 'not-configured')
  assert.equal(health.integrations.inquiries, 'not-configured')
  assert.equal(response.headers['Cache-Control'], 'no-store')
})

test('foundation never pretends to accept an inquiry or authenticate a user', () => {
  for (const path of ['/api/inquiries', '/api/login', '/api/messages', '/api/clients']) {
    assert.equal(handleRequest('POST', path).status, 404)
  }
})

test('health is read-only and HEAD omits its body', () => {
  assert.equal(handleRequest('HEAD', '/api/health').body, '')
  const response = handleRequest('POST', '/api/health')
  assert.equal(response.status, 405)
  assert.equal(response.headers.Allow, 'GET, HEAD')
})
