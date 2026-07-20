"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function PenghormatanHeritageSection() {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const ctx = gsap.context(() => {
      if (prefersReduced) {
        gsap.set(".penghormatan-heritage-fade", { opacity: 1, y: 0 });
        return;
      }
      gsap.from(".penghormatan-heritage-fade", {
        opacity: 0,
        y: 28,
        duration: 1.2,
        stagger: 0.18,
        ease: "power2.out",
        scrollTrigger: {
          trigger: ref.current,
          start: "top 75%",
          toggleActions: "play none none reverse",
        },
      });
    }, ref);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="heritage-penghormatan"
      ref={ref}
      className="relative w-full min-h-screen md:snap-start md:snap-always flex items-center justify-center overflow-hidden bg-tropical-dark z-[3]"
      aria-labelledby="heritage-penghormatan-title"
    >
      <Image
        src="/images/heritage/raja-kei.png"
        alt="Bentangan warisan hidup Kepulauan Kei — persilangan alam asri dan jejak leluhur yang masih terjaga"
        fill
        className="object-cover object-center scale-105 brightness-110 contrast-105"
        priority={false}
      />

      <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/40" />

      <div className="relative z-[1] max-w-[98%] xl:max-w-[1600px] mx-auto px-4 md:px-8 w-full flex justify-center">
        <div className="max-w-3xl text-center py-24 md:py-32">
          <p             className="penghormatan-heritage-fade font-sans text-fluid-small uppercase tracking-[0.18em] min-[400px]:tracking-[0.25em] sm:tracking-[0.35em] text-white/60 mb-6">
            Penghormatan
          </p>

          <h2
            id="heritage-penghormatan-title"
            className="penghormatan-heritage-fade font-serif text-fluid-h2 leading-tight text-white mb-10"
          >
            Dua Warisan yang{" "}
            <span className="text-brand">Masih Berdetak</span>
          </h2>

          <p className="penghormatan-heritage-fade font-sans text-fluid-body leading-relaxed text-white/80">
            Menelusuri sejarah Ratskap Manyeuw Rumadian adalah memahami detak
            jantung budaya masyarakat Kei. Bersama pengabdian Karel
            Sadsuitubun yang menjaga merah-putih, keduanya mengingatkan: warisan
            Evav bukan cerita selesai — ia masih hidup, masih berdetak, masih
            menunggu kita rawat.
          </p>
        </div>
      </div>
    </section>
  );
}
