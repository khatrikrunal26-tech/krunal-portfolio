'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Play, ArrowUpRight, TrendingUp, Sparkles } from 'lucide-react';
import { siteConfig, showreel } from '../data/portfolioData';
import VideoModal from './VideoModal';

// ── Waveform bars ─────────────────────────────────────────────
function WaveformBars() {
  const bars = [0.4, 0.7, 0.55, 1, 0.65, 0.8, 0.45, 0.9, 0.6, 0.75, 0.5, 0.85];
  return (
    <div className="flex items-end gap-[2px] h-6">
      {bars.map((h, i) => (
        <div
          key={i}
          className="waveform-bar w-[3px]"
          style={{
            height: `${h * 24}px`,
            animationDelay: `${i * 0.1}s`,
            animationDuration: `${0.8 + i * 0.07}s`,
          }}
        />
      ))}
    </div>
  );
}

// ── Retention curve SVG ───────────────────────────────────────
function RetentionCurve() {
  return (
    <svg viewBox="0 0 120 40" className="w-full h-10" fill="none">
      <defs>
        <linearGradient id="curveGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#38BDF8" stopOpacity="0.5" />
          <stop offset="100%" stopColor="#38BDF8" stopOpacity="0" />
        </linearGradient>
      </defs>
      <path
        d="M0 35 C10 30 15 10 30 8 C45 6 55 15 70 12 C85 9 100 18 120 15"
        stroke="#38BDF8"
        strokeWidth="1.5"
        fill="none"
        strokeLinecap="round"
      />
      <path
        d="M0 35 C10 30 15 10 30 8 C45 6 55 15 70 12 C85 9 100 18 120 15 L120 40 L0 40Z"
        fill="url(#curveGrad)"
      />
    </svg>
  );
}

// ── Circular progress ─────────────────────────────────────────
function CircularProgress({ value = 100 }: { value?: number }) {
  const r = 26;
  const circumference = 2 * Math.PI * r;
  const offset = circumference - (value / 100) * circumference;
  return (
    <div className="relative w-16 h-16 flex items-center justify-center">
      <svg width="64" height="64" className="-rotate-90">
        <circle
          cx="32" cy="32" r={r}
          strokeWidth="3"
          className="progress-ring-track"
          fill="none"
        />
        <circle
          cx="32" cy="32" r={r}
          strokeWidth="3"
          className="progress-ring-fill"
          fill="none"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
        />
      </svg>
      <span className="absolute font-mono text-xs font-semibold text-white">{value}%</span>
    </div>
  );
}

// ── Architectural grid ────────────────────────────────────────
function ArchGrid() {
  return (
    <div className="arch-grid select-none pointer-events-none">
      {[25, 50, 75].map((pct) => (
        <div key={`h-${pct}`} className="arch-line-h" style={{ top: `${pct}%` }} />
      ))}
      {[25, 50, 75].map((pct) => (
        <div key={`v-${pct}`} className="arch-line-v" style={{ left: `${pct}%` }} />
      ))}
      {[25, 50, 75].map((x) =>
        [25, 50, 75].map((y) => (
          <div
            key={`${x}-${y}`}
            className="arch-crosshair"
            style={{ left: `${x}%`, top: `${y}%` }}
          />
        ))
      )}
    </div>
  );
}

// ── Halftone Dot Matrix Accent ────────────────────────────────
function DotMatrix({ className = '' }: { className?: string }) {
  return (
    <svg width="88" height="48" viewBox="0 0 88 48" fill="none" className={className}>
      <pattern id="dot-pat" x="0" y="0" width="8" height="8" patternUnits="userSpaceOnUse">
        <circle cx="2" cy="2" r="1" fill="rgba(255,255,255,0.18)" />
      </pattern>
      <rect width="88" height="48" fill="url(#dot-pat)" />
    </svg>
  );
}

