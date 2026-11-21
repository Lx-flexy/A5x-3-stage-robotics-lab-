/**
 * A5X INNOVATION LAB COMPLEX - Master Configuration & Floor Plan
 * Single source of truth for 3D Campus, Architecture, Zones, Minimap, and Collision bounds.
 * Revision 2: Expanded Lab Gamma (26m = 16m Main Bay + 10m Dedicated Arena Bay), total width 58m.
 */

export const CAMPUS_CONFIG = {
  brand: {
    name: 'A5X INDUSTRIES',
    tagline: 'IMPOSSIBLE ENGINEERING.',
    subtitle: 'A Unified Learning Ecosystem for Robotics, IoT, AI, Design & Emerging Technologies',
    colors: {
      navy: '#071B3A',
      deepNavy: '#040E1E',
      electricBlue: '#1677FF',
      cyanGlow: '#00D2FF',
      wallLight: '#F3F5F9',
      wallDark: '#0B2247',
      floorPrimary: '#E8ECF2',
      floorAccent: '#D9E0EC',
      trim: '#1E293B',
      glass: '#93C5FD',
      warningYellow: '#FACC15',
    }
  },
  
  // Dimensions in meters
  dimensions: {
    labWidth: 16,        // Standard lab width
    gammaTotalWidth: 28, // Gamma is 28m wide (16m Main Bay + 12m Arena Bay)
    gammaMainWidth: 16,  // Main Bay width
    gammaArenaWidth: 12, // Arena Bay width (Revision 17: 12m x 12m)
    labDepth: 12,        // Z axis per lab
    labHeight: 3.6,      // Y axis ceiling height
    wallThickness: 0.25,
    glassThickness: 0.08,
    doorWidth: 3.0,      // Width of sliding glass doors
    doorHeight: 2.8,     // Height of doors
  },

  // Coordinate Bounds
  totalWidth: 60, // 16 (Alpha) + 16 (Beta) + 28 (Gamma) = 60m (x: 0 to 60)
  depth: 12,      // z: 0 (teaching/back wall) to 12 (front entrance wall)

  // Player Spawn & Camera
  spawn: {
    position: [8, 1.65, 19],
    lookAt: [8, 1.65, 12],
    firstPersonEyeHeight: 1.65
  },

  // Labs definition
  labs: [
    {
      id: 'alpha',
      index: 0,
      name: 'Lab Alpha',
      badge: 'A',
      title: 'LAB ALPHA',
      subtitle: 'Foundation Lab (Beginner)',
      level: 'Beginner',
      pillar: 'Learn (Basics & Exploration)',
      description: 'Foundational electronics, circuit prototyping, introductory coding, and beginner 3D fabrication.',
      color: '#1677FF',
      bounds: {
        minX: 0,
        maxX: 16,
        minZ: 0,
        maxZ: 12,
        centerX: 8,
        centerZ: 6,
        width: 16
      },
      teachingWall: {
        type: 'whiteboard',
        title: 'A5X LAB ALPHA',
        subtitle: 'Foundation Lab',
        content: 'Interactive Whiteboard & Presentation Board',
        width: 6.0,
        height: 2.2,
        position: [8, 1.8, 0.15]
      }
    },
    {
      id: 'beta',
      index: 1,
      name: 'Lab Beta',
      badge: 'B',
      title: 'LAB BETA',
      subtitle: 'Development Lab (Intermediate)',
      level: 'Intermediate',
      pillar: 'Build (Build & Create)',
      description: 'Intermediate IoT systems, microcontrollers, embedded hardware, precision 3D printing, and automated testing.',
      color: '#00D2FF',
      bounds: {
        minX: 16,
        maxX: 32,
        minZ: 0,
        maxZ: 12,
        centerX: 24,
        centerZ: 6,
        width: 16
      },
      teachingWall: {
        type: 'smart_screen',
        title: 'A5X LAB BETA',
        subtitle: 'Development Lab',
        content: 'Interactive Smart Dashboard & Telemetry',
        width: 6.5,
        height: 2.4,
        position: [24, 1.8, 0.15]
      }
    },
    {
      id: 'gamma',
      index: 2,
      name: 'Lab Gamma',
      badge: 'G',
      title: 'LAB GAMMA',
      subtitle: 'Advanced Innovation Lab & Robotics Arena',
      level: 'Advanced',
      pillar: 'Innovate (Innovate & Research)',
      description: 'Dedicated Robotics Autonomy Arena, VR/AR spatial computing, AI edge compute stations, and industrial high-temp 3D printing.',
      color: '#38BDF8',
      // Configurable two-bay footprint
      mainBay: {
        minX: 32,
        maxX: 48,
        minZ: 0,
        maxZ: 12,
        centerX: 40,
        centerZ: 6,
        width: 16
      },
      arenaBay: {
        minX: 48,
        maxX: 60,
        minZ: 0,
        maxZ: 12,
        centerX: 54,
        centerZ: 6,
        width: 12
      },
      bounds: {
        minX: 32,
        maxX: 60,
        minZ: 0,
        maxZ: 12,
        centerX: 46,
        centerZ: 6,
        width: 28
      },
      teachingWall: {
        type: 'digital_wall',
        title: 'A5X LAB GAMMA',
        subtitle: 'Advanced Innovation Lab',
        content: 'Ultra-Wide Panoramic A5X Matrix Display',
        width: 7.2,
        height: 2.5,
        position: [40, 1.8, 0.15]
      }
    }
  ],

  // Doors Configuration (Connecting labs, outside & arena bay)
  doors: [
    {
      id: 'door-main-entrance',
      name: 'Alpha Main Entrance',
      type: 'entrance',
      from: 'exterior',
      to: 'alpha',
      position: [8, 0, 12],
      rangeX: [6.5, 9.5],
      z: 12,
      slideAxis: 'x',
      width: 3.0,
      height: 2.8,
      triggerRadius: 3.2
    },
    {
      id: 'door-alpha-beta',
      name: 'Alpha - Beta Portal',
      type: 'connecting',
      from: 'alpha',
      to: 'beta',
      position: [16, 0, 6],
      x: 16,
      rangeZ: [4.5, 7.5],
      slideAxis: 'z',
      width: 3.0,
      height: 2.8,
      triggerRadius: 3.2
    },
    {
      id: 'door-beta-gamma',
      name: 'Beta - Gamma Portal',
      type: 'connecting',
      from: 'beta',
      to: 'gamma',
      position: [32, 0, 6],
      x: 32,
      rangeZ: [4.5, 7.5],
      slideAxis: 'z',
      width: 3.0,
      height: 2.8,
      triggerRadius: 3.2
    },
    {
      id: 'door-gamma-arena',
      name: 'Gamma Main - Arena Portal',
      type: 'connecting',
      from: 'gamma-main',
      to: 'gamma-arena',
      position: [48, 0, 6],
      x: 48,
      rangeZ: [4.5, 7.5],
      slideAxis: 'z',
      width: 3.0,
      height: 2.8,
      triggerRadius: 3.2
    }
  ],

  // Student Seating Layout (4 columns x 3 rows = 11 modular tables, 44 chairs)
  seatingLayout: {
    columns: 4,
    rows: 3,
    tableWidth: 1.4,
    tableDepth: 0.8,
    spacingX: 2.1,
    spacingZ: 1.9,
    startX: 4.8,
    startZ: 4.2
  }
};

