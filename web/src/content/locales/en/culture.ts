// Centralized content for the /culture page (Culture & History of the Kei Islands).
// Content moved from components here following the centralization pattern
// (see eksplorasi.ts / satwaEndemik.ts). Guarded facts (culture.md §5):
//   Larvul Ngabal (oral), Ain Ni Ain, Belis, Tenun Ikat Elat + IG 2024,
//   Islam 1252M (Rat Nara, Tahiyat Yemru, Langgiar Fer).
// All UI text in English; Kei vocabulary kept as accent (GRAND_DESIGN §16).
//
// ⚠️ Validate vocabulary & historical facts with local Kei informants before production
// (GRAND_DESIGN §2.5, §5.3, §6.8; culture.md §7.3).

// ── Hero (§2 PageHero split + §3.1 Hero Budaya) ──────────────────────────────
export const heroBudaya = {
  eyebrow: "CULTURE & HISTORY",
  title: "Symphony of Life",
  titleAccent: "Upon White Sands",
  subtitle:
    "Come to know the soul of the Kei Islands, where custom, faith, and kinship blend into one peaceful breath of civilization.",
  intro:
    "At the far eastern edge of the Archipelago, Kei holds a wealth no map can measure. Unwritten law passed mouth to mouth, a bride price that is more than a dowry, and centuries of living side by side in cross-religious peace. Come, trace the noble path that makes Evav a home for many hearts.",
  image: "/images/budaya/ritual-penyambutan-tamu-rinin.jpg",
  imageAlt:
    "Cultural ritual of the Kei Islands community at golden hour — golden-red traditional attire welcoming guests",
  scrollHint: "Dive into Kei Culture",
  ariaLabel: "Culture & History of the Kei Islands",
  quote: {
    text: "Ain Ni Ain — we are all brothers and sisters, one owns one. The other is not a stranger, but a blood sibling.",
    attribution: "Life philosophy of the Kei Islands community",
  },
} as const;

