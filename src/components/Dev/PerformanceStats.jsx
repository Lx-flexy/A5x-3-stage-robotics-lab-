import React, { useState, useEffect, useRef } from 'react';
import { useThree, useFrame } from '@react-three/fiber';
import { Stats } from '@react-three/drei';

export function PerformanceStats({ enabled = true }) {
  const { gl, scene } = useThree();
  const [showStats, setShowStats] = useState(false);
  const frameCount = useRef(0);
  const lastTime = useRef(performance.now());
  const renderTime = useRef(0);

  // Toggle overlay with 'P' key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.code === 'KeyP') {
        setShowStats((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  useFrame((state, delta) => {
    frameCount.current++;
    const now = performance.now();
    const elapsed = now - lastTime.current;

    // Sample every ~500ms
    if (elapsed >= 500) {
      const currentFps = Math.round((frameCount.current * 1000) / elapsed);
      frameCount.current = 0;
      lastTime.current = now;

      // Count lights in the scene
      let totalLights = 0;
      let shadowLights = 0;
      scene.traverse((obj) => {
        if (obj.isLight) {
          totalLights++;
          if (obj.castShadow) shadowLights++;
        }
      });

      window.__perfStats = {
        fps: currentFps,
        frameTimeMs: Number((delta * 1000).toFixed(2)),
        drawCalls: gl.info.render.calls,
        triangles: gl.info.render.triangles,
        geometries: gl.info.memory.geometries,
        textures: gl.info.memory.textures,
        activeLights: totalLights,
        shadowCastingLights: shadowLights,
        campusReRendersPerSec: window.__campusRenderCount || 0
      };

      // Reset campus render counter for next second
      window.__campusRenderCount = 0;
    }
  });

  return showStats ? <Stats className="pointer-events-auto" /> : null;
}
