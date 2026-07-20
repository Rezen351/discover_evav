// Data terpusat halaman /culture (Budaya & Sejarah Kepulauan Kei).
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
  image: "/images/budaya/ritual-penyambutan-tamu-rinin.jpg",
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
  image: "/images/budaya/landmark_langgur_kei_larvul_spear.jpeg",
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
  // 7 pasal Larvul Ngabal (tom-tad lisan; rujukan Rahail 1993, Resubun 2007,
  // Ohoitimur 1996, jurnal IUSTUM 2022). Larvul (Lor Siw/9 Rat, Kei Kecil)
  // menyumbang 4 pasal Nevnev; Ngabal (Lor Lim/5 Rat, Kei Besar) menyumbang
  // 2 pasal Hanilit + 1 pasal Hawear Balwirin.
  pasalList: [
    {
      nomor: 1,
      kelompok: "Nevnev",
      istilahKei: "Manus Ngafau",
      artiKei: "Melindungi Nyawa",
      judul: "Menjaga Nyawa & Tubuh",
      desc: "Setiap orang berhak atas hidup dan keselamatan tubuhnya. Mengancam, melukai, atau mencabut nyawa adalah pelanggaran paling berat — nyawa lebih tinggi daripada harta.",
    },
    {
      nomor: 2,
      kelompok: "Nevnev",
      istilahKei: "Farira",
      artiKei: "Pembunuhan",
      judul: "Larangan Membunuh",
      desc: "Pembunuhan (farira) ditebus dengan ganti nyawa (vut wau / vuut faak) berupa emas, kain tenun, dan hewan ternak yang diserahkan kepada keluarga korban.",
    },
    {
      nomor: 3,
      kelompok: "Nevnev",
      istilahKei: "Wel Reim",
      artiKei: "Penganiayaan",
      judul: "Larangan Menganiaya",
      desc: "Kekerasan fisik dan penganiayaan (wel reim) dilarang keras. Hukum adat menjamin keutuhan raga setiap warga di bawah perlindungan yang tegas.",
    },
    {
      nomor: 4,
      kelompok: "Nevnev",
      istilahKei: "Rum Raad",
      artiKei: "Pencurian",
      judul: "Larangan Mencuri",
      desc: "Harta siapa pun dilindungi adat. Mencuri (rum raad) dikenai denda berat — emas, kain tenun, dan ternak — sebagai ganti rugi kepada yang empunya.",
    },
    {
      nomor: 5,
      kelompok: "Hanilit",
      istilahKei: "Manyer Aman",
      artiKei: "Perkawinan & Kehormatan",
      judul: "Tata Perkawinan & Penghormatan Perempuan",
      desc: "Mengatur ikatan perkawinan dan menjunjung tinggi kehormatan perempuan (manyer aman). Keluarga besar disatukan lewat belis dalam martabat, bukan sekadar mahar.",
    },
    {
      nomor: 6,
      kelompok: "Hanilit",
      istilahKei: "Yanur–Mangohoi",
      artiKei: "Ikatan Kekerabatan",
      judul: "Merawat Kekerabatan",
      desc: "Menjaga ikatan kekerabatan yanur (garis ayah) dan mangohoi (garis ibu) agar harkat keluarga tetap utuh. Putusnya ikatan ini mengoyak tatanan adat.",
    },
    {
      nomor: 7,
      kelompok: "Hawear Balwirin",
      istilahKei: "Hawear Balwirin",
      artiKei: "Batas & Keadilan",
      judul: "Kepemilikan & Keadilan",
      desc: "Mengatur hak milik dan keadilan sosial. Hawear — tanda berhenti (sasi) — menjaga batas dan kelestarian bersama; pelanggaran (sasa sor fit) ditebus dengan tebusan adat.",
    },
  ],
} as const;

