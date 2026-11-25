import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/** Rp 1.500.000 — sengaja tanpa desimal, biar tidak ada "Rp 1.500.000,00" */
export function formatIDR(value: number) {
  if (!value) return "—";
  return "Rp " + new Intl.NumberFormat("id-ID").format(value);
}

/** Rp 1,5jt / Rp 250rb — buat chip kecil dan ringkasan checkout */
export function formatIDRShort(value: number) {
  if (!value) return "—";
  if (value >= 1_000_000) {
    const jt = value / 1_000_000;
    return `Rp ${Number.isInteger(jt) ? jt : jt.toFixed(1).replace(".", ",")}jt`;
  }
  if (value >= 1_000) return `Rp ${Math.round(value / 1_000)}rb`;
  return `Rp ${value}`;
}

export function slugify(input: string) {
  return input
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[^\w\s-]/g, "")
    .trim()
    .replace(/[\s_]+/g, "-")
    .replace(/-+/g, "-")
    .slice(0, 64);
}

/**
 * Kode order yang gampang dibacakan lewat WA/telepon.
 * Format: WDD-<YYMMDD>-<4 huruf acak tanpa karakter ambigu>
 */
const SAFE = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789"; // tanpa I O 0 1
export function makeOrderCode(now = new Date()) {
  const y = String(now.getFullYear()).slice(2);
  const m = String(now.getMonth() + 1).padStart(2, "0");
  const d = String(now.getDate()).padStart(2, "0");
  let rand = "";
  const buf = new Uint8Array(4);
  if (typeof crypto !== "undefined" && crypto.getRandomValues) crypto.getRandomValues(buf);
  else for (let i = 0; i < 4; i++) buf[i] = Math.floor(Math.random() * 256);
  for (let i = 0; i < 4; i++) rand += SAFE[buf[i] % SAFE.length];
  return `WDD-${y}${m}${d}-${rand}`;
}

/** Biar nomor rekening gampang dibaca: 1234567890 -> 1234 5678 90 */
export function groupDigits(value: string, size = 4) {
  const clean = value.replace(/\s+/g, "");
  if (clean.length < 8) return clean;
  const parts: string[] = [];
  for (let i = 0; i < clean.length; i += size) parts.push(clean.slice(i, i + size));
  return parts.join(" ");
}

export function isEmail(v: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.trim());
}

/** Angka Indonesia: 08xx / +628xx / 628xx -> format wa.me */
export function toWaNumber(v: string) {
  const digits = v.replace(/\D/g, "");
  if (digits.startsWith("62")) return digits;
  if (digits.startsWith("0")) return "62" + digits.slice(1);
  if (digits.startsWith("8")) return "62" + digits;
  return digits;
}

export function copyToClipboard(text: string) {
  if (typeof navigator === "undefined") return Promise.resolve(false);
  if (navigator.clipboard?.writeText) {
    return navigator.clipboard.writeText(text).then(
      () => true,
      () => false,
    );
  }
  try {
    const ta = document.createElement("textarea");
    ta.value = text;
    ta.setAttribute("readonly", "");
    ta.style.position = "fixed";
    ta.style.opacity = "0";
    document.body.appendChild(ta);
    ta.select();
    const ok = document.execCommand("copy");
    document.body.removeChild(ta);
    return Promise.resolve(ok);
  } catch {
    return Promise.resolve(false);
  }
}

/** Open a destination in a new tab without navigating the current checkout page. */
export function openExternalPreservingScroll(url: string) {
  if (typeof window === "undefined" || !url) return;
  const left = window.scrollX;
  const top = window.scrollY;
  try {
    window.sessionStorage.setItem(
      `wddfach.scroll.${window.location.pathname}`,
      JSON.stringify({ left, top, savedAt: Date.now() }),
    );
  } catch {}
  const popup = window.open(url, "_blank", "noopener,noreferrer");

  // If a browser blocks window.open, use a temporary target=_blank anchor.
  // Never assign window.location: that would reload checkout and reset scroll.
  if (!popup) {
    const link = document.createElement("a");
    link.href = url;
    link.target = "_blank";
    link.rel = "noopener noreferrer";
    link.style.display = "none";
    document.body.appendChild(link);
    link.click();
    link.remove();
  }

  const restore = () => window.scrollTo({ left, top, behavior: "auto" });
  requestAnimationFrame(restore);
  window.setTimeout(restore, 120);
  window.setTimeout(restore, 500);
}
