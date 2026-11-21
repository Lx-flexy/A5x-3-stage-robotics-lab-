import React from 'react';
import { Text } from '@react-three/drei';
import { useCampusMaterials } from './Materials';

/**
 * High-tech Brand Signage & Lab Header Plaques (Revision 2: Spans 58m Complex)
 */
export function Signage() {
  const materials = useCampusMaterials();

  const facadeBanners = [
    { id: 'alpha', cx: 8, title: 'LAB ALPHA', subtitle: 'Foundation Lab (Beginner)', badge: 'A' },
    { id: 'beta', cx: 24, title: 'LAB BETA', subtitle: 'Development Lab (Intermediate)', badge: 'B' },
    { id: 'gamma-main', cx: 40, title: 'LAB GAMMA', subtitle: 'Advanced Innovation Lab (Advanced)', badge: 'G' },
    { id: 'gamma-arena', cx: 54, title: 'ROBOTICS ARENA', subtitle: 'Autonomy Testing Bay', badge: 'R' }
  ];

  return (
    <group name="campus-signage">
      {/* 1. Header Banner above the complex (Floating Top Header like Reference Image) */}
      <group position={[29, 4.3, 0]}>
        {/* Glow backdrop bar */}
        <mesh position={[0, 0, -0.05]}>
          <boxGeometry args={[58, 0.6, 0.08]} />
          <primitive object={materials.navyFeatureWall} />
        </mesh>
        <mesh position={[0, -0.3, -0.04]}>
          <boxGeometry args={[58, 0.04, 0.09]} />
          <primitive object={materials.electricBlueGlow} />
        </mesh>

        {/* Complex Title */}
        <Text
          position={[-15, 0.08, 0.01]}
          fontSize={0.42}
          color="#FFFFFF"
          fontWeight={800}
          anchorX="left"
          anchorY="middle"
        >
          {"A5X INDUSTRIES®  |  INNOVATION LAB COMPLEX"}
        </Text>
        <Text
          position={[-15, -0.15, 0.01]}
          fontSize={0.2}
          color="#00D2FF"
          anchorX="left"
          anchorY="middle"
        >
          {"IMPOSSIBLE ENGINEERING. — Alpha | Beta | Gamma"}
        </Text>
      </group>

      {/* 2. Feature Wall Signage for Beta (Back Wall Z = 0) */}
      {/* Note: Lab Alpha, Lab Gamma Main & Arena Bay use their bespoke back walls */}
      {[
        { id: 'beta', cx: 24, title: 'LAB BETA', subtitle: 'Development Lab' }
      ].map((lab) => (
        <group key={`feature-sign-${lab.id}`} position={[lab.cx, 3.1, 0.14]}>
          <mesh position={[0, 0.35, 0]}>
            <boxGeometry args={[7.2, 0.04, 0.02]} />
            <primitive object={materials.electricBlueGlow} />
          </mesh>

          <Text
            position={[0, 0.15, 0.01]}
            fontSize={0.26}
            color="#00D2FF"
            anchorX="center"
            anchorY="middle"
            letterSpacing={0.08}
          >
            {"A5X"}
          </Text>
          <Text
            position={[0, -0.08, 0.01]}
            fontSize={0.32}
            color="#FFFFFF"
            fontWeight={800}
            anchorX="center"
            anchorY="middle"
            letterSpacing={0.06}
          >
            {lab.title}
          </Text>
          <Text
            position={[0, -0.28, 0.01]}
            fontSize={0.18}
            color="#93C5FD"
            anchorX="center"
            anchorY="middle"
          >
            {lab.subtitle}
          </Text>
        </group>
      ))}

      {/* 3. Front Glass Facade Lower Fascia / Signage Banners (Z = 12.05) */}
      {facadeBanners.map((lab) => {
        const isArena = lab.id === 'gamma-arena';
        const bannerW = isArena ? 8.5 : 11.5;
        const badgeOffset = isArena ? 4.3 : 5.8;

        return (
          <group key={`facade-banner-${lab.id}`} position={[lab.cx, 0.45, 12.08]}>
            <mesh>
              <boxGeometry args={[bannerW, 0.55, 0.08]} />
              <primitive object={materials.navyFeatureWall} />
            </mesh>
            <mesh position={[0, 0.27, 0.02]}>
              <boxGeometry args={[bannerW, 0.03, 0.06]} />
              <primitive object={materials.electricBlueGlow} />
            </mesh>
            <mesh position={[0, -0.27, 0.02]}>
              <boxGeometry args={[bannerW, 0.03, 0.06]} />
              <primitive object={materials.electricBlueGlow} />
            </mesh>

            <Text
              position={[0, 0.02, 0.05]}
              fontSize={0.22}
              color="#FFFFFF"
              fontWeight={700}
              anchorX="center"
              anchorY="middle"
              letterSpacing={0.04}
            >
              {`${lab.title}  —  ${lab.subtitle}`}
            </Text>

            {/* Glowing Badge Cube next to doorways */}
            <group position={[badgeOffset, 0, 0.05]}>
              <mesh>
                <boxGeometry args={[0.7, 0.7, 0.15]} />
                <primitive object={materials.electricBlueGlow} />
              </mesh>
              <mesh position={[0, 0, 0.08]}>
                <boxGeometry args={[0.62, 0.62, 0.02]} />
                <primitive object={materials.navyFeatureWall} />
              </mesh>
              <Text
                position={[0, 0, 0.1]}
                fontSize={0.38}
                color="#FFFFFF"
                fontWeight={900}
                anchorX="center"
                anchorY="middle"
              >
                {lab.badge}
              </Text>
            </group>
          </group>
        );
      })}
    </group>
  );
}
