/**
 * Minimal 3D background: particle wave grid (based on CodePen WebGL Point Waves).
 * React Three Fiber. Static or very slow wave, minimal.
 */
import React, { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

const PARTICLE_VERTEX = `
  attribute float scale;
  uniform float uTime;

  void main() {
    vec3 p = position;
    float s = scale;

    p.y += (sin(p.x + uTime) * 0.5 + cos(p.y + uTime) * 0.1) * 2.0;
    p.x += sin(p.y + uTime) * 0.5;
    s += (sin(p.x + uTime) * 0.5 + cos(p.y + uTime) * 0.1) * 2.0;

    vec4 mvPosition = modelViewMatrix * vec4(p, 1.0);
    gl_PointSize = s * 12.0 * (1.0 / -mvPosition.z);
    gl_Position = projectionMatrix * mvPosition;
  }
`;

const PARTICLE_FRAGMENT = `
  void main() {
    gl_FragColor = vec4(1.0, 0.95, 0.9, 0.45);
  }
`;

function ParticleWave() {
  const mesh = useRef<THREE.Points>(null);

  const { positions, scales, count } = useMemo(() => {
    const gap = 0.4;
    const amountX = 100;
    const amountY = 100;
    const particleNum = amountX * amountY;
    const particlePositions = new Float32Array(particleNum * 3);
    const particleScales = new Float32Array(particleNum);
    let i = 0;
    let j = 0;
    for (let ix = 0; ix < amountX; ix++) {
      for (let iy = 0; iy < amountY; iy++) {
        particlePositions[i] = ix * gap - (amountX * gap) / 2;
        particlePositions[i + 1] = 0;
        particlePositions[i + 2] = iy * gap - (amountY * gap) / 2;
        particleScales[j] = 1;
        i += 3;
        j++;
      }
    }
    return {
      positions: particlePositions,
      scales: particleScales,
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
