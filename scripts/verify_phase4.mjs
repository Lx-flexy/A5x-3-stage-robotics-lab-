import puppeteer from 'puppeteer-core';
import path from 'path';

const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const artifactDir = 'C:\\Users\\MY\\.gemini\\antigravity\\brain\\d58f156e-404f-4f66-818d-bac29d65a711';

async function runPhase4Verification() {
  console.log('--- Starting Phase 4: Lab Beta Verification ---');
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
      if (text.trim() === targetText || text.includes(targetText)) {
        await b.click();
        await new Promise(r => setTimeout(r, 1200));
        return true;
      }
    }
    return false;
  };

  // 1. Isometric Overview of Campus (Alpha + Beta furnished)
  await clickButtonByText('Campus');
  const isoPath = path.join(artifactDir, 'phase4_campus_overview.png');
  await page.screenshot({ path: isoPath });
  console.log('Saved Campus Overview:', isoPath);

  // 2. Beta Interior View
  await clickButtonByText('Beta Interior');
  const betaInsidePath = path.join(artifactDir, 'phase4_beta_inside_view.png');
  await page.screenshot({ path: betaInsidePath });
  console.log('Saved Beta Interior View:', betaInsidePath);

  // 3. Smart Display Telemetry Close-up
  await clickButtonByText('Smart Display');
  const smartDisplayPath = path.join(artifactDir, 'phase4_beta_smart_display.png');
  await page.screenshot({ path: smartDisplayPath });
  console.log('Saved Smart Display Close-up:', smartDisplayPath);

  // 4. Bambu A1 AMS 4-Color Feeder Close-up
  await clickButtonByText('A1 AMS');
  const amsPath = path.join(artifactDir, 'phase4_beta_bambu_ams.png');
  await page.screenshot({ path: amsPath });
  console.log('Saved Bambu A1 AMS Close-up:', amsPath);

  await browser.close();

  if (errors.length > 0) {
    console.error('FAILED with errors:', errors);
    process.exit(1);
  } else {
    console.log('ALL PHASE 4 SHOTS VERIFIED WITH 0 ERRORS.');
  }
}

runPhase4Verification().catch(err => {
  console.error('Phase 4 script error:', err);
  process.exit(1);
});
