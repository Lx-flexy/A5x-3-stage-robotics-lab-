import React from 'react';
import { useStore } from '../../store/useStore';
import { soundManager } from '../../utils/soundEffects';
import { KeyCap } from './NeuComponents';
import { 
  X, 
  Volume2, 
  VolumeX, 
  Smartphone, 
  Eye, 
  Sliders, 
  HelpCircle 
} from 'lucide-react';

export function SettingsModal({ isOpen, onClose, mobileMode, onToggleMobile }) {
  const quality = useStore((state) => state.quality);
  const setQuality = useStore((state) => state.setQuality);
  const [isMuted, setIsMuted] = React.useState(soundManager.isMuted());

  React.useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e) => {
      if (e.code === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleToggleMute = () => {
    const nextState = soundManager.toggleMute();
    setIsMuted(nextState);
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#071B3A]/30 backdrop-blur-[6px] animate-fade-in pointer-events-auto"
      onClick={onClose}
    >
      <div 
        className="w-full max-w-sm rounded-neu-panel bg-[#FFFFFF] border border-[rgba(7,27,58,0.1)] shadow-[-12px_12px_32px_rgba(163,177,198,0.45)] p-6 flex flex-col text-[#071B3A] space-y-4"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-[rgba(7,27,58,0.06)]">
          <div className="flex items-center space-x-2.5">
            <Sliders className="w-4 h-4 text-[#1677FF]" />
            <h2 className="text-sm font-semibold text-[#071B3A]">Preferences & Controls</h2>
          </div>
          <button 
            onClick={onClose} 
            className="w-7 h-7 rounded-full bg-[#F1F4F8] hover:bg-[#E9EEF5] flex items-center justify-center text-[#5B6B82] hover:text-[#071B3A] transition-colors"
            aria-label="Close"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Settings Items */}
        <div className="space-y-3 text-xs">
          {/* Graphics Fidelity */}
          <div className="p-3 bg-[#F1F4F8] rounded-xl border border-[rgba(7,27,58,0.06)] space-y-2">
            <div className="flex items-center justify-between text-[#5B6B82] font-medium">
              <span>Graphics Quality</span>
              <span className="capitalize text-[#071B3A] font-semibold">{quality}</span>
            </div>
            <div className="grid grid-cols-3 gap-1">
              {['low', 'medium', 'high'].map((q) => (
                <button
                  key={q}
                  onClick={() => setQuality(q)}
                  className={`py-1.5 rounded-md font-medium capitalize border transition-all ${
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

          {/* Sound Toggle */}
          <div className="flex items-center justify-between p-3 bg-[#F1F4F8] rounded-xl border border-[rgba(7,27,58,0.06)]">
            <div className="flex items-center space-x-2.5">
              {isMuted ? <VolumeX className="w-4 h-4 text-red-500" /> : <Volume2 className="w-4 h-4 text-[#1677FF]" />}
              <span className="font-medium text-[#071B3A]">Sound Effects</span>
            </div>
            <button
              onClick={handleToggleMute}
              className={`px-3 py-1 rounded-md font-medium transition-all ${
                isMuted
                  ? 'bg-red-50 text-red-600 border border-red-200'
                  : 'bg-[#FFFFFF] text-[#071B3A] border border-[rgba(7,27,58,0.08)] shadow-neu-raised-sm'
              }`}
            >
              {isMuted ? 'Muted' : 'Enabled'}
            </button>
          </div>

          {/* Mobile Joystick Toggle */}
          <div className="flex items-center justify-between p-3 bg-[#F1F4F8] rounded-xl border border-[rgba(7,27,58,0.06)]">
            <div className="flex items-center space-x-2.5">
              <Smartphone className="w-4 h-4 text-[#1677FF]" />
              <span className="font-medium text-[#071B3A]">Touch Joystick</span>
            </div>
            <button
              onClick={onToggleMobile}
              className={`px-3 py-1 rounded-md font-medium transition-all ${
                mobileMode
                  ? 'bg-[#1677FF] text-white shadow-sm'
                  : 'bg-[#FFFFFF] text-[#5B6B82] border border-[rgba(7,27,58,0.08)] shadow-neu-raised-sm'
              }`}
            >
              {mobileMode ? 'Active' : 'Off'}
            </button>
          </div>
        </div>

        {/* Keyboard Controls Reference */}
        <div className="pt-2 border-t border-[rgba(7,27,58,0.06)]">
          <h4 className="text-[11px] font-semibold text-[#5B6B82] uppercase tracking-wider mb-2 flex items-center space-x-1.5">
            <HelpCircle className="w-3.5 h-3.5" />
            <span>Navigation Shortcuts</span>
          </h4>
          <div className="grid grid-cols-2 gap-1.5 text-[11px] text-[#5B6B82]">
            <div className="flex items-center justify-between bg-[#F1F4F8] p-2 rounded">
              <span>Move</span>
              <div className="flex space-x-0.5">
                <KeyCap>W</KeyCap><KeyCap>A</KeyCap><KeyCap>S</KeyCap><KeyCap>D</KeyCap>
              </div>
            </div>
            <div className="flex items-center justify-between bg-[#F1F4F8] p-2 rounded">
              <span>Sprint</span>
              <KeyCap>Shift</KeyCap>
            </div>
            <div className="flex items-center justify-between bg-[#F1F4F8] p-2 rounded">
              <span>Interact</span>
              <KeyCap>E</KeyCap>
            </div>
            <div className="flex items-center justify-between bg-[#F1F4F8] p-2 rounded">
              <span>Campus Map</span>
              <KeyCap>M</KeyCap>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
