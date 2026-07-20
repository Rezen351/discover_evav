"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { CalendarHeart, Award, MapPin, Users } from "lucide-react";
import { type FestivalPilar } from "@/content/locales/id/culture";
import type { getDictionary } from "@/content/dictionaries";

type Dict = Awaited<ReturnType<typeof getDictionary>>;

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const ICONS: Record<
  FestivalPilar["icon"],
  React.ComponentType<React.SVGProps<SVGSVGElement>>
> = {
  CalendarHeart,
  Award,
  MapPin,
  Users,
};

export default function FestivalMetiSection({
  lang,
  data,
}: {
  lang: "id" | "en";
  data: Dict["festivalMetiKei"];
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
        gsap.set(".festival-reveal", { opacity: 1, y: 0 });
        return;
      }
      gsap.utils.toArray<HTMLElement>(".festival-reveal").forEach((el) => {
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
      id="festival-meti-kei"
      ref={sectionRef}
      aria-labelledby="festival-title"
      className="relative w-full snap-start snap-always bg-section z-[5] py-20 md:py-28"
    >
      <div className="max-w-[98%] xl:max-w-[1600px] mx-auto px-4 md:px-8 w-full">
        <div className="max-w-3xl mb-12 md:mb-16">
          <p className="festival-reveal font-sans text-fluid-eyebrow uppercase tracking-[0.2em] sm:tracking-[0.3em] text-balance text-brand mb-4">
            {data.eyebrow}
          </p>
          <h2
            id="festival-title"
            className="festival-reveal font-serif text-fluid-h2 text-black mb-5"
          >
            {data.title}
          </h2>
          <p className="festival-reveal font-sans text-fluid-body text-black/70 leading-relaxed text-left">
            {data.intro}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 xl:gap-10 items-stretch">
          {/* Kiri: gambar festival dengan badge statistik KEN */}
          <figure className="festival-reveal relative lg:col-span-5 xl:col-span-5 rounded-lg-design overflow-hidden shadow-card border border-brand/10 min-h-[300px] sm:min-h-[360px] lg:min-h-full">
            <Image
              src={data.image}
              alt={data.imageAlt}
              fill
              sizes="(max-width: 1024px) 100vw, 42vw"
              className="object-cover object-center"
            />
            <div
              aria-hidden="true"
              className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent"
            />
            <figcaption className="absolute inset-x-0 bottom-0 p-5 sm:p-6 md:p-8">
              <div className="flex items-end gap-3 sm:gap-4">
                <span className="font-serif text-white leading-[0.9] text-[clamp(2.5rem,11vw,4.5rem)]">
                  {data.stat.value}
                </span>
                <span className="mb-1 flex-1 min-w-0 font-sans text-white/90 text-fluid-small leading-snug text-balance">
                  {data.stat.label}
                </span>
              </div>
              <p className="mt-2 font-sans text-white/70 text-fluid-small">
                {data.stat.context}
              </p>
            </figcaption>
          </figure>

          {/* Kanan: 4 pilar festival */}
          <div className="lg:col-span-7 xl:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-5 xl:gap-6">
            {data.pilar.map((p) => {
              const Icon = ICONS[p.icon];
              return (
                <article
                  key={p.id}
                  className="festival-reveal bg-white border border-brand/10 rounded-lg-design shadow-soft hover:border-brand/30 transition-colors p-5 md:p-7 flex flex-col"
                >
                  <span
                    className="flex h-11 w-11 items-center justify-center rounded-full bg-brand/10 text-brand mb-4"
                    aria-hidden="true"
                  >
                    <Icon className="h-5 w-5" />
                  </span>
                  <h3 className="font-serif text-fluid-h4 text-black mb-2">
                    {p.title}
                  </h3>
                  <p className="font-sans text-fluid-small md:text-fluid-body text-black/65 leading-relaxed">
                    {p.desc}
                  </p>
                </article>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
