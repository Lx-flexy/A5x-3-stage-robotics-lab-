import React, { useState } from 'react';
import { useStore } from '../../store/useStore';
import { ZONES_CATALOG } from '../../data/zones';
import { CircularProgress, KeyCap, NeuButton, Chip } from '../UI/NeuComponents';
import { X, Navigation, MapPin } from 'lucide-react';
import { soundManager } from '../../utils/soundEffects';

export function CampusMapModal({ isOpen, onClose }) {
  const setPlayerPosition = useStore((state) => state.setPlayerPosition);
  const activeLabId = useStore((state) => state.activeLabId);
  const [selectedLabTab, setSelectedLabTab] = useState('alpha');

  React.useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e) => {
      if (e.code === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleTeleport = (x, z) => {
    soundManager.playTeleport();
    setPlayerPosition([x, 1.65, z]);
    onClose();
  };

  const labSections = [
    {
      id: 'alpha',
      badge: 'A',
      title: 'Lab Alpha',
      role: 'Foundation Lab',
      footprint: '0m – 16m',
      desc: 'Introductory electronics, modular circuit kits, Design & Print Corner with Bambu A1 Mini, and coding stations.',
      target: [8.0, 6.0],
    },
    {
      id: 'beta',
      badge: 'B',
      title: 'Lab Beta',
      role: 'Development Lab',
      footprint: '16m – 32m',
      desc: 'IoT development, telemetry display, Bambu A1 + AMS Lite, SMD precision soldering, and prototyping benches.',
      target: [24.0, 6.0],
    },
    {
      id: 'gammaMain',
      badge: 'G',
      title: 'Lab Gamma',
      role: 'Advanced Innovation',
      footprint: '32m – 48m',
      desc: 'Panoramic Matrix Digital Wall, VR/AR spatial immersion lounge, and Pro X-1 Industrial 3D Printer.',
      target: [40.0, 6.0],
    },
    {
      id: 'gammaArena',
      badge: 'R',
      title: 'Robotics Arena',
      role: 'Autonomy Testing Bay',
      footprint: '48m – 60m',
      desc: 'Robo Race Arena, Robo Soccer Pitch, Line Follower Track, Trophy Showcase, and Diagnostic Bench.',
      target: [54.0, 6.0],
    }
  ];

  // Zones for selected tab
  const labZones = ZONES_CATALOG[selectedLabTab] || [];

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-6 bg-[#071B3A]/35 backdrop-blur-[6px] animate-fade-in pointer-events-auto"
      onClick={onClose}
    >
      <div 
        className="w-full max-w-4xl max-h-[90vh] rounded-neu-panel bg-[#FFFFFF] border border-[rgba(7,27,58,0.1)] shadow-[-12px_12px_32px_rgba(163,177,198,0.45)] flex flex-col overflow-hidden text-[#071B3A]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[rgba(7,27,58,0.06)] bg-[#F1F4F8]/80">
          <div className="flex items-center space-x-3">
            <CircularProgress percent={100} size={36} strokeWidth={3.5} />
            <div>
              <h2 className="text-sm font-semibold text-[#071B3A]">
                Campus Blueprint & Zone Directory
              </h2>
              <p className="text-xs text-[#5B6B82]">
                60m continuous complex · Alpha · Beta · Gamma · Robotics Arena
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-[#FFFFFF] hover:bg-[#E9EEF5] text-[#5B6B82] hover:text-[#071B3A] border border-[rgba(7,27,58,0.08)] flex items-center justify-center transition-colors shadow-neu-raised-sm"
            title="Close (ESC)"
            aria-label="Close Map"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Tab Selection Bar */}
        <div className="flex items-center space-x-2 px-6 pt-4 pb-2 border-b border-[rgba(7,27,58,0.06)] bg-[#FFFFFF] overflow-x-auto">
          {labSections.map((sec) => {
            const isSelected = selectedLabTab === sec.id;
            const isCurrentInWorld = 
              (sec.id === 'alpha' && activeLabId === 'alpha') ||
              (sec.id === 'beta' && activeLabId === 'beta') ||
              (sec.id === 'gammaMain' && activeLabId === 'gamma') ||
              (sec.id === 'gammaArena' && activeLabId === 'gamma-arena');

            return (
              <button
                key={sec.id}
                onClick={() => setSelectedLabTab(sec.id)}
                className={`flex items-center space-x-2 px-3.5 py-1.5 rounded-lg text-xs font-semibold select-none transition-all duration-180 border whitespace-nowrap ${
                  isSelected
                    ? 'bg-[#1677FF] text-white border-[#1677FF] shadow-sm'
                    : 'bg-[#F1F4F8] hover:bg-[#E9EEF5] text-[#5B6B82] hover:text-[#071B3A] border-transparent'
                }`}
              >
                <span>{sec.title}</span>
                {isCurrentInWorld && (
                  <span className={`w-2 h-2 rounded-full ${isSelected ? 'bg-white' : 'bg-[#1677FF]'}`} />
                )}
              </button>
            );
          })}
        </div>

        {/* Modal Body: Selected Lab Overview + Zone Directory */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {/* Active Lab Card */}
          {(() => {
            const current = labSections.find((s) => s.id === selectedLabTab) || labSections[0];
            return (
              <div className="p-4 rounded-xl bg-[#F1F4F8] border border-[rgba(7,27,58,0.06)] flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div className="space-y-1">
                  <div className="flex items-center space-x-2">
                    <span className="w-6 h-6 rounded-md bg-[#FFFFFF] text-[#1677FF] font-bold text-xs flex items-center justify-center border border-[rgba(7,27,58,0.08)]">
                      {current.badge}
                    </span>
                    <h3 className="text-sm font-semibold text-[#071B3A]">{current.title}</h3>
                    <Chip variant="neutral">{current.footprint}</Chip>
                  </div>
                  <p className="text-xs text-[#5B6B82] max-w-xl">{current.desc}</p>
                </div>
                <NeuButton
                  variant="primary"
                  size="md"
                  icon={Navigation}
                  onClick={() => handleTeleport(current.target[0], current.target[1])}
                >
                  Teleport Here
                </NeuButton>
              </div>
            );
          })()}

          {/* Zones in this section */}
          <div>
            <h4 className="text-xs font-semibold text-[#5B6B82] uppercase tracking-wider mb-3">
              Specialized Zones & Equipment
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2.5">
              {labZones.map((z) => (
                <div
                  key={z.id}
                  className="p-3 rounded-lg bg-[#FFFFFF] border border-[rgba(7,27,58,0.08)] hover:border-[#1677FF]/40 transition-colors shadow-sm flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs font-semibold text-[#071B3A]">{z.name}</span>
                      <MapPin className="w-3.5 h-3.5 text-[#5B6B82]" />
                    </div>
                    <p className="text-[11px] text-[#5B6B82]">{z.subtitle}</p>
                  </div>
                  <div className="mt-2.5 pt-2 border-t border-[rgba(7,27,58,0.04)] flex items-center justify-between text-[11px]">
                    <span className="text-[#9AA7B8]">{z.type === 'ceiling' ? 'Ceiling Sign' : 'Wall Sign'}</span>
                    <button
                      onClick={() => handleTeleport(z.teleport[0], z.teleport[2])}
                      className="text-[#1677FF] hover:underline font-medium"
                    >
                      Jump
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="px-6 py-3 border-t border-[rgba(7,27,58,0.06)] bg-[#F1F4F8]/80 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-[#5B6B82]">
          <div className="flex items-center space-x-2">
            <span>Outside Entrance:</span>
            <button
              onClick={() => handleTeleport(8, 19)}
              className="text-[#1677FF] hover:underline font-medium"
            >
              Spawn Plaza (8, 1.65, 19)
            </button>
          </div>
          <div className="flex items-center space-x-1.5 text-[11px]">
            <span>Press</span>
            <KeyCap>ESC</KeyCap>
            <span>to return to simulation</span>
          </div>
        </div>
      </div>
    </div>
  );
}
