'use client';

import { useState } from 'react';
import { Button } from '../ui/button';
import { clsx } from 'clsx';

const steps = [
  {
    title: 'Configural',
    summary: 'Same factor structure across groups; establishes the baseline map.',
    note: 'Check: loadings allowed to differ. Output: model fit indices, factor correlations.',
  },
  {
    title: 'Metric',
    summary: 'Factor loadings constrained equal; lets you compare relationships.',
    note: 'If fit holds, group differences reflect intercepts/means rather than scaling.',
  },
  {
    title: 'Scalar',
    summary: 'Intercepts constrained equal; enables mean comparisons.',
    note: 'If it breaks, flag items for partial invariance and report adjustments.',
  },
];

export function MeasurementStepper() {
  const [index, setIndex] = useState(0);
  const current = steps[index];

  const next = () => setIndex((prev) => Math.min(prev + 1, steps.length - 1));
  const prev = () => setIndex((prev) => Math.max(prev - 1, 0));

  return (
    <div className="space-y-3 rounded-2xl border border-[var(--border)] bg-white/70 p-4 shadow-soft">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.14em] text-[var(--muted)]">Measurement invariance</p>
          <h3 className="text-lg font-semibold text-[var(--text)]">{current.title}</h3>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="sm" onClick={prev} disabled={index === 0}>
            Previous
          </Button>
          <Button variant="primary" size="sm" onClick={next} disabled={index === steps.length - 1}>
            Next
          </Button>
        </div>
      </div>

      <p className="text-[var(--text)]">{current.summary}</p>
      <p className="text-sm text-[var(--muted)]">{current.note}</p>

      <div className="flex items-center gap-2">
        {steps.map((step, i) => (
          <div key={step.title} className="flex flex-col items-center gap-1">
            <div
              className={clsx(
                'h-9 w-9 rounded-full border text-xs font-semibold leading-9 text-center',
                i === index
                  ? 'border-[var(--accent)] bg-[var(--accent)]/15 text-[var(--accent)]'
                  : 'border-[var(--border)] text-[var(--muted)]',
              )}
            >
              {i + 1}
            </div>
            <div className="text-[11px] text-[var(--muted)]">{step.title}</div>
          </div>
        ))}
      </div>

      <div className="relative h-2 w-full overflow-hidden rounded-full bg-[var(--border)]/60">
        <div
          className="absolute inset-y-0 left-0 rounded-full bg-[var(--accent)]"
          style={{ width: `${((index + 1) / steps.length) * 100}%`, transition: 'width 200ms ease' }}
        />
      </div>
    </div>
  );
}
