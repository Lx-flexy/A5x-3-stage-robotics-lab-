import * as THREE from 'three';

// Cache generated canvas textures so they are created once and reused
const textureCache = new Map();

/**
 * High-performance 2D canvas texture for Smart Display Dashboard
 */
export function getSmartDisplayTexture() {
  if (textureCache.has('smart-display')) return textureCache.get('smart-display');

  const canvas = document.createElement('canvas');
  canvas.width = 1024;
  canvas.height = 512;
  const ctx = canvas.getContext('2d');

  // Background
  ctx.fillStyle = '#061325';
  ctx.fillRect(0, 0, 1024, 512);

  // Border & Grid
  ctx.strokeStyle = '#1677FF';
  ctx.lineWidth = 4;
  ctx.strokeRect(10, 10, 1004, 492);

  // Header
  ctx.fillStyle = '#FFFFFF';
  ctx.font = 'bold 28px Inter, sans-serif';
  ctx.fillText('A5X LAB BETA · TELEMETRY DASHBOARD', 36, 52);

  ctx.fillStyle = '#00D2FF';
  ctx.font = '18px Inter, sans-serif';
  ctx.fillText('REAL-TIME HARDWARE DIAGNOSTICS & IOT CLUSTER', 36, 80);

  // Metric Cards
  const metrics = [
    { label: 'CPU CORE TEMP', val: '42.8 °C', color: '#10B981', x: 36, y: 120 },
    { label: 'POWER DRAW', val: '185 W', color: '#38BDF8', x: 280, y: 120 },
    { label: 'NETWORK LATENCY', val: '1.2 ms', color: '#10B981', x: 520, y: 120 },
    { label: 'ACTIVE NODES', val: '44 / 44', color: '#FACC15', x: 760, y: 120 },
  ];

  metrics.forEach((m) => {
    ctx.fillStyle = '#0B2247';
    ctx.fillRect(m.x, m.y, 220, 100);
    ctx.strokeStyle = 'rgba(22, 119, 255, 0.4)';
    ctx.lineWidth = 1;
    ctx.strokeRect(m.x, m.y, 220, 100);

    ctx.fillStyle = '#94A3B8';
    ctx.font = '14px Inter, sans-serif';
    ctx.fillText(m.label, m.x + 16, m.y + 32);

    ctx.fillStyle = m.color;
    ctx.font = 'bold 28px Inter, sans-serif';
    ctx.fillText(m.val, m.x + 16, m.y + 74);
  });

  // Lower Telemetry Graph
  ctx.fillStyle = '#0B2247';
  ctx.fillRect(36, 250, 944, 220);
  ctx.strokeStyle = 'rgba(22, 119, 255, 0.4)';
  ctx.strokeRect(36, 250, 944, 220);

  ctx.fillStyle = '#60A5FA';
  ctx.font = '16px Inter, sans-serif';
  ctx.fillText('CLUSTER LOAD & SIGNAL INTEGRITY (LAST 60 SECONDS)', 56, 285);

  // Waveform
  ctx.beginPath();
  ctx.strokeStyle = '#00D2FF';
  ctx.lineWidth = 3;
  for (let x = 0; x < 900; x += 20) {
    const y = 370 + Math.sin(x * 0.05) * 40 + Math.cos(x * 0.02) * 20;
    if (x === 0) ctx.moveTo(56 + x, y);
    else ctx.lineTo(56 + x, y);
  }
  ctx.stroke();

  const texture = new THREE.CanvasTexture(canvas);
  texture.minFilter = THREE.LinearFilter;
  textureCache.set('smart-display', texture);
  return texture;
}

/**
 * High-performance 2D canvas texture for Gamma Matrix Digital Wall
 */
