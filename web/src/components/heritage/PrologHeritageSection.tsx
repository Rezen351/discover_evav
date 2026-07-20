"use client";

import { useEffect, useRef } from "react";
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

export default function PrologHeritageSection({ lang }: { lang: "id" | "en" }) {
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
      className="relative w-full min-h-screen md:snap-start md:snap-always flex items-center bg-section z-[6] overflow-hidden"
    >
      <div className="relative z-[1] max-w-[98%] xl:max-w-[1600px] mx-auto px-4 md:px-8 w-full py-24 md:py-32">
        <p           className="heritage-prolog-reveal text-fluid-eyebrow uppercase tracking-[0.18em] min-[400px]:tracking-[0.25em] sm:tracking-[0.3em] text-brand font-sans">
          {lang === "en" ? "Why This Heritage Lives" : "Mengapa Warisan Ini Hidup"}
        </p>

        <h2
          id="heritage-prolog-title"
          className="heritage-prolog-reveal mt-4 font-serif text-fluid-h2 leading-[1.12] text-black"
        >
          {lang === "en" ? (
            <>
              Two Traces, <span className="text-brand">One Evav Soul</span>
            </>
          ) : (
            <>
              Dua Jejak, <span className="text-brand">Satu Jiwa Evav</span>
            </>
          )}
        </h2>

        <p className="heritage-prolog-reveal mt-6 max-w-3xl font-sans text-fluid-body text-black/60 leading-relaxed">
          {lang === "en"
            ? "In Kei, history is not kept in a drawer. It walks on the sand, speaks through the gong, and guards the coastline. Let us meet the two pillars that keep Evav standing — one from the State, one from Adat — both belonging to us."
            : "Di Kei, sejarah tidak disimpan di laci. Ia berjalan di pasir, berbicara dalam gong, dan menjaga garis pantai. Mari mengenal dua pilar yang membuat Evav tetap berdiri — satu dari Negara, satu dari Adat — sama-sama milik kita."}
        </p>

        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-6 xl:gap-10">
          <a
            href="#karel"
            onMouseMove={onMouseMove}
            onMouseLeave={onMouseLeave}
            aria-label={lang === "en" ? "Explore the Patriot's Trail of Karel Sadsuitubun" : "Telusuri Jejak Patriot Karel Sadsuitubun"}
            className="heritage-prolog-reveal group block bg-white border border-brand/10 rounded-lg-design shadow-soft hover:border-brand/30 transition-colors focus-ring p-8 md:p-10"
          >
            <div className="flex items-center gap-4">
              <span className="flex h-12 w-12 items-center justify-center rounded-full bg-brand/10 text-brand">
                <ShieldCheckIcon className="h-6 w-6" aria-hidden="true" />
              </span>
              <h3 className="font-serif text-fluid-h3 text-black">
                {lang === "en" ? "The Patriot's Trail" : "Jejak Patriot"}
              </h3>
            </div>
            <p className="mt-5 font-sans text-fluid-body text-black/60 leading-relaxed">
              {lang === "en"
                ? "Karel Sadsuitubun, son of Rumadian who guarded the red-and-white."
                : "Karel Sadsuitubun, putra Rumadian yang menjaga merah-putih."}
            </p>
            <span className="mt-6 inline-flex items-center gap-2 font-sans text-sm font-semibold uppercase tracking-widest text-brand transition-transform group-hover:translate-x-1">
              {lang === "en" ? "Explore the Trail" : "Telusuri Jejak"}
              <ChevronRightIcon className="h-4 w-4" aria-hidden="true" />
            </span>
          </a>

          <a
            href="#ratskap"
            onMouseMove={onMouseMove}
            onMouseLeave={onMouseLeave}
            aria-label={lang === "en" ? "Explore the Sovereignty Trail of Ratskap Manyeuw Rumadian" : "Telusuri Jejak Kedaulatan Ratskap Manyeuw Rumadian"}
            className="heritage-prolog-reveal group block bg-white border border-brand/10 rounded-lg-design shadow-soft hover:border-brand/30 transition-colors focus-ring p-8 md:p-10"
          >
            <div className="flex items-center gap-4">
              <span className="flex h-12 w-12 items-center justify-center rounded-full bg-brand/10 text-brand">
                <ScaleIcon className="h-6 w-6" aria-hidden="true" />
              </span>
              <h3 className="font-serif text-fluid-h3 text-black">
                {lang === "en" ? "The Sovereignty Trail" : "Jejak Kedaulatan"}
              </h3>
            </div>
            <p className="mt-5 font-sans text-fluid-body text-black/60 leading-relaxed">
              {lang === "en"
                ? "Ratskap Manyeuw Rumadian, pillar of the Larvul Ngabal customary law."
                : "Ratskap Manyeuw Rumadian, pilar hukum adat Larvul Ngabal."}
            </p>
            <span className="mt-6 inline-flex items-center gap-2 font-sans text-sm font-semibold uppercase tracking-widest text-brand transition-transform group-hover:translate-x-1">
              {lang === "en" ? "Explore the Trail" : "Telusuri Jejak"}
              <ChevronRightIcon className="h-4 w-4" aria-hidden="true" />
            </span>
          </a>
        </div>


      </div>
    </section>
  );
}
