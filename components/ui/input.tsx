import { clsx } from 'clsx';
import type { InputHTMLAttributes } from 'react';

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
  trailing?: React.ReactNode;
};

export function Input({ label, trailing, className, ...rest }: InputProps) {
  return (
    <label className="block space-y-1.5">
      {label ? <span className="text-sm text-[var(--muted)]">{label}</span> : null}
      <div className="relative flex items-center">
        <input
          {...rest}
          className={clsx(
            'w-full rounded-xl border border-[var(--border)] bg-white/70 px-3 py-2.5 text-[var(--text)] outline-none transition focus:border-[var(--accent)]',
            className,
          )}
        />
        {trailing ? <div className="pointer-events-none absolute right-3 text-[var(--muted)]">{trailing}</div> : null}
      </div>
    </label>
  );
}
