"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
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
  description: { id: string; en: string };
};

type ResponsibilityCard = {
  title: { id: string; en: string };
  description: { id: string; en: string };
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
    description: {
      id: "Pemimpin Ratskap Manyeuw Rumadian dari Marga Watratan yang mengawal pelaksanaan hukum adat Larvul Ngabal menjaga tegaknya kedaulatan adat di tanah Evav.",
      en: "Leader of Ratskap Manyeuw Rumadian from the Watratan clan who upheld the Larvul Ngabal customary law, keeping customary sovereignty standing in the Land of Evav.",
    },
  },
  {
    title: "Rat Norbertus Watratan",
    year: "1994",
    description: {
      id: "Meneruskan garis suksesi Marga Watratan pada 1994, membawa tanggung jawab moral menjaga pengayoman, hukum adat, dan pelestarian warisan leluhur Kei.",
      en: "Continuing the Watratan clan succession line in 1994, bearing the moral duty to safeguard protection, customary law, and the preservation of Kei ancestral heritage.",
    },
  },
];

const RESPONSIBILITIES: ResponsibilityCard[] = [
  {
    title: {
      id: "Pengayoman",
      en: "Protection",
    },
    description: {
      id: "Menjaga dan melindungi seluruh warga dalam naungan Ratskap Manyeuw Rumadian, agar setiap orang berada dalam pangkuan adat yang menyejukkan.",
      en: "Guarding and protecting all citizens under the wings of Ratskap Manyeuw Rumadian, so that everyone rests in the soothing embrace of adat.",
    },
    icon: UserGroupIcon,
  },
  {
    title: {
      id: "Hukum Adat",
      en: "Customary Law",
    },
    description: {
      id: "Menegakkan Larvul Ngabal sebagai pangkal hukum leluhur, mengikat perjanjian dan sengketa dalam kesetaraan yang dihormati bersama.",
      en: "Upholding Larvul Ngabal as the root of ancestral law, binding agreements and disputes in mutually respected equality.",
    },
    icon: ShieldCheckIcon,
  },
  {
    title: {
      id: "Pelestarian",
      en: "Preservation",
    },
    description: {
      id: "Merawat gong Dada Wadlau, Pata Limi, dan memori tujuh kampung adat agar warisan identitas bangsa tetap hidup dari generasi ke generasi.",
      en: "Caring for the Dada Wadlau gong, Pata Limi, and the memory of the seven customary villages so the nation's identity heritage lives on from generation to generation.",
    },
    icon: SparklesIcon,
  },
];

