import puppeteer from 'puppeteer-core';
import path from 'path';
import fs from 'fs';

const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const artifactDir = 'C:\\Users\\MY\\.gemini\\antigravity\\brain\\d58f156e-404f-4f66-818d-bac29d65a711';

async function run() {
  console.log('Launching headless Chrome for Revision 11 Verification...');
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
    if (text.includes('ZONE SIGN') || text.includes('ASSERTION') || text.includes('OVERLAP')) {
      console.log('BROWSER LOG:', text);
    }
  });

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
  // 1. SOLDERING WALL VIEW (matching media_1795259842348_e7bddc00.jpg)
  // Beta Left Wall at X = 16, Soldering bench at Z = 9.7
  // Camera at X = 20.8, Y = 1.55, Z = 9.7, facing West (yaw = Math.PI / 2)
  // ==========================================
  console.log('1. Capturing Soldering Wall View...');
  await page.evaluate(() => {
    window.__teleportCamera(20.8, 1.55, 9.7, Math.PI / 2, -0.04);
  });
  await new Promise(r => setTimeout(r, 2000));
  const solderingPath = path.join(artifactDir, 'revision11_soldering_wall.png');
  await page.screenshot({ path: solderingPath });
  console.log('Saved:', solderingPath);

  // ==========================================
  // 2. ELECTRONICS & HARDWARE SHELVES VIEW (matching media_1795259846207_8457cfad.jpg)
  // Shelves at Z = 1.5 (hardware) and Z = 3.6 (electronics)
  // Camera at X = 20.6, Y = 1.55, Z = 2.6, facing West (yaw = Math.PI / 2)
  // ==========================================
  console.log('2. Capturing Electronics & Hardware Shelves View...');
  await page.evaluate(() => {
    window.__teleportCamera(20.6, 1.55, 2.6, Math.PI / 2, -0.04);
  });
  await new Promise(r => setTimeout(r, 2000));
  const shelvesPath = path.join(artifactDir, 'revision11_electronics_hardware_shelves.png');
  await page.screenshot({ path: shelvesPath });
  console.log('Saved:', shelvesPath);

  // ==========================================
  // 3. CLOSE-UP: FULLY STOCKED PEGBOARD (4 Rows of tools & shadow-board)
  // ==========================================
  console.log('3. Capturing Close-Up of Pegboard...');
  await page.evaluate(() => {
    window.__teleportCamera(18.2, 1.52, 9.7, Math.PI / 2, 0.0);
  });
  await new Promise(r => setTimeout(r, 1500));
  const pegboardClosePath = path.join(artifactDir, 'revision11_pegboard_closeup.png');
  await page.screenshot({ path: pegboardClosePath });
  console.log('Saved:', pegboardClosePath);

  // ==========================================
  // 4. CLOSE-UP: INSTRUMENT SHELF (Oscilloscopes, PSUs, Func Gen, DMM)
  // ==========================================
  console.log('4. Capturing Close-Up of Instrument Shelf...');
  await page.evaluate(() => {
    window.__teleportCamera(18.0, 1.45, 9.7, Math.PI / 2, -0.05);
  });
  await new Promise(r => setTimeout(r, 1500));
  const instrumentsClosePath = path.join(artifactDir, 'revision11_instruments_closeup.png');
  await page.screenshot({ path: instrumentsClosePath });
  console.log('Saved:', instrumentsClosePath);

  // ==========================================
  // 5. CLOSE-UP: SOLDERING BENCH WORKSTATIONS (Hakko, Multimeters, Microscope)
  // ==========================================
  console.log('5. Capturing Close-Up of Soldering Bench Workstations...');
  await page.evaluate(() => {
    window.__teleportCamera(18.2, 1.15, 9.7, Math.PI / 2, -0.22);
  });
  await new Promise(r => setTimeout(r, 1500));
  const benchClosePath = path.join(artifactDir, 'revision11_soldering_bench_closeup.png');
  await page.screenshot({ path: benchClosePath });
  console.log('Saved:', benchClosePath);

  // ==========================================
  // 6. CLOSE-UP: HARDWARE TIER 5-SHELF (RPi5, Arduino, ESP32, Robot Cars, Arms)
  // ==========================================
  console.log('6. Capturing Close-Up of Hardware Shelf Items...');
  await page.evaluate(() => {
    window.__teleportCamera(18.2, 1.40, 1.5, Math.PI / 2, -0.06);
  });
  await new Promise(r => setTimeout(r, 1500));
  const hwClosePath = path.join(artifactDir, 'revision11_hardware_shelf_closeup.png');
  await page.screenshot({ path: hwClosePath });
  console.log('Saved:', hwClosePath);

  // ==========================================
  // 7. RUN OVERLAP CHECKER (KEY O)
  // ==========================================
  console.log('7. Running Overlap Checker...');
  const overlapReport = await page.evaluate(() => {
    if (window.__runOverlapCheck) {
      return window.__runOverlapCheck();
    }
    return null;
  });
  console.log('Overlap Report Result:', JSON.stringify(overlapReport, null, 2));

  // ==========================================
  // 8. TOGGLE DEV STATS OVERLAY (KEY P) & CAPTURE
  // ==========================================
  console.log('8. Capturing Stats Overlay...');
  await page.keyboard.press('p');
  await new Promise(r => setTimeout(r, 1000));
  const statsPath = path.join(artifactDir, 'revision11_beta_stats.png');
  await page.screenshot({ path: statsPath });
  console.log('Saved:', statsPath);

  // Save log summary
  const logSummaryPath = path.join(artifactDir, 'revision11_console_logs.json');
  fs.writeFileSync(logSummaryPath, JSON.stringify(consoleLogs, null, 2));

  await browser.close();
  console.log('Browser closed. Revision 11 verification captures complete.');
}

run().catch(err => {
  console.error('Error during capture:', err);
  process.exit(1);
});
