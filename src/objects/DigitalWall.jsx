import React, { useRef, useMemo } from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';
import { getDigitalWallTexture } from '../utils/screenCanvasTextures';

/**
 * High-Performance Digital Matrix Wall (Revision 4)
 * Uses high-resolution consolidated canvas texture instead of dozens of Drei <Text> instances.
 */
export function DigitalWall({
  position = [40, 1.8, 0.15],
  width = 7.4,
  height = 2.5,
}) {
  const [x, y, z] = position;
  const glowRingRef = useRef();
  const screenTexture = useMemo(() => getDigitalWallTexture(), []);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    if (glowRingRef.current) {
      glowRingRef.current.rotation.z = t * 0.15;
    }
  });

  return (
    <group position={[x, y, z]} name="gamma-digital-wall">
      {/* 1. Premium Brushed Dark Frame */}
      <mesh castShadow receiveShadow>
        <boxGeometry args={[width + 0.14, height + 0.14, 0.08]} />
        <meshStandardMaterial color="#0A1128" metalness={0.9} roughness={0.15} />
      </mesh>

      {/* 2. Panoramic Screen with Consolidated Canvas Texture */}
      <mesh position={[0, 0, 0.042]}>
        <planeGeometry args={[width, height]} />
        <meshBasicMaterial map={screenTexture} />
      </mesh>

      {/* 3. Center Rotating Holographic Ring */}
      <group position={[0, 0.05, 0.045]}>
        <mesh ref={glowRingRef}>
          <ringGeometry args={[0.55, 0.58, 36]} />
          <meshBasicMaterial color="#00D2FF" transparent opacity={0.6} side={THREE.DoubleSide} />
        </mesh>
      </group>

      {/* 4. Electric Blue LED Top & Bottom Trim */}
      <mesh position={[0, height / 2 + 0.06, 0.045]}>
        <boxGeometry args={[width * 0.98, 0.02, 0.02]} />
        <meshStandardMaterial color="#1677FF" emissive="#1677FF" emissiveIntensity={3.0} />
      </mesh>
      <mesh position={[0, -height / 2 - 0.06, 0.045]}>
        <boxGeometry args={[width * 0.98, 0.02, 0.02]} />
        <meshStandardMaterial color="#1677FF" emissive="#1677FF" emissiveIntensity={3.0} />
      </mesh>
    </group>
  );
}
