import puppeteer from 'puppeteer-core';

const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';

async function measure() {
  console.log('Launching Chrome to measure baseline performance...');
  const browser = await puppeteer.launch({
    executablePath: chromePath,
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-gpu']
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1920, height: 1080 });

  await page.goto('http://localhost:5173/campus', { waitUntil: 'domcontentloaded', timeout: 30000 });
  await page.waitForSelector('canvas', { timeout: 15000 });

  // Wait 3 seconds for scene initialization
  await new Promise(r => setTimeout(r, 3000));

  // Press 'KeyW' to simulate continuous walking
  await page.keyboard.down('KeyW');

  const samples = [];
  for (let i = 0; i < 6; i++) {
    await new Promise(r => setTimeout(r, 800));
    const stats = await page.evaluate(() => window.__perfStats || null);
    if (stats) samples.push(stats);
  }

  await page.keyboard.up('KeyW');
  await browser.close();

  console.log('=== BASELINE PERFORMANCE MEASUREMENTS ===');
  console.log(JSON.stringify(samples, null, 2));
}

measure().catch(err => {
  console.error('Measurement error:', err);
  process.exit(1);
});
