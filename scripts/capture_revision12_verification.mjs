import puppeteer from 'puppeteer-core';
import path from 'path';
import fs from 'fs';

const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const artifactDir = 'C:\\Users\\MY\\.gemini\\antigravity\\brain\\d58f156e-404f-4f66-818d-bac29d65a711';

async function run() {
  console.log('Launching headless Chrome for Revision 12 (Lab Gamma) Verification...');
  const browser = await puppeteer.launch({
    executablePath: chromePath,
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-gpu']
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1920, height: 1080 });

  const consoleLogs = [];
  page.on('console', msg => {
    const text = msg.text();
    consoleLogs.push(text);
    if (text.includes('ZONE SIGN') || text.includes('ASSERTION') || text.includes('OVERLAP') || text.includes('CHAIR')) {
      console.log('BROWSER LOG:', text);
    }
  });

  console.log('Navigating to Campus page...');
  await page.goto('http://localhost:5173/campus', { waitUntil: 'domcontentloaded', timeout: 30000 });
  await page.waitForSelector('canvas', { timeout: 15000 });
  await new Promise(r => setTimeout(r, 2500));

  console.log('Waiting for teleport controller...');
  await page.waitForFunction(() => typeof window.__teleportCamera === 'function', { timeout: 15000 });

  // Ensure firstPerson mode, Gamma active, ceiling on
  await page.evaluate(() => {
    if (window.useStore) {
      window.useStore.getState().setViewMode('firstPerson');
      window.useStore.getState().setActiveLabId('gamma');
      window.useStore.getState().setShowCeiling(true);
    }
  });
  await new Promise(r => setTimeout(r, 1200));

  // ==========================================
  // 1. TEACHING WALL WIDE SHOT (Matching Reference Render 1)
  // Camera at [40.0, 1.65, 11.2], facing Z=0 (yaw = 0, pitch = -0.04)
  // ==========================================
  console.log('1. Capturing Teaching Wall Wide Shot...');
  await page.evaluate(() => {
    window.__teleportCamera(40.0, 1.65, 11.2, 0.0, -0.04);
  });
  await new Promise(r => setTimeout(r, 2000));
  const teachingPath = path.join(artifactDir, 'revision12_gamma_teaching_wall_wide.png');
  await page.screenshot({ path: teachingPath });
  console.log('Saved:', teachingPath);

  // ==========================================
  // 2. CEILING WIDE SHOT (Hexagonal White Glowing LED Ring & Ducts)
  // ==========================================
  console.log('2. Capturing Ceiling Wide Shot (Hexagonal LED Ring)...');
  await page.evaluate(() => {
    window.__teleportCamera(40.0, 1.40, 7.5, 0.0, 0.48);
  });
  await new Promise(r => setTimeout(r, 1500));
  const ceilingPath = path.join(artifactDir, 'revision12_gamma_ceiling_wide.png');
  await page.screenshot({ path: ceilingPath });
  console.log('Saved:', ceilingPath);

  // ==========================================
  // 3. LEFT WALL: CODING ZONE (2 PCs) & SOLDERING ARENA (4 Stations & Fume Arms)
  // ==========================================
  console.log('3. Capturing Left Wall (Coding & Soldering Arena)...');
  await page.evaluate(() => {
    window.__teleportCamera(42.5, 1.60, 6.0, Math.PI / 2, -0.04);
  });
  await new Promise(r => setTimeout(r, 1500));
  const leftWallPath = path.join(artifactDir, 'revision12_gamma_left_wall_wide.png');
  await page.screenshot({ path: leftWallPath });
  console.log('Saved:', leftWallPath);

  // Close-up: Soldering Arena (4 Stations, 4 Fume Arms, Pegboard)
  console.log('3B. Capturing Soldering Arena Close-Up...');
  await page.evaluate(() => {
    window.__teleportCamera(35.5, 1.45, 9.65, Math.PI / 2, -0.06);
  });
  await new Promise(r => setTimeout(r, 1500));
  const solderingClosePath = path.join(artifactDir, 'revision12_gamma_soldering_closeup.png');
  await page.screenshot({ path: solderingClosePath });
  console.log('Saved:', solderingClosePath);

  // Close-up: Coding Zone (2 PCs, Ultrawide Monitors)
  console.log('3C. Capturing Coding Zone Close-Up...');
  await page.evaluate(() => {
    window.__teleportCamera(35.2, 1.45, 2.35, Math.PI / 2, -0.06);
  });
  await new Promise(r => setTimeout(r, 1500));
  const codingClosePath = path.join(artifactDir, 'revision12_gamma_coding_closeup.png');
  await page.screenshot({ path: codingClosePath });
  console.log('Saved:', codingClosePath);

  // ==========================================
  // 4. BACK-RIGHT CORNER: DESIGN & PRINT CORNER
  // 2 Designing PCs + Bambu Lab H2D / A1 Printers wrapping the corner
  // ==========================================
  console.log('4. Capturing Design & Print Corner...');
  await page.evaluate(() => {
    window.__teleportCamera(42.2, 1.55, 3.4, -0.9, -0.05);
  });
  await new Promise(r => setTimeout(r, 1500));
  const designPrintPath = path.join(artifactDir, 'revision12_gamma_design_print_corner.png');
  await page.screenshot({ path: designPrintPath });
  console.log('Saved:', designPrintPath);

  // ==========================================
  // 5. FRONT WALL: HARDWARE ZONE & CONNECTED ELECTRONICS ZONE (5 Tiers)
  // ==========================================
  console.log('5. Capturing Front Wall (Hardware & Electronics Shelves)...');
  await page.evaluate(() => {
    window.__teleportCamera(38.5, 1.55, 7.5, Math.PI, -0.04);
  });
  await new Promise(r => setTimeout(r, 1500));
  const frontWallPath = path.join(artifactDir, 'revision12_gamma_hardware_electronics_front.png');
  await page.screenshot({ path: frontWallPath });
  console.log('Saved:', frontWallPath);

  // ==========================================
  // 6. FRONT-RIGHT CORNER: AR / VR IMMERSIVE ZONE
  // 6 VR Headsets on stands, large mountain screen, rug, beanbags
  // ==========================================
  console.log('6. Capturing AR / VR Immersive Zone...');
  await page.evaluate(() => {
    window.__teleportCamera(43.5, 1.45, 8.4, -0.95, -0.05);
  });
  await new Promise(r => setTimeout(r, 1500));
  const vrPath = path.join(artifactDir, 'revision12_gamma_ar_vr_zone.png');
  await page.screenshot({ path: vrPath });
  console.log('Saved:', vrPath);

  // ==========================================
  // 7. ROBOTICS ARENA BAY: THROUGH THE GLASS DOOR & INSIDE THE BAY
  // ==========================================
  console.log('7. Capturing Arena Bay through Glass Door...');
  await page.evaluate(() => {
    window.__teleportCamera(45.2, 1.60, 6.0, -Math.PI / 2, -0.02);
  });
  await new Promise(r => setTimeout(r, 1500));
  const arenaDoorPath = path.join(artifactDir, 'revision12_gamma_arena_through_door.png');
  await page.screenshot({ path: arenaDoorPath });
  console.log('Saved:', arenaDoorPath);

  console.log('7B. Capturing Inside Arena Bay (Track, Cars & Prep Bench)...');
  await page.evaluate(() => {
    window.__teleportCamera(49.8, 1.65, 6.0, -0.3, -0.08);
  });
  await new Promise(r => setTimeout(r, 1500));
  const arenaInsidePath = path.join(artifactDir, 'revision12_gamma_arena_inside_bay.png');
  await page.screenshot({ path: arenaInsidePath });
  console.log('Saved:', arenaInsidePath);

  // ==========================================
  // 8. TOP-DOWN CUTAWAY VIEW OF WHOLE GAMMA COMPLEX (Main Bay + Arena Bay)
  // ==========================================
  console.log('8. Capturing Top-Down Cutaway View...');
  await page.evaluate(() => {
    if (window.useStore) {
      window.useStore.getState().setViewMode('topDown');
      window.useStore.getState().setShowCeiling(false);
    }
  });
  await new Promise(r => setTimeout(r, 2000));
  const topDownPath = path.join(artifactDir, 'revision12_gamma_top_down_view.png');
  await page.screenshot({ path: topDownPath });
  console.log('Saved:', topDownPath);

  // Return to first-person for stats & checks
  await page.evaluate(() => {
    if (window.useStore) {
      window.useStore.getState().setViewMode('firstPerson');
      window.useStore.getState().setActiveLabId('gamma');
      window.useStore.getState().setShowCeiling(true);
    }
  });
  await new Promise(r => setTimeout(r, 1000));

  // ==========================================
  // 9. OVERLAP CHECKER & CHAIR COUNT CHECK
  // ==========================================
  console.log('9. Running Overlap Checker...');
  const overlapReport = await page.evaluate(() => {
    const report = window.__runOverlapCheck ? window.__runOverlapCheck() : null;
    const chairCount = window.__gammaChairCount || 0;
    return { report, chairCount };
  });
  console.log('Overlap & Chair Count Result:', JSON.stringify(overlapReport, null, 2));

  // ==========================================
  // 10. TOGGLE DEV STATS OVERLAY (KEY P)
  // ==========================================
  console.log('10. Capturing Stats Overlay...');
  await page.keyboard.press('p');
  await new Promise(r => setTimeout(r, 1000));
  const statsPath = path.join(artifactDir, 'revision12_gamma_stats.png');
  await page.screenshot({ path: statsPath });
  console.log('Saved:', statsPath);

  // Save log summary
  fs.writeFileSync(path.join(artifactDir, 'revision12_console_logs.json'), JSON.stringify(consoleLogs, null, 2));

  await browser.close();
  console.log('All Revision 12 verification captures complete.');
}

run().catch(err => {
  console.error('Error during capture:', err);
  process.exit(1);
});
