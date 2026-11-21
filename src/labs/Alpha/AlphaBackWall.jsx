import React, { useMemo } from 'react';
import * as THREE from 'three';
import { getAlphaLogoTexture } from './alphaTextures';

/**
 * Lab Alpha Feature Back Wall (Teaching Wall) - Revision 5
 * Exactly matches reference render:
 * - Navy #071B3A feature wall with diagonal electric-blue LED stripes
 * - Centered A5X INDUSTRIES logo & large whiteboard with marker tray
 * - Teacher desk with laptop and black mesh chair
 * - Flanking 5-tier black metal/oak shelving units:
 *     Left: Hardware & tools, testing gear, clear labelled bins
 *     Right: Bambu Lab A1 Mini 3D printer, filament spool rack, prototype robot arm & 4-wheel rover
 * - Potted plants in white floor pots flanking whiteboard
 */
export function AlphaBackWall() {
  const logoTexture = useMemo(() => getAlphaLogoTexture(), []);

  // Oak shelf board material
  const oakMaterial = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: '#D4B996',
        roughness: 0.5,
        metalness: 0.1
      }),
    []
  );

  // Black metal frame material
  const blackMetalMaterial = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: '#151C26',
        metalness: 0.85,
        roughness: 0.25
      }),
    []
  );

  // Blue LED emissive material
  const blueLedMaterial = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: '#1677FF',
        emissive: '#1677FF',
        emissiveIntensity: 3.5
      }),
    []
  );

  return (
    <group name="alpha-back-wall">
      {/* 1. Main Navy #071B3A Wall Panel (In front of architecture back wall Z=0.10) */}
      <mesh position={[8.0, 1.8, 0.12]} receiveShadow>
        <planeGeometry args={[16.0, 3.6]} />
        <meshStandardMaterial color="#071B3A" roughness={0.4} metalness={0.2} />
      </mesh>

      {/* 2. Signature Angled Diagonal Electric-Blue LED Lines */}
      {/* Left Diagonal LED Stripe */}
      <mesh position={[5.2, 1.65, 0.135]} rotation={[0, 0, 0.22]}>
        <boxGeometry args={[0.035, 3.4, 0.02]} />
        <primitive object={blueLedMaterial} />
      </mesh>
      {/* Right Diagonal LED Stripe */}
      <mesh position={[10.8, 1.65, 0.135]} rotation={[0, 0, -0.22]}>
        <boxGeometry args={[0.035, 3.4, 0.02]} />
        <primitive object={blueLedMaterial} />
      </mesh>

      {/* Top Horizontal Blue Accent LED Bar */}
      <mesh position={[8.0, 3.38, 0.135]}>
        <boxGeometry args={[5.8, 0.035, 0.02]} />
        <primitive object={blueLedMaterial} />
      </mesh>

      {/* 3. A5X INDUSTRIES Logo Centered Above Whiteboard */}
      <mesh position={[8.0, 2.95, 0.14]}>
        <planeGeometry args={[3.2, 0.8]} />
        <meshBasicMaterial map={logoTexture} transparent toneMapped={false} />
      </mesh>

      {/* 4. Whiteboard (~4.2m x 1.6m, bottom at 0.95m, center Y = 1.75m) */}
      <group position={[8.0, 1.75, 0.15]}>
        {/* Silver Aluminum Frame */}
        <mesh castShadow receiveShadow>
          <boxGeometry args={[4.28, 1.68, 0.03]} />
          <meshStandardMaterial color="#CAD5E2" metalness={0.9} roughness={0.2} />
        </mesh>
        {/* Crisp White Glossy Board Surface */}
        <mesh position={[0, 0, 0.018]}>
          <planeGeometry args={[4.2, 1.6]} />
          <meshStandardMaterial color="#FFFFFF" roughness={0.12} metalness={0.02} />
        </mesh>
        {/* Marker Tray along bottom */}
        <mesh position={[0, -0.82, 0.04]}>
          <boxGeometry args={[4.2, 0.04, 0.08]} />
          <meshStandardMaterial color="#94A3B8" metalness={0.8} roughness={0.3} />
        </mesh>
        {/* Dry-erase markers & Eraser on tray */}
        <mesh position={[-0.8, -0.80, 0.04]}>
          <boxGeometry args={[0.18, 0.02, 0.015]} />
          <meshStandardMaterial color="#1677FF" />
        </mesh>
        <mesh position={[-0.5, -0.80, 0.04]}>
          <boxGeometry args={[0.18, 0.02, 0.015]} />
          <meshStandardMaterial color="#EF4444" />
        </mesh>
        <mesh position={[0.2, -0.80, 0.04]}>
          <boxGeometry args={[0.14, 0.03, 0.05]} />
          <meshStandardMaterial color="#1E293B" />
        </mesh>
      </group>

      {/* 5. Teacher Desk in Front of Whiteboard (X = 8.0, Z = 1.45) */}
      <group position={[8.0, 0, 1.45]}>
        {/* Light-oak Desktop (2.8m x 0.7m, Y = 0.74m) */}
        <mesh position={[0, 0.72, 0]} castShadow receiveShadow>
          <boxGeometry args={[2.8, 0.04, 0.7]} />
          <primitive object={oakMaterial} />
        </mesh>
        {/* White Front Modesty Panel */}
        <mesh position={[0, 0.36, 0.32]} castShadow receiveShadow>
          <boxGeometry args={[2.7, 0.68, 0.02]} />
          <meshStandardMaterial color="#FFFFFF" roughness={0.2} />
        </mesh>
        {/* Black Steel Legs */}
        <mesh position={[-1.34, 0.35, 0]} castShadow>
          <boxGeometry args={[0.04, 0.7, 0.64]} />
          <primitive object={blackMetalMaterial} />
        </mesh>
        <mesh position={[1.34, 0.35, 0]} castShadow>
          <boxGeometry args={[0.04, 0.7, 0.64]} />
          <primitive object={blackMetalMaterial} />
        </mesh>

        {/* Laptop with screen on */}
        <group position={[0.45, 0.74, 0.02]}>
          {/* Base */}
          <mesh castShadow>
            <boxGeometry args={[0.34, 0.012, 0.24]} />
            <meshStandardMaterial color="#94A3B8" metalness={0.9} roughness={0.2} />
          </mesh>
          {/* Open Screen tilted back */}
          <mesh position={[0, 0.12, -0.11]} rotation={[-0.24, 0, 0]}>
            <boxGeometry args={[0.34, 0.22, 0.008]} />
            <meshStandardMaterial color="#1E293B" metalness={0.8} roughness={0.2} />
          </mesh>
          {/* Glowing display */}
          <mesh position={[0, 0.12, -0.105]} rotation={[-0.24, 0, 0]}>
            <planeGeometry args={[0.32, 0.2]} />
            <meshStandardMaterial color="#60A5FA" emissive="#60A5FA" emissiveIntensity={1.5} />
          </mesh>
        </group>

        {/* Black Mesh Office Chair behind desk (Facing -Z towards whiteboard) */}
        <group position={[0, 0, -0.55]} rotation={[0, 0, 0]}>
          <mesh position={[0, 0.44, 0]} castShadow>
            <boxGeometry args={[0.5, 0.06, 0.48]} />
            <meshStandardMaterial color="#1A202C" roughness={0.8} />
          </mesh>
          <mesh position={[0, 0.78, 0.22]} rotation={[-0.06, 0, 0]} castShadow>
            <boxGeometry args={[0.46, 0.54, 0.04]} />
            <meshStandardMaterial color="#1A202C" roughness={0.8} />
          </mesh>
          <mesh position={[0, 0.22, 0]}>
            <cylinderGeometry args={[0.03, 0.26, 0.44, 8]} />
            <primitive object={blackMetalMaterial} />
          </mesh>
        </group>
      </group>

      {/* 6. Flanking 5-Tier Shelving Units */}
      {/* LEFT UNIT: Hardware Zone (X = 2.4, Z = 0.55) */}
      <group position={[2.4, 0, 0.55]}>
        {/* 5 Light-Oak Shelves */}
        {[0.2, 0.7, 1.2, 1.7, 2.2].map((sy, sIdx) => (
          <mesh key={`left-shelf-${sIdx}`} position={[0, sy, 0]} castShadow receiveShadow>
            <boxGeometry args={[2.4, 0.035, 0.55]} />
            <primitive object={oakMaterial} />
          </mesh>
        ))}
        {/* Black Steel Upright Posts */}
        {[[-1.16, -0.24], [-1.16, 0.24], [1.16, -0.24], [1.16, 0.24]].map(([ux, uz], uIdx) => (
          <mesh key={`left-post-${uIdx}`} position={[ux, 1.1, uz]} castShadow>
            <boxGeometry args={[0.04, 2.2, 0.04]} />
            <primitive object={blackMetalMaterial} />
          </mesh>
        ))}
        {/* Hardware kits in boxes, labelled bins, small robot kits */}
        {[-0.8, -0.25, 0.3, 0.85].map((bx, bIdx) => (
          <group key={`hbin-bottom-${bIdx}`} position={[bx, 0.36, 0]}>
            <mesh castShadow>
              <boxGeometry args={[0.42, 0.28, 0.45]} />
              <meshStandardMaterial color="#CBD5E1" transparent opacity={0.65} roughness={0.2} />
            </mesh>
          </group>
        ))}
        {/* Tier 2: Arduino & ESP32 boxes */}
        {[-0.7, 0, 0.7].map((bx, bIdx) => (
          <mesh key={`ard-box-${bIdx}`} position={[bx, 0.82, 0]} castShadow>
            <boxGeometry args={[0.36, 0.18, 0.35]} />
            <meshStandardMaterial color="#0284C7" roughness={0.5} />
          </mesh>
        ))}
        {/* Tier 3: Multimeter & test kit */}
        <group position={[-0.3, 1.32, 0]}>
          <mesh castShadow>
            <boxGeometry args={[0.3, 0.16, 0.25]} />
            <meshStandardMaterial color="#F59E0B" roughness={0.5} />
          </mesh>
        </group>
        {/* Top Tier Plant */}
        <group position={[0.7, 2.22, 0]}>
          <mesh position={[0, 0.08, 0]} castShadow>
            <cylinderGeometry args={[0.09, 0.07, 0.16, 14]} />
            <meshStandardMaterial color="#FFFFFF" roughness={0.3} />
          </mesh>
          <mesh position={[0, 0.15, 0]}>
            <cylinderGeometry args={[0.08, 0.08, 0.02, 14]} />
            <meshStandardMaterial color="#2B1810" roughness={0.9} />
          </mesh>
          {/* Realistic foliage blades */}
          {[0, 1.2, 2.4, 3.6, 4.8].map((rot, rIdx) => (
            <mesh key={`hplant-${rIdx}`} position={[0, 0.16, 0]} rotation={[0.4, rot, 0]} castShadow>
              <planeGeometry args={[0.06, 0.22]} />
              <meshStandardMaterial color={rIdx % 2 === 0 ? '#15803D' : '#22C55E'} roughness={0.6} side={2} />
            </mesh>
          ))}
        </group>
      </group>

      {/* RIGHT UNIT: 3D Print & Prototype Display (X = 13.6, Z = 0.55) */}
      <group position={[13.6, 0, 0.55]}>
        {/* 5 Light-Oak Shelves */}
        {[0.2, 0.7, 1.2, 1.7, 2.2].map((sy, sIdx) => (
          <mesh key={`right-shelf-${sIdx}`} position={[0, sy, 0]} castShadow receiveShadow>
            <boxGeometry args={[2.4, 0.035, 0.55]} />
            <primitive object={oakMaterial} />
          </mesh>
        ))}
        {/* Black Steel Upright Posts */}
        {[[-1.16, -0.24], [-1.16, 0.24], [1.16, -0.24], [1.16, 0.24]].map(([ux, uz], uIdx) => (
          <mesh key={`right-post-${uIdx}`} position={[ux, 1.1, uz]} castShadow>
            <boxGeometry args={[0.04, 2.2, 0.04]} />
            <primitive object={blackMetalMaterial} />
          </mesh>
        ))}

        {/* Tier 1 (Bottom): Clear storage bins */}
        {[-0.7, 0, 0.7].map((bx, bIdx) => (
          <mesh key={`rbin-bottom-${bIdx}`} position={[bx, 0.36, 0]} castShadow>
            <boxGeometry args={[0.42, 0.28, 0.45]} />
            <meshStandardMaterial color="#CBD5E1" transparent opacity={0.65} roughness={0.2} />
          </mesh>
        ))}

        {/* Tier 2: Prototype Display - 4-Wheel Rover Robot & 6-DOF Robot Arm */}
        {/* 4-Wheel Robot Car */}
        <group position={[-0.6, 0.76, 0]}>
          <mesh castShadow>
            <boxGeometry args={[0.32, 0.06, 0.26]} />
            <meshStandardMaterial color="#1E293B" metalness={0.7} roughness={0.3} />
          </mesh>
          {/* 4 Yellow Wheels */}
          {[[-0.14, -0.11], [-0.14, 0.11], [0.14, -0.11], [0.14, 0.11]].map(([wx, wz], wIdx) => (
            <mesh key={`wheel-${wIdx}`} position={[wx, -0.01, wz]} rotation={[0, 0, Math.PI / 2]}>
              <cylinderGeometry args={[0.045, 0.045, 0.03, 12]} />
              <meshStandardMaterial color="#FBBF24" roughness={0.5} />
            </mesh>
          ))}
          {/* Top Sensor Tower */}
          <mesh position={[0, 0.06, 0]}>
            <cylinderGeometry args={[0.035, 0.035, 0.06, 10]} />
            <meshStandardMaterial color="#0284C7" />
          </mesh>
        </group>

        {/* 6-DOF Robot Arm */}
        <group position={[0.55, 0.76, 0]}>
          <mesh position={[0, 0.02, 0]} castShadow>
            <cylinderGeometry args={[0.09, 0.1, 0.04, 12]} />
            <primitive object={blackMetalMaterial} />
          </mesh>
          {/* Articulated Segments */}
          <mesh position={[0, 0.12, 0]} rotation={[0.2, 0, 0]}>
            <boxGeometry args={[0.04, 0.18, 0.04]} />
            <meshStandardMaterial color="#F8FAFC" metalness={0.7} roughness={0.3} />
          </mesh>
          <mesh position={[0, 0.26, 0.05]} rotation={[-0.4, 0, 0]}>
            <boxGeometry args={[0.035, 0.16, 0.035]} />
            <meshStandardMaterial color="#1677FF" metalness={0.7} roughness={0.3} />
          </mesh>
          {/* Gripper */}
          <mesh position={[0, 0.35, 0.1]}>
            <boxGeometry args={[0.06, 0.04, 0.05]} />
            <primitive object={blackMetalMaterial} />
          </mesh>
        </group>

        {/* Tier 3 (Eye Level): Bambu Lab A1 Mini 3D Printer & Filament Rack */}
        {/* Bambu Lab A1 Mini 3D Printer */}
        <group position={[-0.55, 1.25, 0]}>
          {/* Base Unit */}
          <mesh position={[0, 0.04, 0]} castShadow>
            <boxGeometry args={[0.34, 0.08, 0.34]} />
            <meshStandardMaterial color="#F1F5F9" roughness={0.3} />
          </mesh>
          {/* Build Plate */}
          <mesh position={[0, 0.085, 0]}>
            <boxGeometry args={[0.22, 0.01, 0.22]} />
            <meshStandardMaterial color="#334155" roughness={0.4} />
          </mesh>
          {/* Z-Axis Upright Column */}
          <mesh position={[-0.12, 0.24, -0.08]} castShadow>
            <boxGeometry args={[0.05, 0.32, 0.05]} />
            <primitive object={blackMetalMaterial} />
          </mesh>
          {/* X-Arm & Toolhead */}
          <mesh position={[0, 0.26, -0.04]} castShadow>
            <boxGeometry args={[0.24, 0.04, 0.04]} />
            <primitive object={blackMetalMaterial} />
          </mesh>
          {/* Toolhead Extruder */}
          <mesh position={[0.02, 0.24, 0]} castShadow>
            <boxGeometry args={[0.08, 0.08, 0.08]} />
            <meshStandardMaterial color="#1E293B" roughness={0.4} />
          </mesh>
        </group>

        {/* Filament Spool Rack (6-8 Spools in bright colors) */}
        <group position={[0.5, 1.25, 0]}>
          {/* Spool Axle Bar */}
          <mesh position={[0, 0.14, 0]} rotation={[0, 0, Math.PI / 2]}>
            <cylinderGeometry args={[0.015, 0.015, 0.8, 8]} />
            <meshStandardMaterial color="#64748B" metalness={0.9} />
          </mesh>
          {/* Coloured Spools */}
          {['#EF4444', '#F59E0B', '#10B981', '#3B82F6', '#8B5CF6', '#EC4899'].map((c, i) => (
            <group key={`spool-${i}`} position={[-0.32 + i * 0.13, 0.14, 0]} rotation={[0, 0, Math.PI / 2]}>
              <mesh castShadow>
                <cylinderGeometry args={[0.09, 0.09, 0.09, 14]} />
                <meshStandardMaterial color={c} roughness={0.5} />
              </mesh>
              {/* Spool Rim Flanges */}
              <mesh position={[0, -0.045, 0]}>
                <cylinderGeometry args={[0.11, 0.11, 0.008, 14]} />
                <meshStandardMaterial color="#1E293B" />
              </mesh>
              <mesh position={[0, 0.045, 0]}>
                <cylinderGeometry args={[0.11, 0.11, 0.008, 14]} />
                <meshStandardMaterial color="#1E293B" />
              </mesh>
            </group>
          ))}
        </group>

        {/* Top Tier Plant */}
        <group position={[0.7, 2.22, 0]}>
          <mesh position={[0, 0.08, 0]} castShadow>
            <cylinderGeometry args={[0.09, 0.07, 0.16, 14]} />
            <meshStandardMaterial color="#FFFFFF" roughness={0.3} />
          </mesh>
          <mesh position={[0, 0.15, 0]}>
            <cylinderGeometry args={[0.08, 0.08, 0.02, 14]} />
            <meshStandardMaterial color="#2B1810" roughness={0.9} />
          </mesh>
          {/* Realistic foliage blades */}
          {[0, 1.2, 2.4, 3.6, 4.8].map((rot, rIdx) => (
            <mesh key={`hplant-${rIdx}`} position={[0, 0.16, 0]} rotation={[0.4, rot, 0]} castShadow>
              <planeGeometry args={[0.06, 0.22]} />
              <meshStandardMaterial color={rIdx % 2 === 0 ? '#15803D' : '#22C55E'} roughness={0.6} side={2} />
            </mesh>
          ))}
        </group>
      </group>

      {/* 7. Tall Potted Floor Plants Flanking Whiteboard */}
      {/* Left Floor Plant (X = 5.4, Z = 0.5) */}
      <group position={[5.4, 0, 0.5]}>
        <mesh position={[0, 0.35, 0]} castShadow>
          <cylinderGeometry args={[0.22, 0.16, 0.7, 14]} />
          <meshStandardMaterial color="#FFFFFF" roughness={0.25} />
        </mesh>
        {/* Tall Upright Ficus / Sansevieria Leaves */}
        <mesh position={[0, 1.0, 0]} castShadow>
          <cylinderGeometry args={[0.12, 0.24, 0.9, 10]} />
          <meshStandardMaterial color="#15803D" roughness={0.7} />
        </mesh>
        <mesh position={[0.05, 1.35, 0]} castShadow>
          <coneGeometry args={[0.14, 0.7, 8]} />
          <meshStandardMaterial color="#16A34A" roughness={0.7} />
        </mesh>
      </group>

      {/* Right Floor Plant (X = 10.6, Z = 0.5) */}
      <group position={[10.6, 0, 0.5]}>
        <mesh position={[0, 0.35, 0]} castShadow>
          <cylinderGeometry args={[0.22, 0.16, 0.7, 14]} />
          <meshStandardMaterial color="#FFFFFF" roughness={0.25} />
        </mesh>
        {/* Tall Upright Ficus / Sansevieria Leaves */}
        <mesh position={[0, 1.0, 0]} castShadow>
          <cylinderGeometry args={[0.12, 0.24, 0.9, 10]} />
          <meshStandardMaterial color="#15803D" roughness={0.7} />
        </mesh>
        <mesh position={[-0.05, 1.35, 0]} castShadow>
          <coneGeometry args={[0.14, 0.7, 8]} />
          <meshStandardMaterial color="#16A34A" roughness={0.7} />
        </mesh>
      </group>
    </group>
  );
}
