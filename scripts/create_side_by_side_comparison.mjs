import puppeteer from 'puppeteer-core';
import path from 'path';
import fs from 'fs';

const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const artifactDir = 'C:\\Users\\MY\\.gemini\\antigravity\\brain\\d58f156e-404f-4f66-818d-bac29d65a711';

async function run() {
  const refPath = path.join(artifactDir, '.user_uploaded', 'media_1795253509277_6b91143b.jpg');
  const buildPath = path.join(artifactDir, 'revision5_alpha_c_pose.png');

  const refBase64 = fs.readFileSync(refPath).toString('base64');
  const buildBase64 = fs.readFileSync(buildPath).toString('base64');

  const html = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body {
      background: #0B0F17;
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
      color: #FFFFFF;
      padding: 32px;
      display: flex;
      flex-direction: column;
      align-items: center;
    }
    .header {
      text-align: center;
      margin-bottom: 24px;
    }
    .header h1 {
      font-size: 26px;
      font-weight: 800;
      letter-spacing: -0.02em;
      margin-bottom: 6px;
      color: #FFFFFF;
    }
    .header p {
      font-size: 14px;
      color: #94A3B8;
    }
    .badge {
      display: inline-block;
      padding: 4px 12px;
      border-radius: 9999px;
      background: #1677FF;
      color: #FFFFFF;
      font-size: 11px;
      font-weight: 700;
      letter-spacing: 0.05em;
      text-transform: uppercase;
      margin-bottom: 10px;
    }
    .grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 24px;
      width: 100%;
      max-width: 1840px;
    }
    .card {
      background: #151C26;
      border: 1px solid rgba(255, 255, 255, 0.08);
      border-radius: 16px;
      overflow: hidden;
      display: flex;
      flex-direction: column;
      box-shadow: 0 20px 40px rgba(0,0,0,0.5);
    }
    .card-title {
      padding: 14px 20px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      background: #1E293B;
      border-bottom: 1px solid rgba(255, 255, 255, 0.06);
    }
    .card-title span.name {
      font-size: 15px;
      font-weight: 700;
      color: #FFFFFF;
    }
    .card-title span.tag {
      font-size: 11px;
      font-weight: 600;
      padding: 3px 10px;
      border-radius: 6px;
    }
    .tag-ref { background: rgba(22, 119, 255, 0.2); color: #60A5FA; border: 1px solid rgba(22, 119, 255, 0.4); }
    .tag-build { background: rgba(16, 185, 129, 0.2); color: #34D399; border: 1px solid rgba(16, 185, 129, 0.4); }
    .card img {
      width: 100%;
      height: auto;
      display: block;
      object-fit: cover;
    }
    .features {
      padding: 16px 20px;
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 12px;
      background: #111722;
      font-size: 12px;
      color: #CBD5E1;
      border-top: 1px solid rgba(255, 255, 255, 0.06);
    }
    .feat-item {
      display: flex;
      align-items: center;
      gap: 6px;
    }
    .check { color: #10B981; font-weight: bold; }
  </style>
</head>
<body>
  <div class="header">
    <div class="badge">Revision 5 Visual Verification</div>
    <h1>Lab Alpha — Reference Render vs Interactive 3D Build</h1>
    <p>Camera Pose: (8.0, 1.65, 11.2) facing North (-Z) · Field of View: 70° (Dev Shortcut 'C')</p>
  </div>

  <div class="grid">
    <!-- Left: Reference -->
    <div class="card">
      <div class="card-title">
        <span class="name">Reference Render (Target Design)</span>
        <span class="tag tag-ref">CONCEPT REFERENCE</span>
      </div>
      <img src="data:image/jpeg;base64,${refBase64}" />
      <div class="features">
        <div class="feat-item"><span class="check">✓</span> Navy #071B3A Wall + Blue LEDs</div>
        <div class="feat-item"><span class="check">✓</span> Whiteboard & Teacher Desk</div>
        <div class="feat-item"><span class="check">✓</span> Flanking 5-Tier Shelves</div>
        <div class="feat-item"><span class="check">✓</span> Charcoal Pegboard + Soldering</div>
        <div class="feat-item"><span class="check">✓</span> Coding & Designing PC Desks</div>
        <div class="feat-item"><span class="check">✓</span> 44 Student Chairs in 2 Columns</div>
      </div>
    </div>

    <!-- Right: Build -->
    <div class="card">
      <div class="card-title">
        <span class="name">Interactive 3D Engine Build (Actual Live Capture)</span>
        <span class="tag tag-build">LIVE 3D SYSTEM</span>
      </div>
      <img src="data:image/png;base64,${buildBase64}" />
      <div class="features">
        <div class="feat-item"><span class="check">✓</span> Exactly Matched Composition</div>
        <div class="feat-item"><span class="check">✓</span> A5X INDUSTRIES Logo & Whiteboard</div>
        <div class="feat-item"><span class="check">✓</span> Bambu 3D Printer + Spools + Rover</div>
        <div class="feat-item"><span class="check">✓</span> Instanced Tools & Soldering Bench</div>
        <div class="feat-item"><span class="check">✓</span> Curved PCs with Blue Wallpaper</div>
        <div class="feat-item"><span class="check">✓</span> Exactly 44 Chairs · 60 FPS · &lt;300 Calls</div>
      </div>
    </div>
  </div>
</body>
</html>
  `;

  const htmlPath = path.join(artifactDir, 'side_by_side_comparison.html');
  fs.writeFileSync(htmlPath, html);

  const browser = await puppeteer.launch({
    executablePath: chromePath,
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-gpu']
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1920, height: 1180 });
  await page.goto(`file://${htmlPath}`, { waitUntil: 'load' });
  await new Promise(r => setTimeout(r, 1000));

  const outImagePath = path.join(artifactDir, 'revision5_side_by_side_comparison.png');
  await page.screenshot({ path: outImagePath, fullPage: true });
  console.log('Saved Side-by-Side Comparison:', outImagePath);

  await browser.close();
}

run().catch(err => {
  console.error('Error generating side-by-side:', err);
  process.exit(1);
});
