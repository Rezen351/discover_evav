"use client";

import { useState, useEffect, useRef, useCallback, type ReactElement } from "react";
import Image from "next/image";
import { GlobeAltIcon, BookOpenIcon, SparklesIcon, ShoppingBagIcon, ShieldCheckIcon, CheckCircleIcon, ChevronRightIcon } from "@heroicons/react/24/outline";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import StatsCounter from "@/components/StatsCounter";
import { useSpotlight } from "@/hooks/useSpotlight";
import { getDictionary } from "@/content/dictionaries";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

type Dict = Awaited<ReturnType<typeof getDictionary>>;

type TabName = "Alam" | "Budaya" | "Satwa" | "Kuliner" | "Teknologi";

const tabIcons: Record<string, ReactElement> = {
  GlobeAltIcon: <GlobeAltIcon className="w-5 h-5" />,
  BookOpenIcon: <BookOpenIcon className="w-5 h-5" />,
  SparklesIcon: <SparklesIcon className="w-5 h-5" />,
  ShoppingBagIcon: <ShoppingBagIcon className="w-5 h-5" />,
  ShieldCheckIcon: <ShieldCheckIcon className="w-5 h-5" />,
};

export default function FunFactSection({ data }: { data: Dict["home"]["funfact"] }) {
  const tabs = data.tabs.map((t) => ({ id: t.id as TabName, name: t.name, icon: tabIcons[t.icon] }));
  const tabData = data.tabData as unknown as Record<TabName, { items: typeof data.tabData.Alam.items; ctaText: string }>;
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
            <Image
              src="/maatahari.svg"
              alt=""
              width={162}
              height={160}
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
          <Image
            src="/kapal.svg"
            alt="Dekorasi kapal layar Kei"
            width={371}
            height={173}
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
              {data.eyebrow}
            </div>
            <h2 className="text-fluid-h2 text-white font-normal" style={{ fontFamily: "var(--font-serif)" }}>
              {data.titleLead} <br className="hidden md:block" /> {data.titleAccent}
            </h2>
          </div>

          {/* Right: Navigation Tabs — pill style, wrappable di mobile */}
          <div className="w-full xl:w-[65%]">
            <div className="flex items-center flex-wrap justify-start xl:justify-end gap-2 xl:gap-3">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => changeTab(tab.id)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full border text-sm transition-all duration-200 focus-ring whitespace-nowrap ${activeTab === tab.id
                    ? "bg-brand/20 border-brand text-brand"
                    : "bg-white/5 border-white/20 text-white/60 hover:border-brand/50 hover:text-white"
                    }`}
                  style={{ fontFamily: "var(--font-sans)" }}
                >
                  <span className={`flex-none ${activeTab === tab.id ? "text-brand" : "text-white/50"}`}>
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
          &ldquo;{data.culturalQuote}&rdquo;
        </p>

        {/* Insight: wisata berbasis masyarakat (community-based tourism) */}
        <div className="mt-6 md:mt-8 fade-up-item">
          <div className="bg-white/5 border border-white/10 rounded-lg-design p-5 md:p-6 backdrop-blur-sm">
            <div className="flex items-start gap-3">
              <span className="flex-none mt-0.5 text-brand">
                <CheckCircleIcon className="w-5 h-5" />
              </span>
              <div>
                <h4 className="text-white font-normal text-base md:text-lg mb-1" style={{ fontFamily: "var(--font-serif)" }}>
                  {data.insightTitle}
                </h4>
                <p className="text-white/80 text-xs md:text-sm font-light leading-relaxed text-justify" style={{ fontFamily: "var(--font-sans)" }}>
                  {data.insightDesc}
                </p>
              </div>
            </div>
          </div>
        </div>

        <StatsCounter />
      </div>
    </section>
  );
}
