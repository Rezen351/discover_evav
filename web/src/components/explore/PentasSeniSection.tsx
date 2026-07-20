"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  MusicalNoteIcon,
  SpeakerWaveIcon,
  SparklesIcon,
  MapPinIcon,
} from "@heroicons/react/24/outline";
import { useSpotlight } from "@/hooks/useSpotlight";
import { useSlideshow } from "@/hooks/useSlideshow";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

// Lokasi pentas seni (Tari Belan & Tari Sariat) — Pantai Ngurbloat / pantai utama
// area Langgur–Tual, Kepulauan Kei (koordinat dari JourneyMapSection).
const EVENT_LAT = -5.6625;
const EVENT_LNG = 132.6362;
const EVENT_MAPS_URL = `https://www.google.com/maps/search/?api=1&query=${EVENT_LAT},${EVENT_LNG}`;
const EVENT_LOKASI = {
  id: "Pantai Ngurbloat, Langgur–Tual, Kepulauan Kei",
  en: "Ngurbloat Beach, Langgur–Tual, Kei Islands",
};

const elemenBudaya = [
  { labelId: "Tifa", labelEn: "Tifa", Icon: MusicalNoteIcon },
  { labelId: "Gong Dada", labelEn: "Gong Dada", Icon: SpeakerWaveIcon },
  { labelId: "Tari Sariat", labelEn: "Sariat Dance", Icon: SparklesIcon },
];

// Slideshow tarian Kei (autoplay 5s, cross-fade §7.3).
const TARIAN_PHOTOS: { src: string; altId: string; altEn: string }[] = [
  {
    src: "/images/budaya/tari-sawat-infopublik.jpg",
    altId: "Tari Sawat — tarian adat dengan ayunan selendang khas Kepulauan Kei",
    altEn: "Sawat Dance — a traditional dance with characteristic Kei sash movements",
  },
  {
    src: "/images/budaya/tari-perang-kompasiana.jpg",
    altId: "Penari Kei membawakan Tari Sawat di atas panggung pasir putih",
    altEn: "Kei dancers performing the Sawat Dance on a white-sand stage",
  },
  {
    src: "/images/budaya/tari-syariat-kemdikbud.png",
    altId: "Gerakan Tari Sariat yang agung diiringi dentuman Tifa Kei",
    altEn: "The majestic Sariat Dance movements accompanied by Kei Tifa drumming",
  },
  {
    src: "/images/budaya/kei_warriors_dance.png",
    altId: "Tarian perang masyarakat adat Kepulauan Kei sebagai panggung alam",
    altEn: "A war dance of the Kei customary community as a natural stage",
  },
];

