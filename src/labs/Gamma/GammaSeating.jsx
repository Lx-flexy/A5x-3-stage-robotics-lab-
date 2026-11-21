import React, { useMemo, useRef, useEffect } from 'react';
import * as THREE from 'three';
import { getGammaCuttingMatTexture } from './gammaTextures';
import { getWoodGrainTexture } from '../Beta/betaTextures';

/**
 * Gamma Student Seating (Revision 16)
 *
 * Layout Requirements:
 * - 2 columns x 4 rows of long tables (3.6m x 0.70m x 0.75m)
 * - Left column centered at X = 37.3 (X: 35.5 to 39.1)
 * - Right column centered at X = 42.7 (X: 40.9 to 44.5)
 * - Center aisle: 1.8m clear (X: 39.1 to 40.9)
 * - Side aisles: Left 1.3m (35.5 - 34.2), Right 1.3m (45.8 - 44.5) >= 1.2m
 * - 4 Rows along Z: [3.0, 5.1, 7.2, 9.3], Pitch = 2.1m
 * - Distance to credenza: 2.4m >= 2.2m; Distance to front wall: 1.57m >= 1.5m
 * - Distance to door lanes (X=32, 48 at Z=4.5-7.5): 3.5m >= 1.5m
 *
 * Chairs Distribution:
 * - Exactly 44 seats (Row 0: 6, Row 1: 5, Row 2: 6, Row 3: 5 per column)
 *   Left Column: 6 + 5 + 6 + 5 = 22
 *   Right Column: 6 + 5 + 6 + 5 = 22
 *   Total = 44 seats!
 *
 * Table Model (Fixing "black blocks" issue):
 * - Oak top 40mm thick with grain texture
 * - Two slim 40mm matte black steel A-frame end legs (hollow/open upright posts + foot rail)
 *   leaving the center under-table view 100% see-through
 * - Longitudinal steel connecting cross-rail & center cable tray
 * - Dual flush grommet inserts, royal blue cutting mats, potted plants & pen cups
 *
 * Chair Model (Fixing "blob" issue):
 * - Royal blue seat cushion (#1D4ED8)
 * - Ergonomic curved dark-mesh backrest (#1E293B) with slim perimeter frame
 * - Slim armrests on both sides
 * - 5-star black base + central gas-lift cylinder + caster wheels
 * - Total height ~0.95m, pulled out ~0.15m from desk edge, random yaw +/- 6 deg
 * - Fast instanced meshes for 60fps performance
 */
