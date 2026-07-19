# 📐 DOKUMEN ATURAN DESAIN & LAYOUT (SSOT) — LANDING PAGE

> **Status:** Otoritatif (Single Source of Truth) · **Ref:** `docs/GRAND_DESIGN.md` (v2.3)
> **Route:** `/` (Home) · **Tujuan Emosional (§26):** RITME & KEDALAMAN (Ain Ni Ain)
> **Filosofi:** Hubungan timbal-balik (ritme ombak: gelap-terang, ramai-senyap). Kode implementasi beranda wajib mengikuti aturan dalam dokumen ini secara presisi.

---

## 1. STRUKTUR UTAMA & FILOSOFI RITME

Landing page dirancang seperti sebuah simfoni pernapasan visual—bermula dari bagian pembuka yang dramatis, disusul jeda hening kontemplatif, lalu bergantian dengan pola **"Terang, Terang, Dark"** dan **"Terang, Terang, Split"** untuk menjaga ritme emosional pembaca.

| # | Section | Komponen | Mode (§8.5) | BG (§13) | z-index (§4.2) | Keterangan Ritme |
|---|---------|----------|-------------|----------|----------------|------------------|
| 1 | Hero (Hook) | `HeroSection` | Dark sinematik | `bg-[#000]` / Video | `z-[8]` | Pembuka yang megah, emosional, dan dinamis |
| 2 | **Jeda Jiwa (Breather)** | `JedaJiwaSection` | **Dark Senja** | `bg-ocean-indigo` + overlay | `z-[7]` | **Jeda kontemplatif (Senyap & Sakral). Satu foto, satu pepatah.** |
| 3 | **Budaya Adat (Heritage)** | `BudayaAdatSection` | **Terang** | `bg-section` (solid) | `z-[6]` | **Terang 1**: Pusat nilai adat (Larvul Ngabal). |
| 4 | **Journey Map (Treasures)** | `JourneyMapSection` | **Terang** | `bg-section` | `z-[5]` | **Terang 2**: Peta eksplorasi interaktif (MapLibre GL JS) |
| 5 | **Fun Fact (Breather)** | `FunFactSection` | **Dark Tropical** | `bg-tropical-dark` | `z-[4]` | **Dark**: Jeda ringan berisi fakta menarik & statistik |
| 6 | **Destinasi Terbaik** | `DestinasiTerbaikSection` | **Terang** | `bg-section` | `z-[3]` | **Terang 3**: Grid destinasi unggulan Kei |
| 7 | **Berita & UMKM** | `BeritaUmkmSection` | **Terang** | `bg-section` | `z-[2]` | **Terang 4**: Katalog produk UMKM lokal & Tab berita |
| 8 | **Hubungi Kami (Contact)** | `ContactSection` | **Split** | `bg-section` / dark | `z-[1]` | **Split**: Penutup interaksi, form impian perjalanan |
| 9 | Footer | `Footer` | Dark bintang | `bg-[#0C121D]` | — | Salam perpisahan hangat ("Sampai jumpa di Kei") |

---

## 2. ATURAN WARNA & TATA LETAK GLOBAL (SSOT)

Seluruh komponen landing page wajib mematuhi aturan pewarnaan dan komponen berikut demi konsistensi visual:

### 2.1 Standardisasi Tombol CTA (Call to Action)
Tombol CTA primer berfungsi sebagai penunjuk arah utama bagi pengguna untuk melangkah ke bab berikutnya dalam cerita.
1. **CTA Primer (Solid/High Contrast)**:
   - Wajib menggunakan warna solid brand (`bg-brand text-white`) atau gradien tebal yang memiliki tingkat keterbacaan tinggi di atas latar belakangnya.
   - Menggunakan class: `bg-brand text-white px-6 py-3 rounded-xl font-semibold text-sm transition-all hover:brightness-105 active:press focus-ring`.
   - **Ketentuan Shadow & Hover**: Semua tombol CTA yang diletakkan di atas latar belakang terang wajib menyertakan kelas bayangan yang wajar (`shadow-md` dan `hover:shadow-lg`) serta transisi hover yang beralih ke warna teks pink brand (`hover:bg-none hover:bg-brand/10 hover:text-brand`) untuk kontras yang harmonis dan keterbacaan tinggi.
2. **CTA Sekunder (Kaca/Soft / Aksen)**:
   - Digunakan untuk interaksi tingkat kedua.
   - Menggunakan class: `.btn-glass` (terang), `.btn-glass-dark` (gelap), atau `.bg-nav-gradient text-black shadow-md` (pada latar terang).
3. **CTA Form Hubungi Kami / Langganan**:
   - Wajib menggunakan gradien Coral Pink ke Teal yang tegas (`linear-gradient(135deg, var(--color-primary-pink) 0%, var(--color-primary-teal) 100%)`) dengan teks putih, dan beralih ke Coral Pink solid saat di-hover agar gradiennya terlihat kontras dan nyata di layar.
