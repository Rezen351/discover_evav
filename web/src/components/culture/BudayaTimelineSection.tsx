"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { linimasa } from "@/content/culture";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function BudayaTimelineSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const ctx = gsap.context(() => {
      if (prefersReduced) {
        gsap.set(".linimasa-reveal", { opacity: 1, y: 0 });
        return;
      }
      gsap.utils.toArray<HTMLElement>(".linimasa-reveal").forEach((el) => {
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
      id="linimasa-kei"
      ref={sectionRef}
      aria-labelledby="linimasa-title"
      className="relative w-full snap-start snap-always bg-section z-[4] py-20 md:py-28"
    >
      <div className="max-w-[98%] xl:max-w-[1600px] mx-auto px-4 md:px-8 w-full">
        <div className="max-w-3xl mb-12 md:mb-16">
          <p className="linimasa-reveal font-sans text-fluid-eyebrow uppercase tracking-[0.3em] text-brand mb-4">
            {linimasa.eyebrow}
          </p>
          <h2
            id="linimasa-title"
            className="linimasa-reveal font-serif text-fluid-h2 text-black mb-5"
          >
            {linimasa.title}
          </h2>
          <p className="linimasa-reveal font-sans text-fluid-body text-black/75 leading-relaxed text-left">
            {linimasa.intro}
          </p>
        </div>

        <ol className="relative ml-4 md:ml-6 border-l-2 border-brand/30">
          {linimasa.nodes.map((node) => (
            <li
              key={node.id}
              className="linimasa-reveal relative pl-8 md:pl-12 pb-10 last:pb-0"
            >
              <span
                className="absolute -left-[11px] top-2 flex h-5 w-5 items-center justify-center rounded-full bg-brand shadow-soft"
                aria-hidden="true"
              >
                <span className="h-2 w-2 rounded-full bg-white" />
              </span>
              <div className="bg-white border border-brand/10 rounded-lg-design shadow-card hover:border-brand/30 transition-colors p-6 md:p-8">
                <p className="font-serif text-fluid-h4 text-brand">
                  {node.year}
                </p>
                <h3 className="mt-1 font-serif text-fluid-h4 text-black">
                  {node.title}
                </h3>
                <p className="mt-3 font-sans text-fluid-body text-black/65 leading-relaxed">
                  {node.desc}
                </p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
