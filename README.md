<h1 align="center">
  🏋️ Aura — Fitness Tracking Platform
</h1>

<p align="center">
  A premium, full-stack fitness tracking application with a cinematic landing page, animated multi-step onboarding, and a real-time fitness dashboard.
</p>

<p align="center">
  <a href="https://fitness-tracker-mu-smoky.vercel.app/health"><strong>🔗 Backend API (Live)</strong></a>
  &nbsp;•&nbsp;
  <a href="https://fitness-tracker-tjf6-git-main-namans-projects-194ade92.vercel.app"><strong>🌐 Frontend (Live)</strong></a>
</p>

---

## 📑 Table of Contents

- [Live Links](#-live-links)
- [Tech Stack](#-tech-stack)
- [Architecture](#-architecture)
- [Folder Structure](#-folder-structure)
- [Getting Started](#-getting-started)
- [Environment Variables](#-environment-variables)
- [API Reference](#-api-reference)
- [Design Decisions](#-design-decisions)

---

## 🔗 Live Links

| Service    | URL                                                                |
|------------|--------------------------------------------------------------------|
| **Backend API**  | [`https://fitness-tracker-mu-smoky.vercel.app`](https://fitness-tracker-mu-smoky.vercel.app/health) |
| **Frontend App** | [`https://fitness-tracker-tjf6-git-main-namans-projects-194ade92.vercel.app`](https://fitness-tracker-tjf6-git-main-namans-projects-194ade92.vercel.app) |

Both services are deployed on **Vercel** — the backend runs as a serverless function, and the frontend is a statically optimized Next.js app.

---

## ⚡ Tech Stack

### Frontend

| Layer              | Technology                     | Version   |
|--------------------|--------------------------------|-----------|
| Framework          | Next.js (App Router)           | 16.x      |
| Language           | TypeScript                     | 5.x       |
| Styling            | Tailwind CSS v4                | 4.x       |
| Component Library  | Shadcn/UI (Radix UI)          | latest    |
| Animations         | Framer Motion                  | 12.x      |
| Charts             | Recharts                       | 3.x       |
| Forms              | React Hook Form + Zod          | 7.x / 4.x|
| State Management   | Zustand                        | 5.x       |
| Icons              | Lucide React                   | 1.x       |

### Backend

| Layer            | Technology                     | Version   |
|------------------|--------------------------------|-----------|
| Runtime          | Node.js                        | ≥ 20      |
| Framework        | Express                        | 5.x       |
| Language         | TypeScript                     | 6.x       |
| ORM              | Prisma                         | 7.x       |
| DB Driver        | `@prisma/adapter-pg` + `pg`    | 7.x / 8.x|
| Database         | PostgreSQL (Supabase)          | ≥ 14      |
| Auth             | JSON Web Tokens                | 9.x       |
| Password Hashing | bcrypt                         | 6.x       |
| Validation       | Zod                            | 4.x       |
| Security         | Helmet + CORS                  | latest    |

### Infrastructure

| Service        | Platform    |
|----------------|-------------|
| Hosting        | Vercel      |
| Database       | Supabase (PostgreSQL) |
| Serverless Runtime | `@vercel/node` |

---

## 🏗 Architecture

### System Overview

```
┌─────────────────────────────────────────────────────────────────┐
│                        FRONTEND (Next.js 16)                     │
│                                                                  │
│  (marketing)/          (app)/                                    │
│  ┌──────────────┐      ┌──────────────────────────────┐          │
│  │ Landing Page │      │ Dashboard                    │          │
│  │ Login        │      │  ├─ StatsGrid (MetricCards)  │          │
│  │ Join         │      │  ├─ ActivityChart (Recharts) │          │
│  └──────────────┘      │  └─ WorkoutList              │          │
│                        └──────────────────────────────┘          │
│              │                      │                            │
│              └──────┬───────────────┘                            │
│                     ▼                                            │
│              ApiClient (lib/api-client.ts)                       │
│              ├─ Auto-injects JWT from localStorage               │
│              └─ Typed fetch wrapper                              │
└─────────────────────────┬───────────────────────────────────────┘
                          │ HTTPS (CORS)
                          ▼
┌─────────────────────────────────────────────────────────────────┐
│                      BACKEND (Express 5)                         │
│                                                                  │
│  Request → Route → Middleware → Controller → Service → Repo     │
│                    (auth+zod)   (HTTP thin)   (logic)   (prisma)│
│                                                                  │
│  Endpoints:                                                      │
│   /health              GET   — Liveness check                    │
│   /api/v1/auth/*       POST  — signup, login, logout             │
│   /api/v1/users/*      GET/PATCH — profile, onboarding           │
│   /api/v1/stats/*      GET/POST  — dashboard, meals, workouts    │
└─────────────────────────┬───────────────────────────────────────┘
                          │ Prisma 7 + pg adapter
                          ▼
┌─────────────────────────────────────────────────────────────────┐
│                    PostgreSQL (Supabase)                          │
│                                                                  │
│   users              — Account, profile, onboarding data         │
│   dashboard_stats    — Daily fitness metrics (1 row per day)     │
└─────────────────────────────────────────────────────────────────┘
```

### Backend — Layered Architecture

| Layer          | Responsibility                                                                |
|----------------|-------------------------------------------------------------------------------|
| **Route**      | Declares HTTP method, path, and the middleware/handler chain                  |
| **Middleware**  | JWT auth (`protect`) and Zod validation (`validate`) — runs before controllers |
| **Controller** | Extracts request data, calls the service, formats the HTTP response           |
| **Service**    | Business logic: aggregations, calculations, streaks, goal progress            |
| **Repository** | All Prisma queries — the only layer allowed to touch the database             |
| **Config**     | `env.ts` (typed env vars), `prisma.ts` (singleton client with pg adapter)     |

### Frontend — Rendering Strategy

| Section        | Strategy                          | Reason                                    |
|----------------|-----------------------------------|-------------------------------------------|
| Landing page   | Server Component (static)        | SEO-critical, no user data                |
| Onboarding     | Client Component (`"use client"`) | Multi-step state, animations              |
| Dashboard      | Client Component (`"use client"`) | Real-time stats, user-specific data       |
| Charts         | Dynamic import (`ssr: false`)     | Recharts requires `window` — no SSR       |

### Data Models

| Model            | Key Fields                                                                     |
|------------------|--------------------------------------------------------------------------------|
| `User`           | `id`, `email`, `password`, `name`, `dateOfBirth`, `gender`, `height`, `weight`, `goals[]`, `activityLevel`, `username`, `bio`, `avatarUrl`, `onboardingComplete` |
| `DashboardStats` | `userId`, `date`, `caloriesBurned`, `caloriesGoal`, `workoutsCount`, `workoutMinutes`, `stepsCount`, `stepsGoal`, `waterIntakeMl`, `waterGoalMl`, `sleepHours`, `sleepGoalHours` |

---

## 📁 Folder Structure

```
fitness_track/
│
├── backend/
│   ├── prisma/
│   │   ├── schema.prisma               # Data model (User, DashboardStats)
│   │   └── generated/                  # Auto-generated Prisma client
│   ├── src/
│   │   ├── app.ts                      # Express app (middleware, routes, error handlers)
│   │   ├── server.ts                   # Local dev server (app.listen)
│   │   ├── index.ts                    # Vercel serverless entry point
│   │   ├── config/
│   │   │   ├── env.ts                  # Typed env vars + startup validator
│   │   │   └── prisma.ts              # Singleton Prisma client (pg adapter)
│   │   ├── middleware/
│   │   │   ├── auth.middleware.ts      # JWT Bearer token → req.userId
│   │   │   ├── error.middleware.ts     # 404 handler + global error handler
│   │   │   └── validation.middleware.ts # Generic Zod schema validator
│   │   ├── routes/
│   │   │   ├── index.ts               # Mounts /auth, /users, /stats
│   │   │   ├── auth.routes.ts         # POST /signup, /login, /logout
│   │   │   ├── user.routes.ts         # GET /me, PATCH /onboarding
│   │   │   └── stats.routes.ts        # GET /overview, /weekly-activity, POST /log-meal, /start-workout
│   │   ├── controllers/               # Thin HTTP adapters
│   │   ├── services/                  # Business logic layer
│   │   ├── repositories/             # Prisma query layer
│   │   ├── types/                     # Zod schemas + TypeScript interfaces
│   │   └── utils/                     # AppError, response helpers
│   ├── vercel.json                    # Backend Vercel deployment config
│   ├── package.json
│   └── tsconfig.json
│
├── frontend/
│   ├── app/
│   │   ├── layout.tsx                 # Root layout (fonts, global CSS)
│   │   ├── globals.css                # Design tokens, Tailwind base
│   │   ├── (marketing)/               # Public route group
│   │   │   ├── layout.tsx             # Navbar + Footer wrapper
│   │   │   ├── page.tsx               # Landing page (/)
│   │   │   ├── login/page.tsx         # /login
│   │   │   └── join/page.tsx          # /join (onboarding entry)
│   │   └── (app)/                     # Authenticated route group
│   │       ├── layout.tsx             # Dashboard shell
│   │       └── dashboard/page.tsx     # /dashboard
│   ├── components/
│   │   ├── landing/                   # Hero, Features, HowItWorks, Pricing, CTA
│   │   ├── onboarding/               # Step1–5, WelcomeSuccess, OnboardingContainer
│   │   ├── dashboard/                 # StatsGrid, StatCard, ActivityChart, WorkoutList
│   │   ├── layout/                    # Navbar, Footer
│   │   └── ui/                        # Shadcn/Radix primitives
│   ├── hooks/                         # use-scroll
│   ├── store/                         # Zustand (useOnboardingStore)
│   ├── lib/
│   │   ├── api-client.ts             # Typed fetch wrapper (auto-injects JWT)
│   │   └── utils.ts                  # cn() helper (tailwind-merge + clsx)
│   ├── vercel.json                    # Frontend Vercel deployment config
│   ├── package.json
│   └── tsconfig.json
│
└── README.md                          # ← You are here
```

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** ≥ 20
- **npm** or **pnpm**
- **PostgreSQL** ≥ 14 (or a Supabase/Neon connection string)

### 1. Clone the repository

```bash
git clone https://github.com/6829nkhpas/fitness_tracker.git
cd fitness_tracker
```

### 2. Backend Setup

```bash
cd backend
npm install

# Create environment file
cp .env.example .env
# Edit .env with your DATABASE_URL and JWT_SECRET

# Push schema to database
npm run db:push

# Generate Prisma client
npm run db:generate

# Start dev server
npm run dev
# → http://localhost:5000
```

### 3. Frontend Setup

```bash
cd frontend
npm install

# Create environment file
echo "NEXT_PUBLIC_API_URL=http://localhost:5000/api/v1" > .env.local

# Start dev server
npm run dev
# → http://localhost:3000
```

---

## 🔑 Environment Variables

### Backend (`backend/.env`)

| Variable       | Required | Description                          | Example                              |
|----------------|----------|--------------------------------------|--------------------------------------|
| `PORT`         | No       | Server port (default: 5000)          | `5000`                               |
| `NODE_ENV`     | No       | Environment mode                     | `development` / `production`         |
| `DATABASE_URL` | **Yes**  | PostgreSQL connection string         | `postgresql://user:pass@host/db`     |
| `JWT_SECRET`   | **Yes**  | JWT signing secret                   | `your_super_secret_key`              |
| `JWT_EXPIRES_IN` | No     | Token expiry (default: 90d)          | `90d`                                |

### Frontend (`frontend/.env.local`)

| Variable              | Required | Description                   | Example                                    |
|-----------------------|----------|-------------------------------|--------------------------------------------|
| `NEXT_PUBLIC_API_URL` | No       | Backend API base URL          | `https://your-backend.vercel.app/api/v1`   |

> **Note:** If `NEXT_PUBLIC_API_URL` is not set, the frontend defaults to `http://localhost:5000/api/v1`.

---

## 📡 API Reference

All routes are prefixed with `/api/v1`. Protected routes (🔒) require `Authorization: Bearer <token>`.

### Health

| Method | Path      | Auth | Description             |
|--------|-----------|------|-------------------------|
| `GET`  | `/health` | —    | Liveness check + uptime |

### Auth — `/api/v1/auth`

| Method | Path      | Auth | Description                    |
|--------|-----------|------|--------------------------------|
| `POST` | `/signup` | —    | Register new user              |
| `POST` | `/login`  | —    | Authenticate & return JWT      |
| `POST` | `/logout` | —    | Logout (client deletes token)  |

**Signup body:**
```json
{ "name": "Alex", "email": "alex@example.com", "password": "SecurePass123!" }
```

### Users — `/api/v1/users` 🔒

| Method  | Path          | Auth | Description                         |
|---------|---------------|------|-------------------------------------|
| `GET`   | `/me`         | 🔒   | Get authenticated user profile      |
| `PATCH` | `/onboarding` | 🔒   | Update onboarding step (2, 3, 4, 5) |

**Onboarding** uses a Zod `discriminatedUnion` on the `step` field:

| Step | Fields                                    | Skippable |
|------|-------------------------------------------|-----------|
| 2    | `dateOfBirth`, `gender`, `height`, `weight` | No        |
| 3    | `goals[]` (1–3 from enum)                 | No        |
| 4    | `activityLevel`                           | Yes       |
| 5    | `username`, `bio`, `avatarUrl`            | Yes       |

### Stats — `/api/v1/stats` 🔒

| Method | Path               | Auth | Description                          |
|--------|--------------------|------|--------------------------------------|
| `GET`  | `/overview`        | 🔒   | Full dashboard payload               |
| `GET`  | `/weekly-activity` | 🔒   | 7-day chart data                     |
| `POST` | `/log-meal`        | 🔒   | Log meal + add calories              |
| `POST` | `/start-workout`   | 🔒   | Log workout session                  |

### Error Format

All errors follow a consistent envelope:

```json
{
  "success": false,
  "statusCode": 401,
  "message": "Authentication required",
  "error": { "code": "UNAUTHORIZED", "details": "..." },
  "timestamp": "2026-05-09T08:10:00.000Z"
}
```

| Code | Meaning                                |
|------|----------------------------------------|
| 400  | Validation failed (Zod errors)         |
| 401  | Missing or invalid JWT                 |
| 404  | Resource not found                     |
| 409  | Conflict (email/username already taken) |
| 422  | Validation error (field-level details)  |
| 500  | Unexpected server error                |

---

## 🎨 Design Decisions

### Backend

1. **Pre-Computed API Responses** — The Stats Service computes all labels, units, progress percentages, streaks, and chart points server-side. Zero data transformation on the client.

2. **Single Onboarding Endpoint** — One `PATCH /onboarding` with Zod's `discriminatedUnion` on `step` replaces four separate routes, keeping validation co-located.

3. **Repository Pattern** — Services never import Prisma directly. All database queries are isolated in repositories, making them trivially swappable and testable.

4. **Singleton Prisma Client** — Cached on `globalThis` to prevent connection pool exhaustion during hot-reload in development.

5. **Fail-Fast Env Validation** — `validateEnv()` runs on startup. Missing `DATABASE_URL` or `JWT_SECRET` crashes immediately with a clear error.

### Frontend

6. **Glassmorphism Navbar** — `backdrop-blur` + semi-transparent background transitions from fully transparent (on hero) to frosted glass on scroll.

7. **Framer Motion Orchestration** — `AnimatePresence` for onboarding step transitions, staggered card reveals on dashboard, `whileHover/whileTap` for tactile button feedback.

8. **Skeleton-First Loading** — Dashboard renders animated skeleton placeholders matching the exact grid layout before data arrives, preventing layout shift.

9. **Password Strength Indicator** — Live strength score (Weak → Very Strong) computed from length, character classes, and entropy.

10. **Route Groups for Layout Isolation** — `(marketing)/` and `(app)/` are separate layouts that don't affect URL structure. Marketing gets Navbar + Footer; app gets the dashboard sidebar.

11. **WelcomeSuccess Confetti** — `canvas-confetti` fires a staggered burst sequence when onboarding completes for a delightful celebration moment.

---

## 📦 Vercel Deployment

This monorepo deploys as **2 separate Vercel projects** from the same GitHub repo:

| Project   | Root Directory | Framework   | Build Command                 |
|-----------|---------------|-------------|-------------------------------|
| Backend   | `backend`     | Other       | `npx prisma generate && tsc`  |
| Frontend  | `frontend`    | Next.js     | `next build` (auto-detected)  |

**Steps:**
1. Import the repo on [vercel.com/new](https://vercel.com/new)
2. Set **Root Directory** to `backend` → add env vars → Deploy
3. Import the **same** repo again → set root to `frontend` → add `NEXT_PUBLIC_API_URL` → Deploy

---

<p align="center">
  Built with ❤️ using Next.js, Express, Prisma, and TypeScript
</p>
