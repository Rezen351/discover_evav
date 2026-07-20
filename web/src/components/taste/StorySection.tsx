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

export default function StorySection({
  lang,
  data,
}: {
  lang: "id" | "en";
  data: Dict["tasteStory"];
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
        gsap.set(".taste-story-reveal", { opacity: 1, y: 0 });
        return;
      }
      gsap.from(".taste-story-reveal", {
        opacity: 0,
        y: 40,
        duration: 0.9,
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
      id="taste-story"
      ref={sectionRef}
      aria-labelledby="taste-story-title"
      className="relative w-full snap-start snap-always bg-section z-[5] py-20 md:py-28"
    >
      <div className="max-w-[98%] xl:max-w-[1600px] mx-auto px-4 md:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          {/* Kiri — kartu gambar */}
          <div className="taste-story-reveal relative w-full h-[280px] md:h-[480px] rounded-xl-design overflow-hidden shadow-card border border-brand/10">
            <Image
              src={data.image}
              alt={data.imageAlt}
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover object-center transition-transform duration-700 hover:scale-105"
            />
            <div
              aria-hidden="true"
              className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent"
            />
          </div>

          {/* Kanan — narasi */}
          <div>
            <p className="taste-story-reveal font-sans text-fluid-eyebrow uppercase tracking-[0.15em] sm:tracking-[0.3em] text-brand mb-4">
              {data.eyebrow}
            </p>
            <h2
              id="taste-story-title"
              className="taste-story-reveal font-serif text-fluid-h2 text-black mb-6 break-words"
            >
              {data.title}
            </h2>
            <div className="space-y-4">
              {data.paragraphs.map((para, i) => (
                <p
                  key={i}
                  className="taste-story-reveal font-sans text-fluid-body text-black/70 leading-relaxed text-left"
                >
                  {i === 1 && (
                    <em
                      className="text-brand not-italic mr-1"
                      style={{ fontFamily: "var(--font-cursive)" }}
                    >
                      {data.accentWord}
                    </em>
                  )}
                  {para}
                  {i === 1 && (
                    <span className="text-black/55 text-[13px] sm:text-xs ml-1">
                      {data.accentNote}
                    </span>
                  )}
                </p>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
