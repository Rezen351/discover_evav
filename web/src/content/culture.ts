// Data terpusat halaman /budaya (Budaya & Sejarah Kepulauan Kei).
// Konten dipindahkan dari komponen ke sini mengikuti pola sentralisasi
// (lih. eksplorasi.ts / satwaEndemik.ts). Fakta yang DIJAGA (culture.md §5):
//   Larvul Ngabal (lisan), Ain Ni Ain, Belis, Tenun Ikat Elat + IG 2024,
//   Islam 1252M (Rat Nara, Tahiyat Yemru, Langgiar Fer).
// Semua teks UI berbahasa Indonesia; kosakata Kei sebagai aksen (GRAND_DESIGN §16).
//
// ⚠️ Validasi kosakata & fakta sejarah dengan informan lokal Kei sebelum production
// (GRAND_DESIGN §2.5, §5.3, §6.8; culture.md §7.3).

// ── Hero (§2 PageHero split + §3.1 Hero Budaya) ──────────────────────────────
export const heroBudaya = {
  eyebrow: "BUDAYA & SEJARAH",
  title: "Simfoni Kehidupan",
  titleAccent: "di Atas Pasir Putih",
  subtitle:
    "Mari mengenal jiwa Kepulauan Kei, di mana adat, iman, dan kekerabatan berpadu dalam satu napas peradaban yang damai.",
  intro:
    "Di ujung timur Nusantara, Kei menyimpan kekayaan yang tak terukur peta. Hukum tak tertulis diwariskan dari mulut ke mulut, mas kawin bukan sekadar mahar, dan ratusan tahun hidup berdampingan dalam damai lintas agama. Ayo, telusuri jejak mulia yang menjadikan Evav rumah bagi banyak hati.",
  image: "/images/budaya/kei_culture_ritual.png",
  imageAlt:
    "Ritual budaya masyarakat Kepulauan Kei saat golden hour — busana adat merah keemasan menyambut tamu",
  scrollHint: "Selami Budaya Kei",
  quote: {
    text: "Ain Ni Ain — kita semua bersaudara, satu memiliki satu. Yang lain bukan orang asing, melainkan saudara sedarah.",
    attribution: "Falsafah hidup masyarakat Kepulauan Kei",
  },
} as const;

// ── Larvul Ngabal (§3.2) ─────────────────────────────────────────────────────
export const larvulNgabal = {
  eyebrow: "LARVUL NGABAL",
  title: "Napas yang Menjaga Kei Tetap Rukun",
  tagline:
    "Darah merah dan tombak Bali bersatu menjadi satu janji leluhur.",
  intro:
    "Lebih dari aturan, Larvul Ngabal adalah napas yang menjaga Kei tetap rukun — darah merah dan tombak Bali bersatu menjadi janji: jagalah nyawa, keluarga, dan tanah dengan martabat.",
  etymology: {
    // Larvul = lar (darah) + vul (merah); Ngabal = nga (tombak) + bal (Bali)
    text: "Hukum adat tertinggi masyarakat Kei ini hidup dan diwariskan secara lisan turun-temurun. Namanya lahir dari dua hukum yang digabung: Larvul — lar (darah) + vul (merah), \u201Cdarah merah membakar\u201D — dan Ngabal — nga (tombak) + bal (Bali), \u201Ctombak dari Bali\u201D sang penjaga perdamaian dan keluhuran martabat. Larvul lahir dari persekutuan Ur Siw / Lor Siw (9 Rat di Elaar, Kei Kecil), Ngabal dari Lor Lim (5 Rat di Lerohoilim, Kei Besar); keduanya dipersatukan menjadi satu hukum adat setelah perjanjian damai.",
  },
  image: "/images/budaya/kei_larvul_spear.png",
  imageAlt:
    "Tombak adat berujung emas dengan pita darah merah — lambang hukum Larvul Ngabal Kepulauan Kei",
  pillars: [
    {
      id: "nevnev",
      title: "Nevnev",
      meaning: "Hukum Perikemanusiaan · Pasal 1\u20134",
      desc: "Melindungi nyawa, kehormatan, dan martabat manusia. Kekerasan dan pembunuhan adalah pelanggaran berat — nyawa lebih berharga daripada harta.",
    },
    {
      id: "hanilit",
      title: "Hanilit",
      meaning: "Hukum Keluarga & Perkawinan · Pasal 5\u20136",
      desc: "Mengatur tata cara perkawinan, penghormatan kepada perempuan, dan ikatan kekerabatan yanur\u2013mangohoi yang menjaga harkat keluarga.",
    },
    {
      id: "hawear-balwirin",
      title: "Hawear Balwirin",
      meaning: "Hukum Kepemilikan & Keadilan · Pasal 7",
      desc: "Mengatur hak milik dan keadilan sosial, dilambangkan hawear — tanda berhenti (sasi) yang menjaga batas dan kelestarian bersama.",
    },
  ],
  historicalNote:
    "Larvul Ngabal pernah menjadi peredam konflik antarumat beragama di Kei — konflik 1999 diselesaikan lewat upacara adat 15 Mei 1999 dengan ritual sasi penutupan konflik. Hingga kini ia dipakai sebagai mekanisme penyelesaian sengketa berbasis kekeluargaan, bukan sekadar aturan tertulis.",
} as const;

