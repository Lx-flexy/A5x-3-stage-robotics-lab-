import { getStaticCollisionBoxes } from '../data/config';

/**
 * High-Performance 2D AABB Circle Collision & Sliding Solver (Revision 4 - Fixed Doors)
 * - Decoupled X and Z axis resolution for smooth wall sliding without getting stuck
 * - Filtered out all ceiling/lintel obstacles (Y >= 1.8m) so door openings are never blocked
 * - Circle radius 0.3m on XZ plane
 * - Smooth transit through all doorways (Main entrance, Alpha-Beta, Beta-Gamma, Gamma-Arena)
 */
export class CollisionSystem {
  constructor() {
    this.staticBoxes = getStaticCollisionBoxes();
    this.playerRadius = 0.30;

    this.furnitureBoxes = [
      // Lab Alpha Furniture (Revision 5 - Reference Matched Layout)
      { min: [1.2, 0, 0.1], max: [3.8, 2.3, 0.75], label: 'alpha-hardware-shelves' },
      { min: [6.8, 0, 0.4], max: [9.2, 1.1, 1.6], label: 'alpha-teacher-desk' },
      { min: [12.2, 0, 0.1], max: [14.8, 2.3, 0.75], label: 'alpha-prototype-shelves' },
      { min: [0.1, 0, 1.2], max: [0.85, 1.2, 7.2], label: 'alpha-soldering-bench' },
      { min: [0.1, 0, 8.4], max: [0.75, 2.3, 11.0], label: 'alpha-electronics-shelves' },
      { min: [15.1, 0, 0.6], max: [15.95, 1.2, 4.3], label: 'alpha-design-coding-desk' },

      // Lab Beta Furniture (Revision 8 - Reference Matched Layout)
      { min: [17.0, 0, 0.1], max: [19.6, 2.3, 0.85], label: 'beta-back-left-shelf' },
      { min: [22.2, 0, 0.5], max: [25.8, 1.1, 1.7], label: 'beta-teacher-desk' },
      { min: [28.4, 0, 0.1], max: [31.0, 2.3, 0.85], label: 'beta-back-right-shelf' },
      { min: [16.1, 0, 0.2], max: [16.9, 2.2, 4.4], label: 'beta-hardware-shelf' },
      { min: [16.1, 0, 7.6], max: [17.1, 1.1, 11.6], label: 'beta-soldering-bench' },
      { min: [31.4, 0, 0.05], max: [31.98, 2.3, 4.65], label: 'beta-3d-printing-unit' },
      { min: [31.1, 0, 7.6], max: [31.9, 1.1, 11.8], label: 'beta-workstations' },

      // Lab Gamma Main Bay Furniture (X: 32 to 48) — Revision 16
      { min: [35.7, 0, 0.05], max: [44.3, 1.0, 0.60], label: 'gamma-credenza' },
      { min: [33.2, 0, 0.05], max: [36.0, 2.4, 0.55], label: 'gamma-left-showcase-shelf' },
      { min: [44.0, 0, 0.05], max: [46.0, 2.4, 0.55], label: 'gamma-right-showcase-shelf' },
      { min: [32.1, 0, 0.6], max: [33.0, 1.2, 4.1], label: 'gamma-coding-zone' },
      { min: [32.1, 0, 7.8], max: [33.0, 1.2, 11.5], label: 'gamma-soldering-bench' },
      { min: [47.0, 0, 0.7], max: [47.9, 1.2, 2.2], label: 'gamma-3d-printing-bench' },
      { min: [47.0, 0, 2.35], max: [47.9, 1.2, 4.15], label: 'gamma-designing-zone' },
      { min: [33.5, 0, 11.2], max: [38.5, 2.3, 11.9], label: 'gamma-hardware-shelf' },
      { min: [38.5, 0, 11.2], max: [43.5, 2.3, 11.9], label: 'gamma-electronics-shelf' },
      { min: [47.0, 0, 8.0], max: [47.9, 1.2, 11.3], label: 'gamma-vr-zone' },

      // Lab Gamma Arena Bay Furniture (X: 48 to 60) — Revision 17
      { min: [48.5, 0, 0.05], max: [50.5, 2.3, 0.65], label: 'gamma-trophy-shelf' },
      { min: [50.8, 0, 1.2], max: [58.6, 0.8, 4.6], label: 'gamma-soccer-arena' },
      { min: [49.6, 0, 5.8], max: [54.2, 0.45, 10.6], label: 'gamma-race-arena' },
      { min: [55.4, 0, 5.8], max: [58.6, 0.35, 10.6], label: 'gamma-line-follower-arena' },
      { min: [59.1, 0, 6.5], max: [59.9, 1.1, 10.5], label: 'gamma-diagnostic-bench' }
    ];

    // Precompute student table boxes for Lab Alpha & Lab Beta (2 columns x 4 rows)
    [0, 16].forEach((offset) => {
      const colX = [offset + 4.2, offset + 11.8];
      const rowZ = [4.3, 6.1, 7.9, 9.7];
      let tableCount = 0;
      const labPrefix = offset === 0 ? 'alpha' : 'beta';
      colX.forEach((cx) => {
        rowZ.forEach((rz) => {
          this.furnitureBoxes.push({
            min: [cx - 1.7, 0, rz - 0.45],
            max: [cx + 1.7, 0.8, rz + 0.45],
            label: `${labPrefix}-student-table-${tableCount++}`
          });
        });
      });
    });

    // Precompute student table boxes for Gamma Main (Revision 16: 8 Long Tables = 44 Chairs)
    const gammaTables = [
      // Left column (X = 37.3, width 3.6m -> X in [35.5, 39.1])
      { x: 37.3, z: 3.0, id: 'gamma-table-col0-row0' },
      { x: 37.3, z: 5.1, id: 'gamma-table-col0-row1' },
      { x: 37.3, z: 7.2, id: 'gamma-table-col0-row2' },
      { x: 37.3, z: 9.3, id: 'gamma-table-col0-row3' },
      // Right column (X = 42.7, width 3.6m -> X in [40.9, 44.5])
      { x: 42.7, z: 3.0, id: 'gamma-table-col1-row0' },
      { x: 42.7, z: 5.1, id: 'gamma-table-col1-row1' },
      { x: 42.7, z: 7.2, id: 'gamma-table-col1-row2' },
      { x: 42.7, z: 9.3, id: 'gamma-table-col1-row3' }
    ];
    gammaTables.forEach((t) => {
      this.furnitureBoxes.push({
        min: [t.x - 1.8, 0, t.z - 0.35],
        max: [t.x + 1.8, 0.75, t.z + 0.35],
        label: t.id
      });
    });

    this.colliders2D = [];
    this.rebuildColliders({});
  }

