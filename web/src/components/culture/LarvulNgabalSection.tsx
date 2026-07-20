"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollText } from "lucide-react";
import { larvulNgabal } from "@/content/culture";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function LarvulNgabalSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const ctx = gsap.context(() => {
      if (prefersReduced) {
        gsap.set(".larvul-reveal", { opacity: 1, y: 0 });
        return;
      }
      gsap.utils.toArray<HTMLElement>(".larvul-reveal").forEach((el) => {
        gsap.from(el, {
          opacity: 0,
          y: 40,
          duration: 0.8,
          ease: "power2.out",
          scrollTrigger: {
            trigger: el,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="larvul-ngabal"
      ref={sectionRef}
      aria-labelledby="larvul-title"
      className="relative w-full snap-start snap-always bg-section z-[6] py-20 md:py-28"
    >
      <div className="max-w-[98%] xl:max-w-[1600px] mx-auto px-4 md:px-8 w-full">
        {/* Narrative split */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 xl:gap-16 items-center">
          {/* Kiri — teks */}
          <div>
            <p className="larvul-reveal font-sans text-fluid-eyebrow uppercase tracking-[0.2em] sm:tracking-[0.3em] text-balance text-brand mb-4">
              {larvulNgabal.eyebrow}
            </p>
            <h2
              id="larvul-title"
              className="larvul-reveal font-serif text-fluid-h2 text-black mb-4"
            >
              {larvulNgabal.title}
            </h2>
            {/* Tagline — SERIF, bukan cursive (§2.4 / §3.2) */}
            <p className="larvul-reveal font-serif text-fluid-h4 text-brand mb-6">
              {larvulNgabal.tagline}
            </p>
            <p className="larvul-reveal font-sans text-fluid-body text-black/70 leading-relaxed text-left">
              {larvulNgabal.intro}
            </p>

            {/* Etimologi callout — surface solid (§3.2) */}
            <div className="larvul-reveal mt-8 flex gap-4 bg-brand/10 border border-brand/30 rounded-lg-design p-5">
              <span
                className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-brand/20 text-brand"
                aria-hidden="true"
              >
                <ScrollText className="h-5 w-5" />
              </span>
              <p className="font-sans text-fluid-small text-black/70 leading-relaxed">
                {larvulNgabal.etymology.text}
              </p>
            </div>
          </div>

          {/* Kanan — gambar tombak */}
          <div className="larvul-reveal relative w-full h-[320px] md:h-[460px] rounded-xl-design overflow-hidden shadow-card group">
            <Image
              src={larvulNgabal.image}
              alt={larvulNgabal.imageAlt}
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover object-center transition-transform duration-700 group-hover:scale-105"
            />
            <div
              aria-hidden="true"
              className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent"
            />
          </div>
        </div>

        {/* 3 Pillars */}
        <div className="mt-16 md:mt-20">
          <h3 className="larvul-reveal font-serif text-fluid-h3 text-black mb-8">
            Tiga Rumpun Nilai
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 xl:gap-8">
            {larvulNgabal.pillars.map((pillar) => (
              <div
                key={pillar.id}
                className="larvul-reveal bg-white border border-brand/10 rounded-lg-design p-6 md:p-7 shadow-soft hover:border-brand/30 transition-colors"
              >
                <h4 className="font-serif text-fluid-h4 text-black">
                  {pillar.title}
                </h4>
                <p className="mt-1 font-sans text-fluid-small text-brand">
                  {pillar.meaning}
                </p>
                <p className="mt-4 font-sans text-fluid-body text-black/65 leading-relaxed">
                  {pillar.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* 7 Pasal Sakral */}
        <div className="mt-16 md:mt-20">
          <h3 className="larvul-reveal font-serif text-fluid-h3 text-black mb-2">
            Tujuh Pasal Sakral
          </h3>
          <p className="larvul-reveal font-sans text-fluid-body text-black/65 leading-relaxed max-w-3xl mb-8">
            Larvul Ngabal terdiri dari tujuh pasal yang diwariskan lisan. Empat
            pasal pertama dari hukum Larvul (Nevnev), tiga pasal sisanya dari
            hukum Ngabal (Hanilit & Hawear Balwirin) — bersatu dalam satu janji
            leluhur.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 xl:gap-8">
            {larvulNgabal.pasalList.map((pasal) => (
              <div
                key={pasal.nomor}
                className="larvul-reveal bg-white border border-brand/10 rounded-lg-design p-6 shadow-soft hover:border-brand/30 transition-colors"
              >
                <div className="flex items-center gap-3 mb-4">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-brand/15 text-brand font-serif text-fluid-h4">
                    {pasal.nomor}
                  </span>
                  <span className="font-sans text-fluid-small uppercase tracking-[0.15em] text-brand">
                    {pasal.kelompok}
                  </span>
                </div>
                <h4 className="font-serif text-fluid-h4 text-black">
                  {pasal.istilahKei}
                </h4>
                <p className="mt-1 font-sans text-fluid-small text-black/55">
                  {pasal.artiKei}
                </p>
                <p className="mt-3 font-sans text-fluid-body text-black/80 leading-relaxed">
                  {pasal.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Peran historis */}
        <div className="larvul-reveal mt-12 md:mt-16 bg-white border border-brand/10 rounded-xl-design shadow-soft p-6 md:p-10">
          <p className="font-sans text-fluid-eyebrow uppercase tracking-[0.2em] text-brand mb-3">
            Peran Historis
          </p>
          <p className="font-sans text-fluid-body text-black/70 leading-relaxed max-w-4xl">
            {larvulNgabal.historicalNote}
          </p>
        </div>
      </div>
    </section>
  );
}
