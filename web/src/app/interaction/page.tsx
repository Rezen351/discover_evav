import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SeoJsonLd from "@/components/SeoJsonLd";
import { faqItems } from "@/content/keterhubungan";
import InteractionHeroSection from "@/components/interaction/InteractionHeroSection";
import KeterhubunganIntroSection from "@/components/interaction/KeterhubunganIntroSection";
import KeterhubunganFormSection from "@/components/interaction/KeterhubunganFormSection";
import FaqAccordionSection from "@/components/interaction/FaqAccordionSection";
import SocialMosaicSection from "@/components/interaction/SocialMosaicSection";
import ContactUsSection from "@/components/interaction/ContactUsSection";

export const metadata: Metadata = {
  title: "Keterhubungan — Mari Terhubung dengan Keluarga Evav | Simfoni Evav",
  description:
    "Menghubungi kami bukan mengisi formulir — ia adalah mengetuk pintu saudara. Tulis sapaan, sapa lewat WhatsApp, atau ikuti kisah harian Kepulauan Kei di media sosial. Satu kepulauan, satu keluarga.",
  keywords: [
    "Kepulauan Kei",
    "kontak wisata Kei",
    "Discover Evav",
    "Ain Ni Ain",
    "keterhubungan",
  ],
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: "/interaction",
  },
  openGraph: {
    title: "Keterhubungan — Mari Terhubung dengan Keluarga Evav",
    description:
      "Tulis sapaan, sapa lewat WhatsApp, atau ikuti kisah harian Kepulauan Kei. Ain Ni Ain — kita semua bersaudara.",
    url: "/interaction",
    type: "website",
  },
};

export default function InteractionPage() {
  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqItems.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };

  return (
    <>
      <Navbar />
      <main id="main-content">
        <SeoJsonLd jsonLd={faqJsonLd} />
        <InteractionHeroSection />
        <KeterhubunganIntroSection />
        <KeterhubunganFormSection />
        <FaqAccordionSection />
        <SocialMosaicSection />
        <ContactUsSection />
      </main>
      <Footer />
    </>
  );
}
