"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { ArrowRightIcon } from "@heroicons/react/24/outline";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useSpotlight } from "@/hooks/useSpotlight";
import { satwaEndemik } from "@/content/satwaEndemik";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function SatwaEndemikSection() {
  const ref = useRef<HTMLElement>(null);
  const { onMouseMove, onMouseLeave } = useSpotlight();

  useEffect(() => {
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const ctx = gsap.context(() => {
      if (prefersReduced) {
        gsap.set(".satwa-fade", { opacity: 1, y: 0 });
        return;
      }
      gsap.from(".satwa-fade", {
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
      id="satwa-endemik"
      ref={ref}
      className="relative w-full min-h-screen snap-start snap-always flex items-center bg-section z-[3] overflow-hidden py-20"
    >
      <div className="max-w-[98%] xl:max-w-[1600px] mx-auto px-4 md:px-8 w-full">
        {/* Header editorial asimetris */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-end mb-10 md:mb-14">
          <div className="satwa-fade lg:col-span-8 flex flex-col">
            <span className="font-sans uppercase tracking-[0.25em] text-brand text-xs md:text-sm font-semibold mb-4">
              Satwa Endemik Kei
            </span>

            <h2 className="font-serif text-fluid-h2 md:text-5xl leading-tight text-black break-words">
              Penghuni{" "}
              <span className="text-brand">Asli Evav</span>
            </h2>

            <p className="mt-6 md:mt-8 font-serif text-lg md:text-2xl leading-relaxed text-black/80">
              Keindahan Kei tidak hanya ada di pasir dan lautnya, tapi juga pada
              napas-napas kecil yang menghuninya. Dari pelikan Australia yang
              datang saat pasir timbul membentang, hingga burung dan satwa hutan
              yang menjadi saudara alam masyarakat Kei — mereka adalah tamu
              abadi yang membuat Evav tetap hidup.
            </p>
          </div>
        </div>

        {/* Galeri fauna grid asimetris */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {satwaEndemik.map((satwa) => (
            <article
              key={satwa.id}
              className="satwa-fade group flex flex-col bg-white border border-brand/10 rounded-xl-design shadow-soft hover:border-brand/30 transition-colors overflow-hidden"
            >
              <div className="relative w-full h-[200px] md:h-[240px] overflow-hidden">
                <Image
                  src={satwa.gambar}
                  alt={satwa.alt}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                {satwa.status && (
                  <span className="absolute top-3 left-3 rounded-full bg-brand/10 text-brand px-3 py-1 font-sans text-xs font-semibold">
                    {satwa.status}
                  </span>
                )}
              </div>

              <div className="flex flex-col flex-1 p-5 md:p-6">
                <h3 className="font-serif text-xl md:text-2xl leading-snug text-black">
                  {satwa.nama}
                </h3>
                {satwa.namaLatin && (
                  <p className="mt-1 font-sans text-xs italic text-black/50">
                    {satwa.namaLatin}
                  </p>
                )}
                <p className="mt-2 font-sans text-xs font-medium uppercase tracking-wide text-brand-navy/80">
                  {satwa.habitat}
                </p>
                <p className="mt-3 font-sans text-sm md:text-base leading-relaxed text-black/70 flex-1">
                  {satwa.deskripsi}
                </p>
              </div>
            </article>
          ))}
        </div>

        {/* Quote penghubung manusia–satwa (Ain Ni Ain) */}
        <blockquote className="satwa-fade mt-12 md:mt-16 font-serif text-lg md:text-2xl leading-relaxed text-black/80 border-l-2 border-brand pl-5 md:pl-6 max-w-4xl">
          &ldquo;Melalui sasi laut, kita menjaga habitat bersama — karena manusia
          dan satwa di Kei adalah saudara dalam satu napas. Menjaga mereka
          berarti menjaga rumah kita sendiri.&rdquo;
        </blockquote>

        {/* CTA penutup section */}
        <div className="satwa-fade mt-12 md:mt-16 flex flex-wrap items-center gap-4 md:gap-6">
          <a
            href="/budaya"
            onMouseMove={onMouseMove}
            onMouseLeave={onMouseLeave}
            className="btn-spotlight btn-cta inline-flex items-center gap-2 font-sans text-sm md:text-base font-medium focus-ring rounded-full px-6 py-3"
            aria-label="Kenali budaya adat Kepulauan Kei"
          >
            Kenali Budaya Adat
            <ArrowRightIcon className="h-4 w-4 md:h-5 md:w-5 text-current" />
          </a>
        </div>
      </div>
    </section>
  );
}
