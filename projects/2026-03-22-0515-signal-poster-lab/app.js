const state = {
  headline: 'LISTEN TO THE QUIET MACHINE',
  subhead:
    'A procedural poster experiment built from hierarchy, contrast, and a mild disrespect for empty templates.',
  theme: 'editorial',
  density: 'balanced',
  accent: '#4c6fff',
  seed: 2049,
  orbitCount: 5,
  glyphCount: 9,
  tilt: -4,
  grain: 22,
};

const copyBank = {
  headline: [
    'LISTEN TO THE QUIET MACHINE',
    'THE ARCHIVE IS STILL BREATHING',
    'SIGNAL FOUND INSIDE STATIC',
    'MAKE A FLAG FOR THE IMPOSSIBLE',
    'WE LEFT THE MAP OPEN',
    'DO NOT WASTE A GOOD TRANSMISSION',
  ],
  subhead: [
    'A procedural poster experiment built from hierarchy, contrast, and a mild disrespect for empty templates.',
    'Five interface moods, one layout system. Same bones. Different attitude.',
    'Built after a midnight study pass on visual hierarchy, whitespace, contrast, and progressive disclosure.',
    'Use one strong focal point, then let the support details behave like adults.',
    'Tiny tools are allowed to have taste. In fact, they should probably have more of it.',
  ],
};

const styleNotes = {
  editorial: 'Mode: Editorial · crisp hierarchy, calm spacing',
  brutalist: 'Mode: Brutalist · loud contrast, blunt geometry',
  glass: 'Mode: Glass · soft layers, luminous depth',
  terminal: 'Mode: Terminal · mono signal, scanline ritual',
  solarpunk: 'Mode: Solarpunk · breathable color, optimistic structure',
};

const densitySpace = {
  airy: { heroWidth: '54%', heroTop: 92, footerBottom: 40, diagramScale: 0.92 },
  balanced: { heroWidth: '62%', heroTop: 70, footerBottom: 30, diagramScale: 1 },
  packed: { heroWidth: '74%', heroTop: 42, footerBottom: 22, diagramScale: 1.12 },
};

const els = {
  body: document.body,
  poster: document.querySelector('#poster'),
  template: document.querySelector('#poster-template'),
  headline: document.querySelector('#headline'),
  subhead: document.querySelector('#subhead'),
  theme: document.querySelector('#theme'),
  density: document.querySelector('#density'),
  accent: document.querySelector('#accent'),
  seed: document.querySelector('#seed'),
  orbitCount: document.querySelector('#orbitCount'),
  glyphCount: document.querySelector('#glyphCount'),
  tilt: document.querySelector('#tilt'),
  grain: document.querySelector('#grain'),
  randomize: document.querySelector('#randomize'),
  remixCopy: document.querySelector('#remix-copy'),
  exportSvg: document.querySelector('#export-svg'),
  styleNote: document.querySelector('#style-note'),
  seedNote: document.querySelector('#seed-note'),
};

function rng(seed) {
  let t = Number(seed) || 1;
  return () => {
    t += 0x6d2b79f5;
    let x = Math.imul(t ^ (t >>> 15), t | 1);
    x ^= x + Math.imul(x ^ (x >>> 7), x | 61);
    return ((x ^ (x >>> 14)) >>> 0) / 4294967296;
  };
}

function pick(arr, random) {
  return arr[Math.floor(random() * arr.length)];
}

function titleCase(value) {
  return value.replace(/\b\w/g, (c) => c.toUpperCase());
}

function syncState() {
  state.headline = els.headline.value.trim() || copyBank.headline[0];
  state.subhead = els.subhead.value.trim() || copyBank.subhead[0];
  state.theme = els.theme.value;
  state.density = els.density.value;
  state.accent = els.accent.value;
  state.seed = Number(els.seed.value) || 1;
  state.orbitCount = Number(els.orbitCount.value);
  state.glyphCount = Number(els.glyphCount.value);
  state.tilt = Number(els.tilt.value);
  state.grain = Number(els.grain.value);
}

