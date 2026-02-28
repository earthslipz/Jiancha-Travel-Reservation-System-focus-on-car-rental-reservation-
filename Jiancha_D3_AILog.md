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

## Entry 3 — Database Setup
- **Date:** 2026-02-28
- **Prompt used:** "Create MySQL schema for car rental system with users, cars, bookings tables and Docker setup"
- **Accepted:** Schema design, docker-compose, connection pool
- **Rejected:** None
- **Verification:** Ran docker ps confirmed container up, ran SHOW TABLES confirmed all 3 tables created

## Entry 4 — Controllers and Routes
- **Date:** 2026-02-28
- **Prompt used:** "Implement Express controllers for auth (register/login), car listing, and booking with JWT middleware"
- **Accepted:** All controllers, middleware, updated routes
- **Rejected:** None
- **Verification:** curl POST /api/auth/register returned 201, curl GET /api/cars returned 3 cars from DB

## Entry 4 — Controllers and Routes
- **Date:** 2026-02-28
- **Prompt used:** "Implement Express controllers for auth (register/login), car listing, and booking with JWT middleware"
- **Accepted:** All controllers, middleware, updated routes
- **Rejected:** None
- **Verification:** curl POST /api/auth/register returned 201, curl GET /api/cars returned 3 cars from DB
