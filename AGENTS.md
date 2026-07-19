<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# 🤖 AGENTS.md — Aturan Proyek & Panduan AI Agent (Project Rules & Agent Guidelines)

Dokumen ini berisi aturan yang **wajib** diikuti saat mengembangkan, mengubah, atau meninjau kode di folder `web/` (aplikasi **Next.js 16 — App Router — Full Stack** dengan React 19, TypeScript, dan Tailwind CSS v4). Aturan ini berlaku untuk semua kontributor manusia maupun AI agent, dan dirancang agar kode tetap konsisten, terstruktur, serta setiap keputusan dan perubahan terdokumentasi secara transparan.

Dokumen ini merupakan adaptasi dari `AGENTS.md` proyek Microservices (Go) yang disesuaikan dengan konteks *full-stack web developer* Next.js.

---

## 🌐 1. Aturan Bahasa (Language Rule)

**Untuk proyek `web/` ini, teks antarmuka (UI) yang ditujukan ke pengguna akhir menggunakan Bahasa Indonesia**, karena ini adalah situs pariwisata (Kepulauan Kei / "Discover Evav"). Aturan ini berbeda dengan proyek Microservices yang mewajibkan UI berbahasa Inggris.

### Ketentuan Detail:
1. **UI / Frontend (React / Next.js)**
   - Label, judul, tombol, placeholder, pesan error, tooltip, dan teks statis lainnya di UI menggunakan **Bahasa Indonesia**.
   - Metadata SEO (`title`, `description`, `openGraph`, `keywords`) di `layout.tsx` / `page.tsx` juga menggunakan Bahasa Indonesia yang sesuai konteks pemasaran pariwisata.
   - Nama variabel, komponen, fungsi, dan tipe TypeScript tetap mengikuti konvensi penamaan kode (**Bahasa Inggris**), bukan teks yang ditampilkan ke pengguna.
2. **API / Server (jika ada Route Handlers)**
   - Pesan respons API (`message`, `error`, validasi field) dapat menggunakan Bahasa Indonesia agar konsisten dengan UI, kecuali kontrak API secara eksplisit disepakati berbahasa Inggris.
   - Log internal (server logs) boleh menggunakan bahasa yang dipakai tim, namun payload yang dikirim ke klien harus konsisten dengan bahasa UI.
3. **Dokumentasi & Komentar**
   - Dokumentasi proyek dan komentar deskriptif boleh berbahasa Indonesia karena ditujukan untuk tim internal.
   - Kode komentar penjelas yang sudah ada **wajib dipertahankan** saat mengedit file.

---

## 🛠️ 2. Alur Kerja Terstruktur (Structured Workflow)

Setiap agen atau kontributor wajib mengikuti alur kerja terstruktur agar perubahan tidak merusak stabilitas aplikasi.

### 2.1 Fase Perencanaan (Planning Phase)
Sebelum modifikasi kode yang kompleks (membuat halaman/rute baru, mengubah struktur `app/`, menambah dependensi, atau integrasi library baru seperti peta/animasi):
1. **Riset & Pahami Arsitektur**: Baca struktur folder `src/app` (App Router) dan `src/components`, serta konfigurasi di `next.config.ts`, `tsconfig.json`, dan `postcss.config.mjs`.
2. **Pahami Next.js Versi Ini**: Karena ini Next.js 16 (bukan versi lama), baca panduan di `node_modules/next/dist/docs/` sebelum menulis kode. Perhatikan peringatan *deprecation*.
3. **Buat Rencana Implementasi**: Sampaikan rencana langkah demi langkah sebelum eksekusi, terutama untuk perubahan yang berdampak ke banyak komponen.

### 2.2 Fase Pelacakan Tugas (Task Tracking)
1. Gunakan format to-do list untuk melacak progress:
   - `[ ]` Tugas belum dimulai
   - `[/]` Tugas sedang dalam pengerjaan (In Progress)
   - `[x]` Tugas selesai (Completed)
2. Pecah tugas besar menjadi sub-tugas kecil dan terukur.

