'use client';

import { createContext, useContext, useMemo, useState } from 'react';

type FlowSettings = {
  intensity: number;
  density: number;
  wobble: number;
  setIntensity: (v: number) => void;
  setDensity: (v: number) => void;
  setWobble: (v: number) => void;
};

const FlowSettingsContext = createContext<FlowSettings | null>(null);

export function FlowSettingsProvider({ children }: { children: React.ReactNode }) {
  const [intensity, setIntensity] = useState(0.62);
  const [density, setDensity] = useState(0.48);
  const [wobble, setWobble] = useState(0.35);

  const value = useMemo(
    () => ({
      intensity,
      density,
      wobble,
      setIntensity,
      setDensity,
      setWobble,
    }),
    [intensity, density, wobble],
  );

  return <FlowSettingsContext.Provider value={value}>{children}</FlowSettingsContext.Provider>;
}

export function useFlowSettings() {
  const ctx = useContext(FlowSettingsContext);
  if (!ctx) {
    throw new Error('useFlowSettings must be used within FlowSettingsProvider');
  }
  return ctx;
}
