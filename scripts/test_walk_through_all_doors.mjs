import puppeteer from 'puppeteer-core';

const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';

async function testDoors() {
  console.log('Testing walking through all doors in real simulation...');
  const browser = await puppeteer.launch({
    executablePath: chromePath,
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-gpu']
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1920, height: 1080 });

  await page.goto('http://localhost:5173/campus', { waitUntil: 'domcontentloaded', timeout: 30000 });
  await page.waitForSelector('canvas', { timeout: 15000 });
  await new Promise(r => setTimeout(r, 2000));

  // Test 1: Main Entrance Door (Walk from Z=14 to Z=10 at X=8)
  console.log('1. Testing Main Entrance Door traversal (Z=14 -> Z=10 at X=8)...');
  await page.evaluate(() => {
    window.__useStore.getState().setPlayerPosition([8.0, 1.65, 14.0]);
  });
  await new Promise(r => setTimeout(r, 400));

  // Simulate walking forward (-Z)
  for (let step = 0; step < 25; step++) {
    await page.evaluate(() => {
      // simulate forward step
      const pos = window.__useStore.getState().playerPosition;
      const doorStates = window.__useStore.getState().doorStates;
      // check proximity
      const dist = Math.hypot(pos[0] - 8, pos[2] - 12);
      if (dist < 4.2 && !doorStates['door-main-entrance']) {
        window.__useStore.getState().setDoorOpen('door-main-entrance', true);
      }
      const [nx, nz] = window.__useStore.getState().resolveMovement 
        ? window.__useStore.getState().resolveMovement(pos[0], pos[2], 0, -0.2)
        : [pos[0], pos[2] - 0.2];
    });
  }

  // Verify player controller resolveMovement directly in world
  const results = await page.evaluate(async () => {
    const { collisionSystem } = await import('./src/controls/Collision.jsx');
    
    // Test 1: Main entrance (X=8, walking from Z=13 to Z=11)
    let p1 = [8.0, 13.0];
    const door1 = { 'door-main-entrance': true };
    for (let i = 0; i < 20; i++) {
      p1 = collisionSystem.resolveMovement(p1[0], p1[1], 0, -0.15, door1);
    }

    // Test 2: Alpha -> Beta Door (Z=6, walking from X=15 to X=17)
    let p2 = [15.0, 6.0];
    const door2 = { 'door-alpha-beta': true };
    for (let i = 0; i < 20; i++) {
      p2 = collisionSystem.resolveMovement(p2[0], p2[1], 0.15, 0, door2);
    }

    // Test 3: Beta -> Gamma Door (Z=6, walking from X=31 to X=33)
    let p3 = [31.0, 6.0];
    const door3 = { 'door-beta-gamma': true };
    for (let i = 0; i < 20; i++) {
      p3 = collisionSystem.resolveMovement(p3[0], p3[1], 0.15, 0, door3);
    }

    // Test 4: Gamma -> Arena Door (Z=6, walking from X=47 to X=49)
    let p4 = [47.0, 6.0];
    const door4 = { 'door-gamma-arena': true };
    for (let i = 0; i < 20; i++) {
      p4 = collisionSystem.resolveMovement(p4[0], p4[1], 0.15, 0, door4);
    }

    return {
      mainEntranceEnd: p1,
      alphaBetaEnd: p2,
      betaGammaEnd: p3,
      gammaArenaEnd: p4
    };
  });

  console.log('Door Traversal Simulation Results:');
  console.log(JSON.stringify(results, null, 2));

  await browser.close();
}

testDoors().catch(err => {
  console.error('Test error:', err);
  process.exit(1);
});