export function GammaSeating() {
  const woodTexture = useMemo(() => getWoodGrainTexture(), []);
  const matTexture = useMemo(() => getGammaCuttingMatTexture(), []);

  // Shared Materials
  const oakMaterial = useMemo(
    () => new THREE.MeshStandardMaterial({ map: woodTexture, roughness: 0.55, metalness: 0.05 }),
    [woodTexture]
  );
  const blackSteelMaterial = useMemo(
    () => new THREE.MeshStandardMaterial({ color: '#1B1F27', metalness: 0.85, roughness: 0.28 }),
    []
  );
  const cableTrayMaterial = useMemo(
    () => new THREE.MeshStandardMaterial({ color: '#272F3D', metalness: 0.7, roughness: 0.35 }),
    []
  );
  const blueCushionMaterial = useMemo(
    () => new THREE.MeshStandardMaterial({ color: '#1D4ED8', roughness: 0.55 }),
    []
  );
  const meshBackMaterial = useMemo(
    () => new THREE.MeshStandardMaterial({ color: '#1E293B', roughness: 0.75, metalness: 0.15 }),
    []
  );

  // 8 Long Tables (2 Columns x 4 Rows)
  const tables = useMemo(() => {
    const list = [];
    const zRows = [3.0, 5.1, 7.2, 9.3];
    const seatCounts = [6, 5, 6, 5]; // 6, 5, 6, 5 per column

    // Left Column (X = 37.3)
    zRows.forEach((z, r) => {
      list.push({
        id: `gamma-table-col0-row${r}`,
        col: 0,
        row: r,
        x: 37.3,
        z,
        seats: seatCounts[r]
      });
    });

    // Right Column (X = 42.7)
    zRows.forEach((z, r) => {
      list.push({
        id: `gamma-table-col1-row${r}`,
        col: 1,
        row: r,
        x: 42.7,
        z,
        seats: seatCounts[r]
      });
    });

    return list;
  }, []);

  // Compute all 44 chair positions and orientations
  const chairPositions = useMemo(() => {
    const chairs = [];
    // Pseudo-random deterministic yaw perturbations
    const yaws = [-0.07, 0.05, -0.04, 0.08, -0.06, 0.04, 0.07, -0.05, 0.03, -0.08, 0.06];

    let seed = 0;
    tables.forEach((t) => {
      const n = t.seats;
      // Distribute seats along table width (3.6m):
      // 6 seats: offsets [-1.4, -0.84, -0.28, 0.28, 0.84, 1.4]
      // 5 seats: offsets [-1.3, -0.65, 0.0, 0.65, 1.3]
      const offsets = n === 6
        ? [-1.40, -0.84, -0.28, 0.28, 0.84, 1.40]
        : [-1.30, -0.65, 0.0, 0.65, 1.30];

      offsets.forEach((dx) => {
        const cx = t.x + dx;
        // Chairs sit behind table facing -Z (towards teaching wall)
        // Table edge is at t.z + 0.35; chair center is at t.z + 0.50 (pulled out 0.15m)
        const cz = t.z + 0.50;
        const yaw = yaws[(seed++) % yaws.length];

        chairs.push({ cx, cz, yaw });
      });
    });

    return chairs;
  }, [tables]);

  const totalChairs = chairPositions.length; // Exactly 44

  // Instanced Meshes for Chairs (6 component meshes for high fidelity & 60fps)
  const seatRef = useRef();
  const backRef = useRef();
  const backFrameRef = useRef();
  const armrestLeftRef = useRef();
  const armrestRightRef = useRef();
  const stemBaseRef = useRef();

  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.__gammaChairCount = totalChairs;
    }

    if (
      !seatRef.current ||
      !backRef.current ||
      !backFrameRef.current ||
      !armrestLeftRef.current ||
      !armrestRightRef.current ||
      !stemBaseRef.current
    ) return;

    const dummy = new THREE.Object3D();

    chairPositions.forEach((ch, idx) => {
      const { cx, cz, yaw } = ch;
      const cosY = Math.cos(yaw);
      const sinY = Math.sin(yaw);

      // Helper to position a sub-component relative to chair center [cx, 0, cz] with yaw rotation
      const applyTransform = (meshRef, localX, localY, localZ, rotX = 0, rotY = 0, rotZ = 0) => {
        // Rotate local offset by yaw around chair origin
        const rx = localX * cosY + localZ * sinY;
        const rz = -localX * sinY + localZ * cosY;

        dummy.position.set(cx + rx, localY, cz + rz);
        dummy.rotation.set(rotX, yaw + rotY, rotZ);
        dummy.scale.set(1, 1, 1);
        dummy.updateMatrix();
        meshRef.current.setMatrixAt(idx, dummy.matrix);
      };

      // 1. Royal Blue Seat Cushion (0.44m wide x 0.42m deep x 0.055m thick, Y = 0.46m)
      applyTransform(seatRef, 0, 0.46, 0);

      // 2. Curved Dark Mesh Backrest (0.40m wide x 0.42m high, tilted back -0.10 rad, Y = 0.74m, Z = +0.19m)
      applyTransform(backRef, 0, 0.74, 0.19, -0.10, 0, 0);

      // 3. Slim Outer Backrest Frame (0.44m wide x 0.44m high, Y = 0.74m, Z = +0.20m)
      applyTransform(backFrameRef, 0, 0.74, 0.20, -0.10, 0, 0);

      // 4. Slim Left Armrest (X = -0.22m, Y = 0.62m, Z = 0.02m)
      applyTransform(armrestLeftRef, -0.22, 0.62, 0.02);

      // 5. Slim Right Armrest (X = +0.22m, Y = 0.62m, Z = 0.02m)
      applyTransform(armrestRightRef, 0.22, 0.62, 0.02);

      // 6. 5-Star Base + Gas-Lift Cylinder (Y = 0.23m)
      applyTransform(stemBaseRef, 0, 0.23, 0);
    });

    seatRef.current.instanceMatrix.needsUpdate = true;
    backRef.current.instanceMatrix.needsUpdate = true;
    backFrameRef.current.instanceMatrix.needsUpdate = true;
    armrestLeftRef.current.instanceMatrix.needsUpdate = true;
    armrestRightRef.current.instanceMatrix.needsUpdate = true;
    stemBaseRef.current.instanceMatrix.needsUpdate = true;
  }, [chairPositions, totalChairs]);

  return (
    <group name="gamma-student-seating">
      {/* =====================================================================
          8 LONG STUDENT TABLES (3.6m x 0.70m x 0.75m)
         ===================================================================== */}
      {tables.map((t) => {
        const n = t.seats;
        const matOffsets = n === 6
          ? [-1.40, -0.84, -0.28, 0.28, 0.84, 1.40]
          : [-1.30, -0.65, 0.0, 0.65, 1.30];

        return (
          <group key={t.id} position={[t.x, 0, t.z]}>
            {/* 1. Oak Table Top (3.6m x 0.70m x 0.04m, top at Y = 0.75m) */}
            <mesh position={[0, 0.73, 0]} castShadow receiveShadow>
              <boxGeometry args={[3.60, 0.04, 0.70]} />
              <primitive object={oakMaterial} />
            </mesh>

            {/* 2. Slim A-Frame End Legs (Left at X = -1.68m, Right at X = +1.68m)
                Hollow/Open design with slim 40mm posts, leaving center see-through */}
            {[-1.68, 1.68].map((lx, li) => (
              <group key={`end-leg-${li}`} position={[lx, 0, 0]}>
                {/* Front Leg Post (slim 40x40mm) */}
                <mesh position={[0, 0.355, -0.28]} castShadow>
                  <boxGeometry args={[0.04, 0.71, 0.04]} />
                  <primitive object={blackSteelMaterial} />
                </mesh>
                {/* Rear Leg Post (slim 40x40mm) */}
                <mesh position={[0, 0.355, 0.28]} castShadow>
                  <boxGeometry args={[0.04, 0.71, 0.04]} />
                  <primitive object={blackSteelMaterial} />
                </mesh>
                {/* Bottom Foot Rail */}
                <mesh position={[0, 0.02, 0]} castShadow>
                  <boxGeometry args={[0.04, 0.04, 0.64]} />
                  <primitive object={blackSteelMaterial} />
                </mesh>
                {/* Top Mounting Rail under tabletop */}
                <mesh position={[0, 0.70, 0]}>
                  <boxGeometry args={[0.04, 0.02, 0.64]} />
                  <primitive object={blackSteelMaterial} />
                </mesh>
              </group>
            ))}

            {/* 3. Longitudinal Connecting Steel Cross-Rail */}
            <mesh position={[0, 0.68, 0]}>
              <boxGeometry args={[3.32, 0.03, 0.03]} />
              <primitive object={blackSteelMaterial} />
            </mesh>

            {/* 4. Center Folded Metal Cable Tray */}
            <mesh position={[0, 0.63, 0]}>
              <boxGeometry args={[2.80, 0.07, 0.16]} />
              <primitive object={cableTrayMaterial} />
            </mesh>

            {/* 5. Dual Flush Surface Cable Grommets */}
            {[-1.0, 1.0].map((gx, gi) => (
              <mesh key={`grommet-${gi}`} position={[gx, 0.751, -0.22]}>
                <cylinderGeometry args={[0.035, 0.035, 0.005, 12]} />
                <meshStandardMaterial color="#1E293B" metalness={0.7} roughness={0.3} />
              </mesh>
            ))}

            {/* 6. Royal Blue Cutting Mats aligned with seats */}
            {matOffsets.map((mx, mi) => (
              <mesh
                key={`mat-${mi}`}
                position={[mx, 0.751, 0.04]}
                rotation={[-Math.PI / 2, 0, 0]}
              >
                <planeGeometry args={[0.48, 0.34]} />
                <meshBasicMaterial map={matTexture} toneMapped={false} />
              </mesh>
            ))}

            {/* 7. Alternating Small Potted Ceramic Plants & Pen Cups */}
            {[-0.95, 0.0, 0.95].map((px, pi) => (
              <group key={`decor-${pi}`} position={[px, 0.75, -0.22]}>
                {pi % 2 === 0 ? (
                  // White ceramic plant pot with lush greenery
                  <group>
                    <mesh castShadow>
                      <cylinderGeometry args={[0.042, 0.032, 0.07, 10]} />
                      <meshStandardMaterial color="#FFFFFF" roughness={0.2} />
                    </mesh>
                    <mesh position={[0, 0.065, 0]}>
                      <sphereGeometry args={[0.052, 8, 8]} />
                      <meshStandardMaterial color="#16A34A" roughness={0.6} />
                    </mesh>
                  </group>
                ) : (
                  // Sleek dark pen/stylus holder
                  <group>
                    <mesh position={[0, 0.04, 0]} castShadow>
                      <cylinderGeometry args={[0.032, 0.028, 0.08, 10]} />
                      <meshStandardMaterial color="#0F172A" metalness={0.8} roughness={0.3} />
                    </mesh>
                    {/* Stylus tips */}
                    <mesh position={[0.01, 0.09, 0]}>
                      <cylinderGeometry args={[0.004, 0.004, 0.05, 6]} />
                      <meshStandardMaterial color="#94A3B8" />
                    </mesh>
                  </group>
                )}
              </group>
            ))}
          </group>
        );
      })}

      {/* =====================================================================
          44 INSTANCED ERGONOMIC MESH OFFICE CHAIRS
         ===================================================================== */}
      {/* 1. Seat Cushion (Royal Blue Fabric) */}
      <instancedMesh
        ref={seatRef}
        args={[undefined, undefined, totalChairs]}
        castShadow
        receiveShadow
      >
        <boxGeometry args={[0.44, 0.055, 0.42]} />
        <primitive object={blueCushionMaterial} />
      </instancedMesh>

      {/* 2. Curved Dark-Mesh Backrest */}
      <instancedMesh
        ref={backRef}
        args={[undefined, undefined, totalChairs]}
        castShadow
      >
        <boxGeometry args={[0.40, 0.42, 0.025]} />
        <primitive object={meshBackMaterial} />
      </instancedMesh>

      {/* 3. Slim Backrest Perimeter Frame */}
      <instancedMesh
        ref={backFrameRef}
        args={[undefined, undefined, totalChairs]}
        castShadow
      >
        <boxGeometry args={[0.44, 0.44, 0.03]} />
        <primitive object={blackSteelMaterial} />
      </instancedMesh>

      {/* 4. Slim Left Armrest */}
      <instancedMesh
        ref={armrestLeftRef}
        args={[undefined, undefined, totalChairs]}
        castShadow
      >
        <boxGeometry args={[0.04, 0.20, 0.24]} />
        <primitive object={blackSteelMaterial} />
      </instancedMesh>

      {/* 5. Slim Right Armrest */}
      <instancedMesh
        ref={armrestRightRef}
        args={[undefined, undefined, totalChairs]}
        castShadow
      >
        <boxGeometry args={[0.04, 0.20, 0.24]} />
        <primitive object={blackSteelMaterial} />
      </instancedMesh>

      {/* 6. Central Pneumatic Stem & 5-Star Base with Wheels */}
      <instancedMesh
        ref={stemBaseRef}
        args={[undefined, undefined, totalChairs]}
      >
        <cylinderGeometry args={[0.03, 0.26, 0.44, 8]} />
        <primitive object={blackSteelMaterial} />
      </instancedMesh>
    </group>
  );
}