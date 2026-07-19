"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import type React from "react";
import Image from "next/image";
import { MapPinIcon, StarIcon, ShoppingBagIcon, HomeModernIcon, TicketIcon, FireIcon, ChevronRightIcon } from "@heroicons/react/24/outline";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useSpotlight } from "@/hooks/useSpotlight";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

type DestTabName = "Wisata" | "Kuliner" | "Penginapan" | "Pertunjukan" | "Acara Adat";

interface DestItem {
  name: string;
  location: string;
  rating: number;
  reviews: string;
  desc: string;
  tags: string[];
  image: string;
}

const destTabs: { name: DestTabName; icon: React.ReactNode }[] = [
  { name: "Wisata", icon: <MapPinIcon className="w-4 h-4" /> },
  { name: "Kuliner", icon: <ShoppingBagIcon className="w-4 h-4" /> },
  { name: "Penginapan", icon: <HomeModernIcon className="w-4 h-4" /> },
  { name: "Pertunjukan", icon: <TicketIcon className="w-4 h-4" /> },
  { name: "Acara Adat", icon: <FireIcon className="w-4 h-4" /> },
];

const destData: Record<DestTabName, { items: DestItem[] }> = {
  Wisata: {
    items: [
      {
        name: "Pulau Bair",
        location: "Kei Kecil, Maluku Tenggara",
        rating: 4.8,
        reviews: "850 ulasan",
        desc: "Dikenal sebagai Raja Ampat-nya Maluku Tenggara. Menawarkan labirin tebing karst raksasa eksotik yang mengelilingi laguna tenang berair toska super jernih.",
        tags: ["Tebing Karst", "Laguna Indah", "Petualangan"],
        image: "/images/meti/kei_waving.png",
      },
      {
        name: "Pantai Ngurbloat",
        location: "Kei Kecil, Maluku Tenggara",
        rating: 4.9,
        reviews: "1.2k ulasan",
        desc: "Pantai dengan pasir putih terhalus di dunia selembut tepung sepanjang 5.8 kilometer. Sangat ideal untuk menikmati sunset emas dan berenang.",
        tags: ["Pasir Halus", "Sunset Emas", "Berenang"],
        image: "/images/eksplorasi/ohoiluk_gua.png",
      },
      {
        name: "Goa Hawang",
        location: "Kei Kecil, Maluku Tenggara",
        rating: 4.7,
        reviews: "620 ulasan",
        desc: "Goa stalaktit eksotis dengan kolam air tawar alami berwarna biru safir kristal yang sangat bening, terhubung langsung dengan mata air bawah tanah.",
        tags: ["Kolam Kristal", "Goa Alam", "Misteri"],
        image: "/images/eksplorasi/pulau_tersembunyi.png",
      },
      {
        name: "Spot Snorkeling Kei",
        location: "Perairan Kei Kecil",
        rating: 4.6,
        reviews: "340 ulasan",
        desc: "Jelajahi keindahan bawah laut Kepulauan Kei yang dipenuhi terumbu karang warna-warni yang sehat dan beragam biota laut tropis yang eksotis.",
        tags: ["Snorkeling", "Terumbu Karst", "Biota Laut"],
        image: "/images/eksplorasi/snorkeling_ngurtavur.png",
      },
      {
        name: "Pantai Kelapa Miring",
        location: "Ohoi Wab, Kei Kecil",
        rating: 4.7,
        reviews: "210 ulasan",
        desc: "Dikenal sebagai Pantai Ngur Vat Namsir, primadonanya adalah deretan pohon kelapa yang tumbuh miring menyeruak ke laut, di atas pasir putih selembut tepung dan air biru yang jernih. Surga tersembunyi terjaga lewat Festival Budaya Ohoi Wab.",
        tags: ["Kelapa Miring", "Pasir Halus", "Tersembunyi"],
        image: "/images/eksplorasi/pantai-kelapa-miring.jpeg",
      }
    ]
  },
  Kuliner: {
    items: [
      {
        name: "Warung Enbal Tradisional",
        location: "Langgur, Maluku Tenggara",
        rating: 4.6,
        reviews: "450 ulasan",
        desc: "Sajikan Enbal (makanan pokok pengganti nasi dari singkong khas Kei) renyah. Sangat nikmat dimakan dengan dicelup kuah sup ikan segar.",
        tags: ["Enbal", "Kuliner Lokal", "Tradisional"],
        image: "/images/kuliner/kei_food_atmosfer.png",
      },
      {
        name: "Sayur Sir-Sir Gurih",
        location: "Manyeuw, Kei Kecil",
        rating: 4.5,
        reviews: "320 ulasan",
        desc: "Olahan tumisan legendaris berbahan dasar daun singkong dan bunga pepaya muda dengan santan kental serta rempah aromatik khas Kei.",
        tags: ["Sayur Sir-Sir", "Bunga Pepaya", "Khas Kei"],
        image: "/images/kuliner/kei_pisang_enbal.png",
      },
      {
        name: "Ikan Bakar Colo-Colo",
        location: "Pantai Ohoililir, Kei Kecil",
        rating: 4.8,
        reviews: "540 ulasan",
        desc: "Ikan karang segar tangkapan nelayan lokal yang dibakar harum di atas arang kelapa, disiram sambal colo-colo pedas asam manis pedas segar.",
        tags: ["Seafood", "Colo-Colo", "Ikan Bakar"],
        image: "/images/kuliner/kei_lat.png",
      },
      {
        name: "Kue Lad & Enbal Bubuk",
        location: "Tual, Maluku Tenggara",
        rating: 4.4,
        reviews: "210 ulasan",
        desc: "Camilan manis tradisional Kei berbahan parutan enbal kering yang disajikan hangat bersama kopi atau teh jahe saat sore hari.",
        tags: ["Kue Lad", "Enbal Manis", "Camilan"],
        image: "/images/kuliner/kei_enbal_stik.png",
      }
    ]
  },
  Penginapan: {
    items: [
      {
        name: "Eco-Resort Ohoililir",
        location: "Pantai Ohoililir, Kei Kecil",
        rating: 4.8,
        reviews: "310 ulasan",
        desc: "Bungalow kayu ramah lingkungan yang dibangun di bibir pantai pasir putih. Menyuguhkan akses langsung ke pantai dan ketenangan maksimal.",
        tags: ["Eco-Resort", "Bungalow Pantai", "Tenang"],
        image: "/images/meti/kei_resort.png",
      },
      {
        name: "Cottage Pantai Ngurbloat",
        location: "Pantai Ngurbloat, Kei Kecil",
        rating: 4.5,
        reviews: "180 ulasan",
        desc: "Cottage bergaya tradisional Maluku dengan fasilitas modern yang nyaman. Hanya melangkah langsung ke hamparan pasir terhalus sedunia.",
        tags: ["Cottage", "Ngurbloat", "Keluarga"],
        image: "/images/meti/wer_warat.png",
      },
      {
        name: "Pulau Bair Camp & Glamping",
        location: "Pulau Bair, Kei Kecil",
        rating: 4.7,
        reviews: "95 ulasan",
        desc: "Pengalaman camping premium di tepi perairan karst tenang Pulau Bair. Menawarkan ketenangan malam bertabur bintang di bay privat.",
        tags: ["Glamping", "Private Bay", "Petualangan"],
        image: "/images/meti/perahu_belan.png",
      },
      {
        name: "Homestay Pantai Pasir Panjang",
        location: "Kei Kecil, Maluku Tenggara",
        rating: 4.4,
        reviews: "150 ulasan",
        desc: "Penginapan ramah kantong bernuansa kekeluargaan yang dikelola langsung oleh penduduk lokal, menyajikan hidangan sarapan tradisional Kei.",
        tags: ["Homestay", "Lokal", "Ramah Kantong"],
        image: "/images/satwa/kei_mangrove.png",
      }
    ]
  },
  Pertunjukan: {
    items: [
      {
        name: "Seni Tari Sawat",
        location: "Desa Adat Tanimbar Kei",
        rating: 4.9,
        reviews: "280 ulasan",
        desc: "Tarian adat penyambutan tamu kehormatan dengan iringan dinamis alat musik tifa dan gong, menggambarkan persahabatan hangat warga Evav.",
        tags: ["Tari Sawat", "Penyambutan", "Tifa"],
        image: "/images/budaya/kei_dada_tifa.png",
      },
      {
        name: "Ritual Tari Kipas Evav",
        location: "Ohoi Elat, Kei Besar",
        rating: 4.7,
        reviews: "150 ulasan",
        desc: "Tarian sakral nan elok dibawakan para penari putri Kei menggunakan kipas tenun tradisional, melambangkan hembusan kedamaian sosial.",
        tags: ["Tari Kipas", "Sakral", "Kedamaian"],
        image: "/images/budaya/kei_larvul_spear.png",
      },
      {
        name: "Musik Suling Bambu Evav",
        location: "Langgur, Maluku Tenggara",
        rating: 4.6,
        reviews: "190 ulasan",
        desc: "Harmoni pertunjukan musik tiup suling bambu kolosal oleh pemuda Kei yang melantunkan lagu-lagu daerah dengan melodi instrumental yang syahdu.",
        tags: ["Suling Bambu", "Melodi Syahdu", "Instrumental"],
        image: "/images/budaya/kei_busana_adat.png",
      },
      {
        name: "Pertunjukan Adat Tanimbar Kei",
        location: "Pulau Tanimbar Kei",
        rating: 4.8,
        reviews: "170 ulasan",
        desc: "Saksikan teatrikal sejarah dan kebudayaan Kei langsung di desa adat terlindung yang mempertahankan kepercayaan leluhur mereka.",
        tags: ["Teater Adat", "Sejarah", "Desa Adat"],
        image: "/images/budaya/kei_tari_sawat_1.png",
      }
    ]
  },
  "Acara Adat": {
    items: [
      {
        name: "Festival Pesona Meti Kei",
        location: "Perairan Kei Kecil",
        rating: 4.9,
        reviews: "980 ulasan",
        desc: "Festival tahunan terbesar saat air laut surut ekstrem (meti). Ribuan warga berkumpul menangkap ikan bersama secara tradisional dengan tali janur.",
        tags: ["Meti Kei", "Panen Raya", "Budaya Massal"],
        image: "/images/budaya/kei_language_symbol.png",
      },
      {
        name: "Ritual Hawear (Sasi Adat)",
        location: "Kepulauan Kei Besar",
        rating: 4.8,
        reviews: "410 ulasan",
        desc: "Upacara adat pemasangan janur kuning (Hawear) sebagai tanda pelarangan pengambilan hasil laut/hutan sementara demi menjaga kelestarian alam.",
        tags: ["Sasi Adat", "Hawear", "Konservasi"],
        image: "/images/budaya/kei_meti_reef.png",
      },
      {
        name: "Upacara Cuci Darah Adat",
        location: "Ohoi Manyeuw, Kei Kecil",
        rating: 4.7,
        reviews: "230 ulasan",
        desc: "Upacara sakral penyucian diri dan sumpah perdamaian antar marga yang melanggar hukum Larvul Ngabal demi memulihkan keharmonisan sosial.",
        tags: ["Ritual Sakral", "Penyucian", "Larvul Ngabal"],
        image: "/images/budaya/kei_tari_sawat_2.png",
      },
      {
        name: "Pesta Rakyat Makan Enbal",
        location: "Tual, Maluku Tenggara",
        rating: 4.6,
        reviews: "320 ulasan",
        desc: "Perayaan budaya menyantap hidangan enbal raksasa secara massal sebagai bentuk ucapan syukur atas panen hasil bumi yang melimpah.",
        tags: ["Pesta Rakyat", "Syukuran", "Enbal Raksasa"],
        image: "/images/budaya/kei_tari_sawat_3.png",
      }
    ]
  },
};

