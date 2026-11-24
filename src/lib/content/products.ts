import type { Product } from "../types";

/**
 * ⚠️  ISI CONTOH — ubah harga, judul, dan daftar deliverable-nya sesuai punyamu.
 *
 * `price: 0` artinya "hubungi dulu buat harga" — di katalog muncul
 * sebagai "Hubungi untuk harga", bukan Rp 0.
 *
 * Ini juga yang dipakai halaman /checkout. Nomor rekeningnya TIDAK di sini —
 * itu dibaca dari env (lihat src/lib/site.ts) atau dari DB setelah admin jadi.
 */

export const products: Product[] = [
  {
    slug: "jasa-uiux-screen",
    title: { id: "Desain UI/UX — per Layar", en: "UI/UX Design — per Screen" },
    summary: {
      id: "Satu layar, rapi, pakai komponen yang konsisten. Termasuk state kosong dan error.",
      en: "One screen, tidy, built from consistent components. Empty and error states included.",
    },
    detail: {
      id: "Cocok kalau kamu sudah punya arah tapi butuh layar tertentu dieksekusi bener.\n\nYang aku butuh dari kamu: tujuan layarnya, siapa yang pakai, dan referensi visual kalau ada. Kalau belum ada referensi, aku kirim 2 arah gaya dulu buat kamu pilih.",
      en: "Good if you already have a direction but need specific screens executed properly.\n\nWhat I need from you: the screen's goal, who uses it, and visual references if you have them. If you don't, I'll send 2 style directions first for you to pick.",
    },
    kind: "service",
    price: 150_000,
    unit: { id: "per layar", en: "per screen" },
    cover: "/works/placeholder-4.svg",
    deliverables: {
      id: [
        "File Figma rapi + auto layout",
        "Versi mobile & desktop",
        "Komponen reusable + variabel warna/teks",
        "State hover, aktif, kosong, dan error",
      ],
      en: [
        "Tidy Figma file with auto layout",
        "Mobile & desktop versions",
        "Reusable components + color/text variables",
        "Hover, active, empty, and error states",
      ],
    },
    turnaround: { id: "2–4 hari kerja", en: "2–4 working days" },
    featured: true,
    active: true,
  },
  {
    slug: "jasa-3d-asset",
    title: { id: "Asset 3D Game-Ready", en: "Game-Ready 3D Asset" },
    summary: {
      id: "Model + texture siap masuk engine. Tris count aku jaga sesuai budget yang kamu kasih.",
      en: "Model + texture ready for the engine. Tri count kept within your budget.",
    },
    detail: {
      id: "Default: 1 objek, UV di-pack jadi satu sheet 2048px, PBR (base color, roughness, metallic, normal).\n\nKalau butuh rig atau animasi, bilang dari awal — beda scope.",
      en: "Default: 1 object, UVs packed into one 2048px sheet, PBR (base color, roughness, metallic, normal).\n\nIf you need rigging or animation, say so up front — different scope.",
    },
    kind: "service",
    price: 350_000,
    unit: { id: "per asset", en: "per asset" },
    cover: "/works/placeholder-3.svg",
    deliverables: {
      id: [
        "File sumber .blend / .fbx / .glb",
        "Texture PBR 2048px",
        "Laporan jumlah tri & material",
        "1x revisi bentuk",
      ],
      en: [
        "Source files .blend / .fbx / .glb",
        "2048px PBR textures",
        "Tri count & material report",
        "1x shape revision",
      ],
    },
    turnaround: { id: "4–7 hari kerja", en: "4–7 working days" },
    featured: true,
    active: true,
  },
  {
    slug: "jasa-weapon-concept",
    title: { id: "Konsep Senjata / Game Asset 2D", en: "Weapon Concept / 2D Game Asset" },
    summary: {
      id: "Sketch konsep senjata, kendaraan, atau properti, plus callout bagian penting.",
      en: "Concept sketch for weapons, vehicles, or props, with callouts on key parts.",
    },
    kind: "service",
    price: 200_000,
    unit: { id: "per konsep", en: "per concept" },
    cover: "/works/placeholder-1.svg",
    deliverables: {
      id: [
        "3 varian siluet (layout)",
        "1 varian final di-render",
        "Lembar callout (material & bagian)",
        "File PNG resolusi tinggi + PSD",
      ],
      en: [
        "3 silhouette variants (layout)",
        "1 final variant rendered",
        "Callout sheet (materials & parts)",
        "High-res PNG + PSD files",
      ],
    },
    turnaround: { id: "3–5 hari kerja", en: "3–5 working days" },
    active: true,
  },
  {
    slug: "paket-uiux-lengkap",
    title: { id: "Paket UI/UX Lengkap", en: "Complete UI/UX Package" },
    summary: {
      id: "Dari riset sampai design system. Buat yang mau serius, bukan asal jadi.",
      en: "From research through design system. For work that needs to be serious.",
    },
    detail: {
      id: "Termasuk daftar layar, alur utama, dan design system yang bisa dipakai tim lain. Setelah project selesai, aku kasih 14 hari dukungan buat pertanyaan teknis ringan.",
      en: "Includes screen inventory, core flows, and a design system your team can actually use. After handoff, 14 days of support for light technical questions.",
    },
    kind: "service",
    price: 2_500_000,
    unit: { id: "per project", en: "per project" },
    cover: "/works/placeholder-5.svg",
    deliverables: {
      id: [
        "Riset singkat + daftar layar",
        "Wireframe alur utama",
        "UI high-fidelity mobile & desktop",
        "Design system (warna, teks, komponen)",
        "Sesi handoff ke developer",
      ],
      en: [
        "Light research + screen inventory",
        "Core flow wireframes",
        "High-fidelity mobile & desktop UI",
        "Design system (color, text, components)",
        "Dev handoff session",
      ],
    },
    turnaround: { id: "2–4 minggu", en: "2–4 weeks" },
    active: true,
  },
  {
    slug: "template-design-system",
    title: { id: "Template Design System (Figma)", en: "Design System Template (Figma)" },
    summary: {
      id: "Titik awal siap pakai: variabel, komponen, dan halaman contoh.",
      en: "Ready-made starting point: variables, components, and example pages.",
    },
    kind: "digital",
    price: 95_000,
    cover: "/works/placeholder-6.svg",
    deliverables: {
      id: [
        "File Figma (view-only link + duplikat)",
        "Variabel warna & tipografi",
        "Set komponen inti",
        "1 halaman contoh dashboard",
      ],
      en: [
        "Figma file (view-only link + duplicate)",
        "Color & typography variables",
        "Core component set",
        "1 example dashboard page",
      ],
    },
    turnaround: { id: "Langsung, setelah pembayaran", en: "Immediate, after payment" },
    active: true,
  },
];
