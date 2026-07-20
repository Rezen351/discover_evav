// Centralized data for iconic/typical Kei Islands fauna used by the "Satwa Endemik Kei"
// section on the /explore page. Not hardcoded in the component (centralization §4.10).
//
// RESEARCH SOURCES (web search, 2026-07-18):
//  - Australian Pelican (Pelecanus conspicillatus): Liputan6 (2023), Kompas (2020),
//    Antara (2022), TravelAgent — migrates & stops over at Pasir Timbul Ngurtavur,
//    Woha Island, Kei Islands, during meti (extreme low tide).
//  - Cuscus / Phalanger spp.: BRIN (2023), Detik Travel — endemic fauna of
//    Eastern Indonesia/Maluku, nocturnal arboreal animal (blue-eyed cuscus Phalanger
//    matabiruensis endemic to Maluku).
//  - Sea Turtle / Cheloniidae: Mongabay (2019), WWF Indonesia — frequently found in
//    the Kei Islands in certain seasons; marine sasi conservation issue.
//  - Dolphin / Delphinidae: ecotourism in Kei Islands waters (Banda Sea).
//  - Reef fish & corals: Kei Islands coral reef ecosystem (Ngurtavur, Bair).
//  - Kai endemic birds (Kai Coucal / Centropus spilopterus; Kai White-eye
//    Zosterops grayi): Wikipedia, eBird, Avibase, Manoa Kei — ~10 endemic species of
//    the Kai Islands, including endemic subspecies.
//
// Images: local assets in web/public/images/satwa/ (no new remote host).

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
    nama: "Australian Pelican",
    namaLatin: "Pelecanus conspicillatus",
    status: "Seasonal Migrant",
    habitat: "Ngurtavur Sandbar at low tide (meti)",
    lokasi: "Ngurtavur Sandbar, Woha Island, Kei Kecil",
    deskripsi:
      "Each meti, flocks of Australian pelicans arrive from the southern continent and stop over at Ngurtavur Sandbar, turning the white sands stretching across the open sea into their quiet resting home.",
    gambar: "/images/eksplorasi/pelikan_migration_australia.png",
    alt: "A flock of Australian pelicans migrating across the clear waters of Ngurtavur Sandbar, Kei Islands",
  },
  {
    id: "kuskus",
    nama: "Cuscus",
    namaLatin: "Phalanger spp.",
    status: "Endemic",
    habitat: "Kei coastal forests & coconut groves",
    lokasi: "Coastal forests & coconut groves, Kei Kecil Island",
    deskripsi:
      "This shy tree-dweller stirs at moonrise, creeping slowly along the coconut branches. For the Kei people, the cuscus is a forest sibling that is protected—not merely game.",
    gambar: "/images/satwa/kei_kuskus.png",
    alt: "A cuscus (phalanger) climbing a coconut branch at night, Kei Islands",
  },
  {
    id: "penyu",
    nama: "Sea Turtle",
    namaLatin: "Cheloniidae",
    status: "Local & Migrant",
    habitat: "Kei sandy shores & reefs",
    lokasi: "Nesting beaches of Hoat Island & West Kei Kecil waters",
    deskripsi:
      "Turtles return to Kei's sands to nest in certain seasons. The sea protected by sasi makes them still feel they are coming home to a safe haven.",
    gambar: "/images/satwa/kei_seaturtle.png",
    alt: "A sea turtle swimming calmly in the clear waters of the Kei Islands",
  },
  {
    id: "lumba-lumba",
    nama: "Dolphin",
    namaLatin: "Delphinidae",
    status: "Local",
    habitat: "Kei Banda Sea waters",
    lokasi: "Banda Sea, Kei Kecil–Dullah strait",
    deskripsi:
      "In the blue strait of the Banda Sea, dolphins often keep fishers' boats company, playing in the waves. Their presence is a sign that the sea remains healthy and full of life.",
    gambar: "/images/satwa/kei_dolphin.png",
    alt: "Dolphins swimming in the Banda Sea waters of the Kei Islands",
  },
  {
    id: "ikan-karang",
    nama: "Reef Fish",
    namaLatin: "Pomacentridae & sp.",
    status: "Local",
    habitat: "Ngurtavur & Bair Island coral reefs",
    lokasi: "Ngurtavur & Bair Island coral reefs",
    deskripsi:
      "Thousands of colorful fish inhabit Kei's still-pristine coral gardens. They are the soul of the reef, feeding and giving life to the entire coastal ecosystem.",
    gambar: "/images/satwa/kei_coral.png",
    alt: "A school of colorful reef fish among the coral reefs of the Kei Islands",
  },
  {
    id: "burung-endemik-kai",
    nama: "Kai Endemic Birds",
    namaLatin: "Centropus spilopterus",
    status: "Endemic",
    habitat: "Kei Besar–Kei Kecil lowland forests & shrubs",
    lokasi: "Lowland forests of Kai Besar & Kei Kecil Islands",
    deskripsi:
      "The Kai Islands nurture a dozen bird species found nowhere else, such as the Kai Coucal and Kai White-eye. Their songs are the true voice of Evav's forests.",
    gambar: "/images/satwa/kei_bubut.png",
    alt: "A Kai Coucal (Centropus spilopterus) perched on a forest branch in Evav",
  },
  {
    id: "kacamata-kei",
    nama: "Kei White-eye",
    namaLatin: "Zosterops grayi",
    status: "Endemic",
    habitat: "Secondary forests & shrubs",
    lokasi: "Highland forests, Kai Besar Island",
    deskripsi:
      "A tiny bird with its signature white spectacle-ring, living in flocks. Their bright, cheerful melody becomes the morning music of the Kai Besar wilderness.",
    gambar: "/images/satwa/kei_kacamata_bird.png",
    alt: "A tiny Kei White-eye (Zosterops grayi) perched on a small twig",
  },
  {
    id: "kakatua",
    nama: "Yellow-crested Cockatoo",
    namaLatin: "Cacatua sulphurea",
    status: "Protected",
    habitat: "Lowland primary forest canopy",
    lokasi: "Deep forests, Kei Besar Island",
    deskripsi:
      "A clever bird with snow-white plumage and a magnificent yellow crest it can raise. Its presence symbolizes the exotic elegance of the wildlife of the skies above Evav.",
    gambar: "/images/satwa/kei_kakatua.png",
    alt: "A yellow-crested cockatoo gracefully perched atop a tropical tree branch",
  },
  {
    id: "elang-laut",
    nama: "White-bellied Sea Eagle",
    namaLatin: "Haliaeetus leucogaster",
    status: "Protected",
    habitat: "Coastlines & sea cliffs",
    lokasi: "Bair Island area & Kei Kecil Cape",
    deskripsi:
      "The master of Kei's marine skies with sturdy, broad wings. It glides high, scanning the coast for fish in the clear waters—a symbol of the noble spirit of the clans.",
    gambar: "/images/satwa/kei_elang.png",
    alt: "A white-bellied sea eagle flapping its broad wings above Kei waters",
  },
  {
    id: "mangrove-kei",
    nama: "Mangrove Forest",
    namaLatin: "Rhizophora spp.",
    status: "Guardian Ecosystem",
    habitat: "Coastal intertidal mud zone",
    lokasi: "Ohoi Ruat Mangrove Forest, Kei Kecil",
    deskripsi:
      "A sturdy green fortress that absorbs ocean waves and protects the land of Evav. The weave of mangrove roots becomes a natural nursery for crabs, shrimp, and young reef fish.",
    gambar: "/images/satwa/kei_mangrove.png",
    alt: "A lush green mangrove forest ecosystem along the Kei intertidal coast",
  },
  {
    id: "kangguru-hutan",
    nama: "Forest Wallaby / Pademelon",
    namaLatin: "Thylogale brunii",
    status: "Protected",
    habitat: "Lowland rainforest floor",
    lokasi: "Wilderness forests, Kei Besar Island",
    deskripsi:
      "A small marsupial native to the Southeast Maluku islands, agile among the undergrowth. Its presence proves the uniqueness of the Wallacea–Sahul transitional fauna of the land of Evav.",
    gambar: "/images/satwa/kei_kangguru.png",
    alt: "A forest wallaby (pademelon) standing alert on the floor of a Kei tropical forest",
  },
];
