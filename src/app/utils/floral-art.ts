/**
 * Floral Art Generation Engine
 * Contains the exact mathematical SVG generation algorithms provided by the user
 * for Yellow Flowers (Flores Amarillas): Girasol, Narciso, Tulipán, Rosa, Mimosa,
 * individual botanicals, and the majestic bouquet (ramo).
 */

const f = (n: number) => +n.toFixed(2);
const rep = (n: number, fn: (i: number) => string) =>
  Array.from({ length: n }, (_, i) => fn(i)).join('');

const rng = (seed: number) => () => {
  seed |= 0;
  seed = (seed + 0x6d2b79f5) | 0;
  let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
  t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
  return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
};

const ondulado = (r: number, amp: number, ondas: number, pasos = 120): string => {
  let d = '';
  for (let k = 0; k <= pasos; k++) {
    const t = (k / pasos) * Math.PI * 2;
    const rr = r + amp * Math.sin(ondas * t);
    d += (k ? 'L' : 'M') + f(rr * Math.cos(t)) + ',' + f(rr * Math.sin(t));
  }
  return d + 'Z';
};

const lin = (id: string, stops: [number, string][]): string =>
  `<linearGradient id="${id}" x1="0" y1="1" x2="0" y2="0">${stops
    .map(([o, c]) => `<stop offset="${o}" stop-color="${c}"/>`)
    .join('')}</linearGradient>`;

const rad = (id: string, stops: [number, string][], extra = ''): string =>
  `<radialGradient id="${id}" ${extra}>${stops
    .map(([o, c]) => `<stop offset="${o}" stop-color="${c}"/>`)
    .join('')}</radialGradient>`;

export const FLORAL_DEGRADADOS =
  lin('gGirasolA', [[0, '#d97f00'], [0.55, '#f4a900'], [1, '#ffc928']]) +
  lin('gGirasolB', [[0, '#f29a00'], [0.5, '#ffc60a'], [1, '#fff07a']]) +
  rad('gDisco', [[0, '#24130a'], [0.65, '#3f2410'], [1, '#7c4c18']]) +
  lin('gNarcisoT', [[0, '#f2c200'], [1, '#ffe873']]) +
  lin('gNarcisoD', [[0, '#ffd91f'], [1, '#fff7a8']]) +
  rad('gTrompeta', [[0, '#e58a00'], [0.55, '#ffb400'], [1, '#ffd84a']]) +
  rad('gGarganta', [[0, '#9d4a00'], [0.6, '#d97a00'], [1, '#f4a20f']]) +
  lin('gTulipanT', [[0, '#d98c00'], [1, '#f7bd00']]) +
  lin('gTulipanD', [[0, '#f0a300'], [0.5, '#ffd21f'], [1, '#ffe873']]) +
  lin('gRosa1', [[0, '#d98a00'], [0.5, '#f2b100'], [1, '#ffcf3d']]) +
  lin('gRosa2', [[0, '#e89c00'], [0.5, '#ffc21a'], [1, '#ffe066']]) +
  lin('gRosa3', [[0, '#f7b500'], [1, '#fff0a0']]) +
  rad('gPompon', [[0, '#fff8b8'], [0.5, '#ffd928'], [1, '#f2ad00']], 'cx=".4" cy=".38" r=".7"') +
  lin('gHoja', [[0, '#245f2e'], [1, '#7bb25a']]) +
  lin('gHojaOsc', [[0, '#1c4f27'], [1, '#5c9a45']]);

const HOJA = 'M0,0 C15,-10 17,-36 0,-56 C-17,-36 -15,-10 0,0Z';
const HOJA_G = 'M0,0 C24,-6 38,-34 0,-70 C-38,-34 -24,-6 0,0Z';

export const hoja = (
  x: number,
  y: number,
  ang: number,
  esc: number,
  grad = 'gHoja',
  forma = HOJA
): string =>
  `<g transform="translate(${x} ${y}) rotate(${ang}) scale(${esc})">
     <path d="${forma}" fill="url(#${grad})" stroke="#1f4d26" stroke-opacity=".5" stroke-width="${f(
       0.8 / esc
     )}"/>
     <path d="M0,-4 C1,-22 1,-38 0,-50" fill="none" stroke="#cfe8a8" stroke-opacity=".5" stroke-width="${f(
       1 / esc
     )}"/>
   </g>`;

