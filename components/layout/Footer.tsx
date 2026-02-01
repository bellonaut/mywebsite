import Link from 'next/link';
import { socials } from '@/data/socials';
import { Container } from '../ui/container';

export function Footer() {
  return (
    <footer className="border-t border-[var(--border)]/70 bg-[var(--surface)]/70 backdrop-blur">
      <Container className="flex flex-col gap-6 py-10 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-sm font-semibold text-[var(--text)]">Bashir Aminu Bello</p>
          <p className="text-sm text-[var(--muted)]">
            Building community-centered research, thoughtful software, and elegant storytelling.
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-3 text-sm text-[var(--muted)]">
          {socials.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className="rounded-full border border-[var(--border)] px-3 py-1.5 transition hover:border-[var(--accent)] hover:text-[var(--text)]"
            >
              {item.label}
            </Link>
          ))}
        </div>
      </Container>
    </footer>
  );
}