export type LarvulPasal = {
  nomor: number;
  kelompok: "Nevnev" | "Hanilit" | "Hawear Balwirin";
  istilahKei: string;
  artiKei: string;
  judul: string;
  desc: string;
};

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
      image: "/images/budaya/masyarakat-kei-thespiceroute.jpg",
      imageAlt:
        "Potret masyarakat Kepulauan Kei dengan ekspresi bangga — wujud persaudaraan Ain Ni Ain",
      hero: true,
    },
    {
      id: "belis",
      icon: "Gift",
      title: "Belis (Mas Kawin)",
      desc: "Bukan sekadar mahar, melainkan penghormatan: Lela (meriam tembaga), gong, mas adat, dan kain tenun yang mengikat dua keluarga dalam martabat.",
      image: "/images/budaya/belis-mas-kawin.png",
      imageAlt: "Uang koin mas adat, gong, dan lela sebagai lambang belis mas kawin tradisi Kei",
    },
    {
      id: "tenun",
      icon: "Palette",
      title: "Tenun Ikat Elat",
      desc: "Kain khas Ohoi Elat yang motifnya mencerminkan kehidupan lokal dan status adat — dikenakan dalam upacara dan menjadi bagian dari belis.",
      image: "/images/budaya/tenun-ikat-elat-kompas.png",
      imageAlt: "Kain tenun ikat welat khas Ohoi Elat, Kepulauan Kei, dengan motif kehidupan lokal",
    },
    {
      id: "islam-1252",
      icon: "Landmark",
      title: "Islam 1252 M",
      desc: "Jejak Islam masuk ke Kei sejak 1252 M melalui Rat Nara, Tahiyat Yemru, dan Langgiar Fer — awal harmoni lintas iman yang bertahan hingga kini.",
      image: "/images/budaya/jejak-islam-masjid-ohoitom-tahayad.png",
      imageAlt: "Masjid Kuno Ohoitom yang menjadi simbol jejak sejarah Islam dan kerukunan beragama di Kei",
    },
  ] satisfies FilosofiTile[],
  cta: {
    title: "Ingin Mengenal Lebih Dekat?",
    desc: "Mari terhubung dengan Keluarga Evav untuk merancang perjalanan budaya yang autentik, ramah lokal, dan mendalam.",
    buttonText: "Hubungi Keluarga Evav",
    link: "/interaction",
  },
} as const;

// ── Galeri Ekspresi Budaya (§3.4 · Tangible) ─────────────────────────────────
export type EkspresiTrack = {
  id: string;
  title: string;
  artist: string;
  youtubeId: string;
  cover?: string;
};

export type EkspresiItem = {
  id: string;
  icon: "Sparkles" | "Boat" | "Music" | "Shirt" | "Palette" | "Mic2";
  kelompok: "Tari" | "Alat Musik" | "Busana Adat" | "Kerajinan Budaya" | "Nyanyian & Sastra Lisan";
  title: string;
  desc: string;
  images: string[];
  imageAlt: string;
  video?: string;
  tracks?: EkspresiTrack[];
};

export type EkspresiKelompok = {
  id: EkspresiItem["kelompok"];
  icon: EkspresiItem["icon"];
  label: string;
  desc: string;
  items: EkspresiItem[];
};

