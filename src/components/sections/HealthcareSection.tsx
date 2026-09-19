'use client';

import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { Heart, Shield, Stethoscope, FileText, QrCode, Clock, MapPin, Users, AlertTriangle, CheckCircle, ArrowRight, MessageSquare, RotateCcw } from 'lucide-react';

const healthcareFlow = [
  { step: 1, label: 'Recognize', icon: Heart, desc: 'Multi-sensor detection: fall, impact, cardiac irregularity, inactivity. Risk assessment with confidence.' },
  { step: 2, label: 'Communicate', icon: MessageSquare, desc: 'Structured emergency alert: risk, location, agency, medical context. Multilingual per recipient.' },
  { step: 3, label: 'Preserve Context', icon: FileText, desc: 'Persistent emergency state: full history, actions, outcomes, failures. Survives reboot/partition.' },
  { step: 4, label: 'Adapt', icon: RotateCcw, desc: 'Capability reassessment: comms, location, battery, relay. Alternative pathways evaluated continuously.' },
  { step: 5, label: 'Facilitate Response', icon: Users, desc: 'Trusted contacts + emergency services + medical QR. Handoff package: state, context, location.' },
  { step: 6, label: 'Support Handoff', icon: Shield, desc: 'Responder acknowledgment. State sync. Recovery monitoring. Terminal condition detection.' },
];

const medicalContext = [
  { field: 'Allergies', example: 'Penicillin, Sulfa drugs', critical: true },
  { field: 'Blood Group', example: 'O+ (voluntarily provided)', critical: true },
  { field: 'Relevant Medications', example: 'Metoprolol 50mg, Warfarin 5mg', critical: true },
  { field: 'Medical Conditions', example: 'Atrial fibrillation, Hypertension', critical: true },
  { field: 'Emergency Profile', example: 'Fall risk, Cardiac history', critical: false },
  { field: 'Medical QR', example: 'Scannable code → full profile', critical: false },
  { field: 'Event Context', example: 'Fall detected, 3.2g impact, immobile 47s', critical: true },
  { field: 'Location', example: '28.6139°N, 77.2090°E ±12m', critical: true },
  { field: 'Timestamp', example: '2026-09-19T14:31:04.123Z', critical: true },
  { field: 'Confidence', example: 'Risk: HIGH (92%), Agency: NON-RESPONSIVE', critical: true },
];

