import { Metadata } from 'next';
import { ResearchLab } from '@/components/sections/ResearchLab';

export const metadata: Metadata = {
  title: 'Research & Experiments — GUARDIAN',
  description: 'Guardian Lab: experiments, hypotheses, methodologies, and living research portal.',
};

export default function ExperimentsPage() {
  return (
    <ResearchLab />
  );
}