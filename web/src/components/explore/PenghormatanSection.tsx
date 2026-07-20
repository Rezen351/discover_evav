"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const EKA_BAGUS_IMAGES = [
  "/images/eksplorasi/spot-eka-bagus-kkn-ugm.png",
  "/images/eksplorasi/spot-eka-bagus-2-kkn-ugm.jpg",
  "/images/eksplorasi/spot-eka-bagus-3-kkn-ugm.jpg",
];

const EKA_BAGUS_ALT_ID = [
  "Eka Bagus Spot — bentangan alam asri Kepulauan Kei yang terjaga dan tenang",
  "Eka Bagus Spot — vegetasi hijau dan air jernih di Kei yang masih murni",
  "Eka Bagus Spot — ekosistem pantai Kei yang damai dan terlindungi",
];

const EKA_BAGUS_ALT_EN = [
  "Eka Bagus Spot — the serene, well-preserved natural expanse of the Kei Islands",
  "Eka Bagus Spot — green vegetation and clear waters in pristine Kei",
  "Eka Bagus Spot — the peaceful, protected coastal ecosystem of Kei",
];

export default function PenghormatanSection({ lang }: { lang: "id" | "en" }) {
  const EKA_BAGUS_ALT = lang === "en" ? EKA_BAGUS_ALT_EN : EKA_BAGUS_ALT_ID;
  const ref = useRef<HTMLElement>(null);
  const [order, setOrder] = useState([0, 1, 2]);

  useEffect(() => {
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReduced) return;

    const interval = window.setInterval(() => {
      setOrder((prev) => [prev[1], prev[2], prev[0]]);
    }, 4500);

    return () => window.clearInterval(interval);
  }, []);

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
      {/* Mobile: satu foto penuh sebagai background */}
      <div className="absolute inset-0 md:hidden">
        {EKA_BAGUS_IMAGES.map((src, i) => {
          const isActive = order[0] === i;
          return (
            <Image
              key={src}
              src={src}
              alt={EKA_BAGUS_ALT[i]}
              fill
              sizes="100vw"
              className={`object-cover brightness-110 contrast-105 transition-opacity duration-1000 ease-in-out ${
                isActive ? "opacity-100" : "opacity-0"
              }`}
              priority={false}
            />
          );
        })}
      </div>

      {/* Desktop: dua foto Eka Bagus berjejer memenuhi section; satu foto
          mengantri dan bergantian masuk via transisi crossfade otomatis. */}
      <div className="absolute inset-0 hidden md:flex">
        {[0, 1].map((slot) => (
          <div key={slot} className="relative h-full w-1/2 overflow-hidden">
            {EKA_BAGUS_IMAGES.map((src, i) => {
              const isActive = order[slot] === i;
              return (
                <Image
                  key={src}
                  src={src}
                  alt={EKA_BAGUS_ALT[i]}
                  fill
                  sizes="50vw"
                  className={`object-cover brightness-110 contrast-105 transition-opacity duration-1000 ease-in-out ${
                    isActive ? "opacity-100" : "opacity-0"
                  }`}
                  priority={false}
                />
              );
            })}
          </div>
        ))}
      </div>

      <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/65 to-black/70" />

      <div className="relative z-[1] max-w-[98%] xl:max-w-[1600px] mx-auto px-4 md:px-8 w-full flex justify-center">
        <div className="max-w-3xl text-center py-16 sm:py-24 md:py-32">
          <p className="penghormatan-fade font-sans text-sm md:text-base uppercase tracking-[0.35em] text-white/60 mb-6">
            {lang === "en" ? "Protecting Nature's Beauty" : "Menjaga Keindahan Alam"}
          </p>

            <h2
              id="penghormatan-title"
              className="penghormatan-fade font-serif text-fluid-h2 md:text-5xl leading-tight text-white mb-10 break-words"
            >
            {lang === "en" ? (
              <>
                Two Souls{" "}
                <span className="text-brand">Returning to Nature</span>
              </>
            ) : (
              <>
                Dua Jiwa yang{" "}
                <span className="text-brand">Pulang ke Alam</span>
              </>
            )}
          </h2>

          <p className="penghormatan-fade font-sans text-base md:text-lg leading-relaxed text-white/80 mb-8">
            {lang === "en"
              ? "Eka Bagus Spot holds the still-lush natural expanse of the Kei Islands—green vegetation, clear waters, and the calm of a protected ecosystem. Here is where Kei's beauty is most whole: a place where pelicans find shelter, leatherback turtles lay their eggs, and coral reefs breathe undisturbed."
              : "Eka Bagus Spot menyimpan bentangan alam Kepulauan Kei yang masih asri — hijaunya vegetasi, jernihnya air, dan ketenangan ekosistem yang terjaga. Di sinilah keindahan alam Kei paling utuh: tempat burung pelikan berteduh, penyu belimbing bertelur, dan terumbu karang bernapas tanpa gangguan."}
          </p>

          <p className="penghormatan-fade font-sans text-base md:text-lg italic leading-relaxed text-white/80">
            {lang === "en"
              ? "Behind this beauty lies a story of love and devotion. Eka Bagus Spot is a dedication to two young UGM souls who gave their final strength to the Land of Evav. This place has become an eternal reminder of their service, where the village people now remember them not as guests, but as family who have returned to the embrace of nature."
              : "Di balik keindahan ini, tersimpan cerita tentang cinta dan pengabdian. Eka Bagus Spot adalah dedikasi bagi dua jiwa muda UGM yang mendedikasikan tenaga terakhirnya untuk Tanah Evav. Tempat ini menjadi pengingat abadi akan jasa mereka, di mana masyarakat desa kini mengenang mereka bukan lagi sebagai tamu, melainkan sebagai keluarga yang pulang ke pangkuan alam."}
          </p>
        </div>
      </div>
    </section>
  );
}
