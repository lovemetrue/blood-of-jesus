/**
 * 3D background: cinematic minimal layers (nebula + particles + twinkle).
 */
import React, { useRef, useMemo, useEffect, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

const nebulaVertex = /* glsl */ `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const nebulaFragment = /* glsl */ `
  precision mediump float;
  varying vec2 vUv;
  uniform float uTime;

  float hash(vec2 p) {
    return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453123);
  }

  float noise(vec2 p) {
    vec2 i = floor(p);
    vec2 f = fract(p);
    f = f * f * (3.0 - 2.0 * f);
    float a = hash(i);
    float b = hash(i + vec2(1.0, 0.0));
    float c = hash(i + vec2(0.0, 1.0));
    float d = hash(i + vec2(1.0, 1.0));
    return mix(mix(a, b, f.x), mix(c, d, f.x), f.y);
  }

  float fbm(vec2 p) {
    float v = 0.0;
    float a = 0.5;
    for (int i = 0; i < 5; i++) {
      v += a * noise(p);
      p *= 2.0;
      a *= 0.5;
    }
    return v;
  }

  void main() {
    vec2 uv = vUv * 2.0 - 1.0;
    uv.x *= 1.25;
    vec2 q = uv;
    q.x += uTime * 0.02;
    q.y -= uTime * 0.014;

    float n = fbm(q * 2.1 + vec2(0.0, sin(uTime * 0.1) * 0.3));
    float n2 = fbm(q * 3.4 - vec2(uTime * 0.015, 0.0));

    vec3 deep = vec3(0.015, 0.02, 0.06);
    vec3 mid = vec3(0.06, 0.07, 0.16);
    vec3 glow = vec3(0.22, 0.28, 0.46);

    float vignette = 1.0 - smoothstep(0.35, 1.35, length(uv));
    vec3 color = mix(deep, mid, n * 0.75);
    color = mix(color, glow, n2 * 0.28 * vignette);

    float alpha = 0.58 * vignette;
    gl_FragColor = vec4(color, alpha);
  }
