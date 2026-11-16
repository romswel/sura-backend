# Sura API project memory

Last updated: 2026-11-17 (Asia/Manila).

Sura is a two-person team starting with zero budget, aiming to get the first web-development client. Public site first; CRM, tasks, accounts, client access, and conversations follow in useful stages. Contact details stay blank by explicit owner request.

Canonical shared product/design/provider decisions live in [the frontend documentation](https://github.com/romswel/sura-frontend/tree/main/docs), or `../../sura-frontend/docs` in the sibling workspace. This backend file stays sufficient for an independent checkout.

## Implemented

- Independent `main` branch, origin `https://github.com/romswel/sura-backend.git`.
- Node 24 native HTTP server, strict TypeScript, npm, no runtime third-party dependencies.
- Transport-independent `src/app.ts` handler; `src/server.ts` is the Node transport adapter.
- `GET /api/health` reports process health and marks database, authentication, and inquiries as `not-configured`. `HEAD` omits the body; other methods get 405. Unknown APIs get 404.
- No endpoint accepts inquiries, signs users in, stores customer records, or sends messages.
- Environment setup supports local HOST/PORT only; provider configuration is deliberately absent.
- Type check, native Node behavioral tests, build, GitHub validation workflow, ignored secrets/output, and cross-assistant instruction entry points are included.

## Not connected

Database, authentication, persistent inquiries, private CRM, projects/tasks, messaging, file storage, CORS/frontend integration, email, production hosting, deployment automation. The owners are researching third-party providers; do not treat a shortlist as an approved decision. A Worker host would require a fetch adapter rather than deploying the Node server unchanged.

## Verification

Initial local `npm run check`: type checking, three behavioral API tests, and compilation passed. A compiled-server HTTP smoke check returned 200/no-store for health and 404 for an unimplemented inquiry POST. Dependency audit found zero known vulnerabilities at setup time. GitHub CI is prepared but has not run remotely. No push or deployment occurred. Live host and provider verification remain unavailable until those are connected.

Update current facts and material changes here after meaningful backend work. Store no credentials, private client records, or chat transcripts. Synchronize the shared frontend memory when working across both repositories.
