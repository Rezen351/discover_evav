import type { Metadata, Viewport } from "next";
import { Montserrat, Montaga, Ephesis } from "next/font/google";
import "../globals.css";
import { INSTAGRAM_URL, TIKTOK_URL, YOUTUBE_URL, FACEBOOK_URL } from "@/content/social";
import AppShell from "@/components/AppShell";
import AmbientSound from "@/components/AmbientSound";
import ScrollSnapController from "@/components/ScrollSnapController";
import { hasLocale } from "@/content/dictionaries";
import { notFound } from "next/navigation";

const montserrat = Montserrat({
  variable: "--font-sans",
  subsets: ["latin"],
});

const montaga = Montaga({
  variable: "--font-serif",
  subsets: ["latin"],
  weight: "400",
});

const ephesis = Ephesis({
  variable: "--font-cursive",
  subsets: ["latin"],
  weight: "400",
});

const SITE_URL = "https://discoverevav.id";
const SITE_NAME = "Simfoni Evav";
const OG_IMAGE = {
  url: "/images/og/simfoni-evav-og.jpg",
  width: 1200,
  height: 630,
  alt: "Simfoni Evav — Peradaban di Atas Pasir Putih, Kepulauan Kei",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#0b1020" },
  ],
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  const isEn = lang === "en";
  return {
    metadataBase: new URL(SITE_URL),
    title: {
      default: isEn
        ? "Simfoni Evav — Civilization Upon White Sands | Kei Islands"
        : "Simfoni Evav — Peradaban di Atas Pasir Putih | Kepulauan Kei",
      template: "%s | Simfoni Evav",
    },
    description: isEn
      ? "Explore the hidden paradise and cultural wonders of the Kei Islands with Simfoni Evav. Discover nature, the Ain Ni Ain indigenous soul, and a civilization upon the white sands of Southeast Maluku."
      : "Jelajahi keindahan, sejarah, dan kebudayaan Kepulauan Kei bersama Simfoni Evav. Eksplorasi surga tersembunyi dan keajaiban budaya di Maluku Tenggara — peradaban yang berdiri megah di atas hamparan pasir putih.",
    applicationName: SITE_NAME,
    icons: {
      icon: "/icon.svg",
      shortcut: "/favicon.ico",
    },
    keywords: isEn
      ? [
          "Simfoni Evav",
          "Kei Islands",
          "Evav",
          "Kei Tourism",
          "Kei White Sands",
          "Southeast Maluku",
          "Maluku Tourism",
          "Kei Culture",
          "Ngurbloat",
          "Ain Ni Ain",
          "Larvul Ngabal",
        ]
      : [
          "Simfoni Evav",
          "Kepulauan Kei",
          "Evav",
          "Wisata Kei",
          "Pasir Putih Kei",
          "Maluku Tenggara",
          "Pariwisata Maluku",
          "Budaya Kei",
          "Ngurbloat",
          "Ain Ni Ain",
          "Larvul Ngabal",
        ],
    authors: [{ name: "Tim Simfoni Evav" }],
    creator: SITE_NAME,
    publisher: SITE_NAME,
    category: "travel",
    manifest: "/manifest.webmanifest",
    alternates: {
      canonical: "/",
      languages: {
        id: "/id",
        en: "/en",
        "x-default": "/id",
      },
    },
    openGraph: {
      title: isEn
        ? "Simfoni Evav — Civilization Upon White Sands"
        : "Simfoni Evav — Peradaban di Atas Pasir Putih",
      description: isEn
        ? "Explore the hidden paradise and cultural wonders of the Kei Islands. A civilization upon the white sands of Southeast Maluku."
        : "Eksplorasi surga tersembunyi dan keajaiban budaya di Kepulauan Kei. Peradaban yang berdiri megah di atas hamparan pasir putih Maluku Tenggara.",
      url: SITE_URL,
      siteName: SITE_NAME,
      images: [OG_IMAGE],
      locale: isEn ? "en_US" : "id_ID",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: isEn
        ? "Simfoni Evav — Civilization Upon White Sands"
        : "Simfoni Evav — Peradaban di Atas Pasir Putih",
      description: isEn
        ? "Explore the hidden paradise and cultural wonders of the Kei Islands, Southeast Maluku."
        : "Eksplorasi surga tersembunyi dan keajaiban budaya di Kepulauan Kei, Maluku Tenggara.",
      images: [OG_IMAGE.url],
    },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  formatDetection: {
    telephone: false,
    address: false,
    email: false,
  },
};

}

