# Kebijakan Cookie — Simfoni Evav

**Situs:** [discoverevav.id](https://discoverevav.id) — "Simfoni Evav", situs pariwisata Kepulauan Kei / Evav, Maluku Tenggara, Indonesia.
**Berlaku sejak:** 19 Juli 2026

Dokumen ini menjelaskan secara jujur dan akurat teknologi penyimpanan lokal serta layanan pihak ketiga yang benar-benar digunakan oleh situs ini, berdasarkan implementasi kode yang berjalan (bukan template umum).

---

## Apa itu Cookie

Cookie adalah berkas teks kecil yang disimpan di perangkat Anda oleh situs web melalui peramban (browser). Selain cookie, situs modern juga dapat menggunakan teknik penyimpanan lokal lainnya, seperti `localStorage` dan `sessionStorage`, untuk menyimpan preferensi di perangkat Anda tanpa mengirimkannya kembali ke server kami setiap kali.

---

## Cookie yang Kami Gunakan

Berdasarkan peninjauan kode sumber situs, **Simfoni Evav tidak memasang cookie pelacakan (tracking cookie) dan tidak menggunakan layanan analitik pihak ketiga** (seperti Google Analytics, Google Tag Manager, Meta Pixel, Plausible, Umami, Hotjar, Mixpanel, atau sejenisnya).

Satu-satunya penyimpanan lokal yang digunakan situs ini adalah untuk keperluan fungsional/preferensi, dijelaskan pada tabel berikut.

### 1. Cookie / Storage Penting & Teknis

| Nama | Jenis | Fungsi | Durasi |
|------|-------|--------|--------|
| Tidak ada cookie sesi atau token autentikasi yang digunakan | — | Situs bersifat publik dan tidak memiliki sistem login/akun pengguna | — |

Situs ini **tidak** menggunakan `sessionStorage`, `indexedDB`, token autentikasi, maupun cookie sesi apa pun.

### 2. Cookie Preferensi

| Nama | Jenis | Fungsi | Durasi |
|------|-------|--------|--------|
| `lang` | `localStorage` (browser) | Menyimpan pilihan bahasa antarmuka pengguna ("id" untuk Bahasa Indonesia atau "en" untuk Inggris) agar pilihan tetap konsisten saat berpindah halaman. Diatur melalui komponen Navbar (`src/components/Navbar.tsx`). | Tetap (persistent) hingga dihapus manual oleh pengguna. |

**Catatan mengenai audio ambient:** Tombol suara ombak Kei (`src/components/AmbientSound.tsx`) bersifat sementara dan **tidak** menyimpan preferensi ke `localStorage`/`cookie`. Status aktif/nonaktif suara hanya berlaku selama sesi halaman terbuka dan akan kembali ke kondisi awal (bisu) setelah halaman dimuat ulang.

### 3. Analitik

**TIDAK ADA.** Situs ini tidak memuat skrip analitik atau pelacakan pengunjung apa pun. Kami tidak mengumpulkan data perilaku penjelajahan Anda melalui cookie pihak ketiga.

### 4. Pihak Ketiga (Lihat juga bagian "Cookie Pihak Ketiga" di bawah)

Situs memuat sumber daya dari pihak ketiga berikut untuk keperluan tampilan dan peta (lihat detail di bawah). Layanan ini tidak digunakan untuk menyimpan cookie pelacakan di situs kami.

---

## Cookie Pihak Ketiga

Beberapa layanan pihak ketiga dimuat oleh situs untuk menyajikan konten. Penjelasannya:

### Peta — MapLibre GL & Basemap CARTO

Halaman penjelajahan peta (`src/components/JourneyMapSection.tsx`) menggunakan **MapLibre GL JS** (pustaka peta sumber terbuka) melalui pembungkus `react-map-gl/maplibre`. Peta memuat gaya basemap dari **CARTO** (CartoDB):

- `https://basemaps.cartocdn.com/gl/positron-gl-style/style.json`

Saat peta dimuat, peramban Anda akan mengambil berkas gaya, ubin peta (tiles), dan aset peta dari server CARTO (`basemaps.cartocdn.com`). Permintaan ini dilakukan oleh peramban Anda langsung ke server CARTO. CARTO mungkin mencatat alamat IP dan data teknis standar permintaan (seperti halnya setiap pengambilan aset web). Penggunaan ini murni untuk menampilkan peta lokasi wisata Kepulauan Kei dan **bukan** untuk pelacakan pengguna.

Situs **tidak** menggunakan Mapbox berbayar dan **tidak** memerlukan token API pihak ketiga untuk peta.

### Font — Google Fonts (Di-hosting Mandiri)

Situs menggunakan font Montserrat, Montaga, dan Ephesis melalui `next/font/google` (`src/app/layout.tsx`). Penting untuk dicatat: Next.js **mengunduh dan mengin boat font tersebut saat proses build**, sehingga font dihidangkan (served) langsung dari domain kami sendiri (`discoverevav.id`). Situs **tidak** memuat skrip atau stylesheet dari `fonts.googleapis.com`/`fonts.gstatic.com` di peramban pengguna saat runtime, sehingga tidak ada permintaan pelacakan ke Google Fonts dari sisi klien.

### Gambar — Unsplash

Gambar konten (destinasi, budaya, kuliner, warisan) diambil dari Unsplash (`images.unsplash.com`) sebagai sumber cadangan web. Domain ini terdaftar di `images.remotePatterns` pada `next.config.ts`. Pengambilan gambar dilakukan melalui komponen `next/image` dari server kami; tidak ada piksel pelacakan yang disematkan.

### Tautan Media Sosial

Situs hanya menampilkan **tautan** ke akun resmi (Instagram, TikTok, YouTube, Facebook) dan tidak menyematkan (embed) iframe atau pemutar media sosial di dalam halaman. Karena itu, tidak ada cookie dari platform media sosial tersebut yang dimuat saat Anda membuka situs kami. Cookie baru hanya akan muncul jika Anda mengklik tautan tersebut dan masuk ke situs platform terkait.

---

## Manajemen Cookie & Preferensi Pengguna

Karena situs ini **tidak menggunakan cookie pelacakan dan tidak memuat layanan analitik pihak ketiga**, **kami saat ini tidak menyediakan banner konsen cookie tersendiri** di dalam situs. Satu-satunya data yang disimpan di perangkat Anda adalah preferensi bahasa (`localStorage` kunci `lang`), yang bersifat fungsional dan tidak keluar dari perangkat Anda.

Anda tetap dapat mengelola atau menghapus penyimpanan lokal kapan saja melalui peramban:

- **Google Chrome / Microsoft Edge:** Setelan → Privasi dan keamanan → Cookie dan data situs lainnya → Lihat semua data situs → Cari `discoverevav.id` → Hapus.
- **Mozilla Firefox:** Setelan → Privasi & Keamanan → Cookie dan Data Situs → Kelola Data → Cari `discoverevav.id` → Hapus.
- **Safari:** Preferensi → Privasi → Kelola Data Situs Web → Cari `discoverevav.id` → Hapus.

Anda juga dapat menonaktifkan JavaScript atau menggunakan mode "Do Not Track" / pemblokir pelacakan di peramban Anda. Perlu diperhatikan bahwa menonaktifkan JavaScript akan membuat peta interaktif (MapLibre) dan beberapa interaksi tidak berfungsi sebagaimana mestinya.

Untuk menghapus preferensi bahasa saja tanpa memengaruhi lainnya, cukup haus (clear) data situs `discoverevav.id` melalui langkah di atas.

---

## Pembaruan Kebijakan

Kami dapat memperbarui Kebijakan Cookie ini sewaktu-waktu apabila terjadi perubahan teknologi atau layanan pihak ketiga yang kami gunakan. Versi terbaru akan selalu ditandai dengan tanggal berlaku di bagian atas dokumen. Apabila di kemudian hari kami menambahkan layanan analitik atau cookie pelacakan, kami akan memperbarui dokumen ini dan, bila diperlukan, menyediakan mekanisme persetujuan yang sesuai.

---

## Kontak

Jika Anda memiliki pertanyaan mengenai kebijakan cookie atau penanganan data di situs ini, silakan hubungi:

**privasi@discoverevav.id**

---

*Tanggal dokumen: 19 Juli 2026*
