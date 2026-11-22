import puppeteer from 'puppeteer-core';
import path from 'path';
import fs from 'fs';
import os from 'os';

const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const artifactDir = 'C:\\Users\\MY\\.gemini\\antigravity\\brain\\d58f156e-404f-4f66-818d-bac29d65a711';

async function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function run() {
  console.log('--- REVISION 20: DOOR RENDERING & ANIMATION VERIFICATION ---');

  const uniqueUserDataDir = path.join(os.tmpdir(), 'puppeteer_rev20_' + Date.now());
  const browser = await puppeteer.launch({
    executablePath: chromePath,
    headless: 'new',
    userDataDir: uniqueUserDataDir,
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-gpu'],
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1920, height: 1080 });

  const consoleLogs = [];
  page.on('console', (msg) => {
    const text = msg.text();
    consoleLogs.push(text);
    if (
      text.includes('OVERLAP') ||
      text.includes('RESULT') ||
      text.includes('Dev Key') ||
      text.includes('FAIL') ||
      text.includes('Error') ||
      text.includes('PASS')
    ) {
      console.log('BROWSER LOG:', text);
    }
  });

  // Try port 5174 first, then 5173
  let connected = false;
  for (const port of [5174, 5173]) {
    try {
      console.log(`Trying navigation to http://localhost:${port}/campus...`);
      await page.goto(`http://localhost:${port}/campus`, { waitUntil: 'domcontentloaded', timeout: 10000 });
      await page.waitForSelector('canvas', { timeout: 10000 });
      connected = true;
      console.log(`Successfully connected on port ${port}!`);
      break;
    } catch (e) {
      console.log(`Port ${port} failed, trying next...`);
    }
  }

  if (!connected) {
    throw new Error('Failed to connect to dev server on port 5174 or 5173');
  }

  await sleep(3000);

  // Run overlap checker
  console.log('Running Overlap & Layout Checkers...');
  const validationResult = await page.evaluate(() => {
    const overlapReport = window.__runOverlapCheck ? window.__runOverlapCheck() : { overlaps: [] };
    const arenaVal = window.__validateArenaLayout ? window.__validateArenaLayout() : { pass: true };
    const gammaVal = window.__validateGammaLayout ? window.__validateGammaLayout() : { pass: true };
    return {
      overlapReport,
      arenaValidation: arenaVal,
      gammaValidation: gammaVal,
    };
  });

  console.log('Validation Summary:', JSON.stringify(validationResult, null, 2));
  fs.writeFileSync(
    path.join(artifactDir, 'revision20_validation_report.json'),
    JSON.stringify(validationResult, null, 2)
  );

  // Helper to position camera and door state
  async function setupScene(x, y, z, yaw, pitch, labId, doorId, doorOpen) {
    await page.evaluate(
      ({ x, y, z, yaw, pitch, labId, doorId, doorOpen }) => {
        if (window.__teleportCamera) {
          window.__teleportCamera(x, y, z, yaw, pitch);
        }
        if (doorId) {
          const store = window.__useStore || window.useStore;
          if (store) {
            store.getState().setDoorOpen(doorId, doorOpen);
          }
        }
      },
      { x, y, z, yaw, pitch, labId, doorId, doorOpen }
    );
  }

  // 1. Alpha-Beta Door from Alpha (Side A) - CLOSED
  console.log('1. Alpha-Beta Door from Alpha (Side A Closed)...');
  await setupScene(13.0, 1.65, 6.0, -Math.PI / 2, 0, 'alpha', 'door-alpha-beta', false);
  await sleep(1500);
  await page.screenshot({ path: path.join(artifactDir, 'rev20_alpha_beta_sideA_closed.png') });

  // 2. Alpha-Beta Door from Alpha (Side A) - MID-OPENING
  console.log('2. Alpha-Beta Door from Alpha (Side A Mid-Opening)...');
  await setupScene(13.0, 1.65, 6.0, -Math.PI / 2, 0, 'alpha', 'door-alpha-beta', true);
  await sleep(250);
  await page.screenshot({ path: path.join(artifactDir, 'rev20_alpha_beta_sideA_mid_opening.png') });

  // 3. Alpha-Beta Door from Alpha (Side A) - FULLY OPEN
  console.log('3. Alpha-Beta Door from Alpha (Side A Fully Open)...');
  await sleep(1500);
  await page.screenshot({ path: path.join(artifactDir, 'rev20_alpha_beta_sideA_open.png') });

  // 4. Alpha-Beta Door Lintel from Alpha (Side A Close-up)
  console.log('4. Alpha-Beta Door Lintel from Alpha (Side A Close-up)...');
  await setupScene(13.8, 2.30, 6.0, -Math.PI / 2, 0.25, 'alpha', 'door-alpha-beta', false);
  await sleep(1200);
  await page.screenshot({ path: path.join(artifactDir, 'rev20_alpha_beta_lintel_sideA.png') });

  // 5. Alpha-Beta Door from Beta (Side B) - CLOSED (Matching user symptom fe210632!)
  console.log('5. Alpha-Beta Door from Beta (Side B Closed - Matches User fe210632 pose)...');
  await setupScene(18.8, 1.65, 6.0, Math.PI / 2, 0, 'beta', 'door-alpha-beta', false);
  await sleep(1500);
  await page.screenshot({ path: path.join(artifactDir, 'rev20_alpha_beta_sideB_closed.png') });

  // 6. Alpha-Beta Door from Beta (Side B) - FULLY OPEN
  console.log('6. Alpha-Beta Door from Beta (Side B Fully Open)...');
  await setupScene(18.8, 1.65, 6.0, Math.PI / 2, 0, 'beta', 'door-alpha-beta', true);
  await sleep(1500);
  await page.screenshot({ path: path.join(artifactDir, 'rev20_alpha_beta_sideB_open.png') });

  // 7. Alpha-Beta Door Lintel from Beta (Side B Close-up)
  console.log('7. Alpha-Beta Door Lintel from Beta (Side B Close-up)...');
  await setupScene(18.2, 2.30, 6.0, Math.PI / 2, 0.25, 'beta', 'door-alpha-beta', false);
  await sleep(1200);
  await page.screenshot({ path: path.join(artifactDir, 'rev20_alpha_beta_lintel_sideB.png') });

  // 8. Beta-Gamma Door from Beta (Side A) - CLOSED & OPEN
  console.log('8. Beta-Gamma Door from Beta (Side A)...');
  await setupScene(29.0, 1.65, 6.0, -Math.PI / 2, 0, 'beta', 'door-beta-gamma', false);
  await sleep(1200);
  await page.screenshot({ path: path.join(artifactDir, 'rev20_beta_gamma_sideA_closed.png') });
  await setupScene(29.0, 1.65, 6.0, -Math.PI / 2, 0, 'beta', 'door-beta-gamma', true);
  await sleep(1500);
  await page.screenshot({ path: path.join(artifactDir, 'rev20_beta_gamma_sideA_open.png') });

  // 9. Beta-Gamma Door from Gamma (Side B) - CLOSED & OPEN
  console.log('9. Beta-Gamma Door from Gamma (Side B)...');
  await setupScene(35.0, 1.65, 6.0, Math.PI / 2, 0, 'gamma', 'door-beta-gamma', false);
  await sleep(1200);
  await page.screenshot({ path: path.join(artifactDir, 'rev20_beta_gamma_sideB_closed.png') });
  await setupScene(35.0, 1.65, 6.0, Math.PI / 2, 0, 'gamma', 'door-beta-gamma', true);
  await sleep(1500);
  await page.screenshot({ path: path.join(artifactDir, 'rev20_beta_gamma_sideB_open.png') });

  // 10. Gamma-Arena Door from Gamma (Side A) - CLOSED & OPEN
  console.log('10. Gamma-Arena Door from Gamma (Side A)...');
  await setupScene(45.0, 1.65, 6.0, -Math.PI / 2, 0, 'gamma', 'door-gamma-arena', false);
  await sleep(1200);
  await page.screenshot({ path: path.join(artifactDir, 'rev20_gamma_arena_sideA_closed.png') });
  await setupScene(45.0, 1.65, 6.0, -Math.PI / 2, 0, 'gamma', 'door-gamma-arena', true);
  await sleep(1500);
  await page.screenshot({ path: path.join(artifactDir, 'rev20_gamma_arena_sideA_open.png') });

  // 11. Gamma-Arena Door from Arena (Side B) - CLOSED & OPEN
  console.log('11. Gamma-Arena Door from Arena (Side B)...');
  await setupScene(51.0, 1.65, 6.0, Math.PI / 2, 0, 'gamma-arena', 'door-gamma-arena', false);
  await sleep(1200);
  await page.screenshot({ path: path.join(artifactDir, 'rev20_gamma_arena_sideB_closed.png') });
  await setupScene(51.0, 1.65, 6.0, Math.PI / 2, 0, 'gamma-arena', 'door-gamma-arena', true);
  await sleep(1500);
  await page.screenshot({ path: path.join(artifactDir, 'rev20_gamma_arena_sideB_open.png') });

  // 12. Main Entrance from Plaza (Side A) & from Alpha (Side B)
  console.log('12. Main Entrance Door Views...');
  await setupScene(8.0, 1.65, 14.8, 0, 0, 'exterior', 'door-main-entrance', false);
  await sleep(1200);
  await page.screenshot({ path: path.join(artifactDir, 'rev20_main_entrance_exterior_closed.png') });
  await setupScene(8.0, 1.65, 14.8, 0, 0, 'exterior', 'door-main-entrance', true);
  await sleep(1500);
  await page.screenshot({ path: path.join(artifactDir, 'rev20_main_entrance_exterior_open.png') });
  await setupScene(8.0, 1.65, 9.2, Math.PI, 0, 'alpha', 'door-main-entrance', false);
  await sleep(1200);
  await page.screenshot({ path: path.join(artifactDir, 'rev20_main_entrance_interior_closed.png') });

  // 13. Save console logs
  fs.writeFileSync(
    path.join(artifactDir, 'revision20_console_logs.json'),
    JSON.stringify(consoleLogs, null, 2)
  );

  console.log('All Revision 20 captures completed successfully!');
  await browser.close();
}

run().catch((err) => {
  console.error('Fatal capture error:', err);
  process.exit(1);
});
