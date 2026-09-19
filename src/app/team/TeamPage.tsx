'use client';

import { TeamSection } from '@/components/sections/TeamSection';
import { SIHAlignment } from '@/components/sections/SIHAlignment';

export function TeamPage() {
  return (
    <div className="py-20 lg:py-32">
      <div className="section-container">
        <div className="max-w-4xl mx-auto text-center mb-16">
          <span className="section-label">TEAM</span>
          <h1 className="section-heading mb-6">GUARDIAN CONSTELLATION</h1>
          <p className="section-subheading">The team behind the architecture.</p>
        </div>
        <TeamSection />
        <SIHAlignment />
      </div>
    </div>
  );
}