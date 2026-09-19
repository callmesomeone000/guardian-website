'use client';

import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { BadgeCheck, FlaskConical, Search, AlertTriangle, CheckCircle, XCircle, HelpCircle } from 'lucide-react';

const statusDefinitions = [
  {
    label: 'WORKING PROTOTYPE',
    icon: BadgeCheck,
    color: 'text-green-400',
    bg: 'bg-green-500/10 border-green-500/20',
    badgeClass: 'bg-green-500/20 text-green-400 border-green-500/30',
    description: 'Actually implemented in the Guardian prototype. Code exists, runs on device, core functionality verified.',
    criteria: [
      'Code compiled and deployed to test devices',
      'Core functionality demonstrated',
      'Basic error handling present',
      'May lack polish, edge-case handling, or full test coverage',
    ],
    examples: ['Fall detection', 'Emergency countdown', 'SMS sending', 'Medical QR generation', 'Local state persistence'],
  },
  {
    label: 'EXPERIMENTAL',
    icon: FlaskConical,
    color: 'text-amber-400',
    bg: 'bg-amber-500/10 border-amber-500/20',
    badgeClass: 'bg-amber-500/20 text-amber-400 border-amber-500/30',
    description: 'Prototype/testing exists but is not fully validated. May work in controlled conditions but not production-ready.',
    criteria: [
      'Code exists and runs',
      'Limited testing (lab conditions, few devices)',
      'Known failure modes not fully characterized',
      'API/behavior may change significantly',
    ],
    examples: ['Guardian-to-Guardian relay', 'Human agency classification', 'Adaptive controller', 'PDR location fallback', 'Family dashboard'],
  },
  {
    label: 'RESEARCH DIRECTION',
    icon: Search,
    color: 'text-blue-400',
    bg: 'bg-blue-500/10 border-blue-500/20',
    badgeClass: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
    description: 'Conceptual or future work. Architecture defined, but no working implementation yet. Requires significant R&D.',
    criteria: [
      'Architecture/algorithm designed',
      'Literature review complete',
      'No working code or only proof-of-concept',
      'Requires dedicated research sprint',
    ],
    examples: ['Emergency Viability Engine', 'Location continuity (PDR/fusion)', 'Store-and-forward DTN', 'Counterfactual look-ahead', 'Satellite messaging'],
  },
];

export function StatusLabelSystem() {
  return (
    <section
      id="status-labels"
      className="relative py-24 lg:py-32"
      aria-labelledby="status-heading"
    >
      <div className="section-container relative">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <span className="section-label">METHODOLOGY</span>
          <h2 id="status-heading" className="section-heading mb-6">
            STATUS LABEL SYSTEM
          </h2>
          <p className="section-subheading mx-auto">
            Every significant feature, experiment, or capability carries exactly one label. Categories are never blurred.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto mb-16">
          {statusDefinitions.map((status, index) => (
            <motion.div
              key={status.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ delay: index * 0.1 }}
              className="card-hover p-6 relative"
            >
              <div className="absolute top-4 right-4">
                <span className={cn('status-badge', status.badgeClass)}>{status.label}</span>
              </div>
              
              <div className={cn('w-12 h-12 rounded-xl flex items-center justify-center mb-4', status.bg)}>
                <status.icon className={cn('w-6 h-6', status.color)} aria-hidden="true" />
              </div>
              
              <h3 className="font-semibold text-foreground-primary mb-3">{status.label}</h3>
              <p className="text-sm text-foreground-tertiary mb-4">{status.description}</p>
              
              <h4 className="font-medium text-foreground-secondary text-sm mb-2">Criteria</h4>
              <ul className="space-y-2 mb-4" role="list">
                {status.criteria.map((criterion, i) => (
                  <li key={i} className="flex items-center gap-2 text-xs text-foreground-tertiary">
                    <CheckCircle className="w-3 h-3 text-green-400 flex-shrink-0" aria-hidden="true" />
                    {criterion}
                  </li>
                ))}
              </ul>
              
              <h4 className="font-medium text-foreground-secondary text-sm mb-2">Examples</h4>
              <div className="flex flex-wrap gap-2">
                {status.examples.map((example, i) => (
                  <span key={i} className="px-2 py-1 text-xs rounded bg-background-secondary border border-border-primary text-foreground-tertiary">
                    {example}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        <div className="technical-line my-12" aria-hidden="true" />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          className="max-w-3xl mx-auto p-6 rounded-xl bg-accent-cyan/5 border border-accent-cyan/20 text-center"
        >
          <h4 className="font-semibold text-accent-cyan mb-3">Enforcement Rule</h4>
          <p className="text-foreground-secondary">
            <strong>Never blur these categories.</strong> A feature cannot be "mostly working" — it is either WORKING PROTOTYPE, EXPERIMENTAL, or RESEARCH DIRECTION. 
            This prevents the website from accidentally implying demonstrations are production systems.
          </p>
        </motion.div>
      </div>
    </section>
  );
}