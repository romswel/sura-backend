import { createServer } from 'node:http'
import { handleRequest } from './app.ts'

const port = Number(process.env.PORT ?? 4000)
const host = process.env.HOST ?? '127.0.0.1'
if (!Number.isInteger(port) || port < 1 || port > 65535)
  throw new Error('PORT must be an integer between 1 and 65535')

const server = createServer(
  { requestTimeout: 15_000, headersTimeout: 10_000, maxHeaderSize: 8192 },
  (request, response) => {
    try {
      const pathname = new URL(request.url ?? '/', 'http://localhost').pathname
      const result = handleRequest(request.method ?? 'GET', pathname)
      response.writeHead(result.status, result.headers)
      response.end(result.body)
    } catch {
      response.writeHead(400, { 'Content-Type': 'application/json', 'Cache-Control': 'no-store' })
      response.end(JSON.stringify({ error: 'Invalid request' }))
    }
  },
)

server.listen(port, host, () => console.log(`Sura API listening on http://${host}:${port}`))
server.on('error', (error) => {
  console.error(error.message)
  process.exitCode = 1
})
for (const signal of ['SIGINT', 'SIGTERM'] as const) {
  process.on(signal, () => {
    server.close(() => process.exit(0))
    server.closeIdleConnections()
  })
}
