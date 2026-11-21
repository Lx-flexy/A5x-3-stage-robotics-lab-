import React, { useMemo } from 'react';
import * as THREE from 'three';
import { useStore } from '../../store/useStore';
import { getBetaFloorTexture } from '../Beta/betaTextures';

/**
 * Gamma Ceiling & Floor (Revision 17 - Dedicated Support for 12x12m Arena Bay)
 * Features:
 * - Neutral deep-slate base ceiling plane (#131D33 / #161F33, never #0A0E17 pure black)
 * - Perimeter light-grey soffit/fascia strip (#E2E8F0, 300mm drop at Y = 3.45m)
 * - Perimeter warm/white cove lighting strip under fascia
 * - Black exposed-structure grid & steel duct beams (Y = 3.48 to 3.58m)
 * - Main Bay: Central Hexagonal White Glowing LED Ring + linear fixtures
 * - Arena Bay: 3 Suspended Round Spot Cans (over Soccer, Race, Line arenas) + linear fixtures
 * - Polished grey concrete floor with thin emissive blue guide lines pointing to zones
 */
export function GammaCeiling({ isArena = false }) {
  const showCeiling = useStore((state) => state.showCeiling);
  const floorTexture = useMemo(() => getBetaFloorTexture(), []);

  // Shared Materials
  const lightBarMaterial = useMemo(
    () => new THREE.MeshStandardMaterial({
      color: '#FFFFFF', emissive: '#FFFFFF', emissiveIntensity: 3.8, roughness: 0.1
    }),
    []
  );
  const spotCanHousingMaterial = useMemo(
    () => new THREE.MeshStandardMaterial({ color: '#161C24', roughness: 0.5, metalness: 0.8 }),
    []
  );
  const coveGlowMaterial = useMemo(
    () => new THREE.MeshStandardMaterial({
      color: '#E0F2FE', emissive: '#38BDF8', emissiveIntensity: 2.2, roughness: 0.2
    }),
    []
  );
  const fasciaMaterial = useMemo(
    () => new THREE.MeshStandardMaterial({
      color: '#E2E8F0', roughness: 0.45, metalness: 0.1
    }),
    []
  );
  const blueGuideLineMaterial = useMemo(
    () => new THREE.MeshStandardMaterial({
      color: '#1677FF', emissive: '#1677FF', emissiveIntensity: 3.5
    }),
    []
  );
  const ductBeamMaterial = useMemo(
    () => new THREE.MeshStandardMaterial({ color: '#1E2638', roughness: 0.6, metalness: 0.4 }),
    []
  );
  const acCassetteMaterial = useMemo(
    () => new THREE.MeshStandardMaterial({ color: '#F1F5F9', roughness: 0.35 }),
    []
  );

  const cx = isArena ? 54.0 : 40.0;
  const width = isArena ? 12.0 : 16.0;

  return (
    <group name={`gamma-ceiling-and-floor-${isArena ? 'arena' : 'main'}`}>
      {/* ================================================================
          1. POLISHED GREY CONCRETE FLOOR WITH BLUE GUIDE LINES
         ================================================================ */}
      <mesh position={[cx, 0.003, 6.0]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[width, 12.0]} />
        <meshStandardMaterial
          map={floorTexture}
          roughness={0.32}
          metalness={0.15}
        />
      </mesh>

      {/* Emissive Blue Walkway Guide Lines on Floor */}
      {!isArena ? (
        <group position={[cx, 0.005, 6.0]}>
          {/* Main Central Corridor Line (Z: -5.5 to +5.5 along X = 0) */}
          <mesh position={[0, 0, 0]}>
            <boxGeometry args={[0.04, 0.003, 11.0]} />
            <primitive object={blueGuideLineMaterial} />
          </mesh>
          {/* Cross Corridor Line to Doors (X: -7.5 to +7.5 at Z = 0) */}
          <mesh position={[0, 0, 0]}>
            <boxGeometry args={[15.0, 0.003, 0.04]} />
            <primitive object={blueGuideLineMaterial} />
          </mesh>
          {/* Branch lines leading into Coding Zone & VR Zone */}
          <mesh position={[-5.5, 0, -3.5]}>
            <boxGeometry args={[4.0, 0.003, 0.04]} />
            <primitive object={blueGuideLineMaterial} />
          </mesh>
          <mesh position={[5.5, 0, 3.5]}>
            <boxGeometry args={[4.0, 0.003, 0.04]} />
            <primitive object={blueGuideLineMaterial} />
          </mesh>
        </group>
      ) : (
        <group position={[cx, 0.005, 6.0]}>
          {/* Arena Walkway Aisle Guide Lines */}
          {/* Cross Aisle Line at Z = 5.2 (relative Z = -0.8m) */}
          <mesh position={[0, 0, -0.8]}>
            <boxGeometry args={[11.2, 0.003, 0.03]} />
            <primitive object={blueGuideLineMaterial} />
          </mesh>
          {/* Longitudinal Aisle Line at X = 54.8 (relative X = 0.8m) between Race & Line Follower */}
          <mesh position={[0.8, 0, 2.2]}>
            <boxGeometry args={[0.03, 0.003, 5.0]} />
            <primitive object={blueGuideLineMaterial} />
          </mesh>
        </group>
      )}

      {/* Ambient Fill Light for bright room illumination without shadow costs */}
      <pointLight position={[cx, 3.2, 6.0]} intensity={0.70} color="#F8FAFC" distance={22} decay={1.5} />
      <pointLight position={[cx, 3.2, 2.5]} intensity={0.50} color="#FFFFFF" distance={15} decay={1.8} />

      {/* ================================================================
          2. ARCHITECTURAL CEILING SYSTEM (Y = 3.6m)
         ================================================================ */}
      {showCeiling && (
        <group>
          {/* 1. Deep Slate Base Ceiling Plane (never #0A0E17 pure black) */}
          <mesh position={[cx, 3.6, 6.0]} rotation={[Math.PI / 2, 0, 0]}>
            <planeGeometry args={[width, 12.0]} />
            <meshStandardMaterial color="#131D33" roughness={0.75} metalness={0.15} />
          </mesh>

          {/* 2. Perimeter Light-Grey Soffit / Fascia Strip (300mm drop: Y = 3.45m, depth 0.40m) */}
          <group>
            {/* Back edge fascia (Z = 0.20) */}
            <mesh position={[cx, 3.45, 0.20]} castShadow>
              <boxGeometry args={[width, 0.30, 0.40]} />
              <primitive object={fasciaMaterial} />
            </mesh>
            {/* Front edge fascia (Z = 11.80) */}
            <mesh position={[cx, 3.45, 11.80]} castShadow>
              <boxGeometry args={[width, 0.30, 0.40]} />
              <primitive object={fasciaMaterial} />
            </mesh>
            {/* Left edge fascia */}
            <mesh position={[cx - width / 2 + 0.20, 3.45, 6.0]} castShadow>
              <boxGeometry args={[0.40, 0.30, 11.2]} />
              <primitive object={fasciaMaterial} />
            </mesh>
            {/* Right edge fascia */}
            <mesh position={[cx + width / 2 - 0.20, 3.45, 6.0]} castShadow>
              <boxGeometry args={[0.40, 0.30, 11.2]} />
              <primitive object={fasciaMaterial} />
            </mesh>

            {/* Perimeter Cove Glow Strip along fascia edge */}
            <mesh position={[cx, 3.31, 0.42]}>
              <boxGeometry args={[width - 0.8, 0.02, 0.04]} />
              <primitive object={coveGlowMaterial} />
            </mesh>
            <mesh position={[cx, 3.31, 11.58]}>
              <boxGeometry args={[width - 0.8, 0.02, 0.04]} />
              <primitive object={coveGlowMaterial} />
            </mesh>
            <mesh position={[cx - width / 2 + 0.42, 3.31, 6.0]}>
              <boxGeometry args={[0.04, 0.02, 11.0]} />
              <primitive object={coveGlowMaterial} />
            </mesh>
            <mesh position={[cx + width / 2 - 0.42, 3.31, 6.0]}>
              <boxGeometry args={[0.04, 0.02, 11.0]} />
              <primitive object={coveGlowMaterial} />
            </mesh>
          </group>

          {/* 3. Overhead Ventilation Ducts & Steel Beams (Y = 3.52m) */}
          {[2.4, 6.0, 9.6].map((bz, i) => (
            <mesh key={`gamma-beam-${isArena ? 'a' : 'm'}-${i}`} position={[cx, 3.52, bz]}>
              <boxGeometry args={[width - 0.9, 0.16, 0.45]} />
              <primitive object={ductBeamMaterial} />
            </mesh>
          ))}

          {/* 4. AC Cassette Unit */}
          <group position={[cx + (isArena ? 3.0 : 5.0), 3.56, 3.0]}>
            <mesh>
              <boxGeometry args={[0.95, 0.06, 0.95]} />
              <primitive object={acCassetteMaterial} />
            </mesh>
            <mesh position={[0, -0.035, 0]}>
              <planeGeometry args={[0.82, 0.82]} />
              <meshStandardMaterial color="#334155" roughness={0.6} />
            </mesh>
          </group>

          {/* ============================================================
              MAIN BAY: CENTRAL HEXAGONAL WHITE GLOWING LED RING
             ============================================================ */}
          {!isArena && (
            <group position={[cx, 3.44, 6.0]}>
              {/* Outer Hexagon of radius 2.2m */}
              {[0, 1, 2, 3, 4, 5].map((i) => {
                const angle1 = (i * Math.PI) / 3;
                const angle2 = ((i + 1) * Math.PI) / 3;
                const r = 2.2;
                const x1 = Math.cos(angle1) * r;
                const z1 = Math.sin(angle1) * r;
                const x2 = Math.cos(angle2) * r;
                const z2 = Math.sin(angle2) * r;

                const mx = (x1 + x2) / 2;
                const mz = (z1 + z2) / 2;
                const len = Math.hypot(x2 - x1, z2 - z1);
                const rotY = Math.atan2(x2 - x1, z2 - z1);

                return (
                  <mesh key={`hex-tube-${i}`} position={[mx, 0, mz]} rotation={[0, rotY, Math.PI / 2]}>
                    <cylinderGeometry args={[0.025, 0.025, len, 8]} />
                    <primitive object={lightBarMaterial} />
                  </mesh>
                );
              })}

              {/* Smaller Inner Hexagon Accent (Radius 1.0m) */}
              {[0, 1, 2, 3, 4, 5].map((i) => {
                const angle1 = (i * Math.PI) / 3;
                const angle2 = ((i + 1) * Math.PI) / 3;
                const r = 1.0;
                const x1 = Math.cos(angle1) * r;
                const z1 = Math.sin(angle1) * r;
                const x2 = Math.cos(angle2) * r;
                const z2 = Math.sin(angle2) * r;

                const mx = (x1 + x2) / 2;
                const mz = (z1 + z2) / 2;
                const len = Math.hypot(x2 - x1, z2 - z1);
                const rotY = Math.atan2(x2 - x1, z2 - z1);

                return (
                  <mesh key={`inner-hex-tube-${i}`} position={[mx, 0, mz]} rotation={[0, rotY, Math.PI / 2]}>
                    <cylinderGeometry args={[0.018, 0.018, len, 8]} />
                    <primitive object={lightBarMaterial} />
                  </mesh>
                );
              })}
            </group>
          )}

          {/* ============================================================
              ARENA BAY: SUSPENDED ROUND SPOT CANS ABOVE EACH ARENA
             ============================================================ */}
          {isArena && (
            <group>
              {/* Spot Can 1: Over Robo Soccer Arena (54.7, Y=3.44, Z=2.9) */}
              <group position={[54.7, 3.44, 2.9]}>
                <mesh position={[0, 0.08, 0]}>
                  <cylinderGeometry args={[0.42, 0.42, 0.22, 16]} />
                  <primitive object={spotCanHousingMaterial} />
                </mesh>
                <mesh position={[0, -0.032, 0]} rotation={[Math.PI / 2, 0, 0]}>
                  <circleGeometry args={[0.38, 16]} />
                  <primitive object={lightBarMaterial} />
                </mesh>
              </group>

              {/* Spot Can 2: Over Robo Race Arena (51.9, Y=3.44, Z=8.2) */}
              <group position={[51.9, 3.44, 8.2]}>
                <mesh position={[0, 0.08, 0]}>
                  <cylinderGeometry args={[0.46, 0.46, 0.22, 16]} />
                  <primitive object={spotCanHousingMaterial} />
                </mesh>
                <mesh position={[0, -0.032, 0]} rotation={[Math.PI / 2, 0, 0]}>
                  <circleGeometry args={[0.42, 16]} />
                  <primitive object={lightBarMaterial} />
                </mesh>
              </group>

              {/* Spot Can 3: Over Line Follower Arena (57.0, Y=3.44, Z=8.2) */}
              <group position={[57.0, 3.44, 8.2]}>
                <mesh position={[0, 0.08, 0]}>
                  <cylinderGeometry args={[0.40, 0.40, 0.22, 16]} />
                  <primitive object={spotCanHousingMaterial} />
                </mesh>
                <mesh position={[0, -0.032, 0]} rotation={[Math.PI / 2, 0, 0]}>
                  <circleGeometry args={[0.36, 16]} />
                  <primitive object={lightBarMaterial} />
                </mesh>
              </group>
            </group>
          )}

          {/* 5. Parallel Long White Linear LED Light Fixtures */}
          {(isArena ? [-4.2, 0, 4.2] : [-5.8, -2.5, 2.5, 5.8]).map((lx, li) => (
            <group key={`led-run-${isArena ? 'a' : 'm'}-${li}`} position={[cx + lx, 3.46, 6.0]}>
              <mesh position={[0, 0, -3.2]}>
                <boxGeometry args={[0.05, 0.04, 3.4]} />
                <primitive object={lightBarMaterial} />
              </mesh>
              <mesh position={[0, 0, 3.2]}>
                <boxGeometry args={[0.05, 0.04, 3.4]} />
                <primitive object={lightBarMaterial} />
              </mesh>
            </group>
          ))}
        </group>
      )}
    </group>
  );
}
