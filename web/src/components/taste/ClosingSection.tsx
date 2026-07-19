"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ChevronRightIcon } from "@heroicons/react/24/outline";
import { useSpotlight } from "@/hooks/useSpotlight";
import { tasteClosing } from "@/content/taste";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function ClosingSection() {
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
        gsap.set(".taste-closing-reveal", { opacity: 1, y: 0 });
        return;
      }
      gsap.from(".taste-closing-reveal", {
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
      id="taste-closing"
      ref={sectionRef}
      aria-label="Penutup kuliner Kepulauan Kei"
      className="relative w-full snap-start snap-always bg-section z-[5] py-20 md:py-28"
    >
      <div className="max-w-[98%] xl:max-w-[1600px] mx-auto px-4 md:px-8 w-full">
        <div className="bg-white border border-brand/10 shadow-soft rounded-xl-design py-16 md:py-24 px-6 md:px-12 text-center">
          <p
            className="taste-closing-reveal font-serif text-fluid-h3 text-brand mb-4"
            style={{ fontFamily: "var(--font-cursive)" }}
          >
            {tasteClosing.greeting}
          </p>
          <p className="taste-closing-reveal font-sans text-fluid-small uppercase tracking-[0.25em] text-black/45 mb-8">
            {tasteClosing.greetingNote}
          </p>

          <blockquote className="taste-closing-reveal mx-auto max-w-3xl font-serif text-fluid-h3 leading-[1.35] text-black break-words">
            &ldquo;{tasteClosing.quote}&rdquo;
          </blockquote>
          <p className="taste-closing-reveal mt-5 font-sans italic text-fluid-small text-black/55">
            {tasteClosing.attribution}
          </p>

          <div className="taste-closing-reveal mt-10">
            <a
              href={tasteClosing.ctaHref}
              onMouseMove={onMouseMove}
              onMouseLeave={onMouseLeave}
              className="btn-spotlight group inline-flex items-center gap-2 rounded-xl border border-black px-6 py-3 font-sans text-fluid-small font-semibold text-black transition-all duration-300 hover:scale-[1.02] hover:border-brand hover:text-brand focus-ring active:press"
              aria-label={tasteClosing.ctaLabel}
            >
              {tasteClosing.ctaLabel}
              <ChevronRightIcon
                className="h-4 w-4 text-current transition-transform group-hover:translate-x-1"
                aria-hidden="true"
              />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
