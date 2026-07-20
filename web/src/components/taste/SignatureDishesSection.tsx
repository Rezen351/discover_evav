"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { getDictionary } from "@/content/dictionaries";
type Dict = Awaited<ReturnType<typeof getDictionary>>;

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function SignatureDishesSection({
  data,
}: {
  lang: "id" | "en";
  data: Dict["signatureDishes"];
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
        gsap.set(".taste-dish-reveal", { opacity: 1, y: 0 });
        return;
      }
      gsap.from(".taste-dish-reveal", {
        opacity: 0,
        y: 40,
        duration: 0.8,
        stagger: 0.12,
        ease: "power2.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
          toggleActions: "play none none reverse",
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="signature-dishes"
      ref={sectionRef}
      aria-labelledby="signature-dishes-title"
      className="relative w-full snap-start snap-always bg-section z-[6] py-20 md:py-28"
    >
      <div className="max-w-[98%] xl:max-w-[1600px] mx-auto px-4 md:px-8 w-full">
        <div className="max-w-3xl mb-12 md:mb-16">
          <p className="taste-dish-reveal font-sans text-fluid-eyebrow uppercase tracking-[0.3em] text-brand mb-4">
            {data.eyebrow}
          </p>
          <h2
            id="signature-dishes-title"
            className="taste-dish-reveal font-serif text-fluid-h2 text-black mb-5"
          >
            {data.title}
          </h2>
          <p className="taste-dish-reveal font-sans text-fluid-body text-black/70 leading-relaxed text-left">
            {data.intro}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5 md:gap-6">
          {data.dishes.map((dish) => (
            <article
              key={dish.id}
              className="taste-dish-reveal group relative w-full h-[420px] rounded-lg-design overflow-hidden shadow-card border border-brand/10 hover:border-brand/30 transition-colors bg-white"
            >
              <Image
                src={dish.image}
                alt={dish.imageAlt}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1280px) 50vw, 33vw"
                className="object-cover object-center transition-transform duration-700 group-hover:scale-105"
              />
              <div
                aria-hidden="true"
                className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/35 to-transparent"
              />
              <div className="absolute inset-0 flex flex-col justify-end p-5 md:p-6">
                <span className="bg-nav-gradient inline-flex w-fit items-center gap-1.5 text-[13px] text-fluid-small text-black bg-brand/10 px-3 py-1.5 rounded-full font-medium mb-3">
                  {dish.tag}
                </span>
                <h3 className="font-serif text-fluid-h3 text-white break-words">
                  {dish.name}
                </h3>
                <p className="mt-2 font-sans text-[13px] sm:text-fluid-small text-white/85 leading-relaxed break-words">
                  {dish.desc}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
