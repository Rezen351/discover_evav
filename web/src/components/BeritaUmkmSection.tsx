"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { CalendarIcon, MapPinIcon, ArrowUpRightIcon, StarIcon, ShoppingBagIcon, NewspaperIcon, BuildingStorefrontIcon } from "@heroicons/react/24/outline";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import QuoteMarquee from "@/components/QuoteMarquee";
import { useSpotlight } from "@/hooks/useSpotlight";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

type NewsItem = {
  id: string;
  category: "Budaya" | "Event" | "Infrastruktur" | "Pengumuman";
  title: string;
  excerpt: string;
  date: string;
  image: string;
  featured?: boolean;
};

type UmkmItem = {
  id: string;
  name: string;
  category: "Kuliner" | "Kerajinan" | "Oleh-oleh";
  location: string;
  rating: number;
  image: string;
  whatsapp: string;
};

const news: NewsItem[] = [
  {
    id: "n1",
    category: "Event",
    title: "Festival Pesona Meti Kei 2026 Siap Digelar",
    excerpt: "Ribuan warga dan wisatawan akan berkumpul memanen ikan bersama saat surut ekstrem di perairan Kei Kecil.",
    date: "12 Juli 2026",
    image: "/images/budaya/kei_coast_sunset.png",
    featured: true,
  },
  {
    id: "n2",
    category: "Budaya",
    title: "Pelestarian Rumah Adat Tanimbar Kei",
    excerpt: "Upaya warga menjaga arsitektur kayu purba sebagai warisan tak benda Indonesia Timur.",
    date: "28 Juni 2026",
    image: "/images/budaya/kei_umkm_face_1.png",
  },
  {
    id: "n3",
    category: "Infrastruktur",
    title: "Akses Pelabuhan Tual Makin Lancar",
    excerpt: "Penambahan jadwal kapol dan perbaikan dermaga memudahkan wisatawan menjangkau Kepulauan Kei.",
    date: "15 Juni 2026",
    image: "/images/meti/kei_community_1.png",
  },
  {
    id: "n4",
    category: "Pengumuman",
    title: "Pembukaan Rute Wisata Bahari Baru",
    excerpt: "Pemerintah daerah meresmikan paket eksplorasi laut menuju laguna tersembunyi Pulau Bair.",
    date: "5 Juni 2026",
    image: "/images/meti/kei_community_2.png",
  },
];

