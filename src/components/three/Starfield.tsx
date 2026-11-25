"use client";

import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

/** Starfield kompatibel WebGL: memakai PointsMaterial bawaan, tanpa custom shader. */
export function Starfield({ count = 2600, animate = true }: { count?: number; animate?: boolean }) {
  const near = useRef<THREE.Points>(null);
  const mid = useRef<THREE.Points>(null);

  const layers = useMemo(() => {
    const build = (n: number, radius: number, spread: number) => {
      const pos = new Float32Array(n * 3);
      const col = new Float32Array(n * 3);
      const warm = new THREE.Color("#ffd9a3");
      const cold = new THREE.Color("#cfe3ff");
      const ion = new THREE.Color("#8fe6f2");
      const white = new THREE.Color("#ffffff");
      const scratch = new THREE.Color();
      for (let i = 0; i < n; i++) {
        const u = Math.random() * 2 - 1;
        const theta = Math.random() * Math.PI * 2;
        const r = radius + Math.random() * spread;
        const s = Math.sqrt(1 - u * u);
        pos[i * 3] = r * s * Math.cos(theta);
        pos[i * 3 + 1] = r * s * Math.sin(theta) * 0.62;
        pos[i * 3 + 2] = r * u;
        const roll = Math.random();
        if (roll > 0.94) scratch.copy(warm);
        else if (roll > 0.88) scratch.copy(ion);
        else if (roll > 0.55) scratch.copy(cold);
        else scratch.copy(white);
        const intensity = 0.35 + Math.pow(Math.random(), 2.4) * 0.9;
        col[i * 3] = scratch.r * intensity;
        col[i * 3 + 1] = scratch.g * intensity;
        col[i * 3 + 2] = scratch.b * intensity;
      }
      const geometry = new THREE.BufferGeometry();
      geometry.setAttribute("position", new THREE.BufferAttribute(pos, 3));
      geometry.setAttribute("color", new THREE.BufferAttribute(col, 3));
      return geometry;
    };
    return { far: build(Math.round(count * 0.55), 26, 22), mid: build(Math.round(count * 0.3), 14, 12), close: build(Math.round(count * 0.15), 7, 6) };
  }, [count]);

  const material = useMemo(() => new THREE.PointsMaterial({ size: 0.075, sizeAttenuation: true, vertexColors: true, transparent: true, opacity: 0.57, depthWrite: false, blending: THREE.AdditiveBlending }), []);

  useFrame((_, dt) => {
    if (!animate) return;
    if (near.current) near.current.rotation.y += dt * 0.012;
    if (mid.current) mid.current.rotation.y -= dt * 0.006;
  });

  return (
    <group>
      <points geometry={layers.far} material={material} frustumCulled={false} />
      <points ref={mid} geometry={layers.mid} material={material} frustumCulled={false} />
      <points ref={near} geometry={layers.close} material={material} frustumCulled={false} />
    </group>
  );
}
