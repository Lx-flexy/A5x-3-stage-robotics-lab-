import React from 'react';
import { Text } from '@react-three/drei';

/**
 * Advanced Edge AI & Robotics Hardware Benches for Lab Gamma
 */
export function HardwareGamma({ position = [44.4, 0, 0.8] }) {
  const [x, y, z] = position;

  return (
    <group position={[x, y, z]} name="hardware-gamma-zone">
      {/* 1. Heavy Workbench */}
      <mesh position={[0, 0.45, 0]} castShadow receiveShadow>
        <boxGeometry args={[2.8, 0.9, 0.9]} />
        <meshStandardMaterial color="#0F172A" roughness={0.3} metalness={0.7} />
      </mesh>
      <mesh position={[0, 0.92, 0]} receiveShadow>
        <boxGeometry args={[2.84, 0.04, 0.94]} />
        <meshStandardMaterial color="#D4B996" roughness={0.3} />
      </mesh>

      {/* 2. Pegboard with Sensor Breakouts & Robot Modules */}
      <group position={[0, 1.85, -0.42]}>
        <mesh receiveShadow>
          <boxGeometry args={[2.7, 1.4, 0.04]} />
          <meshStandardMaterial color="#071B3A" roughness={0.5} />
        </mesh>
        <mesh position={[0, 0.68, 0.022]}>
          <boxGeometry args={[2.7, 0.02, 0.01]} />
          <meshBasicMaterial color="#38BDF8" />
        </mesh>
        <Text position={[0, 0.58, 0.03]} fontSize={0.08} color="#FFFFFF" fontWeight={800}>
          EDGE AI & EMBEDDED ROBOTICS R&D
        </Text>

        {/* 3. NVIDIA Jetson AGX Orin Developer Kit */}
        <group position={[-0.8, 0.1, 0.15]}>
          <mesh castShadow>
            <boxGeometry args={[0.32, 0.12, 0.28]} />
            <meshStandardMaterial color="#1E293B" metalness={0.8} />
          </mesh>
          {/* Black finned heatsink on top */}
          <mesh position={[0, 0.08, 0]}>
            <boxGeometry args={[0.22, 0.04, 0.22]} />
            <meshStandardMaterial color="#0A0F1D" metalness={0.9} />
          </mesh>
        </group>

        {/* 4. Desktop 6-DOF Robotic Arm Prototype */}
        <group position={[0.2, 0.08, 0.18]}>
          {/* Base */}
          <mesh>
            <cylinderGeometry args={[0.1, 0.12, 0.06, 16]} />
            <meshStandardMaterial color="#1E293B" metalness={0.8} />
          </mesh>
          {/* Shoulder & Bicep Link */}
          <mesh position={[0.04, 0.18, 0]} rotation={[0, 0, -0.3]}>
            <cylinderGeometry args={[0.025, 0.025, 0.32, 8]} />
            <meshStandardMaterial color="#38BDF8" metalness={0.6} />
          </mesh>
          {/* Forearm Link */}
          <mesh position={[0.12, 0.38, 0]} rotation={[0, 0, 0.5]}>
            <cylinderGeometry args={[0.02, 0.02, 0.28, 8]} />
            <meshStandardMaterial color="#E2E8F0" metalness={0.8} />
          </mesh>
          {/* Gripper Hand */}
          <mesh position={[0.2, 0.46, 0]}>
            <boxGeometry args={[0.06, 0.04, 0.06]} />
            <meshStandardMaterial color="#EF4444" />
          </mesh>
        </group>

        {/* 5. Solid-State LiDAR Sensor Unit */}
        <group position={[0.9, 0.1, 0.15]}>
          <mesh castShadow>
            <cylinderGeometry args={[0.09, 0.09, 0.16, 16]} />
            <meshStandardMaterial color="#0F172A" metalness={0.7} />
          </mesh>
          <mesh position={[0, 0.04, 0.08]}>
            <boxGeometry args={[0.08, 0.05, 0.02]} />
            <meshBasicMaterial color="#1677FF" />
          </mesh>
        </group>
      </group>
    </group>
  );
}
