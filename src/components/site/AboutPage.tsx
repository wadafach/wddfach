"use client";

import Link from "next/link";

import { site } from "@/lib/site";
import { t } from "@/lib/i18n";
import { useSettings } from "@/lib/store";
import { CountUp, Reveal } from "@/components/ui/Reveal";

/**
 * Tentang.
 *
 * Sengaja TIDAK memakai "monument stat" palsu (mis. "500+ proyek!") —
 * itu tell slop dan kalau angkanya ngarang, merusak kepercayaan.
 * Angka yang ditampilkan hanya yang bisa kamu isi sendiri di bawah.
 */

const facts = [
  { label: { id: "Tahun mulai", en: "Started" }, value: 2021 },
  { label: { id: "Kategori kerja", en: "Disciplines" }, value: 3 },
  { label: { id: "Tools aktif", en: "Active tools" }, value: 7 },
];

const stack = [
  {
    group: { id: "UI/UX", en: "UI/UX" },
    items: ["Figma", "FigJam", "Tokens Studio", "Maze"],
  },
  {
    group: { id: "3D", en: "3D" },
    items: ["Blender", "Substance Painter", "Marmoset", "ZBrush"],
  },
  {
    group: { id: "2D & konsep", en: "2D & concept" },
    items: ["Procreate", "Photoshop", "Krita"],
  },
  {
    group: { id: "Web", en: "Web" },
    items: ["Next.js", "Three.js", "Tailwind", "TypeScript"],
  },
];

export function AboutPage() {
  const locale = useSettings((s) => s.locale);

  return (
    <div className="shell py-14 sm:py-20">
      <Reveal>
        <header className="max-w-3xl">
          <p className="eyebrow mb-3 flex items-center gap-2">
            <span className="h-px w-6 bg-ember/70" />
            {t("nav.about", locale)}
          </p>
          <h1 className="text-[2rem] font-semibold leading-[1.12] sm:text-[2.7rem]">
            {locale === "id"
              ? "Aku ngerjain tiga hal yang sering dianggap beda, padahal satu alur."
              : "I do three things people treat as separate — they're one pipeline."}
          </h1>
        </header>
      </Reveal>

      <div className="mt-14 grid gap-14 lg:grid-cols-[1fr_16rem] lg:gap-20">
        <div className="max-w-[68ch]">
          <Reveal delay={60}>
            <div className="space-y-5 text-[15.5px] leading-[1.85] text-ink-soft">
              <p>
                {locale === "id"
                  ? "Aku mulai dari gambar. Senjata, kendaraan, properti — biasanya di kertas dulu, karena di kertas keputusan bentuknya lebih jujur. Sketch yang jelek di kertas nggak akan jadi bagus cuma karena di-render 3D."
                  : "I start with drawings. Weapons, vehicles, props — usually on paper first, because paper makes the shape decisions honest. A bad sketch doesn't get better just because it's rendered in 3D."}
              </p>
              <p>
                {locale === "id"
                  ? "Dari situ aku masuk ke 3D. Tujuannya bukan bikin model yang cantik di turntable, tapi model yang nggak bikin frame drop dan UV-nya rapi waktu tim lain buka file-nya. Aku selalu tanya budget tri sebelum mulai."
                  : "From there I move into 3D. The goal isn't a model that looks pretty on a turntable, but one that doesn't drop frames and whose UVs don't fight whoever opens the file next. I always ask for the tri budget up front."}
              </p>
              <p>
                {locale === "id"
                  ? "Dan yang paling sering orang lupa: kalau bendanya dipakai lewat layar, layarnya juga harus didesain. Di situ aku kerja sebagai UI/UX — mikirin state kosong, error, dan apa yang terjadi waktu sinyalnya jelek."
                  : "And the part people forget: if the thing is used through a screen, the screen has to be designed too. That's where I work as UI/UX — empty states, errors, and what happens when the connection is bad."}
              </p>
              <p className="border-l-2 border-ember/50 pl-5 text-ink">
                {locale === "id"
                  ? "Aku suka menyatukan tiap garis sampai bentuknya terasa utuh—dari detail kecil, pelan-pelan jadi sesuatu yang punya jiwa. Buatku, di situlah garis berubah menjadi seni."
                  : "I like bringing every line together until the form feels whole—from small details, slowly becoming something with a life of its own. That is where lines become art to me."}
              </p>
            </div>
          </Reveal>

          {/* fakta */}
          <Reveal delay={120}>
            <div className="mt-14 grid grid-cols-3 gap-6 border-y border-line-soft py-8">
              {facts.map((f) => (
                <div key={f.label.id}>
                  <p className="font-display text-2xl font-semibold sm:text-3xl">
                    <CountUp to={f.value} />
                  </p>
                  <p className="mt-1.5 font-mono text-[10.5px] uppercase tracking-[0.16em] text-ink-mute">
                    {f.label[locale]}
                  </p>
                </div>
              ))}
            </div>
          </Reveal>

          {/* alat */}
          <Reveal delay={160}>
            <section className="mt-14">
              <h2 className="font-display text-lg font-semibold">
                {locale === "id" ? "Alat yang dipakai" : "Tools I use"}
              </h2>
              <dl className="mt-6 divide-y divide-line-soft border-y border-line-soft">
                {stack.map((g) => (
                  <div key={g.group.id} className="grid gap-2 py-4 sm:grid-cols-[8rem_1fr]">
                    <dt className="font-mono text-[10.5px] uppercase tracking-[0.16em] text-ink-mute">
                      {g.group[locale]}
                    </dt>
                    <dd className="text-[13.5px] leading-relaxed text-ink-soft">
                      {g.items.join(" · ")}
                    </dd>
                  </div>
                ))}
              </dl>
            </section>
          </Reveal>
        </div>

        <aside className="lg:sticky lg:top-24 lg:self-start">
          <div className="rounded-2xl border border-line bg-surface/45 p-5">
            <p className="eyebrow mb-3">{locale === "id" ? "Ringkas" : "At a glance"}</p>
            <dl className="space-y-3.5">
              <Row k={locale === "id" ? "Nama" : "Name"} v={site.name} />
              <Row k={locale === "id" ? "Basis" : "Based" } v={site.location[locale]} />
              <Row k="Status" v={locale === "id" ? "Terbuka" : "Available"} />
              <Row k={locale === "id" ? "Balasan" : "Reply time"} v={locale === "id" ? "< 1 hari" : "< 1 day"} />
            </dl>
            <Link
              href="/contact"
              className="mt-6 flex h-11 w-full items-center justify-center rounded-full bg-ember text-sm font-semibold text-[#12100c] transition-colors hover:bg-ember-soft"
            >
              {t("cta.hire", locale)}
            </Link>
          </div>
        </aside>
      </div>
    </div>
  );
}

function Row({ k, v }: { k: string; v: string }) {
  return (
    <div>
      <dt className="font-mono text-[10px] uppercase tracking-[0.16em] text-ink-mute">{k}</dt>
      <dd className="mt-0.5 text-[13.5px] text-ink-soft">{v}</dd>
    </div>
  );
}
