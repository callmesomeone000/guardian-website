'use client';

import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { Users, Code, Brain, FlaskConical, Wrench, Server, GraduationCap, Award } from 'lucide-react';

const teamMembers = [
  {
    id: 'zaim-rizvi',
    name: 'Zaim Rizvi',
    role: 'Architecture, Firebase, FastAPI, Integration',
    contribution: 'System architecture design, Firebase backend, FastAPI services, end-to-end integration, deployment pipeline',
    photo: null,
    shortBio: 'Full-stack engineer focusing on scalable backend systems and real-time data synchronization.',
    technicalModules: ['Firebase', 'FastAPI', 'Architecture', 'Integration', 'Deployment'],
    achievements: ['Architecture design', 'Backend services', 'CI/CD pipeline'],
  },
  {
    id: 'urooj',
    name: 'Urooj',
    role: 'Flutter / UI',
    contribution: 'Flutter mobile application, Material 3 UI, emergency flows, accessibility, multilingual support',
    photo: null,
    shortBio: 'Mobile developer specializing in Flutter with focus on emergency UX and accessibility.',
    technicalModules: ['Flutter', 'UI/UX', 'Emergency Flows', 'Accessibility', 'i18n'],
    achievements: ['Emergency UI', 'Multilingual support', 'Material 3 migration'],
  },
  {
    id: 'nabhan',
    name: 'Nabhan',
    role: 'Python / Risk Engine',
    contribution: 'Risk computation, Bayesian evidence fusion, decision logic, Chaquopy integration, on-device ML',
    photo: null,
    shortBio: 'ML engineer focused on on-device inference, sensor fusion, and real-time risk assessment.',
    technicalModules: ['Python', 'Risk Engine', 'Bayesian Fusion', 'Chaquopy', 'On-device ML'],
    achievements: ['Risk algorithm', 'Sensor fusion', 'Chaquopy integration'],
  },
  {
    id: 'sumedha',
    name: 'Sumedha',
    role: 'Research / Healthcare / Fall Detection',
    contribution: 'Fall detection research, healthcare integration, medical context, clinical validation, literature review',
    photo: null,
    shortBio: 'Researcher bridging clinical requirements with technical implementation. Healthcare domain expert.',
    technicalModules: ['Fall Detection', 'Healthcare', 'Clinical Validation', 'Medical Context', 'Literature'],
    achievements: ['Fall detection research', 'Medical QR design', 'Clinical partnerships'],
  },
  {
    id: 'akram',
    name: 'Akram',
    role: 'Research / Engineering',
    contribution: 'Communication resilience, BLE mesh relay, store-and-forward, network failure adaptation',
    photo: null,
    shortBio: 'Systems researcher focusing on delay-tolerant networking and emergency communication.',
    technicalModules: ['BLE Mesh', 'DTN', 'Relay', 'Network Adaptation', 'Communication'],
    achievements: ['Guardian-to-Guardian relay', 'Mesh discovery', 'Store-and-forward'],
  },
  {
    id: 'hassan',
    name: 'Hassan',
    role: 'Research / Engineering',
    contribution: 'Location continuity, PDR, sensor fusion, GPS degradation, uncertainty quantification',
    photo: null,
    shortBio: 'Location systems researcher. Pedestrian dead reckoning, multi-source fusion, indoor positioning.',
    technicalModules: ['PDR', 'Sensor Fusion', 'GPS', 'Location Continuity', 'Uncertainty'],
    achievements: ['PDR implementation', 'Fusion pipeline', 'Uncertainty modeling'],
  },
];