### 2.3 Fase Verifikasi & Pengujian (Verification Phase)
1. **Verifikasi Fungsional**: Jalankan aplikasi secara lokal (`npm run dev`) dan uji perubahan di browser jika memungkinkan.
2. **Pemeriksaan Build & Lint**: Pastikan aplikasi dapat di-build dan di-lint tanpa error:
   - `npm run lint` (ESLint via `eslint-config-next`)
   - `npm run build` (Next.js production build / typecheck implisit)
   - `npx tsc --noEmit` (pemeriksaan tipe TypeScript tambahan jika diperlukan)
3. **Dokumentasi Pengujian**: Catat hasil pengujian atau perintah yang digunakan dalam dokumen proyek yang relevan (mis. `README.md` atau catatan tim).

---

## 📝 3. Aturan Pencatatan & Dokumentasi (Logging & Documentation)

Setiap aktivitas pengembangan **harus dicatat secara disiplin** untuk transparansi dan ketertelusuran.

### 3.1 Pembaruan Development Logs
1. Jika repositori menyediakan file log (mis. `logs.md` atau catatan serupa di tingkat proyek), **wajib** memperbaruinya setiap menyelesaikan tugas:
   - Gunakan format tabel Markdown standar.
   - Status konsisten: `✅` (Done), `🟡` (In Progress), `❌` (Blocked), `📝` (Catatan).
2. **Keputusan Teknis**: Jika membuat keputusan penting (memilih library baru seperti `mapbox-gl`/`maplibre-gl`, mengubah struktur rute, atau mengubah strategi data fetching), catat di log/README.
3. **Isu & Catatan**: Catat kendala atau konfigurasi khusus agar tim lain mengetahuinya.

### 3.2 Sinkronisasi Dokumentasi Proyek
1. Jika dokumen perencanaan/roadmap ada di tingkat repositori (`spesification.md`, `saran-landing-page.md`, `README.md`), perbarui status atau detailnya saat fitur selesai.

---

## 🏗️ 4. Konsistensi Arsitektur & Pola Kode (Architectural Consistency)

Aplikasi ini menggunakan **Next.js 16 App Router**. Patuhi pola berikut:

1. **Server vs Client Components**
   - Default semua komponen adalah **Server Component**. Hanya tambahkan `"use client"` di bagian atas file jika benar-benar butuh interaktivitas (state, effect, event handler, hooks seperti `useState`/`useEffect`, atau library browser seperti GSAP/peta).
   - Hindari menandai seluruh pohon komponen sebagai client secara tidak perlu — jaga sebagian besar UI tetap di server untuk performa.
2. **Struktur Direktori**
   - Rute halaman ditempatkan di `src/app/` (App Router): `page.tsx` untuk halaman, `layout.tsx` untuk layout, `route.ts` untuk API handler.
   - Komponen UI yang dapat digunakan ulang ditempatkan di `src/components/`.
   - Gunakan *colocation*: letakkan file terkait (komponen kecil, data, tipe) sedekat mungkin dengan rute yang menggunakannya.
3. **Path Alias**
   - Selalu gunakan alias `@/*` (mengarah ke `./src/*`) untuk import, sesuai `tsconfig.json`. Contoh: `import HeroSection from "@/components/HeroSection"`.
   - Jangan menggunakan path relatif yang dalam (mis. `../../../`) kecuali sangat sederhana.
4. **Manajemen Environment Variables**
   - Deklarasikan variabel lingkungan baru di `.env.example` beserta deskripsi/default value.
   - Untuk nilai yang dibutuhkan di sisi klien (browser), wajib menggunakan prefix `NEXT_PUBLIC_`.
   - **JANGAN** pernah melakukan hardcode kredensial, API key, atau token rahasia. Secret hanya boleh diakses dari Server Component / Route Handler, tidak boleh bocor ke bundle klien.
5. **Standardisasi API Response (Route Handlers)**
   - Jika membuat endpoint API (`app/api/.../route.ts`), gunakan struktur respons JSON seragam:
     - Sukses (2xx): `{ "success": true, "data": <payload> }`
     - Error (4xx/5xx): `{ "success": false, "error": { "code": "<KODE>", "message": "<pesan>" } }`
