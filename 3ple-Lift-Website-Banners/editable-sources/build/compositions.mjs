// The five campaign compositions. Coordinates are in the 1600 x 900 artboard;
// widths of pills, buttons and the contact row are fitted to the text at build time.
import { C, W, H, icon, blobs, lines, highlight, statement, cta, contact, logoSlot, browser } from './banners.mjs';

const softBase = (fill = C.cream) => `<rect id="base" width="${W}" height="${H}" fill="${fill}"/>`;

// ---------------------------------------------------------------- 01
// "We build it. Then we stay." A care ring keeps circling the finished website.
function b01(logoHref) {
  const cx = 1215, cy = 452, rx = 278, ry = 218;
  const pts = [
    { a: 215, ic: 'shield', label: 'Protection', below: false },
    { a: 325, ic: 'refresh', label: 'Updates', below: false },
    { a: 35, ic: 'cloud', label: 'Backups', below: true },
    { a: 145, ic: 'wrench', label: 'Fixes & help', below: true },
  ].map((p) => ({ ...p, x: cx + rx * Math.cos((p.a * Math.PI) / 180), y: cy + ry * Math.sin((p.a * Math.PI) / 180) }));
  const fills = [C.mint, C.sky, C.mauve, C.peach];

  const background = `${softBase()}
    ${blobs([[1250, 430, 430, 330, C.mint, 0.75], [1520, 120, 300, 240, C.mauve, 0.55], [1450, 860, 360, 200, C.peach, 0.6], [180, 900, 420, 180, C.sky, 0.55], [60, 60, 260, 180, C.peach, 0.35]])}
    <path d="M-40 760 C 300 640, 520 900, 900 780 S 1400 620, 1680 720" fill="none" stroke="url(#g-ribbon-a)" stroke-width="90" opacity="0.35" filter="url(#blur-l)"/>`;

  const illustration = `
    <ellipse cx="${cx}" cy="${cy}" rx="${rx + 34}" ry="${ry + 30}" fill="none" stroke="${C.green}" stroke-opacity="0.10" stroke-width="2" stroke-dasharray="2 12" stroke-linecap="round"/>
    <ellipse id="care-ring" cx="${cx}" cy="${cy}" rx="${rx}" ry="${ry}" fill="none" stroke="url(#g-ring)" stroke-width="12" stroke-linecap="round"/>
    ${[[cx, cy - ry, 0], [cx, cy + ry, 180]].map(([x, y, r]) => `<path d="M-14 -14 L6 0 L-14 14" transform="translate(${x} ${y}) rotate(${r})" fill="none" stroke="${C.green}" stroke-width="7" stroke-linecap="round" stroke-linejoin="round"/>`).join('')}
    ${browser({ x: cx - 200, y: cy - 128, w: 400, h: 256 })}
    <g id="launch-tag" filter="url(#shadow-s)">
      <rect x="${cx - 88}" y="${cy - 184}" width="176" height="46" rx="23" fill="${C.peach}"/>
      ${icon('sparkle', cx - 72, cy - 173, 24, C.ink, 2.2)}
      <text class="ft" x="${cx - 40}" y="${cy - 154}" font-size="20" font-weight="700" fill="${C.ink}">Launch day</text>
    </g>
    ${pts
      .map(
        (p, i) => `<g id="care-${p.label.split(' ')[0].toLowerCase()}">
        <circle cx="${p.x}" cy="${p.y}" r="40" fill="${C.paper}" filter="url(#shadow-s)"/>
        <circle cx="${p.x}" cy="${p.y}" r="31" fill="${fills[i]}"/>
        ${icon(p.ic, p.x - 15, p.y - 15, 30, C.green, 2.3)}
        <text class="ft" x="${p.x}" y="${p.below ? p.y + 74 : p.y - 56}" text-anchor="middle" font-size="22" font-weight="700" fill="${C.green}">${p.label.replace('&', '&amp;')}</text>
      </g>`
      )
      .join('')}
`;

  const text = `
    ${highlight('headline-line2', 368, 32, C.mint, 12, 0.85)}
    ${lines({ id: 'headline', cls: 'hl', items: [{ t: 'We build it.' }, { t: 'Then we stay.' }], x: 80, y: 282, size: 112, lh: 108, fill: C.green, ls: -2.5, weight: 700 })}
    ${statement({ x: 1520, y: 83, align: 'right' })}
    ${lines({ id: 'support', items: ['Get a new website from a team that sticks with', 'you after launch. We help keep it safe, take care', 'of updates and fixes, and we’re just a message', 'away whenever you need help.'], x: 80, y: 470, size: 28, lh: 41, fill: C.ink })}
    ${cta({ x: 80, y: 632, label: 'Start your new website' })}`;

  return {
    id: 'banner-01',
    slug: 'We-Build-It-Then-We-Stay',
    title: '3ple Lift: We build it. Then we stay.',
    layers: { background, illustration, logo: logoSlot({ x: 80, y: 82, logoHref }), text, contact: contact({ x: 80, y: 790 }) },
  };
}

