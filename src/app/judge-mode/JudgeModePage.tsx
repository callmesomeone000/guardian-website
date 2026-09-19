'use client';

import { Hero } from '@/components/hero/Hero';
import { ProblemSection } from '@/components/sections/ProblemSection';
import { ConventionalVsGuardian } from '@/components/sections/ConventionalVsGuardian';
import { ArchitectureExplorer } from '@/components/architecture/ArchitectureExplorer';
import { PersistentEmergencyState } from '@/components/system/PersistentEmergencyState';
import { HumanAgency } from '@/components/system/HumanAgency';
import { EmergencyViabilityEngine } from '@/components/system/EmergencyViabilityEngine';
import { DecisionReplay } from '@/components/system/DecisionReplay';
import { CapabilityGraph } from '@/components/system/CapabilityGraph';
import { FeaturesExplorer } from '@/components/sections/FeaturesExplorer';
import { ResearchLab } from '@/components/sections/ResearchLab';
import { EvidenceDashboard } from '@/components/sections/EvidenceDashboard';
import { WhatGuardianKnows } from '@/components/sections/WhatGuardianKnows';
import { TeamSection } from '@/components/sections/TeamSection';
import { TechnicalCredibilityPanel } from '@/components/system/TechnicalCredibilityPanel';

export function JudgeModePage() {
  return (
    <>
      <style jsx>{`
        .judge-mode * {
          animation: none !important;
          transition: none !important;
        }
        .judge-mode .animate-pulse-soft,
        .judge-mode .animate-spin {
          animation: none !important;
        }
      `}</style>
      
      <div className="judge-mode">
        <Hero />
        <ProblemSection />
        <ConventionalVsGuardian />
        <ArchitectureExplorer />
        <PersistentEmergencyState />
        <HumanAgency />
        <EmergencyViabilityEngine />
        <DecisionReplay />
        <CapabilityGraph />
        <FeaturesExplorer />
        <ResearchLab />
        <EvidenceDashboard />
        <WhatGuardianKnows />
        <TeamSection />
        <TechnicalCredibilityPanel />
      </div>
    </>
  );
}