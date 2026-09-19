import { Metadata } from 'next';
import { JudgeModePage } from './JudgeModePage';

export const metadata: Metadata = {
  title: 'Judge Mode — GUARDIAN',
  description: 'Ultra-clear evidence-first mode for judges. Problem, Innovation, Architecture, Prototype, Experiments, Results, Limitations, Team.',
};

export default function JudgeModeLayout() {
  return <JudgeModePage />;
}