import React, { useRef } from 'react';
import * as THREE from 'three';
import { useCampusMaterials } from './Materials';
import { CAMPUS_CONFIG } from '../data/config';
import { useStore } from '../store/useStore';
import { useFrame } from '@react-three/fiber';

/**
 * Campus Architecture - Floor slabs, Navy feature walls, Glass partitions,
 * and Proximity-triggered sliding glass doors.
 * Revision 2: 58m total width, two-bay Gamma with full-height glass partition at X=48.
 */
export function Architecture() {
  const materials = useCampusMaterials();
  const doorStates = useStore((state) => state.doorStates);
  const showCeiling = useStore((state) => state.showCeiling);

  // References to animated sliding doors
  const entranceDoorLeftRef = useRef();
  const entranceDoorRightRef = useRef();
  const alphaBetaDoorRef = useRef();
  const betaGammaDoorRef = useRef();
  const gammaArenaDoorRef = useRef();

  const { labHeight, wallThickness, doorWidth } = CAMPUS_CONFIG.dimensions;
  const totalWidth = CAMPUS_CONFIG.totalWidth; // 58m

  // Smooth door animation loop
  useFrame((_, delta) => {
    const speed = 6.0;

    // Main Entrance Doors (Split slide along X at X=8, Z=12)
    if (entranceDoorLeftRef.current && entranceDoorRightRef.current) {
      const openOffset = doorStates['door-main-entrance'] ? 1.5 : 0;
      entranceDoorLeftRef.current.position.x = THREE.MathUtils.damp(
        entranceDoorLeftRef.current.position.x,
        -0.75 - openOffset,
        speed,
        delta
      );
      entranceDoorRightRef.current.position.x = THREE.MathUtils.damp(
        entranceDoorRightRef.current.position.x,
        0.75 + openOffset,
        speed,
        delta
      );
    }

    // Alpha-Beta Door (Slides along Z at X=16)
    if (alphaBetaDoorRef.current) {
      const targetZ = doorStates['door-alpha-beta'] ? 9.2 : 6.0;
      alphaBetaDoorRef.current.position.z = THREE.MathUtils.damp(
        alphaBetaDoorRef.current.position.z,
        targetZ,
        speed,
        delta
      );
    }

    // Beta-Gamma Door (Slides along Z at X=32)
    if (betaGammaDoorRef.current) {
      const targetZ = doorStates['door-beta-gamma'] ? 9.2 : 6.0;
      betaGammaDoorRef.current.position.z = THREE.MathUtils.damp(
        betaGammaDoorRef.current.position.z,
        targetZ,
        speed,
        delta
      );
    }

    // Gamma Main - Arena Door (Slides along Z at X=48)
    if (gammaArenaDoorRef.current) {
      const targetZ = doorStates['door-gamma-arena'] ? 9.2 : 6.0;
      gammaArenaDoorRef.current.position.z = THREE.MathUtils.damp(
        gammaArenaDoorRef.current.position.z,
        targetZ,
        speed,
        delta
      );
    }
  });

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
        <mesh position={[0, 2.8 + (labHeight - 2.8) / 2, 6.0]}>
          <boxGeometry args={[wallThickness * 1.1, labHeight - 2.8, 3.0]} />
          <primitive object={materials.darkMetal} />
        </mesh>
        <mesh position={[0, 1.4, 4.5]}>
          <boxGeometry args={[wallThickness * 1.2, 2.8, 0.1]} />
          <primitive object={materials.darkMetal} />
        </mesh>
        <mesh position={[0, 1.4, 7.5]}>
          <boxGeometry args={[wallThickness * 1.2, 2.8, 0.1]} />
          <primitive object={materials.darkMetal} />
        </mesh>
        {/* Sliding Glass Door Alpha <-> Beta */}
        <mesh ref={alphaBetaDoorRef} position={[0, 1.4, 6.0]}>
          <boxGeometry args={[0.06, 2.76, 2.92]} />
          <primitive object={materials.tintedGlass} />
        </mesh>
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
        <mesh position={[0, 2.8 + (labHeight - 2.8) / 2, 6.0]}>
          <boxGeometry args={[wallThickness * 1.1, labHeight - 2.8, 3.0]} />
          <primitive object={materials.darkMetal} />
        </mesh>
        <mesh position={[0, 1.4, 4.5]}>
          <boxGeometry args={[wallThickness * 1.2, 2.8, 0.1]} />
          <primitive object={materials.darkMetal} />
        </mesh>
        <mesh position={[0, 1.4, 7.5]}>
          <boxGeometry args={[wallThickness * 1.2, 2.8, 0.1]} />
          <primitive object={materials.darkMetal} />
        </mesh>
        {/* Sliding Glass Door Beta <-> Gamma */}
        <mesh ref={betaGammaDoorRef} position={[0, 1.4, 6.0]}>
          <boxGeometry args={[0.06, 2.76, 2.92]} />
          <primitive object={materials.tintedGlass} />
        </mesh>
      </group>

      {/* Partition 3: Gamma Main <-> Gamma Arena (at X = 48) - FULL-HEIGHT GLASS OBSERVATION WALL */}
      <group position={[48, 0, 0]}>
        {/* Back Glass Section: Z in [0, 4.5] */}
        <mesh position={[0, 1.4, 2.25]}>
          <boxGeometry args={[0.08, 2.8, 4.5]} />
          <primitive object={materials.glass} />
        </mesh>
        {/* Front Glass Section: Z in [7.5, 12] */}
        <mesh position={[0, 1.4, 9.75]}>
          <boxGeometry args={[0.08, 2.8, 4.5]} />
          <primitive object={materials.glass} />
        </mesh>
        {/* Structural Mullions */}
        {[0.1, 2.25, 4.5, 7.5, 9.75, 11.9].map((mz) => (
          <mesh key={`arena-mullion-${mz}`} position={[0, 1.4, mz]}>
            <boxGeometry args={[0.12, 2.8, 0.08]} />
            <primitive object={materials.darkMetal} />
          </mesh>
        ))}
        {/* Overhead Lintel (Y in [2.8, 3.6]) */}
        <mesh position={[0, 2.8 + (labHeight - 2.8) / 2, 6.0]}>
          <boxGeometry args={[wallThickness, labHeight - 2.8, 12]} />
          <primitive object={materials.darkMetal} />
        </mesh>
        {/* Sliding Glass Door Gamma Main <-> Arena Bay (Z in [4.5, 7.5]) */}
        <mesh ref={gammaArenaDoorRef} position={[0, 1.4, 6.0]}>
          <boxGeometry args={[0.06, 2.76, 2.92]} />
          <primitive object={materials.tintedGlass} />
        </mesh>
      </group>

      {/* =========================================================================
          5. FRONT FAÇADE (Z = 12) - Glass Partitions, Mullions, Main Entrance
         ========================================================================= */}
      {/* Alpha Front Left (x: 0 to 6.5) */}
      <group position={[3.25, 0, 12]}>
        <mesh position={[0, 0.45, 0]}>
          <boxGeometry args={[6.5, 0.9, wallThickness]} />
          <primitive object={materials.interiorWall} />
        </mesh>
        <mesh position={[0, 2.0, 0]}>
          <boxGeometry args={[6.4, 2.2, 0.06]} />
          <primitive object={materials.glass} />
        </mesh>
        <mesh position={[0, 3.3, 0]}>
          <boxGeometry args={[6.5, 0.6, wallThickness]} />
          <primitive object={materials.darkMetal} />
        </mesh>
      </group>

      {/* Alpha Main Entrance Door Opening (x: 6.5 to 9.5) */}
      <group position={[8, 0, 12]}>
        <mesh position={[0, 2.8 + (labHeight - 2.8) / 2, 0]}>
          <boxGeometry args={[3.0, labHeight - 2.8, wallThickness * 1.2]} />
          <primitive object={materials.darkMetal} />
        </mesh>
        <mesh position={[-1.5, 1.4, 0]}>
          <boxGeometry args={[0.1, 2.8, wallThickness * 1.2]} />
          <primitive object={materials.darkMetal} />
        </mesh>
        <mesh position={[1.5, 1.4, 0]}>
          <boxGeometry args={[0.1, 2.8, wallThickness * 1.2]} />
          <primitive object={materials.darkMetal} />
        </mesh>
        {/* Double Sliding Glass Doors */}
        <mesh ref={entranceDoorLeftRef} position={[-0.75, 1.4, 0]}>
          <boxGeometry args={[1.48, 2.75, 0.06]} />
          <primitive object={materials.tintedGlass} />
        </mesh>
        <mesh ref={entranceDoorRightRef} position={[0.75, 1.4, 0]}>
          <boxGeometry args={[1.48, 2.75, 0.06]} />
          <primitive object={materials.tintedGlass} />
        </mesh>
      </group>

      {/* Alpha Front Right (x: 9.5 to 16) */}
      <group position={[12.75, 0, 12]}>
        <mesh position={[0, 0.45, 0]}>
          <boxGeometry args={[6.5, 0.9, wallThickness]} />
          <primitive object={materials.interiorWall} />
        </mesh>
        <mesh position={[0, 2.0, 0]}>
          <boxGeometry args={[6.4, 2.2, 0.06]} />
          <primitive object={materials.glass} />
        </mesh>
        <mesh position={[0, 3.3, 0]}>
          <boxGeometry args={[6.5, 0.6, wallThickness]} />
          <primitive object={materials.darkMetal} />
        </mesh>
      </group>

      {/* Beta Front Wall (x: 16 to 32) Glass facade */}
      <group position={[24, 0, 12]}>
        <mesh position={[0, 0.45, 0]}>
          <boxGeometry args={[16, 0.9, wallThickness]} />
          <primitive object={materials.interiorWall} />
        </mesh>
        <mesh position={[0, 2.0, 0]}>
          <boxGeometry args={[15.9, 2.2, 0.06]} />
          <primitive object={materials.glass} />
        </mesh>
        {[-5.3, 0, 5.3].map((mx) => (
          <mesh key={`beta-mullion-${mx}`} position={[mx, 2.0, 0]}>
            <boxGeometry args={[0.08, 2.2, 0.1]} />
            <primitive object={materials.darkMetal} />
          </mesh>
        ))}
        <mesh position={[0, 3.3, 0]}>
          <boxGeometry args={[16, 0.6, wallThickness]} />
          <primitive object={materials.darkMetal} />
        </mesh>
      </group>

      {/* Gamma Main Front Wall (x: 32 to 48) Glass facade */}
      <group position={[40, 0, 12]}>
        <mesh position={[0, 0.45, 0]}>
          <boxGeometry args={[16, 0.9, wallThickness]} />
          <primitive object={materials.interiorWall} />
        </mesh>
        <mesh position={[0, 2.0, 0]}>
          <boxGeometry args={[15.9, 2.2, 0.06]} />
          <primitive object={materials.glass} />
        </mesh>
        {[-5.3, 0, 5.3].map((mx) => (
          <mesh key={`gamma-m-mullion-${mx}`} position={[mx, 2.0, 0]}>
            <boxGeometry args={[0.08, 2.2, 0.1]} />
            <primitive object={materials.darkMetal} />
          </mesh>
        ))}
        <mesh position={[0, 3.3, 0]}>
          <boxGeometry args={[16, 0.6, wallThickness]} />
          <primitive object={materials.darkMetal} />
        </mesh>
      </group>

      {/* Gamma Arena Front Wall (x: 48 to 60) Glass facade into Arena Bay */}
      <group position={[54, 0, 12]}>
        <mesh position={[0, 0.45, 0]}>
          <boxGeometry args={[12, 0.9, wallThickness]} />
          <primitive object={materials.interiorWall} />
        </mesh>
        <mesh position={[0, 2.0, 0]}>
          <boxGeometry args={[11.9, 2.2, 0.06]} />
          <primitive object={materials.glass} />
        </mesh>
        {[-4.0, 0, 4.0].map((mx) => (
          <mesh key={`arena-front-mullion-${mx}`} position={[mx, 2.0, 0]}>
            <boxGeometry args={[0.08, 2.2, 0.1]} />
            <primitive object={materials.darkMetal} />
          </mesh>
        ))}
        <mesh position={[0, 3.3, 0]}>
          <boxGeometry args={[12, 0.6, wallThickness]} />
          <primitive object={materials.darkMetal} />
        </mesh>
      </group>

      {/* =========================================================================
          6. CEILING GRID & RECESSED LED PANELS (Only rendered when showCeiling is true)
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
