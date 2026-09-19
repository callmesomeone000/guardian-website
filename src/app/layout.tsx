import type { Metadata, Viewport } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import { Navigation } from '@/components/layout/Navigation';
import { Footer } from '@/components/layout/Footer';

const geistSans = Geist({
  subsets: ['latin'],
  variable: '--font-geist-sans',
  display: 'swap',
});

const geistMono = Geist_Mono({
  subsets: ['latin'],
  variable: '--font-geist-mono',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'GUARDIAN — Adaptive Safety Intelligence for Healthcare & Emergencies',
  description: 'Failure-aware emergency response architecture. When the conditions around an emergency change, Guardian changes its response with them.',
  keywords: ['adaptive emergency response', 'failure-aware safety architecture', 'emergency continuity', 'healthcare emergency', 'disaster response', 'student innovation', 'SIH 2026'],
  authors: [{ name: 'GUARDIAN Team' }],
  creator: 'GUARDIAN Team',
  publisher: 'GUARDIAN',
  robots: 'index, follow',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://guardian-sih2026.dev',
    title: 'GUARDIAN — Adaptive Safety Intelligence',
    description: 'When the conditions around an emergency change, Guardian changes its response with them.',
    siteName: 'GUARDIAN',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'GUARDIAN — Adaptive Safety Intelligence',
    description: 'When the conditions around an emergency change, Guardian changes its response with them.',
  },
  verification: {
    google: 'guardian-verification',
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#05080C' },
    { media: '(prefers-color-scheme: dark)', color: '#05080C' },
  ],
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
};

export const dynamic = 'force-dynamic';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />
      </head>
      <body className="min-h-screen bg-background-primary text-foreground-primary">
        <a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 z-toast px-4 py-2 bg-accent-cyan text-background-primary rounded-lg">
          Skip to main content
        </a>
        <Navigation />
        <main id="main-content" className="pt-16 lg:pt-20">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}