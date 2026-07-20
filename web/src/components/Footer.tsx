"use client";

import { useState, useEffect, memo } from "react";
import Image from "next/image";
import Link from "next/link";
import SocialIcon from "@/components/SocialIcon";
import { SOCIAL_LINKS } from "@/content/social";

const allImages = [
  { src: "/images/eksplorasi/kei_mosaic_1.png", alt: "Spot Wisata Kei" },
  { src: "/images/eksplorasi/kei_mosaic_1.png", alt: "Kehidupan Laut Kei" },
  { src: "/images/satwa/kei_coral.png", alt: "Ikan Terumbu Karang" },
  { src: "/images/satwa/kei_underwater.png", alt: "Bawah Laut Kei" },
  { src: "/images/kuliner/kei_culinary_fish.png", alt: "Hidangan Laut Kei" },
  { src: "/images/kuliner/kei_umkm_enbal_bunga_1.jpeg", alt: "Kuliner Enbal" },
  { src: "/images/kuliner/kei_umkm_kacang_botol_1.jpeg", alt: "Olahan Mangrove" },
  { src: "/images/kuliner/kei_sagu.jpg", alt: "Proses Sagu" },
  { src: "/images/kuliner/kei_umkm_enbal_bunga_2.jpeg", alt: "Wajah UMKM Kei" },
  { src: "/images/kuliner/kei_umkm_kerupuk_enbal_super.jpeg", alt: "Oleh-oleh Kuliner Kei" },
  { src: "/images/eksplorasi/wer_warat.png", alt: "Pantai Wer Warat" },
  { src: "/images/eksplorasi/kei_ngurbloat.png", alt: "Pantai Ngurbloat" },
];

// Tautan sosial media (sumber terpusat: src/content/social.ts).
const socials = SOCIAL_LINKS;

// Tata letak puzzle asimetris (variasi lebar kolom) — efek seperti puzzle dinamis.
const tileSpans = [
  "col-span-5",            // Block 1 (lebar)
  "col-span-1 row-span-2",  // Block 2 (portrait tengah melintasi 2 baris)
  "col-span-3",            // Block 3
  "col-span-2",            // Block 4
  "col-span-1",            // Block 5 (terkecil kanan)
  "col-span-2",            // Block 6
  "col-span-3",            // Block 7
  "col-span-5",            // Block 8 (lebar)
  "col-span-1",            // Block 9 (terkecil kanan)
];

// Tile kartu dengan cross-fade saat src berganti (bukan swap instan).
const PuzzleTile = memo(function PuzzleTile({
  img,
  span,
}: {
  img: { src: string; alt: string };
  span: string;
}) {
  const [prevImg, setPrevImg] = useState<{ src: string; alt: string } | null>(null);
  const [currentImg, setCurrentImg] = useState(img);
  const [isTransitioning, setIsTransitioning] = useState(false);

  // Sesuaikan state secara sinkron saat render jika prop img berubah
  if (img.src !== currentImg.src) {
    setPrevImg(currentImg);
    setCurrentImg(img);
    setIsTransitioning(true);
  }

  useEffect(() => {
    if (isTransitioning) {
      const t = window.setTimeout(() => {
        setIsTransitioning(false);
        setPrevImg(null);
      }, 700);
      return () => window.clearTimeout(t);
    }
  }, [isTransitioning]);

  return (
    <div
      className={`relative w-full rounded-lg-design overflow-hidden shadow-md border border-white/5 hover:border-brand/30 hover:scale-[1.04] transition-all duration-500 cursor-pointer group ${span}`}
    >
      {/* Background: gambar lama (hanya tampil saat transisi) */}
      {prevImg && (
        <Image
          src={prevImg.src}
          alt={prevImg.alt}
          fill
          sizes="(max-width: 768px) 33vw, 16vw"
          className="object-cover transition-all duration-700 ease-in-out group-hover:scale-105"
        />
      )}

      {/* Foreground: gambar baru yang fade-in */}
      <Image
        src={currentImg.src}
        alt={currentImg.alt}
        fill
        sizes="(max-width: 768px) 33vw, 16vw"
        className={`object-cover transition-all duration-700 ease-in-out group-hover:scale-105 ${
          isTransitioning
            ? "opacity-0 animate-[tileFadeIn_0.7s_ease-out_forwards]"
            : "opacity-100"
        }`}
      />
      <div className="absolute inset-0 bg-black/40 group-hover:bg-black/10 transition-colors duration-300" />
    </div>
  );
});

