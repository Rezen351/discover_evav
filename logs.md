# 📝 Development Logs — Discover Evav

> Log perkembangan proyek sesuai `AGENTS.md` §3.1. Status: ✅ Done · 🟡 In Progress · ❌ Blocked · 📝 Catatan.

---

## 2026-07-16 — Page Design Docs & Enhancement (Sub-Agent Paralel)

| Tanggal | Aktivitas | Status | Catatan |
|---------|-----------|--------|---------|
| 2026-07-16 | Buat 5 dokumen desain page dari copywriting PDF (`docs/Copywriting/{Explore,Culture,Heritage,Taste}.pdf`) + 1 improvisasi (`/keterhubungan`) | ✅ | Mapping navbar: Explore→`/destinasi`, Culture→`/budaya`, Heritage→`/sejarah`, Taste→`/kuliner`, Contact→`/keterhubungan`. Output `docs/page-designs/{destinasi,budaya,sejarah,kuliner,keterhubungan}.md`. Semua agent-readable & patuh `GRAND_DESIGN.md`. |
| 2026-07-16 | Enhance layout/desain tiap page (web research 2025-2026 + GSAP/grid/flexbox) | ✅ | Tambah bagian "ENHANCEMENT / EKSPLORASI LAYOUT" di ke-5 doc. Ide: sticky pin, horizontal scroll, bento, parallax, mask reveal, magnetic CTA. Patuh §6.5 Design Restraint. |
| 2026-07-16 | Review dokumentasi full-stack (README, docker-compose, .env, rute) | ✅ | Temukan isu: `.env` bocor (aman, tidak ter-track), docker-compose dokumentasikan DB/MINIO belum dipakai, rute `/link` vs `/keterhubungan` bentrok, kurang `.dockerignore`. |
| 2026-07-16 | Perbaiki dokumentasi (5 sub-agent) | ✅ | `.env.example` dibuat, `.gitignore` dikonsolidasi, `.dockerignore` dibuat, docker-compose `db/minio/cloudflared` ditandai PLANNED + hapus `depends_on`, folder `src/app/link` dihapus (rute tunggal `/keterhubungan`). |
| 2026-07-16 | Implementasi enhancement ke kode (6 page) | ✅ | `/sejarah` dibuat dari nol (page + `src/content/sejarah.ts` + komponen). 5 page lain di-enhance. `npx tsc --noEmit` → EXIT=0. |

## 2026-07-17 — Landing Page Enhancement & Finalisasi

