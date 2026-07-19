# 📐 DOKUMEN ACUAN EKSPLORASI DESAIN — MENU HERITAGE (Warisan & Sejarah Evav)

> **Status:** Acuan eksplorasi (diperluas — sudah diimplementasikan di `/heritage`, sedang dikembangkan sub-page) · **Ref:** `docs/GRAND_DESIGN.md` (v2.4)
> **Route:** `/heritage` (sudah ada) + usulan 2 sub-page: `/heritage/karel` & `/heritage/ratskap` · **Tujuan Emosional (§26 Journey Map):** KEDALAMAN → KOMITMEN — *"Jiwa Kei punya sejarah yang membanggakan, dan warisan itu masih hidup hari ini"*
> **Filosofi (§0 Ain Ni Ain):** Warisan adalah **kompas**, bukan kotak kaca. Sejarah dibicarakan sebagai *tamu yang kita sambut*, bukan artefak yang kita pamerkan. Dignified, hangat, tidak menggurui. Fakta DIJAGA ketat (§7).
> **Sumber Copywriting:** `docs/Copywriting/Heritage.pdf` (Story Brand — Jejak Patriot Karel Sadsuitubun + Jejak Kedaulatan Ratskap Manyeuw Rumadian).

---

## 0. RINGKASAN KONSEP — HASIL RISET WEB (2025–2026)

Dokumen ini disusun **setelah menelusuri pola layout situs kesejarahan/warisan modern** (museum, arsip, dan narrative-history brand). Tujuannya: mengambil *prinsip* yang terbukti, lalu mengadaptasinya ke napas tropis Kei tanpa melanggar `GRAND_DESIGN.md`.

| Pola Riset (Web) | Sumber Inspirasi | Adaptasi ke "Heritage / Warisan Evav" |
|------------------|------------------|--------------------------------------|
| **Image-First Storytelling** (gambar sangat besar sebagai hero tiap narasi) | Rijksmuseum (Fabrique/Q42), MFAH (OWDT) | Tiap tokoh/adat = satu "layar penuh" dengan foto sinematik. Seperti destinasi, tapi subjeknya adalah *manusia & leluhur*, bukan pantai. |
| **Scroll-Fading, bukan Scroll-Jacking** (teks & foto perlahan muncul mengikuti scroll) | Cumberland Museum (Claire Guiot) | Reveal GSAP `fadeSlideUp` halus (§6.3). Tamu tetap pegang kendali scroll — konsisten dengan "tamu, bukan konsumen" (§0). |
| **Relational / Nonlinear Discovery** (setiap item = node terhubung) | Cumberland "Relational IA" | Warisan Kei bukan satu jalur kaku: Karel (negara) ↔ Ratskap (adat) ↔ budaya ↔ destinasi saling menaut. Cross-link ke `/budaya`, `/eksplorasi`, `/destinasi`. |
| **Editorial "Poster per Section"** (tiap bagian = poster tersendiri, kohesif) | Rose Island (Maël Ruffini), National Geographic "Into the Amazon" | Tiap bab warisan dibingkai sebagai *editorial poster* asimetris (foto + narasi besar), bukan kartu grid kaku. |
| **Timeline / Journey horizontal** (garis waktu sebagai kurasi) | "Journeys" Cumberland, Wiener Städtische "200 Years" (spark timeline) | Garis waktu vertikal (scroll) untuk rekam jejak Karel; suksesi Marga Watratan sebagai *journey* node. Hindari 3D berat (§6.7 restraint). |
| **Dark "Moody" Atmosphere bertahap** (latar gelap untuk momen khidmat) | Cumberland (moody interior museum), Nationalmuseet (authority+accessibility) | Penutup warisan = `bg-tropical-dark` / `bg-[#0C121D]` (§19, §8.5). Puncak emosional (Peak-End §27) di momen penghormatan. |
| **Whitespace sebagai kuratorial** (ruang kosong = napas) | MFAH, Nationalmuseet | `py-16 md:py-24`, container `1600px` (§4). Warisan butuh hening, bukan etalase padat. |
| **Microcopy otoritatif tapi ramah** | Nationalmuseet ("past meets present"), Thayendanegea (dignity, no exoticizing) | Suara §8.6 — hangat, aktif, spesifik, **tidak mengobjektifikasi** budaya adat (prinsip Thayendanegea: no spectacle). |

> **Prinsip Ain Ni Ain (§0) dalam heritage:** Situs kesejarahan Barat sering "museum yang berteriak" (neon, eksibisi). Kei membaliknya — **warisan disambut dengan rendah hati**. Coral pink (§3.2) hanya sebagai aksen penyambut, bukan warna dominan yang "pamer". Inilah bedanya Heritage Kei dari Heritage Eropa.

---

## 1. POSISI DALAM FILM 3 BABAK & EMOTIONAL JOURNEY (§1, §26)

`/heritage` adalah **halaman dedikasi** (deep-page), bukan landing. Ia mengikuti napas yang sama dengan `/budaya` dan `/eksplorasi`: masuk dari keheningan → kedalaman → penghormatan → salam.

