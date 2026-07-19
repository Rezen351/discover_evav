/**
 * Sentralisasi data contoh (mock) untuk panel admin CMS Simfoni Evav.
 * Single Source of Truth — dipakai oleh komponen `src/components/admin/*`
 * dan halaman `src/app/admin/page.tsx`.
 *
 * Data ini berbentuk typed (tanpa `any`) dan statis; dalam implementasi
 * nyata dapat diganti dengan fetch ke Route Handler `/api/admin/*`.
 */

/* ============================================================
   Tipe Data (Typed — no any)
   ============================================================ */

export type AdminMenuKey =
  | "dashboard"
  | "berita"
  | "umkm"
  | "produk"
  | "destinasi"
  | "event"
  | "media"
  | "pengaturan";

export interface AdminMenuItem {
  key: AdminMenuKey;
  label: string;
  /** Key ikon (AdminMenuKey) yang dipetakan ke Heroicons di komponen berdasarkan key. */
  icon: AdminMenuKey;
  href: string;
}

export type ContentStatus = "Draft" | "Published";

export interface AdminStat {
  key: string;
  label: string;
  value: number;
  /** Perubahan persen periode ini (positif/negatif). */
  delta: number;
  icon: "umkm" | "produk" | "berita" | "visitor";
}

export interface UmkmRow {
  id: string;
  nama: string;
  kategori: "Kuliner" | "Kerajinan" | "Oleh-oleh";
  lokasi: string;
  status: ContentStatus;
  updateTerakhir: string;
}

export interface BeritaRow {
  id: string;
  judul: string;
  kategori: "Budaya" | "Event" | "Infrastruktur" | "Pengumuman";
  penulis: string;
  status: ContentStatus;
  tanggal: string;
}

export interface AdminAktivitas {
  id: string;
  tipe: "Berita" | "UMKM" | "Produk" | "Event";
  judul: string;
  meta: string;
  waktu: string;
}

export interface SeriesPoint {
  label: string;
  nilai: number;
}

/* ============================================================
   Data Menu Sidebar
   ============================================================ */

export const adminMenu: AdminMenuItem[] = [
  { key: "dashboard", label: "Dashboard", icon: "dashboard", href: "/admin" },
  { key: "berita", label: "Berita", icon: "berita", href: "/admin/news" },
  { key: "umkm", label: "UMKM", icon: "umkm", href: "/admin/umkm" },
  { key: "produk", label: "Produk", icon: "produk", href: "/admin/products" },
  { key: "destinasi", label: "Destinasi", icon: "destinasi", href: "/admin/destinations" },
  { key: "event", label: "Event", icon: "event", href: "/admin/events" },
  { key: "media", label: "Media", icon: "media", href: "/admin/media" },
  { key: "pengaturan", label: "Pengaturan", icon: "pengaturan", href: "/admin/settings" },
];

/* ============================================================
   Statistik Ringkas
   ============================================================ */

export const adminStats: AdminStat[] = [
  { key: "umkm", label: "Total UMKM", value: 128, delta: 8.4, icon: "umkm" },
  { key: "produk", label: "Total Produk", value: 342, delta: 12.1, icon: "produk" },
  { key: "berita", label: "Berita Terbit", value: 56, delta: 4.0, icon: "berita" },
  { key: "visitor", label: "Visitor Bulan Ini", value: 18420, delta: -2.3, icon: "visitor" },
];

/* ============================================================
   Tabel: UMKM Terbaru
   ============================================================ */