export function HealthcareSection() {
  return (
    <section
      id="healthcare"
      className="relative py-24 lg:py-32"
      aria-labelledby="healthcare-heading"
    >
      <div className="section-container relative">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <span className="section-label">HEALTHCARE INTEGRATION</span>
          <h2 id="healthcare-heading" className="section-heading mb-6">
            EMERGENCY RESPONSE IS PART OF HEALTHCARE
          </h2>
          <p className="section-subheading mx-auto">
            The period between an emergency and professional care can be disrupted by loss of human agency, communication, location, information or device resources.
          </p>
        </div>

        <div className="max-w-5xl mx-auto space-y-12">
          <div>
            <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
              <Heart className="w-6 h-6 text-accent-cyan" aria-hidden="true" />
              Guardian's Role in Pre-Hospital Emergency Response
            </h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4" role="list">
              {healthcareFlow.map((step, index) => (
                <motion.div
                  key={step.step}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-50px' }}
                  transition={{ delay: index * 0.08 }}
                  className="card-hover p-6 relative"
                  role="listitem"
                >
                  <div className="absolute top-4 right-4 w-8 h-8 rounded-full bg-accent-cyan/10 border border-accent-cyan/20 flex items-center justify-center text-accent-cyan font-bold text-sm">
                    {step.step}
                  </div>
                  <div className="w-10 h-10 rounded-xl bg-accent-cyan/10 border border-accent-cyan/20 flex items-center justify-center mb-3">
                    <step.icon className="w-5 h-5 text-accent-cyan" aria-hidden="true" />
                  </div>
                  <h4 className="font-semibold text-foreground-primary mb-2">{step.label}</h4>
                  <p className="text-sm text-foreground-tertiary">{step.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>

          <div className="technical-line" aria-hidden="true" />

          <div className="grid lg:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                <QrCode className="w-6 h-6 text-accent-cyan" aria-hidden="true" />
                Critical Patient Context (Optional, Voluntary)
              </h3>
              <p className="text-foreground-secondary mb-6">
                Minimum actionable context for the appropriate recipient. Not a complete medical profile. User-controlled, opt-in.
              </p>
              <div className="space-y-3" role="list">
                {medicalContext.map((item, index) => (
                  <motion.div
                    key={item.field}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: '-50px' }}
                    transition={{ delay: index * 0.03 }}
                    className={cn('p-4 rounded-lg bg-background-elevated border flex items-center justify-between gap-4', item.critical ? 'border-red-500/20 bg-red-500/5' : 'border-border-primary')}
                    role="listitem"
                  >
                    <div className="flex items-center gap-3">
                      <div className={cn('w-8 h-8 rounded-lg flex items-center justify-center', item.critical ? 'bg-red-500/10' : 'bg-accent-cyan/10')}>
                        {item.critical ? <AlertTriangle className="w-4 h-4 text-red-400" /> : <CheckCircle className="w-4 h-4 text-accent-cyan" />}
                      </div>
                      <div>
                        <p className="font-medium text-foreground-primary text-sm">{item.field}</p>
                        <p className="text-xs text-foreground-tertiary font-mono">{item.example}</p>
                      </div>
                    </div>
                    {item.critical && (
                      <span className="status-badge text-xs bg-red-500/20 text-red-400 border-red-500/30">CRITICAL</span>
                    )}
                  </motion.div>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                <Stethoscope className="w-6 h-6 text-accent-cyan" aria-hidden="true" />
                Medical QR — Handoff Package
              </h3>
              <p className="text-foreground-secondary mb-6">
                Scannable QR code contains encrypted emergency profile. First responders scan → immediate access to critical context.
              </p>
              <div className="card-hover p-6 text-center">
                <div className="w-32 h-32 mx-auto mb-4 rounded-lg bg-background-elevated border border-border-primary flex items-center justify-center relative overflow-hidden">
                  <div className="grid grid-cols-4 grid-rows-4 gap-1">
                    {[...Array(16)].map((_, i) => (
                      <div key={i} className={i % 2 === 0 ? 'bg-foreground-primary' : 'bg-background-primary'} />
                    ))}
                  </div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <QrCode className="w-16 h-16 text-accent-cyan opacity-50" aria-hidden="true" />
                  </div>
                </div>
                <p className="text-sm text-foreground-tertiary mb-4">QR Code Placeholder — Actual implementation generates encrypted payload</p>
                <div className="grid sm:grid-cols-2 gap-3 text-left">
                  <div className="p-3 rounded-lg bg-background-secondary border border-border-primary">
                    <p className="font-mono text-xs text-foreground-muted">Payload:</p>
                    <p className="font-mono text-xs text-foreground-primary">guardian://emergency/EMG-20260919-143104-A7K9</p>
                  </div>
                  <div className="p-3 rounded-lg bg-background-secondary border border-border-primary">
                    <p className="font-mono text-xs text-foreground-muted">Contains:</p>
                    <p className="font-mono text-xs text-foreground-primary">Emergency ID + Access Token (time-limited)</p>
                  </div>
                </div>
              </div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ delay: 0.3 }}
                className="mt-6 p-4 rounded-lg bg-amber-500/5 border border-amber-500/10"
              >
                <div className="flex items-start gap-2">
                  <AlertTriangle className="w-4 h-4 text-accent-amber flex-shrink-0 mt-0.5" aria-hidden="true" />
                  <div>
                    <h4 className="font-semibold text-accent-amber mb-1">No Diagnosis or Treatment Claims</h4>
                    <p className="text-sm text-foreground-tertiary">
                      Guardian does not diagnose, recommend treatment, or replace medical professionals. 
                      It communicates <strong>voluntarily provided context</strong> to appropriate recipients.
                    </p>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}