'use client';

import { useState } from 'react';
import { ResponsiveContainer, LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, Legend } from 'recharts';
import { clsx } from 'clsx';

const data = [
  { label: 'Week 1', mae: 1.6, rmse: 2.3 },
  { label: 'Week 2', mae: 1.4, rmse: 2.0 },
  { label: 'Week 3', mae: 1.3, rmse: 1.9 },
  { label: 'Week 4', mae: 1.1, rmse: 1.7 },
  { label: 'Week 5', mae: 1.2, rmse: 1.8 },
  { label: 'Week 6', mae: 1.0, rmse: 1.5 },
];

type CustomTooltipProps = {
  active?: boolean;
  payload?: { name?: string; value?: number }[];
  label?: string | number;
};

const metricConfig = {
  mae: { label: 'MAE', color: '#0f8ec7' },
  rmse: { label: 'RMSE', color: '#0c3d2c' },
} as const;

function CustomTooltip({ active, payload, label }: CustomTooltipProps) {
  if (!active || !payload?.length) return null;
  return (
    <div className="rounded-xl border border-[var(--border)] bg-white/90 px-3 py-2 text-sm shadow-soft">
      <p className="font-semibold">{label}</p>
      {payload.map((entry, idx) => (
        <p key={idx} className="text-[var(--muted)]">
          {entry.name}: {entry.value?.toFixed(2)}
        </p>
      ))}
    </div>
  );
}

export function ModelEvaluator() {
  const [metric, setMetric] = useState<'mae' | 'rmse'>('mae');

  return (
    <div className="space-y-3 rounded-2xl border border-[var(--border)] bg-white/70 p-4 shadow-soft">
      <div className="flex items-center justify-between gap-3">
        <div>
          <p className="text-xs uppercase tracking-[0.14em] text-[var(--muted)]">Model evaluation</p>
          <p className="text-sm text-[var(--text)]">Toy data showing MAE vs RMSE behaviour.</p>
        </div>
        <div className="flex items-center gap-2 rounded-full border border-[var(--border)] bg-white px-1 py-1">
          {(['mae', 'rmse'] as const).map((key) => (
            <button
              key={key}
              type="button"
              onClick={() => setMetric(key)}
              className={clsx(
                'rounded-full px-3 py-1 text-sm transition',
                metric === key ? 'bg-[var(--accent)]/15 text-[var(--accent)]' : 'text-[var(--muted)]',
              )}
            >
              {metricConfig[key].label}
            </button>
          ))}
        </div>
      </div>
      <div className="h-60 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,0,0,0.06)" />
            <XAxis dataKey="label" tick={{ fill: 'var(--muted)', fontSize: 12 }} />
            <YAxis tick={{ fill: 'var(--muted)', fontSize: 12 }} />
            <Tooltip content={<CustomTooltip />} />
            <Legend />
            <Line
              type="monotone"
              dataKey={metric}
              name={metricConfig[metric].label}
              stroke={metricConfig[metric].color}
              strokeWidth={3}
              dot={{ r: 4 }}
              activeDot={{ r: 6 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
      <p className="text-xs text-[var(--muted)]">
        Switch metrics to highlight sensitivity to outliers; RMSE punishes spikes harder than MAE.
      </p>
    </div>
  );
}
