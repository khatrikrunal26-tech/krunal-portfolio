// ============================================================================
// PORTFOLIO DATA — KRUNAL KHATRI (VIDEO EDITOR & MOTION DESIGNER)
// ============================================================================
//
// 📖 HOW TO ADD OR UPDATE VIDEO PROJECTS:
// ────────────────────────────────────────────────────────────────────────────
// 1. CHOOSE YOUR VIDEO SOURCE:
//    • Local Video: Put your .mp4 in the folder `public/videos/my-video.mp4`
//      and set: `videoUrl: "/videos/my-video.mp4"`
//    • YouTube: Paste any YouTube link (watch, youtu.be, or Shorts):
//      `videoUrl: "https://www.youtube.com/watch?v=..."` or `"https://youtu.be/..."`
//    • Google Drive: Paste the share link:
//      `videoUrl: "https://drive.google.com/file/d/.../view?usp=drive_link"`
//    • Instagram Reel: Paste the reel URL:
//      `videoUrl: "https://www.instagram.com/reel/SHORTCODE/"`
//
// 2. CHOOSE YOUR THUMBNAIL:
//    • Automatic (Recommended): Leave `thumbnail: ""` empty!
//      - If it's a YouTube video, it automatically fetches the YouTube cover.
//      - If it's a local/direct .mp4, it automatically captures the frame at 0.5s!
//    • Custom Image: Put an image in `public/thumbnails/cover.jpg`
//      and set: `thumbnail: "/thumbnails/cover.jpg"` (or paste any image URL).
//
// 3. SET THE ASPECT RATIO:
//    • Use `"16:9"` for standard widescreen / YouTube long-form videos.
//    • Use `"9:16"` for vertical Instagram Reels, TikToks, or YouTube Shorts.
//      (The theatre player automatically sizes itself to fit vertical screens!)
//
// 4. CHOOSE A CATEGORY (Must be one of these 4 exact names):
//    • "Talking Head"
//    • "Motion Graphic"
//    • "YouTube"
//    • "Instagram"
// ============================================================================

export type ProjectCategory =
  | 'All'
  | 'Talking Head'
  | 'Motion Graphic'
  | 'YouTube'
  | 'Instagram';

export interface Project {
  id: string;
  title: string;
  client?: string;
  category: 'Talking Head' | 'Motion Graphic' | 'YouTube' | 'Instagram';
  aspectRatio?: '16:9' | '9:16';
  videoUrl: string; // Local path "/videos/*.mp4", YouTube link, Drive link, or Instagram reel URL
  embedUrl?: string; // Optional explicit embed URL (used for Instagram reels)
  sourceUrl?: string; // Original external URL (Instagram, YouTube, Drive)
  thumbnail?: string; // Leave "" for automatic frame/YouTube cover, or path in "/thumbnails/..."
  tags: string[];
  metrics?: string; // e.g. "94% Retention", "1.8M+ Views", "60FPS Render"
  description?: string;
  year?: number;
  // Backward compatibility aliases:
  metric?: string;
  metricLabel?: string;
  previewVideo?: string;
  fullVideo?: string;
  orientation?: 'landscape' | 'portrait';
}

export interface WorkflowPhase {
  id: string;
  phase: string;
  title: string;
  color: string;
  glowColor: string;
  nodes: string[];
}

export interface ToolItem {
  name: string;
  category: string;
  description: string;
  badge: string;
  highlight: string;
}

export interface SocialLink {
  platform: string;
  url: string;
  handle: string;
}

export interface ShowreelConfig {
  title: string;
  videoUrl: string;
  embedUrl: string;
  duration: string;
  aspectRatio: '16:9' | '9:16';
}

// ─── OFFICIAL 2026 SHOWREEL ──────────────────────────────────────────────────
export const showreel: ShowreelConfig = {
  title: 'Official 2026 Showreel',
  videoUrl: 'https://drive.google.com/file/d/1nM_Vw5mIbcjNoAwZRqkxkucWBGtgoLnJ/view?usp=drive_link',
  embedUrl: 'https://drive.google.com/file/d/1nM_Vw5mIbcjNoAwZRqkxkucWBGtgoLnJ/preview',
  duration: '01:42',
  aspectRatio: '16:9',
};

