'use client';

import { useFlowSettings } from '../providers/flow-settings';

const sliders = [
  { key: 'intensity', label: 'Intensity', min: 0.2, max: 1 },
  { key: 'density', label: 'Density', min: 0.2, max: 0.9 },
  { key: 'wobble', label: 'Wobble', min: 0, max: 1 },
] as const;

export function FlowControls() {
  const { intensity, density, wobble, setDensity, setIntensity, setWobble } = useFlowSettings();

  const setMap = {
    intensity: setIntensity,
    density: setDensity,
    wobble: setWobble,
  } as const;

  const values = { intensity, density, wobble } as const;

  return (
    <div className="space-y-4 rounded-2xl border border-[var(--border)] bg-white/70 p-4 shadow-soft">
      <div>
        <p className="text-xs uppercase tracking-[0.14em] text-[var(--muted)]">Flow field sandbox</p>
        <p className="text-sm text-[var(--text)]">Tweak the live background; settings respect safe limits.</p>
      </div>
      <div className="space-y-4">
        {sliders.map((slider) => (
          <label key={slider.key} className="block space-y-2">
            <div className="flex items-center justify-between text-sm text-[var(--muted)]">
              <span>{slider.label}</span>
              <span className="font-semibold text-[var(--text)]">{values[slider.key].toFixed(2)}</span>
            </div>
            <input
              type="range"
              min={slider.min}
              max={slider.max}
              step={0.01}
              value={values[slider.key]}
              onChange={(e) => setMap[slider.key](parseFloat(e.target.value))}
              className="h-2 w-full cursor-pointer rounded-full bg-[var(--border)] accent-[var(--accent)]"
              aria-label={slider.label}
            />
          </label>
        ))}
      </div>
      <p className="text-xs text-[var(--muted)]">
        Intensity adjusts the contrast of filaments; density thickens them; wobble softens pointer responsiveness.
      </p>
    </div>
  );
}
