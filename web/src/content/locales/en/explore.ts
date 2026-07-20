// Centralized content for the Kei Islands nature spots for Part V "Nature Tourism"
// on the /explore page. Not hardcoded in components (centralization §4.10).
//
// Coordinates (lat, lng) — sourced per spot:
//  - bair, ngurbloat, hawang, ngurtavur, tanimbar_kei:
//    from web/src/components/JourneyMapSection.tsx (official map coordinates
//    of JourneyMapSection — verified for the Kei Islands).
//  - ohoililir (Ohoililir Beach / Pasir Panjang): estimated from web research
//    (Ohoililir Village, Kei Kecil, near Ngurbloat Beach) — ~ -5.6590, 132.6420.
//  - dullah (Dullah Island): pulley in the strait between Tual & Kei Kecil — ~ -5.6330, 132.7400.
//  - ohoilim (Ohoilim Cave / Ohoiluk, Kei Besar): WWF web research "Ohoi Lerohoilim"
//    west coast of Kei Besar Island — ~ -5.9300, 132.4300.
//  - masbait (Masbait Hill): hill in Kei Kecil near Langgur — ~ -5.6150, 132.6200.
//  - ngiarvarat (Ngiarvarat Beach, Ohoidertawun): Meti Kei Festival location
//    (Antara News 2022) — ~ -5.7000, 132.6200.
//
// mapsUrl uses a keyless Google Maps search URL:
//   https://www.google.com/maps/search/?api=1&query=<lat>,<lng>

export type KategoriAlam = string;

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
    nama: "Ngurbloat Beach",
    kategori: "Beach",
    deskripsi:
      "A stretch of powder-soft white sand 3–5 km long, once crowned by National Geographic as the finest sand beach in Asia. Crystal-clear turquoise water accompanies the dramatic sunset.",
    gambar: "/images/eksplorasi/kei_ngurbloat.png",
    alt: "Ngurbloat Beach — the world's finest sand, Kei Islands",
    lat: -5.6625,
    lng: 132.6362,
  },
  {
    id: "ngurtavur",
    nama: "Ngurtavur Beach",
    kategori: "Snorkeling & Dive",
    deskripsi:
      "A sandbar splits the ocean for 2 km, forming a white-sand path in the middle of clear water. A migration habitat for Australian Pelicans and a snorkeling paradise of coral.",
    gambar: "/images/eksplorasi/kei_ngurtavur.png",
    alt: "Ngurtavur Sandbar — a white-sand path splitting the blue sea",
    lat: -5.7483,
    lng: 132.551,
  },
  {
    id: "hawang",
    nama: "Hawang Cave",
    kategori: "Cave",
    deskripsi:
      "A crystal-blue pool inside a natural karst cave, a clear freshwater spring connected to an underground sea. A legend of a cursed stone accompanies its purity.",
    gambar: "/images/eksplorasi/kei_hawang.png",
    alt: "Hawang Cave — a blue spring pool inside a Kei karst cave",
    lat: -5.7197,
    lng: 132.6781,
  },
  {
    id: "bair",
    nama: "Bair Island",
    kategori: "Island",
    deskripsi:
      "The Raja Ampat of Southeast Maluku. Towering karst cliffs form glass-clear water corridors, with hidden lagoons for swimming and kayaking.",
    gambar: "/images/eksplorasi/kei_bair.jpg",
    alt: "Bair Island — karst cliffs and clear water corridors in the Kei Islands",
    lat: -5.5891,
    lng: 132.6565,
  },
  {
    id: "ohoililir",
    nama: "Ohoililir Beach",
    kategori: "Beach",
    deskripsi:
      "The Pasir Panjang beach cluster at low tide spreads wide, with lush coconut groves and a calm, shallow, peaceful sea. A still-pristine spot for family fishing and swimming.",
    gambar: "/images/eksplorasi/kei_beach.png",
    alt: "The Ohoililir Pasir Panjang beach cluster at low tide, Kei Islands",
    lat: -5.659,
    lng: 132.642,
  },
  {
    id: "kelapa-miring",
    nama: "Kelapa Miring Beach",
    kategori: "Beach",
    deskripsi:
      "Also known as Pantai Ngur Vat Namsir in Ohoi Wab, its hallmark is a row of coconut trees that grow tilted, leaning out to sea above flour-soft white sand and clear blue water. A hidden paradise guarded by the community through the Ohoi Wab Cultural Festival every March.",
    gambar: "/images/eksplorasi/pantai-kelapa-miring.jpg",
    alt: "Kelapa Miring Beach (Ngur Vat Namsir) Ohoi Wab with tilted coconut trees in Kei Kecil",
    lat: -5.712,
    lng: 132.674,
  },
  {
    id: "ngiarvarat",
    nama: "Ngiarvarat Beach",
    kategori: "Beach",
    deskripsi:
      "A beach in Ohoidertawun that becomes the center of the Meti Kei Charm Festival. At extreme low tide, the expanse of sand and shallow water opens for Wer Warat.",
    gambar: "/images/eksplorasi/pantai_ngiarvarat.png",
    alt: "Ngiarvarat Beach Ohoidertawun at extreme low tide (meti) with sunset sky reflection",
    lat: -5.7,
    lng: 132.62,
  },
  {
    id: "tanimbar_kei",
    nama: "Tanimbar Kei",
    kategori: "Island",
    deskripsi:
      "An isolated ancient adat village in West Kei Kecil, holding original customary houses and sacred stone altars. The ancestral cultural heart that guards the Larvul Ngabal law.",
    gambar: "/images/budaya/suku-tanimbar-tropenmuseum.jpg",
    alt: "Tanimbar Kei — ancient adat village, ancestral cultural heart of the Kei Islands",
    lat: -5.9922,
    lng: 132.3275,
  },
];

export const spotAlam: SpotAlam[] = rawSpots.map((spot) => ({
  ...spot,
  mapsUrl: buildMapsUrl(spot.lat, spot.lng),
}));

export const kategoriAlam: ("Semua" | KategoriAlam)[] = [
  "All",
  "Beach",
  "Island",
  "Snorkeling & Dive",
  "Cave",
  "Viewpoint",
];
