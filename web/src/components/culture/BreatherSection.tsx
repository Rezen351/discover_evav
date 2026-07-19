"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ChevronRightIcon } from "@heroicons/react/24/outline";
import { breather } from "@/content/culture";
import { useSpotlight } from "@/hooks/useSpotlight";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function BreatherSection() {
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
        gsap.set(".breather-reveal", { opacity: 1, y: 0 });
        return;
      }
      gsap.from(".breather-reveal", {
        opacity: 0,
        y: 30,
        duration: 1,
        stagger: 0.15,
        ease: "power2.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="jeda-budaya"
      ref={sectionRef}
      aria-label="Jeda napas budaya Kei"
      className="relative w-full snap-start snap-always bg-section z-[5] py-16 md:py-24"
    >
      <div className="max-w-[98%] xl:max-w-[1600px] mx-auto px-4 md:px-8 w-full">
        <div className="bg-white border border-brand/10 shadow-soft rounded-xl-design py-16 md:py-24 px-6 md:px-12 text-center">
          <blockquote className="breather-reveal mx-auto max-w-4xl font-serif text-fluid-h3 leading-[1.35] text-black">
            &ldquo;{breather.quote}&rdquo;
          </blockquote>
          <p className="breather-reveal mt-6 font-sans italic text-fluid-small text-black/55">
            {breather.attribution}
          </p>

          <div className="breather-reveal mt-10">
            <a
              href={breather.ctaHref}
              onMouseMove={onMouseMove}
              onMouseLeave={onMouseLeave}
              className="btn-spotlight btn-cta hover:text-brand border hover:border-brand/100 group inline-flex items-center gap-2 rounded-xl bg-nav-gradient px-6 py-3 font-sans text-fluid-small font-semibold text-black transition-all hover:brightness-105 focus-ring active:press"
              aria-label={breather.ctaLabel}
            >
              {breather.ctaLabel}
              <ChevronRightIcon
                className="h-4 w-4 transition-transform group-hover:translate-x-1"
                aria-hidden="true"
              />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
