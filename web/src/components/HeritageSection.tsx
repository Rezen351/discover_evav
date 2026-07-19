"use client";

import { useRef, useEffect } from "react";
import Image from "next/image";
import { MapPinIcon, ArrowLongRightIcon } from "@heroicons/react/24/outline";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, A11y } from "swiper/modules";
import type { SwiperOptions } from "swiper/types";
import { heritageIntro, heritageItems } from "@/content/heritage";

import "swiper/css";
import "swiper/css/pagination";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const breakpoints: SwiperOptions["breakpoints"] = {
  0: { slidesPerView: 1.15, spaceBetween: 16 },
  640: { slidesPerView: 2.2, spaceBetween: 20 },
  1024: { slidesPerView: 3.2, spaceBetween: 24 },
  1280: { slidesPerView: 4, spaceBetween: 24 },
};

export default function HeritageSection() {
  const sectionRef = useRef<HTMLElement>(null);
  useEffect(() => {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const ctx = gsap.context(() => {
      if (prefersReduced) {
        gsap.set([".heritage-fade", ".heritage-card"], { opacity: 1, y: 0, x: 0 });
        return;
      }
      gsap.from(".heritage-fade", {
        y: 40,
        opacity: 0,
        duration: 0.8,
        stagger: 0.12,
        ease: "power2.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          once: true,
        },
      });
      gsap.from(".heritage-card", {
        y: 50,
        opacity: 0,
        duration: 0.7,
        stagger: 0.1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 70%",
          once: true,
        },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      id="warisan-leluhur"
      className="relative w-full min-h-screen bg-section pt-28 pb-16 md:pt-32 md:pb-20 z-[5] flex items-center justify-center snap-start snap-always overflow-hidden"
      ref={sectionRef}
    >
      {/* Watermark elang kecil di sudut kanan bawah */}
      <div
        className="absolute bottom-0 right-0 w-[260px] h-[260px] md:w-[440px] md:h-[440px] pointer-events-none z-0 select-none opacity-[0.07]"
        style={{
          maskImage: "linear-gradient(to top left, rgba(0,0,0,1) 20%, rgba(0,0,0,0) 80%)",
          WebkitMaskImage: "linear-gradient(to top left, rgba(0,0,0,1) 20%, rgba(0,0,0,0) 80%)",
        }}
      >
        <Image
          src="/images/heritage/elang_kecil.png"
          alt=""
          aria-hidden="true"
          fill
          sizes="(max-width: 768px) 260px, 440px"
          className="object-cover object-right-bottom mix-blend-multiply"
        />
      </div>

      <div className="max-w-[98%] xl:max-w-[1600px] mx-auto px-4 md:px-8 w-full flex flex-col gap-10 md:gap-12 relative z-10">
        {/* HEADER */}
        <div className="w-full heritage-fade flex flex-col md:flex-row md:items-end md:justify-between gap-4">
          <div className="max-w-4xl">
            <div
              className="text-brand font-bold tracking-[0.2em] uppercase text-xs md:text-sm mb-2"
              style={{ fontFamily: "var(--font-sans)" }}
            >
              {heritageIntro.eyebrow}
            </div>
            <h2
              className="text-fluid-h2 text-black font-normal leading-[1.12]"
              style={{ fontFamily: "var(--font-serif)" }}
            >
              {heritageIntro.title}{" "}
              <span className="text-brand">{heritageIntro.titleAccent}</span>
            </h2>
          </div>
          <p
            className="text-black/60 text-sm md:text-base max-w-xs md:text-right leading-snug line-clamp-3 md:line-clamp-2"
            style={{ fontFamily: "var(--font-sans)" }}
          >
            {heritageIntro.subtitle}
          </p>
        </div>

        {/* GALLERY — Swiper slider (geser mouse + dots pink) */}
        <div className="relative heritage-fade">
          <Swiper
            modules={[Pagination, A11y]}
            breakpoints={breakpoints}
            spaceBetween={24}
            grabCursor
            pagination={{ clickable: true, el: ".heritage-pagination" }}
            className="!pb-0 md:!pb-12"
          >
            {heritageItems.map((item) => (
              <SwiperSlide key={item.id} className="heritage-card group relative aspect-[3/4] rounded-lg-design overflow-hidden shadow-soft cursor-pointer active:press">
                <Image
                  src={item.image}
                  alt={item.imageAlt}
                  fill
                  sizes="(max-width: 640px) 78vw, (max-width: 1024px) 31vw, 23vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />
                <span
                  className="absolute top-3 left-3 bg-white/90 text-black text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider"
                  style={{ fontFamily: "var(--font-sans)" }}
                >
                  {item.era}
                </span>
                <div className="absolute bottom-4 left-4 right-4">
                  <h3
                    className="text-white text-lg md:text-xl font-normal leading-snug drop-shadow-md"
                    style={{ fontFamily: "var(--font-serif)" }}
                  >
                    {item.title}
                  </h3>
                  <div
                    className="flex items-center gap-1.5 text-white/80 text-xs mt-1.5"
                    style={{ fontFamily: "var(--font-sans)" }}
                  >
                    <MapPinIcon className="w-3.5 h-3.5 text-brand" />
                    {item.location}
                  </div>
                  <p
                    className="text-white/75 text-xs mt-2 leading-relaxed line-clamp-3 opacity-0 max-h-0 group-hover:opacity-100 group-hover:max-h-24 transition-all duration-500"
                    style={{ fontFamily: "var(--font-sans)" }}
                  >
                    {item.desc}
                  </p>
                  <div
                    className="flex items-center gap-1.5 text-brand text-xs font-semibold mt-2 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    style={{ fontFamily: "var(--font-sans)" }}
                  >
                    Telusuri
                    <ArrowLongRightIcon className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>

          {/* Dots indikator — Desktop only */}
          <div className="heritage-pagination mt-2 hidden md:flex items-center justify-center gap-2" />
        </div>

        {/* QUOTE PENUTUP */}
        <div className="w-full heritage-fade mt-2">
          <figure className="relative w-full text-left px-1">
            <blockquote
              className="text-black/70 text-base md:text-xl leading-relaxed"
              style={{ fontFamily: "var(--font-sans)" }}
            >
              Setiap kampung adat adalah perpustakaan hidup. Di sana, batu, gong, dan nyanyian masih berbicara dalam bahasa leluhur yang tak pernah benar-benar hilang.
            </blockquote>
            <figcaption
              className="mt-3 text-brand text-xs font-bold uppercase tracking-[0.2em]"
              style={{ fontFamily: "var(--font-sans)" }}
            >
              — Warisan Tanah Evav
            </figcaption>
          </figure>
        </div>
      </div>
    </section>
  );
}
