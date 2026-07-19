# 📐 DOKUMEN DESAIN LAYOUT — MENU KETERHUBUNGAN (INTERAKSI)

> **Status:** Rombak total (v2.0) berdasar riset desain web · **Ref:** `docs/GRAND_DESIGN.md` (v2.4)
> **Route:** `/keterhubungan` · **Tujuan Emosional (§1):** KOMITMEN → Penutup — *"Ain Ni Ain — sampai jumpa di Kei"*
> **Filosofi Inti:** Tamu adalah saudara. Halaman ini bukan "Contact Us" — ini adalah **undangan untuk masuk ke dalam keluarga Evav**. Form adalah percakapan, media sosial adalah ruang bersama, dan setiap jalur (email, WhatsApp, TikTok, Instagram, YouTube) adalah pintu yang sama terbukanya.

---

## 0. HASIL RISET & LANDASAN FILOSOFI (Mengapa dirombak)

Halaman kontak konvensional (form + alamat + ikon sosial di pojok) terlalu transaksional: ia memperlakukan pengunjung sebagai *pelanggan* yang harus mengisi blanko. Riset desain web 2026 menunjukkan pola yang jauh lebih hangat dan sesuai dengan **Ain Ni Ain**:

| Sumber Riset | Pola yang Diambil | Relevansi Ain Ni Ain |
|--------------|-------------------|---------------------|
| Young Na Kim (`wix.com/blog/beautiful-contact-pages`) | *"Let's start a conversation"* — satu CTA terbuka, email langsung, link sosial. Pintu terbuka, bukan formulir. | Tamu disambut sebagai saudara, bukan diproses sebagai tiket. |
| Extraweg (`wix.com/blog/...`) | Halaman kontak **menggandakan diri sebagai pernyataan misi** — intro filosofi lalu jalur menghubungkan. | "Kita adalah anak cucu Evav yang membukakan pintu" — jabarkan sebelum bertanya. |
| Webflow fryux (`webflow.com/blog/best-contact-page-design`) | Split-screen: kiri bercerita tentang *diri*, kanan bertanya tentang *pengunjung*. | Keseimbangan: kami bercerita, lalu kami mendengar. |
| Figma (`colorlib.com/wp/contact-us-pages`) | Opsi kontak dikelompokkan by intent (Sales, Support, Press, Partnerships) — jalur bertujuan, bukan satu form generik. | Topik sebagai *topik percakapan*, bukan dropdown kaku. |
| Flockler / Juicer (social wall) | **Social Wall (Grid / Masonry / Wall / Slideshow)** — agregasi Instagram + TikTok + YouTube jadi "ruang bersama" visual. | Keluarga Evav hidup di medsos; ajak audiens melihat & bergabung. |
| Mosaic.org (`mosaic.org/socials`) | "Stay Connected" — newsletter + IG + YouTube + TikTok sebagai *komunitas mingguan*. | Kei bukan tempat, Kei adalah *waktu & komunitas* (§23). |

**Kesimpulan riset → aplikasi ke Discover Evav:**
1. **Buka dengan undangan, bukan formulir.** Hero berupa ajakan "Mari Terhubung" (sudah ada) lalu satu kalimat filosofi sebelum ada input apa pun.
2. **Beri banyak jalur, semua setara.** Form, WhatsApp, email langsung, dan media sosial bukan hierarki — semuanya adalah "saudara yang bisa kau hubungi".
3. **Jadikan media sosial "ruang bersama" visual** (Social Wall / Mosaic), bukan sekadar baris ikon kecil. Ini tempat audiens melihat kehidupan Kei hari ini dan diajak ikut serta.
4. **Tutup dengan ritual penutup** (Ain Ni Ain) agar keluar halaman terasa seperti pamit dari keluarga, bukan "pesan terkirim".

> ⚠️ **Design Restraint (§6.5):** Rombakan ini TIDAK menambah animasi berisik. Maksimal 1 reveal GSAP per section, tidak ada progress bar autoplay, skeleton HANYA untuk JourneyMap. Media sosial direpresentasikan sebagai *mosaic statis* (bukan live embed berat) demi performa (§20).

