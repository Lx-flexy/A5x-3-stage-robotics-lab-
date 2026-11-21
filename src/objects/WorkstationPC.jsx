import React, { useMemo } from 'react';
import * as THREE from 'three';
import { getCodeScreenTexture, getCadScreenTexture } from '../utils/screenCanvasTextures';

/**
 * High-Performance Workstation PC (Revision 4)
 * Uses pre-baked canvas textures instead of multiple Drei <Text> nodes.
 */
export function WorkstationPC({
  position = [15.2, 0, 9.0],
  rotation = [0, 0, 0],
  type = 'coding', // 'coding' | 'designing'
}) {
  const [x, y, z] = position;
  const isCoding = type === 'coding';

  const codeTexture = useMemo(() => getCodeScreenTexture(), []);
  const cadTexture = useMemo(() => getCadScreenTexture(), []);

  return (
    <group position={[x, y, z]} rotation={rotation} name={`workstation-${type}`}>
      {/* 1. Oak & Steel Desk */}
      <mesh position={[0, 0.72, 0]} castShadow receiveShadow>
        <boxGeometry args={[1.2, 0.04, 0.65]} />
        <meshStandardMaterial color="#D4B996" roughness={0.6} />
      </mesh>
      {/* Steel Desk Frame & Legs */}
      <mesh position={[0, 0.35, 0]}>
        <boxGeometry args={[1.16, 0.7, 0.61]} />
        <meshStandardMaterial color="#1E293B" metalness={0.8} roughness={0.3} wireframe />
      </mesh>

      {/* 2. Monitors */}
      {isCoding ? (
        // Dual Monitors with Code IDE display
        <group position={[0, 0.74, -0.15]}>
          {/* Main Landscape Monitor */}
          <group position={[-0.24, 0.22, 0]} rotation={[0, 0.08, 0]}>
            <mesh castShadow>
              <boxGeometry args={[0.55, 0.34, 0.03]} />
              <meshStandardMaterial color="#0F172A" />
            </mesh>
            <mesh position={[0, 0, 0.016]}>
              <planeGeometry args={[0.52, 0.31]} />
              <meshBasicMaterial map={codeTexture} />
            </mesh>
          </group>

          {/* Secondary Vertical Monitor */}
          <group position={[0.24, 0.24, 0]} rotation={[0, -0.15, 0]}>
            <mesh castShadow>
              <boxGeometry args={[0.32, 0.44, 0.03]} />
              <meshStandardMaterial color="#0F172A" />
            </mesh>
            <mesh position={[0, 0, 0.016]}>
              <planeGeometry args={[0.29, 0.41]} />
              <meshBasicMaterial map={codeTexture} />
            </mesh>
          </group>

          {/* Monitor Stand */}
          <mesh position={[0, 0.1, 0]}>
            <boxGeometry args={[0.24, 0.2, 0.08]} />
            <meshStandardMaterial color="#1E293B" metalness={0.8} />
          </mesh>
        </group>
      ) : (
        // Ultra-wide Curved Monitor with CAD Wireframe
        <group position={[0, 0.96, -0.15]}>
          <mesh castShadow>
            <boxGeometry args={[0.82, 0.38, 0.04]} />
            <meshStandardMaterial color="#0F172A" />
          </mesh>
          <mesh position={[0, 0, 0.022]}>
            <planeGeometry args={[0.78, 0.34]} />
            <meshBasicMaterial map={cadTexture} />
          </mesh>
        </group>
      )}

      {/* 3. Keyboard & Mouse */}
      <mesh position={[0, 0.745, 0.12]}>
        <boxGeometry args={[0.38, 0.01, 0.12]} />
        <meshStandardMaterial color="#1E293B" />
      </mesh>
      <mesh position={[0.26, 0.745, 0.12]}>
        <boxGeometry args={[0.06, 0.015, 0.09]} />
        <meshStandardMaterial color="#1677FF" />
      </mesh>

      {/* 4. Ergonomic Mesh Chair */}
      <group position={[0, 0, 0.52]}>
        {/* Seat */}
        <mesh position={[0, 0.45, 0]} castShadow>
          <boxGeometry args={[0.48, 0.06, 0.48]} />
          <meshStandardMaterial color="#0F172A" roughness={0.8} />
        </mesh>
        {/* Backrest */}
        <mesh position={[0, 0.8, -0.21]} castShadow>
          <boxGeometry args={[0.44, 0.55, 0.04]} />
          <meshStandardMaterial color="#1E293B" roughness={0.7} />
        </mesh>
        {/* Stem */}
        <mesh position={[0, 0.22, 0]}>
          <cylinderGeometry args={[0.035, 0.035, 0.44, 8]} />
          <meshStandardMaterial color="#334155" metalness={0.9} />
        </mesh>
      </group>
    </group>
  );
}
