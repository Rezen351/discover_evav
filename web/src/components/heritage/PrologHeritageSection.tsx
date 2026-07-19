"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  ShieldCheckIcon,
  ScaleIcon,
  ChevronRightIcon,
} from "@heroicons/react/24/outline";
import { useSpotlight } from "@/hooks/useSpotlight";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function PrologHeritageSection() {
  const ref = useRef<HTMLElement>(null);
  const { onMouseMove, onMouseLeave } = useSpotlight();

  useEffect(() => {
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const ctx = gsap.context(() => {
      if (prefersReduced) {
        gsap.set(".heritage-prolog-reveal", { opacity: 1, y: 0 });
        return;
      }
      gsap.from(".heritage-prolog-reveal", {
        opacity: 0,
        y: 30,
        duration: 1.1,
        stagger: 0.15,
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
      id="heritage-prolog"
      ref={ref}
      aria-labelledby="heritage-prolog-title"
      className="relative w-full min-h-screen snap-start snap-always flex items-center bg-section z-[6] overflow-hidden"
    >
      <div className="relative z-[1] max-w-[98%] xl:max-w-[1600px] mx-auto px-4 md:px-8 w-full py-24 md:py-32">
        <p className="heritage-prolog-reveal text-fluid-eyebrow uppercase tracking-[0.3em] text-brand font-sans">
          Mengapa Warisan Ini Hidup
        </p>

        <h2
          id="heritage-prolog-title"
          className="heritage-prolog-reveal mt-4 font-serif text-fluid-h2 leading-[1.12] text-black"
        >
          Dua Jejak, <span className="text-brand">Satu Jiwa Evav</span>
        </h2>

        <p className="heritage-prolog-reveal mt-6 max-w-3xl font-sans text-fluid-body text-black/60 leading-relaxed">
          Di Kei, sejarah tidak disimpan di laci. Ia berjalan di pasir,
          berbicara dalam gong, dan menjaga garis pantai. Mari mengenal dua
          pilar yang membuat Evav tetap berdiri — satu dari Negara, satu dari
          Adat — sama-sama milik kita.
        </p>

        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-6 xl:gap-10">
          <a
            href="#karel"
            onMouseMove={onMouseMove}
            onMouseLeave={onMouseLeave}
            aria-label="Telusuri Jejak Patriot Karel Sadsuitubun"
            className="heritage-prolog-reveal group block bg-white border border-brand/10 rounded-lg-design shadow-soft hover:border-brand/30 transition-colors focus-ring p-8 md:p-10"
          >
            <div className="flex items-center gap-4">
              <span className="flex h-12 w-12 items-center justify-center rounded-full bg-brand/10 text-brand">
                <ShieldCheckIcon className="h-6 w-6" aria-hidden="true" />
              </span>
              <h3 className="font-serif text-fluid-h3 text-black">
                Jejak Patriot
              </h3>
            </div>
            <p className="mt-5 font-sans text-fluid-body text-black/60 leading-relaxed">
              Karel Sadsuitubun, putra Rumadian yang menjaga merah-putih.
            </p>
            <span className="mt-6 inline-flex items-center gap-2 font-sans text-sm font-semibold uppercase tracking-widest text-brand transition-transform group-hover:translate-x-1">
              Telusuri Jejak
              <ChevronRightIcon className="h-4 w-4" aria-hidden="true" />
            </span>
          </a>

          <a
            href="#ratskap"
            onMouseMove={onMouseMove}
            onMouseLeave={onMouseLeave}
            aria-label="Telusuri Jejak Kedaulatan Ratskap Manyeuw Rumadian"
            className="heritage-prolog-reveal group block bg-white border border-brand/10 rounded-lg-design shadow-soft hover:border-brand/30 transition-colors focus-ring p-8 md:p-10"
          >
            <div className="flex items-center gap-4">
              <span className="flex h-12 w-12 items-center justify-center rounded-full bg-brand/10 text-brand">
                <ScaleIcon className="h-6 w-6" aria-hidden="true" />
              </span>
              <h3 className="font-serif text-fluid-h3 text-black">
                Jejak Kedaulatan
              </h3>
            </div>
            <p className="mt-5 font-sans text-fluid-body text-black/60 leading-relaxed">
              Ratskap Manyeuw Rumadian, pilar hukum adat Larvul Ngabal.
            </p>
            <span className="mt-6 inline-flex items-center gap-2 font-sans text-sm font-semibold uppercase tracking-widest text-brand transition-transform group-hover:translate-x-1">
              Telusuri Jejak
              <ChevronRightIcon className="h-4 w-4" aria-hidden="true" />
            </span>
          </a>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-6">
          <figure className="heritage-prolog-reveal relative aspect-[16/9] w-full overflow-hidden rounded-xl-design shadow-card">
            <Image
              src="/images/sejarah/arsip_monumen.png"
              alt="Arsip monumen sejarah Evav — jejak dokumentasi perjuangan dan pengabdian"
              fill
              sizes="(max-width: 640px) 100vw, 50vw"
              className="object-cover object-center"
            />
            <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent p-4">
              <span className="font-sans text-sm font-medium text-white">
                Arsip Monumen Sejarah Evav
              </span>
            </figcaption>
          </figure>
          <figure className="heritage-prolog-reveal relative aspect-[16/9] w-full overflow-hidden rounded-xl-design shadow-card">
            <Image
              src="/images/sejarah/arsip_koperasi.png"
              alt="Arsip koperasi Kei — jejak ekonomi gotong-royong warga Evav"
              fill
              sizes="(max-width: 640px) 100vw, 50vw"
              className="object-cover object-center"
            />
            <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent p-4">
              <span className="font-sans text-sm font-medium text-white">
                Arsip Koperasi Kei
              </span>
            </figcaption>
          </figure>
        </div>
      </div>
    </section>
  );
}