export const ekspresiBudaya = {
  eyebrow: "EKSPRESI BUDAYA",
  title: "Ditarikan, Dinyanyikan, Dikenakan",
  intro:
    "Kebudayaan Kei bukan disimpan di museum, melainkan ditarikan, dinyanyikan, dan dikenakan. Inilah denyutnya yang bisa kamu lihat dan rasakan.",
  kelompokList: [
    {
      id: "Tari",
      icon: "Sparkles",
      label: "Tari",
      desc: "Tarian pergaulan dan olahraga adat yang merajut kekerabatan serta perdamaian.",
      items: [
        {
          id: "tari-sawat",
          icon: "Sparkles",
          kelompok: "Tari",
          title: "Tari Sawat",
          desc: "Tari pergaulan asal Maluku Tenggara yang dihidangkan untuk menyambut tamu dan merajut kekerabatan, persahabatan, serta perdamaian. Bernapas Islam dengan nuansa Arab–Melayu, Sawat diiringi rebana, tifa, dan suling — dan kerap berkolaborasi dengan Tifa Totobuang (warga Kristen) sebagai simbol toleransi lintas iman.",
          images: [
            "/images/budaya/tari-sawat-infopublik.jpg",
            "/images/budaya/tari-syariat-kemdikbud.png",
          ],
          imageAlt:
            "Penari Tari Sawat Kepulauan Kei dalam busana adat menyambut tamu dengan gerak gemulai",
        },
        {
          id: "tari-belan",
          icon: "Boat",
          kelompok: "Tari",
          title: "Tari Belan",
          desc: "Belan adalah perahu layar tradisional Kei yang dahulu menyeberangkan warga antar pulau. Kini belan dimodifikasi menjadi sarana lomba balap perahu dalam Festival Pesona Meti Kei — denyut kebersamaan yang menjunjung tinggi nilai adat dan budaya Evav di atas air.",
          images: [
            "/images/budaya/lomba-perahu-belan-rri.jpg",
            "/images/budaya/perahu_belan_race_kei.png",
          ],
          imageAlt:
            "Lomba balap perahu belan tradisional Kepulauan Kei saat Festival Pesona Meti Kei",
          video: "/videos/tari-belan.mp4",
        },
      ],
    },
    {
      id: "Alat Musik",
      icon: "Music",
      label: "Alat Musik",
      desc: "Gong, gendang, dan suling yang menjadi denyut nadi setiap upacara dan penyambutan tamu.",
      items: [
        {
          id: "alat-musik",
          icon: "Music",
          kelompok: "Alat Musik",
          title: "Dada, Tifa & Savarngil",
          desc: "Dada (gong tembaga 12–15 inci), Tiva/Tifa (gendang kulit sapi dari kayu berlubang), dan Savarngil (suling bambu enam lubang) adalah denyut nadi tradisi yang mengiringi tari, upacara, dan penyambutan tamu.",
          images: [
            "/images/budaya/kei_dada_tifa.png",
            "/images/budaya/kei_gong_dada_ilustration.jpeg",
          ],
          imageAlt:
            "Alat musik tradisional Kei — gong Dada tembaga dan gendang Tifa dari kulit sapi",
        },
      ],
    },
    {
      id: "Busana Adat",
      icon: "Shirt",
      label: "Busana Adat",
      desc: "Busana merah-emas yang memancangkan keberanian, kehormatan, dan penjagaan hukum adat.",
      items: [
        {
          id: "busana-adat",
          icon: "Shirt",
          kelompok: "Busana Adat",
          title: "Busana Adat",
          desc: "Pria mengenakan Benian Vuil-vuil, celana Sarwo Bloat Ngametan, dan topi vuil-vuil merah; wanita Siting Vuil-vuil, Sbo, serta selendang tom mas-mas emas. Merah berarti keberanian dan penjagaan hukum adat; emas berarti kehangatan cinta dan kehormatan.",
          images: [
            "/images/budaya/kei-busana-adat-arnol-arnol-pinterest.png",
          ],
          imageAlt:
            "Busana adat Kepulauan Kei berwarna merah dan kuning emas — lambang keberanian dan kehormatan",
        },
      ],
    },
    {
      id: "Kerajinan Budaya",
      icon: "Palette",
      label: "Kerajinan Budaya",
      desc: "Tenunan dan karya tangan adat yang menyimpan motif kehidupan lokal serta status adat.",
      items: [
        {
          id: "tenun-elat",
          icon: "Palette",
          kelompok: "Kerajinan Budaya",
          title: "Tenun Ikat Elat",
          desc: "Tenun ikat khas Ohoi Elat menyimpan motif yang mencerminkan kehidupan lokal dan status adat. Kain ini dipakai dalam upacara adat dan menjadi bagian dari mas kawin (belis).",
          images: [
            "/images/budaya/tenun-ikat-elat-kompas.png",
            "/images/budaya/tenun_elat_watermark.svg",
          ],
          imageAlt:
            "Detail kain tenun ikat Ohoi Elat, Kepulauan Kei, representasi warisan tekstil adat",
        },
        {
          id: "batik-kei",
          icon: "Palette",
          kelompok: "Kerajinan Budaya",
          title: "Batik Kei",
          desc: "Batik khas Kepulauan Kei yang memadukan motif laut, terumbu karang, dan kekayaan alam Evav ke dalam helai kain. Canting dan lilin menorehkan narasi kepulauan yang menjadi oleh-oleh sekaligus identitas budaya Kei di masa kini.",
          images: [
            "/images/budaya/kei_batik.png",
          ],
          imageAlt:
            "Kain batik motif laut Kepulauan Kei — representasi warisan tekstil budaya Evav",
        },
      ],
    },
    {
      id: "Nyanyian & Sastra Lisan",
      icon: "Mic2",
      label: "Nyanyian & Sastra Lisan",
      desc: "Kidung dan pantun adat sebagai jembatan spiritual antargenerasi.",
      items: [
        {
          id: "nyanyian-sastra",
          icon: "Mic2",
          kelompok: "Nyanyian & Sastra Lisan",
          title: "Nyanyian & Sastra Lisan",
          desc: "Kidung dan pantun adat menjadi jembatan spiritual antargenerasi — dari tiva ngelngel (nyanyian kegembiraan) hingga pantun tua penyerta ritual laut.",
          images: ["/images/budaya/kei_language_symbol.png"],
          imageAlt:
            "Simbol bahasa dan sastra lisan Kepulauan Kei — jembatan spiritual antargenerasi",
          tracks: [
            {
              id: "ning-nuhu-tanat",
              title: "Ning Nuhu Tanat",
              artist: "Musik Tradisi Kei",
              youtubeId: "TXt9B-xdM_o",
              cover: "/images/budaya/kei_language_symbol.png",
            },
            {
              id: "vadat-vil-vil",
              title: "Vadat Vil Vil",
              artist: "Musik Tradisi Kei",
              youtubeId: "AMmRGr8CjGE",
              cover: "/images/budaya/kei_language_symbol.png",
            },
            {
              id: "meti-kei",
              title: "Meti Kei",
              artist: "Musik Tradisi Kei",
              youtubeId: "efB4EbP9EtY",
              cover: "/images/budaya/ritual-penyambutan-tamu-rinin.jpg",
            },
            {
              id: "arwan-sir-sir",
              title: "Arwan Sir Sir",
              artist: "Musik Tradisi Kei",
              youtubeId: "9ZVvJYoNMQc",
              cover: "/images/budaya/kei_busana_adat.png",
            },
          ],
        },
      ],
    },
  ] satisfies EkspresiKelompok[],
};

