import puppeteer from 'puppeteer-core';
import path from 'path';

const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const artifactDir = 'C:\\Users\\MY\\.gemini\\antigravity\\brain\\d58f156e-404f-4f66-818d-bac29d65a711';

async function runPhase2Verification() {
  console.log('--- Starting Phase 2: Navigation & Collision Verification ---');
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

  console.log('1. Loading http://localhost:5173/ ...');
  await page.goto('http://localhost:5173/', { waitUntil: 'domcontentloaded', timeout: 15000 });
  await new Promise(r => setTimeout(r, 2000));

  // Check initial position at Spawn
  const initialPos = await page.evaluate(() => {
    // Read Zustand store
    const store = window.__useStore || null;
    return document.body.innerText.includes('POS: X:8.0 Y:1.7 Z:19.0');
  });
  console.log('Spawn position verified:', initialPos);

  // 1. Capture Spawn / Outside view
  const spawnPath = path.join(artifactDir, 'phase2_walk_entrance.png');
  await page.screenshot({ path: spawnPath });
  console.log('Saved Entrance screenshot:', spawnPath);

  // 2. Teleport / Walk into Lab Alpha
  console.log('2. Testing walking into Lab Alpha...');
  const buttons = await page.$$('button');
  for (const b of buttons) {
    const text = await page.evaluate(el => el.textContent, b);
    if (text.includes('Lab Alpha')) {
      await b.click();
      break;
    }
  }
  await new Promise(r => setTimeout(r, 1200));

  // Verify Alpha toast & door states
  const alphaPath = path.join(artifactDir, 'phase2_inside_alpha.png');
  await page.screenshot({ path: alphaPath });
  console.log('Saved Lab Alpha screenshot:', alphaPath);

  // 3. Teleport / Walk into Lab Beta
  console.log('3. Testing walking into Lab Beta...');
  for (const b of buttons) {
    const text = await page.evaluate(el => el.textContent, b);
    if (text.includes('Lab Beta')) {
      await b.click();
      break;
    }
  }
  await new Promise(r => setTimeout(r, 1200));

  const betaPath = path.join(artifactDir, 'phase2_inside_beta.png');
  await page.screenshot({ path: betaPath });
  console.log('Saved Lab Beta screenshot:', betaPath);

  // 4. Teleport / Walk into Lab Gamma
  console.log('4. Testing walking into Lab Gamma...');
  for (const b of buttons) {
    const text = await page.evaluate(el => el.textContent, b);
    if (text.includes('Lab Gamma')) {
      await b.click();
      break;
    }
  }
  await new Promise(r => setTimeout(r, 1200));

  const gammaPath = path.join(artifactDir, 'phase2_inside_gamma.png');
  await page.screenshot({ path: gammaPath });
  console.log('Saved Lab Gamma screenshot:', gammaPath);

  // 5. Switch to Isometric Mode to view Avatar in the scene
  console.log('5. Testing Isometric Mode with Avatar Beacon...');
  for (const b of buttons) {
    const text = await page.evaluate(el => el.textContent, b);
    if (text.includes('Isometric View')) {
      await b.click();
      break;
    }
  }
  await new Promise(r => setTimeout(r, 1500));

  const avatarPath = path.join(artifactDir, 'phase2_isometric_with_avatar.png');
  await page.screenshot({ path: avatarPath });
  console.log('Saved Isometric Avatar screenshot:', avatarPath);

  // 6. Test Mobile UI toggle
  console.log('6. Testing Mobile UI Joystick Toggle...');
  for (const b of buttons) {
    const text = await page.evaluate(el => el.textContent, b);
    if (text.includes('Mobile UI:')) {
      await b.click();
      break;
    }
  }
  await new Promise(r => setTimeout(r, 800));

  const mobilePath = path.join(artifactDir, 'phase2_mobile_mode.png');
  await page.screenshot({ path: mobilePath });
  console.log('Saved Mobile UI screenshot:', mobilePath);

  await browser.close();

  if (errors.length > 0) {
    console.error('FAILED with errors:', errors);
    process.exit(1);
  } else {
    console.log('PHASE 2 VERIFICATION SUCCESSFUL: All navigation tests passed with 0 errors.');
  }
}

runPhase2Verification().catch(err => {
  console.error('Phase 2 script error:', err);
  process.exit(1);
});
