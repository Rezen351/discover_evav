# Review Responsivitas Halaman Budaya (`/culture`) — Fokus 360px

> **Tanggal:** 2026-07-20
> **Situs:** Simfoni Evav — `web/src/app/culture` + komponen `web/src/components/culture/*`
> **Tujuan:** Mengaudit responsivitas halaman Budaya & Sejarah Kepulauan Kei pada viewport **360px** (lebar CSS terkecil yang masih masuk klaster ponsel mainstream), lalu membandingkannya dengan praktik terbaik *mobile-first* Google / web.dev / WCAG 2.2, dan merumuskan rencana perbaikan.

---

## 1. Ringkasan Eksekutif

Halaman `/culture` relatif **baik** di mobile karena sebagian besar layout menggunakan `grid-cols-1` sebagai default (mobile-first) dan container terpusat `max-w-[98%] mx-auto px-4 md:px-8`. Tidak ditemukan *horizontal scroll* fatal atau elemen dengan lebar tetap (`width: 600px`) yang merusak 360px.

Namun ada **beberapa isu nyata** yang muncul khusus di 360px:

1. **Hero — quote overlay (glass-dark) tidak stack**: pada `< md` quote duduk di kolom kanan yang langsung menimpa narasi kiri dalam satu kolom, menambah tinggi dan memaksa teks panjang (quote Ain Ni Ain 2 baris + attribution) terdesak. Perlu dievaluasi urutan/visibilitas di mobile.
2. **Bentuk min-height grid Filosofi**: `sm:auto-rows-[220px]` berarti di 360px (di bawah `sm`) tinggi tile dikendalikan `h-[240px]`/`h-[320px]`, namun tile hero `sm:col-span-2 sm:row-span-2` **tidak berlaku di 360px** sehingga hero jadi 1 kolom biasa — ini aman, tapi gap `gap-4` sangat rapat di layar sempit.
3. **Tap target carousel Ekspresi**: tombol prev/next (`h-10 w-10` = 40px) **di bawah** rekomendasi 48px Google/WCAG 2.5.8. Dot indicator (`h-2`) juga sangat kecil.
4. **Ekspresi panel media `aspect-[16/10]`** di 360px menghasilkan tinggi ~230px — cukup kecil untuk membaca narasi overlay yang panjang (mis. Tari Sawat 3 baris).
5. **Teks `tracking-[0.3em]` pada eyebrow** ("SATU TELUR, SERIBU AGAMA") di 360px rentan *overflow/terpotong* jika tidak wrap; perlu `break-words`/`text-balance`.
6. **Timeline `pl-8` + `border-l`** memakan lebar; di 360px kartu konten menyempit menjadi ~280px.
7. **Tombol video Ekspresi** (`px-4 py-2` + teks "Putar Video") di 360px cukup lebar namun tinggi < 48px.

Secara keseluruhan: **tidak ada blocker kritis**, tapi perlu penyesuaian padding, tap target, dan pengelolaan teks panjang agar memenuhi standar Google Mobile Usability & WCAG 2.2 di 360px.

---

## 2. Metodologi Review

- Membaca seluruh komponen `culture/*` dan `app/culture/page.tsx`.
- Memetakan setiap section ke breakpoint Tailwind yang digunakan.
- Membandingkan dengan riset *best practice* 2026 (lihat §5).
- Mengidentifikasi elemen yang gagal di 360px lewat inspeksi kelas Tailwind (lebar container, tap target, fluid type, overflow).

> Catatan: Agent **tidak** menjalankan pengujian visual di browser (sesuai AGENTS.md §6.5 — uji visual/UX wajib manual oleh Pengguna). Daftar di bawah adalah *hasil analisis kode statis*, bukan konfirmasi pixel.

---

## 3. Inventaris Section & Status 360px