function renderPoster() {
  syncState();
  els.body.dataset.theme = state.theme;
  document.documentElement.style.setProperty('--accent', state.accent);
  els.styleNote.textContent = styleNotes[state.theme];
  els.seedNote.textContent = `Seed: ${state.seed}`;

  const clone = els.template.content.cloneNode(true);
  const root = clone.querySelector('.poster-inner');
  const hero = clone.querySelector('.hero-block');
  const headline = clone.querySelector('.poster-headline');
  const subhead = clone.querySelector('.poster-subhead');
  const rings = clone.querySelector('.rings');
  const glyphLayer = clone.querySelector('.glyph-layer');
  const footerStyle = clone.querySelector('.footer-style');
  const footerDensity = clone.querySelector('.footer-density');
  const footerSeed = clone.querySelector('.footer-seed');

  const density = densitySpace[state.density];
  hero.style.width = density.heroWidth;
  hero.style.marginTop = `${density.heroTop}px`;
  clone.querySelector('.poster-footer').style.bottom = `${density.footerBottom}px`;
  root.style.transform = `rotate(${state.tilt}deg)`;

  headline.textContent = state.headline;
  subhead.textContent = state.subhead;
  footerStyle.textContent = titleCase(state.theme);
  footerDensity.textContent = titleCase(state.density);
  footerSeed.textContent = String(state.seed);

  const random = rng(state.seed);
  const { width, height } = { width: 1000, height: 900 };

  for (let i = 0; i < state.orbitCount; i += 1) {
    const ring = document.createElement('div');
    ring.className = 'ring';
    const size = (160 + i * 85) * density.diagramScale + random() * 26;
    ring.style.width = `${size}px`;
    ring.style.height = `${size}px`;
    ring.style.left = `${540 - size / 2 + (random() - 0.5) * 70}px`;
    ring.style.top = `${360 - size / 2 + (random() - 0.5) * 70}px`;
    ring.style.opacity = `${0.25 + random() * 0.55}`;
    ring.style.borderColor = i === state.orbitCount - 1 ? state.accent : '';
    rings.appendChild(ring);
  }

  const glyphs = ['+', '×', '◼', '◻', '▲', '◆', '◉', '01', '||'];
  for (let i = 0; i < state.glyphCount; i += 1) {
    const glyph = document.createElement('div');
    glyph.className = 'glyph';
    glyph.textContent = pick(glyphs, random);
    const size = 18 + random() * 48;
    glyph.style.fontSize = `${size}px`;
    glyph.style.left = `${70 + random() * 820}px`;
    glyph.style.top = `${90 + random() * 640}px`;
    glyph.style.color = random() > 0.7 ? state.accent : '';
    glyph.style.transform = `rotate(${Math.round(random() * 180)}deg)`;
    glyphLayer.appendChild(glyph);
  }

  root.appendChild(makeTextureLayer(state.grain, state.seed));

  els.poster.innerHTML = '';
  els.poster.appendChild(clone);
}

function makeTextureLayer(grain, seed) {
  const canvas = document.createElement('canvas');
  canvas.width = 1000;
  canvas.height = 900;
  canvas.className = 'texture-layer';
  canvas.style.position = 'absolute';
  canvas.style.inset = '0';
  canvas.style.width = '100%';
  canvas.style.height = '100%';
  canvas.style.opacity = `${grain / 170}`;
  canvas.style.mixBlendMode = 'multiply';
  canvas.style.pointerEvents = 'none';

  const ctx = canvas.getContext('2d');
  const random = rng(seed * 13 + 7);
  for (let i = 0; i < grain * 90; i += 1) {
    const x = random() * canvas.width;
    const y = random() * canvas.height;
    const alpha = random() * 0.2;
    const size = random() * 1.6 + 0.4;
    ctx.fillStyle = `rgba(0,0,0,${alpha})`;
    ctx.fillRect(x, y, size, size);
  }
  return canvas;
}

function randomizeEverything() {
  const random = rng(Date.now());
  els.seed.value = Math.floor(random() * 999999);
  els.theme.value = pick(['editorial', 'brutalist', 'glass', 'terminal', 'solarpunk'], random);
  els.density.value = pick(['airy', 'balanced', 'packed'], random);
  els.orbitCount.value = 2 + Math.floor(random() * 9);
  els.glyphCount.value = 3 + Math.floor(random() * 18);
  els.tilt.value = Math.floor(random() * 25) - 12;
  els.grain.value = Math.floor(random() * 100);
  els.accent.value = pick(['#4c6fff', '#2bb673', '#ff4f18', '#79e1ff', '#ff5ca8', '#ffcd38'], random);
  renderPoster();
}

function remixCopy() {
  const random = rng(state.seed + 99);
  els.headline.value = pick(copyBank.headline, random);
  els.subhead.value = pick(copyBank.subhead, random);
  renderPoster();
}

