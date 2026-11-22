import * as THREE from 'three';

// Cache for generated door textures
const textureCache = new Map();

/**
 * Procedural frosted privacy band texture for sliding glass doors.
 * Band width 512x128 with fine horizontal frosted lines (40% alpha, white/ice-blue).
 */
export function getDoorPrivacyBandTexture() {
  const cacheKey = 'door-privacy-band';
  if (textureCache.has(cacheKey)) return textureCache.get(cacheKey);

  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 128;
  const ctx = canvas.getContext('2d');

  ctx.clearRect(0, 0, 512, 128);

  // Soft translucent frosted backdrop
  const grad = ctx.createLinearGradient(0, 0, 0, 128);
  grad.addColorStop(0, 'rgba(224, 242, 254, 0.05)');
  grad.addColorStop(0.2, 'rgba(224, 242, 254, 0.35)');
  grad.addColorStop(0.5, 'rgba(240, 249, 255, 0.50)');
  grad.addColorStop(0.8, 'rgba(224, 242, 254, 0.35)');
  grad.addColorStop(1, 'rgba(224, 242, 254, 0.05)');
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, 512, 128);

  // Horizontal micro-pinstripes
  ctx.strokeStyle = 'rgba(255, 255, 255, 0.45)';
  ctx.lineWidth = 2;
  for (let y = 16; y < 112; y += 12) {
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(512, y);
    ctx.stroke();
  }

  // Modern dotted matrix dots in center
  ctx.fillStyle = 'rgba(22, 119, 255, 0.6)';
  for (let x = 16; x < 512; x += 32) {
    ctx.beginPath();
    ctx.arc(x, 64, 2.5, 0, Math.PI * 2);
    ctx.fill();
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.ClampToEdgeWrapping;
  texture.repeat.set(2, 1);
  textureCache.set(cacheKey, texture);
  return texture;
}

/**
 * Crisp lintel directional sign plate for door headers.
 * Renders on both faces of the lintel so the room destination is obvious from both sides.
 */
export function getDoorLintelPlateTexture(title, subtitle = 'AUTOMATED SLIDING ACCESS') {
  const cacheKey = `lintel-plate-${title}-${subtitle}`;
  if (textureCache.has(cacheKey)) return textureCache.get(cacheKey);

  const canvas = document.createElement('canvas');
  canvas.width = 1024;
  canvas.height = 256;
  const ctx = canvas.getContext('2d');

  // Background: Deep architectural navy
  ctx.fillStyle = '#0B2A5B';
  ctx.fillRect(0, 0, 1024, 256);

  // Border frame: Electric blue
  ctx.strokeStyle = '#1677FF';
  ctx.lineWidth = 6;
  ctx.strokeRect(6, 6, 1012, 244);

  // Left accent pill with A5X mark
  ctx.fillStyle = '#1677FF';
  ctx.fillRect(28, 48, 64, 64);
  ctx.fillStyle = '#FFFFFF';
  ctx.font = 'bold 24px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText('A5X', 60, 80);

  // Directional Title
  ctx.textAlign = 'left';
  ctx.textBaseline = 'alphabetic';
  ctx.fillStyle = '#FFFFFF';
  ctx.font = 'bold 58px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
  ctx.fillText(title, 112, 96);

  // Subtitle / Access status
  ctx.fillStyle = '#60A5FA';
  ctx.font = '600 24px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
  ctx.letterSpacing = '2px';
  ctx.fillText(subtitle.toUpperCase(), 114, 160);

  // Bottom glowing status bar
  ctx.fillStyle = '#10B981';
  ctx.fillRect(28, 204, 968, 6);

  const texture = new THREE.CanvasTexture(canvas);
  textureCache.set(cacheKey, texture);
  return texture;
}
