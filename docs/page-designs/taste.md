# 📐 DOKUMEN DESAIN LAYOUT — MENU KULINER KEi

> **Status:** Draft untuk review · **Ref:** `docs/GRAND_DESIGN.md` (v2.3)
> **Route:** `/kuliner` · **Tujuan Emosional (§1):** KOMITMEN — *"Saya akan mendukung lokal"* (rasa & ritus)
> **Filosofi:** Makan adalah ritus yang merajut (Maren). Slow food rendah karbon.

---

## 1. STRUKTUR SECTION

| # | Section | Komponen | Mode (§8.5) | BG (§13) | z-index |
|---|---------|----------|-----------|----------|---------|
| 0 | Navbar | `Navbar` | — | `bg-nav-gradient` | — |
| 1 | PageHero (overlay) | `PageHeroSection variant="overlay"` | Dark sinematik | `bg-hero-dark` | z-[5] |
| 2 | Kuliner (hero + grid + narasi) | `KulinerSection` | **Terang** | `bg-section` | z-[4] |
| 3 | Sticky Ingredient Reveal | `StickyIngredientReveal` | Terang | `bg-section` | z-[3] |
| 4 | Footer | `Footer` | Dark bintang | `bg-[#0C121D]` | — |

---

## 2. PAGE HERO (overlay) — Spesifikasi

Gunakan `PageHeroSection variant="overlay"`. Isi dari `kuliner.ts`.

- **Eyebrow:** `KULINER KEPULAUAN KEI`
- **Title:** `Dari Empulur Pohon` · **TitleAccent:** `sampai ke Mangkuk Kita`
- **Subtitle (§8.6):** *"Sagu, rempah Spice Islands, dan laut berlimpah bertemu di satu meja. Kenali rasa Kepulauan Kei — slow food rendah karbon yang menyatukan peradaban di atas pasir putih selama berabad-abad."*
- **Image:** `/hero/image/kei_culinary_enbal.png`
- **scrollHint:** `Selami Rasa Kei`

---

## 3. KULINER SECTION (light) — Spesifikasi

**Glassmorphism (§5.6):** Diizinkan sebagai aksen kuliner (`bg-grad-warm-kuliner`, `.glass`, `.btn-glass`) — ini pengecualian eksplisit grand design untuk kuliner. TAPI kartu makanan utama tetap pakai surface yang readable: `glass border-white/60` + readability layer `from-white/85 via-white/35 to-white/10` (sudah ada, pertahankan).

### 3.1 Hero kuliner (split teks + gambar)
- Eyebrow `text-brand`, H1 serif `text-fluid-h1 text-black` (`Dari Empulur Pohon` + accent `text-brand`).
- **HAPUS baris `Peradaban di Atas Pasir Putih` ber-font-cursive** (§2.4 — cursive hanya Hero tagline global/JedaJiwa/Footer). Ganti ke serif biasa atau hapus saja (sudah ada di tagline hero global). Jika dipertahankan, gunakan serif `text-brand/80`.
- Quote card: `glass rounded-xl-design` + `Quote` icon, serif italic `text-black/70`. (Glass di sini = aksen, diperbolehkan.)
- Image card: `rounded-xl-design overflow-hidden shadow-card`, overlay `from-black/80`, caption `Dari dapur Kei untuk dunia`.

### 3.2 Sticky Ingredient Reveal
- `bg-section`, sticky kiri. H2 serif `text-fluid-h2 text-black`.
- Panel bahan: `glass rounded-xl-design border border-brand/30 shadow-soft` (aksen kuliner, ok). H3 serif, desc `text-black/70`, ciri `text-brand/90`.

### 3.3 Grid kartu makanan (§5.6 + §25)
- H2 `Cita Rasa dari` + `Lahan & Laut` (serif, `text-black`).
- Grid `lg:grid-cols-4 auto-rows-[260px]`, span `lebar→col-span-2 row-span-2`.
- Card: `glass border-white/60 rounded-lg-design shadow-soft hover:shadow-card group` + readability layer.
- Tag kategori: `text-brand bg-white/55 px-3 py-1.5 rounded-full` + icon lucide (`Leaf, Coffee, Flame, Fish`).
- H3 serif `text-black` (unggulan `text-fluid-h3`, lainnya `text-fluid-h4`).
- CTA per card (§25.2 — max 1 primer + 1 sekunder): primer `Lihat Resep` / sekunder `Pesan via WA`.
- **HAPUS cursive pada `ciri`** (§2.4) → `text-brand/90 font-medium` (sans).

### 3.4 Narasi Maren
- Split gambar (parallax `scale-110`, §6.7 ok) + panel `glass rounded-xl-design`.
- Eyebrow `BUKAN SEKADAR KULINER` · H2 serif `Maren:` + `Meja yang Menyatukan` · body `text-black/70` · quote serif `text-black/80`.

---

## 4. COPYWRITING (§8.6)

