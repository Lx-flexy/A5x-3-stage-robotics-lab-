import puppeteer from 'puppeteer-core';
import path from 'path';

const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const artifactDir = 'C:\\Users\\MY\\.gemini\\antigravity\\brain\\d58f156e-404f-4f66-818d-bac29d65a711';

async function capture() {
  console.log('Launching Chrome for Revision 2 captures...');
  const browser = await puppeteer.launch({
    executablePath: chromePath,
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-gpu']
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1920, height: 1080 });

  console.log('Loading Campus 3D...');
  await page.goto('http://localhost:5173/campus', { waitUntil: 'domcontentloaded', timeout: 30000 });
  await page.waitForSelector('canvas', { timeout: 15000 });
  await new Promise(r => setTimeout(r, 2500));

  // ==========================================
  // 1. TOP-DOWN VIEW OF ALL 3 LABS (Cutaway / roofless)
  // ==========================================
  console.log('1. Capturing Top-Down View of all 3 labs...');
  await page.evaluate(() => {
    const buttons = Array.from(document.querySelectorAll('button'));
    const topDownBtn = buttons.find(b => b.textContent.includes('Top-Down'));
    if (topDownBtn) topDownBtn.click();
  });
  await new Promise(r => setTimeout(r, 2000));

  const topDownPath = path.join(artifactDir, 'revision2_top_down_all_labs.png');
  await page.screenshot({ path: topDownPath });
  console.log('Saved:', topDownPath);

  // Switch back to First Person Walk
  await page.evaluate(() => {
    const buttons = Array.from(document.querySelectorAll('button'));
    const walkBtn = buttons.find(b => b.textContent.includes('Walk'));
    if (walkBtn) walkBtn.click();
  });
  await new Promise(r => setTimeout(r, 1000));

  // Dismiss / hide the click-to-walk banner overlay so the 3D world is completely unobstructed
  await page.evaluate(() => {
    const overlay = document.querySelector('.glass-panel')?.closest('.absolute.inset-0');
    if (overlay) overlay.style.display = 'none';
  });

  // ==========================================
  // 2. FIRST-PERSON VIEW OF A WALL SIGN
  // ==========================================
  console.log('2. Teleporting to inspect Wall Sign in Lab Alpha...');
  await page.evaluate(() => {
    if (window.__useStore) {
      window.__useStore.getState().setPlayerPosition([13.5, 1.65, 2.6]);
      window.__useStore.getState().setPlayerRotation(0);
      window.__useStore.getState().setActiveLabId('alpha');
    }
  });
  await new Promise(r => setTimeout(r, 1500));

  const wallSignPath = path.join(artifactDir, 'revision2_first_person_wall_sign.png');
  await page.screenshot({ path: wallSignPath });
  console.log('Saved:', wallSignPath);

  // ==========================================
  // 3. FIRST-PERSON VIEW OF DESIGN & PRINT CORNER
  // ==========================================
  console.log('3. Teleporting to Design & Print Corner in Lab Alpha...');
  await page.evaluate(() => {
    if (window.__useStore) {
      window.__useStore.getState().setPlayerPosition([3.0, 1.65, 3.2]);
      window.__useStore.getState().setPlayerRotation(0);
      window.__useStore.getState().setActiveLabId('alpha');
    }
  });
  await new Promise(r => setTimeout(r, 1500));

  const designPrintPath = path.join(artifactDir, 'revision2_design_print_corner.png');
  await page.screenshot({ path: designPrintPath });
  console.log('Saved:', designPrintPath);

  // ==========================================
  // 4. ARENA BAY THROUGH THE GLASS DOOR FROM GAMMA MAIN BAY
  // ==========================================
  console.log('4. Teleporting to Gamma Main Bay looking through glass door into Arena Bay...');
  await page.evaluate(() => {
    if (window.__useStore) {
      window.__useStore.getState().setPlayerPosition([44.5, 1.65, 6.0]);
      window.__useStore.getState().setPlayerRotation(-Math.PI / 2); // Facing +X into the glass door
      window.__useStore.getState().setActiveLabId('gamma');
    }
  });
  await new Promise(r => setTimeout(r, 2000));

  const arenaGlassPath = path.join(artifactDir, 'revision2_arena_bay_through_glass_door.png');
  await page.screenshot({ path: arenaGlassPath });
  console.log('Saved:', arenaGlassPath);

  await browser.close();
  console.log('All Revision 2 captures completed successfully!');
}

capture().catch(err => {
  console.error('Capture error:', err);
  process.exit(1);
});
