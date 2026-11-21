import puppeteer from 'puppeteer-core';
import path from 'path';
import fs from 'fs';

const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const artifactDir = 'C:\\Users\\MY\\.gemini\\antigravity\\brain\\d58f156e-404f-4f66-818d-bac29d65a711';
const tempProfile = path.join(process.cwd(), '.chrome_temp_' + Date.now());

async function verify() {
  console.log('Connecting to Chrome...');
  const browser = await puppeteer.launch({
    executablePath: chromePath,
    userDataDir: tempProfile,
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-gpu']
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1920, height: 1080 });

  // 1. Load Campus Page
  console.log('1. Loading Campus Page...');
  await page.goto('http://localhost:5173/campus', { waitUntil: 'domcontentloaded', timeout: 30000 });
  await page.waitForSelector('canvas', { timeout: 15000 });
  await new Promise(r => setTimeout(r, 2000));

  // 2. Open Equipment Modal and switch to Interactive 3D view
  console.log('2. Opening Equipment Modal & testing 3D tab...');
  await page.evaluate(() => {
    window.dispatchEvent(new CustomEvent('inspect-equipment', { detail: 'bambu-lab-a1' }));
  });
  await new Promise(r => setTimeout(r, 1000));

  // Click on "Interactive 3D" button
  const buttons = await page.$$('button');
  for (const btn of buttons) {
    const text = await page.evaluate(el => el.textContent, btn);
    if (text.includes('Interactive 3D')) {
      await btn.click();
      break;
    }
  }
  await new Promise(r => setTimeout(r, 2000));

  const screenshotPath3D = path.join(artifactDir, 'phase9_equipment_3d_orbit.png');
  await page.screenshot({ path: screenshotPath3D });
  console.log('Saved 3D Orbit modal screenshot:', screenshotPath3D);

  // Close modal
  await page.keyboard.press('Escape');
  await new Promise(r => setTimeout(r, 800));

  // 3. Teleport to Lab Gamma Robotics Arena
  console.log('3. Teleporting to Lab Gamma...');
  await page.evaluate(() => {
    const btns = Array.from(document.querySelectorAll('button'));
    const gammaBtn = btns.find(b => b.textContent.trim() === 'Gamma');
    if (gammaBtn) gammaBtn.click();
  });
  await new Promise(r => setTimeout(r, 2000));

  const screenshotGamma = path.join(artifactDir, 'phase9_gamma_active_arena.png');
  await page.screenshot({ path: screenshotGamma });
  console.log('Saved Gamma Active Arena screenshot:', screenshotGamma);

  await browser.close();

  try {
    fs.rmSync(tempProfile, { recursive: true, force: true });
  } catch {}

  console.log('Extended verification completed successfully.');
}

verify().catch(err => {
  console.error('Error during verification:', err);
  process.exit(1);
});