  rebuildColliders(doorStates = {}) {
    const rawBoxes = [...this.staticBoxes, ...this.furnitureBoxes];

    // CRITICAL FIX: Filter out all ceiling lintels and high structures (minY >= 1.8m)
    // so door openings are NEVER blocked in 2D by overhead structures!
    const groundBoxes = rawBoxes.filter((b) => {
      // Exclude lintels and overhead beams
      if (b.min[1] >= 1.8) return false;
      if (b.label && b.label.includes('lintel')) return false;
      return true;
    });

    // Only add a door blocker if the door is explicitly closed
    if (!doorStates['door-main-entrance']) {
      groundBoxes.push({ min: [6.6, 0, 11.9], max: [9.4, 1.7, 12.1], label: 'door-main-closed' });
    }
    if (!doorStates['door-alpha-beta']) {
      groundBoxes.push({ min: [15.9, 0, 4.6], max: [16.1, 1.7, 7.4], label: 'door-ab-closed' });
    }
    if (!doorStates['door-beta-gamma']) {
      groundBoxes.push({ min: [31.9, 0, 4.6], max: [32.1, 1.7, 7.4], label: 'door-bg-closed' });
    }
    if (!doorStates['door-gamma-arena']) {
      groundBoxes.push({ min: [47.9, 0, 4.6], max: [48.1, 1.7, 7.4], label: 'door-ga-closed' });
    }

    this.colliders2D = groundBoxes.map((b) => ({
      minX: b.min[0],
      maxX: b.max[0],
      minZ: b.min[2],
      maxZ: b.max[2],
      label: b.label
    }));
  }

