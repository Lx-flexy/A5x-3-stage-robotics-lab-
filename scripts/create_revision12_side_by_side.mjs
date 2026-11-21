import fs from 'fs';
import path from 'path';
import puppeteer from 'puppeteer-core';

const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const artifactDir = 'C:\\Users\\MY\\.gemini\\antigravity\\brain\\d58f156e-404f-4f66-818d-bac29d65a711';

async function run() {
  console.log('Generating Revision 12 (Lab Gamma) Comparison Artifact...');

  const htmlContent = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Revision 12 Verification: Lab Gamma Build vs Reference Renders</title>
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
      height: 420px;
      object-fit: cover;
      display: block;
      background: #000;
    }
    .card-footer {
      padding: 12px 18px;
      font-size: 13px;
      color: #CBD5E1;
      line-height: 1.5;
      background: #0F172A;
    }
  </style>
</head>
<body>
  <h1>Revision 12: Lab Gamma Complete Architecture & Proving Ground Verification</h1>
  <div class="subtitle">Complete architectural reconstruction of Lab Gamma: 16x12m Main Bay + 10x12m Arena Bay matching user reference renders.</div>

  <div class="grid">
    <!-- Row 1: Wide Shot Comparison -->
    <div class="card">
      <div class="card-header">
        <span>Reference Render 1: Lab Gamma Wide Angle</span>
        <span class="badge-ref">REFERENCE</span>
      </div>
      <img src="file:///${artifactDir.replace(/\\/g, '/')}/.user_uploaded/media_1795261815598_61c3a8c7.jpg" alt="Reference 1" />
      <div class="card-footer">
        Key features: Central glowing hexagonal white LED ring, exposed black ducts, hexagonal smart display frame, whiteboard, trophy shelves, 44 seats with blue cushions, blue floor guide lines.
      </div>
    </div>

    <div class="card">
      <div class="card-header">
        <span>Build Capture: Lab Gamma Teaching Wall & Main Bay Wide Shot</span>
        <span class="badge-build">REVISION 12 BUILD</span>
      </div>
      <img src="file:///${artifactDir.replace(/\\/g, '/')}/revision12_gamma_teaching_wall_wide.png" alt="Build 1" />
      <div class="card-footer">
        Matching composition: Central hexagonal LED frame around 3.2x1.8m interactive display, whiteboard with sketches, 2-bay trophy shelves, teacher desk with A5X panel & underglow, 44 instanced student seats, blue floor guide lines.
      </div>
    </div>

    <!-- Row 2: Ceiling & Lighting Comparison -->
    <div class="card">
      <div class="card-header">
        <span>Ceiling Structure & Hexagonal Glowing LED Ring</span>
        <span class="badge-build">CEILING & LIGHTING</span>
      </div>
      <img src="file:///${artifactDir.replace(/\\/g, '/')}/revision12_gamma_ceiling_wide.png" alt="Ceiling" />
      <div class="card-footer">
        Suspended dual-hexagon white emissive tube array, black beam/duct structures, parallel linear LED runs, AC cassette unit, blue perimeter cove ribbon.
      </div>
    </div>

    <div class="card">
      <div class="card-header">
        <span>Soldering & Assembly Arena (4 Workstations & Articulated Fume Arms)</span>
        <span class="badge-build">SOLDERING ARENA</span>
      </div>
      <img src="file:///${artifactDir.replace(/\\/g, '/')}/revision12_gamma_soldering_closeup.png" alt="Soldering Close" />
      <div class="card-footer">
        4 Black corrugated articulated fume extractor arms with clear funnels, full pegboard, 4 Hakko stations (350°C), handheld multimeters, stereo inspection microscope, blue ESD mats, under-bench storage bins.
      </div>
    </div>

    <!-- Row 3: Design & Print Corner + Front Wall -->
    <div class="card">
      <div class="card-header">
        <span>Design & 3D Print Corner (CAD PCs + Bambu H2D Enclosed & A1 Printers)</span>
        <span class="badge-build">DESIGN & PRINT</span>
      </div>
      <img src="file:///${artifactDir.replace(/\\/g, '/')}/revision12_gamma_design_print_corner.png" alt="Design & Print" />
      <div class="card-footer">
        Enclosed black Bambu Lab H2D/X1 printer with glass door and active chamber, white Bambu A1 printer, 5-spool filament rack, prototype display shelf, front skirt "3D Printing Zone" sign.
      </div>
    </div>

    <div class="card">
      <div class="card-header">
        <span>Hardware & Electronics Front Wall (5-Tier Connected Shelving)</span>
        <span class="badge-build">HARDWARE & ELECTRONICS</span>
      </div>
      <img src="file:///${artifactDir.replace(/\\/g, '/')}/revision12_gamma_hardware_electronics_front.png" alt="Hardware Front" />
      <div class="card-footer">
        Hardware: Autonomous robot cars, quadcopter drones, RPi5/Arduino/ESP32 dev boxes, robotic arms. Electronics: 24-drawer parts cabinet, labeled bins, oscilloscopes, PSUs, breadboards, top foliage.
      </div>
    </div>

    <!-- Row 4: AR/VR Zone + Robotics Arena Bay -->
    <div class="card">
      <div class="card-header">
        <span>AR / VR Immersive Zone (6 Headsets on Stands & Mountain View Screen)</span>
        <span class="badge-build">AR / VR ZONE</span>
      </div>
      <img src="file:///${artifactDir.replace(/\\/g, '/')}/revision12_gamma_ar_vr_zone.png" alt="AR/VR Zone" />
      <div class="card-footer">
        Navy corner with glowing blue LED frame, long oak bench with 6 VR headsets and controllers on metal stands, large wall screen showing alpine landscape VR scene, circular plush rug, 3 beanbags.
      </div>
    </div>

    <div class="card">
      <div class="card-header">
        <span>Robotics Arena Bay (Through Glass Door & Inside Proving Ground)</span>
        <span class="badge-build">ARENA PROVING GROUND</span>
      </div>
      <img src="file:///${artifactDir.replace(/\\/g, '/')}/revision12_gamma_arena_through_door.png" alt="Arena Bay" />
      <div class="card-footer">
        Full-height glass partition wall at X=48 with sliding door, "ROBOTICS TESTING ARENA" header plate, raised 7x8m platform with asphalt track, 4 animated rovers, obstacle cones, ramp, diagnostic bench.
      </div>
    </div>
  </div>
</body>
</html>`;

  const htmlPath = path.join(artifactDir, 'revision12_comparison.html');
  fs.writeFileSync(htmlPath, htmlContent);
  console.log('Saved HTML comparison to:', htmlPath);

  const browser = await puppeteer.launch({
    executablePath: chromePath,
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-gpu']
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1920, height: 2100 });
  await page.goto('file:///' + htmlPath.replace(/\\/g, '/'), { waitUntil: 'networkidle0' });
  await new Promise(r => setTimeout(r, 1000));

  const pngPath = path.join(artifactDir, 'revision12_side_by_side_comparison.png');
  await page.screenshot({ path: pngPath, fullPage: true });
  console.log('Saved composite comparison image to:', pngPath);

  await browser.close();
}

run().catch(err => {
  console.error('Error generating comparison:', err);
  process.exit(1);
});
