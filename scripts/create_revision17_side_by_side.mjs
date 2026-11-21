import puppeteer from 'puppeteer-core';
import path from 'path';
import fs from 'fs';
import os from 'os';
import { fileURLToPath } from 'url';

const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const brainDir = path.resolve('C:/Users/MY/.gemini/antigravity/brain/d58f156e-404f-4f66-818d-bac29d65a711');

async function createSideBySide() {
  const beforeImg = path.join(brainDir, '.user_uploaded/media_1795266238971_f8b70bd3.jpg');
  const referenceImg = path.join(brainDir, '.user_uploaded/media_1795266243307_9d63a6b3.jpg');
  const afterImg = path.join(brainDir, 'revision17_arena_user_screenshot_pose.png');
  const wideImg = path.join(brainDir, 'revision17_arena_wide_view.png');

  const beforeBase64 = fs.existsSync(beforeImg) ? fs.readFileSync(beforeImg).toString('base64') : '';
  const refBase64 = fs.existsSync(referenceImg) ? fs.readFileSync(referenceImg).toString('base64') : '';
  const afterBase64 = fs.existsSync(afterImg) ? fs.readFileSync(afterImg).toString('base64') : '';
  const wideBase64 = fs.existsSync(wideImg) ? fs.readFileSync(wideImg).toString('base64') : '';

  const htmlContent = `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>Revision 17: Robotics Arena Bay Visual Comparison</title>
  <style>
    * { box-sizing: border-box; margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; }
    body { background: #0B111E; color: #E2E8F0; padding: 28px; }
    h1 { font-size: 26px; font-weight: 700; color: #38BDF8; margin-bottom: 6px; }
    .subtitle { font-size: 14px; color: #94A3B8; margin-bottom: 24px; }
    .grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px; margin-bottom: 24px; }
    .card { background: #161F30; border: 1px solid #2A3952; border-radius: 10px; overflow: hidden; display: flex; flex-direction: column; }
    .card-header { padding: 12px 16px; font-size: 14px; font-weight: 600; background: #1E2B42; border-bottom: 1px solid #2A3952; display: flex; justify-content: space-between; align-items: center; }
    .badge-before { background: #DC2626; color: #fff; padding: 2px 8px; border-radius: 4px; font-size: 11px; }
    .badge-ref { background: #2563EB; color: #fff; padding: 2px 8px; border-radius: 4px; font-size: 11px; }
    .badge-after { background: #059669; color: #fff; padding: 2px 8px; border-radius: 4px; font-size: 11px; }
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
  <h1>Revision 17: Robotics Arena Bay Reconstruction</h1>
  <div class="subtitle">Complete rebuild to match reference render &bull; 12x12m footprint &bull; 3 distinct arenas &bull; Single-sign per zone &bull; Zero overlaps</div>
  
  <div class="grid">
    <div class="card">
      <div class="card-header">
        <span>Previous State (Broken)</span>
        <span class="badge-before">Before Rev 17</span>
      </div>
      <div class="img-container">
        <img src="data:image/jpeg;base64,${beforeBase64}" alt="Before" />
      </div>
      <div class="card-body">
        <strong>Identified Root Causes:</strong>
        <ul>
          <li>Misrotated dark ramp panel clipping through platform</li>
          <li>Flat light-blue slab instead of 3 distinct arena modules</li>
          <li>Plain black unlit skirt without LED accent or backlit typography</li>
          <li>Overlapping header banner & text ticker planes</li>
          <li>Hanging ceiling sign obstructing wall graphics</li>
          <li>Black void ceiling above side walls</li>
        </ul>
      </div>
    </div>

    <div class="card">
      <div class="card-header">
        <span>Reference Target Render</span>
        <span class="badge-ref">Design Spec</span>
      </div>
      <div class="img-container">
        <img src="data:image/jpeg;base64,${refBase64}" alt="Reference" />
      </div>
      <div class="card-body">
        <strong>Key Architectural Design Features:</strong>
        <ul>
          <li>Large Hexagonal Navy Wall Display with 4 Arena Icons</li>
          <li>Central Raised Robo Soccer Pitch with Goals & Clear Rails</li>
          <li>Octagonal Robo Race Arena with Start/Finish Gantry & Kerbs</li>
          <li>Rectangular Line Follower Arena with Obstacles & Hazard Trim</li>
          <li>4-Tier Trophy & Robot Chassis Display Shelf (Back Left)</li>
          <li>Wall-mounted Diagnostic & Rework Bench (Right Wall)</li>
          <li>Electric-Blue LED Skirting with Backlit Zone Typography</li>
        </ul>
      </div>
    </div>

    <div class="card">
      <div class="card-header">
        <span>Implemented Implementation</span>
        <span class="badge-after">After Rev 17</span>
      </div>
      <div class="img-container">
        <img src="data:image/png;base64,${afterBase64}" alt="After" />
      </div>
      <div class="card-body">
        <strong>Reconstruction Results:</strong>
        <ul>
          <li>Full 12x12m footprint with complete floor-to-ceiling perimeter fascia</li>
          <li>Hexagonal navy wall frame + single clean header (zero duplicate text)</li>
          <li>3 fully textured and lit arenas with animated robots</li>
          <li>All perimeter and cross aisles validated &ge; 1.2m (door lane 1.6m)</li>
          <li>Suspended black spot cans with emissive lenses over each arena</li>
          <li>Interactive diagnostic bench and trophy shelf with Key E prompts</li>
        </ul>
      </div>
    </div>
  </div>

  <div class="stats-bar">
    <div class="stat-item">
      <div class="stat-val">12 &times; 12 m</div>
      <div class="stat-lbl">Arena Bay Dimensions</div>
    </div>
    <div class="stat-item">
      <div class="stat-val">&ge; 1.2 m</div>
      <div class="stat-lbl">All Aisle Clearances (1.6m Door)</div>
    </div>
    <div class="stat-item">
      <div class="stat-val">0</div>
      <div class="stat-lbl">AABB Overlaps (Key O)</div>
    </div>
    <div class="stat-item">
      <div class="stat-val">0</div>
      <div class="stat-lbl">Duplicate Signs</div>
    </div>
    <div class="stat-item">
      <div class="stat-val">PASS</div>
      <div class="stat-lbl">Layout &amp; Adjacency Validation</div>
    </div>
  </div>
</body>
</html>`;

  const htmlPath = path.join(brainDir, 'revision17_comparison.html');
  fs.writeFileSync(htmlPath, htmlContent);
  console.log(`Saved comparison HTML to ${htmlPath}`);

  const uniqueUserDataDir = path.join(os.tmpdir(), 'puppeteer_rev17_comp_' + Date.now());
  const browser = await puppeteer.launch({
    executablePath: chromePath,
    headless: 'new',
    userDataDir: uniqueUserDataDir,
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-gpu']
  });
  const page = await browser.newPage();
  await page.setViewport({ width: 1500, height: 800 });
  await page.setContent(htmlContent, { waitUntil: 'networkidle0' });

  const comparisonImgPath = path.join(brainDir, 'revision17_side_by_side_comparison.png');
  await page.screenshot({ path: comparisonImgPath, fullPage: true });
  await browser.close();
  console.log(`Saved side-by-side comparison image to ${comparisonImgPath}`);
}

createSideBySide().catch(err => {
  console.error('Error generating side-by-side comparison:', err);
  process.exit(1);
});
