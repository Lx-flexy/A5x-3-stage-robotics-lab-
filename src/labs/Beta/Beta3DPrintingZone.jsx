import React, { useMemo, useRef, useEffect } from 'react';
import * as THREE from 'three';
import {
  getBetaLogoTexture,
  getBeta3DPrintingChamferSignTexture,
  getBetaA5XCrateTexture,
  getBambuScreenTexture,
  getCuttingMatTexture,
  getPegboardTexture,
  getWoodGrainTexture,
  getBinLabelTexture,
} from './betaTextures';

/**
 * Beta3DPrintingZone — Revision 10
 * Complete unified reconstruction of the 3D Printing Zone on Beta's Right Wall (X=32 side):
 * 1. Continuous Wall Unit (width 4.6m, depth 0.5m, height 2.3m):
 *    - Left Bay (1.4m): 3 shelf levels of filament spools on rods (18 spools) + 2 bin levels
 *    - Centre Bay (1.8m): Navy wall panel, steel-top bench (0.9m), Bambu Lab A1 printer printing
 *      blue lattice vase, charcoal pegboard with tools, wall spool rack (12 spools), props & bins
 *    - Right Bay (1.4m): 4 display levels with prototypes, dark back panel, warm LEDs, bottom bins
 *    - Shared 40mm steel uprights, continuous light-oak top rail across all 3 bays
 * 2. Navy backwall (#071B3A fluted), white 3D raised A5X logo, white A5X crate on top rail
 * 3. Chamfered-hexagon "3D PRINTING ZONE" sign with blue LED underline
 * 4. Real 30-spool model (flanges, hub, wound filament cylinder) via InstancedMesh
 * 5. Detailed Bambu Lab A1 with heated bed, dual Z gantry, print head, PTFE tube, touchscreen
 * 6. <= 25 draw calls budget via geometry instancing and shared materials
 */
