'use client';

import { createContext, useContext, useEffect, useRef, useState } from 'react';

type Soundscape = {
  playTick: () => void;
  humOn: boolean;
  toggleHum: () => void;
  enabled: boolean;
  setEnabled: (v: boolean) => void;
};

const SoundscapeContext = createContext<Soundscape | null>(null);

export function SoundscapeProvider({ children }: { children: React.ReactNode }) {
  const audioCtx = useRef<AudioContext | null>(null);
  const humNodes = useRef<{ gain: GainNode; osc1: OscillatorNode; osc2: OscillatorNode } | null>(null);
  const tickGain = useRef<GainNode | null>(null);
  const [humOn, setHumOn] = useState(false);
  const [enabled, setEnabled] = useState(true);

  const ensureCtx = () => {
    if (audioCtx.current) return audioCtx.current;
    const ctx = new AudioContext();
    audioCtx.current = ctx;
    const tickGainNode = ctx.createGain();
    tickGainNode.gain.value = 0;
    tickGainNode.connect(ctx.destination);
    tickGain.current = tickGainNode;
    return ctx;
  };

  const playTick = () => {
    if (!enabled) return;
    const ctx = ensureCtx();
    const now = ctx.currentTime + 0.005;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(520, now);
    osc.frequency.exponentialRampToValueAtTime(180, now + 0.16);
    gain.gain.setValueAtTime(0.001, now);
    gain.gain.linearRampToValueAtTime(0.08, now + 0.03);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.18);
    osc.connect(gain);
    gain.connect(tickGain.current ?? ctx.destination);
    osc.start(now);
    osc.stop(now + 0.22);
  };

  const startHum = () => {
    const ctx = ensureCtx();
    if (humNodes.current) return;
    const gain = ctx.createGain();
    gain.gain.value = enabled ? 0.06 : 0;

    const osc1 = ctx.createOscillator();
    osc1.type = 'sine';
    osc1.frequency.value = 42;

    const osc2 = ctx.createOscillator();
    osc2.type = 'sine';
    osc2.frequency.value = 74;

    const lfo = ctx.createOscillator();
    lfo.frequency.value = 0.08;
    const lfoGain = ctx.createGain();
    lfoGain.gain.value = 14;
    lfo.connect(lfoGain);
    lfoGain.connect(osc1.frequency);

    const filter = ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.value = 420;
    filter.Q.value = 0.4;

    osc1.connect(filter);
    osc2.connect(filter);
    filter.connect(gain);
    gain.connect(ctx.destination);

    osc1.start();
    osc2.start();
    lfo.start();
    humNodes.current = { gain, osc1, osc2 };
  };

  const stopHum = () => {
    const ctx = audioCtx.current;
    const nodes = humNodes.current;
    if (ctx && nodes) {
      const now = ctx.currentTime;
      nodes.gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.4);
      setTimeout(() => {
        nodes.osc1.stop();
        nodes.osc2.stop();
        nodes.gain.disconnect();
        humNodes.current = null;
      }, 500);
    }
  };

  const toggleHum = () => {
    if (humOn) {
      stopHum();
      setHumOn(false);
    } else {
      startHum();
      setHumOn(true);
    }
  };

  useEffect(() => {
    const unlock = () => {
      if (audioCtx.current?.state === 'suspended') {
        audioCtx.current.resume();
      }
    };
    window.addEventListener('pointerdown', unlock, { passive: true });
    return () => window.removeEventListener('pointerdown', unlock);
  }, []);

  useEffect(() => {
    if (!humNodes.current) return;
    const ctx = audioCtx.current;
    if (!ctx) return;
    const now = ctx.currentTime + 0.01;
    humNodes.current.gain.gain.cancelScheduledValues(now);
    humNodes.current.gain.gain.exponentialRampToValueAtTime(enabled ? 0.08 : 0.0001, now + 0.35);
  }, [enabled]);

  const value: Soundscape = {
    playTick,
    humOn,
    toggleHum,
    enabled,
    setEnabled,
  };

  return <SoundscapeContext.Provider value={value}>{children}</SoundscapeContext.Provider>;
}

export function useSoundscape() {
  const ctx = useContext(SoundscapeContext);
  if (!ctx) {
    throw new Error('useSoundscape must be used within SoundscapeProvider');
  }
  return ctx;
}
