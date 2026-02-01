import { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import Link from 'next/link';
import { ArrowUpRight, Sparkles } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { projects } from '@/data/projects';
import { featuredWriting } from '@/data/writing';
import { GlobeCard } from './GlobeCard';

const spotlightProjects = projects.slice(0, 3);
const labPreview = [
  {
    title: 'Flowfield playground',
    summary: 'Tweak the ocean shader live. Pointer and sliders both stir the current.',
    link: '/lab',
    label: 'Shader demo',
  },
  {
    title: 'Measurement invariance explainer',
    summary: 'Stepper keeping configural/metric/scalar comparisons readable.',
    link: '/lab',
    label: 'Research',
  },
  {
    title: 'Transit dossier',
    summary: 'Notebook-driven dashboard narrating ridership swings with lean EDA.',
    link: '/projects/transit-ridership-dossier',
    label: 'Data story',
  },
];

const services = [
  { title: 'Community research', description: 'Bilingual workshops, facilitation, evidence briefs that invite participation.' },
  { title: 'Data stories', description: 'Translating notebooks into interactive explainers with clean motion and performance.' },
  { title: 'Program design', description: 'Recruitment playbooks, mentorship scaffolds, measurable youth outcomes.' },
];

type Tile = {
  id: string;
  title: string;
  summary: string;
  size?: 'wide' | 'tall';
  content: React.ReactNode;
};

type Props = {
  activeTile: string | null;
  setActiveTile: (id: string) => void;
};

export function HomeGrid({ activeTile, setActiveTile }: Props) {
  const gridRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    if (!gridRef.current) return;
    const ctx = gsap.context(() => {
      gsap.from('.tile-card', {
        opacity: 0,
        y: 18,
        duration: 0.5,
        stagger: 0.06,
        ease: 'power2.out',
      });
    }, gridRef);
    return () => ctx.revert();
  }, []);

  const tiles: Tile[] = [
    {
      id: 'signal',
      title: 'Signal',
      summary: 'Calm control room: research, policy translation, GPU visuals.',
      size: 'wide',
      content: (
        <div className="space-y-3">
          <div className="flex flex-wrap gap-2">
            <Badge tone="accent">Ocean backdrop</Badge>
            <Badge tone="muted">Interactive grid</Badge>
          </div>
          <p className="text-sm text-[var(--muted)]">
            Left rail anchors controls; tiles expand into detail. Everything rides on a subtle ebb-and-flow shader.
          </p>
          <div className="flex flex-wrap gap-2">
            <Button href="/contact" size="sm">
              Book a conversation
            </Button>
            <Button href="/projects" variant="outline" size="sm">
              Portfolio
            </Button>
          </div>
        </div>
      ),
    },
    {
      id: 'journey',
      title: 'Journey map',
      summary: 'Sokoto → Sheffield → Edmonton path plus visited cities.',
      content: (
        <p className="text-sm text-[var(--muted)]">
          Hover pins, watch the cyan wireframe globe rotate, and trace the path across the ocean surface.
        </p>
      ),
    },
    {
      id: 'projects',
      title: 'Projects',
      summary: 'Spotlight work with research and delivery in one loop.',
      content: (
        <div className="space-y-3">
          {spotlightProjects.map((project) => (
            <div key={project.slug} className="rounded-xl border border-[var(--border)]/70 bg-[var(--surface)]/70 p-3">
              <div className="flex items-center justify-between text-xs text-[var(--muted)]">
                <Badge tone="accent">{project.category}</Badge>
                <span>{project.timeframe}</span>
              </div>
              <p className="mt-2 text-sm font-semibold text-[var(--text)]">{project.title}</p>
              <p className="text-sm text-[var(--muted)]">{project.summary}</p>
            </div>
          ))}
        </div>
      ),
    },
    {
      id: 'lab',
      title: 'Lab',
      summary: 'Small, opinionated demos to poke at.',
      content: (
        <div className="space-y-2">
          {labPreview.map((item) => (
            <div key={item.title} className="flex items-start justify-between gap-3 rounded-lg border border-[var(--border)]/70 bg-[var(--surface)]/70 p-3">
              <div>
                <p className="text-sm font-semibold text-[var(--text)]">{item.title}</p>
                <p className="text-sm text-[var(--muted)]">{item.summary}</p>
              </div>
              <Badge tone="outline">{item.label}</Badge>
            </div>
          ))}
          <Button href="/lab" variant="primary" size="sm">
            Open lab
          </Button>
        </div>
      ),
    },
    {
      id: 'writing',
      title: 'Writing',
      summary: 'Briefs, notes, and manuscripts in motion.',
      content: (
        <div className="space-y-2">
          {featuredWriting.slice(0, 3).map((item) => (
            <div key={item.title} className="rounded-xl border border-[var(--border)]/70 bg-[var(--surface)]/70 p-3">
              <div className="flex items-center justify-between text-xs text-[var(--muted)]">
                <span>{item.date}</span>
                <Badge tone="outline">{item.outlet}</Badge>
              </div>
              <p className="mt-2 text-sm font-semibold text-[var(--text)]">{item.title}</p>
              <p className="text-sm text-[var(--muted)]">{item.summary}</p>
            </div>
          ))}
          <Button href="/writing" variant="outline" size="sm">
            Writing hub
          </Button>
        </div>
      ),
    },
    {
      id: 'services',
      title: 'Services',
      summary: 'Community research, data stories, program design.',
      content: (
        <div className="space-y-2">
          {services.map((svc) => (
            <div key={svc.title} className="rounded-lg border border-[var(--border)]/70 bg-[var(--surface)]/70 p-3">
              <p className="text-sm font-semibold text-[var(--text)]">{svc.title}</p>
              <p className="text-sm text-[var(--muted)]">{svc.description}</p>
            </div>
          ))}
        </div>
      ),
    },
    {
      id: 'contact',
      title: 'Contact',
      summary: 'Quick reply via email or LinkedIn. Live shader tweaks ready.',
      size: 'wide',
      content: (
        <div className="flex flex-wrap items-center gap-3">
          <Button href="/contact">Contact</Button>
          <Button href="/resume.pdf" variant="ghost">
            Resume
          </Button>
        </div>
      ),
    },
  ];

  return (
    <div ref={gridRef} className="space-y-8">
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {tiles.map((tile) => (
          <Card
            key={tile.id}
            id={tile.id}
            className="tile-card group cursor-pointer p-5 transition hover:-translate-y-1"
            onClick={() => setActiveTile(tile.id)}
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs uppercase tracking-[0.16em] text-[var(--muted)]">{tile.id}</p>
                <h3 className="text-xl font-semibold text-[var(--text)]">{tile.title}</h3>
              </div>
              <Sparkles className="h-4 w-4 text-[var(--accent)]" />
            </div>
            <p className="mt-2 text-sm text-[var(--muted)]">{tile.summary}</p>
            <div className="mt-3 space-y-2">{tile.content}</div>
            <div className="mt-3 flex items-center gap-2 text-xs text-[var(--accent)]">
              <span>Expand</span>
              <ArrowUpRight className="h-3.5 w-3.5" />
            </div>
          </Card>
        ))}
      </div>

      {activeTile === 'journey' ? (
        <Card className="p-6">
          <GlobeCard />
        </Card>
      ) : null}
      {activeTile === 'projects' ? (
        <Card className="p-6">
          <div className="flex items-end justify-between">
            <h3 className="text-2xl font-semibold text-[var(--text)]">More projects</h3>
            <Link href="/projects" className="text-sm text-[var(--accent)] hover:text-[var(--text)]">
              View all
            </Link>
          </div>
          <div className="mt-4 grid gap-3 md:grid-cols-3">
            {projects.slice(3, 6).map((project) => (
              <div key={project.slug} className="rounded-xl border border-[var(--border)]/70 bg-[var(--surface)]/70 p-3">
                <p className="text-xs text-[var(--muted)]">{project.timeframe}</p>
                <p className="text-sm font-semibold text-[var(--text)]">{project.title}</p>
                <p className="text-sm text-[var(--muted)]">{project.summary}</p>
              </div>
            ))}
          </div>
        </Card>
      ) : null}
    </div>
  );
}
