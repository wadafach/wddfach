"use client";

import Link from "next/link";

import { socials } from "@/lib/site";
import { t } from "@/lib/i18n";
import { useSettings } from "@/lib/store";
import { Reveal } from "@/components/ui/Reveal";

export function HomeCta() {
  const locale = useSettings((s) => s.locale);

  return (
    <section className="shell py-20 sm:py-28">
      <Reveal>
        <div className="relative overflow-hidden rounded-3xl border border-line bg-surface/40 px-6 py-14 sm:px-12 sm:py-16">
          {/* pendar lembut, bukan gradasi menyala di seluruh blok */}
          <div
            className="pointer-events-none absolute -right-20 -top-24 size-72 rounded-full opacity-40 blur-3xl"
            style={{ background: "radial-gradient(circle, #ff7a18aa, transparent 70%)" }}
            aria-hidden
          />
          <div
            className="pointer-events-none absolute -bottom-28 -left-16 size-64 rounded-full opacity-30 blur-3xl"
            style={{ background: "radial-gradient(circle, #45d6e8aa, transparent 70%)" }}
            aria-hidden
          />

          <div className="relative max-w-2xl">
            <p className="eyebrow mb-4">{t("nav.contact", locale)}</p>
            <h2 className="text-[1.7rem] font-semibold leading-tight sm:text-[2.4rem]">
              {t("home.cta.title", locale)}
            </h2>
            <p className="mt-4 text-[15px] leading-relaxed text-ink-soft">{t("home.cta.sub", locale)}</p>

            <div className="mt-9 flex flex-wrap gap-3">
              <Link
                href="/contact"
                className="inline-flex h-12 items-center gap-2 rounded-full bg-ember px-6 text-sm font-semibold text-[#12100c] transition-[background-color,transform] hover:bg-ember-soft active:scale-[0.97]"
              >
                {t("cta.hire", locale)}
                <span aria-hidden>→</span>
              </Link>
              <a
                href={socials.whatsapp || "#"}
                target="_blank"
                rel="noreferrer noopener"
                className="inline-flex h-12 items-center rounded-full border border-line px-6 text-sm font-semibold text-ink-soft transition-colors hover:border-ink-mute hover:text-ink"
              >
                WhatsApp
              </a>
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
