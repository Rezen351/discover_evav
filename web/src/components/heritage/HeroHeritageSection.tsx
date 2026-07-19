"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ChevronDownIcon } from "@heroicons/react/24/outline";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function HeroHeritageSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const ctx = gsap.context(() => {
      if (prefersReduced) {
        gsap.set(".heritage-hero-reveal", { opacity: 1, y: 0 });
        return;
      }

      gsap.set(".heritage-hero-reveal", { opacity: 0, y: 30 });
      gsap.to(".heritage-hero-reveal", {
        opacity: 1,
        y: 0,
        duration: 1.1,
        stagger: 0.18,
        ease: "power2.out",
        delay: 0.2,
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="heritage-hero"
      data-hero
      ref={sectionRef}
      aria-label="Warisan Kepulauan Kei"
      className="relative w-full min-h-screen snap-start snap-always flex items-center overflow-hidden bg-hero-dark z-[5]"
    >
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/heritage/kei_warriors_dance.png"
          alt="Tarian perang prajurit adat Kepulauan Kei yang melestarikan semangat leluhur Evav"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
      </div>

      <div
        aria-hidden="true"
        className="absolute inset-0 z-[1] bg-gradient-to-b from-black/85 via-black/45 to-black/30"
      />

      <div className="relative z-[2] max-w-[98%] xl:max-w-[1600px] mx-auto px-4 md:px-8 w-full">
        <p className="heritage-hero-reveal text-fluid-eyebrow uppercase tracking-[0.35em] text-white/60 font-sans">
          Warisan Kepulauan Kei
        </p>

        <h1 className="heritage-hero-reveal mt-5 font-serif text-fluid-h1 text-white">
          Jejak yang{" "}
          <span className="font-cursive text-brand">Mengukir Evav</span>
        </h1>

        <p className="heritage-hero-reveal mt-6 max-w-2xl font-sans text-fluid-body text-white/85 leading-relaxed">
          Dua kisah besar dari Bumi Evav — pengabdian seorang putra Maluku
          Tenggara yang teguh menjaga kedaulatan Indonesia, dan kedaulatan adat
          Ratskap Manyeuw Rumadian yang menjaga tegaknya hukum leluhur.
        </p>

        <a
          href="#heritage-prolog"
          className="heritage-hero-reveal group mt-12 inline-flex items-center gap-2 font-sans text-fluid-small uppercase tracking-widest text-white/70 transition-colors hover:text-brand focus-ring rounded-sm-design"
          aria-label="Telusuri Warisan"
        >
          <span>Telusuri Warisan</span>
          <ChevronDownIcon
            className="h-4 w-4 transition-transform duration-300 group-hover:translate-y-1"
            aria-hidden="true"
          />
        </a>
      </div>
    </section>
  );
}
