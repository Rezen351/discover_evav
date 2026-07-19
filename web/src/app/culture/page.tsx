import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import HeroBudayaSection from "@/components/culture/HeroBudayaSection";
import LarvulNgabalSection from "@/components/culture/LarvulNgabalSection";
import FilosofiSection from "@/components/culture/FilosofiSection";
import EkspresiBudayaSection from "@/components/culture/EkspresiBudayaSection";
import BreatherSection from "@/components/culture/BreatherSection";
import WarisanTakbendaSection from "@/components/culture/WarisanTakbendaSection";
import BudayaTimelineSection from "@/components/culture/BudayaTimelineSection";

export const metadata: Metadata = {
  title: "Jiwa Kei — Budaya & Sejarah Kepulauan Kei | Simfoni Evav",
  description:
    "Selami jiwa Kepulauan Kei: hukum adat lisan Larvul Ngabal, falsafah Ain Ni Ain, belis, tenun ikat Elat, dan harmoni lintas iman sejak Islam masuk 1252 M. Budaya yang ditarikan, dinyanyikan, dan dikenakan di Tanah Evav.",
  alternates: {
    canonical: "/culture",
  },
  openGraph: {
    title: "Jiwa Kei — Budaya & Sejarah Kepulauan Kei",
    description:
      "Simfoni kehidupan di atas pasir putih: Larvul Ngabal, Ain Ni Ain, tari Sawat, busana adat, tenun ikat Elat, dan tradisi Meti Kepulauan Kei.",
    url: "/culture",
    type: "website",
  },
};

export default function BudayaPage() {
  return (
    <>
      <Navbar />
      <HeroBudayaSection />
      <LarvulNgabalSection />
      <FilosofiSection />
      <EkspresiBudayaSection />
      <BreatherSection />
      <WarisanTakbendaSection />
      <BudayaTimelineSection />
      <Footer />
    </>
  );
}