| Section | File | Layout Mobile | Status 360px |
|---------|------|---------------|-------------|
| Hero | `HeroBudayaSection.tsx` | `grid-cols-1 lg:grid-cols-12` | ⚠️ Quote overlay menumpuk di bawah narasi; teks panjang |
| Larvul Ngabal | `LarvulNgabalSection.tsx` | `grid-cols-1 lg:grid-cols-2`, 3 pilar `md:grid-cols-3` | ✅ Aman; di 360px 1 kolom |
| Filosofi (Bento) | `FilosofiSection.tsx` | `grid-cols-1 sm:grid-cols-2 lg:grid-cols-4` | ⚠️ Gap rapat (`gap-4`); tile hero tidak span di 360px |
| Ekspresi Budaya | `EkspresiBudayaSection.tsx` | `grid-cols-1 lg:grid-cols-12`, tab vertikal + panel | ⚠️ Tap target carousel 40px; panel pendek |
| Breather | `BreatherSection.tsx` | 1 kolom quote + CTA | ✅ Aman |
| Warisan Takbenda | `WarisanTakbendaSection.tsx` | `grid-cols-1 md:grid-cols-3` | ✅ Aman di 360px |
| Timeline | `BudayaTimelineSection.tsx` | 1 kolom + `border-l` + `pl-8` | ⚠️ Lebar konten menyusut ~280px |
| Navbar | `Navbar.tsx` | Hamburger `< lg` | ✅ Aman (drawer `w-[92%]`) |

---

## 4. Temuan Detail & Rekomendasi Perbaikan

### 4.1 Hero — quote overlay di mobile ⚠️
**Lokasi:** `HeroBudayaSection.tsx:74-116`
**Masalah:** Di `< md` grid jadi 1 kolom. Quote `glass-dark` (padding `p-6`) muncul *di bawah* narasi H1 + subtitle + scroll hint. Di 360px tinggi layar terbatas; quote Ain Ni Ain (2 baris panjang) + attribution menambah ~200px, menunda LCP konten utama dan membuat hero terasa padat.
**Perbaikan:**
- Beri jarak vertikal eksplisit antara narasi dan quote: `className="... mt-10 lg:mt-0"`.
- Atau sembunyikan quote di `< sm` dan tampilkan sebagai elemen terpisah setelah hero (jaga *content parity* — jangan `display:none` permanen, cukup `max-lg:hidden` yang tetap ada di DOM untuk SEO/aksesibilitas, atau pindahkan ke section berikutnya).
- Pastikan `text-fluid-h4` quote tidak melebihi lebar: tambah `text-balance`.

### 4.2 Tap target carousel Ekspresi (40px < 48px) ⚠️
**Lokasi:** `EkspresiBudayaSection.tsx:260,268` (`h-10 w-10`) dan dot `:272-284` (`h-2`)
**Masalah:** Tombol prev/next 40×40px di bawah rekomendasi 48×48px Google & Lighthouse audit. Dot indicator `h-2` (8px) terlalu kecil untuk disentuh akurat.
**Perbaikan:**
- Naikkan ke `h-11 w-11` (44px) minimum, ideal `h-12 w-12` (48px) di mobile: `className="... h-12 w-12 lg:h-10 lg:w-10"`.
- Dot: beri `min-h-[12px] min-w-[12px]` dan padding area klik (`p-2` wrapper) agar area sentuh ≥ 24px (WCAG 2.5.8 minimal) atau 48px (Google).
- Bahasa Indonesia `aria-label` sudah benar ✅.

### 4.3 Panel media Ekspresi terlalu pendek di 360px ⚠️
**Lokasi:** `EkspresiBudayaSection.tsx:222` (`aspect-[16/10]`)
**Masalah:** Di 360px, lebar ~328px → tinggi ~205px. Narasi overlay (judul H3 + 3 baris body) menumpuk di bagian bawah dengan gradient `from-black/85`, teks bisa terpotong/tidak nyaman dibaca.
**Perbaikan:**
- Gunakan rasio lebih tinggi di mobile: `aspect-[4/3] md:aspect-[16/9] lg:aspect-auto` (tinggi ~246px), atau tetapkan `min-h-[260px] lg:min-h-0`.
- Pastikan narasi `p-6` cukup; turunkan `line-clamp` jika perlu.

### 4.4 Filosofi Bento — gap rapat & tile hero tidak span ⚠️
**Lokasi:** `FilosofiSection.tsx:88` (`gap-4 md:gap-6`), `:96` (`sm:col-span-2`)
**Masalah:** Di 360px grid `grid-cols-1`, semua tile vertikal dengan `gap-4` (16px) — terasa sempit antar kartu. Tile hero `sm:col-span-2` baru aktif di ≥640px, jadi di 360px semua tile ukuran sama (aman tapi kehilangan hierarki visual "hero").
**Perbaikan:**
- Naikkan gap mobile: `gap-5 sm:gap-4 md:gap-6`.
- Pertahankan hierarki hero di mobile dengan memberi tile hero `min-h-[300px]` vs tile lain `min-h-[240px]` (sudah `h-[320px]`/`h-[240px]` — cukup, tapi pastikan tidak overflow teks).
- Pastikan `line-clamp-4`/`line-clamp-3` aktif (Tailwind v4 mendukung ✅).

