# Review Responsivitas Halaman `/taste` (Kuliner & Cita Rasa Kei) — Viewport 360px

> **Tujuan dokumen:** Meninjau responsivitas halaman `/taste` secara spesifik di layar mobile sempit (360px — setara Galaxy A-series / Moto / banyak Android populer di Indonesia), merujuk praktik *mobile-first* dan *Core Web Vitals* Google, lalu memberikan rencana perbaikan berbasis bukti.
>
> **Cakupan:** 1 halaman (`taste/page.tsx`) + 6 komponen section (`HeroTasteSection`, `SignatureDishesSection`, `StorySection`, `BentoSection`, `UmkmCatalogSection`, `ClosingSection`) + Navbar global.
> **Tanggal review:** 2026-07-20
> **Referensi desain:** `docs/GRAND_DESIGN.md` §4 (Layout & Spacing), §8 (Responsive Breakpoints), §10 (A11y), §24 (Baseline Grid 8px).

---

## 1. Ringkasan Eksekutif

Halaman `/taste` pada umumnya **sudah mengikuti pola mobile-friendly yang solid**: semua section menggunakan container `max-w-[98%] xl:max-w-[1600px] mx-auto px-4 md:px-8 w-full` (sesuai §4), tipografi memakai `clamp()` fluid (globals.css:36–42), grid kolom tunggal di `< md`, dan tombol utama memakai `min-h-[44px]` / `min-w-[40px]` yang memenuhi syarat *touch target* 44×44px (Google/Bluetext 2025).

Namun pada **360px ada 6 isu konkret** yang berisiko menurunkan kenyamanan membaca dan skor *usability* Google: teks sangat kecil (<14px), desain bento yang "menyebar" di desktop menjadi tumpukan tinggi di mobile, hero quote terpotong, dan beberapa padding/leading yang kurang optimal di layar sempit. Tidak ada *horizontal overflow* fatal (tidak ada elemen lebar fixed), sehingga tidak ada layout "rusak" — yang perlu diperbaiki adalah **kemudahan baca & napas (breathing room)**.

**Skor indikatif (360px):** 7.5 / 10 — "Lulus mobile-friendly secara fungsional, perlu penyempurnaan mikro".

---

## 2. Metodologi & Standar yang Dipakai

| Sumber | Yang dijadikan acuan |
|--------|----------------------|
| Google Search Central — Core Web Vitals (2025-12) | LCP < 2.5s, INP < 200ms, CLS < 0.1 sebagai target ranking |
| Google Mobile-First Indexing | Versi mobile menentukan peringkat; desain harus utuh di layar kecil |
| web.dev / Float UI — Responsive Typography | `clamp()` + rem, batas bawah & atas font untuk keterbacaan |
| Bluetext / 99designs (2025) | *Touch target* ≥ 44×44px, navigasi disederhanakan, mobile-first |
| Page One Formula (2025) | Body ≥ 16px, teks kecil minimal 14px di mobile |
| GRAND_DESIGN.md §8 / §24 | Breakpoint `< md`, Baseline Grid 8px |

**Cara review:** Pembacaan statis seluruh komponen + simulasi lebar 360px secara manual (perhitungan lebar container: `360 - 2*(4% dari 360 = 14.4) = ~331px` konten; dengan `px-4` = 16px sisi → ~299px area teks). Tidak dilakukan uji browser visual (sesuai AGENTS.md §6.2 butir 5 — uji visual wajib manual oleh Pengguna).

---

## 3. Temuan per Komponen (360px)

### 3.1 Navbar (global) — ✅ Aman
- `w-[95%]` + `rounded-full` + logo + teks brand + hamburger `lg:hidden`. Di 360px hanya tampil logo + tombol hamburger → **tidak overflow**.
- Drawer mobile `w-[92%] max-w-[420px]` → aman.
- **Catatan kecil (bukan bug):** Subtitle brand `text-[9px]` di bawah logo sangat kecil, tapi ini identitas visual global, bukan konten inti — biarkan.

