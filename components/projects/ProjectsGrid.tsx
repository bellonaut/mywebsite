'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { AnimatePresence, motion } from 'framer-motion';
import { Search, X, ExternalLink } from 'lucide-react';
import { projects, projectCategories, type Project, type ProjectCategory } from '@/data/projects';
import { Card } from '../ui/card';
import { Chip } from '../ui/chip';
import { Badge } from '../ui/badge';
import { Input } from '../ui/input';
import { Button } from '../ui/button';

const categoriesWithAll: (ProjectCategory | 'All')[] = ['All', ...projectCategories];

function ProjectDrawer({ project, onClose }: { project: Project; onClose: () => void }) {
  const drawerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const drawer = drawerRef.current;
    const focusable = drawer
      ? (Array.from(
          drawer.querySelectorAll<HTMLElement>('a, button, textarea, input, select, [tabindex]:not([tabindex="-1"])'),
        ).filter((el) => !el.hasAttribute('disabled')) as HTMLElement[])
      : [];
    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    const handleKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        onClose();
      }
      if (event.key === 'Tab' && focusable.length > 1) {
        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          last?.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first?.focus();
        }
      }
    };
    document.addEventListener('keydown', handleKey);
    first?.focus();
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', handleKey);
      document.body.style.overflow = previousOverflow;
    };
  }, [onClose, project.slug]);

  return (
    <motion.div
      className="fixed inset-0 z-40 flex items-end justify-center bg-black/30 backdrop-blur-sm"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="project-title"
    >
      <motion.div
        ref={drawerRef}
        className="relative w-full max-w-4xl rounded-t-3xl border border-[var(--border)] bg-[var(--surface)]/95 p-6 shadow-[0_-12px_60px_rgba(12,28,38,0.18)] sm:rounded-3xl sm:p-8"
        initial={{ y: 40, opacity: 0.9 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 30, opacity: 0 }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-xs uppercase tracking-[0.14em] text-[var(--muted)]">{project.category}</p>
            <h3 id="project-title" className="mt-1 text-2xl font-semibold text-[var(--text)]">
              {project.title}
            </h3>
            <p className="text-sm text-[var(--muted)]">{project.role}</p>
          </div>
          <Button variant="ghost" size="sm" onClick={onClose} aria-label="Close project drawer">
            <X className="h-4 w-4" />
          </Button>
        </div>

        <div className="mt-4 grid gap-6 sm:grid-cols-[1.4fr_1fr]">
          <div className="space-y-3">
            <p className="text-base text-[var(--text)]">{project.summary}</p>
            <p className="text-sm text-[var(--muted)]">{project.impact}</p>
            <div className="flex flex-wrap gap-2">
              {project.tags.map((tag) => (
                <Badge key={tag} tone="muted">
                  {tag}
                </Badge>
              ))}
            </div>
            <div className="flex flex-wrap gap-2">
              {project.stack.map((s) => (
                <span
                  key={s}
                  className="rounded-full border border-[var(--border)] px-3 py-1 text-xs text-[var(--muted)]"
                >
                  {s}
                </span>
              ))}
            </div>
          </div>
          <div className="space-y-3">
            <div className="relative overflow-hidden rounded-2xl border border-[var(--border)]">
              <Image src={project.cover} alt={project.title} width={640} height={420} className="h-full w-full object-cover" />
            </div>
            <div className="flex flex-wrap gap-2">
              <Button href={`/projects/${project.slug}`} variant="outline" size="sm">
                Read case study
              </Button>
              {project.links?.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="inline-flex items-center gap-1 rounded-full border border-[var(--border)] px-3 py-1.5 text-sm text-[var(--text)] transition hover:border-[var(--accent)] hover:text-[var(--accent)]"
                >
                  {link.label}
                  <ExternalLink className="h-3.5 w-3.5" />
                </Link>
              ))}
            </div>
          </div>
        </div>
        <div className="mt-4 text-xs uppercase tracking-[0.12em] text-[var(--muted)]">{project.timeframe}</div>
      </motion.div>
    </motion.div>
  );
}

export function ProjectsGrid() {
  const [category, setCategory] = useState<ProjectCategory | 'All'>('All');
  const [search, setSearch] = useState('');
  const [active, setActive] = useState<Project | null>(null);

  const filtered = useMemo(() => {
    const lower = search.toLowerCase();
    return projects.filter((project) => {
      const matchesCategory = category === 'All' || project.category === category;
      const matchesSearch =
        !lower ||
        project.title.toLowerCase().includes(lower) ||
        project.summary.toLowerCase().includes(lower) ||
        project.tags.some((t) => t.toLowerCase().includes(lower));
      return matchesCategory && matchesSearch;
    });
  }, [category, search]);

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center gap-2">
        {categoriesWithAll.map((cat) => (
          <Chip key={cat} active={category === cat} onClick={() => setCategory(cat)}>
            {cat}
          </Chip>
        ))}
        <div className="w-full sm:w-auto sm:flex-1" />
        <div className="w-full max-w-xs">
          <Input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search projects"
            trailing={<Search className="h-4 w-4" />}
            aria-label="Search projects"
          />
        </div>
      </div>

      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((project) => (
          <Card
            key={project.slug}
            className="cursor-pointer transition hover:-translate-y-1 hover:border-[var(--accent)]/50"
            onClick={() => setActive(project)}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                setActive(project);
              }
            }}
          >
            <div className="relative h-48 overflow-hidden">
              <Image
                src={project.cover}
                alt={project.title}
                fill
                sizes="(max-width:768px) 100vw, 33vw"
                className="object-cover transition duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg)]/80 via-transparent to-transparent" />
              <div className="absolute left-4 top-4">
                <Badge tone="accent">{project.category}</Badge>
              </div>
            </div>
            <div className="flex flex-col gap-3 p-4">
              <div className="flex items-start justify-between gap-2">
                <div className="space-y-1">
                  <h3 className="text-lg font-semibold text-[var(--text)]">{project.title}</h3>
                  <p className="text-sm text-[var(--muted)]">{project.summary}</p>
                </div>
              </div>
              <div className="flex flex-wrap gap-2">
                {project.tags.slice(0, 3).map((tag) => (
                  <span key={tag} className="rounded-full border border-[var(--border)] px-2.5 py-1 text-xs text-[var(--muted)]">
                    {tag}
                  </span>
                ))}
              </div>
              <div className="flex items-center justify-between text-xs text-[var(--muted)]">
                <span>{project.timeframe}</span>
                <span className="flex items-center gap-1 text-[var(--accent)]">
                  Open <ExternalLink className="h-3 w-3" />
                </span>
              </div>
            </div>
          </Card>
        ))}
      </div>

      <AnimatePresence>{active ? <ProjectDrawer project={active} onClose={() => setActive(null)} /> : null}</AnimatePresence>
    </div>
  );
}
