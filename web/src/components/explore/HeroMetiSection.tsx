"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ChevronDownIcon } from "@heroicons/react/24/outline";
import { useSlideshow } from "@/hooks/useSlideshow";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

// Slideshow pantai Kei di balik video timelapse (autoplay 5s, cross-fade §7.3).
const HERO_PHOTOS: { src: string; alt: string }[] = [
  {
    src: "/images/meti/kei_ngurtavur.png",
    alt: "Lautan Kepulauan Kei yang surut membuka hamparan pasir saat Festival Pesona Meti Kei",
  },
  {
    src: "/images/meti/kei_ngurbloat.png",
    alt: "Pantai Ngurbloat — pasir terhalus di dunia dengan air toska jernih di Kepulauan Kei",
  },
  {
    src: "/images/meti/kei_beach.png",
    alt: "Gugusan Pantai Pasir Panjang saat surut di Kepulauan Kei",
  },
  {
    src: "/images/meti/kei_resort.png",
    alt: "Pulau Dullah dengan laut landai biru jernih di selat Tual–Kei Kecil",
  },
];

export default function HeroMetiSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isActive, setIsActive] = useState(false);
  const { index: photoIndex } = useSlideshow({
    count: HERO_PHOTOS.length,
    interval: 5000,
  });

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsActive(entry.isIntersecting);
        if (entry.isIntersecting) {
          videoRef.current?.play().catch(() => {});
        } else {
          videoRef.current?.pause();
        }
      },
      { threshold: 0.25 }
    );
    observer.observe(section);

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const ctx = gsap.context(() => {
      if (prefersReduced) {
        gsap.set(".meti-reveal", { opacity: 1, y: 0 });
        return;
      }

      gsap.set(".meti-reveal", { opacity: 0, y: 28 });
      gsap.to(".meti-reveal", {
        opacity: 1,
        y: 0,
        duration: 1.1,
        stagger: 0.18,
        ease: "power2.out",
        delay: 4,
      });

      gsap.to(".meti-parallax", {
        yPercent: 30,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="meti-hero"
      data-hero
      ref={sectionRef}
      aria-label="Festival Pesona Meti Kei"
      className="relative w-full min-h-screen snap-start snap-always flex items-center overflow-hidden bg-[#000] z-[8]"
    >
      <div className="absolute inset-0 z-0">
        {HERO_PHOTOS.map((photo, i) => (
          <Image
            key={photo.src}
            src={photo.src}
            alt={photo.alt}
            fill
            priority={i === 0}
            sizes="100vw"
            className={`object-cover brightness-90 transition-opacity duration-1000 ease-in-out ${
              i === photoIndex ? "opacity-100" : "opacity-0"
            }`}
          />
        ))}
        {isActive && (
          <video
            ref={videoRef}
            className="meti-parallax absolute inset-0 h-[130%] w-full object-cover brightness-90"
            poster="/images/meti/kei_ngurtavur.png"
            preload="none"
            muted
            loop
            playsInline
            aria-hidden="true"
          >
            <source src="/videos/eksplorasi/meti-timelapse.mp4" type="video/mp4" />
          </video>
        )}
      </div>

      <div
        aria-hidden="true"
        className="absolute inset-0 z-[1] bg-gradient-to-b from-black/85 via-black/45 to-black/30"
      />

      <div className="relative z-[2] max-w-[98%] xl:max-w-[1600px] mx-auto px-4 md:px-8 w-full">
        <p className="meti-reveal text-fluid-eyebrow uppercase tracking-[0.35em] text-white/60 font-sans">
          Festival Pesona Meti Kei
        </p>

        <h1 className="meti-reveal mt-5 font-serif text-fluid-h1 text-white">
          Ketika Samudera{" "}
          <span className="font-cursive text-brand">Berpamit</span>
        </h1>

        <p className="meti-reveal mt-6 max-w-2xl font-sans text-fluid-body text-white/85 leading-relaxed">
          Ketika laut mundur hingga berkilo-kilometer, ia membuka gerbang
          menuju keajaiban alam: pasir terhalus di dunia, laut jernih sebening
          kaca, dan gugusan pulau bagai permata. Selamat datang di surga
          tersembunyi Kepulauan Kei.
        </p>

        <a
          href="#wer-warat"
          className="meti-reveal group mt-12 inline-flex items-center gap-2 font-sans text-fluid-small uppercase tracking-widest text-white/70 transition-colors hover:text-brand focus-ring rounded-sm-design"
          aria-label="Selami lebih dalam"
        >
          <span>Selami lebih dalam</span>
          <ChevronDownIcon
            className="h-4 w-4 transition-transform duration-300 group-hover:translate-y-1"
            aria-hidden="true"
          />
        </a>
      </div>
    </section>
  );
}
