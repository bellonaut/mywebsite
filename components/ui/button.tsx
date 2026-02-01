'use client';

import Link from 'next/link';
import { clsx } from 'clsx';
import type { AnchorHTMLAttributes, ButtonHTMLAttributes, MouseEvent } from 'react';

type Variant = 'primary' | 'ghost' | 'outline';
type Size = 'sm' | 'md' | 'lg';

type BaseProps = {
  variant?: Variant;
  size?: Size;
  className?: string;
  children: React.ReactNode;
};

type LinkProps = BaseProps & AnchorHTMLAttributes<HTMLAnchorElement> & { href: string };
type NativeButtonProps = BaseProps & ButtonHTMLAttributes<HTMLButtonElement> & { href?: undefined };

type ButtonProps = LinkProps | NativeButtonProps;

const variantStyles: Record<Variant, string> = {
  primary:
    'bg-[var(--accent)] text-white shadow-soft hover:translate-y-[-1px] hover:shadow-lg focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent)]',
  ghost:
    'bg-white/70 text-[var(--text)] border border-[var(--border)] hover:border-[var(--accent)] hover:bg-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent)]',
  outline:
    'border border-[var(--border)] text-[var(--text)] hover:border-[var(--accent)] hover:text-[var(--text)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent)]',
};

const sizeStyles: Record<Size, string> = {
  sm: 'px-3 py-2 text-sm',
  md: 'px-4 py-2.5 text-sm',
  lg: 'px-5 py-3 text-base',
};

export function Button(props: ButtonProps) {
  const { variant = 'primary', size = 'md', className, children } = props;
  const classes = clsx(
    'relative overflow-hidden inline-flex items-center gap-2 rounded-full transition-transform duration-150 will-change-transform isolate',
    variantStyles[variant],
    sizeStyles[size],
    className,
  );

  const addRipple = (event: MouseEvent<HTMLElement>) => {
    const target = event.currentTarget as HTMLElement;
    const rect = target.getBoundingClientRect();
    const ripple = document.createElement('span');
    ripple.className =
      'pointer-events-none absolute inset-0 rounded-full bg-white/30 animate-[ripple_520ms_ease-out] mix-blend-soft-light';
    const size = Math.max(rect.width, rect.height);
    ripple.style.width = ripple.style.height = `${size}px`;
    ripple.style.left = `${event.clientX - rect.left - size / 2}px`;
    ripple.style.top = `${event.clientY - rect.top - size / 2}px`;
    target.appendChild(ripple);
    ripple.addEventListener('animationend', () => ripple.remove());
  };

  const isLink = (p: ButtonProps): p is LinkProps => 'href' in p && typeof p.href === 'string';

  if (isLink(props)) {
    const { href, ...rest } = props;
    return (
      <Link className={classes} href={href} {...rest} onMouseDown={(e) => addRipple(e)}>
        {children}
      </Link>
    );
  }

  const { type = 'button', ...rest } = props;
  return (
    <button className={classes} type={type} {...rest} onMouseDown={addRipple}>
      {children}
    </button>
  );
}
