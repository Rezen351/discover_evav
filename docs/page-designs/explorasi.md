# 📐 DOKUMEN DESAIN LAYOUT — MENU EKSPORASI (Festival Pesona Meti Kei + Keindahan Alam Evav)

> **Status:** Draft untuk review (diperbarui) · **Ref:** `docs/GRAND_DESIGN.md` (v2.3)
> **Route:** `/eksplorasi` · **Tujuan Emosional (§26):** RITME & KEDALAMAN → Puncak (Peak-End §27)
> **Filosofi:** *Festival bukan jadwal, tapi perjalanan.* Layar adalah jalan setapak pasir yang surut — dari keheningan laut yang berpamit, menuju keriuhan bersama, lalu kembali tenang dalam penghormatan. Halaman ini **bukan sekadar story-telling festival**: ia juga berfungsi sebagai *etalase keindahan alam* Kepulauan Kei (seperti halaman destinasi wisata pada umumnya) agar pengunjung bisa menjelajahi, memfilter, dan menemukan spot alam yang ingin dikunjungi.
> **Sumber Copywriting:** `docs/Copywriting/Explore.pdf` (Story Brand — 7 Bagian Festival Pesona Meti Kei) + `src/content/` (data spot alam terpusat, lihat §6.1)

---

## 0. RINGKASAN KONSEP (Berdasarkan Riset Web)

Dokumen ini dirancang setelah menelusuri pola layout situs *festival & experience tourism* modern (2025–2026) di web:

| Pola Riset (Web) | Sumber Inspirasi | Adaptasi ke "Eksplorasi / Meti Kei" |
|------------------|------------------|--------------------------------------|
| **Gallery-Walk Scroll** (full-bleed frame, satu narasi per layar) | Rang (Holi) · Ofrenda (Day of the Dead) | Tiap Bagian Meti = satu "frame" layar penuh, satu baris narasi besar, foto sinematik memenuhi viewport. |
| **Scroll-Driven Darkening Narrative** (latar gelap bertahap dari siang→senja→malam) | Ofrenda · Songkran | Halaman bermula terang keemasan (Meti siang), bergerak ke ritme komunal cerah, lalu menukik ke penghormatan tenang di §6, dan ditutup gelap bertabur bintang di §7. |
| **Escalating Call-to-Action** (CTA tumbuh dari teks ke tombol penuh) | Rang · Ofrenda | CTA "Pantau Jadwal Resmi" hadir awal sebagai teks kuning lembut, membesar jadi `.btn-cta` utuh di §7. |
| **Three-Act / Timeline Scrolly** (iti­nerary harian berurutan) | Songkran (3-Day Timeline) | §2–§6 disusun sebagai "babak festival" berurutan dengan nomor Bagian (I–VII) sebagai *chapter marker*. |
| **Asymmetric / Single-column editorial** | Ofrenda · Dieronesie | Hindari grid kartu kaku; gunakan komposisi asimetris foto + teks bergerak (scroll-snap per section). |
| **Fixed bottom CTA bar** (CTA tetap terjangkau saat scroll) | Ofrenda · Songkran | Pinned bar "Pantau Jadwal Resmi →" muncul setelah pengunjung melewati separuh halaman. |
| **Categorized Attraction Showcase** (galeri spot alam terkategorisasi + filter) | Visit Lake Tahoe · Visit Humboldt · McBride Tourism | §6 **Wisata Alam** menghadirkan *etalase spot alam* Kei (pantai, pulau, snorkeling/diving, gua, viewpoint) dalam grid kartu yang bisa difilter kategori — bukan sekadar narasi. Mirip halaman destinasi wisata pada umumnya. |
| **Interactive Destination Map** (peta titik atraksi) | Visit Lake Tahoe (pins on landscape) · Next-gen destination sites | §6 dapat menyertakan peta ringan (adaptasi `JourneyMapSection`) yang menandai titik spot alam (Ngurbloat, Ngurtavur, Pasir Panjang, dsb.) dengan `next/image` + skeleton (§7.3.4). |
| **Specific-Value CTA & Schema (TouristAttraction)** | Destination BC · Patagonia (schema) | CTA spesifik ("Jelajahi Pantai Tersembunyi", "Lihat di Peta") + struktur heading H1–H3 terpilah + `TouristAttraction`/`FAQPage` schema agar dapat diindeks AI/search sebagai destinasi. |

