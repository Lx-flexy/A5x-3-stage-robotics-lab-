import puppeteer from 'puppeteer-core';
import path from 'path';
import fs from 'fs';
import os from 'os';

const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const artifactDir = 'C:\\Users\\MY\\.gemini\\antigravity\\brain\\d58f156e-404f-4f66-818d-bac29d65a711';

async function run() {
  console.log('Launching headless Chrome for Revision 17 (Robotics Arena Bay) Verification...');
  const uniqueUserDataDir = path.join(os.tmpdir(), 'puppeteer_rev17_' + Date.now());
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
    if (
      text.includes('VALIDATION') ||
      text.includes('ASSERTION') ||
      text.includes('OVERLAP') ||
      text.includes('ARENA') ||
      text.includes('ZONE')
    ) {
      console.log('BROWSER LOG:', text);
    }
  });

  console.log('Navigating to Campus page...');
  await page.goto('http://localhost:5173/campus', { waitUntil: 'domcontentloaded', timeout: 30000 });
  await page.waitForSelector('canvas', { timeout: 15000 });
  await new Promise(r => setTimeout(r, 2500));

  console.log('Waiting for teleport controller...');
  await page.waitForFunction(() => typeof window.__teleportCamera === 'function', { timeout: 15000 });

  // Ensure firstPerson mode, Arena active, ceiling on
  await page.evaluate(() => {
    if (window.useStore) {
      window.useStore.getState().setViewMode('firstPerson');
      window.useStore.getState().setActiveLabId('gamma-arena');
      window.useStore.getState().setShowCeiling(true);
    }
  });
  await new Promise(r => setTimeout(r, 1500));

  // Run Layout Validator and Overlap Check
  console.log('Running Layout Validation & Overlap Check...');
  const validationResult = await page.evaluate(() => {
    const arenaValidation = typeof window.__validateArenaLayout === 'function'
      ? window.__validateArenaLayout()
      : { status: 'not_found' };
    const gammaValidation = typeof window.__validateGammaLayout === 'function'
      ? window.__validateGammaLayout()
      : { status: 'not_found' };
    const overlapReport = typeof window.__runOverlapCheck === 'function'
      ? window.__runOverlapCheck()
      : { status: 'not_found' };
    return {
      arenaValidation,
      gammaValidation,
      overlapReport
    };
  });
  console.log('Validation Result:', JSON.stringify(validationResult, null, 2));

  fs.writeFileSync(
    path.join(artifactDir, 'revision17_validation_report.json'),
    JSON.stringify(validationResult, null, 2)
  );

  // ==========================================
  // 1. WIDE VIEW FROM DOOR (X = 48.6, Z = 6.0)
  // ==========================================
  console.log('1. Capturing Wide View from Door...');
  await page.evaluate(() => {
    window.__teleportCamera(48.6, 1.65, 6.0, -Math.PI / 2, 0.0);
  });
  await new Promise(r => setTimeout(r, 1800));
  const doorWidePath = path.join(artifactDir, 'revision17_arena_door_wide_view.png');
  await page.screenshot({ path: doorWidePath });
  console.log('Saved:', doorWidePath);

  // ==========================================
  // 2. BACK WALL & ROBO SOCCER ARENA
  // ==========================================
  console.log('2. Capturing Back Wall & Robo Soccer Arena...');
  await page.evaluate(() => {
    window.__teleportCamera(54.7, 1.65, 6.4, 0.0, -0.06);
  });
  await new Promise(r => setTimeout(r, 1500));
  const soccerPath = path.join(artifactDir, 'revision17_arena_backwall_soccer.png');
  await page.screenshot({ path: soccerPath });
  console.log('Saved:', soccerPath);

  // ==========================================
  // 3. ROBO RACE ARENA CLOSE-UP
  // ==========================================
  console.log('3. Capturing Robo Race Arena close-up (gantry, ramp, track, kerbs)...');
  await page.evaluate(() => {
    window.__teleportCamera(51.9, 1.65, 11.4, 0.0, -0.15);
  });
  await new Promise(r => setTimeout(r, 1500));
  const racePath = path.join(artifactDir, 'revision17_arena_race_track_closeup.png');
  await page.screenshot({ path: racePath });
  console.log('Saved:', racePath);

  // ==========================================
  // 4. LINE FOLLOWER ARENA CLOSE-UP
  // ==========================================
  console.log('4. Capturing Line Follower Arena close-up (serpentine track, hazard trim, bots)...');
  await page.evaluate(() => {
    window.__teleportCamera(57.0, 1.65, 11.4, 0.0, -0.16);
  });
  await new Promise(r => setTimeout(r, 1500));
  const linePath = path.join(artifactDir, 'revision17_arena_line_follower_closeup.png');
  await page.screenshot({ path: linePath });
  console.log('Saved:', linePath);

  // ==========================================
  // 5. TROPHY & ROBOT SHOWCASE SHELF
  // ==========================================
  console.log('5. Capturing Trophy & Robot Showcase Shelf close-up...');
  await page.evaluate(() => {
    window.__teleportCamera(51.2, 1.55, 1.8, 0.65, 0.0);
  });
  await new Promise(r => setTimeout(r, 1500));
  const trophyPath = path.join(artifactDir, 'revision17_arena_trophy_shelf.png');
  await page.screenshot({ path: trophyPath });
  console.log('Saved:', trophyPath);

  // ==========================================
  // 6. DIAGNOSTIC BENCH & GLASS WALL WITH NEON A5X SIGN
  // ==========================================
  console.log('6. Capturing Diagnostic Bench & Neon A5X Sign...');
  await page.evaluate(() => {
    window.__teleportCamera(56.8, 1.65, 8.5, -Math.PI / 2, 0.0);
  });
  await new Promise(r => setTimeout(r, 1500));
  const diagPath = path.join(artifactDir, 'revision17_arena_diagnostic_bench_glass.png');
  await page.screenshot({ path: diagPath });
  console.log('Saved:', diagPath);

  // ==========================================
  // 7. TOP-DOWN / HIGH OVERVIEW OF ENTIRE ARENA BAY
  // ==========================================
  console.log('7. Capturing Top-Down / High Overview of Arena Bay showing all aisles...');
  await page.evaluate(() => {
    window.__teleportCamera(54.0, 3.3, 11.6, 0.0, -0.55);
  });
  await new Promise(r => setTimeout(r, 1500));
  const topDownPath = path.join(artifactDir, 'revision17_arena_top_down_view.png');
  await page.screenshot({ path: topDownPath });
  console.log('Saved:', topDownPath);

  // ==========================================
  // 8. USER SCREENSHOT EXACT POSE REPRODUCTION
  // ==========================================
  console.log('8. Capturing User Screenshot Pose reproduction...');
  await page.evaluate(() => {
    window.__teleportCamera(48.8, 1.65, 9.8, -0.95, -0.02);
  });
  await new Promise(r => setTimeout(r, 1500));
  const userPosePath = path.join(artifactDir, 'revision17_arena_user_screenshot_pose.png');
  await page.screenshot({ path: userPosePath });
  console.log('Saved:', userPosePath);

  // ==========================================
  // 9. PERFORMANCE STATS OVERLAY (Key P)
  // ==========================================
  console.log('9. Capturing Stats overlay in Arena Bay...');
  await page.keyboard.press('KeyP');
  await new Promise(r => setTimeout(r, 1500));
  const statsPath = path.join(artifactDir, 'revision17_arena_stats.png');
  await page.screenshot({ path: statsPath });
  console.log('Saved:', statsPath);
  await page.keyboard.press('KeyP');
  await new Promise(r => setTimeout(r, 500));

  // Write console logs
  fs.writeFileSync(
    path.join(artifactDir, 'revision17_console_logs.json'),
    JSON.stringify(consoleLogs, null, 2)
  );

  await browser.close();
  console.log('Revision 17 automated captures completed successfully!');
}

run().catch(err => {
  console.error('Error during Revision 17 verification:', err);
  process.exit(1);
});
