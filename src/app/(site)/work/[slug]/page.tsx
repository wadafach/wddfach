import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";

import { works } from "@/lib/content/works";
import { WorkDetail } from "@/components/site/WorkDetail";

export function generateStaticParams() {
  return works.map((w) => ({ slug: w.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const work = works.find((w) => w.slug === slug);
  if (!work) return { title: "Tidak ditemukan" };
  return {
    title: work.title.id,
    description: work.summary.id,
    openGraph: {
      title: work.title.id,
      description: work.summary.id,
      images: work.cover?.startsWith("/") ? [work.cover] : undefined,
    },
  };
}

export default async function WorkDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const work = works.find((w) => w.slug === slug);
  if (!work) notFound();

  const idx = works.findIndex((w) => w.slug === slug);
  const next = works[(idx + 1) % works.length];

  return (
    <>
      <WorkDetail work={work} />

      <div className="shell pb-20">
        <Link
          href={`/work/${next.slug}`}
          className="group flex flex-col gap-4 rounded-2xl border border-line bg-surface/40 p-6 transition-colors hover:border-ink-mute/60 sm:flex-row sm:items-center sm:justify-between"
        >
          <div>
            <p className="font-mono text-[10.5px] uppercase tracking-[0.18em] text-ink-mute">
              Berikutnya
            </p>
            <p className="mt-1.5 text-lg font-semibold transition-colors group-hover:text-ember">
              {next.title.id}
            </p>
          </div>
          <span className="grid size-10 shrink-0 place-items-center rounded-full border border-line text-ink-soft transition-colors group-hover:border-ember group-hover:text-ember">
            →
          </span>
        </Link>
      </div>
    </>
  );
}
