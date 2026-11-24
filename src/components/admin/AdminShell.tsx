"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import Link from "next/link";

import { works as seedWorks } from "@/lib/content/works";
import { products as seedProducts } from "@/lib/content/products";
import { site, payment, isPaymentConfigured, activePayChannels } from "@/lib/site";
import type { Order, Product, Work } from "@/lib/types";
import { cn, formatIDR } from "@/lib/utils";

type Tab = "works" | "products" | "orders" | "payment";

const TABS: { id: Tab; label: string }[] = [
  { id: "works", label: "Karya" },
  { id: "products", label: "Jasa & Produk" },
  { id: "orders", label: "Pesanan" },
  { id: "payment", label: "Pembayaran" },
];

const DRAFT_KEY = "wddfach.admin.draft";

export function AdminShell({ passwordConfigured }: { passwordConfigured: boolean }) {
  const [authed, setAuthed] = useState(false);
  const [tab, setTab] = useState<Tab>("works");
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  if (!mounted) {
    return (
      <div className="grid min-h-dvh place-items-center">
        <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-ws-ink-mute">
          Memuat…
        </p>
      </div>
    );
  }

  if (!authed) {
    return (
      <Login
        passwordConfigured={passwordConfigured}
        onSuccess={() => setAuthed(true)}
      />
    );
  }

  return (
    <div className="mx-auto max-w-[80rem] px-5 py-8">
      <header className="mb-8 flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-ws-ink-mute">
            {site.name}
          </p>
          <h1 className="mt-2 text-2xl font-semibold">Panel Admin</h1>
          <p className="mt-1.5 text-[13px] text-ws-ink-soft">
            Kelola karya, jasa/produk, dan pesanan.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Link href="/" className="admin-btn admin-btn-quiet">
            Lihat situs
          </Link>
          <button
            onClick={async () => {
              await fetch("/api/admin/login", { method: "DELETE" });
              setAuthed(false);
            }}
            className="admin-btn admin-btn-quiet"
          >
            Keluar
          </button>
        </div>
      </header>

      <ReadOnlyNotice />

      <nav
        role="tablist"
        aria-label="Bagian admin"
        className="mt-6 flex flex-wrap gap-1.5 border-b border-ws-line pb-2"
      >
        {TABS.map((t) => (
          <button
            key={t.id}
            role="tab"
            aria-selected={tab === t.id}
            onClick={() => setTab(t.id)}
            className="admin-tab"
          >
            {t.label}
          </button>
        ))}
      </nav>

      <div className="mt-7">
        {tab === "works" && <WorksTab />}
        {tab === "products" && <ProductsTab />}
        {tab === "orders" && <OrdersTab />}
        {tab === "payment" && <PaymentTab />}
      </div>
    </div>
  );
}

/* ================================================================== */
/* Login                                                              */
/* ================================================================== */

