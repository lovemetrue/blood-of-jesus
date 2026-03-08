/**
 * Minimal 3D background: particle wave grid (based on CodePen WebGL Point Waves).
 * React Three Fiber. Static or very slow wave, minimal.
 */
import React, { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

const PARTICLE_VERTEX = `
  attribute float scale;
  attribute float offset;
  uniform float uTime;

  void main() {
    vec3 p = position;
    float s = scale;
    float t = uTime + offset;

    float r = length(p.xz);
    float radial = sin(r * 0.4 - t * 0.5) * 0.4;
    float gridY = (sin(p.x + t) * 0.4 + cos(p.z + t * 0.7) * 0.3);
    float gridX = sin(p.z + t * 0.6) * 0.2;
    float gridZ = sin(p.x + t * 0.8) * 0.2;

    p.y += radial + gridY;
    p.x += gridX;
    p.z += gridZ;

    s *= 0.9 + 0.3 * sin(r * 0.2 + t * 0.4) + 0.2 * (1.0 - smoothstep(0.0, 25.0, r));
    s = max(s, 0.4);

    vec4 mvPosition = modelViewMatrix * vec4(p, 1.0);
    gl_PointSize = s * 11.0 * (1.0 / -mvPosition.z);
    gl_Position = projectionMatrix * mvPosition;
  }
`;

const PARTICLE_FRAGMENT = `
  void main() {
    float d = length(gl_PointCoord - 0.5) * 2.0;
    float a = 1.0 - smoothstep(0.2, 1.0, d);
    gl_FragColor = vec4(1.0, 0.96, 0.92, 0.4 * a);
  }
`;

function ParticleWave() {
  const mesh = useRef<THREE.Points>(null);

  const { positions, scales, offsets, count } = useMemo(() => {
    const gap = 0.38;
    const amountX = 100;
    const amountY = 100;
    const particleNum = amountX * amountY;
    const particlePositions = new Float32Array(particleNum * 3);
    const particleScales = new Float32Array(particleNum);
    const particleOffsets = new Float32Array(particleNum);
    let i = 0;
    let j = 0;
    const centerX = (amountX * gap) / 2;
    const centerZ = (amountY * gap) / 2;
    for (let ix = 0; ix < amountX; ix++) {
      for (let iy = 0; iy < amountY; iy++) {
        const x = ix * gap - centerX;
        const z = iy * gap - centerZ;
        const r = Math.sqrt(x * x + z * z);
        const dome = 1.2 * Math.exp(-(r * r) / 350);
        particlePositions[i] = x;
        particlePositions[i + 1] = dome;
        particlePositions[i + 2] = z;
        particleScales[j] = 0.7 + 0.5 * Math.random();
        particleOffsets[j] = Math.random() * 6.28;
        i += 3;
        j++;
      }
    }
    return {
      positions: particlePositions,
      scales: particleScales,
      offsets: particleOffsets,
      count: particleNum,
    };
  }, []);

  useFrame((state) => {
    const mat = mesh.current?.material as THREE.ShaderMaterial | undefined;
    if (mat?.uniforms?.uTime) {
      mat.uniforms.uTime.value = state.clock.elapsedTime * 0.03;
    }
  });

  const shaderMaterial = useMemo(
    () =>
      new THREE.ShaderMaterial({
        transparent: true,
        depthWrite: false,
        vertexShader: PARTICLE_VERTEX,
        fragmentShader: PARTICLE_FRAGMENT,
        uniforms: {
          uTime: { value: 0 },
        },
      }),
    []
  );

  return (
    <points ref={mesh} position={[0, 0, -3]} rotation={[-0.3, 0, 0]}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={positions}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-scale"
          count={count}
          array={scales}
          itemSize={1}
        />
        <bufferAttribute
          attach="attributes-offset"
          count={count}
          array={offsets}
          itemSize={1}
        />
      </bufferGeometry>
      <primitive object={shaderMaterial} attach="material" />
    </points>
  );
}

function SceneContent() {
  return <ParticleWave />;
}

export function Christian3DBackground() {
  return (
    <div
      className="absolute inset-0 z-0"
      style={{
        background: "linear-gradient(180deg, #0a0f1a 0%, #0f172a 40%, #1e1b4b 100%)",
      }}
      aria-hidden
    >
      <Canvas
        camera={{ position: [0, 0, 8], fov: 60 }}
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: true }}
      >
        <color attach="background" args={["#050510"]} />
        <SceneContent />
      </Canvas>
    </div>
  );
}
