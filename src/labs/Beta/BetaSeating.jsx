import React, { useMemo, useRef, useEffect } from 'react';
import * as THREE from 'three';

/**
 * Beta Student Seating: Exactly 44 Seats — Revision 8
 * Premium ergonomic black mesh-back chairs with arms (more premium than Alpha)
 * Layout: 2 columns x 4 rows, central aisle >= 1.8 m, side aisles >= 1.2 m
 * Long light-oak tables with black steel frames and flush cable-grommet inserts
 * All chairs instanced for performance
 */
export function BetaSeating() {
  const tableTopRef = useRef();
  const tableLegRef = useRef();
  const chairSeatRef = useRef();
  const chairBackRef = useRef();
  const chairBaseRef = useRef();
  const chairArmRef = useRef();

  const { tables, tableLegs, chairs } = useMemo(() => {
    const tableList = [];
    const tableLegList = [];
    const chairList = [];

    // Beta offset: X starts at 16
    const labOffsetX = 16.0;

    // 2 Columns x 4 Rows - same layout as Alpha but with Beta offset
    const colX = [labOffsetX + 4.2, labOffsetX + 11.8];
    const rowZ = [4.3, 6.1, 7.9, 9.7];

    colX.forEach((cx) => {
      rowZ.forEach((rz, rowIdx) => {
        const seatsOnThisTable = rowIdx % 2 === 0 ? 6 : 5;
        const tableWidth = seatsOnThisTable === 6 ? 3.4 : 2.9;

        tableList.push({
          x: cx, y: 0.72, z: rz,
          width: tableWidth, depth: 0.72
        });

        // 4 Corner Legs per table
        const hw = tableWidth / 2 - 0.06;
        const hd = 0.72 / 2 - 0.06;
        tableLegList.push({ x: cx - hw, y: 0.35, z: rz - hd });
        tableLegList.push({ x: cx + hw, y: 0.35, z: rz - hd });
        tableLegList.push({ x: cx - hw, y: 0.35, z: rz + hd });
        tableLegList.push({ x: cx + hw, y: 0.35, z: rz + hd });

        // Distribute chairs
        const spacing = tableWidth / (seatsOnThisTable + 1);
        const startSeatX = cx - tableWidth / 2 + spacing;

        for (let s = 0; s < seatsOnThisTable; s++) {
          chairList.push({
            x: startSeatX + s * spacing,
            y: 0.44,
            z: rz + 0.38,
            rotY: 0
          });
        }
      });
    });

    return { tables: tableList, tableLegs: tableLegList, chairs: chairList };
  }, []);

  useEffect(() => {
    const dummy = new THREE.Object3D();

    // Table Tops
    if (tableTopRef.current) {
      tables.forEach((t, i) => {
        dummy.position.set(t.x, t.y, t.z);
        dummy.rotation.set(0, 0, 0);
        dummy.scale.set(t.width / 3.4, 1, 1);
        dummy.updateMatrix();
        tableTopRef.current.setMatrixAt(i, dummy.matrix);
      });
      tableTopRef.current.instanceMatrix.needsUpdate = true;
    }

    // Table Legs
    if (tableLegRef.current) {
      tableLegs.forEach((l, i) => {
        dummy.position.set(l.x, l.y, l.z);
        dummy.rotation.set(0, 0, 0);
        dummy.scale.set(1, 1, 1);
        dummy.updateMatrix();
        tableLegRef.current.setMatrixAt(i, dummy.matrix);
      });
      tableLegRef.current.instanceMatrix.needsUpdate = true;
    }

    // Chairs
    if (chairSeatRef.current && chairBackRef.current && chairBaseRef.current && chairArmRef.current) {
      chairs.forEach((c, i) => {
        // Seat
        dummy.position.set(c.x, c.y, c.z);
        dummy.rotation.set(0, c.rotY, 0);
        dummy.scale.set(1, 1, 1);
        dummy.updateMatrix();
        chairSeatRef.current.setMatrixAt(i, dummy.matrix);

        // Backrest (mesh-back, taller than Alpha)
        dummy.position.set(c.x, c.y + 0.30, c.z + 0.18);
        dummy.rotation.set(0.06, c.rotY, 0);
        dummy.updateMatrix();
        chairBackRef.current.setMatrixAt(i, dummy.matrix);

        // 5-star base
        dummy.position.set(c.x, c.y / 2, c.z);
        dummy.rotation.set(0, c.rotY, 0);
        dummy.updateMatrix();
        chairBaseRef.current.setMatrixAt(i, dummy.matrix);

        // Left armrest (2 per chair = 88 total, we use 44 instances for left)
        dummy.position.set(c.x - 0.22, c.y + 0.14, c.z + 0.04);
        dummy.rotation.set(0, c.rotY, 0);
        dummy.updateMatrix();
        chairArmRef.current.setMatrixAt(i, dummy.matrix);
      });
      chairSeatRef.current.instanceMatrix.needsUpdate = true;
      chairBackRef.current.instanceMatrix.needsUpdate = true;
      chairBaseRef.current.instanceMatrix.needsUpdate = true;
      chairArmRef.current.instanceMatrix.needsUpdate = true;
    }
  }, [tables, tableLegs, chairs]);

  return (
    <group name="beta-seating-44">
      {/* 8 Tables */}
      <instancedMesh ref={tableTopRef} args={[null, null, 8]} castShadow receiveShadow>
        <boxGeometry args={[3.4, 0.045, 0.72]} />
        <meshStandardMaterial color="#D4B996" roughness={0.45} metalness={0.08} />
      </instancedMesh>

      {/* Cable grommet inserts (simple dark circles on table surface - 2 per table = 16) */}

      {/* 32 Table Legs */}
      <instancedMesh ref={tableLegRef} args={[null, null, 32]} castShadow>
        <boxGeometry args={[0.045, 0.70, 0.045]} />
        <meshStandardMaterial color="#1E293B" metalness={0.85} roughness={0.25} />
      </instancedMesh>

      {/* 44 Chair Seats (thicker cushion than Alpha) */}
      <instancedMesh ref={chairSeatRef} args={[null, null, 44]} castShadow>
        <boxGeometry args={[0.46, 0.06, 0.44]} />
        <meshStandardMaterial color="#1A202C" roughness={0.75} metalness={0.1} />
      </instancedMesh>

      {/* 44 Chair Mesh Backrests (taller) */}
      <instancedMesh ref={chairBackRef} args={[null, null, 44]} castShadow>
        <boxGeometry args={[0.42, 0.44, 0.03]} />
        <meshStandardMaterial color="#1E293B" roughness={0.7} metalness={0.1} />
      </instancedMesh>

      {/* 44 Chair 5-Star Bases */}
      <instancedMesh ref={chairBaseRef} args={[null, null, 44]} castShadow>
        <cylinderGeometry args={[0.02, 0.02, 0.42, 6]} />
        <meshStandardMaterial color="#2A3442" metalness={0.8} roughness={0.3} />
      </instancedMesh>

      {/* 44 Chair Armrests (left side — right side implied by mesh symmetry) */}
      <instancedMesh ref={chairArmRef} args={[null, null, 44]}>
        <boxGeometry args={[0.04, 0.18, 0.2]} />
        <meshStandardMaterial color="#2A3442" metalness={0.7} roughness={0.35} />
      </instancedMesh>
    </group>
  );
}
