"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  FlagIcon,
  SparklesIcon,
  UserGroupIcon,
  ShieldCheckIcon,
  MapIcon,
  ArrowRightIcon,
} from "@heroicons/react/24/outline";
import { useSpotlight } from "@/hooks/useSpotlight";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

type SuccessionNode = {
  title: string;
  year?: string;
  description: string;
};

type ResponsibilityCard = {
  title: string;
  description: string;
  icon: typeof ShieldCheckIcon;
};

const KAMPUNG_ADAT: string[] = [
  "Debut",
  "Lairngaggas",
  "Selayar",
  "Namar",
  "Ngilngof",
  "Ngayub",
  "Ohoiluk",
];

const SUCCESSION: SuccessionNode[] = [
  {
    title: "Rat Henrikus Jang Watratan",
    description:
      "Pemimpin Ratskap Manyeuw Rumadian dari Marga Watratan yang mengawal pelaksanaan hukum adat Larvul Ngabal menjaga tegaknya kedaulatan adat di tanah Evav.",
  },
  {
    title: "Rat Norbertus Watratan",
    year: "1994",
    description:
      "Meneruskan garis suksesi Marga Watratan pada 1994, membawa tanggung jawab moral menjaga pengayoman, hukum adat, dan pelestarian warisan leluhur Kei.",
  },
];

const RESPONSIBILITIES: ResponsibilityCard[] = [
  {
    title: "Pengayoman",
    description:
      "Menjaga dan melindungi seluruh warga dalam naungan Ratskap Manyeuw Rumadian, agar setiap orang berada dalam pangkuan adat yang menyejukkan.",
    icon: UserGroupIcon,
  },
  {
    title: "Hukum Adat",
    description:
      "Menegakkan Larvul Ngabal sebagai pangkal hukum leluhur, mengikat perjanjian dan sengketa dalam kesetaraan yang dihormati bersama.",
    icon: ShieldCheckIcon,
  },
  {
    title: "Pelestarian",
    description:
      "Merawat gong Dada Wadlau, Pata Limi, dan memori tujuh kampung adat agar warisan identitas bangsa tetap hidup dari generasi ke generasi.",
    icon: SparklesIcon,
  },
];

