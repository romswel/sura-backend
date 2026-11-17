import { createServer } from 'node:http'
import type { ServerOptions } from 'node:http'
import { handleRequest } from './app.ts'

/** Shared Node HTTP transport, without process or listener lifecycle side effects. */
export function createHttpServer(options: ServerOptions = {}) {
  return createServer(options, (request, response) => {
    try {
      const pathname = new URL(request.url ?? '/', 'http://localhost').pathname
      const result = handleRequest(request.method ?? 'GET', pathname)
      response.writeHead(result.status, result.headers)
      response.end(result.body)
    } catch {
      response.writeHead(400, {
        'Content-Type': 'application/json; charset=utf-8',
        'Cache-Control': 'no-store',
        'X-Content-Type-Options': 'nosniff',
        'Referrer-Policy': 'no-referrer',
      })
      response.end(JSON.stringify({ error: 'Invalid request' }))
    }
  })
}
