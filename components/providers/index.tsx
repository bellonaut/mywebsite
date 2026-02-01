'use client';

import { MotionConfig } from 'framer-motion';
import { FlowSettingsProvider } from './flow-settings';
import { SoundscapeProvider } from './soundscape';

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <MotionConfig
      transition={{
        duration: 0.22,
        ease: [0.18, 0.9, 0.24, 1],
      }}
      reducedMotion="user"
    >
      <FlowSettingsProvider>
        <SoundscapeProvider>{children}</SoundscapeProvider>
      </FlowSettingsProvider>
    </MotionConfig>
  );
}
