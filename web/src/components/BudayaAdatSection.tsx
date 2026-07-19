"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { BanknotesIcon, ShieldExclamationIcon, HeartIcon, MapIcon, ScaleIcon, UsersIcon, ChevronRightIcon } from "@heroicons/react/24/outline";
import gsap from "gsap";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, A11y } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper/types";
import { useSpotlight } from "@/hooks/useSpotlight";

import "swiper/css";
import "swiper/css/pagination";

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
  const [reducedMotion] = useState(
    () => typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
  const swiperRef = useRef<SwiperType | null>(null);

  const activeData = rules[activeRule];

  const goToRule = (idx: number) => {
    swiperRef.current?.slideToLoop(idx);
    setActiveRule(idx);
  };

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
          once: true,
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

        {/* Desktop Layout (3 Columns) — Visible on xl screens */}
        <div className="hidden xl:flex xl:flex-row gap-8 items-center w-full">

          {/* KOLOM KIRI: 1 card pasal Larvul Ngabal yang bisa di-swipe (slide) tiap autoplay */}
          <div className="flex flex-col w-full xl:flex-[1] xl:min-w-0 budaya-fade relative budaya-col-cards">
            <Swiper
              modules={[Autoplay, A11y]}
              onSwiper={(s) => { swiperRef.current = s; }}
              onSlideChange={(s) => setActiveRule(s.realIndex)}
              loop
              autoplay={reducedMotion ? false : { delay: 5000, disableOnInteraction: false, pauseOnMouseEnter: true }}
              grabCursor
              slidesPerView={1}
              className="w-full max-w-[300px] mx-auto !pb-10 budaya-swiper"
              aria-label="Slider pasal Larvul Ngabal"
            >
              {rules.map((rule, idx) => (
                <SwiperSlide key={rule.id} className="!h-auto">
                  <button
                    type="button"
                    onClick={() => goToRule((idx + 1) % rules.length)}
                    aria-label={`Pasal berikutnya: ${rules[(idx + 1) % rules.length].badge}`}
                    className="group relative w-full h-[200px] md:h-[240px] rounded-2xl p-6 flex flex-col items-center justify-center text-center gap-3 cursor-pointer transition-all duration-500 border-2 bg-brand/10 border-brand/30 overflow-hidden"
                  >
                    <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 p-6 text-center">
                      <div className="w-12 h-12 rounded-full flex items-center justify-center bg-brand text-white flex-shrink-0">
                        <div>{rule.icon}</div>
                      </div>
                      <span className="text-sm md:text-base leading-snug text-brand font-extrabold" style={{ fontFamily: "var(--font-sans)" }}>
                        {rule.badge}
                      </span>
                      <span className="text-xs text-black/50" style={{ fontFamily: "var(--font-sans)" }}>
                        Pasal {idx + 1} dari {rules.length}
                      </span>
                    </div>
                    <div className="absolute bottom-3 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center gap-1 text-brand text-xs font-semibold" style={{ fontFamily: "var(--font-sans)" }}>
                      Pasal berikutnya
                      <ChevronRightIcon className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                    </div>
                  </button>
                </SwiperSlide>
              ))}
            </Swiper>

            {/* Dots indikator pink */}
            <div className="flex items-center justify-center gap-2 mt-4">
              {rules.map((rule, idx) => (
                <button
                  key={rule.id}
                  type="button"
                  aria-label={`Pilih ${rule.badge}`}
                  onClick={() => goToRule(idx)}
                  className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${activeRule === idx ? "bg-brand w-6" : "bg-brand/30 hover:bg-brand/50"}`}
                />
              ))}
            </div>
          </div>

          {/* KOLOM TENGAH: Foto Utama */}
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

          {/* KOLOM KANAN: Detail Teks Pasal */}
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

        {/* Mobile Layout (Swiper Slider) — Visible on screen sizes < xl */}
        <div className="xl:hidden w-full budaya-fade">
          <Swiper
            modules={[Autoplay, A11y]}
            pagination={false}
            autoplay={reducedMotion ? false : { delay: 5000, disableOnInteraction: false }}
            spaceBetween={20}
            slidesPerView={1}
            onSlideChange={(swiper) => setActiveRule(swiper.realIndex)}
            className="budaya-mobile-swiper"
          >
            {rules.map((rule, idx) => (
              <SwiperSlide key={rule.id} className="flex flex-col gap-6">
                {/* Foto Utama */}
                <div className="w-full aspect-video rounded-lg-design overflow-hidden shadow-card group relative">
                  <Image
                    src={rule.image}
                    alt={rule.title}
                    fill
                    sizes="100vw"
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                  {/* Label pasal di atas foto */}
                  <div className="absolute bottom-3 left-3 right-3">
                    <span
                      className="inline-block bg-brand/90 text-white text-[10px] font-bold px-2 py-1 rounded-md uppercase tracking-wider backdrop-blur-sm"
                      style={{ fontFamily: "var(--font-sans)" }}
                    >
                      Pasal {idx + 1} dari {rules.length}
                    </span>
                  </div>
                </div>

                {/* Detail Teks Pasal */}
                <div className="flex flex-col gap-3">
                  <h4
                    className="text-xl text-black font-normal leading-snug py-3"
                    style={{ fontFamily: "var(--font-serif)" }}
                  >
                    {rule.badge}
                  </h4>
                  <p
                    className="text-black/65 text-sm leading-relaxed text-justify line-clamp-6"
                    style={{ fontFamily: "var(--font-sans)" }}
                  >
                    {rule.desc}
                  </p>

                  <button
                    onMouseMove={onMouseMove}
                    onMouseLeave={onMouseLeave}
                    className="btn-spotlight self-start mt-3 group/btn flex items-center gap-2 border border-black hover:border-brand text-black hover:text-brand px-5 py-2.5 rounded-xl font-semibold text-sm transition-all duration-300 hover:scale-[1.02] active:press focus-ring cursor-pointer"
                  >
                    Pelajari Lebih Lanjut
                    <ChevronRightIcon className="w-3.5 h-3.5 text-current transition-transform group-hover/btn:translate-x-1" />
                  </button>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
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