export const hojaRosa = (x: number, y: number, ang: number, esc: number): string =>
  `<g transform="translate(${x} ${y}) rotate(${ang}) scale(${esc})">
     <path d="M0,0L0,-22" stroke="#2f6a34" stroke-width="2" stroke-linecap="round"/>
     ${hoja(0, -20, 0, 0.75, 'gHojaOsc')}${hoja(0, -8, -52, 0.55, 'gHojaOsc')}${hoja(
       0,
       -8,
       52,
       0.55,
       'gHojaOsc'
     )}
   </g>`;

export const tallo = (d: string, w: number): string =>
  `<path d="${d}" fill="none" stroke="#2c6631" stroke-width="${w}" stroke-linecap="round"/>
   <path d="${d}" fill="none" stroke="#6bb55c" stroke-opacity=".5" stroke-width="${f(
     w * 0.32
   )}" stroke-linecap="round" transform="translate(${f(-w * 0.2)} 0)"/>`;

export const helecho = (
  x: number,
  y: number,
  ang: number,
  largo: number,
  col = '#5c9a72'
): string => {
  let d = '';
  for (let i = 1; i <= 14; i++) {
    const t = i / 14;
    const px = f(t * largo);
    const w = f((1 - t * 0.62) * 11);
    d += `M${px},0L${f(px + 5)},${-w}M${px},0L${f(px + 5)},${w}`;
  }
  return `<g transform="translate(${x} ${y}) rotate(${ang})" fill="none" stroke="${col}" stroke-linecap="round">
    <path d="M0,0L${largo},0" stroke-width="1.8"/><path d="${d}" stroke-width="1.7"/></g>`;
};

export const girasolHead = (): string => {
  const P = 'M0,-26 C12,-38 11,-62 0,-78 C-11,-62 -12,-38 0,-26Z';
  const petalo = (a: number, s: number, g: string) =>
    `<g transform="rotate(${a}) scale(${s})">
       <path d="${P}" fill="url(#${g})" stroke="#a75f00" stroke-opacity=".4" stroke-width=".8"/>
       <path d="M0,-32 C1,-46 1,-60 0,-70" fill="none" stroke="#a75f00" stroke-opacity=".3" stroke-width=".8"/>
     </g>`;
  const atras = rep(24, (i) => petalo(i * 15, 1, 'gGirasolA'));
  const frente = rep(24, (i) => petalo(i * 15 + 7.5, 0.93, 'gGirasolB'));
  let semillas = '';
  for (let i = 1; i <= 270; i++) {
    const r = 1.68 * Math.sqrt(i);
    const a = i * 2.39996; // 137.5° golden angle
    const col =
      r > 22
        ? ['#b77b22', '#8d5a1a', '#c48a2c'][i % 3]
        : ['#1d0e05', '#33190a', '#4a2a10'][i % 3];
    semillas += `<circle cx="${f(r * Math.cos(a))}" cy="${f(
      r * Math.sin(a)
    )}" r="${f(0.75 + r * 0.03)}" fill="${col}"/>`;
  }
  return `<g id="h-girasol">${atras}${frente}
    <circle r="32" fill="#5a3512" opacity=".5"/>
    <circle r="29" fill="url(#gDisco)"/>${semillas}
    <circle r="29" fill="none" stroke="#d99a2b" stroke-opacity=".55" stroke-width="1.6"/></g>`;
};

export const narcisoHead = (): string => {
  const P = 'M0,-6 C25,-20 28,-54 0,-76 C-28,-54 -25,-20 0,-6Z';
  const petalo = (a: number, s: number, g: string) =>
    `<g transform="rotate(${a}) scale(${s})">
       <path d="${P}" fill="url(#${g})" stroke="#c99a00" stroke-opacity=".5" stroke-width=".9"/>
       <path d="M0,-14 C1,-34 1,-54 0,-68" fill="none" stroke="#c99a00" stroke-opacity=".35" stroke-width=".8"/>
     </g>`;
  const atras = rep(3, (i) => petalo(i * 120, 1.02, 'gNarcisoT'));
  const frente = rep(3, (i) => petalo(i * 120 + 60, 0.98, 'gNarcisoD'));
  const pliegues = rep(12, (i) =>
    `<line x1="0" y1="-9" x2="0" y2="-21" transform="rotate(${
      i * 30 + 15
    })" stroke="#c96a00" stroke-opacity=".45" stroke-width="1" stroke-linecap="round"/>`
  );
  const estambres = rep(6, (i) => {
    const a = (i * Math.PI) / 3 + 0.3;
    return `<circle cx="${f(Math.cos(a) * 5)}" cy="${f(
      Math.sin(a) * 5
    )}" r="1.7" fill="#ffe9a0"/>`;
  });
  return `<g id="h-narciso">${atras}${frente}
    <path d="${ondulado(
      26,
      2.8,
      12
    )}" fill="url(#gTrompeta)" stroke="#d47a00" stroke-width="1.2" stroke-linejoin="round"/>
    <circle r="17" fill="url(#gGarganta)"/>
    <path d="${ondulado(
      21,
      1.6,
      12
    )}" fill="none" stroke="#fff0a6" stroke-opacity=".55" stroke-width="1.1"/>
    ${pliegues}${estambres}</g>`;
};

