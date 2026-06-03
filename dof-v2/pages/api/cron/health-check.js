const https = require('https');

const PAGES = ['/', '/shop', '/product/1'];

async function ping(baseUrl, path) {
  return new Promise((resolve) => {
    const url = `${baseUrl}${path}`;
    const start = Date.now();
    const req = https.get(url, { timeout: 8000 }, (res) => {
      res.resume();
      res.on('end', () => resolve({ path, status: res.statusCode, ms: Date.now() - start, ok: res.statusCode < 400 }));
    });
    req.on('error', (e) => resolve({ path, status: 0, ms: Date.now() - start, ok: false, error: e.message }));
    req.on('timeout', () => { req.destroy(); resolve({ path, status: 0, ms: 8000, ok: false, error: 'timeout' }); });
  });
}

export default async function handler(req, res) {
  if (req.headers.authorization !== `Bearer ${process.env.CRON_SECRET}`) {
    return res.status(401).json({ error: 'Unauthorized' });
  }
  const base = process.env.NEXT_PUBLIC_BASE_URL || 'https://dof-2.vercel.app';
  const results = await Promise.all(PAGES.map(p => ping(base, p)));
  const allOk = results.every(r => r.ok);
  console.log(`[health-check] ${new Date().toISOString()} — ${allOk ? 'OK' : 'ISSUES'}`, results);
  res.status(200).json({ ok: allOk, timestamp: new Date().toISOString(), results });
}

export const config = { schedule: '30 0 * * *' };