export type WarisanItem = {
  id: string;
  icon: "Languages" | "BookOpen" | "Fish";
  title: string;
  desc: string;
  image: string;
  imageAlt: string;
};

export const breather = {
  quote:
    "Budaya Kei bukan artefak masa lalu — ia pedoman hidup yang terus dihidupi, dari mulut ke mulut, dari tangan ke tangan.",
  attribution: "Warisan untuk masa depan tradisi Evav",
  ctaLabel: "Jelajahi Linimasa Kei",
  ctaHref: "#linimasa-kei",
} as const;

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
      image: "/images/budaya/kei_language_symbol.png",
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
      desc: "Meti — surutnya air laut secara ekstrem setiap Oktober–November hingga ratusan meter. Warga memanen hasil laut lewat Wer Warat / Hair Yot (tarik tali janur kuning menggiring ikan ke darat), diperkuat sasi. Dirayakan dalam Festival Pesona Meti Kei.",
      image: "/images/eksplorasi/wer_warat_custom.png",
      imageAlt:
        "Warga bergotong royong menarik tali janur kuning (wer warat) menggiring ikan saat surut laut ekstrem Meti Kei",
    },
  ] satisfies WarisanItem[],
} as const;

// ── Festival Pesona Meti Kei (§3.5 · Tradisi → Penggerak) ───────────────────
// Filosofi: warisan takbenda (meti/sasi) yang "naik kelas" menjadi institusi
// budaya yang menghidupi warga. Empat pilar: lahir sebagai event (2017),
// naik skala nasional (KEN, 6x berturut-turut dari 110 event), gerbang promosi
// kawasan, dan multiplier effect ke rantai ekonomi masyarakat.
// ⚠️ Validasi angka (tahun mulai, jumlah keterpilihan KEN) dengan informan lokal
// & sumber resmi Kemenparekraf sebelum production.
export type FestivalPilar = {
  id: string;
  icon: "CalendarHeart" | "Award" | "MapPin" | "Users";
  title: string;
  desc: string;
};

