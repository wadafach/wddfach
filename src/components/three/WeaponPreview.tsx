"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { ContactShadows, Environment, OrbitControls, Sparkles } from "@react-three/drei";
import { Suspense, useRef } from "react";
import * as THREE from "three";

/**
 * Interpretasi 3D low-poly dari sketch weapon user:
 * long asymmetrical blade, eye socket, bronze guard, dark grip.
 * Ini bukan konversi otomatis dari gambar menjadi GLB; semua geometri
 * dibuat prosedural agar preview bisa langsung interaktif tanpa asset 3D.
 */
function WeaponModel() {
  const root = useRef<THREE.Group>(null);
  const eye = useRef<THREE.Mesh>(null);

  useFrame((state, dt) => {
    if (root.current) {
      root.current.rotation.y += dt * 0.12;
      root.current.position.y = Math.sin(state.clock.elapsedTime * 0.7) * 0.06;
    }
    if (eye.current) {
      const s = 1 + Math.sin(state.clock.elapsedTime * 2.4) * 0.08;
      eye.current.scale.setScalar(s);
    }
  });

  return (
    <group ref={root} rotation={[0.12, -0.35, -0.18]} scale={1.05}>
      {/* blade body */}
      <mesh position={[0, 1.7, 0]} rotation={[0, 0, 0.04]} castShadow>
        <coneGeometry args={[0.72, 4.6, 6]} />
        <meshStandardMaterial color="#69758d" metalness={0.82} roughness={0.25} />
      </mesh>
      {/* dark inset channel */}
      <mesh position={[0, 1.92, -0.37]} scale={[0.48, 1.65, 0.08]} rotation={[0, 0, -0.1]}>
        <octahedronGeometry args={[1, 1]} />
        <meshStandardMaterial color="#171d2c" metalness={0.55} roughness={0.4} />
      </mesh>
      {/* red energy line */}
      <mesh position={[0.04, 2.2, 0.39]} scale={[0.045, 1.55, 0.025]}>
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial color="#ff554e" emissive="#ff221c" emissiveIntensity={2.5} />
      </mesh>
      {/* eye socket */}
      <mesh ref={eye} position={[0.04, 0.18, 0.58]}>
        <sphereGeometry args={[0.31, 20, 12]} />
        <meshStandardMaterial color="#d64545" emissive="#8a1717" emissiveIntensity={1.5} />
      </mesh>
      <mesh position={[0.04, 0.18, 0.86]}>
        <sphereGeometry args={[0.14, 20, 12]} />
        <meshStandardMaterial color="#7ed9ff" emissive="#159be0" emissiveIntensity={2.3} />
      </mesh>
      <mesh position={[0.04, 0.18, 0.98]}>
        <sphereGeometry args={[0.045, 12, 8]} />
        <meshStandardMaterial color="#07101c" />
      </mesh>
      {/* bronze guard */}
      <mesh position={[0, -0.28, 0]} rotation={[0, 0, Math.PI / 2]} castShadow>
        <torusGeometry args={[0.78, 0.12, 8, 24, Math.PI]} />
        <meshStandardMaterial color="#b77b42" metalness={0.78} roughness={0.3} />
      </mesh>
      <mesh position={[-0.78, -0.3, 0]} rotation={[0, 0, -0.25]}>
        <coneGeometry args={[0.16, 0.8, 5]} />
        <meshStandardMaterial color="#d39a58" metalness={0.7} roughness={0.32} />
      </mesh>
      <mesh position={[0.78, -0.3, 0]} rotation={[0, 0, 0.25]}>
        <coneGeometry args={[0.16, 0.8, 5]} />
        <meshStandardMaterial color="#d39a58" metalness={0.7} roughness={0.32} />
      </mesh>
      {/* grip and pommel */}
      <mesh position={[0, -1.08, 0]} rotation={[0, 0, 0.02]}>
        <cylinderGeometry args={[0.24, 0.3, 1.35, 8]} />
        <meshStandardMaterial color="#17151b" metalness={0.25} roughness={0.82} />
      </mesh>
      <mesh position={[0, -1.78, 0]}>
        <icosahedronGeometry args={[0.35, 1]} />
        <meshStandardMaterial color="#a96e3c" metalness={0.7} roughness={0.3} />
      </mesh>
    </group>
  );
}

export function WeaponPreview() {
  return (
    <div className="relative h-[430px] overflow-hidden rounded-2xl border border-line bg-[#080b14]">
      <Canvas camera={{ position: [0.3, 0.3, 7.2], fov: 38 }} dpr={[1, 1.7]} gl={{ antialias: true, alpha: true }}>
        <color attach="background" args={["#080b14"]} />
        <ambientLight intensity={0.5} />
        <spotLight position={[3, 5, 5]} intensity={85} angle={0.3} penumbra={0.8} color="#ffd5aa" castShadow />
        <pointLight position={[-3, 1, 2]} intensity={18} color="#45d6e8" />
        <pointLight position={[2, -2, 1]} intensity={15} color="#ff554e" />
        <Suspense fallback={null}>
          <WeaponModel />
          <Sparkles count={36} scale={[4, 5, 3]} size={1.4} speed={0.28} color="#8bdfff" />
          <Environment preset="city" environmentIntensity={0.28} />
          <ContactShadows position={[0, -2.2, 0]} opacity={0.45} scale={5} blur={2.5} far={4} />
        </Suspense>
        <OrbitControls enablePan={false} minDistance={4.5} maxDistance={10} autoRotate autoRotateSpeed={0.45} />
      </Canvas>
      <div className="pointer-events-none absolute bottom-4 left-4 font-mono text-[10px] uppercase tracking-[0.16em] text-ink-mute">
        Drag untuk rotate · scroll untuk zoom
      </div>
      <div className="pointer-events-none absolute right-4 top-4 rounded-full border border-ember/40 bg-void/60 px-2.5 py-1 font-mono text-[10px] uppercase tracking-widest text-ember backdrop-blur">
        3D preview
      </div>
    </div>
  );
}
