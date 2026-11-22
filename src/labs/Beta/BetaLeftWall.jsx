import React, { useMemo } from 'react';
import * as THREE from 'three';
import {
  getBetaLogoTexture,
  getPegboardTexture,
  getSolderingLcdTexture,
  getBinLabelTexture,
  getWoodGrainTexture,
  getOscilloscopeTexture,
  getBenchPsuTexture,
  getFunctionGeneratorTexture,
  getBenchMultimeterTexture,
  getHandheldMultimeterTexture,
  getRPi5BoxTexture,
  getArduinoBoxTexture,
  getESP32BoxTexture,
  getDrawerCabinetTexture,
  getCuttingMatTexture,
} from './betaTextures';

/**
 * Beta Left Wall (X=16 side): Soldering Wall + Electronics & Hardware Wall — Revision 11
 * Clean, fully stocked architectural build matching the user reference render:
 * 1. Root-cause duplicate signs fixed: All hard-coded sign meshes deleted.
 *    Signs are driven strictly from data/zones.js via <ZoneSign />.
 * 2. Fully stocked Pegboard (4.2 x 1.3 m): 4 rows of pliers, strippers, screwdrivers,
 *    tweezers, hex keys, solder coils, heat-shrink, tapes, drawer box, wire spools, pump.
 * 3. Instrument Shelf: 2 Oscilloscopes, 2 Bench PSUs (12.00V 1.50A), 1 Function Gen, 1 Bench DMM.
 * 4. Soldering Bench: 3 Hakko-blue stations (350°C LCD, spring holder, cable, tip cleaner),
 *    2 yellow handheld multimeters (rounded bodies, dial, probes), microscope, helping hands, PCB holder.
 * 5. Under-bench Bins: Clearly visible bins (opacity 0.45, white rim + coloured lids, labels, visible contents).
 * 6. Electronics Zone Tower (1.0 x 2.1 m): 8 clear component bins, 24-drawer parts cabinet, breadboard rack, sensors.
 * 7. Hardware Zone Unit (2.4 x 2.1 m): 5 tiers of RPi5 boxes + acrylic cases, Arduino boxes + boards,
 *    ESP32 boxes + dev boards, 3 autonomous robot cars, 2 articulated 4-axis robot arms.
 * 8. Plant: Standard shared plant asset placed at wall ends, never blocking signs or benches.
 * 9. Navy Header Band: Full wall width with A5X INDUSTRIES logo; lower wall light grey #E2E8F0.
 */
