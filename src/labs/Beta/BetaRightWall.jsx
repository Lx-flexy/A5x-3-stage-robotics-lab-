import React, { useMemo } from 'react';
import * as THREE from 'three';
import { Beta3DPrintingZone } from './Beta3DPrintingZone';
import {
  getBetaWallSignTexture,
  getBetaLogoTexture,
  getCodeEditorTexture,
  getCADViewportTexture,
  getWoodGrainTexture,
  getBinLabelTexture,
} from './betaTextures';

/**
 * Beta Right Wall (X=32 side): 3D Printing Zone + Designing + Coding — Revision 8
 * Back segment (z 0–4.5):
 *   - 3D PRINTING ZONE: filament spool racks, Bambu Lab A1 printer, pegboard with tools,
 *     prototype display shelf, blue LED outline sign
 *   - DESIGNING AREA: 1 PC with CAD viewport, books, filament spools, robot arm
 * Front segment (z 7.5–12):
 *   - CODING AREA: 1 PC with dark code editor, headphones, plant, shelf with instruments
 * Navy wall with logo, blue LED accent, premium mesh chairs
 */
export function BetaRightWall() {
  const sign3DPrinting = useMemo(
    () => getBetaWallSignTexture('3D PRINTING ZONE', 'Print · Prototype · Iterate'),
    []
  );
  const signDesigning = useMemo(
    () => getBetaWallSignTexture('DESIGNING AREA', '', '⬡'),
    []
  );
  const signCoding = useMemo(
    () => getBetaWallSignTexture('CODING AREA', '', '</>'),
    []
  );
  const codeEditorTexture = useMemo(() => getCodeEditorTexture(), []);
  const cadViewportTexture = useMemo(() => getCADViewportTexture(), []);
  const woodGrainTexture = useMemo(() => getWoodGrainTexture(), []);

  const oakMaterial = useMemo(
    () => new THREE.MeshStandardMaterial({ map: woodGrainTexture, roughness: 0.5, metalness: 0.08 }),
    [woodGrainTexture]
  );
  const blackMetalMaterial = useMemo(
    () => new THREE.MeshStandardMaterial({ color: '#151C26', metalness: 0.85, roughness: 0.25 }),
    []
  );
  const blueLedMaterial = useMemo(
    () => new THREE.MeshStandardMaterial({ color: '#1677FF', emissive: '#1677FF', emissiveIntensity: 3.5 }),
    []
  );
  const warmLedMaterial = useMemo(
    () => new THREE.MeshStandardMaterial({ color: '#FFF3E0', emissive: '#FFD580', emissiveIntensity: 2.5 }),
    []
  );

  const labX = 32.0; // Beta right wall at X=32

  return (
    <group name="beta-right-wall">
      {/* Navy feature wall */}
      <mesh position={[labX - 0.12, 1.8, 6.0]} rotation={[0, -Math.PI / 2, 0]} receiveShadow>
        <planeGeometry args={[11.8, 3.6]} />
        <meshStandardMaterial color="#071B3A" roughness={0.35} metalness={0.15} />
      </mesh>

      {/* Logo + "IMPOSSIBLE ENGINEERING." banner high on wall */}
      <mesh position={[labX - 0.13, 3.15, 6.0]} rotation={[0, -Math.PI / 2, 0]}>
        <planeGeometry args={[11.8, 0.65]} />
        <meshStandardMaterial color="#071B3A" roughness={0.35} metalness={0.15} />
      </mesh>

      {/* Blue LED accent at top */}
      <mesh position={[labX - 0.14, 3.42, 6.0]} rotation={[0, -Math.PI / 2, 0]}>
        <boxGeometry args={[11.8, 0.035, 0.02]} />
        <primitive object={blueLedMaterial} />
      </mesh>

      {/* ================================================================
          BACK SEGMENT (z 0–4.65): 3D PRINTING ZONE (Revision 10 Continuous Unit)
         ================================================================ */}
      <Beta3DPrintingZone />

      {/* ================================================================
          FRONT SEGMENT (z 7.5–12): CODING + DESIGNING PCs
         ================================================================ */}

      {/* Navy wall overlay for front segment */}
      <mesh position={[labX - 0.12, 1.8, 9.75]} rotation={[0, -Math.PI / 2, 0]} receiveShadow>
        <planeGeometry args={[4.5, 3.6]} />
        <meshStandardMaterial color="#071B3A" roughness={0.35} metalness={0.15} />
      </mesh>

      {/* Warm LED strip above desk area */}
      <mesh position={[labX - 0.14, 2.6, 9.75]} rotation={[0, -Math.PI / 2, 0]}>
        <boxGeometry args={[4.2, 0.03, 0.02]} />
        <primitive object={warmLedMaterial} />
      </mesh>
      {/* Angled blue LED edge */}
      <mesh position={[labX - 0.14, 2.8, 9.75]} rotation={[0, -Math.PI / 2, 0]}>
        <boxGeometry args={[4.4, 0.035, 0.015]} />
        <primitive object={blueLedMaterial} />
      </mesh>

      {/* Sign plates: Handled solely by <ZoneSign /> via data/zones.js (Coding Area & Designing Area) */}

      {/* Long oak desk for 2 workstations */}
      <group position={[labX - 0.5, 0, 9.75]}>
        <mesh position={[0, 0.74, 0]} castShadow receiveShadow>
          <boxGeometry args={[0.75, 0.045, 4.0]} />
          <primitive object={oakMaterial} />
        </mesh>
        {/* A-frame steel legs */}
        {[-1.6, 0, 1.6].map((lz, i) => (
          <group key={`dleg-${i}`} position={[0, 0.36, lz]}>
            <mesh position={[0.3, 0, 0]} castShadow>
              <boxGeometry args={[0.06, 0.72, 0.06]} />
              <primitive object={blackMetalMaterial} />
            </mesh>
            <mesh position={[-0.3, 0, 0]} castShadow>
              <boxGeometry args={[0.06, 0.72, 0.06]} />
              <primitive object={blackMetalMaterial} />
            </mesh>
          </group>
        ))}

        {/* CODING PC (local z = -1.0) */}
        <group position={[0.1, 0.76, -1.0]}>
          {/* Monitor */}
          <mesh position={[0.18, 0.01, 0]}>
            <cylinderGeometry args={[0.1, 0.12, 0.02, 12]} />
            <primitive object={blackMetalMaterial} />
          </mesh>
          <mesh position={[0.18, 0.16, 0]}>
            <boxGeometry args={[0.03, 0.3, 0.05]} />
            <primitive object={blackMetalMaterial} />
          </mesh>
          <group position={[0.12, 0.3, 0]} rotation={[0, -Math.PI / 2, 0]}>
            <mesh castShadow>
              <boxGeometry args={[0.84, 0.44, 0.025]} />
              <primitive object={blackMetalMaterial} />
            </mesh>
            <mesh position={[0, 0, 0.015]}>
              <planeGeometry args={[0.82, 0.42]} />
              <meshBasicMaterial map={codeEditorTexture} toneMapped={false} />
            </mesh>
          </group>
          {/* Keyboard */}
          <mesh position={[-0.06, 0.01, 0]}>
            <boxGeometry args={[0.12, 0.012, 0.38]} />
            <meshStandardMaterial color="#0F172A" />
          </mesh>
          {/* Headphones on stand */}
          <group position={[-0.12, 0.02, 0.5]}>
            <mesh position={[0, 0.08, 0]}>
              <cylinderGeometry args={[0.015, 0.015, 0.16, 6]} />
              <primitive object={blackMetalMaterial} />
            </mesh>
            <mesh position={[0, 0.16, 0]}>
              <torusGeometry args={[0.05, 0.015, 6, 12, Math.PI]} />
              <meshStandardMaterial color="#0F172A" roughness={0.5} />
            </mesh>
          </group>
          {/* Water bottle */}
          <mesh position={[0.2, 0.08, 0.6]} castShadow>
            <cylinderGeometry args={[0.03, 0.03, 0.16, 8]} />
            <meshStandardMaterial color="#F8FAFC" roughness={0.3} />
          </mesh>
          {/* Desk plant */}
          <group position={[-0.12, 0.02, -0.5]}>
            <mesh position={[0, 0.04, 0]}>
              <cylinderGeometry args={[0.04, 0.03, 0.08, 8]} />
              <meshStandardMaterial color="#FFFFFF" roughness={0.3} />
            </mesh>
            {[0, 1.2, 2.4, 3.6, 4.8].map((rot, ri) => (
              <mesh key={`cplant-${ri}`} position={[0, 0.1, 0]} rotation={[0.4, rot, 0]}>
                <planeGeometry args={[0.04, 0.12]} />
                <meshStandardMaterial color={ri % 2 === 0 ? '#15803D' : '#22C55E'} roughness={0.6} side={2} />
              </mesh>
            ))}
          </group>
        </group>

        {/* DESIGNING PC (local z = 1.0) */}
        <group position={[0.1, 0.76, 1.0]}>
          {/* Monitor with CAD viewport */}
          <mesh position={[0.18, 0.01, 0]}>
            <cylinderGeometry args={[0.1, 0.12, 0.02, 12]} />
            <primitive object={blackMetalMaterial} />
          </mesh>
          <mesh position={[0.18, 0.16, 0]}>
            <boxGeometry args={[0.03, 0.3, 0.05]} />
            <primitive object={blackMetalMaterial} />
          </mesh>
          <group position={[0.12, 0.3, 0]} rotation={[0, -Math.PI / 2, 0]}>
            <mesh castShadow>
              <boxGeometry args={[0.84, 0.44, 0.025]} />
              <primitive object={blackMetalMaterial} />
            </mesh>
            <mesh position={[0, 0, 0.015]}>
              <planeGeometry args={[0.82, 0.42]} />
              <meshBasicMaterial map={cadViewportTexture} toneMapped={false} />
            </mesh>
          </group>
          {/* Keyboard */}
          <mesh position={[-0.06, 0.01, 0]}>
            <boxGeometry args={[0.12, 0.012, 0.38]} />
            <meshStandardMaterial color="#0F172A" />
          </mesh>
          {/* Desk lamp */}
          <group position={[-0.15, 0, -0.5]}>
            <mesh position={[0, 0.1, 0]} castShadow>
              <cylinderGeometry args={[0.05, 0.06, 0.02, 10]} />
              <primitive object={blackMetalMaterial} />
            </mesh>
            <mesh position={[0, 0.25, 0]} rotation={[0.3, 0, 0]}>
              <cylinderGeometry args={[0.008, 0.008, 0.26, 6]} />
              <primitive object={blackMetalMaterial} />
            </mesh>
            <mesh position={[0, 0.4, -0.05]} rotation={[-0.5, 0, 0]}>
              <coneGeometry args={[0.05, 0.08, 8, 1, true]} />
              <meshStandardMaterial color="#1E293B" roughness={0.4} side={2} />
            </mesh>
          </group>
          {/* Pen holder */}
          <mesh position={[0.2, 0.04, 0.5]} castShadow>
            <cylinderGeometry args={[0.035, 0.03, 0.07, 8]} />
            <meshStandardMaterial color="#1E293B" roughness={0.4} />
          </mesh>
          {/* Desk plant */}
          <group position={[-0.12, 0.02, 0.5]}>
            <mesh position={[0, 0.04, 0]}>
              <cylinderGeometry args={[0.04, 0.03, 0.08, 8]} />
              <meshStandardMaterial color="#FFFFFF" roughness={0.3} />
            </mesh>
            {[0, 1.0, 2.0, 3.0, 4.0, 5.0].map((rot, ri) => (
              <mesh key={`dplant-${ri}`} position={[0, 0.1, 0]} rotation={[0.4, rot, 0]}>
                <planeGeometry args={[0.04, 0.14]} />
                <meshStandardMaterial color={ri % 2 === 0 ? '#15803D' : '#22C55E'} roughness={0.6} side={2} />
              </mesh>
            ))}
          </group>
        </group>
      </group>

      {/* Premium ergonomic mesh chairs with headrests for both PCs */}
      {[8.75, 10.75].map((cz, ci) => (
        <group key={`rchair-${ci}`} position={[labX - 1.2, 0, cz]} rotation={[0, Math.PI / 2, 0]}>
          <mesh position={[0, 0.05, 0]}>
            <cylinderGeometry args={[0.28, 0.28, 0.04, 5]} />
            <primitive object={blackMetalMaterial} />
          </mesh>
          <mesh position={[0, 0.24, 0]}>
            <cylinderGeometry args={[0.03, 0.03, 0.34, 8]} />
            <meshStandardMaterial color="#94A3B8" metalness={0.9} roughness={0.2} />
          </mesh>
          <mesh position={[0, 0.45, 0]} castShadow>
            <boxGeometry args={[0.52, 0.07, 0.5]} />
            <meshStandardMaterial color="#1A202C" roughness={0.8} />
          </mesh>
          <mesh position={[0, 0.80, -0.24]} rotation={[0.08, 0, 0]} castShadow>
            <boxGeometry args={[0.48, 0.58, 0.04]} />
            <meshStandardMaterial color="#1A202C" roughness={0.8} />
          </mesh>
          {/* Headrest */}
          <mesh position={[0, 1.14, -0.24]}>
            <boxGeometry args={[0.26, 0.14, 0.04]} />
            <meshStandardMaterial color="#1A202C" roughness={0.8} />
          </mesh>
          {[-0.28, 0.28].map((ax, ai) => (
            <mesh key={`carm-${ai}`} position={[ax, 0.64, -0.06]}>
              <boxGeometry args={[0.05, 0.26, 0.24]} />
              <primitive object={blackMetalMaterial} />
            </mesh>
          ))}
        </group>
      ))}

      {/* Flanking shelves for coding area (left) */}
      <group position={[labX - 0.6, 0, 7.8]}>
        {[0.2, 0.65, 1.1, 1.55, 2.0].map((sy, i) => (
          <mesh key={`cshelf-${i}`} position={[0, sy, 0]} castShadow>
            <boxGeometry args={[0.45, 0.03, 0.55]} />
            <primitive object={oakMaterial} />
          </mesh>
        ))}
        {[[-0.2, -0.24], [-0.2, 0.24], [0.2, -0.24], [0.2, 0.24]].map(([ux, uz], i) => (
          <mesh key={`cspost-${i}`} position={[ux, 1.1, uz]} castShadow>
            <boxGeometry args={[0.035, 2.2, 0.035]} />
            <primitive object={blackMetalMaterial} />
          </mesh>
        ))}
        {/* Items: PSU, oscilloscope, bins, robot car, A5X case */}
        <mesh position={[0, 0.32, 0]} castShadow>
          <boxGeometry args={[0.2, 0.14, 0.26]} />
          <meshStandardMaterial color="#334155" roughness={0.4} metalness={0.6} />
        </mesh>
        <mesh position={[0, 0.76, 0]} castShadow>
          <boxGeometry args={[0.2, 0.14, 0.24]} />
          <meshStandardMaterial color="#0F172A" roughness={0.4} />
        </mesh>
        {/* Top plant */}
        <group position={[0, 2.05, 0]}>
          <mesh position={[0, 0.05, 0]}>
            <cylinderGeometry args={[0.07, 0.05, 0.1, 10]} />
            <meshStandardMaterial color="#FFFFFF" roughness={0.3} />
          </mesh>
          {[0, 1.2, 2.4, 3.6, 4.8].map((rot, ri) => (
            <mesh key={`tsplant-${ri}`} position={[0, 0.12, 0]} rotation={[0.4, rot, 0]}>
              <planeGeometry args={[0.05, 0.16]} />
              <meshStandardMaterial color={ri % 2 === 0 ? '#15803D' : '#22C55E'} roughness={0.6} side={2} />
            </mesh>
          ))}
        </group>
      </group>

      {/* Flanking shelf for designing area (right) */}
      <group position={[labX - 0.6, 0, 11.6]}>
        {[0.2, 0.65, 1.1, 1.55, 2.0].map((sy, i) => (
          <mesh key={`deshelf-${i}`} position={[0, sy, 0]} castShadow>
            <boxGeometry args={[0.45, 0.03, 0.55]} />
            <primitive object={oakMaterial} />
          </mesh>
        ))}
        {[[-0.2, -0.24], [-0.2, 0.24], [0.2, -0.24], [0.2, 0.24]].map(([ux, uz], i) => (
          <mesh key={`dspost-${i}`} position={[ux, 1.1, uz]} castShadow>
            <boxGeometry args={[0.035, 2.2, 0.035]} />
            <primitive object={blackMetalMaterial} />
          </mesh>
        ))}
        {/* Books: Fusion 360, SolidWorks, AutoCAD */}
        {[-0.1, 0, 0.1].map((bz, i) => (
          <mesh key={`cbook-${i}`} position={[0, 0.32, bz]} castShadow>
            <boxGeometry args={[0.06, 0.2, 0.16]} />
            <meshStandardMaterial color={['#1E40AF', '#0F766E', '#7C3AED'][i]} roughness={0.6} />
          </mesh>
        ))}
        {/* Spools */}
        {['#EF4444', '#F59E0B', '#3B82F6', '#10B981'].map((c, i) => (
          <group key={`dspool-${i}`} position={[0, 0.74, -0.15 + i * 0.1]} rotation={[0, 0, Math.PI / 2]}>
            <mesh castShadow>
              <cylinderGeometry args={[0.05, 0.05, 0.05, 10]} />
              <meshStandardMaterial color={c} roughness={0.5} />
            </mesh>
          </group>
        ))}
        {/* Robot arm on middle shelf */}
        <group position={[0, 1.18, 0]}>
          <mesh castShadow>
            <cylinderGeometry args={[0.05, 0.06, 0.03, 8]} />
            <meshStandardMaterial color="#0F172A" roughness={0.3} metalness={0.7} />
          </mesh>
          <mesh position={[0, 0.08, 0]} rotation={[0.2, 0, 0]}>
            <boxGeometry args={[0.03, 0.1, 0.03]} />
            <meshStandardMaterial color="#F8FAFC" roughness={0.3} />
          </mesh>
        </group>
        {/* Top plant */}
        <group position={[0, 2.05, 0]}>
          <mesh position={[0, 0.05, 0]}>
            <cylinderGeometry args={[0.07, 0.05, 0.1, 10]} />
            <meshStandardMaterial color="#FFFFFF" roughness={0.3} />
          </mesh>
          {[0, 1.2, 2.4, 3.6, 4.8].map((rot, ri) => (
            <mesh key={`drplant-${ri}`} position={[0, 0.12, 0]} rotation={[0.4, rot, 0]}>
              <planeGeometry args={[0.05, 0.16]} />
              <meshStandardMaterial color={ri % 2 === 0 ? '#15803D' : '#22C55E'} roughness={0.6} side={2} />
            </mesh>
          ))}
        </group>
      </group>
    </group>
  );
}
