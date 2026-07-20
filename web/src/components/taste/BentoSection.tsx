"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Fish, Wheat, Flame, CakeSlice, Nut, type LucideIcon } from "lucide-react";
import { type BentoItem } from "@/content/locales/id/taste";
import { getDictionary } from "@/content/dictionaries";
type Dict = Awaited<ReturnType<typeof getDictionary>>;

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const ICONS: Record<BentoItem["icon"], LucideIcon> = {
  Fish,
  Wheat,
  Flame,
  CakeSlice,
  Coconut: Nut,
};

export default function BentoSection({
  data,
}: {
  lang: "id" | "en";
  data: Dict["bentoTaste"];
}) {
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
            <p className="taste-bento-reveal font-sans text-fluid-eyebrow uppercase tracking-[0.15em] sm:tracking-[0.3em] text-brand mb-4">
            {data.eyebrow}
          </p>
          <h2
            id="taste-bento-title"
            className="taste-bento-reveal font-serif text-fluid-h2 text-black mb-5"
          >
            {data.title}
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 md:auto-rows-[220px] lg:auto-rows-[240px]">
          {data.items.map((item) => {
            const Icon = ICONS[item.icon];
            return (
              <article
                key={item.id}
                className={`taste-bento-reveal group relative w-full rounded-lg-design overflow-hidden shadow-card border border-brand/10 hover:border-brand/30 transition-colors ${
                  item.hero
                    ? "md:col-span-2 md:row-span-2 h-[260px] md:h-full"
                    : item.tall
                      ? "md:row-span-2 h-[260px] md:h-full"
                      : "h-[200px] md:h-full"
                }`}
              >
                {/* Foto background */}
                <Image
                  src={item.image}
                  alt={item.imageAlt}
                  fill
                  sizes={
                    item.hero
                      ? "(max-width: 1024px) 100vw, 66vw"
                      : "(max-width: 768px) 100vw, 33vw"
                  }
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                {/* Overlay agar teks terbaca */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/10" />

                {/* Konten overlay */}
                <div className="relative h-full p-6 md:p-8 flex flex-col justify-end">
                  <span
                    className="flex h-12 w-12 items-center justify-center rounded-full bg-white/90 text-brand mb-4"
                    aria-hidden="true"
                  >
                    <Icon className="h-6 w-6" />
                  </span>
                  <h3
                    className={`font-serif text-white break-words ${
                      item.hero ? "text-fluid-h3" : "text-fluid-h4"
                    }`}
                  >
                    {item.title}
                  </h3>
                  <p
                    className={`mt-2 font-sans text-white/85 leading-relaxed break-words ${
                      item.hero
                        ? "text-fluid-small md:text-fluid-body max-w-xl"
                        : "text-fluid-small"
                    }`}
                  >
                    {item.desc}
                  </p>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