export const festivalMetiKei = {
  eyebrow: "FESTIVAL PESONA METI KEI",
  title: "Dari Tradisi Warga Menjadi Panggung Nusantara",
  intro:
    "Ketika laut Kei menyingkap dasarnya, warga tak hanya turun memanen — mereka merayakannya. Sejak dikemas menjadi festival tahunan, denyut keseharian Evav berubah menjadi panggung budaya yang menghidupi banyak keluarga: dari nelayan dan penenun hingga pemandu, pelaku UMKM, dan komunitas kreatif.",
  image: "/images/budaya/festival-pesona-meti-kei-2025-triptrus.jpg",
  imageAlt:
    "Kemeriahan Festival Pesona Meti Kei — warga dan wisatawan merayakan surut laut ekstrem di Kepulauan Kei",
  // Statistik unggulan (badge di atas gambar / kartu sorotan)
  stat: {
    value: "6×",
    label: "Berturut-turut terpilih Kharisma Event Nusantara (KEN) Kemenparekraf",
    context: "dari 110 event unggulan se-Indonesia",
  },
  pilar: [
    {
      id: "diangkat-jadi-event",
      icon: "CalendarHeart",
      title: "Diangkat Jadi Event Budaya",
      desc: "Sejak pertama dirayakan di Ngilngof (2017), tradisi meti dikemas menjadi festival tahunan — mengubah aktivitas keseharian warga yang unik menjadi atraksi wisata yang bernilai jual.",
    },
    {
      id: "agenda-nasional",
      icon: "Award",
      title: "Agenda Rutin Berskala Nasional",
      desc: "Didukung penuh pemerintah kabupaten, provinsi, hingga pusat lewat Kharisma Event Nusantara (KEN) Kemenparekraf — 6× berturut-turut terpilih dari 110 event se-Indonesia. Dukungan lintas level ini memastikan festival terus berjalan dari tahun ke tahun dan bisa diandalkan wisatawan.",
    },
    {
      id: "gerbang-promosi",
      icon: "MapPin",
      title: "Gerbang Promosi Pariwisata Kei",
      desc: "Festival mengajak wisatawan menjelajahi destinasi-destinasi lain di Kei sekaligus — menjadikannya pintu masuk promosi seluruh kawasan, bukan sekadar acara satu titik.",
    },
    {
      id: "multiplier-effect",
      icon: "Users",
      title: "Multiplier Effect ke Masyarakat",
      desc: "Pelibatan penuh talenta lokal, pelaku UMKM, dan komunitas kreatif membuat perputaran ekonomi menyebar ke banyak sektor sekaligus: kuliner, kerajinan, transportasi lokal, penginapan, hingga jasa pemandu. Bukan satu pengelola yang untung, melainkan rantai ekonomi warga yang bergerak bersamaan setiap tahun.",
    },
  ] satisfies FestivalPilar[],
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