// ---------------------------------------------------------------- 02
// "One team. One number to call." Build, Secure and Manage overlap into one team.
function b02(logoHref) {
  const r = 172;
  const circles = [
    { cx: 292, cy: 352, fill: C.mint, label: 'Build', sub: ['New websites', '& improvements'], ic: 'code', lx: 210, ly: 300 },
    { cx: 504, cy: 352, fill: C.mauve, label: 'Secure', sub: ['Protection', '& backups'], ic: 'shield', lx: 588, ly: 300 },
    { cx: 398, cy: 536, fill: C.peach, label: 'Manage', sub: ['Hosting, updates', '& fixes'], ic: 'heart', lx: 398, ly: 610 },
  ];
  const background = `${softBase()}
    ${blobs([[420, 450, 420, 360, C.sky, 0.7], [1500, 120, 340, 220, C.mint, 0.65], [1550, 760, 300, 260, C.mauve, 0.4], [-40, 820, 300, 200, C.peach, 0.5]])}
    <path d="M700 -60 C 760 220, 620 420, 780 640 S 900 980, 760 1000" fill="none" stroke="url(#g-ribbon-b)" stroke-width="120" opacity="0.28" filter="url(#blur-l)"/>`;

  const illustration = `
    <g id="venn" style="isolation:isolate">
      ${circles.map((c) => `<circle id="venn-${c.label.toLowerCase()}" cx="${c.cx}" cy="${c.cy}" r="${r}" fill="${c.fill}" opacity="0.62"/>`).join('')}
    </g>
    ${circles
      .map(
        (c) => `<g id="venn-label-${c.label.toLowerCase()}">
        <circle cx="${c.lx}" cy="${c.ly - 66}" r="26" fill="${C.paper}" opacity="0.9"/>
        ${icon(c.ic, c.lx - 14, c.ly - 80, 28, C.green, 2.3)}
        <text class="hl" x="${c.lx}" y="${c.ly}" text-anchor="middle" font-size="38" fill="${C.green}" letter-spacing="-0.5">${c.label}</text>
        ${c.sub.map((s, i) => `<text class="ft" x="${c.lx}" y="${c.ly + 30 + i * 24}" text-anchor="middle" font-size="19" font-weight="600" fill="${C.ink}">${s.replace('&', '&amp;')}</text>`).join('')}
      </g>`
      )
      .join('')}
    <g id="venn-centre" filter="url(#shadow-s)">
      <circle cx="398" cy="414" r="58" fill="${C.green}"/>
      <text class="hl" x="398" y="408" text-anchor="middle" font-size="25" fill="${C.cream}">One</text>
      <text class="hl" x="398" y="436" text-anchor="middle" font-size="25" fill="${C.cream}">team</text>
    </g>`;

  const X = 830;
  const text = `
    ${statement({ x: X, y: 118, align: 'left' })}
    ${highlight('headline-line2', 364, 30, C.peach, 10, 0.8)}
    ${lines({ id: 'headline', cls: 'hl', items: [{ t: 'One team.' }, { t: 'One number' }, { t: 'to call.' }], x: X, y: 290, size: 100, lh: 94, fill: C.green, ls: -2.5, weight: 700 })}
    ${lines({ id: 'support', items: ['Stop chasing different people for design,', 'hosting and fixes. We build your website,', 'help keep it safe and look after it afterward.'], x: X, y: 548, size: 28, lh: 40, fill: C.ink })}
    ${cta({ x: X, y: 656, label: 'Talk to our team' })}`;

  return {
    id: 'banner-02',
    slug: 'One-Team-One-Number',
    title: '3ple Lift: One team. One number to call.',
    layers: { background, illustration, logo: logoSlot({ x: 80, y: 82, logoHref }), text, contact: contact({ x: 80, y: 790 }) },
  };
}

