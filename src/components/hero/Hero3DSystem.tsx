'use client';

import { useMemo } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { motion } from 'framer-motion';
import * as THREE from 'three';
import { cn, lerp, getCapabilityColor } from '@/lib/utils';
import { Node, Connection, PulseRing, ParticleFlow } from './Hero3DNodes';

interface SystemDiagramProps {
  currentScenario: string;
  onScenarioChange: (scenario: string) => void;
}

interface Hero3DSystemProps {
  currentScenario: string;
  nodePositions: Record<string, [number, number, number]>;
  connections: string[][];
}

export function ColorManagement() {
  return null;
}

export function AmbientLight(props: React.ComponentProps<'ambientLight'>) {
  return <ambientLight {...props} />;
}

export function DirectionalLight(props: React.ComponentProps<'directionalLight'>) {
  return <directionalLight {...props} />;
}

export function SystemDiagram({ currentScenario, onScenarioChange }: SystemDiagramProps) {
  const scenarioConfigs = useMemo(() => ({
    normal: {
      cellular: 'AVAILABLE' as const,
      gps: 'AVAILABLE' as const,
      battery: 'AVAILABLE' as const,
      relay: 'UNAVAILABLE' as const,
    },
    cellular: {
      cellular: 'UNAVAILABLE' as const,
      gps: 'AVAILABLE' as const,
      battery: 'AVAILABLE' as const,
      relay: 'UNAVAILABLE' as const,
    },
    gps: {
      cellular: 'AVAILABLE' as const,
      gps: 'DEGRADED' as const,
      battery: 'AVAILABLE' as const,
      relay: 'UNAVAILABLE' as const,
    },
    battery: {
      cellular: 'AVAILABLE' as const,
      gps: 'AVAILABLE' as const,
      battery: 'DEGRADED' as const,
      relay: 'UNAVAILABLE' as const,
    },
    relay: {
      cellular: 'UNAVAILABLE' as const,
      gps: 'AVAILABLE' as const,
      battery: 'AVAILABLE' as const,
      relay: 'AVAILABLE' as const,
    },
    recovery: {
      cellular: 'AVAILABLE' as const,
      gps: 'AVAILABLE' as const,
      battery: 'AVAILABLE' as const,
      relay: 'UNAVAILABLE' as const,
    },
  }), []);

  const config = scenarioConfigs[currentScenario as keyof typeof scenarioConfigs] || scenarioConfigs.normal;

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

  const nodeStates = useMemo(() => ({
    guardian: 'AVAILABLE' as const,
    person: 'AVAILABLE' as const,
    evidence: 'AVAILABLE' as const,
    location: config.gps,
    communication: config.cellular,
    resources: config.battery,
    responder: config.relay !== 'UNAVAILABLE' ? 'AVAILABLE' as const : 'UNAVAILABLE' as const,
    relay: config.relay,
  }), [config]);

  return (
    <>
      <ColorManagement />
      <AmbientLight intensity={0.6} />
      <DirectionalLight position={[5, 10, 7]} intensity={0.8} color="#ffffff" />
      <DirectionalLight position={[-5, -5, -5]} intensity={0.3} color="#00D4C8" />

      {connections.map(([from, to], i) => (
        <Connection
          key={i}
          from={nodePositions[from]}
          to={nodePositions[to]}
          fromState={nodeStates[from as keyof typeof nodeStates]}
          toState={nodeStates[to as keyof typeof nodeStates]}
          isRelay={from === 'guardian' && to === 'responder' && config.relay === 'AVAILABLE'}
        />
      ))}

      {Object.entries(nodePositions).map(([key, position]) => (
        <Node
          key={key}
          id={key}
          position={position}
          state={nodeStates[key as keyof typeof nodeStates]}
          isCentral={key === 'guardian'}
          isRelay={key === 'relay'}
          label={key.charAt(0).toUpperCase() + key.slice(1)}
        />
      ))}

      <PulseRing
        position={nodePositions.guardian}
        active={true}
        color="#00D4C8"
      />

      {config.relay === 'AVAILABLE' && (
        <ParticleFlow
          from={nodePositions.guardian}
          to={nodePositions.responder}
          color="#00D4C8"
          speed={0.02}
        />
      )}

      {config.cellular === 'UNAVAILABLE' && (
        <ParticleFlow
          from={nodePositions.guardian}
          to={nodePositions.communication}
          color="#EF4444"
          speed={0.015}
          fading={true}
        />
      )}

      {/* Scenario selector buttons */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="absolute bottom-0 left-1/2 -translate-x-1/2 flex flex-wrap justify-center gap-2 mb-6 p-2 pointer-events-none z-10"
      >
        {Object.entries({
          normal: 'NORMAL',
          cellular: 'CELLULAR FAILS',
          gps: 'GPS DEGRADED',
          battery: 'BATTERY CONSTRAINED',
          relay: 'RELAY ACTIVATED',
          recovery: 'RECOVERY',
        }).map(([key, label]) => (
          <button
            key={key}
            onClick={() => onScenarioChange(key)}
            className={cn(
              'px-3 py-1.5 text-xs font-medium rounded-lg transition-all duration-200',
              'border border-border-primary bg-background-elevated/80 backdrop-blur-sm',
              currentScenario === key
                ? 'border-accent-cyan bg-accent-cyan/20 text-accent-cyan shadow-glow'
                : 'text-foreground-tertiary hover:text-foreground-primary hover:border-border-secondary'
            )}
            aria-pressed={currentScenario === key}
            aria-label={`View ${label} scenario`}
          >
            {label}
          </button>
        ))}
      </motion.div>
    </>
  );
}