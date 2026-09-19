'use client';

import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { Shield, Lock, Database, Eye, EyeOff, AlertTriangle, CheckCircle, XCircle, Users, Cloud, Key } from 'lucide-react';

const privacyPrinciples = [
  { icon: Shield, title: 'Collect Less', desc: 'Only data necessary for emergency response. No tracking, profiling, or analytics beyond safety.' },
  { icon: Lock, title: 'Expose Less', desc: 'Emergency data encrypted at rest. Transmission minimized. Recipient sees only their relevant portion.' },
  { icon: Database, title: 'Retain Less', desc: 'Emergency state auto-expires after handoff. User controls deletion. No indefinite storage.' },
  { icon: EyeOff, title: 'Decide Locally', desc: 'Critical emergency decisions run on-device. No cloud AI required for core loop.' },
  { icon: Users, title: 'Controlled Access', desc: 'Trusted contacts opt-in. Medical context voluntary. Emergency services only during active emergency.' },
  { icon: Key, title: 'User Sovereignty', desc: 'User owns their data. Export, delete, revoke access anytime. Transparent permissions.' },
];

const prototypeVsProduction = [
  { aspect: 'Authentication', prototype: 'Firebase Auth (email/phone)', production: 'Hardware-backed keystore, biometric, FIDO2, certificate pinning' },
  { aspect: 'Encryption', prototype: 'AES-256 local, TLS 1.3 transit', production: 'Hardware-backed keys, key rotation, forward secrecy, HSM-backed cloud keys' },
  { aspect: 'Database Rules', prototype: 'Basic Firestore rules', production: 'Row-level security, audit logging, immutable emergency logs, geographic replication' },
  { aspect: 'Logging', prototype: 'Console + Firebase Crashlytics', production: 'Structured audit logs, tamper-evident, SIEM integration, retention policies' },
  { aspect: 'Retention', prototype: 'Manual cleanup', production: 'Auto-expiry: emergency state 30d post-handoff, logs 90d, analytics 1yr anonymized' },
  { aspect: 'Security Testing', prototype: 'Internal review', production: 'Penetration testing, code audit, bug bounty, compliance (HIPAA-adjacent, GDPR)' },
];

export function SecurityPrivacy() {
  return (
    <section
      id="security-privacy"
      className="relative py-24 lg:py-32"
      aria-labelledby="security-heading"
    >
      <div className="section-container relative">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <span className="section-label">SECURITY & PRIVACY</span>
          <h2 id="security-heading" className="section-heading mb-6">
            CORE PHILOSOPHY: COLLECT LESS. EXPOSE LESS. RETAIN LESS.
          </h2>
          <p className="section-subheading mx-auto">
            Emergency data is sensitive. Critical decisions should not depend on cloud AI. AI should be assistive. Access should be controlled.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto mb-16">
          {privacyPrinciples.map((principle, index) => (
            <motion.div
              key={principle.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ delay: index * 0.1 }}
              className="card-hover p-6 text-center"
            >
              <div className="w-12 h-12 mx-auto mb-3 rounded-xl bg-accent-cyan/10 border border-accent-cyan/20 flex items-center justify-center">
                <principle.icon className="w-6 h-6 text-accent-cyan" aria-hidden="true" />
              </div>
              <h3 className="font-semibold text-foreground-primary mb-2">{principle.title}</h3>
              <p className="text-sm text-foreground-tertiary">{principle.desc}</p>
            </motion.div>
          ))}
        </div>

        <div className="technical-line my-12" aria-hidden="true" />

        <div className="max-w-4xl mx-auto">
          <h3 className="text-2xl font-bold text-center mb-8">Current Prototype vs Production Requirements</h3>
          
          <div className="overflow-x-auto mb-8">
            <table className="w-full" role="table" aria-label="Prototype vs production security comparison">
              <thead>
                <tr className="border-b border-border-secondary">
                  <th className="text-left p-4 font-semibold text-foreground-primary">Aspect</th>
                  <th className="text-left p-4 font-semibold text-foreground-primary">Current Prototype</th>
                  <th className="text-left p-4 font-semibold text-foreground-primary">Production Requirements</th>
                </tr>
              </thead>
              <tbody>
                {prototypeVsProduction.map((row, index) => (
                  <motion.tr
                    key={row.aspect}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-50px' }}
                    transition={{ delay: index * 0.05 }}
                    className={cn('border-b border-border-primary/50', index % 2 === 0 ? 'bg-background-secondary/30' : '')}
                  >
                    <td className="p-4 font-medium text-foreground-primary">{row.aspect}</td>
                    <td className="p-4 text-foreground-secondary font-mono text-sm">{row.prototype}</td>
                    <td className="p-4 text-foreground-tertiary text-sm">{row.production}</td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
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
                <h4 className="font-semibold text-accent-amber mb-2">Honest Boundaries</h4>
                <p className="text-sm text-foreground-tertiary mb-2">
                  <strong>Never claim:</strong> "completely secure" or "impossible to hack"
                </p>
                <p className="text-sm text-foreground-tertiary">
                  Security is a process, not a state. This prototype demonstrates the architecture. 
                  Production hardening requires dedicated security engineering, audit, and compliance work.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}