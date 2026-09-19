'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import { FileText, Database, Settings, Shield, Zap, Eye, X, ChevronDown, ChevronUp, Download, Code, FlaskConical, AlertTriangle } from 'lucide-react';

const panelSections = [
  {
    id: 'architecture',
    label: 'Architecture',
    icon: FileText,
    content: (
      <div className="space-y-4 text-sm">
        <p className="text-foreground-secondary">
          Guardian is a failure-aware adaptive safety architecture. The core loop:
        </p>
        <div className="font-mono text-accent-cyan bg-background-primary/50 p-3 rounded">
          OBSERVE → ASSESS → PERSISTENT STATE → CAPABILITY MODEL → ADAPTIVE CONTROLLER → VIABILITY ENGINE → ACTION → STATE UPDATE ↺
        </div>
        <p className="text-foreground-tertiary">
          Each block is independently testable. State is the single source of truth. Controller reads from state, writes to state.
        </p>
      </div>
    ),
  },
  {
    id: 'state-model',
    label: 'Emergency State Model',
    icon: Database,
    content: (
      <div className="space-y-4 text-sm">
        <p className="text-foreground-secondary">The EmergencyState object contains:</p>
        <ul className="space-y-1 text-foreground-tertiary" role="list">
          <li>{'• event: { id, timestamp, type, evidence[] }'}</li>
          <li>{'• risk: { level, confidence, factors[] }'}</li>
          <li>{'• agency: RESPONSIVE | UNCONFIRMED | NON-RESPONSIVE | UNKNOWN'}</li>
          <li>{'• location: { value, source, confidence, uncertainty, lastReliable }'}</li>
          <li>{'• communication: { cellular, relay, internet } × { state, quality, lastSuccess }'}</li>
          <li>{'• resources: { battery, thermal, storage, cpu }'}</li>
          <li>{'• failures: [{ timestamp, type, pathway, recovery }]'}</li>
          <li>{'• capabilities: Map<capability, { state, confidence, freshness, cost, history }>'}</li>
          <li>{'• actions: [{ id, type, timestamp, outcome, rationale }]'}</li>
          <li>{'• delivery: { recipient, status, retryCount, ack }'}</li>
          <li>{'• response: { status, responder, eta, ack }'}</li>
          <li>{'• recovery: { status, syncVersion, conflicts }'}</li>
        </ul>
      </div>
    ),
  },
  {
    id: 'capability-model',
    label: 'Capability Model',
    icon: Settings,
    content: (
      <div className="space-y-4 text-sm">
        <p className="text-foreground-secondary">Each capability (cellular, GPS, relay, battery, sensing, etc.) has:</p>
        <ul className="space-y-1 text-foreground-tertiary" role="list">
          <li>• state: AVAILABLE | DEGRADED | UNAVAILABLE | UNKNOWN</li>
          <li>• confidence: 0-100% (measurement quality)</li>
          <li>• freshness: seconds since last update</li>
          <li>• resourceCost: % battery per minute of operation</li>
          <li>• failureHistory: count + timestamps + categories</li>
          <li>• lastSuccessfulUse: timestamp</li>
          <li>• dependencies: other capabilities required</li>
        </ul>
        <p className="text-foreground-tertiary">
          Hysteresis prevents flapping. Degradation trends predict future failures.
        </p>
      </div>
    ),
  },
  {
    id: 'decision-policy',
    label: 'Decision Policy',
    icon: Zap,
    content: (
      <div className="space-y-4 text-sm">
        <p className="text-foreground-secondary">Viability Engine Policy Hierarchy:</p>
        <ol className="space-y-2 text-foreground-tertiary" role="list">
          <li><strong>1. Preserve State:</strong> Emergency state written to durable storage before any action</li>
          <li><strong>2. Maintain Communication:</strong> Select action with highest delivery probability</li>
          <li><strong>3. Conserve Resources:</strong> Shed non-critical load (GPS duty cycle, screen, sensors)</li>
          <li><strong>4. Attempt Recovery:</strong> Schedule retries, monitor for capability restoration</li>
        </ol>
        <p className="text-foreground-tertiary">
          Action space: ALERT, CALL, LOCATE, RELAY, PERSIST, RETRY, REDUCE, RECOVER.
          Each has preconditions, cost, expected outcome, timeout, retry policy.
        </p>
      </div>
    ),
  },
  {
    id: 'data-flow',
    label: 'Data Flow',
    icon: Shield,
    content: (
      <div className="space-y-4 text-sm">
        <p className="text-foreground-secondary">Signal flow (all on-device for critical path):</p>
        <div className="font-mono text-accent-cyan bg-background-primary/50 p-3 rounded text-xs">
          SENSORS → EVIDENCE FUSION → RISK → STATE → CAPABILITY ASSESSMENT → VIABILITY ENGINE → ACTION → STATE UPDATE
        </div>
        <p className="text-foreground-tertiary">
          Cloud (Firebase) used only for: contact sync, optional state backup, experiment logging.
          Core loop functions 100% offline.
        </p>
      </div>
    ),
  },
  {
    id: 'experiment-methodology',
    label: 'Experiment Methodology',
    icon: FlaskConical,
    content: (
      <div className="space-y-4 text-sm">
        <p className="text-foreground-secondary">Validation approach:</p>
        <ul className="space-y-2 text-foreground-tertiary" role="list">
          <li><strong>Controlled falls:</strong> Instrumented mannequin + human subjects. 50+ trials. Ground truth: video + IMU reference.</li>
          <li><strong>Cellular denial:</strong> Faraday cage + relay peers. Measure: detection, relay activation, delivery.</li>
          <li><strong>GPS degradation:</strong> Indoor/urban canyon. Compare fused vs ground truth. Measure drift, uncertainty.</li>
          <li><strong>Battery drain:</strong> Full discharge from 15%. Adaptive vs standard. Measure time, critical actions.</li>
          <li><strong>Agency classification:</strong> Responsive vs non-responsive. Confusion matrix. Video ground truth.</li>
        </ul>
        <p className="text-foreground-tertiary">
          All experiments logged with: hypothesis, setup, devices, Android version, Guardian version, conditions, trials, raw data.
        </p>
      </div>
    ),
  },
  {
    id: 'limitations',
    label: 'Technical Limitations',
    icon: AlertTriangle,
    content: (
      <div className="space-y-4 text-sm">
        <p className="text-foreground-secondary">Known boundaries:</p>
        <ul className="space-y-2 text-foreground-tertiary" role="list">
          <li>• PDR drift ~2-5%/distance without GPS correction. Not a GPS replacement.</li>
          <li>• BLE relay requires both devices running Guardian. 2-hop tested. Range ~30m indoor.</li>
          <li>• Agency classifier: ~78% accuracy. False positives (stunned but responsive) ~12%.</li>
          <li>• No satellite messaging implemented. Research only.</li>
          <li>• Viability engine: policy-based, not mathematically proven optimal. Simulation validation pending.</li>
          <li>• Android-only. iOS background restrictions prevent equivalent implementation.</li>
          <li>• Medical context: user-provided only. No diagnosis, no sensor-based inference.</li>
          <li>• Security: prototype-grade. Production requires hardware keys, audit, compliance.</li>
        </ul>
      </div>
    ),
  },
];