// ── 3D Isometric Glowing Cube Centerpiece ──────────────────────
function GlowingCubeCenterpiece() {
  const [isVisible, setIsVisible] = useState(true);
  const cubeRef = useRef<HTMLDivElement>(null);
  const animRef = useRef<HTMLDivElement>(null);
  const frameRef = useRef<number | null>(null);

  // Wrap animation loop with IntersectionObserver to prevent mobile CPU throttling
  useEffect(() => {
    const el = cubeRef.current;
    if (!el || typeof IntersectionObserver === 'undefined') return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.05 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // requestAnimationFrame loop pauses when scrolled out of view
  useEffect(() => {
    if (!isVisible) {
      if (frameRef.current) {
        cancelAnimationFrame(frameRef.current);
        frameRef.current = null;
      }
      return;
    }

    let startTime: number | null = null;
    const loop = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const elapsed = (timestamp - startTime) / 1000;
      // Precise 7s floating oscillation and subtle 1.2deg tilt
      const yOffset = Math.sin((elapsed / 7) * Math.PI * 2) * -8;
      const rotZ = Math.sin((elapsed / 7) * Math.PI * 2) * 1.2;

      if (animRef.current) {
        animRef.current.style.transform = `translate3d(0, ${yOffset}px, 0) rotate(${rotZ}deg)`;
      }
      frameRef.current = requestAnimationFrame(loop);
    };

    frameRef.current = requestAnimationFrame(loop);

    return () => {
      if (frameRef.current) {
        cancelAnimationFrame(frameRef.current);
        frameRef.current = null;
      }
    };
  }, [isVisible]);

  return (
    <div ref={cubeRef} className="relative flex items-center justify-center my-4 select-none pointer-events-none">
      {/* Atmospheric Radial Light Rays (Purple / Cyan / Amber) */}
      <div
        className="absolute w-80 h-80 rounded-full opacity-70 blur-3xl"
        style={{
          background:
            'radial-gradient(circle, rgba(99,102,241,0.45) 0%, rgba(56,189,248,0.32) 38%, rgba(245,158,11,0.12) 62%, transparent 78%)',
        }}
      />

      {/* Left Halftone & Bracket Accent */}
      <div className="hidden sm:flex items-center gap-3 mr-6 opacity-40">
        <DotMatrix />
        <div className="h-14 w-[1px] bg-gradient-to-b from-transparent via-sky-400 to-transparent" />
      </div>

      {/* 3D Isometric Glowing Cube with RAF hardware transform */}
      <div
        ref={animRef}
        style={{ willChange: 'transform' }}
        className="relative w-36 h-36 sm:w-44 sm:h-44 md:w-48 md:h-48 flex items-center justify-center"
      >
        <svg
          viewBox="0 0 260 260"
          className="w-full h-full drop-shadow-[0_0_35px_rgba(56,189,248,0.6)]"
          fill="none"
        >
          <defs>
            {/* Gradients for outer faces */}
            <linearGradient id="cubeTopGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#E0F2FE" stopOpacity="0.85" />
              <stop offset="45%" stopColor="#38BDF8" stopOpacity="0.75" />
              <stop offset="100%" stopColor="#0284C7" stopOpacity="0.85" />
            </linearGradient>

            <linearGradient id="cubeLeftGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#818CF8" stopOpacity="0.8" />
              <stop offset="50%" stopColor="#0EA5E9" stopOpacity="0.7" />
              <stop offset="100%" stopColor="#08121E" stopOpacity="0.85" />
            </linearGradient>

            <linearGradient id="cubeRightGrad" x1="100%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#0F172A" stopOpacity="0.85" />
              <stop offset="60%" stopColor="#1E293B" stopOpacity="0.7" />
              <stop offset="100%" stopColor="#6366F1" stopOpacity="0.8" />
            </linearGradient>

            {/* Inner Tesseract Core Gradients */}
            <linearGradient id="innerTopGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.95" />
              <stop offset="60%" stopColor="#C084FC" stopOpacity="0.85" />
              <stop offset="100%" stopColor="#38BDF8" stopOpacity="0.9" />
            </linearGradient>

            <linearGradient id="innerLeftGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#A855F7" stopOpacity="0.85" />
              <stop offset="100%" stopColor="#06B6D4" stopOpacity="0.75" />
            </linearGradient>

            <linearGradient id="innerRightGrad" x1="100%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#38BDF8" stopOpacity="0.85" />
              <stop offset="100%" stopColor="#4F46E5" stopOpacity="0.8" />
            </linearGradient>

            {/* Core Hotspot Radial */}
            <radialGradient id="cubeCoreHot">
              <stop offset="0%" stopColor="#FFFFFF" stopOpacity="1" />
              <stop offset="35%" stopColor="#38BDF8" stopOpacity="0.9" />
              <stop offset="70%" stopColor="#6366F1" stopOpacity="0.4" />
              <stop offset="100%" stopColor="#04070B" stopOpacity="0" />
            </radialGradient>

            {/* Top Gloss Highlight */}
            <linearGradient id="topGloss" x1="0%" y1="50%" x2="100%" y2="50%">
              <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.45" />
              <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0" />
            </linearGradient>
          </defs>

          {/* Ambient Circular Core Glow */}
          <circle cx="130" cy="130" r="50" fill="url(#cubeCoreHot)" />

          {/* ── Outer Isometric Cube ── */}
          {/* Top Face */}
          <polygon
            points="130,55 195,92.5 130,130 65,92.5"
            fill="url(#cubeTopGrad)"
            stroke="rgba(255,255,255,0.4)"
            strokeWidth="1.2"
          />
          {/* Top Face Gloss Slash */}
          <polygon
            points="130,55 165,75 115,105 80,85"
            fill="url(#topGloss)"
          />

          {/* Left Face */}
          <polygon
            points="65,92.5 130,130 130,205 65,167.5"
            fill="url(#cubeLeftGrad)"
            stroke="rgba(56,189,248,0.4)"
            strokeWidth="1.2"
          />

          {/* Right Face */}
          <polygon
            points="130,130 195,92.5 195,167.5 130,205"
            fill="url(#cubeRightGrad)"
            stroke="rgba(99,102,241,0.4)"
            strokeWidth="1.2"
          />

          {/* ── Connecting Tesseract Facets (Outer to Inner) ── */}
          <line x1="130" y1="55" x2="130" y2="92.5" stroke="#E0F2FE" strokeWidth="1.5" strokeOpacity="0.7" />
          <line x1="65" y1="92.5" x2="97.5" y2="111.25" stroke="#38BDF8" strokeWidth="1.5" strokeOpacity="0.7" />
          <line x1="195" y1="92.5" x2="162.5" y2="111.25" stroke="#818CF8" strokeWidth="1.5" strokeOpacity="0.7" />
          <line x1="65" y1="167.5" x2="97.5" y2="148.75" stroke="#0EA5E9" strokeWidth="1.5" strokeOpacity="0.6" />
          <line x1="195" y1="167.5" x2="162.5" y2="148.75" stroke="#6366F1" strokeWidth="1.5" strokeOpacity="0.6" />
          <line x1="130" y1="205" x2="130" y2="167.5" stroke="#38BDF8" strokeWidth="1.5" strokeOpacity="0.7" />

          {/* ── Inner Glowing Holographic Core Cube ── */}
          {/* Inner Top */}
          <polygon
            points="130,92.5 162.5,111.25 130,130 97.5,111.25"
            fill="url(#innerTopGrad)"
            stroke="#FFFFFF"
            strokeWidth="1.5"
          />
          {/* Inner Left */}
          <polygon
            points="97.5,111.25 130,130 130,167.5 97.5,148.75"
            fill="url(#innerLeftGrad)"
            stroke="#38BDF8"
            strokeWidth="1.2"
          />
          {/* Inner Right */}
          <polygon
            points="130,130 162.5,111.25 162.5,148.75 130,167.5"
            fill="url(#innerRightGrad)"
            stroke="#818CF8"
            strokeWidth="1.2"
          />

          {/* Center Light Beams & Specular Edge Lines */}
          <line x1="130" y1="55" x2="130" y2="205" stroke="rgba(255,255,255,0.7)" strokeWidth="1.5" />
          <line x1="65" y1="92.5" x2="195" y2="167.5" stroke="rgba(56,189,248,0.3)" strokeWidth="1" strokeDasharray="3 3" />
          <line x1="195" y1="92.5" x2="65" y2="167.5" stroke="rgba(99,102,241,0.3)" strokeWidth="1" strokeDasharray="3 3" />

          {/* Outer Vertex Nodes (Glowing cyan/white dots) */}
          {[
            [130, 55],
            [195, 92.5],
            [195, 167.5],
            [130, 205],
            [65, 167.5],
            [65, 92.5],
            [130, 130],
          ].map(([vx, vy], idx) => (
            <circle
              key={idx}
              cx={vx}
              cy={vy}
              r={idx === 6 ? 3.5 : 2.5}
              fill={idx === 6 ? '#FFFFFF' : '#38BDF8'}
              className="drop-shadow-[0_0_6px_#38bdf8]"
            />
          ))}
        </svg>

        {/* Ambient Ring */}
        <div className="absolute inset-2 rounded-full border border-sky-400/25 animate-ping opacity-25 pointer-events-none" />
      </div>

      {/* Right Halftone & Bracket Accent */}
      <div className="hidden sm:flex items-center gap-3 ml-6 opacity-40">
        <div className="h-14 w-[1px] bg-gradient-to-b from-transparent via-purple-400 to-transparent" />
        <DotMatrix />
      </div>
    </div>
  );
}

export default function HeroShowreel() {
  const [modalOpen, setModalOpen] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({ target: containerRef, offset: ['start start', 'end start'] });
  const y = useTransform(scrollYProgress, [0, 1], [0, 60]);

  useEffect(() => {
    const handleOpenShowreel = () => setModalOpen(true);
    window.addEventListener('open-showreel', handleOpenShowreel);

    const el = containerRef.current;
    if (!el || typeof IntersectionObserver === 'undefined') {
      videoRef.current?.play().catch(() => {});
      return () => window.removeEventListener('open-showreel', handleOpenShowreel);
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (videoRef.current) {
          if (entry.isIntersecting) {
            videoRef.current.play().catch(() => {});
          } else {
            videoRef.current.pause();
          }
        }
      },
      { threshold: 0.05 }
    );
    observer.observe(el);

    return () => {
      window.removeEventListener('open-showreel', handleOpenShowreel);
      observer.disconnect();
    };
  }, []);

  return (
    <section
      id="home"
      ref={containerRef}
      className="relative min-h-screen flex flex-col items-center justify-center pt-24 pb-20 px-5 md:px-8 overflow-hidden"
      style={{ backgroundColor: '#04070B' }}
    >
      {/* Anchor for showreel navigation */}
      <div id="showreel" className="absolute top-0 left-0" />

      {/* Radial glow */}
      <div className="absolute inset-0 radial-glow pointer-events-none" />

      {/* Architectural grid */}
      <ArchGrid />

      {/* Background watermark "KRUNAL" */}
      <div
        className="absolute top-[38%] left-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center select-none pointer-events-none overflow-hidden z-0"
        aria-hidden
      >
        <span
          className="font-bold uppercase tracking-[0.18em] text-white/[0.035] block whitespace-nowrap"
          style={{ fontSize: 'clamp(70px, 14vw, 200px)' }}
        >
          KRUNAL
        </span>
      </div>

      {/* Content */}
      <motion.div
        style={{ y }}
        className="relative z-10 w-full max-w-[1100px] flex flex-col items-center text-center"
      >
        {/* Pill Badge */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.6 }}
          className="pill-badge mb-6"
        >
          <span className="pill-dot animate-pulse" />
          <span className="font-mono text-[11px] tracking-wider text-slate-300">
            Video Editor • After Motion &amp; Gold Motion
          </span>
        </motion.div>

        {/* Compact 2-Line Editorial Headline (Qintara-inspired layout) */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="font-light tracking-[-0.03em] leading-[1.18] text-3xl sm:text-4xl md:text-[44px] lg:text-[50px] max-w-3xl mx-auto mb-3"
        >
          <span className="text-white font-light">Visual storytelling</span>{' '}
          <span className="text-zinc-500 font-light">crafted for</span>
          <br className="hidden sm:inline" />{' '}
          <span className="text-white font-light">modern brands,</span>{' '}
          <span className="text-zinc-500 font-light">built for impact</span>
        </motion.h1>

        {/* Tighter Monospace Sub-caption in JetBrains Mono */}
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="font-mono text-xs md:text-sm tracking-widest uppercase text-slate-400 max-w-lg mx-auto mb-6 leading-relaxed px-4"
        >
          Always try to become - Not to look like
        </motion.p>

        {/* Single Pill CTA centered directly above 3D Cube (matching Qintara "See it in action ->") */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.38, duration: 0.5 }}
          className="flex items-center justify-center mb-4"
        >
          <button
            onClick={() => setModalOpen(true)}
            className="group px-6 py-2.5 rounded-full bg-white/10 hover:bg-white/15 border border-white/20 hover:border-sky-400/50 backdrop-blur-md text-white font-mono text-xs uppercase tracking-wider flex items-center gap-2.5 shadow-[0_0_20px_rgba(56,189,248,0.15)] hover:shadow-[0_0_30px_rgba(56,189,248,0.3)] transition-all duration-300"
          >
            <span className="w-2 h-2 rounded-full bg-sky-400 shadow-[0_0_8px_#38bdf8] group-hover:scale-125 transition-transform" />
            <span>Watch Showreel</span>
            <span className="text-slate-400 font-normal">({siteConfig.showreelDuration})</span>
            <ArrowUpRight size={13} className="text-sky-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </button>
        </motion.div>

        {/* ── 3D Geometric Glowing Cube Centerpiece ────────── */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.45, duration: 0.7 }}
          className="w-full flex flex-col items-center"
        >
          <GlowingCubeCenterpiece />

          {/* Minimal dotted process tags */}
          <div className="flex flex-wrap items-center justify-center gap-4 text-[11px] font-mono text-slate-400 mb-8">
            <span className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-sky-400 shadow-[0_0_6px_#38bdf8]" />
              4K 60FPS Velocity Ramps
            </span>
            <span className="text-white/20">•</span>
            <span className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-purple-400 shadow-[0_0_6px_#c084fc]" />
              After Motion Graph Curves
            </span>
            <span className="text-white/20">•</span>
            <span className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-400 shadow-[0_0_6px_#fbbf24]" />
              Gold Motion Color Science
            </span>
          </div>
        </motion.div>

        {/* ── Compact Showreel Preview Container (max-w-2xl) ─── */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="relative w-full max-w-2xl px-2"
        >
          {/* Glow behind frame */}
          <div
            className="absolute -inset-4 rounded-3xl opacity-25 pointer-events-none"
            style={{
              background:
                'radial-gradient(ellipse at center, rgba(56,189,248,0.3), rgba(139,92,246,0.15), transparent 70%)',
            }}
          />

          {/* Outer Glass Bezel (Refined p-2 rounded-2xl) */}
          <div className="relative p-2 rounded-2xl glass-card border border-white/10 shadow-2xl backdrop-blur-xl">
            {/* 16:9 Inner Container */}
            <div className="relative w-full rounded-xl overflow-hidden bg-[#04070B]" style={{ paddingBottom: '56.25%' }}>
              {/* Preview video with dark cinematic vignette */}
              <video
                ref={videoRef}
                src={siteConfig.showreelPreview}
                className="absolute inset-0 w-full h-full object-cover brightness-90 contrast-105"
                autoPlay
                muted
                loop
                playsInline
                poster="/thumbnails/showreel-poster.jpg"
              />

              {/* Dark cinematic vignette overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#04070B]/80 via-black/25 to-[#04070B]/40 pointer-events-none" />

              {/* Custom Play button overlay */}
              <button
                type="button"
                onClick={() => setModalOpen(true)}
                className="absolute inset-0 flex items-center justify-center group cursor-pointer z-10"
                aria-label="Play showreel"
              >
                <div className="glass-card px-5 py-2.5 flex items-center gap-3 group-hover:border-sky-400/50 transition-all duration-300 group-hover:scale-105 bg-black/40 backdrop-blur-md border border-white/15">
                  <div className="w-8 h-8 rounded-full bg-sky-400/20 border border-sky-400/40 flex items-center justify-center group-hover:bg-sky-400/40 transition-colors">
                    <Play size={13} fill="white" className="text-white ml-0.5" />
                  </div>
                  <span className="text-white text-xs font-semibold tracking-wide">
                    Watch {siteConfig.showreelYear} Reel
                  </span>
                </div>
              </button>

              {/* Corner badge */}
              <div className="absolute top-3 left-3 pill-badge !text-[10px] !px-2 !py-0.5 !bg-black/60">
                <span className="pill-dot !w-1.5 !h-1.5 animate-pulse" />
                <span className="font-mono">4K · 60FPS</span>
              </div>
            </div>

            {/* ── Floating HUD Card — Left (Retention) ───────────── */}
            <motion.div
              animate={{ y: [0, -6, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute -left-4 sm:-left-16 bottom-4 sm:bottom-6 z-20 glass-card !rounded-xl p-3 sm:p-4 w-44 sm:w-52 border border-white/10 shadow-xl hidden sm:block"
              style={{ backdropFilter: 'blur(20px)', background: 'rgba(15, 23, 42, 0.75)' }}
            >
              <div className="flex items-center gap-1.5 mb-2">
                <TrendingUp size={12} className="text-sky-400" />
                <span className="text-[11px] font-medium text-slate-300">Avg. Retention</span>
              </div>
              <WaveformBars />
              <RetentionCurve />
              <div className="mt-2 flex items-baseline gap-1">
                <span className="font-mono text-xl sm:text-2xl font-bold text-white">94%</span>
                <span className="text-[10px] text-slate-400 font-light">view duration</span>
              </div>
            </motion.div>

            {/* ── Floating HUD Card — Right (Mobile Tools) ──────────── */}
            <motion.div
              animate={{ y: [0, 6, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
              className="absolute -right-4 sm:-right-16 top-4 sm:top-6 z-20 glass-card !rounded-xl p-3 sm:p-4 w-40 sm:w-48 border border-white/10 shadow-xl hidden sm:block"
              style={{ backdropFilter: 'blur(20px)', background: 'rgba(15, 23, 42, 0.75)' }}
            >
              <div className="flex justify-center mb-1.5">
                <CircularProgress value={100} />
              </div>
              <div className="text-center">
                <div className="text-xs font-semibold text-white leading-tight">4K 60FPS Master</div>
                <div className="text-[10px] text-slate-400 font-light mt-0.5">Mobile Agility</div>
              </div>
              {/* Updated tools: After Motion & Gold Motion */}
              <div className="mt-2.5 flex flex-wrap gap-1 justify-center">
                <span className="font-mono text-[9px] px-1.5 py-0.5 rounded bg-sky-400/10 text-sky-300 border border-sky-400/20">
                  After Motion
                </span>
                <span className="font-mono text-[9px] px-1.5 py-0.5 rounded bg-amber-400/10 text-amber-300 border border-amber-400/20">
                  Gold Motion
                </span>
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* Stats Row */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.5 }}
          className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-10 text-center w-full max-w-2xl"
        >
          {Object.entries(siteConfig.stats).map(([key, val]) => (
            <div key={key} className="flex flex-col gap-0.5">
              <span className="font-mono text-2xl md:text-3xl font-light text-white">{val}</span>
              <span className="font-mono text-[10px] text-slate-500 uppercase tracking-widest">
                {key === 'retention'
                  ? 'Retention Rate'
                  : key === 'projects'
                  ? 'Mobile Edits'
                  : key === 'brands'
                  ? 'Creators & Brands'
                  : 'Render Output'}
              </span>
            </div>
          ))}
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5"
      >
        <span className="font-mono text-[9px] text-slate-600 uppercase tracking-widest">Scroll</span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="w-[1px] h-6 bg-gradient-to-b from-sky-400/40 to-transparent"
        />
      </motion.div>

      {/* Fullscreen Video Modal */}
      <VideoModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        videoSrc={showreel?.videoUrl || siteConfig.showreelVideo}
        embedUrl={showreel?.embedUrl}
        sourceUrl={showreel?.videoUrl || siteConfig.showreelVideo}
        title={showreel?.title || `${siteConfig.showreelYear} Mobile Showreel`}
        client="Krunal Khatri"
        aspectRatio="16:9"
        description="Crafted entirely in After Motion and Gold Motion — featuring multi-layer kinetic typography, speed ramp velocity curves, and 4K 60FPS sound design."
      />
    </section>
  );
}