export function BetaLeftWall() {
  const labX = 16.0; // Left wall at X = 16.0

  // Textures
  const logoTexture = useMemo(() => getBetaLogoTexture(), []);
  const pegboardTexture = useMemo(() => getPegboardTexture(), []);
  const woodTexture = useMemo(() => getWoodGrainTexture(), []);
  const scopeTexture = useMemo(() => getOscilloscopeTexture(), []);
  const psuTexture = useMemo(() => getBenchPsuTexture(), []);
  const funcGenTexture = useMemo(() => getFunctionGeneratorTexture(), []);
  const benchDmmTexture = useMemo(() => getBenchMultimeterTexture(), []);
  const handheldDmmTexture = useMemo(() => getHandheldMultimeterTexture(), []);
  const rpi5BoxTexture = useMemo(() => getRPi5BoxTexture(), []);
  const arduinoBoxTexture = useMemo(() => getArduinoBoxTexture(), []);
  const esp32BoxTexture = useMemo(() => getESP32BoxTexture(), []);
  const drawerTexture = useMemo(() => getDrawerCabinetTexture(), []);
  const matTexture = useMemo(() => getCuttingMatTexture(), []);
  const solderingLcdTexture = useMemo(() => getSolderingLcdTexture(), []);

  // Shared Materials
  const oakMaterial = useMemo(
    () => new THREE.MeshStandardMaterial({ map: woodTexture, roughness: 0.6, metalness: 0.05 }),
    [woodTexture]
  );
  const blackSteelMaterial = useMemo(
    () => new THREE.MeshStandardMaterial({ color: '#1B1F27', metalness: 0.85, roughness: 0.28 }),
    []
  );
  const brushedMetalMaterial = useMemo(
    () => new THREE.MeshStandardMaterial({ color: '#CBD5E1', metalness: 0.9, roughness: 0.2 }),
    []
  );
  const hakkoBlueMaterial = useMemo(
    () => new THREE.MeshStandardMaterial({ color: '#0284C7', roughness: 0.35 }),
    []
  );
  const yellowFlukeMaterial = useMemo(
    () => new THREE.MeshStandardMaterial({ color: '#F59E0B', roughness: 0.35 }),
    []
  );
  const blueLedMaterial = useMemo(
    () => new THREE.MeshStandardMaterial({ color: '#1677FF', emissive: '#1677FF', emissiveIntensity: 3.5 }),
    []
  );
  const warmLedMaterial = useMemo(
    () => new THREE.MeshStandardMaterial({ color: '#FFF8EE', emissive: '#FFD580', emissiveIntensity: 2.5 }),
    []
  );
  const clearBinMaterial = useMemo(
    () => new THREE.MeshStandardMaterial({ color: '#F1F5F9', transparent: true, opacity: 0.45, roughness: 0.15 }),
    []
  );
  const whitePlasticMaterial = useMemo(
    () => new THREE.MeshStandardMaterial({ color: '#F8FAFC', roughness: 0.35 }),
    []
  );

  return (
    <group name="beta-left-wall-revision11">
      {/* ================================================================
          1. WALL ARCHITECTURE & NAVY HEADER BAND
             Clear 3.0m door opening at Z in [4.5, 7.5] for Alpha-Beta AutoDoor!
         ================================================================ */}
      {/* Navy Header Band: Back Segment (Z: 0 to 4.5) */}
      <mesh position={[labX + 0.02, 2.90, 2.25]} rotation={[0, Math.PI / 2, 0]}>
        <planeGeometry args={[4.5, 1.4]} />
        <meshStandardMaterial color="#071B3A" roughness={0.35} metalness={0.15} />
      </mesh>
      {/* Navy Header Band: Front Segment (Z: 7.5 to 12) */}
      <mesh position={[labX + 0.02, 2.90, 9.75]} rotation={[0, Math.PI / 2, 0]}>
        <planeGeometry args={[4.5, 1.4]} />
        <meshStandardMaterial color="#071B3A" roughness={0.35} metalness={0.15} />
      </mesh>

      {/* Electric-Blue LED Underline below Navy Band */}
      <mesh position={[labX + 0.03, 2.20, 2.25]} rotation={[0, Math.PI / 2, 0]}>
        <boxGeometry args={[4.5, 0.025, 0.015]} />
        <primitive object={blueLedMaterial} />
      </mesh>
      <mesh position={[labX + 0.03, 2.20, 9.75]} rotation={[0, Math.PI / 2, 0]}>
        <boxGeometry args={[4.5, 0.025, 0.015]} />
        <primitive object={blueLedMaterial} />
      </mesh>

      {/* A5X INDUSTRIES Raised 3D Logo on Back Segment Navy Header (Z = 2.25) */}
      <mesh position={[labX + 0.03, 2.95, 2.25]} rotation={[0, Math.PI / 2, 0]}>
        <planeGeometry args={[3.2, 0.6]} />
        <meshBasicMaterial map={logoTexture} transparent toneMapped={false} />
      </mesh>

      {/* Lower Wall (from Y = 0 to 2.2m): Light Architectural Grey #E2E8F0 */}
      {/* Back Segment (Z: 0 to 4.5) */}
      <mesh position={[labX + 0.01, 1.10, 2.25]} rotation={[0, Math.PI / 2, 0]} receiveShadow>
        <planeGeometry args={[4.5, 2.2]} />
        <meshStandardMaterial color="#E2E8F0" roughness={0.7} />
      </mesh>
      {/* Front Segment (Z: 7.5 to 12) */}
      <mesh position={[labX + 0.01, 1.10, 9.75]} rotation={[0, Math.PI / 2, 0]} receiveShadow>
        <planeGeometry args={[4.5, 2.2]} />
        <meshStandardMaterial color="#E2E8F0" roughness={0.7} />
      </mesh>

      {/* ================================================================
          2. BACK SEGMENT (Z: 0.0 to 4.5): HARDWARE & ELECTRONICS UNITS
             NOTE: Zero hardcoded signs here! Signs for Hardware & Electronics
             are rendered solely from data/zones.js by <ZoneSign />.
         ================================================================ */}
      {/* 2A. HARDWARE ZONE SHELVING UNIT (Z: 0.3 to 2.7, width 2.4m, depth 0.55m, height 2.1m) */}
      <group position={[labX + 0.35, 0, 1.5]}>
        {/* 5 Oak Shelf Tiers with Warm LED Underside Strips */}
        {[0.20, 0.62, 1.05, 1.48, 1.90].map((sy, i) => (
          <group key={`hw-tier-${i}`}>
            <mesh position={[0, sy, 0]} castShadow receiveShadow>
              <boxGeometry args={[0.55, 0.035, 2.40]} />
              <primitive object={oakMaterial} />
            </mesh>
            {/* Warm LED Strip under each shelf */}
            <mesh position={[0, sy - 0.022, 0]}>
              <boxGeometry args={[0.50, 0.012, 2.36]} />
              <primitive object={warmLedMaterial} />
            </mesh>
          </group>
        ))}

        {/* 4 Corner + 2 Middle Black Steel Uprights */}
        {[
          [-0.24, -1.16], [-0.24, 0], [-0.24, 1.16],
          [0.24, -1.16], [0.24, 0], [0.24, 1.16],
        ].map(([ux, uz], ui) => (
          <mesh key={`hw-upright-${ui}`} position={[ux, 1.05, uz]} castShadow>
            <boxGeometry args={[0.04, 2.10, 0.04]} />
            <primitive object={blackSteelMaterial} />
          </mesh>
        ))}

        {/* LEVEL 1 (Y = 1.90m): Raspberry Pi 5 Retail Boxes & Acrylic Case Boards */}
        {[-0.9, -0.4, 0.2, 0.8].map((bz, bi) => (
          <group key={`rpi-box-${bi}`} position={[0, 2.03, bz]}>
            {/* Retail Box */}
            <mesh castShadow>
              <boxGeometry args={[0.18, 0.22, 0.18]} />
              <primitive object={whitePlasticMaterial} />
            </mesh>
            <mesh position={[0.091, 0, 0]} rotation={[0, Math.PI / 2, 0]}>
              <planeGeometry args={[0.17, 0.21]} />
              <meshBasicMaterial map={rpi5BoxTexture} toneMapped={false} />
            </mesh>
            {/* Raspberry Pi in clear acrylic case beside it */}
            <group position={[0.12, -0.06, 0.16]}>
              <mesh castShadow>
                <boxGeometry args={[0.06, 0.03, 0.10]} />
                <primitive object={clearBinMaterial} />
              </mesh>
              {/* Green PCB inside */}
              <mesh position={[0, 0, 0]}>
                <boxGeometry args={[0.05, 0.005, 0.09]} />
                <meshStandardMaterial color="#15803D" roughness={0.4} />
              </mesh>
            </group>
          </group>
        ))}

        {/* LEVEL 2 (Y = 1.48m): Arduino Uno / Nano / Mega Boxes & Boards */}
        {[-0.85, -0.35, 0.25, 0.75].map((az, ai) => (
          <group key={`ard-box-${ai}`} position={[0, 1.60, az]}>
            <mesh castShadow>
              <boxGeometry args={[0.18, 0.20, 0.18]} />
              <meshStandardMaterial color="#00979D" roughness={0.3} />
            </mesh>
            <mesh position={[0.091, 0, 0]} rotation={[0, Math.PI / 2, 0]}>
              <planeGeometry args={[0.17, 0.19]} />
              <meshBasicMaterial map={arduinoBoxTexture} toneMapped={false} />
            </mesh>
            {/* Blue Arduino PCB displayed in front */}
            <mesh position={[0.12, -0.05, 0.14]} castShadow>
              <boxGeometry args={[0.055, 0.005, 0.08]} />
              <meshStandardMaterial color="#0284C7" roughness={0.4} />
            </mesh>
          </group>
        ))}

        {/* LEVEL 3 (Y = 1.05m): ESP32 DevKit Boxes & Boards on Angled Stands */}
        {[-0.85, -0.35, 0.15, 0.65].map((ez, ei) => (
          <group key={`esp-box-${ei}`} position={[0, 1.17, ez]}>
            <mesh castShadow>
              <boxGeometry args={[0.18, 0.20, 0.16]} />
              <meshStandardMaterial color="#1E293B" roughness={0.4} />
            </mesh>
            <mesh position={[0.091, 0, 0]} rotation={[0, Math.PI / 2, 0]}>
              <planeGeometry args={[0.15, 0.19]} />
              <meshBasicMaterial map={esp32BoxTexture} toneMapped={false} />
            </mesh>
            {/* ESP32 Board on angled display stand */}
            <group position={[0.14, -0.05, 0.14]} rotation={[0, 0, -0.3]}>
              <mesh castShadow>
                <boxGeometry args={[0.05, 0.005, 0.06]} />
                <meshStandardMaterial color="#111827" roughness={0.5} />
              </mesh>
              {/* Silver RF Shield Can */}
              <mesh position={[0, 0.005, 0.01]}>
                <boxGeometry args={[0.025, 0.005, 0.025]} />
                <primitive object={brushedMetalMaterial} />
              </mesh>
            </group>
          </group>
        ))}

        {/* LEVEL 4 (Y = 0.62m): 3 Autonomous Robot Cars */}
        {[-0.75, 0.0, 0.75].map((cz, ci) => (
          <group key={`bot-car-${ci}`} position={[0, 0.72, cz]}>
            {/* Laser-cut acrylic chassis */}
            <mesh castShadow>
              <boxGeometry args={[0.26, 0.035, 0.22]} />
              <meshStandardMaterial color={ci === 0 ? '#1E40AF' : ci === 1 ? '#DC2626' : '#111827'} roughness={0.3} />
            </mesh>
            {/* 4 Yellow / Black Mecanum Drive Wheels */}
            {[
              [-0.12, 0, -0.10], [0.12, 0, -0.10],
              [-0.12, 0, 0.10], [0.12, 0, 0.10]
            ].map(([wx, wy, wz], wi) => (
              <mesh key={`cw-${wi}`} position={[wx, wy, wz]} rotation={[0, 0, Math.PI / 2]} castShadow>
                <cylinderGeometry args={[0.035, 0.035, 0.025, 10]} />
                <meshStandardMaterial color="#FBBF24" roughness={0.4} />
              </mesh>
            ))}
            {/* Front Ultrasonic Sensor Eyes (HC-SR04) */}
            <group position={[0.13, 0.03, 0]}>
              <mesh position={[0, 0, -0.025]} rotation={[0, 0, Math.PI / 2]}>
                <cylinderGeometry args={[0.012, 0.012, 0.012, 8]} />
                <primitive object={brushedMetalMaterial} />
              </mesh>
              <mesh position={[0, 0, 0.025]} rotation={[0, 0, Math.PI / 2]}>
                <cylinderGeometry args={[0.012, 0.012, 0.012, 8]} />
                <primitive object={brushedMetalMaterial} />
              </mesh>
            </group>
            {/* Microcontroller & Battery Holder */}
            <mesh position={[-0.04, 0.03, 0]}>
              <boxGeometry args={[0.08, 0.02, 0.08]} />
              <meshStandardMaterial color="#0284C7" roughness={0.5} />
            </mesh>
          </group>
        ))}

        {/* LEVEL 5 (Y = 0.20m): 2 Articulated 4-Axis Robotic Arms & Bins */}
        <group position={[0, 0.22, -0.55]}>
          {/* Industrial Yellow Robotic Arm */}
          <mesh position={[0, 0.03, 0]} castShadow>
            <cylinderGeometry args={[0.08, 0.09, 0.04, 12]} />
            <primitive object={blackSteelMaterial} />
          </mesh>
          {/* Shoulder & Actuator Link */}
          <mesh position={[0, 0.14, 0.02]} rotation={[0.4, 0, 0]} castShadow>
            <boxGeometry args={[0.045, 0.18, 0.045]} />
            <meshStandardMaterial color="#FBBF24" roughness={0.35} />
          </mesh>
          {/* Elbow Joint & Upper Link */}
          <mesh position={[0, 0.28, -0.04]} rotation={[-0.6, 0, 0]} castShadow>
            <boxGeometry args={[0.04, 0.16, 0.04]} />
            <meshStandardMaterial color="#FBBF24" roughness={0.35} />
          </mesh>
          {/* Wrist & 2-Finger Parallel Gripper */}
          <group position={[0, 0.36, 0.04]}>
            <mesh castShadow>
              <boxGeometry args={[0.05, 0.02, 0.04]} />
              <primitive object={blackSteelMaterial} />
            </mesh>
            <mesh position={[-0.02, 0.03, 0]}>
              <boxGeometry args={[0.008, 0.04, 0.015]} />
              <primitive object={brushedMetalMaterial} />
            </mesh>
            <mesh position={[0.02, 0.03, 0]}>
              <boxGeometry args={[0.008, 0.04, 0.015]} />
              <primitive object={brushedMetalMaterial} />
            </mesh>
          </group>
        </group>

        {/* Matte Black Robotic Arm */}
        <group position={[0, 0.22, 0.55]}>
          <mesh position={[0, 0.03, 0]} castShadow>
            <cylinderGeometry args={[0.08, 0.09, 0.04, 12]} />
            <primitive object={blackSteelMaterial} />
          </mesh>
          <mesh position={[0, 0.14, -0.02]} rotation={[-0.3, 0, 0]} castShadow>
            <boxGeometry args={[0.045, 0.18, 0.045]} />
            <primitive object={blackSteelMaterial} />
          </mesh>
          <mesh position={[0, 0.28, 0.03]} rotation={[0.5, 0, 0]} castShadow>
            <boxGeometry args={[0.04, 0.16, 0.04]} />
            <primitive object={blackSteelMaterial} />
          </mesh>
          <mesh position={[0, 0.36, -0.03]} castShadow>
            <boxGeometry args={[0.05, 0.02, 0.04]} />
            <primitive object={brushedMetalMaterial} />
          </mesh>
        </group>
      </group>

      {/* 2B. ELECTRONICS ZONE STORAGE TOWER (Z: 3.1 to 4.1, width 1.0m, depth 0.5m, height 2.1m) */}
      <group position={[labX + 0.35, 0, 3.6]}>
        {/* Steel Tower Frame with Oak Shelves */}
        {[0.20, 0.65, 1.10, 1.55, 2.0].map((sy, i) => (
          <mesh key={`el-shelf-${i}`} position={[0, sy, 0]} castShadow>
            <boxGeometry args={[0.50, 0.03, 1.0]} />
            <primitive object={oakMaterial} />
          </mesh>
        ))}
        {/* 4 Corner Uprights */}
        {[[-0.22, -0.46], [-0.22, 0.46], [0.22, -0.46], [0.22, 0.46]].map(([ux, uz], ui) => (
          <mesh key={`el-post-${ui}`} position={[ux, 1.05, uz]} castShadow>
            <boxGeometry args={[0.035, 2.10, 0.035]} />
            <primitive object={blackSteelMaterial} />
          </mesh>
        ))}

        {/* TOP 2 LEVELS (Y = 1.55, 2.0): 8 Clear Labelled Component Bins */}
        {[
          { label: 'RESISTORS', lid: '#0284C7', y: 1.67, z: -0.24 },
          { label: 'CAPACITORS', lid: '#F59E0B', y: 1.67, z: 0.24 },
          { label: 'LEDs', lid: '#10B981', y: 2.12, z: -0.24 },
          { label: 'DIODES', lid: '#8B5CF6', y: 2.12, z: 0.24 },
        ].map((bin, bi) => (
          <group key={`el-bin-${bi}`} position={[0, bin.y, bin.z]}>
            <mesh castShadow>
              <boxGeometry args={[0.38, 0.18, 0.40]} />
              <primitive object={clearBinMaterial} />
            </mesh>
            <mesh position={[0, 0.095, 0]} castShadow>
              <boxGeometry args={[0.39, 0.015, 0.41]} />
              <meshStandardMaterial color={bin.lid} roughness={0.3} />
            </mesh>
            {/* White Label */}
            <mesh position={[0.191, 0.02, 0]} rotation={[0, Math.PI / 2, 0]}>
              <planeGeometry args={[0.22, 0.06]} />
              <meshBasicMaterial map={getBinLabelTexture(bin.label)} toneMapped={false} />
            </mesh>
            {/* Visible components inside */}
            <mesh position={[0, -0.04, 0]}>
              <boxGeometry args={[0.24, 0.06, 0.24]} />
              <meshStandardMaterial color={bin.lid} roughness={0.6} />
            </mesh>
          </group>
        ))}

        {/* MIDDLE LEVEL (Y = 1.10m): 24-Drawer Modular Parts Cabinet */}
        <group position={[0, 1.30, 0]}>
          <mesh castShadow>
            <boxGeometry args={[0.42, 0.36, 0.88]} />
            <meshStandardMaterial color="#1E293B" roughness={0.5} />
          </mesh>
          {/* Front Face with 24 Drawers Matrix & Labels */}
          <mesh position={[0.211, 0, 0]} rotation={[0, Math.PI / 2, 0]}>
            <planeGeometry args={[0.86, 0.34]} />
            <meshBasicMaterial map={drawerTexture} toneMapped={false} />
          </mesh>
          {/* 2 Drawers Pulled Out Slightly */}
          <mesh position={[0.25, 0.05, -0.15]} castShadow>
            <boxGeometry args={[0.08, 0.06, 0.12]} />
            <meshStandardMaterial color="#334155" roughness={0.4} />
          </mesh>
        </group>

        {/* LOWER LEVELS (Y = 0.65m, 0.20m): Breadboards Rack, Stacked PCBs & Bench PSU */}
        <group position={[0, 0.77, -0.22]}>
          {/* Breadboard Holder Rack */}
          <mesh castShadow>
            <boxGeometry args={[0.30, 0.18, 0.24]} />
            <primitive object={blackSteelMaterial} />
          </mesh>
          {/* 3 White Solderless Breadboards */}
          {[-0.06, 0.0, 0.06].map((by, bidx) => (
            <mesh key={`bb-${bidx}`} position={[0.05, by, 0]} castShadow>
              <boxGeometry args={[0.18, 0.025, 0.20]} />
              <primitive object={whitePlasticMaterial} />
            </mesh>
          ))}
        </group>

        {/* Stacked Green Prototype PCBs */}
        <group position={[0, 0.70, 0.24]}>
          <mesh castShadow>
            <boxGeometry args={[0.24, 0.04, 0.24]} />
            <meshStandardMaterial color="#15803D" roughness={0.4} />
          </mesh>
        </group>

        {/* Sensor Module Display Stands on Lower Level */}
        <group position={[0, 0.32, 0]}>
          {/* Ultrasonic HC-SR04 */}
          <group position={[0.08, 0.04, -0.24]}>
            <mesh castShadow>
              <boxGeometry args={[0.02, 0.04, 0.08]} />
              <meshStandardMaterial color="#0284C7" roughness={0.4} />
            </mesh>
            <mesh position={[0.015, 0, -0.02]} rotation={[0, 0, Math.PI / 2]}>
              <cylinderGeometry args={[0.012, 0.012, 0.012, 8]} />
              <primitive object={brushedMetalMaterial} />
            </mesh>
            <mesh position={[0.015, 0, 0.02]} rotation={[0, 0, Math.PI / 2]}>
              <cylinderGeometry args={[0.012, 0.012, 0.012, 8]} />
              <primitive object={brushedMetalMaterial} />
            </mesh>
          </group>
          {/* Blue 2-Channel Relay Module */}
          <mesh position={[0.08, 0.03, 0.16]} castShadow>
            <boxGeometry args={[0.08, 0.035, 0.10]} />
            <meshStandardMaterial color="#1E40AF" roughness={0.4} />
          </mesh>
        </group>
      </group>

      {/* Realistic Potted Floor Plant at Wall End (Z = 0.2m) */}
      <group position={[labX + 0.45, 0, 0.2]}>
        <mesh position={[0, 0.15, 0]} castShadow>
          <cylinderGeometry args={[0.125, 0.10, 0.30, 14]} />
          <primitive object={whitePlasticMaterial} />
        </mesh>
        {/* Soil Disc */}
        <mesh position={[0, 0.29, 0]}>
          <cylinderGeometry args={[0.11, 0.11, 0.02, 14]} />
          <meshStandardMaterial color="#2B1D0C" roughness={0.9} />
        </mesh>
        {/* 12 Curved Leaf Blades */}
        {[0, 0.52, 1.04, 1.57, 2.09, 2.61, 3.14, 3.66, 4.18, 4.71, 5.23, 5.75].map((rot, ri) => (
          <mesh key={`pblade-${ri}`} position={[0, 0.30, 0]} rotation={[0.45, rot, 0]} castShadow>
            <planeGeometry args={[0.06, 0.32]} />
            <meshStandardMaterial color={ri % 2 === 0 ? '#15803D' : '#16A34A'} roughness={0.55} side={2} />
          </mesh>
        ))}
      </group>

      {/* ================================================================
          3. FRONT SEGMENT (Z: 7.5 to 12.0): SOLDERING WALL & INSTRUMENTS
             NOTE: Zero hardcoded signs here! Sign for Soldering & Assembly
             is rendered solely from data/zones.js by <ZoneSign /> at Y=2.52m.
         ================================================================ */}
      {/* 3A. PEGBOARD (4.2m x 1.3m, Z: 7.6 to 11.8, Y: 0.85 to 2.15m) */}
      <group position={[labX + 0.04, 1.50, 9.7]} rotation={[0, Math.PI / 2, 0]}>
        {/* Charcoal Pegboard Panel with Hole Grid */}
        <mesh receiveShadow>
          <planeGeometry args={[4.20, 1.30]} />
          <meshStandardMaterial map={pegboardTexture} color="#2B323D" roughness={0.8} metalness={0.05} />
        </mesh>
        {/* Light Oak Frame Border around Pegboard */}
        <mesh position={[0, 0.65, 0.015]}>
          <boxGeometry args={[4.24, 0.03, 0.03]} />
          <primitive object={oakMaterial} />
        </mesh>
        <mesh position={[0, -0.65, 0.015]}>
          <boxGeometry args={[4.24, 0.03, 0.03]} />
          <primitive object={oakMaterial} />
        </mesh>
        <mesh position={[-2.10, 0, 0.015]}>
          <boxGeometry args={[0.03, 1.30, 0.03]} />
          <primitive object={oakMaterial} />
        </mesh>
        <mesh position={[2.10, 0, 0.015]}>
          <boxGeometry args={[0.03, 1.30, 0.03]} />
          <primitive object={oakMaterial} />
        </mesh>

        {/* ROW 1 (Y ≈ +0.45m): 4 Pliers + 2 Wire Strippers with Lighter Shadow-board Silhouettes */}
        {[-1.6, -1.0, -0.4, 0.2, 0.8, 1.4].map((tx, i) => {
          const gripColor = ['#DC2626', '#2563EB', '#F59E0B', '#16A34A', '#DC2626', '#2563EB'][i];
          return (
            <group key={`pliertool-${i}`} position={[tx, 0.45, 0.02]}>
              {/* Lighter Shadow Outline */}
              <mesh position={[0, 0, -0.005]}>
                <boxGeometry args={[0.12, 0.24, 0.002]} />
                <meshStandardMaterial color="#475569" roughness={0.9} />
              </mesh>
              {/* Silver Jaws & Pivot */}
              <mesh position={[0, 0.06, 0]} castShadow>
                <boxGeometry args={[0.03, 0.12, 0.015]} />
                <primitive object={brushedMetalMaterial} />
              </mesh>
              {/* Colored Rubber Grips */}
              <mesh position={[-0.03, -0.05, 0]} rotation={[0, 0, 0.1]} castShadow>
                <cylinderGeometry args={[0.012, 0.012, 0.13, 8]} />
                <meshStandardMaterial color={gripColor} roughness={0.4} />
              </mesh>
              <mesh position={[0.03, -0.05, 0]} rotation={[0, 0, -0.1]} castShadow>
                <cylinderGeometry args={[0.012, 0.012, 0.13, 8]} />
                <meshStandardMaterial color={gripColor} roughness={0.4} />
              </mesh>
            </group>
          );
        })}

        {/* ROW 2 (Y ≈ +0.15m): Screwdriver Rack (8 screwdrivers) + Tweezers + Knife + Hex Keys */}
        <group position={[-0.6, 0.15, 0.02]}>
          {/* Wall-mounted tool rack bar */}
          <mesh position={[0, 0.06, 0]} castShadow>
            <boxGeometry args={[1.5, 0.025, 0.04]} />
            <primitive object={blackSteelMaterial} />
          </mesh>
          {/* 8 Screwdrivers hanging by handle ring */}
          {[-0.65, -0.46, -0.28, -0.10, 0.08, 0.26, 0.44, 0.62].map((sx, si) => {
            const handleColor = ['#DC2626', '#F59E0B', '#2563EB', '#111827', '#DC2626', '#F59E0B', '#2563EB', '#111827'][si];
            return (
              <group key={`sd-${si}`} position={[sx, 0, 0.02]}>
                {/* Steel Shaft */}
                <mesh position={[0, -0.08, 0]} castShadow>
                  <cylinderGeometry args={[0.004, 0.004, 0.16, 6]} />
                  <primitive object={brushedMetalMaterial} />
                </mesh>
                {/* Handle */}
                <mesh position={[0, 0.05, 0]} castShadow>
                  <cylinderGeometry args={[0.016, 0.014, 0.10, 8]} />
                  <meshStandardMaterial color={handleColor} roughness={0.35} />
                </mesh>
              </group>
            );
          })}
        </group>

        {/* 2 Precision Tweezer Sets, Hobby Knife & Hex Key Set (Right side of Row 2) */}
        <group position={[1.1, 0.15, 0.02]}>
          {/* Tweezers */}
          {[-0.35, -0.15].map((twx, twi) => (
            <mesh key={`tweez-${twi}`} position={[twx, 0, 0]} castShadow>
              <boxGeometry args={[0.016, 0.16, 0.008]} />
              <primitive object={blackSteelMaterial} />
            </mesh>
          ))}
          {/* Hobby Knife */}
          <mesh position={[0.08, 0, 0]} castShadow>
            <cylinderGeometry args={[0.008, 0.008, 0.16, 8]} />
            <primitive object={brushedMetalMaterial} />
          </mesh>
          {/* Folding Hex Key Set */}
          <mesh position={[0.30, 0, 0]} castShadow>
            <boxGeometry args={[0.035, 0.12, 0.025]} />
            <meshStandardMaterial color="#DC2626" roughness={0.4} />
          </mesh>
        </group>

        {/* ROW 3 (Y ≈ -0.15m): 3 Solder Wire Coils, 2 Heat-Shrink Rolls, Tape Rolls & Parts Organizer */}
        <group position={[-0.8, -0.15, 0.02]}>
          {/* 3 Solder Coils */}
          {[-0.6, -0.3, 0.0].map((scx, sci) => (
            <mesh key={`scoil-${sci}`} position={[scx, 0, 0]} rotation={[0, 0, Math.PI / 2]} castShadow>
              <cylinderGeometry args={[0.055, 0.055, 0.035, 12]} />
              <primitive object={brushedMetalMaterial} />
            </mesh>
          ))}
          {/* 2 Heat-Shrink Rolls */}
          {[0.3, 0.6].map((hsx, hsi) => (
            <mesh key={`hsroll-${hsi}`} position={[hsx, 0, 0]} rotation={[0, 0, Math.PI / 2]} castShadow>
              <cylinderGeometry args={[0.05, 0.05, 0.03, 12]} />
              <meshStandardMaterial color={hsi === 0 ? '#111827' : '#DC2626'} roughness={0.5} />
            </mesh>
          ))}
        </group>

        {/* 12-Drawer Mini Component Box on Wall (Row 3 Right) */}
        <group position={[1.15, -0.15, 0.05]}>
          <mesh castShadow>
            <boxGeometry args={[0.75, 0.22, 0.08]} />
            <meshStandardMaterial color="#1E293B" roughness={0.4} />
          </mesh>
          {/* Drawers Matrix */}
          <mesh position={[0, 0, 0.041]}>
            <planeGeometry args={[0.73, 0.20]} />
            <meshBasicMaterial map={drawerTexture} toneMapped={false} />
          </mesh>
        </group>

        {/* ROW 4 (Y ≈ -0.45m): Spools of Hook-up Wire on Rod, Flush Cutters & Desoldering Pump */}
        <group position={[-0.7, -0.45, 0.02]}>
          {/* Metal Spool Mounting Rod */}
          <mesh position={[0, 0, 0.04]} rotation={[0, 0, Math.PI / 2]}>
            <cylinderGeometry args={[0.006, 0.006, 1.1, 8]} />
            <primitive object={brushedMetalMaterial} />
          </mesh>
          {/* Red, Black, Blue Wire Spools */}
          {[-0.35, 0.0, 0.35].map((wx, wi) => (
            <mesh key={`wspool-${wi}`} position={[wx, 0, 0.04]} rotation={[0, 0, Math.PI / 2]} castShadow>
              <cylinderGeometry args={[0.05, 0.05, 0.065, 12]} />
              <meshStandardMaterial color={wi === 0 ? '#DC2626' : wi === 1 ? '#111827' : '#2563EB'} roughness={0.4} />
            </mesh>
          ))}
        </group>

        {/* Flush Cutters & Desoldering Pump (Row 4 Right) */}
        <group position={[1.0, -0.45, 0.02]}>
          <mesh position={[-0.2, 0, 0]} castShadow>
            <boxGeometry args={[0.06, 0.14, 0.015]} />
            <meshStandardMaterial color="#0284C7" roughness={0.4} />
          </mesh>
          {/* Desoldering Aluminium Suction Pump */}
          <mesh position={[0.2, 0, 0]} castShadow>
            <cylinderGeometry args={[0.015, 0.015, 0.22, 10]} />
            <meshStandardMaterial color="#38BDF8" metalness={0.8} roughness={0.25} />
          </mesh>
        </group>
      </group>

      {/* 3B. SHELF ABOVE BENCH (Y = 0.88m, Z: 7.8 to 11.6, width 3.8m, depth 0.28m) */}
      <group position={[labX + 0.18, 0.88, 9.7]}>
        {/* Oak Shelf Board */}
        <mesh castShadow receiveShadow>
          <boxGeometry args={[0.28, 0.03, 3.80]} />
          <primitive object={oakMaterial} />
        </mesh>

        {/* INSTRUMENTS RESTING ON SHELF */}
        {/* Instrument 1: Digital Storage Oscilloscope (Z = -1.35) */}
        <group position={[0.01, 0.12, -1.35]}>
          <mesh castShadow>
            <boxGeometry args={[0.24, 0.20, 0.40]} />
            <primitive object={whitePlasticMaterial} />
          </mesh>
          <mesh position={[0.121, 0, 0]} rotation={[0, Math.PI / 2, 0]}>
            <planeGeometry args={[0.39, 0.19]} />
            <meshBasicMaterial map={scopeTexture} toneMapped={false} />
          </mesh>
        </group>

        {/* Instrument 2: Digital Storage Oscilloscope (Z = -0.75) */}
        <group position={[0.01, 0.12, -0.75]}>
          <mesh castShadow>
            <boxGeometry args={[0.24, 0.20, 0.40]} />
            <primitive object={whitePlasticMaterial} />
          </mesh>
          <mesh position={[0.121, 0, 0]} rotation={[0, Math.PI / 2, 0]}>
            <planeGeometry args={[0.39, 0.19]} />
            <meshBasicMaterial map={scopeTexture} toneMapped={false} />
          </mesh>
        </group>

        {/* Instrument 3: Bench DC Power Supply (Z = -0.15) */}
        <group position={[0.01, 0.11, -0.15]}>
          <mesh castShadow>
            <boxGeometry args={[0.24, 0.18, 0.36]} />
            <primitive object={whitePlasticMaterial} />
          </mesh>
          <mesh position={[0.121, 0, 0]} rotation={[0, Math.PI / 2, 0]}>
            <planeGeometry args={[0.35, 0.17]} />
            <meshBasicMaterial map={psuTexture} toneMapped={false} />
          </mesh>
        </group>

        {/* Instrument 4: Bench DC Power Supply (Z = +0.40) */}
        <group position={[0.01, 0.11, 0.40]}>
          <mesh castShadow>
            <boxGeometry args={[0.24, 0.18, 0.36]} />
            <primitive object={whitePlasticMaterial} />
          </mesh>
          <mesh position={[0.121, 0, 0]} rotation={[0, Math.PI / 2, 0]}>
            <planeGeometry args={[0.35, 0.17]} />
            <meshBasicMaterial map={psuTexture} toneMapped={false} />
          </mesh>
        </group>

        {/* Instrument 5: Function Generator (Z = +0.95) */}
        <group position={[0.01, 0.10, 0.95]}>
          <mesh castShadow>
            <boxGeometry args={[0.24, 0.16, 0.36]} />
            <primitive object={whitePlasticMaterial} />
          </mesh>
          <mesh position={[0.121, 0, 0]} rotation={[0, Math.PI / 2, 0]}>
            <planeGeometry args={[0.35, 0.15]} />
            <meshBasicMaterial map={funcGenTexture} toneMapped={false} />
          </mesh>
        </group>

        {/* Instrument 6: Bench Digital Multimeter (Z = +1.48) */}
        <group position={[0.01, 0.10, 1.48]}>
          <mesh castShadow>
            <boxGeometry args={[0.24, 0.16, 0.34]} />
            <primitive object={whitePlasticMaterial} />
          </mesh>
          <mesh position={[0.121, 0, 0]} rotation={[0, Math.PI / 2, 0]}>
            <planeGeometry args={[0.33, 0.15]} />
            <meshBasicMaterial map={benchDmmTexture} toneMapped={false} />
          </mesh>
        </group>
      </group>

      {/* 3C. SOLDERING WORKBENCH (Y = 0.78m, depth 0.85m, length 4.2m, Z: 7.6 to 11.8) */}
      <group position={[labX + 0.45, 0, 9.7]}>
        {/* Light Oak Bench Top */}
        <mesh position={[0, 0.76, 0]} castShadow receiveShadow>
          <boxGeometry args={[0.85, 0.045, 4.20]} />
          <primitive object={oakMaterial} />
        </mesh>

        {/* Black Matte Steel Box Frame Legs & Under-bench Cable Tray */}
        {[-1.95, -0.65, 0.65, 1.95].map((lz, li) => (
          <group key={`s-leg-${li}`}>
            <mesh position={[-0.38, 0.37, lz]} castShadow>
              <boxGeometry args={[0.045, 0.74, 0.045]} />
              <primitive object={blackSteelMaterial} />
            </mesh>
            <mesh position={[0.38, 0.37, lz]} castShadow>
              <boxGeometry args={[0.045, 0.74, 0.045]} />
              <primitive object={blackSteelMaterial} />
            </mesh>
          </group>
        ))}
        {/* Lower Cable Tray Rail under benchtop */}
        <mesh position={[0, 0.71, 0]}>
          <boxGeometry args={[0.30, 0.03, 4.10]} />
          <primitive object={blackSteelMaterial} />
        </mesh>

        {/* 3 HAKKO-BLUE DIGITAL SOLDERING STATIONS (at Z = -1.2, 0.0, +1.0) */}
        {[-1.2, 0.0, 1.0].map((sz, si) => (
          <group key={`s-station-${si}`} position={[0.12, 0.785, sz]}>
            {/* Station Base Unit */}
            <mesh position={[0, 0.05, 0]} castShadow>
              <boxGeometry args={[0.18, 0.10, 0.18]} />
              <primitive object={hakkoBlueMaterial} />
            </mesh>
            {/* Dark Front Panel with 350°C LCD Screen */}
            <mesh position={[0.091, 0.05, 0]} rotation={[0, Math.PI / 2, 0]}>
              <planeGeometry args={[0.16, 0.08]} />
              <meshBasicMaterial map={solderingLcdTexture} toneMapped={false} />
            </mesh>

            {/* Brass Coil Spring Iron Holder & Soldering Iron */}
            <group position={[-0.04, 0.08, 0.16]} rotation={[0.4, 0, 0]}>
              <mesh castShadow>
                <cylinderGeometry args={[0.022, 0.016, 0.14, 10]} />
                <primitive object={blackSteelMaterial} />
              </mesh>
              {/* Soldering Iron Handle & Tip */}
              <mesh position={[0, 0.06, 0]}>
                <cylinderGeometry args={[0.012, 0.012, 0.16, 8]} />
                <primitive object={hakkoBlueMaterial} />
              </mesh>
              <mesh position={[0, -0.09, 0]}>
                <coneGeometry args={[0.004, 0.03, 6]} />
                <primitive object={brushedMetalMaterial} />
              </mesh>
            </group>

            {/* Curved Black Cable from Iron to Station Base */}
            <mesh position={[-0.02, 0.04, 0.08]} rotation={[0.3, 0.5, 0]}>
              <cylinderGeometry args={[0.003, 0.003, 0.16, 6]} />
              <primitive object={blackSteelMaterial} />
            </mesh>

            {/* Brass Tip Cleaner Cup with Gold Wool Sponge */}
            <mesh position={[-0.04, 0.03, -0.16]} castShadow>
              <cylinderGeometry args={[0.035, 0.03, 0.05, 10]} />
              <primitive object={blackSteelMaterial} />
            </mesh>
            <mesh position={[-0.04, 0.055, -0.16]}>
              <sphereGeometry args={[0.028, 8, 8]} />
              <meshStandardMaterial color="#F59E0B" roughness={0.9} />
            </mesh>
          </group>
        ))}

        {/* 2 ARTICULATED FUME EXTRACTOR ARMS (Mounted over stations at Z = -0.6, +0.6) */}
        {[-0.6, 0.6].map((fz, fi) => (
          <group key={`fume-arm-${fi}`} position={[-0.30, 0.785, fz]}>
            {/* Bench Clamp Base */}
            <mesh position={[0, 0.05, 0]} castShadow>
              <boxGeometry args={[0.08, 0.10, 0.08]} />
              <primitive object={blackSteelMaterial} />
            </mesh>
            {/* Lower Segment */}
            <mesh position={[0.06, 0.22, 0]} rotation={[0, 0, -0.3]} castShadow>
              <cylinderGeometry args={[0.02, 0.02, 0.28, 8]} />
              <meshStandardMaterial color="#64748B" roughness={0.4} />
            </mesh>
            {/* Articulated Joint */}
            <mesh position={[0.13, 0.35, 0]} castShadow>
              <sphereGeometry args={[0.028, 8, 8]} />
              <primitive object={blackSteelMaterial} />
            </mesh>
            {/* Upper Segment & Exhaust Hood */}
            <mesh position={[0.22, 0.44, 0]} rotation={[0, 0, -0.8]} castShadow>
              <cylinderGeometry args={[0.02, 0.02, 0.24, 8]} />
              <meshStandardMaterial color="#64748B" roughness={0.4} />
            </mesh>
            {/* Clear Conical Suction Hood */}
            <mesh position={[0.32, 0.48, 0]} rotation={[0, 0, 1.2]} castShadow>
              <coneGeometry args={[0.075, 0.09, 10, 1, true]} />
              <meshStandardMaterial color="#E2E8F0" transparent opacity={0.5} roughness={0.2} side={2} />
            </mesh>
          </group>
        ))}

        {/* BLUE SILICONE ESD WORK MAT */}
        <mesh position={[0.12, 0.785, -0.5]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
          <planeGeometry args={[0.42, 0.65]} />
          <meshBasicMaterial map={matTexture} toneMapped={false} />
        </mesh>

        {/* HELPING HANDS WITH MAGNIFIER & PCB HOLDER */}
        <group position={[0.10, 0.81, -0.5]}>
          {/* Heavy Cast-Iron Base */}
          <mesh castShadow>
            <boxGeometry args={[0.07, 0.025, 0.07]} />
            <primitive object={blackSteelMaterial} />
          </mesh>
          {/* Crossbar & Alligator Arms */}
          <mesh position={[0, 0.06, 0]}>
            <cylinderGeometry args={[0.005, 0.005, 0.14, 6]} />
            <primitive object={brushedMetalMaterial} />
          </mesh>
          {/* Magnifying Glass */}
          <mesh position={[0.02, 0.12, 0]} rotation={[0.4, 0, 0]}>
            <torusGeometry args={[0.035, 0.006, 6, 12]} />
            <primitive object={blackSteelMaterial} />
          </mesh>
        </group>

        {/* ADJUSTABLE PCB HOLDER CLAMPING GREEN CIRCUIT BOARD */}
        <group position={[0.15, 0.81, 0.4]}>
          <mesh castShadow>
            <boxGeometry args={[0.08, 0.03, 0.18]} />
            <primitive object={blackSteelMaterial} />
          </mesh>
          {/* Clamped Green PCB */}
          <mesh position={[0, 0.05, 0]} rotation={[0.3, 0, 0]} castShadow>
            <boxGeometry args={[0.07, 0.005, 0.12]} />
            <meshStandardMaterial color="#15803D" roughness={0.4} />
          </mesh>
        </group>

        {/* 2 HANDHELD DIGITAL MULTIMETERS (Rounded Yellow Bodies with Leads) */}
        {/* Multimeter 1: Angled on stand (Z = -1.65) */}
        <group position={[0.22, 0.83, -1.65]} rotation={[-0.4, 0.2, 0]}>
          <mesh castShadow>
            <boxGeometry args={[0.05, 0.18, 0.10]} />
            <primitive object={yellowFlukeMaterial} />
          </mesh>
          <mesh position={[0.026, 0, 0]} rotation={[0, Math.PI / 2, 0]}>
            <planeGeometry args={[0.09, 0.17]} />
            <meshBasicMaterial map={handheldDmmTexture} toneMapped={false} />
          </mesh>
        </group>
        {/* Multimeter 2: Lying flat on bench (Z = +0.55) */}
        <group position={[0.24, 0.80, 0.55]} rotation={[-Math.PI / 2, 0, 0.2]}>
          <mesh castShadow>
            <boxGeometry args={[0.05, 0.18, 0.10]} />
            <primitive object={yellowFlukeMaterial} />
          </mesh>
          <mesh position={[0.026, 0, 0]} rotation={[0, Math.PI / 2, 0]}>
            <planeGeometry args={[0.09, 0.17]} />
            <meshBasicMaterial map={handheldDmmTexture} toneMapped={false} />
          </mesh>
        </group>

        {/* TRINOCULAR STEREO INSPECTION MICROSCOPE (Right End, Z = +1.75) */}
        <group position={[0.08, 0.785, 1.75]}>
          {/* Heavy Steel Base Plate */}
          <mesh position={[0, 0.015, 0]} castShadow>
            <boxGeometry args={[0.26, 0.03, 0.26]} />
            <primitive object={blackSteelMaterial} />
          </mesh>
          {/* Vertical Boom Stand Pole */}
          <mesh position={[-0.08, 0.22, 0]} castShadow>
            <cylinderGeometry args={[0.018, 0.018, 0.40, 10]} />
            <primitive object={brushedMetalMaterial} />
          </mesh>
          {/* Horizontal Boom Arm */}
          <mesh position={[0.02, 0.36, 0]} rotation={[0, 0, Math.PI / 2]} castShadow>
            <cylinderGeometry args={[0.015, 0.015, 0.22, 10]} />
            <primitive object={brushedMetalMaterial} />
          </mesh>
          {/* White Microscope Optical Body */}
          <mesh position={[0.08, 0.30, 0]} castShadow>
            <cylinderGeometry args={[0.045, 0.035, 0.14, 10]} />
            <primitive object={whitePlasticMaterial} />
          </mesh>
          {/* Dual Widefield Eyepieces */}
          <mesh position={[0.07, 0.40, -0.022]} rotation={[0.4, 0, 0]}>
            <cylinderGeometry args={[0.012, 0.012, 0.08, 8]} />
            <primitive object={blackSteelMaterial} />
          </mesh>
          <mesh position={[0.07, 0.40, 0.022]} rotation={[-0.4, 0, 0]}>
            <cylinderGeometry args={[0.012, 0.012, 0.08, 8]} />
            <primitive object={blackSteelMaterial} />
          </mesh>
          {/* Ring Light Illuminator */}
          <mesh position={[0.08, 0.22, 0]}>
            <torusGeometry args={[0.035, 0.008, 6, 12]} />
            <meshStandardMaterial color="#FFFFFF" emissive="#FFFFFF" emissiveIntensity={3.0} />
          </mesh>
        </group>
      </group>

      {/* 3D. UNDER-BENCH STORAGE BINS (Z: 7.8 to 11.6, Instanced Clear Bins) */}
      <group position={[labX + 0.45, 0.16, 9.7]}>
        {[
          { label: 'WIRES', lid: '#0284C7', z: -1.4 },
          { label: 'PCBs', lid: '#10B981', z: -0.8 },
          { label: 'SPARES', lid: '#F59E0B', z: -0.2 },
          { label: 'CONNECTORS', lid: '#8B5CF6', z: 0.4 },
          { label: 'FUSES', lid: '#DC2626', z: 1.0 },
          { label: 'HARDWARE', lid: '#0369A1', z: 1.5 },
        ].map((bin, bi) => (
          <group key={`ubin-${bi}`} position={[0, 0, bin.z]}>
            {/* Bin Body (Opacity 0.45, clearly visible) */}
            <mesh castShadow>
              <boxGeometry args={[0.48, 0.24, 0.44]} />
              <primitive object={clearBinMaterial} />
            </mesh>
            {/* White Rim & Coloured Lid */}
            <mesh position={[0, 0.125, 0]} castShadow>
              <boxGeometry args={[0.49, 0.02, 0.45]} />
              <meshStandardMaterial color={bin.lid} roughness={0.3} />
            </mesh>
            {/* Printed Label */}
            <mesh position={[0.246, 0.02, 0]} rotation={[0, Math.PI / 2, 0]}>
              <planeGeometry args={[0.22, 0.08]} />
              <meshBasicMaterial map={getBinLabelTexture(bin.label)} toneMapped={false} />
            </mesh>
            {/* Visible parts inside */}
            <mesh position={[0, -0.06, 0]}>
              <boxGeometry args={[0.32, 0.08, 0.30]} />
              <meshStandardMaterial color={bin.lid} roughness={0.7} />
            </mesh>
          </group>
        ))}
      </group>

      {/* Realistic Potted Floor Plant at Front Wall End (Z = 11.8m) */}
      <group position={[labX + 0.45, 0, 11.8]}>
        <mesh position={[0, 0.15, 0]} castShadow>
          <cylinderGeometry args={[0.125, 0.10, 0.30, 14]} />
          <primitive object={whitePlasticMaterial} />
        </mesh>
        <mesh position={[0, 0.29, 0]}>
          <cylinderGeometry args={[0.11, 0.11, 0.02, 14]} />
          <meshStandardMaterial color="#2B1D0C" roughness={0.9} />
        </mesh>
        {[0, 0.52, 1.04, 1.57, 2.09, 2.61, 3.14, 3.66, 4.18, 4.71, 5.23, 5.75].map((rot, ri) => (
          <mesh key={`pblade-f-${ri}`} position={[0, 0.30, 0]} rotation={[0.45, rot, 0]} castShadow>
            <planeGeometry args={[0.06, 0.32]} />
            <meshStandardMaterial color={ri % 2 === 0 ? '#15803D' : '#16A34A'} roughness={0.55} side={2} />
          </mesh>
        ))}
      </group>
    </group>
  );
}
