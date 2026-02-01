'use client';

import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { SlidersHorizontal, Waves, Sparkles } from 'lucide-react';
import { clsx } from 'clsx';
import { useFlowSettings } from '../providers/flow-settings';

type FlowControlsProps = {
  className?: string;
};

const presets = [
  { label: 'Calm', value: 0.32 },
  { label: 'Story', value: 0.58 },
  { label: 'Storm', value: 0.82 },
];

export function FlowControls({ className }: FlowControlsProps) {
  const { intensity, density, wobble, setIntensity, setDensity, setWobble } = useFlowSettings();
  const [open, setOpen] = useState(false);

  const slider = (label: string, value: number, onChange: (v: number) => void, icon?: React.ReactNode) => (
    <label className="space-y-2 text-xs font-semibold text-[var(--muted)]">
      <div className="flex items-center gap-2">
        {icon}
        <span>{label}</span>
        <span className="ml-auto text-[var(--text)]">{Math.round(value * 100)}</span>
      </div>
      <input
        type="range"
        min={0}
        max={1}
        step={0.01}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="ocean-slider w-full"
        aria-label={label}
      />
    </label>
  );

  return (
    <div className={clsx('pointer-events-auto', className)}>
      <button
        onClick={() => setOpen((v) => !v)}
        className="group inline-flex items-center gap-2 rounded-full border border-[var(--border)]/80 bg-[var(--surface)]/90 px-3 py-2 text-sm text-[var(--text)] shadow-soft backdrop-blur transition hover:border-[var(--accent)]"
      >
        <SlidersHorizontal className="h-4 w-4 text-[var(--accent)]" />
        Flow controls
        <span className="text-[var(--muted)] text-xs group-hover:text-[var(--text)]">({open ? 'hide' : 'show'})</span>
      </button>

      <AnimatePresence initial={false}>
        {open ? (
          <motion.div
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.18 }}
            className="mt-3 space-y-3 rounded-2xl border border-[var(--border)]/80 bg-[var(--surface)]/92 p-4 shadow-soft backdrop-blur"
          >
            {slider('Intensity', intensity, setIntensity, <Waves className="h-4 w-4 text-[var(--accent)]" />)}
            {slider('Density', density, setDensity, <Sparkles className="h-4 w-4 text-[var(--accent)]" />)}
            {slider('Wobble', wobble, setWobble, <Sparkles className="h-4 w-4 text-[var(--accent)]" />)}

            <div className="flex flex-wrap gap-2 pt-1 text-[var(--muted)]">
              {presets.map((preset) => (
                <button
                  key={preset.label}
                  onClick={() => {
                    setIntensity(preset.value);
                    setDensity(Math.min(1, preset.value + 0.08));
                    setWobble(Math.min(1, preset.value + 0.12));
                  }}
                  className="rounded-full border border-[var(--border)] px-3 py-1 text-xs text-[var(--text)] transition hover:border-[var(--accent)] hover:text-[var(--text)]"
                >
                  {preset.label}
                </button>
              ))}
            </div>
            <p className="text-xs leading-relaxed text-[var(--muted)]">
              Drag the sliders or move your pointer - the shader reacts to both. Perfect for demoing the ocean backdrop
              in client calls.
            </p>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}

