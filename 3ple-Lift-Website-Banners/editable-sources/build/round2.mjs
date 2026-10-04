// Round 2: bolder hooks built on everyday moments business owners recognise.
// Same system as round 1 (fonts, palette, logo, brand statement, contact row, 80px safe area).
import { C, W, H, icon, blobs, lines, highlight, statement, cta, contact, logoSlot, watermark, browser } from './banners.mjs';

const OUT_DIR = 'Round-2-Bold-Hooks';
const base = (fill = C.cream) => `<rect id="base" width="${W}" height="${H}" fill="${fill}"/>`;
const t = (x, y, size, weight, fill, str, extra = '') =>
  `<text class="ft" x="${x}" y="${y}" font-size="${size}" font-weight="${weight}" fill="${fill}" ${extra}>${str}</text>`;
const hl = (x, y, size, fill, str, extra = '') => `<text class="hl" x="${x}" y="${y}" font-size="${size}" fill="${fill}" ${extra}>${str}</text>`;

// ---------------------------------------------------------------- R2-1
// "Going up? Press 3." The 3ple Lift lift: floor 1 Build, floor 2 Secure, floor 3 Manage.
function r1() {
  const background = `${base()}
    ${blobs([[1250, 460, 420, 360, C.sky, 0.8], [180, 120, 360, 200, C.peach, 0.45], [120, 860, 420, 200, C.mint, 0.6], [1560, 80, 260, 200, C.mauve, 0.45]])}
    <path d="M-60 700 C 260 560, 520 860, 860 720 S 1300 560, 1700 680" fill="none" stroke="url(#g-ribbon-a)" stroke-width="100" opacity="0.3" filter="url(#blur-l)"/>
    ${watermark({ x: 600, y: 470, h: 520, opacity: 0.05 })}`;

  const dx = 950, dy = 176;
  const floors = [
    { n: '3', label: 'Manage', y: 474, lit: true },
    { n: '2', label: 'Secure', y: 552 },
    { n: '1', label: 'Build', y: 630 },
  ];
  const illustration = `
    <g id="lift-doors">
      <rect x="${dx}" y="${dy}" width="340" height="566" rx="26" fill="${C.paper}" filter="url(#shadow)"/>
      <rect x="${dx + 40}" y="${dy + 22}" width="260" height="34" rx="17" fill="${C.green}"/>
      ${icon('up', dx + 56, dy + 27, 24, C.mint, 2.6)}
      ${['1', '2', '3'].map((n, i) => `<circle cx="${dx + 130 + i * 52}" cy="${dy + 39}" r="12" fill="${n === '3' ? C.mint : C.greenGray}"/><text class="hl" x="${dx + 130 + i * 52}" y="${dy + 45}" font-size="17" text-anchor="middle" fill="${n === '3' ? C.green : C.cream}">${n}</text>`).join('')}
      <linearGradient id="g-door" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="${C.sky}"/><stop offset="1" stop-color="${C.mint}"/></linearGradient>
      <linearGradient id="g-gap" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${C.peach}"/><stop offset="1" stop-color="#FFF6EC"/></linearGradient>
      <rect x="${dx + 26}" y="${dy + 76}" width="288" height="466" rx="12" fill="url(#g-gap)"/>
      <rect x="${dx + 26}" y="${dy + 76}" width="128" height="466" rx="12" fill="url(#g-door)"/>
      <rect x="${dx + 186}" y="${dy + 76}" width="128" height="466" rx="12" fill="url(#g-door)"/>
      <rect x="${dx + 140}" y="${dy + 290}" width="6" height="60" rx="3" fill="${C.paper}" opacity="0.8"/>
      <rect x="${dx + 194}" y="${dy + 290}" width="6" height="60" rx="3" fill="${C.paper}" opacity="0.8"/>
      ${icon('sparkle', dx + 152, dy + 250, 36, C.green, 2)}
    </g>
    <g id="lift-panel">
      <linearGradient id="g-panel" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${C.ink}"/><stop offset="1" stop-color="${C.green}"/></linearGradient>
      <rect x="1318" y="250" width="202" height="440" rx="34" fill="url(#g-panel)" filter="url(#shadow)"/>
      <rect x="1342" y="274" width="154" height="124" rx="20" fill="#0B2F2A"/>
      ${watermark({ x: 1386, y: 298, h: 76, fill: C.mint, opacity: 1 }).replace('id="watermark-3"', 'id="panel-display-3"')}
      ${icon('up', 1352, 290, 22, C.mint, 2.6)}
      ${floors
        .map(
          (f) => `<g id="button-${f.n}">
          ${f.lit ? `<circle cx="1374" cy="${f.y}" r="40" fill="${C.mint}" opacity="0.25"/>` : ''}
          <circle cx="1374" cy="${f.y}" r="29" fill="${f.lit ? C.mint : 'none'}" stroke="${f.lit ? C.mint : C.cream}" stroke-opacity="${f.lit ? 1 : 0.55}" stroke-width="3"/>
          ${hl(1374, f.y + 11, 30, f.lit ? C.green : C.cream, f.n, 'text-anchor="middle"')}
          ${t(1416, f.y + 7, 20, 700, f.lit ? C.mint : C.cream, f.label)}
        </g>`
        )
        .join('')}
    </g>`;

  const nums = ['1', '2', '3'];
  const items = ['We build your new website, or improve your old one.', 'We help keep it safe with protection and backups.', 'We look after it: hosting, updates and fixes.'];
  const text = `
    ${statement({ x: 1520, y: 83, align: 'right' })}
    ${highlight('headline-line2', 408, 34, C.mint, 12, 0.85)}
    ${lines({ id: 'headline', cls: 'hl', items: [{ t: 'Going up?', fill: C.ink }, { t: 'Press 3.', fill: C.green }], x: 80, y: 300, size: 136, lh: 130, ls: -3.5, weight: 700 })}
    <g id="floors-list" data-qa="text">
      ${items.map((s, i) => `<circle cx="97" cy="${506 + i * 46 - 9}" r="17" fill="${C.green}"/><text class="hl" x="97" y="${506 + i * 46 - 2}" font-size="19" text-anchor="middle" fill="${C.cream}">${nums[i]}</text><text id="floor-${i + 1}" class="ft" x="128" y="${506 + i * 46}" font-size="26" font-weight="500" fill="${C.ink}">${s}</text>`).join('')}
    </g>
    ${cta({ x: 80, y: 650, label: 'Take the lift: message us' })}`;

  return { id: 'banner-r2-01', slug: 'Going-Up-Press-3', title: '3ple Lift: Going up? Press 3.', outDir: OUT_DIR, round: 'R2',
    layers: { background, illustration, logo: logoSlot({ x: 80, y: 82 }), text, contact: contact({ x: 80, y: 790 }) } };
}

