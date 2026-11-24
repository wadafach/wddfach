"use client";

import Link from "next/link";

import { t } from "@/lib/i18n";
import { useSettings } from "@/lib/store";
import type { Locale, Work, WorkCategory } from "@/lib/types";
import { cn } from "@/lib/utils";

/** Placeholder bergaris: jujur bahwa gambarnya belum ada, bukan gambar palsu. */
export function Placeholder({ className, label }: { className?: string; label?: string }) {
  return (
    <div
      className={cn(
        "relative grid place-items-center overflow-hidden bg-surface-2",
        className,
      )}
    >
      <div
        className="absolute inset-0 opacity-[0.16]"
        style={{
          backgroundImage:
            "repeating-linear-gradient(45deg, #ffffff10 0 1px, transparent 1px 11px)",
        }}
      />
      <span className="relative font-mono text-[10px] uppercase tracking-[0.2em] text-ink-mute">
        {label ?? "belum ada gambar"}
      </span>
    </div>
  );
}

/**
 * Kartu karya.
 * Gambar ditampilkan sebagai <img> biasa (bukan next/image) karena di sini
 * isinya sering masih placeholder/data-URI hasil admin. Ganti ke next/image
 * begitu semua gambarnya sudah ada di /public.
 */
export function WorkCard({ work, index = 0 }: { work: Work; index?: number }) {
  const locale = useSettings((s) => s.locale);
  const hasImage = Boolean(work.cover) && !work.cover.includes("placeholder");

  return (
    <Link
      href={`/work/${work.slug}`}
      className="group relative flex flex-col overflow-hidden rounded-2xl border border-line bg-surface/40 transition-[border-color,transform] duration-300 hover:border-ink-mute/60 focus-visible:border-ember"
    >
      <div className="relative aspect-[4/3] overflow-hidden">
        {hasImage ? (
          /* eslint-disable-next-line @next/next/no-img-element */
          <img
            src={work.cover}
            alt={work.title[locale]}
            loading={index < 3 ? "eager" : "lazy"}
            decoding="async"
            className="size-full object-cover transition-transform duration-[900ms] ease-[cubic-bezier(.16,1,.3,1)] group-hover:scale-[1.045]"
          />
        ) : (
          <Placeholder className="size-full" />
        )}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-void/85 via-void/10 to-transparent" />
        <span className="absolute left-3 top-3 rounded-full border border-line bg-void/70 px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.14em] text-ink-soft backdrop-blur">
          {t(`work.${work.category}` as "work.uiux", locale)}
        </span>
      </div>

      <div className="flex flex-1 flex-col p-4">
        <h3 className="text-[15px] font-semibold leading-snug transition-colors group-hover:text-ember">
          {work.title[locale]}
        </h3>
        <p className="mt-2 line-clamp-2 text-[13px] leading-relaxed text-ink-soft">
          {work.summary[locale]}
        </p>
        <div className="mt-4 flex items-center justify-between pt-1">
          <span className="font-mono text-[10.5px] text-ink-mute">{work.year}</span>
          <span className="font-mono text-[10.5px] uppercase tracking-widest text-ember opacity-0 transition-opacity group-hover:opacity-100">
            {t("cta.detail", locale)} →
          </span>
        </div>
      </div>
    </Link>
  );
}

/** Grid karya dengan tab kategori. */
export function WorkGrid({
  works,
  filter,
  className,
}: {
  works: Work[];
  filter?: WorkCategory | "all";
  className?: string;
}) {
  const locale = useSettings((s) => s.locale);
  const list = filter && filter !== "all" ? works.filter((w) => w.category === filter) : works;

  if (list.length === 0) {
    return <p className="py-16 text-center text-[14px] text-ink-mute">{t("work.empty", locale)}</p>;
  }

  return (
    <div className={cn("grid gap-5 sm:grid-cols-2 lg:grid-cols-3", className)}>
      {list.map((w, i) => (
        <WorkCard key={w.slug} work={w} index={i} />
      ))}
    </div>
  );
}

export const categoryLabel = (c: WorkCategory, locale: Locale) =>
  t(`work.${c}` as "work.uiux", locale);
