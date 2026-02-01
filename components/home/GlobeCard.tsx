import Image from 'next/image';
import { Badge } from '@/components/ui/badge';
import { Globe } from '@/components/visuals/Globe';

const spotlight = [
  {
    name: 'Sokoto, Nigeria',
    years: 'Birthplace',
    note: 'Sahel crossroads with scholarship and craft traditions.',
    img: 'https://images.unsplash.com/photo-1600209142000-c2f55c1c43c5?auto=format&fit=crop&w=800&q=60',
  },
  {
    name: 'Sheffield, England',
    years: '2003 – 2010',
    note: 'Hills, steel city grit, early notebooks and STEM curiosity.',
    img: 'https://images.unsplash.com/photo-1582719478225-774ac4893c0c?auto=format&fit=crop&w=800&q=60',
  },
  {
    name: 'Edmonton, Canada',
    years: '2010 – present',
    note: 'Prairie light, community labs, data stories, GPU visuals.',
    img: 'https://images.unsplash.com/photo-1578531063360-76d13907fcd7?auto=format&fit=crop&w=800&q=60',
  },
];

export function GlobeCard() {
  return (
    <div className="grid gap-4 md:grid-cols-2">
      <div className="space-y-3">
        <Badge tone="accent">Journey map</Badge>
        <h3 className="text-xl font-semibold text-[var(--text)]" style={{ fontFamily: 'var(--font-serif)' }}>
          Birthplace to present with a cyan wireframe globe.
        </h3>
        <p className="text-sm text-[var(--muted)]">
          Hover pins to read bios; the path animates from Sokoto → Sheffield → Edmonton. Drag to orbit, or just watch it
          auto-rotate above the ocean shader.
        </p>
        <div className="grid gap-3 sm:grid-cols-3">
          {spotlight.map((item) => (
            <div key={item.name} className="rounded-xl border border-[var(--border)]/70 bg-[var(--surface)]/70 p-3">
              <div className="relative mb-2 aspect-[4/3] overflow-hidden rounded-lg">
                <Image
                  src={item.img}
                  alt={item.name}
                  fill
                  className="object-cover transition duration-300 hover:scale-105"
                  sizes="160px"
                  priority={item.name.startsWith('Sokoto')}
                />
              </div>
              <p className="text-sm font-semibold text-[var(--text)]">{item.name}</p>
              <p className="text-xs uppercase tracking-[0.12em] text-[var(--muted)]">{item.years}</p>
              <p className="text-sm text-[var(--muted)]">{item.note}</p>
            </div>
          ))}
        </div>
      </div>
      <Globe />
    </div>
  );
}
