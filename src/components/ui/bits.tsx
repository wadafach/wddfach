"use client";

import { useEffect, useState } from "react";
import { useSettings } from "@/lib/store";
import { cn } from "@/lib/utils";

/**
 * Baris pengumuman kecil di paling atas. Sengaja tipis dan tidak mengganggu.
 * Ganti teksnya lewat prop, atau hapus komponennya kalau tidak perlu.
 */
export function Announcement({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative z-30 border-b border-line-soft bg-deep/60 backdrop-blur">
      <div className="shell flex items-center justify-center gap-2 py-2 text-center">
        <span className="size-1.5 shrink-0 rounded-full bg-good animate-pulse-soft" />
        <p className="font-mono text-[11px] tracking-wide text-ink-soft">{children}</p>
      </div>
    </div>
  );
}

/** Tombol dengan tiga gaya yang jelas beda fungsinya. */
export function Button({
  as = "button",
  href,
  variant = "primary",
  size = "md",
  className,
  children,
  ...rest
}: {
  as?: "button" | "a";
  href?: string;
  variant?: "primary" | "ghost" | "line";
  size?: "sm" | "md" | "lg";
  className?: string;
  children: React.ReactNode;
} & React.ButtonHTMLAttributes<HTMLButtonElement> &
  React.AnchorHTMLAttributes<HTMLAnchorElement>) {
  const base =
    "inline-flex items-center justify-center gap-2 rounded-full font-semibold whitespace-nowrap transition-[transform,background-color,border-color,color,box-shadow] duration-200 active:scale-[0.97] disabled:pointer-events-none disabled:opacity-40";
  const sizes = {
    sm: "h-9 px-3.5 text-[13px]",
    md: "h-11 px-5 text-sm",
    lg: "h-12 px-6 text-[15px]",
  }[size];
  const variants = {
    primary:
      "bg-ember text-[#12100c] hover:bg-ember-soft shadow-[0_6px_28px_-8px_rgba(255,170,60,0.65)]",
    ghost: "bg-surface-2/70 text-ink hover:bg-surface-3 border border-line",
    line: "border border-line text-ink-soft hover:text-ink hover:border-ink-mute bg-transparent",
  }[variant];

  const cls = cn(base, sizes, variants, className);
  if (as === "a") {
    return (
      <a href={href} className={cls} {...rest}>
        {children}
      </a>
    );
  }
  return (
    <button className={cls} {...rest}>
      {children}
    </button>
  );
}

/** Chip kecil untuk tag/kategori. */
export function Chip({
  children,
  active,
  className,
  onClick,
}: {
  children: React.ReactNode;
  active?: boolean;
  className?: string;
  onClick?: () => void;
}) {
  const Comp = onClick ? "button" : "span";
  return (
    <Comp
      onClick={onClick}
      className={cn(
        "inline-flex items-center rounded-full border px-2.5 py-1 font-mono text-[10.5px] uppercase tracking-[0.12em] transition-colors",
        active
          ? "border-ember/60 bg-ember/12 text-ember"
          : "border-line bg-surface-2/50 text-ink-mute",
        onClick && "hover:border-ink-mute hover:text-ink-soft",
        className,
      )}
    >
      {children}
    </Comp>
  );
}

/** Judul section dengan garis dan label mono. */
export function SectionHead({
  label,
  title,
  sub,
  right,
  className,
}: {
  label: string;
  title: string;
  sub?: string;
  right?: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between", className)}>
      <div className="max-w-2xl">
        <p className="eyebrow mb-3 flex items-center gap-2">
          <span className="h-px w-6 bg-ember/70" />
          {label}
        </p>
        <h2 className="text-2xl font-semibold sm:text-[2rem]">{title}</h2>
        {sub && <p className="mt-3 text-[15px] leading-relaxed text-ink-soft">{sub}</p>}
      </div>
      {right}
    </div>
  );
}

/**
 * Pilih bahasa. Dipakai di header dan panel pengaturan.
 * Sengaja menampilkan dua kode, bukan ikon bendera — bahasa bukan negara.
 */
export function LangSwitch({ compact = false }: { compact?: boolean }) {
  const locale = useSettings((s) => s.locale);
  const setLocale = useSettings((s) => s.setLocale);
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  return (
    <div
      className="inline-flex items-center rounded-full border border-line bg-surface-2/60 p-0.5"
      role="group"
      aria-label="Bahasa / Language"
    >
      {(["id", "en"] as const).map((l) => {
        const on = mounted && locale === l;
        return (
          <button
            key={l}
            onClick={() => setLocale(l)}
            aria-pressed={on}
            className={cn(
              "rounded-full px-2.5 py-1 font-mono text-[10.5px] uppercase tracking-[0.14em] transition-colors",
              on ? "bg-ember text-[#12100c]" : "text-ink-mute hover:text-ink-soft",
            )}
          >
            {compact ? l : l === "id" ? "ID" : "EN"}
          </button>
        );
      })}
    </div>
  );
}
