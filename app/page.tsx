'use client';

import { useState } from 'react';
import { HomeGrid } from '@/components/home/HomeGrid';
import { HomeRail } from '@/components/home/HomeRail';
import { Container } from '@/components/ui/container';

const anchors = [
  { id: 'signal', label: 'Signal' },
  { id: 'journey', label: 'Journey' },
  { id: 'projects', label: 'Projects' },
  { id: 'lab', label: 'Lab' },
  { id: 'writing', label: 'Writing' },
  { id: 'services', label: 'Services' },
  { id: 'contact', label: 'Contact' },
];

export default function Home() {
  const [activeTile, setActiveTile] = useState<string | null>('signal');
  const [railExpanded, setRailExpanded] = useState(true);

  return (
    <Container className="py-12">
      <div className="grid gap-6 lg:grid-cols-[320px_1fr] xl:grid-cols-[340px_1fr]">
        <HomeRail
          anchors={anchors}
          active={activeTile}
          expanded={railExpanded}
          setExpanded={setRailExpanded}
          onSelect={(id) => setActiveTile(id)}
        />
        <HomeGrid activeTile={activeTile} setActiveTile={setActiveTile} />
      </div>
    </Container>
  );
}