export default function Footer() {
  const [mapping, setMapping] = useState<number[]>(() =>
    Array.from({ length: tileSpans.length }, (_, i) => i)
  );

  useEffect(() => {
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReduced) return;

    const interval = window.setInterval(() => {
      setMapping((prev) => {
        // Pilih satu indeks ubin secara acak (0 - 8)
        const randomTileIdx = Math.floor(Math.random() * tileSpans.length);
        
        // Cari gambar yang saat ini tidak ditampilkan di layar
        const allIndices = allImages.map((_, i) => i);
        const unusedIndices = allIndices.filter((idx) => !prev.includes(idx));

        if (unusedIndices.length === 0) return prev; // Jika tidak ada sisa gambar, lewatkan
        
        // Pilih satu gambar acak dari kumpulan gambar yang tidak terpakai
        const newImageIdx = unusedIndices[Math.floor(Math.random() * unusedIndices.length)];

        // Ganti ubin tersebut dengan gambar baru
        const next = [...prev];
        next[randomTileIdx] = newImageIdx;
        return next;
      });
    }, 2500); // Ganti gambar satu per satu setiap 2.5 detik

    return () => window.clearInterval(interval);
  }, []);

  return (
    <footer id="footer" className="relative w-full bg-tropical-dark text-white py-6 md:py-8 z-[3] border-t border-brand/10 snap-start snap-normal">
      {/* Decorative gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-[var(--color-tropical-dark)] via-[var(--color-tropical-dark-2)] to-[var(--color-tropical-dark-2)] z-[1] pointer-events-none"></div>

      <div className="relative z-[2] max-w-[98%] xl:max-w-[1600px] mx-auto px-4 md:px-8 flex flex-col lg:flex-row justify-between items-center gap-8">

        {/* LEFT COLUMN: Brand Info & Socials */}
        <div className="flex flex-col items-center lg:items-start text-center lg:text-left lg:w-[35%] gap-3">
          <div>
            <span className="text-brand font-bold tracking-[0.25em] uppercase text-[10px] md:text-xs mb-2 inline-block" style={{ fontFamily: "var(--font-sans)" }}>
              PERJALANAN TAK TERLUPAKAN
            </span>
            <h2 className="text-2xl md:text-3xl text-white font-normal leading-tight" style={{ fontFamily: "var(--font-serif)" }}>
              Setiap Momen, Sebuah Cerita
            </h2>
          </div>

          {/* Logo & Description */}
          <div className="flex flex-col md:flex-row items-center gap-3 mt-1">
            <div className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center flex-shrink-0 bg-white/5">
              <Image src="/logo-white.svg" alt="Simfoni Evav" width={28} height={28} unoptimized className="w-7 h-7 object-contain brightness-0 invert" />
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-bold tracking-widest text-white/95 uppercase" style={{ fontFamily: "var(--font-sans)" }}>
                SIMFONI EVAV
              </span>
              <p className="text-[11px] text-white/50 leading-relaxed max-w-[280px] mt-1 font-light" style={{ fontFamily: "var(--font-sans)" }}>
                Menyatukan alam, budaya, dan teknologi untuk masa depan yang lestari di Kepulauan Kei.
              </p>
            </div>
          </div>

          {/* Social Icons (brand — SocialIcon / FontAwesome §17.3) */}
          <div className="flex items-center gap-4 mt-1">
            {socials.map((s) => (
              <a
                key={s.platform}
                href={s.href}
                target="_blank"
                rel="noreferrer"
                aria-label={s.label}
                className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/60 hover:text-brand hover:bg-white/10 hover:border-brand/30 transition-all"
              >
                <SocialIcon platform={s.platform} className="w-4 h-4" />
              </a>
            ))}
          </div>
        </div>

        {/* RIGHT COLUMN: Image Puzzle Grid — kartu berganti gambar acak (cross-fade) */}
        <div className="w-full lg:w-[62%] overflow-hidden">
          <div className="grid grid-cols-6 lg:grid-cols-12 auto-rows-[60px] md:auto-rows-[72px] lg:auto-rows-[96px] gap-2 md:gap-3">
            {tileSpans.map((span, idx) => {
              const img = allImages[mapping[idx] % allImages.length];
              return (
                <PuzzleTile key={idx} img={img} span={span} />
              );
            })}
          </div>
        </div>

      </div>

      {/* COPYRIGHT FOOTNOTE */}
      <div className="relative z-[2] mt-6 border-t border-white/5 pt-4 text-center">
        <nav
          aria-label="Halaman legal"
          className="flex flex-wrap items-center justify-center gap-x-4 gap-y-1 mb-2"
        >
          <Link
            href="/kebijakan-privasi"
            className="text-[11px] md:text-xs text-white/40 font-light tracking-widest hover:text-brand transition-colors"
            style={{ fontFamily: "var(--font-sans)" }}
          >
            Kebijakan Privasi
          </Link>
          <span className="text-white/15 text-[11px]">·</span>
          <Link
            href="/syarat-ketentuan"
            className="text-[11px] md:text-xs text-white/40 font-light tracking-widest hover:text-brand transition-colors"
            style={{ fontFamily: "var(--font-sans)" }}
          >
            Syarat &amp; Ketentuan
          </Link>
          <span className="text-white/15 text-[11px]">·</span>
          <Link
            href="/disclaimer"
            className="text-[11px] md:text-xs text-white/40 font-light tracking-widest hover:text-brand transition-colors"
            style={{ fontFamily: "var(--font-sans)" }}
          >
            Disclaimer
          </Link>
          <span className="text-white/15 text-[11px]">·</span>
          <Link
            href="/kebijakan-cookie"
            className="text-[11px] md:text-xs text-white/40 font-light tracking-widest hover:text-brand transition-colors"
            style={{ fontFamily: "var(--font-sans)" }}
          >
            Kebijakan Cookie
          </Link>
        </nav>
        <p className="text-[11px] md:text-xs text-white/35 font-light tracking-widest" style={{ fontFamily: "var(--font-sans)" }}>
          &copy; 2026 Simfoni Evav. Semua Hak Dilindungi.
        </p>
      </div>
    </footer>
  );
}
