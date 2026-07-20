"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { ChevronRightIcon, CheckCircleIcon } from "@heroicons/react/24/outline";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useSpotlight } from "@/hooks/useSpotlight";
import { getDictionary } from "@/content/dictionaries";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

type Dict = Awaited<ReturnType<typeof getDictionary>>;

export default function ContactSection({ data }: { data: Dict["home"]["contact"] }) {
  const slides = data.slides;
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const imageInnerRef = useRef<HTMLDivElement>(null);
  
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [submitted, setSubmitted] = useState(false);
  const [activeSlide, setActiveSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

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
        
        {/* LEFT COLUMN: Cultural Image Slider */}
        <div 
          ref={imageRef}
          className="w-full lg:w-1/2 min-h-[400px] lg:min-h-screen relative overflow-hidden"
        >
          <div ref={imageInnerRef} className="absolute inset-0 -top-[10%] h-[120%] will-change-transform">
            {slides.map((slide, idx) => (
              <div 
                key={idx} 
                className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
                  idx === activeSlide ? "opacity-100 z-10" : "opacity-0 z-0 pointer-events-none"
                }`}
              >
                <Image
                  src={slide.image}
                  alt={slide.alt}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover object-center transition-transform duration-1000 hover:scale-105"
                />
                
                {/* Vignette overlay for blending */}
                <div className="absolute inset-0 bg-gradient-to-r from-black/30 via-transparent to-black/20 pointer-events-none z-[2]"></div>
                
                {/* Caption narasi budaya di pojok bawah kiri agar kolom tidak kosong */}
                <div className="absolute bottom-0 left-0 right-0 w-full z-[5] hidden lg:block text-left bg-black/60 backdrop-blur-xl p-6 pb-12 border-t border-white/10 shadow-xl">
                  <span className="text-white/85 text-xs font-bold tracking-[0.2em] uppercase mb-1 inline-block" style={{ fontFamily: "var(--font-sans)" }}>
                    {slide.title}
                  </span>
                  <p className="text-white text-base md:text-lg font-light leading-snug" style={{ fontFamily: "var(--font-serif)" }}>
                    {slide.desc}
                  </p>
                  <p className="text-brand text-xs tracking-[0.2em] uppercase mt-2 font-medium" style={{ fontFamily: "var(--font-sans)" }}>
                    {slide.tag}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Slide Indicator Dots on the image column (Absolute bottom left) */}
          <div className="absolute bottom-4 left-6 z-[20] flex gap-1.5">
            {slides.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setActiveSlide(idx)}
                aria-label={`${data.dotLabel} ${idx + 1}`}
                className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
                  activeSlide === idx ? "bg-white w-4" : "bg-white/40 hover:bg-white/60"
                }`}
              />
            ))}
          </div>

          {/* Vertical Blue Gradient Border (Lis) */}
          <div className="absolute right-0 top-0 bottom-0 w-[1px] bg-gradient-to-b from-[var(--color-accent-navy)] via-[var(--color-primary-teal)] to-[var(--color-primary-navy)] z-[4] hidden lg:block"></div>
        </div>

        {/* RIGHT COLUMN: Form Panel */}
        <div 
          ref={contentRef}
          className="w-full lg:w-1/2 bg-section pt-24 pb-8 px-8 md:pt-28 md:pb-16 md:px-16 lg:pt-32 lg:pb-20 lg:px-20 xl:pt-36 xl:pb-24 xl:px-24 flex flex-col justify-center relative overflow-hidden"
        >
          {/* Background image with opacity-50 and mix-blend-soft-light */}
          <div 
            className="absolute inset-0 bg-cover bg-center opacity-50 mix-blend-soft-light pointer-events-none z-0"
            style={{ backgroundImage: "url('images/eksplorasi/kei_ngurbloat.png')" }}
          ></div>

          {/* Form Content wrapped in relative z-10 */}
          <div className="relative z-10 w-full flex flex-col">
            <div className="form-fade">
                <span className="text-brand font-bold tracking-[0.2em] uppercase text-xs md:text-sm mb-3 inline-block" style={{ fontFamily: "var(--font-sans)" }}>
                  {data.eyebrow}
                </span>
                <h2 
                  className="text-3xl md:text-4xl lg:text-[40px] leading-[1.15] text-black font-normal mb-4"
                  style={{ fontFamily: "var(--font-serif)" }}
                >
                  {data.titleLead} <br className="hidden md:block" /> {data.titleAccent}
                </h2>
                <p 
                  className="text-black/60 text-sm md:text-base leading-relaxed mb-8 font-light"
                  style={{ fontFamily: "var(--font-sans)" }}
                >
                  {data.intro}
                </p>
            </div>

            {submitted ? (
              <div className="bg-white/80 backdrop-blur-md rounded-2xl p-8 text-center flex flex-col items-center justify-center border border-brand/10 animate-[fadeSlideUp_0.4s_ease-out]">
                <div className="w-16 h-16 rounded-full bg-brand/10 flex items-center justify-center mb-4 text-brand">
                  <CheckCircleIcon className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold text-black mb-2" style={{ fontFamily: "var(--font-serif)" }}>
                  {data.thanksTitle}
                </h3>
                <p className="text-sm text-black/60" style={{ fontFamily: "var(--font-sans)" }}>
                  {data.thanksDesc}
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
                      placeholder={data.namePlaceholder}
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
                      placeholder={data.emailPlaceholder}
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
                    placeholder={data.messagePlaceholder}
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
                  {data.submitText}
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
