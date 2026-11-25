# wddfach Design Research

Tanggal riset: 24 November 2026. Dokumen ini bukan klaim ranking absolut; ini adalah review set 40 platform yang dipilih dari dua kelompok: situs dengan penggunaan/kunjungan tinggi dan produk/galleries yang sering dijadikan referensi desain. Tujuannya mengambil prinsip, bukan menyalin layar atau identitas merek.

## Cara baca

- **Traffic / usage signal:** daftar Similarweb dan ringkasan ranking publik dipakai untuk memilih platform yang sering dipakai. Ranking berubah menurut negara dan bulan, jadi keputusan wddfach tidak bergantung pada urutan satu snapshot.
- **Design-system signal:** Apple HIG, Material 3, Vercel Geist, GitHub Primer, Shopify Polaris, dan halaman resmi produk dipakai untuk menguji tipografi, hierarchy, spacing, dan accessibility.
- **Inspiration signal:** Awwwards, Webflow Inspiration, SiteInspire, Land-book, Dribbble, Behance, dan One Page Love dipakai untuk melihat pola presentasi portfolio/marketing.
- Ukuran/font di bawah adalah **rentang desain yang diamati atau prinsip yang disarankan**, bukan klaim bahwa semua CSS internal platform memakai angka yang sama.

## 40 platform dan keputusan desainnya

