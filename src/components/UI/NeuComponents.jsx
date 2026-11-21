import React, { useState } from 'react';

/**
 * Clean, soft-neumorphic raised card
 */
export function NeuCard({ children, className = '', isWhite = false, onClick }) {
  return (
    <div
      onClick={onClick}
      className={`rounded-neu-panel border border-[rgba(7,27,58,0.08)] transition-all duration-200 ${
        isWhite ? 'bg-[#FFFFFF] shadow-neu-raised' : 'neu-panel'
      } ${className}`}
    >
      {children}
    </div>
  );
}

/**
 * Soft-neumorphic button with crisp states
 */
export function NeuButton({
  children,
  onClick,
  variant = 'default', // 'default' | 'primary' | 'subtle'
  size = 'md',        // 'sm' | 'md' | 'lg'
  disabled = false,
  className = '',
  icon: Icon,
  ariaLabel
}) {
  const sizeClasses = {
    sm: 'px-3 py-1.5 text-xs rounded-lg gap-1.5 min-h-[32px]',
    md: 'px-4 py-2 text-sm rounded-neu-btn gap-2 min-h-[40px]',
    lg: 'px-5 py-2.5 text-sm font-semibold rounded-neu-btn gap-2.5 min-h-[44px]'
  }[size];

  const variantClasses = {
    default: 'neu-button text-[#071B3A] font-medium',
    primary: 'bg-[#1677FF] hover:bg-[#0E5ECC] active:bg-[#0948A3] text-white font-semibold shadow-neu-accent border border-[#1677FF]',
    subtle: 'bg-transparent hover:bg-[#F1F4F8] active:bg-[#E9EEF5] text-[#5B6B82] hover:text-[#071B3A] border border-transparent'
  }[variant];

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      aria-label={ariaLabel}
      className={`inline-flex items-center justify-center select-none cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-180 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1677FF] focus-visible:ring-offset-2 ${sizeClasses} ${variantClasses} ${className}`}
    >
      {Icon && <Icon className="w-4 h-4 shrink-0" />}
      <span>{children}</span>
    </button>
  );
}

/**
 * Fully round icon button with tooltip & aria-label
 */
export function NeuIconButton({
  icon: Icon,
  onClick,
  tooltip,
  ariaLabel,
  active = false,
  size = 'md',
  className = ''
}) {
  const [showTooltip, setShowTooltip] = useState(false);

  const dim = size === 'sm' ? 'w-9 h-9' : 'w-11 h-11';
  const iconSize = size === 'sm' ? 'w-4 h-4' : 'w-5 h-5';

  return (
    <div className="relative inline-flex items-center justify-center">
      <button
        onClick={onClick}
        aria-label={ariaLabel || tooltip}
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
        onFocus={() => setShowTooltip(true)}
        onBlur={() => setShowTooltip(false)}
        className={`${dim} rounded-full flex items-center justify-center transition-all duration-180 border select-none cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1677FF] focus-visible:ring-offset-2 ${
          active
            ? 'neu-pressed text-[#1677FF] border-[rgba(22,119,255,0.2)]'
            : 'neu-button text-[#071B3A] hover:text-[#1677FF]'
        } ${className}`}
      >
        <Icon className={iconSize} />
      </button>

      {tooltip && showTooltip && (
        <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 z-50 pointer-events-none whitespace-nowrap px-2 py-0.5 rounded-md bg-[#071B3A] text-white text-[11px] font-medium tracking-wide shadow-md animate-fade-in">
          {tooltip}
        </div>
      )}
    </div>
  );
}

/**
 * Segmented control with pressed-in active state
 */
export function NeuSegmented({ options, value, onChange, className = '' }) {
  return (
    <div
      role="group"
      className={`inline-flex p-1 rounded-neu-btn bg-[#E9EEF5] border border-[rgba(7,27,58,0.06)] shadow-neu-pressed ${className}`}
    >
      {options.map((opt) => {
        const isActive = value === opt.value;
        const Icon = opt.icon;
        return (
          <button
            key={opt.value}
            onClick={() => onChange(opt.value)}
            aria-pressed={isActive}
            className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-[9px] text-xs font-semibold select-none transition-all duration-180 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1677FF] ${
              isActive
                ? 'bg-[#FFFFFF] text-[#1677FF] shadow-neu-raised-sm'
                : 'text-[#5B6B82] hover:text-[#071B3A]'
            }`}
          >
            {Icon && <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-[#1677FF]' : 'text-[#5B6B82]'}`} />}
            <span>{opt.label}</span>
          </button>
        );
      })}
    </div>
  );
}

/**
 * Refined tactile KeyCap (e.g. E, M, ESC)
 */
export function KeyCap({ children, className = '' }) {
  return (
    <kbd
      className={`inline-flex items-center justify-center min-w-[22px] h-[22px] px-1.5 rounded-[5px] text-[11px] font-semibold text-[#071B3A] bg-[#FFFFFF] border border-[#CAD5E2] shadow-[0_1.5px_0_#9AA7B8] font-sans ${className}`}
    >
      {children}
    </kbd>
  );
}

/**
 * Neutral chip/badge
 */
export function Chip({ children, variant = 'neutral', className = '' }) {
  const variantClass = {
    neutral: 'bg-[#E9EEF5] text-[#5B6B82] border-[rgba(7,27,58,0.06)]',
    accent: 'bg-[#1677FF]/10 text-[#1677FF] border-[#1677FF]/20',
    success: 'bg-emerald-50 text-emerald-700 border-emerald-200'
  }[variant];

  return (
    <span
      className={`inline-flex items-center px-2 py-0.5 rounded-md text-[11px] font-medium border ${variantClass} ${className}`}
    >
      {children}
    </span>
  );
}

/**
 * Quiet circular progress indicator
 */
export function CircularProgress({ percent, size = 32, strokeWidth = 3 }) {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (percent / 100) * circumference;

  return (
    <div className="relative inline-flex items-center justify-center" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="transform -rotate-90">
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="#CAD5E2"
          strokeWidth={strokeWidth}
          fill="none"
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="#1677FF"
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          fill="none"
          className="transition-all duration-300 ease-out"
        />
      </svg>
      <span className="absolute text-[10px] font-semibold text-[#071B3A]">
        {percent}%
      </span>
    </div>
  );
}
