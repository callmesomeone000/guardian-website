'use client';

import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { Globe, MessageSquare, Database, Languages, Shield, CheckCircle, ArrowRight, Users } from 'lucide-react';

const languageExamples = [
  {
    language: 'English',
    code: 'en',
    message: 'EMERGENCY: Guardian detected a fall. Location: 28.6139°N, 77.2090°E (±12m). Risk: HIGH. User: NON-RESPONSIVE. Please respond.',
    rtl: false,
  },
  {
    language: 'Hindi',
    code: 'hi',
    message: 'आपातकाल: गार्जियन ने गिरावट का पता लगाया। स्थान: 28.6139° उत्तर, 77.2090° पूर्व (±12मी)। जोखिम: HIGH। उपयोगकर्ता: गैर-प्रतिक्रियाशील। कृपया प्रतिक्रिया दें।',
    rtl: false,
  },
  {
    language: 'Urdu',
    code: 'ur',
    message: 'ایمرجنسی: گارڈین نے گرنا پتہ لگایا۔ مقام: 28.6139° شمال، 77.2090° شرق (±12م)। خطرہ: HIGH۔ صارف: غیر-جوابی۔ براہ کرم جواب دیں۔',
    rtl: true,
  },
];

const structuredData = [
  { field: 'event_type', value: 'FALL_DETECTED', localized: false, critical: true },
  { field: 'timestamp', value: '2026-09-19T14:31:04.123Z', localized: false, critical: true },
  { field: 'location.lat', value: '28.6139', localized: false, critical: true },
  { field: 'location.lng', value: '77.2090', localized: false, critical: true },
  { field: 'location.uncertainty_m', value: '12', localized: false, critical: true },
  { field: 'risk_level', value: 'HIGH', localized: false, critical: true },
  { field: 'human_agency', value: 'NON_RESPONSIVE', localized: false, critical: true },
  { field: 'message_text', value: 'Guardian detected a fall...', localized: true, critical: false },
  { field: 'recipient_language', value: 'hi', localized: true, critical: false },
];

export function MultilingualCommunication() {
  return (
    <section
      id="multilingual"
      className="relative py-24 lg:py-32"
      aria-labelledby="multilingual-heading"
    >
      <div className="section-container relative">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <span className="section-label">ACCESSIBILITY LAYER</span>
          <h2 id="multilingual-heading" className="section-heading mb-6">
            MULTILINGUAL EMERGENCY COMMUNICATION
          </h2>
          <p className="section-subheading mx-auto">
            Structured emergency data remains controlled. Human-readable explanatory text is localized per recipient preference.
          </p>
        </div>

        <div className="max-w-5xl mx-auto space-y-12">
          <div>
            <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
              <Globe className="w-6 h-6 text-accent-cyan" aria-hidden="true" />
              Architecture
            </h3>
            <div className="grid md:grid-cols-4 gap-4" role="list">
              {[
                { icon: Database, label: 'Emergency State', desc: 'Risk, location, agency, timestamp, structured data' },
                { icon: Users, label: 'Recipient Profile', desc: 'Preferred language, contact type, priority' },
                { icon: Languages, label: 'Localization', desc: 'Template + structured data → localized text' },
                { icon: MessageSquare, label: 'SMS Delivery', desc: 'Controlled structured payload + human text' },
              ].map((step, index) => (
                <motion.div
                  key={step.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-50px' }}
                  transition={{ delay: index * 0.1 }}
                  className="card-hover p-6 text-center"
                  role="listitem"
                >
                  <div className="w-12 h-12 mx-auto mb-3 rounded-xl bg-accent-cyan/10 border border-accent-cyan/20 flex items-center justify-center">
                    <step.icon className="w-6 h-6 text-accent-cyan" aria-hidden="true" />
                  </div>
                  <h4 className="font-semibold text-foreground-primary mb-1">{step.label}</h4>
                  <p className="text-sm text-foreground-tertiary">{step.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>

          <div className="technical-line" aria-hidden="true" />

          <div>
            <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
              <MessageSquare className="w-6 h-6 text-accent-cyan" aria-hidden="true" />
              Live Examples (English / Hindi / Urdu)
            </h3>
            <div className="grid md:grid-cols-3 gap-4" role="list">
              {languageExamples.map((example, index) => (
                <motion.div
                  key={example.language}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-50px' }}
                  transition={{ delay: index * 0.1 }}
                  className={cn('card-hover p-6', example.rtl && 'text-right')}
                  role="listitem"
                >
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="font-semibold text-foreground-primary">{example.language}</h4>
                    <span className="status-badge text-xs bg-blue-500/20 text-blue-400 border-blue-500/30">{example.code}</span>
                  </div>
                  <div className={cn('p-4 rounded-lg bg-background-elevated border border-border-primary font-mono text-sm text-foreground-secondary', example.rtl && 'rtl')}>
                    {example.message}
                  </div>
                  {example.rtl && <div className="mt-2 text-xs text-foreground-muted">RTL layout</div>}
                </motion.div>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
              <Shield className="w-6 h-6 text-accent-cyan" aria-hidden="true" />
              Structured Data vs Localized Text
            </h3>
            <div className="overflow-x-auto">
              <table className="w-full" role="table" aria-label="Structured data fields and localization status">
                <thead>
                  <tr className="border-b border-border-secondary">
                    <th className="text-left p-3 font-semibold text-foreground-primary">Field</th>
                    <th className="text-left p-3 font-semibold text-foreground-primary">Value</th>
                    <th className="text-left p-3 font-semibold text-foreground-primary">Localized</th>
                    <th className="text-left p-3 font-semibold text-foreground-primary">Critical</th>
                  </tr>
                </thead>
                <tbody>
                  {structuredData.map((row, index) => (
                    <motion.tr
                      key={row.field}
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, margin: '-50px' }}
                      transition={{ delay: index * 0.02 }}
                      className={cn('border-b border-border-primary/50', index % 2 === 0 ? 'bg-background-secondary/30' : '')}
                    >
                      <td className="p-3 font-mono text-sm text-foreground-secondary">{row.field}</td>
                      <td className="p-3 font-mono text-sm text-foreground-primary">{row.value}</td>
                      <td className="p-3">
                        <span className={cn('status-badge text-xs', row.localized ? 'bg-blue-500/20 text-blue-400 border-blue-500/30' : 'bg-green-500/20 text-green-400 border-green-500/30')}>
                          {row.localized ? 'YES (text)' : 'NO (controlled)'}
                        </span>
                      </td>
                      <td className="p-3">
                        <span className={cn('status-badge text-xs', row.critical ? 'bg-red-500/20 text-red-400 border-red-500/30' : 'bg-gray-500/20 text-gray-400 border-gray-500/30')}>
                          {row.critical ? 'CRITICAL' : 'Context'}
                        </span>
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ delay: 0.5 }}
            className="p-6 rounded-xl bg-amber-500/5 border border-amber-500/10"
          >
            <div className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-accent-green flex-shrink-0 mt-0.5" aria-hidden="true" />
              <div>
                <h4 className="font-semibold text-accent-green mb-2">Design Principle</h4>
                <p className="text-sm text-foreground-tertiary">
                  <strong>Critical structured data</strong> (risk, location, timestamp, agency) is never localized — it remains machine-parseable and controlled. 
                  Only the <strong>human-readable explanatory text</strong> is localized. This ensures emergency systems can always parse the critical payload regardless of recipient language.
                </p>
                <p className="text-sm text-foreground-tertiary mt-2">
                  Marked as: <strong>Accessibility / usability layer</strong> — not core innovation.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}