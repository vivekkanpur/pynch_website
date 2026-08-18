/**
 * Local development API server.
 * Loads all /api/*.js handlers and serves them at /api/<name>.
 * This mirrors how Vercel's serverless functions work.
 *
 * Run with: node dev-server.js
 * (Vite is configured to proxy /api/* to this server on port 3001)
 */

import express from 'express';
import { readdir } from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';

dotenv.config();

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const app = express();
app.use(express.json());

const apiDir = path.join(__dirname, 'api');
const files = await readdir(apiDir);

for (const file of files) {
  if (!file.endsWith('.js')) continue;
  const routeName = file.replace('.js', '');
  const modulePath = `./api/${file}`;
  const mod = await import(modulePath);
  const handler = mod.default;
  if (typeof handler !== 'function') continue;

  app.all(`/api/${routeName}`, (req, res) => {
    console.log(`[dev-server] ${req.method} /api/${routeName}`);
    handler(req, res);
  });
  console.log(`[dev-server] Registered: /api/${routeName}`);
}

app.listen(3001, () => {
  console.log('[dev-server] Local API server running on http://localhost:3001');
  console.log('[dev-server] Vite will proxy /api/* to this server.');
});