---

## 1. STRUKTUR SECTION (Ritme Gelap/Terang §8.5)

| # | Section | Komponen (rencana) | Mode | BG | z-index |
|---|---------|---------------------|------|----|---------|
| 0 | Navbar | `Navbar` | — | `bg-nav-gradient` | — |
| 1 | PageHero (portrait) | `PageHeroSection variant="portrait"` | Dark | `bg-hero-dark` | z-[5] |
| 2 | Filosofi & Undangan | `KeterhubunganIntroSection` (**BARU**) | **Terang** | `bg-section` | z-[4] |
| 3 | Panggung Percakapan (Form) | `KeterhubunganFormSection` | **Terang** | `bg-section` | z-[3] |
| 4 | Journey Map | `JourneyMapSection` | Terang | `bg-section` | z-[4] |
| 5 | FAQ | `FaqAccordionSection` | **Dark** | `bg-tropical-dark` | z-[2] |
| 6 | Ruang Bersama (Social Wall) | `SocialMosaicSection` (**DIROMBAK jadi Social Wall**) | **Terang** | `bg-section` | z-[2] |
| 7 | Pintu Keluar (Contact Channels) | `ContactUsSection tone="dark"` | **Dark** | `bg-tropical-dark` | z-[1] |
| 8 | Footer | `Footer` | Dark bintang | `bg-[#0C121D]` | — |

> Ritme: Dark → Terang → Terang → Terang → Dark → Terang → Dark → Dark footer. Naik-turun seperti ombak (§8.5). Section #2 (Filosofi) disisipkan agar form (#3) terasa sebagai *respon* atas undangan, bukan permintaan mendadak.

---

## 2. PAGE HERO (portrait) — Spesifikasi

- **Eyebrow:** `KETERHUBUNGAN` · **Title:** `Mari Terhubung` · **TitleAccent:** `dengan Keluarga Evav`
- **Subtitle (§8.6):** *"Punya pertanyaan, ide kolaborasi, atau sekadar ingin menyapa? Tuliskan impian perjalananmu, kirimkan saran, atau ajak kami berkolaborasi — kami akan menyapamu kembali seperti menyambut saudara."*
- **Image:** `/hero/image/kei_warriors_dance.png` · **ImageSecondary:** `/hero/image/kei_culture.png` (lingkaran `rounded-full border-white/40`)
- **scrollHint:** `Mari Terhubung`

---

## 3. FILOSOFI & UNDANGAN (light) — SECTION BARU (§2 riset: pernyataan misi)

Sebelum meminta apa pun, halaman menjabarkan siapa yang diajak bicara. Ini mengubah halaman kontak menjadi *pernyataan kehadiran* (pola Extraweg / fryux split-story).

- `bg-section text-black`. Container standar (§4.1).
- **Layout:** Dua kolom tidak simetris (§4.5.4 Golden Ratio) — kiri teks (60%), kanan kartu "janji sambutan" (40%).
- **Eyebrow:** `KELUARGA EVAv`
- **H2 (serif):** `Kami Bukan` `Brand` `Tempat Wisata`
  - Sub-line: *"Kami adalah anak cucu Evav yang membukakan pintu. Teknologi di halaman ini hanyalah jembatan — bukan etalase."*
- **Paragraf filsafat (§0 Ain Ni Ain):** *"Dalam bahasa Kei, Ain Ni Ain berarti 'satu punya satu, kita semua bersaudara'. Maka menghubungi kami bukan mengisi formulir — ia adalah mengetuk pintu saudara. Pilih jalur yang paling nyaman bagimu: menulis surat, menyapa lewat pesan, atau sekadar mengikuti kisah kami di media sosial."*
- **Kartu Janji (glass-light, bukan dark — §19.5 tidak berlaku di terang):** panel `bg-white/70 border border-brand/20 rounded-lg-design shadow-soft` berisi 3 "janji sambutan" (iklan Heroicons `HandRaised`/`Heart`/`ChatBubbleLeft`):
  1. *"Kami baca setiap sapaan seperti surat dari saudara."*
  2. *"Tidak ada pertanyaan yang terlalu kecil untuk Kei."*
  3. *"Jika kau tersesat, kami yang akan menuntunmu kembali."*
