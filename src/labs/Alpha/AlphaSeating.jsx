import React, { useMemo, useRef, useEffect } from 'react';
import * as THREE from 'three';

/**
 * Lab Alpha Student Seating: Exactly 44 Seats (Revision 5)
 * Matches reference render:
 * - 2 columns x 4 rows = 8 long light-oak tables with open black steel frames
 * - 4 tables seat 6, 4 tables seat 5 = exactly 44 student chairs
 * - 4 steel corner legs per table (32 instanced table legs) so under-table space is open & airy
 * - 44 black moulded-shell chairs with thin metal legs tucked in facing whiteboard (-Z)
 * - Ultra-high performance InstancedMesh
 */
export function AlphaSeating() {
  const tableTopRef = useRef();
  const tableLegRef = useRef();
  const chairSeatRef = useRef();
  const chairBackRef = useRef();
  const chairLegsRef = useRef();

  const { tables, tableLegs, chairs } = useMemo(() => {
    const tableList = [];
    const tableLegList = [];
    const chairList = [];

    // 2 Columns: Left (X = 4.2), Right (X = 11.8)
    // 4 Rows: Z = 4.3, 6.1, 7.9, 9.7
    const colX = [4.2, 11.8];
    const rowZ = [4.3, 6.1, 7.9, 9.7];

    colX.forEach((cx) => {
      rowZ.forEach((rz, rowIdx) => {
        // Alternating 6 seats and 5 seats: (6 + 5 + 6 + 5) * 2 = 44 seats
        const seatsOnThisTable = rowIdx % 2 === 0 ? 6 : 5;
        const tableWidth = seatsOnThisTable === 6 ? 3.4 : 2.9;

        tableList.push({
          x: cx,
          y: 0.72,
          z: rz,
          width: tableWidth,
          depth: 0.72
        });

        // 4 Corner Legs per table (Open frame under table as in reference)
        const hw = tableWidth / 2 - 0.06;
        const hd = 0.72 / 2 - 0.06;
        tableLegList.push({ x: cx - hw, y: 0.35, z: rz - hd });
        tableLegList.push({ x: cx + hw, y: 0.35, z: rz - hd });
        tableLegList.push({ x: cx - hw, y: 0.35, z: rz + hd });
        tableLegList.push({ x: cx + hw, y: 0.35, z: rz + hd });

        // Distribute chairs along the south edge of the table (facing -Z towards whiteboard)
        const spacing = tableWidth / (seatsOnThisTable + 1);
        const startSeatX = cx - tableWidth / 2 + spacing;

        for (let s = 0; s < seatsOnThisTable; s++) {
          chairList.push({
            x: startSeatX + s * spacing,
            y: 0.44,
            z: rz + 0.36, // Tucked along south side facing -Z
            rotY: 0       // Facing -Z
          });
        }
      });
    });

    return { tables: tableList, tableLegs: tableLegList, chairs: chairList };
  }, []);

  useEffect(() => {
    const dummy = new THREE.Object3D();

    // 1. Setup Instanced Table Tops (8 instances)
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

    // 2. Setup Instanced Table Corner Legs (32 instances = 8 tables x 4 legs)
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

    // 3. Setup Instanced Chairs (Exactly 44 instances)
    if (chairSeatRef.current && chairBackRef.current && chairLegsRef.current) {
      chairs.forEach((c, i) => {
        // Moulded Seat
        dummy.position.set(c.x, c.y, c.z);
        dummy.rotation.set(0, c.rotY, 0);
        dummy.scale.set(1, 1, 1);
        dummy.updateMatrix();
        chairSeatRef.current.setMatrixAt(i, dummy.matrix);

        // Ergonomic Curved Backrest (placed at south edge of seat z + 0.16)
        dummy.position.set(c.x, c.y + 0.28, c.z + 0.16);
        dummy.rotation.set(0.08, c.rotY, 0);
        dummy.updateMatrix();
        chairBackRef.current.setMatrixAt(i, dummy.matrix);

        // Thin Metal Legs Base (4 slender angled legs)
        dummy.position.set(c.x, c.y / 2, c.z);
        dummy.rotation.set(0, c.rotY, 0);
        dummy.updateMatrix();
        chairLegsRef.current.setMatrixAt(i, dummy.matrix);
      });
      chairSeatRef.current.instanceMatrix.needsUpdate = true;
      chairBackRef.current.instanceMatrix.needsUpdate = true;
      chairLegsRef.current.instanceMatrix.needsUpdate = true;
    }
  }, [tables, tableLegs, chairs]);

  return (
    <group name="alpha-seating-44">
      {/* 8 Tables: Instanced Tops (Light Oak) */}
      <instancedMesh
        ref={tableTopRef}
        args={[null, null, 8]}
        castShadow
        receiveShadow
      >
        <boxGeometry args={[3.4, 0.045, 0.72]} />
        <meshStandardMaterial color="#D4B996" roughness={0.45} metalness={0.08} />
      </instancedMesh>

      {/* 32 Table Legs: Instanced Black Steel Corner Legs (Open frame under table) */}
      <instancedMesh
        ref={tableLegRef}
        args={[null, null, 32]}
        castShadow
      >
        <boxGeometry args={[0.045, 0.70, 0.045]} />
        <meshStandardMaterial color="#1E293B" metalness={0.85} roughness={0.25} />
      </instancedMesh>

      {/* 44 Chairs: Instanced Seats (Black Moulded Shell) */}
      <instancedMesh
        ref={chairSeatRef}
        args={[null, null, 44]}
        castShadow
      >
        <boxGeometry args={[0.42, 0.05, 0.40]} />
        <meshStandardMaterial color="#1C2430" roughness={0.7} metalness={0.15} />
      </instancedMesh>

      {/* 44 Chairs: Instanced Backrests */}
      <instancedMesh
        ref={chairBackRef}
        args={[null, null, 44]}
        castShadow
      >
        <boxGeometry args={[0.38, 0.36, 0.03]} />
        <meshStandardMaterial color="#1E293B" roughness={0.7} metalness={0.15} />
      </instancedMesh>

      {/* 44 Chairs: Instanced Thin Metal Legs Base */}
      <instancedMesh
        ref={chairLegsRef}
        args={[null, null, 44]}
        castShadow
      >
        <cylinderGeometry args={[0.02, 0.02, 0.42, 6]} />
        <meshStandardMaterial color="#2A3442" metalness={0.8} roughness={0.3} />
      </instancedMesh>
    </group>
  );
}
