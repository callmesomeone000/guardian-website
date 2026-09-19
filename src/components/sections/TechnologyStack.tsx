'use client';

import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { Smartphone, Server, Database, Cpu, Cloud, Zap, Shield, Globe, Wifi, Bluetooth, Satellite, Brain, Clock, AlertTriangle } from 'lucide-react';

const techStack = [
  { technology: 'Flutter', purpose: 'Cross-platform mobile interface (Android primary). Material 3. Dart.', icon: Smartphone, status: 'WORKING PROTOTYPE' },
  { technology: 'Android Sensors', purpose: 'Physical-event evidence: accelerometer, gyroscope, barometer, microphone, GNSS.', icon: Cpu, status: 'WORKING PROTOTYPE' },
  { technology: 'Python', purpose: 'Risk computation, Bayesian fusion, decision logic. Runs via Chaquopy on device.', icon: Server, status: 'WORKING PROTOTYPE' },
  { technology: 'FastAPI', purpose: 'Backend coordination: state sync, contact management, experiment logging.', icon: Server, status: 'WORKING PROTOTYPE' },
  { technology: 'Firebase', purpose: 'Application data: user profiles, contacts, emergency state cloud backup, analytics.', icon: Cloud, status: 'WORKING PROTOTYPE' },
  { technology: 'Google Maps', purpose: 'Location visualization in dashboard. Not used for core positioning.', icon: Globe, status: 'WORKING PROTOTYPE' },
  { technology: 'Gemini / AI Layer', purpose: 'Assistive intelligence: risk explanation, contact suggestions, anomaly description. NOT decision authority.', icon: Brain, status: 'EXPERIMENTAL' },
  { technology: 'BLE / Relay Layer', purpose: 'Cooperative communication research: Guardian-to-Guardian mesh, store-and-forward, peer discovery.', icon: Bluetooth, status: 'EXPERIMENTAL' },
  { technology: 'Android Platform', purpose: 'Emergency dialer, SMS, permissions, foreground service, battery optimization, WorkManager.', icon: Smartphone, status: 'WORKING PROTOTYPE' },
  { technology: 'Chaquopy', purpose: 'Python runtime on Android. Enables on-device risk/decision logic without cloud dependency.', icon: Cpu, status: 'WORKING PROTOTYPE' },
  { technology: 'SQLite / Room', purpose: 'Local durable storage: emergency state, action log, experiment data, contacts.', icon: Database, status: 'WORKING PROTOTYPE' },
  { technology: 'WorkManager', purpose: 'Background tasks: capability scanning, retry scheduling, state sync, battery-aware.', icon: Clock, status: 'WORKING PROTOTYPE' },
];

export function TechnologyStack() {
  return (
    <section
      id="technology"
      className="relative py-24 lg:py-32"
      aria-labelledby="tech-heading"
    >
      <div className="section-container relative">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <span className="section-label">TECHNOLOGY</span>
          <h2 id="tech-heading" className="section-heading mb-6">
            TECHNOLOGY → PURPOSE
          </h2>
          <p className="section-subheading mx-auto">
            Not just logos. Each technology maps to a specific architectural purpose. Only technologies actually used.
          </p>
        </div>

        <div className="max-w-5xl mx-auto">
          <div className="overflow-x-auto mb-8">
            <table className="w-full" role="table" aria-label="Technology stack with purposes">
              <thead>
                <tr className="border-b border-border-secondary">
                  <th className="text-left p-4 font-semibold text-foreground-primary">Technology</th>
                  <th className="text-left p-4 font-semibold text-foreground-primary">Purpose in Guardian</th>
                  <th className="text-left p-4 font-semibold text-foreground-primary">Status</th>
                </tr>
              </thead>
              <tbody>
                {techStack.map((item, index) => (
                  <motion.tr
                    key={item.technology}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-50px' }}
                    transition={{ delay: index * 0.03 }}
                    className={cn('border-b border-border-primary/50', index % 2 === 0 ? 'bg-background-secondary/30' : '')}
                  >
                    <td className="p-4 flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-accent-cyan/10 border border-accent-cyan/20 flex items-center justify-center">
                        <item.icon className="w-5 h-5 text-accent-cyan" aria-hidden="true" />
                      </div>
                      <span className="font-medium text-foreground-primary">{item.technology}</span>
                    </td>
                    <td className="p-4 text-foreground-secondary">{item.purpose}</td>
                    <td className="p-4">
                      <span className={cn('status-badge',
                        item.status === 'WORKING PROTOTYPE' && 'status-working-prototype',
                        item.status === 'EXPERIMENTAL' && 'status-experimental',
                        item.status === 'RESEARCH DIRECTION' && 'status-research-direction'
                      )}>
                        {item.status}
                      </span>
                    </td>
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
            <h4 className="font-semibold text-accent-amber mb-3 flex items-center gap-2">
              <AlertTriangle className="w-5 h-5" aria-hidden="true" />
              Architecture Notes
            </h4>
            <ul className="space-y-2 text-sm text-foreground-tertiary">
              <li className="flex items-center gap-2"><Shield className="w-4 h-4 text-accent-cyan" aria-hidden="true" /> Critical emergency decisions run ON-DEVICE (Python via Chaquopy). No cloud AI dependency.</li>
              <li className="flex items-center gap-2"><Zap className="w-4 h-4 text-accent-cyan" aria-hidden="true" /> AI (Gemini) is ASSISTIVE only — explains risk, suggests contacts, describes anomalies. Never the decision authority.</li>
              <li className="flex items-center gap-2"><Bluetooth className="w-4 h-4 text-accent-cyan" aria-hidden="true" /> BLE relay is research-grade. Not production mesh. 2-hop tested. Requires both devices running Guardian.</li>
              <li className="flex items-center gap-2"><Cloud className="w-4 h-4 text-accent-cyan" aria-hidden="true" /> Firebase used for: contact sync, optional state backup, experiment logging. Core loop works offline.</li>
              <li className="flex items-center gap-2"><Satellite className="w-4 h-4 text-accent-cyan" aria-hidden="true" /> Satellite messaging: RESEARCH DIRECTION. API evaluation only (Iridium, Globalstar, Starlink). Not implemented.</li>
            </ul>
          </motion.div>
        </div>
      </div>
    </section>
  );
}