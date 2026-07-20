"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import Image from "next/image";
import { ChevronRightIcon } from "@heroicons/react/24/outline";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SocialIcon from "@/components/SocialIcon";
import { SOCIAL_MOSAIC_CHANNELS } from "@/content/social";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

type MosaicTileLang = {
  src: string;
  idAlt: string;
  enAlt: string;
  idCaption: string;
  enCaption: string;
  /** kelas aspect-ratio bervariasi untuk kolase */
  aspect: string;
};

const TILES: MosaicTileLang[] = [
  {
    src: "/images/eksplorasi/kei_ngurbloat.png",
    idAlt: "Pantai Ngurbloat — pasir terhalus di dunia, Kei",
    enAlt: "Ngurbloat Beach — the softest sand in the world, Kei",
    idCaption: "Senja di Ngurbloat — Kei",
    enCaption: "Sunset at Ngurbloat — Kei",
    aspect: "aspect-[4/5]",
  },
  {
    src: "/images/budaya/tari-sawat-infopublik.jpg",
    idAlt: "Tarian Sawat penyambut tamu dalam upacara adat Kei",
    enAlt: "The Sawat dance welcoming guests in a Kei traditional ceremony",
    idCaption: "Tari Sawat — warisan adat Evav",
    enCaption: "Sawat Dance — Evav cultural heritage",
    aspect: "aspect-[4/3]",
  },
  {
    src: "/images/eksplorasi/kei_ngurtavur.png",
    idAlt: "Pulau Ngurtavur dengan pasir putih melengkung di tengah laut biru",
    enAlt: "Ngurtavur Island with curved white sand in the middle of blue sea",
    idCaption: "Ngurtavur — pasir putih melengkung",
    enCaption: "Ngurtavur — curved white sand",
    aspect: "aspect-[1/1]",
  },
  {
    src: "/images/eksplorasi/kei_mosaic_1.png",
    idAlt: "Warga Kei beraktivitas di tepian pantai saat fenomena Meti",
    enAlt: "Kei locals gathering at the shoreline during the Meti low-tide phenomenon",
    idCaption: "Meti Kei — laut surut serentak",
    enCaption: "Kei Meti — the sea recedes at once",
    aspect: "aspect-[3/4]",
  },
  {
    src: "/images/eksplorasi/kei_hawang.png",
    idAlt: "Danau Hawang dengan air jernih kehijauan di Kepulauan Kei",
    enAlt: "Lake Hawang with clear greenish water in the Kei Islands",
    idCaption: "Danau Hawang — air jernih kehijauan",
    enCaption: "Lake Hawang — clear greenish water",
    aspect: "aspect-[4/5]",
  },
  {
    src: "/images/budaya/kei_warriors_dance.png",
    idAlt: "Penari perang tradisional Kei dalam busana adat",
    enAlt: "Traditional Kei war dancers in ceremonial attire",
    idCaption: "Tarian perang penyambut tamu",
    enCaption: "War dance welcoming guests",
    aspect: "aspect-[4/3]",
  },
  {
    src: "/images/eksplorasi/snorkeling-ngurtavur-zanzztoy.jpg",
    idAlt: "Wisatawan snorkeling menikmati terumbu karang di perairan Kei",
    enAlt: "A traveler snorkeling among coral reefs in Kei waters",
    idCaption: "Snorkeling — terumbu karang Kei",
    enCaption: "Snorkeling — Kei coral reefs",
    aspect: "aspect-[1/1]",
  },
  {
    src: "/images/eksplorasi/kei_waving.png",
    idAlt: "Warga Kei menyapa pengunjung dengan tangan melambai khas keramahtamahan Evav",
    enAlt: "Kei locals waving to visitors with the warm Evav hospitality",
    idCaption: "Keramahtamahan Evav",
    enCaption: "Evav hospitality",
    aspect: "aspect-[3/4]",
  },
  {
    src: "/images/eksplorasi/kei_beach.png",
    idAlt: "Pesisir pantai Kei dengan perahu nelayan tradisional",
    enAlt: "Kei coastline with traditional fishing boats",
    idCaption: "Pesisir dan perahu nelayan",
    enCaption: "Coastline and fishing boats",
    aspect: "aspect-[4/5]",
  },
  {
    src: "/images/budaya/kei_coast_sunset.png",
    idAlt: "Pesisir Kei saat senja dengan cahaya jingga memantul di laut",
    enAlt: "Kei coast at dusk with orange light reflecting on the sea",
    idCaption: "Senja di pesisir Evav",
    enCaption: "Dusk on the Evav coast",
    aspect: "aspect-[4/3]",
  },
  {
    src: "/images/eksplorasi/kei_resort.png",
    idAlt: "Sawah Laut resort dengan pondokan di atas air di Kei",
    enAlt: "Sawah Laut resort with overwater huts in Kei",
    idCaption: "Istirahat di atas pasir",
    enCaption: "Resting above the sand",
    aspect: "aspect-[1/1]",
  },
  {
    src: "/images/heritage/kampung-selayar-.png",
    idAlt: "Kampung Selayar — salah satu dari tujuh kampung adat Kei dengan rumah tradisional",
    enAlt: "Selayar Village — one of the seven Kei adat villages with traditional houses",
    idCaption: "Kampung Selayar — rumah adat",
    enCaption: "Selayar Village — traditional houses",
    aspect: "aspect-[3/4]",
  },
];

