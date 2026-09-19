'use client';

import { Hero } from '@/components/hero/Hero';
import { ProblemSection } from '@/components/sections/ProblemSection';
import { ConventionalVsGuardian } from '@/components/sections/ConventionalVsGuardian';
import { NotJustSOS } from '@/components/sections/NotJustSOS';
import { ArchitectureExplorer } from '@/components/architecture/ArchitectureExplorer';
import { PersistentEmergencyState } from '@/components/system/PersistentEmergencyState';
import { HumanAgency } from '@/components/system/HumanAgency';
import { EmergencyViabilityEngine } from '@/components/system/EmergencyViabilityEngine';
import { DecisionReplay } from '@/components/system/DecisionReplay';
import { CapabilityGraph } from '@/components/system/CapabilityGraph';
import { TechnicalCredibilityPanel } from '@/components/system/TechnicalCredibilityPanel';

export function FailureLabPage() {
  return (
    <>
      <Hero />
      <ProblemSection />
      <ConventionalVsGuardian />
      <NotJustSOS />
      <ArchitectureExplorer />
      <PersistentEmergencyState />
      <HumanAgency />
      <EmergencyViabilityEngine />
      <DecisionReplay />
      <CapabilityGraph />
      <TechnicalCredibilityPanel />
    </>
  );
}