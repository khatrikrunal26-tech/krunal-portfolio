'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { toolsStack } from '../data/portfolioData';
import { Smartphone, Zap, Cloud, Sparkles } from 'lucide-react';

const retentionPresets = [
  {
    id: 'reels',
    name: 'Reels',
    rate: '96%',
    points: [100, 98, 96, 95, 96, 95, 96, 95, 97, 96, 96],
    note: 'Instant 2s hook & velocity ramps',
  },
  {
    id: 'yt',
    name: 'YouTube',
    rate: '91%',
    points: [100, 95, 92, 91, 93, 90, 92, 89, 91, 90, 91],
    note: 'Narrative suspense pacing curve',
  },
  {
    id: 'th',
    name: 'Talking Head',
    rate: '93%',
    points: [100, 97, 94, 93, 94, 92, 93, 92, 94, 93, 93],
    note: 'Pattern interrupts & dynamic punch-ins',
  },
];

// ── Interactive Retention Chart ───────────────────────────────
function RetentionInteractiveCard() {
  const [activePreset, setActivePreset] = useState(retentionPresets[0]);
  const max = 100;
  const min = 85;
  const w = 220;
  const h = 70;

  const coords = activePreset.points.map((v, i) => {
    const x = (i / (activePreset.points.length - 1)) * w;
    const y = h - ((v - min) / (max - min)) * h;
    return `${x},${y}`;
  });
  const pathD = `M ${coords.join(' L ')}`;
  const fillD = `${pathD} L ${w},${h} L 0,${h} Z`;

  return (
    <div className="flex flex-col h-full justify-between">
      <div>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Zap size={16} className="text-sky-400" />
            <span className="font-mono text-xs font-medium text-slate-300 uppercase tracking-widest">
              Pacing &amp; Retention
            </span>
          </div>
          {/* Preset Buttons */}
          <div className="flex gap-1">
            {retentionPresets.map((p) => (
              <button
                key={p.id}
                onClick={() => setActivePreset(p)}
                className={`px-2 py-0.5 rounded text-[10px] font-mono transition-all ${
                  activePreset.id === p.id
                    ? 'bg-sky-400/20 text-sky-300 border border-sky-400/40'
                    : 'text-slate-400 hover:text-white bg-white/5'
                }`}
              >
                {p.name}
              </button>
            ))}
          </div>
        </div>

        <div className="mb-4">
          <div className="font-mono text-4xl sm:text-5xl font-light text-white mb-1">
            {activePreset.rate}
          </div>
          <div className="font-mono text-[11px] text-slate-400">
            {activePreset.note}
          </div>
        </div>

        {/* SVG Chart */}
        <div className="w-full">
          <div className="flex justify-between font-mono text-[9px] text-slate-500 mb-2">
            <span>0:00</span>
            <span>Avg. Watch Curve</span>
            <span>End</span>
          </div>
          <svg viewBox={`0 0 ${w} ${h}`} className="w-full" style={{ height: 70 }}>
            <defs>
              <linearGradient id="retGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#38BDF8" stopOpacity="0.3" />
                <stop offset="100%" stopColor="#38BDF8" stopOpacity="0" />
              </linearGradient>
            </defs>
            <path d={fillD} fill="url(#retGrad)" />
            <path
              d={pathD}
              stroke="#38BDF8"
              strokeWidth="1.5"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            {coords[coords.length - 1] && (
              <circle
                cx={w}
                cy={h - ((activePreset.points[activePreset.points.length - 1] - min) / (max - min)) * h}
                r="3"
                fill="#38BDF8"
              />
            )}
          </svg>
          <div className="flex items-center gap-1.5 mt-2">
            <div className="pill-dot !w-1.5 !h-1.5" />
            <span className="font-mono text-[10px] text-slate-400">
              Interactive test: {activePreset.name} optimized
            </span>
          </div>
        </div>

        {/* 4 Feature Badges */}
        <div className="mt-5 grid grid-cols-2 gap-2.5">
          {[
            { val: 'Hook', desc: 'First 2 seconds retention trigger' },
            { val: 'Pacing', desc: 'Velocity ramp curve sync' },
            { val: 'SFX', desc: '808 bass drops & whooshes' },
            { val: 'Text', desc: 'High-energy kinetic typography' },
          ].map(({ val, desc }) => (
            <div key={val} className="bg-white/[0.025] rounded-lg p-2.5 border border-white/[0.06]">
              <div className="font-mono text-sky-400 text-xs font-medium">{val}</div>
              <div className="text-slate-400 text-[10px] font-light mt-0.5 leading-tight">{desc}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-4 pt-4 border-t border-white/[0.06] flex items-center gap-2">
        <Sparkles size={12} className="text-sky-400" />
        <span className="font-mono text-[10px] text-slate-400">Psychology-tested edit pacing</span>
      </div>
    </div>
  );
}

// ── Mobile Tools Suite Card ───────────────────────────────────
function MobileToolsCard() {
  return (
    <div className="flex flex-col h-full justify-between">
      <div>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Smartphone size={16} className="text-sky-400" />
            <span className="font-mono text-xs font-medium text-slate-300 uppercase tracking-widest">
              Mobile Suite
            </span>
          </div>
          <span className="pill-badge !text-[9px] !px-2 !py-0.5 !bg-sky-400/10 !border-sky-400/30 text-sky-300 font-mono">
            4K 60FPS
          </span>
        </div>

        <div className="flex flex-col gap-2.5">
          {toolsStack.map((tool) => (
            <div
              key={tool.name}
              className="glass-card !rounded-xl p-3 border border-white/[0.08] hover:border-sky-400/30 transition-all duration-200 group bg-white/[0.02]"
            >
              <div className="flex items-start gap-3">
                <span
                  className="w-8 h-8 rounded-lg flex items-center justify-center font-mono text-xs font-bold flex-shrink-0 shadow-inner"
                  style={{
                    backgroundColor: `${tool.highlight}18`,
                    color: tool.highlight,
                    border: `1px solid ${tool.highlight}35`,
                  }}
                >
                  {tool.badge}
                </span>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2">
                    <h4 className="text-xs font-medium text-white group-hover:text-sky-300 transition-colors">
                      {tool.name}
                    </h4>
                  </div>
                  <p className="text-[10px] text-slate-400 font-light mt-0.5 leading-snug">
                    {tool.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-4 pt-4 border-t border-white/[0.06]">
        <p className="font-mono text-[11px] text-slate-400 leading-relaxed font-light">
          Powered by <span className="text-sky-400 font-medium">After Motion</span> &amp;{' '}
          <span className="text-amber-400 font-medium">Gold Motion</span> — delivering desktop-grade VFX, smooth
          curves, and 4K 60fps renders with mobile agility.
        </p>
      </div>
    </div>
  );
}

// ── Turnaround & Delivery Card ────────────────────────────────
function WorkflowCard() {
  const steps = [
    { label: 'Raw Footage Ingest', detail: 'Google Drive / WeTransfer / Telegram', done: true },
    { label: 'After Motion Cut', detail: 'Kinetic cuts & Bezier velocity curves', done: true },
    { label: 'Gold Motion Finish', detail: 'High-bitrate 4K 60fps render & color', done: true },
    { label: '24–48h Turnaround', detail: 'First draft delivery guarantee', done: true },
    { label: 'Revisions & Final Export', detail: 'Google Drive fast-sync review cycles', done: true },
  ];

  return (
    <div className="flex flex-col h-full justify-between">
      <div>
        <div className="flex items-center gap-2 mb-4">
          <Cloud size={16} className="text-sky-400" />
          <span className="font-mono text-xs font-medium text-slate-300 uppercase tracking-widest">
            Turnaround &amp; Delivery
          </span>
        </div>

        <div className="flex flex-col gap-2.5">
          {steps.map((step, i) => (
            <motion.div
              key={step.label}
              initial={{ opacity: 0, x: -8 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.06 }}
              className="flex items-center gap-3 p-2 rounded-lg bg-white/[0.015] border border-white/[0.04]"
            >
              <div
                className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${
                  step.done ? 'bg-sky-400 shadow-[0_0_6px_#38bdf8]' : 'bg-white/20'
                }`}
              />
              <div className="flex-1 min-w-0">
                <div className="text-xs text-slate-300 font-normal">{step.label}</div>
                <div className="font-mono text-[9px] text-slate-500 truncate">{step.detail}</div>
              </div>
              {step.done && (
                <span className="font-mono text-[8px] text-sky-400 border border-sky-400/30 rounded px-1.5 py-0.5 bg-sky-400/5">
                  Ready
                </span>
              )}
            </motion.div>
          ))}
        </div>
      </div>

      <div className="mt-4 pt-4 border-t border-white/[0.06] flex items-center gap-2">
        <span className="pill-dot !w-2 !h-2 animate-pulse" />
        <span className="font-mono text-[10px] text-slate-400">Mobile-to-Cloud fast track — zero latency</span>
      </div>
    </div>
  );
}

export default function SpecsBento() {
  return (
    <section
      id="tools"
      className="relative py-28 px-5 md:px-8 overflow-hidden"
      style={{ backgroundColor: '#08121E' }}
    >
      {/* Top Hairline */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-sky-400/15 to-transparent" />

      <div className="max-w-[1300px] mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <span className="font-mono text-xs tracking-widest uppercase text-sky-400 block mb-3">
            Technical Arsenal
          </span>
          <h2 className="text-3xl sm:text-5xl md:text-6xl font-light tracking-[-0.03em] text-white">
            Tools &amp; <span className="text-slate-400 font-light">precision</span>
          </h2>
          <p className="font-mono text-xs sm:text-sm tracking-wider text-slate-400 mt-3 max-w-xl mx-auto">
            studio-grade mobile motion graphics, smooth velocity curves, and rapid cloud delivery
          </p>
        </motion.div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Card 1 — Mobile Suite */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0, duration: 0.6 }}
            className="glass-card glass-card-hover p-6 md:p-7 flex flex-col justify-between"
          >
            <MobileToolsCard />
          </motion.div>

          {/* Card 2 — Interactive Retention & Pacing Curve */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1, duration: 0.6 }}
            className="glass-card glass-card-hover p-6 md:p-7 flex flex-col justify-between"
          >
            <RetentionInteractiveCard />
          </motion.div>

          {/* Card 3 — Turnaround & Workflow */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="glass-card glass-card-hover p-6 md:p-7 flex flex-col justify-between"
          >
            <WorkflowCard />
          </motion.div>
        </div>

        {/* Export Formats Strip */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="mt-8 glass-card p-4 flex flex-wrap items-center justify-center gap-3 border border-white/10"
        >
          <span className="font-mono text-xs text-slate-400 mr-2">Export formats:</span>
          {[
            '4K UHD 60FPS',
            '1080x1920 9:16 Vertical',
            '16:9 Cinema MP4',
            'High-Bitrate H.265 / HEVC',
            'ProRes Proxy',
            'Multi-Platform Ready',
          ].map((fmt) => (
            <span key={fmt} className="pill-badge !text-[10px] font-mono">
              {fmt}
            </span>
          ))}
        </motion.div>
      </div>

      {/* Bottom Hairline */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
    </section>
  );
}
