# Review Responsivitas Halaman `/interaction` (Keterhubungan & Sapa Keluarga) — Viewport 360px

> **Tujuan dokumen:** Meninjau responsivitas halaman `/interaction` secara spesifik di layar mobile sempit (360px — setara Galaxy A-series / Moto / banyak Android populer di Indonesia), merujuk praktik *mobile-first* dan *Core Web Vitals* Google, lalu memberikan rencana perbaikan berbasis bukti yang **tidak mengubah tampilan desktop**.
>
> **Cakupan:** 1 halaman (`interaction/page.tsx`) + komponen section yang dipakai halaman ini dan komponen global yang memengaruhi mobile: `InteractionHeroSection`, `KeterhubunganIntroSection`, `KeterhubunganFormSection`, `FaqAccordionSection`, `SocialMosaicSection`, `Navbar` (global), `Footer` (global).
> **Tanggal review:** 2026-07-20
> **Referensi desain:** `docs/GRAND_DESIGN.md` §4 (Layout & Spacing), §8 (Responsive Breakpoints), §10 (A11y), §24 (Baseline Grid 8px).

---

## 1. Ringkasan Eksekutif

Halaman `/interaction` pada umumnya **sudah mengikuti pola mobile-friendly yang solid**: semua section menggunakan container `max-w-[98%] xl:max-w-[1600px] mx-auto px-4 md:px-8 w-full` (sesuai §4), tipografi memakai `clamp()` fluid (globals.css:36–42), form bertumpuk 1 kolom di `< md`, dan tombol utama memakai `.btn-cta` / `min-h` yang memenuhi syarat *touch target* 44×44px (Google/Bluetext 2025).

Namun pada **360px ditemukan 7 isu konkret** yang berisiko menurunkan kenyamanan membaca, memicu *horizontal overflow* lokal, atau menyulitkan interaksi jari:
1. Label topik form ("Kerja Sama & Partnership", "Saran & Masukan", "Laporan Masalah") memaksa wrap tidak rata dan menambah tinggi tak terduga.
2. Beberapa teks sangat kecil (<14px): subtitle brand navbar `text-[9px]`, footnote footer `text-[10px]`, keterangan FAQ/intro teks `text-xs`/`text-sm` tanpa fluid di titik sempit.
3. `SocialMosaicSection` grid kolom ganda memotong caption gambar di 360px.
4. Hero interaksi: judul besar + subjudul kursif `text-fluid-h1` + `pb` besar menumpuk tinggi tanpa napas cukup di atas layar 360px (header hero `min-h-screen` + tengah).
5. `JourneyMapSection` (bila diakses lewat CTA "Lihat di Peta" lintas section) memunculkan label marker `whitespace-nowrap` yang dapat meluap dari viewport saat zoom/peta full-width di mobile.
6. Footer puzzle `grid-cols-12` dengan `col-span-1` (≈27px di 360px) membuat ubin terlalu kecil/sumping tak sepadan.
7. Tidak ada *horizontal overflow* fatal level halaman (tidak ada elemen lebar fixed absolut), namun beberapa elemen lokal (tabs, mosaic) perlu penyesuaian.

**Skor indikatif (360px):** 7.8 / 10 — "Lulus mobile-friendly secara fungsional, perlu penyempurnaan mikro & pencegahan overflow lokal".

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

### 3.1 Navbar (global) — ⚠️ Minor
- `w-[95%]` + `rounded-full` + logo + teks brand + hamburger `lg:hidden`. Di 360px hanya tampil logo + tombol hamburger → **tidak overflow**.
- Drawer mobile `w-[92%] max-w-[420px]` → aman.
- **Isu:** subtitle brand `text-[9px]` (Navbar.tsx:148) sangat kecil dan `tracking-[0.2em]` lebar. Ini identitas visual global (bukan konten inti) → **biarkan**, tapi catat sebagai batas bawah keterbacaan.

### 3.2 InteractionHeroSection — ⚠️ Perlu napas
- Judul `text-fluid-h1` (`clamp(2rem,...,4.75rem)` → ~2rem/32px di 360px) + subjudul kursif `text-fluid-h1` → baris kedua menumpuk.
- `min-h-screen` + `flex items-center` → teks vertikal terpusat, namun dengan `tracking` lebar subtitle terasa sempit di 360px.
- **Rekomendasi:** tambahkan `px-6`/`text-center` sudah ada; cukup turunkan `leading` & beri `max-w` agar tidak menempel tepi. **Jangan ubah desktop** — gunakan hanya kelas `max-[400px]:` atau `max-sm:` lokal.