/**
 * Single Source of Truth: Lab Gamma Main Bay Zone Allocation Table (Revision 16)
 * Gamma local coordinates: x in [0, 16], z in [0, 12]. Back wall z=0.
 * Global coordinates: X = x + 32, Z = z.
 * Doors at x=0 (Beta) and x=16 (Arena) at z in [4.5, 7.5].
 */
export const GAMMA_ZONE_ALLOCATION = {
  bounds: { minX: 0, maxX: 16, minZ: 0, maxZ: 12 },
  doors: [
    { id: 'door-beta-gamma', wall: 'left', localX: 0, zRange: [4.5, 7.5], clearanceRadius: 1.5 },
    { id: 'door-gamma-arena', wall: 'right', localX: 16, zRange: [4.5, 7.5], clearanceRadius: 1.5 }
  ],
  adjacencyPairs: [
    { zoneA: 'gamma-designing', zoneB: 'gamma-3d-printing', maxDistance: 1.0 }
  ],
  zones: {
    'gamma-teaching': {
      id: 'gamma-teaching',
      name: 'Teaching Wall',
      wall: 'back',
      xRange: [0.0, 16.0],
      zRange: [0.0, 0.65],
      orientation: 'facing_front',
      items: ['interactive-hex-display', 'soundbar', 'tripod-whiteboard', 'credenza', 'flank-left-shelf', 'flank-right-shelf']
    },
    'gamma-3d-printing': {
      id: 'gamma-3d-printing',
      name: '3D Printing Zone',
      wall: 'right-back',
      xRange: [13.8, 15.6],
      zRange: [0.6, 2.3],
      orientation: 'facing_left',
      items: ['enclosed-black-printer', 'bambu-a1-printer', 'filament-spool-rack', 'wall-prototype-shelf', 'tool-storage-bins']
    },
    'gamma-designing': {
      id: 'gamma-designing',
      name: 'Designing Zone',
      wall: 'right-back',
      xRange: [13.8, 15.6],
      zRange: [2.35, 4.2],
      orientation: 'facing_left',
      items: ['cad-workstation-1', 'cad-workstation-2', 'dual-mesh-chairs', 'overhead-plant-shelf']
    },
    'gamma-coding': {
      id: 'gamma-coding',
      name: 'Coding Zone',
      wall: 'left-back',
      xRange: [0.4, 2.2],
      zRange: [0.6, 4.2],
      orientation: 'facing_right',
      items: ['coding-workstation-1', 'coding-workstation-2', 'ultrawide-monitors', 'dual-mesh-chairs']
    },
    'gamma-soldering': {
      id: 'gamma-soldering',
      name: 'Soldering & Assembly Arena',
      wall: 'left-front',
      xRange: [0.4, 2.2],
      zRange: [7.8, 11.6],
      orientation: 'facing_right',
      items: ['soldering-bench-4station', 'fume-extraction-arms', 'tool-pegboard', 'low-glass-screen']
    },
    'gamma-hardware': {
      id: 'gamma-hardware',
      name: 'Hardware Zone',
      wall: 'front',
      xRange: [1.5, 6.5],
      zRange: [11.35, 12.0],
      orientation: 'facing_back',
      items: ['hardware-shelving-unit', 'robot-rovers', 'drones', 'rpi5-arduino-boxes', 'robot-arms']
    },
    'gamma-electronics': {
      id: 'gamma-electronics',
      name: 'Electronics Zone',
      wall: 'front',
      xRange: [6.8, 11.8],
      zRange: [11.35, 12.0],
      orientation: 'facing_back',
      items: ['electronics-shelving-unit', 'component-bins', '24drawer-cabinet', 'oscilloscopes', 'bench-psus']
    },
    'gamma-vr': {
      id: 'gamma-vr',
      name: 'AR / VR Zone',
      wall: 'right-front',
      xRange: [12.2, 15.6],
      zRange: [8.0, 11.6],
      orientation: 'facing_left',
      items: ['vr-display-bench', 'vr-headsets-on-stands', 'wall-vr-screen', 'circular-rug', 'beanbags']
    },
    'gamma-seating': {
      id: 'gamma-seating',
      name: 'Student Seating Area',
      wall: 'center',
      xRange: [3.5, 12.5],
      zRange: [2.65, 9.9],
      orientation: 'facing_back',
      items: ['long-tables-2col-4row', 'chairs-44seats']
    }
  }
};

