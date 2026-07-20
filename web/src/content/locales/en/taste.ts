// Centralized content for the /taste page (Cuisine & Flavors of the Kei Islands).
// Content moved from components here following the centralization pattern
// (see budaya.ts / eksplorasi.ts). This page carries "Kei Flavor" — an authentic
// culinary narrative: Enbal, Colo-colo, Sagu, Pisang, and the philosophy of
// eating together (Yelim, sea sasi).
// All UI text in English; Kei vocabulary kept as accent (GRAND_DESIGN §16).
//
// ⚠️ Validate culinary vocabulary & facts with local Kei informants before production
// (GRAND_DESIGN §2.5, §5.3, §6.8; see similar note in budaya.ts).

// ── Hero (dark cinematic, id=taste-hero) ──────────────────────────────────────
export const heroTaste = {
  eyebrow: "KEI FLAVOR",
  title: "A Taste from",
  titleAccent: "White Sands",
  subtitle:
    "In Kei, eating is not merely filling the belly — it is a way of welcoming. From Enbal-spiced grilled fish to the freshness of Colo-colo, every bite holds a story of the sea and kinship. Sit upon the sand, as a friend who has been there.",
  image: "/images/kuliner/kei_food_atmosfer.png",
  imageAlt:
    "Culinary atmosphere of the Kei Islands upon white sand — fresh seafood with a turquoise sea backdrop",
  scrollHint: "Dive into Kei Flavor",
  quote: {
    text: "To give with hand and heart — that is how Kei invites a guest to the same table.",
    attribution: "Yelim — the Kei people's philosophy of giving",
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
  eyebrow: "SIGNATURE KEI DISHES",
  title: "What Makes the Tongue Remember Kei",
  intro:
    "The sea gives, sagu sustains, spices bring to life. These are the dishes usually grilled over embers and enjoyed together at the water's edge.",
  dishes: [
    {
      id: "enbal",
      name: "Enbal",
      desc: "Fresh fish grilled over embers, wrapped in Kei's savory-spicy signature spice. The scent of sea smoke instantly awakens the appetite when served warm.",
      tag: "Grilled Fish",
      image: "/images/kuliner/kei_culinary_enbal.png",
      imageAlt: "Enbal — Kei-spiced grilled fish",
    },
    {
      id: "colo-colo",
      name: "Colo-colo",
      desc: "Kei's proud vinegar sambal: slices of chili, shallot, and fresh tomato that refresh every bite of the sea. Its sharp sourness makes you want more.",
      tag: "Vinegar Sambal",
      image: "/images/kuliner/kei_ikan_colocolo.png",
      imageAlt: "Colo-colo — fresh Kei vinegar sambal",
    },
    {
      id: "pisang-enbal",
      name: "Pisang Enbal",
      desc: "Local banana paired with a touch of Enbal spice, sweet and savory in one bite. A warm-hearted beachside snack.",
      tag: "Snack",
      image: "/images/kuliner/kei_pisang_enbal.png",
      imageAlt: "Pisang Enbal — Kei banana snack",
    },
    {
      id: "sagu",
      name: "Sagu",
      desc: "The staple that binds the Kei family, processed from the local sago palm. Soft, neutral, and ready to absorb the sea's flavor on every plate.",
      tag: "Staple Food",
      image: "/images/kuliner/kei_sagu.jpg",
      imageAlt: "Sagu process — staple food of the Kei Islands community",
    },
    {
      id: "lat",
      name: "Lat",
      desc: "A local Kei fish preparation paired with roasted spices until fragrant. A dish that often becomes the star at the shared table.",
      tag: "Fish Dish",
      image: "/images/kuliner/kei_lat.png",
      imageAlt: "Lat — roasted Kei fish dish",
    },
    {
      id: "sirsir",
      name: "Sirsir",
      desc: "Young Kei leaves lightly prepared, crisp and refreshing between heavier dishes. A green taste that sparks fresh on the tongue.",
      tag: "Leafy Vegetable",
      image: "/images/kuliner/kei_culinary_sirsir.png",
      imageAlt: "Sirsir — young-leaf vegetable typical of the Kei Islands",
    },
    {
      id: "enbal-love",
      name: "Enbal Bunga",
      desc: "An Enbal variation decorated with local edible flowers, blending taste and beauty in one dish. Kei serves food as beautifully as it welcomes guests.",
      tag: "Grilled Fish",
      image: "/images/kuliner/kei_umkm_enbal_bunga_1.jpeg",
      imageAlt: "Enbal bunga — flower-adorned Kei grilled fish variation",
    },
    {
      id: "enbal-stik",
      name: "Enbal Stik",
      desc: "Enbal shaped slim and grilled, convenient to enjoy while sitting on the sand. A tempting seaside street snack.",
      tag: "Snack",
      image: "/images/kuliner/kei_umkm_enbal_stick_1.jpeg",
      imageAlt: "Enbal stik — Kei grilled fish snack",
    },
    {
      id: "enbal-love-shape",
      name: "Enbal Love",
      desc: "Enbal shaped into a heart as a symbol of the Kei people's love for every guest. Crisp outside, soft inside, full of meaning.",
      tag: "Snack",
      image: "/images/kuliner/kei_umkm_piece_enbal.jpeg",
      imageAlt: "Enbal love — heart-shaped Kei fish",
    },
  ] satisfies SignatureDish[],
} as const;

// ── Story (light, bg-section) ─────────────────────────────────────────────────
export const tasteStory = {
  eyebrow: "PHILOSOPHY OF FLAVOR",
  title: "The Kei Kitchen is a Table of Togetherness",
  image: "/images/kuliner/kei_food_atmosfer.png",
  imageAlt:
    "Atmosphere of the Kei Islands kitchen and table of togetherness — seafood and sagu served communally upon the sand",
  paragraphs: [
    "In Kei, eating is never alone. The sea is guarded through sasi — a customary rule giving nature time to breathe — so the fish that reaches the table is always enough and thriving. What is taken today is a promise for tomorrow.",
    "Every seafood and sagu dish is served in portions that call everyone to sit together. This is Yelim — giving with hand and heart — which makes a guest, known or new, always welcomed to the same table.",
    "Spices, vinegar, and embers are Kei's language of welcome: simple, warm, and honest. Like its white sand, Kei flavor does not shout — it invites you back.",
  ],
  accentWord: "Yelim",
  accentNote: "(To give with hand & heart)",
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
  eyebrow: "TRAITS OF KEI FLAVOR",
  title: "Four Flavors that Shape the Kei Table",
  items: [
    {
      id: "laut-sasi",
      icon: "Fish",
      title: "Sea & Sasi",
      desc: "Seafood guarded by custom. Sasi gives nature time to recover, so fish, squid, and shellfish are always fresh and sufficient when they reach the table.",
      image: "/images/kuliner/kei_culinary_fish.png",
      imageAlt: "Fresh Kei seafood guarded through sasi custom",
      hero: true,
    },
    {
      id: "umbi-santan",
      icon: "Coconut",
      title: "Tubers & Rich Coconut",
      desc: "Thick fresh coconut milk and local tubers (like cassava and sweet potato) give a rich softness. They balance the sharpness of spice and the freshness of the sea.",
      image: "/images/kuliner/kei_umbi_santan.png",
      imageAlt: "Local tubers and rich coconut milk typical of the Kei Islands",
      tall: true,
    },
    {
      id: "sagu",
      icon: "Wheat",
      title: "Sagu",
      desc: "The staple that binds the family — soft, neutral, ready to absorb the sea's flavor on every plate.",
      image: "/images/kuliner/kei_sagu.jpg",
      imageAlt: "Sagu process — staple food of the Kei Islands community",
    },
    {
      id: "rempah-colocolo",
      icon: "Flame",
      title: "Spice & Colo-colo",
      desc: "Vinegar, chili, and fresh shallot bring it to life. Colo-colo is Kei's signature of sourness.",
      image: "/images/kuliner/kei_ikan_colocolo.png",
      imageAlt: "Colo-colo — fresh Kei vinegar sambal",
    },
    {
      id: "manis-pisang",
      icon: "CakeSlice",
      title: "Sweet & Banana",
      desc: "Local banana and baked snacks close the meal warmly — a sweetness not overdone, like Kei's welcome.",
      image: "/images/kuliner/kei_pisang_enbal.png",
      imageAlt: "Pisang Enbal — Kei banana snack",
    },
  ] satisfies BentoItem[],
} as const;

// ── Closing (light / accent, breath) ──────────────────────────────────────────
export const tasteClosing = {
  greeting: "Marhoba, Enma Kei",
  greetingNote: "(Welcome, come to Kei)",
  quote:
    "The flavor most felt is not the spiciest, but the warmest when shared.",
  attribution: "Philosophy of the Kei Islands dining table",
  ctaLabel: "Tell Us Your Wish",
  ctaHref: "/interaction",
} as const;
