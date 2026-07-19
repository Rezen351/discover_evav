# Spesifikasi Proyek: Discover Evav
**Konsep Utama:** Storytelling Web Design

Dokumen ini berisi spesifikasi kebutuhan dan struktur website Discover Evav, dirancang khusus untuk memenuhi kriteria penilaian kompetisi: Fungsionalitas, Kesesuaian Tema, Intuitif, Responsif, dan Soft Skill.

---

## 1. Struktur Halaman & Alur Pengguna (The Journey)

Menggunakan pendekatan *scroll-triggered narrative*, di mana informasi diungkapkan secara bertahap seperti membaca buku cerita.

### Bab 1: The Hook (Hero Section)
*   **Visual:** Video latar belakang (*background video*) atau gambar panorama resolusi tinggi dari Kepulauan Kei.
*   **Teks/Copywriting:** Headline emosional yang memancing rasa penasaran (contoh: *"Lebih dari Sekadar Pasir Putih. Temukan Jiwa Evav."*).
*   **UX:** Animasi indikator "Scroll Down" untuk memandu interaksi pertama.

### Bab 2: The Heritage (Sejarah & Budaya)
*   **Konten:** Narasi singkat tentang kearifan lokal (misal: Hukum Larvul Ngabal) atau sejarah Kepulauan Kei.
*   **Desain:** Transisi visual yang halus (*fade-in* atau *slide-up*) saat elemen memasuki layar. Tipografi yang elegan namun mudah dibaca.

### Bab 3: The Treasures (Eksplorasi Destinasi)
*   **Konten:** Menampilkan destinasi unggulan (Pantai Ngurbloat, Gua Hawang, Pulau Bair, dll.).
*   **UI/UX:** Ditampilkan menggunakan *Interactive Cards* atau *Carousel* untuk menghemat ruang dan meningkatkan interaktivitas.

### Bab 4: The Experience (Call to Action)
*   **Konten:** Ajakan untuk berkunjung atau menghubungi pihak terkait.
*   **UI/UX:** Formulir kontak interaktif, tombar aksi yang jelas, dan peta lokasi.

### Bab 5: The Community (Berita & UMKM Lokal)
*   **Konten:** Tab Berita Terkini (event, budaya, infrastruktur) dan UMKM Unggulan (kuliner, kerajinan, oleh-oleh) dengan tombol "Pesan via WhatsApp".
*   **UI/UX:** Dua tab dapat dijungkit, featured news card besar + daftar berita, serta grid kartu UMKM dengan rating dan kontak langsung. Data bersumber dari panel admin (lihat §3).

---

## 2. Pemenuhan Kriteria Kompetisi

### ✅ Fungsionalitas
*   **Interactive Map:** Peta yang terintegrasi menggunakan **MapLibre GL JS** (via `react-map-gl/maplibre`) dipadukan dengan **MapTiler** untuk tampilan peta *open-source* kustom berdesain premium dan interaktif. Mendukung fitur **3D Terrain**, *Marker Clustering*, *Filter* kategori, dan *Geolocation* (lokasi saat ini) untuk pengalaman eksplorasi yang mewah dan mulus.
*   **Filter Destinasi:** Fitur penyaringan kategori destinasi (Wisata Alam, Budaya, Kuliner).
*   **Performa Optimal:** Pemuatan gambar super cepat menggunakan optimasi Next.js (`<Image />` component) agar tidak ada *lag*.
*   **Smooth Animations:** Penggunaan library **GSAP** (GreenSock Animation Platform), khususnya plugin **ScrollTrigger**, untuk menciptakan animasi interaktif kelas atas dan efek *scroll-triggered* yang *smooth*.

### ✅ Kesesuaian Tema
*   **Palet Warna:** Mengadopsi warna alam Kepulauan Kei (biru laut tropis, putih pasir, hijau perbukitan, atau warna-warna tenun lokal).
*   **Elemen Visual:** Menghindari aset *stock photo* generik; memprioritaskan aset autentik atau elemen grafis bernuansa budaya lokal.

### ✅ Intuitif (User Experience)
*   **Sticky Navbar:** Navigasi utama yang selalu dapat diakses meskipun pengguna sedang berada di tengah "cerita" (saat di-scroll).
*   **Reading Progress Bar:** Indikator visual di bagian atas layar yang menunjukkan progres *scroll* pengguna.
*   **Keterbacaan (Readability):** Penggunaan font sans-serif modern dengan kontras warna teks dan latar belakang yang memenuhi standar aksesibilitas.

