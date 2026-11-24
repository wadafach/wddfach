# wddfach — portofolio + toko jasa

Situs portofolio dan penjualan jasa/produk untuk **wddfach**: UI/UX design, asset 3D,
dan game concept design. Latar ruang angkasa dengan Three.js (bintang, planet prosedural,
hujan meteor) yang bisa dimatikan kalau perangkatnya keberatan.

## Isi

| Rute | Fungsi |
|---|---|
| `/` | Beranda: hero + karya unggulan + tiga bidang + harga + cara kerja |
| `/work` | Daftar karya dengan filter kategori (UI/UX, 3D, Game Art) |
| `/work/[slug]` | Studi kasus satu karya |
| `/services` | Jasa & produk digital, lengkap dengan harga dan yang kamu dapat |
| `/about` | Tentang, cara kerja, alat |
| `/contact` | Form yang menyusun pesan lalu membukanya di WhatsApp/email |
| `/checkout` | Ringkasan → bayar (QRIS/DANA/BCA) → kirim bukti |
| `/admin` | Panel admin: karya, jasa/produk, pesanan, pembayaran |

## Menjalankan di komputermu

Butuh **Node.js 20+** (di mesin ini sudah ada v26).

```bash
npm install
npm run dev
```

Buka http://localhost:3000

## Yang WAJIB kamu ubah dulu

### 1. Nomor pembayaran → `.env.local`

```bash
cp .env.example .env.local
```

Lalu buka `.env.local` dan isi:

```
ADMIN_PASSWORD=kata-sandi-panjang-milikmu
NEXT_PUBLIC_PAY_QRIS_IMAGE=/pay/qris.png
NEXT_PUBLIC_PAY_DANA_NUMBER=08xxxxxxxxxx
NEXT_PUBLIC_PAY_DANA_NAME=Nama Kamu
NEXT_PUBLIC_PAY_BCA_NUMBER=1234567890
NEXT_PUBLIC_PAY_BCA_NAME=Nama Kamu
NEXT_PUBLIC_ORDER_WHATSAPP=628xxxxxxxxxx
NEXT_PUBLIC_ORDER_EMAIL=emailkamu@gmail.com
```

Simpan gambar QRIS-mu sebagai `public/pay/qris.png`.

**Restart dev server** setelah mengubah `.env.local` — variabel environment hanya dibaca
saat proses start.

> Kalau `.env.local` belum diisi, halaman checkout **tidak menampilkan nomor apa pun**.
> Yang muncul adalah peringatan "belum dikonfigurasi". Ini disengaja: lebih baik daripada
> menampilkan rekening contoh dan ada orang salah transfer.

### 2. Kontak & sosial → `src/lib/site.ts`

```ts
export const socials = {
  email: "halo@wddfach.com",
  instagram: "https://instagram.com/wddfach",
  tiktok: "https://tiktok.com/@wddfach",
  whatsapp: "https://wa.me/6281234567890",
  artstation: "",
  github: "",
};
```

Kosongkan (`""`) yang belum ada — otomatis disembunyikan dari header, footer, dan halaman kontak.

### 3. Karya & harga → `src/lib/content/`

- `works.ts` — daftar karya
- `products.ts` — daftar jasa dan produk digital

Taruh gambarmu di `public/works/`, lalu ubah field `cover`:

```ts
cover: "/works/senjata-01.jpg",
```

Harga `0` artinya "hubungi dulu untuk harga" — di katalog muncul sebagai
"Hubungi untuk harga", bukan Rp 0.

## Menyambungkan Supabase (supaya admin bisa upload & CRUD)

Sekarang admin masih **mode baca** dengan draf lokal, karena data masih ada di file
TypeScript. Supaya bisa tambah/edit karya langsung dari `/admin` tanpa menyentuh kode:

1. Daftar gratis di https://supabase.com → **New project** (pilih region Singapore).
2. Buka **SQL Editor**, jalankan:

```sql
create table works (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  title_id text not null,
  title_en text not null,
  summary_id text, summary_en text,
  body_id text, body_en text,
  category text not null check (category in ('uiux','threed','gameart')),
  tags text[] default '{}',
  year int not null,
  cover text,
  gallery text[] default '{}',
  tools text[] default '{}',
  featured boolean default false,
  sort_order int default 0,
  created_at timestamptz default now()
);

create table products (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  title_id text not null,
  title_en text not null,
  summary_id text, summary_en text,
  detail_id text, detail_en text,
  kind text not null check (kind in ('service','digital')),
  price int not null default 0,
  unit_id text, unit_en text,
  cover text,
  deliverables_id text[] default '{}',
  deliverables_en text[] default '{}',
  turnaround_id text, turnaround_en text,
  featured boolean default false,
  active boolean default true,
  sort_order int default 0,
  created_at timestamptz default now()
);

create table orders (
  id uuid primary key default gen_random_uuid(),
  code text unique not null,
  name text not null,
  contact text not null,
  channel text not null default 'whatsapp',
  note text,
  items jsonb not null,
  total int not null default 0,
  status text not null default 'pending'
    check (status in ('pending','confirmed','in_progress','delivered','cancelled')),
  proof_url text,
  created_at timestamptz default now()
);

insert into storage.buckets (id, name, public)
values ('media', 'media', true)
on conflict do nothing;

alter table works enable row level security;
alter table products enable row level security;
alter table orders enable row level security;

create policy "baca publik" on works for select using (true);
create policy "baca publik" on products for select using (active = true);
create policy "tulis kalau login" on works
  for all to authenticated using (true) with check (true);
create policy "tulis kalau login" on products
  for all to authenticated using (true) with check (true);
create policy "tulis kalau login" on orders
  for all to authenticated using (true) with check (true);
```

