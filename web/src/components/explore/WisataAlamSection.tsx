"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import {
  MapPinIcon,
  FunnelIcon,
  ChevronDownIcon,
  CheckIcon,
} from "@heroicons/react/24/outline";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, A11y, Keyboard } from "swiper/modules";
import { useSpotlight } from "@/hooks/useSpotlight";

import "swiper/css";
import "swiper/css/pagination";
import {
  type SpotAlam,
  type KategoriAlam,
} from "@/content/locales/id/explore";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function WisataAlamSection({
  lang,
  data,
  categories,
}: {
  lang: "id" | "en";
  data: SpotAlam[];
  categories: ("Semua" | KategoriAlam)[];
}) {
  const ref = useRef<HTMLElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [filter, setFilter] = useState<"Semua" | KategoriAlam>("Semua");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const { onMouseMove, onMouseLeave } = useSpotlight();

  // Tutup dropdown saat klik di luar area atau menekan Escape
  useEffect(() => {
    function handleClickOutside(event: MouseEvent | TouchEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setIsDropdownOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("touchstart", handleClickOutside);
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("touchstart", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  const filtered = useMemo(
    () =>
      filter === "Semua"
        ? data
        : data.filter((spot) => spot.kategori === filter),
    [filter, data]
  );

  useEffect(() => {
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const ctx = gsap.context(() => {
      if (prefersReduced) {
        gsap.set(".alam-fade", { opacity: 1, y: 0 });
        return;
      }
      gsap.from(".alam-fade", {
        opacity: 0,
        y: 30,
        duration: 1.1,
        stagger: 0.12,
        ease: "power2.out",
        scrollTrigger: {
          trigger: ref.current,
          start: "top 70%",
          toggleActions: "play none none reverse",
        },
      });
    }, ref);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="wisata-alam"
      ref={ref}
      className="relative w-full min-h-screen snap-start snap-always flex items-center bg-section z-[4] overflow-hidden py-16 sm:py-20"
    >
      <div className="max-w-[98%] xl:max-w-[1600px] mx-auto px-4 md:px-8 w-full">
        {/* Header editorial asimetris */}
        <div className="relative z-30 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start mb-8 md:mb-10">
          <div className="alam-fade lg:col-span-8 flex flex-col">
            <span className="font-sans uppercase tracking-[0.25em] text-brand text-xs md:text-sm font-semibold mb-4">
              {lang === "en" ? "Evav Natural Tourism" : "Wisata Alam Evav"}
            </span>

            <h2 className="font-serif text-fluid-h2 md:text-5xl leading-tight text-black break-words">
              {lang === "en" ? (
                <>
                  Beauty{" "}
                  <span className="text-black">that Remains Pristine</span>
                </>
              ) : (
                <>
                  Keindahan{" "}
                  <span className="text-black">yang Masih Murni</span>
                </>
              )}
            </h2>

            <p className="mt-6 md:mt-8 font-serif text-base sm:text-lg md:text-2xl leading-relaxed text-black/80 w-full">
              {lang === "en"
                ? "Behind the Meti Festival, the Kei Islands guard a paradise that never sleeps: the finest sand in the world, glass-clear seas, island clusters like jewels, and caves holding ancient mysteries. Explore the natural beauty of Evav — pick a category, find a spot, and plan your adventure."
                : "Di balik Festival Meti, Kepulauan Kei menyimpan surga yang tak pernah tidur: pasir terhalus di dunia, laut sebening kaca, gugusan pulau bagai permata, dan goa-gua yang menyimpan misteri. Jelajahi keindahan alam Evav — pilih kategori, temukan spot, lalu rancang petualanganmu."}
            </p>
          </div>

          {/* Ringkasan jumlah spot + Filter Kategori (Dropdown) */}
          <div className="alam-fade lg:col-span-4 flex flex-col gap-4 lg:items-end lg:pt-2">
            {/* Ringkasan jumlah spot — di atas filter */}
            <div className="relative z-0 inline-flex items-center gap-4 self-start lg:self-end rounded-lg-design border border-brand/10 bg-white/70 px-4 py-3 sm:px-6 sm:py-4 shadow-soft">
              <span className="font-serif text-4xl md:text-5xl leading-none text-brand">
                {filtered.length}
              </span>
              <span className="font-sans text-sm md:text-base leading-snug text-black/60 break-words">
                {lang === "en" ? "spots" : "spot"}
                <br />
                {filter === "Semua"
                  ? lang === "en"
                    ? "available"
                    : "tersedia"
                  : filter.toLowerCase()}
              </span>
            </div>

            <div ref={dropdownRef} className="relative w-full sm:w-[300px] z-[60]">
              <button
                type="button"
                onClick={() => setIsDropdownOpen((open) => !open)}
                aria-haspopup="listbox"
                aria-expanded={isDropdownOpen}
                aria-label={
                  lang === "en"
                    ? "Filter natural tourism categories"
                    : "Saring kategori wisata alam"
                }
                className="w-full flex items-center justify-between rounded-md-design border border-brand/20 bg-white px-5 py-3.5 font-sans text-sm md:text-base font-medium text-black shadow-soft transition-all hover:border-brand/50 hover:text-brand focus-ring"
              >
                <span className="flex items-center gap-2">
                  <FunnelIcon className="h-4 w-4" />
                  {filter}
                </span>
                <ChevronDownIcon
                  className={`h-4 w-4 text-black/50 transition-transform duration-300 ${isDropdownOpen ? "rotate-180 text-brand" : ""
                    }`}
                />
              </button>

              {isDropdownOpen && (
                <ul
                  role="listbox"
                  aria-label={
                    lang === "en"
                      ? "Natural tourism categories"
                      : "Kategori wisata alam"
                  }
                  className="absolute left-0 right-0 z-[70] mt-2 origin-top overflow-hidden rounded-md-design border border-brand/10 bg-white p-1.5 shadow-card"
                >
                  {categories.map((kat) => {
                    const active = filter === kat;
                    return (
                      <li key={kat} role="none">
                        <button
                          role="option"
                          aria-selected={active}
                          type="button"
                          onClick={() => {
                            setFilter(kat);
                            setIsDropdownOpen(false);
                          }}
                          className={`w-full flex items-center justify-between gap-2 rounded-sm-design px-4 py-2.5 font-sans text-sm md:text-base font-medium text-left transition-colors ${active
                            ? "bg-brand/10 text-brand font-semibold"
                            : "text-black/70 hover:bg-brand/5 hover:text-brand"
                            }`}
                        >
                          {kat}
                          {active && <CheckIcon className="h-4 w-4 shrink-0" />}
                        </button>
                      </li>
                    );
                  })}
                </ul>
              )}
            </div>
          </div>
        </div>

        {/* Kartu spot alam */}
        {(() => {
          const SpotCard = ({ spot }: { spot: SpotAlam }) => (
            <article className="group flex flex-col h-full bg-white border border-brand/10 rounded-xl-design shadow-soft hover:border-brand/30 transition-colors overflow-hidden">
              <div className="relative w-full h-[200px] md:h-[240px] overflow-hidden">
                <Image
                  src={spot.gambar}
                  alt={spot.alt}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <span className="bg-nav-gradient absolute top-3 left-3 rounded-full bg-white/90 px-3 py-1 font-sans text-xs font-semibold text-black shadow-sm">
                  {spot.kategori}
                </span>
              </div>

              <div className="flex flex-col flex-1 p-5 md:p-6">
                <h3 className="font-serif text-xl md:text-2xl leading-snug text-black">
                  {spot.nama}
                </h3>
                <p className="mt-3 font-sans text-sm md:text-base leading-relaxed text-black/70 flex-1">
                  {spot.deskripsi}
                </p>

                <a
                  href={spot.mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onMouseMove={onMouseMove}
                  onMouseLeave={onMouseLeave}
                  className="btn-spotlight btn-cta mt-5 inline-flex items-center gap-2 self-start font-sans text-sm md:text-base font-medium focus-ring rounded-full px-5 py-2.5"
                  aria-label={`${
                    lang === "en" ? "View" : "Lihat"
                  } ${spot.nama} ${
                    lang === "en" ? "on Google Maps" : "di Google Maps"
                  }`}
                >
                  <MapPinIcon className="h-4 w-4 md:h-5 md:w-5 text-current" />
                  {lang === "en" ? "View on Map" : "Lihat di Peta"}
                </a>
              </div>
            </article>
          );

          return (
            <>
              {/* Desktop/Tablet: grid multi-kolom */}
              <div className="relative z-10 hidden md:grid grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                {filtered.map((spot) => (
                  <div key={spot.id} className="alam-fade">
                    <SpotCard spot={spot} />
                  </div>
                ))}
              </div>

              {/* Mobile: Swiper slider + pagination */}
              <div className="relative z-10 md:hidden alam-fade">
                <Swiper
                  modules={[Pagination, A11y, Keyboard]}
                  spaceBetween={16}
                  slidesPerView={1.1}
                  grabCursor
                  keyboard={{ enabled: true }}
                  pagination={{ clickable: true }}
                  aria-label={
                    lang === "en"
                      ? "Evav natural tourism gallery"
                      : "Galeri wisata alam Evav"
                  }
                  className="!pb-12 alam-swiper"
                >
                  {filtered.map((spot) => (
                    <SwiperSlide key={spot.id} className="!h-auto">
                      <SpotCard spot={spot} />
                    </SwiperSlide>
                  ))}
                </Swiper>
              </div>
            </>
          );
        })()}

        {/* CTA penutup section */}
        {/* <div className="alam-fade mt-12 md:mt-16 flex flex-wrap items-center gap-4 md:gap-6">
          <a
            href="/destinasi"
            onMouseMove={onMouseMove}
            onMouseLeave={onMouseLeave}
            className="btn-spotlight btn-cta inline-flex items-center gap-2 font-sans text-sm md:text-base font-medium focus-ring rounded-full px-6 py-3"
            aria-label="Jelajahi semua destinasi Kepulauan Kei"
          >
            Jelajahi Semua Destinasi
            <ArrowRightIcon className="h-4 w-4 md:h-5 md:w-5 text-current" />
          </a>

          <a
            href={data[0]?.mapsUrl ?? "#"}
            target="_blank"
            rel="noopener noreferrer"
            onMouseMove={onMouseMove}
            onMouseLeave={onMouseLeave}
            className="btn-spotlight btn-cta inline-flex items-center gap-2 font-sans text-sm md:text-base font-medium focus-ring rounded-full px-6 py-3"
            aria-label={`Lihat ${data[0]?.nama ?? "destinasi"} di Google Maps`}
          >
            <MapPinIcon className="h-4 w-4 md:h-5 md:w-5 text-current" />
            Lihat di Peta
          </a>
        </div> */}
      </div>
    </section>
  );
}
