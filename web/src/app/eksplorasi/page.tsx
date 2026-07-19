import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SeoJsonLd from "@/components/SeoJsonLd";
import { spotAlam } from "@/content/eksplorasi";
import HeroMetiSection from "@/components/eksplorasi/HeroMetiSection";
import WerWaratSection from "@/components/eksplorasi/WerWaratSection";
import PentasSeniSection from "@/components/eksplorasi/PentasSeniSection";
import PerahuBelanSection from "@/components/eksplorasi/PerahuBelanSection";
import WisataAlamSection from "@/components/eksplorasi/WisataAlamSection";
import SatwaEndemikSection from "@/components/eksplorasi/SatwaEndemikSection";
import PenghormatanSection from "@/components/eksplorasi/PenghormatanSection";
import InformasiPenutupSection from "@/components/eksplorasi/InformasiPenutupSection";

export const metadata: Metadata = {
  title: "Eksplorasi — Festival Pesona Meti Kei | Simfoni Evav",
  description:
    "Telusuri Festival Pesona Meti Kei di Kepulauan Kei: dari Wer Warat, pentas seni, perahu belan, wisata kuliner, hingga penghormatan adat. Satu perayaan pasang surut kehidupan masyarakat Evav yang diwariskan turun-temurun.",
  alternates: {
    canonical: "/eksplorasi",
  },
  openGraph: {
    title: "Eksplorasi — Festival Pesona Meti Kei",
    description:
      "Satukan langkah dalam Festival Pesona Meti Kei, perayaan pasang surut kehidupan masyarakat Evav di Kepulauan Kei, Maluku Tenggara.",
    url: "/eksplorasi",
    type: "website",
  },
};

export default function EksplorasiPage() {
  const SITE_URL = "https://discoverevav.id";

  const spotJsonLd = spotAlam.map((spot) => ({
    "@context": "https://schema.org",
    "@type": "TouristAttraction",
    "@id": `${SITE_URL}/#${spot.id}`,
    name: spot.nama,
    description: spot.deskripsi,
    image: `${SITE_URL}${spot.gambar}`,
    url: `${SITE_URL}/eksplorasi#${spot.id}`,
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
      <main id="main-content">
        {spotJsonLd.map((jsonLd) => (
          <SeoJsonLd key={jsonLd["@id"]} jsonLd={jsonLd} />
        ))}
        <HeroMetiSection />
        <WerWaratSection />
        <PentasSeniSection />
        <PerahuBelanSection />
        <WisataAlamSection />
        <SatwaEndemikSection />
        <PenghormatanSection />
        <InformasiPenutupSection />
      </main>
      <Footer />
    </>
  );
}
