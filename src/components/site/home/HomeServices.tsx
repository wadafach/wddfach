"use client";

import Link from "next/link";

import { products } from "@/lib/content/products";
import { t } from "@/lib/i18n";
import { useSettings } from "@/lib/store";
import { SectionHead } from "@/components/ui/bits";
import { Reveal } from "@/components/ui/Reveal";
import { ProductCard } from "@/components/site/ProductCard";

export function HomeServices() {
  const locale = useSettings((s) => s.locale);
  const list = products.filter((p) => p.active).slice(0, 4);

  return (
    <section className="shell py-20 sm:py-28">
      <Reveal>
        <SectionHead
          label={t("nav.services", locale)}
          title={locale === "id" ? "Harga jelas, tidak nunggu nego." : "Clear pricing, no haggling."}
          sub={
            locale === "id"
              ? "Angka di bawah ini titik mulai. Kalau proyeknya beda dari yang biasa, kirim brief-nya — aku kasih penawaran."
              : "These numbers are a starting point. If your project is different, send the brief — I'll quote it."
          }
          right={
            <Link
              href="/services"
              className="inline-flex h-10 shrink-0 items-center gap-2 rounded-full border border-line px-5 text-[13px] font-medium text-ink-soft transition-colors hover:border-ink-mute hover:text-ink"
            >
              {t("nav.services", locale)}
              <span aria-hidden>→</span>
            </Link>
          }
        />
      </Reveal>

      <div className="mt-12 grid gap-5 sm:grid-cols-2">
        {list.map((p, i) => (
          <Reveal key={p.slug} delay={i * 70}>
            <ProductCard product={p} index={i} />
          </Reveal>
        ))}
      </div>
    </section>
  );
}
