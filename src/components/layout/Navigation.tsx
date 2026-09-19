'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/Button';

const navigation = [
  { label: 'System', href: '/system' },
  { label: 'Why Guardian', href: '/#why-guardian' },
  { label: 'Capabilities', href: '/#capabilities' },
  { label: 'Failure Lab', href: '/failure-lab' },
  { label: 'Research', href: '/research' },
  { label: 'Evidence', href: '/evidence' },
  { label: 'Technology', href: '/technology' },
  { label: 'Team', href: '/team' },
];

export function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [judgeMode, setJudgeMode] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const judgeModeItems = [
    { label: 'Problem', href: '/judge-mode#problem' },
    { label: 'Innovation', href: '/judge-mode#innovation' },
    { label: 'Architecture', href: '/judge-mode#architecture' },
    { label: 'Prototype', href: '/judge-mode#prototype' },
    { label: 'Experiments', href: '/judge-mode#experiments' },
    { label: 'Results', href: '/judge-mode#results' },
    { label: 'Limitations', href: '/judge-mode#limitations' },
    { label: 'Team', href: '/judge-mode#team' },
  ];

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-sticky transition-all duration-300',
        scrolled ? 'bg-background-primary/95 backdrop-blur-md border-b border-border-primary' : 'bg-transparent'
      )}
      role="banner"
    >
      <nav className="section-container" aria-label="Main navigation">
        <div className="flex items-center justify-between h-16 lg:h-20">
          <Link
            href="/"
            className="flex items-center gap-2 text-xl font-bold tracking-tight text-foreground-primary hover:opacity-80 transition-opacity"
            aria-label="GUARDIAN Home"
          >
            <span className="text-accent-cyan">GUARDIAN</span>
            <span className="hidden sm:inline-block text-xs font-medium text-foreground-tertiary uppercase tracking-wider ml-1">Adaptive Safety Intelligence</span>
          </Link>

          <div className="hidden lg:flex items-center gap-1">
            {navigation.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="px-3 py-2 text-sm font-medium text-foreground-secondary hover:text-foreground-primary transition-colors rounded-lg hover:bg-background-tertiary"
              >
                {item.label}
              </Link>
            ))}
          </div>

          <div className="hidden lg:flex items-center gap-3">
            <Button variant="ghost" size="sm" asChild>
              <Link href="/#open-system">Open the System</Link>
            </Button>
            <Button variant="secondary" size="sm" onClick={() => setJudgeMode(true)}>
              Judge Mode
            </Button>
            <Button variant="primary" size="sm" asChild>
              <Link href="/system">Explore the System</Link>
            </Button>
          </div>

          <button
            className="lg:hidden p-2 text-foreground-secondary hover:text-foreground-primary transition-colors rounded-lg hover:bg-background-tertiary"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-expanded={mobileOpen}
            aria-controls="mobile-nav"
            aria-label="Toggle navigation menu"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              {mobileOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {mobileOpen && (
          <div id="mobile-nav" className="lg:hidden py-4 border-t border-border-primary animate-slide-down">
            <div className="flex flex-col gap-2">
              {navigation.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="px-3 py-2 text-base font-medium text-foreground-secondary hover:text-foreground-primary transition-colors rounded-lg hover:bg-background-tertiary"
                  onClick={() => setMobileOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
              <div className="pt-2 border-t border-border-primary flex flex-col gap-2">
                <Button variant="ghost" className="justify-start" asChild>
                  <Link href="/#open-system" onClick={() => setMobileOpen(false)}>Open the System</Link>
                </Button>
                <Button variant="secondary" className="justify-start" onClick={() => { setJudgeMode(true); setMobileOpen(false); }}>
                  Judge Mode
                </Button>
                <Button variant="primary" className="justify-start" asChild>
                  <Link href="/system" onClick={() => setMobileOpen(false)}>Explore the System</Link>
                </Button>
              </div>
            </div>
          </div>
        )}

        {judgeMode && (
          <div className="fixed inset-0 z-modal bg-background-primary/95 backdrop-blur-sm lg:hidden" role="dialog" aria-modal="true" aria-labelledby="judge-mode-title">
            <div className="flex flex-col h-full">
              <div className="flex items-center justify-between p-4 border-b border-border-primary">
                <h2 id="judge-mode-title" className="text-lg font-semibold">Judge Mode</h2>
                <button
                  onClick={() => setJudgeMode(false)}
                  className="p-2 text-foreground-secondary hover:text-foreground-primary transition-colors rounded-lg hover:bg-background-tertiary"
                  aria-label="Close Judge Mode"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              <nav className="flex-1 overflow-y-auto p-4">
                <ul className="flex flex-col gap-2" role="list">
                  {judgeModeItems.map((item) => (
                    <li key={item.href}>
                      <Link
                        href={item.href}
                        className="block px-4 py-3 text-base font-medium text-foreground-secondary hover:text-foreground-primary hover:bg-background-tertiary transition-colors rounded-lg"
                        onClick={() => setJudgeMode(false)}
                      >
                        {item.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}