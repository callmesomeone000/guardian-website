'use client';

import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { MapPin, Wifi, Battery, AlertTriangle, CheckCircle, XCircle, RefreshCw, Shield, User, Database, Send, RotateCcw, Minimize2, Maximize2 } from 'lucide-react';

const stateFields = [
  { key: 'id', label: 'Emergency ID', value: 'EMG-20260919-143104-A7K9', type: 'string' },
  { key: 'risk', label: 'Risk', value: 'HIGH', type: 'badge', badgeClass: 'bg-red-500/20 text-red-400 border-red-500/30' },
  { key: 'agency', label: 'Human Agency', value: 'UNCONFIRMED', type: 'badge', badgeClass: 'bg-amber-500/20 text-amber-400 border-amber-500/30' },
  { key: 'location.status', label: 'Location', value: 'AVAILABLE', type: 'badge', badgeClass: 'bg-green-500/20 text-green-400 border-green-500/30' },
  { key: 'location.confidence', label: 'Location Confidence', value: 'MODERATE', type: 'badge', badgeClass: 'bg-amber-500/20 text-amber-400 border-amber-500/30' },
  { key: 'location.value', label: 'Coordinates', value: '28.6139° N, 77.2090° E', type: 'string' },
  { key: 'location.lastReliable', label: 'Last Reliable', value: '28.6139° N, 77.2090° E ± 12m', type: 'string' },
  { key: 'communication.cellular', label: 'Cellular', value: 'UNAVAILABLE', type: 'badge', badgeClass: 'bg-red-500/20 text-red-400 border-red-500/30' },
  { key: 'communication.relay', label: 'Relay (BLE Mesh)', value: 'AVAILABLE', type: 'badge', badgeClass: 'bg-green-500/20 text-green-400 border-green-500/30' },
  { key: 'communication.internet', label: 'Internet', value: 'UNAVAILABLE', type: 'badge', badgeClass: 'bg-red-500/20 text-red-400 border-red-500/30' },
  { key: 'resources.battery', label: 'Battery', value: '23%', type: 'progress', progressValue: 23 },
  { key: 'resources.sensing', label: 'Sensing', value: 'DEGRADED', type: 'badge', badgeClass: 'bg-amber-500/20 text-amber-400 border-amber-500/30' },
  { key: 'failures', label: 'Failures', value: ['Cellular timeout (14:31:31)', 'GPS multipath (14:31:28)', 'Battery critical (14:31:35)'], type: 'array' },
  { key: 'capabilities', label: 'Capabilities', value: { alert: 'AVAILABLE', call: 'UNAVAILABLE', locate: 'DEGRADED', relay: 'AVAILABLE', persist: 'AVAILABLE', retry: 'AVAILABLE', reduce: 'AVAILABLE', recover: 'AVAILABLE' }, type: 'capabilities' },
  { key: 'actions', label: 'Actions', value: [
    { type: 'ALERT', timestamp: '14:31:08', outcome: 'PARTIAL', details: 'SMS queued, cellular unavailable' },
    { type: 'RELAY', timestamp: '14:31:42', outcome: 'SUCCESS', details: 'Emergency state relayed via peer' },
    { type: 'PERSIST', timestamp: '14:31:43', outcome: 'SUCCESS', details: 'State written to durable storage' },
  ], type: 'actions' },
  { key: 'deliveryStatus', label: 'Delivery Status', value: 'PARTIAL', type: 'badge', badgeClass: 'bg-amber-500/20 text-amber-400 border-amber-500/30' },
  { key: 'responseStatus', label: 'Response Status', value: 'PENDING', type: 'badge', badgeClass: 'bg-blue-500/20 text-blue-400 border-blue-500/30' },
  { key: 'recoveryStatus', label: 'Recovery Status', value: 'ACTIVE', type: 'badge', badgeClass: 'bg-accent-cyan/20 text-accent-cyan border-accent-cyan/30' },
  { key: 'timestamp', label: 'Timestamp', value: '2026-09-19T14:31:04.123Z', type: 'string' },
  { key: 'stateAge', label: 'State Age', value: '00:02:13', type: 'string' },
  { key: 'currentAction', label: 'Current Action', value: 'RELAY → PERSIST', type: 'string' },
];

