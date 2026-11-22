import puppeteer from 'puppeteer-core';
import path from 'path';
import fs from 'fs';
import os from 'os';

const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const artifactDir = 'C:\\Users\\MY\\.gemini\\antigravity\\brain\\d58f156e-404f-4f66-818d-bac29d65a711';

async function run() {
  console.log('Launching headless Chrome for Revision 19 (Facade Sign Fix + Big Rooftop Brand Board) Verification...');
  const uniqueUserDataDir = path.join(os.tmpdir(), 'puppeteer_rev19_' + Date.now());
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
    path.join(artifactDir, 'revision19_validation_report.json'),
    JSON.stringify(validationResult, null, 2)
  );

  // Helper to set player camera pose
  async function setCameraPose(pos, target, viewMode = 'firstPerson', labId = 'exterior') {
    await page.evaluate(({ p, t, vm, lab }) => {
      const store = window.__a5x_store || window.useStore;
      if (store) {
        store.getState().setPlayerPosition(p);
        store.getState().setActiveLabId(lab);
        store.getState().setViewMode(vm);
      }
      if (window.__a5x_camera) {
        window.__a5x_camera.position.set(p[0], p[1], p[2]);
        window.__a5x_camera.lookAt(t[0], t[1], t[2]);
        window.__a5x_camera.updateProjectionMatrix();
      }
    }, { p: pos, t: target, vm: viewMode, lab: labId });
    await new Promise(r => setTimeout(r, 1500));
  }

  // 1. Same pose as user screenshot: Door canopy + Alpha fascia plate
  console.log('1. Capturing User Screenshot Pose (Canopy + Alpha Plate)...');
  await setCameraPose([8.0, 2.2, 16.5], [7.0, 3.2, 12.0], 'firstPerson', 'exterior');
  await page.screenshot({ path: path.join(artifactDir, 'revision19_user_screenshot_pose.png') });

  // 2. Wide shot from spawn showing whole facade and rooftop board
  console.log('2. Capturing Wide Shot from Spawn...');
  await setCameraPose([15.0, 2.2, 23.5], [26.0, 4.8, 12.0], 'firstPerson', 'exterior');
  await page.screenshot({ path: path.join(artifactDir, 'revision19_wide_spawn_rooftop.png') });

  // 3. Close-up of Rooftop Board Face
  console.log('3. Capturing Close-up of Rooftop Board Face...');
  await setCameraPose([30.0, 6.8, 18.0], [30.0, 6.8, 11.4], 'isometric', 'exterior');
  await page.screenshot({ path: path.join(artifactDir, 'revision19_rooftop_board_face_closeup.png') });

  // 4. Side/back view of board structure (showing steel truss, footings, rear catwalk)
  console.log('4. Capturing Side/Back View of Rooftop Board Structure...');
  await setCameraPose([42.0, 7.8, 8.5], [30.0, 6.8, 11.4], 'isometric', 'exterior');
  await page.screenshot({ path: path.join(artifactDir, 'revision19_rooftop_board_structure_rear.png') });

  // 5. Top-Down view showing board centered at horizontal center (X = 30m)
  console.log('5. Capturing Top-Down View...');
  await page.evaluate(() => {
    const store = window.__a5x_store || window.useStore;
    if (store) store.getState().setViewMode('topDown');
  });
  await setCameraPose([30.0, 36.0, 10.0], [30.0, 0, 10.0], 'topDown', 'exterior');
  await page.screenshot({ path: path.join(artifactDir, 'revision19_top_down_view.png') });

  // 6. Ground-level plaza view showing walkway, facade, and rooftop board
  console.log('6. Capturing Ground-Level Plaza View...');
  await setCameraPose([8.0, 1.65, 20.0], [16.0, 4.0, 12.0], 'firstPerson', 'exterior');
  await page.screenshot({ path: path.join(artifactDir, 'revision19_plaza_ground_view.png') });

  fs.writeFileSync(
    path.join(artifactDir, 'revision19_console_logs.json'),
    JSON.stringify(consoleLogs, null, 2)
  );

  console.log('Revision 19 captures completed successfully!');
  await browser.close();
}

run().catch(err => {
  console.error('Fatal capture error:', err);
  process.exit(1);
});