// ---------------------------------------------------------------- R2-2
// "They built your website… Then stopped picking your calls?" Call log of unanswered calls.
function r2() {
  const background = `${base()}
    ${blobs([[330, 470, 380, 360, C.peach, 0.7], [1500, 160, 320, 220, C.mint, 0.6], [1200, 860, 480, 180, C.mauve, 0.35], [700, 40, 300, 140, C.sky, 0.5]])}
    <path d="M-80 260 C 200 160, 420 360, 640 260 S 1000 120, 1200 200" fill="none" stroke="url(#g-ribbon-b)" stroke-width="90" opacity="0.25" filter="url(#blur-l)"/>
    ${watermark({ x: 1240, y: 360, h: 600, opacity: 0.06 })}`;

  const px = 150, py = 160, pw = 340, ph = 560;
  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'];
  const illustration = `
    <g id="phone" transform="rotate(-4 ${px + pw / 2} ${py + ph / 2})">
      <rect x="${px}" y="${py}" width="${pw}" height="${ph}" rx="52" fill="${C.ink}" filter="url(#shadow)"/>
      <rect x="${px + 12}" y="${py + 12}" width="${pw - 24}" height="${ph - 24}" rx="42" fill="${C.paper}"/>
      <rect x="${px + pw / 2 - 40}" y="${py + 24}" width="80" height="18" rx="9" fill="${C.ink}"/>
      ${t(px + 36, py + 96, 30, 700, C.ink, 'Recents', 'font-family="Bricolage Grotesque"')}
      ${days
        .map((d, i) => {
          const y = py + 140 + i * 74;
          return `<g id="call-${d.toLowerCase()}">
            <circle cx="${px + 58}" cy="${y + 22}" r="22" fill="${C.cream}"/>
            ${icon('callOut', px + 46, y + 10, 24, C.peach, 2.2)}
            ${t(px + 94, y + 18, 20, 700, C.ink, 'Web designer')}
            ${t(px + 94, y + 42, 16, 600, '#B7704D', 'No answer')}
            ${t(px + pw - 36, y + 18, 16, 500, C.greenGray, d, 'text-anchor="end"')}
            <line x1="${px + 36}" y1="${y + 60}" x2="${px + pw - 36}" y2="${y + 60}" stroke="${C.ink}" stroke-opacity="0.08"/>
          </g>`;
        })
        .join('')}
    </g>
    <g id="missed-badge" filter="url(#shadow-s)">
      <circle cx="${px + pw - 6}" cy="${py + 6}" r="34" fill="${C.peach}"/>
      ${hl(px + pw - 6, py + 18, 34, C.ink, '5', 'text-anchor="middle"')}
    </g>
    <g id="reply-card" filter="url(#shadow)">
      <rect x="378" y="634" width="300" height="118" rx="26" fill="${C.green}"/>
    </g>
    <path d="M398 750 l-14 20 34 -18 z" fill="${C.green}"/>
    <rect x="398" y="648" width="114" height="30" rx="15" fill="${C.cream}"/>
    ${logoSlot({ x: 408, y: 653, h: 20 }).replace('id="logo"', 'id="reply-logo-art"').replace(' data-qa="logo"', '').replace('id="logo-wordmark"', 'id="reply-wordmark-art"')}
    ${t(400, 708, 21, 600, C.cream, 'Hi! We’re here. What do')}
    ${t(400, 735, 21, 600, C.cream, 'you need help with?')}`;

  const X = 760;
  const text = `
    ${statement({ x: 1520, y: 83, align: 'right' })}
    ${lines({ id: 'kicker', cls: 'hl', items: ['They built your website…'], x: X, y: 236, size: 46, lh: 46, fill: C.greenGray, ls: -1, weight: 700 })}
    ${highlight('headline-line3', 520, 32, C.peach, 12, 0.85)}
    ${lines({ id: 'headline', cls: 'hl', items: ['Then stopped', 'picking your', 'calls?'], x: X, y: 344, size: 100, lh: 98, fill: C.green, ls: -2.5, weight: 700 })}
    ${lines({ id: 'support', items: ['With us, the same team that builds your website', 'stays on to keep it safe, updated and fixed.'], x: X, y: 600, size: 27, lh: 38, fill: C.ink })}
    ${cta({ x: X, y: 660, label: 'Call us. We pick up.' })}`;

  return { id: 'banner-r2-02', slug: 'Stopped-Picking-Your-Calls', title: '3ple Lift: They built your website… Then stopped picking your calls?', outDir: OUT_DIR, round: 'R2',
    layers: { background, illustration, logo: logoSlot({ x: 80, y: 82 }), text, contact: contact({ x: 80, y: 796 }) } };
}

