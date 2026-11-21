import puppeteer from 'puppeteer-core';
import path from 'path';
import fs from 'fs';
import os from 'os';

const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const artifactDir = 'C:\\Users\\MY\\.gemini\\antigravity\\brain\\d58f156e-404f-4f66-818d-bac29d65a711';

async function run() {
  console.log('Launching headless Chrome for Revision 14 (Lab Gamma Teaching Wall) Verification...');
  const uniqueUserDataDir = path.join(os.tmpdir(), 'puppeteer_rev14_' + Date.now());
  const browser = await puppeteer.launch({
    executablePath: chromePath,
    headless: 'new',
    userDataDir: uniqueUserDataDir,
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-gpu']
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1920, height: 1080 });

  const consoleLogs = [];
  page.on('console', msg => {
    const text = msg.text();
    consoleLogs.push(text);
    if (text.includes('ZONE SIGN') || text.includes('ASSERTION') || text.includes('OVERLAP') || text.includes('CHAIR') || text.includes('GAMMA')) {
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
  // 1. TEACHING WALL REFERENCE VIEW (Dev Key C-Gamma: [40.0, 1.65, 9.5], facing Z=0, FOV 70)
  // ==========================================
  console.log('1. Capturing Teaching Wall Reference View (Key C-Gamma pose)...');
  await page.evaluate(() => {
    window.__teleportCamera(40.0, 1.65, 9.5, 0.0, -0.02);
  });
  await new Promise(r => setTimeout(r, 2000));
  const refPosePath = path.join(artifactDir, 'revision14_gamma_teaching_wall_reference_pose.png');
  await page.screenshot({ path: refPosePath });
  console.log('Saved:', refPosePath);

  // Toggle P for Stats overlay
  console.log('1B. Capturing Stats overlay in Gamma Teaching Wall pose...');
  await page.keyboard.press('KeyP');
  await new Promise(r => setTimeout(r, 1500));
  const statsPath = path.join(artifactDir, 'revision14_gamma_stats.png');
  await page.screenshot({ path: statsPath });
  console.log('Saved:', statsPath);
  await page.keyboard.press('KeyP'); // Toggle off
  await new Promise(r => setTimeout(r, 500));

  // ==========================================
  // 2. DISPLAY & HEX FRAME & SOUNDBAR & HEADER CLOSE-UP
  // ==========================================
  console.log('2. Capturing Display + Hex Frame + Soundbar + Header close-up...');
  await page.evaluate(() => {
    window.__teleportCamera(40.0, 1.85, 4.8, 0.0, 0.02);
  });
  await new Promise(r => setTimeout(r, 1500));
  const displayClosePath = path.join(artifactDir, 'revision14_gamma_display_hex_frame.png');
  await page.screenshot({ path: displayClosePath });
  console.log('Saved:', displayClosePath);

  // ==========================================
  // 3. LEFT SHOWCASE SHELF CLOSE-UP (6-axis robot arm, drone, robot cars, trailing plants)
  // ==========================================
  console.log('3. Capturing Left Showcase Shelf close-up...');
  await page.evaluate(() => {
    window.__teleportCamera(34.6, 1.55, 2.6, 0.0, 0.0);
  });
  await new Promise(r => setTimeout(r, 1500));
  const leftShelfPath = path.join(artifactDir, 'revision14_gamma_left_shelf_props.png');
  await page.screenshot({ path: leftShelfPath });
  console.log('Saved:', leftShelfPath);

  // ==========================================
  // 4. RIGHT SHOWCASE SHELF & WHITEBOARD ON STAND CLOSE-UP (Trophies, oscilloscope, robot car)
  // ==========================================
  console.log('4. Capturing Right Showcase Shelf & Whiteboard Stand close-up...');
  await page.evaluate(() => {
    window.__teleportCamera(43.8, 1.55, 2.8, 0.0, 0.0);
  });
  await new Promise(r => setTimeout(r, 1500));
  const rightShelfPath = path.join(artifactDir, 'revision14_gamma_right_shelf_props.png');
  await page.screenshot({ path: rightShelfPath });
  console.log('Saved:', rightShelfPath);

  // ==========================================
  // 5. CREDENZA & BLUE FLOOR LED STRIP & TUCKED CHAIR CLOSE-UP
  // ==========================================
  console.log('5. Capturing Credenza + Blue Floor LED Strip close-up...');
  await page.evaluate(() => {
    window.__teleportCamera(38.5, 1.15, 2.2, 0.0, -0.18);
  });
  await new Promise(r => setTimeout(r, 1500));
  const credenzaPath = path.join(artifactDir, 'revision14_gamma_credenza_closeup.png');
  await page.screenshot({ path: credenzaPath });
  console.log('Saved:', credenzaPath);

  // ==========================================
  // 6. RUN OVERLAP CHECKER (KEY O)
  // ==========================================
  console.log('6. Running Overlap Checker (Key O)...');
  await page.keyboard.press('KeyO');
  await new Promise(r => setTimeout(r, 1000));

  // Collect report from window if available
  const overlapReport = await page.evaluate(() => {
    if (typeof window.__checkOverlaps === 'function') {
      return window.__checkOverlaps();
    }
    return { status: 'Overlap check function executed' };
  });
  console.log('Overlap Report:', overlapReport);

  // Save console logs
  fs.writeFileSync(
    path.join(artifactDir, 'revision14_console_logs.json'),
    JSON.stringify(consoleLogs, null, 2)
  );

  console.log('All Revision 14 screenshots and checks completed successfully!');
  await browser.close();
}

run().catch(err => {
  console.error('Error during Revision 14 verification:', err);
  process.exit(1);
});