| # | Platform | Surface utama | Observasi yang berguna | Keputusan untuk wddfach |
|---:|---|---|---|---|
| 1 | Google Search | Decide/Act | Search box menjadi satu fokus; whitespace besar mengurangi beban keputusan. | Hero harus punya satu pesan dan satu CTA utama, bukan banyak panel. |
| 2 | YouTube | Explore/Watch | Thumbnail dan judul memimpin; metadata kecil tapi konsisten; grid menyesuaikan viewport. | Kartu karya memakai rasio gambar konsisten, judul jelas, metadata sekunder. |
| 3 | Facebook | Monitor/Feed | Feed panjang memakai repeated rhythm dan composer yang mudah ditemukan. | Section portfolio perlu rhythm berulang tanpa membuat semua elemen sama penting. |
| 4 | Instagram | Explore/Media | Media menjadi anchor; chrome dan metadata tidak mengambil alih gambar. | Untuk karya visual, gambar didahulukan; copy menjelaskan keputusan setelahnya. |
| 5 | TikTok | Watch/Discover | Satu media dominan per viewport dan gesture/scroll sangat langsung. | Hero 3D tidak boleh bersaing dengan pesan; interaksi harus memiliki hint singkat. |
| 6 | Wikipedia | Learn/Explore | Typographic hierarchy dan navigasi isi mengalahkan dekorasi. | Halaman detail karya memakai heading, caption, dan struktur proses yang bisa dipindai. |
| 7 | Reddit | Explore/Discuss | Voting, replies, dan context membentuk hierarchy; density tinggi tetapi berulang. | Admin/order list memakai tabel dan status yang konsisten, bukan kartu dekoratif. |
| 8 | Amazon | Compare/Buy | Harga, availability, rating, dan CTA didekatkan karena keputusan pembelian. | Service card harus menyatukan harga, unit, deliverables, estimasi, CTA. |
| 9 | WhatsApp Web | Act/Message | Conversation list dan active thread dipisahkan; action utama mudah dicari. | Contact/checkout harus memisahkan data pembeli, ringkasan order, dan konfirmasi. |
| 10 | X | Feed/Monitor | Short-form content dan action row mengutamakan scan cepat. | Gunakan copy pendek pada label; jangan membuat metadata lebih dominan dari karya. |
| 11 | ChatGPT | Configure/Inspect | Input menjadi pusat; history dan state memberi continuity. | Brief/contact form harus punya input utama yang jelas dan status sukses/error. |
| 12 | Netflix | Explore/Watch | Artwork besar untuk mood, metadata minimal, dan rows membantu browsing. | Featured work boleh besar; katalog sisanya memakai grid yang lebih tenang. |
| 13 | LinkedIn | Learn/Network | Profile proof, role, dan CTA disusun untuk trust sebelum contact. | Homepage perlu menjawab siapa pembuatnya dan bukti karya sebelum menjual jasa. |
| 14 | Pinterest | Explore/Save | Image-first masonry memberi banyak entry points tetapi tetap mengandalkan visual. | Grid karya boleh variatif di detail, tetapi cover index tetap seragam agar tidak kacau. |
| 15 | GitHub | Operate/Inspect | Monochrome UI, status, tabs, dan code typography meningkatkan rasa alat kerja. | Admin memakai light workspace, tabs, status badges, dan density lebih tinggi dari public site. |
| 16 | Microsoft | Operate/Configure | Product family luas butuh global navigation dan label yang eksplisit. | Jangan memakai label puitis untuk route penting seperti Checkout, Work, Admin. |
| 17 | Apple | Decide/Learn | Pacing, whitespace, dan visual besar membuat satu ide per band terasa premium. | Public homepage memakai section one-idea-at-a-time dan section spacing besar. |
| 18 | Airbnb | Explore/Book | Search, filters, imagery, price, dan trust cues berurutan menuju booking. | Katalog jasa perlu filter/kategori, harga, scope, lalu CTA. |
| 19 | Spotify | Explore/Listen | Dark canvas, artwork, bold heading, dan green accent membangun recognition. | Cosmic dark boleh dipertahankan, tetapi accent ember harus reserved untuk action. |
| 20 | Canva | Create/Explore | Template visual dan action creation didekatkan; onboarding mengurangi blank-canvas anxiety. | Beri contoh deliverables dan proses agar calon client tidak bingung harus mengirim brief apa. |
| 21 | Figma | Create/Inspect | Canvas menjadi pusat, properties/context berada di sekelilingnya. | Weapon viewer menaruh model sebagai focus, controls sebagai secondary hint. |
| 22 | Notion | Learn/Configure | Text-first hierarchy, block rhythm, dan low-chrome surface membuat editing terasa ringan. | About/process menggunakan paragraf terukur dan divider, bukan banyak card. |
| 23 | Linear | Operate/Inspect | Tight spacing, restrained color, keyboard-friendly navigation, dan status taxonomy. | Order/admin butuh compact table, consistent status, dan action proximity. |
| 24 | Vercel | Decide/Build | Monochrome precision, strong type, code snippets, dan one high-contrast CTA. | Pertahankan dark precision; kurangi gradient/planet agar brand terasa lebih fokus. |
| 25 | Stripe | Decide/Compare | Editorial type scale dan satu CTA kuat per band membuat kompleksitas terasa sederhana. | Satu primary CTA per section; pricing copy jangan disebar ke banyak tombol. |
| 26 | Framer | Decide/Create | Motion dan large visual dipakai sebagai demonstrasi kemampuan, bukan dekorasi acak. | Motion 3D harus menunjukkan bentuk/interaction, bukan loop yang mengalahkan content. |
| 27 | Webflow | Explore/Create | Showcase, templates, dan creator proof membantu user mulai dari contoh. | Featured works harus dipakai sebagai proof; jangan menambah statistik palsu. |
| 28 | Shopify | Compare/Buy | Product media, variant, price, and checkout pattern sangat eksplisit. | Product/service data wajib punya unit, price, deliverable, turnaround, dan next step. |
| 29 | Supabase | Decide/Build | Technical audience diberi proof lewat code, docs, dan clear product modules. | Tampilkan tools dan constraints nyata, bukan istilah kosong seperti “innovative”. |
| 30 | Raycast | Command/Operate | Command palette, compact rows, dan shortcuts mengoptimalkan speed. | Admin boleh lebih padat; public site tidak perlu meniru density ini. |
| 31 | Sentry | Monitor/Inspect | Status, severity, and timeline memberi sense of what needs attention. | Checkout/admin harus membedakan pending, confirmed, in progress, delivered, cancelled dengan text + color. |
| 32 | Miro | Explore/Create | Canvas luas memberi rasa ruang; onboarding dan templates mengarahkan tindakan pertama. | Cosmic background boleh memberi ruang, tetapi content container tetap menjadi anchor. |
| 33 | Awwwards | Explore/Inspiration | Thumbnail-first gallery dan filters memudahkan perbandingan visual cepat. | Work index perlu kategori/filter yang jelas dan preview cepat. |
| 34 | Webflow Inspiration | Explore/Inspiration | Full-page examples membantu melihat rhythm, not just isolated components. | Audit wddfach harus memeriksa hubungan antar-section, bukan hanya kartu individual. |
| 35 | SiteInspire | Explore/Inspiration | Screenshot and category browsing memudahkan menemukan pola berdasarkan type/site. | Gunakan kategori UI/UX, 3D, Game Art sebagai information scent. |
| 36 | Land-book | Explore/Inspiration | Landing-page previews menonjolkan composition dan above-the-fold clarity. | Hero perlu langsung menjelaskan layanan dan bukti, bukan hanya logo/scene. |
| 37 | Dribbble | Explore/Showcase | Thumbnail kuat dan detail pendek mengundang click-through; kualitas frame sangat penting. | Portfolio cover harus crop yang sengaja, bukan gambar penuh yang tidak terbaca. |
| 38 | Behance | Explore/Case study | Long-form case studies memberi ruang untuk proses, context, dan final outcome. | Detail karya harus menjawab problem, choices, output, dan tools. |
| 39 | One Page Love | Explore/Pattern | One-page sites memadatkan narrative ke section rhythm dan clear CTA. | Snapshot/static preview bisa one-page, tetapi app production tetap memisahkan route penting. |
| 40 | Mobbin | Explore/Reference | Flow dan screen sequence lebih berguna daripada screenshot tunggal. | UI/UX work detail sebaiknya menampilkan beberapa state atau gallery, bukan cover saja. |

