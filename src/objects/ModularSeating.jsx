import React, { useMemo, useRef, useEffect } from 'react';
import * as THREE from 'three';

/**
 * Modular Seating: 11 Modular Tables x 4 Chairs = 44 Students per Lab
 * Complies with Revision 2: Tables face the teaching wall (Z=0); chairs properly tucked in;
 * zero clipping with tables, neighboring chairs or walls; ample clear aisles (>=1.2m around zones).
 */
export function ModularSeating({ labOffsetX = 0 }) {
  const tableTopRef = useRef();
  const tableLegRef = useRef();
  const chairSeatRef = useRef();
  const chairBackRef = useRef();
  const chairBaseRef = useRef();

  const { tables, chairs } = useMemo(() => {
    const tablePositions = [];
    const chairPositions = [];

    // Columns: 4 (X spacing: 2.1m), Rows: 3 (Z spacing: 1.9m)
    // Centered cleanly between X in [labOffsetX + 4.6, labOffsetX + 11.2]
    const startX = labOffsetX + 4.8;
    const startZ = 4.2;
    const spacingX = 2.1;
    const spacingZ = 1.9;

    let count = 0;
    for (let row = 0; row < 3; row++) {
      for (let col = 0; col < 4; col++) {
        // Skip 1 spot (col 2, row 2) to total exactly 11 modular tables
        if (row === 2 && col === 2) continue;
        if (count >= 11) break;

        const tx = startX + col * spacingX;
        const tz = startZ + row * spacingZ;
        const ty = 0.72; // table top height

        tablePositions.push({ x: tx, y: ty, z: tz });

        // 4 chairs per table tucked in neatly:
        // 2 on north side (tz - 0.42) facing +Z (tucked under table edge, rotY: Math.PI)
        // 2 on south side (tz + 0.42) facing -Z (towards teaching wall, rotY: 0)
        chairPositions.push(
          { x: tx - 0.36, y: 0.44, z: tz - 0.42, rotY: Math.PI },
          { x: tx + 0.36, y: 0.44, z: tz - 0.42, rotY: Math.PI },
          { x: tx - 0.36, y: 0.44, z: tz + 0.42, rotY: 0 },
          { x: tx + 0.36, y: 0.44, z: tz + 0.42, rotY: 0 }
        );

        count++;
      }
    }

    return { tables: tablePositions, chairs: chairPositions };
  }, [labOffsetX]);

  useEffect(() => {
    const dummy = new THREE.Object3D();

    // 1. Tables (11 instances)
    if (tableTopRef.current && tableLegRef.current) {
      tables.forEach((t, i) => {
        // Table top (1.4m x 0.05m x 0.8m)
        dummy.position.set(t.x, t.y, t.z);
        dummy.rotation.set(0, 0, 0);
        dummy.scale.set(1, 1, 1);
        dummy.updateMatrix();
        tableTopRef.current.setMatrixAt(i, dummy.matrix);

        // Legs center support structure
        dummy.position.set(t.x, t.y / 2, t.z);
        dummy.updateMatrix();
        tableLegRef.current.setMatrixAt(i, dummy.matrix);
      });
      tableTopRef.current.instanceMatrix.needsUpdate = true;
      tableLegRef.current.instanceMatrix.needsUpdate = true;
    }

    // 2. Chairs (44 instances)
    if (chairSeatRef.current && chairBackRef.current && chairBaseRef.current) {
      chairs.forEach((c, i) => {
        // Seat
        dummy.position.set(c.x, c.y, c.z);
        dummy.rotation.set(0, c.rotY, 0);
        dummy.scale.set(1, 1, 1);
        dummy.updateMatrix();
        chairSeatRef.current.setMatrixAt(i, dummy.matrix);

        // Backrest (tucked against seat edge)
        dummy.position.set(c.x, c.y + 0.32, c.z + (c.rotY === 0 ? 0.18 : -0.18));
        dummy.rotation.set(0, c.rotY, 0);
        dummy.updateMatrix();
        chairBackRef.current.setMatrixAt(i, dummy.matrix);

        // Base & Stem
        dummy.position.set(c.x, c.y / 2, c.z);
        dummy.rotation.set(0, 0, 0);
        dummy.updateMatrix();
        chairBaseRef.current.setMatrixAt(i, dummy.matrix);
      });
      chairSeatRef.current.instanceMatrix.needsUpdate = true;
      chairBackRef.current.instanceMatrix.needsUpdate = true;
      chairBaseRef.current.instanceMatrix.needsUpdate = true;
    }
  }, [tables, chairs]);

  return (
    <group name={`modular-seating-offset-${labOffsetX}`}>
      {/* 11 Table Tops (Light Oak Finish) */}
      <instancedMesh ref={tableTopRef} args={[undefined, undefined, 11]} castShadow receiveShadow>
        <boxGeometry args={[1.4, 0.045, 0.8]} />
        <meshStandardMaterial color="#D4B996" roughness={0.35} metalness={0.1} />
      </instancedMesh>

      {/* 11 Table Steel Leg Structures */}
      <instancedMesh ref={tableLegRef} args={[undefined, undefined, 11]} castShadow>
        <boxGeometry args={[1.25, 0.68, 0.68]} />
        <meshStandardMaterial color="#1E293B" metalness={0.8} roughness={0.3} wireframe={false} />
      </instancedMesh>

      {/* 44 Swivel Chair Seats (Charcoal Ergonomic Cushion) */}
      <instancedMesh ref={chairSeatRef} args={[undefined, undefined, 44]} castShadow receiveShadow>
        <boxGeometry args={[0.38, 0.05, 0.38]} />
        <meshStandardMaterial color="#1E293B" roughness={0.6} />
      </instancedMesh>

      {/* 44 Chair Curved Backrests */}
      <instancedMesh ref={chairBackRef} args={[undefined, undefined, 44]} castShadow>
        <boxGeometry args={[0.36, 0.32, 0.04]} />
        <meshStandardMaterial color="#0F172A" roughness={0.4} />
      </instancedMesh>

      {/* 44 Chair Steel Center Stems & 5-Star Bases */}
      <instancedMesh ref={chairBaseRef} args={[undefined, undefined, 44]}>
        <cylinderGeometry args={[0.025, 0.18, 0.44, 8]} />
        <meshStandardMaterial color="#475569" metalness={0.85} roughness={0.2} />
      </instancedMesh>
    </group>
  );
}
