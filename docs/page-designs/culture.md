# 📐 DOKUMEN DESAIN LAYOUT — MENU BUDAYA & SEJARAH KEi

> **Status:** Draft untuk review · **Ref:** `docs/GRAND_DESIGN.md` (v2.4)
> **Route:** `/budaya` · **Tujuan Emosional (§1 Film 3 Babak):** KEDALAMAN — *"Ini punya jiwa"*
> **Filosofi:** Ain Ni Ain — tamu, bukan konsumen. Hangat, rendah hati, tidak berteriak.

---

## 1. STRUKTUR SECTION (Urutan Wajib)

| # | Section | Komponen | Mode (§8.5) | BG (§13) | z-index (§4.2) |
|---|---------|----------|-----------|----------|----------------|
| 0 | Navbar (pill gradient) | `Navbar` | — | `bg-nav-gradient` | — |
| 1 | PageHero (split + quote) | `PageHeroSection variant="split"` | Dark sinematik | `bg-hero-dark` | z-[5] |
| 2 | Budaya Sejarah (narrative) | `BudayaSejarahSection tone="light"` | **Terang** | `bg-section` | z-[6] |
| 3 | Timeline Linimasa | `BudayaTimeline tone="light"` | Terang | `bg-section` | z-[5] |
| 4 | Footer (ritual penutup) | `Footer` | Dark bintang | `bg-[#0C121D]` | — |

> **Catatan ritme (§8.5):** Dark hero → Terang → Terang → Dark footer. Satu napas naik-turun seperti ombak.

> **Peta Narasi (4 Bagian dari Culture.pdf ↔ Layout):** Dokumen ini menyusun ulang brief 4-bagian PDF menjadi alur `/budaya` yang lebih informatif:
> - **Bagian I — Judul / Identitas** → §2 PageHero + §3.1 Hero Budaya.
> - **Bagian II — Filosofi Harmoni Kei (Warisan Takbenda)** → §3.2 Larvul Ngabal + §3.3 Filosofi Grid + §3.5 Warisan Takbenda (bahasa, cerita rakyat, Meti).
> - **Bagian III — Kategori Budaya / Ekspresi Budaya (Tangible)** → §3.4 Galeri Ekspresi Budaya (musik, nyanyian, tari Sawat, busana adat, tenun).
> - **Bagian IV — Penutup / Masa Depan Tradisi** → §3.4 Breather/Quote + penutup Footer.

---

## 2. PAGE HERO (split) — Spesifikasi

Gunakan `PageHeroSection` yang sudah ada (variant `split`). Jangan ubah komponen shared; cukup isi props dari `budaya.ts`.

- **Eyebrow:** `BUDAYA & SEJARAH` (tracking `0.2em`, `text-brand`, `text-fluid-eyebrow`, font-sans)
- **Title:** `Simfoni Kehidupan` (serif, `text-fluid-h1`, `text-white`)
- **TitleAccent:** `di Atas Pasir Putih` (serif, `text-brand`)
- **Subtitle (§8.6 — suara teman):** *"Mari mengenal jiwa Kepulauan Kei, di mana adat, iman, dan kekerabatan berpadu dalam satu napas peradaban yang damai."*
- **Quote (sisi kanan, `glass-dark` diperbolehkan di hero overlay):** `quote.text` + `quote.attribution`
- **Image:** `/hero/image/kei_culture_ritual.png` (art direction §18: subjek budaya utama, golden hour)
- **scrollHint:** `Selami Budaya Kei` (bukan "Scroll")

---

## 3. BUDYA SEJARAH (light) — Spesifikasi Komponen

**ATURAN BESI (§5.6 Glassmorphism):** Komponen ini adalah konten budaya adat → **DILARANG glassmorphism**. Semua panel pakai surface solid: `bg-white`, `bg-brand/10`, `border-brand/10`, `shadow-soft`/`shadow-card`. Hapus `glass-dark`/`isGlass` dari path light.

