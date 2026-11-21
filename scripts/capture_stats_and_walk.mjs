import puppeteer from 'puppeteer-core';
import path from 'path';

const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const artifactDir = 'C:\\Users\\MY\\.gemini\\antigravity\\brain\\d58f156e-404f-4f66-818d-bac29d65a711';

async function verify() {
  console.log('Verifying Revision 4 Performance and Stats Overlay...');
  const browser = await puppeteer.launch({
    executablePath: chromePath,
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-gpu']
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1920, height: 1080 });

  await page.goto('http://localhost:5173/campus', { waitUntil: 'domcontentloaded', timeout: 30000 });
  await page.waitForSelector('canvas', { timeout: 15000 });
  await new Promise(r => setTimeout(r, 2000));

  // Press 'P' to toggle stats overlay
  console.log('Toggling Stats overlay with KeyP...');
  await page.keyboard.press('KeyP');
  await new Promise(r => setTimeout(r, 1200));

  // Walk player into Alpha: [8.0, 1.65, 6.0]
  await page.evaluate(() => {
    if (window.__useStore) {
      window.__useStore.getState().setPlayerPosition([8.0, 1.65, 6.0]);
      window.__useStore.getState().setActiveLabId('alpha');
    }
  });
  await new Promise(r => setTimeout(r, 1200));

  const statsPath = path.join(artifactDir, 'revision4_stats_overlay.png');
  await page.screenshot({ path: statsPath });
  console.log('Saved:', statsPath);

  // Walk through doors test:
  // Alpha -> Beta (door at x=16, z=6)
  console.log('Testing walking into Beta...');
  await page.evaluate(() => {
    if (window.__useStore) {
      window.__useStore.getState().setPlayerPosition([24.0, 1.65, 6.0]);
      window.__useStore.getState().setActiveLabId('beta');
    }
  });
  await new Promise(r => setTimeout(r, 1000));

  // Beta -> Gamma Main (door at x=32, z=6)
  console.log('Testing walking into Gamma Main...');
  await page.evaluate(() => {
    if (window.__useStore) {
      window.__useStore.getState().setPlayerPosition([40.0, 1.65, 6.0]);
      window.__useStore.getState().setActiveLabId('gamma');
    }
  });
  await new Promise(r => setTimeout(r, 1000));

  // Gamma Main -> Arena (door at x=48, z=6)
  console.log('Testing walking into Arena Bay...');
  await page.evaluate(() => {
    if (window.__useStore) {
      window.__useStore.getState().setPlayerPosition([53.0, 1.65, 6.0]);
      window.__useStore.getState().setActiveLabId('gamma-arena');
    }
  });
  await new Promise(r => setTimeout(r, 1000));

  const arenaWalkPath = path.join(artifactDir, 'revision4_arena_walk.png');
  await page.screenshot({ path: arenaWalkPath });
  console.log('Saved:', arenaWalkPath);

  await browser.close();
  console.log('Performance verification complete!');
}

verify().catch(err => {
  console.error('Verification error:', err);
  process.exit(1);
});
