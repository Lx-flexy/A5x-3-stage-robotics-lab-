import * as THREE from 'three';

const textureCache = new Map();

/**
 * Creates high-resolution canvas texture for the A5X INDUSTRIES Back Wall Logo
 */
export function getAlphaLogoTexture() {
  if (textureCache.has('alpha-logo')) return textureCache.get('alpha-logo');

  const canvas = document.createElement('canvas');
  canvas.width = 1024;
  canvas.height = 256;
  const ctx = canvas.getContext('2d');

  ctx.clearRect(0, 0, 1024, 256);

  // Large White A5X Mark
  ctx.fillStyle = '#FFFFFF';
  ctx.font = '900 110px Inter, -apple-system, sans-serif';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText('A5X', 512, 90);

  // Subtitle "INDUSTRIES"
  ctx.fillStyle = '#FFFFFF';
  ctx.font = '700 36px Inter, -apple-system, sans-serif';
  ctx.letterSpacing = '0.35em';
  ctx.fillText('INDUSTRIES', 512, 185);

  const texture = new THREE.CanvasTexture(canvas);
  texture.minFilter = THREE.LinearMipmapLinearFilter;
  texture.magFilter = THREE.LinearFilter;
  texture.generateMipmaps = true;
  textureCache.set('alpha-logo', texture);
  return texture;
}

/**
 * Creates crisp wall plate texture with auto-fitting text (Revision 6)
 * - Measures text width and dynamically shrinks font until it fits with 8% padding
 * - 2x resolution (1024 x 512) for razor-sharp legibility
 * - Never clips, never overflows
 */
