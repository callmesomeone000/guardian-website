'use client';

import { TechnologyStack } from '@/components/sections/TechnologyStack';
import { SystemDataFlow } from '@/components/sections/SystemDataFlow';
import { SecurityPrivacy } from '@/components/sections/SecurityPrivacy';

export function TechnologyPage() {
  return (
    <div className="py-20 lg:py-32">
      <div className="section-container">
        <div className="max-w-4xl mx-auto text-center mb-16">
          <span className="section-label">TECHNOLOGY</span>
          <h1 className="section-heading mb-6">TECHNOLOGY STACK</h1>
          <p className="section-subheading">Only technologies actually used, mapped to their specific purpose in Guardian.</p>
        </div>
        <TechnologyStack />
        <SystemDataFlow />
        <SecurityPrivacy />
      </div>
    </div>
  );
}