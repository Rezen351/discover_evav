"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  BoltIcon,
  ShieldCheckIcon,
  UserGroupIcon,
  MapPinIcon,
} from "@heroicons/react/24/outline";
import { useSpotlight } from "@/hooks/useSpotlight";
import { useSlideshow } from "@/hooks/useSlideshow";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

// Lokasi lomba perahu Belan — start dari Desa Ngadi melewati Tual & finis di
// selat pemisah Tual–Kei Kecil (sumber: liputan Festival Pesona Meti Kei).
// Titik representatif: Pantai Ngurbloat / selat utama area Langgur–Tual.
const EVENT_LAT = -5.5725;
const EVENT_LNG = 132.7606;
const EVENT_MAPS_URL = `https://www.google.com/maps/search/?api=1&query=${EVENT_LAT},${EVENT_LNG}`;
const EVENT_LOKASI = "Desa Ngadi, Pulau Dullah Utara (Start Lomba Perahu Belan)";

const nilaiPerahu = [
  { label: "Kecepatan", Icon: BoltIcon },
  { label: "Ketangguhan", Icon: ShieldCheckIcon },
  { label: "Kekompakan", Icon: UserGroupIcon },
];

// Slideshow perahu layar tradisional Belan & bahari Kei (autoplay 5s, §7.3).
const PERAHU_PHOTOS: { src: string; alt: string }[] = [
  {
    src: "/images/budaya/perahu_belan_race_kei.png",
    alt: "Lomba perahu layar tradisional Belan yang megah membelah laut jernih Kepulauan Kei",
  },
  {
    src: "/images/budaya/lomba-perahu-belan-rri.jpg",
    alt: "Dua armada perahu Belan bersaing ketat di selat Tual-Kei Kecil disaksikan warga",
  }
];

export default function PerahuBelanSection() {
  const ref = useRef<HTMLElement>(null);
  const fotoRef = useRef<HTMLDivElement>(null);
  const { onMouseMove, onMouseLeave } = useSpotlight();
  const { index: perahuIndex } = useSlideshow({
    count: PERAHU_PHOTOS.length,
    interval: 5000,
  });

  useEffect(() => {
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const ctx = gsap.context(() => {
      if (prefersReduced) {
        gsap.set(".perahu-fade", { opacity: 1, y: 0 });
        gsap.set(fotoRef.current, { yPercent: 0 });
        return;
      }

      gsap.from(".perahu-fade", {
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

      if (fotoRef.current) {
        gsap.fromTo(
          fotoRef.current,
          { yPercent: -15 },
          {
            yPercent: 15,
            ease: "none",
            scrollTrigger: {
              trigger: ref.current,
              start: "top bottom",
              end: "bottom top",
              scrub: true,
            },
          }
        );
      }
    }, ref);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="perahu-belan"
      ref={ref}
      className="relative w-full min-h-screen snap-start snap-always overflow-hidden bg-section z-[5]"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 min-h-screen">
        <div
          ref={fotoRef}
          className="relative w-full min-h-[45vh] sm:min-h-[55vh] lg:min-h-screen overflow-hidden lg:col-span-1 order-1"
        >
          {PERAHU_PHOTOS.map((photo, i) => (
            <Image
              key={photo.src}
              src={photo.src}
              alt={photo.alt}
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className={`object-cover transition-opacity duration-1000 ease-in-out ${i === perahuIndex ? "opacity-100" : "opacity-0"
                }`}
            />
          ))}
          <div
            className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent lg:hidden"
            aria-hidden="true"
          />
        </div>

        <div className="relative flex items-end lg:items-center order-2 bg-section">
          <div className="max-w-[98%] xl:max-w-[1600px] mx-auto px-4 md:px-8 w-full py-16 md:py-24">
            <div className="perahu-fade w-full">
              <span className="font-sans uppercase tracking-[0.25em] text-brand text-xs md:text-sm font-semibold mb-4 block">
                Menjelajahi Laut Kei
              </span>

              <h2 className="font-serif text-fluid-h2 md:text-6xl leading-tight text-black break-words">
                Perahu Belan,{" "}
                <span className="text-brand">Menyusuri Samudera</span>
              </h2>

              <p className="mt-6 md:mt-8 font-serif text-base sm:text-lg md:text-2xl leading-relaxed text-black/80">
                Dari Pantai Ngurbloat hingga Pulau Bair, perairan Kei adalah
                surga bahari yang masih murni — air toska jernih, terumbu
                karang bermekaran, dan gugusan pulau bagai permata di Banda.
                Lomba perahu layar tradisional Belan merayakan keberanian
                menjelajahi laut ini, mengingatkan kita pada leluhur Kei yang
                merajut pulau-pulau dengan sentuhan dayung, bukan penaklukan.
              </p>

              <div className="mt-8 flex flex-wrap items-center gap-2 sm:gap-3 gap-y-2 md:gap-4">
                {nilaiPerahu.map(({ label, Icon }) => (
                  <span
                    key={label}
                    className="inline-flex items-center gap-2 rounded-full bg-brand/10 px-3 py-1.5 sm:px-4 sm:py-2 font-sans text-sm md:text-base font-medium text-brand"
                  >
                    <Icon
                      className="h-5 w-5 md:h-6 md:w-6 text-brand"
                      aria-hidden="true"
                    />
                    <span aria-label={`Nilai lomba perahu Belan: ${label}`}>
                      {label}
                    </span>
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
                  aria-label="Lihat lokasi Lomba Perahu Belan di Google Maps"
                >
                  <MapPinIcon className="h-4 w-4 md:h-5 md:w-5 text-current" />
                  Lihat Lokasi di Peta
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
