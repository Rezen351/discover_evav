import Link from "next/link";
import Image from "next/image";
import { ArrowLeftIcon, MapIcon } from "@heroicons/react/24/outline";

export const metadata = {
  title: "404 — Jejak Tak Ditemukan | Simfoni Evav",
  description: "Halaman tidak ditemukan. Seperti pasir yang tersapu ombak, halaman ini tidak dapat kami temukan di Kepulauan Kei.",
};

export default function NotFound() {
  return (
    <section className="relative w-full min-h-screen flex items-center justify-center bg-section px-6 py-12 overflow-hidden">
      {/* Background stars watermark */}
      <div 
        className="absolute inset-0 w-full h-full pointer-events-none z-0 opacity-15 select-none"
        style={{
          maskImage: "radial-gradient(circle at center, rgba(0,0,0,1) 30%, rgba(0,0,0,0) 85%)",
          WebkitMaskImage: "radial-gradient(circle at center, rgba(0,0,0,1) 30%, rgba(0,0,0,0) 85%)"
        }}
      >
        <Image
          src="/images/eksplorasi/kei_night_stars.png"
          alt="Bintang malam di Kepulauan Kei"
          fill
          sizes="100vw"
          className="object-cover object-center mix-blend-soft-light"
          priority
        />
      </div>

      {/* Decorative center halo */}
      <div 
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-[600px] aspect-square rounded-full pointer-events-none z-0 opacity-40 blur-3xl"
        style={{
          background: "radial-gradient(circle, rgba(230,103,124,0.15) 0%, rgba(111,194,190,0.1) 50%, transparent 70%)"
        }}
      ></div>

      <div className="relative z-10 max-w-xl w-full text-center flex flex-col items-center">
        {/* Large poetic 404 header */}
        <span 
          className="text-brand font-bold tracking-[0.3em] uppercase text-xs md:text-sm mb-6 block"
          style={{ fontFamily: "var(--font-sans)" }}
        >
          404 — JEJAK YANG HILANG
        </span>

        <h1 
          className="text-5xl md:text-7xl font-normal text-black mb-4 select-none"
          style={{ fontFamily: "var(--font-serif)" }}
        >
          Tersesat di Kei
        </h1>

        <blockquote 
          className="text-brand text-2xl md:text-3xl font-light mb-8 italic"
          style={{ fontFamily: "var(--font-cursive)" }}
        >
          &ldquo;Tersesat adalah awal penemuan keindahan tersembunyi.&rdquo;
        </blockquote>

        <p 
          className="text-black/60 text-sm md:text-base leading-relaxed mb-10 max-w-lg"
          style={{ fontFamily: "var(--font-sans)" }}
        >
          Seperti jejak kaki di pasir putih Pantai Ngurbloat yang tersapu oleh pasang surut air laut Meti Kei, halaman yang Anda cari tidak dapat kami temukan. Namun di Bumi Evav, tersesat bukanlah akhir—melainkan awal petualangan baru.
        </p>

        {/* CTA Buttons - Using the project standard btn-cta styles */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center w-full max-w-sm">
          <Link
            href="/"
            className="btn-cta group/btn flex items-center justify-center gap-2 border border-black hover:border-brand text-black hover:text-brand px-6 py-3.5 rounded-xl font-semibold text-sm transition-all duration-300 w-full hover:scale-[1.02] cursor-pointer"
            style={{ fontFamily: "var(--font-sans)" }}
          >
            <ArrowLeftIcon className="w-4 h-4 transition-transform group-hover/btn:-translate-x-1" />
            Kembali ke Beranda
          </Link>
          <Link
            href="/explore"
            className="btn-cta group/btn flex items-center justify-center gap-2 border border-black hover:border-brand text-black hover:text-brand px-6 py-3.5 rounded-xl font-semibold text-sm transition-all duration-300 w-full hover:scale-[1.02] cursor-pointer"
            style={{ fontFamily: "var(--font-sans)" }}
          >
            <MapIcon className="w-4 h-4 transition-transform group-hover/btn:rotate-6" />
            Jelajahi Destinasi
          </Link>
        </div>
      </div>
    </section>
  );
}