// ── Larvul Ngabal (§3.2) ─────────────────────────────────────────────────────
export const larvulNgabal = {
  eyebrow: "LARVUL NGABAL",
  title: "The Breath that Keeps Kei at Peace",
  tagline:
    "Red blood and the Balinese spear unite into one ancestral promise.",
  intro:
    "More than a rule, Larvul Ngabal is the breath that keeps Kei at peace — red blood and the Balinese spear unite into a promise: guard life, family, and land with dignity.",
  etymology: {
    // Larvul = lar (blood) + vul (red); Ngabal = nga (spear) + bal (Bali)
    text: "This highest customary law of the Kei people lives and is passed down orally from generation to generation. Its name is born from two laws combined: Larvul — lar (blood) + vul (red), \u201Cburning red blood\u201D — and Ngabal — nga (spear) + bal (Bali), \u201CBali spear\u201D the guardian of peace and noble dignity. Larvul was born from the Ur Siw / Lor Siw alliance (9 Rat of Elaar, Kei Kecil); Ngabal from Lor Lim (5 Rat of Lerohoilim, Kei Besar); both were unified into one customary law after a peace treaty.",
  },
  image: "/images/budaya/landmark_langgur_kei_larvul_spear.jpeg",
  imageAlt:
    "Gold-tipped customary spear with a red blood ribbon — symbol of the Larvul Ngabal law of the Kei Islands",
  pillars: [
    {
      id: "nevnev",
      title: "Nevnev",
      meaning: "Law of Humanity · Articles 1\u20134",
      desc: "Protects the life, honor, and dignity of every human being. Violence and murder are grave violations — life is worth more than wealth.",
    },
    {
      id: "hanilit",
      title: "Hanilit",
      meaning: "Law of Family & Marriage · Articles 5\u20136",
      desc: "Regulates the rites of marriage, respect for women, and the yanur\u2013mangohoi kinship bond that upholds the family's dignity.",
    },
    {
      id: "hawear-balwirin",
      title: "Hawear Balwirin",
      meaning: "Law of Ownership & Justice · Article 7",
      desc: "Regulates property rights and social justice, symbolized by hawear — a stop sign (sasi) that guards shared boundaries and sustainability.",
    },
  ],
  historicalNote:
    "Larvul Ngabal once served as a conflict dampener between religious communities in Kei — the 1999 conflict was resolved through a customary ceremony on 15 May 1999 with a sasi ritual closing the conflict. To this day it is used as a family-based dispute settlement mechanism, not merely a written rule.",
  // 7 articles of Larvul Ngabal (oral tom-tad; refs Rahail 1993, Resubun 2007,
  // Ohoitimur 1996, IUSTUM journal 2022). Larvul (Lor Siw/9 Rat, Kei Kecil)
  // contributed 4 articles of Nevnev; Ngabal (Lor Lim/5 Rat, Kei Besar) contributed
  // 2 articles of Hanilit + 1 article of Hawear Balwirin.
  pasalList: [
    {
      nomor: 1,
      kelompok: "Nevnev",
      istilahKei: "Manus Ngafau",
      artiKei: "Protecting Life",
      judul: "Guarding Life & Body",
      desc: "Everyone has the right to live and to the safety of their body. Threatening, injuring, or taking a life is the gravest violation — life stands above wealth.",
    },
    {
      nomor: 2,
      kelompok: "Nevnev",
      istilahKei: "Farira",
      artiKei: "Murder",
      judul: "The Prohibition of Killing",
      desc: "Murder (farira) is redeemed with a life replacement (vut wau / vuut faak) of gold, woven cloth, and livestock handed to the victim's family.",
    },
    {
      nomor: 3,
      kelompok: "Nevnev",
      istilahKei: "Wel Reim",
      artiKei: "Torture",
      judul: "The Prohibition of Torture",
      desc: "Physical violence and torture (wel reim) are strictly forbidden. Customary law guarantees the bodily integrity of every citizen under firm protection.",
    },
    {
      nomor: 4,
      kelompok: "Nevnev",
      istilahKei: "Rum Raad",
      artiKei: "Theft",
      judul: "The Prohibition of Stealing",
      desc: "Anyone's property is protected by custom. Theft (rum raad) carries a heavy fine — gold, woven cloth, and livestock — as compensation to the owner.",
    },
    {
      nomor: 5,
      kelompok: "Hanilit",
      istilahKei: "Manyer Aman",
      artiKei: "Marriage & Honor",
      judul: "Marriage Rites & Respect for Women",
      desc: "Regulates the marriage bond and upholds the honor of women (manyer aman). Extended families are united through belis in dignity, not merely a dowry.",
    },
    {
      nomor: 6,
      kelompok: "Hanilit",
      istilahKei: "Yanur–Mangohoi",
      artiKei: "Kinship Bond",
      judul: "Nurturing Kinship",
      desc: "Maintains the yanur (father's line) and mangohoi (mother's line) kinship bonds so the family's dignity stays whole. Breaking this bond tears the social order.",
    },
    {
      nomor: 7,
      kelompok: "Hawear Balwirin",
      istilahKei: "Hawear Balwirin",
      artiKei: "Boundary & Justice",
      judul: "Ownership & Justice",
      desc: "Regulates property rights and social justice. Hawear — a stop sign (sasi) — guards shared boundaries and sustainability; violation (sasa sor fit) is redeemed with a customary fine.",
    },
  ],
} as const;

// ── Shared UI strings (§2.4 / §3 · section labels & a11y) ──────────────────────
// Moved out of lang ternaries in components so no language leaks into JSX.
export const cultureCommon = {
  larvul: {
    pillarsHeading: "Three Value Clusters",
    pasalHeading: "Seven Sacred Articles",
    pasalIntro:
      "Larvul Ngabal consists of seven articles passed down orally. The first four articles come from the Larvul law (Nevnev), the remaining three from the Ngabal law (Hanilit & Hawear Balwirin) — united in one ancestral promise.",
    historicalRoleEyebrow: "Historical Role",
  },
  ekspresi: {
    swipeHint: "Swipe to explore: ",
    tablistLabel: "List of Kei cultural expressions",
    videoPlay: "Play video {title}",
    videoPause: "Pause video {title}",
  },
  audio: {
    playSong: "Play song {title}",
    coverOf: "Cover of {title}",
    playlist: "Playlist",
    mute: "Mute",
    unmute: "Unmute",
  },
} as const;

