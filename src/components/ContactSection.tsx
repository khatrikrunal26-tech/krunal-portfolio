'use client';

import { useState, useRef, FormEvent } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Copy, Check, MessageCircle, ArrowUpRight, Mail, Phone, AlertCircle } from 'lucide-react';
import { siteConfig } from '../data/portfolioData';

// ── Toast ─────────────────────────────────────────────────────
function Toast({ message, visible, isError }: { message: string; visible: boolean; isError?: boolean }) {
  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 12 }}
          className={`fixed bottom-6 left-1/2 -translate-x-1/2 z-[200] glass-card px-4 py-2.5 flex items-center gap-2 text-sm text-white shadow-2xl border ${
            isError ? 'border-rose-500/40 !bg-rose-950/80' : 'border-emerald-500/40 !bg-[#04070B]/90'
          }`}
        >
          {isError ? (
            <AlertCircle size={14} className="text-rose-400 flex-shrink-0" />
          ) : (
            <Check size={14} className="text-emerald-400 flex-shrink-0" />
          )}
          <span>{message}</span>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// ── Official Social Brand Icons ──────────────────────────────
function SocialIcon({ platform }: { platform: string }) {
  switch (platform) {
    case 'Instagram':
      return (
        <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
        </svg>
      );
    case 'YouTube':
      return (
        <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
          <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
        </svg>
      );
    case 'LinkedIn':
      return (
        <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
          <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z"/>
        </svg>
      );
    case 'X':
      return (
        <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
        </svg>
      );
    default:
      return null;
  }
}

// ── Contact form ──────────────────────────────────────────────
type FormState = 'idle' | 'loading' | 'success' | 'error';