// ---------------------------------------------------------------- 03
// "Old website? Let's give it a lift." A tired site rises up three chevrons into a fresh one.
function b03(logoHref) {
  const background = `${softBase()}
    ${blobs([[1340, 260, 360, 300, C.mauve, 0.5], [1420, 700, 340, 240, C.mint, 0.7], [380, 120, 420, 160, C.sky, 0.6], [520, 880, 520, 170, C.peach, 0.55]])}
    <path d="M1100 1000 C 1150 720, 1380 640, 1330 420 S 1480 80, 1700 40" fill="none" stroke="url(#g-ribbon-a)" stroke-width="150" opacity="0.4" filter="url(#blur-l)"/>`;

  const chevrons = [C.peach, C.mauve, C.mint]
    .map((f, i) => `<path d="M-38 18 L0 -18 L38 18" transform="translate(1316 ${520 - i * 46})" fill="none" stroke="${f}" stroke-width="16" stroke-linecap="round" stroke-linejoin="round"/>`)
    .join('');

  const illustration = `
    <g id="old-site" transform="rotate(-5 1290 650)" opacity="0.95">
      ${browser({ x: 1150, y: 566, w: 290, h: 176, url: 'old-website.com', variant: 'old', id: 'old-browser' })}
      <path d="M1318 626 l-14 22 16 14 -12 24 10 22" fill="none" stroke="#B2ACA4" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round"/>
      ${icon('image', 1368, 636, 34, '#B2ACA4', 2)}
    </g>
    <g id="lift-chevrons">${chevrons}</g>
    <g id="new-site" transform="rotate(3 1370 230)">
      ${browser({ x: 1200, y: 110, w: 310, h: 236, url: 'yourbusiness.com', id: 'new-browser' })}
    </g>
    <g id="new-site-badge" filter="url(#shadow-s)">
      <circle cx="1190" cy="110" r="30" fill="${C.green}"/>
      ${icon('check', 1176, 96, 28, C.cream, 3)}
    </g>
    ${icon('sparkle', 1468, 360, 34, C.green, 2.2)}
    ${icon('sparkle', 1408, 470, 26, C.mauve, 2.4)}
    <g id="label-before">
      <rect x="1050" y="604" width="104" height="40" rx="20" fill="#FFFFFF" fill-opacity="0.7" stroke="#B2ACA4" stroke-width="1.5"/>
      <text class="ft" x="1102" y="630" text-anchor="middle" font-size="19" font-weight="700" fill="${C.greenGray}">Before</text>
    </g>
    <g id="label-after" filter="url(#shadow-s)">
      <rect x="1100" y="318" width="96" height="40" rx="20" fill="${C.green}"/>
      <text class="ft" x="1148" y="344" text-anchor="middle" font-size="19" font-weight="700" fill="${C.cream}">After</text>
    </g>`;

  const text = `
    ${statement({ x: 372, y: 83, align: 'left' })}
    ${highlight('headline-line2', 360, 32, C.mint, 12, 0.85)}
    ${lines({ id: 'headline', cls: 'hl', items: [{ t: 'Old website?' }, { spans: [{ t: 'Let’s give it ', fill: C.ink }, { t: 'a lift.', fill: C.green }] }], x: 80, y: 268, size: 112, lh: 112, fill: C.green, ls: -2.5, weight: 700 })}
    ${lines({ id: 'support', items: ['Is your current website slow, outdated or hard to use?', 'We’ll improve it, help keep it safe, and keep caring', 'for it with updates, backups and fixes.'], x: 80, y: 470, size: 28, lh: 41, fill: C.ink })}
    ${cta({ x: 80, y: 608, label: 'Send us your website link' })}`;

  return {
    id: 'banner-03',
    slug: 'Give-Your-Website-A-Lift',
    title: '3ple Lift: Old website? Let’s give it a lift.',
    layers: { background, illustration, logo: logoSlot({ x: 80, y: 82, logoHref }), text, contact: contact({ x: 80, y: 790 }) },
  };
}

