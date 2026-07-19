import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import HeroTasteSection from "@/components/taste/HeroTasteSection";
import SignatureDishesSection from "@/components/taste/SignatureDishesSection";
import StorySection from "@/components/taste/StorySection";
import BentoSection from "@/components/taste/BentoSection";
import UmkmCatalogSection from "@/components/taste/UmkmCatalogSection";
import ClosingSection from "@/components/taste/ClosingSection";

export const metadata: Metadata = {
  title: "Taste — Kuliner & Cita Rasa Kepulauan Kei | Simfoni Evav",
  description:
    "Selami Rasa Kei: Enbal ikan bakar bumbu khas, Colo-colo sambal cuka, sagu, pisang, dan camilan bakar pesisir. Kuliner Kepulauan Kei yang lahir dari laut, sasi, dan kebersamaan meja makan ala Yelim.",
  alternates: {
    canonical: "/taste",
  },
  openGraph: {
    title: "Taste — Kuliner & Cita Rasa Kepulauan Kei",
    description:
      "Dari Enbal hingga Colo-colo, kenali cita rasa Kepulauan Kei yang hangat, jujur, dan dihidangkan bersama dalam semangat Yelim.",
    url: "/taste",
    type: "website",
  },
};

export default function TastePage() {
  return (
    <>
      <Navbar />
      <main id="main-content">
        <HeroTasteSection />
        <SignatureDishesSection />
        <StorySection />
        <BentoSection />
        <UmkmCatalogSection />
        <ClosingSection />
      </main>
      <Footer />
    </>
  );
}