export function getDigitalWallTexture() {
  if (textureCache.has('digital-wall')) return textureCache.get('digital-wall');

  const canvas = document.createElement('canvas');
  canvas.width = 1024;
  canvas.height = 512;
  const ctx = canvas.getContext('2d');

  // Background
  ctx.fillStyle = '#030A14';
  ctx.fillRect(0, 0, 1024, 512);

  // Panoramic Grid
  ctx.strokeStyle = 'rgba(22, 119, 255, 0.25)';
  ctx.lineWidth = 1;
  for (let x = 0; x < 1024; x += 40) {
    ctx.beginPath();
    ctx.moveTo(x, 0);
    ctx.lineTo(x, 512);
    ctx.stroke();
  }

  // Header
  ctx.fillStyle = '#FFFFFF';
  ctx.font = 'bold 32px Inter, sans-serif';
  ctx.fillText('A5X MATRIX · ADVANCED AUTONOMY COMMAND', 40, 56);

  ctx.fillStyle = '#38BDF8';
  ctx.font = '18px Inter, sans-serif';
  ctx.fillText('ROBOTICS ARENA & SPATIAL COMPUTING REAL-TIME MESH', 40, 88);

  // 3 Panoramic Monitoring Panels
  const cols = [
    { title: 'ROBOT 01 (OUTER LOOP)', status: 'ACTIVE · 1.4 m/s', battery: '94%', color: '#10B981', x: 40 },
    { title: 'ROBOT 02 (AGILITY)', status: 'ACTIVE · 1.8 m/s', battery: '88%', color: '#38BDF8', x: 360 },
    { title: 'ROBOT 03 (DOCKING)', status: 'STANDBY · CHARGING', battery: '99%', color: '#FACC15', x: 680 },
  ];

  cols.forEach((c) => {
    ctx.fillStyle = '#07152B';
    ctx.fillRect(c.x, 120, 300, 340);
    ctx.strokeStyle = 'rgba(22, 119, 255, 0.4)';
    ctx.lineWidth = 1.5;
    ctx.strokeRect(c.x, 120, 300, 340);

    ctx.fillStyle = '#FFFFFF';
    ctx.font = 'bold 16px Inter, sans-serif';
    ctx.fillText(c.title, c.x + 20, 155);

    ctx.fillStyle = c.color;
    ctx.font = '14px Inter, sans-serif';
    ctx.fillText(c.status, c.x + 20, 185);

    ctx.fillStyle = '#94A3B8';
    ctx.font = '13px Inter, sans-serif';
    ctx.fillText('Battery: ' + c.battery, c.x + 20, 215);

    // Mini LiDAR radar plot
    ctx.strokeStyle = c.color;
    ctx.beginPath();
    ctx.arc(c.x + 150, 320, 70, 0, Math.PI * 2);
    ctx.stroke();
    ctx.beginPath();
    ctx.arc(c.x + 150, 320, 40, 0, Math.PI * 2);
    ctx.stroke();
  });

  const texture = new THREE.CanvasTexture(canvas);
  texture.minFilter = THREE.LinearFilter;
  textureCache.set('digital-wall', texture);
  return texture;
}

/**
 * High-performance 2D canvas texture for IDE & Code monitors
 */
export function getCodeScreenTexture() {
  if (textureCache.has('code-screen')) return textureCache.get('code-screen');

  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 320;
  const ctx = canvas.getContext('2d');

  ctx.fillStyle = '#080E1A';
  ctx.fillRect(0, 0, 512, 320);

  ctx.fillStyle = '#60A5FA';
  ctx.font = 'bold 16px Inter, sans-serif';
  ctx.fillText('// A5X Autonomous Firmware Engine', 24, 36);

  ctx.fillStyle = '#38BDF8';
  ctx.font = '14px Inter, sans-serif';
  ctx.fillText('import { RoverMesh } from "@a5x/robotics";', 24, 66);
  ctx.fillText('const rover = new RoverMesh({ id: 0x01 });', 24, 90);

  ctx.fillStyle = '#10B981';
  ctx.fillText('await rover.connectLiDAR({ hz: 40 });', 24, 120);
  ctx.fillText('rover.setSpeed(1.4);', 24, 144);

  ctx.fillStyle = '#F59E0B';
  ctx.fillText('console.log("Telemetry streaming active");', 24, 174);

  ctx.fillStyle = '#94A3B8';
  ctx.fillText('> [SYS_OK] 0 packets dropped · 1.2ms latency', 24, 250);

  const texture = new THREE.CanvasTexture(canvas);
  texture.minFilter = THREE.LinearFilter;
  textureCache.set('code-screen', texture);
  return texture;
}

/**
 * High-performance 2D canvas texture for CAD / CAM display
 */
export function getCadScreenTexture() {
  if (textureCache.has('cad-screen')) return textureCache.get('cad-screen');

  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 256;
  const ctx = canvas.getContext('2d');

  ctx.fillStyle = '#0A1324';
  ctx.fillRect(0, 0, 512, 256);

  ctx.strokeStyle = 'rgba(22, 119, 255, 0.3)';
  for (let x = 0; x < 512; x += 32) {
    ctx.beginPath();
    ctx.moveTo(x, 0);
    ctx.lineTo(x, 256);
    ctx.stroke();
  }

  ctx.fillStyle = '#94A3B8';
  ctx.font = '14px Inter, sans-serif';
  ctx.fillText('A5X CAD/CAM STUDIO · PART NO. A5X-CHASSIS-03', 20, 32);

  ctx.fillStyle = '#00D2FF';
  ctx.font = 'bold 16px Inter, sans-serif';
  ctx.fillText('PARAMETRIC 3D MESH WIREFRAME (ACTIVE)', 20, 60);

  const texture = new THREE.CanvasTexture(canvas);
  texture.minFilter = THREE.LinearFilter;
  textureCache.set('cad-screen', texture);
  return texture;
}
