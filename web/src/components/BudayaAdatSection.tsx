"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import { BanknotesIcon, ShieldExclamationIcon, HeartIcon, MapIcon, ScaleIcon, UsersIcon, ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useSpotlight } from "@/hooks/useSpotlight";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const rules = [
  {
    id: "harta",
    title: "Hak Milik",
    badge: "Tidak Boleh Mencuri",
    desc: "Hukum Larvul Ngabal melarang keras pencurian dalam bentuk apa pun. Setiap harta benda milik seseorang dilindungi oleh adat. Pelanggar akan dikenai denda berat berupa emas, kain tenun, atau hewan ternak sebagai ganti rugi kepada korban.",
    image: "/images/budaya/kei_rule_harta.png",
    icon: <BanknotesIcon className="w-5 h-5" />,
  },
  {
    id: "damai",
    title: "Perdamaian",
    badge: "Tidak Boleh Membunuh",
    desc: "Nyawa manusia adalah hal paling sakral. Hukum ini melarang tindakan kekerasan yang menyakiti atau menghilangkan nyawa seseorang. Pelanggaran ini diadili dalam sidang adat besar dan denda tertinggi berupa emas dan penyerahan tanah.",
    image: "/images/budaya/kei_rule_damai.png",
    icon: <ShieldExclamationIcon className="w-5 h-5" />,
  },
  {
    id: "kekerasan",
    title: "Kekerasan",
    badge: "Tidak Boleh Menganiaya",
    desc: "Melarang keras segala bentak penganiayaan atau kekerasan fisik terhadap sesama warga. Larvul Ngabal menjamin keselamatan fisik bagi setiap individu di bawah perlindungan hukum adat yang tegas.",
    image: "/images/budaya/kei_rule_kekerasan.png",
    icon: <ShieldExclamationIcon className="w-5 h-5" />,
  },
  {
    id: "kehormatan",
    title: "Kesusilaan",
    badge: "Tidak Boleh Berzinah",
    desc: "Menjaga kehormatan keluarga dan martabat perempuan adalah prinsip utama. Pelanggaran terhadap norma kesusilaan dianggap sebagai penghinaan terhadap seluruh marga dan dihukum dengan denda adat yang sangat berat.",
    image: "/images/budaya/kei_rule_kehormatan.png",
    icon: <HeartIcon className="w-5 h-5" />,
  },
  {
    id: "keluarga",
    title: "Rumah Tangga",
    badge: "Tidak Boleh Ganggu Istri",
    desc: "Melarang keras tindakan mengganggu atau merusak keharmonisan rumah tangga orang lain. Hukum ini menjaga kestabilan sosial dan kerukunan keluarga inti di dalam komunitas Evav.",
    image: "/images/budaya/kei_rule_keluarga.png",
    icon: <UsersIcon className="w-5 h-5" />,
  },
  {
    id: "tanah",
    title: "Batas Tanah",
    badge: "Tidak Boleh Merusak Batas",
    desc: "Tanah warisan adalah hak suci yang diwariskan leluhur. Menggeser batas tanah atau mengklaim milik orang lain sama dengan melanggar kesepakatan antar marga. Pelanggaran ini diselesaikan dalam musyawarah besar seluruh ratschap.",
    image: "/images/budaya/kei_rule_tanah.png",
    icon: <MapIcon className="w-5 h-5" />,
  },
  {
    id: "sumpah",
    title: "Sumpah Adat",
    badge: "Tidak Boleh Melanggar Sumpah",
    desc: "Sumpah adat adalah ikatan sakral yang mengikat dua pihak di hadapan leluhur. Melanggar sumpah dipercaya akan mendatangkan kutukan. Tradisi ini menjaga kejujuran dan kepercayaan antar masyarakat Kei selama berabad-abad.",
    image: "/images/budaya/kei_rule_sumpah.png",
    icon: <ScaleIcon className="w-5 h-5" />,
  },
];

