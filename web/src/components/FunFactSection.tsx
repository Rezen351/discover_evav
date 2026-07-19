"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import { GlobeAltIcon, BookOpenIcon, SparklesIcon, ShoppingBagIcon, ShieldCheckIcon, CheckCircleIcon, ChevronRightIcon } from "@heroicons/react/24/outline";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import StatsCounter from "@/components/StatsCounter";
import { useSpotlight } from "@/hooks/useSpotlight";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const tabs = [
  { name: "Alam", icon: <GlobeAltIcon className="w-5 h-5" /> },
  { name: "Budaya", icon: <BookOpenIcon className="w-5 h-5" /> },
  { name: "Satwa", icon: <SparklesIcon className="w-5 h-5" /> },
  { name: "Kuliner", icon: <ShoppingBagIcon className="w-5 h-5" /> },
  { name: "Teknologi", icon: <ShieldCheckIcon className="w-5 h-5" /> },
];

type TabName = "Alam" | "Budaya" | "Satwa" | "Kuliner" | "Teknologi";

interface DestinationItem {
  tag: string;
  image: string;
  title: string;
  subtitle: string;
  descTitle: string;
  descPoints: string[];
}

const tabData: Record<TabName, { items: DestinationItem[]; ctaText: string }> = {
  Alam: {
    ctaText: "EKSPLORASI",
    items: [
      {
        tag: "DESTINASI UTAMA",
        image: "/images/meti/kei_ngurbloat.png",
        title: "Pantai Ngurbloat",
        subtitle: "Pasir Sehalus Tepung",
        descTitle: "Pantai Ngurbloat memiliki pasir sehalus tepung",
        descPoints: [
          "5.8 KM garis pantai pasir putih terpanjang di Asia Tenggara",
          "Butiran pasir selembut bedak bayi yang sangat unik dan ikonik",
          "Pemandangan matahari terbenam yang memukau mata dunia"
        ]
      },
      {
        tag: "WISATA KARST",
        image: "/images/meti/kei_bair.png",
        title: "Tebing Karst Bair",
        subtitle: "Raja Ampat-nya Kei",
        descTitle: "Pulau Bair menyajikan tebing karst & air kristal",
        descPoints: [
          "Tebing batu karang megah mengelilingi perairan biru jernih",
          "Labirin air laut alami yang sangat eksotis untuk berkayak",
          "Habitat alami hiu blacktip kecil yang ramah pengunjung"
        ]
      },
      {
        tag: "GOA ALAMI",
        image: "/images/meti/kei_hawang.png",
        title: "Goa Hawang",
        subtitle: "Misteri Air Biru Sebening Kaca",
        descTitle: "Goa Hawang menyimpan kolam biru sebening kristal",
        descPoints: [
          "Kolam air tawar alami yang sangat jernih di dalam goa",
          "Struktur stalaktit purba yang bergelantungan secara eksotis",
          "Legenda batu kutukan pemburu yang penuh nilai sejarah kuno"
        ]
      }
    ]
  },
  Budaya: {
    ctaText: "PELAJARI",
    items: [
      {
        tag: "WARISAN LELUHUR",
        image: "/images/budaya/kei_tanimbar.png",
        title: "Desa Tanimbar Kei",
        subtitle: "Jejak Peradaban Kuno",
        descTitle: "Kampung adat kuno yang memegang teguh warisan leluhur",
        descPoints: [
          "Arsitektur rumah adat kayu tradisional yang sarat nilai filosofi",
          "Masyarakat adat yang masih mempraktikkan kepercayaan asli",
          "Situs pemakaman batu megalitikum kuno di puncak bukit tinggi"
        ]
      },
      {
        tag: "HUKUM ADAT",
        image: "/images/budaya/kei_culture_ritual.png",
        title: "Larvul Ngabal",
        subtitle: "Pedoman Hidup Suci",
        descTitle: "Tujuh pasal hukum suci penjaga tatanan sosial Evav",
        descPoints: [
          "Mengatur perlindungan hak asasi manusia dan kesusilaan",
          "Menjaga keharmonisan hubungan persaudaraan antar warga",
          "Sanksi adat yang tegas demi kelestarian moral masyarakat"
        ]
      },
      {
        tag: "SENI TRADISI",
        image: "/images/budaya/kei_people_portrait.png",
        title: "Tari Tradisional",
        subtitle: "Ekspresi Jiwa Kei",
        descTitle: "Tarian adat penyambut tamu dan perayaan syukur panen",
        descPoints: [
          "Gerakan ritmis gemulai menceritakan kebersamaan melaut",
          "Penggunaan aksesoris bulu burung cenderawasih dan gelang perak",
          "Iringan musik tifa tradisional yang membakar semangat persatuan"
        ]
      }
    ]
  },
  Satwa: {
    ctaText: "LIHAT",
    items: [
      {
        tag: "FAUNA LOKAL",
        image: "/images/satwa/kei_dolphin.png",
        title: "Burung Pelikan",
        subtitle: "Migrasi Raksasa Australia",
        descTitle: "Persinggahan burung pelikan raksasa dari Australia",
        descPoints: [
          "Ribuan kawanan burung pelikan singgah di pulau pasir timbul",
          "Momen langka pengamatan burung liar setiap pertengahan tahun",
          "Indikator ekosistem perairan Kepulauan Kei yang melimpah makanan"
        ]
      },
      {
        tag: "REPTIL LANGKA",
        image: "/images/satwa/kei_seaturtle.png",
        title: "Penyu Belimbing",
        subtitle: "Raksasa Samudra Pasifik",
        descTitle: "Perlintasan penyu belimbing raksasa yang dilindungi",
        descPoints: [
          "Menjadi jalur migrasi utama penyu purba terbesar di dunia",
          "Pantai Kei menjadi tempat bertelur yang aman bagi induk penyu",
          "Upaya konservasi ketat oleh masyarakat adat setempat"
        ]
      },
      {
        tag: "BIOTA LAUT",
        image: "/images/satwa/kei_coral.png",
        title: "Terumbu Karang",
        subtitle: "Taman Bawah Laut Segitiga Emas",
        descTitle: "Surganya keanekaragaman terumbu karang hidup",
        descPoints: [
          "Hamparan karang kipas raksasa dan soft coral beraneka warna",
          "Visibility air laut jernih tembus hingga kedalaman 30 meter",
          "Rumah bagi ribuan spesies ikan badut, manta, dan nudibranch"
        ]
      }
    ]
  },
  Kuliner: {
    ctaText: "CICIPI",
    items: [
      {
        tag: "MAKANAN POKOK",
        image: "/images/kuliner/kei_culinary_enbal.png",
        title: "Enbal Evav",
        subtitle: "Singkong Menjadi Emas",
        descTitle: "Makanan pokok unik pengganti nasi berbahan singkong",
        descPoints: [
          "Proses pengolahan tradisional untuk menghilangkan racun sianida",
          "Tekstur renyah tahan lama yang nikmat dicelupkan ke kuah ikan",
          "Simbol ketahanan pangan lokal masyarakat Kepulauan Kei"
        ]
      },
      {
        tag: "KULINER TRADISI",
        image: "/images/kuliner/kei_culinary_sirsir.png",
        title: "Sayur Sir-Sir",
        subtitle: "Cita Rasa Daun Pepaya",
        descTitle: "Tumisan khas berbahan daun singkong dan bunga pepaya",
        descPoints: [
          "Dimasak dengan santan kental gurih dan rempah khas pulau",
          "Rasa pahit khas bunga pepaya yang menggugah selera makan",
          "Hidangan wajib pendamping ikan bakar segar dan enbal"
        ]
      },
      {
        tag: "HIDANGAN LAUT",
        image: "/images/kuliner/kei_ikan_colocolo.png",
        title: "Ikan Bakar Kei",
        subtitle: "Kesegaran Tangkapan Hari Ini",
        descTitle: "Ikan karang segar dibakar dengan bumbu kelapa tradisional",
        descPoints: [
          "Tangkapan segar nelayan lokal yang langsung dibakar di pantai",
          "Bumbu siram colo-colo pedas asam manis khas Maluku",
          "Menyajikan kelembutan daging ikan kakap merah dan kerapu"
        ]
      }
    ]
  },
  Teknologi: {
    ctaText: "TELUSURI",
    items: [
      {
        tag: "KEARIFAN LOKAL",
        image: "/images/teknologi/kei_technology_hawear.png",
        title: "Hawear (Sasi Janur)",
        subtitle: "Sang Penjaga Alam",
        descTitle: "Sasi adat menggunakan janur kuning sebagai tanda larangan",
        descPoints: [
          "Hukum adat pelarangan eksploitasi alam berlebih secara berkala",
          "Sangat dihormati dan dipatuhi demi keseimbangan ekosistem",
          "Mencegah kerusakan lingkungan tanpa perlu patroli fisik"
        ]
      },
      {
        tag: "PANEN RAYA",
        image: "/images/teknologi/kei_technology_meti.png",
        title: "Meti Kei",
        subtitle: "Teknologi Tangkap Tradisional",
        descTitle: "Metode tangkap ikan massal saat surut ekstrem (meti)",
        descPoints: [
          "Memanfaatkan bentang tali janur sepanjang ratusan meter di laut",
          "Menjebak kawanan ikan secara alami saat air surut terjauh",
          "Tradisi tahunan yang dirayakan bersama seluruh elemen warga"
        ]
      },
      {
        tag: "KONSERVASI ADAT",
        image: "/images/teknologi/kei_technology_sasi.png",
        title: "Batu Sasi",
        subtitle: "Monumen Hukum Ekologis",
        descTitle: "Batu suci penanda wilayah adat yang ditutup dari penangkapan",
        descPoints: [
          "Dipasang melalui ritual adat suci para tetua dan raja Kei",
          "Menjamin ikan dan biota laut bereproduksi secara optimal",
          "Bentuk nyata kearifan lokal dalam menjaga biodiversitas laut"
        ]
      }
    ]
  }
};

