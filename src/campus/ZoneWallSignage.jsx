import React, { useMemo, useEffect } from 'react';
import { Text } from '@react-three/drei';
import { useStore } from '../store/useStore';
import { getAllZones } from '../data/zones';

/**
 * Single Unified ZoneSign Component (Revision 11)
 * Single Source of Truth: All 3D architectural signs are driven strictly from data/zones.js.
 * Zero duplicate signs or hard-coded lab wall plates allowed.
 */
export function ZoneSign({ zone }) {
  const [x, y, z] = zone.position;
  const [rotX, rotY, rotZ] = zone.rotation;
  const w = zone.width;
  const h = zone.height;

  if (zone.type === 'ceiling') {
    return (
      <group position={[x, y, z]} rotation={[rotX, rotY, rotZ]}>
        {/* Twin Steel Suspension Rods */}
        <mesh position={[-w * 0.4, 0.5, 0]}>
          <cylinderGeometry args={[0.012, 0.012, 1.0, 8]} />
          <meshStandardMaterial color="#64748B" metalness={0.9} roughness={0.2} />
        </mesh>
        <mesh position={[w * 0.4, 0.5, 0]}>
          <cylinderGeometry args={[0.012, 0.012, 1.0, 8]} />
          <meshStandardMaterial color="#64748B" metalness={0.9} roughness={0.2} />
        </mesh>

        {/* Double-Sided Navy Sign Plate */}
        <mesh>
          <boxGeometry args={[w, h, 0.05]} />
          <meshStandardMaterial color="#071B3A" roughness={0.3} metalness={0.6} />
        </mesh>

        {/* Electric Blue LED Underline */}
        <mesh position={[0, -h / 2 + 0.02, 0]}>
          <boxGeometry args={[w * 0.94, 0.025, 0.06]} />
          <meshStandardMaterial color="#1677FF" emissive="#1677FF" emissiveIntensity={2.5} />
        </mesh>

        {/* Front Face Text */}
        <group position={[0, 0, 0.028]}>
          <Text
            position={[0, 0.08, 0]}
            fontSize={0.12}
            color="#FFFFFF"
            fontWeight={800}
            letterSpacing={0.04}
            anchorX="center"
            anchorY="middle"
          >
            {zone.name.toUpperCase()}
          </Text>
          <Text
            position={[0, -0.09, 0]}
            fontSize={0.055}
            color="#93C5FD"
            fontWeight={500}
            letterSpacing={0.02}
            anchorX="center"
            anchorY="middle"
          >
            {zone.subtitle}
          </Text>
        </group>

        {/* Back Face Text */}
        <group position={[0, 0, -0.028]} rotation={[0, Math.PI, 0]}>
          <Text
            position={[0, 0.08, 0]}
            fontSize={0.12}
            color="#FFFFFF"
            fontWeight={800}
            letterSpacing={0.04}
            anchorX="center"
            anchorY="middle"
          >
            {zone.name.toUpperCase()}
          </Text>
          <Text
            position={[0, -0.09, 0]}
            fontSize={0.055}
            color="#93C5FD"
            fontWeight={500}
            letterSpacing={0.02}
            anchorX="center"
            anchorY="middle"
          >
            {zone.subtitle}
          </Text>
        </group>
      </group>
    );
  }

  // Wall-Mounted Architectural Signs
  const isGamma = zone.labId === 'gamma';

  if (isGamma) {
    // Gamma Signage Style: Clean wall lettering on navy wall, line icon + white bold text with subtle blue emissive glow (no black plate)
    return (
      <group position={[x, y, z]} rotation={[rotX, rotY, rotZ]}>
        {/* Subtle Electric Blue LED Underline */}
        <mesh position={[0, -h / 2 + 0.04, 0.015]}>
          <boxGeometry args={[w * 0.92, 0.018, 0.012]} />
          <meshStandardMaterial color="#1677FF" emissive="#1677FF" emissiveIntensity={3.5} />
        </mesh>

        {/* Glowing Line Icon Cube */}
        <mesh position={[-w / 2 + 0.20, 0.02, 0.016]}>
          <boxGeometry args={[0.15, 0.15, 0.015]} />
          <meshStandardMaterial color="#38BDF8" emissive="#1677FF" emissiveIntensity={2.8} />
        </mesh>

        {/* Crisp Gamma Typography */}
        <group position={[0.10, 0, 0.02]}>
          <Text
            position={[0, 0.06, 0]}
            fontSize={Math.min(0.13, (w * 0.72) / (zone.name.length * 0.65))}
            color="#FFFFFF"
            fontWeight={900}
            letterSpacing={0.03}
            anchorX="center"
            anchorY="middle"
          >
            {zone.name}
          </Text>
          <Text
            position={[0, -0.07, 0]}
            fontSize={0.050}
            color="#93C5FD"
            fontWeight={600}
            letterSpacing={0.02}
            anchorX="center"
            anchorY="middle"
          >
            {zone.subtitle}
          </Text>
        </group>
      </group>
    );
  }

  // Alpha/Beta Style Wall-Mounted Signs
  return (
    <group position={[x, y, z]} rotation={[rotX, rotY, rotZ]}>
      {/* Navy Feature Plate (#071B3A, 40mm thick, bevel) */}
      <mesh>
        <boxGeometry args={[w, h, 0.04]} />
        <meshStandardMaterial color="#071B3A" roughness={0.3} metalness={0.6} />
      </mesh>

      {/* Electric Blue LED Underline */}
      <mesh position={[0, -h / 2 + 0.02, 0.024]}>
        <boxGeometry args={[w * 0.96, 0.02, 0.015]} />
        <meshStandardMaterial color="#1677FF" emissive="#1677FF" emissiveIntensity={3.5} />
      </mesh>

      {/* Blue Icon / Badge Cube */}
      <mesh position={[-w / 2 + 0.22, 0, 0.025]}>
        <boxGeometry args={[0.16, 0.16, 0.02]} />
        <meshStandardMaterial color="#1677FF" emissive="#1677FF" emissiveIntensity={1.8} />
      </mesh>

      {/* Typography */}
      <group position={[0.12, 0, 0.025]}>
        <Text
          position={[0, 0.07, 0]}
          fontSize={Math.min(0.12, (w * 0.7) / (zone.name.length * 0.65))}
          color="#FFFFFF"
          fontWeight={900}
          letterSpacing={0.04}
          anchorX="center"
          anchorY="middle"
        >
          {zone.name.toUpperCase()}
        </Text>
        <Text
          position={[0, -0.08, 0]}
          fontSize={0.052}
          color="#93C5FD"
          fontWeight={600}
          letterSpacing={0.02}
          anchorX="center"
          anchorY="middle"
        >
          {zone.subtitle}
        </Text>
      </group>
    </group>
  );
}

