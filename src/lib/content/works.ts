import type { Work } from "../types";

/**
 * ⚠️  ISI CONTOH — ganti dengan karya aslimu.
 *
 * Cara paling gampang:
 *  1. Taruh gambarmu di `public/works/` (mis. `public/works/senjata-01.jpg`)
 *  2. Ubah field `cover` jadi `/works/senjata-01.jpg`
 *
 * Setelah admin panel jadi (Supabase), file ini cuma jadi data awal/seed —
 * karya baru ditambah lewat /admin tanpa nyentuh kode.
 */

export const works: Work[] = [
  {
    slug: "senjata-scifi-rifle",
    title: { id: "Rifle Sci-Fi — Konsep Senjata", en: "Sci-Fi Rifle — Weapon Concept" },
    summary: {
      id: "Sketch pensil sampai blockout 3D. Fokus ke siluet yang kebaca dari jauh.",
      en: "Pencil sketch through 3D blockout. Focused on a silhouette that reads at distance.",
    },
    body: {
      id: "Mulai dari thumbnail 20 varian siluet, dipilih 3, lalu digambar detail di kertas. Bagian yang paling lama bukan bentuknya, tapi mikirin di mana tangan pemakai bakal pegang dan bagaimana larasnya bisa dilipat tanpa nabrak magasin.\n\nBlockout di Blender dipakai buat cek proporsi — banyak sketch yang kelihatan keren di kertas tapi jadi aneh begitu diputar 3D.",
      en: "Started with 20 thumbnail silhouettes, picked 3, then drew detail on paper. The slowest part wasn't the shape — it was figuring out where the hands grip and how the barrel folds without clipping the magazine.\n\nBlender blockout was used to check proportions — plenty of sketches look great on paper then go weird once you rotate them in 3D.",
    },
    category: "gameart",
    tags: ["concept art", "hard surface", "blockout"],
    year: 2025,
    cover: "/works/placeholder-1.svg",
    tools: ["Procreate", "Blender", "Photoshop"],
    featured: true,
  },
  {
    slug: "senjata-pistol-sidearm",
    title: { id: "Sidearm Compact — Konsep Senjata", en: "Compact Sidearm — Weapon Concept" },
    summary: {
      id: "Eksplorasi bentuk senjata genggam: ringkas, gampang dibaca, nggak norak.",
      en: "Handgun form exploration: compact, readable, not gaudy.",
    },
    category: "gameart",
    tags: ["concept art", "sketch", "sidearm"],
    year: 2025,
    cover: "/works/placeholder-2.svg",
    tools: ["Procreate"],
    featured: true,
  },
  {
    slug: "drone-pengintai",
    title: { id: "Drone Pengintai — Low Poly", en: "Recon Drone — Low Poly" },
    summary: {
      id: "Game-ready, 2.4k tris, satu texture sheet. Bisa dipakai langsung di engine.",
      en: "Game-ready, 2.4k tris, single texture sheet. Drop-in for engine.",
    },
    body: {
      id: "Dibikin buat latihan budget poly. Semua UV dijadikan satu sheet 2048px supaya bisa diinstance berkali-kali tanpa nambah draw call.",
      en: "Built as a poly-budget exercise. All UVs packed into one 2048px sheet so it can be instanced repeatedly without adding draw calls.",
    },
    category: "threed",
    tags: ["low poly", "game-ready", "PBR"],
    year: 2025,
    cover: "/works/placeholder-3.svg",
    tools: ["Blender", "Substance Painter"],
    featured: true,
  },
  {
    slug: "konsol-armory",
    title: { id: "Armory Console — UI/UX", en: "Armory Console — UI/UX" },
    summary: {
      id: "Layar ganti senjata. Stat dibandingkan tanpa perlu mikir, warna dipakai buat arti.",
      en: "Weapon-swap screen. Stats compare without thinking, color carries meaning.",
    },
    body: {
      id: "Masalah utamanya: pemain butuh bandingin 3 senjata sekaligus dalam 2 detik. Solusinya bar statistik yang sejajar secara vertikal supaya panjang bar-nya bisa dibandingin langsung, bukan angka yang harus dibaca.",
      en: "The problem: players need to compare three weapons in two seconds. The fix was vertically aligned stat bars so lengths compare directly, instead of numbers you have to read.",
    },
    category: "uiux",
    tags: ["game UI", "comparison", "wireframe"],
    year: 2024,
    cover: "/works/placeholder-4.svg",
    tools: ["Figma"],
    featured: true,
  },
  {
    slug: "dasbor-analitik",
    title: { id: "Dasbor Analitik — UI/UX", en: "Analytics Dashboard — UI/UX" },
    summary: {
      id: "Dibikin supaya yang nonton langsung tahu mana yang perlu ditindak.",
      en: "Built so the viewer immediately knows what needs action.",
    },
    category: "uiux",
    tags: ["dashboard", "data viz", "design system"],
    year: 2024,
    cover: "/works/placeholder-5.svg",
    tools: ["Figma", "Tokens Studio"],
  },
  {
    slug: "scrap-robot",
    title: { id: "Scrap Robot — Sculpt", en: "Scrap Robot — Sculpt" },
    summary: {
      id: "Sculpt pribadi buat latihan material logam yang berkarat dan kotor.",
      en: "Personal sculpt to practice corroded, grimy metal materials.",
    },
    category: "threed",
    tags: ["sculpt", "materials", "hard surface"],
    year: 2024,
    cover: "/works/placeholder-6.svg",
    tools: ["Blender", "Substance Painter"],
  },
];

export const workCategories = ["uiux", "threed", "gameart"] as const;
