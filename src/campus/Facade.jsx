import React, { useRef, useMemo } from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';
import { useStore } from '../store/useStore';
import {
  getLabFasciaPlateTexture,
  getLetterBadgeTexture
} from './exteriorTextures';
import { getDoorPrivacyBandTexture } from './doorTextures';

/**
 * High-Performance Architectural Facade (Revision 19)
 * Full front exterior of A5X Complex at Z = 12 spanning X in [0, 60], height 4.4m.
 * Solid opaque walls, tall curtain-wall glazing, AutoDoor with stainless steel handles,
 * column-supported entrance canopy (navy #0B2A5B underside, warm downlights, blue LED edge),
 * single-source lab fascia plates (>= 0.5m clear from door), zero overlaps, zero hanging wires.
 */
export function Facade() {
  const doorStates = useStore((state) => state.doorStates);

  const doorLeftRef = useRef();
  const doorRightRef = useRef();

  // Shared Materials (Optimized, merged, no pure-black surfaces)
  const materials = useMemo(() => {
    // 1. Lower Light-Grey Stone/Concrete Wall (0 - 1.0m)
    const lowerStoneWall = new THREE.MeshStandardMaterial({
      color: new THREE.Color('#D9E1EB'),
      roughness: 0.8,
      metalness: 0.05,
      side: THREE.FrontSide
    });

    // 2. Upper White Architectural Composite Panel (1.0 - 4.4m)
    const upperWhitePanel = new THREE.MeshStandardMaterial({
      color: new THREE.Color('#F4F7FB'),
      roughness: 0.55,
      metalness: 0.05,
      side: THREE.FrontSide
    });

    // 3. Navy Structural Fascia & Accent Blades (#071B3A)
    const navyAccent = new THREE.MeshStandardMaterial({
      color: new THREE.Color('#071B3A'),
      roughness: 0.4,
      metalness: 0.15,
      side: THREE.FrontSide
    });

    // 4. Navy Canopy Underside Material (#0B2A5B with soft bounce so it never renders black)
    const canopyUnderside = new THREE.MeshStandardMaterial({
      color: new THREE.Color('#0B2A5B'),
      emissive: new THREE.Color('#081D3D'),
      emissiveIntensity: 0.45,
      roughness: 0.4,
      metalness: 0.15
    });

    // 5. Electric Blue LED Runner (#1677FF)
    const electricBlueLed = new THREE.MeshStandardMaterial({
      color: new THREE.Color('#1677FF'),
      emissive: new THREE.Color('#1677FF'),
      emissiveIntensity: 2.2,
      roughness: 0.2
    });

    // 6. Curtain-Wall Clear Glazing (Revision 18 spec: #BFD8F2, opacity 0.20, roughness 0.05)
    const curtainGlass = new THREE.MeshStandardMaterial({
      color: new THREE.Color('#BFD8F2'),
      opacity: 0.20,
      transparent: true,
      roughness: 0.05,
      metalness: 0.0,
      side: THREE.DoubleSide,
      depthWrite: false
    });

    // 6b. Frosted Privacy Band for Sliding Doors
    const frostedBand = new THREE.MeshStandardMaterial({
      map: getDoorPrivacyBandTexture(),
      transparent: true,
      opacity: 0.55,
      roughness: 0.3,
      metalness: 0.05,
      side: THREE.DoubleSide,
      depthWrite: false
    });

    // 7. Black Anodized Steel Mullions, Columns & Sash Frame (#1B1F27)
    const blackSteel = new THREE.MeshStandardMaterial({
      color: new THREE.Color('#1B1F27'),
      roughness: 0.35,
      metalness: 0.8
    });

    // 8. Stainless Steel Hardware (Pull bars, column collars)
    const stainlessSteel = new THREE.MeshStandardMaterial({
      color: new THREE.Color('#E2E8F0'),
      roughness: 0.15,
      metalness: 0.95
    });

    // 9. Warm Downlight Emissive Lens (#FFF8EB)
    const warmDownlight = new THREE.MeshStandardMaterial({
      color: new THREE.Color('#FFF8EB'),
      emissive: new THREE.Color('#FFE8BA'),
      emissiveIntensity: 2.2,
      roughness: 0.2
    });

    // 10. Fake Sky Reflection backing (very subtle sky sheen)
    const fakeSkySheen = new THREE.MeshStandardMaterial({
      color: new THREE.Color('#C9E0F8'),
      opacity: 0.07,
      transparent: true,
      roughness: 0.1,
      depthWrite: false
    });

    // 11. Solid Campus Roof Slab Material
    const roofSlab = new THREE.MeshStandardMaterial({
      color: new THREE.Color('#E2E8F0'),
      roughness: 0.7,
      metalness: 0.1
    });

    return {
      lowerStoneWall,
      upperWhitePanel,
      navyAccent,
      canopyUnderside,
      electricBlueLed,
      curtainGlass,
      frostedBand,
      blackSteel,
      stainlessSteel,
      warmDownlight,
      fakeSkySheen,
      roofSlab
    };
  }, []);

  // Textures
  const alphaPlateTex = useMemo(() => getLabFasciaPlateTexture('alpha'), []);
  const betaPlateTex = useMemo(() => getLabFasciaPlateTexture('beta'), []);
  const gammaPlateTex = useMemo(() => getLabFasciaPlateTexture('gamma'), []);
  const badgeATex = useMemo(() => getLetterBadgeTexture('A'), []);
  const badgeBTex = useMemo(() => getLetterBadgeTexture('B'), []);
  const badgeGTex = useMemo(() => getLetterBadgeTexture('G'), []);

  // Smooth sliding door animation in useFrame
  useFrame((_, delta) => {
    const isOpen = Boolean(doorStates['door-main-entrance']);
    const targetLeft = isOpen ? -0.75 - 1.25 : -0.75;
    const targetRight = isOpen ? 0.75 + 1.25 : 0.75;
    const dampSpeed = 10;

    if (doorLeftRef.current) {
      doorLeftRef.current.position.x = THREE.MathUtils.damp(
        doorLeftRef.current.position.x,
        targetLeft,
        dampSpeed,
        delta
      );
    }
    if (doorRightRef.current) {
      doorRightRef.current.position.x = THREE.MathUtils.damp(
        doorRightRef.current.position.x,
        targetRight,
        dampSpeed,
        delta
      );
    }
  });

  // Solid pier columns definitions [xCenter, width]
  const pierColumns = [
    { x: 0.6, w: 1.2 },    // West end
    { x: 6.35, w: 0.3 },   // Left of Alpha door
    { x: 9.65, w: 0.3 },   // Right of Alpha door
    { x: 16.0, w: 2.4 },   // Alpha-Beta transition
    { x: 32.0, w: 2.4 },   // Beta-Gamma transition
    { x: 48.0, w: 2.4 },   // Gamma Main-Arena transition
    { x: 59.4, w: 1.2 }    // East end
  ];

  // Glazing Curtain Wall bays [xMin, xMax, label]
  const glazingBays = [
    { xMin: 1.2, xMax: 6.2, mullions: [2.45, 3.7, 4.95] },     // Alpha Left
    { xMin: 9.8, xMax: 14.8, mullions: [11.05, 12.3, 13.55] }, // Alpha Right
    { xMin: 17.2, xMax: 30.8, mullions: [19.9, 22.6, 25.4, 28.1] }, // Beta
    { xMin: 33.2, xMax: 46.8, mullions: [35.9, 38.6, 41.4, 44.1] }, // Gamma Main
    { xMin: 49.2, xMax: 58.8, mullions: [51.6, 54.0, 56.4] }  // Gamma Arena
  ];

  return (
    <group name="a5x-campus-facade" position={[0, 0, 12]}>
      {/* =========================================================================
          1. SOLID OPAQUE WALLS (Lower 0-1.0m, Solid Piers, Roof Coping)
         ========================================================================= */}
      
      {/* Lower Stone Wall: Alpha Left (0 to 6.5) */}
      <mesh position={[3.25, 0.5, 0]} material={materials.lowerStoneWall}>
        <boxGeometry args={[6.5, 1.0, 0.2]} />
      </mesh>
      {/* Lower Stone Wall: Alpha Right (9.5 to 16.0) */}
      <mesh position={[12.75, 0.5, 0]} material={materials.lowerStoneWall}>
        <boxGeometry args={[6.5, 1.0, 0.2]} />
      </mesh>
      {/* Lower Stone Wall: Beta (16.0 to 32.0) */}
      <mesh position={[24.0, 0.5, 0]} material={materials.lowerStoneWall}>
        <boxGeometry args={[16.0, 1.0, 0.2]} />
      </mesh>
      {/* Lower Stone Wall: Gamma Main (32.0 to 48.0) */}
      <mesh position={[40.0, 0.5, 0]} material={materials.lowerStoneWall}>
        <boxGeometry args={[16.0, 1.0, 0.2]} />
      </mesh>
      {/* Lower Stone Wall: Gamma Arena (48.0 to 60.0) */}
      <mesh position={[54.0, 0.5, 0]} material={materials.lowerStoneWall}>
        <boxGeometry args={[12.0, 1.0, 0.2]} />
      </mesh>

      {/* Solid Pier Columns (Full height 0 to 4.4m, completely opaque) */}
      {pierColumns.map((col, idx) => (
        <group key={`pier-col-${idx}`} position={[col.x, 2.2, 0]}>
          {/* Main White Composite Core */}
          <mesh material={materials.upperWhitePanel}>
            <boxGeometry args={[col.w, 4.4, 0.22]} />
          </mesh>
          {/* Navy Vertical Accent Blade */}
          <mesh position={[0, 0, 0.12]} material={materials.navyAccent}>
            <boxGeometry args={[Math.min(0.2, col.w * 0.4), 4.4, 0.04]} />
          </mesh>
          {/* Electric Blue LED Vertical Stripe */}
          <mesh position={[0, 0, 0.145]} material={materials.electricBlueLed}>
            <boxGeometry args={[0.03, 4.36, 0.01]} />
          </mesh>
        </group>
      ))}

      {/* Upper Spandrel Wall (3.4 to 3.6m) across full building except door */}
      <mesh position={[30.0, 3.5, 0]} material={materials.upperWhitePanel}>
        <boxGeometry args={[60.0, 0.2, 0.2]} />
      </mesh>

      {/* =========================================================================
          2. NAVY PARAPET FASCIA BAND (3.6m to 4.4m, 0.8m height) & ROOF
         ========================================================================= */}
      {/* Main Continuous Navy Fascia Band */}
      <mesh position={[30.0, 4.0, 0.02]} material={materials.navyAccent}>
        <boxGeometry args={[60.0, 0.8, 0.24]} />
      </mesh>

      {/* Continuous Electric Blue LED Line along bottom edge of Fascia at Y = 3.6m */}
      <mesh position={[30.0, 3.61, 0.145]} material={materials.electricBlueLed}>
        <boxGeometry args={[60.0, 0.025, 0.02]} />
      </mesh>

      {/* Crisp Dark Roof Coping along top edge at Y = 4.4m */}
      <mesh position={[30.0, 4.42, 0.02]} material={materials.blackSteel}>
        <boxGeometry args={[60.1, 0.06, 0.32]} />
      </mesh>

      {/* Solid Campus Roof Slab (extends back Z in [-12, 0] in local coords, y = 4.4m) */}
      <mesh position={[30.0, 4.4, -6.0]} material={materials.roofSlab}>
        <boxGeometry args={[60.0, 0.1, 12.0]} />
      </mesh>
      {/* Subtle Roof HVAC / Equipment Units */}
      {[10, 26, 42, 54].map((rx) => (
        <group key={`roof-hvac-${rx}`} position={[rx, 4.8, -6.0]}>
          <mesh material={materials.blackSteel}>
            <boxGeometry args={[2.4, 0.7, 1.8]} />
          </mesh>
          <mesh position={[0, 0.36, 0]} material={materials.stainlessSteel}>
            <cylinderGeometry args={[0.4, 0.4, 0.06, 16]} />
          </mesh>
        </group>
      ))}

      {/* =========================================================================
          3. CURTAIN-WALL GLAZING UNITS (Alpha, Beta, Gamma Main, Gamma Arena)
         ========================================================================= */}
      {glazingBays.map((bay, idx) => {
        const width = bay.xMax - bay.xMin;
        const centerX = bay.xMin + width / 2;
        const height = 2.4; // Y in [1.0, 3.4]
        const centerY = 2.2;

        return (
          <group key={`glaze-bay-${idx}`} position={[centerX, centerY, 0]}>
            {/* Clear Curtain Glass */}
            <mesh material={materials.curtainGlass} renderOrder={10}>
              <boxGeometry args={[width, height, 0.04]} />
            </mesh>

            {/* Subtle Fake Sky Sheen Plane (offset 0.01m inside glass) */}
            <mesh position={[0, 0, 0.015]} material={materials.fakeSkySheen} renderOrder={11}>
              <planeGeometry args={[width, height]} />
            </mesh>

            {/* Perimeter Black Steel Window Frame */}
            {/* Top Frame */}
            <mesh position={[0, height / 2 - 0.025, 0.02]} material={materials.blackSteel}>
              <boxGeometry args={[width, 0.05, 0.08]} />
            </mesh>
            {/* Bottom Sill */}
            <mesh position={[0, -height / 2 + 0.025, 0.02]} material={materials.blackSteel}>
              <boxGeometry args={[width, 0.05, 0.08]} />
            </mesh>
            {/* Left Jamb */}
            <mesh position={[-width / 2 + 0.025, 0, 0.02]} material={materials.blackSteel}>
              <boxGeometry args={[0.05, height, 0.08]} />
            </mesh>
            {/* Right Jamb */}
            <mesh position={[width / 2 - 0.025, 0, 0.02]} material={materials.blackSteel}>
              <boxGeometry args={[0.05, height, 0.08]} />
            </mesh>

            {/* Horizontal Transom Bar at Y = 2.2m (local y = 0.0) */}
            <mesh position={[0, 0, 0.025]} material={materials.blackSteel}>
              <boxGeometry args={[width, 0.04, 0.07]} />
            </mesh>

            {/* Vertical Mullions */}
            {bay.mullions.map((mx) => {
              const localMx = mx - centerX;
              return (
                <mesh key={`mullion-${mx}`} position={[localMx, 0, 0.025]} material={materials.blackSteel}>
                  <boxGeometry args={[0.05, height, 0.07]} />
                </mesh>
              );
            })}
          </group>
        );
      })}

      {/* =========================================================================
          4. MAIN ENTRANCE DOOR (Lab Alpha, X in [6.5, 9.5], Width 3.0m, Height 2.8m)
         ========================================================================= */}
      <group position={[8.0, 0, 0]}>
        {/* Black Matte Steel Perimeter Portal Frame */}
        {/* Left Jamb (x = -1.5) */}
        <mesh position={[-1.5, 1.4, 0.04]} material={materials.blackSteel}>
          <boxGeometry args={[0.1, 2.8, 0.16]} />
        </mesh>
        {/* Right Jamb (x = +1.5) */}
        <mesh position={[1.5, 1.4, 0.04]} material={materials.blackSteel}>
          <boxGeometry args={[0.1, 2.8, 0.16]} />
        </mesh>
        {/* Lintel Beam (y = 2.8) */}
        <mesh position={[0, 2.82, 0.04]} material={materials.blackSteel}>
          <boxGeometry args={[3.1, 0.06, 0.16]} />
        </mesh>

        {/* Blue LED Floor Threshold Strip at Y = 0.003 */}
        <mesh position={[0, 0.003, 0]} material={materials.electricBlueLed}>
          <boxGeometry args={[3.0, 0.006, 0.12]} />
        </mesh>

        {/* Slim Navy Header Box (Y in [2.85, 3.15]) with centered small A5X mark & Motion Sensor */}
        <group position={[0, 3.0, 0.05]}>
          <mesh material={materials.navyAccent}>
            <boxGeometry args={[3.0, 0.3, 0.14]} />
          </mesh>
          <mesh position={[0, -0.14, 0.075]} material={materials.electricBlueLed}>
            <boxGeometry args={[3.0, 0.02, 0.01]} />
          </mesh>
          {/* Centered Small A5X Emblem */}
          <group position={[0, 0.02, 0.072]}>
            <mesh position={[-0.14, 0, 0]} material={materials.electricBlueLed}>
              <boxGeometry args={[0.04, 0.1, 0.01]} />
            </mesh>
            <mesh position={[0.14, 0, 0]} material={materials.electricBlueLed}>
              <boxGeometry args={[0.04, 0.1, 0.01]} />
            </mesh>
          </group>
          {/* Sensor Dome & Pilot LED */}
          <mesh position={[0, -0.05, 0.075]} material={materials.blackSteel}>
            <boxGeometry args={[0.18, 0.06, 0.03]} />
          </mesh>
          <mesh position={[0, -0.05, 0.092]} material={materials.electricBlueLed}>
            <sphereGeometry args={[0.012, 8, 8]} />
          </mesh>
        </group>

        {/* Double Sliding Clear Glass Doors (Animated via useFrame) */}
        {/* Left Leaf (Width 1.48m, Height 2.72m) */}
        <group ref={doorLeftRef} position={[-0.75, 1.38, 0.02]}>
          {/* Clear Glass */}
          <mesh material={materials.curtainGlass} renderOrder={15}>
            <boxGeometry args={[1.44, 2.70, 0.03]} />
          </mesh>
          {/* Frosted Privacy Band at Y in [1.0, 1.4m] */}
          <mesh position={[0, -0.18, 0]} material={materials.frostedBand} renderOrder={16}>
            <planeGeometry args={[1.40, 0.40]} />
          </mesh>
          {/* Opaque White Leading Edge */}
          <mesh position={[0.71, 0, 0]}>
            <boxGeometry args={[0.015, 2.68, 0.032]} />
            <meshStandardMaterial color="#FFFFFF" roughness={0.3} metalness={0.1} />
          </mesh>
          {/* Black Perimeter Sash */}
          <mesh position={[0, 1.34, 0]} material={materials.blackSteel}>
            <boxGeometry args={[1.48, 0.05, 0.05]} />
          </mesh>
          <mesh position={[0, -1.34, 0]} material={materials.blackSteel}>
            <boxGeometry args={[1.48, 0.05, 0.05]} />
          </mesh>
          <mesh position={[-0.72, 0, 0]} material={materials.blackSteel}>
            <boxGeometry args={[0.05, 2.72, 0.05]} />
          </mesh>
          <mesh position={[0.72, 0, 0]} material={materials.blackSteel}>
            <boxGeometry args={[0.05, 2.72, 0.05]} />
          </mesh>

          {/* Vertical Stainless Steel Pull Bar */}
          <mesh position={[0.62, 0, 0.055]} material={materials.stainlessSteel}>
            <cylinderGeometry args={[0.015, 0.015, 1.2, 16]} />
          </mesh>
          <mesh position={[0.62, 0.55, 0.03]} rotation={[Math.PI / 2, 0, 0]} material={materials.stainlessSteel}>
            <cylinderGeometry args={[0.01, 0.01, 0.05, 16]} />
          </mesh>
          <mesh position={[0.62, -0.55, 0.03]} rotation={[Math.PI / 2, 0, 0]} material={materials.stainlessSteel}>
            <cylinderGeometry args={[0.01, 0.01, 0.05, 16]} />
          </mesh>
          {/* Interior pull bar */}
          <mesh position={[0.62, 0, -0.055]} material={materials.stainlessSteel}>
            <cylinderGeometry args={[0.015, 0.015, 1.2, 16]} />
          </mesh>
        </group>

        {/* Right Leaf (Width 1.48m, Height 2.72m) */}
        <group ref={doorRightRef} position={[0.75, 1.38, 0.02]}>
          {/* Clear Glass */}
          <mesh material={materials.curtainGlass} renderOrder={15}>
            <boxGeometry args={[1.44, 2.70, 0.03]} />
          </mesh>
          {/* Frosted Privacy Band at Y in [1.0, 1.4m] */}
          <mesh position={[0, -0.18, 0]} material={materials.frostedBand} renderOrder={16}>
            <planeGeometry args={[1.40, 0.40]} />
          </mesh>
          {/* Opaque White Leading Edge */}
          <mesh position={[0.71, 0, 0]}>
            <boxGeometry args={[0.015, 2.68, 0.032]} />
            <meshStandardMaterial color="#FFFFFF" roughness={0.3} metalness={0.1} />
          </mesh>
          {/* Black Perimeter Sash */}
          <mesh position={[0, 1.34, 0]} material={materials.blackSteel}>
            <boxGeometry args={[1.48, 0.05, 0.05]} />
          </mesh>
          <mesh position={[0, -1.34, 0]} material={materials.blackSteel}>
            <boxGeometry args={[1.48, 0.05, 0.05]} />
          </mesh>
          <mesh position={[-0.72, 0, 0]} material={materials.blackSteel}>
            <boxGeometry args={[0.05, 2.72, 0.05]} />
          </mesh>
          <mesh position={[0.72, 0, 0]} material={materials.blackSteel}>
            <boxGeometry args={[0.05, 2.72, 0.05]} />
          </mesh>

          {/* Vertical Stainless Steel Pull Bar */}
          <mesh position={[-0.62, 0, 0.055]} material={materials.stainlessSteel}>
            <cylinderGeometry args={[0.015, 0.015, 1.2, 16]} />
          </mesh>
          <mesh position={[-0.62, 0.55, 0.03]} rotation={[Math.PI / 2, 0, 0]} material={materials.stainlessSteel}>
            <cylinderGeometry args={[0.01, 0.01, 0.05, 16]} />
          </mesh>
          <mesh position={[-0.62, -0.55, 0.03]} rotation={[Math.PI / 2, 0, 0]} material={materials.stainlessSteel}>
            <cylinderGeometry args={[0.01, 0.01, 0.05, 16]} />
          </mesh>
          {/* Interior pull bar */}
          <mesh position={[-0.62, 0, -0.055]} material={materials.stainlessSteel}>
            <cylinderGeometry args={[0.015, 0.015, 1.2, 16]} />
          </mesh>
        </group>

        {/* =======================================================================
            5. ARCHITECTURAL ENTRANCE CANOPY (Width 3.4m, Depth 1.5m, Height 3.25m)
               - Solid steel slab (white top, navy underside #0B2A5B, NOT black)
               - Supported by two slim black-steel columns at front corners (NO cables)
               - Warm emissive downlight discs & thin electric-blue LED edge
           ======================================================================= */}
        <group position={[0, 3.25, 0.75]}>
          {/* Canopy Slab Body */}
          <mesh material={materials.canopyUnderside}>
            <boxGeometry args={[3.4, 0.1, 1.5]} />
          </mesh>
          {/* White Composite Top */}
          <mesh position={[0, 0.052, 0]} material={materials.upperWhitePanel}>
            <boxGeometry args={[3.4, 0.005, 1.5]} />
          </mesh>
          {/* Navy Underside Ceiling Facing Surface (Self-illuminated so never black) */}
          <mesh position={[0, -0.052, 0]} rotation={[Math.PI / 2, 0, 0]} material={materials.canopyUnderside}>
            <planeGeometry args={[3.38, 1.48]} />
          </mesh>
          {/* Dark Metal Fascia Edges */}
          <mesh position={[0, 0, 0.75]} material={materials.blackSteel}>
            <boxGeometry args={[3.42, 0.11, 0.02]} />
          </mesh>
          <mesh position={[-1.7, 0, 0]} material={materials.blackSteel}>
            <boxGeometry args={[0.02, 0.11, 1.5]} />
          </mesh>
          <mesh position={[1.7, 0, 0]} material={materials.blackSteel}>
            <boxGeometry args={[0.02, 0.11, 1.5]} />
          </mesh>

          {/* Thin Electric-Blue LED Edge Runner Along Front & Sides */}
          <mesh position={[0, -0.05, 0.755]} material={materials.electricBlueLed}>
            <boxGeometry args={[3.4, 0.015, 0.01]} />
          </mesh>
          <mesh position={[-1.705, -0.05, 0]} material={materials.electricBlueLed}>
            <boxGeometry args={[0.01, 0.015, 1.5]} />
          </mesh>
          <mesh position={[1.705, -0.05, 0]} material={materials.electricBlueLed}>
            <boxGeometry args={[0.01, 0.015, 1.5]} />
          </mesh>

          {/* Under-Canopy Recessed Warm Downlight Discs */}
          {[-0.8, 0.8].map((lx) => (
            <group key={`downlight-${lx}`} position={[lx, -0.052, 0]}>
              <mesh material={materials.blackSteel}>
                <cylinderGeometry args={[0.15, 0.15, 0.01, 16]} />
              </mesh>
              <mesh position={[0, -0.005, 0]} material={materials.warmDownlight}>
                <circleGeometry args={[0.12, 16]} />
              </mesh>
            </group>
          ))}

          {/* Heavy Architectural Cantilever Wall Brackets Supporting Rear */}
          {[-1.4, 1.4].map((bx) => (
            <group key={`bracket-${bx}`} position={[bx, -0.25, -0.45]}>
              <mesh material={materials.blackSteel}>
                <boxGeometry args={[0.08, 0.4, 0.6]} />
              </mesh>
            </group>
          ))}
        </group>

        {/* Two Slim Black-Steel Front Support Columns (Ground Y=0 to Canopy Y=3.2m, NO hanging wires) */}
        {[-1.6, 1.6].map((cx) => (
          <group key={`canopy-col-${cx}`} position={[cx, 0, 1.45]}>
            {/* Stainless Steel Ground Base Collar */}
            <mesh position={[0, 0.02, 0]} material={materials.stainlessSteel}>
              <cylinderGeometry args={[0.06, 0.07, 0.04, 16]} />
            </mesh>
            {/* Vertical Steel Column (3.2m height, 60mm diameter) */}
            <mesh position={[0, 1.6, 0]} material={materials.blackSteel}>
              <cylinderGeometry args={[0.03, 0.03, 3.2, 16]} />
            </mesh>
            {/* Top Connector Collar to Canopy Underside */}
            <mesh position={[0, 3.2, 0]} material={materials.stainlessSteel}>
              <cylinderGeometry args={[0.06, 0.05, 0.04, 16]} />
            </mesh>
          </group>
        ))}
      </group>

      {/* =========================================================================
          6. CLEAN LAB FASCIA SIGNAGE (Fascia Band above glazing, >= 0.5m clear from door)
         ========================================================================= */}
      {/* 6.1 Lab Alpha Fascia Plate (Left of door above glazing at X = 3.5, Y = 3.85m, Width 3.6m)
             Clearance to door canopy (X = 6.3): 6.3 - 5.3 = 1.0m >= 0.5m! Zero overlap! */}
      <mesh position={[3.5, 3.85, 0.15]}>
        <planeGeometry args={[3.6, 0.55]} />
        <meshBasicMaterial map={alphaPlateTex} toneMapped={false} />
      </mesh>

      {/* 6.2 Lab Beta Fascia Plate (Above Beta glazing at X = 21.0, Y = 3.85m, Width 4.4m) */}
      <mesh position={[21.0, 3.85, 0.15]}>
        <planeGeometry args={[4.4, 0.55]} />
        <meshBasicMaterial map={betaPlateTex} toneMapped={false} />
      </mesh>

      {/* 6.3 Lab Gamma Fascia Plate (Above Gamma glazing at X = 37.0, Y = 3.85m, Width 4.8m) */}
      <mesh position={[37.0, 3.85, 0.15]}>
        <planeGeometry args={[4.8, 0.55]} />
        <meshBasicMaterial map={gammaPlateTex} toneMapped={false} />
      </mesh>

      {/* 6.4 Letter Badges Mounted on Facade Structural Columns */}
      {/* Badge 'A' on West Column */}
      <mesh position={[0.6, 2.4, 0.15]}>
        <planeGeometry args={[0.42, 0.42]} />
        <meshBasicMaterial map={badgeATex} toneMapped={false} />
      </mesh>
      {/* Badge 'B' on Alpha-Beta Column */}
      <mesh position={[16.0, 2.4, 0.15]}>
        <planeGeometry args={[0.42, 0.42]} />
        <meshBasicMaterial map={badgeBTex} toneMapped={false} />
      </mesh>
      {/* Badge 'G' on Beta-Gamma Column */}
      <mesh position={[32.0, 2.4, 0.15]}>
        <planeGeometry args={[0.42, 0.42]} />
        <meshBasicMaterial map={badgeGTex} toneMapped={false} />
      </mesh>
    </group>
  );
}
