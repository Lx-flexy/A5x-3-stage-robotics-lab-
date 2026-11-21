import puppeteer from 'puppeteer-core';
import path from 'path';

const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const artifactDir = 'C:\\Users\\MY\\.gemini\\antigravity\\brain\\d58f156e-404f-4f66-818d-bac29d65a711';

async function run() {
  console.log('Launching headless Chrome for Revision 6 Verification...');
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
  await new Promise(r => setTimeout(r, 2000));

  console.log('Waiting for teleport controller...');
  await page.waitForFunction(() => typeof window.__teleportCamera === 'function', { timeout: 15000 });

  // ==========================================
  // 1. SOLDERING WALL (Matches user reference screenshot 1)
  // ==========================================
  console.log('1. Teleporting to Soldering Wall view (matches user screenshot 1)...');
  await page.evaluate(() => {
    window.__teleportCamera(3.4, 1.65, 4.2, Math.PI / 2, 0);
  });
  await new Promise(r => setTimeout(r, 1500));
  const soldWallPath = path.join(artifactDir, 'revision6_soldering_wall.png');
  await page.screenshot({ path: soldWallPath });
  console.log('Saved:', soldWallPath);

  // ==========================================
  // 2. ELECTRONICS SHELF (Matches user reference screenshot 2)
  // ==========================================
  console.log('2. Teleporting to Electronics Shelf view (matches user screenshot 2)...');
  await page.evaluate(() => {
    window.__teleportCamera(2.8, 1.65, 9.7, Math.PI / 2, 0);
  });
  await new Promise(r => setTimeout(r, 1500));
  const elecShelfPath = path.join(artifactDir, 'revision6_electronics_shelf.png');
  await page.screenshot({ path: elecShelfPath });
  console.log('Saved:', elecShelfPath);

  // ==========================================
  // 3. CLOSE-UP: PEGBOARD TOOL WALL (Detail of tools, hooks, hole grid, shadow board)
  // ==========================================
  console.log('3. Teleporting to Close-Up of Pegboard Tool Wall...');
  await page.evaluate(() => {
    window.__teleportCamera(1.5, 1.9, 4.2, Math.PI / 2, 0);
  });
  await new Promise(r => setTimeout(r, 1500));
  const pegClosePath = path.join(artifactDir, 'revision6_pegboard_closeup.png');
  await page.screenshot({ path: pegClosePath });
  console.log('Saved:', pegClosePath);

  // ==========================================
  // 4. CLOSE-UP: SOLDERING STATION BENCHTOP (LCD 350°C, iron, brass wool, PCB, multimeter)
  // ==========================================
  console.log('4. Teleporting to Close-Up of Soldering Station & Benchtop (tilted down)...');
  await page.evaluate(() => {
    window.__teleportCamera(1.15, 1.08, 3.7, Math.PI / 2, -0.22);
  });
  await new Promise(r => setTimeout(r, 1500));
  const stationClosePath = path.join(artifactDir, 'revision6_soldering_station_closeup.png');
  await page.screenshot({ path: stationClosePath });
  console.log('Saved:', stationClosePath);

  // ==========================================
  // 5. C-KEY REPRO VIEW (Whole Lab Alpha facing whiteboard)
  // ==========================================
  console.log('5. Capturing C-Key Reference View...');
  await page.keyboard.press('KeyC');
  await new Promise(r => setTimeout(r, 2000));
  const cPosePath = path.join(artifactDir, 'revision6_alpha_c_pose.png');
  await page.screenshot({ path: cPosePath });
  console.log('Saved:', cPosePath);

  // ==========================================
  // 6. DEV STATS OVERLAY (FPS, draw calls, triangles)
  // ==========================================
  console.log('6. Toggling Dev Stats Overlay (Key P)...');
  await page.keyboard.press('KeyP');
  await new Promise(r => setTimeout(r, 1000));
  const statsPath = path.join(artifactDir, 'revision6_alpha_stats.png');
  await page.screenshot({ path: statsPath });
  console.log('Saved:', statsPath);

  await browser.close();
  console.log('Revision 6 verification captures complete!');
}

run().catch(err => {
  console.error('Error in capture:', err);
  process.exit(1);
});
