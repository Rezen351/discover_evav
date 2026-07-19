import type { Metadata } from "next";
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

export const metadata: Metadata = {
  title: "Simfoni Evav — Peradaban di Atas Pasir Putih | Kepulauan Kei",
  description:
    "Eksplorasi surga tersembunyi dan keajaiban budaya di Kepulauan Kei. Selami keindahan alam, jiwa adat Ain Ni Ain, dan pesona peradaban di atas pasir putih Maluku Tenggara bersama Simfoni Evav.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Simfoni Evav — Peradaban di Atas Pasir Putih",
    description:
      "Eksplorasi surga tersembunyi dan keajaiban budaya di Kepulauan Kei, Maluku Tenggara.",
    url: "/",
    type: "website",
  },
};

export default function Home() {
  return (
    <>
      <HeroSection />
      <Navbar />
      <JedaJiwaSection />
      <BudayaAdatSection />
      <HeritageSection />
      <FunFactSection />
      <JourneyMapSection />
      <DestinasiTerbaikSection />
      <BeritaUmkmSection />
      <ContactSection />
      <Footer />
    </>
  );
}
