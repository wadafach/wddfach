"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

import { site, socials } from "@/lib/site";
import { t } from "@/lib/i18n";
import { publicAsset } from "@/lib/paths";
import { useSettings } from "@/lib/store";

const shopeeLike = [
  { href: "/work", key: "nav.work" as const },
  { href: "/services", key: "nav.services" as const },
  { href: "/about", key: "nav.about" as const },
  { href: "/contact", key: "nav.contact" as const },
];

export function Footer() {
  const locale = useSettings((s) => s.locale);
  /* Tahun dibaca di effect, bukan saat render: `new Date()` di body komponen
     klien bikin Next.js menganggap nilainya ikut ter-prerender (build error
     "unstable value new Date()"). Setelah hydration baru diisi. */
  const [year, setYear] = useState<number | null>(null);
  useEffect(() => setYear(new Date().getFullYear()), []);

  const channels = [
    { label: "Email", href: socials.email ? `mailto:${socials.email}` : "", value: socials.email },
    { label: "Instagram", href: socials.instagram, value: socials.instagram.replace(/^https?:\/\/(www\.)?instagram\.com\//, "@") },
    { label: "TikTok", href: socials.tiktok, value: socials.tiktok.replace(/^https?:\/\/(www\.)?tiktok\.com\/@/, "@") },
    { label: "WhatsApp", href: socials.whatsapp, value: socials.whatsapp.replace(/^https?:\/\/(www\.)?wa\.me\//, "+") },
    { label: "ArtStation", href: socials.artstation, value: "ArtStation" },
    { label: "GitHub", href: socials.github, value: "GitHub" },
  ].filter((c) => c.href);

  return (
    <footer className="relative mt-24 border-t border-line-soft">
      <div className="shell grid gap-10 py-14 sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr]">
        <div>
          <div className="flex items-center gap-2.5">
            <img src={publicAsset("/brand/sword-mark.png")} alt="" className="h-7 w-auto object-contain" />
            <img src={publicAsset("/brand/wddfach-logotype.png")} alt={site.name} className="h-7 w-auto object-contain" />
          </div>
          <p className="mt-4 max-w-xs text-[13.5px] leading-relaxed text-ink-soft">
            {site.tagline[locale]}
          </p>
          <p className="mt-4 font-mono text-[11px] text-ink-mute">{site.role[locale]}</p>
        </div>

        <div>
          <p className="eyebrow mb-4">{t("nav.work", locale)}</p>
          <ul className="space-y-2.5">
            {shopeeLike.map((l) => (
              <li key={l.href}>
                <Link
                  href={l.href}
                  className="text-[13.5px] text-ink-soft transition-colors hover:text-ember"
                >
                  {t(l.key, locale)}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="eyebrow mb-4">{t("nav.contact", locale)}</p>
          <ul className="space-y-2.5">
            {channels.map((c) => (
              <li key={c.label}>
                <a
                  href={c.href}
                  target={c.href.startsWith("mailto:") ? undefined : "_blank"}
                  rel="noreferrer noopener"
                  className="group flex items-baseline gap-2 text-[13.5px] text-ink-soft transition-colors hover:text-ember"
                >
                  <span className="font-mono text-[10.5px] uppercase tracking-widest text-ink-mute">
                    {c.label}
                  </span>
                  <span className="truncate group-hover:underline">{c.value}</span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="border-t border-line-soft">
        <div className="shell flex flex-col items-center justify-between gap-3 py-5 sm:flex-row">
          <p className="font-mono text-[11px] text-ink-mute">
            © {year ?? ""} {site.name}. {t("footer.rights", locale)}
          </p>
          <p className="font-mono text-[11px] text-ink-mute">{t("footer.tagline", locale)}</p>
        </div>
      </div>
    </footer>
  );
}