> **Prinsip Ain Ni Ain (§0):** Festival adalah *undangan untuk melebur*, bukan etalase tiket. Tidak ada urgency palsa / countdown manipulatif. Urgensi dibangun dari fakta alam: *"Meti terjadi setahun sekali, mengikuti ritme bulan."*

---

## 1. STRUKTUR SECTION (Ritme Ombak §8.5)

| # | Bagian (PDF) | Section | Mode | BG (§13) | z-index | Ritme |
|---|--------------|---------|------|----------|---------|-------|
| 0 | — | Navbar | — | `bg-nav-gradient` | — | — |
| 1 | I | Hero Meti | Dark sinematik (video timelapse) | `bg-[#000]` / video | z-[8] | Pembuka dramatis: laut berpamit |
| 2 | II | Wer Warat | **Terang Keemasan** | `bg-section` | z-[7] | Terang 1: kebersamaan komunal |
| 3 | III | Pentas Seni & Kebudayaan | **Terang** | `bg-section` | z-[6] | Terang 2: kemegahan budaya |
| 4 | IV | Lomba Perahu Belan | **Split Dinamis** (foto aksi + teks) | `bg-section` / aksen | z-[5] | Split: kecepatan bahari |
| 5 | V | Wisata Alam | **Terang** (grid spot + filter) | `bg-section` | z-[4] | Terang 3: etalase keindahan alam (fungsional) |
| 6 | — | Satwa Endemik Kei | **Terang** (galeri fauna + narasi) | `bg-section` | z-[3] | Terang 4: penghuni asli alam Evav |
| 7 | VI | Penghormatan (Eka Bagus) | **Dark Tropical** (tenang) | `bg-tropical-dark` | z-[3] | Dark: jeda penghormatan (Peak emosional) |
| 8 | VII | Informasi & Penutup | **Dark Bintang** | `bg-[#0C121D]` | z-[2] | Dark: konversi lembut + salam |
| 8 | — | Footer | Dark bintang | `bg-[#0C121D]` | — | "Sampai jumpa di Tanah Evav" |

> **Ritme:** Dark → Terang → Terang → Split → Terang → Terang → **Dark** → **Dark Penutup**. Puncak emosional (Peak-End §27) ditempatkan di §7 Penghormatan, lalu ditutup tenang di §8.

---

## 2. HERO METI (Dark Sinematik) — Bagian I

> **Referensi PDF:** *"Pada Hero section menampilkan video timelapse tentang keindahan lautan dan kepulauan Kei."* · *"Ketika samudera berpamit hingga bermil-mil jauhnya, ia membuka gerbang menuju keajaiban yang tersembunyi. Inilah Meti Total…"*

- **Jenis:** Full-viewport video timelapse (30–45 detik, loop halus, durasi 4K terkompresi).
- **Lazy-video (§7.3.2):** render `<video>` hanya saat section aktif (`preload="none"`, `loading="lazy"` semantik) — jangan muat semua video sekaligus.
- **Eyebrow:** `FESTIVAL PESONA METI KEI`
- **Title:** `Ketika Samudera` · **TitleAccent (cursive §2.4):** `Berpamit`
- **Subtitle (dari PDF, dipangkas untuk hero):**
  > *"Ketika laut mundur hingga berkilo-kilometer, ia membuka gerbang menuju keajaiban. Selamat datang di Festival Pesona Meti Kei."*
- **Scroll hint:** `Selami lebih dalam` (§8.6, bukan "Scroll").
- **Overlay:** `from-black/85 via-black/45 to-black/30` (sama dengan JedaJiwa §9).
- **Teks hero delay-reveal:** muncul setelah ~4 detik (parallax halus GSAP, `prefers-reduced-motion` → statis).

---

## 3. WER WARAT — Bagian II (Terang Keemasan)

> **Referensi PDF:** *"Wer Warat bukan sekadar tradisi; ini adalah undangan untuk melebur. Bergabunglah bersama ribuan orang, bentangkan tali janur kuning, dan rasakan denyut nadi kebersamaan…"*