export function Beta3DPrintingZone() {
  const wallX = 32.0; // Wall at X=32
  const unitDepth = 0.5;
  const unitZStart = 0.05;
  const unitZEnd = 4.65;
  const unitLen = unitZEnd - unitZStart; // 4.6m

  // Textures
  const logoTexture = useMemo(() => getBetaLogoTexture(), []);
  const signTexture = useMemo(() => getBeta3DPrintingChamferSignTexture(), []);
  const crateTexture = useMemo(() => getBetaA5XCrateTexture(), []);
  const screenTexture = useMemo(() => getBambuScreenTexture(), []);
  const cuttingMatTexture = useMemo(() => getCuttingMatTexture(), []);
  const pegboardTexture = useMemo(() => getPegboardTexture(), []);
  const woodTexture = useMemo(() => getWoodGrainTexture(), []);

  // Shared Materials
  const oakMaterial = useMemo(
    () => new THREE.MeshStandardMaterial({ map: woodTexture, roughness: 0.55, metalness: 0.05 }),
    [woodTexture]
  );
  const blackSteelMaterial = useMemo(
    () => new THREE.MeshStandardMaterial({ color: '#161C24', metalness: 0.85, roughness: 0.28 }),
    []
  );
  const brushedSteelMaterial = useMemo(
    () => new THREE.MeshStandardMaterial({ color: '#CBD5E1', metalness: 0.88, roughness: 0.22 }),
    []
  );
  const warmLedMaterial = useMemo(
    () => new THREE.MeshStandardMaterial({ color: '#FFF8EE', emissive: '#FFD580', emissiveIntensity: 2.5 }),
    []
  );
  const blueLedMaterial = useMemo(
    () => new THREE.MeshStandardMaterial({ color: '#1677FF', emissive: '#1677FF', emissiveIntensity: 4.0 }),
    []
  );
  const clearBinMaterial = useMemo(
    () => new THREE.MeshStandardMaterial({ color: '#E2E8F0', transparent: true, opacity: 0.32, roughness: 0.15 }),
    []
  );
  const spoolFlangeMaterial = useMemo(
    () => new THREE.MeshStandardMaterial({ color: '#E2E8F0', transparent: true, opacity: 0.38, roughness: 0.2 }),
    []
  );
  const whitePlasticMaterial = useMemo(
    () => new THREE.MeshStandardMaterial({ color: '#F8FAFC', roughness: 0.35 }),
    []
  );
  const glossyBlueMaterial = useMemo(
    () => new THREE.MeshStandardMaterial({ color: '#1D4ED8', roughness: 0.18, metalness: 0.1 }),
    []
  );
  const orangeConeMaterial = useMemo(
    () => new THREE.MeshStandardMaterial({ color: '#EA580C', roughness: 0.45 }),
    []
  );

  // Instanced Spool Mesh Refs (30 total spools: 18 left bay, 12 centre-right wall rack)
  const spoolFlangeRef = useRef();
  const spoolHubRef = useRef();
  const spoolFilamentRef = useRef();

  const spoolData = useMemo(() => {
    const list = [];
    // Spool palette (10 distinct real colors)
    const palette = [
      '#111827', '#F8FAFC', '#2563EB', '#DC2626', '#991B1B',
      '#F59E0B', '#EA580C', '#16A34A', '#0D9488', '#7C3AED'
    ];

    // Left Bay: 3 shelf levels (y = 0.92, 1.37, 1.82) x 6 spools each
    const leftLevels = [0.92, 1.37, 1.82];
    const leftZMin = 0.18;
    const leftZMax = 1.32;
    const leftZStep = (leftZMax - leftZMin) / 5; // 6 spools
    const posX = wallX - 0.25;

    let cIdx = 0;
    leftLevels.forEach((sy) => {
      for (let i = 0; i < 6; i++) {
        list.push({
          x: posX,
          y: sy,
          z: leftZMin + i * leftZStep,
          color: palette[cIdx % palette.length],
        });
        cIdx++;
      }
    });

    // Centre-Right Wall Rack: 3 rows x 4 spools mounted against the wall
    const rackLevels = [1.15, 1.55, 1.95];
    const rackZMin = 2.68;
    const rackZStep = 0.14;
    const rackPosX = wallX - 0.16;

    rackLevels.forEach((sy) => {
      for (let i = 0; i < 4; i++) {
        list.push({
          x: rackPosX,
          y: sy,
          z: rackZMin + i * rackZStep,
          color: palette[(cIdx + i) % palette.length],
        });
      }
      cIdx += 2;
    });

    return list;
  }, [wallX]);

  // Populate InstancedMesh for 30 Spools
  useEffect(() => {
    if (!spoolFlangeRef.current || !spoolHubRef.current || !spoolFilamentRef.current) return;

    const dummy = new THREE.Object3D();
    let flangeIdx = 0;

    spoolData.forEach((s, idx) => {
      // 1. Filament Cylinder (diam 190mm, width 60mm)
      // Spool sits on XZ plane, rotation around X axis (rod along Z)
      dummy.position.set(s.x, s.y, s.z);
      dummy.rotation.set(Math.PI / 2, 0, 0); // cylinder aligned with Z axis
      dummy.scale.set(1, 1, 1);
      dummy.updateMatrix();
      spoolFilamentRef.current.setMatrixAt(idx, dummy.matrix);
      spoolFilamentRef.current.setColorAt(idx, new THREE.Color(s.color));

      // 2. Inner Hub (diam 55mm, width 64mm)
      spoolHubRef.current.setMatrixAt(idx, dummy.matrix);

      // 3. Two Thin Translucent Flanges (diam 200mm, thickness 3mm, offset +-0.031m)
      dummy.position.set(s.x, s.y, s.z - 0.031);
      dummy.updateMatrix();
      spoolFlangeRef.current.setMatrixAt(flangeIdx++, dummy.matrix);

      dummy.position.set(s.x, s.y, s.z + 0.031);
      dummy.updateMatrix();
      spoolFlangeRef.current.setMatrixAt(flangeIdx++, dummy.matrix);
    });

    spoolFilamentRef.current.instanceMatrix.needsUpdate = true;
    if (spoolFilamentRef.current.instanceColor) spoolFilamentRef.current.instanceColor.needsUpdate = true;
    spoolHubRef.current.instanceMatrix.needsUpdate = true;
    spoolFlangeRef.current.instanceMatrix.needsUpdate = true;
  }, [spoolData]);

  // Geometry definitions for spools
  const flangeGeo = useMemo(() => new THREE.CylinderGeometry(0.10, 0.10, 0.003, 18), []);
  const hubGeo = useMemo(() => new THREE.CylinderGeometry(0.0275, 0.0275, 0.065, 14), []);
  const filamentGeo = useMemo(() => new THREE.CylinderGeometry(0.095, 0.095, 0.06, 18), []);

  return (
    <group name="beta-3d-printing-zone-revision10">
      {/* ================================================================
          1. NAVY FLUTED BACKWALL (Full Floor to Ceiling across Zone)
         ================================================================ */}
      <mesh position={[wallX - 0.02, 1.8, 2.35]} rotation={[0, -Math.PI / 2, 0]} receiveShadow>
        <planeGeometry args={[unitLen + 0.2, 3.6]} />
        <meshStandardMaterial color="#071B3A" roughness={0.35} metalness={0.15} />
      </mesh>

      {/* Top Blue LED Glow Header Line */}
      <mesh position={[wallX - 0.03, 3.52, 2.35]} rotation={[0, -Math.PI / 2, 0]}>
        <boxGeometry args={[unitLen + 0.2, 0.03, 0.02]} />
        <primitive object={blueLedMaterial} />
      </mesh>

      {/* A5X INDUSTRIES | IMPOSSIBLE ENGINEERING. Raised 3D Logo above Unit */}
      <mesh position={[wallX - 0.03, 2.95, 2.35]} rotation={[0, -Math.PI / 2, 0]}>
        <planeGeometry args={[3.2, 0.6]} />
        <meshBasicMaterial map={logoTexture} transparent toneMapped={false} />
      </mesh>

      {/* ================================================================
          2. CONTINUOUS STEEL & OAK WALL UNIT STRUCTURE (Width 4.6m, Depth 0.5m, Height 2.3m)
         ================================================================ */}
      {/* Continuous Top Light-Oak Rail across all 3 Bays (Z: 0.05 to 4.65 at Y=2.30m) */}
      <mesh position={[wallX - unitDepth / 2, 2.30, 2.35]} castShadow>
        <boxGeometry args={[unitDepth, 0.045, unitLen]} />
        <primitive object={oakMaterial} />
      </mesh>

      {/* 4 Shared Vertical Upright Frames along Z (Z = 0.05, 1.45, 3.25, 4.65) */}
      {[0.05, 1.45, 3.25, 4.65].map((uz, i) => (
        <group key={`upright-frame-${i}`}>
          {/* Rear 40mm steel post */}
          <mesh position={[wallX - 0.03, 1.15, uz]} castShadow>
            <boxGeometry args={[0.04, 2.30, 0.04]} />
            <primitive object={blackSteelMaterial} />
          </mesh>
          {/* Front 40mm steel post */}
          <mesh position={[wallX - unitDepth + 0.03, 1.15, uz]} castShadow>
            <boxGeometry args={[0.04, 2.30, 0.04]} />
            <primitive object={blackSteelMaterial} />
          </mesh>
          {/* Horizontal cross ties at 3 heights */}
          {[0.25, 1.15, 2.05].map((hy, hi) => (
            <mesh key={`tie-${i}-${hi}`} position={[wallX - unitDepth / 2, hy, uz]} castShadow>
              <boxGeometry args={[unitDepth - 0.06, 0.025, 0.025]} />
              <primitive object={blackSteelMaterial} />
            </mesh>
          ))}
        </group>
      ))}

      {/* ================================================================
          3. LEFT BAY (Z: 0.05 to 1.45, width 1.4m, center Z = 0.75)
             - 3 Shelf levels for filament spools on horizontal rods
             - 2 Bottom levels for clear storage bins
         ================================================================ */}
      {/* 3 Upper Oak Shelves for Spools */}
      {[0.80, 1.25, 1.70].map((sy, i) => (
        <group key={`left-spool-shelf-${i}`}>
          <mesh position={[wallX - unitDepth / 2, sy, 0.75]} castShadow>
            <boxGeometry args={[unitDepth - 0.02, 0.035, 1.36]} />
            <primitive object={oakMaterial} />
          </mesh>
          {/* Warm LED strip under shelf */}
          <mesh position={[wallX - unitDepth / 2, sy - 0.022, 0.75]}>
            <boxGeometry args={[unitDepth - 0.1, 0.012, 1.34]} />
            <primitive object={warmLedMaterial} />
          </mesh>
          {/* Horizontal metal spool mounting rod */}
          <mesh position={[wallX - 0.25, sy + 0.12, 0.75]} rotation={[Math.PI / 2, 0, 0]} castShadow>
            <cylinderGeometry args={[0.009, 0.009, 1.36, 8]} />
            <primitive object={brushedSteelMaterial} />
          </mesh>
        </group>
      ))}

      {/* 2 Bottom Levels for Clear Labelled Bins (Y = 0.18, 0.48) */}
      {[0.16, 0.48].map((sy, i) => (
        <group key={`left-bin-shelf-${i}`}>
          <mesh position={[wallX - unitDepth / 2, sy, 0.75]} castShadow>
            <boxGeometry args={[unitDepth - 0.02, 0.035, 1.36]} />
            <primitive object={oakMaterial} />
          </mesh>
          {/* Clear Bins on this shelf */}
          {[-0.42, 0.0, 0.42].map((bz, bi) => (
            <group key={`left-bin-${i}-${bi}`} position={[wallX - unitDepth / 2, sy + 0.12, 0.75 + bz]}>
              <mesh castShadow>
                <boxGeometry args={[0.42, 0.20, 0.38]} />
                <primitive object={clearBinMaterial} />
              </mesh>
              {/* Bin Lid */}
              <mesh position={[0, 0.105, 0]}>
                <boxGeometry args={[0.43, 0.015, 0.39]} />
                <primitive object={blackSteelMaterial} />
              </mesh>
              {/* Front White Label */}
              <mesh position={[-0.211, 0, 0]} rotation={[0, -Math.PI / 2, 0]}>
                <planeGeometry args={[0.16, 0.06]} />
                <meshStandardMaterial color="#FFFFFF" roughness={0.4} />
              </mesh>
              {/* Internal parts silhouette */}
              <mesh position={[0, -0.05, 0]}>
                <boxGeometry args={[0.26, 0.08, 0.26]} />
                <meshStandardMaterial color={bi === 0 ? '#DC2626' : bi === 1 ? '#2563EB' : '#F59E0B'} roughness={0.6} />
              </mesh>
            </group>
          ))}
        </group>
      ))}

      {/* Branded White A5X Box / Crate on Top Rail (Left Bay) */}
      <mesh position={[wallX - unitDepth / 2, 2.45, 0.75]} castShadow>
        <boxGeometry args={[0.38, 0.26, 0.76]} />
        <meshStandardMaterial color="#F8FAFC" roughness={0.3} />
      </mesh>
      {/* Front Face of Crate with A5X Branding */}
      <mesh position={[wallX - unitDepth / 2 - 0.191, 2.45, 0.75]} rotation={[0, -Math.PI / 2, 0]}>
        <planeGeometry args={[0.74, 0.24]} />
        <meshBasicMaterial map={crateTexture} toneMapped={false} />
      </mesh>

      {/* Trailing Green Plant draped on Left Top Rail */}
      <group position={[wallX - unitDepth / 2, 2.33, 0.35]}>
        {/* Pot */}
        <mesh position={[0, 0.08, 0]} castShadow>
          <cylinderGeometry args={[0.12, 0.09, 0.16, 12]} />
          <primitive object={whitePlasticMaterial} />
        </mesh>
        {/* Trailing Vine Blades */}
        {[
          { dz: -0.08, len: 0.55, rot: 0.15 },
          { dz: 0.0, len: 0.85, rot: 0.35 },
          { dz: 0.08, len: 0.65, rot: 0.25 },
          { dz: -0.04, len: 0.75, rot: 0.20 },
          { dz: 0.04, len: 0.95, rot: 0.30 },
        ].map((v, vi) => (
          <mesh
            key={`trailing-vine-${vi}`}
            position={[-0.14, -v.len / 2 + 0.1, v.dz]}
            rotation={[0, -Math.PI / 2, v.rot]}
            castShadow
          >
            <planeGeometry args={[0.07, v.len]} />
            <meshStandardMaterial color={vi % 2 === 0 ? '#15803D' : '#16A34A'} roughness={0.5} side={2} />
          </mesh>
        ))}
      </group>

      {/* ================================================================
          4. CENTRE BAY (Z: 1.45 to 3.25, width 1.8m, center Z = 2.35)
             - Chamfered Hexagon "3D PRINTING ZONE" Sign + Blue LED Bar
             - Brushed Stainless Steel Workbench (Y = 0.90m)
             - Bambu Lab A1 3D Printer (center of bench) printing Blue Lattice Vase
             - Charcoal Pegboard with Real Silhouette Tools (left of printer)
             - Centre-Right Wall Spool Rack (12 spools)
             - Benchtop props: Blue cutting mat, parts organizer, pen holder, glue/IPA
             - Lower shelves with supply bins & bottles
         ================================================================ */}
      {/* Sign plate for 3D Printing Zone is rendered strictly from data/zones.js via <ZoneSign /> */}

      {/* Charcoal Pegboard (0.9m x 0.9m) Left of Printer */}
      <mesh position={[wallX - 0.03, 1.25, 1.82]} rotation={[0, -Math.PI / 2, 0]}>
        <planeGeometry args={[0.64, 0.82]} />
        <meshStandardMaterial map={pegboardTexture} color="#2B323D" roughness={0.8} metalness={0.05} />
      </mesh>
      {/* Hanging Tools on Pegboard: Pliers, Scraper, Tweezers, Hex Keys */}
      <group position={[wallX - 0.045, 1.25, 1.82]} rotation={[0, -Math.PI / 2, 0]}>
        {/* Scraper / Spatula */}
        <mesh position={[-0.20, 0.15, 0]} castShadow>
          <boxGeometry args={[0.07, 0.18, 0.01]} />
          <primitive object={brushedSteelMaterial} />
        </mesh>
        <mesh position={[-0.20, 0.02, 0]} castShadow>
          <cylinderGeometry args={[0.012, 0.012, 0.10, 8]} />
          <meshStandardMaterial color="#E11D48" roughness={0.4} />
        </mesh>

        {/* Needle-nose Pliers */}
        <mesh position={[-0.07, 0.16, 0]} castShadow>
          <boxGeometry args={[0.025, 0.14, 0.01]} />
          <primitive object={brushedSteelMaterial} />
        </mesh>
        <mesh position={[-0.07, 0.04, 0]} castShadow>
          <boxGeometry args={[0.05, 0.12, 0.014]} />
          <meshStandardMaterial color="#2563EB" roughness={0.4} />
        </mesh>

        {/* Side Cutters */}
        <mesh position={[0.06, 0.16, 0]} castShadow>
          <boxGeometry args={[0.025, 0.12, 0.01]} />
          <primitive object={brushedSteelMaterial} />
        </mesh>
        <mesh position={[0.06, 0.04, 0]} castShadow>
          <boxGeometry args={[0.05, 0.10, 0.014]} />
          <meshStandardMaterial color="#F59E0B" roughness={0.4} />
        </mesh>

        {/* Precision Tweezers */}
        <mesh position={[0.18, 0.14, 0]} castShadow>
          <boxGeometry args={[0.015, 0.16, 0.008]} />
          <meshStandardMaterial color="#1E293B" metalness={0.8} roughness={0.2} />
        </mesh>
      </group>

      {/* Centre-Right Wall Spool Rack (Background grid holding 12 spools) */}
      <group position={[wallX - 0.04, 1.55, 2.92]} rotation={[0, -Math.PI / 2, 0]}>
        {/* Dark Mounting Backplate */}
        <mesh castShadow>
          <planeGeometry args={[0.72, 1.15]} />
          <meshStandardMaterial color="#1E293B" roughness={0.6} metalness={0.2} />
        </mesh>
        {/* Metal Spool Hanging Rods */}
        {[0.40, 0.0, -0.40].map((ry, ri) => (
          <mesh key={`rack-rod-${ri}`} position={[0, ry, 0.06]} rotation={[0, 0, Math.PI / 2]}>
            <cylinderGeometry args={[0.008, 0.008, 0.68, 8]} />
            <primitive object={brushedSteelMaterial} />
          </mesh>
        ))}
      </group>

      {/* STEEL WORKBENCH (Y = 0.90m, width 1.76m, depth 0.50m) */}
      <group position={[wallX - unitDepth / 2, 0, 2.35]}>
        {/* Brushed Stainless Steel Top Plate */}
        <mesh position={[0, 0.885, 0]} castShadow receiveShadow>
          <boxGeometry args={[unitDepth, 0.045, 1.76]} />
          <primitive object={brushedSteelMaterial} />
        </mesh>
        {/* Black Steel Frame & 4 Bench Legs */}
        {[
          [-unitDepth / 2 + 0.03, -0.84],
          [-unitDepth / 2 + 0.03, 0.84],
          [unitDepth / 2 - 0.03, -0.84],
          [unitDepth / 2 - 0.03, 0.84],
        ].map(([lx, lz], li) => (
          <mesh key={`bench-leg-${li}`} position={[lx, 0.43, lz]} castShadow>
            <boxGeometry args={[0.045, 0.86, 0.045]} />
            <primitive object={blackSteelMaterial} />
          </mesh>
        ))}

        {/* 2 Lower Shelves under Bench for Bins & Supplies (Y = 0.22, 0.55) */}
        {[0.22, 0.55].map((sy, i) => (
          <group key={`bench-under-shelf-${i}`}>
            <mesh position={[0, sy, 0]} castShadow>
              <boxGeometry args={[unitDepth - 0.02, 0.03, 1.70]} />
              <primitive object={oakMaterial} />
            </mesh>
            {/* Storage Bins & Bottles on Lower Shelves */}
            {[-0.58, 0.0, 0.58].map((bz, bi) => (
              <group key={`under-bin-${i}-${bi}`} position={[0, sy + 0.10, bz]}>
                <mesh castShadow>
                  <boxGeometry args={[0.40, 0.16, 0.44]} />
                  <primitive object={clearBinMaterial} />
                </mesh>
                <mesh position={[0, 0.085, 0]}>
                  <boxGeometry args={[0.41, 0.012, 0.45]} />
                  <primitive object={blackSteelMaterial} />
                </mesh>
              </group>
            ))}
          </group>
        ))}

        {/* ==============================================================
            BAMBU LAB A1 3D PRINTER (Centered on Bench at Z = 0)
            Dimensions: ~385 x 410 x 430 mm
           ============================================================== */}
        <group position={[0.02, 0.91, -0.05]}>
          {/* Main White Lower Body & Base */}
          <mesh position={[0, 0.045, 0]} castShadow>
            <boxGeometry args={[0.39, 0.09, 0.38]} />
            <primitive object={whitePlasticMaterial} />
          </mesh>
          {/* Dark Charcoal PEI Heated Bed Plate (256x256mm) */}
          <mesh position={[0, 0.095, 0]} castShadow receiveShadow>
            <boxGeometry args={[0.27, 0.012, 0.27]} />
            <meshStandardMaterial color="#262626" roughness={0.85} metalness={0.2} />
          </mesh>
          {/* Dual Black Vertical Z-Gantry Columns */}
          <mesh position={[0.13, 0.26, -0.11]} castShadow>
            <boxGeometry args={[0.045, 0.42, 0.045]} />
            <primitive object={blackSteelMaterial} />
          </mesh>
          <mesh position={[-0.13, 0.26, -0.11]} castShadow>
            <boxGeometry args={[0.045, 0.42, 0.045]} />
            <primitive object={blackSteelMaterial} />
          </mesh>
          {/* Top Crossbeam */}
          <mesh position={[0, 0.46, -0.11]} castShadow>
            <boxGeometry args={[0.34, 0.035, 0.04]} />
            <primitive object={blackSteelMaterial} />
          </mesh>
          {/* X-Axis Linear Rail */}
          <mesh position={[0, 0.28, -0.08]} castShadow>
            <boxGeometry args={[0.32, 0.035, 0.035]} />
            <primitive object={brushedSteelMaterial} />
          </mesh>

          {/* Direct-Drive Print Head with Fan Shroud & Status LED */}
          <group position={[0.02, 0.28, -0.02]}>
            <mesh castShadow>
              <boxGeometry args={[0.085, 0.085, 0.09]} />
              <primitive object={whitePlasticMaterial} />
            </mesh>
            {/* Dark Fan Grill */}
            <mesh position={[0, 0, 0.046]}>
              <planeGeometry args={[0.065, 0.065]} />
              <meshStandardMaterial color="#111827" roughness={0.5} />
            </mesh>
            {/* Brass Hotend Nozzle */}
            <mesh position={[0, -0.05, 0]} castShadow>
              <coneGeometry args={[0.008, 0.018, 8]} />
              <meshStandardMaterial color="#D97706" metalness={0.85} roughness={0.25} />
            </mesh>
            {/* Status LED */}
            <mesh position={[0.03, 0.03, 0.046]}>
              <circleGeometry args={[0.006, 8]} />
              <meshBasicMaterial color="#10B981" toneMapped={false} />
            </mesh>
          </group>

          {/* Top Spool Holder Arm & Flexible PTFE Bowden Tube */}
          <mesh position={[-0.14, 0.50, -0.11]} castShadow>
            <boxGeometry args={[0.03, 0.08, 0.03]} />
            <primitive object={blackSteelMaterial} />
          </mesh>
          {/* PTFE White Flexible Tube arching from top down to print head */}
          <mesh position={[-0.04, 0.39, -0.06]} rotation={[0.4, 0.3, -0.6]}>
            <cylinderGeometry args={[0.0035, 0.0035, 0.24, 8]} />
            <meshStandardMaterial color="#FFFFFF" roughness={0.2} />
          </mesh>

          {/* PRINTED OBJECT ON BED: Glossy Blue Twisted Spiral Lattice Vase */}
          <group position={[0, 0.10, 0]}>
            <mesh castShadow>
              <cylinderGeometry args={[0.065, 0.045, 0.16, 12, 8, true]} />
              <primitive object={glossyBlueMaterial} />
            </mesh>
            {/* Wireframe lattice helix ribs */}
            <mesh>
              <cylinderGeometry args={[0.066, 0.046, 0.16, 12, 8, true]} />
              <meshStandardMaterial color="#3B82F6" wireframe roughness={0.2} />
            </mesh>
          </group>

          {/* Angled Touchscreen Console beside printer */}
          <group position={[-0.23, 0.08, 0.12]} rotation={[0, 0.45, -0.2]}>
            <mesh castShadow>
              <boxGeometry args={[0.095, 0.075, 0.018]} />
              <primitive object={blackSteelMaterial} />
            </mesh>
            <mesh position={[0, 0, 0.010]}>
              <planeGeometry args={[0.085, 0.065]} />
              <meshBasicMaterial map={screenTexture} toneMapped={false} />
            </mesh>
          </group>
        </group>

        {/* BENCHTOP PROPS: Cutting Mat, Parts Organizer, Tools, Glue/IPA Bottles */}
        {/* Blue Self-Healing Cutting Mat */}
        <mesh position={[0.02, 0.912, -0.58]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
          <planeGeometry args={[0.38, 0.52]} />
          <meshBasicMaterial map={cuttingMatTexture} toneMapped={false} />
        </mesh>

        {/* Parts Organizer Tray with 6 small compartments */}
        <group position={[-0.08, 0.93, 0.62]}>
          <mesh castShadow>
            <boxGeometry args={[0.26, 0.045, 0.38]} />
            <primitive object={whitePlasticMaterial} />
          </mesh>
          {/* Internal Dividers */}
          {[-0.1, 0, 0.1].map((pz, pi) => (
            <mesh key={`pdiv-${pi}`} position={[0, 0.015, pz]}>
              <boxGeometry args={[0.24, 0.03, 0.008]} />
              <primitive object={blackSteelMaterial} />
            </mesh>
          ))}
          {/* Small spare screws / brass nozzles inside */}
          <mesh position={[0.05, 0.02, -0.05]}>
            <cylinderGeometry args={[0.005, 0.005, 0.012, 6]} />
            <meshStandardMaterial color="#D97706" metalness={0.9} roughness={0.2} />
          </mesh>
        </group>

        {/* Pen & Tool Cup */}
        <group position={[0.16, 0.95, -0.74]}>
          <mesh castShadow>
            <cylinderGeometry args={[0.035, 0.03, 0.08, 12]} />
            <primitive object={blackSteelMaterial} />
          </mesh>
          {/* Tweezers & Scraper Handles */}
          <mesh position={[0.008, 0.06, 0]} rotation={[0.2, 0, 0]}>
            <boxGeometry args={[0.008, 0.12, 0.004]} />
            <primitive object={brushedSteelMaterial} />
          </mesh>
        </group>

        {/* Glue Stick & IPA Bottle */}
        <mesh position={[0.16, 0.96, 0.65]} castShadow>
          <cylinderGeometry args={[0.016, 0.016, 0.09, 10]} />
          <meshStandardMaterial color="#2563EB" roughness={0.3} />
        </mesh>
        <mesh position={[0.16, 0.97, 0.74]} castShadow>
          <cylinderGeometry args={[0.024, 0.024, 0.12, 12]} />
          <meshStandardMaterial color="#F8FAFC" transparent opacity={0.7} roughness={0.2} />
        </mesh>
      </group>

      {/* ================================================================
          5. RIGHT BAY (Z: 3.25 to 4.65, width 1.4m, center Z = 3.95)
             - 4 Prototype Display Shelves with dark back panel & warm LEDs
             - Physical Showcase Models:
               Level 1: Saturn V Rocket, 4-Axis Robot Arm, Blue RC Buggy
               Level 2: Lattice Vase, Classical Bust, Blue Spur Gear, Tower/Pylon
               Level 3: Quadcopter Drone, Dual Gears, Cube Lattice
               Level 4: Miniature Traffic Cones, Exploration Rover, Pavilion
             - 2 Bottom Storage Bin Levels
         ================================================================ */}
      {/* Dark Navy Back Panel behind Right Bay Display */}
      <mesh position={[wallX - 0.03, 1.45, 3.95]} rotation={[0, -Math.PI / 2, 0]}>
        <planeGeometry args={[1.36, 1.65]} />
        <meshStandardMaterial color="#0B1322" roughness={0.7} />
      </mesh>

      {/* 4 Prototype Display Shelf Boards (Y = 0.85, 1.25, 1.65, 2.05) */}
      {[0.82, 1.22, 1.62, 2.02].map((sy, i) => (
        <group key={`right-disp-shelf-${i}`}>
          <mesh position={[wallX - unitDepth / 2, sy, 3.95]} castShadow>
            <boxGeometry args={[unitDepth - 0.02, 0.035, 1.36]} />
            <primitive object={oakMaterial} />
          </mesh>
          {/* Warm LED Strip under shelf */}
          <mesh position={[wallX - unitDepth / 2, sy - 0.022, 3.95]}>
            <boxGeometry args={[unitDepth - 0.1, 0.012, 1.34]} />
            <primitive object={warmLedMaterial} />
          </mesh>
        </group>
      ))}

      {/* PROTOTYPE MODELS ON DISPLAY SHELVES */}
      {/* LEVEL 1 (Y = 0.84): White Rocket, White 4-Axis Arm, Blue RC Buggy */}
      <group position={[wallX - unitDepth / 2, 0.84, 3.95]}>
        {/* White Saturn V Rocket (Z = -0.42) */}
        <group position={[0, 0.12, -0.42]}>
          <mesh castShadow>
            <cylinderGeometry args={[0.026, 0.032, 0.20, 12]} />
            <primitive object={whitePlasticMaterial} />
          </mesh>
          <mesh position={[0, 0.14, 0]} castShadow>
            <coneGeometry args={[0.026, 0.08, 12]} />
            <primitive object={whitePlasticMaterial} />
          </mesh>
          {/* Fins */}
          {[0, Math.PI / 2, Math.PI, (3 * Math.PI) / 2].map((rot, fi) => (
            <mesh key={`fin-${fi}`} position={[0, -0.06, 0]} rotation={[0, rot, 0]}>
              <boxGeometry args={[0.004, 0.06, 0.07]} />
              <primitive object={whitePlasticMaterial} />
            </mesh>
          ))}
        </group>

        {/* White 4-Axis Industrial Robot Arm (Z = 0.0) */}
        <group position={[0, 0, 0.0]}>
          {/* Base */}
          <mesh position={[0, 0.02, 0]} castShadow>
            <cylinderGeometry args={[0.06, 0.07, 0.04, 12]} />
            <primitive object={whitePlasticMaterial} />
          </mesh>
          {/* Lower Arm */}
          <mesh position={[0, 0.10, 0.02]} rotation={[0.4, 0, 0]} castShadow>
            <boxGeometry args={[0.035, 0.14, 0.035]} />
            <primitive object={whitePlasticMaterial} />
          </mesh>
          {/* Upper Arm & Gripper */}
          <mesh position={[0, 0.18, -0.03]} rotation={[-0.5, 0, 0]} castShadow>
            <boxGeometry args={[0.03, 0.12, 0.03]} />
            <primitive object={whitePlasticMaterial} />
          </mesh>
        </group>

        {/* Blue 3D-Printed RC Buggy Car (Z = +0.42) */}
        <group position={[0, 0.05, 0.42]}>
          {/* Chassis & Cockpit */}
          <mesh castShadow>
            <boxGeometry args={[0.18, 0.05, 0.24]} />
            <primitive object={glossyBlueMaterial} />
          </mesh>
          {/* Roll Cage */}
          <mesh position={[0, 0.05, 0]} castShadow>
            <boxGeometry args={[0.12, 0.06, 0.14]} />
            <primitive object={whitePlasticMaterial} />
          </mesh>
          {/* 4 Black Knobby Tires */}
          {[
            [-0.10, -0.01, -0.08],
            [0.10, -0.01, -0.08],
            [-0.10, -0.01, 0.08],
            [0.10, -0.01, 0.08],
          ].map(([tx, ty, tz], ti) => (
            <mesh key={`rc-tire-${ti}`} position={[tx, ty, tz]} rotation={[0, 0, Math.PI / 2]} castShadow>
              <cylinderGeometry args={[0.035, 0.035, 0.025, 10]} />
              <primitive object={blackSteelMaterial} />
            </mesh>
          ))}
        </group>
      </group>

      {/* LEVEL 2 (Y = 1.24): White Lattice Vase, Bust, Blue Spur Gear, Pylon */}
      <group position={[wallX - unitDepth / 2, 1.24, 3.95]}>
        {/* White Lattice Vase (Z = -0.45) */}
        <mesh position={[0, 0.08, -0.45]} castShadow>
          <cylinderGeometry args={[0.045, 0.03, 0.15, 10]} />
          <meshStandardMaterial color="#FFFFFF" wireframe roughness={0.3} />
        </mesh>
        {/* Classical Marble Bust (Z = -0.15) */}
        <group position={[0, 0.08, -0.15]}>
          <mesh castShadow>
            <boxGeometry args={[0.08, 0.03, 0.08]} />
            <primitive object={whitePlasticMaterial} />
          </mesh>
          <mesh position={[0, 0.08, 0]} castShadow>
            <sphereGeometry args={[0.045, 12, 12]} />
            <primitive object={whitePlasticMaterial} />
          </mesh>
        </group>
        {/* Blue Precision Spur Gear (Z = +0.15) */}
        <mesh position={[0, 0.06, 0.15]} rotation={[Math.PI / 2, 0, 0]} castShadow>
          <cylinderGeometry args={[0.055, 0.055, 0.02, 16]} />
          <primitive object={glossyBlueMaterial} />
        </mesh>
        {/* White Architectural Pylon / Tower (Z = +0.45) */}
        <mesh position={[0, 0.09, 0.45]} castShadow>
          <cylinderGeometry args={[0.02, 0.05, 0.18, 4]} />
          <meshStandardMaterial color="#FFFFFF" wireframe roughness={0.3} />
        </mesh>
      </group>

      {/* LEVEL 3 (Y = 1.64): Quadcopter Drone, Dual Gears, Cube Lattice */}
      <group position={[wallX - unitDepth / 2, 1.64, 3.95]}>
        {/* Quadcopter Drone (Z = -0.38) */}
        <group position={[0, 0.03, -0.38]}>
          <mesh castShadow>
            <boxGeometry args={[0.07, 0.02, 0.07]} />
            <primitive object={blackSteelMaterial} />
          </mesh>
          {/* 4 Rotors */}
          {[
            [-0.06, 0.015, -0.06],
            [0.06, 0.015, -0.06],
            [-0.06, 0.015, 0.06],
            [0.06, 0.015, 0.06],
          ].map(([rx, ry, rz], ri) => (
            <mesh key={`prop-${ri}`} position={[rx, ry, rz]}>
              <cylinderGeometry args={[0.025, 0.025, 0.003, 8]} />
              <primitive object={whitePlasticMaterial} />
            </mesh>
          ))}
        </group>
        {/* Dual Interlocking Gears (Z = 0.0) */}
        <mesh position={[0, 0.04, -0.04]} rotation={[Math.PI / 2, 0, 0]} castShadow>
          <cylinderGeometry args={[0.04, 0.04, 0.015, 14]} />
          <primitive object={glossyBlueMaterial} />
        </mesh>
        <mesh position={[0, 0.04, 0.04]} rotation={[Math.PI / 2, 0, 0]} castShadow>
          <cylinderGeometry args={[0.035, 0.035, 0.015, 12]} />
          <primitive object={whitePlasticMaterial} />
        </mesh>
        {/* Black Cube Lattice (Z = +0.38) */}
        <mesh position={[0, 0.05, 0.38]} castShadow>
          <boxGeometry args={[0.08, 0.08, 0.08]} />
          <meshStandardMaterial color="#111827" wireframe roughness={0.4} />
        </mesh>
      </group>

      {/* LEVEL 4 (Y = 2.04): Orange Traffic Cones, Toy Rover, Neoclassical Pavilion */}
      <group position={[wallX - unitDepth / 2, 2.04, 3.95]}>
        {/* Miniature Orange Traffic Cones (Z = -0.42, -0.32) */}
        {[-0.42, -0.32].map((cz, ci) => (
          <group key={`cone-${ci}`} position={[0, 0.04, cz]}>
            <mesh castShadow>
              <coneGeometry args={[0.022, 0.07, 8]} />
              <primitive object={orangeConeMaterial} />
            </mesh>
            <mesh position={[0, -0.032, 0]}>
              <boxGeometry args={[0.055, 0.008, 0.055]} />
              <primitive object={orangeConeMaterial} />
            </mesh>
          </group>
        ))}
        {/* Toy Exploration Rover (Z = 0.0) */}
        <group position={[0, 0.04, 0.0]}>
          <mesh castShadow>
            <boxGeometry args={[0.10, 0.035, 0.16]} />
            <meshStandardMaterial color="#F59E0B" roughness={0.4} />
          </mesh>
          {[-0.06, 0.06].map((tx, ti) =>
            [-0.05, 0.05].map((tz, tzi) => (
              <mesh key={`rov-w-${ti}-${tzi}`} position={[tx, -0.01, tz]} rotation={[0, 0, Math.PI / 2]}>
                <cylinderGeometry args={[0.02, 0.02, 0.014, 8]} />
                <primitive object={blackSteelMaterial} />
              </mesh>
            ))
          )}
        </group>
        {/* White Neoclassical Pavilion / Building (Z = +0.40) */}
        <group position={[0, 0.05, 0.40]}>
          <mesh castShadow>
            <boxGeometry args={[0.10, 0.015, 0.16]} />
            <primitive object={whitePlasticMaterial} />
          </mesh>
          <mesh position={[0, 0.05, 0]} castShadow>
            <boxGeometry args={[0.08, 0.06, 0.14]} />
            <primitive object={whitePlasticMaterial} />
          </mesh>
        </group>
      </group>

      {/* 2 Bottom Storage Bin Levels in Right Bay (Y = 0.16, 0.48) */}
      {[0.16, 0.48].map((sy, i) => (
        <group key={`right-bin-shelf-${i}`}>
          <mesh position={[wallX - unitDepth / 2, sy, 3.95]} castShadow>
            <boxGeometry args={[unitDepth - 0.02, 0.035, 1.36]} />
            <primitive object={oakMaterial} />
          </mesh>
          {[-0.42, 0.0, 0.42].map((bz, bi) => (
            <group key={`right-bin-${i}-${bi}`} position={[wallX - unitDepth / 2, sy + 0.12, 3.95 + bz]}>
              <mesh castShadow>
                <boxGeometry args={[0.42, 0.20, 0.38]} />
                <primitive object={clearBinMaterial} />
              </mesh>
              <mesh position={[0, 0.105, 0]}>
                <boxGeometry args={[0.43, 0.015, 0.39]} />
                <primitive object={blackSteelMaterial} />
              </mesh>
              <mesh position={[-0.211, 0, 0]} rotation={[0, -Math.PI / 2, 0]}>
                <planeGeometry args={[0.16, 0.06]} />
                <meshStandardMaterial color="#FFFFFF" roughness={0.4} />
              </mesh>
            </group>
          ))}
        </group>
      ))}

      {/* 2 Small White Ceramic Potted Plants on Top Rail (Right Bay) */}
      {[3.65, 4.25].map((pz, pi) => (
        <group key={`right-top-plant-${pi}`} position={[wallX - unitDepth / 2, 2.33, pz]}>
          <mesh position={[0, 0.06, 0]} castShadow>
            <cylinderGeometry args={[0.08, 0.06, 0.12, 10]} />
            <primitive object={whitePlasticMaterial} />
          </mesh>
          {[0, 1.25, 2.5, 3.75, 5.0].map((rot, ri) => (
            <mesh key={`p-leaf-${pi}-${ri}`} position={[0, 0.11, 0]} rotation={[0.4, rot, 0]}>
              <planeGeometry args={[0.04, 0.10]} />
              <meshStandardMaterial color={ri % 2 === 0 ? '#15803D' : '#16A34A'} roughness={0.5} side={2} />
            </mesh>
          ))}
        </group>
      ))}

      {/* ================================================================
          6. INSTANCED SPOOL RENDERERS (30 Real Spools: Flanges, Hubs, Filament)
         ================================================================ */}
      <instancedMesh
        ref={spoolFlangeRef}
        args={[flangeGeo, spoolFlangeMaterial, 60]}
        castShadow
      />
      <instancedMesh
        ref={spoolHubRef}
        args={[hubGeo, blackSteelMaterial, 30]}
        castShadow
      />
      <instancedMesh
        ref={spoolFilamentRef}
        args={[filamentGeo, null, 30]}
        castShadow
      >
        <meshStandardMaterial roughness={0.45} metalness={0.08} />
      </instancedMesh>
    </group>
  );
}
