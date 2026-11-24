"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";

import { site, payment, activePayChannels, isPaymentConfigured } from "@/lib/site";
import { t } from "@/lib/i18n";
import { useCart, useSettings, cartTotal } from "@/lib/store";
import { cn, copyToClipboard, formatIDR, groupDigits, isEmail, makeOrderCode, toWaNumber } from "@/lib/utils";
import { BankCard } from "@/components/layout/CartDrawer";

type Channel = "whatsapp" | "email";

/**
 * Halaman pembayaran.
 *
 * Keputusan penting:
 *  - Kode pesanan dibuat di client dan disimpan di localStorage per kode,
 *    supaya refresh halaman tidak mengubah kode yang sudah kamu transfer.
 *  - Nomor rekening dibaca dari env (src/lib/site.ts). Kalau belum diisi,
 *    halaman MENOLAK menampilkan angka apa pun dan memberi instruksi —
 *    lebih baik daripada menampilkan rekening contoh yang bikin orang
 *    salah transfer.
 *  - Tidak ada backend di MVP: konfirmasi lewat WA/email dengan pesan
 *    yang sudah tersusun dan bisa kamu baca dulu.
 */
export function CheckoutPage() {
  const locale = useSettings((s) => s.locale);
  const { items, clear } = useCart();

  const [mounted, setMounted] = useState(false);
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [form, setForm] = useState({ name: "", contact: "", note: "" });
  const [channel, setChannel] = useState<Channel>("whatsapp");
  const [error, setError] = useState("");
  const [code, setCode] = useState("");
  const [copiedCode, setCopiedCode] = useState(false);

  useEffect(() => setMounted(true), []);

  const list = mounted ? items : [];
  const total = useMemo(() => cartTotal(list), [list]);
  const configured = isPaymentConfigured();
  const channels = activePayChannels();

  /* Kode pesanan: stabil selama isi keranjang tidak berubah.
     Kunci penyimpanan memakai susunan slug supaya keranjang berbeda
     menghasilkan kode berbeda, tapi refresh tidak mengacak kode. */
  useEffect(() => {
    if (!mounted || list.length === 0) return;
    const key = "wddfach.order." + list.map((i) => i.kind + ":" + i.slug).join("|");
    let saved: string | null = null;
    try {
      saved = window.localStorage.getItem(key);
      if (!saved) {
        saved = makeOrderCode();
        window.localStorage.setItem(key, saved);
      }
      // bersihkan catatan transfer lama supaya tidak menumpuk
      const keep = new Set<string>();
      for (let i = 0; i < window.localStorage.length; i++) {
        const k = window.localStorage.key(i);
        if (k?.startsWith("wddfach.order.")) keep.add(k);
      }
      if (keep.size > 12) {
        // simpan 12 terakhir saja
        Array.from(keep).slice(0, keep.size - 12).forEach((k) => window.localStorage.removeItem(k));
      }
    } catch {
      saved = makeOrderCode();
    }
    setCode(saved);
  }, [mounted, list]);

  const proofMessage = useMemo(() => {
    const L = (id: string, en: string) => (locale === "id" ? id : en);
    const lines = [
      `${L("Konfirmasi pembayaran", "Payment confirmation")} — ${site.name}`,
      `${L("Kode pesanan", "Order code")}: ${code || "—"}`,
      "",
      L("Pesanan", "Items") + ":",
      ...list.map((i) => `• ${i.title} ×${i.qty} — ${i.price ? formatIDR(i.price * i.qty) : L("harga menyusul", "price TBD")}`),
      "",
      `${L("Total", "Total")}: ${formatIDR(total)}`,
      "",
      L("Nama", "Name") + `: ${form.name || "-"}`,
      L("Kontak", "Contact") + `: ${form.contact || "-"}`,
    ];
    if (form.note.trim()) {
      lines.push("", L("Catatan", "Note") + ":", form.note.trim());
    }
    lines.push("", L("Bukti transfer terlampir.", "Payment proof attached."));
    return lines.join("\n");
  }, [code, list, total, form, locale]);

  const mailHref = payment.proofEmail
    ? `mailto:${payment.proofEmail}?subject=${encodeURIComponent(
        `${locale === "id" ? "Bukti pembayaran" : "Payment proof"} ${code}`,
      )}&body=${encodeURIComponent(proofMessage)}`
    : "";

  const waHref = payment.proofWhatsapp
    ? `https://wa.me/${toWaNumber(payment.proofWhatsapp)}?text=${encodeURIComponent(proofMessage)}`
    : "";

  const goToStep2 = () => {
    setError("");
    if (!form.name.trim() || !form.contact.trim()) {
      setError(t("checkout.needData", locale));
      return;
    }
    setStep(2);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const onCopyCode = async () => {
    const ok = await copyToClipboard(code);
    if (ok) {
      setCopiedCode(true);
      setTimeout(() => setCopiedCode(false), 1600);
    }
  };

  /* ---------- keranjang kosong ---------- */
  if (mounted && list.length === 0) {
    return (
      <div className="shell py-24 text-center">
        <p className="font-mono text-[10.5px] uppercase tracking-[0.18em] text-ink-mute">
          {t("checkout.title", locale)}
        </p>
        <h1 className="mt-4 font-display text-2xl font-semibold">{t("checkout.empty", locale)}</h1>
        <Link
          href="/services"
          className="mt-7 inline-flex h-11 items-center rounded-full bg-ember px-6 text-sm font-semibold text-[#12100c] transition-colors hover:bg-ember-soft"
        >
          {t("cta.browse", locale)}
        </Link>
      </div>
    );
  }

  return (
    <div className="shell py-14 sm:py-20">
      <header className="max-w-2xl">
        <p className="eyebrow mb-3 flex items-center gap-2">
          <span className="h-px w-6 bg-ember/70" />
          {t("checkout.title", locale)}
        </p>
        <h1 className="text-[1.9rem] font-semibold leading-tight sm:text-[2.4rem]">
          {locale === "id" ? "Tiga langkah, selesai." : "Three steps, done."}
        </h1>
      </header>

      {/* penanda langkah */}
      <ol className="mt-10 flex flex-wrap items-center gap-x-3 gap-y-2 font-mono text-[10.5px] uppercase tracking-[0.14em]">
        {(
          [
            [1, "checkout.step1"],
            [2, "checkout.step2"],
            [3, "checkout.step3"],
          ] as const
        ).map(([n, key], i) => {
          const on = step === n;
          const done = step > n;
          return (
            <li key={n} className="flex items-center gap-3">
              {i > 0 && <span className="h-px w-5 bg-line" aria-hidden />}
              <button
                onClick={() => (n === 1 || (form.name && form.contact) ? (setStep(n), window.scrollTo({ top: 0 })) : undefined)}
                className={cn(
                  "flex items-center gap-2 transition-colors",
                  on ? "text-ember" : done ? "text-good" : "text-ink-mute",
                )}
              >
                <span
                  className={cn(
                    "grid size-5 place-items-center rounded-full border text-[9px]",
                    on ? "border-ember/60 bg-ember/15" : done ? "border-good/50 bg-good/12" : "border-line",
                  )}
                >
                  {done ? "✓" : n}
                </span>
                {t(key, locale)}
              </button>
            </li>
          );
        })}
      </ol>

      <div className="mt-12 grid gap-12 lg:grid-cols-[1fr_22rem] lg:gap-16">
        {/* ================= kolom utama ================= */}
        <div>
          {/* ---------- LANGKAH 1: ringkasan + data ---------- */}
          {step === 1 && (
            <div className="space-y-8">
              <section>
                <h2 className="font-display text-[15px] font-semibold">
                  {t("checkout.step1", locale)}
                </h2>
                <ul className="mt-5 divide-y divide-line-soft border-y border-line-soft">
                  {list.map((it) => (
                    <li key={`${it.kind}-${it.slug}`} className="flex items-start justify-between gap-6 py-4">
                      <div className="min-w-0">
                        <p className="text-[14px] font-medium text-ink">{it.title}</p>
                        <p className="mt-0.5 font-mono text-[10.5px] uppercase tracking-widest text-ink-mute">
                          {t(it.kind === "service" ? "svc.service" : "svc.digital", locale)} · ×{it.qty}
                        </p>
                      </div>
                      <span className="shrink-0 font-mono text-[13px]">
                        {it.price ? formatIDR(it.price * it.qty) : "—"}
                      </span>
                    </li>
                  ))}
                </ul>
                <p className="mt-3 text-[11.5px] leading-relaxed text-ink-mute">{t("cart.note", locale)}</p>
              </section>

              <section>
                <h2 className="font-display text-[15px] font-semibold">
                  {t("checkout.yourData", locale)}
                </h2>
                <div className="mt-5 space-y-5">
                  <div className="grid gap-5 sm:grid-cols-2">
                    <label className="block">
                      <span className="mb-2 block text-[13px] font-medium text-ink">
                        {t("checkout.name", locale)}
                      </span>
                      <input
                        className="input"
                        value={form.name}
                        onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                        autoComplete="name"
                        required
                      />
                    </label>
                    <label className="block">
                      <span className="mb-2 block text-[13px] font-medium text-ink">
                        {t("checkout.contact", locale)}
                      </span>
                      <input
                        className="input"
                        value={form.contact}
                        onChange={(e) => setForm((f) => ({ ...f, contact: e.target.value }))}
                        placeholder="08xx / email"
                        required
                      />
                    </label>
                  </div>

                  <label className="block">
                    <span className="mb-2 block text-[13px] font-medium text-ink">
                      {t("checkout.note", locale)}{" "}
                      <span className="font-normal text-ink-mute">({t("common.optional", locale)})</span>
                    </span>
                    <textarea
                      className="input resize-y"
                      rows={4}
                      value={form.note}
                      onChange={(e) => setForm((f) => ({ ...f, note: e.target.value }))}
                      placeholder={t("checkout.notePh", locale)}
                    />
                  </label>

                  <div>
                    <span className="mb-2.5 block text-[13px] font-medium text-ink">
                      {t("checkout.channel", locale)}
                    </span>
                    <div className="inline-flex rounded-full border border-line bg-surface-2/50 p-0.5">
                      {(
                        [
                          ["whatsapp", "WhatsApp"],
                          ["email", "Email"],
                        ] as const
                      ).map(([v, label]) => (
                        <button
                          key={v}
                          onClick={() => setChannel(v)}
                          aria-pressed={channel === v}
                          className={cn(
                            "rounded-full px-4 py-1.5 text-[12.5px] font-medium transition-colors",
                            channel === v ? "bg-ember text-[#12100c]" : "text-ink-soft hover:text-ink",
                          )}
                        >
                          {label}
                        </button>
                      ))}
                    </div>
                  </div>

                  {error && (
                    <p className="rounded-xl border border-bad/40 bg-bad/8 px-4 py-3 text-[12.5px] text-bad">
                      {error}
                    </p>
                  )}
                </div>
              </section>
            </div>
          )}

          {/* ---------- LANGKAH 2: bayar ---------- */}
          {step === 2 && (
            <div className="space-y-8">
              {/* kode pesanan — elemen paling penting di halaman ini */}
              <div className="rounded-2xl border border-ember/35 bg-ember/6 p-5">
                <p className="font-mono text-[10.5px] uppercase tracking-[0.18em] text-ember">
                  {t("checkout.orderCode", locale)}
                </p>
                <div className="mt-3 flex flex-wrap items-center gap-4">
                  <code className="font-mono text-[22px] font-semibold tracking-[0.06em] text-ink sm:text-[26px]">
                    {code || "—"}
                  </code>
                  <button
                    onClick={onCopyCode}
                    disabled={!code}
                    className={cn(
                      "rounded-full border px-3.5 py-1.5 font-mono text-[10.5px] uppercase tracking-widest transition-colors disabled:opacity-40",
                      copiedCode
                        ? "border-good/60 bg-good/12 text-good"
                        : "border-line text-ink-soft hover:border-ink-mute hover:text-ink",
                    )}
                  >
                    {copiedCode ? t("cta.copied", locale) : t("cta.copy", locale)}
                  </button>
                </div>
                <p className="mt-3 text-[12px] leading-relaxed text-ink-soft">
                  {t("checkout.codeHint", locale)}
                </p>
              </div>

              <section>
                <h2 className="font-display text-[15px] font-semibold">{t("checkout.payTo", locale)}</h2>

                {configured ? (
                  <div className="mt-5 space-y-3">
                    {channels.map((c) => {
                      if (c.key === "qris") {
                        return (
                          <div key="qris" className="rounded-2xl border border-line bg-surface/60 p-5">
                            <p className="font-mono text-[10.5px] uppercase tracking-[0.18em] text-ink-mute">
                              QRIS
                            </p>
                            <div className="mt-4 flex flex-col items-start gap-5 sm:flex-row sm:items-center">
                              <div className="rounded-xl bg-white p-3">
                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                <img
                                  src={payment.qrisImage}
                                  alt="QRIS"
                                  className="size-40 object-contain"
                                />
                              </div>
                              <div className="text-[13px] leading-relaxed text-ink-soft">
                                <p>
                                  {locale === "id"
                                    ? "Scan pakai aplikasi apa pun yang mendukung QRIS."
                                    : "Scan with any QRIS-capable app."}
                                </p>
                                <p className="mt-3 font-mono text-[12px] text-ink">
                                  {t("checkout.amount", locale)}: {formatIDR(total)}
                                </p>
                              </div>
                            </div>
                          </div>
                        );
                      }
                      return (
                        <BankCard
                          key={c.key}
                          label={c.label}
                          value={c.value}
                          holder={c.holder}
                          copyLabel={t("cta.copy", locale)}
                        />
                      );
                    })}
                  </div>
                ) : (
                  <div className="mt-5 rounded-2xl border border-warn/40 bg-warn/8 p-5">
                    <p className="text-[13.5px] font-semibold text-warn">
                      {t("checkout.notConfigured", locale)}
                    </p>
                    <p className="mt-2 text-[12.5px] leading-relaxed text-warn/90">
                      {t("checkout.notConfiguredHint", locale)}
                    </p>
                  </div>
                )}
              </section>

              <div className="flex flex-wrap gap-3">
                <button
                  onClick={() => {
                    setStep(3);
                    window.scrollTo({ top: 0, behavior: "smooth" });
                  }}
                  className="inline-flex h-11 items-center rounded-full bg-ember px-6 text-sm font-semibold text-[#12100c] transition-colors hover:bg-ember-soft"
                >
                  {locale === "id" ? "Sudah transfer →" : "I've transferred →"}
                </button>
                <button
                  onClick={() => setStep(1)}
                  className="inline-flex h-11 items-center rounded-full border border-line px-6 text-sm font-medium text-ink-soft transition-colors hover:border-ink-mute hover:text-ink"
                >
                  {t("cta.back", locale)}
                </button>
              </div>
            </div>
          )}

          {/* ---------- LANGKAH 3: kirim bukti ---------- */}
          {step === 3 && (
            <div className="space-y-8">
              <section className="rounded-2xl border border-line bg-surface/50 p-5">
                <h2 className="font-display text-[15px] font-semibold">
                  {t("checkout.step3", locale)}
                </h2>
                <p className="mt-3 text-[13.5px] leading-relaxed text-ink-soft">
                  {t("checkout.proofHint", locale)}
                </p>

                <div className="mt-6 space-y-3">
                  <p className="eyebrow">
                    {locale === "id"
                      ? `Akan dikirim lewat ${channel === "whatsapp" ? "WhatsApp" : "email"}`
                      : `Will be sent via ${channel === "whatsapp" ? "WhatsApp" : "email"}`}
                  </p>

                  <pre className="max-h-64 overflow-auto whitespace-pre-wrap rounded-xl border border-line bg-void/60 p-4 font-mono text-[11.5px] leading-relaxed text-ink-soft">
                    {proofMessage}
                  </pre>

                  <div className="flex flex-wrap gap-3 pt-1">
                    {channel === "whatsapp" && waHref && (
                      <a
                        href={waHref}
                        target="_blank"
                        rel="noreferrer noopener"
                        className="inline-flex h-11 items-center gap-2 rounded-full bg-ember px-6 text-sm font-semibold text-[#12100c] transition-colors hover:bg-ember-soft"
                      >
                        {t("cta.sendProof", locale)} — WhatsApp
                      </a>
                    )}
                    {channel === "email" && mailHref && (
                      <a
                        href={mailHref}
                        className="inline-flex h-11 items-center gap-2 rounded-full bg-ember px-6 text-sm font-semibold text-[#12100c] transition-colors hover:bg-ember-soft"
                      >
                        {t("cta.sendProof", locale)} — Email
                      </a>
                    )}
                    {((channel === "whatsapp" && !waHref) || (channel === "email" && !mailHref)) && (
                      <p className="rounded-xl border border-bad/40 bg-bad/8 px-4 py-3 text-[12.5px] text-bad">
                        {locale === "id"
                          ? "Tujuan pengiriman belum diatur di .env.local."
                          : "Delivery target not configured in .env.local."}
                      </p>
                    )}

                    <button
                      onClick={async () => {
                        await copyToClipboard(proofMessage);
                        setCopiedCode(true);
                        setTimeout(() => setCopiedCode(false), 1600);
                      }}
                      className="inline-flex h-11 items-center rounded-full border border-line px-6 text-sm font-medium text-ink-soft transition-colors hover:border-ink-mute hover:text-ink"
                    >
                      {copiedCode
                        ? t("cta.copied", locale)
                        : locale === "id"
                          ? "Salin pesan"
                          : "Copy message"}
                    </button>
                  </div>
                </div>
              </section>

              <section className="rounded-2xl border border-line-soft bg-surface/30 p-5">
                <p className="text-[12.5px] leading-relaxed text-ink-soft">
                  {locale === "id" ? (
                    <>
                      Setelah bukti terkirim, aku verifikasi manual dan balas konfirmasi ke{" "}
                      <span className="text-ink">{form.contact || "kontakmu"}</span>. Pesananmu baru
                      dianggap masuk setelah itu — jadi simpan kode{" "}
                      <span className="font-mono text-ink">{code}</span> sampai ada balasan.
                    </>
                  ) : (
                    <>
                      Once the proof is sent I verify manually and reply to{" "}
                      <span className="text-ink">{form.contact || "your contact"}</span>. Your order
                      is confirmed only after that — keep the code{" "}
                      <span className="font-mono text-ink">{code}</span> until you hear back.
                    </>
                  )}
                </p>
              </section>

              <div className="flex flex-wrap gap-3">
                <Link
                  href="/work"
                  className="inline-flex h-11 items-center rounded-full border border-line px-6 text-sm font-medium text-ink-soft transition-colors hover:border-ink-mute hover:text-ink"
                >
                  {t("cta.back", locale)}
                </Link>
                <button
                  onClick={() => {
                    clear();
                    try {
                      window.localStorage.removeItem(
                        "wddfach.order." + list.map((i) => i.kind + ":" + i.slug).join("|"),
                      );
                    } catch {}
                    window.location.href = "/";
                  }}
                  className="inline-flex h-11 items-center rounded-full border border-line px-6 text-sm font-medium text-ink-mute transition-colors hover:border-ink-mute hover:text-ink"
                >
                  {locale === "id" ? "Selesai & kosongkan keranjang" : "Done & clear cart"}
                </button>
              </div>
            </div>
          )}
        </div>

        {/* ================= ringkasan samping ================= */}
        <aside className="lg:sticky lg:top-24 lg:self-start">
          <div className="rounded-2xl border border-line bg-surface/50">
            <div className="border-b border-line-soft px-5 py-3.5">
              <p className="font-mono text-[10.5px] uppercase tracking-[0.18em] text-ink-mute">
                {t("cart.subtotal", locale)}
              </p>
            </div>

            <ul className="divide-y divide-line-soft px-5">
              {list.map((it) => (
                <li key={`s-${it.kind}-${it.slug}`} className="flex items-baseline justify-between gap-4 py-3">
                  <span className="min-w-0 truncate text-[12.5px] text-ink-soft">
                    {it.title} <span className="font-mono text-ink-mute">×{it.qty}</span>
                  </span>
                  <span className="shrink-0 font-mono text-[12px]">
                    {it.price ? formatIDR(it.price * it.qty) : "—"}
                  </span>
                </li>
              ))}
            </ul>

            <div className="flex items-baseline justify-between border-t border-line-soft px-5 py-4">
              <span className="text-[13px] text-ink-soft">{t("cart.total", locale)}</span>
              <span className="font-display text-xl font-semibold">{formatIDR(total)}</span>
            </div>

            {configured && step >= 2 && (
              <div className="border-t border-line-soft px-5 py-4">
                <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-ink-mute">
                  {t("checkout.amount", locale)}
                </p>
                <p className="mt-1 font-mono text-[14px] text-ink">{groupDigits(String(total))}</p>
              </div>
            )}
          </div>

          <p className="mt-4 px-1 text-[11px] leading-relaxed text-ink-mute">
            {locale === "id"
              ? "Belum ada hubungi API pembayaran — verifikasi manual supaya tidak ada biaya tambahan buat kamu."
              : "No payment API involved — manual verification so you don't pay extra fees."}
          </p>
        </aside>
      </div>
    </div>
  );
}
