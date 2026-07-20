// Data terpusat satwa khas/typical Kepulauan Kei untuk Bagian "Satwa Endemik Kei"
// di halaman /explore. Tidak di-hardcode di komponen (sentralisasi §4.10).
//
// SUMBER RISet (web search, 2026-07-18):
//  - Pelikan Australia (Pelecanus conspicillatus): Liputan6 (2023), Kompas (2020),
//    Antara (2022), TravelAgent — bermigrasi & singgah di Pasir Timbul Ngurtavur,
//    Pulau Woha, Kepulauan Kei, saat meti (surut ekstrem).
//  - Kuskus / Phalanger spp.: BRIN (2023), Detik Travel — satwa endemik
//    Indonesia Timur/Maluku, hewan nokturnal arboreal (kuskus mata biru Phalanger
//    matabiruensis endemik Maluku).
//  - Penyu / Cheloniidae: Mongabay (2019), WWF Indonesia — banyak ditemukan di
//    Kepulauan Kei pada musim tertentu; isu konservasi sasi laut.
//  - Lumba-lumba / dolphin: ekowisata perairan Kepulauan Kei (Laut Banda).
//  - Ikan karang & terumbu: ekosistem terumbu koral Kepulauan Kei (Ngurtavur, Bair).
//  - Burung endemik Kai (Kai Coucal / Centropus spilopterus; Kai White-eye
//    Zosterops grayi): Wikipedia, eBird, Avibase, Manoa Kei — ~10 spesies endemik
//    Kepulauan Kai, termasuk sub-spesies endemik.
//
// Gambar: asset lokal di web/public/images/satwa/ (tidak ada remote host baru).

export interface SatwaEndemik {
  id: string;
  nama: string;
  namaLatin?: string;
  status?: string;
  habitat: string;
  lokasi: string;
  deskripsi: string;
  gambar: string;
  alt: string;
}