export default function BudayaAdatSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [activeRule, setActiveRule] = useState(0);

  const activeData = rules[activeRule];

  const totalRules = rules.length;

  const nextSlide = useCallback(() => {
    setActiveRule((currentActiveRule) => (currentActiveRule + 1) % totalRules);
  }, [totalRules]);

  const prevSlide = useCallback(() => {
    setActiveRule((currentActiveRule) => (currentActiveRule - 1 + totalRules) % totalRules);
  }, [totalRules]);

  const goToRule = (idx: number) => {
    setActiveRule(idx);
    startAutoplay();
  };

  // Autoplay (5s), restart timer on manual interaction
  const autoplayRef = useRef<number | null>(null);

  const startAutoplay = useCallback(() => {
    if (autoplayRef.current) window.clearInterval(autoplayRef.current);
    const duration = 5000;
    const step = 50;
    let elapsed = 0;
    const ticker = window.setInterval(() => {
      elapsed += step;
      if (elapsed >= duration) {
        nextSlide();
        elapsed = 0;
      }
    }, step);
    autoplayRef.current = ticker;
  }, [nextSlide]);

  useEffect(() => {
    startAutoplay();
    return () => {
      if (autoplayRef.current) window.clearInterval(autoplayRef.current);
    };
  }, [startAutoplay]);

  useEffect(() => {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const ctx = gsap.context(() => {
      if (prefersReduced) {
        gsap.set(".budaya-fade", { opacity: 1, y: 0 });
        return;
      }
      gsap.from(".budaya-fade", {
        y: 40,
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
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  // Animate right column content on badge change
  useEffect(() => {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) return;
    gsap.fromTo(
      ".rule-detail",
      { opacity: 0, y: 15 },
      { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" }
    );
  }, [activeRule]);

  const { onMouseMove, onMouseLeave } = useSpotlight();

  const translation = `calc(-${activeRule} * (100% + 12px))`;

  return (
    <section
      id="budaya-adat"
      className="relative w-full min-h-screen bg-section pt-28 pb-16 md:pt-32 md:pb-20 z-[6] flex items-center justify-center snap-start snap-always overflow-hidden"
      ref={sectionRef}
    >
      {/* Background Watermark Tenun Elat di Bagian Bawah Kiri */}
      <div
        className="absolute bottom-0 left-0 w-[280px] h-[280px] md:w-[480px] md:h-[480px] pointer-events-none z-0 select-none opacity-10"
        style={{
          maskImage: "linear-gradient(to top right, rgba(0,0,0,1) 20%, rgba(0,0,0,0) 80%)",
          WebkitMaskImage: "linear-gradient(to top right, rgba(0,0,0,1) 20%, rgba(0,0,0,0) 80%)",
        }}
      >
        <Image
          src="/images/budaya/tenun_elat_watermark.svg"
          alt="Watermark Tenun Elat Kei"
          fill
          sizes="(max-width: 768px) 280px, 480px"
          className="object-cover object-left-bottom mix-blend-soft-light"
        />
      </div>
      {/* Background Batik Kepulauan Kei di Bagian Atas Kanan */}
      <div
        className="absolute top-0 right-0 w-[280px] h-[280px] md:w-[480px] md:h-[480px] pointer-events-none z-0 select-none opacity-20"
        style={{
          maskImage: "linear-gradient(to bottom left, rgba(0,0,0,1) 20%, rgba(0,0,0,0) 80%)",
          WebkitMaskImage: "linear-gradient(to bottom left, rgba(0,0,0,1) 20%, rgba(0,0,0,0) 80%)",
        }}
      >
        <Image
          src="/images/budaya/kei_batik.png"
          alt="Motif Batik Adat Kei"
          fill
          sizes="(max-width: 768px) 280px, 480px"
          className="object-cover object-right-top mix-blend-soft-light"
          priority
        />
      </div>

      <div className="max-w-[98%] xl:max-w-[1600px] mx-auto px-4 md:px-8 w-full flex flex-col gap-10">

        {/* HEADER ROW: Title */}
        <div className="w-full budaya-fade">
          <div
            className="text-brand font-bold tracking-[0.2em] uppercase text-xs md:text-sm mb-2"
            style={{ fontFamily: "var(--font-sans)" }}
          >
            BUDAYA DAN ADAT
          </div>
          <h2
            className="text-fluid-h2 text-black font-normal mb-2"
            style={{ fontFamily: "var(--font-serif)" }}
          >
            Larvul Ngabal
          </h2>
          <p
            className="text-black/60 text-base md:text-lg"
            style={{ fontFamily: "var(--font-sans)" }}
          >
            Hukum Adat yang Menjaga Kehidupan
          </p>
        </div>

        {/* BOTTOM CONTENT ROW: 3 kolom */}
        <div className="flex flex-col xl:flex-row gap-6 xl:gap-8 items-center w-full">

          {/* KOLOM KIRI: Swiper 7 Pasal Larvul Ngabal — hidden di mobile, tampil di desktop */}
          <div className="hidden xl:flex flex-col w-full xl:flex-[1] xl:min-w-0 budaya-fade relative budaya-col-cards">
            {/* Left Arrow — desktop only */}
            <button
              onClick={prevSlide}
              aria-label="Aturan sebelumnya"
              className="hidden xl:flex absolute -left-4 top-[calc(50%-20px)] -translate-y-1/2 z-10 p-2 rounded-full bg-white text-brand border border-gray-100 shadow-md transition-all duration-300 hover:bg-brand hover:text-white"
            >
              <ChevronLeftIcon className="w-4 h-4" />
            </button>

            {/* Right Arrow — desktop only */}
            <button
              onClick={nextSlide}
              aria-label="Aturan berikutnya"
              className="hidden xl:flex absolute -right-4 top-[calc(50%-20px)] -translate-y-1/2 z-10 p-2 rounded-full bg-white text-brand border border-gray-100 shadow-md transition-all duration-300 hover:bg-brand hover:text-white"
            >
              <ChevronRightIcon className="w-4 h-4" />
            </button>

            {/* Slider Container */}
            <div className="overflow-hidden w-full rounded-2xl py-3 px-1 flex-1">
              <div
                className="flex gap-3 transition-transform duration-500 ease-out h-full w-full"
                style={{
                  transform: `translateX(${translation})`,
                }}
              >
                {rules.map((rule, idx) => (
                  <div key={rule.id} className="w-full flex-none flex justify-center">
                    <button
                      onClick={() => goToRule(idx)}
                      onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); goToRule(idx); } }}
                      role="button"
                      tabIndex={0}
                      aria-label={`Tampilkan aturan ${rule.badge}`}
                      className={`rounded-2xl p-4 flex flex-col items-center justify-center text-center gap-3 cursor-pointer group transition-all duration-300 border-2 w-full max-w-[280px] h-[200px] md:h-[240px] ${activeRule === idx
                        ? "bg-nav-gradient border-brand scale-[1.05] z-10 -translate-y-1 opacity-100"
                        : "bg-white/45 border-brand/10 opacity-50 hover:opacity-90 scale-[0.96] hover:bg-white/60"
                        }`}
                    >
                      <div
                        className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors flex-shrink-0 ${activeRule === idx
                          ? "bg-brand"
                          : "bg-brand/10 group-hover:bg-brand/20"
                          }`}
                      >
                        <div className={activeRule === idx ? "text-white" : "text-brand/70"}>
                          {rule.icon}
                        </div>
                      </div>
                      <span
                        className={`text-xs leading-snug transition-colors ${activeRule === idx ? "text-brand font-extrabold" : "text-black/50 font-bold"
                          }`}
                        style={{ fontFamily: "var(--font-sans)" }}
                      >
                        {rule.badge}
                      </span>
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* KOLOM TENGAH: Foto Utama — mobile: paling atas (order 1) */}
          <div className="w-full xl:flex-[1.5] flex flex-col budaya-fade justify-center budaya-col-photo">
            <div className="w-full aspect-video rounded-lg-design overflow-hidden shadow-card group relative">
              <Image
                key={activeRule}
                src={activeData.image}
                alt={activeData.title}
                fill
                sizes="(max-width: 1280px) 100vw, 42vw"
                className="object-cover transition-transform duration-700 group-hover:scale-105 animate-[fadeSlideUp_0.6s_ease-out_forwards]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
              {/* Label pasal di atas foto */}
              <div className="absolute bottom-3 left-3 right-3">
                <span
                  className="inline-block bg-brand/90 text-white text-[10px] font-bold px-2 py-1 rounded-md uppercase tracking-wider backdrop-blur-sm"
                  style={{ fontFamily: "var(--font-sans)" }}
                >
                  Pasal {activeRule + 1} dari {rules.length}
                </span>
              </div>
            </div>
          </div>

          {/* KOLOM KANAN: Detail Teks Pasal — mobile: tengah (order 2) */}
          <div className="w-full xl:flex-[1] flex flex-col budaya-fade justify-center budaya-col-detail">
            <div className="rule-detail flex flex-col justify-between" key={activeRule}>

              {/* Penjelasan Detail Pasal */}
              <div>
                <h4
                  className="text-xl md:text-2xl text-black font-normal leading-snug mb-3"
                  style={{ fontFamily: "var(--font-serif)" }}
                >
                  {activeData.badge}
                </h4>
                <p
                  className="text-black/65 text-sm md:text-base leading-relaxed text-justify line-clamp-6"
                  style={{ fontFamily: "var(--font-sans)" }}
                >
                  {activeData.desc}
                </p>
              </div>

              <button
                onMouseMove={onMouseMove}
                onMouseLeave={onMouseLeave}
                className="btn-spotlight self-start mt-4 group/btn flex items-center gap-2 border border-black hover:border-brand text-black hover:text-brand px-5 py-2.5 rounded-xl font-semibold text-sm transition-all duration-300 hover:scale-[1.02] active:press focus-ring cursor-pointer"
              >
                Pelajari Lebih Lanjut
                <ChevronRightIcon className="w-3.5 h-3.5 text-current transition-transform group-hover/btn:translate-x-1" />
              </button>
            </div>
          </div>
        </div>

        {/* QUOTE PENUTUP SECTION — memanjang penuh, rata kiri, tanpa background */}
        <div className="w-full budaya-fade mt-6 md:mt-10">
          <figure className="relative w-full text-left px-1">
            <blockquote
              className="text-black/70 text-base md:text-xl leading-relaxed"
              style={{ fontFamily: "var(--font-sans)" }}
            >
              Larvul Ngabal adalah pedoman hidup masyarakat tanah evav untuk menjaga keseimbangan antara manusia, alam, dan sang pencipta. Hukum adat tertua di Indonesia Timur ini terdiri dari 7 pasal sakral yang dijaga turun-temurun.
            </blockquote>
            <figcaption
              className="mt-3 text-brand text-xs font-bold uppercase tracking-[0.2em]"
              style={{ fontFamily: "var(--font-sans)" }}
            >
              — Larvul Ngabal, Hukum Leluhur Evav
            </figcaption>
          </figure>
        </div>

      </div>

    </section>
  );
}
