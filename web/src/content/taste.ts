// Data terpusat halaman /taste (Kuliner & Cita Rasa Kepulauan Kei).
// Konten dipindahkan dari komponen ke sini mengikuti pola sentralisasi
// (lih. budaya.ts / eksplorasi.ts). Halaman ini memuat "Rasa Kei" — narasi
// kuliner autentik: Enbal, Colo-colo, Sagu, Pisang, dan filosofi makan
// bersama (Yelim, sasi laut).
// Semua teks UI berbahasa Indonesia; kosakata Kei sebagai aksen (GRAND_DESIGN §16).
//
// ⚠️ Validasi kosakata & fakta kuliner dengan informan lokal Kei sebelum production
// (GRAND_DESIGN §2.5, §5.3, §6.8; budaya.ts §catatan serupa).

// ── Hero (dark sinematik, id=taste-hero) ──────────────────────────────────────
export const heroTaste = {
  eyebrow: "RASA KEI",
  title: "Cita Rasa dari",
  titleAccent: "Pasir Putih",
  subtitle:
    "Di Kei, makan bukan sekadar mengisi perut — ia adalah cara menyambut. Dari ikan bakar berbumbu Enbal hingga segarnya Colo-colo, setiap suapan menyimpan cerita laut dan kekerabatan. Mari duduk di atas pasir, seperti teman yang pernah ke sana.",
  image: "/images/kuliner/kei_food_atmosfer.png",
  imageAlt:
    "Suasana kuliner Kepulauan Kei di atas pasir putih — hidangan laut segar dengan latar laut toska",
  scrollHint: "Selami Rasa Kei",
  quote: {
    text: "Memberi dengan tangan dan hati — begitulah Kei mempersilakan tamu duduk di meja yang sama.",
    attribution: "Yelim — falsafah memberi masyarakat Kepulauan Kei",
  },
} as const;

// ── Signature Dishes (light, bg-section) ──────────────────────────────────────
export type SignatureDish = {
  id: string;
  name: string;
  desc: string;
  tag: string;
  image: string;
  imageAlt: string;
};