### 3.1 Hero Budaya (image + title + intro)
- Image card: `w-full h-[320px] md:h-[460px] rounded-xl-design overflow-hidden shadow-card`, `object-cover`, hover `scale-105`, overlay `from-black/90 via-black/30 to-transparent`. Tag eyebrow di pojok: `bg-brand/10 text-brand text-fluid-small px-4 py-1.5 rounded-xl`.
- Title (`h1` serif `text-fluid-h1 text-black`), Subtitle + Intro (`text-fluid-body text-black/70`, `font-sans`, **rata kiri**, bukan justify — §19.1 body light = `text-black/65~70`).
- **Aset:** `/images/budaya/kei_culture_ritual.png` (ritual budaya, golden hour).

### 3.2 Larvul Ngabal (narrative split)
- Eyebrow `LARVUL NGABAL` · Title serif `text-fluid-h2` · **tagline pakai SERIF (bukan cursive)** — cursive dilarang di sini (§2.4).
- Etimologi callout: `bg-brand/10 border border-brand/30 rounded-lg-design p-5`, icon `ScrollText` (lucide, konsisten dengan app).
- 3 Pillars (Nevnev / Hanilit / Hawear Balwirin): grid `md:grid-cols-3`, card `bg-white border border-brand/10 rounded-lg-design p-5 shadow-soft hover:border-brand/30`. H3 serif `text-fluid-h4 text-black`, meaning `text-brand text-fluid-small`, desc `text-black/65`.

**Detail riset (sumber terlampir §7, jangan ubah "fakta dijaga"):**
Hukum adat tertinggi masyarakat Kei, hidup dan diwariskan secara lisan turun-temurun. Nama berasal dari dua hukum yang digabung: **Larvul** = *lar* (darah) + *vul* (merah) → "darah merah membakar" (`Larvul In Turak`), dan **Ngabal** = *nga* (tombak) + *bal* (Bali) → "tombak dari Bali" (`Ngabal In Adung`, penjaga perdamaian & keluhuran martabat). Dua hukum ini awalnya lahir dari dua persekutuan adat: **Ur Siw / Lor Siw** (9 Rat di Elaar, Kei Kecil) menghasilkan hukum Larvul, dan **Lor Lim** (5 Rat di Lerohoilim, Kei Besar) menghasilkan hukum Ngabal. Keduanya dipersatukan menjadi satu hukum adat setelah perjanjian damai antar persekutuan. Tujuh pasal utamanya terbagi ke tiga rumpun nilai:
- **Nevnev (hukum pidana / perikemanusiaan):** pasal 1–4, melindungi nyawa, kehormatan, dan martabat manusia; kekerasan & pembunuhan adalah pelanggaran berat.
- **Hanilit (hukum keluarga / perkawinan):** pasal 5–6, mengatur tata cara perkawinan, penghormatan perempuan, dan ikatan kekerabatan *yanur–mangohoi*.
- **Hawear Balwirin (hukum kepemilikan / keadilan sosial):** pasal 7, mengatur hak milik dan keadilan, dilambangkan dengan *hawear* (tanda berhenti/sasi).

Peran historis: Larvul Ngabal menjadi instrumen peredam konflik antarumat beragama di Kei (konflik 1999 diselesaikan lewat upacara adat 15 Mei 1999 dengan ritual *sasi* penutupan konflik). Hingga kini dipakai sebagai mekanisme penyelesaian sengketa berbasis kekeluargaan (restorative justice), bukan sekadar aturan tertulis.

### 3.3 Filosofi Grid (bento)
- Eyebrow `SATU TELUR, SERIBU AGAMA` · Title `Filosofi yang Merajut Kei`.
- Bento: item #1 (Ain Ni Ain) `col-span-2 row-span-2` sebagai hero tile; sisanya 1x1/2x1. Card: `bg-white rounded-lg-design overflow-hidden shadow-card border border-brand/10 hover:border-brand/30`, image + overlay `from-black/90 via-black/40 to-transparent`, icon badge `bg-brand/20 text-brand w-10 h-10 rounded-full`, H3 serif `text-white`.
- **Icon (§17):** app menggunakan `lucide-react` secara konsisten → pertahankan lucide (`HeartHandshake, Gift, Palette, Landmark`). JANGAN campur Heroicons.

