import React from 'react';
import { Printer3D } from './Printer3D';
import { Printer3DBeta } from './Printer3DBeta';
import { Printer3DGamma } from './Printer3DGamma';
import { WorkstationPC } from './WorkstationPC';

/**
 * Design & 3D Print Corner
 * Side-by-side unified cluster: Printer + Filament Storage + Prototype Display + Designing PC(s).
 */
export function DesignPrintCorner({ labType = 'alpha', position = [3.0, 0, 0.8] }) {
  const [x, y, z] = position;

  return (
    <group position={[x, y, z]} name={`design-print-corner-${labType}`}>
      {/* 1. 3D Printer (Left side of cluster) */}
      {labType === 'alpha' && <Printer3D position={[-1.0, 0, 0]} modelType="A1 Mini" />}
      {labType === 'beta' && <Printer3DBeta position={[-1.0, 0, 0]} />}
      {labType === 'gamma' && <Printer3DGamma position={[-1.2, 0, 0]} />}

      {/* 2. Central Prototype Display & Filament Showcase Rack */}
      <group position={[0.3, 0, 0]}>
        {/* Modern Oak & Metal 3-tier Showcase */}
        <mesh position={[0, 0.6, 0]} castShadow receiveShadow>
          <boxGeometry args={[0.8, 1.2, 0.5]} />
          <meshStandardMaterial color="#1E293B" metalness={0.7} roughness={0.3} />
        </mesh>
        {/* Glass display shelves */}
        {[-0.2, 0.2, 0.5].map((sy) => (
          <mesh key={`shelf-glass-${sy}`} position={[0, 0.6 + sy, 0]}>
            <boxGeometry args={[0.76, 0.02, 0.46]} />
            <meshStandardMaterial color="#93C5FD" transparent opacity={0.35} roughness={0.1} />
          </mesh>
        ))}
        {/* 3D Printed Calibration Artifacts on Display */}
        <mesh position={[-0.15, 0.84, 0]}>
          <dodecahedronGeometry args={[0.07, 0]} />
          <meshStandardMaterial color="#1677FF" emissive="#1677FF" emissiveIntensity={0.5} />
        </mesh>
        <mesh position={[0.15, 0.84, 0]}>
          <torusKnotGeometry args={[0.045, 0.015, 32, 8]} />
          <meshStandardMaterial color="#00D2FF" emissive="#00D2FF" emissiveIntensity={0.5} />
        </mesh>
      </group>

      {/* 3. Designing PC Workstation Desk(s) (Right side of cluster along back wall, facing +Z) */}
      {labType === 'alpha' && (
        <group position={[1.4, 0, 0]}>
          <WorkstationPC position={[0, 0, 0]} type="designing" rotation={[0, 0, 0]} />
        </group>
      )}

      {labType === 'beta' && (
        <group position={[1.4, 0, 0]}>
          <WorkstationPC position={[0, 0, 0]} type="designing" rotation={[0, 0, 0]} />
        </group>
      )}

      {labType === 'gamma' && (
        <group position={[1.2, 0, 0]}>
          <WorkstationPC position={[0, 0, 0]} type="designing" rotation={[0, 0, 0]} />
          <WorkstationPC position={[1.4, 0, 0]} type="designing" rotation={[0, 0, 0]} />
        </group>
      )}
    </group>
  );
}
