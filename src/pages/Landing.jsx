import React from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  ArrowRight, 
  Layers, 
  Cpu, 
  Bot, 
  Compass, 
  ChevronRight, 
  CheckCircle2,
  Tv,
  Printer,
  Glasses
} from 'lucide-react';
import { NeuButton, NeuCard, Chip } from '../components/UI/NeuComponents';
import { CAMPUS_CONFIG } from '../data/config';

export default function Landing() {
  const navigate = useNavigate();

  const handleEnterCampus = () => {
    navigate('/campus');
  };

  const scrollToLabs = () => {
    document.getElementById('labs-overview')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-[#E9EEF5] text-[#071B3A] flex flex-col font-sans selection:bg-[#1677FF] selection:text-white">
      {/* 1. TOP NAVIGATION BAR */}
      <nav className="fixed top-0 left-0 right-0 z-40 bg-[#F1F4F8]/85 backdrop-blur-md border-b border-[rgba(7,27,58,0.06)] px-8 py-3.5 flex items-center justify-between shadow-sm">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 rounded-lg bg-[#1677FF] flex items-center justify-center font-bold text-white text-xs">
            A5X
          </div>
          <div>
            <span className="font-semibold text-sm block text-[#071B3A]">A5X INDUSTRIES</span>
            <span className="text-[10px] text-[#5B6B82] font-medium tracking-wide block">IMPOSSIBLE ENGINEERING.</span>
          </div>
        </div>

        <div className="hidden md:flex items-center space-x-6 text-xs font-semibold text-[#5B6B82]">
          <a href="#about" className="hover:text-[#1677FF] transition-colors">About Campus</a>
          <a href="#labs-overview" className="hover:text-[#1677FF] transition-colors">Labs Directory</a>
          <a href="#progression" className="hover:text-[#1677FF] transition-colors">Curriculum Path</a>
          <a href="#equipment" className="hover:text-[#1677FF] transition-colors">Equipment</a>
        </div>

        <NeuButton
          variant="primary"
          size="sm"
          icon={ArrowRight}
          onClick={handleEnterCampus}
        >
          Enter 3D Campus
        </NeuButton>
      </nav>

      {/* 2. HERO SECTION */}
      <header className="relative pt-32 pb-20 px-8 max-w-6xl mx-auto flex flex-col items-center text-center">
        <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-[#FFFFFF] border border-[rgba(7,27,58,0.08)] text-[#1677FF] text-xs font-semibold mb-6 shadow-neu-raised-sm">
          <span>Continuous 58m Multi-Stage Learning Complex</span>
        </div>

        <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-[#071B3A] max-w-4xl leading-tight mb-5">
          A5X Innovation Lab Complex
          <span className="block text-[#1677FF] text-2xl md:text-3xl font-semibold mt-2">
            IMPOSSIBLE ENGINEERING.
          </span>
        </h1>

        <p className="text-base text-[#5B6B82] max-w-2xl mb-8 leading-relaxed font-normal">
          Explore our walkable, first-person 3D digital campus. Seamlessly navigate three interconnected labs—from foundational circuit assembly and 3D printing to autonomous robotics testing and spatial immersion.
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row items-center space-y-3 sm:space-y-0 sm:space-x-4 mb-16">
          <NeuButton
            variant="primary"
            size="lg"
            icon={ArrowRight}
            onClick={handleEnterCampus}
          >
            Enter Virtual Campus (Walkable 3D)
          </NeuButton>
          <NeuButton
            variant="default"
            size="lg"
            icon={ChevronRight}
            onClick={scrollToLabs}
          >
            Explore Lab Layouts
          </NeuButton>
        </div>

        {/* 4 Architectural Milestone Metrics */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 w-full">
          {[
            { label: 'Continuous Floorplan', val: '58 Metres' },
            { label: 'Connected Stages', val: 'Alpha · Beta · Gamma' },
            { label: 'Autonomous Bay', val: 'Dedicated Arena' },
            { label: 'Student Capacity', val: '132 Workstations' },
          ].map((metric, i) => (
            <div key={i} className="p-4 rounded-neu-panel bg-[#FFFFFF] border border-[rgba(7,27,58,0.08)] shadow-neu-raised-sm text-center">
              <span className="text-lg md:text-xl font-bold text-[#1677FF] block mb-0.5">
                {metric.val}
              </span>
              <span className="text-xs text-[#5B6B82]">
                {metric.label}
              </span>
            </div>
          ))}
        </div>
      </header>

      {/* 3. THREE LABS SECTION */}
      <section id="labs-overview" className="py-16 px-8 max-w-6xl mx-auto w-full">
        <div className="text-center mb-12">
          <span className="text-xs font-semibold text-[#1677FF] uppercase tracking-wider block mb-1">
            Structured Facility
          </span>
          <h2 className="text-2xl font-bold text-[#071B3A]">
            Three Interconnected Specialized Environments
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Alpha */}
          <div className="p-6 rounded-neu-panel bg-[#FFFFFF] border border-[rgba(7,27,58,0.08)] shadow-neu-raised flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="w-8 h-8 rounded-lg bg-[#E9EEF5] text-[#1677FF] font-bold text-sm flex items-center justify-center">
                  A
                </span>
                <Chip variant="neutral">0m – 16m</Chip>
              </div>
              <h3 className="text-base font-bold text-[#071B3A] mb-1">Lab Alpha</h3>
              <p className="text-xs text-[#1677FF] font-semibold mb-3">Foundation Lab</p>
              <p className="text-xs text-[#5B6B82] leading-relaxed mb-4">
                Designed for core fundamentals: hands-on circuit assembly, Bambu Lab A1 Mini 3D printing corner, and collaborative programming stations.
              </p>
            </div>
            <NeuButton variant="subtle" size="sm" onClick={handleEnterCampus}>
              Explore Alpha
            </NeuButton>
          </div>

          {/* Beta */}
          <div className="p-6 rounded-neu-panel bg-[#FFFFFF] border border-[rgba(7,27,58,0.08)] shadow-neu-raised flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="w-8 h-8 rounded-lg bg-[#E9EEF5] text-[#1677FF] font-bold text-sm flex items-center justify-center">
                  B
                </span>
                <Chip variant="neutral">16m – 32m</Chip>
              </div>
              <h3 className="text-base font-bold text-[#071B3A] mb-1">Lab Beta</h3>
              <p className="text-xs text-[#1677FF] font-semibold mb-3">Development Lab</p>
              <p className="text-xs text-[#5B6B82] leading-relaxed mb-4">
                Intermediate engineering hub with telemetry display dashboard, multi-color Bambu A1 + AMS Lite printing, and SMD soldering workstations.
              </p>
            </div>
            <NeuButton variant="subtle" size="sm" onClick={handleEnterCampus}>
              Explore Beta
            </NeuButton>
          </div>

          {/* Gamma & Arena */}
          <div className="p-6 rounded-neu-panel bg-[#FFFFFF] border border-[rgba(7,27,58,0.08)] shadow-neu-raised flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="w-8 h-8 rounded-lg bg-[#E9EEF5] text-[#1677FF] font-bold text-sm flex items-center justify-center">
                  G
                </span>
                <Chip variant="accent">32m – 58m</Chip>
              </div>
              <h3 className="text-base font-bold text-[#071B3A] mb-1">Lab Gamma & Arena</h3>
              <p className="text-xs text-[#1677FF] font-semibold mb-3">Innovation & Autonomy</p>
              <p className="text-xs text-[#5B6B82] leading-relaxed mb-4">
                Ultra-wide Matrix Digital Wall, VR headset testing, dual-extrusion Pro 3D printing, and dedicated 10m acoustic glass robotics track.
              </p>
            </div>
            <NeuButton variant="subtle" size="sm" onClick={handleEnterCampus}>
              Explore Gamma
            </NeuButton>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="mt-auto py-8 border-t border-[rgba(7,27,58,0.06)] bg-[#F1F4F8] text-center text-xs text-[#5B6B82]">
        <p className="font-semibold text-[#071B3A]">A5X INDUSTRIES · IMPOSSIBLE ENGINEERING.</p>
        <p className="mt-1">© 2026 A5X Innovation Lab Complex. All rights reserved.</p>
      </footer>
    </div>
  );
}