// ---------------------------------------------------------------- R2-3
// "Your business deserves more than a WhatsApp status." From a status post to a proper website.
function r3() {
  const background = `${base()}
    ${blobs([[1300, 560, 420, 300, C.mauve, 0.55], [200, 120, 380, 180, C.mint, 0.55], [700, 900, 480, 160, C.peach, 0.5], [1560, 120, 240, 200, C.sky, 0.6]])}
    <path d="M820 1000 C 900 760, 1100 700, 1260 560 S 1500 260, 1700 220" fill="none" stroke="url(#g-ribbon-a)" stroke-width="120" opacity="0.32" filter="url(#blur-l)"/>
    ${watermark({ x: 560, y: 470, h: 560, opacity: 0.05 })}`;

  const sx = 930, sy = 420, sw = 190, sh = 330;
  const bx = 1170, by = 418, bw = 350, bh = 300;
  const products = [C.peach, C.mint, C.mauve];
  const illustration = `
    <g id="status-phone" transform="rotate(-6 ${sx + sw / 2} ${sy + sh / 2})">
      <rect x="${sx}" y="${sy}" width="${sw}" height="${sh}" rx="30" fill="${C.ink}" filter="url(#shadow)"/>
      <linearGradient id="g-status" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${C.peach}"/><stop offset="1" stop-color="${C.mauve}"/></linearGradient>
      <rect x="${sx + 8}" y="${sy + 8}" width="${sw - 16}" height="${sh - 16}" rx="24" fill="url(#g-status)"/>
      ${[0, 1, 2, 3].map((i) => `<rect x="${sx + 20 + i * 39}" y="${sy + 22}" width="33" height="4" rx="2" fill="${C.paper}" opacity="${i === 0 ? 1 : 0.45}"/>`).join('')}
      <circle cx="${sx + 34}" cy="${sy + 52}" r="13" fill="${C.paper}" opacity="0.9"/>
      <rect x="${sx + 54}" y="${sy + 46}" width="70" height="10" rx="5" fill="${C.paper}" opacity="0.8"/>
      ${icon('bag', sx + sw / 2 - 30, sy + 110, 60, C.paper, 2)}
      ${hl(sx + sw / 2, sy + 210, 24, C.paper, 'New stock!', 'text-anchor="middle"')}
      ${t(sx + sw / 2, sy + 236, 15, 600, C.paper, 'DM to order', 'text-anchor="middle"')}
      <rect x="${sx + 20}" y="${sy + sh - 52}" width="${sw - 40}" height="30" rx="15" fill="none" stroke="${C.paper}" stroke-opacity="0.7" stroke-width="1.5"/>
      ${t(sx + 36, sy + sh - 32, 14, 500, C.paper, 'Reply…')}
    </g>
    <path id="upgrade-arrow" d="M1092 470 C 1120 420, 1150 410, 1176 404" fill="none" stroke="${C.green}" stroke-width="5" stroke-linecap="round" stroke-dasharray="2 12"/>
    <path d="M1162 392 l18 12 -20 8" fill="none" stroke="${C.green}" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"/>
    <g id="business-site">
      <rect x="${bx}" y="${by}" width="${bw}" height="${bh}" rx="24" fill="${C.paper}" filter="url(#shadow)"/>
      <circle cx="${bx + 24}" cy="${by + 24}" r="6" fill="${C.peach}"/><circle cx="${bx + 42}" cy="${by + 24}" r="6" fill="${C.mauve}"/><circle cx="${bx + 60}" cy="${by + 24}" r="6" fill="${C.mint}"/>
      <rect x="${bx + 80}" y="${by + 12}" width="190" height="24" rx="12" fill="${C.cream}"/>
      ${t(bx + 94, by + 29, 14, 600, C.greenGray, 'yourbusiness.com')}
      <rect x="${bx + 20}" y="${by + 52}" width="${bw - 40}" height="80" rx="14" fill="url(#g-hero)" opacity="0.9"/>
      <rect x="${bx + 38}" y="${by + 72}" width="140" height="14" rx="7" fill="${C.green}"/>
      <rect x="${bx + 38}" y="${by + 96}" width="96" height="10" rx="5" fill="${C.paper}"/>
      ${products
        .map(
          (f, i) => `<g id="product-${i + 1}">
          <rect x="${bx + 20 + i * 106}" y="${by + 146}" width="96" height="134" rx="14" fill="#FFFFFF" stroke="${C.ink}" stroke-opacity="0.06"/>
          <rect x="${bx + 28 + i * 106}" y="${by + 154}" width="80" height="62" rx="10" fill="${f}" opacity="0.8"/>
          <rect x="${bx + 28 + i * 106}" y="${by + 226}" width="56" height="8" rx="4" fill="${C.ink}" opacity="0.5"/>
          <rect x="${bx + 28 + i * 106}" y="${by + 246}" width="80" height="24" rx="12" fill="${C.green}"/>
          ${t(bx + 68 + i * 106, by + 263, 13, 700, C.cream, 'Order', 'text-anchor="middle"')}
        </g>`
        )
        .join('')}
    </g>
    <g id="site-badge" filter="url(#shadow-s)">
      <rect x="1270" y="${by + bh - 8}" width="250" height="44" rx="22" fill="${C.green}"/>
      ${icon('check', 1286, by + bh + 2, 24, C.mint, 2.8)}
      ${t(1318, by + bh + 21, 18, 700, C.cream, 'A home that’s all yours')}
    </g>`;

  const text = `
    ${statement({ x: 1520, y: 83, align: 'right' })}
    ${highlight('headline-line2', 330, 28, C.mint, 12, 0.85)}
    ${lines({ id: 'headline', cls: 'hl', items: [{ t: 'Your business deserves more', fill: C.ink }, { t: 'than a WhatsApp status.', fill: C.green }], x: 80, y: 252, size: 86, lh: 98, ls: -2.5, weight: 700 })}
    ${lines({ id: 'support', items: ['Give customers a proper home where they can find you,', 'see what you sell and trust you. We build it, help keep', 'it safe and look after it long after launch.'], x: 80, y: 468, size: 27, lh: 40, fill: C.ink })}
    ${cta({ x: 80, y: 614, label: 'Get your own website' })}`;

  return { id: 'banner-r2-03', slug: 'More-Than-A-WhatsApp-Status', title: '3ple Lift: Your business deserves more than a WhatsApp status.', outDir: OUT_DIR, round: 'R2',
    layers: { background, illustration, logo: logoSlot({ x: 80, y: 82 }), text, contact: contact({ x: 80, y: 790 }) } };
}

