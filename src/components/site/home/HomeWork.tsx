"use client";

import Link from "next/link";

import { works } from "@/lib/content/works";
import { t } from "@/lib/i18n";
import { useSettings } from "@/lib/store";
import { SectionHead } from "@/components/ui/bits";
import { Reveal } from "@/components/ui/Reveal";
import { WorkCard } from "@/components/site/WorkCard";

export function HomeWork() {
  const locale = useSettings((s) => s.locale);
  const featured = works.filter((w) => w.featured).slice(0, 6);
  const list = featured.length > 0 ? featured : works.slice(0, 6);

  return (
    <section id="selected-work" className="shell py-20 sm:py-28 scroll-mt-24">
      <Reveal>
        <SectionHead
          label={t("home.selected", locale)}
          title={t("home.selected", locale)}
          sub={t("home.selected.sub", locale)}
          right={
            <Link
              href="/work"
              className="inline-flex h-10 shrink-0 items-center gap-2 rounded-full border border-line px-5 text-[13px] font-medium text-ink-soft transition-colors hover:border-ink-mute hover:text-ink"
            >
              {t("cta.viewAll", locale)}
              <span aria-hidden>→</span>
            </Link>
          }
        />
      </Reveal>

      <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {list.map((w, i) => (
          <Reveal key={w.slug} delay={i * 70}>
            <WorkCard work={w} index={i} />
          </Reveal>
        ))}
      </div>
    </section>
  );
}
