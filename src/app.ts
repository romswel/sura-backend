export type ApiResponse = { status: number; headers: Record<string, string>; body: string }

/** Transport-independent routing. No client records are accepted until storage exists. */
export function handleRequest(method: string, path: string): ApiResponse {
  const headers = {
    'Content-Type': 'application/json; charset=utf-8',
    'Cache-Control': 'no-store',
    'X-Content-Type-Options': 'nosniff',
    'Referrer-Policy': 'no-referrer',
  }
  const json = (status: number, payload: unknown, extraHeaders = {}): ApiResponse => ({
    status,
    headers: { ...headers, ...extraHeaders },
    body: JSON.stringify(payload),
  })

  if (path === '/api/health') {
    if (method !== 'GET' && method !== 'HEAD')
      return json(405, { error: 'Method not allowed' }, { Allow: 'GET, HEAD' })
    const response = json(200, {
      service: 'sura-backend',
      status: 'ok',
      stage: 'foundation',
      integrations: {
        database: 'not-configured',
        authentication: 'not-configured',
        inquiries: 'not-configured',
      },
    })
    return method === 'HEAD' ? { ...response, body: '' } : response
  }

  return json(404, { error: 'Not found' })
}
