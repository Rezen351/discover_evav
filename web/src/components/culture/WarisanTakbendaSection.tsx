"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { LanguageIcon, BookOpenIcon } from "@heroicons/react/24/outline";
import { Fish } from "lucide-react";
import { warisanTakbenda, type WarisanItem } from "@/content/culture";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const ICONS: Record<
  WarisanItem["icon"],
  React.ComponentType<React.SVGProps<SVGSVGElement>>
> = {
  Languages: LanguageIcon,
  BookOpen: BookOpenIcon,
  Fish,
};

export default function WarisanTakbendaSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const ctx = gsap.context(() => {
      if (prefersReduced) {
        gsap.set(".warisan-reveal", { opacity: 1, y: 0 });
        return;
      }
      gsap.utils.toArray<HTMLElement>(".warisan-reveal").forEach((el) => {
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
      id="warisan-takbenda"
      ref={sectionRef}
      aria-labelledby="warisan-title"
      className="relative w-full snap-start snap-always bg-section z-[5] py-20 md:py-28"
    >
      <div className="max-w-[98%] xl:max-w-[1600px] mx-auto px-4 md:px-8 w-full">
        <div className="max-w-3xl mb-12 md:mb-16">
          <p className="warisan-reveal font-sans text-fluid-eyebrow uppercase tracking-[0.3em] text-brand mb-4">
            {warisanTakbenda.eyebrow}
          </p>
          <h2
            id="warisan-title"
            className="warisan-reveal font-serif text-fluid-h2 text-black mb-5"
          >
            {warisanTakbenda.title}
          </h2>
          <p className="warisan-reveal font-sans text-fluid-body text-black/70 leading-relaxed text-left">
            {warisanTakbenda.metiIntro}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 xl:gap-8">
          {warisanTakbenda.items.map((item) => {
            const Icon = ICONS[item.icon];
            return (
              <article
                key={item.id}
                className="warisan-reveal bg-white border border-brand/10 rounded-lg-design shadow-soft hover:border-brand/30 transition-colors overflow-hidden flex flex-col"
              >
                <div className="relative w-full h-[220px] md:h-[240px] overflow-hidden group">
                  <Image
                    src={item.image}
                    alt={item.imageAlt}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover object-center transition-transform duration-700 group-hover:scale-105"
                  />
                  <div
                    aria-hidden="true"
                    className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent"
                  />
                </div>
                <div className="p-6 md:p-7 flex flex-col">
                  <div className="flex items-center gap-3 mb-3">
                    <span
                      className="flex h-10 w-10 items-center justify-center rounded-full bg-brand/10 text-brand"
                      aria-hidden="true"
                    >
                      <Icon className="h-5 w-5" />
                    </span>
                    <h3 className="font-serif text-fluid-h4 text-black">
                      {item.title}
                    </h3>
                  </div>
                  <p className="font-sans text-fluid-body text-black/65 leading-relaxed">
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
