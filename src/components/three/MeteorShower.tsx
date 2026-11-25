"use client";

import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

interface MeteorDef {
  offset: number;
  speed: number;
  length: number;
  tilt: number;
  x0: number;
  y0: number;
  z: number;
  color: string;
}

/** Bintang jatuh menggunakan material Three.js standar agar kompatibel di HP. */
export function MeteorShower({ count = 14, intensity = 1 }: { count?: number; intensity?: number }) {
  const mesh = useRef<THREE.InstancedMesh>(null);
  const dummy = useMemo(() => new THREE.Object3D(), []);
  const meteors = useMemo<MeteorDef[]>(() => Array.from({ length: count }, (_, i) => ({
    offset: (i * 0.618) % 1,
    speed: 0.045 + (i % 5) * 0.012,
    length: 4.5 + (i % 6) * 0.8,
    tilt: 0.55 + (i % 4) * 0.08,
    x0: -14 + (i * 7.3) % 30,
    y0: 9 + (i * 3.7) % 12,
    z: -4 + (i * 2.1) % 14,
    color: i % 4 === 0 ? "#ffc98a" : i % 3 === 0 ? "#8fe6f2" : "#bfe9ff",
  })), [count]);
  const geometry = useMemo(() => {
    const g = new THREE.PlaneGeometry(1, 0.08);
    g.translate(0.5, 0, 0);
    return g;
  }, []);
  const material = useMemo(() => new THREE.MeshBasicMaterial({ color: "#bfe9ff", transparent: true, opacity: Math.min(0.9, 0.45 + intensity * 0.35), depthWrite: false, blending: THREE.AdditiveBlending, side: THREE.DoubleSide }), [intensity]);
  const elapsed = useRef(0);

  useFrame((state, dt) => {
    if (!mesh.current) return;
    elapsed.current += dt;
    const t = elapsed.current;
    for (let i = 0; i < meteors.length; i++) {
      const m = meteors[i];
      const p = (t * m.speed + m.offset) % 1;
      const x = m.x0 + p * 34 * Math.cos(m.tilt);
      const y = m.y0 - p * 34 * Math.sin(m.tilt);
      const grow = Math.sin(Math.min(1, p * 1.35) * Math.PI * 0.5);
      dummy.position.set(x, y, m.z);
      dummy.rotation.set(0, 0, m.tilt);
      dummy.scale.set(m.length * grow * intensity, 1, 1);
      dummy.updateMatrix();
      mesh.current.setMatrixAt(i, dummy.matrix);
    }
    mesh.current.instanceMatrix.needsUpdate = true;
    mesh.current.quaternion.copy(state.camera.quaternion);
  });

  if (intensity <= 0) return null;
  return <instancedMesh ref={mesh} args={[geometry, material, count]} frustumCulled={false} renderOrder={2} />;
}
