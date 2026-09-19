'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { Users, Shield, Zap, MapPin, Wifi, Battery, Send, Stethoscope, AlertTriangle, CheckCircle, XCircle, HelpCircle, MinusCircle, RotateCcw } from 'lucide-react';

const capabilities = [
  { id: 'human-agency', label: 'Human Agency', category: 'human', state: 'UNCONFIRMED', confidence: 75, freshness: 12, resourceCost: 0, failureHistory: 0, lastSuccess: '14:31:04', description: 'User responsiveness assessment via interaction monitoring', icon: Users },
  { id: 'evidence', label: 'Evidence Fusion', category: 'evidence', state: 'AVAILABLE', confidence: 92, freshness: 2, resourceCost: 5, failureHistory: 1, lastSuccess: '14:32:10', description: 'Multi-sensor Bayesian evidence fusion with uncertainty quantification', icon: Shield },
  { id: 'sensing', label: 'Sensing (IMU/Baro)', category: 'sensing', state: 'DEGRADED', confidence: 68, freshness: 5, resourceCost: 3, failureHistory: 2, lastSuccess: '14:31:55', description: 'Accelerometer, gyroscope, barometer — thermal throttling active', icon: Zap },
  { id: 'location', label: 'Location (GPS/Fused)', category: 'location', state: 'DEGRADED', confidence: 55, freshness: 45, resourceCost: 15, failureHistory: 3, lastSuccess: '14:31:25', description: 'GNSS multipath detected. PDR fallback available. Uncertainty ±45m', icon: MapPin },
  { id: 'communication', label: 'Cellular', category: 'communication', state: 'UNAVAILABLE', confidence: 0, freshness: 47, resourceCost: 25, failureHistory: 5, lastSuccess: '14:31:31', description: 'No signal (RSRP -120dBm). Exponential backoff retry scheduled', icon: Wifi },
  { id: 'relay', label: 'Guardian Relay (BLE)', category: 'communication', state: 'AVAILABLE', confidence: 88, freshness: 8, resourceCost: 8, failureHistory: 0, lastSuccess: '14:31:42', description: '2 peers discovered. 2/2 delivery success. Mesh active', icon: RotateCcw },
  { id: 'resources', label: 'Battery', category: 'resources', state: 'DEGRADED', confidence: 100, freshness: 3, resourceCost: 0, failureHistory: 0, lastSuccess: 'N/A', description: '37% remaining. Critical threshold at 15%. Conservation active', icon: Battery },
  { id: 'responder', label: 'Emergency Responder', category: 'responder', state: 'UNKNOWN', confidence: 0, freshness: 0, resourceCost: 0, failureHistory: 0, lastSuccess: 'N/A', description: 'No acknowledgment received. Delivery confirmed via relay', icon: Send },
];

const categoryConfig: Record<string, { label: string; color: string; bg: string; icon: any }> = {
  human: { label: 'Human', color: 'text-purple-400', bg: 'bg-purple-500/10', icon: Users },
  evidence: { label: 'Evidence', color: 'text-green-400', bg: 'bg-green-500/10', icon: Shield },
  sensing: { label: 'Sensing', color: 'text-yellow-400', bg: 'bg-yellow-500/10', icon: Zap },
  location: { label: 'Location', color: 'text-blue-400', bg: 'bg-blue-500/10', icon: MapPin },
  communication: { label: 'Communication', color: 'text-cyan-400', bg: 'bg-cyan-500/10', icon: Wifi },
  resources: { label: 'Resources', color: 'text-orange-400', bg: 'bg-orange-500/10', icon: Battery },
  responder: { label: 'Responder', color: 'text-red-400', bg: 'bg-red-500/10', icon: Send },
};

function getStateIcon(state: string) {
  switch (state) {
    case 'AVAILABLE': return CheckCircle;
    case 'DEGRADED': return MinusCircle;
    case 'UNAVAILABLE': return XCircle;
    default: return HelpCircle;
  }
}

function getStateClass(state: string) {
  switch (state) {
    case 'AVAILABLE': return 'capability-available';
    case 'DEGRADED': return 'capability-degraded';
    case 'UNAVAILABLE': return 'capability-unavailable';
    default: return 'capability-unknown';
  }
}