4. **Larangan**:
   - Dilarang keras menggunakan `.bg-nav-gradient` tanpa bayangan/shadow dan tanpa efek hover solid pada tombol CTA kecil di atas latar belakang terang, karena gradien pastelnya akan menyatu dengan latar belakang dan tidak terbaca.

### 2.2 Standardisasi Tab Navigation & Pill Menu
Tab navigasi digunakan untuk berpindah kategori di dalam satu bagian konten (seperti memilih jenis destinasi atau filter lokasi).
1. **Aturan Tab Navigation (Sesuai §5.4)**:
   - **Active State**: Menggunakan teks brand dan garis bawah solid (`text-brand font-bold border-b-2 border-brand pb-1`).
   - **Inactive State**: Menggunakan teks abu-abu atau hitam semi-transparan (`text-black/60 hover:text-brand transition-colors pb-1`).
2. **Aturan Pill Navigation (Jika Berupa Tombol Oval)**:
   - **Active State**: Menggunakan background solid brand (`bg-brand text-white`) atau background pastel brand yang tebal (`bg-brand/20 text-brand border-brand`).
   - **Inactive State**: Menggunakan background solid putih tebal (`bg-white` atau `bg-white/90`) dengan border halus (`border-black/5`) dan teks abu-abu/hitam (`text-gray-700 hover:bg-white/100`) untuk menjaga kontras keterbacaan.
3. **Larangan Keras**:
   - Dilarang menggunakan `.bg-nav-gradient` (gradien pastel) sebagai latar belakang tab aktif maupun tidak aktif.
   - Dilarang menggunakan background transparan tipis (`bg-white/20` atau `bg-black/10`) di atas area peta atau area gambar karena akan membuat teks menu tidak terbaca (*low readability*).

---

## 3. SPESIFIKASI SPESIFIK TIAP SECTION

### 3.1 Jeda Jiwa Section (Pepatah Kei) — Keheningan Sakral
Section ini dirancang sebagai area jeda ("breather") untuk menghormati falsafah lokal.

*   **Aturan Keras**:
    - ❌ Tidak boleh ada card konten.
    - ❌ Tidak boleh ada glassmorphism.
    - ❌ Tidak boleh ada tombol CTA.
    - ❌ Tidak boleh ada animasi aktif (hanya transisi masuk section).
    - ✅ Satu foto. Satu quote. Keheningan luhur.
*   **Solusi Mengatasi Kesunyian Berlebih**:
    - **Art Direction Foto**: Menggunakan foto senja dengan kontras tinggi/teatrikal (siluet pantai Kei saat matahari tenggelam) dengan overlay gradien hitam pekat (`from-black/85 via-black/45 to-black/30`).
    - **Parallax Depth**: Terapkan efek parallax scrolling halus pada gambar latar belakang menggunakan GSAP ScrollTrigger (kecepatan gerak scroll gambar 30% lebih lambat dibanding kecepatan scroll halaman) untuk memberikan ilusi kedalaman 3D premium.
    - **Tipografi**: Quote ditulis menggunakan font `font-cursive` dengan ukuran besar dan letter-spacing longgar pada artinya.

### 3.2 Budaya Adat Section (Larvul Ngabal) — Warisan Luhur
Section interaktif untuk mengeksplorasi 7 pasal hukum adat Larvul Ngabal.

*   **Aturan Keras**:
    - ❌ Dilarang keras menggunakan glassmorphism (wajib surface solid `bg-white` atau `bg-brand/10`).
*   **Solusi Keseimbangan Layout**:
    - **Rasio 3 Kolom Baru**: Ubah rasio kolom bawah menjadi **35% : 30% : 35%** (Kolom 1: Badge Slider, Kolom 2: Gambar Aturan Adat, Kolom 3: Deskripsi Teks & CTA). Ini memberikan ruang horizontal yang luas bagi deskripsi teks sehingga tidak melar secara vertikal.
    - **Watermark Budaya**: Menambahkan watermark SVG bermotif tenun ikat adat Kei (Tenun Elat) dengan opacity sangat rendah (3%-5%) di latar belakang section untuk mengisi area kosong secara elegan.
    - **Slider Progress Indicator**: Menambahkan garis progres interaktif (`h-[2px] bg-brand/10` dengan fill `bg-brand` yang aktif mengikuti indeks aturan aktif) di bawah tombol navigasi slider badge.
    - **Transisi Konten**: Pergantian gambar dan teks saat badge diklik wajib dianimasikan menggunakan efek fade-slide-up GSAP yang halus.

### 3.3 Journey Map Section (Peta Perjalanan Kei) — Treasures
Peta interaktif berbasis MapLibre GL JS untuk merencanakan rute perjalanan wisatawan.

