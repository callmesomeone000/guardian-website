'use client';

import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { Shield, AlertTriangle, Check, X, HelpCircle } from 'lucide-react';

const notJustSOSContent = [
  {
    title: 'Multi-Sensor Evidence',
    conventional: 'Single trigger (button press or simple threshold)',
    guardian: 'Fused evidence from accelerometer, gyroscope, barometer, audio, GPS, network, battery, interaction',
    status: 'WORKING PROTOTYPE' as const,
  },
  {
    title: 'Persistent Emergency State',
    conventional: 'Stateless — each event handled independently',
    guardian: 'Continuous state machine: risk, agency, location, communication, resources, failures, actions, outcomes',
    status: 'WORKING PROTOTYPE' as const,
  },
  {
    title: 'Human Agency Assessment',
    conventional: 'Assumes user can respond or presses SOS',
    guardian: 'Evaluates responsiveness: RESPONSIVE → UNCONFIRMED → NON-RESPONSIVE → UNKNOWN',
    status: 'EXPERIMENTAL' as const,
  },
  {
    title: 'Capability & Failure Model',
    conventional: 'No capability awareness — tries same path',
    guardian: 'Maps each capability: AVAILABLE / DEGRADED / UNAVAILABLE with history and resource cost',
    status: 'WORKING PROTOTYPE' as const,
  },
  {
    title: 'Adaptive Intelligence Controller',
    conventional: 'Fixed decision tree',
    guardian: 'Situation understanding, degradation awareness, failure memory, opportunity awareness, counterfactual look-ahead',
    status: 'EXPERIMENTAL' as const,
  },
  {
    title: 'Emergency Viability Engine',
    conventional: 'Does not exist',
    guardian: '"Which action best preserves emergency response viability under current conditions?"',
    status: 'RESEARCH DIRECTION' as const,
  },
  {
    title: 'Communication Resilience',
    conventional: 'Cellular/SMS only — fails silently',
    guardian: 'Cellular → Relay (Guardian-to-Guardian) → Store-and-forward → Satellite (research)',
    status: 'EXPERIMENTAL' as const,
  },
  {
    title: 'Location Continuity',
    conventional: 'GPS or nothing',
    guardian: 'GPS → PDR/Inertial → Fused evidence → Last reliable + uncertainty → Sync on recovery',
    status: 'RESEARCH DIRECTION' as const,
  },
  {
    title: 'Battery-Aware Operation',
    conventional: 'No power management during emergency',
    guardian: 'Prioritizes critical pathways, reduces non-essential sensing, preserves communication capacity',
    status: 'WORKING PROTOTYPE' as const,
  },
  {
    title: 'Multilingual Emergency Messages',
    conventional: 'Single language, fixed template',
    guardian: 'Structured data + localized human-readable text per recipient language preference',
    status: 'WORKING PROTOTYPE' as const,
  },
];

export function NotJustSOS() {
  return (
    <section
      id="not-just-sos"
      className="relative py-24 lg:py-32"
      aria-labelledby="not-just-sos-heading"
    >
      <div className="section-container relative">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <span className="section-label">DIFFERENTIATION</span>
          <h2 id="not-just-sos-heading" className="section-heading mb-6">
            "NOT JUST AN SOS APP"
          </h2>
          <p className="section-subheading mx-auto">
            Guardian is a failure-aware adaptive safety architecture — not a feature list. Each capability exists to serve the adaptive loop.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 max-w-6xl mx-auto">
          {notJustSOSContent.map((item, index) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ delay: index * 0.08 }}
              className="card-hover p-6 group"
            >
              <div className="flex items-start justify-between gap-4 mb-4">
                <h3 className="font-semibold text-foreground-primary flex-1 pr-4">{item.title}</h3>
                <span className={cn(
                  'status-badge flex-shrink-0',
                  item.status === 'WORKING PROTOTYPE' && 'status-working-prototype',
                  item.status === 'EXPERIMENTAL' && 'status-experimental',
                  item.status === 'RESEARCH DIRECTION' && 'status-research-direction'
                )}>
                  {item.status}
                </span>
              </div>
              
              <div className="space-y-3">
                <div className="p-3 rounded-lg bg-red-500/5 border border-red-500/10">
                  <div className="flex items-center gap-2 text-xs font-medium text-accent-red mb-1">
                    <X className="w-4 h-4" aria-hidden="true" />
                    Conventional
                  </div>
                  <p className="text-sm text-foreground-tertiary">{item.conventional}</p>
                </div>
                
                <div className="p-3 rounded-lg bg-green-500/5 border border-green-500/10">
                  <div className="flex items-center gap-2 text-xs font-medium text-accent-green mb-1">
                    <Check className="w-4 h-4" aria-hidden="true" />
                    Guardian
                  </div>
                  <p className="text-sm text-foreground-primary">{item.guardian}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ delay: 1 }}
          className="mt-16 max-w-3xl mx-auto p-6 rounded-xl bg-accent-cyan/5 border border-accent-cyan/20 text-center"
        >
          <p className="text-lg font-medium text-accent-cyan mb-2">THE CORE DIFFERENCE</p>
          <p className="text-foreground-secondary">
            Conventional safety apps assume the happy path. Guardian architectures for the failure path.
          </p>
        </motion.div>
      </div>
    </section>
  );
}