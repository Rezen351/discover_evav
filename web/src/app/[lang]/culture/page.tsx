import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getDictionary, hasLocale } from "@/content/dictionaries";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import HeroBudayaSection from "@/components/culture/HeroBudayaSection";
import LarvulNgabalSection from "@/components/culture/LarvulNgabalSection";
import FilosofiSection from "@/components/culture/FilosofiSection";
import EkspresiBudayaSection from "@/components/culture/EkspresiBudayaSection";
import BreatherSection from "@/components/culture/BreatherSection";
import WarisanTakbendaSection from "@/components/culture/WarisanTakbendaSection";
import FestivalMetiSection from "@/components/culture/FestivalMetiSection";
import BudayaTimelineSection from "@/components/culture/BudayaTimelineSection";

export async function generateMetadata({
  params,
}: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  return {
    title:
      lang === "en"
        ? "The Soul of Kei — Culture & History of the Kei Islands | Simfoni Evav"
        : "Jiwa Kei — Budaya & Sejarah Kepulauan Kei | Simfoni Evav",
    description:
      lang === "en"
        ? "Dive into the soul of the Kei Islands: the oral customary law of Larvul Ngabal, the Ain Ni Ain philosophy, belis, Elat woven ikat, and interfaith harmony since Islam arrived in 1252 CE. A culture danced, sung, and worn across the Land of Evav."
        : "Selami jiwa Kepulauan Kei: hukum adat lisan Larvul Ngabal, falsafah Ain Ni Ain, belis, tenun ikat Elat, dan harmoni lintas iman sejak Islam masuk 1252 M. Budaya yang ditarikan, dinyanyikan, dan dikenakan di Tanah Evav.",
    alternates: {
      canonical: "/culture",
      languages: {
        id: "/id/culture",
        en: "/en/culture",
        "x-default": "/id/culture",
      },
    },
    openGraph: {
      title:
        lang === "en"
          ? "The Soul of Kei — Culture & History of the Kei Islands"
          : "Jiwa Kei — Budaya & Sejarah Kepulauan Kei",
      description:
        lang === "en"
          ? "A symphony of life upon white sands: Larvul Ngabal, Ain Ni Ain, Sawat dance, traditional attire, Elat woven ikat, and the Meti Kei tradition."
          : "Simfoni kehidupan di atas pasir putih: Larvul Ngabal, Ain Ni Ain, tari Sawat, busana adat, tenun ikat Elat, dan tradisi Meti Kepulauan Kei.",
      url: "/culture",
      locale: lang === "en" ? "en_US" : "id_ID",
      type: "website",
    },
  };
}

export default async function BudayaPage({
  params,
}: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const dict = await getDictionary(lang);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline:
      lang === "en"
        ? "The Soul of Kei — Culture & History of the Kei Islands"
        : "Jiwa Kei — Budaya & Sejarah Kepulauan Kei",
    description:
      lang === "en"
        ? "Dive into the soul of the Kei Islands: the oral customary law of Larvul Ngabal, the Ain Ni Ain philosophy, belis, Elat woven ikat, and interfaith harmony since Islam arrived in 1252 CE."
        : "Selami jiwa Kepulauan Kei: hukum adat lisan Larvul Ngabal, falsafah Ain Ni Ain, belis, tenun ikat Elat, dan harmoni lintas iman sejak Islam masuk 1252 M. Budaya yang ditarikan, dinyanyikan, dan dikenakan di Tanah Evav.",
    inLanguage: lang === "en" ? "en-US" : "id-ID",
    about: { "@type": "TouristAttraction", name: "Kepulauan Kei", address: { "@type": "PostalAddress", addressRegion: "Maluku Tenggara", addressCountry: "ID" } },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Navbar />
      <HeroBudayaSection lang={lang} data={dict.heroBudaya} />
      <LarvulNgabalSection lang={lang} data={dict.larvulNgabal} common={dict.cultureCommon} />
      <FilosofiSection lang={lang} data={dict.filosofi} />
      <EkspresiBudayaSection lang={lang} data={dict.ekspresiBudaya} common={dict.cultureCommon} />
      <BreatherSection lang={lang} data={dict.breather} />
      <WarisanTakbendaSection lang={lang} data={dict.warisanTakbenda} />
      <FestivalMetiSection lang={lang} data={dict.festivalMetiKei} />
      <BudayaTimelineSection lang={lang} data={dict.linimasa} />
      <Footer lang={lang} />
    </>
  );
}