export const umkmTerbaru: UmkmRow[] = [
  { id: "u1", nama: "Rumah Enbal Mbak Yuli", kategori: "Kuliner", lokasi: "Langgur, Kei Kecil", status: "Published", updateTerakhir: "12 Jul 2026" },
  { id: "u2", nama: "Tenun Kei Suster Maria", kategori: "Kerajinan", lokasi: "Tual, Maluku Tenggara", status: "Published", updateTerakhir: "10 Jul 2026" },
  { id: "u3", nama: "Oleh-oleh Khas Bumi Evav", kategori: "Oleh-oleh", lokasi: "Ohoililir, Kei Kecil", status: "Draft", updateTerakhir: "09 Jul 2026" },
  { id: "u4", nama: "Sate Laut Kei Bapak Rof", kategori: "Kuliner", lokasi: "Tual, Maluku Tenggara", status: "Published", updateTerakhir: "07 Jul 2026" },
  { id: "u5", nama: "Anyaman Laut Ohoijang", kategori: "Kerajinan", lokasi: "Ohoijang, Kei Besar", status: "Draft", updateTerakhir: "05 Jul 2026" },
];

/* ============================================================
   Tabel: Berita Terbaru
   ============================================================ */

export const beritaTerbaru: BeritaRow[] = [
  { id: "n1", judul: "Festival Pesona Meti Kei 2026 Siap Digelar", kategori: "Event", penulis: "Redaksi Evav", status: "Published", tanggal: "12 Jul 2026" },
  { id: "n2", judul: "Pelestarian Rumah Adat Tanimbar Kei", kategori: "Budaya", penulis: "S. Renmaur", status: "Published", tanggal: "28 Jun 2026" },
  { id: "n3", judul: "Akses Pelabuhan Tual Makin Lancar", kategori: "Infrastruktur", penulis: "Redaksi Evav", status: "Draft", tanggal: "15 Jun 2026" },
  { id: "n4", judul: "Pengumuman Jadwal Kapal Lebaran", kategori: "Pengumuman", penulis: "Admin Evav", status: "Published", tanggal: "10 Jun 2026" },
  { id: "n5", judul: "Kuliner Khas Evav Naik Kelas", kategori: "Budaya", penulis: "M. Rebelak", status: "Draft", tanggal: "02 Jun 2026" },
];

/* ============================================================
   Aktivitas Terbaru (feed)
   ============================================================ */

export const aktivitasTerbaru: AdminAktivitas[] = [
  { id: "a1", tipe: "Berita", judul: "Festival Pesona Meti Kei 2026", meta: "Dipublikasikan oleh Redaksi Evav", waktu: "2 jam lalu" },
  { id: "a2", tipe: "UMKM", judul: "Tenun Kei Suster Maria", meta: "Diperbarui oleh Editor", waktu: "5 jam lalu" },
  { id: "a3", tipe: "Produk", judul: "Set Oleh-oleh Laut Kei", meta: "Ditambahkan 12 produk baru", waktu: "1 hari lalu" },
  { id: "a4", tipe: "Event", judul: "Meti Kei 2026", meta: "Jadwal disetujui", waktu: "2 hari lalu" },
];

/* ============================================================
   Seri Data Grafik (visitor 7 hari terakhir)
   Nilai relatif untuk bar chart CSS murni (tanpa library).
   ============================================================ */

export const visitorMingguan: SeriesPoint[] = [
  { label: "Sen", nilai: 2100 },
  { label: "Sel", nilai: 2480 },
  { label: "Rab", nilai: 1980 },
  { label: "Kam", nilai: 3120 },
  { label: "Jum", nilai: 3650 },
  { label: "Sab", nilai: 2840 },
  { label: "Min", nilai: 2250 },
];

/* ============================================================
   Tabel: Berita (semua)
   ============================================================ */

export const beritaList: BeritaRow[] = [
  ...beritaTerbaru,
  { id: "n6", judul: "Revitalisasi Pasar Tradisional Langgur", kategori: "Infrastruktur", penulis: "Redaksi Evav", status: "Published", tanggal: "28 Mei 2026" },
  { id: "n7", judul: "Kisah Pengrajin Tenun Kei", kategori: "Budaya", penulis: "S. Renmaur", status: "Published", tanggal: "20 Mei 2026" },
  { id: "n8", judul: "Kalender Event Pariwisata 2026", kategori: "Pengumuman", penulis: "Admin Evav", status: "Draft", tanggal: "12 Mei 2026" },
];