### 4.5 Eyebrow ber-`tracking` lebar rawan overflow ⚠️
**Lokasi:** semua section pakai `tracking-[0.3em]` pada eyebrow (mis. `FilosofiSection.tsx:73`, `LarvulNgabalSection.tsx:60`)
**Masalah:** "SATU TELUR, SERIBU AGAMA" dengan letter-spacing 0.3em di 360px bisa mendekati lebar penuh dan memaksa kata terakhir ke baris baru secara tidak rapi, atau terpotong jika `whitespace-nowrap` (tidak ada di sini, aman, tapi riskan).
**Perbaikan:**
- Tambah `break-words`/`text-balance` pada eyebrow: `className="... tracking-[0.3em] text-balance"`.
- Turunkan tracking di mobile jika perlu: `tracking-[0.2em] sm:tracking-[0.3em]`.

### 4.6 Timeline — lebar konten menyusut ⚠️
**Lokasi:** `BudayaTimelineSection.tsx:69` (`ml-4 md:ml-6 border-l-2`), `:73` (`pl-8 md:pl-12`)
**Masalah:** Di 360px: container `px-4` (16px) + `ml-4` (16px) + `pl-8` (32px) = ~64px terpakai untuk garis & indent. Sisa untuk kartu ~280px. Kartu `p-6` (24px) → teks ~232px — masih terbaca tapi sempit untuk node dengan deskripsi panjang ("Napak Tilas Pengangkatan Raja Manyeuw" 3 baris).
**Perbaikan:**
- Kurangi indent mobile: `pl-6 md:pl-12` dan `ml-2 md:ml-6`.
- Tambah `min-w-0` pada kartu agar teks wrap benar (mencegah overflow karena kata panjang tanpa spasi — tidak ada di data saat ini, tapi aman).

### 4.7 Tombol "Putar Video" tinggi < 48px ⚠️
**Lokasi:** `EkspresiBudayaSection.tsx:295` (`px-4 py-2`)
**Masalah:** Tinggi tombol ~36px, di bawah 48px.
**Perbaikan:** `py-2.5 lg:py-2` (→ ~44px) atau `min-h-[44px]`.

### 4.8 Navbar drawer aman ✅
**Lokasi:** `Navbar.tsx:198` (`w-[92%] max-w-[420px]`)
Drawer lebar 92% viewport → di 360px ~331px, muat 5 link + toggle bahasa. Tap target link `py-2.5` + `text-sm` cukup. Tidak ada isu 360px.

---

## 5. Riset: Standar Responsif Mobile (Google & WCAG 2.2, 2026)

Sumber: web.dev *Responsive Web Design Basics*, Google Mobile-First Indexing, WCAG 2.2 SC 2.5.8, dan ringkasan praktik 2026 (DeviceSpecsHub, The SEO Company, Adriano Junior).

### 5.1 Fakta kunci yang relevan dengan audit ini
- **Klaster 360–430px adalah dominan**: >60% perangkat memiliki lebar CSS 360–430px. **360px adalah dasar (base) mobile-first** — jangan hanya menguji di 375px. (DeviceSpecsHub 2026)
- **Mobile-first indexing**: Google mengindeks versi mobile. Konten yang `display:none` di mobile **tidak diindeks**. Pastikan parity konten desktop↔mobile.
- **Tap target**: Google/Lighthouse lolos di **48×48px**; WCAG 2.2 AA (SC 2.5.8) minimal **24×24px** dengan jarak 8px. Target: 48px. (Google, Digital.gov, WCAG)
- **Font body**: minimum **16px** (Lighthouse flag <16px; <12px = error). Gunakan `clamp()`/unit relatif. (web.dev, Digital.gov)
- **Tanpa horizontal scroll** di 360px: penyebab umum = gambar tanpa `max-width:100%`, elemen lebar tetap, `width:100vw` (termasuk scrollbar), grid `1fr` tanpa `minmax(0,1fr)`. (web.dev, jwatte.com)
- **Safety net**: `html, body { overflow-x: hidden }` + `img,video,iframe { max-width:100% }` + `min-w-0` pada flex/grid child agar kolom bisa menyusut. (jwatte.com)
- **Baris terlalu panjang**: ideal 70–80 karakter/baris; di mobile pecah paragraf panjang, banyak subheading. (Digital Applied)
- **Gambar responsif**: `next/image` + `sizes` benar; jangan kirim 1200px ke 360px. (sudah dipakai di proyek ✅)
- **Safe-area / notched phone**: gunakan `env(safe-area-inset-*)` untuk elemen fixed (Navbar `top-6` sudah aman, tapi pertimbangkan `padding-top` inset). (DeviceSpecsHub)

