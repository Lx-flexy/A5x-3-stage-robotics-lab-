import puppeteer from 'puppeteer-core';
import path from 'path';
import fs from 'fs';
import os from 'os';

const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const artifactDir = 'C:\\Users\\MY\\.gemini\\antigravity\\brain\\d58f156e-404f-4f66-818d-bac29d65a711';

async function run() {
  console.log('Launching headless Chrome for Revision 16 Verification...');
  const uniqueUserDataDir = path.join(os.tmpdir(), 'puppeteer_rev16_' + Date.now());
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
      text.includes('CHAIR') ||
      text.includes('GAMMA') ||
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

  // Ensure firstPerson mode, Gamma active, ceiling on
  await page.evaluate(() => {
    if (window.useStore) {
      window.useStore.getState().setViewMode('firstPerson');
      window.useStore.getState().setActiveLabId('gamma');
      window.useStore.getState().setShowCeiling(true);
    }
  });
  await new Promise(r => setTimeout(r, 1500));

  // Run Layout Validator and Overlap Check
  console.log('Running Gamma Layout Validation & Overlap Check...');
  const validationResult = await page.evaluate(() => {
    const layoutReport = typeof window.__validateGammaLayout === 'function'
      ? window.__validateGammaLayout()
      : { status: 'not_found' };
    const overlapReport = typeof window.__runOverlapCheck === 'function'
      ? window.__runOverlapCheck()
      : { status: 'not_found' };
    const chairCount = window.__gammaChairCount || 0;
    return {
      chairCount,
      layoutValidation: layoutReport,
      overlapCheck: overlapReport
    };
  });
  console.log('Validation Result:', JSON.stringify(validationResult, null, 2));

  fs.writeFileSync(
    path.join(artifactDir, 'revision16_validation_report.json'),
    JSON.stringify(validationResult, null, 2)
  );

  // ==========================================
  // 1. TOP-DOWN / HIGH OVERVIEW OF GAMMA MAIN BAY
  // ==========================================
  console.log('1. Capturing Top-Down / High Overview of Gamma...');
  await page.evaluate(() => {
    window.__teleportCamera(40.0, 3.2, 10.5, 0.0, -0.42);
  });
  await new Promise(r => setTimeout(r, 1800));
  const topDownPath = path.join(artifactDir, 'revision16_gamma_top_down_view.png');
  await page.screenshot({ path: topDownPath });
  console.log('Saved:', topDownPath);

  // ==========================================
  // 2. DESIGN & PRINT CORNER CLOSE-UP
  // ==========================================
  console.log('2. Capturing Design & Print Corner close-up...');
  // Stand at X=44.2, Z=2.8 looking towards right wall corner (X=47.5, Z=2.0)
  await page.evaluate(() => {
    window.__teleportCamera(44.2, 1.55, 3.2, -1.05, 0.02);
  });
  await new Promise(r => setTimeout(r, 1500));
  const designPrintPath = path.join(artifactDir, 'revision16_gamma_design_print_corner.png');
  await page.screenshot({ path: designPrintPath });
  console.log('Saved:', designPrintPath);

  // ==========================================
  // 3. AR/VR CORNER CLOSE-UP
  // ==========================================
  console.log('3. Capturing AR/VR Zone close-up...');
  // Stand at X=44.0, Z=9.5 looking towards X=47.5, Z=9.8
  await page.evaluate(() => {
    window.__teleportCamera(44.0, 1.55, 9.5, -1.35, 0.0);
  });
  await new Promise(r => setTimeout(r, 1500));
  const arvrPath = path.join(artifactDir, 'revision16_gamma_ar_vr_corner.png');
  await page.screenshot({ path: arvrPath });
  console.log('Saved:', arvrPath);

  // ==========================================
  // 4. SEATING GROUP OVERVIEW
  // ==========================================
  console.log('4. Capturing Seating Group overview (showing see-through A-frames and 1.8m center aisle)...');
  // Stand at X=40.0, Z=10.6 looking towards -Z
  await page.evaluate(() => {
    window.__teleportCamera(40.0, 1.65, 10.6, 0.0, -0.05);
  });
  await new Promise(r => setTimeout(r, 1500));
  const seatingPath = path.join(artifactDir, 'revision16_gamma_seating_overview.png');
  await page.screenshot({ path: seatingPath });
  console.log('Saved:', seatingPath);

  // ==========================================
  // 4B. STATS OVERLAY IN SEATING VIEW
  // ==========================================
  console.log('4B. Capturing Stats overlay in Seating View...');
  await page.keyboard.press('KeyP');
  await new Promise(r => setTimeout(r, 1500));
  const statsPath = path.join(artifactDir, 'revision16_gamma_stats.png');
  await page.screenshot({ path: statsPath });
  console.log('Saved:', statsPath);
  await page.keyboard.press('KeyP');
  await new Promise(r => setTimeout(r, 500));

  // ==========================================
  // 5. CHAIR CLOSE-UP
  // ==========================================
  console.log('5. Capturing Chair Model close-up (mesh backrest, royal blue cushion, 5-star base, armrests)...');
  await page.evaluate(() => {
    // Focus on rightmost chair of front-left table
    window.__teleportCamera(38.3, 0.85, 4.15, 0.45, -0.15);
  });
  await new Promise(r => setTimeout(r, 1500));
  const chairClosePath = path.join(artifactDir, 'revision16_gamma_chair_closeup.png');
  await page.screenshot({ path: chairClosePath });
  console.log('Saved:', chairClosePath);

  // ==========================================
  // 6. ENTRANCE VIEW FROM BETA->GAMMA DOOR
  // ==========================================
  console.log('6. Capturing Entrance view from Beta->Gamma door...');
  await page.evaluate(() => {
    // Stand at doorway X=32.8, Z=6.0 looking east (+X) into Gamma
    window.__teleportCamera(32.8, 1.65, 6.0, -Math.PI / 2, 0.0);
  });
  await new Promise(r => setTimeout(r, 1500));
  const entrancePath = path.join(artifactDir, 'revision16_gamma_entrance_view.png');
  await page.screenshot({ path: entrancePath });
  console.log('Saved:', entrancePath);

  // ==========================================
  // 7. USER SCREENSHOT EXACT POSE REPRODUCTION
  // ==========================================
  console.log('7. Capturing User Screenshot Pose reproduction...');
  // The user screenshot was taken looking from back-left across the room towards front-right
  await page.evaluate(() => {
    window.__teleportCamera(35.5, 1.45, 3.5, -2.40, -0.05);
  });
  await new Promise(r => setTimeout(r, 1500));
  const userPosePath = path.join(artifactDir, 'revision16_gamma_user_screenshot_pose.png');
  await page.screenshot({ path: userPosePath });
  console.log('Saved:', userPosePath);

  // Write console logs
  fs.writeFileSync(
    path.join(artifactDir, 'revision16_console_logs.json'),
    JSON.stringify(consoleLogs, null, 2)
  );

  await browser.close();
  console.log('Revision 16 automated captures completed successfully!');
}

run().catch(err => {
  console.error('Error during Revision 16 verification:', err);
  process.exit(1);
});