### 3.3 KeterhubunganIntroSection — ⚠️ Minor
- Teks intro `text-sm`/`text-xs` statis → di 360px `text-xs` (12px) terlalu kecil untuk paragraf. Gunakan `text-sm` fluid atau `text-[13px] sm:text-sm`.
- Grid 2 kolom ikon di mobile → ubah ke 1 kolom (`grid-cols-1 sm:grid-cols-2`) agar tidak sempit.

### 3.4 KeterhubunganFormSection — 🔴 Tab topik
- Tab topik (`KeterhubunganFormSection.tsx:232-258`): `flex flex-wrap gap-2` dengan label panjang ("Kerja Sama & Partnership", "Saran & Masukan", "Laporan Masalah"). Di 360px label wrap tidak rata → tinggi baris bertambah tak terduga dan beberapa tombol jadi sangat lebar.
- **Rekomendasi (mobile only):** ubah container menjadi `overflow-x-auto no-scrollbar` + `flex-nowrap` (sama pola dengan `DestinasiTerbaikSection` tabs) agar tab bisa di-scroll horizontal seperti pill, **tanpa mengubah desktop** (`flex-wrap` tetap di `sm:` ke atas).
- Input `text-sm md:text-base` ≥ 14px → ✅ aman. Label `text-sm` ✅.
- Tombol submit `.btn-cta w-full` → ✅ touch target.

### 3.5 FaqAccordionSection — ⚠️ Minor
- Pertanyaan `text-fluid-body` (~16px) ✅. Jawaban `text-fluid-body text-white/70` ✅.
- Tombol accordion `py-5` ✅ tap target. `gap-4` + `pr-9` cukup.
- **Isu kecil:** ikon chevron `h-5 w-5` `shrink-0` → aman. Tidak ada overflow.
- **Rekomendasi:** tidak ada perubahan wajib; opsional turunkan `max-w-3xl` ke `max-w-full` di mobile (sudah `w-full` container).

### 3.6 SocialMosaicSection — 🔴 Caption terpotong
- Grid `grid-cols-2` (atau lebih) memotong caption gambar di 360px:
  - Tiap tile `w-1/2` ≈ 150px → teks caption `text-xs` + `truncate` → tidak terbaca nama akun.
  - **Rekomendasi:** di `< sm` gunakan `grid-cols-2` dengan `aspect-square` konsisten + caption `line-clamp-2` (bukan `truncate`), atau turunkan ke 2 kolom tetap namun naikkan tinggi tile. **Jangan ubah desktop** (`md:` tetap multi-kolom).

### 3.7 Footer (global) — ⚠️ Puzzle tiles
- `grid-cols-12 auto-rows-[72px]` (Footer.tsx:187) dengan `col-span-1` (≈27px di 360px) → ubin terlalu kecil/sumping.
- **Rekomendasi:** di mobile gunakan `grid-cols-6` + `auto-rows-[64px]` (atau `grid-cols-4`) agar ubin minimal ~50px, **tanpa mengubah desktop** (`lg:` tetap `grid-cols-12`).
- Copyright `text-[10px]` (Footer.tsx:237) < 14px → catat sebagai batas bawah; opsional naik ke `text-xs` (12px).

### 3.8 JourneyMapSection (lintas-section via CTA) — ⚠️ Marker label
- Label marker `whitespace-nowrap px-3 py-1 text-[10px]` (JourneyMapSection.tsx:318) → saat peta full-width di mobile, label bisa meluap dari tepi viewport bila marker di pinggir.
- **Rekomendasi:** batasi lebar label `max-w-[120px] truncate` di mobile, atau kecilkan font ke `text-[9px]`. **Jangan ubah desktop** (label tetap `whitespace-nowrap`).

---

## 4. Rencana Perbaikan (Implementasi)

**Prinsip wajib:** Gunakan modifier responsif Tailwind yang **hanya menarget mobile** (`max-sm:`, `max-[400px]:`, `max-[639px]:`, atau `sm:`/`md:` untuk naikkan nilai desktop) agar **tampilan desktop (`md:`/`lg:`/`xl:`) tetap persis seperti sekarang**. Jangan mengubah nilai default kelas yang sudah dipakai di breakpoint desktop.

