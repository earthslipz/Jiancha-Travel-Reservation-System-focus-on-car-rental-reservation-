## Entry 1 — Project Structure Setup
- **Date:** 2026-02-28
- **Prompt used:** "Setup repo structure for Travel Naja car rental system with React frontend and Express backend"
- **Accepted:** Folder structure for backend/frontend, branch strategy
- **Rejected:** None
- **Verification:** Manually verified folder structure matches project requirements

## Entry 2 — Backend Setup
- **Date:** 2026-02-28
- **Prompt used:** "Setup Express.js backend with MySQL, JWT auth, helmet, rate limiting for car rental system"
- **Accepted:** app.js structure, middleware setup, route scaffolding, trust proxy fix
- **Rejected:** rate-limit without trust proxy (caused validation error in Codespace environment)
- **Verification:** Ran `npm run dev`, hit /health endpoint, returned {"status":"ok"}
