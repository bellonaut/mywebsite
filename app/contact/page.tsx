import type { Metadata } from 'next';
import Link from 'next/link';
import { Container } from '@/components/ui/container';
import { Section, SectionHeading } from '@/components/ui/section';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { socials } from '@/data/socials';
import { SITE } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'Contact — Bashir Aminu Bello',
  description: 'Get in touch for community research, program design, or technical storytelling collaborations.',
};

export default function ContactPage() {
  return (
    <Container>
      <Section className="pb-10 pt-12">
        <SectionHeading
          eyebrow="Contact"
          title="Let’s build something considered."
          description="Community research sprints, policy storytelling, or GPU-forward product experiments—reach out."
        />
      </Section>

      <Section className="grid gap-6 pb-16 lg:grid-cols-2">
        <Card className="p-6 space-y-4">
          <h3 className="text-xl font-semibold text-[var(--text)]">Direct</h3>
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
          </div>
          <div className="flex gap-3">
            <Button href="mailto:babello@ualberta.ca">Email Bashir</Button>
            <Button href="/resume.pdf" variant="ghost">
              Download resume
            </Button>
          </div>
        </Card>

        <Card className="p-6 space-y-4">
          <h3 className="text-xl font-semibold text-[var(--text)]">Social</h3>
          <p className="text-sm text-[var(--muted)]">Prefer a quick note? Pick a channel that works best for you.</p>
          <div className="flex flex-wrap gap-2">
            {socials.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="rounded-full border border-[var(--border)] px-4 py-2 text-sm text-[var(--text)] transition hover:border-[var(--accent)] hover:text-[var(--accent)]"
              >
                {item.label}
              </Link>
            ))}
          </div>
        </Card>
      </Section>
    </Container>
  );
}