// ─── SELECTED WORK PROJECTS (10 Total) ───────────────────────────────────────
export const projects: Project[] = [
  // ── 1. TALKING HEAD (2 videos) ─────────────────────────────
  {
    id: 'th-creator-2',
    title: 'Talking Head — Dynamic Pacing Edit',
    client: 'Creator Studio',
    category: 'Talking Head',
    aspectRatio: '9:16',
    videoUrl:
      'https://drive.google.com/file/d/1k14EV-zqKHMFKbjwCQbGfYpPLnhGY7PN/view?usp=drive_link',
    thumbnail: '/thumbnails/talking-head-thumb.png',
    tags: ['Talking Head', 'After Motion', 'Retention Pacing'],
    metrics: '94% Retention',
    description:
      'Vertical 9:16 talking head masterclass with velocity curve punch-ins, kinetic sound design, and retention-focused pacing.',
    year: 2026,
  },
  {
    id: 'th-agency-growth',
    title: 'Agency Growth — Studio Talking Head Edit',
    client: 'Creator Studio',
    category: 'Talking Head',
    aspectRatio: '16:9',
    videoUrl: '/videos/talking-head-creator.mp4',
    sourceUrl:
      'https://drive.google.com/file/d/13WRr6o9t4AgLFk8WvtWoIj7YuFfjMJhU/view?usp=drive_link',
    thumbnail: '/thumbnails/talking-head-3.jpg',
    tags: ['Talking Head', 'Motion Graphics', 'Studio Lighting'],
    metrics: '2K 60FPS Render',
    description:
      'High-definition studio talking head edit featuring dynamic timeline motion graphics, kinetic typography, and synchronized sound design.',
    year: 2026,
  },

  // ── 2. MOTION GRAPHIC (3 videos) ───────────────────────────
  {
    id: 'mg-deepseek',
    title: 'DeepSeek Harness - Minimal motion design',
    client: 'DeepSeek',
    category: 'Motion Graphic',
    aspectRatio: '16:9',
    videoUrl:
      'https://drive.google.com/file/d/1lxMMedosRBBANjlHM9rIB6GG7WIdRLU7/view?usp=drive_link',
    thumbnail: '/thumbnails/deepseek-harness.jpg',
    tags: ['After Motion', 'Minimal Motion', 'UI Animation'],
    metrics: '60FPS Minimal Curves',
    description:
      'Minimalist product motion design showcasing seamless UI interaction curves, spatial depth, and fluid kinetic typography.',
    year: 2026,
  },
  {
    id: 'mg-grok',
    title: 'Grok - Minimal motion design',
    client: 'xAI / Grok',
    category: 'Motion Graphic',
    aspectRatio: '16:9',
    videoUrl:
      'https://drive.google.com/file/d/1nLA159A9ItiBv_XBXA2UEcXoKhphBH18/view?usp=drive_link',
    thumbnail: '/thumbnails/grok-motion.jpg',
    tags: ['After Motion', 'Minimal Motion', 'Smooth Curves'],
    metrics: 'Bezier Velocity Flow',
    description:
      'Precision motion system featuring sleek monochromatic aesthetic, smooth bezier velocity acceleration, and refined micro-interactions.',
    year: 2026,
  },
  {
    id: 'mg-gdrive',
    title: 'Google Drive - Minimal motion design',
    client: 'Cloud Workspace',
    category: 'Motion Graphic',
    aspectRatio: '16:9',
    videoUrl:
      'https://drive.google.com/file/d/1Zz-9vRs_HjeBL3pUkzc8XxVNH91zsCn5/view?usp=drive_link',
    thumbnail: '/thumbnails/google-drive-motion.jpg',
    tags: ['After Motion', 'Gold Motion', 'Motion Design'],
    metrics: 'Dynamic Geometry',
    description:
      'Geometric brand identity and kinetic iconography animation crafted with velocity ramps and synchronized sound design.',
    year: 2026,
  },

  // ── 3. YOUTUBE (2 videos) ──────────────────────────────────
  {
    id: 'yt-hidden-ideas',
    title: 'I Found 10 Hidden USA Channel Ideas | No-one is talking about.',
    client: 'Mr. K / Growwith Krunal',
    category: 'YouTube',
    aspectRatio: '16:9',
    videoUrl: 'https://youtu.be/xEMCluD_13U?si=I1Td-NliZw_ixqNy',
    thumbnail: 'https://img.youtube.com/vi/xEMCluD_13U/hqdefault.jpg',
    tags: ['YouTube', 'Long-Form', 'Research Content'],
    metrics: 'Channel Growth',
    description:
      'In-depth YouTube video covering 10 untapped USA-based channel ideas with high growth potential that nobody is talking about.',
    year: 2026,
  },
  {
    id: 'yt-earned-50k',
    title: 'I earned 50,000 as a student through video editing | Exact process',
    client: 'Mr. K / Growwith Krunal',
    category: 'YouTube',
    aspectRatio: '16:9',
    videoUrl: 'https://youtu.be/6mjYL5wPo5M?si=TqIXyzEPG6QhL-em',
    thumbnail: 'https://img.youtube.com/vi/6mjYL5wPo5M/hqdefault.jpg',
    tags: ['YouTube', 'Storytelling', 'Editing Process'],
    metrics: 'Monetization Journey',
    description:
      'Personal journey sharing the exact process of earning ₹50,000 as a student through freelance video editing.',
    year: 2026,
  },

  // ── 4. INSTAGRAM (3 reels) ─────────────────────────────────
  {
    id: 'ig-reel-1',
    title: 'SSIT Aavishkar — Kinetic Festival Teaser',
    client: '@krunal_edits',
    category: 'Instagram',
    aspectRatio: '9:16',
    videoUrl: '/videos/insta-1.mp4',
    sourceUrl: 'https://www.instagram.com/reel/DcgKFe4tKTw/',
    embedUrl: 'https://www.instagram.com/reel/DcgKFe4tKTw/embed/',
    thumbnail: '/thumbnails/insta-1.jpg',
    tags: ['Instagram', 'After Motion', 'Festival Teaser'],
    metrics: 'Viral Teaser',
    description:
      'High-impact vertical festival teaser crafted with punch-in transitions, beat-synced cuts, and kinetic typography.',
    year: 2026,
  },
  {
    id: 'ig-reel-2',
    title: 'Arijit Singh x Spotify — Kinetic Beat Sync',
    client: '@krunal_edits',
    category: 'Instagram',
    aspectRatio: '9:16',
    videoUrl: '/videos/insta-2.mp4',
    sourceUrl: 'https://www.instagram.com/reel/DcX2TB1o2nH/',
    embedUrl: 'https://www.instagram.com/reel/DcX2TB1o2nH/embed/',
    thumbnail: '/thumbnails/insta-2.jpg',
    tags: ['Instagram', 'Motion Graphics', 'Beat Sync'],
    metrics: 'Audio Pacing',
    description:
      'Kinetic typography and music video reel with smooth velocity curves, custom waveform accents, and After Motion graph easing.',
    year: 2026,
  },
  {
    id: 'ig-reel-3',
    title: 'Blinkit Motion Design — SaaS Animation',
    client: '@krunal_edits',
    category: 'Instagram',
    aspectRatio: '9:16',
    videoUrl: '/videos/insta-3.mp4',
    sourceUrl: 'https://www.instagram.com/reel/DcQ32bGM1eX/',
    embedUrl: 'https://www.instagram.com/reel/DcQ32bGM1eX/embed/',
    thumbnail: '/thumbnails/insta-3.jpg',
    tags: ['Blinkit', 'Motion Design', 'After Motion', 'UI Animation'],
    metrics: 'SaaS Motion',
    description:
      'Sleek SaaS product animation and motion design for Blinkit featuring fluid bezier velocity curves, 3D icon choreography, and synchronized sound design.',
    year: 2026,
  },
];

