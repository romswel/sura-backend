# Working on the Sura API

Sura is a two-person web team starting from zero. The first goal is a credible public website and the first client. The all-in-one CRM/project/chat vision is staged future work. Start with `docs/PROJECT_MEMORY.md` for this API's current state. Canonical shared product context lives in the sibling `../sura-frontend/docs/PROJECT_MEMORY.md` when available, or in the frontend GitHub repository.

- This is an independent Git repository, not part of a parent monorepo. Preserve existing history, origins, and unrelated changes.
- The owners selected Cloudflare Workers for the API and Pages for the frontend. Database/auth remain undecided. Preserve that hosting choice; do not provision accounts, choose data/auth providers, or introduce costs without an explicit request.
- Do not collect real inquiries, credentials, messages, or client records until durable storage, server-side validation, access rules, and a real read/delivery path exist. Current API scope is process health only.
- Contacts are intentionally blank by explicit owner request. Do not use Git identity as public contact details.
- Future private records must be scoped and authorized on every server read/write. Never use frontend visibility, CORS, or localStorage as authorization. Use the chosen provider's real auth; never implement a fake successful sign-in.
- Never commit `.env`, secrets, customer data, or generated output. Do not log request bodies or authorization tokens.
- Use Node 24, npm, and the lockfile. `npm run check` runs type checking, behavioral API tests, and the build. Keep the pure handler separate from transport/provider adapters.
- Update this repository's `docs/PROJECT_MEMORY.md` after meaningful backend work; update the canonical shared memory when available. Record actual verification, provider gaps, and decisions. Do not claim access to other AI conversations.
- Inspect status/diff and stage only reviewed files. No Co-authored-by trailers. A push and a verified deployment are distinct outcomes.
