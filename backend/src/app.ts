import express from 'express';
import type { Request, Response } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';

import { env, validateEnv } from './config/env.js';
import apiRouter from './routes/index.js';
import { notFoundHandler, globalErrorHandler } from './middleware/error.middleware.js';

// ── Validate environment on startup ────────────────────────────────
validateEnv();

// ── Express app ────────────────────────────────────────────────────
const app = express();

// ── CORS Middleware (must be BEFORE helmet) ────────────────────────
// Allows the frontend (on a different Vercel domain) to make
// authenticated requests to this API.
const allowedOrigins = [
  'http://localhost:3000',
  'https://fitness-tracker-mu-smoky.vercel.app',
  // Vercel preview deployments use dynamic subdomains
  /\.vercel\.app$/,
];

app.use(cors({
  origin: allowedOrigins,
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));

// ── Security Middleware ────────────────────────────────────────────
app.use((helmet as any)({
  crossOriginResourcePolicy: { policy: 'cross-origin' },
}));

// ── Body Parser Middleware ─────────────────────────────────────────
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ── Logger Middleware ──────────────────────────────────────────────
if (env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
} else {
  app.use(morgan('combined'));
}

// ── Health Check ───────────────────────────────────────────────────
app.get('/health', (_req: Request, res: Response) => {
  res.status(200).json({
    success: true,
    statusCode: 200,
    message: 'FitTrack API is healthy and running',
    data: {
      environment: env.NODE_ENV,
      uptime: `${Math.floor(process.uptime())}s`,
    },
    timestamp: new Date().toISOString(),
  });
});

// ── API Routes (v1) ───────────────────────────────────────────────
app.use('/api/v1', apiRouter);

// ── 404 Handler (must come AFTER routes) ──────────────────────────
app.use(notFoundHandler);

// ── Global Error Handler (must be the LAST middleware) ─────────────
app.use(globalErrorHandler);

export default app;
