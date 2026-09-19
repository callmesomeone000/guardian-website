'use client';

import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { ArrowRight, Check, X, Zap, Shield, RefreshCw, Wifi, Database, User } from 'lucide-react';

const conventionalSteps = [
  { id: 1, label: 'Incident', icon: Zap, description: 'Emergency event occurs', state: 'normal' },
  { id: 2, label: 'Detect', icon: Shield, description: 'Sensors identify the event', state: 'normal' },
  { id: 3, label: 'Alert', icon: User, description: 'Notification triggered', state: 'normal' },
  { id: 4, label: 'Communicate', icon: Wifi, description: 'Send via cellular/SMS', state: 'normal' },
  { id: 5, label: 'Respond', icon: Database, description: 'Help dispatched', state: 'normal' },
  { id: 6, label: 'STOP', icon: X, description: 'Communication fails — no fallback', state: 'failure' },
];

const guardianSteps = [
  { id: 1, label: 'Incident', icon: Zap, description: 'Emergency event occurs', state: 'normal' },
  { id: 2, label: 'Observe', icon: Shield, description: 'Multi-sensor evidence collection', state: 'normal' },
  { id: 3, label: 'Assess', icon: Database, description: 'Context, risk, uncertainty evaluated', state: 'normal' },
  { id: 4, label: 'Create State', icon: User, description: 'Persistent emergency state established', state: 'normal' },
  { id: 5, label: 'Assess Capabilities', icon: Wifi, description: 'Available/degraded/unavailable mapped', state: 'normal' },
  { id: 6, label: 'Adapt', icon: RefreshCw, description: 'Alternative pathways evaluated', state: 'normal' },
  { id: 7, label: 'Act', icon: ArrowRight, description: 'Best viable action executed', state: 'normal' },
  { id: 8, label: 'Update State', icon: Database, description: 'Outcome recorded, state persisted', state: 'normal' },
  { id: 9, label: 'Reassess', icon: RefreshCw, description: 'Continuous capability monitoring', state: 'normal' },
  { id: 10, label: 'Recover', icon: Check, description: 'Synchronize when pathways restore', state: 'normal' },
];

const comparisonData = [
  { conventional: 'Detect event', guardian: 'Understand evolving emergency' },
  { conventional: 'Trigger response', guardian: 'Maintain emergency state' },
  { conventional: 'Attempt communication', guardian: 'Assess communication capability' },
  { conventional: 'Assume infrastructure', guardian: 'Model infrastructure failure' },
  { conventional: 'User interaction when needed', guardian: 'Account for reduced human agency' },
  { conventional: 'Retry same path', guardian: 'Re-evaluate alternatives' },
  { conventional: 'Send information', guardian: 'Prioritize actionable information' },
  { conventional: 'Response ends', guardian: 'Continue until recovery / terminal condition' },
];

