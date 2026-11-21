import fs from 'fs';
import path from 'path';
import os from 'os';
import puppeteer from 'puppeteer-core';

const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const artifactDir = 'C:\\Users\\MY\\.gemini\\antigravity\\brain\\d58f156e-404f-4f66-818d-bac29d65a711';
const refImageSource = path.join(artifactDir, '.user_uploaded', 'media_1795263204204_8c032b31.jpg');

async function run() {
  console.log('Generating Revision 14 (Lab Gamma Teaching Wall) Comparison Artifact...');

  // Copy reference image to artifact root if not already there
  const refImageDest = path.join(artifactDir, 'revision14_reference_render.jpg');
  if (fs.existsSync(refImageSource)) {
    fs.copyFileSync(refImageSource, refImageDest);
    console.log('Copied reference render to:', refImageDest);
  }

  const htmlContent = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Revision 14 Verification: Lab Gamma Teaching Wall Rebuild vs Reference</title>
  <style>
    body {
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
      background: #070D18;
      color: #E2E8F0;
      margin: 0;
      padding: 30px;
    }
    h1 {
      font-size: 28px;
      color: #38BDF8;
      margin-bottom: 8px;
    }
    .subtitle {
      color: #94A3B8;
      font-size: 15px;
      margin-bottom: 25px;
    }
    .grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 24px;
      margin-bottom: 30px;
    }
    .card {
      background: #0F172A;
      border: 1px solid #1E293B;
      border-radius: 12px;
      overflow: hidden;
      display: flex;
      flex-direction: column;
      box-shadow: 0 4px 20px rgba(0,0,0,0.4);
    }
    .card-header {
      padding: 12px 18px;
      background: #0B1322;
      font-size: 14px;
      font-weight: 600;
      color: #38BDF8;
      border-bottom: 1px solid #1E293B;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    .badge-ref {
      background: #E11D48;
      color: white;
      padding: 3px 10px;
      border-radius: 4px;
      font-size: 11px;
      font-weight: 700;
      letter-spacing: 0.5px;
    }
    .badge-build {
      background: #059669;
      color: white;
      padding: 3px 10px;
      border-radius: 4px;
      font-size: 11px;
      font-weight: 700;
      letter-spacing: 0.5px;
    }
    .card img {
      width: 100%;
      height: 480px;
      object-fit: cover;
      display: block;
      background: #020617;
    }
    .card-desc {
      padding: 14px 18px;
      font-size: 13px;
      line-height: 1.5;
      color: #94A3B8;
      border-top: 1px solid #1E293B;
    }
    .card-desc b {
      color: #F1F5F9;
    }
    .closeups-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 20px;
      margin-top: 20px;
    }
    .closeups-grid .card img {
      height: 320px;
    }
  </style>
