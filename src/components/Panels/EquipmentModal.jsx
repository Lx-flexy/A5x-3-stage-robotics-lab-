import React, { useState, useEffect } from 'react';
import { useStore } from '../../store/useStore';
import { EQUIPMENT_CATALOG } from '../../data/equipment';
import { Equipment3DViewer } from './Equipment3DViewer';
import { soundManager } from '../../utils/soundEffects';
import { Chip, KeyCap } from '../UI/NeuComponents';
import { 
  X, 
  Cpu, 
  Layers, 
  Zap, 
  CheckCircle2, 
  Box, 
  Image as ImageIcon 
} from 'lucide-react';

export function EquipmentModal() {
  const activeInteraction = useStore((state) => state.activeInteraction);
  const setActiveInteraction = useStore((state) => state.setActiveInteraction);
  const [activeTab, setActiveTab] = useState('photo'); // 'photo' | '3d'

  useEffect(() => {
    if (activeInteraction) {
      soundManager.playInspectionChime();
    }
  }, [activeInteraction]);

  // Handle ESC key to dismiss
  useEffect(() => {
    if (!activeInteraction) return;
    const handleKeyDown = (e) => {
      if (e.code === 'Escape') setActiveInteraction(null);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeInteraction, setActiveInteraction]);

  if (!activeInteraction) return null;

  const data = EQUIPMENT_CATALOG[activeInteraction] || {
    name: 'A5X Innovation Lab Equipment',
    category: 'Advanced Prototyping',
    badge: 'Hardware',
    status: 'Operational',
    description: 'Detailed specifications and operating guidelines for A5X Innovation Lab hardware.',
    specs: {},
    applications: []
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-end md:p-6 p-0 bg-[#071B3A]/30 backdrop-blur-[6px] animate-fade-in pointer-events-auto"
      onClick={() => setActiveInteraction(null)}
    >
      <div 
        className="w-full md:w-[350px] md:max-h-[88vh] h-[80vh] md:h-auto rounded-t-2xl md:rounded-neu-panel bg-[#FFFFFF] border border-[rgba(7,27,58,0.1)] shadow-[-8px_8px_24px_rgba(163,177,198,0.4)] flex flex-col overflow-hidden text-[#071B3A]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Bar */}
        <div className="flex items-start justify-between px-5 pt-5 pb-3 border-b border-[rgba(7,27,58,0.06)] bg-[#F1F4F8]/70">
          <div className="flex items-start space-x-3">
            <div className="w-10 h-10 rounded-xl bg-[#FFFFFF] border border-[rgba(7,27,58,0.08)] shadow-neu-raised-sm flex items-center justify-center text-[#1677FF] shrink-0 mt-0.5">
              <Cpu className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-sm font-semibold text-[#071B3A] leading-snug">
                {data.name}
              </h2>
              <p className="text-xs text-[#5B6B82] mt-0.5">
                {data.category}
              </p>
            </div>
          </div>

          <button
            onClick={() => setActiveInteraction(null)}
            className="w-8 h-8 rounded-full bg-[#FFFFFF] hover:bg-[#E9EEF5] text-[#5B6B82] hover:text-[#071B3A] border border-[rgba(7,27,58,0.08)] flex items-center justify-center transition-colors shadow-neu-raised-sm shrink-0"
            title="Close (ESC)"
            aria-label="Close Equipment Info"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Scrollable Body */}
        <div className="flex-1 overflow-y-auto p-5 space-y-4">
          {/* Visual Display Switcher */}
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-semibold text-[#5B6B82] uppercase tracking-wider">
              Preview
            </span>
            <div className="flex bg-[#E9EEF5] p-0.5 rounded-lg border border-[rgba(7,27,58,0.06)]">
              <button
                onClick={() => setActiveTab('photo')}
                className={`flex items-center space-x-1 px-2.5 py-1 rounded text-xs transition-colors ${
                  activeTab === 'photo' ? 'bg-[#FFFFFF] text-[#071B3A] font-medium shadow-neu-raised-sm' : 'text-[#5B6B82]'
                }`}
              >
                <ImageIcon className="w-3.5 h-3.5 text-[#5B6B82]" />
                <span>Image</span>
              </button>
              <button
                onClick={() => setActiveTab('3d')}
                className={`flex items-center space-x-1 px-2.5 py-1 rounded text-xs transition-colors ${
                  activeTab === '3d' ? 'bg-[#FFFFFF] text-[#1677FF] font-medium shadow-neu-raised-sm' : 'text-[#5B6B82]'
                }`}
              >
                <Box className="w-3.5 h-3.5 text-[#1677FF]" />
                <span>3D View</span>
              </button>
            </div>
          </div>

          {/* Visual Container */}
          {activeTab === 'photo' ? (
            <div className="relative rounded-xl overflow-hidden border border-[rgba(7,27,58,0.08)] bg-[#F1F4F8] h-40">
              <img 
                src={data.image} 
                alt={data.name} 
                className="w-full h-full object-cover" 
              />
              <div className="absolute bottom-2.5 left-2.5">
                <Chip variant="success">Operational</Chip>
              </div>
            </div>
          ) : (
            <div className="rounded-xl overflow-hidden border border-[rgba(7,27,58,0.08)] bg-[#F1F4F8]">
              <Equipment3DViewer equipmentId={activeInteraction} />
            </div>
          )}

          {/* One-Line Summary / Description */}
          <div>
            <h3 className="text-xs font-semibold text-[#071B3A] mb-1">
              Overview
            </h3>
            <p className="text-xs text-[#5B6B82] leading-relaxed">
              {data.description}
            </p>
          </div>

          {/* Specifications Clean 2-Column List */}
          {data.specs && Object.keys(data.specs).length > 0 && (
            <div>
              <h3 className="text-xs font-semibold text-[#071B3A] mb-2">
                Technical Specifications
              </h3>
              <div className="grid grid-cols-2 gap-2 text-xs">
                {Object.entries(data.specs).map(([key, val]) => (
                  <div key={key} className="bg-[#F1F4F8] p-2 rounded-lg border border-[rgba(7,27,58,0.06)]">
                    <span className="text-[#5B6B82] text-[11px] block">{key}</span>
                    <span className="text-[#071B3A] font-medium block truncate" title={val}>{val}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Applications as Small Neutral Chips */}
          {data.applications && data.applications.length > 0 && (
            <div>
              <h3 className="text-xs font-semibold text-[#071B3A] mb-2">
                Applications
              </h3>
              <div className="flex flex-wrap gap-1.5">
                {data.applications.map((app, i) => (
                  <Chip key={i} variant="neutral">
                    {app}
                  </Chip>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Footer with ESC hint */}
        <div className="px-5 py-3 border-t border-[rgba(7,27,58,0.06)] bg-[#F1F4F8]/70 flex items-center justify-between text-xs text-[#5B6B82]">
          <span>Lab Equipment Directory</span>
          <span className="flex items-center space-x-1.5 text-[11px]">
            <span>Press</span>
            <KeyCap>ESC</KeyCap>
            <span>to close</span>
          </span>
        </div>
      </div>
    </div>
  );
}
