"use client";

import { useEffect, useRef } from "react";
import {
  HandRaisedIcon,
  HeartIcon,
  ChatBubbleLeftIcon,
} from "@heroicons/react/24/outline";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const janjiSambutan = [
  {
    icon: HandRaisedIcon,
    label: "Kami baca setiap sapaan seperti surat dari saudara.",
    ariaLabel: "Janji sambutan: membaca sapaan seperti surat dari saudara",
  },
  {
    icon: HeartIcon,
    label: "Tidak ada pertanyaan yang terlalu kecil untuk Kei.",
    ariaLabel: "Janji sambutan: tiada pertanyaan terlalu kecil untuk Kei",
  },
  {
    icon: ChatBubbleLeftIcon,
    label: "Jika kau tersesat, kami yang akan menuntunmu kembali.",
    ariaLabel: "Janji sambutan: menuntunmu kembali jika tersesat",
  },
];

export default function KeterhubunganIntroSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const ctx = gsap.context(() => {
      if (prefersReduced) {
        gsap.set(".keterhubungan-card", { opacity: 1, y: 0 });
        return;
      }

      gsap.from(".keterhubungan-card", {
        opacity: 0,
        y: 36,
        duration: 0.9,
        stagger: 0.18,
        ease: "power2.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
          toggleActions: "play none none reverse",
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="keterhubungan-intro"
      ref={sectionRef}
      className="relative w-full min-h-screen snap-start snap-always flex items-center justify-center bg-section z-[4] py-16 md:py-24"
    >
      <div className="max-w-[98%] xl:max-w-[1600px] mx-auto px-4 md:px-8 w-full">
        <div className="flex flex-col lg:flex-row lg:items-center gap-12 lg:gap-16 xl:gap-24">
          {/* KOLOM KIRI — Teks Filosofi (≈60%) */}
          <div className="w-full lg:w-[60%] flex flex-col">
            <span
              className="text-brand font-sans tracking-wide uppercase text-fluid-eyebrow mb-5 inline-block"
              style={{ fontFamily: "var(--font-sans)" }}
            >
              Keluarga Evav
            </span>

            <h2
              className="text-fluid-h2 text-black font-normal mb-5 leading-[1.12]"
              style={{ fontFamily: "var(--font-serif)" }}
            >
              Kami Bukan{" "}
              <span className="text-brand">Brand</span> Tempat Wisata
            </h2>

            <p
              className="text-black/60 font-sans text-fluid-body leading-relaxed mb-8 max-w-2xl"
              style={{ fontFamily: "var(--font-sans)" }}
            >
              Kami adalah anak cucu Evav yang membukakan pintu. Teknologi di
              halaman ini hanyalah jembatan — bukan etalase.
            </p>

            <p
              className="text-black/60 font-sans text-fluid-body leading-relaxed max-w-2xl"
              style={{ fontFamily: "var(--font-sans)" }}
            >
              Dalam bahasa Kei,{" "}
              <span className="text-black">
                <em>Ain Ni Ain</em>
              </span>{" "}
              berarti &ldquo;satu punya satu, kita semua bersaudara&rdquo;. Maka
              menghubungi kami bukan mengisi formulir — ia adalah mengetuk pintu
              saudara. Pilih jalur yang paling nyaman bagimu: menulis surat,
              menyapa lewat pesan, atau sekadar mengikuti kisah kami di media
              sosial.
            </p>
          </div>

          {/* KOLOM KANAN — Janji Sambutan Card Stack (≈40%) */}
          <div className="w-full lg:w-[40%]">
            <div
              className="bg-white/70 border border-brand/20 rounded-lg-design shadow-soft p-6 flex flex-col gap-5"
              role="list"
              aria-label="Janji sambutan keluarga Evav"
            >
              {janjiSambutan.map((item) => {
                const Icon = item.icon;
                return (
                  <div
                    key={item.label}
                    role="listitem"
                    className="keterhubungan-card flex items-start gap-4"
                  >
                    <span
                      className="shrink-0 flex items-center justify-center w-10 h-10 rounded-full bg-brand/10"
                      aria-hidden="true"
                    >
                      <Icon className="w-5 h-5 text-brand" />
                    </span>
                    <p
                      className="text-black/80 font-sans text-fluid-body leading-relaxed pt-1.5"
                      style={{ fontFamily: "var(--font-sans)" }}
                    >
                      {item.label}
                    </p>
                    <span className="sr-only">{item.ariaLabel}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