- **Icon:** Heroicons (`HandRaised`, `Heart`, `ChatBubbleLeft`) `w-5 h-5 text-brand`.
- **Aksesibilitas:** semua ikon berdiri sendiri wajib `aria-label` (§10, §17.3).
- **Animasi:** 1x GSAP `fadeSlideUp` stagger pada kartu (§6.3). *Tidak* ada progress bar (§6.5).

---

## 4. PANGGUNG PERCAKAPAN — FORM (light) — Spesifikasi

> Riset fryux/Figma: bagi percakapan berdasar *intent*, bukan satu form kosong. Beri banyak jalur setara.

- Split: kiri **panel jalur alternatif** (sticky), kanan **form panel** `bg-section`.
- **Kiri — "Atau Sapa Lewat Jalur Lain" (panel sticky):**
  - Kartu channel setara (bukan footer kecil):
    - **WhatsApp** — `PhoneIcon` + label `WhatsApp & Telepon` + teks `＋62 8xx-xxx-xxxx` (click-to-call `tel:` di mobile, §7/§10).
    - **Email Langsung** — `EnvelopeIcon` + label `Surel` + teks `keluarga@evav.id` (`mailto:` terbuka draft, pola fryux).
    - **Jam Sambutan** — `ClockIcon` + *"Kami membalas dalam 1–2 hari, seperti surat antar pulau."*
  - Setiap kartu: `bg-white/70 border border-brand/20 rounded-md-design p-4 hover:border-brand transition-colors focus-ring`.
- **Kanan — Form (§8.6 / §11):**
  - Eyebrow `text-brand`, H2 serif `text-fluid-h2 text-black`, subtitle `text-black/60`.
  - **Microcopy form:**
    - Name label: `Nama panggilanmu`
    - Email label: `Email yang bisa kami balas`
    - Message label: `Ceritakan impian perjalananmu ke Kei...` (placeholder)
    - Submit: `Kirim Sapaan` (hangat) — `btn-cta` + `ChevronRight` (§7.5/§13).
    - Success: `Terima kasih! Sampai jumpa di Kei 🌊`
    - Error name: `Tuliskan nama panggilanmu dulu ya 🌊`
    - Error email kosong: `Kami perlu alamat yang bisa kami balas 🏖️`
    - Error email salah: `Alamat email ini sepertinya belum pas. Coba periksa lagi 🏖️`
    - Error message: `Ceritakan dulu impianmu ke Kei 🌊`
  - **Topic tabs (intent-based, pola Figma):** `role="tablist"`, active `bg-nav-gradient text-black`:
    - `Pertanyaan Umum` · `Kerja Sama & Partnership` · `Saran & Masukan` · `Laporan Masalah` · `Lainnya`
  - Input: `bg-white/95 rounded-xl border border-brand/10 focus:border-brand` (token, §13 — HAPUS hardcode gradient border).
  - Submit button: `btn-cta` (§7.5 — tanpa background, border & teks hitam, hover pink) + `focus-ring active:press`.

---

## 5. JOURNEY MAP (light) — Spesifikasi

- `JourneyMapSection` sudah ada (MapLibre). Pertahankan.
- **Perbaiki hardcode (§13):** `text-gray-900` → `text-black`; `text-gray-600/700/800` → `text-black/65~80`; blob `bg-[var(--color-primary-pink)]` → `bg-brand`; pill aktif `border-white` → `border-brand`. Jangan hardcode `rgba(237,94,118,...)` → `var(--color-primary-pink)` / `bg-brand`.
- Skeleton loader wajib (§6.7, §7.3) — pastikan tetap.
- Loading text (§8.6): `Sedang menggambar jalurmu di Kei...`
- Marker: tombol `Expand` `aria-label="Tampilkan semua titik peta"`.

---

## 6. FAQ (dark) — Spesifikasi (§19 Dark Rules)

