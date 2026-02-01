import { clsx } from 'clsx';

type ChipProps = {
  active?: boolean;
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
};

export function Chip({ active = false, children, onClick, className }: ChipProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={clsx(
        'rounded-full border px-3 py-1.5 text-sm transition-colors',
        active
          ? 'border-[var(--accent)] bg-[var(--accent)]/12 text-[var(--accent)]'
          : 'border-[var(--border)] text-[var(--muted)] hover:border-[var(--accent)] hover:text-[var(--text)]',
        className,
      )}
    >
      {children}
    </button>
  );
}
