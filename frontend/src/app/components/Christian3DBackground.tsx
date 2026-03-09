/**
 * 3D background: тёмный CSS-градиент + плавающие 3D объекты (икосаэдры, плоская земля с куполом).
 */
import React, { useRef, useMemo, useEffect, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

// ——— Floating 3D shapes (wireframe / transparent) ———
function FloatingShape({
  shape,
  position,
  rotationSpeed,
  color,
  scale,
}: {
  shape: "icosahedron" | "torus";
  position: [number, number, number];
  rotationSpeed: [number, number, number];
  color: string;
  scale: number;
}) {
  const mesh = useRef<THREE.Mesh>(null);
  useFrame((_, delta) => {
    if (mesh.current) {
      mesh.current.rotation.x += rotationSpeed[0] * delta;
      mesh.current.rotation.y += rotationSpeed[1] * delta;
      mesh.current.rotation.z += rotationSpeed[2] * delta;
    }
  });

  return (
    <mesh ref={mesh} position={position} scale={scale} layers={0}>
      {shape === "icosahedron" ? (
        <icosahedronGeometry args={[1, 0]} />
      ) : (
        <torusGeometry args={[1, 0.35, 16, 48]} />
      )}
      <meshBasicMaterial
        color={color}
        transparent
        opacity={0.20}
        depthWrite={false}
        wireframe
      />
    </mesh>
  );
}

// Плоская земля: диск + купол (полусфера), на куполе — солнце и луна одинакового размера
function FloatingFlatEarth({
  position,
  rotationSpeed,
  color,
  scale,
}: {
  position: [number, number, number];
  rotationSpeed: [number, number, number];
  color: string;
  scale: number;
}) {
  const group = useRef<THREE.Group>(null);
  const domeRadius = 1;
  const discHeight = 0.06;
  const discTopY = discHeight / 0.5;
  //const domeBaseY= discHeight / 2 + domeRadius / 2;

  useFrame((_, delta) => {
    if (group.current) {
      group.current.rotation.x += rotationSpeed[0] * delta;
      group.current.rotation.y += rotationSpeed[1] * delta;
      group.current.rotation.z += rotationSpeed[2] * delta;
    }
  });

  // Купол: полусфера с основанием ровно на верхней грани диска (y = discTopY).
  // В Three.js полусфера theta 0..PI/2: основание в local y=0, верх в y=radius. Позиция меша = основание.
  const domeMeshY = discTopY;
  const toDomeSurface = (theta: number, phi: number) => [
    domeRadius * Math.sin(theta) * Math.sin(phi),
    domeMeshY + domeRadius * Math.cos(theta),
    domeRadius * Math.sin(theta) * Math.cos(phi),
  ] as [number, number, number];
  const sunPos = toDomeSurface(0.5, 0.35);
  const moonPos = toDomeSurface(0.55, 2.7);
  const sunMoonRadius = 0.14;

  return (
    <group ref={group} position={position} scale={scale} rotation={[0.6, 0.2, 0]} layers={0}>
      {/* Диск — плоская земля */}
      <mesh position={[0, 0, 0]}>
        <cylinderGeometry args={[1, 1, discHeight, 32]} />
        <meshBasicMaterial
          color={color}
          transparent
          opacity={0.08}
          depthWrite={false}
          wireframe
        />
      </mesh>
      {/* Купол — полусфера вплотную к диску: основание = верх диска */}
      <mesh position={[0, domeMeshY, 0]}>
        <sphereGeometry args={[domeRadius, 24, 16, 0, Math.PI * 2, 0, Math.PI / 2]} />
        <meshBasicMaterial
          color={color}
          transparent
          opacity={0.16}
          depthWrite={false}
          wireframe
        />
      </mesh>
      {/* Солнце на куполе */}
      <mesh position={sunPos}>
        <sphereGeometry args={[sunMoonRadius, 16, 12]} />
        <meshBasicMaterial
          color="#e8c090"
          transparent
          opacity={0.58}
          depthWrite={false}
          wireframe
        />
      </mesh>
      {/* Луна на куполе, такой же размер */}
      <mesh position={moonPos}>
        <sphereGeometry args={[sunMoonRadius, 16, 12]} />
        <meshBasicMaterial
          color="#a0a0c8"
          transparent
          opacity={0.25}
          depthWrite={false}
          wireframe
        />
      </mesh>
    </group>
  );
}

function FloatingShapes() {
  return (
    <group>
      <FloatingShape
        shape="icosahedron"
        position={[3.5, 1.2, -6]}
        rotationSpeed={[0.02, 0.03, 0.01]}
        color="#c9a0a0"
        scale={1.8}
      />
      <FloatingFlatEarth
        position={[-2.1, -0.8, -5]}
        rotationSpeed={[-0.015, 0.025, 0.01]}
        color="#a080b0"
        scale={1.2}
      />
      <FloatingShape
        shape="icosahedron"
        position={[0, 2.5, -7]}
        rotationSpeed={[0.01, -0.02, 0.015]}
        color="#6a5080"
        scale={0.9}
      />
    </group>
  );
}

function SceneContent() {
  return <FloatingShapes />;
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
            "linear-gradient(180deg, #050508 0%, #080b12 25%, #0a0f1a 50%, #0d0d18 75%, #030306 100%)",
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
          camera={{ position: [0, 0, 8], fov: 60 }}
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
