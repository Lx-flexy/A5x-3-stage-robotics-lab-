import React from 'react';
import { Text } from '@react-three/drei';

/**
 * VR / AR Immersive Zone for Lab Gamma
 * Features a display wall holding 6+ headsets, beanbag seating, and an immersive preview screen.
 */
export function VRZone({ position = [35.2, 0, 2.8] }) {
  const [x, y, z] = position;

  return (
    <group position={[x, y, z]} name="vr-ar-zone">
      {/* 1. Zone Floor Area with Subtle Blue Tech Hex Grid */}
      <mesh position={[0, 0.005, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[4.2, 3.2]} />
        <meshStandardMaterial color="#0B1C38" roughness={0.6} />
      </mesh>
      {/* Glowing Border Trim */}
      <mesh position={[0, 0.008, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[1.7, 1.76, 4]} />
        <meshBasicMaterial color="#38BDF8" transparent opacity={0.7} />
      </mesh>

      {/* 2. VR Headset Wall Mount Display Rack */}
      <group position={[-1.9, 1.6, 0]} rotation={[0, Math.PI / 2, 0]}>
        {/* Backing Display Board */}
        <mesh receiveShadow>
          <boxGeometry args={[2.8, 1.8, 0.06]} />
          <meshStandardMaterial color="#071B3A" roughness={0.4} metalness={0.7} />
        </mesh>
        {/* Blue Neon Border Frame */}
        <mesh position={[0, 0.88, 0.032]}>
          <boxGeometry args={[2.8, 0.02, 0.01]} />
          <meshBasicMaterial color="#00D2FF" />
        </mesh>
        <Text position={[0, 0.76, 0.04]} fontSize={0.09} color="#FFFFFF" fontWeight={800}>
          SPATIAL COMPUTING & VR/AR MATRIX
        </Text>

        {/* 6+ VR Headsets Mounted on Pegs (2 rows x 3 columns = 6 units) */}
        {[-0.8, 0, 0.8].map((hx, colIdx) =>
          [0.3, -0.3].map((hy, rowIdx) => (
            <group key={`vr-headset-${colIdx}-${rowIdx}`} position={[hx, hy, 0.12]}>
              {/* Wall Mount Peg */}
              <mesh position={[0, 0, -0.06]}>
                <cylinderGeometry args={[0.015, 0.015, 0.1, 8]} />
                <meshStandardMaterial color="#475569" metalness={0.9} />
              </mesh>
              {/* Headset Visor Body */}
              <mesh castShadow>
                <boxGeometry args={[0.22, 0.12, 0.14]} />
                <meshStandardMaterial color="#0F172A" roughness={0.2} metalness={0.4} />
              </mesh>
              {/* Front Curved Glass Shield */}
              <mesh position={[0, 0, 0.072]}>
                <boxGeometry args={[0.2, 0.1, 0.01]} />
                <meshStandardMaterial color="#00D2FF" transparent opacity={0.4} roughness={0.1} />
              </mesh>
              {/* Side Straps */}
              <mesh position={[0, 0, -0.06]}>
                <cylinderGeometry args={[0.11, 0.11, 0.02, 16, 1, true]} />
                <meshStandardMaterial color="#334155" />
              </mesh>
              {/* Status LED */}
              <mesh position={[0.08, 0.04, 0.078]}>
                <sphereGeometry args={[0.005, 8, 8]} />
                <meshBasicMaterial color="#10B981" />
              </mesh>
            </group>
          ))
        )}
      </group>

      {/* 3. Immersive Curved Preview Screen on East Partition */}
      <group position={[1.8, 1.6, 0]} rotation={[0, -Math.PI / 2, 0]}>
        <mesh receiveShadow>
          <boxGeometry args={[2.6, 1.4, 0.05]} />
          <meshStandardMaterial color="#071B3A" />
        </mesh>
        {/* Active VR Stream Screen */}
        <mesh position={[0, 0, 0.026]}>
          <planeGeometry args={[2.48, 1.28]} />
          <meshBasicMaterial color="#050C1A" />
        </mesh>
        <Text position={[0, 0.45, 0.03]} fontSize={0.07} color="#38BDF8" fontWeight={700}>
          LIVE GAZE VIEWPORT (HEADSET 01)
        </Text>
        {/* Hologram wireframe terrain */}
        <mesh position={[0, -0.1, 0.03]} rotation={[0.4, 0.5, 0]}>
          <torusKnotGeometry args={[0.22, 0.06, 64, 8]} />
          <meshBasicMaterial color="#00D2FF" wireframe />
        </mesh>
        <Text position={[0, -0.5, 0.03]} fontSize={0.06} color="#10B981" fontWeight={700}>
          90 FPS • 4K STEREO PASS-THROUGH
        </Text>
      </group>

      {/* 4. Ergonomic Beanbag Seating Lounge (Stylized soft furniture) */}
      {/* Beanbag 1 (Electric Blue) */}
      <group position={[-0.5, 0.28, 0.4]}>
        <mesh castShadow>
          <sphereGeometry args={[0.45, 16, 16]} />
          <meshStandardMaterial color="#1677FF" roughness={0.8} />
        </mesh>
        {/* Depression seat dent */}
        <mesh position={[0, 0.15, 0]}>
          <cylinderGeometry args={[0.35, 0.45, 0.25, 16]} />
          <meshStandardMaterial color="#0E5ECC" roughness={0.8} />
        </mesh>
      </group>

      {/* Beanbag 2 (Navy / Charcoal) */}
      <group position={[0.6, 0.28, 0.4]}>
        <mesh castShadow>
          <sphereGeometry args={[0.45, 16, 16]} />
          <meshStandardMaterial color="#1E293B" roughness={0.8} />
        </mesh>
        <mesh position={[0, 0.15, 0]}>
          <cylinderGeometry args={[0.35, 0.45, 0.25, 16]} />
          <meshStandardMaterial color="#0F172A" roughness={0.8} />
        </mesh>
      </group>

      {/* Beanbag 3 (Accent Cyan) */}
      <group position={[0.05, 0.28, -0.5]}>
        <mesh castShadow>
          <sphereGeometry args={[0.45, 16, 16]} />
          <meshStandardMaterial color="#0284C7" roughness={0.8} />
        </mesh>
      </group>
    </group>
  );
}
