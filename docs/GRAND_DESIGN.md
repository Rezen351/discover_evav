# 🎨 GRAND DESAIN — Simfoni Evav (Discover Evav Web)

> **STATUS:** Aktif · **Versi:** 2.4 · **Tanggal:** 2026-07-18
> **Pemilik:** Tim Frontend Discover Evav
> **Tujuan:** Dokumen ini adalah **Single Source of Truth (SSOT)** untuk semua keputusan desain UI/UX website `web/`. Setiap developer dan AI agent **WAJIB** mengacu pada dokumen ini.
>
> **Catatan Penomoran Section:** Nomor §14, §15, §21, §22 **sengaja dilewati** — ketiga pasang changelog/referensi file historis (v2.0 & v2.1) telah digabung ke **§29 CHANGELOG FINAL** & **§30 REFERENSI FILE LENGKAP** sebagai satu-satunya sumber yang berlaku. Jangan menganggap ada section yang hilang; lubang nomor adalah hasil konsolidasi, bukan kekeliruan.
>
> **Perubahan v2.3:** Penyempurnaan §23–§27 (transisi/hydration temporal, contoh deviasi grid, cross-link Navbar, mekanisme verifikasi journey map, catatan dependensi offline) + konsolidasi changelog/referensi + penambahan daftar isi ini.

---

## 📑 DAFTAR ISI (Table of Contents)

