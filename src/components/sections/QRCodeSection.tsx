'use client';

import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { QrCode, Download, ExternalLink, Smartphone, FileText, Code2, Code } from 'lucide-react';

export function QRCodeSection() {
  const baseUrl = typeof window !== 'undefined' ? window.location.origin : 'https://guardian-sih2026.dev';
  
  const qrData = [
    {
      label: 'Guardian Website',
      url: baseUrl,
      description: 'Full interactive website with architecture, experiments, evidence, and demos',
      icon: Smartphone,
    },
    {
      label: 'Technical Brief',
      url: `${baseUrl}/technical-brief.pdf`,
      description: 'PDF technical brief: problem, architecture, state model, experiments, results, team',
      icon: FileText,
    },
    {
      label: 'Prototype Demo',
      url: `${baseUrl}/#demo-center`,
      description: 'Direct link to demo center with videos, screenshots, and walkthroughs',
      icon: ExternalLink,
    },
  ];

  return (
    <section
      id="qr-codes"
      className="relative py-16 lg:py-24"
      aria-labelledby="qr-heading"
    >
      <div className="section-container relative">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <span className="section-label">SIH SUBMISSION</span>
          <h2 id="qr-heading" className="section-heading mb-6">
            QR CODES & QUICK ACCESS
          </h2>
          <p className="section-subheading mx-auto">
            Scan for instant access. Premium QR codes optimized for print and screen.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto mb-12">
          {qrData.map((item, index) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ delay: index * 0.1 }}
              className="card-hover p-6 text-center group"
            >
              <div className="relative w-48 h-48 mx-auto mb-6">
                {/* QR Code placeholder - in production, use a QR library */}
                <div className="w-full h-full bg-background-elevated border border-border-primary rounded-lg flex items-center justify-center relative overflow-hidden">
                  <div className="grid grid-cols-8 grid-rows-8 gap-0.5 p-4">
                    {/* Simulated QR pattern */}
                    {Array.from({ length: 64 }).map((_, i) => (
                      <div
                        key={i}
                        className={cn(
                          'transition-colors duration-300',
                          (i + index * 7) % 3 === 0 ? 'bg-foreground-primary' : 'bg-background-primary'
                        )}
                      />
                    ))}
                  </div>
                  {/* Quiet zone indicator */}
                  <div className="absolute inset-0 border-4 border-transparent" />
                  
                  <div className="absolute bottom-2 left-1/2 -translate-x-1/2 text-xs text-foreground-muted bg-background-primary/80 px-2 py-1 rounded">
                    QR Placeholder
                  </div>
                </div>
              </div>
              
              <div className="w-10 h-10 mx-auto mb-3 rounded-xl bg-accent-cyan/10 border border-accent-cyan/20 flex items-center justify-center group-hover:bg-accent-cyan/20 transition-colors">
                <item.icon className="w-5 h-5 text-accent-cyan" aria-hidden="true" />
              </div>
              
              <h3 className="font-semibold text-foreground-primary mb-2">{item.label}</h3>
              <p className="text-sm text-foreground-tertiary mb-4">{item.description}</p>
              
              <div className="flex items-center justify-center gap-2">
                <a href={item.url} target="_blank" rel="noopener noreferrer" className="btn btn-secondary btn-sm">
                  <ExternalLink className="w-4 h-4" aria-hidden="true" />
                  Open
                </a>
                <button className="btn btn-ghost btn-sm" aria-label={`Copy ${item.label} URL`}>
                  <Download className="w-4 h-4" aria-hidden="true" />
                </button>
              </div>
              
              <p className="mt-3 text-xs font-mono text-foreground-muted break-all">{item.url}</p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          className="max-w-3xl mx-auto p-6 rounded-xl bg-accent-cyan/5 border border-accent-cyan/20 text-center"
        >
          <h4 className="font-semibold text-accent-cyan mb-3">Human-Readable URLs</h4>
          <div className="space-y-2 text-sm">
            <div className="flex items-center justify-center gap-2 text-foreground-secondary">
              <Code2 className="w-4 h-4 text-accent-cyan" aria-hidden="true" />
              <span className="font-mono">{baseUrl}</span>
            </div>
            <div className="flex items-center justify-center gap-2 text-foreground-tertiary">
              <FileText className="w-4 h-4 text-accent-cyan" aria-hidden="true" />
              <span className="font-mono">{baseUrl}/technical-brief.pdf</span>
            </div>
            <div className="flex items-center justify-center gap-2 text-foreground-tertiary">
              <ExternalLink className="w-4 h-4 text-accent-cyan" aria-hidden="true" />
              <span className="font-mono">{baseUrl}/#demo-center</span>
            </div>
          </div>
          <p className="mt-4 text-xs text-foreground-muted">
            In production: replace QR placeholders with actual QR codes generated from these URLs.
            Use high error correction (Level H) for print durability.
          </p>
        </motion.div>
      </div>
    </section>
  );
}