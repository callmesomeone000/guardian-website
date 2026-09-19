'use client';

import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { User, MapPin, Wifi, Smartphone, Shield, ArrowRight } from 'lucide-react';

const failurePoints = [
  { icon: User, label: 'THE PERSON CAN FAIL.', detail: 'Unconscious, incapacitated, separated from device, unable to respond' },
  { icon: MapPin, label: 'THE LOCATION CAN FAIL.', detail: 'GPS blocked, indoor, multipath, spoofed, no signal' },
  { icon: Wifi, label: 'THE NETWORK CAN FAIL.', detail: 'Cellular down, internet out, congestion, tower damage, dead zone' },
  { icon: Smartphone, label: 'THE DEVICE CAN FAIL.', detail: 'Battery dead, thermal shutdown, storage full, OS crash, sensor failure' },
  { icon: Shield, label: 'THE SENSOR CAN FAIL.', detail: 'IMU noise, barometer drift, microphone blocked, hardware fault' },
];

export function FinalCTA() {
  return (
    <section
      id="final-cta"
      className="relative py-24 lg:py-32"
      aria-labelledby="final-heading"
    >
      <div className="section-container relative">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <span className="section-label">THE REALITY</span>
          <h2 id="final-heading" className="section-heading mb-6">
            EVERYTHING CAN FAIL.
          </h2>
          <p className="section-subheading mx-auto">
            Guardian is built on the assumption that failure is the condition — not the exception.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto mb-16">
          {failurePoints.map((point, index) => (
            <motion.div
              key={point.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ delay: index * 0.1 }}
              className="card-hover p-6 text-center group"
            >
              <div className="w-12 h-12 mx-auto mb-4 rounded-xl bg-red-500/10 border border-red-500/20 flex items-center justify-center group-hover:bg-red-500/20 group-hover:border-red-500/40 transition-colors">
                <point.icon className="w-6 h-6 text-red-400" aria-hidden="true" />
              </div>
              <h3 className="font-semibold text-foreground-primary mb-2">{point.label}</h3>
              <p className="text-sm text-foreground-tertiary">{point.detail}</p>
            </motion.div>
          ))}
        </div>

        <div className="technical-line my-12" aria-hidden="true" />

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          className="max-w-3xl mx-auto text-center space-y-8"
        >
          <div className="space-y-4">
            <p className="text-3xl lg:text-4xl font-bold tracking-tight text-foreground-primary">
              THE RESPONSE SHOULD NOT STOP TRYING TO ADAPT.
            </p>
            <p className="text-lg text-foreground-secondary">
              Failure is the condition. Adaptation is the mechanism. Continuity is the objective.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="/system" className="btn btn-primary btn-lg">
              Explore Guardian
              <ArrowRight className="w-5 h-5" aria-hidden="true" />
            </a>
            <a href="/evidence" className="btn btn-secondary btn-lg">
              View Evidence
            </a>
          </div>

          <div className="pt-8 border-t border-border-primary">
            <p className="text-foreground-muted text-sm">
              Not a production system. Student research prototype — SIH 2026.
              <a href="/#limitations" className="underline underline-offset-2 hover:text-accent-cyan ml-1">View limitations</a>
            </p>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ delay: 0.8 }}
          className="mt-16 max-w-3xl mx-auto p-8 rounded-2xl bg-gradient-to-r from-accent-cyan/5 via-transparent to-accent-blue/5 border border-accent-cyan/20 text-center"
        >
          <p className="text-lg font-medium text-accent-cyan mb-4">
            "Guardian is not built on the assumption that everything will work."
          </p>
          <p className="text-xl font-semibold text-foreground-primary mb-4">
            It is built to adapt when something doesn't.
          </p>
          <p className="text-foreground-secondary">
            <strong>Safety shouldn't stop when its assumptions do.</strong>
          </p>
        </motion.div>
      </div>
    </section>
  );
}