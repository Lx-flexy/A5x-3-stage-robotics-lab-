/**
 * A5X EQUIPMENT CATALOG & SPECIFICATIONS
 * Comprehensive data for interactive modals, 3D inspection, and educational specs.
 */

export const EQUIPMENT_CATALOG = {
  'bambu-mini': {
    id: 'bambu-mini',
    name: 'Bambu Lab A1 Mini',
    lab: 'Lab Alpha (Foundation)',
    category: '3D Fabrication',
    badge: 'Beginner Friendly',
    status: 'Ready / Idle',
    image: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=800&auto=format&fit=crop&q=80',
    description: 'High-speed, beginner-accessible direct-drive 3D printer featuring active flow rate compensation and full-auto calibration. Ideal for introductory prototyping.',
    specs: {
      'Build Volume': '180 × 180 × 180 mm³',
      'Max Speed': '500 mm/s (Acceleration: 10,000 mm/s²)',
      'Nozzle Temp': 'Up to 300°C (All-Metal Hotend)',
      'Supported Materials': 'PLA, PETG, TPU, PVA',
      'Bed Leveling': 'Full-Auto Bed Leveling & Vibration Compensation',
      'Connectivity': 'Wi-Fi, Bambu Cloud, MicroSD'
    },
    applications: [
      'Rapid prototype chassis & sensor brackets',
      'Classroom robotics component fabrication',
      'Introductory CAD-to-physical workflows'
    ],
    safety: 'Hot nozzle hazard (300°C). Keep hands clear of moving gantry during high-speed printing.'
  },

  'bambu-a1-ams': {
    id: 'bambu-a1-ams',
    name: 'Bambu Lab A1 + AMS Lite (4-Color)',
    lab: 'Lab Beta (Development)',
    category: 'Multi-Material Prototyping',
    badge: 'Intermediate Pro',
    status: 'Active Print • 68% Complete',
    image: 'https://images.unsplash.com/photo-1631557559471-33157dfcb777?w=800&auto=format&fit=crop&q=80',
    description: 'High-precision multi-material additive manufacturing system featuring the AMS Lite 4-spool automatic feeder for multi-color, dissolvable support, and hybrid polymer fabrication.',
    specs: {
      'Build Volume': '256 × 256 × 256 mm³',
      'Multi-Color Feeder': 'AMS Lite 4-Spool Automatic Material System',
      'Max Acceleration': '10,000 mm/s²',
      'Nozzle Technology': 'Quick-Swap Hardened Steel Nozzle (0.4mm)',
      'Sensors': 'Filament runout, tangle detection, odometer',
      'Noise Level': '< 48 dB (Silent Stepper Drivers)'
    },
    applications: [
      'Multi-color robotics enclosures with integrated labels',
      'Complex geometries with dissolvable PVA supports',
      'Functional mechanical gears and snap-fit assemblies'
    ],
    safety: 'Ensure proper spool tensioning on rotary arms. Avoid touching heated bed during high-temp runs.'
  },

  'bambu-lab-a1': {
    id: 'bambu-lab-a1',
    name: 'Bambu Lab A1 Additive Fabricator',
    lab: 'Lab Beta (Development)',
    category: '3D Fabrication',
    badge: 'Production Grade',
    status: 'Printing • Blue Lattice Vase',
    image: 'https://images.unsplash.com/photo-1631557559471-33157dfcb777?w=800&auto=format&fit=crop&q=80',
    description: 'Full-size 256mm³ high-speed additive manufacturing system with active motor noise cancellation, eddy current flow compensation, and quick-swap all-metal hotend.',
    specs: {
      'Build Volume': '256 × 256 × 256 mm³',
      'Max Speed': '500 mm/s (Acceleration: 10,000 mm/s²)',
      'Hotend Temp': 'Up to 300°C',
      'Extrusion': 'Direct-Drive All-Metal Dual-Gear Extruder',
      'Bed Levelling': 'Full-Auto Multi-Point Mesh Bed Compensation',
      'Display': '3.5" IPS Full-Color Touchscreen'
    },
    applications: [
      'Lattice architecture & aerodynamic structural prototypes',
      'Functional robot chassis and gear train fabrication',
      'Rapid design iteration directly from Fusion 360'
    ],
    safety: 'Hot nozzle hazard (300°C). Keep workspace clear of moving gantry.'
  },

  'raspberry-pi-5': {
    id: 'raspberry-pi-5',
    name: 'Raspberry Pi 5 Developer Cluster',
    lab: 'Lab Beta (Development)',
    category: 'Embedded Computing',
    badge: 'Intermediate IoT',
    status: 'Active • ROS 2 Node Running',
    image: 'https://images.unsplash.com/photo-1517420704952-d9f39e95b43e?w=800&auto=format&fit=crop&q=80',
    description: 'High-performance 64-bit quad-core Arm Cortex-A76 @ 2.4GHz development platform with dual 4Kp60 HDMI output, PCIe 2.0 interface, and dedicated RP1 I/O controller.',
    specs: {
      'Processor': 'Broadcom BCM2712 Quad-Core Arm Cortex-A76 @ 2.4GHz',
      'RAM': '8GB LPDDR4X-4267 SDRAM',
      'Graphics': 'VideoCore VII GPU @ 800MHz',
      'Connectivity': 'Dual-Band 802.11ac Wi-Fi, Bluetooth 5.0 / BLE, Gigabit Ethernet',
      'I/O': 'PCIe 2.0 x1 interface, 40-pin GPIO header, Dual 4-lane MIPI camera/display transceivers',
      'Operating System': 'Ubuntu Linux / Raspberry Pi OS (ROS 2 Iron compatible)'
    },
    applications: [
      'Edge machine vision and object recognition for rovers',
      'Multi-protocol IoT gateway (MQTT, WebSocket, CAN)',
      'Embedded robotics motion controller'
    ],
    safety: 'Ensure active cooler fan is connected. Use ESD strap when handling raw GPIO pins.'
  },

  'esp32-ecosystem': {
    id: 'esp32-ecosystem',
    name: 'ESP32 IoT & Sensor DevKit Ecosystem',
    lab: 'Lab Beta (Development)',
    category: 'Microcontrollers & IoT',
    badge: 'Wireless Edge',
    status: 'Connected • MQTT Telemetry Active',
    image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&auto=format&fit=crop&q=80',
    description: 'Dual-core Xtensa 32-bit LX6/LX7 microcontrollers featuring integrated Wi-Fi, Bluetooth 5 (LE), rich peripheral interfaces, and ultra-low-power co-processors.',
    specs: {
      'CPU': 'Dual-Core 32-bit Xtensa LX6 @ 240 MHz',
      'Wireless': '2.4 GHz Wi-Fi (802.11 b/g/n) + Bluetooth 5.0 (BLE)',
      'Memory': '520 KB SRAM, 4MB Flash Memory',
      'Peripherals': '34 GPIOs, 12-bit SAR ADC, 2x DAC, I2C, SPI, UART, PWM, Capacitive Touch',
      'Firmware': 'ESP-IDF / MicroPython / Arduino C++'
    },
    applications: [
      'Wireless sensor nodes & environmental telemetry',
      'Actuator controllers with real-time PID feedback',
      'Mesh network distributed automation'
    ],
    safety: 'Operating voltage is 3.3V logic. Do not expose GPIO pins to 5V input directly.'
  },

  'bench-oscilloscope': {
    id: 'bench-oscilloscope',
    name: 'Digital Storage Bench Oscilloscope',
    lab: 'Lab Beta (Development)',
    category: 'Test & Measurement',
    badge: 'Signal Analysis',
    status: 'Active • 100 MHz Bandwidth Ready',
    image: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=800&auto=format&fit=crop&q=80',
    description: '4-channel digital storage oscilloscope featuring 1 GSa/s real-time sampling rate, deep memory depth, and integrated bus decoding for I2C, SPI, RS232, and CAN protocols.',
    specs: {
      'Bandwidth': '100 MHz (4 Analog Channels)',
      'Sampling Rate': '1 GSa/s (Single-Channel), 500 MSa/s (All Channels)',
      'Memory Depth': '28 Mpts standard',
      'Display': '7" WVGA color LCD with intensity-graded waveform display',
      'Protocol Decode': 'Hardware I2C, SPI, UART, CAN, LIN bus triggers'
    },
    applications: [
      'Digital signal integrity analysis and noise debugging',
      'PWM motor drive waveform validation',
      'Serial protocol packet packet timing inspection'
    ],
    safety: 'Use 10X probe attenuation when measuring voltages above 30V. Never connect ground clip to non-isolated live lines.'
  },

  'bench-psu': {
    id: 'bench-psu',
    name: 'Precision Programmable Bench DC Power Supply',
    lab: 'Lab Beta (Development)',
    category: 'Power Electronics',
    badge: 'Lab Grade',
    status: 'Active • 5.00V / 2.00A Output',
    image: 'https://images.unsplash.com/photo-1581092162384-8987c1d64718?w=800&auto=format&fit=crop&q=80',
    description: 'Triple-output programmable linear DC power supply with ultra-low ripple and noise (< 350 µVrms), millivolt/milliamp resolution, and overvoltage/overcurrent protection.',
    specs: {
      'Outputs': 'CH1: 0-30V / 3A, CH2: 0-30V / 3A, CH3: 2.5V/3.3V/5V / 3A',
      'Total Power': '195W',
      'Ripple & Noise': '< 350 µVrms / 2 mVpp',
      'Protection': 'OVP (Over-Voltage), OCP (Over-Current), OTP (Over-Temp)',
      'Readback': '4-Digit High-Precision LED Display'
    },
    applications: [
      'Prototyping clean power rails for microcontrollers and sensors',
      'Current limit testing to prevent component burnout',
      'Motor and servo stall-current characterization'
    ],
    safety: 'Always configure current limit before attaching sensitive prototypes.'
  },

  'microscope-beta': {
    id: 'microscope-beta',
    name: 'Trinocular Stereo Inspection Microscope',
    lab: 'Lab Beta (Development)',
    category: 'Inspection & Soldering',
    badge: 'SMD Precision',
    status: 'Ready / Ring Light On',
    image: 'https://images.unsplash.com/photo-1581092162384-8987c1d64718?w=800&auto=format&fit=crop&q=80',
    description: 'Continuous zoom 7X-45X trinocular stereo microscope with 144-LED adjustable ring illuminator and articulated boom stand for high-density SMD inspection and micro-soldering.',
    specs: {
      'Magnification': '7X to 45X Continuous Stereo Zoom',
      'Working Distance': '100 mm (expandable to 165 mm with barlow lens)',
      'Illumination': '144-LED Quad-Zone Adjustable Ring Light (6000K)',
      'Boom Stand': 'Solid steel double-arm boom with 360° rotation',
      'Optics': 'High-eyepoint widefield WF10X/20 eyepieces'
    },
    applications: [
      '0402 / 0201 SMD soldering and inspection',
      'PCB trace repair and solder bridge diagnostics',
      'Micro-crack inspection on IC packages'
    ],
    safety: 'Do not touch hot soldering iron to the microscope objective lens.'
  },

  'a5x-pro-x1': {
    id: 'a5x-pro-x1',
    name: 'A5X Pro X-1 Industrial Fabricator',
    lab: 'Lab Gamma (Advanced)',
    category: 'Advanced Industrial 3D Printing',
    badge: 'High-Temp / Carbon Fiber',
    status: 'Ready / Chamber Pre-heated (60°C)',
    image: 'https://images.unsplash.com/photo-1581092335397-9583fe92d232?w=800&auto=format&fit=crop&q=80',
    description: 'Fully enclosed, climate-controlled dual-extrusion additive manufacturing station engineered for engineering-grade composites (Carbon Fiber, Kevlar, High-Temp PEEK).',
    specs: {
      'Build Volume': '350 × 350 × 400 mm³',
      'Chamber Temp': 'Actively heated up to 90°C',
      'Extruder Temp': 'Dual Hotends up to 500°C',
      'Filament Capability': 'Carbon-Fiber Nylon (PA-CF), PEEK, Polycarbonate, TPU 85A',
      'Filtration': 'HEPA H14 + Activated Carbon Dual Air Scrubber',
      'Precision': '± 0.05 mm Repeatability'
    },
    applications: [
      'End-use structural drone frames and robot links',
      'High-impact automotive & aerospace tooling jigs',
      'Endurance testing under high thermal and mechanical stress'
    ],
    safety: 'Enclosed chamber operating at high temperatures. Do not open front door while internal chamber indicator is red.'
  },

  'soldering-station': {
    id: 'soldering-station',
    name: 'Hakko ESD Soldering & Fume Extraction Station',
    lab: 'Lab Alpha & Beta',
    category: 'Electronics & Prototyping',
    badge: 'ESD-Safe Workstation',
    status: 'Active • 350°C Ready',
    image: 'https://images.unsplash.com/photo-1581092162384-8987c1d64718?w=800&auto=format&fit=crop&q=80',
    description: 'Precision digital temperature-controlled soldering station mounted on static-dissipative ESD matting with an articulated high-suction fume extraction arm.',
    specs: {
      'Temp Range': '200°C – 480°C (Digital PID Control)',
      'Power Output': '75W High Thermal Recovery',
      'Fume Extraction': 'Brushless centrifugal blower, multi-stage HEPA filtration',
      'ESD Protection': 'Surface resistivity 10⁶ – 10⁹ Ω/sq with grounding cord',
      'Included Tools': 'Brass sponge cleaner, helping hands, solder reel, flush cutters'
    },
    applications: [
      'Through-hole and SMD circuit assembly',
      'Sensor wire harness soldering & heat-shrink insulation',
      'PCB repair and custom microcontroller shield prototyping'
    ],
    safety: 'MANDATORY: Safety glasses must be worn. Turn on fume extractor arm before soldering. Never leave hot iron unattended.'
  },

  'vr-headset-matrix': {
    id: 'vr-headset-matrix',
    name: 'A5X Spatial Computing & VR/AR Wall',
    lab: 'Lab Gamma (Advanced)',
    category: 'Spatial Computing',
    badge: 'Immersive Mixed Reality',
    status: '6 Units Docked & Charged',
    image: 'https://images.unsplash.com/photo-1593508512255-86ab42a8e620?w=800&auto=format&fit=crop&q=80',
    description: 'High-fidelity spatial computing rack equipped with 6 mixed reality headsets featuring dual 4K micro-OLED displays, 120Hz refresh rate, and sub-millimeter 6-DOF tracking.',
    specs: {
      'Display': 'Dual 4K Micro-OLED (3840 × 3552 per eye)',
      'Refresh Rate': '90Hz / 120Hz Native',
      'Pass-through': 'Ultra-low latency stereo color cameras (< 12ms)',
      'Tracking': 'Inside-out 6-DOF, high-precision eye & hand tracking',
      'Compute Engine': 'Snapdragon XR2+ Gen 2 with Wi-Fi 7 streaming'
    },
    applications: [
      'Collaborative spatial digital twin visualization',
      'Teleoperation of autonomous rovers and robotic arms',
      'Virtual training simulations & ergonomic product review'
    ],
    safety: 'Clear floor area before engaging full VR immersion. Rest eyes for 10 minutes every 45 minutes of continuous use.'
  },

  'robotics-track': {
    id: 'robotics-track',
    name: 'Robo Race Arena (Autonomous Circuit)',
    lab: 'Lab Gamma (Arena Bay)',
    category: 'Autonomous Systems & Robotics',
    badge: 'High-Speed Autonomy',
    status: 'Track Hot • 3 Racing Rovers Active',
    image: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=800&auto=format&fit=crop&q=80',
    description: 'High-speed autonomous racing circuit with precision asphalt surface, kerb curves, incline bridge ramp, and overhead START/FINISH gantry.',
    specs: {
      'Track Surface': 'High-grip asphalt with red/white kerbs & hazard borders',
      'Obstacles': 'A5X incline flyover bridge & chicane curves',
      'Timing System': 'Optical transponder loop with millisecond precision',
      'Active Cars': '3-4 custom high-torque brushless autonomous racers'
    },
    applications: [
      'High-speed cornering & path-planning algorithms',
      'Model predictive control (MPC) at limits of adhesion',
      'Autonomous overtake and multi-agent racing strategy'
    ],
    safety: 'Keep hands and feet outside the hazard kerb while race cars are in active lap mode.'
  },

  'gamma-race-arena': {
    id: 'gamma-race-arena',
    name: 'Robo Race Arena',
    lab: 'Lab Gamma (Arena Bay)',
    category: 'Autonomous Systems & Robotics',
    badge: 'Speed & Agility',
    status: 'Race In Progress • 3 Cars on Circuit',
    image: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=800&auto=format&fit=crop&q=80',
    description: 'Autonomous racing circuit with start/finish truss gantry, chicane, inclined hazard ramp, and live telemetry tracking.',
    specs: {
      'Dimensions': '4.6m x 4.8m raised octagonal platform (0.35m height)',
      'Telemetry': 'Real-time lap timing & speed telemetry feed',
      'Vehicle Dynamics': 'Ackermann steering with digital gyros & optical odometry',
      'Control Stack': 'ROS 2 Nav2 with pure pursuit & TEB local planner'
    },
    applications: [
      'High-speed autonomous navigation and trajectory optimization',
      'Obstacle traversal over elevated bridge ramps',
      'Competitive algorithmic head-to-head time trials'
    ],
    safety: 'Safety barrier active. Do not place objects on track during high-speed runs.'
  },

  'gamma-soccer-arena': {
    id: 'gamma-soccer-arena',
    name: 'Robo Soccer Arena',
    lab: 'Lab Gamma (Arena Bay)',
    category: 'Autonomous Systems & Robotics',
    badge: 'Multi-Agent AI',
    status: 'Match Active • Ball Tracking Online',
    image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&auto=format&fit=crop&q=80',
    description: 'Autonomous multi-robot soccer field with green synthetic turf, regulation markings, dual goals with nets, and clear acrylic safety walls.',
    specs: {
      'Pitch Size': '7.8m x 3.4m turf pitch with white boundary & penalty lines',
      'Safety Walls': 'Clear impact-resistant acrylic rails with steel top rail',
      'Ball Tracking': 'Overhead vision system & onboard camera color segmentation',
      'Robots': '2 Autonomous holonomic striker and goalkeeper robots'
    },
    applications: [
      'Cooperative multi-agent coordination and passing dynamics',
      'Dynamic ball interception and shot trajectory calculation',
      'RoboCup Small Size League (SSL) competition preparation'
    ],
    safety: 'Clear perimeter rails keep balls within the pitch at all times.'
  },

  'gamma-line-follower-arena': {
    id: 'gamma-line-follower-arena',
    name: 'Line Follower Arena',
    lab: 'Lab Gamma (Arena Bay)',
    category: 'Autonomous Systems & Robotics',
    badge: 'PID & Optical',
    status: 'Active • 2 Optical Line Bots',
    image: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=800&auto=format&fit=crop&q=80',
    description: 'High-contrast serpentine optical tracking testbed featuring hairpins, loops, intersections, and obstacle bypass ramps.',
    specs: {
      'Track Type': 'White melamine with 24mm high-contrast black tracking line',
      'Sensors': '8-channel infrared reflectance array (analog/digital)',
      'Control Loop': 'Ultra-fast 1 kHz PID controller with gyro feedforward',
      'Speed': 'Up to 3.5 m/s on straightaways'
    },
    applications: [
      'Tuning PID and adaptive steering controllers',
      'Intersection branch decision logic and dead reckoning',
      'High-speed optical sensor calibration'
    ],
    safety: 'Stay clear of the low platform edge while high-speed runs are underway.'
  },

  'gamma-trophy-shelf': {
    id: 'gamma-trophy-shelf',
    name: 'Robotics Showcase & Trophy Archive',
    lab: 'Lab Gamma (Arena Bay)',
    category: 'Mechatronics & Awards',
    badge: 'Excellence & History',
    status: '4 Tiers Fully Stocked',
    image: 'https://images.unsplash.com/photo-1567427017947-545c5f8d16ad?w=800&auto=format&fit=crop&q=80',
    description: 'Showcase housing regional and international competition trophies, legacy robotic chassis, modular suspension assemblies, and clear hardware storage.',
    specs: {
      'Units': '4-tier matte black steel and light-oak shelving module',
      'Lighting': 'Warm LED under-shelf illumination ribbons',
      'Contents': 'Championship trophies, race car chassis, motor modules, clear bins'
    },
    applications: [
      'Inspection of competitive mechanical architectures',
      'Archive of student award-winning autonomy platforms'
    ],
    safety: 'Display only. Handle chassis prototypes with anti-static wrist strap.'
  },

  'gamma-diagnostic-bench': {
    id: 'gamma-diagnostic-bench',
    name: 'Robot Diagnostic & Assembly Bench',
    lab: 'Lab Gamma (Arena Bay)',
    category: 'Diagnostic & Mechatronics',
    badge: 'Telemetry & Tuning',
    status: 'Diagnostic Station Online',
    image: 'https://images.unsplash.com/photo-1581092335397-9583fe92d232?w=800&auto=format&fit=crop&q=80',
    description: 'Heavy mechatronics workbench equipped with diagnostic telemetry laptop, ESD soldering mat, motor testing jig, parts bins, and propeller pegboard.',
    specs: {
      'Surface': 'Solid oak top with ESD protective grounding mat',
      'Instrumentation': 'Telemetry laptop, battery capacity tester, logic analyzer',
      'Storage': 'Tool pegboard with drone propellers and component bins'
    },
    applications: [
      'Pre-race vehicle telemetry inspection & firmware flashing',
      'LiPo battery health analysis and rapid balancing',
      'Chassis alignment and drivetrain backlash adjustment'
    ],
    safety: 'Disconnect main battery harness before servicing motor controllers.'
  },

  'smart-display-beta': {
    id: 'smart-display-beta',
    name: 'A5X Interactive Telemetry Smart Display',
    lab: 'Lab Beta (Development)',
    category: 'IoT & Telemetry',
    badge: 'Live Dashboard',
    status: 'Streaming 1,480 msgs/sec',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&auto=format&fit=crop&q=80',
    description: 'Panoramic 6.8-meter wall dashboard providing real-time telemetry, microcontroller network topologies, bus voltages, and live environmental sensor data across all lab nodes.',
    specs: {
      'Screen Size': '6.8 × 2.5 meters (Ultra-HD Panoramic Matrix)',
      'Telemetry Engine': 'MQTT Broker + WebSockets Low-Latency Feed',
      'Monitored Nodes': '32 Active Microcontrollers (ESP32, Raspberry Pi)',
      'Waveform Analysis': 'Integrated 2-Channel 100MHz Digital Oscilloscope stream',
      'Control Terminal': 'Front-mounted interactive capacitive touch podium'
    },
    applications: [
      'Real-time IoT sensor network debugging and packet inspection',
      'Classroom demonstrations of embedded protocols (I2C, SPI, CAN bus)',
      'Live power consumption and environmental monitoring'
    ],
    safety: 'Interactive podium is student-accessible. System parameters can be simulated or inspected without risk.'
  },

  'digital-wall-gamma': {
    id: 'digital-wall-gamma',
    name: 'Panoramic A5X AI Innovation Matrix',
    lab: 'Lab Gamma (Advanced)',
    category: 'Edge AI & Digital Twin',
    badge: 'Supercomputing Matrix',
    status: 'Online • 275 TOPS AI Active',
    image: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=800&auto=format&fit=crop&q=80',
    description: 'A 7.2-meter command matrix showing neural network inference pipelines, real-time 3D LiDAR point clouds, spatial twin synchronization, and fleet management.',
    specs: {
      'Display Dimensions': '7.2 × 2.5 meters (8K Micro-LED Array)',
      'Edge Compute': 'NVIDIA Jetson AGX Orin Cluster',
      'AI Models': 'YOLOv9 Real-Time Perception, Deep Reinforcement Learning',
      'Digital Twin Sync': 'Three.js / WebGL Spatial Stream (< 16ms delta)',
      'Command Station': 'Dual-tablet interactive flight director console'
    },
    applications: [
      'Visualizing real-time point cloud data from AMR rovers',
      'Neural network weight visualization and inference benchmarking',
      'Campus-wide cyber-physical digital twin orchestrator'
    ],
    safety: 'Command console requires instructor clearance for fleet override commands.'
  },

  'coding-workstation': {
    id: 'coding-workstation',
    name: 'Developer Workstation (Code IDE)',
    lab: 'All Labs',
    category: 'Software Development',
    badge: 'Dual-Screen Station',
    status: 'Active Session: VS Code Online',
    image: 'https://images.unsplash.com/photo-1542838132-92c53300491e?w=800&auto=format&fit=crop&q=80',
    description: 'High-performance developer workstation configured with dual displays (landscape primary + portrait terminal), mechanical tactile keyboard, and high-DPI mouse.',
    specs: {
      'Displays': '27" 4K IPS 144Hz + 24" Vertical Code Review Monitor',
      'PC Specs': 'Intel Core i9 / 64GB DDR5 / RTX 4080 GPU',
      'Software Stack': 'Ubuntu Linux / ROS 2 / VS Code / Python / C++',
      'Peripherals': 'Hot-swappable mechanical keyboard, ergonomic mouse'
    },
    applications: [
      'Embedded firmware compilation & serial debugging',
      'Computer vision and robot motion algorithm development',
      'Web-based 3D simulation and digital twin programming'
    ],
    safety: 'Save all repository branches to remote Git before session timeout.'
  },

  'cad-workstation': {
    id: 'cad-workstation',
    name: 'Design & CAD/CAM Workstation',
    lab: 'All Labs',
    category: 'Mechanical Design',
    badge: 'Curved Ultrawide',
    status: 'CAD Viewport Active',
    image: 'https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?w=800&auto=format&fit=crop&q=80',
    description: 'Mechanical engineering CAD workstation featuring a 34" curved ultrawide display calibrated for 3D solid modeling, parametric design, and CAM toolpath slicing.',
    specs: {
      'Display': '34" Curved 21:9 WQHD Color-Accurate Display (100% sRGB)',
      'Workstation GPU': 'NVIDIA RTX A4000 Professional Graphics',
      'Software Suite': 'Autodesk Fusion 360, SolidWorks, Bambu Studio, Blender',
      'Input Device': '3Dconnexion SpaceMouse 3D Controller'
    },
    applications: [
      'Parametric solid modeling of mechanical assemblies',
      'Finite element stress analysis & generative design',
      'Slicing and G-code export for 3D printers and CNC mills'
    ],
    safety: 'Check clearance tolerances and minimum wall thicknesses prior to exporting STL for printing.'
  },

  'electronics-storage': {
    id: 'electronics-storage',
    name: 'Component Storage & Sensor Bins',
    lab: 'Lab Alpha & Beta',
    category: 'Electronics Components',
    badge: 'Modular Inventory',
    status: 'Stocked / Color-Coded',
    image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&auto=format&fit=crop&q=80',
    description: 'Four-tier industrial storage shelving containing organized, color-coded bins with over 200 varieties of sensors, actuators, passive components, and wiring harnesses.',
    specs: {
      'Shelving': 'Heavy-duty powder-coated steel (500kg total capacity)',
      'Bins': 'Antistatic polypropylene with barcoded label slots',
      'Inventory': 'Ultrasonic, IMU, LiDAR, Temp/Humidity, Servos, Relays, Steppers',
      'Organization': 'Color-coded by functional category (Power, Logic, Sensor, Actuator)'
    },
    applications: [
      'Self-service parts checkout for student innovation projects',
      'Prototyping breadboard circuits and breadboard-friendly modules'
    ],
    safety: 'Return all unused components to their designated color-coded bins after lab session.'
  },

  'whiteboard': {
    id: 'whiteboard',
    name: 'Foundation Interactive Teaching Whiteboard',
    lab: 'Lab Alpha (Foundation)',
    category: 'Instruction & Ideation',
    badge: 'Classroom Centerpiece',
    status: 'Active Lecture Notes',
    image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&auto=format&fit=crop&q=80',
    description: 'A 6-meter magnetic dry-erase presentation board positioned on the navy feature wall for circuit schematics, architectural block diagrams, and foundational lecture notes.',
    specs: {
      'Dimensions': '6.0 × 2.2 meters porcelain-on-steel magnetic surface',
      'Frame': 'Anodized brushed aluminum with full-length marker tray',
      'Accessories': 'Low-odor dry erase markers, magnetic block symbols, precision erasers',
      'Podium': 'Integrated instructor podium with laptop docking'
    },
    applications: [
      'Instructor-led circuit design lectures and algorithm walkthroughs',
      'Student group ideation and system topology brainstorming'
    ],
    safety: 'Use dry-erase markers only. Do not use permanent markers or abrasive cleaners.'
  }
};