export const signatureDishes = {
  eyebrow: "HIDANGAN KHAS KEI",
  title: "Yang Membuat Lidah Ingat Kei",
  intro:
    "Laut memberi, sagu menopang, rempah menghidupkan. Inilah hidangan yang biasa dipanggang di atas bara dan dinikmati ramai-ramai di tepian pantai.",
  dishes: [
    {
      id: "enbal",
      name: "Enbal",
      desc: "Ikan segar dibakar di atas bara, dibalut bumbu khas Kei yang gurih pedas. Wangi asap lautnya langsung membangkitkan selera saat dihidangkan hangat.",
      tag: "Ikan Bakar",
      image: "/images/kuliner/kei_culinary_enbal.png",
      imageAlt: "Enbal — ikan bakar bumbu khas Kepulauan Kei",
    },
    {
      id: "colo-colo",
      name: "Colo-colo",
      desc: "Sambal cuka kebanggaan Kei: irisan cabai, bawang, dan tomat segar yang menyegarkan setiap gigitan laut. Asam tajamnya membuat kamu ingin nambah terus.",
      tag: "Sambal Cuka",
      image: "/images/kuliner/kei_ikan_colocolo.png",
      imageAlt: "Colo-colo — sambal cuka segar khas Kepulauan Kei",
    },
    {
      id: "pisang-enbal",
      name: "Pisang Enbal",
      desc: "Pisang lokal dipadukan dengan sentuhan bumbu Enbal, manis dan gurih berpadu dalam satu suapan. Jajanan tepi pantai yang hangat di hati.",
      tag: "Camilan",
      image: "/images/kuliner/kei_pisang_enbal.png",
      imageAlt: "Pisang Enbal — camilan pisang khas Kepulauan Kei",
    },
    {
      id: "sagu",
      name: "Sagu",
      desc: "Makanan pokok pengikat keluarga Kei, diolah dari pohon sagu setempat. Lembut, netral, dan siap menyerap rasa laut di setiap piring.",
      tag: "Makanan Pokok",
  image: "/images/kuliner/kei_culinary_fish.png",
      imageAlt: "Proses sagu — makanan pokok masyarakat Kepulauan Kei",
    },
    {
      id: "mangrove-stick",
      name: "Mangrove Stick",
      desc: "Hasil hutan bakau yang ditusuk dan dibakar perlahan, tekstur kenyal dengan semburat asap. Camilan tepi laut yang jujur dan sederhana.",
      tag: "Camilan Bakar",
      image: "/images/kuliner/kei_umkm_kacang_botol_1.jpeg",
      imageAlt: "Mangrove stick — camilan bakar dari hutan bakau Kei",
    },
    {
      id: "lat",
      name: "Lat",
      desc: "Olahan ikan lokal khas Kei yang dipadukan rempah panggang hingga harum. Sajian yang sering jadi bintang di meja makan bersama.",
      tag: "Olahan Ikan",
      image: "/images/kuliner/kei_lat.png",
      imageAlt: "Lat — olahan ikan panggang khas Kepulauan Kei",
    },
    {
      id: "sirsir",
      name: "Sirsir",
      desc: "Daun muda Kei yang diolah ringan, renyah dan menyegarkan di sela lauk berat. Rasa hijau yang membersit segar di lidah.",
      tag: "Sayur Daun",
      image: "/images/kuliner/kei_culinary_sirsir.png",
      imageAlt: "Sirsir — sayur daun muda khas Kepulauan Kei",
    },
    {
      id: "enbal-love",
      name: "Enbal Bunga",
      desc: "Variasi Enbal dengan hiasan bunga pangan lokal, memadukan rasa dan keindahan dalam satu hidangan. Kei menyajikan makanan seindah menyambut tamu.",
      tag: "Ikan Bakar",
      image: "/images/kuliner/kei_umkm_enbal_bunga_1.jpeg",
      imageAlt: "Enbal bunga — variasi ikan bakar berciri khas Kei",
    },
    {
      id: "enbal-stik",
      name: "Enbal Stik",
      desc: "Enbal yang dibentuk ramping dan dipanggang, praktis dinikmati sambil duduk di atas pasir. Camilan jalanan pinggir laut yang menggugah selera.",
      tag: "Camilan",
      image: "/images/kuliner/kei_umkm_enbal_stick_1.jpeg",
      imageAlt: "Enbal stik — camilan ikan panggang khas Kepulauan Kei",
    },
    {
      id: "enbal-love-shape",
      name: "Enbal Love",
      desc: "Enbal dibentuk menjadi hati sebagai simbol kasih masyarakat Kei kepada setiap tamu. Renyah di luar, lembut di dalam, penuh makna.",
      tag: "Camilan",
      image: "/images/kuliner/kei_umkm_piece_enbal.jpeg",
      imageAlt: "Enbal love — enbal berbentuk hati khas Kepulauan Kei",
    },
  ] satisfies SignatureDish[],
} as const;

// ── Story (light, bg-section) ─────────────────────────────────────────────────
export const tasteStory = {
  eyebrow: "FILSOFOSI RASA",
  title: "Dapur Kei adalah Meja Kebersamaan",
  image: "/images/kuliner/kei_sagu.jpg",
  imageAlt:
    "Proses memasak bersama di Kepulauan Kei — sagu dan hasil laut diolah secara komunal",
  paragraphs: [
    "Di Kei, makan tidak pernah sendirian. Laut dijaga lewat sasi — aturan adat yang memberi waktu alam bernapas — sehingga ikan yang sampai ke meja selalu cukup dan sejahtera. Apa yang diambil hari ini adalah janji untuk besok.",
    "Setiap hidangan laut dan sagu disajikan dalam porsi yang memanggil semua orang duduk bersama. Inilah Yelim — memberi dengan tangan dan hati — yang membuat tamu, entah kenal atau baru, selalu disilakan ke meja yang sama.",
    "Rempah, cuka, dan bara adalah bahasa Kei menyambut: sederhana, hangat, dan jujur. Seperti pasir putihnya, cita rasa Kei tidak berteriak — ia mengundang kamu kembali.",
  ],
  accentWord: "Yelim",
  accentNote: "(Memberi dengan tangan & hati)",
} as const;

