import React, { useMemo } from 'react';
import * as THREE from 'three';
import { getAlphaWallSignTexture, getBlueAbstractWallpaper } from './alphaTextures';

/**
 * Lab Alpha Right Wall: Designing Area & Coding Area (Revision 5)
 * Exactly matches reference render:
 * - Navy paneled feature wall section with signature wall plates: "DESIGNING AREA" and "CODING AREA"
 * - Long light-oak desk with black steel legs
 * - 2 Workstations (Designing PC + Coding PC) with radiant blue abstract wallpapers, keyboards, mice, desk plants
 * - Ergonomic black mesh office chairs tucked in
 * - Designing PC positioned adjacent to the back shelving to form unified "Design & Print Corner"
 * - Leaves door to Beta (Z: 4.5 - 7.5) completely open and unobstructed
 */
export function AlphaRightWall() {
  const signDesigning = useMemo(() => getAlphaWallSignTexture('DESIGNING AREA'), []);
  const signCoding = useMemo(() => getAlphaWallSignTexture('CODING AREA'), []);
  const blueWallpaper = useMemo(() => getBlueAbstractWallpaper(), []);

  const oakMaterial = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: '#D4B996',
        roughness: 0.5,
        metalness: 0.1
      }),
    []
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

  const meshChairMaterial = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: '#1A202C',
        roughness: 0.8,
        metalness: 0.1
      }),
    []
  );

  return (
    <group name="alpha-right-wall">
      {/* =========================================================================
          1. NAVY FEATURE WALL SECTION (X = 15.88, Y = 1.8, Z in [0.4, 4.4])
         ========================================================================= */}
      <mesh position={[15.88, 1.8, 2.4]} rotation={[0, -Math.PI / 2, 0]} receiveShadow>
        <planeGeometry args={[4.0, 3.6]} />
        <meshStandardMaterial color="#071B3A" roughness={0.4} metalness={0.2} />
      </mesh>

      {/* Blue LED Accent Line along top of Navy Wall Section */}
      <mesh position={[15.86, 3.38, 2.4]} rotation={[0, -Math.PI / 2, 0]}>
        <boxGeometry args={[3.9, 0.035, 0.02]} />
        <meshStandardMaterial color="#1677FF" emissive="#1677FF" emissiveIntensity={3} />
      </mesh>

      {/* Signature Wall Plates Mounted High on Navy Wall (Y = 2.4m) */}
      {/* 1. DESIGNING AREA Plate (Z = 1.6, nearest to back shelving) */}
      <mesh position={[15.85, 2.4, 1.6]} rotation={[0, -Math.PI / 2, 0]}>
        <planeGeometry args={[1.5, 0.7]} />
        <meshBasicMaterial map={signDesigning} toneMapped={false} />
      </mesh>

      {/* 2. CODING AREA Plate (Z = 3.2) */}
      <mesh position={[15.85, 2.4, 3.2]} rotation={[0, -Math.PI / 2, 0]}>
        <planeGeometry args={[1.5, 0.7]} />
        <meshBasicMaterial map={signCoding} toneMapped={false} />
      </mesh>

      {/* =========================================================================
          2. LONG LIGHT-OAK WORKBENCH DESK (X = 15.42, Y = 0.74, Z = 2.4, Length = 3.6m)
         ========================================================================= */}
      <group position={[15.42, 0, 2.4]}>
        {/* Table Top */}
        <mesh position={[0, 0.74, 0]} castShadow receiveShadow>
          <boxGeometry args={[0.75, 0.05, 3.6]} />
          <primitive object={oakMaterial} />
        </mesh>

        {/* Black Steel Legs */}
        {[-1.65, 0, 1.65].map((lz, lIdx) => (
          <group key={`right-leg-${lIdx}`} position={[0, 0.36, lz]}>
            {/* Front Leg */}
            <mesh position={[-0.32, 0, 0]} castShadow>
              <boxGeometry args={[0.04, 0.72, 0.04]} />
              <primitive object={blackMetalMaterial} />
            </mesh>
            {/* Back Leg */}
            <mesh position={[0.32, 0, 0]} castShadow>
              <boxGeometry args={[0.04, 0.72, 0.04]} />
              <primitive object={blackMetalMaterial} />
            </mesh>
          </group>
        ))}

        {/* -------------------------------------------------------------
            WORKSTATION 1: DESIGNING PC (Z = 1.6, local Z = -0.8)
           ------------------------------------------------------------- */}
        <group position={[0.08, 0.765, -0.8]}>
          {/* Curved Ultra-Wide Monitor Stand */}
          <mesh position={[0.18, 0.01, 0]}>
            <cylinderGeometry args={[0.12, 0.14, 0.02, 16]} />
            <primitive object={blackMetalMaterial} />
          </mesh>
          <mesh position={[0.18, 0.16, 0]}>
            <boxGeometry args={[0.03, 0.32, 0.05]} />
            <primitive object={blackMetalMaterial} />
          </mesh>
          {/* Monitor Display Screen (Facing -X towards central aisle) */}
          <group position={[0.12, 0.28, 0]} rotation={[0, -Math.PI / 2, 0]}>
            {/* Bezel Frame */}
            <mesh castShadow>
              <boxGeometry args={[0.96, 0.44, 0.025]} />
              <primitive object={blackMetalMaterial} />
            </mesh>
            {/* Screen with Blue Abstract Wallpaper */}
            <mesh position={[0, 0, 0.015]}>
              <planeGeometry args={[0.94, 0.42]} />
              <meshBasicMaterial map={blueWallpaper} />
            </mesh>
          </group>

          {/* Slim Keyboard & Mouse */}
          <mesh position={[-0.08, 0.01, 0]}>
            <boxGeometry args={[0.14, 0.015, 0.44]} />
            <meshStandardMaterial color="#0F172A" />
          </mesh>
          <mesh position={[-0.08, 0.01, 0.3]}>
            <boxGeometry args={[0.1, 0.02, 0.06]} />
            <meshStandardMaterial color="#1E293B" />
          </mesh>

          {/* Desk Succulent */}
          <group position={[0.15, 0.02, 0.6]}>
            <mesh position={[0, 0.04, 0]}>
              <cylinderGeometry args={[0.045, 0.035, 0.08, 10]} />
              <meshStandardMaterial color="#FFFFFF" roughness={0.3} />
            </mesh>
            <mesh position={[0, 0.1, 0]}>
              <sphereGeometry args={[0.05, 8, 8]} />
              <meshStandardMaterial color="#16A34A" roughness={0.7} />
            </mesh>
          </group>

          {/* Mini Tower PC under desk */}
          <mesh position={[0.15, -0.42, 0.5]} castShadow>
            <boxGeometry args={[0.2, 0.42, 0.42]} />
            <meshStandardMaterial color="#0B0F17" metalness={0.7} roughness={0.3} />
          </mesh>
        </group>

        {/* -------------------------------------------------------------
            WORKSTATION 2: CODING PC (Z = 3.2, local Z = 0.8)
           ------------------------------------------------------------- */}
        <group position={[0.08, 0.765, 0.8]}>
          {/* Curved Ultra-Wide Monitor Stand */}
          <mesh position={[0.18, 0.01, 0]}>
            <cylinderGeometry args={[0.12, 0.14, 0.02, 16]} />
            <primitive object={blackMetalMaterial} />
          </mesh>
          <mesh position={[0.18, 0.16, 0]}>
            <boxGeometry args={[0.03, 0.32, 0.05]} />
            <primitive object={blackMetalMaterial} />
          </mesh>
          {/* Monitor Display Screen */}
          <group position={[0.12, 0.28, 0]} rotation={[0, -Math.PI / 2, 0]}>
            <mesh castShadow>
              <boxGeometry args={[0.96, 0.44, 0.025]} />
              <primitive object={blackMetalMaterial} />
            </mesh>
            <mesh position={[0, 0, 0.015]}>
              <planeGeometry args={[0.94, 0.42]} />
              <meshBasicMaterial map={blueWallpaper} />
            </mesh>
          </group>

          {/* Slim Keyboard & Mouse */}
          <mesh position={[-0.08, 0.01, 0]}>
            <boxGeometry args={[0.14, 0.015, 0.44]} />
            <meshStandardMaterial color="#0F172A" />
          </mesh>
          <mesh position={[-0.08, 0.01, 0.3]}>
            <boxGeometry args={[0.1, 0.02, 0.06]} />
            <meshStandardMaterial color="#1E293B" />
          </mesh>

          {/* Desk Succulent */}
          <group position={[0.15, 0.02, 0.6]}>
            <mesh position={[0, 0.04, 0]}>
              <cylinderGeometry args={[0.045, 0.035, 0.08, 10]} />
              <meshStandardMaterial color="#FFFFFF" roughness={0.3} />
            </mesh>
            <mesh position={[0, 0.1, 0]}>
              <sphereGeometry args={[0.05, 8, 8]} />
              <meshStandardMaterial color="#16A34A" roughness={0.7} />
            </mesh>
          </group>

          {/* Mini Tower PC under desk */}
          <mesh position={[0.15, -0.42, 0.5]} castShadow>
            <boxGeometry args={[0.2, 0.42, 0.42]} />
            <meshStandardMaterial color="#0B0F17" metalness={0.7} roughness={0.3} />
          </mesh>
        </group>
      </group>

      {/* =========================================================================
          3. ERGONOMIC BLACK MESH OFFICE CHAIRS (2 Chairs tucked facing the PCs)
         ========================================================================= */}
      {[1.6, 3.2].map((cz, cIdx) => (
        <group key={`mesh-chair-${cIdx}`} position={[14.7, 0, cz]} rotation={[0, -Math.PI / 2, 0]}>
          {/* 5-Star Caster Base */}
          <mesh position={[0, 0.05, 0]}>
            <cylinderGeometry args={[0.28, 0.28, 0.04, 5]} />
            <primitive object={blackMetalMaterial} />
          </mesh>
          {/* Hydraulic Gas Cylinder */}
          <mesh position={[0, 0.24, 0]}>
            <cylinderGeometry args={[0.03, 0.03, 0.34, 10]} />
            <meshStandardMaterial color="#94A3B8" metalness={0.9} roughness={0.2} />
          </mesh>
          {/* Ergonomic Mesh Seat Cushion */}
          <mesh position={[0, 0.45, 0]} castShadow>
            <boxGeometry args={[0.5, 0.07, 0.48]} />
            <primitive object={meshChairMaterial} />
          </mesh>
          {/* Mesh Lumbar Backrest */}
          <mesh position={[0, 0.78, -0.22]} rotation={[0.08, 0, 0]} castShadow>
            <boxGeometry args={[0.46, 0.55, 0.04]} />
            <primitive object={meshChairMaterial} />
          </mesh>
          {/* T-Armrests */}
          <mesh position={[-0.26, 0.62, -0.05]}>
            <boxGeometry args={[0.05, 0.22, 0.24]} />
            <primitive object={blackMetalMaterial} />
          </mesh>
          <mesh position={[0.26, 0.62, -0.05]}>
            <boxGeometry args={[0.05, 0.22, 0.24]} />
            <primitive object={blackMetalMaterial} />
          </mesh>
        </group>
      ))}
    </group>
  );
}
