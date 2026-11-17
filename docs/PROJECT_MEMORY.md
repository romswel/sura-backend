# Sura API project memory

Last updated: 2026-11-17 (Asia/Manila).

Sura is a two-person team starting with zero budget, aiming for its first web-development client. Contact details stay blank by owner instruction. Canonical product/design decisions are in the [frontend docs](https://github.com/romswel/sura-frontend/tree/main/docs), or the sibling sura-frontend/docs directory.

## Current implementation

- Independent repository on main; origin https://github.com/romswel/sura-backend.git. No parent repository or new branch is required.
- Node 24, strict TypeScript, npm lockfile, no third-party runtime dependency.
- Pure routing in src/app.ts; shared HTTP transport in src/http-server.ts; Node listener/process lifecycle in src/server.ts.
- Cloudflare Workers adapter in src/worker.ts uses httpServerHandler from cloudflare:node. wrangler.jsonc enables nodejs_compat, pins compatibility to 2026-11-16, and serves local development at 127.0.0.1:8787. Workers does not accept the Node maxHeaderSize option; Node-only limits remain in server.ts.
- GET/HEAD /api/health report process availability and mark database, authentication, and inquiries not-configured. HEAD omits the body, unsupported health methods receive 405 with Allow, unknown APIs receive 404. Query strings do not change route matching.
- All application responses, including malformed-URL 400 errors, use no-store, nosniff, and no-referrer headers. No request bodies or authorization data are logged.
- No inquiry submission, authentication, customer records, database, messaging, payments, file storage, email delivery, or frontend API integration is implemented.

## Hosting and release boundary

The owners selected Cloudflare Workers for the API and Pages for the website. Database/auth remain undecided. Preserve the selected host without provisioning another provider or adding costs.

The owners authorized auditing both repositories, fixing issues, publishing public Updates in the frontend, and pushing the existing main branches without creating a branch. They then clarified that public URLs have not been set and requested a GitHub push for now. Both source releases were pushed. Cloudflare supplied the assigned frontend URL https://sura-frontend-3wf.pages.dev, which was verified directly. A source push, CI success, local Wrangler, and a bundle dry run do not verify public API health; no public API URL is available for verification.

## Release audit evidence

- npm run check passes: Node and Worker type checks, four API tests, and Node build.
- Three pure-handler tests cover health/integration honesty, unimplemented private/write APIs, and read-only health/HEAD.
- The new socket-level transport test covers health with query parameters, HEAD, 405/Allow, 404, malformed URL 400, and consistent cache/security headers.
- npm run format:check passes. npm audit including development dependencies reports zero known vulnerabilities on the audit date.
- Wrangler deploy --dry-run bundles successfully with no bindings and does not deploy.
- Local Wrangler HTTP probes pass: health/query 200 with not-configured integrations, HEAD 200 empty, health POST 405, inquiry POST 404, no-store and nosniff headers.
- Backend hardening commit f42c3937e925fb3eeaba9ab30ed72d5b39c67b4e was pushed with remote hash parity. GitHub Actions run 44029292651 and the Cloudflare Workers build both passed. Consult current Git/GitHub for later release status; no public API response is implied.
- Only blank/public .env.example may be tracked. Local environment files, .dev.vars, .wrangler, build output, node_modules, logs, and .artifacts remain ignored.

Public release notes are source-managed in the frontend src/updates.ts at #/updates. Reference repositories were not modified.

## Next useful backend stage

After owners select data/auth, complete one real inquiry journey: server validation and abuse controls, durable storage, authorized team inbox, follow-up, privacy/retention, and failed-action recovery. Private records require server authorization and account/membership scoping on every operation. Frontend flags and localStorage never authenticate users.

Update current facts after meaningful work. Never store credentials, private customer records, or chat transcripts in project memory. Synchronize canonical frontend context when working across both repositories.
