// Centralized FAQ content for the /interaction page (Section #6 — Q&A).
// Content moved here following the centralization pattern (see taste.ts,
// budaya.ts, eksplorasi.ts). The FAQ uses the Ain Ni Ain tone: warm, active,
// specific (GRAND_DESIGN §8.6 Microcopy Voice Guide).
// All UI text in English; Kei vocabulary (Ngurbloat, Larvul Ngabal,
// Evav) kept as authentic accent (GRAND_DESIGN §16).
//
// ⚠️ Validate local facts & Kei vocabulary with local Kei informants before production.

export type FaqItem = {
  question: string;
  answer: string;
};

export const faqItems: FaqItem[] = [
  {
    question: "When is the best time to visit Kei?",
    answer:
      "October through March, when the sky is clear and the sea is calm — the perfect time to snorkel at Ngurbloat and feel sand that never burns the soles of your feet.",
  },
  {
    question: "Is it safe for a solo backpacker?",
    answer:
      "Absolutely. The Kei people are friendly and cooperative (Larvul Ngabal). Stay wise with your belongings and respectful of custom.",
  },
  {
    question: "Can I contribute to the community?",
    answer:
      "Of course. Through the form above or by joining our community — every caring hand helps keep Kei sustainable.",
  },
  {
    question: "Is there a travel guide for first-time visitors to Kei?",
    answer:
      "Yes. The Evav family team is ready to arrange the rhythm of your journey — from the sands of Ngurbloat to the adat villages — at your own pace.",
  },
  {
    question: "What if I get lost or need help while there?",
    answer:
      "You are never truly lost in Kei. Contact us anytime; we will guide you back as if welcoming a sibling.",
  },
];
