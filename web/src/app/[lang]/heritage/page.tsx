import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { hasLocale } from "@/content/dictionaries";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SeoJsonLd from "@/components/SeoJsonLd";
import HeroHeritageSection from "@/components/heritage/HeroHeritageSection";
import PrologHeritageSection from "@/components/heritage/PrologHeritageSection";
import KarelHeritageSection from "@/components/heritage/KarelHeritageSection";
import RatskapHeritageSection from "@/components/heritage/RatskapHeritageSection";
import PenghormatanHeritageSection from "@/components/heritage/PenghormatanHeritageSection";
import PenutupHeritageSection from "@/components/heritage/PenutupHeritageSection";

export async function generateMetadata({
  params,
}: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  return {
    title:
      lang === "en"
        ? "Heritage — The Footprints & Sovereignty of Evav"
        : "Warisan — Jejak & Kedaulatan Evav",
    description:
      lang === "en"
        ? "Two great stories of the Land of Evav: Karel Sadsuitubun's devotion to guarding Indonesia's sovereignty, and the Ratskap Manyeuw Rumadian customary sovereignty upholding the ancestral law of Kei."
        : "Dua kisah besar Bumi Evav: pengabdian Karel Sadsuitubun menjaga kedaulatan Indonesia, dan kedaulatan adat Ratskap Manyeuw Rumadian yang menegakkan hukum leluhur Kei.",
    keywords:
      lang === "en"
        ? [
            "Evav Heritage",
            "Kei Islands",
            "Karel Sadsuitubun",
            "Ratskap Manyeuw Rumadian",
            "Kei History",
            "Kei Customary Sovereignty",
          ]
        : [
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
      languages: {
        id: "/id/heritage",
        en: "/en/heritage",
        "x-default": "/id/heritage",
      },
    },
    openGraph: {
      title:
        lang === "en"
          ? "Heritage — The Footprints & Sovereignty of Evav"
          : "Warisan — Jejak & Kedaulatan Evav",
      description:
        lang === "en"
          ? "Two great stories of the Land of Evav: Karel Sadsuitubun's devotion to guarding Indonesia's sovereignty, and the Ratskap Manyeuw Rumadian customary sovereignty."
          : "Dua kisah besar Bumi Evav: pengabdian Karel Sadsuitubun menjaga kedaulatan Indonesia, dan kedaulatan adat Ratskap Manyeuw Rumadian yang menegakkan hukum leluhur Kei.",
      url: "/heritage",
      locale: lang === "en" ? "en_US" : "id_ID",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
    },
  };
}

export default async function HeritagePage({
  params,
}: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline:
      lang === "en"
        ? "Heritage — The Footprints & Sovereignty of Evav"
        : "Warisan — Jejak & Kedaulatan Evav",
    description:
      lang === "en"
        ? "Two great stories of the Land of Evav: Karel Sadsuitubun's devotion to guarding Indonesia's sovereignty, and the Ratskap Manyeuw Rumadian customary sovereignty."
        : "Dua kisah besar Bumi Evav: pengabdian Karel Sadsuitubun menjaga kedaulatan Indonesia, dan kedaulatan adat Ratskap Manyeuw Rumadian yang menegakkan hukum leluhur Kei.",
    inLanguage: lang === "en" ? "en-US" : "id-ID",
    author: { "@type": "Organization", name: "Tim Simfoni Evav" },
    publisher: { "@type": "Organization", name: "Simfoni Evav" },
    about: { "@type": "Place", name: "Kepulauan Kei" },
  };

  return (
    <>
      <Navbar />
      <main id="main-content">
        <SeoJsonLd jsonLd={jsonLd} />
        <HeroHeritageSection lang={lang} />
        <PrologHeritageSection lang={lang} />
        <KarelHeritageSection lang={lang} />
        <RatskapHeritageSection lang={lang} />
        <PenghormatanHeritageSection lang={lang} />
        <PenutupHeritageSection lang={lang} />
      </main>
      <Footer lang={lang} />
    </>
  );
}