// ── Bento (light, bg-section) ─────────────────────────────────────────────────
export type BentoItem = {
  id: string;
  icon: "Fish" | "Wheat" | "Flame" | "CakeSlice" | "Coconut";
  title: string;
  desc: string;
  image: string;
  imageAlt: string;
  hero?: boolean;
  tall?: boolean;
};

export const bentoTaste = {
  eyebrow: "CIRI CITA RASA KEI",
  title: "Empat Rasa yang Membentuk Meja Kei",
  items: [
    {
      id: "laut-sasi",
      icon: "Fish",
      title: "Laut & Sasi",
      desc: "Hasil laut yang dijaga adat. Sasi memberi waktu alam pulih, sehingga ikan, cumi, dan kerang selalu segar dan cukup saat tiba di meja.",
      image: "/images/kuliner/kei_culinary_fish.png",
      imageAlt: "Hasil laut segar Kepulauan Kei yang dijaga lewat adat sasi",
      hero: true,
    },
    {
      id: "umbi-santan",
      icon: "Coconut",
      title: "Umbi & Santan Gurih",
      desc: "Santan segar yang kental dan umbi-umbian lokal (seperti singkong dan ubi jalar) memberikan kelembutan yang kaya. Mereka menyeimbangkan ketajaman rempah dan rasa laut yang segar.",
      image: "/images/kuliner/kei_culinary_sirsir.png",
      imageAlt: "Umbi-umbian dan santan gurih khas Kepulauan Kei",
      tall: true,
    },
    {
      id: "sagu",
      icon: "Wheat",
      title: "Sagu",
      desc: "Makanan pokok pengikat keluarga — lembut, netral, siap menyerap rasa laut di setiap piring.",
      image: "/images/kuliner/kei_sagu.jpg",
      imageAlt: "Proses sagu — makanan pokok masyarakat Kepulauan Kei",
    },
    {
      id: "rempah-colocolo",
      icon: "Flame",
      title: "Rempah & Colo-colo",
      desc: "Cuka, cabai, dan bawang segar memberi kehidupan. Colo-colo adalah tanda tangan keasaman Kei.",
      image: "/images/kuliner/kei_ikan_colocolo.png",
      imageAlt: "Colo-colo — sambal cuka segar khas Kepulauan Kei",
    },
    {
      id: "manis-pisang",
      icon: "CakeSlice",
      title: "Manis & Pisang",
      desc: "Pisang lokal dan camilan panggang menutup makan dengan hangat — manis yang tidak berlebihan, seperti sambutan Kei.",
      image: "/images/kuliner/kei_pisang_enbal.png",
      imageAlt: "Pisang Enbal — camilan pisang khas Kepulauan Kei",
    },
  ] satisfies BentoItem[],
} as const;

// ── Closing (light / accent, breath) ──────────────────────────────────────────
export const tasteClosing = {
  greeting: "Marhoba, Enma Kei",
  greetingNote: "(Selamat datang, hadirlah ke Kei)",
  quote:
    "Rasa yang paling kerasa bukan yang paling pedas, melainkan yang paling hangat saat dibagikan.",
  attribution: "Filosofi meja makan masyarakat Kepulauan Kei",
  ctaLabel: "Ceritakan Keinginanmu",
  ctaHref: "/interaction",
} as const;
