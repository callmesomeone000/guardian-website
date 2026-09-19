'use client';

import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { Heart, Shield, Cloud, WifiOff, MapPin, Battery, Users, RotateCcw, ArrowRight, CheckCircle, AlertTriangle, Target } from 'lucide-react';

const sihFrames = [
  { label: 'Problem Statement', icon: AlertTriangle, desc: 'Healthcare emergency response disrupted by loss of human agency, communication, location, information, or device resources.' },
  { label: 'Target Domain', icon: Target, desc: 'Pre-hospital emergency response / Critical health and safety. Personal emergency continuity during infrastructure disruption.' },
  { label: 'Innovation', icon: Shield, desc: 'Failure-aware adaptive safety architecture. Not just detection — continuous adaptation until recovery.' },
  { label: 'Impact', icon: Heart, desc: 'When a person cannot ask for help, Guardian asks for help on their behalf. Adapts as conditions change.' },
];

const alignmentFlow = [
  { step: 1, label: 'Personal Emergency', icon: Heart, desc: 'Fall, cardiac event, accident — person may be alone, unconscious, or unable to use phone' },
  { step: 2, label: 'Reduced Human Agency', icon: Users, desc: 'User cannot respond, confirm, or manage. Guardian detects non-responsiveness automatically.' },
  { step: 3, label: 'Infrastructure / Capability Failure', icon: Cloud, desc: 'Cellular down, GPS blocked, battery critical, internet unavailable — simultaneously' },
  { step: 4, label: 'Adaptive Response', icon: RotateCcw, desc: 'Guardian reassesses capabilities, discovers alternatives (relay, PDR, persistence), acts on best viable path' },
  { step: 5, label: 'Continuity', icon: Shield, desc: 'Emergency state preserved, communicated via alternative paths, synchronized on recovery. No single point of failure.' },
];

export function SIHAlignment() {
  return (
    <section
      id="sih-alignment"
      className="relative py-24 lg:py-32"
      aria-labelledby="sih-heading"
    >
      <div className="section-container relative">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <span className="section-label">SIH 2026</span>
          <h2 id="sih-heading" className="section-heading mb-6">
            SIH ALIGNMENT
          </h2>
          <p className="section-subheading mx-auto">
            Guardian framed around healthcare emergency response and disaster/infrastructure disruption. Problem-driven, not feature-driven.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto mb-16">
          {sihFrames.map((frame, index) => (
            <motion.div
              key={frame.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ delay: index * 0.1 }}
              className="card-hover p-6 text-center"
            >
              <div className="w-12 h-12 mx-auto mb-3 rounded-xl bg-accent-cyan/10 border border-accent-cyan/20 flex items-center justify-center">
                <frame.icon className="w-6 h-6 text-accent-cyan" aria-hidden="true" />
              </div>
              <h3 className="font-semibold text-foreground-primary mb-2">{frame.label}</h3>
              <p className="text-sm text-foreground-tertiary">{frame.desc}</p>
            </motion.div>
          ))}
        </div>

        <div className="max-w-4xl mx-auto">
          <h3 className="text-2xl font-bold text-center mb-8">THE ALIGNMENT FLOW</h3>
          
          <div className="space-y-6" role="list" aria-label="SIH alignment flow">
            {alignmentFlow.map((step, index) => (
              <motion.div
                key={step.step}
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
                <div className={cn('flex-shrink-0 w-12 h-12 rounded-xl flex items-center justify-center',
                  index % 2 === 0 ? 'bg-border-primary' : 'bg-accent-cyan/10 border border-accent-cyan/20'
                )}>
                  <step.icon className={cn('w-6 h-6', index % 2 === 0 ? 'text-foreground-tertiary' : 'text-accent-cyan')} aria-hidden="true" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-2xl font-bold text-accent-cyan">{step.step}</span>
                    <h4 className="font-semibold text-foreground-primary">{step.label}</h4>
                  </div>
                  <p className="text-sm text-foreground-tertiary">{step.desc}</p>
                </div>
                {index < alignmentFlow.length - 1 && (
                  <div className="flex flex-col items-center text-accent-cyan/50">
                    <ArrowRight className="w-6 h-6 rotate-90" aria-hidden="true" />
                  </div>
                )}
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ delay: 0.8 }}
            className="mt-12 p-6 rounded-xl bg-accent-cyan/5 border border-accent-cyan/20 text-center"
          >
            <h4 className="font-semibold text-accent-cyan mb-3">SIH 2026 Problem Statement Fit</h4>
            <p className="text-foreground-secondary">
              Guardian directly addresses: <strong>"Adaptive emergency response when human agency and infrastructure fail simultaneously."</strong>
              Measurable: detection latency, adaptation success rate, delivery rate under failure, state persistence integrity.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}