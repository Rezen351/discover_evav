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

  const active = ekspresiBudaya.items[activeIndex];
  const totalImages = active.images.length;

  // Reset galeri saat item berganti
  const selectItem = (index: number) => {
    setActiveIndex(index);
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

  const ActiveIcon = ICONS[active.icon];

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
          <p className="ekspresi-reveal font-sans text-fluid-eyebrow uppercase tracking-[0.3em] text-brand mb-4">
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

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 xl:gap-10 items-stretch">
          {/* Kolom kiri — daftar ekspresi (tab vertikal) */}
          <div
            className="ekspresi-reveal lg:col-span-4 flex flex-col gap-3"
            role="tablist"
            aria-label="Daftar ekspresi budaya Kei"
          >
            {ekspresiBudaya.items.map((item, index) => {
              const Icon = ICONS[item.icon];
              const isActive = index === activeIndex;
              return (
                <button
                  key={item.id}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  aria-controls="ekspresi-panel"
                  onClick={() => selectItem(index)}
                  className={`flex items-center gap-4 rounded-lg-design border p-4 md:p-5 text-left transition-colors focus-ring ${
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

          {/* Kolom kanan — panel media + narasi */}
          <div
            id="ekspresi-panel"
            role="tabpanel"
            aria-labelledby="ekspresi-title"
            className="ekspresi-reveal lg:col-span-8 bg-white border border-brand/10 rounded-xl-design shadow-card overflow-hidden flex flex-col lg:relative"
          >
            {active.tracks && active.tracks.length > 0 ? (
              /* Panel audio bergaya Spotify — dibatasi setinggi kolom kiri */
              <div className="lg:absolute lg:inset-0">
                <EkspresiAudioPlayer
                  key={active.id}
                  tracks={active.tracks}
                  fallbackCover={active.images[0]}
                />
              </div>
            ) : (
              <div className="lg:absolute lg:inset-0 flex flex-col">
            {/* Media */}
            <div className="relative w-full aspect-[16/10] md:aspect-[16/9] lg:aspect-auto bg-black/5 flex-1">
              {active.video && isPlaying ? (
                <video
                  ref={videoRef}
                  className="absolute inset-0 h-full w-full object-cover"
                  poster={active.images[0]}
                  preload="none"
                  muted
                  loop
                  playsInline
                  aria-label={`Video ${active.title}`}
                >
                  <source src={active.video} type="video/mp4" />
                </video>
              ) : (
                <Image
                  key={`${active.id}-${imageIndex}`}
                  src={active.images[imageIndex]}
                  alt={active.imageAlt}
                  fill
                  sizes="(max-width: 1024px) 100vw, 60vw"
                  className="object-cover object-center"
                />
              )}

              {/* Overlay bawah untuk kontras teks & kontrol */}
              <div
                aria-hidden="true"
                className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent pointer-events-none"
              />

              {/* Kontrol carousel — hanya bila lebih dari 1 gambar & video tidak main */}
              {totalImages > 1 && !(active.video && isPlaying) && (
                <>
                  <button
                    type="button"
                    onClick={prevImage}
                    aria-label="Gambar sebelumnya"
                    className="absolute left-3 top-1/2 -translate-y-1/2 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-white/90 text-brand shadow-soft transition-colors hover:bg-brand hover:text-white focus-ring"
                  >
                    <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
                  </button>
                  <button
                    type="button"
                    onClick={nextImage}
                    aria-label="Gambar berikutnya"
                    className="absolute right-3 top-1/2 -translate-y-1/2 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-white/90 text-brand shadow-soft transition-colors hover:bg-brand hover:text-white focus-ring"
                  >
                    <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
                  </button>
                  <div className="absolute top-3 left-1/2 -translate-x-1/2 flex gap-2 z-10">
                    {active.images.map((_, i) => (
                      <button
                        key={i}
                        type="button"
                        onClick={() => setImageIndex(i)}
                        aria-label={`Tampilkan gambar ${i + 1} dari ${totalImages}`}
                        aria-current={i === imageIndex}
                        className={`h-2 rounded-full transition-all focus-ring ${
                          i === imageIndex ? "w-6 bg-white" : "w-2 bg-white/60"
                        }`}
                      />
                    ))}
                  </div>
                </>
              )}

              {/* Tombol video (lazy — hanya untuk item bervideo) */}
              {active.video && (
                <button
                  type="button"
                  onClick={toggleVideo}
                  aria-label={isPlaying ? `Jeda video ${active.title}` : `Putar video ${active.title}`}
                  className="absolute right-3 top-3 z-10 flex items-center gap-2 rounded-full bg-brand px-4 py-2 font-sans text-fluid-small font-semibold text-white shadow-soft transition-transform hover:scale-105 active:press focus-ring"
                >
                  {isPlaying ? (
                    <PauseIcon className="h-4 w-4" aria-hidden="true" />
                  ) : (
                    <PlayIcon className="h-4 w-4" aria-hidden="true" />
                  )}
                  {isPlaying ? "Jeda" : "Putar Video"}
                </button>
              )}

              {/* Narasi — overlay di depan gambar */}
              <div className="absolute inset-x-0 bottom-0 z-10 p-6 md:p-8">
                <div className="flex items-center gap-3 mb-3">
                  <span
                    className="flex h-9 w-9 items-center justify-center rounded-full bg-white/15 text-white backdrop-blur-sm"
                    aria-hidden="true"
                  >
                    <ActiveIcon className="h-5 w-5" />
                  </span>
                  <h3 className="font-serif text-fluid-h3 text-white drop-shadow-sm">
                    {active.title}
                  </h3>
                </div>
                <p className="font-sans text-fluid-body text-white/85 leading-relaxed drop-shadow-sm">
                  {active.desc}
                </p>
              </div>
            </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
