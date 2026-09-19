'use client';

export const dynamic = 'force-dynamic';

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
import { ProductDemo } from '@/components/sections/ProductDemo';
import { TrustedContactDemo } from '@/components/sections/TrustedContactDemo';
import { MultilingualCommunication } from '@/components/sections/MultilingualCommunication';
import { LocationContinuity } from '@/components/sections/LocationContinuity';
import { HealthcareSection } from '@/components/sections/HealthcareSection';
import { DisasterStory } from '@/components/sections/DisasterStory';
import { FeaturesExplorer } from '@/components/sections/FeaturesExplorer';
import { StatusLabelSystem } from '@/components/sections/StatusLabelSystem';
import { ResearchLab } from '@/components/sections/ResearchLab';
import { EvidenceDashboard } from '@/components/sections/EvidenceDashboard';
import { WhatGuardianKnows } from '@/components/sections/WhatGuardianKnows';
import { TechnologyStack } from '@/components/sections/TechnologyStack';
import { SystemDataFlow } from '@/components/sections/SystemDataFlow';
import { SecurityPrivacy } from '@/components/sections/SecurityPrivacy';
import { TeamSection } from '@/components/sections/TeamSection';
import { SIHAlignment } from '@/components/sections/SIHAlignment';
import { TechnicalCredibilityPanel } from '@/components/system/TechnicalCredibilityPanel';
import { FinalCTA } from '@/components/sections/FinalCTA';
import { QRCodeSection } from '@/components/sections/QRCodeSection';

export default function HomePage() {
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
      <ProductDemo />
      <TrustedContactDemo />
      <MultilingualCommunication />
      <LocationContinuity />
      <HealthcareSection />
      <DisasterStory />
      <FeaturesExplorer />
      <StatusLabelSystem />
      <ResearchLab />
      <EvidenceDashboard />
      <WhatGuardianKnows />
      <TechnologyStack />
      <SystemDataFlow />
      <SecurityPrivacy />
      <TeamSection />
      <SIHAlignment />
      <TechnicalCredibilityPanel />
      <FinalCTA />
      <QRCodeSection />
    </>
  );
}