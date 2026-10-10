// Renders the Gustav Google Meet backgrounds (1920x1080) to PNG.
// Usage: node render.js   (writes to ../normal and ../mirrored)
const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');

const NAME = 'Gustav';
const EMAIL = 'gustav@gustavtk.com';
const SITE = 'gustavtk.com';

// The "G" symbol. Swap this function's SVG for your own logo if you have one.
const mark = (color, size, stroke = 12, extra = '') => `
<svg width="${size}" height="${size}" viewBox="0 0 100 100" ${extra}>
  <path d="M74.04 25.96 A34 34 0 1 0 84 50 H54" fill="none" stroke="${color}"
        stroke-width="${stroke}" stroke-linecap="round" stroke-linejoin="round"/>
</svg>`;

const icons = {
  mail: (c) => `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="${c}" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="5" width="18" height="14" rx="2.5"/><path d="M4 7l8 6 8-6"/></svg>`,
  web: (c) => `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="${c}" stroke-width="1.8" stroke-linecap="round"><circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3c2.8 3 2.8 15 0 18M12 3c-2.8 3-2.8 15 0 18"/></svg>`,
};

const base = `
* { margin: 0; padding: 0; box-sizing: border-box; }
html, body { width: 1920px; height: 1080px; overflow: hidden; }
body { font-family: 'Inter', sans-serif; -webkit-font-smoothing: antialiased; }
.stage { position: relative; width: 1920px; height: 1080px; overflow: hidden; }
.mirror .stage { transform: scaleX(-1); }
.abs { position: absolute; }
`;

