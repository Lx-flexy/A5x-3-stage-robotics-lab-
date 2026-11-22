import React, { useMemo } from 'react';
import * as THREE from 'three';
import {
  getGammaCadMonitorTexture,
  getGammaVrScreenTexture,
  getGammaCuttingMatTexture,
  getGammaPrinterH2DTexture,
} from './gammaTextures';
import {
  getWoodGrainTexture,
  getBambuScreenTexture,
} from '../Beta/betaTextures';

/**
 * Gamma Right Wall (East Wall, X = 48.0) — Revision 16
 * Layout strictly adhering to GAMMA_ZONE_ALLOCATION:
 * 1. DESIGN & PRINT CORNER (adjacent pair <= 1.0m apart):
 *    - Back Segment: Z in [0.6, 4.2], X in [45.8, 47.6] (local x 13.8-15.6)
 *    - Order from corner (Z = 0.6):
 *      a) 3D Printing Bench (Z in [0.7, 2.2]): enclosed black printer + white A1 printer + spool rack + prototype shelf
 *      b) Designing PC Desk (Z in [2.35, 4.15]): 2 CAD PCs with 34" monitors, mesh chairs, overhead plant shelf
 *      c) Single shared sign pair on wall above them at Y = 2.65m
 * 2. MIDDLE SEGMENT: Glass partition door to Arena Bay at Z = 6.0m (clearance >= 1.5m)
 * 3. AR / VR ZONE: Front-Right Corner (Z in [8.0, 11.6]):
 *    - VR bench with 6 headsets on metal stands, wall VR screen, rug, beanbags (NO 3D printers!)
 */