- **Komposisi Asimetris (Editorial):** kiri foto medium-long shot kerumunan membentangkan tali janur di air dangkal (landscape, depth-of-field fokus aksi). Kanan: narasi besar + chapter marker `BAGIAN II`.
- **Eyebrow:** `TRADISI WER WARAT`
- **Title (serif §2):** `Undangan untuk` · Accent: `Melebur`
- **Narasi (blockquote, dari PDF):**
  > *"Wer Warat bukan sekadar tradisi; ini adalah undangan untuk melebur. Bergabunglah bersama ribuan orang, bentangkan tali janur kuning, dan rasakan denyut nadi kebersamaan saat kita menggiring kawanan ikan karang ke tepi. Di sini, kebahagiaan dipanen bersama, lalu dibakar dan dinikmati di bawah hangatnya matahari pantai."*
- **Microcopy aksi (CTA sekunder):** `Rasakan Kebersamaan` (teks kuning lembut `text-brand`, akan berevolusi di §7).
- **Watermark (§3.2):** motif Tenun Elat opacity 3–5% di latar `bg-section`.

---

## 4. PENTAS SENI & KEBUDAYAAN — Bagian III (Terang)

> **Referensi PDF:** *"Saat angin laut berbisik, dentuman Tifa dan alunan gong Dada memecah keheningan, mengiringi Tari Belan dan Tari Sariat dalam harmoni yang megah…"*

- **Komposisi Split berlawanan** dengan §3 (foto kanan, teks kiri) untuk ritme visual bergantian (§8.5).
- **Visual:** Action shot penari Tari Belan/Sariat, pencahayaan senja dramatis, busana adat cerah. Close-up wajah penuh penghayatan.
- **Eyebrow:** `PENTAS SENI & KEBUDAYAAN`
- **Title:** `Roh Leluhur` · Accent: `yang Hidup`
- **Narasi (dari PDF):**
  > *"Saat angin laut berbisik, dentuman Tifa dan alunan gong Dada memecah keheningan, mengiringi Tari Belan dan Tari Sariat dalam harmoni yang megah. Dibalut busana kebesaran Evav yang menyala, tarian ini menghidupkan kembali roh leluhur, menciptakan atmosfer yang mistis, agung, dan tak terlupakan di atas hamparan pasir yang mengering."*

---

## 5. LOMBA PERAHU BELAN — Bagian IV (Split Dinamis)

> **Referensi PDF:** *"Kecepatan, ketangguhan, dan kekompakan. Lomba perahu layar tradisional Belan adalah penghormatan bagi para pelaut tangguh Nusantara…"*

- **Komposisi Aksi (Gallery-Walk frame):** Foto side-view perahu Belan melaju membelah air, layar terkembang, cipratan beku (freeze motion). Teks overlay kiri bawah dengan vignette `from-black/80`.
- **Eyebrow:** `LOMBA PERAHU BELAN`
- **Title:** `Penghormatan` · Accent: `para Pelaut Tangguh`
- **Narasi (dari PDF):**
  > *"Kecepatan, ketangguhan, dan kekompakan. Lomba perahu layar tradisional Belan adalah penghormatan bagi para pelaut tangguh Nusantara. Saksikan bagaimana perahu-perahu panjang berhias ornamen adat melesat membelah air, mengingatkan kita pada jejak sejarah nenek moyang Kepulauan Kei yang tak kenal takut menaklukkan samudera."*
- **Stat chips (borderless §3.3):** `Kecepatan` · `Ketangguhan` · `Kekompakan` (background pastel navy-pink tipis, ikon `text-brand-navy`).

---

## 6. WISATA ALAM — Bagian V (Terang · Etalase Keindahan Alam)

> **Perubahan (update):** Bagian V yang semula *Wisata Kuliner* diganti menjadi **Wisata Alam** — etalase keindahan alam Kepulauan Kei. Tujuannya agar halaman `/eksplorasi` tidak hanya bercerita (story-telling festival), tapi juga **berfungsi sebagai direktori spot alam** seperti halaman destinasi wisata umumnya (pola Visit Lake Tahoe / Visit Humboldt / McBride Tourism).

