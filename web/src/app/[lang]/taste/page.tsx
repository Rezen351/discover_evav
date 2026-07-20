import { notFound } from "next/navigation";
import { hasLocale, getDictionary } from "@/content/dictionaries";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import HeroTasteSection from "@/components/taste/HeroTasteSection";
import SignatureDishesSection from "@/components/taste/SignatureDishesSection";
import StorySection from "@/components/taste/StorySection";
import BentoSection from "@/components/taste/BentoSection";
import UmkmCatalogSection from "@/components/taste/UmkmCatalogSection";
import ClosingSection from "@/components/taste/ClosingSection";

export async function generateMetadata({
  params,
}: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  return {
    title:
      lang === "en"
        ? "Taste — Cuisine & Flavors of the Kei Islands | Simfoni Evav"
        : "Taste — Kuliner & Cita Rasa Kepulauan Kei | Simfoni Evav",
    description:
      lang === "en"
        ? "Discover the Taste of Kei: charcoal-grilled fish with spiced Enbal, Colo-colo vinegar sambal, sago, banana, and coastal grilled snacks. Kei cuisine born of the sea, sasi, and the togetherness of the Yelim table."
        : "Selami Rasa Kei: Enbal ikan bakar bumbu khas, Colo-colo sambal cuka, sagu, pisang, dan camilan bakar pesisir. Kuliner Kepulauan Kei yang lahir dari laut, sasi, dan kebersamaan meja makan ala Yelim.",
    alternates: {
      canonical: "/taste",
      languages: {
        id: "/id/taste",
        en: "/en/taste",
        "x-default": "/id/taste",
      },
    },
    openGraph: {
      title:
        lang === "en"
          ? "Taste — Cuisine & Flavors of the Kei Islands"
          : "Taste — Kuliner & Cita Rasa Kepulauan Kei",
      description:
        lang === "en"
          ? "From Enbal to Colo-colo, meet the warm, honest flavors of the Kei Islands, served together in the spirit of Yelim."
          : "Dari Enbal hingga Colo-colo, kenali cita rasa Kepulauan Kei yang hangat, jujur, dan dihidangkan bersama dalam semangat Yelim.",
      url: "/taste",
      locale: lang === "en" ? "en_US" : "id_ID",
      type: "website",
    },
  };
}

export default async function TastePage({
  params,
}: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();

  const dict = await getDictionary(lang);

  return (
    <>
      <Navbar />
      <main id="main-content">
        <HeroTasteSection lang={lang} data={dict.heroTaste} />
        <SignatureDishesSection lang={lang} data={dict.signatureDishes} />
        <StorySection lang={lang} data={dict.tasteStory} />
        <BentoSection lang={lang} data={dict.bentoTaste} />
        <UmkmCatalogSection lang={lang} data={dict.umkms} />
        <ClosingSection lang={lang} data={dict.tasteClosing} />
      </main>
      <Footer lang={lang} />
    </>
  );
}