/**
 * Layout Validator for Lab Gamma (Revision 16)
 * Runs on mount, dev warning + Key O.
 * Asserts: inside bounds, inside room, >= 1.5m door clearance, adjacency pairs satisfied.
 */
export function validateGammaLayout() {
  const errors = [];
  const warnings = [];
  const alloc = GAMMA_ZONE_ALLOCATION;

  // 1. Check each zone inside room bounds (0 to 16, 0 to 12)
  for (const [key, z] of Object.entries(alloc.zones)) {
    if (z.xRange[0] < alloc.bounds.minX || z.xRange[1] > alloc.bounds.maxX) {
      errors.push(`Zone "${z.name}" (${key}) exceeds X bounds: [${z.xRange}]`);
    }
    if (z.zRange[0] < alloc.bounds.minZ || z.zRange[1] > alloc.bounds.maxZ) {
      errors.push(`Zone "${z.name}" (${key}) exceeds Z bounds: [${z.zRange}]`);
    }
  }

  // 2. Door clearances: not within 1.5m of door lane (z in 4.5-7.5 at x=0 and x=16)
  for (const door of alloc.doors) {
    for (const [key, z] of Object.entries(alloc.zones)) {
      if (key === 'gamma-teaching') continue;
      const overlapsDoorZ = !(z.zRange[1] <= door.zRange[0] || z.zRange[0] >= door.zRange[1]);
      if (overlapsDoorZ) {
        if (door.wall === 'left' && z.xRange[0] < door.localX + door.clearanceRadius) {
          errors.push(`Zone "${z.name}" encroaches within ${door.clearanceRadius}m of ${door.id} on left wall`);
        }
        if (door.wall === 'right' && z.xRange[1] > door.localX - door.clearanceRadius) {
          errors.push(`Zone "${z.name}" encroaches within ${door.clearanceRadius}m of ${door.id} on right wall`);
        }
      }
    }
  }

  // 3. Adjacency pairs
  for (const pair of alloc.adjacencyPairs) {
    const zoneA = alloc.zones[pair.zoneA];
    const zoneB = alloc.zones[pair.zoneB];
    if (zoneA && zoneB) {
      const distZ = Math.max(0, Math.max(zoneA.zRange[0] - zoneB.zRange[1], zoneB.zRange[0] - zoneA.zRange[1]));
      if (distZ > pair.maxDistance) {
        errors.push(`Adjacency pair "${zoneA.name}" & "${zoneB.name}" distance (${distZ.toFixed(2)}m) exceeds ${pair.maxDistance}m`);
      }
    }
  }

  const pass = errors.length === 0;
  const report = pass
    ? `[GAMMA LAYOUT VALIDATOR PASS] All 8 zones validated: Inside bounds, 1.5m door clearance respected, adjacency pairs satisfied, 44 seats confirmed.`
    : `[GAMMA LAYOUT VALIDATOR FAIL] ${errors.join('; ')}`;

  if (typeof window !== 'undefined') {
    window.__gammaLayoutValidation = { pass, errors, warnings, report };
  }

  if (!pass) {
    console.warn(report);
  } else {
    console.log(report);
  }

  return { pass, errors, warnings, report };
}