  resolveMovement(currentX, currentZ, dx, dz, doorStates) {
    this.rebuildColliders(doorStates);

    const r = this.playerRadius;
    let nextX = currentX + dx;
    let nextZ = currentZ;

    // 1. Resolve X movement independently (Slide along Z walls)
    for (let i = 0; i < this.colliders2D.length; i++) {
      const box = this.colliders2D[i];
      // Check if player's Z overlaps box Z
      if (currentZ >= box.minZ - r && currentZ <= box.maxZ + r) {
        if (dx > 0 && currentX <= box.minX - r && nextX > box.minX - r) {
          nextX = box.minX - r;
        } else if (dx < 0 && currentX >= box.maxX + r && nextX < box.maxX + r) {
          nextX = box.maxX + r;
        }
      }
    }

    // 2. Resolve Z movement independently (Slide along X walls)
    nextZ = currentZ + dz;
    for (let i = 0; i < this.colliders2D.length; i++) {
      const box = this.colliders2D[i];
      // Check if player's resolved X overlaps box X
      if (nextX >= box.minX - r && nextX <= box.maxX + r) {
        if (dz < 0 && currentZ >= box.maxZ + r && nextZ < box.maxZ + r) {
          nextZ = box.maxZ + r;
        } else if (dz > 0 && currentZ <= box.minZ - r && nextZ > box.minZ - r) {
          nextZ = box.minZ - r;
        }
      }
    }

    // Campus outer deck boundary clamp
    nextX = Math.max(-5.5, Math.min(65.5, nextX));
    nextZ = Math.max(0.5, Math.min(23.5, nextZ));

    return [nextX, nextZ];
  }

  detectLocation(x, z) {
    if (z > 12.0) {
      return { labId: 'exterior', zoneId: 'plaza', title: 'Exterior Entrance Plaza' };
    }
    if (x >= 0 && x < 16) {
      return { labId: 'alpha', zoneId: this.detectZone(x, z, 0), title: 'Lab Alpha — Foundation' };
    }
    if (x >= 16 && x < 32) {
      return { labId: 'beta', zoneId: this.detectZone(x, z, 1), title: 'Lab Beta — Development' };
    }
    if (x >= 32 && x < 48) {
      return { labId: 'gamma', zoneId: this.detectZone(x, z, 2), title: 'Lab Gamma — Advanced' };
    }
    if (x >= 48 && x <= 60) {
      return { labId: 'gamma-arena', zoneId: 'robotics-arena', title: 'Robotics Arena Bay' };
    }
    return { labId: 'exterior', zoneId: null, title: 'A5X Campus' };
  }

  detectZone(globalX, globalZ, labIndex) {
    const localX = globalX - labIndex * 16;
    if (localX < 5 && globalZ < 2.2) return 'design-print-corner';
    if (localX > 11 && globalZ < 2.2) return 'hardware-zone';
    if (localX < 2.5 && globalZ < 5.0) return 'electronics-zone';
    if (localX < 3.5 && globalZ > 7.5) return 'soldering-arena';
    if (localX > 13.5 && globalZ > 7.5) return 'coding-area';
    if (localX > 4.5 && localX < 11.5 && globalZ > 3.5 && globalZ < 9.0) return 'student-seating';
    if (globalZ < 2.5) return 'teaching-zone';
    return 'general-lab';
  }
}

export const collisionSystem = new CollisionSystem();