**Detail riset Ain Ni Ain:** Dalam bahasa Kei, *Ain* berarti "satu" dalam arti **jamak** (bukan tunggal — satu tunggal adalah *Sa*), dan *Ni* berarti "punya/memiliki". Maka *Ain Ni Ain* = "satu memiliki satu" — setiap individu/kelompok memandang *liyan* (yang lain) sebagai saudaranya, bahkan saudara kandung. Filosofi ini diperkuat dua citra: **Vuut Ain Mehe Ni Ngifun** (sekantong telur dari satu ikan yang sama) dan **Manut Ain Mehe Ni Tilur** (butir-butir telur dari satu ayam yang sama) — semua orang Kei bersaudara karena satu keturunan. Manifestasi nyata dalam hidup sehari-hari disebut **Maren** (gotong royong lintas keyakinan). Tiga falsafah perekat persaudaraan: *Ain Ni Ain*, *Hira Ni Fo Hira Ni It Did Fo It Did* (persaudaraan), dan *Foing Fo Kut Fauw Fo Banglu* ("bersatu kita teguh, bercerai kita runtuh").

### 3.4 Breather / Quote (jeda napas) + Galeri Ekspresi Budaya
- Card `bg-white border border-brand/10 shadow-soft rounded-xl-design py-16 md:py-24 px-6 md:px-12`, center.
- Quote serif `text-fluid-h3 text-black` (bukan cursive), attribution `text-black/55 italic text-fluid-small`.
- CTA: `bg-nav-gradient text-black px-6 py-3 rounded-xl font-semibold text-fluid-small focus-ring active:press` → `Jelajahi Linimasa Kei` + `ChevronRight`.

**Galeri Ekspresi Budaya (Tangible — Bagian III PDF "Ekspresi Budaya"):**
Tambahkan section grid dinamis (carousel/grid foto + video) yang menampilkan kekayaan seni budaya Kei yang bisa dilihat & dirasakan:

| Item | Aset (`/images/budaya/...`) | Narasi Singkat (≤3 kalimat) |
|------|------------------------------|------------------------------|
| **Tari Sawat** | `kei_tari_sawat_1.png`, `kei_tari_sawat_2.png`, `kei_tari_sawat_3.png` | Tarian pergaulan penyambut tamu yang mengandung pesan perdamaian & kekerabatan. Gerak gemulai penari berpadu dengan musik *Tifa Totobuang* — simbol toleransi lintas agama (Sawat bernapas Islam, Tifa Totobuang dari warga Kristen). |
| **Alat Musik (Dada / Tifa / Savarngil)** | `kei_dada_tifa.png` | *Dada* (gong tembaga berukuran 12–15 inci), *Tiva/Tifa* (gendang kulit sapi dari kayu berlubang), dan *Savarngil* (suling bambu 6 lubang) adalah denyut nadi tradisi yang mengiringi tari, upacara, dan penyambutan tamu. |
| **Busana Adat** | `kei_busana_adat.png` | Pakaian adat pria (*Benian Vuil-vuil*, celana *Sarwo Bloat Ngametan*, *topi vuil-vuil* merah) dan wanita (*Siting Vuil-vuil*, *Sbo*, selendang *tom mas-mas* emas) berwarna merah–kuning emas. Merah = keberanian & penjagaan hukum adat; emas = kehangatan cinta & kehormatan. |
| **Tenun Ikat Elat** | `kei_batik.png` (representatif), `tenun_elat_watermark.svg` | Tenun ikat Kei (khas Ohoi Elat) menyimpan motif yang mencerminkan kehidupan lokal & status adat. Kain ini dipakai dalam upacara adat dan sebagai bagian dari *mas kawin* (belis). |
| **Nyanyian & Sastra Lisan** | `kei_language_symbol.png` | Kidung dan pantun adat menjadi jembatan spiritual antargenerasi — dari *tiva ngelngel* (nyanyian kegembiraan) hingga pantun tua penyerta ritual laut. |

