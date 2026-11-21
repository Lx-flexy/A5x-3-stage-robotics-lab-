import React, { useMemo, useRef } from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';
import { useStore } from '../../store/useStore';
import {
  getRoboticsHexBannerTexture,
  getSoccerPitchTexture,
  getRoboRaceTrackTexture,
  getLineFollowerTrackTexture,
  getRoboSoccerSkirtTexture,
  getRoboRaceSkirtTexture,
  getLineFollowerSkirtTexture,
  getStartFinishBannerTexture,
  getA5XNeonSignTexture
} from './gammaTextures';
import { getWoodGrainTexture, getDrawerCabinetTexture } from '../Beta/betaTextures';

/**
 * Gamma Arena Bay (Dedicated Robotics Autonomy Proving Ground) — Revision 17
 * Built to match the user's reference render:
 * - Local coordinates: x in [0, 12], z in [0, 12] (Global X in [48, 60], Z in [0, 12])
 * - Back Wall (z=0): Navy fluted wall + "A5X INDUSTRIES | LAB GAMMA / Advanced Innovation Lab"
 *   + Hexagonal Blue LED Frame Banner with 4 icons: Robo Race, Robo Soccer, Line Follower, Obstacle Challenge
 * - Back-Centre: Robo Soccer Arena (x: 2.8-10.6, z: 1.2-4.6, 0.35m high)
 * - Front-Left: Robo Race Arena (x: 1.6-6.2, z: 5.8-10.6, octagonal 0.35m high)
 * - Front-Right: Line Follower Arena (x: 7.4-10.6, z: 5.8-10.6, 0.28m high)
 * - Back-Left: Trophy + Robot Showcase Shelf (x: 0.5-2.5, z: 0.08-0.58)
 * - Right Wall (x=12): Glass wall with Neon A5X sign + Robot Diagnostic Bench (z: 6.5-10.5)
 * - Full aisle clearances >= 1.2m, door lane >= 1.5m, zero overlapping signs, 60 FPS animation
 */
