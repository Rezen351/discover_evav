"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, A11y, Keyboard } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import {
  SparklesIcon,
  MusicalNoteIcon,
  SwatchIcon,
  MicrophoneIcon,
  ChevronRightIcon,} from "@heroicons/react/24/outline";
import { Shirt, Sailboat } from "lucide-react";
import { type EkspresiItem, type EkspresiKelompok } from "@/content/locales/id/culture";
import type { getDictionary } from "@/content/dictionaries";
import EkspresiAudioPlayer from "./EkspresiAudioPlayer";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const ICONS: Record<
  EkspresiItem["icon"],
  React.ComponentType<React.SVGProps<SVGSVGElement>>
> = {
  Sparkles: SparklesIcon,
  Music: MusicalNoteIcon,
  Shirt,
  Palette: SwatchIcon,
  Mic2: MicrophoneIcon,
  Boat: Sailboat,
};

// Panel isi satu kelompok: deskripsi + carousel card (Swiper) bila >1 item.
// Dipisah sebagai komponen tingkat-atas agar tidak dibuat ulang saat render.
function KelompokPanel({
  kelompok,
  common,
  activeSlide,
  onSlideChange,
  renderCard,
}: {
  lang: "id" | "en";
  kelompok: EkspresiKelompok;
  common: Dict["cultureCommon"];
  activeSlide: number;
  onSlideChange: (index: number) => void;
  renderCard: (item: EkspresiItem, isActive?: boolean) => React.ReactNode;
}) {
  const kItems: EkspresiItem[] = kelompok.items ?? [];
  const kShowSwipe = kItems.length > 1;
  return (
    <>
      {/* <p className="font-sans text-fluid-body text-black/65 leading-relaxed max-w-3xl mb-6">
        {kelompok.desc}
      </p> */}

      {kShowSwipe ? (
        <Swiper
          modules={[Pagination, A11y, Keyboard]}
          slidesPerView={1}
          spaceBetween={16}
          keyboard={{ enabled: true }}
          pagination={{
            clickable: true,
            el: `.ekspresi-pagination-${kelompok.id}`,
          }}
          onSlideChange={(s) => onSlideChange(s.activeIndex)}
          className="!pb-2 ekspresi-swiper"
        >
          {kItems.map((it, i) => (
            <SwiperSlide key={it.id} className="!h-auto">
              {renderCard(it, i === activeSlide)}
            </SwiperSlide>
          ))}
        </Swiper>
      ) : (
        kItems[0] && renderCard(kItems[0])
      )}

      {kShowSwipe && (
        <>
          <div
            className={`ekspresi-pagination-${kelompok.id} flex items-center justify-center gap-2`}
          />
           <p className="text-center font-sans text-fluid-small text-black/45">
            {common.ekspresi.swipeHint}
            {kItems.map((it, i) => (
              <span key={it.id}>
                {i > 0 && ", "}
                <span
                  className={
                    i === activeSlide ? "text-brand font-medium" : ""
                  }
                >
                  {it.title}
                </span>
              </span>
            ))}
          </p>
        </>
      )}
    </>
  );
}

type Dict = Awaited<ReturnType<typeof getDictionary>>;

