import fs from 'fs';
import path from 'path';
import os from 'os';
import puppeteer from 'puppeteer-core';

const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const artifactDir = 'C:\\Users\\MY\\.gemini\\antigravity\\brain\\d58f156e-404f-4f66-818d-bac29d65a711';
const userImageSource = path.join(artifactDir, '.user_uploaded', 'media_1795264932787_52e73f11.jpg');

async function run() {
  console.log('Generating Revision 16 Side-by-Side Comparison Artifact...');

  // Copy user uploaded image to artifact directory for reference
  const userImageDest = path.join(artifactDir, 'revision16_before_screenshot.jpg');
  if (fs.existsSync(userImageSource)) {
    fs.copyFileSync(userImageSource, userImageDest);
    console.log('Copied user screenshot to:', userImageDest);
  }

  const htmlContent = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Revision 16 Verification: Lab Gamma Zone Allocation & Furniture Quality</title>
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
      box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.5);
    }
    .card-header {
      padding: 14px 18px;
      background: #1E293B;
      font-weight: 600;
      font-size: 16px;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    .tag-before {
      background: #EF4444;
      color: white;
      padding: 3px 10px;
      border-radius: 12px;
      font-size: 12px;
    }
    .tag-after {
      background: #10B981;
      color: white;
      padding: 3px 10px;
      border-radius: 12px;
      font-size: 12px;
    }
    .card img {
      width: 100%;
      height: 480px;
      object-fit: cover;
      display: block;
    }
    .notes {
      padding: 16px 20px;
      font-size: 14px;
      line-height: 1.6;
      color: #CBD5E1;
    }
    .feature-list {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 16px;
      margin-top: 20px;
    }
    .feature-item {
      background: #1E293B;
      padding: 16px;
      border-radius: 8px;
      border-left: 4px solid #38BDF8;
    }
    .feature-title {
      font-weight: 600;
      color: #38BDF8;
      margin-bottom: 6px;
    }
  </style>
</head>
<body>
  <h1>Revision 16: Lab Gamma Zone Allocation & Furniture Quality</h1>
  <div class="subtitle">Direct side-by-side comparison between the user's reported screenshot and the rebuilt Gamma layout and props.</div>

  <div class="grid">
    <div class="card">
      <div class="card-header">
        <span>User Reported Issue</span>
        <span class="tag-before">Before (Revision 14)</span>
      </div>
      <img src="revision16_before_screenshot.jpg" alt="Before: 3D printer in middle, black slab legs, crude chairs" />
      <div class="notes">
        <strong>Issues identified:</strong>
        <ul>
          <li>3D printer bench stood stranded in the middle of the room next to VR area.</li>
          <li>Student tables had heavy solid black slab legs underneath blocking line-of-sight.</li>
          <li>Chairs were crude rectangular blobs with no mesh texture, no armrests, no 5-star base.</li>
          <li>Ceiling and upper walls were near-black.</li>
        </ul>
      </div>
    </div>

    <div class="card">
      <div class="card-header">
        <span>Architectural Reconstruction</span>
        <span class="tag-after">After (Revision 16)</span>
      </div>
      <img src="revision16_gamma_user_screenshot_pose.png" alt="After: Clean layout, see-through A-frames, mesh chairs, proper zoning" />
      <div class="notes">
        <strong>Fixed in Revision 16:</strong>
        <ul>
          <li><strong>Printer moved:</strong> Bambu A1 + enclosed printer integrated into right-wall Design & Print Corner with prototype wall shelf and CAD workstations.</li>
          <li><strong>Tables:</strong> 2 columns x 4 rows (3.6m long) with see-through open A-frame legs, cable tray, and oak top.</li>
          <li><strong>Chairs:</strong> Exactly 44 instanced ergonomic mesh chairs with royal blue cushions, curved dark-mesh backrests, armrests, and 5-star wheeled bases.</li>
          <li><strong>Ceiling:</strong> Architectural deep-slate ceiling with perimeter grey fascia and cove lighting.</li>
        </ul>
      </div>
    </div>
  </div>

  <div class="feature-list">
    <div class="feature-item">
      <div class="feature-title">Zone Allocation Validator</div>
      <div>Single source of truth in <code>config.js</code> with programmatic validation on startup and via Key O asserting bounds, door clearances &ge; 1.5m, and aisle clearances &ge; 1.2m.</div>
    </div>
    <div class="feature-item">
      <div class="feature-title">Design & Print Corner</div>
      <div>Unified right-wall corner featuring enclosed printer with transparent door, white Bambu A1 with printed vase, spool rack, 2 CAD desks, and dual high-mounted zone signs.</div>
    </div>
    <div class="feature-item">
      <div class="feature-title">44 Ergonomic Mesh Chairs</div>
      <div>Instanced 60 FPS rendering across 6 detailed sub-components with &plusmn;6&deg; natural yaw perturbations and 1.8m center aisle clearance.</div>
    </div>
  </div>
</body>
</html>`;

  const htmlPath = path.join(artifactDir, 'revision16_comparison.html');
  fs.writeFileSync(htmlPath, htmlContent);
  console.log('Saved comparison HTML to:', htmlPath);

  // Render HTML to PNG side-by-side artifact using Puppeteer
  const uniqueUserDataDir = path.join(os.tmpdir(), 'puppeteer_rev16_comp_' + Date.now());
  const browser = await puppeteer.launch({
    executablePath: chromePath,
    headless: 'new',
    userDataDir: uniqueUserDataDir,
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-gpu']
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1920, height: 1180 });
  await page.goto('file:///' + htmlPath.replace(/\\/g, '/'), { waitUntil: 'networkidle0' });
  await new Promise(r => setTimeout(r, 1000));

  const compPngPath = path.join(artifactDir, 'revision16_side_by_side_comparison.png');
  await page.screenshot({ path: compPngPath, fullPage: true });
  console.log('Saved side-by-side comparison screenshot to:', compPngPath);

  await browser.close();
}

run().catch(err => {
  console.error('Error creating Revision 16 comparison:', err);
  process.exit(1);
});