| Elemen | Teks |
|--------|------|
| Hero subtitle | "Sagu, rempah Spice Islands, dan laut berlimpah bertemu di satu meja. Kenali rasa Kepulauan Kei — slow food rendah karbon yang menyatukan peradaban di atas pasir putih selama berabad-abad." |
| CTA resep | `Lihat Resep` |
| CTA pesan | `Pesan via WA` |
| CTA section | `Jelajahi Kuliner` (sudah ada) |
| scrollHint | `Selami Rasa Kei` |

**Fakta DIJAGA:** Papeda (batali), Sagu Kasbi (pala/cengkeh), Enbal (umbi Bali), Terasi Dobo (daun aren), Tumis Sirsir, Urap Rumput Laut, Lompa-lompa, Bubur Sagu/Ne, Sate Rusa, Maren.

---

## 5. CHECKLIST (§20.3)
- [ ] Hapus cursive dari `Peradaban di Atas Pasir Putih` & `ciri` makanan (§2.4)
- [ ] Glass hanya sebagai aksen kuliner, kartu tetap readable (§5.6)
- [ ] Typography serif/sans (§2)
- [ ] Max 1 primer + 1 sekunder CTA per card (§25)
- [ ] Container standar (§4.1)
- [ ] `aria-label` ikon & link (§10), alt spesifik (§18.3)

---

## 7. SUMBER COPYWRITING (dari Taste.pdf)

> Sumber: brief copywriting *Taste* (PDF) untuk menu Kuliner — memuat narasi *Story Brand* (Bagian I–VII), saran copywriting, dan kebutuhan aset visual. Ringkasan dokumentasi ini mengutip verbatim teks PDF di mana tersedia; tidak menambahkan fakta di luar PDF.

### 7.1 Narasi Brand & Struktur

Brief menyusun narasi kuliner Kei melalui kerangka *Story Brand* yang dibagi menjadi tujuh bagian:

- **Bagian I — Pengantar:** Membangun narasi emosional mengenai warisan budaya kuliner Kei.
- **Bagian II — Sagu:** Menginformasikan sagu sebagai pangan pokok historis.
- **Bagian III — Enbal:** Menjelaskan keunikan Enbal sebagai ikon kuliner.
- **Bagian IV — Varian Produk:** Memberikan informasi harga dan jenis Enbal.
- **Bagian V — Keunikan Rasa:** Menonjolkan daya tarik rasa "aneh tapi nyata".
- **Bagian VI — Pendamping:** Memperkenalkan hidangan pelengkap lainnya.
- **Bagian VII — Inovasi:** Menampilkan diversifikasi produk modern.

Narasi inti (Bagian I) membingkai makanan Kei sebagai "rajutan sejarah, adaptasi alam, dan warisan budaya" — selaras dengan filosofi *Maren* pada kuliner.md §3.4 (makan sebagai ritus yang merajut).

### 7.2 Copywriting per Bagian

**Bagian I — Pengantar**
- *Section Goal:* Membangun narasi emosional mengenai warisan budaya kuliner Kei.
- *Copywriting (saran PDF):*

  > "Bagi masyarakat Kepulauan Kei, makanan bukan sekadar pengisi perut, melainkan rajutan sejarah, adaptasi alam, dan warisan budaya yang diwariskan turun-temurun. Mengunjungi Tanah Evav tidak akan lengkap tanpa menyesap cita rasa lokalnya yang unik di mana bahan pangan sederhana disulap menjadi hidangan legendaris yang memikat lidah."

- *Need:* Menampilkan visual atmosferik yang merepresentasikan kehangatan budaya dan keramahan masyarakat Kei (foto lanskap makanan tradisional Kei yang estetik).

**Bagian II — Sagu**
- *Section Goal:* Menginformasikan sagu sebagai pangan pokok historis.
- *Copywriting (saran PDF):*

  > "Sagu: Makanan Pokok Warisan Leluhur. Jauh sebelum beras mendominasi meja makan modern, sagu adalah napas kehidupan dan makanan pokok utama nenek moyang di Kepulauan Kei. Mengonsumsi sagu adalah cara masyarakat Kei menghormati bumi dan merawat ingatan akan ketangguhan para leluhur."

- *Need:* Menyediakan visual edukatif tentang tahapan pengolahan sagu tradisional untuk menekankan aspek sejarah (foto hutan sagu atau proses pengolahan sagu tradisional).

**Bagian III — Enbal**
- *Section Goal:* Menjelaskan keunikan Enbal sebagai ikon kuliner.
- *Copywriting (saran PDF):*

  > "Enbal: Ikon Kuliner Berbentuk Cinta. Berasal dari singkong jenis khusus, Enbal adalah bukti kearifan lokal dalam mengolah pangan. Melalui proses tradisional, singkong beracun disulap menjadi camilan aman dan ikonik berbentuk hati yang melambangkan identitas daerah Kei."

- *Need:* Menyajikan foto produk Enbal dengan pencahayaan soft yang menonjolkan tekstur dan variasi bentuk (foto Enbal dalam berbagai varian: bentuk love, stik, dll).