| # | Komponen | Isu | Perbaikan (mobile-only) | Baris acuan |
|---|----------|-----|--------------------------|-------------|
| 1 | `KeterhubunganFormSection` | Tab topik wrap tak rata | Container tab: `flex flex-wrap gap-2` → `flex flex-nowrap gap-2 overflow-x-auto no-scrollbar sm:flex-wrap sm:overflow-visible`; tiap tombol tambah `whitespace-nowrap shrink-0` | 232-258 |
| 2 | `SocialMosaicSection` | Caption terpotong | Tile grid `< sm`: `grid-cols-2` + `aspect-square`; caption `truncate` → `line-clamp-2`; naikkan `min-h` tile | 165 + grid intern |
| 3 | `Footer` | Puzzle tiles sumping | `grid-cols-12` → `grid-cols-6 lg:grid-cols-12`; `auto-rows-[72px]` → `auto-rows-[60px] lg:auto-rows-[96px]` | 187 |
| 4 | `KeterhubunganIntroSection` | Teks `text-xs` kecil | Paragraf `text-xs` → `text-[13px] sm:text-sm`; grid ikon `grid-cols-2` → `grid-cols-1 sm:grid-cols-2` | intro grid |
| 5 | `InteractionHeroSection` | Napas judul 360px | Tambah `max-[400px]:leading-tight max-[400px]:px-2` (tanpa ubah `md:`) | hero |
| 6 | `JourneyMapSection` | Marker label overflow | Label: `whitespace-nowrap` → `max-[639px]:max-w-[110px] max-[639px]:truncate max-[639px]:whitespace-normal` | 318 |
| 7 | `Footer` | Copyright kecil | `text-[10px]` → `text-[11px] md:text-xs` (naik sedikit, aman) | 237, 207-235 |

**Catatan aksesibilitas (AGENTS.md §9):**
- Semua tombol/tab sudah punya `focus-ring` / `aria-label` → pertahankan.
- Pastikan `overflow-x-auto` pada tab tidak menambah scrollbar terlihat (`no-scrollbar` sudah ada di globals.css:137).

**Verifikasi (AGENTS.md §6.2.4):**
- Jalankan `npm run lint` dan `npm run build` setelah perubahan.
- Cek tidak ada regresi layout desktop dengan membandingkan screenshot/visual manual (wajib Pengguna).
- Laporan kembali: daftar file yang diubah + konfirmasi `npm run build` lolos.

---

## 5. Referensi Riset (Google Mobile Best Practices 2026)

- **Mobile-first indexing**: versi mobile adalah yang di-crawl & diranking → layout harus utuh di 360px.
- **Core Web Vitals**: LCP ≤ 2.5s, INP ≤ 200ms, CLS ≤ 0.1 (target PageSpeed Insights "Mobile").
- **Touch target** ≥ 44×44px (Bluetext/99designs 2025) — tombol CTA & tab sudah memenuhi.
- **Body text ≥ 16px**, teks kecil minimal 14px (Page One Formula 2025) — beberapa teks `text-[9-10px]`/`text-xs` di bawah ambang, dijadikan catatan batas bawah (identitas global, tidak diubah agar tidak mengganggu desain).
- **Hindari horizontal overflow**: gunakan `overflow-x-auto` terisolir untuk tab, bukan melebarkan halaman.
- **Flexible units & fluid type**: proyek sudah pakai `clamp()` (globals.css) — pertahankan, jangan hardcode px di breakpoint mobile.
- **Viewport meta**: sudah `width=device-width, initialScale=1` (layout.tsx:35) ✅ — jangan tambah `user-scalable=no`.
- **Reduce motion**: sudah ada `@media (prefers-reduced-motion: reduce)` (globals.css:373) ✅ — pertahankan.

---

## 6. Status

- [x] Review statis halaman `/interaction` @ 360px
- [x] Riset praktik mobile Google (2026)
- [x] Susun rencana perbaikan (mobile-only, tanpa ubah desktop)
- [ ] Implementasi oleh subagent (role: **Frontend Responsive Engineer**)
- [ ] Verifikasi `npm run lint` + `npm run build`
- [ ] Uji visual manual oleh Pengguna (desktop tetap utuh)