const CHANNELS = SOCIAL_MOSAIC_CHANNELS;

export default function SocialMosaicSection({ lang }: { lang: "id" | "en" }) {
  const sectionRef = useRef<HTMLElement>(null);
  const wallRef = useRef<HTMLDivElement>(null);
  // Indeks gambar yang sedang ditampilkan tiap tile (untuk efek ganti acak)
  const [display, setDisplay] = useState<number[]>(() => TILES.map((_, i) => i));

  const shuffleTick = useCallback(() => {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) return;
    // Ganti 1–2 tile secara acak ke gambar acak lainnya
    setDisplay((prev) => {
      const next = [...prev];
      const swaps = 1 + Math.floor(Math.random() * 2);
      for (let s = 0; s < swaps; s++) {
        const idx = Math.floor(Math.random() * next.length);
        let pick = Math.floor(Math.random() * TILES.length);
        if (pick === next[idx]) pick = (pick + 1) % TILES.length;
        next[idx] = pick;
      }
      return next;
    });
  }, []);

  useEffect(() => {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) return;

    const ctx = gsap.context(() => {
      gsap.from(wallRef.current?.children ?? [], {
        y: 40,
        opacity: 0,
        duration: 0.7,
        ease: "power2.out",
        stagger: 0.06,
        scrollTrigger: {
          trigger: wallRef.current,
          start: "top 85%",
          toggleActions: "play none none reverse",
        },
      });
    }, sectionRef);

    // Efek foto berganti secara acak (interval tidak seragam)
    let timer: ReturnType<typeof setTimeout>;
    const schedule = () => {
      const delay = 1800 + Math.random() * 2400; // 1.8s–4.2s acak
      timer = setTimeout(() => {
        shuffleTick();
        schedule();
      }, delay);
    };
    schedule();

    return () => {
      clearTimeout(timer);
      ctx.revert();
    };
  }, [shuffleTick]);

  return (
    <section
      id="ruang-bersama"
      ref={sectionRef}
      className="relative w-full min-h-screen snap-start snap-always flex items-center justify-center bg-section z-[2] py-16 md:py-24"
    >
      <div className="max-w-[98%] xl:max-w-[1600px] mx-auto px-4 md:px-8 w-full">
        <div className="max-w-3xl mx-auto text-center mb-12 md:mb-16">
          <span
            className="text-brand font-bold tracking-[0.25em] uppercase text-xs md:text-sm mb-4 inline-block"
            style={{ fontFamily: "var(--font-sans)" }}
          >
            {lang === "en" ? "Shared Space" : "Ruang Bersama"}
          </span>
          <h2
            className="text-fluid-h2 font-normal text-black"
            style={{ fontFamily: "var(--font-serif)" }}
          >
            {lang === "en" ? (
              <>
                Kei,{" "}
                <span className="text-brand">Alive Today</span>
              </>
            ) : (
              <>
                Kei yang{" "}
                <span className="text-brand">Hidup Hari Ini</span>
              </>
            )}
          </h2>
          <p
            className="mt-5 text-base md:text-lg leading-relaxed text-black/60 font-light"
            style={{ fontFamily: "var(--font-sans)" }}
          >
            {lang === "en"
              ? "Most of our stories pulse on social media — from the morning surf to the sunset over Ngurbloat's sand. See everyday Evav life, then become part of it."
              : "Sebagian besar kisah kami berdenyut di media sosial — dari debur ombak pagi hingga senja di atas pasir Ngurbloat. Lihat kehidupan Evav sehari-hari, lalu jadilah bagian darinya."}
          </p>
        </div>

        <div
          ref={wallRef}
          className="columns-2 md:columns-3 xl:columns-4 gap-4"
        >
          {TILES.map((tile, slot) => {
            const active = TILES[display[slot]];
            return (
              <figure
                key={tile.src}
                className={`break-inside-avoid rounded-lg-design overflow-hidden shadow-soft border border-brand/20 group relative mb-4 ${tile.aspect}`}
              >
                <div className="relative w-full h-full">
                  <Image
                    src={active.src}
                    alt={lang === "en" ? active.enAlt : active.idAlt}
                    fill
                    sizes="(max-width: 768px) 50vw, (max-width: 1280px) 33vw, 25vw"
                    className="object-cover w-full h-full transition-all duration-700 ease-in-out group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                  <figcaption
                    className="absolute bottom-0 left-0 right-0 p-4 text-white text-sm md:text-base leading-snug font-light translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 line-clamp-2"
                    style={{ fontFamily: "var(--font-sans)" }}
                  >
                    {lang === "en" ? active.enCaption : active.idCaption}
                  </figcaption>
                </div>
              </figure>
            );
          })}
        </div>

        <div className="mt-12 md:mt-16 flex flex-col items-center">
          <div className="flex flex-wrap items-center justify-center gap-3">
            {CHANNELS.map(({ label, href, platform }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={lang === "en" ? `Follow Discover Evav on ${label}` : `Ikuti Discover Evav di ${label}`}
                className="flex items-center gap-2 bg-white/70 border border-brand/30 text-black/60 hover:text-brand hover:bg-white rounded-full p-3 focus-ring transition-colors"
                style={{ fontFamily: "var(--font-sans)" }}
              >
                <SocialIcon platform={platform} className="w-5 h-5" />
                <span className="text-sm font-medium pr-1">{label}</span>
              </a>
            ))}
          </div>

          <p
            className="mt-6 text-sm md:text-base text-black/60 font-light"
            style={{ fontFamily: "var(--font-sans)" }}
          >
            {lang === "en" ? "Tap one to enter our space" : "Tap satu untuk masuk ke ruang kami"}
          </p>

          <a
            href="https://instagram.com/discoverkei"
            target="_blank"
            rel="noopener noreferrer"
            aria-label={lang === "en" ? "View the Discover Evav gallery" : "Lihat galeri Discover Evav"}
            className="btn-cta inline-flex items-center gap-2 mt-4 rounded-full px-6 py-2.5 text-sm font-semibold focus-ring"
            style={{ fontFamily: "var(--font-sans)" }}
          >
            {lang === "en" ? "View Gallery" : "Lihat Galeri"}
            <ChevronRightIcon className="w-4 h-4 text-current" />
          </a>
        </div>
      </div>
    </section>
  );
}