export const tulipanHead = (): string => {
  const atras = 'M-2,34 C-34,30 -44,-10 -32,-50 C-18,-32 -6,-12 -2,6Z';
  const borde = 'stroke="#b87400" stroke-opacity=".55" stroke-width="1"';
  return `<g id="h-tulipan">
    <path d="${atras}" fill="url(#gTulipanT)" ${borde}/>
    <path d="${atras}" transform="scale(-1 1)" fill="url(#gTulipanT)" ${borde}/>
    <path d="M0,42 C-26,40 -32,8 -22,-24 C-15,-42 -6,-52 0,-62 C6,-52 15,-42 22,-24 C32,8 26,40 0,42Z" fill="url(#gTulipanD)" ${borde}/>
    <path d="M-11,30 C-20,10 -18,-14 -8,-40" fill="none" stroke="#fff6b0" stroke-opacity=".7" stroke-width="5" stroke-linecap="round"/>
    <path d="M-2,38 C-6,10 -4,-20 0,-54 M8,36 C12,10 12,-16 8,-40" fill="none" stroke="#c78200" stroke-opacity=".3" stroke-width="1"/>
  </g>`;
};

export const rosaHead = (): string => {
  const P = 'M0,0 C-22,-4 -27,-30 -13,-39 C-6,-43 6,-43 13,-39 C27,-30 22,-4 0,0Z';
  const H = 'M-10,-38 C-4,-41.5 4,-41.5 10,-38'; // brillo en el borde del pétalo
  const anillo = (n: number, desfase: number, esc: number, g: string) =>
    `<circle r="${f(43 * esc * 0.95)}" fill="#8a4a00" opacity=".3"/>` +
    rep(
      n,
      (i) => `<g transform="rotate(${f((i * 360) / n + desfase)}) scale(${esc})">
       <path d="${P}" fill="url(#${g})" stroke="#a86400" stroke-opacity=".5" stroke-width="${f(
        0.9 / esc
      )}"/>
       <path d="${H}" fill="none" stroke="#fff3b0" stroke-opacity=".6" stroke-width="${f(
        1.6 / esc
      )}" stroke-linecap="round"/>
     </g>`
    );
  let esp = '';
  for (let k = 0; k <= 64; k++) {
    const t = (k / 64) * Math.PI * 5;
    const r = 0.55 * t;
    esp += (k ? 'L' : 'M') + f(r * Math.cos(t)) + ',' + f(r * Math.sin(t));
  }
  return `<g id="h-rosa">
    ${anillo(8, 0, 1.28, 'gRosa1')}${anillo(7, 20, 1.02, 'gRosa2')}${anillo(
    6,
    10,
    0.78,
    'gRosa2'
  )}
    ${anillo(5, 30, 0.55, 'gRosa3')}${anillo(4, 0, 0.34, 'gRosa3')}
    <path d="${esp}" fill="none" stroke="#a86400" stroke-opacity=".7" stroke-width="1.1" stroke-linecap="round"/></g>`;
};

