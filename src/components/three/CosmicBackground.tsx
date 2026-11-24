"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";

import { useQuality, usePrefersReducedMotion } from "./quality";
import { useSettings } from "@/lib/store";
import { cn } from "@/lib/utils";

const CosmicScene = dynamic(() => import("./CosmicScene"), { ssr: false });

/**
 * Latar kosmik tingkat halaman.
 *
 * Aturan yang bikin ini nggak nyiksa HP:
 *  1. level "off"            -> WebGL tidak pernah dibangun; pakai gradien CSS.
 *  2. canvas keluar viewport -> render loop berhenti total.
 *  3. tab tidak aktif        -> render loop berhenti total.
 *  4. perangkat kelas bawah  -> otomatis "reduced" walau user pilih "auto".
 *  5. prefers-reduced-motion -> animasi dimatikan.
 *
 * Gradien CSS SELALU dirender di bawah canvas, jadi kalau WebGL gagal
 * sekalipun latarnya tetap kosmik, bukan hitam polos.
 */
export function CosmicBackground({
  /** parallax kamera relatif mahal. halaman checkout matiin ini. */
  parallax = true,
  meteor = 1,
  className,
}: {
  parallax?: boolean;
  meteor?: number;
  className?: string;
}) {
  const settings = useSettings();
  const q = useQuality();
  const sysReduced = usePrefersReducedMotion();
  const holder = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(true);
  const [tabActive, setTabActive] = useState(true);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => setHydrated(true), []);

  useEffect(() => {
    const el = holder.current;
    if (!el || typeof IntersectionObserver === "undefined") return;
    const io = new IntersectionObserver(([e]) => setInView(e.isIntersecting), {
      rootMargin: "160px",
    });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    const on = () => setTabActive(!document.hidden);
    document.addEventListener("visibilitychange", on);
    on();
    return () => document.removeEventListener("visibilitychange", on);
  }, []);

  /**
   * Menentukan level scene.
   *
   * Aturan, berurutan:
   *  1. Pengunjung memilih "Mati"/"Ringan" -> hormati; itu keputusan sadar.
   *  2. Pengunjung memilih "Penuh" -> juga keputusan sadar, jadi boleh
   *     menimpa preferensi sistem. Kalau tidak, orang yang OS-nya menyetel
   *     "reduce motion" tidak akan pernah bisa melihat versi penuh
   *     walau dia sendiri yang memintanya.
   *  3. "Auto" -> tunduk pada sistem dan kemampuan perangkat.
   *
   * `prefers-reduced-motion` menghasilkan "reduced" (bukan "off"): yang
   * dimatikan adalah gerakan — parallax kamera dan meteor — sementara
   * bintangnya tetap ada. Membunuh seluruh scene bukan yang diminta
   * preferensi itu.
   */
  const resolved: "full" | "reduced" | "off" = (() => {
    if (!hydrated || !q.ready) return "off"; // paint pertama tanpa WebGL -> LCP cepat
    if (!q.webgl) return "off";
    if (settings.scene === "off") return "off";
    if (settings.scene === "reduced") return "reduced";
    if (settings.scene === "full") return "full";
    // --- dari sini: mode "auto" ---
    if (sysReduced || settings.reduceMotion) return "reduced";
    return q.lowTier ? "reduced" : "full";
  })();

  /** Gerakan diminimalkan: parallax dan meteor dimatikan, tetap ada bintang. */
  const motionQuiet = sysReduced || settings.reduceMotion;

  const show = resolved !== "off" && inView && tabActive;

  return (
    <div
      ref={holder}
      aria-hidden="true"
      className={cn("pointer-events-none fixed inset-0 -z-10 overflow-hidden", className)}
    >
      <div className="absolute inset-0 cosmic-static" />

      {resolved !== "off" && (
        <SceneMount>
          <CosmicScene
            level={resolved}
            active={show}
            parallax={parallax && !motionQuiet}
            meteor={motionQuiet ? 0 : meteor}
            className={cn(
              "absolute inset-0 transition-opacity duration-700",
              show ? "opacity-100" : "opacity-0",
            )}
          />
        </SceneMount>
      )}

      {/* vignette: menyatukan canvas dengan latar CSS supaya tidak terlihat
          seperti dua lapisan terpisah */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 120% 80% at 50% 40%, transparent 35%, rgba(2,3,7,0.6) 100%)",
        }}
      />
    </div>
  );
}

/** Mount hanya setelah hydration, supaya tidak ada canvas di server render. */
function SceneMount({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  if (!mounted) return null;
  return <>{children}</>;
}
