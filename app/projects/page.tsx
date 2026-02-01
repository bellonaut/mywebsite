import type { Metadata } from 'next';
import { Container } from '@/components/ui/container';
import { Section, SectionHeading } from '@/components/ui/section';
import { ProjectsGrid } from '@/components/projects/ProjectsGrid';

export const metadata: Metadata = {
  title: 'Projects — Bashir Aminu Bello',
  description: 'Community research, technical builds, and writing in a filterable, keyboard-friendly grid.',
};

export default function ProjectsPage() {
  return (
    <Container>
      <Section className="pb-10 pt-12">
        <SectionHeading
          eyebrow="Projects"
          title="Community research, technical builds, and quiet writing."
          description="Browse the portfolio, filter by discipline, and open drawers for details or case studies."
        />
      </Section>
      <Section className="pt-0 pb-16">
        <ProjectsGrid />
      </Section>
    </Container>
  );
}
