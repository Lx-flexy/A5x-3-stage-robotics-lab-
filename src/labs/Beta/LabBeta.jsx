import React from 'react';
import { BetaBackWall } from './BetaBackWall';
import { BetaLeftWall } from './BetaLeftWall';
import { BetaRightWall } from './BetaRightWall';
import { BetaSeating } from './BetaSeating';
import { BetaCeiling } from './BetaCeiling';

/**
 * Realistic potted floor plant for Lab Beta
 * White beveled cylindrical pot, dark soil disc, radiating architectural leaf blades
 */
function FloorPlant({ position }) {
  const leaves = [
    { rot: 0.0, tilt: 0.45, len: 0.38, w: 0.07 },
    { rot: 0.55, tilt: 0.55, len: 0.42, w: 0.08 },
    { rot: 1.1, tilt: 0.4, len: 0.36, w: 0.07 },
    { rot: 1.65, tilt: 0.6, len: 0.44, w: 0.08 },
    { rot: 2.2, tilt: 0.48, len: 0.4, w: 0.07 },
    { rot: 2.8, tilt: 0.52, len: 0.42, w: 0.08 },
    { rot: 3.35, tilt: 0.42, len: 0.37, w: 0.07 },
    { rot: 3.9, tilt: 0.58, len: 0.43, w: 0.08 },
    { rot: 4.45, tilt: 0.46, len: 0.39, w: 0.07 },
    { rot: 5.0, tilt: 0.54, len: 0.41, w: 0.08 },
    { rot: 5.6, tilt: 0.44, len: 0.38, w: 0.07 },
  ];

  return (
    <group position={position}>
      {/* White Ceramic Pot */}
      <mesh position={[0, 0.32, 0]} castShadow>
        <cylinderGeometry args={[0.22, 0.16, 0.64, 16]} />
        <meshStandardMaterial color="#FFFFFF" roughness={0.25} />
      </mesh>
      {/* Dark Soil */}
      <mesh position={[0, 0.63, 0]}>
        <cylinderGeometry args={[0.19, 0.19, 0.03, 16]} />
        <meshStandardMaterial color="#2B1D0C" roughness={0.9} />
      </mesh>
      {/* Leaf Blades */}
      {leaves.map((l, i) => (
        <mesh
          key={`plant-leaf-${i}`}
          position={[0, 0.64, 0]}
          rotation={[l.tilt, l.rot, 0]}
          castShadow
        >
          <planeGeometry args={[l.w, l.len]} />
          <meshStandardMaterial
            color={i % 2 === 0 ? '#15803D' : '#16A34A'}
            roughness={0.55}
            side={2}
          />
        </mesh>
      ))}
    </group>
  );
}

/**
 * Lab Beta - Development Lab (Revision 8)
 * Fully reconstructed to match the 4 reference renders:
 * 1. Teaching Wall (Back Wall): Navy fluted panels, A5X INDUSTRIES | IMPOSSIBLE ENGINEERING.
 *    raised 3D logo, Interactive Smart Display (~2.4x1.4m) with live canvas UI,
 *    Whiteboard with robot/circuit sketches, warm LED under-lighting, branded teacher desk
 *    with blue LED base, flanking 5-tier shelves with trailing plants and dev kits.
 * 2. Left Wall: Navy header with logo, tall hardware shelving (RPi5, Arduino, ESP32,
 *    robot cars, robot arms, clear component bins), pegboard tool wall with real silhouette tools,
 *    dual oscilloscopes, bench DC power supplies, blue Hakko soldering stations with LCDs, microscope.
 * 3. Right Wall: 3D Printing Zone with filament spool racks, Bambu Lab A1 printer printing
 *    blue lattice vase, prototype display shelf (rocket, arm, RC car, bust, drone, gears);
 *    Designing & Coding workstations with CAD viewport & dark code editor, premium mesh chairs.
 * 4. Student Seating: Exactly 44 student chairs arranged in 2 columns x 4 rows
 *    with wide central aisle (>= 1.8m), premium mesh chairs with arms and headrests.
 * 5. Ceiling & Floor: Exposed-structure ceiling (lighter grey, black track rails, spotlight cans,
 *    white linear LEDs, AC cassette, blue cove perimeter), warm grey polished concrete floor.
 */
export function LabBeta() {
  return (
    <group name="lab-beta-content">
      {/* 1. Feature Back Wall (Teaching Wall, Logo, Smart Display, Whiteboard, Desk, Shelving) */}
      <BetaBackWall />

      {/* 2. Left Wall (Hardware Zone + Electronics Zone + Soldering Wall) */}
      <BetaLeftWall />

      {/* 3. Right Wall (3D Printing Zone + Designing Area + Coding Area) */}
      <BetaRightWall />

      {/* 4. Student Seating (8 Tables, Exactly 44 Chairs with Arms, Wide Central Aisle) */}
      <BetaSeating />

      {/* 5. Exposed-Structure Ceiling & Polished Concrete Floor */}
      <BetaCeiling />

      {/* 6. Accent Potted Floor Plants */}
      <FloorPlant position={[21.0, 0, 0.7]} />
      <FloorPlant position={[27.0, 0, 0.7]} />
      <FloorPlant position={[17.0, 0, 11.2]} />
      <FloorPlant position={[31.0, 0, 11.2]} />
    </group>
  );
}
