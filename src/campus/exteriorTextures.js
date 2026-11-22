import * as THREE from 'three';

const textureCache = new Map();

/**
 * Procedural Plaza Stone Tile Texture (1024x1024)
 * Large-format light-grey architectural stone tiles with subtle joints and noise.
 */
export function getPlazaTilesTexture() {
  const key = 'plaza-tiles-1024';
  if (textureCache.has(key)) return textureCache.get(key);

  const canvas = document.createElement('canvas');
  canvas.width = 1024;
  canvas.height = 1024;
  const ctx = canvas.getContext('2d');

  // Baseline light-grey stone fill
  ctx.fillStyle = '#CBD5E1';
  ctx.fillRect(0, 0, 1024, 1024);

  // Subtle per-tile tone variation (4x4 tile grid)
  const tileSize = 256;
  const tileColors = ['#D3DCE6', '#CBD5E1', '#D0D8E3', '#C6D1DD', '#CCD6E2'];
  for (let r = 0; r < 4; r++) {
    for (let c = 0; c < 4; c++) {
      const idx = (r * 7 + c * 3) % tileColors.length;
      ctx.fillStyle = tileColors[idx];
      ctx.fillRect(c * tileSize + 2, r * tileSize + 2, tileSize - 4, tileSize - 4);
    }
  }

  // Stone grain noise
  const imgData = ctx.getImageData(0, 0, 1024, 1024);
  const data = imgData.data;
  for (let i = 0; i < data.length; i += 4) {
    const grain = (Math.random() - 0.5) * 14;
    data[i] = Math.min(255, Math.max(0, data[i] + grain));
    data[i + 1] = Math.min(255, Math.max(0, data[i + 1] + grain));
    data[i + 2] = Math.min(255, Math.max(0, data[i + 2] + grain));
  }
  ctx.putImageData(imgData, 0, 0);

  // Clean dark grout lines
  ctx.strokeStyle = '#94A3B8';
  ctx.lineWidth = 3;
  for (let i = 0; i <= 1024; i += tileSize) {
    ctx.beginPath();
    ctx.moveTo(i, 0);
    ctx.lineTo(i, 1024);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(0, i);
    ctx.lineTo(1024, i);
    ctx.stroke();
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  texture.repeat.set(16, 6);
  texture.anisotropy = 8;
  texture.colorSpace = THREE.SRGBColorSpace;
  textureCache.set(key, texture);
  return texture;
}

/**
 * Procedural Walkway Stone Texture (512x512)
 * Refined architectural granite with subtle micro-grooves.
 */
export function getWalkwayStoneTexture() {
  const key = 'walkway-stone-512';
  if (textureCache.has(key)) return textureCache.get(key);

  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 512;
  const ctx = canvas.getContext('2d');

  ctx.fillStyle = '#E2E8F0';
  ctx.fillRect(0, 0, 512, 512);

  for (let y = 0; y < 512; y += 4) {
    ctx.fillStyle = Math.random() > 0.5 ? '#DCE4EE' : '#E8EEF5';
    ctx.fillRect(0, y, 512, 2);
  }

  ctx.strokeStyle = '#B0C0D4';
  ctx.lineWidth = 2;
  for (let y = 0; y <= 512; y += 128) {
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(512, y);
    ctx.stroke();
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  texture.repeat.set(1, 4);
  texture.anisotropy = 8;
  texture.colorSpace = THREE.SRGBColorSpace;
  textureCache.set(key, texture);
  return texture;
}

/**
 * A5X Inlay Medal Texture (512x512) for Walkway near Door
 */
export function getA5XInlayTexture() {
  const key = 'a5x-inlay-512';
  if (textureCache.has(key)) return textureCache.get(key);

  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 512;
  const ctx = canvas.getContext('2d');

  ctx.fillStyle = '#0F172A';
  ctx.fillRect(0, 0, 512, 512);

  ctx.strokeStyle = '#38BDF8';
  ctx.lineWidth = 14;
  ctx.beginPath();
  ctx.arc(256, 256, 220, 0, Math.PI * 2);
  ctx.stroke();

  ctx.strokeStyle = '#1E293B';
  ctx.lineWidth = 6;
  ctx.beginPath();
  ctx.arc(256, 256, 200, 0, Math.PI * 2);
  ctx.stroke();

  ctx.fillStyle = '#FFFFFF';
  ctx.font = '900 130px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText('A5X', 256, 230);

  ctx.fillStyle = '#38BDF8';
  ctx.font = '700 30px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
  ctx.letterSpacing = '6px';
  ctx.fillText('INNOVATION COMPLEX', 256, 320);

  const texture = new THREE.CanvasTexture(canvas);
  texture.anisotropy = 8;
  texture.colorSpace = THREE.SRGBColorSpace;
  textureCache.set(key, texture);
  return texture;
}

/**
 * Big Rooftop Brand Board Texture (2048x512)
 * Full horizontal identity:
 * - Left: A5X Chevron Logo + "A5X INDUSTRIES" (large white bold raised letters)
 * - Center: Vertical divider
 * - Right: "ROBOTICS LAB" (electric-blue bold large) + "IMPOSSIBLE ENGINEERING." (white small caps)
 */
export function getRooftopBrandBoardTexture() {
  const key = 'rooftop-brand-board-2048x512';
  if (textureCache.has(key)) return textureCache.get(key);

  const canvas = document.createElement('canvas');
  canvas.width = 2048;
  canvas.height = 512;
  const ctx = canvas.getContext('2d');

  // Deep Navy background matching #071B3A
  ctx.fillStyle = '#071B3A';
  ctx.fillRect(0, 0, 2048, 512);

  // Brushed steel subtle metallic gradient
  const grad = ctx.createLinearGradient(0, 0, 0, 512);
  grad.addColorStop(0, 'rgba(255, 255, 255, 0.10)');
  grad.addColorStop(0.5, 'rgba(0, 0, 0, 0.0)');
  grad.addColorStop(1, 'rgba(0, 0, 0, 0.35)');
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, 2048, 512);

  // Perimeter electric-blue (#1677FF) LED outline
  ctx.strokeStyle = '#1677FF';
  ctx.lineWidth = 14;
  ctx.strokeRect(7, 7, 2034, 498);

  // Inner subtle cyan line
  ctx.strokeStyle = '#38BDF8';
  ctx.lineWidth = 4;
  ctx.strokeRect(22, 22, 2004, 468);

  // Left Section: A5X Chevron Logo Mark
  ctx.fillStyle = '#1677FF';
  ctx.beginPath();
  ctx.moveTo(90, 150);
  ctx.lineTo(170, 256);
  ctx.lineTo(90, 362);
  ctx.lineTo(135, 362);
  ctx.lineTo(215, 256);
  ctx.lineTo(135, 150);
  ctx.closePath();
  ctx.fill();

  ctx.fillStyle = '#38BDF8';
  ctx.beginPath();
  ctx.moveTo(170, 150);
  ctx.lineTo(250, 256);
  ctx.lineTo(170, 362);
  ctx.lineTo(215, 362);
  ctx.lineTo(295, 256);
  ctx.lineTo(215, 150);
  ctx.closePath();
  ctx.fill();

  // "A5X INDUSTRIES" (Raised 3D White Bold Letters)
  ctx.textAlign = 'left';
  ctx.textBaseline = 'middle';
  ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
  ctx.font = '900 114px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
  ctx.fillText('A5X INDUSTRIES', 335, 260);

  ctx.fillStyle = '#FFFFFF';
  ctx.fillText('A5X INDUSTRIES', 330, 256);

  // Center: Thin white vertical divider
  ctx.fillStyle = '#475569';
  ctx.fillRect(1160, 90, 6, 332);
  ctx.fillStyle = '#FFFFFF';
  ctx.fillRect(1161, 100, 4, 312);

  // Right Section: "ROBOTICS LAB" in electric blue bold large
  ctx.fillStyle = '#38BDF8';
  ctx.font = '900 108px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
  ctx.fillText('ROBOTICS LAB', 1230, 210);

  // Below it: "IMPOSSIBLE ENGINEERING." in white small caps
  ctx.fillStyle = '#FFFFFF';
  ctx.font = '800 48px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
  ctx.letterSpacing = '6px';
  ctx.fillText('IMPOSSIBLE ENGINEERING.', 1234, 316);

  const texture = new THREE.CanvasTexture(canvas);
  texture.anisotropy = 8;
  texture.generateMipmaps = true;
  texture.colorSpace = THREE.SRGBColorSpace;
  textureCache.set(key, texture);
  return texture;
}

/**
 * Lab Fascia Plate Textures (1024x256)
 * Title + subtitle + level chip ("LEARN" for Alpha, "BUILD" for Beta, "INNOVATE" for Gamma)
 */
export function getLabFasciaPlateTexture(labId) {
  const key = `lab-fascia-plate-${labId}`;
  if (textureCache.has(key)) return textureCache.get(key);

  const canvas = document.createElement('canvas');
  canvas.width = 1024;
  canvas.height = 256;
  const ctx = canvas.getContext('2d');

  // Background navy plate
  ctx.fillStyle = '#071B3A';
  ctx.fillRect(0, 0, 1024, 256);

  // Border & bottom cyan line
  ctx.strokeStyle = '#1E3A8A';
  ctx.lineWidth = 4;
  ctx.strokeRect(2, 2, 1020, 252);

  ctx.fillStyle = '#1677FF';
  ctx.fillRect(0, 246, 1024, 10);

  let title = 'LAB ALPHA';
  let subtitle = 'Foundation Lab';
  let chip = 'LEARN';
  let badgeLetter = 'A';

  if (labId === 'beta') {
    title = 'LAB BETA';
    subtitle = 'Development Lab';
    chip = 'BUILD';
    badgeLetter = 'B';
  } else if (labId === 'gamma') {
    title = 'LAB GAMMA';
    subtitle = 'Advanced Innovation Lab';
    chip = 'INNOVATE';
    badgeLetter = 'G';
  }

  // Left Letter Badge
  ctx.fillStyle = '#0F2754';
  ctx.fillRect(36, 36, 184, 184);
  ctx.strokeStyle = '#1677FF';
  ctx.lineWidth = 6;
  ctx.strokeRect(36, 36, 184, 184);

  ctx.fillStyle = '#FFFFFF';
  ctx.font = '900 110px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText(badgeLetter, 128, 130);

  // Title
  ctx.textAlign = 'left';
  ctx.fillStyle = '#FFFFFF';
  ctx.font = '900 68px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
  ctx.fillText(title, 260, 95);

  // Subtitle
  ctx.fillStyle = '#94A3B8';
  ctx.font = '600 44px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
  ctx.fillText(subtitle, 260, 168);

  // Level Chip Pill
  ctx.font = '800 32px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
  const chipWidth = ctx.measureText(chip).width + 36;
  const chipX = 1024 - chipWidth - 40;
  const chipY = 75;

  ctx.fillStyle = '#1677FF';
  ctx.beginPath();
  ctx.roundRect(chipX, chipY, chipWidth, 48, 24);
  ctx.fill();

  ctx.fillStyle = '#FFFFFF';
  ctx.textAlign = 'center';
  ctx.fillText(chip, chipX + chipWidth / 2, chipY + 32);

  const texture = new THREE.CanvasTexture(canvas);
  texture.anisotropy = 8;
  texture.colorSpace = THREE.SRGBColorSpace;
  textureCache.set(key, texture);
  return texture;
}

/**
 * Column Letter Badges (256x256)
 * "A", "B", "G" in navy square with electric-blue border
 */
export function getLetterBadgeTexture(letter) {
  const key = `letter-badge-${letter}`;
  if (textureCache.has(key)) return textureCache.get(key);

  const canvas = document.createElement('canvas');
  canvas.width = 256;
  canvas.height = 256;
  const ctx = canvas.getContext('2d');

  ctx.fillStyle = '#071B3A';
  ctx.fillRect(0, 0, 256, 256);

  ctx.strokeStyle = '#1677FF';
  ctx.lineWidth = 10;
  ctx.strokeRect(6, 6, 244, 244);

  ctx.strokeStyle = '#38BDF8';
  ctx.lineWidth = 3;
  ctx.strokeRect(18, 18, 220, 220);

  ctx.fillStyle = '#FFFFFF';
  ctx.font = '900 150px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText(letter, 128, 134);

  const texture = new THREE.CanvasTexture(canvas);
  texture.anisotropy = 8;
  texture.colorSpace = THREE.SRGBColorSpace;
  textureCache.set(key, texture);
  return texture;
}

/**
 * Wayfinding Totem Board Texture (512x1024)
 */
export function getWayfindingTotemTexture() {
  const key = 'wayfinding-totem-512x1024';
  if (textureCache.has(key)) return textureCache.get(key);

  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 1024;
  const ctx = canvas.getContext('2d');

  ctx.fillStyle = '#071B3A';
  ctx.fillRect(0, 0, 512, 1024);

  ctx.fillStyle = '#1677FF';
  ctx.fillRect(0, 0, 512, 16);

  ctx.fillStyle = '#FFFFFF';
  ctx.font = '900 52px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText('A5X CAMPUS', 256, 85);

  ctx.fillStyle = '#38BDF8';
  ctx.font = '700 24px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
  ctx.letterSpacing = '3px';
  ctx.fillText('DIRECTORY & WAYFINDING', 256, 125);

  ctx.strokeStyle = '#1E3A8A';
  ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.moveTo(40, 155);
  ctx.lineTo(472, 155);
  ctx.stroke();

  // Lab Alpha
  ctx.textAlign = 'left';
  ctx.fillStyle = '#1677FF';
  ctx.fillRect(40, 200, 12, 80);
  ctx.fillStyle = '#FFFFFF';
  ctx.font = '800 36px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
  ctx.fillText('▲ LAB ALPHA', 68, 235);
  ctx.fillStyle = '#94A3B8';
  ctx.font = '500 24px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
  ctx.fillText('Foundation Lab (Spawn Entrance)', 68, 268);

  // Lab Beta
  ctx.fillStyle = '#0284C7';
  ctx.fillRect(40, 320, 12, 80);
  ctx.fillStyle = '#FFFFFF';
  ctx.font = '800 36px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
  ctx.fillText('▶ LAB BETA', 68, 355);
  ctx.fillStyle = '#94A3B8';
  ctx.font = '500 24px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
  ctx.fillText('Development Lab & Prototyping', 68, 388);

  // Lab Gamma
  ctx.fillStyle = '#0EA5E9';
  ctx.fillRect(40, 440, 12, 80);
  ctx.fillStyle = '#FFFFFF';
  ctx.font = '800 36px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
  ctx.fillText('▶ LAB GAMMA', 68, 475);
  ctx.fillStyle = '#94A3B8';
  ctx.font = '500 24px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
  ctx.fillText('Advanced Innovation Lab', 68, 508);

  // Robotics Arena Bay
  ctx.fillStyle = '#38BDF8';
  ctx.fillRect(40, 560, 12, 80);
  ctx.fillStyle = '#FFFFFF';
  ctx.font = '800 36px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
  ctx.fillText('▶ ROBOTICS ARENA', 68, 595);
  ctx.fillStyle = '#94A3B8';
  ctx.font = '500 24px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
  ctx.fillText('Autonomous Robotics Testing Bay', 68, 628);

  // Bottom footer
  ctx.fillStyle = '#0F172A';
  ctx.fillRect(0, 880, 512, 144);
  ctx.fillStyle = '#64748B';
  ctx.textAlign = 'center';
  ctx.font = '600 22px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
  ctx.fillText('IMPOSSIBLE ENGINEERING', 256, 940);
  ctx.fillStyle = '#1677FF';
  ctx.fillText('● LEVEL ACCESS ALL LABS', 256, 975);

  const texture = new THREE.CanvasTexture(canvas);
  texture.anisotropy = 8;
  texture.colorSpace = THREE.SRGBColorSpace;
  textureCache.set(key, texture);
  return texture;
}

/**
 * A5X Flag Texture (512x256)
 */
export function getA5XFlagTexture() {
  const key = 'a5x-flag-512x256';
  if (textureCache.has(key)) return textureCache.get(key);

  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 256;
  const ctx = canvas.getContext('2d');

  ctx.fillStyle = '#071B3A';
  ctx.fillRect(0, 0, 512, 256);

  ctx.fillStyle = '#1677FF';
  ctx.beginPath();
  ctx.moveTo(0, 0);
  ctx.lineTo(80, 0);
  ctx.lineTo(160, 256);
  ctx.lineTo(80, 256);
  ctx.closePath();
  ctx.fill();

  ctx.fillStyle = '#FFFFFF';
  ctx.font = '900 110px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText('A5X', 300, 110);

  ctx.fillStyle = '#38BDF8';
  ctx.font = '700 24px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
  ctx.letterSpacing = '4px';
  ctx.fillText('INDUSTRIES', 300, 185);

  const texture = new THREE.CanvasTexture(canvas);
  texture.anisotropy = 8;
  texture.colorSpace = THREE.SRGBColorSpace;
  textureCache.set(key, texture);
  return texture;
}
