import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getDictionary, hasLocale } from "@/content/dictionaries";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SeoJsonLd from "@/components/SeoJsonLd";
import InteractionHeroSection from "@/components/interaction/InteractionHeroSection";
import KeterhubunganIntroSection from "@/components/interaction/KeterhubunganIntroSection";
import KeterhubunganFormSection from "@/components/interaction/KeterhubunganFormSection";
import FaqAccordionSection from "@/components/interaction/FaqAccordionSection";
import SocialMosaicSection from "@/components/interaction/SocialMosaicSection";
import ContactUsSection from "@/components/interaction/ContactUsSection";

export async function generateMetadata({
  params,
}: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  return {
    title:
      lang === "en"
        ? "Connection — Reach Out to the Evav Family | Simfoni Evav"
        : "Keterhubungan — Mari Terhubung dengan Keluarga Evav | Simfoni Evav",
    description:
      lang === "en"
        ? "Reaching us is not filling a form — it is knocking on a sibling's door. Send a greeting, say hello on WhatsApp, or follow the daily Kei Islands stories on social media. One archipelago, one family."
        : "Menghubungi kami bukan mengisi formulir — ia adalah mengetuk pintu saudara. Tulis sapaan, sapa lewat WhatsApp, atau ikuti kisah harian Kepulauan Kei di media sosial. Satu kepulauan, satu keluarga.",
    keywords:
      lang === "en"
        ? [
            "Kei Islands",
            "Kei tourism contact",
            "Discover Evav",
            "Ain Ni Ain",
            "connection",
          ]
        : [
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
      languages: {
        id: "/id/interaction",
        en: "/en/interaction",
        "x-default": "/id/interaction",
      },
    },
    openGraph: {
      title:
        lang === "en"
          ? "Connection — Reach Out to the Evav Family"
          : "Keterhubungan — Mari Terhubung dengan Keluarga Evav",
      description:
        lang === "en"
          ? "Send a greeting, say hello on WhatsApp, or follow the daily Kei Islands stories. Ain Ni Ain — we are all siblings."
          : "Tulis sapaan, sapa lewat WhatsApp, atau ikuti kisah harian Kepulauan Kei. Ain Ni Ain — kita semua bersaudara.",
      url: "/interaction",
      locale: lang === "en" ? "en_US" : "id_ID",
      type: "website",
    },
  };
}

export default async function InteractionPage({
  params,
}: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const dict = await getDictionary(lang);

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: dict.faqItems.map((item) => ({
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
        <InteractionHeroSection lang={lang} />
        <KeterhubunganIntroSection lang={lang} />
        <KeterhubunganFormSection lang={lang} />
        <FaqAccordionSection lang={lang} faqItems={dict.faqItems} />
        <SocialMosaicSection lang={lang} />
        <ContactUsSection lang={lang} />
      </main>
      <Footer lang={lang} />
    </>
  );
}