**Bagian IV — Varian Produk**
- *Section Goal:* Memberikan informasi harga dan jenis Enbal.
- *Copywriting (saran PDF):*

  > "Pilihan Varian Enbal:
  > • Enbal Bunga: Rp10.000
  > • Enbal Stik: Rp20.000
  > • Enbal Kacang / Keju / Coklat: Rp25.000"

- *Need:* Menyusun daftar harga dalam format tabel yang bersih dan mudah dibaca (infografis minimalis / tabel menu Enbal).

**Bagian V — Keunikan Rasa**
- *Section Goal:* Menonjolkan daya tarik rasa "aneh tapi nyata".
- *Copywriting:* PDF tidak menyertakan teks copywriting eksplisit pada bagian ini; fokus pada kontras rasa Enbal dengan pendampingnya (mis. Pisang Enbal dengan sambal).
- *Need:* Menampilkan foto close-up yang menggugah selera untuk menunjukkan kontras tekstur Enbal dengan pendampingnya (foto Pisang Enbal dengan sambal).

**Bagian VI — Pendamping**
- *Section Goal:* Memperkenalkan hidangan pelengkap lainnya.
- *Copywriting (saran PDF):*

  > "Hidangan Pesisir Evav:
  > • Sayur Sir-Sir: Tumis daun singkong dan bunga pepaya dengan santan.
  > • Ikan Bakar Colo-Colo: Segar dengan rempah lokal.
  > • Lat (Anggur Laut): Superfood lokal dengan sensasi asin alami."

- *Need:* Menyediakan kumpulan foto hidangan yang ditata secara estetis (food plating) untuk menggugah selera audiens (foto hidangan laut, Sayur Sir-Sir, dan Lat).

**Bagian VII — Inovasi**
- *Section Goal:* Menampilkan diversifikasi produk modern.
- *Copywriting (saran PDF):*

  > "Eksplorasi Rasa Baru: Olahan Mangrove. Kami terus berinovasi mengolah potensi alam Kei, salah satunya adalah stik mangrove yang gurih dan unik."

- *Need:* Menampilkan visual produk olahan mangrove yang modern dan unik sebagai daya tarik utama bagi audiens (foto produk olahan mangrove).

### 7.3 Referensi Visual & Aset

Kebutuhan aset visual yang diidentifikasi dari brief (dokumentasikan untuk keperluan `next/image` dan `images.remotePatterns` bila sumber web dipakai, lihat §7.3 GRAND_DESIGN):

- **Lanskap makanan tradisional Kei** — foto atmosferik yang merepresentasikan kehangatan budaya & keramahan masyarakat Kei (Bagian I).
- **Hutan sagu & proses pengolahan sagu tradisional** — visual edukatif tahapan pengolahan (Bagian II).
- **Enbal varian** — foto produk dengan pencahayaan soft menonjolkan tekstur & bentuk (love, stik, bunga, rasa kacang/keju/coklat) (Bagian III & IV).
- **Pisang Enbal dengan sambal** — close-up kontras tekstur (Bagian V).
- **Hidangan pendamping** — Sayur Sir-Sir, Ikan Bakar Colo-Colo, Lat/Anggur Laut, ditata estetis (food plating) (Bagian VI).
- **Produk olahan mangrove modern** — stik mangrove sebagai inovasi (Bagian VII).

Catatan desain: aset di atas sebaiknya mengikuti token warna hangat `bg-grad-warm-kuliner` (§5.6) dan tipografi serif pada heading (§2) agar konsisten dengan layout §3.

### 7.4 Catatan Rekonsiliasi

- **(a) Fokus Sagu + Enbal vs. daftar banyak hidangan:** PDF menjadikan Sagu dan Enbal sebagai *hero ingredients* narasi (Bagian II–V), sementara kuliner.md §4 memuat banyak hidangan (Papeda, Sagu Kasbi, Enbal, Terasi Dobo, Tumis Sirsir, Urap Rumput Laut, Lompa-lompa, Bubur Sagu, Sate Rusa). Rekomendasi: angkat Sagu & Enbal sebagai jangkar narasi utama (hero/Sticky Ingredient Reveal §3.2–3.3), dan tempatkan hidangan lain sebagai pendamping (Bagian VI) tanpa mengurangi fakta yang dijaga.
- **(b) Blok konten baru:** PDF mengusulkan "Varian Produk" (harga jenis Enbal, Bagian IV) dan "Inovasi" (olahan mangrove, Bagian VII) yang belum ada pada layout kuliner.md saat ini. Catat sebagai *future content blocks* (mis. kartu harga Enbal + section inovasi produk) yang dapat ditambahkan ke §3 tanpa mengubah struktur section 1–4.
- **(c) Keselarasan narasi Maren:** Suara PDF — "makanan sebagai rajutan sejarah/warisan" — selaras dengan narasi Maren pada kuliner.md §3.4. Copywriting Bagian I dapat digunakan untuk memperkuat panel narasi Maren (§8.6).
