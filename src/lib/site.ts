/**
 * Site-wide configuration.
 *
 * ⚠️  PAYMENT DETAILS ARE NOT HERE.
 * Rekening/QRIS/nomor DANA TIDAK ditulis di file ini dan tidak masuk git.
 * Sementara (MVP) semuanya dibaca dari environment variable di `.env.local`.
 * Setelah admin panel jadi, nilainya pindah ke database dan diatur lewat /admin.
 */

export const site = {
  name: "wddfach",
  handle: "@wddfach",
  role: {
    id: "UI/UX Designer · 3D Artist · Game Concept Designer",
    en: "UI/UX Designer · 3D Artist · Game Concept Designer",
  },
  tagline: {
    id: "Aku desain antarmuka, bikin 3D, dan nggambar konsep senjata.",
    en: "I design interfaces, build 3D, and draw weapon concepts.",
  },
  location: {
    id: "Indonesia",
    en: "Indonesia",
  },
} as const;

/**
 * Kontak & sosial. Ganti nilai-nilainya dengan punyamu.
 * Kosongkan ("") kalau belum mau ditampilkan — otomatis disembunyikan.
 */
export const socials = {
  email: "wddfach13@gmail.com",
  instagram: "https://instagram.com/wddfach",
  tiktok: "https://tiktok.com/@wddfach",
  // Nomor Indonesia dalam format internasional untuk wa.me: 0 857... -> 62 857...
  whatsapp: "https://wa.me/6285745735862",
  // tambahan opsional:
  artstation: "",
  github: "",
} as const;

export type SocialKey = keyof typeof socials;

/**
 * Pembayaran — dibaca dari env, JANGAN hardcode di sini.
 *
 * Bikin file `.env.local` di root project (sudah masuk .gitignore) dan isi:
 *
 *   NEXT_PUBLIC_PAY_QRIS_IMAGE=/pay/qris.png
 *   NEXT_PUBLIC_PAY_DANA_NUMBER=08xxxxxxxxxx
 *   NEXT_PUBLIC_PAY_DANA_NAME=Nama Kamu
 *   NEXT_PUBLIC_PAY_BCA_NUMBER=1234567890
 *   NEXT_PUBLIC_PAY_BCA_NAME=Nama Kamu
 *   NEXT_PUBLIC_ORDER_EMAIL=halo@wddfach.com
 *   NEXT_PUBLIC_ORDER_WHATSAPP=6281234567890
 *
 * Simpan gambar QRIS-mu di `public/pay/qris.png`.
 * Kalau env belum diisi, halaman checkout otomatis menampilkan
 * peringatan "belum dikonfigurasi" alih-alih nomor palsu.
 */
export const payment = {
  qrisImage: process.env.NEXT_PUBLIC_PAY_QRIS_IMAGE ?? "",
  dana: {
    number: process.env.NEXT_PUBLIC_PAY_DANA_NUMBER ?? "",
    holder: process.env.NEXT_PUBLIC_PAY_DANA_NAME ?? "",
  },
  bca: {
    number: process.env.NEXT_PUBLIC_PAY_BCA_NUMBER ?? "",
    holder: process.env.NEXT_PUBLIC_PAY_BCA_NAME ?? "",
  },
  proofEmail: process.env.NEXT_PUBLIC_ORDER_EMAIL ?? "",
  proofWhatsapp: process.env.NEXT_PUBLIC_ORDER_WHATSAPP ?? "",
} as const;

export const isPaymentConfigured = () =>
  Boolean(payment.qrisImage || payment.dana.number || payment.bca.number);

/** Nomor rekening yang ditampilkan — hanya yang benar-benar terisi. */
export const activePayChannels = () => {
  const out: { key: "qris" | "dana" | "bca"; label: string; value: string; holder: string }[] = [];
  if (payment.qrisImage) out.push({ key: "qris", label: "QRIS", value: "Scan QR", holder: "" });
  if (payment.dana.number) out.push({ key: "dana", label: "DANA", value: payment.dana.number, holder: payment.dana.holder });
  if (payment.bca.number) out.push({ key: "bca", label: "BCA", value: payment.bca.number, holder: payment.bca.holder });
  return out;
};
