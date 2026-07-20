"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowRightIcon } from "@heroicons/react/24/outline";
import { useSpotlight } from "@/hooks/useSpotlight";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function PenutupHeritageSection({ lang }: { lang: "id" | "en" }) {
  const ref = useRef<HTMLElement>(null);
  const spotlightPrimary = useSpotlight({
    radius: 250,
    from: "var(--color-accent-pink)",
    mid: "var(--color-accent-navy)",
    to: "var(--color-accent-navy)",
  });
  const spotlightSecondary = useSpotlight({
    radius: 250,
    from: "var(--color-accent-pink)",
    mid: "var(--color-accent-navy)",
    to: "var(--color-accent-navy)",
  });

  useEffect(() => {
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const ctx = gsap.context(() => {
      if (prefersReduced) {
        gsap.set(".penutup-heritage-fade", { opacity: 1, y: 0 });
        return;
      }
      gsap.from(".penutup-heritage-fade", {
        opacity: 0,
        y: 30,
        duration: 1.1,
        stagger: 0.18,
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
      id="heritage-penutup"
      ref={ref}
      aria-labelledby="heritage-penutup-title"
      className="relative w-full min-h-screen md:snap-start md:snap-always flex items-center bg-[#0C121D] z-[2] py-20 md:py-28"
    >
      <div className="max-w-[98%] xl:max-w-[1600px] mx-auto px-4 md:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          <div className="penutup-heritage-fade relative w-full aspect-[4/3] md:aspect-[16/10] rounded-xl-design overflow-hidden brightness-110 contrast-105">
            <Image
              src="/images/eksplorasi/kei_night_stars.png"
              alt={
                lang === "en"
                  ? "Starry night sky over the Kei Islands with silhouettes of trees and a boat in the distance"
                  : "Langit malam Kepulauan Kei yang berbintang dengan siluet pohon dan perahu di kejauhan"
              }
              fill
              className="object-cover object-center rounded-xl-design"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </div>

          <div className="flex flex-col gap-6">
            <p className="penutup-heritage-fade font-sans text-fluid-small uppercase tracking-[0.3em] text-white/60">
              {lang === "en" ? "A Word from the Evav Family" : "Sambutan Keluarga Evav"}
            </p>

            <h2
              id="heritage-penutup-title"
              className="penutup-heritage-fade font-serif text-fluid-h2 lg:text-6xl leading-tight text-white"
            >
              {lang === "en" ? (
                <>
                  This Heritage Is{" "}
                  <span className="text-brand">Ours to Share</span>
                </>
              ) : (
                <>
                  Warisan ini{" "}
                  <span className="text-brand">Milik Kita Bersama</span>
                </>
              )}
            </h2>

            <p className="penutup-heritage-fade font-sans text-fluid-body leading-relaxed text-white/80">
              {lang === "en"
                ? "In Kei we are all kin — including the ancestors who wrote this history. Having traced their footsteps, let us bring home not just a story, but the warmth of the Kei table. Until we meet again in the Land of Evav."
                : "Di Kei, kita semua bersaudara — termasuk dengan leluhur yang menulis sejarah ini. Setelah menelusuri jejaknya, mari bawa pulang bukan sekadar cerita, tapi juga rasa meja Kei yang hangat. Sampai jumpa di Tanah Evav."}
            </p>

            <div className="penutup-heritage-fade flex flex-col sm:flex-row flex-wrap items-start gap-4 mt-2">
              <Link
                href="/culture"
                onMouseMove={spotlightPrimary.onMouseMove}
                onMouseLeave={spotlightPrimary.onMouseLeave}
                aria-label={lang === "en" ? "Explore the Soul of Kei" : "Jelajahi Jiwa Kei"}
                className="btn-spotlight btn-cta-dark group/btn flex items-center gap-2 rounded-full px-6 py-3 font-sans text-sm md:text-base font-semibold transition-all duration-300 hover:scale-[1.02] active:press focus-ring cursor-pointer"
              >
                {lang === "en" ? "Explore the Soul of Kei" : "Jelajahi Jiwa Kei"}
                <ArrowRightIcon
                  className="h-5 w-5 text-current transition-transform group-hover/btn:translate-x-1"
                  aria-hidden="true"
                />
              </Link>

              <Link
                href="/explore"
                onMouseMove={spotlightSecondary.onMouseMove}
                onMouseLeave={spotlightSecondary.onMouseLeave}
                aria-label={lang === "en" ? "Experience the Excitement" : "Rasakan Festivnya"}
                className="btn-spotlight btn-cta-dark group/btn flex items-center gap-2 rounded-full px-6 py-3 font-sans text-sm md:text-base font-semibold transition-all duration-300 hover:scale-[1.02] active:press focus-ring cursor-pointer"
              >
                {lang === "en" ? "Explore the Fun" : "Eksplorasi Keseruannya"}
                <ArrowRightIcon
                  className="h-5 w-5 text-current transition-transform group-hover/btn:translate-x-1"
                  aria-hidden="true"
                />
              </Link>

              <Link
                href={`/${lang}/taste`}
                onMouseMove={spotlightSecondary.onMouseMove}
                onMouseLeave={spotlightSecondary.onMouseLeave}
                aria-label={lang === "en" ? "Taste the Flavors of Kei" : "Cicipi Rasa Kei"}
                className="btn-spotlight btn-cta-dark group/btn flex items-center gap-2 rounded-full px-6 py-3 font-sans text-sm md:text-base font-semibold transition-all duration-300 hover:scale-[1.02] active:press focus-ring cursor-pointer"
              >
                {lang === "en" ? "Taste the Flavors of Kei" : "Cicipi Rasa Kei"}
                <ArrowRightIcon
                  className="h-5 w-5 text-current transition-transform group-hover/btn:translate-x-1"
                  aria-hidden="true"
                />
              </Link>
            </div>

            <p className="penutup-heritage-fade font-sans text-xs md:text-sm tracking-[0.3em] uppercase text-white/40 mb-1">
              {lang === "en" ? "Closing words" : "Salam penutup"}
            </p>

            <p
              className="penutup-heritage-fade font-cursive text-3xl md:text-4xl text-brand"
              style={{ fontFamily: "var(--font-cursive)" }}
            >
              Ain Ni Ain
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
