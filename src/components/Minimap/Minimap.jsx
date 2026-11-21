import React, { useRef, useEffect } from 'react';
import { useStore } from '../../store/useStore';
import { Maximize2 } from 'lucide-react';

/**
 * High-Performance Throttled Minimap (10 Hz) (Revision 4)
 * Does NOT re-render on every player frame. Uses non-reactive canvas draw.
 */
export function Minimap({ onExpand }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const width = canvas.width;
    const height = canvas.height;

    const minX = -4;
    const maxX = 64;
    const minZ = -1;
    const maxZ = 22;

    const scaleX = width / (maxX - minX);
    const scaleY = height / (maxZ - minZ);

    const worldToMap = (wx, wz) => [
      (wx - minX) * scaleX,
      (wz - minZ) * scaleY
    ];

    const bays = [
      { id: 'alpha', minX: 0, maxX: 16, badge: 'A' },
      { id: 'beta', minX: 16, maxX: 32, badge: 'B' },
      { id: 'gamma', minX: 32, maxX: 48, badge: 'G' },
      { id: 'gamma-arena', minX: 48, maxX: 60, badge: 'R' }
    ];

    const draw = () => {
      const state = useStore.getState();
      const playerPos = state.playerPosition;
      const playerRot = state.playerRotation;
      const activeLab = state.activeLabId;

      // 1. Clear background
      ctx.fillStyle = '#E9EEF5';
      ctx.fillRect(0, 0, width, height);

      // 2. Exterior Plaza
      const [pX1, pZ1] = worldToMap(-4, 12);
      const [pX2, pZ2] = worldToMap(62, 21);
      ctx.fillStyle = '#DFE6EE';
      ctx.fillRect(pX1, pZ1, pX2 - pX1, pZ2 - pZ1);

      // 3. Labs Floor Outlines
      bays.forEach((bay) => {
        const [lx1, lz1] = worldToMap(bay.minX, 0);
        const [lx2, lz2] = worldToMap(bay.maxX, 12);
        const isCurrent = activeLab === bay.id || (bay.id === 'gamma' && (activeLab === 'gamma' || activeLab === 'gamma-main'));

        ctx.fillStyle = isCurrent ? '#FFFFFF' : '#F1F4F8';
        ctx.fillRect(lx1, lz1, lx2 - lx1, lz2 - lz1);

        ctx.strokeStyle = isCurrent ? '#1677FF' : 'rgba(7, 27, 58, 0.15)';
        ctx.lineWidth = isCurrent ? 1.8 : 1;
        ctx.strokeRect(lx1, lz1, lx2 - lx1, lz2 - lz1);

        ctx.fillStyle = isCurrent ? '#1677FF' : '#5B6B82';
        ctx.font = '600 10px Inter, sans-serif';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(bay.badge, lx1 + (lx2 - lx1) / 2, lz1 + (lz2 - lz1) / 2);
      });

      // 4. Three Robotics Arenas (Soccer, Race, Line Follower)
      // Robo Soccer Arena
      const [sx1, sz1] = worldToMap(50.8, 1.2);
      const [sx2, sz2] = worldToMap(58.6, 4.6);
      ctx.strokeStyle = '#10B981';
      ctx.strokeRect(sx1, sz1, sx2 - sx1, sz2 - sz1);

      // Robo Race Arena
      const [rx1, rz1] = worldToMap(49.6, 5.8);
      const [rx2, rz2] = worldToMap(54.2, 10.6);
      ctx.strokeStyle = '#38BDF8';
      ctx.strokeRect(rx1, rz1, rx2 - rx1, rz2 - rz1);

      // Line Follower Arena
      const [lx1, lz1] = worldToMap(55.4, 5.8);
      const [lx2, lz2] = worldToMap(58.6, 10.6);
      ctx.strokeStyle = '#FACC15';
      ctx.strokeRect(lx1, lz1, lx2 - lx1, lz2 - lz1);

      // 5. Player Directional Arrow
      const [px, pz] = worldToMap(playerPos[0], playerPos[2]);
      ctx.save();
      ctx.translate(px, pz);
      ctx.rotate(-playerRot);

      ctx.fillStyle = 'rgba(22, 119, 255, 0.2)';
      ctx.beginPath();
      ctx.arc(0, 0, 6, 0, Math.PI * 2);
      ctx.fill();

      ctx.fillStyle = '#1677FF';
      ctx.beginPath();
      ctx.moveTo(0, -5);
      ctx.lineTo(3.5, 3.5);
      ctx.lineTo(0, 1.8);
      ctx.lineTo(-3.5, 3.5);
      ctx.closePath();
      ctx.fill();

      ctx.restore();
    };

    // Initial draw + 10 Hz interval
    draw();
    const interval = setInterval(draw, 100);

    return () => clearInterval(interval);
  }, []);

  const handleCanvasClick = (e) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const clickY = e.clientY - rect.top;

    const minX = -4;
    const maxX = 62;
    const minZ = -1;
    const maxZ = 22;

    const worldX = minX + (clickX / canvas.width) * (maxX - minX);
    const worldZ = minZ + (clickY / canvas.height) * (maxZ - minZ);

    useStore.getState().setPlayerPosition([
      Math.max(0, Math.min(58, worldX)),
      1.65,
      Math.max(1, Math.min(20, worldZ))
    ]);
  };

  return (
    <div className="neu-panel p-2 rounded-neu-panel flex flex-col space-y-1.5 shadow-neu-raised pointer-events-auto select-none">
      <div className="flex items-center justify-between px-1">
        <span className="text-[11px] font-semibold text-[#071B3A] tracking-tight">
          Minimap
        </span>
        <button
          onClick={onExpand}
          className="w-5 h-5 rounded flex items-center justify-center text-[#5B6B82] hover:text-[#1677FF] hover:bg-[#FFFFFF] transition-colors"
          title="Expand Full Map (M)"
          aria-label="Expand Full Campus Map"
        >
          <Maximize2 className="w-3.5 h-3.5" />
        </button>
      </div>

      <div className="rounded-lg overflow-hidden border border-[rgba(7,27,58,0.08)] bg-[#E9EEF5] shadow-neu-pressed">
        <canvas
          ref={canvasRef}
          width={160}
          height={76}
          onClick={handleCanvasClick}
          className="cursor-pointer block"
          title="Click to navigate"
        />
      </div>
    </div>
  );
}
