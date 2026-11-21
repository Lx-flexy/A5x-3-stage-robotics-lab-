import React from 'react';
import { Text } from '@react-three/drei';

/**
 * Dedicated Soldering Arena (Workbench, Fume Extractor Arm, Hakko Soldering Iron, Low Glass Safety Screen)
 * Complies with Revision 2: Sits in a corner, separated from seating by a low glass safety screen.
 */
export function SolderingArena({ position = [1.6, 0, 9.8] }) {
  const [x, y, z] = position;

  return (
    <group position={[x, y, z]} name="soldering-arena">
      {/* 1. ESD Protective Floor Mat Boundary */}
      <mesh position={[0, 0.005, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[2.4, 2.2]} />
        <meshStandardMaterial color="#1E293B" roughness={0.9} />
      </mesh>
      {/* Yellow Safety Hazard Boundary Line */}
      <mesh position={[0, 0.008, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[1.08, 1.14, 4]} />
        <meshBasicMaterial color="#FACC15" />
      </mesh>

      {/* 2. Heavy-Duty Soldering Workbench */}
      <group position={[-0.2, 0, 0]}>
        {/* Tabletop with Blue ESD Work Mat */}
        <mesh position={[0, 0.85, 0]} castShadow receiveShadow>
          <boxGeometry args={[1.8, 0.05, 0.85]} />
          <meshStandardMaterial color="#0284C7" roughness={0.6} />
        </mesh>
        {/* Sturdy Steel Frame & Legs */}
        <mesh position={[-0.8, 0.42, -0.35]}>
          <boxGeometry args={[0.06, 0.82, 0.06]} />
          <meshStandardMaterial color="#0F172A" metalness={0.8} />
        </mesh>
        <mesh position={[0.8, 0.42, -0.35]}>
          <boxGeometry args={[0.06, 0.82, 0.06]} />
          <meshStandardMaterial color="#0F172A" metalness={0.8} />
        </mesh>
        <mesh position={[-0.8, 0.42, 0.35]}>
          <boxGeometry args={[0.06, 0.82, 0.06]} />
          <meshStandardMaterial color="#0F172A" metalness={0.8} />
        </mesh>
        <mesh position={[0.8, 0.42, 0.35]}>
          <boxGeometry args={[0.06, 0.82, 0.06]} />
          <meshStandardMaterial color="#0F172A" metalness={0.8} />
        </mesh>

        {/* 3. Articulated Fume Extractor Arm */}
        <group position={[-0.5, 0.88, -0.2]}>
          {/* Base clamp */}
          <mesh position={[0, 0.04, 0]}>
            <cylinderGeometry args={[0.06, 0.06, 0.08, 12]} />
            <meshStandardMaterial color="#1E293B" metalness={0.7} />
          </mesh>
          {/* Lower Arm Segment */}
          <mesh position={[0.08, 0.28, 0.05]} rotation={[0.4, 0, -0.3]}>
            <cylinderGeometry args={[0.025, 0.025, 0.45, 8]} />
            <meshStandardMaterial color="#E2E8F0" metalness={0.4} />
          </mesh>
          {/* Upper Arm Segment */}
          <mesh position={[0.22, 0.52, 0.15]} rotation={[-0.5, 0, 0.4]}>
            <cylinderGeometry args={[0.022, 0.022, 0.4, 8]} />
            <meshStandardMaterial color="#E2E8F0" metalness={0.4} />
          </mesh>
          {/* Extraction Hood / Funnel */}
          <mesh position={[0.32, 0.45, 0.25]} rotation={[Math.PI / 3, 0, 0]}>
            <coneGeometry args={[0.1, 0.12, 16, 1, true]} />
            <meshStandardMaterial color="#0284C7" side={2} />
          </mesh>
        </group>

        {/* 4. Hakko Digital Soldering Station Unit */}
        <group position={[0.4, 0.94, -0.1]}>
          <mesh castShadow>
            <boxGeometry args={[0.2, 0.12, 0.18]} />
            <meshStandardMaterial color="#1E293B" />
          </mesh>
          <mesh position={[0, 0.02, 0.091]}>
            <planeGeometry args={[0.08, 0.04]} />
            <meshBasicMaterial color="#000000" />
          </mesh>
          <Text position={[0, 0.02, 0.092]} fontSize={0.024} color="#EF4444" fontWeight={700}>
            {"350°C"}
          </Text>

          {/* Soldering Iron in Stand */}
          <group position={[0.18, 0, 0.05]} rotation={[0.6, 0, 0]}>
            <mesh>
              <cylinderGeometry args={[0.012, 0.015, 0.2, 8]} />
              <meshStandardMaterial color="#0284C7" />
            </mesh>
            <mesh position={[0, 0.11, 0]}>
              <coneGeometry args={[0.005, 0.03, 8]} />
              <meshStandardMaterial color="#E2E8F0" metalness={0.9} />
            </mesh>
          </group>

          {/* Solder Spool Reel */}
          <mesh position={[-0.18, 0.04, 0.05]} rotation={[0, 0, Math.PI / 2]}>
            <cylinderGeometry args={[0.04, 0.04, 0.05, 16]} />
            <meshStandardMaterial color="#94A3B8" metalness={0.8} />
          </mesh>
        </group>

        {/* Circuit Board / PCB */}
        <mesh position={[0.05, 0.88, 0.1]}>
          <boxGeometry args={[0.2, 0.008, 0.14]} />
          <meshStandardMaterial color="#15803D" roughness={0.3} />
        </mesh>
      </group>

      {/* 5. Low Glass Safety Screen separating soldering area from student seating */}
      <group position={[1.18, 0.48, 0]}>
        <mesh castShadow receiveShadow>
          <boxGeometry args={[0.04, 0.94, 2.2]} />
          <meshStandardMaterial
            color="#93C5FD"
            opacity={0.35}
            transparent
            roughness={0.1}
          />
        </mesh>
        {/* Brushed Stainless Steel Upright Posts */}
        {[-0.95, 0, 0.95].map((pz) => (
          <mesh key={`glass-post-${pz}`} position={[0, 0, pz]}>
            <cylinderGeometry args={[0.025, 0.025, 0.96, 12]} />
            <meshStandardMaterial color="#64748B" metalness={0.9} roughness={0.2} />
          </mesh>
        ))}
      </group>
    </group>
  );
}