export function ConventionalVsGuardian() {
  return (
    <section
      id="conventional-vs-guardian"
      className="relative py-24 lg:py-32"
      aria-labelledby="comparison-heading"
    >
      <div className="section-container relative">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <span className="section-label">COMPARISON</span>
          <h2 id="comparison-heading" className="section-heading mb-6">
            CONVENTIONAL RESPONSE VS GUARDIAN
          </h2>
          <p className="section-subheading mx-auto">
            A simplified conventional response model compared against Guardian's adaptive architecture.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 mb-16">
          <div>
            <div className="mb-6 p-4 rounded-xl bg-red-500/5 border border-red-500/10">
              <div className="flex items-center gap-2 text-sm font-medium text-accent-red mb-4">
                <X className="w-5 h-5" aria-hidden="true" />
                <span>Simplified Conventional Response Model</span>
              </div>
              <p className="text-sm text-foreground-tertiary">
                This represents a generalized linear emergency flow. Not every existing product follows this exactly.
              </p>
            </div>

            <div className="space-y-3" role="list" aria-label="Conventional response steps">
              {conventionalSteps.map((step, index) => (
                <motion.div
                  key={step.id}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: '-50px' }}
                  transition={{ delay: index * 0.08 }}
                  className={cn(
                    'flex items-center gap-4 p-4 rounded-xl bg-background-elevated border',
                    step.state === 'failure' ? 'border-accent-red/30 bg-red-500/10' : 'border-border-primary'
                  )}
                  role="listitem"
                >
                  <div className={cn(
                    'flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center font-medium text-sm',
                    step.state === 'failure' ? 'bg-accent-red text-white' : 'bg-accent-cyan/10 text-accent-cyan border border-accent-cyan/20'
                  )}>
                    <step.icon className={cn('w-5 h-5', step.state === 'failure' ? 'text-white' : 'text-accent-cyan')} aria-hidden="true" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-foreground-primary">{step.label}</h4>
                    <p className="text-sm text-foreground-tertiary">{step.description}</p>
                  </div>
                  {index < conventionalSteps.length - 1 && (
                    <div className="flex flex-col items-center text-foreground-muted mx-2">
                      <ArrowRight className="w-5 h-5 rotate-90" aria-hidden="true" />
                    </div>
                  )}
                </motion.div>
              ))}
            </div>
          </div>

          <div>
            <div className="mb-6 p-4 rounded-xl bg-green-500/5 border border-green-500/10">
              <div className="flex items-center gap-2 text-sm font-medium text-accent-green mb-4">
                <Check className="w-5 h-5" aria-hidden="true" />
                <span>Guardian Adaptive Architecture</span>
              </div>
              <p className="text-sm text-foreground-tertiary">
                Failure-aware, stateful, continuous adaptation until recovery or terminal condition.
              </p>
            </div>

            <div className="space-y-3" role="list" aria-label="Guardian response steps">
              {guardianSteps.map((step, index) => (
                <motion.div
                  key={step.id}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: '-50px' }}
                  transition={{ delay: index * 0.06 }}
                  className="flex items-center gap-4 p-4 rounded-xl bg-background-elevated border border-border-primary"
                  role="listitem"
                >
                  <div className="flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center font-medium text-sm bg-accent-cyan/10 text-accent-cyan border border-accent-cyan/20">
                    <step.icon className="w-5 h-5 text-accent-cyan" aria-hidden="true" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-foreground-primary">{step.label}</h4>
                    <p className="text-sm text-foreground-tertiary">{step.description}</p>
                  </div>
                  {index < guardianSteps.length - 1 && (
                    <div className="flex flex-col items-center text-accent-cyan/50 mx-2">
                      <ArrowRight className="w-5 h-5 rotate-90" aria-hidden="true" />
                    </div>
                  )}
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        <div className="technical-line my-12" aria-hidden="true" />

        <div className="max-w-5xl mx-auto">
          <h3 className="text-2xl font-bold text-center mb-8">NOT JUST AN SOS APP</h3>
          
          <div className="overflow-x-auto">
            <table className="w-full" role="table" aria-label="Conventional vs Guardian logic comparison">
              <thead>
                <tr className="border-b border-border-secondary">
                  <th className="text-left p-4 font-semibold text-foreground-primary">Conventional Safety Logic</th>
                  <th className="text-left p-4 font-semibold text-foreground-primary">Guardian Logic</th>
                </tr>
              </thead>
              <tbody>
                {comparisonData.map((row, index) => (
                  <motion.tr
                    key={index}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-50px' }}
                    transition={{ delay: index * 0.05 }}
                    className={cn('border-b border-border-primary/50', index % 2 === 0 ? 'bg-background-secondary/30' : '')}
                  >
                    <td className="p-4 text-foreground-secondary font-mono text-sm">
                      {row.conventional}
                    </td>
                    <td className="p-4 text-foreground-primary font-medium text-sm">
                      {row.guardian}
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ delay: 0.5 }}
            className="mt-8 text-center text-lg font-medium text-accent-cyan"
          >
            Guardian treats failure as a new operating condition.
          </motion.p>
        </div>
      </div>
    </section>
  );
}