// ─── WORKFLOW PHASES (Mobile Precision) ──────────────────────────────────────
export const workflowPhases: WorkflowPhase[] = [
  {
    id: 'phase-01',
    phase: 'Phase 01',
    title: 'Story & Assembly',
    color: 'rgba(56, 189, 248, 0.6)',
    glowColor: 'rgba(56, 189, 248, 0.2)',
    nodes: ['Raw Footage Culling', 'Narrative Pacing', 'Hook Engineering'],
  },
  {
    id: 'phase-02',
    phase: 'Phase 02',
    title: 'Rhythm, SFX & Motion',
    color: 'rgba(139, 92, 246, 0.6)',
    glowColor: 'rgba(139, 92, 246, 0.2)',
    nodes: ['After Motion Keyframe & Graph Flow', 'Custom Sound Design', 'Beat Syncing'],
  },
  {
    id: 'phase-03',
    phase: 'Phase 03',
    title: 'Color Grade & Final Delivery',
    color: 'rgba(34, 197, 94, 0.6)',
    glowColor: 'rgba(34, 197, 94, 0.2)',
    nodes: ['Gold Motion Color Grading & Glows', 'Audio Mastering (-14 LUFS)', '4K 60fps Multi-Format Export'],
  },
];

// ─── TOOLS ARSENAL (Specialized Mobile Suite) ─────────────────────────────────
export const toolsStack: ToolItem[] = [
  {
    name: 'After Motion',
    category: 'VFX & Motion Graphics Engine',
    description:
      'Primary motion engine for kinetic typography, complex masking, custom easing curves, and visual hooks.',
    badge: 'AM',
    highlight: '#38BDF8',
  },
  {
    name: 'Gold Motion',
    category: 'Velocity & Color Science',
    description:
      'High-bitrate 4K rendering engine, smooth speed ramps, film glows, and advanced color grading.',
    badge: 'GM',
    highlight: '#F59E0B',
  },
  {
    name: 'Custom Graph & Bezier Curves',
    category: 'Pacing Psychology',
    description:
      'Hand-tuned acceleration graphs for hyper-smooth transitions that hook viewer attention in < 2 seconds.',
    badge: 'G&C',
    highlight: '#A855F7',
  },
  {
    name: 'Cloud Review & Drive Workflow',
    category: 'Client Collaboration',
    description:
      'Direct mobile-to-cloud delivery via Google Drive with rapid 24–48h draft turnarounds.',
    badge: 'CR',
    highlight: '#10B981',
  },
];

