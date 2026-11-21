import React, { useMemo } from 'react';
import * as THREE from 'three';
import {
  getGammaInteractiveDisplayTexture,
  getGammaWhiteboardStandTexture,
  getGammaTeachingHeaderTexture,
  getGammaCredenzaLabelTexture,
  getGammaVerticalFlutingTexture,
} from './gammaTextures';
import {
  getWoodGrainTexture,
  getOscilloscopeTexture,
} from '../Beta/betaTextures';

/**
 * Gamma Back Wall (Teaching Wall) — Revision 14
 * Rebuilt strictly to match user-provided reference renders:
 * - 16m wide floor-to-ceiling navy #0B2A5B wall with fine vertical fluting & lighter center section
 * - Light-grey corner columns with black glass mullions (city-night gradient) to left and right
 * - Single unified header block: "A5X INDUSTRIES | LAB GAMMA - Advanced Innovation Lab"
 * - Hexagonal flat-top emissive-blue LED frame (~5.2 x 2.5m) enclosing 3.2 x 1.8m Interactive Display
 * - Slim black soundbar centered under the display
 * - Whiteboard on black tripod stand with checklist & robot arm/gear sketch (1.4 x 1.0m)
 * - Continuous 8.5m Light-Oak Credenza with white laminate top, blue floor glow & tucked teacher chair
 * - Two 2.8 x 2.4m Flanking Showcase Shelves with blue LED top frames, warm shelf LEDs, white 6-axis arm,
 *   drone, robot cars, gold trophies, oscilloscope, and hanging trailing plants
 * - Two tall 1.4m floor plants flanking the shelving units
 */