export default function EkspresiBudayaSection({
  lang,
  data,
  common,
}: {
  lang: "id" | "en";
  data: Dict["ekspresiBudaya"];
  common: Dict["cultureCommon"];
}) {
  const sectionRef = useRef<HTMLElement>(null);

  const kelompokList = data.kelompokList;
  const [activeKelompok, setActiveKelompok] = useState(0);
  const [activeSlide, setActiveSlide] = useState(0);
  const [isPlaying, setIsPlaying] = useState(
    () =>
      ((kelompokList[0]?.items ?? []) as EkspresiItem[]).some((it) => it.video) ??
      false
  );

  const kelompok = kelompokList[activeKelompok];

  // Buka kelompok: klik buka panel; klik lagi pada tab yang sama menutup (collapse)
  const selectKelompok = (index: number) => {
    setActiveKelompok((prev) => {
      const willOpen = prev !== index;
      setActiveSlide(0);
      const target = willOpen ? index : prev;
      const nextHasVideo =
        ((kelompokList[target]?.items ?? []) as EkspresiItem[]).some(
          (it) => it.video
        ) ?? false;
      // Jika menutup, hentikan video; jika membuka yang bervideo, auto-play
      setIsPlaying(willOpen && nextHasVideo);
      if (!willOpen || !nextHasVideo) {
        Object.values(videoRefs.current).forEach((v) => v?.pause());
      }
      return willOpen ? index : -1;
    });
  };
  // Mainkan/jedakan video pada slide aktif sesuai state isPlaying.
  const videoRefs = useRef<Record<string, HTMLVideoElement | null>>({});

  useEffect(() => {
    const kelompok = kelompokList[activeKelompok];
    const items: EkspresiItem[] = kelompok?.items ?? [];
    items.forEach((it) => {
      const v = videoRefs.current[it.id];
      if (!v) return;
      if (isPlaying && it.video && items[activeSlide]?.id === it.id) {
        v.muted = true; // Force muted in DOM to satisfy mobile Safari's policy
        const targetSrc = it.video;
        if (!v.src || !v.src.endsWith(targetSrc)) {
          v.src = targetSrc;
          v.load();
        }
        v.play().catch(() => { });
      } else {
        v.pause();
        if (v.src && v.src !== "") {
          v.src = "";
          v.load();
        }
      }
    });
  }, [isPlaying, activeSlide, activeKelompok, kelompokList]);

  // Hentikan video saat section keluar viewport (hemat resource, §7.3.2)
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) {
          Object.values(videoRefs.current).forEach((v) => {
            if (v) {
              v.pause();
              if (v.src && v.src !== "") {
                v.src = "";
                v.load();
              }
            }
          });
          setIsPlaying(false);
        }
      },
      { threshold: 0.2 }
    );
    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const ctx = gsap.context(() => {
      if (prefersReduced) {
        gsap.set(".ekspresi-reveal", { opacity: 1, y: 0 });
        return;
      }
      gsap.utils.toArray<HTMLElement>(".ekspresi-reveal").forEach((el) => {
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

  // Kartu konten untuk satu item (media di atas, narasi di bawah).
  // Untuk grup dengan >1 item, kartu di-render sebagai SwiperSlide.
  const renderCard = (item: EkspresiItem, isActive = true) => {
    const Icon = ICONS[item.icon];
    const videoActive = !!(item.video && isPlaying && isActive);

    if (item.tracks && item.tracks.length > 0) {
      return (
        <div className="bg-white border border-brand/10 rounded-xl-design overflow-hidden">
          <EkspresiAudioPlayer
            key={item.id}
            lang={lang}
            audio={common.audio}
            tracks={item.tracks}
            fallbackCover={item.images[0]}
          />
        </div>
      );
    }

    return (
      <div
        id={`ekspresi-card-${item.id}`}
        role="tabpanel"
        aria-labelledby={`ekspresi-tab-${kelompok?.id}`}
        className="bg-white border border-brand/10 rounded-xl-design overflow-hidden"
      >
        <div className="relative w-full aspect-[4/3] md:aspect-[16/9] bg-black/5">
          {item.video && (
            <video
              ref={(el) => {
                videoRefs.current[item.id] = el;
              }}
              className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-500 ${
                videoActive ? "opacity-100 z-10" : "opacity-0 z-0 pointer-events-none"
              }`}
              poster={item.images[0]}
              preload="none"
              muted={true}
              loop={true}
              playsInline={true}
              controls={false}
              aria-label={`Video ${item.title}`}
            />
          )}

          <Image
            key={`${item.id}-0`}
            src={item.images[0]}
            alt={item.imageAlt}
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover object-center z-0"
          />
        </div>

        <div className="p-6 md:p-8">
          <div className="flex items-center gap-3 mb-3">
            <span
              className="flex h-9 w-9 items-center justify-center rounded-full bg-brand/10 text-brand"
              aria-hidden="true"
            >
              <Icon className="h-5 w-5" />
            </span>
            <h3 className="font-serif text-fluid-h3 text-black">{item.title}</h3>
          </div>
          <p className="font-sans text-fluid-body text-black/70 leading-relaxed">
            {item.desc}
          </p>
        </div>
      </div>
    );
  };

  return (
    <section
      id="ekspresi-budaya"
      ref={sectionRef}
      aria-labelledby="ekspresi-title"
      className="relative w-full snap-start snap-always bg-section z-[5] py-20 md:py-28 overflow-hidden"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-10 -right-10 md:-top-16 md:-right-16 w-[45vw] max-w-[520px] aspect-square z-0"
      >
        <Image
          src="/images/budaya/kei_warriors_dance.png"
          alt=""
          fill
          sizes="45vw"
          className="object-contain opacity-15 select-none [mask-image:radial-gradient(circle_at_top_right,black,transparent_72%)]"
          priority={false}
        />
      </div>

      <div className="relative z-[1] max-w-[98%] xl:max-w-[1600px] mx-auto px-4 md:px-8 w-full">
        <div className="max-w-3xl mb-12 md:mb-16">
          <p className="ekspresi-reveal font-sans text-fluid-eyebrow uppercase tracking-[0.2em] sm:tracking-[0.3em] text-balance text-brand mb-4">
            {data.eyebrow}
          </p>
          <h2
            id="ekspresi-title"
            className="ekspresi-reveal font-serif text-fluid-h2 text-black mb-5"
          >
            {data.title}
          </h2>
          <p className="ekspresi-reveal font-sans text-fluid-body text-black/70 leading-relaxed text-left">
            {data.intro}
          </p>
        </div>

        {/* MOBILE: accordion dropdown — TETAP seperti sebelumnya (jangan diubah). */}
        <div className="ekspresi-reveal flex flex-col gap-3 lg:hidden">
          {kelompokList.map((k, index) => {
            const Icon = ICONS[k.icon];
            const isOpen = index === activeKelompok;
            const kItems: EkspresiItem[] = k.items ?? [];
            const kShowSwipe = kItems.length > 1;
            return (
              <div
                key={k.id}
                className="rounded-xl-design border border-brand/10 bg-white/60 overflow-hidden"
              >
                <button
                  id={`ekspresi-kelompok-tab-${k.id}`}
                  type="button"
                  role="tab"
                  aria-selected={isOpen}
                  aria-expanded={isOpen}
                  aria-controls={`ekspresi-kelompok-panel-${k.id}`}
                  onClick={() => selectKelompok(index)}
                  className={`w-full flex items-center gap-3 p-4 md:p-5 text-left transition-colors focus-ring ${isOpen
                    ? "bg-white border-b border-brand/15"
                    : "bg-white/60 hover:bg-white"
                    }`}
                >
                  <span
                    className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full transition-colors ${isOpen ? "bg-brand text-white" : "bg-brand/10 text-brand"
                      }`}
                    aria-hidden="true"
                  >
                    <Icon className="h-5 w-5" />
                  </span>
                  <span className="flex-1 font-serif text-fluid-h4 text-black/80">
                    {k.label}
                  </span>
                  <ChevronRightIcon
                    className={`h-5 w-5 shrink-0 text-brand transition-transform duration-300 ${isOpen ? "rotate-90" : ""
                      }`}
                    aria-hidden="true"
                  />
                </button>

                {isOpen && (
                  <div
                    id={`ekspresi-kelompok-panel-${k.id}`}
                    role="tabpanel"
                    aria-labelledby={`ekspresi-kelompok-tab-${k.id}`}
                    className="p-5 md:p-8"
                  >
                    {/* <p className="font-sans text-fluid-body text-black/65 leading-relaxed max-w-3xl mb-6">
                      {k.desc}
                    </p> */}

                    {kShowSwipe ? (
                      <Swiper
                        modules={[Pagination, A11y, Keyboard]}
                        slidesPerView={1}
                        spaceBetween={16}
                        keyboard={{ enabled: true }}
                        pagination={{
                          clickable: true,
                          el: `.ekspresi-pagination-${k.id}`,
                        }}
                        onSlideChange={(s) => setActiveSlide(s.activeIndex)}
                        className="!pb-5 max-w-3xl mx-auto ekspresi-swiper"
                      >
                        {kItems.map((it, i) => (
                          <SwiperSlide key={it.id} className="!h-auto">
                            {renderCard(it, i === activeSlide)}
                          </SwiperSlide>
                        ))}
                      </Swiper>
                    ) : (
                      kItems[0] && (
                        <div className="max-w-3xl mx-auto">
                          {renderCard(kItems[0])}
                        </div>
                      )
                    )}

                    {kShowSwipe && (
                      <>
                        <div
                          className={`ekspresi-pagination-${k.id} flex items-center justify-center gap-2`}
                        />
                         <p className="text-center font-sans text-fluid-small text-black/45">
                          {common.ekspresi.swipeHint}
                          {kItems.map((it, i) => (
                            <span key={it.id}>
                              {i > 0 && ", "}
                              <span
                                className={
                                  i === activeSlide ? "text-brand font-medium" : ""
                                }
                              >
                                {it.title}
                              </span>
                            </span>
                          ))}
                        </p>
                      </>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* DESKTOP (lg+): tab di kiri, frame card di kanan. */}
        <div className="hidden lg:grid lg:grid-cols-12 gap-6 xl:gap-10 items-start">
          {/* Kolom kiri: daftar tab kelompok (tanpa panel, klik buka di kanan) */}
          <div
            className="lg:col-span-5 xl:col-span-4 flex flex-col gap-3"
            role="tablist"
            aria-label={common.ekspresi.tablistLabel}
          >
            {kelompokList.map((k, index) => {
              const Icon = ICONS[k.icon];
              const isOpen = index === activeKelompok;
              return (
                <button
                  key={k.id}
                  id={`ekspresi-kelompok-tab-d-${k.id}`}
                  type="button"
                  role="tab"
                  aria-selected={isOpen}
                  aria-expanded={isOpen}
                  aria-controls={`ekspresi-kelompok-panel-d-${k.id}`}
                  onClick={() => selectKelompok(index)}
                  className={`flex items-center gap-3 p-4 md:p-5 text-left rounded-xl-design border transition-colors focus-ring ${isOpen
                    ? "bg-white border-brand/30"
                    : "bg-white/60 border-brand/10 hover:border-brand/30 hover:bg-white"
                    }`}
                >
                  <span
                    className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full transition-colors ${isOpen ? "bg-brand text-white" : "bg-brand/10 text-brand"
                      }`}
                    aria-hidden="true"
                  >
                    <Icon className="h-5 w-5" />
                  </span>
                  <span className="flex-1 font-serif text-fluid-h4 text-black/80">
                    {k.label}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Kolom kanan: frame card kelompok yang sedang aktif */}
          <div className="lg:col-span-7 xl:col-span-8">
            <div className="sticky top-6">
              {kelompok && (
                <div
                  id={`ekspresi-kelompok-panel-d-${kelompok.id}`}
                  role="tabpanel"
                  aria-labelledby={`ekspresi-kelompok-tab-d-${kelompok.id}`}
                  className="bg-white/60 border border-brand/10 rounded-xl-design p-5 md:p-8"
                >
                  <KelompokPanel
                    lang={lang}
                    kelompok={kelompok}
                    common={common}
                    activeSlide={activeSlide}
                    onSlideChange={(i) => setActiveSlide(i)}
                    renderCard={renderCard}
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
