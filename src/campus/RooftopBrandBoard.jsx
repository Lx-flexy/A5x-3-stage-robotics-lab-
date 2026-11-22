import React, { useRef, useMemo } from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';
import { useStore } from '../store/useStore';
import { CAMPUS_CONFIG } from '../data/config';
import { getRooftopBrandBoardTexture } from './exteriorTextures';

/**
 * Big Rooftop Brand Board (Revision 19)
 * Positioned exactly at horizontal centre (totalWidth / 2 = 30m),
 * set back 0.6m from front parapet (Z = 11.4m), 14m wide x 3.2m high x 0.4m deep,
 * standing 0.8m above roof on black-steel truss base with diagonal braces.
 * Features A5X INDUSTRIES | ROBOTICS LAB branding, gentle LED edge shimmer (6s cycle),
 * dual top floodlight bars, aviation beacon dots, solid rear frame & catwalk.
 */
export function RooftopBrandBoard() {
  const activeLabId = useStore((state) => state.activeLabId);
  const viewMode = useStore((state) => state.viewMode);

  // Dynamic horizontal centre from config (do not hard-code)
  const totalWidth = CAMPUS_CONFIG.totalWidth || 60;
  const xCenter = totalWidth / 2;
  const roofY = 4.4;
  const boardHeight = 3.2;
  const boardWidth = 14.0;
  const boardDepth = 0.4;
  const baseElevation = 0.8;
  const zPosition = 12.0 - 0.6; // 11.4m (set back 0.6m from front parapet)
  const boardCenterY = roofY + baseElevation + boardHeight / 2; // 4.4 + 0.8 + 1.6 = 6.8m

  // Only render when outside or in overview modes
  const isVisible =
    viewMode !== 'firstPerson' ||
    activeLabId === 'exterior';

  const ledEdgeMatRef = useRef();

  // Shared Materials
  const materials = useMemo(() => {
    // 1. Structural Black Steel for Truss Base & Frame
    const blackSteel = new THREE.MeshStandardMaterial({
      color: new THREE.Color('#1B1F27'),
      roughness: 0.4,
      metalness: 0.85
    });

    // 2. Stainless Steel Footing Plates & Bolted Flanges
    const stainlessSteel = new THREE.MeshStandardMaterial({
      color: new THREE.Color('#D1D5DB'),
      roughness: 0.2,
      metalness: 0.95
    });

    // 3. Navy Structural Board Backing (#071B3A)
    const navyBacking = new THREE.MeshStandardMaterial({
      color: new THREE.Color('#071B3A'),
      roughness: 0.45,
      metalness: 0.15
    });

    // 4. Electric Blue LED Edge Shimmer Material
    const ledEdgeMat = new THREE.MeshStandardMaterial({
      color: new THREE.Color('#1677FF'),
      emissive: new THREE.Color('#1677FF'),
      emissiveIntensity: 2.2,
      roughness: 0.2
    });

    // 5. Red Aviation Beacon Dots (Static high-visibility safety markers)
    const aviationBeacon = new THREE.MeshStandardMaterial({
      color: new THREE.Color('#EF4444'),
      emissive: new THREE.Color('#EF4444'),
      emissiveIntensity: 3.0,
      roughness: 0.1
    });

    // 6. Top Floodlight Emissive Fixtures
    const floodlightLens = new THREE.MeshStandardMaterial({
      color: new THREE.Color('#E0F2FE'),
      emissive: new THREE.Color('#BAE6FD'),
      emissiveIntensity: 2.5,
      roughness: 0.2
    });

    // 7. Roof Membrane Surface
    const roofMembrane = new THREE.MeshStandardMaterial({
      color: new THREE.Color('#D8DFE8'),
      roughness: 0.75,
      metalness: 0.05
    });

    // 8. Front Roof Parapet Wall (0.6m high)
    const parapetWall = new THREE.MeshStandardMaterial({
      color: new THREE.Color('#F1F5F9'),
      roughness: 0.6,
      metalness: 0.05
    });

    return {
      blackSteel,
      stainlessSteel,
      navyBacking,
      ledEdgeMat,
      aviationBeacon,
      floodlightLens,
      roofMembrane,
      parapetWall
    };
  }, []);

  // Board Face Canvas Texture
  const boardFaceTex = useMemo(() => getRooftopBrandBoardTexture(), []);

  // Gentle 6s LED edge shimmer pulse
  useFrame(({ clock }) => {
    if (ledEdgeMatRef.current) {
      // 6 second sine cycle
      const t = clock.getElapsedTime();
      const pulse = Math.sin(t * (Math.PI * 2 / 6.0));
      // Modulate emissive intensity smoothly between 1.8 and 2.5
      ledEdgeMatRef.current.emissiveIntensity = 2.15 + pulse * 0.35;
    }
  });

  if (!isVisible) return null;

  // Truss leg X offsets from center (14m width -> half width 7m)
  const legOffsets = [-5.5, -2.0, 2.0, 5.5];

  return (
    <group name="a5x-rooftop-brand-board">
      {/* =========================================================================
          1. SOLID ROOF SURFACE & 0.6m FRONT PARAPET
         ========================================================================= */}
      {/* Light-Grey Roof Membrane Slab spanning entire campus roof */}
      <mesh position={[xCenter, roofY, 6.0]} material={materials.roofMembrane}>
        <boxGeometry args={[totalWidth, 0.08, 12.0]} />
      </mesh>

      {/* Front Roof Parapet Wall (Height 0.6m, Y in [4.4, 5.0m], Z = 12.0m) */}
      <mesh position={[xCenter, roofY + 0.3, 12.0]} material={materials.parapetWall}>
        <boxGeometry args={[totalWidth, 0.6, 0.25]} />
      </mesh>
      {/* Parapet Coping Trim */}
      <mesh position={[xCenter, roofY + 0.62, 12.0]} material={materials.blackSteel}>
        <boxGeometry args={[totalWidth + 0.1, 0.04, 0.3]} />
      </mesh>

      {/* =========================================================================
          2. FREE-STANDING STEEL TRUSS BASE (Stands 0.8m above roof)
         ========================================================================= */}
      <group position={[xCenter, 0, zPosition]}>
        {/* 4 Vertical Structural Heavy Steel Legs */}
        {legOffsets.map((ox, i) => (
          <group key={`truss-leg-${i}`} position={[ox, roofY, 0]}>
            {/* Stainless Steel Footing Baseplate */}
            <mesh position={[0, 0.02, 0]} material={materials.stainlessSteel}>
              <boxGeometry args={[0.5, 0.04, 0.5]} />
            </mesh>
            {/* 4 Hex Mounting Bolts */}
            {[-0.18, 0.18].map((bx) =>
              [-0.18, 0.18].map((bz) => (
                <mesh key={`bolt-${bx}-${bz}`} position={[bx, 0.05, bz]} material={materials.stainlessSteel}>
                  <cylinderGeometry args={[0.02, 0.02, 0.03, 6]} />
                </mesh>
              ))
            )}
            {/* Vertical Steel Column (0.8m height) */}
            <mesh position={[0, baseElevation / 2, 0]} material={materials.blackSteel}>
              <boxGeometry args={[0.16, baseElevation, 0.16]} />
            </mesh>
            {/* Top Connector Flange */}
            <mesh position={[0, baseElevation, 0]} material={materials.stainlessSteel}>
              <boxGeometry args={[0.3, 0.04, 0.3]} />
            </mesh>
          </group>
        ))}

        {/* Diagonal Cross-Bracing Struts between legs */}
        {/* Left Bay Cross-Braces (between leg 0 [-5.5] and leg 1 [-2.0], span 3.5m) */}
        <mesh position={[-3.75, roofY + baseElevation / 2, 0]} rotation={[0, 0, 0.23]} material={materials.blackSteel}>
          <boxGeometry args={[3.6, 0.08, 0.06]} />
        </mesh>
        <mesh position={[-3.75, roofY + baseElevation / 2, 0]} rotation={[0, 0, -0.23]} material={materials.blackSteel}>
          <boxGeometry args={[3.6, 0.08, 0.06]} />
        </mesh>

        {/* Right Bay Cross-Braces (between leg 2 [2.0] and leg 3 [5.5], span 3.5m) */}
        <mesh position={[3.75, roofY + baseElevation / 2, 0]} rotation={[0, 0, 0.23]} material={materials.blackSteel}>
          <boxGeometry args={[3.6, 0.08, 0.06]} />
        </mesh>
        <mesh position={[3.75, roofY + baseElevation / 2, 0]} rotation={[0, 0, -0.23]} material={materials.blackSteel}>
          <boxGeometry args={[3.6, 0.08, 0.06]} />
        </mesh>

        {/* Central Horizontal Tie Beam */}
        <mesh position={[0, roofY + baseElevation, 0]} material={materials.blackSteel}>
          <boxGeometry args={[boardWidth, 0.12, 0.2]} />
        </mesh>

        {/* =======================================================================
            3. MAIN BRAND SIGNBOARD ENCLOSURE (14m wide x 3.2m high x 0.4m deep)
           ======================================================================= */}
        <group position={[0, boardCenterY, 0]}>
          {/* Main Navy Box Housing */}
          <mesh material={materials.navyBacking}>
            <boxGeometry args={[boardWidth, boardHeight, boardDepth]} />
          </mesh>

          {/* Brushed Stainless Steel Outer Frame Trim */}
          {/* Top/Bottom rails */}
          <mesh position={[0, boardHeight / 2, 0]} material={materials.stainlessSteel}>
            <boxGeometry args={[boardWidth + 0.08, 0.08, boardDepth + 0.04]} />
          </mesh>
          <mesh position={[0, -boardHeight / 2, 0]} material={materials.stainlessSteel}>
            <boxGeometry args={[boardWidth + 0.08, 0.08, boardDepth + 0.04]} />
          </mesh>
          {/* Left/Right end caps */}
          <mesh position={[-boardWidth / 2, 0, 0]} material={materials.stainlessSteel}>
            <boxGeometry args={[0.08, boardHeight, boardDepth + 0.04]} />
          </mesh>
          <mesh position={[boardWidth / 2, 0, 0]} material={materials.stainlessSteel}>
            <boxGeometry args={[0.08, boardHeight, boardDepth + 0.04]} />
          </mesh>

          {/* Front Face Sign Plane with High-Res Brand Graphics (Z = +0.205m) */}
          <mesh position={[0, 0, boardDepth / 2 + 0.005]}>
            <planeGeometry args={[boardWidth - 0.1, boardHeight - 0.1]} />
            <meshBasicMaterial map={boardFaceTex} toneMapped={false} />
          </mesh>

          {/* Glowing Electric-Blue LED Border Runner (Animated Shimmer Ref) */}
          <group position={[0, 0, boardDepth / 2 + 0.01]}>
            {/* Top runner */}
            <mesh ref={ledEdgeMatRef} position={[0, boardHeight / 2 - 0.04, 0]} material={materials.ledEdgeMat}>
              <boxGeometry args={[boardWidth - 0.12, 0.03, 0.01]} />
            </mesh>
            {/* Bottom runner */}
            <mesh position={[0, -boardHeight / 2 + 0.04, 0]} material={materials.ledEdgeMat}>
              <boxGeometry args={[boardWidth - 0.12, 0.03, 0.01]} />
            </mesh>
            {/* Left runner */}
            <mesh position={[-boardWidth / 2 + 0.04, 0, 0]} material={materials.ledEdgeMat}>
              <boxGeometry args={[0.03, boardHeight - 0.12, 0.01]} />
            </mesh>
            {/* Right runner */}
            <mesh position={[boardWidth / 2 - 0.04, 0, 0]} material={materials.ledEdgeMat}>
              <boxGeometry args={[0.03, boardHeight - 0.12, 0.01]} />
            </mesh>
          </group>

          {/* Top Overhang Floodlight Fixtures (2 units shining downward) */}
          {[-3.5, 3.5].map((fx) => (
            <group key={`floodlight-${fx}`} position={[fx, boardHeight / 2 + 0.35, boardDepth / 2 + 0.45]}>
              {/* Angled Support Brackets */}
              <mesh position={[0, -0.15, -0.22]} rotation={[0.45, 0, 0]} material={materials.blackSteel}>
                <boxGeometry args={[0.06, 0.45, 0.06]} />
              </mesh>
              {/* Fixture Housing */}
              <mesh material={materials.blackSteel}>
                <boxGeometry args={[1.8, 0.12, 0.25]} />
              </mesh>
              {/* Downward Emissive Lens */}
              <mesh position={[0, -0.06, 0]} material={materials.floodlightLens}>
                <boxGeometry args={[1.7, 0.01, 0.2]} />
              </mesh>
            </group>
          ))}

          {/* Aviation Safety Beacon Dots (Static Red LED on outer corners) */}
          <group position={[-boardWidth / 2 + 0.15, boardHeight / 2 + 0.18, 0]}>
            <mesh material={materials.blackSteel}>
              <cylinderGeometry args={[0.04, 0.05, 0.15, 8]} />
            </mesh>
            <mesh position={[0, 0.1, 0]} material={materials.aviationBeacon}>
              <sphereGeometry args={[0.05, 12, 12]} />
            </mesh>
          </group>
          <group position={[boardWidth / 2 - 0.15, boardHeight / 2 + 0.18, 0]}>
            <mesh material={materials.blackSteel}>
              <cylinderGeometry args={[0.04, 0.05, 0.15, 8]} />
            </mesh>
            <mesh position={[0, 0.1, 0]} material={materials.aviationBeacon}>
              <sphereGeometry args={[0.05, 12, 12]} />
            </mesh>
          </group>

          {/* Rear Maintenance Catwalk & Safety Handrails */}
          <group position={[0, -boardHeight / 2 + 0.1, -boardDepth / 2 - 0.3]}>
            {/* Catwalk Floor Grating */}
            <mesh material={materials.blackSteel}>
              <boxGeometry args={[boardWidth - 0.4, 0.05, 0.6]} />
            </mesh>
            {/* Safety Handrail Along Rear */}
            <mesh position={[0, 0.5, -0.28]} material={materials.stainlessSteel}>
              <boxGeometry args={[boardWidth - 0.4, 0.04, 0.04]} />
            </mesh>
            {/* Handrail Uprights */}
            {[-5.0, -2.5, 0, 2.5, 5.0].map((ux) => (
              <mesh key={`upright-${ux}`} position={[ux, 0.25, -0.28]} material={materials.stainlessSteel}>
                <cylinderGeometry args={[0.018, 0.018, 0.5, 8]} />
              </mesh>
            ))}
          </group>
        </group>
      </group>
    </group>
  );
}
