'use client';

import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { Cloud, WifiOff, Satellite, Battery, Cpu, Shield, RotateCcw, CheckCircle, AlertTriangle, ArrowRight, RefreshCw } from 'lucide-react';

const disasterFlow = [
  { step: 1, label: 'Disaster Strikes', icon: Cloud, desc: 'Earthquake, flood, storm — infrastructure damage widespread', state: 'normal' },
  { step: 2, label: 'Cellular Disruption', icon: WifiOff, desc: 'Towers down, power loss, congestion. Primary comms pathway broken', state: 'failure' },
  { step: 3, label: 'Internet Disruption', icon: WifiOff, desc: 'Fiber cuts, DNS failures, cloud unreachable. Backend pathways broken', state: 'failure' },
  { step: 4, label: 'GPS Uncertainty', icon: Satellite, desc: 'Ionospheric disturbance, spoofing, blocked sky view. Location degraded', state: 'failure' },
  { step: 5, label: 'Reduced Device Resources', icon: Battery, desc: 'No charging, thermal stress, background apps killed. Battery critical', state: 'failure' },
  { step: 6, label: 'Guardian Evaluates', icon: Shield, desc: 'Capability model reassesses: cellular=UNAVAILABLE, relay=SCANNING, battery=DEGRADED', state: 'adaptation' },
  { step: 7, label: 'Alternative Communication', icon: RotateCcw, desc: 'BLE mesh discovered. Peer-to-peer relay. Store-and-forward activated', state: 'adaptation' },
  { step: 8, label: 'State Preservation', icon: Cpu, desc: 'Emergency state written to durable storage. Non-critical sensors reduced', state: 'adaptation' },
  { step: 9, label: 'Recovery Monitoring', icon: RefreshCw, desc: 'Periodic capability scans. Cellular retry schedule. GPS re-acquisition attempts', state: 'recovery' },
  { step: 10, label: 'Infrastructure Restored', icon: CheckCircle, desc: 'Cellular returns. State synchronized. Relay peers released. Normal ops resume', state: 'recovery' },
];

export function DisasterStory() {
  return (
    <section
      id="disaster"
      className="relative py-24 lg:py-32"
      aria-labelledby="disaster-heading"
    >
      <div className="section-container relative">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <span className="section-label">DISASTER RESILIENCE</span>
          <h2 id="disaster-heading" className="section-heading mb-6">
            PERSONAL EMERGENCY CONTINUITY DURING INFRASTRUCTURE DISRUPTION
          </h2>
          <p className="section-subheading mx-auto">
            Guardian under disaster conditions. Not a replacement for disaster-response agencies — personal emergency continuity when infrastructure fails.
          </p>
        </div>

        <div className="max-w-4xl mx-auto space-y-4" role="list" aria-label="Disaster response flow">
          {disasterFlow.map((step, index) => (
            <motion.div
              key={step.step}
              initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ delay: index * 0.08 }}
              className={cn(
                'flex items-start gap-6 p-6 rounded-xl bg-background-elevated border',
                step.state === 'failure' && 'border-red-500/30 bg-red-500/5',
                step.state === 'adaptation' && 'border-accent-cyan/30 bg-accent-cyan/5',
                step.state === 'recovery' && 'border-green-500/30 bg-green-500/5',
                step.state === 'normal' && 'border-border-primary'
              )}
              role="listitem"
            >
              <div className={cn(
                'flex-shrink-0 w-12 h-12 rounded-xl flex items-center justify-center',
                step.state === 'failure' && 'bg-red-500/10',
                step.state === 'adaptation' && 'bg-accent-cyan/10',
                step.state === 'recovery' && 'bg-green-500/10',
                step.state === 'normal' && 'bg-border-primary'
              )}>
                <step.icon className={cn('w-6 h-6', 
                  step.state === 'failure' && 'text-red-400',
                  step.state === 'adaptation' && 'text-accent-cyan',
                  step.state === 'recovery' && 'text-green-400',
                  step.state === 'normal' && 'text-foreground-tertiary'
                )} aria-hidden="true" />
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-1">
                  <h4 className="font-semibold text-foreground-primary">{step.label}</h4>
                  {step.state === 'failure' && <span className="status-badge text-xs bg-red-500/20 text-red-400 border-red-500/30">FAILURE</span>}
                  {step.state === 'adaptation' && <span className="status-badge text-xs bg-accent-cyan/20 text-accent-cyan border-accent-cyan/30">ADAPT</span>}
                  {step.state === 'recovery' && <span className="status-badge text-xs bg-green-500/20 text-green-400 border-green-500/30">RECOVER</span>}
                </div>
                <p className="text-sm text-foreground-tertiary">{step.desc}</p>
              </div>
              {index < disasterFlow.length - 1 && (
                <div className="flex flex-col items-center text-foreground-muted">
                  <ArrowRight className="w-5 h-5 rotate-90" aria-hidden="true" />
                </div>
              )}
            </motion.div>
          ))}
        </div>

        <div className="technical-line my-12" aria-hidden="true" />

        <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {[
            { icon: Shield, title: 'Not a Disaster Agency Replacement', desc: 'Guardian does not replace 112/911, NDRF, Red Cross, or government systems. It operates at the personal level.' },
            { icon: RotateCcw, title: 'Personal Continuity Focus', desc: 'Keeps one person\'s emergency state alive and communicable when towers, power, and internet fail.' },
            { icon: AlertTriangle, title: 'Honest Limitations', desc: 'If ALL pathways are gone (no cellular, no peers, no satellite, dead battery), Guardian preserves state but cannot guarantee delivery.' },
          ].map((item, index) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ delay: index * 0.1 }}
              className="card-hover p-6 text-center"
            >
              <div className="w-12 h-12 mx-auto mb-3 rounded-xl bg-accent-cyan/10 border border-accent-cyan/20 flex items-center justify-center">
                <item.icon className="w-6 h-6 text-accent-cyan" aria-hidden="true" />
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
          className="mt-12 max-w-3xl mx-auto p-6 rounded-xl bg-accent-cyan/5 border border-accent-cyan/20 text-center"
        >
          <p className="text-lg font-medium text-accent-cyan mb-2">FRAMED FOR SIH 2026</p>
          <p className="text-foreground-secondary">
            Personal emergency continuity during infrastructure disruption — a concrete, testable problem statement with measurable adaptation behaviors.
          </p>
        </motion.div>
      </div>
    </section>
  );
}