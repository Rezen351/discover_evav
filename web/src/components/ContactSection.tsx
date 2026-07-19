"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { ChevronRightIcon, CheckCircleIcon } from "@heroicons/react/24/outline";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useSpotlight } from "@/hooks/useSpotlight";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function ContactSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const imageInnerRef = useRef<HTMLDivElement>(null);
  
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const ctx = gsap.context(() => {
      // Fade in left image
      gsap.from(imageRef.current, {
        x: -50,
        opacity: 0,
        duration: 0.8,
        ease: "power2.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 95%",
          toggleActions: "play none none reverse",
        },
      });

      // Fade in right form panel content
      gsap.from(".form-fade", {
        x: 50,
        opacity: 0,
        duration: 0.8,
        stagger: 0.12,
        ease: "power2.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 95%",
          toggleActions: "play none none reverse",
        },
      });

      // Parallax halus kolom gambar (1 layer)
      if (!prefersReduced && imageInnerRef.current) {
        gsap.to(imageInnerRef.current, {
          yPercent: -10,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        });
      }
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email) return;
    
    // Simulate API Submission
    setSubmitted(true);
    setFormData({ name: "", email: "", message: "" });
    setTimeout(() => setSubmitted(false), 5000);
  };

  const { onMouseMove, onMouseLeave } = useSpotlight();


  return (
    <section
      id="join-community"
      className="relative w-full min-h-screen bg-section z-[1] flex items-stretch snap-start"
      ref={sectionRef}
    >
      {/* Split Screen Container (Viewport Full Width & Height) */}
      <div className="w-full flex flex-col lg:flex-row items-stretch bg-section">
        
        {/* LEFT COLUMN: Cultural Image */}
        <div 
          ref={imageRef}
          className="w-full lg:w-1/2 min-h-[350px] lg:min-h-screen relative overflow-hidden"
        >
          <div ref={imageInnerRef} className="absolute inset-0 -top-[10%] h-[120%] will-change-transform">
          <Image
            src="/images/budaya/kei_warriors_dance.png"
            alt="Kei traditional dance warriors"
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover object-center transition-transform duration-1000 hover:scale-105"
          />
          </div>
          {/* Vignette overlay for blending */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/20 via-transparent to-black/10 pointer-events-none"></div>

          {/* Caption narasi budaya di pojok bawah kiri agar kolom tidak kosong */}
          <div className="absolute bottom-6 left-6 right-6 z-[5] hidden lg:block">
            <p className="text-white/90 text-lg leading-snug drop-shadow-md" style={{ fontFamily: "var(--font-serif)" }}>
              Tarian perang penyambut tamu, <br />warisan jiwa masyarakat Evav.
            </p>
            <p className="text-white/50 text-xs tracking-[0.2em] uppercase mt-2" style={{ fontFamily: "var(--font-sans)" }}>
              Ain Ni Ain — kita semua bersaudara
            </p>
          </div>

          {/* Vertical Blue Gradient Border (Lis) */}
          <div className="absolute right-0 top-0 bottom-0 w-[1px] md:w-[1px] bg-gradient-to-b from-[var(--color-accent-navy)] via-[var(--color-primary-teal)] to-[var(--color-primary-navy)] z-[4] hidden lg:block"></div>
        </div>

        {/* RIGHT COLUMN: Form Panel */}
        <div 
          ref={contentRef}
          className="w-full lg:w-1/2 bg-section pt-24 pb-8 px-8 md:pt-28 md:pb-16 md:px-16 lg:pt-32 lg:pb-20 lg:px-20 xl:pt-36 xl:pb-24 xl:px-24 flex flex-col justify-center relative overflow-hidden"
        >
          {/* Background image with opacity-50 and mix-blend-soft-light */}
          <div 
            className="absolute inset-0 bg-cover bg-center opacity-50 mix-blend-soft-light pointer-events-none z-0"
            style={{ backgroundImage: "url('/images/meti/kei_ngurbloat.png')" }}
          ></div>

          {/* Form Content wrapped in relative z-10 */}
          <div className="relative z-10 w-full flex flex-col">
            <div className="form-fade">
              <span className="text-brand font-bold tracking-[0.2em] uppercase text-xs md:text-sm mb-3 inline-block" style={{ fontFamily: "var(--font-sans)" }}>
                JADI BAGIAN DARI KELUARGA EVAV
              </span>
              <h2 
                className="text-3xl md:text-4xl lg:text-[40px] leading-[1.15] text-black font-normal mb-4"
                style={{ fontFamily: "var(--font-serif)" }}
              >
                Mari Terhubung dan <br className="hidden md:block" /> Menjaga Keindahan Bersama
              </h2>
              <p 
                className="text-black/60 text-sm md:text-base leading-relaxed mb-8 font-light"
                style={{ fontFamily: "var(--font-sans)" }}
              >
                Bergabunglah dengan kami untuk mendapatkan cerita dan informasi seputar budaya serta alam Kepulauan Kei.
              </p>
            </div>

            {submitted ? (
              <div className="bg-white/80 backdrop-blur-md rounded-2xl p-8 text-center flex flex-col items-center justify-center border border-brand/10 animate-[fadeSlideUp_0.4s_ease-out]">
                <div className="w-16 h-16 rounded-full bg-brand/10 flex items-center justify-center mb-4 text-brand">
                  <CheckCircleIcon className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold text-black mb-2" style={{ fontFamily: "var(--font-serif)" }}>
                  Terima Kasih Telah Bergabung!
                </h3>
                <p className="text-sm text-black/60" style={{ fontFamily: "var(--font-sans)" }}>
                  Pesan Anda telah kami terima. Kami akan segera menghubungi Anda melalui email.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-4 form-fade">
                {/* Name & Email Row */}
                <div className="flex flex-col md:flex-row gap-4 w-full">
                  <div className="w-full md:w-1/2">
                    <input
                      type="text"
                      required
                      placeholder="Nama Lengkap"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full bg-white rounded-xl px-4 py-3.5 border border-brand/10 focus:border-brand outline-none text-black transition-all placeholder:text-black/40 text-sm md:text-base"
                      style={{ fontFamily: "var(--font-sans)" }}
                    />
                  </div>
                  <div className="w-full md:w-1/2">
                    <input
                      type="email"
                      required
                      placeholder="Email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full bg-white rounded-xl px-4 py-3.5 border border-brand/10 focus:border-brand outline-none text-black transition-all placeholder:text-black/40 text-sm md:text-base"
                      style={{ fontFamily: "var(--font-sans)" }}
                    />
                  </div>
                </div>

                {/* Message Box */}
                <div className="w-full">
                  <textarea
                    placeholder="Pesan"
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full bg-white rounded-xl px-4 py-3.5 border border-brand/10 focus:border-brand outline-none text-black transition-all placeholder:text-black/40 text-sm md:text-base h-28 resize-none"
                    style={{ fontFamily: "var(--font-sans)" }}
                  />
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  onMouseMove={onMouseMove}
                  onMouseLeave={onMouseLeave}
                  className="btn-spotlight group/btn flex items-center justify-center gap-2 border border-black hover:border-brand text-black hover:text-brand w-full rounded-xl py-3.5 text-center font-extrabold text-sm md:text-base transition-all duration-300 hover:scale-[1.02] active:press focus-ring cursor-pointer"
                  style={{ fontFamily: "var(--font-sans)" }}
                >
                  Bergabung Sekarang
                  <ChevronRightIcon className="w-4 h-4 text-current transition-transform duration-300 group-hover/btn:translate-x-1" />
                </button>
              </form>
            )}

          </div>
        </div>
      </div>
    </section>
  );
}
