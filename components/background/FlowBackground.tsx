'use client';

import dynamic from 'next/dynamic';
import { Suspense } from 'react';

const FlowFieldScene = dynamic(() => import('./FlowFieldScene'), {
  ssr: false,
  loading: () => (
    <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_22%,rgba(11,135,201,0.12),transparent_40%),radial-gradient(circle_at_72%_20%,rgba(11,63,49,0.12),transparent_36%),radial-gradient(circle_at_48%_78%,rgba(7,70,104,0.16),transparent_32%)]" />
  ),
});

export function FlowBackground() {
  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <div className="absolute inset-0 bg-[var(--bg)]" />
      <Suspense fallback={null}>
        <FlowFieldScene />
      </Suspense>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_24%_22%,rgba(7,85,130,0.12),transparent_34%),radial-gradient(circle_at_74%_16%,rgba(4,40,60,0.14),transparent_32%),radial-gradient(circle_at_50%_86%,rgba(5,52,78,0.16),transparent_28%),linear-gradient(180deg,rgba(0,32,48,0.18),rgba(247,245,239,0.22))]" />
    </div>
  );
}