/* ============================================================
   Tabel: UMKM (semua)
   ============================================================ */

export const umkmList: UmkmRow[] = [
  ...umkmTerbaru,
  { id: "u6", nama: "Kopi Kenangan Kei", kategori: "Kuliner", lokasi: "Tual, Maluku Tenggara", status: "Published", updateTerakhir: "03 Jul 2026" },
  { id: "u7", nama: "Souvenir Mutiara Evav", kategori: "Oleh-oleh", lokasi: "Dullah, Kei Kecil", status: "Published", updateTerakhir: "01 Jul 2026" },
  { id: "u8", nama: "Anyaman Nipah Ohoidertawun", kategori: "Kerajinan", lokasi: "Ohoidertawun, Kei Besar", status: "Draft", updateTerakhir: "28 Jun 2026" },
];

/* ============================================================
   Produk (UMKM)
   ============================================================ */

export interface ProdukRow {
  id: string;
  nama: string;
  umkm: string;
  harga: string;
  kategori: "Kuliner" | "Kerajinan" | "Oleh-oleh";
  status: ContentStatus;
  stok: number;
}

export const produkList: ProdukRow[] = [
  { id: "p1", nama: "Set Oleh-oleh Laut Kei", umkm: "Oleh-oleh Khas Bumi Evav", harga: "Rp 150.000", kategori: "Oleh-oleh", status: "Published", stok: 42 },
  { id: "p2", nama: "Tenun Ikat Motif Laut", umkm: "Tenun Kei Suster Maria", harga: "Rp 750.000", kategori: "Kerajinan", status: "Published", stok: 12 },
  { id: "p3", nama: "Sate Laut Kemasan 5 pcs", umkm: "Sate Laut Kei Bapak Rof", harga: "Rp 65.000", kategori: "Kuliner", status: "Published", stok: 80 },
  { id: "p4", nama: "Anyaman Laut Hiasan Dinding", umkm: "Anyaman Laut Ohoijang", harga: "Rp 220.000", kategori: "Kerajinan", status: "Draft", stok: 6 },
  { id: "p5", nama: "Madu Hutan Kei 250 ml", umkm: "Kopi Kenangan Kei", harga: "Rp 90.000", kategori: "Kuliner", status: "Draft", stok: 0 },
  { id: "p6", nama: "Kalung Mutiara Evav", umkm: "Souvenir Mutiara Evav", harga: "Rp 480.000", kategori: "Oleh-oleh", status: "Published", stok: 18 },
];

/* ============================================================
   Destinasi
   ============================================================ */

export interface DestinasiRow {
  id: string;
  nama: string;
  kategori: "Pantai" | "Budaya" | "Alam" | "Sejarah";
  lokasi: string;
  status: ContentStatus;
  rating: number;
}

export const destinasiList: DestinasiRow[] = [
  { id: "d1", nama: "Pantai Ngurbloat", kategori: "Pantai", lokasi: "Langsat, Kei Kecil", status: "Published", rating: 4.8 },
  { id: "d2", nama: "Pulau Kei Besar", kategori: "Alam", lokasi: "Kei Besar", status: "Published", rating: 4.7 },
  { id: "d3", nama: "Rumah Adat Tanimbar Kei", kategori: "Budaya", lokasi: "Tanimbar Kei", status: "Published", rating: 4.6 },
  { id: "d4", nama: "Guiding Batu Sammalar", kategori: "Sejarah", lokasi: "Ohoililir, Kei Kecil", status: "Draft", rating: 4.4 },
  { id: "d5", nama: "Pantai Pasir Panjang", kategori: "Pantai", lokasi: "Ngilngof, Kei Kecil", status: "Published", rating: 4.9 },
  { id: "d6", nama: "Air Terjun Hawang", kategori: "Alam", lokasi: "Ohoililir, Kei Kecil", status: "Draft", rating: 4.5 },
];

/* ============================================================
   Event
   ============================================================ */