export function getAlphaWallSignTexture(title, subtitle = '') {
  const key = `alpha-sign-${title}-${subtitle}`;
  if (textureCache.has(key)) return textureCache.get(key);

  const canvas = document.createElement('canvas');
  canvas.width = 1024;
  canvas.height = 512;
  const ctx = canvas.getContext('2d');

  // Deep navy background #071B3A
  ctx.fillStyle = '#071B3A';
  ctx.fillRect(0, 0, 1024, 512);

  // Crisp white inner border (with 8% safe margin)
  ctx.strokeStyle = '#FFFFFF';
  ctx.lineWidth = 6;
  ctx.strokeRect(24, 24, 976, 464);

  // Subtle electric blue accent line under border
  ctx.strokeStyle = '#1677FF';
  ctx.lineWidth = 4;
  ctx.strokeRect(34, 34, 956, 444);

  // Auto-fit Title Text
  const maxTitleWidth = 860; // 1024 - 164 (8% padding on each side)
  let titleFontSize = subtitle ? 68 : 84;
  ctx.font = `800 ${titleFontSize}px Inter, -apple-system, sans-serif`;

  while (ctx.measureText(title).width > maxTitleWidth && titleFontSize > 28) {
    titleFontSize -= 2;
    ctx.font = `800 ${titleFontSize}px Inter, -apple-system, sans-serif`;
  }

  ctx.fillStyle = '#FFFFFF';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  const titleY = subtitle ? 210 : 256;
  ctx.fillText(title, 512, titleY);

  // Auto-fit Subtitle Text
  if (subtitle) {
    let subFontSize = 34;
    ctx.font = `600 ${subFontSize}px Inter, -apple-system, sans-serif`;
    while (ctx.measureText(subtitle).width > maxTitleWidth && subFontSize > 18) {
      subFontSize -= 2;
      ctx.font = `600 ${subFontSize}px Inter, -apple-system, sans-serif`;
    }
    ctx.fillStyle = '#60A5FA';
    ctx.fillText(subtitle, 512, 330);
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.generateMipmaps = true;
  texture.minFilter = THREE.LinearMipmapLinearFilter;
  texture.magFilter = THREE.LinearFilter;
  texture.anisotropy = 8;
  textureCache.set(key, texture);
  return texture;
}

/**
 * Charcoal Pegboard Texture with 25mm Round Hole Grid + Subtle Shadow-Board Tool Silhouettes
 */
export function getPegboardTexture() {
  if (textureCache.has('pegboard-texture')) return textureCache.get('pegboard-texture');

  const canvas = document.createElement('canvas');
  canvas.width = 1024;
  canvas.height = 512;
  const ctx = canvas.getContext('2d');

  // Base charcoal panel #2B323D (rich mid-dark charcoal, not black)
  ctx.fillStyle = '#2B323D';
  ctx.fillRect(0, 0, 1024, 512);

  // Faint shadow-board silhouettes in lighter grey (#384352) behind tool locations
  ctx.fillStyle = '#36404F';
  // Row 1: Pliers shadow silhouettes (10 spots)
  for (let i = 0; i < 10; i++) {
    const cx = 70 + i * 96;
    ctx.beginPath();
    ctx.roundRect(cx - 18, 50, 36, 120, 8);
    ctx.fill();
  }
  // Row 2: Screwdriver shadow silhouettes (10 spots)
  for (let i = 0; i < 10; i++) {
    const cx = 70 + i * 96;
    ctx.beginPath();
    ctx.roundRect(cx - 12, 210, 24, 130, 6);
    ctx.fill();
  }
  // Row 3: Specialty tools shadow silhouettes
  for (let i = 0; i < 8; i++) {
    const cx = 80 + i * 115;
    ctx.beginPath();
    ctx.roundRect(cx - 24, 370, 48, 100, 8);
    ctx.fill();
  }

  // 25mm Regular Round Hole Grid
  ctx.fillStyle = '#171C24';
  const stepX = 24;
  const stepY = 24;
  for (let x = 12; x < 1024; x += stepX) {
    for (let y = 12; y < 512; y += stepY) {
      ctx.beginPath();
      ctx.arc(x, y, 3.2, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  // Soft perimeter bevel border
  ctx.strokeStyle = '#1E242C';
  ctx.lineWidth = 4;
  ctx.strokeRect(2, 2, 1020, 508);

  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  texture.repeat.set(1, 1);
  texture.generateMipmaps = true;
  texture.minFilter = THREE.LinearMipmapLinearFilter;
  texture.magFilter = THREE.LinearFilter;
  texture.anisotropy = 8;
  textureCache.set('pegboard-texture', texture);
  return texture;
}

/**
 * Soldering Station Digital LCD Display Texture ("350°C")
 */
export function getSolderingLcdTexture() {
  if (textureCache.has('soldering-lcd')) return textureCache.get('soldering-lcd');

  const canvas = document.createElement('canvas');
  canvas.width = 256;
  canvas.height = 128;
  const ctx = canvas.getContext('2d');

  // Deep dark cyan LCD background
  ctx.fillStyle = '#06131F';
  ctx.fillRect(0, 0, 256, 128);

  // Inner border
  ctx.strokeStyle = '#0C2740';
  ctx.lineWidth = 4;
  ctx.strokeRect(4, 4, 248, 120);

  // Glowing Cyan/Blue Temp Display
  ctx.fillStyle = '#00E5FF';
  ctx.font = '700 52px "Courier New", monospace';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText('350°C', 128, 55);

  // Subtext: Target & Status
  ctx.fillStyle = '#00B0FF';
  ctx.font = '600 18px "Courier New", monospace';
  ctx.fillText('SET: 350°C  [HEATING]', 128, 102);

  const texture = new THREE.CanvasTexture(canvas);
  texture.generateMipmaps = true;
  texture.minFilter = THREE.LinearMipmapLinearFilter;
  textureCache.set('soldering-lcd', texture);
  return texture;
}

/**
 * Storage Bin White Label Sticker Texture
 */
export function getBinLabelTexture(labelName) {
  const key = `bin-label-${labelName}`;
  if (textureCache.has(key)) return textureCache.get(key);

  const canvas = document.createElement('canvas');
  canvas.width = 256;
  canvas.height = 96;
  const ctx = canvas.getContext('2d');

  // Crisp white sticker surface
  ctx.fillStyle = '#FFFFFF';
  ctx.fillRect(0, 0, 256, 96);

  // Dark slate border
  ctx.strokeStyle = '#0F172A';
  ctx.lineWidth = 4;
  ctx.strokeRect(4, 4, 248, 88);

  // Label Title
  ctx.fillStyle = '#0F172A';
  ctx.font = '800 30px Inter, -apple-system, sans-serif';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText(labelName.toUpperCase(), 128, 42);

  // Small barcode lines at bottom
  ctx.fillStyle = '#334155';
  for (let x = 30; x < 226; x += 6) {
    if ((x % 18) !== 0) {
      ctx.fillRect(x, 68, 3, 16);
    }
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.generateMipmaps = true;
  texture.minFilter = THREE.LinearMipmapLinearFilter;
  textureCache.set(key, texture);
  return texture;
}

/**
 * Component Drawer Cabinet Front Texture with Metal Label Holders
 */
export function getDrawerCabinetTexture() {
  if (textureCache.has('drawer-cabinet')) return textureCache.get('drawer-cabinet');

  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 512;
  const ctx = canvas.getContext('2d');

  // Charcoal metal frame
  ctx.fillStyle = '#1E293B';
  ctx.fillRect(0, 0, 512, 512);

  // 2 Columns x 4 Rows = 8 Drawers
  const labels = [
    'RESISTORS', 'CAPACITORS',
    'DIODES', 'TRANSISTORS',
    'ICs & MCU', 'LEDs & OPTO',
    'RELAYS', 'FUSES & SW'
  ];

  const cols = 2;
  const rows = 4;
  const dw = 230;
  const dh = 110;

  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      const idx = r * cols + c;
      const x = 18 + c * 246;
      const y = 18 + r * 120;

      // Drawer front body (translucent smoke acrylic)
      ctx.fillStyle = '#334155';
      ctx.fillRect(x, y, dw, dh);
      ctx.strokeStyle = '#475569';
      ctx.lineWidth = 3;
      ctx.strokeRect(x, y, dw, dh);

      // Silver metal label cardholder
      ctx.fillStyle = '#CBD5E1';
      ctx.fillRect(x + 25, y + 25, 180, 42);
      ctx.strokeStyle = '#94A3B8';
      ctx.lineWidth = 2;
      ctx.strokeRect(x + 25, y + 25, 180, 42);

      // Printed label text
      ctx.fillStyle = '#0F172A';
      ctx.font = '700 16px Inter, sans-serif';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(labels[idx], x + 115, y + 46);

      // Drawer pull lip
      ctx.fillStyle = '#64748B';
      ctx.fillRect(x + 65, y + 80, 100, 14);
    }
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.generateMipmaps = true;
  texture.minFilter = THREE.LinearMipmapLinearFilter;
  textureCache.set('drawer-cabinet', texture);
  return texture;
}

/**
 * Light-Oak Wood Grain Texture
 */
export function getWoodGrainTexture() {
  if (textureCache.has('wood-grain')) return textureCache.get('wood-grain');

  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 512;
  const ctx = canvas.getContext('2d');

  // Warm light-oak base
  ctx.fillStyle = '#D4B996';
  ctx.fillRect(0, 0, 512, 512);

  // Subtle natural grain stripes
  ctx.fillStyle = '#C2A37D';
  for (let y = 0; y < 512; y += 4) {
    const alpha = 0.08 + Math.sin(y * 0.05) * 0.05;
    ctx.fillStyle = `rgba(180, 140, 95, ${alpha})`;
    ctx.fillRect(0, y, 512, 2);
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  texture.repeat.set(4, 2);
  texture.generateMipmaps = true;
  texture.minFilter = THREE.LinearMipmapLinearFilter;
  textureCache.set('wood-grain', texture);
  return texture;
}

/**
 * Monitor Wallpaper: Blue abstract radiant wallpaper
 */
export function getBlueAbstractWallpaper() {
  if (textureCache.has('blue-wallpaper')) return textureCache.get('blue-wallpaper');

  const canvas = document.createElement('canvas');
  canvas.width = 1024;
  canvas.height = 512;
  const ctx = canvas.getContext('2d');

  ctx.fillStyle = '#030B18';
  ctx.fillRect(0, 0, 1024, 512);

  const grad = ctx.createLinearGradient(0, 512, 1024, 0);
  grad.addColorStop(0, '#001D4A');
  grad.addColorStop(0.3, '#0A3B8C');
  grad.addColorStop(0.5, '#0099FF');
  grad.addColorStop(0.55, '#66D9FF');
  grad.addColorStop(0.6, '#0099FF');
  grad.addColorStop(0.8, '#0A3B8C');
  grad.addColorStop(1, '#020B19');

  ctx.save();
  ctx.beginPath();
  ctx.moveTo(0, 480);
  ctx.bezierCurveTo(300, 480, 400, 100, 1024, 50);
  ctx.lineTo(1024, 150);
  ctx.bezierCurveTo(450, 200, 350, 512, 0, 512);
  ctx.closePath();
  ctx.fillStyle = grad;
  ctx.fill();
  ctx.restore();

  const texture = new THREE.CanvasTexture(canvas);
  texture.minFilter = THREE.LinearFilter;
  textureCache.set('blue-wallpaper', texture);
  return texture;
}

/**
 * Charcoal perforated ceiling grid texture
 */
export function getCeilingGridTexture() {
  if (textureCache.has('ceiling-grid')) return textureCache.get('ceiling-grid');

  const canvas = document.createElement('canvas');
  canvas.width = 256;
  canvas.height = 256;
  const ctx = canvas.getContext('2d');

  ctx.fillStyle = '#141A24';
  ctx.fillRect(0, 0, 256, 256);

  ctx.strokeStyle = '#252F3E';
  ctx.lineWidth = 4;
  ctx.strokeRect(0, 0, 256, 256);

  ctx.fillStyle = '#0C1017';
  for (let x = 16; x < 256; x += 24) {
    for (let y = 16; y < 256; y += 24) {
      ctx.beginPath();
      ctx.arc(x, y, 3, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  texture.repeat.set(8, 6);
  texture.generateMipmaps = true;
  texture.minFilter = THREE.LinearMipmapLinearFilter;
  textureCache.set('ceiling-grid', texture);
  return texture;
}

/**
 * Polished tile floor grid texture
 */
export function getTileFloorTexture() {
  if (textureCache.has('tile-floor')) return textureCache.get('tile-floor');

  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 512;
  const ctx = canvas.getContext('2d');

  ctx.fillStyle = '#D6DCE5';
  ctx.fillRect(0, 0, 512, 512);

  ctx.strokeStyle = '#BEC7D4';
  ctx.lineWidth = 3;
  ctx.strokeRect(0, 0, 512, 512);

  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  texture.repeat.set(12, 9);
  textureCache.set('tile-floor', texture);
  return texture;
}
