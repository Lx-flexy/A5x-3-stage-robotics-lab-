import puppeteer from 'puppeteer-core';
import path from 'path';

const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const artifactDir = 'C:\\Users\\MY\\.gemini\\antigravity\\brain\\d58f156e-404f-4f66-818d-bac29d65a711';

async function run() {
  console.log('Launching Chrome for Revision 5 Verification...');
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

  // 1. Trigger Dev Shortcut Key C
  console.log('1. Pressing Key C to trigger exact reference pose (8, 1.65, 11.2, facing -Z, FOV 70)...');
  await page.keyboard.press('KeyC');
  await new Promise(r => setTimeout(r, 2500));

  const cPosePath = path.join(artifactDir, 'revision5_alpha_c_pose.png');
  await page.screenshot({ path: cPosePath });
  console.log('Saved:', cPosePath);

  // 2. Close-up of Back Wall (Whiteboard, Logo, Shelves, Teacher Desk)
  console.log('2. Moving to close-up of Back Teaching Wall...');
  await page.evaluate(() => {
    if (window.__useStore) {
      window.__useStore.getState().setPlayerPosition([8.0, 1.65, 4.8]);
      window.__useStore.getState().setPlayerRotation(0);
      window.__useStore.getState().setShowCeiling(true);
    }
  });
  await new Promise(r => setTimeout(r, 1500));
  const backWallPath = path.join(artifactDir, 'revision5_alpha_back_wall.png');
  await page.screenshot({ path: backWallPath });
  console.log('Saved:', backWallPath);

  // 3. Close-up of Left Wall (Soldering arena, tool pegboard, electronics zone)
  console.log('3. Moving to close-up of Left Wall (Soldering & Electronics)...');
  await page.evaluate(() => {
    if (window.__useStore) {
      window.__useStore.getState().setPlayerPosition([3.2, 1.65, 4.2]);
      window.__useStore.getState().setPlayerRotation(Math.PI / 2); // Look towards West (-X)
      window.__useStore.getState().setShowCeiling(true);
    }
  });
  await new Promise(r => setTimeout(r, 1500));
  const leftWallPath = path.join(artifactDir, 'revision5_alpha_left_wall.png');
  await page.screenshot({ path: leftWallPath });
  console.log('Saved:', leftWallPath);

  // 4. Close-up of Right Wall (Designing area, Coding area, blue abstract wallpaper PCs)
  console.log('4. Moving to close-up of Right Wall (Coding & Designing)...');
  await page.evaluate(() => {
    if (window.__useStore) {
      window.__useStore.getState().setPlayerPosition([12.8, 1.65, 2.4]);
      window.__useStore.getState().setPlayerRotation(-Math.PI / 2); // Look towards East (+X)
      window.__useStore.getState().setShowCeiling(true);
    }
  });
  await new Promise(r => setTimeout(r, 1500));
  const rightWallPath = path.join(artifactDir, 'revision5_alpha_right_wall.png');
  await page.screenshot({ path: rightWallPath });
  console.log('Saved:', rightWallPath);

  // 5. Measure Dev Stats
  console.log('5. Toggling Dev Stats Overlay (Key P)...');
  await page.keyboard.press('KeyC'); // Return to C pose
  await new Promise(r => setTimeout(r, 500));
  await page.keyboard.press('KeyP'); // Toggle Stats
  await new Promise(r => setTimeout(r, 1000));
  const statsPath = path.join(artifactDir, 'revision5_alpha_stats.png');
  await page.screenshot({ path: statsPath });
  console.log('Saved:', statsPath);

  await browser.close();
  console.log('Verification captures complete!');
}

run().catch(err => {
  console.error('Error during capture:', err);
  process.exit(1);
});
