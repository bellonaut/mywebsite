import { clsx } from 'clsx';

type SectionProps = {
  id?: string;
  className?: string;
  children: React.ReactNode;
};

type HeadingProps = {
  eyebrow?: string;
  title: string;
  description?: string;
  actions?: React.ReactNode;
  className?: string;
};

export function Section({ id, className, children }: SectionProps) {
  return (
    <section id={id} className={clsx('py-16 sm:py-20', className)}>
      {children}
    </section>
  );
}

export function SectionHeading({ eyebrow, title, description, actions, className }: HeadingProps) {
  return (
    <div className={clsx('flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between', className)}>
      <div className="max-w-3xl space-y-2">
        {eyebrow ? (
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[var(--muted)]">{eyebrow}</p>
        ) : null}
        <h2
          className="text-3xl font-semibold leading-[1.05] text-[var(--text)] sm:text-4xl"
          style={{ fontFamily: 'var(--font-serif)' }}
        >
          {title}
        </h2>
        {description ? <p className="text-base text-[var(--muted)] sm:text-lg">{description}</p> : null}
      </div>
      {actions ? <div className="flex shrink-0 items-center gap-3">{actions}</div> : null}
    </div>
  );
}