*   **Aturan Keras (Tombol, Menu & Card Peta)**:
    - **Pill Menu Navigasi Lokasi (Persis Sama dengan Destinasi Terbaik)**:
      - Menggunakan format layout `flex items-center gap-2 px-4 py-2 rounded-full text-xs md:text-sm font-medium transition-all duration-300`.
      - Saat **Aktif**: Menggunakan background `bg-nav-gradient text-black shadow-sm`.
      - Saat **Tidak Aktif**: Menggunakan background `bg-white/60 text-black/70 hover:bg-brand/15 hover:text-brand`.
    - **Card Stats Kecil (Keunikan, Budaya, Pengalaman - Borderless)**:
      - Wajib tampil bersih tanpa garis tepi (`border-0` atau `border-none`).
      - Menggunakan background gradasi pastel navy-pink tipis (`linear-gradient(265deg, rgba(234, 245, 249, 0.6) 0%, rgba(252, 236, 239, 0.3) 100%)`) dan ikon berwarna navy tua (`text-brand-navy`) agar serasi dengan nuansa sejuk CTA.
    - **Tombol CTA "Jelajahi Tempat Ini"**:
      - Wajib menggunakan background `.bg-nav-gradient` (gradasi pastel navy-pink) dengan teks hitam pekat `text-black` untuk representasi CTA sekunder yang menyatu dengan tema.
*   **Aset & Peta**:
    - Peta menggunakan CartoDB Positron style dengan penyesuaian warna air laut yang disamakan dengan background halaman (`var(--color-accent-pink)`) dan daratan putih solid untuk visual ultra-clean yang mewah.
    - Terapkan skeleton loader/placeholder statis sewaktu peta sedang dimuat untuk mencegah Layout Shift (CLS).

### 3.4 Destinasi Terbaik Section — Eksplorasi Visual
Grid destinasi wisata, kuliner, penginapan, dan kesenian terbaik di Kepulauan Kei.

*   **Aturan Keras (Standardisasi Warna)**:
    - **Tombol Tab Kategori**: Wajib mengikuti standardisasi §2.2. Dilarang menggunakan `.bg-nav-gradient` pada tab di atas grid. Gunakan tab minimalis (Active: `text-brand font-bold border-b-2 border-brand`, Inactive: `text-black/60 hover:text-brand`).
    - **Tombol CTA "Lihat di Peta"**: Wajib diselaraskan menggunakan tombol CTA primer solid (`bg-brand text-white`).
    - **Grid Kartu Kecil (Sisi Kanan)**: Border aktif menggunakan warna brand `border-brand` dengan scale-up halus (`scale-[1.03]`), dan kartu tidak aktif memiliki opacity `opacity-60`. Nama destinasi langsung ditulis di atas vignette overlay gelap `from-black/90` di bagian bawah kartu untuk menghemat ruang.

---

## 4. PANDUAN COPYWRITING & NADA SUARA (§8.6)

Penggunaan bahasa dalam seluruh teks statis dan label di landing page wajib menggunakan **Bahasa Indonesia** yang hangat, aktif, menyambut, dan mengundang (suara Ain Ni Ain).

- **Tone of Voice**:
  - *Hangat*: Menggunakan kata "Mari" (bukan "Silakan"), "kamu" (bukan "Anda" kecuali formal).
  - *Aktif*: Menggunakan kata kerja aktif seperti "Jelajahi" (bukan pasif "Bisa dijelajahi").
  - *Spesifik*: Menyebutkan nama tempat secara presisi (seperti "Ngurbloat", "Pulau Bair", "Goa Hawang") untuk membangun kesan otentik.
- **Tabel Pemicu Emosi**:
  - *Hero*: Rasa kagum dan takjub awal ("Peradaban di Atas Pasir Putih").
  - *Jeda Jiwa*: Rasa hormat, kedamaian, dan keheningan sakral.
  - *Budaya Adat*: Rasa respek mendalam terhadap nilai-nilai hukum adat Larvul Ngabal.
  - *Journey Map*: Rasa penasaran dan gairah untuk merencanakan petualangan pribadi.

---

## 5. CHECKLIST KESELARASAN DESAIN & TEKNIS

Sebelum melakukan perubahan kode pada komponen React `.tsx` di landing page, pastikan kriteria berikut telah dipenuhi:
- [x] **Zero-Hex Hardcode**: Seluruh warna dirujuk melalui class utility CSS atau variabel `:root` di `globals.css` (seperti `text-brand`, `bg-brand`, `border-brand/10`).
- [x] **Redistribusi Kolom Budaya**: Kolom Budaya Adat menggunakan rasio seimbang 35% : 30% : 35% dan bebas dari glassmorphism.
- [x] **Konsistensi Menu Peta**: Tombol navigasi lokasi di Journey Map menggunakan background solid putih (tidak aktif) dan solid brand (aktif).
- [x] **Pemberantasan bg-nav-gradient Salah Tempat**: Tombol tab destinasi terbaik dan tombol menu peta tidak lagi menggunakan `.bg-nav-gradient`.
- [x] **Aksesibilitas (A11y)**: Semua tombol ikon memiliki `aria-label` Bahasa Indonesia dan ring fokus (`focus-ring`) yang terlihat jelas saat dinavigasi dengan keyboard.
- [x] **Cleanup GSAP**: Semua interaksi animasi GSAP ScrollTrigger dibungkus dengan `gsap.context()` dan menyertakan return cleanup `ctx.revert()` untuk mencegah kebocoran memori.
