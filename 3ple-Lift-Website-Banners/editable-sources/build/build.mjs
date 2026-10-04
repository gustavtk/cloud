// Build: writes the layered SVG sources, fits pills/buttons/contact rows to their text,
// exports 1600 x 900 PNGs and runs layout QA (safe area, overlaps, exact copy).
//
//   node build/build.mjs        (run from editable-sources/; needs Playwright, local or global)
import { createRequire } from 'node:module';
import { execSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { svgDoc, W, H, SAFE, BRAND_STATEMENT, CONTACT } from './banners.mjs';
import { BANNERS, VARIANTS } from './compositions.mjs';
import { ROUND2 } from './round2.mjs';

const require = createRequire(import.meta.url);
let chromium;
try {
  ({ chromium } = require('playwright'));
} catch {
  ({ chromium } = require(path.join(execSync('npm root -g').toString().trim(), 'playwright')));
}

const here = path.dirname(fileURLToPath(import.meta.url));
const SRC = path.resolve(here, '..');
const OUT = path.resolve(SRC, '..');

// Runs inside the page: post-order layout so nested flows/pills resolve inside-out.
function layoutInPage() {
  const visit = (el) => {
    for (const child of el.children) visit(child);
    if (el.dataset && el.dataset.flow !== undefined) {
      const gap = +el.dataset.flow;
      const items = [...el.children].filter((c) => c.classList.contains('item'));
      const boxes = items.map((it) => it.getBBox());
      const total = boxes.reduce((s, b) => s + b.width, 0) + gap * (items.length - 1);
      const ax = +el.dataset.x;
      let cursor = el.dataset.align === 'right' ? ax - total : el.dataset.align === 'center' ? ax - total / 2 : ax;
      items.forEach((it, i) => {
        it.setAttribute('transform', `translate(${(cursor - boxes[i].x).toFixed(2)} 0)`);
        cursor += boxes[i].width + gap;
      });
    }
    if (el.dataset && el.dataset.pill !== undefined) {
      const [pl, pr = pl] = el.dataset.pill.split(',').map(Number);
      const rect = el.querySelector(':scope > .pill-bg');
      const content = el.querySelector(':scope > .pill-content');
      const bb = content.getBBox();
      const t = content.transform.baseVal.consolidate();
      const dx = t ? t.matrix.e : 0;
      rect.setAttribute('x', (bb.x + dx - pl).toFixed(2));
      rect.setAttribute('width', (bb.width + pl + pr).toFixed(2));
    }
  };
  visit(document.documentElement);
  document.querySelectorAll('[data-hl-for]').forEach((r) => {
    const t = document.getElementById(r.dataset.hlFor);
    const bb = t.getBBox();
    const pad = +r.dataset.pad;
    r.setAttribute('x', (bb.x - pad).toFixed(2));
    r.setAttribute('width', (bb.width + pad * 2).toFixed(2));
  });
}

function qaInPage({ SAFE, W, H }) {
  const issues = [];
  const boxes = [];
  // Copy blocks use the glyphs' real ink extent (baseline ± measured ascent/descent),
  // not the font's em box, so tight-but-clean headline stacks are not false positives.
  const ctx = document.createElementNS('http://www.w3.org/1999/xhtml', 'canvas').getContext('2d');
  const inkBox = (t) => {
    const cs = getComputedStyle(t);
    ctx.font = `${cs.fontWeight} ${cs.fontSize} ${cs.fontFamily}`;
    const m = ctx.measureText(t.textContent);
    const r = t.getBoundingClientRect();
    const base = +t.getAttribute('y');
    return { x0: r.left, x1: r.right, y0: base - m.actualBoundingBoxAscent, y1: base + m.actualBoundingBoxDescent };
  };
  document.querySelectorAll('[data-qa]').forEach((el) => {
    let b;
    if (el.dataset.qa === 'text') {
      const parts = [...el.querySelectorAll('text')].map(inkBox);
      b = { x0: Math.min(...parts.map((p) => p.x0)), y0: Math.min(...parts.map((p) => p.y0)), x1: Math.max(...parts.map((p) => p.x1)), y1: Math.max(...parts.map((p) => p.y1)) };
    } else {
      const r = el.getBoundingClientRect();
      b = { x0: r.left, y0: r.top, x1: r.right, y1: r.bottom };
    }
    boxes.push({ id: el.id, kind: el.dataset.qa, ...b });
  });
  // Text-level boxes: every <text> inside text/contact/logo groups must sit in the safe area.
  document.querySelectorAll('#layer-text text, #layer-contact text, #layer-illustration text').forEach((t) => {
    const r = t.getBoundingClientRect();
    // 3px tolerance for glyph side-bearings/overhang (e.g. the hook of a "j").
    if (r.left < SAFE - 3 || r.top < SAFE - 3 || r.right > W - SAFE + 3 || r.bottom > H - SAFE + 3)
      issues.push(`outside safe area: "${t.textContent.trim().slice(0, 40)}" [${r.left.toFixed(0)},${r.top.toFixed(0)} → ${r.right.toFixed(0)},${r.bottom.toFixed(0)}]`);
  });
  // Pills, button and logo shapes too.
  document.querySelectorAll('#layer-text rect.pill-bg, #layer-logo rect, #logo-wordmark').forEach((t) => {
    const r = t.getBoundingClientRect();
    if (r.left < SAFE - 0.5 || r.top < SAFE - 0.5 || r.right > W - SAFE + 0.5 || r.bottom > H - SAFE + 0.5)
      issues.push(`shape outside safe area: ${t.closest('[id]').id} [${r.left.toFixed(0)},${r.top.toFixed(0)} → ${r.right.toFixed(0)},${r.bottom.toFixed(0)}]`);
  });
  // Overlap between copy blocks, CTA, logo, statement, contact and the illustration's own text.
  const blocks = boxes.filter((b) => b.kind !== 'illustration');
  const illoTexts = [...document.querySelectorAll('#layer-illustration text, #layer-illustration rect, #layer-illustration circle, #layer-illustration path')]
    .filter((e) => !e.closest('[filter*="blur"]') && !e.closest('[data-deco]'))
    .map((e) => {
      const r = e.getBoundingClientRect();
      return { id: `illo:${e.closest('[id]').id}`, x0: r.left, y0: r.top, x1: r.right, y1: r.bottom };
    })
    .filter((b) => b.x1 - b.x0 < W * 0.9);
  const hit = (a, b, m = 6) => a.x0 < b.x1 + m && b.x0 < a.x1 + m && a.y0 < b.y1 + m && b.y0 < a.y1 + m;
  for (let i = 0; i < blocks.length; i++)
    for (let j = i + 1; j < blocks.length; j++)
      if (hit(blocks[i], blocks[j])) issues.push(`overlap: ${blocks[i].id} × ${blocks[j].id}`);
  for (const b of blocks) for (const il of illoTexts) if (hit(b, il, 0)) issues.push(`overlap with illustration: ${b.id} × ${il.id}`);
  const allText = [...document.querySelectorAll('text')].map((t) => t.textContent.replace(/\s+/g, ' ').trim());
  const minFont = Math.min(...[...document.querySelectorAll('#layer-text text, #layer-contact text')].map((t) => parseFloat(getComputedStyle(t).fontSize)));
  return { issues: [...new Set(issues)], allText, minFont, fontsOk: ['Bricolage Grotesque', 'Figtree'].every((fam) => [...document.fonts].some((f) => f.family.replace(/["']/g, '') === fam && f.status === 'loaded')) };
}

const browser = await chromium.launch({ executablePath: process.env.CHROMIUM_PATH || undefined });
const page = await browser.newPage({ viewport: { width: W, height: H }, deviceScaleFactor: 1 });
let failures = 0;
const report = [];

for (const make of [...BANNERS, ...VARIANTS, ...ROUND2]) {
  const b = make();
  const svgPath = path.join(SRC, `${b.id}_${b.slug}.svg`);
  fs.writeFileSync(svgPath, svgDoc({ id: b.id, title: b.title, layers: b.layers }));
  await page.goto(pathToFileURL(svgPath).href);
  await page.evaluate(() => document.fonts.ready);
  await page.evaluate(layoutInPage);
  // Persist the fitted layout so the editable SVG matches the PNG exactly.
  const fitted = await page.evaluate(() => new XMLSerializer().serializeToString(document.documentElement));
  fs.writeFileSync(svgPath, `<?xml version="1.0" encoding="UTF-8"?>\n${fitted}\n`);

  const qa = await page.evaluate(qaInPage, { SAFE, W, H });
  const joined = qa.allText.join(' | ');
  const must = [BRAND_STATEMENT, CONTACT.web, CONTACT.whatsapp, CONTACT.email];
  for (const m of must) if (!qa.allText.includes(m)) qa.issues.push(`missing exact text: ${m}`);
  if (!qa.fontsOk) qa.issues.push('fonts did not load');
  const pngDir = b.outDir ? path.join(OUT, b.outDir) : OUT;
  fs.mkdirSync(pngDir, { recursive: true });
  const png = path.join(pngDir, `3ple-Lift-${b.round ? b.round + '-' : ''}Banner-${b.id.slice(-2)}_${b.slug}.png`);
  await page.screenshot({ path: png, clip: { x: 0, y: 0, width: W, height: H } });
  report.push({ banner: b.id, png: path.basename(png), minFontPx: qa.minFont, issues: qa.issues, text: joined });
  failures += qa.issues.length;
  console.log(`\n${b.id} → ${path.basename(png)}  (smallest copy ${qa.minFont}px)`);
  qa.issues.forEach((i) => console.log('  ! ' + i));
  if (!qa.issues.length) console.log('  ✓ safe area, overlaps, exact brand statement and contact details');
}

fs.writeFileSync(path.join(SRC, 'build', 'qa-report.json'), JSON.stringify(report, null, 2));
await browser.close();
process.exitCode = failures ? 1 : 0;
