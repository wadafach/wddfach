"use client";

import { Suspense, useMemo, useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { AdaptiveDpr, Preload } from "@react-three/drei";

import { Starfield } from "./Starfield";
import { MeteorShower } from "./MeteorShower";
import { Planet } from "./Planet";
import { HeroArtifact } from "./HeroArtifact";

function isWebGLAvailable() {
  if (typeof window === "undefined") return false;
  try {
    const c = document.createElement("canvas");
    return !!(c.getContext("webgl2") || c.getContext("webgl"));
  } catch {
    return false;
  }
}

/**
 * Kamera mengikuti scroll, tapi dengan damping.
 * Gerakannya lebih lambat dari scroll asli supaya terasa punya massa,
 * bukan menempel kaku di dokumen. Ini yang bikin latar terasa "ruang",
 * bukan wallpaper.
 */
function ScrollCamera({ amount = 1 }: { amount?: number }) {
  const { camera } = useThree();
  const goal = useRef({ y: 0, z: 18 });

  useFrame((_, dt) => {
    const max = document.documentElement.scrollHeight - window.innerHeight;
    const p = max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0;
    goal.current.y = -p * 2.8 * amount;
    goal.current.z = 18 + p * 3.4 * amount;

    // frame-rate independent lerp
    const k = 1 - Math.pow(0.0015, Math.min(dt, 0.1));
    camera.position.y += (goal.current.y - camera.position.y) * k;
    camera.position.z += (goal.current.z - camera.position.z) * k;
    camera.position.x += (0 - camera.position.x) * k;
    camera.lookAt(0, camera.position.y * 0.3, 0);
  });

  return null;
}

export interface CosmicSceneProps {
  /** "full" | "reduced" — "off" tidak sampai ke sini */
  level: "full" | "reduced";
  /** false = render loop benar-benar berhenti (canvas di luar viewport / tab hidden) */
  active?: boolean;
  planet?: boolean;
  artifact?: boolean;
  /** kekuatan hujan meteor, 0 = mati */
  meteor?: number;
  parallax?: boolean;
  className?: string;
}

export default function CosmicScene({
  level,
  active = true,
  planet = false,
  artifact = false,
  meteor = 1,
  parallax = true,
  className,
}: CosmicSceneProps) {
  const webgl = useMemo(isWebGLAvailable, []);
  const reduced = level === "reduced";

  if (!webgl) return null;

  return (
    <div className={className} aria-hidden="true">
      <Canvas
        // Ganti frameloop lewat prop: "never" benar-benar menghentikan rAF,
        // jadi canvas di luar viewport / tab hidden tidak menghabiskan baterai.
        frameloop={active ? "always" : "never"}
        dpr={reduced ? [1, 1.35] : [1, 2]}
        camera={{ position: [0, 0, 18], fov: reduced ? 58 : 50, near: 0.1, far: 220 }}
        gl={{
          antialias: !reduced,
          alpha: true,
          powerPreference: "high-performance",
          stencil: false,
        }}
        style={{ pointerEvents: artifact ? "auto" : "none" }}
      >
        <color attach="background" args={["#04050a"]} />
        <fog attach="fog" args={["#04050a", 26, 88]} />

        <ambientLight intensity={0.34} />
        {/* matahari kanan-atas — searah dengan LIGHT di shader planet */}
        <directionalLight position={[9, 6, 5]} intensity={1.5} color="#ffd2a1" />
        <directionalLight position={[-8, -3, -6]} intensity={0.42} color="#6fb9ff" />
        <pointLight position={[0, 0, 0]} intensity={reduced ? 2 : 6} distance={9} color="#ff9a3c" />

        <Suspense fallback={null}>
          <Starfield count={reduced ? 1300 : 3200} animate={!reduced} />
          {meteor > 0 && <MeteorShower count={reduced ? 6 : 16} intensity={meteor} />}
          {artifact && <HeroArtifact intensity={active ? 1 : 0.2} />}
          {planet && (
            <>
              <Planet radius={3.4} position={[13.8, 3.6, -12]} />
              {!reduced && <Planet radius={0.9} position={[-12.4, -5.2, -6]} spin={0.05} />}
            </>
          )}
          <Preload all />
        </Suspense>

        {parallax && active && <ScrollCamera amount={reduced ? 0.6 : 1} />}
        {!reduced && <AdaptiveDpr pixelated={false} />}
      </Canvas>
    </div>
  );
}