| Tanggal | Aktivitas | Status | Catatan |
|---------|-----------|--------|---------|
| 2026-07-17 | Buat `docs/page-designs/landing.md` (enhancement landing, improvisasi + web research) | ✅ | Struktur 8 section existing + 8 ide eksplorasi, matriks kepatuhan §6.5. |
| 2026-07-17 | Implementasi enhancement landing page (`/`) | ✅ | StatsCounter, QuoteMarquee, JourneyMap parallax, Contact magnetic CTA + parallax. `tsc` EXIT=0. Tidak tambah progress bar/skeleton (patuh §6.5). |
| 2026-07-17 | Update `GRAND_DESIGN.md` changelog §13 (page design docs) | ✅ | Dicatat pembuatan 6 page design docs + referensi file. |
| 2026-07-17 | Perbaikan hilangnya konten landing page & interaksi explore hero | ✅ | Pindah scroll snap container ke viewport level (html/body) untuk mengaktifkan window scroll + fix target/trigger reveal text & cards hero. |
| 2026-07-17 | Glassmorphism navbar & penyesuaian padding tiap section landing | ✅ | Ubah background navbar ke efek glass (transparan frosted) + ubah tinggi section ke min-h-screen dan tambah top padding agar tidak menabrak navbar. |
| 2026-07-17 | Penghapusan semua progress bar | ✅ | Menghapus global top ReadingProgress serta indikator visual progress bar autoplay di section FunFact, BudayaAdat, dan DestinasiTerbaik. |
| 2026-07-17 | Optimasi threshold ScrollTrigger section landing | ✅ | Mengubah threshold ScrollTrigger masuk dari 65%/70%/80% ke 95%/bottom agar konten di bagian bawah section (seperti StatsCounter) langsung muncul saat snap aktif. |
| 2026-07-17 | Layout compacting pada FunFact & StatsCounter | ✅ | Mengurangi tinggi card (350px->260px–310px), merapatkan flex gap, mengurangi top padding section, dan mengurangi margin atas stats counter agar seluruh konten muat dalam satu layar viewport laptop. |
| 2026-07-17 | Redesain Layout Balans JourneyMapSection | ✅ | Memindahkan selector destinasi ke tab bar baris 1 header, mengecilkan banner gambar menjadi landscape (200px-240px), dan merelokasi detail/stats ke bawah banner dengan kontras teks gelap di wadah kaca terang agar layout seimbang & penuh seperti FunFact. |
| 2026-07-17 | Custom Glassmorphism Pink-White & Hapus Scrollbar | ✅ | Menghapus warna Teal (#63BEB8) dari gradien active tab, kartu stats, blob bg, dan marker map untuk mencegah bias hijau. Menggunakan Pink (#ED5E76) & White/Glass. Menambahkan CSS .no-scrollbar untuk menyembunyikan scrollbar horizontal di baris tab. |
| 2026-07-17 | Padding Tab Bar (Cegah Clipped Active Tab) | ✅ | Menambahkan horizontal padding `px-3` dan vertical padding `py-2` pada scroll container tab agar tombol aktif yang membesar (`scale-[1.03]`) tidak terpotong tepi. |
| 2026-07-17 | Susun `docs/page-designs/landing-page.md` sebagai SSOT Layout Landing Page | ✅ | Mengubah dokumen desain landing page menjadi aturan desain resmi (SSOT). Menambahkan spesifikasi background solid tombol CTA & menu pill di Journey Map, standardisasi tab kategori & CTA di Destinasi Terbaik (menghapus gradien pastel salah tempat), serta menyingkirkan hex warna hardcoded. |
| 2026-07-17 | Seimbangkan Ritme Visual Landing Page (Jeda Jiwa + Terang-Terang-Dark-Terang-Terang-Split) | ✅ | Mengatur ulang urutan 9 section beranda pada dokumen SSOT: Jeda Jiwa tetap setelah Hero, diikuti pola Terang-Terang-Dark (Budaya [L] -> Map [L] -> Fun Fact [D]) lalu Terang-Terang-Split (Destinasi [L] -> Berita [L] -> Contact [Split]) beserta z-index. |
| 2026-07-17 | Implementasi Rombak Landing Page & Update Ikon Hero | ✅ | Menukar urutan render `FunFactSection` dan `JourneyMapSection` di `page.tsx` serta mengubah z-index masing-masing komponen agar selaras dengan SSOT `landing-page.md`. Mengubah ikon tangan `HandRaisedIcon` menjadi ikon sentuh `FingerPrintIcon` di `HeroSection.tsx`. |
| 2026-07-17 | Penyelarasan Tema Warna Journey Map (Peta Kei) | ✅ | Mengubah background gradasi pill active dan card stats di `JourneyMapSection.tsx` dari merah-pink pekat menjadi navy-pink pastel agar setema dengan tombol CTA, serta mengubah aksen teks/ikon aktif menjadi `text-brand-navy`. |
| 2026-07-17 | Desain Borderless Journey Map (Peta Kei) | ✅ | Menghapus garis tepi (border/stroke) pada tombol pill lokasi (aktif & tidak aktif) serta kartu statistik kecil di `JourneyMapSection.tsx` untuk visual yang lebih bersih dan menyatu secara mulus sesuai masukan pengguna. |
| 2026-07-17 | Penyelarasan Gaya Pill Tab Journey Map | ✅ | Menyinkronkan tombol pill menu lokasi di `JourneyMapSection.tsx` agar menggunakan styling yang persis sama dengan tab kategori di `DestinasiTerbaikSection.tsx` (`bg-nav-gradient text-black` saat aktif, dan `bg-white/60 text-black/70 hover:bg-brand/15 hover:text-brand` saat tidak aktif). |
| 2026-07-17 | Optimasi Shadow Map & CTA Latar Terang | ✅ | Menghapus overlay gradien hitam di banner gambar Pulau Bair untuk visual ultra-clean. Menambahkan aksen bayangan halus `shadow-md` pada semua tombol CTA berlatar belakang terang (`JourneyMapSection.tsx`, `BudayaAdatSection.tsx`, `DestinasiTerbaikSection.tsx`, `BeritaUmkmSection.tsx`) agar dimensional dan mudah terbaca. |
| 2026-07-17 | Hover Pink Dinamis CTA & Gradien Baru Form Submit | ✅ | Mengonfigurasi semua CTA berlatar terang (`bg-nav-gradient` dengan `shadow-md`) agar beralih ke teks pink brand (`hover:bg-none hover:bg-brand/10 hover:text-brand shadow-lg`) saat di-hover demi menjaga kontras visual dan keselarasan estetika. Memberikan gradien tegas Coral Pink-Teal pada submit form `ContactSection.tsx` agar terlihat nyata. |
| 2026-07-17 | Improvisasi Tata Letak Budaya Adat Section | ✅ | Mengubah pembagian grid desktop BudayaAdatSection menjadi rasio seimbang 35%:30%:35% agar teks tidak terhimpit secara vertikal. Menjadikan jumlah visible card slider adaptif (1 di mobile, 2 di tablet, 3 di desktop) dan menambahkan progress bar autoplay interaktif. Menghias latar belakang dengan SVG Tenun Elat watermark tipis (3.5%). |
| 2026-07-17 | Penyederhanaan Efek CTA Form Submit | ✅ | Menyederhanakan tombol submit form "Jadi Bagian dari Keluarga Evav" di `ContactSection.tsx`. Menghapus efek gerakan fisik magnetik dan sorotan radial glow spotlight yang dinilai terlalu berlebihan, menggantinya dengan efek hover tenang berbasis state React (`isSubmitHovered`) yang mengubah gradien pink-teal menjadi Coral Pink solid secara lembut saat di-hover. |
| 2026-07-17 | Catat progres ke `logs.md` | ✅ | File ini. |

## 2026-07-18 — Manajemen Aset & Pembersihan File Metadata

| 2026-07-18 | Analisis dan rename gambar UMKM di `web/public/images/umkm/` | ✅ | Menganalisis 16 file gambar WhatsApp, menghapus file metadata `.jpeg:Zone.Identifier`, dan mengganti nama gambar menjadi format snake_case deskriptif dengan awalan `kei_umkm_`. |
| 2026-07-18 | Audit aset di `list-asset.md` & penyelesaian duplikasi gambar | ✅ | Menganalisis seluruh file gambar yang terdaftar di `list-asset.md`. Menemukan dan menghapus 17 file gambar yang terbukti duplikat/salah konten (mismatch), menggantinya dengan gambar yang relevan secara visual (dibuat menggunakan image generator AI dan placeholder/copy). |
| 2026-07-18 | Perbaikan error lint pre-existing di komponen frontend | ✅ | Memperbaiki 2 error lint pre-existing terkait `setState` di `AppShell.tsx` dan `useTimeOfDay.ts` untuk meloloskan build Next.js. `npm run build` & `npm run lint` sekarang hijau (Exit 0). |
| 2026-07-18 | Sinkronisasi komponen dengan aset baru | ✅ | Memperbarui komponen `BeritaUmkmSection.tsx`, `FunFactSection.tsx`, `DestinasiTerbaikSection.tsx`, dan `Footer.tsx` untuk mereferensikan aset gambar baru yang telah dibersihkan dan diperbarui secara visual. |
| 2026-07-18 | Re-audit `list-asset.md` vs filesystem aktual | ✅ | Menyelaraskan `docs/list-asset.md` dengan kondisi riil `web/public/` (142 file terverifikasi via `find`). Memperbarui struktur folder, ringkasan jumlah per kategori, dan menandai seluruh aset `✅`. Menemukan 2 folder eksplorasi (`images/eksplorasi` vs `images/explorasi`), duplikat `eka-bagus-spot` di `eksplorasi/` & `meti/`, dan 5 entri atribusi yatim. |
| 2026-07-18 | Bersihkan 5 entri atribusi yatim di `asset-attributions.ts` | ✅ | Menghapus baris yang menunjuk ke file tak ada: `pentas_seni.png`, `kei_mosaic_2/6/7.png`, `kei_community_3.png`. `npx tsc --noEmit` hijau (Exit 0). 94 file nyata lainnya masih menunggu pencatatan atribusi (lihat § Peringatan di list-asset.md). |
| 2026-07-18 | Gabung & rapikan folder eksplorasi | ✅ | Menggabungkan `images/explorasi/` (duplikat Meti, md5 sama dengan `images/meti/kei_*`) ke dalam `images/meti/`; menghapus `images/explorasi/` dan duplikat `images/meti/eka-bagus-spot/`. Sisa satu folder `images/eksplorasi/` (6 spot wisata). Membersihkan seluruh `*.Zone.Identifier`. Mengalihkan `SocialMosaicSection.tsx` (6 ref) ke `images/meti/` dan `PenghormatanSection.tsx` ke `images/eksplorasi/pasir_panjang.png`. |
| 2026-07-18 | Catat seluruh aset ke `asset-attributions.ts` | ✅ | Menulis ulang `asset-attributions.ts` agar mencakup ke-123 file aset riil (125 entri, OG dihitung 2x). Tidak ada entri yatim. `npx tsc --noEmit` & `npm run lint` hijau (0 error, 7 warning pre-existing di luar tugas). |
| 2026-07-18 | Tulis ulang `docs/list-asset.md` bersih | ✅ | Menyelaraskan dokumen dengan struktur folder akhir (satu `eksplorasi/`), ringkasan jumlah per kategori, dan menandai seluruh aset `✅` + tercatat atribusi. Menambahkan § Peringatan/Regresi soal kehilangan `eka-bagus-spot` & `mahasiswa-kkn` (folder `public/` untracked → tak bisa dipulihkan git). |
| 2026-07-18 | Dedup aset per halaman & pastikan semua aset terpakai | ✅ | Strategi: ganti duplikat dengan aset tak-terpakai (pilihan user). Landing (`/`): hapus 9× pengulangan `kei_ngurbloat` dkk dengan mengalihkan ke aset meti/eksplorasi/budaya/satwa/kuliner/umkm tak-terpakai — hanya `kei_ngurbloat` di Contact (background) yang dikecualikan. Reassign di HeroSection, JedaJiwaSection, FunFactSection, JourneyMapSection, DestinasiTerbaikSection, BeritaUmkmSection, Footer. |
| 2026-07-18 | Wiring aset tak-terpakai ke halaman tematik | ✅ | Heritage: galeri 7 kampung adat + ohoi_rumadian (RatskapHeritageSection), potret Karel formal (KarelHeritageSection), arsip koperasi/monumen (PrologHeritageSection). Taste: hidangan "Enbal Love" (taste.ts). Budaya: dedupe `budaya.ts` (people_portrait/busana_adat/batik/language_symbol). Eksplorasi: dedupe `eksplorasi.ts` (beach→viewpoint_bukit, hawang→ohoiluk_gua). UMKM: ekspansi `umkms[]` BeritaUmkmSection jadi 17 item. Brand: watermark tenun (BudayaAdatSection), logo hitam/warna (Footer), audio ambient `kei-waves.webm` via komponen `AmbientSound` (layout, mute-btn per AGENTS.md §7.3). |
| 2026-07-18 | Verifikasi final | ✅ | `npx tsc --noEmit` hijau (Exit 0). `npm run lint` 0 error / 9 warning pre-existing (`<img>` & unused-var, di luar tugas). Audit: 0 aset tak-terpakai dari 123 file; 0 duplikat aset dalam satu halaman (kecuali background). |

---


---

## 2026-07-18 — SEO & Responsivitas Mobile/Tablet (Sub-Agent Paralel)

| Tanggal | Aktivitas | Status | Catatan |
|---------|-----------|--------|---------|
| 2026-07-18 | Riset mendalam SEO (Google/AI-friendly) & buat `docs/seo.md` | ✅ | Acuan 14 section: metadata, JSON-LD, sitemap, robots, manifest, `llms.txt`, OG image, geo/local SEO, keyword bank. |
| 2026-07-18 | Implementasi SEO via 4 sub-agent | ✅ | Fix `title.absolute`→template `%s \| Simfoni Evav` (6 page); tambah `viewport` themeColor; perluas JSON-LD (`SearchAction`, `TouristDestination`, `TouristAttraction` per spot, `FAQPage`); expand `sitemap.ts` (6 rute + priority); `manifest.ts` + daftar; `public/llms.txt` + link; dynamic `opengraph-image.tsx` per rute. |
| 2026-07-18 | Riset responsivitas 2025/2026 & buat `docs/responsive-playbook.md` | ✅ | Aturan besi: jangan ubah desktop (`lg:`+), mobile-first, no horizontal scroll 360px, touch ≥44px, `text-fluid-*`. |
| 2026-07-18 | Responsivitas 6 halaman via 6 sub-agent (1 page = 1 agent) | ✅ | Home, Eksplorasi, Budaya, Heritage, Taste, Interaction. Grid→stack, flex-col di mobile, hero card mobile fallback, form/FAQ/SocialMosaic usable di 360px, JourneyMap height mobile. |
| 2026-07-18 | Verifikasi `npx tsc --noEmit` + `npm run lint` + `npm run build` | ✅ | tsc Exit 0; lint 0 error (9 warning pre-existing: `progress`/`totalItems` unused, `<img>` Footer/Hero); build sukses, semua rute + `sitemap.xml`/`robots.txt`/`manifest.webmanifest`/`opengraph-image` static. |

### 📌 Catatan Regresi / Perhatian
- Warning lint `progress`/`totalItems` (DestinasiTerbaik, FunFact) & `<img>` (Footer, HeroSection) adalah **pre-existing**, bukan dari task ini.
- `next/og` OG dinamis pakai font sistem (sans-serif) karena next/font variable tak langsung usable di ImageResponse; aman untuk build.

---

## 📌 Open Items / Kendala

| Item | Status | Tindakan Diperlukan |
|------|--------|---------------------|
| Reset/putar Cloudflare Tunnel Token & password MINIO/Postgres (`.env` terpapar di disk) | ❌ Blocked (manual user) | User wajib reset di dashboard Cloudflare/MinIO/Postgres; token lama dianggap bocor. |
| Bersihkan git history jika `.env` pernah ter-commit (`git filter-repo` + force push) | 📝 Catatan | Jalankan manual oleh user; koordinasi kolaborator sebelum force push. |
| Lint error pre-existing `KeterhubunganFormSection.tsx` | 🟡 In Progress | Dilaporkan agent, belum diperbaiki. Perlu sesi terpisah. |
| Commit & push semua perubahan | 📝 Catatan | Menunggu instruksi eksplisit user (belum di-commit). |

---

## 🔗 Referensi

- `docs/GRAND_DESIGN.md` — SSOT desain.
- `AGENTS.md` — aturan project.
- `docs/page-designs/*.md` — 6 dokumen desain page (landing, destinasi, budaya, sejarah, kuliner, keterhubungan).
- `docs/Copywriting/*.pdf` — sumber copywriting.