function exportSVG() {
  syncState();
  const random = rng(state.seed);
  const width = 1000;
  const height = 900;
  const themeMap = {
    editorial: { bg: '#faf7f2', fg: '#101318', muted: '#697386' },
    brutalist: { bg: '#f7f028', fg: '#111111', muted: '#303030' },
    glass: { bg: '#10182d', fg: '#eff6ff', muted: '#b8cae8' },
    terminal: { bg: '#03140c', fg: '#b8ffd6', muted: '#7be8b0' },
    solarpunk: { bg: '#f7ffe4', fg: '#173224', muted: '#577161' },
  };
  const palette = themeMap[state.theme];

  let rings = '';
  const density = densitySpace[state.density];
  for (let i = 0; i < state.orbitCount; i += 1) {
    const size = (160 + i * 85) * density.diagramScale + random() * 26;
    const x = 540 + (random() - 0.5) * 70;
    const y = 360 + (random() - 0.5) * 70;
    rings += `<circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="${(size / 2).toFixed(1)}" fill="none" stroke="${i === state.orbitCount - 1 ? state.accent : palette.muted}" stroke-opacity="0.35" />`;
  }

  const glyphs = ['+', '×', '◼', '◻', '▲', '◆', '◉', '01', '||'];
  let glyphMarkup = '';
  for (let i = 0; i < state.glyphCount; i += 1) {
    const x = 70 + random() * 820;
    const y = 90 + random() * 640;
    const size = 18 + random() * 48;
    const fill = random() > 0.7 ? state.accent : palette.fg;
    glyphMarkup += `<text x="${x.toFixed(1)}" y="${y.toFixed(1)}" fill="${fill}" font-size="${size.toFixed(1)}" font-family="Inter, Arial, sans-serif" font-weight="800">${pick(glyphs, random)}</text>`;
  }

  const svg = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">
  <rect width="100%" height="100%" fill="${palette.bg}" />
  <line x1="100" y1="450" x2="900" y2="450" stroke="${palette.muted}" stroke-opacity="0.3" />
  <line x1="580" y1="90" x2="580" y2="790" stroke="${palette.muted}" stroke-opacity="0.3" />
  ${rings}
  ${glyphMarkup}
  <text x="34" y="44" fill="${palette.muted}" font-size="12" font-family="Inter, Arial, sans-serif" letter-spacing="3">SIGNAL / ARCHIVE / 07</text>
  <text x="34" y="178" fill="${palette.muted}" font-size="13" font-family="Inter, Arial, sans-serif" letter-spacing="4">CURRENT TRANSMISSION</text>
  <text x="34" y="280" fill="${palette.fg}" font-size="88" font-family="Inter, Arial, sans-serif" font-weight="900">${escapeXml(state.headline)}</text>
  <text x="34" y="340" fill="${palette.muted}" font-size="24" font-family="Inter, Arial, sans-serif">${escapeXml(state.subhead)}</text>
  <text x="34" y="846" fill="${palette.muted}" font-size="12" font-family="Inter, Arial, sans-serif" letter-spacing="3">STYLE VECTOR</text>
  <text x="34" y="876" fill="${palette.fg}" font-size="18" font-family="Inter, Arial, sans-serif" font-weight="700">${escapeXml(titleCase(state.theme))}</text>
  <text x="348" y="846" fill="${palette.muted}" font-size="12" font-family="Inter, Arial, sans-serif" letter-spacing="3">LAYOUT DENSITY</text>
  <text x="348" y="876" fill="${palette.fg}" font-size="18" font-family="Inter, Arial, sans-serif" font-weight="700">${escapeXml(titleCase(state.density))}</text>
  <text x="730" y="846" fill="${palette.muted}" font-size="12" font-family="Inter, Arial, sans-serif" letter-spacing="3">SEED</text>
  <text x="730" y="876" fill="${palette.fg}" font-size="18" font-family="Inter, Arial, sans-serif" font-weight="700">${state.seed}</text>
</svg>`;

  const blob = new Blob([svg], { type: 'image/svg+xml;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `signal-poster-${state.theme}-${state.seed}.svg`;
  document.body.appendChild(link);
  link.click();
  link.remove();
  URL.revokeObjectURL(url);
}

function escapeXml(value) {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&apos;');
}

[
  els.headline,
  els.subhead,
  els.theme,
  els.density,
  els.accent,
  els.seed,
  els.orbitCount,
  els.glyphCount,
  els.tilt,
  els.grain,
].forEach((el) => el.addEventListener('input', renderPoster));

els.randomize.addEventListener('click', randomizeEverything);
els.remixCopy.addEventListener('click', remixCopy);
els.exportSvg.addEventListener('click', exportSVG);

renderPoster();
