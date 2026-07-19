"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  SparklesIcon,
  MusicalNoteIcon,
  SwatchIcon,
  MicrophoneIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  PlayIcon,
  PauseIcon,
} from "@heroicons/react/24/outline";
import { Shirt } from "lucide-react";
import { ekspresiBudaya, type EkspresiItem } from "@/content/culture";
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
};

export default function EkspresiBudayaSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  const [activeIndex, setActiveIndex] = useState(0);
  const [imageIndex, setImageIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  const active = activeIndex >= 0 ? ekspresiBudaya.items[activeIndex] : null;
  const totalImages = active ? active.images.length : 0;

  // Klik tab: buka jika belum aktif, tutup (collapse) jika sudah aktif
  const selectItem = (index: number) => {
    setActiveIndex((prev) => (prev === index ? -1 : index));
    setImageIndex(0);
    setIsPlaying(false);
    videoRef.current?.pause();
  };

  const prevImage = () =>
    setImageIndex((i) => (i - 1 + totalImages) % totalImages);
  const nextImage = () => setImageIndex((i) => (i + 1) % totalImages);

  const toggleVideo = () => {
    const video = videoRef.current;
    if (!video) return;
    if (video.paused) {
      video.play().catch(() => {});
      setIsPlaying(true);
    } else {
      video.pause();
      setIsPlaying(false);
    }
  };

  // Hentikan video saat section keluar viewport (hemat resource, §7.3.2)
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) {
          videoRef.current?.pause();
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

  // Kartu konten untuk satu item (media di atas, narasi di bawah — dipisah dari overlay)
  const renderCard = (item: EkspresiItem, index: number) => {
    const Icon = ICONS[item.icon];
    const total = item.images.length;

    if (item.tracks && item.tracks.length > 0) {
      return (
        <div className="bg-white border border-brand/10 rounded-xl-design shadow-card overflow-hidden">
          <EkspresiAudioPlayer
            key={item.id}
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
        aria-labelledby={`ekspresi-tab-${item.id}`}
        className="bg-white border border-brand/10 rounded-xl-design shadow-card overflow-hidden"
      >
        {/* Media — tanpa overlay teks agar rasio tetap bersih */}
        <div className="relative w-full aspect-[4/3] md:aspect-[16/9] bg-black/5">
          {item.video && isPlaying && index === activeIndex ? (
            <video
              ref={videoRef}
              className="absolute inset-0 h-full w-full object-cover"
              poster={item.images[imageIndex]}
              preload="none"
              muted
              loop
              playsInline
              aria-label={`Video ${item.title}`}
            >
              <source src={item.video} type="video/mp4" />
            </video>
          ) : (
            <Image
              key={`${item.id}-${imageIndex}`}
              src={item.images[imageIndex]}
              alt={item.imageAlt}
              fill
              sizes="(max-width: 1024px) 100vw, 60vw"
              className="object-cover object-center"
            />
          )}

          {/* Kontrol carousel — hanya bila lebih dari 1 gambar & video tidak main */}
          {total > 1 && !(item.video && isPlaying && index === activeIndex) && (
            <>
              <button
                type="button"
                onClick={prevImage}
                aria-label="Gambar sebelumnya"
                className="absolute left-3 top-1/2 -translate-y-1/2 z-10 flex h-12 w-12 lg:h-10 lg:w-10 items-center justify-center rounded-full bg-white/90 text-brand shadow-soft transition-colors hover:bg-brand hover:text-white focus-ring"
              >
                <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
              </button>
              <button
                type="button"
                onClick={nextImage}
                aria-label="Gambar berikutnya"
                className="absolute right-3 top-1/2 -translate-y-1/2 z-10 flex h-12 w-12 lg:h-10 lg:w-10 items-center justify-center rounded-full bg-white/90 text-brand shadow-soft transition-colors hover:bg-brand hover:text-white focus-ring"
              >
                <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
              </button>
              <div className="absolute top-3 left-1/2 -translate-x-1/2 flex gap-2 z-10 p-2 -m-2">
                {item.images.map((_, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => setImageIndex(i)}
                    aria-label={`Tampilkan gambar ${i + 1} dari ${total}`}
                    aria-current={i === imageIndex}
                    className={`h-2 rounded-full transition-all focus-ring ${
                      i === imageIndex ? "w-6 bg-brand" : "w-2 bg-black/30"
                    }`}
                  />
                ))}
              </div>
            </>
          )}

          {/* Tombol video (lazy — hanya untuk item bervideo) */}
          {item.video && (
            <button
              type="button"
              onClick={toggleVideo}
              aria-label={
                isPlaying && index === activeIndex
                  ? `Jeda video ${item.title}`
                  : `Putar video ${item.title}`
              }
              className="absolute right-3 top-3 z-10 flex items-center gap-2 min-h-[44px] lg:min-h-0 rounded-full bg-brand px-4 py-2 font-sans text-fluid-small font-semibold text-white shadow-soft transition-transform hover:scale-105 active:press focus-ring"
            >
              {isPlaying && index === activeIndex ? (
                <PauseIcon className="h-4 w-4" aria-hidden="true" />
              ) : (
                <PlayIcon className="h-4 w-4" aria-hidden="true" />
              )}
              {isPlaying && index === activeIndex ? "Jeda" : "Putar Video"}
            </button>
          )}
        </div>

        {/* Narasi — dipisah di bawah media (bukan overlay) */}
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
      {/* Foto dekoratif kanan atas */}
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
            {ekspresiBudaya.eyebrow}
          </p>
          <h2
            id="ekspresi-title"
            className="ekspresi-reveal font-serif text-fluid-h2 text-black mb-5"
          >
            {ekspresiBudaya.title}
          </h2>
          <p className="ekspresi-reveal font-sans text-fluid-body text-black/70 leading-relaxed text-left">
            {ekspresiBudaya.intro}
          </p>
        </div>

        {/* Mobile: accordion — kartu muncul tepat di bawah tab yang diklik.
            Semua tab (termasuk Nyanyian & Sastra Lisan) bisa di-collapse. */}
        <div className="lg:hidden flex flex-col gap-3">
          {ekspresiBudaya.items.map((item, index) => {
            const Icon = ICONS[item.icon];
            const isOpen = index === activeIndex;
            return (
              <div key={item.id} className="ekspresi-reveal">
                <button
                  id={`ekspresi-tab-${item.id}`}
                  type="button"
                  role="tab"
                  aria-selected={index === activeIndex}
                  aria-expanded={isOpen}
                  aria-controls={`ekspresi-card-${item.id}`}
                  onClick={() => selectItem(index)}
                  className={`w-full flex items-center justify-between gap-4 rounded-lg-design border p-4 text-left transition-colors focus-ring ${
                    index === activeIndex
                      ? "bg-white border-brand/30 shadow-soft"
                      : "bg-white/60 border-brand/10 hover:border-brand/30 hover:bg-white"
                  }`}
                >
                  <span className="flex items-center gap-4 min-w-0">
                    <span
                      className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-full transition-colors ${
                        index === activeIndex
                          ? "bg-brand text-white"
                          : "bg-brand/10 text-brand"
                      }`}
                      aria-hidden="true"
                    >
                      <Icon className="h-5 w-5" />
                    </span>
                    <span
                      className={`font-serif text-fluid-h4 truncate ${
                        index === activeIndex ? "text-black" : "text-black/70"
                      }`}
                    >
                      {item.title}
                    </span>
                  </span>
                  <ChevronRightIcon
                    className={`h-5 w-5 shrink-0 text-brand transition-transform duration-300 ${
                      isOpen ? "rotate-90" : ""
                    }`}
                    aria-hidden="true"
                  />
                </button>
                {isOpen && <div className="mt-3">{renderCard(item, index)}</div>}
              </div>
            );
          })}
        </div>

        {/* Desktop: split dua kolom (tabs kiri, panel kanan) — tampilan tetap */}
        <div className="hidden lg:grid grid-cols-12 gap-6 xl:gap-10 items-stretch">
          <div
            className="lg:col-span-4 flex flex-col gap-3"
            role="tablist"
            aria-label="Daftar ekspresi budaya Kei"
          >
            {ekspresiBudaya.items.map((item, index) => {
              const Icon = ICONS[item.icon];
              const isActive = index === activeIndex;
              return (
                <button
                  key={item.id}
                  id={`ekspresi-tab-${item.id}`}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  aria-controls={`ekspresi-card-${item.id}`}
                  onClick={() => selectItem(index)}
                  className={`flex items-center gap-4 rounded-lg-design border p-5 text-left transition-colors focus-ring ${
                    isActive
                      ? "bg-white border-brand/30 shadow-soft"
                      : "bg-white/60 border-brand/10 hover:border-brand/30 hover:bg-white"
                  }`}
                >
                  <span
                    className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-full transition-colors ${
                      isActive ? "bg-brand text-white" : "bg-brand/10 text-brand"
                    }`}
                    aria-hidden="true"
                  >
                    <Icon className="h-5 w-5" />
                  </span>
                  <span
                    className={`font-serif text-fluid-h4 ${
                      isActive ? "text-black" : "text-black/70"
                    }`}
                  >
                    {item.title}
                  </span>
                </button>
              );
            })}
          </div>

          <div className="lg:col-span-8 relative">
            {active ? (
              renderCard(active, activeIndex)
            ) : (
              <div className="bg-white/60 border border-brand/10 rounded-xl-design shadow-card h-full min-h-[320px] flex items-center justify-center p-8 text-center">
                <p className="font-sans text-fluid-body text-black/50">
                  Pilih salah satu ekspresi budaya Kei di sebelah kiri untuk
                  melihat lebih lanjut.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
