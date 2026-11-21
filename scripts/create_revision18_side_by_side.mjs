import puppeteer from 'puppeteer-core';
import path from 'path';
import fs from 'fs';
import os from 'os';

const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const brainDir = path.resolve('C:/Users/MY/.gemini/antigravity/brain/d58f156e-404f-4f66-818d-bac29d65a711');

async function createSideBySide() {
  const beforeImg = path.join(brainDir, '.user_uploaded/media_1795276905169_c4639fe6.png');
  const afterImg = path.join(brainDir, 'revision18_facade_user_screenshot_pose.png');
  const wideImg = path.join(brainDir, 'revision18_facade_wide_spawn.png');

  const beforeBase64 = fs.existsSync(beforeImg) ? fs.readFileSync(beforeImg).toString('base64') : '';
  const afterBase64 = fs.existsSync(afterImg) ? fs.readFileSync(afterImg).toString('base64') : '';
  const wideBase64 = fs.existsSync(wideImg) ? fs.readFileSync(wideImg).toString('base64') : '';

  const htmlContent = `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>Revision 18: Main Entrance Facade & Plaza Reconstruction</title>
  <style>
    * { box-sizing: border-box; margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; }
    body { background: #0B111E; color: #E2E8F0; padding: 28px; }
    h1 { font-size: 26px; font-weight: 700; color: #38BDF8; margin-bottom: 6px; }
    .subtitle { font-size: 14px; color: #94A3B8; margin-bottom: 24px; }
    .grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px; margin-bottom: 24px; }
    .card { background: #161F30; border: 1px solid #2A3952; border-radius: 10px; overflow: hidden; display: flex; flex-direction: column; }
    .card-header { padding: 12px 16px; font-size: 14px; font-weight: 600; background: #1E2B42; border-bottom: 1px solid #2A3952; display: flex; justify-content: space-between; align-items: center; }
    .badge-before { background: #DC2626; color: #fff; padding: 2px 8px; border-radius: 4px; font-size: 11px; }
    .badge-after { background: #059669; color: #fff; padding: 2px 8px; border-radius: 4px; font-size: 11px; }
    .badge-wide { background: #2563EB; color: #fff; padding: 2px 8px; border-radius: 4px; font-size: 11px; }
    .img-container { width: 100%; height: 380px; background: #050811; display: flex; align-items: center; justify-content: center; overflow: hidden; }
    .img-container img { width: 100%; height: 100%; object-fit: contain; }
    .card-body { padding: 14px 16px; font-size: 12px; color: #CBD5E1; line-height: 1.5; flex-grow: 1; }
    .card-body ul { padding-left: 18px; margin-top: 6px; }
    .card-body li { margin-bottom: 4px; }
    .stats-bar { background: #1E2B42; border: 1px solid #2A3952; border-radius: 10px; padding: 16px 20px; display: flex; justify-content: space-around; margin-top: 10px; }
    .stat-item { text-align: center; }
    .stat-val { font-size: 20px; font-weight: 700; color: #38BDF8; }
    .stat-lbl { font-size: 12px; color: #94A3B8; margin-top: 2px; }
  </style>
</head>
<body>
  <h1>Revision 18: Main Entrance Facade &amp; Plaza Rebuild</h1>
  <div class="subtitle">Complete exterior reconstruction &bull; Solid opaque walls &bull; Clear curtain-wall glazing &bull; Stainless-bar AutoDoor &bull; 14m paved plaza &bull; Zero black ground</div>
  
  <div class="grid">
    <div class="card">
      <div class="card-header">
        <span>Previous State (Broken)</span>
        <span class="badge-before">Before Rev 18</span>
      </div>
      <div class="img-container">
        <img src="data:image/png;base64,${beforeBase64}" alt="Before" />
      </div>
      <div class="card-body">
        <strong>Identified Root Causes:</strong>
        <ul>
          <li>Walls rendered semi-transparent (interior ghosted through solid facade)</li>
          <li>Door rendered as flat solid dark-blue slab (#1677FF box with DoubleSide)</li>
          <li>"LAB ALPHA" lower sign placed in front of door, split & overlapped</li>
          <li>Floating header ticker text collided with roofline</li>
          <li>Sky and surrounding ground were pitch-black voids</li>
          <li>Walkway floated with gap above plaza deck</li>
          <li>Building had no roof edge, canopy, or landscaping</li>
        </ul>
      </div>
    </div>

    <div class="card">
      <div class="card-header">
        <span>User Pose Reproduction</span>
        <span class="badge-after">After Rev 18</span>
      </div>
      <div class="img-container">
        <img src="data:image/png;base64,${afterBase64}" alt="After Pose" />
      </div>
      <div class="card-body">
        <strong>Reconstructed Features:</strong>
        <ul>
          <li>Solid opaque lower stone wall (0-1.0m) + white composite upper facade</li>
          <li>Tall curtain-wall glazing (#BFD8F2, opacity 0.20) with black steel mullions</li>
          <li>AutoDoor with clear glass leaves, black frames & vertical stainless pull bars</li>
          <li>Single clean fascia signs (A5X INDUSTRIES | IMPOSSIBLE ENGINEERING.)</li>
          <li>Fascia lab plates with level chips (LEARN, BUILD, INNOVATE)</li>
          <li>Hung entrance canopy (3.2x1.4m) with warm downlights & tie-rods</li>
          <li>Flush walkway with blue LED runners & circular A5X inlay crest</li>
        </ul>
      </div>
    </div>

    <div class="card">
      <div class="card-header">
        <span>Wide View from Spawn</span>
        <span class="badge-wide">Full Plaza</span>
      </div>
      <div class="img-container">
        <img src="data:image/png;base64,${wideBase64}" alt="Wide View" />
      </div>
      <div class="card-body">
        <strong>Plaza &amp; Environment:</strong>
        <ul>
          <li>14m deep paved plaza with 1024 large-format stone tiles & dark curb</li>
          <li>Surrounding lush green lawn (#7DB36A) - NO BLACK GROUND ANYWHERE</li>
          <li>Daylight sky background (#B8D7F5) with soft atmospheric haze</li>
          <li>6 Architectural trees, facade planters, 3 park benches, 2 bollards</li>
          <li>Stainless flagpole with A5X flag & freestanding wayfinding board</li>
          <li>Distant low-poly city skyline silhouette at 80m</li>
        </ul>
      </div>
    </div>
  </div>

  <div class="stats-bar">
    <div class="stat-item">
      <div class="stat-val">60 &times; 4.4 m</div>
      <div class="stat-lbl">Continuous Facade Block</div>
    </div>
    <div class="stat-item">
      <div class="stat-val">14 m Deep</div>
      <div class="stat-lbl">Paved Plaza (Z: 12 to 26)</div>
    </div>
    <div class="stat-item">
      <div class="stat-val">0</div>
      <div class="stat-lbl">Duplicate / Overlapping Signs</div>
    </div>
    <div class="stat-item">
      <div class="stat-val">0</div>
      <div class="stat-lbl">Transparent Solid Walls</div>
    </div>
    <div class="stat-item">
      <div class="stat-val">CLEAR GLASS</div>
      <div class="stat-lbl">Door Material with Stainless Bars</div>
    </div>
  </div>
</body>
</html>`;

  const htmlPath = path.join(brainDir, 'revision18_comparison.html');
  fs.writeFileSync(htmlPath, htmlContent);
  console.log(`Saved comparison HTML to ${htmlPath}`);

  const uniqueUserDataDir = path.join(os.tmpdir(), 'puppeteer_rev18_comp_' + Date.now());
  const browser = await puppeteer.launch({
    executablePath: chromePath,
    headless: 'new',
    userDataDir: uniqueUserDataDir,
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-gpu']
  });
  const page = await browser.newPage();
  await page.setViewport({ width: 1500, height: 800 });
  await page.setContent(htmlContent, { waitUntil: 'networkidle0' });

  const comparisonImgPath = path.join(brainDir, 'revision18_side_by_side_comparison.png');
  await page.screenshot({ path: comparisonImgPath, fullPage: true });
  await browser.close();
  console.log(`Saved side-by-side comparison image to ${comparisonImgPath}`);
}

createSideBySide().catch(err => {
  console.error('Error generating side-by-side comparison:', err);
  process.exit(1);
});