// ── Filosofi Grid / Bento (§3.3) ─────────────────────────────────────────────
export type FilosofiTile = {
  id: string;
  icon: "HeartHandshake" | "Gift" | "Palette" | "Landmark";
  title: string;
  desc: string;
  image: string;
  imageAlt: string;
  hero?: boolean;
};

export const filosofi = {
  eyebrow: "SATU TELUR, SERIBU AGAMA",
  title: "Filosofi yang Merajut Kei",
  intro:
    "Lebih dari sekadar tradisi, nilai-nilai ini adalah denyut yang membuat Kei tetap rukun. Empat pilar di bawah menjelaskan mengapa ratusan tahun bukan waktu yang cukup untuk memecah-belah kekerabatan Evav.",
  tiles: [
    {
      id: "ain-ni-ain",
      icon: "HeartHandshake",
      title: "Ain Ni Ain",
      desc: "\u201CSatu memiliki satu\u201D — setiap orang memandang liyan (yang lain) sebagai saudara kandung. Diperkuat citra Vuut Ain Mehe Ni Ngifun dan Manut Ain Mehe Ni Tilur: semua orang Kei bersaudara karena satu keturunan. Manifestasinya hidup dalam Maren — gotong royong lintas keyakinan.",
      image: "/images/budaya/kei_people_portrait.png",
      imageAlt:
        "Potret masyarakat Kepulauan Kei dengan ekspresi bangga — wujud persaudaraan Ain Ni Ain",
      hero: true,
    },
    {
      id: "belis",
      icon: "Gift",
      title: "Belis (Mas Kawin)",
      desc: "Bukan sekadar mahar, melainkan penghormatan: Lela (meriam tembaga), gong, mas adat, dan kain tenun yang mengikat dua keluarga dalam martabat.",
      image: "/images/budaya/kei_busana_adat.png",
      imageAlt:
        "Busana adat Kei merah keemasan yang dikenakan dalam upacara perkawinan dan penyerahan belis",
    },
    {
      id: "tenun",
      icon: "Palette",
      title: "Tenun Ikat Elat",
      desc: "Kain khas Ohoi Elat yang motifnya mencerminkan kehidupan lokal dan status adat — dikenakan dalam upacara dan menjadi bagian dari belis.",
      image: "/images/budaya/kei_batik.png",
      imageAlt:
        "Kain tenun ikat khas Ohoi Elat, Kepulauan Kei, dengan motif kehidupan lokal",
    },
    {
      id: "islam-1252",
      icon: "Landmark",
      title: "Islam 1252 M",
      desc: "Jejak Islam masuk ke Kei sejak 1252 M melalui Rat Nara, Tahiyat Yemru, dan Langgiar Fer — awal harmoni lintas iman yang bertahan hingga kini.",
      image: "/images/budaya/kei_culture.png",
      imageAlt:
        "Jejak keharmonisan lintas iman dalam kehidupan budaya masyarakat Kepulauan Kei",
    },
  ] satisfies FilosofiTile[],
} as const;

// ── Galeri Ekspresi Budaya (§3.4 · Tangible) ─────────────────────────────────
export type EkspresiItem = {
  id: string;
  icon: "Sparkles" | "Music" | "Shirt" | "Palette" | "Mic2";
  title: string;
  desc: string;
  images: string[];
  imageAlt: string;
  video?: string;
};

