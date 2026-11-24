"use client";

import { products } from "@/lib/content/products";
import { t } from "@/lib/i18n";
import { useSettings } from "@/lib/store";
import { Reveal } from "@/components/ui/Reveal";
import { ProductRow } from "@/components/site/ProductCard";

export function ServicesPage() {
  const locale = useSettings((s) => s.locale);
  const services = products.filter((p) => p.active && p.kind === "service");
  const digital = products.filter((p) => p.active && p.kind === "digital");

  return (
    <div className="shell py-14 sm:py-20">
      <Reveal>
        <header className="max-w-2xl">
          <p className="eyebrow mb-3 flex items-center gap-2">
            <span className="h-px w-6 bg-ember/70" />
            {t("nav.services", locale)}
          </p>
          <h1 className="text-[2rem] font-semibold leading-tight sm:text-[2.6rem]">
            {locale === "id" ? "Jasa & Produk." : "Services & Products."}
          </h1>
          <p className="mt-4 text-[15px] leading-relaxed text-ink-soft">
            {locale === "id"
              ? "Harga yang tertera adalah titik mulai. Tambahkan ke pesanan, lalu lanjut ke pembayaran — atau kirim brief dulu kalau proyekmu beda dari yang biasa."
              : "Listed prices are a starting point. Add to your order and continue to payment — or send a brief first if your project is unusual."}
          </p>
        </header>
      </Reveal>

      <section className="mt-16">
        <Reveal>
          <h2 className="font-display text-lg font-semibold">{t("svc.service", locale)}</h2>
          <p className="mt-1.5 max-w-xl text-[13.5px] text-ink-soft">
            {locale === "id"
              ? "Dikerjakan per proyek, ada brief dan revisi."
              : "Worked per project, with a brief and revisions."}
          </p>
        </Reveal>

        <div className="mt-8">
          {services.length === 0 ? (
            <p className="py-10 text-[14px] text-ink-mute">{t("svc.empty", locale)}</p>
          ) : (
            services.map((p) => <ProductRow key={p.slug} product={p} />)
          )}
        </div>
      </section>

      <section className="mt-20">
        <Reveal>
          <h2 className="font-display text-lg font-semibold">{t("svc.digital", locale)}</h2>
          <p className="mt-1.5 max-w-xl text-[13.5px] text-ink-soft">
            {locale === "id"
              ? "File langsung — dikirim setelah pembayaran diverifikasi."
              : "Instant files — delivered once payment is verified."}
          </p>
        </Reveal>

        <div className="mt-8">
          {digital.length === 0 ? (
            <p className="py-10 text-[14px] text-ink-mute">{t("svc.empty", locale)}</p>
          ) : (
            digital.map((p) => <ProductRow key={p.slug} product={p} />)
          )}
        </div>
      </section>
    </div>
  );
}
