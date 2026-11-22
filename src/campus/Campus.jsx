import React from 'react';
import { useStore } from '../store/useStore';
import { Architecture } from './Architecture';
import { Facade } from './Facade';
import { RooftopBrandBoard } from './RooftopBrandBoard';
import { Lighting } from './Lighting';
import { Signage } from './Signage';
import { EntrancePlaza } from './EntrancePlaza';
import { ZoneWallSignage } from './ZoneWallSignage';
import { LabAlpha } from '../labs/Alpha/LabAlpha';
import { LabBeta } from '../labs/Beta/LabBeta';
import { LabGamma } from '../labs/Gamma/LabGamma';

/**
 * High-Performance Campus Root (Revision 19)
 * Integrates <Facade/>, <RooftopBrandBoard/>, <EntrancePlaza/>, <Architecture/>, and distinct labs.
 */
export function Campus() {
  if (typeof window !== 'undefined') {
    window.__campusRenderCount = (window.__campusRenderCount || 0) + 1;
  }

  const activeLabId = useStore((state) => state.activeLabId);
  const viewMode = useStore((state) => state.viewMode);

  // In overview modes (Campus/Top-Down), show everything.
  // In first-person mode, only render current and adjacent rooms.
  const isOverview = viewMode !== 'firstPerson';

  const isOutsideVisible = isOverview || activeLabId === 'exterior' || activeLabId === 'alpha';
  const isAlphaVisible = isOverview || activeLabId === 'exterior' || activeLabId === 'alpha' || activeLabId === 'beta';
  const isBetaVisible = isOverview || activeLabId === 'alpha' || activeLabId === 'beta' || activeLabId === 'gamma';
  const isGammaVisible = isOverview || activeLabId === 'beta' || activeLabId === 'gamma' || activeLabId === 'gamma-arena';

  return (
    <group name="a5x-campus-complex">
      {/* 1. Dynamic Consolidated Campus Lighting (max 4 lights) */}
      <Lighting />

      {/* 2. Architectural Shell: Floors, Navy Walls, Partitions, Sliding Doors */}
      <Architecture />

      {/* 3. High-Performance Front Facade, Curtain Wall Glazing & AutoDoor */}
      <Facade />

      {/* 4. Big Rooftop Brand Board at horizontal centre */}
      <RooftopBrandBoard />

      {/* 5. Brand Signage & Feature Wall Signs */}
      <Signage />

      {/* 6. Outside Plaza Deck, Landscaping & Entrance Features */}
      <group visible={isOutsideVisible}>
        <EntrancePlaza />
      </group>

      {/* 7. Complete Lab Alpha: Foundation Lab */}
      <group visible={isAlphaVisible}>
        <LabAlpha />
      </group>

      {/* 8. Complete Lab Beta: Development Lab */}
      <group visible={isBetaVisible}>
        <LabBeta />
      </group>

      {/* 9. Complete Lab Gamma: Advanced Innovation Lab & Arena Bay */}
      <group visible={isGammaVisible}>
        <LabGamma />
      </group>

      {/* 10. Wall-Mounted and Ceiling-Hung Architectural Zone Signage */}
      <ZoneWallSignage />
    </group>
  );
}
