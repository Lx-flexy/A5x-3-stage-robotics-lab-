import React, { useMemo } from 'react';
import * as THREE from 'three';
import {
  getBetaLogoTexture,
  getBetaFeaturePanelTexture,
  getBetaSmartDisplayTexture,
  getBetaWhiteboardTexture,
  getBetaDeskLogoTexture,
  getBetaFlutedPanelTexture,
  getWoodGrainTexture,
  getBetaWallSignTexture,
} from './betaTextures';

/**
 * Beta Back Wall (Teaching Wall) — Revision 8
 * Navy #071B3A vertical-fluted panel wall with:
 * - "LAB BETA / Development Lab" angled feature panel (left)
 * - A5X INDUSTRIES | IMPOSSIBLE ENGINEERING. logo + divider (top center, 3D-letter raised look)
 * - Interactive Smart Display (~2.4 x 1.4 m, dark-blue wave UI with clock, 4 app icons)
 * - Whiteboard (~2.4 m) with robot/circuit sketch + checklist
 * - Warm LED strips under both display and whiteboard
 * - Branded teacher desk (A5X logo on front, blue LED underglow)
 * - Flanking 5-tier premium shelving with warm LEDs under each shelf
 *   LEFT = robot kits, clear bins, trailing plants
 *   RIGHT = books, globe, 3D printer, filament spools, plants
 */
