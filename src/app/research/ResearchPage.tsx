'use client';

import { ResearchLab } from '@/components/sections/ResearchLab';
import { EvidenceDashboard } from '@/components/sections/EvidenceDashboard';
import { WhatGuardianKnows } from '@/components/sections/WhatGuardianKnows';
import { FeaturesExplorer } from '@/components/sections/FeaturesExplorer';
import { StatusLabelSystem } from '@/components/sections/StatusLabelSystem';

export function ResearchPage() {
  return (
    <div className="py-20 lg:py-32">
      <div className="section-container">
        <div className="max-w-4xl mx-auto text-center mb-16">
          <span className="section-label">RESEARCH</span>
          <h1 className="section-heading mb-6">GUARDIAN LAB</h1>
          <p className="section-subheading">Where the architecture becomes measurable.</p>
        </div>
        <ResearchLab />
        <EvidenceDashboard />
        <WhatGuardianKnows />
        <FeaturesExplorer />
        <StatusLabelSystem />
      </div>
    </div>
  );
}