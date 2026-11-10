// ============================================================
// VIDEO UTILITIES — Smart Auto-Detection for Next.js Portfolio
// ============================================================

/**
 * Extracts the 11-character YouTube video ID from various URL formats:
 * - https://www.youtube.com/watch?v=VIDEO_ID
 * - https://youtu.be/VIDEO_ID
 * - https://www.youtube.com/shorts/VIDEO_ID
 * - https://www.youtube.com/embed/VIDEO_ID
 * - https://m.youtube.com/watch?v=VIDEO_ID
 */
export function getYouTubeId(url: string): string | null {
  if (!url || typeof url !== 'string') return null;
  const trimmed = url.trim();
  const regExp =
    /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?|shorts)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/i;
  const match = trimmed.match(regExp);
  return match && match[1] ? match[1] : null;
}

/**
 * Checks if a URL points to a YouTube video
 */
export function isYouTubeUrl(url: string): boolean {
  return Boolean(getYouTubeId(url));
}

/**
 * Extracts Google Drive file ID from various Drive URL formats:
 * - https://drive.google.com/file/d/FILE_ID/view...
 * - https://drive.google.com/file/d/FILE_ID/...
 * - https://drive.google.com/open?id=FILE_ID
 * - https://drive.google.com/uc?id=FILE_ID
 */
export function getGoogleDriveId(url: string): string | null {
  if (!url || typeof url !== 'string') return null;
  const trimmed = url.trim();
  const fileDMatch = trimmed.match(/drive\.google\.com\/file\/d\/([a-zA-Z0-9_-]+)/i);
  if (fileDMatch && fileDMatch[1]) return fileDMatch[1];
  const queryMatch = trimmed.match(/drive\.google\.com\/.*[?&]id=([a-zA-Z0-9_-]+)/i);
  if (queryMatch && queryMatch[1]) return queryMatch[1];
  return null;
}

/**
 * Checks if a URL points to a Google Drive file
 */
export function isGoogleDriveUrl(url: string): boolean {
  return Boolean(getGoogleDriveId(url));
}

/**
 * Generates Google Drive in-site preview embed URL
 */
export function getGoogleDriveEmbedUrl(urlOrId: string): string {
  const id = getGoogleDriveId(urlOrId) || urlOrId;
  return `https://drive.google.com/file/d/${id}/preview`;
}

/**
 * Generates Google Drive thumbnail URL
 */
export function getGoogleDriveThumbnail(urlOrId: string, width: number = 1200): string {
  const id = getGoogleDriveId(urlOrId) || urlOrId;
  return `https://drive.google.com/thumbnail?id=${id}&sz=w${width}`;
}

/**
 * Generates high-res YouTube thumbnail URL with fallback
 */
export function getYouTubeThumbnail(videoId: string, quality: 'max' | 'hq' = 'max'): string {
  if (quality === 'max') {
    return `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;
  }
  return `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;
}

/**
 * Generates clean YouTube embed URL with autoplay, modest branding, and loop prevention
 */
export function getYouTubeEmbedUrl(videoId: string, autoplay: boolean = true): string {
  return `https://www.youtube.com/embed/${videoId}?autoplay=${
    autoplay ? 1 : 0
  }&rel=0&modestbranding=1&playsinline=1&enablejsapi=1`;
}

/**
 * Resolves the effective thumbnail URL for a project.
 * 1. If custom thumbnail provided and not empty, returns it.
 * 2. If it's a YouTube URL and thumbnail is empty, returns YouTube maxresdefault.
 * 3. If direct .mp4 and thumbnail is empty, returns empty string so component can use #t=0.5 video frame.
 */
export function getEffectiveThumbnail(videoUrl: string, thumbnail?: string): string {
  if (thumbnail && thumbnail.trim() !== '') {
    return thumbnail.trim();
  }
  const ytId = getYouTubeId(videoUrl);
  if (ytId) {
    return getYouTubeThumbnail(ytId, 'max');
  }
  const driveId = getGoogleDriveId(videoUrl);
  if (driveId) {
    return getGoogleDriveThumbnail(driveId);
  }
  return '';
}

/**
 * Extracts Instagram Reel shortcode from various URL formats:
 * - https://www.instagram.com/reel/SHORTCODE/
 * - https://www.instagram.com/reel/SHORTCODE/?...
 * - https://www.instagram.com/p/SHORTCODE/
 */
export function getInstagramShortcode(url: string): string | null {
  if (!url || typeof url !== 'string') return null;
  const trimmed = url.trim();
  const match = trimmed.match(/instagram\.com\/(?:reel|p)\/([A-Za-z0-9_-]+)/i);
  return match && match[1] ? match[1] : null;
}

/**
 * Checks if a URL points to an Instagram post/reel
 */
export function isInstagramUrl(url: string): boolean {
  return Boolean(getInstagramShortcode(url));
}

/**
 * Generates Instagram reel embed URL
 */
export function getInstagramEmbedUrl(shortcodeOrUrl: string): string {
  const shortcode = getInstagramShortcode(shortcodeOrUrl) || shortcodeOrUrl;
  return `https://www.instagram.com/reel/${shortcode}/embed/`;
}

/**
 * Formats a direct .mp4 or local video URL to auto-capture the 3.5s mid-action frame as poster
 */
export function getVideoFrameUrl(videoUrl: string): string {
  if (!videoUrl) return '';
  if (isYouTubeUrl(videoUrl) || isGoogleDriveUrl(videoUrl) || isInstagramUrl(videoUrl)) return videoUrl;
  if (videoUrl.includes('#t=')) return videoUrl;
  return `${videoUrl}#t=3.5`;
}