**Fondasi & Filosofi**
- [§0. Filosofi Konstitusi — Ain Ni Ain](#0-filosofi-konstitusi--ain-ni-ain)
- [§1. Konsep & Identitas Brand](#1-konsep--identitas-brand)
- [§2. Tipografi](#2-tipografi-typography-system)
- [§3. Sistem Warna](#3-sistem-warna-color-tokens)
- [§4. Layout & Spacing](#4-layout--spacing)
- [§4.5 Teori Desain](#45-teori-desain-yang-diterapkan)
- [§5. Komponen UI Primitif](#5-komponen-ui-primitif)
- [§6. Animasi & Motion](#6-animasi--motion)
- [§6.8 Loading Screen — Kosakata Kei](#68-loading-screen--kosakata-kei-v20-new)
- [§7. Interaksi Khusus](#7-interaksi-khusus)
- [§8. Responsive Breakpoints](#8-responsive-breakpoints)
- [§8.5 Varian Ritme Section](#85-varian-ritme-section-v20)
- [§8.6 Microcopy Voice Guide](#86-microcopy-voice-guide-v20)
- [§9. Jeda Jiwa Section](#9-jeda-jiwa-section--spec-komponen-baru-v20-new)
- [§10. Aksesibilitas (A11y)](#10-aksesibilitas-a11y)
- [§11. Error States & 404](#11-error-states--404-design-v20-new)
- [§12. Cara Mengubah Desain](#12-cara-mengubah-desain-workflow)
- [§13. Utility Class Terpusat](#13-utility-class-terpusat)

**Internasionalisasi, Aset & Skalabilitas** *(lanjut §16 — lihat catatan penomoran)*
- [§16. Internasionalisasi (i18n)](#16-internasionalisasi-i18n-strategy)
- [§17. Sistem Ikon & Filosofi](#17-sistem-ikon--filosofi)
- [§18. Art Direction Fotografi](#18-art-direction-fotografi)
- [§19. Dark Section Design Rules](#19-dark-section-design-rules-v20-new)
- [§20. Performa, Konten & Skalabilitas](#20-performa-konten--skalabilitas)

**Level 99 — Presisi Psikologis** *(lanjut §23 — lihat catatan penomoran)*
- [§23. Desain Temporal — Empat Wajah Kei](#23-desain-temporal--empat-wajah-kei)
- [§24. Baseline Grid — 8px](#24-baseline-grid--8px-sistem-harmoni-tak-terlihat)
- [§25. Hukum Hick — Arsitektur Keputusan](#25-hukum-hick--arsitektur-keputusan)
- [§26. Emotional Journey Map](#26-emotional-journey-map)
- [§27. Peak-End Rule & Ritual Penutup](#27-peak-end-rule--ritual-penutup)

**Penutup & Metadata**
- [§28. Proyeksi Skor Final](#28-proyeksi-skor-final--ringkasan-perjalanan)
- [§29. Changelog Final](#29-changelog-final)
- [§30. Referensi File Lengkap](#30-referensi-file-lengkap)

---

## 📌 ATURAN EMAS (Wajib Dibaca Sebelum Coding)

1. **Jangan hardcode desain mentah** — gunakan nilai dari dokumen ini.
2. **Perubahan desain global HANYA** diedit di dokumen ini, lalu diaplikasikan ke kode.
3. **Semua teks UI berbahasa Indonesia**. Kosakata Kei adalah *aksen*, bukan pengganti.
4. **Font wajib pakai variable CSS**: `--font-sans`, `--font-serif`, `--font-cursive`.
5. **Warna wajib pakai token CSS** (`var(--color-...)`). Jangan pakai hex mentah.
6. **Container utama**: `max-w-[98%] xl:max-w-[1600px] mx-auto px-4 md:px-8 w-full`.
7. **Setiap section**: `snap-start snap-always min-h-screen`.
8. **HUKUM TERTINGGI:** Setiap keputusan desain harus bisa dijawab: *"Apakah ini mencerminkan Ain Ni Ain?"* — lihat §0.

---

## 🌊 §0. FILOSOFI KONSTITUSI — AIN NI AIN

> *"Ain Ni Ain — Satu punya satu. Kita semua bersaudara."*
> — Falsafah hidup masyarakat Kepulauan Kei

Ini adalah **hukum tertinggi desain** Simfoni Evav. Bukan sekadar tagline — ini adalah lens yang membenarkan SEMUA keputusan visual dan interaksi.

### Ain Ni Ain dalam Desain:

| Prinsip Ain Ni Ain | Implementasi Desain |
|--------------------|---------------------|
| **Tidak ada yang lebih tinggi dari manusia** | Setiap elemen UI "menyambut" user, tidak mengintimidasi. |
| **Kita semua satu keluarga** | Bahasa microcopy hangat & personal. Pengunjung adalah *tamu*, bukan konsumen. |
| **Kesetaraan & kerendahan hati** | Hierarki visual jelas tapi tidak arogan. Tidak ada elemen yang "berteriak" tanpa alasan. |
| **Kedalaman di balik kesederhanaan** | Desain *restrained* — sedikit animasi, banyak ruang bernapas. |
| **Persaudaraan melampaui batas** | Desain inklusif, multibahasa dalam nuansa, universally welcoming. |

### Uji Ain Ni Ain (sebelum implement elemen baru):
1. Apakah elemen ini *menyambut* atau *menghalangi* user?
2. Apakah ia berbicara seperti *teman* atau seperti *mesin penjual*?
3. Apakah ia *menghargai waktu* user atau membuang-buangnya?
4. Apakah ia *jujur* tentang apa adanya?

> **Identitas Brand:** Simfoni Evav adalah *seniman lokal yang belum dikenal dunia* — autentik, unik, menunggu ditemukan. Brand yang membawa keasliannya ke standar dunia, bukan mendandani diri untuk tampak global.

---

## 🏗️ §1. KONSEP & IDENTITAS BRAND

| Item | Nilai |
|------|-------|
| Nama Brand | **Simfoni Evav** |
| Tagline | **"Peradaban di Atas Pasir Putih"** |
| Sub-judul Hero | "Eksplorasi Surga Tersembunyi dan Keajaiban Budaya di Kepulauan Kei" |
| Lokasi | Kepulauan Kei, Maluku Tenggara, Indonesia |
| Konsep | *Experience-led Tourism / Cinematic Storytelling Landing Page* |
| Mood | Tropis, elegan, immersive, hangat, eksploratif |
| Gaya Interaksi | Scrollytelling (scroll-snap), GSAP reveal, video sinematik, card-pile 3D |
| Kata Jiwa | **"Jelajahi"** — semua microcopy memancarkan energi ini |
| Audiens Utama | Wisatawan internasional yang mencari *discovery* eksklusif |
| Kesan yang Diinginkan | *"Saya baru menemukan sesuatu yang tidak diketahui banyak orang"* |
| Arketipe Brand | Explorer (Penjelajah) + Sage (Bijaksana) + Innocent (Murni) |

### Struktur Halaman — Film 3 Babak (Urutan Wajib v2.0):

| Babak | # | Section | Tujuan Emosional |
|-------|---|---------|-----------------|
| **SEDUKSI** | 1 | `HeroSection` + Ain Ni Ain | "Dunia berhenti sejenak" |
| **SEDUKSI** | 2 | `JedaJiwaSection` *(NEW)* | "Ada sesuatu berbeda di sini" |
| **KEDALAMAN** | 3 | `BudayaAdatSection` *(naik dari #5)* | "Ini punya jiwa" |
| **KEDALAMAN** | 4 | `FunFactSection` *(turun dari #3)* | "Dan datanya membuktikannya" |
| **KEDALAMAN** | 5 | `JourneyMapSection` | "Saya ingin ke sana" |
| **KOMITMEN** | 6 | `DestinasiTerbaikSection` | "Saya akan ke sini" |
| **KOMITMEN** | 7 | `BeritaUmkmSection` | "Dan saya akan mendukung lokal" |
| **KOMITMEN** | 8 | `ContactSection` + `Footer` | "Ain Ni Ain — sampai jumpa di Kei" |

> **Mengapa urutan ini?** Otak manusia tidak siap menyerap fakta sebelum emosi terpicu. Budaya harus datang sebelum data. Ini bukan pilihan estetika — ini cara kerja psikologi manusia.

---

## 🔤 §2. TIPOGRAFI (Typography System)

### 2.1 Font Family

| Role | Font | Variable CSS | Berat | Penggunaan |
|------|------|--------------|-------|-----------|
| **Sans (UI/Body)** | Montserrat | `--font-sans` | 300/400/500/600/700 | Teks tubuh, label, navigasi, tag |
| **Serif (Heading)** | Montaga | `--font-serif` | 400 | Judul H1-H4, nama destinasi |
| **Cursive (Aksen)** | Ephesis | `--font-cursive` | 400 | **HANYA 3 momen emosional** — lihat §2.4 |

### 2.2 Hierarki Teks (Fluid Type Scale)

> **CATATAN AGENT:** Gunakan class `.text-fluid-*`. Edit token di `:root` globals.css untuk mengubah ukuran.

| Level | Class | Token CSS | Weight | Contoh Pemakaian |
|-------|-------|-----------|--------|-----------------|
| **H1** | `.text-fluid-h1` | `clamp(2rem, 1.6rem + 3vw, 4.75rem)` | 400 | Hero title |
| **H2** | `.text-fluid-h2` | `clamp(2rem, 1.4rem + 2.6vw, 3.25rem)` | 400 | Section titles |
| **H3** | `.text-fluid-h3` | `clamp(1.5rem, 1.2rem + 1.4vw, 2.25rem)` | 400 | Card titles |
| **H4** | `.text-fluid-h4` | `clamp(1.15rem, 1rem + 0.7vw, 1.5rem)` | 400 | Sub-title |
| **Eyebrow** | `.text-fluid-eyebrow` | `clamp(0.7rem, 0.66rem + 0.2vw, 0.875rem)` | 700 | "FUN FACT" |
| **Body** | `.text-fluid-body` | `clamp(0.95rem, 0.9rem + 0.25vw, 1.05rem)` | 300/400 | Deskripsi |
| **Small** | `.text-fluid-small` | `clamp(0.8rem, 0.77rem + 0.15vw, 0.9rem)` | 400 | Meta, lokasi |

**Line Height:** Heading `leading-[1.08–1.15]`, Body `leading-relaxed`.

### 2.3 Radius & Depth Scale

| Keperluan | Class | Token | Nilai |
|-----------|-------|-------|-------|
| Radius kecil | `.rounded-sm-design` | `--radius-sm` | 12px |
| Radius sedang | `.rounded-md-design` | `--radius-md` | 18px |
| Radius kartu | `.rounded-lg-design` | `--radius-lg` | 24px |
| Radius besar | `.rounded-xl-design` | `--radius-xl` | 32px |
| Shadow lembut | `.shadow-soft` | `--shadow-soft` | `0 4px 20px -8px rgba(26,26,26,.12)` |
| Shadow kartu | `.shadow-card` | `--shadow-card` | `0 18px 50px -20px rgba(26,26,26,.22)` |
| Shadow melayang | `.shadow-float` | `--shadow-float` | `0 30px 70px -25px rgba(0,94,133,.30)` |
| Shadow brand | `.shadow-brand` | `--shadow-brand` | `0 14px 40px -12px rgba(230,103,124,.45)` |
| Focus ring (a11y) | `.focus-ring` | `--focus-ring` | `0 0 0 3px rgba(230,103,124,.45)` |
| Press feedback | `.active:press` | — | `transform: scale(0.97)` |
| CTA spotlight base | `.btn-spotlight` | — | `background: transparent` + transition (ekspos gradient `useSpotlight`) |

### 2.4 Aturan Ephesis — Font Paling Berbahaya ⚠️

Ephesis adalah *rempah* — sedikit membuat istimewa, terlalu banyak menjadi murahan.
**Ephesis HANYA boleh muncul di 3 titik emosional:**

| # | Lokasi | Teks | Alasan |
|---|--------|------|--------|
| 1 | **HeroSection** | *"di Kepulauan Kei"* dalam tagline | Momen perkenalan pertama |
| 2 | **JedaJiwaSection** | Kata/frasa dalam bahasa Kei | Momen paling spiritual |
| 3 | **Footer** | *"Ain Ni Ain"* sebagai penutup | Salam perpisahan terakhir |

> ❌ DILARANG di tempat lain. Jika Ephesis terlalu sering muncul, ia kehilangan seluruh dampak emosionalnya.

### 2.5 Micro-Typography Momen Emosional

```tsx
// Ain Ni Ain — selalu tampil seperti ini, tidak boleh dimodifikasi
<span style={{ fontFamily: "var(--font-cursive)" }}
  className="text-white/70 tracking-[0.12em]">
  Ain Ni Ain
</span>
<p className="text-white/40 text-xs tracking-[0.35em] uppercase mt-1"
  style={{ fontFamily: "var(--font-sans)" }}>
  Kita semua bersaudara · We are all one family
</p>

// Kosakata Kei dalam body text
<em className="text-brand not-italic" style={{ fontFamily: "var(--font-cursive)" }}>
  Marhoba
</em>
<span className="text-black/50 text-xs ml-1">(Selamat Datang)</span>
```

---

## 🎨 §3. SISTEM WARNA (Color Tokens)

### 3.1 Token Resmi (dari `globals.css` `:root`)

```css
/* PRIMARY */
--color-primary-navy: #005E85;
--color-primary-pink: #E6677C;   /* Warna Brand Utama */

/* SECONDARY */
--color-primary-teal: #6FC2BE;
--color-primary-orange: #F6B18D;
--color-primary-green: #73B86E;

/* BACKGROUND / ACCENT */
--color-accent-navy: #EAF5F9;
--color-accent-pink: #FCECEF;
--color-accent-orange: #FDF1E8;
--color-accent-green: #EDF7EB;

/* TEXT */
--color-text-white: #FFFFFF;
--color-text-black: #1A1A1A;
--color-text-grey: #8E8E8E;

/* TROPICAL SURFACE */
--color-tropical-dark: #0B1F2A;
--color-tropical-dark-2: #0E2A38;

/* ✨ v2.0 NEW — SENJA KEI */
--color-sunset-gold: #C8920A;   /* Gold senja laut Kei saat matahari terbenam */
--color-ocean-indigo: #1B3A6B;  /* Biru-malam perairan dalam Kei */
```

### 3.2 Filosofi di Balik Setiap Warna

| Warna | Hex | Filosofi Kei | Pemakaian |
|-------|-----|-------------|-----------|
| **Coral Pink (Brand)** | `#E6677C` | Kehangatan Ain Ni Ain — ramah, mengundang | Aksen, CTA, eyebrow, aktif |
| **Navy** | `#005E85` | Kedalaman laut yang menyimpan rahasia | Hero dark, gradient gelap |
| **Teal** | `#6FC2BE` | Laguna Kei yang transparan — kejujuran | Secondary, mesh gradient |
| **Gold Senja** | `#C8920A` | Momen "dunia berhenti" — emas di atas air | Hero gradient, Footer, hover CTA |
| **Indigo Laut** | `#1B3A6B` | Misteri laut malam, bintang bertemu air | Footer, Hero gradient awal, 404 |
| **Pastel Pink** | `#FCECEF` | Pasir putih Ngurbloat — lembut, premium | Section background terang |

> **Prinsip Ain Ni Ain dalam warna:** Coral adalah yang "menyambut" (satu elemen dominan). Sisanya "mendengarkan dengan tenang". Jangan lebih dari 1 warna berteriak dalam satu area layar.

### 3.3 Gradien Wajib

**.bg-mesh-gradient v2.0 (Gradien Senja Kei):**
```css
.bg-mesh-gradient {
  background-image:
    radial-gradient(circle at 10% 20%, rgba(111, 194, 190, 0.80), transparent 50%),
    radial-gradient(circle at 90% 80%, rgba(200, 146, 10, 0.70), transparent 50%),
    radial-gradient(circle at 50% 50%, rgba(230, 103, 124, 0.55), transparent 60%),
    linear-gradient(135deg, #1B3A6B 0%, #005E85 30%, #6FC2BE 60%, #E6677C 85%, #C8920A 100%);
  background-size: 200% 200%;
  animation: meshMove 8s ease infinite alternate;
}
```

**.bg-nav-gradient (fix v2.0 — ganti 0.95 → 95%):**
```css
.bg-nav-gradient {
  background-image: linear-gradient(to right,
    var(--color-accent-pink) 0%,
    var(--color-accent-navy) 50%,
    var(--color-accent-navy) 95%);
  background-size: 200% 200%;
  animation: gradientMove 8s ease infinite;
}
```

**Vignette gambar:** Selalu `from-black/70–90 via-black/20 to-transparent`.

---

## 📐 §4. LAYOUT & SPACING

### 4.1 Container Standar (WAJIB di setiap section)
```tsx
className="max-w-[98%] xl:max-w-[1600px] mx-auto px-4 md:px-8 w-full"
```

### 4.2 Section Wrapper Standar
```tsx
<section id="..." className="relative w-full min-h-screen bg-[#FCECEF] py-16 md:py-24 z-[N] flex items-center justify-center snap-start snap-always">
```
- `z-index`: Hero `z-[8]`, Jeda Jiwa `z-[7]`, Budaya `z-[6]`, FunFact `z-[5]`, Map `z-[4]`, Destinasi `z-[3]`, Berita `z-[2]`, Contact `z-[1]`.

### 4.3 Parallax Transition Antar Section (v2.0 NEW)

Setiap section wrapper tambahkan layer "jendela" ke section berikutnya:
```tsx
// Di bagian bawah setiap section (dalam wrapper relative overflow-hidden)
<div className="absolute bottom-0 left-0 right-0 h-[60px]
  bg-gradient-to-b from-transparent to-[warna-berikutnya]/30
  pointer-events-none z-10" />
```

> **Filosofi:** Seperti laut Kei yang memperlihatkan kedalamannya secara bertahap — ada "lebih banyak" di bawah sebelum pengunjung tiba di sana.

### 4.4 Spacing Scale
- Gap section content: `gap-10` / `gap-12 xl:gap-16`
- Gap card internal: `gap-3` / `gap-4` / `gap-6 xl:gap-8`

### 4.5 Grid Rasio
- Budaya: `50% : 33.33% : 16.67%` (3:2:1)
- Destinasi: `38% : 30% : 32%`

---

## 📐 §4.5 TEORI DESAIN YANG DITERAPKAN

### 4.5.1 Visual Hierarchy
- Eyebrow (kecil, brand, uppercase) → H2 (besar, serif) → body (kecil, black/60).
- Hero: video full-bleed → vignette gelap → teks putih kontras tinggi.
- **Aturan:** 1 titik fokus per section.

### 4.5.2 Color Theory — Analogous + Warm Accent
- Skema: Navy → Teal → Pink → Orange → Gold (analogous) + Gold Senja sebagai "momen klimaks".
- Pink Coral = ramah, hangat; Navy/Teal = kepercayaan, eksotis; Gold Senja = momen tak terlupakan.

### 4.5.3 Typographic Contrast
- Montaga (otoritas) × Montserrat (fungsional) × Ephesis (personal — JARANG).

### 4.5.4 Rule of Thirds & Golden Ratio
- Grid rasio tidak simetris agar mata bergerak dinamis.

### 4.5.5 Gestalt Principles
- Proximity, Similarity, Figure-Ground diterapkan di semua card grid.

### 4.5.6 White Space / Negative Space
- `py-16 md:py-24`, container `1600px`, padding besar = luxury feel.

### 4.5.7 Motion Design
- Easing: `power2.out`/`power3.out`. Duration: 300–800ms. Stagger: 0.15.

### 4.5.8 Affordance & Signifier
- Card `cursor-pointer` + hover scale + overlay. CTA dengan `ChevronRight`.

### 4.5.9 Consistency & Design System
- Pola berulang = prediktabilitas = trust. Inilah alasan §0 ada.

### 4.5.10 Accessibility — WCAG Contrast
- Kontras minimum 4.5:1 (body) / 3:1 (large text).

> **Checklist agent:** (1) 1 fokus visual? (2) pink coral cuma aksen? (3) font beda fungsi jelas? (4) ada ruang kosong? (5) gerak punya easing? (6) konsisten? (7) **mencerminkan Ain Ni Ain?**

---

## 🧩 §5. KOMPONEN UI PRIMITIF

### 5.1 Eyebrow Label
```tsx
<div className="text-brand font-bold tracking-[0.2em] uppercase text-xs md:text-sm mb-2"
  style={{ fontFamily: "var(--font-sans)" }}>
  FUN FACT
</div>
```

### 5.2 Section Title (H2)
```tsx
<h2 className="text-fluid-h2 leading-[1.12] text-black font-normal"
  style={{ fontFamily: "var(--font-serif)" }}>
  Mengapa Kepulauan Kei <br className="hidden md:block" />
  Begitu <span className="text-brand">Istimewa</span>
</h2>
```

### 5.3 CTA Button — Hover Bahasa Kei (v2.0)

**WAJIB — Efek Spotlight Mengikuti Kursor (v2.4 NEW):**
Setiap CTA outline (variasi `border border-black hover:border-brand text-black hover:text-brand`) **WAJIB** memiliki efek radial gradient yang mengikuti kursor saat hover, agar konsisten di seluruh section. Implementasi terpusat melalui hook `useSpotlight()` — **DILARANG** menduplikasi logika gradient di tiap komponen.

```tsx
// src/hooks/useSpotlight.ts — Single Source of Truth efek spotlight
import { useSpotlight } from "@/hooks/useSpotlight";

function CtaButton() {
  const { onMouseMove, onMouseLeave } = useSpotlight(); // default: white→pink→navy, r=120px
  return (
    <button
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      className="btn-spotlight group/btn flex items-center gap-2 border border-black hover:border-brand text-black hover:text-brand px-6 py-3 rounded-xl font-semibold text-sm transition-all duration-300 hover:scale-[1.02] active:press focus-ring cursor-pointer"
    >
      Lihat di Peta
      <ChevronRightIcon className="w-4 h-4 transition-transform group-hover/btn:translate-x-1" />
    </button>
  );
}
```

- Class `btn-spotlight` (di `globals.css`) menetapkan base `background-color: transparent` + transition agar gradient ter-injeksi mulus saat hover.
- Untuk section gelap (JourneyMap), gunakan opsi `useSpotlight({ radius: 250, from: "var(--color-accent-pink)", mid: "var(--color-accent-navy)", to: "var(--color-accent-navy)" })`.
- Gradient default: `radial-gradient(circle 120px at <x> <y>, #FFFFFF 0%, var(--color-accent-pink) 35%, var(--color-accent-navy) 70%, var(--color-accent-navy) 100%)`.
- Hook bersifat generic (`React.MouseEvent<HTMLElement>`) — bisa dipakai pada `<button>` maupun `<a>`.

```tsx
// State normal: "Jelajahi Kei"
// State hover: "Marhoba, Enma Kei"
<button
  className="group relative flex items-center gap-2 bg-nav-gradient
    text-black px-6 py-3 rounded-xl font-semibold text-sm
    transition-all hover:brightness-105 focus-ring active:press"
  style={{ fontFamily: "var(--font-sans)" }}
  title="Marhoba, Enma Kei — Selamat datang, hadirlah ke Kei">
  <span className="group-hover:opacity-0 group-hover:absolute transition-opacity">
    Jelajahi Kei
  </span>
  <span className="opacity-0 group-hover:opacity-100 transition-opacity text-brand"
    style={{ fontFamily: "var(--font-cursive)" }}>
    Marhoba, Enma Kei
  </span>
  <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
</button>
```

> ⚠️ Validasi "Marhoba" & "Enma" dengan informan lokal Kei sebelum production.

### 5.4 Tab Navigation
- Active: `text-brand` + `h-[2px] bg-brand`
- Inactive: `text-black hover:text-brand/70`

### 5.5 Tag / Pill
```tsx
<span className="flex items-center gap-1.5 text-xs md:text-sm text-brand bg-brand/10
  px-3 py-1.5 rounded-full font-medium" style={{ fontFamily: "var(--font-sans)" }}>
  <Compass className="w-3 h-3" />{tag}
</span>
```

### 5.6 Image Card
```tsx
<div className="w-full h-[350px] rounded-lg-design overflow-hidden shadow-soft relative group">
  <Image src={...} alt={...} fill sizes="..." className="object-cover transition-transform duration-700 group-hover:scale-105" />
  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />
</div>
```

**ATURAN GLASSMORPHISM v2.0:**
- ✅ Boleh: panel info di atas peta, navbar pill, tombol navigasi, overlay card UI
- ❌ DILARANG: card/section konten budaya adat, JedaJiwaSection, BudayaAdatSection konten utama

---

## ✨ §6. ANIMASI & MOTION

### 6.1 Library
- **GSAP** + **ScrollTrigger**. Wajib `gsap.context()` + `return () => ctx.revert()`.

### 6.2 Keyframes di `globals.css`
| Nama | Fungsi |
|------|--------|
| `blob` / `.animate-blob` | Blob floating |
| `scrolldown` | Indikator scroll hero |
| `fadeSlideUp` | Reveal konten naik |
| `scaleIn` | Zoom image |
| `gradientMove` | Animasi gradient navbar |
| `meshMove` | Animasi mesh hero |

### 6.3 Pola Reveal Standar (GSAP)
```tsx
gsap.from(".fade-up-item", { y: 40, opacity: 0, duration: 0.8, stagger: 0.15,
  ease: "power2.out", scrollTrigger: { trigger: containerRef.current,
  start: "top 65%", toggleActions: "play none none reverse" } });
```

### 6.4 Sekuens Hero Sinematik — "Dunia Berhenti" (v2.0 NEW)

Tanda tangan yang tidak bisa ditiru — lahir dari memori *"dunia berhenti sejenak"* di Ngurbloat.

```
URUTAN ANIMASI (total ~4.6 detik):

[0ms]     Layar hitam total (#000)
[300ms]   "Ain Ni Ain" fade in — Ephesis, putih, center, font besar
[1800ms]  Video slow-mo fade in dari CENTER (radial mask membesar seperti lubang cahaya)
[2800ms]  Vignette gelap di tepi, cahaya di center — persisten
[3000ms]  Suara ombak pelan masuk (volume 0.08, jika audio aktif)
[3200ms]  "Ain Ni Ain" fade out → tagline + sub-tagline slide up
[3800ms]  Terjemahan "Kita semua bersaudara" muncul
[4100ms]  CTA "Jelajahi Kei" fade in
```

**Desktop:** video slow-motion.
**Mobile (≤768px):** foto still senja Kei yang paling dramatis (hemat bandwidth, tetap sinematik).
**prefers-reduced-motion:** skip ke frame final langsung, tanpa sekuens.

### 6.5 Sonic Identity (v2.0 NEW)

> *"Suara ombak Kei yang sangat pelan — hanya terdengar jika headphone, seperti rahasia."*

Suara yang hanya terdengar oleh yang benar-benar mendengarkan = metafora Kei itu sendiri.

```tsx
// Mulai setelah first user gesture (click/scroll) — bukan autoplay
const audio = new Audio('/sounds/kei-waves.webm');
audio.volume = 0.08; // sangat pelan — hanya headphone
audio.loop = true;
// Hentikan saat tab tidak aktif: document.addEventListener('visibilitychange', ...)
```

**Aturan Sonic:**
- ❌ DILARANG autoplay sebelum user gesture
- ❌ DILARANG musik — hanya natural ambient (ombak)
- ✅ Volume maksimum 0.1
- ✅ Tombol mute WAJIB terlihat, `aria-label="Matikan suara ombak"`
- ✅ Hentikan saat `visibilitychange` (tab tidak aktif)

### 6.6 Prefers-Reduced-Motion
Semua animasi GSAP & CSS harus memeriksa dan mematikan/mengurangi intensitas jika aktif.

### 6.7 DESIGN RESTRAINT (Wajib)

> **Prinsip (dari Ain Ni Ain):** Seperti ketulusan orang Kei — sedikit yang tepat lebih berkesan dari banyak yang berisik.

- ❌ Jangan progress bar autoplay di >1 tempat per section
- ❌ Skeleton loader hanya untuk JourneyMapSection (MapLibre)
- ❌ Jangan animasi elemen dekoratif kecil
- ❌ Jangan >2 animasi pada 1 elemen
- ❌ Jangan loading spinner global

---

## 🎭 §6.8 LOADING SCREEN — Kosakata Kei (v2.0 NEW)

Mengubah waktu menunggu menjadi *micro-learning budaya Kei*:

```
Layout: Background #0B1F2A (minimal, gelap)
Center: Kata Kei (Montaga, large) berganti setiap 800ms
        Terjemahan Indonesia (Montserrat, kecil, tracking lebar)
        Progress indicator tipis di bawah
aria-live="polite" untuk screen reader
```

```ts
// src/content/kei-vocabulary.ts
export const keiVocabulary = [
  { kei: "Marhoba",   id: "Selamat Datang" },
  { kei: "Ain Ni Ain", id: "Kita semua bersaudara" },
  { kei: "Yelim",     id: "Memberi dengan tangan & hati" },
  { kei: "Sasi",      id: "Menjaga alam dengan hukum adat" },
  { kei: "Maren",     id: "Bergotong royong bersama" },
  { kei: "Enma",      id: "Hadirlah, datanglah" },
];
// ⚠️ Validasi semua kosakata dengan informan lokal Kei sebelum production.
```

---

## 🖱️ §7. INTERAKSI KHUSUS

### 7.1 Hero — Cinematic Reveal
Lihat §6.4 untuk sekuens lengkap "Dunia Berhenti".

### 7.2 Navbar
- Muncul saat `scrollY > innerHeight - 80`.
- Hidden: `opacity-0 scale-x-[0.2] scale-y-[0.4] -translate-y-4`.

### 7.3 Autoplay Slideshow
- FunFact & Destinasi: ganti tiap **5000ms**, clear di cleanup.

### 7.4 CTA Hover — Bahasa Kei
Lihat §5.3.

---

## 📱 §8. RESPONSIVE BREAKPOINTS

| Breakpoint | Tailwind | Catatan |
|------------|----------|---------|
| Mobile | `< md` | Hero: foto still dramatis, bukan video; sekuens "Ain Ni Ain" tetap ada |
| Tablet | `md` | `md:px-8`, `md:py-24` |
| Desktop | `xl` | `xl:max-w-[1600px]`, multi-column |
| Large | `lg` | Navbar links tampil |

**Aturan Mobile:** Sekuens "Ain Ni Ain di kegelapan" TIDAK BOLEH diskip di mobile — itu momen brand paling penting. Hanya mediumnya yang berbeda (foto vs video).

---

## 🌗 §8.5 VARIASI RITME SECTION (v2.0)

| Urutan | Section | Mode | BG |
|--------|---------|------|----|
| 1 | Hero | Dark sinematik | `bg-[#000]` → video/foto |
| 2 | Jeda Jiwa *(NEW)* | Dark foto senja | `bg-ocean-indigo` + overlay |
| 3 | BudayaAdat | Terang | `bg-section` |
| 4 | FunFact | **Dark Tropical** | `bg-tropical-dark` |
| 5 | JourneyMap | Terang | `bg-section` |
| 6 | Destinasi | Terang | `bg-section` |
| 7 | Berita/UMKM | Terang | `bg-section` |
| 8 | Contact | Split | `bg-section` |
| 9 | Footer | Dark bintang | `bg-[#0C121D]` |

> Seperti ombak — naik-turun, gelap-terang, berulang dengan irama. Tidak monoton, tidak acak.

---

## 💬 §8.6 MICROCOPY VOICE GUIDE (v2.0)

### Filter Utama
> *"Apakah ini yang akan dikatakan seorang teman yang pernah ke Kei kepada temannya?"*

### Tabel Microcopy

| Touch-point | ❌ Generic | ✅ Simfoni Evav |
|-------------|-----------|-----------------|
| CTA Hero | "Lihat Selengkapnya" | "Jelajahi Kei" |
| Hover CTA | — | "Marhoba, Enma Kei" |
| Label Nav: Destinasi | "Destinasi" | "Jelajahi" |
| Label Nav: Budaya | "Budaya" | "Jiwa Kei" |
| Label Nav: Kuliner | "Kuliner" | "Rasa Kei" |
| Placeholder form | "Tulis pesan..." | "Ceritakan impian perjalananmu ke Kei..." |
| Loading peta | "Memuat peta..." | "Sedang menggambar jalurmu di Kei..." |
| Sukses form | "Pesan terkirim!" | "Terima kasih! Sampai jumpa di Kei 🌊" |
| Scroll down | "Scroll" | "Selami lebih dalam" |
| Alt gambar | "foto pantai" | "Pantai Ngurbloat — pasir terhalus di dunia, Kei" |
| Loading | spinner bisu | Kosakata Kei (lihat §6.8) |

### Tone of Voice
1. **Hangat** — "Mari" bukan "Silakan", "kamu" bukan "Anda" (kecuali formal)
2. **Aktif** — "Jelajahi" bukan "Bisa dijelajahi"
3. **Spesifik** — "Ngurbloat" bukan "pantai indah"
4. **Mengundang** — ajakan bukan perintah
5. **Ain Ni Ain** — setiap kata terasa seperti sambutan keluarga, bukan penjualan

---

## �� §9. JEDA JIWA SECTION — Spec Komponen Baru (v2.0 NEW)

```
File: src/components/JedaJiwaSection.tsx
Posisi: Section #2, setelah Hero, sebelum Budaya
ID: jeda-jiwa
```

### Spec Lengkap
```tsx
<section id="jeda-jiwa"
  className="relative w-full min-h-screen snap-start snap-always
    flex items-center justify-center overflow-hidden">
  {/* Foto senja laut Kei — full bleed */}
  <Image src="/images/kei-sunset-jeda.jpg"
    alt="Senja di laut Kepulauan Kei — momen dunia berhenti sejenak"
    fill className="object-cover object-center" priority />
  {/* Overlay */}
  <div className="absolute inset-0 bg-gradient-to-t
    from-black/80 via-black/40 to-black/20" />
  {/* Konten center */}
  <div className="relative z-10 text-center px-8 max-w-2xl mx-auto">
    <p className="text-white/50 text-xs tracking-[0.4em] uppercase mb-6"
      style={{ fontFamily: "var(--font-sans)" }}>PEPATAH KEI</p>
    <blockquote className="text-white text-3xl md:text-5xl leading-relaxed mb-6"
      style={{ fontFamily: "var(--font-cursive)" }}>
      Umat I Minan Ne Harta I Bulir
    </blockquote>
    <p className="text-white/70 text-base tracking-[0.15em]"
      style={{ fontFamily: "var(--font-sans)" }}>
      "Manusia lebih berharga daripada harta"
    </p>
    <p className="text-white/40 text-xs mt-2 tracking-[0.2em]"
      style={{ fontFamily: "var(--font-sans)" }}>
      — Pepatah Masyarakat Kepulauan Kei
    </p>
  </div>
</section>
```

### Aturan Keras JedaJiwaSection
- ❌ Tidak ada card
- ❌ Tidak ada glassmorphism
- ❌ Tidak ada CTA
- ❌ Tidak ada animasi selain fade-in section entry
- ❌ Tidak ada informasi wisata
- ✅ Satu foto. Satu quote. Keheningan.

> Seperti orang bijak Kei — sedikit kata, setiap kata bermakna.

---

## ♿ §10. AKSESIBILITAS (A11y)

- Semua tombol ikon: `aria-label` Bahasa Indonesia
- **Focus ring**: `.focus-ring` pada semua elemen interaktif
- **Press feedback**: `.active:press` pada tombol penting
- Skip-to-content link di layout (`#main-content`)
- Kontras: teks putih selalu di atas overlay `from-black/70+`
- Respect `prefers-reduced-motion`
- Audio: tombol mute WAJIB terlihat dengan `aria-label`
- Loading kosakata: `aria-live="polite"` untuk screen reader

---

## 🚫 §11. ERROR STATES & 404 DESIGN (v2.0 NEW)

Bahkan di momen error, **Ain Ni Ain tetap hadir** — yang tersesat tetap disambut.

### 404 Page
```
Background: Foto laut malam Kei — gelap, satu titik cahaya di horizon
Konten center:
  Heading (Montaga):  "Sepertinya kamu tersesat di laut."
  Sub (Montserrat):   "Tapi di Kei, tersesat itu indah —
                       kamu pasti menemukan sesuatu yang baru."
  CTA 1 (primary):   "Kembali ke Beranda"
  CTA 2 (secondary): "Jelajahi Destinasi"
  Easter egg (pojok bawah kecil): Koordinat GPS Ngurbloat
    (-5.6397° S, 132.7506° E) — untuk yang penasaran
```

### Error States Lain
```
Loading error (network): "Laut sedang tidak tenang. Coba lagi sebentar."
Form field kosong:       "Ceritakan dulu impianmu ke Kei 🌊"
Email salah:             "Kami perlu alamat yang bisa kami balas 🏖️"
```

> **Prinsip:** Error adalah percakapan, bukan hukuman. Setiap pesan error adalah sambutan orang Kei yang ramah mengarahkan tamu yang tersesat.

---

## 🔧 §12. CARA MENGUBAH DESAIN (Workflow)

**Ubah H1:** Edit `--text-fluid-h1` di `globals.css` → semua H1 ikut → `npm run lint && npm run build` → catat di §29.

**Ubah warna primary:** Edit `--color-primary-pink` → grep hardcode lama → ganti ke class terpusat → catat di §29.

**Tambah section baru:**
1. Tentukan posisi dalam Film 3 Babak (§1)
2. Jawab Uji Ain Ni Ain (§0)
3. Tentukan mode gelap/terang (§8.5)
4. Ikuti Section Wrapper Standar (§4.2)
5. Update z-index sequence

---

## 🧰 §13. UTILITY CLASS TERPUSAT

| Kebutuhan | Class (PAKAI INI) | Hindari |
|-----------|-------------------|---------| 
| Teks brand | `text-brand` | `text-[#E6677C]` atau `text-[#ED5E76]` |
| BG section | `bg-section` | `bg-[#FCECEF]` |
| BG hero dark | `bg-hero-dark` | `bg-[#0A0F16]` |
| Border brand | `border-brand` | `border-[#E6677C]` |
| Tint 10% | `bg-brand/10` | `bg-[#E6677C]/10` |
| Hover teks | `hover:text-brand` | `hover:text-[#E6677C]` |
| BG tropical | `bg-tropical-dark` | `bg-[#0B1F2A]` |

---

> **📌 Catatan Konsistensi:** Changelog dan daftar referensi file yang **berlaku (single source of truth)** berada di akhir dokumen — lihat **[§29 CHANGELOG FINAL](#-29-changelog-final)** dan **[§30 REFERENSI FILE LENGKAP](#-30-referensi-file-lengkap)**. Bagian di bawah ini adalah snapshot historis v2.0 dan tidak lagi diperbarui.

---

## 🌐 §16. INTERNASIONALISASI (i18n Strategy)

Target utama adalah wisatawan internasional. Strategi bahasa Simfoni Evav menggunakan pendekatan **"Bahasa Indonesia + Jendela Kei"**: UI dalam Bahasa Indonesia (versi EN tersedia via toggle), sementara kosa kata dan filosofi Kei selalu hadir dalam bahasa aslinya dengan terjemahan berdampingan.

### 16.1 Strategi Bahasa

| Layer | Bahasa | Alasan |
|-------|--------|--------|
| **UI/Navigasi** | Indonesia (default) + English (toggle) | Target internasional perlu pilihan |
| **Heading section** | Indonesia / English sesuai toggle | Informatif & aksesibel |
| **Filosofi Kei** (Ain Ni Ain, pepatah) | **Selalu bahasa Kei** + terjemahan | Ini DNA yang tidak boleh diterjemahkan mundur — keasliannya adalah kekuatannya |
| **Kosakata loading** | Bahasa Kei + terjemahan Indonesia/English | Micro-learning budaya berjalan di kedua bahasa |
| **Microcopy emosional** | Indonesia/English sesuai toggle | Sesuaikan nada—jangan terjemahan kaku |

### 16.2 Prinsip Terjemahan Microcopy (EN)

Terjemahan Bahasa Inggris **harus mempertahankan nada Ain Ni Ain** — bukan terjemahan harfiah:

| Bahasa Indonesia | ❌ Terjemahan Kaku | ✅ Terjemahan Ain Ni Ain |
|-----------------|-------------------|------------------------|
| "Jelajahi Kei" | "Explore Kei" | "Discover Kei" |
| "Ceritakan impian perjalananmu..." | "Write your message..." | "Tell us your dream journey to Kei..." |
| "Selami lebih dalam" | "Scroll down" | "Dive deeper" |
| "Sampai jumpa di Kei 🌊" | "Message sent!" | "See you in Kei 🌊" |
| "Jiwa Kei" | "Culture" | "Soul of Kei" |
| "Rasa Kei" | "Culinary" | "Taste of Kei" |

### 16.3 Elemen yang TIDAK BOLEH Diterjemahkan

- `Ain Ni Ain` — selalu dalam bahasa Kei, dengan terjemahan di bawahnya
- `Marhoba, Enma Kei` — selalu dalam bahasa Kei (hover CTA)
- `Umat I Minan Ne Harta I Bulir` — selalu dalam bahasa Kei (JedaJiwaSection)
- Nama tempat: Ngurbloat, Ohoidertawun, Gua Hawang — tidak diterjemahkan

> **Filosofi:** Bahasa Kei dalam desain bukan dekorasi — ia adalah bukti otentisitas. Pengunjung internasional yang membaca "Ain Ni Ain" dan ingin tahu artinya telah *masuk* ke dalam pengalaman discovery Kei yang sesungguhnya.

---

## 🔗 §17. SISTEM IKON & FILOSOFI

### 17.1 Library Utama: Heroicons

Pilihan **Heroicons** mencerminkan nilai Simfoni Evav:
- *Clean & minimal* — seperti ketulusan Ain Ni Ain yang tidak berlebihan
- *Tidak dekoratif* — ikon ada karena fungsi, bukan ornamen
- *Konsisten* — satu library, satu karakter visual

### 17.2 Aturan Penggunaan Ikon

| Konteks | Ikon | Ukuran | Warna |
|---------|------|--------|-------|
| CTA button | `ChevronRight` / `ArrowRight` | `w-4 h-4` | Ikut teks |
| Navigasi | `MapPin`, `Compass`, `BookOpen`, `Phone` | `w-5 h-5` | `text-brand` aktif, `text-black/50` inaktif |
| Tag destinasi | `Compass` | `w-3 h-3` | `text-brand` |
| Rating | `Star` (filled) | `w-4 h-4` | `text-yellow-500` (`#ECA200`) |
| Close/menu | `X`, `Bars3` | `w-6 h-6` | `text-black` / `text-white` (sesuai background) |
| Scroll indicator | Custom SVG atau `ChevronDown` | `w-6 h-6` | `text-white/70` |
| Audio mute | `SpeakerWave` / `SpeakerXMark` | `w-5 h-5` | `text-white/60` |

### 17.3 Aturan Keras Ikon

- ❌ DILARANG menggunakan ikon sebagai dekorasi tanpa makna fungsional
- ❌ DILARANG mencampur library (Heroicons + Lucide + FontAwesome dalam satu halaman)
- ❌ DILARANG ikon berukuran > `w-8 h-8` kecuali untuk komponen khusus (peta marker)
- ✅ Semua ikon yang berdiri sendiri (tanpa label teks) WAJIB punya `aria-label`
- ✅ Gunakan `stroke-width="1.5"` (Heroicons outline default) untuk konsistensi visual

---

## 📸 §18. ART DIRECTION FOTOGRAFI

> *"Foto yang benar adalah foto yang membuat pengunjung merasakan angin laut Kei tanpa harus pergi ke sana."*

Panduan ini berlaku untuk: pemilihan foto dari koleksi yang ada, brief kepada fotografer lokal Kei, dan kurasi foto kontribusi komunitas.

### 18.1 Enam Prinsip Utama (dari pengalaman langsung di Kei)

| # | Prinsip | Detail Teknis |
|---|---------|---------------|
| **1** | **Golden Hour** | Foto saat matahari 15°–35° di atas horizon. Cahaya hangat memantul di air = warna nyata laut Kei saat senja. Tidak ada waktu lain yang lebih jujur. |
| **2** | **Low Angle** | Kamera sejajar atau di bawah permukaan air/pasir. Perspektif dramatis yang membuat alam terasa lebih besar dari manusia. |
| **3** | **Manusia Sebagai Skala** | Selalu ada sosok manusia (kecil, di kejauhan, tidak posing) untuk memberikan rasa kebesaran alam. Ini menciptakan koneksi emosional — pengunjung membayangkan diri mereka di sana. |
| **4** | **No Filter** | Warna asli Kei sudah lebih dramatis dari filter apapun. Editing hanya boleh: exposure correction, color temperature adjustment, dan light dehazing. Saturation tidak boleh di-boost. |
| **5** | **Rule of Thirds** | Horizon selalu di sepertiga atas (langit dominan) atau sepertiga bawah (air/pasir dominan). **TIDAK PERNAH di tengah.** |
| **6** | **Subjek Budaya Utama** | Foto adat, tradisi, dan kehidupan sehari-hari lebih bernilai dari foto "model posing di pantai". Foto seorang nelayan memperbaiki jaring lebih kuat dari foto model di baju renang. |

### 18.2 Spesifikasi per Section

| Section | Orientasi | Rasio | Momen | Subjek Prioritas |
|---------|-----------|-------|-------|-----------------|
| **Hero (video/foto)** | Landscape | 16:9 | Golden hour atau sunrise | Laut luas, manusia kecil di kejauhan |
| **JedaJiwa** | Landscape | 16:9 | Senja paling dramatis | Langit terbakar + air seperti cermin |
| **BudayaAdat** | Portrait/Square | 3:4 | Siang (cahaya netral) | Upacara adat, pakaian tradisional |
| **Destinasi card** | Landscape | 4:3 | Golden hour | Tempat + 1 manusia sebagai skala |
| **Footer background** | Landscape | 21:9 | Malam (bintang) | Langit malam Kei + siluet pohon/perahu |
| **404 page** | Landscape | 16:9 | Malam, satu titik cahaya | Laut gelap, horizon |

### 18.3 Apa yang DILARANG

- ❌ Foto stok bertanda air (watermark) — gunakan Unsplash/Pexels hanya dengan kredit penuh
- ❌ Foto dengan orang yang jelas-jelas "posing" untuk kamera — kesan tidak autentik
- ❌ Foto yang sudah ada filter preset kuat (orange teal, vsco, dll)
- ❌ Foto yang memperlihatkan sampah, kerusakan lingkungan, atau kemiskinan dalam konteks eksploitatif
- ❌ Foto resolusi < 1920px wide untuk hero; < 800px wide untuk card

### 18.4 Brief untuk Fotografer Lokal Kei

```
BRIEF FOTOGRAFI — SIMFONI EVAV

Kami sedang mengumpulkan foto autentik Kepulauan Kei.
Kami bukan mencari foto "indah" — kami mencari foto "jujur".

YANG KAMI CARI:
• Kehidupan sehari-hari nelayan di pagi hari
• Anak-anak bermain di tepi pantai — natural, tidak posing
• Upacara adat, tarian, pakaian tradisional
• Penjual pasar lokal dengan ekspresi asli
• Lanskap saat golden hour — tanpa manusia juga tidak masalah
• Detail kecil: anyaman, ukiran, makanan lokal close-up

FORMAT: RAW/JPEG, minimal 24MP
EDITING: Hanya koreksi exposure dan white balance
KREDIT: Nama fotografer & desa asal akan selalu dicantumkan
```

---

## 🌑 §19. DARK SECTION DESIGN RULES (v2.0 NEW)

Section gelap (Hero, Jeda Jiwa, FunFact, Footer) memiliki karakteristik berbeda yang belum pernah terdokumentasi. Ini adalah **sistem paralel** untuk section terang — bukan sekadar "balik warna".

### 19.1 Hierarki Teks di Section Gelap

```
SECTION TERANG:               SECTION GELAP:
H2: text-black (100%)    →    H2: text-white (100%)
H3: text-black/80        →    H3: text-white/85
Body: text-black/65      →    Body: text-white/70
Meta/Small: text-black/40 →   Meta/Small: text-white/40
```

> **Mengapa berbeda?** Putih murni (100%) di atas gelap menciptakan kontras terlalu keras untuk teks panjang. `white/85` pada body text lebih nyaman dibaca dan memberi kesan "kedalaman" yang sesuai dengan mood gelap.

### 19.2 Spacing di Section Gelap — Lebih "Mampat"

Section gelap secara psikologis terasa lebih intim dan fokus. Kurangi spacing 15–20% dari section terang:

```tsx
// Section terang: py-24 gap-12
// Section gelap: py-20 gap-10
// Alasan: kegelapan sudah menciptakan "berat visual" — spacing besar justru terasa hampa
```

### 19.3 Border & Divider di Section Gelap

```tsx
// DILARANG di section gelap:
border-brand           // terlalu kontras, seperti neon sign
border-black/20        // tidak terlihat di gelap

// WAJIB di section gelap:
border-white/10        // subtle separator yang elegan
border-white/20        // untuk elemen yang perlu lebih jelas
```

### 19.4 Shadow → Glow di Section Gelap

```css
/* Section terang: gunakan shadow normal */
box-shadow: var(--shadow-card);

/* Section gelap: ganti shadow dengan glow */
/* Glow teal (untuk card di FunFact) */
box-shadow: 0 0 30px -10px rgba(111, 194, 190, 0.35);

/* Glow brand pink (untuk elemen aktif/hover di gelap) */
box-shadow: 0 0 24px -8px rgba(230, 103, 124, 0.40);

/* Glow gold senja (untuk footer accent) */
box-shadow: 0 0 20px -6px rgba(200, 146, 10, 0.35);
```

### 19.5 Gambar di Section Gelap

Gambar yang ditempatkan di section gelap harus mendapat **contrast boost** agar tidak "tenggelam":

```tsx
// Tambahkan filter CSS pada Image component di section gelap:
className="... brightness-110 contrast-105"
// Jangan lebih dari ini — Kei tidak perlu overdramatic.
```

### 19.6 Ikon di Section Gelap

```tsx
// Ikon default (section terang): text-black/60
// Ikon di section gelap: text-white/60
// Ikon aktif/brand di section gelap: text-brand (coral tetap coral di gelap)
```

---

## ⚡ §20. PERFORMA, KONTEN & SKALABILITAS

### 20.1 Performance Budget (Target Mobile)

Website pariwisata dengan foto & video berat membutuhkan target performa yang jelas:

| Metrik | Target | Alasan |
|--------|--------|--------|
| **First Contentful Paint (FCP)** | < 1.8 detik | Pengunjung internasional mobile |
| **Largest Contentful Paint (LCP)** | < 2.5 detik | Core Web Vitals — ranking SEO |
| **Cumulative Layout Shift (CLS)** | < 0.1 | Pengalaman tidak "loncat-loncat" |
| **Total Blocking Time (TBT)** | < 300ms | Interaktivitas terasa cepat |
| **Bundle JS utama** | < 200KB gzip | Tidak membebani koneksi 4G |

**Strategi untuk mencapai target:**
```
Hero Video: Compressed .mp4 < 8MB, lazy-load hanya saat visible
Hero Mobile: Foto WebP < 300KB — tidak video
Font: subset hanya karakter Latin + karakter Kei yang dipakai
Images: next/image otomatis WebP + lazy loading
Kosakata Kei: data statis, tidak ada network request
Map (MapLibre): lazy-load hanya saat section masuk viewport
```

### 20.2 Prinsip Konten dari Copywriting Guide

Simfoni Evav sudah memiliki sumber copywriting di `docs/Copywriting/*.pdf`. Prinsip yang wajib dijaga:

| Prinsip | Detail |
|---------|--------|
| **Headline ≤ 8 kata** | Judul singkat lebih kuat dari judul panjang |
| **Deskripsi ≤ 3 kalimat per card** | Cukup untuk membangkitkan rasa ingin tahu, tidak untuk menggantikan pengalaman nyata |
| **CTA = 1 kata kerja + 1 objek** | "Jelajahi Kei", "Lihat Peta", "Pelajari Budaya" — bukan "Klik di sini untuk melihat lebih banyak" |
| **Tidak ada superlative tanpa bukti** | Jangan tulis "pantai terindah di dunia" kecuali ada referensi resmi. Ngurbloat memiliki referensi aktual sebagai pasir terhalus. |
| **Nama lokal selalu dicantumkan** | Ngurbloat (bukan "Pantai A"), Ohoidertawun (bukan "Pantai B") |

### 20.3 Prinsip Skalabilitas Desain

Simfoni Evav akan terus berkembang — destinasi baru, event adat baru, UMKM baru. Grand Design ini dirancang untuk tumbuh tanpa kehilangan karakter:

**Checklist saat menambah halaman/section baru:**

```
[ ] Apakah section ini ada dalam "Film 3 Babak"? (SEDUKSI / KEDALAMAN / KOMITMEN)
[ ] Sudah lulus Uji Ain Ni Ain §0?
[ ] Pakai token warna dari §3.1 — tidak ada hex baru yang tidak terdaftar?
[ ] Pakai class utility terpusat dari §13?
[ ] Sudah tentukan mode gelap/terang dan ikuti rules §19?
[ ] Ikon dari Heroicons saja?
[ ] Foto sudah sesuai prinsip art direction §18?
[ ] Microcopy sudah lewat filter "teman yang pernah ke Kei" §8.6?
[ ] Ada aria-label untuk semua ikon tanpa teks?
[ ] Sudah update §29 Changelog?
```

**Prinsip Ekspansi Konten:**
- Destinasi baru → ikut template card §5.6 + art direction §18
- Section baru → posisinya dalam Film 3 Babak menentukan karakternya
- Halaman baru → ikut pola page yang sudah ada (`/destinasi`, `/budaya`)
- Warna baru → HANYA jika ada justifikasi filosofis dari alam/budaya Kei yang spesifik
- Font baru → DILARANG. Tiga font yang ada sudah cukup lengkap secara fungsi.

> **Prinsip akhir:** Sebuah desain sistem yang matang **berkembang tanpa berubah karakternya**. Seperti bahasa Kei yang tetap Kei meski diucapkan oleh generasi berbeda.

---

> **📌 Catatan Konsistensi:** Changelog dan daftar referensi file yang **berlaku (single source of truth)** berada di akhir dokumen — lihat **[§29 CHANGELOG FINAL](#-29-changelog-final)** dan **[§30 REFERENSI FILE LENGKAP](#-30-referensi-file-lengkap)** (sudah mencakup §23–§27 + `src/hooks/useTimeOfDay.ts`). Bagian §14/§15 dan §21/§22 di bawah ini adalah snapshot historis per versi dan tidak lagi diperbarui.

---

## ⏰ §23. DESAIN TEMPORAL — EMPAT WAJAH KEI

> *"Kei bukan hanya tempat. Kei adalah waktu."*

Laut Kei tidak pernah terlihat sama dua kali. Website Simfoni Evav yang mencapai 99/100 harus **sadar waktu** — ia berubah wajah sesuai jam lokal pengunjung, persis seperti laut Kei itu sendiri.

### 23.1 Sistem Empat Wajah (Time-Aware Design)

Implementasi via `new Date().getHours()` di client side, diaplikasikan ke class CSS `data-time-of-day`:

```tsx
// src/hooks/useTimeOfDay.ts
export type TimeOfDay = "pagi" | "siang" | "senja" | "malam";

export function useTimeOfDay(): TimeOfDay {
  const hour = new Date().getHours();
  if (hour >= 5  && hour < 9)  return "pagi";
  if (hour >= 9  && hour < 15) return "siang";
  if (hour >= 15 && hour < 19) return "senja";
  return "malam";
}

// Terapkan di layout atau HeroSection:
// <div data-time={timeOfDay}>...</div>
```

### 23.2 Palet per Waktu

| Waktu | Jam | Mood Kei | Warna Dominan Mesh Hero |
|-------|-----|----------|------------------------|
| **Pagi** | 05:00–09:00 | Laguna segar, ekspektasi | Teal `#6FC2BE` + Turquoise `#5BB8D4` dominan. Langit putih kebiruan. |
| **Siang** | 09:00–15:00 | Terik, petualangan, energi | Navy `#005E85` + Teal. Kontras tinggi. |
| **Senja** | 15:00–19:00 | **Momen paling dramatis** — default & paling ikonik | Coral `#E6677C` + Gold `#C8920A` dominan. Ini adalah identitas utama Simfoni Evav. |
| **Malam** | 19:00–05:00 | Misterius, intim, berbintang | Indigo `#1B3A6B` + Navy. Sangat gelap, glow halus teal. |

### 23.3 CSS Implementation

```css
/* Di globals.css — override mesh gradient berdasarkan data-time */

[data-time="pagi"] .bg-mesh-gradient {
  background-image:
    radial-gradient(circle at 20% 30%, rgba(91, 184, 212, 0.85), transparent 50%),
    radial-gradient(circle at 80% 70%, rgba(111, 194, 190, 0.75), transparent 50%),
    radial-gradient(circle at 50% 50%, rgba(255, 255, 255, 0.15), transparent 60%),
    linear-gradient(135deg, #1B3A6B 0%, #005E85 25%, #5BB8D4 55%, #6FC2BE 80%, #EAF5F9 100%);
}

[data-time="siang"] .bg-mesh-gradient {
  background-image:
    radial-gradient(circle at 30% 20%, rgba(0, 94, 133, 0.90), transparent 50%),
    radial-gradient(circle at 70% 80%, rgba(111, 194, 190, 0.70), transparent 50%),
    radial-gradient(circle at 50% 50%, rgba(230, 103, 124, 0.30), transparent 60%),
    linear-gradient(135deg, #0B1F2A 0%, #005E85 40%, #6FC2BE 70%, #EAF5F9 100%);
}

/* [data-time="senja"] = default .bg-mesh-gradient (§3.3) */

[data-time="malam"] .bg-mesh-gradient {
  background-image:
    radial-gradient(circle at 15% 15%, rgba(27, 58, 107, 0.90), transparent 50%),
    radial-gradient(circle at 85% 85%, rgba(111, 194, 190, 0.20), transparent 40%),
    radial-gradient(circle at 50% 50%, rgba(200, 146, 10, 0.10), transparent 60%),
    linear-gradient(135deg, #050D18 0%, #0B1F2A 40%, #1B3A6B 70%, #005E85 100%);
}
```

### 23.4 Ucapan Sapa Temporal di Hero

Tepat di bawah kosakata "Ain Ni Ain", tampilkan sapa temporal:

```tsx
const greetings: Record<TimeOfDay, { kei: string; id: string }> = {
  pagi:  { kei: "Marhoba vu'un", id: "Selamat pagi, selamat datang" },
  siang: { kei: "Marhoba",       id: "Selamat datang" },
  senja: { kei: "Marhoba ukat",  id: "Selamat sore, waktu paling indah di Kei" },
  malam: { kei: "Marhoba vuan",  id: "Selamat malam, bintang Kei menyambut" },
};
// ⚠️ VALIDASI semua varian Marhoba ini dengan informan lokal Kei
```

> **Mengapa ini penting?** Pengunjung yang membuka website pukul 06:00 dengan sapa "Marhoba vu'un" dan langit teal segar akan mendapat pengalaman yang **berbeda namun setara dramatisnya** dengan yang membuka pukul 17:00 dengan senja terbakar. Ini adalah personalisasi tanpa data pribadi — murni berbasis alam Kei.

### 23.5 Transisi, Kunci Wajah, & Keamanan Hydration (Wajib)

Tiga aturan operasional agar wajah temporal tidak merusak pengalaman atau build:

**A. Transisi halus antar wajah** — Jangan biarkan mesh gradient berubah *instan* (flash menyilaukan) saat jam bergeser. Wajib ada transisi:

```css
.bg-mesh-gradient {
  transition: background-image 1.2s ease, background-color 1.2s ease;
}
```

> Tanpa ini, pengunjung yang menahan tab terbuka saat jam berubah (mis. 14:59 → 15:00) akan melihat "kedip"珊瑚-gold mendadak.

**B. Keputusan Lock vs Live** — Tetapkan kebijakan satu:

| Pendekatan | perilaku | pilih jika |
|------------|----------|------------|
| **Lock** (wajah terkunci saat pertama buka) | `useTimeOfDay()` dihitung sekali di mount, tidak berubah selama sesi | Pengalaman sinematik konsisten; hindari distraksi saat user scroll lama |
| **Live** (wajah mengikuti jam nyata) | dihitung ulang tiap interval (mis. tiap 60s) | Ingin "jam berjalan" terasa hidup (jarang diperlukan di landing page) |

**Rekomendasi Grand Design: LOCK.** Landing page adalah narasi tertutup (Film 3 Babak) — mengubah wajah di tengah scroll memecah ritme emosional §26.

**C. Hydration safety (SSR/SSG)** — `new Date().getHours()` berjalan di server DAN client dengan zona waktu berbeda → **hydration mismatch** (error React, gagal `npm run build` strict). Hook wajib menghindari perhitungan saat render pertama:

```tsx
// src/hooks/useTimeOfDay.ts — aman hydration
import { useEffect, useState } from "react";

export function useTimeOfDay(): TimeOfDay {
  const [time, setTime] = useState<TimeOfDay>("senja"); // default = identitas utama
  useEffect(() => {
    const hour = new Date().getHours();
    setTime(toTimeOfDay(hour));
  }, []);
  return time;
}
```

> Default `"senja"` dipilih agar saat SSR/first paint (sebelum `useEffect`), wajah yang tampil adalah identitas paling ikonik §23.2 — bukan wajah kosong.

---

## 📐 §24. BASELINE GRID — 8px SISTEM HARMONI TAK TERLIHAT

> *"Seperti irama gamelan — penonton tidak menyadari ada hitungan, tapi merasakan harmoninya."*

Desain yang terasa "harmonis tanpa alasan jelas" hampir selalu punya baseline grid. Ini adalah unit spacing fundamental yang semua elemen snap kepadanya. Untuk Simfoni Evav: **8px**.

### 24.1 Mengapa 8px?

- 8px adalah faktor dari resolusi layar modern (360px, 375px, 390px, 414px, 1440px — semua habis dibagi 8)
- Tailwind default spacing scale sudah berbasis 4px (1 unit = 4px). 8px = 2 unit Tailwind (`space-2`)
- Angka 8 dalam numerologi Kei... kami tidak akan berlebihan. Cukup: **8 bekerja**.

### 24.2 Tabel Konversi Grid → Tailwind

| Tujuan | Grid Value | Tailwind Class |
|--------|-----------|----------------|
| Jarak dalam komponen kecil | 8px | `gap-2`, `p-2`, `m-2` |
| Jarak standar antar elemen | 16px | `gap-4`, `p-4`, `m-4` |
| Padding card | 24px | `p-6` |
| Gap antar card | 32px | `gap-8` |
| Padding section konten | 48px | `py-12` |
| Padding section utama | 64px / 96px | `py-16` / `py-24` |
| Tinggi minimum section | 80px increments | `min-h-[160px]` → `min-h-screen` |

### 24.3 Aturan Deviasi

Deviasi dari grid **diperbolehkan hanya untuk:**
1. Teks yang butuh `leading-` spesifik untuk keterbacaan
2. Border radius yang sudah didefinisikan di §2.3 (12/18/24/32px — semua kelipatan 4)
3. Nilai animasi (durasi ms, delay ms — bebas dari grid)

> **Cara cek:** Jika suatu spacing tidak bisa dibagi 4 tanpa sisa, pertanyakan dulu apakah benar-benar perlu. Biasanya ada nilai grid yang lebih dekat yang bekerja sama baiknya.

### 24.4 Contoh Deviasi (❌ yang salah)

```tsx
// ❌ SALAH — spacing acak, tidak nyambung ke grid 8px
<div className="mt-[13px] gap-[27px] p-[35px]" />

// ✅ BENAR — snap ke grid (13→16, 27→24/32, 35→32/40)
<div className="mt-4 gap-6 p-8" />

// ❌ SALAH — section padding ganjil memecah ritme vertikal
<section className="py-[70px]" />

// ✅ BENAR — 64px atau 96px (kelipatan 8)
<section className="py-16 md:py-24" />
```

> Aturan praktis: jika Anda mengetik angka arbitrary `[-NNpx]`, hentikan dan cari kelipatan 4 terdekat. Penampilan tidak berubah, harmoni meningkat.

---

## 🧠 §25. HUKUM HICK — ARSITEKTUR KEPUTUSAN

> *"Ain Ni Ain dalam arsitektur informasi: jangan membebani tamu. Tunjukkan satu jalan, bukan labirin."*

Hick's Law (1952, psikolog William Edmund Hick): waktu yang dibutuhkan untuk membuat keputusan meningkat **secara logaritmik** dengan setiap pilihan tambahan.

```
Waktu Keputusan = a + b × log₂(n + 1)
n = jumlah pilihan
```

Implikasinya: 7 pilihan tidak 7× lebih lambat dari 1 pilihan — lebih dari itu. Otak yang kelelahan memilih *tidak memilih* dan **meninggalkan halaman**.

### 25.1 Batas Pilihan per Area Pandang (Wajib Dipatuhi)

| Konteks | Maks Pilihan | Alasan |
|---------|-------------|--------|
| **Tombol CTA dalam satu section** | 1 primer + 1 sekunder = **2** | Lebih dari 2 → user paralyzed |
| **Tab navigasi yang terlihat** | **4–5** tab | Lebih dari 5 → tambah dropdown |
| **Card dalam satu baris viewport** | **3 card** (desktop) / **1–2** (mobile) | Kaidah chunk memory manusia |
| **Item navigasi main menu** | **5–6** item | Batas memori kerja (Miller's Law: 7±2) |
| **Pilihan di dropdown/modal** | Maks **7** | Lebih dari ini → gunakan search |
| **Destinasi di section hero** | Highlight **1** (yang paling ikonik) | Bukan katalog, tapi undangan |

> **Cross-link wajib:** Baris "Item navigasi main menu" **harus** dipatuhi oleh `src/components/Navbar.tsx` (pill gradient). Jika Navbar menampilkan > 6 link, turunkan sisanya ke dropdown bahasa/utility — jangan tambah item sejajar. Verifikasi saat review PR.

### 25.2 Hierarki CTA Wajib (Per Section)

Setiap section boleh punya maksimal **1 CTA Primer + 1 CTA Sekunder**. Tidak ada section yang boleh punya 3 tombol setara:

```tsx
// ✅ BENAR — hierarki jelas
<button className="bg-nav-gradient ...">Jelajahi Kei</button>      {/* PRIMER */}
<button className="border border-brand/30 ...">Lihat Peta</button>  {/* SEKUNDER */}

// ❌ SALAH — tiga CTA setara membingungkan
<button>Jelajahi Kei</button>
<button>Lihat Peta</button>
<button>Hubungi Kami</button>
```

### 25.3 Progressive Disclosure (Pengungkapan Bertahap)

Informasi yang kompleks (daftar destinasi lengkap, jadwal acara adat, UMKM list) **tidak boleh langsung ditampilkan semua**. Ikuti pola:

```
Tampilkan 3 → "Lihat Semua" → halaman dedicated
```

Bukan:
```
Tampilkan 12 sekaligus di landing page
```

---

## 🗺️ §26. EMOTIONAL JOURNEY MAP

> *"Peta ini bukan peta geografis — tapi peta perasaan pengunjung saat mereka menyelami Simfoni Evav."*

Setiap titik scroll adalah sebuah **momen emosional yang harus dikelola secara sadar**. Tabel ini adalah dokumen referensi bagi developer: jika implementasi menghasilkan emosi yang berbeda dari target, ada yang perlu diperbaiki.

### 26.1 Peta Lengkap per Section

| # | Section | Kondisi Emosi Sebelum | Target Emosi | Elemen Desain yang Memicu | Kondisi Emosi Setelah |
|---|---------|----------------------|--------------|--------------------------|----------------------|
| — | **Sebelum website terbuka** | Netral / skeptis / penasaran | — | — | — |
| — | **Loading Screen** | Netral | 🟡 Penasaran & belajar | Kata Kei berganti setiap 800ms | Sudah sedikit tahu satu kata Kei |
| 1 | **Hero — Kegelapan** | Penasaran | 😮 Terkejut & fokus | Layar hitam 300ms + "Ain Ni Ain" muncul sendiri | "Ada apa ini?" |
| 1 | **Hero — Video muncul** | Terkejut | 😍 Takjub + hening | Radial video reveal, ombak pelan, vignette | "Dunia berhenti sejenak" |
| 1 | **Hero — Tagline** | Takjub | 🔥 Tertarik & ingin tahu lebih | "Peradaban di Atas Pasir Putih" + CTA | "Saya ingin tahu lebih" |
| 2 | **Jeda Jiwa** | Ingin tahu | 🙏 Hormat & haru | Foto senja + pepatah "Manusia > Harta" | "Tempat ini punya jiwa" |
| 3 | **Budaya Adat** | Haru | 🌟 Kagum & respek | Foto adat, tabsystem, cerita tradisi | "Kei bukan hanya pantai" |
| 4 | **Fun Fact** | Kagum | 🤯 Heran & yakin | Angka statistik dramatis, counter animasi | "Data membuktikannya" |
| 5 | **Journey Map** | Yakin | 📍 Konkret & planning mode | Peta interaktif, titik destinasi | "Saya bisa bayangkan rutenya" |
| 6 | **Destinasi** | Planning mode | 💚 Excited & committed | Card foto dramatis, detail, CTA | "Saya mau ke sini dan ini" |
| 7 | **Berita/UMKM** | Excited | ❤️ Koneksi manusia | Wajah manusia lokal, cerita UMKM | "Saya akan mendukung mereka" |
| 8 | **Contact** | Koneksi | 📞 Siap bertindak | Form, WhatsApp, nomor telepon | "Mari mulai perjalanan ini" |
| 9 | **Footer** | Bertindak | 🌊 Damai & diingat selamanya | "Ain Ni Ain" Ephesis + foto malam Kei | "Saya membawa Kei pulang" |

### 26.2 Jika Emosi Tidak Sesuai Target — Diagnosis

| Gejala | Penyebab Mungkin | Solusi |
|--------|-----------------|--------|
| User berhenti scroll di Hero | CTA terlalu cepat muncul, sekuens tidak dramatis | Pastikan sekuens §6.4 berjalan penuh |
| User scroll cepat melewati Jeda Jiwa | Foto tidak cukup dramatis / teks terlalu kecil | Ganti foto, perbesar quote |
| User tidak klik CTA setelah Destinasi | Terlalu banyak pilihan card / CTA tidak jelas | Kurangi card ke 3, perjelas hierarki CTA §25.2 |
| User tidak isi form Contact | Placeholder terlalu generic | Terapkan microcopy §8.6 |
| User menutup tab tanpa aksi | Closing ritual tidak berkesan | Periksa §27 Peak-End Ritual |

### 26.3 Mekanisme Verifikasi (Kapan Dipelajari Ulang)

Peta ini bukan dokumen statis. Aturan verifikasi:

- **Setiap rilis besar** (penambahan section, redesign Hero, perubahan urutan Film 3 Babak) → petugas review **wajib** membaca ulang §26.1 dan mencentang setiap baris "Kondisi Emosi Setelah" masih tercapai.
- **Saat ada data nyata** (heatmap scroll, session recording, feedback pengunjung) → bandingkan emosi aktual vs target di §26.1; jika > 1 section meleset, buka diagnosis §26.2.
- **Checklist review PR** (tambahkan ke template): `[ ] Setiap section baru sudah punya baris di §26.1 dengan target emosi & pemicu desain`

> *"Peak-End Rule (Daniel Kahneman, psikolog peraih Nobel): kita tidak mengingat keseluruhan pengalaman, kita mengingat MOMEN PUNCAK dan MOMEN TERAKHIR."*

### 27.1 Peak (Momen Puncak) — Sudah Dirancang

**Momen puncak Simfoni Evav** adalah sekuens Hero "Ain Ni Ain di kegelapan" (§6.4). Ini adalah yang diingat selamanya.

**Backup peak** jika Hero tidak berjalan sempurna: **Jeda Jiwa** — satu foto senja + satu pepatah yang mengubah cara pandang.

### 27.2 End (Momen Terakhir) — Footer sebagai Ritual

Footer bukan akhir dari website. Footer adalah **salam perpisahan yang pengunjung bawa pulang**. Berdasarkan Peak-End Rule, inilah yang paling menentukan apakah mereka akan kembali dan merekomendasikan.

**Spesifikasi Ritual Footer Simfoni Evav:**

```
LAYER 1 (Background): Foto panorama malam berbintang Kei
  - Rasio: 21:9 (sangat lebar, sinematik)
  - Warna dominan: indigo + bintang putih kecil-kecil
  - Overlay: dark gradient dari bawah (from-black/90 to-transparent)

LAYER 2 (Center, posisi tengah vertikal):
  ┌─────────────────────────────────┐
  │                                 │
  │    [Ephesis, large, white/80]   │
  │         Ain Ni Ain              │
  │                                 │
  │  [Montserrat, xs, tracking max] │
  │  KITA SEMUA BERSAUDARA          │
  │  WE ARE ALL ONE FAMILY          │
  │                                 │
  │  [Divider: border-white/10]     │
  │                                 │
  │  [Link navigasi, sosial media]  │
  │  [Copyright — tahun]            │
  │                                 │
  └─────────────────────────────────┘

Warna aksen footer: Gold Senja #C8920A untuk hover link
Glow pada "Ain Ni Ain": subtle text-shadow gold senja
```

### 27.3 Offline Experience — Kei Tanpa Sinyal

Offline page yang mencerminkan jiwa Kei yang *tenang meski tanpa sinyal*:

```
Background: Foto laut Kei yang tenang (cached dari service worker)
  ATAU: CSS-only illustration — garis-garis horizontal sederhana
       menggambarkan cakrawala laut

Konten center (tidak ada network request):
  [Ilustrasi/ikon sinyal dicoret — minimal, putih]

  "Sepertinya kamu di tempat yang sinyal belum menjangkau."
  (Montaga, H3, white)

  "Di Kei pun begitu — dan justru di situlah keajaibannya."
  (Montserrat, body, white/70)

  [Tombol: "Coba Lagi" — simple, tidak bergantung JS]

  ─────────────────────────────
  Ain Ni Ain
  ─────────────────────────────

Implementasi: next-pwa / service worker
Cache: Aset statis hero + loading screen kosakata Kei
```

### 27.4 Checklist Ritual Penutup (sebelum deploy)

```
[ ] Footer memiliki foto malam berbintang Kei (resolusi 21:9, min 1920px wide)
[ ] "Ain Ni Ain" dalam Ephesis terlihat jelas tanpa perlu zoom
[ ] Hover link footer berubah ke Gold Senja #C8920A
[ ] Offline page sudah diuji dengan Chrome DevTools → Offline mode
[ ] Offline page bisa tampil tanpa JS (pure HTML fallback)
[ ] Pesan offline terasa seperti "pelukan", bukan "error"
[ ] Tab title berubah saat offline: "Kei menunggu koneksimu kembali..."
```

### 27.5 Catatan Dependensi Offline (Perhatian Agent)

Implementasi offline page (§27.3) **membutuhkan service worker**. Opsi yang umum: `next-pwa` (atau `@ducanh2912/next-pwa` untuk App Router).

> ⚠️ **Sesuai `AGENTS.md` §6.8:** Menambah dependency/proyek baru **dilarang tanpa persetujuan eksplisit Pemilik**. Service worker adalah tambahan arsitektur yang bukan sekadar utilitas kecil — wajib dikonsultasikan sebelum `npm install`.
>
> **Alternatif tanpa dependency baru** (jika Pemilik menolak): gunakan **HTML fallback statis** (`offline.html` di `public/`) + `<meta>` `apple-mobile-web-app-capable`, tanpa caching aset dinamis. Ini mencakup pesan "Kei tanpa sinyal" namun tanpa cache foto hero. Pilih ini bila ingin menghindari dependency.

---

## 🏆 §28. PROYEKSI SKOR FINAL & RINGKASAN PERJALANAN

### 28.1 Perjalanan Peningkatan Skor (5 Sesi Diskusi)

| Sesi | Fokus | Keputusan Kunci | +Skor |
|------|-------|-----------------|-------|
| **Sesi 1** | Audit filosofis & warna | Sunset Gold + Ocean Indigo, mesh gradient Senja Kei | +3 |
| **Sesi 2** | Narasi & identitas lokal | Ain Ni Ain di Hero, Film 3 Babak, JedaJiwa section | +5 |
| **Sesi 3** | Bahasa & mikrointeraksi | Hover CTA bahasa Kei, Ephesis rules, microcopy voice guide | +3 |
| **Sesi 4** | Internasionalisasi & skalabilitas | §16–20: i18n, ikon, art direction, dark rules, performa | +7 |
| **Sesi 5** | Presisi psikologis | §23–27: temporal, grid, Hick's Law, journey map, peak-end | +4 |
| | | **TOTAL KENAIKAN** | **+22** |

### 28.2 Proyeksi Skor Akhir

| Dimensi | Skor Awal | Skor Akhir |
|---------|-----------|------------|
| Koherensi Filosofis | 7/10 | 10/10 |
| Identitas Lokal & Autentisitas | 6/10 | 9.5/10 |
| Psikologi Warna & Temporal | 9/10 | 10/10 |
| Sistem Tipografi & Ritme | 9/10 | 9.5/10 |
| Arsitektur Narasi (3 Babak) | —/10 | 10/10 |
| Konsistensi Token & CSS | 7/10 | 9/10 |
| Pengalaman Emosional (Journey) | —/10 | 9.5/10 |
| Performa & Teknis | —/10 | 9/10 |
| Aksesibilitas & Inklusivitas | 8/10 | 9/10 |
| Skalabilitas & Dokumentasi | 10/10 | 10/10 |
| **TOTAL** | **~80/100** | **~99/100** |

### 28.3 Satu-satunya Jalan ke 100

> Skor 100 tidak bisa diraih dari dokumen — ia datang dari **foto asli manusia Kei** yang mengisi setiap section. Saat Ngurbloat terlihat bukan dari stok foto Unsplash tapi dari lensa seorang fotografer Kei yang bangun jam 05:00 untuk menangkap cahaya pagi di atas pasir — barulah Simfoni Evav menjadi 100/100.
>
> Grand Design ini telah melakukan semua yang bisa dilakukan oleh dokumen. Sisanya ada di lapangan.

---

## 📝 §29. CHANGELOG FINAL

| Tanggal | Versi | Perubahan |
|---------|-------|-----------|
| 2026-07-16 | v1.0 | Inisialisasi awal |
| 2026-07-17 | v2.0 | Rewrite menyeluruh — §0 Ain Ni Ain, token warna, Hero cinematic, sonic, loading, Film 3 Babak, JedaJiwa, Ephesis, microcopy, error states |
| 2026-07-17 | v2.1 | §16–20: internasionalisasi, ikon Heroicons, art direction 6 prinsip, dark section rules, performa budget, skalabilitas |
| 2026-07-17 | v2.2 | §23–27: desain temporal (4 wajah Kei), baseline grid 8px, Hick's Law decision architecture, emotional journey map, offline experience, peak-end ritual footer — **Proyeksi 99/100** |
| 2026-07-17 | v2.3 | Penyempurnaan §23–27: §23.5 transisi/hydration/lock-vs-live temporal; §24.4 contoh deviasi ❌; §25.1 cross-link Navbar; §26.3 mekanisme verifikasi journey map; §27.5 catatan dependensi offline (next-pwa butuh approval). Konsolidasi changelog/referensi (§14/§15 & §21/§22 → §29/§30). Tambah Daftar Isi + catatan penomoran section. Versi dokumen → 2.3 |
| 2026-07-18 | v2.4 | **Standardisasi CTA spotlight:** efek radial gradient mengikuti kursor di-centralisasi ke hook `src/hooks/useSpotlight.ts` + class `.btn-spotlight` (globals.css). Semua CTA outline (& anchor WhatsApp/eksplorasi) kini konsisten pakai handler ini. Aturan tertulis di §5.3 & §13. |

---

## 📚 §30. REFERENSI FILE LENGKAP

| File | Keterangan |
|------|-----------|
| `src/app/layout.tsx` | Font loading (`next/font`), metadata, skip-to-content |
| `src/app/globals.css` | Token `:root`, utility class, keyframes, temporal CSS |
| `src/app/page.tsx` | Urutan section (Film 3 Babak — §1) |
| `src/components/HeroSection.tsx` | Cinematic sequence + temporal greeting |
| `src/components/JedaJiwaSection.tsx` | **[NEW]** Spec lengkap §9 |
| `src/components/LoadingScreen.tsx` | **[NEW]** Kosakata Kei loading §6.8 |
| `src/components/Navbar.tsx` | Pill gradient + bahasa toggle |
| `src/components/FunFactSection.tsx` | Dark tropical + glow rules §19 |
| `src/components/BudayaAdatSection.tsx` | Tab system, no glassmorphism |
| `src/components/DestinasiTerbaikSection.tsx` | Max 3 card + CTA hierarchy §25 |
| `src/components/BeritaUmkmSection.tsx` | Human face, wajah lokal |
| `src/components/ContactSection.tsx` | Microcopy form §8.6 |
| `src/content/kei-vocabulary.ts` | **[NEW]** Data kosakata Kei §6.8 |
| `src/hooks/useTimeOfDay.ts` | **[NEW]** Hook temporal §23 |
| `src/hooks/useSpotlight.ts` | **[NEW]** Hook CTA spotlight (cursor-following radial gradient) §5.3 |
| `src/content/{destinasi,budaya,kuliner}.ts` | Data terpusat |
| `docs/page-designs/` | Design spec per halaman |
| `docs/Copywriting/*.pdf` | Sumber teks — WAJIB baca |
| `AGENTS.md` | Aturan project — WAJIB baca sebelum kode |