// ---------------------------------------------------------------- 04
// "Your shop has a padlock. Does your website?" Night-time scene, website as the padlock.
function b04(logoHref) {
  const stars = [
    [930, 140, 2.5], [1010, 96, 1.8], [1480, 150, 2.2], [1330, 98, 1.6], [880, 600, 1.8], [1530, 560, 2], [900, 360, 1.5], [1180, 120, 1.4], [640, 120, 1.6], [760, 90, 2],
  ]
    .map(([x, y, r]) => `<circle cx="${x}" cy="${y}" r="${r}" fill="${C.cream}" opacity="0.55"/>`)
    .join('');
  const background = `
    <linearGradient id="g-night" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="${C.green}"/><stop offset="0.6" stop-color="#0E4A42"/><stop offset="1" stop-color="${C.ink}"/></linearGradient>
    <rect id="base" width="${W}" height="${H}" fill="url(#g-night)"/>
    ${blobs([[1220, 470, 360, 320, C.mint, 0.38], [1540, 60, 300, 220, C.mauve, 0.35], [120, 900, 420, 200, C.sky, 0.18], [0, 0, 300, 200, C.greenGray, 0.6]])}
    <path d="M-60 880 C 340 700, 700 980, 1000 820 S 1500 700, 1700 840" fill="none" stroke="${C.mauve}" stroke-width="100" opacity="0.14" filter="url(#blur-l)"/>
    <g id="stars">${stars}</g>`;

  const lx = 1225;
  const illustration = `
    <g data-deco="1"><circle cx="${lx}" cy="500" r="280" fill="none" stroke="${C.mint}" stroke-opacity="0.16" stroke-width="2"/>
    <circle cx="${lx}" cy="500" r="230" fill="none" stroke="${C.mint}" stroke-opacity="0.10" stroke-width="2" stroke-dasharray="3 12" stroke-linecap="round"/></g>
    <linearGradient id="g-shackle" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="${C.mint}"/><stop offset="1" stop-color="${C.sky}"/></linearGradient>
    <path id="shackle" d="M${lx - 135} 420 V 300 a 135 135 0 0 1 270 0 V 420" fill="none" stroke="url(#g-shackle)" stroke-width="46" stroke-linecap="round"/>
    <g id="lock-body" filter="url(#shadow-dark)">
      <rect x="${lx - 230}" y="372" width="460" height="330" rx="58" fill="${C.paper}"/>
    </g>
    <circle cx="${lx - 182}" cy="414" r="7.5" fill="${C.peach}"/>
    <circle cx="${lx - 158}" cy="414" r="7.5" fill="${C.mauve}"/>
    <circle cx="${lx - 134}" cy="414" r="7.5" fill="${C.mint}"/>
    <rect x="${lx - 100}" y="400" width="250" height="28" rx="14" fill="${C.cream}"/>
    ${icon('lock', lx - 88, 405, 18, C.green, 2.2)}
    <text class="ft" x="${lx - 62}" y="420" font-size="16" font-weight="600" fill="${C.greenGray}">yourbusiness.com</text>
    <rect x="${lx - 194}" y="446" width="388" height="222" rx="26" fill="url(#g-hero)" opacity="0.55"/>
    <g id="lock-shield">
      <path d="M${lx} 476 l78 30 v56 c0 48 -33 86 -78 104 c-45 -18 -78 -56 -78 -104 v-56 z" fill="${C.green}"/>
      ${icon('check', lx - 32, 532, 64, C.cream, 6)}
    </g>
    <g id="night-badges">
      <g filter="url(#shadow-dark)"><rect x="896" y="250" width="174" height="56" rx="28" fill="${C.ink}"/></g>
      <rect x="896" y="250" width="174" height="56" rx="28" fill="none" stroke="${C.mint}" stroke-opacity="0.4" stroke-width="1.5"/>
      ${icon('refresh', 914, 266, 24, C.mint, 2.3)}<text class="ft" x="948" y="285.5" font-size="21" font-weight="600" fill="${C.cream}">Updates</text>
      <g filter="url(#shadow-dark)"><rect x="1352" y="214" width="168" height="56" rx="28" fill="${C.ink}"/></g>
      <rect x="1352" y="214" width="168" height="56" rx="28" fill="none" stroke="${C.mint}" stroke-opacity="0.4" stroke-width="1.5"/>
      ${icon('cloud', 1370, 230, 24, C.mint, 2.3)}<text class="ft" x="1404" y="249.5" font-size="21" font-weight="600" fill="${C.cream}">Backups</text>
      <g filter="url(#shadow-dark)"><rect x="1330" y="650" width="190" height="56" rx="28" fill="${C.ink}"/></g>
      <rect x="1330" y="650" width="190" height="56" rx="28" fill="none" stroke="${C.mint}" stroke-opacity="0.4" stroke-width="1.5"/>
      ${icon('shield', 1348, 666, 24, C.mint, 2.3)}<text class="ft" x="1382" y="685.5" font-size="21" font-weight="600" fill="${C.cream}">Protection</text>
    </g>`;

  const text = `
    ${statement({ x: 1520, y: 80, align: 'right', theme: 'dark' })}
    ${lines({ id: 'kicker', cls: 'hl', items: ['Your shop has a padlock.'], x: 80, y: 236, size: 50, lh: 50, fill: C.peach, ls: -1, weight: 700 })}
    ${lines({ id: 'headline', cls: 'hl', items: [{ t: 'Does your', fill: C.cream }, { t: 'website?', fill: C.mint }], x: 80, y: 354, size: 118, lh: 116, ls: -3, weight: 700 })}
    ${lines({ id: 'support', items: ['New website or existing one, we help keep it safe', 'with protection, regular updates and backups.', 'And because we keep looking after it, help is', 'just a message away if anything goes wrong.'], x: 80, y: 534, size: 27, lh: 38, fill: C.cream })}
    ${cta({ x: 80, y: 678, label: 'Ask about website protection', theme: 'mint' })}`;

  return {
    id: 'banner-04',
    slug: 'Does-Your-Website-Have-A-Padlock',
    title: '3ple Lift: Your shop has a padlock. Does your website?',
    layers: { background, illustration, logo: logoSlot({ x: 104, y: 94, h: 50, w: 232, chip: true, logoHref }), text, contact: contact({ x: 1520, y: 818 - 22, align: 'right', theme: 'dark', gap: 40 }) },
  };
}

