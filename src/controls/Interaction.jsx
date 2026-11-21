import React, { useState, useEffect, useRef } from 'react';
import { useStore } from '../store/useStore';
import { KeyCap } from '../components/UI/NeuComponents';
import { Eye } from 'lucide-react';

const INTERACTIVE_HOTSPOTS = [
  // Alpha
  { id: 'alpha-bambu', name: 'Bambu Lab A1 Mini 3D Printer', pos: [3.2, 1.65, 1.0], radiusSq: 2.2 * 2.2 },
  { id: 'alpha-soldering', name: 'Alpha Soldering Station', pos: [1.4, 1.65, 9.8], radiusSq: 2.5 * 2.5 },
  { id: 'alpha-hardware', name: 'Alpha Hardware Kits Shelf', pos: [12.4, 1.65, 0.8], radiusSq: 2.5 * 2.5 },
  { id: 'alpha-electronics', name: 'Alpha Electronics Bin Unit', pos: [0.6, 1.65, 2.8], radiusSq: 2.5 * 2.5 },
  { id: 'alpha-coding-pc', name: 'Alpha Coding Workstation', pos: [15.2, 1.65, 9.0], radiusSq: 2.2 * 2.2 },
  { id: 'alpha-design-pc', name: 'Alpha Design Workstation', pos: [5.6, 1.65, 1.0], radiusSq: 2.2 * 2.2 },

  // Beta (Revision 8)
  { id: 'beta-smart-display', name: 'A5X Interactive Smart Display', pos: [24.0, 1.65, 0.4], radiusSq: 3.0 * 3.0 },
  { id: 'beta-bambu', name: 'Bambu Lab A1 3D Printer', pos: [31.5, 1.65, 2.35], radiusSq: 2.4 * 2.4 },
  { id: 'beta-soldering', name: 'Beta SMD Soldering Bench', pos: [16.6, 1.65, 9.5], radiusSq: 2.5 * 2.5 },
  { id: 'beta-hardware', name: 'RPi5 & ESP32 Hardware Shelf', pos: [16.5, 1.65, 2.0], radiusSq: 2.5 * 2.5 },
  { id: 'beta-electronics', name: 'Sensors & Component Bins', pos: [16.5, 1.65, 3.8], radiusSq: 2.5 * 2.5 },
  { id: 'beta-coding-pc', name: 'Beta IoT Coding Workstation', pos: [31.4, 1.65, 8.75], radiusSq: 2.2 * 2.2 },
  { id: 'beta-design-pc', name: 'Beta CAD Design Workstation', pos: [31.4, 1.65, 10.75], radiusSq: 2.2 * 2.2 },

  // Gamma Main Bay
  { id: 'gamma-digital-wall', name: 'Panoramic Digital Matrix Wall', pos: [40.0, 1.65, 0.4], radiusSq: 3.5 * 3.5 },
  { id: 'gamma-vr-headset', name: 'Spatial VR Pro Headset Station', pos: [33.8, 1.65, 6.2], radiusSq: 2.4 * 2.4 },
  { id: 'gamma-printer', name: 'Pro X-1 Dual Extrusion 3D Printer', pos: [35.2, 1.65, 1.0], radiusSq: 2.2 * 2.2 },
  { id: 'gamma-soldering', name: 'Precision Assembly Lab', pos: [33.4, 1.65, 9.8], radiusSq: 2.5 * 2.5 },
  { id: 'gamma-hardware', name: 'AI & Edge Hardware Racks', pos: [44.4, 1.65, 0.8], radiusSq: 2.5 * 2.5 },
  { id: 'gamma-electronics', name: 'Advanced Components Storage', pos: [32.6, 1.65, 2.8], radiusSq: 2.5 * 2.5 },
  { id: 'gamma-coding-pc', name: 'Gamma Deep Learning Rig', pos: [47.2, 1.65, 9.0], radiusSq: 2.2 * 2.2 },
  { id: 'gamma-design-pc', name: 'Gamma Twin CAD Workstations', pos: [37.6, 1.65, 1.0], radiusSq: 2.2 * 2.2 },

  // Gamma Arena Bay (Revision 17)
  { id: 'gamma-race-arena', name: 'Robo Race Arena', pos: [51.9, 1.65, 8.2], radiusSq: 2.6 * 2.6 },
  { id: 'gamma-soccer-arena', name: 'Robo Soccer Arena', pos: [54.7, 1.65, 2.9], radiusSq: 2.8 * 2.8 },
  { id: 'gamma-line-follower-arena', name: 'Line Follower Arena', pos: [57.0, 1.65, 8.2], radiusSq: 2.5 * 2.5 },
  { id: 'gamma-trophy-shelf', name: 'Robotics Showcase & Trophy Shelf', pos: [49.5, 1.65, 1.2], radiusSq: 2.2 * 2.2 },
  { id: 'gamma-diagnostic-bench', name: 'Robot Diagnostic Bench', pos: [58.5, 1.65, 8.5], radiusSq: 2.2 * 2.2 }
];

export function InteractionHUD() {
  const [nearestTarget, setNearestTarget] = useState(null);
  const activeInteraction = useStore((state) => state.activeInteraction);
  const setActiveInteraction = useStore((state) => state.setActiveInteraction);
  const prevTargetId = useRef(null);

  // Throttled 10 Hz proximity check (every 100ms) with squared distance
  useEffect(() => {
    const interval = setInterval(() => {
      const pos = useStore.getState().playerPosition;
      const px = pos[0];
      const pz = pos[2];

      let closest = null;
      let minDistanceSq = Infinity;

      for (let i = 0; i < INTERACTIVE_HOTSPOTS.length; i++) {
        const spot = INTERACTIVE_HOTSPOTS[i];
        const dx = px - spot.pos[0];
        const dz = pz - spot.pos[2];
        const distSq = dx * dx + dz * dz;

        if (distSq < spot.radiusSq && distSq < minDistanceSq) {
          minDistanceSq = distSq;
          closest = spot;
        }
      }

      const closestId = closest ? closest.id : null;
      if (closestId !== prevTargetId.current) {
        prevTargetId.current = closestId;
        setNearestTarget(closest);
      }
    }, 100);

    return () => clearInterval(interval);
  }, []);

  // Keyboard handler for 'KeyE' and 'Escape'
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.code === 'KeyE' && nearestTarget && !activeInteraction) {
        if (document.pointerLockElement) {
          document.exitPointerLock?.();
        }
        setActiveInteraction(nearestTarget.id);
      } else if (e.code === 'Escape' && activeInteraction) {
        setActiveInteraction(null);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [nearestTarget, activeInteraction, setActiveInteraction]);

  if (!nearestTarget || activeInteraction) return null;

  return (
    <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-30 pointer-events-auto transition-opacity duration-200">
      <button
        onClick={() => {
          if (document.pointerLockElement) document.exitPointerLock?.();
          setActiveInteraction(nearestTarget.id);
        }}
        className="neu-panel px-4 py-2 rounded-neu-btn flex items-center space-x-3 text-[#071B3A] hover:bg-[#FFFFFF] transition-all duration-180 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1677FF] shadow-neu-raised cursor-pointer"
      >
        <KeyCap>E</KeyCap>
        <span className="text-xs font-semibold text-[#071B3A]">
          {nearestTarget.name}
        </span>
        <span className="text-xs text-[#5B6B82] flex items-center space-x-1 pl-1 border-l border-[#CAD5E2]">
          <Eye className="w-3.5 h-3.5 text-[#1677FF]" />
          <span>Inspect</span>
        </span>
      </button>
    </div>
  );
}
