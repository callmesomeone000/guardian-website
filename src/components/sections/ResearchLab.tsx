'use client';

import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { FlaskConical, FileText, ArrowRight, CheckCircle, AlertTriangle, Clock, Database, Zap, MapPin, Wifi, Battery, Users, RotateCcw, Globe, Shield, RefreshCw } from 'lucide-react';

const researchCards = [
  {
    id: 'emergency-state-persistence',
    title: 'Emergency-State Persistence',
    hypothesis: 'Emergency state survives process death, reboot, and network partition without data loss.',
    objective: 'Validate CRDT-inspired state merge on recovery. Measure state integrity after simulated crashes.',
    setup: 'Android device + Guardian prototype. Induce crashes during active emergency. Recover and verify state.',
    method: 'Inject crashes at 10 decision points. Compare pre-crash vs post-recovery state. Measure field-level integrity.',
    status: 'EXPERIMENTAL' as const,
    icon: Database,
  },
  {
    id: 'cellular-failure',
    title: 'Cellular Failure Adaptation',
    hypothesis: 'Guardian detects cellular loss within 5s and activates relay pathway within 15s.',
    objective: 'Measure detection latency, relay activation time, delivery success rate under cellular denial.',
    setup: 'Faraday cage + 2 Guardian devices (1 primary, 1 relay peer). Cellular blocked via RF shield.',
    method: '20 trials. Trigger emergency. Block cellular. Measure: detection time, relay discovery, delivery confirmation.',
    status: 'EXPERIMENTAL' as const,
    icon: Wifi,
  },
  {
    id: 'gps-degradation',
    title: 'GPS Degradation & PDR Fallback',
    hypothesis: 'PDR maintains location within 50m for 5min without GPS correction in indoor corridor.',
    objective: 'Quantify PDR drift rate. Evaluate fusion with Wi-Fi/BLE fingerprints. Test uncertainty growth model.',
    setup: 'Indoor corridor (100m). Guardian device + reference GPS. Walk path with GPS blocked.',
    method: '10 walks. Compare PDR+fusion vs ground truth. Measure drift, uncertainty calibration.',
    status: 'RESEARCH DIRECTION' as const,
    icon: MapPin,
  },
  {
    id: 'relay-availability',
    title: 'Relay Availability Discovery',
    hypothesis: 'Guardian discovers ≥1 relay peer within 10s in urban density (>50 devices/km²).',
    objective: 'Measure peer discovery latency, connection stability, hop count distribution.',
    setup: 'Urban test route. 5 Guardian devices deployed. Primary triggers emergency. Measure mesh formation.',
    method: '30min continuous. Log: peer RSSI, connection duration, message delivery, battery impact.',
    status: 'EXPERIMENTAL' as const,
    icon: RotateCcw,
  },
  {
    id: 'relay-disappearance',
    title: 'Relay Disappearance Recovery',
    hypothesis: 'When relay peer drops, Guardian re-discovers alternative within 20s or falls back to persistence.',
    objective: 'Test mesh resilience. Measure re-routing latency. Validate state preservation when mesh partitions.',
    setup: '3 Guardian devices. Primary + 2 relays. Move relays out of range sequentially during active emergency.',
    method: '15 trials. Induce peer departure. Measure: detection, re-discovery, delivery via new path or persistence.',
    status: 'RESEARCH DIRECTION' as const,
    icon: Users,
  },
  {
    id: 'battery-constraints',
    title: 'Battery-Constrained Operation',
    hypothesis: 'Guardian maintains emergency communication for 60min at 15% battery with adaptive duty cycling.',
    objective: 'Measure battery drain rate per capability. Validate priority-based shedding. Test critical-path preservation.',
    setup: 'Device at 15% battery. Active emergency. Monitor: GPS duty cycle, sensor sampling, CPU, screen, radio.',
    method: '5 full-drain tests. Compare: standard vs adaptive. Measure time-to-shutdown, critical actions completed.',
    status: 'EXPERIMENTAL' as const,
    icon: Battery,
  },
  {
    id: 'human-non-response',
    title: 'Human Non-Response Classification',
    hypothesis: 'Agency classifier achieves >85% accuracy distinguishing responsive vs non-responsive post-impact.',
    objective: 'Validate agency state machine. Measure false-positive (user responsive but classified non-responsive) and false-negative rates.',
    setup: 'Controlled falls with test subjects. Instrumented: IMU, video, manual response buttons. 50 trials.',
    method: 'Ground truth: video + button press. Classifier output: RESPONSIVE/UNCONFIRMED/NON-RESPONSIVE. Confusion matrix.',
    status: 'EXPERIMENTAL' as const,
    icon: Shield,
  },
  {
    id: 'communication-recovery',
    title: 'Communication Recovery & Sync',
    hypothesis: 'State synchronization completes within 5s of cellular restoration with zero data loss.',
    objective: 'Measure sync latency, conflict resolution correctness, duplicate detection, delivery verification.',
    setup: 'Cellular blocked → emergency active → cellular restored. Monitor: sync trigger, merge, verification.',
    method: '20 cycles. Inject conflicts (local vs cloud). Verify CRDT merge. Measure end-to-end sync time.',
    status: 'RESEARCH DIRECTION' as const,
    icon: RefreshCw,
  },
  {
    id: 'location-continuity',
    title: 'Location Continuity Pipeline',
    hypothesis: 'Fused location (GPS+PDR+Wi-Fi) maintains <30m error for 10min without GPS in mixed indoor/outdoor.',
    objective: 'End-to-end pipeline validation. GPS → PDR → fusion → last reliable → recovery sync.',
    setup: 'Mixed route: outdoor → indoor mall → outdoor. Reference GPS + Guardian. 10 runs.',
    method: 'Compare fused estimate vs ground truth. Measure: transition smoothness, uncertainty calibration, recovery time.',
    status: 'RESEARCH DIRECTION' as const,
    icon: MapPin,
  },
  {
    id: 'multilingual-communication',
    title: 'Multilingual Emergency Messaging',
    hypothesis: 'Localized emergency templates (EN/HI/UR) achieve >95% comprehension in target populations.',
    objective: 'Validate template clarity, structured data preservation, RTL layout, character encoding.',
    setup: 'Survey + comprehension test. 30 participants per language. Measure: understanding, actionability, trust.',
    method: 'Show localized SMS. Ask: what happened? where? what to do? Score accuracy. Note cultural nuances.',
    status: 'WORKING PROTOTYPE' as const,
    icon: Globe,
  },
  {
    id: 'decision-policy-evaluation',
    title: 'Decision Policy Evaluation',
    hypothesis: 'Viability engine selects optimal action in >90% of simulated failure scenarios vs oracle policy.',
    objective: 'Compare engine decisions against exhaustive search oracle. Measure regret, viability score correlation.',
    setup: 'Monte Carlo simulation. 10,000 scenarios. Vary: agency, comms, location, battery, relay, history.',
    method: 'Engine selects action. Oracle computes true optimal. Measure: agreement rate, viability gap, policy violations.',
    status: 'RESEARCH DIRECTION' as const,
    icon: Zap,
  },
];

