import React, { useMemo, useRef } from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';
import { useStore } from '../store/useStore';
import { getDoorPrivacyBandTexture, getDoorLintelPlateTexture } from './doorTextures';

/**
 * Universal AutoDoor Component — Revision 20
 * 
 * Replaces all monolithic / legacy door slabs and pitch-black lintels.
 * 
 * Features:
 * 1. 3.0 m wide x 2.4 m high opening with 4-piece black steel frame (#1B1F27).
 * 2. Lintel (Y in [2.4, 3.6m]) in light-grey architectural finish with navy fascia (#0B2A5B)
 *    and directional signage plates visible on BOTH faces (never pure black).
 * 3. Two sliding glass leaves (1.5 x 2.4 x 0.04 m), DoubleSide, opacity 0.22, #CFE3FF,
 *    depthWrite false, renderOrder 5, thin opaque white leading edge, frosted privacy band at 1.0-1.4m,
 *    vertical brushed stainless pull bars on both faces, black bottom rail.
 * 4. Self-contained robust state machine: CLOSED -> OPENING -> OPEN -> CLOSING
 *    Driven via useFrame with refs (zero setState in render loop).
 * 5. Dynamic threshold LED strip that lerps from Electric Blue (#1677FF) to Green (#10B981) when open.
 * 6. Responsive world-space trigger box (3.0m wide x 2.5m deep, 1.25m on both sides of wall).
 */
