'use client';

import { useEffect, useRef, useState } from 'react';
import { useSoundscape } from '../providers/soundscape';

export function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const trailRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const { playTick } = useSoundscape();

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const isTouch = window.matchMedia('(pointer: coarse)').matches;
    if (isTouch) return;

    const handleMove = (e: PointerEvent) => {
      setVisible(true);
      const x = e.clientX;
      const y = e.clientY;
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${x}px, ${y}px, 0)`;
      }
      if (trailRef.current) {
        trailRef.current.style.transform = `translate3d(${x}px, ${y}px, 0)`;
      }
    };

    const handleDown = () => {
      playTick();
      if (trailRef.current) {
        trailRef.current.classList.add('cursor-pulse');
        setTimeout(() => trailRef.current?.classList.remove('cursor-pulse'), 240);
      }
    };

    window.addEventListener('pointermove', handleMove);
    window.addEventListener('pointerdown', handleDown);
    return () => {
      window.removeEventListener('pointermove', handleMove);
      window.removeEventListener('pointerdown', handleDown);
    };
  }, [playTick]);

  if (!visible) return null;

  return (
    <>
      <div
        ref={trailRef}
        className="pointer-events-none fixed left-0 top-0 z-[70] h-16 w-16 -translate-x-1/2 -translate-y-1/2 rounded-full border border-[var(--accent)]/40 bg-[var(--accent)]/8 backdrop-blur-[2px] transition-transform duration-150"
      />
      <div
        ref={dotRef}
        className="pointer-events-none fixed left-0 top-0 z-[71] h-2.5 w-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[var(--accent)] shadow-[0_0_12px_rgba(76,201,255,0.8)]"
      />
    </>
  );
}