> **Catatan aset:** `kei_batik.png` digunakan sebagai representasi tenun karena aset tenun khusus belum tersedia; ganti ke foto tenun ikat Elat asli bila sudah ada (lihat §7.3). `culture.mp4` (`/hero/video/culture.mp4`) dapat diintegrasikan sebagai video player ringan di galeri (lazy-load, hanya saat aktif — §7.3.2).

### 3.5 Warisan Takbenda (Intangible — perluasan §3.2)
Section tambahan (light) yang menjawab Bagian II PDF secara lengkap, selaras dengan Larvul Ngabal & Ain Ni Ain di atas:

- **Bahasa Daerah (Bahasa Kei / Evav):** Identitas inti sekaligus sarana komunikasi dinamis. Kosakata Kei (Marhoba, Ain Ni Ain, Yelim, Sasi, Maren, Enma) digunakan sebagai aksen di seluruh situs (§6.8, §16).
- **Cerita Rakyat / Legenda:** Warisan narasi lisan pembentuk nilai moral — termasuk tom-tad (sejarah lisan) asal-usul Larvul Ngabal dan kisah leluhur pendatang (*mel*) yang berpadu dengan penduduk asli (*ren*).
- **Tradisi Meti & Sasi Laut:** *Meti* = fenomena surutnya air laut secara ekstrem setiap Oktober–November (hingga ratusan meter, bahkan km), khas Kepulauan Kei. Masyarakat memanen hasil laut lewat tradisi **Wer Warat / Hair Yot** (tarik tali janur kuning menggiring ikan ke darat) — praktik kearifan lokal menjaga keberlanjutan ekosistem laut, diperkuat *sasi* (larangan adat menjaga alam). Dirayakan dalam **Festival Pesona Meti Kei** (Oktober, masuk calendari pariwisata nasional).
- **Aset:** `kei_meti_reef.png` (terumbu saat surut), `kei_language_symbol.png`, `kei_people_portrait.png` (potret bangga).

---

## 4. TIMELINE (light) — Spesifikasi

- `BudayaTimeline tone="light"` → `bg-section text-black`. Hapus `bg-grad-glow-budaya` (itu untuk dark).
- Title `text-fluid-h2 text-black`, intro `text-black/75` rata kiri.
- Node card: `bg-white border border-brand/10 rounded-lg-design shadow-card hover:border-brand/30`. Year `text-brand text-fluid-h4` serif. H3 serif `text-black`. Desc `text-black/65`.
- Connector line `bg-brand/30`, dot `bg-brand shadow-soft`.
- **Saran node (fakta dijaga, §5):** Kedatangan Islam 1252M (Rat Nara, Tahiyat Yemru, Langgiar Fer) · Formulasi Larvul Ngabal (gabungan Lor Siw & Lor Lim) · Upacara adat perdamaian 15 Mei 1999 · Festival Pesona Meti Kei masuk calendari nasional · Tenun Ikat Elat & IG 2024.

---

## 5. COPYWRITING — STANDAR SUARA (§8.6)

