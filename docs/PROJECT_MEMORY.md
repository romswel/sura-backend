# Sura API project memory

Last updated: 2026-11-17 (Asia/Manila).

Sura is a two-person team starting with zero budget, aiming to get the first web-development client. Public site first; CRM, tasks, accounts, client access, and conversations follow in useful stages. Contact details stay blank by explicit owner request.

Canonical shared product/design/provider decisions live in [the frontend documentation](https://github.com/romswel/sura-frontend/tree/main/docs), or `../../sura-frontend/docs` in the sibling workspace. This backend file stays sufficient for an independent checkout.

## Implemented

- Independent `main` branch, origin `https://github.com/romswel/sura-backend.git`.
- Node 24 native HTTP server, strict TypeScript, npm, no runtime third-party dependencies.
- Transport-independent `src/app.ts` handler; `src/http-server.ts` supplies the shared HTTP server factory, and `src/server.ts` owns the Node listener and process lifecycle.
- Local Workers adapter: `src/worker.ts` uses `httpServerHandler` from `cloudflare:node` with the shared HTTP server. `wrangler.jsonc` enables `nodejs_compat` with compatibility date `2026-11-16`. `npm run dev:worker` runs Wrangler locally on loopback port 8787. No account or bindings are configured.
- `npm start` and the Node build remain supported. Workers gets a separate type-check configuration and Wrangler bundles its entry point. Node-specific listener options remain outside the Worker because Workers rejects `maxHeaderSize`.
- `GET /api/health` reports process health and marks database, authentication, and inquiries as `not-configured`. `HEAD` omits the body; other methods get 405. Unknown APIs get 404.
- No endpoint accepts inquiries, signs users in, stores customer records, or sends messages.
- Environment setup supports local HOST/PORT only; provider configuration is deliberately absent.
- Type check, native Node behavioral tests, build, GitHub validation workflow, ignored secrets/output, and cross-assistant instruction entry points are included.

## Not connected

Database, authentication, persistent inquiries, private CRM, projects/tasks, messaging, file storage, CORS/frontend integration, email, production hosting, deployment automation. After local Workers preparation, the user authorized committing and pushing both existing main branches to GitHub. Cloudflare deployment will be triggered separately from the owner's tabs. Other provider decisions remain pending.

## Verification

Initial local `npm run check`: type checking, three behavioral API tests, and compilation passed. A compiled-server HTTP smoke check returned 200/no-store for health and 404 for an unimplemented inquiry POST. Dependency audit found zero known vulnerabilities at setup time. GitHub CI is prepared but has not run remotely. No push or deployment occurred. Live host and provider verification remain unavailable until those are connected.

2026-11-17 Workers preparation: Node and Worker type checks, three existing tests, and Node build passed. Local Wrangler and `npm start` HTTP probes returned health 200/no-store with unchanged integration status, HEAD 200 with an empty body, health POST 405, and inquiry POST 404. No remote service or database was connected. Compatibility was pinned to November 16 because the installed runtime rejected November 17 as unsupported.

GitHub handoff checks: `npm run check`, formatting validation, and dependency audit passed; local Wrangler health was rechecked at 200. Only the blank `.env.example` is tracked. Push authorization does not establish a successful Cloudflare deployment; confirm the public Worker health after deploying in Cloudflare.

Update current facts and material changes here after meaningful backend work. Store no credentials, private client records, or chat transcripts. Synchronize the shared frontend memory when working across both repositories.
