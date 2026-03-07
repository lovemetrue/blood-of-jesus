/**
 * Christian-themed 3D animated background.
 * React Three Fiber + Drei. Dove (Holy Spirit), particles, light rings.
 */
import React, { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Stars } from "@react-three/drei";
import * as THREE from "three";

const COLORS = {
  gold: "#e8d5a3",
  goldBright: "#f5e6c8",
  white: "#ffffff",
  blue: "#1e3a5f",
  blueLight: "#2c5282",
  purple: "#4c1d95",
  purpleLight: "#6b21a8",
} as const;

// ——— Abstract Dove (Holy Spirit symbol) ———
function Dove() {
  const group = useRef<THREE.Group>(null);
  const wings = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (!group.current) return;
    const t = state.clock.elapsedTime;
    group.current.position.y = Math.sin(t * 0.3) * 0.15;
    group.current.rotation.y = Math.sin(t * 0.2) * 0.1;
    if (wings.current) {
      wings.current.rotation.x = Math.sin(t * 0.8) * 0.15;
    }
  });

  const material = useMemo(
    () =>
      new THREE.MeshPhysicalMaterial({
        color: COLORS.white,
        emissive: COLORS.goldBright,
        emissiveIntensity: 0.4,
        transparent: true,
        opacity: 0.88,
        roughness: 0.3,
        metalness: 0.1,
        side: THREE.DoubleSide,
      }),
    []
  );

  return (
    <Float speed={0.5} rotationIntensity={0.1} floatIntensity={0.2}>
      <group ref={group} position={[0, 0, 0]} scale={1.2}>
        {/* Body */}
        <mesh position={[0, 0, 0]} material={material}>
          <sphereGeometry args={[0.35, 24, 24]} />
        </mesh>
        {/* Head */}
        <mesh position={[0, 0.22, 0.28]} material={material}>
          <sphereGeometry args={[0.14, 20, 20]} />
        </mesh>
        {/* Wings */}
        <group ref={wings} position={[0, 0.05, 0]}>
          <mesh
            position={[0.28, 0, 0]}
            rotation={[0, 0, Math.PI / 2]}
            material={material}
          >
            <sphereGeometry args={[0.2, 20, 20, 0, Math.PI * 2, 0, Math.PI / 2]} />
          </mesh>
          <mesh
            position={[-0.28, 0, 0]}
            rotation={[0, 0, -Math.PI / 2]}
            material={material}
          >
            <sphereGeometry args={[0.2, 20, 20, 0, Math.PI * 2, 0, Math.PI / 2]} />
          </mesh>
        </group>
      </group>
    </Float>
  );
}

// ——— Light rings around center ———
function LightRings() {
  const ring1 = useRef<THREE.Mesh>(null);
  const ring2 = useRef<THREE.Mesh>(null);
  const ring3 = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    if (ring1.current) {
      ring1.current.rotation.x = t * 0.08;
      ring1.current.rotation.z = t * 0.05;
    }
    if (ring2.current) {
      ring2.current.rotation.x = t * 0.06;
      ring2.current.rotation.z = -t * 0.07;
    }
    if (ring3.current) {
      ring3.current.rotation.y = t * 0.1;
    }
  });

  return (
    <group position={[0, 0, -1.5]}>
      <mesh ref={ring1}>
        <torusGeometry args={[1.8, 0.02, 16, 64]} />
        <meshBasicMaterial
          color={COLORS.goldBright}
          transparent
          opacity={0.25}
          side={THREE.DoubleSide}
        />
      </mesh>
      <mesh ref={ring2} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[1.5, 0.015, 16, 64]} />
        <meshBasicMaterial
          color={COLORS.goldBright}
          transparent
          opacity={0.25}
          side={THREE.DoubleSide}
        />
      </mesh>
      <mesh ref={ring3}>
        <torusGeometry args={[2.1, 0.018, 16, 64]} />
        <meshBasicMaterial
          color={COLORS.goldBright}
          transparent
          opacity={0.25}
          side={THREE.DoubleSide}
        />
      </mesh>
    </group>
  );
}

// ——— Particle field ———
function ParticleField() {
  const count = 800;
  const points = useRef<THREE.Points>(null);
  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const r = 2 + Math.random() * 4;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      pos[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      pos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      pos[i * 3 + 2] = r * Math.cos(phi) - 2;
    }
    return pos;
  }, []);

  useFrame((state) => {
    if (!points.current) return;
    const t = state.clock.elapsedTime;
    points.current.rotation.y = t * 0.02;
    const pos = points.current.geometry.attributes.position.array as Float32Array;
    for (let i = 0; i < count; i++) {
      pos[i * 3 + 1] += Math.sin(t + i * 0.1) * 0.0008;
    }
    points.current.geometry.attributes.position.needsUpdate = true;
  });

  return (
    <points ref={points}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.04}
        color={COLORS.goldBright}
        transparent
        opacity={0.7}
        sizeAttenuation
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

// ——— Scene content ———
function SceneContent() {
  return (
    <>
      <ambientLight intensity={0.4} />
      <pointLight position={[2, 2, 2]} color={COLORS.goldBright} intensity={1} />
      <pointLight position={[-2, -1, 1]} color={COLORS.white} intensity={0.6} />
      <pointLight position={[0, 2, 1]} color={COLORS.gold} intensity={0.8} />
      <Dove />
      <LightRings />
      <ParticleField />
      <Stars radius={12} depth={4} count={400} fade speed={2} />
    </>
  );
}

export function Christian3DBackground() {
  return (
    <div
      className="absolute inset-0 z-0"
      style={{ background: "linear-gradient(180deg, #0f172a 0%, #1e3a5f 50%, #4c1d95 100%)" }}
      aria-hidden
    >
      <Canvas
        camera={{ position: [0, 0, 5], fov: 50 }}
        dpr={[1, 2]}
        gl={{ antialias: true, alpha: true }}
      >
        <color attach="background" args={["#0a0f1a"]} />
        <fog attach="fog" args={["#0a0f1a", 4, 14]} />
        <SceneContent />
      </Canvas>
    </div>
  );
}
