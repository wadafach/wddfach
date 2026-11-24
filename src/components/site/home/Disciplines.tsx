"use client";

import { t } from "@/lib/i18n";
import { useSettings } from "@/lib/store";
import { Reveal } from "@/components/ui/Reveal";

/**
 * Tiga bidang kerja.
 *
 * Sengaja TIDAK dibuat sebagai tiga kartu sama besar dengan ikon di atas
 * (itu tell AI design #3 + #7). Di sini dipakai daftar bernomor dengan
 * garis pemisah: tiga baris setara, tapi tiap baris punya ruang untuk
 * penjelasan nyata — bukan slogan.
 */
const disciplines = [
  {
    n: "01",
    title: { id: "Desain UI/UX", en: "UI/UX Design" },
    body: {
      id: "Wireframe, alur, sampai desain high-fidelity. Yang aku jaga bukan cuma tampilannya, tapi state kosong, error, dan loading — bagian yang biasanya bikin produk kelihatan belum jadi.",
      en: "Wireframes, flows, through high-fidelity design. I look after more than looks: empty states, errors, and loading — the parts that make a product feel unfinished.",
    },
    tags: ["Wireframe", "Design system", "Prototype"],
  },
  {
    n: "02",
    title: { id: "Pemodelan & Asset 3D", en: "3D Modeling & Assets" },
    body: {
      id: "Hard surface, low poly, dan texture PBR. Aku selalu tanya budget tri-nya dulu sebelum mulai — model yang bagus tapi bikin frame drop bukan model yang bagus.",
      en: "Hard surface, low poly, and PBR texturing. I always ask for the tri budget first — a good-looking model that drops frames isn't a good model.",
    },
    tags: ["Blender", "Low poly", "PBR texture"],
  },
  {
    n: "03",
    title: { id: "Game Concept Design", en: "Game Concept Design" },
    body: {
      id: "Sketch senjata, kendaraan, dan properti. Fokusnya kepakai: siluet kebaca dari jauh, ada callout material, dan bentuknya masuk akal waktu dianimasikan.",
      en: "Sketches for weapons, vehicles, and props. Focused on usability: silhouettes that read at distance, material callouts, and shapes that hold up once animated.",
    },
    tags: ["Sketch", "Concept art", "Blockout"],
  },
];

export function HomeDisciplines() {
  const locale = useSettings((s) => s.locale);

  return (
    <section className="shell py-20 sm:py-28">
      <Reveal>
        <div>
          <p className="eyebrow mb-3 flex items-center gap-2">
            <span className="h-px w-6 bg-ember/70" />
            {t("home.services", locale)}
          </p>
          <h2 className="max-w-xl text-2xl font-semibold sm:text-[2rem]">
            {locale === "id"
              ? "Tiga hal, satu cara kerja."
              : "Three things, one way of working."}
          </h2>
        </div>
      </Reveal>

      <div className="mt-12">
        {disciplines.map((d, i) => (
          <Reveal key={d.n} delay={i * 80}>
            <article className="group grid gap-4 border-t border-line py-8 transition-colors last:border-b hover:border-ember/40 sm:grid-cols-[auto_1fr_auto] sm:gap-8 sm:py-10">
              <span className="font-mono text-[11px] tracking-widest text-ink-mute transition-colors group-hover:text-ember">
                {d.n}
              </span>

              <div className="max-w-2xl">
                <h3 className="text-lg font-semibold sm:text-xl">{d.title[locale]}</h3>
                <p className="mt-3 text-[14px] leading-[1.75] text-ink-soft">{d.body[locale]}</p>
              </div>

              <ul className="flex flex-wrap gap-2 sm:flex-col sm:items-end sm:gap-1.5">
                {d.tags.map((tag) => (
                  <li
                    key={tag}
                    className="font-mono text-[10.5px] uppercase tracking-[0.14em] text-ink-mute"
                  >
                    {tag}
                  </li>
                ))}
              </ul>
            </article>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
