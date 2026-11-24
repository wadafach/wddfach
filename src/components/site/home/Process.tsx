"use client";

import { t } from "@/lib/i18n";
import { useSettings } from "@/lib/store";
import { Reveal } from "@/components/ui/Reveal";

/**
 * Cara kerja.
 *
 * Satu kolom dengan garis waktu di kiri, bukan kartu-kartu.
 * Ini menjawab pertanyaan yang sebenarnya ditanyakan calon klien:
 * "kalau aku bayar, habis itu ngapain?"
 */
const steps = [
  {
    n: "01",
    title: { id: "Kamu kirim brief", en: "You send the brief" },
    body: {
      id: "Nggak perlu rapi. Chat WhatsApp juga cukup: mau bikin apa, buat siapa, kapan butuhnya. Referensi visual sangat membantu tapi bukan syarat.",
      en: "It doesn't need to be tidy. A WhatsApp message is fine: what you need, for whom, by when. Visual references help a lot but aren't required.",
    },
    meta: { id: "1 hari", en: "1 day" },
  },
  {
    n: "02",
    title: { id: "Aku konfirmasi scope & harga", en: "I confirm scope & price" },
    body: {
      id: "Aku balas dengan apa yang masuk, apa yang tidak, dan angka finalnya. Kalau kamu setuju baru lanjut — tidak ada biaya di tahap ini.",
      en: "I reply with what's in, what's out, and the final number. Only proceed if you agree — no cost at this stage.",
    },
    meta: { id: "1–2 hari", en: "1–2 days" },
  },
  {
    n: "03",
    title: { id: "Bayar", en: "Payment" },
    body: {
      id: "QRIS, DANA, atau transfer BCA. Kirim bukti transfer beserta kode pesanan, aku verifikasi manual dan konfirmasi via kontak yang kamu pilih.",
      en: "QRIS, DANA, or BCA transfer. Send the receipt with your order code; I verify manually and confirm through the contact you chose.",
    },
    meta: { id: "hari yang sama", en: "same day" },
  },
  {
    n: "04",
    title: { id: "Dikerjakan + revisi", en: "Work + revisions" },
    body: {
      id: "Aku kirim progres di tengah jalan supaya nggak ada kejutan di akhir. Jumlah revisi tergantung paketnya, dan aku selalu bilang dulu kalau permintaanmu di luar scope.",
      en: "I share progress along the way so there are no surprises at the end. Revision count depends on the package, and I'll always say when a request goes beyond scope.",
    },
    meta: { id: "sesuai paket", en: "per package" },
  },
  {
    n: "05",
    title: { id: "Serah terima file", en: "File handoff" },
    body: {
      id: "File sumber, ekspor, dan catatan teknis. Kalau butuh sesi handoff dengan developer-mu, itu bisa diatur.",
      en: "Source files, exports, and technical notes. If you need a handoff session with your developer, that can be arranged.",
    },
    meta: { id: "1 hari", en: "1 day" },
  },
];

export function HomeProcess() {
  const locale = useSettings((s) => s.locale);

  return (
    <section className="shell py-20 sm:py-28">
      <Reveal>
        <div className="max-w-2xl">
          <p className="eyebrow mb-3 flex items-center gap-2">
            <span className="h-px w-6 bg-ember/70" />
            {t("home.process", locale)}
          </p>
          <h2 className="text-2xl font-semibold sm:text-[2rem]">
            {locale === "id" ? "Dari chat sampai file ada di tanganmu." : "From first message to files in hand."}
          </h2>
        </div>
      </Reveal>

      <ol className="mt-12 max-w-3xl">
        {steps.map((s, i) => (
          <Reveal key={s.n} delay={i * 60}>
            <li className="relative grid grid-cols-[auto_1fr] gap-5 pb-10 last:pb-0">
              {/* garis waktu */}
              <div className="relative flex flex-col items-center">
                <span className="grid size-9 shrink-0 place-items-center rounded-full border border-line bg-surface font-mono text-[10.5px] text-ink-soft">
                  {s.n}
                </span>
                {i < steps.length - 1 && (
                  <span className="mt-1 w-px flex-1 bg-gradient-to-b from-line to-transparent" />
                )}
              </div>

              <div className="pb-1">
                <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                  <h3 className="text-[16px] font-semibold">{s.title[locale]}</h3>
                  <span className="font-mono text-[10.5px] uppercase tracking-widest text-ink-mute">
                    {s.meta[locale]}
                  </span>
                </div>
                <p className="mt-2.5 max-w-xl text-[13.5px] leading-[1.75] text-ink-soft">
                  {s.body[locale]}
                </p>
              </div>
            </li>
          </Reveal>
        ))}
      </ol>
    </section>
  );
}
