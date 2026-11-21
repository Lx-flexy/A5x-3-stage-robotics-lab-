import React from 'react';
import { GammaBackWall } from './GammaBackWall';
import { GammaLeftWall } from './GammaLeftWall';
import { GammaRightWall } from './GammaRightWall';
import { GammaFrontWall } from './GammaFrontWall';
import { GammaSeating } from './GammaSeating';
import { GammaArenaBay } from './GammaArenaBay';
import { GammaCeiling } from './GammaCeiling';

/**
 * Lab Gamma — Advanced Innovation Lab & Robotics Arena (Revision 16)
 * Full bespoke architectural reconstruction:
 * - 16m x 12m Main Bay (X: 32 to 48) + 10m x 12m Arena Bay (X: 48 to 58)
 * - Separated by full-height glass observation wall at X = 48 with sliding door at Z = 4.5 to 7.5
 * - Section 1: Main Bay (Teaching wall with hex display, 2-PC coding, 4-station soldering,
 *   Design & Print Corner with Bambu A1 + enclosed printer + CAD PCs, AR/VR immersive zone,
 *   5-tier hardware & electronics front wall, 8 long tables with 44 ergonomic chairs)
 * - Section 2: Arena Bay (Raised octagonal platform, 4 animated rovers, prep & viewing benches)
 */
export function LabGamma() {
  return (
    <group name="lab-gamma-container">
      {/* =========================================================================
          SECTION 1: GAMMA MAIN BAY (X: 32 to 48, Z: 0 to 12)
         ========================================================================= */}
      {/* 1. Exposed-Structure Ceiling with Central Hexagonal LED Ring & Polished Floor */}
      <GammaCeiling isArena={false} />

      {/* 2. Teaching Wall (Back Wall Z = 0): Hexagonal Screen, Whiteboard, Trophy Shelves */}
      <GammaBackWall />

      {/* 3. Left Wall (X = 32): Coding Zone & Soldering Arena with 4 Articulated Fume Arms */}
      <GammaLeftWall />

      {/* 4. Right Wall (X = 48): Unified Design & Print Corner + AR/VR Immersive Zone */}
      <GammaRightWall />

      {/* 5. Front Wall (Z = 12): 5-Tier Hardware Zone & Connected Electronics Zone */}
      <GammaFrontWall />

      {/* 6. Student Seating: Exactly 44 Chairs in 8 Long Tables (2 Columns x 4 Rows) */}
      <GammaSeating />

      {/* =========================================================================
          SECTION 2: GAMMA ARENA BAY (X: 48 to 58, Z: 0 to 12)
         ========================================================================= */}
      {/* 7. Dedicated Robotics Proving Ground Platform & Bay */}
      <GammaArenaBay />

      {/* 8. Dedicated Ceiling & Lighting for Arena Bay */}
      <GammaCeiling isArena={true} />
    </group>
  );
}