6. **Data Fetching**
   - Lakukan fetching data di Server Component menggunakan `fetch` bawaan (didukung caching Next.js) daripada mengekspos panggilan API langsung ke klien.
   - Jangan panggil API eksternal dari Client Component dengan menyertakan secret.
7. **Styling & Design System**
   - Proyek menggunakan **Tailwind CSS v4** (konfigurasi CSS-first via `postcss.config.mjs` + `@tailwindcss/postcss`). Pertahankan konsistensi kelas utilitas dan token desain (font variable: `--font-sans`, `--font-serif`, `--font-cursive`).
   - Jangan mencampuradukkan sistem styling yang berbeda tanpa alasan jelas.
8. **Penggunaan Gambar**
   - Gunakan `next/image` (komponen `Image`) untuk semua gambar agar optimasi otomatis aktif.
   - Hostname gambar eksternal (mis. `images.unsplash.com`) **wajib** didaftarkan di `images.remotePatterns` pada `next.config.ts` sebelum digunakan.
9. **Single Source of Truth & Larangan Kontainer Yatim (Orphaned Containers)**
   - Semua layanan yang berjalan (termasuk `web`) **wajib dideklarasikan** di `docker-compose.yml` di root repositori.
   - **DILARANG KERAS** membiarkan kontainer berjalan secara mandiri (*orphaned*) tanpa terdaftar di `docker-compose.yml`. Gunakan `docker compose up -d --remove-orphans` untuk membersihkan sisa kontainer.
10. **Sentralisasi String Konten**
    - Hindari menulis teks statis (seperti data destinasi, kutipan sejarah, dan deskripsi budaya) secara hardcoded langsung di dalam file komponen UI `.tsx`. Pindahkan data tersebut ke file konfigurasi terpusat (misalnya di folder `src/content/` atau `src/data/`) untuk mempermudah pemeliharaan dan persiapan lokalisasi (i18n) di masa mendatang.

---

## 🔒 5. Keamanan Kode (Security Guidelines)

1. **Rahasia & Kredensial**: Dilarang commit file `.env`, key file, atau file berisi kredensial sensitif ke Git. Pastikan `.env*` masuk dalam `.gitignore`.
2. **Input Validation**: Validasi dan sanitasi semua input (terutama pada Route Handlers) untuk mencegah injeksi dan abuse. Gunakan skema validasi (mis. Zod) jika diperlukan.
3. **XSS Prevention**: React secara default melakukan escaping. **JANGAN** menggunakan `dangerouslySetInnerHTML` dengan data yang tidak terpercaya tanpa sanitasi.
4. **Server-Only Secrets**: Pastikan secret tidak pernah masuk ke bundle klien. Gunakan `"server only"` / Server Component untuk logika yang memerlukan kredensial.

---

## 💬 6. Gaya Komunikasi & Protokol Perilaku Agent (Agent Communication & Behavior Protocol)

Jika tugas dijalankan oleh AI Agent:

### 6.1 Gaya Komunikasi
1. **Ringkas & Informatif**: Penjelasan padat, langsung ke tujuan, format Markdown bersih.
2. **Prinsip Tautan File**: Saat menyebutkan file, direktori, kelas, atau fungsi, **selalu buat tautan aktif** dengan format `file://` (mis. `[page.tsx](file:///home/almuzky/discover_evav/web/src/app/page.tsx)`).
3. **Konfirmasi Tindakan Berisiko**: Minta konfirmasi pengguna sebelum tindakan merusak (menghapus file penting, mereset repo, menghapus data).

### 6.2 Protokol Perilaku AI Agent (Actionable & Verifiable Rules)
1. **Zero-Placeholder Rule (Tanpa Placeholder)**:
   - **DILARANG KERAS** menghasilkan kode dengan komentar placeholder seperti `// TODO: implement here`, `/* sisa kode ... */`, atau `// ...`.
   - Semua perubahan harus lengkap, fungsional, dan siap dijalankan.