### 5.2 Checklist 360px (Google Mobile Usability 2026)
- [x] Viewport meta (`width=device-width`) — ada di `layout.tsx` (Next.js default)
- [x] Tidak ada `user-scalable=no` / `maximum-scale=1`
- [~] Tap target ≥48px — **sebagian gagal** (carousel 40px, video btn 36px)
- [x] Body text ≥16px — `text-fluid-body` `clamp(0.95rem…1.05rem)` ≈ 15.2–16.8px; di 360px ~15.2px (marginal, naikkan min ke 1rem)
- [x] Tidak ada horizontal scroll fatal
- [ ] Uji parity konten mobile↔desktop — quote hero perlu dicek tidak hilang

---

## 6. Rencana Perbaikan (Prioritas)

| # | Prioritas | Perubahan | File | Detail |
|---|-----------|-----------|------|--------|
| 1 | Tinggi | Carousel tap target → 48px + dot area klik | `EkspresiBudayaSection.tsx` | `h-12 w-12 lg:h-10 lg:w-10`; wrapper dot `p-2` |
| 2 | Tinggi | Tombol "Putar Video" `min-h-[44px]` | `EkspresiBudayaSection.tsx` | `py-2.5 lg:py-2` |
| 3 | Sedang | Panel media rasio `aspect-[4/3]` di mobile | `EkspresiBudayaSection.tsx` | `aspect-[4/3] md:aspect-[16/9] lg:aspect-auto` |
| 4 | Sedang | Hero quote: jarak `mt-10 lg:mt-0` / `text-balance` | `HeroBudayaSection.tsx` | hindari tumpukan padat |
| 5 | Sedang | Eyebrow `text-balance` + tracking mobile | semua section culture | `tracking-[0.2em] sm:tracking-[0.3em] text-balance` |
| 6 | Rendah | Timeline indent mobile `pl-6 ml-2` + `min-w-0` | `BudayaTimelineSection.tsx` | lebar konten lebih longgar |
| 7 | Rendah | Filosofi gap `gap-5 sm:gap-4` | `FilosofiSection.tsx` | napas antar tile |
| 8 | Rendah | `text-fluid-body` min → `1rem` (16px) | `globals.css` | `clamp(1rem, 0.95rem+0.25vw, 1.05rem)` |
| 9 | Rendah | Safety net `overflow-x:hidden` + `min-w-0` grid children | `globals.css` | cegah overflow tak terduga |

> Semua perubahan harus mengikuti GRAND_DESIGN §4.1 (container), §13 (utility terpusat), dan tetap pakai token warna `text-brand`, `bg-section`, dll. **Tidak** ada hardcode hex/warna baru.

---

## 7. Catatan Verifikasi (Wajib Manual)

Agent **tidak** menguji visual (AGENTS.md §6.5). Setelah perbaikan diterapkan, Pengguna wajib:
1. Buka DevTools → Device Toolbar → set **360px** (dan 390px, 430px).
2. Scroll seluruh halaman `/culture`, pastikan **tidak ada horizontal scroll**.
3. Cek tap target carousel & video bisa disentuh nyaman (≥48px).
4. Jalankan Lighthouse (Mobile) → seksi SEO & Accessibility hijau.
5. `npm run lint && npm run build` lolos.

---

## 8. Referensi
- web.dev — *Responsive Web Design Basics*: https://web.dev/articles/responsive-web-design-basics
- Google — *Mobile-First Indexing*: https://developers.google.com/search/mobile-sites
- WCAG 2.2 — *Target Size (Minimum) SC 2.5.8*: https://www.w3.org/WAI/WCAG22/Understanding/target-size-minimum
- DeviceSpecsHub — *Responsive Design Breakpoints Guide 2026*: https://devicespecshub.com/blog/responsive-design-breakpoints-2026
- The SEO Company — *Mobile usability / 2026 checklist*: https://theseocompany.com.au/learn/core-web-vitals/mobile-usability/
- jwatte.com — *Mobile presentation parameters* (grid `1fr` / overflow): https://jwatte.com/blog/blog-mobile-presentation-parameters/