const umkms: UmkmItem[] = [
  {
    id: "u1",
    name: "Rumah Enbal Mbak Yuli",
    category: "Kuliner",
    location: "Langgur, Kei Kecil",
    rating: 4.7,
    image: "/images/umkm/kei_umkm_enbal_kacang_1.jpeg",
    whatsapp: "6281234567890",
  },
  {
    id: "u2",
    name: "Tenun Kei Suster Maria",
    category: "Kerajinan",
    location: "Tual, Maluku Tenggara",
    rating: 4.9,
    image: "/images/meti/kei_mosaic_3.png",
    whatsapp: "6281234567891",
  },
  {
    id: "u3",
    name: "Oleh-oleh Khas Bumi Evav",
    category: "Oleh-oleh",
    location: "Ohoililir, Kei Kecil",
    rating: 4.6,
    image: "/images/umkm/kei_umkm_kacang_botol_1.jpeg",
    whatsapp: "6281234567892",
  },
  {
    id: "u4",
    name: "Enbal Bunga Mbak Rina",
    category: "Kuliner",
    location: "Langgur, Kei Kecil",
    rating: 4.8,
    image: "/images/umkm/kei_umkm_enbal_bunga_1.jpeg",
    whatsapp: "6281234567893",
  },
  {
    id: "u5",
    name: "Enbal Bunga Khas Kei",
    category: "Kuliner",
    location: "Tual, Maluku Tenggara",
    rating: 4.5,
    image: "/images/umkm/kei_umkm_enbal_bunga_2.jpeg",
    whatsapp: "6281234567894",
  },
  {
    id: "u6",
    name: "Crispy Rumput Laut Evav",
    category: "Kuliner",
    location: "Ohoililir, Kei Kecil",
    rating: 4.6,
    image: "/images/umkm/kei_umkm_enbal_crispy_rumput_laut.jpeg",
    whatsapp: "6281234567895",
  },
  {
    id: "u7",
    name: "Enbal Kacang Bundo",
    category: "Kuliner",
    location: "Langgur, Kei Kecil",
    rating: 4.7,
    image: "/images/umkm/kei_umkm_enbal_kacang_2.jpeg",
    whatsapp: "6281234567896",
  },
  {
    id: "u8",
    name: "Stick Enbal Rumah Kita",
    category: "Kuliner",
    location: "Tual, Maluku Tenggara",
    rating: 4.8,
    image: "/images/umkm/kei_umkm_enbal_stick_1.jpeg",
    whatsapp: "6281234567897",
  },
  {
    id: "u9",
    name: "Stick Enbal Mama Tonce",
    category: "Kuliner",
    location: "Ohoililir, Kei Kecil",
    rating: 4.6,
    image: "/images/umkm/kei_umkm_enbal_stick_2.jpeg",
    whatsapp: "6281234567898",
  },
  {
    id: "u10",
    name: "Stick Enbal Kei Prime",
    category: "Kuliner",
    location: "Langgur, Kei Kecil",
    rating: 4.5,
    image: "/images/umkm/kei_umkm_enbal_stick_3.jpeg",
    whatsapp: "6281234567899",
  },
  {
    id: "u11",
    name: "Kacang Botol Makmur",
    category: "Oleh-oleh",
    location: "Tual, Maluku Tenggara",
    rating: 4.7,
    image: "/images/umkm/kei_umkm_kacang_botol_2.jpeg",
    whatsapp: "6281234567900",
  },
  {
    id: "u12",
    name: "Kerupuk Enbal Super",
    category: "Kuliner",
    location: "Ohoililir, Kei Kecil",
    rating: 4.6,
    image: "/images/umkm/kei_umkm_kerupuk_enbal_super.jpeg",
    whatsapp: "6281234567901",
  },
  {
    id: "u13",
    name: "Kue Kering Mocaf Makmur",
    category: "Oleh-oleh",
    location: "Langgur, Kei Kecil",
    rating: 4.8,
    image: "/images/umkm/kei_umkm_kue_kering_mocaf_makmur_1.jpeg",
    whatsapp: "6281234567902",
  },
  {
    id: "u14",
    name: "Kue Kering Mocaf Makmur 2",
    category: "Oleh-oleh",
    location: "Tual, Maluku Tenggara",
    rating: 4.7,
    image: "/images/umkm/kei_umkm_kue_kering_mocaf_makmur_2.jpeg",
    whatsapp: "6281234567903",
  },
  {
    id: "u15",
    name: "Kue Kering Mocaf Saleha",
    category: "Oleh-oleh",
    location: "Ohoililir, Kei Kecil",
    rating: 4.9,
    image: "/images/umkm/kei_umkm_kue_kering_mocaf_saleha.jpeg",
    whatsapp: "6281234567904",
  },
  {
    id: "u16",
    name: "Piece Enbal & Tepung Mocaf",
    category: "Kuliner",
    location: "Langgur, Kei Kecil",
    rating: 4.6,
    image: "/images/umkm/kei_umkm_piece_enbal.jpeg",
    whatsapp: "6281234567905",
  },
  {
    id: "u17",
    name: "Tepung Mocaf Bumi Evav",
    category: "Oleh-oleh",
    location: "Tual, Maluku Tenggara",
    rating: 4.7,
    image: "/images/umkm/kei_umkm_tepung_mocaf.jpeg",
    whatsapp: "6281234567906",
  },
];

const categoryStyle: Record<NewsItem["category"], string> = {
  Budaya: "bg-brand/10 text-brand",
  Event: "bg-[var(--color-primary-teal)]/15 text-[var(--color-primary-navy)]",
  Infrastruktur: "bg-[var(--color-primary-orange)]/15 text-[var(--color-primary-orange)]",
  Pengumuman: "bg-[var(--color-primary-green)]/15 text-[var(--color-primary-green)]",
};

