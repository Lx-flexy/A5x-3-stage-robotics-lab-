import puppeteer from 'puppeteer-core';
import path from 'path';

const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const artifactDir = 'C:\\Users\\MY\\.gemini\\antigravity\\brain\\d58f156e-404f-4f66-818d-bac29d65a711';

async function runPhase5Verification() {
  console.log('--- Starting Phase 5: Lab Gamma Verification ---');
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

  // 1. Full Campus Isometric Overview (Alpha + Beta + Gamma all 3 complete)
  await clickButtonByText('Campus');
  const fullPath = path.join(artifactDir, 'phase5_campus_full_overview.png');
  await page.screenshot({ path: fullPath });
  console.log('Saved Full Campus Overview:', fullPath);

  // 2. Gamma Interior View
  await clickButtonByText('Gamma Interior');
  const gammaInsidePath = path.join(artifactDir, 'phase5_gamma_interior.png');
  await page.screenshot({ path: gammaInsidePath });
  console.log('Saved Gamma Interior View:', gammaInsidePath);

  // 3. VR / AR Matrix Close-up
  await clickButtonByText('VR / AR');
  const vrPath = path.join(artifactDir, 'phase5_gamma_vr_zone.png');
  await page.screenshot({ path: vrPath });
  console.log('Saved VR Zone Close-up:', vrPath);

  // 4. Robotics Arena Close-up
  await clickButtonByText('Robotics');
  const roboticsPath = path.join(artifactDir, 'phase5_gamma_robotics.png');
  await page.screenshot({ path: roboticsPath });
  console.log('Saved Robotics Arena Close-up:', roboticsPath);

  // 5. Panoramic Digital Wall Close-up
  await clickButtonByText('Digital Wall');
  const wallPath = path.join(artifactDir, 'phase5_gamma_digital_wall.png');
  await page.screenshot({ path: wallPath });
  console.log('Saved Digital Wall Close-up:', wallPath);

  await browser.close();

  if (errors.length > 0) {
    console.error('FAILED with errors:', errors);
    process.exit(1);
  } else {
    console.log('ALL PHASE 5 SHOTS VERIFIED WITH 0 ERRORS.');
  }
}

runPhase5Verification().catch(err => {
  console.error('Phase 5 script error:', err);
  process.exit(1);
});
