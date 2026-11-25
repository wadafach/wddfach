"use client";

import Link from "next/link";

import { t } from "@/lib/i18n";
import { useSettings } from "@/lib/store";
import type { Work } from "@/lib/types";
import { Reveal } from "@/components/ui/Reveal";
import { Chip } from "@/components/ui/bits";
import { Placeholder } from "@/components/site/WorkCard";
import { publicAsset } from "@/lib/paths";

/**
 * Halaman detail karya.
 *
 * Komposisi: satu kolom baca yang sempit (maks ~68ch) untuk teks, dan
 * gambar besar di luar kolom itu. Ini yang bikin halaman terasa seperti
 * studi kasus, bukan halaman produk.
 */
export function WorkDetail({ work }: { work: Work }) {
  const locale = useSettings((s) => s.locale);
  const hasCover = Boolean(work.cover) && !work.cover.includes("placeholder");
  const body = work.body?.[locale] ?? work.summary[locale];

  return (
    <article className="pb-6">
      {/* kepala */}
      <header className="shell pt-12 sm:pt-16">
        <Reveal>
          <Link
            href="/work"
            className="inline-flex items-center gap-2 font-mono text-[10.5px] uppercase tracking-[0.18em] text-ink-mute transition-colors hover:text-ember"
          >
            <span aria-hidden>←</span> {t("nav.work", locale)}
          </Link>

          <div className="mt-8 flex flex-wrap items-center gap-2.5">
            <Chip active>{t(`work.${work.category}` as "work.uiux", locale)}</Chip>
            <span className="font-mono text-[10.5px] uppercase tracking-widest text-ink-mute">
              {work.year}
            </span>
          </div>

          <h1 className="mt-5 max-w-3xl text-[2rem] font-semibold leading-[1.1] sm:text-[2.8rem]">
            {work.title[locale]}
          </h1>
          <p className="mt-5 max-w-2xl text-[16px] leading-relaxed text-ink-soft">
            {work.summary[locale]}
          </p>
        </Reveal>
      </header>

      {/* gambar utama */}
      <Reveal delay={80}>
        <div className="shell mt-12">
          <div className="relative overflow-hidden rounded-2xl border border-line">
            {hasCover ? (
              /* eslint-disable-next-line @next/next/no-img-element */
              <img
                src={publicAsset(work.cover)}
                alt={work.title[locale]}
                className="aspect-[16/9] w-full object-cover"
                decoding="async"
              />
            ) : (
              <Placeholder className="aspect-[16/9] w-full" label="belum ada gambar utama" />
            )}
          </div>
        </div>
      </Reveal>

      {/* isi + sidebar metadata */}
      <div className="shell mt-14 grid gap-12 lg:grid-cols-[1fr_15rem] lg:gap-16">
        <div className="max-w-[68ch]">
          {body.split("\n\n").map((para, i) => (
            <p key={i} className="mb-5 text-[15.5px] leading-[1.85] text-ink-soft">
              {para}
            </p>
          ))}

          {work.gallery && work.gallery.length > 0 && (
            <div className="mt-10 grid gap-4 sm:grid-cols-2">
              {work.gallery.map((src, i) => (
                <div key={i} className="overflow-hidden rounded-xl border border-line">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={publicAsset(src)}
                    alt={`${work.title[locale]} — ${i + 1}`}
                    loading="lazy"
                    decoding="async"
                    className="w-full object-cover"
                  />
                </div>
              ))}
            </div>
          )}

          {work.model && (
            <div className="mt-10">
              <p className="eyebrow mb-3">{t("work.model3d", locale)}</p>
              <div className="grid place-items-center rounded-2xl border border-dashed border-line bg-surface/40 py-16">
                <p className="font-mono text-[11px] text-ink-mute">
                  file model tersedia: {work.model}
                </p>
              </div>
            </div>
          )}
        </div>

        {/* metadata */}
        <aside className="lg:sticky lg:top-24 lg:self-start">
          <dl className="divide-y divide-line-soft border-y border-line-soft">
            <MetaRow k={t("work.role", locale)} v={work.tools?.join(" · ") ?? "—"} />
            <MetaRow k={t("work.year", locale)} v={String(work.year)} />
            {work.client && <MetaRow k={locale === "id" ? "Klien" : "Client"} v={work.client} />}
            {work.tags.length > 0 && (
              <div className="py-4">
                <dt className="font-mono text-[10px] uppercase tracking-[0.18em] text-ink-mute">
                  Tags
                </dt>
                <dd className="mt-2.5 flex flex-wrap gap-1.5">
                  {work.tags.map((tag) => (
                    <Chip key={tag}>{tag}</Chip>
                  ))}
                </dd>
              </div>
            )}
          </dl>

          <Link
            href="/contact"
            className="mt-6 flex h-11 w-full items-center justify-center rounded-full bg-ember text-sm font-semibold text-[#12100c] transition-colors hover:bg-ember-soft"
          >
            {t("cta.hire", locale)}
          </Link>
        </aside>
      </div>
    </article>
  );
}

function MetaRow({ k, v }: { k: string; v: string }) {
  return (
    <div className="py-4">
      <dt className="font-mono text-[10px] uppercase tracking-[0.18em] text-ink-mute">{k}</dt>
      <dd className="mt-1.5 text-[13.5px] leading-relaxed text-ink-soft">{v}</dd>
    </div>
  );
}