const categoryBadgeWhite: Record<NewsItem["category"], string> = {
  Budaya: "bg-white text-black",
  Event: "bg-white text-black",
  Infrastruktur: "bg-white text-black",
  Pengumuman: "bg-white text-black",
};

export default function BeritaUmkmSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [activeTab, setActiveTab] = useState<"Berita" | "UMKM">("Berita");

  const { onMouseMove, onMouseLeave } = useSpotlight();

  useEffect(() => {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const ctx = gsap.context(() => {
      if (prefersReduced) {
        gsap.set(".berita-fade", { opacity: 1, y: 0 });
        return;
      }
      gsap.from(".berita-fade", {
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

  const featured = news.find((n) => n.featured) ?? news[0];
  const regularNews = news.filter((n) => n.id !== featured.id);

  return (
    <section
      id="berita-umkm"
      className="relative w-full min-h-screen bg-section pt-28 pb-16 md:pt-32 md:pb-20 z-[2] flex items-center justify-center snap-start snap-always overflow-hidden"
      ref={sectionRef}
      aria-labelledby="berita-umkm-heading"
    >
      <div className="max-w-[98%] xl:max-w-[1600px] mx-auto px-4 md:px-8 w-full flex flex-col gap-10">
        {/* HEADER ROW */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 berita-fade">
          <div>
            <div
              className="text-brand font-bold tracking-[0.2em] uppercase text-xs md:text-sm mb-2"
              style={{ fontFamily: "var(--font-sans)" }}
            >
              CERITA & EKONOMI LOKAL
            </div>
            <h2
              id="berita-umkm-heading"
              className="text-4xl md:text-5xl leading-[1.15] text-black font-normal"
              style={{ fontFamily: "var(--font-serif)" }}
            >
              Berita Terkini &<br className="hidden md:block" />{" "}
              <span className="text-brand">UMKM Unggulan</span>
            </h2>
          </div>

          {/* Tabs */}
          <div className="flex gap-2 md:gap-3">
            {(["Berita", "UMKM"] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                aria-pressed={activeTab === tab}
                className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs md:text-sm font-medium shadow-sm transition-all duration-300 cursor-pointer ${
                  activeTab === tab
                    ? "bg-nav-gradient text-black"
                    : "bg-white/60 text-black/70 hover:bg-brand/15 hover:text-brand"
                }`}
                style={{ fontFamily: "var(--font-sans)" }}
              >
                {tab === "Berita" ? <NewspaperIcon className="w-4 h-4" /> : <BuildingStorefrontIcon className="w-4 h-4" />}
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* Marquee quote lokal (loop lambat, dekoratif) */}
        <QuoteMarquee />

        {activeTab === "Berita" ? (
          <div className="flex flex-col xl:flex-row gap-6 xl:gap-8 items-stretch berita-fade">
            {/* FEATURED NEWS (2/3) */}
            <a
              href="#berita-umkm"
              className="group relative w-full xl:w-[60%] h-[320px] md:h-[420px] rounded-lg-design overflow-hidden shadow-sm cursor-pointer"
            >
              <Image
                src={featured.image}
                alt={featured.title}
                fill
                sizes="(max-width: 768px) 100vw, 60vw"
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent"></div>
              <div className="absolute top-5 left-5">
                <span className={`text-xs font-bold px-3 py-1.5 rounded-full uppercase tracking-wide ${categoryBadgeWhite[featured.category]}`} style={{ fontFamily: "var(--font-sans)" }}>
                  {featured.category}
                </span>
              </div>
              <div className="absolute bottom-6 left-6 right-6">
                <div className="flex items-center gap-1.5 text-white/70 text-xs mb-2" style={{ fontFamily: "var(--font-sans)" }}>
                  <CalendarIcon className="w-3.5 h-3.5" />
                  {featured.date}
                </div>
                <h3 className="text-2xl md:text-3xl text-white font-normal leading-snug drop-shadow-md" style={{ fontFamily: "var(--font-serif)" }}>
                  {featured.title}
                </h3>
                <p className="text-white/85 text-sm mt-2 line-clamp-2 hidden md:block" style={{ fontFamily: "var(--font-sans)" }}>
                  {featured.excerpt}
                </p>
              </div>
            </a>

            {/* REGULAR NEWS LIST (1/3) */}
            <div className="w-full xl:w-[40%] flex flex-col gap-4">
              {regularNews.map((item) => (
                <a
                  key={item.id}
                  href="#berita-umkm"
                  className="group flex flex-1 gap-4 items-center bg-white/55 hover:bg-white/80 border border-brand/10 hover:border-brand/30 rounded-2xl p-3 transition-all duration-300 min-h-[96px]"
                >
                  <div className="relative w-24 h-full min-h-[80px] md:w-28 rounded-lg overflow-hidden flex-shrink-0">
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      sizes="112px"
                      className="object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                  </div>
                  <div className="flex flex-col min-w-0">
                    <div className="flex items-center gap-1.5 text-black/50 text-[10px] md:text-xs mb-1" style={{ fontFamily: "var(--font-sans)" }}>
                      <CalendarIcon className="w-3 h-3" />
                      {item.date}
                      <span className={`ml-1 px-2 py-0.5 rounded-full text-[9px] font-bold uppercase ${categoryBadgeWhite[item.category]}`}>{item.category}</span>
                    </div>
                    <h4 className="text-sm md:text-base text-black font-normal leading-snug line-clamp-2 group-hover:text-brand transition-colors" style={{ fontFamily: "var(--font-serif)" }}>
                      {item.title}
                    </h4>
                  </div>
                  <ArrowUpRightIcon className="w-5 h-5 text-black/30 group-hover:text-brand transition-colors flex-shrink-0 ml-auto" />
                </a>
              ))}
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 berita-fade">
            {umkms.map((u) => (
              <div
                key={u.id}
                className="group bg-white/55 hover:bg-white/80 border border-brand/10 hover:border-brand/30 rounded-lg-design overflow-hidden shadow-sm transition-all duration-300 flex flex-col"
              >
                <div className="relative h-48 overflow-hidden">
                  <Image
                    src={u.image}
                    alt={u.name}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="bg-nav-gradient text-black text-[10px] font-bold px-3 py-1.5 rounded-full uppercase tracking-wide" style={{ fontFamily: "var(--font-sans)" }}>
                      {u.category}
                    </span>
                  </div>
                </div>
                <div className="p-5 flex flex-col gap-3 flex-1">
                  <div className="flex items-center justify-between gap-2">
                    <h4 className="text-lg md:text-xl text-black font-normal leading-snug" style={{ fontFamily: "var(--font-serif)" }}>
                      {u.name}
                    </h4>
                    <div className="flex items-center gap-1 text-xs text-black/60 flex-shrink-0" style={{ fontFamily: "var(--font-sans)" }}>
                      <StarIcon className="w-3.5 h-3.5 text-yellow-500 fill-yellow-500" />
                      {u.rating}
                    </div>
                  </div>
                  <div className="flex items-center gap-1.5 text-black/50 text-xs" style={{ fontFamily: "var(--font-sans)" }}>
                    <MapPinIcon className="w-3.5 h-3.5" />
                    {u.location}
                  </div>
                  <a
                    href={`https://wa.me/${u.whatsapp}`}
                    target="_blank"
                    rel="noreferrer"
                    onMouseMove={onMouseMove}
                    onMouseLeave={onMouseLeave}
                    className="btn-spotlight mt-auto flex items-center justify-center gap-2 border border-black hover:border-brand text-black hover:text-brand px-5 py-2.5 rounded-xl font-semibold text-sm transition-all duration-300 hover:scale-[1.02] active:press cursor-pointer focus-ring"
                    style={{ fontFamily: "var(--font-sans)" }}
                  >
                    <ShoppingBagIcon className="w-4 h-4" />
                    Pesan via WhatsApp
                  </a>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
