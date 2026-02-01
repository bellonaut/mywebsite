import { notFound } from 'next/navigation';
import { projects } from '@/data/projects';
import { Container } from '@/components/ui/container';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import type { Metadata } from 'next';

const mdxMap: Record<string, () => Promise<{ default: React.ComponentType }>> = {
  'africa-centre-digital-literacy': () => import('@/content/projects/africa-centre-digital-literacy.mdx'),
  'iaa-rnpe-review': () => import('@/content/projects/iaa-rnpe-review.mdx'),
  'flowfield-gpu-lab': () => import('@/content/projects/flowfield-gpu-lab.mdx'),
};

export async function generateStaticParams() {
  return Object.keys(mdxMap).map((slug) => ({ slug }));
}

type Props = { params: { slug: string } };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const project = projects.find((p) => p.slug === params.slug);
  return {
    title: project ? `${project.title} — Case Study` : 'Project',
    description: project?.summary,
  };
}

export default async function ProjectCaseStudy({ params }: Props) {
  const loader = mdxMap[params.slug];
  if (!loader) return notFound();

  const { default: MDXContent } = await loader();
  const project = projects.find((p) => p.slug === params.slug);

  return (
    <Container className="prose prose-lg prose-headings:font-[var(--font-serif)] prose-a:text-[var(--accent)] prose-strong:text-[var(--text)] prose-p:text-[var(--text)] prose-li:text-[var(--text)] py-16">
      <div className="mb-8 space-y-2">
        <Badge tone="accent">Case study</Badge>
        <h1 className="text-4xl font-semibold text-[var(--text)]">{project?.title ?? 'Project'}</h1>
        {project ? (
          <p className="text-[var(--muted)]">
            {project.role} · {project.timeframe}
          </p>
        ) : null}
        <div className="flex flex-wrap gap-2">
          <Button href="/projects" variant="outline" size="sm">
            Back to projects
          </Button>
          {project?.links?.map((link) => (
            <Button key={link.href} href={link.href} variant="ghost" size="sm">
              {link.label}
            </Button>
          ))}
        </div>
      </div>
      <MDXContent />
    </Container>
  );
}
