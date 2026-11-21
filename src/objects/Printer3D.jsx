import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Text } from '@react-three/drei';

/**
 * Procedural Bambu Lab 3D Printer (A1 Mini in Alpha, A1 in Beta, Advanced in Gamma)
 * Features live toolhead and bed printing motion.
 */
export function Printer3D({ position = [3.2, 0, 1.0], modelType = 'A1 Mini', scale = 1 }) {
  const [x, y, z] = position;
  const toolheadRef = useRef();
  const bedRef = useRef();

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    if (toolheadRef.current) {
      toolheadRef.current.position.x = Math.sin(t * 3.5) * 0.07;
    }
    if (bedRef.current) {
      bedRef.current.position.z = 0.02 + Math.cos(t * 2) * 0.03;
    }
  });

  return (
    <group position={[x, y, z]} scale={scale} name={`3d-printer-${modelType}`}>
      {/* 1. Sturdy Workstation Counter / Cabinet */}
      <mesh position={[0, 0.42, 0]} castShadow receiveShadow>
        <boxGeometry args={[1.6, 0.84, 0.9]} />
        <meshStandardMaterial color="#1E293B" roughness={0.4} metalness={0.5} />
      </mesh>
      {/* Countertop (Light Oak Trim) */}
      <mesh position={[0, 0.85, 0]} receiveShadow>
        <boxGeometry args={[1.64, 0.04, 0.94]} />
        <meshStandardMaterial color="#D4B996" roughness={0.3} metalness={0.1} />
      </mesh>

      {/* 2. Printer Body Base */}
      <group position={[0, 0.87, 0]}>
        {/* Main Base Chassis */}
        <mesh position={[0, 0.04, 0]} castShadow>
          <boxGeometry args={[0.42, 0.08, 0.44]} />
          <meshStandardMaterial color="#E2E8F0" roughness={0.3} metalness={0.2} />
        </mesh>

        {/* Heated Bed / Textured PEI Plate with dynamic motion */}
        <group ref={bedRef} position={[0, 0, 0.02]}>
          <mesh position={[0, 0.085, 0]}>
            <boxGeometry args={[0.24, 0.01, 0.24]} />
            <meshStandardMaterial color="#334155" roughness={0.8} metalness={0.3} />
          </mesh>
          {/* Printed Part on Bed (Small Tech Cube / Calibration Print) */}
          <mesh position={[0, 0.12, 0]}>
            <boxGeometry args={[0.06, 0.06, 0.06]} />
            <meshStandardMaterial color="#1677FF" emissive="#1677FF" emissiveIntensity={0.6} />
          </mesh>
        </group>

        {/* Vertical Z-Axis Aluminum Extrusion Gantry */}
        <mesh position={[-0.14, 0.26, -0.06]} castShadow>
          <boxGeometry args={[0.05, 0.44, 0.05]} />
          <meshStandardMaterial color="#475569" roughness={0.2} metalness={0.9} />
        </mesh>
        <mesh position={[0.14, 0.26, -0.06]} castShadow>
          <boxGeometry args={[0.05, 0.44, 0.05]} />
          <meshStandardMaterial color="#475569" roughness={0.2} metalness={0.9} />
        </mesh>

        {/* Top Horizontal Crossbeam */}
        <mesh position={[0, 0.47, -0.06]}>
          <boxGeometry args={[0.34, 0.04, 0.04]} />
          <meshStandardMaterial color="#334155" roughness={0.3} metalness={0.8} />
        </mesh>

        {/* Toolhead / Extruder Carriage with dynamic X movement */}
        <group ref={toolheadRef} position={[0, 0.18, 0.02]}>
          <mesh castShadow>
            <boxGeometry args={[0.09, 0.08, 0.08]} />
            <meshStandardMaterial color="#0F172A" roughness={0.4} />
          </mesh>
          {/* Status LED */}
          <mesh position={[0, 0.02, 0.042]}>
            <sphereGeometry args={[0.008, 8, 8]} />
            <meshBasicMaterial color="#10B981" />
          </mesh>
        </group>

        {/* Filament Spool mounted on top */}
        <group position={[0.12, 0.54, -0.06]} rotation={[0, 0, Math.PI / 2]}>
          <mesh castShadow>
            <cylinderGeometry args={[0.09, 0.09, 0.05, 24]} />
            <meshStandardMaterial color="#00D2FF" roughness={0.5} />
          </mesh>
          <mesh>
            <cylinderGeometry args={[0.04, 0.04, 0.052, 16]} />
            <meshStandardMaterial color="#0F172A" />
          </mesh>
        </group>

        {/* Touchscreen UI Display Panel */}
        <group position={[0.16, 0.08, 0.18]} rotation={[-Math.PI / 6, 0, 0]}>
          <mesh>
            <boxGeometry args={[0.08, 0.05, 0.01]} />
            <meshStandardMaterial color="#0F172A" />
          </mesh>
          <mesh position={[0, 0, 0.006]}>
            <planeGeometry args={[0.07, 0.04]} />
            <meshBasicMaterial color="#1677FF" />
          </mesh>
        </group>

        {/* Bambu Lab Brand Label */}
        <Text
          position={[0, 0.04, 0.222]}
          fontSize={0.03}
          color="#0F172A"
          fontWeight={800}
          anchorX="center"
          anchorY="middle"
        >
          {`BAMBU LAB ${modelType.toUpperCase()}`}
        </Text>
      </group>

      {/* Filament Extra Spools beside the printer */}
      <group position={[-0.55, 0.94, 0.1]} rotation={[0, 0, Math.PI / 2]}>
        <mesh castShadow>
          <cylinderGeometry args={[0.09, 0.09, 0.05, 20]} />
          <meshStandardMaterial color="#F59E0B" roughness={0.4} />
        </mesh>
      </group>
      <group position={[-0.55, 0.94, -0.05]} rotation={[0, 0, Math.PI / 2]}>
        <mesh castShadow>
          <cylinderGeometry args={[0.09, 0.09, 0.05, 20]} />
          <meshStandardMaterial color="#10B981" roughness={0.4} />
        </mesh>
      </group>
    </group>
  );
}
