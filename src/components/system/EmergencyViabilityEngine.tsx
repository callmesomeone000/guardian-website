'use client';

import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { Brain, Zap, Shield, Wifi, Battery, MapPin, Users, RotateCcw, Minimize2, Maximize2, ArrowRight, Check, AlertTriangle } from 'lucide-react';

const viabilityInputs = [
  { label: 'Human Agency', value: 'NON-RESPONSIVE', icon: Users, state: 'critical' },
  { label: 'Communication', value: 'Cellular: UNAVAILABLE', icon: Wifi, state: 'critical' },
  { label: 'Location Confidence', value: 'DEGRADED (±45m)', icon: MapPin, state: 'degraded' },
  { label: 'Battery', value: '23% (Critical)', icon: Battery, state: 'critical' },
  { label: 'Available Sensing', value: 'IMU + Barometer', icon: Zap, state: 'available' },
  { label: 'Relay Opportunities', value: '2 Guardian peers nearby', icon: RotateCcw, state: 'available' },
  { label: 'Previous Outcomes', value: 'Relay: 2/2 success', icon: Shield, state: 'available' },
  { label: 'Current Failures', value: 'Cellular, GPS multipath', icon: AlertTriangle, state: 'critical' },
];

const candidateActions = [
  { id: 'A', label: 'Keep retrying cellular', viability: 15, cost: 'HIGH', outcome: 'Unlikely to succeed', rationale: 'Cellular unavailable for 47s. Battery drain high. No signal trend improvement.' },
  { id: 'B', label: 'Continue expensive GPS acquisition', viability: 25, cost: 'HIGH', outcome: 'Low confidence gain', rationale: 'GPS multipath persistent. 23% battery cannot sustain continuous GNSS.' },
  { id: 'C', label: 'Preserve emergency state + use relay', viability: 85, cost: 'LOW', outcome: 'High viability', rationale: 'Relay available (2 peers). State preserved. Battery conserved. Proven 2/2 success.' },
  { id: 'D', label: 'Reduce all activity', viability: 40, cost: 'LOWEST', outcome: 'State preserved only', rationale: 'Extreme conservation. No active communication. Last resort.' },
];

const selectedAction = candidateActions[2];

