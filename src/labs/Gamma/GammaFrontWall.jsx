import React, { useMemo } from 'react';
import * as THREE from 'three';
import {
  getWoodGrainTexture,
  getDrawerCabinetTexture,
  getOscilloscopeTexture,
  getBenchPsuTexture,
  getHandheldMultimeterTexture,
  getRPi5BoxTexture,
  getArduinoBoxTexture,
  getESP32BoxTexture,
} from '../Beta/betaTextures';

/**
 * Gamma Front Wall (Z = 12.0, X: 33.5 to 43.5) — Revision 16
 * Two Connected 5-Tier Shelving Units:
 * 1. HARDWARE ZONE (X: 33.5 to 38.5, 5m): Robot cars, 6-DOF robot arms, quadcopters, retail dev boxes, bins
 * 2. ELECTRONICS ZONE (X: 38.5 to 43.5, 5m): Labeled component bins, 24-drawer SMD cabinet, dual oscilloscopes, PSUs, breadboards, multimeters
 * Fully stocked with 5-8 items per level on every tier.
 */
export function GammaFrontWall() {
  const woodTexture = useMemo(() => getWoodGrainTexture(), []);
  const drawerTexture = useMemo(() => getDrawerCabinetTexture(), []);
  const scopeTexture = useMemo(() => getOscilloscopeTexture(), []);
  const psuTexture = useMemo(() => getBenchPsuTexture(), []);
  const flukeTexture = useMemo(() => getHandheldMultimeterTexture(), []);
  const rpi5Texture = useMemo(() => getRPi5BoxTexture(), []);
  const arduinoTexture = useMemo(() => getArduinoBoxTexture(), []);
  const esp32Texture = useMemo(() => getESP32BoxTexture(), []);

  // Shared Materials
  const oakMaterial = useMemo(
    () => new THREE.MeshStandardMaterial({ map: woodTexture, roughness: 0.55, metalness: 0.05 }),
    [woodTexture]
  );
  const blackSteelMaterial = useMemo(
    () => new THREE.MeshStandardMaterial({ color: '#161C24', metalness: 0.85, roughness: 0.28 }),
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
  const yellowPlasticMaterial = useMemo(
    () => new THREE.MeshStandardMaterial({ color: '#FACC15', roughness: 0.35 }),
    []
  );
  const blueRobotMaterial = useMemo(
    () => new THREE.MeshStandardMaterial({ color: '#0284C7', roughness: 0.3 }),
    []
  );
  const orangeAccentMaterial = useMemo(
    () => new THREE.MeshStandardMaterial({ color: '#F97316', roughness: 0.35 }),
    []
  );

  return (
    <group name="gamma-front-wall" position={[38.5, 0, 11.6]}>
      {/* Navy Backing Wall Overlay (facing -Z into room) */}
      <mesh position={[0, 1.8, 0.35]} rotation={[0, Math.PI, 0]} receiveShadow>
        <planeGeometry args={[10.5, 3.6]} />
        <meshStandardMaterial color="#071B3A" roughness={0.35} metalness={0.15} />
      </mesh>

      {/* ================================================================
          1. HARDWARE ZONE UNIT (Left side, X: -5.0 to 0.0 -> Global 33.5 to 38.5)
          5 Tiers (Y = 0.22, 0.68, 1.15, 1.62, 2.08)
         ================================================================ */}
      <group position={[-2.5, 0, 0]}>
        {/* 5 Oak Shelves with Warm LED Under-Strips */}
        {[0.22, 0.68, 1.15, 1.62, 2.08].map((sy, i) => (
          <group key={`hw-tier-${i}`}>
            <mesh position={[0, sy, 0]} castShadow receiveShadow>
              <boxGeometry args={[4.8, 0.035, 0.55]} />
              <primitive object={oakMaterial} />
            </mesh>
            <mesh position={[0, sy - 0.02, 0]}>
              <boxGeometry args={[4.7, 0.012, 0.50]} />
              <primitive object={warmLedMaterial} />
            </mesh>
          </group>
        ))}

        {/* Steel Uprights (Black 40mm) */}
        {[-2.35, -0.8, 0.8, 2.35].map((ux, ui) => (
          <group key={`hw-upright-${ui}`} position={[ux, 1.15, 0]}>
            <mesh position={[0, 0, -0.24]} castShadow>
              <boxGeometry args={[0.04, 2.3, 0.04]} />
              <primitive object={blackSteelMaterial} />
            </mesh>
            <mesh position={[0, 0, 0.24]} castShadow>
              <boxGeometry args={[0.04, 2.3, 0.04]} />
              <primitive object={blackSteelMaterial} />
            </mesh>
          </group>
        ))}

        {/* Hardware Stocking (5 to 8 items per level): */}
        {/* Tier 1 (Y=0.22): 6 Clear Storage Bins with Heavy Components */}
        {[-1.85, -1.1, -0.37, 0.37, 1.1, 1.85].map((bx, bi) => (
          <group key={`hw-bin-${bi}`} position={[bx, 0.34, 0]}>
            <mesh castShadow>
              <boxGeometry args={[0.55, 0.20, 0.42]} />
              <primitive object={clearBinMaterial} />
            </mesh>
            <mesh position={[0, 0.105, 0]}>
              <boxGeometry args={[0.56, 0.015, 0.43]} />
              <primitive object={blackSteelMaterial} />
            </mesh>
          </group>
        ))}

        {/* Tier 2 (Y=0.68): 4 Autonomous 4WD Robot Cars + 2 Robotic Gripper Arms (6 items) */}
        {[-1.8, -1.0, 1.0, 1.8].map((cx, ci) => (
          <group key={`hw-car-${ci}`} position={[cx, 0.78, 0]}>
            <mesh castShadow>
              <boxGeometry args={[0.34, 0.09, 0.26]} />
              <primitive object={blueRobotMaterial} />
            </mesh>
            {/* Ultrasonic Sensor Eyes */}
            <mesh position={[0, 0.06, -0.13]}>
              <cylinderGeometry args={[0.02, 0.02, 0.04, 8]} />
              <meshStandardMaterial color="#94A3B8" />
            </mesh>
            {/* 4 Yellow Wheels */}
            {[-0.18, 0.18].map((wx, wi) => (
              <group key={`car-w-${wi}`} position={[wx, 0, 0]}>
                <mesh position={[0, 0, -0.14]} rotation={[Math.PI / 2, 0, 0]}>
                  <cylinderGeometry args={[0.045, 0.045, 0.035, 10]} />
                  <primitive object={yellowPlasticMaterial} />
                </mesh>
                <mesh position={[0, 0, 0.14]} rotation={[Math.PI / 2, 0, 0]}>
                  <cylinderGeometry args={[0.045, 0.045, 0.035, 10]} />
                  <primitive object={yellowPlasticMaterial} />
                </mesh>
              </group>
            ))}
          </group>
        ))}
        {/* 2 Robotic Manipulator Arms on Tier 2 */}
        {[-0.35, 0.35].map((rx, ri) => (
          <group key={`hw-arm-${ri}`} position={[rx, 0.72, 0]}>
            <mesh position={[0, 0.03, 0]} castShadow>
              <cylinderGeometry args={[0.08, 0.09, 0.06, 12]} />
              <meshStandardMaterial color="#0F172A" metalness={0.7} />
            </mesh>
            {/* Lower arm segment */}
            <mesh position={[0, 0.14, 0.03]} rotation={[0.4, 0, 0]} castShadow>
              <boxGeometry args={[0.04, 0.18, 0.04]} />
              <primitive object={orangeAccentMaterial} />
            </mesh>
            {/* Upper arm segment & gripper */}
            <mesh position={[0, 0.26, -0.02]} rotation={[-0.5, 0, 0]} castShadow>
              <boxGeometry args={[0.035, 0.16, 0.035]} />
              <meshStandardMaterial color="#E2E8F0" metalness={0.6} />
            </mesh>
          </group>
        ))}

        {/* Tier 3 (Y=1.15): 3 Quadcopter Drones + 3 Stepper Motor Gear Assemblies (6 items) */}
        {[-1.5, 0, 1.5].map((dx, di) => (
          <group key={`drone-${di}`} position={[dx, 1.25, 0]}>
            <mesh castShadow>
              <boxGeometry args={[0.12, 0.05, 0.12]} />
              <meshStandardMaterial color="#0F172A" />
            </mesh>
            <mesh rotation={[0, Math.PI / 4, 0]}>
              <boxGeometry args={[0.38, 0.015, 0.02]} />
              <meshStandardMaterial color="#1E293B" metalness={0.8} />
            </mesh>
            <mesh rotation={[0, -Math.PI / 4, 0]}>
              <boxGeometry args={[0.38, 0.015, 0.02]} />
              <meshStandardMaterial color="#1E293B" metalness={0.8} />
            </mesh>
            {[-0.13, 0.13].map((mx, mi) => (
              <mesh key={`m-${mi}`} position={[mx, 0.02, mx]}>
                <cylinderGeometry args={[0.016, 0.016, 0.025, 8]} />
                <meshStandardMaterial color="#0284C7" />
              </mesh>
            ))}
          </group>
        ))}
        {/* 3 Stepper Motor Units between drones */}
        {[-0.75, 0.75, 2.05].map((sx, si) => (
          <group key={`motor-unit-${si}`} position={[sx, 1.24, 0]}>
            <mesh castShadow>
              <boxGeometry args={[0.12, 0.12, 0.12]} />
              <meshStandardMaterial color="#334155" metalness={0.85} roughness={0.25} />
            </mesh>
            <mesh position={[0, 0, -0.08]} rotation={[Math.PI / 2, 0, 0]}>
              <cylinderGeometry args={[0.015, 0.015, 0.05, 8]} />
              <meshStandardMaterial color="#CBD5E1" metalness={0.9} />
            </mesh>
          </group>
        ))}

        {/* Tier 4 (Y=1.62): 7 Retail Dev Boxes (RPi5, Arduino, ESP32) + 1 Assembled Carrier (8 items) */}
        {[-1.9, -1.35, -0.8, -0.25, 0.3, 0.85, 1.4, 1.95].map((bx, bi) => (
          <mesh key={`hw-box-${bi}`} position={[bx, 1.72, 0]} castShadow>
            <boxGeometry args={[0.22, 0.15, 0.18]} />
            <meshStandardMaterial
              map={bi % 3 === 0 ? rpi5Texture : bi % 3 === 1 ? arduinoTexture : esp32Texture}
              roughness={0.3}
            />
          </mesh>
        ))}

        {/* Tier 5 (Y=2.08 Top): 6 Trailing Potted Foliage Units */}
        {[-2.0, -1.2, -0.4, 0.4, 1.2, 2.0].map((px, pi) => (
          <group key={`hw-plant-${pi}`} position={[px, 2.22, 0]}>
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
      </group>

      {/* ================================================================
          2. ELECTRONICS ZONE UNIT (Right side, X: 0.0 to 5.0 -> Global 38.5 to 43.5)
          5 Tiers matching Hardware Unit (5 to 8 items per level)
         ================================================================ */}
      <group position={[2.5, 0, 0]}>
        {/* 5 Oak Shelves */}
        {[0.22, 0.68, 1.15, 1.62, 2.08].map((sy, i) => (
          <group key={`el-tier-${i}`}>
            <mesh position={[0, sy, 0]} castShadow receiveShadow>
              <boxGeometry args={[4.8, 0.035, 0.55]} />
              <primitive object={oakMaterial} />
            </mesh>
            <mesh position={[0, sy - 0.02, 0]}>
              <boxGeometry args={[4.7, 0.012, 0.50]} />
              <primitive object={warmLedMaterial} />
            </mesh>
          </group>
        ))}

        {/* Steel Uprights */}
        {[-2.35, -0.8, 0.8, 2.35].map((ux, ui) => (
          <group key={`el-upright-${ui}`} position={[ux, 1.15, 0]}>
            <mesh position={[0, 0, -0.24]} castShadow>
              <boxGeometry args={[0.04, 2.3, 0.04]} />
              <primitive object={blackSteelMaterial} />
            </mesh>
            <mesh position={[0, 0, 0.24]} castShadow>
              <boxGeometry args={[0.04, 2.3, 0.04]} />
              <primitive object={blackSteelMaterial} />
            </mesh>
          </group>
        ))}

        {/* Electronics Stocking: */}
        {/* Tier 1 (Y=0.22): 6 Clear Labeled Component Bins */}
        {[-1.85, -1.1, -0.37, 0.37, 1.1, 1.85].map((bx, bi) => (
          <group key={`el-bin-${bi}`} position={[bx, 0.34, 0]}>
            <mesh castShadow>
              <boxGeometry args={[0.55, 0.20, 0.42]} />
              <primitive object={clearBinMaterial} />
            </mesh>
            <mesh position={[0, 0.105, 0]}>
              <boxGeometry args={[0.56, 0.015, 0.43]} />
              <primitive object={blackSteelMaterial} />
            </mesh>
          </group>
        ))}

        {/* Tier 2 (Y=0.68): 24-Drawer SMD Cabinet (Center) + 4 Solderless Breadboards + 2 Wire Spools (7 items) */}
        <group position={[-0.8, 0.94, 0]}>
          <mesh castShadow>
            <boxGeometry args={[1.2, 0.48, 0.32]} />
            <meshStandardMaterial color="#1E293B" roughness={0.4} />
          </mesh>
          <mesh position={[0, 0, -0.165]} rotation={[0, Math.PI, 0]}>
            <planeGeometry args={[1.16, 0.44]} />
            <meshBasicMaterial map={drawerTexture} toneMapped={false} />
          </mesh>
        </group>
        {/* 4 Breadboards */}
        <group position={[0.9, 0.80, 0]}>
          {[-0.15, -0.05, 0.05, 0.15].map((bz, bi) => (
            <mesh key={`bb-${bi}`} position={[0, 0.04, bz]} castShadow>
              <boxGeometry args={[0.55, 0.025, 0.08]} />
              <meshStandardMaterial color="#F8FAFC" roughness={0.3} />
            </mesh>
          ))}
        </group>
        {/* 2 Heavy Wire Spool Dispensers */}
        {[1.8, 2.05].map((sx, si) => (
          <group key={`spool-disp-${si}`} position={[sx, 0.80, 0]}>
            <mesh rotation={[0, 0, Math.PI / 2]} castShadow>
              <cylinderGeometry args={[0.07, 0.07, 0.10, 12]} />
              <meshStandardMaterial color={si === 0 ? '#DC2626' : '#2563EB'} roughness={0.4} />
            </mesh>
          </group>
        ))}

        {/* Tier 3 (Y=1.15): 2 Bench Oscilloscopes + 2 Bench PSUs + 2 Function Generators (6 items) */}
        {/* Oscilloscope 1 */}
        <mesh position={[-1.7, 1.30, 0]} castShadow>
          <boxGeometry args={[0.42, 0.24, 0.26]} />
          <meshStandardMaterial map={scopeTexture} roughness={0.3} />
        </mesh>
        {/* PSU 1 */}
        <mesh position={[-1.0, 1.28, 0]} castShadow>
          <boxGeometry args={[0.34, 0.22, 0.26]} />
          <meshStandardMaterial map={psuTexture} roughness={0.3} />
        </mesh>
        {/* Function Gen 1 */}
        <mesh position={[-0.3, 1.27, 0]} castShadow>
          <boxGeometry args={[0.32, 0.20, 0.24]} />
          <meshStandardMaterial color="#334155" metalness={0.7} roughness={0.3} />
        </mesh>
        {/* Oscilloscope 2 */}
        <mesh position={[0.4, 1.30, 0]} castShadow>
          <boxGeometry args={[0.42, 0.24, 0.26]} />
          <meshStandardMaterial map={scopeTexture} roughness={0.3} />
        </mesh>
        {/* PSU 2 */}
        <mesh position={[1.1, 1.28, 0]} castShadow>
          <boxGeometry args={[0.34, 0.22, 0.26]} />
          <meshStandardMaterial map={psuTexture} roughness={0.3} />
        </mesh>
        {/* Function Gen 2 */}
        <mesh position={[1.8, 1.27, 0]} castShadow>
          <boxGeometry args={[0.32, 0.20, 0.24]} />
          <meshStandardMaterial color="#334155" metalness={0.7} roughness={0.3} />
        </mesh>

        {/* Tier 4 (Y=1.62): 5 Fluke Multimeters + 3 Sensor Test Modules (8 items) */}
        {[-1.8, -1.2, -0.6, 0.0, 0.6].map((mx, mi) => (
          <mesh key={`el-meter-${mi}`} position={[mx, 1.72, 0]} castShadow>
            <boxGeometry args={[0.22, 0.08, 0.16]} />
            <meshBasicMaterial map={flukeTexture} toneMapped={false} />
          </mesh>
        ))}
        {/* 3 Sensor Test Module Stands */}
        {[1.1, 1.5, 1.9].map((sx, si) => (
          <group key={`sensor-stand-${si}`} position={[sx, 1.70, 0]}>
            <mesh castShadow>
              <boxGeometry args={[0.18, 0.04, 0.14]} />
              <meshStandardMaterial color="#1E293B" metalness={0.8} />
            </mesh>
            <mesh position={[0, 0.04, 0]}>
              <cylinderGeometry args={[0.02, 0.02, 0.04, 8]} />
              <meshStandardMaterial color="#10B981" />
            </mesh>
          </group>
        ))}

        {/* Tier 5 (Y=2.08 Top): 6 Trailing Potted Foliage Units */}
        {[-2.0, -1.2, -0.4, 0.4, 1.2, 2.0].map((px, pi) => (
          <group key={`el-plant-${pi}`} position={[px, 2.22, 0]}>
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
      </group>
    </group>
  );
}