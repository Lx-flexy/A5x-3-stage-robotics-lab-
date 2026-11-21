import React from 'react';
import { Text } from '@react-three/drei';
import { useCampusMaterials } from './Materials';

/**
 * High-tech Brand Signage (Revision 18)
 * Clean, single-source signage.
 * Exterior facade signage is managed strictly by <Facade/>.
 * Interior zone signs are managed by data/zones.js.
 */
export function Signage() {
  const materials = useCampusMaterials();

  return (
    <group name="campus-signage">
      {/* Feature Wall Signage for Beta (Back Wall Z = 0.14) */}
      <group position={[24, 3.1, 0.14]}>
        <mesh position={[0, 0.35, 0]}>
          <boxGeometry args={[7.2, 0.04, 0.02]} />
          <primitive object={materials.electricBlueGlow} />
        </mesh>

        <Text
          position={[0, 0.15, 0.01]}
          fontSize={0.26}
          color="#00D2FF"
          anchorX="center"
          anchorY="middle"
          letterSpacing={0.08}
        >
          {"A5X"}
        </Text>
        <Text
          position={[0, -0.08, 0.01]}
          fontSize={0.32}
          color="#FFFFFF"
          fontWeight={800}
          anchorX="center"
          anchorY="middle"
          letterSpacing={0.06}
        >
          {"LAB BETA"}
        </Text>
        <Text
          position={[0, -0.28, 0.01]}
          fontSize={0.18}
          color="#93C5FD"
          anchorX="center"
          anchorY="middle"
        >
          {"Development Lab"}
        </Text>
      </group>
    </group>
  );
}