function Login({
  passwordConfigured,
  onSuccess,
}: {
  passwordConfigured: boolean;
  onSuccess: () => void;
}) {
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setBusy(true);
    setError("");
    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });
      const data = await res.json().catch(() => ({ ok: false }));
      if (data.ok) {
        onSuccess();
        return;
      }
      setError(
        data.code === "not_configured"
          ? "ADMIN_PASSWORD belum diisi di .env.local."
          : "Kata sandi salah.",
      );
    } catch {
      setError("Tidak bisa menghubungi server.");
    } finally {
      setBusy(false);
      setPassword("");
    }
  };

  return (
    <div className="grid min-h-dvh place-items-center px-5">
      <div className="admin-card w-full max-w-sm p-7">
        <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-ws-ink-mute">
          {site.name}
        </p>
        <h1 className="mt-2.5 text-xl font-semibold">Panel Admin</h1>
        <p className="mt-1.5 text-[13px] text-ws-ink-soft">
          Masuk untuk mengelola karya, jasa, dan pesanan.
        </p>

        {!passwordConfigured && (
          <div className="mt-5 rounded-lg border border-[#f0d6a8] bg-[#fdf8ee] p-3.5">
            <p className="text-[12.5px] font-semibold text-[#946214]">
              ADMIN_PASSWORD belum diisi
            </p>
            <p className="mt-1.5 text-[12px] leading-relaxed text-[#8a6a2c]">
              Buat file <span className="font-mono">.env.local</span> di root project dan isi{" "}
              <span className="font-mono">ADMIN_PASSWORD=…</span>, lalu restart dev server.
            </p>
          </div>
        )}

        <form onSubmit={submit} className="mt-6">
          <label className="admin-label" htmlFor="admin-pass">
            Kata sandi
          </label>
          <input
            id="admin-pass"
            type="password"
            className="admin-input"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoComplete="current-password"
            disabled={!passwordConfigured}
            required
          />

          {error && (
            <p className="mt-3 rounded-lg border border-[#f3c9c9] bg-[#fdf2f2] px-3 py-2 text-[12.5px] text-[#b4322f]">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={busy || !passwordConfigured}
            className="admin-btn admin-btn-primary mt-5 w-full"
          >
            {busy ? "Memeriksa…" : "Masuk"}
          </button>
        </form>

        <p className="mt-5 text-[11.5px] leading-relaxed text-ws-ink-mute">
          Sesi berlaku 12 jam dan disimpan sebagai cookie HTTP-only. Kata sandi tidak pernah
          dikirim ke browser.
        </p>
      </div>
    </div>
  );
}

/* ================================================================== */
/* Notice: mode baca                                                 */
/* ================================================================== */

function ReadOnlyNotice() {
  const [open, setOpen] = useState(true);
  if (!open) return null;
  return (
    <div className="mt-6 rounded-xl border border-[#f0d6a8] bg-[#fdf8ee] p-4">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-[13px] font-semibold text-[#946214]">
            Mode baca / draf lokal — belum tersambung database
          </p>
          <p className="mt-1.5 max-w-3xl text-[12px] leading-relaxed text-[#8a6a2c]">
            Data yang kamu lihat berasal dari file{" "}
            <span className="font-mono">src/lib/content/*.ts</span>. Perubahan di bawah tersimpan
            sebagai draf di browser ini dan bisa di-<span className="font-mono">Export JSON</span>{" "}
            untuk ditempel ke file tersebut. Supaya bisa simpan langsung dari sini (upload gambar,
            CRUD karya, pesanan masuk), sambungkan Supabase — langkahnya ada di{" "}
            <span className="font-mono">README.md</span> bagian “Menyambungkan Supabase”.
          </p>
        </div>
        <button
          onClick={() => setOpen(false)}
          className="admin-btn admin-btn-quiet h-7 px-2.5 text-[11px]"
          aria-label="Tutup"
        >
          ×
        </button>
      </div>
    </div>
  );
}

/* ================================================================== */
/* Tab: Karya                                                        */
/* ================================================================== */

function WorksTab() {
  const [list, setList] = useState<Work[]>(seedWorks);
  const [query, setQuery] = useState("");

  const filtered = useMemo(
    () =>
      list.filter(
        (w) =>
          w.title.id.toLowerCase().includes(query.toLowerCase()) ||
          w.slug.includes(query.toLowerCase()),
      ),
    [list, query],
  );

  const exportJson = useCallback(() => {
    const blob = new Blob([JSON.stringify(list, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "works.json";
    a.click();
    URL.revokeObjectURL(url);
  }, [list]);

  return (
    <section>
      <div className="mb-5 flex flex-wrap items-center gap-3">
        <input
          className="admin-input max-w-xs"
          placeholder="Cari judul atau slug…"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <span className="font-mono text-[11px] text-ws-ink-mute">
          {filtered.length} / {list.length} karya
        </span>
        <div className="ml-auto flex gap-2">
          <button onClick={exportJson} className="admin-btn admin-btn-quiet">
            Export JSON
          </button>
          <button
            onClick={() => alert("Menambah karya dari sini butuh Supabase. Lihat README.")}
            className="admin-btn admin-btn-accent"
          >
            + Karya baru
          </button>
        </div>
      </div>

      <div className="admin-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Judul</th>
                <th>Kategori</th>
                <th>Tahun</th>
                <th>Gambar</th>
                <th>Unggulan</th>
                <th />
              </tr>
            </thead>
            <tbody>
              {filtered.map((w) => (
                <tr key={w.slug}>
                  <td>
                    <p className="font-medium text-ws-ink">{w.title.id}</p>
                    <p className="mt-0.5 font-mono text-[10.5px] text-ws-ink-mute">{w.slug}</p>
                  </td>
                  <td>
                    <span className="admin-badge bg-[#eef1f9] text-ws-ink-soft">{w.category}</span>
                  </td>
                  <td className="font-mono text-[12px]">{w.year}</td>
                  <td>
                    {w.cover && !w.cover.includes("placeholder") ? (
                      <span className="admin-badge bg-[#e9f7ee] text-[#2c7a4b]">ada</span>
                    ) : (
                      <span className="admin-badge bg-[#fdf0f0] text-[#b4322f]">placeholder</span>
                    )}
                  </td>
                  <td>
                    {w.featured ? (
                      <span className="admin-badge bg-[#fff4e5] text-[#946214]">ya</span>
                    ) : (
                      <span className="text-ws-ink-mute">—</span>
                    )}
                  </td>
                  <td className="text-right">
                    <button
                      onClick={() =>
                        alert(
                          "Edit butuh Supabase atau langsung ubah src/lib/content/works.ts.",
                        )
                      }
                      className="admin-btn admin-btn-quiet h-7 px-2.5 text-[11.5px]"
                    >
                      Edit
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}

/* ================================================================== */
/* Tab: Jasa & Produk                                                */
/* ================================================================== */

function ProductsTab() {
  const [list] = useState<Product[]>(seedProducts);

  const exportJson = () => {
    const blob = new Blob([JSON.stringify(list, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "products.json";
    a.click();
    URL.revokeObjectURL(url);
  };

  const services = list.filter((p) => p.kind === "service").length;
  const digital = list.filter((p) => p.kind === "digital").length;

  return (
    <section>
      <div className="mb-5 flex flex-wrap items-center gap-3">
        <div className="flex gap-2">
          <span className="admin-badge bg-[#e9f2fb] text-[#2a5f8f]">{services} jasa</span>
          <span className="admin-badge bg-[#f4eefb] text-[#6a3fa0]">{digital} produk digital</span>
        </div>
        <div className="ml-auto flex gap-2">
          <button onClick={exportJson} className="admin-btn admin-btn-quiet">
            Export JSON
          </button>
          <button
            onClick={() => alert("Menambah produk dari sini butuh Supabase. Lihat README.")}
            className="admin-btn admin-btn-accent"
          >
            + Produk baru
          </button>
        </div>
      </div>

      <div className="admin-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Nama</th>
                <th>Jenis</th>
                <th>Harga</th>
                <th>Satuan</th>
                <th>Estimasi</th>
                <th>Aktif</th>
                <th />
              </tr>
            </thead>
            <tbody>
              {list.map((p) => (
                <tr key={p.slug}>
                  <td>
                    <p className="font-medium text-ws-ink">{p.title.id}</p>
                    <p className="mt-0.5 font-mono text-[10.5px] text-ws-ink-mute">{p.slug}</p>
                  </td>
                  <td>
                    <span
                      className={cn(
                        "admin-badge",
                        p.kind === "service"
                          ? "bg-[#e9f2fb] text-[#2a5f8f]"
                          : "bg-[#f4eefb] text-[#6a3fa0]",
                      )}
                    >
                      {p.kind === "service" ? "jasa" : "digital"}
                    </span>
                  </td>
                  <td className="font-mono text-[12px]">
                    {p.price ? formatIDR(p.price) : "— hubungi —"}
                  </td>
                  <td className="text-[12px] text-ws-ink-soft">{p.unit?.id ?? "—"}</td>
                  <td className="text-[12px] text-ws-ink-soft">{p.turnaround?.id ?? "—"}</td>
                  <td>
                    {p.active ? (
                      <span className="admin-badge bg-[#e9f7ee] text-[#2c7a4b]">aktif</span>
                    ) : (
                      <span className="admin-badge bg-[#f2f3f7] text-ws-ink-mute">nonaktif</span>
                    )}
                  </td>
                  <td className="text-right">
                    <button
                      onClick={() =>
                        alert(
                          "Edit butuh Supabase atau langsung ubah src/lib/content/products.ts.",
                        )
                      }
                      className="admin-btn admin-btn-quiet h-7 px-2.5 text-[11.5px]"
                    >
                      Edit
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <p className="mt-4 text-[12px] leading-relaxed text-ws-ink-mute">
        Harga <span className="font-mono">0</span> berarti “hubungi untuk harga” dan otomatis
        disembunyikan dari total pembayaran.
      </p>
    </section>
  );
}

/* ================================================================== */
/* Tab: Pesanan                                                      */
/* ================================================================== */

function OrdersTab() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [statusFilter, setStatusFilter] = useState<"all" | Order["status"]>("all");

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem("wddfach.orders");
      setOrders(raw ? (JSON.parse(raw) as Order[]) : []);
    } catch {
      setOrders([]);
    }
  }, []);

  const list = statusFilter === "all" ? orders : orders.filter((o) => o.status === statusFilter);

  const updateStatus = (code: string, status: Order["status"]) => {
    const next = orders.map((o) => (o.code === code ? { ...o, status } : o));
    setOrders(next);
    try {
      window.localStorage.setItem("wddfach.orders", JSON.stringify(next));
    } catch {}
  };

  return (
    <section>
      <div className="mb-5 flex flex-wrap items-center gap-3">
        <select
          className="admin-input max-w-[12rem]"
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value as typeof statusFilter)}
        >
          <option value="all">Semua status</option>
          <option value="pending">Menunggu bayar</option>
          <option value="confirmed">Dikonfirmasi</option>
          <option value="in_progress">Dikerjakan</option>
          <option value="delivered">Selesai</option>
          <option value="cancelled">Dibatalkan</option>
        </select>
        <span className="font-mono text-[11px] text-ws-ink-mute">
          {list.length} pesanan
        </span>
      </div>

      {list.length === 0 ? (
        <div className="admin-card grid place-items-center px-6 py-14 text-center">
          <div>
            <p className="text-[13.5px] font-medium">Belum ada pesanan tersimpan.</p>
            <p className="mt-2 max-w-lg text-[12.5px] leading-relaxed text-ws-ink-mute">
              Di MVP ini pesanan dikonfirmasi manual lewat WhatsApp/email, sehingga belum tercatat
              otomatis di sini. Tempat ini terisi begitu Supabase tersambung dan halaman checkout
              mengirim order ke database — bukan lagi sekadar pesan.
            </p>
          </div>
        </div>
      ) : (
        <div className="admin-card overflow-hidden">
          <div className="overflow-x-auto">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Kode</th>
                  <th>Nama</th>
                  <th>Item</th>
                  <th>Total</th>
                  <th>Status</th>
                  <th />
                </tr>
              </thead>
              <tbody>
                {list.map((o) => (
                  <tr key={o.code}>
                    <td className="font-mono text-[12px]">{o.code}</td>
                    <td>
                      <p className="text-ws-ink">{o.name}</p>
                      <p className="mt-0.5 font-mono text-[10.5px] text-ws-ink-mute">
                        {o.contact}
                      </p>
                    </td>
                    <td className="text-[12px] text-ws-ink-soft">{o.items.length} item</td>
                    <td className="font-mono text-[12px]">{formatIDR(o.total)}</td>
                    <td>
                      <select
                        className="admin-input h-8 max-w-[9.5rem] py-0 text-[11.5px]"
                        value={o.status}
                        onChange={(e) => updateStatus(o.code, e.target.value as Order["status"])}
                      >
                        <option value="pending">Menunggu bayar</option>
                        <option value="confirmed">Dikonfirmasi</option>
                        <option value="in_progress">Dikerjakan</option>
                        <option value="delivered">Selesai</option>
                        <option value="cancelled">Dibatalkan</option>
                      </select>
                    </td>
                    <td className="text-right">
                      <button
                        onClick={() => {
                          const next = orders.filter((x) => x.code !== o.code);
                          setOrders(next);
                          try {
                            window.localStorage.setItem("wddfach.orders", JSON.stringify(next));
                          } catch {}
                        }}
                        className="admin-btn admin-btn-danger h-7 px-2.5 text-[11.5px]"
                      >
                        Hapus
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </section>
  );
}

/* ================================================================== */
/* Tab: Pembayaran                                                   */
/* ================================================================== */

function PaymentTab() {
  const configured = isPaymentConfigured();
  const channels = activePayChannels();

  const envRows: { key: string; label: string; value: string; secret?: boolean }[] = [
    {
      key: "NEXT_PUBLIC_PAY_QRIS_IMAGE",
      label: "Gambar QRIS",
      value: payment.qrisImage || "",
    },
    {
      key: "NEXT_PUBLIC_PAY_DANA_NUMBER",
      label: "Nomor DANA",
      value: payment.dana.number,
      secret: true,
    },
    {
      key: "NEXT_PUBLIC_PAY_DANA_NAME",
      label: "Nama pemilik DANA",
      value: payment.dana.holder,
    },
    {
      key: "NEXT_PUBLIC_PAY_BCA_NUMBER",
      label: "Nomor rekening BCA",
      value: payment.bca.number,
      secret: true,
    },
    {
      key: "NEXT_PUBLIC_PAY_BCA_NAME",
      label: "Nama pemilik BCA",
      value: payment.bca.holder,
    },
    {
      key: "NEXT_PUBLIC_ORDER_WHATSAPP",
      label: "Tujuan bukti via WhatsApp",
      value: payment.proofWhatsapp,
    },
    {
      key: "NEXT_PUBLIC_ORDER_EMAIL",
      label: "Tujuan bukti via email",
      value: payment.proofEmail,
    },
  ];

  /** Sembunyikan sebagian digit walau ini bukan rahasia keras —
   *  kebiasaan baik, dan mencegah nomor kebaca orang yang lewat. */
  const mask = (v: string) =>
    v.length <= 6 ? v : v.slice(0, 4) + "•".repeat(Math.max(0, v.length - 8)) + v.slice(-4);

  return (
    <section className="max-w-3xl">
      <div className="admin-card p-6">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h2 className="text-[15px] font-semibold">Status konfigurasi pembayaran</h2>
            <p className="mt-1.5 text-[12.5px] leading-relaxed text-ws-ink-soft">
              Nilai-nilai ini dibaca dari file{" "}
              <span className="font-mono">.env.local</span> (server-side environment), bukan
              ditulis di dalam kode. File itu sudah masuk{" "}
              <span className="font-mono">.gitignore</span>, jadi tidak ikut ter-upload ke GitHub.
            </p>
          </div>
          <span
            className={cn(
              "admin-badge shrink-0",
              configured ? "bg-[#e9f7ee] text-[#2c7a4b]" : "bg-[#fdf0f0] text-[#b4322f]",
            )}
          >
            {configured ? "terkonfigurasi" : "belum diisi"}
          </span>
        </div>

        <table className="admin-table mt-6">
          <thead>
            <tr>
              <th>Variabel</th>
              <th>Keterangan</th>
              <th>Nilai</th>
            </tr>
          </thead>
          <tbody>
            {envRows.map((r) => (
              <tr key={r.key}>
                <td className="font-mono text-[11px]">{r.key}</td>
                <td className="text-[12px] text-ws-ink-soft">{r.label}</td>
                <td className="font-mono text-[11.5px]">
                  {r.value ? (
                    r.secret ? (
                      mask(r.value)
                    ) : (
                      r.value
                    )
                  ) : (
                    <span className="text-ws-ink-mute">— kosong —</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {channels.length > 0 && (
          <div className="mt-6 rounded-lg border border-ws-line bg-[#fafbfe] p-4">
            <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-ws-ink-mute">
              Yang tampil di halaman checkout
            </p>
            <ul className="mt-3 space-y-1.5">
              {channels.map((c) => (
                <li key={c.key} className="text-[12.5px] text-ws-ink-soft">
                  <span className="font-medium text-ws-ink">{c.label}</span>
                  {c.value && c.key !== "qris" && (
                    <span className="ml-2 font-mono text-[11.5px]">{mask(c.value)}</span>
                  )}
                  {c.holder && <span className="ml-2 text-ws-ink-mute">a.n. {c.holder}</span>}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      <div className="admin-card mt-6 p-6">
        <h2 className="text-[15px] font-semibold">Cara mengisi</h2>
        <ol className="mt-4 space-y-3 text-[12.5px] leading-relaxed text-ws-ink-soft">
          <li className="flex gap-3">
            <span className="admin-badge h-fit shrink-0 bg-[#eef1f9] text-ws-ink-soft">01</span>
            <span>
              Buat file <span className="font-mono">.env.local</span> di folder utama project
              (sejajar dengan <span className="font-mono">package.json</span>).
            </span>
          </li>
          <li className="flex gap-3">
            <span className="admin-badge h-fit shrink-0 bg-[#eef1f9] text-ws-ink-soft">02</span>
            <span>Salin isi contoh dari <span className="font-mono">.env.example</span>, lalu isi nilainya.</span>
          </li>
          <li className="flex gap-3">
            <span className="admin-badge h-fit shrink-0 bg-[#eef1f9] text-ws-ink-soft">03</span>
            <span>
              Simpan gambar QRIS-mu sebagai{" "}
              <span className="font-mono">public/pay/qris.png</span> dan isi{" "}
              <span className="font-mono">NEXT_PUBLIC_PAY_QRIS_IMAGE=/pay/qris.png</span>.
            </span>
          </li>
          <li className="flex gap-3">
            <span className="admin-badge h-fit shrink-0 bg-[#eef1f9] text-ws-ink-soft">04</span>
            <span>
              Restart dev server (<span className="font-mono">Ctrl+C</span> lalu{" "}
              <span className="font-mono">npm run dev</span>) — environment variable hanya dibaca
              saat start.
            </span>
          </li>
          <li className="flex gap-3">
            <span className="admin-badge h-fit shrink-0 bg-[#eef1f9] text-ws-ink-soft">05</span>
            <span>
              Kalau sudah di-deploy ke Vercel, isi variabel yang sama di{" "}
              <span className="font-mono">Project Settings → Environment Variables</span>, lalu
              redeploy.
            </span>
          </li>
        </ol>

        <div className="mt-5 rounded-lg border border-[#f0d6a8] bg-[#fdf8ee] p-3.5">
          <p className="text-[12.5px] leading-relaxed text-[#8a6a2c]">
            <span className="font-semibold">Catatan keamanan.</span> Nomor rekening dan QRIS bukan
            rahasia — memang harus bisa dibaca pembeli. Yang tidak boleh bocor adalah{" "}
            <span className="font-mono">ADMIN_PASSWORD</span>: itu tanpa awalan{" "}
            <span className="font-mono">NEXT_PUBLIC_</span>, jadi tidak pernah dikirim ke browser.
          </p>
        </div>
      </div>
    </section>
  );
}
