import React, { useMemo } from 'react';
import * as THREE from 'three';
import {
  getGammaPrinterH2DTexture,
} from './gammaTextures';
import {
  getWoodGrainTexture,
  getBambuScreenTexture,
} from '../Beta/betaTextures';

/**
 * Gamma 3D Printing Zone (Revision 12)
 * Positioned along the back wall wrapping into the Designing Zone:
 * Global X = 43.5 to 47.5, Z = 0.5 to 1.1 (bench along back wall).
 * Features:
 * - Premium enclosed black printer (Bambu Lab H2D / X1 style with glass door & glowing chamber)
 * - White Bambu Lab A1-class printer
 * - Filament spool rack (red, yellow, blue, green, orange)
 * - Prototype display shelf (white and orange 3D prints)
 * - Bench front panel carrying "3D Printing Zone" with 3D cube / printer icon
 */
export function Gamma3DPrintingZone() {
  const woodTexture = useMemo(() => getWoodGrainTexture(), []);
  const h2dTexture = useMemo(() => getGammaPrinterH2DTexture(), []);
  const a1ScreenTexture = useMemo(() => getBambuScreenTexture(), []);

  // Shared Materials
  const oakMaterial = useMemo(
    () => new THREE.MeshStandardMaterial({ map: woodTexture, roughness: 0.55, metalness: 0.05 }),
    [woodTexture]
  );
  const blackSteelMaterial = useMemo(
    () => new THREE.MeshStandardMaterial({ color: '#161C24', metalness: 0.85, roughness: 0.28 }),
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
  const brushedMetalMaterial = useMemo(
    () => new THREE.MeshStandardMaterial({ color: '#CBD5E1', metalness: 0.9, roughness: 0.2 }),
    []
  );

  return (
    <group name="gamma-3d-printing-zone" position={[45.2, 0, 6.2]}>
      {/* ================================================================
          1. STEEL & OAK WORKBENCH (3.8m long x 0.75m deep, Y = 0.88m)
         ================================================================ */}
      <mesh position={[0, 0.86, 0]} castShadow receiveShadow>
        <boxGeometry args={[3.8, 0.045, 0.75]} />
        <primitive object={oakMaterial} />
      </mesh>

      {/* Front Skirt / Panel with "3D Printing Zone" & Blue Underglow */}
      <mesh position={[0, 0.43, 0.36]} castShadow>
        <boxGeometry args={[3.76, 0.82, 0.025]} />
        <meshStandardMaterial color="#071B3A" roughness={0.3} metalness={0.2} />
      </mesh>
      {/* Front Skirt Blue Underglow LED */}
      <mesh position={[0, 0.03, 0.37]}>
        <boxGeometry args={[3.7, 0.02, 0.015]} />
        <primitive object={blueLedMaterial} />
      </mesh>

      {/* Bench Front Panel Zone Sign: "⬡ 3D Printing Zone" */}
      <mesh position={[0, 0.43, 0.38]}>
        <planeGeometry args={[1.8, 0.32]} />
        <meshBasicMaterial
          map={useMemo(() => {
            const canvas = document.createElement('canvas');
            canvas.width = 720; canvas.height = 120;
            const ctx = canvas.getContext('2d');
            ctx.fillStyle = '#FFFFFF';
            ctx.font = 'bold 44px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto';
            ctx.textAlign = 'center';
            ctx.fillText('⬡  3D Printing Zone', 360, 75);
            return new THREE.CanvasTexture(canvas);
          }, [])}
          transparent
          toneMapped={false}
        />
      </mesh>

      {/* Steel Legs */}
      {[-1.8, 0, 1.8].map((lx, li) => (
        <mesh key={`p-leg-${li}`} position={[lx, 0.43, -0.3]}>
          <boxGeometry args={[0.05, 0.84, 0.05]} />
          <primitive object={blackSteelMaterial} />
        </mesh>
      ))}

      {/* ================================================================
          2. ENCLOSED BLACK PRINTER (BAMBU LAB H2D / X1 STYLE)
          Positioned on Left Side of Bench (X = -1.0)
         ================================================================ */}
      <group position={[-1.0, 0.89, 0]}>
        {/* Main Dark Aluminum Enclosure (380 x 420 x 480 mm) */}
        <mesh position={[0, 0.25, 0]} castShadow>
          <boxGeometry args={[0.42, 0.50, 0.42]} />
          <meshStandardMaterial color="#0F172A" metalness={0.8} roughness={0.25} />
        </mesh>

        {/* Tinted Glass Front Door with Silver Handle */}
        <mesh position={[0, 0.24, 0.212]}>
          <boxGeometry args={[0.34, 0.42, 0.008]} />
          <meshStandardMaterial color="#1E293B" transparent opacity={0.65} roughness={0.1} />
        </mesh>
        <mesh position={[0.14, 0.24, 0.22]}>
          <boxGeometry args={[0.015, 0.12, 0.01]} />
          <primitive object={brushedMetalMaterial} />
        </mesh>

        {/* Illuminated Interior Chamber */}
        <mesh position={[0, 0.46, 0]}>
          <boxGeometry args={[0.32, 0.015, 0.32]} />
          <primitive object={warmLedMaterial} />
        </mesh>

        {/* High-Temp Heated Bed & Printed Part */}
        <mesh position={[0, 0.12, 0]}>
          <boxGeometry args={[0.26, 0.018, 0.26]} />
          <meshStandardMaterial color="#1E293B" roughness={0.5} />
        </mesh>
        {/* Printed Black/Carbon Fiber Rover Linkage inside */}
        <mesh position={[0, 0.18, 0]} castShadow>
          <cylinderGeometry args={[0.05, 0.07, 0.10, 8]} />
          <meshStandardMaterial color="#0284C7" metalness={0.4} roughness={0.3} />
        </mesh>

        {/* Dual Extruder Gantry Arm */}
        <mesh position={[0, 0.32, 0]}>
          <boxGeometry args={[0.34, 0.03, 0.04]} />
          <primitive object={blackSteelMaterial} />
        </mesh>

        {/* Front Touchscreen Panel with Live UI */}
        <mesh position={[-0.12, 0.47, 0.215]} rotation={[-0.15, 0, 0]}>
          <planeGeometry args={[0.15, 0.09]} />
          <meshBasicMaterial map={h2dTexture} toneMapped={false} />
        </mesh>
      </group>

      {/* ================================================================
          3. WHITE BAMBU LAB A1-CLASS PRINTER
          Positioned on Middle-Right of Bench (X = +0.2)
         ================================================================ */}
      <group position={[0.2, 0.89, 0]}>
        {/* White Base Housing */}
        <mesh position={[0, 0.05, 0]} castShadow>
          <boxGeometry args={[0.38, 0.10, 0.38]} />
          <meshStandardMaterial color="#F8FAFC" roughness={0.3} />
        </mesh>
        {/* Textured Heated Bed (Y = 0.11m) */}
        <mesh position={[0, 0.11, 0]}>
          <boxGeometry args={[0.26, 0.015, 0.26]} />
          <meshStandardMaterial color="#1E293B" roughness={0.8} />
        </mesh>
        {/* In-Progress Printed Orange Mechanical Gear */}
        <mesh position={[0, 0.16, 0]} castShadow>
          <cylinderGeometry args={[0.06, 0.06, 0.08, 12]} />
          <meshStandardMaterial color="#F97316" roughness={0.4} />
        </mesh>

        {/* Dual Z-Axis Vertical Aluminum Uprights */}
        {[-0.16, 0.16].map((zx, zi) => (
          <mesh key={`a1-z-${zi}`} position={[zx, 0.26, 0]} castShadow>
            <boxGeometry args={[0.035, 0.42, 0.04]} />
            <primitive object={blackSteelMaterial} />
          </mesh>
        ))}
        {/* Top Crossbar */}
        <mesh position={[0, 0.46, 0]}>
          <boxGeometry args={[0.38, 0.03, 0.04]} />
          <primitive object={blackSteelMaterial} />
        </mesh>

        {/* Color Touchscreen Panel on Right */}
        <mesh position={[0.18, 0.10, 0.18]} rotation={[-0.4, 0, 0]}>
          <planeGeometry args={[0.09, 0.06]} />
          <meshBasicMaterial map={a1ScreenTexture} toneMapped={false} />
        </mesh>
      </group>

      {/* ================================================================
          4. FILAMENT SPOOL RACK (Right of Printers, X = +1.25)
          5 Spools on Rod: Red, Yellow, Blue, Green, Orange
         ================================================================ */}
      <group position={[1.25, 0.89, 0]}>
        {/* Black Metal Stand */}
        <mesh position={[0, 0.18, -0.15]}>
          <boxGeometry args={[0.70, 0.36, 0.03]} />
          <primitive object={blackSteelMaterial} />
        </mesh>
        {/* Spool Mounting Bar */}
        <mesh position={[0, 0.22, 0]} rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[0.01, 0.01, 0.72, 8]} />
          <primitive object={brushedMetalMaterial} />
        </mesh>

        {/* 5 Colored Filament Spools */}
        {[
          { color: '#EF4444', x: -0.26 }, // Red
          { color: '#FACC15', x: -0.13 }, // Yellow
          { color: '#3B82F6', x: 0.00 },  // Blue
          { color: '#10B981', x: 0.13 },  // Green
          { color: '#F97316', x: 0.26 },  // Orange
        ].map((sp, spi) => (
          <group key={`spool-${spi}`} position={[sp.x, 0.22, 0]} rotation={[0, 0, Math.PI / 2]}>
            {/* Wound Filament Body */}
            <mesh castShadow>
              <cylinderGeometry args={[0.09, 0.09, 0.055, 16]} />
              <meshStandardMaterial color={sp.color} roughness={0.35} />
            </mesh>
            {/* Translucent Flanges */}
            {[-0.03, 0.03].map((fz, fi) => (
              <mesh key={`flange-${fi}`} position={[0, fz, 0]}>
                <cylinderGeometry args={[0.10, 0.10, 0.004, 16]} />
                <meshStandardMaterial color="#FFFFFF" transparent opacity={0.6} roughness={0.2} />
              </mesh>
            ))}
          </group>
        ))}
      </group>

      {/* Shelf Above Printers for Prototype Display (Y = 1.95m) */}
      <group position={[0, 1.95, -0.2]}>
        <mesh castShadow>
          <boxGeometry args={[3.8, 0.035, 0.35]} />
          <primitive object={oakMaterial} />
        </mesh>
        <mesh position={[0, -0.02, 0]}>
          <boxGeometry args={[3.7, 0.012, 0.32]} />
          <primitive object={warmLedMaterial} />
        </mesh>

        {/* Display Prototypes on Shelf: White and Orange 3D Prints */}
        {[-1.4, -0.8, -0.2, 0.4, 1.0, 1.5].map((px, pi) => (
          <mesh key={`proto-${pi}`} position={[px, 0.10, 0]} castShadow>
            {pi % 3 === 0 ? (
              <cylinderGeometry args={[0.05, 0.07, 0.14, 8]} />
            ) : pi % 3 === 1 ? (
              <dodecahedronGeometry args={[0.07]} />
            ) : (
              <torusGeometry args={[0.05, 0.02, 8, 12]} />
            )}
            <meshStandardMaterial
              color={pi % 2 === 0 ? '#F97316' : '#F8FAFC'}
              roughness={0.4}
            />
          </mesh>
        ))}
      </group>
    </group>
  );
}
