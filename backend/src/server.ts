import app from './app.js';
import { env } from './config/env.js';

// ── Start Server (local development only) ─────────────────────────
// On Vercel, the app is imported by api/index.ts as a serverless
// function — app.listen() is never called.

app.listen(env.PORT, () => {
  console.log(`\n🏋️  FitTrack API`);
  console.log(`   ├─ URL:         http://localhost:${env.PORT}`);
  console.log(`   ├─ Environment: ${env.NODE_ENV}`);
  console.log(`   └─ Routes:      /api/v1/auth, /api/v1/users, /api/v1/stats\n`);
});
