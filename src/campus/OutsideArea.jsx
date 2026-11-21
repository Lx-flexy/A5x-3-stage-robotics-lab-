import React from 'react';
import * as THREE from 'three';
import { Text } from '@react-three/drei';
import { useCampusMaterials } from './Materials';
import { CAMPUS_CONFIG } from '../data/config';

export function OutsideArea() {
  const materials = useCampusMaterials();

  return (
    <group name="campus-outside-area">
      {/* 1. Large Outdoor Entrance Plaza Deck (z: 12 to 24, x: -6 to 64, width: 70m) */}
      <mesh position={[29, -0.06, 18]} receiveShadow>
        <boxGeometry args={[70, 0.12, 12]} />
        <primitive object={materials.exteriorFloor} />
      </mesh>

      {/* 2. Main Entrance Approach Pathway (leading to Alpha Door at x=8) */}
      <mesh position={[8, -0.04, 16]}>
        <boxGeometry args={[4.5, 0.13, 8]} />
        <primitive object={materials.labFloor} />
      </mesh>
      {/* Glowing Pathway Guide Inlay Lines */}
      <mesh position={[5.75, 0.03, 16]}>
        <boxGeometry args={[0.08, 0.005, 8]} />
        <primitive object={materials.electricBlueGlow} />
      </mesh>
      <mesh position={[10.25, 0.03, 16]}>
        <boxGeometry args={[0.08, 0.005, 8]} />
        <primitive object={materials.electricBlueGlow} />
      </mesh>

      {/* 3. Perimeter Glass Railing along edge of terrace (Z = 24) */}
      <group position={[29, 0.5, 24]}>
        <mesh>
          <boxGeometry args={[70, 1.0, 0.06]} />
          <primitive object={materials.glass} />
        </mesh>
        {/* Top Railing Cap */}
        <mesh position={[0, 0.52, 0]}>
          <boxGeometry args={[70.1, 0.05, 0.12]} />
          <primitive object={materials.darkMetal} />
        </mesh>
      </group>

      {/* Side Railings (West & East) */}
      <group position={[-6, 0.5, 18]}>
        <mesh>
          <boxGeometry args={[0.06, 1.0, 12]} />
          <primitive object={materials.glass} />
        </mesh>
      </group>
      <group position={[64, 0.5, 18]}>
        <mesh>
          <boxGeometry args={[0.06, 1.0, 12]} />
          <primitive object={materials.glass} />
        </mesh>
      </group>

      {/* 4. A5X Campus Monument / Entrance Totem (near spawn at x=8, z=19.5) */}
      <group position={[4.5, 0, 17]}>
        {/* Base Plinth */}
        <mesh position={[0, 0.15, 0]}>
          <boxGeometry args={[1.8, 0.3, 0.8]} />
          <primitive object={materials.darkMetal} />
        </mesh>
        {/* Main Monolith */}
        <mesh position={[0, 1.4, 0]}>
          <boxGeometry args={[1.4, 2.2, 0.35]} />
          <primitive object={materials.navyFeatureWall} />
        </mesh>
        {/* Glowing Vertical LED Strip */}
        <mesh position={[-0.65, 1.4, 0.18]}>
          <boxGeometry args={[0.05, 2.1, 0.02]} />
          <primitive object={materials.electricBlueGlow} />
        </mesh>
        {/* Totem Brand Text (Single consolidated text node) */}
        <Text
          position={[0, 1.6, 0.19]}
          fontSize={0.14}
          lineHeight={1.3}
          color="#FFFFFF"
          fontWeight={800}
          textAlign="center"
          anchorX="center"
          anchorY="middle"
        >
          {"A5X\nINNOVATION LAB COMPLEX\nIMPOSSIBLE ENGINEERING."}
        </Text>
      </group>

      {/* 5. Modern Architectural Planters & Greenery in Front of Labs */}
      {[0.5, 15.5, 16.5, 31.5, 32.5, 47.5].map((px) => (
        <group key={`planter-${px}`} position={[px, 0, 12.8]}>
          {/* Planter box */}
          <mesh position={[0, 0.3, 0]}>
            <boxGeometry args={[0.8, 0.6, 0.8]} />
            <primitive object={materials.darkMetal} />
          </mesh>
          {/* Plant soil */}
          <mesh position={[0, 0.58, 0]}>
            <boxGeometry args={[0.74, 0.05, 0.74]} />
            <meshStandardMaterial color="#2E1C11" roughness={0.9} />
          </mesh>
          {/* Stylized Architectural Foliage */}
          <mesh position={[0, 0.95, 0]}>
            <cylinderGeometry args={[0.35, 0.25, 0.8, 8]} />
            <meshStandardMaterial color="#15803D" roughness={0.7} />
          </mesh>
        </group>
      ))}

      {/* 6. Player Spawn Marker (Visual circle at spawn coordinates [8, 0.02, 19]) */}
      <group position={[8, 0.01, 19]}>
        <mesh rotation={[-Math.PI / 2, 0, 0]}>
          <ringGeometry args={[0.6, 0.75, 32]} />
          <primitive object={materials.electricBlueGlow} />
        </mesh>
        <Text
          position={[0, 0.02, 0]}
          rotation={[-Math.PI / 2, 0, 0]}
          fontSize={0.16}
          color="#00D2FF"
          anchorX="center"
          anchorY="middle"
        >
          SPAWN
        </Text>
      </group>
    </group>
  );
}
