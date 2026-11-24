"use client";

import { useEffect } from "react";

/**
 * Dev-only probe. Dipakai buat verifikasi otomatis (DOM tetap stabil
 * walau isi halaman berubah). Tidak merender apa pun.
 */
export function Probe() {
  useEffect(() => {
    if (process.env.NODE_ENV !== "development") return;
    // sinyal siap untuk skrip QA
    (window as unknown as { __wddReady?: boolean }).__wddReady = true;
  }, []);
  return null;
}
