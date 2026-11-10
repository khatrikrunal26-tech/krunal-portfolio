'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUpRight, Menu, X } from 'lucide-react';
import { siteConfig } from '../data/portfolioData';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('#home');

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 20);

      const sectionIds = ['#home', '#showreel', '#work', '#workflow', '#tools'];
      for (const id of sectionIds) {
        const el = document.querySelector(id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 240 && rect.bottom >= 120) {
            setActiveSection(id);
            break;
          }
        }
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleNav = (href: string) => {
    setMenuOpen(false);
    setActiveSection(href);
    if (href === '#home' || href === '/') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    if (href === '#showreel') {
      const el = document.querySelector(href);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
      window.dispatchEvent(new CustomEvent('open-showreel'));
      return;
    }
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? 'backdrop-blur-md bg-[#04070B]/85 border-b border-white/[0.06] shadow-[0_4px_30px_rgba(0,0,0,0.6)]'
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-[1400px] mx-auto px-5 md:px-8 h-16 flex items-center justify-between gap-4">
          {/* Brand */}
          <button
            onClick={() => handleNav('#home')}
            className="flex items-center gap-3 flex-shrink-0 text-left group cursor-pointer focus:outline-none"
          >
            <div className="flex flex-col leading-tight">
              <span className="text-sm font-medium tracking-[0.14em] text-white uppercase group-hover:text-sky-300 transition-colors">
                Krunal Khatri
              </span>
              <span className="font-mono text-[9px] tracking-[0.24em] text-sky-400/80 uppercase">
                Video Editor
              </span>
            </div>
          </button>

          {/* Centre nav — desktop */}
          <nav className="hidden md:flex items-center gap-1">
            {siteConfig.navLinks.map((link) => {
              const isActive = activeSection === link.href;
              return (
                <button
                  key={link.href}
                  onClick={() => handleNav(link.href)}
                  className={`px-3.5 py-2 font-mono text-xs uppercase tracking-wider transition-colors duration-200 rounded-lg relative group ${
                    isActive ? 'text-sky-300 font-medium' : 'text-slate-400 hover:text-white hover:bg-white/5'
                  }`}
                >
                  {link.label}
                  {isActive ? (
                    <span className="absolute bottom-1 left-1/2 -translate-x-1/2 w-4 h-[1.5px] bg-sky-400 shadow-[0_0_8px_#38bdf8]" />
                  ) : (
                    <span className="absolute bottom-1 left-1/2 -translate-x-1/2 w-0 group-hover:w-3 h-[1px] bg-sky-400/60 transition-all duration-300" />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Right — desktop */}
          <div className="hidden md:flex items-center gap-3">
            <div className="pill-badge !text-[11px] font-mono">
              <span className="pill-dot pill-dot-green animate-pulse" />
              Available for Projects
            </div>
            <button
              onClick={() => handleNav('#contact')}
              className="cta-btn group !text-xs font-mono uppercase tracking-wider"
            >
              Start a Project
              <span className="w-5 h-5 rounded-full bg-sky-400/20 flex items-center justify-center group-hover:bg-sky-400/30 transition-colors">
                <ArrowUpRight size={11} className="text-sky-400" />
              </span>
            </button>
          </div>

          {/* Mobile menu toggle */}
          <button
            className="md:hidden p-2 text-slate-400 hover:text-white"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            {menuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </motion.header>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="fixed top-16 left-0 right-0 z-40 glass-card border-none rounded-none backdrop-blur-xl bg-[#04070B]/95 border-b border-white/[0.06] p-6 flex flex-col gap-3 md:hidden"
          >
            {siteConfig.navLinks.map((link) => {
              const isActive = activeSection === link.href;
              return (
                <button
                  key={link.href}
                  onClick={() => handleNav(link.href)}
                  className={`text-left py-2.5 px-4 font-mono text-xs uppercase tracking-wider rounded-lg transition-all ${
                    isActive ? 'text-sky-300 bg-sky-400/10' : 'text-slate-300 hover:text-white hover:bg-white/5'
                  }`}
                >
                  {link.label}
                </button>
              );
            })}
            <div className="pt-3 border-t border-white/[0.06] flex flex-col gap-3">
              <div className="pill-badge w-fit font-mono text-xs">
                <span className="pill-dot pill-dot-green animate-pulse" />
                Available for Projects
              </div>
              <button
                onClick={() => handleNav('#contact')}
                className="cta-btn w-fit font-mono text-xs"
              >
                Start a Project <ArrowUpRight size={14} />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
