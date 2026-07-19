import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import HeroHeritageSection from "@/components/heritage/HeroHeritageSection";
import PrologHeritageSection from "@/components/heritage/PrologHeritageSection";
import KarelHeritageSection from "@/components/heritage/KarelHeritageSection";
import RatskapHeritageSection from "@/components/heritage/RatskapHeritageSection";
import PenghormatanHeritageSection from "@/components/heritage/PenghormatanHeritageSection";
import PenutupHeritageSection from "@/components/heritage/PenutupHeritageSection";

export const metadata: Metadata = {
  title: "Warisan — Jejak & Kedaulatan Evav | Simfoni Evav",
  description:
    "Dua kisah besar Bumi Evav: pengabdian Karel Sadsuitubun menjaga kedaulatan Indonesia, dan kedaulatan adat Ratskap Manyeuw Rumadian yang menegakkan hukum leluhur Kei.",
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
};

export default function HeritagePage() {
  return (
    <>
      <Navbar />
      <main id="main-content">
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
