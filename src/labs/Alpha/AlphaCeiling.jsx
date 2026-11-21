import React, { useMemo } from 'react';
import * as THREE from 'three';
import { getCeilingGridTexture, getTileFloorTexture } from './alphaTextures';
import { useStore } from '../../store/useStore';

/**
 * Lab Alpha Ceiling & Floor Architecture (Revision 5)
 * Exactly matches reference render:
 * - Charcoal perforated grid ceiling at Y = 3.6m (only visible when showCeiling is true or in walk mode)
 * - 3 Longitudinal pairs of bright linear white LED light bars with emissive glow
 * - Perimeter electric-blue LED cove strip
 * - Central white square 4-way ceiling cassette AC unit at (8.0, 3.58, 6.0)
 * - Polished light-grey tile floor with subtle grout lines and 0.32 roughness
 */
export function AlphaCeiling() {
  const showCeiling = useStore((state) => state.showCeiling);
  const ceilingGrid = useMemo(() => getCeilingGridTexture(), []);
  const tileFloor = useMemo(() => getTileFloorTexture(), []);

  // Emissive white light bar material
  const lightBarMaterial = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: '#FFFFFF',
        emissive: '#FFFFFF',
        emissiveIntensity: 3.5,
        roughness: 0.1
      }),
    []
  );

  // Emissive blue cove material
  const blueCoveMaterial = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: '#1677FF',
        emissive: '#1677FF',
        emissiveIntensity: 4.0
      }),
    []
  );

  return (
    <group name="alpha-ceiling-and-floor">
      {/* =========================================================================
          1. POLISHED LIGHT-GREY TILE FLOOR (X: 0 to 16, Z: 0 to 12, Y: 0.002)
         ========================================================================= */}
      <mesh position={[8.0, 0.002, 6.0]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[16.0, 12.0]} />
        <meshStandardMaterial
          map={tileFloor}
          roughness={0.32}
          metalness={0.15}
        />
      </mesh>

      {/* Soft natural fill light for Lab Alpha interior mood */}
      <pointLight position={[8.0, 3.1, 6.0]} intensity={0.65} color="#F8FAFC" distance={18} decay={1.5} />
      <pointLight position={[8.0, 3.1, 2.0]} intensity={0.45} color="#FFFFFF" distance={10} decay={1.8} />

      {/* =========================================================================
          2. CEILING STRUCTURE (Charcoal Grid, LED Bars, Blue Cove, AC Cassette)
         ========================================================================= */}
      {showCeiling && (
        <group position={[0, 0, 0]}>
          {/* Main Charcoal Acoustic Grid Ceiling Plane (Y = 3.6m facing downward) */}
          <mesh position={[8.0, 3.6, 6.0]} rotation={[Math.PI / 2, 0, 0]}>
            <planeGeometry args={[16.0, 12.0]} />
            <meshStandardMaterial
              map={ceilingGrid}
              roughness={0.7}
              metalness={0.2}
            />
          </mesh>

          {/* Perimeter Electric-Blue LED Cove Strip */}
          {/* North cove (along back wall) */}
          <mesh position={[8.0, 3.58, 0.08]}>
            <boxGeometry args={[15.8, 0.025, 0.04]} />
            <primitive object={blueCoveMaterial} />
          </mesh>
          {/* South cove (along front wall) */}
          <mesh position={[8.0, 3.58, 11.92]}>
            <boxGeometry args={[15.8, 0.025, 0.04]} />
            <primitive object={blueCoveMaterial} />
          </mesh>
          {/* West cove (along left wall) */}
          <mesh position={[0.08, 3.58, 6.0]}>
            <boxGeometry args={[0.04, 0.025, 11.8]} />
            <primitive object={blueCoveMaterial} />
          </mesh>
          {/* East cove (along right wall) */}
          <mesh position={[15.92, 3.58, 6.0]}>
            <boxGeometry args={[0.04, 0.025, 11.8]} />
            <primitive object={blueCoveMaterial} />
          </mesh>

          {/* 3 Pairs of Longitudinal Linear White LED Light Bars */}
          {/* Left pair (X = 3.8 and X = 4.6, Z in [2.0, 10.0]) */}
          <mesh position={[3.8, 3.57, 6.0]}>
            <boxGeometry args={[0.1, 0.03, 8.4]} />
            <primitive object={lightBarMaterial} />
          </mesh>
          <mesh position={[4.6, 3.57, 6.0]}>
            <boxGeometry args={[0.1, 0.03, 8.4]} />
            <primitive object={lightBarMaterial} />
          </mesh>

          {/* Center pair (X = 7.4 and X = 8.6, Z in [1.5, 4.5] and [7.5, 10.5] flanking AC) */}
          <mesh position={[7.4, 3.57, 3.0]}>
            <boxGeometry args={[0.1, 0.03, 3.0]} />
            <primitive object={lightBarMaterial} />
          </mesh>
          <mesh position={[8.6, 3.57, 3.0]}>
            <boxGeometry args={[0.1, 0.03, 3.0]} />
            <primitive object={lightBarMaterial} />
          </mesh>
          <mesh position={[7.4, 3.57, 9.0]}>
            <boxGeometry args={[0.1, 0.03, 3.0]} />
            <primitive object={lightBarMaterial} />
          </mesh>
          <mesh position={[8.6, 3.57, 9.0]}>
            <boxGeometry args={[0.1, 0.03, 3.0]} />
            <primitive object={lightBarMaterial} />
          </mesh>

          {/* Right pair (X = 11.4 and X = 12.2, Z in [2.0, 10.0]) */}
          <mesh position={[11.4, 3.57, 6.0]}>
            <boxGeometry args={[0.1, 0.03, 8.4]} />
            <primitive object={lightBarMaterial} />
          </mesh>
          <mesh position={[12.2, 3.57, 6.0]}>
            <boxGeometry args={[0.1, 0.03, 8.4]} />
            <primitive object={lightBarMaterial} />
          </mesh>

          {/* Central 4-Way Ceiling Cassette AC Unit (X = 8.0, Y = 3.58, Z = 6.0) */}
          <group position={[8.0, 3.58, 6.0]}>
            {/* White Square Fascia Panel (1.2m x 1.2m) */}
            <mesh position={[0, -0.01, 0]}>
              <boxGeometry args={[1.2, 0.04, 1.2]} />
              <meshStandardMaterial color="#F8FAFC" roughness={0.3} />
            </mesh>
            {/* Center Intake Grille */}
            <mesh position={[0, -0.02, 0]}>
              <boxGeometry args={[0.7, 0.025, 0.7]} />
              <meshStandardMaterial color="#1E293B" roughness={0.7} />
            </mesh>
            {/* 4 Air Discharge Louver Slots */}
            {[-0.48, 0.48].map((lx, idx) => (
              <mesh key={`louver-x-${idx}`} position={[lx, -0.02, 0]}>
                <boxGeometry args={[0.1, 0.02, 0.9]} />
                <meshStandardMaterial color="#0F172A" />
              </mesh>
            ))}
            {[-0.48, 0.48].map((lz, idx) => (
              <mesh key={`louver-z-${idx}`} position={[0, -0.02, lz]}>
                <boxGeometry args={[0.9, 0.02, 0.1]} />
                <meshStandardMaterial color="#0F172A" />
              </mesh>
            ))}
          </group>
        </group>
      )}
    </group>
  );
}