export async function generateStaticParams() {
  return [{ lang: "id" }, { lang: "en" }];
}

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}>) {
  const { lang } = await params;

  if (!hasLocale(lang)) notFound();

  const isEn = lang === "en";

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": `${SITE_URL}/#organization`,
        name: SITE_NAME,
        url: SITE_URL,
        logo: `${SITE_URL}/logo-white.svg`,
        description: isEn
          ? "Simfoni Evav introduces the beauty, history, and culture of the Kei Islands, Southeast Maluku, to the world."
          : "Simfoni Evav memperkenalkan keindahan, sejarah, dan kebudayaan Kepulauan Kei, Maluku Tenggara kepada dunia.",
        areaServed: "Kepulauan Kei, Maluku Tenggara, Indonesia",
        sameAs: [INSTAGRAM_URL, TIKTOK_URL, YOUTUBE_URL, FACEBOOK_URL].filter((url) => url && url !== "#"),
      },
      {
        "@type": "WebSite",
        "@id": `${SITE_URL}/#website`,
        url: SITE_URL,
        name: SITE_NAME,
        description: isEn
          ? "Civilization Upon White Sands — Kei Islands"
          : "Peradaban di Atas Pasir Putih — Kepulauan Kei",
        publisher: { "@id": `${SITE_URL}/#organization` },
        inLanguage: isEn ? "en-US" : "id-ID",
        potentialAction: {
          "@type": "SearchAction",
          target: {
            "@type": "EntryPoint",
            urlTemplate: `${SITE_URL}/eksplorasi?q={search_term_string}`,
          },
          "query-input": "required name=search_term_string",
        },
      },
      {
        "@type": "TouristDestination",
        "@id": `${SITE_URL}/#kepulauan-kei`,
        name: "Kepulauan Kei",
        description: isEn
          ? "The Kei Islands (Evav) are an archipelago in Southeast Maluku known for fine white sands, clear waters, and the Larvul Ngabal cultural heritage."
          : "Kepulauan Kei (Evav) adalah gugusan kepulauan di Maluku Tenggara yang terkenal dengan pasir putih halus, laut jernih, dan warisan budaya Larvul Ngabal.",
        address: {
          "@type": "PostalAddress",
          addressRegion: "Maluku Tenggara",
          addressCountry: "ID",
        },
        geo: {
          "@type": "GeoCoordinates",
          latitude: -5.66,
          longitude: 132.65,
        },
        containsPlace: [
          { "@id": `${SITE_URL}/#ngurbloat` },
          { "@id": `${SITE_URL}/#ngurtavur` },
          { "@id": `${SITE_URL}/#hawang` },
          { "@id": `${SITE_URL}/#bair` },
          { "@id": `${SITE_URL}/#ohoililir` },
          { "@id": `${SITE_URL}/#dullah` },
          { "@id": `${SITE_URL}/#ngiarvarat` },
          { "@id": `${SITE_URL}/#masbait` },
          { "@id": `${SITE_URL}/#ohoilim` },
          { "@id": `${SITE_URL}/#tanimbar_kei` },
        ],
      },
    ],
  };

  return (
    <html
      lang={lang}
      suppressHydrationWarning
      className={`${montserrat.variable} ${montaga.variable} ${ephesis.variable} scroll-smooth antialiased`}
    >
      <body className="min-h-screen antialiased" suppressHydrationWarning>
        <link rel="alternate" type="text/markdown" href="/llms.txt" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[300] focus:bg-nav-gradient focus:text-black focus:px-5 focus:py-3 focus:rounded-xl focus:font-semibold focus:shadow-lg"
          style={{ fontFamily: "var(--font-sans)" }}
        >
          Lompat ke konten utama
        </a>
        <AppShell>
          <main id="main-content">{children}</main>
        </AppShell>
        <ScrollSnapController />
        <AmbientSound />
      </body>
    </html>
  );
}