## Temuan lintas platform

### Hierarchy

Platform yang cepat dipahami hampir selalu mempunyai satu anchor per viewport: search/input, media, product choice, atau action. Masalah desain bukan kurangnya dekorasi, tetapi terlalu banyak elemen yang meminta perhatian pada saat yang sama.

### Font dan ukuran

- Product UI modern cenderung memakai sans yang netral/legible untuk body; display face boleh lebih khas selama tidak mengorbankan scanability.
- Design systems membedakan role seperti display, headline, title, body, dan label daripada menaruh ukuran acak pada tiap komponen.
- Body 15–16px dengan line-height sekitar 1.5–1.75 aman untuk copy bilingual; label 10–12px cocok untuk metadata tetapi tidak untuk instruksi penting.
- Weight dan spacing mengerjakan hierarchy sebelum warna. wddfach memakai Space Grotesk untuk display, Plus Jakarta Sans untuk body, dan JetBrains Mono hanya untuk technical metadata.

### Layout dan proporsi

- Marketing/portfolio terbaik memberi ruang besar antar-idea, tetapi isi dalam satu idea tetap rapat dan terukur.
- Gallery/explore memakai image-first layout; checkout/admin memakai action-first layout.
- Grid tidak selalu berarti tiga kartu sama rata. Featured work, filter, detail, dan CTA harus punya bobot yang berbeda.
- Container stabil membuat situs terasa tenang ketika breakpoint berubah. wddfach memakai shell maksimum 76rem dan spacing 4/8.

### Motion dan background

- Motion berguna saat menunjukkan continuity, state, atau material. Loop dekoratif yang tidak membantu cepat terasa seperti noise.
- Cosmic background seharusnya menjadi depth layer: gradient, starfield tipis, dan meteor jarang. Planet besar hanya boleh menjadi optional art direction, bukan default wallpaper.
- WebGL perlu fallback dan reduced-motion; interaksi model 3D harus mempunyai camera default yang sudah enak dilihat sebelum user menyentuhnya.

## Perbandingan penempatan tombol dan pola UX

