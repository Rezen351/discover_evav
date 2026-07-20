# Audit Responsivitas Halaman Warisan (Heritage) — Fokus 360px

**Tanggal audit:** 2026-07-20
**Halaman:** `/heritage` (`web/src/app/heritage/page.tsx`)
**Cakupan:** Responsivitas seluler khususnya lebar viewport **360px** (standar umum ponsel Android: Galaxy S8/S9, Pixel, dll.)
**Metode:** Pembacaan statis seluruh komponen section Heritage + riset praktik terbaik Google/Web.dev (Mobile-First Indexing, Responsive Web Design Basics, Core Web Vitals, Fluid Typography `clamp()`).

---

## 1. Ringkasan Eksekutif

Halaman Warisan sudah menggunakan pendekatan **responsive design** yang benar (satu HTML, satu URL, grid `grid-cols-1` di mobile, container `max-w-[98%] xl:max-w-[1600px] mx-auto px-4 md:px-8`). Di 360px sebagian besar layout **tidak meledak (tidak ada horizontal scroll)**. Namun ada beberapa titik yang perlu diperbaiki agar pengalaman di 360px benar-benar nyaman:

| # | Masalah | Severity | Lokasi |
|---|---------|----------|--------|
| 1 | Tailwind `tracking-[0.35em]` / `tracking-[0.3em]` pada teks kapital panjang memicu **wrap kasar & jarak antar huruf terlalu renggang** di 360px | Sedang | Hero, Prolog, Penghormatan, banyak eyebrow |
| 2 | **Peta suksesi** (`ol` + `border-l`) di 360px terlalu sempit; `pl-8` + `card p-6` menyisakan ruang bacaan sempit | Sedang | Karel, Ratskap (Garis Suksesi) |
| 3 | Grid `grid-cols-2` tetap 2 kolom di 360px untuk **7 kampung adat** → label teks panjang (mis. "Kampung Lairngaggas") wrap & saling tabrak | Sedang | Ratskap "Tujuh Kampung"/"Wilayah Kekuasaan" |
| 4 | `snap-start snap-always` + `min-h-screen` pada setiap section membuat **scroll-snap agresif** di mobile (sulit berhenti di tengah section panjang) | Ringan | Seluruh section |
| 5 | `btn-cta` outline hitam di latar gelap (`bg-[#0C121D]`) **kontras rendah** (border `#1a1a1a` di atas hitam) | Ringan | PenutupHeritageSection |
| 6. | Teks hero `text-fluid-h1` di 360px ~32px dengan `tracking`/`leading` default — baris "Jejak yang Mengukir Evav" cukup padat namun masih ok | Info | Hero |
| 7 | Beberapa `min-h-screen` + `flex items-center` membuat section pendek (Penghormatan) terasa "kosong" di 360px, tapi tidak rusak | Info | Penghormatan |

**Verdict:** Tidak ada *horizontal overflow* kritis. Perbaikan bersifat *polish* kenyamanan baca dan kerapian micro-layout di 360px.

---

## 2. Analisis per Komponen (360px)

### 2.1 HeroHeritageSection (`components/heritage/HeroHeritageSection.tsx`)
- `min-h-screen` + `flex items-center` → OK, teks terpusat.
- `text-fluid-h1` di 360px = `clamp(2rem, 1.6rem + 3vw, 4.75rem)` → ~32px. Terbaca jelas.
- **Masalah:** eyebrow `tracking-[0.35em] text-white/60` (baris "WARISAN KEPULAUAN KEI"). Di 360px lebar ~328px konten, tracking 0.35em pada ~21 huruf kapital membuat baris sangat melebar dan berpotensi wrap tidak rata. Disarankan turunkan ke `tracking-[0.2em]` di mobile atau `text-fluid-eyebrow` (sudah ada token, tapi di sini hardcode tracking).
- CTA "Telusuri Warisan" `mt-12` + ikon chevron → aman.

### 2.2 PrologHeritageSection (`components/heritage/PrologHeritageSection.tsx`)
- Grid kartu `grid-cols-1 md:grid-cols-2` → 1 kolom di 360px ✅.
- Grid gambar `grid-cols-1 sm:grid-cols-2` → di 360px (di bawah `sm`=640px) 1 kolom ✅.
- **Masalah kecil:** `tracking-[0.3em]` pada eyebrow "MENGAPA WARISAN INI HIDUP" di 360px agak renggang; pertimbangkan `tracking-[0.2em] sm:tracking-[0.3em]`.

