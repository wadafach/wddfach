import type { Work } from "../types";

/** Karya dari Downloads/wdd tgs 1.zip. Splash lama dan elemen hantu/GIF kursi tidak dipakai. */
export const works: Work[] = [
  {
    slug: "weapon-energy-sword",
    title: { id: "Energy Sword — Weapon Design", en: "Energy Sword — Weapon Design" },
    summary: { id: "Eksplorasi senjata energi dengan siluet terang dan presentasi sinematik.", en: "Energy-weapon exploration with a readable silhouette and cinematic presentation." },
    body: { id: "Studi senjata dengan fokus pada bentuk yang langsung terbaca di layar kecil. Kontras blade, inti energi, dan frame gelap dipakai supaya titik fokusnya jelas.", en: "A weapon study focused on a shape that reads immediately on a small screen. Blade contrast, energy core, and a dark frame keep the focal point clear." },
    category: "gameart", tags: ["weapon design", "sci-fi", "presentation"], year: 2025,
    cover: "/works/weapon-energy-sword.png", gallery: ["/works/weapon-lineart-01.png", "/works/weapon-mechanical.png"], tools: ["Blender", "Figma", "Digital sketch"], featured: true,
  },
  {
    slug: "weapon-lineart-series",
    title: { id: "Weapon Lineart Series", en: "Weapon Lineart Series" },
    summary: { id: "Rangkaian sketch senjata hitam-putih: siluet, detail, dan eksplorasi bentuk.", en: "Black-and-white weapon sketches exploring silhouette, detail, and form language." },
    body: { id: "Tiga lembar lineart untuk mengeksplorasi bentuk senjata sebelum masuk ke warna atau 3D.", en: "Three line-art sheets exploring weapon forms before color or 3D." },
    category: "gameart", tags: ["sketch", "lineart", "weapon concept"], year: 2025,
    cover: "/works/weapon-lineart-03.png", gallery: ["/works/weapon-lineart-01.png", "/works/weapon-lineart-02.png"], tools: ["Digital sketch", "Photoshop"], featured: true,
  },
  {
    slug: "weapon-studio-presentation",
    title: { id: "Sword Studio Presentation", en: "Sword Studio Presentation" },
    summary: { id: "Presentasi asset senjata dengan latar studio dan warna yang kontras.", en: "A studio-style weapon asset presentation with strong color contrast." },
    category: "gameart", tags: ["weapon", "asset presentation", "3D"], year: 2025,
    cover: "/works/weapon-green-studio.png", tools: ["Blender", "Render"], featured: true,
  },
  {
    slug: "mobile-ui-brand-system",
    title: { id: "Mobile Brand Interface", en: "Mobile Brand Interface" },
    summary: { id: "Eksplorasi tampilan mobile dengan identitas WDD FACH dan hierarki yang tegas.", en: "A mobile interface exploration with WDD FACH identity and clear hierarchy." },
    body: { id: "Serangkaian mockup mobile untuk menguji bagaimana identitas visual tetap terbaca ketika dipadatkan ke layar kecil.", en: "A set of mobile mockups testing how the visual identity stays readable when compressed into a small screen." },
    category: "uiux", tags: ["mobile UI", "branding", "mockup"], year: 2025,
    cover: "/works/ui-brand-mobile.png", gallery: ["/works/ui-media-mobile.png", "/works/ui-illustrated-mobile.png"], tools: ["Figma", "Prototyping"], featured: true,
  },
  {
    slug: "mobile-media-interface",
    title: { id: "Mobile Media Interface", en: "Mobile Media Interface" },
    summary: { id: "Interface mobile dengan grid konten visual dan navigasi yang ringkas.", en: "A compact mobile interface built around visual content and a tight navigation system." },
    category: "uiux", tags: ["mobile UI", "content", "interaction"], year: 2025,
    cover: "/works/ui-media-mobile.png", gallery: ["/works/ui-brand-mobile.png", "/works/ui-illustrated-mobile.png"], tools: ["Figma", "Prototype"],
  },
  {
    slug: "illustrated-mobile-ui",
    title: { id: "Illustrated Mobile UI", en: "Illustrated Mobile UI" },
    summary: { id: "Eksplorasi UI mobile yang lebih playful dengan ilustrasi sebagai bagian dari navigasi.", en: "A playful mobile UI exploration where illustration becomes part of the navigation." },
    category: "uiux", tags: ["illustration", "mobile UI", "visual system"], year: 2025,
    cover: "/works/ui-illustrated-mobile.png", tools: ["Figma", "Illustration"],
  },
  {
    slug: "cube-3d-study",
    title: { id: "Cube Object — 3D Study", en: "Cube Object — 3D Study" },
    summary: { id: "Studi objek 3D glossy dengan material gelap dan aksen cahaya.", en: "A glossy 3D object study using dark materials and controlled light accents." },
    category: "threed", tags: ["3D render", "material", "lighting"], year: 2025,
    cover: "/works/cube-render.png", gallery: ["/works/bedroom-render.png"], tools: ["Blender", "Render"], featured: true,
  },
  {
    slug: "bedroom-interior-render",
    title: { id: "Bedroom Interior Render", en: "Bedroom Interior Render" },
    summary: { id: "Render interior dengan material kayu, kain, kaca, dan pencahayaan ruangan.", en: "An interior render studying wood, fabric, glass, and room lighting." },
    category: "threed", tags: ["interior", "environment", "render"], year: 2025,
    cover: "/works/bedroom-render.png", gallery: ["/works/bedroom-render-alt.png", "/works/cube-render.png"], tools: ["Blender", "Lighting"],
  },
  {
    slug: "3d-character-study",
    title: { id: "3D Character Study", en: "3D Character Study" },
    summary: { id: "Studi karakter 3D stylized dengan bentuk sederhana dan warna yang kuat.", en: "A stylized 3D character study built from simple shapes and a strong color palette." },
    category: "threed", tags: ["character", "stylized", "3D"], year: 2025,
    cover: "/works/mascot-3d.png", tools: ["Blender", "Render"],
  },
];

export const workCategories = ["uiux", "threed", "gameart"] as const;
