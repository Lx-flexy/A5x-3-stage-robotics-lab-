import fs from 'fs';

const content = fs.readFileSync('src/labs/Gamma/gammaTextures.js', 'utf8');

// Find the first instance of each function
// All 21 expected functions:
const expectedFns = [
  'getGammaInteractiveDisplayTexture',
  'getGammaWhiteboardStandTexture',
  'getRoboticsHexBannerTexture',
  'getSoccerPitchTexture',
  'getRoboRaceTrackTexture',
  'getLineFollowerTrackTexture',
  'getRoboSoccerSkirtTexture',
  'getRoboRaceSkirtTexture',
  'getLineFollowerSkirtTexture',
  'getStartFinishBannerTexture',
  'getA5XNeonSignTexture',
  'getGammaTeachingHeaderTexture',
  'getGammaCredenzaLabelTexture',
  'getGammaVerticalFlutingTexture',
  'getGammaWhiteboardTexture',
  'getGammaCodeEditorTexture',
  'getGammaCadMonitorTexture',
  'getGammaVrScreenTexture',
  'getGammaArenaTrackTexture',
  'getGammaCuttingMatTexture',
  'getGammaPrinterH2DTexture'
];

// Let's split on function declarations
const regex = /export function (\w+)\s*\([^)]*\)\s*\{[\s\S]*?(?=\nexport function |\n\/\*\*|$)/g;
let match;
const fnMap = new Map();

while ((match = regex.exec(content)) !== null) {
  const name = match[1];
  if (!fnMap.has(name)) {
    fnMap.set(name, match[0].trim());
  }
}

console.log('Unique functions extracted:', fnMap.size);

const header = `import * as THREE from 'three';

const textureCache = new Map();
`;

let newContent = header + '\n';
for (const [k, code] of fnMap.entries()) {
  newContent += code + '\n\n';
}

fs.writeFileSync('src/labs/Gamma/gammaTextures.js', newContent, 'utf8');
console.log('Successfully wrote deduplicated gammaTextures.js with ' + fnMap.size + ' functions.');