| # | Section | Mode (§8.5) | BG (§13) | z-index | Target Emosi (§26) |
|---|---------|-----------|----------|---------|-------------------|
| 0 | Navbar (pill gradient) | — | `bg-nav-gradient` | — | Orientasi |
| 1 | PageHero (overlay) | Dark sinematik | `bg-hero-dark` | z-[5] | "Ada kisah besar di sini" |
| 2 | Prolog — Dua Jejak | Terang | `bg-section` | z-[6] | KEDALAMAN: rasa hormat |
| 3 | Jejak Patriot (Karel) | Terang → Split | `bg-section` | z-[5] | Kagum & respek |
| 4 | Jejak Kedaulatan (Ratskap) | Terang → Split | `bg-section` | z-[4] | KAGUM: adat hidup |
| 5 | Penghormatan / Peak | **Dark Tropical** | `bg-tropical-dark` | z-[3] | **PUNCAK (Peak-End §27)** |
| 6 | Penutup & Salam | **Dark Bintang** | `bg-[#0C121D]` | z-[2] | Damai, diingat |
| 7 | Footer (ritual) | Dark bintang | `bg-[#0C121D]` | — | "Ain Ni Ain" |

> **Ritme ombak (§8.5):** Dark hero → Terang → Terang → Terang → **Dark** → Dark penutup. Satu napas naik-turun, konsisten dengan `/budaya` & `/eksplorasi`.

---

## 2. PAGE HERO (overlay) — Spesifikasi

Gunakan pola `PageHeroSection variant="overlay"` (sama dengan budaya.md §2, tanpa menduplikasi komponen shared).

- **Eyebrow:** `WARISAN KEPAULAUAN KEI`
- **Title:** `Jejak yang` · **TitleAccent:** `Mengukir Evav`
- **Subtitle (§8.6 — hangat tapi bermartabat):**
  > *"Dua kisah besar dari Bumi Evav — pengabdian seorang putra Maluku Tenggara yang teguh menjaga kedaulatan Indonesia, dan kedaulatan adat Ratskap Manyeuw Rumadian yang menjaga tegaknya hukum leluhur."*
- **Image:** `/hero/image/kei_warriors_dance.png` (art direction §18: subjek budaya utama, golden hour, manusia sebagai skala).
- **scrollHint:** `Telusuri Warisan` (bukan "Scroll").

---

## 3. PROLOG — "DUA JEJAK" (Terang · bg-section)

Section pembuka yang **memperkenalkan dua narasi tanpa memaksa urutan** (Relational IA, §0 riset). Dua kolom editorial asimetris, masing-masing satu "pintu" menuju jejaknya.

- **Eyebrow:** `MENGAPA WARISAN INI HIDUP`
- **Title (serif §2):** `Dua Jejak,` · Accent: `Satu Jiwa Evav`
- **Narasi prolog (§8.6):**
  > *"Di Kei, sejarah tidak disimpan di laci. Ia berjalan di pasir, berbicara dalam gong, dan menjaga garis pantai. Mari mengenal dua pilar yang membuat Evav tetap berdiri — satu dari Negara, satu dari Adat — sama-sama milik kita."*
- **Dua "pintu" (card solid, bukan glass — §5.6):**
  - Pintu A — `Jejak Patriot` → ikon `ShieldCheck` (lucide, konsisten app), snippet "Karel Sadsuitubun, putra Rumadian yang menjaga merah-putih."
  - Pintu B — `Jejak Kedaulatan` → ikon `Scale`/`Landmark`, snippet "Ratskap Manyeuw Rumadian, pilar hukum adat Larvul Ngabal."
  - Card: `bg-white border border-brand/10 rounded-lg-design shadow-soft hover:border-brand/30` (§5.6, dilarang glass di konten warisan).