// ─── SITE CONFIG ─────────────────────────────────────────────────────────────
export const siteConfig = {
  name: 'Krunal Khatri',
  role: 'Video Editor',
  tagline: 'Visual Storytelling crafted for modern brands, built for impact',
  subtagline: 'Always try to become - Not to look like',
  bio: 'Specialist in high-retention video edits, After Motion kinetic graphics, and Gold Motion cinematic velocity. Delivering studio-grade edits with unmatched agility.',
  email: 'reachoutkrunal@gmail.com',
  web3FormsKey: 'de00c26b-7514-4a63-818a-05195b72888b',
  contact: {
    email: 'reachoutkrunal@gmail.com',
    phone: '+91 9106431821',
    whatsappNumber: '+91 9106431821',
    web3FormsKey: 'de00c26b-7514-4a63-818a-05195b72888b',
  },
  whatsapp:
    'https://wa.me/919106431821?text=Hi%20Krunal,%20I%20saw%20your%20portfolio%20and%20would%20love%20to%20discuss%20a%20video%20editing%20project.',
  whatsappNumber: '+91 9106431821',
  phone: '+91 9106431821',
  showreel: showreel,
  showreelDuration: '01:42',
  showreelYear: '2026',
  showreelVideo: 'https://drive.google.com/file/d/1nM_Vw5mIbcjNoAwZRqkxkucWBGtgoLnJ/view?usp=drive_link',
  showreelEmbed: 'https://drive.google.com/file/d/1nM_Vw5mIbcjNoAwZRqkxkucWBGtgoLnJ/preview',
  showreelPreview: '/videos/showreel.mp4',
  stats: {
    retention: '94%',
    projects: '120+',
    brands: '40+',
    resolution: '4K 60FPS',
  },
  socials: [
    {
      platform: 'Instagram',
      url: 'https://www.instagram.com/krunal_edits?cplk=a2g1cXhwZWFvMjZm',
      handle: '@krunal_edits',
    },
    {
      platform: 'YouTube',
      url: 'https://youtube.com/@growwith_krunal?si=NGxFONEngCP5okD7',
      handle: '@growwith_krunal',
    },
    {
      platform: 'LinkedIn',
      url: 'https://www.linkedin.com/in/krunal-khatri-342647387',
      handle: 'krunal-khatri',
    },
    {
      platform: 'X',
      url: 'https://x.com/khatrikrunal26',
      handle: '@khatrikrunal26',
    },
  ],
  navLinks: [
    { label: 'Home', href: '#home' },
    { label: 'Showreel', href: '#showreel' },
    { label: 'Selected Work', href: '#work' },
    { label: 'Workflow', href: '#workflow' },
    { label: 'Tools', href: '#tools' },
  ],
  projectTypes: [
    'Talking Head Video',
    'Motion Graphics / Kinetic Type',
    'YouTube Long-Form / Documentary',
    'Instagram Reel / Viral Short',
    'Velocity Ramp & Color Grade',
    'Other',
  ],
};

export const contact = siteConfig.contact;