export const mimosaHead = (): string => {
  const R = rng(11);
  const pompon = (cx: number, cy: number, r: number) => {
    let s = `<circle cx="${cx}" cy="${cy}" r="${r}" fill="url(#gPompon)"/>`;
    for (let i = 0; i < 46; i++) {
      const a = R() * 6.283;
      const d = Math.sqrt(R()) * r * 1.08;
      const c = ['#ffe45a', '#ffd21f', '#fff3a1', '#f5b800'][i % 4];
      s += `<circle cx="${f(cx + Math.cos(a) * d)}" cy="${f(
        cy + Math.sin(a) * d
      )}" r="${f(0.9 + R() * 1.3)}" fill="${c}"/>`;
    }
    return s;
  };
  const P: [number, number, number][] = [
    [-45, -8, 12],
    [-25, -32, 14],
    [4, -44, 15],
    [32, -28, 13],
    [47, -2, 11.5],
    [-20, -6, 10.5],
    [14, -14, 12],
    [-2, 12, 9.5],
  ];
  const ramitas = P.map(
    ([x, y]) =>
      `<path d="M0,44 Q${f(x * 0.3)},${f(
        (44 + y) / 2
      )} ${x},${y}" fill="none" stroke="#4d8a3d" stroke-width="2" stroke-linecap="round"/>`
  ).join('');
  return `<g id="h-mimosa">${helecho(0, 44, 160, 58)}${helecho(
    0,
    44,
    20,
    58
  )}${ramitas}
    ${P.map(([x, y, r]) => pompon(x, y, r)).join('')}</g>`;
};

/** All floral definitions (gradients + all 5 flower heads) */
export const getAllFloralDefs = (): string =>
  FLORAL_DEGRADADOS +
  girasolHead() +
  narcisoHead() +
  tulipanHead() +
  rosaHead() +
  mimosaHead();

export const uso = (id: string, x: number, y: number, esc = 1, ang = 0): string =>
  `<use href="#h-${id}" transform="translate(${x} ${y}) rotate(${ang}) scale(${esc})"/>`;

/** The 5 individual botanical flowers (viewBox 0 0 260 380) */
export const getIndividualFlowerSvg = (
  type: 'girasol' | 'narciso' | 'tulipan' | 'rosa' | 'mimosa'
): string => {
  switch (type) {
    case 'girasol':
      return `<g class="mece">
        ${tallo('M130,150 C127,220 133,300 130,374', 10)}
        ${hoja(130, 300, 58, 1.15, 'gHoja', HOJA_G)}${hoja(
        130,
        262,
        -60,
        1,
        'gHojaOsc',
        HOJA_G
      )}
        ${uso('girasol', 130, 118)}</g>`;

    case 'narciso':
      return `<g class="mece" style="animation-delay:-2s">
        <path d="M124,374 C108,310 84,262 60,214 C58,208 63,207 66,211 C96,250 126,312 136,374Z" fill="url(#gHoja)" stroke="#1f4d26" stroke-opacity=".4"/>
        <path d="M124,374 C108,310 84,262 60,214 C58,208 63,207 66,211 C96,250 126,312 136,374Z" transform="translate(260 60) scale(-1 .84)" fill="url(#gHojaOsc)" stroke="#1f4d26" stroke-opacity=".4"/>
        ${tallo('M130,180 C128,250 133,310 130,374', 6)}
        ${uso('narciso', 130, 108)}</g>`;

    case 'tulipan':
      return `<g class="mece" style="animation-delay:-4s">
        <path d="M130,374 C92,346 60,276 76,196 C108,236 130,306 130,374Z" fill="url(#gHoja)" stroke="#1f4d26" stroke-opacity=".4"/>
        <path d="M130,374 C92,346 60,276 76,196 C108,236 130,306 130,374Z" transform="translate(260 30) scale(-1 .92)" fill="url(#gHojaOsc)" stroke="#1f4d26" stroke-opacity=".4"/>
        ${tallo('M130,170 C129,240 131,310 130,374', 7)}
        ${uso('tulipan', 130, 118, 1.4)}</g>`;

    case 'rosa':
      return `<g class="mece" style="animation-delay:-1.4s">
        ${tallo('M130,185 C133,250 127,320 130,374', 7)}
        <g fill="#2a5a2e"><path d="M133,228 l10,-4 l-4,10z"/><path d="M127,286 l-10,-4 l4,10z"/><path d="M133,332 l10,-4 l-4,10z"/></g>
        ${hojaRosa(129, 300, -55, 1.5)}${hojaRosa(131, 255, 52, 1.3)}
        ${uso('rosa', 130, 120, 1.3)}</g>`;

    case 'mimosa':
      return `<g class="mece" style="animation-delay:-3s">
        ${tallo('M130,187 C124,240 140,300 128,374', 5)}
        ${helecho(127, 250, 158, 70)}${helecho(134, 300, 22, 64)}${helecho(
        128,
        342,
        155,
        50
      )}
        ${uso('mimosa', 130, 132, 1.25)}</g>`;
  }
};

