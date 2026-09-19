'use client';

import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { Smartphone, Cpu, Database, Wifi, MapPin, Users, Shield, RotateCcw, ArrowRight, RefreshCw, Zap, Cloud, Bluetooth } from 'lucide-react';

const flowSteps = [
  { id: 1, label: 'ANDROID DEVICE', icon: Smartphone, desc: 'Flutter app + Python (Chaquopy) + Native sensors', status: 'active' },
  { id: 2, label: 'SENSORS / GPS / AUDIO / INTERACTION', icon: Cpu, desc: 'IMU, barometer, GNSS, microphone, touch, voice, battery, network', status: 'active' },
  { id: 3, label: 'GUARDIAN STATE', icon: Database, desc: 'Persistent emergency state: risk, agency, location, comms, resources, failures', status: 'active' },
  { id: 4, label: 'RISK + EVIDENCE', icon: Zap, desc: 'Bayesian fusion → risk level + confidence + contributing factors', status: 'active' },
  { id: 5, label: 'CAPABILITY ASSESSMENT', icon: Shield, desc: 'Per-capability: AVAILABLE/DEGRADED/UNAVAILABLE + confidence + freshness + cost', status: 'active' },
  { id: 6, label: 'ADAPTIVE DECISION', icon: RotateCcw, desc: 'Viability engine → ranked actions + rationale. Policy: state > comms > resources', status: 'active' },
  { id: 7, label: 'COMMUNICATION / LOCATION / ACTION', icon: ArrowRight, desc: 'ALERT, CALL, LOCATE, RELAY, PERSIST, RETRY, REDUCE, RECOVER', status: 'active' },
  { id: 8, label: 'TRUSTED CONTACTS / RESPONDER', icon: Users, desc: 'SMS (multilingual), emergency call, Guardian mesh, medical QR', status: 'active' },
  { id: 9, label: 'STATE UPDATE', icon: RefreshCw, desc: 'Outcome → new failures → new capabilities → new opportunities → REASSESS ↺', status: 'active' },
];

export function SystemDataFlow() {
  return (
    <section
      id="data-flow"
      className="relative py-24 lg:py-32"
      aria-labelledby="flow-heading"
    >
      <div className="section-container relative">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <span className="section-label">TECHNICAL</span>
          <h2 id="flow-heading" className="section-heading mb-6">
            SYSTEM DATA FLOW
          </h2>
          <p className="section-subheading mx-auto">
            Animated signal flow from sensor evidence through adaptive decision to action and state update.
          </p>
        </div>

        <div className="max-w-6xl mx-auto">
          <div className="relative">
            {/* Animated flow visualization */}
            <div className="hidden lg:block mb-12">
              <svg className="w-full h-32" viewBox="0 0 1200 200" aria-hidden="true">
                <defs>
                  <marker id="arrowhead" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
                    <polygon points="0 0, 10 3.5, 0 7" fill="var(--color-accent-cyan)" />
                  </marker>
                  <linearGradient id="flowGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="var(--color-accent-cyan)" stopOpacity="0.3" />
                    <stop offset="50%" stopColor="var(--color-accent-cyan)" stopOpacity="0.8" />
                    <stop offset="100%" stopColor="var(--color-accent-cyan)" stopOpacity="0.3" />
                  </linearGradient>
                </defs>
                
                {/* Main flow line */}
                <path 
                  d="M 50 100 
                     Q 150 100 150 100
                     L 1050 100" 
                  stroke="var(--color-border-primary)" 
                  strokeWidth="2" 
                  fill="none" 
                  strokeDasharray="10,5"
                />
                
                {/* Animated flow particles */}
                <g className="flow-particles">
                  {[...Array(8)].map((_, i) => (
                    <circle
                      key={i}
                      cx={50 + (i * 125) % 1000}
                      cy={100}
                      r="4"
                      fill="var(--color-accent-cyan)"
                      opacity="0.8"
                    >
                      <animateMotion
                        path="M 50 100 Q 150 100 150 100 L 1050 100"
                        dur="8s"
                        repeatCount="indefinite"
                        begin={`${i * 1}s`}
                        fill="freeze"
                      />
                    </circle>
                  ))}
                </g>
                
                {/* Step markers */}
                {flowSteps.map((step, index) => (
                  <g key={step.id} transform={`translate(${100 + index * 115}, 100)`}>
                    <circle 
                      r="16" 
                      fill="var(--color-background-elevated)" 
                      stroke="var(--color-accent-cyan)" 
                      strokeWidth="2"
                      className="step-marker"
                    />
                    <text x="0" y="35" textAnchor="middle" className="text-xs" fill="var(--color-foreground-tertiary)">
                      {step.label.split(' ').join('\n')}
                    </text>
                  </g>
                ))}
              </svg>
            </div>

            {/* Mobile-friendly step cards */}
            <div className="lg:hidden space-y-3" role="list" aria-label="Data flow steps">
              {flowSteps.map((step, index) => (
                <motion.div
                  key={step.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-50px' }}
                  transition={{ delay: index * 0.05 }}
                  className={cn(
                    'flex items-center gap-4 p-4 rounded-xl bg-background-elevated border',
                    step.status === 'active' && 'border-accent-cyan/30 bg-accent-cyan/5'
                  )}
                  role="listitem"
                >
                  <div className={cn('flex-shrink-0 w-12 h-12 rounded-xl flex items-center justify-center',
                    step.status === 'active' && 'bg-accent-cyan/10 border border-accent-cyan/20',
                    'bg-background-tertiary border border-border-primary'
                  )}>
                    <step.icon className={cn('w-5 h-5', step.status === 'active' ? 'text-accent-cyan' : 'text-foreground-tertiary')} aria-hidden="true" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-semibold text-foreground-primary text-sm">{step.label}</h4>
                    <p className="text-xs text-foreground-tertiary">{step.desc}</p>
                  </div>
                  {index < flowSteps.length - 1 && (
                    <ArrowRight className="w-5 h-5 text-accent-cyan/50 rotate-90 flex-shrink-0" aria-hidden="true" />
                  )}
                </motion.div>
              ))}
            </div>
          </div>

          <div className="technical-line my-12" aria-hidden="true" />

          <div className="grid md:grid-cols-3 gap-6">
            {[
              { icon: Smartphone, title: 'On-Device First', desc: 'Risk, decision, state — all computed on Android. No cloud round-trip for critical path.' },
              { icon: RotateCcw, title: 'Continuous Loop', desc: 'OBSERVE → ASSESS → STATE → CAPABILITY → DECIDE → ACT → UPDATE ↺ Minimum 1Hz during emergency.' },
              { icon: Shield, title: 'Failure as Input', desc: 'Every capability change (cellular lost, GPS degraded, battery low) triggers immediate reassessment.' },
            ].map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ delay: index * 0.1 }}
                className="card-hover p-6 text-center"
              >
                <div className="w-12 h-12 mx-auto mb-3 rounded-xl bg-accent-cyan/10 border border-accent-cyan/20 flex items-center justify-center">
                  <item.icon className="w-6 h-6 text-accent-cyan" aria-hidden="true" />
                </div>
                <h4 className="font-semibold text-foreground-primary mb-2">{item.title}</h4>
                <p className="text-sm text-foreground-tertiary">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}