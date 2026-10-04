// 3ple Lift campaign: five layered SVG banners (1600 x 900).
// Each banner is built from named layers so it can be edited in Figma,
// Illustrator or Inkscape: layer-background, layer-illustration, layer-logo,
// layer-text and layer-contact.

import fs from 'node:fs';
import { fileURLToPath } from 'node:url';

export const W = 1600;
export const H = 900;
export const SAFE = 80;

export const C = {
  cream: '#EDE7DE',
  green: '#025A4E',
  greenGray: '#4C6763',
  ink: '#364442',
  mint: '#A3DCD4',
  mauve: '#D094E5',
  peach: '#E8B89C',
  sky: '#BDDFF9',
  paper: '#FBF8F3',
};

export const BRAND_STATEMENT = 'We build, secure and manage websites.';
export const CONTACT = {
  web: '3plelift.com',
  whatsapp: 'WhatsApp: +233 26 463 6393',
  email: 'email@3plelift.com',
};

const esc = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

// ---------------------------------------------------------------- icons
const ICONS = {
  globe: '<circle cx="12" cy="12" r="9"/><ellipse cx="12" cy="12" rx="4" ry="9"/><path d="M3 12h18"/>',
  chat: '<path d="M12 3.5a8.5 8.5 0 0 0-7.4 12.7L3.5 20.5l4.4-1.1A8.5 8.5 0 1 0 12 3.5z"/><path d="M8.5 10.5h7M8.5 13.5h4.5"/>',
  mail: '<rect x="3" y="5" width="18" height="14" rx="3"/><path d="M4 7.5l8 6 8-6"/>',
  shield: '<path d="M12 3l7.5 3v5.5c0 4.6-3.2 8.3-7.5 9.9-4.3-1.6-7.5-5.3-7.5-9.9V6z"/><path d="M8.6 12.2l2.4 2.4 4.6-4.8"/>',
  refresh: '<path d="M19.5 12a7.5 7.5 0 1 1-2.2-5.3"/><path d="M19.5 4.5v4.5H15"/>',
  cloud: '<path d="M7.5 18.5h9.5a4 4 0 0 0 .6-8 5.8 5.8 0 0 0-11.1 1.6 3.3 3.3 0 0 0 1 6.4z"/><path d="M12 15.5v-5M9.8 12.6L12 10.4l2.2 2.2"/>',
  wrench: '<path d="M14.5 5.5a4.2 4.2 0 0 0-5.3 5.3L4 16l1.5 2.5L8 20l5.2-5.2a4.2 4.2 0 0 0 5.3-5.3l-2.7 2.7-2.6-.7-.7-2.6z"/>',
  code: '<path d="M8.5 7.5L4 12l4.5 4.5M15.5 7.5L20 12l-4.5 4.5M13.4 5.5l-2.8 13"/>',
  arrow: '<path d="M5 12h14M13 6l6 6-6 6"/>',
  check: '<path d="M5 12.5l4.5 4.5L19 7.5"/>',
  lock: '<rect x="5" y="10.5" width="14" height="10" rx="2.5"/><path d="M8 10.5V8a4 4 0 0 1 8 0v2.5"/>',
  heart: '<path d="M12 20s-7.5-4.6-7.5-10A4.3 4.3 0 0 1 12 7.6 4.3 4.3 0 0 1 19.5 10c0 5.4-7.5 10-7.5 10z"/>',
  sparkle: '<path d="M12 3v4M12 17v4M3 12h4M17 12h4M6 6l2.5 2.5M15.5 15.5L18 18M18 6l-2.5 2.5M8.5 15.5L6 18"/>',
  image: '<rect x="3.5" y="5" width="17" height="14" rx="2.5"/><circle cx="9" cy="10" r="1.6"/><path d="M4 17l5-4.5 3.5 3 3-2.5L20 17"/>',
};

export function icon(name, x, y, size, color, strokeWidth = 2) {
  const s = size / 24;
  return `<g transform="translate(${x} ${y}) scale(${s})" fill="none" stroke="${color}" stroke-width="${strokeWidth / s}" stroke-linecap="round" stroke-linejoin="round">${ICONS[name]}</g>`;
}