// ---------------------------------------------------------------- R2-4
// "Before customers call, they search. What will they find?" A search with a broken and a great result.
function r4() {
  const background = `${base()}
    ${blobs([[1220, 420, 440, 360, C.sky, 0.85], [120, 820, 380, 200, C.peach, 0.5], [1560, 860, 300, 200, C.mint, 0.6], [200, 100, 300, 160, C.mauve, 0.3]])}
    ${watermark({ x: 560, y: 520, h: 480, opacity: 0.05 })}`;

  const sx = 930;
  const illustration = `
    <g id="search-bar" filter="url(#shadow)">
      <rect x="${sx}" y="186" width="590" height="84" rx="42" fill="#FFFFFF"/>
    </g>
    ${icon('search', sx + 30, 210, 36, C.green, 2.6)}
    ${t(sx + 84, 238, 27, 500, C.ink, 'your business name')}
    <rect x="${sx + 336}" y="212" width="3" height="34" rx="1.5" fill="${C.green}"/>
    <g id="result-bad" transform="rotate(-2 1210 380)" opacity="0.95">
      <rect x="${sx + 20}" y="300" width="560" height="150" rx="22" fill="#F4F1EC" stroke="#CFC9C1" stroke-width="1.5"/>
      ${t(sx + 48, 338, 17, 600, '#A49E96', 'yourbusiness-old.com')}
      ${icon('alert', sx + 48, 356, 30, '#B7704D', 2.2)}
      ${t(sx + 90, 380, 24, 700, '#8E8880', 'This site can’t be reached')}
      <rect x="${sx + 48}" y="402" width="300" height="10" rx="5" fill="#DDD8D1"/>
      <rect x="${sx + 48}" y="420" width="220" height="10" rx="5" fill="#DDD8D1"/>
      <circle cx="${sx + 540}" cy="330" r="22" fill="${C.peach}"/>
      ${icon('x', sx + 528, 318, 24, C.ink, 2.8)}
    </g>
    <g id="result-good" filter="url(#shadow)">
      <rect x="${sx}" y="482" width="590" height="250" rx="26" fill="${C.paper}"/>
    </g>
    ${t(sx + 28, 520, 17, 600, C.greenGray, 'yourbusiness.com')}
    ${hl(sx + 28, 556, 28, C.green, 'Your Business · Open today')}
    <rect x="${sx + 28}" y="576" width="250" height="132" rx="16" fill="url(#g-hero)"/>
    <rect x="${sx + 48}" y="600" width="130" height="14" rx="7" fill="${C.green}"/>
    <rect x="${sx + 48}" y="624" width="90" height="10" rx="5" fill="${C.paper}"/>
    <rect x="${sx + 48}" y="664" width="90" height="28" rx="14" fill="${C.green}"/>
    <rect x="${sx + 300}" y="582" width="250" height="12" rx="6" fill="${C.ink}" opacity="0.35"/>
    <rect x="${sx + 300}" y="604" width="210" height="12" rx="6" fill="${C.ink}" opacity="0.2"/>
    <rect x="${sx + 300}" y="626" width="230" height="12" rx="6" fill="${C.ink}" opacity="0.2"/>
    <rect x="${sx + 300}" y="664" width="116" height="40" rx="20" fill="${C.mint}"/>
    ${icon('phone', sx + 314, 674, 20, C.green, 2.4)}${t(sx + 342, 690, 17, 700, C.green, 'Call')}
    <rect x="${sx + 428}" y="664" width="132" height="40" rx="20" fill="${C.cream}"/>
    ${icon('chat', sx + 442, 674, 20, C.green, 2.2)}${t(sx + 470, 690, 17, 700, C.green, 'Message')}
    <circle cx="${sx + 552}" cy="514" r="22" fill="${C.green}"/>
    ${icon('check', sx + 540, 502, 24, C.cream, 3)}`;

  const text = `
    ${statement({ x: 1520, y: 83, align: 'right' })}
    ${lines({ id: 'kicker', cls: 'hl', items: ['Before customers call, they search.'], x: 80, y: 236, size: 44, lh: 44, fill: C.greenGray, ls: -1, weight: 700 })}
    ${highlight('headline-line2', 456, 34, C.peach, 12, 0.85)}
    ${lines({ id: 'headline', cls: 'hl', items: [{ t: 'What will', fill: C.ink }, { t: 'they find?', fill: C.green }], x: 80, y: 360, size: 128, lh: 118, ls: -3.5, weight: 700 })}
    ${lines({ id: 'support', items: ['A slow, broken or outdated website can send them', 'elsewhere. We build or improve your site, help keep', 'it safe and keep it up to date.'], x: 80, y: 548, size: 27, lh: 38, fill: C.ink })}
    ${cta({ x: 80, y: 664, label: 'Make it a great first look' })}`;

  return { id: 'banner-r2-04', slug: 'What-Will-They-Find', title: '3ple Lift: Before customers call, they search. What will they find?', outDir: OUT_DIR, round: 'R2',
    layers: { background, illustration, logo: logoSlot({ x: 80, y: 82 }), text, contact: contact({ x: 80, y: 796 }) } };
}

