"use client";

import { useMemo, useState } from "react";

import { works } from "@/lib/content/works";
import { t } from "@/lib/i18n";
import { useSettings } from "@/lib/store";
import type { WorkCategory } from "@/lib/types";
import { cn } from "@/lib/utils";
import { WorkCard } from "@/components/site/WorkCard";
import { Reveal } from "@/components/ui/Reveal";

const cats: (WorkCategory | "all")[] = ["all", "uiux", "threed", "gameart"];

export default function WorkIndexPage() {
  const locale = useSettings((s) => s.locale);
  const [filter, setFilter] = useState<WorkCategory | "all">("all");

  const counts = useMemo(() => {
    const m = new Map<string, number>();
    m.set("all", works.length);
    for (const w of works) m.set(w.category, (m.get(w.category) ?? 0) + 1);
    return m;
  }, []);

  const list = filter === "all" ? works : works.filter((w) => w.category === filter);

  return (
    <div className="shell py-14 sm:py-20">
      <Reveal>
        <header className="max-w-2xl">
          <p className="eyebrow mb-3 flex items-center gap-2">
            <span className="h-px w-6 bg-ember/70" />
            {t("nav.work", locale)}
          </p>
          <h1 className="text-[2rem] font-semibold leading-tight sm:text-[2.6rem]">
            {locale === "id" ? "Karya." : "Work."}
          </h1>
          <p className="mt-4 text-[15px] leading-relaxed text-ink-soft">
            {locale === "id"
              ? "Semua yang pernah aku kerjakan, disaring jadi tiga kategori. Klik salah satu untuk lihat proses dan keputusannya."
              : "Everything I've worked on, sorted into three categories. Open one to see the process and the decisions."}
          </p>
        </header>
      </Reveal>

      {/* Filter: tab bertekstur mono, jumlahnya ikut tampil supaya
          user tahu apa yang kosong sebelum mengklik. */}
      <Reveal delay={60}>
        <div className="mt-10 flex flex-wrap gap-2" role="tablist" aria-label="Kategori">
          {cats.map((c) => {
            const n = counts.get(c) ?? 0;
            const on = filter === c;
            return (
              <button
                key={c}
                role="tab"
                aria-selected={on}
                onClick={() => setFilter(c)}
                className={cn(
                  "inline-flex items-center gap-2 rounded-full border px-4 py-2 text-[13px] transition-colors",
                  on
                    ? "border-ember/60 bg-ember/12 text-ember"
                    : "border-line bg-surface/40 text-ink-soft hover:border-ink-mute hover:text-ink",
                )}
              >
                {c === "all" ? t("work.all", locale) : t(`work.${c}` as "work.uiux", locale)}
                <span className="font-mono text-[10px] text-ink-mute">{n}</span>
              </button>
            );
          })}
        </div>
      </Reveal>

      {list.length === 0 ? (
        <p className="py-24 text-center text-[14px] text-ink-mute">{t("work.empty", locale)}</p>
      ) : (
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {list.map((w, i) => (
            <Reveal key={w.slug} delay={Math.min(i, 6) * 60}>
              <WorkCard work={w} index={i} />
            </Reveal>
          ))}
        </div>
      )}
    </div>
  );
}
