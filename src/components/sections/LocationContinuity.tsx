'use client';

import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { MapPin, WifiOff, Cpu, RotateCcw, CheckCircle, AlertTriangle, ArrowRight, Satellite } from 'lucide-react';

const pipelineSteps = [
  { 
    state: 'GPS AVAILABLE', 
    icon: MapPin, 
    color: 'text-green-400', 
    bg: 'bg-green-500/10 border-green-500/20',
    description: 'GNSS fix acquired. Satellites: 8. HDOP: 1.2. CN0: 42dB-Hz.',
    detail: 'High-confidence location. Primary pathway active.',
    status: 'AVAILABLE',
  },
  { 
    state: 'GPS UNAVAILABLE', 
    icon: WifiOff, 
    color: 'text-red-400', 
    bg: 'bg-red-500/10 border-red-500/20',
    description: 'Signal lost. Multipath detected. Indoor / tunnel / urban canyon.',
    detail: 'Fallback triggered. PDR / inertial estimation activated.',
    status: 'UNAVAILABLE',
  },
  { 
    state: 'PDR / INERTIAL', 
    icon: Cpu, 
    color: 'text-amber-400', 
    bg: 'bg-amber-500/10 border-amber-500/20',
    description: 'Step counting + heading from IMU. Fused with last GPS. Drift: ~2% distance.',
    detail: 'Dead reckoning. Requires periodic GPS correction. Uncertainty grows with time.',
    status: 'DEGRADED',
  },
  { 
    state: 'FUSED EVIDENCE', 
    icon: RotateCcw, 
    color: 'text-blue-400', 
    bg: 'bg-blue-500/10 border-blue-500/20',
    description: 'Wi-Fi fingerprinting + BLE beacons + cell tower + barometric floor detection.',
    detail: 'Independent evidence fused via Bayesian filter. Corrects PDR drift.',
    status: 'DEGRADED',
  },
  { 
    state: 'LAST RELIABLE + UNCERTAINTY', 
    icon: AlertTriangle, 
    color: 'text-amber-400', 
    bg: 'bg-amber-500/10 border-amber-500/20',
    description: 'No reliable new estimate. Preserve last known: 28.6139°N, 77.2090°E ± 45m (growing).',
    detail: 'State preserved with explicit uncertainty. Timestamped. Flagged as stale.',
    status: 'DEGRADED',
  },
  { 
    state: 'SYNCHRONIZE ON RECOVERY', 
    icon: CheckCircle, 
    color: 'text-green-400', 
    bg: 'bg-green-500/10 border-green-500/20',
    description: 'GPS restored. Fuse new fix with preserved state. Resolve conflicts. Update uncertainty.',
    detail: 'CRDT-inspired merge. History retained for audit. Confidence restored.',
    status: 'AVAILABLE',
  },
];

export function LocationContinuity() {
  return (
    <section
      id="location-continuity"
      className="relative py-24 lg:py-32"
      aria-labelledby="location-heading"
    >
      <div className="section-container relative">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <span className="section-label">TECHNICAL SECTION</span>
          <h2 id="location-heading" className="section-heading mb-6">
            WHEN GPS DISAPPEARS, LOCATION SHOULDN'T BECOME MEANINGLESS
          </h2>
          <p className="section-subheading mx-auto">
            Guardian maintains the best available location estimate and its uncertainty when conventional positioning becomes unavailable.
          </p>
        </div>

        <div className="max-w-4xl mx-auto space-y-6" role="list" aria-label="Location continuity pipeline">
          {pipelineSteps.map((step, index) => (
            <motion.div
              key={step.state}
              initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ delay: index * 0.1 }}
              className={cn(
                'flex items-start gap-6 p-6 rounded-xl bg-background-elevated border',
                index % 2 === 0 ? 'border-border-primary' : 'border-accent-cyan/20 bg-accent-cyan/5'
              )}
              role="listitem"
            >
              <div className={cn('flex-shrink-0 w-14 h-14 rounded-xl flex items-center justify-center', step.bg)}>
                <step.icon className={cn('w-7 h-7', step.color)} aria-hidden="true" />
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <h3 className="font-semibold text-foreground-primary">{step.state}</h3>
                  <span className={cn('status-badge text-xs', step.status === 'AVAILABLE' && 'capability-available', step.status === 'DEGRADED' && 'capability-degraded', step.status === 'UNAVAILABLE' && 'capability-unavailable')}>
                    {step.status}
                  </span>
                </div>
                <p className="text-sm text-foreground-secondary mb-2">{step.description}</p>
                <p className="text-xs text-foreground-tertiary font-mono">{step.detail}</p>
              </div>
              {index < pipelineSteps.length - 1 && (
                <div className="flex flex-col items-center text-accent-cyan/50">
                  <ArrowRight className="w-6 h-6 rotate-90" aria-hidden="true" />
                  <span className="text-xs tracking-wider">THEN</span>
                </div>
              )}
            </motion.div>
          ))}
        </div>

        <div className="technical-line my-12" aria-hidden="true" />

        <div className="max-w-3xl mx-auto">
          <h3 className="text-2xl font-bold text-center mb-8">KEY PRINCIPLES</h3>
          
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            {[
              { icon: MapPin, title: 'Uncertainty is First-Class', desc: 'Every location estimate carries explicit uncertainty radius. Never a single point without confidence.' },
              { icon: Cpu, title: 'PDR is Fallback, Not Replacement', desc: 'Pedestrian Dead Reckoning drifts ~2%/distance. Requires periodic correction. Not a GPS substitute.' },
              { icon: RotateCcw, title: 'Fusion Over Single Source', desc: 'Wi-Fi, BLE, cell tower, barometric — each weak alone. Fused via Bayesian filter, they constrain uncertainty.' },
              { icon: CheckCircle, title: 'State Preservation', desc: 'When all estimation fails, preserve last reliable + growing uncertainty. Never discard. Sync on recovery.' },
            ].map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ delay: index * 0.1 }}
                className="card-hover p-6"
              >
                <div className="w-10 h-10 rounded-xl bg-accent-cyan/10 border border-accent-cyan/20 flex items-center justify-center mb-3">
                  <item.icon className="w-5 h-5 text-accent-cyan" aria-hidden="true" />
                </div>
                <h4 className="font-semibold text-foreground-primary mb-2">{item.title}</h4>
                <p className="text-sm text-foreground-tertiary">{item.desc}</p>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ delay: 0.5 }}
            className="p-6 rounded-xl bg-amber-500/5 border border-amber-500/10"
          >
            <div className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-accent-amber flex-shrink-0 mt-0.5" aria-hidden="true" />
              <div>
                <h4 className="font-semibold text-accent-amber mb-2">Honesty Notice</h4>
                <p className="text-sm text-foreground-tertiary">
                  Guardian does <strong>not</strong> imply perfect indoor positioning. PDR and fusion are research directions with known limitations.
                  Uncertainty grows without GPS correction. This section describes the <strong>conceptual pipeline</strong> — implementation maturity varies.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}