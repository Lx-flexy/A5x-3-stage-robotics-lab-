import React from 'react';
import { AlphaBackWall } from './AlphaBackWall';
import { AlphaLeftWall } from './AlphaLeftWall';
import { AlphaRightWall } from './AlphaRightWall';
import { AlphaSeating } from './AlphaSeating';
import { AlphaCeiling } from './AlphaCeiling';

/**
 * Lab Alpha - Foundation Lab (Revision 5)
 * Completely reconstructed to match the reference render:
 * 1. Back Wall: Navy #071B3A feature wall with diagonal electric-blue LED stripes,
 *    centered A5X INDUSTRIES logo, large whiteboard with marker tray, teacher desk
 *    with laptop and black mesh chair, and flanking 5-tier open shelving units
 *    (Hardware Zone on left; 3D Print & Prototype display on right).
 * 2. Left Wall: Charcoal tool pegboard loaded with hanging pliers/screwdrivers,
 *    long light-oak soldering workbench with 5 yellow stations, articulated fume arms,
 *    multimeter, PCB holder, and tall electronics storage shelving with component drawers.
 * 3. Right Wall: Navy paneled wall with "DESIGNING AREA" and "CODING AREA" plates,
 *    long oak desk with 2 widescreen PCs showing blue abstract wallpaper, mesh chairs.
 * 4. Student Seating: Exactly 44 student chairs arranged in 2 columns x 4 rows
 *    of long oak tables with a wide central aisle.
 * 5. Ceiling & Lighting: Charcoal perforated acoustic ceiling grid, linear white LED
 *    light bars, perimeter blue LED cove, and central square ceiling AC unit.
 */
export function LabAlpha() {
  return (
    <group name="lab-alpha-content">
      {/* 1. Feature Back Wall (Teaching Wall, Logo, Whiteboard, Desk, Shelving) */}
      <AlphaBackWall />

      {/* 2. Left Wall (Soldering Arena + Electronics Zone) */}
      <AlphaLeftWall />

      {/* 3. Right Wall (Designing Area + Coding Area) */}
      <AlphaRightWall />

      {/* 4. Student Seating (8 Tables, Exactly 44 Chairs, Wide Central Aisle) */}
      <AlphaSeating />

      {/* 5. Ceiling Structure & Polished Tile Floor Grid */}
      <AlphaCeiling />
    </group>
  );
}