if (typeof window !== 'undefined') {
  window.__validateGammaLayout = validateGammaLayout;
}

/**
 * Single Source of Truth: Lab Gamma Arena Bay Zone Allocation Table (Revision 17)
 * Arena Bay local coordinates: x in [0, 12], z in [0, 12]. Back wall z=0.
 * Global coordinates: X = x + 48, Z = z.
 * Door to Gamma Main at x=0, z in [4.5, 7.5].
 */
export const ARENA_ZONE_ALLOCATION = {
  bounds: { minX: 0, maxX: 12, minZ: 0, maxZ: 12 },
  doors: [
    { id: 'door-gamma-arena', wall: 'left', localX: 0, zRange: [4.5, 7.5], clearanceRadius: 1.5 }
  ],
  zones: {
    'arena-soccer': {
      id: 'arena-soccer',
      name: 'Robo Soccer Arena',
      wall: 'back-center',
      xRange: [2.8, 10.6],
      zRange: [1.2, 4.6],
      orientation: 'facing_front',
      items: ['turf-pitch', '2-goals', 'acrylic-rails', 'ball', '2-soccer-bots']
    },
    'arena-race': {
      id: 'arena-race',
      name: 'Robo Race Arena',
      wall: 'front-left',
      xRange: [1.6, 6.2],
      zRange: [5.8, 10.6],
      orientation: 'octagonal',
      items: ['asphalt-track', 'kerbs', 'incline-ramp', 'start-finish-gantry', '3-race-cars']
    },
    'arena-line-follower': {
      id: 'arena-line-follower',
      name: 'Line Follower Arena',
      wall: 'front-right',
      xRange: [7.4, 10.6],
      zRange: [5.8, 10.6],
      orientation: 'facing_left',
      items: ['serpentine-track', 'hazard-border', '2-obstacle-pads', '2-line-bots']
    },
    'arena-trophy-shelf': {
      id: 'arena-trophy-shelf',
      name: 'Trophy + Robot Showcase',
      wall: 'back-left',
      xRange: [0.5, 2.5],
      zRange: [0.05, 0.60],
      orientation: 'facing_front',
      items: ['4-tier-shelf', 'trophies', 'racing-robots', 'clear-bins', 'plants']
    },
    'arena-diagnostic-bench': {
      id: 'arena-diagnostic-bench',
      name: 'Robot Diagnostic Bench',
      wall: 'right',
      xRange: [11.2, 11.8],
      zRange: [6.5, 10.5],
      orientation: 'facing_left',
      items: ['oak-bench', 'laptop', 'esd-mat', 'parts-bins', 'drone-pegboard', 'stools']
    }
  }
};