`;

function NebulaLayer() {
  const material = useMemo(
    () =>
      new THREE.ShaderMaterial({
        uniforms: { uTime: { value: 0 } },
        vertexShader: nebulaVertex,
        fragmentShader: nebulaFragment,
        transparent: true,
        depthWrite: false,
        blending: THREE.NormalBlending,
      }),
    []
  );

  useFrame((state) => {
    material.uniforms.uTime.value = state.clock.elapsedTime;
  });

  return (
    <mesh position={[0, 0, -9]}>
      <planeGeometry args={[32, 22]} />
      <primitive object={material} attach="material" />
    </mesh>
  );
}

function StarField({
  count,
  radius,
  size,
  color,
  speed,
  zOffset,
  baseOpacity = 0.85,
}: {
  count: number;
  radius: number;
  size: number;
  color: string;
  speed: number;
  zOffset: number;
  baseOpacity?: number;
}) {
  const ref = useRef<THREE.Points>(null);
  const starTexture = useMemo(() => {
    const sizePx = 64;
    const canvas = document.createElement("canvas");
    canvas.width = sizePx;
    canvas.height = sizePx;
    const ctx = canvas.getContext("2d");
    if (!ctx) return new THREE.Texture();

    const c = sizePx / 2;
    const grad = ctx.createRadialGradient(c, c, 1, c, c, c);
    grad.addColorStop(0.0, "rgba(255,255,255,1)");
    grad.addColorStop(0.35, "rgba(210,225,255,0.95)");
    grad.addColorStop(0.75, "rgba(140,170,255,0.35)");
    grad.addColorStop(1.0, "rgba(140,170,255,0)");
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, sizePx, sizePx);

    ctx.strokeStyle = "rgba(210,225,255,0.6)";
    ctx.lineWidth = 1.25;
    ctx.beginPath();
    ctx.moveTo(c, c - 10);
    ctx.lineTo(c, c + 10);
    ctx.moveTo(c - 10, c);
    ctx.lineTo(c + 10, c);
    ctx.stroke();

    const tex = new THREE.CanvasTexture(canvas);
    tex.colorSpace = THREE.SRGBColorSpace;
    tex.minFilter = THREE.LinearFilter;
    tex.magFilter = THREE.LinearFilter;
    tex.generateMipmaps = false;
    return tex;
  }, []);

  useEffect(() => {
    return () => starTexture.dispose();
  }, [starTexture]);

  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i += 1) {
      const r = THREE.MathUtils.lerp(radius * 0.1, radius, Math.pow(Math.random(), 0.65));
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      arr[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      arr[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      arr[i * 3 + 2] = r * Math.cos(phi) + zOffset;
    }
    return arr;
  }, [count, radius, zOffset]);

  useFrame((state, delta) => {
    if (!ref.current) return;
    ref.current.rotation.y += delta * speed;
    ref.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.14) * 0.04;
    ref.current.rotation.z = Math.cos(state.clock.elapsedTime * 0.1) * 0.02;

    const tx = state.pointer.x * 0.45;
    const ty = state.pointer.y * 0.24;
    state.camera.position.x = THREE.MathUtils.lerp(state.camera.position.x, tx, 0.02);
    state.camera.position.y = THREE.MathUtils.lerp(state.camera.position.y, ty, 0.02);
    state.camera.lookAt(0, 0, 0);
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        color={color}
        size={size}
        sizeAttenuation
        map={starTexture}
        alphaMap={starTexture}
        alphaTest={0.02}
        transparent
        opacity={baseOpacity}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  );
}

function TwinkleField() {
  const ref = useRef<THREE.Points>(null);
  const starTexture = useMemo(() => {
    const sizePx = 64;
    const canvas = document.createElement("canvas");
    canvas.width = sizePx;
    canvas.height = sizePx;
    const ctx = canvas.getContext("2d");
    if (!ctx) return new THREE.Texture();

    const c = sizePx / 2;
    const grad = ctx.createRadialGradient(c, c, 1, c, c, c);
    grad.addColorStop(0.0, "rgba(255,255,255,1)");
    grad.addColorStop(0.45, "rgba(230,236,255,0.95)");
    grad.addColorStop(1.0, "rgba(180,200,255,0)");
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, sizePx, sizePx);

    const tex = new THREE.CanvasTexture(canvas);
    tex.colorSpace = THREE.SRGBColorSpace;
    tex.minFilter = THREE.LinearFilter;
    tex.magFilter = THREE.LinearFilter;
    tex.generateMipmaps = false;
    return tex;
  }, []);

  useEffect(() => {
    return () => starTexture.dispose();
  }, [starTexture]);

  const count = 36;
  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i += 1) {
      const r = THREE.MathUtils.lerp(4.8, 9.5, Math.random());
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      arr[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      arr[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      arr[i * 3 + 2] = r * Math.cos(phi) - 1.6;
    }
    return arr;
  }, []);

  useFrame((state, delta) => {
    if (!ref.current) return;
    ref.current.rotation.y += delta * 0.01;
    const mat = ref.current.material as THREE.PointsMaterial;
    mat.opacity = 0.14 + (Math.sin(state.clock.elapsedTime * 1.1) * 0.5 + 0.5) * 0.12;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        color="#dbe4ff"
        size={0.0132}
        sizeAttenuation
        map={starTexture}
        alphaMap={starTexture}
        alphaTest={0.02}
        transparent
        opacity={0.18}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  );
}

function SceneContent() {
  return (
    <>
      <NebulaLayer />
      <StarField count={520} radius={8.5} size={0.026} color="#ffffff" speed={0.02} zOffset={-0.8} baseOpacity={0.72} />
      <StarField count={360} radius={6.5} size={0.02} color="#f4f6ff" speed={-0.03} zOffset={-2.1} baseOpacity={0.62} />
      <TwinkleField />
    </>
  );
}

type Christian3DBackgroundProps = {
  debug?: boolean;
  contentColumnHeight?: number;
  sentinelBottom?: number;
  wrapperMinHeightPx?: number;
};

export function Christian3DBackground({
  debug,
  contentColumnHeight = 0,
  sentinelBottom = 0,
  wrapperMinHeightPx = 0,
}: Christian3DBackgroundProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [containerHeight, setContainerHeight] = useState(0);

  useEffect(() => {
    if (!debug || !containerRef.current) return;
    const el = containerRef.current;
    const update = () => setContainerHeight(el.offsetHeight);
    update();
    const ro = new ResizeObserver(update);
    ro.observe(el);
    return () => ro.disconnect();
  }, [debug]);

  return (
    <>
      <div
        ref={containerRef}
        className="absolute inset-0 z-0 w-full"
        style={{
          background:
            "radial-gradient(1000px 600px at 20% 12%, #05070d 0%, rgba(6, 7, 13, 0.035) 42%, transparent 70%), linear-gradient(180deg, #000000 0%, #010102 24%, #080d18 58%, #080913 100%)",
        }}
        aria-hidden
      >
        {debug && (
          <div
            className="absolute left-0 right-0 z-10 h-1 bg-red-500"
            style={{ bottom: 0 }}
            aria-hidden
          />
        )}
        <Canvas
          className="z-[2]"
          camera={{ position: [0, 0, 8], fov: 56 }}
          dpr={[1, 1.5]}
          gl={{ antialias: true, alpha: true }}
          resize={{ debounce: 0 }}
        >
          <SceneContent />
        </Canvas>
      </div>
      {debug && (
        <div
          className="fixed bottom-4 left-4 right-4 z-[100] rounded-lg border-2 border-red-500 bg-black/90 p-3 font-mono text-xs text-white"
          aria-live="polite"
        >
          <div>contentColumn scrollHeight: {contentColumnHeight}px</div>
          <div>sentinel bottom (Y): {sentinelBottom}px</div>
          <div>wrapper minHeight used: max(100vh, {wrapperMinHeightPx}px)</div>
          <div>background container offsetHeight: {containerHeight}px</div>
          <div>document.scrollHeight: {typeof document !== "undefined" ? document.documentElement.scrollHeight : "—"}</div>
          <div className="mt-1 text-red-400">?debug=1 — удалить после отладки</div>
        </div>
      )}
    </>
  );
}