### 3.2 HeroTasteSection — ⚠️ Perlu penyesuaian
- **H1 fluid:** `clamp(2rem, 1.6rem + 3vw, 4.75rem)`. Di 360px → `1.6rem + 3*(3.6px) = 1.6rem + 10.8px ≈ 2rem (32px)`. Terbaca, tapi dengan `tracking` + `break-words` pada frasa "Pasir Putih" cukup lega. **Aman.**
- **Subtitle:** `text-fluid-body` = `clamp(1rem, 0.95rem + 0.25vw, 1.05rem)` → di 360px ≈ **1rem (16px)**. ✅ Ideal.
- **Quote glass-dark:** `p-5` (20px) dengan `text-fluid-h4` (`clamp(1.15rem,...,1.5rem)` → ~1.15rem). Di 360px kutipan 2 baris + attribution. **Aman, tapi** kartu ini di mobile menambah tinggi halaman tanpa nilai prioritas tinggi — pertimbangkan `order` agar turun ke bawah narasi (sudah `grid-cols-1`, jadi sudah di bawah, OK).
- **Scroll hint link:** `min-h-[44px]` ✅ touch target.

### 3.3 SignatureDishesSection — ⚠️ Minor
- Grid `grid-cols-1 sm:grid-cols-2` → di 360px 1 kolom. Kartu `h-[420px]` tetap. Gambar + overlay teks `p-5`. **Aman secara layout.**
- Tag `text-fluid-small` (`clamp(0.8rem,...,0.9rem)` → **~0.8rem = 12.8px**) + `px-3 py-1.5`. Tag kategori 12.8px **di bawah ambang 14px** yang disarankan untuk teks kecil (Page One Formula). Bukan fatal, tapi kurang nyaman.
- Nama hidangan `text-fluid-h3` → ~1.5rem ✅. Deskripsi `text-fluid-small` ~12.8px — agak kecil untuk paragraf 2 baris di kartu.

### 3.4 StorySection — 🔴 Teks terkecil (aksesibilitas)
- `accentNote` di baris 97–100: `<span className="text-black/45 text-xs ml-1">` → **`text-xs` = 12px absolut, tanpa fluid**. Di 360px ini sangat kecil dan kontras rendah (`black/45`). Rentan melanggar pedoman keterbacaan minimum Google (teks kecil sebaiknya ≥ 14px).
- Paragraf utama `text-fluid-body` ~16px ✅. Gambar `h-[360px]` → di mobile bisa diturunkan ke `h-[280px]` untuk menghemat ruang vertikal (§8: mobile hemat ruang).
- Heading `text-fluid-h2` → ~2rem ✅, tapi `tracking-[0.3em]` pada eyebrow "FILSOFOSI RASA" di 360px bisa membuat spasi antar huruf terlalu renggang (`0.3em` × 8 huruf). Disarankan turunkan ke `tracking-[0.15em] sm:tracking-[0.3em]` (pola sudah dipakai di Hero baris 78!).

### 3.5 BentoSection — 🔴 Paling banyak ruang terbuang di 360px
- Grid `grid-cols-1 md:grid-cols-2 lg:grid-cols-3` → di 360px 1 kolom, tapi setiap item punya tinggi tetap: `hero/tall` = `h-[340px]`, default = `h-[240px]`.
- Artinya di mobile, 5 item = **340 + 340 + 240 + 240 + 240 = 1.400px tinggi vertikal** hanya untuk grid dekoratif. Di desktop ini "bento" yang efisien, tapi di 360px menjadi **scroll panjang tanpa informasi padat**.
- Icon circle `h-12 w-12`, teks `text-fluid-h4/h3` ✅ ukuran aman.
- **Rekomendasi:** di `< md`, sederhanakan tinggi (mis. semua `h-[220px]`) agar grid tidak memakan ruang berlebih — sesuai semangat "collapse secondary content" (99designs) dan §8 "Mobile: medium berbeda, hemat bandwidth/ruang".