export type LarvulPasal = {
  nomor: number;
  kelompok: "Nevnev" | "Hanilit" | "Hawear Balwirin";
  istilahKei: string;
  artiKei: string;
  judul: string;
  desc: string;
};

// ── Philosophy Grid / Bento (§3.3) ─────────────────────────────────────────────
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
  eyebrow: "ONE EGG, A THOUSAND RELIGIONS",
  title: "The Philosophy that Weaves Kei",
  intro:
    "More than mere tradition, these values are the pulse that keeps Kei at peace. The four pillars below explain why centuries have not been long enough to divide the kinship of Evav.",
  tiles: [
    {
      id: "ain-ni-ain",
      icon: "HeartHandshake",
      title: "Ain Ni Ain",
      desc: "\u201COne owns one\u201D — everyone sees the other (the stranger) as a blood sibling. Strengthened by the images of Vuut Ain Mehe Ni Ngifun and Manut Ain Mehe Ni Tilur: all Kei people are siblings through one lineage. Its manifestation lives in Maren — cross-faith mutual cooperation.",
      image: "/images/budaya/masyarakat-kei-thespiceroute.jpg",
      imageAlt:
        "Portrait of the Kei Islands community with a proud expression — the embodiment of Ain Ni Ain brotherhood",
      hero: true,
    },
    {
      id: "belis",
      icon: "Gift",
      title: "Belis (Bride Price)",
      desc: "Not merely a dowry, but an honoring: Lela (copper cannon), gong, customary gold, and woven cloth that bind two families in dignity.",
      image: "/images/budaya/belis-mas-kawin.png",
      imageAlt: "Customary gold coins, gong, and lela as symbols of the Kei bridal belis tradition",
    },
    {
      id: "tenun",
      icon: "Palette",
      title: "Tenun Ikat Elat",
      desc: "A cloth typical of Ohoi Elat whose motifs reflect local life and customary status — worn in ceremonies and forming part of the belis.",
      image: "/images/budaya/tenun-ikat-elat-kompas.png",
      imageAlt: "Welat ikat woven cloth typical of Ohoi Elat, Kei Islands, with motifs of local life",
    },
    {
      id: "islam-1252",
      icon: "Landmark",
      title: "Islam 1252 AD",
      desc: "The trace of Islam's arrival in Kei since 1252 AD through Rat Nara, Tahiyat Yemru, and Langgiar Fer — the beginning of cross-faith harmony that endures to this day.",
      image: "/images/budaya/jejak-islam-masjid-ohoitom-tahayad.png",
      imageAlt: "The ancient Ohoitom Mosque as a symbol of the Islamic heritage and religious harmony in Kei",
    },
  ] satisfies FilosofiTile[],
  cta: {
    title: "Want to Get Closer?",
    desc: "Connect with the Evav Family to plan an authentic, local-friendly, and deep cultural journey.",
    buttonText: "Contact the Evav Family",
    link: "/interaction",
  },
} as const;

