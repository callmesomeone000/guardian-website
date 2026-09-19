'use client';

import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { AlertTriangle, Zap, Shield, Phone, MessageSquare, RotateCcw, Database, MapPin, Heart, QrCode, Footprints, Flashlight, Mic, Wifi, Battery, CheckCircle, XCircle, HelpCircle } from 'lucide-react';

const featureGroups = [
  {
    category: 'Emergency Detection',
    icon: AlertTriangle,
    features: [
      { name: 'Multi-sensor accident/fall detection', status: 'WORKING PROTOTYPE' as const, desc: 'IMU + barometer fusion. Trip/slip/collapse/impact classification.' },
      { name: 'Impact and motion analysis', status: 'WORKING PROTOTYPE' as const, desc: '3-axis accelerometer + gyroscope. Peak g-force, jerk, orientation change.' },
      { name: 'Abnormal orientation/rotation', status: 'EXPERIMENTAL' as const, desc: 'Device angle deviation from normal carry positions. Research direction.' },
      { name: 'Post-event inactivity', status: 'WORKING PROTOTYPE' as const, desc: 'Immobility timer post-impact. Configurable threshold.' },
      { name: 'Manual SOS', status: 'WORKING PROTOTYPE' as const, desc: 'Hardware button combo + on-screen trigger. Haptic confirmation.' },
      { name: 'Voice trigger', status: 'EXPERIMENTAL' as const, desc: '"Hey Guardian" hotword. On-device ASR. False-positive mitigation.' },
    ],
  },
  {
    category: 'Emergency Activation',
    icon: Zap,
    features: [
      { name: 'Emergency countdown', status: 'WORKING PROTOTYPE' as const, desc: '30s default. Haptic + audio + voice escalation. Cancel anytime.' },
      { name: 'No-response escalation', status: 'WORKING PROTOTYPE' as const, desc: 'Agency state machine: RESPONSIVE → UNCONFIRMED → NON-RESPONSIVE.' },
      { name: 'Emergency calling', status: 'WORKING PROTOTYPE' as const, desc: 'Platform emergency dialer (112/911). Auto-location attachment.' },
      { name: 'Trusted-contact escalation', status: 'WORKING PROTOTYPE' as const, desc: 'Priority-based sequential/parallel notification. Multilingual.' },
    ],
  },
  {
    category: 'Communication',
    icon: MessageSquare,
    features: [
      { name: 'Emergency SMS', status: 'WORKING PROTOTYPE' as const, desc: 'Structured payload: risk, location, agency, timestamp, medical context.' },
      { name: 'Emergency context', status: 'WORKING PROTOTYPE' as const, desc: 'Minimum actionable data per recipient. Structured + localized text.' },
      { name: 'Guardian-to-Guardian relay', status: 'EXPERIMENTAL' as const, desc: 'BLE mesh. Store-and-forward. Peer discovery. 2-hop tested.' },
      { name: 'Store-and-forward concept', status: 'RESEARCH DIRECTION' as const, desc: 'Delay-tolerant networking. Queue when all paths down. Research.' },
      { name: 'Multilingual emergency messages', status: 'WORKING PROTOTYPE' as const, desc: 'EN/HI/UR templates. Recipient profile drives language selection.' },
    ],
  },
  {
    category: 'Location',
    icon: MapPin,
    features: [
      { name: 'GPS', status: 'WORKING PROTOTYPE' as const, desc: 'GNSS with quality metrics: satellites, HDOP, CN0, multipath flag.' },
      { name: 'Location confidence', status: 'WORKING PROTOTYPE' as const, desc: 'Explicit uncertainty radius. Source metadata (GPS/PDR/fused/last).' },
      { name: 'Location continuity research', status: 'RESEARCH DIRECTION' as const, desc: 'GPS → PDR → fused evidence → last reliable + uncertainty → sync.' },
      { name: 'PDR research direction', status: 'RESEARCH DIRECTION' as const, desc: 'Step counting + heading. Drift ~2%/distance. Requires GPS correction.' },
    ],
  },
  {
    category: 'Healthcare',
    icon: Heart,
    features: [
      { name: 'Medical QR', status: 'WORKING PROTOTYPE' as const, desc: 'Encrypted emergency profile. Time-limited access token. Scannable.' },
      { name: 'Critical patient context', status: 'WORKING PROTOTYPE' as const, desc: 'Allergies, blood group, meds, conditions. Voluntary, opt-in.' },
    ],
  },
  {
    category: 'Supporting Safety',
    icon: Footprints,
    features: [
      { name: 'Safe Walk', status: 'WORKING PROTOTYPE' as const, desc: 'Journey monitoring. Check-in timer. Deviation alert. ETA sharing.' },
      { name: 'Family dashboard', status: 'EXPERIMENTAL' as const, desc: 'Real-time status: location, battery, last check-in. Prototype.' },
      { name: 'Flashlight', status: 'WORKING PROTOTYPE' as const, desc: 'SOS pattern + max brightness. Battery-preserving mode.' },
    ],
  },
];

