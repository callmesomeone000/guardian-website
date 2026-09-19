'use client';

import { Hero } from '@/components/hero/Hero';
import { ArchitectureExplorer } from '@/components/architecture/ArchitectureExplorer';
import { PersistentEmergencyState } from '@/components/system/PersistentEmergencyState';
import { HumanAgency } from '@/components/system/HumanAgency';
import { EmergencyViabilityEngine } from '@/components/system/EmergencyViabilityEngine';
import { DecisionReplay } from '@/components/system/DecisionReplay';
import { CapabilityGraph } from '@/components/system/CapabilityGraph';
import { TechnicalCredibilityPanel } from '@/components/system/TechnicalCredibilityPanel';

export function SystemPage() {
  return (
    <>
      <Hero />
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