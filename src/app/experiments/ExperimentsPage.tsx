'use client';

import { ResearchLab } from '@/components/sections/ResearchLab';
import { EvidenceDashboard } from '@/components/sections/EvidenceDashboard';
import { FeaturesExplorer } from '@/components/sections/FeaturesExplorer';
import { StatusLabelSystem } from '@/components/sections/StatusLabelSystem';

export function ExperimentsPage() {
  return (
    <div className="py-20 lg:py-32">
      <div className="section-container">
        <div className="max-w-4xl mx-auto text-center mb-16">
          <span className="section-label">EXPERIMENTS</span>
          <h1 className="section-heading mb-6">MEASURE THE RESPONSE</h1>
          <p className="section-subheading">Research experiments, methodology, and validation status.</p>
        </div>
        <ResearchLab />
        <EvidenceDashboard />
        <FeaturesExplorer />
        <StatusLabelSystem />
      </div>
    </div>
  );
}