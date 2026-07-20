"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ChevronDownIcon } from "@heroicons/react/24/outline";
import { getDictionary } from "@/content/dictionaries";
type Dict = Awaited<ReturnType<typeof getDictionary>>;

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function HeroTasteSection({
  lang,
  data,
}: {
  lang: "id" | "en";
  data: Dict["heroTaste"];
}) {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const ctx = gsap.context(() => {
      if (prefersReduced) {
        gsap.set(".taste-hero-reveal", { opacity: 1, y: 0 });
        return;
      }
      gsap.set(".taste-hero-reveal", { opacity: 0, y: 30 });
      gsap.to(".taste-hero-reveal", {
        opacity: 1,
        y: 0,
        duration: 1.1,
        stagger: 0.16,
        ease: "power2.out",
        delay: 0.2,
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="taste-hero"
      data-hero
      ref={sectionRef}
      aria-label={
        lang === "en"
          ? "Cuisine & Flavors of the Kei Islands"
          : "Kuliner & Cita Rasa Kepulauan Kei"
      }
      className="relative w-full min-h-screen snap-start snap-always flex items-center overflow-hidden bg-hero-dark z-[7]"
    >
      {/* Background image — suasana kuliner Kei (art direction §18) */}
      <div className="absolute inset-0 z-0">
        <Image
          src={data.image}
          alt={data.imageAlt}
          fill
          priority
          sizes="100vw"
          className="object-cover object-center brightness-105"
        />
      </div>

      {/* Vignette — kontras teks putih (§18 / §5.6) */}
      <div
        aria-hidden="true"
        className="absolute inset-0 z-[1] bg-gradient-to-r from-black/90 via-black/55 to-black/25"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 z-[1] bg-gradient-to-t from-black/70 via-transparent to-black/30"
      />

      <div className="relative z-[2] max-w-[98%] xl:max-w-[1600px] mx-auto px-4 md:px-8 w-full py-24 md:py-28">
        <div className="grid grid-cols-1 gap-12 md:gap-14 lg:grid-cols-12 lg:gap-16 items-center">
          {/* Split kiri — narasi utama */}
          <div className="lg:col-span-7">
            <p className="taste-hero-reveal font-sans text-fluid-eyebrow uppercase tracking-[0.2em] sm:tracking-[0.3em] text-brand break-words">
              {data.eyebrow}
            </p>

            <h1 className="taste-hero-reveal mt-4 sm:mt-5 font-serif text-fluid-h1 text-white break-words">
              {data.title}{" "}
              <span className="text-brand">{data.titleAccent}</span>
            </h1>

            <p className="taste-hero-reveal mt-5 sm:mt-6 max-w-2xl font-sans text-fluid-body text-white/85 leading-relaxed">
              {data.subtitle}
            </p>

            <a
              href="#signature-dishes"
              className="taste-hero-reveal group mt-8 sm:mt-12 inline-flex min-h-[44px] items-center gap-2 font-sans text-fluid-small uppercase tracking-widest text-white/70 transition-colors hover:text-brand focus-ring rounded-sm-design"
              aria-label={data.scrollHint}
            >
              <span>{data.scrollHint}</span>
              <ChevronDownIcon
                className="h-4 w-4 transition-transform duration-300 group-hover:translate-y-1"
                aria-hidden="true"
              />
            </a>
          </div>

          {/* Split kanan — quote overlay (glass-dark diperbolehkan di hero, §2/§5.6).
              Disembunyikan di mobile agar hero hanya menampilkan headline (§8 Mobile). */}
          <div className="taste-hero-reveal hidden lg:block lg:col-span-5">
            <figure className="glass-dark rounded-xl-design p-5 sm:p-6 md:p-8">
              <blockquote className="font-serif text-fluid-h4 leading-[1.4] text-white">
                &ldquo;{data.quote.text}&rdquo;
              </blockquote>
              <figcaption className="mt-5 font-sans text-fluid-small uppercase tracking-[0.2em] text-brand">
                {data.quote.attribution}
              </figcaption>
            </figure>
          </div>
        </div>
      </div>
    </section>
  );
}
