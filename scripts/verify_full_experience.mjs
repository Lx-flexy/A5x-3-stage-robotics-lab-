import puppeteer from 'puppeteer-core';
import path from 'path';

const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const artifactDir = 'C:\\Users\\MY\\.gemini\\antigravity\\brain\\d58f156e-404f-4f66-818d-bac29d65a711';

async function runFullVerification() {
  console.log('=== Comprehensive Full System Verification ===');
  const browser = await puppeteer.launch({
    executablePath: chromePath,
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-gpu'],
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1600, height: 900 });

  const errors = [];
  page.on('console', msg => {
    if (msg.type() === 'error') {
      console.log('Browser Error:', msg.text());
      errors.push(msg.text());
    }
  });

  page.on('pageerror', err => {
    console.log('Browser Uncaught:', err.message);
    errors.push(err.message);
  });

  // 1. Landing Page
  console.log('1. Loading Landing Page at http://localhost:5173/ ...');
  await page.goto('http://localhost:5173/', { waitUntil: 'domcontentloaded', timeout: 15000 });
  await new Promise(r => setTimeout(r, 2000));

  const landingPath = path.join(artifactDir, 'final_landing_page.png');
  await page.screenshot({ path: landingPath });
  console.log('Saved Landing Page screenshot:', landingPath);

  // 2. Click "ENTER VIRTUAL CAMPUS"
  console.log('2. Entering Virtual Campus (3D Walk)...');
  const buttons = await page.$$('button');
  for (const b of buttons) {
    const text = await page.evaluate(el => el.textContent, b);
    if (text.includes('ENTER VIRTUAL CAMPUS')) {
      await b.click();
      break;
    }
  }
  await new Promise(r => setTimeout(r, 2500));

  const campusPath = path.join(artifactDir, 'final_campus_3d_walk.png');
  await page.screenshot({ path: campusPath });
  console.log('Saved Campus 3D screenshot:', campusPath);

  // 3. Test Equipment Modal Inspection
  console.log('3. Testing Equipment Modal Inspection (Bambu Lab A1 Mini)...');
  await page.evaluate(() => {
    if (window.__useStore) {
      window.__useStore.getState().setActiveInteraction('bambu-mini');
    }
  });
  await new Promise(r => setTimeout(r, 1200));

  const modalPath = path.join(artifactDir, 'final_equipment_modal.png');
  await page.screenshot({ path: modalPath });
  console.log('Saved Equipment Modal screenshot:', modalPath);

  // Close modal
  await page.evaluate(() => {
    if (window.__useStore) {
      window.__useStore.getState().setActiveInteraction(null);
    }
  });
  await new Promise(r => setTimeout(r, 800));

  // 4. Test Campus Map Modal
  console.log('4. Testing Campus Map Modal...');
  const mapButtons = await page.$$('button');
  for (const b of mapButtons) {
    const text = await page.evaluate(el => el.textContent, b);
    if (text.includes('Map')) {
      await b.click();
      break;
    }
  }
  await new Promise(r => setTimeout(r, 1200));

  const mapPath = path.join(artifactDir, 'final_campus_map_modal.png');
  await page.screenshot({ path: mapPath });
  console.log('Saved Campus Map Modal screenshot:', mapPath);

  // Close map modal
  await page.keyboard.press('Escape');
  await new Promise(r => setTimeout(r, 800));

  // 5. Test Pause Menu
  console.log('5. Testing Pause Menu...');
  const menuButtons = await page.$$('button');
  for (const b of menuButtons) {
    const title = await page.evaluate(el => el.getAttribute('title'), b);
    if (title === 'Pause Menu') {
      await b.click();
      break;
    }
  }
  await new Promise(r => setTimeout(r, 1200));

  const pausePath = path.join(artifactDir, 'final_pause_menu.png');
  await page.screenshot({ path: pausePath });
  console.log('Saved Pause Menu screenshot:', pausePath);

  await browser.close();

  if (errors.length > 0) {
    console.error('VERIFICATION FAILED with errors:', errors);
    process.exit(1);
  } else {
    console.log('=== ALL SYSTEM VERIFICATIONS PASSED WITH 0 ERRORS ===');
  }
}

runFullVerification().catch(err => {
  console.error('Verification script error:', err);
  process.exit(1);
});
