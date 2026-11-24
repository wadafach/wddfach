import type { Locale } from "./types";

/**
 * Kamus teks antarmuka. Konten (judul karya, deskripsi produk) tidak di sini —
 * itu punya field `id`/`en` masing-masing di file content.
 */
export const dict = {
  "nav.home": { id: "Beranda", en: "Home" },
  "nav.work": { id: "Karya", en: "Work" },
  "nav.services": { id: "Jasa & Produk", en: "Services" },
  "nav.about": { id: "Tentang", en: "About" },
  "nav.contact": { id: "Kontak", en: "Contact" },
  "nav.order": { id: "Pesan", en: "Order" },
  "nav.admin": { id: "Admin", en: "Admin" },

  "cta.seeWork": { id: "Lihat Karya", en: "See Work" },
  "cta.hire": { id: "Pesan Jasa", en: "Hire Me" },
  "cta.browse": { id: "Telusuri Semua", en: "Browse All" },
  "cta.detail": { id: "Detail", en: "Details" },
  "cta.order": { id: "Pesan Sekarang", en: "Order Now" },
  "cta.addToOrder": { id: "Tambah ke Pesanan", en: "Add to Order" },
  "cta.added": { id: "Sudah di Pesanan", en: "In Order" },
  "cta.back": { id: "Kembali", en: "Back" },
  "cta.checkout": { id: "Lanjut ke Pembayaran", en: "Continue to Payment" },
  "cta.copy": { id: "Salin", en: "Copy" },
  "cta.copied": { id: "Tersalin", en: "Copied" },
  "cta.sendProof": { id: "Kirim Bukti Transfer", en: "Send Payment Proof" },
  "cta.viewAll": { id: "Lihat Semua", en: "View All" },

  "home.hero.available": { id: "Terbuka untuk proyek", en: "Open for projects" },
  "home.hero.scroll": { id: "Gulir", en: "Scroll" },
  "home.selected": { id: "Karya Pilihan", en: "Selected Work" },
  "home.selected.sub": {
    id: "Sebagian yang menurutku paling nunjukin cara aku kerja.",
    en: "A few pieces that best show how I work.",
  },
  "home.services": { id: "Yang Aku Kerjakan", en: "What I Do" },
  "home.services.sub": {
    id: "Dari wireframe sampai asset 3D siap pakai.",
    en: "From wireframes to production-ready 3D assets.",
  },
  "home.process": { id: "Cara Kerja", en: "How It Works" },
  "home.cta.title": { id: "Punya proyek? Ceritain aja.", en: "Got a project? Tell me about it." },
  "home.cta.sub": {
    id: "Nggak perlu brief yang rapi. Kirim referensi, kasih deadline, sisanya aku bantu rapihin.",
    en: "No polished brief needed. Send references and a deadline, I'll help shape the rest.",
  },

  "work.all": { id: "Semua", en: "All" },
  "work.uiux": { id: "UI/UX", en: "UI/UX" },
  "work.threed": { id: "3D", en: "3D" },
  "work.gameart": { id: "Game Art", en: "Game Art" },
  "work.empty": { id: "Belum ada karya di kategori ini.", en: "Nothing in this category yet." },
  "work.role": { id: "Peran", en: "Role" },
  "work.year": { id: "Tahun", en: "Year" },
  "work.tools": { id: "Tools", en: "Tools" },
  "work.model3d": { id: "Model 3D", en: "3D Model" },
  "work.dragHint": { id: "Geser untuk memutar", en: "Drag to rotate" },

  "svc.service": { id: "Jasa", en: "Service" },
  "svc.digital": { id: "Produk Digital", en: "Digital Product" },
  "svc.deliverables": { id: "Yang kamu dapat", en: "What you get" },
  "svc.turnaround": { id: "Estimasi", en: "Turnaround" },
  "svc.from": { id: "Mulai dari", en: "From" },
  "svc.askPrice": { id: "Hubungi untuk harga", en: "Contact for price" },
  "svc.empty": { id: "Belum ada yang dipasang.", en: "Nothing listed yet." },

  "cart.title": { id: "Pesanan Kamu", en: "Your Order" },
  "cart.empty": { id: "Keranjang masih kosong.", en: "Your cart is empty." },
  "cart.subtotal": { id: "Subtotal", en: "Subtotal" },
  "cart.total": { id: "Total", en: "Total" },
  "cart.remove": { id: "Hapus", en: "Remove" },
  "cart.note": {
    id: "Harga jasa bisa berubah setelah brief dilihat. Admin akan konfirmasi dulu sebelum kamu bayar.",
    en: "Service pricing can change once the brief is reviewed. I'll confirm before you pay.",
  },

  "checkout.title": { id: "Pembayaran", en: "Checkout" },
  "checkout.yourData": { id: "Data Kamu", en: "Your Details" },
  "checkout.name": { id: "Nama", en: "Name" },
  "checkout.contact": { id: "Kontak (WA atau email)", en: "Contact (WhatsApp or email)" },
  "checkout.channel": { id: "Kirim lewat", en: "Send via" },
  "checkout.note": { id: "Catatan / brief singkat", en: "Note / short brief" },
  "checkout.notePh": {
    id: "Mau bikin apa, kira-kira kapan butuhnya.",
    en: "What you need, and roughly when.",
  },
  "checkout.step1": { id: "1. Ringkasan", en: "1. Summary" },
  "checkout.step2": { id: "2. Bayar", en: "2. Pay" },
  "checkout.step3": { id: "3. Kirim bukti", en: "3. Send proof" },
  "checkout.payTo": { id: "Bayar ke", en: "Pay to" },
  "checkout.accountHolder": { id: "Atas nama", en: "Account holder" },
  "checkout.amount": { id: "Jumlah", en: "Amount" },
  "checkout.orderCode": { id: "Kode pesanan", en: "Order code" },
  "checkout.codeHint": {
    id: "Tulis kode ini di keterangan transfer / chat, biar aku gampang cocokin.",
    en: "Put this code in the transfer note or chat so I can match it.",
  },
  "checkout.proofHint": {
    id: "Setelah transfer, kirim screenshot bukti beserta kode pesanan. Aku verifikasi manual, biasanya di hari yang sama.",
    en: "After transferring, send a screenshot of the receipt with the order code. I verify manually, usually same day.",
  },
  "checkout.notConfigured": {
    id: "Metode pembayaran belum dikonfigurasi.",
    en: "Payment methods are not configured yet.",
  },
  "checkout.notConfiguredHint": {
    id: "Isi variabel pembayaran di file .env.local (lihat src/lib/site.ts), lalu restart dev server.",
    en: "Fill the payment variables in .env.local (see src/lib/site.ts), then restart the dev server.",
  },
  "checkout.empty": {
    id: "Keranjang kosong — tidak ada yang perlu dibayar.",
    en: "Nothing in the cart — nothing to pay yet.",
  },
  "checkout.needData": { id: "Isi nama dan kontak dulu.", en: "Fill in your name and contact first." },

  "settings.title": { id: "Tampilan & Kinerja", en: "Display & Performance" },
  "settings.scene": { id: "Efek 3D", en: "3D effect" },
  "settings.scene.full": { id: "Penuh", en: "Full" },
  "settings.scene.reduced": { id: "Ringan", en: "Light" },
  "settings.scene.off": { id: "Mati", en: "Off" },
  "settings.sceneHint": {
    id: "Kalau HP-mu ngelag atau baterainya boros, turunin ke Ringan atau Mati. Latarnya tetap cantik.",
    en: "If your phone lags or drains battery, drop it to Light or Off. The backdrop still looks good.",
  },
  "settings.lang": { id: "Bahasa", en: "Language" },
  "settings.reduceMotion": { id: "Kurangi animasi", en: "Reduce animation" },
  "settings.autoNote": {
    id: "Otomatis disetel dari kemampuan perangkatmu.",
    en: "Auto-set from your device capability.",
  },

  "footer.tagline": { id: "Dibikin sendiri pakai Next.js + Three.js.", en: "Hand-built with Next.js + Three.js." },
  "footer.rights": { id: "Semua hak dilindungi.", en: "All rights reserved." },

  "admin.title": { id: "Panel Admin", en: "Admin Panel" },
  "admin.subtitle": {
    id: "Kelola karya, jasa/produk, dan pesanan.",
    en: "Manage work, services, and orders.",
  },
  "admin.login": { id: "Masuk", en: "Sign in" },
  "admin.password": { id: "Kata sandi admin", en: "Admin password" },
  "admin.wrongPassword": { id: "Kata sandi salah.", en: "Wrong password." },
  "admin.notConfigured": {
    id: "ADMIN_PASSWORD belum diisi di .env.local.",
    en: "ADMIN_PASSWORD is not set in .env.local.",
  },
  "admin.logout": { id: "Keluar", en: "Sign out" },
  "admin.tab.works": { id: "Karya", en: "Work" },
  "admin.tab.products": { id: "Jasa & Produk", en: "Services" },
  "admin.tab.orders": { id: "Pesanan", en: "Orders" },
  "admin.tab.payment": { id: "Pembayaran", en: "Payment" },
  "admin.readonly": {
    id: "Mode baca. Menyimpan perubahan butuh Supabase — lihat README.",
    en: "Read-only. Saving changes requires Supabase — see README.",
  },

  "status.pending": { id: "Menunggu bayar", en: "Awaiting payment" },
  "status.confirmed": { id: "Dikonfirmasi", en: "Confirmed" },
  "status.in_progress": { id: "Dikerjakan", en: "In progress" },
  "status.delivered": { id: "Selesai", en: "Delivered" },
  "status.cancelled": { id: "Dibatalkan", en: "Cancelled" },

  "common.close": { id: "Tutup", en: "Close" },
  "common.loading": { id: "Memuat…", en: "Loading…" },
  "common.optional": { id: "opsional", en: "optional" },
} as const;

export type DictKey = keyof typeof dict;

export function t(key: DictKey, locale: Locale): string {
  return dict[key][locale];
}
