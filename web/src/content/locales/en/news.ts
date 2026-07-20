// Centralized content for official "Discover Evav" news articles (Kei Islands).
// Moved to this file so it can be reused in the News section (BeritaUmkmSection)
// and in the /news list page and /news/[slug] detail page without duplication.
// All UI text in English. Article bodies based on real facts verified through
// research (see notes in each article).

export type NewsCategory = "Budaya" | "Event" | "Infrastruktur" | "Pengumuman";

export type NewsBlock =
  | { type: "paragraph"; text: string }
  | { type: "heading"; text: string }
  | { type: "list"; items: string[] }
  | { type: "quote"; text: string };

export type NewsArticle = {
  id: string;
  slug: string;
  category: NewsCategory;
  title: string;
  excerpt: string;
  date: string; // display format "12 July 2026"
  dateISO: string; // ISO format for <time> & JSON-LD
  location: string;
  image: string;
  featured?: boolean;
  // Full content (block array) for the detail page.
  content: NewsBlock[];
  // Reference sources (URL) for fact transparency.
  references: string[];
};

export const news: NewsArticle[] = [
  {
    id: "fpmk-agenda-nasional",
    slug: "festival-pesona-meti-kei-kembali-masuk-ken",
    category: "Event",
    title: "Meti Kei Charm Festival Back in KEN: Layered Collaboration Toward a National Tourism Agenda",
    excerpt:
      "The pride of the Evav community is again selected for Kemenparekraf's Kharisma Event Nusantara (KEN) for the sixth consecutive time.",
    date: "12 July 2026",
    dateISO: "2026-07-12",
    location: "Langgur, Southeast Maluku",
    image: "/images/budaya/festival-pesona-meti-kei-2025-triptrus.jpg",
    featured: true,
    references: [
      "https://rri.co.id/tual/wisata/2461975/",
      "https://wisata.viva.co.id/wisata/28203-wisata-kei-semain-dilirik-festival-meti-kei-menjadi-penggerak-ekonomi-lokal",
      "https://www.kompas.com/kapanlagi/read/2024/01/26/193955527/",
      "https://lintas-timur.co.id/2025/10/festival-pesona-meti-kei-jadi-titik.html",
    ],
    content: [
      {
        type: "paragraph",
        text: "Langgur, Southeast Maluku — The consistency and quality of the Meti Kei Charm Festival (FPMK) in the Kei Islands has again earned national recognition. This pride of the Evav community has officially been re-selected into the program calendar of the Kharisma Event Nusantara (KEN) of the Ministry of Tourism and Creative Economy (Kemenparekraf).",
      },
      {
        type: "heading",
        text: "A Prestigious National Recognition",
      },
      {
        type: "paragraph",
        text: "Entering KEN was no easy feat. According to media records, the festival has now been selected for the sixth consecutive time into the strict curation of Kharisma Event Nusantara — Kemenparekraf's annual program that sifts through hundreds of proposals into around 110 of the best tourism events across Indonesia each year.",
      },
      {
        type: "paragraph",
        text: "This achievement proves that FPMK is judged to have a strong cultural uniqueness, professional event management, and concrete socio-economic impact for the surrounding community.",
      },
      {
        type: "heading",
        text: "Layered Collaboration Across Levels",
      },
      {
        type: "paragraph",
        text: "The key to the festival's success lies in its layered collaboration among various stakeholders (multi-stakeholder):",
      },
      {
        type: "list",
        items: [
          "Central Government (Kemenparekraf): Provides curation support, technical digital-promotion guidance, and market-segment mapping for national and global tourists.",
          "Provincial Government of Maluku: Supports air and sea transport accessibility and integration with Maluku's regional tourism promotion network.",
          "Regency Government of Southeast Maluku: Acts as the main field executor, ensuring local infrastructure coordination runs smoothly.",
          "Adat Community & Local Communities: Guard the authenticity of rituals and act as friendly hosts welcoming the arrival of tourists.",
        ],
      },
      {
        type: "paragraph",
        text: "This cross-level support gives long-term certainty so the festival keeps running year after year. Tourists can now plan visits to the Kei Islands on a schedule with a reliable tourism calendar, while guaranteeing economic circulation for local residents.",
      },
      {
        type: "quote",
        text: "Six consecutive times FPMK entering the national KEN agenda is proof that Kei's local wisdom can stand side by side with Indonesia's best tourism events. — Summary of media notes (RRI & VIVA, 2026)",
      },
    ],
  },
  {
    id: "fpmk-event-budaya",
    slug: "festival-pesona-meti-kei-transformasi-tradisi-bahari",
    category: "Budaya",
    title: "Meti Kei Charm Festival: Transforming Maritime Tradition into a Global Cultural Event",
    excerpt:
      "From the 'Meti' and 'Wer Warat' low-tide rituals, FPMK lifted Kei's local wisdom onto the international tourism stage since its inaugural edition in 2016.",
    date: "28 June 2026",
    dateISO: "2026-06-28",
    location: "Ohoi Ngilngof, Kei Kecil",
    image: "/images/budaya/lomba-perahu-belan-rri.jpg",
    content: [
      {
        type: "paragraph",
        text: "Langgur, Southeast Maluku — The tradition of catching fish traditionally during extreme low tide (Meti) has now leveled up. What began merely as daily food fulfillment and a communal activity of Kei Islands fishers was officially established as one of the leading international-scale cultural tourism attractions through the Meti Kei Charm Festival (FPMK).",
      },
      {
        type: "heading",
        text: "History and Turning Point",
      },
      {
        type: "paragraph",
        text: "FPMK was first held on 8–22 October 2016, woven together with the Langgur City Anniversary, with the peak event attended by the then Minister of Home Affairs in Ohoi Elaar. Since that inaugural edition, the festival changed how the community viewed their maritime potential. Previously, the Kei Meti phenomenon — a condition when the sea recedes extremely far, unveiling the seabed and coral reefs hundreds of meters out to sea — was merely passed as an ordinary fish-harvest season with no tourism added value.",
      },
      {
        type: "paragraph",
        text: "Through the creative initiative of village-youth, local government, and local adat figures, the traditional fish-catching activity called Wer Warat (trapping fish schools using a 150–200 meter yellow palm-frond rope stretch) was repackaged into an epic and aesthetic cultural festival.",
      },
      {
        type: "heading",
        text: "Turning Daily Activity into Tourism Appeal",
      },
      {
        type: "paragraph",
        text: "This transformation proved successful in drawing thousands of pairs of eyes from foreign and domestic tourists every year. Some traditional activities elevated into cultural attractions include:",
      },
      {
        type: "list",
        items: [
          "Wer Warat (Rope Pull): Thousands of residents and tourists descend directly to the receding beach to jointly pull the coconut rope that traps fish in a festive spirit of cooperation.",
          "Fan Kurkurat: An ancient tradition of shooting fish traditionally on shallow reefs using the bamboo bow typical of Evav ancestors, among others in Ohoi Kolser at low tide.",
          "Belan Boat Race: A race of long traditional wooden boats rich in the historical value of the Kei Islands naval fleet (rathschaap). In 2017, the race was joined by 13 rathschaap after years of hiatus and was revived.",
        ],
      },
      {
        type: "paragraph",
        text: "With this packaging, local wisdom once known only to the local people of Southeast Maluku now becomes a gateway promoting global tourism, bringing the good name of the Kei Islands to the world tourism stage.",
      },
      {
        type: "quote",
        text: "Ira na im waat, ain ni ain — one heart, one purpose. The unifying philosophy of the Kei people living in every strand of the Wer Warat palm-frond rope.",
      },
    ],
    references: [
      "https://www.wwf.id/id/blog/xpdckeikecil-fenomena-meti-kei",
      "https://jadesta.kemenparekraf.go.id/atraksi/tradisi_wer_warat",
      "https://malukupost.com/2016/09/festival-pesona-meti-kei-bakal-digelar/",
      "https://www.cnnindonesia.com/gaya-hidup/20171023155709-307-250368",
    ],
  },
  {
    id: "fpmk-multiplier-effect",
    slug: "dampak-ekonomi-berganda-fpmk-untuk-warga-lokal",
    category: "Pengumuman",
    title: "Multiplier Economic Impact of the Meti Kei Charm Festival for Local Residents",
    excerpt:
      "Through Community-Based Tourism, FPMK animates the community's economic chain: from culinary, homestay, local transport, to UMKM crafts.",
    date: "5 June 2026",
    dateISO: "2026-06-05",
    location: "Kei Islands, Southeast Maluku",
    image: "/images/budaya/masyarakat-kei-thespiceroute.jpg",
    content: [
      {
        type: "paragraph",
        text: "Langgur, Southeast Maluku — The annual Meti Kei Charm Festival (FPMK) is not just a one-day revelry or a merely ceremonial event. For the Kei Islands community, the festival has become a main economic driver creating a multiplier effect across various sectors of the people's economy.",
      },
      {
        type: "heading",
        text: "Equitable Economy Without Exploitation",
      },
      {
        type: "paragraph",
        text: "Unlike the industrial mass-tourism concept whose profits center on a handful of large corporations, tourism in the Kei Islands embraces Community-Based Tourism (CBT). In the FPMK event, the full involvement of local talent, UMKM players, and creative communities becomes the main pillar of the event's success.",
      },
      {
        type: "paragraph",
        text: "This ensures the money from tourist spending goes directly into the pockets of communities on the ground, animating the economic chain horizontally and simultaneously.",
      },
      {
        type: "heading",
        text: "Directly Impacted Sectors",
      },
      {
        type: "paragraph",
        text: "The positive impact of FPMK spreads evenly across various livelihood sectors:",
      },
      {
        type: "list",
        items: [
          "Culinary Sector: Increased demand for local specialties such as Enbal (cassava dish), Sayur Sir-Sir, and fresh seafood at people's eateries.",
          "Lodging & Homestay Sector: Rooms of resident-owned homestays in Ohoi Ngilngof, Ohoililir, and Langgur fill up fully from the inflow of tourists.",
          "Local Transport Sector: Inter-island speedboat drivers, local car and motorcycle rentals, and ojek services see a significant daily order increase.",
          "Craft & UMKM Sector: Stalls exhibiting Elat traditional woven crafts, bamboo crafts, and various Kei souvenirs see a surge in souvenir sales transactions.",
          "Tour Guide Services: Local guide communities are fully empowered to lead guests through top destinations such as Ngurbloat Beach and Bair Island.",
        ],
      },
      {
        type: "paragraph",
        text: "Thus, the Meti Kei Charm Festival has proven that preserving maritime local wisdom managed together with the community can be an effective instrument in alleviating poverty and advancing the regional economy of Southeast Maluku independently.",
      },
      {
        type: "quote",
        text: "By traveling here, you also prosper local residents — from village guides, culinary artisans, to fishers guarding the sustainability of the Kei sea.",
      },
    ],
    references: [
      "https://www.kemenparekraf.go.id",
      "https://id.wikipedia.org/wiki/Enbal",
      "https://id.wikipedia.org/wiki/Ngilngof",
      "https://id.wikipedia.org/wiki/Kabupaten_Maluku_Tenggara",
    ],
  },
];

export function getNewsBySlug(slug: string): NewsArticle | undefined {
  return news.find((n) => n.slug === slug);
}
