import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SeoJsonLd from "@/components/SeoJsonLd";
import { spotAlam } from "@/content/explore";
import HeroMetiSection from "@/components/explore/HeroMetiSection";
import WerWaratSection from "@/components/explore/WerWaratSection";
import PentasSeniSection from "@/components/explore/PentasSeniSection";
import PerahuBelanSection from "@/components/explore/PerahuBelanSection";
import WisataAlamSection from "@/components/explore/WisataAlamSection";
import SatwaEndemikSection from "@/components/explore/SatwaEndemikSection";
import PenghormatanSection from "@/components/explore/PenghormatanSection";
import InformasiPenutupSection from "@/components/explore/InformasiPenutupSection";

export const metadata: Metadata = {
  title: "Eksplorasi — Festival Pesona Meti Kei | Simfoni Evav",
  description:
    "Telusuri Festival Pesona Meti Kei di Kepulauan Kei: dari Wer Warat, pentas seni, perahu belan, wisata kuliner, hingga penghormatan adat. Satu perayaan pasang surut kehidupan masyarakat Evav yang diwariskan turun-temurun.",
  alternates: {
    canonical: "/explore",
  },
  openGraph: {
    title: "Eksplorasi — Festival Pesona Meti Kei",
    description:
      "Satukan langkah dalam Festival Pesona Meti Kei, perayaan pasang surut kehidupan masyarakat Evav di Kepulauan Kei, Maluku Tenggara.",
    url: "/explore",
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
        <HeroMetiSection />
        <WerWaratSection />
        <PentasSeniSection />
        <PerahuBelanSection />
        <WisataAlamSection />
        <SatwaEndemikSection />
        <PenghormatanSection />
        <InformasiPenutupSection />
      </div>
      <Footer />
    </>
  );
}