2. **Prinsip Konteks Penuh (Full Context Rule)**:
   - Sebelum mengedit, baca file target secara menyeluruh untuk memahami struktur yang ada.
   - **Pertahankan komentar dokumentatif dan lisensi** yang sudah ada. Jangan hapus dokumentasi tanpa alasan jelas.
3. **Prinsip Dampak Minimal (Minimal Footprint)**:
   - Modifikasi dengan cara terfokus dan terlokalisasi. Hindari mengubah file/baris yang tidak berhubungan dengan tugas.
4. **Verifikasi Mandiri Sebelum Melapor (Self-Validation)**:
   - Jalankan `npm run lint`, `npm run build`, dan (jika relevan) `npx tsc --noEmit` setelah perubahan, untuk memastikan tidak ada error sintaks/tipe sebelum melaporkan selesai.
5. **Cakupan Pengujian (Manual vs Agent)**:
   - **Uji Build/Statis (DIPERBOLEHKAN):** Agent **sangat dianjurkan** memverifikasi bahwa `npm run build` dan `npm run lint` lolos, serta memeriksa tipe TypeScript.
   - **Uji Visual/UX (DILARANG bagi Agent):** Pengujian visual, layout, dan interaksi di browser **wajib** dilakukan manual oleh Pengguna. Agent **dilarang** mengubah status checklist UI seolah-olah Agent mengujinya secara visual.
   - Agent boleh menyiapkan/menulis draf skenario pengujian UI (status `[ ]`) dan membaca status untuk koordinasi.
6. **Pencegahan Perulangan Error Tanpa Ujung (Doom Loop Prevention)**:
   - Jika menemui error build/lint/tipe yang sama setelah 3 kali percobaan perbaikan berturut-turut, **harus berhenti** dan melaporkan kendala beserta opsi pemecahan kepada Pengguna.
7. **Perlindungan Unit Test (Test Protection Rule)**:
   - **DILARANG KERAS** memodifikasi/menghapus/melemahkan assertion test yang ada agar "lolos" paksa. Cari kesalahan di kode implementasi, bukan di test — kecuali spesifikasi memang diubah secara eksplisit oleh Pengguna.
   - *Catatan:* Proyek `web/` saat ini belum mengonfigurasi framework testing; jika ditambahkan (mis. Vitest + React Testing Library), aturan ini berlaku.
8. **Larangan Dependensi Tanpa Izin (Unmanaged Dependencies Restriction)**:
   - **DILARANG KERAS** menjalankan `npm install` / menambah package baru tanpa instruksi eksplisit atau persetujuan Pengguna.
9. **Pembersihan Lingkungan & Manajemen Kontainer Terfokus**:
   - Setelah pengujian/perbaikan selesai (dengan konfirmasi Pengguna), Agent **wajib mematikan/membersihkan kontainer** terkait (`docker compose stop web` / `docker compose down`) agar lingkungan kembali steril.
   - Saat *bug-fixing*, jangan menyalakan seluruh layanan sekaligus; nyalakan hanya layanan yang berkaitan langsung.

---

## 🛠️ 7. Aturan Penulisan Kode (Coding Guidelines)

### 7.1 TypeScript / Next.js (Full Stack)
1. **Strict Typing**:
   - Proyek menggunakan `strict: true` di `tsconfig.json`. Hindari `any`; gunakan tipe eksplisit untuk props, state, dan respons data.
   - Manfaatkan `type`/`interface` untuk kontrak data antar komponen dan API.
2. **Server/Client Boundary**:
   - Pahami batasan: Server Component tidak boleh menggunakan hooks/event handler; Client Component (`"use client"`) tidak boleh melakukan fetching data server-side dengan secret.
   - Letakkan `"use client"` sedekat mungkin ke komponen yang butuh interaktivitas (komponen daun/leaf), bukan di layout/rute secara membabi buta.
3. **Explicit Error Handling**:
   - Pada Route Handler dan logika async, tangani error secara eksplisit dan kembalikan respons error terstruktur (lihat §4.5).
   - Jangan biarkan promise tidak tertangani (unhandled rejection).
