'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { ChevronRight, ChevronDown, Eye, Clock, Zap, Wifi, MapPin, Battery, UserX, Send, RotateCcw, Database, AlertTriangle, CheckCircle, XCircle, ArrowRight } from 'lucide-react';

const replaySteps = [
  {
    step: 1,
    timestamp: '14:31:04',
    event: 'Impact detected',
    observed: ['High-g acceleration (3.2g)', 'Barometric pressure drop', 'Post-impact immobility'],
    known: ['Device on person', 'Battery 67%', 'Cellular connected'],
    unknown: ['User condition', 'Exact location', 'Emergency type'],
    capabilities: ['Cellular: AVAILABLE', 'GPS: AVAILABLE', 'Battery: AVAILABLE', 'Relay: UNAVAILABLE'],
    candidates: ['ALERT contacts', 'CALL emergency', 'LOCATE via GPS'],
    selected: 'ALERT + LOCATE',
    why: 'High confidence impact. User may respond. Standard escalation initiated.',
  },
  {
    step: 2,
    timestamp: '14:31:08',
    event: 'Risk elevated → HIGH',
    observed: ['No user interaction 4s post-impact', 'Continued immobility'],
    known: ['Impact confirmed', 'Escalation timer started'],
    unknown: ['User responsiveness', 'Injury severity'],
    capabilities: ['Cellular: AVAILABLE', 'GPS: AVAILABLE', 'Battery: AVAILABLE'],
    candidates: ['Continue countdown', 'Escalate to emergency call'],
    selected: 'Continue countdown (T+30s)',
    why: 'Standard 30s countdown before emergency call. User may be stunned but responsive.',
  },
  {
    step: 3,
    timestamp: '14:31:18',
    event: 'No user response → UNCONFIRMED',
    observed: ['Countdown 10s elapsed', 'No touch/voice/cancel', 'Device stationary'],
    known: ['User not interacting', 'Escalation imminent'],
    unknown: ['Consciousness', 'Ability to respond'],
    capabilities: ['Cellular: AVAILABLE', 'GPS: AVAILABLE', 'Battery: 62%'],
    candidates: ['Emergency call', 'Alert trusted contacts', 'Continue monitoring'],
    selected: 'ALERT trusted contacts + PREPARE emergency call',
    why: 'No response at T+10s. Pre-positioning emergency call. Contacts notified early.',
  },
  {
    step: 4,
    timestamp: '14:31:23',
    event: 'Emergency escalation',
    observed: ['Countdown expired', 'Zero user response', 'Agency: NON-RESPONSIVE'],
    known: ['User cannot manage emergency', 'Autonomous action required'],
    unknown: ['Exact medical condition', 'Responder ETA'],
    capabilities: ['Cellular: AVAILABLE', 'GPS: AVAILABLE', 'Battery: 58%'],
    candidates: ['CALL emergency services', 'ALERT contacts with location', 'ACTIVATE relay scanning'],
    selected: 'CALL + ALERT + LOCATE + SCAN relay',
    why: 'Agency NON-RESPONSIVE. Full autonomous response activated. All pathways attempted.',
  },
  {
    step: 5,
    timestamp: '14:31:31',
    event: 'Cellular becomes UNAVAILABLE',
    observed: ['Call failed: no signal', 'SMS queue blocked', 'RSRP: -120dBm', 'Network registration lost'],
    known: ['Primary comms pathway broken', 'Emergency call failed'],
    unknown: ['Signal return timeline', 'Relay peer availability'],
    capabilities: ['Cellular: UNAVAILABLE', 'GPS: AVAILABLE', 'Battery: 54%', 'Relay: SCANNING'],
    candidates: ['RETRY cellular (backoff)', 'ACTIVATE relay', 'PERSIST state locally'],
    selected: 'PERSIST state + SCAN relay + RETRY cellular (exponential)',
    why: 'Cellular failed. State persistence critical. Relay scan initiated. Cellular retry scheduled.',
  },
  {
    step: 6,
    timestamp: '14:31:36',
    event: 'Capability reassessment',
    observed: ['Cellular: UNAVAILABLE', 'GPS: DEGRADED (multipath)', 'Battery: 51%', 'Relay: 2 peers discovered'],
    known: ['Alternative pathway exists', 'Location confidence reduced'],
    unknown: ['Relay delivery success rate', 'Peer battery/connectivity'],
    capabilities: ['Cellular: UNAVAILABLE', 'GPS: DEGRADED', 'Battery: 51%', 'Relay: AVAILABLE'],
    candidates: ['RELAY emergency state', 'REDUCE GPS duty cycle', 'SCHEDULE cellular retry'],
    selected: 'RELAY + REDUCE GPS + SCHEDULE retry',
    why: 'Relay viable. GPS degraded → reduce power. Cellular retry at 30s/60s/120s intervals.',
  },
  {
    step: 7,
    timestamp: '14:31:40',
    event: 'Relay path activated',
    observed: ['2 Guardian peers in range', 'BLE mesh established', 'Peer 1: battery 78%', 'Peer 2: battery 45%'],
    known: ['Relay pathway confirmed', 'Peers have cellular'],
    unknown: ['Peer delivery confirmation', 'End-to-end latency'],
    capabilities: ['Cellular: UNAVAILABLE', 'GPS: DEGRADED', 'Battery: 48%', 'Relay: ACTIVE'],
    candidates: ['TRANSMIT via peer 1', 'TRANSMIT via peer 2', 'STORE-AND-FORWARD both'],
    selected: 'TRANSMIT via both peers (redundancy)',
    why: 'Dual-path relay for redundancy. State packet: risk, location, agency, medical context.',
  },
  {
    step: 8,
    timestamp: '14:31:42',
    event: 'Emergency state relayed',
    observed: ['Peer 1: DELIVERED', 'Peer 2: DELIVERED', 'Contacts notified via peer cellular'],
    known: ['Emergency state reached contacts', 'Delivery confirmed'],
    unknown: ['Responder acknowledgment', 'Cellular recovery'],
    capabilities: ['Cellular: UNAVAILABLE', 'GPS: DEGRADED', 'Battery: 45%', 'Relay: DELIVERED'],
    candidates: ['PERSIST state', 'MONITOR cellular', 'MAINTAIN relay'],
    selected: 'PERSIST + MONITOR + MAINTAIN',
    why: 'State delivered. Persistence ensured. Monitoring for cellular recovery. Relay maintained.',
  },
  {
    step: 9,
    timestamp: '14:31:43',
    event: 'Emergency state preserved',
    observed: ['State written to durable storage', 'CRDT sync prepared', 'Audit trail complete'],
    known: ['State survives reboot', 'Full history retained'],
    unknown: ['Recovery timeline'],
    capabilities: ['Cellular: UNAVAILABLE', 'GPS: DEGRADED', 'Battery: 44%', 'Relay: ACTIVE'],
    candidates: ['CONTINUE monitoring', 'REDUCE non-critical sensors'],
    selected: 'PERSIST + REDUCE sensors + MONITOR',
    why: 'State safe. Non-critical sensors reduced (screen off, GPS 1/5min). Battery conservation.',
  },
  {
    step: 10,
    timestamp: '14:32:10',
    event: 'Connectivity restored',
    observed: ['Cellular registration', 'RSRP: -85dBm', 'GPS lock: 8 satellites', 'HDOP: 1.2'],
    known: ['Primary pathways recovered', 'High-confidence location'],
    unknown: ['State sync conflicts'],
    capabilities: ['Cellular: AVAILABLE', 'GPS: AVAILABLE', 'Battery: 38%', 'Relay: ACTIVE'],
    candidates: ['SYNCHRONIZE state', 'RESUME normal ops', 'VERIFY delivery'],
    selected: 'SYNCHRONIZE + VERIFY + RESUME',
    why: 'Full recovery. State sync with cloud/contacts. Verify all deliveries. Resume normal monitoring.',
  },
  {
    step: 11,
    timestamp: '14:32:11',
    event: 'State synchronized',
    observed: ['Cloud state merged', 'Contact confirmations received', 'Responder ACK received', 'Relay peers released'],
    known: ['End-to-end delivery confirmed', 'Responder en route', 'State consistent'],
    unknown: ['Final handoff'],
    capabilities: ['Cellular: AVAILABLE', 'GPS: AVAILABLE', 'Battery: 37%', 'Relay: STANDBY'],
    candidates: ['MONITOR response', 'PREPARE handoff', 'LOG completion'],
    selected: 'MONITOR → HANDOFF → TERMINAL',
    why: 'Emergency response active. Guardian transitions to monitoring. Handoff to responders.',
  },
];

