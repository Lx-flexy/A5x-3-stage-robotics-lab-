import React from 'react';
import { Text } from '@react-three/drei';

/**
 * Teaching Wall Whiteboard (Lab Alpha Foundation)
 */
export function Whiteboard({ position = [8.0, 1.8, 0.15], width = 6.0, height = 2.2 }) {
  const [x, y, z] = position;

  return (
    <group position={[x, y, z]} name="teaching-whiteboard">
      {/* 1. Whiteboard Outer Aluminum Frame */}
      <mesh receiveShadow>
        <boxGeometry args={[width + 0.1, height + 0.1, 0.04]} />
        <meshStandardMaterial color="#94A3B8" metalness={0.8} roughness={0.2} />
      </mesh>

      {/* 2. Magnetic Glossy Whiteboard Surface */}
      <mesh position={[0, 0, 0.015]} receiveShadow>
        <planeGeometry args={[width, height]} />
        <meshStandardMaterial color="#FFFFFF" roughness={0.15} metalness={0.05} />
      </mesh>

      {/* 3. Bottom Marker Tray */}
      <mesh position={[0, -height / 2 - 0.04, 0.05]}>
        <boxGeometry args={[width * 0.8, 0.03, 0.08]} />
        <meshStandardMaterial color="#64748B" metalness={0.7} />
      </mesh>
      {/* Dry Erase Markers in Tray (Red, Blue, Black) */}
      <mesh position={[-0.4, -height / 2 - 0.02, 0.05]} rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.008, 0.008, 0.12, 8]} />
        <meshStandardMaterial color="#EF4444" />
      </mesh>
      <mesh position={[-0.2, -height / 2 - 0.02, 0.05]} rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.008, 0.008, 0.12, 8]} />
        <meshStandardMaterial color="#1677FF" />
      </mesh>
      <mesh position={[0, -height / 2 - 0.02, 0.05]} rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.008, 0.008, 0.12, 8]} />
        <meshStandardMaterial color="#000000" />
      </mesh>

      {/* 4. Whiteboard Diagram Content (Dry Erase Sketches & System Notes) */}
      <group position={[0, 0, 0.02]}>
        <Text
          position={[-width / 2 + 0.4, height / 2 - 0.3, 0]}
          fontSize={0.18}
          color="#071B3A"
          fontWeight={900}
          anchorX="left"
        >
          A5X FOUNDATION ARCHITECTURE
        </Text>
        <Text
          position={[-width / 2 + 0.4, height / 2 - 0.55, 0]}
          fontSize={0.11}
          color="#1677FF"
          fontWeight={600}
          anchorX="left"
        >
          CIRCUITS • PROTOTYPING • FABRICATION BASICS
        </Text>

        {/* Drawn Block Diagram Lines */}
        <mesh position={[-0.8, 0, 0]}>
          <planeGeometry args={[1.2, 0.6]} />
          <meshBasicMaterial color="#E2E8F0" />
        </mesh>
        <Text position={[-0.8, 0.1, 0.005]} fontSize={0.09} color="#071B3A" fontWeight={700}>
          [ SENSORS ]
        </Text>
        <Text position={[-0.8, -0.1, 0.005]} fontSize={0.07} color="#64748B">
          Analog / Digital Inputs
        </Text>

        {/* Connecting Arrow */}
        <Text position={[0.2, 0, 0.005]} fontSize={0.14} color="#1677FF" fontWeight={900}>
          ──────►
        </Text>

        <mesh position={[1.2, 0, 0]}>
          <planeGeometry args={[1.2, 0.6]} />
          <meshBasicMaterial color="#E2E8F0" />
        </mesh>
        <Text position={[1.2, 0.1, 0.005]} fontSize={0.09} color="#071B3A" fontWeight={700}>
          [ CONTROLLER ]
        </Text>
        <Text position={[1.2, -0.1, 0.005]} fontSize={0.07} color="#64748B">
          Microcontroller Logic
        </Text>
      </group>

      {/* 5. Teacher's Podium / Presentation Desk in front of Whiteboard */}
      <group position={[0, -height / 2 - 0.8, 0.8]}>
        <mesh castShadow receiveShadow>
          <boxGeometry args={[1.2, 0.9, 0.6]} />
          <meshStandardMaterial color="#0F172A" roughness={0.3} metalness={0.5} />
        </mesh>
        {/* Podium Top */}
        <mesh position={[0, 0.47, 0]} receiveShadow>
          <boxGeometry args={[1.24, 0.04, 0.64]} />
          <meshStandardMaterial color="#D4B996" roughness={0.3} />
        </mesh>
        {/* Teacher Laptop */}
        <group position={[0, 0.5, 0]}>
          <mesh>
            <boxGeometry args={[0.32, 0.015, 0.22]} />
            <meshStandardMaterial color="#E2E8F0" metalness={0.9} />
          </mesh>
          <mesh position={[0, 0.1, -0.1]} rotation={[Math.PI / 6, 0, 0]}>
            <boxGeometry args={[0.32, 0.2, 0.01]} />
            <meshStandardMaterial color="#0F172A" />
          </mesh>
        </group>
      </group>
    </group>
  );
}
