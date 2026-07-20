"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowRightIcon } from "@heroicons/react/24/outline";
import { useSpotlight } from "@/hooks/useSpotlight";
import { useSlideshow } from "@/hooks/useSlideshow";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

// Slideshow "Saat Alam Berpamit" — berganti antar beberapa foto (autoplay 5s, §7.3).
const WERWARAT_PHOTOS: { src: string; alt: string }[] = [
  {
    src: "/images/eksplorasi/wer_warat.png",
    alt: "Warga Kei membentangkan tali janur kuning di air dangkal saat tradisi Wer Warat",
  },
  {
    src: "/images/eksplorasi/kei_ngurbloat.png",
    alt: "Pantai Ngurbloat — pasir terhalus di dunia saat laut surut di Kepulauan Kei",
  },
  {
    src: "/images/eksplorasi/kei_ngurtavur.png",
    alt: "Pasir Timbul Ngurtavur — jalur pasir putih membelah laut biru saat meti",
  },
  {
    src: "/images/eksplorasi/pelikan_migration_australia.png",
    alt: "Kawanan burung pelikan Australia terbang bermigrasi di atas perairan jernih Pasir Timbul Ngurtavur",
  },
  {
    src: "/images/eksplorasi/kei_beach.png",
    alt: "Hamparan pasir Panjang Ohoililir yang terbuka luas saat surut ekstrem",
  },
];

export default function WerWaratSection() {
  const ref = useRef<HTMLElement>(null);
  const { onMouseMove, onMouseLeave } = useSpotlight();
  const { index: werwaratIndex } = useSlideshow({
    count: WERWARAT_PHOTOS.length,
    interval: 5000,
  });

  useEffect(() => {
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const ctx = gsap.context(() => {
      if (prefersReduced) {
        gsap.set(".werwarat-fade", { opacity: 1, y: 0 });
        return;
      }
      gsap.from(".werwarat-fade", {
        opacity: 0,
        y: 30,
        duration: 1.1,
        stagger: 0.2,
        ease: "power2.out",
        scrollTrigger: {
          trigger: ref.current,
          start: "top 70%",
          toggleActions: "play none none reverse",
        },
      });
    }, ref);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="wer-warat"
      ref={ref}
      className="relative w-full min-h-screen snap-start snap-always flex items-center bg-section z-[7] overflow-hidden"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.04]"
      >
        <svg
          className="h-full w-full"
          viewBox="0 0 400 400"
          preserveAspectRatio="xMidYMid slice"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g stroke="currentColor" strokeWidth="2">
            <path d="M0 40 H400 M0 80 H400 M0 120 H400 M0 160 H400 M0 200 H400 M0 240 H400 M0 280 H400 M0 320 H400 M0 360 H400" />
            <path d="M40 0 V400 M80 0 V400 M120 0 V400 M160 0 V400 M200 0 V400 M240 0 V400 M280 0 V400 M320 0 V400 M360 0 V400" />
            <path d="M0 0 L400 400 M400 0 L0 400" />
            <path d="M200 40 L360 200 L200 360 L40 200 Z" />
          </g>
        </svg>
      </div>

      <div className="max-w-[98%] xl:max-w-[1600px] mx-auto px-4 md:px-8 w-full py-16 md:py-24">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
          <div className="werwarat-fade md:col-span-1 lg:col-span-7 relative w-full aspect-[16/10] md:aspect-[16/9] rounded-xl-design shadow-soft overflow-hidden">
            {WERWARAT_PHOTOS.map((photo, i) => (
              <Image
                key={photo.src}
                src={photo.src}
                alt={photo.alt}
                fill
                sizes="(max-width: 768px) 100vw, 58vw"
                className={`object-cover transition-opacity duration-1000 ease-in-out ${i === werwaratIndex ? "opacity-100" : "opacity-0"
                  }`}
              />
            ))}
          </div>

          <div className="werwarat-fade md:col-span-1 lg:col-span-5 flex flex-col">
            <span className="font-sans uppercase tracking-[0.25em] text-brand text-xs md:text-sm font-semibold mb-4">
              Saat Alam Berpamit
            </span>

            <h2 className="font-serif text-fluid-h2 md:text-5xl leading-tight text-black break-words">
              Laut Surut,{" "}
              <span className="text-brand">Hamparan Surga Terbuka</span>
            </h2>

            <blockquote className="mt-6 md:mt-8 font-serif text-base sm:text-lg md:text-2xl leading-relaxed text-black/80 border-l-2 border-brand pl-5 md:pl-6">
              &ldquo;Saat air surut bermil-mil jauhnya, laut membuka gerbangnya —
              hamparan pasir putih sehalus tepung yang membelah birunya samudera.
              Di Pantai Ngurbloat dan Pasir Timbul Ngurtavur, alam Kei
              memperlihatkan wajahnya yang paling murni: pasir terhalus di dunia,
              laut jernih sebening kaca, dan burung pelikan Australia yang
              bermigrasi ke tepian. Inilah keindahan alam yang menyatu dengan
              napas masyarakat Kei.&rdquo;
            </blockquote>

            {/* <div className="mt-8">
              <a
                href="#perahu-belan"
                onMouseMove={onMouseMove}
                onMouseLeave={onMouseLeave}
                className="btn-spotlight btn-cta inline-flex items-center gap-2 font-sans text-sm md:text-base font-medium focus-ring rounded-full px-6 py-3"
                aria-label="Jelajahi keindahan alam Pantai Ngurbloat dan Ngurtavur"
              >
                Jelajahi Pasir Terhalus
                <ArrowRightIcon className="h-4 w-4 md:h-5 md:w-5 text-current" />
              </a>
            </div> */}
          </div>
        </div>
      </div>
    </section>
  );
}
