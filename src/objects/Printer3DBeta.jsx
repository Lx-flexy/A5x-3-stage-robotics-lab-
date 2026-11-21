import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Text } from '@react-three/drei';

/**
 * Premium Bambu Lab A1 with AMS Lite (4 Multi-Color Filament Spools) for Lab Beta
 * Features active multi-axis toolhead, oscillating bed, and rotating AMS feed spools.
 */
export function Printer3DBeta({ position = [19.2, 0, 1.0] }) {
  const [x, y, z] = position;
  const toolheadRef = useRef();
  const bedRef = useRef();
  const amsRef = useRef();

  const spoolColors = ['#00D2FF', '#1677FF', '#F59E0B', '#10B981'];

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    if (toolheadRef.current) {
      toolheadRef.current.position.x = Math.sin(t * 4) * 0.09;
    }
    if (bedRef.current) {
      bedRef.current.position.z = 0.02 + Math.cos(t * 2.5) * 0.04;
    }
    if (amsRef.current) {
      amsRef.current.rotation.z = Math.sin(t * 0.8) * 0.15;
    }
  });

  return (
    <group position={[x, y, z]} name="bambu-lab-a1-ams">
      {/* 1. Heavy Workstation Cabinet */}
      <mesh position={[0, 0.42, 0]} castShadow receiveShadow>
        <boxGeometry args={[1.8, 0.84, 0.95]} />
        <meshStandardMaterial color="#1E293B" roughness={0.4} metalness={0.6} />
      </mesh>
      {/* Countertop */}
      <mesh position={[0, 0.85, 0]} receiveShadow>
        <boxGeometry args={[1.84, 0.04, 0.99]} />
        <meshStandardMaterial color="#D4B996" roughness={0.3} metalness={0.1} />
      </mesh>

      {/* 2. Bambu Lab A1 Main Printer */}
      <group position={[-0.1, 0.87, 0]}>
        {/* Printer Base */}
        <mesh position={[0, 0.05, 0]} castShadow>
          <boxGeometry args={[0.5, 0.1, 0.52]} />
          <meshStandardMaterial color="#E2E8F0" roughness={0.25} metalness={0.3} />
        </mesh>

        {/* 256 x 256 mm Heated Bed with dynamic motion */}
        <group ref={bedRef} position={[0, 0, 0.02]}>
          <mesh position={[0, 0.105, 0]}>
            <boxGeometry args={[0.3, 0.012, 0.3]} />
            <meshStandardMaterial color="#1E293B" roughness={0.8} metalness={0.4} />
          </mesh>
          {/* Multi-Color Dual Tone Print on Bed */}
          <mesh position={[0, 0.15, 0]}>
            <cylinderGeometry args={[0.06, 0.07, 0.08, 16]} />
            <meshStandardMaterial color="#00D2FF" emissive="#1677FF" emissiveIntensity={0.5} />
          </mesh>
        </group>

        {/* Heavy Aluminum Dual-Z Axis Gantry */}
        <mesh position={[-0.18, 0.32, -0.08]} castShadow>
          <boxGeometry args={[0.06, 0.54, 0.06]} />
          <meshStandardMaterial color="#475569" metalness={0.9} roughness={0.2} />
        </mesh>
        <mesh position={[0.18, 0.32, -0.08]} castShadow>
          <boxGeometry args={[0.06, 0.54, 0.06]} />
          <meshStandardMaterial color="#475569" metalness={0.9} roughness={0.2} />
        </mesh>
        <mesh position={[0, 0.58, -0.08]}>
          <boxGeometry args={[0.42, 0.05, 0.05]} />
          <meshStandardMaterial color="#334155" metalness={0.8} />
        </mesh>

        {/* Toolhead Extruder Carriage with Active Hotend LED */}
        <group ref={toolheadRef} position={[0, 0.22, 0.02]}>
          <mesh castShadow>
            <boxGeometry args={[0.11, 0.1, 0.09]} />
            <meshStandardMaterial color="#0F172A" />
          </mesh>
          <mesh position={[0, 0.03, 0.048]}>
            <sphereGeometry args={[0.01, 8, 8]} />
            <meshBasicMaterial color="#00D2FF" />
          </mesh>
        </group>

        {/* 3. AMS Lite 4-Spool Rotary Feeder Unit on Top */}
        <group ref={amsRef} position={[0, 0.72, -0.08]}>
          {/* Central AMS Spindle Stand */}
          <mesh>
            <cylinderGeometry args={[0.04, 0.06, 0.15, 12]} />
            <meshStandardMaterial color="#1E293B" metalness={0.8} />
          </mesh>

          {/* 4 Spools arranged on rotary arms */}
          {spoolColors.map((color, i) => {
            const angle = (i * Math.PI) / 2;
            const sx = Math.cos(angle) * 0.2;
            const sy = Math.sin(angle) * 0.14;
            return (
              <group key={`ams-spool-${i}`} position={[sx, sy, 0]} rotation={[0, 0, angle]}>
                <mesh castShadow>
                  <cylinderGeometry args={[0.08, 0.08, 0.04, 20]} />
                  <meshStandardMaterial color={color} roughness={0.4} />
                </mesh>
                <mesh>
                  <cylinderGeometry args={[0.035, 0.035, 0.042, 16]} />
                  <meshStandardMaterial color="#0F172A" />
                </mesh>
              </group>
            );
          })}
        </group>

        {/* High-Res Color Touchscreen Interface */}
        <group position={[0.22, 0.1, 0.22]} rotation={[-Math.PI / 5, 0, 0]}>
          <mesh>
            <boxGeometry args={[0.11, 0.07, 0.012]} />
            <meshStandardMaterial color="#0F172A" />
          </mesh>
          <mesh position={[0, 0, 0.008]}>
            <planeGeometry args={[0.1, 0.06]} />
            <meshBasicMaterial color="#00D2FF" />
          </mesh>
        </group>

        <Text
          position={[0, 0.05, 0.262]}
          fontSize={0.032}
          color="#0F172A"
          fontWeight={900}
          anchorX="center"
        >
          {"BAMBU LAB A1 + AMS LITE (4-COLOR)"}
        </Text>
      </group>

      {/* 4. Side Filament Supply Rack with 4 Extra Spools */}
      <group position={[-0.65, 0.95, 0]}>
        {['#EF4444', '#8B5CF6', '#FFFFFF', '#1E293B'].map((col, idx) => (
          <group key={`shelf-spool-${idx}`} position={[0, 0, -0.3 + idx * 0.2]} rotation={[0, 0, Math.PI / 2]}>
            <mesh castShadow>
              <cylinderGeometry args={[0.085, 0.085, 0.045, 20]} />
              <meshStandardMaterial color={col} roughness={0.4} />
            </mesh>
          </group>
        ))}
      </group>
    </group>
  );
}
