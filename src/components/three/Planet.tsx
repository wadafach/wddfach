"use client";

import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

/**
 * Planet prosedural — tanpa file texture sama sekali.
 * Semua permukaan dibuat dari fbm noise di fragment shader, jadi
 * nggak ada asset yang perlu kamu siapin.
 */
const NOISE_GLSL = /* glsl */ `
  vec3 hash3(vec3 p) {
    p = vec3(dot(p, vec3(127.1, 311.7, 74.7)),
             dot(p, vec3(269.5, 183.3, 246.1)),
             dot(p, vec3(113.5, 271.9, 124.6)));
    return -1.0 + 2.0 * fract(sin(p) * 43758.5453123);
  }
  float noise(vec3 p) {
    vec3 i = floor(p);
    vec3 f = fract(p);
    vec3 u = f * f * (3.0 - 2.0 * f);
    return mix(mix(mix(dot(hash3(i + vec3(0,0,0)), f - vec3(0,0,0)),
                       dot(hash3(i + vec3(1,0,0)), f - vec3(1,0,0)), u.x),
                   mix(dot(hash3(i + vec3(0,1,0)), f - vec3(0,1,0)),
                       dot(hash3(i + vec3(1,1,0)), f - vec3(1,1,0)), u.x), u.y),
               mix(mix(dot(hash3(i + vec3(0,0,1)), f - vec3(0,0,1)),
                       dot(hash3(i + vec3(1,0,1)), f - vec3(1,0,1)), u.x),
                   mix(dot(hash3(i + vec3(0,1,1)), f - vec3(0,1,1)),
                       dot(hash3(i + vec3(1,1,1)), f - vec3(1,1,1)), u.x), u.y), u.z);
  }
  float fbm(vec3 p) {
    float v = 0.0, a = 0.5;
    for (int i = 0; i < 5; i++) { v += a * noise(p); p *= 2.03; a *= 0.5; }
    return v;
  }
`;

export function Planet({
  radius = 3.1,
  position = [13.5, 3.4, -11] as [number, number, number],
  spin = 0.02,
}: {
  radius?: number;
  position?: [number, number, number];
  spin?: number;
}) {
  const group = useRef<THREE.Group>(null);
  const surface = useMemo(() => new THREE.Color("#161a33"), []);
  const warmA = useMemo(() => new THREE.Color("#ff7a18"), []);
  const coldA = useMemo(() => new THREE.Color("#45d6e8"), []);
  const rim = useMemo(() => new THREE.Color("#ffb066"), []);

  const planetMat = useMemo(
    () =>
      new THREE.ShaderMaterial({
        uniforms: {
          uTime: { value: 0 },
          uBase: { value: surface },
          uWarm: { value: warmA },
          uCold: { value: coldA },
          uRim: { value: rim },
        },
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
          ${NOISE_GLSL}
          uniform float uTime;
          uniform vec3 uBase, uWarm, uCold, uRim;
          varying vec3 vPos;
          varying vec3 vNormal;
          varying vec3 vView;

          // arah matahari buatan, biar planet nggak kelihatan datar
          const vec3 LIGHT = normalize(vec3(0.75, 0.55, 0.35));

          void main() {
            vec3 n = normalize(vNormal);
            vec3 p = normalize(vPos);

            float h = fbm(p * 2.6 + vec3(0.0, uTime * 0.004, 0.0));
            float band = fbm(p * 6.0 + vec3(0.0, uTime * 0.02, 0.0));

            // pita atmosfer horizontal, khas planet gas
            float lat = sin(p.y * 7.0 + h * 2.6);
            vec3 albedo = uBase;
            albedo = mix(albedo, uWarm * 0.85, smoothstep(0.15, 0.75, lat * 0.5 + 0.5) * 0.42);
            albedo = mix(albedo, uCold * 0.55, smoothstep(0.6, 0.05, lat * 0.5 + 0.5) * 0.28);
            albedo += vec3(band * 0.045);

            float diff = clamp(dot(n, LIGHT), 0.0, 1.0);
            // terminator lembut
            float lit = smoothstep(-0.28, 0.52, dot(n, LIGHT));
            vec3 color = albedo * (0.16 + lit * 0.92) * (0.75 + diff * 0.4);

            // rim light yang nempel ke tepi siluet
            float fres = pow(1.0 - clamp(dot(n, vView), 0.0, 1.0), 3.1);
            color += uRim * fres * (0.35 + lit * 0.9);

            gl_FragColor = vec4(color, 1.0);
          }
        `,
      }),
    [surface, warmA, coldA, rim],
  );

  const atmoMat = useMemo(
    () =>
      new THREE.ShaderMaterial({
        transparent: true,
        depthWrite: false,
        side: THREE.BackSide,
        blending: THREE.AdditiveBlending,
        uniforms: { uColor: { value: new THREE.Color("#ffa04d") } },
        vertexShader: /* glsl */ `
          varying vec3 vNormal;
          varying vec3 vView;
          void main() {
            vNormal = normalize(normalMatrix * normal);
            vec4 mv = modelViewMatrix * vec4(position, 1.0);
            vView = normalize(-mv.xyz);
            gl_Position = projectionMatrix * mv;
          }
        `,
        fragmentShader: /* glsl */ `
          uniform vec3 uColor;
          varying vec3 vNormal;
          varying vec3 vView;
          void main() {
            float edge = pow(clamp(1.0 - dot(normalize(vNormal), vView), 0.0, 1.0), 2.4);
            gl_FragColor = vec4(uColor, edge * 0.42);
          }
        `,
      }),
    [],
  );

  useFrame((_, dt) => {
    planetMat.uniforms.uTime.value += dt;
    if (group.current) group.current.rotation.y += dt * spin;
  });

  return (
    <group ref={group} position={position} rotation={[0.22, 0, -0.18]}>
      <mesh material={planetMat}>
        <sphereGeometry args={[radius, 72, 48]} />
      </mesh>
      {/* selubung atmosfer, sedikit lebih besar */}
      <mesh material={atmoMat} scale={1.045}>
        <sphereGeometry args={[radius, 48, 32]} />
      </mesh>
    </group>
  );
}
