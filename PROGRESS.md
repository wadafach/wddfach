# PROGRESS — wddfach portfolio site

**Status: tersimpan. Semua file ada di disk. Aman untuk ganti jaringan / tutup laptop.**

Project: `C:\Users\WINDOWS 11\wddfach-next`

## Yang sudah selesai dan TERVERIFIKASI

| Cek | Hasil |
|---|---|
| `npx tsc --noEmit` | ✅ 0 error |
| `npm run build` | ✅ compile sukses, 18 halaman ter-generate |
| Semua rute HTTP | ✅ `/`, `/work`, `/work/[slug]`, `/services`, `/about`, `/contact`, `/checkout`, `/admin` → semua **200** |
| Judul halaman | ✅ `wddfach — UI/UX · 3D · Game Concept` |
| WebGL di browser | ✅ tersedia |

## Perbaikan yang sudah dilakukan

1. **Build error**: `new Date()` di body komponen klien → dipindah ke `useEffect` di
   `Footer.tsx`. Ini bug nyata yang ditangkap build, bukan sekadar warning.
2. **`shared` padding 3:4** → shader planet pakai konstanta lokal.
3. **`prefers-reduced-motion`** sekarang menghasilkan `"reduced"` (bintang tetap ada,
   parallax + meteor mati), bukan `"off"` (scene mati total). Sebelumnya, orang yang
   OS-nya menyetel reduce-motion tidak akan pernah bisa melihat scene 3D sama sekali.
   Sekarang pilihan manual user ("Penuh") boleh menimpa preferensi sistem.

## BELUM diverifikasi (ini yang harus dilanjut)

- **Canvas 3D belum pernah benar-benar tampil** di sesi ini. Browser otomasi yang
  dipakai menyetel `prefers-reduced-motion: reduce`, jadi scene-nya masuk mode
  "reduced"/mati. Perbaikan di atas sudah ditulis tapi **belum diuji ulang**.
  → Langkah berikutnya: restart dev server, buka di browser biasa, pastikan
  `document.querySelectorAll('canvas').length` > 0 dan tidak ada error di console.
- Interaksi belum diuji: drag artefak, tombol ID/EN, drawer keranjang,
  alur checkout 3 langkah, login admin.
- Belum pernah lihat tampilannya secara visual (tidak ada vision di sesi ini).

## Cara lanjut

```bash
cd ~/wddfach-next
npm run dev
```
Buka http://localhost:3000 — kalau canvas tetap kosong, set efek 3D ke **Penuh**
lewat ikon gerigi di header.

## Keputusan desain yang sudah dikunci (jangan diubah tanpa tanya user)

- Stack: **Next.js 16 + Tailwind v4 + Three.js (R3F)**. Dipilih karena user bilang
  tidak paham teknis dan minta yang paling mudah dirawat + gratis.
- Database: **Supabase** (gratis, Postgres + storage + auth). Belum disambung.
  Skema SQL lengkap ada di README.md.
- Pembayaran: **manual** — QRIS/DANA/BCA statis + pembeli kirim bukti transfer,
  admin verifikasi. Opsi gateway (Midtrans) ditunda sampai rame.
- Bahasa: **ID + EN** dengan toggle di header.
- Warna aksen: **ember `#ffaa3c` + ion cyan + plasma ungu** di atas void `#04050a`.
  Sengaja BUKAN indigo/violet default.
- Admin pakai permukaan **terang** (workspace), terpisah total dari situs publik
  yang gelap kosmik. Alasan: admin itu surface "Operate", latar 3D malah mengganggu.
- Nomor rekening **TIDAK PERNAH** masuk kode — selalu dari `.env.local`, dibaca di
  `src/lib/site.ts`. Kalau belum diisi, checkout menolak menampilkan angka apa pun.

## Yang user masih utang ke aku

- Gambar karya → taruh di `public/works/`, ubah `cover` di `src/lib/content/works.ts`
- Screenshot frame Figma (mobile layout) — Figma MCP kena limit Starter plan,
  browser kena bot wall. Tanpa ini desain Figma tidak bisa diikuti literal.
- Model `.glb` karyanya sendiri (kalau mau artefak hero diganti karyanya)
- Isi asli: kontak, harga, nama karya — semuanya sekarang masih placeholder yang
  jelas ditandai sebagai placeholder

## Jangan lupa

`src/lib/content/works.ts` dan `products.ts` isinya **CONTOH**. Ganti sebelum deploy.
Gambar di `public/works/placeholder-*.svg` cuma penanda.
