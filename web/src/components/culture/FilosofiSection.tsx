"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  HeartIcon,
  GiftIcon,
  SwatchIcon,
  BuildingLibraryIcon,
  ArrowRightIcon,
} from "@heroicons/react/24/outline";
import { filosofi, type FilosofiTile } from "@/content/culture";
import { useSpotlight } from "@/hooks/useSpotlight";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const ICONS: Record<FilosofiTile["icon"], React.ComponentType<React.SVGProps<SVGSVGElement>>> = {
  HeartHandshake: HeartIcon,
  Gift: GiftIcon,
  Palette: SwatchIcon,
  Landmark: BuildingLibraryIcon,
};

export default function FilosofiSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const { onMouseMove, onMouseLeave } = useSpotlight();

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const ctx = gsap.context(() => {
      if (prefersReduced) {
        gsap.set(".filosofi-reveal", { opacity: 1, y: 0 });
        return;
      }
      gsap.utils.toArray<HTMLElement>(".filosofi-reveal").forEach((el) => {
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
      id="filosofi-kei"
      ref={sectionRef}
      aria-labelledby="filosofi-title"
      className="relative w-full snap-start snap-always bg-section z-[6] py-20 md:py-28"
    >
      <div className="max-w-[98%] xl:max-w-[1600px] mx-auto px-4 md:px-8 w-full">
        <div className="max-w-3xl mb-12 md:mb-16">
          <p className="filosofi-reveal font-sans text-fluid-eyebrow uppercase tracking-[0.3em] text-brand mb-4">
            {filosofi.eyebrow}
          </p>
          <h2
            id="filosofi-title"
            className="filosofi-reveal font-serif text-fluid-h2 text-black mb-5"
          >
            {filosofi.title}
          </h2>
          <p className="filosofi-reveal font-sans text-fluid-body text-black/70 leading-relaxed text-left">
            {filosofi.intro}
          </p>
        </div>

        {/* Bento grid — tile #1 (Ain Ni Ain) hero 2x2 */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 sm:auto-rows-[220px] md:auto-rows-[220px] lg:auto-rows-[240px]">
          {filosofi.tiles.map((tile) => {
            const Icon = ICONS[tile.icon];
            return (
              <figure
                key={tile.id}
                className={`filosofi-reveal relative w-full rounded-lg-design overflow-hidden shadow-card border border-brand/10 hover:border-brand/30 transition-colors group bg-white ${
                  tile.hero
                    ? "sm:col-span-2 sm:row-span-2 h-[320px] sm:h-full"
                    : "h-[240px] sm:h-full"
                }`}
              >
                <Image
                  src={tile.image}
                  alt={tile.imageAlt}
                  fill
                  sizes={
                    tile.hero
                      ? "(max-width: 768px) 100vw, 50vw"
                      : "(max-width: 768px) 100vw, 25vw"
                  }
                  className="object-cover object-center transition-transform duration-700 group-hover:scale-105"
                />
                <div
                  aria-hidden="true"
                  className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent"
                />
                <figcaption className="absolute inset-0 flex flex-col justify-end p-5 md:p-6">
                  <span
                    className="flex h-10 w-10 items-center justify-center rounded-full bg-brand/20 text-brand mb-3"
                    aria-hidden="true"
                  >
                    <Icon className="h-5 w-5" />
                  </span>
                  <h3
                    className={`font-serif text-white ${
                      tile.hero ? "text-fluid-h3" : "text-fluid-h4"
                    }`}
                  >
                    {tile.title}
                  </h3>
                  <p
                    className={`mt-2 font-sans text-white/85 leading-relaxed ${
                      tile.hero ? "text-fluid-small md:text-fluid-body" : "text-fluid-small line-clamp-4 md:line-clamp-3"
                    }`}
                  >
                    {tile.desc}
                  </p>
                </figcaption>
              </figure>
            );
          })}

          {/* Tile #5 - Custom CTA Tile to fill empty grid slot */}
          <div className="filosofi-reveal flex flex-col justify-between gap-4 rounded-lg-design border border-brand/20 bg-white p-5 md:p-6 shadow-card hover:border-brand/40 transition-colors min-h-[240px] sm:h-full relative">
            <div className="min-w-0">
              <h3 className="font-serif text-black text-fluid-h4 leading-tight">
                {filosofi.cta.title}
              </h3>
              <p className="mt-2 font-sans text-black/70 text-fluid-small leading-relaxed line-clamp-3">
                {filosofi.cta.desc}
              </p>
            </div>

            <Link
              href={filosofi.cta.link}
              onMouseMove={onMouseMove}
              onMouseLeave={onMouseLeave}
              className="btn-spotlight btn-cta w-full shrink-0 text-xs md:text-sm font-semibold rounded-full px-4 py-2.5 inline-flex items-center justify-center gap-2 active:press focus-ring"
            >
              <span className="truncate">{filosofi.cta.buttonText}</span>
              <ArrowRightIcon className="h-4 w-4 shrink-0 text-current" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
