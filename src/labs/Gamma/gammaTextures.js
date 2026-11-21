import * as THREE from 'three';

// Cache to prevent duplicate canvas allocations
const textureCache = new Map();

/**
 * Procedural Texture Generator for Lab Gamma & Robotics Arena (Revision 17)
 * High-performance, crisp canvas-backed textures for smart screens, monitors,
 * track surfaces, whiteboards, cutting mats, and signs.
 */

export function getGammaInteractiveDisplayTexture() {
  const key = 'gamma-interactive-display-rev14';
  if (textureCache.has(key)) return textureCache.get(key);

  const canvas = document.createElement('canvas');
  canvas.width = 2048;
  canvas.height = 1152;
  const ctx = canvas.getContext('2d');

  // 1. Deep Cybernetic Navy Gradient
  const bgGrad = ctx.createRadialGradient(1024, 576, 80, 1024, 576, 1200);
  bgGrad.addColorStop(0, '#0F3066');
  bgGrad.addColorStop(0.45, '#071F45');
  bgGrad.addColorStop(1, '#030E22');
  ctx.fillStyle = bgGrad;
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // 2. Flowing Electric-Blue Light Waves
  ctx.save();
  for (let i = 0; i < 6; i++) {
    ctx.beginPath();
    const grad = ctx.createLinearGradient(0, 0, 2048, 0);
    grad.addColorStop(0, 'rgba(22, 119, 255, 0)');
    grad.addColorStop(0.3, `rgba(56, 189, 248, ${0.12 + i * 0.07})`);
    grad.addColorStop(0.7, `rgba(0, 210, 255, ${0.15 + i * 0.08})`);
    grad.addColorStop(1, 'rgba(22, 119, 255, 0)');
    ctx.strokeStyle = grad;
    ctx.lineWidth = 4 + i * 3;
    ctx.moveTo(0, 520 + i * 40);
    ctx.bezierCurveTo(520, 320 + i * 55, 1300, 840 - i * 45, 2048, 560 + i * 35);
    ctx.stroke();
  }
  ctx.restore();

  // Subtle background dot grid
  ctx.fillStyle = 'rgba(255, 255, 255, 0.035)';
  for (let x = 40; x < canvas.width; x += 60) {
    for (let y = 40; y < canvas.height; y += 60) {
      ctx.beginPath(); ctx.arc(x, y, 1.5, 0, Math.PI * 2); ctx.fill();
    }
  }

  // 3. Top-Right Status Indicators (Wifi, Cloud, Battery, Time)
  ctx.fillStyle = '#CBD5E1';
  ctx.font = '500 22px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto';
  ctx.textAlign = 'right';
  ctx.fillText('⚡ 275 TOPS   |   ● ROS 2: ONLINE   |   📶 5G-IoT   |   100%', 2000, 52);

  // 4. Center Clock: "10:24" Large & "Thu, Nov 21" below
  ctx.textAlign = 'center';
  ctx.fillStyle = '#FFFFFF';
  ctx.font = '300 135px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto';
  ctx.fillText('10:24', 1024, 460);

  ctx.fillStyle = '#93C5FD';
  ctx.font = '500 36px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto';
  ctx.fillText('Thu, Nov 21', 1024, 530);

  // 5. Dock with Exactly 8 Coloured App Icons
  const dockWidth = 920;
  const dockHeight = 105;
  const dockX = (canvas.width - dockWidth) / 2;
  const dockY = 920;

  ctx.fillStyle = 'rgba(15, 23, 42, 0.8)';
  ctx.strokeStyle = 'rgba(56, 189, 248, 0.45)';
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.roundRect(dockX, dockY, dockWidth, dockHeight, 24);
  ctx.fill();
  ctx.stroke();

  const dockApps = [
    { name: 'Whiteboard', icon: '✎', color: '#1677FF' },
    { name: 'Files', icon: '📁', color: '#0284C7' },
    { name: 'Browser', icon: '🌐', color: '#0EA5E9' },
    { name: 'ROS 2', icon: '🤖', color: '#10B981' },
    { name: 'Camera', icon: '📷', color: '#F59E0B' },
    { name: 'AI Vision', icon: '👁', color: '#8B5CF6' },
    { name: 'Telemetry', icon: '📊', color: '#EC4899' },
    { name: 'Settings', icon: '⚙', color: '#64748B' },
  ];

  dockApps.forEach((app, i) => {
    const ax = dockX + 32 + i * 108;
    const ay = dockY + 18;
    ctx.fillStyle = app.color;
    ctx.beginPath();
    ctx.roundRect(ax, ay, 70, 70, 16);
    ctx.fill();

    ctx.fillStyle = '#FFFFFF';
    ctx.font = '32px sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText(app.icon, ax + 35, ay + 47);
  });

  // 6. Thin bottom taskbar line
  ctx.fillStyle = 'rgba(255, 255, 255, 0.4)';
  ctx.beginPath();
  ctx.roundRect(1024 - 110, 1130, 220, 5, 3);
  ctx.fill();

  const texture = new THREE.CanvasTexture(canvas);
  texture.minFilter = THREE.LinearFilter;
  texture.magFilter = THREE.LinearFilter;
  textureCache.set(key, texture);
  return texture;
}

export function getGammaWhiteboardStandTexture() {
  const key = 'gamma-whiteboard-stand';
  if (textureCache.has(key)) return textureCache.get(key);

  const canvas = document.createElement('canvas');
  canvas.width = 1400;
  canvas.height = 1000;
  const ctx = canvas.getContext('2d');

  // White porcelain surface
  ctx.fillStyle = '#F8FAFC';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Left Side: Checklist with checkboxes
  const items = ['Robotics', 'AI & ML', 'IoT', 'AR / VR', 'Prototyping'];
  items.forEach((item, i) => {
    const y = 180 + i * 130;

    // Checkbox square
    ctx.strokeStyle = '#475569';
    ctx.lineWidth = 4;
    ctx.strokeRect(90, y, 48, 48);

    // Blue checkmark
    ctx.strokeStyle = '#1677FF';
    ctx.lineWidth = 6;
    ctx.beginPath();
    ctx.moveTo(98, y + 26);
    ctx.lineTo(112, y + 42);
    ctx.lineTo(138, y + 12);
    ctx.stroke();

    // Text in dark grey #334155
    ctx.fillStyle = '#1E293B';
    ctx.font = 'bold 44px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto';
    ctx.textAlign = 'left';
    ctx.fillText(item, 170, y + 40);
  });

  // Right Side: Hand-drawn robot arm sketch + mechanical gear
  ctx.save();
  ctx.translate(920, 480);

  // Robot Arm Links & Joints (Blue/Grey technical sketch)
  ctx.strokeStyle = '#334155';
  ctx.lineWidth = 5;
  ctx.lineCap = 'round';
  ctx.lineJoin = 'round';

  // Base
  ctx.strokeRect(-90, 150, 180, 40);

  // Joint 1
  ctx.beginPath(); ctx.arc(0, 140, 30, 0, Math.PI * 2); ctx.stroke();
  // Link 1 angled
  ctx.beginPath(); ctx.moveTo(0, 140); ctx.lineTo(-70, -30); ctx.stroke();
  // Joint 2
  ctx.beginPath(); ctx.arc(-70, -30, 24, 0, Math.PI * 2); ctx.stroke();
  // Link 2 angled
  ctx.beginPath(); ctx.moveTo(-70, -30); ctx.lineTo(60, -180); ctx.stroke();
  // Wrist Joint
  ctx.beginPath(); ctx.arc(60, -180, 20, 0, Math.PI * 2); ctx.stroke();
  // Gripper claws
  ctx.beginPath(); ctx.moveTo(60, -180); ctx.lineTo(110, -210); ctx.stroke();
  ctx.beginPath(); ctx.moveTo(60, -180); ctx.lineTo(120, -165); ctx.stroke();

  // Mechanical Gear on the Right
  ctx.translate(220, 40);
  ctx.strokeStyle = '#2563EB';
  ctx.lineWidth = 4;
  ctx.beginPath();
  const numTeeth = 12;
  const rInner = 60;
  const rOuter = 80;
  for (let i = 0; i < numTeeth * 2; i++) {
    const angle = (i * Math.PI) / numTeeth;
    const r = i % 2 === 0 ? rOuter : rInner;
    const gx = Math.cos(angle) * r;
    const gy = Math.sin(angle) * r;
    if (i === 0) ctx.moveTo(gx, gy);
    else ctx.lineTo(gx, gy);
  }
  ctx.closePath();
  ctx.stroke();

  ctx.beginPath();
  ctx.arc(0, 0, 26, 0, Math.PI * 2);
  ctx.stroke();

  ctx.restore();

  const texture = new THREE.CanvasTexture(canvas);
  textureCache.set(key, texture);
  return texture;
}

/**
 * =========================================================================
 * REVISION 17: ROBOTICS ARENA BAY DEDICATED HIGH-RES TEXTURES
 * =========================================================================
 */

/**
 * 1. Back Wall Hexagonal Blue LED Frame Banner (2048 x 768)
 * Features robot icon, "Robotics Arena", and 4 line-style icon columns:
 * 1. Robo Race (chequered flag) | 2. Robo Soccer (ball) | 3. Line Follower (squiggle) | 4. Obstacle Challenge (cube)
 */

export function getRoboticsHexBannerTexture() {
  const key = 'gamma-robotics-hex-banner';
  if (textureCache.has(key)) return textureCache.get(key);

  const canvas = document.createElement('canvas');
  canvas.width = 2048;
  canvas.height = 768;
  const ctx = canvas.getContext('2d');

  // Deep Navy Background
  ctx.fillStyle = '#071B3A';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Outer Electric Blue Border
  ctx.strokeStyle = '#1677FF';
  ctx.lineWidth = 14;
  ctx.strokeRect(20, 20, canvas.width - 40, canvas.height - 40);

  // Top Section: Robot Icon + "Robotics Arena"
  ctx.save();
  // Robot head icon (line style, white & cyan)
  const rx = 820;
  const ry = 140;
  ctx.strokeStyle = '#38BDF8';
  ctx.lineWidth = 8;
  ctx.beginPath();
  ctx.roundRect(rx, ry - 50, 90, 75, 16);
  ctx.stroke();
  // Antennae
  ctx.beginPath();
  ctx.moveTo(rx + 45, ry - 50); ctx.lineTo(rx + 45, ry - 75);
  ctx.stroke();
  ctx.fillStyle = '#38BDF8';
  ctx.beginPath(); ctx.arc(rx + 45, ry - 78, 8, 0, Math.PI * 2); ctx.fill();
  // Eyes & smile
  ctx.beginPath(); ctx.arc(rx + 28, ry - 18, 7, 0, Math.PI * 2); ctx.fill();
  ctx.beginPath(); ctx.arc(rx + 62, ry - 18, 7, 0, Math.PI * 2); ctx.fill();
  ctx.beginPath(); ctx.arc(rx + 45, ry - 5, 18, 0.2 * Math.PI, 0.8 * Math.PI); ctx.stroke();
  ctx.restore();

  // Header Title
  ctx.fillStyle = '#FFFFFF';
  ctx.font = 'bold 76px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto';
  ctx.textAlign = 'left';
  ctx.fillText('Robotics Arena', 950, 162);

  // Horizontal divider under header
  ctx.strokeStyle = 'rgba(255, 255, 255, 0.2)';
  ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.moveTo(100, 220);
  ctx.lineTo(canvas.width - 100, 220);
  ctx.stroke();

  // 4 Icon Columns (Width ~440px each, centers: 290, 770, 1270, 1750)
  const colCenters = [290, 770, 1270, 1750];
  const colTitles = ['Robo Race', 'Robo Soccer', 'Line Follower', 'Obstacle Challenge'];

  // Vertical dividers between columns
  ctx.strokeStyle = 'rgba(255, 255, 255, 0.15)';
  ctx.lineWidth = 2;
  [530, 1020, 1510].forEach((vx) => {
    ctx.beginPath();
    ctx.moveTo(vx, 250);
    ctx.lineTo(vx, canvas.height - 80);
    ctx.stroke();
  });

  // Render each column's line-style icon and title
  colCenters.forEach((cx, idx) => {
    const cy = 420;
    ctx.save();
    ctx.strokeStyle = '#FFFFFF';
    ctx.fillStyle = '#FFFFFF';
    ctx.lineWidth = 7;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';

    if (idx === 0) {
      // 1. Robo Race: Chequered Flag line art
      ctx.beginPath();
      ctx.moveTo(cx - 45, cy + 60); ctx.lineTo(cx - 45, cy - 65);
      ctx.stroke();
      ctx.strokeRect(cx - 45, cy - 65, 95, 65);
      // Chequered tiles
      for (let r = 0; r < 3; r++) {
        for (let c = 0; c < 3; c++) {
          if ((r + c) % 2 === 0) {
            ctx.fillRect(cx - 45 + c * 31.6, cy - 65 + r * 21.6, 31.6, 21.6);
          }
        }
      }
    } else if (idx === 1) {
      // 2. Robo Soccer: Ball with hexagon pattern
      ctx.beginPath();
      ctx.arc(cx, cy, 55, 0, Math.PI * 2);
      ctx.stroke();
      // Center pentagon
      ctx.beginPath();
      for (let a = 0; a < 5; a++) {
        const ang = (a * 2 * Math.PI) / 5 - Math.PI / 2;
        const px = cx + Math.cos(ang) * 22;
        const py = cy + Math.sin(ang) * 22;
        if (a === 0) ctx.moveTo(px, py); else ctx.lineTo(px, py);
      }
      ctx.closePath();
      ctx.fill();
    } else if (idx === 2) {
      // 3. Line Follower: Smooth serpentine / S-curve line
      ctx.beginPath();
      ctx.moveTo(cx - 50, cy + 50);
      ctx.bezierCurveTo(cx - 50, cy, cx, cy, cx, cy - 10);
      ctx.bezierCurveTo(cx, cy - 30, cx + 50, cy - 30, cx + 50, cy - 60);
      ctx.lineWidth = 12;
      ctx.stroke();
    } else {
      // 4. Obstacle Challenge: 3D Wireframe Cube
      const s = 45;
      const off = 22;
      ctx.strokeRect(cx - s - off / 2, cy - s + off / 2, s * 2, s * 2);
      ctx.strokeRect(cx - s + off / 2, cy - s - off / 2, s * 2, s * 2);
      ctx.beginPath();
      ctx.moveTo(cx - s - off / 2, cy - s + off / 2); ctx.lineTo(cx - s + off / 2, cy - s - off / 2);
      ctx.moveTo(cx + s - off / 2, cy - s + off / 2); ctx.lineTo(cx + s + off / 2, cy - s - off / 2);
      ctx.moveTo(cx - s - off / 2, cy + s + off / 2); ctx.lineTo(cx - s + off / 2, cy + s - off / 2);
      ctx.moveTo(cx + s - off / 2, cy + s + off / 2); ctx.lineTo(cx + s + off / 2, cy + s - off / 2);
      ctx.stroke();
    }
    ctx.restore();

    // Column Title
    ctx.fillStyle = '#FFFFFF';
    ctx.font = 'bold 36px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto';
    ctx.textAlign = 'center';
    ctx.fillText(colTitles[idx], cx, cy + 150);
  });

  const texture = new THREE.CanvasTexture(canvas);
  texture.anisotropy = 8;
  textureCache.set(key, texture);
  return texture;
}

/**
 * 2. Robo Soccer Pitch Turf Texture (2048 x 1024)
 * Green synthetic grass with white regulation pitch lines, center circle, penalty boxes
 */

export function getSoccerPitchTexture() {
  const key = 'gamma-soccer-pitch-turf';
  if (textureCache.has(key)) return textureCache.get(key);

  const canvas = document.createElement('canvas');
  canvas.width = 2048;
  canvas.height = 1024;
  const ctx = canvas.getContext('2d');

  // Alternating lawn stripes (green turf)
  const stripeW = 128;
  for (let x = 0; x < canvas.width; x += stripeW) {
    ctx.fillStyle = (x / stripeW) % 2 === 0 ? '#15803D' : '#16A34A';
    ctx.fillRect(x, 0, stripeW, canvas.height);
  }

  // Turf fine grain
  ctx.fillStyle = 'rgba(255, 255, 255, 0.03)';
  for (let i = 0; i < 25000; i++) {
    const rx = Math.random() * canvas.width;
    const ry = Math.random() * canvas.height;
    ctx.fillRect(rx, ry, 2, 2);
  }

  // Regulation White Pitch Markings
  ctx.strokeStyle = '#FFFFFF';
  ctx.lineWidth = 14;

  // Outer Touchlines (Padding 60px)
  const padX = 70;
  const padY = 60;
  const pw = canvas.width - padX * 2;
  const ph = canvas.height - padY * 2;
  ctx.strokeRect(padX, padY, pw, ph);

  // Halfway Line
  const midX = canvas.width / 2;
  ctx.beginPath();
  ctx.moveTo(midX, padY);
  ctx.lineTo(midX, canvas.height - padY);
  ctx.stroke();

  // Center Circle (Radius 160px) & Center Spot
  ctx.beginPath();
  ctx.arc(midX, canvas.height / 2, 160, 0, Math.PI * 2);
  ctx.stroke();
  ctx.fillStyle = '#FFFFFF';
  ctx.beginPath();
  ctx.arc(midX, canvas.height / 2, 12, 0, Math.PI * 2);
  ctx.fill();

  // Left Penalty Box (18-yard box: 340 x 480)
  const pBoxW = 340;
  const pBoxH = 480;
  const pBoxY = (canvas.height - pBoxH) / 2;
  ctx.strokeRect(padX, pBoxY, pBoxW, pBoxH);

  // Left Goal Box (6-yard box: 140 x 260)
  const gBoxW = 140;
  const gBoxH = 260;
  const gBoxY = (canvas.height - gBoxH) / 2;
  ctx.strokeRect(padX, gBoxY, gBoxW, gBoxH);

  // Left Penalty Spot & Arc
  ctx.beginPath(); ctx.arc(padX + 240, canvas.height / 2, 10, 0, Math.PI * 2); ctx.fill();
  ctx.beginPath();
  ctx.arc(padX + 240, canvas.height / 2, 120, -0.28 * Math.PI, 0.28 * Math.PI);
  ctx.stroke();

  // Right Penalty Box
  ctx.strokeRect(canvas.width - padX - pBoxW, pBoxY, pBoxW, pBoxH);

  // Right Goal Box
  ctx.strokeRect(canvas.width - padX - gBoxW, gBoxY, gBoxW, gBoxH);

  // Right Penalty Spot & Arc
  ctx.beginPath(); ctx.arc(canvas.width - padX - 240, canvas.height / 2, 10, 0, Math.PI * 2); ctx.fill();
  ctx.beginPath();
  ctx.arc(canvas.width - padX - 240, canvas.height / 2, 120, 0.72 * Math.PI, 1.28 * Math.PI);
  ctx.stroke();

  // Corner Arcs
  const cr = 45;
  ctx.beginPath(); ctx.arc(padX, padY, cr, 0, Math.PI / 2); ctx.stroke();
  ctx.beginPath(); ctx.arc(padX, canvas.height - padY, cr, -Math.PI / 2, 0); ctx.stroke();
  ctx.beginPath(); ctx.arc(canvas.width - padX, padY, cr, Math.PI / 2, Math.PI); ctx.stroke();
  ctx.beginPath(); ctx.arc(canvas.width - padX, canvas.height - padY, cr, Math.PI, 1.5 * Math.PI); ctx.stroke();

  const texture = new THREE.CanvasTexture(canvas);
  texture.anisotropy = 8;
  textureCache.set(key, texture);
  return texture;
}

/**
 * 3. Robo Race Track Surface Texture (2048 x 2048)
 * Dark asphalt track with red/white kerbs, green grass infield patches, white lane lines
 */