4. **No Memory Leaks (Client Components)**:
   - Bersihkan efek samping di `useEffect` (hapus event listener, bersihkan interval/timeout, destroy instance peta/animasi seperti GSAP/MapLibre) menggunakan return cleanup function.
   - **GSAP Cleanup**: Setiap kali menggunakan GSAP ScrollTrigger di dalam React, wajib membungkus instansiasi animasi dalam `gsap.context()` di dalam hook `useEffect`, dan mengembalikan fungsi pembersihan (`ctx.revert()`) untuk mencegah kebocoran memori (memory leaks) saat perpindahan halaman/komponen di-unmount.
5. **Next.js 16 / React 19 Conventions**:
   - Baca panduan di `node_modules/next/dist/docs/` untuk API yang berubah (metadata, caching, `fetch`, dynamic routes, dsb).
   - Jangan menggunakan API yang sudah didepresiasi hanya karena muncul di data pelatihan lama.
6. **Code Formatting & Linting**:
   - Jalankan `npm run lint` (ESLint + `eslint-config-next`) sebelum commit.
   - Opsional: gunakan Prettier/format otomatis agar konsisten.
7. **Rendering & Performance**:
   - Gunakan `next/image` untuk gambar, `next/font` untuk font (sudah dipakai di `layout.tsx`), dan hindari bundle berat di Client Component yang tidak perlu.