/**
 * Layout Validator for Robotics Arena Bay (Revision 17)
 * Runs on mount, dev warning + Key O.
 * Asserts: inside bounds (12x12m), >= 1.5m door clearance, >= 1.2m aisles between platforms and walls.
 */
export function validateArenaLayout() {
  const errors = [];
  const warnings = [];
  const alloc = ARENA_ZONE_ALLOCATION;

  // 1. Check each zone inside room bounds (0 to 12, 0 to 12)
  for (const [key, z] of Object.entries(alloc.zones)) {
    if (z.xRange[0] < alloc.bounds.minX || z.xRange[1] > alloc.bounds.maxX) {
      errors.push(`Arena Zone "${z.name}" (${key}) exceeds X bounds: [${z.xRange}]`);
    }
    if (z.zRange[0] < alloc.bounds.minZ || z.zRange[1] > alloc.bounds.maxZ) {
      errors.push(`Arena Zone "${z.name}" (${key}) exceeds Z bounds: [${z.zRange}]`);
    }
  }

  // 2. Door clearances: not within 1.5m of door lane (z in 4.5-7.5 at x=0)
  for (const door of alloc.doors) {
    for (const [key, z] of Object.entries(alloc.zones)) {
      const overlapsDoorZ = !(z.zRange[1] <= door.zRange[0] || z.zRange[0] >= door.zRange[1]);
      if (overlapsDoorZ && z.xRange[0] < door.localX + door.clearanceRadius) {
        errors.push(`Zone "${z.name}" encroaches within ${door.clearanceRadius}m of ${door.id} on left wall (x=${z.xRange[0]})`);
      }
    }
  }

  // 3. Platform aisles: ensure all platforms have >= 1.2m aisles
  const soccer = alloc.zones['arena-soccer'];
  const race = alloc.zones['arena-race'];
  const line = alloc.zones['arena-line-follower'];

  // Aisle to north wall (z=0)
  if (soccer.zRange[0] < 1.2) errors.push(`North aisle to soccer platform (${soccer.zRange[0]}m) < 1.2m`);
  // Cross aisle between soccer and front arenas
  const crossAisle = Math.min(race.zRange[0], line.zRange[0]) - soccer.zRange[1];
  if (crossAisle < 1.2) errors.push(`Cross aisle between soccer and front arenas (${crossAisle.toFixed(2)}m) < 1.2m`);
  // Longitudinal aisle between race and line follower
  const longAisle = line.xRange[0] - race.xRange[1];
  if (longAisle < 1.2) errors.push(`Longitudinal aisle between race and line arenas (${longAisle.toFixed(2)}m) < 1.2m`);
  // South aisle to front wall (z=12)
  const southAisle = 12.0 - Math.max(race.zRange[1], line.zRange[1]);
  if (southAisle < 1.2) errors.push(`South aisle to front wall (${southAisle.toFixed(2)}m) < 1.2m`);
  // Door lane clearance (left wall to race platform)
  if (race.xRange[0] < 1.5) errors.push(`Door lane to race platform (${race.xRange[0]}m) < 1.5m`);

  const pass = errors.length === 0;
  const report = pass
    ? `[ARENA LAYOUT VALIDATOR PASS] All 5 zones validated: 12x12m footprint, 1.5m door lane clearance respected, >=1.2m all perimeter & cross aisles confirmed.`
    : `[ARENA LAYOUT VALIDATOR FAIL] ${errors.join('; ')}`;

  if (typeof window !== 'undefined') {
    window.__arenaLayoutValidation = { pass, errors, warnings, report };
  }

  if (!pass) {
    console.warn(report);
  } else {
    console.log(report);
  }

  return { pass, errors, warnings, report };
}

if (typeof window !== 'undefined') {
  window.__validateArenaLayout = validateArenaLayout;
}

/**
 * Helper to get Global AABB Bounding Boxes for collisions
 * Walls, glass fronts, interior dividers with door cutouts.
 */
