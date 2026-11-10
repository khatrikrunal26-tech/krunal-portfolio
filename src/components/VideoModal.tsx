'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ExternalLink, Maximize2 } from 'lucide-react';
import {
  getYouTubeId,
  getYouTubeEmbedUrl,
  getGoogleDriveId,
  getGoogleDriveEmbedUrl,
  getInstagramShortcode,
  getInstagramEmbedUrl,
} from '../utils/videoUtils';

interface VideoModalProps {
  isOpen: boolean;
  onClose: () => void;
  videoSrc: string;
  sourceUrl?: string;
  embedUrl?: string;
  category?: string;
  title: string;
  client?: string;
  description?: string;
  tags?: string[];
  aspectRatio?: '16:9' | '9:16';
}

// Map known Google Drive IDs to potential local downloaded .mp4 files
const DRIVE_LOCAL_MAP: Record<string, string> = {
  '1lxMMedosRBBANjlHM9rIB6GG7WIdRLU7': '/videos/deepseek-harness.mp4',
  '1nLA159A9ItiBv_XBXA2UEcXoKhphBH18': '/videos/grok-motion.mp4',
  '1Zz-9vRs_HjeBL3pUkzc8XxVNH91zsCn5': '/videos/google-drive-motion.mp4',
  '1k14EV-zqKHMFKbjwCQbGfYpPLnhGY7PN': '/videos/talking-head-2.mp4',
  '13WRr6o9t4AgLFk8WvtWoIj7YuFfjMJhU': '/videos/talking-head-creator.mp4',
  '1nM_Vw5mIbcjNoAwZRqkxkucWBGtgoLnJ': '/videos/showreel.mp4',
};