export default function PentasSeniSection({ lang }: { lang: "id" | "en" }) {
  const ref = useRef<HTMLElement>(null);
  const { onMouseMove, onMouseLeave } = useSpotlight();
  const { index: tariIndex } = useSlideshow({
    count: TARIAN_PHOTOS.length,
    interval: 5000,
  });

  useEffect(() => {
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const ctx = gsap.context(() => {
      if (prefersReduced) {
        gsap.set(".pentas-fade", { opacity: 1, y: 0 });
        return;
      }
      gsap.from(".pentas-fade", {
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
      id="pentas-seni"
      ref={ref}
      className="relative w-full min-h-screen snap-start snap-always flex items-center bg-section z-[6] overflow-hidden"
    >
      {/* Aksen background motif tarian (blur/overlay), pointer-events-none z-0 */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-0 opacity-[0.06]"
      >
        <Image
          src="/images/budaya/tari-perang-kompasiana.jpg"
          alt=""
          fill
          sizes="100vw"
          className="object-cover blur-2xl scale-110"
        />
      </div>
      <div className="max-w-[98%] xl:max-w-[1600px] mx-auto px-4 md:px-8 w-full py-16 md:py-24">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
          <div className="pentas-fade md:col-span-1 lg:col-span-5 flex flex-col md:order-1 lg:order-1">
            <span className="font-sans uppercase tracking-[0.25em] text-brand text-xs md:text-sm font-semibold mb-4">
              {lang === "en" ? "Nature as a Stage" : "Alam sebagai Panggung"}
            </span>

            <h2 className="font-serif text-fluid-h2 md:text-5xl leading-tight text-black break-words">
              {lang === "en" ? (
                <>
                  Upon the Sand,{" "}
                  <span className="text-brand">Nature Dances</span>
                </>
              ) : (
                <>
                  Di Atas Pasir,{" "}
                  <span className="text-brand">Alam Menari</span>
                </>
              )}
            </h2>

            <p className="mt-6 md:mt-8 font-serif text-base sm:text-lg md:text-2xl leading-relaxed text-black/80">
              {lang === "en"
                ? "No artificial stage is needed. In the Kei Islands, nature is the stage — white-sand expanses, limestone cliffs, and clear seas become the backdrop for the grand Belan Dance and Sariat Dance. The beat of the Tifa and the melody of the Dada gong accompany the dancers' steps upon sand swept bare by the tide, staging an unforgettable harmony between humanity and the island's nature."
                : "Tak perlu panggung buatan. Di Kepulauan Kei, alam adalah pentasnya — hamparan pasir putih, tebing kapur, dan laut jernih menjadi latar Tari Belan dan Tari Sariat yang agung. Dentuman Tifa dan alunan gong Dada mengiringi langkah penari di atas pasir yang dihanyutkan surut, mementaskan harmoni antara manusia dan alam kepulauan yang tak terlupakan."}
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-3 md:gap-5">
              {elemenBudaya.map(({ labelId, labelEn, Icon }) => (
                <span
                  key={labelId}
                  className="inline-flex items-center gap-2 text-brand font-sans text-sm md:text-base font-medium"
                >
                  <Icon
                    className="h-5 w-5 md:h-6 md:w-6 text-brand"
                    aria-hidden="true"
                  />
                  <span aria-label={`${lang === "en" ? "Cultural element: " : "Elemen budaya: "}${lang === "en" ? labelEn : labelId}`}>
                    {lang === "en" ? labelEn : labelId}
                  </span>
                </span>
              ))}
            </div>

            <p className="mt-5 font-sans text-sm md:text-base text-black/70 flex items-center gap-2">
              <MapPinIcon className="h-4 w-4 md:h-5 md:w-5 text-brand shrink-0" aria-hidden="true" />
              <span>{lang === "en" ? EVENT_LOKASI.en : EVENT_LOKASI.id}</span>
            </p>

            <div className="mt-4">
              <a
                href={EVENT_MAPS_URL}
                target="_blank"
                rel="noopener noreferrer"
                onMouseMove={onMouseMove}
                onMouseLeave={onMouseLeave}
                className="btn-spotlight btn-cta w-full sm:w-auto justify-center text-center inline-flex items-center gap-2 font-sans text-sm md:text-base font-medium focus-ring rounded-full px-6 py-3"
                aria-label={lang === "en" ? "View the Arts Stage location on Google Maps" : "Lihat lokasi Pentas Seni di Google Maps"}
              >
                <MapPinIcon className="h-4 w-4 md:h-5 md:w-5 text-current" />
                {lang === "en" ? "Discover the Beauty of Kei Culture" : "Lihat Betapa Indahnya Budaya Kei"}
              </a>
            </div>
          </div>

          <div className="pentas-fade lg:col-span-7 md:col-span-1 relative w-full aspect-[16/10] md:aspect-[16/9] rounded-xl-design shadow-soft overflow-hidden md:order-2 lg:order-2">
            {TARIAN_PHOTOS.map((photo, i) => (
              <Image
                key={photo.src}
                src={photo.src}
                alt={lang === "en" ? photo.altEn : photo.altId}
                fill
                sizes="(max-width: 768px) 100vw, 58vw"
                className={`object-cover rounded-xl-design shadow-soft transition-opacity duration-1000 ease-in-out ${i === tariIndex ? "opacity-100" : "opacity-0"
                  }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
