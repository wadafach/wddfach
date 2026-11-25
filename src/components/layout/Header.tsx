"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { site } from "@/lib/site";
import { t } from "@/lib/i18n";
import { useCart, useSettings, useUi } from "@/lib/store";
import { cn } from "@/lib/utils";
import { publicAsset } from "@/lib/paths";
import { LangSwitch } from "@/components/ui/bits";

const navItems = [
  { href: "/", key: "nav.home" as const },
  { href: "/work", key: "nav.work" as const },
  { href: "/services", key: "nav.services" as const },
  { href: "/about", key: "nav.about" as const },
  { href: "/contact", key: "nav.contact" as const },
];

export function Header() {
  const locale = useSettings((s) => s.locale);
  const items = useCart((s) => s.items);
  const toggleCart = useUi((s) => s.toggleCart);
  const toggleSettings = useUi((s) => s.toggleSettings);

  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [hidden, setHidden] = useState(false);
  const lastY = useRef(0);

  useEffect(() => setMounted(true), []);

  // Header mengecil saat scroll, dan menyembunyikan diri saat scroll ke bawah
  // di layar kecil — supaya layar HP tetap lega.
  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 12);
      setHidden(y > 240 && y > lastY.current && !menuOpen);
      lastY.current = y;
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [menuOpen]);

  useEffect(() => setMenuOpen(false), [pathname]);

  // kunci scroll saat menu mobile terbuka
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  const count = mounted ? items.length : 0;

  return (
    <>
      <header
        className={cn(
          "sticky top-0 z-40 transition-[transform,background-color,border-color,backdrop-filter] duration-300",
          hidden ? "-translate-y-full" : "translate-y-0",
          scrolled
            ? "border-b border-line-soft bg-void/78 backdrop-blur-xl"
            : "border-b border-transparent",
        )}
      >
        <div className="shell flex h-16 items-center justify-between gap-4">
          {/* brand */}
          <Link
            href="/"
            className="group flex items-center gap-2.5"
            aria-label={`${site.name} — beranda`}
          >
            <span className="relative grid size-8 place-items-center">
              {/* Logo resmi: sword-mark.png dari aset user. */}
              <img
                src={publicAsset("/brand/sword-mark.png")}
                alt=""
                className="h-8 w-auto object-contain transition-transform duration-500 group-hover:rotate-3"
              />
            </span>
            <img
              src={publicAsset("/brand/wddfach-logotype.png")}
              alt={site.name}
              className="h-8 w-auto object-contain"
            />
          </Link>

          {/* nav desktop */}
          <nav className="hidden items-center gap-1 md:flex" aria-label="Navigasi utama">
            {navItems.map((n) => {
              const active = n.href === "/" ? pathname === "/" : pathname.startsWith(n.href);
              return (
                <Link
                  key={n.href}
                  href={n.href}
                  aria-current={active ? "page" : undefined}
                  className={cn(
                    "rounded-full px-3.5 py-2 text-[13.5px] transition-colors",
                    active ? "text-ink" : "text-ink-soft hover:text-ink",
                  )}
                >
                  {t(n.key, locale)}
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center gap-2">
            <div className="hidden sm:block">
              <LangSwitch />
            </div>

            <button
              onClick={toggleSettings}
              aria-label={t("settings.title", locale)}
              className="grid size-9 place-items-center rounded-full border border-line text-ink-soft transition-colors hover:border-ink-mute hover:text-ink"
            >
              <svg viewBox="0 0 24 24" className="size-4" fill="none" stroke="currentColor" strokeWidth="1.7">
                <circle cx="12" cy="12" r="3.2" />
                <path d="M12 3v2.2M12 18.8V21M4.2 12H6.4M17.6 12h2.2M6.5 6.5l1.6 1.6M15.9 15.9l1.6 1.6M17.5 6.5l-1.6 1.6M8.1 15.9l-1.6 1.6" strokeLinecap="round" />
              </svg>
            </button>

            {/* keranjang */}
            <button
              onClick={toggleCart}
              aria-label={`${t("cart.title", locale)}${count ? ` (${count})` : ""}`}
              className="relative grid size-9 place-items-center rounded-full border border-line text-ink-soft transition-colors hover:border-ink-mute hover:text-ink"
            >
              <svg viewBox="0 0 24 24" className="size-4" fill="none" stroke="currentColor" strokeWidth="1.7">
                <path d="M6 7h12l-1 12H7L6 7Z" strokeLinejoin="round" />
                <path d="M9.2 7a2.8 2.8 0 0 1 5.6 0" strokeLinecap="round" />
              </svg>
              {count > 0 && (
                <span className="absolute -right-1 -top-1 grid size-4.5 min-w-[18px] place-items-center rounded-full bg-ember px-1 font-mono text-[10px] font-bold text-[#12100c]">
                  {count}
                </span>
              )}
            </button>

            {/* tombol menu mobile */}
            <button
              onClick={() => setMenuOpen((v) => !v)}
              aria-label={menuOpen ? t("common.close", locale) : "Menu"}
              aria-expanded={menuOpen}
              className="grid size-9 place-items-center rounded-full border border-line text-ink-soft md:hidden"
            >
              <svg viewBox="0 0 24 24" className="size-4" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
                {menuOpen ? (
                  <path d="M6 6l12 12M18 6L6 18" />
                ) : (
                  <path d="M4 7h16M4 12h16M4 17h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </header>

      {/* menu mobile */}
      <div
        className={cn(
          "fixed inset-x-0 top-16 z-30 origin-top border-b border-line-soft bg-void/96 backdrop-blur-xl transition-[opacity,transform] duration-300 md:hidden",
          menuOpen ? "pointer-events-auto opacity-100" : "pointer-events-none -translate-y-2 opacity-0",
        )}
      >
        <nav className="shell flex flex-col py-3" aria-label="Navigasi mobile">
          {navItems.map((n) => {
            const active = n.href === "/" ? pathname === "/" : pathname.startsWith(n.href);
            return (
              <Link
                key={n.href}
                href={n.href}
                className={cn(
                  "border-b border-line-soft py-3.5 text-[15px] last:border-0",
                  active ? "text-ember" : "text-ink-soft",
                )}
              >
                {t(n.key, locale)}
              </Link>
            );
          })}
          <div className="flex items-center justify-between py-4">
            <span className="eyebrow">{t("settings.lang", locale)}</span>
            <LangSwitch />
          </div>
        </nav>
      </div>
    </>
  );
}
