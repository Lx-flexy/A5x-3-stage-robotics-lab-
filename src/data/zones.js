/**
 * Single Source of Truth for A5X Innovation Lab Zones & Signage
 * Drives 3D Wall & Ceiling Signage, Minimap Radar, Campus Map Modal, and Teleporting.
 */

export const ZONES_CATALOG = {
  // ==========================================
  // LAB ALPHA ZONES
  // ==========================================
  alpha: [
    {
      id: 'alpha-design-print',
      labId: 'alpha',
      name: 'Design & 3D Print Corner',
      subtitle: 'CAD Modelling • Bambu Lab A1 Mini',
      icon: 'Printer',
      type: 'wall',
      position: [3.0, 2.4, 0.16],
      rotation: [0, 0, 0], // Facing +Z (into the room from back wall)
      width: 2.4,
      height: 0.45,
      equipmentId: 'bambu-mini',
      teleport: [3.0, 1.65, 2.2],
      mapBounds: { x: [1.0, 4.8], z: [0.4, 1.8] }
    },
    {
      id: 'alpha-teaching',
      labId: 'alpha',
      name: 'Lab Alpha Teaching Center',
      subtitle: 'Foundation Lab • Interactive Whiteboard',
      icon: 'Tv',
      type: 'wall',
      position: [8.0, 2.7, 0.16],
      rotation: [0, 0, 0],
      width: 3.2,
      height: 0.5,
      equipmentId: 'whiteboard',
      teleport: [8.0, 1.65, 2.6],
      mapBounds: { x: [5.2, 10.8], z: [0.1, 1.4] }
    },
    {
      id: 'alpha-hardware',
      labId: 'alpha',
      name: 'Hardware Zone',
      subtitle: 'Kits • Hand Tools • Component Trays',
      icon: 'Cpu',
      type: 'wall',
      position: [13.5, 2.4, 0.16],
      rotation: [0, 0, 0],
      width: 2.2,
      height: 0.45,
      equipmentId: 'hardware-bench',
      teleport: [13.5, 1.65, 2.2],
      mapBounds: { x: [12.0, 15.2], z: [0.4, 1.8] }
    },
    {
      id: 'alpha-electronics',
      labId: 'alpha',
      name: 'Electronics Zone',
      subtitle: 'Sensors • Microcontrollers • Prototyping',
      icon: 'Layers',
      type: 'wall',
      position: [0.16, 2.4, 2.8],
      rotation: [0, Math.PI / 2, 0], // Facing +X into room from West wall
      width: 2.2,
      height: 0.45,
      equipmentId: 'electronics-rack',
      teleport: [1.8, 1.65, 2.8],
      mapBounds: { x: [0.2, 1.4], z: [1.8, 3.8] }
    },
    {
      id: 'alpha-soldering',
      labId: 'alpha',
      name: 'Soldering Arena',
      subtitle: 'Soldering & Assembly [Safety Certified]',
      icon: 'Flame',
      type: 'wall',
      position: [0.16, 2.4, 9.8],
      rotation: [0, Math.PI / 2, 0],
      width: 2.4,
      height: 0.45,
      equipmentId: 'soldering-arena',
      teleport: [2.2, 1.65, 9.8],
      mapBounds: { x: [0.4, 2.8], z: [8.6, 11.4] }
    },
    {
      id: 'alpha-coding',
      labId: 'alpha',
      name: 'Coding Area',
      subtitle: 'Introductory Programming & Simulation',
      icon: 'Code',
      type: 'wall',
      position: [15.84, 2.4, 10.0],
      rotation: [0, -Math.PI / 2, 0], // Facing -X from East wall
      width: 2.2,
      height: 0.45,
      equipmentId: 'workstation-pc',
      teleport: [14.2, 1.65, 10.0],
      mapBounds: { x: [14.6, 15.8], z: [8.8, 11.2] }
    },
    {
      id: 'alpha-seating',
      labId: 'alpha',
      name: 'Student Collaboration Area',
      subtitle: '44 Modular Workstations • Team Engineering',
      icon: 'Users',
      type: 'ceiling',
      position: [8.0, 2.65, 6.3],
      rotation: [0, 0, 0],
      width: 3.0,
      height: 0.48,
      equipmentId: null,
      teleport: [8.0, 1.65, 6.3],
      mapBounds: { x: [4.2, 11.8], z: [4.0, 8.6] }
    }
  ],

  // ==========================================
  // LAB BETA ZONES (Revision 8)
  // ==========================================
  beta: [
    {
      id: 'beta-design-print',
      labId: 'beta',
      name: '3D Printing Zone',
      subtitle: 'Print · Prototype · Iterate • Bambu Lab A1',
      icon: 'Printer',
      type: 'wall',
      position: [31.94, 2.05, 2.15],
      rotation: [0, -Math.PI / 2, 0],
      width: 2.0,
      height: 0.45,
      equipmentId: 'bambu-lab-a1',
      teleport: [30.2, 1.65, 2.35],
      mapBounds: { x: [31.4, 31.95], z: [0.05, 4.65] }
    },
    {
      id: 'beta-teaching',
      labId: 'beta',
      name: 'Lab Beta Innovation Center',
      subtitle: 'Development Lab • Interactive Smart Dashboard',
      icon: 'Tv',
      type: 'wall',
      position: [24.0, 2.7, 0.16],
      rotation: [0, 0, 0],
      width: 3.4,
      height: 0.5,
      equipmentId: 'smart-display-beta',
      teleport: [24.0, 1.65, 2.6],
      mapBounds: { x: [21.2, 26.8], z: [0.1, 1.4] }
    },
    {
      id: 'beta-hardware',
      labId: 'beta',
      name: 'HARDWARE ZONE',
      subtitle: 'Boards · Kits · Robotics',
      icon: 'Cpu',
      type: 'wall',
      position: [16.14, 2.50, 1.5],
      rotation: [0, Math.PI / 2, 0],
      width: 1.8,
      height: 0.42,
      equipmentId: 'raspberry-pi-5',
      teleport: [17.6, 1.65, 1.5],
      mapBounds: { x: [16.2, 17.0], z: [0.3, 2.7] }
    },
    {
      id: 'beta-electronics',
      labId: 'beta',
      name: 'ELECTRONICS ZONE',
      subtitle: 'Sensors · Microcontrollers · Components',
      icon: 'Layers',
      type: 'wall',
      position: [16.14, 2.50, 3.6],
      rotation: [0, Math.PI / 2, 0],
      width: 1.4,
      height: 0.42,
      equipmentId: 'esp32-ecosystem',
      teleport: [17.6, 1.65, 3.6],
      mapBounds: { x: [16.2, 17.0], z: [3.1, 4.1] }
    },
    {
      id: 'beta-soldering',
      labId: 'beta',
      name: 'SOLDERING & ASSEMBLY',
      subtitle: 'Precision Solder · SMD · Rework',
      icon: 'Flame',
      type: 'wall',
      position: [16.14, 2.52, 9.7],
      rotation: [0, Math.PI / 2, 0],
      width: 2.4,
      height: 0.45,
      equipmentId: 'soldering-station',
      teleport: [17.8, 1.65, 9.7],
      mapBounds: { x: [16.2, 17.2], z: [7.6, 11.8] }
    },
    {
      id: 'beta-coding',
      labId: 'beta',
      name: 'Coding Area',
      subtitle: 'Embedded Python & C++ • Algorithms',
      icon: 'Code',
      type: 'wall',
      position: [31.84, 2.4, 8.7],
      rotation: [0, -Math.PI / 2, 0],
      width: 1.5,
      height: 0.42,
      equipmentId: 'coding-workstation',
      teleport: [30.4, 1.65, 8.7],
      mapBounds: { x: [31.0, 31.8], z: [7.8, 9.6] }
    },
    {
      id: 'beta-designing',
      labId: 'beta',
      name: 'Designing Area',
      subtitle: 'CAD Modeling • Mechanical Design',
      icon: 'Sliders',
      type: 'wall',
      position: [31.84, 2.4, 10.8],
      rotation: [0, -Math.PI / 2, 0],
      width: 1.5,
      height: 0.42,
      equipmentId: 'designing-workstation',
      teleport: [30.4, 1.65, 10.8],
      mapBounds: { x: [31.0, 31.8], z: [9.9, 11.7] }
    },
    {
      id: 'beta-seating',
      labId: 'beta',
      name: 'Student Collaboration Area',
      subtitle: '44 Modular Workstations • Team Engineering',
      icon: 'Users',
      type: 'ceiling',
      position: [24.0, 2.65, 6.3],
      rotation: [0, 0, 0],
      width: 3.0,
      height: 0.48,
      equipmentId: null,
      teleport: [24.0, 1.65, 6.3],
      mapBounds: { x: [20.2, 27.8], z: [4.0, 10.0] }
    }
  ],

  // ==========================================
  // ==========================================
  // LAB GAMMA MAIN BAY ZONES (Revision 12)
  // ==========================================
  gammaMain: [
    {
      id: 'gamma-teaching',
      labId: 'gamma',
      name: 'Teaching & Learning Zone',
      subtitle: 'Advanced Innovation Lab • Hexagonal Smart Display',
      icon: 'Tv',
      type: 'wall',
      position: [40.0, 2.7, 0.16],
      rotation: [0, 0, 0],
      width: 3.6,
      height: 0.5,
      equipmentId: 'digital-wall-gamma',
      teleport: [40.0, 1.65, 2.6],
      mapBounds: { x: [37.2, 42.8], z: [0.1, 1.4] }
    },
    {
      id: 'gamma-coding',
      labId: 'gamma',
      name: '</> Coding Zone',
      subtitle: 'Autonomous ROS 2 • Python & C++ Workstations',
      icon: 'Code',
      type: 'wall',
      position: [32.14, 2.45, 2.35],
      rotation: [0, Math.PI / 2, 0],
      width: 2.2,
      height: 0.45,
      equipmentId: 'coding-workstation',
      teleport: [33.8, 1.65, 2.35],
      mapBounds: { x: [32.2, 33.6], z: [1.2, 3.5] }
    },
    {
      id: 'gamma-soldering',
      labId: 'gamma',
      name: 'Soldering & Assembly Arena',
      subtitle: 'Precision SMD • Fume Extraction • 4 Workstations',
      icon: 'Flame',
      type: 'wall',
      position: [32.14, 2.50, 9.65],
      rotation: [0, Math.PI / 2, 0],
      width: 2.6,
      height: 0.45,
      equipmentId: 'soldering-station',
      teleport: [34.0, 1.65, 9.65],
      mapBounds: { x: [32.2, 34.2], z: [8.5, 11.2] }
    },
    {
      id: 'gamma-designing',
      labId: 'gamma',
      name: 'Designing Zone',
      subtitle: '3D CAD Modeling • Robotic Systems Design',
      icon: 'Sliders',
      type: 'wall',
      position: [47.86, 2.45, 2.35],
      rotation: [0, -Math.PI / 2, 0],
      width: 2.2,
      height: 0.45,
      equipmentId: 'coding-workstation',
      teleport: [46.2, 1.65, 2.35],
      mapBounds: { x: [46.4, 47.8], z: [1.2, 3.5] }
    },
    {
      id: 'gamma-design-print',
      labId: 'gamma',
      name: '3D Printing Zone',
      subtitle: 'Bambu Lab H2D Pro & A1 • High-Temp Fabrication',
      icon: 'Printer',
      type: 'wall',
      position: [45.5, 2.45, 0.16],
      rotation: [0, 0, 0],
      width: 2.5,
      height: 0.45,
      equipmentId: 'a5x-pro-x1',
      teleport: [45.5, 1.65, 1.8],
      mapBounds: { x: [44.0, 47.0], z: [0.4, 1.6] }
    },
    {
      id: 'gamma-hardware',
      labId: 'gamma',
      name: 'Hardware Zone',
      subtitle: 'Robotics Kits • Drones • Microcontrollers',
      icon: 'Cpu',
      type: 'wall',
      position: [36.0, 2.52, 11.45],
      rotation: [0, Math.PI, 0],
      width: 2.6,
      height: 0.45,
      equipmentId: 'raspberry-pi-5',
      teleport: [36.0, 1.65, 10.4],
      mapBounds: { x: [33.8, 38.2], z: [10.8, 11.8] }
    },
    {
      id: 'gamma-electronics',
      labId: 'gamma',
      name: 'Electronics Zone',
      subtitle: 'Sensors • ICs • Oscilloscopes • Power Supplies',
      icon: 'Layers',
      type: 'wall',
      position: [41.0, 2.52, 11.45],
      rotation: [0, Math.PI, 0],
      width: 2.6,
      height: 0.45,
      equipmentId: 'soldering-station',
      teleport: [41.0, 1.65, 10.4],
      mapBounds: { x: [38.8, 43.2], z: [10.8, 11.8] }
    },
    {
      id: 'gamma-vr',
      labId: 'gamma',
      name: 'AR / VR Zone',
      subtitle: 'Spatial Computing • XR Proving Ground',
      icon: 'Glasses',
      type: 'wall',
      position: [47.86, 2.50, 9.65],
      rotation: [0, -Math.PI / 2, 0],
      width: 2.4,
      height: 0.45,
      equipmentId: 'vr-headset-matrix',
      teleport: [45.8, 1.65, 9.65],
      mapBounds: { x: [45.5, 47.8], z: [8.5, 11.2] }
    },
    {
      id: 'gamma-seating',
      labId: 'gamma',
      name: 'Student Collaboration Area',
      subtitle: '44 Modular Workstations • Team Engineering',
      icon: 'Users',
      type: 'ceiling',
      position: [40.0, 2.65, 6.3],
      rotation: [0, 0, 0],
      width: 3.0,
      height: 0.48,
      equipmentId: null,
      teleport: [40.0, 1.65, 6.3],
      mapBounds: { x: [35.5, 44.5], z: [3.8, 10.8] }
    }
  ],

  // ==========================================
  // LAB GAMMA ARENA BAY (Robotics Dedicated — Revision 17)
  // Single sign: Robot Diagnostic Bench on right wall.
  // Arenas have integrated skirt lettering (Revision 17 signage rules).
  // ==========================================
  gammaArena: [
    {
      id: 'gamma-arena-prep',
      labId: 'gamma',
      name: 'Robot Diagnostic Bench',
      subtitle: 'Mechatronics Assembly • Chassis Tuning • Telemetry',
      icon: 'Wrench',
      type: 'wall',
      position: [59.82, 2.55, 8.5],
      rotation: [0, -Math.PI / 2, 0],
      width: 2.6,
      height: 0.45,
      equipmentId: 'gamma-diagnostic-bench',
      teleport: [58.2, 1.65, 8.5],
      mapBounds: { x: [59.0, 60.0], z: [6.5, 10.5] }
    }
  ]
};

/**
 * Helper to get all zones in a flat list
 */
export function getAllZones() {
  return [
    ...ZONES_CATALOG.alpha,
    ...ZONES_CATALOG.beta,
    ...ZONES_CATALOG.gammaMain,
    ...ZONES_CATALOG.gammaArena
  ];
}