// ---------------------------------------------------------------- shared defs
const DEFS = `
  <filter id="blur-xl" x="-50%" y="-50%" width="200%" height="200%"><feGaussianBlur stdDeviation="95"/></filter>
  <filter id="blur-l" x="-50%" y="-200%" width="200%" height="500%"><feGaussianBlur stdDeviation="45"/></filter>
  <filter id="blur-s" x="-50%" y="-50%" width="200%" height="200%"><feGaussianBlur stdDeviation="14"/></filter>
  <filter id="shadow" x="-50%" y="-80%" width="200%" height="280%"><feDropShadow dx="0" dy="22" stdDeviation="26" flood-color="#364442" flood-opacity="0.16"/></filter>
  <filter id="shadow-s" x="-50%" y="-100%" width="200%" height="320%"><feDropShadow dx="0" dy="8" stdDeviation="10" flood-color="#364442" flood-opacity="0.16"/></filter>
  <filter id="shadow-dark" x="-60%" y="-150%" width="220%" height="420%"><feDropShadow dx="0" dy="24" stdDeviation="30" flood-color="#0b1f1c" flood-opacity="0.45"/></filter>
  <linearGradient id="g-hero" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="${C.mint}"/><stop offset="0.55" stop-color="${C.sky}"/><stop offset="1" stop-color="${C.mauve}"/></linearGradient>
  <linearGradient id="g-warm" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="${C.peach}"/><stop offset="1" stop-color="${C.mauve}"/></linearGradient>
  <linearGradient id="g-ring" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="${C.mint}"/><stop offset="0.5" stop-color="${C.mauve}"/><stop offset="1" stop-color="${C.peach}"/></linearGradient>
  <linearGradient id="g-ribbon-a" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="${C.mint}" stop-opacity="0"/><stop offset="0.35" stop-color="${C.mint}"/><stop offset="0.7" stop-color="${C.sky}"/><stop offset="1" stop-color="${C.mauve}" stop-opacity="0.2"/></linearGradient>
  <linearGradient id="g-ribbon-b" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="${C.peach}" stop-opacity="0.1"/><stop offset="0.5" stop-color="${C.peach}"/><stop offset="1" stop-color="${C.mauve}" stop-opacity="0.3"/></linearGradient>
`;

const FONT_CSS = `
  @font-face { font-family: 'Bricolage Grotesque'; font-weight: 700; src: url('fonts/BricolageGrotesque-Bold.ttf'); }
  @font-face { font-family: 'Figtree'; font-weight: 400; src: url('fonts/Figtree-Regular.ttf'); }
  @font-face { font-family: 'Figtree'; font-weight: 500; src: url('fonts/Figtree-Medium.ttf'); }
  @font-face { font-family: 'Figtree'; font-weight: 600; src: url('fonts/Figtree-SemiBold.ttf'); }
  @font-face { font-family: 'Figtree'; font-weight: 700; src: url('fonts/Figtree-Bold.ttf'); }
  .hl { font-family: 'Bricolage Grotesque'; font-weight: 700; }
  .ft { font-family: 'Figtree'; }
`;