export function GammaRightWall() {
  const wallX = 48.0;

  // Textures
  const cadTexture = useMemo(() => getGammaCadMonitorTexture(), []);
  const vrScreenTexture = useMemo(() => getGammaVrScreenTexture(), []);
  const matTexture = useMemo(() => getGammaCuttingMatTexture(), []);
  const woodTexture = useMemo(() => getWoodGrainTexture(), []);
  const h2dTexture = useMemo(() => getGammaPrinterH2DTexture(), []);
  const a1ScreenTexture = useMemo(() => getBambuScreenTexture(), []);

  // Shared Materials
  const oakMaterial = useMemo(
    () => new THREE.MeshStandardMaterial({ map: woodTexture, roughness: 0.55, metalness: 0.05 }),
    [woodTexture]
  );
  const blackSteelMaterial = useMemo(
    () => new THREE.MeshStandardMaterial({ color: '#161C24', metalness: 0.85, roughness: 0.28 }),
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
    () => new THREE.MeshStandardMaterial({ color: '#F1F5F9', transparent: true, opacity: 0.5, roughness: 0.15 }),
    []
  );

  return (
    <group name="gamma-right-wall">
      {/* ================================================================
          1. DOOR OPENING TO ARENA BAY (Z = 6.0m)
             Handled cleanly by <AutoDoor id="door-gamma-arena" /> with
             two-sided lintel signage and 1.5m clearance.
         ================================================================ */}

      {/* ================================================================
          2. DESIGN & PRINT CORNER (RIGHT WALL BACK SEGMENT, Z in [0.6, 4.2])
             Adjacent pair: 3D Printing Bench (Z 0.7-2.2) + Designing Desks (Z 2.35-4.15)
         ================================================================ */}
      {/* 2A. SHARED ZONE SIGN PAIR ABOVE BOTH UNITS (Mounted at X = 47.92, Y = 2.65m) */}
      <group position={[wallX - 0.06, 2.65, 2.45]} rotation={[0, -Math.PI / 2, 0]}>
        {/* Left Sign: 3D PRINTING ZONE */}
        <group position={[-1.0, 0, 0]}>
          <mesh>
            <boxGeometry args={[1.7, 0.38, 0.03]} />
            <meshStandardMaterial color="#071B3A" roughness={0.3} metalness={0.5} />
          </mesh>
          <mesh position={[0, -0.17, 0.018]}>
            <boxGeometry args={[1.65, 0.02, 0.015]} />
            <primitive object={blueLedMaterial} />
          </mesh>
          <mesh position={[0, 0, 0.02]}>
            <planeGeometry args={[1.6, 0.32]} />
            <meshBasicMaterial
              map={useMemo(() => {
                const canvas = document.createElement('canvas');
                canvas.width = 640; canvas.height = 120;
                const ctx = canvas.getContext('2d');
                ctx.fillStyle = '#FFFFFF';
                ctx.font = 'bold 38px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto';
                ctx.textAlign = 'center';
                ctx.fillText('⬡  3D Printing Zone', 320, 56);
                ctx.fillStyle = '#38BDF8';
                ctx.font = '500 20px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto';
                ctx.fillText('Bambu H2D & A1 • High-Temp', 320, 94);
                return new THREE.CanvasTexture(canvas);
              }, [])}
              transparent
              toneMapped={false}
            />
          </mesh>
        </group>

        {/* Right Sign: DESIGNING ZONE */}
        <group position={[1.0, 0, 0]}>
          <mesh>
            <boxGeometry args={[1.7, 0.38, 0.03]} />
            <meshStandardMaterial color="#071B3A" roughness={0.3} metalness={0.5} />
          </mesh>
          <mesh position={[0, -0.17, 0.018]}>
            <boxGeometry args={[1.65, 0.02, 0.015]} />
            <primitive object={blueLedMaterial} />
          </mesh>
          <mesh position={[0, 0, 0.02]}>
            <planeGeometry args={[1.6, 0.32]} />
            <meshBasicMaterial
              map={useMemo(() => {
                const canvas = document.createElement('canvas');
                canvas.width = 640; canvas.height = 120;
                const ctx = canvas.getContext('2d');
                ctx.fillStyle = '#FFFFFF';
                ctx.font = 'bold 38px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto';
                ctx.textAlign = 'center';
                ctx.fillText('📐  Designing Zone', 320, 56);
                ctx.fillStyle = '#38BDF8';
                ctx.font = '500 20px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto';
                ctx.fillText('3D CAD Modeling • Robotic Systems', 320, 94);
                return new THREE.CanvasTexture(canvas);
              }, [])}
              transparent
              toneMapped={false}
            />
          </mesh>
        </group>
      </group>

      {/* 2B. 3D PRINTING BENCH (Z in [0.7, 2.2], centered at Z = 1.45, X = 47.45) */}
      <group position={[wallX - 0.55, 0, 1.45]}>
        {/* Steel & Light-Oak Workbench (1.5m long along Z, 0.70m deep along X, Y = 0.88m) */}
        <mesh position={[0, 0.86, 0]} castShadow receiveShadow>
          <boxGeometry args={[0.70, 0.045, 1.50]} />
          <primitive object={oakMaterial} />
        </mesh>

        {/* Lower Oak Storage Shelf */}
        <mesh position={[0, 0.25, 0]} castShadow receiveShadow>
          <boxGeometry args={[0.66, 0.03, 1.46]} />
          <primitive object={oakMaterial} />
        </mesh>

        {/* Matte Black Steel Legs & Crossbars */}
        {[-0.68, 0.68].map((lz, li) => (
          <group key={`p-leg-${li}`} position={[0, 0.43, lz]}>
            <mesh position={[0.28, 0, 0]} castShadow>
              <boxGeometry args={[0.04, 0.84, 0.04]} />
              <primitive object={blackSteelMaterial} />
            </mesh>
            <mesh position={[-0.28, 0, 0]} castShadow>
              <boxGeometry args={[0.04, 0.84, 0.04]} />
              <primitive object={blackSteelMaterial} />
            </mesh>
          </group>
        ))}

        {/* Front Apron Panel with Blue Underglow LED & Discrete Label */}
        <mesh position={[-0.32, 0.43, 0]}>
          <boxGeometry args={[0.025, 0.82, 1.48]} />
          <meshStandardMaterial color="#071B3A" roughness={0.3} metalness={0.2} />
        </mesh>
        <mesh position={[-0.33, 0.03, 0]}>
          <boxGeometry args={[0.015, 0.02, 1.44]} />
          <primitive object={blueLedMaterial} />
        </mesh>

        {/* ========================================================
            ITEM 1: ENCLOSED BLACK PREMIUM PRINTER (Bambu X1 / H2D class)
            Positioned at Z = -0.38 on the bench
           ======================================================== */}
        <group position={[0, 0.89, -0.38]}>
          {/* Main Dark Aluminum Chassis */}
          <mesh position={[0, 0.25, 0]} castShadow>
            <boxGeometry args={[0.42, 0.50, 0.42]} />
            <meshStandardMaterial color="#0F172A" metalness={0.8} roughness={0.25} />
          </mesh>
          {/* Tinted Glass Door (facing -X into room) */}
          <mesh position={[-0.212, 0.24, 0]} rotation={[0, -Math.PI / 2, 0]}>
            <planeGeometry args={[0.34, 0.42]} />
            <meshStandardMaterial color="#94A3B8" transparent opacity={0.4} metalness={0.9} roughness={0.1} />
          </mesh>
          {/* Chamber Interior LED Glow */}
          <mesh position={[0, 0.45, 0]}>
            <boxGeometry args={[0.30, 0.015, 0.30]} />
            <meshStandardMaterial color="#38BDF8" emissive="#38BDF8" emissiveIntensity={2.5} />
          </mesh>
          {/* Internal Toolhead Gantry */}
          <mesh position={[0, 0.32, 0]}>
            <boxGeometry args={[0.32, 0.02, 0.02]} />
            <primitive object={blackSteelMaterial} />
          </mesh>
          <mesh position={[0, 0.30, 0]}>
            <boxGeometry args={[0.06, 0.06, 0.06]} />
            <meshStandardMaterial color="#E2E8F0" metalness={0.8} />
          </mesh>
          {/* Front Touchscreen UI */}
          <mesh position={[-0.215, 0.45, -0.12]} rotation={[0, -Math.PI / 2, 0]}>
            <planeGeometry args={[0.10, 0.06]} />
            <meshBasicMaterial map={h2dTexture} toneMapped={false} />
          </mesh>
        </group>

        {/* ========================================================
            ITEM 2: WHITE BAMBU A1-CLASS PRINTER + PRINTED VASE
            Positioned at Z = +0.35 on the bench
           ======================================================== */}
        <group position={[0, 0.89, 0.35]}>
          {/* White Bottom Base */}
          <mesh position={[0, 0.035, 0]} castShadow>
            <boxGeometry args={[0.36, 0.07, 0.36]} />
            <meshStandardMaterial color="#F8FAFC" roughness={0.25} />
          </mesh>
          {/* Black Print Bed */}
          <mesh position={[0, 0.075, 0]}>
            <boxGeometry args={[0.26, 0.01, 0.26]} />
            <meshStandardMaterial color="#1E293B" metalness={0.5} roughness={0.5} />
          </mesh>
          {/* Vertical Z-Gantry Portal */}
          <mesh position={[0.10, 0.22, 0]} castShadow>
            <boxGeometry args={[0.03, 0.36, 0.32]} />
            <meshStandardMaterial color="#F8FAFC" roughness={0.25} />
          </mesh>
          {/* Printed Spiral Vase Model on Bed */}
          <mesh position={[0, 0.15, 0]} castShadow>
            <cylinderGeometry args={[0.05, 0.035, 0.14, 16]} />
            <meshStandardMaterial color="#F97316" roughness={0.25} metalness={0.1} />
          </mesh>
          {/* Color Display Screen */}
          <mesh position={[-0.14, 0.05, 0.14]} rotation={[0, -Math.PI / 4, 0]}>
            <planeGeometry args={[0.06, 0.04]} />
            <meshBasicMaterial map={a1ScreenTexture} toneMapped={false} />
          </mesh>
        </group>

        {/* ========================================================
            ITEM 3: REAL SPOOL RACK (FLANGES + HUB + WOUND FILAMENT)
            Mounted on wall edge at Z = 0
           ======================================================== */}
        <group position={[0.25, 0.90, 0]}>
          {/* Metal Stand Rod */}
          <mesh position={[0, 0.12, 0]}>
            <cylinderGeometry args={[0.01, 0.01, 0.24, 8]} />
            <primitive object={blackSteelMaterial} />
          </mesh>
          {/* Horizontal Spool Rod */}
          <mesh position={[0, 0.20, 0]} rotation={[Math.PI / 2, 0, 0]}>
            <cylinderGeometry args={[0.008, 0.008, 0.35, 8]} />
            <primitive object={blackSteelMaterial} />
          </mesh>
          {/* 3 Spools: Flanges + Hub + Wound Filament (Red, Blue, Yellow) */}
          {[-0.10, 0, 0.10].map((sz, si) => {
            const colors = ['#EF4444', '#1677FF', '#FACC15'];
            return (
              <group key={`spool-${si}`} position={[0, 0.20, sz]} rotation={[Math.PI / 2, 0, 0]}>
                {/* Clear Flanges (Left & Right) */}
                <mesh position={[0, -0.025, 0]}>
                  <cylinderGeometry args={[0.08, 0.08, 0.004, 16]} />
                  <primitive object={clearBinMaterial} />
                </mesh>
                <mesh position={[0, 0.025, 0]}>
                  <cylinderGeometry args={[0.08, 0.08, 0.004, 16]} />
                  <primitive object={clearBinMaterial} />
                </mesh>
                {/* Center Hub */}
                <mesh>
                  <cylinderGeometry args={[0.025, 0.025, 0.048, 12]} />
                  <primitive object={blackSteelMaterial} />
                </mesh>
                {/* Wound Filament Cylinder */}
                <mesh>
                  <cylinderGeometry args={[0.072, 0.072, 0.045, 16]} />
                  <meshStandardMaterial color={colors[si]} roughness={0.4} />
                </mesh>
              </group>
            );
          })}
        </group>

        {/* ========================================================
            ITEM 4: PROTOTYPE SHELF MOUNTED 0.45M ABOVE BENCH ON WALL
            Y = 0.88 + 0.45 = 1.33m
           ======================================================== */}
        <group position={[0.20, 1.33, 0]}>
          <mesh castShadow receiveShadow>
            <boxGeometry args={[0.30, 0.03, 1.48]} />
            <primitive object={oakMaterial} />
          </mesh>
          {/* Warm LED Underglow */}
          <mesh position={[0, -0.016, 0]}>
            <boxGeometry args={[0.26, 0.01, 1.44]} />
            <primitive object={warmLedMaterial} />
          </mesh>
          {/* Displayed 3D Printed Mechanical Prototypes */}
          {[-0.45, -0.15, 0.15, 0.45].map((px, pi) => {
            const protoColors = ['#F8FAFC', '#F97316', '#38BDF8', '#FACC15'];
            return (
              <group key={`proto-${pi}`} position={[0, 0.06, px]}>
                <mesh castShadow>
                  {pi % 2 === 0 ? (
                    <cylinderGeometry args={[0.045, 0.045, 0.05, 12]} />
                  ) : (
                    <boxGeometry args={[0.07, 0.06, 0.07]} />
                  )}
                  <meshStandardMaterial color={protoColors[pi]} roughness={0.3} metalness={0.1} />
                </mesh>
              </group>
            );
          })}
        </group>

        {/* ========================================================
            ITEM 5: BINS AND TOOLS BELOW (LOWER SHELF)
           ======================================================== */}
        <group position={[0, 0.38, 0]}>
          {/* 2 Clear Labelled Bins */}
          {[-0.35, 0.15].map((bx, bi) => (
            <mesh key={`p-bin-${bi}`} position={[0, 0, bx]} castShadow>
              <boxGeometry args={[0.42, 0.22, 0.38]} />
              <primitive object={clearBinMaterial} />
            </mesh>
          ))}
          {/* IPA Wash Bottle & Scraper Tool */}
          <group position={[0, 0, 0.50]}>
            <mesh position={[-0.10, -0.02, 0]}>
              <cylinderGeometry args={[0.035, 0.035, 0.14, 10]} />
              <meshStandardMaterial color="#F8FAFC" roughness={0.4} />
            </mesh>
            <mesh position={[0.10, -0.08, 0]}>
              <boxGeometry args={[0.08, 0.015, 0.16]} />
              <meshStandardMaterial color="#0284C7" metalness={0.6} />
            </mesh>
          </group>
        </group>
      </group>

      {/* ================================================================
          2C. DESIGNING WORKSTATIONS (2 CAD PCs, Z in [2.35, 4.15], centered at Z = 3.25)
          Directly next to the 3D Printing Bench (<= 1.0m adjacent pair)
         ================================================================ */}
      <group position={[wallX - 0.55, 0, 3.25]}>
        {/* Light Oak Desk (1.8m long along Z, 0.70m deep along X, Y = 0.74m) */}
        <mesh position={[0, 0.73, 0]} castShadow receiveShadow>
          <boxGeometry args={[0.70, 0.045, 1.80]} />
          <primitive object={oakMaterial} />
        </mesh>

        {/* Black Steel A-Frame Legs (See-through underneath) */}
        {[-0.82, 0.82].map((lz, li) => (
          <group key={`d-leg-${li}`} position={[0, 0.36, lz]}>
            <mesh position={[0.26, 0, 0]} castShadow>
              <boxGeometry args={[0.04, 0.70, 0.04]} />
              <primitive object={blackSteelMaterial} />
            </mesh>
            <mesh position={[-0.26, 0, 0]} castShadow>
              <boxGeometry args={[0.04, 0.70, 0.04]} />
              <primitive object={blackSteelMaterial} />
            </mesh>
            {/* Bottom foot bar */}
            <mesh position={[0, -0.34, 0]}>
              <boxGeometry args={[0.56, 0.03, 0.04]} />
              <primitive object={blackSteelMaterial} />
            </mesh>
          </group>
        ))}

        {/* Two CAD Workstations (Z = -0.45 and Z = +0.45) */}
        {[-0.45, 0.45].map((wz, wi) => (
          <group key={`d-pc-${wi}`} position={[0, 0.76, wz]}>
            {/* Monitor Stand Base & Arm */}
            <mesh position={[0.22, 0.01, 0]}>
              <cylinderGeometry args={[0.10, 0.12, 0.02, 12]} />
              <primitive object={blackSteelMaterial} />
            </mesh>
            <mesh position={[0.22, 0.22, 0]} rotation={[0, 0, -0.1]}>
              <boxGeometry args={[0.035, 0.42, 0.05]} />
              <primitive object={blackSteelMaterial} />
            </mesh>
            {/* 34" Monitor with CAD Viewport */}
            <mesh position={[0.18, 0.32, 0]} rotation={[0, -Math.PI / 2, 0]} castShadow>
              <boxGeometry args={[0.78, 0.40, 0.03]} />
              <primitive object={blackSteelMaterial} />
            </mesh>
            <mesh position={[0.162, 0.32, 0]} rotation={[0, -Math.PI / 2, 0]}>
              <planeGeometry args={[0.76, 0.38]} />
              <meshBasicMaterial map={cadTexture} toneMapped={false} />
            </mesh>

            {/* Blue ESD Mat */}
            <mesh position={[-0.05, 0.002, 0]} rotation={[-Math.PI / 2, 0, 0]}>
              <planeGeometry args={[0.52, 0.72]} />
              <meshBasicMaterial map={matTexture} toneMapped={false} />
            </mesh>

            {/* Keyboard & Mouse */}
            <mesh position={[-0.06, 0.01, 0]} castShadow>
              <boxGeometry args={[0.12, 0.012, 0.38]} />
              <meshStandardMaterial color="#0F172A" roughness={0.3} />
            </mesh>
            <mesh position={[-0.06, 0.01, 0.24]} castShadow>
              <boxGeometry args={[0.09, 0.02, 0.05]} />
              <meshStandardMaterial color="#1E293B" roughness={0.3} />
            </mesh>

            {/* Ergonomic Mesh Chair with Royal Blue Cushion & Mesh Back */}
            <group position={[-0.60, -0.76, 0]} rotation={[0, Math.PI / 2, 0]}>
              {/* Blue Seat Cushion */}
              <mesh position={[0, 0.46, 0]} castShadow>
                <boxGeometry args={[0.44, 0.06, 0.42]} />
                <meshStandardMaterial color="#1D4ED8" roughness={0.5} />
              </mesh>
              {/* Curved Mesh Backrest */}
              <mesh position={[0, 0.76, -0.19]} rotation={[-0.1, 0, 0]} castShadow>
                <boxGeometry args={[0.42, 0.48, 0.03]} />
                <primitive object={blackSteelMaterial} />
              </mesh>
              {/* Slim Armrests */}
              {[-0.22, 0.22].map((ax, ai) => (
                <group key={`d-arm-${ai}`} position={[ax, 0.56, 0]}>
                  <mesh position={[0, 0, 0]}>
                    <boxGeometry args={[0.025, 0.16, 0.025]} />
                    <primitive object={blackSteelMaterial} />
                  </mesh>
                  <mesh position={[0, 0.08, 0]}>
                    <boxGeometry args={[0.04, 0.02, 0.18]} />
                    <meshStandardMaterial color="#0F172A" />
                  </mesh>
                </group>
              ))}
              {/* 5-Star Base & Gas Lift */}
              <mesh position={[0, 0.23, 0]}>
                <cylinderGeometry args={[0.025, 0.025, 0.42, 8]} />
                <primitive object={blackSteelMaterial} />
              </mesh>
              <mesh position={[0, 0.05, 0]}>
                <cylinderGeometry args={[0.24, 0.24, 0.03, 5]} />
                <primitive object={blackSteelMaterial} />
              </mesh>
            </group>
          </group>
        ))}

        {/* Overhead Shelf with Trailing Plants */}
        <mesh position={[0.20, 1.95, 0]} castShadow>
          <boxGeometry args={[0.30, 0.03, 1.76]} />
          <primitive object={oakMaterial} />
        </mesh>
        <mesh position={[0.20, 1.93, 0]}>
          <boxGeometry args={[0.28, 0.01, 1.72]} />
          <primitive object={warmLedMaterial} />
        </mesh>
        {[-0.55, 0.55].map((px, pi) => (
          <group key={`d-plant-${pi}`} position={[0.20, 2.06, px]}>
            <mesh castShadow>
              <cylinderGeometry args={[0.07, 0.05, 0.12, 10]} />
              <meshStandardMaterial color="#F8FAFC" />
            </mesh>
            <mesh position={[0, 0.08, 0]}>
              <sphereGeometry args={[0.11, 8, 8]} />
              <meshStandardMaterial color="#16A34A" roughness={0.6} />
            </mesh>
          </group>
        ))}
      </group>

      {/* ================================================================
          3. FRONT SEGMENT: AR / VR IMMERSIVE ZONE (Z in [8.0, 11.6], center Z = 9.8m)
          Corner only. Features: VR display bench, 6 VR headsets on stands,
          wall VR screen, circular rug, beanbags, corner blue frame.
          NO PRINTER OR OTHER EQUIPMENT ON THIS BENCH!
         ================================================================ */}
      <group position={[wallX - 0.04, 0, 9.8]}>
        {/* Navy Corner Background Panel with Blue LED Frame */}
        <mesh position={[-0.01, 1.8, 0]} rotation={[0, -Math.PI / 2, 0]} receiveShadow>
          <planeGeometry args={[3.6, 3.6]} />
          <meshStandardMaterial color="#071B3A" roughness={0.35} metalness={0.2} />
        </mesh>

        {/* Glowing Blue LED Frame around VR Zone */}
        <mesh position={[-0.02, 3.45, 0]} rotation={[0, -Math.PI / 2, 0]}>
          <boxGeometry args={[3.6, 0.03, 0.02]} />
          <primitive object={blueLedMaterial} />
        </mesh>
        {[-1.78, 1.78].map((vz, vi) => (
          <mesh key={`vr-led-${vi}`} position={[-0.02, 1.8, vz]}>
            <boxGeometry args={[0.02, 3.3, 0.03]} />
            <primitive object={blueLedMaterial} />
          </mesh>
        ))}

        {/* Wall VR Sign: "AR / VR ZONE" */}
        <group position={[-0.03, 2.95, 0]} rotation={[0, -Math.PI / 2, 0]}>
          <mesh position={[0, 0, 0]}>
            <boxGeometry args={[2.2, 0.38, 0.03]} />
            <meshStandardMaterial color="#071B3A" roughness={0.3} metalness={0.5} />
          </mesh>
          <mesh position={[0, -0.17, 0.018]}>
            <boxGeometry args={[2.1, 0.02, 0.015]} />
            <primitive object={blueLedMaterial} />
          </mesh>
          <mesh position={[0, 0, 0.02]}>
            <planeGeometry args={[2.1, 0.32]} />
            <meshBasicMaterial
              map={useMemo(() => {
                const canvas = document.createElement('canvas');
                canvas.width = 840; canvas.height = 120;
                const ctx = canvas.getContext('2d');
                ctx.fillStyle = '#FFFFFF';
                ctx.font = 'bold 38px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto';
                ctx.textAlign = 'center';
                ctx.fillText('👓  AR / VR Zone', 420, 56);
                ctx.fillStyle = '#38BDF8';
                ctx.font = '500 20px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto';
                ctx.fillText('Spatial Computing • XR Proving Ground', 420, 94);
                return new THREE.CanvasTexture(canvas);
              }, [])}
              transparent
              toneMapped={false}
            />
          </mesh>
        </group>

        {/* Large Wall-Mounted VR Screen (Alpine Landscape, 2.4 x 1.35m) */}
        <group position={[-0.03, 1.95, 0]} rotation={[0, -Math.PI / 2, 0]}>
          <mesh castShadow>
            <boxGeometry args={[2.44, 1.39, 0.03]} />
            <primitive object={blackSteelMaterial} />
          </mesh>
          <mesh position={[0, 0, 0.02]}>
            <planeGeometry args={[2.4, 1.35]} />
            <meshBasicMaterial map={vrScreenTexture} toneMapped={false} />
          </mesh>
        </group>

        {/* VR Display Bench (3.0m long x 0.55m deep, Y = 0.74m) - ONLY Headsets & Controllers */}
        <group position={[-0.60, 0, 0]}>
          <mesh position={[0, 0.72, 0]} castShadow receiveShadow>
            <boxGeometry args={[0.55, 0.045, 3.0]} />
            <primitive object={oakMaterial} />
          </mesh>
          {/* Steel Frame */}
          {[-1.4, 0, 1.4].map((bz, bi) => (
            <mesh key={`vr-b-leg-${bi}`} position={[0, 0.35, bz]} castShadow>
              <boxGeometry args={[0.45, 0.70, 0.05]} />
              <primitive object={blackSteelMaterial} />
            </mesh>
          ))}

          {/* 6 VR Headsets on Sleek Metal Stands (NO PRINTERS) */}
          {[-1.15, -0.70, -0.25, 0.25, 0.70, 1.15].map((hz, hi) => (
            <group key={`vr-unit-${hi}`} position={[0, 0.75, hz]}>
              {/* Metal Headset Stand */}
              <mesh position={[0, 0.10, 0]}>
                <cylinderGeometry args={[0.012, 0.012, 0.20, 8]} />
                <primitive object={blackSteelMaterial} />
              </mesh>
              <mesh position={[0, 0.005, 0]}>
                <cylinderGeometry args={[0.08, 0.08, 0.01, 12]} />
                <primitive object={blackSteelMaterial} />
              </mesh>

              {/* White VR Headset Visor */}
              <group position={[0, 0.20, 0]} rotation={[0, -Math.PI / 2, 0]}>
                <mesh castShadow>
                  <boxGeometry args={[0.20, 0.10, 0.12]} />
                  <meshStandardMaterial color="#F8FAFC" roughness={0.25} />
                </mesh>
                {/* Front glossy black tracking visor */}
                <mesh position={[0, 0, 0.062]}>
                  <boxGeometry args={[0.18, 0.08, 0.01]} />
                  <meshStandardMaterial color="#0A0F1D" metalness={0.9} roughness={0.1} />
                </mesh>
                {/* Blue Power LED Dot */}
                <mesh position={[0.07, 0.02, 0.068]}>
                  <circleGeometry args={[0.004, 8]} />
                  <primitive object={blueLedMaterial} />
                </mesh>
                {/* Headband Ring */}
                <mesh position={[0, 0, -0.06]} rotation={[Math.PI / 2, 0, 0]}>
                  <torusGeometry args={[0.09, 0.014, 8, 16]} />
                  <meshStandardMaterial color="#334155" roughness={0.5} />
                </mesh>
              </group>
            </group>
          ))}
        </group>

        {/* Circular Immersive VR Floor Rug */}
        <mesh position={[-1.75, 0.004, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <circleGeometry args={[1.3, 32]} />
          <meshStandardMaterial color="#1E293B" roughness={0.8} />
        </mesh>
        <mesh position={[-1.75, 0.005, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <ringGeometry args={[1.25, 1.28, 32]} />
          <primitive object={blueLedMaterial} />
        </mesh>

        {/* 3 Royal Blue Beanbags around the Rug */}
        {[
          { x: -1.75, z: -0.9, color: '#1D4ED8' },
          { x: -2.35, z: 0.1, color: '#2563EB' },
          { x: -1.65, z: 0.9, color: '#1E40AF' },
        ].map((bb, bi) => (
          <group key={`beanbag-${bi}`} position={[bb.x, 0.22, bb.z]}>
            <mesh castShadow>
              <sphereGeometry args={[0.38, 12, 10]} />
              <meshStandardMaterial color={bb.color} roughness={0.7} />
            </mesh>
          </group>
        ))}
      </group>
    </group>
  );
}