export const ekspresiBudaya = {
  eyebrow: "EKSPRESI BUDAYA",
  title: "Ditarikan, Dinyanyikan, Dikenakan",
  intro:
    "Kebudayaan Kei bukan disimpan di museum, melainkan ditarikan, dinyanyikan, dan dikenakan. Inilah denyutnya yang bisa kamu lihat dan rasakan.",
  items: [
    {
      id: "tari-sawat",
      icon: "Sparkles",
      title: "Tari Sawat",
      desc: "Tarian pergaulan penyambut tamu yang mengandung pesan perdamaian dan kekerabatan. Gerak gemulai penari berpadu dengan Tifa Totobuang — simbol toleransi lintas agama, sebab Sawat bernapas Islam sementara Tifa Totobuang lahir dari warga Kristen.",
      images: [
        "/images/budaya/kei_tari_sawat_1.png",
        "/images/budaya/kei_tari_sawat_2.png",
        "/images/budaya/kei_tari_sawat_3.png",
      ],
      imageAlt:
        "Penari Tari Sawat Kepulauan Kei dalam busana adat menyambut tamu dengan gerak gemulai",
      video: "/hero/video/culture.mp4",
    },
    {
      id: "alat-musik",
      icon: "Music",
      title: "Dada, Tifa & Savarngil",
      desc: "Dada (gong tembaga 12\u201315 inci), Tiva/Tifa (gendang kulit sapi dari kayu berlubang), dan Savarngil (suling bambu enam lubang) adalah denyut nadi tradisi yang mengiringi tari, upacara, dan penyambutan tamu.",
      images: ["/images/budaya/kei_dada_tifa.png"],
      imageAlt:
        "Alat musik tradisional Kei — gong Dada tembaga dan gendang Tifa dari kulit sapi",
    },
    {
      id: "busana-adat",
      icon: "Shirt",
      title: "Busana Adat",
      desc: "Pria mengenakan Benian Vuil-vuil, celana Sarwo Bloat Ngametan, dan topi vuil-vuil merah; wanita Siting Vuil-vuil, Sbo, serta selendang tom mas-mas emas. Merah berarti keberanian dan penjagaan hukum adat; emas berarti kehangatan cinta dan kehormatan.",
      images: ["/images/budaya/kei_tanimbar.png"],
      imageAlt:
        "Busana adat Kepulauan Kei berwarna merah dan kuning emas — lambang keberanian dan kehormatan",
    },
    {
      id: "tenun-elat",
      icon: "Palette",
      title: "Tenun Ikat Elat",
      desc: "Tenun ikat khas Ohoi Elat menyimpan motif yang mencerminkan kehidupan lokal dan status adat. Kain ini dipakai dalam upacara adat dan menjadi bagian dari mas kawin (belis).",
      images: ["/images/budaya/kei_coast_sunset.png"],
      imageAlt:
        "Detail kain tenun ikat Ohoi Elat, Kepulauan Kei, representasi warisan tekstil adat",
    },
    {
      id: "nyanyian-sastra",
      icon: "Mic2",
      title: "Nyanyian & Sastra Lisan",
      desc: "Kidung dan pantun adat menjadi jembatan spiritual antargenerasi — dari tiva ngelngel (nyanyian kegembiraan) hingga pantun tua penyerta ritual laut.",
      images: ["/images/budaya/kei_language_symbol.png"],
      imageAlt:
        "Simbol bahasa dan sastra lisan Kepulauan Kei — jembatan spiritual antargenerasi",
    },
  ] satisfies EkspresiItem[],
} as const;

// ── Breather / Quote (§3.4) ──────────────────────────────────────────────────
export const breather = {
  quote:
    "Budaya Kei bukan artefak masa lalu — ia pedoman hidup yang terus dihidupi, dari mulut ke mulut, dari tangan ke tangan.",
  attribution: "Warisan untuk masa depan tradisi Evav",
  ctaLabel: "Jelajahi Linimasa Kei",
  ctaHref: "#linimasa-kei",
} as const;

// ── Warisan Takbenda (§3.5 · Intangible) ─────────────────────────────────────
export type WarisanItem = {
  id: string;
  icon: "Languages" | "BookOpen" | "Fish";
  title: string;
  desc: string;
  image: string;
  imageAlt: string;
};

