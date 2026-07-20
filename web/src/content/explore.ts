// Data terpusat spot wisata alam Kepulauan Kei untuk Bagian V "Wisata Alam"
// di halaman /explore. Tidak di-hardcode di komponen (sentralisasi §4.10).
//
// Koordinat (lat, lng) — sumbernya didokumentasikan per spot:
//  - bair, ngurbloat, hawang, ngurtavur, tanimbar_kei:
//    diambil dari web/src/components/JourneyMapSection.tsx (koordinat resmi peta
//    JourneyMapSection — sudah terverifikasi untuk Kepulauan Kei).
//  - ohoililir (Pantai Ohoililir / Pasir Panjang): perkiraan berdasar riset web
//    (Desa Ohoililir, Kei Kecil, dekat Pantai Ngurbloat) — ~ -5.6590, 132.6420.
//  - dullah (Pulau Dullah): pulley di selat antara Tual & Kei Kecil — ~ -5.6330, 132.7400.
//  - ohoilim (Goa Ohoilim / Ohoiluk, Kei Besar): riset web WWF "Ohoi Lerohoilim"
//    pesisir barat Pulau Kei Besar — ~ -5.9300, 132.4300.
//  - masbait (Bukit Masbait): bukit di Kei Kecil dekat Langgur — ~ -5.6150, 132.6200.
//  - ngiarvarat (Pantai Ngiarvarat, Ohoidertawun): lokasi Festival Meti Kei
//    (Antara News 2022) — ~ -5.7000, 132.6200.
//
// mapsUrl menggunakan URL pencarian Google Maps tanpa API key:
//   https://www.google.com/maps/search/?api=1&query=<lat>,<lng>

export type KategoriAlam =
  | "Pantai"
  | "Pulau"
  | "Snorkeling & Dive"
  | "Gua"
  | "Satwa"
  | "Viewpoint";

export interface SpotAlam {
  id: string;
  nama: string;
  kategori: KategoriAlam;
  deskripsi: string;
  gambar: string;
  alt: string;
  lat: number;
  lng: number;
  mapsUrl: string;
}

const buildMapsUrl = (lat: number, lng: number): string =>
  `https://www.google.com/maps/search/?api=1&query=${lat},${lng}`;