### 6.1 Sumber Data Terpusat (§4.10 GRAND_DESIGN — Sentralisasi String)
Semua spot alam **tidak di-hardcode** di komponen. Deklarasikan di `src/content/destinasiAlam.ts` (atau `src/content/eksplorasi.ts`) sebagai array objek bertipe eksplisit:
```ts
type SpotAlam = {
  id: string;
  nama: string;          // "Pantai Ngurbloat"
  kategori: "Pantai" | "Pulau" | "Snorkeling & Dive" | "Gua" | "Viewpoint";
  deskripsi: string;     // 1–2 kalimat, factual
  gambar: string;        // path lokal / remote (daftarkan di images.remotePatterns)
  alt: string;           // alt spesifik §18.3
  koordinat?: { lat: number; lng: number };
};
```
Ini memudahkan filter kategori, peta, dan persiapan i18n di masa depan.

### 6.2 Struktur Section (Fungsional, bukan hanya narasi)
- **Header editorial asimetris** (kiri: eyebrow + title + narasi pembuka; kanan: baris **filter kategori** sebagai pill/chip — `bg-brand/10 text-brand rounded-full`, toggle client-side). Narasi pembuka:
  > *"Di balik Festival Meti, Kepulauan Kei menyimpan surga yang tak pernah tidur: pasir terhalus di dunia, laut sebening kaca, gugusan pulau bagai permata, dan goa-gua yang menyimpan misteri. Jelajahi keindahan alam Evav — pilih kategori, temukan spot, lalu rancang petualanganmu."*
- **Grid kartu spot alam** (`md:grid-cols-2 lg:grid-cols-3`, gap konsisten): tiap kartu `bg-white border border-brand/10 rounded-xl-design shadow-soft hover:border-brand/30`, foto `object-cover` (hover `scale-105`), badge kategori, nama serif `text-black`, deskripsi `text-black/70`, dan CTA kecil `Lihat di Peta` (`.btn-cta` compact, `aria-label="Lihat {nama} di peta"`).
- **Komponen client** (`"use client"`) untuk filter kategori + (opsional) peta ringan. Bungkus GSAP reveal dalam `gsap.context()` + `ctx.revert()`; respek `prefers-reduced-motion`.
- **Interaktif opsional — Peta Spot** (adaptasi `JourneyMapSection` §5 landing): titik `koordinat` dari data, skeleton loader saat peta dimuat (§7.3.4). Dapat di-toggle "Tampilkan Peta / Sembunyikan".
- **CTA penutup section:** `Jelajahi Semua Destinasi` → `/destinasi` (`.btn-cta` primer) + `Lihat di Peta` sekunder (scroll ke peta).

