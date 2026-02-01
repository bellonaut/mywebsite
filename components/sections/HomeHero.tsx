'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { Container } from '../ui/container';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { SITE } from '@/lib/constants';

const fadeIn = { initial: { opacity: 0, y: 12 }, animate: { opacity: 1, y: 0 } };

const stats = [
  { label: 'Community programs', value: 'Africa Centre · BYSI', note: 'Instruction, recruitment, advocacy' },
  { label: 'Research', value: 'RNPE · PedsQL · Policy briefs', note: 'Qualitative + SEM' },
  { label: 'Technical', value: 'GPU visuals · MDX · RSS', note: 'Lean, performant builds' },
];

export function HomeHero() {
  return (
    <section className="relative overflow-hidden pb-10 pt-16 sm:pt-20">
      <Container className="grid items-center gap-12 lg:grid-cols-[1.4fr_1fr]">
        <div className="space-y-6">
          <motion.div {...fadeIn} transition={{ duration: 0.4 }}>
            <Badge tone="accent">Editorial calm · Technical rigor</Badge>
          </motion.div>
          <motion.h1
            className="text-4xl font-semibold leading-[1.05] text-[var(--text)] sm:text-5xl"
            style={{ fontFamily: 'var(--font-serif)' }}
            {...fadeIn}
            transition={{ duration: 0.5, delay: 0.05 }}
          >
            Bashir Aminu Bello designs community-centered research, programs, and digital tools with editorial polish and
            GPU-smooth interactivity.
          </motion.h1>
          <motion.p
            className="max-w-3xl text-lg text-[var(--muted)] sm:text-xl"
            {...fadeIn}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            From tech literacy for newcomer seniors to measurement invariance studies and shader-driven visuals, each
            project balances care, clarity, and performance.
          </motion.p>
          <motion.div className="flex flex-wrap gap-3" {...fadeIn} transition={{ duration: 0.45, delay: 0.12 }}>
            <Button href="/contact" size="lg">
              Book a conversation
            </Button>
            <Button href="/resume.pdf" variant="ghost" size="lg">
              Download resume
            </Button>
          </motion.div>
          <motion.div
            className="grid gap-4 rounded-2xl border border-[var(--border)]/80 bg-white/70 p-4 shadow-[0_10px_40px_rgba(12,28,38,0.05)] sm:grid-cols-3"
            {...fadeIn}
            transition={{ duration: 0.6, delay: 0.16 }}
          >
            {stats.map((item) => (
              <div key={item.label} className="space-y-1">
                <p className="text-xs uppercase tracking-[0.14em] text-[var(--muted)]">{item.label}</p>
                <p className="text-sm font-semibold text-[var(--text)]">{item.value}</p>
                <p className="text-sm text-[var(--muted)]">{item.note}</p>
              </div>
            ))}
          </motion.div>
        </div>

        <motion.div
          className="relative rounded-3xl border border-[var(--border)] bg-white/75 p-6 shadow-soft backdrop-blur"
          {...fadeIn}
          transition={{ duration: 0.55, delay: 0.2 }}
        >
          <div className="space-y-4">
            <p className="text-sm uppercase tracking-[0.16em] text-[var(--muted)]">Contact</p>
            <div className="space-y-3 text-[var(--text)]">
              <div>
                <p className="text-sm text-[var(--muted)]">Email</p>
                <Link href={`mailto:${SITE.email}`} className="text-lg font-medium hover:text-[var(--accent)]">
                  {SITE.email}
                </Link>
              </div>
              <div>
                <p className="text-sm text-[var(--muted)]">Phone / WhatsApp</p>
                <Link href="tel:+17802007482" className="text-lg font-medium hover:text-[var(--accent)]">
                  {SITE.phone}
                </Link>
              </div>
              <div>
                <p className="text-sm text-[var(--muted)]">LinkedIn</p>
                <Link
                  href="https://www.linkedin.com/in/bellobashir/?skipRedirect=true"
                  className="text-lg font-medium hover:text-[var(--accent)]"
                >
                  /in/bellobashir
                </Link>
              </div>
            </div>
            <div className="rounded-2xl border border-[var(--border)] bg-[var(--accent)]/6 p-4 text-sm text-[var(--muted)]">
              Ready for community research sprints, technical storytelling, or GPU-forward product experiments.
            </div>
          </div>
        </motion.div>
      </Container>
    </section>
  );
}
