import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SeoJsonLd from "@/components/SeoJsonLd";
import HeroHeritageSection from "@/components/heritage/HeroHeritageSection";
import PrologHeritageSection from "@/components/heritage/PrologHeritageSection";
import KarelHeritageSection from "@/components/heritage/KarelHeritageSection";
import RatskapHeritageSection from "@/components/heritage/RatskapHeritageSection";
import PenghormatanHeritageSection from "@/components/heritage/PenghormatanHeritageSection";
import PenutupHeritageSection from "@/components/heritage/PenutupHeritageSection";

export const metadata: Metadata = {
  title: "Warisan — Jejak & Kedaulatan Evav",
  description:
    "Dua kisah besar Bumi Evav: pengabdian Karel Sadsuitubun menjaga kedaulatan Indonesia, dan kedaulatan adat Ratskap Manyeuw Rumadian yang menegakkan hukum leluhur Kei.",
  keywords: [
    "Warisan Evav",
    "Kepulauan Kei",
    "Karel Sadsuitubun",
    "Ratskap Manyeuw Rumadian",
    "Sejarah Kei",
    "Kedaulatan Adat Kei",
  ],
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: "/heritage",
  },
  openGraph: {
    title: "Warisan — Jejak & Kedaulatan Evav",
    description:
      "Dua kisah besar Bumi Evav: pengabdian Karel Sadsuitubun menjaga kedaulatan Indonesia, dan kedaulatan adat Ratskap Manyeuw Rumadian yang menegakkan hukum leluhur Kei.",
    url: "/heritage",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
  },
};

export default function HeritagePage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "Warisan — Jejak & Kedaulatan Evav",
    description:
      "Dua kisah besar Bumi Evav: pengabdian Karel Sadsuitubun menjaga kedaulatan Indonesia, dan kedaulatan adat Ratskap Manyeuw Rumadian yang menegakkan hukum leluhur Kei.",
    inLanguage: "id-ID",
    author: { "@type": "Organization", name: "Tim Simfoni Evav" },
    publisher: { "@type": "Organization", name: "Simfoni Evav" },
    about: { "@type": "Place", name: "Kepulauan Kei" },
  };

  return (
    <>
      <Navbar />
      <main id="main-content">
        <SeoJsonLd jsonLd={jsonLd} />
        <HeroHeritageSection />
        <PrologHeritageSection />
        <KarelHeritageSection />
        <RatskapHeritageSection />
        <PenghormatanHeritageSection />
        <PenutupHeritageSection />
      </main>
      <Footer />
    </>
  );
}
