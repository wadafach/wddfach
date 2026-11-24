"use client";

import Link from "next/link";

import { site } from "@/lib/site";
import { t } from "@/lib/i18n";
import { useSettings } from "@/lib/store";

const tools = ["Figma", "Blender", "Substance", "Procreate", "Photoshop", "Next.js", "Three.js"];

/**
 * Hero.
 *
 * Surface: Decide/Learn — di sini hero memang tepat.
 *
 * Komposisi sengaja tidak center-stack: kolom kiri memuat klaim, kolom
 * kanan adalah panel spesifikasi (bukan tiga kartu fitur). Panel itu
 * meniru lembar data teknis, karena audiensnya orang yang menilai
 * kemampuan berdasarkan hal konkret.
 */
export function HomeHero() {
  const locale = useSettings((s) => s.locale);

  return (
    <section className="relative overflow-hidden pt-14 sm:pt-20 lg:pt-24">
      <div className="shell grid items-start gap-12 pb-16 lg:grid-cols-[1.35fr_1fr] lg:gap-16 lg:pb-24">
        {/* --- kolom kiri: klaim --- */}
        <div className="animate-rise">
          <p className="mb-6 inline-flex items-center gap-2.5 rounded-full border border-good/35 bg-good/8 py-1.5 pl-2.5 pr-4">
            <span className="relative flex size-2">
              <span className="absolute inline-flex size-full animate-ping rounded-full bg-good/60" />
              <span className="relative inline-flex size-2 rounded-full bg-good" />
            </span>
            <span className="font-mono text-[10.5px] uppercase tracking-[0.16em] text-good">
              {t("home.hero.available", locale)}
            </span>
          </p>

          <h1 className="text-[2.15rem] font-semibold leading-[1.06] sm:text-[3.1rem] lg:text-[3.6rem]">
            {locale === "id" ? (
              <>
                Aku bikin antarmuka,
                <br />
                bentuk <span className="text-ember text-glow">3D</span>, dan
                <br />
                konsep senjata.
              </>
            ) : (
              <>
                I build interfaces,
                <br />
                shape <span className="text-ember text-glow">3D</span>, and
                <br />
                design weapons.
              </>
            )}
          </h1>

          <p className="mt-7 max-w-xl text-[15.5px] leading-[1.75] text-ink-soft">
            {locale === "id" ? (
              <>
                Dari wireframe sampai asset siap masuk engine. Sebagian besar kerjaku soal
                hal yang harus <em className="not-italic text-ink">kelihatan benar</em> waktu
                dipakai — bukan cuma bagus di render.
              </>
            ) : (
              <>
                From wireframe to engine-ready assets. Most of my work is about things that have
                to <em className="not-italic text-ink">read correctly</em> in use — not just look
                good in a render.
              </>
            )}
          </p>

          <div className="mt-9 flex flex-wrap items-center gap-3">
            <Link
              href="/work"
              className="inline-flex h-12 items-center gap-2 rounded-full bg-ember px-6 text-sm font-semibold text-[#12100c] shadow-[0_8px_32px_-10px_rgba(255,170,60,0.7)] transition-[background-color,transform] hover:bg-ember-soft active:scale-[0.97]"
            >
              {t("cta.seeWork", locale)}
              <svg viewBox="0 0 24 24" className="size-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h13M13 6l6 6-6 6" />
              </svg>
            </Link>
            <Link
              href="/services"
              className="inline-flex h-12 items-center rounded-full border border-line px-6 text-sm font-semibold text-ink-soft transition-colors hover:border-ink-mute hover:text-ink"
            >
              {t("cta.hire", locale)}
            </Link>
          </div>

          {/* pita tools */}
          <div className="mt-14">
            <p className="eyebrow mb-3">{locale === "id" ? "Alat sehari-hari" : "Daily tools"}</p>
            <div className="flex flex-wrap gap-x-5 gap-y-2">
              {tools.map((tool) => (
                <span key={tool} className="font-mono text-[11.5px] text-ink-mute">
                  {tool}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* --- kolom kanan: panel spesifikasi --- */}
        <aside className="animate-rise lg:pt-2 [animation-delay:140ms]">
          <div className="rounded-2xl border border-line bg-surface/45 backdrop-blur-sm">
            <div className="flex items-center justify-between border-b border-line-soft px-5 py-3.5">
              <span className="font-mono text-[10.5px] uppercase tracking-[0.18em] text-ink-mute">
                {locale === "id" ? "Profil" : "Profile"}
              </span>
              <span className="font-mono text-[10.5px] text-ink-mute">v2026.1</span>
            </div>

            <dl className="divide-y divide-line-soft">
              {[
                {
                  k: locale === "id" ? "Nama" : "Name",
                  v: site.name,
                },
                {
                  k: locale === "id" ? "Bidang" : "Field",
                  v:
                    locale === "id"
                      ? "UI/UX · 3D · Game Art"
                      : "UI/UX · 3D · Game Art",
                },
                {
                  k: locale === "id" ? "Basis" : "Based in",
                  v: site.location[locale],
                },
                {
                  k: locale === "id" ? "Fokus" : "Focus",
                  v:
                    locale === "id"
                      ? "Produk yang kebaca & senjata yang masuk akal"
                      : "Readable products & plausible weapons",
                },
                {
                  k: locale === "id" ? "Status" : "Status",
                  v: locale === "id" ? "Terbuka 2 slot / bulan" : "2 slots open / month",
                },
              ].map((row) => (
                <div key={row.k} className="flex items-baseline gap-4 px-5 py-3.5">
                  <dt className="w-20 shrink-0 font-mono text-[10.5px] uppercase tracking-[0.14em] text-ink-mute">
                    {row.k}
                  </dt>
                  <dd className="text-[13.5px] leading-relaxed text-ink-soft">{row.v}</dd>
                </div>
              ))}
            </dl>

            <div className="border-t border-line-soft px-5 py-4">
              <p className="font-mono text-[10.5px] leading-relaxed text-ink-mute">
                {locale === "id"
                  ? "Tiga disiplin yang saling nyambung: yang aku gambar bisa aku bangun, yang aku bangun bisa aku jelasin ke developer."
                  : "Three disciplines that connect: what I draw I can build, what I build I can hand to a developer."}
              </p>
            </div>
          </div>

          {/* petunjuk scroll */}
          <div className="mt-6 flex items-center gap-3 pl-1">
            <span className="grid size-8 place-items-center rounded-full border border-line">
              <svg viewBox="0 0 24 24" className="size-3.5 animate-bounce text-ember" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 5v14M6 13l6 6 6-6" />
              </svg>
            </span>
            <span className="font-mono text-[10.5px] uppercase tracking-[0.18em] text-ink-mute">
              {t("home.hero.scroll", locale)}
            </span>
          </div>
        </aside>
      </div>
    </section>
  );
}
