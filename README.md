# Sura backend foundation

A minimal Node 24 + TypeScript API foundation for Sura. No runtime dependencies or service accounts are required. Database, authentication, inquiries, CRM, and messaging are not connected yet; the owners are selecting providers.

```powershell
npm ci
npm run check
npm run dev
```

Open `http://127.0.0.1:4000/api/health`. It reports process availability separately from unconfigured integrations. Unsupported methods return 405; unimplemented routes return 404. No contact submission or sign-in is accepted.

`npm run build` compiles to `dist`; `npm start` runs compiled code. `.env.example` documents local HOST/PORT settings. Use `HOST=0.0.0.0` only when a chosen host requires external binding. Never commit actual `.env` files. The pure handler can be reused with another transport later; deploying to Cloudflare Workers requires an adapter.

Read [AGENTS.md](AGENTS.md) and [API memory](docs/PROJECT_MEMORY.md) before making changes. Shared product decisions and free-service research are in the [frontend documentation](https://github.com/romswel/sura-frontend/tree/main/docs). Run each repository's commands from its own directory; there is no parent Git repository.
