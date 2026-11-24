import { WeaponPreview } from "@/components/three/WeaponPreview";

export function WeaponShowcase() {
  return (
    <section className="shell section-space">
      <div className="mb-10 max-w-2xl">
        <p className="eyebrow">Concept → 3D</p>
        <h2 className="mt-3 font-display text-3xl font-semibold tracking-tight sm:text-4xl">
          Dari sketch senjata ke bentuk yang bisa diputar.
        </h2>
        <p className="mt-4 text-sm leading-7 text-ink-soft">
          Preview ini adalah interpretasi 3D prosedural dari desain senjata kamu: blade panjang asimetris,
          eye core biru-merah, guard bronze, dan grip gelap. Putar modelnya untuk melihat bentuk dari sudut lain.
        </p>
      </div>
      <div className="grid gap-5 lg:grid-cols-[1.3fr_.7fr]">
        <WeaponPreview />
        <div className="overflow-hidden rounded-2xl border border-line bg-surface/70">
          <div className="border-b border-line px-5 py-4">
            <p className="eyebrow">AI concept reference</p>
            <h3 className="mt-2 font-display text-lg font-semibold">The Eye Blade</h3>
          </div>
          <div className="aspect-[4/5] bg-black">
            <img src="/works/reference/ai-weapon-concept.jpg" alt="AI concept reference untuk senjata The Eye Blade" className="h-full w-full object-cover" />
          </div>
          <p className="px-5 py-4 text-xs leading-6 text-ink-soft">
            Gambar AI dipakai sebagai referensi arah visual, bukan sebagai model 3D final. Geometri preview dibangun ulang secara prosedural agar ringan dan interaktif.
          </p>
        </div>
      </div>
    </section>
  );
}
