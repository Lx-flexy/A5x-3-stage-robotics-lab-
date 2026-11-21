import React, { useMemo } from 'react';
import * as THREE from 'three';
import { getBetaCeilingTexture, getBetaFloorTexture } from './betaTextures';
import { useStore } from '../../store/useStore';

/**
 * Beta Ceiling & Floor — Revision 8
 * Exposed-structure ceiling (lighter grey than Alpha):
 * - Grey ceiling with parallel beam/duct boxes
 * - Black track rails with small spotlight cans (emissive only)
 * - Long white linear LEDs
 * - One AC cassette unit
 * - Perimeter blue LED cove strip
 * Polished concrete floor with subtle warm grey tone
 */
export function BetaCeiling() {
  const showCeiling = useStore((state) => state.showCeiling);
  const ceilingTexture = useMemo(() => getBetaCeilingTexture(), []);
  const floorTexture = useMemo(() => getBetaFloorTexture(), []);

  const lightBarMaterial = useMemo(
    () => new THREE.MeshStandardMaterial({
      color: '#FFFFFF', emissive: '#FFFFFF', emissiveIntensity: 3.5, roughness: 0.1
    }),
    []
  );
  const blueCoveMaterial = useMemo(
    () => new THREE.MeshStandardMaterial({
      color: '#1677FF', emissive: '#1677FF', emissiveIntensity: 4.0
    }),
    []
  );
  const spotlightMaterial = useMemo(
    () => new THREE.MeshStandardMaterial({
      color: '#FFF8EE', emissive: '#FFF3E0', emissiveIntensity: 2.0
    }),
    []
  );
  const blackMetalMaterial = useMemo(
    () => new THREE.MeshStandardMaterial({ color: '#151C26', metalness: 0.85, roughness: 0.25 }),
    []
  );

  const labX = 16.0;
  const cx = labX + 8.0; // Beta center X = 24

  return (
    <group name="beta-ceiling-and-floor">
      {/* 1. POLISHED CONCRETE FLOOR */}
      <mesh position={[cx, 0.003, 6.0]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[16.0, 12.0]} />
        <meshStandardMaterial
          map={floorTexture}
          roughness={0.25}
          metalness={0.12}
        />
      </mesh>

      {/* Interior fill lights */}
      <pointLight position={[cx, 3.1, 6.0]} intensity={0.7} color="#F8FAFC" distance={18} decay={1.5} />
      <pointLight position={[cx, 3.1, 2.0]} intensity={0.5} color="#FFFFFF" distance={10} decay={1.8} />

      {/* 2. CEILING STRUCTURE */}
      {showCeiling && (
        <group>
          {/* Main ceiling plane (lighter grey exposed-structure) */}
          <mesh position={[cx, 3.6, 6.0]} rotation={[Math.PI / 2, 0, 0]}>
            <planeGeometry args={[16.0, 12.0]} />
            <meshStandardMaterial map={ceilingTexture} roughness={0.6} metalness={0.15} />
          </mesh>

          {/* Parallel beam/duct boxes (3 runs) */}
          {[2.5, 6.0, 9.5].map((bz, i) => (
            <mesh key={`beam-${i}`} position={[cx, 3.5, bz]}>
              <boxGeometry args={[14.0, 0.18, 0.4]} />
              <meshStandardMaterial color="#2A2F38" roughness={0.5} metalness={0.3} />
            </mesh>
          ))}

          {/* Black track rails with small spotlight cans (3 tracks) */}
          {[3.5, 6.0, 8.5].map((tz, ti) => (
            <group key={`track-${ti}`}>
              {/* Track rail */}
              <mesh position={[cx, 3.56, tz]}>
                <boxGeometry args={[12.0, 0.04, 0.06]} />
                <primitive object={blackMetalMaterial} />
              </mesh>
              {/* Small spotlight cans (emissive only, every 2m) */}
              {[-5, -3, -1, 1, 3, 5].map((sx, si) => (
                <group key={`spot-${ti}-${si}`} position={[cx + sx, 3.52, tz]}>
                  <mesh>
                    <cylinderGeometry args={[0.04, 0.03, 0.06, 8]} />
                    <primitive object={blackMetalMaterial} />
                  </mesh>
                  <mesh position={[0, -0.035, 0]}>
                    <circleGeometry args={[0.025, 8]} />
                    <primitive object={spotlightMaterial} />
                  </mesh>
                </group>
              ))}
            </group>
          ))}

          {/* Long white linear LED bars (2 pairs flanking center) */}
          {[labX + 3.5, labX + 4.5, labX + 11.5, labX + 12.5].map((lx, i) => (
            <mesh key={`led-${i}`} position={[lx, 3.57, 6.0]}>
              <boxGeometry args={[0.1, 0.03, 9.0]} />
              <primitive object={lightBarMaterial} />
            </mesh>
          ))}

          {/* Perimeter electric-blue LED cove strip */}
          {/* North */}
          <mesh position={[cx, 3.58, 0.08]}>
            <boxGeometry args={[15.8, 0.025, 0.04]} />
            <primitive object={blueCoveMaterial} />
          </mesh>
          {/* South */}
          <mesh position={[cx, 3.58, 11.92]}>
            <boxGeometry args={[15.8, 0.025, 0.04]} />
            <primitive object={blueCoveMaterial} />
          </mesh>
          {/* West */}
          <mesh position={[labX + 0.08, 3.58, 6.0]}>
            <boxGeometry args={[0.04, 0.025, 11.8]} />
            <primitive object={blueCoveMaterial} />
          </mesh>
          {/* East */}
          <mesh position={[labX + 15.92, 3.58, 6.0]}>
            <boxGeometry args={[0.04, 0.025, 11.8]} />
            <primitive object={blueCoveMaterial} />
          </mesh>

          {/* AC Cassette Unit (center) */}
          <group position={[cx, 3.58, 6.0]}>
            <mesh position={[0, -0.01, 0]}>
              <boxGeometry args={[1.2, 0.04, 1.2]} />
              <meshStandardMaterial color="#F8FAFC" roughness={0.3} />
            </mesh>
            <mesh position={[0, -0.02, 0]}>
              <boxGeometry args={[0.7, 0.025, 0.7]} />
              <meshStandardMaterial color="#1E293B" roughness={0.7} />
            </mesh>
            {[-0.48, 0.48].map((lx, i) => (
              <mesh key={`aclx-${i}`} position={[lx, -0.02, 0]}>
                <boxGeometry args={[0.1, 0.02, 0.9]} />
                <meshStandardMaterial color="#0F172A" />
              </mesh>
            ))}
            {[-0.48, 0.48].map((lz, i) => (
              <mesh key={`aclz-${i}`} position={[0, -0.02, lz]}>
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
