import React, { useState, useRef, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera, AdaptiveDpr, PerformanceMonitor } from '@react-three/drei';
import { useNavigate } from 'react-router-dom';
import { Campus } from '../campus/Campus';
import { CAMPUS_CONFIG } from '../data/config';
import { useStore } from '../store/useStore';
import { PlayerController } from '../controls/PlayerController';
import { MobileControls } from '../controls/MobileControls';
import { InteractionHUD } from '../controls/Interaction';
import { EquipmentModal } from '../components/Panels/EquipmentModal';
import { CampusMapModal } from '../components/Panels/CampusMapModal';
import { Minimap } from '../components/Minimap/Minimap';
import { PauseMenu } from '../components/UI/PauseMenu';
import { SettingsModal } from '../components/UI/SettingsModal';
import { NeuIconButton, NeuSegmented, KeyCap } from '../components/UI/NeuComponents';
import { PerformanceStats } from '../components/Dev/PerformanceStats';
import { 
  Footprints, 
  Eye, 
  Compass, 
  Map, 
  Menu, 
  Sliders, 
  DoorOpen 
} from 'lucide-react';
import { soundManager } from '../utils/soundEffects';

const CAMERA_PRESETS = {
  firstPerson: {
    name: 'First-Person Walk',
    position: [8, 1.65, 19],
    target: [8, 1.65, 12],
    fov: 70
  },
  isometric: {
    name: 'Isometric Campus View',
    position: [29, 25, 30],
    target: [29, 1.8, 6],
    fov: 48
  },
  topDown: {
    name: 'Top-Down Overview',
    position: [29, 36, 6.0],
    target: [29, 0, 6.0],
    fov: 52
  }
};

function ControlledCamera({ viewMode, currentPresetKey }) {
  const controlsRef = useRef();

  if (viewMode === 'firstPerson') {
    return (
      <PerspectiveCamera
        makeDefault
        position={CAMPUS_CONFIG.spawn.position}
        fov={70}
        near={0.1}
        far={150}
      />
    );
  }

  const preset = CAMERA_PRESETS[currentPresetKey]?.target
    ? CAMERA_PRESETS[currentPresetKey]
    : CAMERA_PRESETS.isometric;

  return (
    <>
      <PerspectiveCamera
        makeDefault
        position={preset.position}
        fov={preset.fov}
        near={0.1}
        far={200}
      />
      <OrbitControls
        ref={controlsRef}
        target={preset.target}
        maxPolarAngle={Math.PI / 2 + 0.05}
        minDistance={2}
        maxDistance={80}
        enableDamping
        dampingFactor={0.05}
      />
    </>
  );
}

