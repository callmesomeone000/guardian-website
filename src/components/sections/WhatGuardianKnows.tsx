'use client';

import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { CheckCircle, XCircle, AlertCircle, Eye, EyeOff, Brain, Shield, Wifi, MapPin, Battery, Database, Users, RotateCcw, Clock } from 'lucide-react';

const knows = [
  { category: 'Sensor Evidence', items: ['Accelerometer/gyroscope/barometer readings', 'Audio spectral features (not raw audio)', 'GNSS quality metrics (satellites, HDOP, CN0)', 'Network state (RSRP, RSRQ, registration)', 'Battery level, temperature, charge state', 'Touch/voice/motion interaction events'] },
  { category: 'Event Timing', items: ['Impact timestamp (ms precision)', 'Escalation timer state', 'Action execution timestamps', 'Capability change timestamps', 'State transition timestamps'] },
  { category: 'Risk Estimate', items: ['Risk level: LOW/MODERATE/HIGH/CRITICAL', 'Confidence interval for risk', 'Contributing evidence factors', 'Risk trajectory (increasing/stable/decreasing)'] },
  { category: 'User Interaction State', items: ['Agency: RESPONSIVE/UNCONFIRMED/NON-RESPONSIVE/UNKNOWN', 'Countdown remaining', 'Last user interaction', 'Escalation stage reached'] },
  { category: 'Location Estimate', items: ['Current best location (lat/lng)', 'Location source: GPS/PDR/fused/last', 'Uncertainty radius (meters)', 'Location freshness (seconds ago)', 'Location confidence: HIGH/MODERATE/LOW/NONE'] },
  { category: 'Communication Availability', items: ['Per-pathway state: cellular/relay/internet', 'Signal quality metrics', 'Last successful transmission', 'Retry schedule and backoff', 'Peer discovery status (BLE mesh)'] },
  { category: 'Resource State', items: ['Battery percentage', 'Thermal state', 'Storage available', 'CPU quota remaining', 'Sensor duty cycle status'] },
  { category: 'Previous Action Outcomes', items: ['Action history with outcomes', 'Success/failure per pathway', 'Latency measurements', 'Rationale for each decision', 'Counterfactual evaluations'] },
];

const notKnows = [
  { category: 'Medical Certainty', items: ['Whether user is definitely unconscious', 'Exact medical diagnosis', 'Injury severity', 'Physiological vital signs (unless provided)', 'Whether user needs specific medical intervention'] },
  { category: 'Delivery Guarantees', items: ['Whether every message is guaranteed delivered', 'Whether recipient has read/acted on message', 'Exact delivery timestamp (only sent/acked)', 'Network-level ACK vs application-level'] },
  { category: 'Location Precision', items: ['Whether GPS is always accurate', 'Exact indoor position without infrastructure', 'Floor level in multi-story buildings', 'Real-time position during GPS outage (only estimate)'] },
  { category: 'Network Assumptions', items: ['Whether arbitrary nearby phones can relay', 'Whether all Android devices support BLE mesh', 'Peer battery/connectivity/willingness', 'Relay hop count beyond 2 hops'] },
  { category: 'Responder Status', items: ['Whether emergency service has actually arrived', 'Responder ETA', 'Hospital capacity/readiness', 'Whether handoff completed successfully'] },
  { category: 'Medical Inference', items: ['Whether user\'s medical condition is correctly inferred', 'Automatic diagnosis from sensors', 'Medication adherence', 'Allergy/condition accuracy (user-provided only)'] },
];

export function WhatGuardianKnows() {
  return (
    <section
      id="knows-doesnt-know"
      className="relative py-24 lg:py-32"
      aria-labelledby="knows-heading"
    >
      <div className="section-container relative">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <span className="section-label">CREDIBILITY</span>
          <h2 id="knows-heading" className="section-heading mb-6">
            WHAT GUARDIAN KNOWS / DOESN'T KNOW
          </h2>
          <p className="section-subheading mx-auto">
            Honest capability boundaries. Not defensive — precise. This prevents overclaiming and builds trust.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          <div>
            <h3 className="text-xl font-bold mb-6 flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-green-500/10 border border-green-500/20 flex items-center justify-center">
                <CheckCircle className="w-5 h-5 text-green-400" aria-hidden="true" />
              </div>
              Guardian CAN Know (with evidence)
            </h3>
            <div className="space-y-6">
              {knows.map((section, index) => (
                <motion.div
                  key={section.category}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: '-50px' }}
                  transition={{ delay: index * 0.05 }}
                  className="card-hover p-5"
                >
                  <h4 className="font-semibold text-foreground-primary mb-3 flex items-center gap-2">
                    <Database className="w-4 h-4 text-accent-cyan" aria-hidden="true" />
                    {section.category}
                  </h4>
                  <ul className="space-y-1" role="list">
                    {section.items.map((item, i) => (
                      <li key={i} className="flex items-center gap-2 text-sm text-foreground-tertiary">
                        <CheckCircle className="w-4 h-4 text-green-400 flex-shrink-0" aria-hidden="true" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-xl font-bold mb-6 flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-red-500/10 border border-red-500/20 flex items-center justify-center">
                <XCircle className="w-5 h-5 text-red-400" aria-hidden="true" />
              </div>
              Guardian Does NOT Automatically Know
            </h3>
            <div className="space-y-6">
              {notKnows.map((section, index) => (
                <motion.div
                  key={section.category}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: '-50px' }}
                  transition={{ delay: index * 0.05 }}
                  className="card-hover p-5"
                >
                  <h4 className="font-semibold text-foreground-primary mb-3 flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 text-red-400" aria-hidden="true" />
                    {section.category}
                  </h4>
                  <ul className="space-y-1" role="list">
                    {section.items.map((item, i) => (
                      <li key={i} className="flex items-center gap-2 text-sm text-foreground-tertiary">
                        <XCircle className="w-4 h-4 text-red-400 flex-shrink-0" aria-hidden="true" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ delay: 0.8 }}
          className="mt-12 max-w-3xl mx-auto p-6 rounded-xl bg-accent-cyan/5 border border-accent-cyan/20"
        >
          <h4 className="font-semibold text-accent-cyan mb-3">Design Principle</h4>
          <p className="text-foreground-secondary">
            This section should feel <strong>honest, not defensive</strong>. 
            Every "doesn't know" is a deliberate architectural boundary — not a bug to be fixed later. 
            Guardian operates on <strong>evidence, not assumptions</strong>.
          </p>
        </motion.div>
      </div>
    </section>
  );
}