### 6.3 Spesifikasi komponen
- **Eyebrow:** `WISATA ALAM EVAv`
- **Title (serif §2):** `Keindahan` · Accent: `yang Masih Murni`
- **Filter chip:** `Semua` · `Pantai` · `Pulau` · `Snorkeling & Dive` · `Gua` · `Viewpoint` (maks 6 pilihan — Hick's Law §25).
- **Kartu:** `min-h-[320px] lg:min-h-[380px]`, image `h-[200px] md:h-[240px] object-cover rounded-t-xl-design`.
- **Alt spesifik (§18.3):** `"Pantai Ngurbloat — pasir terhalus di dunia, Kepulauan Kei"`, `"Gugusan Pulau Pasir Panjang saat surut"`, `"Spot snorkeling karang Ngurtavur"`, `"Gua alam di Ohoiluk"`.
- **Tidak ada glass** di kartu (§5.6): semua panel solid.

---

## 7. SATWA ENDEMIK KEI (Terang · Penghuni Asli Alam Evav)

> **Tambahan (update):** Section baru yang menampilkan fauna khas/typical Kepulauan Kei — bukan sekadar latar, tapi "penghuni asli" yang menjadikan alam Evav hidup. Selaras filosofi §0 *Ain Ni Ain*: satwa diposisikan sebagai **tamu sejati dan saudara alam** yang kita sambut, bukan objek pamer. Dibungkus dalam narasi hangat, factual, dan rendah hati (konsisten dengan heritage.md §0).

### 7.1 Sumber Data Terpusat
Semua satwa **tidak di-hardcode** di komponen. Tambahkan ke `src/content/eksplorasi.ts` (atau `src/content/satwaEndemik.ts`) sebagai array bertipe eksplisit:
```ts
type SatwaEndemik = {
  id: string;
  nama: string;            // "Pelikan Australia"
  namaLatin?: string;      // "Pelecanus conspicillatus"
  status?: string;         // "Migran musiman" | "Endemik" | "Lokal"
  habitat: string;         // "Pantai Ngurtavur saat surut"
  deskripsi: string;       // 1–2 kalimat factual, hangat
  gambar: string;
  alt: string;
};
```
Agent **wajib riset sendiri** fauna Kepulauan Kei (via web search) — contoh kuat: Pelikan Australia (Pelecanus conspicillatus) yang bermigrasi ke Pasir Timbul Ngurtavur, burung-burung endemik Maluku Tenggara, kuskus/phalanger, kadal, penyu, dll. Cantumkan sumber riset di header file.

### 7.2 Struktur Section
- **Header editorial:** eyebrow `SATWA ENDEMIK KEI`, title `Penghuni` · Accent `Asli Evav`, narasi pembuka:
  > *"Keindahan Kei tidak hanya ada di pasir dan lautnya, tapi juga pada napas-napas kecil yang menghuninya. Dari pelikan Australia yang datang saat pasir timbul membentang, hingga burung dan satwa hutan yang menjadi saudara alam masyarakat Kei — mereka adalah tamu abadi yang membuat Evav tetap hidup."*
- **Galeri fauna:** grid asimetris (`md:grid-cols-2 lg:grid-cols-3`), tiap kartu `bg-white border border-brand/10 rounded-xl-design shadow-soft` berisi foto (`object-cover`, hover `scale-105`), nama serif `text-black`, badge status (`bg-brand/10 text-brand rounded-full`), habitat kecil, dan deskripsi `text-black/70`.
- **Satu quote penghubung (serif, bukan cursive §2.4):** merangkai hubungan manusia–satwa dalam *Ain Ni Ain* (mis. tentang sasi laut yang melindungi habitat bersama).
- **CTA penutup:** `Kenali Budaya Adat` → `/budaya` (`.btn-cta` sekunder) — menghubungkan penjagaan alam dengan adat.
- GSAP reveal dibungkus `gsap.context()` + `ctx.revert()`; respek `prefers-reduced-motion`. Tanpa glass (§5.6).

---

## 8. PENGHORMATAN (EKA BAGUS) — Bagian VI (Dark Tropical · Peak §27)

> **Referensi PDF:** *"Di balik keindahan ini, tersimpan cerita tentang cinta dan pengabdian. Eka Bagus Spot adalah dedikasi bagi dua jiwa muda UGM…"*

- **Mode:** `bg-tropical-dark` (§19) — ini adalah **puncak emosional** (Peak-End Rule §27). Satu foto wide-angle landscape asri (negatif space luas), pencahayaan soft golden hour.
- **Aturan Dark (§19):** text `text-white`, intro `text-white/60`, border `border-white/10`, glow bukan shadow, foto `brightness-110 contrast-105`.
- **Eyebrow:** `PENGHORMATAN`
- **Title (serif):** `Dua Jiwa yang` · Accent: `Pulang ke Alam`
- **Narasi (dari PDF — dipisah dua bagian):**
  - Bagian 1: *"Menampilkan berbagai keindahan dari surga kepulauan Kei — bentangan alam, satwa, dan habitat ekosistem yang sangat asri, indah, dan terjaga."*
  - Bagian 2 (quote emosional): *"Di balik keindahan ini, tersimpan cerita tentang cinta dan pengabdian. Eka Bagus Spot adalah dedikasi bagi dua jiwa muda UGM yang telah mendedikasikan tenaga terakhirnya untuk Tanah Evav. Tempat ini menjadi pengingat abadi akan jasa mereka, di mana masyarakat desa kini mengenang mereka bukan lagi sebagai tamu, melainkan sebagai keluarga yang pulang ke pangkuan alam."*
- **Tidak ada CTA di section ini** — biarkan jeda emosional bernapas (konsisten dengan filosofi §9 Jeda Jiwa).

---

## 9. INFORMASI & PENUTUP — Bagian VII (Dark Bintang · Konversi Lembut)

> **Referensi PDF:** *"Festival ini mengikuti ritme bulan… Pastikan langkah Anda terarah dengan memantau jadwal resmi dari Dinas Pariwisata Maluku Tenggara…"*

- **Mode:** `bg-[#0C121D]` (footer bintang, §13) — transisi gelap menuju penutup.
- **Layout:** Split kiri (foto wide-shot matahari terbenam / masyarakat melambai) + kanan (panel info praktis).
- **Eyebrow:** `INFORMASI & PENUTUP`
- **Title:** `Mari` · Accent: `Jelajahi Tanah Evav`
- **Narasi (dari PDF):**
  > *"Festival ini mengikuti ritme bulan, bergeser mengikuti surut ekstrem yang ajaib. Pastikan langkah Anda terarah dengan memantau jadwal resmi dari Dinas Pariwisata Maluku Tenggara. Persiapkan penerbangan Anda menuju Langgur, dan jadilah bagian dari perayaan akbar yang hanya terjadi setahun sekali ini. Sampai jumpa di Tanah Evav."*
- **Info praktis (pill/list):**
  - `🗓️ Ritme Bulan` — surut ekstrem, setahun sekali
  - `✈️ Bandara Langgur` — pintu masuk Kei
  - `🏛️ Dinas Pariwisata Maluku Tenggara` — jadwal resmi
- **CTA Utama (Escalating → tombak penuh, §2.2.1):**
  - `Pantau Jadwal Resmi` (link ke situs resmi Dinas Pariwisata) — `.btn-cta` (tanpa background, border hitam → hover pink §7.2.5).
  - CTA sekunder: `Hubungi Keluarga Evav` → `/keterhubungan`.
- **Salam penutup (cursive §2.4, global):** `Sampai jumpa di Tanah Evav`.

---

## 9. PINNED BOTTOM CTA BAR (Konversi Persisten)

> Adaptasi dari pola *Fixed Bottom Bar* (Ofrenda / Songkran). Muncul setelah pengunjung melewati ~50% halaman scroll (IntersectionObserver di Client Component).

- **Tampilan:** bar tipis `bg-tropical-dark/95 backdrop-blur` di bawah layar, teks `text-white`.
- **Isi:** `Meti hanya setahun sekali —` + CTA `Pantau Jadwal Resmi →` (`.btn-cta` versi compact, `aria-label="Pantau jadwal resmi Festival Meti Kei"`).
- **A11y:** `role="region"`, dismissible, respek `prefers-reduced-motion` (tanpa slide-in, muncul statis).

---

## 10. COPYWRITING INTI (dari Explore.pdf — §8.6)

| Elemen | Teks (Indonesia, hangat/aktif/spesifik) |
|--------|------------------------------------------|
| Hero subtitle | "Ketika laut mundur hingga berkilo-kilometer, ia membuka gerbang menuju keajaiban. Selamat datang di Festival Pesona Meti Kei." |
| §2 Wer Warat | "Wer Warat bukan sekadar tradisi; ini adalah undangan untuk melebur…" (lihat §3) |
| §3 Pentas Seni | "Saat angin laut berbisik, dentuman Tifa…" (lihat §4) |
| §4 Perahu Belan | "Kecepatan, ketangguhan, dan kekompakan…" (lihat §5) |
| §5 Kuliner | "Rasakan kesegaran yang dipanen langsung dari momen Meti…" (lihat §6) |
| §6 Wisata Alam | "Di balik Festival Meti, Kepulauan Kei menyimpan surga yang tak pernah tidur…" (lihat §6) |
| §7 Satwa Endemik | "Keindahan Kei tidak hanya ada di pasir dan lautnya, tapi juga pada napas-napas kecil yang menghuninya…" (lihat §7) |
| §7 Eka Bagus | "Di balik keindahan ini, tersimpan cerita tentang cinta dan pengabdian…" (lihat §8) |
| §8 Penutup | "Festival ini mengikuti ritme bulan… Sampai jumpa di Tanah Evav." |
| Scroll hint | "Selami lebih dalam" |
| CTA primer | "Pantau Jadwal Resmi" |
| CTA sekunder | "Hubungi Keluarga Evav" / "Rasakan Kebersamaan" |

---

## 11. ATURAN TEMA & TOKEN (konsisten GRAND_DESIGN.md)

- **Font:** Heading `font-serif` (Montaga), Body/label `font-sans` (Montserrat), Aksen cursive `font-cursive` (Ephesis) **hanya** di Hero tagline + salam penutup (§2.4).
- **Warna (token, NO hex hardcode §13):**
  - Terang: `bg-section`, text `text-black` / `text-black/60`.
  - Dark: `bg-tropical-dark` (§19), `bg-[#0C121D]`.
  - Accent: `text-brand` (`--color-primary-pink`), `bg-brand/10`.
- **Container (§4):** `max-w-[98%] xl:max-w-[1600px] mx-auto px-4 md:px-8 w-full`.
- **CTA (§7.2.5):** gunakan `.btn-cta` (tanpa bg, border hitam → hover pink). Bukan `bg-nav-gradient` untuk tab.
- **Radius/Shadow:** `.rounded-xl-design`, `.shadow-soft`, `.focus-ring` (a11y §10).
- **Section:** `snap-start snap-always min-h-screen` (§4 Aturan Emas #7).
- **GSAP:** semua ScrollTrigger dibungkus `gsap.context()` + `ctx.revert()` cleanup (§7.1). Cek `prefers-reduced-motion`.

---

## 12. CHECKLIST KESELARASAN & TEKNIS

- [ ] Dark sections ikuti §19 (white/85, border-white/10, glow not shadow, brightness image).
- [ ] Zero-hex hardcode — semua via token `text-brand` / `bg-section` / `bg-tropical-dark` (§13).
- [ ] Cursive `font-cursive` HANYA di Hero + penutup (§2.4).
- [ ] Video hero lazy-load (hanya saat aktif), `preload="none"` (§7.3.2).
- [ ] `aria-label` pada ikon/pinned bar; alt spesifik foto (§10, §18.3).
- [ ] Max 1 primer + 1 sekunder CTA per section (§25).
- [ ] GSAP `gsap.context()` + `ctx.revert()` + `prefers-reduced-motion` (§7.1).
- [ ] Pinned CTA bar muncul >50% scroll, dismissible, a11y region.
- [ ] §6 Wisata Alam = etalase fungsional (grid + filter kategori), bukan sekadar narasi kuliner.
- [ ] §7 Satwa Endemik Kei = galeri fauna (riset agent), narasi *Ain Ni Ain* (satwa sebagai saudara alam, bukan objek pamer).
- [ ] Data spot alam & satwa di `src/content/` (sentralisasi §4.10), tidak di-hardcode di komponen.
- [ ] Filter kategori maks 6 pilihan (Hick's Law §25), aksesibel (aria-label, keyboard).
- [ ] CTA spesifik ("Jelajahi Semua Destinasi" → `/destinasi`, "Lihat di Peta").
- [ ] Struktur heading H1–H3 terpilah + pertimbangkan schema `TouristAttraction`/`FAQPage` untuk indeks search/AI.
- [ ] Copywriting 100% dari `Explore.pdf`, nada Ain Ni Ain (§8.6).
- [ ] `next/image` + `images.remotePatterns` untuk foto eksternal (§2.4/§20).

---

## 13. SUMBER & REFERENSI

- **Copywriting:** `docs/Copywriting/Explore.pdf` — *Festival Pesona Meti Kei, Story Brand (Bagian I–VII)*.
- **Tema/Token:** `docs/GRAND_DESIGN.md` (v2.3) — §0 Ain Ni Ain, §2 Tipografi, §3 Warna, §4 Layout, §7.2.5 CTA, §8.5 Ritme, §8.6 Microcopy, §9 JedaJiwa, §13 Token, §18.3 Alt, §19 Dark, §25 Hick, §26/§27 Emotional/Peak-End.
- **Dokumen sejajar:** `docs/page-designs/landing-page.md`, `docs/page-designs/keterhubungan.md` (konsistensi ritme & token).
- **Riset layout web (2025–2026):** pola *Gallery-Walk Scroll* (Rang/Holi, Ofrenda/Day of the Dead), *Scroll-Driven Darkening Narrative* (Ofrenda, Songkran), *Escalating CTA* & *Fixed Bottom Bar* (Rang, Ofrenda, Songkran), *Three-Day Timeline Scrolly* (Songkran), *Asymmetric Editorial* (Dieronesie), **Categorized Attraction Showcase & Interactive Map** (Visit Lake Tahoe, Visit Humboldt, McBride Tourism — destination showcase), **Specific-Value CTA & TouristAttraction/FAQPage Schema** (Destination BC, Patagonia/calafate.tours). Semua diadaptasi ke nuansa tropis Kei tanpa urgency manipulatif.
