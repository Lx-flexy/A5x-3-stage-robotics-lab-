import puppeteer from 'puppeteer-core';
import path from 'path';

const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const artifactDir = 'C:\\Users\\MY\\.gemini\\antigravity\\brain\\d58f156e-404f-4f66-818d-bac29d65a711';

async function runPhase3Verification() {
  console.log('--- Starting Phase 3 Detailed Verification ---');
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

  await page.goto('http://localhost:5173/', { waitUntil: 'domcontentloaded', timeout: 15000 });
  await new Promise(r => setTimeout(r, 2000));

  const clickButtonByText = async (targetText) => {
    const buttons = await page.$$('button');
    for (const b of buttons) {
      const text = await page.evaluate(el => el.textContent, b);
      if (text.includes(targetText)) {
        await b.click();
        await new Promise(r => setTimeout(r, 1200));
        return true;
      }
    }
    return false;
  };

  // 1. Isometric Cutaway
  await clickButtonByText('Campus');
  const isoPath = path.join(artifactDir, 'phase3_alpha_overview.png');
  await page.screenshot({ path: isoPath });
  console.log('Saved Isometric Overview:', isoPath);

  // 2. Inside Lab Alpha Interior
  await clickButtonByText('Alpha Interior');
  const insidePath = path.join(artifactDir, 'phase3_alpha_inside_view.png');
  await page.screenshot({ path: insidePath });
  console.log('Saved Inside Alpha View:', insidePath);

  // 3. Soldering Arena Close-up
  await clickButtonByText('Soldering');
  const solderPath = path.join(artifactDir, 'phase3_soldering_closeup.png');
  await page.screenshot({ path: solderPath });
  console.log('Saved Soldering Arena Close-up:', solderPath);

  // 4. 3D Printer Close-up
  await clickButtonByText('3D Printer');
  const printerPath = path.join(artifactDir, 'phase3_printer_closeup.png');
  await page.screenshot({ path: printerPath });
  console.log('Saved 3D Printer Close-up:', printerPath);

  await browser.close();

  if (errors.length > 0) {
    console.error('FAILED with errors:', errors);
    process.exit(1);
  } else {
    console.log('ALL PHASE 3 SHOTS VERIFIED WITH 0 ERRORS.');
  }
}

runPhase3Verification().catch(err => {
  console.error('Phase 3 script error:', err);
  process.exit(1);
});