| Elemen | Teks (Bahasa Indonesia, hangat/aktif) |
|--------|----------------------------------------|
| Hero subtitle | "Mari mengenal jiwa Kepulauan Kei, di mana adat, iman, dan kekerabatan berpadu dalam satu napas peradaban yang damai." |
| Hero intro | "Di ujung timur Nusantara, Kei menyimpan kekayaan yang tak terukur peta. Hukum tak tertulis diwariskan dari mulut ke mulut, mas kawin bukan sekadar mahar, dan ratusan tahun hidup berdampingan dalam damai lintas agama. Ayo, telusuri jejak mulia yang menjadikan Evav rumah bagi banyak hati." |
| Larvul Ngabal intro | "Lebih dari aturan, Larvul Ngabal adalah napas yang menjaga Kei tetap rukun — darah merah dan tombak Bali bersatu menjadi janji: jagalah nyawa, keluarga, dan tanah dengan martabat." |
| Ekspresi Budaya intro | "Kebudayaan Kei bukan disimpan di museum, melainkan ditarikan, dinyanyikan, dan dikenakan. Inilah denyutnya yang bisa kamu lihat dan rasakan." |
| Breather CTA | "Jelajahi Linimasa Kei" |
| Filosofi intro | "Lebih dari sekadar tradisi, nilai-nilai ini adalah denyut yang membuat Kei tetap rukun. Empat pilar di bawah menjelaskan mengapa ratusan tahun bukan waktu yang cukup untuk memecah-belah kekerabatan Evav." |
| Meti intro | "Setiap Oktober, laut Kei menyingkapkan dasarnya. Warga turun bersama merawat apa yang memberi mereka hidup — harmoni antara manusia dan alam." |

**Fakta yang DIJAGA (jangan diubah):** Larvul Ngabal (lisan), Ain Ni Ain, Belis (Lela/gong/mas A/tenun), Tenun Ikat motif Elat + IG 2024, Islam 1252M (Rat Nara, Tahiyat Yemru, Langgiar Fer).

---

## 6. CHECKLIST (§20.3 sebelum deploy)

- [ ] Tidak ada hex hardcode (pakai `text-brand`, `bg-section`, `border-brand/10`, dll — §13)
- [ ] Tidak ada `glass`/`glass-dark` di konten budaya (§5.6)
- [ ] Tidak ada cursive di luar Hero/Footer (§2.4)
- [ ] Typography: H1/H2/H3 serif, body sans, eyebrow `text-brand` (§2)
- [ ] Container `max-w-[98%] xl:max-w-[1600px] mx-auto px-4 md:px-8` (§4.1)
- [ ] `aria-label` di semua tombol ikon (§10)
- [ ] `prefers-reduced-motion` dihormati (sudah di GSAP context)
- [ ] Aset budaya merujuk file nyata di `public/images/budaya/` & `public/hero/video/` (§7.3 / §18)

---

## 7. SUMBER COPYWRITING & RISet (dari Culture.pdf + eksplorasi web)

> Sumber utama: `Culture.pdf` (brief copywriting menu Budaya, diekstrak ke `/tmp/kilo/copywriting/Culture.txt`) dan riset web terbuka (akademik & budaya) mengenai Kepulauan Kei. Bagian ini menambahkan material sumber & fakta pendukung untuk direkonsiliasi developer, tanpa mengubah spesifikasi layout/token (§1–§6).

### 7.1 Narasi Brand & Struktur (dari Culture.pdf)

Story Brand membagi narasi budaya Kepulauan Kei ke dalam empat bagian utama:

- **Bagian I — Judul:** Pintu masuk utama narasi budaya; penekanan hierarkis sebagai pembuka.
- **Bagian II — Filosofi Harmoni Kei: Hidup Berdampingan dalam Falsafah Ain ni Ain:** Fondasi spiritual & sosial yang melandasi seluruh aktivitas masyarakat Kei.
  - *Falsafah Ain ni Ain:* ikatan sakral "kita semua adalah satu" yang melampaui perbedaan suku, ras, dan golongan.
  - *Manifestasi Maren:* praktik gotong royong lintas keyakinan sebagai bukti persaudaraan dan toleransi yang kokoh.
- **Bagian III — Kategori Budaya:**
  - **A. Intangible (Budaya Takbenda):** Hukum Larvul Ngabal (fondasi aturan hidup, keadilan, perlindungan martabat); Bahasa Daerah (identitas inti & sarana komunikasi dinamis); Cerita Rakyat/Legenda (warisan narasi pembentuk nilai moral); Tradisi Meti (kearifan lokal menjaga keberlanjutan ekosistem laut).
  - **B. Tangible (Budaya Benda & Ekspresi Fisik):** Alat Musik (penjaga denyut nadi tradisi); Nyanyian Adat (jembatan spiritual via kidung & sastra lisan); Tarian Adat (seni teatrikal sebagai simbol penghormatan); Pakaian Adat (representasi martabat & filosofi hidup).