export default function CampusPage() {
  const navigate = useNavigate();

  const viewMode = useStore((state) => state.viewMode);
  const setViewMode = useStore((state) => state.setViewMode);
  const activeLabId = useStore((state) => state.activeLabId);
  const activeZoneId = useStore((state) => state.activeZoneId);
  const setShowCeiling = useStore((state) => state.setShowCeiling);
  const doorStates = useStore((state) => state.doorStates);
  const activeInteraction = useStore((state) => state.activeInteraction);
  const quality = useStore((state) => state.quality);
  const setQuality = useStore((state) => state.setQuality);

  const [activePreset, setActivePreset] = useState('firstPerson');
  const [isPointerLocked, setIsPointerLocked] = useState(false);
  const [mobileMode, setMobileMode] = useState(false);
  const [isMapOpen, setIsMapOpen] = useState(false);
  const [isPauseOpen, setIsPauseOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [showControlsHint, setShowControlsHint] = useState(true);
  const [doorToast, setDoorToast] = useState(null);
  const prevDoorsRef = useRef(doorStates);
  const canvasRef = useRef();

  // Auto-hide controls hint after 8 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowControlsHint(false);
    }, 8000);
    return () => clearTimeout(timer);
  }, []);

  // Monitor doors for a quiet, small toast (instead of an always-visible bar)
  useEffect(() => {
    const prev = prevDoorsRef.current || {};
    for (const [id, isOpen] of Object.entries(doorStates)) {
      if (isOpen && !prev[id]) {
        const cleanName = id.replace('door-', '').replace('-', ' → ');
        setDoorToast(`Glass Door Opened (${cleanName})`);
        setTimeout(() => setDoorToast(null), 2500);
      }
    }
    prevDoorsRef.current = doorStates;
  }, [doorStates]);

  // Switch view mode
  const handleModeChange = (modeKey) => {
    setActivePreset(modeKey);
    if (modeKey === 'firstPerson') {
      setViewMode('firstPerson');
      setShowCeiling(true);
    } else {
      setViewMode(modeKey);
      setShowCeiling(false);
    }
  };

  const requestPointerLock = () => {
    if (viewMode === 'firstPerson' && !activeInteraction && !isMapOpen && !isPauseOpen && !isSettingsOpen && canvasRef.current) {
      canvasRef.current.requestPointerLock?.();
    }
  };

  // Keyboard shortcut for Pause (ESC), Map (M), and Dev Camera Pose (C)
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.code === 'KeyC') {
        handleModeChange('firstPerson');
        useStore.getState().setPlayerPosition([8.0, 1.65, 11.2]);
        useStore.getState().setPlayerRotation(0);
        useStore.getState().setActiveLabId('alpha');
        useStore.getState().setShowCeiling(true);
      }
      if (e.code === 'KeyM' && !activeInteraction && !isPauseOpen && !isSettingsOpen) {
        setIsMapOpen((prev) => !prev);
      }
      if (e.code === 'Escape') {
        if (isMapOpen) setIsMapOpen(false);
        else if (isSettingsOpen) setIsSettingsOpen(false);
        else if (!activeInteraction) setIsPauseOpen((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeInteraction, isMapOpen, isPauseOpen, isSettingsOpen]);

  // Lab location label formulation
  const getLabPillText = () => {
    if (activeLabId === 'alpha') return { lab: 'Lab Alpha', desc: 'Foundation' };
    if (activeLabId === 'beta') return { lab: 'Lab Beta', desc: 'Development' };
    if (activeLabId === 'gamma') return { lab: 'Lab Gamma', desc: 'Advanced' };
    if (activeLabId === 'gamma-arena') return { lab: 'Robotics Arena', desc: 'Autonomy Bay' };
    return { lab: 'A5X Campus', desc: 'Entrance Plaza' };
  };

  const labPill = getLabPillText();

  const viewOptions = [
    { value: 'firstPerson', label: 'Walk', icon: Footprints },
    { value: 'isometric', label: 'Campus', icon: Eye },
    { value: 'topDown', label: 'Top-Down', icon: Compass }
  ];

  return (
    <div className="relative w-screen h-screen overflow-hidden bg-[#E9EEF5] select-none font-sans">
      {/* ======================================================== */}
      {/* 1. TOP HUD (Calm, Soft-Neumorphic, Clean) */}
      {/* ======================================================== */}
      <header className="absolute top-5 left-6 right-6 z-30 flex items-center justify-between pointer-events-none">
        {/* Top-Left: Small raised pill with A5X mark + Lab status */}
        <div className="neu-panel px-3.5 py-1.5 rounded-full flex items-center space-x-2.5 pointer-events-auto shadow-neu-raised">
          <div className="w-5 h-5 rounded-md bg-[#1677FF] flex items-center justify-center font-bold text-white text-[10px] tracking-tight">
            A5X
          </div>
          <div className="flex items-center space-x-1.5 text-xs">
            <span className="font-semibold text-[#071B3A]">{labPill.lab}</span>
            <span className="text-[#9AA7B8]">·</span>
            <span className="text-[#5B6B82] font-medium">{labPill.desc}</span>
          </div>
        </div>

        {/* Top-Centre: Single Segmented View Mode Switcher */}
        <div className="pointer-events-auto">
          <NeuSegmented
            options={viewOptions}
            value={viewMode}
            onChange={handleModeChange}
          />
        </div>

        {/* Top-Right: Three round icon buttons (Map, Settings, Menu) */}
        <div className="flex items-center space-x-2.5 pointer-events-auto">
          <NeuIconButton
            icon={Map}
            tooltip="Campus Map (M)"
            ariaLabel="Open Campus Blueprint Map"
            active={isMapOpen}
            onClick={() => setIsMapOpen(true)}
          />
          <NeuIconButton
            icon={Sliders}
            tooltip="Settings & Controls"
            ariaLabel="Open Settings"
            active={isSettingsOpen}
            onClick={() => setIsSettingsOpen(true)}
          />
          <NeuIconButton
            icon={Menu}
            tooltip="Menu (ESC)"
            ariaLabel="Open Complex Pause Menu"
            active={isPauseOpen}
            onClick={() => setIsPauseOpen(true)}
          />
        </div>
      </header>

      {/* Door Activity Toast (Quiet & Non-Intrusive) */}
      {doorToast && (
        <div className="absolute top-20 left-1/2 -translate-x-1/2 z-30 pointer-events-none animate-fade-in">
          <div className="neu-panel px-3 py-1.5 rounded-full flex items-center space-x-2 text-xs text-[#071B3A] shadow-neu-raised-sm">
            <DoorOpen className="w-3.5 h-3.5 text-[#1677FF]" />
            <span className="font-medium">{doorToast}</span>
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* 2. 3D WEBGL CANVAS (Hero Layer) */}
      {/* ======================================================== */}
      <div 
        className="flex-1 w-full h-full cursor-crosshair"
        onClick={requestPointerLock}
        ref={(el) => {
          if (el) canvasRef.current = el.querySelector('canvas');
        }}
      >
        <Canvas 
          shadows={quality !== 'low'} 
          dpr={quality === 'low' ? 1.0 : quality === 'medium' ? [1, 1.25] : [1, 1.5]}
          gl={{
            powerPreference: 'high-performance',
            antialias: quality !== 'low',
            stencil: false,
            depth: true
          }}
        >
          <AdaptiveDpr pixelated />
          <PerformanceMonitor onDecline={() => setQuality('low')} />
          <ControlledCamera viewMode={viewMode} currentPresetKey={activePreset} />
          
          <color attach="background" args={['#B8D7F5']} />
          <fog attach="fog" args={['#C8DBEE', 45, 125]} />

          {/* Full Campus 3D Architecture */}
          <Campus showZoneMarkers={false} />

          {/* Dev Performance Stats Overlay (toggle with 'P') */}
          <PerformanceStats />

          {/* Player Controller */}
          <PlayerController
            isLocked={isPointerLocked}
            onLock={() => setIsPointerLocked(true)}
            onUnlock={() => setIsPointerLocked(false)}
          />
        </Canvas>
      </div>

      {/* Subtle First-Person Crosshair */}
      {viewMode === 'firstPerson' && (
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none z-10 flex items-center justify-center opacity-70">
          <div className="w-2 h-2 rounded-full border border-[#1677FF] bg-[#1677FF]/20" />
        </div>
      )}

      {/* ======================================================== */}
      {/* 3. BOTTOM HUD (Interaction Prompt, Controls Hint, Minimap) */}
      {/* ======================================================== */}
      {/* Bottom-Center: Proximity Interaction HUD (Only when near equipment) */}
      <InteractionHUD />

      {/* Virtual Mobile Joystick */}
      {mobileMode && <MobileControls />}

      {/* Bottom Dock: Controls Hint (Left) & Minimap (Right) */}
      <div className="absolute bottom-5 left-6 right-6 z-20 flex items-end justify-between pointer-events-none">
        {/* Bottom-Left: Tiny controls hint (auto-hides after 8s) */}
        {showControlsHint ? (
          <div className="neu-panel px-3 py-1.5 rounded-full flex items-center space-x-2 text-xs text-[#5B6B82] shadow-neu-raised-sm pointer-events-auto transition-opacity duration-300">
            <span>WASD move</span>
            <span>·</span>
            <span>Shift run</span>
            <span>·</span>
            <span>E interact</span>
          </div>
        ) : (
          <div />
        )}

        {/* Bottom-Right: Compact Minimap */}
        <Minimap onExpand={() => setIsMapOpen(true)} />
      </div>

      {/* ======================================================== */}
      {/* 4. MODALS & POPUPS (Light Neumorphic Design) */}
      {/* ======================================================== */}
      <EquipmentModal />

      <CampusMapModal
        isOpen={isMapOpen}
        onClose={() => setIsMapOpen(false)}
      />

      <SettingsModal
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
        mobileMode={mobileMode}
        onToggleMobile={() => setMobileMode((prev) => !prev)}
      />

      <PauseMenu
        isOpen={isPauseOpen}
        onResume={() => setIsPauseOpen(false)}
        onOpenMap={() => setIsMapOpen(true)}
      />
    </div>
  );
}