</head>
<body>
  <h1>Revision 14 Verification: Lab Gamma Teaching Wall Rebuild</h1>
  <div class="subtitle">Side-by-side comparison from identical camera pose (Dev Key C-Gamma: [40.0, 1.65, 9.5], facing Z=0, FOV 70) matching user reference render.</div>

  <div class="grid">
    <!-- Left: Reference Render -->
    <div class="card">
      <div class="card-header">
        <span>USER REFERENCE RENDER (TEACHING WALL)</span>
        <span class="badge-ref">REFERENCE</span>
      </div>
      <img src="revision14_reference_render.jpg" alt="User Reference Render" />
      <div class="card-desc">
        <b>Target Composition:</b> Navy fluted wall with central lighter section; single header block "A5X INDUSTRIES | LAB GAMMA - Advanced Innovation Lab"; flat-top hexagonal blue LED frame with 3.2x1.8m display & dock; slim black soundbar; whiteboard on tripod stand; continuous 8.5m oak credenza with blue floor strip; flanking showcase shelves with trophies, robot arm, drone, cars & trailing plants.
      </div>
    </div>

    <!-- Right: In-Engine Build -->
    <div class="card">
      <div class="card-header">
        <span>IN-ENGINE THREE.JS REBUILD (KEY C-GAMMA POSE)</span>
        <span class="badge-build">VERIFIED BUILD</span>
      </div>
      <img src="revision14_gamma_teaching_wall_reference_pose.png" alt="In-Engine Build" />
      <div class="card-desc">
        <b>Engine Realization:</b> 16m navy fluted wall (#0B2A5B/#0E336D) with soft cove wall-wash; unified header block (toneMapped: false); 3.2x1.8m live UI with 8 dock icons, time & weather; hexagonal blue LED frame; slim soundbar; tripod whiteboard with exact 5 checklist items & robot arm sketch; 8.5m continuous credenza with blue floor LED & tucked teacher chair; 2 flanking units fully stocked.
      </div>
    </div>
  </div>

  <h2>Zone Detail Close-Ups</h2>
  <div class="closeups-grid">
    <div class="card">
      <div class="card-header">
        <span>DISPLAY, HEX FRAME, SOUNDBAR & UNIFIED HEADER</span>
        <span class="badge-build">DETAIL</span>
      </div>
      <img src="revision14_gamma_display_hex_frame.png" alt="Display and Header" />
      <div class="card-desc">
        <b>Features:</b> Crisp, single-source header texture (no duplicate floating signs), hexagonal flat-top LED border, 8 app dock icons (Whiteboard, Present, Files, Apps, Browser, Terminal, 3D Print, Settings), 10:24 AM clock, soundbar with green power LED.
      </div>
    </div>

    <div class="card">
      <div class="card-header">
        <span>RIGHT SHOWCASE SHELF & WHITEBOARD ON TRIPOD</span>
        <span class="badge-build">DETAIL</span>
      </div>
      <img src="revision14_gamma_right_shelf_props.png" alt="Right Shelf and Whiteboard" />
      <div class="card-desc">
        <b>Features:</b> Tripod whiteboard with 5 checkboxes (Robotics, AI & ML, IoT, AR / VR, Prototyping) and robot arm sketch; showcase shelf with 2 gold trophies on marble bases, oscilloscope, robot car, plants, trailing vines, warm LEDs, and blue top frame.
      </div>
    </div>

    <div class="card">
      <div class="card-header">
        <span>LEFT SHOWCASE SHELF (ROBOTICS & DRONES)</span>
        <span class="badge-build">DETAIL</span>
      </div>
      <img src="revision14_gamma_left_shelf_props.png" alt="Left Shelf" />
      <div class="card-desc">
        <b>Features:</b> 6-axis articulated robot arm, racing quadcopter drone, multiple robot cars with yellow wheels, trailing green plants, warm shelf lights, and blue LED top frame.
      </div>
    </div>

    <div class="card">
      <div class="card-header">
        <span>8.5M CONTINUOUS CREDENZA & BLUE FLOOR STRIP</span>
        <span class="badge-build">DETAIL</span>
      </div>
      <img src="revision14_gamma_credenza_closeup.png" alt="Credenza" />
      <div class="card-desc">
        <b>Features:</b> Continuous 8.5m oak cabinet with 40mm white laminate top, vertical fluted oak doors, discrete label, continuous electric-blue floor LED strip with floor glow plane, open laptop, pen cup, potted plant, and tucked teacher chair at left end.
      </div>
    </div>
  </div>
</body>
</html>`;

  const htmlPath = path.join(artifactDir, 'revision14_comparison.html');
  fs.writeFileSync(htmlPath, htmlContent);
  console.log('Saved comparison HTML:', htmlPath);

  // Capture screenshot of the comparison HTML
  console.log('Capturing side-by-side comparison screenshot...');
  const uniqueUserDataDir = path.join(os.tmpdir(), 'puppeteer_rev14_side_' + Date.now());
  const browser = await puppeteer.launch({
    executablePath: chromePath,
    headless: 'new',
    userDataDir: uniqueUserDataDir,
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-gpu']
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1920, height: 1800 });
  await page.goto('file:///' + htmlPath.replace(/\\/g, '/'), { waitUntil: 'load' });
  await new Promise(r => setTimeout(r, 1500));

  const compScreenshotPath = path.join(artifactDir, 'revision14_side_by_side_comparison.png');
  await page.screenshot({ path: compScreenshotPath, fullPage: true });
  console.log('Saved side-by-side screenshot:', compScreenshotPath);

  await browser.close();
}

run().catch(err => {
  console.error('Error generating Revision 14 comparison:', err);
  process.exit(1);
});
