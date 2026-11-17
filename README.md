# Sura backend foundation

A minimal Node 24 + TypeScript API foundation for Sura, with Cloudflare Workers selected for hosting. No runtime dependencies or service accounts are required for local work. Database, authentication, inquiries, CRM, and messaging are not connected yet; those providers remain undecided.

```powershell
npm ci
npm run check
npm run dev
```

Open `http://127.0.0.1:4000/api/health`. It reports process availability separately from unconfigured integrations. Unsupported methods return 405; unimplemented routes return 404. No contact submission or sign-in is accepted.

`npm run build` compiles the Node entry point to `dist`; `npm start` runs compiled code. `.env.example` documents local HOST/PORT settings. Use `HOST=0.0.0.0` only when a chosen host requires external binding. Never commit actual `.env` files.

## Local Cloudflare Workers development

```powershell
npm ci
npm run check
npm run dev:worker
```

Open `http://127.0.0.1:8787/api/health`. Wrangler runs locally; no Cloudflare login, account ID, secrets, or database bindings are needed. Stop with Ctrl+C. This command does not deploy.

`wrangler.jsonc` selects `src/worker.ts`, enables `nodejs_compat`, and pins compatibility to `2026-11-16`, supported by the installed runtime. The Worker uses Cloudflare's [`httpServerHandler`](https://developers.cloudflare.com/workers/runtime-apis/nodejs/http/) with the same `node:http` request handler as the Node entry point. Its internal port is a routing key, not an external listener. Wrangler's local listener uses its `dev` configuration; Node-only HOST/PORT and signal handling remain in `src/server.ts`.

`src/http-server.ts` owns the shared HTTP transport. Node listener limits are supplied by `src/server.ts`; Workers manages its own limits and does not support Node's `maxHeaderSize` option. `npm run typecheck` checks both entry points using separate runtime types. The Node build excludes `worker.ts`; Wrangler bundles it for local development. `.wrangler` and `.dev.vars` files are ignored. Database, auth, and inquiry delivery remain unconfigured.

Read [AGENTS.md](AGENTS.md) and [API memory](docs/PROJECT_MEMORY.md) before making changes. Shared product decisions and free-service research are in the [frontend documentation](https://github.com/romswel/sura-frontend/tree/main/docs). Run each repository's commands from its own directory; there is no parent Git repository.

The November 17 audit adds shared HTTP transport coverage and consistent security/cache headers on invalid requests. The owner authorized an audited push on the existing main branch and clarified that public Cloudflare URLs are not set yet. GitHub publication, CI, and local Worker checks do not establish a verified live deployment. Public release notes are maintained in the frontend at #/updates.