### 7.2 Styling (Tailwind CSS v4)
0. **📖 GRAND DESAIN (Wajib Acuan)**: Semua keputusan desain visual (skala tipografi H1–H4, token warna, spacing, radius, animasi, komponen UI primitif) **terpusat** di [docs/GRAND_DESIGN.md](file:///home/almuzky/discover_evav/docs/GRAND_DESIGN.md). Setiap perubahan desain global **HARUS** diedit di dokumen tersebut terlebih dahulu, lalu diaplikasikan ke kode. Jangan hardcode nilai desain mentah tanpa merujuk dokumen ini. Agent wajib membaca `docs/GRAND_DESIGN.md` sebelum membuat/mengubah komponen UI. Perhatikan khususnya **§6.5 Design Restraint** — jangan berlebihan dengan animasi/progress bar/skeleton.
1. Ikuti sistem utilitas Tailwind yang ada; jaga konsistensi desain (warna, spacing, tipografi font variable).
2. Untuk Tailwind v4, konfigurasi dilakukan melalui CSS (`@import "tailwindcss"` dan `@theme`), bukan `tailwind.config.js` klasik. Patuhi pendekatan ini.
3. Hindari inline style yang berlebihan; gunakan kelas utilitas agar mudah dirawat.
4. **Standard Container Width**: Semua wrapper section utama wajib menggunakan utility class berikut agar rata tepi (alignment) dari Navbar hingga Footer konsisten (sesuai `.cursorrules`):
   `className="max-w-[98%] xl:max-w-[1600px] mx-auto px-4 md:px-8 w-full"`
5. **Standar Tombol CTA (Wajib Konsisten)**: Semua tombol aksi utama (submit form, "Lihat di Peta", "Bergabung Sekarang", tombol Keterhubungan, dll.) **wajib** menggunakan class global `.btn-cta` yang didefinisikan di `web/src/app/globals.css`. Karakteristiknya: **tanpa background**, **tanpa shadow**, border & teks hitam (`#1a1a1a`) di state normal, dan saat hover/stroke aktif berubah ke aksen pink (`--color-primary-pink`). Ini meniru gaya CTA "Lihat di Peta" di `DestinasiTerbaikSection`. **DILARANG** memberikan background terisi/gradient atau shadow pada tombol CTA standar kecuali ada kesepakatan eksplisit. Ikon panah di dalamnya pakai `text-current` agar ikut berubah warna saat hover. Jangan menduplikasi gaya ini dengan utilitas Tailwind inline (`border border-black hover:border-brand ...`) — gunakan `.btn-cta`.

### 7.3 Optimasi Media & Asset
1. **Image Priority (next/image)**:
   - Gunakan `priority={true}` hanya untuk gambar di atas lipatan layar (*above the fold* / Hero Section) untuk meningkatkan LCP (Largest Contentful Paint).
   - Gunakan `loading="lazy"` (bawaan Next.js) untuk semua gambar di bawah lipatan layar.
2. **Lazy Loading Video**:
   - Dilarang memuat/memutar banyak video latar belakang sekaligus jika sedang tidak aktif (seperti pada slide carousel Hero). Render video secara kondisional hanya saat slide tersebut aktif untuk menghemat memori.
 3. **Skeleton Loading**:
    - Komponen berat berbasis client-side pihak ketiga (seperti MapLibre GL JS pada `JourneyMapSection`) wajib menyediakan skeleton loader/placeholder statis untuk mencegah Layout Shift (CLS) saat peta dimuat.
 4. **Fallback Resource dari Web (Web-Embed Fallback)**:
    - Jika tidak tersedia gambar atau resource (video) lokal/terpusat yang memadai untuk suatu bagian UI, Agent **diizinkan** mencari di web dan menggunakan resource dari web (gambar maupun video) sebagai pengganti.
    - **Gambar**: Gunakan `next/image` dan **wajib** mendaftarkan hostname sumber (mis. `images.unsplash.com`, `upload.wikimedia.org`) ke `images.remotePatterns` pada `next.config.ts` sebelum digunakan. Pilih gambar dengan lisensi bebas (Unsplash, Wikimedia Commons, Pexels, dsb.) dan hindari gambar berhak cipta tertutup.
    - **Video**: Untuk video latar belakang, gunakan sumber yang mendukung *embed* (mis. YouTube, Vimeo, atau file CDN terbuka). Untuk YouTube/Vimeo, embed melalui iframe yang di-load secara *lazy* (hanya saat aktif) agar tidak membebani memori (lihat §7.3.2). Untuk file video langsung, gunakan elemen `<video>` dengan atribut `preload="none"` dan `loading="lazy"` semantik sesuai kebutuhan.
    - **Attribution & Lisensi**: Catat sumber/atribusi resource web yang digunakan pada file konten terpusat (mis. `src/content/` atau `src/data/`) agar memudahkan pelacakan lisensi di masa mendatang.
    - **Kualitas & Relevansi**: Pastikan resource web yang diambil relevan dengan konteks pariwisata Kepulauan Kei ("Discover Evav") dan memiliki resolusi/bitrate yang cukup untuk tampilan layar penuh, namun tetap optimal secara performa.

---

## 📄 8. Standar Commit & Git Workflow

1. **Format Conventional Commits**:
   `<type>(<scope>): <deskripsi singkat>` (semuanya dalam bahasa Inggris untuk pesan commit).
   - `feat`: Fitur baru.
   - `fix`: Perbaikan bug.
   - `docs`: Perubahan dokumentasi.
   - `style`: Formatting kode (bukan perubahan logic).
   - `refactor`: Rekonstruksi tanpa ubah fungsionalitas.
   - `test`: Menambah/ubah pengujian.
   - `chore`: Pemeliharaan, update dependencies.
   - *Contoh:* `feat(web): add interactive journey map section`
2. **Atomic Commits**:
   - Commit kecil dan fokus pada satu perubahan spesifik. Jangan gabungkan banyak fitur tidak terkait dalam satu commit besar.
3. **Jangan Commit Secret**:
   - Pastikan `.env`, `node_modules/`, dan `.next/` tidak ter-commit (cek `.gitignore`).

---

## ♿ 9. Standar Aksesibilitas (Accessibility)

Setiap elemen interaktif harus dapat diakses oleh semua pengguna termasuk pengguna keyboard dan pembaca layar (screen reader):
1. **ARIA Labels**: Semua tombol, tab, tautan, dan penanda peta (marker) yang hanya menampilkan ikon/gambar wajib memiliki atribut `aria-label` yang deskriptif dalam Bahasa Indonesia (contoh: `aria-label="Ganti ke slide berikutnya"`, `aria-label="Tutup menu"`).
2. **Skip to Content Link**: Wajib menyediakan tautan pintasan aksesibilitas di bagian teratas layout agar pengguna keyboard dapat langsung melompat ke konten utama (`#main-content`).
3. **Respect User Motion Preferences**: Untuk transisi/animasi GSAP atau efek scroll-jacking, selalu periksa preferensi sistem pengguna menggunakan media query `prefers-reduced-motion` dan matikan atau kurangi intensitas animasi jika bernilai `reduce`.

---

## 🚫 10. Pencegahan Kesalahan Kritis Agent (Critical AI Agent Error Prevention)

Berdasarkan riset kesalahan kritis yang sering dilakukan oleh AI coding agent dalam pengembangan web, aturan berikut **wajib** dipatuhi untuk menghindari bug tersembunyi, celah keamanan, dan utang teknis (technical debt):

1. **Pencegahan Halusinasi & Bug Logika (Logic & Off-by-One Errors)**
   - **Aturan**: Dilarang berasumsi kode yang "bisa berjalan" bebas dari bug. Periksa logika batas (edge cases), loop off-by-one, penanganan nilai `null`/`undefined`, dan lakukan self-review mendalam terhadap alur data (data flow).
2. **Pencegahan Duplikasi Kode & Pergeseran Arsitektur (Architectural Drift)**
   - **Aturan**: Sebelum membuat fungsi helper, hook kustom, atau tipe TypeScript baru, Agent **wajib** melakukan pencarian global (`grep`) di repositori untuk melihat apakah solusi serupa sudah ada. Gunakan dan perluas modul yang ada daripada menduplikasi logika.
3. **Audit Keamanan Mandiri (Security Auditing)**
   - **Aturan**: Agent dilarang menulis Route Handler atau Form Input tanpa validasi ketat. Gunakan skema validasi (seperti Zod) untuk semua payload input. Jangan pernah membiarkan data mentah dari klien langsung masuk ke query database atau rendering HTML tanpa sanitasi/escaping.
4. **Pencegahan Ketergantungan Berlebih (Dependency Bloat)**
   - **Aturan**: Jangan menginstal paket npm baru hanya untuk menyelesaikan masalah kecil yang bisa diselesaikan dengan native JS/TS/React API. Pemasangan dependensi baru wajib disetujui secara manual oleh Pengguna.
5. **Pencatatan Regresi & Perbaikan (Regression Logging Rule)**
   - **Aturan**: Jika pengguna memberikan feedback bahwa perubahan yang Agent kerjakan justru memunculkan masalah/bug baru (*regression*), Agent **wajib** mencatat hal tersebut secara disiplin agar kesalahan yang sama tidak diulangi di masa depan:
     - **Catat apa yang dikerjakan**: Ringkas perubahan/fitur yang Agent buat (file, fungsi, atau bagian UI yang diubah).
     - **Catat masalah baru yang muncul**: Jelaskan bug atau efek samping yang dilaporkan pengguna akibat perubahan tersebut (contoh: layout rusak, fungsi lain ikut terdampak, performa menurun).
     - **Catat cara memperbaikinya**: Dokumentasikan langkah konkret/perbaikan yang dilakukan untuk menyelesaikan masalah baru tersebut.
     - **Simpan di log proyek** (mis. `logs.md` atau catatan serupa di tingkat repositori) menggunakan format tabel Markdown standar dengan kolom minimal: `Tanggal`, `Yang Dikerjakan`, `Masalah Baru`, `Cara Perbaikan`, `Status`.
     - **Pelajaran (Lesson Learned)**: Tambahkan satu kalimat prinsip pencegahan (mis. "Jangan mengubah X tanpa mengecek Y") agar di masa depan Agent menghindari pola kesalahan yang sama.
   - **Tujuan**: Membangun *institutional memory* agar Agent tidak mengulangi kesalahan yang sama dan dapat melakukan self-review yang lebih baik sebelum melaporkan tugas selesai.
6. **Proteksi Kode & Komentar Eksisting (Code Churn Prevention)**
   - **Aturan**: Saat mengedit bagian kode, dilarang keras secara tidak sengaja menghapus komentar penjelas, konfigurasi lama, atau logika lain di file yang sama yang tidak berhubungan dengan tugas saat ini. Selalu verifikasi perubahan dengan `git diff` internal untuk memastikan kebersihan modifikasi.
