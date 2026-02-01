import { clsx } from 'clsx';
import { useEffect } from 'react';
import { ArrowUpRight, MapPin, Music2, Volume2, VolumeX, Compass } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { FlowControls } from '@/components/background/FlowControls';
import { useSoundscape } from '@/components/providers/soundscape';

type RailProps = {
  anchors: { id: string; label: string; hint?: string }[];
  active: string | null;
  expanded: boolean;
  setExpanded: (v: boolean) => void;
  onSelect: (id: string) => void;
};

const pages = [
  { label: 'Home', href: '/' },
  { label: 'Projects', href: '/projects' },
  { label: 'Writing', href: '/writing' },
  { label: 'Lab', href: '/lab' },
  { label: 'About', href: '/about' },
  { label: 'Contact', href: '/contact' },
  { label: 'Resume', href: '/resume.pdf' },
];

export function HomeRail({ anchors, active, expanded, setExpanded, onSelect }: RailProps) {
  const { humOn, toggleHum, enabled, setEnabled } = useSoundscape();

  useEffect(() => {
    if (active) setExpanded(true);
  }, [active, setExpanded]);

  return (
    <aside
      className={clsx(
        'sticky top-24 h-fit rounded-2xl border border-[var(--border)]/80 bg-[var(--surface)]/90 shadow-soft backdrop-blur transition-all duration-300',
        expanded ? 'w-[320px] px-5 py-6' : 'w-[96px] px-3 py-5',
      )}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[var(--accent)]/18 text-lg font-semibold text-[var(--text)] ring-1 ring-[var(--accent)]/30">
            BA
          </div>
          {expanded ? (
            <div>
              <p className="text-sm font-semibold text-[var(--text)]">Bashir Aminu Bello</p>
              <p className="text-xs text-[var(--muted)]">Community research · GPU calm</p>
            </div>
          ) : null}
        </div>
        <button
          onClick={() => setExpanded(!expanded)}
          className="rounded-full border border-[var(--border)]/70 bg-[var(--surface)]/80 px-3 py-2 text-xs text-[var(--muted)] hover:border-[var(--accent)]"
        >
          {expanded ? 'Hide' : 'Show'}
        </button>
      </div>

      {expanded ? (
        <>
          <div className="mt-5 flex flex-wrap gap-2">
            <Badge tone="accent">Oceanic</Badge>
            <Badge tone="muted">Interactive grid</Badge>
            <Badge tone="muted">GSAP micro</Badge>
          </div>

          <div className="mt-6 space-y-2">
            <p className="text-xs uppercase tracking-[0.16em] text-[var(--muted)]">Pages</p>
            {pages.map((page) => (
              <a
                key={page.href}
                href={page.href}
                className="group flex items-center justify-between rounded-xl border border-[var(--border)]/80 bg-[var(--surface)]/80 px-3 py-2 text-sm text-[var(--text)] transition hover:border-[var(--accent)]"
              >
                <span className="flex items-center gap-2">
                  <Compass className="h-4 w-4 text-[var(--accent)]" />
                  {page.label}
                </span>
                <ArrowUpRight className="h-4 w-4 text-[var(--muted)] group-hover:text-[var(--text)]" />
              </a>
            ))}
          </div>

          <nav className="mt-5 space-y-2">
            {anchors.map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                onClick={() => onSelect(item.id)}
                className={clsx(
                  'group flex items-center justify-between rounded-xl border border-[var(--border)]/80 bg-[var(--surface)]/80 px-3 py-2 text-sm transition hover:border-[var(--accent)]',
                  active === item.id ? 'border-[var(--accent)]/70 text-[var(--text)]' : 'text-[var(--muted)]',
                )}
              >
                <span className="flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-[var(--accent)]/70" />
                  {item.label}
                </span>
                <ArrowUpRight className="h-4 w-4 text-[var(--muted)] group-hover:text-[var(--text)]" />
              </a>
            ))}
          </nav>

          <div className="mt-6 space-y-3 rounded-xl border border-[var(--border)]/70 bg-[var(--surface)]/80 p-3">
            <div className="flex items-center justify-between text-sm text-[var(--text)]">
              <span className="flex items-center gap-2">
                <Music2 className="h-4 w-4 text-[var(--accent)]" />
                Ambient ocean
              </span>
              <button
                onClick={toggleHum}
                className="rounded-full border border-[var(--border)] px-3 py-1 text-xs hover:border-[var(--accent)]"
              >
                {humOn ? 'Pause' : 'Play'}
              </button>
            </div>
            <div className="flex items-center justify-between text-sm text-[var(--text)]">
              <span className="flex items-center gap-2">
                {enabled ? <Volume2 className="h-4 w-4 text-[var(--accent)]" /> : <VolumeX className="h-4 w-4" />}
                UI ticks
              </span>
              <button
                onClick={() => setEnabled(!enabled)}
                className="rounded-full border border-[var(--border)] px-3 py-1 text-xs hover:border-[var(--accent)]"
              >
                {enabled ? 'On' : 'Off'}
              </button>
            </div>
          </div>

          <div className="mt-6 space-y-3 rounded-xl border border-[var(--border)]/70 bg-[var(--surface)]/80 p-3 text-sm text-[var(--muted)]">
            <p className="text-xs uppercase tracking-[0.16em] text-[var(--muted)]">Current base</p>
            <p className="flex items-center gap-2 text-[var(--text)]">
              <MapPin className="h-4 w-4" />
              Edmonton (2010 – present)
            </p>
            <div className="flex gap-2">
              <Button href="/contact" size="sm">
                Contact
              </Button>
              <Button href="/resume.pdf" variant="outline" size="sm">
                Resume
              </Button>
            </div>
          </div>

          <div className="mt-6">
            <FlowControls />
          </div>
        </>
      ) : (
        <div className="mt-4 space-y-2">
          {anchors.map((item) => (
            <div
              key={item.id}
              className={clsx(
                'h-10 rounded-full border border-[var(--border)]/70 bg-[var(--surface)]/80',
                active === item.id ? 'border-[var(--accent)]/70 shadow-soft' : '',
              )}
            />
          ))}
        </div>
      )}
    </aside>
  );
}
