import React, { useMemo } from 'react';
import * as THREE from 'three';
import {
  getAlphaWallSignTexture,
  getPegboardTexture,
  getSolderingLcdTexture,
  getBinLabelTexture,
  getDrawerCabinetTexture,
  getWoodGrainTexture
} from './alphaTextures';

/**
 * Lab Alpha Left Wall: Workshop-Grade Soldering & Assembly Arena + Electronics Zone (Revision 6)
 * Fixes:
 * - Pegboard: Charcoal #2B323D panel with 25mm round hole grid, light-oak frame, soft bounce light (never black).
 * - Tools: Real recognizable silhouettes with thin black L-hooks touching board, shadow-board outlines.
 * - Soldering Bench: Real stations with "350°C" LCD, iron in coiled stand, brass wool cleaner, helping-hands with PCB, multimeter, fume arms.
 * - Electronics Shelf: Clear bins showing real components inside with labels, drawer cabinet with pulled-out drawers, bench power supply, realistic potted plant.
 * - Signs: Auto-fit text, shortened "SOLDERING & ASSEMBLY", MeshBasicMaterial toneMapped=false.
 */
export function AlphaLeftWall() {
  const signSoldering = useMemo(
    () => getAlphaWallSignTexture('SOLDERING & ASSEMBLY', 'Soldering · Rework · Prototyping'),
    []
  );
  const signElectronics = useMemo(
    () => getAlphaWallSignTexture('ELECTRONICS ZONE', 'Sensors · Microcontrollers · Components'),
    []
  );

  const pegboardTexture = useMemo(() => getPegboardTexture(), []);
  const solderingLcdTexture = useMemo(() => getSolderingLcdTexture(), []);
  const drawerCabinetTexture = useMemo(() => getDrawerCabinetTexture(), []);
  const woodGrainTexture = useMemo(() => getWoodGrainTexture(), []);

  // Shared high-performance materials
  const oakMaterial = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        map: woodGrainTexture,
        roughness: 0.6,
        metalness: 0.05
      }),
    [woodGrainTexture]
  );

  const blackMetalMaterial = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: '#151C26',
        metalness: 0.85,
        roughness: 0.25
      }),
    []
  );

  const chromeMaterial = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: '#E2E8F0',
        metalness: 0.95,
        roughness: 0.15
      }),
    []
  );

  const clearBinMaterial = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: '#F1F5F9',
        transparent: true,
        opacity: 0.28,
        roughness: 0.1,
        metalness: 0.05,
        depthWrite: false
      }),
    []
  );

  return (
    <group name="alpha-left-wall">
      {/* =========================================================================
          0. DEDICATED SOFT BOUNCE / FILL LIGHTS (Ensures no surface is pitch black)
         ========================================================================= */}
      <pointLight position={[1.8, 2.3, 4.2]} intensity={0.9} color="#FFF8EE" distance={8} decay={1.5} />
      <pointLight position={[1.8, 2.3, 9.7]} intensity={0.8} color="#FFF8EE" distance={8} decay={1.5} />

      {/* West Wall Perimeter Panel */}
      <mesh position={[0.11, 1.8, 6.0]} rotation={[0, Math.PI / 2, 0]} receiveShadow>
        <planeGeometry args={[11.8, 3.6]} />
        <meshStandardMaterial color="#E2E8F0" roughness={0.7} />
      </mesh>

      {/* =========================================================================
          1. PEGBOARD TOOL WALL (4.2m x 1.3m, mounted at Y = 1.9m, Z = 4.2m)
         ========================================================================= */}
      <group position={[0.13, 1.9, 4.2]} rotation={[0, Math.PI / 2, 0]}>
        {/* Charcoal Pegboard Panel with 25mm Hole Grid & Shadow-Board Outlines */}
        <mesh receiveShadow>
          <planeGeometry args={[4.2, 1.3]} />
          <meshStandardMaterial
            map={pegboardTexture}
            roughness={0.8}
            metalness={0.05}
          />
        </mesh>

        {/* Thin Light-Oak Outer Frame */}
        {/* Top rail */}
        <mesh position={[0, 0.66, 0.015]}>
          <boxGeometry args={[4.24, 0.03, 0.03]} />
          <primitive object={oakMaterial} />
        </mesh>
        {/* Bottom rail */}
        <mesh position={[0, -0.66, 0.015]}>
          <boxGeometry args={[4.24, 0.03, 0.03]} />
          <primitive object={oakMaterial} />
        </mesh>
        {/* Left stile */}
        <mesh position={[-2.12, 0, 0.015]}>
          <boxGeometry args={[0.03, 1.32, 0.03]} />
          <primitive object={oakMaterial} />
        </mesh>
        {/* Right stile */}
        <mesh position={[2.12, 0, 0.015]}>
          <boxGeometry args={[0.03, 1.32, 0.03]} />
          <primitive object={oakMaterial} />
        </mesh>

        {/* Shelf Ledge Below the Board with Labelled Small Parts Bins */}
        <group position={[0, -0.68, 0.07]}>
          {/* Oak ledge shelf */}
          <mesh position={[0, 0, 0]} castShadow receiveShadow>
            <boxGeometry args={[4.2, 0.03, 0.14]} />
            <primitive object={oakMaterial} />
          </mesh>
          {/* Subtle Electric-Blue LED Underline under lip */}
          <mesh position={[0, -0.018, 0.065]}>
            <boxGeometry args={[4.16, 0.015, 0.01]} />
            <meshStandardMaterial color="#1677FF" emissive="#1677FF" emissiveIntensity={3.5} />
          </mesh>

          {/* 6 Labelled Small Parts Organizers on Ledge (Screws, Heat-Shrink, Zip-Ties) */}
          {[-1.6, -0.96, -0.32, 0.32, 0.96, 1.6].map((bx, bIdx) => (
            <group key={`ledge-bin-${bIdx}`} position={[bx, 0.04, 0.01]}>
              <mesh castShadow>
                <boxGeometry args={[0.22, 0.05, 0.1]} />
                <meshStandardMaterial color={bIdx % 2 === 0 ? '#1E293B' : '#0284C7'} roughness={0.3} />
              </mesh>
              {/* White Label */}
              <mesh position={[0, 0, 0.052]}>
                <planeGeometry args={[0.16, 0.03]} />
                <meshBasicMaterial color="#FFFFFF" toneMapped={false} />
              </mesh>
            </group>
          ))}
        </group>

        {/* =========================================================================
            2. RECOGNIZABLE HANGING TOOLS ON METAL L-HOOKS
           ========================================================================= */}
        {/* -------------------------------------------------------------
            ROW 1: PLIERS & CUTTERS (Y = +0.35, Length ~16 cm, 10 tools)
           ------------------------------------------------------------- */}
        {[-1.8, -1.4, -1.0, -0.6, -0.2, 0.2, 0.6, 1.0, 1.4, 1.8].map((tx, pIdx) => {
          const gripColor = pIdx % 3 === 0 ? '#EF4444' : pIdx % 3 === 1 ? '#3B82F6' : '#F59E0B';
          const isNeedle = pIdx % 2 === 0;

          return (
            <group key={`plier-${pIdx}`} position={[tx, 0.35, 0.03]}>
              {/* Thin Black L-Hook Touching Pegboard */}
              <mesh position={[0, 0.07, -0.015]}>
                <boxGeometry args={[0.008, 0.008, 0.03]} />
                <primitive object={blackMetalMaterial} />
              </mesh>
              <mesh position={[0, 0.08, 0.002]}>
                <boxGeometry args={[0.008, 0.03, 0.008]} />
                <primitive object={blackMetalMaterial} />
              </mesh>

              {/* Central Pivot Joint Disc */}
              <mesh position={[0, 0.02, 0]} castShadow>
                <cylinderGeometry args={[0.016, 0.016, 0.012, 12]} rotation={[Math.PI / 2, 0, 0]} />
                <primitive object={chromeMaterial} />
              </mesh>

              {/* Steel Jaws (Needle-nose vs Side Cutter) */}
              <mesh position={[0, isNeedle ? 0.07 : 0.05, 0]} castShadow>
                <boxGeometry args={[isNeedle ? 0.014 : 0.024, isNeedle ? 0.08 : 0.05, 0.01]} />
                <primitive object={chromeMaterial} />
              </mesh>

              {/* Left Ergonomic Rubber Grip Handle */}
              <mesh position={[-0.025, -0.055, 0]} rotation={[0, 0, -0.16]} castShadow>
                <cylinderGeometry args={[0.01, 0.008, 0.12, 10]} />
                <meshStandardMaterial color={gripColor} roughness={0.4} />
              </mesh>
              {/* Right Ergonomic Rubber Grip Handle */}
              <mesh position={[0.025, -0.055, 0]} rotation={[0, 0, 0.16]} castShadow>
                <cylinderGeometry args={[0.01, 0.008, 0.12, 10]} />
                <meshStandardMaterial color={gripColor} roughness={0.4} />
              </mesh>
            </group>
          );
        })}

        {/* -------------------------------------------------------------
            ROW 2: SCREWDRIVERS (Y = -0.05, Length ~20 cm, 10 tools)
           ------------------------------------------------------------- */}
        {[-1.8, -1.4, -1.0, -0.6, -0.2, 0.2, 0.6, 1.0, 1.4, 1.8].map((tx, sIdx) => {
          const handleColor = sIdx % 4 === 0 ? '#EF4444' : sIdx % 4 === 1 ? '#F59E0B' : sIdx % 4 === 2 ? '#10B981' : '#3B82F6';
          const shaftLength = 0.12 + (sIdx % 3) * 0.02;

          return (
            <group key={`screwdriver-${sIdx}`} position={[tx, -0.05, 0.03]}>
              {/* Twin-Prong Tool Hook */}
              <mesh position={[0, 0.065, -0.015]}>
                <boxGeometry args={[0.025, 0.008, 0.03]} />
                <primitive object={blackMetalMaterial} />
              </mesh>

              {/* Fluted Ergonomic Handle with Top Ring */}
              <mesh position={[0, 0.06, 0]} castShadow>
                <cylinderGeometry args={[0.016, 0.014, 0.08, 6]} />
                <meshStandardMaterial color={handleColor} roughness={0.35} />
              </mesh>
              {/* Black Rubber Grip Inlay Bands */}
              <mesh position={[0, 0.06, 0]}>
                <cylinderGeometry args={[0.0165, 0.0145, 0.025, 6]} />
                <primitive object={blackMetalMaterial} />
              </mesh>

              {/* Chrome Vanadium Steel Shaft */}
              <mesh position={[0, -shaftLength / 2 + 0.02, 0]} castShadow>
                <cylinderGeometry args={[0.004, 0.004, shaftLength, 8]} />
                <primitive object={chromeMaterial} />
              </mesh>

              {/* Screwdriver Tip (Flat / Phillips) */}
              <mesh position={[0, -shaftLength + 0.015, 0]}>
                <boxGeometry args={[sIdx % 2 === 0 ? 0.008 : 0.005, 0.012, 0.002]} />
                <primitive object={blackMetalMaterial} />
              </mesh>
            </group>
          );
        })}

        {/* -------------------------------------------------------------
            ROW 3: SPECIALTY TOOLS & HANGING ITEMS (Y = -0.42)
           ------------------------------------------------------------- */}
        {/* 1. Automatic Wire Strippers */}
        <group position={[-1.75, -0.42, 0.03]}>
          <mesh position={[0, 0.04, -0.015]}>
            <boxGeometry args={[0.01, 0.01, 0.03]} />
            <primitive object={blackMetalMaterial} />
          </mesh>
          <mesh position={[0, 0.02, 0]} castShadow>
            <boxGeometry args={[0.05, 0.06, 0.015]} />
            <primitive object={chromeMaterial} />
          </mesh>
          <mesh position={[-0.02, -0.06, 0]} rotation={[0, 0, -0.15]} castShadow>
            <cylinderGeometry args={[0.01, 0.009, 0.11, 8]} />
            <meshStandardMaterial color="#0284C7" roughness={0.4} />
          </mesh>
          <mesh position={[0.02, -0.06, 0]} rotation={[0, 0, 0.15]} castShadow>
            <cylinderGeometry args={[0.01, 0.009, 0.11, 8]} />
            <meshStandardMaterial color="#0284C7" roughness={0.4} />
          </mesh>
        </group>

        {/* 2. Precision Tweezers Set (3 Tweezers in Hanging Bracket) */}
        <group position={[-1.25, -0.42, 0.03]}>
          {/* Wire Bracket */}
          <mesh position={[0, 0.04, -0.01]}>
            <boxGeometry args={[0.09, 0.01, 0.02]} />
            <primitive object={blackMetalMaterial} />
          </mesh>
          {[-0.03, 0, 0.03].map((twx, twi) => (
            <mesh key={`tweezer-${twi}`} position={[twx, -0.03, 0]} rotation={[0, 0, (twi - 1) * 0.05]} castShadow>
              <boxGeometry args={[0.008, 0.12, 0.004]} />
              <meshStandardMaterial color="#0F172A" roughness={0.3} metalness={0.8} />
            </mesh>
          ))}
        </group>

        {/* 3. Hobby Craft Knife (Aluminum Handle + Sharp #11 Blade) */}
        <group position={[-0.75, -0.42, 0.03]}>
          <mesh position={[0, 0.05, -0.015]}>
            <boxGeometry args={[0.01, 0.01, 0.03]} />
            <primitive object={blackMetalMaterial} />
          </mesh>
          <mesh position={[0, -0.02, 0]} castShadow>
            <cylinderGeometry args={[0.006, 0.006, 0.13, 10]} />
            <primitive object={chromeMaterial} />
          </mesh>
          <mesh position={[0, 0.055, 0]}>
            <boxGeometry args={[0.006, 0.022, 0.002]} />
            <primitive object={chromeMaterial} />
          </mesh>
        </group>

        {/* 4. Small Workshop Hammer */}
        <group position={[-0.25, -0.42, 0.03]}>
          <mesh position={[0, 0.04, -0.015]}>
            <boxGeometry args={[0.01, 0.01, 0.03]} />
            <primitive object={blackMetalMaterial} />
          </mesh>
          {/* Steel Head */}
          <mesh position={[0, 0.03, 0]} castShadow>
            <boxGeometry args={[0.08, 0.025, 0.025]} />
            <primitive object={chromeMaterial} />
          </mesh>
          {/* Hardwood Handle */}
          <mesh position={[0, -0.07, 0]} castShadow>
            <cylinderGeometry args={[0.008, 0.009, 0.16, 8]} />
            <primitive object={oakMaterial} />
          </mesh>
        </group>

        {/* 5. Folding Hex-Key (Allen Key) Caddy */}
        <group position={[0.25, -0.42, 0.03]}>
          <mesh position={[0, 0.04, -0.015]}>
            <boxGeometry args={[0.01, 0.01, 0.03]} />
            <primitive object={blackMetalMaterial} />
          </mesh>
          <mesh position={[0, -0.02, 0]} castShadow>
            <boxGeometry args={[0.028, 0.09, 0.02]} />
            <meshStandardMaterial color="#DC2626" roughness={0.4} />
          </mesh>
          {/* Steel key tips */}
          <mesh position={[0, -0.07, 0]}>
            <cylinderGeometry args={[0.006, 0.006, 0.03, 6]} />
            <primitive object={blackMetalMaterial} />
          </mesh>
        </group>

        {/* 6. Hanging Solder Wire Reel */}
        <group position={[0.75, -0.42, 0.03]} rotation={[0, 0, Math.PI / 2]}>
          <mesh position={[0, 0, -0.02]}>
            <boxGeometry args={[0.01, 0.01, 0.04]} />
            <primitive object={blackMetalMaterial} />
          </mesh>
          <mesh castShadow>
            <cylinderGeometry args={[0.045, 0.045, 0.035, 16]} />
            <meshStandardMaterial color="#0284C7" roughness={0.3} />
          </mesh>
          {/* Solder Wire Coil */}
          <mesh>
            <cylinderGeometry args={[0.046, 0.046, 0.022, 16]} />
            <primitive object={chromeMaterial} />
          </mesh>
        </group>

        {/* 7. Heat-Shrink Tubing Roll */}
        <group position={[1.25, -0.42, 0.03]}>
          <mesh position={[0, 0.04, -0.015]}>
            <boxGeometry args={[0.01, 0.01, 0.03]} />
            <primitive object={blackMetalMaterial} />
          </mesh>
          <mesh castShadow>
            <cylinderGeometry args={[0.045, 0.045, 0.025, 16]} rotation={[Math.PI / 2, 0, 0]} />
            <meshStandardMaterial color="#0F172A" roughness={0.7} />
          </mesh>
        </group>

        {/* 8. Compact Tape Measure */}
        <group position={[1.75, -0.42, 0.03]}>
          <mesh position={[0, 0.04, -0.015]}>
            <boxGeometry args={[0.01, 0.01, 0.03]} />
            <primitive object={blackMetalMaterial} />
          </mesh>
          <mesh castShadow>
            <boxGeometry args={[0.06, 0.06, 0.03]} />
            <meshStandardMaterial color="#FBBF24" roughness={0.3} />
          </mesh>
          <mesh position={[0.025, 0, 0]}>
            <boxGeometry args={[0.015, 0.05, 0.031]} />
            <primitive object={blackMetalMaterial} />
          </mesh>
        </group>
      </group>

      {/* Wall Sign: "SOLDERING & ASSEMBLY" (Shortened, Auto-Fit, toneMapped=false) */}
      <mesh position={[0.14, 2.9, 4.2]} rotation={[0, Math.PI / 2, 0]}>
        <planeGeometry args={[2.2, 0.55]} />
        <meshBasicMaterial map={signSoldering} toneMapped={false} />
      </mesh>

      {/* =========================================================================
          3. SOLDERING WORKBENCH (Length: 4.2m, Depth: 0.75m, Height: 0.85m)
         ========================================================================= */}
      <group position={[0.55, 0, 4.2]}>
        {/* Light-Oak Table Top with Wood Grain */}
        <mesh position={[0, 0.85, 0]} castShadow receiveShadow>
          <boxGeometry args={[0.75, 0.05, 4.2]} />
          <primitive object={oakMaterial} />
        </mesh>

        {/* Under-Bench Cable Tray & Lower Oak Storage Shelf */}
        <mesh position={[0, 0.16, 0]} receiveShadow>
          <boxGeometry args={[0.68, 0.03, 4.0]} />
          <primitive object={oakMaterial} />
        </mesh>
        {/* Cable Tray */}
        <mesh position={[-0.28, 0.78, 0]}>
          <boxGeometry args={[0.08, 0.06, 4.0]} />
          <primitive object={blackMetalMaterial} />
        </mesh>

        {/* Matte Black Steel Upright Legs & Crossbars */}
        {[-1.95, -0.65, 0.65, 1.95].map((lz, idx) => (
          <group key={`bench-leg-${idx}`} position={[0, 0.42, lz]}>
            {/* Front Leg */}
            <mesh position={[0.33, 0, 0]} castShadow>
              <boxGeometry args={[0.04, 0.84, 0.04]} />
              <primitive object={blackMetalMaterial} />
            </mesh>
            {/* Back Leg */}
            <mesh position={[-0.33, 0, 0]} castShadow>
              <boxGeometry args={[0.04, 0.84, 0.04]} />
              <primitive object={blackMetalMaterial} />
            </mesh>
            {/* Crossbar */}
            <mesh position={[0, 0.38, 0]}>
              <boxGeometry args={[0.66, 0.04, 0.04]} />
              <primitive object={blackMetalMaterial} />
            </mesh>
          </group>
        ))}

        {/* -------------------------------------------------------------
            4 WORKSHOP-GRADE SOLDERING STATIONS (Evenly spaced at 1.0m intervals)
           ------------------------------------------------------------- */}
        {[-1.5, -0.5, 0.5, 1.5].map((posZ, sIdx) => (
          <group key={`station-${sIdx}`} position={[0.06, 0.875, posZ]}>
            {/* Dark Charcoal Base Unit */}
            <mesh position={[0, 0.06, 0]} castShadow>
              <boxGeometry args={[0.22, 0.11, 0.18]} />
              <meshStandardMaterial color="#1E242C" roughness={0.35} metalness={0.7} />
            </mesh>
            {/* Crisp Digital LCD Display Showing "350°C" */}
            <mesh position={[0.112, 0.075, 0]} rotation={[0, Math.PI / 2, 0]}>
              <planeGeometry args={[0.1, 0.05]} />
              <meshBasicMaterial map={solderingLcdTexture} toneMapped={false} />
            </mesh>
            {/* Rotary Control Dial */}
            <mesh position={[0.115, 0.035, -0.04]} rotation={[0, 0, Math.PI / 2]}>
              <cylinderGeometry args={[0.016, 0.016, 0.012, 14]} />
              <primitive object={blackMetalMaterial} />
            </mesh>
            {/* Power Rocker Switch */}
            <mesh position={[0.115, 0.035, 0.04]} rotation={[0, 0, Math.PI / 2]}>
              <boxGeometry args={[0.015, 0.008, 0.018]} />
              <meshStandardMaterial color="#EF4444" emissive="#EF4444" emissiveIntensity={0.8} />
            </mesh>

            {/* Heavy Cast Iron Stand Beside Base */}
            <group position={[-0.04, 0, 0.16]}>
              <mesh position={[0, 0.02, 0]} castShadow>
                <boxGeometry args={[0.12, 0.035, 0.09]} />
                <primitive object={blackMetalMaterial} />
              </mesh>
              {/* Angled Spring-Coil Iron Holder */}
              <mesh position={[0, 0.07, 0]} rotation={[0.45, 0, 0]} castShadow>
                <cylinderGeometry args={[0.025, 0.025, 0.12, 10]} />
                <primitive object={chromeMaterial} />
              </mesh>
              {/* Soldering Iron Handle in Holder */}
              <mesh position={[0, 0.11, 0]} rotation={[0.45, 0, 0]} castShadow>
                <cylinderGeometry args={[0.012, 0.01, 0.18, 10]} />
                <meshStandardMaterial color="#0284C7" roughness={0.4} />
              </mesh>
              {/* Metal Fine Tip */}
              <mesh position={[0, 0.03, -0.04]} rotation={[0.45, 0, 0]}>
                <cylinderGeometry args={[0.003, 0.006, 0.04, 8]} />
                <meshStandardMaterial color="#F59E0B" metalness={0.9} roughness={0.2} />
              </mesh>

              {/* Round Brass-Wool Tip Cleaner Dome */}
              <mesh position={[-0.035, 0.04, -0.03]}>
                <sphereGeometry args={[0.02, 10, 8, 0, Math.PI * 2, 0, Math.PI / 2]} />
                <meshStandardMaterial color="#B45309" metalness={0.8} roughness={0.6} />
              </mesh>
              {/* Sponge Tray with Yellow Sponge */}
              <mesh position={[0.03, 0.025, -0.03]}>
                <boxGeometry args={[0.04, 0.012, 0.03]} />
                <meshStandardMaterial color="#FBBF24" roughness={0.9} />
              </mesh>
            </group>
          </group>
        ))}

        {/* -------------------------------------------------------------
            BENCH ACCESSORIES (Helping hands with PCB, multimeter, solder wire)
           ------------------------------------------------------------- */}
        {/* Helping-Hands Stand with Magnifier & Green PCB clamped */}
        <group position={[0.15, 0.875, -1.0]}>
          <mesh position={[0, 0.015, 0]} castShadow>
            <boxGeometry args={[0.12, 0.03, 0.1]} />
            <primitive object={blackMetalMaterial} />
          </mesh>
          <mesh position={[0, 0.08, 0]}>
            <cylinderGeometry args={[0.008, 0.008, 0.12, 8]} />
            <primitive object={chromeMaterial} />
          </mesh>
          {/* Magnifier Lens */}
          <mesh position={[0, 0.15, 0]} rotation={[0.3, 0, 0]}>
            <torusGeometry args={[0.035, 0.004, 8, 16]} />
            <primitive object={chromeMaterial} />
          </mesh>
          <mesh position={[0, 0.15, 0]} rotation={[0.3, 0, 0]}>
            <circleGeometry args={[0.032, 16]} />
            <meshStandardMaterial color="#E2E8F0" transparent opacity={0.4} roughness={0.1} />
          </mesh>
          {/* Dual Articulated Alligator Clip Arms */}
          <mesh position={[-0.05, 0.1, 0.03]} rotation={[0, 0, -0.4]}>
            <cylinderGeometry args={[0.004, 0.004, 0.08, 6]} />
            <primitive object={chromeMaterial} />
          </mesh>
          <mesh position={[0.05, 0.1, 0.03]} rotation={[0, 0, 0.4]}>
            <cylinderGeometry args={[0.004, 0.004, 0.08, 6]} />
            <primitive object={chromeMaterial} />
          </mesh>
          {/* Green PCB clamped */}
          <mesh position={[0, 0.12, 0.05]} rotation={[-0.3, 0, 0]} castShadow>
            <boxGeometry args={[0.14, 0.003, 0.09]} />
            <meshStandardMaterial color="#15803D" roughness={0.3} />
          </mesh>
        </group>

        {/* Digital Multimeter (Yellow protective holster, rotary dial, probes) */}
        <group position={[0.16, 0.875, 0]}>
          <mesh position={[0, 0.02, 0]} rotation={[-0.2, 0.2, 0]} castShadow>
            <boxGeometry args={[0.12, 0.035, 0.18]} />
            <meshStandardMaterial color="#F59E0B" roughness={0.4} />
          </mesh>
          {/* LCD Screen */}
          <mesh position={[0.015, 0.04, -0.04]} rotation={[-0.2, 0.2, 0]}>
            <planeGeometry args={[0.07, 0.035]} />
            <meshBasicMaterial color="#0A2540" toneMapped={false} />
          </mesh>
          {/* Rotary Dial */}
          <mesh position={[0.015, 0.04, 0.02]} rotation={[-0.2, 0.2, 0]}>
            <cylinderGeometry args={[0.018, 0.018, 0.008, 12]} />
            <primitive object={blackMetalMaterial} />
          </mesh>
        </group>

        {/* Solder Wire Reel & Flux Pen on Bench */}
        <group position={[0.2, 0.875, 1.0]}>
          <mesh position={[0, 0.035, 0]} castShadow>
            <cylinderGeometry args={[0.04, 0.04, 0.07, 16]} />
            <meshStandardMaterial color="#0284C7" roughness={0.3} />
          </mesh>
          <mesh position={[0, 0.035, 0]}>
            <cylinderGeometry args={[0.041, 0.041, 0.045, 16]} />
            <primitive object={chromeMaterial} />
          </mesh>
          {/* Flux Pen */}
          <mesh position={[0.08, 0.008, 0]} rotation={[0, 0, Math.PI / 2]}>
            <cylinderGeometry args={[0.007, 0.007, 0.14, 8]} />
            <meshStandardMaterial color="#FFFFFF" roughness={0.3} />
          </mesh>
        </group>

        {/* 2 Articulated Fume Extractor Arms over station pairs */}
        {[-1.0, 1.0].map((fz, fIdx) => (
          <group key={`fume-extractor-${fIdx}`} position={[-0.28, 0.875, fz]}>
            {/* Filter Box on wall/bench */}
            <mesh position={[0, 0.06, 0]} castShadow>
              <boxGeometry args={[0.16, 0.12, 0.16]} />
              <meshStandardMaterial color="#475569" roughness={0.5} />
            </mesh>
            {/* Segmented Articulated Arm */}
            <mesh position={[0.1, 0.28, 0]} rotation={[0, 0, -0.45]}>
              <cylinderGeometry args={[0.028, 0.028, 0.55, 10]} />
              <primitive object={blackMetalMaterial} />
            </mesh>
            <mesh position={[0.22, 0.52, 0]}>
              <sphereGeometry args={[0.04, 8, 8]} />
              <primitive object={blackMetalMaterial} />
            </mesh>
            <mesh position={[0.16, 0.7, 0]} rotation={[0, 0, 0.55]}>
              <cylinderGeometry args={[0.024, 0.024, 0.42, 10]} />
              <primitive object={blackMetalMaterial} />
            </mesh>
            {/* Wide Funnel Extraction Hood */}
            <mesh position={[0.04, 0.85, 0]} rotation={[0, 0, 1.3]}>
              <coneGeometry args={[0.14, 0.18, 14, 1, true]} />
              <meshStandardMaterial
                color="#E2E8F0"
                transparent
                opacity={0.65}
                roughness={0.1}
                side={THREE.DoubleSide}
              />
            </mesh>
          </group>
        ))}
      </group>

      {/* =========================================================================
          4. ELECTRONICS STORAGE SHELVING UNIT (West Wall, Z = 9.7m)
         ========================================================================= */}
      <group position={[0.55, 0, 9.7]}>
        {/* 5 Light-Oak Boards with Wood Grain */}
        {[0.2, 0.7, 1.2, 1.7, 2.2].map((sy, sIdx) => (
          <mesh key={`elec-shelf-${sIdx}`} position={[0, sy, 0]} castShadow receiveShadow>
            <boxGeometry args={[0.55, 0.035, 2.4]} />
            <primitive object={oakMaterial} />
          </mesh>
        ))}

        {/* 4 Matte Black Steel Uprights & Diagonal Cross Braces */}
        {[
          [-0.24, -1.16],
          [-0.24, 1.16],
          [0.24, -1.16],
          [0.24, 1.16]
        ].map(([ux, uz], uIdx) => (
          <mesh key={`elec-post-${uIdx}`} position={[ux, 1.1, uz]} castShadow>
            <boxGeometry args={[0.04, 2.2, 0.04]} />
            <primitive object={blackMetalMaterial} />
          </mesh>
        ))}
        {/* Rear X-Cross Braces */}
        <mesh position={[-0.24, 1.2, 0]} rotation={[0.45, 0, 0]}>
          <boxGeometry args={[0.015, 2.4, 0.02]} />
          <primitive object={blackMetalMaterial} />
        </mesh>
        <mesh position={[-0.24, 1.2, 0]} rotation={[-0.45, 0, 0]}>
          <boxGeometry args={[0.015, 2.4, 0.02]} />
          <primitive object={blackMetalMaterial} />
        </mesh>

        {/* -------------------------------------------------------------
            LEVEL 1 (Bottom, Y = 0.22m): Heavy Storage Crates + DC Bench Power Supply
           ------------------------------------------------------------- */}
        {/* Bench DC Power Supply */}
        <group position={[0.06, 0.36, -0.6]}>
          <mesh castShadow>
            <boxGeometry args={[0.32, 0.22, 0.44]} />
            <meshStandardMaterial color="#334155" roughness={0.4} metalness={0.6} />
          </mesh>
          {/* Front Face with Dual LED Displays & Controls */}
          <mesh position={[0.162, 0.04, -0.09]}>
            <planeGeometry args={[0.02, 0.06]} />
            <meshBasicMaterial color="#EF4444" toneMapped={false} />
          </mesh>
          <mesh position={[0.162, 0.04, 0.09]}>
            <planeGeometry args={[0.02, 0.06]} />
            <meshBasicMaterial color="#10B981" toneMapped={false} />
          </mesh>
          {/* Knobs & Terminals */}
          {[-0.08, 0, 0.08].map((tz, ti) => (
            <mesh key={`post-${ti}`} position={[0.165, -0.05, tz]}>
              <cylinderGeometry args={[0.008, 0.008, 0.015, 8]} rotation={[0, 0, Math.PI / 2]} />
              <meshStandardMaterial color={ti === 0 ? '#EF4444' : ti === 1 ? '#0F172A' : '#10B981'} />
            </mesh>
          ))}
        </group>

        {/* Handheld Digital Oscilloscope Unit */}
        <group position={[0.08, 0.32, 0.1]}>
          <mesh rotation={[0, 0.15, 0]} castShadow>
            <boxGeometry args={[0.24, 0.16, 0.3]} />
            <meshStandardMaterial color="#0F172A" roughness={0.4} />
          </mesh>
          <mesh position={[0.122, 0.02, 0]}>
            <planeGeometry args={[0.12, 0.2]} />
            <meshBasicMaterial color="#0284C7" toneMapped={false} />
          </mesh>
        </group>

        {/* Heavy Bottom Parts Crate */}
        <mesh position={[0, 0.34, 0.72]} castShadow>
          <boxGeometry args={[0.42, 0.22, 0.46]} />
          <meshStandardMaterial color="#1E293B" roughness={0.6} />
        </mesh>

        {/* -------------------------------------------------------------
            LEVEL 2 (Y = 0.72m): Multi-Drawer Component Cabinet (Pulled Drawers)
           ------------------------------------------------------------- */}
        <group position={[0.04, 0.94, -0.45]}>
          {/* Main Metal Cabinet Housing */}
          <mesh castShadow>
            <boxGeometry args={[0.4, 0.4, 0.8]} />
            <primitive object={blackMetalMaterial} />
          </mesh>
          {/* Front Face with 8 Metal-Labeled Drawers Texture */}
          <mesh position={[0.202, 0, 0]} rotation={[0, Math.PI / 2, 0]}>
            <planeGeometry args={[0.76, 0.38]} />
            <meshBasicMaterial map={drawerCabinetTexture} toneMapped={false} />
          </mesh>
          {/* 2 Drawers Pulled Out ~4 cm Showing Real Internal Structure */}
          <mesh position={[0.24, 0.1, -0.18]} castShadow>
            <boxGeometry args={[0.12, 0.08, 0.18]} />
            <meshStandardMaterial color="#475569" roughness={0.3} />
          </mesh>
          <mesh position={[0.24, -0.1, 0.18]} castShadow>
            <boxGeometry args={[0.12, 0.08, 0.18]} />
            <meshStandardMaterial color="#475569" roughness={0.3} />
          </mesh>
        </group>

        {/* Solderless Breadboards Storage Rack */}
        <group position={[0.05, 0.86, 0.5]}>
          {[0, 0.04, 0.08].map((by, bi) => (
            <mesh key={`breadboard-${bi}`} position={[0, by, 0]} castShadow>
              <boxGeometry args={[0.24, 0.025, 0.42]} />
              <meshStandardMaterial color="#F8FAFC" roughness={0.3} />
            </mesh>
          ))}
        </group>

        {/* -------------------------------------------------------------
            LEVEL 3 (Y = 1.22m): CLEAR STORAGE BINS SHOWING REAL COMPONENTS
           ------------------------------------------------------------- */}
        {[
          { name: 'resistors', label: 'RESISTORS', lidColor: '#0284C7', zPos: -0.75 },
          { name: 'leds', label: 'LEDs', lidColor: '#EF4444', zPos: -0.25 },
          { name: 'capacitors', label: 'CAPACITORS', lidColor: '#F59E0B', zPos: 0.25 },
          { name: 'ics', label: 'ICs', lidColor: '#10B981', zPos: 0.75 }
        ].map((bin, bIdx) => (
          <group key={`clear-bin-${bIdx}`} position={[0.04, 1.34, bin.zPos]}>
            {/* Transparent Acrylic Bin Body (0.28 opacity, depthWrite=false) */}
            <mesh castShadow receiveShadow>
              <boxGeometry args={[0.42, 0.2, 0.4]} />
              <primitive object={clearBinMaterial} />
            </mesh>

            {/* Colored Snap-On Lid */}
            <mesh position={[0, 0.105, 0]} castShadow>
              <boxGeometry args={[0.43, 0.02, 0.41]} />
              <meshStandardMaterial color={bin.lidColor} roughness={0.3} />
            </mesh>

            {/* White Label Sticker on Front */}
            <mesh position={[0.212, 0.02, 0]} rotation={[0, Math.PI / 2, 0]}>
              <planeGeometry args={[0.2, 0.08]} />
              <meshBasicMaterial map={getBinLabelTexture(bin.name)} toneMapped={false} />
            </mesh>

            {/* VISIBLE COMPONENTS INSIDE */}
            {bin.name === 'resistors' && (
              <group position={[0, -0.04, 0]}>
                {[-0.08, -0.03, 0.02, 0.07].map((rx, ri) => (
                  <mesh key={`res-${ri}`} position={[rx, 0, (ri % 2) * 0.04]} rotation={[0, ri * 0.5, Math.PI / 2]}>
                    <cylinderGeometry args={[0.01, 0.01, 0.07, 8]} />
                    <meshStandardMaterial color="#D4B996" roughness={0.4} />
                  </mesh>
                ))}
              </group>
            )}

            {bin.name === 'leds' && (
              <group position={[0, -0.04, 0]}>
                {['#EF4444', '#10B981', '#3B82F6', '#F59E0B'].map((c, li) => (
                  <mesh key={`led-${li}`} position={[-0.06 + li * 0.04, 0, 0]}>
                    <sphereGeometry args={[0.016, 8, 8]} />
                    <meshStandardMaterial color={c} transparent opacity={0.8} />
                  </mesh>
                ))}
              </group>
            )}

            {bin.name === 'capacitors' && (
              <group position={[0, -0.04, 0]}>
                {[-0.06, 0, 0.06].map((cx, ci) => (
                  <mesh key={`cap-${ci}`} position={[cx, 0, 0]}>
                    <cylinderGeometry args={[0.016, 0.016, 0.05, 10]} />
                    <meshStandardMaterial color="#1E293B" metalness={0.7} />
                  </mesh>
                ))}
              </group>
            )}

            {bin.name === 'ics' && (
              <group position={[0, -0.04, 0]}>
                {[-0.06, 0.03].map((ix, ii) => (
                  <mesh key={`ic-${ii}`} position={[ix, 0, 0]}>
                    <boxGeometry args={[0.05, 0.015, 0.09]} />
                    <primitive object={blackMetalMaterial} />
                  </mesh>
                ))}
              </group>
            )}
          </group>
        ))}

        {/* -------------------------------------------------------------
            LEVEL 4 (Y = 1.72m): SENSOR MODULES ON ACRYLIC DISPLAY STANDS
           ------------------------------------------------------------- */}
        {/* Ultrasonic Sensor HC-SR04 with Dual Silver Transducers */}
        <group position={[0.05, 1.82, -0.6]}>
          <mesh castShadow>
            <boxGeometry args={[0.02, 0.06, 0.14]} />
            <meshStandardMaterial color="#0284C7" roughness={0.3} />
          </mesh>
          <mesh position={[0.025, 0, -0.035]} rotation={[0, 0, Math.PI / 2]}>
            <cylinderGeometry args={[0.022, 0.022, 0.03, 14]} />
            <primitive object={chromeMaterial} />
          </mesh>
          <mesh position={[0.025, 0, 0.035]} rotation={[0, 0, Math.PI / 2]}>
            <cylinderGeometry args={[0.022, 0.022, 0.03, 14]} />
            <primitive object={chromeMaterial} />
          </mesh>
        </group>

        {/* PIR Motion Sensor Dome on Board */}
        <group position={[0.05, 1.82, 0]}>
          <mesh castShadow>
            <boxGeometry args={[0.02, 0.08, 0.08]} />
            <meshStandardMaterial color="#15803D" roughness={0.3} />
          </mesh>
          <mesh position={[0.025, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
            <sphereGeometry args={[0.03, 12, 10, 0, Math.PI * 2, 0, Math.PI / 2]} />
            <meshStandardMaterial color="#F8FAFC" roughness={0.6} />
          </mesh>
        </group>

        {/* OLED Display Module */}
        <group position={[0.05, 1.82, 0.6]}>
          <mesh castShadow>
            <boxGeometry args={[0.02, 0.08, 0.08]} />
            <meshStandardMaterial color="#0284C7" roughness={0.3} />
          </mesh>
          <mesh position={[0.015, 0, 0]}>
            <boxGeometry args={[0.005, 0.05, 0.06]} />
            <meshBasicMaterial color="#00E5FF" toneMapped={false} />
          </mesh>
        </group>

        {/* -------------------------------------------------------------
            LEVEL 5 (Top, Y = 2.22m): REALISTIC POTTED WORKSHOP PLANT
           ------------------------------------------------------------- */}
        <group position={[0.04, 2.22, 0.5]}>
          {/* White Round Ceramic Pot with Beveled Lip */}
          <mesh position={[0, 0.1, 0]} castShadow>
            <cylinderGeometry args={[0.13, 0.09, 0.2, 16]} />
            <meshStandardMaterial color="#FFFFFF" roughness={0.25} />
          </mesh>
          {/* Dark Soil Disc */}
          <mesh position={[0, 0.18, 0]}>
            <cylinderGeometry args={[0.12, 0.12, 0.02, 16]} />
            <meshStandardMaterial color="#2B1810" roughness={0.9} />
          </mesh>
          {/* 10 Realistic Leaf Blades as Angled Curved Planes */}
          {[
            { angle: 0, tilt: 0.45, len: 0.28, color: '#15803D' },
            { angle: 0.6, tilt: 0.35, len: 0.32, color: '#16A34A' },
            { angle: 1.2, tilt: 0.5, len: 0.26, color: '#15803D' },
            { angle: 1.9, tilt: 0.4, len: 0.34, color: '#22C55E' },
            { angle: 2.5, tilt: 0.48, len: 0.29, color: '#15803D' },
            { angle: 3.1, tilt: 0.38, len: 0.33, color: '#16A34A' },
            { angle: 3.8, tilt: 0.52, len: 0.27, color: '#15803D' },
            { angle: 4.4, tilt: 0.42, len: 0.31, color: '#22C55E' },
            { angle: 5.0, tilt: 0.46, len: 0.3, color: '#15803D' },
            { angle: 5.7, tilt: 0.36, len: 0.35, color: '#16A34A' }
          ].map((leaf, li) => (
            <mesh
              key={`leaf-${li}`}
              position={[0, 0.19, 0]}
              rotation={[leaf.tilt, leaf.angle, 0]}
              castShadow
            >
              <planeGeometry args={[0.07, leaf.len]} />
              <meshStandardMaterial
                color={leaf.color}
                roughness={0.6}
                side={THREE.DoubleSide}
              />
            </mesh>
          ))}
        </group>
      </group>

      {/* Wall Sign: "ELECTRONICS ZONE" (Auto-fit, toneMapped=false) */}
      <mesh position={[0.14, 2.9, 9.7]} rotation={[0, Math.PI / 2, 0]}>
        <planeGeometry args={[2.2, 0.55]} />
        <meshBasicMaterial map={signElectronics} toneMapped={false} />
      </mesh>
    </group>
  );
}