export default function RatskapHeritageSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const { onMouseMove, onMouseLeave } = useSpotlight();

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const ctx = gsap.context(() => {
      if (prefersReduced) {
        gsap.set(".ratskap-reveal", { opacity: 1, y: 0 });
        return;
      }

      gsap.utils.toArray<HTMLElement>(".ratskap-reveal").forEach((el) => {
        gsap.from(el, {
          opacity: 0,
          y: 40,
          duration: 0.8,
          stagger: 0.15,
          ease: "power2.out",
          scrollTrigger: {
            trigger: el,
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        });
      });

      gsap.utils.toArray<HTMLElement>(".ratskap-parallax").forEach((el) => {
        gsap.fromTo(
          el,
          { yPercent: 12 },
          {
            yPercent: -12,
            ease: "none",
            scrollTrigger: {
              trigger: el.parentElement,
              start: "top bottom",
              end: "bottom top",
              scrub: true,
            },
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="ratskap"
      ref={sectionRef}
      aria-labelledby="ratskap-title"
      className="relative w-full md:snap-start md:snap-always z-[4] bg-section"
    >
      {/* 5.1 Pengantar */}
      <div className="relative w-full py-20 md:py-28">
        <div className="max-w-[98%] xl:max-w-[1600px] mx-auto px-4 md:px-8 w-full">
          <p className="ratskap-reveal font-sans text-fluid-eyebrow uppercase tracking-[0.3em] text-brand mb-4">
            Jejak Kedaulatan · I
          </p>
          <h2
            id="ratskap-title"
            className="ratskap-reveal font-serif text-fluid-h2 leading-[1.12] text-black mb-12"
          >
            Ratskap Manyeuw <span className="text-brand">Rumadian</span>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 xl:gap-16 gap-y-12 md:gap-y-10 items-center">
            <div className="ratskap-reveal relative w-full h-[360px] md:h-[480px] rounded-xl-design overflow-hidden shadow-card group">
              <div className="ratskap-parallax absolute -top-[12%] left-0 h-[124%] w-full">
                <Image
                  src="/images/heritage/kriel_356.png"
                  alt="Lanskap Ohoi Tel Nangan saat senja — kampung adat dalam naungan Ratskap Manyeuw Rumadian"
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover object-center transition-transform duration-700 group-hover:scale-105"
                />
              </div>
            </div>

            <div className="ratskap-reveal">
              <p className="font-sans text-fluid-body text-black/70 leading-relaxed">
                Pada era 1870-an, Ratskap Manyeuw Rumadian berdiri sebagai pilar
                kedaulatan adat di tanah Evav. Ia menjaga tegaknya hukum leluhur
                Larvul Ngabal, mengikat perjanjian dan memelihara kedamaian
                antarkampung dengan semangat persaudaraan Kei.
              </p>
              <p className="mt-6 font-sans text-fluid-body text-black/70 leading-relaxed">
                Di Ohoi Tel Nangan, jejak kedaulatan itu masih berdetak — dalam
                gong, dalam marga, dan dalam tujuh kampung yang bersumpah di
                bawah naungan yang sama.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* 5.2 Filosofi Kepemimpinan */}
      <div className="relative w-full py-20 md:py-28">
        <div className="max-w-[98%] xl:max-w-[1600px] mx-auto px-4 md:px-8 w-full">
          <p className="ratskap-reveal font-sans text-fluid-eyebrow uppercase tracking-[0.3em] text-brand mb-4">
            Jejak Kedaulatan · II
          </p>
          <h3 className="ratskap-reveal font-serif text-fluid-h3 text-black mb-12">
            Filosofi Kepemimpinan &ldquo;Rat Manyeuw&rdquo;
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 xl:gap-16 gap-y-12 md:gap-y-10 items-center">
            <div className="ratskap-reveal relative w-full h-[320px] md:h-[420px] rounded-xl-design overflow-hidden shadow-card group">
              <div className="ratskap-parallax absolute -top-[12%] left-0 h-[124%] w-full">
                <Image
                  src="/images/heritage/kriel_356.png"
                  alt="Elang kecil — lambang filosofi Rat Manyeuw dalam kepemimpinan adat Kei"
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover object-center transition-transform duration-700 group-hover:scale-105"
                />
              </div>
            </div>

            <div className="ratskap-reveal">
              <p className="font-serif text-fluid-h3 leading-[1.3] text-black/80">
                &ldquo;Rat Manyeuw&rdquo; adalah elang kecil — tidak menonjolkan
                diri, namun memandang jauh dan menjaga tanahnya dengan ketenangan.
                Begitilah seorang pemimpin adat Kei sejati memimpin: rendah hati,
                tajam pandang, dan berpijak pada yang satu.
              </p>
              <p className="mt-6 font-sans text-fluid-body text-black/70 leading-relaxed">
                Kepemimpinan bukan tentang berdiri di atas yang lain, melainkan
                tentang membentangkan sayap pelindung bagi seluruh kampung yang
                dipercayakan kepadanya.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* 5.2b Tujuh Kampung Adat */}
      <div className="relative w-full py-20 md:py-28">
        <div className="max-w-[98%] xl:max-w-[1600px] mx-auto px-4 md:px-8 w-full">
          <p className="ratskap-reveal font-sans text-fluid-eyebrow uppercase tracking-[0.3em] text-brand mb-4">
            Jejak Kedaulatan · II-b
          </p>
          <h3 className="ratskap-reveal font-serif text-fluid-h3 text-black mb-12">
            Tujuh Kampung Adat Bersumpah
          </h3>

          <div className="grid grid-cols-1 min-[400px]:grid-cols-2 gap-4 md:gap-6 sm:grid-cols-3 lg:grid-cols-4">
            {[
              { src: "/images/heritage/kriel_356.png", alt: "Ohoi Rumadian — kampung adat leluhur dalam naungan Ratskap Manyeuw Rumadian", label: "Ohoi Rumadian" },
              { src: "/images/heritage/kampung_debut.jpeg", alt: "Kampung Debut — salah satu dari tujuh kampung adat Kei", label: "Kampung Debut" },
              { src: "/images/heritage/kampung-selayar-.png", alt: "Kampung Lairngaggas — lanskap ohoi adat Kei", label: "Kampung Lairngaggas" },
              { src: "/images/heritage/kampung-selayar-.png", alt: "Kampung Selayar — lanskap ohoi adat Kei", label: "Kampung Selayar" },
              { src: "/images/heritage/kampung-selayar-.png", alt: "Kampung Namar — lanskap ohoi adat Kei", label: "Kampung Namar" },
              { src: "/images/heritage/kampung-selayar-.png", alt: "Kampung Ngilngof — lanskap ohoi adat Kei", label: "Kampung Ngilngof" },
              { src: "/images/heritage/kampung-selayar-.png", alt: "Kampung Ngayub — lanskap ohoi adat Kei", label: "Kampung Ngayub" },
            ].map((kampung) => (
              <figure key={kampung.label} className="ratskap-reveal relative aspect-[4/3] w-full overflow-hidden rounded-xl-design shadow-card group">
                <Image
                  src={kampung.src}
                  alt={kampung.alt}
                  fill
                  sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                  className="object-cover object-center transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                <figcaption className="absolute inset-x-0 bottom-0 p-3 md:p-4">
                  <span className="font-sans text-xs font-medium leading-tight text-center text-white md:text-base">
                    {kampung.label}
                  </span>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </div>

      {/* 5.3 Legitimasi Sejarah — Bento */}
      <div className="relative w-full py-20 md:py-28">
        <div className="max-w-[98%] xl:max-w-[1600px] mx-auto px-4 md:px-8 w-full">
          <p className="ratskap-reveal font-sans text-fluid-eyebrow uppercase tracking-[0.3em] text-brand mb-4">
            Jejak Kedaulatan · III
          </p>
          <h3 className="ratskap-reveal font-serif text-fluid-h3 text-black mb-12">
            Legitimasi Sejarah
          </h3>

          <div className="grid grid-cols-1 gap-4 md:gap-6 sm:grid-cols-2 lg:grid-cols-4 sm:auto-rows-[220px] lg:auto-rows-[240px]">
            <figure className="ratskap-reveal relative w-full h-[260px] sm:h-full rounded-xl-design overflow-hidden shadow-card group sm:col-span-2 sm:row-span-2">
              <div className="ratskap-parallax absolute -top-[12%] left-0 h-[124%] w-full">
                <Image
                  src="/images/heritage/karel_street.png"
                  alt="Gong adat Dada Wadlau — simbol legitimasi Ratskap Manyeuw Rumadian"
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  className="object-cover object-center transition-transform duration-700 group-hover:scale-105"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />
              <figcaption className="absolute inset-0 flex flex-col justify-end p-5 md:p-8">
                <span
                  className="flex h-10 w-10 items-center justify-center rounded-full bg-brand/20 text-brand mb-4"
                  aria-hidden="true"
                >
                  <SparklesIcon className="h-5 w-5" />
                </span>
                <h4 className="font-serif text-fluid-h3 text-white">
                  Gong Dada Wadlau
                </h4>
                <p className="mt-2 font-sans text-sm text-white/85 leading-relaxed">
                  Simbol legitimasi tertinggi Ratskap Manyeuw Rumadian — suara
                  gong yang mengikat keabsahan kedaulatan adat di tanah Evav.
                </p>
              </figcaption>
            </figure>

            <div className="ratskap-reveal bg-white border border-brand/10 rounded-lg-design shadow-soft hover:border-brand/30 transition-colors p-6 md:p-8 sm:col-span-2">
              <p className="font-sans text-fluid-eyebrow uppercase tracking-[0.2em] text-brand mb-3">
                Pata Limi
              </p>
              <p className="font-sans text-fluid-body text-black/70 leading-relaxed">
                Pata Limi merupakan sendi perjanjian adat yang mengikat lima
                pihak dalam kesepakatan Larvul Ngabal — landasan di mana
                Ratskap Manyeuw Rumadian meneguhkan keabsahan hukumnya.
              </p>
            </div>

            <div className="ratskap-reveal bg-white border border-brand/10 rounded-lg-design shadow-soft hover:border-brand/30 transition-colors p-6 md:p-8 sm:col-span-2">
              <p className="font-sans text-fluid-eyebrow uppercase tracking-[0.2em] text-brand mb-3">
                Rat Yarbedang &amp; Rat Amardai
              </p>
              <p className="font-sans text-fluid-body text-black/70 leading-relaxed">
                Dua tokoh pengikat dalam sejarah Ratskap Manyeuw Rumadian yang
                bersama gong Dada Wadlau menjaga keutuhan serta kelestarian
                kedaulatan adat masyarakat Kei.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* 5.4 Wilayah Kekuasaan */}
      <div className="relative w-full py-20 md:py-28">
        <div className="max-w-[98%] xl:max-w-[1600px] mx-auto px-4 md:px-8 w-full">
          <p className="ratskap-reveal font-sans text-fluid-eyebrow uppercase tracking-[0.3em] text-brand mb-4">
            Jejak Kedaulatan · IV
          </p>
          <h3 className="ratskap-reveal font-serif text-fluid-h3 text-black mb-12">
            Wilayah Kekuasaan
          </h3>

          <p className="ratskap-reveal font-sans text-fluid-body text-black/70 leading-relaxed max-w-3xl mb-8">
            Kedaulatan Ratskap Manyeuw Rumadian memayungi tujuh kampung adat yang
            bersumpah dalam naungan hukum leluhur yang sama.
          </p>

          <ul className="ratskap-reveal grid grid-cols-2 gap-2 md:grid-cols-3 md:gap-3 lg:grid-cols-4">
            {KAMPUNG_ADAT.map((kampung) => (
              <li
                key={kampung}
                className="flex items-center justify-center gap-2 rounded-full bg-brand/10 px-3 py-2.5 text-center font-sans text-xs font-medium text-brand md:px-4 md:py-3 md:text-sm"
              >
                <MapIcon className="h-4 w-4 shrink-0" aria-hidden="true" />
                {kampung}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* 5.5 Garis Suksesi — Journey Node Marga Watratan */}
      <div className="relative w-full py-20 md:py-28">
        <div className="max-w-[98%] xl:max-w-[1600px] mx-auto px-4 md:px-8 w-full">
          <p className="ratskap-reveal font-sans text-fluid-eyebrow uppercase tracking-[0.3em] text-brand mb-4">
            Jejak Kedaulatan · V
          </p>
          <h3 className="ratskap-reveal font-serif text-fluid-h3 text-black mb-12">
            Garis Suksesi Marga Watratan
          </h3>

          <ol className="relative ml-3 md:ml-6 border-l-2 border-brand/30">
            {SUCCESSION.map((node) => (
                <li
                  key={node.title}
                  className="ratskap-reveal relative pl-6 md:pl-12 pb-10 last:pb-0"
                >
                <span
                  className="absolute -left-[11px] top-2 flex h-5 w-5 items-center justify-center rounded-full bg-brand shadow-soft"
                  aria-hidden="true"
                >
                  <span className="h-2 w-2 rounded-full bg-white" />
                </span>
                <div className="bg-white border border-brand/10 rounded-lg-design shadow-card hover:border-brand/30 transition-colors p-5 md:p-8">
                  <div className="flex flex-wrap items-center gap-3 mb-3">
                    <FlagIcon className="h-5 w-5 text-brand" aria-hidden="true" />
                    <span className="font-serif text-fluid-h4 text-brand">
                      {node.title}
                    </span>
                    {node.year && (
                      <span className="rounded-lg-design bg-brand/10 px-3 py-1 font-sans text-sm font-semibold text-brand">
                        {node.year}
                      </span>
                    )}
                  </div>
                  <p className="font-sans text-fluid-body text-black/70 leading-relaxed">
                    {node.description}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>

      {/* 5.5b Napak Tilas Pengangkatan Raja — Marga Watratan */}
      <div className="relative w-full py-20 md:py-28">
        <div className="max-w-[98%] xl:max-w-[1600px] mx-auto px-4 md:px-8 w-full">
          <p className="ratskap-reveal font-sans text-fluid-eyebrow uppercase tracking-[0.3em] text-brand mb-4">
            Jejak Kedaulatan · V-b
          </p>
          <h3 className="ratskap-reveal font-serif text-fluid-h3 text-black mb-12">
            Napak Tilas Pengangkatan Raja
          </h3>

          <p className="ratskap-reveal font-sans text-fluid-body text-black/70 leading-relaxed max-w-3xl mb-8">
            Napak tilas pengangkatan Raja mengajak kita menelusuri jejak
            penobatan Rat (Raja) adat Kerajaan Manyeuw yang berakar pada Marga
            Watratan. Upacara adat ini dihelat di Hutan Rumadian, pusaka suci
            tempat para leluhur bersumpah meneguhkan kedaulatan Ratskap Manyeuw
            Rumadian di tanah Evav.
          </p>

          <div className="ratskap-reveal flex items-center gap-2 rounded-full bg-brand/10 px-4 py-3 mb-8 w-fit font-sans text-sm font-medium text-brand">
            <MapIcon className="h-4 w-4 shrink-0" aria-hidden="true" />
            Lokasi: Hutan Rumadian, di wilayah marga Watratan
          </div>

          <div className="grid grid-cols-1 gap-4 md:gap-6 sm:grid-cols-2">
            <figure className="ratskap-reveal relative aspect-[4/3] w-full overflow-hidden rounded-xl-design shadow-card group">
              <div className="ratskap-parallax absolute -top-[12%] left-0 h-[124%] w-full">
                <Image
                  src="/images/heritage/napak-tilas-pengangkatan-raja.jpeg"
                  alt="Napak tilas pengangkatan Raja adat Kerajaan Manyeuw di Hutan Rumadian, wilayah marga Watratan"
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover object-center transition-transform duration-700 group-hover:scale-105"
                />
              </div>
            </figure>
            <figure className="ratskap-reveal relative aspect-[4/3] w-full overflow-hidden rounded-xl-design shadow-card group">
              <div className="ratskap-parallax absolute -top-[12%] left-0 h-[124%] w-full">
                <Image
                  src="/images/heritage/napak-tilas-pengangkatan-raja-2.jpeg"
                  alt="Prosesi adat pengangkatan Rat Manyeuw di Hutan Rumadian, Kei Kecil"
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover object-center transition-transform duration-700 group-hover:scale-105"
                />
              </div>
            </figure>
          </div>
        </div>
      </div>

      {/* 5.6 Tanggung Jawab Moral */}
      <div className="relative w-full py-20 md:py-28">
        <div className="max-w-[98%] xl:max-w-[1600px] mx-auto px-4 md:px-8 w-full">
          <p className="ratskap-reveal font-sans text-fluid-eyebrow uppercase tracking-[0.3em] text-brand mb-4">
            Jejak Kedaulatan · VI
          </p>
          <h3 className="ratskap-reveal font-serif text-fluid-h3 text-black mb-12">
            Tanggung Jawab Moral
          </h3>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-3 xl:gap-8">
            {RESPONSIBILITIES.map((card) => {
              const Icon = card.icon;
              return (
                <div
                  key={card.title}
                  className="ratskap-reveal bg-white border border-brand/10 rounded-lg-design shadow-soft hover:border-brand/30 transition-colors p-8"
                >
                  <span className="flex h-12 w-12 items-center justify-center rounded-full bg-brand/10 text-brand mb-5">
                    <Icon className="h-6 w-6" aria-hidden="true" />
                  </span>
                  <h4 className="font-serif text-fluid-h4 text-black mb-3">
                    {card.title}
                  </h4>
                  <p className="font-sans text-fluid-body text-black/70 leading-relaxed">
                    {card.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* 5.7 Penutup Ratskap */}
      <div className="relative w-full py-24 md:py-32">
        <div className="max-w-[98%] xl:max-w-[1600px] mx-auto px-4 md:px-8 w-full">
          <blockquote className="ratskap-reveal max-w-4xl font-serif text-fluid-h3 leading-[1.3] text-black">
            &ldquo;Menelusuri sejarah Ratskap Manyeuw Rumadian adalah memahami
            detak jantung budaya masyarakat Kei. Mari bersama-sama menghormati
            dan melestarikan warisan identitas bangsa yang terus hidup hingga
            hari ini.&rdquo;
          </blockquote>

          <div className="ratskap-reveal mt-12">
            <a
              href="/culture"
              onMouseMove={onMouseMove}
              onMouseLeave={onMouseLeave}
              aria-label="Pelajari Budaya Adat Kepulauan Kei"
              className="btn-cta group inline-flex items-center gap-2 rounded-xl px-6 py-3 font-sans text-sm font-semibold uppercase tracking-widest focus-ring"
            >
              Pelajari Budaya Adat
              <ArrowRightIcon
                className="h-4 w-4 text-current transition-transform group-hover:translate-x-1"
                aria-hidden="true"
              />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