const rawSpots: Omit<SpotAlam, "mapsUrl">[] = [
  {
    id: "ngurbloat",
    nama: "Pantai Ngurbloat",
    kategori: "Pantai",
    deskripsi:
      "Hamparan pasir putih sehalus tepung sepanjang 3–5 km, pernah dinobatkan National Geographic sebagai pantai berpasir terhalus di Asia. Air toska jernih menemani senja yang dramatis.",
    gambar: "/images/eksplorasi/kei_ngurbloat.png",
    alt: "Pantai Ngurbloat — pasir terhalus di dunia, Kepulauan Kei",
    lat: -5.6625,
    lng: 132.6362,
  },
  {
    id: "ngurtavur",
    nama: "Pantai Ngurtavur",
    kategori: "Snorkeling & Dive",
    deskripsi:
      "Pasir timbul membelah samudera sejauh 2 km, membentuk jalur pasir putih di tengah laut jernih. Habitat migrasi burung Pelikan Australia dan surga snorkeling karang.",
    gambar: "/images/eksplorasi/kei_ngurtavur.png",
    alt: "Pasir Timbul Ngurtavur — jalur pasir putih membelah laut biru",
    lat: -5.7483,
    lng: 132.551,
  },
  {
    id: "hawang",
    nama: "Goa Hawang",
    kategori: "Gua",
    deskripsi:
      "Kolam biru kristal di dalam goa karst alami, mata air tawar jernih yang terhubung dengan laut bawah tanah. Legenda batu kutukan mengiringi kemurnian airnya.",
    gambar: "/images/eksplorasi/kei_hawang.png",
    alt: "Goa Hawang — kolam biru mata air suci di dalam goa karst Kei",
    lat: -5.7197,
    lng: 132.6781,
  },
  {
    id: "bair",
    nama: "Pulau Bair",
    kategori: "Pulau",
    deskripsi:
      "Raja Ampat-nya Maluku Tenggara. Tebing karang menjulang tinggi membentuk lorong air sebening kaca, dengan laguna tersembunyi untuk berenang dan kayak.",
    gambar: "/images/eksplorasi/kei_bair.png",
    alt: "Pulau Bair — tebing karang dan lorong air jernih di Kepulauan Kei",
    lat: -5.5891,
    lng: 132.6565,
  },
  {
    id: "ohoililir",
    nama: "Pantai Ohoililir",
    kategori: "Pantai",
    deskripsi:
      "Gugusan Pantai Pasir Panjang saat surut membentang luas, dengan kelapa rimbun dan laut landai yang tenang. Spot memancing dan berenang keluarga yang masih asri.",
    gambar: "/images/eksplorasi/kei_beach.png",
    alt: "Gugusan Pantai Pasir Panjang Ohoililir saat surut, Kepulauan Kei",
    lat: -5.659,
    lng: 132.642,
  },
  {
    id: "kelapa-miring",
    nama: "Pantai Kelapa Miring",
    kategori: "Pantai",
    deskripsi:
      "Dikenal pula sebagai Pantai Ngur Vat Namsir di Ohoi Wab, ciri khasnya adalah deretan pohon kelapa yang tumbuh miring menyeruak ke laut di atas pasir putih selembut tepung dan air biru yang jernih. Surga tersembunyi yang dijaga warga lewat Festival Budaya Ohoi Wab setiap Maret.",
    gambar: "/images/eksplorasi/pantai-kelapa-miring.jpg",
    alt: "Pantai Kelapa Miring (Ngur Vat Namsir) Ohoi Wab dengan pohon kelapa miring di Kei Kecil",
    lat: -5.712,
    lng: 132.674,
  },
  {
    id: "dullah",
    nama: "Pulau Dullah",
    kategori: "Pulau",
    deskripsi:
      "Pulau di selat antara Tual dan Kei Kecil, pintu gerbang bahari dengan hutan bakau dan spot memancing tradisional. Jembatan timbang menawarkan panorama selat yang luas.",
    gambar: "/images/eksplorasi/kei_resort.png",
    alt: "Pulau Dullah — pulau di selat Tual-Kei Kecil, Kepulauan Kei",
    lat: -5.633,
    lng: 132.74,
  },
  {
    id: "ngiarvarat",
    nama: "Pantai Ngiarvarat",
    kategori: "Pantai",
    deskripsi:
      "Pantai di Ohoidertawun yang menjadi pusat kegiatan Festival Pesona Meti Kei. Saat surut ekstrem, hamparan pasir dan air dangkal terbuka untuk Wer Warat.",
    gambar: "/images/eksplorasi/snorkeling-ngurtavur-zanzztoy.jpg",
    alt: "Pantai Ngiarvarat Ohoidertawun — pusat Festival Meti Kei saat surut",
    lat: -5.7,
    lng: 132.62,
  },
  {
    id: "masbait",
    nama: "Bukit Masbait",
    kategori: "Viewpoint",
    deskripsi:
      "Bukit di Kei Kecil yang menyajikan viewpoint menatap gugusan pulau dan laut Banda dari ketinggian. Tempat terbaik menangkap matahari terbit di Tanah Evav.",
    gambar: "/images/eksplorasi/spot-eka-bagus-2-kkn-ugm.jpg",
    alt: "Bukit Masbait — viewpoint menatap gugusan pulau Kei dari ketinggian",
    lat: -5.615,
    lng: 132.62,
  },
  {
    id: "ohoilim",
    nama: "Goa Ohoilim",
    kategori: "Gua",
    deskripsi:
      "Goa alam di pesisir Pulau Kei Besar (Ohoi Lerohoilim), menyimpan misteri sasi pasir dan pantai tersembunyi. Kawasan ekowisata baru yang masih perawan.",
    gambar: "/images/eksplorasi/goa-hawang.jpg",
    alt: "Goa Ohoilim Ohoiluk — goa alam di pesisir Pulau Kei Besar",
    lat: -5.93,
    lng: 132.43,
  },
  {
    id: "tanimbar_kei",
    nama: "Tanimbar Kei",
    kategori: "Pulau",
    deskripsi:
      "Desa adat kuno yang terisolasi di Kei Kecil Barat, menyimpan rumah adat asli dan altar batu suci. Jantung budaya leluhur yang menjaga hukum Larvul Ngabal.",
    gambar: "/images/budaya/suku-tanimbar-tropenmuseum.jpg",
    alt: "Tanimbar Kei — desa adat kuno jantung budaya leluhur Kepulauan Kei",
    lat: -5.9922,
    lng: 132.3275,
  },
];

export const spotAlam: SpotAlam[] = rawSpots.map((spot) => ({
  ...spot,
  mapsUrl: buildMapsUrl(spot.lat, spot.lng),
}));

export const kategoriAlam: ("Semua" | KategoriAlam)[] = [
  "Semua",
  "Pantai",
  "Pulau",
  "Snorkeling & Dive",
  "Gua",
  "Satwa",
  "Viewpoint",
];
