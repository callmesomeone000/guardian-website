import { Metadata } from 'next';
import { TechnicalCredibilityPanel } from '@/components/system/TechnicalCredibilityPanel';
import { SystemDataFlow } from '@/components/sections/SystemDataFlow';
import { PersistentEmergencyState } from '@/components/system/PersistentEmergencyState';
import { HumanAgency } from '@/components/system/HumanAgency';
import { EmergencyViabilityEngine } from '@/components/system/EmergencyViabilityEngine';
import { DecisionReplay } from '@/components/system/DecisionReplay';
import { CapabilityGraph } from '@/components/system/CapabilityGraph';

export const metadata: Metadata = {
  title: 'System Architecture — GUARDIAN',
  description: 'Complete technical architecture: emergency state, capability model, decision engine, data flow, and credibility panel.',
};

export default function SystemPage() {
  return (
    <>
      <TechnicalCredibilityPanel />
      <SystemDataFlow />
      <PersistentEmergencyState />
      <HumanAgency />
      <EmergencyViabilityEngine />
      <DecisionReplay />
      <CapabilityGraph />
    </>
  );
}