/**
 * High-Performance Wall-Mounted & Ceiling-Hung Architectural Zone Signage (Revision 11)
 * Culls signs for non-adjacent rooms during first-person walk mode.
 * Contains dev assertion enforcing single ZoneSign instance per zone and 0 bounding box overlaps.
 */
export function ZoneWallSignage() {
  const activeLabId = useStore((state) => state.activeLabId);
  const viewMode = useStore((state) => state.viewMode);
  const allZones = useMemo(() => getAllZones(), []);

  const zones = useMemo(() => {
    // Lab Alpha and Gamma Teaching Wall have their own bespoke reference-accurate wall architecture
    const filtered = allZones.filter(
      (z) => z.labId !== 'alpha' && z.id !== 'gamma-teaching' && z.id !== 'gamma-seating' && z.id !== 'gamma-design-print'
    );
    if (viewMode !== 'firstPerson') return filtered;
    return filtered.filter((z) => {
      if (activeLabId === 'exterior' || activeLabId === 'alpha') {
        return z.labId === 'beta';
      }
      if (activeLabId === 'beta') {
        return z.labId === 'beta' || z.labId === 'gamma';
      }
      if (activeLabId === 'gamma' || activeLabId === 'gamma-arena') {
        return z.labId === 'beta' || z.labId === 'gamma';
      }
      return true;
    });
  }, [allZones, activeLabId, viewMode]);

  // Dev assertion: Check for duplicate zone ids and overlapping bounding boxes
  useEffect(() => {
    const seenIds = new Set();
    let hasDuplicate = false;
    let hasOverlap = false;

    for (const z of zones) {
      if (seenIds.has(z.id)) {
        console.warn(`[DEV ASSERTION FAILED] Duplicate ZoneSign detected for zone id: "${z.id}"!`);
        hasDuplicate = true;
      }
      seenIds.add(z.id);
    }

    // Check for box overlaps between signs within the same lab room
    for (let i = 0; i < zones.length; i++) {
      for (let j = i + 1; j < zones.length; j++) {
        const a = zones[i];
        const b = zones[j];
        // Signs in different rooms are separated by inter-lab solid walls
        if (a.labId !== b.labId) continue;

        const dist = Math.hypot(
          a.position[0] - b.position[0],
          a.position[1] - b.position[1],
          a.position[2] - b.position[2]
        );
        const minClearance = (a.width + b.width) / 2;
        if (dist < minClearance && Math.abs(a.position[1] - b.position[1]) < (a.height + b.height) / 2) {
          console.warn(
            `[DEV ASSERTION WARNING] ZoneSign bounding boxes overlap between "${a.id}" and "${b.id}"! (dist: ${dist.toFixed(2)}m)`
          );
          hasOverlap = true;
        }
      }
    }

    if (!hasDuplicate && !hasOverlap) {
      console.log(`[ZONE SIGN ASSERTION PASS] All ${seenIds.size} signs verified: 0 duplicate IDs, 0 bounding box overlaps.`);
    }
  }, [zones]);

  return (
    <group name="campus-wall-signage">
      {zones.map((zone) => (
        <ZoneSign key={zone.id} zone={zone} />
      ))}
    </group>
  );
}
