import puppeteer from 'puppeteer-core';
const url = process.argv[2] || 'http://localhost:4173/';
const out = process.argv[3] || '/tmp/shots';
import fs from 'fs'; fs.mkdirSync(out, { recursive: true });
const b = await puppeteer.launch({ executablePath: '/usr/bin/google-chrome', headless: 'new', args: ['--no-sandbox', '--use-gl=angle', '--use-angle=swiftshader', '--enable-unsafe-swiftshader', '--ignore-gpu-blocklist', '--autoplay-policy=no-user-gesture-required'] });
const errs = []; const bad = [];
async function run(w, h, tag, mobile) {
  const p = await b.newPage(); await p.setViewport({ width: w, height: h, deviceScaleFactor: 1, isMobile: !!mobile, hasTouch: !!mobile });
  p.on('console', (m) => { if (m.type() === 'error') errs.push(tag + ': ' + m.text().slice(0, 200)); });
  p.on('pageerror', (e) => errs.push(tag + ' pageerror: ' + String(e).slice(0, 200)));
  p.on('response', (r) => { if (r.status() >= 400) bad.push(r.status() + ' ' + r.url()); });
  await p.goto(url, { waitUntil: 'load' });
  await p.evaluate(() => localStorage.setItem('ahly-quality', 'low'));
  await p.reload({ waitUntil: 'load' });
  await p.waitForSelector('[data-testid=enter]:not([disabled])', { timeout: 60000 });
  await p.screenshot({ path: `${out}/${tag}-intro.png` });
  await p.click('[data-testid=enter]'); await new Promise(r => setTimeout(r, 1500));
  await p.screenshot({ path: `${out}/${tag}-start.png` });
  const M = () => p.evaluate(() => window.__museum);
  const go = async (name, x, z, yaw) => { await p.evaluate((x, z, yaw) => { window.__museum.teleport(x, z, yaw); }, x, z, yaw); await new Promise(r => setTimeout(r, 900)); await p.screenshot({ path: `${out}/${tag}-${name}.png` }); };
  if (process.env.PART==='zz') { await go('statues', 7, 0, -Math.PI / 2); await go('gallery', -9.5, 0, Math.PI / 2); await go('library', 0, 19, Math.PI); await b.close(); process.exit(0); }
  return p;
}
const p = await run(1440, 900, 'd');
// flows
await new Promise(r => setTimeout(r, 800));
const focus = await p.evaluate(() => JSON.stringify(window.__museum.store.getState().focus)); console.log('focus@vault', focus);
await p.evaluate(() => window.__museum.store.getState().inspect({ kind: 'trophy', id: window.__museum.store.getState().focus?.id || 'cl-2024' }));
await new Promise(r => setTimeout(r, 1200)); await p.screenshot({ path: `${out}/d-dossier.png` });
await p.keyboard.press('Escape'); await new Promise(r => setTimeout(r, 300));
console.log('closed', await p.evaluate(() => window.__museum.store.getState().selected));
await p.click('[data-testid=lang-btn]'); await new Promise(r => setTimeout(r, 800));
console.log('dir', await p.evaluate(() => document.documentElement.dir), await p.evaluate(() => document.documentElement.lang));
await p.screenshot({ path: `${out}/d-ar.png` });
await p.evaluate(() => window.__museum.store.getState().inspect({ kind: 'statue', id: 'el-khatib' })); await new Promise(r => setTimeout(r, 900)); await p.screenshot({ path: `${out}/d-ar-statue.png` });
await p.keyboard.press('Escape');
// relic
const r0 = await p.evaluate(() => window.__museum.relics[0]);
const c0 = await p.evaluate(() => window.__museum.store.getState().relicsFound.size);
await p.evaluate((x, z) => window.__museum.teleport(x, z, 0), r0.x, r0.z); await new Promise(r => setTimeout(r, 900));
console.log('relics', c0, '->', await p.evaluate(() => window.__museum.store.getState().relicsFound.size));
await p.screenshot({ path: `${out}/d-relic.png` });
// quality
await p.click('[data-testid=q-medium]'); await new Promise(r => setTimeout(r, 2500)); await p.screenshot({ path: `${out}/d-qmed.png` });
console.log('q', await p.evaluate(() => window.__museum.store.getState().quality));
await p.evaluate(() => window.__museum.store.getState().openLibrary('press')); await new Promise(r => setTimeout(r, 600)); await p.screenshot({ path: `${out}/d-library.png` });
await p.evaluate(() => window.__museum.store.getState().closeLibrary());
await p.click('[data-testid=mode-tour]'); await new Promise(r => setTimeout(r, 3500)); await p.screenshot({ path: `${out}/d-tour.png` });
console.log('zone', await p.evaluate(() => window.__museum.store.getState().zone));
console.log('ERRORS', JSON.stringify([...new Set(errs)], null, 1)); console.log('BAD', bad);
await b.close();
