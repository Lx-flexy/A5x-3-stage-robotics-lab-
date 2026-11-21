import { create } from 'zustand';
import { CAMPUS_CONFIG } from '../data/config';

export const useStore = create((set, get) => ({
  // View mode: 'firstPerson', 'topDown', 'isometric'
  viewMode: 'firstPerson',
  setViewMode: (mode) => set({ viewMode: mode }),

  // Quality settings: 'low', 'medium', 'high' (defaults to 'medium', saved in localStorage)
  quality: typeof window !== 'undefined' ? (localStorage.getItem('a5x_quality') || 'medium') : 'medium',
  setQuality: (quality) => {
    if (typeof window !== 'undefined') localStorage.setItem('a5x_quality', quality);
    set({ quality });
  },

  // Player position & state
  playerPosition: [...CAMPUS_CONFIG.spawn.position],
  playerRotation: 0,
  setPlayerPosition: (pos) => set({ playerPosition: pos }),
  setPlayerRotation: (rot) => set({ playerRotation: rot }),

  // Current Lab & Zone tracking
  activeLabId: 'alpha',
  activeZoneId: null,
  setActiveLabId: (labId) => set({ activeLabId: labId }),
  setActiveZoneId: (zoneId) => set({ activeZoneId: zoneId }),

  // Sliding Door states: 'open' | 'closed'
  doorStates: {
    'door-main-entrance': false,
    'door-alpha-beta': false,
    'door-beta-gamma': false,
    'door-gamma-arena': false,
  },
  setDoorOpen: (doorId, isOpen) => set((state) => ({
    doorStates: { ...state.doorStates, [doorId]: isOpen }
  })),

  // UI state
  isPaused: false,
  setIsPaused: (isPaused) => set({ isPaused }),
  showMinimap: true,
  setShowMinimap: (show) => set({ showMinimap: show }),
  showControlsHelp: true,
  setShowControlsHelp: (show) => set({ showControlsHelp: show }),
  showCeiling: false,
  setShowCeiling: (showCeiling) => set({ showCeiling }),

  // Active interaction modal / info
  activeInteraction: null,
  setActiveInteraction: (item) => set({ activeInteraction: item }),

  // Reset player to spawn
  resetPlayer: () => set({
    playerPosition: [...CAMPUS_CONFIG.spawn.position],
    activeLabId: 'alpha',
    activeZoneId: null,
    isPaused: false
  })
}));

if (typeof window !== 'undefined') {
  window.__useStore = useStore;
}
