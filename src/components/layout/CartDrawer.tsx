"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

import { t } from "@/lib/i18n";
import { useCart, useSettings, useUi, cartTotal } from "@/lib/store";
import { cn, formatIDR, groupDigits } from "@/lib/utils";

/** Laci keranjang — dipanggil dari header. */
export function CartDrawer() {
  const open = useUi((s) => s.cartOpen);
  const setOpen = useUi((s) => s.setCartOpen);
  const { items, remove, setQty } = useCart();
  const locale = useSettings((s) => s.locale);
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, setOpen]);

  const list = mounted ? items : [];
  const total = cartTotal(list);

  return (
    <>
      <div
        onClick={() => setOpen(false)}
        className={cn(
          "fixed inset-0 z-50 bg-void/70 backdrop-blur-sm transition-opacity duration-300",
          open ? "opacity-100" : "pointer-events-none opacity-0",
        )}
        aria-hidden="true"
      />
      <aside
        role="dialog"
        aria-modal="true"
        aria-label={t("cart.title", locale)}
        className={cn(
          "fixed bottom-0 right-0 z-50 flex max-h-[86dvh] w-full flex-col rounded-t-2xl border border-line bg-deep/97 backdrop-blur-xl transition-transform duration-400 ease-[cubic-bezier(.16,1,.3,1)] sm:top-0 sm:h-full sm:max-h-none sm:w-[26rem] sm:rounded-none sm:border-y-0 sm:border-r-0",
          open ? "translate-y-0 sm:translate-x-0" : "translate-y-full sm:translate-y-0 sm:translate-x-full",
        )}
      >
        <div className="flex items-center justify-between border-b border-line-soft px-5 py-4">
          <h2 className="font-display text-base font-semibold">
            {t("cart.title", locale)}
            {list.length > 0 && (
              <span className="ml-2 font-mono text-[11px] text-ink-mute">({list.length})</span>
            )}
          </h2>
          <button
            onClick={() => setOpen(false)}
            aria-label={t("common.close", locale)}
            className="grid size-8 place-items-center rounded-full border border-line text-ink-soft hover:text-ink"
          >
            <svg viewBox="0 0 24 24" className="size-3.5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <path d="M6 6l12 12M18 6L6 18" />
            </svg>
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-5 py-4">
          {list.length === 0 ? (
            <div className="grid h-40 place-items-center text-center">
              <div>
                <p className="text-[13.5px] text-ink-soft">{t("cart.empty", locale)}</p>
                <Link
                  href="/services"
                  onClick={() => setOpen(false)}
                  className="mt-3 inline-block font-mono text-[11px] uppercase tracking-widest text-ember hover:underline"
                >
                  {t("cta.browse", locale)} →
                </Link>
              </div>
            </div>
          ) : (
            <ul className="space-y-3">
              {list.map((it) => (
                <li
                  key={`${it.kind}-${it.slug}`}
                  className="flex gap-3 rounded-xl border border-line-soft bg-surface/50 p-3"
                >
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-[13.5px] font-medium text-ink">{it.title}</p>
                    <p className="mt-0.5 font-mono text-[10.5px] uppercase tracking-widest text-ink-mute">
                      {t(it.kind === "service" ? "svc.service" : "svc.digital", locale)}
                    </p>
                    <div className="mt-2.5 flex items-center gap-3">
                      <div className="flex items-center gap-1.5">
                        <button
                          onClick={() => setQty(it.slug, it.qty - 1)}
                          aria-label="−"
                          className="grid size-6 place-items-center rounded-md border border-line text-ink-soft hover:text-ink"
                        >
                          −
                        </button>
                        <span className="w-6 text-center font-mono text-[12px]">{it.qty}</span>
                        <button
                          onClick={() => setQty(it.slug, it.qty + 1)}
                          aria-label="+"
                          className="grid size-6 place-items-center rounded-md border border-line text-ink-soft hover:text-ink"
                        >
                          +
                        </button>
                      </div>
                      <span className="ml-auto font-mono text-[12px] text-ink">
                        {it.price ? formatIDR(it.price * it.qty) : "—"}
                      </span>
                    </div>
                  </div>
                  <button
                    onClick={() => remove(it.slug)}
                    aria-label={t("cart.remove", locale)}
                    className="self-start text-ink-mute transition-colors hover:text-bad"
                  >
                    <svg viewBox="0 0 24 24" className="size-4" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round">
                      <path d="M6 7h12M9 7V5.5A1.5 1.5 0 0 1 10.5 4h3A1.5 1.5 0 0 1 15 5.5V7M8 7l.7 12h6.6L16 7" />
                    </svg>
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>

        {list.length > 0 && (
          <div className="border-t border-line-soft px-5 py-4">
            <div className="mb-1 flex items-baseline justify-between">
              <span className="text-[13px] text-ink-soft">{t("cart.total", locale)}</span>
              <span className="font-display text-lg font-semibold">{formatIDR(total)}</span>
            </div>
            <p className="mb-4 text-[11px] leading-relaxed text-ink-mute">{t("cart.note", locale)}</p>
            <Link
              href="/checkout"
              onClick={() => setOpen(false)}
              className="flex h-11 w-full items-center justify-center rounded-full bg-ember text-sm font-semibold text-[#12100c] transition-colors hover:bg-ember-soft"
            >
              {t("cta.checkout", locale)}
            </Link>
          </div>
        )}
      </aside>
    </>
  );
}

/* ------------------------------------------------------------------ */
/* Tombol "tambah ke pesanan" — dipakai di kartu produk dan halaman detail */
/* ------------------------------------------------------------------ */

export function AddToCart({
  product,
  size = "md",
  full,
}: {
  product: import("@/lib/types").Product;
  size?: "sm" | "md";
  full?: boolean;
}) {
  const locale = useSettings((s) => s.locale);
  const add = useCart((s) => s.add);
  const items = useCart((s) => s.items);
  const setCartOpen = useUi((s) => s.setCartOpen);
  const [mounted, setMounted] = useState(false);
  const [justAdded, setJustAdded] = useState(false);

  useEffect(() => setMounted(true), []);

  const inCart = mounted && items.some((i) => i.slug === product.slug);

  const onClick = () => {
    if (inCart) {
      setCartOpen(true);
      return;
    }
    add(product, locale);
    setJustAdded(true);
    // Keep the order surface visible on mobile and desktop alike.
    // The drawer is the canonical cart review before checkout.
    setCartOpen(true);
    setTimeout(() => setJustAdded(false), 1400);
  };

  return (
    <button
      onClick={onClick}
      className={cn(
        "inline-flex items-center justify-center gap-2 rounded-full font-semibold transition-[background-color,color,border-color,transform] active:scale-[0.97]",
        size === "sm" ? "h-9 px-3.5 text-[12.5px]" : "h-11 px-5 text-sm",
        full && "w-full",
        inCart
          ? "border border-good/50 bg-good/12 text-good hover:bg-good/20"
          : "bg-ember text-[#12100c] hover:bg-ember-soft",
      )}
      aria-live="polite"
    >
      {inCart ? (
        <>
          <svg viewBox="0 0 24 24" className="size-3.5" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
            <path d="M5 12.5l4.5 4.5L19 7" />
          </svg>
          {t("cta.added", locale)}
        </>
      ) : justAdded ? (
        t("cta.added", locale)
      ) : (
        t("cta.addToOrder", locale)
      )}
    </button>
  );
}

/** Kartu rekening dengan tombol salin — dipakai di halaman checkout. */
export function BankCard({
  label,
  value,
  holder,
  copyLabel,
}: {
  label: string;
  value: string;
  holder?: string;
  copyLabel: string;
}) {
  const [copied, setCopied] = useState(false);

  const onCopy = async () => {
    const { copyToClipboard } = await import("@/lib/utils");
    const ok = await copyToClipboard(value);
    if (ok) {
      setCopied(true);
      setTimeout(() => setCopied(false), 1600);
    }
  };

  return (
    <div className="rounded-2xl border border-line bg-surface/60 p-4">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <p className="font-mono text-[10.5px] uppercase tracking-[0.18em] text-ink-mute">{label}</p>
          <p className="mt-1.5 font-display text-[17px] font-semibold tracking-wide">
            {groupDigits(value)}
          </p>
          {holder && <p className="mt-1 text-[12px] text-ink-soft">a.n. {holder}</p>}
        </div>
        <button
          onClick={onCopy}
          className={cn(
            "shrink-0 rounded-full border px-3 py-1.5 font-mono text-[10.5px] uppercase tracking-widest transition-colors",
            copied
              ? "border-good/60 bg-good/12 text-good"
              : "border-line text-ink-soft hover:border-ink-mute hover:text-ink",
          )}
        >
          {copied ? "✓" : copyLabel}
        </button>
      </div>
    </div>
  );
}
