"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

type Stat = {
  value: number;
  decimals: number;
  prefix?: string;
  suffix?: string;
  label: string;
  ariaLabel: string;
};

const stats: Stat[] = [
  { value: 5.8, decimals: 1, suffix: " KM", label: "Pasir Putih Terpanjang", ariaLabel: "5.8 kilometer pasir putih terpanjang di Asia Tenggara" },
  { value: 2, decimals: 0, suffix: " Warna", label: "Nuansa Laut Ngurtafur", ariaLabel: "2 warna laut di Pantai Ngurtafur" },
  { value: 7, decimals: 0, suffix: " Pasal", label: "Hukum Larvul Ngabal", ariaLabel: "7 pasal hukum adat Larvul Ngabal" },
  { value: 1000, decimals: 0, prefix: "+", suffix: " Spesies", label: "Terumbu Karang", ariaLabel: "Lebih dari 1000 spesies terumbu karang" },
];

function format(n: number, decimals: number) {
  return n.toLocaleString("id-ID", {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });
}

export default function StatsCounter() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const el = containerRef.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      const nums = gsap.utils.toArray<HTMLElement>(".ff-counter");
      if (prefersReduced) {
        nums.forEach((node, i) => {
          node.textContent = `${stats[i].prefix ?? ""}${format(stats[i].value, stats[i].decimals)}${stats[i].suffix ?? ""}`;
        });
        gsap.set(".ff-stat", { opacity: 1, y: 0 });
        return;
      }

      gsap.from(".ff-stat", {
        y: 30,
        opacity: 0,
        duration: 0.7,
        stagger: 0.12,
        ease: "power2.out",
        scrollTrigger: { trigger: el, start: "top bottom", toggleActions: "play none none reverse" },
      });

      nums.forEach((node, i) => {
        const stat = stats[i];
        const obj = { val: 0 };
        gsap.to(obj, {
          val: stat.value,
          duration: 1.6,
          ease: "power2.out",
          scrollTrigger: { trigger: el, start: "top bottom", toggleActions: "play none none reverse" },
          onUpdate: () => {
            node.textContent = `${stat.prefix ?? ""}${format(obj.val, stat.decimals)}${stat.suffix ?? ""}`;
          },
        });
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={containerRef}
      className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4 md:mt-5 fade-up-item"
      aria-label="Statistik Kepulauan Kei"
    >
      {stats.map((stat, i) => (
        <div key={i} className="ff-stat text-center md:text-left">
          <div
            className="ff-counter text-fluid-h3 text-brand font-normal leading-none"
            style={{ fontFamily: "var(--font-serif)" }}
            aria-label={stat.ariaLabel}
          >
            {`${stat.prefix ?? ""}${format(0, stat.decimals)}${stat.suffix ?? ""}`}
          </div>
          <div className="text-white/70 text-fluid-small mt-2 font-light" style={{ fontFamily: "var(--font-sans)" }}>
            {stat.label}
          </div>
        </div>
      ))}
    </div>
  );
}
