'use client';

import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Film } from 'lucide-react';
import { projects, ProjectCategory, Project } from '../data/portfolioData';
import {
  getYouTubeId,
  getYouTubeThumbnail,
  getGoogleDriveId,
  getGoogleDriveThumbnail,
  getInstagramShortcode,
  getVideoFrameUrl,
} from '../utils/videoUtils';
import VideoModal from './VideoModal';

const categories: ProjectCategory[] = [
  'All',
  'Talking Head',
  'Motion Graphic',
  'YouTube',
  'Instagram',
];

interface ProjectCardProps {
  project: Project;
  onClick: () => void;
  index: number;
}

function ProjectCard({ project, onClick, index }: ProjectCardProps) {
  const [hovered, setHovered] = useState(false);
  const [imgError, setImgError] = useState(false);
  const [ytQuality, setYtQuality] = useState<'max' | 'hq'>('max');
  const videoRef = useRef<HTMLVideoElement>(null);

  const videoSrc = project.videoUrl || project.fullVideo || project.previewVideo || '';
  const ytId = getYouTubeId(videoSrc);
  const isYouTube = Boolean(ytId);
  const driveId = getGoogleDriveId(videoSrc);
  const isDrive = Boolean(driveId);
  const instaShortcode =
    getInstagramShortcode(videoSrc) || (project.sourceUrl ? getInstagramShortcode(project.sourceUrl) : null);
  const isInstagram = Boolean(instaShortcode) || project.category === 'Instagram';
  const isEmbed = isYouTube || isDrive || (Boolean(project.embedUrl) && !videoSrc.endsWith('.mp4'));
  const isVertical = project.aspectRatio === '9:16' || project.orientation === 'portrait';

  // Resolve thumbnail:
  // 1. Explicit thumbnail (if non-empty string)
  // 2. YouTube auto-thumbnail (if YouTube link)
  // 3. Google Drive auto-thumbnail (if Google Drive link)
  // 4. Otherwise empty string -> browser video frame #t=0.5
  const hasCustomThumb = Boolean(project.thumbnail && project.thumbnail.trim() !== '');
  const ytThumb = isYouTube && ytId ? getYouTubeThumbnail(ytId, ytQuality) : '';
  const driveThumb = isDrive && driveId ? getGoogleDriveThumbnail(driveId) : '';
  const effectiveThumb = hasCustomThumb ? project.thumbnail!.trim() : ytThumb || driveThumb;

  // If no image thumbnail and it is a native video, use video frame URL
  const videoFrameUrl = !effectiveThumb && !isEmbed ? getVideoFrameUrl(videoSrc) : '';

  const handleMouseEnter = () => {
    setHovered(true);
    if (!isEmbed && videoRef.current) {
      videoRef.current.play().catch(() => {});
    }
  };

  const handleMouseLeave = () => {
    setHovered(false);
    if (!isEmbed && videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
  };

  const handleImgError = () => {
    // If YouTube maxres fails, try hqdefault fallback
    if (isYouTube && ytQuality === 'max') {
      setYtQuality('hq');
    } else {
      setImgError(true);
    }
  };

  const metricText =
    project.metrics ||
    (project.metric ? `${project.metric} ${project.metricLabel || ''}`.trim() : '');

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.5, delay: index * 0.06, ease: [0.22, 1, 0.36, 1] }}
      className="glass-card glass-card-hover cursor-pointer overflow-hidden group flex flex-col h-full border border-white/10"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
    >
      {/* Standardized 16:9 Aspect Ratio container — guarantees zero layout gaps */}
      <div className="relative w-full overflow-hidden bg-[#050C16] aspect-video">
        {imgError ? (
          /* Sleek Dark-Mode Glassmorphic Motion Graphic Cover Fallback */
          <div className="absolute inset-0 bg-gradient-to-br from-[#0B1524] via-[#04070B] to-[#0A1A2F] flex flex-col items-center justify-center p-4 select-none overflow-hidden">
            {/* Subtle architectural dot grid */}
            <div
              className="absolute inset-0 opacity-20 pointer-events-none"
              style={{
                backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(255,255,255,0.2) 1px, transparent 0)',
                backgroundSize: '20px 20px',
              }}
            />
            {/* Cyan radial glow */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_35%,rgba(56,189,248,0.14),transparent_65%)] pointer-events-none" />

            {/* Glowing circular play button */}
            <div className="relative z-10 w-12 h-12 rounded-full bg-sky-400/10 border border-sky-400/30 flex items-center justify-center mb-2.5 shadow-[0_0_20px_rgba(56,189,248,0.25)] group-hover:scale-110 group-hover:border-sky-400 group-hover:shadow-[0_0_28px_rgba(56,189,248,0.45)] transition-all duration-300">
              <Play size={18} fill="#38bdf8" className="text-sky-400 ml-0.5" />
            </div>

            <span className="relative z-10 font-mono text-[10px] tracking-widest text-sky-400 uppercase font-medium mb-1">
              {project.category} · In-Site Player
            </span>
            <span className="relative z-10 text-xs font-light text-slate-200 text-center tracking-tight line-clamp-1 max-w-[90%] group-hover:text-white transition-colors">
              {project.title}
            </span>
          </div>
        ) : effectiveThumb ? (
          /* Explicit Extracted Thumbnail, YouTube Auto-Thumbnail, or Drive Cover */
          <img
            src={effectiveThumb}
            alt={project.title}
            loading="lazy"
            decoding="async"
            width={640}
            height={360}
            onError={handleImgError}
            className={`absolute inset-0 w-full h-full object-cover transition-all duration-500 ${
              hovered && !isEmbed && videoSrc ? 'scale-105 opacity-0' : 'scale-100 opacity-100 group-hover:scale-105'
            }`}
          />
        ) : (
          /* Auto-Thumbnail via #t=3.5 video frame (Browser native video poster frame) */
          <video
            src={videoFrameUrl}
            preload="metadata"
            playsInline
            muted
            onLoadedMetadata={(e) => {
              try {
                e.currentTarget.currentTime = 3.5;
              } catch (_) {}
            }}
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${
              hovered && !isEmbed ? 'opacity-0' : 'opacity-100'
            }`}
          />
        )}

        {/* Hover muted preview video for native MP4 / local files */}
        {!isEmbed && videoSrc && (
          <video
            ref={videoRef}
            src={videoSrc}
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${
              hovered ? 'opacity-100' : 'opacity-0'
            }`}
            muted
            loop
            playsInline
            preload="none"
          />
        )}

        {/* Cinematic Gradient Vignette */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#04070B] via-black/20 to-transparent pointer-events-none" />

        {/* Badges row: Category + Aspect ratio indicator */}
        <div className="absolute top-3 left-3 z-10 flex items-center gap-1.5 flex-wrap">
          <span className="pill-badge !text-[10px] !px-2.5 !py-1 !bg-black/60 !backdrop-blur-md">
            <span className="pill-dot !w-1.5 !h-1.5" />
            <span className="font-mono">{project.category}</span>
          </span>
          {isVertical && (
            <span className="pill-badge !text-[9px] !px-2 !py-0.5 !bg-purple-950/70 !text-purple-300 !border-purple-500/30 font-mono">
              9:16
            </span>
          )}
          {isYouTube && (
            <span className="pill-badge !text-[9px] !px-2 !py-0.5 !bg-red-950/70 !text-red-300 !border-red-500/30 font-mono">
              YouTube
            </span>
          )}
          {isDrive && (
            <span className="pill-badge !text-[9px] !px-2 !py-0.5 !bg-sky-950/70 !text-sky-300 !border-sky-500/30 font-mono">
              Drive
            </span>
          )}
          {isInstagram && (
            <span className="pill-badge !text-[9px] !px-2 !py-0.5 !bg-pink-950/70 !text-pink-300 !border-pink-500/30 font-mono">
              Reel
            </span>
          )}
        </div>

        {/* Centered Glowing Play Button Overlay */}
        <div className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none">
          <div className="w-12 h-12 rounded-full bg-black/50 backdrop-blur-md border border-white/20 flex items-center justify-center shadow-[0_0_24px_rgba(56,189,248,0.25)] group-hover:scale-110 group-hover:bg-sky-400/25 group-hover:border-sky-400 group-hover:shadow-[0_0_32px_rgba(56,189,248,0.45)] transition-all duration-300">
            <Play size={18} fill="white" className="text-white ml-0.5" />
          </div>
        </div>

        {/* Impact Metric Badge */}
        {metricText && (
          <div className="absolute bottom-3 right-3 z-10 glass-card !rounded-lg px-2.5 py-1 !bg-black/70 !border-white/10">
            <div className="font-mono text-sky-400 font-medium text-xs leading-tight">{metricText}</div>
          </div>
        )}
      </div>

      {/* Project Card Content Footer */}
      <div className="p-4 flex flex-col flex-1 justify-between">
        <div>
          <div className="font-mono text-[10px] text-slate-400 uppercase tracking-wider mb-1 flex items-center justify-between">
            <span>{project.client || 'Client Project'}</span>
            {project.year && <span>{project.year}</span>}
          </div>
          <h3 className="text-white font-normal text-sm leading-snug group-hover:text-sky-300 transition-colors">
            {project.title}
          </h3>
          {project.description && (
            <p className="text-slate-400 text-xs font-light mt-1.5 line-clamp-2 leading-relaxed">
              {project.description}
            </p>
          )}
        </div>

        {project.tags && project.tags.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mt-3 pt-3 border-t border-white/[0.06]">
            {project.tags.map((tag, tagIdx) => (
              <span
                key={`${project.id || 'proj'}-${tag}-${tagIdx}`}
                className="font-mono text-[9px] px-2 py-0.5 rounded-full border border-white/[0.08] bg-white/[0.03] text-slate-400"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>
    </motion.div>
  );
}

export default function ProjectGrid() {
  const [activeCategory, setActiveCategory] = useState<ProjectCategory>('All');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const filtered =
    activeCategory === 'All'
      ? projects
      : projects.filter((p) => p.category === activeCategory);

  return (
    <section id="work" className="relative py-24 px-5 md:px-8" style={{ backgroundColor: '#08121E' }}>
      {/* Top Hairline Glow */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-sky-400/20 to-transparent" />

      <div className="max-w-[1300px] mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-10"
        >
          <span className="font-mono text-xs tracking-widest uppercase text-sky-400 block mb-3">
            Selected Work
          </span>
          <h2 className="text-3xl sm:text-5xl md:text-6xl font-light tracking-[-0.03em] text-white">
            Crafted with <span className="text-slate-400 font-light">intention</span>
          </h2>
          <p className="font-mono text-xs sm:text-sm tracking-wider text-slate-400 mt-3 max-w-lg mx-auto">
            A curated showcase of edits that drove real results — from viral reels to cinematic brand films
          </p>
        </motion.div>

        {/* The 5 Filter Pills */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.15 }}
          className="flex flex-wrap items-center justify-center gap-2 sm:gap-2.5 mb-12"
        >
          {categories.map((cat) => {
            const active = activeCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 rounded-full font-mono text-xs uppercase tracking-wider transition-all duration-300 flex items-center gap-2 ${
                  active
                    ? 'bg-sky-400/15 border border-sky-400/50 text-sky-300 shadow-[0_0_15px_rgba(56,189,248,0.2)]'
                    : 'bg-white/[0.03] border border-white/10 text-slate-400 hover:text-white hover:border-white/20'
                }`}
              >
                {active && <span className="w-1.5 h-1.5 rounded-full bg-sky-400 shadow-[0_0_6px_#38bdf8]" />}
                {cat}
              </button>
            );
          })}
        </motion.div>

        {/* Project Grid */}
        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
          <AnimatePresence>
            {filtered.map((project, i) => (
              <ProjectCard
                key={project.id || `proj-${i}`}
                project={project}
                index={i}
                onClick={() => setSelectedProject(project)}
              />
            ))}
          </AnimatePresence>
        </motion.div>

        {filtered.length === 0 && (
          <div className="text-center py-20 font-mono text-sm text-slate-500">
            No projects in this category yet.
          </div>
        )}
      </div>

      {/* Bottom Hairline Glow */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-sky-400/10 to-transparent" />

      {/* Fullscreen Video Theatre Modal */}
      {selectedProject && (
        <VideoModal
          isOpen={Boolean(selectedProject)}
          onClose={() => setSelectedProject(null)}
          videoSrc={selectedProject.videoUrl || selectedProject.fullVideo || selectedProject.previewVideo || ''}
          sourceUrl={selectedProject.sourceUrl}
          embedUrl={selectedProject.embedUrl}
          category={selectedProject.category}
          title={selectedProject.title}
          client={selectedProject.client}
          description={selectedProject.description}
          tags={selectedProject.tags}
          aspectRatio={selectedProject.aspectRatio || (selectedProject.orientation === 'portrait' ? '9:16' : '16:9')}
        />
      )}
    </section>
  );
}
