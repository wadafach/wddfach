"use client";

import { WeaponPreview } from "@/components/three/WeaponPreview";
import { useSettings } from "@/lib/store";

export function WeaponShowcase() {
  const locale = useSettings((s) => s.locale);
  const en = locale === "en";

  return (
    <section className="shell section-space">
      <div className="mb-10 max-w-2xl">
        <p className="eyebrow">Concept → 3D</p>
        <h2 className="mt-3 font-display text-3xl font-semibold tracking-tight sm:text-4xl">
          {en ? "From a weapon sketch to a form you can turn." : "Dari sketch senjata ke bentuk yang bisa diputar."}
        </h2>
        <p className="mt-4 text-sm leading-7 text-ink-soft">
          {en
            ? "This is a procedural 3D interpretation of the weapon direction: an asymmetric blade, a blue-red eye core, a bronze guard, and a dark grip. Rotate the model to inspect it from another angle."
            : "Ini adalah interpretasi 3D prosedural dari arah desain senjata: blade panjang asimetris, eye core biru-merah, guard bronze, dan grip gelap. Putar modelnya untuk melihat bentuk dari sudut lain."}
        </p>
      </div>
      <div className="grid gap-5 lg:grid-cols-[1.3fr_.7fr]">
        <WeaponPreview />
        <div className="overflow-hidden rounded-2xl border border-line bg-surface/70">
          <div className="border-b border-line px-5 py-4">
            <p className="eyebrow">{en ? "AI concept reference" : "Referensi konsep AI"}</p>
            <h3 className="mt-2 font-display text-lg font-semibold">The Eye Blade</h3>
          </div>
          <div className="aspect-[4/5] bg-black">
            <img src="/works/reference/ai-weapon-concept.jpg" alt={en ? "AI concept reference for The Eye Blade weapon" : "Referensi konsep AI untuk senjata The Eye Blade"} className="h-full w-full object-cover" />
          </div>
          <p className="px-5 py-4 text-xs leading-6 text-ink-soft">
            {en
              ? "The AI image sets the visual direction; it is not presented as a finished 3D model. The preview geometry is procedural so it stays light and interactive."
              : "Gambar AI ini menjadi arah visual, bukan model 3D final. Geometri preview dibuat prosedural agar tetap ringan dan interaktif."}
          </p>
        </div>
      </div>
    </section>
  );
}
