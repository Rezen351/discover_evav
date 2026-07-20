// Centralized content for the HeritageSection on the landing page (Ancestral
// Heritage of the Kei Islands). Content separated from the component following
// the centralization pattern (see budaya.ts, taste.ts, eksplorasi.ts). This
// section focuses on MATERIAL HERITAGE & PLACES: adat villages (ohoi), heirloom
// objects, and historical traces — distinct from BudayaAdat (customary law) and
// FunFact (nature/culture/fauna/culinary tabs).
// All UI text in English; Kei vocabulary kept as accent (GRAND_DESIGN §16).
//
// ⚠️ Validate village names & historical facts with local Kei informants before production.

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
  eyebrow: "ANCESTRAL HERITAGE",
  title: "Traces that Never",
  titleAccent: "Fade into the Sand",
  subtitle:
    "Upon this white sand, hundreds of adat villages (ohoi) and heirloom objects still hold the breath of the ancestors. Let us trace the heritage that keeps Evav alive across the ages.",
} as const;

// Closing quote + explore label for the landing-page HeritageSection.
export const heritageClosing = {
  quote:
    "Every adat village is a living library. There, stone, gong, and song still speak in the ancestral tongue that never truly fades.",
  attribution: "— Heritage of the Land of Evav",
  exploreLabel: "Explore",
} as const;

export const heritageItems: HeritageItem[] = [
  {
    id: "ohoi-ngilngof",
    era: "17th Century",
    title: "Ngilngof Adat Village",
    location: "Kei Besar",
    desc: "One of the oldest ohoi that still holds firmly to the Rat order and the ancestral adat rituals of Evav.",
    image: "/images/eksplorasi/desa-wisata-ngilngof-candra-gunawan.jpg",
    imageAlt: "Ngilngof adat village in the Kei Islands with traditional wooden houses",
  },
  {
    id: "gong-dada-wadlau",
    era: "Heirloom Era",
    title: "Gong Dada Wadlau",
    location: "Tanimbar Kei",
    desc: "A bronze heirloom gong sounded only in adat ceremonies and royal coronations — a voice calling the ancestors. This instrument is often played in cyclical rhythms to accompany local traditional dances, such as the Sawat Dance.",
    image: "/images/budaya/kei_gong_dada_ilustration.jpeg",
    imageAlt: "The Dada Wadlau bronze heirloom gong of the Kei Islands community",
  },
  {
    id: "elang-kecil",
    era: "Clan Symbol",
    title: "Elang Kecil",
    location: "Kei Symbol",
    desc: "An eagle in carving and weaving motifs symbolizing the glory and pride of the land's clan in Evav.",
    image: "/images/satwa/kei_elang.png",
    imageAlt: "The small eagle as a clan symbol in Kei carving",
  },
  {
    id: "karel-monument",
    era: "Independence Era",
    title: "Karel Monument",
    location: "Ohoi Rumadian, Southeast Maluku",
    desc: "A monument remembering the struggle and historical tragedy intertwined in the collective memory of the Kei people.",
    image: "/images/heritage/karel_monument_tragedy.jpeg",
    imageAlt: "The Karel Monument in Ohoi Rumadian, Southeast Maluku, remembering Kei's historical struggle",
  },
  {
    id: "evav-legacy",
    era: "Across the Ages",
    title: "Evav Legacy",
    location: "Kei Islands",
    desc: "A blend of adat, faith, and kinship nurtured across generations into the eternal identity of the land of Evav.",
    image: "/images/heritage/raja-kei.png",
    imageAlt: "Representation of the cross-era cultural heritage of the Kei Islands",
  },
  {
    id: "kampung-debut",
    era: "Old Village",
    title: "Debut Village",
    location: "Kei Kecil",
    desc: "An adat settlement holding stories of ancestors' voyages and a warm guest-welcoming tradition.",
    image: "/images/heritage/kampung_debut.jpeg",
    imageAlt: "Debut adat village in Kei Kecil with a traditional settlement atmosphere",
  },
];
