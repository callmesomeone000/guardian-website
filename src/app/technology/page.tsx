import { Metadata } from 'next';
import { TechnologyStack } from '@/components/sections/TechnologyStack';
import { SecurityPrivacy } from '@/components/sections/SecurityPrivacy';
import { SystemDataFlow } from '@/components/sections/SystemDataFlow';

export const metadata: Metadata = {
  title: 'Technology — GUARDIAN',
  description: 'Technology stack, security & privacy, system data flow.',
};

export default function TechnologyPage() {
  return (
    <>
      <TechnologyStack />
      <SecurityPrivacy />
      <SystemDataFlow />
    </>
  );
}