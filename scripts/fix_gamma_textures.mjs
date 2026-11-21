import fs from 'fs';
import path from 'path';

const filePath = 'c:\\Users\\MY\\Desktop\\PROJECTS_A5X\\A5x_3_stage_lab\\src\\labs\\Gamma\\gammaTextures.js';
const content = fs.readFileSync(filePath, 'utf8');

// Regex to capture each exported function
const regex = /export function ([A-Za-z0-9_]+)\(\)[\s\S]*?(?=export function|$)/g;

const functionsMap = new Map();
let match;
while ((match = regex.exec(content)) !== null) {
  const name = match[1];
  const body = match[0].trim();
  // We want the clean version of the function without trailing duplicate comments
  if (!functionsMap.has(name)) {
    // Clean out any accidental embedded "export function" inside body
    const firstExport = body.indexOf('export function', 10);
    const cleanBody = firstExport > -1 ? body.substring(0, firstExport).trim() : body;
    functionsMap.set(name, cleanBody);
  }
}

console.log('Unique functions extracted:', Array.from(functionsMap.keys()));

let cleanOutput = `import * as THREE from 'three';

// Cache to prevent duplicate canvas allocations
const textureCache = new Map();

/**
 * Procedural Texture Generator for Lab Gamma & Robotics Arena (Revision 17)
 * High-performance, crisp canvas-backed textures for smart screens, monitors,
 * track surfaces, whiteboards, cutting mats, and signs.
 */
`;

for (const [name, body] of functionsMap.entries()) {
  cleanOutput += '\n' + body + '\n';
}

fs.writeFileSync(filePath, cleanOutput, 'utf8');
console.log('Successfully wrote clean gammaTextures.js with', functionsMap.size, 'functions.');
