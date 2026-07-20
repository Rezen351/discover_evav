import { notFound } from "next/navigation";
import { getDictionary, hasLocale } from "@/content/dictionaries";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SeoJsonLd from "@/components/SeoJsonLd";
import HeroMetiSection from "@/components/explore/HeroMetiSection";
import WerWaratSection from "@/components/explore/WerWaratSection";
import PentasSeniSection from "@/components/explore/PentasSeniSection";
import PerahuBelanSection from "@/components/explore/PerahuBelanSection";
import WisataAlamSection from "@/components/explore/WisataAlamSection";
import SatwaEndemikSection from "@/components/explore/SatwaEndemikSection";
import PenghormatanSection from "@/components/explore/PenghormatanSection";
import InformasiPenutupSection from "@/components/explore/InformasiPenutupSection";

export async function generateMetadata({
  params,
}: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  return {
    title:
      lang === "en"
        ? "Explore — The Meti Kei Festival of Wonders | Simfoni Evav"
        : "Eksplorasi — Festival Pesona Meti Kei | Simfoni Evav",
    description:
      lang === "en"
        ? "Trace the Meti Kei Festival of Wonders across the Kei Islands: from Wer Warat, arts stage, belan boats, culinary tourism, to customary homage. A celebration of the ebb and flow of Evav life, passed down through generations."
        : "Telusuri Festival Pesona Meti Kei di Kepulauan Kei: dari Wer Warat, pentas seni, perahu belan, wisata kuliner, hingga penghormatan adat. Satu perayaan pasang surut kehidupan masyarakat Evav yang diwariskan turun-temurun.",
    alternates: {
      canonical: "/explore",
      languages: {
        id: "/id/explore",
        en: "/en/explore",
        "x-default": "/id/explore",
      },
    },
    openGraph: {
      title:
        lang === "en"
          ? "Explore — The Meti Kei Festival of Wonders"
          : "Eksplorasi — Festival Pesona Meti Kei",
      description:
        lang === "en"
          ? "Step together in the Meti Kei Festival of Wonders, a celebration of the ebb and flow of Evav life in the Kei Islands, Southeast Maluku."
          : "Satukan langkah dalam Festival Pesona Meti Kei, perayaan pasang surut kehidupan masyarakat Evav di Kepulauan Kei, Maluku Tenggara.",
      url: "/explore",
      locale: lang === "en" ? "en_US" : "id_ID",
      type: "website",
    },
  };
}

export default async function EksplorasiPage({
  params,
}: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const dict = await getDictionary(lang);

  const SITE_URL = "https://discoverevav.id";

  const spotJsonLd = dict.spotAlam.map((spot) => ({
    "@context": "https://schema.org",
    "@type": "TouristAttraction",
    "@id": `${SITE_URL}/#${spot.id}`,
    name: spot.nama,
    description: spot.deskripsi,
    image: `${SITE_URL}${spot.gambar}`,
    url: `${SITE_URL}/explore#${spot.id}`,
    geo: {
      "@type": "GeoCoordinates",
      latitude: spot.lat,
      longitude: spot.lng,
    },
    address: {
      "@type": "PostalAddress",
      addressRegion: "Maluku Tenggara",
      addressCountry: "ID",
    },
    isPartOf: { "@id": `${SITE_URL}/#kepulauan-kei` },
  }));

  return (
    <>
      <Navbar />
      <div id="main-content">
        {spotJsonLd.map((jsonLd) => (
          <SeoJsonLd key={jsonLd["@id"]} jsonLd={jsonLd} />
        ))}
        <HeroMetiSection lang={lang} />
        <WerWaratSection lang={lang} />
        <PentasSeniSection lang={lang} />
        <PerahuBelanSection lang={lang} />
        <WisataAlamSection
          lang={lang}
          data={dict.spotAlam}
          categories={dict.kategoriAlam}
        />
        <SatwaEndemikSection lang={lang} data={dict.satwaEndemik} />
        <PenghormatanSection lang={lang} />
        <InformasiPenutupSection lang={lang} />
      </div>
      <Footer lang={lang} />
    </>
  );
}
