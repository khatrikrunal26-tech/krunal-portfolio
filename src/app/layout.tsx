import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Krunal Khatri — Video Editor & Motion Designer',
  description:
    'Portfolio of Krunal Khatri — Specialist in high-retention video editing, After Motion graphics, and Gold Motion grading for modern brands & creators.',
  keywords: ['video editor', 'After Motion', 'Gold Motion', 'motion graphics', 'reels', 'YouTube', 'Mumbai'],
  icons: {
    icon: '/icon.svg',
    shortcut: '/favicon.ico',
    apple: '/icon.svg',
  },
  openGraph: {
    title: 'Krunal Khatri — Video Editor',
    description: 'Visual Storytelling for Modern Brands & Creators',
    type: 'website',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500&family=Plus+Jakarta+Sans:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body style={{ backgroundColor: '#04070B' }}>{children}</body>
    </html>
  );
}