export function TeamSection() {
  return (
    <section
      id="team"
      className="relative py-24 lg:py-32"
      aria-labelledby="team-heading"
    >
      <div className="section-container relative">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <span className="section-label">TEAM</span>
          <h2 id="team-heading" className="section-heading mb-6">
            GUARDIAN CONSTELLATION
          </h2>
          <p className="section-subheading mx-auto">
            Six students. One adaptive architecture. Each member owns a technical pillar.
          </p>
        </div>

        <div className="relative max-w-5xl mx-auto mb-16">
          {/* Central Guardian node */}
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.3, duration: 500 }}
              className="w-24 h-24 rounded-2xl bg-gradient-to-br from-accent-cyan to-accent-blue flex items-center justify-center shadow-glow-strong border-2 border-accent-cyan"
            >
              <span className="text-background-primary font-bold text-sm text-center leading-tight">GUARDIAN</span>
            </motion.div>
            
            {/* Pulse rings */}
            <div className="absolute inset-0">
              {[0, 1, 2].map((i) => (
                <motion.div
                  key={i}
                  initial={{ scale: 0.5, opacity: 0.5 }}
                  animate={{ scale: 2, opacity: 0 }}
                  transition={{ duration: 3, repeat: Infinity, delay: i * 1 }}
                  className="absolute inset-0 rounded-2xl border-2 border-accent-cyan/30"
                />
              ))}
            </div>
          </div>

          {/* Team members around center */}
          <div className="relative aspect-square">
            {teamMembers.map((member, index) => {
              const angle = (index / teamMembers.length) * 2 * Math.PI - Math.PI / 2;
              const radius = 280;
              const x = radius * Math.cos(angle);
              const y = radius * Math.sin(angle);
              
              return (
                <motion.div
                  key={member.id}
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.4 + index * 0.1, duration: 400 }}
                  style={{ 
                    position: 'absolute',
                    left: '50%',
                    top: '50%',
                    transform: `translate(${x}px, ${y}px) translate(-50%, -50%)`,
                  }}
                  className="z-10"
                >
                  <div className="w-20 h-20 rounded-xl bg-background-elevated border border-border-primary flex items-center justify-center shadow-lg relative group">
                    {member.photo ? (
                      <img src={member.photo} alt={member.name} className="w-full h-full rounded-xl object-cover" />
                    ) : (
                      <div className="w-10 h-10 rounded-lg bg-accent-cyan/10 border border-accent-cyan/20 flex items-center justify-center">
                        <Code className="w-5 h-5 text-accent-cyan" aria-hidden="true" />
                      </div>
                    )}
                    {/* Connection line to center */}
                    <div 
                      className="absolute w-0.5 h-40 bg-gradient-to-t from-accent-cyan/50 to-transparent"
                      style={{
                        left: '50%',
                        top: angle > 0 && angle < Math.PI ? '-40px' : '20px',
                        transform: `translateX(-50%) rotate(${angle > 0 && angle < Math.PI ? 0 : 180}deg)`,
                      }}
                    />
                  </div>
                  
                  {/* Tooltip on hover */}
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="absolute bottom-full left-1/2 -translate-x-1/2 mb-4 w-64 p-3 rounded-lg bg-background-elevated border border-border-primary shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none z-20 text-center"
                  >
                    <p className="font-semibold text-foreground-primary text-sm">{member.name}</p>
                    <p className="text-xs text-foreground-tertiary">{member.role}</p>
                  </motion.div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Detailed cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {teamMembers.map((member, index) => (
            <motion.div
              key={member.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ delay: index * 0.08 }}
              className="card-hover p-6"
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="w-14 h-14 rounded-xl bg-accent-cyan/10 border border-accent-cyan/20 flex items-center justify-center flex-shrink-0">
                  {member.photo ? (
                    <img src={member.photo} alt="" className="w-full h-full rounded-xl object-cover" />
                  ) : (
                    <Code className="w-6 h-6 text-accent-cyan" aria-hidden="true" />
                  )}
                </div>
                <div>
                  <h3 className="font-semibold text-foreground-primary">{member.name}</h3>
                  <p className="text-sm text-foreground-tertiary">{member.role}</p>
                </div>
              </div>
              
              <p className="text-sm text-foreground-secondary mb-4">{member.shortBio}</p>
              
              <div className="space-y-3">
                <div>
                  <p className="text-xs font-medium text-foreground-muted uppercase tracking-wider mb-2">Technical Modules</p>
                  <div className="flex flex-wrap gap-2">
                    {member.technicalModules.map((module, i) => (
                      <span key={i} className="px-2 py-1 text-xs rounded bg-background-secondary border border-border-primary text-foreground-tertiary">
                        {module}
                      </span>
                    ))}
                  </div>
                </div>
                <div>
                  <p className="text-xs font-medium text-foreground-muted uppercase tracking-wider mb-2">Key Achievements</p>
                  <ul className="space-y-1">
                    {member.achievements.map((achievement, i) => (
                      <li key={i} className="flex items-center gap-2 text-xs text-foreground-tertiary">
                        <Award className="w-3 h-3 text-accent-cyan" aria-hidden="true" />
                        {achievement}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}