### 2.3 KarelHeritageSection (`components/heritage/KarelHeritageSection.tsx`)
- Semua grid sudah `grid-cols-1` di mobile ✅.
- **Timeline (Rekam Jejak):** `ol` dengan `border-l-2` + `ml-4` + `pl-8 md:pl-12`, lalu card `p-6`. Di 360px ruang bacaan tersisa ~328 - 16(ml) - 20(pl) - 48(padding) ≈ 244px. Cukup sempit untuk deskripsi panjang ("Mengawal persatuan Indonesia menghadapi pemberontakan RMS..."). Disarankan `pl-6 md:pl-10` dan `p-5 md:p-8` untuk menambah ruang di mobile.
- **Warisan Terabadikan (kolase asimetris):** `grid-cols-1 sm:grid-cols-2 md:grid-cols-3 auto-rows-[200px]`. Di 360px 1 kolom ✅. Item `className: "sm:col-span-2 ..."` hanya aktif di `sm:` ke atas, jadi di 360px semua 1 kolom penuh — **aman, tidak ada span meledak**.
- Gambar `sizes="(max-width: 768px) 100vw, 33vw"` → benar untuk 1 kolom mobile ✅.

### 2.4 RatskapHeritageSection (`components/heritage/RatskapHeritageSection.tsx`)
- **Tujuh Kampung Adat:** `grid-cols-2 ... sm:grid-cols-3 lg:grid-cols-4`. Di 360px **2 kolom**. Label "Kampung Lairngaggas" (19 huruf) di kartu `aspect-[4/3]` lebar ~158px akan **wrap 2-3 baris** dan caption bisa saling menempel antar kartu. Disarankan `grid-cols-1 xs:grid-cols-2` (tambah breakpoint `xs`=400px) atau beri `text-xs` + `leading-tight` + `truncate`/`text-center` pada caption.
- **Wilayah Kekuasaan (chips):** `grid-cols-2 md:grid-cols-3 lg:grid-cols-4` dengan chip `px-4 py-3 text-sm`. Di 360px 2 kolom; chip "Lairngaggas" + ikon map bisa wrap. Disarankan `grid-cols-2` tetap tapi `text-xs` + `gap-2` + `px-3`.
- **Garis Suksesi (ol):** sama seperti timeline Karel, `pl-8` + `p-6` → ruang bacaan sempit di 360px. Gunakan `pl-6 md:pl-12` + `p-5 md:p-8`.
- **Legitimasi Bento:** `grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 auto-rows-[220px]`. Di 360px 1 kolom, item besar `h-[260px] sm:h-full sm:col-span-2 sm:row-span-2`. Karena di mobile `sm:col-span-2` tidak aktif → 1 kolom `h-[260px]` ✅ aman.
- Gambar `sizes="(max-width: 768px) 100vw, 50vw"` → benar ✅.

### 2.5 PenghormatanHeritageSection (`components/heritage/PenghormatanHeritageSection.tsx`)
- `min-h-screen flex items-center justify-center` + teks `max-w-3xl text-center` → di 360px teks rata tengah, `px-4` ✅.
- `text-fluid-h2` ~32px, "Dua Warisan yang Masih Berdetak" wrap rapi ✅.
- `tracking-[0.35em]` pada label "PENGHORMATAN" → renggang di mobile (sama seperti hero).

### 2.6 PenutupHeritageSection (`components/heritage/PenutupHeritageSection.tsx`)
- `grid-cols-1 lg:grid-cols-2` → 1 kolom di 360px ✅. Gambar `aspect-[4/3]` + teks di bawah.
- **Tombol CTA (kritik kontras):** di section `bg-[#0C121D]` (hitam kebiruan), tombol `btn-cta-dark` (border `#fff`, teks `#fff`) → kontras OK ✅. Namun tombol "Jelajahi Jiwa Kei" dkk menggunakan `btn-cta-dark` ✅ aman. (Catatan: jika kelak latar diubah terang, pastikan tidak pakai `btn-cta` outline hitam di atas gelap.)
- Baris tombol `flex flex-col sm:flex-row` → di 360px **vertikal stack** full-width ✅ baik untuk tap target.
- `Ain Ni Ain` cursive `text-3xl` → aman.

---

## 3. Temuan Sistemik (berlaku semua section)

### 3.1 Scroll Snap terlalu agresif di mobile
Seluruh section memakai `snap-start snap-always` + `min-h-screen`. Di 360px dengan satu tangan, `snap-always` memaksa tiap section "ngunci" penuh — sulit berhenti di tengah section yang tinggi teksnya (mis. Karel "Latar Belakang"). 
**Rekomendasi:** nonaktifkan snap di mobile, aktifkan hanya `md:` ke atas:
```tsx
className="... snap-start snap-always md:snap-start md:snap-always ..."
```
Atau ganti container parent (`<main>`) agar `snap-type` hanya `md:` (lihat §5).

