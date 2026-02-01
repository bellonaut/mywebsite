'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import { Button } from '../ui/button';
import { clsx } from 'clsx';

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/projects', label: 'Projects' },
  { href: '/writing', label: 'Writing' },
  { href: '/lab', label: 'Lab' },
  { href: '/about', label: 'About' },
  { href: '/contact', label: 'Contact' },
];

export function Header() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-30 border-b border-[var(--border)]/70 bg-[var(--bg)]/75 backdrop-blur-md">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-4 sm:px-8 lg:px-12">
        <Link href="/" className="group relative flex items-center gap-2">
          <div className="h-8 w-8 rounded-full bg-[var(--accent)]/12 ring-1 ring-[var(--accent)]/30 transition group-hover:scale-105" />
          <div className="leading-tight">
            <p className="font-semibold text-[var(--text)]">Bashir Aminu Bello</p>
            <p className="text-xs text-[var(--muted)]">Community research · Data storytelling</p>
          </div>
        </Link>

        <nav className="hidden items-center gap-1 md:flex">
          {navLinks.map((link) => {
            const active =
              link.href === '/'
                ? pathname === '/'
                : pathname === link.href || pathname.startsWith(`${link.href}/`);
            return (
              <Link
                key={link.href}
                href={link.href}
                prefetch
                className={clsx(
                  'relative rounded-full px-3 py-2 text-sm text-[var(--muted)] transition',
                  active ? 'text-[var(--text)]' : 'hover:text-[var(--text)]',
                )}
              >
                <span className="relative z-10">{link.label}</span>
                {active ? (
                  <motion.span
                    layoutId="nav-underline"
                    className="absolute inset-x-1 bottom-1 h-0.5 rounded-full bg-[var(--accent)]/80"
                    transition={{ type: 'spring', stiffness: 330, damping: 28 }}
                  />
                ) : null}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-2">
          <Button href="/resume.pdf" variant="outline" size="sm">
            Download Resume
          </Button>
        </div>
      </div>
    </header>
  );
}
