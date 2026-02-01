import { clsx } from 'clsx';

type BadgeProps = {
  children: React.ReactNode;
  tone?: 'accent' | 'muted' | 'outline';
  className?: string;
};

export function Badge({ children, tone = 'muted', className }: BadgeProps) {
  const base =
    'inline-flex items-center gap-1 rounded-full px-3 py-1 text-xs uppercase tracking-[0.08em] transition-colors';
  const tones: Record<NonNullable<BadgeProps['tone']>, string> = {
    accent: 'bg-[var(--accent)]/12 text-[var(--accent)] border border-[var(--accent)]/30',
    muted: 'bg-[var(--border)]/60 text-[var(--muted)] border border-[var(--border)]',
    outline: 'text-[var(--muted)] border border-[var(--border)]',
  };

  return <span className={clsx(base, tones[tone], className)}>{children}</span>;
}
