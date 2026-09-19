import { Metadata } from 'next';
import { ResearchLab } from '@/components/sections/ResearchLab';
import { FeaturesExplorer } from '@/components/sections/FeaturesExplorer';
import { StatusLabelSystem } from '@/components/sections/StatusLabelSystem';

export const metadata: Metadata = {
  title: 'Research — GUARDIAN',
  description: 'Research lab, features explorer, status label system, development log.',
};

export default function ResearchPage() {
  return (
    <>
      <ResearchLab />
      <FeaturesExplorer />
      <StatusLabelSystem />
    </>
  );
}