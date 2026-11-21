import React from 'react';
import { Text } from '@react-three/drei';

/**
 * Hardware Zone Shelves & Tool Pegboard (Back-right wall at local (12.4, 0.8))
 */
export function HardwareShelves({ position = [12.4, 0, 0.8] }) {
  const [x, y, z] = position;

  return (
    <group position={[x, y, z]} name="hardware-shelves">
      {/* 1. Heavy Workbench / Storage Base */}
      <mesh position={[0, 0.45, 0]} castShadow receiveShadow>
        <boxGeometry args={[2.8, 0.9, 0.9]} />
        <meshStandardMaterial color="#1E293B" roughness={0.4} metalness={0.6} />
      </mesh>
      {/* Countertop */}
      <mesh position={[0, 0.92, 0]} receiveShadow>
        <boxGeometry args={[2.84, 0.04, 0.94]} />
        <meshStandardMaterial color="#D4B996" roughness={0.3} metalness={0.1} />
      </mesh>

      {/* 2. Wall Pegboard Panel */}
      <group position={[0, 1.85, -0.42]}>
        <mesh receiveShadow>
          <boxGeometry args={[2.7, 1.4, 0.04]} />
          <meshStandardMaterial color="#334155" roughness={0.7} />
        </mesh>

        {/* Hung Tool Silhouettes / Procedural Tools */}
        {/* Row of screwdrivers */}
        {[-1.0, -0.85, -0.7, -0.55].map((tx) => (
          <group key={`tool-${tx}`} position={[tx, 0.25, 0.03]}>
            <mesh>
              <cylinderGeometry args={[0.015, 0.015, 0.1, 8]} />
              <meshStandardMaterial color="#EF4444" />
            </mesh>
            <mesh position={[0, -0.1, 0]}>
              <cylinderGeometry args={[0.005, 0.005, 0.12, 8]} />
              <meshStandardMaterial color="#E2E8F0" metalness={0.9} />
            </mesh>
          </group>
        ))}

        {/* Pliers / Calipers */}
        <group position={[-0.2, 0.2, 0.03]}>
          <mesh rotation={[0, 0, 0.2]}>
            <boxGeometry args={[0.04, 0.18, 0.01]} />
            <meshStandardMaterial color="#3B82F6" />
          </mesh>
          <mesh rotation={[0, 0, -0.2]}>
            <boxGeometry args={[0.04, 0.18, 0.01]} />
            <meshStandardMaterial color="#3B82F6" />
          </mesh>
        </group>

        {/* Hardware Organizer Bin Rows on Pegboard */}
        {[0.4, 0.8, 1.1].map((bx) => (
          <mesh key={`peg-bin-${bx}`} position={[bx, 0.1, 0.05]}>
            <boxGeometry args={[0.26, 0.12, 0.12]} />
            <meshStandardMaterial color="#0284C7" />
          </mesh>
        ))}

        {/* Top Pegboard Label */}
        <Text position={[0, 0.6, 0.03]} fontSize={0.08} color="#FFFFFF" fontWeight={700}>
          HARDWARE & PROTOTYPING TOOLS
        </Text>
      </group>

      {/* Modular Hardware Cases on table */}
      <mesh position={[-0.8, 0.98, 0.1]} castShadow>
        <boxGeometry args={[0.45, 0.08, 0.32]} />
        <meshStandardMaterial color="#F59E0B" roughness={0.4} />
      </mesh>
      <mesh position={[0.5, 0.98, 0.1]} castShadow>
        <boxGeometry args={[0.4, 0.08, 0.3]} />
        <meshStandardMaterial color="#10B981" roughness={0.4} />
      </mesh>
    </group>
  );
}