| Surface | Pola yang berulang pada platform riset | Risiko jika salah | Keputusan wddfach |
|---|---|---|---|
| Hero / landing | Google, Apple, Vercel, Stripe menaruh satu CTA dekat value proposition; CTA kedua dibuat quiet atau diturunkan. | User melihat visual tetapi tidak tahu langkah berikutnya. | Primary `View work`/`Start a project` berada setelah copy inti; visual 3D tidak menjadi tombol palsu. |
| Portfolio index | YouTube, Instagram, Awwwards, Dribbble, Mobbin mengutamakan media/title; filter berada sebelum atau dekat grid. | Filter tersembunyi membuat browsing terasa lambat. | Filter kategori berada sebelum grid, dengan target sentuh besar dan state aktif terbaca tanpa warna saja. |
| Work detail | Behance, GitHub, Apple case-study pattern meletakkan context dulu, lalu proof, lalu next action. | CTA terlalu awal terasa menjual sebelum trust terbentuk. | `Back to work` di atas; `Discuss a project` setelah summary/proof; gallery tidak menghalangi navigasi. |
| Services / products | Amazon, Airbnb, Shopify menyatukan image, title, price, scope, availability, dan action. | User harus menebak apa yang dibeli dan berapa biaya. | Kartu menampilkan deliverables, turnaround, unit, price, lalu satu CTA utama `Add to brief`/`Buy service`. |
| Checkout | WhatsApp, Shopify, Stripe menjaga ringkasan order dekat form dan submit menjadi aksi terakhir. | User kehilangan konteks atau mengirim form kosong. | Summary persisten di desktop, summary di atas form pada mobile; validasi inline; submit hanya aktif ketika data minimum lengkap. |
| Contact | LinkedIn, Canva, Miro mengurangi blank-canvas anxiety dengan contoh input/brief. | User tidak tahu harus menulis apa. | Placeholder dan contoh brief menjelaskan konteks; CTA memakai kata kerja dan feedback sukses/error terlihat. |
| Admin | GitHub, Linear, Sentry mengutamakan action proximity, status, dan density informatif. | Admin harus membuka banyak halaman untuk aksi rutin. | Tab jelas, status memakai teks + warna, action berada di baris record dan punya focus state. |
| Mobile long page | TikTok, Netflix, Spotify menggunakan satu primary interaction per viewport dan repeated rhythm. | Banyak tombol kecil dan whitespace kosong membuat scroll melelahkan. | CTA minimum 44px, stack layout, section spacing dipadatkan, dan action penting diulang setelah content bernilai. |

### Aturan placement yang diturunkan

1. Tombol ditempatkan setelah user memahami nilai/objek yang akan dipilih, bukan sebelum context.
2. Satu viewport tidak boleh meminta dua keputusan primer sekaligus.
3. Action yang mengubah state memakai kata kerja jelas: `View`, `Add`, `Continue`, `Submit`, `Buy`; bukan label abstrak.
4. Tombol yang terlihat harus benar-benar memiliki handler atau link valid; dekorasi tidak boleh memakai elemen button.
5. Mobile memakai stack satu kolom, target sentuh minimum 44×44px, dan tidak meninggalkan ruang kosong yang tidak memberi fungsi.
6. Setelah aksi, tampilkan feedback dekat titik aksi: loading, success, validation, atau error.

## Keputusan revisi wddfach

1. Default cosmic scene tidak lagi merender planet; CSS gradient + starfield + occasional meteor menjadi baseline.
2. Weapon preview diperlakukan sebagai procedural interpretation, bukan klaim bahwa gambar AI otomatis menjadi model 3D.
3. Semua visible copy pada weapon showcase sekarang memiliki ID/EN branch.
4. Design tokens dan rules ditulis di `DESIGN.md`.
5. Kaidah reusable disimpan sebagai skill `kaidah-design`.
6. Audit locale harus berjalan pada semua route, termasuk alt text, hints, empty/error state, dan admin.

## Sources

- Similarweb Top Websites: https://www.similarweb.com/top-websites/
- Similarweb methodology: https://support.similarweb.com/hc/en-us/articles/213856729-Top-Websites
- Awwwards 2025: https://www.awwwards.com/websites/2025
- Awwwards gallery: https://www.awwwards.com/websites
- Webflow inspiration index: https://webflow.com/blog/web-design-inspiration
- Apple HIG Typography: https://developer.apple.com/design/human-interface-guidelines/typography.md
- Apple HIG Layout: https://developer.apple.com/design/human-interface-guidelines/layout.md
- Apple HIG accessibility: https://developer.apple.com/design/human-interface-guidelines/accessibility/overview/text-size-and-weight
- Material 3 typography: https://m3.material.io/styles/typography/applying-type
- Vercel Geist typography: https://vercel.com/geist/typography
- Vercel Geist system: https://vercel.com/geist/introduction
- GitHub Primer: https://primer.style/
- GitHub Primer typography: https://primer.style/foundations/typography
- Shopify Polaris typography: https://polaris-site-prod-kit.shopify.prod.shopifyapps.com/design/typography
- Shopify Polaris spacing: https://polaris-site-prod-kit.shopify.prod.shopifyapps.com/tokens/space
- Linear redesign: https://linear.app/now/how-we-redesigned-the-linear-ui
- Stripe accessible color systems: https://stripe.com/blog/accessible-color-systems
- SiteInspire e-commerce gallery: https://siteinspire.com/websites/category/e-commerce
