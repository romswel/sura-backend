import { createHttpServer } from './http-server.ts'

const port = Number(process.env.PORT ?? 4000)
const host = process.env.HOST ?? '127.0.0.1'
if (!Number.isInteger(port) || port < 1 || port > 65535)
  throw new Error('PORT must be an integer between 1 and 65535')

const server = createHttpServer({
  requestTimeout: 15_000,
  headersTimeout: 10_000,
  maxHeaderSize: 8192,
})

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
