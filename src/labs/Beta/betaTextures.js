import * as THREE from 'three';

const textureCache = new Map();

/**
 * Beta Lab Logo Texture: "A5X INDUSTRIES | IMPOSSIBLE ENGINEERING."
 * White text on transparent background, used on navy fluted feature wall
 */
export function getBetaLogoTexture() {
  if (textureCache.has('beta-logo')) return textureCache.get('beta-logo');

  const canvas = document.createElement('canvas');
  canvas.width = 2048;
  canvas.height = 384;
  const ctx = canvas.getContext('2d');

  ctx.clearRect(0, 0, 2048, 384);

  // "A5X" large bold
  ctx.fillStyle = '#FFFFFF';
  ctx.font = '900 140px Inter, -apple-system, sans-serif';
  ctx.textAlign = 'left';
  ctx.textBaseline = 'middle';
  ctx.fillText('A5X', 80, 140);

  // "INDUSTRIES" subtitle
  ctx.font = '700 40px Inter, -apple-system, sans-serif';
  ctx.letterSpacing = '0.3em';
  ctx.fillText('INDUSTRIES', 80, 240);

  // Vertical white divider line
  ctx.fillStyle = '#FFFFFF';
  ctx.fillRect(680, 60, 3, 240);

  // "IMPOSSIBLE ENGINEERING."
  ctx.font = '700 52px Inter, -apple-system, sans-serif';
  ctx.fillStyle = '#FFFFFF';
  ctx.fillText('IMPOSSIBLE', 730, 140);
  ctx.fillText('ENGINEERING.', 730, 220);

  const texture = new THREE.CanvasTexture(canvas);
  texture.minFilter = THREE.LinearMipmapLinearFilter;
  texture.magFilter = THREE.LinearFilter;
  texture.generateMipmaps = true;
  texture.anisotropy = 8;
  textureCache.set('beta-logo', texture);
  return texture;
}

/**
 * Beta Feature Panel: "LAB BETA / Development Lab" angled text
 */
export function getBetaFeaturePanelTexture() {
  if (textureCache.has('beta-feature-panel')) return textureCache.get('beta-feature-panel');

  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 512;
  const ctx = canvas.getContext('2d');

  // Navy background
  ctx.fillStyle = '#071B3A';
  ctx.fillRect(0, 0, 512, 512);

  // Angled electric-blue edge on right
  ctx.beginPath();
  ctx.moveTo(500, 0);
  ctx.lineTo(512, 0);
  ctx.lineTo(512, 512);
  ctx.lineTo(480, 512);
  ctx.closePath();
  ctx.fillStyle = '#1677FF';
  ctx.fill();

  // "LAB BETA" title
  ctx.fillStyle = '#FFFFFF';
  ctx.font = '800 60px Inter, -apple-system, sans-serif';
  ctx.textAlign = 'left';
  ctx.textBaseline = 'middle';
  ctx.fillText('LAB BETA', 40, 230);

  // "Development Lab" subtitle
  ctx.font = '500 28px Inter, -apple-system, sans-serif';
  ctx.fillStyle = '#8BB8E8';
  ctx.fillText('Development Lab', 40, 300);

  const texture = new THREE.CanvasTexture(canvas);
  texture.generateMipmaps = true;
  texture.minFilter = THREE.LinearMipmapLinearFilter;
  texture.anisotropy = 8;
  textureCache.set('beta-feature-panel', texture);
  return texture;
}

/**
 * Smart Display Live UI: dark-blue wave wallpaper, clock, date, 4 app icons
 */
export function getBetaSmartDisplayTexture() {
  if (textureCache.has('beta-smart-display')) return textureCache.get('beta-smart-display');

  const canvas = document.createElement('canvas');
  canvas.width = 1024;
  canvas.height = 600;
  const ctx = canvas.getContext('2d');

  // Dark blue gradient background with wave
  const grad = ctx.createLinearGradient(0, 0, 1024, 600);
  grad.addColorStop(0, '#020B1A');
  grad.addColorStop(0.4, '#0A2654');
  grad.addColorStop(0.6, '#0D3573');
  grad.addColorStop(1, '#020B1A');
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, 1024, 600);

  // Flowing wave accent
  ctx.beginPath();
  ctx.moveTo(0, 450);
  ctx.bezierCurveTo(250, 380, 500, 500, 750, 350);
  ctx.bezierCurveTo(900, 300, 1000, 400, 1024, 380);
  ctx.lineTo(1024, 480);
  ctx.bezierCurveTo(900, 450, 750, 420, 500, 520);
  ctx.bezierCurveTo(300, 500, 150, 490, 0, 500);
  ctx.closePath();
  const waveGrad = ctx.createLinearGradient(0, 350, 1024, 500);
  waveGrad.addColorStop(0, 'rgba(0, 150, 255, 0.3)');
  waveGrad.addColorStop(0.5, 'rgba(50, 180, 255, 0.5)');
  waveGrad.addColorStop(1, 'rgba(0, 100, 220, 0.2)');
  ctx.fillStyle = waveGrad;
  ctx.fill();

  // Clock
  const now = new Date();
  const hours = now.getHours();
  const mins = now.getMinutes().toString().padStart(2, '0');
  const ampm = hours >= 12 ? 'PM' : 'AM';
  const displayHours = hours % 12 || 12;

  ctx.fillStyle = '#FFFFFF';
  ctx.font = '700 86px Inter, -apple-system, sans-serif';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText(`${displayHours}:${mins}`, 512, 160);

  // AM/PM
  ctx.font = '600 32px Inter, -apple-system, sans-serif';
  ctx.fillStyle = '#93C5FD';
  ctx.fillText(ampm, 630, 130);

  // Date
  const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  ctx.font = '500 28px Inter, -apple-system, sans-serif';
  ctx.fillStyle = '#93C5FD';
  ctx.fillText(`${days[now.getDay()]}, ${months[now.getMonth()]} ${now.getDate()}`, 512, 220);

  // 4 App Icons: Whiteboard, Present, Files, Apps
  const appLabels = ['Whiteboard', 'Present', 'Files', 'Apps'];
  const appIcons = ['✏️', '📺', '📁', '⊞'];
  const appColors = ['#3B82F6', '#10B981', '#F59E0B', '#8B5CF6'];

  appLabels.forEach((label, i) => {
    const ax = 240 + i * 160;
    const ay = 340;

    // Rounded icon bg
    ctx.fillStyle = appColors[i];
    ctx.beginPath();
    ctx.roundRect(ax - 30, ay - 30, 60, 60, 14);
    ctx.fill();

    // Icon character
    ctx.fillStyle = '#FFFFFF';
    ctx.font = '700 28px Inter, -apple-system, sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(appIcons[i], ax, ay);

    // Label
    ctx.font = '500 18px Inter, -apple-system, sans-serif';
    ctx.fillStyle = '#D0D7E2';
    ctx.fillText(label, ax, ay + 52);
  });

  // Bottom taskbar
  ctx.fillStyle = 'rgba(0, 10, 30, 0.7)';
  ctx.fillRect(0, 560, 1024, 40);
  ctx.fillStyle = '#475569';
  ctx.fillRect(400, 575, 224, 4);

  const texture = new THREE.CanvasTexture(canvas);
  texture.generateMipmaps = true;
  texture.minFilter = THREE.LinearMipmapLinearFilter;
  texture.anisotropy = 8;
  textureCache.set('beta-smart-display', texture);
  return texture;
}

