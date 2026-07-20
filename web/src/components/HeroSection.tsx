"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import { useTimeOfDay, temporalGreetings } from "@/hooks/useTimeOfDay";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}
const slides = [
  { id: 1, src: "/images/budaya/tari-syariat-kemdikbud.png", video: "/videos/human.mov", title: "Budaya Adat", subtitle: "Harmoni tradisi dan kearifan lokal leluhur Kei" },
  { id: 2, src: "/images/eksplorasi/kei_ngurbloat.png", video: "/videos/nature.mov", title: "Keindahan Alam", subtitle: "Surga tersembunyi berpasir putih dan laut jernih" },
  { id: 3, src: "/images/satwa/kei_kacamata_bird.png", video: "/videos/animal.mov", title: "Kehidupan Satwa", subtitle: "Keanekaragaman fauna endemik yang menakjubkan" },
];

export default function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);
  const vignetteRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const scrollIndicatorRef = useRef<HTMLDivElement>(null);

  const [activeSlide, setActiveSlide] = useState(0);
  const timeOfDay = useTimeOfDay();
  const greeting = temporalGreetings[timeOfDay];
  // State: false = full video (cinematic), true = content revealed
  const [contentVisible, setContentVisible] = useState(false);
  // Sync slideshow with video duration
  useEffect(() => {
    videoRefs.current.forEach((vid, idx) => {
      if (vid) {
        if (idx === activeSlide) {
          vid.currentTime = 0;
          vid.play().catch(() => { });
        } else {
          vid.pause();
        }
      }
    });
  }, [activeSlide]);

  // Animate content IN (reveal)
  const revealContent = useCallback(() => {
    setContentVisible(true);
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    // Animate vignette in
    gsap.to(vignetteRef.current, { opacity: 1, duration: 0.8, ease: "power2.out" });
    // Text-mask reveal H1 (word-per-line via overflow mask)
    const lines = textRef.current?.querySelectorAll<HTMLElement>(".hero-line-inner");
    const accent = textRef.current?.querySelector<HTMLElement>(".hero-accent-inner");
    if (prefersReduced) {
      if (lines) gsap.set(lines, { yPercent: 0 });
      if (accent) gsap.set(accent, { yPercent: 0 });
    } else if (lines) {
      gsap.fromTo(lines,
        { yPercent: 110 },
        { yPercent: 0, duration: 1, stagger: 0.12, ease: "power4.out", delay: 0.2 }
      );
      if (accent) {
        gsap.fromTo(accent,
          { yPercent: 110 },
          { yPercent: 0, duration: 1, delay: 0.7, ease: "back.out(1.4)" }
        );
      }
    }
    // Animate content (desc + cards) in
    if (prefersReduced) {
      gsap.set(textRef.current, { y: 0, opacity: 1 });
    } else {
      gsap.fromTo(textRef.current,
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.9, delay: 0.1, ease: "power3.out" }
      );
    }
    gsap.fromTo(cardsRef.current,
      { x: 100, opacity: 0 },
      { x: 0, opacity: 1, duration: 1.2, delay: 0.4, ease: "power4.out" }
    );
    // Animate scroll indicator in
    gsap.fromTo(scrollIndicatorRef.current,
      { opacity: 0, y: 10 },
      { opacity: 0.8, y: 0, duration: 0.8, delay: 0.9, ease: "power2.out" }
    );
  }, []);

  // Animate content OUT (cinematic full video)
  const hideContent = useCallback(() => {
    // Animate content out
    gsap.to(textRef.current, { y: 30, opacity: 0, duration: 0.6, ease: "power2.in" });
    gsap.to(cardsRef.current, { x: 60, opacity: 0, duration: 0.5, ease: "power2.in" });
    gsap.to(scrollIndicatorRef.current, { opacity: 0, y: 10, duration: 0.4, ease: "power2.in" });
    // Animate vignette out
    gsap.to(vignetteRef.current, {
      opacity: 0, duration: 0.7, delay: 0.2, ease: "power2.in", onComplete: () => {
        setContentVisible(false);
      }
    });
  }, []);

  // Reveal on scroll (wheel or touch swipe down)
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const onWheel = (e: WheelEvent) => {
      // Hanya tangkap aksi jika konten belum terlihat
      if (!contentVisible) {
        // e.deltaY > 0 berarti user sedang scroll ke bawah
        if (e.deltaY > 0) {
          e.preventDefault(); // Tahan scroll halaman ke bawah
          revealContent();
        }
      }
    };

    const onTouchStart = (e: TouchEvent) => {
      el.dataset.touchStartY = String(e.touches[0].clientY);
    };

    const onTouchMove = (e: TouchEvent) => {
      const startY = Number(el.dataset.touchStartY || 0);
      const dy = startY - e.touches[0].clientY;

      // dy > 10 berarti user melakukan swipe ke atas (layar scroll ke bawah)
      if (!contentVisible && dy > 10) {
        if (e.cancelable) {
          e.preventDefault(); // Tahan scroll halaman
        }
        revealContent();
      }
    };

    // PENTING: Gunakan { passive: false } agar e.preventDefault() berfungsi
    el.addEventListener("wheel", onWheel, { passive: false });
    // touchstart bisa tetap passive karena kita tidak memblokir event ini
    el.addEventListener("touchstart", onTouchStart, { passive: true });
    el.addEventListener("touchmove", onTouchMove, { passive: false });

    return () => {
      el.removeEventListener("wheel", onWheel);
      el.removeEventListener("touchstart", onTouchStart);
      el.removeEventListener("touchmove", onTouchMove);
    };
  }, [contentVisible, revealContent]);
  // Handle click on the section (toggle)
  const handleSectionClick = useCallback((e: React.MouseEvent<HTMLElement>) => {
    // Check if click target is NOT a card, card child, or scroll indicator
    const target = e.target as HTMLElement;
    const isCard = target.closest(".floating-card, [id^='hero-card-']");
    const isScrollIndicator = target.closest(".scroll-indicator");

    if (isScrollIndicator) return; // Let scroll indicator handle its own click

    if (!contentVisible) {
      // Full video → reveal content
      revealContent();
    } else if (!isCard) {
      // Content visible + clicked on empty area → back to full video
      hideContent();
    }
  }, [contentVisible, revealContent, hideContent]);

  // Animasi teks deskripsi saat berganti slide
  useEffect(() => {
    if (contentVisible) {
      gsap.fromTo(".slide-desc",
        { opacity: 0, y: 15 },
        { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" }
      );
    }
  }, [activeSlide, contentVisible]);

  // GSAP Hover Interactions for Cards
  const handleCardEnter = (idx: number) => {
    if (cardRefs.current[idx]) {
      gsap.to(cardRefs.current[idx], {
        scale: 1.05,
        duration: 0.4,
        ease: "back.out(1.5)"
      });
    }
  };

  const handleCardLeave = (idx: number, isFront: boolean) => {
    if (cardRefs.current[idx]) {
      gsap.to(cardRefs.current[idx], {
        scale: isFront ? 1 : 1,
        duration: 0.4,
        ease: "power2.out",
        clearProps: "scale"
      });
    }
  };

  return (
    <section
      id="hero"
      data-hero
      className="relative h-screen w-full overflow-hidden z-[8] bg-hero-dark flex items-center justify-center snap-start snap-always cursor-pointer"
      ref={containerRef}
      onClick={handleSectionClick}
    >
      {/* Dynamic Background Videos / Images */}
      <div className="absolute inset-0 w-full h-full z-[1] overflow-hidden">
        {slides.map((slide, idx) => (
          <div
            key={`bg-${slide.id}`}
            className={`bg-video-container absolute inset-0 w-full h-full transition-opacity duration-1500 ease-in-out ${idx === activeSlide ? "opacity-100" : "opacity-0"}`}
          >
            <video
              ref={(el) => {
                videoRefs.current[idx] = el;
              }}
              autoPlay
              muted
              playsInline
              onEnded={() => {
                if (idx === activeSlide) {
                  setActiveSlide((prev) => (prev + 1) % slides.length);
                }
              }}
              className="w-full h-full object-cover object-center"
            >
              <source src={slide.video} type="video/mp4" />
            </video>
          </div>
        ))}
      </div>

      {/* Overlay - Vignette (initially hidden, revealed on click) */}
      <div ref={vignetteRef} className="absolute inset-0 z-[2] pointer-events-none" style={{ opacity: 0 }}>
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/20 to-transparent"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-tropical-dark)] via-transparent to-black/40"></div>
      </div>

      {/* Temporal greeting - shown only when full video */}
      {!contentVisible && (
        <div className="absolute inset-0 z-[10] flex items-center justify-center pointer-events-none select-none">
          <div className="relative flex flex-col items-center gap-3 text-center px-12 py-8">
            <div
              className="absolute inset-0 -z-10"
              style={{
                background: "radial-gradient(ellipse at center, rgba(11,31,42,0.45) 0%, rgba(11,31,42,0.22) 45%, rgba(11,31,42,0) 75%)",
                filter: "blur(22px)",
              }}
              aria-hidden="true"
            />
            <span
              className="text-white/90 text-sm md:text-lg tracking-[0.12em] font-light text-center max-w-[90vw]"
              style={{ fontFamily: "var(--font-sans)" }}
            >
              <span className="text-brand">{greeting.kei}</span> — {greeting.id}
            </span>
          </div>
        </div>
      )}

      {/* Top Logo */}
      <div className={`absolute top-6 left-1/2 -translate-x-1/2 z-[10] flex flex-col items-center justify-center w-full transition-opacity duration-700 ${contentVisible ? "opacity-100" : "opacity-0"}`}>
        <Image
          src="/logo-white.svg"
          alt="Simfoni Evav"
          width={180}
          height={65}
          priority
          className="h-[45px] md:h-[65px] w-auto object-contain opacity-95 mb-2 brightness-0 invert"
        />
        <h2 className="text-lg md:text-[clamp(1.2rem,2vw,1.8rem)] font-normal tracking-widest drop-shadow-md mb-1 leading-none" style={{ fontFamily: "var(--font-serif)" }}>
          SIMFONI EVAV
        </h2>
        <p className="text-[10px] md:text-[clamp(0.8rem,1vw,1rem)] font-light drop-shadow-sm opacity-90" style={{ fontFamily: "var(--font-sans)" }}>
          Peradaban di Atas Pasir Putih
        </p>
      </div>

      {/* Main content — always rendered but opacity controlled by GSAP */}
      <div
        ref={contentRef}
        className="relative z-[3] w-full max-w-[98%] xl:max-w-[1600px] mx-auto px-4 md:px-8 flex flex-col md:flex-row md:justify-start items-center md:items-center pt-24 md:pt-0 pb-16 md:pb-0 md:pl-[4%] xl:pl-[6%] mb-[30px] md:mb-[50px]"
        style={{ pointerEvents: contentVisible ? "auto" : "none" }}
      >
        {/* Left Content */}
        <div className="flex flex-col text-center md:text-left items-center md:items-start w-full md:w-[52%] xl:w-[46%] mr-auto" ref={textRef} style={{ opacity: 0 }}>
          <h1 className="text-[clamp(1.6rem,7vw,2.5rem)] md:text-fluid-h1 font-normal leading-[1.12] drop-shadow-lg mb-2 flex flex-col" style={{ fontFamily: "var(--font-serif)" }}>
            <span className="block overflow-hidden pb-[0.12em]"><span className="hero-line-inner block">Eksplorasi Surga</span></span>
            <span className="block overflow-hidden pb-[0.12em]"><span className="hero-line-inner block">Tersembunyi dan</span></span>
            <span className="block overflow-hidden pb-[0.12em]"><span className="hero-line-inner block">Keajaiban Budaya</span></span>
          </h1>
          <div className="text-[clamp(1.8rem,8vw,2.8rem)] md:text-fluid-h1 font-normal -mt-2 mb-6 drop-shadow-md text-brand overflow-hidden pb-[0.12em]" style={{ fontFamily: "var(--font-cursive)" }}>
            <span className="hero-accent-inner block">di Kepulauan Kei</span>
          </div>
          <div key={`desc-${activeSlide}`} className="hero-desc-wrap slide-desc opacity-0">
            <p className="text-base md:text-lg font-light max-w-full md:max-w-[600px] leading-relaxed drop-shadow-md mx-auto md:mx-0 text-white/90" style={{ fontFamily: "var(--font-sans)" }}>
              {slides[activeSlide].subtitle}
            </p>
          </div>
        </div>

        {/* Right Content - Interactive GSAP Card Pile */}
        <div className="relative h-[500px] hidden md:flex items-center justify-end w-full md:w-[44%] xl:w-[38%] perspective-[1200px]" ref={cardsRef} style={{ opacity: 0 }}>
          {slides.map((slide, idx) => {
            const offset = (idx - activeSlide + slides.length) % slides.length;
            const isFront = offset === 0;

            let zIndex = 10;
            let rotate = "0deg";
            let translateX = "0px";
            let translateY = "0px";
            let scale = 1;
            let opacity = 1;
            let shadow = "rgba(0,0,0,0.1)";

            switch (offset) {
              case 0:
                zIndex = 40; rotate = "0deg"; translateX = "0px"; translateY = "0px"; scale = 1; opacity = 1; shadow = "rgba(0,0,0,0.3)";
                break;
              case 1:
                zIndex = 30; rotate = "6deg"; translateX = "20px"; translateY = "-5px"; scale = 0.95; opacity = 0.8; shadow = "rgba(0,0,0,0.2)";
                break;
              case 2:
                zIndex = 20; rotate = "12deg"; translateX = "40px"; translateY = "-10px"; scale = 0.9; opacity = 0.5; shadow = "rgba(0,0,0,0.1)";
                break;
            }

            return (
              <div
                key={slide.id}
                className="absolute transition-all duration-1000 ease-[cubic-bezier(0.25,1,0.5,1)] origin-bottom-left"
                style={{
                  zIndex,
                  opacity,
                  transform: `translateX(${translateX}) translateY(${translateY}) rotate(${rotate}) scale(${scale})`,
                }}
              >
                <div
                  id={`hero-card-${idx}`}
                  ref={(el) => { cardRefs.current[idx] = el; }}
                  onClick={(e) => { e.stopPropagation(); setActiveSlide((prev) => (prev + 1) % slides.length); }}
                  onMouseEnter={() => handleCardEnter(idx)}
                  onMouseLeave={() => handleCardLeave(idx, isFront)}
                  className={`floating-card relative w-[280px] h-[420px] lg:w-[320px] lg:h-[480px] bg-white rounded-[24px] overflow-hidden cursor-pointer group`}
                  style={{
                    boxShadow: `-15px 15px 40px ${shadow}`
                  }}
                >
                  {/* Gradient Overlay for better text readability */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent z-[2] opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                  {/* Image */}
                  <Image
                    src={slide.src}
                    alt={slide.title}
                    fill
                    sizes="(max-width: 768px) 280px, 320px"
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                  />

                  {/* Card Title on Hover */}
                  <div className="absolute bottom-6 left-6 right-6 z-[3] translate-y-8 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                    <h3 className="text-xl font-bold text-white drop-shadow-md" style={{ fontFamily: "var(--font-sans)" }}>{slide.title}</h3>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Scroll Down Indicator */}
      <div
        ref={scrollIndicatorRef}
        className="scroll-indicator absolute left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-[10] hover:opacity-100 transition-opacity cursor-pointer bottom-[45px] md:bottom-[100px]"
        style={{ opacity: 0 }}
        onClick={(e) => {
          e.stopPropagation();
          const nextSection = document.getElementById("hero")?.nextElementSibling;
          nextSection?.scrollIntoView({ behavior: "smooth" });
        }}
      >
        <span className="text-white/80 text-[10px] md:text-xs font-light tracking-[0.25em] uppercase" style={{ fontFamily: "var(--font-sans)" }}>Scroll Down</span>
        <div className="w-[2px] h-10 md:h-12 bg-white/20 overflow-hidden relative mt-1 rounded-full">
          <div className="w-full h-1/2 absolute top-0 left-0 animate-[scrolldown_1.5s_ease-in-out_infinite] rounded-full" style={{ background: "linear-gradient(to bottom, #E6677C, #6FC2BE, #EAF5F9)" }}></div>
        </div>
      </div>
    </section>
  );
}