/** The complete Bouquet (Ramo) with foliage, stems, flowers, kraft cone, and ribbon (viewBox 0 0 600 730) */
export const getBouquetSvg = (): string => {
  const HOJA_LARGA = 'M0,0 C20,-40 26,-140 0,-250 C-26,-140 -20,-40 0,0Z';
  const angulos = [-72, -52, -34, -18, -4, 10, 26, 42, 60, 74];
  const tamanos = [0.8, 0.95, 1.1, 1.02, 1.15, 1.1, 1, 1.12, 0.95, 0.82];
  const verdor = angulos
    .map(
      (a, i) =>
        `<g transform="translate(300 480) rotate(${a}) scale(${tamanos[i]})">
       <path d="${HOJA_LARGA}" fill="url(#${
          i % 2 ? 'gHojaOsc' : 'gHoja'
        })" stroke="#1d4a25" stroke-opacity=".5"/>
       <path d="M0,-10 C1,-90 1,-170 0,-230" fill="none" stroke="#cfe8a8" stroke-opacity=".35"/>
     </g>`
    )
    .join('');

  // [tipo, x, y, escala, rotación] — fondo -> frente
  const flores: [string, number, number, number, number][] = [
    ['mimosa', 300, 62, 0.8, 0],
    ['mimosa', 70, 205, 0.95, -28],
    ['mimosa', 532, 214, 0.95, 30],
    ['tulipan', 440, 165, 1.05, 12],
    ['narciso', 170, 150, 0.8, -14],
    ['girasol', 300, 200, 1.25, 0],
    ['girasol', 148, 302, 0.95, -18],
    ['rosa', 455, 322, 1.1, 10],
    ['rosa', 305, 348, 0.82, -10],
  ];

  const tallosRamo = flores
    .map(
      ([, x, y]) =>
        `<path d="M${x},${y} C${x},${
          y + 110
        } 300,360 300,470" fill="none" stroke="#2f6b33" stroke-width="7" stroke-linecap="round"/>`
    )
    .join('');

  const cabezas = flores
    .map(
      ([t, x, y, e, r], i) =>
        `<g class="gira" style="animation-delay:${f(-i * 0.7)}s">${uso(
          t,
          x,
          y,
          e,
          r
        )}</g>`
    )
    .join('');

  // Papel kraft en cono + cinta con lazo
  const papel = `
    <path d="M80,380 Q300,446 520,380 L508,390 Q300,470 92,390Z" fill="#a67a47"/>
    <path d="M92,388 Q300,470 508,388 L308,706 Q300,714 292,706Z" fill="#cfa46d"/>
    <path d="M92,388 Q200,440 300,478 L296,708 Z" fill="#e6c992" opacity=".9"/>
    <g fill="none" stroke="#8d6a3b" stroke-opacity=".28" stroke-width="1.2" stroke-linecap="round">
      <path d="M170,420 L294,690"/><path d="M230,440 L298,650"/><path d="M400,432 L306,680"/><path d="M340,450 L302,620"/>
    </g>
    <path d="M92,388 Q300,470 508,388" fill="none" stroke="#8d6a3b" stroke-opacity=".5" stroke-width="1.4"/>`;

  const mitadLazo = `
    <path d="M300,540 C250,500 190,510 205,548 C215,572 270,556 300,545Z" fill="#fff8e6" stroke="#d9c08a"/>
    <path d="M296,554 C282,590 272,612 266,636 L282,632 L286,648 C296,622 302,592 304,558Z" fill="#fff2cf" stroke="#d9c08a"/>`;

  const cinta = `
    <path d="M161,498 Q300,538 439,498 L421,526 Q300,566 179,526Z" fill="#fff2cf" stroke="#d9c08a"/>
    ${mitadLazo}
    <g transform="translate(600 0) scale(-1 1)">${mitadLazo}</g>
    <ellipse cx="300" cy="546" rx="14" ry="12" fill="#ffefbd" stroke="#d9c08a"/>`;

  return verdor + tallosRamo + cabezas + papel + cinta;
};