- **Bagian IV — Penutup Warisan untuk Masa Depan:** Kesimpulan reflektif bahwa pelestarian nilai budaya adalah kompas kehidupan di masa modern.
  - *Integrasi Tradisi:* budaya Kei bukan artefak masa lalu, melainkan pedoman hidup yang terus dihidupi.
  - *Seruan Keberlanjutan:* tanggung jawab kolektif menjaga keluhuran adat bagi generasi mendatang.

### 7.2 Fakta Pendukung dari Riset (Kei Islands)

- **Larvul Ngabal** — hukum adat tertinggi Kei (Nevnev/Hanilit/Hawear Balwirin); lahir dari penggabungan hukum *Larvul* (Ur Siw/Lor Siw, 9 Rat) & *Ngabal* (Lor Lim, 5 Rat); etimologi "darah merah + tombak Bali"; peran peredam konflik 1999 via upacara 15 Mei 1999 + ritual sasi. (Sumber: Tiwery 2018; Kudubun 2016; Kubangun 2025; Wikipedia "Larvul Ngabal".)
- **Ain Ni Ain** — "satu memiliki satu" (Ain=jamak, Ni=punya); simbol ikan & ayam bersaudara; ruh *fabric of society* Kei; dijadikan dasar kerukunan lintas agama & pendidikan di sekolah Kota Tual. (Sumber: Kudubun 2016; Renhoat & Sari 2023.)
- **Belis / Mas Kawin** — *Lela* (meriam tembaga) sebagai pengganti tubuh perempuan (*ngaban tenan*), *gong*, *mas adat* (Mas A, Mas He, Dirtalik, dsb.), kain, dan *baun*. Sistem patrilineal; relasi *yanur* (pria) menghormati *mangohoi* (wanita); hukum perkawinan = *Hanilit*. (Sumber: Hateyong dkk. 2024; Resubun 2012; Tallaut dkk. 2023.)
- **Tari Sawat & Musik** — tari pergaulan penyambut tamu bernapas perdamaian; diiringi Tifa, Totobuang, Rebana, Suling; kolaborasi Sawat–Tifa Totobuang = simbol toleransi Islam–Kristen. Alat musik khas: *Dada* (gong), *Tiva/Tifa* (gendang), *Savarngil* (suling). (Sumber: Wikipedia "Tarian Sawat"; Laitupa 2022; IndonesiaKaya; bratahungan.blogspot.)
- **Busana Adat** — merah (*vuil-vuil*) = keberanian & penjagaan hukum adat; emas/kuning (*tom mas-mas*) = kehangatan cinta & kehormatan; pria *Benian Vuil-vuil* + *topi vuil-vuil*, wanita *Siting Vuil-vuil* + *Sbo* + selendang emas. (Sumber: Jadesta Kemenparekraf.)
- **Tenun Ikat Elat** — warisan tenun khas Ohoi Elat; motif mencerminkan kehidupan lokal & status adat; bagian dari belis & upacara. (Sumber: Kompasiana "Ohoi Elat".)
- **Meti & Sasi** — surut ekstrem laut (Okt–Nov, hingga ratusan meter–km); tradisi *Wer Warat/Hair Yot* (tarik tali janur menggiring ikan); *sasi* laut menjaga biota; **Festival Pesona Meti Kei** (Oktober, calendari pariwisata nasional). (Sumber: Indonesia Heritage Cities; ANTARA 2023; bratahungan.blogspot; jurnal Lingue 2023.)
- **Bahasa & Legenda** — bahasa Kei/Evav identitas inti; *tom-tad* (sejarah lisan) asal-usul Larvul Ngabal & leluhur *mel*–*ren*. (Sumber: Kudubun 2016; Ohoitimur 1996.)