### 3.2 Tracking kapital (letter-spacing) terlalu lebar di 360px
Token eyebrow pakai `tracking-[0.3em]`–`[0.35em]`. Di viewport sempit ini membuat teks kapital panjang melebar/wrap jelek. 
**Rekomendasi:** gunakan kelas responsif `tracking-[0.18em] xs:tracking-[0.25em] sm:tracking-[0.3em]`.

### 3.3 Tidak ada breakpoint `xs` (~400px)
Beberapa grid (kampung adat, chips) akan lebih enak jika punya `xs:grid-cols-2` ketimbang langsung 2 kolom di 360px. Tailwind default tidak punya `xs`; bisa ditambahkan di `tailwind.config` (v4 via `@theme`/`@media`) atau cukup sesuaikan `grid-cols-1` + `sm:grid-cols-2` dengan caption yang lebih ketat.

### 3.4 Kedalaman container & padding sudah sesuai standar
`max-w-[98%] xl:max-w-[1600px] mx-auto px-4 md:px-8 w-full` konsisten di semua section ✅ (sesuai AGENTS.md §7.2.4). Di 360px `px-4` = 16px kiri/kanan → konten ~328px, proporsional dan tidak overflow.

---

## 4. Riset: Praktik Terbaik Google / Web.dev untuk Mobile 360px

Berdasarkan dokumentasi resmi Google Search Central & web.dev (diakses 2026-07-20):

### 4.1 Mobile-First Indexing & Responsive Design
- Google **sangat merekomendasikan Responsive Web Design** (satu HTML, satu URL, layout berubah via CSS) — persis yang dipakai halaman ini ✅.
- Konten mobile harus **setara** dengan desktop (teks, gambar, alt, heading). Halaman ini mempertahankan seluruh teks & heading di mobile ✅.
- **Jangan lazy-load konten utama** lewat interaksi user (swipe/click). Di sini gambar pakai `next/image` lazy bawaan, tapi semua di bawah lipatan — sesuai panduan (LCP hero tetap `priority`) ✅.

### 4.2 Responsive Web Design Basics (web.dev)
- **Viewport meta tag** wajib `width=device-width`. Cek `layout.tsx` memakai `viewport` export Next.js (standar) — pastikan ada. Tanpa ini, 360px akan zoom-out.
- **Hindari horizontal scroll.** Konten harus muat di viewport. Audit di atas: tidak ada overflow horizontal di 360px ✅.
- **Gunakan grid/flex + media query**, biarkan konten menentukan breakpoint (bukan per-perangkat). Grid Tailwind di sini sudah mengikuti ini ✅.
- **Optimalkan teks untuk bacaan:** ideal 70–80 karakter/baris; tambah breakpoint saat blok teks melewati ~10 kata.
- **Jangan sembunyikan konten** hanya karena tidak muat — cukup reflow. Halaman ini tidak menyembunyikan konten ✅.

### 4.3 Fluid Typography dengan `clamp()` (web.dev / Smashing Magazine / Modern CSS)
- Gunakan `clamp(MIN, PREFERRED, MAX)` dengan `PREFERRED` berisi campuran `rem` + `vw` (mis. `clamp(2rem, 1.5rem + 3vw, 4.75rem)`).
- **Anti-pola:** `font-size: 4vw` murni → memutus zoom browser (gagal **WCAG 1.4.4 Resize Text**, wajib bisa zoom 200%).
- Minimal `16px` (1rem) untuk body; heading boleh fluid agresif, **body & UI label tetap stabil**.
- Di halaman ini, token `--text-fluid-*` sudah pakai `clamp` dengan campuran `rem`+`vw` ✅ — artinya **sudah aksesibel terhadap zoom**. Ini poin plus.
- **Saran:** `line-height` heading di mobile perlu sedikit lebih longgar saat wrap. Token `.text-fluid-h1` pakai `line-height: 1.08` (globals.css:165) — untuk heading 2 baris di 360px agak rapat; naikkan ke `1.12`–`1.15` di breakpoint mobile.

### 4.4 Core Web Vitals (LCP / INP / CLS)
- **LCP ≤ 2.5s:** Hero image `priority` ✅. Pastikan tidak `loading="lazy"` di atas lipatan (sudah benar).
- **CLS ≤ 0.1:** Semua `next/image` pakai `fill` di container berukuran tetap (`aspect-*`, `h-[...]`) ✅ — tidak ada layout shift.
- **INP ≤ 200ms:** GSAP ScrollTrigger di-init dalam `gsap.context()` + cleanup `ctx.revert()` ✅ (sesuai AGENTS.md §7.1.4). Pastikan tidak ada long task berat di main thread saat scroll.

### 4.5 Touch & Tap Targets
- Google menyarankan elemen bisa disentuh (tap target) minimal ~48×48px. Tombol CTA & kartu (`p-8`, `px-6 py-3`) memenuhi ✅. Chip kampung (`px-4 py-3`) ~44px tinggi — masih layak, bisa dinaikkan ke `py-3` konsisten.

