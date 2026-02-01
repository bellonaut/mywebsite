import { clsx } from 'clsx';
import type { HTMLAttributes, ReactNode } from 'react';
import { forwardRef } from 'react';

export type CardProps = {
  className?: string;
  children: ReactNode;
} & HTMLAttributes<HTMLDivElement>;

export const Card = forwardRef<HTMLDivElement, CardProps>(function Card({ className, children, ...rest }, ref) {
  return (
    <div
      ref={ref}
      {...rest}
      className={clsx(
        'group relative overflow-hidden rounded-[18px] border border-[var(--border)]/90 bg-[var(--surface)]/94 backdrop-blur-sm transition-all duration-200',
        'shadow-[0_1px_0_rgba(0,0,0,0.02)] card-sheen',
        className,
      )}
    >
      {children}
    </div>
  );
});
