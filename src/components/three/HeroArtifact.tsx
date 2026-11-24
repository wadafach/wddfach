"use client";

import { useMemo, useRef, useState } from "react";
import { useFrame, type ThreeEvent } from "@react-three/fiber";
import * as THREE from "three";

/**
 * Objek pusat yang bisa di-drag.
 *
 * Sekarang isinya rakitan low-poly bergaya sci-fi (cincin + pecahan inti).
 * Begitu kamu punya file .glb karyamu sendiri, tinggal taruh di
 * `public/models/hero.glb` dan set `src/lib/site.ts → heroModel`.
 * Komponen `HeroModel` di bawah yang ngurus itu (lihat catatan di README).
 *
 * Catatan desain: aku sengaja nggak bikin "senjata" dari balok primitif —
 * hasilnya selalu kelihatan cepat jadi. Rakitan orbit ini kebaca sebagai
 * artefak, dan tetap jujur bahwa ini placeholder.
 */
export function HeroArtifact({
  intensity = 1,
  onInteract,
}: {
  intensity?: number;
  onInteract?: () => void;
}) {
  const root = useRef<THREE.Group>(null);
  const ringA = useRef<THREE.Group>(null);
  const ringB = useRef<THREE.Group>(null);
  const core = useRef<THREE.Mesh>(null);

  const drag = useRef({ active: false, lastX: 0, lastY: 0, vx: 0, vy: 0 });
  const rot = useRef({ x: 0.28, y: 0.4 });
  const [hover, setHover] = useState(false);

  const coreMat = useMemo(
    () =>
      new THREE.ShaderMaterial({
        transparent: true,
        uniforms: { uTime: { value: 0 } },
        vertexShader: /* glsl */ `
          varying vec3 vPos;
          varying vec3 vNormal;
          varying vec3 vView;
          void main() {
            vPos = position;
            vNormal = normalize(normalMatrix * normal);
            vec4 mv = modelViewMatrix * vec4(position, 1.0);
            vView = normalize(-mv.xyz);
            gl_Position = projectionMatrix * mv;
          }
        `,
        fragmentShader: /* glsl */ `
          uniform float uTime;
          varying vec3 vPos;
          varying vec3 vNormal;
          varying vec3 vView;
          void main() {
            float pulse = 0.62 + 0.38 * sin(uTime * 1.35);
            float fres = pow(1.0 - clamp(dot(normalize(vNormal), vView), 0.0, 1.0), 2.2);
            float veins = 0.5 + 0.5 * sin(vPos.y * 22.0 + uTime * 1.1) * sin(vPos.x * 17.0 - uTime * 0.8);
            vec3 hot = vec3(1.0, 0.62, 0.22);
            vec3 cool = vec3(1.0, 0.86, 0.62);
            vec3 col = mix(hot, cool, veins * 0.65);
            float a = (0.16 + fres * 1.5) * pulse;
            gl_FragColor = vec4(col * (0.7 + fres * 1.4), clamp(a, 0.0, 1.0));
          }
        `,
      }),
    [],
  );

  const shellMat = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: "#2a3350",
        metalness: 0.86,
        roughness: 0.34,
        emissive: new THREE.Color("#ff7a18"),
        emissiveIntensity: 0.06,
        flatShading: true,
      }),
    [],
  );

  const shardMat = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: "#39456b",
        metalness: 0.7,
        roughness: 0.42,
        flatShading: true,
      }),
    [],
  );

  /** Posisi pecahan di orbit — deterministik biar nggak "bergetar" antar render. */
  const shards = useMemo(() => {
    const out: { pos: [number, number, number]; scale: number; rot: [number, number, number] }[] = [];
    const n = 9;
    for (let i = 0; i < n; i++) {
      const a = (i / n) * Math.PI * 2 + 0.4;
      const r = 2.05 + (i % 3) * 0.22;
      out.push({
        pos: [Math.cos(a) * r, Math.sin(a * 1.7) * 0.42, Math.sin(a) * r],
        scale: 0.14 + ((i * 37) % 11) / 55,
        rot: [a * 1.3, a * 2.1, a * 0.7],
      });
    }
    return out;
  }, []);

  /** Input: pointer + sentuh + keyboard, semuanya lewat satu jalur. */
  const onDown = (e: ThreeEvent<PointerEvent>) => {
    e.stopPropagation();
    drag.current.active = true;
    drag.current.lastX = e.clientX;
    drag.current.lastY = e.clientY;
    drag.current.vx = 0;
    drag.current.vy = 0;
    onInteract?.();
    (e.target as Element)?.setPointerCapture?.(e.pointerId);
  };

  const onMove = (e: ThreeEvent<PointerEvent>) => {
    if (!drag.current.active) return;
    const dx = e.clientX - drag.current.lastX;
    const dy = e.clientY - drag.current.lastY;
    drag.current.lastX = e.clientX;
    drag.current.lastY = e.clientY;
    drag.current.vy = dx * 0.006;
    drag.current.vx = dy * 0.004;
    rot.current.y += drag.current.vy;
    rot.current.x = Math.max(-0.9, Math.min(0.9, rot.current.x + drag.current.vx));
  };

  const onUp = () => {
    drag.current.active = false;
  };

  useFrame((state, dt) => {
    coreMat.uniforms.uTime.value += dt;
    const t = state.clock.elapsedTime;

    if (!drag.current.active) {
      // lanjut mutar pelan + sedikit inersia setelah dilepas
      rot.current.y += dt * (0.11 * intensity + drag.current.vy * 0.5);
      drag.current.vy *= 0.92;
      drag.current.vx *= 0.92;
    }

    if (root.current) {
      root.current.rotation.y = rot.current.y;
      root.current.rotation.x = rot.current.x + Math.sin(t * 0.35) * 0.03;
      // float naik-turun halus
      root.current.position.y = Math.sin(t * 0.55) * 0.12;
    }
    if (ringA.current) ringA.current.rotation.z = t * 0.16;
    if (ringB.current) ringB.current.rotation.x = -t * 0.12;
    if (core.current) core.current.rotation.y = -t * 0.3;
  });

  return (
    <group
      ref={root}
      onPointerDown={onDown}
      onPointerMove={onMove}
      onPointerUp={onUp}
      onPointerOut={onUp}
      onPointerOver={() => setHover(true)}
      onPointerLeave={() => setHover(false)}
      scale={hover ? 1.03 : 1}
    >
      {/* inti bercahaya */}
      <mesh ref={core} material={coreMat}>
        <icosahedronGeometry args={[0.62, 1]} />
      </mesh>

      {/* cangkang low-poly, di-flat-shade biar kebaca "low poly" */}
      <mesh material={shellMat}>
        <icosahedronGeometry args={[1.02, 1]} />
      </mesh>

      {/* dua cincin orbit, miring berbeda */}
      <group ref={ringA} rotation={[1.15, 0.3, 0]}>
        <mesh material={shellMat}>
          <torusGeometry args={[1.72, 0.045, 8, 72]} />
        </mesh>
      </group>
      <group ref={ringB} rotation={[0.4, -0.7, 0.9]}>
        <mesh material={shellMat}>
          <torusGeometry args={[2.18, 0.03, 8, 72]} />
        </mesh>
      </group>

      {/* pecahan yang nempel di orbit */}
      {shards.map((s, i) => (
        <mesh key={i} material={shardMat} position={s.pos} rotation={s.rot} scale={s.scale}>
          <octahedronGeometry args={[1, 0]} />
        </mesh>
      ))}
    </group>
  );
}
