import React from 'react';
import * as THREE from 'three';
import { useCampusMaterials } from './Materials';
import { CAMPUS_CONFIG } from '../data/config';
import { useStore } from '../store/useStore';
import { AutoDoor } from './AutoDoor';

/**
 * Campus Architecture - Floor slabs, Navy feature walls, Glass partitions,
 * and Universal AutoDoors.
 * Revision 20: Pristine two-sided rendering and dual sliding glass leaves for all portals.
 */
export function Architecture() {
  const materials = useCampusMaterials();
  const showCeiling = useStore((state) => state.showCeiling);

  const { labHeight, wallThickness } = CAMPUS_CONFIG.dimensions;
  const totalWidth = CAMPUS_CONFIG.totalWidth; // 60m

  // Four floor segments: Alpha (0-16), Beta (16-32), Gamma Main (32-48), Gamma Arena (48-60)
  const floorSegments = [
    { id: 'alpha', cx: 8, width: 16, cz: 6, depth: 12, mat: materials.labFloor },
    { id: 'beta', cx: 24, width: 16, cz: 6, depth: 12, mat: materials.labFloor },
    { id: 'gamma-main', cx: 40, width: 16, cz: 6, depth: 12, mat: materials.labFloor },
    { id: 'gamma-arena', cx: 54, width: 12, cz: 6, depth: 12, mat: materials.exteriorFloor }
  ];

  return (
    <group name="campus-architecture">
      {/* =========================================================================
          1. FLOOR SLABS (Interiors & Inlay Accents)
         ========================================================================= */}
      {floorSegments.map((seg) => (
        <group key={`floor-${seg.id}`}>
          <mesh position={[seg.cx, -0.05, seg.cz]} receiveShadow>
            <boxGeometry args={[seg.width, 0.1, seg.depth]} />
            <primitive object={seg.mat} />
          </mesh>

          {/* Floor Divider Inlay Glow Line at the East Boundary */}
          {seg.cx + seg.width / 2 < totalWidth && (
            <mesh position={[seg.cx + seg.width / 2, 0.002, seg.cz]}>
              <boxGeometry args={[0.06, 0.005, seg.depth]} />
              <primitive object={materials.electricBlueGlow} />
            </mesh>
          )}
        </group>
      ))}

      {/* =========================================================================
          2. BACK WALL (Z = 0) - Navy Feature Walls with Glowing Blue LED Strip
         ========================================================================= */}
      {floorSegments.map((seg) => (
        <group key={`back-wall-${seg.id}`} position={[seg.cx, labHeight / 2, 0]}>
          <mesh receiveShadow>
            <boxGeometry args={[seg.width - 0.04, labHeight, wallThickness]} />
            <primitive object={materials.navyFeatureWall} />
          </mesh>

          {/* Top Ceiling Horizon Blue LED Ribbon */}
          <mesh position={[0, labHeight / 2 - 0.06, wallThickness / 2 + 0.01]}>
            <boxGeometry args={[seg.width, 0.06, 0.02]} />
            <primitive object={materials.electricBlueGlow} />
          </mesh>

          {/* Vertical Accent Blue Pillars (for Beta & Gamma) */}
          {seg.id !== 'alpha' && (
            <>
              <mesh position={[-seg.width / 2 + 0.2, 0, wallThickness / 2 + 0.02]}>
                <boxGeometry args={[0.08, labHeight, 0.03]} />
                <primitive object={materials.electricBlueGlow} />
              </mesh>
              <mesh position={[seg.width / 2 - 0.2, 0, wallThickness / 2 + 0.02]}>
                <boxGeometry args={[0.08, labHeight, 0.03]} />
                <primitive object={materials.electricBlueGlow} />
              </mesh>
            </>
          )}

          {/* Dark Baseboard Trim */}
          <mesh position={[0, -labHeight / 2 + 0.1, wallThickness / 2 + 0.02]}>
            <boxGeometry args={[seg.width, 0.2, 0.03]} />
            <primitive object={materials.darkMetal} />
          </mesh>
        </group>
      ))}

      {/* =========================================================================
          3. EXTERIOR SIDE WALLS (West at X=0, East at X=58)
         ========================================================================= */}
      {/* West Wall (Lab Alpha left wall) */}
      <mesh position={[-wallThickness / 2, labHeight / 2, 6]} receiveShadow>
        <boxGeometry args={[wallThickness, labHeight, 12]} />
        <primitive object={materials.interiorWall} />
      </mesh>
      <mesh position={[0.02, labHeight / 2, 6]}>
        <boxGeometry args={[0.03, labHeight, 0.06]} />
        <primitive object={materials.electricBlueGlow} />
      </mesh>

      {/* East Wall (Lab Gamma Arena Bay far right wall at X=58) */}
      <mesh position={[totalWidth + wallThickness / 2, labHeight / 2, 6]} receiveShadow>
        <boxGeometry args={[wallThickness, labHeight, 12]} />
        <primitive object={materials.interiorWall} />
      </mesh>
      <mesh position={[totalWidth - 0.02, labHeight / 2, 6]}>
        <boxGeometry args={[0.03, labHeight, 0.06]} />
        <primitive object={materials.electricBlueGlow} />
      </mesh>

      {/* =========================================================================
          4. INTERIOR PARTITION WALLS & CONNECTING PORTALS
         ========================================================================= */}

      {/* Partition 1: Alpha <-> Beta (at X = 16) */}
      <group position={[16, 0, 0]}>
        <mesh position={[0, labHeight / 2, 2.25]} receiveShadow>
          <boxGeometry args={[wallThickness, labHeight, 4.5]} />
          <primitive object={materials.interiorWall} />
        </mesh>
        <mesh position={[0, labHeight / 2, 9.75]} receiveShadow>
          <boxGeometry args={[wallThickness, labHeight, 4.5]} />
          <primitive object={materials.interiorWall} />
        </mesh>
        <AutoDoor
          id="door-alpha-beta"
          position={[0, 0, 6.0]}
          axis="x"
          width={3.0}
          height={2.4}
          wallThickness={wallThickness}
          labelSideA="LAB BETA ▶"
          subLabelSideA="DEVELOPMENT LAB"
          labelSideB="◀ LAB ALPHA"
          subLabelSideB="FOUNDATION LAB"
        />
      </group>

      {/* Partition 2: Beta <-> Gamma Main (at X = 32) */}
      <group position={[32, 0, 0]}>
        <mesh position={[0, labHeight / 2, 2.25]} receiveShadow>
          <boxGeometry args={[wallThickness, labHeight, 4.5]} />
          <primitive object={materials.interiorWall} />
        </mesh>
        <mesh position={[0, labHeight / 2, 9.75]} receiveShadow>
          <boxGeometry args={[wallThickness, labHeight, 4.5]} />
          <primitive object={materials.interiorWall} />
        </mesh>
        <AutoDoor
          id="door-beta-gamma"
          position={[0, 0, 6.0]}
          axis="x"
          width={3.0}
          height={2.4}
          wallThickness={wallThickness}
          labelSideA="LAB GAMMA ▶"
          subLabelSideA="ADVANCED INNOVATION LAB"
          labelSideB="◀ LAB BETA"
          subLabelSideB="DEVELOPMENT LAB"
        />
      </group>

      {/* Partition 3: Gamma Main <-> Gamma Arena (at X = 48) - FULL-HEIGHT GLASS OBSERVATION WALL */}
      <group position={[48, 0, 0]}>
        {/* Back Glass Section: Z in [0, 4.5] */}
        <mesh position={[0, 1.2, 2.25]}>
          <boxGeometry args={[0.08, 2.4, 4.5]} />
          <primitive object={materials.glass} />
        </mesh>
        {/* Front Glass Section: Z in [7.5, 12] */}
        <mesh position={[0, 1.2, 9.75]}>
          <boxGeometry args={[0.08, 2.4, 4.5]} />
          <primitive object={materials.glass} />
        </mesh>
        {/* Observation Wall Mullions */}
        {[0.1, 2.25, 4.5, 7.5, 9.75, 11.9].map((mz) => (
          <mesh key={`arena-mullion-${mz}`} position={[0, 1.2, mz]}>
            <boxGeometry args={[0.10, 2.4, 0.05]} />
            <meshStandardMaterial color="#1B1F27" roughness={0.35} metalness={0.85} />
          </mesh>
        ))}
        {/* Overhead Observation Lintel (Y in [2.4, 3.6m], Light Grey with Navy trim, never black) */}
        <mesh position={[0, 3.0, 2.25]}>
          <boxGeometry args={[wallThickness, 1.2, 4.5]} />
          <primitive object={materials.interiorWall} />
        </mesh>
        <mesh position={[0, 3.0, 9.75]}>
          <boxGeometry args={[wallThickness, 1.2, 4.5]} />
          <primitive object={materials.interiorWall} />
        </mesh>
        {/* Sliding AutoDoor Gamma Main <-> Arena Bay (Z in [4.5, 7.5]) */}
        <AutoDoor
          id="door-gamma-arena"
          position={[0, 0, 6.0]}
          axis="x"
          width={3.0}
          height={2.4}
          wallThickness={wallThickness}
          labelSideA="ARENA BAY ▶"
          subLabelSideA="AUTONOMOUS PROVING GROUND"
          labelSideB="◀ LAB GAMMA"
          subLabelSideB="ADVANCED INNOVATION LAB"
        />
      </group>

      {/* =========================================================================
          5. CEILING GRID & RECESSED LED PANELS (Only rendered when showCeiling is true)
         ========================================================================= */}
      {showCeiling && (
        <group position={[totalWidth / 2, labHeight, 6]}>
          <mesh position={[0, 0.05, 0]}>
            <boxGeometry args={[totalWidth, 0.1, 12]} />
            <primitive object={materials.ceiling} />
          </mesh>
          {[-3.5, 0, 3.5].map((zOffset) => (
            <mesh key={`ceiling-light-strip-${zOffset}`} position={[0, -0.01, zOffset]}>
              <boxGeometry args={[totalWidth - 2, 0.02, 0.2]} />
              <primitive object={materials.electricBlueGlow} />
            </mesh>
          ))}
        </group>
      )}
    </group>
  );
}