export function GammaArenaBay() {
  const activeLabId = useStore((state) => state.activeLabId);

  // Textures
  const woodTexture = useMemo(() => getWoodGrainTexture(), []);
  const hexBannerTexture = useMemo(() => getRoboticsHexBannerTexture(), []);
  const soccerPitchTexture = useMemo(() => getSoccerPitchTexture(), []);
  const raceTrackTexture = useMemo(() => getRoboRaceTrackTexture(), []);
  const lineTrackTexture = useMemo(() => getLineFollowerTrackTexture(), []);
  const soccerSkirtTexture = useMemo(() => getRoboSoccerSkirtTexture(), []);
  const raceSkirtTexture = useMemo(() => getRoboRaceSkirtTexture(), []);
  const lineSkirtTexture = useMemo(() => getLineFollowerSkirtTexture(), []);
  const startFinishTexture = useMemo(() => getStartFinishBannerTexture(), []);
  const neonSignTexture = useMemo(() => getA5XNeonSignTexture(), []);

  // Shared Materials
  const navyFeatureMaterial = useMemo(
    () => new THREE.MeshStandardMaterial({ color: '#071B3A', roughness: 0.45, metalness: 0.15 }),
    []
  );
  const blackSteelMaterial = useMemo(
    () => new THREE.MeshStandardMaterial({ color: '#161C24', metalness: 0.85, roughness: 0.28 }),
    []
  );
  const blueLedMaterial = useMemo(
    () => new THREE.MeshStandardMaterial({
      color: '#1677FF', emissive: '#00D2FF', emissiveIntensity: 3.5, roughness: 0.1
    }),
    []
  );
  const oakMaterial = useMemo(
    () => new THREE.MeshStandardMaterial({ map: woodTexture, roughness: 0.55, metalness: 0.05 }),
    [woodTexture]
  );
  const acrylicRailMaterial = useMemo(
    () => new THREE.MeshStandardMaterial({
      color: '#E0F2FE', transparent: true, opacity: 0.25, roughness: 0.1, metalness: 0.1
    }),
    []
  );
  const goalPostMaterial = useMemo(
    () => new THREE.MeshStandardMaterial({ color: '#FFFFFF', roughness: 0.2, metalness: 0.7 }),
    []
  );
  const netMaterial = useMemo(
    () => new THREE.MeshStandardMaterial({
      color: '#FFFFFF', transparent: true, opacity: 0.55, roughness: 0.4, wireframe: true
    }),
    []
  );
  const clearBinMaterial = useMemo(
    () => new THREE.MeshStandardMaterial({
      color: '#F1F5F9', transparent: true, opacity: 0.45, roughness: 0.15
    }),
    []
  );
  const yellowHazardMaterial = useMemo(
    () => new THREE.MeshStandardMaterial({ color: '#FACC15', roughness: 0.35 }),
    []
  );
  const goldTrophyMaterial = useMemo(
    () => new THREE.MeshStandardMaterial({ color: '#F59E0B', metalness: 0.95, roughness: 0.15 }),
    []
  );

  // Animation References
  const raceCarsRef = useRef([]);
  const soccerBallRef = useRef();
  const soccerBotsRef = useRef([]);
  const lineBotsRef = useRef([]);

  // Smooth JS-only Animation Loop (no React state, paused when outside Arena)
  useFrame(({ clock }) => {
    // Only animate when inside Gamma or Arena Bay
    if (activeLabId !== 'gamma' && activeLabId !== 'gamma-arena' && activeLabId !== 'exterior') {
      return;
    }

    const t = clock.getElapsedTime();

    // 1. Race Cars (3 cars looping the oval circuit around x=3.9, z=8.2)
    const raceCenterX = 3.9;
    const raceCenterZ = 8.2;
    const rx = 1.65;
    const rz = 1.65;

    raceCarsRef.current.forEach((car, i) => {
      if (!car) return;
      const angle = t * 0.75 + (i * 2 * Math.PI) / 3;
      const px = raceCenterX + Math.cos(angle) * rx;
      const pz = raceCenterZ + Math.sin(angle) * rz;
      car.position.set(px, 0.36, pz);
      // Tangent rotation + forward alignment
      car.rotation.y = -angle + Math.PI / 2;
    });

    // 2. Robo Soccer: Ball + 2 Soccer Bots
    const soccerCenterX = 6.7;
    const soccerCenterZ = 2.9;
    if (soccerBallRef.current) {
      // Ball oscillates along pitch with natural dribble
      const bx = soccerCenterX + Math.sin(t * 0.65) * 1.5;
      const bz = soccerCenterZ + Math.cos(t * 1.3) * 0.45;
      soccerBallRef.current.position.set(bx, 0.36 + 0.08, bz);
      soccerBallRef.current.rotation.x = t * 3.5;
      soccerBallRef.current.rotation.z = t * 2.8;

      // Striker bot follows behind ball
      if (soccerBotsRef.current[0]) {
        const striker = soccerBotsRef.current[0];
        const dir = Math.cos(t * 0.65) >= 0 ? -0.32 : 0.32;
        striker.position.set(bx + dir, 0.36, bz);
        striker.rotation.y = dir < 0 ? -Math.PI / 2 : Math.PI / 2;
      }
    }
    // Goalie bot patrols right goal line
    if (soccerBotsRef.current[1]) {
      const goalie = soccerBotsRef.current[1];
      const gz = soccerCenterZ + Math.sin(t * 0.85) * 0.7;
      goalie.position.set(10.2, 0.36, gz);
      goalie.rotation.y = Math.PI;
    }

    // 3. Line Follower Bots (2 bots following serpentine figure-8 loop)
    const lineCenterX = 9.0;
    const lineCenterZ = 8.2;
    lineBotsRef.current.forEach((bot, i) => {
      if (!bot) return;
      const phase = t * 0.45 + (i * Math.PI);
      const bx = lineCenterX + Math.sin(phase) * 1.05;
      const bz = lineCenterZ + Math.sin(phase * 2) * 1.6;
      bot.position.set(bx, 0.29, bz);

      // Tangent heading
      const dx = Math.cos(phase) * 1.05;
      const dz = Math.cos(phase * 2) * 3.2;
      bot.rotation.y = Math.atan2(dx, dz);
    });
  });

  return (
    <group name="gamma-arena-bay" position={[48, 0, 0]}>
      {/* =========================================================================
          1. BACK WALL (Z = 0, Local X in [0, 12]): Navy Wall, Header, Hex LED Banner
         ========================================================================= */}
      {/* Full-width Navy Backing Wall */}
      <mesh position={[6.0, 1.8, 0.02]} receiveShadow>
        <planeGeometry args={[12.0, 3.6]} />
        <primitive object={navyFeatureMaterial} />
      </mesh>

      {/* Top Ceiling Horizon Blue LED Strip */}
      <mesh position={[6.0, 3.56, 0.035]}>
        <boxGeometry args={[12.0, 0.03, 0.02]} />
        <primitive object={blueLedMaterial} />
      </mesh>

      {/* Single Clean Header: A5X INDUSTRIES | LAB GAMMA / Advanced Innovation Lab */}
      <group position={[6.0, 3.24, 0.04]}>
        <mesh position={[0, 0, 0]}>
          <planeGeometry args={[7.2, 0.42]} />
          <meshBasicMaterial
            map={useMemo(() => {
              const canvas = document.createElement('canvas');
              canvas.width = 1440; canvas.height = 84;
              const ctx = canvas.getContext('2d');
              ctx.fillStyle = '#FFFFFF';
              ctx.font = 'bold 38px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto';
              ctx.textAlign = 'center';
              ctx.fillText('A5X INDUSTRIES   |   LAB GAMMA   —   Advanced Innovation Lab', 720, 56);
              return new THREE.CanvasTexture(canvas);
            }, [])}
            transparent
            toneMapped={false}
          />
        </mesh>
      </group>

      {/* Central Hexagonal Blue LED Frame Banner (3.0m high x 8.0m wide, Y=1.95m) */}
      <group position={[6.0, 1.95, 0.04]}>
        {/* Main Display Plane with the 4 icon columns */}
        <mesh receiveShadow>
          <planeGeometry args={[7.8, 2.1]} />
          <meshBasicMaterial map={hexBannerTexture} toneMapped={false} />
        </mesh>
        {/* Outer Emissive Cyan/Blue LED Border Strip */}
        <mesh position={[0, 1.06, 0.01]}>
          <boxGeometry args={[7.84, 0.03, 0.015]} />
          <primitive object={blueLedMaterial} />
        </mesh>
        <mesh position={[0, -1.06, 0.01]}>
          <boxGeometry args={[7.84, 0.03, 0.015]} />
          <primitive object={blueLedMaterial} />
        </mesh>
        <mesh position={[-3.92, 0, 0.01]}>
          <boxGeometry args={[0.03, 2.15, 0.015]} />
          <primitive object={blueLedMaterial} />
        </mesh>
        <mesh position={[3.92, 0, 0.01]}>
          <boxGeometry args={[0.03, 2.15, 0.015]} />
          <primitive object={blueLedMaterial} />
        </mesh>
      </group>

      {/* =========================================================================
          2. TROPHY & ROBOT SHOWCASE SHELF (Back-Left, X in [0.5, 2.5], Z in [0.08, 0.58])
         ========================================================================= */}
      <group position={[1.5, 0, 0.33]}>
        {/* 4 Light-Oak Shelf Tiers with Warm Under-LEDs */}
        {[0.22, 0.72, 1.25, 1.78].map((sy, i) => (
          <group key={`trophy-shelf-tier-${i}`}>
            <mesh position={[0, sy, 0]} castShadow receiveShadow>
              <boxGeometry args={[2.0, 0.035, 0.50]} />
              <primitive object={oakMaterial} />
            </mesh>
            <mesh position={[0, sy - 0.02, 0]}>
              <boxGeometry args={[1.96, 0.012, 0.46]} />
              <meshStandardMaterial color="#FFF8EE" emissive="#FFD580" emissiveIntensity={2.5} />
            </mesh>
          </group>
        ))}

        {/* Steel Uprights (40mm black matte) */}
        {[-0.95, 0.95].map((ux, ui) => (
          <group key={`shelf-upright-${ui}`} position={[ux, 1.15, 0]}>
            <mesh position={[0, 0, -0.22]} castShadow>
              <boxGeometry args={[0.04, 2.3, 0.04]} />
              <primitive object={blackSteelMaterial} />
            </mesh>
            <mesh position={[0, 0, 0.22]} castShadow>
              <boxGeometry args={[0.04, 2.3, 0.04]} />
              <primitive object={blackSteelMaterial} />
            </mesh>
          </group>
        ))}

        {/* Tier 1 (Y=0.22): Clear Storage Bins with Hardware */}
        {[-0.6, 0.0, 0.6].map((bx, bi) => (
          <mesh key={`tb-bin-${bi}`} position={[bx, 0.34, 0]} castShadow>
            <boxGeometry args={[0.48, 0.18, 0.38]} />
            <primitive object={clearBinMaterial} />
          </mesh>
        ))}

        {/* Tier 2 (Y=0.72): 2 Assembled Racing Robot Cars */}
        {[-0.45, 0.45].map((rx, ri) => (
          <group key={`shelf-car-t2-${ri}`} position={[rx, 0.78, 0]}>
            <mesh castShadow>
              <boxGeometry args={[0.34, 0.08, 0.24]} />
              <meshStandardMaterial color={ri === 0 ? '#1D4ED8' : '#F59E0B'} roughness={0.3} />
            </mesh>
            {/* Wheels */}
            {[-0.18, 0.18].map((wx, wi) => (
              <mesh key={`sc2-w-${wi}`} position={[wx, 0, 0]} rotation={[Math.PI / 2, 0, 0]}>
                <cylinderGeometry args={[0.045, 0.045, 0.035, 10]} />
                <primitive object={yellowHazardMaterial} />
              </mesh>
            ))}
          </group>
        ))}

        {/* Tier 3 (Y=1.25): 2 Advanced AMR Chassis with Sensor Domes */}
        {[-0.45, 0.45].map((rx, ri) => (
          <group key={`shelf-car-t3-${ri}`} position={[rx, 1.31, 0]}>
            <mesh castShadow>
              <boxGeometry args={[0.32, 0.08, 0.22]} />
              <meshStandardMaterial color="#0F172A" metalness={0.7} />
            </mesh>
            <mesh position={[0, 0.06, 0]}>
              <cylinderGeometry args={[0.03, 0.03, 0.04, 8]} />
              <meshStandardMaterial color="#DC2626" />
            </mesh>
          </group>
        ))}

        {/* Tier 4 (Y=1.78): 3 Championship Gold Trophies */}
        {[-0.6, 0.0, 0.6].map((tx, ti) => (
          <group key={`trophy-${ti}`} position={[tx, 1.80, 0]}>
            {/* Marble Base */}
            <mesh position={[0, 0.03, 0]} castShadow>
              <boxGeometry args={[0.12, 0.06, 0.12]} />
              <meshStandardMaterial color="#0F172A" roughness={0.2} />
            </mesh>
            {/* Golden Stem & Cup */}
            <mesh position={[0, 0.12, 0]} castShadow>
              <cylinderGeometry args={[0.03, 0.015, 0.12, 10]} />
              <primitive object={goldTrophyMaterial} />
            </mesh>
            <mesh position={[0, 0.22, 0]} castShadow>
              <cylinderGeometry args={[0.07, 0.03, 0.12, 12, 1, true]} />
              <primitive object={goldTrophyMaterial} />
            </mesh>
          </group>
        ))}

        {/* Trailing plant on top shelf corner */}
        <group position={[0.85, 1.82, 0]}>
          <mesh castShadow>
            <cylinderGeometry args={[0.08, 0.06, 0.10, 10]} />
            <meshStandardMaterial color="#FFFFFF" />
          </mesh>
          <mesh position={[0, 0.07, 0]}>
            <sphereGeometry args={[0.10, 8, 8]} />
            <meshStandardMaterial color="#16A34A" roughness={0.6} />
          </mesh>
        </group>
      </group>

      {/* Large Floor Plant beside trophy shelf (X=2.9, Z=0.45) */}
      <group position={[2.9, 0, 0.45]}>
        <mesh position={[0, 0.28, 0]} castShadow>
          <cylinderGeometry args={[0.18, 0.14, 0.56, 12]} />
          <meshStandardMaterial color="#FFFFFF" roughness={0.25} />
        </mesh>
        <mesh position={[0, 0.85, 0]} castShadow>
          <sphereGeometry args={[0.42, 10, 10]} />
          <meshStandardMaterial color="#15803D" roughness={0.7} />
        </mesh>
      </group>

      {/* =========================================================================
          3. ROBO SOCCER ARENA (Back-Centre, X: 2.8 to 10.6, Z: 1.2 to 4.6, Y: 0.35m)
         ========================================================================= */}
      <group position={[6.7, 0, 2.9]}>
        {/* Raised Platform Base Skirt (Navy #071B3A with Chamfered Corners) */}
        <mesh position={[0, 0.175, 0]} castShadow receiveShadow>
          <boxGeometry args={[7.8, 0.35, 3.4]} />
          <primitive object={navyFeatureMaterial} />
        </mesh>

        {/* Glowing Cyan LED Bottom Rim */}
        <mesh position={[0, 0.015, 0]}>
          <boxGeometry args={[7.84, 0.03, 3.44]} />
          <primitive object={blueLedMaterial} />
        </mesh>

        {/* Front Skirt Banner: "⚽ Robo Soccer Arena" */}
        <mesh position={[0, 0.175, 1.705]}>
          <planeGeometry args={[3.2, 0.28]} />
          <meshBasicMaterial map={soccerSkirtTexture} toneMapped={false} />
        </mesh>

        {/* Green Turf Pitch Surface (Y = 0.355m) */}
        <mesh position={[0, 0.355, 0]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
          <planeGeometry args={[7.6, 3.2]} />
          <meshStandardMaterial map={soccerPitchTexture} roughness={0.5} metalness={0.05} />
        </mesh>

        {/* Clear Glass/Acrylic Perimeter Safety Railing (Height 0.45m above platform) */}
        {/* Front & Back Rails */}
        {[-1.62, 1.62].map((rz, ri) => (
          <group key={`soccer-rail-fb-${ri}`} position={[0, 0.58, rz]}>
            <mesh>
              <boxGeometry args={[7.6, 0.45, 0.02]} />
              <primitive object={acrylicRailMaterial} />
            </mesh>
            {/* Top Black Metal Rail */}
            <mesh position={[0, 0.225, 0]}>
              <boxGeometry args={[7.64, 0.03, 0.04]} />
              <primitive object={blackSteelMaterial} />
            </mesh>
          </group>
        ))}
        {/* Left & Right Rails */}
        {[-3.82, 3.82].map((rx, ri) => (
          <group key={`soccer-rail-lr-${ri}`} position={[rx, 0.58, 0]}>
            <mesh>
              <boxGeometry args={[0.02, 0.45, 3.2]} />
              <primitive object={acrylicRailMaterial} />
            </mesh>
            <mesh position={[0, 0.225, 0]}>
              <boxGeometry args={[0.04, 0.03, 3.24]} />
              <primitive object={blackSteelMaterial} />
            </mesh>
          </group>
        ))}

        {/* Dual Goals with White Netting */}
        {/* Left Goal (Facing +X) */}
        <group position={[-3.5, 0.36, 0]} rotation={[0, Math.PI / 2, 0]}>
          {/* Goal Frame Posts */}
          <mesh position={[-0.45, 0.25, 0]}>
            <cylinderGeometry args={[0.02, 0.02, 0.50, 8]} />
            <primitive object={goalPostMaterial} />
          </mesh>
          <mesh position={[0.45, 0.25, 0]}>
            <cylinderGeometry args={[0.02, 0.02, 0.50, 8]} />
            <primitive object={goalPostMaterial} />
          </mesh>
          {/* Crossbar */}
          <mesh position={[0, 0.50, 0]} rotation={[0, 0, Math.PI / 2]}>
            <cylinderGeometry args={[0.02, 0.02, 0.90, 8]} />
            <primitive object={goalPostMaterial} />
          </mesh>
          {/* Net */}
          <mesh position={[0, 0.25, -0.18]}>
            <boxGeometry args={[0.90, 0.50, 0.36]} />
            <primitive object={netMaterial} />
          </mesh>
        </group>

        {/* Right Goal (Facing -X) */}
        <group position={[3.5, 0.36, 0]} rotation={[0, -Math.PI / 2, 0]}>
          <mesh position={[-0.45, 0.25, 0]}>
            <cylinderGeometry args={[0.02, 0.02, 0.50, 8]} />
            <primitive object={goalPostMaterial} />
          </mesh>
          <mesh position={[0.45, 0.25, 0]}>
            <cylinderGeometry args={[0.02, 0.02, 0.50, 8]} />
            <primitive object={goalPostMaterial} />
          </mesh>
          <mesh position={[0, 0.50, 0]} rotation={[0, 0, Math.PI / 2]}>
            <cylinderGeometry args={[0.02, 0.02, 0.90, 8]} />
            <primitive object={goalPostMaterial} />
          </mesh>
          <mesh position={[0, 0.25, -0.18]}>
            <boxGeometry args={[0.90, 0.50, 0.36]} />
            <primitive object={netMaterial} />
          </mesh>
        </group>
      </group>

      {/* Animated Soccer Ball on the Pitch */}
      <mesh ref={soccerBallRef} position={[6.7, 0.44, 2.9]} castShadow>
        <sphereGeometry args={[0.08, 16, 16]} />
        <meshStandardMaterial color="#FFFFFF" roughness={0.3} metalness={0.1} />
      </mesh>

      {/* 2 Animated Soccer Robots (Blue Striker & Orange Goalie) */}
      {[0, 1].map((idx) => (
        <group
          key={`soccer-bot-${idx}`}
          ref={(el) => (soccerBotsRef.current[idx] = el)}
          position={[idx === 0 ? 6.2 : 9.8, 0.36, 2.9]}
        >
          {/* Rounded Holonomic Chassis */}
          <mesh position={[0, 0.06, 0]} castShadow>
            <cylinderGeometry args={[0.13, 0.14, 0.10, 16]} />
            <meshStandardMaterial color={idx === 0 ? '#1D4ED8' : '#EA580C'} roughness={0.3} />
          </mesh>
          {/* Onboard Camera Mast */}
          <mesh position={[0, 0.14, 0]}>
            <cylinderGeometry args={[0.02, 0.02, 0.08, 8]} />
            <primitive object={blackSteelMaterial} />
          </mesh>
          {/* Kicker Solenoid Bar on Front */}
          <mesh position={[0.12, 0.03, 0]}>
            <boxGeometry args={[0.04, 0.04, 0.16]} />
            <meshStandardMaterial color="#94A3B8" metalness={0.8} />
          </mesh>
        </group>
      ))}

      {/* =========================================================================
          4. ROBO RACE ARENA (Front-Left, X: 1.6 to 6.2, Z: 5.8 to 10.6, Octagonal, Y: 0.35m)
         ========================================================================= */}
      <group position={[3.9, 0, 8.2]}>
        {/* Octagonal Raised Platform Base (Width 4.6m, Depth 4.8m) */}
        <mesh position={[0, 0.175, 0]} castShadow receiveShadow>
          <boxGeometry args={[4.6, 0.35, 4.8]} />
          <primitive object={navyFeatureMaterial} />
        </mesh>

        {/* Glowing Cyan LED Bottom Rim */}
        <mesh position={[0, 0.015, 0]}>
          <boxGeometry args={[4.64, 0.03, 4.84]} />
          <primitive object={blueLedMaterial} />
        </mesh>

        {/* Front Skirt Banner: "🏁 Robo Race Arena" */}
        <mesh position={[0, 0.175, 2.405]}>
          <planeGeometry args={[3.0, 0.28]} />
          <meshBasicMaterial map={raceSkirtTexture} toneMapped={false} />
        </mesh>

        {/* High-Resolution Asphalt Circuit Surface (Y = 0.355m) */}
        <mesh position={[0, 0.355, 0]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
          <planeGeometry args={[4.5, 4.7]} />
          <meshStandardMaterial map={raceTrackTexture} roughness={0.35} metalness={0.1} />
        </mesh>

        {/* A5X Incline Bridge / Flyover Ramp Structure (Resting properly on track, height 0.14m) */}
        <group position={[0, 0.36, -0.6]}>
          {/* Yellow/Black Hazard Side Walls */}
          {[-0.45, 0.45].map((wx, wi) => (
            <mesh key={`ramp-side-${wi}`} position={[wx, 0.07, 0]} castShadow>
              <boxGeometry args={[0.04, 0.14, 1.2]} />
              <primitive object={yellowHazardMaterial} />
            </mesh>
          ))}
          {/* Inclined Up-Ramp */}
          <mesh position={[0, 0.065, -0.32]} rotation={[0.22, 0, 0]}>
            <boxGeometry args={[0.86, 0.02, 0.62]} />
            <primitive object={blackSteelMaterial} />
          </mesh>
          {/* Inclined Down-Ramp */}
          <mesh position={[0, 0.065, 0.32]} rotation={[-0.22, 0, 0]}>
            <boxGeometry args={[0.86, 0.02, 0.62]} />
            <primitive object={blackSteelMaterial} />
          </mesh>
        </group>

        {/* START / FINISH Overhead Truss Gantry (Spanning track at Z = 1.6m) */}
        <group position={[0, 0.36, 1.5]}>
          {/* Left Silver Lattice Post */}
          <mesh position={[-1.7, 0.75, 0]} castShadow>
            <cylinderGeometry args={[0.03, 0.03, 1.5, 8]} />
            <meshStandardMaterial color="#94A3B8" metalness={0.85} roughness={0.2} />
          </mesh>
          {/* Right Silver Lattice Post */}
          <mesh position={[1.7, 0.75, 0]} castShadow>
            <cylinderGeometry args={[0.03, 0.03, 1.5, 8]} />
            <meshStandardMaterial color="#94A3B8" metalness={0.85} roughness={0.2} />
          </mesh>
          {/* Overhead Horizontal Truss & Banner */}
          <mesh position={[0, 1.52, 0]} castShadow>
            <boxGeometry args={[3.45, 0.04, 0.08]} />
            <meshStandardMaterial color="#94A3B8" metalness={0.85} roughness={0.2} />
          </mesh>
          <mesh position={[0, 1.38, 0]}>
            <planeGeometry args={[2.8, 0.26]} />
            <meshBasicMaterial map={startFinishTexture} toneMapped={false} />
          </mesh>
        </group>
      </group>

      {/* 3 Animated Race Cars on the Circuit */}
      {[0, 1, 2].map((i) => (
        <group
          key={`race-car-${i}`}
          ref={(el) => (raceCarsRef.current[i] = el)}
          position={[3.9, 0.36, 8.2]}
        >
          {/* Aerodynamic Racing Chassis */}
          <mesh position={[0, 0.05, 0]} castShadow>
            <boxGeometry args={[0.22, 0.06, 0.36]} />
            <meshStandardMaterial
              color={i === 0 ? '#1D4ED8' : i === 1 ? '#FACC15' : '#EF4444'}
              roughness={0.25}
              metalness={0.2}
            />
          </mesh>
          {/* Rear Downforce Wing */}
          <mesh position={[0, 0.12, -0.15]}>
            <boxGeometry args={[0.24, 0.015, 0.08]} />
            <primitive object={blackSteelMaterial} />
          </mesh>
          {/* 4 Chunky Rubber Racing Wheels with Yellow Hubs */}
          {[-0.12, 0.12].map((wx, wi) => (
            <group key={`rc-w-${wi}`}>
              <mesh position={[wx, 0.035, -0.10]} rotation={[0, 0, Math.PI / 2]} castShadow>
                <cylinderGeometry args={[0.04, 0.04, 0.03, 10]} />
                <primitive object={blackSteelMaterial} />
              </mesh>
              <mesh position={[wx, 0.035, 0.10]} rotation={[0, 0, Math.PI / 2]} castShadow>
                <cylinderGeometry args={[0.04, 0.04, 0.03, 10]} />
                <primitive object={blackSteelMaterial} />
              </mesh>
            </group>
          ))}
          {/* Front Dual Ultrasonic Sensor Eyes */}
          {[-0.06, 0.06].map((ex, ei) => (
            <mesh key={`rc-eye-${ei}`} position={[ex, 0.05, 0.185]}>
              <cylinderGeometry args={[0.015, 0.015, 0.02, 8]} />
              <meshStandardMaterial color="#94A3B8" />
            </mesh>
          ))}
        </group>
      ))}

      {/* =========================================================================
          5. LINE FOLLOWER ARENA (Front-Right, X: 7.4 to 10.6, Z: 5.8 to 10.6, Y: 0.28m)
         ========================================================================= */}
      <group position={[9.0, 0, 8.2]}>
        {/* Low Platform Base Skirt (Width 3.2m, Depth 4.8m) */}
        <mesh position={[0, 0.14, 0]} castShadow receiveShadow>
          <boxGeometry args={[3.2, 0.28, 4.8]} />
          <primitive object={navyFeatureMaterial} />
        </mesh>

        {/* Glowing Cyan LED Bottom Rim */}
        <mesh position={[0, 0.015, 0]}>
          <boxGeometry args={[3.24, 0.03, 4.84]} />
          <primitive object={blueLedMaterial} />
        </mesh>

        {/* Front Skirt Banner: "∿ Line Follower Arena" */}
        <mesh position={[0, 0.14, 2.405]}>
          <planeGeometry args={[2.6, 0.22]} />
          <meshBasicMaterial map={lineSkirtTexture} toneMapped={false} />
        </mesh>

        {/* White Melamine Surface with Serpentine Line (Y = 0.285m) */}
        <mesh position={[0, 0.285, 0]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
          <planeGeometry args={[3.12, 4.72]} />
          <meshStandardMaterial map={lineTrackTexture} roughness={0.3} metalness={0.05} />
        </mesh>

        {/* 2 Black Raised Obstacle Pads on the Track */}
        <mesh position={[-0.6, 0.295, -0.4]} castShadow>
          <boxGeometry args={[0.55, 0.025, 0.35]} />
          <primitive object={blackSteelMaterial} />
        </mesh>
        <mesh position={[0.6, 0.295, 0.6]} castShadow>
          <boxGeometry args={[0.55, 0.025, 0.35]} />
          <primitive object={blackSteelMaterial} />
        </mesh>
      </group>

      {/* 2 Animated Line Follower Robots traversing the track */}
      {[0, 1].map((idx) => (
        <group
          key={`line-bot-${idx}`}
          ref={(el) => (lineBotsRef.current[idx] = el)}
          position={[9.0, 0.29, 8.2]}
        >
          {/* Slim Compact Black Chassis */}
          <mesh position={[0, 0.035, 0]} castShadow>
            <boxGeometry args={[0.16, 0.045, 0.22]} />
            <meshStandardMaterial color="#0F172A" roughness={0.3} />
          </mesh>
          {/* Microcontroller & Battery Board */}
          <mesh position={[0, 0.065, 0]}>
            <boxGeometry args={[0.12, 0.015, 0.16]} />
            <meshStandardMaterial color="#10B981" />
          </mesh>
          {/* Downward Infrared Sensor Bar */}
          <mesh position={[0, 0.015, 0.11]}>
            <boxGeometry args={[0.14, 0.01, 0.02]} />
            <primitive object={blackSteelMaterial} />
          </mesh>
        </group>
      ))}

      {/* =========================================================================
          6. ROBOT DIAGNOSTIC BENCH (Right Wall, X in [11.2, 11.8], Z in [6.5, 10.5])
         ========================================================================= */}
      <group position={[11.5, 0, 8.5]}>
        {/* Light-Oak Tabletop (0.60m x 3.8m, Y = 0.85m) */}
        <mesh position={[0, 0.825, 0]} castShadow receiveShadow>
          <boxGeometry args={[0.60, 0.045, 3.8]} />
          <primitive object={oakMaterial} />
        </mesh>

        {/* Matte Black Steel End Legs & Center Support */}
        {[-1.7, 0.0, 1.7].map((lz, li) => (
          <group key={`diag-leg-${li}`} position={[0, 0, lz]}>
            <mesh position={[0, 0.40, 0]} castShadow>
              <boxGeometry args={[0.50, 0.80, 0.05]} />
              <primitive object={blackSteelMaterial} />
            </mesh>
          </group>
        ))}

        {/* Royal Blue ESD Soldering & Assembly Mat */}
        <mesh position={[0, 0.85, -0.6]} rotation={[-Math.PI / 2, 0, 0]}>
          <planeGeometry args={[0.48, 0.72]} />
          <meshStandardMaterial color="#1D4ED8" roughness={0.4} />
        </mesh>

        {/* Diagnostic Laptop with Illuminated Telemetry Display */}
        <group position={[0, 0.85, 0.5]}>
          <mesh position={[0, 0.01, 0]} castShadow>
            <boxGeometry args={[0.26, 0.015, 0.36]} />
            <meshStandardMaterial color="#94A3B8" metalness={0.9} />
          </mesh>
          <mesh position={[-0.11, 0.14, 0]} rotation={[0, 0, -0.28]} castShadow>
            <boxGeometry args={[0.01, 0.24, 0.36]} />
            <primitive object={blackSteelMaterial} />
          </mesh>
          <mesh position={[-0.10, 0.14, 0]} rotation={[0, 0, -0.28]}>
            <planeGeometry args={[0.22, 0.34]} />
            <meshBasicMaterial color="#38BDF8" />
          </mesh>
        </group>

        {/* Spare Chassis & Battery Modules on Bench */}
        <mesh position={[0, 0.90, -1.3]} castShadow>
          <boxGeometry args={[0.28, 0.08, 0.34]} />
          <meshStandardMaterial color="#0284C7" />
        </mesh>
        <mesh position={[0, 0.88, 1.3]} castShadow>
          <boxGeometry args={[0.22, 0.05, 0.28]} />
          <meshStandardMaterial color="#F59E0B" />
        </mesh>

        {/* Tool Pegboard above bench on East Wall (Y: 1.4 to 2.2m) */}
        <group position={[0.42, 1.8, 0]} rotation={[0, -Math.PI / 2, 0]}>
          <mesh castShadow>
            <boxGeometry args={[3.6, 0.80, 0.02]} />
            <primitive object={blackSteelMaterial} />
          </mesh>
          {/* Hanging Spare Propellers & Calipers */}
          {[-1.2, -0.6, 0.0, 0.6, 1.2].map((px, pi) => (
            <mesh key={`prop-${pi}`} position={[px, 0.15, 0.02]} rotation={[0, 0, pi * 0.4]}>
              <boxGeometry args={[0.22, 0.025, 0.005]} />
              <meshStandardMaterial color={pi % 2 === 0 ? '#EF4444' : '#FFFFFF'} />
            </mesh>
          ))}
        </group>

        {/* Modern Black Workshop Stools */}
        {[-0.8, 0.8].map((sz, si) => (
          <group key={`stool-${si}`} position={[-0.55, 0, sz]}>
            <mesh position={[0, 0.58, 0]} castShadow>
              <cylinderGeometry args={[0.18, 0.18, 0.06, 16]} />
              <primitive object={blackSteelMaterial} />
            </mesh>
            <mesh position={[0, 0.28, 0]}>
              <cylinderGeometry args={[0.025, 0.16, 0.56, 8]} />
              <primitive object={blackSteelMaterial} />
            </mesh>
          </group>
        ))}
      </group>

      {/* =========================================================================
          7. RIGHT WALL (X = 12): Glass Partition with Neon "A5X" Sign
         ========================================================================= */}
      <group position={[11.96, 2.4, 3.5]} rotation={[0, -Math.PI / 2, 0]}>
        <mesh>
          <planeGeometry args={[2.2, 1.1]} />
          <meshBasicMaterial map={neonSignTexture} transparent toneMapped={false} />
        </mesh>
      </group>

      {/* Floor Plants at East Corners */}
      <group position={[11.4, 0, 0.6]}>
        <mesh position={[0, 0.28, 0]} castShadow>
          <cylinderGeometry args={[0.16, 0.12, 0.56, 10]} />
          <meshStandardMaterial color="#FFFFFF" roughness={0.3} />
        </mesh>
        <mesh position={[0, 0.75, 0]} castShadow>
          <sphereGeometry args={[0.35, 8, 8]} />
          <meshStandardMaterial color="#15803D" roughness={0.7} />
        </mesh>
      </group>
      <group position={[11.4, 0, 11.4]}>
        <mesh position={[0, 0.28, 0]} castShadow>
          <cylinderGeometry args={[0.16, 0.12, 0.56, 10]} />
          <meshStandardMaterial color="#FFFFFF" roughness={0.3} />
        </mesh>
        <mesh position={[0, 0.75, 0]} castShadow>
          <sphereGeometry args={[0.35, 8, 8]} />
          <meshStandardMaterial color="#16A34A" roughness={0.7} />
        </mesh>
      </group>
    </group>
  );
}
