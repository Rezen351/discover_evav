"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import { ArrowRightIcon, MapPinIcon } from "@heroicons/react/24/outline";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useSpotlight } from "@/hooks/useSpotlight";
import {
  spotAlam,
  kategoriAlam,
  type KategoriAlam,
} from "@/content/eksplorasi";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function WisataAlamSection() {
  const ref = useRef<HTMLElement>(null);
  const [filter, setFilter] = useState<"Semua" | KategoriAlam>("Semua");
  const { onMouseMove, onMouseLeave } = useSpotlight();

  const filtered = useMemo(
    () =>
      filter === "Semua"
        ? spotAlam
        : spotAlam.filter((spot) => spot.kategori === filter),
    [filter]
  );

  useEffect(() => {
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const ctx = gsap.context(() => {
      if (prefersReduced) {
        gsap.set(".alam-fade", { opacity: 1, y: 0 });
        return;
      }
      gsap.from(".alam-fade", {
        opacity: 0,
        y: 30,
        duration: 1.1,
        stagger: 0.12,
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
      id="wisata-alam"
      ref={ref}
      className="relative w-full min-h-screen snap-start snap-always flex items-center bg-section z-[4] overflow-hidden py-20"
    >
      <div className="max-w-[98%] xl:max-w-[1600px] mx-auto px-4 md:px-8 w-full">
        {/* Header editorial asimetris */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-end mb-10 md:mb-14">
          <div className="alam-fade lg:col-span-7 flex flex-col">
            <span className="font-sans uppercase tracking-[0.25em] text-brand text-xs md:text-sm font-semibold mb-4">
              Wisata Alam EVAv
            </span>

            <h2 className="font-serif text-fluid-h2 md:text-5xl leading-tight text-black break-words">
              Keindahan{" "}
              <span className="text-brand">yang Masih Murni</span>
            </h2>

            <p className="mt-6 md:mt-8 font-serif text-lg md:text-2xl leading-relaxed text-black/80">
              Di balik Festival Meti, Kepulauan Kei menyimpan surga yang tak
              pernah tidur: pasir terhalus di dunia, laut sebening kaca, gugusan
              pulau bagai permata, dan goa-gua yang menyimpan misteri. Jelajahi
              keindahan alam Evav — pilih kategori, temukan spot, lalu rancang
              petualanganmu.
            </p>
          </div>

          {/* Filter chip kategori */}
          <div
            className="alam-fade lg:col-span-5 flex flex-wrap justify-start lg:justify-end gap-2 md:gap-3"
            role="group"
            aria-label="Filter kategori wisata alam"
          >
            {kategoriAlam.map((kat) => {
              const active = filter === kat;
              return (
                <button
                  key={kat}
                  type="button"
                  onClick={() => setFilter(kat)}
                  aria-pressed={active}
                  className={`inline-flex items-center rounded-full px-4 py-2 font-sans text-sm md:text-base font-medium transition-colors focus-ring ${
                    active
                      ? "bg-brand text-white"
                      : "bg-brand/10 text-brand hover:bg-brand/20"
                  }`}
                >
                  {kat}
                </button>
              );
            })}
          </div>
        </div>

        {/* Grid kartu spot alam */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {filtered.map((spot) => (
            <article
              key={spot.id}
              className="alam-fade group flex flex-col bg-white border border-brand/10 rounded-xl-design shadow-soft hover:border-brand/30 transition-colors overflow-hidden"
            >
              <div className="relative w-full h-[200px] md:h-[240px] overflow-hidden">
                <Image
                  src={spot.gambar}
                  alt={spot.alt}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <span className="absolute top-3 left-3 rounded-full bg-white/90 px-3 py-1 font-sans text-xs font-semibold text-brand-navy shadow-sm">
                  {spot.kategori}
                </span>
              </div>

              <div className="flex flex-col flex-1 p-5 md:p-6">
                <h3 className="font-serif text-xl md:text-2xl leading-snug text-black">
                  {spot.nama}
                </h3>
                <p className="mt-3 font-sans text-sm md:text-base leading-relaxed text-black/70 flex-1">
                  {spot.deskripsi}
                </p>

                <a
                  href={spot.mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onMouseMove={onMouseMove}
                  onMouseLeave={onMouseLeave}
                  className="btn-spotlight btn-cta mt-5 inline-flex items-center gap-2 self-start font-sans text-sm md:text-base font-medium focus-ring rounded-full px-5 py-2.5"
                  aria-label={`Lihat ${spot.nama} di Google Maps`}
                >
                  <MapPinIcon className="h-4 w-4 md:h-5 md:w-5 text-current" />
                  Lihat di Peta
                </a>
              </div>
            </article>
          ))}
        </div>

        {/* CTA penutup section */}
        <div className="alam-fade mt-12 md:mt-16 flex flex-wrap items-center gap-4 md:gap-6">
          <a
            href="/destinasi"
            onMouseMove={onMouseMove}
            onMouseLeave={onMouseLeave}
            className="btn-spotlight btn-cta inline-flex items-center gap-2 font-sans text-sm md:text-base font-medium focus-ring rounded-full px-6 py-3"
            aria-label="Jelajahi semua destinasi Kepulauan Kei"
          >
            Jelajahi Semua Destinasi
            <ArrowRightIcon className="h-4 w-4 md:h-5 md:w-5 text-current" />
          </a>

          <a
            href={spotAlam[0]?.mapsUrl ?? "#"}
            target="_blank"
            rel="noopener noreferrer"
            onMouseMove={onMouseMove}
            onMouseLeave={onMouseLeave}
            className="btn-spotlight btn-cta inline-flex items-center gap-2 font-sans text-sm md:text-base font-medium focus-ring rounded-full px-6 py-3"
            aria-label={`Lihat ${spotAlam[0]?.nama ?? "destinasi"} di Google Maps`}
          >
            <MapPinIcon className="h-4 w-4 md:h-5 md:w-5 text-current" />
            Lihat di Peta
          </a>
        </div>
      </div>
    </section>
  );
}
