import React, { useMemo } from 'react';
import * as THREE from 'three';
import {
  getGammaCodeEditorTexture,
  getGammaCuttingMatTexture,
} from './gammaTextures';
import {
  getWoodGrainTexture,
  getPegboardTexture,
  getSolderingLcdTexture,
  getHandheldMultimeterTexture,
  getOscilloscopeTexture,
  getBenchPsuTexture,
} from '../Beta/betaTextures';

/**
 * Gamma Left Wall (West Wall, X = 32.0) — Revision 12
 * Layout:
 * - Connecting Door to Beta in the middle at Z = 4.5 to 7.5 (keeps 1.5m clear)
 * - Back Segment (Z = 0.5 to 4.2): CODING ZONE (2 coding PCs, monitors with code, headphones, plant shelf)
 * - Front Segment (Z = 7.8 to 11.5): SOLDERING & ASSEMBLY ARENA (4 stations, 4 articulated fume arms, pegboard)
 * - Upper wall: Glass window band with black mullions and city-night glow gradient
 */
export function GammaLeftWall() {
  const labX = 32.0;

  // Textures
  const codeTexture = useMemo(() => getGammaCodeEditorTexture(), []);
  const matTexture = useMemo(() => getGammaCuttingMatTexture(), []);
  const woodTexture = useMemo(() => getWoodGrainTexture(), []);
  const pegboardTexture = useMemo(() => getPegboardTexture(), []);
  const solderingLcdTexture = useMemo(() => getSolderingLcdTexture(), []);
  const flukeTexture = useMemo(() => getHandheldMultimeterTexture(), []);
  const scopeTexture = useMemo(() => getOscilloscopeTexture(), []);
  const psuTexture = useMemo(() => getBenchPsuTexture(), []);

  // Shared Materials
  const oakMaterial = useMemo(
    () => new THREE.MeshStandardMaterial({ map: woodTexture, roughness: 0.55, metalness: 0.05 }),
    [woodTexture]
  );
  const blackSteelMaterial = useMemo(
    () => new THREE.MeshStandardMaterial({ color: '#161C24', metalness: 0.85, roughness: 0.28 }),
    []
  );
  const brushedMetalMaterial = useMemo(
    () => new THREE.MeshStandardMaterial({ color: '#CBD5E1', metalness: 0.9, roughness: 0.2 }),
    []
  );
  const blueLedMaterial = useMemo(
    () => new THREE.MeshStandardMaterial({ color: '#1677FF', emissive: '#1677FF', emissiveIntensity: 3.5 }),
    []
  );
  const warmLedMaterial = useMemo(
    () => new THREE.MeshStandardMaterial({ color: '#FFF8EE', emissive: '#FFD580', emissiveIntensity: 2.5 }),
    []
  );
  const clearBinMaterial = useMemo(
    () => new THREE.MeshStandardMaterial({ color: '#F1F5F9', transparent: true, opacity: 0.45, roughness: 0.15 }),
    []
  );

  return (
    <group name="gamma-left-wall">
      {/* ================================================================
          1. WALL ARCHITECTURE & WINDOW BAND (Full height 3.6m)
         ================================================================ */}
      {/* Lower Wall Navy Overlay (Y: 0 to 2.4m) */}
      <mesh position={[labX + 0.02, 1.2, 6.0]} rotation={[0, Math.PI / 2, 0]} receiveShadow>
        <planeGeometry args={[11.8, 2.4]} />
        <meshStandardMaterial color="#071B3A" roughness={0.4} metalness={0.15} />
      </mesh>

      {/* Upper Glass Window Band with City-Night Gradient (Y: 2.4 to 3.4m) */}
      <mesh position={[labX + 0.03, 2.9, 6.0]} rotation={[0, Math.PI / 2, 0]}>
        <planeGeometry args={[11.8, 1.0]} />
        <meshStandardMaterial color="#0F172A" roughness={0.1} metalness={0.8} />
      </mesh>
      {/* Window mullions (vertical black frames) */}
      {[1.0, 2.5, 4.0, 8.0, 9.5, 11.0].map((mz, mi) => (
        <mesh key={`wmullion-${mi}`} position={[labX + 0.04, 2.9, mz]}>
          <boxGeometry args={[0.04, 1.0, 0.04]} />
          <primitive object={blackSteelMaterial} />
        </mesh>
      ))}

      {/* Fascia Trim at Ceiling (Y: 3.4 to 3.6m) with Blue LED underline */}
      <mesh position={[labX + 0.03, 3.5, 6.0]} rotation={[0, Math.PI / 2, 0]}>
        <planeGeometry args={[11.8, 0.2]} />
        <primitive object={blackSteelMaterial} />
      </mesh>
      <mesh position={[labX + 0.035, 3.4, 6.0]} rotation={[0, Math.PI / 2, 0]}>
        <boxGeometry args={[11.8, 0.025, 0.015]} />
        <primitive object={blueLedMaterial} />
      </mesh>

      {/* ================================================================
          2. BACK SEGMENT (Z = 0.5 to 4.2): CODING ZONE (2 Coding PCs)
         ================================================================ */}
      <group position={[labX + 0.55, 0, 2.35]}>
        {/* Light Oak Desk (3.4m long x 0.75m deep, Y=0.74m) */}
        <mesh position={[0, 0.73, 0]} castShadow receiveShadow>
          <boxGeometry args={[0.75, 0.045, 3.4]} />
          <primitive object={oakMaterial} />
        </mesh>

        {/* Steel Legs (Black A-frame) */}
        {[-1.55, 0, 1.55].map((lz, li) => (
          <group key={`c-leg-${li}`} position={[0, 0.36, lz]}>
            <mesh position={[0.28, 0, 0]} castShadow>
              <boxGeometry args={[0.05, 0.70, 0.05]} />
              <primitive object={blackSteelMaterial} />
            </mesh>
            <mesh position={[-0.28, 0, 0]} castShadow>
              <boxGeometry args={[0.05, 0.70, 0.05]} />
              <primitive object={blackSteelMaterial} />
            </mesh>
          </group>
        ))}

        {/* Two Coding Workstations (Z = -0.85 and Z = +0.85) */}
        {[-0.85, 0.85].map((wz, wi) => (
          <group key={`c-pc-${wi}`} position={[0, 0.76, wz]}>
            {/* Curved Ultrawide Monitor */}
            {/* Stand Base */}
            <mesh position={[-0.22, 0.01, 0]}>
              <cylinderGeometry args={[0.12, 0.14, 0.02, 12]} />
              <primitive object={blackSteelMaterial} />
            </mesh>
            {/* Stand Arm */}
            <mesh position={[-0.22, 0.22, 0]} rotation={[0, 0, 0.1]}>
              <boxGeometry args={[0.035, 0.42, 0.05]} />
              <primitive object={blackSteelMaterial} />
            </mesh>
            {/* 34" Monitor Bezel & Screen */}
            <mesh position={[-0.18, 0.32, 0]} rotation={[0, Math.PI / 2, 0]} castShadow>
              <boxGeometry args={[0.92, 0.42, 0.03]} />
              <primitive object={blackSteelMaterial} />
            </mesh>
            <mesh position={[-0.162, 0.32, 0]} rotation={[0, Math.PI / 2, 0]}>
              <planeGeometry args={[0.90, 0.40]} />
              <meshBasicMaterial map={codeTexture} toneMapped={false} />
            </mesh>

            {/* Blue ESD Work Mat */}
            <mesh position={[0.05, 0.002, 0]} rotation={[-Math.PI / 2, 0, 0]}>
              <planeGeometry args={[0.55, 0.85]} />
              <meshBasicMaterial map={matTexture} toneMapped={false} />
            </mesh>

            {/* Slim Backlit Keyboard & Mouse */}
            <mesh position={[0.06, 0.01, 0]} castShadow>
              <boxGeometry args={[0.14, 0.012, 0.44]} />
              <meshStandardMaterial color="#0F172A" roughness={0.3} />
            </mesh>
            <mesh position={[0.06, 0.01, 0.30]} castShadow>
              <boxGeometry args={[0.10, 0.02, 0.06]} />
              <meshStandardMaterial color="#1E293B" roughness={0.3} />
            </mesh>

            {/* Over-ear Headphones on Stand */}
            <group position={[-0.20, 0, -0.55]}>
              <mesh position={[0, 0.12, 0]}>
                <cylinderGeometry args={[0.01, 0.01, 0.24, 8]} />
                <primitive object={blackSteelMaterial} />
              </mesh>
              <mesh position={[0, 0.22, 0]}>
                <torusGeometry args={[0.07, 0.014, 8, 12, Math.PI]} />
                <primitive object={blackSteelMaterial} />
              </mesh>
              {/* Ear Cups */}
              <mesh position={[0, 0.16, -0.07]}>
                <cylinderGeometry args={[0.035, 0.035, 0.03, 10]} />
                <meshStandardMaterial color="#0284C7" />
              </mesh>
              <mesh position={[0, 0.16, 0.07]}>
                <cylinderGeometry args={[0.035, 0.035, 0.03, 10]} />
                <meshStandardMaterial color="#0284C7" />
              </mesh>
            </group>

            {/* Ergonomic Mesh Chair with Royal Blue Seat Cushion */}
            <group position={[0.65, -0.76, 0]} rotation={[0, -Math.PI / 2, 0]}>
              {/* Seat Cushion (Royal Blue) */}
              <mesh position={[0, 0.48, 0]} castShadow>
                <boxGeometry args={[0.48, 0.06, 0.46]} />
                <meshStandardMaterial color="#1D4ED8" roughness={0.5} />
              </mesh>
              {/* Mesh Backrest */}
              <mesh position={[0, 0.82, -0.21]} rotation={[-0.1, 0, 0]} castShadow>
                <boxGeometry args={[0.46, 0.58, 0.035]} />
                <primitive object={blackSteelMaterial} />
              </mesh>
              {/* Stem & Star Base */}
              <mesh position={[0, 0.24, 0]}>
                <cylinderGeometry args={[0.03, 0.03, 0.44, 8]} />
                <primitive object={blackSteelMaterial} />
              </mesh>
              <mesh position={[0, 0.05, 0]}>
                <cylinderGeometry args={[0.26, 0.26, 0.03, 5]} />
                <primitive object={blackSteelMaterial} />
              </mesh>
            </group>
          </group>
        ))}

        {/* Shelf Above Coding Desk (Y = 1.95m, with Warm LED & Trailing Plants) */}
        <mesh position={[-0.20, 1.95, 0]} castShadow>
          <boxGeometry args={[0.35, 0.035, 3.4]} />
          <primitive object={oakMaterial} />
        </mesh>
        <mesh position={[-0.20, 1.93, 0]}>
          <boxGeometry args={[0.32, 0.012, 3.3]} />
          <primitive object={warmLedMaterial} />
        </mesh>
        {/* Potted plants on shelf */}
        {[-1.2, -0.4, 0.4, 1.2].map((px, pi) => (
          <group key={`c-plant-${pi}`} position={[-0.20, 2.06, px]}>
            <mesh castShadow>
              <cylinderGeometry args={[0.07, 0.05, 0.12, 10]} />
              <meshStandardMaterial color="#F8FAFC" />
            </mesh>
            <mesh position={[0, 0.08, 0]}>
              <sphereGeometry args={[0.11, 8, 8]} />
              <meshStandardMaterial color={pi % 2 === 0 ? '#15803D' : '#16A34A'} roughness={0.6} />
            </mesh>
          </group>
        ))}
      </group>

      {/* ================================================================
          3. FRONT SEGMENT (Z = 7.8 to 11.5): SOLDERING & ASSEMBLY ARENA
          Features 4 Workstations, 4 Articulated Fume Arms, Pegboard, Tools
         ================================================================ */}
      <group position={[labX + 0.55, 0, 9.65]}>
        {/* Long Oak Workbench (3.6m long x 0.75m deep, Y=0.88m) */}
        <mesh position={[0, 0.86, 0]} castShadow receiveShadow>
          <boxGeometry args={[0.75, 0.045, 3.6]} />
          <primitive object={oakMaterial} />
        </mesh>

        {/* Steel Legs */}
        {[-1.65, -0.55, 0.55, 1.65].map((lz, li) => (
          <group key={`s-leg-${li}`} position={[0, 0.43, lz]}>
            <mesh position={[0.28, 0, 0]} castShadow>
              <boxGeometry args={[0.05, 0.84, 0.05]} />
              <primitive object={blackSteelMaterial} />
            </mesh>
            <mesh position={[-0.28, 0, 0]} castShadow>
              <boxGeometry args={[0.05, 0.84, 0.05]} />
              <primitive object={blackSteelMaterial} />
            </mesh>
          </group>
        ))}

        {/* Pegboard on Wall behind Bench (3.6m x 0.9m at Y=1.45m) */}
        <mesh position={[-0.51, 1.45, 0]} rotation={[0, Math.PI / 2, 0]} receiveShadow>
          <planeGeometry args={[3.6, 0.9]} />
          <meshStandardMaterial map={pegboardTexture} color="#2B323D" roughness={0.8} />
        </mesh>
        {/* Oak Frame around Pegboard */}
        <mesh position={[-0.50, 1.91, 0]}>
          <boxGeometry args={[0.03, 0.03, 3.64]} />
          <primitive object={oakMaterial} />
        </mesh>
        <mesh position={[-0.50, 0.99, 0]}>
          <boxGeometry args={[0.03, 0.03, 3.64]} />
          <primitive object={oakMaterial} />
        </mesh>

        {/* 4 Workstations along the Bench (Z offsets: -1.2, -0.4, 0.4, 1.2) */}
        {[-1.2, -0.4, 0.4, 1.2].map((sz, si) => (
          <group key={`station-${si}`} position={[0, 0.89, sz]}>
            {/* Blue ESD Silicone Mat */}
            <mesh position={[0.04, 0.002, 0]} rotation={[-Math.PI / 2, 0, 0]}>
              <planeGeometry args={[0.55, 0.72]} />
              <meshBasicMaterial map={matTexture} toneMapped={false} />
            </mesh>

            {/* Hakko Soldering Station */}
            <group position={[-0.22, 0.055, -0.22]}>
              <mesh castShadow>
                <boxGeometry args={[0.14, 0.10, 0.12]} />
                <meshStandardMaterial color="#0284C7" roughness={0.35} />
              </mesh>
              {/* LCD Screen with 350°C */}
              <mesh position={[0.071, 0.01, 0]} rotation={[0, Math.PI / 2, 0]}>
                <planeGeometry args={[0.08, 0.04]} />
                <meshBasicMaterial map={solderingLcdTexture} toneMapped={false} />
              </mesh>
              {/* Spring Iron Stand */}
              <mesh position={[0.02, 0.03, 0.12]} rotation={[0, 0, 0.35]}>
                <cylinderGeometry args={[0.018, 0.018, 0.12, 10]} />
                <primitive object={blackSteelMaterial} />
              </mesh>
            </group>

            {/* Yellow Fluke Multimeter */}
            <mesh position={[-0.22, 0.025, 0.22]} rotation={[-0.2, 0, 0]} castShadow>
              <boxGeometry args={[0.09, 0.035, 0.16]} />
              <meshBasicMaterial map={flukeTexture} toneMapped={false} />
            </mesh>

            {/* Helping Hands / Third Hand */}
            <group position={[-0.05, 0.04, -0.15]}>
              <mesh castShadow>
                <cylinderGeometry args={[0.04, 0.045, 0.02, 10]} />
                <primitive object={blackSteelMaterial} />
              </mesh>
              <mesh position={[0, 0.08, 0]}>
                <cylinderGeometry args={[0.008, 0.008, 0.14, 8]} />
                <primitive object={brushedMetalMaterial} />
              </mesh>
              {/* Magnifier lens */}
              <mesh position={[0, 0.16, 0]}>
                <torusGeometry args={[0.03, 0.005, 8, 12]} />
                <primitive object={blackSteelMaterial} />
              </mesh>
            </group>

            {/* ==============================================================
                ARTICULATED BLACK FUME EXTRACTOR ARM WITH EXTRACTION FUNNEL
                Curving down from upper wall/ceiling exactly as in Reference 2 Panel 7!
               ============================================================== */}
            <group position={[-0.45, 0.95, 0]}>
              {/* Wall Mount Base */}
              <mesh position={[0, 0, 0]}>
                <boxGeometry args={[0.06, 0.12, 0.12]} />
                <primitive object={blackSteelMaterial} />
              </mesh>
              {/* Upper Section */}
              <mesh position={[0.15, 0.12, 0]} rotation={[0, 0, -0.55]} castShadow>
                <cylinderGeometry args={[0.038, 0.038, 0.36, 12]} />
                <meshStandardMaterial color="#1E293B" roughness={0.8} />
              </mesh>
              {/* Middle Corrugated Joint */}
              <mesh position={[0.28, 0.02, 0]}>
                <sphereGeometry args={[0.05, 8, 8]} />
                <primitive object={blackSteelMaterial} />
              </mesh>
              {/* Lower Section curving towards workbench */}
              <mesh position={[0.36, -0.22, 0]} rotation={[0, 0, 0.35]} castShadow>
                <cylinderGeometry args={[0.036, 0.036, 0.44, 12]} />
                <meshStandardMaterial color="#1E293B" roughness={0.8} />
              </mesh>
              {/* Clear Conical Extraction Funnel */}
              <mesh position={[0.44, -0.44, 0]} rotation={[0, 0, -0.45]}>
                <cylinderGeometry args={[0.11, 0.038, 0.14, 14, 1, true]} />
                <meshStandardMaterial color="#94A3B8" transparent opacity={0.5} roughness={0.2} />
              </mesh>
            </group>

            {/* Workstation Chair */}
            <group position={[0.65, -0.89, 0]} rotation={[0, -Math.PI / 2, 0]}>
              <mesh position={[0, 0.52, 0]} castShadow>
                <boxGeometry args={[0.46, 0.06, 0.44]} />
                <meshStandardMaterial color="#1D4ED8" roughness={0.5} />
              </mesh>
              <mesh position={[0, 0.86, -0.20]} rotation={[-0.1, 0, 0]} castShadow>
                <boxGeometry args={[0.44, 0.54, 0.03]} />
                <primitive object={blackSteelMaterial} />
              </mesh>
              <mesh position={[0, 0.26, 0]}>
                <cylinderGeometry args={[0.03, 0.03, 0.48, 8]} />
                <primitive object={blackSteelMaterial} />
              </mesh>
              <mesh position={[0, 0.05, 0]}>
                <cylinderGeometry args={[0.26, 0.26, 0.03, 5]} />
                <primitive object={blackSteelMaterial} />
              </mesh>
            </group>
          </group>
        ))}

        {/* Stereo Inspection Microscope on Right End of Soldering Bench */}
        <group position={[0.05, 0.89, 1.55]}>
          {/* Heavy Cast Base */}
          <mesh position={[0, 0.015, 0]} castShadow>
            <boxGeometry args={[0.24, 0.03, 0.22]} />
            <primitive object={blackSteelMaterial} />
          </mesh>
          {/* Vertical Pillar */}
          <mesh position={[-0.08, 0.20, 0]}>
            <cylinderGeometry args={[0.018, 0.018, 0.38, 10]} />
            <primitive object={brushedMetalMaterial} />
          </mesh>
          {/* Microscope Head */}
          <mesh position={[0.02, 0.32, 0]} castShadow>
            <boxGeometry args={[0.16, 0.12, 0.12]} />
            <meshStandardMaterial color="#F8FAFC" roughness={0.2} />
          </mesh>
          {/* Binocular Eyepieces */}
          {[-0.03, 0.03].map((ez, ei) => (
            <mesh key={`scope-eye-${ei}`} position={[0.10, 0.40, ez]} rotation={[0, 0, -0.5]}>
              <cylinderGeometry args={[0.016, 0.018, 0.10, 8]} />
              <primitive object={blackSteelMaterial} />
            </mesh>
          ))}
          {/* Objective Lens with LED Ring */}
          <mesh position={[0.02, 0.22, 0]}>
            <cylinderGeometry args={[0.03, 0.025, 0.06, 12]} />
            <primitive object={blackSteelMaterial} />
          </mesh>
        </group>

        {/* 4 Translucent Storage Bins Under the Soldering Bench */}
        {[-1.2, -0.4, 0.4, 1.2].map((bz, bi) => (
          <group key={`s-bin-${bi}`} position={[0, 0.22, bz]}>
            <mesh castShadow>
              <boxGeometry args={[0.48, 0.24, 0.55]} />
              <primitive object={clearBinMaterial} />
            </mesh>
            <mesh position={[0, 0.125, 0]}>
              <boxGeometry args={[0.49, 0.02, 0.56]} />
              <primitive object={blackSteelMaterial} />
            </mesh>
          </group>
        ))}
      </group>
    </group>
  );
}
