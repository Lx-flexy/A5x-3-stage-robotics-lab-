import puppeteer from 'puppeteer-core';
import path from 'path';
import fs from 'fs';
import os from 'os';

const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const brainDir = path.resolve('C:/Users/MY/.gemini/antigravity/brain/d58f156e-404f-4f66-818d-bac29d65a711');

async function createSideBySide() {
  const beforeImg = path.join(brainDir, '.user_uploaded/media_1795324172874_9fb3c32a.png');
  const afterImg = path.join(brainDir, 'revision19_user_screenshot_pose.png');
  const wideImg = path.join(brainDir, 'revision19_wide_spawn_rooftop.png');

  const beforeBase64 = fs.existsSync(beforeImg) ? fs.readFileSync(beforeImg).toString('base64') : '';
  const afterBase64 = fs.existsSync(afterImg) ? fs.readFileSync(afterImg).toString('base64') : '';
  const wideBase64 = fs.existsSync(wideImg) ? fs.readFileSync(wideImg).toString('base64') : '';

  const htmlContent = `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>Revision 19: Facade Sign Fix & Big Rooftop Brand Board</title>
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
  <h1>Revision 19: Facade Sign Fix &amp; Big Rooftop Brand Board</h1>
  <div class="subtitle">Complete resolution of sign collision &bull; Removal of hanging wires &bull; Navy #0B2A5B illuminated canopy underside &bull; 14m Big Rooftop Brand Board at horizontal centre</div>
  
  <div class="grid">
    <div class="card">
      <div class="card-header">
        <span>Previous State (Defects)</span>
        <span class="badge-before">Before Rev 19</span>
      </div>
      <div class="img-container">
        <img src="data:image/png;base64,${beforeBase64}" alt="Before" />
      </div>
      <div class="card-body">
        <strong>Identified Root Causes:</strong>
        <ul>
          <li>A5X INDUSTRIES banner (X=8, W=8m) physically overlapped LAB ALPHA plate (X=3.7, W=4.2m) by 1.8m</li>
          <li>Thin diagonal hanger tie-rods crossed in front of sign face, appearing as hanging wires</li>
          <li>Canopy underside rendered pitch black (#071B3A unlit in shadow)</li>
          <li>No major campus identity on roof</li>
        </ul>
      </div>
    </div>

    <div class="card">
      <div class="card-header">
        <span>Canopy &amp; Sign Pose Reproduction</span>
        <span class="badge-after">After Rev 19</span>
      </div>
      <div class="img-container">
        <img src="data:image/png;base64,${afterBase64}" alt="After Pose" />
      </div>
      <div class="card-body">
        <strong>Reconstructed Facade &amp; Canopy:</strong>
        <ul>
          <li>Old brand banner completely removed from above the door</li>
          <li>Door canopy area carries only a clean small centred "A5X" mark</li>
          <li>LAB ALPHA plate left-aligned with 1.0m clearance (&ge; 0.5m) to canopy edge</li>
          <li>Canopy underside rendered in navy #0B2A5B with warm downlights & blue LED edge</li>
          <li>Hanging wires removed; replaced with two slim 60mm black-steel columns</li>
        </ul>
      </div>
    </div>

    <div class="card">
      <div class="card-header">
        <span>Wide View from Spawn</span>
        <span class="badge-wide">Rooftop Board</span>
      </div>
      <div class="img-container">
        <img src="data:image/png;base64,${wideBase64}" alt="Wide View" />
      </div>
      <div class="card-body">
        <strong>Big Rooftop Brand Board (14 &times; 3.2 m):</strong>
        <ul>
          <li>Positioned exactly at horizontal centre (X = totalWidth / 2 = 30.0m)</li>
          <li>Stands 0.8m above roof on black-steel truss base with diagonal cross-braces</li>
          <li>A5X Chevron + "A5X INDUSTRIES" (raised bold white) | "ROBOTICS LAB"</li>
          <li>Subtle 6s LED edge shimmer pulse + dual top floodlight fixtures</li>
          <li>Aviation red beacon safety dots & full rear catwalk with safety handrail</li>
        </ul>
      </div>
    </div>
  </div>

  <div class="stats-bar">
    <div class="stat-item">
      <div class="stat-val">14 &times; 3.2 m</div>
      <div class="stat-lbl">Rooftop Brand Board</div>
    </div>
    <div class="stat-item">
      <div class="stat-val">X = 30.0 m</div>
      <div class="stat-lbl">Exact Horizontal Centre</div>
    </div>
    <div class="stat-item">
      <div class="stat-val">1.0 m</div>
      <div class="stat-lbl">Alpha Plate Clearance (&ge; 0.5m)</div>
    </div>
    <div class="stat-item">
      <div class="stat-val">0</div>
      <div class="stat-lbl">Hanging Wires (2 Slim Columns)</div>
    </div>
    <div class="stat-item">
      <div class="stat-val">#0B2A5B</div>
      <div class="stat-lbl">Illuminated Navy Canopy Underside</div>
    </div>
  </div>
</body>
</html>`;

  const htmlPath = path.join(brainDir, 'revision19_comparison.html');
  fs.writeFileSync(htmlPath, htmlContent);
  console.log(`Saved comparison HTML to ${htmlPath}`);

  const uniqueUserDataDir = path.join(os.tmpdir(), 'puppeteer_rev19_comp_' + Date.now());
  const browser = await puppeteer.launch({
    executablePath: chromePath,
    headless: 'new',
    userDataDir: uniqueUserDataDir,
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-gpu']
  });
  const page = await browser.newPage();
  await page.setViewport({ width: 1500, height: 800 });
  await page.setContent(htmlContent, { waitUntil: 'networkidle0' });

  const comparisonImgPath = path.join(brainDir, 'revision19_side_by_side_comparison.png');
  await page.screenshot({ path: comparisonImgPath, fullPage: true });
  await browser.close();
  console.log(`Saved side-by-side comparison image to ${comparisonImgPath}`);
}

createSideBySide().catch(err => {
  console.error('Error generating side-by-side comparison:', err);
  process.exit(1);
});
