import React, { useRef, useMemo } from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';
import { getSmartDisplayTexture } from '../utils/screenCanvasTextures';

/**
 * High-Performance Smart Display (Revision 4)
 * Uses high-resolution consolidated canvas texture instead of dozens of Drei <Text> instances.
 */
export function SmartDisplay({
  position = [24, 1.8, 0.15],
  width = 6.4,
  height = 2.4,
}) {
  const [x, y, z] = position;
  const pulseAuraRef = useRef();
  const screenTexture = useMemo(() => getSmartDisplayTexture(), []);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    if (pulseAuraRef.current) {
      const scale = 1 + Math.sin(t * 1.5) * 0.03;
      pulseAuraRef.current.scale.set(scale, scale, 1);
    }
  });

  return (
    <group position={[x, y, z]} name="beta-smart-display">
      {/* 1. Slim Bezel Frame */}
      <mesh castShadow receiveShadow>
        <boxGeometry args={[width + 0.12, height + 0.12, 0.06]} />
        <meshStandardMaterial color="#0B132B" metalness={0.9} roughness={0.2} />
      </mesh>

      {/* 2. LED Accent Underline Strip */}
      <mesh position={[0, -height / 2 - 0.05, 0.032]}>
        <boxGeometry args={[width * 0.92, 0.02, 0.015]} />
        <meshStandardMaterial color="#1677FF" emissive="#1677FF" emissiveIntensity={2.5} />
      </mesh>

      {/* 3. Main Consolidated Display Screen */}
      <mesh position={[0, 0, 0.032]}>
        <planeGeometry args={[width, height]} />
        <meshBasicMaterial map={screenTexture} />
      </mesh>

      {/* 4. Center Subtle Pulsing Holographic Ring */}
      <group position={[0, 0, 0.035]}>
        <mesh ref={pulseAuraRef}>
          <ringGeometry args={[0.55, 0.59, 36]} />
          <meshBasicMaterial color="#00D2FF" transparent opacity={0.6} side={THREE.DoubleSide} />
        </mesh>
      </group>

      {/* 5. Sleek Floor Mount Legs */}
      <mesh position={[-width / 2.6, -y / 2, -0.01]}>
        <cylinderGeometry args={[0.03, 0.03, y, 8]} />
        <meshStandardMaterial color="#1E293B" metalness={0.8} />
      </mesh>
      <mesh position={[width / 2.6, -y / 2, -0.01]}>
        <cylinderGeometry args={[0.03, 0.03, y, 8]} />
        <meshStandardMaterial color="#1E293B" metalness={0.8} />
      </mesh>
    </group>
  );
}