export default function DestinasiTerbaikSection() {
  const [activeDestTab, setActiveDestTab] = useState<DestTabName>("Wisata");
  const [activeDest, setActiveDest] = useState<number>(0);
  const [progress, setProgress] = useState(0);

  const sectionRef = useRef<HTMLElement>(null);
  const autoplayRef = useRef<number | null>(null);
  const blob1Ref = useRef<HTMLDivElement>(null);
  const blob2Ref = useRef<HTMLDivElement>(null);

  const handleSectionMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const dx = (x - centerX) * 0.15;
    const dy = (y - centerY) * 0.15;
    if (blob1Ref.current) {
      blob1Ref.current.style.transform = `translate3d(${dx}px, ${dy}px, 0)`;
    }
    if (blob2Ref.current) {
      blob2Ref.current.style.transform = `translate3d(${-dx * 0.8}px, ${-dy * 0.8}px, 0)`;
    }
  };

  const handleSectionMouseLeave = () => {
    if (blob1Ref.current) {
      blob1Ref.current.style.transform = "translate3d(0, 0, 0)";
    }
    if (blob2Ref.current) {
      blob2Ref.current.style.transform = "translate3d(0, 0, 0)";
    }
  };

  const data = destData[activeDestTab];
  const activeItem = data.items[activeDest];
  const totalItems = data.items.length;

  const changeTab = (tabName: DestTabName) => {
    setActiveDestTab(tabName);
    setActiveDest(0);
    setProgress(0);
    startAutoplay();
  };

  const goToDest = (idx: number) => {
    setActiveDest(idx);
    setProgress(0);
    startAutoplay();
  };

  // Autoplay with progress bar (5s). Timer dimulai ulang saat user berinteraksi.
  // eslint-disable-next-line react-hooks/preserve-manual-memoization
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
        setActiveDest((prev) => (prev + 1) % totalItems);
        elapsed = 0;
        setProgress(0);
      }
    }, step);
    autoplayRef.current = ticker;
  }, [totalItems]);

  useEffect(() => {
    startAutoplay();
    return () => {
      if (autoplayRef.current) window.clearInterval(autoplayRef.current);
    };
  }, [startAutoplay]);

  // Handle hash change to activate Kuliner tab
  useEffect(() => {
    const handleHashTab = () => {
      if (window.location.hash === "#kuliner") {
        changeTab("Kuliner");
      }
    };
    window.addEventListener("hashchange", handleHashTab);
    handleHashTab();
    return () => window.removeEventListener("hashchange", handleHashTab);
  }, []);

  // Keyboard navigation (Arrow Left/Right) saat section terlihat
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const el = sectionRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const inView = rect.top < window.innerHeight && rect.bottom > 0;
      if (!inView) return;
      if (e.key === "ArrowRightIcon") {
        goToDest((activeDest + 1) % totalItems);
      } else if (e.key === "ArrowLeft") {
        goToDest((activeDest - 1 + totalItems) % totalItems);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [activeDest, totalItems]);

  useEffect(() => {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const ctx = gsap.context(() => {
      if (prefersReduced) {
        gsap.set(".dest-fade", { opacity: 1, y: 0 });
        return;
      }
      gsap.from(".dest-fade", {
        y: 40,
        opacity: 0,
        duration: 0.8,
        stagger: 0.12,
        ease: "power2.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 95%",
          toggleActions: "play none none reverse",
        },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  const { onMouseMove, onMouseLeave } = useSpotlight();

  return (
    <section
      id="destinasi-terbaik"
      onMouseMove={handleSectionMouseMove}
      onMouseLeave={handleSectionMouseLeave}
      className="relative w-full min-h-screen bg-section pt-28 pb-16 md:pt-32 md:pb-20 z-[3] flex items-center justify-center snap-start snap-always overflow-hidden"
      ref={sectionRef}
      aria-labelledby="destinasi-heading"
    >
      {/* Blob 1 Container (Moving parent) — animated gradient background */}
      <div
        ref={blob1Ref}
        className="absolute -left-[200px] bottom-0 w-[600px] h-[600px] pointer-events-none z-0 transition-transform duration-700 ease-out will-change-transform"
      >
        <div className="w-full h-full bg-gradient-to-tr from-[var(--color-primary-pink)]/85 to-transparent blur-[100px] rounded-full animate-blob"></div>
      </div>

      {/* Blob 2 Container (Moving parent) — animated gradient background */}
      <div
        ref={blob2Ref}
        className="absolute -right-[200px] top-[10%] w-[500px] h-[500px] pointer-events-none z-0 transition-transform duration-700 ease-out will-change-transform"
      >
        <div className="w-full h-full bg-gradient-to-bl from-[var(--color-primary-pink)]/70 to-transparent blur-[100px] rounded-full animate-blob animation-delay-2000"></div>
      </div>

      <div id="kuliner" className="absolute top-0"></div>
      <div className="max-w-[98%] xl:max-w-[1600px] mx-auto px-4 md:px-8 w-full relative z-10">
        {/* Header Row */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-10 dest-fade">
          <div>
            <div
              className="text-brand font-bold tracking-[0.2em] uppercase text-xs md:text-sm mb-2"
              style={{ fontFamily: "var(--font-sans)" }}
            >
              DESTINASI TERBAIK
            </div>
            <h2
              id="destinasi-heading"
              className="text-fluid-h2 text-black font-normal"
              style={{ fontFamily: "var(--font-serif)" }}
            >
              Keindahan yang <br className="hidden md:block" />
              Menanti untuk{" "}
              <span className="text-brand">Dijelajahi</span>
            </h2>
          </div>

          {/* Tabs */}
          <div className="-mx-4 px-4 md:mx-0 md:px-0 overflow-x-auto no-scrollbar">
            <div className="flex flex-nowrap md:flex-wrap gap-2 md:gap-3 min-w-max md:min-w-0">
            {destTabs.map((tab) => (
              <button
                key={tab.name}
                onClick={() => changeTab(tab.name)}
                className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs md:text-sm font-medium shadow-sm transition-all duration-300 ${
                  activeDestTab === tab.name
                    ? "bg-nav-gradient text-black"
                    : "bg-white/60 text-black/70 hover:bg-brand/15 hover:text-brand"
                }`}
                style={{ fontFamily: "var(--font-sans)" }}
              >
                {tab.icon}
                {tab.name}
              </button>
            ))}
            </div>
          </div>
        </div>

        {/* Main Content: 3-column layout (Restored to previous template layout) */}
        <div className="flex flex-col xl:flex-row gap-6 xl:gap-8 items-stretch h-auto xl:h-[460px]">

          {/* LEFT: Large Main Image */}
          <div className="w-full xl:w-[38%] dest-fade h-[350px] md:h-[460px] xl:h-full">
            <div key={`main-${activeDestTab}-${activeDest}`} className="w-full h-full rounded-lg-design overflow-hidden shadow-card group relative animate-[fadeSlideUp_0.5s_ease-out]">
              <Image
                src={activeItem.image}
                alt={activeItem.name}
                fill
                sizes="(max-width: 768px) 100vw, 38vw"
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-black/10 to-transparent"></div>
            </div>
          </div>

          {/* CENTER: Detail Card */}
          <div key={`content-${activeDestTab}-${activeDest}`} className="w-full xl:w-[30%] flex flex-col justify-between dest-fade h-auto xl:h-full py-2">
            <div>
              <h3
                className="text-2xl md:text-[28px] lg:text-[32px] text-black font-normal leading-snug mb-2 animate-[fadeSlideUp_0.4s_ease-out]"
                style={{ fontFamily: "var(--font-serif)" }}
              >
                {activeItem.name}
              </h3>

              {/* Location */}
              <div className="flex items-center gap-1.5 text-black/50 text-sm md:text-base mb-3" style={{ fontFamily: "var(--font-sans)" }}>
                <MapPinIcon className="w-3.5 h-3.5" />
                {activeItem.location}
              </div>

              {/* Rating */}
              <div className="flex items-center gap-2 mb-4" style={{ fontFamily: "var(--font-sans)" }}>
                <span className="text-black font-bold text-sm md:text-base">{activeItem.rating}</span>
                <div className="flex gap-0.5">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <StarIcon
                      key={i}
                      className={`w-3.5 h-3.5 ${i < Math.floor(activeItem.rating) ? "text-yellow-500 fill-yellow-500" : "text-black/20"}`}
                    />
                  ))}
                </div>
                <span className="text-black/40 text-xs md:text-sm">({activeItem.reviews})</span>
              </div>

              {/* Description */}
              <p
                className="text-black/60 text-sm md:text-base leading-relaxed text-justify mb-5 line-clamp-4 xl:line-clamp-5"
                style={{ fontFamily: "var(--font-sans)" }}
              >
                {activeItem.desc}
              </p>

              {/* Tags */}
              <div className="flex flex-wrap gap-2 mb-4">
                {activeItem.tags.map((tag, idx) => (
                  <span
                    key={idx}
                    className="flex items-center gap-1.5 text-xs md:text-sm text-brand bg-brand/10 px-3 py-1.5 rounded-full font-medium"
                    style={{ fontFamily: "var(--font-sans)" }}
                  >
                    <MapPinIcon className="w-3 h-3" />
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* CTA Button */}
             <button 
                onMouseMove={onMouseMove}
                onMouseLeave={onMouseLeave}
                onClick={() => document.getElementById("journey")?.scrollIntoView({ behavior: "smooth" })}
                aria-label={`Lihat peta lokasi ${activeItem.name}`}
                className="btn-spotlight group/btn flex items-center gap-2 border border-black hover:border-brand text-black hover:text-brand px-6 py-3 rounded-xl font-semibold text-sm transition-all duration-300 hover:scale-[1.02] active:press focus-ring self-start cursor-pointer"
             >
               Lihat di Peta
               <ChevronRightIcon className="w-4 h-4 transition-transform group-hover/btn:translate-x-1" />
             </button>
          </div>

          {/* RIGHT: 2x2 Image Grid (Clickable Selectors) */}
          <div className="w-full xl:w-[32%] dest-fade h-[280px] md:h-[350px] xl:h-full">
            <div className="grid grid-cols-2 gap-3 h-full">
              {data.items.map((item, idx) => (
                <div
                  key={idx}
                  onClick={() => goToDest(idx)}
                  onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); goToDest(idx); } }}
                  role="button"
                  tabIndex={0}
                  aria-label={`Tampilkan ${item.name}`}
                  className={`rounded-lg-design overflow-hidden shadow-soft group cursor-pointer relative transition-all duration-300 border-2 ${
                    activeDest === idx
                      ? "border-brand scale-[1.03] shadow-card z-[5] opacity-100"
                      : "border-transparent opacity-60 hover:opacity-90 hover:scale-[1.01]"
                  }`}
                >
                  <Image
                    src={item.image}
                    alt={`${item.name} thumb`}
                    fill
                    sizes="(max-width: 768px) 50vw, 16vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  {/* Dark Vignette Overlay for readability */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/25 to-transparent z-[2]"></div>
                  
                  {/* Name & Location directly on the vignette (No background block) */}
                  <div className="absolute bottom-3 left-3 right-3 text-left z-[3] pointer-events-none">
                    <p className="text-white text-xs md:text-sm lg:text-base font-normal drop-shadow-md leading-tight" style={{ fontFamily: "var(--font-serif)" }}>
                      {item.name}
                    </p>
                    <p className="text-white/75 text-[9px] md:text-[10px] font-light mt-0.5 truncate" style={{ fontFamily: "var(--font-sans)" }}>
                      {item.location}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Page Dots + Autoplay Progress */}
        <div className="flex flex-col items-center gap-3 mt-10 dest-fade">
          <div className="flex justify-center gap-2">
            {Array.from({ length: totalItems }).map((_, idx) => (
              <button
                key={idx}
                onClick={() => goToDest(idx)}
                aria-label={`Pilih destinasi ${idx + 1}`}
                className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                  activeDest === idx ? "bg-brand w-6" : "bg-brand/30 hover:bg-brand/50"
                }`}
              />
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