### 7.3 Referensi Visual & Aset (file nyata di `public/`)

Daftar aset sudah tersedia — rujuk langsung, jangan buat placeholder:

- **Larvul Ngabal:** `images/budaya/landmark_langgur_kei_larvul_spear.jpeg` (tombak emas/darah merah).
- **Simbol bahasa daerah:** `images/budaya/kei_language_symbol.png`.
- **Elemen laut saat surut (Meti):** `images/budaya/kei_meti_reef.png`; video `videos/eksplorasi/meti-timelapse.mp4`.
- **Tari Sawat:** `images/budaya/kei_tari_sawat_1.png`, `_2.png`, `_3.png`.
- **Alat musik Dada / Tifa:** `images/budaya/kei_dada_tifa.png`.
- **Busana adat Kei:** `images/budaya/kei_busana_adat.png` (merah–kuning emas).
- **Tenun Ikat:** `images/budaya/kei_batik.png` (representatif) + `images/budaya/tenun_elat_watermark.svg`.
- **Potret masyarakat Kei:** `images/budaya/kei_people_portrait.png` (ekspresi bangga).
- **Visual senja pesisir Kei:** `images/budaya/kei_coast_sunset.png`.
- **Hero ritual:** `images/budaya/kei_culture_ritual.png` + `hero/video/culture.mp4`.
- **Foto resolusi tinggi + divider grafis:** untuk Bagian I (Judul) — gunakan `kei_culture.png` / `kei_culture_ritual.png`.
- **Ikon (§17):** pertahankan `lucide-react` (HeartHandshake, Gift, Palette, Landmark, ScrollText, Music, Mic2, Languages, Fish). JANGAN campur Heroicons/FontAwesome.

### Catatan Rekonsiliasi (diperbarui)

- **PDF menyarankan akordion/toggle** untuk detail Larvul Ngabal (§7.2 Bagian II) — budaya.md saat ini memakai 3 Pillars card statis (§3.2). Putuskan: tetap card statis (sudah informatif & anti-clutter) ATAU tambah accordion untuk narasi etimologi panjang. Rekomendasi: card statis + etimologi callout (§3.2) sudah cukup; akordion opsional.
- **PDF menyarankan carousel + video player** untuk "Ekspresi Budaya" (§7.2 Bagian III) — sudah tertampung di §3.4 Galeri Ekspresi Budaya. Integrasikan `culture.mp4` & `meti-timelapse.mp4` sebagai video lazy-load (§7.3.2 GRAND_DESIGN).
- **CTA halus di penutup** (§7.2 Bagian IV) berbeda dengan CTA eksplisit "Jelajahi Linimasa Kei" di Breather §3.4 — sesuaikan nada agar konsisten (§8.6 suara teman, tidak berteriak).
- **Judul Bagian II/III/IV di PDF** ("Warisan Takbenda", "Ekspresi Budaya", "Masa Depan Tradisi") selaras dengan §3.2/§3.3/§3.4/§3.5 — gunakan nama tersebut sebagai H2 section agar selaras brief.
- **Filosofi "Ain ni Ain" & "Maren"** di PDF selaras dengan §3.3 Filosofi Grid (SATU TELUR, SERIBU AGAMA) — tidak ada konflik substansial.
- **Fakta dijaga (§5)** — Larvul Ngabal, Ain Ni Ain, Belis, Tenun Ikat, Islam 1252M — tetap sumber otoritatif; PDF brief & riset web bersifat panduan suara/visual & fakta pendukung, bukan pengganti fakta dijaga.
- **Validasi informan lokal:** semua kosakata & fakta sejarah (Marhoba varian, tahun 1252M, nama Rat, dll.) wajib divalidasi dengan informan Kei sebelum production (sesuai catatan GRAND_DESIGN §2.5, §5.3, §6.8).