export function DecisionReplay() {
  const [expandedStep, setExpandedStep] = useState<number | null>(null);

  return (
    <section
      id="decision-replay"
      className="relative py-24 lg:py-32"
      aria-labelledby="replay-heading"
    >
      <div className="section-container relative">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <span className="section-label">JUDGE-FACING FEATURE</span>
          <h2 id="replay-heading" className="section-heading mb-6">
            DECISION REPLAY — WHY DID GUARDIAN DO THAT?
          </h2>
          <p className="section-subheading mx-auto">
            Complete audit trail. Every decision shows observed evidence, known/unknown factors, available capabilities, candidates, and rationale.
          </p>
        </div>

        <div className="max-w-4xl mx-auto space-y-3" role="list" aria-label="Decision replay timeline">
          {replaySteps.map((step) => (
            <motion.div
              key={step.step}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ delay: step.step * 0.04 }}
              className="group"
              role="listitem"
            >
              <button
                onClick={() => setExpandedStep(expandedStep === step.step ? null : step.step)}
                className={cn(
                  'w-full text-left p-4 rounded-xl bg-background-elevated border transition-all duration-200',
                  'border-border-primary hover:border-accent-cyan/50',
                  expandedStep === step.step && 'border-accent-cyan/50 bg-accent-cyan/5'
                )}
                aria-expanded={expandedStep === step.step}
              >
                <div className="flex items-center gap-4">
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-accent-cyan/10 border border-accent-cyan/20 flex items-center justify-center font-bold text-sm text-accent-cyan">
                    {step.step}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-3 flex-wrap">
                      <span className="font-mono text-sm text-foreground-muted">{step.timestamp}</span>
                      <span className="font-medium text-foreground-primary">{step.event}</span>
                      {expandedStep === step.step && (
                        <span className="status-badge status-working-prototype text-xs">EXPANDED</span>
                      )}
                    </div>
                    <p className="text-sm text-foreground-tertiary mt-1">
                      Selected: <span className="font-medium text-accent-cyan">{step.selected}</span> — {step.why}
                    </p>
                  </div>
                  <motion.div
                    animate={{ rotate: expandedStep === step.step ? 180 : 0 }}
                    transition={{ duration: 200 }}
                    className="text-foreground-tertiary"
                    aria-hidden="true"
                  >
                    <ChevronDown className="w-5 h-5" />
                  </motion.div>
                </div>
              </button>

              {expandedStep === step.step && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 250 }}
                  className="overflow-hidden mt-3 pt-3 border-t border-border-primary space-y-4"
                >
                  <div className="grid sm:grid-cols-2 gap-4">
                    <DetailPanel title="OBSERVED" icon={Eye} items={step.observed} color="text-accent-cyan" />
                    <DetailPanel title="KNOWN" icon={CheckCircle} items={step.known} color="text-green-400" />
                    <DetailPanel title="UNKNOWN" icon={AlertTriangle} items={step.unknown} color="text-amber-400" />
                    <DetailPanel title="AVAILABLE CAPABILITIES" icon={Database} items={step.capabilities} color="text-blue-400" />
                  </div>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <DetailPanel title="CANDIDATE ACTIONS" icon={RotateCcw} items={step.candidates} color="text-purple-400" />
                    <div className="p-4 rounded-lg bg-accent-cyan/5 border border-accent-cyan/20">
                      <div className="flex items-center gap-2 text-accent-cyan font-medium mb-2">
                        <ArrowRight className="w-4 h-4" aria-hidden="true" />
                        SELECTED ACTION
                      </div>
                      <p className="font-mono text-sm text-foreground-primary">{step.selected}</p>
                    </div>
                  </div>
                  <div className="p-4 rounded-lg bg-background-secondary border border-border-primary">
                    <div className="flex items-center gap-2 text-foreground-secondary font-medium mb-2">
                      <Zap className="w-4 h-4" aria-hidden="true" />
                      RATIONALE
                    </div>
                    <p className="text-sm text-foreground-tertiary">{step.why}</p>
                  </div>
                </motion.div>
              )}
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ delay: 1 }}
          className="mt-12 max-w-4xl mx-auto p-6 rounded-xl bg-amber-500/5 border border-amber-500/10"
        >
          <div className="flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 text-accent-amber flex-shrink-0 mt-0.5" aria-hidden="true" />
            <div>
              <h4 className="font-semibold text-accent-amber mb-2">Data Integrity Note</h4>
              <p className="text-sm text-foreground-tertiary">
                This replay shows <strong>illustrative simulation data</strong> for demonstration. 
                In production, this would be populated from actual experiment logs with timestamps, sensor readings, and measured outcomes.
                Each decision in a real system would be traceable to logged evidence.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function DetailPanel({ title, icon: Icon, items, color }: { title: string; icon: React.ComponentType<{ className?: string }>; items: string[]; color: string }) {
  return (
    <div className="p-4 rounded-lg bg-background-secondary border border-border-primary">
      <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider mb-3" style={{ color: color.replace('text-', '') }}>
        <Icon className="w-4 h-4" aria-hidden="true" />
        {title}
      </div>
      <ul className="space-y-1" role="list">
        {items.map((item, i) => (
          <li key={i} className="text-sm text-foreground-tertiary flex items-start gap-2">
            <span className="w-1.5 h-1.5 rounded-full flex-shrink-0 mt-1.5" style={{ backgroundColor: color.replace('text-', '') }} aria-hidden="true" />
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}