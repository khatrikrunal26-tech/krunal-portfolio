'use client';

import { motion } from 'framer-motion';
import { workflowPhases } from '../data/portfolioData';

interface OrbitProps {
  phase: (typeof workflowPhases)[0];
  xOffset: number;
  delay: number;
}

function OrbitSection({ phase, xOffset, delay }: OrbitProps) {
  const isCenter = xOffset === 0;
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.88 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] }}
      className="flex flex-col items-center gap-5"
    >
      {/* Phase Label */}
      <div className="text-center">
        <span className="font-mono text-[10px] tracking-widest uppercase block mb-1" style={{ color: phase.color }}>
          {phase.phase}
        </span>
        <h3 className="text-white font-normal text-sm md:text-base tracking-tight">
          {phase.title}
        </h3>
      </div>

      {/* Dashed Orbit Circle with Nodes */}
      <div
        className="relative flex items-center justify-center"
        style={{
          width: 'clamp(230px, 28vw, 320px)',
          height: 'clamp(230px, 28vw, 320px)',
        }}
      >
        {/* Dashed Outer Circle */}
        <div
          className="dashed-circle absolute inset-0"
          style={{
            boxShadow: `inset 0 0 60px ${phase.glowColor}, 0 0 35px ${phase.glowColor}`,
            borderColor: phase.color,
            opacity: 0.45,
          }}
        />

        {/* Faint Inner Glow */}
        <div
          className="absolute inset-8 rounded-full pointer-events-none"
          style={{
            background: `radial-gradient(circle at center, ${phase.glowColor}, transparent 70%)`,
          }}
        />

        {/* Nodes inside Orbit */}
        <div className="relative z-10 flex flex-col gap-2.5 w-full px-5">
          {phase.nodes.map((node, i) => (
            <motion.div
              key={node}
              initial={{ opacity: 0, x: i % 2 === 0 ? -12 : 12 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: delay + 0.15 + i * 0.08 }}
              className="glass-card !rounded-xl px-3 py-2 flex items-center gap-2.5 w-full glass-card-hover bg-[#04070B]/70 border border-white/10"
            >
              <span
                className="w-2 h-2 rounded-full flex-shrink-0"
                style={{
                  background: phase.color,
                  boxShadow: `0 0 8px ${phase.color}`,
                }}
              />
              <span className="font-mono text-[11px] text-slate-200 font-light truncate">{node}</span>
            </motion.div>
          ))}
        </div>

        {/* Spinning Ring */}
        <motion.div
          animate={{ rotate: isCenter ? -360 : 360 }}
          transition={{ duration: isCenter ? 32 : 26, repeat: Infinity, ease: 'linear' }}
          className="absolute inset-0 rounded-full border border-dashed opacity-20 pointer-events-none"
          style={{ borderColor: phase.color }}
        />
      </div>
    </motion.div>
  );
}

export default function WorkflowOrbits() {
  return (
    <section
      id="workflow"
      className="relative py-28 px-5 md:px-8 overflow-hidden"
      style={{ backgroundColor: '#04070B' }}
    >
      {/* Background Radial Glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full"
          style={{
            background:
              'radial-gradient(circle at center, rgba(56,189,248,0.06) 0%, rgba(139,92,246,0.04) 40%, transparent 70%)',
          }}
        />
      </div>

      {/* Top Hairline */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-sky-400/15 to-transparent" />

      <div className="max-w-[1300px] mx-auto relative z-10">
        {/* Section Header with Refined Qintara Typography */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="font-mono text-xs tracking-widest uppercase text-sky-400 block mb-3">
            Post-Production Roadmap
          </span>
          <h2 className="text-3xl sm:text-5xl md:text-6xl font-light tracking-[-0.03em] text-white mb-3">
            Three phases, <span className="text-slate-400 font-light">one seamless result</span>
          </h2>
          <p className="font-mono text-xs sm:text-sm tracking-wider text-slate-400 max-w-md mx-auto">
            A structured 3-phase roadmap engineered for rhythm, retention, and delivery
          </p>
        </motion.div>

        {/* 3 Intersecting Orbits */}
        <div className="flex flex-col md:flex-row items-center justify-center gap-6 md:gap-0">
          {workflowPhases.map((phase, i) => (
            <div key={phase.id} className="relative flex items-center">
              <OrbitSection phase={phase} xOffset={i - 1} delay={i * 0.15} />
              {i < workflowPhases.length - 1 && (
                <div className="hidden md:block w-8 lg:w-12 h-px bg-gradient-to-r from-white/10 to-white/10 mx-1 flex-shrink-0" />
              )}
            </div>
          ))}
        </div>

        {/* Turnaround Callout Pill */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="text-center mt-16"
        >
          <div className="glass-card inline-flex flex-col sm:flex-row items-center gap-4 sm:gap-6 px-6 sm:px-8 py-4 !rounded-2xl border border-white/10 bg-[#08121E]/60">
            {[
              { val: '24–48h', label: 'First Draft Turnaround' },
              { val: '100%', label: 'Custom Keyframe & Graph Flow' },
              { val: '4K 60FPS', label: 'Gold Motion Master Renders' },
            ].map(({ val, label }) => (
              <div
                key={val}
                className="text-center px-4 sm:px-6 sm:border-r border-white/[0.08] last:border-r-0"
              >
                <div className="font-mono text-lg sm:text-xl font-light text-sky-400">{val}</div>
                <div className="font-mono text-[10px] text-slate-400 mt-0.5">{label}</div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Bottom Hairline */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
    </section>
  );
}
