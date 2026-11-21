import fs from 'fs';
import path from 'path';
import puppeteer from 'puppeteer-core';

const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const artifactDir = 'C:\\Users\\MY\\.gemini\\antigravity\\brain\\d58f156e-404f-4f66-818d-bac29d65a711';

async function run() {
  console.log('Generating Revision 11 Comparison Artifact...');

  const htmlContent = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Revision 11 Verification: Soldering & Hardware/Electronics Wall Fixes</title>
  <style>
    body {
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
      background: #0B1120;
      color: #E2E8F0;
      margin: 0;
      padding: 30px;
    }
    h1 {
      font-size: 26px;
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
      background: #1E293B;
      border: 1px solid #334155;
      border-radius: 10px;
      overflow: hidden;
      display: flex;
      flex-direction: column;
    }
    .card-header {
      padding: 12px 16px;
      background: #0F172A;
      font-size: 14px;
      font-weight: 600;
      color: #38BDF8;
      border-bottom: 1px solid #334155;
      display: flex;
      justify-content: space-between;
    }
    .badge-ref {
      background: #E11D48;
      color: white;
      padding: 2px 8px;
      border-radius: 4px;
      font-size: 11px;
    }
    .badge-fix {
      background: #059669;
      color: white;
      padding: 2px 8px;
      border-radius: 4px;
      font-size: 11px;
    }
    .card img {
      width: 100%;
      height: 380px;
      object-fit: cover;
      display: block;
      background: #000;
    }
    .card-footer {
      padding: 10px 16px;
      font-size: 13px;
      color: #CBD5E1;
      line-height: 1.4;
      background: #1E293B;
    }
    .single-col {
      grid-column: span 2;
    }
    .stats-table {
      width: 100%;
      border-collapse: collapse;
      margin-top: 15px;
    }
    .stats-table th, .stats-table td {
      border: 1px solid #334155;
      padding: 8px 12px;
      text-align: left;
      font-size: 13px;
    }
    .stats-table th {
      background: #0F172A;
      color: #38BDF8;
    }
  </style>
</head>
<body>
  <h1>Revision 11 Verification: Beta Left Wall (Soldering & Hardware/Electronics)</h1>
  <div class="subtitle">Complete resolution of duplicate signs, fully stocked pegboard, realistic instruments, and premium hardware units.</div>

  <div class="grid">
    <!-- Soldering Wall: User Issue vs Fixed Build -->
    <div class="card">
      <div class="card-header">
        <span>Soldering Wall: Issue in Current Build (Duplicate Signs & Unstocked)</span>
        <span class="badge-ref">BEFORE / USER REPORT</span>
      </div>
      <img src="file:///${artifactDir.replace(/\\/g, '/')}/.user_uploaded/media_1795259842348_e7bddc00.jpg" alt="User Soldering Issue" />
      <div class="card-footer">
        Dual duplicate signs rendered over each other, flat black pegboard with generic boxes, unstocked instruments.
      </div>
    </div>

    <div class="card">
      <div class="card-header">
        <span>Soldering Wall: Revision 11 Solution</span>
        <span class="badge-fix">AFTER / REVISION 11</span>
      </div>
      <img src="file:///${artifactDir.replace(/\\/g, '/')}/revision11_soldering_wall.png" alt="Revision 11 Soldering Fix" />
      <div class="card-footer">
        Zero duplicate signs (single &lt;ZoneSign /&gt; from data/zones.js at 2.52m), 4 full rows of tools with shadow-board, 2 oscilloscopes, 2 PSUs, function gen, DMM, Hakko stations with 350°C LCD, microscope, blue ESD mat, under-bench visible bins.
      </div>
    </div>

    <!-- Hardware / Electronics Shelves: User Issue vs Fixed Build -->
    <div class="card">
      <div class="card-header">
        <span>Hardware & Electronics Shelves: Issue in Current Build</span>
        <span class="badge-ref">BEFORE / USER REPORT</span>
      </div>
      <img src="file:///${artifactDir.replace(/\\/g, '/')}/.user_uploaded/media_1795259846207_8457cfad.jpg" alt="User Hardware Issue" />
      <div class="card-footer">
        Duplicate merged sign plate blocking top shelf, sparse generic boxes, no component categorization.
      </div>
    </div>

    <div class="card">
      <div class="card-header">
        <span>Hardware & Electronics Shelves: Revision 11 Solution</span>
        <span class="badge-fix">AFTER / REVISION 11</span>
      </div>
      <img src="file:///${artifactDir.replace(/\\/g, '/')}/revision11_electronics_hardware_shelves.png" alt="Revision 11 Hardware Fix" />
      <div class="card-footer">
        TWO separate &lt;ZoneSign /&gt; plates (Electronics 1.4m & Hardware 1.8m, 0.5m apart, 19cm above props), 5-tier hardware unit (RPi5 boxes + acrylic cases, Arduino UNO/Mega + boards, ESP32 + dev boards, 3 autonomous robot cars, 2 articulated robot arms), and 24-drawer parts cabinet tower with labeled bins.
      </div>
    </div>

    <!-- Close-ups -->
    <div class="card">
      <div class="card-header">
        <span>Close-Up: Fully Stocked 4-Row Pegboard</span>
        <span class="badge-fix">DETAIL</span>
      </div>
      <img src="file:///${artifactDir.replace(/\\/g, '/')}/revision11_pegboard_closeup.png" alt="Pegboard Close-up" />
      <div class="card-footer">
        Row 1: 4 pliers + 2 wire strippers with rubber grips. Row 2: 6 screwdrivers + 3 tweezers + hex keys. Row 3: Solder coils, heat-shrink, tapes, parts box. Row 4: Wire spools, flush cutters, desoldering pump.
      </div>
    </div>

    <div class="card">
      <div class="card-header">
        <span>Close-Up: Realistic Shelf Instruments</span>
        <span class="badge-fix">DETAIL</span>
      </div>
      <img src="file:///${artifactDir.replace(/\\/g, '/')}/revision11_instruments_closeup.png" alt="Instruments Close-up" />
      <div class="card-footer">
        2 Bench Oscilloscopes with green & yellow waveforms, 2 Bench PSUs (12.00V 1.50A), 1 Function Generator (10.000 kHz sine), 1 Bench DMM (5.0182V DC).
      </div>
    </div>

    <div class="card">
      <div class="card-header">
        <span>Close-Up: Soldering Benchtop Workstations</span>
        <span class="badge-fix">DETAIL</span>
      </div>
      <img src="file:///${artifactDir.replace(/\\/g, '/')}/revision11_soldering_bench_closeup.png" alt="Bench Workstations Close-up" />
      <div class="card-footer">
        3 Hakko stations (350°C LCD, spring holder, cord, tip cleaner), 2 yellow handheld multimeters (rotary dial, probe leads), inspection microscope, PCB holder with green circuit board, helping hands.
      </div>
    </div>

    <div class="card">
      <div class="card-header">
        <span>Close-Up: Hardware Zone 5-Tier Unit</span>
        <span class="badge-fix">DETAIL</span>
      </div>
      <img src="file:///${artifactDir.replace(/\\/g, '/')}/revision11_hardware_shelf_closeup.png" alt="Hardware Shelf Close-up" />
      <div class="card-footer">
        RPi 5 retail boxes & cases, Arduino UNO/Mega boxes & boards, ESP32 dev boards, 3 yellow-wheel robot cars, 2 articulated 4-axis robotic arms.
      </div>
    </div>
  </div>
</body>
</html>`;

  const htmlPath = path.join(artifactDir, 'revision11_comparison.html');
  fs.writeFileSync(htmlPath, htmlContent);
  console.log('Saved HTML comparison to:', htmlPath);

  const browser = await puppeteer.launch({
    executablePath: chromePath,
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-gpu']
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1920, height: 1600 });
  await page.goto('file:///' + htmlPath.replace(/\\/g, '/'), { waitUntil: 'networkidle0' });
  await new Promise(r => setTimeout(r, 1000));

  const pngPath = path.join(artifactDir, 'revision11_side_by_side_comparison.png');
  await page.screenshot({ path: pngPath, fullPage: true });
  console.log('Saved composite comparison image to:', pngPath);

  await browser.close();
}

run().catch(err => {
  console.error('Error generating comparison:', err);
  process.exit(1);
});