export default function FunFactSection() {
  const [activeTab, setActiveTab] = useState<TabName>("Alam");
  const [activeDest, setActiveDest] = useState<number>(0);
  const [progress, setProgress] = useState(0);

  const activeData = tabData[activeTab];
  const activeItem = activeData.items[activeDest];
  const totalItems = activeData.items.length;

  // Menghitung indeks tidak aktif untuk diletakkan di grid kanan
  const inactiveIndices = [0, 1, 2].filter(idx => idx !== activeDest);
  const rightTopItem = activeData.items[inactiveIndices[0]];
  const rightLeftItem = activeData.items[inactiveIndices[1]];

  const containerRef = useRef<HTMLElement>(null);
  const boxesRef = useRef<(HTMLDivElement | HTMLButtonElement | null)[]>([]);

  const changeTab = (tabName: TabName) => {
    setActiveTab(tabName);
    setActiveDest(0);
    setProgress(0);
    startAutoplay();
  };

  const goToDest = (idx: number) => {
    setActiveDest(idx);
    setProgress(0);
    startAutoplay();
  };

  // Autoplay with progress bar (5s), restart on manual interaction
  const autoplayRef = useRef<number | null>(null);
  const activeTabRef = useRef(activeTab);
  useEffect(() => { activeTabRef.current = activeTab; }, [activeTab]);

  const startAutoplay = useCallback(() => {
    if (autoplayRef.current) window.clearInterval(autoplayRef.current);
    setProgress(0);
    const duration = 5000;
    const step = 50;
    let elapsed = 0;
    const ticker = window.setInterval(() => {
      elapsed += step;
      setProgress(Math.min(100, (elapsed / duration) * 100));
      if (elapsed >= duration) {
        setActiveDest((prev) => (prev + 1) % tabData[activeTabRef.current].items.length);
        elapsed = 0;
        setProgress(0);
      }
    }, step);
    autoplayRef.current = ticker;
  }, []);

  useEffect(() => {
    startAutoplay();
    return () => {
      if (autoplayRef.current) window.clearInterval(autoplayRef.current);
    };
  }, [startAutoplay]);

  // Animasi GSAP untuk transisi masuk content
  useEffect(() => {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 65%",
          toggleActions: "play none none reverse",
        }
      });

      if (prefersReduced) {
        gsap.set([".fade-up-item", ...boxesRef.current.filter(Boolean)], { opacity: 1, y: 0, scale: 1 });
        return;
      }

      tl.from(".fade-up-item", {
        y: 40,
        opacity: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: "power2.out",
      });

      const validBoxes = boxesRef.current.filter(Boolean);
      tl.from(validBoxes, {
        y: 60,
        opacity: 0,
        scale: 0.95,
        duration: 0.8,
        stagger: 0.1,
        ease: "back.out(1.2)",
      }, "-=0.4");

    }, containerRef);
    return () => ctx.revert();
  }, []);

  const { onMouseMove, onMouseLeave } = useSpotlight();

  return (
    <section id="funfact" className="relative w-full min-h-screen bg-tropical-dark pt-20 pb-8 md:pt-24 md:pb-12 z-[4] flex items-center justify-center snap-start snap-always overflow-hidden" ref={containerRef}>

      {/* Dekorasi kapal layar di sisi kanan atas */}
      <div
        className="absolute top-[2%] right-[2%] z-0 pointer-events-none w-[320px] md:w-[480px] lg:w-[600px] translate-x-[8%]"
        style={{
          WebkitMaskImage:
            "radial-gradient(ellipse 75% 75% at 50% 45%, #000 35%, rgba(0,0,0,0.55) 60%, transparent 85%)",
          maskImage:
            "radial-gradient(ellipse 75% 75% at 50% 45%, #000 35%, rgba(0,0,0,0.55) 60%, transparent 85%)",
        }}
      >
        <div className="relative w-full">
          {/* Matahari + awan yang melintas di atas kapal, di tengah */}
          <div className="absolute left-1/2 -translate-x-1/2 right-[5%] top-[0%] w-[16%] z-0 opacity-[0.1]">
            {/* Matahari kecil */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/MAatahari.svg"
              alt=""
              aria-hidden="true"
              className="w-[62%] h-auto mx-auto select-none"
            />

            {/* Awan bergerak seperti ombak — band seamless yang bergeser terus, menutupi sedikit matahari */}
            <div
              className="absolute inset-0 overflow-hidden pointer-events-none"
              style={{
                WebkitMaskImage:
                  "linear-gradient(to right, transparent 0%, #000 22%, #000 78%, transparent 100%)",
                maskImage:
                  "linear-gradient(to right, transparent 0%, #000 22%, #000 78%, transparent 100%)",
              }}
            >
              {/* Lapis belakang (lebih besar, lebih pelan) */}
              <div className="absolute left-0 right-0 top-[22%]">
                <svg
                  viewBox="0 0 240 40"
                  className="w-[200%] h-auto cloud-scroll-slow"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  preserveAspectRatio="none"
                  aria-hidden="true"
                >
                  <path
                    d="M0 34c8 0 10-8 18-8 4 0 6 2 8 4 3-6 8-10 15-10 8 0 14 5 16 12 2-1 4-1.5 6-1.5 5 0 9 3.5 10 8H0V34Z
                       M120 34c8 0 10-8 18-8 4 0 6 2 8 4 3-6 8-10 15-10 8 0 14 5 16 12 2-1 4-1.5 6-1.5 5 0 9 3.5 10 8H120V34Z"
                    fill="var(--color-primary-pink)"
                    fillOpacity="0.85"
                  />
                </svg>
              </div>
              {/* Lapis depan (lebih cepat, lebih pekat, sedikit menutup matahari) */}
              <div className="absolute left-0 right-0 top-[40%]">
                <svg
                  viewBox="0 0 240 40"
                  className="w-[200%] h-auto cloud-scroll"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  preserveAspectRatio="none"
                  aria-hidden="true"
                >
                  <path
                    d="M0 34c8 0 10-8 18-8 4 0 6 2 8 4 3-6 8-10 15-10 8 0 14 5 16 12 2-1 4-1.5 6-1.5 5 0 9 3.5 10 8H0V34Z
                       M120 34c8 0 10-8 18-8 4 0 6 2 8 4 3-6 8-10 15-10 8 0 14 5 16 12 2-1 4-1.5 6-1.5 5 0 9 3.5 10 8H120V34Z"
                    fill="var(--color-primary-pink)"
                    fillOpacity="0.95"
                  />
                </svg>
              </div>
            </div>
          </div>

          {/* Kapal di depan matahari dengan animasi mengapung */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/Kapal.svg"
            alt="Dekorasi kapal layar Kei"
            className="relative z-10 mx-auto right-[5%] mt-[14%] w-[60%] h-auto boat-anim select-none opacity-[0.1]"
          />

          {/* Ombak bergerak di bawah kapal */}
          <div className="absolute left-0 right-0 bottom-[6%] overflow-hidden pointer-events-none opacity-[0.1]">
            <div className="wave-bob">
              <svg
                viewBox="0 0 1024 60"
                className="w-[200%] h-auto wave-scroll"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                preserveAspectRatio="none"
              >
                <path
                  d="M0 34 Q64 52 128 34 T256 34 T384 34 T512 34 T640 34 T768 34 T896 34 T1024 34 L1024 60 L0 60 Z"
                  fill="var(--color-primary-pink)"
                  fillOpacity="0.55"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-[98%] xl:max-w-[1600px] mx-auto px-4 md:px-8 w-full flex flex-col gap-4 md:gap-6 relative z-10 self-start lg:self-center">

        {/* ROW 1: Header (Headline & Tabs Aligned) */}
        <div className="flex flex-col xl:flex-row justify-between items-end gap-4 w-full fade-up-item">
          {/* Left: Headline */}
          <div className="w-full xl:w-[35%] flex-none">
            <div className="text-brand font-bold tracking-[0.2em] uppercase text-fluid-eyebrow mb-1" style={{ fontFamily: "var(--font-sans)" }}>
              FUN FACT
            </div>
            <h2 className="text-fluid-h2 text-white font-normal" style={{ fontFamily: "var(--font-serif)" }}>
              Mengapa Kepulauan Kei <br className="hidden md:block" /> Begitu <span className="text-brand">Istimewa</span>
            </h2>
          </div>

          {/* Right: Navigation Tabs — pill style, wrappable di mobile */}
          <div className="w-full xl:w-[65%]">
            <div className="flex items-center flex-wrap justify-start xl:justify-end gap-2 xl:gap-3">
            {tabs.map((tab) => (
              <button
                key={tab.name}
                onClick={() => changeTab(tab.name as TabName)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full border text-sm transition-all duration-200 focus-ring whitespace-nowrap ${
                  activeTab === tab.name
                    ? "bg-brand/20 border-brand text-brand"
                    : "bg-white/5 border-white/20 text-white/60 hover:border-brand/50 hover:text-white"
                }`}
                style={{ fontFamily: "var(--font-sans)" }}
              >
                <span className={`flex-none ${activeTab === tab.name ? "text-brand" : "text-white/50"}`}>
                  {tab.icon}
                </span>
                <span className="font-medium text-xs md:text-sm">{tab.name}</span>
              </button>
            ))}
            </div>
          </div>
        </div>

        {/* ROW 2: Content (Left Card & Right Details Aligned at the top) */}
        <div className="flex flex-col xl:flex-row gap-6 xl:gap-8 items-start w-full">

          {/* Left Column: Big Card */}
          <div className="w-full xl:w-[35%] flex-none fade-up-item">
            {/* Big Pink Box below headline - Fixed landscape height */}
            <div key={`main-${activeTab}-${activeDest}`} className="w-full h-[220px] md:h-[280px] lg:h-[310px] bg-white/10 rounded-lg-design overflow-hidden shadow-card relative group cursor-pointer active:press animate-[fadeSlideUp_0.5s_ease-out]">
              <Image src={activeItem.image} alt={activeItem.title} fill sizes="(max-width: 768px) 100vw, 40vw" className="object-cover transition-transform duration-700 group-hover:scale-105" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent"></div>
              <div className="absolute bottom-4 left-4 md:bottom-6 md:left-6 pr-4">
                <span className="bg-nav-gradient text-black text-xs font-bold tracking-widest px-3 py-1 rounded-xl mb-2 inline-block shadow-lg" style={{ fontFamily: "var(--font-sans)" }}>{activeItem.tag}</span>
                <h3 className="text-2xl md:text-3xl lg:text-[34px] text-white font-normal leading-tight drop-shadow-md whitespace-pre-line" style={{ fontFamily: "var(--font-serif)" }}>
                  {activeItem.title}
                </h3>
              </div>
            </div>
          </div>

          {/* Right Column: Text & Grid */}
          <div key={`content-${activeTab}-${activeDest}`} className="w-full xl:w-[65%] flex flex-col md:flex-row gap-6 items-start fade-up-item">

            {/* Text Content */}
            <div className="flex flex-col w-full md:w-[45%]">
              <h3 className="text-xl md:text-2xl lg:text-[26px] leading-snug text-white mb-2 md:mb-3" style={{ fontFamily: "var(--font-serif)" }}>
                {activeItem.descTitle}
              </h3>

              <div className="flex flex-col gap-2 md:gap-3">
                {activeItem.descPoints.map((text: string, i: number) => (
                  <div key={i} className="flex items-start gap-3 text-white/90 group">
                    <div className="mt-1 text-brand transition-transform group-hover:scale-110 flex-none">
                      <CheckCircleIcon className="w-4 h-4" />
                    </div>
                    <span className="text-xs md:text-sm font-light opacity-90 leading-relaxed text-justify" style={{ fontFamily: "var(--font-sans)" }}>
                      {text}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* 3 Right Boxes Grid */}
            <div className="flex flex-col w-full md:w-[55%] gap-3 h-[220px] md:h-[280px] lg:h-[310px]">
              {/* Top wide box - Click to Select */}
              {rightTopItem && (
                <div
                  key={`box-top-${activeTab}-${inactiveIndices[0]}`}
                  ref={(el) => { boxesRef.current[0] = el; }}
                  onClick={() => goToDest(inactiveIndices[0])}
                  className="w-full flex-[1.2] min-h-0 bg-white/10 rounded-lg-design shadow-soft relative overflow-hidden group cursor-pointer transition-all active:press"
                >
                  <Image src={rightTopItem.image} alt={rightTopItem.title} fill sizes="(max-width: 768px) 100vw, 30vw" className="object-cover transition-transform duration-700 group-hover:scale-105" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent"></div>
                  <div className="absolute bottom-4 left-5 right-5">
                    <h4 className="text-xl md:text-2xl text-white font-normal drop-shadow-md" style={{ fontFamily: "var(--font-serif)" }}>{rightTopItem.title}</h4>
                    <p className="text-white/80 text-xs mt-0.5 font-light" style={{ fontFamily: "var(--font-sans)" }}>{rightTopItem.subtitle}</p>
                  </div>
                </div>
              )}

              {/* Bottom 2 boxes */}
              <div className="flex flex-row gap-3 flex-1 min-h-0">
                {/* Bottom Left: Click to Select */}
                {rightLeftItem && (
                  <div
                    key={`box-left-${activeTab}-${inactiveIndices[1]}`}
                    ref={(el) => { boxesRef.current[1] = el; }}
                    onClick={() => goToDest(inactiveIndices[1])}
                    className="w-1/2 h-full bg-white/10 rounded-lg-design shadow-soft relative overflow-hidden group cursor-pointer transition-all active:press"
                  >
                    <Image src={rightLeftItem.image} alt={rightLeftItem.title} fill sizes="(max-width: 768px) 50vw, 15vw" className="object-cover transition-transform duration-700 group-hover:scale-105" />
                    <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors duration-500"></div>
                    <div className="absolute inset-0 flex flex-col items-center justify-center p-3 text-center">
                      <span className="text-white font-normal text-lg md:text-xl drop-shadow-md" style={{ fontFamily: "var(--font-serif)" }}>{rightLeftItem.title}</span>
                    </div>
                  </div>
                )}

                {/* Bottom Right: Call to action */}
                <button
                  key={`box-right-${activeTab}-${activeDest}`}
                  ref={(el) => { boxesRef.current[2] = el; }}
                  onMouseMove={onMouseMove}
                  onMouseLeave={onMouseLeave}
                  className="w-1/2 h-full bg-nav-gradient rounded-lg-design flex flex-col items-center justify-center p-3 text-center text-black cursor-pointer hover:brightness-105 active:press transition-all border-0 outline-none group focus-ring"
                >
                  <span className="text-xs md:text-sm font-bold tracking-widest uppercase mb-1" style={{ fontFamily: "var(--font-sans)" }}>{activeData.ctaText}</span>
                  <div className="w-8 h-8 rounded-full border border-black/20 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <ChevronRightIcon className="w-4 h-4 text-black" />
                  </div>
                </button>
              </div>
            </div>

          </div>
        </div>

        {/* Human-oriented microcopy: quote budaya */}
        <p className="text-center text-white/50 text-fluid-small italic mt-3 md:mt-4 fade-up-item max-w-2xl mx-auto" style={{ fontFamily: "var(--font-serif)" }}>
          &ldquo;Di atas pasir putih ini, kami diajarkan bahwa alam bukan milik kita, melainkan titipan leluhur untuk anak cucu.&rdquo;
        </p>

        <StatsCounter />
      </div>
    </section>
  );
}
