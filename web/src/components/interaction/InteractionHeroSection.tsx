"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { ChevronDownIcon } from "@heroicons/react/24/outline";
import gsap from "gsap";

export default function InteractionHeroSection({ lang }: { lang: "id" | "en" }) {
  const sectionRef = useRef<HTMLElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const ctx = gsap.context(() => {
      if (prefersReduced) {
        gsap.set([textRef.current, imageRef.current], { opacity: 1, y: 0, x: 0 });
        return;
      }
      gsap.from(textRef.current, {
        y: 40,
        opacity: 0,
        duration: 0.9,
        ease: "power3.out",
        delay: 0.15,
      });
      gsap.from(imageRef.current, {
        scale: 1.08,
        opacity: 0,
        duration: 1.1,
        ease: "power2.out",
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      id="interaction-hero"
      data-hero
      className="relative w-full min-h-screen snap-start snap-always flex items-center overflow-hidden bg-hero-dark z-[5]"
      ref={sectionRef}
    >
      {/* Background image (portrait-friendly) */}
      <div ref={imageRef} className="absolute inset-0 z-[1]">
        <Image
          src="/images/budaya/tari-sawat-infopublik.jpg"
          alt={lang === "en" ? "The Sawat dance of the Kei Islands — a welcoming dance that weaves Evav kinship" : "Tari Sawat Kepulauan Kei — tarian penyambut tamu yang merajut kekerabatan Evav"}
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
      </div>

      {/* Vignette overlay */}
      <div className="absolute inset-0 z-[2] pointer-events-none bg-gradient-to-t from-[var(--color-tropical-dark)] via-black/40 to-black/50" />
      <div className="absolute inset-0 z-[2] pointer-events-none bg-gradient-to-r from-black/60 via-transparent to-black/20" />

      {/* Secondary circular culture image (portrait accent) */}
      <div className="absolute right-6 top-24 md:right-16 md:top-28 z-[3] w-24 h-24 md:w-36 md:h-36 rounded-full overflow-hidden border border-white/40 shadow-soft hidden sm:block">
        <Image
          src="/images/budaya/kei_batik.png"
          alt={lang === "en" ? "Traditional Kei dance" : "Tarian adat Kei"}
          fill
          sizes="(max-width: 768px) 96px, 144px"
          className="object-cover"
        />
      </div>

      {/* Content */}
      <div
        ref={textRef}
        className="relative z-[4] w-full max-w-[98%] xl:max-w-[1600px] mx-auto px-4 md:px-8 flex flex-col items-start justify-center max-[400px]:leading-tight max-[400px]:px-2"
      >
        <span
          className="text-brand font-bold tracking-[0.25em] uppercase text-xs md:text-sm mb-4 inline-block"
          style={{ fontFamily: "var(--font-sans)" }}
        >
           KETERHUBUNGAN
        </span>
        <h1
          className="text-fluid-h1 font-normal leading-[1.1] text-white drop-shadow-lg mb-2"
          style={{ fontFamily: "var(--font-serif)" }}
        >
          {lang === "en" ? "Reach Out" : "Mari Terhubung"}
        </h1>
        <p
          className="text-fluid-h3 font-normal text-brand drop-shadow-md mb-6"
          style={{ fontFamily: "var(--font-serif)" }}
        >
          {lang === "en" ? "to the Evav Family" : "dengan Keluarga Evav"}
        </p>
        <p
          className="text-base md:text-lg font-light max-w-xl leading-relaxed text-white/85 drop-shadow"
          style={{ fontFamily: "var(--font-sans)" }}
        >
          {lang === "en"
            ? "Got a question, a collaboration idea, or just want to say hello? Share your travel dream, send a suggestion, or invite us to collaborate — we will greet you back like welcoming a sibling."
            : "Punya pertanyaan, ide kolaborasi, atau sekadar ingin menyapa? Tuliskan impian perjalananmu, kirimkan saran, atau ajak kami berkolaborasi — kami akan menyapamu kembali seperti menyambut saudara."}
        </p>
      </div>

      {/* Scroll hint */}
      <div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-[4] flex flex-col items-center gap-2 cursor-pointer"
        onClick={() => document.getElementById("keterhubungan-intro")?.scrollIntoView({ behavior: "smooth" })}
        aria-label={lang === "en" ? "Scroll down" : "Gulir ke bawah"}
      >
        <span className="text-white/70 text-[10px] md:text-xs font-light tracking-[0.25em] uppercase" style={{ fontFamily: "var(--font-sans)" }}>
           {lang === "en" ? "Reach Out" : "Mari Terhubung"}
         </span>
        <ChevronDownIcon className="w-5 h-5 text-white/70 animate-bounce" />
      </div>
    </section>
  );
}
