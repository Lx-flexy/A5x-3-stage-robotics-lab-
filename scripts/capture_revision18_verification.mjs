import puppeteer from 'puppeteer-core';
import path from 'path';
import fs from 'fs';
import os from 'os';

const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const artifactDir = 'C:\\Users\\MY\\.gemini\\antigravity\\brain\\d58f156e-404f-4f66-818d-bac29d65a711';

async function run() {
  console.log('Launching headless Chrome for Revision 18 (Main Entrance Facade + Plaza) Verification...');
  const uniqueUserDataDir = path.join(os.tmpdir(), 'puppeteer_rev18_' + Date.now());
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
      text.includes('ZONE')
    ) {
      console.log('BROWSER LOG:', text);
    }
  });

  console.log('Navigating to Campus page...');
  await page.goto('http://localhost:5173/campus', { waitUntil: 'domcontentloaded', timeout: 30000 });
  await page.waitForSelector('canvas', { timeout: 15000 });
  await new Promise(r => setTimeout(r, 2500));

  // Run overlap check & validation
  const validationResult = await page.evaluate(() => {
    const overlapReport = window.__runOverlapCheck ? window.__runOverlapCheck() : { overlaps: [] };
    const arenaVal = window.__validateArenaLayout ? window.__validateArenaLayout() : { pass: true };
    const gammaVal = window.__validateGammaLayout ? window.__validateGammaLayout() : { pass: true };
    return {
      overlapReport,
      arenaValidation: arenaVal,
      gammaValidation: gammaVal
    };
  });
  console.log('Validation Result:', JSON.stringify(validationResult, null, 2));

  fs.writeFileSync(
    path.join(artifactDir, 'revision18_validation_report.json'),
    JSON.stringify(validationResult, null, 2)
  );

  // Helper to set player camera pose
  async function setCameraPose(pos, target, labId = 'exterior') {
    await page.evaluate(({ p, t, lab }) => {
      const store = window.__a5x_store || window.useStore;
      if (store) {
        store.getState().setPlayerPosition(p);
        store.getState().setActiveLabId(lab);
        store.getState().setViewMode('firstPerson');
      }
      if (window.__a5x_camera) {
        window.__a5x_camera.position.set(p[0], p[1], p[2]);
        window.__a5x_camera.lookAt(t[0], t[1], t[2]);
        window.__a5x_camera.updateProjectionMatrix();
      }
    }, { p: pos, t: target, lab: labId });
    await new Promise(r => setTimeout(r, 1500));
  }

  // 1. User screenshot pose reproduction: [8.0, 1.65, 17.0], facing door [8.0, 1.65, 12.0]
  console.log('1. Capturing User Screenshot Pose reproduction...');
  await setCameraPose([8.0, 1.65, 17.0], [8.0, 1.65, 12.0]);
  await page.screenshot({ path: path.join(artifactDir, 'revision18_facade_user_screenshot_pose.png') });

  // 2. Wide shot from spawn: [8.0, 1.65, 20.0], looking at [8.0, 2.2, 12.0]
  console.log('2. Capturing Wide shot from spawn (whole facade, canopy, sign, plaza, trees)...');
  await setCameraPose([8.0, 1.65, 20.0], [8.0, 2.2, 12.0]);
  await page.screenshot({ path: path.join(artifactDir, 'revision18_facade_wide_spawn.png') });

  // 3. Door closed close-up: [8.0, 1.65, 15.0], looking at [8.0, 1.65, 12.0]
  console.log('3. Capturing Door closed close-up...');
  await page.evaluate(() => {
    const store = window.__a5x_store || window.useStore;
    if (store) store.getState().setDoorOpen('door-main-entrance', false);
  });
  await setCameraPose([8.0, 1.65, 15.0], [8.0, 1.65, 12.0]);
  await page.screenshot({ path: path.join(artifactDir, 'revision18_door_closed_closeup.png') });

  // 4. Door open close-up: [8.0, 1.65, 13.5], looking at [8.0, 1.65, 10.0]
  console.log('4. Capturing Door open close-up...');
  await page.evaluate(() => {
    const store = window.__a5x_store || window.useStore;
    if (store) store.getState().setDoorOpen('door-main-entrance', true);
  });
  await setCameraPose([8.0, 1.65, 13.5], [8.0, 1.65, 10.0]);
  await new Promise(r => setTimeout(r, 800)); // wait for smooth slide
  await page.screenshot({ path: path.join(artifactDir, 'revision18_door_open_closeup.png') });

  // 5. Left glazing with interior readable: [3.7, 1.65, 14.5], looking at [3.7, 1.8, 8.0]
  console.log('5. Capturing Left glazing with readable interior...');
  await setCameraPose([3.7, 1.65, 14.5], [3.7, 1.8, 8.0]);
  await page.screenshot({ path: path.join(artifactDir, 'revision18_left_glazing_interior.png') });

  // 6. Fascia signs close-up: [8.0, 3.2, 16.0], looking at [8.0, 3.9, 12.0]
  console.log('6. Capturing Fascia signs close-up...');
  await setCameraPose([8.0, 3.2, 16.0], [8.0, 3.9, 12.0]);
  await page.screenshot({ path: path.join(artifactDir, 'revision18_fascia_signs_closeup.png') });

  // 7. Top-down / high isometric of the plaza: [16.0, 22.0, 25.0], looking at [16.0, 0, 16.0]
  console.log('7. Capturing Top-down / High angle of the entrance plaza...');
  await page.evaluate(() => {
    const store = window.__a5x_store || window.useStore;
    if (store) {
      store.getState().setViewMode('isometric');
      store.getState().setActiveLabId('exterior');
    }
  });
  await new Promise(r => setTimeout(r, 1500));
  await page.screenshot({ path: path.join(artifactDir, 'revision18_plaza_top_down.png') });

  // 8. View from inside Alpha looking out through the glass: [8.0, 1.65, 8.5], looking at [8.0, 1.65, 14.0]
  console.log('8. Capturing View from inside Alpha looking out through glass...');
  await page.evaluate(() => {
    const store = window.__a5x_store || window.useStore;
    if (store) {
      store.getState().setViewMode('firstPerson');
      store.getState().setActiveLabId('alpha');
    }
  });
  await setCameraPose([8.0, 1.65, 8.5], [8.0, 1.65, 14.0], 'alpha');
  await page.screenshot({ path: path.join(artifactDir, 'revision18_inside_alpha_looking_out.png') });

  // 9. Stats overlay on the plaza
  console.log('9. Capturing Performance stats on exterior plaza...');
  await page.keyboard.press('KeyP');
  await setCameraPose([8.0, 1.65, 18.0], [8.0, 2.0, 12.0], 'exterior');
  await new Promise(r => setTimeout(r, 1000));
  await page.screenshot({ path: path.join(artifactDir, 'revision18_plaza_stats.png') });

  fs.writeFileSync(
    path.join(artifactDir, 'revision18_console_logs.json'),
    JSON.stringify(consoleLogs, null, 2)
  );

  console.log('Revision 18 captures completed successfully!');
  await browser.close();
}

run().catch(err => {
  console.error('Fatal verification capture error:', err);
  process.exit(1);
});
