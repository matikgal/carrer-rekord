import React from 'react';
import { motion } from 'framer-motion';

export interface SketchyButtonProps {
  children: React.ReactNode;
  primary?: boolean;
  className?: string;
  onClick?: () => void;
  noAnimate?: boolean;
  disabled?: boolean;
  type?: "button" | "submit" | "reset";
}

export const SketchyButton: React.FC<SketchyButtonProps> = ({ children, primary = false, className = '', onClick, noAnimate = false, disabled = false, type = "button" }) => {
  return (
    <motion.button
      type={type}
      disabled={disabled}
      whileHover={(noAnimate || disabled) ? undefined : { scale: 1.05, rotate: -2, y: -5 }}
      whileTap={(noAnimate || disabled) ? undefined : { scale: 0.95 }}
      onClick={onClick}
      className={`
        relative px-8 py-3 font-black text-lg font-hand tracking-wide
        border-2 rounded-tl-2xl rounded-br-3xl rounded-tr-sm rounded-bl-sm
        transition-colors duration-300 cursor-pointer
        ${disabled ? 'opacity-50 cursor-not-allowed' : ''}
        ${primary
          ? 'bg-lime-400 text-emerald-950 border-emerald-950 shadow-[5px_5px_0px_0px_#064e3b] hover:bg-lime-500  '
          : 'bg-transparent text-lime-400 border-lime-400 shadow-[5px_5px_0px_0px_rgba(132,204,22,0.3)] hover:bg-lime-400/10'
        }
        ${className}
      `}
    >
      {children}
    </motion.button>
  );
};

export interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
  rotate?: number;
  style?: React.CSSProperties;
  noHover?: boolean;
}

export const GlassCard: React.FC<GlassCardProps> = ({ children, className = '', rotate = 0, style, noHover = false }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20, rotate: rotate }}
      whileInView={{ opacity: 1, y: 0, rotate: rotate }}
      viewport={{ once: true }}
      whileHover={noHover ? undefined : { y: -10, rotate: 0, boxShadow: '10px 10px 0px 0px rgba(0,0,0,0.3)' }}
      style={style}
      className={`
        bg-white/5 backdrop-blur-md border border-white/10
        p-6 md:p-8
        rounded-tl-3xl rounded-br-2xl rounded-tr-lg rounded-bl-xl
        shadow-[4px_4px_0px_0px_rgba(0,0,0,0.2)]
        ${!noHover && 'hover:border-lime-400/50'} transition-all duration-300
        ${className}
      `}
    >
      {children}
    </motion.div>
  );
};

export interface StickyNoteProps {
  children: React.ReactNode;
  title?: string;
}

export const StickyNote: React.FC<StickyNoteProps> = ({ children, title }) => {
  return (
    <motion.div

      className="bg-[#fef08a] text-emerald-950 p-6 shadow-[8px_8px_15px_rgba(0,0,0,0.4)] rotate-1 max-w-md mx-auto relative"
      style={{ clipPath: 'polygon(0% 0%, 100% 0%, 100% 90%, 90% 100%, 0% 100%)' }}
    >
      {/* Tape Effect */}
      <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-32 h-8 bg-white/40 backdrop-blur-sm rotate-2 shadow-sm" />

      {title && <h3 className="font-hand font-bold text-2xl mb-4 text-emerald-900 border-b-2 border-emerald-900/20 pb-2">{title}</h3>}
      {children}

      {/* Folded corner visual */}
      <div className="absolute bottom-0 right-0 w-8 h-8 bg-[#fde047] shadow-[-2px_-2px_2px_rgba(0,0,0,0.1)]"
        style={{ clipPath: 'polygon(0 0, 0 100%, 100% 0)' }} />
    </motion.div>
  );
};

export interface TagProps {
  children: React.ReactNode;
}

export const Tag: React.FC<TagProps> = ({ children }) => (
  <span className="inline-block px-3 py-1 mr-2 mb-2 text-xs font-bold font-hand bg-emerald-900/50 text-emerald-200 border border-emerald-500/30 rounded-full">
    {children}
  </span>
);

export interface SectionHeaderProps {
  title: string;
  subtitle?: string;
}

export const SectionHeader: React.FC<SectionHeaderProps> = ({ title, subtitle }) => (
  <div className="mb-12 text-center">
    <motion.h2
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      className="text-4xl md:text-5xl font-black text-white mb-2 relative inline-block"
    >
      {title}
      <svg className="absolute -bottom-2 left-0 w-full h-3 text-lime-400" viewBox="0 0 100 10" preserveAspectRatio="none">
        <path d="M0 5 Q 50 10, 100 5" stroke="currentColor" strokeWidth="3" fill="none" />
      </svg>
    </motion.h2>
    {subtitle && <p className="mt-4 text-emerald-200/80 text-lg font-hand max-w-2xl mx-auto">{subtitle}</p>}
  </div>
);
