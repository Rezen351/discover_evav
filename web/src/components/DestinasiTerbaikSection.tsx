"use client";

import { useState, useEffect, useRef, useCallback, type ReactElement } from "react";
import Image from "next/image";
import { MapPinIcon, StarIcon, ShoppingBagIcon, HomeModernIcon, TicketIcon, FireIcon, ChevronRightIcon } from "@heroicons/react/24/outline";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useSpotlight } from "@/hooks/useSpotlight";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, A11y } from "swiper/modules";
import "swiper/css";
import { getDictionary } from "@/content/dictionaries";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

type Dict = Awaited<ReturnType<typeof getDictionary>>;

type DestTabName = "Wisata" | "Kuliner" | "Penginapan" | "Pertunjukan" | "Acara Adat";

const destIcons: Record<string, ReactElement> = {
  MapPinIcon: <MapPinIcon className="w-4 h-4" />,
  ShoppingBagIcon: <ShoppingBagIcon className="w-4 h-4" />,
  HomeModernIcon: <HomeModernIcon className="w-4 h-4" />,
  TicketIcon: <TicketIcon className="w-4 h-4" />,
  FireIcon: <FireIcon className="w-4 h-4" />,
};

export default function DestinasiTerbaikSection({ data }: { data: Dict["home"]["destinasi"] }) {
  const destTabs = data.tabs.map((t) => ({ id: t.id as DestTabName, name: t.name, icon: destIcons[t.icon] }));
  const destData = data.data;
  const [activeDestTab, setActiveDestTab] = useState<DestTabName>("Wisata");
  const [activeDest, setActiveDest] = useState<number>(0);
  const [progress, setProgress] = useState(0);

  const sectionRef = useRef<HTMLElement>(null);
  const autoplayRef = useRef<number | null>(null);

  const activeData = destData[activeDestTab];
  const activeItem = activeData.items[activeDest];
  const totalItems = activeData.items.length;

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
      if (e.key === "ArrowRight") {
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
      className="relative w-full min-h-screen bg-section pt-20 pb-12 md:pt-32 md:pb-20 z-[3] flex items-center justify-center snap-start snap-always overflow-hidden"
      ref={sectionRef}
      aria-labelledby="destinasi-heading"
    >
      <div id="kuliner" className="absolute top-0"></div>
      <div className="max-w-[98%] xl:max-w-[1600px] mx-auto px-4 md:px-8 w-full relative z-10">
        {/* Header Row */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 md:gap-6 mb-4 md:mb-10 dest-fade">
          <div>
            <div
              className="text-brand font-bold tracking-[0.2em] uppercase text-xs md:text-sm mb-2"
              style={{ fontFamily: "var(--font-sans)" }}
            >
              {data.eyebrow}
            </div>
            <h2
              id="destinasi-heading"
              className="text-fluid-h2 text-black font-normal"
              style={{ fontFamily: "var(--font-serif)" }}
            >
              {data.titleLead}
              <br className="hidden md:block" />
              {" "}
              <span className="text-brand">{data.titleAccent}</span>
            </h2>
          </div>

          {/* Tabs (desktop: kanan; mobile: di bawah, rata kiri) */}
          <div className="w-full md:w-auto overflow-x-auto no-scrollbar pb-1">
            <div className="flex flex-nowrap md:flex-wrap gap-2 md:gap-3 md:justify-end justify-start pb-1">
              {destTabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => changeTab(tab.id)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs md:text-sm font-medium shadow-sm transition-all duration-300 whitespace-nowrap shrink-0 ${activeDestTab === tab.id
                    ? "bg-nav-gradient text-brand border border-brand/100"
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

        {/* Main Content: 3-column layout (Desktop only) */}
        <div className="hidden xl:flex flex-row gap-6 xl:gap-8 items-stretch h-auto xl:h-[460px]">

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
              {data.ctaText}
              <ChevronRightIcon className="w-4 h-4 transition-transform group-hover/btn:translate-x-1" />
            </button>
          </div>

          {/* RIGHT: 2x2 Image Grid (Clickable Selectors) */}
          <div className="w-full xl:w-[32%] dest-fade h-[280px] md:h-[350px] xl:h-full">
            <div className="grid grid-cols-2 gap-3 h-full">
              {activeData.items.map((item, idx) => (
                <div
                  key={idx}
                  onClick={() => goToDest(idx)}
                  onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); goToDest(idx); } }}
                  role="button"
                  tabIndex={0}
                  aria-label={`Tampilkan ${item.name}`}
                  className={`rounded-lg-design overflow-hidden shadow-soft group cursor-pointer relative transition-all duration-300 border-2 ${activeDest === idx
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

        {/* Mobile Layout (Swiper Slider) — Visible on screen sizes < xl */}
        <div className="xl:hidden w-full dest-fade">
          <Swiper
            modules={[Autoplay, A11y]}
            pagination={false}
            autoplay={{ delay: 5000, disableOnInteraction: false }}
            spaceBetween={20}
            slidesPerView={1}
            className="destinasi-swiper"
            key={activeDestTab} // Re-render Swiper when activeDestTab changes to reset slides and loop state
            onSlideChange={(swiper) => setActiveDest(swiper.activeIndex)}
          >
            {activeData.items.map((item, idx) => (
              <SwiperSlide key={idx} className="flex flex-col gap-4 sm:gap-6">
                {/* Image Frame */}
                <div className="w-full h-[240px] sm:h-[280px] md:h-[350px] rounded-lg-design overflow-hidden shadow-card relative">
                  <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    sizes="(max-width: 768px) 100vw, 80vw"
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-black/10 to-transparent"></div>
                </div>

                {/* Detail Card */}
                <div className="w-full flex flex-col justify-between h-auto py-2">
                  <div>
                    <h3
                      className="text-2xl md:text-[28px] text-black font-normal leading-snug mb-2"
                      style={{ fontFamily: "var(--font-serif)" }}
                    >
                      {item.name}
                    </h3>

                    {/* Location */}
                    <div className="flex items-center gap-1.5 text-black/50 text-sm md:text-base mb-3" style={{ fontFamily: "var(--font-sans)" }}>
                      <MapPinIcon className="w-3.5 h-3.5" />
                      {item.location}
                    </div>

                    {/* Rating */}
                    <div className="flex items-center gap-2 mb-4" style={{ fontFamily: "var(--font-sans)" }}>
                      <span className="text-black font-bold text-sm md:text-base">{item.rating}</span>
                      <div className="flex gap-0.5">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <StarIcon
                            key={i}
                            className={`w-3.5 h-3.5 ${i < Math.floor(item.rating) ? "text-yellow-500 fill-yellow-500" : "text-black/20"}`}
                          />
                        ))}
                      </div>
                      <span className="text-black/40 text-xs md:text-sm">({item.reviews})</span>
                    </div>

                    {/* Description */}
                    <p
                      className="text-black/60 text-sm md:text-base leading-relaxed text-justify mb-5 line-clamp-4"
                      style={{ fontFamily: "var(--font-sans)" }}
                    >
                      {item.desc}
                    </p>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      {item.tags.map((tag, tagIdx) => (
                        <span
                          key={tagIdx}
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
                    aria-label={`Lihat peta lokasi ${item.name}`}
                    className="btn-spotlight group/btn flex items-center gap-2 border border-black hover:border-brand text-black hover:text-brand px-6 py-3 rounded-xl font-semibold text-sm transition-all duration-300 hover:scale-[1.02] active:press focus-ring self-start cursor-pointer"
                  >
              {data.ctaText}
                    <ChevronRightIcon className="w-4 h-4 transition-transform group-hover/btn:translate-x-1" />
                  </button>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        {/* Page Dots + Autoplay Progress — Desktop only */}
        <div className="hidden xl:flex flex-col items-center gap-3 mt-10 dest-fade">
          <div className="flex justify-center gap-2">
            {Array.from({ length: totalItems }).map((_, idx) => (
              <button
                key={idx}
                onClick={() => goToDest(idx)}
                aria-label={`Pilih destinasi ${idx + 1}`}
                className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${activeDest === idx ? "bg-brand w-6" : "bg-brand/30 hover:bg-brand/50"
                  }`}
              />
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