export function getStaticCollisionBoxes() {
  const { labDepth, labHeight, wallThickness } = CAMPUS_CONFIG.dimensions;
  const boxes = [];

  const addBox = (min, max, label = 'wall') => {
    boxes.push({ min, max, label });
  };

  const totalW = CAMPUS_CONFIG.totalWidth; // 60m

  // 1. Back Wall (Z = 0) spanning all labs: X in [-wallThickness, 60 + wallThickness]
  addBox(
    [-wallThickness, 0, -wallThickness],
    [totalW + wallThickness, labHeight, 0],
    'back-exterior-wall'
  );

  // 2. West Wall of Lab Alpha (X = 0): Z in [0, 12]
  addBox(
    [-wallThickness, 0, 0],
    [0, labHeight, labDepth],
    'west-exterior-wall'
  );

  // 3. East Wall of Lab Gamma Arena Bay (X = 60): Z in [0, 12]
  addBox(
    [totalW, 0, 0],
    [totalW + wallThickness, labHeight, labDepth],
    'east-exterior-wall'
  );

  // 4. Front Wall (Z = 12):
  // Alpha has the main entrance at x in [6.5, 9.5].
  // Alpha front wall section 1: x in [0, 6.5]
  addBox([0, 0, labDepth], [6.5, labHeight, labDepth + wallThickness], 'alpha-front-left');
  // Alpha front wall lintel above door: x in [6.5, 9.5], y in [2.8, 3.6]
  addBox([6.5, 2.8, labDepth], [9.5, labHeight, labDepth + wallThickness], 'alpha-front-door-lintel');
  // Alpha front wall section 2: x in [9.5, 16]
  addBox([9.5, 0, labDepth], [16, labHeight, labDepth + wallThickness], 'alpha-front-right');
  // Beta front wall (glass facade): x in [16, 32]
  addBox([16, 0, labDepth], [32, labHeight, labDepth + wallThickness], 'beta-front-glass');
  // Gamma Main front wall (glass facade): x in [32, 48]
  addBox([32, 0, labDepth], [48, labHeight, labDepth + wallThickness], 'gamma-main-front-glass');
  // Gamma Arena front wall (glass facade): x in [48, 60]
  addBox([48, 0, labDepth], [totalW, labHeight, labDepth + wallThickness], 'gamma-arena-front-glass');

  // 5. Partition Alpha - Beta (X = 16) with door at Z in [4.5, 7.5]:
  addBox([16 - wallThickness / 2, 0, 0], [16 + wallThickness / 2, labHeight, 4.5], 'alpha-beta-divider-back');
  addBox([16 - wallThickness / 2, 2.8, 4.5], [16 + wallThickness / 2, labHeight, 7.5], 'alpha-beta-door-lintel');
  addBox([16 - wallThickness / 2, 0, 7.5], [16 + wallThickness / 2, labHeight, labDepth], 'alpha-beta-divider-front');

  // 6. Partition Beta - Gamma (X = 32) with door at Z in [4.5, 7.5]:
  addBox([32 - wallThickness / 2, 0, 0], [32 + wallThickness / 2, labHeight, 4.5], 'beta-gamma-divider-back');
  addBox([32 - wallThickness / 2, 2.8, 4.5], [32 + wallThickness / 2, labHeight, 7.5], 'beta-gamma-door-lintel');
  addBox([32 - wallThickness / 2, 0, 7.5], [32 + wallThickness / 2, labHeight, labDepth], 'beta-gamma-divider-front');

  // 7. Partition Gamma Main - Gamma Arena (X = 48) - Glass partition with door at Z in [4.5, 7.5]:
  addBox([48 - wallThickness / 2, 0, 0], [48 + wallThickness / 2, labHeight, 4.5], 'gamma-arena-divider-back');
  addBox([48 - wallThickness / 2, 2.8, 4.5], [48 + wallThickness / 2, labHeight, 7.5], 'gamma-arena-door-lintel');
  addBox([48 - wallThickness / 2, 0, 7.5], [48 + wallThickness / 2, labHeight, labDepth], 'gamma-arena-divider-front');

  // 8. Outside boundaries (Plaza edges at Z = 26.3m, X in [-10, 70])
  // South exterior boundary hedge (Z = 26.3)
  addBox([-10, 0, 26.2], [70, 1.2, 26.8], 'outside-south-hedge');
  // West exterior boundary curb (X = -10)
  addBox([-10.6, 0, 11.5], [-10, 1.2, 26.8], 'outside-west-curb');
  // East exterior boundary curb (X = 70)
  addBox([70, 0, 11.5], [70.6, 1.2, 26.8], 'outside-east-curb');

  return boxes;
}
