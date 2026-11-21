import puppeteer from 'puppeteer-core';
import path from 'path';
import fs from 'fs';

const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const artifactDir = 'C:\\Users\\MY\\.gemini\\antigravity\\brain\\d58f156e-404f-4f66-818d-bac29d65a711';

async function run() {
  console.log('Launching headless Chrome for Revision 8 Beta Verification...');
  const browser = await puppeteer.launch({
    executablePath: chromePath,
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-gpu']
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1920, height: 1080 });

  console.log('Navigating to Campus page...');
  await page.goto('http://localhost:5173/campus', { waitUntil: 'domcontentloaded', timeout: 30000 });
  await page.waitForSelector('canvas', { timeout: 15000 });
  await new Promise(r => setTimeout(r, 2500));

  console.log('Waiting for teleport controller...');
  await page.waitForFunction(() => typeof window.__teleportCamera === 'function', { timeout: 15000 });

  // Ensure firstPerson mode, Beta active, ceiling on
  await page.evaluate(() => {
    if (window.useStore) {
      window.useStore.getState().setViewMode('firstPerson');
      window.useStore.getState().setActiveLabId('beta');
      window.useStore.getState().setShowCeiling(true);
    }
  });
  await new Promise(r => setTimeout(r, 1000));

  // ==========================================
  // 1. TEACHING WALL (Matches Reference 1)
  // Back wall at Z=0, facing -Z (yaw=0)
  // Camera down central aisle at [24.0, 1.65, 10.2]
  // ==========================================
  console.log('1. Capturing Beta Teaching Wall (Reference 1 match)...');
  await page.evaluate(() => {
    window.__teleportCamera(24.0, 1.65, 10.2, 0, -0.04);
  });
  await new Promise(r => setTimeout(r, 1500));
  const view1Path = path.join(artifactDir, 'revision8_beta_teaching_wall.png');
  await page.screenshot({ path: view1Path });
  console.log('Saved:', view1Path);

  // Close-up of teaching wall
  await page.evaluate(() => {
    window.__teleportCamera(24.0, 1.65, 5.2, 0, -0.03);
  });
  await new Promise(r => setTimeout(r, 1000));
  const view1ClosePath = path.join(artifactDir, 'revision8_beta_teaching_wall_closeup.png');
  await page.screenshot({ path: view1ClosePath });
  console.log('Saved:', view1ClosePath);

  // ==========================================
  // 2. HARDWARE + SOLDERING + ELECTRONICS WALL (Matches Reference 2)
  // Left wall at X=16, facing -X (yaw = Math.PI / 2)
  // Camera at [22.4, 1.65, 6.0]
  // ==========================================
  console.log('2. Capturing Beta Left Wall (Reference 2 match)...');
  await page.evaluate(() => {
    window.__teleportCamera(22.2, 1.65, 6.0, Math.PI / 2, -0.03);
  });
  await new Promise(r => setTimeout(r, 1500));
  const view2Path = path.join(artifactDir, 'revision8_beta_left_wall.png');
  await page.screenshot({ path: view2Path });
  console.log('Saved:', view2Path);

  // Close-up of hardware shelf with RPi5 & ESP32
  await page.evaluate(() => {
    window.__teleportCamera(18.5, 1.65, 2.3, Math.PI / 2, -0.05);
  });
  await new Promise(r => setTimeout(r, 1000));
  const view2HardPath = path.join(artifactDir, 'revision8_beta_hardware_closeup.png');
  await page.screenshot({ path: view2HardPath });
  console.log('Saved:', view2HardPath);

  // Close-up of soldering bench & pegboard tools
  await page.evaluate(() => {
    window.__teleportCamera(18.5, 1.65, 9.6, Math.PI / 2, -0.05);
  });
  await new Promise(r => setTimeout(r, 1000));
  const view2SoldPath = path.join(artifactDir, 'revision8_beta_soldering_closeup.png');
  await page.screenshot({ path: view2SoldPath });
  console.log('Saved:', view2SoldPath);

  // ==========================================
  // 3. 3D PRINTING ZONE (Matches Reference 3)
  // Right wall back segment at X=32, Z: 0-4.5, facing +X (yaw = -Math.PI / 2)
  // ==========================================
  console.log('3. Capturing Beta 3D Printing Zone (Reference 3 match)...');
  await page.evaluate(() => {
    window.__teleportCamera(27.8, 1.65, 2.25, -Math.PI / 2, -0.04);
  });
  await new Promise(r => setTimeout(r, 1500));
  const view3Path = path.join(artifactDir, 'revision8_beta_3d_printing.png');
  await page.screenshot({ path: view3Path });
  console.log('Saved:', view3Path);

  // Close-up of Bambu Lab A1 printer printing blue vase
  await page.evaluate(() => {
    window.__teleportCamera(29.6, 1.45, 2.05, -Math.PI / 2, -0.1);
  });
  await new Promise(r => setTimeout(r, 1000));
  const view3ClosePath = path.join(artifactDir, 'revision8_beta_bambu_closeup.png');
  await page.screenshot({ path: view3ClosePath });
  console.log('Saved:', view3ClosePath);

  // ==========================================
  // 4. DESIGNING + CODING AREA (Matches Reference 4)
  // Right wall front segment at X=32, Z: 7.5-12, facing +X (yaw = -Math.PI / 2)
  // ==========================================
  console.log('4. Capturing Beta Designing + Coding Area (Reference 4 match)...');
  await page.evaluate(() => {
    window.__teleportCamera(27.8, 1.65, 9.8, -Math.PI / 2, -0.04);
  });
  await new Promise(r => setTimeout(r, 1500));
  const view4Path = path.join(artifactDir, 'revision8_beta_coding_designing.png');
  await page.screenshot({ path: view4Path });
  console.log('Saved:', view4Path);

  // ==========================================
  // 5. DEV STATS OVERLAY (FPS, draw calls, triangles)
  // ==========================================
  console.log('5. Toggling Dev Stats Overlay (Key P)...');
  await page.keyboard.press('KeyP');
  await new Promise(r => setTimeout(r, 1200));
  const statsPath = path.join(artifactDir, 'revision8_beta_stats.png');
  await page.screenshot({ path: statsPath });
  console.log('Saved:', statsPath);

  // ==========================================
  // 6. BUILD SIDE-BY-SIDE COMPOSITE COMPARISON
  // ==========================================
  console.log('6. Building side-by-side comparison HTML...');
  const ref1Base64 = fs.readFileSync(path.join(artifactDir, '.user_uploaded', 'media_1795257706394_012a9d38.jpg')).toString('base64');
  const ref2Base64 = fs.readFileSync(path.join(artifactDir, '.user_uploaded', 'media_1795257710292_6364a8c8.jpg')).toString('base64');
  const ref3Base64 = fs.readFileSync(path.join(artifactDir, '.user_uploaded', 'media_1795257715728_9c6a2f62.jpg')).toString('base64');
  const ref4Base64 = fs.readFileSync(path.join(artifactDir, '.user_uploaded', 'media_1795257723593_6c05b22c.jpg')).toString('base64');

  const b1Base64 = fs.readFileSync(view1Path).toString('base64');
  const b2Base64 = fs.readFileSync(view2Path).toString('base64');
  const b3Base64 = fs.readFileSync(view3Path).toString('base64');
  const b4Base64 = fs.readFileSync(view4Path).toString('base64');

  const comparisonHtml = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>Revision 8: Lab Beta 4-View Reference Comparison</title>
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
    .header { text-align: center; margin-bottom: 30px; }
    .badge {
      display: inline-block; padding: 6px 14px; border-radius: 9999px;
      background: #1677FF; color: #FFFFFF; font-size: 12px; font-weight: 700;
      letter-spacing: 0.05em; text-transform: uppercase; margin-bottom: 12px;
    }
    .header h1 { font-size: 30px; font-weight: 800; margin-bottom: 6px; }
    .header p { font-size: 15px; color: #94A3B8; }
    .section-title {
      font-size: 20px; font-weight: 700; color: #38BDF8; margin: 36px 0 16px 0;
      align-self: flex-start; max-width: 1840px; width: 100%;
      border-bottom: 1px solid rgba(255,255,255,0.1); padding-bottom: 8px;
    }
    .grid {
      display: grid; grid-template-columns: 1fr 1fr; gap: 24px;
      width: 100%; max-width: 1840px; margin-bottom: 24px;
    }
    .card {
      background: #151C26; border: 1px solid rgba(255, 255, 255, 0.08);
      border-radius: 16px; overflow: hidden; display: flex; flex-direction: column;
    }
    .card-header {
      padding: 12px 18px; font-size: 14px; font-weight: 600;
      display: flex; justify-content: space-between; align-items: center;
      background: rgba(255, 255, 255, 0.03); border-bottom: 1px solid rgba(255, 255, 255, 0.06);
    }
    .tag-ref { color: #F59E0B; background: rgba(245, 158, 11, 0.15); padding: 3px 10px; border-radius: 6px; font-size: 12px; }
    .tag-build { color: #10B981; background: rgba(16, 185, 129, 0.15); padding: 3px 10px; border-radius: 6px; font-size: 12px; }
    .img-wrap { width: 100%; aspect-ratio: 16/9; background: #000; overflow: hidden; display: flex; align-items: center; justify-content: center; }
    .img-wrap img { width: 100%; height: 100%; object-fit: contain; }
  </style>
</head>
<body>
  <div class="header">
    <div class="badge">A5X Innovation Lab Complex</div>
    <h1>Lab Beta — 4-View Reference Comparison</h1>
    <p>Side-by-side verification: User Reference Concept Renders vs. Revision 8 Real-Time 3D Build</p>
  </div>

  <div class="section-title">VIEW 1: TEACHING WALL (Back Wall)</div>
  <div class="grid">
    <div class="card">
      <div class="card-header"><span>Reference Concept</span><span class="tag-ref">Reference Render</span></div>
      <div class="img-wrap"><img src="data:image/jpeg;base64,${ref1Base64}" /></div>
    </div>
    <div class="card">
      <div class="card-header"><span>Revision 8 Implementation</span><span class="tag-build">Real-Time WebGL</span></div>
      <div class="img-wrap"><img src="data:image/png;base64,${b1Base64}" /></div>
    </div>
  </div>

  <div class="section-title">VIEW 2: HARDWARE + ELECTRONICS + SOLDERING WALL (Left Wall)</div>
  <div class="grid">
    <div class="card">
      <div class="card-header"><span>Reference Concept</span><span class="tag-ref">Reference Render</span></div>
      <div class="img-wrap"><img src="data:image/jpeg;base64,${ref2Base64}" /></div>
    </div>
    <div class="card">
      <div class="card-header"><span>Revision 8 Implementation</span><span class="tag-build">Real-Time WebGL</span></div>
      <div class="img-wrap"><img src="data:image/png;base64,${b2Base64}" /></div>
    </div>
  </div>

  <div class="section-title">VIEW 3: 3D PRINTING ZONE & PROTOTYPES (Right Wall Back)</div>
  <div class="grid">
    <div class="card">
      <div class="card-header"><span>Reference Concept</span><span class="tag-ref">Reference Render</span></div>
      <div class="img-wrap"><img src="data:image/jpeg;base64,${ref3Base64}" /></div>
    </div>
    <div class="card">
      <div class="card-header"><span>Revision 8 Implementation</span><span class="tag-build">Real-Time WebGL</span></div>
      <div class="img-wrap"><img src="data:image/png;base64,${b3Base64}" /></div>
    </div>
  </div>

  <div class="section-title">VIEW 4: CODING & DESIGNING WORKSTATIONS (Right Wall Front)</div>
  <div class="grid">
    <div class="card">
      <div class="card-header"><span>Reference Concept</span><span class="tag-ref">Reference Render</span></div>
      <div class="img-wrap"><img src="data:image/jpeg;base64,${ref4Base64}" /></div>
    </div>
    <div class="card">
      <div class="card-header"><span>Revision 8 Implementation</span><span class="tag-build">Real-Time WebGL</span></div>
      <div class="img-wrap"><img src="data:image/png;base64,${b4Base64}" /></div>
    </div>
  </div>
</body>
</html>
  `;

  const comparisonHtmlPath = path.join(artifactDir, 'revision8_comparison.html');
  fs.writeFileSync(comparisonHtmlPath, comparisonHtml);
  console.log('Saved comparison HTML to:', comparisonHtmlPath);

  // Render composite image of the comparison
  await page.setContent(comparisonHtml, { waitUntil: 'load' });
  await page.setViewport({ width: 1920, height: 4200 });
  await new Promise(r => setTimeout(r, 1000));
  const compositePath = path.join(artifactDir, 'revision8_side_by_side_comparison.png');
  await page.screenshot({ path: compositePath, fullPage: true });
  console.log('Saved composite comparison screenshot to:', compositePath);

  await browser.close();
  console.log('All Revision 8 captures and comparisons generated successfully!');
}

run().catch(err => {
  console.error('Error during capture:', err);
  process.exit(1);
});
