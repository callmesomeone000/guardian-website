'use client';

import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

const assumptions = [
  { 
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.146 11.08a24.474 24.474 0 010-4.616l-5.648-2.694a.504.504 0 00-.632.002L7.37 8.22a24.474 24.474 0 010 7.556l4.518 2.156a.504.504 0 00.395-.145l2.874-5.178z" />
      </svg>
    ), 
    label: 'User can respond', 
    description: 'The person is conscious and able to interact with the device' 
  },
  { 
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
      </svg>
    ), 
    label: 'Communication exists', 
    description: 'Cellular or internet connectivity is available' 
  },
  { 
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ), 
    label: 'GPS is available', 
    description: 'Precise location can be determined' 
  },
  { 
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.19 8.688a4.501 4.501 0 011.242 7.244l-4.5 4.5a4.5 4.5 0 01-6.364-6.364l1.757-1.757a1.5 1.5 0 012.121 2.121l-1.757 1.757a1.5 1.5 0 002.121 2.121l4.5-4.5a1.5 1.5 0 00-2.121-2.121l-1.757 1.757a4.5 4.5 0 006.364 6.364l1.757-1.757a1.5 1.5 0 012.121 2.121l-1.757 1.757a1.5 1.5 0 002.121 2.121l4.5-4.5a1.5 1.5 0 00-2.121-2.121l-1.757 1.757a4.5 4.5 0 00-6.364 6.364l1.757-1.757a1.5 1.5 0 01-2.121 2.121l-1.757-1.757a1.5 1.5 0 00-2.121-2.121l-4.5 4.5a1.5 1.5 0 01-2.121-2.121l1.757-1.757a4.5 4.5 0 01-6.364-6.364l4.5-4.5a1.5 1.5 0 012.121 2.121l1.757 1.757a4.5 4.5 0 016.364-6.364l-4.5 4.5a1.5 1.5 0 01-2.121 2.121l-1.757-1.757a1.5 1.5 0 00-2.121-2.121l-4.5-4.5a1.5 1.5 0 00-2.121 2.121l4.5 4.5a4.5 4.5 0 006.364 6.364l-1.757 1.757a1.5 1.5 0 01-2.121-2.121z" />
      </svg>
    ), 
    label: 'Device has power', 
    description: 'Battery level supports continued operation' 
  },
  { 
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
      </svg>
    ), 
    label: 'Information transmits', 
    description: 'Data can reach emergency services or contacts' 
  },
  { 
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
      </svg>
    ), 
    label: 'Infrastructure remains', 
    description: 'Networks, towers, and services stay operational' 
  },
];

const cascadeSteps = [
  { step: 1, label: 'Emergency occurs', detail: 'Fall, impact, or medical event detected', state: 'normal' },
  { step: 2, label: 'User unable to respond', detail: 'Unconscious, incapacitated, or separated from device', state: 'failure' },
  { step: 3, label: 'Communication unavailable', detail: 'Cellular network down, no internet, dead zone', state: 'failure' },
  { step: 4, label: 'Location degraded', detail: 'GPS blocked, indoor, multipath, or spoofed', state: 'failure' },
  { step: 5, label: 'Device constrained', detail: 'Battery critical, thermal throttling, storage full', state: 'failure' },
  { step: 6, label: 'Normal pathway breaks', detail: 'Conventional SOS fails — no fallback exists', state: 'critical' },
];

export function ProblemSection() {
  return (
    <section
      id="why-guardian"
      className="relative py-24 lg:py-32"
      aria-labelledby="problem-heading"
    >
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-accent-cyan/5 to-transparent" aria-hidden="true" />
      
      <div className="section-container relative">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <span className="section-label">THE PROBLEM</span>
          <h2 id="problem-heading" className="section-heading mb-6">
            AN EMERGENCY DOESN'T HAPPEN IN A PERFECT SYSTEM.
          </h2>
          <p className="section-subheading mx-auto">
            Every conventional emergency response relies on a chain of assumptions. When any link breaks, the entire response fails.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {assumptions.map((assumption, index) => (
            <motion.div
              key={assumption.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ delay: index * 0.1 }}
              className="card-hover p-6 group"
            >
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-accent-cyan/10 border border-accent-cyan/20 flex items-center justify-center group-hover:border-accent-cyan/50 transition-colors">
                  {assumption.icon}
                </div>
                <div>
                  <h3 className="font-semibold text-foreground-primary mb-1">{assumption.label}</h3>
                  <p className="text-sm text-foreground-tertiary">{assumption.description}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="technical-line my-12" aria-hidden="true" />

        <div className="max-w-4xl mx-auto">
          <h3 className="text-2xl font-bold text-center mb-8">THE CASCADE</h3>
          
          <div className="space-y-4" role="list" aria-label="Failure cascade steps">
            {cascadeSteps.map((step, index) => (
              <motion.div
                key={step.step}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ delay: index * 0.15 }}
                className={cn(
                  'flex items-start gap-4 p-4 rounded-xl bg-background-elevated border',
                  step.state === 'failure' && 'border-border-secondary bg-red-500/5',
                  step.state === 'critical' && 'border-accent-red/30 bg-red-500/10',
                  step.state === 'normal' && 'border-border-primary'
                )}
                role="listitem"
              >
                <div className={cn(
                  'flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm',
                  step.state === 'critical' ? 'bg-accent-red text-white' : 
                  step.state === 'failure' ? 'bg-accent-amber text-background-primary' : 
                  'bg-accent-cyan text-background-primary'
                )}>
                  {step.step}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-1">
                    <h4 className="font-semibold text-foreground-primary">{step.label}</h4>
                    {step.state === 'failure' && (
                      <span className="status-badge bg-red-500/20 text-red-400 border border-red-500/30 text-xs">
                        ASSUMPTION BROKEN
                      </span>
                    )}
                    {step.state === 'critical' && (
                      <span className="status-badge bg-accent-red/20 text-accent-red border border-accent-red/30 text-xs">
                        PATHWAY BROKEN
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-foreground-tertiary">{step.detail}</p>
                </div>
                {index < cascadeSteps.length - 1 && (
                  <div className="flex flex-col items-center text-foreground-muted">
                    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                      <path d="M12 5v14M19 12H5" />
                    </svg>
                    <span className="text-xs tracking-wider">THEN</span>
                  </div>
                )}
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ delay: 1 }}
            className="mt-12 p-6 rounded-xl bg-accent-cyan/5 border border-accent-cyan/20 text-center"
          >
            <p className="text-lg font-medium text-accent-cyan mb-2">WHAT HAPPENS NEXT?</p>
            <p className="text-foreground-secondary">
              Conventional systems stop. Guardian reassesses, adapts, and continues.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}