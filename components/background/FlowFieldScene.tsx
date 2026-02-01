'use client';

import { Canvas, useFrame } from '@react-three/fiber';
import { useMemo, useRef, useEffect } from 'react';
import * as THREE from 'three';
import { useReducedMotion } from 'framer-motion';
import { useFlowSettings } from '../providers/flow-settings';

const vertexShader = /* glsl */ `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = vec4(position, 1.0);
  }
`;

const fragmentShader = /* glsl */ `
  precision highp float;
  varying vec2 vUv;
  uniform float uTime;
  uniform vec2 uPointer;
  uniform float uIntensity;
  uniform float uDensity;
  uniform float uWobble;

  float swell(vec2 p, float t) {
    return sin(p.y * 2.6 + t * 1.4) * 0.08 + sin(p.x * 1.4 + t * 0.9) * 0.05;
  }

  float hash(vec2 p) {
    return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453123);
  }

  float noise(vec2 p) {
    vec2 i = floor(p);
    vec2 f = fract(p);
    float a = hash(i);
    float b = hash(i + vec2(1.0, 0.0));
    float c = hash(i + vec2(0.0, 1.0));
    float d = hash(i + vec2(1.0, 1.0));
    vec2 u = f * f * (3.0 - 2.0 * f);
    return mix(a, b, u.x) + (c - a) * u.y * (1.0 - u.x) + (d - b) * u.x * u.y;
  }

  float fbm(vec2 p) {
    float value = 0.0;
    float amplitude = 0.55;
    float frequency = 1.6;
    for (int i = 0; i < 4; i++) {
      value += amplitude * noise(p * frequency);
      p *= 1.9;
      amplitude *= 0.55;
    }
    return value;
  }

  void main() {
    vec2 uv = vUv * 2.0 - 1.0;
    vec2 pointer = uPointer;
    float t = uTime * 0.045;

    // Depth gradient to suggest ocean floor
    float depth = smoothstep(-1.0, 1.0, uv.y);

    // Slow undulating floor ridges
    vec2 ridgeUv = uv * vec2(1.8 + uDensity, 1.2);
    float ridges = fbm(ridgeUv + vec2(0.0, t * 0.6));

    // Caustic-like light bands
    vec2 causticUv = uv * (3.0 + uDensity * 2.0);
    float caustics = sin((causticUv.x + causticUv.y * 0.6) * 3.0 + t * 3.5);
    caustics = smoothstep(0.4, 0.9, caustics * 0.5 + 0.5);

    // Flowing tendrils reacting to pointer
    vec2 flowUv = uv * (2.0 + uDensity * 2.0) + pointer * (0.4 + uWobble * 0.6);
    float flow = fbm(flowUv + vec2(t * 0.9, -t * 0.55));
    float tendrils = smoothstep(0.35 - uIntensity * 0.18, 0.05, abs(fract(flow * (3.0 + uDensity * 1.6)) - 0.5));

    // Waxing/waning shadows
    float shadowPulse = 0.35 + 0.25 * sin(t * 1.2);

    float glow = exp(-length(uv - pointer * 0.8) * (1.6 + (1.0 - uIntensity))) * 0.34;

    float surface = swell(uv * (1.4 + uDensity), t);

    vec3 abyss = vec3(0.01, 0.16, 0.22);       // deep ocean
    vec3 cerulean = vec3(0.07, 0.55, 0.82);    // light bands
    vec3 kelp = vec3(0.05, 0.32, 0.24);        // green undertone

    vec3 color = mix(abyss, kelp, depth * 0.35 + surface * 0.4);
    color = mix(color, cerulean, caustics * 0.65);
    color += tendrils * vec3(0.06, 0.34, 0.26);
    color += ridges * 0.1;
    color -= shadowPulse * 0.06;
    color += glow * vec3(0.14, 0.46, 0.6);

    float alpha = 0.28 + tendrils * 0.14 + caustics * 0.1 + glow * 0.32 + surface * 0.4;

    gl_FragColor = vec4(color, clamp(alpha, 0.24, 0.62));
  }
`;

function FlowPlane() {
  const materialRef = useRef<THREE.ShaderMaterial>(null);
  const pointerRef = useRef(new THREE.Vector2(0.0, 0.0));
  const { intensity, density, wobble } = useFlowSettings();

  useEffect(() => {
    const handler = (event: PointerEvent) => {
      const x = (event.clientX / window.innerWidth) * 2 - 1;
      const y = (event.clientY / window.innerHeight) * 2 - 1;
      pointerRef.current.set(x, y);
    };
    window.addEventListener('pointermove', handler, { passive: true });
    return () => window.removeEventListener('pointermove', handler);
  }, []);

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uPointer: { value: new THREE.Vector2(0, 0) },
      uIntensity: { value: intensity },
      uDensity: { value: density },
      uWobble: { value: wobble },
    }),
    [intensity, density, wobble],
  );

  useFrame((state) => {
    const mat = materialRef.current;
    if (!mat) return;
    mat.uniforms.uTime.value = state.clock.elapsedTime;
    mat.uniforms.uPointer.value.lerp(pointerRef.current, 0.05);
    mat.uniforms.uIntensity.value = intensity;
    mat.uniforms.uDensity.value = density;
    mat.uniforms.uWobble.value = wobble;
  });

  return (
    <mesh>
      <planeGeometry args={[2, 2, 32, 32]} />
      <shaderMaterial
        ref={materialRef}
        fragmentShader={fragmentShader}
        vertexShader={vertexShader}
        transparent
        depthWrite={false}
        uniforms={uniforms}
      />
    </mesh>
  );
}

export default function FlowFieldScene() {
  const reduceMotion = useReducedMotion();

  if (reduceMotion) {
    return (
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(12,61,44,0.08),transparent_32%),radial-gradient(circle_at_82%_25%,rgba(15,142,199,0.12),transparent_36%),linear-gradient(180deg,rgba(255,255,255,0.8),rgba(255,255,255,0.6))]" />
    );
  }

  return (
    <Canvas
      camera={{ position: [0, 0, 1.2], fov: 50 }}
      gl={{ powerPreference: 'high-performance', antialias: true, alpha: true }}
      dpr={[1, 1.6]}
      className="absolute inset-0"
    >
      <FlowPlane />
    </Canvas>
  );
}
