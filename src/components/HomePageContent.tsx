'use client';

import dynamic from 'next/dynamic';

const HeroDynamic = dynamic(() => import('@/components/hero/Hero').then((mod) => ({ default: mod.Hero })), { ssr: false });
const ProblemSectionDynamic = dynamic(() => import('@/components/sections/ProblemSection').then((mod) => ({ default: mod.ProblemSection })), { ssr: false });
const ConventionalVsGuardianDynamic = dynamic(() => import('@/components/sections/ConventionalVsGuardian').then((mod) => ({ default: mod.ConventionalVsGuardian })), { ssr: false });
const NotJustSOSDynamic = dynamic(() => import('@/components/sections/NotJustSOS').then((mod) => ({ default: mod.NotJustSOS })), { ssr: false });
const ArchitectureExplorerDynamic = dynamic(() => import('@/components/architecture/ArchitectureExplorer').then((mod) => ({ default: mod.ArchitectureExplorer })), { ssr: false });
const PersistentEmergencyStateDynamic = dynamic(() => import('@/components/system/PersistentEmergencyState').then((mod) => ({ default: mod.PersistentEmergencyState })), { ssr: false });
const HumanAgencyDynamic = dynamic(() => import('@/components/system/HumanAgency').then((mod) => ({ default: mod.HumanAgency })), { ssr: false });
const EmergencyViabilityEngineDynamic = dynamic(() => import('@/components/system/EmergencyViabilityEngine').then((mod) => ({ default: mod.EmergencyViabilityEngine })), { ssr: false });
const DecisionReplayDynamic = dynamic(() => import('@/components/system/DecisionReplay').then((mod) => ({ default: mod.DecisionReplay })), { ssr: false });
const CapabilityGraphDynamic = dynamic(() => import('@/components/system/CapabilityGraph').then((mod) => ({ default: mod.CapabilityGraph })), { ssr: false });
const ProductDemoDynamic = dynamic(() => import('@/components/sections/ProductDemo').then((mod) => ({ default: mod.ProductDemo })), { ssr: false });
const TrustedContactDemoDynamic = dynamic(() => import('@/components/sections/TrustedContactDemo').then((mod) => ({ default: mod.TrustedContactDemo })), { ssr: false });
const MultilingualCommunicationDynamic = dynamic(() => import('@/components/sections/MultilingualCommunication').then((mod) => ({ default: mod.MultilingualCommunication })), { ssr: false });
const LocationContinuityDynamic = dynamic(() => import('@/components/sections/LocationContinuity').then((mod) => ({ default: mod.LocationContinuity })), { ssr: false });
const HealthcareSectionDynamic = dynamic(() => import('@/components/sections/HealthcareSection').then((mod) => ({ default: mod.HealthcareSection })), { ssr: false });
const DisasterStoryDynamic = dynamic(() => import('@/components/sections/DisasterStory').then((mod) => ({ default: mod.DisasterStory })), { ssr: false });
const FeaturesExplorerDynamic = dynamic(() => import('@/components/sections/FeaturesExplorer').then((mod) => ({ default: mod.FeaturesExplorer })), { ssr: false });
const StatusLabelSystemDynamic = dynamic(() => import('@/components/sections/StatusLabelSystem').then((mod) => ({ default: mod.StatusLabelSystem })), { ssr: false });
const ResearchLabDynamic = dynamic(() => import('@/components/sections/ResearchLab').then((mod) => ({ default: mod.ResearchLab })), { ssr: false });
const EvidenceDashboardDynamic = dynamic(() => import('@/components/sections/EvidenceDashboard').then((mod) => ({ default: mod.EvidenceDashboard })), { ssr: false });
const WhatGuardianKnowsDynamic = dynamic(() => import('@/components/sections/WhatGuardianKnows').then((mod) => ({ default: mod.WhatGuardianKnows })), { ssr: false });
const TechnologyStackDynamic = dynamic(() => import('@/components/sections/TechnologyStack').then((mod) => ({ default: mod.TechnologyStack })), { ssr: false });
const SystemDataFlowDynamic = dynamic(() => import('@/components/sections/SystemDataFlow').then((mod) => ({ default: mod.SystemDataFlow })), { ssr: false });
const SecurityPrivacyDynamic = dynamic(() => import('@/components/sections/SecurityPrivacy').then((mod) => ({ default: mod.SecurityPrivacy })), { ssr: false });
const TeamSectionDynamic = dynamic(() => import('@/components/sections/TeamSection').then((mod) => ({ default: mod.TeamSection })), { ssr: false });
const SIHAlignmentDynamic = dynamic(() => import('@/components/sections/SIHAlignment').then((mod) => ({ default: mod.SIHAlignment })), { ssr: false });
const TechnicalCredibilityPanelDynamic = dynamic(() => import('@/components/system/TechnicalCredibilityPanel').then((mod) => ({ default: mod.TechnicalCredibilityPanel })), { ssr: false });
const FinalCTADynamic = dynamic(() => import('@/components/sections/FinalCTA').then((mod) => ({ default: mod.FinalCTA })), { ssr: false });
const QRCodeSectionDynamic = dynamic(() => import('@/components/sections/QRCodeSection').then((mod) => ({ default: mod.QRCodeSection })), { ssr: false });

export function HomePageContent() {
  return (
    <>
      <HeroDynamic />
      <ProblemSectionDynamic />
      <ConventionalVsGuardianDynamic />
      <NotJustSOSDynamic />
      <ArchitectureExplorerDynamic />
      <PersistentEmergencyStateDynamic />
      <HumanAgencyDynamic />
      <EmergencyViabilityEngineDynamic />
      <DecisionReplayDynamic />
      <CapabilityGraphDynamic />
      <ProductDemoDynamic />
      <TrustedContactDemoDynamic />
      <MultilingualCommunicationDynamic />
      <LocationContinuityDynamic />
      <HealthcareSectionDynamic />
      <DisasterStoryDynamic />
      <FeaturesExplorerDynamic />
      <StatusLabelSystemDynamic />
      <ResearchLabDynamic />
      <EvidenceDashboardDynamic />
      <WhatGuardianKnowsDynamic />
      <TechnologyStackDynamic />
      <SystemDataFlowDynamic />
      <SecurityPrivacyDynamic />
      <TeamSectionDynamic />
      <SIHAlignmentDynamic />
      <TechnicalCredibilityPanelDynamic />
      <FinalCTADynamic />
      <QRCodeSectionDynamic />
    </>
  );
}