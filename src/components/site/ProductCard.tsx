"use client";

import Link from "next/link";

import { t } from "@/lib/i18n";
import { useSettings } from "@/lib/store";
import type { Product } from "@/lib/types";
import { cn, formatIDR } from "@/lib/utils";
import { AddToCart } from "@/components/layout/CartDrawer";
import { Placeholder } from "./WorkCard";

/**
 * Kartu jasa/produk.
 *
 * Catatan komposisi: ini surface "Compare" — harga, satuan, dan
 * estimasi harus sejajar antar kartu supaya bisa dibandingkan sekali lihat.
 * Karena itu bagian harga selalu di baris yang sama (mt-auto).
 */
export function ProductCard({ product, index = 0 }: { product: Product; index?: number }) {
  const locale = useSettings((s) => s.locale);
  const isService = product.kind === "service";
  const hasImage = Boolean(product.cover) && !product.cover?.includes("placeholder");

  return (
    <article className="group flex flex-col overflow-hidden rounded-2xl border border-line bg-surface/40 transition-colors hover:border-ink-mute/60">
      <div className="relative aspect-[16/9] overflow-hidden">
        {hasImage ? (
          /* eslint-disable-next-line @next/next/no-img-element */
          <img
            src={product.cover}
            alt={product.title[locale]}
            loading={index < 3 ? "eager" : "lazy"}
            decoding="async"
            className="size-full object-cover transition-transform duration-[900ms] ease-[cubic-bezier(.16,1,.3,1)] group-hover:scale-[1.045]"
          />
        ) : (
          <Placeholder className="size-full" label={isService ? "jasa" : "produk digital"} />
        )}
        <span
          className={cn(
            "absolute left-3 top-3 rounded-full border px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.14em] backdrop-blur",
            isService
              ? "border-ion/40 bg-void/70 text-ion"
              : "border-plasma/40 bg-void/70 text-plasma",
          )}
        >
          {t(isService ? "svc.service" : "svc.digital", locale)}
        </span>
      </div>

      <div className="flex flex-1 flex-col p-4">
        <h3 className="text-[15px] font-semibold leading-snug">
          <Link href={`/services#${product.slug}`} className="transition-colors hover:text-ember">
            {product.title[locale]}
          </Link>
        </h3>
        <p className="mt-2 text-[13px] leading-relaxed text-ink-soft">{product.summary[locale]}</p>

        {product.turnaround && (
          <p className="mt-3 font-mono text-[10.5px] uppercase tracking-widest text-ink-mute">
            {t("svc.turnaround", locale)} · {product.turnaround[locale]}
          </p>
        )}

        {/* baris harga: selalu nempel di bawah, biar sejajar antar kartu */}
        <div className="mt-auto flex items-end justify-between gap-3 pt-5">
          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-ink-mute">
              {product.price ? t("svc.from", locale) : ""}
            </p>
            <p className="font-display text-lg font-semibold leading-tight">
              {product.price ? formatIDR(product.price) : t("svc.askPrice", locale)}
            </p>
            {product.unit && (
              <p className="font-mono text-[10.5px] text-ink-mute">{product.unit[locale]}</p>
            )}
          </div>
          <AddToCart product={product} size="sm" />
        </div>
      </div>
    </article>
  );
}

/** Baris jasa/produk untuk halaman daftar (lebih rapat, lebih padat info). */
export function ProductRow({ product, index = 0 }: { product: Product; index?: number }) {
  const locale = useSettings((s) => s.locale);
  const isService = product.kind === "service";

  return (
    <article
      id={product.slug}
      className="scroll-mt-24 border-t border-line-soft py-8 first:border-0 first:pt-0"
    >
      <div className="grid gap-6 lg:grid-cols-[1.6fr_1fr]">
        <div>
          <div className="flex flex-wrap items-center gap-2.5">
            <span
              className={cn(
                "rounded-full border px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.14em]",
                isService ? "border-ion/40 text-ion" : "border-plasma/40 text-plasma",
              )}
            >
              {t(isService ? "svc.service" : "svc.digital", locale)}
            </span>
            {product.turnaround && (
              <span className="font-mono text-[10.5px] uppercase tracking-widest text-ink-mute">
                {product.turnaround[locale]}
              </span>
            )}
          </div>

          <h3 className="mt-3 text-xl font-semibold">{product.title[locale]}</h3>
          <p className="mt-2 max-w-2xl text-[14px] leading-relaxed text-ink-soft">
            {product.summary[locale]}
          </p>

          {product.detail && (
            <div className="mt-4 max-w-2xl space-y-3">
              {product.detail[locale].split("\n\n").map((para, i) => (
                <p key={i} className="text-[13.5px] leading-relaxed text-ink-soft/90">
                  {para}
                </p>
              ))}
            </div>
          )}

          {product.deliverables[locale].length > 0 && (
            <div className="mt-6">
              <p className="eyebrow mb-3">{t("svc.deliverables", locale)}</p>
              <ul className="grid gap-2 sm:grid-cols-2">
                {product.deliverables[locale].map((d) => (
                  <li key={d} className="flex gap-2.5 text-[13px] leading-relaxed text-ink-soft">
                    <span className="mt-[7px] size-1 shrink-0 rounded-full bg-ember/70" />
                    {d}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        <div className="lg:sticky lg:top-24 lg:self-start">
          <div className="rounded-2xl border border-line bg-surface/50 p-5">
            <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-ink-mute">
              {product.price ? t("svc.from", locale) : ""}
            </p>
            <p className="mt-1 font-display text-2xl font-semibold">
              {product.price ? formatIDR(product.price) : t("svc.askPrice", locale)}
            </p>
            {product.unit && (
              <p className="mt-0.5 font-mono text-[11px] text-ink-mute">{product.unit[locale]}</p>
            )}
            <div className="mt-5">
              <AddToCart product={product} full />
            </div>
            <p className="mt-3 text-[11.5px] leading-relaxed text-ink-mute">
              {t("cart.note", locale)}
            </p>
          </div>
        </div>
      </div>
    </article>
  );
}
