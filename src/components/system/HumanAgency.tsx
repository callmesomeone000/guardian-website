'use client';

import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { User, UserX, HelpCircle, AlertCircle, CheckCircle, Clock, Eye, EyeOff } from 'lucide-react';

const agencyStates = [
  {
    state: 'RESPONSIVE',
    icon: User,
    description: 'User acknowledges alerts, interacts with device, confirms status',
    indicators: ['Touch response within 10s', 'Voice response detected', 'Cancel button pressed', 'Safe-check-in completed'],
    color: 'text-green-400',
    bgColor: 'bg-green-500/10 border-green-500/20',
    badgeClass: 'bg-green-500/20 text-green-400 border-green-500/30',
  },
  {
    state: 'UNCONFIRMED',
    icon: HelpCircle,
    description: 'No positive response yet — user may be unable, unwilling, or delayed',
    indicators: ['No response to escalation', 'Device motion but no interaction', 'Alert delivered, no acknowledgment', 'Countdown active'],
    color: 'text-amber-400',
    bgColor: 'bg-amber-500/10 border-amber-500/20',
    badgeClass: 'bg-amber-500/20 text-amber-400 border-amber-500/30',
  },
  {
    state: 'NON-RESPONSIVE',
    icon: UserX,
    description: 'Strong evidence user cannot manage the emergency',
    indicators: ['No response after full escalation', 'Post-impact immobility detected', 'Physiological indicators (if available)', 'Manual SOS not triggered'],
    color: 'text-red-400',
    bgColor: 'bg-red-500/10 border-red-500/20',
    badgeClass: 'bg-red-500/20 text-red-400 border-red-500/30',
  },
  {
    state: 'UNKNOWN',
    icon: AlertCircle,
    description: 'Insufficient evidence to classify — device separated, sensors failed',
    indicators: ['Device not on person', 'Sensors unavailable', 'No interaction baseline', 'Fresh emergency, no history'],
    color: 'text-gray-400',
    bgColor: 'bg-gray-500/10 border-gray-500/20',
    badgeClass: 'bg-gray-500/20 text-gray-400 border-gray-500/30',
  },
];

const escalationTimeline = [
  { time: 'T+0s', event: 'Emergency detected', agency: 'UNKNOWN' },
  { time: 'T+10s', event: 'Countdown starts', agency: 'UNCONFIRMED' },
  { time: 'T+30s', event: 'Haptic + audio escalation', agency: 'UNCONFIRMED' },
  { time: 'T+60s', event: 'Voice prompt: "Are you OK?"', agency: 'UNCONFIRMED' },
  { time: 'T+90s', event: 'No response → NON-RESPONSIVE', agency: 'NON-RESPONSIVE' },
  { time: 'T+90s', event: 'Emergency escalation triggered', agency: 'NON-RESPONSIVE' },
];

export function HumanAgency() {
  return (
    <section
      id="human-agency"
      className="relative py-24 lg:py-32"
      aria-labelledby="agency-heading"
    >
      <div className="section-container relative">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <span className="section-label">TECHNICAL EXPLANATION</span>
          <h2 id="agency-heading" className="section-heading mb-6">
            HUMAN AGENCY ASSESSMENT
          </h2>
          <p className="section-subheading mx-auto">
            Guardian evaluates whether the person appears able to respond or manage the emergency — it does not claim to know consciousness with certainty.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto mb-16">
          {agencyStates.map((state, index) => (
            <motion.div
              key={state.state}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ delay: index * 0.1 }}
              className={cn('card-hover p-6', state.bgColor)}
            >
              <div className="flex items-center gap-3 mb-4">
                <div className={cn('w-12 h-12 rounded-xl flex items-center justify-center', state.color.replace('text-', 'bg-').replace('400', '100'))}>
                  <state.icon className={cn('w-6 h-6', state.color)} aria-hidden="true" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground-primary">{state.state}</h3>
                  <span className={cn('status-badge text-xs mt-1', state.badgeClass)}>
                    {state.state}
                  </span>
                </div>
              </div>
              <p className="text-sm text-foreground-secondary mb-4">{state.description}</p>
              <ul className="space-y-2" role="list">
                {state.indicators.map((indicator, i) => (
                  <li key={i} className="flex items-center gap-2 text-sm text-foreground-tertiary">
                    <span className={cn('w-1.5 h-1.5 rounded-full flex-shrink-0', state.color.replace('text-', 'bg-'))} aria-hidden="true" />
                    {indicator}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        <div className="technical-line my-12" aria-hidden="true" />

        <div className="max-w-4xl mx-auto">
          <h3 className="text-2xl font-bold text-center mb-8">ESCALATION TIMELINE</h3>
          
          <div className="space-y-4" role="list" aria-label="Agency escalation timeline">
            {escalationTimeline.map((step, index) => (
              <motion.div
                key={step.time}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ delay: index * 0.1 }}
                className="flex items-center gap-4 p-4 rounded-xl bg-background-elevated border border-border-primary"
                role="listitem"
              >
                <div className="flex-shrink-0 w-20 text-right font-mono text-sm text-foreground-muted">
                  {step.time}
                </div>
                <div className="flex-1">
                  <p className="font-medium text-foreground-primary">{step.event}</p>
                </div>
                <span className={cn(
                  'status-badge text-xs font-mono',
                  step.agency === 'RESPONSIVE' && 'bg-green-500/20 text-green-400 border-green-500/30',
                  step.agency === 'UNCONFIRMED' && 'bg-amber-500/20 text-amber-400 border-amber-500/30',
                  step.agency === 'NON-RESPONSIVE' && 'bg-red-500/20 text-red-400 border-red-500/30',
                  step.agency === 'UNKNOWN' && 'bg-gray-500/20 text-gray-400 border-gray-500/30'
                )}>
                  {step.agency}
                </span>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ delay: 0.8 }}
            className="mt-8 p-6 rounded-xl bg-amber-500/5 border border-amber-500/10"
          >
            <div className="flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-accent-amber flex-shrink-0 mt-0.5" aria-hidden="true" />
              <div>
                <h4 className="font-semibold text-accent-amber mb-2">Important: Language Precision</h4>
                <p className="text-sm text-foreground-tertiary">
                  Guardian does <strong>not</strong> claim: "Guardian knows the user is unconscious."<br />
                  Guardian <strong>does</strong> evaluate: "The person appears unable to respond based on available evidence."
                </p>
                <p className="text-sm text-foreground-tertiary mt-2">
                  Agency state is a <strong>probabilistic assessment</strong> from sensor evidence, not a medical determination.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}