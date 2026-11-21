import puppeteer from 'puppeteer-core';
import path from 'path';

const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const artifactDir = 'C:\\Users\\MY\\.gemini\\antigravity\\brain\\d58f156e-404f-4f66-818d-bac29d65a711';

async function run() {
  console.log('Launching headless Chrome for Revision 3 UI captures...');
  const browser = await puppeteer.launch({
    executablePath: chromePath,
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-gpu']
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1920, height: 1080 });

  console.log('Loading Campus page...');
  await page.goto('http://localhost:5173/campus', { waitUntil: 'domcontentloaded', timeout: 30000 });
  await page.waitForSelector('canvas', { timeout: 15000 });
  await new Promise(r => setTimeout(r, 2000));

  // ==========================================
  // 1. FIRST-PERSON VIEW WITH LIGHT NEUMORPHIC HUD
  // ==========================================
  console.log('1. Capturing first-person view with HUD...');
  await page.evaluate(() => {
    if (window.__useStore) {
      window.__useStore.getState().setPlayerPosition([24.0, 1.65, 6.0]);
      window.__useStore.getState().setPlayerRotation(0);
      window.__useStore.getState().setActiveLabId('beta');
    }
  });
  await new Promise(r => setTimeout(r, 1500));
  const fpPath = path.join(artifactDir, 'revision3_first_person_hud.png');
  await page.screenshot({ path: fpPath });
  console.log('Saved:', fpPath);

  // ==========================================
  // 2. NEAR-EQUIPMENT PROMPT
  // ==========================================
  console.log('2. Teleporting near Bambu Lab 3D Printer to trigger prompt...');
  await page.evaluate(() => {
    if (window.__useStore) {
      // Near Bambu A1 Mini in Alpha: [3.2, 1.65, 1.0]
      window.__useStore.getState().setPlayerPosition([3.2, 1.65, 2.0]);
      window.__useStore.getState().setActiveLabId('alpha');
      window.__useStore.getState().setActiveInteraction(null);
    }
  });
  await new Promise(r => setTimeout(r, 1500));
  const promptPath = path.join(artifactDir, 'revision3_near_equipment_prompt.png');
  await page.screenshot({ path: promptPath });
  console.log('Saved:', promptPath);

  // ==========================================
  // 3. INFO PANEL (E ON EQUIPMENT)
  // ==========================================
  console.log('3. Opening Info Panel for Bambu Lab A1 Mini...');
  await page.evaluate(() => {
    if (window.__useStore) {
      window.__useStore.getState().setActiveInteraction('alpha-bambu');
    }
  });
  await new Promise(r => setTimeout(r, 1500));
  const infoPath = path.join(artifactDir, 'revision3_info_panel.png');
  await page.screenshot({ path: infoPath });
  console.log('Saved:', infoPath);

  // Dismiss info panel
  await page.evaluate(() => {
    if (window.__useStore) {
      window.__useStore.getState().setActiveInteraction(null);
    }
  });
  await new Promise(r => setTimeout(r, 800));

  // ==========================================
  // 4. MAP PANEL (CAMPUS BLUEPRINT MODAL)
  // ==========================================
  console.log('4. Opening Map Panel...');
  await page.evaluate(() => {
    // Click the Map button in header
    const mapBtn = document.querySelector('button[aria-label="Open Campus Blueprint Map"]');
    if (mapBtn) mapBtn.click();
  });
  await new Promise(r => setTimeout(r, 1200));
  const mapPath = path.join(artifactDir, 'revision3_map_panel.png');
  await page.screenshot({ path: mapPath });
  console.log('Saved:', mapPath);

  // Close map modal
  await page.evaluate(() => {
    const closeBtn = document.querySelector('button[aria-label="Close Map"]');
    if (closeBtn) closeBtn.click();
  });
  await new Promise(r => setTimeout(r, 800));

  // ==========================================
  // 5. TOP-DOWN VIEW
  // ==========================================
  console.log('5. Switching to Top-Down View...');
  await page.evaluate(() => {
    const buttons = Array.from(document.querySelectorAll('button'));
    const topDownBtn = buttons.find(b => b.textContent.includes('Top-Down'));
    if (topDownBtn) topDownBtn.click();
  });
  await new Promise(r => setTimeout(r, 2000));
  const topDownPath = path.join(artifactDir, 'revision3_top_down_view.png');
  await page.screenshot({ path: topDownPath });
  console.log('Saved:', topDownPath);

  // Switch back to Walk
  await page.evaluate(() => {
    const buttons = Array.from(document.querySelectorAll('button'));
    const walkBtn = buttons.find(b => b.textContent.includes('Walk'));
    if (walkBtn) walkBtn.click();
  });
  await new Promise(r => setTimeout(r, 800));

  // ==========================================
  // 6. PAUSE MENU
  // ==========================================
  console.log('6. Opening Pause Menu...');
  await page.evaluate(() => {
    const menuBtn = document.querySelector('button[aria-label="Open Complex Pause Menu"]');
    if (menuBtn) menuBtn.click();
  });
  await new Promise(r => setTimeout(r, 1200));
  const pausePath = path.join(artifactDir, 'revision3_pause_menu.png');
  await page.screenshot({ path: pausePath });
  console.log('Saved:', pausePath);

  // Close pause menu
  await page.evaluate(() => {
    const resumeBtn = document.querySelector('button[aria-label="Resume"]');
    if (resumeBtn) resumeBtn.click();
  });
  await new Promise(r => setTimeout(r, 800));

  // ==========================================
  // 7. MOBILE VIEW
  // ==========================================
  console.log('7. Switching to Mobile Viewport (390x844 iPhone 14)...');
  await page.setViewport({ width: 390, height: 844, isMobile: true, hasTouch: true });
  // Enable mobile touch controls via settings or button
  await page.evaluate(() => {
    const settingsBtn = document.querySelector('button[aria-label="Open Settings"]');
    if (settingsBtn) settingsBtn.click();
  });
  await new Promise(r => setTimeout(r, 800));
  await page.evaluate(() => {
    const buttons = Array.from(document.querySelectorAll('button'));
    const touchBtn = buttons.find(b => b.textContent.includes('Off') || b.textContent.includes('Touch Joystick'));
    if (touchBtn) touchBtn.click();
    const closeBtn = document.querySelector('button[aria-label="Close"]');
    if (closeBtn) closeBtn.click();
  });
  await new Promise(r => setTimeout(r, 1200));

  const mobilePath = path.join(artifactDir, 'revision3_mobile_view.png');
  await page.screenshot({ path: mobilePath });
  console.log('Saved:', mobilePath);

  await browser.close();
  console.log('All Revision 3 UI captures completed successfully!');
}

run().catch(err => {
  console.error('Error during Revision 3 captures:', err);
  process.exit(1);
});
