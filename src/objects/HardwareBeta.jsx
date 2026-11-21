import React from 'react';
import { Text } from '@react-three/drei';

/**
 * Advanced Hardware Development Racks for Lab Beta (Raspberry Pi Clusters, ESP32 nodes, Oscilloscopes)
 */
export function HardwareBeta({ position = [28.4, 0, 0.8] }) {
  const [x, y, z] = position;

  return (
    <group position={[x, y, z]} name="hardware-beta-zone">
      {/* 1. Heavy Workbench */}
      <mesh position={[0, 0.45, 0]} castShadow receiveShadow>
        <boxGeometry args={[2.8, 0.9, 0.9]} />
        <meshStandardMaterial color="#1E293B" roughness={0.4} metalness={0.6} />
      </mesh>
      {/* Countertop */}
      <mesh position={[0, 0.92, 0]} receiveShadow>
        <boxGeometry args={[2.84, 0.04, 0.94]} />
        <meshStandardMaterial color="#D4B996" roughness={0.3} metalness={0.1} />
      </mesh>

      {/* 2. Pegboard with Hardware Testing Instruments */}
      <group position={[0, 1.85, -0.42]}>
        <mesh receiveShadow>
          <boxGeometry args={[2.7, 1.4, 0.04]} />
          <meshStandardMaterial color="#1E293B" roughness={0.6} />
        </mesh>
        {/* Blue trim line */}
        <mesh position={[0, 0.68, 0.022]}>
          <boxGeometry args={[2.7, 0.02, 0.01]} />
          <meshBasicMaterial color="#00D2FF" />
        </mesh>
        <Text position={[0, 0.58, 0.03]} fontSize={0.08} color="#FFFFFF" fontWeight={800}>
          EMBEDDED SYSTEMS & IOT LAB
        </Text>

        {/* 3. Raspberry Pi 4/5 Stack Acrylic Cluster */}
        <group position={[-0.8, 0.05, 0.15]}>
          {[0, 0.06, 0.12, 0.18].map((py, idx) => (
            <group key={`pi-board-${idx}`} position={[0, py, 0]}>
              {/* Green PCB */}
              <mesh>
                <boxGeometry args={[0.22, 0.01, 0.16]} />
                <meshStandardMaterial color="#15803D" roughness={0.4} />
              </mesh>
              {/* Silver processor heatsink */}
              <mesh position={[0, 0.012, 0]}>
                <boxGeometry args={[0.05, 0.015, 0.05]} />
                <meshStandardMaterial color="#94A3B8" metalness={0.9} />
              </mesh>
              {/* Status LED */}
              <mesh position={[-0.08, 0.01, 0.06]}>
                <sphereGeometry args={[0.005, 8, 8]} />
                <meshBasicMaterial color={idx % 2 === 0 ? '#10B981' : '#EF4444'} />
              </mesh>
            </group>
          ))}
          <Text position={[0, 0.28, 0]} fontSize={0.045} color="#00D2FF" fontWeight={700}>
            PI 5 CLUSTER
          </Text>
        </group>

        {/* 4. Dual Digital Bench Oscilloscopes */}
        <group position={[0.2, 0.08, 0.15]}>
          <mesh castShadow>
            <boxGeometry args={[0.38, 0.24, 0.2]} />
            <meshStandardMaterial color="#334155" metalness={0.7} />
          </mesh>
          {/* Active Screen with Waveform */}
          <mesh position={[0, 0.02, 0.102]}>
            <planeGeometry args={[0.32, 0.18]} />
            <meshBasicMaterial color="#020914" />
          </mesh>
          <mesh position={[0, 0, 0.104]}>
            <planeGeometry args={[0.28, 0.04]} />
            <meshBasicMaterial color="#10B981" />
          </mesh>
        </group>

        {/* 5. ESP32 Node Array & Sensor Shields */}
        <group position={[0.9, 0.06, 0.15]}>
          <mesh castShadow>
            <boxGeometry args={[0.36, 0.14, 0.2]} />
            <meshStandardMaterial color="#0F172A" />
          </mesh>
          <mesh position={[0, 0.02, 0.102]}>
            <planeGeometry args={[0.32, 0.1]} />
            <meshBasicMaterial color="#1E293B" />
          </mesh>
        </group>
      </group>
    </group>
  );
}
