// Data terpusat untuk HeritageSection di landing page (Warisan Leluhur Kepulauan Kei).
// Konten dipisahkan dari komponen mengikuti pola sentralisasi (lih. budaya.ts,
// taste.ts, eksplorasi.ts). Section ini berfokus pada WARISAN MATERIAL & TEMPAT:
// kampung adat (ohoi), benda pusaka, dan jejak sejarah — berbeda dari BudayaAdat
// (hukum adat) dan FunFact (tab alam/budaya/satwa/kuliner).
// Semua teks UI berbahasa Indonesia; kosakata Kei sebagai aksen (GRAND_DESIGN §16).
//
// ⚠️ Validasi nama kampung & fakta sejarah dengan informan lokal Kei sebelum production.

export type HeritageItem = {
  id: string;
  era: string;
  title: string;
  location: string;
  desc: string;
  image: string;
  imageAlt: string;
};

export const heritageIntro = {
  eyebrow: "WARISAN LELUHUR",
  title: "Jejak yang Tak",
  titleAccent: "Hilang ditelan Pasir",
  subtitle:
    "Di atas pasir putih ini, ratusan kampung adat (ohoi) dan benda pusaka masih menyimpan napas leluhur. Mari telusuri warisan yang membuat Evav hidup lintas zaman.",
} as const;

export const heritageItems: HeritageItem[] = [
  {
    id: "ohoi-ngilngof",
    era: "Abad ke-17",
    title: "Kampung Adat Ngilngof",
    location: "Kei Besar",
    desc: "Salah satu ohoi tertua yang masih memegang teguh tatanan Rat dan ritual adat warisan leluhur Evav.",
    image: "/images/eksplorasi/desa-wisata-ngilngof-candra-gunawan.jpg",
    imageAlt: "Kampung adat Ngilngof di Kepulauan Kei dengan rumah kayu tradisional",
  },
  {
    id: "gong-dada-wadlau",
    era: "Pusaka Abad",
    title: "Gong Dada Wadlau",
    location: "Tanimbar Kei",
    desc: "Gong perunggu pusaka yang hanya dibunyikan dalam upacara adat dan penobatan rat — suara memanggil leluhur.Instrumen ini sering kali dimainkan dalam pola ritme siklis untuk mengiringi tarian tradisional lokal, seperti Tari Sawat.",
    image: "/images/budaya/kei_gong_dada_ilustration.jpeg",
    imageAlt: "Gong perunggu pusaka Dada Wadlau masyarakat Kepulauan Kei",
  },
  {
    id: "elang-kecil",
    era: "Simbol Marga",
    title: "Elang Kecil",
    location: "Lambang Kei",
    desc: "Burung elang dalam motif ukiran dan tenun yang melambangkan kejayaan serta kebanggaan marga tanah Evav.",
    image: "/images/satwa/kei_elang.png",
    imageAlt: "Elang kecil sebagai lambang marga dalam ukiran Kepulauan Kei",
  },
  {
    id: "karel-monument",
    era: "Era Kemerdekaan",
    title: "Monumen Karel",
    location: "Ohoi Rumadian, Maluku Tenggara",
    desc: "Tugu mengenang perjuangan dan tragedi sejarah yang menyatu dalam ingatan kolektif masyarakat Kei.",
    image: "/images/heritage/karel_monument_tragedy.jpeg",
    imageAlt: "Monumen Karel di Ohoi Rumadian, Maluku Tenggara mengenang perjuangan sejarah Kepulauan Kei",
  },
  {
    id: "evav-legacy",
    era: "Lintas Zaman",
    title: "Warisan Evav",
    location: "Kepulauan Kei",
    desc: "Perpaduan adat, iman, dan kekerabatan yang dirawat turun-temurun menjadi identitas abadi tanah Evav.",
    image: "/images/heritage/raja-kei.png",
    imageAlt: "Representasi warisan budaya lintas zaman Kepulauan Kei",
  },
  {
    id: "kampung-debut",
    era: "Kampung Tua",
    title: "Kampung Debut",
    location: "Kei Kecil",
    desc: "Permukiman adat yang menyimpan cerita pelayaran nenek moyang dan tradisi sambut-tamu yang hangat.",
    image: "/images/heritage/kampung_debut.jpeg",
    imageAlt: "Kampung adat Debut di Kei Kecil dengan suasana permukiman tradisional",
  },
];
