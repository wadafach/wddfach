"use client";

import { useState } from "react";

import { site, socials } from "@/lib/site";
import { t } from "@/lib/i18n";
import { useSettings } from "@/lib/store";
import { openExternalPreservingScroll, toWaNumber } from "@/lib/utils";
import { Reveal } from "@/components/ui/Reveal";

/**
 * Kontak.
 *
 * Catatan teknis penting: form ini TIDAK mengirim ke server — tidak ada
 * backend di MVP. Yang dilakukannya adalah menyusun pesan yang rapi lalu
 * membukanya di WhatsApp atau aplikasi email pengguna. Jadi tidak ada
 * data yang hilang diam-diam, dan tidak ada "terima kasih, pesanmu
 * terkirim" palsu.
 */
export function ContactPage() {
  const locale = useSettings((s) => s.locale);
  const [form, setForm] = useState({ name: "", contact: "", need: "", brief: "", budget: "" });

  const set = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
    setForm((f) => ({ ...f, [k]: e.target.value }));

  const message = [
    `${locale === "id" ? "Halo" : "Hi"} ${site.name},`,
    "",
    form.brief.trim() || (locale === "id" ? "(brief menyusul)" : "(brief to follow)"),
    "",
    "—",
    `${locale === "id" ? "Nama" : "Name"}: ${form.name || "-"}`,
    `${locale === "id" ? "Kebutuhan" : "Need"}: ${form.need || "-"}`,
    `${locale === "id" ? "Budget" : "Budget"}: ${form.budget || "-"}`,
    `${locale === "id" ? "Kontak" : "Contact"}: ${form.contact || "-"}`,
  ].join("\n");

  const waHref = socials.whatsapp
    ? `${socials.whatsapp.split("?")[0]}?text=${encodeURIComponent(message)}`
    : "";
  const mailHref = socials.email
    ? `mailto:${socials.email}?subject=${encodeURIComponent(
        `${locale === "id" ? "Proyek baru" : "New project"} — ${form.need || "wddfach"}`,
      )}&body=${encodeURIComponent(message)}`
    : "";

  const openWhatsApp = (event: React.MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    openExternalPreservingScroll(waHref);
  };

  const needs = [
    { id: "UI/UX design", label: "UI/UX design" },
    { id: "Asset 3D", label: locale === "id" ? "Asset 3D" : "3D asset" },
    { id: "Konsep senjata / game art", label: locale === "id" ? "Konsep senjata / game art" : "Weapon concept / game art" },
    { id: "Paket lengkap", label: locale === "id" ? "Paket lengkap" : "Full package" },
    { id: "Lainnya", label: locale === "id" ? "Lainnya" : "Something else" },
  ];

  return (
    <div className="shell py-14 sm:py-20">
      <Reveal>
        <header className="max-w-2xl">
          <p className="eyebrow mb-3 flex items-center gap-2">
            <span className="h-px w-6 bg-ember/70" />
            {t("nav.contact", locale)}
          </p>
          <h1 className="text-[2rem] font-semibold leading-tight sm:text-[2.6rem]">
            {locale === "id" ? "Ceritain proyeknya." : "Tell me about it."}
          </h1>
          <p className="mt-4 text-[15px] leading-relaxed text-ink-soft">
            {locale === "id"
              ? "Isi yang kamu tahu saja. Tombol di bawah akan menyusun pesan rapi lalu membukanya di WhatsApp atau email — jadi kamu bisa lihat dulu apa yang terkirim sebelum menekan kirim."
              : "Fill in whatever you know. The buttons below compose a tidy message and open it in WhatsApp or email — so you can review it before it goes out."}
          </p>
        </header>
      </Reveal>

      <div className="mt-14 grid gap-14 lg:grid-cols-[1fr_18rem] lg:gap-20">
        {/* form */}
        <Reveal delay={60}>
          <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>
            <div className="grid gap-5 sm:grid-cols-2">
              <Field label={t("checkout.name", locale)}>
                <input
                  value={form.name}
                  onChange={set("name")}
                  placeholder={locale === "id" ? "Nama kamu" : "Your name"}
                  className="input"
                  autoComplete="name"
                />
              </Field>
              <Field label={t("checkout.contact", locale)}>
                <input
                  value={form.contact}
                  onChange={set("contact")}
                  placeholder="08xx / email"
                  className="input"
                  autoComplete="email"
                />
              </Field>
            </div>

            <div className="grid gap-5 sm:grid-cols-2">
              <Field label={locale === "id" ? "Yang dibutuhkan" : "What you need"}>
                <select value={form.need} onChange={set("need")} className="input">
                  <option value="">{locale === "id" ? "— pilih —" : "— select —"}</option>
                  {needs.map((n) => (
                    <option key={n.id} value={n.id}>
                      {n.label}
                    </option>
                  ))}
                </select>
              </Field>
              <Field label={locale === "id" ? "Budget (opsional)" : "Budget (optional)"}>
                <input
                  value={form.budget}
                  onChange={set("budget")}
                  placeholder={locale === "id" ? "mis. 500rb–1jt" : "e.g. 500k–1m"}
                  className="input"
                />
              </Field>
            </div>

            <Field
              label={locale === "id" ? "Brief singkat" : "Short brief"}
              hint={
                locale === "id"
                  ? "Mau bikin apa, untuk siapa, dan kapan butuhnya."
                  : "What you need, for whom, and by when."
              }
            >
              <textarea
                value={form.brief}
                onChange={set("brief")}
                rows={6}
                placeholder={
                  locale === "id"
                    ? "Contoh: butuh 3 konsep senjata buat game sci-fi, dipakai buat pitch ke publisher tanggal 20."
                    : "Example: need 3 weapon concepts for a sci-fi game, for a publisher pitch on the 20th."
                }
                className="input resize-y"
              />
            </Field>

            <div className="flex flex-wrap gap-3 pt-2">
              {waHref && (
                <a
                  href={waHref}
                  onClick={openWhatsApp}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="inline-flex h-12 items-center gap-2 rounded-full bg-ember px-6 text-sm font-semibold text-[#12100c] transition-colors hover:bg-ember-soft"
                >
                  {locale === "id" ? "Buka di WhatsApp" : "Open in WhatsApp"}
                </a>
              )}
              {mailHref && (
                <a
                  href={mailHref}
                  className="inline-flex h-12 items-center rounded-full border border-line px-6 text-sm font-semibold text-ink-soft transition-colors hover:border-ink-mute hover:text-ink"
                >
                  {locale === "id" ? "Buka di Email" : "Open in Email"}
                </a>
              )}
            </div>

            {!waHref && !mailHref && (
              <p className="rounded-xl border border-warn/40 bg-warn/8 p-4 text-[12.5px] leading-relaxed text-warn">
                {locale === "id"
                  ? "Kontak belum diatur. Isi `socials` di src/lib/site.ts dulu."
                  : "Contacts not configured. Fill in `socials` in src/lib/site.ts first."}
              </p>
            )}
          </form>
        </Reveal>

        {/* kanal langsung */}
        <aside className="lg:sticky lg:top-24 lg:self-start">
          <p className="eyebrow mb-4">{locale === "id" ? "Atau langsung" : "Or directly"}</p>
          <ul className="divide-y divide-line-soft border-y border-line-soft">
            {[
              { k: "WhatsApp", href: socials.whatsapp, v: socials.whatsapp ? "+" + toWaNumber(socials.whatsapp.replace(/\D/g, "")) : "" },
              { k: "Email", href: socials.email ? `mailto:${socials.email}` : "", v: socials.email },
              { k: "Instagram", href: socials.instagram, v: socials.instagram.replace(/^https?:\/\/(www\.)?instagram\.com\//, "@") },
              { k: "TikTok", href: socials.tiktok, v: socials.tiktok.replace(/^https?:\/\/(www\.)?tiktok\.com\/@/, "@") },
              { k: "ArtStation", href: socials.artstation, v: "ArtStation" },
            ]
              .filter((c) => c.href)
              .map((c) => (
                <li key={c.k} className="py-3.5">
                  <a
                    href={c.href}
                    onClick={(event) => {
                      if (c.k !== "WhatsApp") return;
                      event.preventDefault();
                      openExternalPreservingScroll(c.href);
                    }}
                    target={c.href.startsWith("mailto:") ? undefined : "_blank"}
                    rel="noreferrer noopener"
                    className="group block"
                  >
                    <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-ink-mute">
                      {c.k}
                    </span>
                    <span className="mt-0.5 block truncate text-[13.5px] text-ink-soft transition-colors group-hover:text-ember">
                      {c.v}
                    </span>
                  </a>
                </li>
              ))}
          </ul>

          <div className="mt-6 rounded-2xl border border-line bg-surface/45 p-5">
            <p className="font-mono text-[10.5px] uppercase tracking-[0.16em] text-ink-mute">
              {locale === "id" ? "Waktu balasan" : "Reply time"}
            </p>
            <p className="mt-2 text-[13.5px] leading-relaxed text-ink-soft">
              {locale === "id"
                ? "Biasanya di bawah 24 jam, hari kerja. Kalau dua hari belum dibalas, kirim ulang — kadang pesannya ketimbun."
                : "Usually under 24 hours on weekdays. If two days pass, send it again — messages do get buried."}
            </p>
          </div>
        </aside>
      </div>
    </div>
  );
}

function Field({
  label,
  hint,
  children,
}: {
  label: string;
  hint?: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="mb-2 block text-[13px] font-medium text-ink">{label}</span>
      {children}
      {hint && <span className="mt-1.5 block text-[11.5px] text-ink-mute">{hint}</span>}
    </label>
  );
}
