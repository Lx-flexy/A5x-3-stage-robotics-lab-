import React, { useMemo } from 'react';
import * as THREE from 'three';
import { useStore } from '../store/useStore';
import {
  getPlazaTilesTexture,
  getWalkwayStoneTexture,
  getA5XInlayTexture,
  getWayfindingTotemTexture,
  getA5XFlagTexture
} from './exteriorTextures';

/**
 * High-Performance Entrance Plaza & Exterior Landscaping (Revision 18)
 * - 14m deep paved light-grey stone plaza (Z in [12, 26], X in [-10, 70])
 * - Flush 3.0m wide walkway from spawn [8, 0, 19] to door [8, 0, 12] with blue LED inlay
 * - Surrounding lush green lawn (#7DB36A) - NO BLACK GROUND ANYWHERE
 * - 6 Architectural trees, facade planters, 3 benches, 2 bollard lights, flagpole, wayfinding board
 * - Distant skyline silhouette at 80m and soft horizon
 */
export function EntrancePlaza() {
  const activeLabId = useStore((state) => state.activeLabId);
  const viewMode = useStore((state) => state.viewMode);

  // Performance optimization: hide heavy exterior props when deep inside Beta, Gamma, or Arena
  const showDetailedProps =
    viewMode !== 'firstPerson' ||
    activeLabId === 'exterior' ||
    activeLabId === 'alpha';

  // Shared Materials
  const materials = useMemo(() => {
    // 1. Plaza Paved Tiles
    const plazaTileMat = new THREE.MeshStandardMaterial({
      map: getPlazaTilesTexture(),
      roughness: 0.6,
      metalness: 0.05
    });

    // 2. Flush Walkway Material
    const walkwayMat = new THREE.MeshStandardMaterial({
      map: getWalkwayStoneTexture(),
      roughness: 0.5,
      metalness: 0.05
    });

    // 3. Electric Blue Inlay LED Lines
    const electricBlueLed = new THREE.MeshStandardMaterial({
      color: new THREE.Color('#1677FF'),
      emissive: new THREE.Color('#1677FF'),
      emissiveIntensity: 2.2,
      roughness: 0.2
    });

    // 4. Surrounding Lawn Grass (#7DB36A)
    const lawnGrass = new THREE.MeshStandardMaterial({
      color: new THREE.Color('#7DB36A'),
      roughness: 0.9,
      metalness: 0.0
    });

    // 5. Dark Stone Curb Trim (#475569)
    const curbStone = new THREE.MeshStandardMaterial({
      color: new THREE.Color('#334155'),
      roughness: 0.7,
      metalness: 0.1
    });

    // 6. Tree Trunk Wood
    const treeTrunk = new THREE.MeshStandardMaterial({
      color: new THREE.Color('#4A3728'),
      roughness: 0.85
    });

    // 7. Tree Foliage Greens
    const foliageDark = new THREE.MeshStandardMaterial({
      color: new THREE.Color('#367A3B'),
      roughness: 0.8
    });
    const foliageLight = new THREE.MeshStandardMaterial({
      color: new THREE.Color('#4E9354'),
      roughness: 0.8
    });

    // 8. Stainless Steel Flagpole / Hardware
    const stainlessSteel = new THREE.MeshStandardMaterial({
      color: new THREE.Color('#E2E8F0'),
      roughness: 0.15,
      metalness: 0.95
    });

    // 9. Modern Bench Teak Wood
    const benchWood = new THREE.MeshStandardMaterial({
      color: new THREE.Color('#9A6735'),
      roughness: 0.6,
      metalness: 0.05
    });

    // 10. Bench / Bollard Black Steel
    const blackSteel = new THREE.MeshStandardMaterial({
      color: new THREE.Color('#1B1F27'),
      roughness: 0.4,
      metalness: 0.8
    });

    // 11. Warm Bollard Light Lens
    const bollardLight = new THREE.MeshStandardMaterial({
      color: new THREE.Color('#FFF8EB'),
      emissive: new THREE.Color('#FFE4B5'),
      emissiveIntensity: 2.0,
      roughness: 0.2
    });

    // 12. Distant Skyline Silhouettes (#9BB7D4)
    const distantSkyline = new THREE.MeshBasicMaterial({
      color: new THREE.Color('#A8C2DC'),
      fog: true
    });

    return {
      plazaTileMat,
      walkwayMat,
      electricBlueLed,
      lawnGrass,
      curbStone,
      treeTrunk,
      foliageDark,
      foliageLight,
      stainlessSteel,
      benchWood,
      blackSteel,
      bollardLight,
      distantSkyline
    };
  }, []);

  // Textures
  const a5xInlayTex = useMemo(() => getA5XInlayTexture(), []);
  const totemTex = useMemo(() => getWayfindingTotemTexture(), []);
  const flagTex = useMemo(() => getA5XFlagTexture(), []);

  // 6 Tree positions [x, z]
  const treePositions = [
    [2.5, 18.0],
    [13.5, 18.0],
    [-4.0, 21.0],
    [21.0, 21.0],
    [35.0, 20.0],
    [52.0, 20.0]
  ];

  // 3 Benches [x, z, rotY]
  const benchPositions = [
    [3.0, 16.0, 0],
    [13.0, 16.0, 0],
    [24.0, 17.5, -0.2]
  ];

  // Planter positions along facade
  const planterPositions = [0.8, 5.5, 10.5, 15.5, 31.5, 47.5, 59.2];

  return (
    <group name="a5x-entrance-plaza">
      {/* =========================================================================
          1. GROUND & LAWN (NO BLACK GROUND ANYWHERE)
         ========================================================================= */}
      {/* Expansive Surrounding Lawn Area (X: -40 to 100, Z: 10 to 75, Y: -0.04m) */}
      <mesh position={[30.0, -0.04, 42.0]} receiveShadow material={materials.lawnGrass}>
        <boxGeometry args={[140.0, 0.08, 65.0]} />
      </mesh>

      {/* Main Paved Stone Plaza Deck (14m deep, Z in [12, 26], X in [-10, 70], Y: 0.0m) */}
      <mesh position={[30.0, -0.005, 19.0]} receiveShadow material={materials.plazaTileMat}>
        <boxGeometry args={[80.0, 0.05, 14.0]} />
      </mesh>

      {/* Raised Dark Stone Curb Trim around Plaza Perimeter */}
      {/* South Curb (Z = 26.0) */}
      <mesh position={[30.0, 0.02, 26.0]} material={materials.curbStone}>
        <boxGeometry args={[80.2, 0.08, 0.2]} />
      </mesh>
      {/* West Curb (X = -10.0) */}
      <mesh position={[-10.0, 0.02, 19.0]} material={materials.curbStone}>
        <boxGeometry args={[0.2, 0.08, 14.2]} />
      </mesh>
      {/* East Curb (X = 70.0) */}
      <mesh position={[70.0, 0.02, 19.0]} material={materials.curbStone}>
        <boxGeometry args={[0.2, 0.08, 14.2]} />
      </mesh>

      {/* =========================================================================
          2. FLUSH APPROACH WALKWAY (From Spawn [8, 0, 19] to Door [8, 0, 12])
         ========================================================================= */}
      <group position={[8.0, 0, 15.5]}>
        {/* Walkway Slab (3.0m wide, 7.0m length, sits flush at Y = 0.001m) */}
        <mesh position={[0, 0.001, 0]} receiveShadow material={materials.walkwayMat}>
          <boxGeometry args={[3.0, 0.002, 7.0]} />
        </mesh>

        {/* Inset Electric-Blue LED Edge Lines (10mm thick, along both sides) */}
        {/* Left LED Runner (x = -1.5) */}
        <mesh position={[-1.5, 0.003, 0]} material={materials.electricBlueLed}>
          <boxGeometry args={[0.02, 0.004, 7.0]} />
        </mesh>
        {/* Right LED Runner (x = +1.5) */}
        <mesh position={[1.5, 0.003, 0]} material={materials.electricBlueLed}>
          <boxGeometry args={[0.02, 0.004, 7.0]} />
        </mesh>

        {/* Circular A5X Bronze/Steel Inlay Medal near Entrance (Z = 13.5 -> local Z = -2.0) */}
        <mesh position={[0, 0.004, -2.0]} rotation={[-Math.PI / 2, 0, 0]}>
          <circleGeometry args={[0.65, 32]} />
          <meshBasicMaterial map={a5xInlayTex} toneMapped={false} />
        </mesh>
      </group>

      {/* Spawn Point Marker Ring at [8, 0, 19] */}
      <group position={[8.0, 0.003, 19.0]}>
        <mesh rotation={[-Math.PI / 2, 0, 0]} material={materials.electricBlueLed}>
          <ringGeometry args={[0.5, 0.58, 32]} />
        </mesh>
      </group>

      {/* =========================================================================
          3. LANDSCAPING & OUTDOOR ASSETS (Optimized, shown when near exterior)
         ========================================================================= */}
      {showDetailedProps && (
        <>
          {/* 3.1 Six Architectural Trees */}
          {treePositions.map(([tx, tz], i) => (
            <group key={`tree-${i}`} position={[tx, 0, tz]}>
              {/* Stone Tree Grate at Base */}
              <mesh position={[0, 0.004, 0]} rotation={[-Math.PI / 2, 0, 0]} material={materials.curbStone}>
                <ringGeometry args={[0.3, 0.8, 16]} />
              </mesh>
              {/* Trunk */}
              <mesh position={[0, 1.4, 0]} material={materials.treeTrunk}>
                <cylinderGeometry args={[0.12, 0.18, 2.8, 8]} />
              </mesh>
              {/* Lower Foliage Cluster */}
              <mesh position={[0, 2.6, 0]} material={materials.foliageDark}>
                <dodecahedronGeometry args={[1.1, 1]} />
              </mesh>
              {/* Mid Foliage Cluster */}
              <mesh position={[0.2, 3.2, 0.1]} material={materials.foliageLight}>
                <dodecahedronGeometry args={[0.9, 1]} />
              </mesh>
              {/* Top Foliage Cluster */}
              <mesh position={[-0.1, 3.8, -0.1]} material={materials.foliageDark}>
                <dodecahedronGeometry args={[0.7, 1]} />
              </mesh>
            </group>
          ))}

          {/* 3.2 Facade Modern Stone Planters */}
          {planterPositions.map((px, i) => (
            <group key={`facade-planter-${i}`} position={[px, 0, 12.75]}>
              {/* Rectangular Stone Planter Box */}
              <mesh position={[0, 0.25, 0]} material={materials.curbStone}>
                <boxGeometry args={[1.2, 0.5, 0.6]} />
              </mesh>
              {/* Soil */}
              <mesh position={[0, 0.48, 0]} material={materials.curbStone}>
                <boxGeometry args={[1.1, 0.05, 0.5]} />
              </mesh>
              {/* Lush Boxwood Hedge Shrub */}
              <mesh position={[0, 0.72, 0]} material={materials.foliageDark}>
                <boxGeometry args={[1.05, 0.45, 0.45]} />
              </mesh>
            </group>
          ))}

          {/* 3.3 Three Modern Park Benches */}
          {benchPositions.map(([bx, bz, rotY], i) => (
            <group key={`bench-${i}`} position={[bx, 0, bz]} rotation={[0, rotY, 0]}>
              {/* Black Steel Legs */}
              <mesh position={[-0.7, 0.22, 0]} material={materials.blackSteel}>
                <boxGeometry args={[0.08, 0.44, 0.5]} />
              </mesh>
              <mesh position={[0.7, 0.22, 0]} material={materials.blackSteel}>
                <boxGeometry args={[0.08, 0.44, 0.5]} />
              </mesh>
              {/* Wood Slats Seat */}
              {[-0.16, 0, 0.16].map((sz) => (
                <mesh key={`slat-${sz}`} position={[0, 0.46, sz]} material={materials.benchWood}>
                  <boxGeometry args={[1.6, 0.04, 0.12]} />
                </mesh>
              ))}
              {/* Bench Backrest */}
              <mesh position={[0, 0.75, -0.22]} material={materials.benchWood}>
                <boxGeometry args={[1.6, 0.24, 0.04]} />
              </mesh>
            </group>
          ))}

          {/* 3.4 Two Modern Bollard Lights Flanking Walkway */}
          {[6.0, 10.0].map((bx) => (
            <group key={`bollard-${bx}`} position={[bx, 0, 16.8]}>
              {/* Lower Body */}
              <mesh position={[0, 0.4, 0]} material={materials.blackSteel}>
                <cylinderGeometry args={[0.08, 0.08, 0.8, 16]} />
              </mesh>
              {/* Warm Emissive Ring */}
              <mesh position={[0, 0.75, 0]} material={materials.bollardLight}>
                <cylinderGeometry args={[0.082, 0.082, 0.08, 16]} />
              </mesh>
              {/* Cap */}
              <mesh position={[0, 0.82, 0]} material={materials.blackSteel}>
                <cylinderGeometry args={[0.09, 0.09, 0.06, 16]} />
              </mesh>
            </group>
          ))}

          {/* 3.5 Stainless Steel Flagpole with A5X Flag at [13.0, 0, 21.0] */}
          <group position={[13.0, 0, 21.0]}>
            {/* Base Plinth */}
            <mesh position={[0, 0.1, 0]} material={materials.curbStone}>
              <cylinderGeometry args={[0.3, 0.35, 0.2, 16]} />
            </mesh>
            {/* Pole (6.5m height) */}
            <mesh position={[0, 3.35, 0]} material={materials.stainlessSteel}>
              <cylinderGeometry args={[0.035, 0.06, 6.5, 16]} />
            </mesh>
            {/* Gold Top Ball */}
            <mesh position={[0, 6.62, 0]} material={materials.bollardLight}>
              <sphereGeometry args={[0.08, 16, 16]} />
            </mesh>
            {/* Waving A5X Flag (1.8m wide, 1.0m tall) */}
            <mesh position={[0.92, 5.8, 0]}>
              <planeGeometry args={[1.8, 1.0]} />
              <meshBasicMaterial map={flagTex} side={THREE.DoubleSide} toneMapped={false} />
            </mesh>
          </group>

          {/* 3.6 Freestanding Wayfinding Board Totem at [4.5, 0, 18.5] */}
          <group position={[4.5, 0, 18.5]}>
            {/* Concrete Plinth Base */}
            <mesh position={[0, 0.12, 0]} material={materials.curbStone}>
              <boxGeometry args={[1.4, 0.24, 0.5]} />
            </mesh>
            {/* Main Totem Board */}
            <mesh position={[0, 1.25, 0]}>
              <boxGeometry args={[1.2, 2.0, 0.14]} />
              <meshStandardMaterial color="#071B3A" roughness={0.4} metalness={0.2} />
            </mesh>
            {/* Front Graphic Face */}
            <mesh position={[0, 1.25, 0.075]}>
              <planeGeometry args={[1.16, 1.96]} />
              <meshBasicMaterial map={totemTex} toneMapped={false} />
            </mesh>
            {/* Blue LED Accent Line */}
            <mesh position={[-0.58, 1.25, 0.08]} material={materials.electricBlueLed}>
              <boxGeometry args={[0.02, 1.96, 0.01]} />
            </mesh>
          </group>

          {/* 3.7 Low Perimeter Boundary Hedge along Z = 26.0 */}
          {[-8, 0, 8, 16, 24, 32, 40, 48, 56, 64].map((hx) => (
            <mesh key={`hedge-${hx}`} position={[hx + 3, 0.45, 26.3]} material={materials.foliageDark}>
              <boxGeometry args={[7.8, 0.9, 0.6]} />
            </mesh>
          ))}

          {/* 3.8 Distant City Skyline Silhouettes at 80m (Z = 85.0) */}
          {[-20, 0, 20, 40, 60, 80].map((sx, idx) => {
            const h = 18 + (idx % 3) * 8;
            const w = 12 + (idx % 2) * 6;
            return (
              <mesh key={`skyline-${idx}`} position={[sx, h / 2, 85.0]} material={materials.distantSkyline}>
                <boxGeometry args={[w, h, 2]} />
              </mesh>
            );
          })}
        </>
      )}
    </group>
  );
}
