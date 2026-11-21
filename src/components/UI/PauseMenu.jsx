import React from 'react';
import { useStore } from '../../store/useStore';
import { useNavigate } from 'react-router-dom';
import { 
  NeuButton, 
  NeuCard, 
  CircularProgress, 
  KeyCap 
} from './NeuComponents';
import { 
  Play, 
  Map, 
  RotateCcw, 
  LogOut, 
  Sliders, 
  X 
} from 'lucide-react';

export function PauseMenu({ isOpen, onResume, onOpenMap }) {
  const navigate = useNavigate();
  const resetPlayer = useStore((state) => state.resetPlayer);
  const quality = useStore((state) => state.quality);
  const setQuality = useStore((state) => state.setQuality);

  // Close on Escape key
  React.useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e) => {
      if (e.code === 'Escape') onResume();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onResume]);

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#071B3A]/30 backdrop-blur-[6px] animate-fade-in pointer-events-auto"
      onClick={onResume}
    >
      <div 
        className="w-full max-w-sm rounded-neu-panel bg-[#FFFFFF] border border-[rgba(7,27,58,0.1)] shadow-[-12px_12px_32px_rgba(163,177,198,0.45)] p-6 flex flex-col text-[#071B3A] space-y-4"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-[rgba(7,27,58,0.06)]">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 rounded-lg bg-[#1677FF] flex items-center justify-center font-bold text-white text-xs">
              A5X
            </div>
            <div>
              <h2 className="text-sm font-semibold text-[#071B3A]">Campus Menu</h2>
              <p className="text-xs text-[#5B6B82]">Simulation paused</p>
            </div>
          </div>
          <button 
            onClick={onResume} 
            className="w-7 h-7 rounded-full bg-[#F1F4F8] hover:bg-[#E9EEF5] flex items-center justify-center text-[#5B6B82] hover:text-[#071B3A] transition-colors"
            aria-label="Resume"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Action Buttons */}
        <div className="space-y-2">
          {/* Resume (Primary) */}
          <NeuButton
            variant="primary"
            size="lg"
            icon={Play}
            onClick={onResume}
            className="w-full justify-start"
          >
            Resume Simulation
          </NeuButton>

          {/* Interactive Campus Map */}
          <NeuButton
            variant="default"
            size="md"
            icon={Map}
            onClick={() => {
              onResume();
              onOpenMap();
            }}
            className="w-full justify-start"
          >
            Campus Map & Directory
          </NeuButton>

          {/* Reset Position to Spawn */}
          <NeuButton
            variant="default"
            size="md"
            icon={RotateCcw}
            onClick={() => {
              resetPlayer();
              onResume();
            }}
            className="w-full justify-start"
          >
            Restart at Entrance Spawn
          </NeuButton>
        </div>

        {/* Quality Settings Segmented Control */}
        <div className="p-3 bg-[#F1F4F8] rounded-xl border border-[rgba(7,27,58,0.06)] space-y-2">
          <div className="flex items-center justify-between text-xs text-[#5B6B82] font-medium">
            <span className="flex items-center space-x-1.5">
              <Sliders className="w-3.5 h-3.5" />
              <span>Graphics Fidelity</span>
            </span>
            <span className="capitalize text-[#071B3A] font-semibold">{quality}</span>
          </div>

          <div className="grid grid-cols-3 gap-1 text-xs">
            {['low', 'medium', 'high'].map((q) => (
              <button
                key={q}
                onClick={() => setQuality(q)}
                className={`py-1.5 rounded-md font-medium capitalize border transition-all text-xs ${
                  quality === q
                    ? 'bg-[#FFFFFF] text-[#1677FF] border-[#1677FF]/30 shadow-neu-raised-sm'
                    : 'bg-transparent text-[#5B6B82] border-transparent hover:text-[#071B3A]'
                }`}
              >
                {q}
              </button>
            ))}
          </div>
        </div>

        {/* Explored Progress Bar / Quiet Ring */}
        <div className="flex items-center justify-between px-2 py-1 text-xs text-[#5B6B82]">
          <span>Campus Exploration</span>
          <div className="flex items-center space-x-2">
            <CircularProgress percent={100} size={28} strokeWidth={3} />
          </div>
        </div>

        {/* Exit to Landing Page */}
        <div className="pt-2 border-t border-[rgba(7,27,58,0.06)]">
          <button
            onClick={() => navigate('/')}
            className="w-full py-2 px-3 text-xs text-[#5B6B82] hover:text-red-600 rounded-lg flex items-center justify-center space-x-1.5 hover:bg-red-50 transition-colors"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Exit to Overview Page</span>
          </button>
        </div>
      </div>
    </div>
  );
}