// ── Cultural Expression Gallery (§3.4 · Tangible) ─────────────────────────────────
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
  eyebrow: "CULTURAL EXPRESSION",
  title: "Danced, Sung, Worn",
  intro:
    "Kei culture is not kept in a museum, but danced, sung, and worn. Here is the pulse you can see and feel.",
  kelompokList: [
    {
      id: "Tari",
      icon: "Sparkles",
      label: "Dance",
      desc: "Social and martial dances that weave kinship and peace.",
      items: [
        {
          id: "tari-sawat",
          icon: "Sparkles",
          kelompok: "Tari",
          title: "Sawat Dance",
          desc: "A social dance from Southeast Maluku served to welcome guests and weave kinship, friendship, and peace. Breathing Islam with Arab\u2013Malay nuances, Sawat is accompanied by rebana, tifa, and flute — and often collaborates with Tifa Totobuang (Christian residents) as a symbol of cross-faith tolerance.",
          images: [
            "/images/budaya/tari-sawat-infopublik.jpg",
            "/images/budaya/tari-syariat-kemdikbud.png",
          ],
          imageAlt:
            "Sawat dancers of the Kei Islands in traditional attire welcoming guests with graceful movements",
        },
        {
          id: "tari-belan",
          icon: "Boat",
          kelompok: "Tari",
          title: "Belan Dance",
          desc: "Belan is the traditional Kei sailing boat that once ferried people between islands. Now belan is modified into a boat-racing sport in the Meti Kei Charm Festival — a shared pulse that upholds the customary and cultural values of Evav upon the water.",
          images: [
            "/images/budaya/lomba-perahu-belan-rri.jpg",
            "/images/budaya/perahu_belan_race_kei.png",
          ],
          imageAlt:
            "Traditional belan boat race of the Kei Islands during the Meti Kei Charm Festival",
          video: "/videos/tari-belan.mp4",
        },
      ],
    },
    {
      id: "Alat Musik",
      icon: "Music",
      label: "Musical Instruments",
      desc: "Gongs, drums, and flutes that are the pulse of every ceremony and guest welcome.",
      items: [
        {
          id: "alat-musik",
          icon: "Music",
          kelompok: "Alat Musik",
          title: "Dada, Tifa & Savarngil",
          desc: "Dada (12\u201315 inch copper gong), Tiva/Tifa (cowhide drum from hollowed wood), and Savarngil (six-hole bamboo flute) are the pulse of tradition accompanying dance, ceremony, and guest welcomes.",
          images: [
            "/images/budaya/kei_dada_tifa.png",
            "/images/budaya/kei_gong_dada_ilustration.jpeg",
          ],
          imageAlt:
            "Traditional Kei instruments — copper Dada gong and cowhide Tifa drum",
        },
      ],
    },
    {
      id: "Busana Adat",
      icon: "Shirt",
      label: "Traditional Attire",
      desc: "Red-gold attire that pins courage, honor, and the guarding of customary law.",
      items: [
        {
          id: "busana-adat",
          icon: "Shirt",
          kelompok: "Busana Adat",
          title: "Traditional Attire",
          desc: "Men wear Benian Vuil-vuil, Sarwo Bloat Ngametan trousers, and a red vuil-vuil cap; women wear Siting Vuil-vuil, Sbo, and a gold tom-mas-mas shawl. Red means courage and the guarding of customary law; gold means the warmth of love and honor.",
          images: [
            "/images/budaya/kei-busana-adat-arnol-arnol-pinterest.png",
          ],
          imageAlt:
            "Traditional Kei Islands attire in red and golden yellow — symbol of courage and honor",
        },
      ],
    },
    {
      id: "Kerajinan Budaya",
      icon: "Palette",
      label: "Cultural Crafts",
      desc: "Weavings and handicrafts that hold local-life motifs and customary status.",
      items: [
        {
          id: "tenun-elat",
          icon: "Palette",
          kelompok: "Kerajinan Budaya",
          title: "Tenun Ikat Elat",
          desc: "The ikat weave typical of Ohoi Elat holds motifs reflecting local life and customary status. This cloth is worn in customary ceremonies and forms part of the bridal price (belis).",
          images: [
            "/images/budaya/tenun-ikat-elat-kompas.png",
            "/images/budaya/tenun_elat_watermark.svg",
          ],
          imageAlt:
            "Detail of the Ohoi Elat ikat weave, Kei Islands, representing adat textile heritage",
        },
        {
          id: "batik-kei",
          icon: "Palette",
          kelompok: "Kerajinan Budaya",
          title: "Kei Batik",
          desc: "Batik typical of the Kei Islands blending motifs of the sea, coral reefs, and the natural wealth of Evav into a length of cloth. Canting and wax trace the narrative of the islands, becoming both a souvenir and a living cultural identity of Kei today.",
          images: [
            "/images/budaya/kei_batik.png",
          ],
          imageAlt:
            "Kei Islands sea-motif batik — representation of Evav cultural textile heritage",
        },
      ],
    },
    {
      id: "Nyanyian & Sastra Lisan",
      icon: "Mic2",
      label: "Song & Oral Literature",
      desc: "Hymns and customary pantun as a spiritual bridge across generations.",
      items: [
        {
          id: "nyanyian-sastra",
          icon: "Mic2",
          kelompok: "Nyanyian & Sastra Lisan",
          title: "Song & Oral Literature",
          desc: "Hymns and customary pantun become a spiritual bridge across generations — from tiva ngelngel (songs of joy) to old pantun accompanying sea rituals.",
          images: ["/images/budaya/kei_language_symbol.png"],
          imageAlt:
            "Symbol of the Kei language and oral literature — a spiritual bridge across generations",
          tracks: [
            {
              id: "ning-nuhu-tanat",
              title: "Ning Nuhu Tanat",
              artist: "Kei Traditional Music",
              youtubeId: "TXt9B-xdM_o",
              cover: "/images/budaya/kei_language_symbol.png",
            },
            {
              id: "vadat-vil-vil",
              title: "Vadat Vil Vil",
              artist: "Kei Traditional Music",
              youtubeId: "AMmRGr8CjGE",
              cover: "/images/budaya/kei_language_symbol.png",
            },
            {
              id: "meti-kei",
              title: "Meti Kei",
              artist: "Kei Traditional Music",
              youtubeId: "efB4EbP9EtY",
              cover: "/images/budaya/ritual-penyambutan-tamu-rinin.jpg",
            },
            {
              id: "arwan-sir-sir",
              title: "Arwan Sir Sir",
              artist: "Kei Traditional Music",
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
    "Kei culture is not an artifact of the past — it is a living guide, passed from mouth to mouth, from hand to hand.",
  attribution: "Heritage for the future of the Evav tradition",
  ariaLabel: "A breather in Kei culture",
  ctaLabel: "Explore the Kei Timeline",
  ctaHref: "#linimasa-kei",
} as const;

export const warisanTakbenda = {
  eyebrow: "INTANGIBLE HERITAGE",
  title: "What is Unseen, Yet Always Alive",
  metiIntro:
    "Every October, the Kei sea unveils its bed. Communities descend together to tend what gives them life — harmony between humans and nature.",
  items: [
    {
      id: "bahasa",
      icon: "Languages",
      title: "Kei Language (Evav)",
      desc: "A core identity and a dynamic means of communication. Vocabulary such as Marhoba, Ain Ni Ain, Yelim, Sasi, Maren, and Enma still live as accents in the daily life of the Kei people.",
      image: "/images/budaya/kei_language_symbol.png",
      imageAlt:
        "Symbol of the Kei regional language (Evav) — the core identity of the Kei Islands community",
    },
    {
      id: "cerita-rakyat",
      icon: "BookOpen",
      title: "Folklore & Legends",
      desc: "A heritage of oral narratives that shape moral values — including the tom-tad (oral history) of the origin of Larvul Ngabal and the tales of migrant ancestors (mel) merging with native peoples (ren).",
      image: "/images/budaya/kei_warriors_dance.png",
      imageAlt:
        "Kei war dancers — guardians of the folklore and ancestral legends of Evav",
    },
    {
      id: "meti-sasi",
      icon: "Fish",
      title: "Meti & Sea Sasi Tradition",
      desc: "Meti — the extreme low tide each October\u2013November, receding hundreds of meters. Communities harvest the sea through Wer Warat / Hair Yot (pulling a yellow-palm-frond rope to herd fish ashore), reinforced by sasi. Celebrated in the Meti Kei Charm Festival.",
      image: "/images/eksplorasi/wer_warat_custom.png",
      imageAlt:
        "Communities cooperatively pulling the yellow palm-frond rope (wer warat) herding fish during the extreme Meti Kei low tide",
    },
  ] satisfies WarisanItem[],
} as const;

// ── Festival Pesona Meti Kei (§3.5 · Tradition → Driver) ───────────────────
// Philosophy: intangible heritage (meti/sasi) "leveling up" into a cultural
// institution that sustains the people. Four pillars: born as an event (2017),
// scaled up nationally (KEN, 6× consecutively from 110 events), a promotional
// gateway for the region, and a multiplier effect on the community's economic chain.
// ⚠️ Validate figures (start year, number of KEN selections) with local informants
// & official Kemenparekraf sources before production.
export type FestivalPilar = {
  id: string;
  icon: "CalendarHeart" | "Award" | "MapPin" | "Users";
  title: string;
  desc: string;
};

export const festivalMetiKei = {
  eyebrow: "METI KEI CHARM FESTIVAL",
  title: "From a Community Tradition to a National Stage",
  intro:
    "When the Kei sea unveils its bed, the people do not merely descend to harvest — they celebrate. Since being packaged into an annual festival, the daily pulse of Evav has become a cultural stage that sustains many families: from fishers and weavers to guides, UMKM players, and creative communities.",
  image: "/images/budaya/festival-pesona-meti-kei-2025-triptrus.jpg",
  imageAlt:
    "The festive Meti Kei Charm Festival — communities and tourists celebrating the extreme low tide in the Kei Islands",
  // Highlight statistics (badge above image / spotlight card)
  stat: {
    value: "6×",
    label: "Consecutively selected for Kemenparekraf's Kharisma Event Nusantara (KEN)",
    context: "from 110 top events across Indonesia",
  },
  pilar: [
    {
      id: "diangkat-jadi-event",
      icon: "CalendarHeart",
      title: "Raised into a Cultural Event",
      desc: "Since first celebrated in Ngilngof (2017), the meti tradition was packaged into an annual festival — turning a unique daily community activity into a marketable tourism attraction.",
    },
    {
      id: "agenda-nasional",
      icon: "Award",
      title: "Routine National-Scale Agenda",
      desc: "Fully supported by district, provincial, and central government through Kemenparekraf's Kharisma Event Nusantara (KEN) — selected 6× consecutively from 110 events across Indonesia. This cross-level support ensures the festival runs year after year and can be relied on by tourists.",
    },
    {
      id: "gerbang-promosi",
      icon: "MapPin",
      title: "Kei Tourism Promotion Gateway",
      desc: "The festival invites tourists to explore other destinations in Kei at the same time — making it the entry point for promoting the whole region, not just a single-point event.",
    },
    {
      id: "multiplier-effect",
      icon: "Users",
      title: "Multiplier Effect on the Community",
      desc: "Full involvement of local talent, UMKM players, and creative communities spreads the economic circulation across many sectors at once: culinary, crafts, local transport, lodging, and guiding services. It is not one organizer who profits, but the community's economic chain moving together every year.",
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
  eyebrow: "KEI TIMELINE",
  title: "The Tracks of Time that Shape Evav",
  intro:
    "From the arrival of Islam centuries ago to woven cloth rediscovered by the world — these are the milestones that tie Kei's past and future together.",
  nodes: [
    {
      id: "islam-1252",
      year: "1252 AD",
      title: "Arrival of Islam in Kei",
      desc: "Islam entered through Rat Nara, Tahiyat Yemru, and Langgiar Fer — the beginning of the cross-faith harmony characteristic of the Kei Islands community.",
    },
    {
      id: "formulasi-larvul",
      year: "Ancestors",
      title: "Formulation of Larvul Ngabal",
      desc: "The laws Larvul (Lor Siw, 9 Rat) and Ngabal (Lor Lim, 5 Rat) were unified into one oral customary law after a peace treaty between alliances.",
    },
    {
      id: "perdamaian-1999",
      year: "15 May 1999",
      title: "Customary Peace Ceremony",
      desc: "Inter-religious conflict was resolved through a customary ceremony with a sasi ritual closing the conflict — proof of Larvul Ngabal as a dampener of division.",
    },
    {
      id: "festival-meti",
      year: "Now",
      title: "Meti Kei Charm Festival",
      desc: "A celebration of extreme low tide now on the national tourism calendar — a stage of local wisdom guarding the sustainability of the marine ecosystem.",
    },
    {
      id: "napak-tilas-raja",
      year: "Adat",
      title: "Footsteps of the Manyeuw King Installation",
      desc: "The coronation of the Rat (King) of the Manyeuw Kingdom from the Watratan Clan is held in the Rumadian Forest — a sacred heirloom where ancestors swore to affirm the sovereignty of Ratskap Manyeuw Rumadian on the land of Evav.",
    },
    {
      id: "tenun-2024",
      year: "2024",
      title: "Tenun Ikat Elat Rediscovered",
      desc: "The motifs of the ikat weave typical of Ohoi Elat found a new stage — from customary ceremonies to social media (Instagram) spotlights introducing it to the younger generation.",
    },
  ] satisfies TimelineNode[],
} as const;