- `bg-tropical-dark text-white`. H2 serif `text-fluid-h2 text-white`.
- Intro `text-white/60`. Accordion border `border-white/10` (§19.3).
- Question `text-white` (open `text-brand`), answer `text-white/70`.
- Icon `ChevronDown` `text-white/50` → open `text-brand`.
- Contoh item (hangat, §8.6):
  - Q: `Kapan waktu terbaik berkunjung ke Kei?` A: *"Oktober hingga Maret, saat langit cerah dan laut tenang — waktu sempurna snorkeling di Ngurbloat dan merasakan pasir yang tak pernah panas di telapak kaki."*
  - Q: `Apakah aman untuk backpacker solo?` A: *"Sangat. Orang Kei ramah dan gotong-royong (Larvul Ngabal). Tetap bijak menjaga barang dan menghormati adat."*
  - Q: `Bisakah saya berkontribusi ke komunitas?` A: *"Tentu. Lewat form di atas atau gabung komunitas kami — setiap tangan yang peduli membantu Kei tetap lestari."*

---

## 7. RUANG BERSAMA — SOCIAL WALL (light) — DIROMBAK (§2 riset: social wall)

> Bukan lagi baris ikon kecil. Ini "ruang bersama" visual — audiens melihat kehidupan Kei hari ini dan diajak ikut serta (pola Flockler Wall / Juicer Grid-Masonry).

- `bg-section text-black`. H2 serif `text-fluid-h2`, intro `text-black/60`.
- **Eyebrow:** `RUANG BERSAMA`
- **H2:** `Kei yang` `Brand` `Hidup Hari Ini`
- **Intro:** *"Sebagian besar kisah kami berdenyut di media sosial — dari debur ombak pagi hingga senja di atas pasir Ngurbloat. Lihat kehidupan Evav sehari-hari, lalu jadilah bagian darinya."*
- **Social Wall (Masonry statis, pola Flockler/Juicer):**
  - Grid `columns-2 md:columns-3 xl:columns-4 gap-4` (CSS columns = tinggi tile bervariasi, estetika "wall" tanpa JS berat).
  - Setiap tile: `rounded-lg-design overflow-hidden shadow-soft border border-brand/20 break-inside-avoid group relative`.
  - Gambar: `next/image` `object-cover w-full`, hover `scale-105` (§5.6). Overlay `from-black/70` muncul saat hover dengan caption singkat (mis. `"Senja di Ngurbloat — Kei"`).
  - **Sumber data:** `socialMosaicImages` di `src/content/keterhubungan.ts` (7–12 gambar, alt spesifik §18.3).
  - **Performa (§20):** Gambar statis (bukan live embed). Live feed medsos TIDAK di-embed langsung (berat, butuh API key, CLS). Sebagai gantinya, tile adalah kurasi + tombol "Lihat di Instagram/TikTok" mengarah ke profil.
- **Baris Ajakan Medsos (setara, bukan pojok):**
  - Bar horizontal ikon channel: Instagram · TikTok · YouTube · Facebook.
  - Tiap ikon: `bg-white/70 border border-brand/30 text-black/60 hover:text-brand hover:bg-white rounded-full p-3 focus-ring` + `aria-label` (mis. `aria-label="Ikuti Discover Evav di Instagram"`).
  - Di bawah bar: teks *"Tap satu untuk masuk ke ruang kami"* + CTA `Lihat Galeri` (`btn-cta` + `ChevronRight`).
- **Larangan (§6.5 / §20):** TIDAK ada autoplay slideshow medsos, TIDAK ada progress bar, TIDAK ada live-embed berat.

---

## 8. PINTU KELUAR — CONTACT CHANNELS (dark) — Spesifikasi (§19)

- `ContactUsSection tone="dark"` → `bg-tropical-dark`.
- Panel kanan: `glass-dark glow-brand` (glow bukan shadow, §19.4).
- Text: H2 `text-white`, subtitle `text-white/70`, channels `text-white`.
- Image kiri: `glass-dark glow-teal` + `brightness-110 contrast-105` (§19.5).
- Vertical border gradient: `from-[var(--color-accent-navy)] via-[var(--color-primary-teal)] to-[var(--color-primary-navy)]` (sudah token, pertahankan).
- **Quote penutup (ritual Ain Ni Ain):** overlay `glass-dark` berbunyi *"Satu kepulauan, satu keluarga. Mari kita terhubung."* — ini pamit dari keluarga, bukan konfirmasi "pesan terkirim".
- Button: `btn-glass-dark focus-ring`.
- Channel labels: `Email` · `Telepon & WhatsApp` · `Lokasi` · `Media Sosial`.