export function AutoDoor({
  id = 'door-alpha-beta',
  position = [16, 0, 6],
  axis = 'x', // 'x' = wall in Z direction (sliding along Z); 'z' = wall in X direction (sliding along X)
  width = 3.0,
  height = 2.4,
  wallThickness = 0.20,
  labelSideA = 'LAB BETA ▶',
  subLabelSideA = 'DEVELOPMENT LAB',
  labelSideB = '◀ LAB ALPHA',
  subLabelSideB = 'FOUNDATION LAB',
}) {
  const leftLeafRef = useRef();
  const rightLeafRef = useRef();
  const thresholdLedRef = useRef();
  const sensorLedRef = useRef();

  // Non-reactive animation state kept in ref
  const animRef = useRef({
    progress: 0, // 0 = closed, 1 = fully open
    state: 'CLOSED', // 'CLOSED' | 'OPENING' | 'OPEN' | 'CLOSING'
    blinkTimer: 0,
  });

  // Textures
  const privacyTexture = useMemo(() => getDoorPrivacyBandTexture(), []);
  const sideAPlateTex = useMemo(
    () => getDoorLintelPlateTexture(labelSideA, subLabelSideA),
    [labelSideA, subLabelSideA]
  );
  const sideBPlateTex = useMemo(
    () => getDoorLintelPlateTexture(labelSideB, subLabelSideB),
    [labelSideB, subLabelSideB]
  );

  // Materials (reusable, instanced, optimized <= 6 draw calls)
  const materials = useMemo(() => {
    // 1. Crystal clear sliding door glass
    const glass = new THREE.MeshStandardMaterial({
      color: '#CFE3FF',
      roughness: 0.05,
      metalness: 0.0,
      opacity: 0.22,
      transparent: true,
      depthWrite: false,
      side: THREE.DoubleSide,
    });

    // 2. Frosted privacy band
    const frostedBand = new THREE.MeshStandardMaterial({
      map: privacyTexture,
      transparent: true,
      opacity: 0.55,
      roughness: 0.3,
      metalness: 0.05,
      depthWrite: false,
      side: THREE.DoubleSide,
    });

    // 3. Black steel frame profile (#1B1F27)
    const blackSteel = new THREE.MeshStandardMaterial({
      color: '#1B1F27',
      roughness: 0.35,
      metalness: 0.85,
    });

    // 4. Brushed stainless steel pull handles
    const stainlessSteel = new THREE.MeshStandardMaterial({
      color: '#E2E8F0',
      roughness: 0.18,
      metalness: 0.95,
    });

    // 5. Light architectural grey lintel wall (#E2E8F0)
    const lintelWall = new THREE.MeshStandardMaterial({
      color: '#E2E8F0',
      roughness: 0.75,
      metalness: 0.05,
      side: THREE.DoubleSide,
    });

    // 6. Architectural navy fascia (#0B2A5B - never black)
    const navyFascia = new THREE.MeshStandardMaterial({
      color: '#0B2A5B',
      roughness: 0.40,
      metalness: 0.20,
      side: THREE.DoubleSide,
    });

    // 7. Threshold LED strip (dynamic color lerp in useFrame)
    const thresholdLed = new THREE.MeshStandardMaterial({
      color: '#1677FF',
      emissive: '#1677FF',
      emissiveIntensity: 2.8,
      roughness: 0.2,
    });

    // 8. Opaque white leading edge strip
    const whiteEdge = new THREE.MeshStandardMaterial({
      color: '#FFFFFF',
      roughness: 0.3,
      metalness: 0.1,
      side: THREE.DoubleSide,
    });

    // 9. Sensor pilot LED
    const sensorLed = new THREE.MeshStandardMaterial({
      color: '#10B981',
      emissive: '#10B981',
      emissiveIntensity: 3.0,
      roughness: 0.1,
    });

    return {
      glass,
      frostedBand,
      blackSteel,
      stainlessSteel,
      lintelWall,
      navyFascia,
      thresholdLed,
      whiteEdge,
      sensorLed,
    };
  }, [privacyTexture]);

  // Dimensions
  const leafWidth = width / 2; // 1.5 m
  const leafHeight = height; // 2.4 m
  const leafThickness = 0.04; // 40 mm
  const frameThickness = 0.05; // 50 mm
  const frameDepth = wallThickness + 0.02; // 0.22 m
  const lintelHeight = 3.6 - height; // 1.2 m (from Y=2.4 to Y=3.6)
  const lintelCenterY = height + lintelHeight / 2; // 2.4 + 0.6 = 3.0 m

  // Colors for LED lerp
  const blueColor = useMemo(() => new THREE.Color('#1677FF'), []);
  const greenColor = useMemo(() => new THREE.Color('#10B981'), []);

  // Frame animation loop
  useFrame((state, delta) => {
    // 1. Proximity Check using camera or player pos
    const cameraPos = state.camera.position;
    const [doorX, , doorZ] = position;

    let inTrigger = false;
    if (axis === 'x') {
      // Wall runs along Z. Opening along Z in [doorZ - 1.5, doorZ + 1.5].
      // Depth along X is 1.25m on each side: X in [doorX - 1.25, doorX + 1.25].
      const dx = Math.abs(cameraPos.x - doorX);
      const dz = Math.abs(cameraPos.z - doorZ);
      inTrigger = dx <= 1.8 && dz <= 2.2;
    } else {
      // Wall runs along X. Opening along X in [doorX - 1.5, doorX + 1.5].
      const dx = Math.abs(cameraPos.x - doorX);
      const dz = Math.abs(cameraPos.z - doorZ);
      inTrigger = dx <= 2.2 && dz <= 1.8;
    }

    // Also support store or manual dev overrides
    const storeDoorStates = useStore.getState().doorStates;
    const shouldOpen = inTrigger || Boolean(storeDoorStates[id]);

    // Keep store synced without triggering rerenders if unchanged
    if (storeDoorStates[id] !== shouldOpen) {
      useStore.getState().setDoorOpen(id, shouldOpen);
    }

    // 2. Animate progress
    const anim = animRef.current;
    const targetProgress = shouldOpen ? 1.0 : 0.0;
    const speed = shouldOpen ? 3.5 : 2.5;
    anim.progress = THREE.MathUtils.damp(anim.progress, targetProgress, speed, delta);

    if (anim.progress < 0.01) {
      anim.progress = 0;
      anim.state = 'CLOSED';
    } else if (anim.progress > 0.99) {
      anim.progress = 1;
      anim.state = 'OPEN';
    } else {
      anim.state = shouldOpen ? 'OPENING' : 'CLOSING';
    }

    // 3. Move door leaves
    // Closed offsets: left = -leafWidth/2 (-0.75m), right = +leafWidth/2 (+0.75m)
    // Fully open: slide outwards by (leafWidth - 0.1) = 1.4m so opening is 100% clear (3.0m clear)
    const slideOffset = anim.progress * 1.35;
    const leftPos = -leafWidth / 2 - slideOffset;
    const rightPos = leafWidth / 2 + slideOffset;

    if (leftLeafRef.current) {
      leftLeafRef.current.position.x = leftPos;
    }
    if (rightLeafRef.current) {
      rightLeafRef.current.position.x = rightPos;
    }

    // 4. Dynamic LED Lerp (Blue -> Green on open)
    if (thresholdLedRef.current) {
      const curColor = blueColor.clone().lerp(greenColor, anim.progress);
      thresholdLedRef.current.color.copy(curColor);
      thresholdLedRef.current.emissive.copy(curColor);
    }

    // 5. Sensor Pilot LED subtle blink / glow
    anim.blinkTimer += delta;
    if (sensorLedRef.current) {
      const blinkIntensity = anim.state === 'OPEN' || anim.state === 'OPENING' ? 3.5 : (Math.sin(anim.blinkTimer * 3) > 0 ? 2.5 : 0.8);
      sensorLedRef.current.emissiveIntensity = blinkIntensity;
    }
  });

  // Rotation:
  // Default coordinate system of the door group:
  // Local X = along door opening width (sliding direction)
  // Local Y = height (vertical)
  // Local Z = through door thickness (wall thickness)
  // If axis === 'x', wall normal is parallel to world X, wall surface is parallel to world Z.
  // We rotate group around Y by Math.PI / 2 so local X maps to world Z!
  const groupRotation = axis === 'x' ? [0, Math.PI / 2, 0] : [0, 0, 0];

  return (
    <group name={`autodoor-${id}`} position={position} rotation={groupRotation}>
      {/* =========================================================================
          1. LINTEL & SIGNAGE STRUCTURE (Y in [2.4, 3.6m], Height = 1.2m)
          Visible and pristine from BOTH sides!
         ========================================================================= */}
      <group position={[0, lintelCenterY, 0]}>
        {/* Core Lintel Box (Light Architectural Grey #E2E8F0, NEVER pure black) */}
        <mesh material={materials.lintelWall} castShadow receiveShadow>
          <boxGeometry args={[width, lintelHeight, wallThickness]} />
        </mesh>

        {/* Side A Navy Fascia Band & Sign (Local Z = -wallThickness/2 - 0.005) */}
        <group position={[0, -0.15, -wallThickness / 2 - 0.006]}>
          {/* Navy Architectural Backplate */}
          <mesh material={materials.navyFascia} rotation={[0, Math.PI, 0]}>
            <boxGeometry args={[width - 0.04, 0.44, 0.015]} />
          </mesh>
          {/* Electric Blue LED Border underline */}
          <mesh position={[0, -0.22, -0.008]} rotation={[0, Math.PI, 0]}>
            <boxGeometry args={[width - 0.08, 0.02, 0.01]} />
            <meshStandardMaterial color="#1677FF" emissive="#1677FF" emissiveIntensity={2.5} />
          </mesh>
          {/* Directional Sign Plate */}
          <mesh position={[0, 0, -0.01]} rotation={[0, Math.PI, 0]}>
            <planeGeometry args={[2.7, 0.38]} />
            <meshBasicMaterial map={sideBPlateTex} toneMapped={false} />
          </mesh>
          {/* Motion Sensor Dome */}
          <mesh position={[0, -0.26, -0.02]} material={materials.blackSteel}>
            <boxGeometry args={[0.20, 0.05, 0.04]} />
          </mesh>
          <mesh ref={sensorLedRef} position={[0, -0.26, -0.042]} material={materials.sensorLed}>
            <sphereGeometry args={[0.012, 8, 8]} />
          </mesh>
        </group>

        {/* Side B Navy Fascia Band & Sign (Local Z = +wallThickness/2 + 0.005) */}
        <group position={[0, -0.15, wallThickness / 2 + 0.006]}>
          {/* Navy Architectural Backplate */}
          <mesh material={materials.navyFascia}>
            <boxGeometry args={[width - 0.04, 0.44, 0.015]} />
          </mesh>
          {/* Electric Blue LED Border underline */}
          <mesh position={[0, -0.22, 0.008]}>
            <boxGeometry args={[width - 0.08, 0.02, 0.01]} />
            <meshStandardMaterial color="#1677FF" emissive="#1677FF" emissiveIntensity={2.5} />
          </mesh>
          {/* Directional Sign Plate */}
          <mesh position={[0, 0, 0.01]}>
            <planeGeometry args={[2.7, 0.38]} />
            <meshBasicMaterial map={sideAPlateTex} toneMapped={false} />
          </mesh>
          {/* Motion Sensor Dome */}
          <mesh position={[0, -0.26, 0.02]} material={materials.blackSteel}>
            <boxGeometry args={[0.20, 0.05, 0.04]} />
          </mesh>
          <mesh position={[0, -0.26, 0.042]} material={materials.sensorLed}>
            <sphereGeometry args={[0.012, 8, 8]} />
          </mesh>
        </group>
      </group>

      {/* =========================================================================
          2. PERIMETER BLACK STEEL FRAME (#1B1F27, 50mm Profile)
          Visible from both sides around the entire 3.0 x 2.4 m opening.
         ========================================================================= */}
      <group name="door-perimeter-frame">
        {/* Left Jamb */}
        <mesh position={[-width / 2 + frameThickness / 2, height / 2, 0]} material={materials.blackSteel}>
          <boxGeometry args={[frameThickness, height, frameDepth]} />
        </mesh>
        {/* Right Jamb */}
        <mesh position={[width / 2 - frameThickness / 2, height / 2, 0]} material={materials.blackSteel}>
          <boxGeometry args={[frameThickness, height, frameDepth]} />
        </mesh>
        {/* Header Beam */}
        <mesh position={[0, height - frameThickness / 2, 0]} material={materials.blackSteel}>
          <boxGeometry args={[width, frameThickness, frameDepth]} />
        </mesh>

        {/* Floor Threshold with Dynamic LED Strip */}
        <mesh position={[0, 0.004, 0]}>
          <boxGeometry args={[width - 0.02, 0.008, 0.16]} />
          <primitive ref={thresholdLedRef} object={materials.thresholdLed} />
        </mesh>
        {/* Threshold Steel Edge Trim */}
        <mesh position={[0, 0.003, 0.09]} material={materials.blackSteel}>
          <boxGeometry args={[width, 0.006, 0.02]} />
        </mesh>
        <mesh position={[0, 0.003, -0.09]} material={materials.blackSteel}>
          <boxGeometry args={[width, 0.006, 0.02]} />
        </mesh>
      </group>

      {/* =========================================================================
          3. DUAL SLIDING GLASS DOOR LEAVES
          Two 1.5 x 2.4 x 0.04m leaves sliding smoothly along X.
          Opacity 0.22, #CFE3FF, DoubleSide, depthWrite: false, renderOrder: 5.
         ========================================================================= */}
      {/* 3A. LEFT LEAF */}
      <group ref={leftLeafRef} position={[-leafWidth / 2, height / 2, 0.015]}>
        {/* Sliding Glass Body */}
        <mesh material={materials.glass} renderOrder={5}>
          <boxGeometry args={[leafWidth - 0.01, leafHeight - 0.04, leafThickness]} />
        </mesh>

        {/* Frosted Privacy Band (Y in [1.0, 1.4m] -> local Y = -height/2 + 1.2 = 0) */}
        <mesh position={[0, 0, 0]} material={materials.frostedBand} renderOrder={6}>
          <planeGeometry args={[leafWidth - 0.01, 0.40]} />
        </mesh>

        {/* Opaque White Leading Edge Strip (Meeting edge at local X = +leafWidth/2) */}
        <mesh position={[leafWidth / 2 - 0.008, 0, 0]} material={materials.whiteEdge}>
          <boxGeometry args={[0.015, leafHeight - 0.04, leafThickness + 0.002]} />
        </mesh>

        {/* Black Bottom Guide Rail */}
        <mesh position={[0, -leafHeight / 2 + 0.025, 0]} material={materials.blackSteel}>
          <boxGeometry args={[leafWidth, 0.05, leafThickness + 0.01]} />
        </mesh>

        {/* Brushed Stainless Steel Pull Handle - Front Face (+Z) */}
        <group position={[leafWidth / 2 - 0.15, 0, leafThickness / 2 + 0.035]}>
          <mesh material={materials.stainlessSteel}>
            <cylinderGeometry args={[0.012, 0.012, 1.2, 16]} />
          </mesh>
          {/* Top & Bottom Stanchions */}
          <mesh position={[0, 0.52, -0.018]} rotation={[Math.PI / 2, 0, 0]} material={materials.stainlessSteel}>
            <cylinderGeometry args={[0.008, 0.008, 0.036, 12]} />
          </mesh>
          <mesh position={[0, -0.52, -0.018]} rotation={[Math.PI / 2, 0, 0]} material={materials.stainlessSteel}>
            <cylinderGeometry args={[0.008, 0.008, 0.036, 12]} />
          </mesh>
        </group>

        {/* Brushed Stainless Steel Pull Handle - Back Face (-Z) */}
        <group position={[leafWidth / 2 - 0.15, 0, -leafThickness / 2 - 0.035]}>
          <mesh material={materials.stainlessSteel}>
            <cylinderGeometry args={[0.012, 0.012, 1.2, 16]} />
          </mesh>
          {/* Top & Bottom Stanchions */}
          <mesh position={[0, 0.52, 0.018]} rotation={[Math.PI / 2, 0, 0]} material={materials.stainlessSteel}>
            <cylinderGeometry args={[0.008, 0.008, 0.036, 12]} />
          </mesh>
          <mesh position={[0, -0.52, 0.018]} rotation={[Math.PI / 2, 0, 0]} material={materials.stainlessSteel}>
            <cylinderGeometry args={[0.008, 0.008, 0.036, 12]} />
          </mesh>
        </group>
      </group>

      {/* 3B. RIGHT LEAF */}
      <group ref={rightLeafRef} position={[leafWidth / 2, height / 2, -0.015]}>
        {/* Sliding Glass Body */}
        <mesh material={materials.glass} renderOrder={5}>
          <boxGeometry args={[leafWidth - 0.01, leafHeight - 0.04, leafThickness]} />
        </mesh>

        {/* Frosted Privacy Band (Y in [1.0, 1.4m] -> local Y = 0) */}
        <mesh position={[0, 0, 0]} material={materials.frostedBand} renderOrder={6}>
          <planeGeometry args={[leafWidth - 0.01, 0.40]} />
        </mesh>

        {/* Opaque White Leading Edge Strip (Meeting edge at local X = -leafWidth/2) */}
        <mesh position={[-leafWidth / 2 + 0.008, 0, 0]} material={materials.whiteEdge}>
          <boxGeometry args={[0.015, leafHeight - 0.04, leafThickness + 0.002]} />
        </mesh>

        {/* Black Bottom Guide Rail */}
        <mesh position={[0, -leafHeight / 2 + 0.025, 0]} material={materials.blackSteel}>
          <boxGeometry args={[leafWidth, 0.05, leafThickness + 0.01]} />
        </mesh>

        {/* Brushed Stainless Steel Pull Handle - Front Face (+Z) */}
        <group position={[-leafWidth / 2 + 0.15, 0, leafThickness / 2 + 0.035]}>
          <mesh material={materials.stainlessSteel}>
            <cylinderGeometry args={[0.012, 0.012, 1.2, 16]} />
          </mesh>
          {/* Top & Bottom Stanchions */}
          <mesh position={[0, 0.52, -0.018]} rotation={[Math.PI / 2, 0, 0]} material={materials.stainlessSteel}>
            <cylinderGeometry args={[0.008, 0.008, 0.036, 12]} />
          </mesh>
          <mesh position={[0, -0.52, -0.018]} rotation={[Math.PI / 2, 0, 0]} material={materials.stainlessSteel}>
            <cylinderGeometry args={[0.008, 0.008, 0.036, 12]} />
          </mesh>
        </group>

        {/* Brushed Stainless Steel Pull Handle - Back Face (-Z) */}
        <group position={[-leafWidth / 2 + 0.15, 0, -leafThickness / 2 - 0.035]}>
          <mesh material={materials.stainlessSteel}>
            <cylinderGeometry args={[0.012, 0.012, 1.2, 16]} />
          </mesh>
          {/* Top & Bottom Stanchions */}
          <mesh position={[0, 0.52, 0.018]} rotation={[Math.PI / 2, 0, 0]} material={materials.stainlessSteel}>
            <cylinderGeometry args={[0.008, 0.008, 0.036, 12]} />
          </mesh>
          <mesh position={[0, -0.52, 0.018]} rotation={[Math.PI / 2, 0, 0]} material={materials.stainlessSteel}>
            <cylinderGeometry args={[0.008, 0.008, 0.036, 12]} />
          </mesh>
        </group>
      </group>
    </group>
  );
}