export default function ContactSection() {
  const [copied, setCopied] = useState(false);
  const [formState, setFormState] = useState<FormState>('idle');
  const [toastVisible, setToastVisible] = useState(false);
  const [toastMsg, setToastMsg] = useState('');
  const [toastIsError, setToastIsError] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);

  const showToast = (msg: string, isError = false) => {
    setToastMsg(msg);
    setToastIsError(isError);
    setToastVisible(true);
    setTimeout(() => setToastVisible(false), 4000);
  };

  const copyEmail = async (email: string) => {
    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(email);
        setCopied(true);
      } else {
        throw new Error('Clipboard API unavailable');
      }
    } catch {
      // Robust fallback for mobile browsers & restricted contexts
      const textArea = document.createElement('textarea');
      textArea.value = email;
      textArea.style.position = 'fixed';
      textArea.style.left = '-999999px';
      textArea.style.top = '-999999px';
      document.body.appendChild(textArea);
      textArea.focus();
      textArea.select();
      document.execCommand('copy');
      textArea.remove();
      setCopied(true);
    }
    showToast(`Copied ${email} ✓`);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormState('loading');

    const form = e.currentTarget;
    const formData = new FormData(form);
    const clientName = (formData.get('name') as string) || 'Client';

    const accessKey =
      (siteConfig as any).contact?.web3FormsKey ||
      (siteConfig as any).web3FormsKey ||
      process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY ||
      'de00c26b-7514-4a63-818a-05195b72888b';

    formData.append('access_key', accessKey);
    formData.append('to_email', 'reachoutkrunal@gmail.com');
    formData.append('from_name', 'Krunal Portfolio Client');
    formData.append('subject', `New Project Brief from ${clientName}`);
    if (formData.get('brief') && !formData.get('message')) {
      formData.append('message', formData.get('brief') as string);
    }
    if (formData.get('projectType')) {
      formData.append('category', formData.get('projectType') as string);
      formData.append('service', formData.get('projectType') as string);
    }

    try {
      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
        },
        body: formData,
      });

      const data = await res.json();

      if (data.success) {
        setFormState('success');
        showToast('✓ Brief sent successfully! Krunal will review and reply within 24 hours.', false);
        formRef.current?.reset();
        setTimeout(() => setFormState('idle'), 7000);
      } else {
        setFormState('error');
        showToast('Failed to send. Please reach out via WhatsApp (+91 9106431821) or reachoutkrunal@gmail.com.', true);
        setTimeout(() => setFormState('idle'), 7000);
      }
    } catch {
      setFormState('error');
      showToast('Failed to send. Please reach out via WhatsApp (+91 9106431821) or reachoutkrunal@gmail.com.', true);
      setTimeout(() => setFormState('idle'), 7000);
    }
  };

  return (
    <>
      <Toast message={toastMsg} visible={toastVisible} isError={toastIsError} />

      <section
        id="contact"
        className="relative py-28 px-5 md:px-8 overflow-hidden"
        style={{ backgroundColor: '#04070B' }}
      >
        {/* Architectural grid hairlines */}
        <div className="absolute inset-0 pointer-events-none select-none" aria-hidden>
          {/* Corner crosshairs */}
          {[
            { top: '8%', left: '8%' },
            { top: '8%', right: '8%', left: 'auto' },
            { bottom: '8%', left: '8%', top: 'auto' },
            { bottom: '8%', right: '8%', left: 'auto', top: 'auto' },
          ].map((pos, i) => (
            <div key={i} className="arch-crosshair" style={{ position: 'absolute', ...pos }} />
          ))}
          {/* Thin frame */}
          <div
            className="absolute rounded-2xl border border-white/[0.05]"
            style={{ inset: '5%' }}
          />
        </div>

        {/* Top glow */}
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-sky-400/20 to-transparent" />

        {/* Background radial */}
        <div
          className="absolute left-1/2 bottom-0 -translate-x-1/2 w-[800px] h-[500px] pointer-events-none"
          style={{
            background: 'radial-gradient(ellipse at bottom, rgba(56,189,248,0.08), transparent 70%)',
          }}
        />

        <div className="max-w-[1000px] mx-auto relative z-10">
          {/* Headline */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="text-center mb-12"
          >
            <span className="font-mono text-xs tracking-widest uppercase text-sky-400 block mb-3">
              Get in Touch
            </span>
            <h2 className="font-light tracking-[-0.03em] leading-[1.1] text-white mb-3 text-3xl sm:text-5xl md:text-6xl">
              Great footage deserves
              <br />
              <span className="text-slate-400 font-light">an unforgettable edit.</span>
            </h2>
            <p className="font-mono text-xs sm:text-sm tracking-wider text-slate-400 max-w-sm mx-auto">
              ready to supercharge your retention? let&apos;s build something viral.
            </p>
          </motion.div>

          {/* Quick action buttons */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="flex flex-wrap justify-center gap-4 mb-14"
          >
            <button
              type="button"
              onClick={() => copyEmail(siteConfig.email)}
              className={`cta-btn group relative transition-all duration-300 ${
                copied
                  ? '!border-emerald-400/80 !bg-emerald-500/20 !text-emerald-300 shadow-[0_0_24px_rgba(52,211,153,0.35)]'
                  : ''
              }`}
              title={`Copy ${siteConfig.email}`}
            >
              {copied ? (
                <span className="flex items-center gap-1.5 font-mono text-xs text-emerald-300 font-medium">
                  <Check size={15} className="text-emerald-400" />
                  ✓ Copied {siteConfig.email}
                </span>
              ) : (
                <>
                  <Copy size={15} className="text-slate-300 group-hover:text-white transition-colors" />
                  <span>Copy Email</span>
                  <span className="font-mono text-xs sm:text-[11px] text-sky-400/90 font-light border-l border-white/10 pl-2 ml-1">
                    {siteConfig.email}
                  </span>
                </>
              )}
            </button>

            <a
              href={siteConfig.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="cta-btn !border-emerald-400/40 !text-emerald-400 hover:!bg-emerald-400/10 hover:!border-emerald-400/60"
            >
              <MessageCircle size={15} />
              Chat on WhatsApp
              <ArrowUpRight size={13} />
            </a>

            <a
              href={siteConfig.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="cta-btn hover:border-sky-400/40"
            >
              <Phone size={15} className="text-sky-400" />
              Book Discovery Call
              <ArrowUpRight size={13} />
            </a>
          </motion.div>

          {/* ── Contact Form ────────────────────────── */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="glass-card p-7 md:p-10"
          >
            <h3 className="text-white font-semibold text-lg mb-6">Send a Project Brief</h3>

            <form ref={formRef} onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {/* Name */}
              <div className="flex flex-col gap-1.5">
                <label className="text-xs text-slate-400 uppercase tracking-widest">Name</label>
                <input
                  type="text"
                  name="name"
                  required
                  placeholder="Your full name"
                  className="w-full bg-white/[0.04] border border-white/[0.08] rounded-xl px-4 py-3 text-sm text-white placeholder:text-slate-600 focus:outline-none focus:border-sky-400/40 focus:bg-sky-400/[0.03] transition-all"
                />
              </div>

              {/* Email */}
              <div className="flex flex-col gap-1.5">
                <label className="text-xs text-slate-400 uppercase tracking-widest">Email</label>
                <input
                  type="email"
                  name="email"
                  required
                  placeholder="you@company.com"
                  className="w-full bg-white/[0.04] border border-white/[0.08] rounded-xl px-4 py-3 text-sm text-white placeholder:text-slate-600 focus:outline-none focus:border-sky-400/40 focus:bg-sky-400/[0.03] transition-all"
                />
              </div>

              {/* Project type */}
              <div className="flex flex-col gap-1.5">
                <label className="text-xs text-slate-400 uppercase tracking-widest">Project Type</label>
                <select
                  name="projectType"
                  required
                  defaultValue=""
                  className="w-full bg-white/[0.04] border border-white/[0.08] rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-sky-400/40 transition-all appearance-none cursor-pointer"
                >
                  <option value="" disabled className="bg-[#08121E]">Select a category</option>
                  {siteConfig.projectTypes.map((t) => (
                    <option key={t} value={t} className="bg-[#08121E]">{t}</option>
                  ))}
                </select>
              </div>

              {/* Budget / Timeline */}
              <div className="flex flex-col gap-1.5">
                <label className="text-xs text-slate-400 uppercase tracking-widest">Estimated Budget / Timeline</label>
                <input
                  type="text"
                  name="budget"
                  placeholder="e.g. ₹25,000 · 2 weeks"
                  className="w-full bg-white/[0.04] border border-white/[0.08] rounded-xl px-4 py-3 text-sm text-white placeholder:text-slate-600 focus:outline-none focus:border-sky-400/40 focus:bg-sky-400/[0.03] transition-all"
                />
              </div>

              {/* Project brief — full width */}
              <div className="md:col-span-2 flex flex-col gap-1.5">
                <label className="text-xs text-slate-400 uppercase tracking-widest">
                  Project Brief / Footage Link
                </label>
                <textarea
                  name="brief"
                  required
                  rows={4}
                  placeholder="Describe your project, share a Drive/WeTransfer link to footage, or tell me your vision..."
                  className="w-full bg-white/[0.04] border border-white/[0.08] rounded-xl px-4 py-3 text-sm text-white placeholder:text-slate-600 focus:outline-none focus:border-sky-400/40 focus:bg-sky-400/[0.03] transition-all resize-none"
                />
              </div>

              {/* Submit */}
              <div className="md:col-span-2 flex flex-col sm:flex-row items-start sm:items-center gap-4">
                <button
                  type="submit"
                  disabled={formState === 'loading' || formState === 'success'}
                  className={`cta-btn !px-7 !py-3.5 !text-base disabled:opacity-60 disabled:cursor-not-allowed transition-all ${
                    formState === 'success'
                      ? '!border-emerald-400/80 !bg-emerald-500/20 !text-emerald-300'
                      : formState === 'error'
                      ? '!border-rose-400/80 !bg-rose-500/20 !text-rose-300'
                      : ''
                  }`}
                >
                  {formState === 'loading' && (
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                      className="w-4 h-4 border-2 border-sky-400/30 border-t-sky-400 rounded-full"
                    />
                  )}
                  {formState === 'success' && <Check size={16} className="text-emerald-400" />}
                  {formState === 'error' && <AlertCircle size={16} className="text-rose-400" />}
                  {formState === 'idle' && <ArrowUpRight size={16} />}
                  {formState === 'loading'
                    ? 'Sending Brief...'
                    : formState === 'success'
                    ? '✓ Brief Sent!'
                    : formState === 'error'
                    ? 'Failed to Send'
                    : 'Send Project Brief'}
                </button>

                {formState === 'success' ? (
                  <span className="text-xs sm:text-sm text-emerald-400 font-mono">
                    ✓ Brief sent successfully! Krunal will review and reply within 24 hours.
                  </span>
                ) : formState === 'error' ? (
                  <span className="text-xs sm:text-sm text-rose-400 font-mono">
                    Failed to send. Please reach out via WhatsApp (+91 9106431821) or reachoutkrunal@gmail.com.
                  </span>
                ) : (
                  <span className="text-xs text-slate-500 font-mono">I reply within 24 hours.</span>
                )}
              </div>
            </form>
          </motion.div>

          {/* Footer info row */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}
            className="mt-14 flex flex-col md:flex-row items-center justify-between gap-6 pt-8 border-t border-white/[0.06]"
          >
            <div className="text-center md:text-left">
              <div className="text-sm font-normal text-white uppercase tracking-widest">Krunal Khatri</div>
              <div className="font-mono text-[11px] text-slate-400 mt-0.5">Video Editor · After Motion &amp; Gold Motion</div>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-2.5 sm:gap-3">
              {siteConfig.socials.map((social) => (
                <a
                  key={social.platform}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/[0.03] border border-white/[0.08] text-xs text-slate-400 hover:text-white hover:border-sky-400/40 hover:bg-white/[0.06] transition-all font-mono group"
                >
                  <span className="text-slate-400 group-hover:text-sky-400 transition-colors">
                    <SocialIcon platform={social.platform} />
                  </span>
                  <span>{social.platform}</span>
                </a>
              ))}
            </div>

            <div className="text-xs text-slate-600 font-mono">
              © {new Date().getFullYear()} Krunal Khatri. All rights reserved.
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}

