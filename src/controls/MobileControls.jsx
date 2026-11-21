import React, { useRef, useState } from 'react';
import { ArrowUp, Zap } from 'lucide-react';
import { inputManager } from './inputManager';

export function MobileControls() {
  const [joystickOffset, setJoystickOffset] = useState({ x: 0, y: 0 });
  const touchStartRef = useRef({ x: 0, y: 0 });
  const isTouching = useRef(false);

  // Handle Joystick Touch
  const handleTouchStart = (e) => {
    const touch = e.touches[0];
    touchStartRef.current = { x: touch.clientX, y: touch.clientY };
    isTouching.current = true;
    setJoystickOffset({ x: 0, y: 0 });
  };

  const handleTouchMove = (e) => {
    if (!isTouching.current) return;
    const touch = e.touches[0];
    const dx = touch.clientX - touchStartRef.current.x;
    const dy = touch.clientY - touchStartRef.current.y;
    const maxRadius = 45;
    const distance = Math.hypot(dx, dy);

    if (distance > maxRadius) {
      const angle = Math.atan2(dy, dx);
      setJoystickOffset({
        x: Math.cos(angle) * maxRadius,
        y: Math.sin(angle) * maxRadius,
      });
    } else {
      setJoystickOffset({ x: dx, y: dy });
    }

    // Write directly to non-reactive inputManager.keys (Zero React re-renders)
    inputManager.keys.forward = dy < -12;
    inputManager.keys.backward = dy > 12;
    inputManager.keys.left = dx < -12;
    inputManager.keys.right = dx > 12;
  };

  const handleTouchEnd = () => {
    isTouching.current = false;
    setJoystickOffset({ x: 0, y: 0 });
    inputManager.keys.forward = false;
    inputManager.keys.backward = false;
    inputManager.keys.left = false;
    inputManager.keys.right = false;
  };

  return (
    <div className="absolute inset-0 pointer-events-none z-30 select-none flex justify-between p-6 items-end">
      {/* Left: Virtual Joystick Pad */}
      <div
        className="w-28 h-28 rounded-full border border-[rgba(7,27,58,0.12)] bg-[#F1F4F8]/80 backdrop-blur-md relative flex items-center justify-center pointer-events-auto touch-none shadow-neu-raised"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <div
          className="w-10 h-10 rounded-full bg-[#FFFFFF] border border-[rgba(7,27,58,0.08)] shadow-neu-raised-sm flex items-center justify-center transition-transform duration-75"
          style={{
            transform: `translate(${joystickOffset.x}px, ${joystickOffset.y}px)`,
          }}
        >
          <div className="w-3 h-3 rounded-full bg-[#1677FF]" />
        </div>
      </div>

      {/* Right: Action Buttons (Sprint & Jump) */}
      <div className="flex space-x-3 pointer-events-auto touch-none">
        {/* Sprint Button */}
        <button
          onTouchStart={() => { inputManager.keys.sprint = true; }}
          onTouchEnd={() => { inputManager.keys.sprint = false; }}
          className="w-12 h-12 rounded-full bg-[#FFFFFF] border border-[rgba(7,27,58,0.1)] text-[#1677FF] flex items-center justify-center shadow-neu-raised active:scale-95 transition-transform"
          aria-label="Sprint"
        >
          <Zap className="w-5 h-5" />
        </button>

        {/* Jump Button */}
        <button
          onTouchStart={() => { inputManager.keys.jump = true; }}
          onTouchEnd={() => { inputManager.keys.jump = false; }}
          className="w-12 h-12 rounded-full bg-[#FFFFFF] border border-[rgba(7,27,58,0.1)] text-[#071B3A] flex items-center justify-center shadow-neu-raised active:scale-95 transition-transform"
          aria-label="Jump"
        >
          <ArrowUp className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}
