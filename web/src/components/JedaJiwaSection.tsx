"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useSpotlight } from "@/hooks/useSpotlight";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function JedaJiwaSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const { onMouseMove, onMouseLeave } = useSpotlight({
    radius: 260,
    from: "rgba(230,103,124,0.45)",
    mid: "rgba(111,194,190,0.30)",
    to: "rgba(11,31,42,0)",
  });

  useEffect(() => {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const ctx = gsap.context(() => {
      if (prefersReduced) {
        gsap.set(".jeda-jiwa-fade", { opacity: 1, y: 0 });
        return;
      }
      gsap.from(".jeda-jiwa-fade", {
        opacity: 0,
        y: 30,
        duration: 1.2,
        stagger: 0.25,
        ease: "power2.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 70%",
          toggleActions: "play none none reverse",
        },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      id="jeda-jiwa"
      ref={sectionRef}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      className="relative w-full min-h-screen snap-start snap-always flex items-center justify-center overflow-hidden bg-ocean-indigo z-[7]"
    >
      {/* Foto senja laut Kei — full bleed */}
      <Image
        src="/images/eksplorasi/kei_mosaic_1.png"
        alt="Senja di laut Kepulauan Kei — momen dunia berhenti sejenak"
        fill
        sizes="100vw"
        className="object-cover object-center brightness-110 contrast-105"
        priority
      />
      {/* Tint senja pink-biru (token §3.1) agar nuansa sunset Kei lebih terasa */}
      <div
        className="absolute inset-0 z-[3] pointer-events-none mix-blend-soft-light"
        style={{
          background:
            "linear-gradient(135deg, var(--color-ocean-indigo) 0%, rgba(27,58,107,0.2) 45%, var(--color-primary-pink) 100%)",
        }}
        aria-hidden="true"
      />
      {/* Overlay gelap agar teks putih kontras kuat (§19.1) — gradien senja pink-biru */}
      <div
        className="absolute inset-0 z-[5] pointer-events-none bg-gradient-to-t from-black/80 via-black/40 to-black/20"
        aria-hidden="true"
      />
      {/* Halo blur lembut di belakang teks (magnetik mengikuti kursor, konsisten dengan section lain) */}
      <div
        className="jeda-jiwa-fade absolute z-[9] left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] max-w-[820px] aspect-[2/1] pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at center, rgba(11,31,42,0.55) 0%, rgba(11,31,42,0.30) 45%, rgba(11,31,42,0) 75%)",
          filter: "blur(26px)",
        }}
        aria-hidden="true"
      />

      {/* Konten center */}
      <div className="jeda-jiwa-fade relative z-10 text-center px-8 max-w-2xl mx-auto">
        <p
          className="text-white/80 text-xs tracking-[0.4em] uppercase mb-6"
          style={{ fontFamily: "var(--font-sans)", textShadow: "0 2px 12px rgba(0,0,0,0.55)" }}
        >
          PEPATAH KEI
        </p>
        <blockquote
          className="text-white text-3xl md:text-5xl leading-relaxed mb-6"
          style={{ fontFamily: "var(--font-cursive)", textShadow: "0 2px 18px rgba(0,0,0,0.6)" }}
        >
          Umat I Minan Ne Harta I Bulir
        </blockquote>
        <p
          className="text-white text-base tracking-[0.15em]"
          style={{ fontFamily: "var(--font-sans)", textShadow: "0 2px 12px rgba(0,0,0,0.55)" }}
        >
          &ldquo;Manusia lebih berharga daripada harta&rdquo;
        </p>
        <p
          className="text-white/70 text-xs mt-2 tracking-[0.2em]"
          style={{ fontFamily: "var(--font-sans)", textShadow: "0 2px 10px rgba(0,0,0,0.5)" }}
        >
          — Pepatah Masyarakat Kepulauan Kei
        </p>
      </div>

      {/* Parallax transition ke section berikutnya (§4.3) */}
    </section>
  );
}
