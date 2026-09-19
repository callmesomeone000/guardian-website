import { Metadata } from 'next';
import { ProblemSection } from '@/components/sections/ProblemSection';
import { ConventionalVsGuardian } from '@/components/sections/ConventionalVsGuardian';
import { NotJustSOS } from '@/components/sections/NotJustSOS';
import { DisasterStory } from '@/components/sections/DisasterStory';

export const metadata: Metadata = {
  title: 'Failure Lab — GUARDIAN',
  description: 'Break the system. Simulate failures and watch Guardian adapt. Interactive failure laboratory.',
};

export default function FailureLabPage() {
  return (
    <>
      <ProblemSection />
      <ConventionalVsGuardian />
      <NotJustSOS />
      <DisasterStory />
    </>
  );
}