export function getRoboRaceTrackTexture() {
  const key = 'gamma-robo-race-track';
  if (textureCache.has(key)) return textureCache.get(key);

  const canvas = document.createElement('canvas');
  canvas.width = 2048;
  canvas.height = 2048;
  const ctx = canvas.getContext('2d');

  // Dark Asphalt Background
  ctx.fillStyle = '#1A1E24';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Asphalt grain noise
  ctx.fillStyle = 'rgba(255, 255, 255, 0.02)';
  for (let i = 0; i < 30000; i++) {
    const rx = Math.random() * canvas.width;
    const ry = Math.random() * canvas.height;
    ctx.fillRect(rx, ry, 2, 2);
  }

  // Green Infield Grass Islands
  ctx.fillStyle = '#15803D';
  // Central Island
  ctx.beginPath();
  ctx.roundRect(700, 700, 648, 648, 120);
  ctx.fill();
  ctx.strokeStyle = '#16A34A';
  ctx.lineWidth = 14;
  ctx.stroke();

  // Corner Grass Insets
  ctx.beginPath();
  ctx.arc(350, 350, 160, 0, Math.PI * 2); ctx.fill();
  ctx.beginPath();
  ctx.arc(1698, 350, 160, 0, Math.PI * 2); ctx.fill();
  ctx.beginPath();
  ctx.arc(350, 1698, 160, 0, Math.PI * 2); ctx.fill();
  ctx.beginPath();
  ctx.arc(1698, 1698, 160, 0, Math.PI * 2); ctx.fill();

  // White Outer & Inner Track Boundaries
  ctx.strokeStyle = '#FFFFFF';
  ctx.lineWidth = 16;
  ctx.beginPath();
  ctx.roundRect(240, 240, 1568, 1568, 180);
  ctx.stroke();

  ctx.beginPath();
  ctx.roundRect(620, 620, 808, 808, 140);
  ctx.stroke();

  // Dashed Centerline
  ctx.setLineDash([48, 48]);
  ctx.strokeStyle = '#FFFFFF';
  ctx.lineWidth = 10;
  ctx.beginPath();
  ctx.roundRect(430, 430, 1188, 1188, 160);
  ctx.stroke();
  ctx.setLineDash([]); // Reset

  // Red & White Kerbs at Corners
  const drawKerb = (cx, cy, r, startAng, endAng) => {
    const segments = 10;
    const step = (endAng - startAng) / segments;
    for (let s = 0; s < segments; s++) {
      ctx.strokeStyle = s % 2 === 0 ? '#EF4444' : '#FFFFFF';
      ctx.lineWidth = 28;
      ctx.beginPath();
      ctx.arc(cx, cy, r, startAng + s * step, startAng + (s + 1) * step);
      ctx.stroke();
    }
  };

  drawKerb(420, 420, 200, Math.PI, 1.5 * Math.PI);
  drawKerb(1628, 420, 200, 1.5 * Math.PI, 2 * Math.PI);
  drawKerb(1628, 1628, 200, 0, 0.5 * Math.PI);
  drawKerb(420, 1628, 200, 0.5 * Math.PI, Math.PI);

  // START / FINISH Chequered Line
  const sfX = 850;
  const sfY = 1430;
  const tileSize = 38;
  for (let r = 0; r < 4; r++) {
    for (let c = 0; c < 9; c++) {
      ctx.fillStyle = (r + c) % 2 === 0 ? '#FFFFFF' : '#000000';
      ctx.fillRect(sfX + c * tileSize, sfY + r * tileSize, tileSize, tileSize);
    }
  }

  // Yellow & Black Hazard Rim Trim
  const hzSize = 32;
  for (let i = 0; i < canvas.width; i += hzSize * 2) {
    ctx.fillStyle = '#FACC15';
    ctx.fillRect(i, 0, hzSize, 28);
    ctx.fillRect(i, canvas.height - 28, hzSize, 28);
    ctx.fillStyle = '#0F172A';
    ctx.fillRect(i + hzSize, 0, hzSize, 28);
    ctx.fillRect(i + hzSize, canvas.height - 28, hzSize, 28);
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.anisotropy = 8;
  textureCache.set(key, texture);
  return texture;
}

/**
 * 4. Line Follower Arena Track Texture (2048 x 2048)
 * Clean white melamine board with winding continuous black tracking line and hazard border
 */

export function getLineFollowerTrackTexture() {
  const key = 'gamma-line-follower-track';
  if (textureCache.has(key)) return textureCache.get(key);

  const canvas = document.createElement('canvas');
  canvas.width = 2048;
  canvas.height = 2048;
  const ctx = canvas.getContext('2d');

  // Clean White Surface
  ctx.fillStyle = '#F8FAFC';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Perimeter Hazard Stripe Border (Yellow & Black)
  const bW = 32;
  for (let x = 0; x < canvas.width; x += bW * 2) {
    ctx.fillStyle = '#FACC15';
    ctx.fillRect(x, 0, bW, 36);
    ctx.fillRect(x, canvas.height - 36, bW, 36);
    ctx.fillStyle = '#0F172A';
    ctx.fillRect(x + bW, 0, bW, 36);
    ctx.fillRect(x + bW, canvas.height - 36, bW, 36);
  }
  for (let y = 0; y < canvas.height; y += bW * 2) {
    ctx.fillStyle = '#FACC15';
    ctx.fillRect(0, y, 36, bW);
    ctx.fillRect(canvas.width - 36, y, 36, bW);
    ctx.fillStyle = '#0F172A';
    ctx.fillRect(0, y + bW, 36, bW);
    ctx.fillRect(canvas.width - 36, y + bW, 36, bW);
  }

  // Obstacle Landing Pads (two dark grey rectangular areas)
  ctx.fillStyle = '#1E293B';
  ctx.fillRect(320, 840, 360, 200);
  ctx.fillRect(1368, 520, 360, 200);

  // Smooth Continuous Serpentine Black Line (32px wide)
  ctx.strokeStyle = '#0F172A';
  ctx.lineWidth = 36;
  ctx.lineCap = 'round';
  ctx.lineJoin = 'round';

  ctx.beginPath();
  // Winding serpentine loop across the board matching the reference render:
  ctx.moveTo(340, 340);
  ctx.bezierCurveTo(900, 340, 1100, 480, 1100, 720);
  ctx.bezierCurveTo(1100, 960, 600, 960, 600, 1200);
  ctx.bezierCurveTo(600, 1440, 1200, 1440, 1200, 1680);
  ctx.bezierCurveTo(1200, 1850, 850, 1850, 500, 1720);
  ctx.bezierCurveTo(240, 1600, 240, 1280, 450, 1100);
  ctx.bezierCurveTo(700, 900, 1550, 1100, 1700, 1350);
  ctx.bezierCurveTo(1850, 1600, 1850, 850, 1550, 650);
  ctx.bezierCurveTo(1300, 480, 600, 480, 340, 340);
  ctx.stroke();

  // Calibration markers
  ctx.fillStyle = '#1677FF';
  ctx.beginPath(); ctx.arc(340, 340, 24, 0, Math.PI * 2); ctx.fill();
  ctx.fillStyle = '#FFFFFF';
  ctx.font = 'bold 22px monospace';
  ctx.textAlign = 'center';
  ctx.fillText('START', 340, 395);

  const texture = new THREE.CanvasTexture(canvas);
  texture.anisotropy = 8;
  textureCache.set(key, texture);
  return texture;
}

/**
 * 5. Platform Skirt Textures with Glowing Cyan Bottom Bar
 */

export function getRoboSoccerSkirtTexture() {
  const key = 'gamma-soccer-skirt';
  if (textureCache.has(key)) return textureCache.get(key);

  const canvas = document.createElement('canvas');
  canvas.width = 1024;
  canvas.height = 128;
  const ctx = canvas.getContext('2d');

  ctx.fillStyle = '#071B3A';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Glowing Cyan Bottom Strip
  ctx.fillStyle = '#00D2FF';
  ctx.fillRect(0, canvas.height - 14, canvas.width, 14);

  // Text: "⚽ Robo Soccer Arena"
  ctx.fillStyle = '#FFFFFF';
  ctx.font = 'bold 44px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto';
  ctx.textAlign = 'center';
  ctx.fillText('⚽  Robo Soccer Arena', canvas.width / 2, 75);

  const texture = new THREE.CanvasTexture(canvas);
  textureCache.set(key, texture);
  return texture;
}

export function getRoboRaceSkirtTexture() {
  const key = 'gamma-race-skirt';
  if (textureCache.has(key)) return textureCache.get(key);

  const canvas = document.createElement('canvas');
  canvas.width = 1024;
  canvas.height = 128;
  const ctx = canvas.getContext('2d');

  ctx.fillStyle = '#071B3A';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Glowing Cyan Bottom Strip
  ctx.fillStyle = '#00D2FF';
  ctx.fillRect(0, canvas.height - 14, canvas.width, 14);

  // Slanted Race Stripes on Left & Right
  ctx.fillStyle = 'rgba(255, 255, 255, 0.4)';
  [-40, -15, 10].forEach((ox) => {
    ctx.beginPath();
    ctx.moveTo(140 + ox, 30);
    ctx.lineTo(165 + ox, 30);
    ctx.lineTo(135 + ox, 95);
    ctx.lineTo(110 + ox, 95);
    ctx.fill();

    ctx.beginPath();
    ctx.moveTo(canvas.width - 140 + ox, 30);
    ctx.lineTo(canvas.width - 115 + ox, 30);
    ctx.lineTo(canvas.width - 145 + ox, 95);
    ctx.lineTo(canvas.width - 170 + ox, 95);
    ctx.fill();
  });

  // Text: "🏁 Robo Race Arena"
  ctx.fillStyle = '#FFFFFF';
  ctx.font = 'bold 44px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto';
  ctx.textAlign = 'center';
  ctx.fillText('🏁  Robo Race Arena', canvas.width / 2, 75);

  const texture = new THREE.CanvasTexture(canvas);
  textureCache.set(key, texture);
  return texture;
}

export function getLineFollowerSkirtTexture() {
  const key = 'gamma-line-skirt';
  if (textureCache.has(key)) return textureCache.get(key);

  const canvas = document.createElement('canvas');
  canvas.width = 1024;
  canvas.height = 128;
  const ctx = canvas.getContext('2d');

  ctx.fillStyle = '#071B3A';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Glowing Cyan Bottom Strip
  ctx.fillStyle = '#00D2FF';
  ctx.fillRect(0, canvas.height - 14, canvas.width, 14);

  // Text: "∿ Line Follower Arena"
  ctx.fillStyle = '#FFFFFF';
  ctx.font = 'bold 44px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto';
  ctx.textAlign = 'center';
  ctx.fillText('∿  Line Follower Arena', canvas.width / 2, 75);

  const texture = new THREE.CanvasTexture(canvas);
  textureCache.set(key, texture);
  return texture;
}

/**
 * 6. START / FINISH Gantry Overhead Banner Texture
 */

export function getStartFinishBannerTexture() {
  const key = 'gamma-start-finish-banner';
  if (textureCache.has(key)) return textureCache.get(key);

  const canvas = document.createElement('canvas');
  canvas.width = 1024;
  canvas.height = 180;
  const ctx = canvas.getContext('2d');

  ctx.fillStyle = '#0F172A';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Chequered Flag Left & Right Blocks
  const ts = 25;
  for (let r = 0; r < Math.floor(canvas.height / ts); r++) {
    for (let c = 0; c < 7; c++) {
      ctx.fillStyle = (r + c) % 2 === 0 ? '#FFFFFF' : '#000000';
      ctx.fillRect(c * ts, r * ts, ts, ts);
      ctx.fillRect(canvas.width - (c + 1) * ts, r * ts, ts, ts);
    }
  }

  // Central Text
  ctx.fillStyle = '#FFFFFF';
  ctx.font = 'bold 52px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto';
  ctx.textAlign = 'center';
  ctx.fillText('START / FINISH', canvas.width / 2, 110);

  const texture = new THREE.CanvasTexture(canvas);
  textureCache.set(key, texture);
  return texture;
}

/**
 * 7. Neon A5X Sign Texture for Right Glass Wall
 */

export function getA5XNeonSignTexture() {
  const key = 'gamma-a5x-neon-sign';
  if (textureCache.has(key)) return textureCache.get(key);

  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 256;
  const ctx = canvas.getContext('2d');

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Blue Neon Glow
  ctx.shadowColor = '#00D2FF';
  ctx.shadowBlur = 24;
  ctx.fillStyle = '#FFFFFF';
  ctx.font = '900 120px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto';
  ctx.textAlign = 'center';
  ctx.fillText('A5X', canvas.width / 2, 170);

  const texture = new THREE.CanvasTexture(canvas);
  textureCache.set(key, texture);
  return texture;
}

/**
 * =========================================================================
 * REVISION 17: ROBOTICS ARENA BAY DEDICATED HIGH-RES TEXTURES
 * =========================================================================
 */

/**
 * 1. Back Wall Hexagonal Blue LED Frame Banner (2048 x 768)
 * Features robot icon, "Robotics Arena", and 4 line-style icon columns:
 * 1. Robo Race (chequered flag) | 2. Robo Soccer (ball) | 3. Line Follower (squiggle) | 4. Obstacle Challenge (cube)
 */
export function getRoboticsHexBannerTexture() {
  const key = 'gamma-robotics-hex-banner';
  if (textureCache.has(key)) return textureCache.get(key);

  const canvas = document.createElement('canvas');
  canvas.width = 2048;
  canvas.height = 768;
  const ctx = canvas.getContext('2d');

  // Deep Navy Background
  ctx.fillStyle = '#071B3A';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Outer Electric Blue Border
  ctx.strokeStyle = '#1677FF';
  ctx.lineWidth = 14;
  ctx.strokeRect(20, 20, canvas.width - 40, canvas.height - 40);

  // Top Section: Robot Icon + "Robotics Arena"
  ctx.save();
  // Robot head icon (line style, white & cyan)
  const rx = 820;
  const ry = 140;
  ctx.strokeStyle = '#38BDF8';
  ctx.lineWidth = 8;
  ctx.beginPath();
  ctx.roundRect(rx, ry - 50, 90, 75, 16);
  ctx.stroke();
  // Antennae
  ctx.beginPath();
  ctx.moveTo(rx + 45, ry - 50); ctx.lineTo(rx + 45, ry - 75);
  ctx.stroke();
  ctx.fillStyle = '#38BDF8';
  ctx.beginPath(); ctx.arc(rx + 45, ry - 78, 8, 0, Math.PI * 2); ctx.fill();
  // Eyes & smile
  ctx.beginPath(); ctx.arc(rx + 28, ry - 18, 7, 0, Math.PI * 2); ctx.fill();
  ctx.beginPath(); ctx.arc(rx + 62, ry - 18, 7, 0, Math.PI * 2); ctx.fill();
  ctx.beginPath(); ctx.arc(rx + 45, ry - 5, 18, 0.2 * Math.PI, 0.8 * Math.PI); ctx.stroke();
  ctx.restore();

  // Header Title
  ctx.fillStyle = '#FFFFFF';
  ctx.font = 'bold 76px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto';
  ctx.textAlign = 'left';
  ctx.fillText('Robotics Arena', 950, 162);

  // Horizontal divider under header
  ctx.strokeStyle = 'rgba(255, 255, 255, 0.2)';
  ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.moveTo(100, 220);
  ctx.lineTo(canvas.width - 100, 220);
  ctx.stroke();

  // 4 Icon Columns (Width ~440px each, centers: 290, 770, 1270, 1750)
  const colCenters = [290, 770, 1270, 1750];
  const colTitles = ['Robo Race', 'Robo Soccer', 'Line Follower', 'Obstacle Challenge'];

  // Vertical dividers between columns
  ctx.strokeStyle = 'rgba(255, 255, 255, 0.15)';
  ctx.lineWidth = 2;
  [530, 1020, 1510].forEach((vx) => {
    ctx.beginPath();
    ctx.moveTo(vx, 250);
    ctx.lineTo(vx, canvas.height - 80);
    ctx.stroke();
  });

  // Render each column's line-style icon and title
  colCenters.forEach((cx, idx) => {
    const cy = 420;
    ctx.save();
    ctx.strokeStyle = '#FFFFFF';
    ctx.fillStyle = '#FFFFFF';
    ctx.lineWidth = 7;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';

    if (idx === 0) {
      // 1. Robo Race: Chequered Flag line art
      ctx.beginPath();
      ctx.moveTo(cx - 45, cy + 60); ctx.lineTo(cx - 45, cy - 65);
      ctx.stroke();
      ctx.strokeRect(cx - 45, cy - 65, 95, 65);
      // Chequered tiles
      for (let r = 0; r < 3; r++) {
        for (let c = 0; c < 3; c++) {
          if ((r + c) % 2 === 0) {
            ctx.fillRect(cx - 45 + c * 31.6, cy - 65 + r * 21.6, 31.6, 21.6);
          }
        }
      }
    } else if (idx === 1) {
      // 2. Robo Soccer: Ball with hexagon pattern
      ctx.beginPath();
      ctx.arc(cx, cy, 55, 0, Math.PI * 2);
      ctx.stroke();
      // Center pentagon
      ctx.beginPath();
      for (let a = 0; a < 5; a++) {
        const ang = (a * 2 * Math.PI) / 5 - Math.PI / 2;
        const px = cx + Math.cos(ang) * 22;
        const py = cy + Math.sin(ang) * 22;
        if (a === 0) ctx.moveTo(px, py); else ctx.lineTo(px, py);
      }
      ctx.closePath();
      ctx.fill();
    } else if (idx === 2) {
      // 3. Line Follower: Smooth serpentine / S-curve line
      ctx.beginPath();
      ctx.moveTo(cx - 50, cy + 50);
      ctx.bezierCurveTo(cx - 50, cy, cx, cy, cx, cy - 10);
      ctx.bezierCurveTo(cx, cy - 30, cx + 50, cy - 30, cx + 50, cy - 60);
      ctx.lineWidth = 12;
      ctx.stroke();
    } else {
      // 4. Obstacle Challenge: 3D Wireframe Cube
      const s = 45;
      const off = 22;
      ctx.strokeRect(cx - s - off / 2, cy - s + off / 2, s * 2, s * 2);
      ctx.strokeRect(cx - s + off / 2, cy - s - off / 2, s * 2, s * 2);
      ctx.beginPath();
      ctx.moveTo(cx - s - off / 2, cy - s + off / 2); ctx.lineTo(cx - s + off / 2, cy - s - off / 2);
      ctx.moveTo(cx + s - off / 2, cy - s + off / 2); ctx.lineTo(cx + s + off / 2, cy - s - off / 2);
      ctx.moveTo(cx - s - off / 2, cy + s + off / 2); ctx.lineTo(cx - s + off / 2, cy + s - off / 2);
      ctx.moveTo(cx + s - off / 2, cy + s + off / 2); ctx.lineTo(cx + s + off / 2, cy + s - off / 2);
      ctx.stroke();
    }
    ctx.restore();

    // Column Title
    ctx.fillStyle = '#FFFFFF';
    ctx.font = 'bold 36px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto';
    ctx.textAlign = 'center';
    ctx.fillText(colTitles[idx], cx, cy + 150);
  });

  const texture = new THREE.CanvasTexture(canvas);
  texture.anisotropy = 8;
  textureCache.set(key, texture);
  return texture;
}

/**
 * 2. Robo Soccer Pitch Turf Texture (2048 x 1024)
 * Green synthetic grass with white regulation pitch lines, center circle, penalty boxes
 */
export function getSoccerPitchTexture() {
  const key = 'gamma-soccer-pitch-turf';
  if (textureCache.has(key)) return textureCache.get(key);

  const canvas = document.createElement('canvas');
  canvas.width = 2048;
  canvas.height = 1024;
  const ctx = canvas.getContext('2d');

  // Alternating lawn stripes (green turf)
  const stripeW = 128;
  for (let x = 0; x < canvas.width; x += stripeW) {
    ctx.fillStyle = (x / stripeW) % 2 === 0 ? '#15803D' : '#16A34A';
    ctx.fillRect(x, 0, stripeW, canvas.height);
  }

  // Turf fine grain
  ctx.fillStyle = 'rgba(255, 255, 255, 0.03)';
  for (let i = 0; i < 25000; i++) {
    const rx = Math.random() * canvas.width;
    const ry = Math.random() * canvas.height;
    ctx.fillRect(rx, ry, 2, 2);
  }

  // Regulation White Pitch Markings
  ctx.strokeStyle = '#FFFFFF';
  ctx.lineWidth = 14;

  // Outer Touchlines (Padding 60px)
  const padX = 70;
  const padY = 60;
  const pw = canvas.width - padX * 2;
  const ph = canvas.height - padY * 2;
  ctx.strokeRect(padX, padY, pw, ph);

  // Halfway Line
  const midX = canvas.width / 2;
  ctx.beginPath();
  ctx.moveTo(midX, padY);
  ctx.lineTo(midX, canvas.height - padY);
  ctx.stroke();

  // Center Circle (Radius 160px) & Center Spot
  ctx.beginPath();
  ctx.arc(midX, canvas.height / 2, 160, 0, Math.PI * 2);
  ctx.stroke();
  ctx.fillStyle = '#FFFFFF';
  ctx.beginPath();
  ctx.arc(midX, canvas.height / 2, 12, 0, Math.PI * 2);
  ctx.fill();

  // Left Penalty Box (18-yard box: 340 x 480)
  const pBoxW = 340;
  const pBoxH = 480;
  const pBoxY = (canvas.height - pBoxH) / 2;
  ctx.strokeRect(padX, pBoxY, pBoxW, pBoxH);

  // Left Goal Box (6-yard box: 140 x 260)
  const gBoxW = 140;
  const gBoxH = 260;
  const gBoxY = (canvas.height - gBoxH) / 2;
  ctx.strokeRect(padX, gBoxY, gBoxW, gBoxH);

  // Left Penalty Spot & Arc
  ctx.beginPath(); ctx.arc(padX + 240, canvas.height / 2, 10, 0, Math.PI * 2); ctx.fill();
  ctx.beginPath();
  ctx.arc(padX + 240, canvas.height / 2, 120, -0.28 * Math.PI, 0.28 * Math.PI);
  ctx.stroke();

  // Right Penalty Box
  ctx.strokeRect(canvas.width - padX - pBoxW, pBoxY, pBoxW, pBoxH);

  // Right Goal Box
  ctx.strokeRect(canvas.width - padX - gBoxW, gBoxY, gBoxW, gBoxH);

  // Right Penalty Spot & Arc
  ctx.beginPath(); ctx.arc(canvas.width - padX - 240, canvas.height / 2, 10, 0, Math.PI * 2); ctx.fill();
  ctx.beginPath();
  ctx.arc(canvas.width - padX - 240, canvas.height / 2, 120, 0.72 * Math.PI, 1.28 * Math.PI);
  ctx.stroke();

  // Corner Arcs
  const cr = 45;
  ctx.beginPath(); ctx.arc(padX, padY, cr, 0, Math.PI / 2); ctx.stroke();
  ctx.beginPath(); ctx.arc(padX, canvas.height - padY, cr, -Math.PI / 2, 0); ctx.stroke();
  ctx.beginPath(); ctx.arc(canvas.width - padX, padY, cr, Math.PI / 2, Math.PI); ctx.stroke();
  ctx.beginPath(); ctx.arc(canvas.width - padX, canvas.height - padY, cr, Math.PI, 1.5 * Math.PI); ctx.stroke();

  const texture = new THREE.CanvasTexture(canvas);
  texture.anisotropy = 8;
  textureCache.set(key, texture);
  return texture;
}

/**
 * 3. Robo Race Track Surface Texture (2048 x 2048)
 * Dark asphalt track with red/white kerbs, green grass infield patches, white lane lines
 */
export function getRoboRaceTrackTexture() {
  const key = 'gamma-robo-race-track';
  if (textureCache.has(key)) return textureCache.get(key);

  const canvas = document.createElement('canvas');
  canvas.width = 2048;
  canvas.height = 2048;
  const ctx = canvas.getContext('2d');

  // Dark Asphalt Background
  ctx.fillStyle = '#1A1E24';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Asphalt grain noise
  ctx.fillStyle = 'rgba(255, 255, 255, 0.02)';
  for (let i = 0; i < 30000; i++) {
    const rx = Math.random() * canvas.width;
    const ry = Math.random() * canvas.height;
    ctx.fillRect(rx, ry, 2, 2);
  }

  // Green Infield Grass Islands
  ctx.fillStyle = '#15803D';
  // Central Island
  ctx.beginPath();
  ctx.roundRect(700, 700, 648, 648, 120);
  ctx.fill();
  ctx.strokeStyle = '#16A34A';
  ctx.lineWidth = 14;
  ctx.stroke();

  // Corner Grass Insets
  ctx.beginPath();
  ctx.arc(350, 350, 160, 0, Math.PI * 2); ctx.fill();
  ctx.beginPath();
  ctx.arc(1698, 350, 160, 0, Math.PI * 2); ctx.fill();
  ctx.beginPath();
  ctx.arc(350, 1698, 160, 0, Math.PI * 2); ctx.fill();
  ctx.beginPath();
  ctx.arc(1698, 1698, 160, 0, Math.PI * 2); ctx.fill();

  // White Outer & Inner Track Boundaries
  ctx.strokeStyle = '#FFFFFF';
  ctx.lineWidth = 16;
  ctx.beginPath();
  ctx.roundRect(240, 240, 1568, 1568, 180);
  ctx.stroke();

  ctx.beginPath();
  ctx.roundRect(620, 620, 808, 808, 140);
  ctx.stroke();

  // Dashed Centerline
  ctx.setLineDash([48, 48]);
  ctx.strokeStyle = '#FFFFFF';
  ctx.lineWidth = 10;
  ctx.beginPath();
  ctx.roundRect(430, 430, 1188, 1188, 160);
  ctx.stroke();
  ctx.setLineDash([]); // Reset

  // Red & White Kerbs at Corners
  const drawKerb = (cx, cy, r, startAng, endAng) => {
    const segments = 10;
    const step = (endAng - startAng) / segments;
    for (let s = 0; s < segments; s++) {
      ctx.strokeStyle = s % 2 === 0 ? '#EF4444' : '#FFFFFF';
      ctx.lineWidth = 28;
      ctx.beginPath();
      ctx.arc(cx, cy, r, startAng + s * step, startAng + (s + 1) * step);
      ctx.stroke();
    }
  };

  drawKerb(420, 420, 200, Math.PI, 1.5 * Math.PI);
  drawKerb(1628, 420, 200, 1.5 * Math.PI, 2 * Math.PI);
  drawKerb(1628, 1628, 200, 0, 0.5 * Math.PI);
  drawKerb(420, 1628, 200, 0.5 * Math.PI, Math.PI);

  // START / FINISH Chequered Line
  const sfX = 850;
  const sfY = 1430;
  const tileSize = 38;
  for (let r = 0; r < 4; r++) {
    for (let c = 0; c < 9; c++) {
      ctx.fillStyle = (r + c) % 2 === 0 ? '#FFFFFF' : '#000000';
      ctx.fillRect(sfX + c * tileSize, sfY + r * tileSize, tileSize, tileSize);
    }
  }

  // Yellow & Black Hazard Rim Trim
  const hzSize = 32;
  for (let i = 0; i < canvas.width; i += hzSize * 2) {
    ctx.fillStyle = '#FACC15';
    ctx.fillRect(i, 0, hzSize, 28);
    ctx.fillRect(i, canvas.height - 28, hzSize, 28);
    ctx.fillStyle = '#0F172A';
    ctx.fillRect(i + hzSize, 0, hzSize, 28);
    ctx.fillRect(i + hzSize, canvas.height - 28, hzSize, 28);
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.anisotropy = 8;
  textureCache.set(key, texture);
  return texture;
}

/**
 * 4. Line Follower Arena Track Texture (2048 x 2048)
 * Clean white melamine board with winding continuous black tracking line and hazard border
 */
export function getLineFollowerTrackTexture() {
  const key = 'gamma-line-follower-track';
  if (textureCache.has(key)) return textureCache.get(key);

  const canvas = document.createElement('canvas');
  canvas.width = 2048;
  canvas.height = 2048;
  const ctx = canvas.getContext('2d');

  // Clean White Surface
  ctx.fillStyle = '#F8FAFC';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Perimeter Hazard Stripe Border (Yellow & Black)
  const bW = 32;
  for (let x = 0; x < canvas.width; x += bW * 2) {
    ctx.fillStyle = '#FACC15';
    ctx.fillRect(x, 0, bW, 36);
    ctx.fillRect(x, canvas.height - 36, bW, 36);
    ctx.fillStyle = '#0F172A';
    ctx.fillRect(x + bW, 0, bW, 36);
    ctx.fillRect(x + bW, canvas.height - 36, bW, 36);
  }
  for (let y = 0; y < canvas.height; y += bW * 2) {
    ctx.fillStyle = '#FACC15';
    ctx.fillRect(0, y, 36, bW);
    ctx.fillRect(canvas.width - 36, y, 36, bW);
    ctx.fillStyle = '#0F172A';
    ctx.fillRect(0, y + bW, 36, bW);
    ctx.fillRect(canvas.width - 36, y + bW, 36, bW);
  }

  // Obstacle Landing Pads (two dark grey rectangular areas)
  ctx.fillStyle = '#1E293B';
  ctx.fillRect(320, 840, 360, 200);
  ctx.fillRect(1368, 520, 360, 200);

  // Smooth Continuous Serpentine Black Line (32px wide)
  ctx.strokeStyle = '#0F172A';
  ctx.lineWidth = 36;
  ctx.lineCap = 'round';
  ctx.lineJoin = 'round';

  ctx.beginPath();
  // Winding serpentine loop across the board matching the reference render:
  ctx.moveTo(340, 340);
  ctx.bezierCurveTo(900, 340, 1100, 480, 1100, 720);
  ctx.bezierCurveTo(1100, 960, 600, 960, 600, 1200);
  ctx.bezierCurveTo(600, 1440, 1200, 1440, 1200, 1680);
  ctx.bezierCurveTo(1200, 1850, 850, 1850, 500, 1720);
  ctx.bezierCurveTo(240, 1600, 240, 1280, 450, 1100);
  ctx.bezierCurveTo(700, 900, 1550, 1100, 1700, 1350);
  ctx.bezierCurveTo(1850, 1600, 1850, 850, 1550, 650);
  ctx.bezierCurveTo(1300, 480, 600, 480, 340, 340);
  ctx.stroke();

  // Calibration markers
  ctx.fillStyle = '#1677FF';
  ctx.beginPath(); ctx.arc(340, 340, 24, 0, Math.PI * 2); ctx.fill();
  ctx.fillStyle = '#FFFFFF';
  ctx.font = 'bold 22px monospace';
  ctx.textAlign = 'center';
  ctx.fillText('START', 340, 395);

  const texture = new THREE.CanvasTexture(canvas);
  texture.anisotropy = 8;
  textureCache.set(key, texture);
  return texture;
}

/**
 * 5. Platform Skirt Textures with Glowing Cyan Bottom Bar
 */
export function getRoboSoccerSkirtTexture() {
  const key = 'gamma-soccer-skirt';
  if (textureCache.has(key)) return textureCache.get(key);

  const canvas = document.createElement('canvas');
  canvas.width = 1024;
  canvas.height = 128;
  const ctx = canvas.getContext('2d');

  ctx.fillStyle = '#071B3A';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Glowing Cyan Bottom Strip
  ctx.fillStyle = '#00D2FF';
  ctx.fillRect(0, canvas.height - 14, canvas.width, 14);

  // Text: "⚽ Robo Soccer Arena"
  ctx.fillStyle = '#FFFFFF';
  ctx.font = 'bold 44px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto';
  ctx.textAlign = 'center';
  ctx.fillText('⚽  Robo Soccer Arena', canvas.width / 2, 75);

  const texture = new THREE.CanvasTexture(canvas);
  textureCache.set(key, texture);
  return texture;
}

export function getRoboRaceSkirtTexture() {
  const key = 'gamma-race-skirt';
  if (textureCache.has(key)) return textureCache.get(key);

  const canvas = document.createElement('canvas');
  canvas.width = 1024;
  canvas.height = 128;
  const ctx = canvas.getContext('2d');

  ctx.fillStyle = '#071B3A';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Glowing Cyan Bottom Strip
  ctx.fillStyle = '#00D2FF';
  ctx.fillRect(0, canvas.height - 14, canvas.width, 14);

  // Slanted Race Stripes on Left & Right
  ctx.fillStyle = 'rgba(255, 255, 255, 0.4)';
  [-40, -15, 10].forEach((ox) => {
    ctx.beginPath();
    ctx.moveTo(140 + ox, 30);
    ctx.lineTo(165 + ox, 30);
    ctx.lineTo(135 + ox, 95);
    ctx.lineTo(110 + ox, 95);
    ctx.fill();

    ctx.beginPath();
    ctx.moveTo(canvas.width - 140 + ox, 30);
    ctx.lineTo(canvas.width - 115 + ox, 30);
    ctx.lineTo(canvas.width - 145 + ox, 95);
    ctx.lineTo(canvas.width - 170 + ox, 95);
    ctx.fill();
  });

  // Text: "🏁 Robo Race Arena"
  ctx.fillStyle = '#FFFFFF';
  ctx.font = 'bold 44px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto';
  ctx.textAlign = 'center';
  ctx.fillText('🏁  Robo Race Arena', canvas.width / 2, 75);

  const texture = new THREE.CanvasTexture(canvas);
  textureCache.set(key, texture);
  return texture;
}

export function getLineFollowerSkirtTexture() {
  const key = 'gamma-line-skirt';
  if (textureCache.has(key)) return textureCache.get(key);

  const canvas = document.createElement('canvas');
  canvas.width = 1024;
  canvas.height = 128;
  const ctx = canvas.getContext('2d');

  ctx.fillStyle = '#071B3A';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Glowing Cyan Bottom Strip
  ctx.fillStyle = '#00D2FF';
  ctx.fillRect(0, canvas.height - 14, canvas.width, 14);

  // Text: "∿ Line Follower Arena"
  ctx.fillStyle = '#FFFFFF';
  ctx.font = 'bold 44px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto';
  ctx.textAlign = 'center';
  ctx.fillText('∿  Line Follower Arena', canvas.width / 2, 75);

  const texture = new THREE.CanvasTexture(canvas);
  textureCache.set(key, texture);
  return texture;
}

/**
 * 6. START / FINISH Gantry Overhead Banner Texture
 */
export function getStartFinishBannerTexture() {
  const key = 'gamma-start-finish-banner';
  if (textureCache.has(key)) return textureCache.get(key);

  const canvas = document.createElement('canvas');
  canvas.width = 1024;
  canvas.height = 180;
  const ctx = canvas.getContext('2d');

  ctx.fillStyle = '#0F172A';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Chequered Flag Left & Right Blocks
  const ts = 25;
  for (let r = 0; r < Math.floor(canvas.height / ts); r++) {
    for (let c = 0; c < 7; c++) {
      ctx.fillStyle = (r + c) % 2 === 0 ? '#FFFFFF' : '#000000';
      ctx.fillRect(c * ts, r * ts, ts, ts);
      ctx.fillRect(canvas.width - (c + 1) * ts, r * ts, ts, ts);
    }
  }

  // Central Text
  ctx.fillStyle = '#FFFFFF';
  ctx.font = 'bold 52px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto';
  ctx.textAlign = 'center';
  ctx.fillText('START / FINISH', canvas.width / 2, 110);

  const texture = new THREE.CanvasTexture(canvas);
  textureCache.set(key, texture);
  return texture;
}

/**
 * 7. Neon A5X Sign Texture for Right Glass Wall
 */
export function getA5XNeonSignTexture() {
  const key = 'gamma-a5x-neon-sign';
  if (textureCache.has(key)) return textureCache.get(key);

  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 256;
  const ctx = canvas.getContext('2d');

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Blue Neon Glow
  ctx.shadowColor = '#00D2FF';
  ctx.shadowBlur = 24;
  ctx.fillStyle = '#FFFFFF';
  ctx.font = '900 120px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto';
  ctx.textAlign = 'center';
  ctx.fillText('A5X', canvas.width / 2, 170);

  const texture = new THREE.CanvasTexture(canvas);
  textureCache.set(key, texture);
  return texture;
}


export function getGammaTeachingHeaderTexture() {
  const key = 'gamma-teaching-header-rev14';
  if (textureCache.has(key)) return textureCache.get(key);

  const canvas = document.createElement('canvas');
  canvas.width = 2400;
  canvas.height = 420;
  const ctx = canvas.getContext('2d');

  // Center the layout around X = 1200
  // Left: "A5X" logo (bold stylized white) + "INDUSTRIES"
  ctx.fillStyle = '#FFFFFF';
  ctx.font = '900 110px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto';
  ctx.textAlign = 'right';
  ctx.fillText('A5X', 1060, 185);

  ctx.font = '600 48px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto';
  ctx.fillText('INDUSTRIES', 1060, 250);

  // Thin white vertical divider bar
  ctx.strokeStyle = 'rgba(255, 255, 255, 0.7)';
  ctx.lineWidth = 4;
  ctx.beginPath();
  ctx.moveTo(1120, 80);
  ctx.lineTo(1120, 275);
  ctx.stroke();

  // Right: "LAB GAMMA" in electric blue #1677FF (bold, large)
  ctx.textAlign = 'left';
  ctx.fillStyle = '#1677FF';
  ctx.font = '900 115px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto';
  ctx.fillText('LAB GAMMA', 1180, 180);

  // Directly below it: "Advanced Innovation Lab" in crisp white
  ctx.fillStyle = '#FFFFFF';
  ctx.font = '600 48px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto';
  ctx.fillText('Advanced Innovation Lab', 1185, 250);

  const texture = new THREE.CanvasTexture(canvas);
  texture.minFilter = THREE.LinearFilter;
  texture.magFilter = THREE.LinearFilter;
  textureCache.set(key, texture);
  return texture;
}

export function getGammaCredenzaLabelTexture() {
  const key = 'gamma-credenza-label';
  if (textureCache.has(key)) return textureCache.get(key);

  const canvas = document.createElement('canvas');
  canvas.width = 800;
  canvas.height = 80;
  const ctx = canvas.getContext('2d');

  ctx.fillStyle = '#93C5FD';
  ctx.font = '600 30px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto';
  ctx.textAlign = 'center';
  ctx.fillText('TEACHING & LEARNING ZONE', 400, 50);

  const texture = new THREE.CanvasTexture(canvas);
  textureCache.set(key, texture);
  return texture;
}

/**
 * =========================================================================
 * REVISION 17: ROBOTICS ARENA BAY DEDICATED HIGH-RES TEXTURES
 * =========================================================================
 */

/**
 * 1. Back Wall Hexagonal Blue LED Frame Banner (2048 x 768)
 * Features robot icon, "Robotics Arena", and 4 line-style icon columns:
 * 1. Robo Race (chequered flag) | 2. Robo Soccer (ball) | 3. Line Follower (squiggle) | 4. Obstacle Challenge (cube)
 */

/**
 * =========================================================================
 * REVISION 17: ROBOTICS ARENA BAY DEDICATED HIGH-RES TEXTURES
 * =========================================================================
 */

/**
 * 1. Back Wall Hexagonal Blue LED Frame Banner (2048 x 768)
 * Features robot icon, "Robotics Arena", and 4 line-style icon columns:
 * 1. Robo Race (chequered flag) | 2. Robo Soccer (ball) | 3. Line Follower (squiggle) | 4. Obstacle Challenge (cube)
 */
export function getRoboticsHexBannerTexture() {
  const key = 'gamma-robotics-hex-banner';
  if (textureCache.has(key)) return textureCache.get(key);

  const canvas = document.createElement('canvas');
  canvas.width = 2048;
  canvas.height = 768;
  const ctx = canvas.getContext('2d');

  // Deep Navy Background
  ctx.fillStyle = '#071B3A';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Outer Electric Blue Border
  ctx.strokeStyle = '#1677FF';
  ctx.lineWidth = 14;
  ctx.strokeRect(20, 20, canvas.width - 40, canvas.height - 40);

  // Top Section: Robot Icon + "Robotics Arena"
  ctx.save();
  // Robot head icon (line style, white & cyan)
  const rx = 820;
  const ry = 140;
  ctx.strokeStyle = '#38BDF8';
  ctx.lineWidth = 8;
  ctx.beginPath();
  ctx.roundRect(rx, ry - 50, 90, 75, 16);
  ctx.stroke();
  // Antennae
  ctx.beginPath();
  ctx.moveTo(rx + 45, ry - 50); ctx.lineTo(rx + 45, ry - 75);
  ctx.stroke();
  ctx.fillStyle = '#38BDF8';
  ctx.beginPath(); ctx.arc(rx + 45, ry - 78, 8, 0, Math.PI * 2); ctx.fill();
  // Eyes & smile
  ctx.beginPath(); ctx.arc(rx + 28, ry - 18, 7, 0, Math.PI * 2); ctx.fill();
  ctx.beginPath(); ctx.arc(rx + 62, ry - 18, 7, 0, Math.PI * 2); ctx.fill();
  ctx.beginPath(); ctx.arc(rx + 45, ry - 5, 18, 0.2 * Math.PI, 0.8 * Math.PI); ctx.stroke();
  ctx.restore();

  // Header Title
  ctx.fillStyle = '#FFFFFF';
  ctx.font = 'bold 76px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto';
  ctx.textAlign = 'left';
  ctx.fillText('Robotics Arena', 950, 162);

  // Horizontal divider under header
  ctx.strokeStyle = 'rgba(255, 255, 255, 0.2)';
  ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.moveTo(100, 220);
  ctx.lineTo(canvas.width - 100, 220);
  ctx.stroke();

  // 4 Icon Columns (Width ~440px each, centers: 290, 770, 1270, 1750)
  const colCenters = [290, 770, 1270, 1750];
  const colTitles = ['Robo Race', 'Robo Soccer', 'Line Follower', 'Obstacle Challenge'];

  // Vertical dividers between columns
  ctx.strokeStyle = 'rgba(255, 255, 255, 0.15)';
  ctx.lineWidth = 2;
  [530, 1020, 1510].forEach((vx) => {
    ctx.beginPath();
    ctx.moveTo(vx, 250);
    ctx.lineTo(vx, canvas.height - 80);
    ctx.stroke();
  });

  // Render each column's line-style icon and title
  colCenters.forEach((cx, idx) => {
    const cy = 420;
    ctx.save();
    ctx.strokeStyle = '#FFFFFF';
    ctx.fillStyle = '#FFFFFF';
    ctx.lineWidth = 7;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';

    if (idx === 0) {
      // 1. Robo Race: Chequered Flag line art
      ctx.beginPath();
      ctx.moveTo(cx - 45, cy + 60); ctx.lineTo(cx - 45, cy - 65);
      ctx.stroke();
      ctx.strokeRect(cx - 45, cy - 65, 95, 65);
      // Chequered tiles
      for (let r = 0; r < 3; r++) {
        for (let c = 0; c < 3; c++) {
          if ((r + c) % 2 === 0) {
            ctx.fillRect(cx - 45 + c * 31.6, cy - 65 + r * 21.6, 31.6, 21.6);
          }
        }
      }
    } else if (idx === 1) {
      // 2. Robo Soccer: Ball with hexagon pattern
      ctx.beginPath();
      ctx.arc(cx, cy, 55, 0, Math.PI * 2);
      ctx.stroke();
      // Center pentagon
      ctx.beginPath();
      for (let a = 0; a < 5; a++) {
        const ang = (a * 2 * Math.PI) / 5 - Math.PI / 2;
        const px = cx + Math.cos(ang) * 22;
        const py = cy + Math.sin(ang) * 22;
        if (a === 0) ctx.moveTo(px, py); else ctx.lineTo(px, py);
      }
      ctx.closePath();
      ctx.fill();
    } else if (idx === 2) {
      // 3. Line Follower: Smooth serpentine / S-curve line
      ctx.beginPath();
      ctx.moveTo(cx - 50, cy + 50);
      ctx.bezierCurveTo(cx - 50, cy, cx, cy, cx, cy - 10);
      ctx.bezierCurveTo(cx, cy - 30, cx + 50, cy - 30, cx + 50, cy - 60);
      ctx.lineWidth = 12;
      ctx.stroke();
    } else {
      // 4. Obstacle Challenge: 3D Wireframe Cube
      const s = 45;
      const off = 22;
      ctx.strokeRect(cx - s - off / 2, cy - s + off / 2, s * 2, s * 2);
      ctx.strokeRect(cx - s + off / 2, cy - s - off / 2, s * 2, s * 2);
      ctx.beginPath();
      ctx.moveTo(cx - s - off / 2, cy - s + off / 2); ctx.lineTo(cx - s + off / 2, cy - s - off / 2);
      ctx.moveTo(cx + s - off / 2, cy - s + off / 2); ctx.lineTo(cx + s + off / 2, cy - s - off / 2);
      ctx.moveTo(cx - s - off / 2, cy + s + off / 2); ctx.lineTo(cx - s + off / 2, cy + s - off / 2);
      ctx.moveTo(cx + s - off / 2, cy + s + off / 2); ctx.lineTo(cx + s + off / 2, cy + s - off / 2);
      ctx.stroke();
    }
    ctx.restore();

    // Column Title
    ctx.fillStyle = '#FFFFFF';
    ctx.font = 'bold 36px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto';
    ctx.textAlign = 'center';
    ctx.fillText(colTitles[idx], cx, cy + 150);
  });

  const texture = new THREE.CanvasTexture(canvas);
  texture.anisotropy = 8;
  textureCache.set(key, texture);
  return texture;
}

/**
 * 2. Robo Soccer Pitch Turf Texture (2048 x 1024)
 * Green synthetic grass with white regulation pitch lines, center circle, penalty boxes
 */
export function getSoccerPitchTexture() {
  const key = 'gamma-soccer-pitch-turf';
  if (textureCache.has(key)) return textureCache.get(key);

  const canvas = document.createElement('canvas');
  canvas.width = 2048;
  canvas.height = 1024;
  const ctx = canvas.getContext('2d');

  // Alternating lawn stripes (green turf)
  const stripeW = 128;
  for (let x = 0; x < canvas.width; x += stripeW) {
    ctx.fillStyle = (x / stripeW) % 2 === 0 ? '#15803D' : '#16A34A';
    ctx.fillRect(x, 0, stripeW, canvas.height);
  }

  // Turf fine grain
  ctx.fillStyle = 'rgba(255, 255, 255, 0.03)';
  for (let i = 0; i < 25000; i++) {
    const rx = Math.random() * canvas.width;
    const ry = Math.random() * canvas.height;
    ctx.fillRect(rx, ry, 2, 2);
  }

  // Regulation White Pitch Markings
  ctx.strokeStyle = '#FFFFFF';
  ctx.lineWidth = 14;

  // Outer Touchlines (Padding 60px)
  const padX = 70;
  const padY = 60;
  const pw = canvas.width - padX * 2;
  const ph = canvas.height - padY * 2;
  ctx.strokeRect(padX, padY, pw, ph);

  // Halfway Line
  const midX = canvas.width / 2;
  ctx.beginPath();
  ctx.moveTo(midX, padY);
  ctx.lineTo(midX, canvas.height - padY);
  ctx.stroke();

  // Center Circle (Radius 160px) & Center Spot
  ctx.beginPath();
  ctx.arc(midX, canvas.height / 2, 160, 0, Math.PI * 2);
  ctx.stroke();
  ctx.fillStyle = '#FFFFFF';
  ctx.beginPath();
  ctx.arc(midX, canvas.height / 2, 12, 0, Math.PI * 2);
  ctx.fill();

  // Left Penalty Box (18-yard box: 340 x 480)
  const pBoxW = 340;
  const pBoxH = 480;
  const pBoxY = (canvas.height - pBoxH) / 2;
  ctx.strokeRect(padX, pBoxY, pBoxW, pBoxH);

  // Left Goal Box (6-yard box: 140 x 260)
  const gBoxW = 140;
  const gBoxH = 260;
  const gBoxY = (canvas.height - gBoxH) / 2;
  ctx.strokeRect(padX, gBoxY, gBoxW, gBoxH);

  // Left Penalty Spot & Arc
  ctx.beginPath(); ctx.arc(padX + 240, canvas.height / 2, 10, 0, Math.PI * 2); ctx.fill();
  ctx.beginPath();
  ctx.arc(padX + 240, canvas.height / 2, 120, -0.28 * Math.PI, 0.28 * Math.PI);
  ctx.stroke();

  // Right Penalty Box
  ctx.strokeRect(canvas.width - padX - pBoxW, pBoxY, pBoxW, pBoxH);

  // Right Goal Box
  ctx.strokeRect(canvas.width - padX - gBoxW, gBoxY, gBoxW, gBoxH);

  // Right Penalty Spot & Arc
  ctx.beginPath(); ctx.arc(canvas.width - padX - 240, canvas.height / 2, 10, 0, Math.PI * 2); ctx.fill();
  ctx.beginPath();
  ctx.arc(canvas.width - padX - 240, canvas.height / 2, 120, 0.72 * Math.PI, 1.28 * Math.PI);
  ctx.stroke();

  // Corner Arcs
  const cr = 45;
  ctx.beginPath(); ctx.arc(padX, padY, cr, 0, Math.PI / 2); ctx.stroke();
  ctx.beginPath(); ctx.arc(padX, canvas.height - padY, cr, -Math.PI / 2, 0); ctx.stroke();
  ctx.beginPath(); ctx.arc(canvas.width - padX, padY, cr, Math.PI / 2, Math.PI); ctx.stroke();
  ctx.beginPath(); ctx.arc(canvas.width - padX, canvas.height - padY, cr, Math.PI, 1.5 * Math.PI); ctx.stroke();

  const texture = new THREE.CanvasTexture(canvas);
  texture.anisotropy = 8;
  textureCache.set(key, texture);
  return texture;
}

/**
 * 3. Robo Race Track Surface Texture (2048 x 2048)
 * Dark asphalt track with red/white kerbs, green grass infield patches, white lane lines
 */
export function getRoboRaceTrackTexture() {
  const key = 'gamma-robo-race-track';
  if (textureCache.has(key)) return textureCache.get(key);

  const canvas = document.createElement('canvas');
  canvas.width = 2048;
  canvas.height = 2048;
  const ctx = canvas.getContext('2d');

  // Dark Asphalt Background
  ctx.fillStyle = '#1A1E24';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Asphalt grain noise
  ctx.fillStyle = 'rgba(255, 255, 255, 0.02)';
  for (let i = 0; i < 30000; i++) {
    const rx = Math.random() * canvas.width;
    const ry = Math.random() * canvas.height;
    ctx.fillRect(rx, ry, 2, 2);
  }

  // Green Infield Grass Islands
  ctx.fillStyle = '#15803D';
  // Central Island
  ctx.beginPath();
  ctx.roundRect(700, 700, 648, 648, 120);
  ctx.fill();
  ctx.strokeStyle = '#16A34A';
  ctx.lineWidth = 14;
  ctx.stroke();

  // Corner Grass Insets
  ctx.beginPath();
  ctx.arc(350, 350, 160, 0, Math.PI * 2); ctx.fill();
  ctx.beginPath();
  ctx.arc(1698, 350, 160, 0, Math.PI * 2); ctx.fill();
  ctx.beginPath();
  ctx.arc(350, 1698, 160, 0, Math.PI * 2); ctx.fill();
  ctx.beginPath();
  ctx.arc(1698, 1698, 160, 0, Math.PI * 2); ctx.fill();

  // White Outer & Inner Track Boundaries
  ctx.strokeStyle = '#FFFFFF';
  ctx.lineWidth = 16;
  ctx.beginPath();
  ctx.roundRect(240, 240, 1568, 1568, 180);
  ctx.stroke();

  ctx.beginPath();
  ctx.roundRect(620, 620, 808, 808, 140);
  ctx.stroke();

  // Dashed Centerline
  ctx.setLineDash([48, 48]);
  ctx.strokeStyle = '#FFFFFF';
  ctx.lineWidth = 10;
  ctx.beginPath();
  ctx.roundRect(430, 430, 1188, 1188, 160);
  ctx.stroke();
  ctx.setLineDash([]); // Reset

  // Red & White Kerbs at Corners
  const drawKerb = (cx, cy, r, startAng, endAng) => {
    const segments = 10;
    const step = (endAng - startAng) / segments;
    for (let s = 0; s < segments; s++) {
      ctx.strokeStyle = s % 2 === 0 ? '#EF4444' : '#FFFFFF';
      ctx.lineWidth = 28;
      ctx.beginPath();
      ctx.arc(cx, cy, r, startAng + s * step, startAng + (s + 1) * step);
      ctx.stroke();
    }
  };

  drawKerb(420, 420, 200, Math.PI, 1.5 * Math.PI);
  drawKerb(1628, 420, 200, 1.5 * Math.PI, 2 * Math.PI);
  drawKerb(1628, 1628, 200, 0, 0.5 * Math.PI);
  drawKerb(420, 1628, 200, 0.5 * Math.PI, Math.PI);

  // START / FINISH Chequered Line
  const sfX = 850;
  const sfY = 1430;
  const tileSize = 38;
  for (let r = 0; r < 4; r++) {
    for (let c = 0; c < 9; c++) {
      ctx.fillStyle = (r + c) % 2 === 0 ? '#FFFFFF' : '#000000';
      ctx.fillRect(sfX + c * tileSize, sfY + r * tileSize, tileSize, tileSize);
    }
  }

  // Yellow & Black Hazard Rim Trim
  const hzSize = 32;
  for (let i = 0; i < canvas.width; i += hzSize * 2) {
    ctx.fillStyle = '#FACC15';
    ctx.fillRect(i, 0, hzSize, 28);
    ctx.fillRect(i, canvas.height - 28, hzSize, 28);
    ctx.fillStyle = '#0F172A';
    ctx.fillRect(i + hzSize, 0, hzSize, 28);
    ctx.fillRect(i + hzSize, canvas.height - 28, hzSize, 28);
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.anisotropy = 8;
  textureCache.set(key, texture);
  return texture;
}

/**
 * 4. Line Follower Arena Track Texture (2048 x 2048)
 * Clean white melamine board with winding continuous black tracking line and hazard border
 */
export function getLineFollowerTrackTexture() {
  const key = 'gamma-line-follower-track';
  if (textureCache.has(key)) return textureCache.get(key);

  const canvas = document.createElement('canvas');
  canvas.width = 2048;
  canvas.height = 2048;
  const ctx = canvas.getContext('2d');

  // Clean White Surface
  ctx.fillStyle = '#F8FAFC';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Perimeter Hazard Stripe Border (Yellow & Black)
  const bW = 32;
  for (let x = 0; x < canvas.width; x += bW * 2) {
    ctx.fillStyle = '#FACC15';
    ctx.fillRect(x, 0, bW, 36);
    ctx.fillRect(x, canvas.height - 36, bW, 36);
    ctx.fillStyle = '#0F172A';
    ctx.fillRect(x + bW, 0, bW, 36);
    ctx.fillRect(x + bW, canvas.height - 36, bW, 36);
  }
  for (let y = 0; y < canvas.height; y += bW * 2) {
    ctx.fillStyle = '#FACC15';
    ctx.fillRect(0, y, 36, bW);
    ctx.fillRect(canvas.width - 36, y, 36, bW);
    ctx.fillStyle = '#0F172A';
    ctx.fillRect(0, y + bW, 36, bW);
    ctx.fillRect(canvas.width - 36, y + bW, 36, bW);
  }

  // Obstacle Landing Pads (two dark grey rectangular areas)
  ctx.fillStyle = '#1E293B';
  ctx.fillRect(320, 840, 360, 200);
  ctx.fillRect(1368, 520, 360, 200);

  // Smooth Continuous Serpentine Black Line (32px wide)
  ctx.strokeStyle = '#0F172A';
  ctx.lineWidth = 36;
  ctx.lineCap = 'round';
  ctx.lineJoin = 'round';

  ctx.beginPath();
  // Winding serpentine loop across the board matching the reference render:
  ctx.moveTo(340, 340);
  ctx.bezierCurveTo(900, 340, 1100, 480, 1100, 720);
  ctx.bezierCurveTo(1100, 960, 600, 960, 600, 1200);
  ctx.bezierCurveTo(600, 1440, 1200, 1440, 1200, 1680);
  ctx.bezierCurveTo(1200, 1850, 850, 1850, 500, 1720);
  ctx.bezierCurveTo(240, 1600, 240, 1280, 450, 1100);
  ctx.bezierCurveTo(700, 900, 1550, 1100, 1700, 1350);
  ctx.bezierCurveTo(1850, 1600, 1850, 850, 1550, 650);
  ctx.bezierCurveTo(1300, 480, 600, 480, 340, 340);
  ctx.stroke();

  // Calibration markers
  ctx.fillStyle = '#1677FF';
  ctx.beginPath(); ctx.arc(340, 340, 24, 0, Math.PI * 2); ctx.fill();
  ctx.fillStyle = '#FFFFFF';
  ctx.font = 'bold 22px monospace';
  ctx.textAlign = 'center';
  ctx.fillText('START', 340, 395);

  const texture = new THREE.CanvasTexture(canvas);
  texture.anisotropy = 8;
  textureCache.set(key, texture);
  return texture;
}

/**
 * 5. Platform Skirt Textures with Glowing Cyan Bottom Bar
 */
export function getRoboSoccerSkirtTexture() {
  const key = 'gamma-soccer-skirt';
  if (textureCache.has(key)) return textureCache.get(key);

  const canvas = document.createElement('canvas');
  canvas.width = 1024;
  canvas.height = 128;
  const ctx = canvas.getContext('2d');

  ctx.fillStyle = '#071B3A';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Glowing Cyan Bottom Strip
  ctx.fillStyle = '#00D2FF';
  ctx.fillRect(0, canvas.height - 14, canvas.width, 14);

  // Text: "⚽ Robo Soccer Arena"
  ctx.fillStyle = '#FFFFFF';
  ctx.font = 'bold 44px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto';
  ctx.textAlign = 'center';
  ctx.fillText('⚽  Robo Soccer Arena', canvas.width / 2, 75);

  const texture = new THREE.CanvasTexture(canvas);
  textureCache.set(key, texture);
  return texture;
}

export function getRoboRaceSkirtTexture() {
  const key = 'gamma-race-skirt';
  if (textureCache.has(key)) return textureCache.get(key);

  const canvas = document.createElement('canvas');
  canvas.width = 1024;
  canvas.height = 128;
  const ctx = canvas.getContext('2d');

  ctx.fillStyle = '#071B3A';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Glowing Cyan Bottom Strip
  ctx.fillStyle = '#00D2FF';
  ctx.fillRect(0, canvas.height - 14, canvas.width, 14);

  // Slanted Race Stripes on Left & Right
  ctx.fillStyle = 'rgba(255, 255, 255, 0.4)';
  [-40, -15, 10].forEach((ox) => {
    ctx.beginPath();
    ctx.moveTo(140 + ox, 30);
    ctx.lineTo(165 + ox, 30);
    ctx.lineTo(135 + ox, 95);
    ctx.lineTo(110 + ox, 95);
    ctx.fill();

    ctx.beginPath();
    ctx.moveTo(canvas.width - 140 + ox, 30);
    ctx.lineTo(canvas.width - 115 + ox, 30);
    ctx.lineTo(canvas.width - 145 + ox, 95);
    ctx.lineTo(canvas.width - 170 + ox, 95);
    ctx.fill();
  });

  // Text: "🏁 Robo Race Arena"
  ctx.fillStyle = '#FFFFFF';
  ctx.font = 'bold 44px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto';
  ctx.textAlign = 'center';
  ctx.fillText('🏁  Robo Race Arena', canvas.width / 2, 75);

  const texture = new THREE.CanvasTexture(canvas);
  textureCache.set(key, texture);
  return texture;
}

export function getLineFollowerSkirtTexture() {
  const key = 'gamma-line-skirt';
  if (textureCache.has(key)) return textureCache.get(key);

  const canvas = document.createElement('canvas');
  canvas.width = 1024;
  canvas.height = 128;
  const ctx = canvas.getContext('2d');

  ctx.fillStyle = '#071B3A';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Glowing Cyan Bottom Strip
  ctx.fillStyle = '#00D2FF';
  ctx.fillRect(0, canvas.height - 14, canvas.width, 14);

  // Text: "∿ Line Follower Arena"
  ctx.fillStyle = '#FFFFFF';
  ctx.font = 'bold 44px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto';
  ctx.textAlign = 'center';
  ctx.fillText('∿  Line Follower Arena', canvas.width / 2, 75);

  const texture = new THREE.CanvasTexture(canvas);
  textureCache.set(key, texture);
  return texture;
}

/**
 * 6. START / FINISH Gantry Overhead Banner Texture
 */
export function getStartFinishBannerTexture() {
  const key = 'gamma-start-finish-banner';
  if (textureCache.has(key)) return textureCache.get(key);

  const canvas = document.createElement('canvas');
  canvas.width = 1024;
  canvas.height = 180;
  const ctx = canvas.getContext('2d');

  ctx.fillStyle = '#0F172A';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Chequered Flag Left & Right Blocks
  const ts = 25;
  for (let r = 0; r < Math.floor(canvas.height / ts); r++) {
    for (let c = 0; c < 7; c++) {
      ctx.fillStyle = (r + c) % 2 === 0 ? '#FFFFFF' : '#000000';
      ctx.fillRect(c * ts, r * ts, ts, ts);
      ctx.fillRect(canvas.width - (c + 1) * ts, r * ts, ts, ts);
    }
  }

  // Central Text
  ctx.fillStyle = '#FFFFFF';
  ctx.font = 'bold 52px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto';
  ctx.textAlign = 'center';
  ctx.fillText('START / FINISH', canvas.width / 2, 110);

  const texture = new THREE.CanvasTexture(canvas);
  textureCache.set(key, texture);
  return texture;
}

/**
 * 7. Neon A5X Sign Texture for Right Glass Wall
 */
export function getA5XNeonSignTexture() {
  const key = 'gamma-a5x-neon-sign';
  if (textureCache.has(key)) return textureCache.get(key);

  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 256;
  const ctx = canvas.getContext('2d');

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Blue Neon Glow
  ctx.shadowColor = '#00D2FF';
  ctx.shadowBlur = 24;
  ctx.fillStyle = '#FFFFFF';
  ctx.font = '900 120px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto';
  ctx.textAlign = 'center';
  ctx.fillText('A5X', canvas.width / 2, 170);

  const texture = new THREE.CanvasTexture(canvas);
  textureCache.set(key, texture);
  return texture;
}


export function getGammaVerticalFlutingTexture() {
  const key = 'gamma-vertical-fluting';
  if (textureCache.has(key)) return textureCache.get(key);

  const canvas = document.createElement('canvas');
  canvas.width = 256;
  canvas.height = 256;
  const ctx = canvas.getContext('2d');

  ctx.fillStyle = '#0B2A5B';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Subtle vertical slats
  for (let x = 0; x < canvas.width; x += 16) {
    ctx.fillStyle = '#081F42';
    ctx.fillRect(x, 0, 8, canvas.height);
    ctx.fillStyle = '#0D326D';
    ctx.fillRect(x + 8, 0, 8, canvas.height);
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  texture.repeat.set(16, 1);
  textureCache.set(key, texture);
  return texture;
}

export function getGammaWhiteboardTexture() {
  const key = 'gamma-whiteboard';
  if (textureCache.has(key)) return textureCache.get(key);

  const canvas = document.createElement('canvas');
  canvas.width = 1400;
  canvas.height = 900;
  const ctx = canvas.getContext('2d');

  // Porcelain White surface
  ctx.fillStyle = '#F8FAFC';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Technical Hand-drawn diagrams
  ctx.lineCap = 'round';
  ctx.lineJoin = 'round';

  // 1. Robot Chassis Sketch (Left side)
  ctx.strokeStyle = '#0284C7';
  ctx.lineWidth = 4;
  ctx.strokeRect(100, 200, 320, 200);

  // Wheels
  ctx.fillStyle = '#0F172A';
  ctx.fillRect(70, 210, 25, 70);
  ctx.fillRect(70, 310, 25, 70);
  ctx.fillRect(425, 210, 25, 70);
  ctx.fillRect(425, 310, 25, 70);

  // LiDAR Dome
  ctx.beginPath();
  ctx.arc(260, 300, 45, 0, Math.PI * 2);
  ctx.fillStyle = '#EF4444';
  ctx.fill();
  ctx.stroke();

  ctx.fillStyle = '#0F172A';
  ctx.font = 'bold 22px monospace';
  ctx.fillText('4WD Autonomous Rover [LiDAR SLAM]', 100, 160);

  // Formulas
  ctx.fillStyle = '#1E293B';
  ctx.font = 'italic 20px serif';
  ctx.fillText('v = (v_r + v_l) / 2', 120, 460);
  ctx.fillText('ω = (v_r - v_l) / L', 120, 500);
  ctx.fillText('Δθ = ω · Δt', 120, 540);

  // 2. ROS 2 Node Architecture (Right side)
  ctx.strokeStyle = '#2563EB';
  ctx.lineWidth = 3;

  const nodes = [
    { x: 600, y: 180, text: '/scan (LiDAR)' },
    { x: 920, y: 180, text: '/cartographer_slam' },
    { x: 920, y: 350, text: '/nav2_planner' },
    { x: 600, y: 350, text: '/cmd_vel (Motors)' },
  ];

  nodes.forEach(n => {
    ctx.strokeRect(n.x, n.y, 220, 60);
    ctx.fillStyle = '#0F172A';
    ctx.font = 'bold 18px monospace';
    ctx.fillText(n.text, n.x + 15, n.y + 38);
  });

  // Arrows between nodes
  ctx.beginPath();
  ctx.moveTo(820, 210); ctx.lineTo(920, 210);
  ctx.moveTo(1030, 240); ctx.lineTo(1030, 350);
  ctx.moveTo(920, 380); ctx.lineTo(820, 380);
  ctx.stroke();

  // 3. Circuit Schematics (Bottom)
  ctx.strokeStyle = '#DC2626';
  ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.moveTo(600, 560); ctx.lineTo(700, 560);
  ctx.lineTo(720, 540); ctx.lineTo(740, 580); ctx.lineTo(760, 540); ctx.lineTo(780, 580); ctx.lineTo(800, 560);
  ctx.lineTo(950, 560);
  ctx.stroke();

  ctx.fillStyle = '#DC2626';
  ctx.font = 'bold 18px monospace';
  ctx.fillText('H-Bridge PWM Motor Driver (12V / 5A)', 600, 520);
  ctx.fillText('ESP32 SPI Bus <-> Jetson Orin', 600, 650);

  const texture = new THREE.CanvasTexture(canvas);
  textureCache.set(key, texture);
  return texture;
}

/**
 * =========================================================================
 * REVISION 17: ROBOTICS ARENA BAY DEDICATED HIGH-RES TEXTURES
 * =========================================================================
 */

/**
 * 1. Back Wall Hexagonal Blue LED Frame Banner (2048 x 768)
 * Features robot icon, "Robotics Arena", and 4 line-style icon columns:
 * 1. Robo Race (chequered flag) | 2. Robo Soccer (ball) | 3. Line Follower (squiggle) | 4. Obstacle Challenge (cube)
 */

/**
 * =========================================================================
 * REVISION 17: ROBOTICS ARENA BAY DEDICATED HIGH-RES TEXTURES
 * =========================================================================
 */

/**
 * 1. Back Wall Hexagonal Blue LED Frame Banner (2048 x 768)
 * Features robot icon, "Robotics Arena", and 4 line-style icon columns:
 * 1. Robo Race (chequered flag) | 2. Robo Soccer (ball) | 3. Line Follower (squiggle) | 4. Obstacle Challenge (cube)
 */
export function getRoboticsHexBannerTexture() {
  const key = 'gamma-robotics-hex-banner';
  if (textureCache.has(key)) return textureCache.get(key);

  const canvas = document.createElement('canvas');
  canvas.width = 2048;
  canvas.height = 768;
  const ctx = canvas.getContext('2d');

  // Deep Navy Background
  ctx.fillStyle = '#071B3A';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Outer Electric Blue Border
  ctx.strokeStyle = '#1677FF';
  ctx.lineWidth = 14;
  ctx.strokeRect(20, 20, canvas.width - 40, canvas.height - 40);

  // Top Section: Robot Icon + "Robotics Arena"
  ctx.save();
  // Robot head icon (line style, white & cyan)
  const rx = 820;
  const ry = 140;
  ctx.strokeStyle = '#38BDF8';
  ctx.lineWidth = 8;
  ctx.beginPath();
  ctx.roundRect(rx, ry - 50, 90, 75, 16);
  ctx.stroke();
  // Antennae
  ctx.beginPath();
  ctx.moveTo(rx + 45, ry - 50); ctx.lineTo(rx + 45, ry - 75);
  ctx.stroke();
  ctx.fillStyle = '#38BDF8';
  ctx.beginPath(); ctx.arc(rx + 45, ry - 78, 8, 0, Math.PI * 2); ctx.fill();
  // Eyes & smile
  ctx.beginPath(); ctx.arc(rx + 28, ry - 18, 7, 0, Math.PI * 2); ctx.fill();
  ctx.beginPath(); ctx.arc(rx + 62, ry - 18, 7, 0, Math.PI * 2); ctx.fill();
  ctx.beginPath(); ctx.arc(rx + 45, ry - 5, 18, 0.2 * Math.PI, 0.8 * Math.PI); ctx.stroke();
  ctx.restore();

  // Header Title
  ctx.fillStyle = '#FFFFFF';
  ctx.font = 'bold 76px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto';
  ctx.textAlign = 'left';
  ctx.fillText('Robotics Arena', 950, 162);

  // Horizontal divider under header
  ctx.strokeStyle = 'rgba(255, 255, 255, 0.2)';
  ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.moveTo(100, 220);
  ctx.lineTo(canvas.width - 100, 220);
  ctx.stroke();

  // 4 Icon Columns (Width ~440px each, centers: 290, 770, 1270, 1750)
  const colCenters = [290, 770, 1270, 1750];
  const colTitles = ['Robo Race', 'Robo Soccer', 'Line Follower', 'Obstacle Challenge'];

  // Vertical dividers between columns
  ctx.strokeStyle = 'rgba(255, 255, 255, 0.15)';
  ctx.lineWidth = 2;
  [530, 1020, 1510].forEach((vx) => {
    ctx.beginPath();
    ctx.moveTo(vx, 250);
    ctx.lineTo(vx, canvas.height - 80);
    ctx.stroke();
  });

  // Render each column's line-style icon and title
  colCenters.forEach((cx, idx) => {
    const cy = 420;
    ctx.save();
    ctx.strokeStyle = '#FFFFFF';
    ctx.fillStyle = '#FFFFFF';
    ctx.lineWidth = 7;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';

    if (idx === 0) {
      // 1. Robo Race: Chequered Flag line art
      ctx.beginPath();
      ctx.moveTo(cx - 45, cy + 60); ctx.lineTo(cx - 45, cy - 65);
      ctx.stroke();
      ctx.strokeRect(cx - 45, cy - 65, 95, 65);
      // Chequered tiles
      for (let r = 0; r < 3; r++) {
        for (let c = 0; c < 3; c++) {
          if ((r + c) % 2 === 0) {
            ctx.fillRect(cx - 45 + c * 31.6, cy - 65 + r * 21.6, 31.6, 21.6);
          }
        }
      }
    } else if (idx === 1) {
      // 2. Robo Soccer: Ball with hexagon pattern
      ctx.beginPath();
      ctx.arc(cx, cy, 55, 0, Math.PI * 2);
      ctx.stroke();
      // Center pentagon
      ctx.beginPath();
      for (let a = 0; a < 5; a++) {
        const ang = (a * 2 * Math.PI) / 5 - Math.PI / 2;
        const px = cx + Math.cos(ang) * 22;
        const py = cy + Math.sin(ang) * 22;
        if (a === 0) ctx.moveTo(px, py); else ctx.lineTo(px, py);
      }
      ctx.closePath();
      ctx.fill();
    } else if (idx === 2) {
      // 3. Line Follower: Smooth serpentine / S-curve line
      ctx.beginPath();
      ctx.moveTo(cx - 50, cy + 50);
      ctx.bezierCurveTo(cx - 50, cy, cx, cy, cx, cy - 10);
      ctx.bezierCurveTo(cx, cy - 30, cx + 50, cy - 30, cx + 50, cy - 60);
      ctx.lineWidth = 12;
      ctx.stroke();
    } else {
      // 4. Obstacle Challenge: 3D Wireframe Cube
      const s = 45;
      const off = 22;
      ctx.strokeRect(cx - s - off / 2, cy - s + off / 2, s * 2, s * 2);
      ctx.strokeRect(cx - s + off / 2, cy - s - off / 2, s * 2, s * 2);
      ctx.beginPath();
      ctx.moveTo(cx - s - off / 2, cy - s + off / 2); ctx.lineTo(cx - s + off / 2, cy - s - off / 2);
      ctx.moveTo(cx + s - off / 2, cy - s + off / 2); ctx.lineTo(cx + s + off / 2, cy - s - off / 2);
      ctx.moveTo(cx - s - off / 2, cy + s + off / 2); ctx.lineTo(cx - s + off / 2, cy + s - off / 2);
      ctx.moveTo(cx + s - off / 2, cy + s + off / 2); ctx.lineTo(cx + s + off / 2, cy + s - off / 2);
      ctx.stroke();
    }
    ctx.restore();

    // Column Title
    ctx.fillStyle = '#FFFFFF';
    ctx.font = 'bold 36px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto';
    ctx.textAlign = 'center';
    ctx.fillText(colTitles[idx], cx, cy + 150);
  });

  const texture = new THREE.CanvasTexture(canvas);
  texture.anisotropy = 8;
  textureCache.set(key, texture);
  return texture;
}

/**
 * 2. Robo Soccer Pitch Turf Texture (2048 x 1024)
 * Green synthetic grass with white regulation pitch lines, center circle, penalty boxes
 */
export function getSoccerPitchTexture() {
  const key = 'gamma-soccer-pitch-turf';
  if (textureCache.has(key)) return textureCache.get(key);

  const canvas = document.createElement('canvas');
  canvas.width = 2048;
  canvas.height = 1024;
  const ctx = canvas.getContext('2d');

  // Alternating lawn stripes (green turf)
  const stripeW = 128;
  for (let x = 0; x < canvas.width; x += stripeW) {
    ctx.fillStyle = (x / stripeW) % 2 === 0 ? '#15803D' : '#16A34A';
    ctx.fillRect(x, 0, stripeW, canvas.height);
  }

  // Turf fine grain
  ctx.fillStyle = 'rgba(255, 255, 255, 0.03)';
  for (let i = 0; i < 25000; i++) {
    const rx = Math.random() * canvas.width;
    const ry = Math.random() * canvas.height;
    ctx.fillRect(rx, ry, 2, 2);
  }

  // Regulation White Pitch Markings
  ctx.strokeStyle = '#FFFFFF';
  ctx.lineWidth = 14;

  // Outer Touchlines (Padding 60px)
  const padX = 70;
  const padY = 60;
  const pw = canvas.width - padX * 2;
  const ph = canvas.height - padY * 2;
  ctx.strokeRect(padX, padY, pw, ph);

  // Halfway Line
  const midX = canvas.width / 2;
  ctx.beginPath();
  ctx.moveTo(midX, padY);
  ctx.lineTo(midX, canvas.height - padY);
  ctx.stroke();

  // Center Circle (Radius 160px) & Center Spot
  ctx.beginPath();
  ctx.arc(midX, canvas.height / 2, 160, 0, Math.PI * 2);
  ctx.stroke();
  ctx.fillStyle = '#FFFFFF';
  ctx.beginPath();
  ctx.arc(midX, canvas.height / 2, 12, 0, Math.PI * 2);
  ctx.fill();

  // Left Penalty Box (18-yard box: 340 x 480)
  const pBoxW = 340;
  const pBoxH = 480;
  const pBoxY = (canvas.height - pBoxH) / 2;
  ctx.strokeRect(padX, pBoxY, pBoxW, pBoxH);

  // Left Goal Box (6-yard box: 140 x 260)
  const gBoxW = 140;
  const gBoxH = 260;
  const gBoxY = (canvas.height - gBoxH) / 2;
  ctx.strokeRect(padX, gBoxY, gBoxW, gBoxH);

  // Left Penalty Spot & Arc
  ctx.beginPath(); ctx.arc(padX + 240, canvas.height / 2, 10, 0, Math.PI * 2); ctx.fill();
  ctx.beginPath();
  ctx.arc(padX + 240, canvas.height / 2, 120, -0.28 * Math.PI, 0.28 * Math.PI);
  ctx.stroke();

  // Right Penalty Box
  ctx.strokeRect(canvas.width - padX - pBoxW, pBoxY, pBoxW, pBoxH);

  // Right Goal Box
  ctx.strokeRect(canvas.width - padX - gBoxW, gBoxY, gBoxW, gBoxH);

  // Right Penalty Spot & Arc
  ctx.beginPath(); ctx.arc(canvas.width - padX - 240, canvas.height / 2, 10, 0, Math.PI * 2); ctx.fill();
  ctx.beginPath();
  ctx.arc(canvas.width - padX - 240, canvas.height / 2, 120, 0.72 * Math.PI, 1.28 * Math.PI);
  ctx.stroke();

  // Corner Arcs
  const cr = 45;
  ctx.beginPath(); ctx.arc(padX, padY, cr, 0, Math.PI / 2); ctx.stroke();
  ctx.beginPath(); ctx.arc(padX, canvas.height - padY, cr, -Math.PI / 2, 0); ctx.stroke();
  ctx.beginPath(); ctx.arc(canvas.width - padX, padY, cr, Math.PI / 2, Math.PI); ctx.stroke();
  ctx.beginPath(); ctx.arc(canvas.width - padX, canvas.height - padY, cr, Math.PI, 1.5 * Math.PI); ctx.stroke();

  const texture = new THREE.CanvasTexture(canvas);
  texture.anisotropy = 8;
  textureCache.set(key, texture);
  return texture;
}

/**
 * 3. Robo Race Track Surface Texture (2048 x 2048)
 * Dark asphalt track with red/white kerbs, green grass infield patches, white lane lines
 */
export function getRoboRaceTrackTexture() {
  const key = 'gamma-robo-race-track';
  if (textureCache.has(key)) return textureCache.get(key);

  const canvas = document.createElement('canvas');
  canvas.width = 2048;
  canvas.height = 2048;
  const ctx = canvas.getContext('2d');

  // Dark Asphalt Background
  ctx.fillStyle = '#1A1E24';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Asphalt grain noise
  ctx.fillStyle = 'rgba(255, 255, 255, 0.02)';
  for (let i = 0; i < 30000; i++) {
    const rx = Math.random() * canvas.width;
    const ry = Math.random() * canvas.height;
    ctx.fillRect(rx, ry, 2, 2);
  }

  // Green Infield Grass Islands
  ctx.fillStyle = '#15803D';
  // Central Island
  ctx.beginPath();
  ctx.roundRect(700, 700, 648, 648, 120);
  ctx.fill();
  ctx.strokeStyle = '#16A34A';
  ctx.lineWidth = 14;
  ctx.stroke();

  // Corner Grass Insets
  ctx.beginPath();
  ctx.arc(350, 350, 160, 0, Math.PI * 2); ctx.fill();
  ctx.beginPath();
  ctx.arc(1698, 350, 160, 0, Math.PI * 2); ctx.fill();
  ctx.beginPath();
  ctx.arc(350, 1698, 160, 0, Math.PI * 2); ctx.fill();
  ctx.beginPath();
  ctx.arc(1698, 1698, 160, 0, Math.PI * 2); ctx.fill();

  // White Outer & Inner Track Boundaries
  ctx.strokeStyle = '#FFFFFF';
  ctx.lineWidth = 16;
  ctx.beginPath();
  ctx.roundRect(240, 240, 1568, 1568, 180);
  ctx.stroke();

  ctx.beginPath();
  ctx.roundRect(620, 620, 808, 808, 140);
  ctx.stroke();

  // Dashed Centerline
  ctx.setLineDash([48, 48]);
  ctx.strokeStyle = '#FFFFFF';
  ctx.lineWidth = 10;
  ctx.beginPath();
  ctx.roundRect(430, 430, 1188, 1188, 160);
  ctx.stroke();
  ctx.setLineDash([]); // Reset

  // Red & White Kerbs at Corners
  const drawKerb = (cx, cy, r, startAng, endAng) => {
    const segments = 10;
    const step = (endAng - startAng) / segments;
    for (let s = 0; s < segments; s++) {
      ctx.strokeStyle = s % 2 === 0 ? '#EF4444' : '#FFFFFF';
      ctx.lineWidth = 28;
      ctx.beginPath();
      ctx.arc(cx, cy, r, startAng + s * step, startAng + (s + 1) * step);
      ctx.stroke();
    }
  };

  drawKerb(420, 420, 200, Math.PI, 1.5 * Math.PI);
  drawKerb(1628, 420, 200, 1.5 * Math.PI, 2 * Math.PI);
  drawKerb(1628, 1628, 200, 0, 0.5 * Math.PI);
  drawKerb(420, 1628, 200, 0.5 * Math.PI, Math.PI);

  // START / FINISH Chequered Line
  const sfX = 850;
  const sfY = 1430;
  const tileSize = 38;
  for (let r = 0; r < 4; r++) {
    for (let c = 0; c < 9; c++) {
      ctx.fillStyle = (r + c) % 2 === 0 ? '#FFFFFF' : '#000000';
      ctx.fillRect(sfX + c * tileSize, sfY + r * tileSize, tileSize, tileSize);
    }
  }

  // Yellow & Black Hazard Rim Trim
  const hzSize = 32;
  for (let i = 0; i < canvas.width; i += hzSize * 2) {
    ctx.fillStyle = '#FACC15';
    ctx.fillRect(i, 0, hzSize, 28);
    ctx.fillRect(i, canvas.height - 28, hzSize, 28);
    ctx.fillStyle = '#0F172A';
    ctx.fillRect(i + hzSize, 0, hzSize, 28);
    ctx.fillRect(i + hzSize, canvas.height - 28, hzSize, 28);
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.anisotropy = 8;
  textureCache.set(key, texture);
  return texture;
}

/**
 * 4. Line Follower Arena Track Texture (2048 x 2048)
 * Clean white melamine board with winding continuous black tracking line and hazard border
 */
export function getLineFollowerTrackTexture() {
  const key = 'gamma-line-follower-track';
  if (textureCache.has(key)) return textureCache.get(key);

  const canvas = document.createElement('canvas');
  canvas.width = 2048;
  canvas.height = 2048;
  const ctx = canvas.getContext('2d');

  // Clean White Surface
  ctx.fillStyle = '#F8FAFC';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Perimeter Hazard Stripe Border (Yellow & Black)
  const bW = 32;
  for (let x = 0; x < canvas.width; x += bW * 2) {
    ctx.fillStyle = '#FACC15';
    ctx.fillRect(x, 0, bW, 36);
    ctx.fillRect(x, canvas.height - 36, bW, 36);
    ctx.fillStyle = '#0F172A';
    ctx.fillRect(x + bW, 0, bW, 36);
    ctx.fillRect(x + bW, canvas.height - 36, bW, 36);
  }
  for (let y = 0; y < canvas.height; y += bW * 2) {
    ctx.fillStyle = '#FACC15';
    ctx.fillRect(0, y, 36, bW);
    ctx.fillRect(canvas.width - 36, y, 36, bW);
    ctx.fillStyle = '#0F172A';
    ctx.fillRect(0, y + bW, 36, bW);
    ctx.fillRect(canvas.width - 36, y + bW, 36, bW);
  }

  // Obstacle Landing Pads (two dark grey rectangular areas)
  ctx.fillStyle = '#1E293B';
  ctx.fillRect(320, 840, 360, 200);
  ctx.fillRect(1368, 520, 360, 200);

  // Smooth Continuous Serpentine Black Line (32px wide)
  ctx.strokeStyle = '#0F172A';
  ctx.lineWidth = 36;
  ctx.lineCap = 'round';
  ctx.lineJoin = 'round';

  ctx.beginPath();
  // Winding serpentine loop across the board matching the reference render:
  ctx.moveTo(340, 340);
  ctx.bezierCurveTo(900, 340, 1100, 480, 1100, 720);
  ctx.bezierCurveTo(1100, 960, 600, 960, 600, 1200);
  ctx.bezierCurveTo(600, 1440, 1200, 1440, 1200, 1680);
  ctx.bezierCurveTo(1200, 1850, 850, 1850, 500, 1720);
  ctx.bezierCurveTo(240, 1600, 240, 1280, 450, 1100);
  ctx.bezierCurveTo(700, 900, 1550, 1100, 1700, 1350);
  ctx.bezierCurveTo(1850, 1600, 1850, 850, 1550, 650);
  ctx.bezierCurveTo(1300, 480, 600, 480, 340, 340);
  ctx.stroke();

  // Calibration markers
  ctx.fillStyle = '#1677FF';
  ctx.beginPath(); ctx.arc(340, 340, 24, 0, Math.PI * 2); ctx.fill();
  ctx.fillStyle = '#FFFFFF';
  ctx.font = 'bold 22px monospace';
  ctx.textAlign = 'center';
  ctx.fillText('START', 340, 395);

  const texture = new THREE.CanvasTexture(canvas);
  texture.anisotropy = 8;
  textureCache.set(key, texture);
  return texture;
}

/**
 * 5. Platform Skirt Textures with Glowing Cyan Bottom Bar
 */
export function getRoboSoccerSkirtTexture() {
  const key = 'gamma-soccer-skirt';
  if (textureCache.has(key)) return textureCache.get(key);

  const canvas = document.createElement('canvas');
  canvas.width = 1024;
  canvas.height = 128;
  const ctx = canvas.getContext('2d');

  ctx.fillStyle = '#071B3A';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Glowing Cyan Bottom Strip
  ctx.fillStyle = '#00D2FF';
  ctx.fillRect(0, canvas.height - 14, canvas.width, 14);

  // Text: "⚽ Robo Soccer Arena"
  ctx.fillStyle = '#FFFFFF';
  ctx.font = 'bold 44px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto';
  ctx.textAlign = 'center';
  ctx.fillText('⚽  Robo Soccer Arena', canvas.width / 2, 75);

  const texture = new THREE.CanvasTexture(canvas);
  textureCache.set(key, texture);
  return texture;
}

export function getRoboRaceSkirtTexture() {
  const key = 'gamma-race-skirt';
  if (textureCache.has(key)) return textureCache.get(key);

  const canvas = document.createElement('canvas');
  canvas.width = 1024;
  canvas.height = 128;
  const ctx = canvas.getContext('2d');

  ctx.fillStyle = '#071B3A';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Glowing Cyan Bottom Strip
  ctx.fillStyle = '#00D2FF';
  ctx.fillRect(0, canvas.height - 14, canvas.width, 14);

  // Slanted Race Stripes on Left & Right
  ctx.fillStyle = 'rgba(255, 255, 255, 0.4)';
  [-40, -15, 10].forEach((ox) => {
    ctx.beginPath();
    ctx.moveTo(140 + ox, 30);
    ctx.lineTo(165 + ox, 30);
    ctx.lineTo(135 + ox, 95);
    ctx.lineTo(110 + ox, 95);
    ctx.fill();

    ctx.beginPath();
    ctx.moveTo(canvas.width - 140 + ox, 30);
    ctx.lineTo(canvas.width - 115 + ox, 30);
    ctx.lineTo(canvas.width - 145 + ox, 95);
    ctx.lineTo(canvas.width - 170 + ox, 95);
    ctx.fill();
  });

  // Text: "🏁 Robo Race Arena"
  ctx.fillStyle = '#FFFFFF';
  ctx.font = 'bold 44px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto';
  ctx.textAlign = 'center';
  ctx.fillText('🏁  Robo Race Arena', canvas.width / 2, 75);

  const texture = new THREE.CanvasTexture(canvas);
  textureCache.set(key, texture);
  return texture;
}

export function getLineFollowerSkirtTexture() {
  const key = 'gamma-line-skirt';
  if (textureCache.has(key)) return textureCache.get(key);

  const canvas = document.createElement('canvas');
  canvas.width = 1024;
  canvas.height = 128;
  const ctx = canvas.getContext('2d');

  ctx.fillStyle = '#071B3A';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Glowing Cyan Bottom Strip
  ctx.fillStyle = '#00D2FF';
  ctx.fillRect(0, canvas.height - 14, canvas.width, 14);

  // Text: "∿ Line Follower Arena"
  ctx.fillStyle = '#FFFFFF';
  ctx.font = 'bold 44px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto';
  ctx.textAlign = 'center';
  ctx.fillText('∿  Line Follower Arena', canvas.width / 2, 75);

  const texture = new THREE.CanvasTexture(canvas);
  textureCache.set(key, texture);
  return texture;
}

/**
 * 6. START / FINISH Gantry Overhead Banner Texture
 */
export function getStartFinishBannerTexture() {
  const key = 'gamma-start-finish-banner';
  if (textureCache.has(key)) return textureCache.get(key);

  const canvas = document.createElement('canvas');
  canvas.width = 1024;
  canvas.height = 180;
  const ctx = canvas.getContext('2d');

  ctx.fillStyle = '#0F172A';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Chequered Flag Left & Right Blocks
  const ts = 25;
  for (let r = 0; r < Math.floor(canvas.height / ts); r++) {
    for (let c = 0; c < 7; c++) {
      ctx.fillStyle = (r + c) % 2 === 0 ? '#FFFFFF' : '#000000';
      ctx.fillRect(c * ts, r * ts, ts, ts);
      ctx.fillRect(canvas.width - (c + 1) * ts, r * ts, ts, ts);
    }
  }

  // Central Text
  ctx.fillStyle = '#FFFFFF';
  ctx.font = 'bold 52px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto';
  ctx.textAlign = 'center';
  ctx.fillText('START / FINISH', canvas.width / 2, 110);

  const texture = new THREE.CanvasTexture(canvas);
  textureCache.set(key, texture);
  return texture;
}

/**
 * 7. Neon A5X Sign Texture for Right Glass Wall
 */
export function getA5XNeonSignTexture() {
  const key = 'gamma-a5x-neon-sign';
  if (textureCache.has(key)) return textureCache.get(key);

  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 256;
  const ctx = canvas.getContext('2d');

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Blue Neon Glow
  ctx.shadowColor = '#00D2FF';
  ctx.shadowBlur = 24;
  ctx.fillStyle = '#FFFFFF';
  ctx.font = '900 120px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto';
  ctx.textAlign = 'center';
  ctx.fillText('A5X', canvas.width / 2, 170);

  const texture = new THREE.CanvasTexture(canvas);
  textureCache.set(key, texture);
  return texture;
}


export function getGammaCodeEditorTexture() {
  const key = 'gamma-code-editor';
  if (textureCache.has(key)) return textureCache.get(key);

  const canvas = document.createElement('canvas');
  canvas.width = 1280;
  canvas.height = 720;
  const ctx = canvas.getContext('2d');

  // VS Code Dark Background
  ctx.fillStyle = '#0D1117';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Sidebar
  ctx.fillStyle = '#161B22';
  ctx.fillRect(0, 0, 70, canvas.height);
  ctx.fillRect(70, 0, 220, canvas.height);

  // Tab Header
  ctx.fillStyle = '#21262D';
  ctx.fillRect(290, 0, canvas.width - 290, 42);

  ctx.fillStyle = '#388BFD';
  ctx.fillRect(290, 40, 220, 2);

  ctx.fillStyle = '#FFFFFF';
  ctx.font = '14px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto';
  ctx.fillText('autonomous_rover.py', 320, 26);
  ctx.fillText('slam_config.yaml', 540, 26);

  // Code lines
  const codeLines = [
    { text: 'import rclpy', color: '#FF7B72' },
    { text: 'from rclpy.node import Node', color: '#FF7B72' },
    { text: 'from geometry_msgs.msg import Twist', color: '#79C0FF' },
    { text: 'from sensor_msgs.msg import LaserScan', color: '#79C0FF' },
    { text: '', color: '#FFFFFF' },
    { text: 'class AutonomousRover(Node):', color: '#FFA657' },
    { text: '    def __init__(self):', color: '#D2A8FF' },
    { text: '        super().__init__("a5x_rover_controller")', color: '#A5D6FF' },
    { text: '        self.publisher = self.create_publisher(Twist, "/cmd_vel", 10)', color: '#E6EDF3' },
    { text: '        self.sub_scan = self.create_subscription(LaserScan, "/scan", self.on_scan, 10)', color: '#E6EDF3' },
    { text: '        self.get_logger().info("A5X Lab Gamma: Autonomy Stack Online")', color: '#7EE787' },
    { text: '', color: '#FFFFFF' },
    { text: '    def on_scan(self, msg):', color: '#D2A8FF' },
    { text: '        front_dist = min(msg.ranges[160:200])', color: '#E6EDF3' },
    { text: '        twist = Twist()', color: '#FFA657' },
    { text: '        if front_dist < 0.45:  # Collision avoidance', color: '#FF7B72' },
    { text: '            twist.angular.z = 1.2  # Steer chicane', color: '#79C0FF' },
    { text: '        else:', color: '#FF7B72' },
    { text: '            twist.linear.x = 0.85  # Full throttle on straight', color: '#79C0FF' },
    { text: '        self.publisher.publish(twist)', color: '#E6EDF3' },
  ];

  ctx.font = '16px "SF Mono", Consolas, "Courier New", monospace';
  codeLines.forEach((line, i) => {
    ctx.fillStyle = '#484F58';
    ctx.fillText(`${i + 1}`, 305, 80 + i * 26);
    ctx.fillStyle = line.color;
    ctx.fillText(line.text, 345, 80 + i * 26);
  });

  // Terminal at bottom
  ctx.fillStyle = '#010409';
  ctx.fillRect(290, 560, canvas.width - 290, 160);
  ctx.fillStyle = '#58A6FF';
  ctx.fillText('TERMINAL: bash', 310, 585);
  ctx.fillStyle = '#7EE787';
  ctx.fillText('[INFO] [a5x_rover_controller]: Subscribed to /scan. Active odometry stream 100Hz.', 310, 620);
  ctx.fillText('[INFO] [cartographer]: Map resolution 0.05m. Loop closure verified.', 310, 650);
  ctx.fillStyle = '#E6EDF3';
  ctx.fillText('student@gamma-station-01:~/ros2_ws$ ros2 launch a5x_gamma arena_launch.py', 310, 680);

  const texture = new THREE.CanvasTexture(canvas);
  textureCache.set(key, texture);
  return texture;
}

/**
 * =========================================================================
 * REVISION 17: ROBOTICS ARENA BAY DEDICATED HIGH-RES TEXTURES
 * =========================================================================
 */

/**
 * 1. Back Wall Hexagonal Blue LED Frame Banner (2048 x 768)
 * Features robot icon, "Robotics Arena", and 4 line-style icon columns:
 * 1. Robo Race (chequered flag) | 2. Robo Soccer (ball) | 3. Line Follower (squiggle) | 4. Obstacle Challenge (cube)
 */

/**
 * =========================================================================
 * REVISION 17: ROBOTICS ARENA BAY DEDICATED HIGH-RES TEXTURES
 * =========================================================================
 */

/**
 * 1. Back Wall Hexagonal Blue LED Frame Banner (2048 x 768)
 * Features robot icon, "Robotics Arena", and 4 line-style icon columns:
 * 1. Robo Race (chequered flag) | 2. Robo Soccer (ball) | 3. Line Follower (squiggle) | 4. Obstacle Challenge (cube)
 */
export function getRoboticsHexBannerTexture() {
  const key = 'gamma-robotics-hex-banner';
  if (textureCache.has(key)) return textureCache.get(key);

  const canvas = document.createElement('canvas');
  canvas.width = 2048;
  canvas.height = 768;
  const ctx = canvas.getContext('2d');

  // Deep Navy Background
  ctx.fillStyle = '#071B3A';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Outer Electric Blue Border
  ctx.strokeStyle = '#1677FF';
  ctx.lineWidth = 14;
  ctx.strokeRect(20, 20, canvas.width - 40, canvas.height - 40);

  // Top Section: Robot Icon + "Robotics Arena"
  ctx.save();
  // Robot head icon (line style, white & cyan)
  const rx = 820;
  const ry = 140;
  ctx.strokeStyle = '#38BDF8';
  ctx.lineWidth = 8;
  ctx.beginPath();
  ctx.roundRect(rx, ry - 50, 90, 75, 16);
  ctx.stroke();
  // Antennae
  ctx.beginPath();
  ctx.moveTo(rx + 45, ry - 50); ctx.lineTo(rx + 45, ry - 75);
  ctx.stroke();
  ctx.fillStyle = '#38BDF8';
  ctx.beginPath(); ctx.arc(rx + 45, ry - 78, 8, 0, Math.PI * 2); ctx.fill();
  // Eyes & smile
  ctx.beginPath(); ctx.arc(rx + 28, ry - 18, 7, 0, Math.PI * 2); ctx.fill();
  ctx.beginPath(); ctx.arc(rx + 62, ry - 18, 7, 0, Math.PI * 2); ctx.fill();
  ctx.beginPath(); ctx.arc(rx + 45, ry - 5, 18, 0.2 * Math.PI, 0.8 * Math.PI); ctx.stroke();
  ctx.restore();

  // Header Title
  ctx.fillStyle = '#FFFFFF';
  ctx.font = 'bold 76px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto';
  ctx.textAlign = 'left';
  ctx.fillText('Robotics Arena', 950, 162);

  // Horizontal divider under header
  ctx.strokeStyle = 'rgba(255, 255, 255, 0.2)';
  ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.moveTo(100, 220);
  ctx.lineTo(canvas.width - 100, 220);
  ctx.stroke();

  // 4 Icon Columns (Width ~440px each, centers: 290, 770, 1270, 1750)
  const colCenters = [290, 770, 1270, 1750];
  const colTitles = ['Robo Race', 'Robo Soccer', 'Line Follower', 'Obstacle Challenge'];

  // Vertical dividers between columns
  ctx.strokeStyle = 'rgba(255, 255, 255, 0.15)';
  ctx.lineWidth = 2;
  [530, 1020, 1510].forEach((vx) => {
    ctx.beginPath();
    ctx.moveTo(vx, 250);
    ctx.lineTo(vx, canvas.height - 80);
    ctx.stroke();
  });

  // Render each column's line-style icon and title
  colCenters.forEach((cx, idx) => {
    const cy = 420;
    ctx.save();
    ctx.strokeStyle = '#FFFFFF';
    ctx.fillStyle = '#FFFFFF';
    ctx.lineWidth = 7;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';

    if (idx === 0) {
      // 1. Robo Race: Chequered Flag line art
      ctx.beginPath();
      ctx.moveTo(cx - 45, cy + 60); ctx.lineTo(cx - 45, cy - 65);
      ctx.stroke();
      ctx.strokeRect(cx - 45, cy - 65, 95, 65);
      // Chequered tiles
      for (let r = 0; r < 3; r++) {
        for (let c = 0; c < 3; c++) {
          if ((r + c) % 2 === 0) {
            ctx.fillRect(cx - 45 + c * 31.6, cy - 65 + r * 21.6, 31.6, 21.6);
          }
        }
      }
    } else if (idx === 1) {
      // 2. Robo Soccer: Ball with hexagon pattern
      ctx.beginPath();
      ctx.arc(cx, cy, 55, 0, Math.PI * 2);
      ctx.stroke();
      // Center pentagon
      ctx.beginPath();
      for (let a = 0; a < 5; a++) {
        const ang = (a * 2 * Math.PI) / 5 - Math.PI / 2;
        const px = cx + Math.cos(ang) * 22;
        const py = cy + Math.sin(ang) * 22;
        if (a === 0) ctx.moveTo(px, py); else ctx.lineTo(px, py);
      }
      ctx.closePath();
      ctx.fill();
    } else if (idx === 2) {
      // 3. Line Follower: Smooth serpentine / S-curve line
      ctx.beginPath();
      ctx.moveTo(cx - 50, cy + 50);
      ctx.bezierCurveTo(cx - 50, cy, cx, cy, cx, cy - 10);
      ctx.bezierCurveTo(cx, cy - 30, cx + 50, cy - 30, cx + 50, cy - 60);
      ctx.lineWidth = 12;
      ctx.stroke();
    } else {
      // 4. Obstacle Challenge: 3D Wireframe Cube
      const s = 45;
      const off = 22;
      ctx.strokeRect(cx - s - off / 2, cy - s + off / 2, s * 2, s * 2);
      ctx.strokeRect(cx - s + off / 2, cy - s - off / 2, s * 2, s * 2);
      ctx.beginPath();
      ctx.moveTo(cx - s - off / 2, cy - s + off / 2); ctx.lineTo(cx - s + off / 2, cy - s - off / 2);
      ctx.moveTo(cx + s - off / 2, cy - s + off / 2); ctx.lineTo(cx + s + off / 2, cy - s - off / 2);
      ctx.moveTo(cx - s - off / 2, cy + s + off / 2); ctx.lineTo(cx - s + off / 2, cy + s - off / 2);
      ctx.moveTo(cx + s - off / 2, cy + s + off / 2); ctx.lineTo(cx + s + off / 2, cy + s - off / 2);
      ctx.stroke();
    }
    ctx.restore();

    // Column Title
    ctx.fillStyle = '#FFFFFF';
    ctx.font = 'bold 36px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto';
    ctx.textAlign = 'center';
    ctx.fillText(colTitles[idx], cx, cy + 150);
  });

  const texture = new THREE.CanvasTexture(canvas);
  texture.anisotropy = 8;
  textureCache.set(key, texture);
  return texture;
}

/**
 * 2. Robo Soccer Pitch Turf Texture (2048 x 1024)
 * Green synthetic grass with white regulation pitch lines, center circle, penalty boxes
 */
export function getSoccerPitchTexture() {
  const key = 'gamma-soccer-pitch-turf';
  if (textureCache.has(key)) return textureCache.get(key);

  const canvas = document.createElement('canvas');
  canvas.width = 2048;
  canvas.height = 1024;
  const ctx = canvas.getContext('2d');

  // Alternating lawn stripes (green turf)
  const stripeW = 128;
  for (let x = 0; x < canvas.width; x += stripeW) {
    ctx.fillStyle = (x / stripeW) % 2 === 0 ? '#15803D' : '#16A34A';
    ctx.fillRect(x, 0, stripeW, canvas.height);
  }

  // Turf fine grain
  ctx.fillStyle = 'rgba(255, 255, 255, 0.03)';
  for (let i = 0; i < 25000; i++) {
    const rx = Math.random() * canvas.width;
    const ry = Math.random() * canvas.height;
    ctx.fillRect(rx, ry, 2, 2);
  }

  // Regulation White Pitch Markings
  ctx.strokeStyle = '#FFFFFF';
  ctx.lineWidth = 14;

  // Outer Touchlines (Padding 60px)
  const padX = 70;
  const padY = 60;
  const pw = canvas.width - padX * 2;
  const ph = canvas.height - padY * 2;
  ctx.strokeRect(padX, padY, pw, ph);

  // Halfway Line
  const midX = canvas.width / 2;
  ctx.beginPath();
  ctx.moveTo(midX, padY);
  ctx.lineTo(midX, canvas.height - padY);
  ctx.stroke();

  // Center Circle (Radius 160px) & Center Spot
  ctx.beginPath();
  ctx.arc(midX, canvas.height / 2, 160, 0, Math.PI * 2);
  ctx.stroke();
  ctx.fillStyle = '#FFFFFF';
  ctx.beginPath();
  ctx.arc(midX, canvas.height / 2, 12, 0, Math.PI * 2);
  ctx.fill();

  // Left Penalty Box (18-yard box: 340 x 480)
  const pBoxW = 340;
  const pBoxH = 480;
  const pBoxY = (canvas.height - pBoxH) / 2;
  ctx.strokeRect(padX, pBoxY, pBoxW, pBoxH);

  // Left Goal Box (6-yard box: 140 x 260)
  const gBoxW = 140;
  const gBoxH = 260;
  const gBoxY = (canvas.height - gBoxH) / 2;
  ctx.strokeRect(padX, gBoxY, gBoxW, gBoxH);

  // Left Penalty Spot & Arc
  ctx.beginPath(); ctx.arc(padX + 240, canvas.height / 2, 10, 0, Math.PI * 2); ctx.fill();
  ctx.beginPath();
  ctx.arc(padX + 240, canvas.height / 2, 120, -0.28 * Math.PI, 0.28 * Math.PI);
  ctx.stroke();

  // Right Penalty Box
  ctx.strokeRect(canvas.width - padX - pBoxW, pBoxY, pBoxW, pBoxH);

  // Right Goal Box
  ctx.strokeRect(canvas.width - padX - gBoxW, gBoxY, gBoxW, gBoxH);

  // Right Penalty Spot & Arc
  ctx.beginPath(); ctx.arc(canvas.width - padX - 240, canvas.height / 2, 10, 0, Math.PI * 2); ctx.fill();
  ctx.beginPath();
  ctx.arc(canvas.width - padX - 240, canvas.height / 2, 120, 0.72 * Math.PI, 1.28 * Math.PI);
  ctx.stroke();

  // Corner Arcs
  const cr = 45;
  ctx.beginPath(); ctx.arc(padX, padY, cr, 0, Math.PI / 2); ctx.stroke();
  ctx.beginPath(); ctx.arc(padX, canvas.height - padY, cr, -Math.PI / 2, 0); ctx.stroke();
  ctx.beginPath(); ctx.arc(canvas.width - padX, padY, cr, Math.PI / 2, Math.PI); ctx.stroke();
  ctx.beginPath(); ctx.arc(canvas.width - padX, canvas.height - padY, cr, Math.PI, 1.5 * Math.PI); ctx.stroke();

  const texture = new THREE.CanvasTexture(canvas);
  texture.anisotropy = 8;
  textureCache.set(key, texture);
  return texture;
}

/**
 * 3. Robo Race Track Surface Texture (2048 x 2048)
 * Dark asphalt track with red/white kerbs, green grass infield patches, white lane lines
 */
export function getRoboRaceTrackTexture() {
  const key = 'gamma-robo-race-track';
  if (textureCache.has(key)) return textureCache.get(key);

  const canvas = document.createElement('canvas');
  canvas.width = 2048;
  canvas.height = 2048;
  const ctx = canvas.getContext('2d');

  // Dark Asphalt Background
  ctx.fillStyle = '#1A1E24';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Asphalt grain noise
  ctx.fillStyle = 'rgba(255, 255, 255, 0.02)';
  for (let i = 0; i < 30000; i++) {
    const rx = Math.random() * canvas.width;
    const ry = Math.random() * canvas.height;
    ctx.fillRect(rx, ry, 2, 2);
  }

  // Green Infield Grass Islands
  ctx.fillStyle = '#15803D';
  // Central Island
  ctx.beginPath();
  ctx.roundRect(700, 700, 648, 648, 120);
  ctx.fill();
  ctx.strokeStyle = '#16A34A';
  ctx.lineWidth = 14;
  ctx.stroke();

  // Corner Grass Insets
  ctx.beginPath();
  ctx.arc(350, 350, 160, 0, Math.PI * 2); ctx.fill();
  ctx.beginPath();
  ctx.arc(1698, 350, 160, 0, Math.PI * 2); ctx.fill();
  ctx.beginPath();
  ctx.arc(350, 1698, 160, 0, Math.PI * 2); ctx.fill();
  ctx.beginPath();
  ctx.arc(1698, 1698, 160, 0, Math.PI * 2); ctx.fill();

  // White Outer & Inner Track Boundaries
  ctx.strokeStyle = '#FFFFFF';
  ctx.lineWidth = 16;
  ctx.beginPath();
  ctx.roundRect(240, 240, 1568, 1568, 180);
  ctx.stroke();

  ctx.beginPath();
  ctx.roundRect(620, 620, 808, 808, 140);
  ctx.stroke();

  // Dashed Centerline
  ctx.setLineDash([48, 48]);
  ctx.strokeStyle = '#FFFFFF';
  ctx.lineWidth = 10;
  ctx.beginPath();
  ctx.roundRect(430, 430, 1188, 1188, 160);
  ctx.stroke();
  ctx.setLineDash([]); // Reset

  // Red & White Kerbs at Corners
  const drawKerb = (cx, cy, r, startAng, endAng) => {
    const segments = 10;
    const step = (endAng - startAng) / segments;
    for (let s = 0; s < segments; s++) {
      ctx.strokeStyle = s % 2 === 0 ? '#EF4444' : '#FFFFFF';
      ctx.lineWidth = 28;
      ctx.beginPath();
      ctx.arc(cx, cy, r, startAng + s * step, startAng + (s + 1) * step);
      ctx.stroke();
    }
  };

  drawKerb(420, 420, 200, Math.PI, 1.5 * Math.PI);
  drawKerb(1628, 420, 200, 1.5 * Math.PI, 2 * Math.PI);
  drawKerb(1628, 1628, 200, 0, 0.5 * Math.PI);
  drawKerb(420, 1628, 200, 0.5 * Math.PI, Math.PI);

  // START / FINISH Chequered Line
  const sfX = 850;
  const sfY = 1430;
  const tileSize = 38;
  for (let r = 0; r < 4; r++) {
    for (let c = 0; c < 9; c++) {
      ctx.fillStyle = (r + c) % 2 === 0 ? '#FFFFFF' : '#000000';
      ctx.fillRect(sfX + c * tileSize, sfY + r * tileSize, tileSize, tileSize);
    }
  }

  // Yellow & Black Hazard Rim Trim
  const hzSize = 32;
  for (let i = 0; i < canvas.width; i += hzSize * 2) {
    ctx.fillStyle = '#FACC15';
    ctx.fillRect(i, 0, hzSize, 28);
    ctx.fillRect(i, canvas.height - 28, hzSize, 28);
    ctx.fillStyle = '#0F172A';
    ctx.fillRect(i + hzSize, 0, hzSize, 28);
    ctx.fillRect(i + hzSize, canvas.height - 28, hzSize, 28);
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.anisotropy = 8;
  textureCache.set(key, texture);
  return texture;
}

/**
 * 4. Line Follower Arena Track Texture (2048 x 2048)
 * Clean white melamine board with winding continuous black tracking line and hazard border
 */
export function getLineFollowerTrackTexture() {
  const key = 'gamma-line-follower-track';
  if (textureCache.has(key)) return textureCache.get(key);

  const canvas = document.createElement('canvas');
  canvas.width = 2048;
  canvas.height = 2048;
  const ctx = canvas.getContext('2d');

  // Clean White Surface
  ctx.fillStyle = '#F8FAFC';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Perimeter Hazard Stripe Border (Yellow & Black)
  const bW = 32;
  for (let x = 0; x < canvas.width; x += bW * 2) {
    ctx.fillStyle = '#FACC15';
    ctx.fillRect(x, 0, bW, 36);
    ctx.fillRect(x, canvas.height - 36, bW, 36);
    ctx.fillStyle = '#0F172A';
    ctx.fillRect(x + bW, 0, bW, 36);
    ctx.fillRect(x + bW, canvas.height - 36, bW, 36);
  }
  for (let y = 0; y < canvas.height; y += bW * 2) {
    ctx.fillStyle = '#FACC15';
    ctx.fillRect(0, y, 36, bW);
    ctx.fillRect(canvas.width - 36, y, 36, bW);
    ctx.fillStyle = '#0F172A';
    ctx.fillRect(0, y + bW, 36, bW);
    ctx.fillRect(canvas.width - 36, y + bW, 36, bW);
  }

  // Obstacle Landing Pads (two dark grey rectangular areas)
  ctx.fillStyle = '#1E293B';
  ctx.fillRect(320, 840, 360, 200);
  ctx.fillRect(1368, 520, 360, 200);

  // Smooth Continuous Serpentine Black Line (32px wide)
  ctx.strokeStyle = '#0F172A';
  ctx.lineWidth = 36;
  ctx.lineCap = 'round';
  ctx.lineJoin = 'round';

  ctx.beginPath();
  // Winding serpentine loop across the board matching the reference render:
  ctx.moveTo(340, 340);
  ctx.bezierCurveTo(900, 340, 1100, 480, 1100, 720);
  ctx.bezierCurveTo(1100, 960, 600, 960, 600, 1200);
  ctx.bezierCurveTo(600, 1440, 1200, 1440, 1200, 1680);
  ctx.bezierCurveTo(1200, 1850, 850, 1850, 500, 1720);
  ctx.bezierCurveTo(240, 1600, 240, 1280, 450, 1100);
  ctx.bezierCurveTo(700, 900, 1550, 1100, 1700, 1350);
  ctx.bezierCurveTo(1850, 1600, 1850, 850, 1550, 650);
  ctx.bezierCurveTo(1300, 480, 600, 480, 340, 340);
  ctx.stroke();

  // Calibration markers
  ctx.fillStyle = '#1677FF';
  ctx.beginPath(); ctx.arc(340, 340, 24, 0, Math.PI * 2); ctx.fill();
  ctx.fillStyle = '#FFFFFF';
  ctx.font = 'bold 22px monospace';
  ctx.textAlign = 'center';
  ctx.fillText('START', 340, 395);

  const texture = new THREE.CanvasTexture(canvas);
  texture.anisotropy = 8;
  textureCache.set(key, texture);
  return texture;
}

/**
 * 5. Platform Skirt Textures with Glowing Cyan Bottom Bar
 */
export function getRoboSoccerSkirtTexture() {
  const key = 'gamma-soccer-skirt';
  if (textureCache.has(key)) return textureCache.get(key);

  const canvas = document.createElement('canvas');
  canvas.width = 1024;
  canvas.height = 128;
  const ctx = canvas.getContext('2d');

  ctx.fillStyle = '#071B3A';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Glowing Cyan Bottom Strip
  ctx.fillStyle = '#00D2FF';
  ctx.fillRect(0, canvas.height - 14, canvas.width, 14);

  // Text: "⚽ Robo Soccer Arena"
  ctx.fillStyle = '#FFFFFF';
  ctx.font = 'bold 44px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto';
  ctx.textAlign = 'center';
  ctx.fillText('⚽  Robo Soccer Arena', canvas.width / 2, 75);

  const texture = new THREE.CanvasTexture(canvas);
  textureCache.set(key, texture);
  return texture;
}

export function getRoboRaceSkirtTexture() {
  const key = 'gamma-race-skirt';
  if (textureCache.has(key)) return textureCache.get(key);

  const canvas = document.createElement('canvas');
  canvas.width = 1024;
  canvas.height = 128;
  const ctx = canvas.getContext('2d');

  ctx.fillStyle = '#071B3A';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Glowing Cyan Bottom Strip
  ctx.fillStyle = '#00D2FF';
  ctx.fillRect(0, canvas.height - 14, canvas.width, 14);

  // Slanted Race Stripes on Left & Right
  ctx.fillStyle = 'rgba(255, 255, 255, 0.4)';
  [-40, -15, 10].forEach((ox) => {
    ctx.beginPath();
    ctx.moveTo(140 + ox, 30);
    ctx.lineTo(165 + ox, 30);
    ctx.lineTo(135 + ox, 95);
    ctx.lineTo(110 + ox, 95);
    ctx.fill();

    ctx.beginPath();
    ctx.moveTo(canvas.width - 140 + ox, 30);
    ctx.lineTo(canvas.width - 115 + ox, 30);
    ctx.lineTo(canvas.width - 145 + ox, 95);
    ctx.lineTo(canvas.width - 170 + ox, 95);
    ctx.fill();
  });

  // Text: "🏁 Robo Race Arena"
  ctx.fillStyle = '#FFFFFF';
  ctx.font = 'bold 44px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto';
  ctx.textAlign = 'center';
  ctx.fillText('🏁  Robo Race Arena', canvas.width / 2, 75);

  const texture = new THREE.CanvasTexture(canvas);
  textureCache.set(key, texture);
  return texture;
}

export function getLineFollowerSkirtTexture() {
  const key = 'gamma-line-skirt';
  if (textureCache.has(key)) return textureCache.get(key);

  const canvas = document.createElement('canvas');
  canvas.width = 1024;
  canvas.height = 128;
  const ctx = canvas.getContext('2d');

  ctx.fillStyle = '#071B3A';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Glowing Cyan Bottom Strip
  ctx.fillStyle = '#00D2FF';
  ctx.fillRect(0, canvas.height - 14, canvas.width, 14);

  // Text: "∿ Line Follower Arena"
  ctx.fillStyle = '#FFFFFF';
  ctx.font = 'bold 44px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto';
  ctx.textAlign = 'center';
  ctx.fillText('∿  Line Follower Arena', canvas.width / 2, 75);

  const texture = new THREE.CanvasTexture(canvas);
  textureCache.set(key, texture);
  return texture;
}

/**
 * 6. START / FINISH Gantry Overhead Banner Texture
 */
export function getStartFinishBannerTexture() {
  const key = 'gamma-start-finish-banner';
  if (textureCache.has(key)) return textureCache.get(key);

  const canvas = document.createElement('canvas');
  canvas.width = 1024;
  canvas.height = 180;
  const ctx = canvas.getContext('2d');

  ctx.fillStyle = '#0F172A';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Chequered Flag Left & Right Blocks
  const ts = 25;
  for (let r = 0; r < Math.floor(canvas.height / ts); r++) {
    for (let c = 0; c < 7; c++) {
      ctx.fillStyle = (r + c) % 2 === 0 ? '#FFFFFF' : '#000000';
      ctx.fillRect(c * ts, r * ts, ts, ts);
      ctx.fillRect(canvas.width - (c + 1) * ts, r * ts, ts, ts);
    }
  }

  // Central Text
  ctx.fillStyle = '#FFFFFF';
  ctx.font = 'bold 52px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto';
  ctx.textAlign = 'center';
  ctx.fillText('START / FINISH', canvas.width / 2, 110);

  const texture = new THREE.CanvasTexture(canvas);
  textureCache.set(key, texture);
  return texture;
}

/**
 * 7. Neon A5X Sign Texture for Right Glass Wall
 */
export function getA5XNeonSignTexture() {
  const key = 'gamma-a5x-neon-sign';
  if (textureCache.has(key)) return textureCache.get(key);

  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 256;
  const ctx = canvas.getContext('2d');

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Blue Neon Glow
  ctx.shadowColor = '#00D2FF';
  ctx.shadowBlur = 24;
  ctx.fillStyle = '#FFFFFF';
  ctx.font = '900 120px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto';
  ctx.textAlign = 'center';
  ctx.fillText('A5X', canvas.width / 2, 170);

  const texture = new THREE.CanvasTexture(canvas);
  textureCache.set(key, texture);
  return texture;
}


export function getGammaCadMonitorTexture() {
  const key = 'gamma-cad-monitor';
  if (textureCache.has(key)) return textureCache.get(key);

  const canvas = document.createElement('canvas');
  canvas.width = 1280;
  canvas.height = 720;
  const ctx = canvas.getContext('2d');

  // Dark CAD Environment
  const bgGrad = ctx.createLinearGradient(0, 0, 0, canvas.height);
  bgGrad.addColorStop(0, '#1E293B');
  bgGrad.addColorStop(1, '#0F172A');
  ctx.fillStyle = bgGrad;
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // CAD 3D Perspective Grid
  ctx.strokeStyle = 'rgba(56, 189, 248, 0.15)';
  ctx.lineWidth = 1;
  for (let x = 0; x < canvas.width; x += 40) {
    ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, canvas.height); ctx.stroke();
  }
  for (let y = 0; y < canvas.height; y += 40) {
    ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(canvas.width, y); ctx.stroke();
  }

  // Robot Arm / Rover CAD Wireframe (Center)
  ctx.save();
  ctx.translate(640, 360);

  // Coordinate axes in corner
  ctx.strokeStyle = '#EF4444'; ctx.lineWidth = 3;
  ctx.beginPath(); ctx.moveTo(-540, 260); ctx.lineTo(-480, 260); ctx.stroke();
  ctx.strokeStyle = '#10B981';
  ctx.beginPath(); ctx.moveTo(-540, 260); ctx.lineTo(-540, 200); ctx.stroke();
  ctx.strokeStyle = '#3B82F6';
  ctx.beginPath(); ctx.moveTo(-540, 260); ctx.lineTo(-500, 290); ctx.stroke();

  // 3D Isometric Robot Chassis Model
  ctx.strokeStyle = '#38BDF8';
  ctx.fillStyle = 'rgba(14, 165, 233, 0.25)';
  ctx.lineWidth = 2.5;

  // Body
  ctx.beginPath();
  ctx.moveTo(-160, -40); ctx.lineTo(80, -120); ctx.lineTo(240, 0); ctx.lineTo(0, 80); ctx.closePath();
  ctx.fill(); ctx.stroke();

  // Extrusion depth
  ctx.beginPath();
  ctx.moveTo(-160, -40); ctx.lineTo(-160, 40); ctx.lineTo(0, 160); ctx.lineTo(240, 80); ctx.lineTo(240, 0);
  ctx.moveTo(0, 80); ctx.lineTo(0, 160);
  ctx.stroke();

  // Wheels
  const wheelOffsets = [
    [-180, 20], [-40, -120], [220, -40], [60, 140]
  ];
  wheelOffsets.forEach(([wx, wy]) => {
    ctx.beginPath();
    ctx.ellipse(wx, wy, 25, 45, Math.PI / 4, 0, Math.PI * 2);
    ctx.fillStyle = 'rgba(2, 132, 199, 0.4)';
    ctx.fill();
    ctx.stroke();
  });

  // Dimension Callouts
  ctx.strokeStyle = '#F59E0B';
  ctx.fillStyle = '#F59E0B';
  ctx.font = '14px monospace';
  ctx.beginPath(); ctx.moveTo(-160, 70); ctx.lineTo(0, 190); ctx.stroke();
  ctx.fillText('L = 340.0 mm', -80, 150);

  ctx.restore();

  // CAD Ribbon & Viewport Info
  ctx.fillStyle = '#0F172A';
  ctx.fillRect(0, 0, canvas.width, 45);
  ctx.fillStyle = '#F8FAFC';
  ctx.font = 'bold 16px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto';
  ctx.fillText('A5X CAD STUDIO — Model: Gamma_Autonomous_Rover_v4.step', 25, 28);
  ctx.font = '14px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto';
  ctx.fillStyle = '#94A3B8';
  ctx.fillText('[Extrude]  [Revolve]  [Fillet]  [Shell]  [Inspect Mass: 1.84 kg]', 720, 28);

  const texture = new THREE.CanvasTexture(canvas);
  textureCache.set(key, texture);
  return texture;
}

/**
 * =========================================================================
 * REVISION 17: ROBOTICS ARENA BAY DEDICATED HIGH-RES TEXTURES
 * =========================================================================
 */

/**
 * 1. Back Wall Hexagonal Blue LED Frame Banner (2048 x 768)
 * Features robot icon, "Robotics Arena", and 4 line-style icon columns:
 * 1. Robo Race (chequered flag) | 2. Robo Soccer (ball) | 3. Line Follower (squiggle) | 4. Obstacle Challenge (cube)
 */

/**
 * =========================================================================
 * REVISION 17: ROBOTICS ARENA BAY DEDICATED HIGH-RES TEXTURES
 * =========================================================================
 */

/**
 * 1. Back Wall Hexagonal Blue LED Frame Banner (2048 x 768)
 * Features robot icon, "Robotics Arena", and 4 line-style icon columns:
 * 1. Robo Race (chequered flag) | 2. Robo Soccer (ball) | 3. Line Follower (squiggle) | 4. Obstacle Challenge (cube)
 */
export function getRoboticsHexBannerTexture() {
  const key = 'gamma-robotics-hex-banner';
  if (textureCache.has(key)) return textureCache.get(key);

  const canvas = document.createElement('canvas');
  canvas.width = 2048;
  canvas.height = 768;
  const ctx = canvas.getContext('2d');

  // Deep Navy Background
  ctx.fillStyle = '#071B3A';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Outer Electric Blue Border
  ctx.strokeStyle = '#1677FF';
  ctx.lineWidth = 14;
  ctx.strokeRect(20, 20, canvas.width - 40, canvas.height - 40);

  // Top Section: Robot Icon + "Robotics Arena"
  ctx.save();
  // Robot head icon (line style, white & cyan)
  const rx = 820;
  const ry = 140;
  ctx.strokeStyle = '#38BDF8';
  ctx.lineWidth = 8;
  ctx.beginPath();
  ctx.roundRect(rx, ry - 50, 90, 75, 16);
  ctx.stroke();
  // Antennae
  ctx.beginPath();
  ctx.moveTo(rx + 45, ry - 50); ctx.lineTo(rx + 45, ry - 75);
  ctx.stroke();
  ctx.fillStyle = '#38BDF8';
  ctx.beginPath(); ctx.arc(rx + 45, ry - 78, 8, 0, Math.PI * 2); ctx.fill();
  // Eyes & smile
  ctx.beginPath(); ctx.arc(rx + 28, ry - 18, 7, 0, Math.PI * 2); ctx.fill();
  ctx.beginPath(); ctx.arc(rx + 62, ry - 18, 7, 0, Math.PI * 2); ctx.fill();
  ctx.beginPath(); ctx.arc(rx + 45, ry - 5, 18, 0.2 * Math.PI, 0.8 * Math.PI); ctx.stroke();
  ctx.restore();

  // Header Title
  ctx.fillStyle = '#FFFFFF';
  ctx.font = 'bold 76px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto';
  ctx.textAlign = 'left';
  ctx.fillText('Robotics Arena', 950, 162);

  // Horizontal divider under header
  ctx.strokeStyle = 'rgba(255, 255, 255, 0.2)';
  ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.moveTo(100, 220);
  ctx.lineTo(canvas.width - 100, 220);
  ctx.stroke();

  // 4 Icon Columns (Width ~440px each, centers: 290, 770, 1270, 1750)
  const colCenters = [290, 770, 1270, 1750];
  const colTitles = ['Robo Race', 'Robo Soccer', 'Line Follower', 'Obstacle Challenge'];

  // Vertical dividers between columns
  ctx.strokeStyle = 'rgba(255, 255, 255, 0.15)';
  ctx.lineWidth = 2;
  [530, 1020, 1510].forEach((vx) => {
    ctx.beginPath();
    ctx.moveTo(vx, 250);
    ctx.lineTo(vx, canvas.height - 80);
    ctx.stroke();
  });

  // Render each column's line-style icon and title
  colCenters.forEach((cx, idx) => {
    const cy = 420;
    ctx.save();
    ctx.strokeStyle = '#FFFFFF';
    ctx.fillStyle = '#FFFFFF';
    ctx.lineWidth = 7;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';

    if (idx === 0) {
      // 1. Robo Race: Chequered Flag line art
      ctx.beginPath();
      ctx.moveTo(cx - 45, cy + 60); ctx.lineTo(cx - 45, cy - 65);
      ctx.stroke();
      ctx.strokeRect(cx - 45, cy - 65, 95, 65);
      // Chequered tiles
      for (let r = 0; r < 3; r++) {
        for (let c = 0; c < 3; c++) {
          if ((r + c) % 2 === 0) {
            ctx.fillRect(cx - 45 + c * 31.6, cy - 65 + r * 21.6, 31.6, 21.6);
          }
        }
      }
    } else if (idx === 1) {
      // 2. Robo Soccer: Ball with hexagon pattern
      ctx.beginPath();
      ctx.arc(cx, cy, 55, 0, Math.PI * 2);
      ctx.stroke();
      // Center pentagon
      ctx.beginPath();
      for (let a = 0; a < 5; a++) {
        const ang = (a * 2 * Math.PI) / 5 - Math.PI / 2;
        const px = cx + Math.cos(ang) * 22;
        const py = cy + Math.sin(ang) * 22;
        if (a === 0) ctx.moveTo(px, py); else ctx.lineTo(px, py);
      }
      ctx.closePath();
      ctx.fill();
    } else if (idx === 2) {
      // 3. Line Follower: Smooth serpentine / S-curve line
      ctx.beginPath();
      ctx.moveTo(cx - 50, cy + 50);
      ctx.bezierCurveTo(cx - 50, cy, cx, cy, cx, cy - 10);
      ctx.bezierCurveTo(cx, cy - 30, cx + 50, cy - 30, cx + 50, cy - 60);
      ctx.lineWidth = 12;
      ctx.stroke();
    } else {
      // 4. Obstacle Challenge: 3D Wireframe Cube
      const s = 45;
      const off = 22;
      ctx.strokeRect(cx - s - off / 2, cy - s + off / 2, s * 2, s * 2);
      ctx.strokeRect(cx - s + off / 2, cy - s - off / 2, s * 2, s * 2);
      ctx.beginPath();
      ctx.moveTo(cx - s - off / 2, cy - s + off / 2); ctx.lineTo(cx - s + off / 2, cy - s - off / 2);
      ctx.moveTo(cx + s - off / 2, cy - s + off / 2); ctx.lineTo(cx + s + off / 2, cy - s - off / 2);
      ctx.moveTo(cx - s - off / 2, cy + s + off / 2); ctx.lineTo(cx - s + off / 2, cy + s - off / 2);
      ctx.moveTo(cx + s - off / 2, cy + s + off / 2); ctx.lineTo(cx + s + off / 2, cy + s - off / 2);
      ctx.stroke();
    }
    ctx.restore();

    // Column Title
    ctx.fillStyle = '#FFFFFF';
    ctx.font = 'bold 36px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto';
    ctx.textAlign = 'center';
    ctx.fillText(colTitles[idx], cx, cy + 150);
  });

  const texture = new THREE.CanvasTexture(canvas);
  texture.anisotropy = 8;
  textureCache.set(key, texture);
  return texture;
}

/**
 * 2. Robo Soccer Pitch Turf Texture (2048 x 1024)
 * Green synthetic grass with white regulation pitch lines, center circle, penalty boxes
 */
export function getSoccerPitchTexture() {
  const key = 'gamma-soccer-pitch-turf';
  if (textureCache.has(key)) return textureCache.get(key);

  const canvas = document.createElement('canvas');
  canvas.width = 2048;
  canvas.height = 1024;
  const ctx = canvas.getContext('2d');

  // Alternating lawn stripes (green turf)
  const stripeW = 128;
  for (let x = 0; x < canvas.width; x += stripeW) {
    ctx.fillStyle = (x / stripeW) % 2 === 0 ? '#15803D' : '#16A34A';
    ctx.fillRect(x, 0, stripeW, canvas.height);
  }

  // Turf fine grain
  ctx.fillStyle = 'rgba(255, 255, 255, 0.03)';
  for (let i = 0; i < 25000; i++) {
    const rx = Math.random() * canvas.width;
    const ry = Math.random() * canvas.height;
    ctx.fillRect(rx, ry, 2, 2);
  }

  // Regulation White Pitch Markings
  ctx.strokeStyle = '#FFFFFF';
  ctx.lineWidth = 14;

  // Outer Touchlines (Padding 60px)
  const padX = 70;
  const padY = 60;
  const pw = canvas.width - padX * 2;
  const ph = canvas.height - padY * 2;
  ctx.strokeRect(padX, padY, pw, ph);

  // Halfway Line
  const midX = canvas.width / 2;
  ctx.beginPath();
  ctx.moveTo(midX, padY);
  ctx.lineTo(midX, canvas.height - padY);
  ctx.stroke();

  // Center Circle (Radius 160px) & Center Spot
  ctx.beginPath();
  ctx.arc(midX, canvas.height / 2, 160, 0, Math.PI * 2);
  ctx.stroke();
  ctx.fillStyle = '#FFFFFF';
  ctx.beginPath();
  ctx.arc(midX, canvas.height / 2, 12, 0, Math.PI * 2);
  ctx.fill();

  // Left Penalty Box (18-yard box: 340 x 480)
  const pBoxW = 340;
  const pBoxH = 480;
  const pBoxY = (canvas.height - pBoxH) / 2;
  ctx.strokeRect(padX, pBoxY, pBoxW, pBoxH);

  // Left Goal Box (6-yard box: 140 x 260)
  const gBoxW = 140;
  const gBoxH = 260;
  const gBoxY = (canvas.height - gBoxH) / 2;
  ctx.strokeRect(padX, gBoxY, gBoxW, gBoxH);

  // Left Penalty Spot & Arc
  ctx.beginPath(); ctx.arc(padX + 240, canvas.height / 2, 10, 0, Math.PI * 2); ctx.fill();
  ctx.beginPath();
  ctx.arc(padX + 240, canvas.height / 2, 120, -0.28 * Math.PI, 0.28 * Math.PI);
  ctx.stroke();

  // Right Penalty Box
  ctx.strokeRect(canvas.width - padX - pBoxW, pBoxY, pBoxW, pBoxH);

  // Right Goal Box
  ctx.strokeRect(canvas.width - padX - gBoxW, gBoxY, gBoxW, gBoxH);

  // Right Penalty Spot & Arc
  ctx.beginPath(); ctx.arc(canvas.width - padX - 240, canvas.height / 2, 10, 0, Math.PI * 2); ctx.fill();
  ctx.beginPath();
  ctx.arc(canvas.width - padX - 240, canvas.height / 2, 120, 0.72 * Math.PI, 1.28 * Math.PI);
  ctx.stroke();

  // Corner Arcs
  const cr = 45;
  ctx.beginPath(); ctx.arc(padX, padY, cr, 0, Math.PI / 2); ctx.stroke();
  ctx.beginPath(); ctx.arc(padX, canvas.height - padY, cr, -Math.PI / 2, 0); ctx.stroke();
  ctx.beginPath(); ctx.arc(canvas.width - padX, padY, cr, Math.PI / 2, Math.PI); ctx.stroke();
  ctx.beginPath(); ctx.arc(canvas.width - padX, canvas.height - padY, cr, Math.PI, 1.5 * Math.PI); ctx.stroke();

  const texture = new THREE.CanvasTexture(canvas);
  texture.anisotropy = 8;
  textureCache.set(key, texture);
  return texture;
}

/**
 * 3. Robo Race Track Surface Texture (2048 x 2048)
 * Dark asphalt track with red/white kerbs, green grass infield patches, white lane lines
 */
export function getRoboRaceTrackTexture() {
  const key = 'gamma-robo-race-track';
  if (textureCache.has(key)) return textureCache.get(key);

  const canvas = document.createElement('canvas');
  canvas.width = 2048;
  canvas.height = 2048;
  const ctx = canvas.getContext('2d');

  // Dark Asphalt Background
  ctx.fillStyle = '#1A1E24';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Asphalt grain noise
  ctx.fillStyle = 'rgba(255, 255, 255, 0.02)';
  for (let i = 0; i < 30000; i++) {
    const rx = Math.random() * canvas.width;
    const ry = Math.random() * canvas.height;
    ctx.fillRect(rx, ry, 2, 2);
  }

  // Green Infield Grass Islands
  ctx.fillStyle = '#15803D';
  // Central Island
  ctx.beginPath();
  ctx.roundRect(700, 700, 648, 648, 120);
  ctx.fill();
  ctx.strokeStyle = '#16A34A';
  ctx.lineWidth = 14;
  ctx.stroke();

  // Corner Grass Insets
  ctx.beginPath();
  ctx.arc(350, 350, 160, 0, Math.PI * 2); ctx.fill();
  ctx.beginPath();
  ctx.arc(1698, 350, 160, 0, Math.PI * 2); ctx.fill();
  ctx.beginPath();
  ctx.arc(350, 1698, 160, 0, Math.PI * 2); ctx.fill();
  ctx.beginPath();
  ctx.arc(1698, 1698, 160, 0, Math.PI * 2); ctx.fill();

  // White Outer & Inner Track Boundaries
  ctx.strokeStyle = '#FFFFFF';
  ctx.lineWidth = 16;
  ctx.beginPath();
  ctx.roundRect(240, 240, 1568, 1568, 180);
  ctx.stroke();

  ctx.beginPath();
  ctx.roundRect(620, 620, 808, 808, 140);
  ctx.stroke();

  // Dashed Centerline
  ctx.setLineDash([48, 48]);
  ctx.strokeStyle = '#FFFFFF';
  ctx.lineWidth = 10;
  ctx.beginPath();
  ctx.roundRect(430, 430, 1188, 1188, 160);
  ctx.stroke();
  ctx.setLineDash([]); // Reset

  // Red & White Kerbs at Corners
  const drawKerb = (cx, cy, r, startAng, endAng) => {
    const segments = 10;
    const step = (endAng - startAng) / segments;
    for (let s = 0; s < segments; s++) {
      ctx.strokeStyle = s % 2 === 0 ? '#EF4444' : '#FFFFFF';
      ctx.lineWidth = 28;
      ctx.beginPath();
      ctx.arc(cx, cy, r, startAng + s * step, startAng + (s + 1) * step);
      ctx.stroke();
    }
  };

  drawKerb(420, 420, 200, Math.PI, 1.5 * Math.PI);
  drawKerb(1628, 420, 200, 1.5 * Math.PI, 2 * Math.PI);
  drawKerb(1628, 1628, 200, 0, 0.5 * Math.PI);
  drawKerb(420, 1628, 200, 0.5 * Math.PI, Math.PI);

  // START / FINISH Chequered Line
  const sfX = 850;
  const sfY = 1430;
  const tileSize = 38;
  for (let r = 0; r < 4; r++) {
    for (let c = 0; c < 9; c++) {
      ctx.fillStyle = (r + c) % 2 === 0 ? '#FFFFFF' : '#000000';
      ctx.fillRect(sfX + c * tileSize, sfY + r * tileSize, tileSize, tileSize);
    }
  }

  // Yellow & Black Hazard Rim Trim
  const hzSize = 32;
  for (let i = 0; i < canvas.width; i += hzSize * 2) {
    ctx.fillStyle = '#FACC15';
    ctx.fillRect(i, 0, hzSize, 28);
    ctx.fillRect(i, canvas.height - 28, hzSize, 28);
    ctx.fillStyle = '#0F172A';
    ctx.fillRect(i + hzSize, 0, hzSize, 28);
    ctx.fillRect(i + hzSize, canvas.height - 28, hzSize, 28);
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.anisotropy = 8;
  textureCache.set(key, texture);
  return texture;
}

/**
 * 4. Line Follower Arena Track Texture (2048 x 2048)
 * Clean white melamine board with winding continuous black tracking line and hazard border
 */
export function getLineFollowerTrackTexture() {
  const key = 'gamma-line-follower-track';
  if (textureCache.has(key)) return textureCache.get(key);

  const canvas = document.createElement('canvas');
  canvas.width = 2048;
  canvas.height = 2048;
  const ctx = canvas.getContext('2d');

  // Clean White Surface
  ctx.fillStyle = '#F8FAFC';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Perimeter Hazard Stripe Border (Yellow & Black)
  const bW = 32;
  for (let x = 0; x < canvas.width; x += bW * 2) {
    ctx.fillStyle = '#FACC15';
    ctx.fillRect(x, 0, bW, 36);
    ctx.fillRect(x, canvas.height - 36, bW, 36);
    ctx.fillStyle = '#0F172A';
    ctx.fillRect(x + bW, 0, bW, 36);
    ctx.fillRect(x + bW, canvas.height - 36, bW, 36);
  }
  for (let y = 0; y < canvas.height; y += bW * 2) {
    ctx.fillStyle = '#FACC15';
    ctx.fillRect(0, y, 36, bW);
    ctx.fillRect(canvas.width - 36, y, 36, bW);
    ctx.fillStyle = '#0F172A';
    ctx.fillRect(0, y + bW, 36, bW);
    ctx.fillRect(canvas.width - 36, y + bW, 36, bW);
  }

  // Obstacle Landing Pads (two dark grey rectangular areas)
  ctx.fillStyle = '#1E293B';
  ctx.fillRect(320, 840, 360, 200);
  ctx.fillRect(1368, 520, 360, 200);

  // Smooth Continuous Serpentine Black Line (32px wide)
  ctx.strokeStyle = '#0F172A';
  ctx.lineWidth = 36;
  ctx.lineCap = 'round';
  ctx.lineJoin = 'round';

  ctx.beginPath();
  // Winding serpentine loop across the board matching the reference render:
  ctx.moveTo(340, 340);
  ctx.bezierCurveTo(900, 340, 1100, 480, 1100, 720);
  ctx.bezierCurveTo(1100, 960, 600, 960, 600, 1200);
  ctx.bezierCurveTo(600, 1440, 1200, 1440, 1200, 1680);
  ctx.bezierCurveTo(1200, 1850, 850, 1850, 500, 1720);
  ctx.bezierCurveTo(240, 1600, 240, 1280, 450, 1100);
  ctx.bezierCurveTo(700, 900, 1550, 1100, 1700, 1350);
  ctx.bezierCurveTo(1850, 1600, 1850, 850, 1550, 650);
  ctx.bezierCurveTo(1300, 480, 600, 480, 340, 340);
  ctx.stroke();

  // Calibration markers
  ctx.fillStyle = '#1677FF';
  ctx.beginPath(); ctx.arc(340, 340, 24, 0, Math.PI * 2); ctx.fill();
  ctx.fillStyle = '#FFFFFF';
  ctx.font = 'bold 22px monospace';
  ctx.textAlign = 'center';
  ctx.fillText('START', 340, 395);

  const texture = new THREE.CanvasTexture(canvas);
  texture.anisotropy = 8;
  textureCache.set(key, texture);
  return texture;
}

/**
 * 5. Platform Skirt Textures with Glowing Cyan Bottom Bar
 */
export function getRoboSoccerSkirtTexture() {
  const key = 'gamma-soccer-skirt';
  if (textureCache.has(key)) return textureCache.get(key);

  const canvas = document.createElement('canvas');
  canvas.width = 1024;
  canvas.height = 128;
  const ctx = canvas.getContext('2d');

  ctx.fillStyle = '#071B3A';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Glowing Cyan Bottom Strip
  ctx.fillStyle = '#00D2FF';
  ctx.fillRect(0, canvas.height - 14, canvas.width, 14);

  // Text: "⚽ Robo Soccer Arena"
  ctx.fillStyle = '#FFFFFF';
  ctx.font = 'bold 44px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto';
  ctx.textAlign = 'center';
  ctx.fillText('⚽  Robo Soccer Arena', canvas.width / 2, 75);

  const texture = new THREE.CanvasTexture(canvas);
  textureCache.set(key, texture);
  return texture;
}

export function getRoboRaceSkirtTexture() {
  const key = 'gamma-race-skirt';
  if (textureCache.has(key)) return textureCache.get(key);

  const canvas = document.createElement('canvas');
  canvas.width = 1024;
  canvas.height = 128;
  const ctx = canvas.getContext('2d');

  ctx.fillStyle = '#071B3A';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Glowing Cyan Bottom Strip
  ctx.fillStyle = '#00D2FF';
  ctx.fillRect(0, canvas.height - 14, canvas.width, 14);

  // Slanted Race Stripes on Left & Right
  ctx.fillStyle = 'rgba(255, 255, 255, 0.4)';
  [-40, -15, 10].forEach((ox) => {
    ctx.beginPath();
    ctx.moveTo(140 + ox, 30);
    ctx.lineTo(165 + ox, 30);
    ctx.lineTo(135 + ox, 95);
    ctx.lineTo(110 + ox, 95);
    ctx.fill();

    ctx.beginPath();
    ctx.moveTo(canvas.width - 140 + ox, 30);
    ctx.lineTo(canvas.width - 115 + ox, 30);
    ctx.lineTo(canvas.width - 145 + ox, 95);
    ctx.lineTo(canvas.width - 170 + ox, 95);
    ctx.fill();
  });

  // Text: "🏁 Robo Race Arena"
  ctx.fillStyle = '#FFFFFF';
  ctx.font = 'bold 44px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto';
  ctx.textAlign = 'center';
  ctx.fillText('🏁  Robo Race Arena', canvas.width / 2, 75);

  const texture = new THREE.CanvasTexture(canvas);
  textureCache.set(key, texture);
  return texture;
}

export function getLineFollowerSkirtTexture() {
  const key = 'gamma-line-skirt';
  if (textureCache.has(key)) return textureCache.get(key);

  const canvas = document.createElement('canvas');
  canvas.width = 1024;
  canvas.height = 128;
  const ctx = canvas.getContext('2d');

  ctx.fillStyle = '#071B3A';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Glowing Cyan Bottom Strip
  ctx.fillStyle = '#00D2FF';
  ctx.fillRect(0, canvas.height - 14, canvas.width, 14);

  // Text: "∿ Line Follower Arena"
  ctx.fillStyle = '#FFFFFF';
  ctx.font = 'bold 44px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto';
  ctx.textAlign = 'center';
  ctx.fillText('∿  Line Follower Arena', canvas.width / 2, 75);

  const texture = new THREE.CanvasTexture(canvas);
  textureCache.set(key, texture);
  return texture;
}

/**
 * 6. START / FINISH Gantry Overhead Banner Texture
 */
export function getStartFinishBannerTexture() {
  const key = 'gamma-start-finish-banner';
  if (textureCache.has(key)) return textureCache.get(key);

  const canvas = document.createElement('canvas');
  canvas.width = 1024;
  canvas.height = 180;
  const ctx = canvas.getContext('2d');

  ctx.fillStyle = '#0F172A';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Chequered Flag Left & Right Blocks
  const ts = 25;
  for (let r = 0; r < Math.floor(canvas.height / ts); r++) {
    for (let c = 0; c < 7; c++) {
      ctx.fillStyle = (r + c) % 2 === 0 ? '#FFFFFF' : '#000000';
      ctx.fillRect(c * ts, r * ts, ts, ts);
      ctx.fillRect(canvas.width - (c + 1) * ts, r * ts, ts, ts);
    }
  }

  // Central Text
  ctx.fillStyle = '#FFFFFF';
  ctx.font = 'bold 52px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto';
  ctx.textAlign = 'center';
  ctx.fillText('START / FINISH', canvas.width / 2, 110);

  const texture = new THREE.CanvasTexture(canvas);
  textureCache.set(key, texture);
  return texture;
}

/**
 * 7. Neon A5X Sign Texture for Right Glass Wall
 */
export function getA5XNeonSignTexture() {
  const key = 'gamma-a5x-neon-sign';
  if (textureCache.has(key)) return textureCache.get(key);

  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 256;
  const ctx = canvas.getContext('2d');

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Blue Neon Glow
  ctx.shadowColor = '#00D2FF';
  ctx.shadowBlur = 24;
  ctx.fillStyle = '#FFFFFF';
  ctx.font = '900 120px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto';
  ctx.textAlign = 'center';
  ctx.fillText('A5X', canvas.width / 2, 170);

  const texture = new THREE.CanvasTexture(canvas);
  textureCache.set(key, texture);
  return texture;
}


export function getGammaVrScreenTexture() {
  const key = 'gamma-vr-screen';
  if (textureCache.has(key)) return textureCache.get(key);

  const canvas = document.createElement('canvas');
  canvas.width = 1920;
  canvas.height = 1080;
  const ctx = canvas.getContext('2d');

  // Sunrise alpine sky gradient
  const sky = ctx.createLinearGradient(0, 0, 0, 700);
  sky.addColorStop(0, '#0F172A');
  sky.addColorStop(0.3, '#1E1B4B');
  sky.addColorStop(0.6, '#4C1D95');
  sky.addColorStop(0.85, '#D97706');
  sky.addColorStop(1, '#FDE047');
  ctx.fillStyle = sky;
  ctx.fillRect(0, 0, canvas.width, 700);

  // Distant mountain ranges (snowy peaks)
  ctx.fillStyle = '#312E81';
  ctx.beginPath();
  ctx.moveTo(0, 620);
  ctx.lineTo(240, 320); ctx.lineTo(460, 520); ctx.lineTo(780, 240);
  ctx.lineTo(1120, 480); ctx.lineTo(1420, 280); ctx.lineTo(1720, 460); ctx.lineTo(1920, 360);
  ctx.lineTo(1920, 750); ctx.lineTo(0, 750);
  ctx.fill();

  // Foreground alpine lake with golden reflections
  const lake = ctx.createLinearGradient(0, 700, 0, 1080);
  lake.addColorStop(0, '#1E3A8A');
  lake.addColorStop(0.5, '#0284C7');
  lake.addColorStop(1, '#0C4A6E');
  ctx.fillStyle = lake;
  ctx.fillRect(0, 700, canvas.width, 380);

  // Pine forest silhouettes
  ctx.fillStyle = '#064E3B';
  for (let x = 0; x < canvas.width; x += 35) {
    const h = 70 + Math.sin(x) * 40;
    ctx.beginPath();
    ctx.moveTo(x, 700);
    ctx.lineTo(x + 18, 700 - h);
    ctx.lineTo(x + 36, 700);
    ctx.fill();
  }

  // VR HUD Overlay
  ctx.fillStyle = 'rgba(255, 255, 255, 0.85)';
  ctx.font = 'bold 36px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto';
  ctx.fillText('A5X SPATIAL XR TWIN — Alpine Proving Ground v2', 80, 120);

  ctx.font = '22px monospace';
  ctx.fillStyle = '#38BDF8';
  ctx.fillText('FOV: 110°  |  FRAME RATE: 120 FPS  |  SPATIAL AUDIO: BINAURAL ON', 80, 160);

  const texture = new THREE.CanvasTexture(canvas);
  textureCache.set(key, texture);
  return texture;
}

/**
 * =========================================================================
 * REVISION 17: ROBOTICS ARENA BAY DEDICATED HIGH-RES TEXTURES
 * =========================================================================
 */

/**
 * 1. Back Wall Hexagonal Blue LED Frame Banner (2048 x 768)
 * Features robot icon, "Robotics Arena", and 4 line-style icon columns:
 * 1. Robo Race (chequered flag) | 2. Robo Soccer (ball) | 3. Line Follower (squiggle) | 4. Obstacle Challenge (cube)
 */

/**
 * =========================================================================
 * REVISION 17: ROBOTICS ARENA BAY DEDICATED HIGH-RES TEXTURES
 * =========================================================================
 */

/**
 * 1. Back Wall Hexagonal Blue LED Frame Banner (2048 x 768)
 * Features robot icon, "Robotics Arena", and 4 line-style icon columns:
 * 1. Robo Race (chequered flag) | 2. Robo Soccer (ball) | 3. Line Follower (squiggle) | 4. Obstacle Challenge (cube)
 */
export function getRoboticsHexBannerTexture() {
  const key = 'gamma-robotics-hex-banner';
  if (textureCache.has(key)) return textureCache.get(key);

  const canvas = document.createElement('canvas');
  canvas.width = 2048;
  canvas.height = 768;
  const ctx = canvas.getContext('2d');

  // Deep Navy Background
  ctx.fillStyle = '#071B3A';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Outer Electric Blue Border
  ctx.strokeStyle = '#1677FF';
  ctx.lineWidth = 14;
  ctx.strokeRect(20, 20, canvas.width - 40, canvas.height - 40);

  // Top Section: Robot Icon + "Robotics Arena"
  ctx.save();
  // Robot head icon (line style, white & cyan)
  const rx = 820;
  const ry = 140;
  ctx.strokeStyle = '#38BDF8';
  ctx.lineWidth = 8;
  ctx.beginPath();
  ctx.roundRect(rx, ry - 50, 90, 75, 16);
  ctx.stroke();
  // Antennae
  ctx.beginPath();
  ctx.moveTo(rx + 45, ry - 50); ctx.lineTo(rx + 45, ry - 75);
  ctx.stroke();
  ctx.fillStyle = '#38BDF8';
  ctx.beginPath(); ctx.arc(rx + 45, ry - 78, 8, 0, Math.PI * 2); ctx.fill();
  // Eyes & smile
  ctx.beginPath(); ctx.arc(rx + 28, ry - 18, 7, 0, Math.PI * 2); ctx.fill();
  ctx.beginPath(); ctx.arc(rx + 62, ry - 18, 7, 0, Math.PI * 2); ctx.fill();
  ctx.beginPath(); ctx.arc(rx + 45, ry - 5, 18, 0.2 * Math.PI, 0.8 * Math.PI); ctx.stroke();
  ctx.restore();

  // Header Title
  ctx.fillStyle = '#FFFFFF';
  ctx.font = 'bold 76px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto';
  ctx.textAlign = 'left';
  ctx.fillText('Robotics Arena', 950, 162);

  // Horizontal divider under header
  ctx.strokeStyle = 'rgba(255, 255, 255, 0.2)';
  ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.moveTo(100, 220);
  ctx.lineTo(canvas.width - 100, 220);
  ctx.stroke();

  // 4 Icon Columns (Width ~440px each, centers: 290, 770, 1270, 1750)
  const colCenters = [290, 770, 1270, 1750];
  const colTitles = ['Robo Race', 'Robo Soccer', 'Line Follower', 'Obstacle Challenge'];

  // Vertical dividers between columns
  ctx.strokeStyle = 'rgba(255, 255, 255, 0.15)';
  ctx.lineWidth = 2;
  [530, 1020, 1510].forEach((vx) => {
    ctx.beginPath();
    ctx.moveTo(vx, 250);
    ctx.lineTo(vx, canvas.height - 80);
    ctx.stroke();
  });

  // Render each column's line-style icon and title
  colCenters.forEach((cx, idx) => {
    const cy = 420;
    ctx.save();
    ctx.strokeStyle = '#FFFFFF';
    ctx.fillStyle = '#FFFFFF';
    ctx.lineWidth = 7;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';

    if (idx === 0) {
      // 1. Robo Race: Chequered Flag line art
      ctx.beginPath();
      ctx.moveTo(cx - 45, cy + 60); ctx.lineTo(cx - 45, cy - 65);
      ctx.stroke();
      ctx.strokeRect(cx - 45, cy - 65, 95, 65);
      // Chequered tiles
      for (let r = 0; r < 3; r++) {
        for (let c = 0; c < 3; c++) {
          if ((r + c) % 2 === 0) {
            ctx.fillRect(cx - 45 + c * 31.6, cy - 65 + r * 21.6, 31.6, 21.6);
          }
        }
      }
    } else if (idx === 1) {
      // 2. Robo Soccer: Ball with hexagon pattern
      ctx.beginPath();
      ctx.arc(cx, cy, 55, 0, Math.PI * 2);
      ctx.stroke();
      // Center pentagon
      ctx.beginPath();
      for (let a = 0; a < 5; a++) {
        const ang = (a * 2 * Math.PI) / 5 - Math.PI / 2;
        const px = cx + Math.cos(ang) * 22;
        const py = cy + Math.sin(ang) * 22;
        if (a === 0) ctx.moveTo(px, py); else ctx.lineTo(px, py);
      }
      ctx.closePath();
      ctx.fill();
    } else if (idx === 2) {
      // 3. Line Follower: Smooth serpentine / S-curve line
      ctx.beginPath();
      ctx.moveTo(cx - 50, cy + 50);
      ctx.bezierCurveTo(cx - 50, cy, cx, cy, cx, cy - 10);
      ctx.bezierCurveTo(cx, cy - 30, cx + 50, cy - 30, cx + 50, cy - 60);
      ctx.lineWidth = 12;
      ctx.stroke();
    } else {
      // 4. Obstacle Challenge: 3D Wireframe Cube
      const s = 45;
      const off = 22;
      ctx.strokeRect(cx - s - off / 2, cy - s + off / 2, s * 2, s * 2);
      ctx.strokeRect(cx - s + off / 2, cy - s - off / 2, s * 2, s * 2);
      ctx.beginPath();
      ctx.moveTo(cx - s - off / 2, cy - s + off / 2); ctx.lineTo(cx - s + off / 2, cy - s - off / 2);
      ctx.moveTo(cx + s - off / 2, cy - s + off / 2); ctx.lineTo(cx + s + off / 2, cy - s - off / 2);
      ctx.moveTo(cx - s - off / 2, cy + s + off / 2); ctx.lineTo(cx - s + off / 2, cy + s - off / 2);
      ctx.moveTo(cx + s - off / 2, cy + s + off / 2); ctx.lineTo(cx + s + off / 2, cy + s - off / 2);
      ctx.stroke();
    }
    ctx.restore();

    // Column Title
    ctx.fillStyle = '#FFFFFF';
    ctx.font = 'bold 36px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto';
    ctx.textAlign = 'center';
    ctx.fillText(colTitles[idx], cx, cy + 150);
  });

  const texture = new THREE.CanvasTexture(canvas);
  texture.anisotropy = 8;
  textureCache.set(key, texture);
  return texture;
}

/**
 * 2. Robo Soccer Pitch Turf Texture (2048 x 1024)
 * Green synthetic grass with white regulation pitch lines, center circle, penalty boxes
 */
export function getSoccerPitchTexture() {
  const key = 'gamma-soccer-pitch-turf';
  if (textureCache.has(key)) return textureCache.get(key);

  const canvas = document.createElement('canvas');
  canvas.width = 2048;
  canvas.height = 1024;
  const ctx = canvas.getContext('2d');

  // Alternating lawn stripes (green turf)
  const stripeW = 128;
  for (let x = 0; x < canvas.width; x += stripeW) {
    ctx.fillStyle = (x / stripeW) % 2 === 0 ? '#15803D' : '#16A34A';
    ctx.fillRect(x, 0, stripeW, canvas.height);
  }

  // Turf fine grain
  ctx.fillStyle = 'rgba(255, 255, 255, 0.03)';
  for (let i = 0; i < 25000; i++) {
    const rx = Math.random() * canvas.width;
    const ry = Math.random() * canvas.height;
    ctx.fillRect(rx, ry, 2, 2);
  }

  // Regulation White Pitch Markings
  ctx.strokeStyle = '#FFFFFF';
  ctx.lineWidth = 14;

  // Outer Touchlines (Padding 60px)
  const padX = 70;
  const padY = 60;
  const pw = canvas.width - padX * 2;
  const ph = canvas.height - padY * 2;
  ctx.strokeRect(padX, padY, pw, ph);

  // Halfway Line
  const midX = canvas.width / 2;
  ctx.beginPath();
  ctx.moveTo(midX, padY);
  ctx.lineTo(midX, canvas.height - padY);
  ctx.stroke();

  // Center Circle (Radius 160px) & Center Spot
  ctx.beginPath();
  ctx.arc(midX, canvas.height / 2, 160, 0, Math.PI * 2);
  ctx.stroke();
  ctx.fillStyle = '#FFFFFF';
  ctx.beginPath();
  ctx.arc(midX, canvas.height / 2, 12, 0, Math.PI * 2);
  ctx.fill();

  // Left Penalty Box (18-yard box: 340 x 480)
  const pBoxW = 340;
  const pBoxH = 480;
  const pBoxY = (canvas.height - pBoxH) / 2;
  ctx.strokeRect(padX, pBoxY, pBoxW, pBoxH);

  // Left Goal Box (6-yard box: 140 x 260)
  const gBoxW = 140;
  const gBoxH = 260;
  const gBoxY = (canvas.height - gBoxH) / 2;
  ctx.strokeRect(padX, gBoxY, gBoxW, gBoxH);

  // Left Penalty Spot & Arc
  ctx.beginPath(); ctx.arc(padX + 240, canvas.height / 2, 10, 0, Math.PI * 2); ctx.fill();
  ctx.beginPath();
  ctx.arc(padX + 240, canvas.height / 2, 120, -0.28 * Math.PI, 0.28 * Math.PI);
  ctx.stroke();

  // Right Penalty Box
  ctx.strokeRect(canvas.width - padX - pBoxW, pBoxY, pBoxW, pBoxH);

  // Right Goal Box
  ctx.strokeRect(canvas.width - padX - gBoxW, gBoxY, gBoxW, gBoxH);

  // Right Penalty Spot & Arc
  ctx.beginPath(); ctx.arc(canvas.width - padX - 240, canvas.height / 2, 10, 0, Math.PI * 2); ctx.fill();
  ctx.beginPath();
  ctx.arc(canvas.width - padX - 240, canvas.height / 2, 120, 0.72 * Math.PI, 1.28 * Math.PI);
  ctx.stroke();

  // Corner Arcs
  const cr = 45;
  ctx.beginPath(); ctx.arc(padX, padY, cr, 0, Math.PI / 2); ctx.stroke();
  ctx.beginPath(); ctx.arc(padX, canvas.height - padY, cr, -Math.PI / 2, 0); ctx.stroke();
  ctx.beginPath(); ctx.arc(canvas.width - padX, padY, cr, Math.PI / 2, Math.PI); ctx.stroke();
  ctx.beginPath(); ctx.arc(canvas.width - padX, canvas.height - padY, cr, Math.PI, 1.5 * Math.PI); ctx.stroke();

  const texture = new THREE.CanvasTexture(canvas);
  texture.anisotropy = 8;
  textureCache.set(key, texture);
  return texture;
}

/**
 * 3. Robo Race Track Surface Texture (2048 x 2048)
 * Dark asphalt track with red/white kerbs, green grass infield patches, white lane lines
 */
export function getRoboRaceTrackTexture() {
  const key = 'gamma-robo-race-track';
  if (textureCache.has(key)) return textureCache.get(key);

  const canvas = document.createElement('canvas');
  canvas.width = 2048;
  canvas.height = 2048;
  const ctx = canvas.getContext('2d');

  // Dark Asphalt Background
  ctx.fillStyle = '#1A1E24';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Asphalt grain noise
  ctx.fillStyle = 'rgba(255, 255, 255, 0.02)';
  for (let i = 0; i < 30000; i++) {
    const rx = Math.random() * canvas.width;
    const ry = Math.random() * canvas.height;
    ctx.fillRect(rx, ry, 2, 2);
  }

  // Green Infield Grass Islands
  ctx.fillStyle = '#15803D';
  // Central Island
  ctx.beginPath();
  ctx.roundRect(700, 700, 648, 648, 120);
  ctx.fill();
  ctx.strokeStyle = '#16A34A';
  ctx.lineWidth = 14;
  ctx.stroke();

  // Corner Grass Insets
  ctx.beginPath();
  ctx.arc(350, 350, 160, 0, Math.PI * 2); ctx.fill();
  ctx.beginPath();
  ctx.arc(1698, 350, 160, 0, Math.PI * 2); ctx.fill();
  ctx.beginPath();
  ctx.arc(350, 1698, 160, 0, Math.PI * 2); ctx.fill();
  ctx.beginPath();
  ctx.arc(1698, 1698, 160, 0, Math.PI * 2); ctx.fill();

  // White Outer & Inner Track Boundaries
  ctx.strokeStyle = '#FFFFFF';
  ctx.lineWidth = 16;
  ctx.beginPath();
  ctx.roundRect(240, 240, 1568, 1568, 180);
  ctx.stroke();

  ctx.beginPath();
  ctx.roundRect(620, 620, 808, 808, 140);
  ctx.stroke();

  // Dashed Centerline
  ctx.setLineDash([48, 48]);
  ctx.strokeStyle = '#FFFFFF';
  ctx.lineWidth = 10;
  ctx.beginPath();
  ctx.roundRect(430, 430, 1188, 1188, 160);
  ctx.stroke();
  ctx.setLineDash([]); // Reset

  // Red & White Kerbs at Corners
  const drawKerb = (cx, cy, r, startAng, endAng) => {
    const segments = 10;
    const step = (endAng - startAng) / segments;
    for (let s = 0; s < segments; s++) {
      ctx.strokeStyle = s % 2 === 0 ? '#EF4444' : '#FFFFFF';
      ctx.lineWidth = 28;
      ctx.beginPath();
      ctx.arc(cx, cy, r, startAng + s * step, startAng + (s + 1) * step);
      ctx.stroke();
    }
  };

  drawKerb(420, 420, 200, Math.PI, 1.5 * Math.PI);
  drawKerb(1628, 420, 200, 1.5 * Math.PI, 2 * Math.PI);
  drawKerb(1628, 1628, 200, 0, 0.5 * Math.PI);
  drawKerb(420, 1628, 200, 0.5 * Math.PI, Math.PI);

  // START / FINISH Chequered Line
  const sfX = 850;
  const sfY = 1430;
  const tileSize = 38;
  for (let r = 0; r < 4; r++) {
    for (let c = 0; c < 9; c++) {
      ctx.fillStyle = (r + c) % 2 === 0 ? '#FFFFFF' : '#000000';
      ctx.fillRect(sfX + c * tileSize, sfY + r * tileSize, tileSize, tileSize);
    }
  }

  // Yellow & Black Hazard Rim Trim
  const hzSize = 32;
  for (let i = 0; i < canvas.width; i += hzSize * 2) {
    ctx.fillStyle = '#FACC15';
    ctx.fillRect(i, 0, hzSize, 28);
    ctx.fillRect(i, canvas.height - 28, hzSize, 28);
    ctx.fillStyle = '#0F172A';
    ctx.fillRect(i + hzSize, 0, hzSize, 28);
    ctx.fillRect(i + hzSize, canvas.height - 28, hzSize, 28);
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.anisotropy = 8;
  textureCache.set(key, texture);
  return texture;
}

/**
 * 4. Line Follower Arena Track Texture (2048 x 2048)
 * Clean white melamine board with winding continuous black tracking line and hazard border
 */
export function getLineFollowerTrackTexture() {
  const key = 'gamma-line-follower-track';
  if (textureCache.has(key)) return textureCache.get(key);

  const canvas = document.createElement('canvas');
  canvas.width = 2048;
  canvas.height = 2048;
  const ctx = canvas.getContext('2d');

  // Clean White Surface
  ctx.fillStyle = '#F8FAFC';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Perimeter Hazard Stripe Border (Yellow & Black)
  const bW = 32;
  for (let x = 0; x < canvas.width; x += bW * 2) {
    ctx.fillStyle = '#FACC15';
    ctx.fillRect(x, 0, bW, 36);
    ctx.fillRect(x, canvas.height - 36, bW, 36);
    ctx.fillStyle = '#0F172A';
    ctx.fillRect(x + bW, 0, bW, 36);
    ctx.fillRect(x + bW, canvas.height - 36, bW, 36);
  }
  for (let y = 0; y < canvas.height; y += bW * 2) {
    ctx.fillStyle = '#FACC15';
    ctx.fillRect(0, y, 36, bW);
    ctx.fillRect(canvas.width - 36, y, 36, bW);
    ctx.fillStyle = '#0F172A';
    ctx.fillRect(0, y + bW, 36, bW);
    ctx.fillRect(canvas.width - 36, y + bW, 36, bW);
  }

  // Obstacle Landing Pads (two dark grey rectangular areas)
  ctx.fillStyle = '#1E293B';
  ctx.fillRect(320, 840, 360, 200);
  ctx.fillRect(1368, 520, 360, 200);

  // Smooth Continuous Serpentine Black Line (32px wide)
  ctx.strokeStyle = '#0F172A';
  ctx.lineWidth = 36;
  ctx.lineCap = 'round';
  ctx.lineJoin = 'round';

  ctx.beginPath();
  // Winding serpentine loop across the board matching the reference render:
  ctx.moveTo(340, 340);
  ctx.bezierCurveTo(900, 340, 1100, 480, 1100, 720);
  ctx.bezierCurveTo(1100, 960, 600, 960, 600, 1200);
  ctx.bezierCurveTo(600, 1440, 1200, 1440, 1200, 1680);
  ctx.bezierCurveTo(1200, 1850, 850, 1850, 500, 1720);
  ctx.bezierCurveTo(240, 1600, 240, 1280, 450, 1100);
  ctx.bezierCurveTo(700, 900, 1550, 1100, 1700, 1350);
  ctx.bezierCurveTo(1850, 1600, 1850, 850, 1550, 650);
  ctx.bezierCurveTo(1300, 480, 600, 480, 340, 340);
  ctx.stroke();

  // Calibration markers
  ctx.fillStyle = '#1677FF';
  ctx.beginPath(); ctx.arc(340, 340, 24, 0, Math.PI * 2); ctx.fill();
  ctx.fillStyle = '#FFFFFF';
  ctx.font = 'bold 22px monospace';
  ctx.textAlign = 'center';
  ctx.fillText('START', 340, 395);

  const texture = new THREE.CanvasTexture(canvas);
  texture.anisotropy = 8;
  textureCache.set(key, texture);
  return texture;
}

/**
 * 5. Platform Skirt Textures with Glowing Cyan Bottom Bar
 */
export function getRoboSoccerSkirtTexture() {
  const key = 'gamma-soccer-skirt';
  if (textureCache.has(key)) return textureCache.get(key);

  const canvas = document.createElement('canvas');
  canvas.width = 1024;
  canvas.height = 128;
  const ctx = canvas.getContext('2d');

  ctx.fillStyle = '#071B3A';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Glowing Cyan Bottom Strip
  ctx.fillStyle = '#00D2FF';
  ctx.fillRect(0, canvas.height - 14, canvas.width, 14);

  // Text: "⚽ Robo Soccer Arena"
  ctx.fillStyle = '#FFFFFF';
  ctx.font = 'bold 44px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto';
  ctx.textAlign = 'center';
  ctx.fillText('⚽  Robo Soccer Arena', canvas.width / 2, 75);

  const texture = new THREE.CanvasTexture(canvas);
  textureCache.set(key, texture);
  return texture;
}

export function getRoboRaceSkirtTexture() {
  const key = 'gamma-race-skirt';
  if (textureCache.has(key)) return textureCache.get(key);

  const canvas = document.createElement('canvas');
  canvas.width = 1024;
  canvas.height = 128;
  const ctx = canvas.getContext('2d');

  ctx.fillStyle = '#071B3A';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Glowing Cyan Bottom Strip
  ctx.fillStyle = '#00D2FF';
  ctx.fillRect(0, canvas.height - 14, canvas.width, 14);

  // Slanted Race Stripes on Left & Right
  ctx.fillStyle = 'rgba(255, 255, 255, 0.4)';
  [-40, -15, 10].forEach((ox) => {
    ctx.beginPath();
    ctx.moveTo(140 + ox, 30);
    ctx.lineTo(165 + ox, 30);
    ctx.lineTo(135 + ox, 95);
    ctx.lineTo(110 + ox, 95);
    ctx.fill();

    ctx.beginPath();
    ctx.moveTo(canvas.width - 140 + ox, 30);
    ctx.lineTo(canvas.width - 115 + ox, 30);
    ctx.lineTo(canvas.width - 145 + ox, 95);
    ctx.lineTo(canvas.width - 170 + ox, 95);
    ctx.fill();
  });

  // Text: "🏁 Robo Race Arena"
  ctx.fillStyle = '#FFFFFF';
  ctx.font = 'bold 44px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto';
  ctx.textAlign = 'center';
  ctx.fillText('🏁  Robo Race Arena', canvas.width / 2, 75);

  const texture = new THREE.CanvasTexture(canvas);
  textureCache.set(key, texture);
  return texture;
}

export function getLineFollowerSkirtTexture() {
  const key = 'gamma-line-skirt';
  if (textureCache.has(key)) return textureCache.get(key);

  const canvas = document.createElement('canvas');
  canvas.width = 1024;
  canvas.height = 128;
  const ctx = canvas.getContext('2d');

  ctx.fillStyle = '#071B3A';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Glowing Cyan Bottom Strip
  ctx.fillStyle = '#00D2FF';
  ctx.fillRect(0, canvas.height - 14, canvas.width, 14);

  // Text: "∿ Line Follower Arena"
  ctx.fillStyle = '#FFFFFF';
  ctx.font = 'bold 44px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto';
  ctx.textAlign = 'center';
  ctx.fillText('∿  Line Follower Arena', canvas.width / 2, 75);

  const texture = new THREE.CanvasTexture(canvas);
  textureCache.set(key, texture);
  return texture;
}

/**
 * 6. START / FINISH Gantry Overhead Banner Texture
 */
export function getStartFinishBannerTexture() {
  const key = 'gamma-start-finish-banner';
  if (textureCache.has(key)) return textureCache.get(key);

  const canvas = document.createElement('canvas');
  canvas.width = 1024;
  canvas.height = 180;
  const ctx = canvas.getContext('2d');

  ctx.fillStyle = '#0F172A';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Chequered Flag Left & Right Blocks
  const ts = 25;
  for (let r = 0; r < Math.floor(canvas.height / ts); r++) {
    for (let c = 0; c < 7; c++) {
      ctx.fillStyle = (r + c) % 2 === 0 ? '#FFFFFF' : '#000000';
      ctx.fillRect(c * ts, r * ts, ts, ts);
      ctx.fillRect(canvas.width - (c + 1) * ts, r * ts, ts, ts);
    }
  }

  // Central Text
  ctx.fillStyle = '#FFFFFF';
  ctx.font = 'bold 52px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto';
  ctx.textAlign = 'center';
  ctx.fillText('START / FINISH', canvas.width / 2, 110);

  const texture = new THREE.CanvasTexture(canvas);
  textureCache.set(key, texture);
  return texture;
}

/**
 * 7. Neon A5X Sign Texture for Right Glass Wall
 */
export function getA5XNeonSignTexture() {
  const key = 'gamma-a5x-neon-sign';
  if (textureCache.has(key)) return textureCache.get(key);

  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 256;
  const ctx = canvas.getContext('2d');

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Blue Neon Glow
  ctx.shadowColor = '#00D2FF';
  ctx.shadowBlur = 24;
  ctx.fillStyle = '#FFFFFF';
  ctx.font = '900 120px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto';
  ctx.textAlign = 'center';
  ctx.fillText('A5X', canvas.width / 2, 170);

  const texture = new THREE.CanvasTexture(canvas);
  textureCache.set(key, texture);
  return texture;
}


export function getGammaArenaTrackTexture() {
  const key = 'gamma-arena-track';
  if (textureCache.has(key)) return textureCache.get(key);

  const canvas = document.createElement('canvas');
  canvas.width = 2048;
  canvas.height = 2048;
  const ctx = canvas.getContext('2d');

  // Dark asphalt track surface
  ctx.fillStyle = '#1A1E24';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Asphalt grain texture
  ctx.fillStyle = 'rgba(255, 255, 255, 0.02)';
  for (let i = 0; i < 20000; i++) {
    const x = Math.random() * canvas.width;
    const y = Math.random() * canvas.height;
    ctx.fillRect(x, y, 2, 2);
  }

  // Artificial turf patches (green grass areas)
  ctx.fillStyle = '#15803D';
  // Outer perimeter grass margins
  ctx.beginPath();
  ctx.roundRect(140, 140, 1768, 1768, 120);
  ctx.strokeStyle = '#16A34A';
  ctx.lineWidth = 20;
  ctx.stroke();

  // Inner infield grass island
  ctx.beginPath();
  ctx.roundRect(640, 640, 768, 768, 180);
  ctx.fill();
  ctx.strokeStyle = '#22C55E';
  ctx.lineWidth = 12;
  ctx.stroke();

  // Track white boundary lines
  ctx.strokeStyle = '#F8FAFC';
  ctx.lineWidth = 14;

  // Outer track loop
  ctx.beginPath();
  ctx.roundRect(240, 240, 1568, 1568, 90);
  ctx.stroke();

  // Inner track loop
  ctx.beginPath();
  ctx.roundRect(540, 540, 968, 968, 140);
  ctx.stroke();

  // Dashed centerline
  ctx.setLineDash([40, 40]);
  ctx.strokeStyle = '#FACC15'; // Yellow racing centerline
  ctx.lineWidth = 8;
  ctx.beginPath();
  ctx.roundRect(390, 390, 1268, 1268, 115);
  ctx.stroke();
  ctx.setLineDash([]); // Reset

  // Start / Finish Line (Chequered pattern)
  const sfX = 1024 - 150;
  const sfY = 240;
  const squareSize = 30;
  for (let row = 0; row < 5; row++) {
    for (let col = 0; col < 10; col++) {
      ctx.fillStyle = (row + col) % 2 === 0 ? '#FFFFFF' : '#000000';
      ctx.fillRect(sfX + col * squareSize, sfY + row * squareSize, squareSize, squareSize);
    }
  }

  // Chicane Slalom Markers & Arrows
  ctx.fillStyle = '#38BDF8';
  ctx.font = 'bold 44px monospace';
  ctx.textAlign = 'center';
  ctx.fillText('A5X ROBOTICS AUTONOMY TRACK', 1024, 760);
  ctx.font = '28px monospace';
  ctx.fillText('SLAM TEST • CHICANE • OBSTACLE AVOIDANCE', 1024, 820);
  ctx.fillText('START / FINISH', 1024, 180);

  const texture = new THREE.CanvasTexture(canvas);
  textureCache.set(key, texture);
  return texture;
}

/**
 * =========================================================================
 * REVISION 17: ROBOTICS ARENA BAY DEDICATED HIGH-RES TEXTURES
 * =========================================================================
 */

/**
 * 1. Back Wall Hexagonal Blue LED Frame Banner (2048 x 768)
 * Features robot icon, "Robotics Arena", and 4 line-style icon columns:
 * 1. Robo Race (chequered flag) | 2. Robo Soccer (ball) | 3. Line Follower (squiggle) | 4. Obstacle Challenge (cube)
 */

/**
 * =========================================================================
 * REVISION 17: ROBOTICS ARENA BAY DEDICATED HIGH-RES TEXTURES
 * =========================================================================
 */

/**
 * 1. Back Wall Hexagonal Blue LED Frame Banner (2048 x 768)
 * Features robot icon, "Robotics Arena", and 4 line-style icon columns:
 * 1. Robo Race (chequered flag) | 2. Robo Soccer (ball) | 3. Line Follower (squiggle) | 4. Obstacle Challenge (cube)
 */
export function getRoboticsHexBannerTexture() {
  const key = 'gamma-robotics-hex-banner';
  if (textureCache.has(key)) return textureCache.get(key);

  const canvas = document.createElement('canvas');
  canvas.width = 2048;
  canvas.height = 768;
  const ctx = canvas.getContext('2d');

  // Deep Navy Background
  ctx.fillStyle = '#071B3A';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Outer Electric Blue Border
  ctx.strokeStyle = '#1677FF';
  ctx.lineWidth = 14;
  ctx.strokeRect(20, 20, canvas.width - 40, canvas.height - 40);

  // Top Section: Robot Icon + "Robotics Arena"
  ctx.save();
  // Robot head icon (line style, white & cyan)
  const rx = 820;
  const ry = 140;
  ctx.strokeStyle = '#38BDF8';
  ctx.lineWidth = 8;
  ctx.beginPath();
  ctx.roundRect(rx, ry - 50, 90, 75, 16);
  ctx.stroke();
  // Antennae
  ctx.beginPath();
  ctx.moveTo(rx + 45, ry - 50); ctx.lineTo(rx + 45, ry - 75);
  ctx.stroke();
  ctx.fillStyle = '#38BDF8';
  ctx.beginPath(); ctx.arc(rx + 45, ry - 78, 8, 0, Math.PI * 2); ctx.fill();
  // Eyes & smile
  ctx.beginPath(); ctx.arc(rx + 28, ry - 18, 7, 0, Math.PI * 2); ctx.fill();
  ctx.beginPath(); ctx.arc(rx + 62, ry - 18, 7, 0, Math.PI * 2); ctx.fill();
  ctx.beginPath(); ctx.arc(rx + 45, ry - 5, 18, 0.2 * Math.PI, 0.8 * Math.PI); ctx.stroke();
  ctx.restore();

  // Header Title
  ctx.fillStyle = '#FFFFFF';
  ctx.font = 'bold 76px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto';
  ctx.textAlign = 'left';
  ctx.fillText('Robotics Arena', 950, 162);

  // Horizontal divider under header
  ctx.strokeStyle = 'rgba(255, 255, 255, 0.2)';
  ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.moveTo(100, 220);
  ctx.lineTo(canvas.width - 100, 220);
  ctx.stroke();

  // 4 Icon Columns (Width ~440px each, centers: 290, 770, 1270, 1750)
  const colCenters = [290, 770, 1270, 1750];
  const colTitles = ['Robo Race', 'Robo Soccer', 'Line Follower', 'Obstacle Challenge'];

  // Vertical dividers between columns
  ctx.strokeStyle = 'rgba(255, 255, 255, 0.15)';
  ctx.lineWidth = 2;
  [530, 1020, 1510].forEach((vx) => {
    ctx.beginPath();
    ctx.moveTo(vx, 250);
    ctx.lineTo(vx, canvas.height - 80);
    ctx.stroke();
  });

  // Render each column's line-style icon and title
  colCenters.forEach((cx, idx) => {
    const cy = 420;
    ctx.save();
    ctx.strokeStyle = '#FFFFFF';
    ctx.fillStyle = '#FFFFFF';
    ctx.lineWidth = 7;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';

    if (idx === 0) {
      // 1. Robo Race: Chequered Flag line art
      ctx.beginPath();
      ctx.moveTo(cx - 45, cy + 60); ctx.lineTo(cx - 45, cy - 65);
      ctx.stroke();
      ctx.strokeRect(cx - 45, cy - 65, 95, 65);
      // Chequered tiles
      for (let r = 0; r < 3; r++) {
        for (let c = 0; c < 3; c++) {
          if ((r + c) % 2 === 0) {
            ctx.fillRect(cx - 45 + c * 31.6, cy - 65 + r * 21.6, 31.6, 21.6);
          }
        }
      }
    } else if (idx === 1) {
      // 2. Robo Soccer: Ball with hexagon pattern
      ctx.beginPath();
      ctx.arc(cx, cy, 55, 0, Math.PI * 2);
      ctx.stroke();
      // Center pentagon
      ctx.beginPath();
      for (let a = 0; a < 5; a++) {
        const ang = (a * 2 * Math.PI) / 5 - Math.PI / 2;
        const px = cx + Math.cos(ang) * 22;
        const py = cy + Math.sin(ang) * 22;
        if (a === 0) ctx.moveTo(px, py); else ctx.lineTo(px, py);
      }
      ctx.closePath();
      ctx.fill();
    } else if (idx === 2) {
      // 3. Line Follower: Smooth serpentine / S-curve line
      ctx.beginPath();
      ctx.moveTo(cx - 50, cy + 50);
      ctx.bezierCurveTo(cx - 50, cy, cx, cy, cx, cy - 10);
      ctx.bezierCurveTo(cx, cy - 30, cx + 50, cy - 30, cx + 50, cy - 60);
      ctx.lineWidth = 12;
      ctx.stroke();
    } else {
      // 4. Obstacle Challenge: 3D Wireframe Cube
      const s = 45;
      const off = 22;
      ctx.strokeRect(cx - s - off / 2, cy - s + off / 2, s * 2, s * 2);
      ctx.strokeRect(cx - s + off / 2, cy - s - off / 2, s * 2, s * 2);
      ctx.beginPath();
      ctx.moveTo(cx - s - off / 2, cy - s + off / 2); ctx.lineTo(cx - s + off / 2, cy - s - off / 2);
      ctx.moveTo(cx + s - off / 2, cy - s + off / 2); ctx.lineTo(cx + s + off / 2, cy - s - off / 2);
      ctx.moveTo(cx - s - off / 2, cy + s + off / 2); ctx.lineTo(cx - s + off / 2, cy + s - off / 2);
      ctx.moveTo(cx + s - off / 2, cy + s + off / 2); ctx.lineTo(cx + s + off / 2, cy + s - off / 2);
      ctx.stroke();
    }
    ctx.restore();

    // Column Title
    ctx.fillStyle = '#FFFFFF';
    ctx.font = 'bold 36px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto';
    ctx.textAlign = 'center';
    ctx.fillText(colTitles[idx], cx, cy + 150);
  });

  const texture = new THREE.CanvasTexture(canvas);
  texture.anisotropy = 8;
  textureCache.set(key, texture);
  return texture;
}

/**
 * 2. Robo Soccer Pitch Turf Texture (2048 x 1024)
 * Green synthetic grass with white regulation pitch lines, center circle, penalty boxes
 */
export function getSoccerPitchTexture() {
  const key = 'gamma-soccer-pitch-turf';
  if (textureCache.has(key)) return textureCache.get(key);

  const canvas = document.createElement('canvas');
  canvas.width = 2048;
  canvas.height = 1024;
  const ctx = canvas.getContext('2d');

  // Alternating lawn stripes (green turf)
  const stripeW = 128;
  for (let x = 0; x < canvas.width; x += stripeW) {
    ctx.fillStyle = (x / stripeW) % 2 === 0 ? '#15803D' : '#16A34A';
    ctx.fillRect(x, 0, stripeW, canvas.height);
  }

  // Turf fine grain
  ctx.fillStyle = 'rgba(255, 255, 255, 0.03)';
  for (let i = 0; i < 25000; i++) {
    const rx = Math.random() * canvas.width;
    const ry = Math.random() * canvas.height;
    ctx.fillRect(rx, ry, 2, 2);
  }

  // Regulation White Pitch Markings
  ctx.strokeStyle = '#FFFFFF';
  ctx.lineWidth = 14;

  // Outer Touchlines (Padding 60px)
  const padX = 70;
  const padY = 60;
  const pw = canvas.width - padX * 2;
  const ph = canvas.height - padY * 2;
  ctx.strokeRect(padX, padY, pw, ph);

  // Halfway Line
  const midX = canvas.width / 2;
  ctx.beginPath();
  ctx.moveTo(midX, padY);
  ctx.lineTo(midX, canvas.height - padY);
  ctx.stroke();

  // Center Circle (Radius 160px) & Center Spot
  ctx.beginPath();
  ctx.arc(midX, canvas.height / 2, 160, 0, Math.PI * 2);
  ctx.stroke();
  ctx.fillStyle = '#FFFFFF';
  ctx.beginPath();
  ctx.arc(midX, canvas.height / 2, 12, 0, Math.PI * 2);
  ctx.fill();

  // Left Penalty Box (18-yard box: 340 x 480)
  const pBoxW = 340;
  const pBoxH = 480;
  const pBoxY = (canvas.height - pBoxH) / 2;
  ctx.strokeRect(padX, pBoxY, pBoxW, pBoxH);

  // Left Goal Box (6-yard box: 140 x 260)
  const gBoxW = 140;
  const gBoxH = 260;
  const gBoxY = (canvas.height - gBoxH) / 2;
  ctx.strokeRect(padX, gBoxY, gBoxW, gBoxH);

  // Left Penalty Spot & Arc
  ctx.beginPath(); ctx.arc(padX + 240, canvas.height / 2, 10, 0, Math.PI * 2); ctx.fill();
  ctx.beginPath();
  ctx.arc(padX + 240, canvas.height / 2, 120, -0.28 * Math.PI, 0.28 * Math.PI);
  ctx.stroke();

  // Right Penalty Box
  ctx.strokeRect(canvas.width - padX - pBoxW, pBoxY, pBoxW, pBoxH);

  // Right Goal Box
  ctx.strokeRect(canvas.width - padX - gBoxW, gBoxY, gBoxW, gBoxH);

  // Right Penalty Spot & Arc
  ctx.beginPath(); ctx.arc(canvas.width - padX - 240, canvas.height / 2, 10, 0, Math.PI * 2); ctx.fill();
  ctx.beginPath();
  ctx.arc(canvas.width - padX - 240, canvas.height / 2, 120, 0.72 * Math.PI, 1.28 * Math.PI);
  ctx.stroke();

  // Corner Arcs
  const cr = 45;
  ctx.beginPath(); ctx.arc(padX, padY, cr, 0, Math.PI / 2); ctx.stroke();
  ctx.beginPath(); ctx.arc(padX, canvas.height - padY, cr, -Math.PI / 2, 0); ctx.stroke();
  ctx.beginPath(); ctx.arc(canvas.width - padX, padY, cr, Math.PI / 2, Math.PI); ctx.stroke();
  ctx.beginPath(); ctx.arc(canvas.width - padX, canvas.height - padY, cr, Math.PI, 1.5 * Math.PI); ctx.stroke();

  const texture = new THREE.CanvasTexture(canvas);
  texture.anisotropy = 8;
  textureCache.set(key, texture);
  return texture;
}

/**
 * 3. Robo Race Track Surface Texture (2048 x 2048)
 * Dark asphalt track with red/white kerbs, green grass infield patches, white lane lines
 */
export function getRoboRaceTrackTexture() {
  const key = 'gamma-robo-race-track';
  if (textureCache.has(key)) return textureCache.get(key);

  const canvas = document.createElement('canvas');
  canvas.width = 2048;
  canvas.height = 2048;
  const ctx = canvas.getContext('2d');

  // Dark Asphalt Background
  ctx.fillStyle = '#1A1E24';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Asphalt grain noise
  ctx.fillStyle = 'rgba(255, 255, 255, 0.02)';
  for (let i = 0; i < 30000; i++) {
    const rx = Math.random() * canvas.width;
    const ry = Math.random() * canvas.height;
    ctx.fillRect(rx, ry, 2, 2);
  }

  // Green Infield Grass Islands
  ctx.fillStyle = '#15803D';
  // Central Island
  ctx.beginPath();
  ctx.roundRect(700, 700, 648, 648, 120);
  ctx.fill();
  ctx.strokeStyle = '#16A34A';
  ctx.lineWidth = 14;
  ctx.stroke();

  // Corner Grass Insets
  ctx.beginPath();
  ctx.arc(350, 350, 160, 0, Math.PI * 2); ctx.fill();
  ctx.beginPath();
  ctx.arc(1698, 350, 160, 0, Math.PI * 2); ctx.fill();
  ctx.beginPath();
  ctx.arc(350, 1698, 160, 0, Math.PI * 2); ctx.fill();
  ctx.beginPath();
  ctx.arc(1698, 1698, 160, 0, Math.PI * 2); ctx.fill();

  // White Outer & Inner Track Boundaries
  ctx.strokeStyle = '#FFFFFF';
  ctx.lineWidth = 16;
  ctx.beginPath();
  ctx.roundRect(240, 240, 1568, 1568, 180);
  ctx.stroke();

  ctx.beginPath();
  ctx.roundRect(620, 620, 808, 808, 140);
  ctx.stroke();

  // Dashed Centerline
  ctx.setLineDash([48, 48]);
  ctx.strokeStyle = '#FFFFFF';
  ctx.lineWidth = 10;
  ctx.beginPath();
  ctx.roundRect(430, 430, 1188, 1188, 160);
  ctx.stroke();
  ctx.setLineDash([]); // Reset

  // Red & White Kerbs at Corners
  const drawKerb = (cx, cy, r, startAng, endAng) => {
    const segments = 10;
    const step = (endAng - startAng) / segments;
    for (let s = 0; s < segments; s++) {
      ctx.strokeStyle = s % 2 === 0 ? '#EF4444' : '#FFFFFF';
      ctx.lineWidth = 28;
      ctx.beginPath();
      ctx.arc(cx, cy, r, startAng + s * step, startAng + (s + 1) * step);
      ctx.stroke();
    }
  };

  drawKerb(420, 420, 200, Math.PI, 1.5 * Math.PI);
  drawKerb(1628, 420, 200, 1.5 * Math.PI, 2 * Math.PI);
  drawKerb(1628, 1628, 200, 0, 0.5 * Math.PI);
  drawKerb(420, 1628, 200, 0.5 * Math.PI, Math.PI);

  // START / FINISH Chequered Line
  const sfX = 850;
  const sfY = 1430;
  const tileSize = 38;
  for (let r = 0; r < 4; r++) {
    for (let c = 0; c < 9; c++) {
      ctx.fillStyle = (r + c) % 2 === 0 ? '#FFFFFF' : '#000000';
      ctx.fillRect(sfX + c * tileSize, sfY + r * tileSize, tileSize, tileSize);
    }
  }

  // Yellow & Black Hazard Rim Trim
  const hzSize = 32;
  for (let i = 0; i < canvas.width; i += hzSize * 2) {
    ctx.fillStyle = '#FACC15';
    ctx.fillRect(i, 0, hzSize, 28);
    ctx.fillRect(i, canvas.height - 28, hzSize, 28);
    ctx.fillStyle = '#0F172A';
    ctx.fillRect(i + hzSize, 0, hzSize, 28);
    ctx.fillRect(i + hzSize, canvas.height - 28, hzSize, 28);
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.anisotropy = 8;
  textureCache.set(key, texture);
  return texture;
}

/**
 * 4. Line Follower Arena Track Texture (2048 x 2048)
 * Clean white melamine board with winding continuous black tracking line and hazard border
 */
export function getLineFollowerTrackTexture() {
  const key = 'gamma-line-follower-track';
  if (textureCache.has(key)) return textureCache.get(key);

  const canvas = document.createElement('canvas');
  canvas.width = 2048;
  canvas.height = 2048;
  const ctx = canvas.getContext('2d');

  // Clean White Surface
  ctx.fillStyle = '#F8FAFC';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Perimeter Hazard Stripe Border (Yellow & Black)
  const bW = 32;
  for (let x = 0; x < canvas.width; x += bW * 2) {
    ctx.fillStyle = '#FACC15';
    ctx.fillRect(x, 0, bW, 36);
    ctx.fillRect(x, canvas.height - 36, bW, 36);
    ctx.fillStyle = '#0F172A';
    ctx.fillRect(x + bW, 0, bW, 36);
    ctx.fillRect(x + bW, canvas.height - 36, bW, 36);
  }
  for (let y = 0; y < canvas.height; y += bW * 2) {
    ctx.fillStyle = '#FACC15';
    ctx.fillRect(0, y, 36, bW);
    ctx.fillRect(canvas.width - 36, y, 36, bW);
    ctx.fillStyle = '#0F172A';
    ctx.fillRect(0, y + bW, 36, bW);
    ctx.fillRect(canvas.width - 36, y + bW, 36, bW);
  }

  // Obstacle Landing Pads (two dark grey rectangular areas)
  ctx.fillStyle = '#1E293B';
  ctx.fillRect(320, 840, 360, 200);
  ctx.fillRect(1368, 520, 360, 200);

  // Smooth Continuous Serpentine Black Line (32px wide)
  ctx.strokeStyle = '#0F172A';
  ctx.lineWidth = 36;
  ctx.lineCap = 'round';
  ctx.lineJoin = 'round';

  ctx.beginPath();
  // Winding serpentine loop across the board matching the reference render:
  ctx.moveTo(340, 340);
  ctx.bezierCurveTo(900, 340, 1100, 480, 1100, 720);
  ctx.bezierCurveTo(1100, 960, 600, 960, 600, 1200);
  ctx.bezierCurveTo(600, 1440, 1200, 1440, 1200, 1680);
  ctx.bezierCurveTo(1200, 1850, 850, 1850, 500, 1720);
  ctx.bezierCurveTo(240, 1600, 240, 1280, 450, 1100);
  ctx.bezierCurveTo(700, 900, 1550, 1100, 1700, 1350);
  ctx.bezierCurveTo(1850, 1600, 1850, 850, 1550, 650);
  ctx.bezierCurveTo(1300, 480, 600, 480, 340, 340);
  ctx.stroke();

  // Calibration markers
  ctx.fillStyle = '#1677FF';
  ctx.beginPath(); ctx.arc(340, 340, 24, 0, Math.PI * 2); ctx.fill();
  ctx.fillStyle = '#FFFFFF';
  ctx.font = 'bold 22px monospace';
  ctx.textAlign = 'center';
  ctx.fillText('START', 340, 395);

  const texture = new THREE.CanvasTexture(canvas);
  texture.anisotropy = 8;
  textureCache.set(key, texture);
  return texture;
}

/**
 * 5. Platform Skirt Textures with Glowing Cyan Bottom Bar
 */
export function getRoboSoccerSkirtTexture() {
  const key = 'gamma-soccer-skirt';
  if (textureCache.has(key)) return textureCache.get(key);

  const canvas = document.createElement('canvas');
  canvas.width = 1024;
  canvas.height = 128;
  const ctx = canvas.getContext('2d');

  ctx.fillStyle = '#071B3A';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Glowing Cyan Bottom Strip
  ctx.fillStyle = '#00D2FF';
  ctx.fillRect(0, canvas.height - 14, canvas.width, 14);

  // Text: "⚽ Robo Soccer Arena"
  ctx.fillStyle = '#FFFFFF';
  ctx.font = 'bold 44px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto';
  ctx.textAlign = 'center';
  ctx.fillText('⚽  Robo Soccer Arena', canvas.width / 2, 75);

  const texture = new THREE.CanvasTexture(canvas);
  textureCache.set(key, texture);
  return texture;
}

export function getRoboRaceSkirtTexture() {
  const key = 'gamma-race-skirt';
  if (textureCache.has(key)) return textureCache.get(key);

  const canvas = document.createElement('canvas');
  canvas.width = 1024;
  canvas.height = 128;
  const ctx = canvas.getContext('2d');

  ctx.fillStyle = '#071B3A';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Glowing Cyan Bottom Strip
  ctx.fillStyle = '#00D2FF';
  ctx.fillRect(0, canvas.height - 14, canvas.width, 14);

  // Slanted Race Stripes on Left & Right
  ctx.fillStyle = 'rgba(255, 255, 255, 0.4)';
  [-40, -15, 10].forEach((ox) => {
    ctx.beginPath();
    ctx.moveTo(140 + ox, 30);
    ctx.lineTo(165 + ox, 30);
    ctx.lineTo(135 + ox, 95);
    ctx.lineTo(110 + ox, 95);
    ctx.fill();

    ctx.beginPath();
    ctx.moveTo(canvas.width - 140 + ox, 30);
    ctx.lineTo(canvas.width - 115 + ox, 30);
    ctx.lineTo(canvas.width - 145 + ox, 95);
    ctx.lineTo(canvas.width - 170 + ox, 95);
    ctx.fill();
  });

  // Text: "🏁 Robo Race Arena"
  ctx.fillStyle = '#FFFFFF';
  ctx.font = 'bold 44px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto';
  ctx.textAlign = 'center';
  ctx.fillText('🏁  Robo Race Arena', canvas.width / 2, 75);

  const texture = new THREE.CanvasTexture(canvas);
  textureCache.set(key, texture);
  return texture;
}

export function getLineFollowerSkirtTexture() {
  const key = 'gamma-line-skirt';
  if (textureCache.has(key)) return textureCache.get(key);

  const canvas = document.createElement('canvas');
  canvas.width = 1024;
  canvas.height = 128;
  const ctx = canvas.getContext('2d');

  ctx.fillStyle = '#071B3A';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Glowing Cyan Bottom Strip
  ctx.fillStyle = '#00D2FF';
  ctx.fillRect(0, canvas.height - 14, canvas.width, 14);

  // Text: "∿ Line Follower Arena"
  ctx.fillStyle = '#FFFFFF';
  ctx.font = 'bold 44px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto';
  ctx.textAlign = 'center';
  ctx.fillText('∿  Line Follower Arena', canvas.width / 2, 75);

  const texture = new THREE.CanvasTexture(canvas);
  textureCache.set(key, texture);
  return texture;
}

/**
 * 6. START / FINISH Gantry Overhead Banner Texture
 */
export function getStartFinishBannerTexture() {
  const key = 'gamma-start-finish-banner';
  if (textureCache.has(key)) return textureCache.get(key);

  const canvas = document.createElement('canvas');
  canvas.width = 1024;
  canvas.height = 180;
  const ctx = canvas.getContext('2d');

  ctx.fillStyle = '#0F172A';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Chequered Flag Left & Right Blocks
  const ts = 25;
  for (let r = 0; r < Math.floor(canvas.height / ts); r++) {
    for (let c = 0; c < 7; c++) {
      ctx.fillStyle = (r + c) % 2 === 0 ? '#FFFFFF' : '#000000';
      ctx.fillRect(c * ts, r * ts, ts, ts);
      ctx.fillRect(canvas.width - (c + 1) * ts, r * ts, ts, ts);
    }
  }

  // Central Text
  ctx.fillStyle = '#FFFFFF';
  ctx.font = 'bold 52px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto';
  ctx.textAlign = 'center';
  ctx.fillText('START / FINISH', canvas.width / 2, 110);

  const texture = new THREE.CanvasTexture(canvas);
  textureCache.set(key, texture);
  return texture;
}

/**
 * 7. Neon A5X Sign Texture for Right Glass Wall
 */
export function getA5XNeonSignTexture() {
  const key = 'gamma-a5x-neon-sign';
  if (textureCache.has(key)) return textureCache.get(key);

  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 256;
  const ctx = canvas.getContext('2d');

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Blue Neon Glow
  ctx.shadowColor = '#00D2FF';
  ctx.shadowBlur = 24;
  ctx.fillStyle = '#FFFFFF';
  ctx.font = '900 120px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto';
  ctx.textAlign = 'center';
  ctx.fillText('A5X', canvas.width / 2, 170);

  const texture = new THREE.CanvasTexture(canvas);
  textureCache.set(key, texture);
  return texture;
}


export function getGammaCuttingMatTexture() {
  const key = 'gamma-cutting-mat';
  if (textureCache.has(key)) return textureCache.get(key);

  const canvas = document.createElement('canvas');
  canvas.width = 1024;
  canvas.height = 640;
  const ctx = canvas.getContext('2d');

  // Royal Blue ESD Mat
  ctx.fillStyle = '#1D4ED8';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // White 10mm grid lines
  ctx.strokeStyle = 'rgba(255, 255, 255, 0.3)';
  ctx.lineWidth = 1;
  for (let x = 0; x < canvas.width; x += 32) {
    ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, canvas.height); ctx.stroke();
  }
  for (let y = 0; y < canvas.height; y += 32) {
    ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(canvas.width, y); ctx.stroke();
  }

  // Border & Angle lines
  ctx.strokeStyle = '#FFFFFF';
  ctx.lineWidth = 2;
  ctx.strokeRect(16, 16, canvas.width - 32, canvas.height - 32);

  ctx.beginPath();
  ctx.moveTo(canvas.width / 2, canvas.height / 2);
  ctx.lineTo(canvas.width / 2 + 200, canvas.height / 2 - 200);
  ctx.stroke();

  ctx.fillStyle = '#FFFFFF';
  ctx.font = 'bold 16px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto';
  ctx.fillText('A5X PRECISION ESD WORK MAT', 30, 45);

  const texture = new THREE.CanvasTexture(canvas);
  textureCache.set(key, texture);
  return texture;
}

/**
 * =========================================================================
 * REVISION 17: ROBOTICS ARENA BAY DEDICATED HIGH-RES TEXTURES
 * =========================================================================
 */

/**
 * 1. Back Wall Hexagonal Blue LED Frame Banner (2048 x 768)
 * Features robot icon, "Robotics Arena", and 4 line-style icon columns:
 * 1. Robo Race (chequered flag) | 2. Robo Soccer (ball) | 3. Line Follower (squiggle) | 4. Obstacle Challenge (cube)
 */

/**
 * =========================================================================
 * REVISION 17: ROBOTICS ARENA BAY DEDICATED HIGH-RES TEXTURES
 * =========================================================================
 */

/**
 * 1. Back Wall Hexagonal Blue LED Frame Banner (2048 x 768)
 * Features robot icon, "Robotics Arena", and 4 line-style icon columns:
 * 1. Robo Race (chequered flag) | 2. Robo Soccer (ball) | 3. Line Follower (squiggle) | 4. Obstacle Challenge (cube)
 */
export function getRoboticsHexBannerTexture() {
  const key = 'gamma-robotics-hex-banner';
  if (textureCache.has(key)) return textureCache.get(key);

  const canvas = document.createElement('canvas');
  canvas.width = 2048;
  canvas.height = 768;
  const ctx = canvas.getContext('2d');

  // Deep Navy Background
  ctx.fillStyle = '#071B3A';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Outer Electric Blue Border
  ctx.strokeStyle = '#1677FF';
  ctx.lineWidth = 14;
  ctx.strokeRect(20, 20, canvas.width - 40, canvas.height - 40);

  // Top Section: Robot Icon + "Robotics Arena"
  ctx.save();
  // Robot head icon (line style, white & cyan)
  const rx = 820;
  const ry = 140;
  ctx.strokeStyle = '#38BDF8';
  ctx.lineWidth = 8;
  ctx.beginPath();
  ctx.roundRect(rx, ry - 50, 90, 75, 16);
  ctx.stroke();
  // Antennae
  ctx.beginPath();
  ctx.moveTo(rx + 45, ry - 50); ctx.lineTo(rx + 45, ry - 75);
  ctx.stroke();
  ctx.fillStyle = '#38BDF8';
  ctx.beginPath(); ctx.arc(rx + 45, ry - 78, 8, 0, Math.PI * 2); ctx.fill();
  // Eyes & smile
  ctx.beginPath(); ctx.arc(rx + 28, ry - 18, 7, 0, Math.PI * 2); ctx.fill();
  ctx.beginPath(); ctx.arc(rx + 62, ry - 18, 7, 0, Math.PI * 2); ctx.fill();
  ctx.beginPath(); ctx.arc(rx + 45, ry - 5, 18, 0.2 * Math.PI, 0.8 * Math.PI); ctx.stroke();
  ctx.restore();

  // Header Title
  ctx.fillStyle = '#FFFFFF';
  ctx.font = 'bold 76px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto';
  ctx.textAlign = 'left';
  ctx.fillText('Robotics Arena', 950, 162);

  // Horizontal divider under header
  ctx.strokeStyle = 'rgba(255, 255, 255, 0.2)';
  ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.moveTo(100, 220);
  ctx.lineTo(canvas.width - 100, 220);
  ctx.stroke();

  // 4 Icon Columns (Width ~440px each, centers: 290, 770, 1270, 1750)
  const colCenters = [290, 770, 1270, 1750];
  const colTitles = ['Robo Race', 'Robo Soccer', 'Line Follower', 'Obstacle Challenge'];

  // Vertical dividers between columns
  ctx.strokeStyle = 'rgba(255, 255, 255, 0.15)';
  ctx.lineWidth = 2;
  [530, 1020, 1510].forEach((vx) => {
    ctx.beginPath();
    ctx.moveTo(vx, 250);
    ctx.lineTo(vx, canvas.height - 80);
    ctx.stroke();
  });

  // Render each column's line-style icon and title
  colCenters.forEach((cx, idx) => {
    const cy = 420;
    ctx.save();
    ctx.strokeStyle = '#FFFFFF';
    ctx.fillStyle = '#FFFFFF';
    ctx.lineWidth = 7;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';

    if (idx === 0) {
      // 1. Robo Race: Chequered Flag line art
      ctx.beginPath();
      ctx.moveTo(cx - 45, cy + 60); ctx.lineTo(cx - 45, cy - 65);
      ctx.stroke();
      ctx.strokeRect(cx - 45, cy - 65, 95, 65);
      // Chequered tiles
      for (let r = 0; r < 3; r++) {
        for (let c = 0; c < 3; c++) {
          if ((r + c) % 2 === 0) {
            ctx.fillRect(cx - 45 + c * 31.6, cy - 65 + r * 21.6, 31.6, 21.6);
          }
        }
      }
    } else if (idx === 1) {
      // 2. Robo Soccer: Ball with hexagon pattern
      ctx.beginPath();
      ctx.arc(cx, cy, 55, 0, Math.PI * 2);
      ctx.stroke();
      // Center pentagon
      ctx.beginPath();
      for (let a = 0; a < 5; a++) {
        const ang = (a * 2 * Math.PI) / 5 - Math.PI / 2;
        const px = cx + Math.cos(ang) * 22;
        const py = cy + Math.sin(ang) * 22;
        if (a === 0) ctx.moveTo(px, py); else ctx.lineTo(px, py);
      }
      ctx.closePath();
      ctx.fill();
    } else if (idx === 2) {
      // 3. Line Follower: Smooth serpentine / S-curve line
      ctx.beginPath();
      ctx.moveTo(cx - 50, cy + 50);
      ctx.bezierCurveTo(cx - 50, cy, cx, cy, cx, cy - 10);
      ctx.bezierCurveTo(cx, cy - 30, cx + 50, cy - 30, cx + 50, cy - 60);
      ctx.lineWidth = 12;
      ctx.stroke();
    } else {
      // 4. Obstacle Challenge: 3D Wireframe Cube
      const s = 45;
      const off = 22;
      ctx.strokeRect(cx - s - off / 2, cy - s + off / 2, s * 2, s * 2);
      ctx.strokeRect(cx - s + off / 2, cy - s - off / 2, s * 2, s * 2);
      ctx.beginPath();
      ctx.moveTo(cx - s - off / 2, cy - s + off / 2); ctx.lineTo(cx - s + off / 2, cy - s - off / 2);
      ctx.moveTo(cx + s - off / 2, cy - s + off / 2); ctx.lineTo(cx + s + off / 2, cy - s - off / 2);
      ctx.moveTo(cx - s - off / 2, cy + s + off / 2); ctx.lineTo(cx - s + off / 2, cy + s - off / 2);
      ctx.moveTo(cx + s - off / 2, cy + s + off / 2); ctx.lineTo(cx + s + off / 2, cy + s - off / 2);
      ctx.stroke();
    }
    ctx.restore();

    // Column Title
    ctx.fillStyle = '#FFFFFF';
    ctx.font = 'bold 36px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto';
    ctx.textAlign = 'center';
    ctx.fillText(colTitles[idx], cx, cy + 150);
  });

  const texture = new THREE.CanvasTexture(canvas);
  texture.anisotropy = 8;
  textureCache.set(key, texture);
  return texture;
}

/**
 * 2. Robo Soccer Pitch Turf Texture (2048 x 1024)
 * Green synthetic grass with white regulation pitch lines, center circle, penalty boxes
 */
export function getSoccerPitchTexture() {
  const key = 'gamma-soccer-pitch-turf';
  if (textureCache.has(key)) return textureCache.get(key);

  const canvas = document.createElement('canvas');
  canvas.width = 2048;
  canvas.height = 1024;
  const ctx = canvas.getContext('2d');

  // Alternating lawn stripes (green turf)
  const stripeW = 128;
  for (let x = 0; x < canvas.width; x += stripeW) {
    ctx.fillStyle = (x / stripeW) % 2 === 0 ? '#15803D' : '#16A34A';
    ctx.fillRect(x, 0, stripeW, canvas.height);
  }

  // Turf fine grain
  ctx.fillStyle = 'rgba(255, 255, 255, 0.03)';
  for (let i = 0; i < 25000; i++) {
    const rx = Math.random() * canvas.width;
    const ry = Math.random() * canvas.height;
    ctx.fillRect(rx, ry, 2, 2);
  }

  // Regulation White Pitch Markings
  ctx.strokeStyle = '#FFFFFF';
  ctx.lineWidth = 14;

  // Outer Touchlines (Padding 60px)
  const padX = 70;
  const padY = 60;
  const pw = canvas.width - padX * 2;
  const ph = canvas.height - padY * 2;
  ctx.strokeRect(padX, padY, pw, ph);

  // Halfway Line
  const midX = canvas.width / 2;
  ctx.beginPath();
  ctx.moveTo(midX, padY);
  ctx.lineTo(midX, canvas.height - padY);
  ctx.stroke();

  // Center Circle (Radius 160px) & Center Spot
  ctx.beginPath();
  ctx.arc(midX, canvas.height / 2, 160, 0, Math.PI * 2);
  ctx.stroke();
  ctx.fillStyle = '#FFFFFF';
  ctx.beginPath();
  ctx.arc(midX, canvas.height / 2, 12, 0, Math.PI * 2);
  ctx.fill();

  // Left Penalty Box (18-yard box: 340 x 480)
  const pBoxW = 340;
  const pBoxH = 480;
  const pBoxY = (canvas.height - pBoxH) / 2;
  ctx.strokeRect(padX, pBoxY, pBoxW, pBoxH);

  // Left Goal Box (6-yard box: 140 x 260)
  const gBoxW = 140;
  const gBoxH = 260;
  const gBoxY = (canvas.height - gBoxH) / 2;
  ctx.strokeRect(padX, gBoxY, gBoxW, gBoxH);

  // Left Penalty Spot & Arc
  ctx.beginPath(); ctx.arc(padX + 240, canvas.height / 2, 10, 0, Math.PI * 2); ctx.fill();
  ctx.beginPath();
  ctx.arc(padX + 240, canvas.height / 2, 120, -0.28 * Math.PI, 0.28 * Math.PI);
  ctx.stroke();

  // Right Penalty Box
  ctx.strokeRect(canvas.width - padX - pBoxW, pBoxY, pBoxW, pBoxH);

  // Right Goal Box
  ctx.strokeRect(canvas.width - padX - gBoxW, gBoxY, gBoxW, gBoxH);

  // Right Penalty Spot & Arc
  ctx.beginPath(); ctx.arc(canvas.width - padX - 240, canvas.height / 2, 10, 0, Math.PI * 2); ctx.fill();
  ctx.beginPath();
  ctx.arc(canvas.width - padX - 240, canvas.height / 2, 120, 0.72 * Math.PI, 1.28 * Math.PI);
  ctx.stroke();

  // Corner Arcs
  const cr = 45;
  ctx.beginPath(); ctx.arc(padX, padY, cr, 0, Math.PI / 2); ctx.stroke();
  ctx.beginPath(); ctx.arc(padX, canvas.height - padY, cr, -Math.PI / 2, 0); ctx.stroke();
  ctx.beginPath(); ctx.arc(canvas.width - padX, padY, cr, Math.PI / 2, Math.PI); ctx.stroke();
  ctx.beginPath(); ctx.arc(canvas.width - padX, canvas.height - padY, cr, Math.PI, 1.5 * Math.PI); ctx.stroke();

  const texture = new THREE.CanvasTexture(canvas);
  texture.anisotropy = 8;
  textureCache.set(key, texture);
  return texture;
}

/**
 * 3. Robo Race Track Surface Texture (2048 x 2048)
 * Dark asphalt track with red/white kerbs, green grass infield patches, white lane lines
 */
export function getRoboRaceTrackTexture() {
  const key = 'gamma-robo-race-track';
  if (textureCache.has(key)) return textureCache.get(key);

  const canvas = document.createElement('canvas');
  canvas.width = 2048;
  canvas.height = 2048;
  const ctx = canvas.getContext('2d');

  // Dark Asphalt Background
  ctx.fillStyle = '#1A1E24';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Asphalt grain noise
  ctx.fillStyle = 'rgba(255, 255, 255, 0.02)';
  for (let i = 0; i < 30000; i++) {
    const rx = Math.random() * canvas.width;
    const ry = Math.random() * canvas.height;
    ctx.fillRect(rx, ry, 2, 2);
  }

  // Green Infield Grass Islands
  ctx.fillStyle = '#15803D';
  // Central Island
  ctx.beginPath();
  ctx.roundRect(700, 700, 648, 648, 120);
  ctx.fill();
  ctx.strokeStyle = '#16A34A';
  ctx.lineWidth = 14;
  ctx.stroke();

  // Corner Grass Insets
  ctx.beginPath();
  ctx.arc(350, 350, 160, 0, Math.PI * 2); ctx.fill();
  ctx.beginPath();
  ctx.arc(1698, 350, 160, 0, Math.PI * 2); ctx.fill();
  ctx.beginPath();
  ctx.arc(350, 1698, 160, 0, Math.PI * 2); ctx.fill();
  ctx.beginPath();
  ctx.arc(1698, 1698, 160, 0, Math.PI * 2); ctx.fill();

  // White Outer & Inner Track Boundaries
  ctx.strokeStyle = '#FFFFFF';
  ctx.lineWidth = 16;
  ctx.beginPath();
  ctx.roundRect(240, 240, 1568, 1568, 180);
  ctx.stroke();

  ctx.beginPath();
  ctx.roundRect(620, 620, 808, 808, 140);
  ctx.stroke();

  // Dashed Centerline
  ctx.setLineDash([48, 48]);
  ctx.strokeStyle = '#FFFFFF';
  ctx.lineWidth = 10;
  ctx.beginPath();
  ctx.roundRect(430, 430, 1188, 1188, 160);
  ctx.stroke();
  ctx.setLineDash([]); // Reset

  // Red & White Kerbs at Corners
  const drawKerb = (cx, cy, r, startAng, endAng) => {
    const segments = 10;
    const step = (endAng - startAng) / segments;
    for (let s = 0; s < segments; s++) {
      ctx.strokeStyle = s % 2 === 0 ? '#EF4444' : '#FFFFFF';
      ctx.lineWidth = 28;
      ctx.beginPath();
      ctx.arc(cx, cy, r, startAng + s * step, startAng + (s + 1) * step);
      ctx.stroke();
    }
  };

  drawKerb(420, 420, 200, Math.PI, 1.5 * Math.PI);
  drawKerb(1628, 420, 200, 1.5 * Math.PI, 2 * Math.PI);
  drawKerb(1628, 1628, 200, 0, 0.5 * Math.PI);
  drawKerb(420, 1628, 200, 0.5 * Math.PI, Math.PI);

  // START / FINISH Chequered Line
  const sfX = 850;
  const sfY = 1430;
  const tileSize = 38;
  for (let r = 0; r < 4; r++) {
    for (let c = 0; c < 9; c++) {
      ctx.fillStyle = (r + c) % 2 === 0 ? '#FFFFFF' : '#000000';
      ctx.fillRect(sfX + c * tileSize, sfY + r * tileSize, tileSize, tileSize);
    }
  }

  // Yellow & Black Hazard Rim Trim
  const hzSize = 32;
  for (let i = 0; i < canvas.width; i += hzSize * 2) {
    ctx.fillStyle = '#FACC15';
    ctx.fillRect(i, 0, hzSize, 28);
    ctx.fillRect(i, canvas.height - 28, hzSize, 28);
    ctx.fillStyle = '#0F172A';
    ctx.fillRect(i + hzSize, 0, hzSize, 28);
    ctx.fillRect(i + hzSize, canvas.height - 28, hzSize, 28);
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.anisotropy = 8;
  textureCache.set(key, texture);
  return texture;
}

/**
 * 4. Line Follower Arena Track Texture (2048 x 2048)
 * Clean white melamine board with winding continuous black tracking line and hazard border
 */
export function getLineFollowerTrackTexture() {
  const key = 'gamma-line-follower-track';
  if (textureCache.has(key)) return textureCache.get(key);

  const canvas = document.createElement('canvas');
  canvas.width = 2048;
  canvas.height = 2048;
  const ctx = canvas.getContext('2d');

  // Clean White Surface
  ctx.fillStyle = '#F8FAFC';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Perimeter Hazard Stripe Border (Yellow & Black)
  const bW = 32;
  for (let x = 0; x < canvas.width; x += bW * 2) {
    ctx.fillStyle = '#FACC15';
    ctx.fillRect(x, 0, bW, 36);
    ctx.fillRect(x, canvas.height - 36, bW, 36);
    ctx.fillStyle = '#0F172A';
    ctx.fillRect(x + bW, 0, bW, 36);
    ctx.fillRect(x + bW, canvas.height - 36, bW, 36);
  }
  for (let y = 0; y < canvas.height; y += bW * 2) {
    ctx.fillStyle = '#FACC15';
    ctx.fillRect(0, y, 36, bW);
    ctx.fillRect(canvas.width - 36, y, 36, bW);
    ctx.fillStyle = '#0F172A';
    ctx.fillRect(0, y + bW, 36, bW);
    ctx.fillRect(canvas.width - 36, y + bW, 36, bW);
  }

  // Obstacle Landing Pads (two dark grey rectangular areas)
  ctx.fillStyle = '#1E293B';
  ctx.fillRect(320, 840, 360, 200);
  ctx.fillRect(1368, 520, 360, 200);

  // Smooth Continuous Serpentine Black Line (32px wide)
  ctx.strokeStyle = '#0F172A';
  ctx.lineWidth = 36;
  ctx.lineCap = 'round';
  ctx.lineJoin = 'round';

  ctx.beginPath();
  // Winding serpentine loop across the board matching the reference render:
  ctx.moveTo(340, 340);
  ctx.bezierCurveTo(900, 340, 1100, 480, 1100, 720);
  ctx.bezierCurveTo(1100, 960, 600, 960, 600, 1200);
  ctx.bezierCurveTo(600, 1440, 1200, 1440, 1200, 1680);
  ctx.bezierCurveTo(1200, 1850, 850, 1850, 500, 1720);
  ctx.bezierCurveTo(240, 1600, 240, 1280, 450, 1100);
  ctx.bezierCurveTo(700, 900, 1550, 1100, 1700, 1350);
  ctx.bezierCurveTo(1850, 1600, 1850, 850, 1550, 650);
  ctx.bezierCurveTo(1300, 480, 600, 480, 340, 340);
  ctx.stroke();

  // Calibration markers
  ctx.fillStyle = '#1677FF';
  ctx.beginPath(); ctx.arc(340, 340, 24, 0, Math.PI * 2); ctx.fill();
  ctx.fillStyle = '#FFFFFF';
  ctx.font = 'bold 22px monospace';
  ctx.textAlign = 'center';
  ctx.fillText('START', 340, 395);

  const texture = new THREE.CanvasTexture(canvas);
  texture.anisotropy = 8;
  textureCache.set(key, texture);
  return texture;
}

/**
 * 5. Platform Skirt Textures with Glowing Cyan Bottom Bar
 */
export function getRoboSoccerSkirtTexture() {
  const key = 'gamma-soccer-skirt';
  if (textureCache.has(key)) return textureCache.get(key);

  const canvas = document.createElement('canvas');
  canvas.width = 1024;
  canvas.height = 128;
  const ctx = canvas.getContext('2d');

  ctx.fillStyle = '#071B3A';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Glowing Cyan Bottom Strip
  ctx.fillStyle = '#00D2FF';
  ctx.fillRect(0, canvas.height - 14, canvas.width, 14);

  // Text: "⚽ Robo Soccer Arena"
  ctx.fillStyle = '#FFFFFF';
  ctx.font = 'bold 44px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto';
  ctx.textAlign = 'center';
  ctx.fillText('⚽  Robo Soccer Arena', canvas.width / 2, 75);

  const texture = new THREE.CanvasTexture(canvas);
  textureCache.set(key, texture);
  return texture;
}

export function getRoboRaceSkirtTexture() {
  const key = 'gamma-race-skirt';
  if (textureCache.has(key)) return textureCache.get(key);

  const canvas = document.createElement('canvas');
  canvas.width = 1024;
  canvas.height = 128;
  const ctx = canvas.getContext('2d');

  ctx.fillStyle = '#071B3A';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Glowing Cyan Bottom Strip
  ctx.fillStyle = '#00D2FF';
  ctx.fillRect(0, canvas.height - 14, canvas.width, 14);

  // Slanted Race Stripes on Left & Right
  ctx.fillStyle = 'rgba(255, 255, 255, 0.4)';
  [-40, -15, 10].forEach((ox) => {
    ctx.beginPath();
    ctx.moveTo(140 + ox, 30);
    ctx.lineTo(165 + ox, 30);
    ctx.lineTo(135 + ox, 95);
    ctx.lineTo(110 + ox, 95);
    ctx.fill();

    ctx.beginPath();
    ctx.moveTo(canvas.width - 140 + ox, 30);
    ctx.lineTo(canvas.width - 115 + ox, 30);
    ctx.lineTo(canvas.width - 145 + ox, 95);
    ctx.lineTo(canvas.width - 170 + ox, 95);
    ctx.fill();
  });

  // Text: "🏁 Robo Race Arena"
  ctx.fillStyle = '#FFFFFF';
  ctx.font = 'bold 44px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto';
  ctx.textAlign = 'center';
  ctx.fillText('🏁  Robo Race Arena', canvas.width / 2, 75);

  const texture = new THREE.CanvasTexture(canvas);
  textureCache.set(key, texture);
  return texture;
}

export function getLineFollowerSkirtTexture() {
  const key = 'gamma-line-skirt';
  if (textureCache.has(key)) return textureCache.get(key);

  const canvas = document.createElement('canvas');
  canvas.width = 1024;
  canvas.height = 128;
  const ctx = canvas.getContext('2d');

  ctx.fillStyle = '#071B3A';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Glowing Cyan Bottom Strip
  ctx.fillStyle = '#00D2FF';
  ctx.fillRect(0, canvas.height - 14, canvas.width, 14);

  // Text: "∿ Line Follower Arena"
  ctx.fillStyle = '#FFFFFF';
  ctx.font = 'bold 44px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto';
  ctx.textAlign = 'center';
  ctx.fillText('∿  Line Follower Arena', canvas.width / 2, 75);

  const texture = new THREE.CanvasTexture(canvas);
  textureCache.set(key, texture);
  return texture;
}

/**
 * 6. START / FINISH Gantry Overhead Banner Texture
 */
export function getStartFinishBannerTexture() {
  const key = 'gamma-start-finish-banner';
  if (textureCache.has(key)) return textureCache.get(key);

  const canvas = document.createElement('canvas');
  canvas.width = 1024;
  canvas.height = 180;
  const ctx = canvas.getContext('2d');

  ctx.fillStyle = '#0F172A';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Chequered Flag Left & Right Blocks
  const ts = 25;
  for (let r = 0; r < Math.floor(canvas.height / ts); r++) {
    for (let c = 0; c < 7; c++) {
      ctx.fillStyle = (r + c) % 2 === 0 ? '#FFFFFF' : '#000000';
      ctx.fillRect(c * ts, r * ts, ts, ts);
      ctx.fillRect(canvas.width - (c + 1) * ts, r * ts, ts, ts);
    }
  }

  // Central Text
  ctx.fillStyle = '#FFFFFF';
  ctx.font = 'bold 52px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto';
  ctx.textAlign = 'center';
  ctx.fillText('START / FINISH', canvas.width / 2, 110);

  const texture = new THREE.CanvasTexture(canvas);
  textureCache.set(key, texture);
  return texture;
}

/**
 * 7. Neon A5X Sign Texture for Right Glass Wall
 */
export function getA5XNeonSignTexture() {
  const key = 'gamma-a5x-neon-sign';
  if (textureCache.has(key)) return textureCache.get(key);

  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 256;
  const ctx = canvas.getContext('2d');

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Blue Neon Glow
  ctx.shadowColor = '#00D2FF';
  ctx.shadowBlur = 24;
  ctx.fillStyle = '#FFFFFF';
  ctx.font = '900 120px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto';
  ctx.textAlign = 'center';
  ctx.fillText('A5X', canvas.width / 2, 170);

  const texture = new THREE.CanvasTexture(canvas);
  textureCache.set(key, texture);
  return texture;
}


export function getGammaPrinterH2DTexture() {
  const key = 'gamma-printer-h2d';
  if (textureCache.has(key)) return textureCache.get(key);

  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 320;
  const ctx = canvas.getContext('2d');

  ctx.fillStyle = '#0F172A';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  ctx.fillStyle = '#1E293B';
  ctx.fillRect(10, 10, canvas.width - 20, 50);

  ctx.fillStyle = '#38BDF8';
  ctx.font = 'bold 20px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto';
  ctx.fillText('Bambu Lab H2D Pro', 25, 42);

  ctx.fillStyle = '#F8FAFC';
  ctx.font = '16px monospace';
  ctx.fillText('HOTEND: 260°C / 260°C', 25, 100);
  ctx.fillText('BED:    100°C / 100°C', 25, 135);
  ctx.fillText('CHAMBER: 60°C (ACTIVE)', 25, 170);

  // Progress Bar
  ctx.fillStyle = '#334155';
  ctx.fillRect(25, 210, 460, 24);
  ctx.fillStyle = '#10B981';
  ctx.fillRect(25, 210, 390, 24);

  ctx.fillStyle = '#FFFFFF';
  ctx.font = 'bold 15px monospace';
  ctx.fillText('PRINTING: CF_ROVER_CHASSIS.gcode  [84%]', 25, 275);

  const texture = new THREE.CanvasTexture(canvas);
  textureCache.set(key, texture);
  return texture;
}

/**
 * =========================================================================
 * REVISION 17: ROBOTICS ARENA BAY DEDICATED HIGH-RES TEXTURES
 * =========================================================================
 */

/**
 * 1. Back Wall Hexagonal Blue LED Frame Banner (2048 x 768)
 * Features robot icon, "Robotics Arena", and 4 line-style icon columns:
 * 1. Robo Race (chequered flag) | 2. Robo Soccer (ball) | 3. Line Follower (squiggle) | 4. Obstacle Challenge (cube)
 */

/**
 * =========================================================================
 * REVISION 17: ROBOTICS ARENA BAY DEDICATED HIGH-RES TEXTURES
 * =========================================================================
 */

/**
 * 1. Back Wall Hexagonal Blue LED Frame Banner (2048 x 768)
 * Features robot icon, "Robotics Arena", and 4 line-style icon columns:
 * 1. Robo Race (chequered flag) | 2. Robo Soccer (ball) | 3. Line Follower (squiggle) | 4. Obstacle Challenge (cube)
 */
export function getRoboticsHexBannerTexture() {
  const key = 'gamma-robotics-hex-banner';
  if (textureCache.has(key)) return textureCache.get(key);

  const canvas = document.createElement('canvas');
  canvas.width = 2048;
  canvas.height = 768;
  const ctx = canvas.getContext('2d');

  // Deep Navy Background
  ctx.fillStyle = '#071B3A';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Outer Electric Blue Border
  ctx.strokeStyle = '#1677FF';
  ctx.lineWidth = 14;
  ctx.strokeRect(20, 20, canvas.width - 40, canvas.height - 40);

  // Top Section: Robot Icon + "Robotics Arena"
  ctx.save();
  // Robot head icon (line style, white & cyan)
  const rx = 820;
  const ry = 140;
  ctx.strokeStyle = '#38BDF8';
  ctx.lineWidth = 8;
  ctx.beginPath();
  ctx.roundRect(rx, ry - 50, 90, 75, 16);
  ctx.stroke();
  // Antennae
  ctx.beginPath();
  ctx.moveTo(rx + 45, ry - 50); ctx.lineTo(rx + 45, ry - 75);
  ctx.stroke();
  ctx.fillStyle = '#38BDF8';
  ctx.beginPath(); ctx.arc(rx + 45, ry - 78, 8, 0, Math.PI * 2); ctx.fill();
  // Eyes & smile
  ctx.beginPath(); ctx.arc(rx + 28, ry - 18, 7, 0, Math.PI * 2); ctx.fill();
  ctx.beginPath(); ctx.arc(rx + 62, ry - 18, 7, 0, Math.PI * 2); ctx.fill();
  ctx.beginPath(); ctx.arc(rx + 45, ry - 5, 18, 0.2 * Math.PI, 0.8 * Math.PI); ctx.stroke();
  ctx.restore();

  // Header Title
  ctx.fillStyle = '#FFFFFF';
  ctx.font = 'bold 76px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto';
  ctx.textAlign = 'left';
  ctx.fillText('Robotics Arena', 950, 162);

  // Horizontal divider under header
  ctx.strokeStyle = 'rgba(255, 255, 255, 0.2)';
  ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.moveTo(100, 220);
  ctx.lineTo(canvas.width - 100, 220);
  ctx.stroke();

  // 4 Icon Columns (Width ~440px each, centers: 290, 770, 1270, 1750)
  const colCenters = [290, 770, 1270, 1750];
  const colTitles = ['Robo Race', 'Robo Soccer', 'Line Follower', 'Obstacle Challenge'];

  // Vertical dividers between columns
  ctx.strokeStyle = 'rgba(255, 255, 255, 0.15)';
  ctx.lineWidth = 2;
  [530, 1020, 1510].forEach((vx) => {
    ctx.beginPath();
    ctx.moveTo(vx, 250);
    ctx.lineTo(vx, canvas.height - 80);
    ctx.stroke();
  });

  // Render each column's line-style icon and title
  colCenters.forEach((cx, idx) => {
    const cy = 420;
    ctx.save();
    ctx.strokeStyle = '#FFFFFF';
    ctx.fillStyle = '#FFFFFF';
    ctx.lineWidth = 7;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';

    if (idx === 0) {
      // 1. Robo Race: Chequered Flag line art
      ctx.beginPath();
      ctx.moveTo(cx - 45, cy + 60); ctx.lineTo(cx - 45, cy - 65);
      ctx.stroke();
      ctx.strokeRect(cx - 45, cy - 65, 95, 65);
      // Chequered tiles
      for (let r = 0; r < 3; r++) {
        for (let c = 0; c < 3; c++) {
          if ((r + c) % 2 === 0) {
            ctx.fillRect(cx - 45 + c * 31.6, cy - 65 + r * 21.6, 31.6, 21.6);
          }
        }
      }
    } else if (idx === 1) {
      // 2. Robo Soccer: Ball with hexagon pattern
      ctx.beginPath();
      ctx.arc(cx, cy, 55, 0, Math.PI * 2);
      ctx.stroke();
      // Center pentagon
      ctx.beginPath();
      for (let a = 0; a < 5; a++) {
        const ang = (a * 2 * Math.PI) / 5 - Math.PI / 2;
        const px = cx + Math.cos(ang) * 22;
        const py = cy + Math.sin(ang) * 22;
        if (a === 0) ctx.moveTo(px, py); else ctx.lineTo(px, py);
      }
      ctx.closePath();
      ctx.fill();
    } else if (idx === 2) {
      // 3. Line Follower: Smooth serpentine / S-curve line
      ctx.beginPath();
      ctx.moveTo(cx - 50, cy + 50);
      ctx.bezierCurveTo(cx - 50, cy, cx, cy, cx, cy - 10);
      ctx.bezierCurveTo(cx, cy - 30, cx + 50, cy - 30, cx + 50, cy - 60);
      ctx.lineWidth = 12;
      ctx.stroke();
    } else {
      // 4. Obstacle Challenge: 3D Wireframe Cube
      const s = 45;
      const off = 22;
      ctx.strokeRect(cx - s - off / 2, cy - s + off / 2, s * 2, s * 2);
      ctx.strokeRect(cx - s + off / 2, cy - s - off / 2, s * 2, s * 2);
      ctx.beginPath();
      ctx.moveTo(cx - s - off / 2, cy - s + off / 2); ctx.lineTo(cx - s + off / 2, cy - s - off / 2);
      ctx.moveTo(cx + s - off / 2, cy - s + off / 2); ctx.lineTo(cx + s + off / 2, cy - s - off / 2);
      ctx.moveTo(cx - s - off / 2, cy + s + off / 2); ctx.lineTo(cx - s + off / 2, cy + s - off / 2);
      ctx.moveTo(cx + s - off / 2, cy + s + off / 2); ctx.lineTo(cx + s + off / 2, cy + s - off / 2);
      ctx.stroke();
    }
    ctx.restore();

    // Column Title
    ctx.fillStyle = '#FFFFFF';
    ctx.font = 'bold 36px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto';
    ctx.textAlign = 'center';
    ctx.fillText(colTitles[idx], cx, cy + 150);
  });

  const texture = new THREE.CanvasTexture(canvas);
  texture.anisotropy = 8;
  textureCache.set(key, texture);
  return texture;
}

/**
 * 2. Robo Soccer Pitch Turf Texture (2048 x 1024)
 * Green synthetic grass with white regulation pitch lines, center circle, penalty boxes
 */
export function getSoccerPitchTexture() {
  const key = 'gamma-soccer-pitch-turf';
  if (textureCache.has(key)) return textureCache.get(key);

  const canvas = document.createElement('canvas');
  canvas.width = 2048;
  canvas.height = 1024;
  const ctx = canvas.getContext('2d');

  // Alternating lawn stripes (green turf)
  const stripeW = 128;
  for (let x = 0; x < canvas.width; x += stripeW) {
    ctx.fillStyle = (x / stripeW) % 2 === 0 ? '#15803D' : '#16A34A';
    ctx.fillRect(x, 0, stripeW, canvas.height);
  }

  // Turf fine grain
  ctx.fillStyle = 'rgba(255, 255, 255, 0.03)';
  for (let i = 0; i < 25000; i++) {
    const rx = Math.random() * canvas.width;
    const ry = Math.random() * canvas.height;
    ctx.fillRect(rx, ry, 2, 2);
  }

  // Regulation White Pitch Markings
  ctx.strokeStyle = '#FFFFFF';
  ctx.lineWidth = 14;

  // Outer Touchlines (Padding 60px)
  const padX = 70;
  const padY = 60;
  const pw = canvas.width - padX * 2;
  const ph = canvas.height - padY * 2;
  ctx.strokeRect(padX, padY, pw, ph);

  // Halfway Line
  const midX = canvas.width / 2;
  ctx.beginPath();
  ctx.moveTo(midX, padY);
  ctx.lineTo(midX, canvas.height - padY);
  ctx.stroke();

  // Center Circle (Radius 160px) & Center Spot
  ctx.beginPath();
  ctx.arc(midX, canvas.height / 2, 160, 0, Math.PI * 2);
  ctx.stroke();
  ctx.fillStyle = '#FFFFFF';
  ctx.beginPath();
  ctx.arc(midX, canvas.height / 2, 12, 0, Math.PI * 2);
  ctx.fill();

  // Left Penalty Box (18-yard box: 340 x 480)
  const pBoxW = 340;
  const pBoxH = 480;
  const pBoxY = (canvas.height - pBoxH) / 2;
  ctx.strokeRect(padX, pBoxY, pBoxW, pBoxH);

  // Left Goal Box (6-yard box: 140 x 260)
  const gBoxW = 140;
  const gBoxH = 260;
  const gBoxY = (canvas.height - gBoxH) / 2;
  ctx.strokeRect(padX, gBoxY, gBoxW, gBoxH);

  // Left Penalty Spot & Arc
  ctx.beginPath(); ctx.arc(padX + 240, canvas.height / 2, 10, 0, Math.PI * 2); ctx.fill();
  ctx.beginPath();
  ctx.arc(padX + 240, canvas.height / 2, 120, -0.28 * Math.PI, 0.28 * Math.PI);
  ctx.stroke();

  // Right Penalty Box
  ctx.strokeRect(canvas.width - padX - pBoxW, pBoxY, pBoxW, pBoxH);

  // Right Goal Box
  ctx.strokeRect(canvas.width - padX - gBoxW, gBoxY, gBoxW, gBoxH);

  // Right Penalty Spot & Arc
  ctx.beginPath(); ctx.arc(canvas.width - padX - 240, canvas.height / 2, 10, 0, Math.PI * 2); ctx.fill();
  ctx.beginPath();
  ctx.arc(canvas.width - padX - 240, canvas.height / 2, 120, 0.72 * Math.PI, 1.28 * Math.PI);
  ctx.stroke();

  // Corner Arcs
  const cr = 45;
  ctx.beginPath(); ctx.arc(padX, padY, cr, 0, Math.PI / 2); ctx.stroke();
  ctx.beginPath(); ctx.arc(padX, canvas.height - padY, cr, -Math.PI / 2, 0); ctx.stroke();
  ctx.beginPath(); ctx.arc(canvas.width - padX, padY, cr, Math.PI / 2, Math.PI); ctx.stroke();
  ctx.beginPath(); ctx.arc(canvas.width - padX, canvas.height - padY, cr, Math.PI, 1.5 * Math.PI); ctx.stroke();

  const texture = new THREE.CanvasTexture(canvas);
  texture.anisotropy = 8;
  textureCache.set(key, texture);
  return texture;
}

/**
 * 3. Robo Race Track Surface Texture (2048 x 2048)
 * Dark asphalt track with red/white kerbs, green grass infield patches, white lane lines
 */
export function getRoboRaceTrackTexture() {
  const key = 'gamma-robo-race-track';
  if (textureCache.has(key)) return textureCache.get(key);

  const canvas = document.createElement('canvas');
  canvas.width = 2048;
  canvas.height = 2048;
  const ctx = canvas.getContext('2d');

  // Dark Asphalt Background
  ctx.fillStyle = '#1A1E24';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Asphalt grain noise
  ctx.fillStyle = 'rgba(255, 255, 255, 0.02)';
  for (let i = 0; i < 30000; i++) {
    const rx = Math.random() * canvas.width;
    const ry = Math.random() * canvas.height;
    ctx.fillRect(rx, ry, 2, 2);
  }

  // Green Infield Grass Islands
  ctx.fillStyle = '#15803D';
  // Central Island
  ctx.beginPath();
  ctx.roundRect(700, 700, 648, 648, 120);
  ctx.fill();
  ctx.strokeStyle = '#16A34A';
  ctx.lineWidth = 14;
  ctx.stroke();

  // Corner Grass Insets
  ctx.beginPath();
  ctx.arc(350, 350, 160, 0, Math.PI * 2); ctx.fill();
  ctx.beginPath();
  ctx.arc(1698, 350, 160, 0, Math.PI * 2); ctx.fill();
  ctx.beginPath();
  ctx.arc(350, 1698, 160, 0, Math.PI * 2); ctx.fill();
  ctx.beginPath();
  ctx.arc(1698, 1698, 160, 0, Math.PI * 2); ctx.fill();

  // White Outer & Inner Track Boundaries
  ctx.strokeStyle = '#FFFFFF';
  ctx.lineWidth = 16;
  ctx.beginPath();
  ctx.roundRect(240, 240, 1568, 1568, 180);
  ctx.stroke();

  ctx.beginPath();
  ctx.roundRect(620, 620, 808, 808, 140);
  ctx.stroke();

  // Dashed Centerline
  ctx.setLineDash([48, 48]);
  ctx.strokeStyle = '#FFFFFF';
  ctx.lineWidth = 10;
  ctx.beginPath();
  ctx.roundRect(430, 430, 1188, 1188, 160);
  ctx.stroke();
  ctx.setLineDash([]); // Reset

  // Red & White Kerbs at Corners
  const drawKerb = (cx, cy, r, startAng, endAng) => {
    const segments = 10;
    const step = (endAng - startAng) / segments;
    for (let s = 0; s < segments; s++) {
      ctx.strokeStyle = s % 2 === 0 ? '#EF4444' : '#FFFFFF';
      ctx.lineWidth = 28;
      ctx.beginPath();
      ctx.arc(cx, cy, r, startAng + s * step, startAng + (s + 1) * step);
      ctx.stroke();
    }
  };

  drawKerb(420, 420, 200, Math.PI, 1.5 * Math.PI);
  drawKerb(1628, 420, 200, 1.5 * Math.PI, 2 * Math.PI);
  drawKerb(1628, 1628, 200, 0, 0.5 * Math.PI);
  drawKerb(420, 1628, 200, 0.5 * Math.PI, Math.PI);

  // START / FINISH Chequered Line
  const sfX = 850;
  const sfY = 1430;
  const tileSize = 38;
  for (let r = 0; r < 4; r++) {
    for (let c = 0; c < 9; c++) {
      ctx.fillStyle = (r + c) % 2 === 0 ? '#FFFFFF' : '#000000';
      ctx.fillRect(sfX + c * tileSize, sfY + r * tileSize, tileSize, tileSize);
    }
  }

  // Yellow & Black Hazard Rim Trim
  const hzSize = 32;
  for (let i = 0; i < canvas.width; i += hzSize * 2) {
    ctx.fillStyle = '#FACC15';
    ctx.fillRect(i, 0, hzSize, 28);
    ctx.fillRect(i, canvas.height - 28, hzSize, 28);
    ctx.fillStyle = '#0F172A';
    ctx.fillRect(i + hzSize, 0, hzSize, 28);
    ctx.fillRect(i + hzSize, canvas.height - 28, hzSize, 28);
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.anisotropy = 8;
  textureCache.set(key, texture);
  return texture;
}

/**
 * 4. Line Follower Arena Track Texture (2048 x 2048)
 * Clean white melamine board with winding continuous black tracking line and hazard border
 */
export function getLineFollowerTrackTexture() {
  const key = 'gamma-line-follower-track';
  if (textureCache.has(key)) return textureCache.get(key);

  const canvas = document.createElement('canvas');
  canvas.width = 2048;
  canvas.height = 2048;
  const ctx = canvas.getContext('2d');

  // Clean White Surface
  ctx.fillStyle = '#F8FAFC';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Perimeter Hazard Stripe Border (Yellow & Black)
  const bW = 32;
  for (let x = 0; x < canvas.width; x += bW * 2) {
    ctx.fillStyle = '#FACC15';
    ctx.fillRect(x, 0, bW, 36);
    ctx.fillRect(x, canvas.height - 36, bW, 36);
    ctx.fillStyle = '#0F172A';
    ctx.fillRect(x + bW, 0, bW, 36);
    ctx.fillRect(x + bW, canvas.height - 36, bW, 36);
  }
  for (let y = 0; y < canvas.height; y += bW * 2) {
    ctx.fillStyle = '#FACC15';
    ctx.fillRect(0, y, 36, bW);
    ctx.fillRect(canvas.width - 36, y, 36, bW);
    ctx.fillStyle = '#0F172A';
    ctx.fillRect(0, y + bW, 36, bW);
    ctx.fillRect(canvas.width - 36, y + bW, 36, bW);
  }

  // Obstacle Landing Pads (two dark grey rectangular areas)
  ctx.fillStyle = '#1E293B';
  ctx.fillRect(320, 840, 360, 200);
  ctx.fillRect(1368, 520, 360, 200);

  // Smooth Continuous Serpentine Black Line (32px wide)
  ctx.strokeStyle = '#0F172A';
  ctx.lineWidth = 36;
  ctx.lineCap = 'round';
  ctx.lineJoin = 'round';

  ctx.beginPath();
  // Winding serpentine loop across the board matching the reference render:
  ctx.moveTo(340, 340);
  ctx.bezierCurveTo(900, 340, 1100, 480, 1100, 720);
  ctx.bezierCurveTo(1100, 960, 600, 960, 600, 1200);
  ctx.bezierCurveTo(600, 1440, 1200, 1440, 1200, 1680);
  ctx.bezierCurveTo(1200, 1850, 850, 1850, 500, 1720);
  ctx.bezierCurveTo(240, 1600, 240, 1280, 450, 1100);
  ctx.bezierCurveTo(700, 900, 1550, 1100, 1700, 1350);
  ctx.bezierCurveTo(1850, 1600, 1850, 850, 1550, 650);
  ctx.bezierCurveTo(1300, 480, 600, 480, 340, 340);
  ctx.stroke();

  // Calibration markers
  ctx.fillStyle = '#1677FF';
  ctx.beginPath(); ctx.arc(340, 340, 24, 0, Math.PI * 2); ctx.fill();
  ctx.fillStyle = '#FFFFFF';
  ctx.font = 'bold 22px monospace';
  ctx.textAlign = 'center';
  ctx.fillText('START', 340, 395);

  const texture = new THREE.CanvasTexture(canvas);
  texture.anisotropy = 8;
  textureCache.set(key, texture);
  return texture;
}

/**
 * 5. Platform Skirt Textures with Glowing Cyan Bottom Bar
 */
export function getRoboSoccerSkirtTexture() {
  const key = 'gamma-soccer-skirt';
  if (textureCache.has(key)) return textureCache.get(key);

  const canvas = document.createElement('canvas');
  canvas.width = 1024;
  canvas.height = 128;
  const ctx = canvas.getContext('2d');

  ctx.fillStyle = '#071B3A';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Glowing Cyan Bottom Strip
  ctx.fillStyle = '#00D2FF';
  ctx.fillRect(0, canvas.height - 14, canvas.width, 14);

  // Text: "⚽ Robo Soccer Arena"
  ctx.fillStyle = '#FFFFFF';
  ctx.font = 'bold 44px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto';
  ctx.textAlign = 'center';
  ctx.fillText('⚽  Robo Soccer Arena', canvas.width / 2, 75);

  const texture = new THREE.CanvasTexture(canvas);
  textureCache.set(key, texture);
  return texture;
}

export function getRoboRaceSkirtTexture() {
  const key = 'gamma-race-skirt';
  if (textureCache.has(key)) return textureCache.get(key);

  const canvas = document.createElement('canvas');
  canvas.width = 1024;
  canvas.height = 128;
  const ctx = canvas.getContext('2d');

  ctx.fillStyle = '#071B3A';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Glowing Cyan Bottom Strip
  ctx.fillStyle = '#00D2FF';
  ctx.fillRect(0, canvas.height - 14, canvas.width, 14);

  // Slanted Race Stripes on Left & Right
  ctx.fillStyle = 'rgba(255, 255, 255, 0.4)';
  [-40, -15, 10].forEach((ox) => {
    ctx.beginPath();
    ctx.moveTo(140 + ox, 30);
    ctx.lineTo(165 + ox, 30);
    ctx.lineTo(135 + ox, 95);
    ctx.lineTo(110 + ox, 95);
    ctx.fill();

    ctx.beginPath();
    ctx.moveTo(canvas.width - 140 + ox, 30);
    ctx.lineTo(canvas.width - 115 + ox, 30);
    ctx.lineTo(canvas.width - 145 + ox, 95);
    ctx.lineTo(canvas.width - 170 + ox, 95);
    ctx.fill();
  });

  // Text: "🏁 Robo Race Arena"
  ctx.fillStyle = '#FFFFFF';
  ctx.font = 'bold 44px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto';
  ctx.textAlign = 'center';
  ctx.fillText('🏁  Robo Race Arena', canvas.width / 2, 75);

  const texture = new THREE.CanvasTexture(canvas);
  textureCache.set(key, texture);
  return texture;
}

export function getLineFollowerSkirtTexture() {
  const key = 'gamma-line-skirt';
  if (textureCache.has(key)) return textureCache.get(key);

  const canvas = document.createElement('canvas');
  canvas.width = 1024;
  canvas.height = 128;
  const ctx = canvas.getContext('2d');

  ctx.fillStyle = '#071B3A';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Glowing Cyan Bottom Strip
  ctx.fillStyle = '#00D2FF';
  ctx.fillRect(0, canvas.height - 14, canvas.width, 14);

  // Text: "∿ Line Follower Arena"
  ctx.fillStyle = '#FFFFFF';
  ctx.font = 'bold 44px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto';
  ctx.textAlign = 'center';
  ctx.fillText('∿  Line Follower Arena', canvas.width / 2, 75);

  const texture = new THREE.CanvasTexture(canvas);
  textureCache.set(key, texture);
  return texture;
}

/**
 * 6. START / FINISH Gantry Overhead Banner Texture
 */
export function getStartFinishBannerTexture() {
  const key = 'gamma-start-finish-banner';
  if (textureCache.has(key)) return textureCache.get(key);

  const canvas = document.createElement('canvas');
  canvas.width = 1024;
  canvas.height = 180;
  const ctx = canvas.getContext('2d');

  ctx.fillStyle = '#0F172A';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Chequered Flag Left & Right Blocks
  const ts = 25;
  for (let r = 0; r < Math.floor(canvas.height / ts); r++) {
    for (let c = 0; c < 7; c++) {
      ctx.fillStyle = (r + c) % 2 === 0 ? '#FFFFFF' : '#000000';
      ctx.fillRect(c * ts, r * ts, ts, ts);
      ctx.fillRect(canvas.width - (c + 1) * ts, r * ts, ts, ts);
    }
  }

  // Central Text
  ctx.fillStyle = '#FFFFFF';
  ctx.font = 'bold 52px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto';
  ctx.textAlign = 'center';
  ctx.fillText('START / FINISH', canvas.width / 2, 110);

  const texture = new THREE.CanvasTexture(canvas);
  textureCache.set(key, texture);
  return texture;
}

/**
 * 7. Neon A5X Sign Texture for Right Glass Wall
 */
export function getA5XNeonSignTexture() {
  const key = 'gamma-a5x-neon-sign';
  if (textureCache.has(key)) return textureCache.get(key);

  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 256;
  const ctx = canvas.getContext('2d');

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Blue Neon Glow
  ctx.shadowColor = '#00D2FF';
  ctx.shadowBlur = 24;
  ctx.fillStyle = '#FFFFFF';
  ctx.font = '900 120px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto';
  ctx.textAlign = 'center';
  ctx.fillText('A5X', canvas.width / 2, 170);

  const texture = new THREE.CanvasTexture(canvas);
  textureCache.set(key, texture);
  return texture;
}