export function svgDoc({ id, title, layers }) {
  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" id="${id}" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">
  <title>${esc(title)}</title>
  <style>${FONT_CSS}</style>
  <defs>${DEFS}</defs>
  <g id="layer-background">${layers.background}</g>
  <g id="layer-illustration" data-qa="illustration">${layers.illustration}</g>
  <g id="layer-logo">${layers.logo}</g>
  <g id="layer-text">${layers.text}</g>
  <g id="layer-contact">${layers.contact}</g>
</svg>
`;
}

// ---------------------------------------------------------------- building blocks
export function blobs(list, filter = 'blur-xl') {
  return `<g filter="url(#${filter})">${list
    .map(([cx, cy, rx, ry, fill, op = 1]) => `<ellipse cx="${cx}" cy="${cy}" rx="${rx}" ry="${ry}" fill="${fill}" opacity="${op}"/>`)
    .join('')}</g>`;
}

// Text block: one <text> per line so every line stays individually editable.
export function lines({ id, items, x, y, size, lh, cls = 'ft', weight = 400, fill = C.ink, anchor = 'start', ls = 0, qa = true }) {
  const out = items
    .map((it, i) => {
      const t = typeof it === 'string' ? { t: it } : it;
      const content = t.spans
        ? t.spans.map((s) => `<tspan fill="${s.fill ?? t.fill ?? fill}">${esc(s.t)}</tspan>`).join('')
        : esc(t.t);
      return `<text id="${id}-line${i + 1}" class="${cls}" x="${x}" y="${y + i * lh}" font-size="${size}" font-weight="${weight}" fill="${t.fill ?? fill}" text-anchor="${anchor}" letter-spacing="${ls}">${content}</text>`;
    })
    .join('');
  return `<g id="${id}"${qa ? ' data-qa="text"' : ''}>${out}</g>`;
}

// Highlighter stroke behind a headline line; width is fitted to the text at build time.
export function highlight(forId, y, h, fill, padX = 10, opacity = 0.75) {
  return `<rect class="highlight" data-hl-for="${forId}" data-pad="${padX}" x="0" y="${y}" width="10" height="${h}" rx="${h / 2}" fill="${fill}" opacity="${opacity}"/>`;
}

export function statement({ x, y, align = 'left', theme = 'light' }) {
  const dark = theme === 'dark';
  const bg = dark
    ? `fill="${C.cream}" fill-opacity="0.08" stroke="${C.cream}" stroke-opacity="0.28"`
    : `fill="#FFFFFF" fill-opacity="0.62" stroke="${C.green}" stroke-opacity="0.14"`;
  const cy = y + 27;
  return `<g id="brand-statement" data-qa="statement" data-flow="0" data-x="${x}" data-align="${align}">
    <g class="item" data-pill="20,24">
      <rect class="pill-bg" x="0" y="${y}" width="10" height="54" rx="27" ${bg} stroke-width="1.5"/>
      <g class="pill-content">
        <circle cx="${6}" cy="${cy}" r="6.5" fill="${C.mint}"/>
        <circle cx="${22}" cy="${cy}" r="6.5" fill="${C.mauve}"/>
        <circle cx="${38}" cy="${cy}" r="6.5" fill="${C.peach}"/>
        <text class="ft" x="58" y="${cy + 8}" font-size="23" font-weight="600" fill="${dark ? C.cream : C.green}">${esc(BRAND_STATEMENT)}</text>
      </g>
    </g>
  </g>`;
}

export function cta({ x, y, label, theme = 'green', align = 'left' }) {
  const themes = {
    green: { bg: C.green, fg: C.cream, dot: C.mint, arrow: C.green },
    mint: { bg: C.mint, fg: C.ink, dot: C.green, arrow: C.cream },
  };
  const t = themes[theme];
  const h = 80;
  const cy = y + h / 2;
  return `<g id="cta" data-qa="cta" data-flow="0" data-x="${x}" data-align="${align}">
    <g class="item" data-pill="38,12">
      <rect class="pill-bg" x="0" y="${y}" width="10" height="${h}" rx="${h / 2}" fill="${t.bg}" filter="url(#shadow-s)"/>
      <g class="pill-content" data-flow="22" data-x="0" data-align="left">
        <g class="item"><text class="ft" x="0" y="${cy + 10}" font-size="28" font-weight="700" fill="${t.fg}">${esc(label)}</text></g>
        <g class="item"><circle cx="28" cy="${cy}" r="28" fill="${t.dot}"/>${icon('arrow', 14, cy - 14, 28, t.arrow, 2.6)}</g>
      </g>
    </g>
  </g>`;
}

export function contact({ x, y, align = 'left', theme = 'light', gap = 46 }) {
  const dark = theme === 'dark';
  const disc = dark ? `fill="${C.mint}" fill-opacity="0.16"` : `fill="#FFFFFF" fill-opacity="0.75"`;
  const ic = dark ? C.mint : C.green;
  const fg = dark ? C.cream : C.ink;
  const items = [
    ['globe', CONTACT.web, 'contact-web'],
    ['chat', CONTACT.whatsapp, 'contact-whatsapp'],
    ['mail', CONTACT.email, 'contact-email'],
  ];
  return `<g id="contact" data-qa="contact" data-flow="${gap}" data-x="${x}" data-align="${align}">${items
    .map(
      ([ic_, label, id]) => `<g class="item" id="${id}">
        <circle cx="22" cy="${y}" r="22" ${disc}/>${icon(ic_, 10, y - 12, 24, ic, 2)}
        <text class="ft" x="56" y="${y + 8.5}" font-size="24" font-weight="600" fill="${fg}">${esc(label)}</text>
      </g>`
    )
    .join('')}</g>`;
}

// Authentic 3ple Lift artwork, read from editable-sources/logo/ and embedded as vector
// paths (not linked images) so the logo stays exact and editable in any design tool.
const LOGO_DIR = fileURLToPath(new URL('../logo/', import.meta.url));
const readSvg = (f) => fs.readFileSync(LOGO_DIR + f, 'utf8');
const inner = (svg) => svg.slice(svg.indexOf('>', svg.indexOf('<svg')) + 1, svg.lastIndexOf('</svg>')).trim();

const WORDMARK = { body: inner(readSvg('3ple-lift-logo.svg')), w: 846, h: 213 }; // viewBox 0 0 846 213
const MARK = { body: inner(readSvg('3ple-lift-mark.svg')), x: 226, y: 110, w: 196, h: 207 }; // viewBox 226 110 196 207

export const logoWidth = (h) => (WORDMARK.w * h) / WORDMARK.h;

// Logo layer: the original wordmark at height h. On dark backgrounds it sits on a cream
// chip, because the "ple" lettering is near-black in the original artwork.
export function logoSlot({ x, y, h = 56, chip = false }) {
  const s = h / WORDMARK.h;
  const w = logoWidth(h);
  const chipEl = chip
    ? `<rect id="logo-chip" x="${x - 26}" y="${y - 14}" width="${(w + 52).toFixed(1)}" height="${h + 28}" rx="${(h + 28) / 2}" fill="${C.cream}"/>`
    : '';
  return `<g id="logo" data-qa="logo">${chipEl}<g id="logo-wordmark" transform="translate(${x} ${y}) scale(${s.toFixed(5)})">${WORDMARK.body}</g></g>`;
}

// Background watermark: the "3" mark, very large and faint, recoloured to one tint.
export function watermark({ x, y, h, fill = C.green, opacity = 0.06, rotate = 0 }) {
  const s = h / MARK.h;
  const body = MARK.body.replace(/\sfill="[^"]*"/g, '');
  return `<g id="watermark-3" transform="translate(${x} ${y}) rotate(${rotate}) scale(${s.toFixed(4)}) translate(${-MARK.x} ${-MARK.y})" fill="${fill}" opacity="${opacity}">${body}</g>`;
}

// A generic browser window used across the campaign.
export function browser({ x, y, w, h, url = 'yourbusiness.com', variant = 'fresh', id = 'browser' }) {
  const bar = 54;
  const faded = variant === 'old';
  const frame = faded ? '#F3F0EB' : C.paper;
  const dots = faded ? ['#cfcac3', '#cfcac3', '#cfcac3'] : [C.peach, C.mauve, C.mint];
  const hero = faded ? '#D9D4CD' : 'url(#g-hero)';
  const bars = faded ? '#CBC6BF' : C.green;
  const sub = faded ? '#DDD8D1' : '#C9D6D3';
  const btn = faded ? '#CFCAC3' : C.green;
  const pad = 26;
  const iw = w - pad * 2;
  const hy = y + bar + 4;
  const ih = h - bar - pad - 4;
  const u = ih / 10; // vertical unit so the page mock-up scales with the window
  const lx = x + pad + iw * 0.07;
  return `<g id="${id}">
    <rect x="${x}" y="${y}" width="${w}" height="${h}" rx="26" fill="${frame}" filter="url(#shadow)"/>
    <circle cx="${x + 28}" cy="${y + bar / 2}" r="6.5" fill="${dots[0]}"/>
    <circle cx="${x + 48}" cy="${y + bar / 2}" r="6.5" fill="${dots[1]}"/>
    <circle cx="${x + 68}" cy="${y + bar / 2}" r="6.5" fill="${dots[2]}"/>
    <rect x="${x + 92}" y="${y + 13}" width="${Math.min(260, w - 120)}" height="28" rx="14" fill="${faded ? '#E6E2DC' : C.cream}"/>
    <text class="ft" x="${x + 108}" y="${y + 32.5}" font-size="16" font-weight="500" fill="${faded ? '#A9A49D' : C.greenGray}">${esc(url)}</text>
    <rect x="${x + pad}" y="${hy}" width="${iw}" height="${ih}" rx="16" fill="${hero}" opacity="${faded ? 0.8 : 0.9}"/>
    <rect x="${lx}" y="${hy + ih * 0.13}" width="${iw * 0.44}" height="${u * 1.1}" rx="${u * 0.55}" fill="${bars}"/>
    <rect x="${lx}" y="${hy + ih * 0.13 + u * 1.8}" width="${iw * 0.32}" height="${u * 1.1}" rx="${u * 0.55}" fill="${bars}" opacity="0.85"/>
    <rect x="${lx}" y="${hy + ih * 0.13 + u * 4}" width="${iw * 0.4}" height="${u * 0.6}" rx="${u * 0.3}" fill="${faded ? sub : C.paper}" opacity="0.9"/>
    <rect x="${lx}" y="${hy + ih * 0.13 + u * 5.1}" width="${iw * 0.34}" height="${u * 0.6}" rx="${u * 0.3}" fill="${faded ? sub : C.paper}" opacity="0.9"/>
    <rect x="${lx}" y="${hy + ih * 0.13 + u * 6.0}" width="${iw * 0.2}" height="${u * 1.7}" rx="${u * 0.85}" fill="${btn}"/>
    ${faded ? '' : `<circle cx="${x + pad + iw * 0.76}" cy="${hy + ih * 0.5}" r="${Math.min(ih * 0.36, iw * 0.15)}" fill="${C.paper}" opacity="0.55"/><circle cx="${x + pad + iw * 0.76}" cy="${hy + ih * 0.5}" r="${Math.min(ih * 0.21, iw * 0.09)}" fill="${C.peach}"/>`}
  </g>`;
}