export function GammaBackWall() {
  const labX = 32.0;
  const cx = labX + 8.0; // 40.0

  // Textures
  const displayTexture = useMemo(() => getGammaInteractiveDisplayTexture(), []);
  const whiteboardTexture = useMemo(() => getGammaWhiteboardStandTexture(), []);
  const headerTexture = useMemo(() => getGammaTeachingHeaderTexture(), []);
  const credenzaLabel = useMemo(() => getGammaCredenzaLabelTexture(), []);
  const flutingTexture = useMemo(() => getGammaVerticalFlutingTexture(), []);
  const woodTexture = useMemo(() => getWoodGrainTexture(), []);
  const scopeTexture = useMemo(() => getOscilloscopeTexture(), []);

  // Shared Materials
  const oakMaterial = useMemo(
    () => new THREE.MeshStandardMaterial({ map: woodTexture, roughness: 0.55, metalness: 0.05 }),
    [woodTexture]
  );
  const whiteLaminateMaterial = useMemo(
    () => new THREE.MeshStandardMaterial({ color: '#F8FAFC', roughness: 0.25 }),
    []
  );
  const blackSteelMaterial = useMemo(
    () => new THREE.MeshStandardMaterial({ color: '#161C24', metalness: 0.85, roughness: 0.28 }),
    []
  );
  const blueLedMaterial = useMemo(
    () => new THREE.MeshStandardMaterial({ color: '#1677FF', emissive: '#1677FF', emissiveIntensity: 3.8 }),
    []
  );
  const warmLedMaterial = useMemo(
    () => new THREE.MeshStandardMaterial({ color: '#FFF8EE', emissive: '#FFD580', emissiveIntensity: 2.5 }),
    []
  );
  const goldMetalMaterial = useMemo(
    () => new THREE.MeshStandardMaterial({ color: '#F59E0B', metalness: 0.95, roughness: 0.15 }),
    []
  );
  const blueRobotMaterial = useMemo(
    () => new THREE.MeshStandardMaterial({ color: '#0284C7', roughness: 0.3 }),
    []
  );
  const yellowPlasticMaterial = useMemo(
    () => new THREE.MeshStandardMaterial({ color: '#FACC15', roughness: 0.35 }),
    []
  );

  return (
    <group name="gamma-back-wall-teaching-rev14">
      {/* ================================================================
          1. WALL FINISH & LIGHTING WASH (Floor-to-Ceiling 3.6m, 16m Wide)
         ================================================================ */}
      {/* Base Full Back Wall: Navy #0B2A5B with subtle vertical fluting (In front of Architecture wall Z=0.10) */}
      <mesh position={[cx, 1.8, 0.12]} receiveShadow>
        <planeGeometry args={[16.0, 3.6]} />
        <meshStandardMaterial
          color="#0B2A5B"
          map={flutingTexture}
          roughness={0.4}
          metalness={0.12}
        />
      </mesh>

      {/* Center Feature Section behind Display: Slightly lighter/brighter navy #0E336D */}
      <mesh position={[cx, 1.8, 0.125]} receiveShadow>
        <planeGeometry args={[7.2, 3.6]} />
        <meshStandardMaterial color="#0E336D" roughness={0.35} metalness={0.15} />
      </mesh>

      {/* Top Wall-Wash: Soft blue-white glow plane under the cove */}
      <mesh position={[cx, 3.42, 0.13]}>
        <planeGeometry args={[15.6, 0.35]} />
        <meshStandardMaterial
          color="#93C5FD"
          emissive="#38BDF8"
          emissiveIntensity={1.8}
          transparent
          opacity={0.35}
        />
      </mesh>
      {/* Continuous White LED Cove Ribbon at Ceiling Junction */}
      <mesh position={[cx, 3.56, 0.135]}>
        <boxGeometry args={[16.0, 0.025, 0.02]} />
        <meshStandardMaterial color="#FFFFFF" emissive="#FFFFFF" emissiveIntensity={3.5} />
      </mesh>

      {/* Corner Wall Pilasters & Black Glass Mullions (City-Night Gradient) */}
      {/* Left Corner Column (X = 32.4) */}
      <mesh position={[labX + 0.45, 1.8, 0.135]} receiveShadow>
        <boxGeometry args={[0.9, 3.6, 0.05]} />
        <meshStandardMaterial color="#CBD5E1" roughness={0.4} />
      </mesh>
      <mesh position={[labX + 0.95, 1.8, 0.14]}>
        <boxGeometry args={[0.08, 3.6, 0.06]} />
        <primitive object={blackSteelMaterial} />
      </mesh>
      {/* Right Corner Column (X = 47.6) */}
      <mesh position={[labX + 15.55, 1.8, 0.135]} receiveShadow>
        <boxGeometry args={[0.9, 3.6, 0.05]} />
        <meshStandardMaterial color="#CBD5E1" roughness={0.4} />
      </mesh>
      <mesh position={[labX + 15.05, 1.8, 0.14]}>
        <boxGeometry args={[0.08, 3.6, 0.06]} />
        <primitive object={blackSteelMaterial} />
      </mesh>

      {/* ================================================================
          2. HEADER: ONE UNIFIED BLOCK (No Overlap, 2.9 to 3.3m High)
          Left: "A5X INDUSTRIES" (white, raised) | Right: "LAB GAMMA" (blue)
          "Advanced Innovation Lab" (white)
         ================================================================ */}
      <group position={[cx, 3.12, 0.145]}>
        <mesh>
          <planeGeometry args={[5.2, 0.85]} />
          <meshBasicMaterial map={headerTexture} transparent toneMapped={false} />
        </mesh>
      </group>

      {/* ================================================================
          3. HEX DISPLAY & SLIM BLACK SOUNDBAR
          Flat-Top Hexagonal Blue Frame (~5.2m wide x 2.5m high)
          Interactive Display 3.2 x 1.8m (Bottom edge at 1.0m)
         ================================================================ */}
      <group position={[cx, 1.90, 0.15]}>
        {/* Soft Blue Glow Plane behind Hex Frame */}
        <mesh position={[0, 0, 0.005]}>
          <planeGeometry args={[4.8, 2.3]} />
          <meshStandardMaterial
            color="#1677FF"
            emissive="#1677FF"
            emissiveIntensity={1.2}
            transparent
            opacity={0.18}
          />
        </mesh>

        {/* Flat-Top Hexagonal Emissive-Blue LED Frame (Tube 25mm) */}
        {/* Top Horizontal Tube (2.4m wide at Y = +0.96m) */}
        <mesh position={[0, 0.96, 0.025]}>
          <boxGeometry args={[2.4, 0.025, 0.025]} />
          <primitive object={blueLedMaterial} />
        </mesh>
        {/* Bottom Horizontal Tube (2.4m wide at Y = -0.96m) */}
        <mesh position={[0, -0.96, 0.025]}>
          <boxGeometry args={[2.4, 0.025, 0.025]} />
          <primitive object={blueLedMaterial} />
        </mesh>

        {/* 4 Angled Diagonal Corner Tubes */}
        {/* Top-Left */}
        <mesh position={[-1.65, 0.48, 0.025]} rotation={[0, 0, 0.47]}>
          <boxGeometry args={[1.32, 0.025, 0.025]} />
          <primitive object={blueLedMaterial} />
        </mesh>
        {/* Bottom-Left */}
        <mesh position={[-1.65, -0.48, 0.025]} rotation={[0, 0, -0.47]}>
          <boxGeometry args={[1.32, 0.025, 0.025]} />
          <primitive object={blueLedMaterial} />
        </mesh>
        {/* Top-Right */}
        <mesh position={[1.65, 0.48, 0.025]} rotation={[0, 0, -0.47]}>
          <boxGeometry args={[1.32, 0.025, 0.025]} />
          <primitive object={blueLedMaterial} />
        </mesh>
        {/* Bottom-Right */}
        <mesh position={[1.65, -0.48, 0.025]} rotation={[0, 0, 0.47]}>
          <boxGeometry args={[1.32, 0.025, 0.025]} />
          <primitive object={blueLedMaterial} />
        </mesh>

        {/* Display Bezel (3.24 x 1.84m) */}
        <mesh position={[0, 0, 0.02]} castShadow>
          <boxGeometry args={[3.24, 1.84, 0.03]} />
          <primitive object={blackSteelMaterial} />
        </mesh>
        {/* Interactive Screen (3.2 x 1.8m, Bottom edge at Y=1.0m) */}
        <mesh position={[0, 0, 0.038]}>
          <planeGeometry args={[3.2, 1.8]} />
          <meshBasicMaterial map={displayTexture} toneMapped={false} />
        </mesh>

        {/* Slim Black Soundbar Centered under Display */}
        <group position={[0, -0.98, 0.045]} castShadow>
          <mesh>
            <boxGeometry args={[1.30, 0.07, 0.06]} />
            <meshStandardMaterial color="#1E293B" metalness={0.7} roughness={0.3} />
          </mesh>
          {/* Small Power LED Indicator */}
          <mesh position={[0, 0, 0.032]}>
            <circleGeometry args={[0.005, 8]} />
            <meshBasicMaterial color="#38BDF8" toneMapped={false} />
          </mesh>
        </group>
      </group>

      {/* ================================================================
          4. WHITEBOARD ON BLACK TRIPOD STAND (Right of Display, X = 42.65)
          Checklist with checkboxes + Robot arm sketch with gear
         ================================================================ */}
      <group position={[cx + 2.65, 0, 0.58]}>
        {/* Whiteboard Surface (1.4 x 1.0m, Center Y = 1.45m) */}
        <mesh position={[0, 1.45, 0.01]} castShadow>
          <boxGeometry args={[1.44, 1.04, 0.025]} />
          <meshStandardMaterial color="#CBD5E1" metalness={0.8} roughness={0.25} />
        </mesh>
        <mesh position={[0, 1.45, 0.025]}>
          <planeGeometry args={[1.40, 1.0]} />
          <meshBasicMaterial map={whiteboardTexture} toneMapped={false} />
        </mesh>

        {/* Marker Tray at bottom of board */}
        <mesh position={[0, 0.93, 0.04]} castShadow>
          <boxGeometry args={[1.2, 0.02, 0.06]} />
          <meshStandardMaterial color="#64748B" metalness={0.8} roughness={0.3} />
        </mesh>

        {/* Black Tripod Stand Legs down to floor */}
        <group position={[0, 0.90, 0]}>
          {/* Left Leg */}
          <mesh position={[-0.45, -0.45, 0]} rotation={[0, 0, 0.12]}>
            <cylinderGeometry args={[0.015, 0.015, 0.95, 8]} />
            <primitive object={blackSteelMaterial} />
          </mesh>
          {/* Right Leg */}
          <mesh position={[0.45, -0.45, 0]} rotation={[0, 0, -0.12]}>
            <cylinderGeometry args={[0.015, 0.015, 0.95, 8]} />
            <primitive object={blackSteelMaterial} />
          </mesh>
          {/* Rear Support Leg */}
          <mesh position={[0, -0.45, -0.20]} rotation={[-0.22, 0, 0]}>
            <cylinderGeometry args={[0.012, 0.012, 0.98, 8]} />
            <primitive object={blackSteelMaterial} />
          </mesh>
        </group>
      </group>

      {/* ================================================================
          5. CREDENZA (TEACHER COUNTER): Long Light-Oak Cabinet Under Display
          Width 8.5m, Depth 0.55m, Height 0.85m, White Laminate Top, Blue Base
         ================================================================ */}
      <group position={[cx, 0, 0.32]}>
        {/* Oak Cabinet Body with Vertical Door Slats */}
        <mesh position={[0, 0.41, 0]} castShadow receiveShadow>
          <boxGeometry args={[8.5, 0.82, 0.55]} />
          <primitive object={oakMaterial} />
        </mesh>

        {/* White Laminate Countertop (40mm thick, Y = 0.85m) */}
        <mesh position={[0, 0.84, 0]} castShadow receiveShadow>
          <boxGeometry args={[8.54, 0.04, 0.58]} />
          <primitive object={whiteLaminateMaterial} />
        </mesh>

        {/* Small Front Label: "Teaching & Learning Zone" */}
        <mesh position={[0, 0.45, 0.28]}>
          <planeGeometry args={[1.6, 0.16]} />
          <meshBasicMaterial map={credenzaLabel} transparent toneMapped={false} />
        </mesh>

        {/* Tiny Round Handles along Credenza Doors */}
        {[-3.6, -2.4, -1.2, 0.0, 1.2, 2.4, 3.6].map((hx, hi) => (
          <mesh key={`handle-${hi}`} position={[hx, 0.48, 0.282]}>
            <cylinderGeometry args={[0.012, 0.012, 0.015, 8]} />
            <meshStandardMaterial color="#CBD5E1" metalness={0.9} />
          </mesh>
        ))}

        {/* Continuous Electric-Blue LED Strip along the floor under the credenza */}
        <mesh position={[0, 0.02, 0.285]}>
          <boxGeometry args={[8.5, 0.035, 0.02]} />
          <primitive object={blueLedMaterial} />
        </mesh>
        {/* Soft Floor Glow Plane */}
        <mesh position={[0, 0.005, 0.48]} rotation={[-Math.PI / 2, 0, 0]}>
          <planeGeometry args={[8.6, 0.55]} />
          <meshStandardMaterial
            color="#1677FF"
            emissive="#1677FF"
            emissiveIntensity={2.5}
            transparent
            opacity={0.45}
          />
        </mesh>

        {/* Credenza Top Props (Left of Center, X = -1.4) */}
        {/* Modern Laptop */}
        <group position={[-1.4, 0.86, 0.05]}>
          <mesh castShadow>
            <boxGeometry args={[0.32, 0.012, 0.22]} />
            <meshStandardMaterial color="#94A3B8" metalness={0.9} roughness={0.2} />
          </mesh>
          <mesh position={[0, 0.11, -0.10]} rotation={[0.26, 0, 0]} castShadow>
            <boxGeometry args={[0.32, 0.20, 0.008]} />
            <meshStandardMaterial color="#0F172A" />
          </mesh>
          <mesh position={[0, 0.11, -0.095]} rotation={[0.26, 0, 0]}>
            <planeGeometry args={[0.30, 0.18]} />
            <meshBasicMaterial color="#38BDF8" toneMapped={false} />
          </mesh>
        </group>

        {/* Pen Cup */}
        <mesh position={[-0.8, 0.91, 0.05]} castShadow>
          <cylinderGeometry args={[0.045, 0.04, 0.10, 10]} />
          <meshStandardMaterial color="#1E293B" />
        </mesh>

        {/* Medium Potted Plant on Credenza */}
        <group position={[-0.4, 0.86, 0.05]}>
          <mesh position={[0, 0.06, 0]} castShadow>
            <cylinderGeometry args={[0.07, 0.055, 0.12, 10]} />
            <meshStandardMaterial color="#F8FAFC" roughness={0.3} />
          </mesh>
          <mesh position={[0, 0.16, 0]} castShadow>
            <sphereGeometry args={[0.11, 8, 8]} />
            <meshStandardMaterial color="#16A34A" roughness={0.6} />
          </mesh>
        </group>

        {/* Teacher Chair Tucked at Left End Knee Space (X = -3.6, Z = 0.2) */}
        <group position={[-3.6, 0, 0.15]}>
          <mesh position={[0, 0.46, 0]} castShadow>
            <boxGeometry args={[0.48, 0.06, 0.44]} />
            <meshStandardMaterial color="#0F172A" roughness={0.7} />
          </mesh>
          <mesh position={[0, 0.78, 0.19]} rotation={[-0.1, 0, 0]} castShadow>
            <boxGeometry args={[0.46, 0.54, 0.035]} />
            <primitive object={blackSteelMaterial} />
          </mesh>
          <mesh position={[0, 0.23, 0]}>
            <cylinderGeometry args={[0.03, 0.03, 0.42, 8]} />
            <primitive object={blackSteelMaterial} />
          </mesh>
          <mesh position={[0, 0.05, 0]}>
            <cylinderGeometry args={[0.26, 0.26, 0.03, 5]} />
            <primitive object={blackSteelMaterial} />
          </mesh>
        </group>
      </group>

      {/* ================================================================
          6. FLANKING SHOWCASE SHELVES (TWO UNITS, 2.8m Wide x 2.4m High)
          LEFT: X = 33.2 to 36.0 | RIGHT: X = 44.0 to 46.8
         ================================================================ */}
      {/* 6A. LEFT SHELVING UNIT (Centered at X = 34.6) */}
      <group position={[labX + 2.6, 0, 0.28]}>
        {/* 4 Oak Shelf Levels with Warm LED Strips */}
        {[0.25, 0.85, 1.45, 2.05].map((sy, i) => (
          <group key={`l-shelf-${i}`}>
            <mesh position={[0, sy, 0]} castShadow receiveShadow>
              <boxGeometry args={[2.7, 0.035, 0.48]} />
              <primitive object={oakMaterial} />
            </mesh>
            <mesh position={[0, sy - 0.02, 0]}>
              <boxGeometry args={[2.6, 0.012, 0.44]} />
              <primitive object={warmLedMaterial} />
            </mesh>
          </group>
        ))}

        {/* Steel Uprights (Black 35mm) */}
        {[-1.3, 0, 1.3].map((ux, ui) => (
          <group key={`l-upright-${ui}`} position={[ux, 1.2, 0]}>
            <mesh position={[0, 0, -0.22]} castShadow>
              <boxGeometry args={[0.035, 2.4, 0.035]} />
              <primitive object={blackSteelMaterial} />
            </mesh>
            <mesh position={[0, 0, 0.22]} castShadow>
              <boxGeometry args={[0.035, 2.4, 0.035]} />
              <primitive object={blackSteelMaterial} />
            </mesh>
          </group>
        ))}

        {/* Blue LED Rectangular Frame on Top of Unit */}
        <mesh position={[0, 2.41, 0]}>
          <boxGeometry args={[2.72, 0.025, 0.50]} />
          <primitive object={blueLedMaterial} />
        </mesh>

        {/* Hanging Trailing Plants from Top Corners */}
        {[-1.3, 1.3].map((hx, hi) => (
          <group key={`l-trail-${hi}`} position={[hx, 2.40, 0.2]}>
            <mesh position={[0, 0.05, 0]}>
              <cylinderGeometry args={[0.08, 0.06, 0.12, 8]} />
              <meshStandardMaterial color="#F8FAFC" />
            </mesh>
            {/* Trailing green leaves */}
            {[0, 1, 2].map((li) => (
              <mesh key={`leaf-${li}`} position={[0, -0.18 - li * 0.12, 0.04]} rotation={[0.1, 0, 0]}>
                <planeGeometry args={[0.08, 0.22]} />
                <meshStandardMaterial color="#15803D" roughness={0.6} side={2} />
              </mesh>
            ))}
          </group>
        ))}

        {/* LEFT SHELF PROPS (Per Reference Specification): */}
        {/* Level 1 (Y = 0.25): 3 Potted Plants */}
        {[-0.8, 0, 0.8].map((px, pi) => (
          <group key={`l-plant-lvl1-${pi}`} position={[px, 0.38, 0]}>
            <mesh castShadow>
              <cylinderGeometry args={[0.09, 0.07, 0.14, 10]} />
              <meshStandardMaterial color="#F8FAFC" />
            </mesh>
            <mesh position={[0, 0.10, 0]}>
              <sphereGeometry args={[0.13, 8, 8]} />
              <meshStandardMaterial color={pi % 2 === 0 ? '#15803D' : '#16A34A'} roughness={0.6} />
            </mesh>
          </group>
        ))}

        {/* Level 2 (Y = 0.85): White 6-Axis Robot Arm + Small Robot Car */}
        {/* White 6-Axis Articulated Robot Arm */}
        <group position={[-0.55, 0.88, 0]}>
          <mesh position={[0, 0.02, 0]} castShadow>
            <cylinderGeometry args={[0.10, 0.12, 0.04, 12]} />
            <meshStandardMaterial color="#F8FAFC" roughness={0.25} />
          </mesh>
          <mesh position={[0, 0.14, 0]} rotation={[0, 0, 0.3]} castShadow>
            <boxGeometry args={[0.05, 0.22, 0.05]} />
            <meshStandardMaterial color="#F8FAFC" roughness={0.25} />
          </mesh>
          <mesh position={[0.06, 0.30, 0]} rotation={[0, 0, -0.5]} castShadow>
            <boxGeometry args={[0.04, 0.20, 0.04]} />
            <meshStandardMaterial color="#F8FAFC" roughness={0.25} />
          </mesh>
          <mesh position={[0.14, 0.38, 0]}>
            <boxGeometry args={[0.045, 0.045, 0.045]} />
            <meshStandardMaterial color="#1E293B" />
          </mesh>
        </group>
        {/* Small Robot Car */}
        <group position={[0.65, 0.93, 0]}>
          <mesh castShadow>
            <boxGeometry args={[0.30, 0.07, 0.22]} />
            <primitive object={blueRobotMaterial} />
          </mesh>
          {[-0.14, 0.14].map((wx, wi) => (
            <mesh key={`l2-w-${wi}`} position={[wx, 0, 0]} rotation={[Math.PI / 2, 0, 0]}>
              <cylinderGeometry args={[0.04, 0.04, 0.03, 10]} />
              <primitive object={yellowPlasticMaterial} />
            </mesh>
          ))}
        </group>

        {/* Level 3 (Y = 1.45): Racing Drone + Robot Car with Yellow Wheels */}
        {/* Racing Drone */}
        <group position={[-0.6, 1.54, 0]}>
          <mesh castShadow>
            <boxGeometry args={[0.10, 0.04, 0.10]} />
            <primitive object={blackSteelMaterial} />
          </mesh>
          <mesh rotation={[0, Math.PI / 4, 0]}>
            <boxGeometry args={[0.34, 0.012, 0.015]} />
            <meshStandardMaterial color="#1E293B" metalness={0.8} />
          </mesh>
          <mesh rotation={[0, -Math.PI / 4, 0]}>
            <boxGeometry args={[0.34, 0.012, 0.015]} />
            <meshStandardMaterial color="#1E293B" metalness={0.8} />
          </mesh>
        </group>
        {/* Robot Car with Yellow Wheels */}
        <group position={[0.6, 1.54, 0]}>
          <mesh castShadow>
            <boxGeometry args={[0.32, 0.08, 0.24]} />
            <primitive object={blackSteelMaterial} />
          </mesh>
          {[-0.15, 0.15].map((wx, wi) => (
            <mesh key={`l3-w-${wi}`} position={[wx, 0, 0]} rotation={[Math.PI / 2, 0, 0]}>
              <cylinderGeometry args={[0.045, 0.045, 0.035, 10]} />
              <primitive object={yellowPlasticMaterial} />
            </mesh>
          ))}
        </group>

        {/* Level 4 (Y = 2.05): Two Robot Cars + Small Chassis */}
        {[-0.8, 0.0, 0.8].map((cx, ci) => (
          <group key={`l4-car-${ci}`} position={[cx, 2.14, 0]}>
            <mesh castShadow>
              <boxGeometry args={[0.26, 0.065, 0.20]} />
              <meshStandardMaterial color={ci === 1 ? '#0F172A' : '#0284C7'} roughness={0.3} />
            </mesh>
            {[-0.12, 0.12].map((wx, wi) => (
              <mesh key={`l4-w-${wi}`} position={[wx, 0, 0]} rotation={[Math.PI / 2, 0, 0]}>
                <cylinderGeometry args={[0.038, 0.038, 0.03, 10]} />
                <primitive object={yellowPlasticMaterial} />
              </mesh>
            ))}
          </group>
        ))}
      </group>

      {/* 6B. RIGHT SHELVING UNIT (Centered at X = 45.0, shortened to 2.0m for Design & Print corner clearance) */}
      <group position={[labX + 13.0, 0, 0.28]}>
        {/* 4 Oak Shelf Levels */}
        {[0.25, 0.85, 1.45, 2.05].map((sy, i) => (
          <group key={`r-shelf-${i}`}>
            <mesh position={[0, sy, 0]} castShadow receiveShadow>
              <boxGeometry args={[1.96, 0.035, 0.48]} />
              <primitive object={oakMaterial} />
            </mesh>
            <mesh position={[0, sy - 0.02, 0]}>
              <boxGeometry args={[1.90, 0.012, 0.44]} />
              <primitive object={warmLedMaterial} />
            </mesh>
          </group>
        ))}

        {/* Steel Uprights */}
        {[-0.95, 0.95].map((ux, ui) => (
          <group key={`r-upright-${ui}`} position={[ux, 1.2, 0]}>
            <mesh position={[0, 0, -0.22]} castShadow>
              <boxGeometry args={[0.035, 2.4, 0.035]} />
              <primitive object={blackSteelMaterial} />
            </mesh>
            <mesh position={[0, 0, 0.22]} castShadow>
              <boxGeometry args={[0.035, 2.4, 0.035]} />
              <primitive object={blackSteelMaterial} />
            </mesh>
          </group>
        ))}

        {/* Blue LED Rectangular Frame on Top of Unit */}
        <mesh position={[0, 2.41, 0]}>
          <boxGeometry args={[1.98, 0.025, 0.50]} />
          <primitive object={blueLedMaterial} />
        </mesh>

        {/* Hanging Trailing Plants from Top Corners */}
        {[-0.95, 0.95].map((hx, hi) => (
          <group key={`r-trail-${hi}`} position={[hx, 2.40, 0.2]}>
            <mesh position={[0, 0.05, 0]}>
              <cylinderGeometry args={[0.08, 0.06, 0.12, 8]} />
              <meshStandardMaterial color="#F8FAFC" />
            </mesh>
            {[0, 1, 2].map((li) => (
              <mesh key={`r-leaf-${li}`} position={[0, -0.18 - li * 0.12, 0.04]} rotation={[0.1, 0, 0]}>
                <planeGeometry args={[0.08, 0.22]} />
                <meshStandardMaterial color="#15803D" roughness={0.6} side={2} />
              </mesh>
            ))}
          </group>
        ))}

        {/* RIGHT SHELF PROPS (Per Reference Specification): */}
        {/* Level 1 (Y = 0.25): Plants + Small Framed Blue Box / Electronics Module */}
        <group position={[-0.45, 0.38, 0]}>
          <mesh castShadow>
            <cylinderGeometry args={[0.09, 0.07, 0.14, 10]} />
            <meshStandardMaterial color="#F8FAFC" />
          </mesh>
          <mesh position={[0, 0.10, 0]}>
            <sphereGeometry args={[0.13, 8, 8]} />
            <meshStandardMaterial color="#16A34A" roughness={0.6} />
          </mesh>
        </group>
        <mesh position={[0.45, 0.34, 0]} castShadow>
          <boxGeometry args={[0.34, 0.14, 0.22]} />
          <meshStandardMaterial color="#0284C7" metalness={0.5} roughness={0.3} />
        </mesh>

        {/* Level 2 (Y = 0.85): Two Gold Trophies on Dark Marble Pedestals */}
        {[-0.45, 0.45].map((tx, ti) => (
          <group key={`r-trophy-${ti}`} position={[tx, 0.98, 0]}>
            {/* Marble Base */}
            <mesh position={[0, -0.05, 0]} castShadow>
              <boxGeometry args={[0.16, 0.10, 0.16]} />
              <meshStandardMaterial color="#0F172A" roughness={0.2} />
            </mesh>
            {/* Golden Cup */}
            <mesh position={[0, 0.10, 0]} castShadow>
              <cylinderGeometry args={[0.07, 0.035, 0.18, 12]} />
              <primitive object={goldMetalMaterial} />
            </mesh>
            {/* Handles */}
            <mesh position={[-0.08, 0.11, 0]}>
              <torusGeometry args={[0.035, 0.009, 8, 12]} />
              <primitive object={goldMetalMaterial} />
            </mesh>
            <mesh position={[0.08, 0.11, 0]}>
              <torusGeometry args={[0.035, 0.009, 8, 12]} />
              <primitive object={goldMetalMaterial} />
            </mesh>
          </group>
        ))}

        {/* Level 3 (Y = 1.45): Robot Car + Potted Plant */}
        <group position={[-0.45, 1.54, 0]}>
          <mesh castShadow>
            <boxGeometry args={[0.30, 0.075, 0.22]} />
            <primitive object={blueRobotMaterial} />
          </mesh>
          {[-0.14, 0.14].map((wx, wi) => (
            <mesh key={`r3-w-${wi}`} position={[wx, 0, 0]} rotation={[Math.PI / 2, 0, 0]}>
              <cylinderGeometry args={[0.04, 0.04, 0.03, 10]} />
              <primitive object={yellowPlasticMaterial} />
            </mesh>
          ))}
        </group>
        <group position={[0.45, 1.56, 0]}>
          <mesh castShadow>
            <cylinderGeometry args={[0.08, 0.06, 0.12, 10]} />
            <meshStandardMaterial color="#F8FAFC" />
          </mesh>
          <mesh position={[0, 0.09, 0]}>
            <sphereGeometry args={[0.12, 8, 8]} />
            <meshStandardMaterial color="#15803D" roughness={0.6} />
          </mesh>
        </group>

        {/* Level 4 (Y = 2.05): Bench Oscilloscope with Waveform + Plant */}
        <mesh position={[-0.45, 2.20, 0]} castShadow>
          <boxGeometry args={[0.38, 0.20, 0.22]} />
          <meshStandardMaterial map={scopeTexture} roughness={0.3} />
        </mesh>
        <group position={[0.45, 2.16, 0]}>
          <mesh castShadow>
            <cylinderGeometry args={[0.08, 0.06, 0.12, 10]} />
            <meshStandardMaterial color="#F8FAFC" />
          </mesh>
          <mesh position={[0, 0.09, 0]}>
            <sphereGeometry args={[0.12, 8, 8]} />
            <meshStandardMaterial color="#16A34A" roughness={0.6} />
          </mesh>
        </group>
      </group>

      {/* ================================================================
          7. TWO TALL FLOOR PLANTS FLANKING THE SHELVING UNITS (1.4m High)
         ================================================================ */}
      {/* Left Floor Plant (X = 32.7, beside left shelf) */}
      <group position={[labX + 0.8, 0, 0.45]}>
        <mesh position={[0, 0.28, 0]} castShadow>
          <cylinderGeometry args={[0.18, 0.14, 0.56, 12]} />
          <meshStandardMaterial color="#F8FAFC" roughness={0.25} />
        </mesh>
        {/* Palm Fronds / Leaves reaching 1.4m */}
        <mesh position={[0, 0.75, 0]} castShadow>
          <sphereGeometry args={[0.32, 10, 10]} />
          <meshStandardMaterial color="#15803D" roughness={0.6} />
        </mesh>
        <mesh position={[0, 1.10, 0]} castShadow>
          <sphereGeometry args={[0.26, 8, 8]} />
          <meshStandardMaterial color="#16A34A" roughness={0.6} />
        </mesh>
      </group>

      {/* Right Floor Plant (X = 47.3, beside right shelf) */}
      <group position={[labX + 15.2, 0, 0.45]}>
        <mesh position={[0, 0.28, 0]} castShadow>
          <cylinderGeometry args={[0.18, 0.14, 0.56, 12]} />
          <meshStandardMaterial color="#F8FAFC" roughness={0.25} />
        </mesh>
        <mesh position={[0, 0.75, 0]} castShadow>
          <sphereGeometry args={[0.32, 10, 10]} />
          <meshStandardMaterial color="#15803D" roughness={0.6} />
        </mesh>
        <mesh position={[0, 1.10, 0]} castShadow>
          <sphereGeometry args={[0.26, 8, 8]} />
          <meshStandardMaterial color="#16A34A" roughness={0.6} />
        </mesh>
      </group>
    </group>
  );
}
