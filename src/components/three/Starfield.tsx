"use client";

import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

/**
 * Tiga lapis bintang dengan kedalaman berbeda.
 * Lapis jauh diam, lapis dekat bergerak sangat lambat -> ada parallax halus
 * waktu user scroll. Nggak ada animasi yang "kedip-kedip kayak disko".
 */
export function Starfield({ count = 2600, animate = true }: { count?: number; animate?: boolean }) {
  const near = useRef<THREE.Points>(null);
  const mid = useRef<THREE.Points>(null);

  const layers = useMemo(() => {
    const build = (n: number, radius: number, spread: number) => {
      const pos = new Float32Array(n * 3);
      const col = new Float32Array(n * 3);
      const size = new Float32Array(n);

      // Palet sengaja sempit: putih kebiruan, emas samar, cyan samar.
      const warm = new THREE.Color("#ffd9a3");
      const cold = new THREE.Color("#cfe3ff");
      const ion = new THREE.Color("#8fe6f2");
      const white = new THREE.Color("#ffffff");
      const scratch = new THREE.Color();

      for (let i = 0; i < n; i++) {
        // distribusi bola, bukan kubus — biar nggak ada sudut yang kosong
        const u = Math.random() * 2 - 1;
        const theta = Math.random() * Math.PI * 2;
        const r = radius + Math.random() * spread;
        const s = Math.sqrt(1 - u * u);
        pos[i * 3] = r * s * Math.cos(theta);
        pos[i * 3 + 1] = r * s * Math.sin(theta) * 0.62; // pipihkan sedikit
        pos[i * 3 + 2] = r * u;

        const roll = Math.random();
        if (roll > 0.94) scratch.copy(warm);
        else if (roll > 0.88) scratch.copy(ion);
        else if (roll > 0.55) scratch.copy(cold);
        else scratch.copy(white);

        // bintang mayoritas redup; cuma sedikit yang terang
        const lum = Math.pow(Math.random(), 2.4);
        const intensity = 0.35 + lum * 0.9;
        col[i * 3] = scratch.r * intensity;
        col[i * 3 + 1] = scratch.g * intensity;
        col[i * 3 + 2] = scratch.b * intensity;

        size[i] = 0.5 + lum * 2.1;
      }

      const g = new THREE.BufferGeometry();
      g.setAttribute("position", new THREE.BufferAttribute(pos, 3));
      g.setAttribute("color", new THREE.BufferAttribute(col, 3));
      g.setAttribute("aSize", new THREE.BufferAttribute(size, 1));
      return g;
    };

    return {
      far: build(Math.round(count * 0.55), 26, 22),
      mid: build(Math.round(count * 0.3), 14, 12),
      close: build(Math.round(count * 0.15), 7, 6),
    };
  }, [count]);

  /** Shader titik bundar dengan halo lembut — lebih bagus dari gl.POINTS kotak. */
  const material = useMemo(() => {
    return new THREE.ShaderMaterial({
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      uniforms: { uTime: { value: 0 }, uOpacity: { value: 1 } },
      vertexShader: /* glsl */ `
        attribute float aSize;
        varying vec3 vColor;
        uniform float uTime;
        void main() {
          vColor = color;
          vec4 mv = modelViewMatrix * vec4(position, 1.0);
          float twinkle = 0.86 + 0.14 * sin(uTime * 0.7 + position.x * 3.1 + position.y * 2.3);
          gl_PointSize = aSize * twinkle * (260.0 / max(-mv.z, 0.001));
          gl_Position = projectionMatrix * mv;
        }
      `,
      fragmentShader: /* glsl */ `
        varying vec3 vColor;
        uniform float uOpacity;
        void main() {
          vec2 d = gl_PointCoord - vec2(0.5);
          float r = length(d);
          if (r > 0.5) discard;
          float core = smoothstep(0.5, 0.0, r);
          float halo = pow(core, 2.6);
          gl_FragColor = vec4(vColor * (0.45 + halo * 1.3), (core * 0.55 + halo) * uOpacity);
        }
      `,
    });
  }, []);

  useFrame((_, dt) => {
    if (!animate) return;
    material.uniforms.uTime.value += dt;
    if (near.current) near.current.rotation.y += dt * 0.012;
    if (mid.current) mid.current.rotation.y -= dt * 0.006;
  });

  const mk = (
    key: keyof typeof layers,
    ref: React.RefObject<THREE.Points | null>,
  ) => (
    <points
      key={key}
      ref={ref}
      geometry={layers[key]}
      material={material}
      frustumCulled={false}
    />
  );

  return (
    <group>
      {mk("far", mid)}
      {mk("mid", mid)}
      {mk("close", near)}
    </group>
  );
}
