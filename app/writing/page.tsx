import type { Metadata } from 'next';
import Link from 'next/link';
import { Container } from '@/components/ui/container';
import { Section, SectionHeading } from '@/components/ui/section';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { SubstackFeed } from '@/components/writing/SubstackFeed';
import { featuredWriting } from '@/data/writing';

export const revalidate = 3600;

export const metadata: Metadata = {
  title: 'Writing — Bashir Aminu Bello',
  description: 'Featured publications, Substack notes, and invited manuscripts.',
};

export default function WritingPage() {
  return (
    <Container>
      <Section className="pb-12 pt-12">
        <SectionHeading
          eyebrow="Writing"
          title="Clear, grounded storytelling across research and community work."
          description="Selected publications plus live Substack feed."
        />
      </Section>

      <Section className="pt-0">
        <div className="grid gap-6 md:grid-cols-2">
          {featuredWriting.map((item) => (
            <Card key={item.title} className="p-5">
              <div className="flex items-center justify-between text-xs text-[var(--muted)]">
                <span>{item.date}</span>
                <Badge tone="outline">{item.outlet}</Badge>
              </div>
              <h3 className="mt-2 text-xl font-semibold text-[var(--text)]">{item.title}</h3>
              <p className="mt-2 text-sm text-[var(--muted)]">{item.summary}</p>
              <Link
                href={item.link}
                className="mt-3 inline-flex items-center text-sm text-[var(--accent)] hover:text-[var(--text)]"
              >
                Read
              </Link>
            </Card>
          ))}
        </div>
      </Section>

      <Section className="pt-0 pb-16">
        <SectionHeading eyebrow="Latest from Substack" title="Field notes & experiments" />
        <SubstackFeed />
      </Section>
    </Container>
  );
}