const variations = {
  // 1. Paper: warm off-white, hairline corner frame, giant faint G watermark
  '01-paper': `
<style>
.stage { background: #FAF8F4; }
.watermark { left: -170px; bottom: -230px; opacity: .06; }
.frame { right: 72px; top: 72px; width: 640px; height: 2px; background: #1C1C1C; }
.card { right: 96px; top: 104px; text-align: right; color: #1C1C1C; }
.row { display: flex; align-items: center; justify-content: flex-end; gap: 22px; }
.name { font-family: 'Inter Display'; font-weight: 600; font-size: 60px; letter-spacing: -1.5px; }
.lines { margin-top: 18px; font-size: 24px; line-height: 1.7; color: #55524C; }
.dot { display: inline-block; width: 8px; height: 8px; background: #D9622B; border-radius: 50%; margin-left: 14px; vertical-align: middle; }
.foot { left: 96px; bottom: 80px; font-size: 18px; letter-spacing: 6px; text-transform: uppercase; color: #A29D94; }
</style>
<div class="stage">
  <div class="abs watermark">${mark('#1C1C1C', 900, 10)}</div>
  <div class="abs frame"></div>
  <div class="abs card">
    <div class="row"><span class="name">${NAME}</span>${mark('#D9622B', 64, 13)}</div>
    <div class="lines">${EMAIL}<span class="dot"></span><br>${SITE}<span class="dot"></span></div>
  </div>
  <div class="abs foot">Freelance · Available for projects</div>
</div>`,

  // 2. Aurora: soft pastel gradient glow, glass card
  '02-aurora': `
<style>
.stage { background: #F7F8FC; }
.blob { border-radius: 50%; filter: blur(120px); }
.b1 { width: 900px; height: 900px; left: -300px; bottom: -420px; background: #C9D4FF; }
.b2 { width: 700px; height: 700px; left: 260px; bottom: -480px; background: #F4D3F0; }
.b3 { width: 520px; height: 520px; right: -140px; top: -260px; background: #D4F1EC; }
.card { right: 80px; top: 80px; padding: 34px 40px; border-radius: 28px;
  background: rgba(255,255,255,.72); border: 1px solid rgba(255,255,255,.9);
  box-shadow: 0 20px 60px rgba(40,50,110,.10); display: flex; gap: 28px; align-items: center; }
.badge { width: 104px; height: 104px; border-radius: 26px; display: grid; place-items: center;
  background: linear-gradient(135deg, #4F6BFF, #9B6BFF); }
.name { font-family: 'Inter Display'; font-weight: 700; font-size: 50px; color: #161A33; letter-spacing: -1px; }
.line { display: flex; align-items: center; gap: 12px; font-size: 22px; color: #4A5072; margin-top: 8px; }
</style>
<div class="stage">
  <div class="abs blob b1"></div><div class="abs blob b2"></div><div class="abs blob b3"></div>
  <div class="abs card">
    <div class="badge">${mark('#fff', 70, 13)}</div>
    <div>
      <div class="name">${NAME}</div>
      <div class="line">${icons.mail('#4F6BFF')}${EMAIL}</div>
      <div class="line">${icons.web('#4F6BFF')}${SITE}</div>
    </div>
  </div>
</div>`,

  // 3. Studio: minimal room — wall, floor line, framed G "artwork" and a shelf
  '03-studio': `
<style>
.stage { background: linear-gradient(180deg, #F3F1EE 0%, #ECE9E4 74%, #E2DED7 74%, #DCD7CF 100%); }
.light { left: 0; top: 0; width: 1920px; height: 800px;
  background: radial-gradient(ellipse at 20% 0%, rgba(255,255,255,.9), transparent 60%); }
.art { left: 170px; top: 210px; width: 300px; height: 380px; background: #FBFAF8;
  border: 14px solid #2A2724; box-shadow: 0 30px 50px rgba(0,0,0,.12);
  display: grid; place-items: center; }
.shelf { left: 130px; top: 720px; width: 420px; height: 12px; background: #2A2724; border-radius: 2px;
  box-shadow: 0 14px 18px rgba(0,0,0,.10); }
.pot { left: 200px; top: 640px; width: 64px; height: 80px; background: #2F6B55; border-radius: 8px 8px 14px 14px; }
.book { top: 610px; width: 26px; height: 110px; border-radius: 3px; }
.card { right: 96px; top: 96px; text-align: right; color: #2A2724; }
.name { font-family: 'Inter Display'; font-weight: 300; font-size: 72px; letter-spacing: 6px; text-transform: uppercase; }
.rule { width: 80px; height: 3px; background: #2F6B55; margin: 20px 0 20px auto; }
.lines { font-size: 23px; line-height: 1.75; color: #5E5850; letter-spacing: .5px; }
</style>
<div class="stage">
  <div class="abs light"></div>
  <div class="abs art">${mark('#2F6B55', 170, 11)}</div>
  <div class="abs shelf"></div>
  <div class="abs pot"></div>
  <div class="abs book" style="left:420px;background:#C9A27A"></div>
  <div class="abs book" style="left:450px;top:630px;height:90px;background:#2A2724"></div>
  <div class="abs book" style="left:480px;top:600px;height:120px;background:#9DB3A8"></div>
  <div class="abs card">
    <div class="name">${NAME}</div>
    <div class="rule"></div>
    <div class="lines">${EMAIL}<br>${SITE}</div>
  </div>
</div>`,

  // 4. Dots: fading dot grid, pill chips with a coral accent
  '04-dots': `
<style>
.stage { background: #FFFFFF; }
.grid { inset: 0; background-image: radial-gradient(#C8CCD6 2px, transparent 2.2px); background-size: 36px 36px;
  -webkit-mask-image: radial-gradient(ellipse at 0% 100%, #000 0%, transparent 55%); }
.ring { left: 110px; bottom: 110px; width: 260px; height: 260px; border-radius: 50%; border: 2px dashed #FF6B57; opacity: .55; }
.ringmark { left: 175px; bottom: 175px; }
.card { right: 88px; top: 88px; display: flex; flex-direction: column; align-items: flex-end; gap: 14px; }
.head { display: flex; align-items: center; gap: 18px; }
.name { font-family: 'Inter Display'; font-weight: 800; font-size: 58px; color: #111827; letter-spacing: -2px; }
.name i { color: #FF6B57; font-style: normal; }
.chip { display: flex; align-items: center; gap: 12px; padding: 12px 22px; border-radius: 999px;
  background: #F3F4F6; color: #374151; font-size: 22px; font-weight: 500; }
</style>
<div class="stage">
  <div class="abs grid"></div>
  <div class="abs ring"></div>
  <div class="abs ringmark">${mark('#FF6B57', 130, 12)}</div>
  <div class="abs card">
    <div class="head">${mark('#111827', 60, 14)}<div class="name">${NAME}<i>.</i></div></div>
    <div class="chip">${icons.mail('#FF6B57')}${EMAIL}</div>
    <div class="chip">${icons.web('#FF6B57')}${SITE}</div>
  </div>
</div>`,

  // 5. Swiss: bold color column, vertical name, monospace contact block
  '05-swiss': `
<style>
.stage { background: #F4F4F1; }
.col { left: 0; top: 0; width: 150px; height: 1080px; background: #1E3BFF; }
.vert { left: 34px; bottom: 70px; transform-origin: left bottom; transform: rotate(-90deg) translateX(-0px);
  color: #fff; font-family: 'Inter Display'; font-weight: 800; font-size: 96px; letter-spacing: -2px; white-space: nowrap;
  translate: 99px 0; }
.colmark { left: 37px; top: 60px; }
.lines-deco { left: 150px; top: 0; width: 1770px; height: 1080px;
  background-image: linear-gradient(90deg, rgba(30,59,255,.06) 1px, transparent 1px); background-size: 160px 100%; }
.card { right: 90px; top: 80px; text-align: right; }
.label { font-family: 'Liberation Mono', monospace; font-size: 16px; letter-spacing: 3px; color: #1E3BFF; text-transform: uppercase; }
.name { font-family: 'Inter Display'; font-weight: 700; font-size: 54px; color: #0F0F0F; margin: 6px 0 16px; letter-spacing: -1px; }
.mono { font-family: 'Liberation Mono', monospace; font-size: 22px; color: #2B2B2B; line-height: 1.8; }
.sq { right: 90px; bottom: 80px; width: 22px; height: 22px; background: #FF4D2E; }
</style>
<div class="stage">
  <div class="abs lines-deco"></div>
  <div class="abs col"></div>
  <div class="abs colmark">${mark('#fff', 76, 13)}</div>
  <div class="abs vert">${NAME.toUpperCase()}</div>
  <div class="abs card">
    <div class="label">Freelance</div>
    <div class="name">${NAME}</div>
    <div class="mono">${EMAIL}<br>${SITE}</div>
  </div>
  <div class="abs sq"></div>
</div>`,
};

(async () => {
  const out = path.resolve(__dirname, '..');
  for (const d of ['normal', 'mirrored']) fs.mkdirSync(path.join(out, d), { recursive: true });
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1920, height: 1080 } });
  for (const [id, body] of Object.entries(variations)) {
    for (const mode of ['normal', 'mirrored']) {
      const cls = mode === 'mirrored' ? 'mirror' : '';
      await page.setContent(`<!doctype html><html><head><meta charset="utf-8"><style>${base}</style></head><body class="${cls}">${body}</body></html>`);
      await page.evaluate(() => document.fonts.ready);
      const file = path.join(out, mode, `gustav-meet-${id}${mode === 'mirrored' ? '-mirrored' : ''}.png`);
      await page.screenshot({ path: file });
      console.log('wrote', path.relative(out, file));
    }
  }
  await browser.close();
})();
