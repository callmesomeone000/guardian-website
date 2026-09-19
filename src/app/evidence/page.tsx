import { Metadata } from 'next';
import { EvidenceDashboard } from '@/components/sections/EvidenceDashboard';
import { WhatGuardianKnows } from '@/components/sections/WhatGuardianKnows';

export const metadata: Metadata = {
  title: 'Evidence — GUARDIAN',
  description: 'What we know: prototype evidence, experimental evidence, literature evidence, research direction.',
};

export default function EvidencePage() {
  return (
    <>
      <EvidenceDashboard />
      <WhatGuardianKnows />
    </>
  );
}