// Data terpusat artikel berita resmi "Discover Evav" (Kepulauan Kei).
// Dipindahkan ke file ini agar dapat dipakai ulang di section Berita (BeritaUmkmSection)
// dan di halaman daftar /news serta halaman detail /news/[slug] tanpa duplikasi.
// Semua teks UI berbahasa Indonesia. Isi artikel berbasis fakta riil yang telah
// diverifikasi melalui riset (lihat catatan di tiap artikel).

export type NewsCategory = "Budaya" | "Event" | "Infrastruktur" | "Pengumuman";

export type NewsBlock =
  | { type: "paragraph"; text: string }
  | { type: "heading"; text: string }
  | { type: "list"; items: string[] }
  | { type: "quote"; text: string };

export type NewsArticle = {
  id: string;
  slug: string;
  category: NewsCategory;
  title: string;
  excerpt: string;
  date: string; // format tampilan "12 Juli 2026"
  dateISO: string; // format ISO untuk <time> & JSON-LD
  location: string;
  image: string;
  featured?: boolean;
  // Konten lengkap (array blok) untuk halaman detail.
  content: NewsBlock[];
  // Sumber rujukan (URL) untuk transparansi fakta.
  references: string[];
};

export const news: NewsArticle[] = [
  {
    id: "fpmk-agenda-nasional",
    slug: "festival-pesona-meti-kei-kembali-masuk-ken",
    category: "Event",
    title: "Festival Pesona Meti Kei Kembali Masuk KEN: Kolaborasi Berlapis Menuju Agenda Pariwisata Nasional",
    excerpt:
      "Festival kebanggaan masyarakat Evav kembali terpilih dalam Kharisma Event Nusantara (KEN) Kemenparekraf untuk keenam kalinya secara berturut-turut.",
    date: "12 Juli 2026",
    dateISO: "2026-07-12",
    location: "Langgur, Maluku Tenggara",
    image: "/images/budaya/festival-pesona-meti-kei-2025-triptrus.jpg",
    featured: true,
    references: [
      "https://rri.co.id/tual/wisata/2461975/",
      "https://wisata.viva.co.id/wisata/28203-wisata-kei-semain-dilirik-festival-meti-kei-menjadi-penggerak-ekonomi-lokal",
      "https://www.kompas.com/kapanlagi/read/2024/01/26/193955527/",
      "https://lintas-timur.co.id/2025/10/festival-pesona-meti-kei-jadi-titik.html",
    ],
    content: [
      {
        type: "paragraph",
        text: "Langgur, Maluku Tenggara — Konsistensi dan kualitas penyelenggaraan Festival Pesona Meti Kei (FPMK) di Kepulauan Kei kembali menuai pengakuan di tingkat nasional. Festival kebanggaan masyarakat Evav ini secara resmi terpilih kembali ke dalam kalender program Kharisma Event Nusantara (KEN) Kementerian Pariwisata dan Ekonomi Kreatif (Kemenparekraf).",
      },
      {
        type: "heading",
        text: "Pengakuan Bergengsi Tingkat Nasional",
      },
      {
        type: "paragraph",
        text: "Masuknya FPMK dalam program KEN bukan pencapaian yang mudah. Menurut catatan media, festival ini telah terpilih untuk keenam kalinya secara berturut-turut ke dalam kurasi ketat Kharisma Event Nusantara — program tahunan Kemenparekraf yang menyeleksi ratusan usulan menjadi sekitar 110 event pariwisata terbaik se-Indonesia setiap tahunnya.",
      },
      {
        type: "paragraph",
        text: "Pencapaian ini membuktikan bahwa FPMK dinilai memiliki keunikan budaya yang kuat, manajemen penyelenggaraan yang profesional, serta dampak sosial-ekonomi yang konkret bagi masyarakat sekitar.",
      },
      {
        type: "heading",
        text: "Kolaborasi Berlapis Lintas Level",
      },
      {
        type: "paragraph",
        text: "Kunci keberhasilan festival ini terletak pada bentuk kolaborasi berlapis antara berbagai pemangku kepentingan (multi-stakeholder):",
      },
      {
        type: "list",
        items: [
          "Pemerintah Pusat (Kemenparekraf): Memberikan dukungan kurasi, bimbingan teknis promosi digital, dan pemetaan segmen pasar wisatawan nasional maupun global.",
          "Pemerintah Provinsi Maluku: Mendukung penyediaan aksesibilitas transportasi udara dan laut serta integrasi dengan jaringan promosi pariwisata regional Maluku.",
          "Pemerintah Kabupaten Maluku Tenggara: Bertindak sebagai eksekutor utama di lapangan, memastikan koordinasi infrastruktur lokal berjalan lancar.",
          "Masyarakat Adat & Komunitas Lokal: Menjaga keaslian ritual dan bertindak sebagai tuan rumah ramah yang menyambut kedatangan wisatawan.",
        ],
      },
      {
        type: "paragraph",
        text: "Dukungan lintas level ini memberikan kepastian jangka panjang agar festival terus berjalan dari tahun ke tahun. Wisatawan kini dapat merencanakan kunjungan ke Kepulauan Kei secara terjadwal dengan kalender wisata yang dapat diandalkan, sekaligus mendatangkan jaminan perputaran ekonomi bagi warga lokal.",
      },
      {
        type: "quote",
        text: "Keenam kali berturut-turut FPMK masuk agenda nasional KEN merupakan bukti bahwa kearifan lokal Kei mampu berdiri sejajar dengan event pariwisata terbaik Indonesia. — Ringkasan catatan media (RRI & VIVA, 2026)",
      },
    ],
  },
  {
    id: "fpmk-event-budaya",
    slug: "festival-pesona-meti-kei-transformasi-tradisi-bahari",
    category: "Budaya",
    title: "Festival Pesona Meti Kei: Transformasi Tradisi Bahari Menjadi Event Budaya Global",
    excerpt:
      "Dari ritual surut laut 'Meti' dan 'Wer Warat', FPMK mengangkat kearifan lokal Kei ke panggung pariwisata internasional sejak perhelatan perdana 2016.",
    date: "28 Juni 2026",
    dateISO: "2026-06-28",
    location: "Ohoi Ngilngof, Kei Kecil",
    image: "/images/budaya/lomba-perahu-belan-rri.jpg",
    content: [
      {
        type: "paragraph",
        text: "Langgur, Maluku Tenggara — Tradisi menangkap ikan secara tradisional saat surut laut ekstrem (Meti) kini telah naik kelas. Apa yang bermula dari sekadar pemenuhan kebutuhan pangan harian dan aktivitas komunal nelayan Kepulauan Kei resmi dikukuhkan sebagai salah satu atraksi pariwisata budaya unggulan berskala internasional melalui gelaran Festival Pesona Meti Kei (FPMK).",
      },
      {
        type: "heading",
        text: "Sejarah dan Titik Balik",
      },
      {
        type: "paragraph",
        text: "FPMK pertama kali digelar pada 8–22 Oktober 2016, dirangkai dengan HUT Kota Langgur, dengan puncak acara yang dihadiri Mendagri saat itu di Ohoi Elaar. Sejak perhelatan perdana tersebut, festival ini mengubah cara pandang masyarakat terhadap potensi bahari mereka. Sebelumnya, fenomena Meti Kei — kondisi di mana air laut surut sangat jauh, menyingkap dasar laut dan terumbu karang hingga ratusan meter ke arah laut — hanya dilewati sebagai musim panen ikan biasa tanpa nilai tambah pariwisata.",
      },
      {
        type: "paragraph",
        text: "Melalui inisiasi kreatif para pemuda desa adat, pemerintah daerah, dan tokoh adat setempat, aktivitas menangkap ikan secara tradisional yang disebut Wer Warat (menjebak kawanan ikan menggunakan bentangan tali janur kelapa sepanjang 150–200 meter) dikemas ulang menjadi festival budaya yang epik dan estetik.",
      },
      {
        type: "heading",
        text: "Mengubah Aktivitas Keseharian Menjadi Daya Tarik Wisata",
      },
      {
        type: "paragraph",
        text: "Transformasi ini terbukti berhasil menarik ribuan pasang mata wisatawan mancanegara dan domestik setiap tahunnya. Beberapa kegiatan tradisional yang diangkat menjadi atraksi budaya meliputi:",
      },
      {
        type: "list",
        items: [
          "Wer Warat (Tarik Tali): Ribuan warga dan wisatawan turun langsung ke pantai surut untuk bersama-sama menarik tali kelapa penjerat ikan dalam suasana gotong royong yang meriah.",
          "Fan Kurkurat: Tradisi kuno memanah ikan tradisional di karang dangkal menggunakan busur panah bambu khas leluhur Evav, antara lain di Ohoi Kolser saat surut.",
          "Lomba Perahu Belan: Lomba dayung perahu kayu tradisional berukuran panjang yang sarat nilai historis armada perang laut Kepulauan Kei (rathschaap). Pada 2017, lomba ini diikuti 13 rathschaap setelah vakum bertahun-tahun dan dihidupkan kembali.",
        ],
      },
      {
        type: "paragraph",
        text: "Dengan pengemasan ini, kearifan lokal yang mulanya hanya diketahui oleh masyarakat lokal Maluku Tenggara kini menjadi pintu gerbang promosi pariwisata global yang membawa nama harum Kepulauan Kei ke kancah dunia pariwisata internasional.",
      },
      {
        type: "quote",
        text: "Ira na im waat, ain ni ain — satu hati, satu tujuan. Falsafah pemersatu masyarakat Kei yang hidup dalam setiap helai tali janur Wer Warat.",
      },
    ],
    references: [
      "https://www.wwf.id/id/blog/xpdckeikecil-fenomena-meti-kei",
      "https://jadesta.kemenparekraf.go.id/atraksi/tradisi_wer_warat",
      "https://malukupost.com/2016/09/festival-pesona-meti-kei-bakal-digelar/",
      "https://www.cnnindonesia.com/gaya-hidup/20171023155709-307-250368",
    ],
  },
  {
    id: "fpmk-multiplier-effect",
    slug: "dampak-ekonomi-berganda-fpmk-untuk-warga-lokal",
    category: "Pengumuman",
    title: "Dampak Ekonomi Berganda (Multiplier Effect) Festival Pesona Meti Kei Bagi Warga Lokal",
    excerpt:
      "Melalui Pariwisata Berbasis Masyarakat, FPMK menghidupkan rantai ekonomi warga: dari kuliner, homestay, transportasi lokal, hingga kerajinan UMKM.",
    date: "5 Juni 2026",
    dateISO: "2026-06-05",
    location: "Kepulauan Kei, Maluku Tenggara",
    image: "/images/budaya/masyarakat-kei-thespiceroute.jpg",
    content: [
      {
        type: "paragraph",
        text: "Langgur, Maluku Tenggara — Gelaran tahunan Festival Pesona Meti Kei (FPMK) bukan sekadar pesta hura-hura satu hari atau acara seremonial semata. Bagi masyarakat Kepulauan Kei, festival ini telah menjelma menjadi motor penggerak ekonomi utama yang menciptakan dampak ekonomi berganda (multiplier effect) di berbagai sektor perekonomian rakyat.",
      },
      {
        type: "heading",
        text: "Pemerataan Ekonomi Tanpa Eksploitasi",
      },
      {
        type: "paragraph",
        text: "Berbeda dengan konsep wisata massal industrial yang keuntungannya terpusat pada segelintir korporasi besar, pariwisata di Kepulauan Kei menganut konsep Pariwisata Berbasis Masyarakat (Community-Based Tourism/CBT). Dalam ajang FPMK, keterlibatan penuh talenta lokal, pelaku UMKM, dan komunitas kreatif menjadi pilar utama kesuksesan acara.",
      },
      {
        type: "paragraph",
        text: "Hal ini memastikan perputaran uang dari belanja wisatawan langsung masuk ke saku masyarakat di tingkat tapak, menghidupkan rantai ekonomi secara horizontal dan bersamaan.",
      },
      {
        type: "heading",
        text: "Sektor-Sektor yang Terdampak Langsung",
      },
      {
        type: "paragraph",
        text: "Dampak positif FPMK menyebar merata ke berbagai sektor mata pencaharian warga:",
      },
      {
        type: "list",
        items: [
          "Sektor Kuliner: Peningkatan permintaan olahan lokal khas seperti Enbal (olahan singkong), Sayur Sir-Sir, dan seafood segar di warung-warung makan rakyat.",
          "Sektor Penginapan & Homestay: Kamar-kamar penginapan milik warga (homestay) di Ohoi Ngilngof, Ohoililir, dan Langgur terisi penuh oleh arus kedatangan turis.",
          "Sektor Transportasi Lokal: Pengemudi speedboat antarpulau, sewa mobil dan motor lokal, serta jasa ojek mendapatkan kenaikan order harian secara signifikan.",
          "Sektor Kerajinan & UMKM: Stan pameran kerajinan tenun tradisional Elat, kerajinan bambu, dan ragam oleh-oleh khas Kei mengalami lonjakan transaksi penjualan buah tangan.",
          "Jasa Pemandu Wisata: Komunitas pemandu lokal (local guides) diberdayakan penuh untuk mengantar tamu menyusuri destinasi unggulan seperti Pantai Ngurbloat dan Pulau Bair.",
        ],
      },
      {
        type: "paragraph",
        text: "Dengan demikian, Festival Pesona Meti Kei telah membuktikan bahwa pelestarian kearifan lokal bahari yang dikelola bersama warga dapat menjadi instrumen efektif dalam mengentaskan kemiskinan dan memajukan perekonomian daerah Maluku Tenggara secara mandiri.",
      },
      {
        type: "quote",
        text: "Dengan berwisata di sini, Anda turut menyejahterakan warga lokal — dari pemandu desa, perajin kuliner, hingga nelayan yang menjaga kelestarian laut Kei.",
      },
    ],
    references: [
      "https://www.kemenparekraf.go.id",
      "https://id.wikipedia.org/wiki/Enbal",
      "https://id.wikipedia.org/wiki/Ngilngof",
      "https://id.wikipedia.org/wiki/Kabupaten_Maluku_Tenggara",
    ],
  },
];

export function getNewsBySlug(slug: string): NewsArticle | undefined {
  return news.find((n) => n.slug === slug);
}