---

## 5. Rencana Perbaikan (Konkret)

> Catatan: ubahan dilakukan **lokal & terfokus** (AGENTS.md §7.1.3 Minimal Footprint). Tidak mengubah desain global kecuali disebut.

### 5.1 Nonaktifkan scroll-snap di mobile
Di `page.tsx` `<main>` dan/atau tiap section, buat snap hanya `md:` ke atas. Contoh pada section:
```tsx
// sebelum
className="relative w-full min-h-screen snap-start snap-always flex items-center ..."
// sesudah
className="relative w-full min-h-screen md:snap-start md:snap-always flex items-center ..."
```
Terapkan ke: Hero, Prolog, Karel, Ratskap (sub-div), Penghormatan, Penutup. (Atau cukup set `snap-type` di `<main>` hanya `md:snap-y md:snap-mandatory`.)

### 5.2 Perketat tracking kapital di mobile
Buat util responsif atau ubah inline:
```tsx
// eyebrow pattern
className="... tracking-[0.18em] xs:tracking-[0.25em] sm:tracking-[0.3em] ..."
```
Terapkan di: Hero (`tracking-[0.35em]`), Prolog (`tracking-[0.3em]`), Penghormatan (`tracking-[0.35em]`), semua `text-fluid-eyebrow` di Ratskap/Karel.

### 5.3 Grid kampung adat & chips lebih ramah 360px
- Tujuh Kampung (`RatskapHeritageSection`): 
  ```tsx
  grid-cols-1 xs:grid-cols-2 sm:grid-cols-3 lg:grid-cols-4
  ```
  + caption `text-xs leading-tight text-center` (hindari wrap kasar).
- Wilayah Kekuasaan chips: `grid-cols-2 gap-2 md:grid-cols-3 lg:grid-cols-4` + `text-xs px-3 py-2.5`.

### 5.4 Lebih banyak ruang bacaan timeline/suksesi di mobile
```tsx
// ol
className="relative ml-3 md:ml-6 border-l-2 border-brand/30"
// li
className="... pl-6 md:pl-12 pb-8 md:pb-10 last:pb-0"
// card
className="... p-5 md:p-8"
```
Terapkan di timeline Karel & Garis Suksesi Ratskap.

### 5.5 Line-height heading mobile
Di `globals.css`:
```css
.text-fluid-h1 { font-size: var(--text-fluid-h1); line-height: 1.15; }
@media (min-width: 768px) { .text-fluid-h1 { line-height: 1.08; } }
```
Begitu juga `text-fluid-h2` (naikkan ke `1.18` mobile, `1.12` desktop).

### 5.6 (Opsional) Tambah breakpoint `xs` di Tailwind v4
Di `@theme`/config Tailwind v4, daftarkan `xs: 400px` agar `xs:grid-cols-2` valid. Jika tidak ingin ubah config, gunakan `min-[400px]:grid-cols-2` (arbitrary variant Tailwind v4 mendukung).

---

## 6. Checklist Verifikasi (manual di browser — sesuai AGENTS.md §6.2.5)

- [ ] Buka `/heritage` di DevTools device toolbar, width **360px**.
- [ ] Pastikan **tidak ada horizontal scroll** (geser kiri-kanan = nihil).
- [ ] Periksa 7 kartu kampung adat: caption tidak saling tumpang-tindih.
- [ ] Periksa timeline & garis suksesi: teks tidak keluar card, padding nyaman.
- [ ] Periksa eyebrow kapital: tidak wrap aneh / terlalu renggang.
- [ ] Scroll: snap tidak "ngunci" paksa di mobile (jika diubah §5.1).
- [ ] Zoom 200%: seluruh teks tetap membesar (validasi `clamp` rem-based).
- [ ] Tap target tombol ≥ 44px.

---

## 7. Referensi

- Google Search Central — Mobile-first Indexing Best Practices: https://developers.google.com/search/docs/crawling-indexing/mobile/mobile-sites-mobile-first-indexing
- web.dev — Responsive Web Design Basics: https://web.dev/articles/responsive-web-design-basics
- web.dev — Baseline in Action: Fluid Type: https://web.dev/articles/baseline-in-action-fluid-type
- web.dev — Top Core Web Vitals: https://web.dev/articles/top-cwv
- Smashing Magazine — Modern Fluid Typography Using CSS Clamp: https://www.smashingmagazine.com/2022/01/modern-fluid-typography-css-clamp/
- AGENTS.md §7.2 (Styling/Tailwind), §6.2.5 (Uji Visual manual), §7.1.4 (GSAP cleanup).
- Grand Design: `docs/GRAND_DESIGN.md` §6.5 Design Restraint.
