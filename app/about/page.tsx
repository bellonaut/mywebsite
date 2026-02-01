import type { Metadata } from 'next';
import { Container } from '@/components/ui/container';
import { Section, SectionHeading } from '@/components/ui/section';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ROLES, SITE } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'About — Bashir Aminu Bello',
  description: 'Bio, roles, education, and skills for Bashir Aminu Bello.',
};

const skills = ['R (lavaan, semTools)', 'Python', 'Policy & program evaluation', 'Academic writing', 'Public speaking'];
const languages = ['English', 'Hausa', 'Arabic'];
const interests = ['Competitive strategy gaming', 'Nigerian fantasy literary fiction', 'Long-distance running', 'Live jazz'];

export default function AboutPage() {
  return (
    <Container>
      <Section className="pb-10 pt-12">
        <SectionHeading
          eyebrow="About"
          title="A bridge between community advocacy and technical storytelling."
          description="Bashir builds programs, research artifacts, and interfaces that feel considered and calm."
        />
      </Section>

      <Section className="grid gap-6 pb-16 lg:grid-cols-[1.2fr_0.8fr]">
        <Card className="p-6 space-y-4">
          <Badge tone="accent">Bio</Badge>
          <p className="text-lg text-[var(--text)]">
            Bashir Aminu Bello is a community-focused researcher and product thinker based in Edmonton. He blends program
            strategy, measurement, and GPU-forward interfaces to make complex work feel approachable.
          </p>
          <p className="text-[var(--muted)]">
            Roles span digital literacy instruction for newcomer seniors, policy and advocacy coordination, and
            measurement invariance work in pediatric quality-of-life research. He is comfortable toggling between
            workshop rooms, R scripts, and WebGL shaders.
          </p>
          <Button href="/contact" variant="primary" size="sm">
            Invite to collaborate
          </Button>
        </Card>

        <Card className="p-6 space-y-4">
          <Badge tone="outline">Education</Badge>
          <div className="space-y-2 text-[var(--text)]">
            <p className="font-semibold">University of Alberta</p>
            <p className="text-sm text-[var(--muted)]">BSc Biological Sciences + Computer Science minor/track</p>
            <p className="text-sm text-[var(--muted)]">Certificate in International Learning</p>
          </div>
          <div className="space-y-2">
            <p className="font-semibold text-[var(--text)]">Languages</p>
            <p className="text-sm text-[var(--muted)]">{languages.join(' · ')}</p>
          </div>
          <div className="space-y-2">
            <p className="font-semibold text-[var(--text)]">Interests</p>
            <p className="text-sm text-[var(--muted)]">{interests.join(' · ')}</p>
          </div>
        </Card>
      </Section>

      <Section className="grid gap-6 pb-16 lg:grid-cols-2">
        <Card className="p-6 space-y-4">
          <Badge tone="outline">Roles & Highlights</Badge>
          <ul className="space-y-3 text-[var(--text)]">
            {ROLES.map((role) => (
              <li key={role} className="border-l-2 border-[var(--border)] pl-3 text-sm">
                {role}
              </li>
            ))}
          </ul>
        </Card>
        <Card className="p-6 space-y-4">
          <Badge tone="outline">Skills</Badge>
          <div className="flex flex-wrap gap-2">
            {skills.map((skill) => (
              <span key={skill} className="rounded-full border border-[var(--border)] px-3 py-1 text-sm text-[var(--muted)]">
                {skill}
              </span>
            ))}
          </div>
          <div className="space-y-2">
            <p className="font-semibold text-[var(--text)]">Publications</p>
            <p className="text-sm text-[var(--muted)]">The Tyee policy piece (Oct 28, 2024)</p>
            <p className="text-sm text-[var(--muted)]">Manuscript invited on PedsQL measurement invariance</p>
          </div>
          <div className="space-y-2">
            <p className="font-semibold text-[var(--text)]">Contact</p>
            <p className="text-sm text-[var(--muted)]">{SITE.email} · {SITE.phone}</p>
          </div>
        </Card>
      </Section>
    </Container>
  );
}
