'use client';

import { EvidenceDashboard } from '@/components/sections/EvidenceDashboard';
import { WhatGuardianKnows } from '@/components/sections/WhatGuardianKnows';
import { FeaturesExplorer } from '@/components/sections/FeaturesExplorer';
import { StatusLabelSystem } from '@/components/sections/StatusLabelSystem';

export function EvidencePage() {
  return (
    <div className="py-20 lg:py-32">
      <div className="section-container">
        <div className="max-w-4xl mx-auto text-center mb-16">
          <span className="section-label">EVIDENCE</span>
          <h1 className="section-heading mb-6">WHAT WE KNOW</h1>
          <p className="section-subheading">Prototype evidence, experimental evidence, literature evidence, and research directions.</p>
        </div>
        <EvidenceDashboard />
        <WhatGuardianKnows />
        <FeaturesExplorer />
        <StatusLabelSystem />
      </div>
    </div>
  );
}