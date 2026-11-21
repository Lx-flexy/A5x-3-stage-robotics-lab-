import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Text } from '@react-three/drei';

/**
 * Robotics Autonomy Testing Arena (Exclusively inside Gamma Arena Bay, 10m x 12m)
 * Features bordered floor track, 3 active autonomous prototype robots,
 * robot prep workbench with tool wall, and viewing benches along the glass partition.
 */
export function RoboticsArena({ position = [53.0, 0, 6.0] }) {
  const [x, y, z] = position;
  const lidarRef1 = useRef();
  const lidarRef2 = useRef();
  const lidarRef3 = useRef();
  const rover1Ref = useRef();
  const rover2Ref = useRef();
  const rover3Ref = useRef();

  // Animate AMR prototype robots moving dynamically along the track
  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    if (lidarRef1.current) lidarRef1.current.rotation.y = t * 7;
    if (lidarRef2.current) lidarRef2.current.rotation.y = t * 6;
    if (lidarRef3.current) lidarRef3.current.rotation.y = t * 8;

    // Rover 1: Outer oval circuit
    if (rover1Ref.current) {
      const angle = t * 0.45;
      const rx = Math.sin(angle) * 2.2;
      const rz = Math.cos(angle) * 1.8;
      rover1Ref.current.position.set(rx, 0.08, rz);
      rover1Ref.current.rotation.y = angle + Math.PI / 2;
    }

    // Rover 2: Inner agility slalom
    if (rover2Ref.current) {
      const angle = -t * 0.35 + 1.2;
      const rx = Math.sin(angle) * 1.3;
      const rz = Math.cos(angle) * 1.1;
      rover2Ref.current.position.set(rx, 0.08, rz);
      rover2Ref.current.rotation.y = angle - Math.PI / 2;
    }

    // Rover 3: Docking / Precision patrol maneuver
    if (rover3Ref.current) {
      const patrolZ = Math.sin(t * 0.5) * 1.4;
      const dir = Math.cos(t * 0.5);
      rover3Ref.current.position.set(-1.8, 0.08, patrolZ);
      rover3Ref.current.rotation.y = dir >= 0 ? 0 : Math.PI;
    }
  });

  return (
    <group position={[x, y, z]} name="robotics-testing-arena">
      {/* 1. Track Floor Mat with High-Contrast Border Lines */}
      <mesh position={[0, 0.005, 0]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[6.8, 5.8]} />
        <meshStandardMaterial color="#0B132B" roughness={0.7} />
      </mesh>

      {/* Track Boundary Curb / Barrier Railing (North, South, West, East) */}
      <mesh position={[0, 0.05, -2.85]}>
        <boxGeometry args={[6.8, 0.1, 0.1]} />
        <meshStandardMaterial color="#FACC15" />
      </mesh>
      <mesh position={[0, 0.05, 2.85]}>
        <boxGeometry args={[6.8, 0.1, 0.1]} />
        <meshStandardMaterial color="#FACC15" />
      </mesh>
      <mesh position={[-3.35, 0.05, 0]}>
        <boxGeometry args={[0.1, 0.1, 5.8]} />
        <meshStandardMaterial color="#FACC15" />
      </mesh>
      <mesh position={[3.35, 0.05, 0]}>
        <boxGeometry args={[0.1, 0.1, 5.8]} />
        <meshStandardMaterial color="#FACC15" />
      </mesh>

      {/* Track Circuit Painted Lines */}
      <mesh position={[0, 0.008, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[1.7, 1.8, 36]} />
        <meshBasicMaterial color="#FFFFFF" />
      </mesh>
      <mesh position={[0, 0.008, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[2.3, 2.38, 36]} />
        <meshBasicMaterial color="#00D2FF" />
      </mesh>
      {/* Start / Finish Checkered Line */}
      <mesh position={[0, 0.009, 2.05]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[0.6, 0.08]} />
        <meshBasicMaterial color="#EF4444" />
      </mesh>

      {/* 2. Autonomous Mobile Robot 1 (AMR Rover 01 - Fast Track) */}
      <group ref={rover1Ref} position={[1.5, 0.08, 1.2]}>
        <mesh castShadow>
          <boxGeometry args={[0.38, 0.09, 0.28]} />
          <meshStandardMaterial color="#1E293B" metalness={0.7} />
        </mesh>
        <mesh position={[0, 0.055, 0]}>
          <boxGeometry args={[0.32, 0.02, 0.24]} />
          <meshStandardMaterial color="#00D2FF" />
        </mesh>
        {/* 4 Wheels */}
        {[-0.16, 0.16].map((wx) =>
          [-0.12, 0.12].map((wz) => (
            <mesh key={`wheel-1-${wx}-${wz}`} position={[wx, 0, wz]} rotation={[0, 0, Math.PI / 2]}>
              <cylinderGeometry args={[0.048, 0.048, 0.035, 16]} />
              <meshStandardMaterial color="#020617" roughness={0.9} />
            </mesh>
          ))
        )}
        {/* Spinning LiDAR Puck */}
        <group ref={lidarRef1} position={[0, 0.13, 0]}>
          <mesh>
            <cylinderGeometry args={[0.038, 0.038, 0.045, 16]} />
            <meshStandardMaterial color="#0F172A" />
          </mesh>
          <mesh position={[0, 0, 0.036]}>
            <sphereGeometry args={[0.007, 8, 8]} />
            <meshBasicMaterial color="#EF4444" />
          </mesh>
        </group>
        <pointLight position={[0, -0.02, 0]} color="#00D2FF" intensity={0.5} distance={0.8} />
      </group>

      {/* 3. Autonomous Mobile Robot 2 (AMR Rover 02 - Slalom Rover) */}
      <group ref={rover2Ref} position={[-0.8, 0.08, -0.5]}>
        <mesh castShadow>
          <boxGeometry args={[0.34, 0.08, 0.26]} />
          <meshStandardMaterial color="#0F172A" metalness={0.8} />
        </mesh>
        <mesh position={[0, 0.05, 0]}>
          <boxGeometry args={[0.28, 0.02, 0.22]} />
          <meshStandardMaterial color="#1677FF" />
        </mesh>
        {[-0.14, 0.14].map((wx) =>
          [-0.11, 0.11].map((wz) => (
            <mesh key={`wheel-2-${wx}-${wz}`} position={[wx, 0, wz]} rotation={[0, 0, Math.PI / 2]}>
              <cylinderGeometry args={[0.045, 0.045, 0.03, 16]} />
              <meshStandardMaterial color="#020617" roughness={0.9} />
            </mesh>
          ))
        )}
        <group ref={lidarRef2} position={[0, 0.12, 0]}>
          <mesh>
            <cylinderGeometry args={[0.035, 0.035, 0.04, 16]} />
            <meshStandardMaterial color="#0F172A" />
          </mesh>
          <mesh position={[0, 0, 0.034]}>
            <sphereGeometry args={[0.006, 8, 8]} />
            <meshBasicMaterial color="#10B981" />
          </mesh>
        </group>
      </group>

      {/* 4. Autonomous Mobile Robot 3 (AMR Rover 03 - Precision Docking) */}
      <group ref={rover3Ref} position={[-1.8, 0.08, 0]}>
        <mesh castShadow>
          <boxGeometry args={[0.32, 0.08, 0.24]} />
          <meshStandardMaterial color="#334155" metalness={0.6} />
        </mesh>
        <mesh position={[0, 0.048, 0]}>
          <boxGeometry args={[0.26, 0.018, 0.2]} />
          <meshStandardMaterial color="#F59E0B" />
        </mesh>
        {[-0.13, 0.13].map((wx) =>
          [-0.1, 0.1].map((wz) => (
            <mesh key={`wheel-3-${wx}-${wz}`} position={[wx, 0, wz]} rotation={[0, 0, Math.PI / 2]}>
              <cylinderGeometry args={[0.042, 0.042, 0.028, 16]} />
              <meshStandardMaterial color="#020617" roughness={0.9} />
            </mesh>
          ))
        )}
        <group ref={lidarRef3} position={[0, 0.11, 0]}>
          <mesh>
            <cylinderGeometry args={[0.03, 0.03, 0.035, 16]} />
            <meshStandardMaterial color="#0F172A" />
          </mesh>
          <mesh position={[0, 0, 0.03]}>
            <sphereGeometry args={[0.005, 8, 8]} />
            <meshBasicMaterial color="#38BDF8" />
          </mesh>
        </group>
      </group>

      {/* 5. Agility Cones & Obstacles */}
      {[
        [-0.7, 0.6],
        [0.7, -0.7],
        [0.0, 0.0],
        [-1.1, -1.0],
        [1.2, 0.9],
        [-0.3, -1.8],
        [0.4, 1.8]
      ].map(([cx, cz], idx) => (
        <group key={`cone-${idx}`} position={[cx, 0, cz]}>
          <mesh position={[0, 0.01, 0]}>
            <boxGeometry args={[0.16, 0.02, 0.16]} />
            <meshStandardMaterial color="#EA580C" />
          </mesh>
          <mesh position={[0, 0.11, 0]}>
            <coneGeometry args={[0.06, 0.2, 12]} />
            <meshStandardMaterial color="#F97316" roughness={0.3} />
          </mesh>
          <mesh position={[0, 0.1, 0]}>
            <cylinderGeometry args={[0.042, 0.05, 0.045, 12, 1, true]} />
            <meshBasicMaterial color="#FFFFFF" />
          </mesh>
        </group>
      ))}

      {/* 6. Autonomous Wireless Charging Dock */}
      <group position={[-2.9, 0.2, -2.1]}>
        <mesh castShadow>
          <boxGeometry args={[0.45, 0.4, 0.5]} />
          <meshStandardMaterial color="#071B3A" metalness={0.8} />
        </mesh>
        <mesh position={[0.23, -0.05, 0]}>
          <boxGeometry args={[0.01, 0.12, 0.22]} />
          <meshStandardMaterial color="#FACC15" metalness={0.9} />
        </mesh>
        <mesh position={[0, 0.21, 0]}>
          <cylinderGeometry args={[0.02, 0.02, 0.02, 12]} />
          <meshBasicMaterial color="#10B981" />
        </mesh>
      </group>

      {/* 7. Robot Prep Bench with Tool Wall (East Wall at local X = +4.2m -> Global X = 57.2m) */}
      <group position={[4.2, 0, 0]}>
        {/* Heavy Workbench */}
        <mesh position={[0, 0.45, 0]} castShadow receiveShadow>
          <boxGeometry args={[0.8, 0.9, 3.2]} />
          <meshStandardMaterial color="#1E293B" roughness={0.4} metalness={0.6} />
        </mesh>
        {/* Steel Tabletop with Rubber Work Mat */}
        <mesh position={[0, 0.92, 0]}>
          <boxGeometry args={[0.84, 0.04, 3.24]} />
          <meshStandardMaterial color="#334155" roughness={0.3} metalness={0.5} />
        </mesh>
        {/* Diagnostic Laptop / Controller on Bench */}
        <mesh position={[0, 0.96, -0.8]}>
          <boxGeometry args={[0.3, 0.02, 0.22]} />
          <meshStandardMaterial color="#0F172A" />
        </mesh>
        <mesh position={[0, 1.08, -0.9]} rotation={[-Math.PI / 6, 0, 0]}>
          <boxGeometry args={[0.3, 0.2, 0.01]} />
          <meshStandardMaterial color="#0F172A" />
        </mesh>
        <mesh position={[0, 1.08, -0.89]} rotation={[-Math.PI / 6, 0, 0]}>
          <planeGeometry args={[0.28, 0.18]} />
          <meshBasicMaterial color="#00D2FF" />
        </mesh>
        {/* Tool pegboard behind bench against east wall */}
        <mesh position={[0.42, 1.6, 0]}>
          <boxGeometry args={[0.04, 1.2, 3.0]} />
          <meshStandardMaterial color="#071B3A" roughness={0.6} />
        </mesh>
      </group>

      {/* 8. Viewing Bench along the Glass Partition (West side at local X = -4.2m -> Global X = 48.8m) */}
      <group position={[-4.2, 0, 2.5]}>
        {/* Sleek architectural wood & steel bench */}
        <mesh position={[0, 0.24, 0]} castShadow receiveShadow>
          <boxGeometry args={[0.6, 0.06, 2.4]} />
          <meshStandardMaterial color="#D4B996" roughness={0.3} metalness={0.1} />
        </mesh>
        {[-0.9, 0.9].map((bz) => (
          <mesh key={`view-bench-leg-${bz}`} position={[0, 0.11, bz]}>
            <boxGeometry args={[0.5, 0.22, 0.08]} />
            <meshStandardMaterial color="#0F172A" metalness={0.8} />
          </mesh>
        ))}
      </group>
    </group>
  );
}
