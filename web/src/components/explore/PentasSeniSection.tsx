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
const EVENT_LOKASI = "Pantai Ngurbloat, Langgur–Tual, Kepulauan Kei";

const elemenBudaya = [
  { label: "Tifa", Icon: MusicalNoteIcon },
  { label: "Gong Dada", Icon: SpeakerWaveIcon },
  { label: "Tari Sariat", Icon: SparklesIcon },
];

// Slideshow tarian Kei (autoplay 5s, cross-fade §7.3).
const TARIAN_PHOTOS: { src: string; alt: string }[] = [
  {
    src: "/images/budaya/kei_tari_sawat_1.png",
    alt: "Tari Sawat — tarian adat dengan ayunan selendang khas Kepulauan Kei",
  },
  {
    src: "/images/budaya/kei_tari_sawat_2.png",
    alt: "Penari Kei membawakan Tari Sawat di atas panggung pasir putih",
  },
  {
    src: "/images/budaya/kei_tari_sawat_3.png",
    alt: "Gerakan Tari Sariat yang agung diiringi dentuman Tifa Kei",
  },
  {
    src: "/images/budaya/kei_warriors_dance.png",
    alt: "Tarian perang masyarakat adat Kepulauan Kei sebagai panggung alam",
  },
];

export default function PentasSeniSection() {
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
          src="/images/budaya/kei_tari_sawat_2.png"
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
              Alam sebagai Panggung
            </span>

            <h2 className="font-serif text-fluid-h2 md:text-5xl leading-tight text-black break-words">
              Di Atas Pasir,{" "}
              <span className="text-brand">Alam Menari</span>
            </h2>

            <p className="mt-6 md:mt-8 font-serif text-lg md:text-2xl leading-relaxed text-black/80">
              Tak perlu panggung buatan. Di Kepulauan Kei, alam adalah
              pentasnya — hamparan pasir putih, tebing kapur, dan laut jernih
              menjadi latar Tari Belan dan Tari Sariat yang agung. Dentuman Tifa
              dan alunan gong Dada mengiringi langkah penari di atas pasir yang
              dihanyutkan surut, mementaskan harmoni antara manusia dan alam
              kepulauan yang tak terlupakan.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-3 md:gap-5">
              {elemenBudaya.map(({ label, Icon }) => (
                <span
                  key={label}
                  className="inline-flex items-center gap-2 text-brand font-sans text-sm md:text-base font-medium"
                >
                  <Icon
                    className="h-5 w-5 md:h-6 md:w-6 text-brand"
                    aria-hidden="true"
                  />
                  <span aria-label={`Elemen budaya: ${label}`}>{label}</span>
                </span>
              ))}
            </div>

            <p className="mt-5 font-sans text-sm md:text-base text-black/70 flex items-center gap-2">
              <MapPinIcon className="h-4 w-4 md:h-5 md:w-5 text-brand shrink-0" aria-hidden="true" />
              <span>{EVENT_LOKASI}</span>
            </p>

            <div className="mt-4">
              <a
                href={EVENT_MAPS_URL}
                target="_blank"
                rel="noopener noreferrer"
                onMouseMove={onMouseMove}
                onMouseLeave={onMouseLeave}
                className="btn-spotlight btn-cta inline-flex items-center gap-2 font-sans text-sm md:text-base font-medium focus-ring rounded-full px-6 py-3"
                aria-label="Lihat lokasi Pentas Seni di Google Maps"
              >
                <MapPinIcon className="h-4 w-4 md:h-5 md:w-5 text-current" />
                Lihat Betapa Indahnya Budaya Kei
              </a>
            </div>
          </div>

          <div className="pentas-fade lg:col-span-7 md:col-span-1 relative w-full aspect-[16/10] md:aspect-[16/9] rounded-xl-design shadow-soft overflow-hidden md:order-2 lg:order-2">
            {TARIAN_PHOTOS.map((photo, i) => (
              <Image
                key={photo.src}
                src={photo.src}
                alt={photo.alt}
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
