import type { Metadata, Viewport } from "next";
import { Montserrat, Montaga, Ephesis } from "next/font/google";
import "./globals.css";
import { INSTAGRAM_URL, TIKTOK_URL, YOUTUBE_URL, FACEBOOK_URL } from "@/content/social";
import AppShell from "@/components/AppShell";
import AmbientSound from "@/components/AmbientSound";
import ScrollSnapController from "@/components/ScrollSnapController";

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

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Simfoni Evav — Peradaban di Atas Pasir Putih | Kepulauan Kei",
    template: "%s | Simfoni Evav",
  },
  description:
    "Jelajahi keindahan, sejarah, dan kebudayaan Kepulauan Kei bersama Simfoni Evav. Eksplorasi surga tersembunyi dan keajaiban budaya di Maluku Tenggara — peradaban yang berdiri megah di atas hamparan pasir putih.",
  applicationName: SITE_NAME,
  keywords: [
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
  },
  openGraph: {
    title: "Simfoni Evav — Peradaban di Atas Pasir Putih",
    description:
      "Eksplorasi surga tersembunyi dan keajaiban budaya di Kepulauan Kei. Peradaban yang berdiri megah di atas hamparan pasir putih Maluku Tenggara.",
    url: SITE_URL,
    siteName: SITE_NAME,
    images: [OG_IMAGE],
    locale: "id_ID",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Simfoni Evav — Peradaban di Atas Pasir Putih",
    description:
      "Eksplorasi surga tersembunyi dan keajaiban budaya di Kepulauan Kei, Maluku Tenggara.",
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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": `${SITE_URL}/#organization`,
        name: SITE_NAME,
        url: SITE_URL,
        logo: `${SITE_URL}/logo-white.svg`,
        description:
          "Simfoni Evav memperkenalkan keindahan, sejarah, dan kebudayaan Kepulauan Kei, Maluku Tenggara kepada dunia.",
        areaServed: "Kepulauan Kei, Maluku Tenggara, Indonesia",
        sameAs: [INSTAGRAM_URL, TIKTOK_URL, YOUTUBE_URL, FACEBOOK_URL],
      },
      {
        "@type": "WebSite",
        "@id": `${SITE_URL}/#website`,
        url: SITE_URL,
        name: SITE_NAME,
        description: "Peradaban di Atas Pasir Putih — Kepulauan Kei",
        publisher: { "@id": `${SITE_URL}/#organization` },
        inLanguage: "id-ID",
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
        description:
          "Kepulauan Kei (Evav) adalah gugusan kepulauan di Maluku Tenggara yang terkenal dengan pasir putih halus, laut jernih, dan warisan budaya Larvul Ngabal.",
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
      lang="id"
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
