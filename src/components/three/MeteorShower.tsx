"use client";

import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

interface MeteorDef {
  offset: number; // fase awal 0..1
  speed: number;
  length: number;
  tilt: number;
  x0: number;
  y0: number;
  z: number;
  brightness: number;
}

/**
 * Bintang jatuh.
 *
 * Tiap meteor cuma satu quad memanjang dengan gradien memudar — jauh lebih
 * murah daripada partikel trail. Semuanya dalam satu InstancedMesh, jadi
 * 18 meteor = 1 draw call.
 *
 * Kenapa quad, bukan Line: WebGL lineWidth nggak didukung >1 di banyak
 * platform (termasuk Safari/iOS), jadi garis tebal harus quad.
 */
export function MeteorShower({ count = 14, intensity = 1 }: { count?: number; intensity?: number }) {
  const mesh = useRef<THREE.InstancedMesh>(null);
  const dummy = useMemo(() => new THREE.Object3D(), []);

  const meteors = useMemo<MeteorDef[]>(() => {
    const out: MeteorDef[] = [];
    for (let i = 0; i < count; i++) {
      out.push({
        offset: Math.random(),
        speed: 0.045 + Math.random() * 0.075,
        length: 4.5 + Math.random() * 7,
        tilt: 0.55 + Math.random() * 0.42, // radian dari horizontal
        x0: -14 + Math.random() * 30,
        y0: 9 + Math.random() * 12,
        z: -4 + Math.random() * 14,
        brightness: 0.5 + Math.random() * 0.5,
      });
    }
    return out;
  }, [count]);

  const geometry = useMemo(() => {
    // quad 1x1, titik acuan di ujung ekor (x = 0) supaya bisa "tumbuh" ke depan
    const g = new THREE.PlaneGeometry(1, 1);
    g.translate(0.5, 0, 0);
    return g;
  }, []);

  const material = useMemo(
    () =>
      new THREE.ShaderMaterial({
        transparent: true,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
        side: THREE.DoubleSide,
        uniforms: {
          uFade: { value: 1 },
        },
        vertexShader: /* glsl */ `
          attribute vec3 aColor;
          attribute float aBright;
          varying vec2 vUv;
          varying vec3 vColor;
          varying float vBright;
          void main() {
            vUv = uv;
            vColor = aColor;
            vBright = aBright;
            gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
          }
        `,
        fragmentShader: /* glsl */ `
          varying vec2 vUv;
          varying vec3 vColor;
          varying float vBright;
          uniform float uFade;
          void main() {
            // x: 0 = ekor, 1 = kepala. y: pusat batang.
            float head = smoothstep(0.0, 1.0, vUv.x);
            float across = 1.0 - smoothstep(0.0, 0.5, abs(vUv.y - 0.5));
            float tail = pow(vUv.x, 2.2);          // makin ke ekor makin tipis
            float body = across * (0.18 + tail * 0.82);
            float hot  = pow(vUv.x, 14.0);          // inti terang di kepala
            vec3 col = mix(vColor, vec3(1.0), hot * 0.85);
            float a = body * (0.5 + hot) * vBright * uFade;
            if (a < 0.004) discard;
            gl_FragColor = vec4(col, a);
          }
        `,
      }),
    [],
  );

  /** Warna: sebagian besar putih-cyan, sesekali emas. */
  const attrs = useMemo(() => {
    const c = new Float32Array(count * 3);
    const b = new Float32Array(count);
    const cold = new THREE.Color("#bfe9ff");
    const ion = new THREE.Color("#8fe6f2");
    const ember = new THREE.Color("#ffc98a");
    const tmp = new THREE.Color();
    for (let i = 0; i < count; i++) {
      const roll = Math.random();
      if (roll > 0.78) tmp.copy(ember);
      else if (roll > 0.45) tmp.copy(ion);
      else tmp.copy(cold);
      c[i * 3] = tmp.r;
      c[i * 3 + 1] = tmp.g;
      c[i * 3 + 2] = tmp.b;
      b[i] = meteors[i].brightness;
    }
    return { color: new THREE.BufferAttribute(c, 3), bright: new THREE.BufferAttribute(b, 1) };
  }, [count, meteors]);

  useMemo(() => {
    geometry.setAttribute("aColor", attrs.color);
    geometry.setAttribute("aBright", attrs.bright);
  }, [geometry, attrs]);

  const elapsed = useRef(0);

  useFrame((state, dt) => {
    if (!mesh.current) return;
    elapsed.current += dt;
    const t = elapsed.current;

    for (let i = 0; i < meteors.length; i++) {
      const m = meteors[i];
      // 0..1, mengulang; offset bikin mereka nggak barengan
      const p = ((t * m.speed + m.offset) % 1 + 1) % 1;

      const travel = 34;
      const x = m.x0 + p * travel * Math.cos(m.tilt);
      const y = m.y0 - p * travel * Math.sin(m.tilt);

      dummy.position.set(x, y, m.z);
      dummy.rotation.set(0, 0, m.tilt);
      // memanjang sedikit waktu melaju, lalu mengecil di ujung
      const grow = Math.sin(Math.min(1, p * 1.35) * Math.PI * 0.5);
      dummy.scale.set(m.length * grow * intensity, 0.09 + 0.05 * intensity, 1);
      dummy.updateMatrix();
      mesh.current.setMatrixAt(i, dummy.matrix);
    }
    mesh.current.instanceMatrix.needsUpdate = true;

    // meteor memudar habis (mis. mode ringan) tanpa perlu re-create material
    material.uniforms.uFade.value = intensity;
    // biar ikut kamera
    mesh.current.quaternion.copy(state.camera.quaternion);
  });

  if (intensity <= 0) return null;

  return (
    <instancedMesh
      ref={mesh}
      args={[geometry, material, count]}
      frustumCulled={false}
      renderOrder={2}
    />
  );
}
