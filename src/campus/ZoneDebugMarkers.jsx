import React from 'react';
import * as THREE from 'three';
import { Text } from '@react-three/drei';
import { CAMPUS_CONFIG } from '../data/config';
import { useCampusMaterials } from './Materials';

/**
 * Visual footprint indicators for all zones in Alpha, Beta, Gamma
 * directly reading from data/config.js.
 */
export function ZoneDebugMarkers() {
  const materials = useCampusMaterials();

  return (
    <group name="campus-zone-markers">
      {CAMPUS_CONFIG.labs.map((lab) => {
        const labOffsetX = lab.index * CAMPUS_CONFIG.dimensions.labWidth;

        // Base zones
        const baseZones = [
          { key: 'hardware', ...CAMPUS_CONFIG.zoneTemplates.hardwareShelf },
          { key: 'electronics', ...CAMPUS_CONFIG.zoneTemplates.electronicsStorage },
          { key: 'soldering', ...CAMPUS_CONFIG.zoneTemplates.solderingArena },
          { key: 'printer', ...CAMPUS_CONFIG.zoneTemplates.printer3D },
          { key: 'coding', ...CAMPUS_CONFIG.zoneTemplates.codingPC },
          { key: 'designing', ...CAMPUS_CONFIG.zoneTemplates.designingPC },
          { key: 'teaching', ...CAMPUS_CONFIG.zoneTemplates.teachingZone },
          { key: 'seating', ...CAMPUS_CONFIG.zoneTemplates.studentSeating },
        ];

        // Gamma special zones
        const specialZones = lab.id === 'gamma' ? [
          { key: 'vrar', ...CAMPUS_CONFIG.gammaSpecialZones.vrArZone },
          { key: 'robotics', ...CAMPUS_CONFIG.gammaSpecialZones.roboticsArena },
        ] : [];

        // In Gamma, replace soldering / electronics locations with VR and Robotics as per reference image
        const activeZones = lab.id === 'gamma'
          ? [
              ...baseZones.filter(z => z.key !== 'soldering' && z.key !== 'electronics'),
              ...specialZones
            ]
          : baseZones;

        return (
          <group key={`zones-${lab.id}`}>
            {activeZones.map((zone) => {
              const globalX = labOffsetX + zone.localX;
              const globalZ = zone.localZ;
              const [w, d] = zone.size;

              return (
                <group key={`${lab.id}-${zone.key}`} position={[globalX, 0.02, globalZ]}>
                  {/* Subtle Floor Zone Highlight Outline */}
                  <mesh rotation={[-Math.PI / 2, 0, 0]}>
                    <planeGeometry args={[w, d]} />
                    <meshBasicMaterial
                      color={lab.id === 'gamma' ? '#38BDF8' : lab.id === 'beta' ? '#00D2FF' : '#1677FF'}
                      transparent
                      opacity={0.12}
                    />
                  </mesh>

                  {/* Border line */}
                  <mesh rotation={[-Math.PI / 2, 0, 0]}>
                    <ringGeometry args={[Math.min(w, d) * 0.45, Math.min(w, d) * 0.48, 4]} />
                    <meshBasicMaterial color={lab.color} transparent opacity={0.4} />
                  </mesh>

                  {/* Floating Zone Label (Readable from Top and Isometric views) */}
                  <Text
                    position={[0, 0.05, 0]}
                    rotation={[-Math.PI / 2, 0, 0]}
                    fontSize={0.24}
                    color="#FFFFFF"
                    fontWeight={600}
                    anchorX="center"
                    anchorY="middle"
                  >
                    {zone.label}
                  </Text>
                </group>
              );
            })}
          </group>
        );
      })}
    </group>
  );
}