export function TechnicalCredibilityPanel() {
  const [openSections, setOpenSections] = useState<Set<string>>(new Set());

  const toggleSection = (id: string) => {
    setOpenSections(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  return (
    <section
      id="technical-credibility"
      className="relative py-24 lg:py-32"
      aria-labelledby="credibility-heading"
    >
      <div className="section-container relative">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <span className="section-label">OPEN THE SYSTEM</span>
          <h2 id="credibility-heading" className="section-heading mb-6">
            TECHNICAL CREDIBILITY PANEL
          </h2>
          <p className="section-subheading mx-auto">
            Engineering documentation behind the product. Expand each section for specifications, models, policies, and limitations.
          </p>
        </div>

        <div className="max-w-4xl mx-auto space-y-4" role="list" aria-label="Technical documentation sections">
          {panelSections.map((section, index) => (
            <motion.div
              key={section.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ delay: index * 0.05 }}
              className="group"
              role="listitem"
            >
              <button
                onClick={() => toggleSection(section.id)}
                className={cn(
                  'w-full text-left p-5 rounded-xl bg-background-elevated border transition-all',
                  'border-border-primary hover:border-accent-cyan/50',
                  openSections.has(section.id) && 'border-accent-cyan/50 bg-accent-cyan/5'
                )}
                aria-expanded={openSections.has(section.id)}
              >
                <div className="flex items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-accent-cyan/10 border border-accent-cyan/20 flex items-center justify-center">
                      <section.icon className="w-5 h-5 text-accent-cyan" aria-hidden="true" />
                    </div>
                    <h3 className="font-semibold text-foreground-primary">{section.label}</h3>
                  </div>
                  <motion.div
                    animate={{ rotate: openSections.has(section.id) ? 180 : 0 }}
                    transition={{ duration: 200 }}
                    className="text-foreground-tertiary"
                    aria-hidden="true"
                  >
                    <ChevronDown className="w-5 h-5" />
                  </motion.div>
                </div>
              </button>

              <AnimatePresence>
                {openSections.has(section.id) && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 250, ease: 'easeInOut' }}
                    className="overflow-hidden pt-4 border-t border-border-primary"
                  >
                    {section.content}
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ delay: 0.5 }}
          className="mt-8 max-w-4xl mx-auto p-6 rounded-xl bg-amber-500/5 border border-amber-500/10"
        >
          <div className="flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 text-accent-amber flex-shrink-0 mt-0.5" aria-hidden="true" />
            <div>
              <h4 className="font-semibold text-accent-amber mb-2">Judge Mode</h4>
              <p className="text-sm text-foreground-tertiary">
                For rapid evaluation, use <strong>Judge Mode</strong> (top-right button) which surfaces:
              </p>
              <ul className="space-y-1 text-sm text-foreground-tertiary mt-2">
                <li>• Problem → Innovation → Architecture → Prototype → Experiments → Results → Limitations → Team</li>
                <li>• Removes decorative animations, prioritizes diagrams and evidence</li>
                <li>• Direct links to each section for quick navigation</li>
              </ul>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}