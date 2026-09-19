import { Metadata } from 'next';
import { TeamSection } from '@/components/sections/TeamSection';
import { SIHAlignment } from '@/components/sections/SIHAlignment';

export const metadata: Metadata = {
  title: 'Team — GUARDIAN',
  description: 'Guardian team: Zaim Rizvi, Urooj, Nabhan, Sumedha, Akram, Hassan.',
};

export default function TeamPage() {
  return (
    <>
      <TeamSection />
      <SIHAlignment />
    </>
  );
}