// ---------------------------------------------------------------- 05
// "You run the business. We'll look after the website." Centred headline over a support chat.
function b05(logoHref) {
  const background = `${softBase()}
    ${blobs([[300, 600, 420, 300, C.mint, 0.65], [1400, 640, 380, 260, C.peach, 0.5], [800, 60, 600, 160, C.sky, 0.65], [1560, 140, 220, 200, C.mauve, 0.45]])}
    <path d="M-80 420 C 300 300, 600 520, 900 420 S 1400 280, 1700 400" fill="none" stroke="url(#g-ribbon-b)" stroke-width="110" opacity="0.25" filter="url(#blur-l)"/>`;

  const px = 80, py = 418, pw = 680, ph = 318;
  const bubble = (x, y, w, h, fill, fg, txt, side) => `
    <rect x="${x}" y="${y}" width="${w}" height="${h}" rx="22" fill="${fill}" filter="url(#shadow-s)"/>
    <path d="${side === 'right' ? `M${x + w - 26} ${y + h - 2} l22 10 -6 -22 z` : `M${x + 26} ${y + h - 2} l-22 10 6 -22 z`}" fill="${fill}"/>
    ${txt.map((t, i) => `<text class="ft" x="${x + 24}" y="${y + 36 + i * 28}" font-size="21" font-weight="500" fill="${fg}">${t}</text>`).join('')}`;

  const illustration = `
    <g id="chat-panel">
      <rect x="${px}" y="${py}" width="${pw}" height="${ph}" rx="34" fill="${C.paper}" opacity="0.7" stroke="${C.green}" stroke-opacity="0.10" stroke-width="1.5"/>
      <circle cx="${px + 48}" cy="${py + 44}" r="22" fill="${C.green}"/>
      ${icon('heart', px + 36, py + 32, 24, C.cream, 2.3)}
      <text class="ft" x="${px + 84}" y="${py + 40}" font-size="21" font-weight="700" fill="${C.ink}">Your website team</text>
      <text class="ft" x="${px + 84}" y="${py + 64}" font-size="17" font-weight="500" fill="${C.greenGray}">Same people who built your site</text>
      <line x1="${px + 28}" y1="${py + 88}" x2="${px + pw - 28}" y2="${py + 88}" stroke="${C.green}" stroke-opacity="0.12" stroke-width="1.5"/>
      ${bubble(px + 226, py + 108, 426, 74, C.green, C.cream, ['Hi! Can we add our new products', 'to the website?'].map((s) => s), 'right')}
      ${bubble(px + 28, py + 196, 436, 46, '#FFFFFF', C.ink, ['Of course. Send them over, we’ve got it.'], 'left')}
      <g>
        <rect x="${px + 28}" y="${py + 256}" width="352" height="44" rx="22" fill="${C.mint}"/>
        ${icon('check', px + 44, py + 266, 24, C.green, 2.8)}
        <text class="ft" x="${px + 78}" y="${py + 285}" font-size="20" font-weight="600" fill="${C.green}">Updates and backup: all done</text>
      </g>
    </g>`;

  const X = 850;
  const text = `
    ${statement({ x: 1520, y: 83, align: 'right' })}
    ${highlight('headline-line2', 330, 30, C.mint, 12, 0.85)}
    ${lines({ id: 'headline', cls: 'hl', items: [{ t: 'You run the business.', fill: C.ink }, { t: 'We’ll look after the website.', fill: C.green }], x: 800, y: 248, size: 92, lh: 100, ls: -2.5, anchor: 'middle', weight: 700 })}
    ${lines({ id: 'support', items: ['We host your website, help keep it safe, and', 'take care of updates, backups and fixes, all by', 'the same team that built it. Need a change?', 'Just send us a message.'], x: X, y: 460, size: 28, lh: 41, fill: C.ink })}
    ${cta({ x: X, y: 640, label: 'Chat with us on WhatsApp' })}`;

  return {
    id: 'banner-05',
    slug: 'You-Run-The-Business',
    title: '3ple Lift: You run the business. We’ll look after the website.',
    layers: { background, illustration, logo: logoSlot({ x: 80, y: 82, logoHref }), text, contact: contact({ x: 800, y: 796, align: 'center' }) },
  };
}

export const BANNERS = [b01, b02, b03, b04, b05];
