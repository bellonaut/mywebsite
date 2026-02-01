import type { Metadata } from 'next';
import { Container } from '@/components/ui/container';
import { Section, SectionHeading } from '@/components/ui/section';
import { ModelEvaluator } from '@/components/lab/ModelEvaluator';
import { MeasurementStepper } from '@/components/lab/MeasurementStepper';
import { FlowControls } from '@/components/lab/FlowControls';

export const metadata: Metadata = {
  title: 'Lab — Bashir Aminu Bello',
  description: 'Mini artifacts demonstrating technical seriousness with a calm, educational feel.',
};

export default function LabPage() {
  return (
    <Container>
      <Section className="pb-10 pt-12">
        <SectionHeading
          eyebrow="Lab"
          title="Mini artifacts for evaluators and collaborators."
          description="A few small, opinionated demos—kept purposeful, performant, and legible."
        />
      </Section>

      <Section className="grid gap-6 pb-16 lg:grid-cols-2">
        <ModelEvaluator />
        <MeasurementStepper />
        <FlowControls />
      </Section>
    </Container>
  );
}
