'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import { ChevronDown, ChevronUp, ExternalLink, Info } from 'lucide-react';

const architectureBlocks = [
  {
    id: 'observe',
    label: 'OBSERVE',
    subtitle: 'Sensors • GPS • Audio • Network • Battery • User interaction',
    description: 'Continuous multi-modal evidence collection. Accelerometer, gyroscope, barometer, microphone, GNSS, cellular/Wi-Fi state, battery level, user touch/voice interaction. Each sensor provides evidence with confidence and freshness metadata.',
    details: [
      'Impact detection via fused IMU + barometer',
      'Fall classification: trip, slip, collapse, impact',
      'Audio anomaly detection (screams, crashes, glass)',
      'GNSS quality: satellites, HDOP, CN0, multipath',
      'Network: RSRP, RSRQ, SNR, handover state',
      'Battery: level, temperature, charge state, health',
      'Interaction: touch, voice, motion, inactivity',
    ],
    status: 'WORKING PROTOTYPE' as const,
  },
  {
    id: 'assess',
    label: 'ASSESS',
    subtitle: 'Evidence • Context • Risk • Uncertainty',
    description: 'Bayesian evidence fusion. Each observation updates posterior risk distribution. Context: time, location semantics, activity, historical patterns. Uncertainty quantified per evidence source. Output: risk level (LOW/MODERATE/HIGH/CRITICAL) with confidence interval.',
    details: [
      'Evidence weighting by sensor reliability',
      'Temporal decay of stale observations',
      'Contextual priors: home vs highway vs hospital',
      'Risk calibration against false-positive history',
      'Uncertainty propagation through fusion',
      'Output: risk + confidence + contributing factors',
    ],
    status: 'WORKING PROTOTYPE' as const,
  },
  {
    id: 'persistent-state',
    label: 'PERSISTENT EMERGENCY STATE',
    subtitle: 'Event • Risk • Human Agency • Location + Confidence • Communication • Resources • Failures • Capabilities • Actions/Outcomes • Delivery • Response • Recovery',
    description: 'The central state object. Not a log — a living representation of the emergency. Survives process death, device reboot, network partition. Every adaptation reads from and writes to this state. Contains full history for counterfactual reasoning.',
    details: [
      'Immutable event record with timestamp',
      'Risk trajectory with evidence lineage',
      'Human agency: RESPONSIVE/UNCONFIRMED/NON-RESPONSIVE/UNKNOWN',
      'Location estimate + confidence + source + uncertainty radius',
      'Communication: per-pathway state + latency + success history',
      'Resources: battery %, thermal, storage, CPU quota',
      'Failures: timestamped, categorized, with recovery status',
      'Capabilities: dynamic map of what is currently possible',
      'Actions: complete audit trail with rationale',
      'Delivery: per-recipient status + retry policy',
      'Response: ACK/EN_ROUTE/ARRIVED/HANDOFF per responder',
      'Recovery: synchronization state + conflict resolution',
    ],
    status: 'WORKING PROTOTYPE' as const,
  },
  {
    id: 'capability-model',
    label: 'CAPABILITY & FAILURE MODEL',
    subtitle: 'Available • Degraded • Unavailable • Failure history • Resource condition • Communication opportunities',
    description: 'Dynamic capability registry. Each capability (cellular, GPS, relay, battery, sensing, etc.) has state, confidence, freshness, resource cost, failure count, last success timestamp. Failure history enables predictive degradation modeling. Communication opportunities discovered via BLE/Wi-Fi Direct scanning.',
    details: [
      'Per-capability state machine with hysteresis',
      'Degradation detection via trend analysis',
      'Failure categorization: transient/permanent/external',
      'Resource condition: battery curves, thermal throttling',
      'Opportunity scanning: BLE peers, Wi-Fi Direct, mesh',
      'Capability dependencies (GPS needs battery, etc.)',
    ],
    status: 'WORKING PROTOTYPE' as const,
  },
  {
    id: 'adaptive-controller',
    label: 'ADAPTIVE INTELLIGENCE CONTROLLER',
    subtitle: 'Situation Understanding • Degradation Awareness • Failure/Outcome Memory • Opportunity Awareness • Candidate Action Generation • Action Evaluation • Counterfactual Look-Ahead',
    description: 'The decision brain. Maintains situation model from state. Tracks degradation trajectories. Remembers which actions succeeded/failed under which conditions. Generates candidate actions from capability model. Evaluates each via viability engine. Runs counterfactual simulation: "If I take action X, what states are reachable?"',
    details: [
      'Situation model: risk + agency + capability snapshot',
      'Degradation awareness: trend → predicted failure time',
      'Failure memory: (condition, action, outcome) tuples',
      'Opportunity awareness: discovered but unused paths',
      'Candidate generation: all valid actions from capabilities',
      'Evaluation: viability score per candidate',
      'Counterfactual: simulate N steps forward per candidate',
    ],
    status: 'EXPERIMENTAL' as const,
  },
  {
    id: 'viability-engine',
    label: 'EMERGENCY VIABILITY ENGINE ★',
    subtitle: '"Which action best preserves or restores the viability of emergency response under the current conditions?"',
    description: 'The core optimization. Not "what happened?" but "what response is still viable?" Inputs: human agency, communication availability, location confidence, battery, sensing, relay opportunities, previous outcomes, failures, current state. Output: ranked action list with viability scores and rationale. Policy: preserve state > maintain communication > conserve resources > attempt recovery.',
    details: [
      'Viability = f(agency, comms, location, battery, relays, history)',
      'Action space: ALERT, CALL, LOCATE, RELAY, PERSIST, RETRY, REDUCE, RECOVER',
      'Scoring: weighted viability metrics per action',
      'Policy hierarchy: state preservation > communication > resources',
      'Rationale generation: human-readable decision explanation',
      'Fallback chain: primary → alternatives → persistence → terminal',
    ],
    status: 'RESEARCH DIRECTION' as const,
  },
  {
    id: 'action',
    label: 'ACTION',
    subtitle: 'Alert • Call • Locate • Relay • Persist • Retry • Reduce • Recover',
    description: 'Concrete executable actions. Each has preconditions, resource cost, expected outcome, timeout, retry policy. ALERT: notify contacts via SMS/push. CALL: emergency dialer. LOCATE: acquire GPS/PDR/fused. RELAY: transmit via Guardian mesh. PERSIST: write state to durable storage. RETRY: re-attempt failed pathway. REDUCE: shed non-critical load. RECOVER: sync state on pathway restoration.',
    details: [
      'ALERT: multilingual SMS + push + Guardian mesh',
      'CALL: platform emergency dialer with location',
      'LOCATE: GPS → fused → PDR → last known + uncertainty',
      'RELAY: BLE/Wi-Fi Direct store-and-forward',
      'PERSIST: encrypted local + optional cloud backup',
      'RETRY: exponential backoff with capability re-check',
      'REDUCE: sensor duty cycle, screen off, CPU throttle',
      'RECOVER: state merge + conflict resolution + sync',
    ],
    status: 'WORKING PROTOTYPE' as const,
  },
  {
    id: 'state-update',
    label: 'STATE UPDATE',
    subtitle: 'Outcome • New failures • New capabilities • New opportunities',
    description: 'Closing the loop. Every action outcome updates state. New failures discovered. Capabilities re-evaluated. Opportunities registered. Triggers controller re-evaluation. This is the ↺ — the continuous adaptation cycle. Runs at minimum 1Hz during active emergency, event-driven on capability changes.',
    details: [
      'Outcome recorded: success/partial/failed + details',
      'Failure detection: timeout, error codes, signal loss',
      'Capability refresh: periodic + event-driven scans',
      'Opportunity registration: new peers, restored paths',
      'Controller trigger: immediate re-evaluation',
      'Cycle rate: 1Hz active, event-driven passive',
    ],
    status: 'WORKING PROTOTYPE' as const,
  },
];

