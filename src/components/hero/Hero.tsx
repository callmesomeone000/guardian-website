'use client';

import { useRef, useEffect, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { Mouse, ChevronDown } from 'lucide-react';
import { SystemDiagram, ColorManagement } from './Hero3DSystem';
import { Hero3DFallback } from './Hero3DFallback';

const nodePositions: Record<string, [number, number, number]> = {
  guardian: [0, 0, 0],
  person: [0, 3.5, 0],
  evidence: [-3, 1.5, 2],
  location: [3, 1.5, 2],
  communication: [3, -1.5, -2],
  resources: [-3, -1.5, -2],
  responder: [0, -3.5, 0],
};

const connections = [
  ['guardian', 'person'],
  ['guardian', 'evidence'],
  ['guardian', 'location'],
  ['guardian', 'communication'],
  ['guardian', 'resources'],
  ['guardian', 'responder'],
];

type ScenarioKey = 'normal' | 'cellular' | 'gps' | 'battery' | 'relay' | 'recovery';

const scenarios: Record<ScenarioKey, { label: string; failures: string[]; recovery?: string[] }> = {
  normal: { label: 'NORMAL', failures: [] },
  cellular: { label: 'CELLULAR FAILS', failures: ['cellular'] },
  gps: { label: 'GPS DEGRADED', failures: ['gps'] },
  battery: { label: 'BATTERY CONSTRAINED', failures: ['battery'] },
  relay: { label: 'RELAY ACTIVATED', failures: ['cellular'], recovery: ['relay'] },
  recovery: { label: 'RECOVERY', failures: [], recovery: ['cellular', 'gps', 'battery'] },
};

export function Hero() {
  const [isWebGLAvailable, setIsWebGLAvailable] = useState(true);
  const [currentScenario, setCurrentScenario] = useState<ScenarioKey>('normal');
  const [isAutoDemo, setIsAutoDemo] = useState(false);
  const scenarioKeys = Object.keys(scenarios) as ScenarioKey[];
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = document.createElement('canvas');
    const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
    setIsWebGLAvailable(!!gl);
  }, []);

  useEffect(() => {
    if (!isAutoDemo) return;

    const interval = setInterval(() => {
      const currentIndex = scenarioKeys.indexOf(currentScenario);
      const nextIndex = (currentIndex + 1) % scenarioKeys.length;
      setCurrentScenario(scenarioKeys[nextIndex]);
    }, 4000);

    return () => clearInterval(interval);
  }, [isAutoDemo, currentScenario]);

  const handleScenarioChange = (scenario: string) => {
    setCurrentScenario(scenario as ScenarioKey);
    setIsAutoDemo(false);
  };

  const handleReplay = () => {
    setCurrentScenario('normal');
    setTimeout(() => setCurrentScenario('cellular'), 1000);
    setTimeout(() => setCurrentScenario('relay'), 2500);
    setTimeout(() => setCurrentScenario('recovery'), 4000);
  };

  if (!isWebGLAvailable) {
    return <Hero3DFallback currentScenario={currentScenario} onScenarioChange={handleScenarioChange} />;
  }

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      aria-labelledby="hero-heading"
    >
      <div className="absolute inset-0 gradient-radial" aria-hidden="true" />

      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--color-accent-cyan)_0%,_transparent_70%)] opacity-30" aria-hidden="true" />

      <div className="relative z-10 section-container py-20">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent-cyan/10 border border-accent-cyan/20 text-accent-cyan text-xs font-semibold tracking-wider uppercase mb-6 animate-fade-in">
              <span className="relative flex h-1.5 w-1.5">
                <span className="animate-pulse-soft absolute inset-0 h-1.5 w-1.5 rounded-full bg-accent-cyan" />
                <span className="relative h-1.5 w-1.5 rounded-full bg-accent-cyan" />
              </span>
              Adaptive Emergency Response Architecture
            </div>

            <h1
              id="hero-heading"
              className="section-heading text-foreground-primary mb-6 animate-slide-up"
              style={{ animationDelay: '100ms' }}
            >
              WHEN THE CONDITIONS CHANGE,<br />
              <span className="text-gradient">GUARDIAN CHANGES WITH THEM.</span>
            </h1>

            <p className="section-subheading mb-8 animate-slide-up" style={{ animationDelay: '200ms' }}>
              An adaptive emergency-response architecture designed for situations where the person, location, communication path, or device may no longer behave as expected.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 mb-12 animate-slide-up" style={{ animationDelay: '300ms' }}>
              <a
                href="/system"
                className="btn btn-primary btn-lg"
              >
                Explore the System
              </a>
              <button
                className="btn btn-secondary btn-lg"
                onClick={handleReplay}
                aria-label="Run failure simulation demo"
              >
                Break Guardian
              </button>
            </div>

            <div className="flex items-center gap-6 text-sm text-foreground-tertiary animate-slide-up" style={{ animationDelay: '400ms' }}>
              <div className="flex items-center gap-2">
                <span className="technical-dot" aria-hidden="true" />
                <span>Failure-Aware Architecture</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="technical-dot" style={{ background: 'var(--color-accent-amber)' }} aria-hidden="true" />
                <span>Persistent Emergency State</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="technical-dot" style={{ background: 'var(--color-accent-blue)' }} aria-hidden="true" />
                <span>Adaptive Intelligence</span>
              </div>
            </div>
          </div>

          <div className="relative animate-slide-up" style={{ animationDelay: '200ms' }}>
            <div className="relative aspect-square max-w-xl mx-auto">
              <div className="absolute inset-0 bg-gradient-to-br from-accent-cyan/5 via-transparent to-accent-blue/5 rounded-2xl" aria-hidden="true" />
              <div className="absolute inset-0 border border-border-accent rounded-2xl" aria-hidden="true" />
              
              <Canvas
                ref={canvasRef}
                className="absolute inset-0"
                camera={{ position: [0, 0, 12], fov: 45 }}
                gl={{ preserveDrawingBuffer: true, alpha: true, antialias: true }}
                shadows={false}
              >
                <ColorManagement />
                <SystemDiagram
                  key={currentScenario}
                  currentScenario={currentScenario}
                  onScenarioChange={handleScenarioChange}
                />
              </Canvas>

              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 flex gap-2 mb-6 pointer-events-none">
                {scenarioKeys.map((scenario) => (
                  <button
                    key={scenario}
                    onClick={() => handleScenarioChange(scenario)}
                    className={cn(
                      'px-3 py-1.5 text-xs font-medium rounded-lg transition-all duration-200',
                      'border border-border-primary bg-background-elevated/80 backdrop-blur-sm',
                      currentScenario === scenario
                        ? 'border-accent-cyan bg-accent-cyan/20 text-accent-cyan shadow-glow'
                        : 'text-foreground-tertiary hover:text-foreground-primary hover:border-border-secondary'
                    )}
                    aria-pressed={currentScenario === scenario}
                    aria-label={`View ${scenarios[scenario].label} scenario`}
                  >
                    {scenarios[scenario].label}
                  </button>
                ))}
              </div>
            </div>

            <div className="mt-6 flex items-center justify-center gap-4">
              <button
                onClick={handleReplay}
                className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-foreground-secondary hover:text-accent-cyan transition-colors"
                aria-label="Replay failure simulation"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                  <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
                  <path d="M3 3v5h5" />
                </svg>
                Replay
              </button>

              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={isAutoDemo}
                  onChange={(e) => setIsAutoDemo(e.target.checked)}
                  className="w-4 h-4 accent-accent-cyan rounded border-border-primary bg-background-tertiary focus:ring-accent-cyan"
                  aria-label="Enable auto demo mode"
                />
                <span className="text-sm text-foreground-tertiary">Auto Demo</span>
              </label>
            </div>
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-pulse-soft" aria-hidden="true">
          <ChevronDown className="w-6 h-6 text-foreground-tertiary" />
        </div>
      </div>

      <div className="absolute bottom-6 right-6 flex items-center gap-2 px-3 py-2 bg-background-elevated/80 backdrop-blur-sm border border-border-primary rounded-lg text-xs text-foreground-tertiary" role="status" aria-live="polite">
        <Mouse className="w-4 h-4" aria-hidden="true" />
        <span>Scroll to explore</span>
      </div>
    </section>
  );
}