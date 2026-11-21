import puppeteer from 'puppeteer-core';
import path from 'path';
import fs from 'fs';

const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const artifactDir = 'C:\\Users\\MY\\.gemini\\antigravity\\brain\\d58f156e-404f-4f66-818d-bac29d65a711';

async function runVerification() {
  console.log('Starting Phase 1 Verification...');
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
    } else {
      console.log('Browser Console:', msg.text());
    }
  });

  page.on('pageerror', err => {
    console.log('Browser Uncaught:', err.message);
    errors.push(err.message);
  });

  console.log('Navigating to http://localhost:5173/ ...');
  await page.goto('http://localhost:5173/', { waitUntil: 'domcontentloaded', timeout: 15000 });

  // Wait 2.5 seconds for 3D canvas and shaders to render
  await new Promise(r => setTimeout(r, 2500));

  // Take Isometric screenshot
  const isoPath = path.join(artifactDir, 'phase1_isometric.png');
  await page.screenshot({ path: isoPath });
  console.log('Saved Isometric screenshot to:', isoPath);

  // Switch to Top-Down View
  const buttons = await page.$$('button');
  for (const b of buttons) {
    const text = await page.evaluate(el => el.textContent, b);
    if (text.includes('Top-Down Overview')) {
      await b.click();
      break;
    }
  }

  await new Promise(r => setTimeout(r, 1500));
  const topDownPath = path.join(artifactDir, 'phase1_topdown.png');
  await page.screenshot({ path: topDownPath });
  console.log('Saved Top-Down screenshot to:', topDownPath);

  // Click all 3 door buttons to open them
  const doorButtons = await page.$$('button');
  for (const b of doorButtons) {
    const text = await page.evaluate(el => el.textContent, b);
    if (text.includes('CLOSED')) {
      await b.click();
    }
  }

  // Switch to Inside Lab Alpha view
  for (const b of doorButtons) {
    const text = await page.evaluate(el => el.textContent, b);
    if (text.includes('Inside Lab Alpha')) {
      await b.click();
      break;
    }
  }

  await new Promise(r => setTimeout(r, 1500));
  const alphaViewPath = path.join(artifactDir, 'phase1_inside_alpha.png');
  await page.screenshot({ path: alphaViewPath });
  console.log('Saved Inside Lab Alpha screenshot to:', alphaViewPath);

  await browser.close();

  if (errors.length > 0) {
    console.error('VERIFICATION FAILED: Encountered console errors:', errors);
    process.exit(1);
  } else {
    console.log('VERIFICATION SUCCESSFUL: 0 errors detected.');
  }
}

runVerification().catch(err => {
  console.error('Script error:', err);
  process.exit(1);
});