export function BetaBackWall() {
  const flutedTexture = useMemo(() => getBetaFlutedPanelTexture(), []);
  const logoTexture = useMemo(() => getBetaLogoTexture(), []);
  const featurePanelTexture = useMemo(() => getBetaFeaturePanelTexture(), []);
  const smartDisplayTexture = useMemo(() => getBetaSmartDisplayTexture(), []);
  const whiteboardTexture = useMemo(() => getBetaWhiteboardTexture(), []);
  const deskLogoTexture = useMemo(() => getBetaDeskLogoTexture(), []);
  const woodGrainTexture = useMemo(() => getWoodGrainTexture(), []);

  const oakMaterial = useMemo(
    () => new THREE.MeshStandardMaterial({ map: woodGrainTexture, roughness: 0.5, metalness: 0.08 }),
    [woodGrainTexture]
  );
  const blackMetalMaterial = useMemo(
    () => new THREE.MeshStandardMaterial({ color: '#151C26', metalness: 0.85, roughness: 0.25 }),
    []
  );
  const blueLedMaterial = useMemo(
    () => new THREE.MeshStandardMaterial({ color: '#1677FF', emissive: '#1677FF', emissiveIntensity: 3.5 }),
    []
  );
  const warmLedMaterial = useMemo(
    () => new THREE.MeshStandardMaterial({ color: '#FFF3E0', emissive: '#FFD580', emissiveIntensity: 2.5 }),
    []
  );

  const labOffsetX = 16.0; // Beta starts at X=16

  return (
    <group name="beta-back-wall">
      {/* 1. Full-Width Navy Vertical-Fluted Panel Wall */}
      <mesh position={[labOffsetX + 8.0, 1.8, 0.12]} receiveShadow>
        <planeGeometry args={[16.0, 3.6]} />
        <meshStandardMaterial map={flutedTexture} roughness={0.4} metalness={0.15} />
      </mesh>

      {/* 2. Left Angled Feature Panel: "LAB BETA / Development Lab" */}
      <mesh position={[labOffsetX + 1.4, 1.8, 0.14]}>
        <planeGeometry args={[2.4, 2.8]} />
        <meshBasicMaterial map={featurePanelTexture} toneMapped={false} />
      </mesh>
      {/* Diagonal electric-blue LED edge on the feature panel */}
      <mesh position={[labOffsetX + 2.6, 1.8, 0.145]} rotation={[0, 0, -0.15]}>
        <boxGeometry args={[0.035, 3.0, 0.015]} />
        <primitive object={blueLedMaterial} />
      </mesh>

      {/* 3. A5X INDUSTRIES | IMPOSSIBLE ENGINEERING. Logo - raised 3D-letter look */}
      {/* Shadow offset plane (dark, slightly recessed) */}
      <mesh position={[labOffsetX + 8.0, 3.08, 0.135]}>
        <planeGeometry args={[9.0, 1.1]} />
        <meshBasicMaterial color="#051225" toneMapped={false} />
      </mesh>
      {/* Main logo plane (slightly forward for 3D-letter raised effect) */}
      <mesh position={[labOffsetX + 8.0, 3.1, 0.15]}>
        <planeGeometry args={[9.0, 1.1]} />
        <meshBasicMaterial map={logoTexture} transparent toneMapped={false} />
      </mesh>

      {/* 4. Interactive Smart Display (~2.4 x 1.4 m) */}
      <group position={[labOffsetX + 6.4, 1.6, 0.16]}>
        {/* Thin black bezel */}
        <mesh castShadow>
          <boxGeometry args={[2.5, 1.5, 0.05]} />
          <meshStandardMaterial color="#0A0A0A" roughness={0.3} metalness={0.7} />
        </mesh>
        {/* Live canvas-texture display surface */}
        <mesh position={[0, 0, 0.028]}>
          <planeGeometry args={[2.4, 1.4]} />
          <meshBasicMaterial map={smartDisplayTexture} toneMapped={false} />
        </mesh>
        {/* Warm LED strip under display */}
        <mesh position={[0, -0.78, 0.01]}>
          <boxGeometry args={[2.4, 0.03, 0.02]} />
          <primitive object={warmLedMaterial} />
        </mesh>
      </group>

      {/* 5. Whiteboard (~2.4 x 1.4 m, same height, to right of smart display) */}
      <group position={[labOffsetX + 9.4, 1.6, 0.16]}>
        {/* Silver aluminum frame */}
        <mesh castShadow>
          <boxGeometry args={[2.5, 1.5, 0.04]} />
          <meshStandardMaterial color="#CAD5E2" metalness={0.9} roughness={0.2} />
        </mesh>
        {/* Whiteboard surface with sketches */}
        <mesh position={[0, 0, 0.022]}>
          <planeGeometry args={[2.4, 1.4]} />
          <meshBasicMaterial map={whiteboardTexture} toneMapped={false} />
        </mesh>
        {/* Marker tray */}
        <mesh position={[0, -0.77, 0.04]}>
          <boxGeometry args={[2.4, 0.04, 0.08]} />
          <meshStandardMaterial color="#94A3B8" metalness={0.8} roughness={0.3} />
        </mesh>
        {/* Warm LED under whiteboard */}
        <mesh position={[0, -0.78, 0.01]}>
          <boxGeometry args={[2.4, 0.03, 0.02]} />
          <primitive object={warmLedMaterial} />
        </mesh>
      </group>

      {/* 6. Branded Teacher Desk (podium-style) */}
      <group position={[labOffsetX + 7.8, 0, 1.5]}>
        {/* Desktop */}
        <mesh position={[0, 0.74, 0]} castShadow receiveShadow>
          <boxGeometry args={[3.0, 0.045, 0.75]} />
          <primitive object={oakMaterial} />
        </mesh>
        {/* Front modesty panel with A5X logo */}
        <mesh position={[0, 0.38, 0.35]} castShadow>
          <boxGeometry args={[2.9, 0.68, 0.025]} />
          <meshStandardMaterial map={deskLogoTexture} roughness={0.3} />
        </mesh>
        {/* Blue LED underglow strip on front panel bottom */}
        <mesh position={[0, 0.05, 0.36]}>
          <boxGeometry args={[2.8, 0.025, 0.015]} />
          <primitive object={blueLedMaterial} />
        </mesh>
        {/* Black Steel Legs */}
        {[-1.42, 1.42].map((lx, i) => (
          <mesh key={`desk-leg-${i}`} position={[lx, 0.36, 0]} castShadow>
            <boxGeometry args={[0.045, 0.72, 0.68]} />
            <primitive object={blackMetalMaterial} />
          </mesh>
        ))}

        {/* Laptop */}
        <group position={[0.5, 0.76, 0]}>
          <mesh>
            <boxGeometry args={[0.34, 0.012, 0.24]} />
            <meshStandardMaterial color="#94A3B8" metalness={0.9} roughness={0.2} />
          </mesh>
          <mesh position={[0, 0.12, -0.11]} rotation={[-0.24, 0, 0]}>
            <boxGeometry args={[0.34, 0.22, 0.008]} />
            <meshStandardMaterial color="#1E293B" metalness={0.8} roughness={0.2} />
          </mesh>
          <mesh position={[0, 0.12, -0.105]} rotation={[-0.24, 0, 0]}>
            <planeGeometry args={[0.32, 0.2]} />
            <meshStandardMaterial color="#60A5FA" emissive="#60A5FA" emissiveIntensity={1.5} />
          </mesh>
        </group>

        {/* Black Mesh Chair */}
        <group position={[0, 0, -0.6]}>
          <mesh position={[0, 0.44, 0]} castShadow>
            <boxGeometry args={[0.52, 0.06, 0.5]} />
            <meshStandardMaterial color="#1A202C" roughness={0.8} />
          </mesh>
          <mesh position={[0, 0.80, 0.24]} rotation={[-0.06, 0, 0]} castShadow>
            <boxGeometry args={[0.48, 0.58, 0.04]} />
            <meshStandardMaterial color="#1A202C" roughness={0.8} />
          </mesh>
          {/* Headrest */}
          <mesh position={[0, 1.14, 0.24]}>
            <boxGeometry args={[0.26, 0.14, 0.04]} />
            <meshStandardMaterial color="#1A202C" roughness={0.8} />
          </mesh>
          <mesh position={[0, 0.22, 0]}>
            <cylinderGeometry args={[0.03, 0.26, 0.44, 8]} />
            <primitive object={blackMetalMaterial} />
          </mesh>
          {/* Armrests */}
          {[-0.28, 0.28].map((ax, i) => (
            <mesh key={`arm-${i}`} position={[ax, 0.64, 0.05]}>
              <boxGeometry args={[0.05, 0.3, 0.26]} />
              <primitive object={blackMetalMaterial} />
            </mesh>
          ))}
        </group>

        {/* Pen holder */}
        <mesh position={[-0.6, 0.78, 0.1]} castShadow>
          <cylinderGeometry args={[0.04, 0.035, 0.08, 10]} />
          <meshStandardMaterial color="#1E293B" roughness={0.4} />
        </mesh>
        {/* Pens */}
        {[-0.015, 0, 0.015].map((px, i) => (
          <mesh key={`pen-${i}`} position={[-0.6 + px, 0.85, 0.1]}>
            <cylinderGeometry args={[0.004, 0.004, 0.1, 6]} />
            <meshStandardMaterial color={['#1677FF', '#EF4444', '#0F172A'][i]} />
          </mesh>
        ))}

        {/* Small desk plant */}
        <group position={[-1.1, 0.76, 0.1]}>
          <mesh position={[0, 0.04, 0]}>
            <cylinderGeometry args={[0.045, 0.035, 0.08, 10]} />
            <meshStandardMaterial color="#FFFFFF" roughness={0.3} />
          </mesh>
          {[0, 1.2, 2.4, 3.6, 4.8].map((rot, i) => (
            <mesh key={`dplant-${i}`} position={[0, 0.1, 0]} rotation={[0.4, rot, 0]}>
              <planeGeometry args={[0.04, 0.12]} />
              <meshStandardMaterial color={i % 2 === 0 ? '#15803D' : '#22C55E'} roughness={0.6} side={2} />
            </mesh>
          ))}
        </group>
      </group>

      {/* 7. LEFT FLANKING SHELF (robot kits, clear bins, trailing plants) */}
      <group position={[labOffsetX + 2.2, 0, 0.6]}>
        {/* 5 Oak Shelves with warm LED under each */}
        {[0.2, 0.68, 1.16, 1.64, 2.12].map((sy, sIdx) => (
          <group key={`left-shelf-${sIdx}`}>
            <mesh position={[0, sy, 0]} castShadow receiveShadow>
              <boxGeometry args={[2.6, 0.035, 0.55]} />
              <primitive object={oakMaterial} />
            </mesh>
            {/* Warm LED strip under each shelf */}
            {sIdx > 0 && (
              <mesh position={[0, sy - 0.025, 0.24]}>
                <boxGeometry args={[2.4, 0.015, 0.02]} />
                <primitive object={warmLedMaterial} />
              </mesh>
            )}
          </group>
        ))}
        {/* Black Steel Posts */}
        {[[-1.26, -0.24], [-1.26, 0.24], [1.26, -0.24], [1.26, 0.24]].map(([ux, uz], i) => (
          <mesh key={`lpost-${i}`} position={[ux, 1.1, uz]} castShadow>
            <boxGeometry args={[0.04, 2.2, 0.04]} />
            <primitive object={blackMetalMaterial} />
          </mesh>
        ))}

        {/* Bottom shelves: Robot cars */}
        {[-0.7, 0, 0.7].map((rx, i) => (
          <group key={`robocar-${i}`} position={[rx, 0.26, 0]}>
            {/* Car chassis */}
            <mesh castShadow>
              <boxGeometry args={[0.28, 0.06, 0.2]} />
              <meshStandardMaterial color={['#1E40AF', '#0F172A', '#1E40AF'][i]} roughness={0.4} metalness={0.5} />
            </mesh>
            {/* Wheels */}
            {[[-0.11, -0.09], [-0.11, 0.09], [0.11, -0.09], [0.11, 0.09]].map(([wx, wz], wi) => (
              <mesh key={`rw-${wi}`} position={[wx, -0.015, wz]} rotation={[0, 0, Math.PI / 2]}>
                <cylinderGeometry args={[0.035, 0.035, 0.02, 10]} />
                <meshStandardMaterial color="#FBBF24" roughness={0.5} />
              </mesh>
            ))}
            {/* Sensor */}
            <mesh position={[0.08, 0.05, 0]}>
              <cylinderGeometry args={[0.02, 0.02, 0.025, 8]} />
              <meshStandardMaterial color="#0284C7" />
            </mesh>
          </group>
        ))}

        {/* Tier 2: Clear bins */}
        {[-0.8, 0, 0.8].map((bx, i) => (
          <mesh key={`lbin-${i}`} position={[bx, 0.82, 0]} castShadow>
            <boxGeometry args={[0.42, 0.22, 0.42]} />
            <meshStandardMaterial color="#F1F5F9" transparent opacity={0.3} roughness={0.1} depthWrite={false} />
          </mesh>
        ))}

        {/* Tier 3-4: More robot kits / Yellow robot arm */}
        <group position={[-0.5, 1.3, 0]}>
          {/* Yellow robot arm */}
          <mesh position={[0, 0.025, 0]} castShadow>
            <cylinderGeometry args={[0.08, 0.09, 0.05, 10]} />
            <meshStandardMaterial color="#0F172A" metalness={0.7} roughness={0.3} />
          </mesh>
          <mesh position={[0, 0.11, 0]} rotation={[0.2, 0, 0]}>
            <boxGeometry args={[0.04, 0.14, 0.04]} />
            <meshStandardMaterial color="#FBBF24" roughness={0.4} />
          </mesh>
          <mesh position={[0, 0.22, 0.03]} rotation={[-0.3, 0, 0]}>
            <boxGeometry args={[0.035, 0.12, 0.035]} />
            <meshStandardMaterial color="#FBBF24" roughness={0.4} />
          </mesh>
          <mesh position={[0, 0.3, 0.06]}>
            <boxGeometry args={[0.05, 0.03, 0.04]} />
            <primitive object={blackMetalMaterial} />
          </mesh>
        </group>

        {/* Trailing hanging plant on top */}
        <group position={[-0.8, 2.15, 0.15]}>
          <mesh position={[0, 0.06, 0]} castShadow>
            <cylinderGeometry args={[0.1, 0.07, 0.12, 12]} />
            <meshStandardMaterial color="#FFFFFF" roughness={0.3} />
          </mesh>
          {/* Trailing leaf strips */}
          {[0, 0.8, 1.6, 2.4, 3.2, 4.0, 4.8, 5.6].map((rot, i) => (
            <mesh key={`trail-${i}`} position={[Math.sin(rot) * 0.08, -0.1 - i * 0.04, Math.cos(rot) * 0.08]} rotation={[0.6 + i * 0.1, rot, 0]}>
              <planeGeometry args={[0.04, 0.18 + i * 0.03]} />
              <meshStandardMaterial color={i % 2 === 0 ? '#15803D' : '#22C55E'} roughness={0.6} side={2} />
            </mesh>
          ))}
        </group>
      </group>

      {/* 8. RIGHT FLANKING SHELF (books, globe, 3D printer, filament spools, plants) */}
      <group position={[labOffsetX + 13.8, 0, 0.6]}>
        {/* 5 Oak Shelves with warm LED */}
        {[0.2, 0.68, 1.16, 1.64, 2.12].map((sy, sIdx) => (
          <group key={`right-shelf-${sIdx}`}>
            <mesh position={[0, sy, 0]} castShadow receiveShadow>
              <boxGeometry args={[2.6, 0.035, 0.55]} />
              <primitive object={oakMaterial} />
            </mesh>
            {sIdx > 0 && (
              <mesh position={[0, sy - 0.025, 0.24]}>
                <boxGeometry args={[2.4, 0.015, 0.02]} />
                <primitive object={warmLedMaterial} />
              </mesh>
            )}
          </group>
        ))}
        {/* Posts */}
        {[[-1.26, -0.24], [-1.26, 0.24], [1.26, -0.24], [1.26, 0.24]].map(([ux, uz], i) => (
          <mesh key={`rpost-${i}`} position={[ux, 1.1, uz]} castShadow>
            <boxGeometry args={[0.04, 2.2, 0.04]} />
            <primitive object={blackMetalMaterial} />
          </mesh>
        ))}

        {/* Bottom: Clear bins */}
        {[-0.8, 0, 0.8].map((bx, i) => (
          <mesh key={`rbin-${i}`} position={[bx, 0.34, 0]} castShadow>
            <boxGeometry args={[0.42, 0.22, 0.42]} />
            <meshStandardMaterial color="#F1F5F9" transparent opacity={0.3} roughness={0.1} depthWrite={false} />
          </mesh>
        ))}

        {/* Tier 2: Books */}
        {[-0.9, -0.65, -0.4, -0.15, 0.1, 0.35].map((bx, i) => (
          <mesh key={`book-${i}`} position={[bx, 0.82, 0]} castShadow>
            <boxGeometry args={[0.08, 0.26, 0.2]} />
            <meshStandardMaterial color={['#1E40AF', '#0F766E', '#7C3AED', '#DC2626', '#0369A1', '#1E293B'][i]} roughness={0.6} />
          </mesh>
        ))}
        {/* Globe on tier 2 */}
        <group position={[0.8, 0.86, 0]}>
          <mesh position={[0, 0.06, 0]}>
            <cylinderGeometry args={[0.04, 0.06, 0.04, 10]} />
            <primitive object={blackMetalMaterial} />
          </mesh>
          <mesh position={[0, 0.14, 0]} rotation={[0.3, 0, 0]} castShadow>
            <sphereGeometry args={[0.08, 16, 12]} />
            <meshStandardMaterial color="#2563EB" roughness={0.4} />
          </mesh>
        </group>

        {/* Tier 3: Bambu Lab A1 3D Printer */}
        <group position={[0, 1.22, 0]}>
          <mesh position={[0, 0.05, 0]} castShadow>
            <boxGeometry args={[0.38, 0.1, 0.38]} />
            <meshStandardMaterial color="#F1F5F9" roughness={0.3} />
          </mesh>
          <mesh position={[0, 0.11, 0]}>
            <boxGeometry args={[0.26, 0.012, 0.26]} />
            <meshStandardMaterial color="#334155" roughness={0.4} />
          </mesh>
          <mesh position={[-0.14, 0.26, -0.1]} castShadow>
            <boxGeometry args={[0.05, 0.3, 0.05]} />
            <primitive object={blackMetalMaterial} />
          </mesh>
          <mesh position={[0, 0.28, -0.05]} castShadow>
            <boxGeometry args={[0.26, 0.04, 0.04]} />
            <primitive object={blackMetalMaterial} />
          </mesh>
        </group>

        {/* Filament spools on tier 3 */}
        {['#EF4444', '#F59E0B', '#10B981', '#3B82F6', '#8B5CF6'].map((c, i) => (
          <group key={`rspool-${i}`} position={[0.6 + i * 0.16, 1.26, 0]} rotation={[0, 0, Math.PI / 2]}>
            <mesh castShadow>
              <cylinderGeometry args={[0.07, 0.07, 0.07, 12]} />
              <meshStandardMaterial color={c} roughness={0.5} />
            </mesh>
          </group>
        ))}

        {/* Top: Trailing hanging plant */}
        <group position={[0.8, 2.15, 0.15]}>
          <mesh position={[0, 0.06, 0]} castShadow>
            <cylinderGeometry args={[0.1, 0.07, 0.12, 12]} />
            <meshStandardMaterial color="#FFFFFF" roughness={0.3} />
          </mesh>
          {[0, 0.9, 1.8, 2.7, 3.6, 4.5, 5.4].map((rot, i) => (
            <mesh key={`rtrail-${i}`} position={[Math.sin(rot) * 0.07, -0.08 - i * 0.04, Math.cos(rot) * 0.07]} rotation={[0.5 + i * 0.08, rot, 0]}>
              <planeGeometry args={[0.04, 0.16 + i * 0.025]} />
              <meshStandardMaterial color={i % 2 === 0 ? '#15803D' : '#16A34A'} roughness={0.6} side={2} />
            </mesh>
          ))}
        </group>
      </group>
    </group>
  );
}