export const satwaEndemik: SatwaEndemik[] = [
  {
    id: "pelikan-australia",
    nama: "Pelikan Australia",
    namaLatin: "Pelecanus conspicillatus",
    status: "Migran musiman",
    habitat: "Pasir Timbul Ngurtavur saat surut (meti)",
    lokasi: "Pasir Timbul Ngurtavur, Pulau Woha, Kei Kecil",
    deskripsi:
      "Setiap meti, kawanan pelikan Australia datang dari benua selatan dan singgah di Pasir Timbul Ngurtavur, menjadikan hamparan pasir putih di tengah laut sebagai rumah singgahnya yang tenang.",
    gambar: "/images/eksplorasi/pelikan_migration_australia.png",
    alt: "Kawanan burung pelikan Australia terbang bermigrasi di atas perairan jernih Pasir Timbul Ngurtavur, Kepulauan Kei",
  },
  {
    id: "kuskus",
    nama: "Kuskus",
    namaLatin: "Phalanger spp.",
    status: "Endemik",
    habitat: "Hutan pantai & kebun kelapa Kei",
    lokasi: "Hutan pantai & kebun kelapa, Pulau Kei Kecil",
    deskripsi:
      "Penghuni pepohonan yang malu-malu ini aktif saat rembulan terbit, merayap pelan di dahan kelapa. Bagi masyarakat Kei, kuskus adalah saudara hutan yang dijaga, bukan sekadar buruan.",
    gambar: "/images/satwa/kei_kuskus.png",
    alt: "Kuskus (phalanger) memanjat dahan pohon kelapa di malam hari, Kepulauan Kei",
  },
  {
    id: "penyu",
    nama: "Penyu Laut",
    namaLatin: "Cheloniidae",
    status: "Lokal & Migran",
    habitat: "Pesisir pasir & terumbu Kei",
    lokasi: "Pantai peneluran Pulau Hoat & perairan Kei Kecil Barat",
    deskripsi:
      "Penyu kembali ke pasir Kei untuk bertelur pada musim tertentu. Laut yang dijaga dengan sasi membuat mereka tetap merasa pulang ke rumah yang aman.",
    gambar: "/images/satwa/kei_seaturtle.png",
    alt: "Penyu laut berenang tenang di perairan jernih Kepulauan Kei",
  },
  {
    id: "lumba-lumba",
    nama: "Lumba-lumba",
    namaLatin: "Delphinidae",
    status: "Lokal",
    habitat: "Perairan Laut Banda Kei",
    lokasi: "Perairan Laut Banda, selat Kei Kecil–Dullah",
    deskripsi:
      "Di selat biru Laut Banda, lumba-lumba kerap menemani perahu nelayan bermain ombak. Kehadiran mereka menjadi tanda laut yang masih sehat dan penuh kehidupan.",
    gambar: "/images/satwa/kei_dolphin.png",
    alt: "Lumba-lumba berenang di perairan Laut Banda Kepulauan Kei",
  },
  {
    id: "ikan-karang",
    nama: "Ikan Karang",
    namaLatin: "Pomacentridae & sp.",
    status: "Lokal",
    habitat: "Terumbu karang Ngurtavur & Pulau Bair",
    lokasi: "Terumbu karang Ngurtavur & Pulau Bair",
    deskripsi:
      "Ribuan ikan berwarna menghuni taman karang Kei yang masih perawan. Mereka adalah jiwa terumbu yang memberi makan dan kehidupan bagi seluruh ekosistem pesisir.",
    gambar: "/images/satwa/kei_coral.png",
    alt: "Kawanan ikan karang berwarna-warni di terumbu karang Kepulauan Kei",
  },
  {
    id: "burung-endemik-kai",
    nama: "Burung Endemik Kai",
    namaLatin: "Centropus spilopterus",
    status: "Endemik",
    habitat: "Hutan pamah & semak Kei Besar–Kei Kecil",
    lokasi: "Hutan pamah Pulau Kai Besar & Kei Kecil",
    deskripsi:
      "Kepulauan Kai memelihara belasan spesies burung yang tak ditemukan di tempat lain, seperti Kai Coucal dan Kai White-eye. Kicauan mereka adalah suara asli hutan Evav.",
    gambar: "/images/satwa/kei_bubut.png",
    alt: "Burung endemik Bubut Kai (Centropus spilopterus) bertengger di ranting pohon hutan Evav",
  },
  {
    id: "kacamata-kei",
    nama: "Kacamata Kei",
    namaLatin: "Zosterops grayi",
    status: "Endemik",
    habitat: "Hutan sekunder & semak",
    lokasi: "Hutan dataran tinggi, Pulau Kai Besar",
    deskripsi:
      "Burung mungil dengan lingkaran kacamata putih khas yang hidup berkelompok. Kicauan melodi mereka yang nyaring dan riang menjadi alunan musik pagi di belantara Kai Besar.",
    gambar: "/images/satwa/kei_kacamata_bird.png",
    alt: "Burung mungil Kacamata Kei (Zosterops grayi) hinggap di dahan kecil",
  },
  {
    id: "kakatua",
    nama: "Kakatua Jambul Kuning",
    namaLatin: "Cacatua sulphurea",
    status: "Dilindungi",
    habitat: "Kanopi hutan primer dataran rendah",
    lokasi: "Hutan rimba, Pulau Kei Besar",
    deskripsi:
      "Burung cerdas berbulu putih salju dengan jambul kuning megah yang dapat ditegakkan. Kehadirannya melambangkan keanggunan eksotis satwa dirgantara tanah Evav.",
    gambar: "/images/satwa/kei_kakatua.png",
    alt: "Kakatua jambul kuning bertengger anggun di atas dahan pohon tropis",
  },
  {
    id: "elang-laut",
    nama: "Elang Laut Dada Putih",
    namaLatin: "Haliaeetus leucogaster",
    status: "Dilindungi",
    habitat: "Pesisir pantai & tebing laut",
    lokasi: "Kawasan Pulau Bair & Tanjung Kei Kecil",
    deskripsi:
      "Penguasa langit bahari Kei dengan bentang sayap kokoh. Terbang melayang tinggi menyisir pantai untuk mencari ikan di perairan jernih, simbol kegagahan adat marga.",
    gambar: "/images/satwa/kei_elang.png",
    alt: "Elang laut dada putih terbang mengepakkan sayap lebar di atas perairan Kei",
  },
  {
    id: "mangrove-kei",
    nama: "Hutan Mangrove",
    namaLatin: "Rhizophora spp.",
    status: "Ekosistem Penjaga",
    habitat: "Zona pasang surut lumpur pesisir",
    lokasi: "Hutan Bakau Ohoi Ruat, Kei Kecil",
    deskripsi:
      "Benteng hijau kokoh yang meredam ombak samudera dan melindungi daratan Evav. Jalinan akar bakau menjadi rumah pembibitan alami kepiting, udang, dan ikan karang muda.",
    gambar: "/images/satwa/kei_mangrove.png",
    alt: "Ekosistem hutan mangrove hijau subur di pesisir pasang surut Kei",
  },
  {
    id: "kangguru-hutan",
    nama: "Kangguru Hutan / Pademelon",
    namaLatin: "Thylogale brunii",
    status: "Dilindungi",
    habitat: "Lantai hutan hujan dataran rendah",
    lokasi: "Hutan belantara Pulau Kei Besar",
    deskripsi:
      "Marsupial kecil khas kepulauan Maluku Tenggara yang lincah bergerak di semak-semak. Keberadaannya membuktikan keunikan fauna transisi Wallacea-Sahul di tanah Evav.",
    gambar: "/images/satwa/kei_kangguru.png",
    alt: "Kangguru hutan (pademelon) berdiri waspada di lantai hutan tropis Kei",
  },
];