function getStatusIcon(status: string) {
  switch (status) {
    case 'WORKING PROTOTYPE': return <CheckCircle className="w-4 h-4 text-green-400" aria-hidden="true" />;
    case 'EXPERIMENTAL': return <HelpCircle className="w-4 h-4 text-amber-400" aria-hidden="true" />;
    case 'RESEARCH DIRECTION': return <XCircle className="w-4 h-4 text-blue-400" aria-hidden="true" />;
    default: return <CheckCircle className="w-4 h-4 text-green-400" aria-hidden="true" />;
  }
}

function getStatusClass(status: string) {
  switch (status) {
    case 'WORKING PROTOTYPE': return 'status-working-prototype';
    case 'EXPERIMENTAL': return 'status-experimental';
    case 'RESEARCH DIRECTION': return 'status-research-direction';
  }
}

export function FeaturesExplorer() {
  return (
    <section
      id="capabilities"
      className="relative py-24 lg:py-32"
      aria-labelledby="features-heading"
    >
      <div className="section-container relative">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <span className="section-label">FEATURES</span>
          <h2 id="features-heading" className="section-heading mb-6">
            FEATURES EXPLORER
          </h2>
          <p className="section-subheading mx-auto">
            Grouped by capability domain. Every feature labeled with implementation status. No fictional features.
          </p>
        </div>

        <div className="max-w-5xl mx-auto space-y-12">
          {featureGroups.map((group, groupIndex) => (
            <motion.div
              key={group.category}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ delay: groupIndex * 0.1 }}
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-accent-cyan/10 border border-accent-cyan/20 flex items-center justify-center">
                  <group.icon className="w-5 h-5 text-accent-cyan" aria-hidden="true" />
                </div>
                <h3 className="text-xl font-bold text-foreground-primary">{group.category}</h3>
              </div>
              
              <div className="space-y-3">
                {group.features.map((feature, featureIndex) => (
                  <motion.div
                    key={feature.name}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: '-50px' }}
                    transition={{ delay: featureIndex * 0.03 }}
                    className="card-hover p-4 group"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1 pr-4">
                        <div className="flex items-center gap-2 mb-1">
                          <h4 className="font-medium text-foreground-primary">{feature.name}</h4>
                          <span className={cn('status-badge text-xs', getStatusClass(feature.status))}>
                            {feature.status}
                          </span>
                        </div>
                        <p className="text-sm text-foreground-tertiary">{feature.desc}</p>
                      </div>
                      <div className={cn('w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0', feature.status === 'WORKING PROTOTYPE' && 'bg-green-500/10', feature.status === 'EXPERIMENTAL' && 'bg-amber-500/10', feature.status === 'RESEARCH DIRECTION' && 'bg-blue-500/10')}>
                        {getStatusIcon(feature.status)}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ delay: 1 }}
          className="mt-12 max-w-3xl mx-auto p-6 rounded-xl bg-amber-500/5 border border-amber-500/10 text-center"
        >
          <p className="font-semibold text-accent-amber mb-2">Status Label Integrity</p>
          <p className="text-sm text-foreground-tertiary">
            Only features that genuinely exist or are clearly labelled as <strong>Experimental</strong> or <strong>Research Direction</strong> are displayed. 
            No fictional features. No implied capabilities.
          </p>
        </motion.div>
      </div>
    </section>
  );
}