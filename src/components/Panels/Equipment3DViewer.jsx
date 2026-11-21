import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Stage, Float } from '@react-three/drei';

function ModelRenderer({ equipmentId }) {
  const meshRef = useRef();

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    if (meshRef.current) {
      meshRef.current.rotation.y = t * 0.35;
    }
  });

  // Render dedicated high-detail 3D miniatures according to equipment
  if (equipmentId.includes('printer')) {
    return (
      <group ref={meshRef}>
        <mesh position={[0, -0.4, 0]}>
          <boxGeometry args={[1.2, 0.2, 1.2]} />
          <meshStandardMaterial color="#1E293B" metalness={0.8} />
        </mesh>
        <mesh position={[0, -0.28, 0]}>
          <boxGeometry args={[0.9, 0.04, 0.9]} />
          <meshStandardMaterial color="#00D2FF" emissive="#00D2FF" emissiveIntensity={0.2} />
        </mesh>
        {/* Gantry */}
        <mesh position={[-0.4, 0.2, 0]}>
          <boxGeometry args={[0.08, 1.0, 0.08]} />
          <meshStandardMaterial color="#475569" metalness={0.9} />
        </mesh>
        <mesh position={[0.4, 0.2, 0]}>
          <boxGeometry args={[0.08, 1.0, 0.08]} />
          <meshStandardMaterial color="#475569" metalness={0.9} />
        </mesh>
        <mesh position={[0, 0.65, 0]}>
          <boxGeometry args={[0.88, 0.1, 0.1]} />
          <meshStandardMaterial color="#334155" />
        </mesh>
        {/* Toolhead */}
        <mesh position={[0, 0.1, 0]}>
          <boxGeometry args={[0.2, 0.2, 0.2]} />
          <meshStandardMaterial color="#0F172A" />
        </mesh>
        {/* Print object */}
        <mesh position={[0, -0.16, 0]}>
          <octahedronGeometry args={[0.18, 0]} />
          <meshStandardMaterial color="#1677FF" emissive="#1677FF" emissiveIntensity={0.8} />
        </mesh>
      </group>
    );
  }

  if (equipmentId.includes('robotics')) {
    return (
      <group ref={meshRef}>
        <mesh position={[0, -0.1, 0]}>
          <boxGeometry args={[0.8, 0.22, 0.6]} />
          <meshStandardMaterial color="#1E293B" metalness={0.7} />
        </mesh>
        <mesh position={[0, 0.03, 0]}>
          <boxGeometry args={[0.7, 0.05, 0.5]} />
          <meshStandardMaterial color="#00D2FF" />
        </mesh>
        {/* 4 Wheels */}
        {[-0.35, 0.35].map((wx) =>
          [-0.26, 0.26].map((wz) => (
            <mesh key={`preview-wheel-${wx}-${wz}`} position={[wx, -0.14, wz]} rotation={[0, 0, Math.PI / 2]}>
              <cylinderGeometry args={[0.1, 0.1, 0.08, 16]} />
              <meshStandardMaterial color="#020617" />
            </mesh>
          ))
        )}
        {/* LiDAR Puck */}
        <mesh position={[0, 0.2, 0]}>
          <cylinderGeometry args={[0.12, 0.12, 0.14, 16]} />
          <meshStandardMaterial color="#0F172A" />
        </mesh>
        <mesh position={[0, 0.2, 0.12]}>
          <sphereGeometry args={[0.02, 8, 8]} />
          <meshBasicMaterial color="#EF4444" />
        </mesh>
      </group>
    );
  }

  if (equipmentId.includes('vr')) {
    return (
      <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
        <group ref={meshRef}>
          {/* VR Visor */}
          <mesh>
            <boxGeometry args={[0.8, 0.45, 0.4]} />
            <meshStandardMaterial color="#0F172A" roughness={0.2} metalness={0.6} />
          </mesh>
          <mesh position={[0, 0, 0.21]}>
            <planeGeometry args={[0.7, 0.35]} />
            <meshStandardMaterial color="#071B3A" metalness={0.9} roughness={0.1} />
          </mesh>
          {/* Headband strap */}
          <mesh position={[0, 0, -0.2]}>
            <torusGeometry args={[0.42, 0.04, 16, 32]} />
            <meshStandardMaterial color="#334155" />
          </mesh>
          {/* Optical sensors */}
          {[-0.25, 0.25].map((sx) => (
            <mesh key={`sensor-${sx}`} position={[sx, 0.12, 0.22]}>
              <circleGeometry args={[0.03, 16]} />
              <meshBasicMaterial color="#00D2FF" />
            </mesh>
          ))}
        </group>
      </Float>
    );
  }

  if (equipmentId.includes('display') || equipmentId.includes('wall')) {
    return (
      <group ref={meshRef}>
        {/* Frame */}
        <mesh>
          <boxGeometry args={[1.4, 0.8, 0.06]} />
          <meshStandardMaterial color="#071B3A" metalness={0.8} />
        </mesh>
        {/* Screen */}
        <mesh position={[0, 0, 0.032]}>
          <planeGeometry args={[1.34, 0.74]} />
          <meshBasicMaterial color="#00D2FF" />
        </mesh>
        {/* Stand */}
        <mesh position={[0, -0.48, 0]}>
          <cylinderGeometry args={[0.04, 0.04, 0.2, 16]} />
          <meshStandardMaterial color="#475569" />
        </mesh>
        <mesh position={[0, -0.58, 0]}>
          <cylinderGeometry args={[0.3, 0.3, 0.02, 24]} />
          <meshStandardMaterial color="#1E293B" />
        </mesh>
      </group>
    );
  }

  // Default Hardware Modular Station / Workstation
  return (
    <group ref={meshRef}>
      <mesh position={[0, -0.3, 0]}>
        <boxGeometry args={[1.0, 0.6, 0.7]} />
        <meshStandardMaterial color="#1E293B" />
      </mesh>
      <mesh position={[0, 0.02, 0]}>
        <boxGeometry args={[1.04, 0.04, 0.74]} />
        <meshStandardMaterial color="#D4B996" />
      </mesh>
      {/* Mini dual monitor */}
      <mesh position={[0, 0.25, -0.1]}>
        <boxGeometry args={[0.7, 0.4, 0.04]} />
        <meshStandardMaterial color="#0F172A" />
      </mesh>
      <mesh position={[0, 0.25, -0.078]}>
        <planeGeometry args={[0.66, 0.36]} />
        <meshBasicMaterial color="#1677FF" />
      </mesh>
    </group>
  );
}

export function Equipment3DViewer({ equipmentId }) {
  return (
    <div className="w-full h-56 rounded-xl overflow-hidden border border-blue-500/30 bg-slate-950 relative shadow-inner">
      <Canvas camera={{ position: [0, 1.2, 2.4], fov: 45 }}>
        <ambientLight intensity={0.8} />
        <directionalLight position={[3, 5, 2]} intensity={1.5} />
        <pointLight position={[-2, -1, -2]} color="#00D2FF" intensity={1.2} />
        <Stage adjustCamera={false} environment="city" intensity={0.6}>
          <ModelRenderer equipmentId={equipmentId} />
        </Stage>
        <OrbitControls enableZoom={true} enablePan={false} autoRotate autoRotateSpeed={1.5} />
      </Canvas>
      <div className="absolute bottom-2 right-3 pointer-events-none text-[10px] font-mono text-cyan-300 bg-slate-900/80 px-2 py-0.5 rounded border border-cyan-500/30">
        Interactive 3D • Click & Drag to Rotate
      </div>
    </div>
  );
}