export function CapabilityGraph() {
  const [selectedCapability, setSelectedCapability] = useState<string | null>(null);
  const categories = ['human', 'evidence', 'sensing', 'location', 'communication', 'resources', 'responder'];

  return (
    <section
      id="capability-graph"
      className="relative py-24 lg:py-32"
      aria-labelledby="capability-heading"
    >
      <div className="section-container relative">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <span className="section-label">INTERACTIVE VISUALIZATION</span>
          <h2 id="capability-heading" className="section-heading mb-6">
            CAPABILITY GRAPH
          </h2>
          <p className="section-subheading mx-auto">
            Real-time capability registry. Click any node for metadata: confidence, freshness, resource cost, failure history, last successful use.
          </p>
        </div>

        <div className="max-w-5xl mx-auto">
          <div className="flex flex-wrap gap-2 mb-8 justify-center" role="tablist" aria-label="Filter by category">
            {['all', ...categories].map((cat) => (
              <button
                key={cat}
                className={cn(
                  'px-3 py-1.5 text-xs font-medium rounded-lg transition-all',
                  'border border-border-primary bg-background-elevated text-foreground-tertiary hover:text-foreground-primary hover:border-border-secondary',
                )}
                role="tab"
                aria-selected={false}
              >
                {cat === 'all' ? 'All' : categoryConfig[cat as keyof typeof categoryConfig].label}
              </button>
            ))}
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4" role="list" aria-label="Capabilities">
            {capabilities.map((cap, index) => (
              <motion.div
                key={cap.id}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ delay: index * 0.05 }}
                className={cn(
                  'card-hover p-4 relative group',
                  selectedCapability === cap.id && 'ring-2 ring-accent-cyan shadow-glow'
                )}
                role="listitem"
                onClick={() => setSelectedCapability(selectedCapability === cap.id ? null : cap.id)}
              >
                <div className="flex items-start justify-between gap-3 mb-3">
                  <div className={cn('w-10 h-10 rounded-xl flex items-center justify-center', categoryConfig[cap.category].bg)}>
                    <cap.icon className={cn('w-5 h-5', categoryConfig[cap.category].color)} aria-hidden="true" />
                  </div>
                  <span className={cn('status-badge text-xs flex-shrink-0', getStateClass(cap.state))}>
                    {cap.state}
                  </span>
                </div>
                
                <h3 className="font-semibold text-foreground-primary mb-1">{cap.label}</h3>
                <p className="text-xs text-foreground-tertiary mb-3 line-clamp-2">{cap.description}</p>

                <div className="space-y-2 text-xs border-t border-border-primary pt-3">
                  <div className="flex justify-between">
                    <span className="text-foreground-muted">Confidence</span>
                    <span className="font-mono text-foreground-primary">{cap.confidence}%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-foreground-muted">Freshness</span>
                    <span className="font-mono text-foreground-primary">{cap.freshness}s ago</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-foreground-muted">Resource Cost</span>
                    <span className="font-mono text-foreground-primary">{cap.resourceCost}%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-foreground-muted">Failures</span>
                    <span className="font-mono text-foreground-primary">{cap.failureHistory}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-foreground-muted">Last Success</span>
                    <span className="font-mono text-foreground-primary">{cap.lastSuccess}</span>
                  </div>
                </div>

                {selectedCapability === cap.id && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    className="mt-3 pt-3 border-t border-accent-cyan/30 space-y-2"
                  >
                    <div className="flex items-center gap-2 text-accent-cyan text-xs font-medium">
                      <CheckCircle className="w-3 h-3" aria-hidden="true" />
                      Selected — Click to close
                    </div>
                    <div className="text-xs text-foreground-tertiary">
                      <strong>Metadata available for decision engine:</strong> confidence interval, freshness decay rate, resource cost curve, failure rate trend, dependency graph, recovery prediction.
                    </div>
                  </motion.div>
                )}
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ delay: 0.5 }}
            className="mt-8 p-6 rounded-xl bg-accent-cyan/5 border border-accent-cyan/20"
          >
            <h4 className="font-semibold text-accent-cyan mb-3 flex items-center gap-2">
              <Shield className="w-5 h-5" aria-hidden="true" />
              Capability State Machine
            </h4>
            <div className="grid sm:grid-cols-4 gap-4 text-center">
              {['AVAILABLE', 'DEGRADED', 'UNAVAILABLE', 'UNKNOWN'].map((state) => (
                <div key={state} className="p-4 rounded-lg bg-background-elevated border">
                  <span className={cn('status-badge mb-2', getStateClass(state))}>{state}</span>
                  <p className="text-xs text-foreground-tertiary">
                    {state === 'AVAILABLE' && 'Fully operational, within spec'}
                    {state === 'DEGRADED' && 'Functional but impaired'}
                    {state === 'UNAVAILABLE' && 'Non-functional, no fallback'}
                    {state === 'UNKNOWN' && 'State indeterminate'}
                  </p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}