3. **Settings → API**: salin URL dan anon key ke `.env.local`:

```
NEXT_PUBLIC_SUPABASE_URL=https://xxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGci...
SUPABASE_SERVICE_ROLE_KEY=eyJhbGci...   # jangan beri awalan NEXT_PUBLIC_
```

4. **Authentication → Users → Add user**: buat akun admin pakai email + password kamu.
   Ini akun login `/admin` nanti — jangan pakai kata sandi yang sama dengan yang lain.

5. Langkah terakhir: ganti `useState(seedWorks)` di `WorksTab`/`ProductsTab` jadi query
   Supabase, dan pasang Supabase Auth di `/admin`. Struktur komponennya sengaja sudah
   dipisah supaya penggantian ini tidak menyentuh tampilan.

## Deploy gratis (Vercel)

1. Push project ini ke GitHub:

```bash
git init
git add .
git commit -m "portofolio wddfach"
git remote add origin https://github.com/USERNAME/wddfach.git
git push -u origin main
```

2. Buka https://vercel.com → daftar pakai akun GitHub → **Add New → Project** →
   pilih repo `wddfach` → **Deploy**. Framework terdeteksi otomatis.

3. Di **Project Settings → Environment Variables**, isi semua variabel yang sama
   seperti di `.env.local`, lalu **Redeploy**.

4. Kamu dapat alamat gratis seperti `wddfach.vercel.app`.

**Domain sendiri** (opsional, ±Rp 150–200 ribu/tahun): beli di Niagahoster / Rumahweb /
Cloudflare, lalu di Vercel buka **Settings → Domains → Add**, ikuti instruksi
mengubah nameserver atau DNS record. Kalau belum siap, alamat `.vercel.app` sudah cukup.

## Struktur folder

```
src/
  app/
    (site)/            # halaman publik — pakai layout kosmik gelap
      page.tsx         # beranda
      work/            # daftar + detail karya
      services/        # jasa & produk
      about/ contact/ checkout/
    admin/             # panel admin — permukaan terang, tanpa latar 3D
    api/admin/login/   # login (kata sandi dicek di server)
  components/
    three/             # Starfield, Planet, MeteorShower, CosmicScene, HeroArtifact
    layout/            # Header, Footer, CartDrawer, SettingsPanel
    site/              # komponen halaman
    ui/                # Reveal, Button, Chip, LangSwitch
  lib/
    content/           # data karya & produk (ganti isinya)
    i18n.ts            # kamus ID/EN
    site.ts            # kontak + pembayaran dari env
    store.ts           # Zustand: bahasa, level 3D, keranjang
    types.ts, utils.ts
```

## Catatan teknis yang perlu kamu tahu

**Performa 3D.** Latar kosmiknya otomatis menyesuaikan:
- "auto" (default) membaca jumlah core, RAM perangkat, renderer WebGL, dan Save-Data.
  Perangkat kelas bawah langsung dapat versi ringan.
- Render loop **berhenti total** kalau tab tidak aktif atau canvas di luar viewport.
- `prefers-reduced-motion` → animasi dimatikan sepenuhnya.
- Pengunjung bisa memilih **Penuh / Ringan / Mati** lewat ikon gerigi di header.
  Kalau dimatikan, latarnya tetap gradien kosmik dari CSS — bukan hitam polos.

**Kalau mau lihat versi paling cepat**, setel efek 3D ke **Mati**: itu mematikan
canvas sepenuhnya.

**Placeholder gambar.** `public/works/placeholder-*.svg` cuma penanda. Ganti dengan
gambarmu; kalau `cover` di `works.ts` masih menunjuk placeholder, situs menandainya
sebagai "belum ada gambar" — sengaja, supaya tidak ada gambar karangan.

**Ganti ke next/image.** Komponen karya sengaja pakai `<img>` biasa supaya
placeholder dan URL dari database tetap jalan. Begitu semua gambar sudah ada di
`public/`, ganti ke `next/image` untuk optimasi otomatis.

**Bahasa.** Tombol ID/EN di header. Teks antarmuka ada di `src/lib/i18n.ts`;
teks konten ada di field `id`/`en` masing-masing karya/produk.

## Perintah

```bash
npm run dev      # development
npm start        # jalankan hasil build
npm run build    # build produksi
npm run lint     # cek kode
```
