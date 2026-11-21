import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';
import { useThree } from '@react-three/fiber';
import { useStore } from '../store/useStore';

/**
 * High-Performance Consolidated Campus Lighting (Revision 4)
 * Strict limit: Exactly 3-4 real lights total.
 * - 1 Hemisphere sky/ground fill
 * - 1 Ambient light for soft baseline visibility
 * - 1 Directional key light with static shadow map (1024)
 * - 1 Subtle cool fill light
 * Individual fixtures use emissive materials instead of expensive point/spot lights.
 */
export function Lighting() {
  const quality = useStore((state) => state.quality);
  const dirLightRef = useRef();
  const { gl } = useThree();

  const castShadows = quality !== 'low';
  const shadowMapSize = quality === 'high' ? 2048 : 1024;

  useEffect(() => {
    // Enable static shadows: do not auto-update every frame
    if (gl && gl.shadowMap) {
      gl.shadowMap.enabled = castShadows;
      gl.shadowMap.type = THREE.PCFSoftShadowMap;
      gl.shadowMap.autoUpdate = false;
      gl.shadowMap.needsUpdate = true;
    }
  }, [gl, castShadows]);

  useEffect(() => {
    if (dirLightRef.current && castShadows) {
      dirLightRef.current.shadow.needsUpdate = true;
    }
  }, [castShadows]);

  return (
    <group name="campus-lighting">
      {/* 1. Natural Hemisphere Light (Sky #E9EEF5, Ground #B0C4DE) */}
      <hemisphereLight
        args={['#E9EEF5', '#A3B8CC', 0.85]}
      />

      {/* 2. Soft Ambient Baseline */}
      <ambientLight intensity={0.45} color="#DCE7F5" />

      {/* 3. Main Single Directional Sun Key Light */}
      <directionalLight
        ref={dirLightRef}
        position={[24, 22, 26]}
        intensity={1.1}
        color="#FFFFFF"
        castShadow={castShadows}
        shadow-mapSize-width={shadowMapSize}
        shadow-mapSize-height={shadowMapSize}
        shadow-camera-left={-32}
        shadow-camera-right={32}
        shadow-camera-top={20}
        shadow-camera-bottom={-20}
        shadow-camera-near={1.0}
        shadow-camera-far={65}
        shadow-bias={-0.0004}
      />

      {/* 4. Subtle Cool Fill from Outside Front */}
      <directionalLight
        position={[-8, 14, 18]}
        intensity={0.35}
        color="#B0CDFA"
      />
    </group>
  );
}
