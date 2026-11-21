import React from 'react';
import { Text } from '@react-three/drei';

/**
 * Electronics Zone Storage Unit (Shelves with color-coded component bins, sensor drawers)
 */
export function ElectronicsStorage({ position = [0.6, 0, 2.8] }) {
  const [x, y, z] = position;

  // Generate 4 rows x 3 columns of storage bins
  const binColors = ['#1677FF', '#00D2FF', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6'];

  return (
    <group position={[x, y, z]} name="electronics-storage">
      {/* 1. Industrial Steel Shelf Rack */}
      <group position={[0, 1.2, 0]}>
        {/* Vertical Uprights (4 corner posts) */}
        {[-0.35, 0.35].map((cx) =>
          [-1.2, 1.2].map((cz) => (
            <mesh key={`post-${cx}-${cz}`} position={[cx, 0, cz]}>
              <boxGeometry args={[0.04, 2.4, 0.04]} />
              <meshStandardMaterial color="#334155" metalness={0.8} roughness={0.3} />
            </mesh>
          ))
        )}

        {/* 4 Shelf Levels */}
        {[-0.9, -0.3, 0.3, 0.9].map((sy, i) => (
          <mesh key={`shelf-${sy}`} position={[0, sy, 0]} receiveShadow>
            <boxGeometry args={[0.8, 0.03, 2.45]} />
            <meshStandardMaterial color="#1E293B" metalness={0.5} roughness={0.5} />
          </mesh>
        ))}

        {/* 2. Color-coded Component Bins & Trays */}
        {[-0.8, -0.2, 0.4].map((sy, rowIdx) =>
          [-0.8, -0.4, 0, 0.4, 0.8].map((sz, colIdx) => {
            const color = binColors[(rowIdx * 5 + colIdx) % binColors.length];
            return (
              <group key={`bin-${rowIdx}-${colIdx}`} position={[0.05, sy + 0.08, sz]}>
                <mesh castShadow>
                  <boxGeometry args={[0.55, 0.14, 0.32]} />
                  <meshStandardMaterial color={color} roughness={0.4} />
                </mesh>
                {/* Bin Front Label */}
                <mesh position={[0.28, 0, 0]}>
                  <planeGeometry args={[0.01, 0.08]} />
                  <meshBasicMaterial color="#FFFFFF" />
                </mesh>
              </group>
            );
          })
        )}
      </group>

      {/* 3. Header Sign on Top of Shelf: "ELECTRONICS ZONE" */}
      <group position={[0, 2.5, 0]} rotation={[0, Math.PI / 2, 0]}>
        <mesh>
          <boxGeometry args={[1.8, 0.22, 0.04]} />
          <meshStandardMaterial color="#071B3A" />
        </mesh>
        <mesh position={[0, -0.1, 0.022]}>
          <boxGeometry args={[1.8, 0.02, 0.01]} />
          <meshBasicMaterial color="#00D2FF" />
        </mesh>
        <Text position={[0, 0.02, 0.03]} fontSize={0.09} color="#FFFFFF" fontWeight={700}>
          ELECTRONICS & SENSORS
        </Text>
      </group>
    </group>
  );
}