### 3.6 UmkmCatalogSection — ⚠️ Mayoritas aman
- Grid `grid-cols-1 sm:grid-cols-2` → 360px 1 kolom ✅.
- Filter kategori `flex-wrap gap-2` dengan tombol `px-4 py-2 text-sm` → wrap rapi, touch target cukup. ✅.
- Kartu: `aspect-[4/3]`, judul `text-lg` (18px) ✅, rating/lokasi `text-xs` (12px) — kecil tapi sekunder, bisa diterima.
- Tombol "Pesan via WhatsApp" `px-5 py-2.5` ✅.
- **Minor:** headline `text-fluid-h2` + span brand di 360px cukup lega. Tidak ada overflow.

### 3.7 ClosingSection — ✅ Aman
- Kartu `py-16 md:py-24 px-6 md:px-12` → di 360px `py-16 px-6` (64px/24px) cukup napas.
- `greeting` cursive `text-fluid-h3`, quote `text-fluid-h3` ✅, CTA `px-6 py-3` ✅ touch target.
- Tidak ada isu 360px.

---

## 4. Tabel Isu & Prioritas

| # | Komponen | Isu di 360px | Dampak | Severity | Ref |
|---|----------|--------------|--------|----------|-----|
| 1 | StorySection | `text-xs` (12px) + `black/45` pada `accentNote` | Keterbacaan & aksesibilitas lemah | 🔴 Tinggi | Page One Formula; §10 A11y |
| 2 | BentoSection | Tinggi tetap 340/240px × 5 item → ~1400px scroll | Ruang terbuang, fatigue scroll | 🔴 Tinggi | §8 Mobile; 99designs |
| 3 | StorySection | `tracking-[0.3em]` eyebrow terlalu renggang di layar sempit | Estetika/legibilitas | 🟡 Sedang | Pola Hero:78 |
| 4 | SignatureDishes / Umkm | `text-fluid-small` (~12.8px) untuk tag & meta | Teks kecil di bawah 14px | 🟡 Sedang | Page One Formula |
| 5 | StorySection | Gambar `h-[360px]` di mobile | Terlalu tinggi untuk mobile | 🟡 Sedang | §8 Mobile |
| 6 | Global | Tidak ada *horizontal overflow* / CLS dari animasi GSAP (`gsap.set` awal opacity 0) | — (positif) | ✅ Aman | web.dev CLS |

**Catatan positif penting:** Semua section menggunakan `gsap.set/to` dengan `opacity`/`y` (bukan mengubah layout), sehingga **tidak memicu CLS** saat scroll — memenuhi target Google CLS < 0.1. Tidak ada elemen lebar *fixed* yang memaksa scroll horizontal → lulus *mobile-friendly test* Google secara struktural.

---

## 5. Riset: Bagaimana Google Menilai Halaman Mobile (2025–2026)

Berdasarkan pencarian terhadap dokumentasi resmi & literatur industri terkini:

1. **Mobile-First Indexing (Google):** Google mengindeks versi *mobile* sebagai acuan peringkat. Halaman yang "utuh & nyaman" di 360px akan dirugikan jika ada konten terpotong atau susah disentuh. *(build-a-website.com, metricsrule.com 2025)*
2. **Core Web Vitals sebagai sinyal peringkat:** LCP < 2.5s, INP < 200ms, CLS < 0.1. Di `/taste`, risiko utama adalah **INP** (banyak `useEffect` + GSAP ScrollTrigger per section) & **LCP** (hero image `priority` sudah baik, tapi `next/image` perlu `sizes` tepat — sudah ada). *(web.dev, digitalapplied 2026)*
3. **Touch target ≥ 44×44px:** Google & Bluetext menyatakan elemen interaktif harus mudah diketuk. Halaman ini largely patuh (`min-h-[44px]`, `w-10 h-10` pagination).
4. **Tipografi mobile:** Body ≥ 16px, teks kecil ≥ 14px, gunakan `clamp()`/rem (sudah dipakai via `--text-fluid-*`). Teks absolut `text-xs` (12px) seperti di StorySection #1 **tidak direkomendasikan**. *(Page One Formula, Float UI)*
5. **Kolaps konten sekunder di mobile:** 99designs & agencyreplacement menyarankan menyederhanakan menu & menunda konten berat di layar kecil — relevan dengan BentoSection #2.

