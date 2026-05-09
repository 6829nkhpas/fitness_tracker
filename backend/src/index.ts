/**
 * Vercel Serverless Entry Point
 *
 * Vercel doesn't run a persistent Express server — it wraps the
 * Express app in a serverless function. This file re-exports the
 * configured Express `app` so Vercel's @vercel/node runtime can
 * invoke it as a request handler.
 *
 * Lives inside src/ so all relative imports (config, routes, etc.)
 * resolve identically to the rest of the codebase — no cross-
 * directory path gymnastics needed.
 */

import app from './app.js';

export default app;