export default function RatskapHeritageSection({ lang }: { lang: "id" | "en" }) {
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
            {lang === "en" ? "Sovereignty Trail · I" : "Jejak Kedaulatan · I"}
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
                  src="/images/heritage/raja-kei.png"
                  alt={lang === "en" ? "Ohoi Tel Nangan at dusk — a customary village under the wings of Ratskap Manyeuw Rumadian" : "Lanskap Ohoi Tel Nangan saat senja — kampung adat dalam naungan Ratskap Manyeuw Rumadian"}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover object-center transition-transform duration-700 group-hover:scale-105"
                />
              </div>
            </div>

            <div className="ratskap-reveal">
              <p className="font-sans text-fluid-body text-black/70 leading-relaxed">
                {lang === "en" ? (
                  <>
                    In the 1870s, Ratskap Manyeuw Rumadian stood as a pillar of
                    customary sovereignty in the Land of Evav. It kept the
                    ancestral law Larvul Ngabal upright, binding agreements and
                    nurturing peace among villages in the spirit of Kei
                    brotherhood.
                  </>
                ) : (
                  <>
                    Pada era 1870-an, Ratskap Manyeuw Rumadian berdiri sebagai
                    pilar kedaulatan adat di tanah Evav. Ia menjaga tegaknya
                    hukum leluhur Larvul Ngabal, mengikat perjanjian dan
                    memelihara kedamaian antarkampung dengan semangat
                    persaudaraan Kei.
                  </>
                )}
              </p>
              <p className="mt-6 font-sans text-fluid-body text-black/70 leading-relaxed">
                {lang === "en" ? (
                  <>
                    In Ohoi Tel Nangan, that sovereign footprint still beats —
                    in the gong, in the clan, and in the seven villages that swore
                    under the same wings.
                  </>
                ) : (
                  <>
                    Di Ohoi Tel Nangan, jejak kedaulatan itu masih berdetak —
                    dalam gong, dalam marga, dan dalam tujuh kampung yang
                    bersumpah di bawah naungan yang sama.
                  </>
                )}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* 5.2 Filosofi Kepemimpinan */}
      <div className="relative w-full py-20 md:py-28">
        <div className="max-w-[98%] xl:max-w-[1600px] mx-auto px-4 md:px-8 w-full">
          <p className="ratskap-reveal font-sans text-fluid-eyebrow uppercase tracking-[0.3em] text-brand mb-4">
            {lang === "en" ? "Sovereignty Trail · II" : "Jejak Kedaulatan · II"}
          </p>
          <h3 className="ratskap-reveal font-serif text-fluid-h3 text-black mb-12">
            {lang === "en" ? (
              <>
                Leadership Philosophy &ldquo;Rat Manyeuw&rdquo;
              </>
            ) : (
              <>
                Filosofi Kepemimpinan &ldquo;Rat Manyeuw&rdquo;
              </>
            )}
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 xl:gap-16 gap-y-12 md:gap-y-10 items-center">
            <div className="ratskap-reveal relative w-full h-[320px] md:h-[420px] rounded-xl-design overflow-hidden shadow-card group">
              <div className="ratskap-parallax absolute -top-[12%] left-0 h-[124%] w-full">
                <Image
                  src="/images/heritage/raja-raja-rat.png"
                  alt={lang === "en" ? "A small eagle — symbol of the Rat Manyeuw philosophy in Kei customary leadership" : "Elang kecil — lambang filosofi Rat Manyeuw dalam kepemimpinan adat Kei"}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover object-center transition-transform duration-700 group-hover:scale-105"
                />
              </div>
            </div>

            <div className="ratskap-reveal">
              <p className="font-serif text-fluid-h3 leading-[1.3] text-black/80">
                {lang === "en" ? (
                  <>
                    &ldquo;Rat Manyeuw&rdquo; is a small eagle &mdash; not
                    showing off, yet seeing far and guarding its land with calm.
                    Such is how a true Kei customary leader leads: humble, sharp of
                    sight, and grounded in the one.
                  </>
                ) : (
                  <>
                    &ldquo;Rat Manyeuw&rdquo; adalah elang kecil &mdash; tidak
                    menonjolkan diri, namun memandang jauh dan menjaga tanahnya
                    dengan ketenangan. Begitilah seorang pemimpin adat Kei sejati
                    memimpin: rendah hati, tajam pandang, dan berpijak pada yang
                    satu.
                  </>
                )}
              </p>
              <p className="mt-6 font-sans text-fluid-body text-black/70 leading-relaxed">
                {lang === "en" ? (
                  <>
                    Leadership is not about standing above others, but about
                    spreading a protective wing over every village entrusted to
                    him.
                  </>
                ) : (
                  <>
                    Kepemimpinan bukan tentang berdiri di atas yang lain,
                    melainkan tentang membentangkan sayap pelindung bagi seluruh
                    kampung yang dipercayakan kepadanya.
                  </>
                )}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* 5.2b Tujuh Kampung Adat */}
      <div className="relative w-full py-20 md:py-28">
        <div className="max-w-[98%] xl:max-w-[1600px] mx-auto px-4 md:px-8 w-full">
          <p className="ratskap-reveal font-sans text-fluid-eyebrow uppercase tracking-[0.3em] text-brand mb-4">
            {lang === "en" ? "Sovereignty Trail · II-b" : "Jejak Kedaulatan · II-b"}
          </p>
          <h3 className="ratskap-reveal font-serif text-fluid-h3 text-black mb-12">
            {lang === "en" ? "The Seven Sworn Customary Villages" : "Tujuh Kampung Adat Bersumpah"}
          </h3>

          <div className="grid grid-cols-1 min-[400px]:grid-cols-2 gap-4 md:gap-6 sm:grid-cols-3 lg:grid-cols-4">
            {[
              { src: "/images/heritage/kampung_debut.jpeg", alt: lang === "en" ? "Debut Village — one of the seven customary villages of Kei" : "Kampung Debut — salah satu dari tujuh kampung adat Kei", label: "Kampung Debut" },
              { src: "/images/heritage/kampung-selayar-.png", alt: lang === "en" ? "Selayar Village — landscape of a Kei customary ohoi" : "Kampung Selayar — lanskap ohoi adat Kei", label: "Kampung Selayar" },
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
            {lang === "en" ? "Sovereignty Trail · III" : "Jejak Kedaulatan · III"}
          </p>
          <h3 className="ratskap-reveal font-serif text-fluid-h3 text-black mb-12">
            {lang === "en" ? "Historical Legitimacy" : "Legitimasi Sejarah"}
          </h3>

          <div className="grid grid-cols-1 gap-4 md:gap-6 sm:grid-cols-2 lg:grid-cols-4 sm:auto-rows-[220px] lg:auto-rows-[240px]">
            <figure className="ratskap-reveal relative w-full h-[260px] sm:h-full rounded-xl-design overflow-hidden shadow-card group sm:col-span-2 sm:row-span-2">
              <div className="ratskap-parallax absolute -top-[12%] left-0 h-[124%] w-full">
                <Image
                  src="/images/budaya/kei_gong_dada_ilustration.jpeg"
                  alt={lang === "en" ? "The Dada Wadlau customary gong — symbol of the legitimacy of Ratskap Manyeuw Rumadian" : "Gong adat Dada Wadlau — simbol legitimasi Ratskap Manyeuw Rumadian"}
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
                  {lang === "en" ? "The Dada Wadlau Gong" : "Gong Dada Wadlau"}
                </h4>
                <p className="mt-2 font-sans text-sm text-white/85 leading-relaxed">
                  {lang === "en" ? (
                    <>
                      The highest symbol of legitimacy of Ratskap Manyeuw
                      Rumadian &mdash; the gong&rsquo;s voice binding the validity
                      of customary sovereignty in the Land of Evav.
                    </>
                  ) : (
                    <>
                      Simbol legitimasi tertinggi Ratskap Manyeuw Rumadian &mdash;
                      suara gong yang mengikat keabsahan kedaulatan adat di tanah
                      Evav.
                    </>
                  )}
                </p>
              </figcaption>
            </figure>

            <div className="ratskap-reveal bg-white border border-brand/10 rounded-lg-design shadow-soft hover:border-brand/30 transition-colors p-6 md:p-8 sm:col-span-2">
              <p className="font-sans text-fluid-eyebrow uppercase tracking-[0.2em] text-brand mb-3">
                {lang === "en" ? "Pata Limi" : "Pata Limi"}
              </p>
              <p className="font-sans text-fluid-body text-black/70 leading-relaxed">
                {lang === "en" ? (
                  <>
                    Pata Limi is the joint of the customary agreement that binds
                    five parties in the Larvul Ngabal covenant &mdash; the
                    foundation upon which Ratskap Manyeuw Rumadian affirms its
                    legal validity.
                  </>
                ) : (
                  <>
                    Pata Limi merupakan sendi perjanjian adat yang mengikat lima
                    pihak dalam kesepakatan Larvul Ngabal &mdash; landasan di mana
                    Ratskap Manyeuw Rumadian meneguhkan keabsahan hukumnya.
                  </>
                )}
              </p>
            </div>

            <div className="ratskap-reveal bg-white border border-brand/10 rounded-lg-design shadow-soft hover:border-brand/30 transition-colors p-6 md:p-8 sm:col-span-2">
              <p className="font-sans text-fluid-eyebrow uppercase tracking-[0.2em] text-brand mb-3">
                {lang === "en" ? "Rat Yarbedang & Rat Amardai" : "Rat Yarbedang & Rat Amardai"}
              </p>
              <p className="font-sans text-fluid-body text-black/70 leading-relaxed">
                {lang === "en" ? (
                  <>
                    Two binding figures in the history of Ratskap Manyeuw
                    Rumadian who, together with the Dada Wadlau gong, guard the
                    unity and preservation of Kei customary sovereignty.
                  </>
                ) : (
                  <>
                    Dua tokoh pengikat dalam sejarah Ratskap Manyeuw Rumadian
                    yang bersama gong Dada Wadlau menjaga keutuhan serta
                    kelestarian kedaulatan adat masyarakat Kei.
                  </>
                )}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* 5.4 Wilayah Kekuasaan */}
      <div className="relative w-full py-20 md:py-28">
        <div className="max-w-[98%] xl:max-w-[1600px] mx-auto px-4 md:px-8 w-full">
          <p className="ratskap-reveal font-sans text-fluid-eyebrow uppercase tracking-[0.3em] text-brand mb-4">
            {lang === "en" ? "Sovereignty Trail · IV" : "Jejak Kedaulatan · IV"}
          </p>
          <h3 className="ratskap-reveal font-serif text-fluid-h3 text-black mb-12">
            {lang === "en" ? "Realm of Power" : "Wilayah Kekuasaan"}
          </h3>

          <p className="ratskap-reveal font-sans text-fluid-body text-black/70 leading-relaxed max-w-3xl mb-8">
            {lang === "en" ? (
              <>
                The sovereignty of Ratskap Manyeuw Rumadian shelters the seven
                customary villages that swore under the same ancestral law.
              </>
            ) : (
              <>
                Kedaulatan Ratskap Manyeuw Rumadian memayungi tujuh kampung adat
                yang bersumpah dalam naungan hukum leluhur yang sama.
              </>
            )}
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
            {lang === "en" ? "Sovereignty Trail · V" : "Jejak Kedaulatan · V"}
          </p>
          <h3 className="ratskap-reveal font-serif text-fluid-h3 text-black mb-12">
            {lang === "en" ? "Watratan Clan Succession Line" : "Garis Suksesi Marga Watratan"}
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
                    {node.description[lang]}
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
            {lang === "en" ? "Sovereignty Trail · V-b" : "Jejak Kedaulatan · V-b"}
          </p>
          <h3 className="ratskap-reveal font-serif text-fluid-h3 text-black mb-12">
            {lang === "en" ? "Tracing the King's Installation" : "Napak Tilas Pengangkatan Raja"}
          </h3>

          <p className="ratskap-reveal font-sans text-fluid-body text-black/70 leading-relaxed max-w-3xl mb-8">
            {lang === "en" ? (
              <>
                Tracing the King&rsquo;s installation invites us to follow the
                coronation of the Rat (King) of the Manyeuw customary kingdom,
                rooted in the Watratan clan. This customary ceremony is held in
                the Rumadian Forest, a sacred heirloom where the ancestors swore
                to affirm the sovereignty of Ratskap Manyeuw Rumadian in the Land
                of Evav.
              </>
            ) : (
              <>
                Napak tilas pengangkatan Raja mengajak kita menelusuri jejak
                penobatan Rat (Raja) adat Kerajaan Manyeuw yang berakar pada
                Marga Watratan. Upacara adat ini dihelat di Hutan Rumadian,
                pusaka suci tempat para leluhur bersumpah meneguhkan kedaulatan
                Ratskap Manyeuw Rumadian di tanah Evav.
              </>
            )}
          </p>

          <div className="ratskap-reveal flex items-center gap-2 rounded-full bg-brand/10 px-4 py-3 mb-8 w-fit font-sans text-sm font-medium text-brand">
            <MapIcon className="h-4 w-4 shrink-0" aria-hidden="true" />
            {lang === "en" ? "Location: Rumadian Forest, in the Watratan clan territory" : "Lokasi: Hutan Rumadian, di wilayah marga Watratan"}
          </div>

          <div className="grid grid-cols-1 gap-4 md:gap-6 sm:grid-cols-2">
            <figure className="ratskap-reveal relative aspect-[4/3] w-full overflow-hidden rounded-xl-design shadow-card group">
              <div className="ratskap-parallax absolute -top-[12%] left-0 h-[124%] w-full">
                <Image
                  src="/images/heritage/napak-tilas-pengangkatan-raja.jpeg"
                  alt={lang === "en" ? "Tracing the installation of the Manyeuw customary King in Rumadian Forest, Watratan clan territory" : "Napak tilas pengangkatan Raja adat Kerajaan Manyeuw di Hutan Rumadian, wilayah marga Watratan"}
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
                  alt={lang === "en" ? "The Rat Manyeuw installation procession in Rumadian Forest, Kei Kecil" : "Prosesi adat pengangkatan Rat Manyeuw di Hutan Rumadian, Kei Kecil"}
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
            {lang === "en" ? "Sovereignty Trail · VI" : "Jejak Kedaulatan · VI"}
          </p>
          <h3 className="ratskap-reveal font-serif text-fluid-h3 text-black mb-12">
            {lang === "en" ? "Moral Responsibility" : "Tanggung Jawab Moral"}
          </h3>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-3 xl:gap-8">
            {RESPONSIBILITIES.map((card) => {
              const Icon = card.icon;
              return (
                <div
                  key={card.title.id}
                  className="ratskap-reveal bg-white border border-brand/10 rounded-lg-design shadow-soft hover:border-brand/30 transition-colors p-8"
                >
                  <span className="flex h-12 w-12 items-center justify-center rounded-full bg-brand/10 text-brand mb-5">
                    <Icon className="h-6 w-6" aria-hidden="true" />
                  </span>
                  <h4 className="font-serif text-fluid-h4 text-black mb-3">
                    {card.title[lang]}
                  </h4>
                  <p className="font-sans text-fluid-body text-black/70 leading-relaxed">
                    {card.description[lang]}
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
            {lang === "en" ? (
              <>
                &ldquo;Tracing the history of Ratskap Manyeuw Rumadian is to
                understand the heartbeat of Kei culture. Let us together honor
                and preserve the living heritage of our national identity that
                continues to this day.&rdquo;
              </>
            ) : (
              <>
                &ldquo;Menelusuri sejarah Ratskap Manyeuw Rumadian adalah
                memahami detak jantung budaya masyarakat Kei. Mari
                bersama-sama menghormati dan melestarikan warisan identitas
                bangsa yang terus hidup hingga hari ini.&rdquo;
              </>
            )}
          </blockquote>

          <div className="ratskap-reveal mt-12">
            <Link
              href={`/${lang}/culture`}
              onMouseMove={onMouseMove}
              onMouseLeave={onMouseLeave}
              aria-label={lang === "en" ? "Learn the Kei Customary Culture" : "Pelajari Budaya Adat Kepulauan Kei"}
              className="btn-cta group inline-flex items-center gap-2 rounded-xl px-6 py-3 font-sans text-sm font-semibold uppercase tracking-widest focus-ring"
            >
              {lang === "en" ? "Learn the Customary Culture" : "Pelajari Budaya Adat"}
              <ArrowRightIcon
                className="h-4 w-4 text-current transition-transform group-hover:translate-x-1"
                aria-hidden="true"
              />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