// ---------------------------------------------------------------- R2-5
// "A broken website is a shop with its shutters down. We'll lift them."
function r5() {
  const background = `${base('#F1E6DC')}
    ${blobs([[1200, 520, 440, 340, C.peach, 0.75], [160, 160, 380, 200, C.mint, 0.5], [600, 900, 520, 170, C.mauve, 0.35], [1560, 60, 260, 200, C.sky, 0.6]])}
    ${watermark({ x: 590, y: 420, h: 560, opacity: 0.06 })}`;

  const sx = 930, sw = 590;
  const stripes = 8;
  const sw8 = sw / stripes;
  const awning = Array.from({ length: stripes }, (_, i) => `<rect x="${sx + i * sw8}" y="190" width="${sw8}" height="70" fill="${i % 2 ? C.paper : C.green}"/>`).join('');
  const scallops = Array.from({ length: stripes }, (_, i) => `<path d="M${sx + i * sw8} 258 a ${sw8 / 2} 22 0 0 0 ${sw8} 0 z" fill="${i % 2 ? C.paper : C.green}"/>`).join('');
  const ox = sx + 50, ow = sw - 100, oy = 300, oh = 420;
  const shutterH = 190;
  const slats = Array.from({ length: Math.floor(shutterH / 19) }, (_, i) => `<line x1="${ox}" y1="${oy + 19 + i * 19}" x2="${ox + ow}" y2="${oy + 19 + i * 19}" stroke="${C.ink}" stroke-opacity="0.18" stroke-width="2"/>`).join('');
  const illustration = `
    <g id="shopfront">
      <rect x="${sx + 20}" y="236" width="${sw - 40}" height="504" rx="18" fill="${C.cream}" filter="url(#shadow)"/>
      <g id="awning" filter="url(#shadow-s)">${awning}${scallops}<rect x="${sx}" y="182" width="${sw}" height="16" rx="8" fill="${C.ink}"/></g>
      <rect x="${ox - 10}" y="${oy - 10}" width="${ow + 20}" height="${oh + 20}" rx="14" fill="${C.ink}" opacity="0.9"/>
      ${browser({ x: ox, y: oy, w: ow, h: oh, id: 'shop-website' })}
      <g id="shutter">
        <linearGradient id="g-shutter" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#C9D3D0"/><stop offset="1" stop-color="#AEBDB9"/></linearGradient>
        <rect x="${ox}" y="${oy}" width="${ow}" height="${shutterH}" fill="url(#g-shutter)"/>
        ${slats}
        <rect x="${ox}" y="${oy + shutterH - 14}" width="${ow}" height="14" fill="${C.greenGray}"/>
        <rect x="${ox + ow / 2 - 40}" y="${oy + shutterH - 4}" width="80" height="12" rx="6" fill="${C.ink}"/>
      </g>
      <g id="lift-chevrons">
        ${[C.peach, C.mauve, C.mint].map((f, i) => `<path d="M-30 14 L0 -14 L30 14" transform="translate(${ox + ow / 2} ${oy + 150 - i * 40})" fill="none" stroke="${f}" stroke-width="13" stroke-linecap="round" stroke-linejoin="round"/>`).join('')}
      </g>
      <g id="open-sign" filter="url(#shadow-s)">
        <line x1="${sx + sw - 120}" y1="262" x2="${sx + sw - 136}" y2="300" stroke="${C.ink}" stroke-width="2"/>
        <line x1="${sx + sw - 60}" y1="262" x2="${sx + sw - 44}" y2="300" stroke="${C.ink}" stroke-width="2"/>
        <rect x="${sx + sw - 160}" y="298" width="140" height="52" rx="12" fill="${C.peach}"/>
        ${hl(sx + sw - 90, 334, 26, C.ink, 'Open again', 'text-anchor="middle"')}
      </g>
    </g>`;

  const text = `
    ${statement({ x: 1520, y: 83, align: 'right' })}
    ${lines({ id: 'kicker', cls: 'hl', items: ['A broken website is a shop', 'with its shutters down.'], x: 80, y: 220, size: 44, lh: 50, fill: C.greenGray, ls: -1, weight: 700 })}
    ${highlight('headline-line2', 500, 34, C.mint, 12, 0.85)}
    ${lines({ id: 'headline', cls: 'hl', items: [{ t: 'We’ll lift', fill: C.ink }, { t: 'them.', fill: C.green }], x: 80, y: 402, size: 132, lh: 120, ls: -3.5, weight: 700 })}
    ${lines({ id: 'support', items: ['Down, hacked or just not working? We get your website', 'back up, then help keep it safe, updated and backed up.'], x: 80, y: 590, size: 27, lh: 38, fill: C.ink })}
    ${cta({ x: 80, y: 662, label: 'Get your website back up' })}`;

  return { id: 'banner-r2-05', slug: 'Well-Lift-Your-Shutters', title: '3ple Lift: A broken website is a shop with its shutters down. We’ll lift them.', outDir: OUT_DIR, round: 'R2',
    layers: { background, illustration, logo: logoSlot({ x: 80, y: 82 }), text, contact: contact({ x: 80, y: 790 }) } };
}

export const ROUND2 = [r1, r2, r3, r4, r5];
