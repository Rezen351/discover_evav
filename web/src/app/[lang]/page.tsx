import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getDictionary, hasLocale } from "@/content/dictionaries";
import HeroSection from "@/components/HeroSection";
import JedaJiwaSection from "@/components/JedaJiwaSection";
import BudayaAdatSection from "@/components/BudayaAdatSection";
import HeritageSection from "@/components/HeritageSection";
import FunFactSection from "@/components/FunFactSection";
import JourneyMapSection from "@/components/JourneyMapSection";
import DestinasiTerbaikSection from "@/components/DestinasiTerbaikSection";
import BeritaUmkmSection from "@/components/BeritaUmkmSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";

export async function generateMetadata({
  params,
}: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  return {
    title:
      lang === "en"
        ? "Simfoni Evav — Civilization Upon White Sands | Kei Islands"
        : "Simfoni Evav — Peradaban di Atas Pasir Putih | Kepulauan Kei",
    description:
      lang === "en"
        ? "Explore the hidden paradise and cultural wonders of the Kei Islands. Discover nature, the Ain Ni Ain indigenous soul, and a civilization upon the white sands of Southeast Maluku with Simfoni Evav."
        : "Eksplorasi surga tersembunyi dan keajaiban budaya di Kepulauan Kei. Selami keindahan alam, jiwa adat Ain Ni Ain, dan pesona peradaban di atas pasir putih Maluku Tenggara bersama Simfoni Evav.",
    alternates: {
      canonical: "/",
      languages: {
        id: "/id",
        en: "/en",
        "x-default": "/id",
      },
    },
    openGraph: {
      title:
        lang === "en"
          ? "Simfoni Evav — Civilization Upon White Sands"
          : "Simfoni Evav — Peradaban di Atas Pasir Putih",
      description:
        lang === "en"
          ? "Explore the hidden paradise and cultural wonders of the Kei Islands, Southeast Maluku."
          : "Eksplorasi surga tersembunyi dan keajaiban budaya di Kepulauan Kei, Maluku Tenggara.",
      url: "/",
      locale: lang === "en" ? "en_US" : "id_ID",
      type: "website",
    },
  };
}

export default async function Home({
  params,
}: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();

  const dict = await getDictionary(lang);

  return (
    <>
      <HeroSection data={dict.home.hero} />
      <Navbar />
      <JedaJiwaSection data={dict.home.jeda} />
      <BudayaAdatSection data={dict.home.budaya} />
      <HeritageSection
        data={{
          intro: dict.heritageIntro,
          items: dict.heritageItems,
          closing: dict.heritageClosing,
        }}
      />
      <FunFactSection data={dict.home.funfact} />
      <JourneyMapSection data={dict.home.journey} />
      <DestinasiTerbaikSection data={dict.home.destinasi} />
      <BeritaUmkmSection news={dict.news} umkms={dict.umkms} lang={lang} />
      <ContactSection data={dict.home.contact} />
      <Footer lang={lang} />
    </>
  );
}
