// Centralized catalog of featured UMKM of the Kei Islands.
// Moved from BeritaUmkmSection so it can be reused on the /taste page
// (UMKM catalog section) without duplicating data (GRAND_DESIGN §4.10).
// All UI text in English; WhatsApp numbers are placeholders
// (replace with real numbers before production).

export type UmkmItem = {
  id: string;
  name: string;
  category: "Kuliner" | "Kerajinan" | "Oleh-oleh";
  location: string;
  rating: number;
  image: string;
  whatsapp: string;
  desc: string;
};

export const umkms: UmkmItem[] = [
  {
    id: "u1",
    name: "Rumah Enbal Mbak Yuli",
    category: "Kuliner",
    location: "Langgur, Kei Kecil",
    rating: 4.7,
    image: "/images/kuliner/kei_umkm_enbal_kacang_1.jpeg",
    whatsapp: "6281234567890",
    desc: "Kei-spiced grilled fish enbal with a crunchy savory peanut blend, ready to accompany the family table.",
  },
  {
    id: "u2",
    name: "Oleh-oleh Khas Bumi Evav",
    category: "Oleh-oleh",
    location: "Ohoililir, Kei Kecil",
    rating: 4.6,
    image: "/images/kuliner/kei_umkm_kacang_botol_1.jpeg",
    whatsapp: "6281234567892",
    desc: "Crisp, long-lasting Kei bottle nuts — the perfect souvenir from the land of Evav.",
  },
  {
    id: "u3",
    name: "Enbal Bunga Mbak Rina",
    category: "Kuliner",
    location: "Langgur, Kei Kecil",
    rating: 4.8,
    image: "/images/kuliner/kei_umkm_enbal_bunga_1.jpeg",
    whatsapp: "6281234567893",
    desc: "Flower-shaped enbal with fragrant Kei spice, serving beauty of flavor in every bite.",
  },
  {
    id: "u4",
    name: "Enbal Bunga Khas Kei",
    category: "Kuliner",
    location: "Tual, Southeast Maluku",
    rating: 4.5,
    image: "/images/kuliner/kei_umkm_enbal_bunga_2.jpeg",
    whatsapp: "6281234567894",
    desc: "A baked flower-enbal variation soft inside, crisp outside, rich with Kei sea flavor.",
  },
  {
    id: "u5",
    name: "Crispy Rumput Laut Evav",
    category: "Kuliner",
    location: "Ohoililir, Kei Kecil",
    rating: 4.6,
    image: "/images/kuliner/kei_umkm_enbal_crispy_rumput_laut.jpeg",
    whatsapp: "6281234567895",
    desc: "A crispy, savory dried seaweed snack — a healthy treat straight from Kei waters.",
  },
  {
    id: "u6",
    name: "Enbal Kacang Bundo",
    category: "Kuliner",
    location: "Langgur, Kei Kecil",
    rating: 4.7,
    image: "/images/kuliner/kei_umkm_enbal_kacang_2.jpeg",
    whatsapp: "6281234567896",
    desc: "Enbal with a sprinkle of roasted peanuts — a sea-and-savory blend that is addictive.",
  },
  {
    id: "u7",
    name: "Stick Enbal Rumah Kita",
    category: "Kuliner",
    location: "Tual, Southeast Maluku",
    rating: 4.8,
    image: "/images/kuliner/kei_umkm_enbal_stick_1.jpeg",
    whatsapp: "6281234567897",
    desc: "A practical crisp enbal stick — a seaside street snack to enjoy while sitting on the sand.",
  },
  {
    id: "u8",
    name: "Stick Enbal Mama Tonce",
    category: "Kuliner",
    location: "Ohoililir, Kei Kecil",
    rating: 4.6,
    image: "/images/kuliner/kei_umkm_enbal_stick_2.jpeg",
    whatsapp: "6281234567898",
    desc: "Homemade enbal stick with just-right Kei spice — a warm coastal-family snack.",
  },
  {
    id: "u9",
    name: "Stick Enbal Kei Prime",
    category: "Kuliner",
    location: "Langgur, Kei Kecil",
    rating: 4.5,
    image: "/images/kuliner/kei_umkm_enbal_stick_3.jpeg",
    whatsapp: "6281234567899",
    desc: "Premium enbal stick with an evenly crisp texture — an elegant sea souvenir choice.",
  },
  {
    id: "u10",
    name: "Kacang Botol Makmur",
    category: "Oleh-oleh",
    location: "Tual, Southeast Maluku",
    rating: 4.7,
    image: "/images/kuliner/kei_umkm_kacang_botol_2.jpeg",
    whatsapp: "6281234567900",
    desc: "Neatly packed crisp bottle nuts — a Kei souvenir that keeps well and is easy to bring home.",
  },
  {
    id: "u11",
    name: "Kerupuk Enbal Super",
    category: "Kuliner",
    location: "Ohoililir, Kei Kecil",
    rating: 4.6,
    image: "/images/kuliner/kei_umkm_kerupuk_enbal_super.jpeg",
    whatsapp: "6281234567901",
    desc: "Enbal crackers with a strong sea aroma — crisp and savory to share at the table.",
  },
  {
    id: "u12",
    name: "Kue Kering Mocaf Makmur",
    category: "Oleh-oleh",
    location: "Langgur, Kei Kecil",
    rating: 4.8,
    image: "/images/kuliner/kei_umkm_kue_kering_mocaf_makmur_1.jpeg",
    whatsapp: "6281234567902",
    desc: "Dry cookies from local mocaf flour — crisp and light, a sweet Kei souvenir.",
  },
  {
    id: "u13",
    name: "Kue Kering Mocaf Makmur 2",
    category: "Oleh-oleh",
    location: "Tual, Southeast Maluku",
    rating: 4.7,
    image: "/images/kuliner/kei_umkm_kue_kering_mocaf_makmur_2.jpeg",
    whatsapp: "6281234567903",
    desc: "A mocaf cookie variation with a distinctive taste — a long-keeping sweet snack for souvenirs.",
  },
  {
    id: "u14",
    name: "Kue Kering Mocaf Saleha",
    category: "Oleh-oleh",
    location: "Ohoililir, Kei Kecil",
    rating: 4.9,
    image: "/images/kuliner/kei_umkm_kue_kering_mocaf_saleha.jpeg",
    whatsapp: "6281234567904",
    desc: "Homemade mocaf cookies with an authentic taste — a favorite souvenir from Kei kitchens.",
  },
  {
    id: "u15",
    name: "Piece Enbal & Mocaf Flour",
    category: "Kuliner",
    location: "Langgur, Kei Kecil",
    rating: 4.6,
    image: "/images/kuliner/kei_umkm_piece_enbal.jpeg",
    whatsapp: "6281234567905",
    desc: "Ready-to-cook enbal pieces with local mocaf flour — practical for family meals.",
  },
  {
    id: "u16",
    name: "Tepung Mocaf Bumi Evav",
    category: "Oleh-oleh",
    location: "Tual, Southeast Maluku",
    rating: 4.7,
    image: "/images/kuliner/kei_umkm_tepung_mocaf.jpeg",
    whatsapp: "6281234567906",
    desc: "Mocaf flour from Evav-land local cassava — a healthy base replacing wheat for Kei cookies.",
  },
];
