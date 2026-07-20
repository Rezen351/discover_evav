"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { CalendarIcon, MapPinIcon, ArrowUpRightIcon, ChevronLeftIcon, ChevronRightIcon, StarIcon, ShoppingBagIcon, NewspaperIcon, BuildingStorefrontIcon } from "@heroicons/react/24/outline";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, A11y } from "swiper/modules";
import "swiper/css";
import QuoteMarquee from "@/components/QuoteMarquee";
import { useSpotlight } from "@/hooks/useSpotlight";
import { news as newsArticles } from "@/content/news";
import { umkms as umkmList } from "@/content/umkm";

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
  slug: string;
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

const news: NewsItem[] = newsArticles.map((a) => ({
  id: a.id,
  category: a.category,
  title: a.title,
  excerpt: a.excerpt,
  date: a.date,
  image: a.image,
  slug: a.slug,
  featured: a.featured,
}));

const umkms: UmkmItem[] = umkmList.map((u) => ({
  id: u.id,
  name: u.name,
  category: u.category,
  location: u.location,
  rating: u.rating,
  image: u.image,
  whatsapp: u.whatsapp,
}));

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
  const [umkmPage, setUmkmPage] = useState(0);
  const UMKM_PER_PAGE = 6;
  const [reducedMotion] = useState(
    () => typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );

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
          once: true,
        },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  const featured = news.find((n) => n.featured) ?? news[0];
  const regularNews = news.filter((n) => n.id !== featured.id);

  const umkmPageCount = Math.ceil(umkms.length / UMKM_PER_PAGE);
  const umkmStart = umkmPage * UMKM_PER_PAGE;
  const umkmPageItems = umkms.slice(umkmStart, umkmStart + UMKM_PER_PAGE);

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
                onClick={() => {
                  setActiveTab(tab);
                  if (tab === "UMKM") setUmkmPage(0);
                }}
                aria-pressed={activeTab === tab}
                className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs md:text-sm font-medium shadow-sm transition-all duration-300 cursor-pointer whitespace-nowrap shrink-0 ${activeTab === tab
                    ? "bg-nav-gradient text-brand border border-brand/100"
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

        {/* Marquee quote lokal (loop lambat, dekoratif) — Desktop only */}
        <div className="hidden md:block">
          <QuoteMarquee />
        </div>

        {activeTab === "Berita" ? (
          <div className="flex flex-col gap-6 md:gap-8 berita-fade">
            <div className="flex flex-col xl:flex-row gap-6 xl:gap-8 items-stretch">
              {/* FEATURED NEWS (2/3) */}
              <a
                href={`/news/${featured.slug}`}
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
                    href={`/news/${item.slug}`}
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

            {/* CTA Berita */}
            <div className="flex justify-center md:justify-start">
              <a
                href="/news"
                onMouseMove={onMouseMove}
                onMouseLeave={onMouseLeave}
                aria-label="Lihat semua berita"
                className="btn-spotlight btn-cta w-full md:w-auto inline-flex items-center justify-center gap-2 font-sans text-sm md:text-base font-medium focus-ring rounded-full px-6 py-3"
              >
                Lihat Semua Berita
                <ArrowUpRightIcon className="w-4 h-4 text-current" />
              </a>
            </div>
          </div>
        ) : (
          <div className="flex flex-col gap-8 berita-fade" key={activeTab}>
            {/* Desktop Layout (Grid) — Visible on xl screens */}
            <div className="hidden xl:grid grid-cols-3 gap-6">
              {umkmPageItems.map((u) => (
                <div
                  key={u.id}
                  className="group bg-white/55 hover:bg-white/80 border border-brand/10 hover:border-brand/30 rounded-lg-design overflow-hidden shadow-none transition-all duration-300 flex flex-col"
                >
                  <div className="relative h-48 overflow-hidden">
                    <Image
                      src={u.image}
                      alt={u.name}
                      fill
                      sizes="33vw"
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute top-4 left-4">
                      <span className="bg-nav-gradient text-black text-[10px] font-bold px-3 py-1.5 rounded-full uppercase tracking-wide" style={{ fontFamily: "var(--font-sans)" }}>
                        {u.category}
                      </span>
                    </div>
                  </div>
                  <div className="p-5 flex flex-col gap-3 flex-1 justify-between">
                    <div>
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
                    </div>
                    <a
                      href={`https://wa.me/${u.whatsapp}`}
                      target="_blank"
                      rel="noreferrer"
                      onMouseMove={onMouseMove}
                      onMouseLeave={onMouseLeave}
                      className="btn-spotlight mt-4 flex items-center justify-center gap-2 border border-black hover:border-brand text-black hover:text-brand px-5 py-2.5 rounded-xl font-semibold text-sm transition-all duration-300 hover:scale-[1.02] active:press cursor-pointer focus-ring"
                      style={{ fontFamily: "var(--font-sans)" }}
                    >
                      <ShoppingBagIcon className="w-4 h-4" />
                      Pesan via WhatsApp
                    </a>
                  </div>
                </div>
              ))}
            </div>

            {/* Pagination (Desktop) */}
            {umkmPageCount > 1 && (
              <div className="hidden xl:flex items-center justify-center gap-3 berita-fade" aria-label="Navigasi halaman UMKM">
                <button
                  type="button"
                  onClick={() => setUmkmPage((p) => Math.max(0, p - 1))}
                  disabled={umkmPage === 0}
                  aria-label="Halaman UMKM sebelumnya"
                  className="btn-spotlight flex items-center justify-center w-10 h-10 rounded-full border border-black hover:border-brand text-black hover:text-brand disabled:opacity-30 disabled:cursor-not-allowed transition-all duration-300 active:press focus-ring cursor-pointer"
                >
                  <ChevronLeftIcon className="w-4 h-4" />
                </button>
                <div className="flex items-center gap-2">
                  {Array.from({ length: umkmPageCount }).map((_, i) => (
                    <button
                      key={i}
                      type="button"
                      onClick={() => setUmkmPage(i)}
                      aria-label={`Ke halaman UMKM ${i + 1}`}
                      aria-current={umkmPage === i}
                      className={`w-2.5 h-2.5 rounded-full transition-all duration-300 cursor-pointer focus-ring ${
                        umkmPage === i ? "bg-brand scale-110" : "bg-black/20 hover:bg-black/40"
                      }`}
                    />
                  ))}
                </div>
                <button
                  type="button"
                  onClick={() => setUmkmPage((p) => Math.min(umkmPageCount - 1, p + 1))}
                  disabled={umkmPage === umkmPageCount - 1}
                  aria-label="Halaman UMKM berikutnya"
                  className="btn-spotlight flex items-center justify-center w-10 h-10 rounded-full border border-black hover:border-brand text-black hover:text-brand disabled:opacity-30 disabled:cursor-not-allowed transition-all duration-300 active:press focus-ring cursor-pointer"
                >
                  <ChevronRightIcon className="w-4 h-4" />
                </button>
              </div>
            )}

            {/* Mobile Layout (Swiper) — Visible on screens < xl */}
            <div className="xl:hidden w-full">
              <Swiper
                modules={[Autoplay, A11y]}
                spaceBetween={20}
                slidesPerView={1.2}
                grabCursor
                loop
                autoplay={reducedMotion ? false : { delay: 5000, disableOnInteraction: false }}
                pagination={false}
                className="umkm-swiper"
              >
                {umkms.map((u) => (
                  <SwiperSlide key={u.id} className="!h-auto">
                    <div className="group bg-white/55 hover:bg-white/80 border border-brand/10 hover:border-brand/30 rounded-lg-design overflow-hidden shadow-none transition-all duration-300 flex flex-col h-full">
                      <div className="relative h-48 overflow-hidden">
                        <Image
                          src={u.image}
                          alt={u.name}
                          fill
                          sizes="(max-width: 768px) 80vw, 30vw"
                          className="object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                        <div className="absolute top-4 left-4">
                          <span className="bg-nav-gradient text-black text-[10px] font-bold px-3 py-1.5 rounded-full uppercase tracking-wide" style={{ fontFamily: "var(--font-sans)" }}>
                            {u.category}
                          </span>
                        </div>
                      </div>
                      <div className="p-5 flex flex-col gap-3 flex-1 justify-between">
                        <div>
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
                        </div>
                        <a
                          href={`https://wa.me/${u.whatsapp}`}
                          target="_blank"
                          rel="noreferrer"
                          onMouseMove={onMouseMove}
                          onMouseLeave={onMouseLeave}
                          className="btn-spotlight mt-4 flex items-center justify-center gap-2 border border-black hover:border-brand text-black hover:text-brand px-5 py-2.5 rounded-xl font-semibold text-sm transition-all duration-300 hover:scale-[1.02] active:press cursor-pointer focus-ring"
                          style={{ fontFamily: "var(--font-sans)" }}
                        >
                          <ShoppingBagIcon className="w-4 h-4" />
                          Pesan via WhatsApp
                        </a>
                      </div>
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>

            {/* CTA UMKM */}
            <div className="flex justify-center md:justify-end berita-fade">
              <a
                href="/taste"
                onMouseMove={onMouseMove}
                onMouseLeave={onMouseLeave}
                aria-label="Jelajahi UMKM Kepulauan Kei"
                className="btn-spotlight btn-cta w-full md:w-auto inline-flex items-center justify-center gap-2 font-sans text-sm md:text-base font-medium focus-ring rounded-full px-6 py-3"
              >
                Jelajahi UMKM
                <ArrowUpRightIcon className="w-4 h-4 text-current" />
              </a>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
