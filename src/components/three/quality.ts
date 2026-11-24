"use client";

import { useEffect, useState } from "react";

export interface Quality {
  /** apakah WebGL tersedia sama sekali */
  webgl: boolean;
  /** perkiraan perangkat kelas bawah (HP murah, RAM kecil) */
  lowTier: boolean;
  /** perangkat sentuh */
  touch: boolean;
  /** jumlah core CPU */
  cores: number;
  /** devicePixelRatio dibatasi */
  dpr: [number, number];
  ready: boolean;
}

const initial: Quality = {
  webgl: true,
  lowTier: false,
  touch: false,
  cores: 4,
  dpr: [1, 1.75],
  ready: false,
};

export function detectQuality(): Quality {
  if (typeof window === "undefined") return initial;

  let webgl = false;
  let renderer: string | null = null;
  try {
    const canvas = document.createElement("canvas");
    const gl = (canvas.getContext("webgl2") ||
      canvas.getContext("webgl")) as WebGLRenderingContext | null;
    if (gl) {
      webgl = true;
      const dbg = gl.getExtension("WEBGL_debug_renderer_info");
      if (dbg) renderer = String(gl.getParameter(dbg.UNMASKED_RENDERER_WEBGL) ?? "");
      // lepas context biar nggak makan slot
      gl.getExtension("WEBGL_lose_context")?.loseContext();
    }
  } catch {
    webgl = false;
  }

  const nav = navigator as Navigator & { deviceMemory?: number; hardwareConcurrency?: number };
  const cores = nav.hardwareConcurrency ?? 4;
  const mem = nav.deviceMemory ?? 4; // GB, hanya ada di Chromium
  const touch = window.matchMedia("(pointer: coarse)").matches;
  const narrow = window.innerWidth < 720;
  const saveData = (nav as Navigator & { connection?: { saveData?: boolean } }).connection?.saveData === true;

  // Renderer software = pasti lambat.
  const softwareGL = /swiftshader|llvmpipe|software|basic render/i.test(renderer ?? "");

  const lowTier =
    softwareGL ||
    saveData ||
    cores <= 4 ||
    mem <= 4 ||
    (touch && narrow && cores <= 6);

  const maxDpr = lowTier ? 1.5 : 2;

  return {
    webgl,
    lowTier,
    touch,
    cores,
    dpr: [1, Math.min(maxDpr, window.devicePixelRatio || 1)],
    ready: true,
  };
}

/** Deteksi kemampuan perangkat sekali, di client. */
export function useQuality(): Quality {
  const [q, setQ] = useState<Quality>(initial);
  useEffect(() => {
    setQ(detectQuality());
  }, []);
  return q;
}

/** Preferensi sistem: kurangi animasi. */
export function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mq.matches);
    const on = (e: MediaQueryListEvent) => setReduced(e.matches);
    mq.addEventListener("change", on);
    return () => mq.removeEventListener("change", on);
  }, []);
  return reduced;
}

/**
 * Hentikan render loop saat canvas tidak kelihatan.
 * Ini yang bikin halaman nggak nguras baterai saat user scroll ke bawah.
 */
export function useInView<T extends HTMLElement>(
  ref: React.RefObject<T | null>,
  rootMargin = "120px",
) {
  const [inView, setInView] = useState(true);
  useEffect(() => {
    const el = ref.current;
    if (!el || typeof IntersectionObserver === "undefined") return;
    const io = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { rootMargin },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [ref, rootMargin]);
  return inView;
}
