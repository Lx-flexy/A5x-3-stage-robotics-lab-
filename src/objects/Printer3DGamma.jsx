import React from 'react';
import { Text } from '@react-three/drei';

/**
 * Industrial Enclosed High-Speed Multi-Material 3D Printer for Lab Gamma
 */
export function Printer3DGamma({ position = [35.2, 0, 1.0] }) {
  const [x, y, z] = position;

  return (
    <group position={[x, y, z]} name="industrial-3d-printer">
      {/* 1. Heavy Workstation Cabinet */}
      <mesh position={[0, 0.42, 0]} castShadow receiveShadow>
        <boxGeometry args={[1.8, 0.84, 0.95]} />
        <meshStandardMaterial color="#0F172A" roughness={0.3} metalness={0.7} />
      </mesh>
      <mesh position={[0, 0.85, 0]} receiveShadow>
        <boxGeometry args={[1.84, 0.04, 0.99]} />
        <meshStandardMaterial color="#D4B996" roughness={0.3} />
      </mesh>

      {/* 2. Industrial Enclosed Printer Chamber */}
      <group position={[0, 0.87, 0]}>
        {/* Exterior Chamber Body (Charcoal + Aluminum) */}
        <mesh position={[0, 0.35, 0]} castShadow>
          <boxGeometry args={[0.68, 0.7, 0.6]} />
          <meshStandardMaterial color="#1E293B" metalness={0.8} roughness={0.25} />
        </mesh>

        {/* Front Heated Tinted Glass Door */}
        <mesh position={[0, 0.35, 0.305]}>
          <boxGeometry args={[0.54, 0.58, 0.015]} />
          <meshStandardMaterial
            color="#38BDF8"
            opacity={0.35}
            transparent
            roughness={0.1}
          />
        </mesh>
        {/* Door Aluminum Handle */}
        <mesh position={[0.22, 0.35, 0.32]}>
          <cylinderGeometry args={[0.01, 0.01, 0.25, 8]} />
          <meshStandardMaterial color="#E2E8F0" metalness={0.9} />
        </mesh>

        {/* Internal Chamber Heated Bed & Lighting */}
        <mesh position={[0, 0.16, 0]}>
          <boxGeometry args={[0.4, 0.02, 0.4]} />
          <meshStandardMaterial color="#0A0F1D" roughness={0.9} />
        </mesh>
        {/* Internal LED Accent Glow */}
        <mesh position={[0, 0.62, 0]}>
          <boxGeometry args={[0.5, 0.02, 0.04]} />
          <meshBasicMaterial color="#00D2FF" />
        </mesh>
        {/* Complex Carbon Fiber Mechanical Print on Bed */}
        <mesh position={[0, 0.24, 0]}>
          <torusGeometry args={[0.08, 0.03, 16, 32]} />
          <meshStandardMaterial color="#334155" metalness={0.6} roughness={0.3} />
        </mesh>

        {/* High-Resolution Side Touch Controller */}
        <group position={[0.36, 0.35, 0.15]} rotation={[0, Math.PI / 4, 0]}>
          <mesh>
            <boxGeometry args={[0.16, 0.26, 0.02]} />
            <meshStandardMaterial color="#0F172A" />
          </mesh>
          <mesh position={[0, 0, 0.012]}>
            <planeGeometry args={[0.14, 0.24]} />
            <meshBasicMaterial color="#1677FF" />
          </mesh>
        </group>

        <Text position={[0, 0.65, 0.31]} fontSize={0.038} color="#FFFFFF" fontWeight={900}>
          A5X PRO X-1 ADVANCED FABRICATOR
        </Text>
      </group>
    </group>
  );
}