---

## 9. COPYWRITING INTI (§8.6)

| Elemen | Teks |
|--------|------|
| Hero subtitle | "Punya pertanyaan, ide kolaborasi, atau sekadar ingin menyapa? Tuliskan impian perjalananmu, kirimkan saran, atau ajak kami berkolaborasi — kami akan menyapamu kembali seperti menyambut saudara." |
| Intro filsafat | "Dalam bahasa Kei, Ain Ni Ain berarti 'satu punya satu, kita semua bersaudara'. Maka menghubungi kami bukan mengisi formulir — ia adalah mengetuk pintu saudara." |
| Form placeholder | "Ceritakan impian perjalananmu ke Kei..." |
| Success | "Terima kasih! Sampai jumpa di Kei 🌊" |
| Social wall intro | "Sebagian besar kisah kami berdenyut di media sosial... Lihat kehidupan Evav sehari-hari, lalu jadilah bagian darinya." |
| Map loading | "Sedang menggambar jalurmu di Kei..." |
| Quote penutup | "Satu kepulauan, satu keluarga. Mari kita terhubung." |

---

## 10. CHECKLIST (§20.3)

- [ ] Dark sections ikuti §19 (white/85, border-white/10, glow not shadow, brightness image)
- [ ] Hapus hardcode hex/gray di JourneyMap (§13)
- [ ] Microcopy form & error per §8.6/§11
- [ ] Glass hanya navbar/button/map overlay/form panel/kartu janji (§5.6)
- [ ] Max 1 primer + 1 sekunder CTA per section (§25)
- [ ] `aria-label` ikon, alt spesifik, skeleton map (§10, §18.3, §6.7)
- [ ] Social Wall = mosaic statis (bukan live embed) demi performa §20
- [ ] Section Filosofi #3 baru sudah ada, tidak menambah animasi berisik (§6.5)
- [ ] Tombol CTA pakai `.btn-cta` terpusat (§7.5), bukan hardcode border

---

## 11. SUMBER & CATATAN REKONSILIASI

### 11.1 Riset Web yang Menginspirasi (2026)
- **Young Na Kim** — *"Let's start a conversation"*, pintu terbuka minimalis → Hero/Intro undangan.
- **Extraweg** — kontak menggandakan diri jadi pernyataan misi → `KeterhubunganIntroSection`.
- **fryux (Webflow)** — split-story: kiri bercerita, kanan bertanya → panel jalur alternatif di form.
- **Figma** — opsi kontak by intent → Topic tabs berbasis maksud.
- **Flockler / Juicer** — Social Wall (Grid/Masonry/Wall/Slideshow) → `SocialMosaicSection` dirombak jadi Ruang Bersama.
- **Mosaic.org** — "Stay Connected" komunitas mingguan → baris ajakan medsos setara.

### 11.2 Catatan Implementasi
- Seluruh copywriting disusun dari **GRAND_DESIGN.md** §0 (Ain Ni Ain), §8.6 (Microcopy), §11 (Error), §2.4 (Ephesis), §19 (Dark). Tidak ada PDF sumber khusus.
- **Ephesis (§2.4):** HANYA di Hero tagline global / JedaJiwa / Footer. Di halaman ini: **tidak ada cursive**.
- **Data terpusat:** buat `src/content/keterhubungan.ts` berisi `socialMosaicImages`, `contactChannels`, `philosophyPromises` agar UI tidak hardcode teks (§4.10 sentralisasi).
- **route `/keterhubungan`** dan komponen `KeterhubunganIntroSection`, `KeterhubunganFormSection`, `SocialMosaicSection` belum ada — doc ini adalah spesifikasi untuk implementasi selanjutnya.
- Semua gambar eksternal wajib `next/image` + daftar `images.remotePatterns` di `next.config.ts` (§2.4/§20).