export function ArchitectureExplorer() {
  const [openBlock, setOpenBlock] = useState<string | null>(null);

  return (
    <section
      id="architecture"
      className="relative py-24 lg:py-32"
      aria-labelledby="architecture-heading"
    >
      <div className="section-container relative">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <span className="section-label">ARCHITECTURE</span>
          <h2 id="architecture-heading" className="section-heading mb-6">
            INTERACTIVE ARCHITECTURE EXPLORER
          </h2>
          <p className="section-subheading mx-auto">
            Click any block to expand. This is the complete Guardian adaptive architecture — not a simplified diagram.
          </p>
        </div>

        <div className="max-w-4xl mx-auto space-y-4" role="list" aria-label="Architecture blocks">
          {architectureBlocks.map((block, index) => (
            <motion.div
              key={block.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ delay: index * 0.08 }}
              className="group"
              role="listitem"
            >
              <button
                onClick={() => setOpenBlock(openBlock === block.id ? null : block.id)}
                className={cn(
                  'w-full text-left p-6 rounded-xl bg-background-elevated border transition-all duration-300',
                  'border-border-primary hover:border-accent-cyan/50',
                  openBlock === block.id && 'border-accent-cyan/50 bg-accent-cyan/5 shadow-glow'
                )}
                aria-expanded={openBlock === block.id}
                aria-controls={`${block.id}-content`}
              >
                <div className="flex items-center justify-between gap-4">
                  <div className="flex items-center gap-4">
                    <div className={cn(
                      'w-14 h-14 rounded-xl flex items-center justify-center font-bold text-lg flex-shrink-0',
                      openBlock === block.id
                        ? 'bg-accent-cyan text-background-primary'
                        : 'bg-accent-cyan/10 text-accent-cyan border border-accent-cyan/20'
                    )}>
                      {index + 1}
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground-primary text-lg">{block.label}</h3>
                      <p className="text-sm text-foreground-tertiary font-mono">{block.subtitle}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className={cn(
                      'status-badge',
                      block.status === 'WORKING PROTOTYPE' && 'status-working-prototype',
                      block.status === 'EXPERIMENTAL' && 'status-experimental',
                      block.status === 'RESEARCH DIRECTION' && 'status-research-direction'
                    )}>
                      {block.status}
                    </span>
                    <motion.div
                      animate={{ rotate: openBlock === block.id ? 180 : 0 }}
                      transition={{ duration: 200 }}
                      className="text-foreground-tertiary"
                      aria-hidden="true"
                    >
                      <ChevronDown className="w-5 h-5" />
                    </motion.div>
                  </div>
                </div>
              </button>

              <AnimatePresence>
                {openBlock === block.id && (
                  <motion.div
                    id={`${block.id}-content`}
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 300, ease: 'easeInOut' }}
                    className="overflow-hidden mt-4 pt-4 border-t border-border-primary"
                  >
                    <div className="prose prose-invert max-w-none text-sm text-foreground-secondary leading-relaxed mb-4">
                      {block.description}
                    </div>
                    <div className="grid sm:grid-cols-2 gap-3">
                      {block.details.map((detail, i) => (
                        <div
                          key={i}
                          className="flex items-start gap-2 p-3 rounded-lg bg-background-secondary border border-border-primary"
                        >
                          <Info className="w-4 h-4 text-accent-cyan/60 flex-shrink-0 mt-0.5" aria-hidden="true" />
                          <span className="text-foreground-tertiary">{detail}</span>
                        </div>
                      ))}
                    </div>
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
          transition={{ delay: 1 }}
          className="mt-12 max-w-4xl mx-auto p-6 rounded-xl bg-gradient-to-r from-accent-cyan/5 to-accent-blue/5 border border-accent-cyan/20"
        >
          <div className="flex items-center gap-3 mb-4">
            <ExternalLink className="w-6 h-6 text-accent-cyan" aria-hidden="true" />
            <h3 className="font-semibold text-foreground-primary">Open the System</h3>
          </div>
          <p className="text-foreground-secondary">
            For the complete technical specification — state model, capability model, decision policy, data flow, experiment methodology, and limitations — open the technical credibility panel.
          </p>
          <a
            href="/system"
            className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-accent-cyan hover:text-accent-teal transition-colors"
          >
            Open Technical Credibility Panel <ExternalLink className="w-4 h-4" aria-hidden="true" />
          </a>
        </motion.div>
      </div>
    </section>
  );
}