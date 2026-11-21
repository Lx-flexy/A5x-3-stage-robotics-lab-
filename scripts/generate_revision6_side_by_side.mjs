import puppeteer from 'puppeteer-core';
import path from 'path';
import fs from 'fs';

const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const artifactDir = 'C:\\Users\\MY\\.gemini\\antigravity\\brain\\d58f156e-404f-4f66-818d-bac29d65a711';

async function run() {
  const user1Path = path.join(artifactDir, '.user_uploaded', 'media_1795256417065_986db907.png');
  const user2Path = path.join(artifactDir, '.user_uploaded', 'media_1795256420762_dcffa998.png');
  const rev6SolderingPath = path.join(artifactDir, 'revision6_soldering_wall.png');
  const rev6ElectronicsPath = path.join(artifactDir, 'revision6_electronics_shelf.png');

  const u1Base64 = fs.readFileSync(user1Path).toString('base64');
  const u2Base64 = fs.readFileSync(user2Path).toString('base64');
  const rSoldBase64 = fs.readFileSync(rev6SolderingPath).toString('base64');
  const rElecBase64 = fs.readFileSync(rev6ElectronicsPath).toString('base64');

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
      gap: 32px;
    }
    .header {
      text-align: center;
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
      margin-bottom: 8px;
    }
    .header h1 {
      font-size: 26px;
      font-weight: 800;
      letter-spacing: -0.02em;
      color: #FFFFFF;
    }
    .header p {
      font-size: 14px;
      color: #94A3B8;
      margin-top: 4px;
    }
    .section-title {
      font-size: 18px;
      font-weight: 700;
      color: #E2E8F0;
      margin-bottom: 12px;
      display: flex;
      align-items: center;
      gap: 8px;
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
      box-shadow: 0 16px 36px rgba(0,0,0,0.5);
    }
    .card-title {
      padding: 12px 18px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      background: #1E293B;
      border-bottom: 1px solid rgba(255, 255, 255, 0.06);
    }
    .card-title span.name {
      font-size: 14px;
      font-weight: 700;
      color: #FFFFFF;
    }
    .card-title span.tag {
      font-size: 11px;
      font-weight: 600;
      padding: 3px 10px;
      border-radius: 6px;
    }
    .tag-before { background: rgba(239, 68, 68, 0.2); color: #F87171; border: 1px solid rgba(239, 68, 68, 0.4); }
    .tag-after { background: rgba(16, 185, 129, 0.2); color: #34D399; border: 1px solid rgba(16, 185, 129, 0.4); }
    .card img {
      width: 100%;
      height: auto;
      display: block;
      object-fit: cover;
    }
    .notes {
      padding: 12px 18px;
      background: #111722;
      font-size: 12px;
      color: #CBD5E1;
      line-height: 1.5;
      border-top: 1px solid rgba(255, 255, 255, 0.06);
    }
    .highlight { color: #34D399; font-weight: 600; }
  </style>
</head>
<body>
  <div class="header">
    <div class="badge">Revision 6 Visual Verification</div>
    <h1>Before vs After: Soldering Wall & Electronics Storage</h1>
    <p>Direct comparison against user reference screenshots</p>
  </div>

  <!-- Comparison 1: Soldering Wall -->
  <div style="width: 100%; max-width: 1840px;">
    <div class="section-title">1. Soldering Wall & Tool Pegboard</div>
    <div class="grid">
      <div class="card">
        <div class="card-title">
          <span class="name">Previous Build (User Issue Report)</span>
          <span class="tag tag-before">BEFORE</span>
        </div>
        <img src="data:image/png;base64,${u1Base64}" />
        <div class="notes">
          ❌ Pegboard renders pure black · Plain colored boxes floating · Sign text clipped ("...DERING & ASSEMBLY AR...") · Simple yellow box stations
        </div>
      </div>
      <div class="card">
        <div class="card-title">
          <span class="name">Revision 6 Fix (Live 3D Render)</span>
          <span class="tag tag-after">AFTER (FIXED)</span>
        </div>
        <img src="data:image/png;base64,${rSoldBase64}" />
        <div class="notes">
          <span class="highlight">✓ Fixed:</span> Charcoal #2B323D panel with 25mm round hole grid & soft bounce light · Real pliers, screwdrivers, hammer, strippers, tape measure on metal L-hooks with shadow outlines · Auto-fit sign text · Real soldering stations with "350°C" LCD & brass wool
        </div>
      </div>
    </div>
  </div>

  <!-- Comparison 2: Electronics Shelf -->
  <div style="width: 100%; max-width: 1840px;">
    <div class="section-title">2. Electronics Storage Shelving Unit</div>
    <div class="grid">
      <div class="card">
        <div class="card-title">
          <span class="name">Previous Build (User Issue Report)</span>
          <span class="tag tag-before">BEFORE</span>
        </div>
        <img src="data:image/png;base64,${u2Base64}" />
        <div class="notes">
          ❌ Solid black boxes · Flat empty cubes · Sphere+cone fake plant · Incomplete shelf styling
        </div>
      </div>
      <div class="card">
        <div class="card-title">
          <span class="name">Revision 6 Fix (Live 3D Render)</span>
          <span class="tag tag-after">AFTER (FIXED)</span>
        </div>
        <img src="data:image/png;base64,${rElecBase64}" />
        <div class="notes">
          <span class="highlight">✓ Fixed:</span> Clear storage bins with visible components inside & white barcode stickers · 8-drawer metal cabinet with pulled drawers · DC bench power supply with dual LED readouts · Proper potted plant with individual green leaf blades · Breadboard stack
        </div>
      </div>
    </div>
  </div>
</body>
</html>
  `;

  const htmlPath = path.join(artifactDir, 'revision6_comparison.html');
  fs.writeFileSync(htmlPath, html);

  const browser = await puppeteer.launch({
    executablePath: chromePath,
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-gpu']
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1920, height: 1600 });
  await page.goto(`file://${htmlPath}`, { waitUntil: 'load' });
  await new Promise(r => setTimeout(r, 1000));

  const outImagePath = path.join(artifactDir, 'revision6_before_after_comparison.png');
  await page.screenshot({ path: outImagePath, fullPage: true });
  console.log('Saved Before/After Comparison:', outImagePath);

  await browser.close();
}

run().catch(err => {
  console.error('Error generating before/after:', err);
  process.exit(1);
});
