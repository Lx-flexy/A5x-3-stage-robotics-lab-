import React, { useMemo } from 'react';
import * as THREE from 'three';
import { CAMPUS_CONFIG } from '../data/config';

export function useCampusMaterials() {
  const materials = useMemo(() => {
    // 1. Navy Feature Wall Material (Primary brand backdrop)
    const navyFeatureWall = new THREE.MeshStandardMaterial({
      color: new THREE.Color(CAMPUS_CONFIG.brand.colors.navy),
      roughness: 0.35,
      metalness: 0.15,
      side: THREE.DoubleSide
    });

    // 2. Pure Interior Architectural Light Wall
    const interiorWall = new THREE.MeshStandardMaterial({
      color: new THREE.Color('#F3F6FA'),
      roughness: 0.85,
      metalness: 0.05,
      side: THREE.DoubleSide
    });

    // 3. Dark Exterior / Perimeter Wall
    const exteriorWall = new THREE.MeshStandardMaterial({
      color: new THREE.Color('#0D1527'),
      roughness: 0.7,
      metalness: 0.2
    });

    // 4. Polished Concrete / Light Epoxy Lab Floor
    const labFloor = new THREE.MeshStandardMaterial({
      color: new THREE.Color('#E3E8F0'),
      roughness: 0.25,
      metalness: 0.1,
    });

    // 5. Exterior Plaza Pavement
    const exteriorFloor = new THREE.MeshStandardMaterial({
      color: new THREE.Color('#1B2538'),
      roughness: 0.6,
      metalness: 0.15,
    });

    // 6. Electric Blue Glow Material (LED strips, brand highlights)
    const electricBlueGlow = new THREE.MeshStandardMaterial({
      color: new THREE.Color(CAMPUS_CONFIG.brand.colors.electricBlue),
      emissive: new THREE.Color(CAMPUS_CONFIG.brand.colors.electricBlue),
      emissiveIntensity: 2.2,
      roughness: 0.2,
      metalness: 0.1
    });

    // 7. Cyan / Accent Glow
    const cyanGlow = new THREE.MeshStandardMaterial({
      color: new THREE.Color(CAMPUS_CONFIG.brand.colors.cyanGlow),
      emissive: new THREE.Color(CAMPUS_CONFIG.brand.colors.cyanGlow),
      emissiveIntensity: 2.0,
      roughness: 0.2
    });

    // 8. Glass Material (Sliding doors & partitions - Standard Material with opacity for high performance)
    const glass = new THREE.MeshStandardMaterial({
      color: new THREE.Color('#D0E4FF'),
      opacity: 0.35,
      transparent: true,
      roughness: 0.1,
      metalness: 0.1,
      side: THREE.DoubleSide
    });

    // 9. Frosted / Blue Tinted Glass
    const tintedGlass = new THREE.MeshStandardMaterial({
      color: new THREE.Color('#1677FF'),
      opacity: 0.40,
      transparent: true,
      roughness: 0.2,
      metalness: 0.1,
      side: THREE.DoubleSide
    });

    // 10. Architectural Metal / Black Anodized Aluminum Mullions
    const darkMetal = new THREE.MeshStandardMaterial({
      color: new THREE.Color('#111827'),
      roughness: 0.3,
      metalness: 0.8
    });

    // 11. Silver / Chrome Hardware
    const chrome = new THREE.MeshStandardMaterial({
      color: new THREE.Color('#D1D5DB'),
      roughness: 0.15,
      metalness: 0.95
    });

    // 12. Acoustic Ceiling Tile Material
    const ceiling = new THREE.MeshStandardMaterial({
      color: new THREE.Color('#E8ECEF'),
      roughness: 0.9,
      metalness: 0.05
    });

    return {
      navyFeatureWall,
      interiorWall,
      exteriorWall,
      labFloor,
      exteriorFloor,
      electricBlueGlow,
      cyanGlow,
      glass,
      tintedGlass,
      darkMetal,
      chrome,
      ceiling
    };
  }, []);

  return materials;
}