export const warisanTakbenda = {
  eyebrow: "WARISAN TAKBENDA",
  title: "Yang Tak Kasat Mata, Tapi Selalu Hidup",
  metiIntro:
    "Setiap Oktober, laut Kei menyingkapkan dasarnya. Warga turun bersama merawat apa yang memberi mereka hidup — harmoni antara manusia dan alam.",
  items: [
    {
      id: "bahasa",
      icon: "Languages",
      title: "Bahasa Kei (Evav)",
      desc: "Identitas inti sekaligus sarana komunikasi yang dinamis. Kosakata seperti Marhoba, Ain Ni Ain, Yelim, Sasi, Maren, dan Enma masih hidup sebagai aksen di keseharian masyarakat Kei.",
      image: "/images/budaya/kei_umkm_face_1.png",
      imageAlt:
        "Simbol bahasa daerah Kei (Evav) — identitas inti masyarakat Kepulauan Kei",
    },
    {
      id: "cerita-rakyat",
      icon: "BookOpen",
      title: "Cerita Rakyat & Legenda",
      desc: "Warisan narasi lisan pembentuk nilai moral — termasuk tom-tad (sejarah lisan) asal-usul Larvul Ngabal dan kisah leluhur pendatang (mel) yang berpadu dengan penduduk asli (ren).",
      image: "/images/budaya/kei_warriors_dance.png",
      imageAlt:
        "Penari perang adat Kei — penjaga cerita rakyat dan legenda leluhur Evav",
    },
    {
      id: "meti-sasi",
      icon: "Fish",
      title: "Tradisi Meti & Sasi Laut",
      desc: "Meti — surutnya air laut secara ekstrem setiap Oktober\u2013November hingga ratusan meter. Warga memanen hasil laut lewat Wer Warat / Hair Yot (tarik tali janur kuning menggiring ikan ke darat), diperkuat sasi. Dirayakan dalam Festival Pesona Meti Kei.",
      image: "/images/budaya/kei_meti_reef.png",
      imageAlt:
        "Terumbu karang Kepulauan Kei yang tersingkap saat Meti — laut surut ekstrem di bulan Oktober",
    },
  ] satisfies WarisanItem[],
} as const;

// ── Timeline / Linimasa (§4) ─────────────────────────────────────────────────
export type TimelineNode = {
  id: string;
  year: string;
  title: string;
  desc: string;
};

export const linimasa = {
  eyebrow: "LINIMASA KEI",
  title: "Jejak Waktu yang Membentuk Evav",
  intro:
    "Dari kedatangan Islam ratusan tahun silam hingga kain tenun yang kembali dikenali dunia — inilah tonggak yang menautkan masa lalu dan masa depan Kei.",
  nodes: [
    {
      id: "islam-1252",
      year: "1252 M",
      title: "Kedatangan Islam ke Kei",
      desc: "Islam masuk melalui Rat Nara, Tahiyat Yemru, dan Langgiar Fer — awal mula harmoni lintas iman yang menjadi ciri khas masyarakat Kepulauan Kei.",
    },
    {
      id: "formulasi-larvul",
      year: "Leluhur",
      title: "Formulasi Larvul Ngabal",
      desc: "Hukum Larvul (Lor Siw, 9 Rat) dan Ngabal (Lor Lim, 5 Rat) dipersatukan menjadi satu hukum adat lisan setelah perjanjian damai antar persekutuan.",
    },
    {
      id: "perdamaian-1999",
      year: "15 Mei 1999",
      title: "Upacara Adat Perdamaian",
      desc: "Konflik antarumat beragama diselesaikan lewat upacara adat dengan ritual sasi penutupan konflik — bukti Larvul Ngabal sebagai peredam perpecahan.",
    },
    {
      id: "festival-meti",
      year: "Kini",
      title: "Festival Pesona Meti Kei",
      desc: "Perayaan surut laut ekstrem yang kini masuk kalender pariwisata nasional — panggung kearifan lokal menjaga keberlanjutan ekosistem laut.",
    },
    {
      id: "napak-tilas-raja",
      year: "Adat",
      title: "Napak Tilas Pengangkatan Raja Manyeuw",
      desc: "Jejak penobatan Rat (Raja) adat Kerajaan Manyeuw dari Marga Watratan dihelat di Hutan Rumadian — pusaka suci tempat leluhur bersumpah meneguhkan kedaulatan Ratskap Manyeuw Rumadian di tanah Evav.",
    },
    {
      id: "tenun-2024",
      year: "2024",
      title: "Tenun Ikat Elat Kembali Dikenali",
      desc: "Motif tenun ikat khas Ohoi Elat menemukan panggung baru — dari upacara adat hingga sorotan media sosial (Instagram) yang memperkenalkannya ke generasi muda.",
    },
  ] satisfies TimelineNode[],
} as const;