export function PersistentEmergencyState() {
  return (
    <section
      id="persistent-emergency-state"
      className="relative py-24 lg:py-32"
      aria-labelledby="state-heading"
    >
      <div className="section-container relative">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <span className="section-label">CORE CONCEPT</span>
          <h2 id="state-heading" className="section-heading mb-6">
            PERSISTENT EMERGENCY STATE
          </h2>
          <p className="section-subheading mx-auto">
            The central state object — a living representation of the emergency that survives process death, device reboot, and network partition.
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="mb-6 p-4 rounded-xl bg-amber-500/5 border border-amber-500/10 flex items-center gap-3">
            <AlertTriangle className="w-5 h-5 text-accent-amber flex-shrink-0" aria-hidden="true" />
            <div>
              <p className="font-medium text-accent-amber">SIMULATION</p>
              <p className="text-sm text-foreground-tertiary">Example values shown below are illustrative simulation data unless backed by actual prototype data.</p>
            </div>
          </div>

          <div className="card-glass overflow-hidden">
            <div className="p-4 border-b border-border-primary flex items-center justify-between bg-background-secondary/50">
              <h3 className="font-semibold text-foreground-primary font-mono text-sm">EmergencyState</h3>
              <span className="status-badge status-experimental">WORKING PROTOTYPE</span>
            </div>
            
            <div className="p-4 overflow-x-auto">
              <dl className="grid grid-cols-1 md:grid-cols-2 gap-4" role="list">
                {stateFields.map((field, index) => (
                  <motion.div
                    key={field.key}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-50px' }}
                    transition={{ delay: index * 0.03 }}
                    className={cn('flex flex-col gap-1', field.type === 'actions' || field.type === 'capabilities' || field.type === 'array' ? 'md:col-span-2' : '')}
                    role="listitem"
                  >
                    <dt className="text-xs font-medium text-foreground-muted uppercase tracking-wider font-mono">{field.label}</dt>
                    <dd className="text-foreground-primary font-mono text-sm">
                      {renderFieldValue(field)}
                    </dd>
                  </motion.div>
                ))}
              </dl>
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ delay: 0.5 }}
            className="mt-8 p-6 rounded-xl bg-accent-cyan/5 border border-accent-cyan/20"
          >
            <h4 className="font-semibold text-accent-cyan mb-3 flex items-center gap-2">
              <Shield className="w-5 h-5" aria-hidden="true" />
              State Persistence Guarantees
            </h4>
            <ul className="space-y-2 text-sm text-foreground-secondary">
              <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-accent-green" aria-hidden="true" /> Written to encrypted local storage on every state transition</li>
              <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-accent-green" aria-hidden="true" /> Survives app process death and device reboot</li>
              <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-accent-green" aria-hidden="true" /> Optional cloud backup with user consent</li>
              <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-accent-green" aria-hidden="true" /> Conflict-free merge on recovery (CRDT-inspired)</li>
              <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-accent-green" aria-hidden="true" /> Full audit trail for counterfactual analysis</li>
            </ul>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function renderFieldValue(field: typeof stateFields[0]): React.ReactNode {
  switch (field.type) {
    case 'badge':
      return (
        <span className={cn('status-badge', field.badgeClass)}>
          {field.value as string}
        </span>
      ) as React.ReactNode;
    case 'progress':
      return (
        <div className="flex items-center gap-3">
          <div className="flex-1 h-2 bg-background-tertiary rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              whileInView={{ width: `${field.progressValue}%` }}
              viewport={{ once: true }}
              className="h-full bg-accent-cyan rounded-full transition-all duration-500"
              style={{ width: `${field.progressValue}%` }}
            />
          </div>
          <span className="text-xs text-foreground-tertiary font-mono w-12">{field.value as string}</span>
        </div>
      ) as React.ReactNode;
    case 'array':
      return (
        <ul className="space-y-1">
          {(field.value as string[]).map((item, i) => (
            <li key={i} className="flex items-center gap-2 text-sm text-foreground-tertiary">
              <XCircle className="w-4 h-4 text-accent-red/60 flex-shrink-0" aria-hidden="true" />
              {item}
            </li>
          ))}
        </ul>
      ) as React.ReactNode;
    case 'capabilities': {
      const capabilities = field.value as Record<string, 'AVAILABLE' | 'DEGRADED' | 'UNAVAILABLE'>;
      return (
        <div className="flex flex-wrap gap-2">
          {Object.entries(capabilities).map(([cap, state]) => (
            <span
              key={cap}
              className={cn(
                'status-badge text-xs',
                state === 'AVAILABLE' && 'capability-available',
                state === 'DEGRADED' && 'capability-degraded',
                state === 'UNAVAILABLE' && 'capability-unavailable'
              )}
            >
              {cap.toUpperCase()}
            </span>
          ))}
        </div>
      ) as React.ReactNode;
    }
    case 'actions':
      return (
        <div className="space-y-2">
          {(field.value as Array<{ type: string; timestamp: string; outcome: string; details: string }>).map((action, i) => (
            <div key={i} className="p-3 rounded-lg bg-background-secondary border border-border-primary">
              <div className="flex items-center justify-between">
                <span className="font-medium text-foreground-primary text-sm font-mono">{action.type}</span>
                <span className={cn(
                  'status-badge text-xs',
                  action.outcome === 'SUCCESS' && 'bg-green-500/20 text-green-400 border-green-500/30',
                  action.outcome === 'PARTIAL' && 'bg-amber-500/20 text-amber-400 border-amber-500/30',
                  action.outcome === 'FAILED' && 'bg-red-500/20 text-red-400 border-red-500/30'
                )}>
                  {action.outcome}
                </span>
              </div>
              <p className="text-xs text-foreground-tertiary mt-1">{action.details}</p>
            </div>
          ))}
        </div>
      ) as React.ReactNode;
    default:
      return <span>{field.value as string}</span> as React.ReactNode;
  }
}