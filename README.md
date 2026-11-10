# Krunal Khatri — Video Editor Portfolio

A production-ready, dark-mode portfolio website crafted with Next.js 14 (App Router), TypeScript, Tailwind CSS, and Framer Motion. Built following the high-contrast **Obsidian & Ice Blue** FinTech/Cinema aesthetic from the reference design.

---

## 🚀 Quick Start

### 1. Run Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### 2. Production Build
```bash
npm run build
npm run start
```

---

## 🎨 Design System Highlights
- **Palette:** `#04070B` (Deep Obsidian Canvas), `#08121E` (Midnight Navy Sections), `#38BDF8` (Ice Blue Accents).
- **Glassmorphism:** Layered frosted glass with `backdrop-filter: blur(16px)` and subtle cyan glow edge highlights.
- **3-Orbit Roadmap Section:** Directly inspired by the reference image's dashed circular orbit design, featuring floating glass pill nodes for each phase of post-production.
- **Interactive Showreel:** 16:9 glass container with looping muted video preview and a full-screen theatre modal with sound.
- **Hover-Preview Video Grid:** Filterable by category, automatically previewing clips on hover.

---

## 📁 How to Update Content (`src/data/portfolioData.ts`)

All content is centralized in `src/data/portfolioData.ts`. You do **not** need to touch any UI components to update projects or details:

- **Add/Edit Projects:** Update the `projects` array with your title, client, video links (`previewVideo`, `fullVideo`), thumbnail URLs, metrics, and tags.
- **Showreel Video:** Change `siteConfig.showreelVideo` and `siteConfig.showreelPreview`.
- **Contact Details & WhatsApp:** Update `siteConfig.email`, `siteConfig.whatsapp`, and `siteConfig.socials`.
- **Software & Workflow:** Modify `softwareStack` and `workflowPhases` arrays as needed.

