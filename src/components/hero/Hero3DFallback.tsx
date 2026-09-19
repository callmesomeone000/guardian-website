'use client';

import { useState, useEffect, useRef } from 'react';
import { cn, getCapabilityColor } from '@/lib/utils';

interface Hero3DFallbackProps {
  currentScenario: string;
  onScenarioChange: (scenario: string) => void;
}

const nodeConfig = [
  { id: 'guardian', label: 'GUARDIAN', x: 50, y: 50, isCentral: true, category: 'core' },
  { id: 'person', label: 'Person', x: 50, y: 15, isCentral: false, category: 'human' },
  { id: 'evidence', label: 'Evidence', x: 20, y: 30, isCentral: false, category: 'sensing' },
  { id: 'location', label: 'Location', x: 80, y: 30, isCentral: false, category: 'location' },
  { id: 'communication', label: 'Communication', x: 80, y: 70, isCentral: false, category: 'communication' },
  { id: 'resources', label: 'Resources', x: 20, y: 70, isCentral: false, category: 'resources' },
  { id: 'responder', label: 'Responder', x: 50, y: 85, isCentral: false, category: 'responder' },
];

const connections = [
  ['guardian', 'person'],
  ['guardian', 'evidence'],
  ['guardian', 'location'],
  ['guardian', 'communication'],
  ['guardian', 'resources'],
  ['guardian', 'responder'],
];

const scenarios = {
  normal: { cellular: 'AVAILABLE', gps: 'AVAILABLE', battery: 'AVAILABLE', relay: 'UNAVAILABLE' },
  cellular: { cellular: 'UNAVAILABLE', gps: 'AVAILABLE', battery: 'AVAILABLE', relay: 'UNAVAILABLE' },
  gps: { cellular: 'AVAILABLE', gps: 'DEGRADED', battery: 'AVAILABLE', relay: 'UNAVAILABLE' },
  battery: { cellular: 'AVAILABLE', gps: 'AVAILABLE', battery: 'DEGRADED', relay: 'UNAVAILABLE' },
  relay: { cellular: 'UNAVAILABLE', gps: 'AVAILABLE', battery: 'AVAILABLE', relay: 'AVAILABLE' },
  recovery: { cellular: 'AVAILABLE', gps: 'AVAILABLE', battery: 'AVAILABLE', relay: 'UNAVAILABLE' },
};

const scenarioLabels: Record<string, string> = {
  normal: 'NORMAL',
  cellular: 'CELLULAR FAILS',
  gps: 'GPS DEGRADED',
  battery: 'BATTERY CONSTRAINED',
  relay: 'RELAY ACTIVATED',
  recovery: 'RECOVERY',
};

export function Hero3DFallback({ currentScenario, onScenarioChange }: Hero3DFallbackProps) {
  const config = scenarios[currentScenario as keyof typeof scenarios] || scenarios.normal;
  const [animationKey, setAnimationKey] = useState(0);

  useEffect(() => {
    setAnimationKey(k => k + 1);
  }, [currentScenario]);

  const nodeStates = {
    guardian: 'AVAILABLE',
    person: 'AVAILABLE',
    evidence: 'AVAILABLE',
    location: config.gps,
    communication: config.cellular,
    resources: config.battery,
    responder: config.relay !== 'UNAVAILABLE' ? 'AVAILABLE' : 'UNAVAILABLE',
    relay: config.relay,
  };

  const getNodePosition = (id: string) => {
    const node = nodeConfig.find(n => n.id === id);
    return node ? { x: node.x, y: node.y } : { x: 50, y: 50 };
  };

  const drawConnection = (ctx: CanvasRenderingContext2D, fromId: string, toId: string, fromState: string, toState: string, isRelay: boolean) => {
    const from = getNodePosition(fromId);
    const to = getNodePosition(toId);
    
    ctx.beginPath();
    ctx.moveTo(from.x, from.y);
    ctx.lineTo(to.x, to.y);
    
    const color = isRelay && fromState === 'AVAILABLE' && toState === 'AVAILABLE'
      ? '#00D4C8'
      : fromState === 'AVAILABLE' && toState === 'AVAILABLE'
        ? '#1E2D3D'
        : '#EF4444';
    
    const opacity = isRelay ? 0.6 : fromState === 'AVAILABLE' && toState === 'AVAILABLE' ? 0.3 : 0.15;
    
    ctx.strokeStyle = color;
    ctx.globalAlpha = opacity;
    ctx.lineWidth = isRelay ? 3 : 1.5;
    
    if (isRelay) {
      ctx.setLineDash([10, 6]);
      ctx.lineDashOffset = Date.now() * 0.01;
    } else {
      ctx.setLineDash([]);
    }
    
    ctx.stroke();
    ctx.setLineDash([]);
    ctx.globalAlpha = 1;
  };

  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width * window.devicePixelRatio;
      canvas.height = rect.height * window.devicePixelRatio;
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
    };
    
    resize();
    window.addEventListener('resize', resize);
    
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      connections.forEach(([from, to]) => {
        const isRelay = from === 'guardian' && to === 'responder' && config.relay === 'AVAILABLE';
        drawConnection(ctx, from, to, nodeStates[from as keyof typeof nodeStates], nodeStates[to as keyof typeof nodeStates], isRelay);
      });
      
      nodeConfig.forEach(node => {
        const state = nodeStates[node.id as keyof typeof nodeStates];
        const pos = getNodePosition(node.id);
        const color = getCapabilityColor(state);
        const size = node.isCentral ? 28 : node.id === 'relay' ? 22 : 18;
        
        ctx.beginPath();
        ctx.arc(pos.x, pos.y, size, 0, Math.PI * 2);
        ctx.fillStyle = color + '20';
        ctx.fill();
        
        ctx.beginPath();
        ctx.arc(pos.x, pos.y, size - 2, 0, Math.PI * 2);
        ctx.strokeStyle = color;
        ctx.lineWidth = 2;
        ctx.stroke();
        
        if (node.isCentral) {
          const pulseScale = 1 + Math.sin(Date.now() * 0.002) * 0.15;
          ctx.beginPath();
          ctx.arc(pos.x, pos.y, (size + 8) * pulseScale, 0, Math.PI * 2);
          ctx.strokeStyle = '#00D4C8';
          ctx.globalAlpha = 0.15 + Math.sin(Date.now() * 0.002) * 0.1;
          ctx.lineWidth = 2;
          ctx.stroke();
          ctx.globalAlpha = 1;
        }
        
        ctx.font = `${node.isCentral ? 'bold 14px' : '12px'} "Geist", "Inter", sans-serif`;
        ctx.fillStyle = '#F0F4F8';
        ctx.textAlign = 'center';
        ctx.fillText(node.label, pos.x, pos.y + size + 18);
      });
      
      requestAnimationFrame(animate);
    };
    
    animate();
    
    return () => window.removeEventListener('resize', resize);
  }, [currentScenario, config, animationKey]);

  return (
    <div className="relative aspect-square max-w-xl mx-auto">
      <div className="absolute inset-0 bg-gradient-to-br from-accent-cyan/5 via-transparent to-accent-blue/5 rounded-2xl" aria-hidden="true" />
      <div className="absolute inset-0 border border-border-accent rounded-2xl" aria-hidden="true" />
      
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
        aria-hidden="true"
      />
      
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 flex flex-wrap justify-center gap-2 mb-6 p-2 pointer-events-none">
        {Object.entries(scenarioLabels).map(([key, label]) => (
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
      </div>
    </div>
  );
}