- **Tidak ada CTA paksa** — biarkan tamu memilih (Hick's Law §25: maks 2 pilihan).

---

## 4. JEJAK PATRIOT — KAREL SADSUITUBUN (Terang → Split)

> **Referensi PDF Story Brand 1 (VII Bagian).** Fakta DIJAGA verbatim (§7).

### 4.1 Struktur (adaptasi "Editorial Poster" + Timeline)

| Sub | Bagian PDF | Treatement Layout | Mode |
|-----|-----------|-------------------|------|
| 4.1 | I Pengantar | Split: foto potret formal BW (kiri) + narasi (kanan) | Terang |
| 4.2 | II Latar Belakang | Split berlawanan + infografis titik kelahiran (Ohoi Rumadian) | Terang |
| 4.3 | III Rekam Jejak | **Timeline vertikal** (RMS→DI/TII→PRRI PERMESTA→TRIKORA), node `bg-brand` | Terang |
| 4.4 | IV Tragedi & Pengabdian Akhir | Split foto monumen + narasi khidmat (vignette `from-black/80`) | Terang→gelap transisi |
| 4.5 | V Penghormatan & Anugerah | Grid 3 card (Pahlawan Revolusi / AIPDA Anumerta / Bintang Republik) | Terang |
| 4.6 | VI Warisan Terabadikan | Kolase (Bandara / KRI 356 / Jalan / Monumen) — masonry asimetris | Terang |
| 4.7 | VII Penutup Karel | Quote serif `text-fluid-h3 text-black` (bukan cursive §2.4) + CTA | Terang |

### 4.2 Spesifikasi komponen

- **Image card (§5.6):** `w-full h-[320px] md:h-[460px] rounded-xl-design overflow-hidden shadow-card`, `object-cover`, hover `scale-105`, overlay `from-black/90 via-black/30 to-transparent`. Foto BW tetap kompatibel (§18.3: no filter, tapi arsip sejarah diperbolehkan B&W sebagai dokumen).
- **Timeline (§4 §24):** node card `bg-white border border-brand/10 rounded-lg-design shadow-card hover:border-brand/30`; year `text-brand text-fluid-h4` serif; connector `bg-brand/30`; dot `bg-brand shadow-soft`. (Reuse pola `BudayaTimeline` di budaya.md §4.)
- **Counter badge (tahun 1928):** `bg-brand/10 text-brand rounded-lg-design` (aksesoris fokus tunggal, bukan progress bar — §6.7).
- **Quote penutup:** serif `text-fluid-h3 text-black` (§2.4: cursive DILARANG di sini).
- **CTA penutup Karel:** `.btn-cta` (border hitam → hover pink, §5.3 `useSpotlight`) → `Kenali Budaya Adat` → `/budaya`.

> **Rekonsiliasi PDF:** PDF Bagian V mencampur "tragedi" ke dalam "anugerah"; dokumen ini memisah **IV = Tragedi**, **V = Anugerah** agar selaras fakta (sama dengan sejarah.md §7.4).

---

## 5. JEJAK KEDAULATAN — RATSKAP MANYEUW RUMADIAN (Terang → Split)

> **Referensi PDF Story Brand 2 (VII Bagian).** Fakta DIJAGA verbatim (§7).

### 5.1 Struktur

| Sub | Bagian PDF | Treatement Layout | Mode |
|-----|-----------|-------------------|------|
| 5.1 | I Pengantar | Split: lanskap Ohoi Tel Nangan (kiri) + narasi | Terang |
| 5.2 | II Filosofi Kepemimpinan | Filosofi "Rat Manyeuw" = elang kecil → ilustrasi/foto elang + serif quote | Terang |
| 5.3 | III Legitimasi Sejarah | Gong Dada Wadlau sebagai hero tile (bento) + narasi Pata Limi | Terang |
| 5.4 | IV Wilayah Kekuasaan | 7 kampung adat → grid 7 pill/nodes (Debut, Lairngaggas, Selayar, Namar, Ngilngof, Ngayub, Ohoiluk) | Terang |
| 5.5 | V Garis Suksesi | **Journey node** Marga Watratan (Rat Henrikus Jang → Rat Norbertus 1994) | Terang |
| 5.6 | VI Tanggung Jawab Moral | 3 card (Pengayoman / Hukum Adat / Pelestarian) | Terang |
| 5.7 | VII Penutup Ratskap | Quote serif + cross-link ke `/budaya` | Terang |

### 5.2 Spesifikasi komponen

- **Bento (§3.3 budaya.md):** item Gong Dada Wadlau `col-span-2 row-span-2` hero tile; image + overlay `from-black/90`; icon badge `bg-brand/20 text-brand w-10 h-10 rounded-full`; H3 serif `text-white`.
- **Filosofi quote:** **HAPUS cursive** (§2.4) → serif `text-fluid-h3 text-black/80`. Metafora elang sebagai "Visual Anchor" (riset Cumberland).
- **Suksesi (Journey):** horizontal-scroll ringan *boleh* di sini sebagai variasi (riset "Journeys" Cumberland) — tapi tetap `prefers-reduced-motion` aman & tidak scroll-jack. Default: vertikal node agar konsisten.
- **7 kampung:** grid `md:grid-cols-3 lg:grid-cols-4` (maks 3–4 per baris, §25.1), pill `bg-brand/10 text-brand rounded-full`.
- **Tanggung jawab:** card `bg-white border border-brand/10` (light). H3 serif `text-black`.
- **Cross-link:** `Pelajari Budaya Adat` → `/budaya` (CTA sekunder, §25.2).

---

## 6. PENGHORMATAN — PUNCAK EMOSIONAL (Dark Tropical · Peak-End §27)

Ini adalah **Peak** halaman heritage (backup peak selain Hero §27.1). Satu foto wide-angle asri, negatif space luas, golden-hour soft.

- **Mode:** `bg-tropical-dark` (§19). text `text-white`, intro `text-white/60`, border `border-white/10`, **glow bukan shadow** (§19.4), foto `brightness-110 contrast-105` (§19.5).
- **Eyebrow:** `PENGHORMATAN`
- **Title (serif):** `Dua Warisan yang` · Accent: `Masih Berdetak`
- **Narasi (gabungan Karel + Ratskap, dari PDF VII):**
  > *"Menelusuri sejarah Ratskap Manyeuw Rumadian adalah memahami detak jantung budaya masyarakat Kei. Bersama pengabdian Karel Sadsuitubun yang menjaga merah-putih, keduanya mengingatkan: warisan Evav bukan cerita selesai — ia masih hidup, masih berdetak, masih menunggu kita rawat."*
- **Tidak ada CTA** di section ini — biarkan jeda emosional bernapas (konsisten §9 Jeda Jiwa, §27 Peak).

---

## 7. PENUTUP & SAMBUTAN (Dark Bintang · Konversi Lembut)

- **Mode:** `bg-[#0C121D]` (footer bintang, §13/§27.2).
- **Layout:** Split kiri (foto malam berbintang Kei) + kanan (panel sambutan + cross-link).
- **Eyebrow:** `SAMBUTAN KELUARGA EVAv`
- **Title (serif):** `Warisan ini` · Accent: `Milik Kita Bersama`
- **Narasi (§8.6):**
  > *"Di Kei, kita semua bersaudara — termasuk dengan leluhur yang menulis sejarah ini. Mari bawa pulang bukan sekadar cerita, tapi panggilan untuk merawatnya. Sampai jumpa di Tanah Evav."*
- **Cross-link (maks 2, §25.2):**
  - `Jelajahi Jiwa Kei` → `/budaya` (`.btn-cta`)
  - `Rasakan Festivnya` → `/eksplorasi` (CTA sekunder)
- **Salam penutup (cursive §2.4 global):** `Ain Ni Ain`.

---

## 8. COPYWRITING (§8.6 — hangat, aktif, factual · sumber Heritage.pdf)

| Elemen | Teks |
|--------|------|
| Hero subtitle | "Dua kisah besar dari Bumi Evav — pengabdian seorang putra Maluku Tenggara yang teguh menjaga kedaulatan Indonesia, dan kedaulatan adat Ratskap Manyeuw Rumadian yang menjaga tegaknya hukum leluhur." |
| Prolog | "Di Kei, sejarah tidak disimpan di laci. Ia berjalan di pasir, berbicara dalam gong, dan menjaga garis pantai…" (lihat §3) |
| Penutup Karel | "Mari mengenang dan merawat semangat patriotisme yang ia wariskan. Sejarah bukan sekadar catatan masa lalu, melainkan kompas bagi masa depan bangsa yang berlandaskan Pancasila dan UUD 1945." |
| Penutup Ratskap | "Menelusuri sejarah Ratskap Manyeuw Rumadian adalah memahami detak jantung budaya masyarakat Kei. Mari bersama-sama menghormati dan melestarikan warisan identitas bangsa yang terus hidup hingga hari ini." |
| Peak (§6) | "…keduanya mengingatkan: warisan Evav bukan cerita selesai — ia masih hidup, masih berdetak…" |
| Penutup (§7) | "Di Kei, kita semua bersaudara — termasuk dengan leluhur yang menulis sejarah ini…" |
| Scroll hint | "Telusuri Warisan" |
| CTA Karel | "Kenali Budaya Adat" → `/budaya` |
| CTA penutup | "Jelajahi Jiwa Kei" → `/budaya` · "Rasakan Festivnya" → `/eksplorasi` |

**Fakta DIJAGA (jangan diubah — §7 Heritage.pdf):**
- **Karel Sadsuitubun:** lahir 14 Okt 1928 ("Kace"), RMS Ambon, DI/TII Aceh-Sulsel, PRRI PERMESTA 1958, TRIKORA 1961, G30S/PKI 30 Sep 1965 (WAPERDAM II Dr. J. Leimena), Pahlawan Revolusi, AIPDA Anumerta, Bintang Republik Kelas II, Bandara Karel Sadsuitubun (Langgur), KRI Karel Sadsuitubun (356).
- **Ratskap Manyeuw Rumadian:** ~1870-an, gong Dada Wadlau, Pata Limi, Rat Yarbedang & Rat Amardai, 7 kampung (Debut, Lairngaggas, Selayar, Namar, Ngilngof, Ngayub, Ohoiluk), Marga Watratan, Rat Henrikus Jang Watratan → Rat Norbertus Watratan (1994).

---

## 8A. ARSIP & DATA FAKTUAL (Hasil Riset Mendalam — Disclaimer & Credit)

> Section ini adalah **lapisan informasi faktual** yang memperdalam `/heritage` agar tidak hanya kuat narasi, tapi juga lengkap & terverifikasi. Data dibagi dua sumber:
> - **[PDF]** = dari `docs/Copywriting/Heritage.pdf` — **FAKTA UTAMA, DIJAGA KETAT** (tidak boleh diubah).
> - **[WEB]** = dari riset web (Wikipedia, Tirto, IKPNI, repositori Kemdikbud, jurnal Larvul Ngabal) — **pendalaman konteks**, perlu **validasi informan lokal Kei** sebelum production. Ditandai `[WEB]` dan wajib ada credit di akhir section.

### 8A.1 Profil Karel Sadsuitubun (Deep-Dive)

| Field | Nilai | Sumber |
|-------|-------|--------|
| Nama lengkap | Karel Sadsuitubun (juga ditulis Karel Satsuit Tubun / KS Tubun) | [PDF] [WEB] |
| Panggilan | "Kace" | [PDF] |
| Lahir | 14 Oktober 1928, Ohoi Rumadian / Tual, Kei Kecil, Maluku Tenggara | [PDF] [WEB] |
| Wafat | 1 Oktober 1965 (dini hari), gugur di kediaman WAPERDAM II Dr. J. Leimena, Jl. Teuku Umar, Jakarta | [PDF] [WEB] |
| Usia saat gugur | 36 tahun (beberapa sumber: "beberapa hari sebelum ulang tahun ke-37") | [WEB] |
| Pendidikan | SD Kristen Katolik (1935–1941); Sekolah Polisi Negara Ambon (1951, 6 bulan) | [WEB] |
| Instansi | Brigade Mobile (Brimob) — Kepolisian Negara RI | [PDF] [WEB] |
| Pangkat tertinggi (hidup) | Brigadir Polisi | [WEB] |
| Pangkat anumerta | Ajun Inspektur Polisi Dua (AIPDA) Anumerta | [PDF] |
| Penetapan Pahlawan | SK Panglima Tertinggi ABRI/KOTI No. 114/KOTI/1965, 5 Oktober 1965 | [WEB] |
| Makam | Taman Makam Pahlawan Kalibata, Jakarta (di samping DI Pandjaitan) | [WEB] |
| Keluarga | Istri: Margaritha Waginah (menikah 1959); 3 anak (anak tertua 5 tahun saat wafat) | [WEB] |
| Catatan unik | **Satu-satunya anggota Polri** yang menerima gelar Pahlawan Revolusi | [WEB] |

**Kronologi Operasi Militer (Timeline Lengkap) — [PDF] + [WEB]:**
1. **1951** — Masuk Sekolah Polisi Negara Ambon; pangkat Agen Polisi II.
2. **1952** — Dipindah ke Jakarta, masuk Brimob; pangkat Agen Polisi I.
3. **1954** — Latihan Brimob Megamendung, Bogor.
4. **1955** — Tugas di Sumatera Utara.
5. **1956** — 3 bulan bertugas di Aceh saat pemberontakan **DI/TII** (Daud Beureuh). *[WEB: konteks — DI/TII berlangsung 1950-an di Aceh/Sulsel]*
6. **1958** — Kembali ke Jakarta (Ciputat); ikut **PRRI PERMESTA** (Sumbar/Sulut). *[WEB: PRRI pecah 1958]*
7. **1958–1960** — Tugas di Sumbar tangani PRRI (6 bulan, lapis baja kompi C/1129).
8. **1961–1962** — **TRIKORA** pembebasan Irian Barat; pulang Sept 1963 naik ke Brigadir Polisi.
9. **Apr 1965** — Masuk pasukan pengawal WAPERDAM II Dr. J. Leimena.
10. **30 Sep–1 Okt 1965** — G30S/PKI; saat piket pagi (rekan Lussy & Lubis), terbangun & melawan sendiri, gugur tertembak (1 lawan 8).

**Entitas yang Mengabadikan Nama — [PDF] + [WEB]:**
- **Bandar Udara Karel Sadsuitubun** — Langgur / Ibra, Kei Kecil (pintu udara Kei). *[WEB: disebut "Ibra, Kei Kecil"]*
- **KRI Karel Sadsuitubun (356)** — fregat kelas Ahmad Yani, TNI AL.
- **Jalan Karel Sadsuitubun** — di berbagai kota (Palmerah Jakarta Barat, Bogor/Kedunghalang, dst).
- **Monumen** — Ohoi Rumadian (tempat kelahiran).

> ⚠️ **Disclaimer [WEB]:** Nama "Tual" vs "Ohoi Rumadian" — PDF menyebut Rumadian (Kei Kecil), beberapa web menyebut Tual. Dalam implementasi, gunakan **Ohoi Rumadian** (sesuai PDF = sumber otoritatif copywriting). Sinkronisasi dengan informan lokal bila ada perbedaan administratif Tual vs Rumadian.

### 8A.2 Hukum Adat Larvul Ngabal (Deep-Dive) — [PDF] + [WEB]

| Field | Nilai | Sumber |
|-------|-------|--------|
| Makna harfiah | *Lar* = darah, *vul* = merah; *nga* = tombak, *bal* = Bali → "darah merah & tombak Bali" | [WEB] |
| Structur | Dwi-tunggal: **Hukum Larvul** (pidana, dirumuskan 9 *mel* di Elaar, Nuhu Roa/Kei Kecil → persekutuan **Ursiu/Siwa**) + **Hukum Ngabal** (perdata/keluarga, dirumuskan 5 *hala'ai* di Ler Ohoilim, Nustēn/Kei Besar → persekutuan **Lorlim/Lima**) | [WEB] |
| 7 Pasal | 4 dari Larvul (pasal 1–4) + 3 dari Ngabal (pasal 5–7) | [WEB] |
| Tiga rumpun hukum | **Nevnev** (hukum kehidupan/pidana, pasal 1–4), **Hanilit** (kesopanan/keluarga, pasal 5–6), **Hawear Balwirin** (hak kepemilikan/properti, pasal 7) | [WEB] |
| Konsep terkait | **Pata Limi** (sendi perjanjian 5 pihak), **Sasi/Yot/Yutut** (larangan lestari, turunan pasal 7), **Ain Ni Ain** (falsafah persaudaraan pemersatu) | [PDF] [WEB] |
| Status | Hukum positif adat hidup di seluruh Kei; diakui negara (pengadilan adat) | [WEB] |

**7 Pasal Larvul Ngabal (ringkas) — [WEB]:**
1. *Uud entauk tavunad* — kepala bertumpu pada tengkuk (pemimpin harus menyatu dengan rakyat).
2. *Lelad ain fo mahiling* — leher/keselamatan manusia dijunjung (hargai nyawa).
3. *Ulnit envil atumud* — kulit membungkus tubuh (larang memfitnah/mencemarkan nama).
4. *Lar nakmot ivud* — darah tenang di tubuh (larang penganiayaan/pertumpahan darah).
5. *Rek fo kilmutun* — ambang rumah dihormati (kemurnian wanita/ruang privat).
6. *Moryaian fo mahiling* — tempat wanita diluhurkan (kemuliaan keluarga).
7. *Hira ni fo i ni, it did fo it did* — milik orang tetap miliknya, milik kita tetap milik kita (hak kepemilikan & keadilan).

**Sanksi Adat (contoh) — [WEB]:** Pelanggaran Nevnev (pembunuhan) → denda 40 depa terdiri 1 gong (ganti kepala), 1 lela (ganti tulang belakang), 1 emas Reu Rad (ganti pusar), 3 tahil emas murni + uang. Pelanggaran Hawear (rusak milik/tanam Hawear) → 1 lela/meriam kuno + tahil emas.

### 8A.3 Struktur Kekuasaan Adat (Ratskap & Persekutuan) — [PDF] + [WEB]

- **Dua persekutuan besar:** **Ursiu/Lor Siw** (9 Ratschap) & **Lor Lim** (5 Ratschap) + **Lorlabai** (pihak netral). *[WEB: Ratschap dipimpin Rat/Raja]*
- **Ratskap Manyeuw Rumadian** adalah pilar dalam naungan **Pata Limi** (persekutuan 5 pihak). *[PDF]*
- **Gong Dada Wadlau** = simbol legitimasi tertinggi (suara mengikat keabsahan). *[PDF]*
- **Marga Watratan** = pemegang mandat suksesi: Rat Henrikus Jang Watratan → Rat Norbertus Watratan (dikukuhkan 1994). *[PDF]*
- **7 Kampung Ohoi Tel Nangan** (wilayah kekuasaan): Debut, Lairngaggas, Selayar, Namar, Ngilngof, Ngayub, Ohoiluk. *[PDF]*

### 8A.4 Credit & Disclaimer Sumber Data

- **[PDF]** — `docs/Copywriting/Heritage.pdf` (Story Brand Jejak Patriot + Jejak Kedaulatan). Fakta utama & copywriting. **Wajib dijaga verbatim.**
- **[WEB]** — Riset pembanding (Juli 2026): Wikipedia "Karel Sadsuitubun"; Tirto.id (biografi KS Tubun); IKPNI (profil pahlawan); Repositori Kemdikbud; jurnal *Larvul Ngabal* (Rahail 1993, Ayu 2025, Rado 2022); *The Existence of Larvul Ngabal Law* (Kubangun 2025). Digunakan untuk **pendalaman konteks & kronologi**, bukan sebagai sumber fakta tunggal.
- ⚠️ **Validasi:** Seluruh data `[WEB]` harus diklarifikasi dengan **informan lokal Kei** (terutama nama tempat Tual/Rumadian, urutan Ratschap, dan tahun pasti pengukuhan Rat Norbertus) sebelum ditampilkan di production. AGENTS.md §5 mewajibkan fakta DIJAGA & tidak mengarang.

---

## 8B. USULAN 2 SUB-PAGE (Deep-Dive per Jejak)

Agar halaman `/heritage` tidak kepadatan namun informasi lengkap tetap tersedia, usulkan **2 sub-page** yang dibuka dari Prolog (`#karel` / `#ratskap`) dan dari CTA tiap section:

| Sub-page | Route | Fokus Konten | Section Usulan |
|----------|-------|-------------|----------------|
| **Jejak Patriot** | `/heritage/karel` | Profil lengkap + kronologi operasi + anugerah + entitas pengabadian + arsip keluarga | §4A (lihat bawah) |
| **Jejak Kedaulatan** | `/heritage/ratskap` | Filosofi Rat Manyeuw + 7 pasal Larvul Ngabal + struktur Siwa-Lima + suksesi Watratan + 7 kampung + glosarium | §4B (lihat bawah) |

**Layout sub-page (ikuti pola `/heritage`):** Navbar → Hero mini (judul jejak) → konten faktual (card/table/timeline) → cross-link kembali ke `/heritage` & `/budaya`. Mode: terang utama, 1 dark moment di penghormatan.

**§4A — Struktur `/heritage/karel`**
1. Hero: "Karel Sadsuitubun" · "Putra Evav yang Menjaga Merah-Putih".
2. Profil (tabel 8A.1) + foto potret.
3. Kronologi Operasi (timeline lengkap 8A.1, 10 node).
4. Malam 30 September 1965 (narasi detail + foto monumen).
5. Anugerah & Tanda Jasa (3 card + SK 114/KOTI/1965).
6. Warisan Terabadikan (4 entitas: bandara, KRI 356, jalan, monumen).
7. Penutup + CTA "Kembali ke Warisan" → `/heritage`.

**§4B — Struktur `/heritage/ratskap`**
1. Hero: "Ratskap Manyeuw Rumadian" · "Pilar Kedaulatan Adat Evav".
2. Filosofi Rat Manyeuw (elang kecil) + quote.
3. Larvul Ngabal: asal-usul (Siwa-Lima, Bali spear) + 7 pasal (tabel).
4. Pata Limi & Gong Dada Wadlau (legitimasi).
5. Struktur Kekuasaan: Ursiu/Lorlim/Lorlabai + Ratskap dalam Pata Limi.
6. Garis Suksesi Marga Watratan (node).
7. 7 Kampung Ohoi Tel Nangan (grid + peta bila ada).
8. Glosarium (Larvul, Ngabal, Ratskap, Rat, Ohoi, Marga, Sasi, Lela, Gong).
9. Penutup + CTA "Kembali ke Warisan" → `/heritage`.

> **Prinsip Ain Ni Ain (§0):** Sub-page tetap *menyambut*, bukan etalase. Data faktual disajikan sebagai "arsip hidup" — rapi, terkurasi, tidak berteriak. Token & aturan §9–§13 berlaku utuh.

---

## 9. ATURAN TEMA & TOKEN (konsisten GRAND_DESIGN.md)

- **Font:** Heading `font-serif` (Montaga), Body/label `font-sans` (Montserrat), Aksen cursive `font-cursive` (Ephesis) **hanya** di Hero tagline + salam penutup (§2.4). Di page ini: TIDAK ADA cursive di quote/filosofi (konversi ke serif).
- **Warna (token, NO hex hardcode §13):**
  - Terang: `bg-section`, text `text-black` / `text-black/60` / `text-black/70`.
  - Dark: `bg-tropical-dark` (§19), `bg-[#0C121D]`.
  - Accent: `text-brand` (`--color-primary-pink`), `bg-brand/10`, `border-brand/10`.
- **Container (§4.1):** `max-w-[98%] xl:max-w-[1600px] mx-auto px-4 md:px-8 w-full`.
- **CTA (§5.3):** gunakan `.btn-cta` + hook `useSpotlight()` (tanpa bg, border hitam → hover pink). Bukan `bg-nav-gradient` untuk tab.
- **Radius/Shadow:** `.rounded-xl-design`, `.shadow-soft`, `.shadow-card`, `.focus-ring` (a11y §10).
- **Glassmorphism (§5.6):** **DILARANG** di seluruh konten warisan/adat. Semua panel solid.
- **Section:** `snap-start snap-always min-h-screen` (§4 Aturan Emas #7).
- **GSAP:** semua ScrollTrigger dibungkus `gsap.context()` + `ctx.revert()` cleanup (§6.1). Cek `prefers-reduced-motion` (§6.6). **Scroll-fading, bukan scroll-jacking** (riset Cumberland — tamu pegang kendali).
- **Design Restraint (§6.7):** tidak ada progress bar, maks 1 animasi dominan per elemen, tidak ada skeleton (kecuali peta bila kelak ditambah).

---

## 10. AKSESIBILITAS & A11y (§10, §18.3)

- Semua tombol ikon (`ShieldCheck`, `Landmark`, `ChevronRight`, dll): `aria-label` Bahasa Indonesia.
- Alt gambar spesifik & deskriptif: `"Potret formal Karel Sadsuitubun — pahlawan dari Ohoi Rumadian"`, `"Gong adat Dada Wadlau — simbol legitimasi Ratskap"`, `"Lanskap Ohoi Tel Nangan saat senja"`.
- Kontras: teks putih selalu di atas overlay `from-black/70+`; teks gelap di `bg-section` (§19.1).
- Skip-to-content (`#main-content`) di layout, focus ring `.focus-ring` di elemen interaktif.
- `prefers-reduced-motion`: semua GSAP & transisi dinonaktifkan/statis.

---

## 11. CATATAN EKSPlorASI (Bebas Diperluas — Belum Final)

Dokumen ini adalah **acuan**, bukan spesifikasi kode final. Ruang eksplorasi yang masih terbuka (selaras grand design):

1. **Peta Warisan Interaktif** — bisa mengadaptasi `JourneyMapSection` (§5 landing) untuk menautkan titik: Ohoi Rumadian, Langgur (Bandara), Ohoi Tel Nangan, 7 kampung adat. Pakai `next/image` + skeleton (§7.3.4). *Perlu kajian performa §20.*
2. **Cross-link Relasional** — warisan ↔ budaya ↔ eksplorasi ↔ destinasi membentuk "web" (riset Cumberland Relational IA). Bisa jadi navigasi kontekstual di bawah tiap section.
3. **Variansi Temporal** (§23) — hero heritage bisa ikut 4 wajah Kei (pagi/siang/senja/malam) via `useTimeOfDay` (LOCK mode).
4. **Audio ambient** (§6.5) — ombak pelan di hero heritage (volume ≤0.1, mute WAJIB, hanya setelah user gesture).
5. **Bento vs Timeline** — pilih satu ritme utama agar tidak berisik (§6.7): Karel = timeline vertikal, Ratskap = bento/suksi node. Jangan keduanya sama persis.
6. **Foto autentik** — skor 100/100 (§28.3) hanya datang dari lensa fotografer Kei. Stok web (Unsplash/Wikimedia) hanya fallback sementara dengan atribusi di `src/content/` (§18.3, §7.3.4).

---

## 12. CHECKLIST KESELARASAN & TEKNIS (sebelum implementasi)

- [ ] Tidak ada hex hardcode — semua via token `text-brand` / `bg-section` / `bg-tropical-dark` (§13)
- [ ] Tidak ada `glass`/`glass-dark` di konten warisan/adat (§5.6)
- [ ] Tidak ada cursive di luar Hero/Footer (§2.4) — quote/filosofi pakai serif
- [ ] Typography: H1/H2/H3 serif, body sans, eyebrow `text-brand` (§2)
- [ ] Container `max-w-[98%] xl:max-w-[1600px] mx-auto px-4 md:px-8` (§4.1)
- [ ] Section `snap-start snap-always min-h-screen` (§4 Aturan Emas #7)
- [ ] Dark sections ikuti §19 (white/85, border-white/10, glow not shadow, brightness image)
- [ ] CTA pakai `.btn-cta` + `useSpotlight()` (§5.3), maks 1 primer + 1 sekunder per section (§25.2)
- [ ] GSAP `gsap.context()` + `ctx.revert()` + `prefers-reduced-motion` (§6.1, §6.6)
- [ ] Scroll-fading bukan scroll-jacking (tamu pegang kendali — §0)
- [ ] `aria-label` pada ikon; alt spesifik foto (§10, §18.3)
- [ ] Fakta sejarah 100% akurat, dijaga verbatim (§7, §8)
- [ ] Data [WEB] diberi disclaimer & credit (§8A.4); divalidasi informan lokal sebelum production
- [ ] Arsip faktual (§8A) tersedia sebagai lapisan informasi, tidak membanjiri narasi utama
- [ ] Sub-page `/heritage/karel` & `/heritage/ratskap` mengikuti pola & token yang sama (§8B)
- [ ] Cross-link ke `/budaya`, `/eksplorasi`, `/destinasi` (Relational IA, §0 riset)

---

## 13. SUMBER & REFERENSI

- **Copywriting:** `docs/Copywriting/Heritage.pdf` — *Jejak Patriot Karel Sadsuitubun + Jejak Kedaulatan Ratskap Manyeuw Rumadian (Bagian I–VII)*.
- **Tema/Token:** `docs/GRAND_DESIGN.md` (v2.4) — §0 Ain Ni Ain, §1 Film 3 Babak, §2 Tipografi, §3 Warna, §4 Layout, §5 Komponen/CTA, §5.6 Glassmorphism, §6 Animasi/Restraint, §8.5 Ritme, §8.6 Microcopy, §13 Token, §18 Art Direction, §19 Dark, §23 Temporal, §25 Hick, §26/§27 Journey/Peak-End.
- **Dokumen sejajar:** `docs/page-designs/budaya.md`, `docs/page-designs/eksplorasi.md`, `docs/page-designs/landing-page.md` (konsistensi ritme, token, glass-ban, cursive-rule).
- **Riset layout web (2025–2026):** Rijksmuseum (image-first storytelling), MFAH/Nationalmuseet (editorial + whitespace kuratorial), Cumberland Museum (scroll-fading, relational IA, moody dark, journeys), Rose Island (editorial poster per section), National Geographic "Into the Amazon" (nonlinear exploration), Wiener Städtische "200 Years" (timeline journey), Thayendanegea (dignity, no exoticizing). Semua diadaptasi ke napas tropis Kei tanpa "berteriak" (§0 Ain Ni Ain).
- **Riset data faktual (Juli 2026) — [WEB] pendalaman konteks:** Wikipedia "Karel Sadsuitubun"; Tirto.id (biografi KS Tubun, 2023/2025); IKPNI (profil pahlawan); Repositori Kemdikbud (buku biografi Karel Sadsuitubun); jurnal *Larvul Ngabal* — Rahail (1993), Kubangun (2025, doi:10.18458/kb.2025.si.81), Rado & Alputila (2022, IUS QUIA IUSTUM); Ayu & Rahayu (2021, doi:10.2991/assehr.k.210805.061); IPB Sodality (Ain Ni Ain & Larvul Ngabal). Semua data [WEB] wajib divalidasi informan lokal Kei sebelum production (lihat §8A.4).
