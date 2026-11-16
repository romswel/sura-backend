import { httpServerHandler } from 'cloudflare:node'
import { createHttpServer } from './http-server.ts'

// Workers owns the listener lifecycle; Node's HOST/PORT and signal handlers stay in server.ts.
const routingPort = 8080
const server = createHttpServer()
server.listen(routingPort)
export default httpServerHandler({ port: routingPort })