---

## 6. Rencana Perbaikan (Konkret, Tanpa Placeholder)

Semua perubahan mengikuti **Minimal Footprint** (AGENTS.md §6.2.3) — hanya menyentuh class utility, tidak mengubah struktur data/komponen.

### 6.1 StorySection (`src/components/taste/StorySection.tsx`)
- Baris 97: ubah `text-xs` → `text-fluid-small` (naik ke ~12.8→ tetap kecil, maka lebih baik `text-[13px] sm:text-xs` atau ganti ke `text-fluid-small` + naikkan opacity ke `black/55`). **Rekomendasi:** `text-[13px] sm:text-xs text-black/55`.
- Baris 72: eyebrow `tracking-[0.3em]` → `tracking-[0.15em] sm:tracking-[0.3em]`.
- Baris 56: gambar `h-[360px] md:h-[480px]` → `h-[280px] md:h-[480px]`.

### 6.2 BentoSection (`src/components/taste/BentoSection.tsx`)
- Baris 76 grid: tambahkan aturan mobile height. Ubah blok className item (baris 82–88):
  - `hero`/`tall`: `h-[260px] md:h-full md:col-span-2 md:row-span-2`
  - default: `h-[200px] md:h-full`
  - Tujuan: total tinggi mobile turun dari ~1400px → ~960px, lebih ramping tanpa mengubah susunan desktop.

### 6.3 SignatureDishesSection (`src/components/taste/SignatureDishesSection.tsx`)
- Baris 87 (tag): tambahkan `text-[13px]` sebelum `text-fluid-small` agar minimal 13px di mobile: `text-[13px] text-fluid-small ...` (atau naikkan `--text-fluid-small` min di globals.css — lihat 6.5).
- Baris 93 (desc kartu): `text-fluid-small` → `text-[13px] sm:text-fluid-small` untuk kenyamanan baca 2-baris.

### 6.4 UmkmCatalogSection (`src/components/taste/UmkmCatalogSection.tsx`)
- Baris 207 (rating) & 212 (lokasi): `text-xs` → `text-[13px]` (meta sekunder, naik sedikit).
- Tidak wajib, bersifat *nice-to-have*.

### 6.5 globals.css (opsional, sentralisasi)
- Jika ingin konsisten: naikkan `--text-fluid-small` min dari `0.8rem` → `0.8125rem` (13px) di globals.css:36–42. Ini menyelesaikan #4 secara global untuk semua section. **Disarankan** karena menyentuh satu sumber kebenaran (sesuai §4 Sentralisasi).

### 6.6 Verifikasi Pasca-Perubahan
- Jalankan `npm run lint` dan `npm run build` (AGENTS.md §2.3 / §6.2.4).
- Uji visual 360px **manual** oleh Pengguna (DevTools device toolbar) — Agent dilarang mengklaim lulus uji visual.

---

## 7. Kesimpulan

Halaman `/taste` **lulus secara fungsional di 360px** (tidak overflow, touch target cukup, CLS aman, tipografi fluid mayoritas baik). Perbaikan yang diusulkan berfokus pada **aksesibilitas teks kecil (StorySection `text-xs`)**, **penghematan ruang vertikal bento di mobile**, dan **penyesuaian tracking/padding mikro** — selaras dengan standar mobile-first Google 2025–2026 dan `GRAND_DESIGN.md` §8/§10/§24. Tidak ada perubahan arsitektur atau dependensi baru yang dibutuhkan.

---
*Dokumen ini dihasilkan sebagai hasil review statis + riset. Uji visual 360px tetap wajib dilakukan manual oleh Pengguna sebelum menyatakan selesai.*
