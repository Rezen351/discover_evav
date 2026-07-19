"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function PenghormatanSection() {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const ctx = gsap.context(() => {
      if (prefersReduced) {
        gsap.set(".penghormatan-fade", { opacity: 1, y: 0 });
        return;
      }
      gsap.from(".penghormatan-fade", {
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
      id="penghormatan"
      ref={ref}
      className="relative w-full min-h-screen snap-start snap-always flex items-center justify-center overflow-hidden bg-tropical-dark z-[3]"
      aria-labelledby="penghormatan-title"
    >
      <Image
        src="/images/eksplorasi/pasir_panjang.png"
        alt="Eka Bagus Spot — bentangan alam asri Kepulauan Kei yang terjaga dan tenang"
        fill
        className="object-cover brightness-110 contrast-105"
        priority={false}
      />

      <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/65 to-black/70" />

      <div className="relative z-[1] max-w-[98%] xl:max-w-[1600px] mx-auto px-4 md:px-8 w-full flex justify-center">
        <div className="max-w-3xl text-center py-24 md:py-32">
          <p className="penghormatan-fade font-sans text-sm md:text-base uppercase tracking-[0.35em] text-white/60 mb-6">
            Menjaga Keindahan Alam
          </p>

            <h2
              id="penghormatan-title"
              className="penghormatan-fade font-serif text-fluid-h2 md:text-5xl leading-tight text-white mb-10 break-words"
            >
            Dua Jiwa yang{" "}
            <span className="text-brand">Pulang ke Alam</span>
          </h2>

          <p className="penghormatan-fade font-sans text-base md:text-lg leading-relaxed text-white/80 mb-8">
            Eka Bagus Spot menyimpan bentangan alam Kepulauan Kei yang masih
            asri — hijaunya vegetasi, jernihnya air, dan ketenangan ekosistem
            yang terjaga. Di sinilah keindahan alam Kei paling utuh: tempat
            burung pelikan berteduh, penyu belimbing bertelur, dan terumbu
            karang bernapas tanpa gangguan.
          </p>

          <p className="penghormatan-fade font-sans text-base md:text-lg italic leading-relaxed text-white/80">
            Di balik keindahan ini, tersimpan cerita tentang cinta dan
            pengabdian. Eka Bagus Spot adalah dedikasi bagi dua jiwa muda UGM
            yang mendedikasikan tenaga terakhirnya untuk Tanah Evav. Tempat ini
            menjadi pengingat abadi akan jasa mereka, di mana masyarakat desa
            kini mengenang mereka bukan lagi sebagai tamu, melainkan sebagai
            keluarga yang pulang ke pangkuan alam.
          </p>
        </div>
      </div>
    </section>
  );
}
