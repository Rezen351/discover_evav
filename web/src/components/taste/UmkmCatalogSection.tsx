"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import {
  StarIcon,
  MapPinIcon,
  ShoppingBagIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from "@heroicons/react/24/outline";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useSpotlight } from "@/hooks/useSpotlight";
import { umkms, type UmkmItem } from "@/content/umkm";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const PER_PAGE = 8;
const CATEGORIES: Array<UmkmItem["category"] | "Semua"> = [
  "Semua",
  "Kuliner",
  "Kerajinan",
  "Oleh-oleh",
];

export default function UmkmCatalogSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const { onMouseMove, onMouseLeave } = useSpotlight();
  const [page, setPage] = useState(0);
  const [filter, setFilter] = useState<UmkmItem["category"] | "Semua">("Semua");

  const filtered = useMemo(
    () =>
      filter === "Semua"
        ? umkms
        : umkms.filter((u) => u.category === filter),
    [filter]
  );

  const totalPages = Math.ceil(filtered.length / PER_PAGE);
  const safePage = Math.min(page, Math.max(totalPages - 1, 0));
  const visible = filtered.slice(
    safePage * PER_PAGE,
    safePage * PER_PAGE + PER_PAGE
  );

  useEffect(() => {
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const ctx = gsap.context(() => {
      if (prefersReduced) {
        gsap.set(".umkm-catalog-reveal", { opacity: 1, y: 0 });
        return;
      }
      gsap.utils.toArray<HTMLElement>(".umkm-catalog-reveal").forEach((el) => {
        gsap.from(el, {
          opacity: 0,
          y: 30,
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
  }, [safePage, filter]);

  const goto = (next: number) => {
    if (next < 0 || next > totalPages - 1) return;
    setPage(next);
    sectionRef.current
      ?.querySelector(".umkm-grid")
      ?.scrollIntoView({ behavior: "smooth", block: "center" });
  };

  const handleFilter = (next: UmkmItem["category"] | "Semua") => {
    setFilter(next);
    setPage(0);
  };

  return (
    <section
      id="taste-umkm"
      ref={sectionRef}
      aria-labelledby="taste-umkm-title"
      className="relative w-full snap-start snap-always bg-section z-[4] py-20 md:py-28"
    >
      <div className="max-w-[98%] xl:max-w-[1600px] mx-auto px-4 md:px-8 w-full">
        {/* Div 1: Headline deskripsi (kiri) + foto landscape (kanan) */}
        <div className="umkm-catalog-reveal mb-12 md:mb-16 grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          <div className="max-w-xl">
            <p
              className="font-sans text-fluid-small uppercase tracking-[0.25em] text-brand mb-4"
              style={{ fontFamily: "var(--font-sans)" }}
            >
              Meja Kei, Ekonomi Lokal
            </p>
            <h2
              id="taste-umkm-title"
              className="font-serif text-fluid-h2 leading-[1.12] text-black"
              style={{ fontFamily: "var(--font-serif)" }}
            >
              UMKM yang Menyajikan{" "}
              <span className="text-brand">Rasa Kei</span>
            </h2>
            <p
              className="mt-5 text-base md:text-lg leading-relaxed text-black/60 font-light"
              style={{ fontFamily: "var(--font-sans)" }}
            >
              Di balik setiap hidangan, ada keluarga yang meracik, mengolah, dan
              menjaga rasa Kei. Dukung pengrajin serta UMKM lokal yang membawa
              cita rasa pulau ini ke meja dan oleh-olehmu.
            </p>
          </div>
          <div className="relative aspect-[16/10] w-full overflow-hidden rounded-lg-design border border-brand/10 shadow-soft">
            <Image
              src={umkms[0].image}
              alt="Ragam produk UMKM Kepulauan Kei"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
              priority
            />
          </div>
        </div>

        {/* Div 2: Judul + Filter + Catalog grid */}
        <div className="mt-16 md:mt-20">
          <div className="umkm-catalog-reveal flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-8 md:mb-10">
            <div className="max-w-2xl">
              <h3
                className="font-serif text-fluid-h3 text-black"
                style={{ fontFamily: "var(--font-serif)" }}
              >
                Katalog Produk UMKM
              </h3>
              <p
                className="mt-3 text-base md:text-lg leading-relaxed text-black/60 font-light"
                style={{ fontFamily: "var(--font-sans)" }}
              >
                Jelajahi ragam produk dari pengrajin dan UMKM lokal Kei — siap
                menemani meja serta oleh-oleh perjalananmu.
              </p>
            </div>

            {/* Filter kategori */}
            <div
              className="flex flex-wrap items-center gap-2"
              role="group"
              aria-label="Filter kategori UMKM"
            >
              {CATEGORIES.map((cat) => {
                const active = cat === filter;
                return (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => handleFilter(cat)}
                    aria-pressed={active}
                    className={`font-sans text-sm font-semibold px-4 py-2 rounded-full shadow-sm transition-all duration-300 focus-ring active:press ${active
                      ? "bg-nav-gradient border border-brand/100 text-brand shadow-soft"
                      : "border border-brand/20 text-black/60 hover:text-brand hover:bg-brand/10"
                      }`}
                  >
                    {cat}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="umkm-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 md:gap-6 items-stretch">
            {visible.map((u) => (
              <figure
                key={u.id}
                className="umkm-catalog-reveal group flex flex-col h-full bg-white border border-brand/10 hover:border-brand/30 rounded-lg-design overflow-hidden shadow-soft transition-all duration-300"
              >
                <div className="relative aspect-[4/3] w-full overflow-hidden">
                  <Image
                    src={u.image}
                    alt={u.name}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="bg-nav-gradient text-black text-[10px] font-bold px-3 py-1.5 rounded-full uppercase tracking-wide" style={{ fontFamily: "var(--font-sans)" }}>
                      {u.category}
                    </span>
                  </div>
                </div>
                <div className="p-5 flex flex-col gap-3 flex-1">
                  <div className="flex items-start justify-between gap-2">
                    <h4 className="text-lg text-black font-normal leading-snug" style={{ fontFamily: "var(--font-serif)" }}>
                      {u.name}
                    </h4>
                    <div className="flex items-center gap-1 text-xs text-black/60 flex-shrink-0" style={{ fontFamily: "var(--font-sans)" }}>
                      <StarIcon className="w-3.5 h-3.5 text-yellow-500 fill-yellow-500" />
                      {u.rating}
                    </div>
                  </div>
                  <div className="flex items-center gap-1.5 text-brand text-xs font-medium" style={{ fontFamily: "var(--font-sans)" }}>
                    <MapPinIcon className="w-3.5 h-3.5" />
                    {u.location}
                  </div>
                  <p
                    className="text-sm leading-relaxed text-black/80 font-normal"
                    style={{ fontFamily: "var(--font-sans)" }}
                  >
                    {u.desc}
                  </p>
                  <a
                    href={`https://wa.me/${u.whatsapp}`}
                    target="_blank"
                    rel="noreferrer"
                    onMouseMove={onMouseMove}
                    onMouseLeave={onMouseLeave}
                    aria-label={`Pesan ${u.name} via WhatsApp`}
                    className="btn-spotlight mt-auto flex items-center justify-center gap-2 border border-black hover:border-brand text-black hover:text-brand px-5 py-2.5 rounded-xl font-semibold text-sm transition-all duration-300 hover:scale-[1.02] active:press cursor-pointer focus-ring"
                    style={{ fontFamily: "var(--font-sans)" }}
                  >
                    <ShoppingBagIcon className="w-4 h-4" />
                    Pesan via WhatsApp
                  </a>
                </div>
              </figure>
            ))}
          </div>
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="mt-10 md:mt-12 flex items-center justify-center gap-2">
            <button
              type="button"
              onClick={() => goto(safePage - 1)}
              disabled={safePage === 0}
              aria-label="Halaman sebelumnya"
              className="flex items-center justify-center w-10 h-10 rounded-full border border-brand/20 text-brand transition-colors hover:bg-brand/10 focus-ring active:press disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-transparent"
            >
              <ChevronLeftIcon className="w-5 h-5" aria-hidden="true" />
            </button>

            {Array.from({ length: totalPages }).map((_, i) => (
              <button
                key={i}
                type="button"
                onClick={() => goto(i)}
                aria-label={`Halaman ${i + 1}`}
                aria-current={i === safePage ? "page" : undefined}
                className={`min-w-[40px] h-10 px-3 rounded-full font-sans text-sm font-semibold transition-all duration-300 focus-ring active:press ${i === safePage
                  ? "bg-nav-gradient text-brand border border-brand/100 shadow-soft"
                  : "border border-brand/20 text-black/60 hover:text-brand hover:bg-brand/10"
                  }`}
              >
                {i + 1}
              </button>
            ))}

            <button
              type="button"
              onClick={() => goto(safePage + 1)}
              disabled={safePage === totalPages - 1}
              aria-label="Halaman berikutnya"
              className="flex items-center justify-center w-10 h-10 rounded-full border border-brand/20 text-brand transition-colors hover:bg-brand/10 focus-ring active:press disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-transparent"
            >
              <ChevronRightIcon className="w-5 h-5" aria-hidden="true" />
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
