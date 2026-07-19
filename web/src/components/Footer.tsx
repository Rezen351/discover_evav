"use client";

import Image from "next/image";
import { FaYoutube, FaInstagram, FaFacebookF, FaTiktok } from "react-icons/fa";
export default function Footer() {
  const galleryImages = [
    { src: "/images/meti/kei_mosaic_4.png", alt: "Spot Wisata Kei" },
    { src: "/images/meti/kei_mosaic_5.png", alt: "Kehidupan Laut Kei" },
    { src: "/images/satwa/kei_reef_fish.png", alt: "Ikan Terumbu Karang" },
    { src: "/images/satwa/kei_underwater.png", alt: "Bawah Laut Kei" },
    { src: "/images/kuliner/kei_culinary_fish.png", alt: "Hidangan Laut Kei" },
    { src: "/images/kuliner/kei_enbal_bunga.png", alt: "Kuliner Enbal" },
    { src: "/images/kuliner/kei_mangrove_stick.png", alt: "Olahan Mangrove" },
    { src: "/images/kuliner/kei_sagu_process.png", alt: "Proses Sagu" },
    { src: "/images/budaya/kei_umkm_face_2.png", alt: "Wajah UMKM Kei" },
    { src: "/images/budaya/kei_umkm_face_3.png", alt: "Masyarakat Kei" },
  ];

  return (
    <footer id="footer" className="relative w-full bg-tropical-dark text-white py-12 md:py-16 z-[3] border-t border-brand/10 snap-start snap-normal">
      {/* Decorative gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-[var(--color-tropical-dark)] via-[var(--color-tropical-dark-2)] to-[var(--color-tropical-dark-2)] z-[1] pointer-events-none"></div>

      <div className="relative z-[2] max-w-[98%] xl:max-w-[1600px] mx-auto px-4 md:px-8 flex flex-col lg:flex-row justify-between items-center gap-12">

        {/* LEFT COLUMN: Brand Info & Socials */}
        <div className="flex flex-col items-center lg:items-start text-center lg:text-left lg:w-[35%] gap-4">
          <div>
            <span className="text-brand font-bold tracking-[0.25em] uppercase text-[10px] md:text-xs mb-2 inline-block" style={{ fontFamily: "var(--font-sans)" }}>
              PERJALANAN TAK TERLUPAKAN
            </span>
            <h2 className="text-3xl md:text-4xl text-white font-normal leading-tight" style={{ fontFamily: "var(--font-serif)" }}>
              Setiap Momen, Sebuah Cerita
            </h2>
          </div>

          {/* Logo & Description */}
          <div className="flex flex-col md:flex-row items-center gap-4 mt-2">
            <div className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center flex-shrink-0 bg-white/5">
              <img src="/Logo White.svg" alt="Simfoni Evav" className="w-8 h-8 object-contain brightness-0 invert" />
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

          {/* Social Icons */}
          <div className="flex items-center gap-5 mt-2">
            <a href="https://youtube.com" target="_blank" rel="noreferrer" aria-label="Simfoni Evav di YouTube" className="w-9 h-9 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/60 hover:text-brand hover:bg-white/10 hover:border-brand/30 transition-all text-lg">
              <FaYoutube />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noreferrer" aria-label="Simfoni Evav di Instagram" className="w-9 h-9 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/60 hover:text-brand hover:bg-white/10 hover:border-brand/30 transition-all text-lg">
              <FaInstagram />
            </a>
            <a href="https://facebook.com" target="_blank" rel="noreferrer" aria-label="Simfoni Evav di Facebook" className="w-9 h-9 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/60 hover:text-brand hover:bg-white/10 hover:border-brand/30 transition-all text-lg">
              <FaFacebookF />
            </a>
            <a href="https://tiktok.com" target="_blank" rel="noreferrer" aria-label="Simfoni Evav di TikTok" className="w-9 h-9 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/60 hover:text-brand hover:bg-white/10 hover:border-brand/30 transition-all text-lg">
              <FaTiktok />
            </a>
          </div>
        </div>

        {/* RIGHT COLUMN: Image Gallery Grid */}
        <div className="w-full lg:w-[62%] overflow-hidden">
          <div className="grid grid-cols-5 gap-3">
            {galleryImages.map((img, idx) => (
              <div
                key={idx}
                className="relative w-full aspect-square rounded-lg-design overflow-hidden shadow-md border border-white/5 hover:border-brand/30 hover:scale-[1.04] transition-all duration-300 cursor-pointer group"
              >
                <Image
                  src={img.src}
                  alt={img.alt}
                  fill
                  sizes="(max-width: 768px) 20vw, 12vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/10 transition-colors duration-300"></div>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* COPYRIGHT FOOTNOTE */}
      <div className="relative z-[2] mt-12 border-t border-white/5 pt-6 text-center">
        <p className="text-[10px] md:text-xs text-white/35 font-light tracking-widest" style={{ fontFamily: "var(--font-sans)" }}>
          &copy; 2026 Simfoni Evav. Semua Hak Dilindungi.
        </p>
      </div>
    </footer>
  );
}