export default function VideoModal({
  isOpen,
  onClose,
  videoSrc,
  sourceUrl,
  embedUrl,
  category,
  title,
  client,
  description,
  tags,
  aspectRatio = '16:9',
}: VideoModalProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [effectiveAspect, setEffectiveAspect] = useState<'16:9' | '9:16'>(aspectRatio);
  const [localVideoFound, setLocalVideoFound] = useState<string | null>(null);

  const ytId = getYouTubeId(videoSrc);
  const isYouTube = Boolean(ytId);
  const driveId = getGoogleDriveId(videoSrc);
  const isGoogleDrive = Boolean(driveId) && !localVideoFound;
  const instaShortcode =
    getInstagramShortcode(videoSrc) || (sourceUrl ? getInstagramShortcode(sourceUrl) : null);
  const isInstagram = Boolean(instaShortcode) || category === 'Instagram';

  // Check if a local .mp4 exists for Google Drive links
  useEffect(() => {
    if (!isOpen) {
      setLocalVideoFound(null);
      return;
    }

    if (videoSrc.endsWith('.mp4')) {
      setLocalVideoFound(videoSrc);
      return;
    }

    if (driveId && DRIVE_LOCAL_MAP[driveId]) {
      const candidate = DRIVE_LOCAL_MAP[driveId];
      fetch(candidate, { method: 'HEAD' })
        .then((res) => {
          if (res.ok) {
            setLocalVideoFound(candidate);
          } else {
            setLocalVideoFound(null);
          }
        })
        .catch(() => setLocalVideoFound(null));
    } else {
      setLocalVideoFound(null);
    }
  }, [isOpen, videoSrc, driveId]);

  // Is this an iframe embed or a direct playable video?
  const isIframeEmbed =
    !localVideoFound && (isYouTube || isGoogleDrive || (Boolean(embedUrl) && !videoSrc.endsWith('.mp4')));

  // Sync aspect ratio prop
  useEffect(() => {
    setEffectiveAspect(aspectRatio);
  }, [aspectRatio, videoSrc]);

  const isVertical = effectiveAspect === '9:16';

  // Lock body scroll
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      if (!isIframeEmbed) {
        setTimeout(() => videoRef.current?.play().catch(() => {}), 300);
      }
    } else {
      document.body.style.overflow = '';
      if (!isIframeEmbed) {
        videoRef.current?.pause();
      }
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen, isIframeEmbed]);

  // Escape key handler
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onClose]);

  const externalUrl =
    sourceUrl ||
    (isYouTube && ytId
      ? `https://www.youtube.com/watch?v=${ytId}`
      : driveId
      ? `https://drive.google.com/file/d/${driveId}/view`
      : instaShortcode
      ? `https://www.instagram.com/reel/${instaShortcode}/`
      : videoSrc);

  const actionLabel = driveId
    ? 'Open in Drive'
    : isYouTube
    ? 'Open on YouTube'
    : isInstagram
    ? 'View on Instagram'
    : 'Open Source';

  // Resolve the embed iframe src for Instagram fallback
  const resolvedInstaEmbed =
    embedUrl || (instaShortcode ? getInstagramEmbedUrl(instaShortcode) : '');

  const activeVideoSrc = localVideoFound || videoSrc;

  // Programmatic Fullscreen Trigger Helper
  const handleFullscreen = () => {
    const targetId = isVertical ? 'video-modal-iframe-vertical' : 'video-modal-iframe';
    const el = document.getElementById(targetId);
    if (el) {
      if (el.requestFullscreen) {
        el.requestFullscreen();
      } else if ((el as any).webkitEnterFullscreen) {
        (el as any).webkitEnterFullscreen();
      } else if ((el as any).webkitRequestFullscreen) {
        (el as any).webkitRequestFullscreen();
      } else if ((el as any).mozRequestFullScreen) {
        (el as any).mozRequestFullScreen();
      } else if ((el as any).msRequestFullscreen) {
        (el as any).msRequestFullscreen();
      }
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md overflow-y-auto"
          onClick={onClose}
        >
          {/* Modal Content Wrapper — Responsive viewport sizing */}
          <motion.div
            initial={{ scale: 0.95, opacity: 0, y: 12 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: 10 }}
            transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
            className={`relative w-full mx-auto my-auto flex flex-col flex-shrink-0 ${
              isVertical
                ? 'max-w-[320px] xs:max-w-[340px] sm:max-w-[380px]'
                : 'max-w-[95vw] sm:max-w-3xl md:max-w-4xl'
            }`}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header Bar — Dedicated Safe Area Above Video */}
            <div className="flex items-center justify-between pb-2.5 px-0.5 w-full flex-shrink-0">
              <div className="flex items-center gap-2 flex-wrap min-w-0">
                {client && (
                  <span className="text-xs text-sky-400 font-semibold uppercase tracking-wider font-mono truncate max-w-[140px] sm:max-w-none">
                    {client}
                  </span>
                )}
                {driveId && (
                  <span className="font-mono text-[9px] px-2 py-0.5 rounded-full bg-sky-500/20 text-sky-300 border border-sky-500/30">
                    {localVideoFound ? 'Local HD' : 'Google Drive'}
                  </span>
                )}
                {isYouTube && (
                  <span className="font-mono text-[9px] px-2 py-0.5 rounded-full bg-red-500/20 text-red-300 border border-red-500/30">
                    YouTube
                  </span>
                )}
                {isInstagram && (
                  <span className="font-mono text-[9px] px-2 py-0.5 rounded-full bg-pink-500/20 text-pink-300 border border-pink-500/30">
                    Instagram
                  </span>
                )}
                {isVertical && (
                  <span className="font-mono text-[9px] px-2 py-0.5 rounded-full bg-purple-500/20 text-purple-300 border border-purple-500/30">
                    9:16 Vertical
                  </span>
                )}
              </div>

              {/* Top Safe Close Button */}
              <button
                onClick={onClose}
                className="text-white/80 hover:text-white bg-white/10 hover:bg-white/20 active:scale-95 rounded-full p-1.5 sm:p-2 border border-white/20 transition-all shadow-lg flex items-center justify-center cursor-pointer flex-shrink-0 ml-2"
                aria-label="Close modal"
              >
                <X size={18} />
              </button>
            </div>

            {/* Video Container Frame — Standardized 16:9 / 9:16 Non-Collapsing Scaling */}
            {isVertical ? (
              /* Vertical (9:16) Container for Talking Head & Reels */
              <div className="relative w-full max-w-[320px] xs:max-w-[340px] sm:max-w-[380px] h-[70vh] max-h-[640px] mx-auto bg-black rounded-2xl overflow-hidden border border-white/10 shadow-2xl flex flex-col items-center justify-center">
                {isGoogleDrive && driveId ? (
                  <iframe
                    id="video-modal-iframe-vertical"
                    src={getGoogleDriveEmbedUrl(driveId)}
                    className="w-full h-full border-0"
                    allow="autoplay; encrypted-media; fullscreen; picture-in-picture"
                    allowFullScreen
                    title={title}
                  />
                ) : isYouTube && ytId ? (
                  <iframe
                    id="video-modal-iframe-vertical"
                    src={getYouTubeEmbedUrl(ytId, true)}
                    className="w-full h-full border-0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                    title={title}
                  />
                ) : isIframeEmbed && isInstagram && resolvedInstaEmbed ? (
                  <iframe
                    id="video-modal-iframe-vertical"
                    src={resolvedInstaEmbed}
                    className="w-full h-full border-0"
                    allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
                    allowFullScreen
                    title={title}
                    scrolling="no"
                  />
                ) : (
                  <video
                    id="video-modal-iframe-vertical"
                    ref={videoRef}
                    src={activeVideoSrc}
                    className="w-full h-full object-contain border-0 bg-black"
                    controls
                    playsInline
                    autoPlay
                    preload="metadata"
                    onLoadedMetadata={(e) => {
                      const v = e.currentTarget;
                      if (v.videoWidth && v.videoHeight) {
                        setEffectiveAspect(v.videoHeight > v.videoWidth ? '9:16' : '16:9');
                      }
                    }}
                  />
                )}
              </div>
            ) : (
              /* Widescreen (16:9) Container for Motion Graphics & YouTube */
              <div className="relative w-full max-w-[95vw] sm:max-w-3xl md:max-w-4xl mx-auto h-[260px] xs:h-[300px] sm:h-[400px] md:h-[480px] bg-black rounded-xl overflow-hidden border border-white/10 shadow-2xl flex items-center justify-center">
                {isGoogleDrive && driveId ? (
                  <iframe
                    id="video-modal-iframe"
                    src={getGoogleDriveEmbedUrl(driveId)}
                    className="w-full h-full border-0 absolute inset-0"
                    allow="autoplay; encrypted-media; fullscreen; picture-in-picture"
                    allowFullScreen
                    loading="eager"
                    title={title}
                  />
                ) : isYouTube && ytId ? (
                  <iframe
                    id="video-modal-iframe"
                    src={getYouTubeEmbedUrl(ytId, true)}
                    className="w-full h-full border-0 absolute inset-0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                    title={title}
                  />
                ) : isIframeEmbed && isInstagram && resolvedInstaEmbed ? (
                  <iframe
                    id="video-modal-iframe"
                    src={resolvedInstaEmbed}
                    className="w-full h-full border-0 absolute inset-0"
                    allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
                    allowFullScreen
                    title={title}
                    scrolling="no"
                  />
                ) : (
                  <video
                    id="video-modal-iframe"
                    ref={videoRef}
                    src={activeVideoSrc}
                    className="w-full h-full object-contain border-0 bg-black"
                    controls
                    playsInline
                    autoPlay
                    preload="metadata"
                    onLoadedMetadata={(e) => {
                      const v = e.currentTarget;
                      if (v.videoWidth && v.videoHeight) {
                        setEffectiveAspect(v.videoHeight > v.videoWidth ? '9:16' : '16:9');
                      }
                    }}
                  />
                )}
              </div>
            )}

            {/* Dedicated Fullscreen Trigger Button directly below video container */}
            <button
              type="button"
              onClick={handleFullscreen}
              className="flex items-center justify-center gap-2 px-4 py-2 mt-2 text-xs font-medium text-white bg-white/10 hover:bg-white/20 border border-white/15 rounded-lg transition-colors mx-auto cursor-pointer"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 8V4m0 0h4M4 4l5 5m11-5h-4m4 0v4m0-4l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4"
                />
              </svg>
              Watch in Fullscreen
            </button>

            {/* Project Details Footer */}
            <div className="mt-2.5 w-full rounded-xl bg-[#04070B]/95 border border-white/10 p-3.5 sm:p-4 shadow-2xl backdrop-blur-md flex flex-col md:flex-row md:items-start justify-between gap-3 flex-shrink-0">
              <div className="flex-1 min-w-0">
                <h3 className="text-white text-sm sm:text-base font-medium leading-snug">{title}</h3>
                {description && (
                  <p className="text-slate-400 text-xs sm:text-sm mt-1 leading-relaxed font-light line-clamp-2">
                    {description}
                  </p>
                )}

                {tags && tags.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 mt-2">
                    {tags.map((tag) => (
                      <span key={tag} className="pill-badge !text-[9px] !py-0.5 !px-2">
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              {/* Action Buttons (External Source, Fullscreen & Bottom Close Button) */}
              <div className="flex items-center gap-2 flex-shrink-0 pt-1 md:pt-0 flex-wrap sm:flex-nowrap">
                <button
                  type="button"
                  onClick={handleFullscreen}
                  className="pill-badge hover:border-sky-400/40 text-slate-300 hover:text-white transition-colors !text-xs !py-1.5 !px-3 flex items-center gap-1.5 cursor-pointer"
                  aria-label="Fullscreen"
                >
                  <Maximize2 size={12} />
                  <span>Fullscreen ⛶</span>
                </button>

                <a
                  href={externalUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="pill-badge hover:border-sky-400/40 hover:text-white transition-colors !text-xs !py-1.5 !px-3 flex items-center gap-1.5"
                >
                  <ExternalLink size={12} />
                  {actionLabel}
                </a>

                {/* Convenient Mobile-Friendly Close Button */}
                <button
                  onClick={onClose}
                  className="pill-badge hover:border-white/30 text-slate-300 hover:text-white transition-colors !text-xs !py-1.5 !px-3 flex items-center gap-1 cursor-pointer"
                  aria-label="Close modal"
                >
                  <X size={13} />
                  <span>Close</span>
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
