'use client';

import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { Smartphone, CheckCircle, AlertTriangle, MapPin, MessageSquare, Users, Heart, Shield, Mic, QrCode, RotateCcw } from 'lucide-react';

const demoScreens = [
  { id: 'detection', label: 'Emergency Detection', icon: AlertTriangle, description: 'Multi-sensor impact/fall detection with confidence scoring', status: 'WORKING PROTOTYPE' as const },
  { id: 'countdown', label: 'Emergency Countdown', icon: Shield, description: '30s escalation timer with haptic/audio/voice prompts', status: 'WORKING PROTOTYPE' as const },
  { id: 'escalation', label: 'No-Response Escalation', icon: Users, description: 'Automatic transition to autonomous response when user unresponsive', status: 'WORKING PROTOTYPE' as const },
  { id: 'location', label: 'Location Capture', icon: MapPin, description: 'GPS + fused location with confidence radius and source metadata', status: 'WORKING PROTOTYPE' as const },
  { id: 'sms', label: 'Emergency SMS', icon: MessageSquare, description: 'Structured emergency message with location, risk, medical context', status: 'WORKING PROTOTYPE' as const },
  { id: 'contacts', label: 'Trusted Contacts', icon: Users, description: 'Priority-based contact escalation with multilingual support', status: 'WORKING PROTOTYPE' as const },
  { id: 'dashboard', label: 'Emergency Dashboard', icon: Shield, description: 'Real-time state view: risk, agency, capabilities, actions, delivery', status: 'EXPERIMENTAL' as const },
  { id: 'medical-qr', label: 'Medical QR', icon: QrCode, description: 'Scannable emergency profile: allergies, blood group, conditions, contacts', status: 'WORKING PROTOTYPE' as const },
  { id: 'voice', label: 'Voice Interaction', icon: Mic, description: 'Voice-triggered SOS and hands-free emergency confirmation', status: 'EXPERIMENTAL' as const },
  { id: 'safe-walk', label: 'Safe Walk', icon: Shield, description: 'Proactive journey monitoring with check-in/deviation alerts', status: 'RESEARCH DIRECTION' as const },
  { id: 'flashlight', label: 'Emergency Flashlight', icon: Heart, description: 'SOS pattern + maximum brightness + battery preservation', status: 'WORKING PROTOTYPE' as const },
];

export function ProductDemo() {
  return (
    <section
      id="product-demo"
      className="relative py-24 lg:py-32"
      aria-labelledby="product-heading"
    >
      <div className="section-container relative">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <span className="section-label">PRODUCT</span>
          <h2 id="product-heading" className="section-heading mb-6">
            PRODUCT CAPABILITIES
          </h2>
          <p className="section-subheading mx-auto">
            Actual prototype capabilities. Screenshots from Guardian app. Status labels indicate implementation maturity.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto mb-12">
          {demoScreens.map((screen, index) => (
            <motion.div
              key={screen.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ delay: index * 0.06 }}
              className="card-hover p-6 group relative overflow-hidden"
            >
              <div className="absolute top-4 right-4">
                <span className={cn(
                  'status-badge text-xs',
                  screen.status === 'WORKING PROTOTYPE' && 'status-working-prototype',
                  screen.status === 'EXPERIMENTAL' && 'status-experimental',
                  screen.status === 'RESEARCH DIRECTION' && 'status-research-direction'
                )}>
                  {screen.status}
                </span>
              </div>
              
              <div className="w-12 h-12 rounded-xl bg-accent-cyan/10 border border-accent-cyan/20 flex items-center justify-center mb-4 group-hover:border-accent-cyan/50 transition-colors">
                <screen.icon className="w-6 h-6 text-accent-cyan" aria-hidden="true" />
              </div>
              
              <h3 className="font-semibold text-foreground-primary mb-2">{screen.label}</h3>
              <p className="text-sm text-foreground-tertiary">{screen.description}</p>
            </motion.div>
          ))}
        </div>

        <div className="technical-line my-12" aria-hidden="true" />

        <div className="max-w-4xl mx-auto">
          <h3 className="text-2xl font-bold text-center mb-8">DEVICE MOCKUP FLOW</h3>
          <p className="text-center text-foreground-secondary mb-8">
            Illustrative emergency flow — actual prototype screenshots replace these placeholders when available.
          </p>
          
          {(() => {
            const flowSteps = [
              { step: 1, label: 'Detection', icon: AlertTriangle, screen: 'Impact detected\nRisk: HIGH' },
              { step: 2, label: 'Countdown', icon: Shield, screen: '30s to respond\nTap to cancel' },
              { step: 3, label: 'Escalation', icon: Users, screen: 'No response\nActivating emergency' },
              { step: 4, label: 'Location', icon: MapPin, screen: 'GPS acquired\n±12m confidence' },
              { step: 5, label: 'SMS Sent', icon: MessageSquare, screen: 'Emergency sent\nRelay fallback' },
              { step: 6, label: 'Contacts', icon: Users, screen: '3 contacts notified\n2 confirmed' },
              { step: 7, label: 'Relay', icon: RotateCcw, screen: 'Peer mesh active\nState delivered' },
              { step: 8, label: 'Recovery', icon: CheckCircle, screen: 'Cellular restored\nState synced' },
            ];
            
            return (
              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {flowSteps.map((step) => (
                  <motion.div
                    key={step.step}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-50px' }}
                    transition={{ delay: step.step * 0.05 }}
                    className="card p-6 text-center"
                  >
                    <div className="w-10 h-10 mx-auto mb-3 rounded-xl bg-accent-cyan/10 border border-accent-cyan/20 flex items-center justify-center">
                      <step.icon className="w-5 h-5 text-accent-cyan" aria-hidden="true" />
                    </div>
                    <div className="text-2xl font-bold text-accent-cyan mb-2">{step.step}</div>
                    <h4 className="font-semibold text-foreground-primary mb-2">{step.label}</h4>
                    <p className="text-sm text-foreground-tertiary font-mono whitespace-pre-line">{step.screen}</p>
                  </motion.div>
                ))}
              </div>
            );
          })()}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ delay: 1 }}
          className="mt-12 max-w-3xl mx-auto p-6 rounded-xl bg-amber-500/5 border border-amber-500/10"
        >
          <div className="flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 text-accent-amber flex-shrink-0 mt-0.5" aria-hidden="true" />
            <div>
              <h4 className="font-semibold text-accent-amber mb-2">Screenshot Policy</h4>
              <p className="text-sm text-foreground-tertiary">
                This section uses <strong>placeholder mockups</strong>. Actual prototype screenshots from the Guardian Flutter app 
                will replace these when the team provides them. Never fabricate screenshots — mark unavailable screens clearly.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}