export function EmergencyViabilityEngine() {
  return (
    <section
      id="viability-engine"
      className="relative py-24 lg:py-32"
      aria-labelledby="viability-heading"
    >
      <div className="section-container relative">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <span className="section-label">CORE ENGINE</span>
          <h2 id="viability-heading" className="section-heading mb-6">
            EMERGENCY VIABILITY ENGINE
          </h2>
          <p className="section-subheading mx-auto mb-4">
            <span className="text-gradient">"THE QUESTION IS NOT JUST 'WHAT HAPPENED?'"</span>
          </p>
          <p className="section-subheading mx-auto text-gradient">
            "THE QUESTION IS 'WHAT RESPONSE IS STILL VIABLE?'"
          </p>
        </div>

        <div className="max-w-5xl mx-auto space-y-12">
          <div className="grid lg:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                <Brain className="w-6 h-6 text-accent-cyan" aria-hidden="true" />
                Current State Assessment
              </h3>
              <div className="space-y-3" role="list">
                {viabilityInputs.map((input, index) => (
                  <motion.div
                    key={input.label}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: '-50px' }}
                    transition={{ delay: index * 0.05 }}
                    className={cn(
                      'flex items-center gap-3 p-4 rounded-xl bg-background-elevated border',
                      input.state === 'critical' && 'border-red-500/30 bg-red-500/5',
                      input.state === 'degraded' && 'border-amber-500/30 bg-amber-500/5',
                      input.state === 'available' && 'border-green-500/30 bg-green-500/5'
                    )}
                    role="listitem"
                  >
                    <div className={cn('w-10 h-10 rounded-lg flex items-center justify-center',
                      input.state === 'critical' && 'bg-red-500/10',
                      input.state === 'degraded' && 'bg-amber-500/10',
                      input.state === 'available' && 'bg-green-500/10'
                    )}>
                      <input.icon className={cn('w-5 h-5',
                        input.state === 'critical' && 'text-red-400',
                        input.state === 'degraded' && 'text-amber-400',
                        input.state === 'available' && 'text-green-400'
                      )} aria-hidden="true" />
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-foreground-primary text-sm">{input.label}</p>
                      <p className="text-xs text-foreground-tertiary font-mono">{input.value}</p>
                    </div>
                    <span className={cn(
                      'status-badge text-xs',
                      input.state === 'critical' && 'bg-red-500/20 text-red-400 border-red-500/30',
                      input.state === 'degraded' && 'bg-amber-500/20 text-amber-400 border-amber-500/30',
                      input.state === 'available' && 'bg-green-500/20 text-green-400 border-green-500/30'
                    )}>
                      {input.state.toUpperCase()}
                    </span>
                  </motion.div>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                <ArrowRight className="w-6 h-6 text-accent-cyan" aria-hidden="true" />
                Candidate Action Evaluation
              </h3>
              <div className="space-y-3" role="list">
                {candidateActions.map((action, index) => (
                  <motion.div
                    key={action.id}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: '-50px' }}
                    transition={{ delay: index * 0.05 }}
                    className={cn(
                      'p-4 rounded-xl bg-background-elevated border transition-all',
                      action.id === selectedAction.id
                        ? 'border-accent-cyan/50 bg-accent-cyan/5 shadow-glow'
                        : 'border-border-primary'
                    )}
                    role="listitem"
                  >
                    <div className="flex items-start justify-between gap-4 mb-2">
                      <div className="flex items-center gap-3">
                        <span className={cn(
                          'w-8 h-8 rounded-full flex items-center justify-center font-bold',
                          action.id === selectedAction.id
                            ? 'bg-accent-cyan text-background-primary'
                            : 'bg-background-tertiary text-foreground-tertiary'
                        )}>
                          {action.id}
                        </span>
                        <div>
                          <p className="font-semibold text-foreground-primary">{action.label}</p>
                          <p className="text-xs text-foreground-tertiary">Cost: {action.cost}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className={cn(
                          'text-2xl font-bold',
                          action.id === selectedAction.id ? 'text-accent-cyan' : 'text-foreground-primary'
                        )}>
                          {action.viability}%
                        </div>
                        <span className={cn(
                          'status-badge text-xs mt-1',
                          action.id === selectedAction.id && 'bg-accent-cyan/20 text-accent-cyan border-accent-cyan/30',
                          action.viability > 70 && 'bg-green-500/20 text-green-400 border-green-500/30',
                          action.viability > 40 && action.viability <= 70 && 'bg-amber-500/20 text-amber-400 border-amber-500/30',
                          action.viability <= 40 && 'bg-red-500/20 text-red-400 border-red-500/30'
                        )}>
                          {action.viability > 70 ? 'VIABLE' : action.viability > 40 ? 'MARGINAL' : 'LOW'}
                        </span>
                      </div>
                    </div>
                    <div className="pt-3 border-t border-border-primary/50">
                      <p className="text-sm text-foreground-secondary"><strong>Outcome:</strong> {action.outcome}</p>
                      <p className="text-xs text-foreground-tertiary mt-1"><strong>Rationale:</strong> {action.rationale}</p>
                    </div>
                    {action.id === selectedAction.id && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        className="mt-3 pt-3 border-t border-accent-cyan/30"
                      >
                        <div className="flex items-center gap-2 text-accent-cyan text-sm font-medium">
                          <Check className="w-4 h-4" aria-hidden="true" />
                          SELECTED — Guardian executes this action
                        </div>
                      </motion.div>
                    )}
                  </motion.div>
                ))}
              </div>
            </div>
          </div>

          <div className="technical-line" aria-hidden="true" />

          <div className="grid md:grid-cols-3 gap-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="card-hover p-6 text-center"
            >
              <div className="w-16 h-16 mx-auto mb-4 rounded-xl bg-accent-cyan/10 border border-accent-cyan/20 flex items-center justify-center">
                <Shield className="w-8 h-8 text-accent-cyan" aria-hidden="true" />
              </div>
              <h4 className="font-semibold text-foreground-primary mb-2">Policy Hierarchy</h4>
              <ol className="space-y-1 text-sm text-foreground-tertiary text-left max-w-xs mx-auto">
                <li className="flex items-center gap-2"><span className="w-5 h-5 rounded-full bg-accent-cyan/20 text-accent-cyan flex items-center justify-center text-xs font-mono">1</span>Preserve emergency state</li>
                <li className="flex items-center gap-2"><span className="w-5 h-5 rounded-full bg-accent-cyan/20 text-accent-cyan flex items-center justify-center text-xs font-mono">2</span>Maintain communication</li>
                <li className="flex items-center gap-2"><span className="w-5 h-5 rounded-full bg-accent-cyan/20 text-accent-cyan flex items-center justify-center text-xs font-mono">3</span>Conserve resources</li>
                <li className="flex items-center gap-2"><span className="w-5 h-5 rounded-full bg-accent-cyan/20 text-accent-cyan flex items-center justify-center text-xs font-mono">4</span>Attempt recovery</li>
              </ol>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="card-hover p-6 text-center"
            >
              <div className="w-16 h-16 mx-auto mb-4 rounded-xl bg-green-500/10 border border-green-500/20 flex items-center justify-center">
                <Check className="w-8 h-8 text-green-400" aria-hidden="true" />
              </div>
              <h4 className="font-semibold text-foreground-primary mb-2">Action Space</h4>
              <div className="flex flex-wrap justify-center gap-2 text-xs">
                {['ALERT', 'CALL', 'LOCATE', 'RELAY', 'PERSIST', 'RETRY', 'REDUCE', 'RECOVER'].map((action) => (
                  <span key={action} className="status-badge bg-background-tertiary text-foreground-tertiary border-border-primary">
                    {action}
                  </span>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="card-hover p-6 text-center"
            >
              <div className="w-16 h-16 mx-auto mb-4 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center">
                <Brain className="w-8 h-8 text-amber-400" aria-hidden="true" />
              </div>
              <h4 className="font-semibold text-foreground-primary mb-2">Counterfactual Look-Ahead</h4>
              <p className="text-sm text-foreground-tertiary">
                Simulates N steps forward for each candidate action. Evaluates reachable states, resource trajectories, and failure probabilities before committing.
              </p>
              <span className="status-badge status-experimental mt-3 inline-block">EXPERIMENTAL</span>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ delay: 0.5 }}
            className="max-w-3xl mx-auto p-6 rounded-xl bg-accent-cyan/5 border border-accent-cyan/20"
          >
            <h4 className="font-semibold text-accent-cyan mb-3 flex items-center gap-2">
              <Brain className="w-5 h-5" aria-hidden="true" />
              Decision Rationale (Illustrative)
            </h4>
            <div className="bg-background-primary/50 p-4 rounded-lg font-mono text-sm text-foreground-secondary overflow-x-auto">
              {`Cellular unavailable (47s). Battery constrained (23%). Relay available (2 peers, 2/2 success).
Direct retry deferred to preserve emergency communication capability.
Selected: PERSIST + RELAY → Emergency state relayed via peer mesh.
Next: Monitor cellular recovery. Schedule GPS retry at 15% battery threshold.`}
            </div>
            <p className="text-xs text-foreground-muted mt-3 text-center">
              Note: Viability scores shown are illustrative. Actual implementation uses weighted policy evaluation.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}