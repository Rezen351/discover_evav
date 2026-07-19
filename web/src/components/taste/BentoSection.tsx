"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Fish, Wheat, Flame, CakeSlice, type LucideIcon } from "lucide-react";
import { bentoTaste, type BentoItem } from "@/content/taste";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const ICONS: Record<BentoItem["icon"], LucideIcon> = {
  Fish,
  Wheat,
  Flame,
  CakeSlice,
};

export default function BentoSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const ctx = gsap.context(() => {
      if (prefersReduced) {
        gsap.set(".taste-bento-reveal", { opacity: 1, y: 0 });
        return;
      }
      gsap.utils.toArray<HTMLElement>(".taste-bento-reveal").forEach((el) => {
        gsap.from(el, {
          opacity: 0,
          y: 40,
          duration: 0.8,
          ease: "power2.out",
          scrollTrigger: {
            trigger: el,
            start: "top 88%",
            toggleActions: "play none none reverse",
          },
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="taste-bento"
      ref={sectionRef}
      aria-labelledby="taste-bento-title"
      className="relative w-full snap-start snap-always bg-section z-[5] py-20 md:py-28"
    >
      <div className="max-w-[98%] xl:max-w-[1600px] mx-auto px-4 md:px-8 w-full">
        <div className="max-w-3xl mb-12 md:mb-16">
          <p className="taste-bento-reveal font-sans text-fluid-eyebrow uppercase tracking-[0.3em] text-brand mb-4">
            {bentoTaste.eyebrow}
          </p>
          <h2
            id="taste-bento-title"
            className="taste-bento-reveal font-serif text-fluid-h2 text-black mb-5"
          >
            {bentoTaste.title}
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 md:auto-rows-[220px] lg:auto-rows-[240px]">
          {bentoTaste.items.map((item) => {
            const Icon = ICONS[item.icon];
            return (
              <article
                key={item.id}
                className={`taste-bento-reveal relative w-full rounded-lg-design overflow-hidden shadow-card border border-brand/10 hover:border-brand/30 transition-colors bg-white p-6 md:p-8 flex flex-col justify-end ${
                  item.hero
                    ? "md:col-span-2 md:row-span-2 h-[340px] md:h-full"
                    : "h-[240px] md:h-full"
                }`}
              >
                <span
                  className="flex h-12 w-12 items-center justify-center rounded-full bg-brand/10 text-brand mb-4"
                  aria-hidden="true"
                >
                  <Icon className="h-6 w-6" />
                </span>
                <h3
                  className={`font-serif text-black break-words ${
                    item.hero ? "text-fluid-h3" : "text-fluid-h4"
                  }`}
                >
                  {item.title}
                </h3>
                <p
                  className={`mt-2 font-sans text-black/70 leading-relaxed break-words ${
                    item.hero
                      ? "text-fluid-small md:text-fluid-body max-w-xl"
                      : "text-fluid-small"
                  }`}
                >
                  {item.desc}
                </p>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