export function ResearchLab() {
  return (
    <section
      id="research-lab"
      className="relative py-24 lg:py-32"
      aria-labelledby="lab-heading"
    >
      <div className="section-container relative">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <span className="section-label">GUARDIAN LAB</span>
          <h2 id="lab-heading" className="section-heading mb-6">
            WHERE THE ARCHITECTURE BECOMES MEASURABLE
          </h2>
          <p className="section-subheading mx-auto">
            Each research card documents hypothesis, objective, setup, method, results, limitations, and conclusion.
          </p>
        </div>

        <div className="max-w-5xl mx-auto space-y-6" role="list" aria-label="Research experiments">
          {researchCards.map((card, index) => (
            <motion.div
              key={card.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ delay: index * 0.06 }}
              className="card-hover p-6 group"
              role="listitem"
            >
              <div className="flex items-start gap-4">
                <div className={cn('flex-shrink-0 w-12 h-12 rounded-xl flex items-center justify-center', 
                  card.status === 'WORKING PROTOTYPE' && 'bg-green-500/10 border border-green-500/20',
                  card.status === 'EXPERIMENTAL' && 'bg-amber-500/10 border border-amber-500/20',
                  card.status === 'RESEARCH DIRECTION' && 'bg-blue-500/10 border border-blue-500/20'
                )}>
                  <card.icon className={cn('w-6 h-6',
                    card.status === 'WORKING PROTOTYPE' && 'text-green-400',
                    card.status === 'EXPERIMENTAL' && 'text-amber-400',
                    card.status === 'RESEARCH DIRECTION' && 'text-blue-400'
                  )} aria-hidden="true" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-4 mb-2">
                    <h3 className="font-semibold text-foreground-primary">{card.title}</h3>
                    <span className={cn('status-badge',
                      card.status === 'WORKING PROTOTYPE' && 'status-working-prototype',
                      card.status === 'EXPERIMENTAL' && 'status-experimental',
                      card.status === 'RESEARCH DIRECTION' && 'status-research-direction'
                    )}>
                      {card.status}
                    </span>
                  </div>
                  
                  <div className="grid sm:grid-cols-2 gap-4 text-sm">
                    <div className="space-y-3">
                      <div>
                        <p className="font-medium text-foreground-secondary">Hypothesis</p>
                        <p className="text-foreground-tertiary mt-1">{card.hypothesis}</p>
                      </div>
                      <div>
                        <p className="font-medium text-foreground-secondary">Objective</p>
                        <p className="text-foreground-tertiary mt-1">{card.objective}</p>
                      </div>
                      <div>
                        <p className="font-medium text-foreground-secondary">Setup</p>
                        <p className="text-foreground-tertiary mt-1">{card.setup}</p>
                      </div>
                    </div>
                    <div className="space-y-3">
                      <div>
                        <p className="font-medium text-foreground-secondary">Method</p>
                        <p className="text-foreground-tertiary mt-1">{card.method}</p>
                      </div>
                      <div className="p-3 rounded-lg bg-background-secondary border border-border-primary">
                        <p className="font-medium text-accent-amber mb-1">Results / Limitations / Conclusion</p>
                        <p className="text-xs text-foreground-muted">
                          {card.status === 'WORKING PROTOTYPE' ? 'Validated — see Evidence Dashboard' : 
                           card.status === 'EXPERIMENTAL' ? 'Data collection in progress — preliminary results only' : 
                           'Not yet implemented — literature review complete'}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ delay: 0.8 }}
          className="mt-12 max-w-3xl mx-auto p-6 rounded-xl bg-amber-500/5 border border-amber-500/10 text-center"
        >
          <h4 className="font-semibold text-accent-amber mb-3">Living Research Portal</h4>
          <p className="text-foreground-secondary mb-4">
            This section is designed to evolve. As experiments complete, cards update with:
          </p>
          <div className="grid sm:grid-cols-3 gap-3 text-sm text-foreground-tertiary">
            <span className="flex items-center gap-1"><CheckCircle className="w-4 h-4 text-green-400" /> Results</span>
            <span className="flex items-center gap-1"><FileText className="w-4 h-4 text-blue-400" /> Charts</span>
            <span className="flex items-center gap-1"><Database className="w-4 h-4 text-amber-400" /> Raw Data</span>
            <span className="flex items-center gap-1"><AlertTriangle className="w-4 h-4 text-red-400" /> Limitations</span>
            <span className="flex items-center gap-1"><ArrowRight className="w-4 h-4 text-accent-cyan" /> Conclusion</span>
            <span className="flex items-center gap-1"><Clock className="w-4 h-4 text-gray-400" /> Updated</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}