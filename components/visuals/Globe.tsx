'use client';

import { Canvas, useFrame } from '@react-three/fiber';
import { Html, Line, OrbitControls, Sphere } from '@react-three/drei';
import { useMemo, useRef, useState } from 'react';
import * as THREE from 'three';

type Location = {
  name: string;
  lat: number;
  lon: number;
  years?: string;
  note?: string;
  image?: string;
};

const highlightPath = ['Sokoto', 'Sheffield', 'Edmonton'] as const;

const locations: Location[] = [
  {
    name: 'Sokoto, Nigeria',
    lat: 13.0059,
    lon: 5.2476,
    years: 'Birthplace',
    note: 'Sahel crossroads; craft, scholarship, and calm dry heat.',
    image:
      'https://images.unsplash.com/photo-1600209142000-c2f55c1c43c5?auto=format&fit=crop&w=800&q=60',
  },
  {
    name: 'Sheffield, England',
    lat: 53.3811,
    lon: -1.4701,
    years: '2003 - 2010',
    note: 'Hills, steel city grit, and early notebooks.',
    image:
      'https://images.unsplash.com/photo-1582719478225-774ac4893c0c?auto=format&fit=crop&w=800&q=60',
  },
  {
    name: 'Edmonton, Canada',
    lat: 53.5461,
    lon: -113.4938,
    years: '2010 - present',
    note: 'Prairie light, community labs, data stories.',
    image:
      'https://images.unsplash.com/photo-1578531063360-76d13907fcd7?auto=format&fit=crop&w=800&q=60',
  },
  { name: 'Riyadh, Saudi Arabia', lat: 24.7136, lon: 46.6753, note: 'Saudi Arabia' },
  { name: 'Cairo, Egypt', lat: 30.0444, lon: 31.2357 },
  { name: 'Madrid, Spain', lat: 40.4168, lon: -3.7038 },
  { name: 'Delhi, India', lat: 28.6139, lon: 77.209 },
  { name: 'Los Angeles, USA', lat: 34.0522, lon: -118.2437 },
  { name: 'Washington, DC, USA', lat: 38.9072, lon: -77.0369 },
  { name: 'New York, USA', lat: 40.7128, lon: -74.006 },
];

const radius = 1.05;

function latLonToVec3(lat: number, lon: number, r = radius) {
  const phi = (90 - lat) * (Math.PI / 180);
  const theta = (lon + 180) * (Math.PI / 180);
  return new THREE.Vector3().setFromSphericalCoords(r, phi, theta);
}

function Arc({ from, to }: { from: THREE.Vector3; to: THREE.Vector3 }) {
  const points = useMemo(() => {
    const mid = from.clone().add(to).multiplyScalar(0.5);
    mid.normalize().multiplyScalar(radius * 1.4);
    const curve = new THREE.CatmullRomCurve3([from, mid, to]);
    return curve.getPoints(64);
  }, [from, to]);

  return <Line points={points} color="#4cc9ff" lineWidth={1} transparent opacity={0.8} />;
}

function Pins({ active, setActive }: { active: string | null; setActive: (name: string | null) => void }) {
  return (
    <>
      {locations.map((loc) => {
        const pos = latLonToVec3(loc.lat, loc.lon);
        const baseName = loc.name.split(',')[0];
        const isPath = (highlightPath as readonly string[]).includes(baseName);
        return (
          <mesh
            key={loc.name}
            position={pos}
            onPointerOver={(e) => {
              e.stopPropagation();
              setActive(loc.name);
            }}
            onPointerOut={(e) => {
              e.stopPropagation();
              setActive(null);
            }}
          >
            <sphereGeometry args={[isPath ? 0.03 : 0.02, 16, 16]} />
            <meshBasicMaterial color={isPath ? '#4cc9ff' : '#1ac2a2'} emissiveIntensity={0.8} />
            {active === loc.name ? (
              <Html center>
                <div className="rounded-xl border border-[var(--border)]/60 bg-[var(--surface)]/90 px-3 py-2 text-xs text-[var(--text)] shadow-soft backdrop-blur">
                  <p className="font-semibold">{loc.name}</p>
                  {loc.years ? <p className="text-[var(--muted)]">{loc.years}</p> : null}
                  {loc.note ? <p className="text-[var(--muted)]">{loc.note}</p> : null}
                </div>
              </Html>
            ) : null}
          </mesh>
        );
      })}
    </>
  );
}

function GlobeInner() {
  const [active, setActive] = useState<string | null>(null);
  const groupRef = useRef<THREE.Group>(null);

  const pathPoints = useMemo(() => {
    const find = (name: string) => locations.find((l) => l.name.startsWith(name))!;
    const segments: { from: THREE.Vector3; to: THREE.Vector3 }[] = [];
    for (let i = 0; i < highlightPath.length - 1; i++) {
      const a = find(highlightPath[i]);
      const b = find(highlightPath[i + 1]);
      segments.push({ from: latLonToVec3(a.lat, a.lon), to: latLonToVec3(b.lat, b.lon) });
    }
    return segments;
  }, []);

  useFrame((_, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.12;
    }
  });

  return (
    <group ref={groupRef}>
      <Sphere args={[radius, 32, 32]}>
        <meshBasicMaterial color="#0b3a4c" wireframe wireframeLinewidth={0.6} />
      </Sphere>
      <Sphere args={[radius - 0.02, 32, 32]}>
        <meshBasicMaterial color="#07202e" transparent opacity={0.5} />
      </Sphere>
      <Pins active={active} setActive={setActive} />
      {pathPoints.map((seg, idx) => (
        <Arc key={idx} from={seg.from} to={seg.to} />
      ))}
    </group>
  );
}

export function Globe() {
  return (
    <div className="relative aspect-square w-full overflow-hidden rounded-2xl border border-[var(--border)]/70 bg-[radial-gradient(circle_at_20%_20%,rgba(76,201,255,0.08),transparent_45%),radial-gradient(circle_at_80%_16%,rgba(26,194,162,0.08),transparent_40%),rgba(6,14,20,0.7)]">
      <Canvas camera={{ position: [0, 0, 3.2], fov: 45 }} dpr={[1, 1.8]}>
        <ambientLight intensity={0.35} />
        <pointLight position={[3, 3, 3]} intensity={0.9} />
        <GlobeInner />
        <OrbitControls enablePan={false} enableZoom={false} autoRotate autoRotateSpeed={0.55} />
      </Canvas>
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(76,201,255,0.06),transparent_50%)]" />
    </div>
  );
}