### ✅ Responsif
*   **Mobile-First Approach:** Desain dipastikan sempurna saat diakses melalui perangkat *mobile* (smartphone/tablet).
*   **Adaptive Grid:** Tata letak otomatis menyesuaikan ukuran layar (contoh: grid 3 kolom di desktop menjadi 1 kolom di HP).

### ✅ Soft Skill (Bahan Presentasi)
*   **Sudut Pandang Presentasi:** Menekankan bahwa website ini bukan sekadar brosur digital, melainkan **"Pengalaman Interaktif"**. Pendekatan *storytelling* dipilih untuk membangun ikatan emosional dengan audiens, sehingga informasi tentang Evav tidak hanya dibaca, tapi "dirasakan".

---

## 3. Fitur Admin & Manajemen Konten (CMS Sederhana)

Selain sisi *frontend* publik, dibutuhkan panel admin untuk mengelola konten secara mandiri tanpa menyentuh kode. Tujuannya: memberdayakan pelaku lokal (UMKM, pengelola wisata, jurnalis warga) agar dapat memperbarui konten sendiri.

### 3.1 Akses & Keamanan
*   **Route Terproteksi:** Halaman admin di `/admin` dilindungi *middleware* dengan autentikasi berbasis *session* (cookie) — hanya pengguna dengan peran `admin`/`editor` yang boleh masuk.
*   **Role Sederhana:** `admin` (akses penuh) dan `editor` (kelola konten, tidak hapus pengguna).
*   **Penyimpanan Rilis:** File gambar/video diunggah ke **MinIO** (object storage) via Route Handler, bukan disimpan di repo.

### 3.2 Manajemen UMKM & Katalog Produk (Simple E-Commerce)
*   **Katalog UMKM:** CRUD data UMKM (nama, deskripsi, kategori: Kuliner / Kerajinan / Oleh-oleh, kontak, lokasi).
*   **Produk:** Setiap UMKM dapat punya beberapa produk (nama, harga, stok, foto, deskripsi).
*   **Kategori & Filter:** Pengelompokan produk agar mudah dicari di halaman publik.
*   **Status Publikasi:** `Draft` / `Published` agar bisa disiapkan dulu sebelum tampil.
*   **Tampilan Publik:** Halaman *directory* UMKM + detail produk (belum wajib *checkout online*; bisa diarahkan ke WhatsApp/order mandiri sebagai tahap awal simple).

### 3.3 Manajemen Berita & Artikel (News)
*   **CRUD Berita:** Judul, *slug*, ringkasan (*excerpt*), isi (rich text/markdown sederhana), cover image, penulis, tanggal terbit.
*   **Kategori Berita:** Budaya / Event / Infrastruktur / Pengumuman.
*   **Featured News:** Penanda berita unggulan untuk ditampilkan di *carousel* beranda.
*   **Tampilan Publik:** Halaman *blog/berita* dengan daftar + detail artikel, serta integrasi ke *reading progress* di halaman artikel.

### 3.4 Manajemen Konten Lain yang Relevan (Simple namun Fungsional)
*   **Destinasi Wisata:** CRUD destinasi (nama, deskripsi, koordinat peta, foto galeri) — terhubung ke *Interactive Map*.
*   **Event / Agenda:** Kegiatan lokal (nama, tanggal, lokasi, deskripsi) untuk section "Event Mendatang".
*   **Pengaturan Umum (Site Settings):** Edit teks hero, kontak, tautan sosial media, dan informasi footer dari satu tempat.
*   **Media Library:** Unggah & kelola aset gambar/video sekali, lalu digunakan ulang di berbagai konten.
*   **Dashboard Ringkas:** Kartu statistik sederhana (jumlah UMKM, produk, berita, visitor harian via log) tanpa analitik berat.

### 3.5 Pendekatan Teknis yang Diusulkan (Sesuai Konvensi Next.js 16)
*   **Server Components** untuk render daftar/data; **Client Components** hanya untuk form & interaksi (upload, editor).
*   **Route Handlers** (`/api/admin/*`) dengan validasi input (Zod) dan respons JSON seragam (`{ success, data/error }`).
*   **Database:** Tabel baru di PostgreSQL (`umkms`, `products`, `news`, `destinations`, `events`, `media`, `site_settings`, `admins`).
*   **Upload:** Route Handler menulis ke MinIO, menyimpan URL di DB (aman, tidak bocor ke client).
*   **Prioritas:** Bangun bertahap — tahap 1 Auth + Berita + UMKM; tahap 2 Produk/Event/Settings; *checkout online* sebagai pengembangan lanjutan (opsional).