export interface EventRow {
  id: string;
  nama: string;
  kategori: "Festival" | "Budaya" | "Olahraga" | "Pameran";
  lokasi: string;
  status: ContentStatus;
  tanggal: string;
}

export const eventList: EventRow[] = [
  { id: "e1", nama: "Festival Pesona Meti Kei 2026", kategori: "Festival", lokasi: "Pantai Ngurbloat", status: "Published", tanggal: "21 Agt 2026" },
  { id: "e2", nama: "Pameran Tenun Kei", kategori: "Pameran", lokasi: "Tual", status: "Published", tanggal: "05 Sep 2026" },
  { id: "e3", nama: "Lomba Dayung Perahu Tradisional", kategori: "Olahraga", lokasi: "Pelabuhan Tual", status: "Draft", tanggal: "12 Okt 2026" },
  { id: "e4", nama: "Pertunjukan Tari Cakalele", kategori: "Budaya", lokasi: "Langsat", status: "Published", tanggal: "18 Nov 2026" },
  { id: "e5", nama: "Bazar Kuliner Evav", kategori: "Festival", lokasi: "Alun-alun Tual", status: "Draft", tanggal: "24 Des 2026" },
];

/* ============================================================
   Media (galeri)
   ============================================================ */

export interface MediaRow {
  id: string;
  nama: string;
  tipe: "Foto" | "Video";
  kategori: string;
  ukuran: string;
  diunggah: string;
}

export const mediaList: MediaRow[] = [
  { id: "m1", nama: "Ngurbloat-sunset.jpg", tipe: "Foto", kategori: "Pantai", ukuran: "2.4 MB", diunggah: "12 Jul 2026" },
  { id: "m2", nama: "Meti-Kei-2025.mp4", tipe: "Video", kategori: "Festival", ukuran: "48 MB", diunggah: "10 Jul 2026" },
  { id: "m3", nama: "Tenun-Suster-Maria.jpg", tipe: "Foto", kategori: "Budaya", ukuran: "1.8 MB", diunggah: "08 Jul 2026" },
  { id: "m4", nama: "Pasir-Panjang-aerial.jpg", tipe: "Foto", kategori: "Pantai", ukuran: "3.1 MB", diunggah: "05 Jul 2026" },
  { id: "m5", nama: "Tari-Cakalele.mp4", tipe: "Video", kategori: "Budaya", ukuran: "62 MB", diunggah: "02 Jul 2026" },
  { id: "m6", nama: "Kuliner-Enbal.jpg", tipe: "Foto", kategori: "Kuliner", ukuran: "1.5 MB", diunggah: "28 Jun 2026" },
];

/* ============================================================
   Pengaturan (daftar preferensi)
   ============================================================ */

export interface PengaturanItem {
  id: string;
  grup: string;
  nama: string;
  deskripsi: string;
  nilai: string;
}

export const pengaturanList: PengaturanItem[] = [
  { id: "s1", grup: "Umum", nama: "Nama Situs", deskripsi: "Judul yang tampil di halaman publik.", nilai: "Simfoni Evav" },
  { id: "s2", grup: "Umum", nama: "Bahasa Default", deskripsi: "Bahasa antarmuka utama.", nilai: "Bahasa Indonesia" },
  { id: "s3", grup: "Konten", nama: "Moderasi Berita", deskripsi: "Wajibkan persetujuan editor sebelum terbit.", nilai: "Aktif" },
  { id: "s4", grup: "Konten", nama: "Ukuran Maksimal Unggah", deskripsi: "Batas ukuran berkas media.", nilai: "10 MB" },
  { id: "s5", grup: "Notifikasi", nama: "Email Redaksi", deskripsi: "Alamat penerima laporan aktivitas.", nilai: "redaksi@discover-evav.id" },
  { id: "s6", grup: "Notifikasi", nama: "Peringatan Stok", deskripsi: "Notifikasi saat stok produk habis.", nilai: "Aktif" },
];