/**
 * Whiteboard canvas: robot sketch + circuit + checklist
 */
export function getBetaWhiteboardTexture() {
  if (textureCache.has('beta-whiteboard')) return textureCache.get('beta-whiteboard');

  const canvas = document.createElement('canvas');
  canvas.width = 1024;
  canvas.height = 600;
  const ctx = canvas.getContext('2d');

  // White board surface
  ctx.fillStyle = '#FAFBFC';
  ctx.fillRect(0, 0, 1024, 600);

  // Robot sketch (simplified)
  ctx.strokeStyle = '#1E293B';
  ctx.lineWidth = 3;

  // Robot body
  ctx.strokeRect(120, 60, 200, 180);
  // Robot head
  ctx.strokeRect(160, 10, 120, 60);
  // Robot eyes
  ctx.beginPath();
  ctx.arc(195, 40, 12, 0, Math.PI * 2);
  ctx.arc(245, 40, 12, 0, Math.PI * 2);
  ctx.stroke();
  // Robot arms
  ctx.strokeRect(80, 100, 40, 100);
  ctx.strokeRect(320, 100, 40, 100);
  // Robot wheels
  ctx.beginPath();
  ctx.arc(170, 260, 20, 0, Math.PI * 2);
  ctx.arc(270, 260, 20, 0, Math.PI * 2);
  ctx.stroke();

  // Circuit sketch (right side)
  ctx.strokeStyle = '#334155';
  ctx.lineWidth = 2;
  // IC
  ctx.strokeRect(500, 80, 100, 60);
  ctx.font = '14px Inter, sans-serif';
  ctx.fillStyle = '#334155';
  ctx.textAlign = 'center';
  ctx.fillText('MCU', 550, 115);
  // Pins
  for (let i = 0; i < 4; i++) {
    ctx.beginPath();
    ctx.moveTo(500, 90 + i * 14);
    ctx.lineTo(470, 90 + i * 14);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(600, 90 + i * 14);
    ctx.lineTo(630, 90 + i * 14);
    ctx.stroke();
  }
  // Connections
  ctx.beginPath();
  ctx.moveTo(470, 90);
  ctx.lineTo(430, 90);
  ctx.lineTo(430, 180);
  ctx.stroke();
  ctx.beginPath();
  ctx.moveTo(630, 90);
  ctx.lineTo(680, 90);
  ctx.lineTo(680, 170);
  ctx.stroke();
  // Resistor symbol
  ctx.beginPath();
  ctx.moveTo(430, 180);
  for (let i = 0; i < 6; i++) {
    ctx.lineTo(430 + (i % 2 === 0 ? 8 : -8), 180 + i * 8);
  }
  ctx.lineTo(430, 230);
  ctx.stroke();
  // Capacitor
  ctx.beginPath();
  ctx.moveTo(680, 170);
  ctx.lineTo(680, 190);
  ctx.moveTo(665, 190);
  ctx.lineTo(695, 190);
  ctx.moveTo(665, 200);
  ctx.lineTo(695, 200);
  ctx.moveTo(680, 200);
  ctx.lineTo(680, 220);
  ctx.stroke();

  // Checklist (bottom right)
  ctx.fillStyle = '#071B3A';
  ctx.font = '600 22px Inter, -apple-system, sans-serif';
  ctx.textAlign = 'left';
  const items = ['Robotics', 'IoT', 'AI', 'Embedded', 'Design'];
  items.forEach((item, i) => {
    const y = 340 + i * 42;
    // Checkmark
    ctx.fillStyle = '#1677FF';
    ctx.font = '700 22px Inter, sans-serif';
    ctx.fillText('✓', 580, y);
    // Label
    ctx.fillStyle = '#1E293B';
    ctx.font = '500 22px Inter, sans-serif';
    ctx.fillText(item, 620, y);
  });

  const texture = new THREE.CanvasTexture(canvas);
  texture.generateMipmaps = true;
  texture.minFilter = THREE.LinearMipmapLinearFilter;
  texture.anisotropy = 8;
  textureCache.set('beta-whiteboard', texture);
  return texture;
}

/**
 * Wall sign plate texture with auto-fitting text (shared style)
 */
export function getBetaWallSignTexture(title, subtitle = '', icon = '') {
  const key = `beta-sign-${title}-${subtitle}-${icon}`;
  if (textureCache.has(key)) return textureCache.get(key);

  const canvas = document.createElement('canvas');
  canvas.width = 1024;
  canvas.height = 512;
  const ctx = canvas.getContext('2d');

  // Deep navy background
  ctx.fillStyle = '#071B3A';
  ctx.fillRect(0, 0, 1024, 512);

  // White inner border
  ctx.strokeStyle = '#FFFFFF';
  ctx.lineWidth = 6;
  ctx.strokeRect(24, 24, 976, 464);

  // Electric blue accent line
  ctx.strokeStyle = '#1677FF';
  ctx.lineWidth = 4;
  ctx.strokeRect(34, 34, 956, 444);

  // Icon area (if provided)
  let textStartX = 512;
  if (icon) {
    // Icon bordered square on left
    ctx.strokeStyle = '#FFFFFF';
    ctx.lineWidth = 3;
    ctx.strokeRect(70, 160, 110, 110);
    ctx.fillStyle = '#1677FF';
    ctx.font = '700 48px Inter, sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(icon, 125, 215);
    textStartX = 580;
  }

  // Auto-fit Title
  const maxTitleWidth = icon ? 700 : 860;
  let titleFontSize = subtitle ? 64 : 80;
  ctx.font = `800 ${titleFontSize}px Inter, -apple-system, sans-serif`;

  while (ctx.measureText(title).width > maxTitleWidth && titleFontSize > 28) {
    titleFontSize -= 2;
    ctx.font = `800 ${titleFontSize}px Inter, -apple-system, sans-serif`;
  }

  ctx.fillStyle = '#FFFFFF';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  const titleY = subtitle ? 200 : 256;
  ctx.fillText(title, textStartX, titleY);

  // Auto-fit Subtitle
  if (subtitle) {
    let subFontSize = 32;
    ctx.font = `600 ${subFontSize}px Inter, -apple-system, sans-serif`;
    while (ctx.measureText(subtitle).width > maxTitleWidth && subFontSize > 18) {
      subFontSize -= 2;
      ctx.font = `600 ${subFontSize}px Inter, -apple-system, sans-serif`;
    }
    ctx.fillStyle = '#60A5FA';
    ctx.fillText(subtitle, textStartX, 320);
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
 * Vertical fluted panel texture for Beta's navy feature wall
 */
export function getBetaFlutedPanelTexture() {
  if (textureCache.has('beta-fluted')) return textureCache.get('beta-fluted');

  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 512;
  const ctx = canvas.getContext('2d');

  // Base navy
  ctx.fillStyle = '#071B3A';
  ctx.fillRect(0, 0, 512, 512);

  // Vertical ribs (fine, low contrast)
  for (let x = 0; x < 512; x += 8) {
    const brightness = Math.sin(x * 0.4) * 8;
    const r = 7 + brightness * 0.3;
    const g = 27 + brightness * 0.5;
    const b = 58 + brightness;
    ctx.fillStyle = `rgb(${Math.round(r)}, ${Math.round(g)}, ${Math.round(b)})`;
    ctx.fillRect(x, 0, 4, 512);
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  texture.repeat.set(6, 1);
  texture.generateMipmaps = true;
  texture.minFilter = THREE.LinearMipmapLinearFilter;
  textureCache.set('beta-fluted', texture);
  return texture;
}

/**
 * A5X Teacher Desk Front Panel texture (branded podium)
 */
export function getBetaDeskLogoTexture() {
  if (textureCache.has('beta-desk-logo')) return textureCache.get('beta-desk-logo');

  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 256;
  const ctx = canvas.getContext('2d');

  // Light oak base
  ctx.fillStyle = '#D4B996';
  ctx.fillRect(0, 0, 512, 256);

  // A5X logo centered
  ctx.fillStyle = '#071B3A';
  ctx.font = '900 72px Inter, -apple-system, sans-serif';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText('A5X', 256, 128);

  const texture = new THREE.CanvasTexture(canvas);
  texture.generateMipmaps = true;
  texture.minFilter = THREE.LinearMipmapLinearFilter;
  textureCache.set('beta-desk-logo', texture);
  return texture;
}

/**
 * Code editor screen texture (dark theme IDE)
 */
export function getCodeEditorTexture() {
  if (textureCache.has('code-editor')) return textureCache.get('code-editor');

  const canvas = document.createElement('canvas');
  canvas.width = 1024;
  canvas.height = 600;
  const ctx = canvas.getContext('2d');

  // Dark IDE background
  ctx.fillStyle = '#1E1E2E';
  ctx.fillRect(0, 0, 1024, 600);

  // Left sidebar (file explorer)
  ctx.fillStyle = '#181825';
  ctx.fillRect(0, 0, 200, 600);

  // Top tab bar
  ctx.fillStyle = '#11111B';
  ctx.fillRect(200, 0, 824, 36);

  // Active tab
  ctx.fillStyle = '#1E1E2E';
  ctx.fillRect(200, 0, 160, 36);
  ctx.fillStyle = '#89B4FA';
  ctx.font = '500 14px "Courier New", monospace';
  ctx.fillText('main.py', 230, 24);

  // Line numbers
  ctx.fillStyle = '#6C7086';
  ctx.font = '500 14px "Courier New", monospace';
  for (let i = 0; i < 28; i++) {
    ctx.fillText(`${i + 1}`, 216, 56 + i * 20);
  }

  // Code lines (Python-like syntax with syntax highlighting)
  const lines = [
    { text: 'import', color: '#CBA6F7' },
    { text: ' numpy ', color: '#89B4FA' },
    { text: 'as', color: '#CBA6F7' },
    { text: ' np', color: '#89B4FA' },
  ];

  const codeSnippets = [
    [{ text: 'import', c: '#CBA6F7' }, { text: ' torch', c: '#89B4FA' }],
    [{ text: 'from', c: '#CBA6F7' }, { text: ' robot_sdk ', c: '#A6E3A1' }, { text: 'import', c: '#CBA6F7' }, { text: ' Controller', c: '#F9E2AF' }],
    [],
    [{ text: 'class', c: '#CBA6F7' }, { text: ' RobotArm', c: '#F9E2AF' }, { text: ':', c: '#CDD6F4' }],
    [{ text: '    def', c: '#CBA6F7' }, { text: ' __init__', c: '#89B4FA' }, { text: '(self, port):', c: '#CDD6F4' }],
    [{ text: '        self', c: '#F38BA8' }, { text: '.ctrl = Controller(port)', c: '#CDD6F4' }],
    [{ text: '        self', c: '#F38BA8' }, { text: '.joints = ', c: '#CDD6F4' }, { text: '6', c: '#FAB387' }],
    [],
    [{ text: '    def', c: '#CBA6F7' }, { text: ' move_to', c: '#89B4FA' }, { text: '(self, x, y, z):', c: '#CDD6F4' }],
    [{ text: '        # Calculate IK', c: '#6C7086' }],
    [{ text: '        angles = self.solve_ik(x, y, z)', c: '#CDD6F4' }],
    [{ text: '        self.ctrl.set_joints(angles)', c: '#CDD6F4' }],
    [],
    [{ text: '    def', c: '#CBA6F7' }, { text: ' solve_ik', c: '#89B4FA' }, { text: '(self, x, y, z):', c: '#CDD6F4' }],
    [{ text: '        d = np.sqrt(x**2 + y**2)', c: '#CDD6F4' }],
    [{ text: '        theta1 = np.arctan2(y, x)', c: '#CDD6F4' }],
    [{ text: '        return', c: '#CBA6F7' }, { text: ' [theta1, theta2]', c: '#CDD6F4' }],
  ];

  codeSnippets.forEach((line, lineIdx) => {
    let x = 250;
    line.forEach((seg) => {
      ctx.fillStyle = seg.c;
      ctx.font = '500 14px "Courier New", monospace';
      ctx.fillText(seg.text, x, 56 + lineIdx * 20);
      x += ctx.measureText(seg.text).width;
    });
  });

  // File tree items in sidebar
  ctx.fillStyle = '#585B70';
  ctx.font = '12px Inter, sans-serif';
  const files = ['📁 src', '  📄 main.py', '  📄 robot.py', '  📄 sensors.py', '📁 config', '  📄 params.yaml', '📁 tests'];
  files.forEach((f, i) => {
    ctx.fillText(f, 16, 56 + i * 24);
  });

  const texture = new THREE.CanvasTexture(canvas);
  texture.generateMipmaps = true;
  texture.minFilter = THREE.LinearMipmapLinearFilter;
  texture.anisotropy = 8;
  textureCache.set('code-editor', texture);
  return texture;
}

/**
 * CAD viewport texture (rover wireframe model)
 */
export function getCADViewportTexture() {
  if (textureCache.has('cad-viewport')) return textureCache.get('cad-viewport');

  const canvas = document.createElement('canvas');
  canvas.width = 1024;
  canvas.height = 600;
  const ctx = canvas.getContext('2d');

  // Dark CAD viewport background
  ctx.fillStyle = '#2A2D35';
  ctx.fillRect(0, 0, 1024, 600);

  // Grid
  ctx.strokeStyle = '#3A3D45';
  ctx.lineWidth = 1;
  for (let x = 0; x < 1024; x += 40) {
    ctx.beginPath();
    ctx.moveTo(x, 0);
    ctx.lineTo(x, 600);
    ctx.stroke();
  }
  for (let y = 0; y < 600; y += 40) {
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(1024, y);
    ctx.stroke();
  }

  // Wireframe rover body (simplified 3D-looking wireframe)
  ctx.strokeStyle = '#60A5FA';
  ctx.lineWidth = 2;

  // Chassis box (perspective)
  const chassis = [
    [340, 280], [540, 250], [680, 280], [680, 350], [540, 380], [340, 350]
  ];
  ctx.beginPath();
  ctx.moveTo(chassis[0][0], chassis[0][1]);
  for (let i = 1; i < chassis.length; i++) ctx.lineTo(chassis[i][0], chassis[i][1]);
  ctx.closePath();
  ctx.stroke();

  // Top surface
  ctx.beginPath();
  ctx.moveTo(360, 230);
  ctx.lineTo(560, 200);
  ctx.lineTo(660, 230);
  ctx.lineTo(660, 280);
  ctx.lineTo(560, 250);
  ctx.lineTo(360, 280);
  ctx.closePath();
  ctx.stroke();

  // Vertical edges
  [[340, 280, 360, 230], [540, 250, 560, 200], [680, 280, 660, 230]].forEach(([x1, y1, x2, y2]) => {
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.stroke();
  });

  // 4 Wheels
  ctx.strokeStyle = '#F59E0B';
  ctx.lineWidth = 2;
  [[370, 370], [510, 400], [630, 370], [490, 340]].forEach(([wx, wy]) => {
    ctx.beginPath();
    ctx.ellipse(wx, wy, 28, 14, 0, 0, Math.PI * 2);
    ctx.stroke();
  });

  // Axes indicator
  ctx.lineWidth = 2;
  // X axis
  ctx.strokeStyle = '#EF4444';
  ctx.beginPath();
  ctx.moveTo(80, 520);
  ctx.lineTo(140, 520);
  ctx.stroke();
  ctx.fillStyle = '#EF4444';
  ctx.font = '14px Inter';
  ctx.fillText('X', 145, 525);
  // Y axis
  ctx.strokeStyle = '#10B981';
  ctx.beginPath();
  ctx.moveTo(80, 520);
  ctx.lineTo(80, 460);
  ctx.stroke();
  ctx.fillStyle = '#10B981';
  ctx.fillText('Y', 72, 455);
  // Z axis
  ctx.strokeStyle = '#3B82F6';
  ctx.beginPath();
  ctx.moveTo(80, 520);
  ctx.lineTo(50, 550);
  ctx.stroke();
  ctx.fillStyle = '#3B82F6';
  ctx.fillText('Z', 40, 558);

  // Toolbar hint
  ctx.fillStyle = '#6C7086';
  ctx.font = '14px Inter';
  ctx.fillText('Fusion 360 — Rover Assembly v2.3', 350, 30);

  const texture = new THREE.CanvasTexture(canvas);
  texture.generateMipmaps = true;
  texture.minFilter = THREE.LinearMipmapLinearFilter;
  texture.anisotropy = 8;
  textureCache.set('cad-viewport', texture);
  return texture;
}

/**
 * Beta ceiling exposed-structure texture (lighter grey with beam grid)
 */
export function getBetaCeilingTexture() {
  if (textureCache.has('beta-ceiling')) return textureCache.get('beta-ceiling');

  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 512;
  const ctx = canvas.getContext('2d');

  // Light grey ceiling base (brighter than Alpha)
  ctx.fillStyle = '#3A3F4B';
  ctx.fillRect(0, 0, 512, 512);

  // Parallel beam/duct grid pattern
  ctx.fillStyle = '#2E333D';
  for (let y = 0; y < 512; y += 64) {
    ctx.fillRect(0, y, 512, 24);
  }

  // Cross beams
  ctx.fillStyle = '#2A2F38';
  for (let x = 0; x < 512; x += 128) {
    ctx.fillRect(x, 0, 16, 512);
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  texture.repeat.set(4, 3);
  texture.generateMipmaps = true;
  texture.minFilter = THREE.LinearMipmapLinearFilter;
  textureCache.set('beta-ceiling', texture);
  return texture;
}

/**
 * Polished concrete floor texture (subtle warm grey)
 */
export function getBetaFloorTexture() {
  if (textureCache.has('beta-floor')) return textureCache.get('beta-floor');

  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 512;
  const ctx = canvas.getContext('2d');

  // Warm light grey concrete
  ctx.fillStyle = '#D0D4DC';
  ctx.fillRect(0, 0, 512, 512);

  // Subtle concrete grain
  for (let i = 0; i < 800; i++) {
    const x = Math.random() * 512;
    const y = Math.random() * 512;
    const a = 0.03 + Math.random() * 0.04;
    ctx.fillStyle = `rgba(160, 165, 175, ${a})`;
    ctx.fillRect(x, y, 2 + Math.random() * 3, 1);
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  texture.repeat.set(8, 6);
  texture.generateMipmaps = true;
  texture.minFilter = THREE.LinearMipmapLinearFilter;
  textureCache.set('beta-floor', texture);
  return texture;
}

/**
 * Hardware board label textures (Raspberry Pi 5, Arduino, ESP32, etc.)
 */
export function getBoardLabelTexture(name) {
  const key = `board-label-${name}`;
  if (textureCache.has(key)) return textureCache.get(key);

  const canvas = document.createElement('canvas');
  canvas.width = 256;
  canvas.height = 128;
  const ctx = canvas.getContext('2d');

  // Dark label card
  ctx.fillStyle = '#0F172A';
  ctx.fillRect(0, 0, 256, 128);
  ctx.strokeStyle = '#334155';
  ctx.lineWidth = 3;
  ctx.strokeRect(4, 4, 248, 120);

  // Brand-specific colors
  const colors = {
    'Raspberry Pi 5': '#C51A4A',
    'Raspberry Pi 4': '#C51A4A',
    'Arduino UNO': '#00979D',
    'Arduino NANO': '#00979D',
    'Arduino MEGA': '#00979D',
    'ESP32': '#E7352C',
  };

  // Accent bar
  ctx.fillStyle = colors[name] || '#1677FF';
  ctx.fillRect(4, 4, 248, 8);

  // Name
  ctx.fillStyle = '#FFFFFF';
  ctx.font = '700 22px Inter, sans-serif';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText(name, 128, 68);

  const texture = new THREE.CanvasTexture(canvas);
  texture.generateMipmaps = true;
  texture.minFilter = THREE.LinearMipmapLinearFilter;
  textureCache.set(key, texture);
  return texture;
}

/**
 * Chamfered-Hexagon "3D PRINTING ZONE" Wall Sign Texture (Revision 10)
 * Dark navy plate with angled chamfered ends, thin electric-blue outline,
 * bold white title, and small-caps subtitle "PRINT · PROTOTYPE · ITERATE".
 */
export function getBeta3DPrintingChamferSignTexture() {
  const key = 'beta-3d-printing-chamfer-sign';
  if (textureCache.has(key)) return textureCache.get(key);

  const canvas = document.createElement('canvas');
  canvas.width = 1024;
  canvas.height = 360;
  const ctx = canvas.getContext('2d');

  ctx.clearRect(0, 0, 1024, 360);

  // Chamfered hexagon polygon coordinates
  const chamfer = 60;
  const pad = 12;

  // Outer dark navy plate
  ctx.beginPath();
  ctx.moveTo(pad + chamfer, pad);
  ctx.lineTo(1024 - pad - chamfer, pad);
  ctx.lineTo(1024 - pad, pad + chamfer);
  ctx.lineTo(1024 - pad, 360 - pad - chamfer);
  ctx.lineTo(1024 - pad - chamfer, 360 - pad);
  ctx.lineTo(pad + chamfer, 360 - pad);
  ctx.lineTo(pad, 360 - pad - chamfer);
  ctx.lineTo(pad, pad + chamfer);
  ctx.closePath();

  ctx.fillStyle = '#061328';
  ctx.fill();

  // Subtle plate border
  ctx.strokeStyle = '#0F264A';
  ctx.lineWidth = 4;
  ctx.stroke();

  // Inner Electric Blue Chamfered Outline (#1677FF)
  const inPad = 26;
  const inChamfer = 50;
  ctx.beginPath();
  ctx.moveTo(inPad + inChamfer, inPad);
  ctx.lineTo(1024 - inPad - inChamfer, inPad);
  ctx.lineTo(1024 - inPad, inPad + inChamfer);
  ctx.lineTo(1024 - inPad, 360 - inPad - inChamfer);
  ctx.lineTo(1024 - inPad - inChamfer, 360 - inPad);
  ctx.lineTo(inPad + inChamfer, 360 - inPad);
  ctx.lineTo(inPad, 360 - inPad - inChamfer);
  ctx.lineTo(inPad, inPad + inChamfer);
  ctx.closePath();

  ctx.strokeStyle = '#1677FF';
  ctx.lineWidth = 6;
  ctx.stroke();

  // Outer subtle cyan glow edge
  ctx.strokeStyle = 'rgba(56, 189, 248, 0.4)';
  ctx.lineWidth = 2;
  ctx.stroke();

  // Main Title: "3D PRINTING ZONE"
  ctx.fillStyle = '#FFFFFF';
  ctx.font = '900 74px Inter, -apple-system, sans-serif';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.letterSpacing = '0.04em';
  ctx.fillText('3D PRINTING ZONE', 512, 140);

  // Divider / Accent rule
  ctx.strokeStyle = '#1677FF';
  ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.moveTo(340, 205);
  ctx.lineTo(684, 205);
  ctx.stroke();

  // Subtitle: "PRINT · PROTOTYPE · ITERATE"
  ctx.font = '700 30px Inter, -apple-system, sans-serif';
  ctx.fillStyle = '#93C5FD';
  ctx.letterSpacing = '0.22em';
  ctx.fillText('PRINT · PROTOTYPE · ITERATE', 512, 255);

  const texture = new THREE.CanvasTexture(canvas);
  texture.generateMipmaps = true;
  texture.minFilter = THREE.LinearMipmapLinearFilter;
  texture.magFilter = THREE.LinearFilter;
  texture.anisotropy = 8;
  textureCache.set(key, texture);
  return texture;
}

/**
 * A5X Crate / Tool Box Texture (White with navy branding & blue stripes)
 */
export function getBetaA5XCrateTexture() {
  const key = 'beta-a5x-crate';
  if (textureCache.has(key)) return textureCache.get(key);

  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 256;
  const ctx = canvas.getContext('2d');

  ctx.fillStyle = '#F8FAFC';
  ctx.fillRect(0, 0, 512, 256);

  // Border
  ctx.strokeStyle = '#CBD5E1';
  ctx.lineWidth = 6;
  ctx.strokeRect(6, 6, 500, 244);

  // "A5X"
  ctx.fillStyle = '#071B3A';
  ctx.font = '900 72px Inter, sans-serif';
  ctx.textAlign = 'left';
  ctx.fillText('A5X', 40, 110);

  // "INDUSTRIES"
  ctx.font = '700 24px Inter, sans-serif';
  ctx.letterSpacing = '0.2em';
  ctx.fillText('INDUSTRIES', 42, 160);

  // Diagonal blue racing stripes on right
  ctx.beginPath();
  ctx.moveTo(380, 0);
  ctx.lineTo(440, 0);
  ctx.lineTo(340, 256);
  ctx.lineTo(280, 256);
  ctx.closePath();
  ctx.fillStyle = '#1677FF';
  ctx.fill();

  ctx.beginPath();
  ctx.moveTo(460, 0);
  ctx.lineTo(500, 0);
  ctx.lineTo(400, 256);
  ctx.lineTo(360, 256);
  ctx.closePath();
  ctx.fillStyle = '#38BDF8';
  ctx.fill();

  const texture = new THREE.CanvasTexture(canvas);
  texture.generateMipmaps = true;
  texture.minFilter = THREE.LinearMipmapLinearFilter;
  textureCache.set(key, texture);
  return texture;
}

/**
 * Bambu Lab Touchscreen Console Texture
 */
export function getBambuScreenTexture() {
  const key = 'bambu-touchscreen';
  if (textureCache.has(key)) return textureCache.get(key);

  const canvas = document.createElement('canvas');
  canvas.width = 256;
  canvas.height = 192;
  const ctx = canvas.getContext('2d');

  ctx.fillStyle = '#0B1120';
  ctx.fillRect(0, 0, 256, 192);

  // Top header bar
  ctx.fillStyle = '#0284C7';
  ctx.fillRect(0, 0, 256, 28);
  ctx.fillStyle = '#FFFFFF';
  ctx.font = '700 13px Inter, sans-serif';
  ctx.fillText('Bambu Lab A1 • Active', 10, 19);

  // Progress bar
  ctx.fillStyle = '#1E293B';
  ctx.fillRect(16, 50, 224, 16);
  ctx.fillStyle = '#10B981';
  ctx.fillRect(16, 50, 166, 16); // 74%

  ctx.fillStyle = '#FFFFFF';
  ctx.font = '600 12px Inter, sans-serif';
  ctx.fillText('74%  •  00:42 remaining', 16, 88);

  // Telemetry temps
  ctx.fillStyle = '#94A3B8';
  ctx.font = '500 11px Inter, sans-serif';
  ctx.fillText('Nozzle: 220°C / 220°C', 16, 120);
  ctx.fillText('Bed:    65°C / 65°C', 16, 140);
  ctx.fillText('File:   spiral_lattice_vase.gcode', 16, 164);

  const texture = new THREE.CanvasTexture(canvas);
  texture.generateMipmaps = true;
  texture.minFilter = THREE.LinearMipmapLinearFilter;
  textureCache.set(key, texture);
  return texture;
}

/**
 * Self-healing Blue Cutting Mat Texture
 */
export function getCuttingMatTexture() {
  const key = 'cutting-mat-blue';
  if (textureCache.has(key)) return textureCache.get(key);

  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 384;
  const ctx = canvas.getContext('2d');

  ctx.fillStyle = '#1E3A8A';
  ctx.fillRect(0, 0, 512, 384);

  // Grid
  ctx.strokeStyle = 'rgba(255, 255, 255, 0.25)';
  ctx.lineWidth = 1;
  for (let x = 0; x <= 512; x += 32) {
    ctx.beginPath();
    ctx.moveTo(x, 0);
    ctx.lineTo(x, 384);
    ctx.stroke();
  }
  for (let y = 0; y <= 384; y += 32) {
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(512, y);
    ctx.stroke();
  }

  // Border & angle guides
  ctx.strokeStyle = 'rgba(255, 255, 255, 0.5)';
  ctx.lineWidth = 2;
  ctx.strokeRect(16, 16, 480, 352);

  ctx.beginPath();
  ctx.moveTo(16, 368);
  ctx.lineTo(368, 16);
  ctx.stroke();

  const texture = new THREE.CanvasTexture(canvas);
  texture.generateMipmaps = true;
  texture.minFilter = THREE.LinearMipmapLinearFilter;
  textureCache.set(key, texture);
  return texture;
}

/**
 * Digital Storage Oscilloscope Front Panel Texture
 */
export function getOscilloscopeTexture() {
  const key = 'scope-panel-texture';
  if (textureCache.has(key)) return textureCache.get(key);

  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 256;
  const ctx = canvas.getContext('2d');

  // Light grey chassis
  ctx.fillStyle = '#E2E8F0';
  ctx.fillRect(0, 0, 512, 256);
  ctx.strokeStyle = '#94A3B8';
  ctx.lineWidth = 4;
  ctx.strokeRect(2, 2, 508, 252);

  // Dark display area (7" screen)
  ctx.fillStyle = '#0B132B';
  ctx.fillRect(20, 20, 310, 216);
  ctx.strokeStyle = '#334155';
  ctx.lineWidth = 1;
  // Screen Grid
  for (let x = 20; x <= 330; x += 31) {
    ctx.beginPath(); ctx.moveTo(x, 20); ctx.lineTo(x, 236); ctx.stroke();
  }
  for (let y = 20; y <= 236; y += 27) {
    ctx.beginPath(); ctx.moveTo(20, y); ctx.lineTo(330, y); ctx.stroke();
  }

  // Active Green Waveform (Sine)
  ctx.strokeStyle = '#22C55E';
  ctx.lineWidth = 3;
  ctx.beginPath();
  for (let x = 20; x <= 330; x++) {
    const y = 128 + Math.sin((x - 20) * 0.05) * 50;
    if (x === 20) ctx.moveTo(x, y); else ctx.lineTo(x, y);
  }
  ctx.stroke();

  // Active Yellow Waveform (Square pulse)
  ctx.strokeStyle = '#EAB308';
  ctx.lineWidth = 2;
  ctx.beginPath();
  for (let x = 20; x <= 330; x += 40) {
    ctx.lineTo(x, 75);
    ctx.lineTo(x + 20, 75);
    ctx.lineTo(x + 20, 105);
    ctx.lineTo(x + 40, 105);
  }
  ctx.stroke();

  // Telemetry Text
  ctx.fillStyle = '#38BDF8';
  ctx.font = '600 13px Inter, sans-serif';
  ctx.fillText('CH1 2.00V  CH2 500mV', 30, 42);
  ctx.fillText('M 50.0µs  1.00GSa/s', 180, 42);

  // Right Side Controls: Knobs & BNCs
  ctx.fillStyle = '#1E293B';
  // Knobs
  [
    { x: 380, y: 60, r: 24, label: 'VOLTS' },
    { x: 455, y: 60, r: 24, label: 'TIME' },
    { x: 380, y: 135, r: 20, label: 'CH 1' },
    { x: 455, y: 135, r: 20, label: 'CH 2' },
  ].map(k => {
    ctx.beginPath();
    ctx.arc(k.x, k.y, k.r, 0, Math.PI * 2);
    ctx.fillStyle = '#334155';
    ctx.fill();
    ctx.strokeStyle = '#64748B';
    ctx.lineWidth = 2;
    ctx.stroke();
    // Indicator dot
    ctx.beginPath();
    ctx.arc(k.x + k.r * 0.6, k.y - k.r * 0.4, 3, 0, Math.PI * 2);
    ctx.fillStyle = '#FFFFFF';
    ctx.fill();
    // Label
    ctx.fillStyle = '#0F172A';
    ctx.font = '700 10px Inter, sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText(k.label, k.x, k.y + k.r + 14);
  });

  // BNC Ports
  [365, 415, 465].forEach(bx => {
    ctx.beginPath();
    ctx.arc(bx, 215, 12, 0, Math.PI * 2);
    ctx.fillStyle = '#94A3B8';
    ctx.fill();
    ctx.beginPath();
    ctx.arc(bx, 215, 5, 0, Math.PI * 2);
    ctx.fillStyle = '#0F172A';
    ctx.fill();
  });

  const texture = new THREE.CanvasTexture(canvas);
  texture.generateMipmaps = true;
  texture.minFilter = THREE.LinearMipmapLinearFilter;
  textureCache.set(key, texture);
  return texture;
}

/**
 * Bench DC Power Supply Front Panel Texture (12.00 V / 1.50 A)
 */
export function getBenchPsuTexture() {
  const key = 'bench-psu-texture';
  if (textureCache.has(key)) return textureCache.get(key);

  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 256;
  const ctx = canvas.getContext('2d');

  // Off-white chassis
  ctx.fillStyle = '#F1F5F9';
  ctx.fillRect(0, 0, 512, 256);
  ctx.strokeStyle = '#CBD5E1';
  ctx.lineWidth = 4;
  ctx.strokeRect(2, 2, 508, 252);

  // Digital LED Display Bezel (Dark)
  ctx.fillStyle = '#0F172A';
  ctx.fillRect(24, 24, 250, 150);

  // Red 7-Segment Voltage Display: "12.00 V"
  ctx.fillStyle = '#EF4444';
  ctx.font = '900 48px monospace';
  ctx.fillText('12.00 V', 40, 85);

  // Green 7-Segment Current Display: " 1.50 A"
  ctx.fillStyle = '#10B981';
  ctx.font = '900 48px monospace';
  ctx.fillText(' 1.50 A', 40, 145);

  // Status LED: C.V. (Constant Voltage)
  ctx.beginPath();
  ctx.arc(245, 65, 6, 0, Math.PI * 2);
  ctx.fillStyle = '#10B981';
  ctx.fill();
  ctx.fillStyle = '#94A3B8';
  ctx.font = '700 11px Inter, sans-serif';
  ctx.fillText('C.V.', 228, 88);

  // Knobs on Right (Voltage & Current)
  [
    { x: 360, y: 70, label: 'VOLTAGE' },
    { x: 445, y: 70, label: 'CURRENT' },
    { x: 360, y: 155, label: 'FINE' },
    { x: 445, y: 155, label: 'FINE' },
  ].forEach(k => {
    ctx.beginPath();
    ctx.arc(k.x, k.y, 22, 0, Math.PI * 2);
    ctx.fillStyle = '#1E293B';
    ctx.fill();
    ctx.strokeStyle = '#64748B';
    ctx.lineWidth = 2;
    ctx.stroke();
    ctx.fillStyle = '#0F172A';
    ctx.font = '700 10px Inter, sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText(k.label, k.x, k.y + 34);
  });

  // Power Switch & Banana Terminals
  // Red Terminal (+)
  ctx.beginPath();
  ctx.arc(350, 225, 14, 0, Math.PI * 2);
  ctx.fillStyle = '#DC2626';
  ctx.fill();
  // Black Terminal (-)
  ctx.beginPath();
  ctx.arc(400, 225, 14, 0, Math.PI * 2);
  ctx.fillStyle = '#111827';
  ctx.fill();
  // Green Terminal (GND)
  ctx.beginPath();
  ctx.arc(450, 225, 14, 0, Math.PI * 2);
  ctx.fillStyle = '#16A34A';
  ctx.fill();

  const texture = new THREE.CanvasTexture(canvas);
  texture.generateMipmaps = true;
  texture.minFilter = THREE.LinearMipmapLinearFilter;
  textureCache.set(key, texture);
  return texture;
}

/**
 * Function Generator Front Panel Texture
 */
export function getFunctionGeneratorTexture() {
  const key = 'func-gen-texture';
  if (textureCache.has(key)) return textureCache.get(key);

  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 256;
  const ctx = canvas.getContext('2d');

  ctx.fillStyle = '#E2E8F0';
  ctx.fillRect(0, 0, 512, 256);
  ctx.strokeStyle = '#94A3B8';
  ctx.lineWidth = 4;
  ctx.strokeRect(2, 2, 508, 252);

  // LCD display
  ctx.fillStyle = '#0F172A';
  ctx.fillRect(24, 30, 270, 110);
  ctx.fillStyle = '#38BDF8';
  ctx.font = '700 36px monospace';
  ctx.fillText('10.000 kHz', 40, 85);
  ctx.font = '600 16px Inter, sans-serif';
  ctx.fillText('Sine Wave  •  2.50 Vpp', 40, 118);

  // Waveform selector buttons
  ['∿', '⊓', '∧'].forEach((sym, i) => {
    ctx.fillStyle = '#334155';
    ctx.fillRect(320 + i * 55, 40, 45, 45);
    ctx.fillStyle = '#FFFFFF';
    ctx.font = '700 24px sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText(sym, 342 + i * 55, 72);
  });

  // Frequency Rotary Dial
  ctx.beginPath();
  ctx.arc(400, 160, 32, 0, Math.PI * 2);
  ctx.fillStyle = '#1E293B';
  ctx.fill();

  const texture = new THREE.CanvasTexture(canvas);
  texture.generateMipmaps = true;
  textureCache.set(key, texture);
  return texture;
}

/**
 * Bench Digital Multimeter Texture
 */
export function getBenchMultimeterTexture() {
  const key = 'bench-dmm-texture';
  if (textureCache.has(key)) return textureCache.get(key);

  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 256;
  const ctx = canvas.getContext('2d');

  ctx.fillStyle = '#E2E8F0';
  ctx.fillRect(0, 0, 512, 256);

  // VFD Display (Bright Cyan)
  ctx.fillStyle = '#0B132B';
  ctx.fillRect(24, 30, 310, 110);
  ctx.fillStyle = '#06B6D4';
  ctx.font = '900 44px monospace';
  ctx.fillText(' 5.0182 V DC', 35, 95);
  ctx.font = '600 14px Inter, sans-serif';
  ctx.fillText('AUTO  •  FAST  •  TRIG: INT', 40, 125);

  // Mode Buttons
  ['DCV', 'ACV', '2WΩ', 'DCI', 'ACI', 'FREQ'].forEach((mode, i) => {
    ctx.fillStyle = '#334155';
    ctx.fillRect(360 + (i % 2) * 65, 30 + Math.floor(i / 2) * 45, 55, 35);
    ctx.fillStyle = '#FFFFFF';
    ctx.font = '700 11px Inter, sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText(mode, 387 + (i % 2) * 65, 52 + Math.floor(i / 2) * 45);
  });

  const texture = new THREE.CanvasTexture(canvas);
  texture.generateMipmaps = true;
  textureCache.set(key, texture);
  return texture;
}

/**
 * Handheld Multimeter Ergonomic Face Texture (Fluke Yellow body style)
 */
export function getHandheldMultimeterTexture() {
  const key = 'handheld-multimeter-face';
  if (textureCache.has(key)) return textureCache.get(key);

  const canvas = document.createElement('canvas');
  canvas.width = 256;
  canvas.height = 384;
  const ctx = canvas.getContext('2d');

  // Dark Faceplate
  ctx.fillStyle = '#1E293B';
  ctx.fillRect(0, 0, 256, 384);

  // LCD screen
  ctx.fillStyle = '#94A3B8';
  ctx.fillRect(24, 24, 208, 90);
  ctx.fillStyle = '#0F172A';
  ctx.font = '900 42px monospace';
  ctx.textAlign = 'center';
  ctx.fillText('12.04 V', 128, 85);

  // Rotary Selector Knob
  ctx.beginPath();
  ctx.arc(128, 200, 52, 0, Math.PI * 2);
  ctx.fillStyle = '#0F172A';
  ctx.fill();
  ctx.strokeStyle = '#EAB308';
  ctx.lineWidth = 4;
  ctx.stroke();

  // Indicator pointer
  ctx.fillStyle = '#FFFFFF';
  ctx.fillRect(125, 155, 6, 22);

  // Range markings
  ctx.fillStyle = '#E2E8F0';
  ctx.font = '700 13px Inter, sans-serif';
  ctx.fillText('V~', 80, 165);
  ctx.fillText('V=', 128, 140);
  ctx.fillText('mV', 176, 165);
  ctx.fillText('Ω', 190, 205);
  ctx.fillText('A', 70, 205);

  // Input jacks at bottom
  [65, 128, 191].forEach((jx, ji) => {
    ctx.beginPath();
    ctx.arc(jx, 320, 16, 0, Math.PI * 2);
    ctx.fillStyle = ji === 1 ? '#0F172A' : '#DC2626';
    ctx.fill();
    ctx.beginPath();
    ctx.arc(jx, 320, 7, 0, Math.PI * 2);
    ctx.fillStyle = '#94A3B8';
    ctx.fill();
  });

  const texture = new THREE.CanvasTexture(canvas);
  texture.generateMipmaps = true;
  textureCache.set(key, texture);
  return texture;
}

/**
 * Raspberry Pi 5 Retail Packaging Box Texture
 */
export function getRPi5BoxTexture() {
  const key = 'rpi5-box-texture';
  if (textureCache.has(key)) return textureCache.get(key);

  const canvas = document.createElement('canvas');
  canvas.width = 256;
  canvas.height = 256;
  const ctx = canvas.getContext('2d');

  ctx.fillStyle = '#FFFFFF';
  ctx.fillRect(0, 0, 256, 256);

  // Red berry logo graphic
  ctx.fillStyle = '#C51A4A';
  ctx.beginPath();
  ctx.arc(128, 90, 42, 0, Math.PI * 2);
  ctx.fill();

  // Green leaves
  ctx.fillStyle = '#15803D';
  ctx.beginPath();
  ctx.ellipse(128, 45, 18, 9, 0, 0, Math.PI * 2);
  ctx.fill();

  // Text
  ctx.fillStyle = '#111827';
  ctx.font = '900 24px Inter, sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText('Raspberry Pi 5', 128, 168);
  ctx.font = '700 16px Inter, sans-serif';
  ctx.fillStyle = '#C51A4A';
  ctx.fillText('8GB RAM', 128, 205);

  const texture = new THREE.CanvasTexture(canvas);
  texture.generateMipmaps = true;
  textureCache.set(key, texture);
  return texture;
}

/**
 * Arduino Uno Packaging Box Texture
 */
export function getArduinoBoxTexture() {
  const key = 'arduino-box-texture';
  if (textureCache.has(key)) return textureCache.get(key);

  const canvas = document.createElement('canvas');
  canvas.width = 256;
  canvas.height = 256;
  const ctx = canvas.getContext('2d');

  ctx.fillStyle = '#00979D';
  ctx.fillRect(0, 0, 256, 256);

  // Infinity symbol
  ctx.strokeStyle = '#FFFFFF';
  ctx.lineWidth = 14;
  ctx.beginPath();
  ctx.arc(95, 95, 26, 0, Math.PI * 2);
  ctx.arc(161, 95, 26, 0, Math.PI * 2);
  ctx.stroke();

  ctx.fillStyle = '#FFFFFF';
  ctx.font = '900 26px Inter, sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText('ARDUINO', 128, 168);
  ctx.font = '700 18px Inter, sans-serif';
  ctx.fillText('UNO R4 WiFi', 128, 205);

  const texture = new THREE.CanvasTexture(canvas);
  texture.generateMipmaps = true;
  textureCache.set(key, texture);
  return texture;
}

/**
 * ESP32 DevKit Packaging Box Texture
 */
export function getESP32BoxTexture() {
  const key = 'esp32-box-texture';
  if (textureCache.has(key)) return textureCache.get(key);

  const canvas = document.createElement('canvas');
  canvas.width = 256;
  canvas.height = 256;
  const ctx = canvas.getContext('2d');

  ctx.fillStyle = '#1E293B';
  ctx.fillRect(0, 0, 256, 256);

  // Red accent header
  ctx.fillStyle = '#E7352C';
  ctx.fillRect(0, 0, 256, 16);

  ctx.fillStyle = '#FFFFFF';
  ctx.font = '900 32px Inter, sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText('ESP32', 128, 110);
  ctx.font = '700 16px Inter, sans-serif';
  ctx.fillStyle = '#94A3B8';
  ctx.fillText('DevKitC • Dual Core', 128, 150);
  ctx.fillText('Wi-Fi + BLE 5.0', 128, 185);

  const texture = new THREE.CanvasTexture(canvas);
  texture.generateMipmaps = true;
  textureCache.set(key, texture);
  return texture;
}

/**
 * Drawer Cabinet Front Labels Texture (4x6 matrix)
 */
export function getDrawerCabinetTexture() {
  const key = 'drawer-cabinet-matrix';
  if (textureCache.has(key)) return textureCache.get(key);

  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 384;
  const ctx = canvas.getContext('2d');

  ctx.fillStyle = '#1E293B';
  ctx.fillRect(0, 0, 512, 384);

  const cols = 6;
  const rows = 4;
  const dw = 512 / cols;
  const dh = 384 / rows;

  const labels = [
    'RESISTORS', 'CERAMIC', 'ELECTRO', '5mm LEDs', 'DIODES', 'NPN 2N2222',
    'PNP 2N2907', 'MOSFETs', 'OP-AMPS', '555 TIMERS', 'REG 7805', 'LOGIC 74HC',
    'RELAYS 5V', 'BUZZERS', 'SWITCHES', 'POTENTIO', 'TRIMMERS', 'CRYSTALS',
    'TERMINALS', 'HEADERS', 'JUMPERS', 'FUSES', 'AUDIO', 'MISC HW'
  ];

  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      const x = c * dw;
      const y = r * dh;
      // Drawer border
      ctx.strokeStyle = '#0F172A';
      ctx.lineWidth = 3;
      ctx.strokeRect(x + 2, y + 2, dw - 4, dh - 4);

      // Metal label pull slot
      ctx.fillStyle = '#64748B';
      ctx.fillRect(x + dw * 0.15, y + dh * 0.25, dw * 0.70, dh * 0.35);
      // White label inside
      ctx.fillStyle = '#FFFFFF';
      ctx.fillRect(x + dw * 0.18, y + dh * 0.28, dw * 0.64, dh * 0.29);

      // Label text
      const idx = r * cols + c;
      ctx.fillStyle = '#0F172A';
      ctx.font = '700 8px Inter, sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText(labels[idx] || 'PARTS', x + dw / 2, y + dh * 0.46);

      // Handle knob
      ctx.fillStyle = '#CBD5E1';
      ctx.fillRect(x + dw * 0.38, y + dh * 0.72, dw * 0.24, 6);
    }
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.generateMipmaps = true;
  textureCache.set(key, texture);
  return texture;
}

// Re-export shared textures from alpha that Beta reuses
export {
  getAlphaWallSignTexture,
  getPegboardTexture,
  getSolderingLcdTexture,
  getBinLabelTexture,
  getWoodGrainTexture,
} from '../Alpha/alphaTextures';
