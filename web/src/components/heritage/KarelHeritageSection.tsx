"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  BuildingLibraryIcon,
  CameraIcon,
  ChevronRightIcon,
  ClockIcon,
  FlagIcon,
  MapPinIcon,
  StarIcon,
} from "@heroicons/react/24/outline";
import { useSpotlight } from "@/hooks/useSpotlight";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

type TimelineNode = {
  year: string;
  title: { id: string; en: string };
  description: { id: string; en: string };
  icon: typeof ClockIcon;
};

type AwardCard = {
  title: { id: string; en: string };
  description: { id: string; en: string };
  icon: typeof StarIcon;
};

type LegacyItem = {
  title: { id: string; en: string };
  description: { id: string; en: string };
  image: string;
  alt: { id: string; en: string };
  /** grid span kelas asimetris (masonry) */
  className: string;
  icon: typeof MapPinIcon;
};

const TIMELINE: TimelineNode[] = [
  {
    year: "RMS Ambon",
    title: {
      id: "Perjuangan Awal Melawan RMS",
      en: "Early Struggle Against RMS",
    },
    description: {
      id: "Karel Sadsuitubun mengawal persatuan Indonesia menghadapi pemberontakan Republik Maluku Selatan (RMS) di Ambon, meneguhkan sikapnya membela Negara Kesatuan Republik Indonesia.",
      en: "Karel Sadsuitubun upheld Indonesian unity against the Republic of South Maluku (RMS) rebellion in Ambon, affirming his stance in defense of the Unitary State of the Republic of Indonesia.",
    },
    icon: FlagIcon,
  },
  {
    year: "DI/TII Aceh–Sulsel",
    title: {
      id: "Menjaga Stabilitas di Timur dan Barat",
      en: "Safeguarding Stability in the East and West",
    },
    description: {
      id: "Dalam gerakan Darul Islam/Tentara Islam Indonesia (DI/TII) di Aceh dan Sulawesi Selatan, ia ikut menjaga stabilitas wilayah demi utuhnya kedaulatan republik.",
      en: "During the Darul Islam/Indonesian Islamic Army (DI/TII) movement in Aceh and South Sulawesi, he helped maintain regional stability for the integrity of the republic's sovereignty.",
    },
    icon: ClockIcon,
  },
  {
    year: "1958",
    title: {
      id: "PRRI PERMESTA",
      en: "PRRI PERMESTA",
    },
    description: {
      id: "Pada 1958, ia terlibat dalam penanganan Pemerintah Revolusioner Republik Indonesia / Perjuangan Semesta (PRRI PERMESTA), menjaga keutuhan bangsa di tengah krisis wilayah.",
      en: "In 1958, he was involved in handling the Revolutionary Government of the Republic of Indonesia / Universal Struggle (PRRI PERMESTA), safeguarding national unity amid a regional crisis.",
    },
    icon: ClockIcon,
  },
  {
    year: "1961",
    title: {
      id: "TRIKORA — Pembebasan Irian Barat",
      en: "TRIKORA — Liberation of West Irian",
    },
    description: {
      id: "Melalui Trikora (1961), Karel Sadsuitubun ambil bagian dalam semangat pembebasan Irian Barat, memperluas pengabdiannya demi tanah air yang utuh.",
      en: "Through Trikora (1961), Karel Sadsuitubun joined the spirit of liberating West Irian, widening his devotion to a whole and undivided homeland.",
    },
    icon: FlagIcon,
  },
];

const AWARDS: AwardCard[] = [
  {
    title: {
      id: "Pahlawan Revolusi",
      en: "Revolutionary Hero",
    },
    description: {
      id: "Dianugerahi gelar Pahlawan Revolusi atas pengabdian dan pengorbanannya menjaga kedaulatan Indonesia.",
      en: "Conferred the title of Revolutionary Hero for his devotion and sacrifice in safeguarding Indonesia's sovereignty.",
    },
    icon: StarIcon,
  },
  {
    title: {
      id: "AIPDA Anumerta",
      en: "AIPDA Posthumously",
    },
    description: {
      id: "Menaungi pangkat Ajun Inspektur Polisi Dua (AIPDA) secara anumerta sebagai penghormatan tertinggi atas jasa pengabdiannya.",
      en: "Bestowed the rank of Second Police Inspector (AIPDA) posthumously as the highest honor for his service.",
    },
    icon: StarIcon,
  },
  {
    title: {
      id: "Bintang Republik Kelas II",
      en: "2nd Class Star of the Republic",
    },
    description: {
      id: "Menerima Bintang Republik Indonesia Kelas II, tanda jasa tertinggi negara bagi putra terbaik bangsa.",
      en: "Received the 2nd Class Star of the Republic of Indonesia, the state's highest decoration for the nation's finest sons.",
    },
    icon: StarIcon,
  },
];

const LEGACY: LegacyItem[] = [
  {
    title: {
      id: "Bandara Karel Sadsuitubun",
      en: "Karel Sadsuitubun Airport",
    },
    description: {
      id: "Bandara di Langgur yang memakai namanya — pintu udara menuju Tanah Evav.",
      en: "The airport in Langgur that bears his name — the air gateway to the Land of Evav.",
    },
    image: "/images/heritage/karel-sadsuitubun-airport-wikipedia.jpg",
    alt: {
      id: "Bandara Karel Sadsuitubun di Langgur — gerbang udara menuju Kepulauan Kei",
      en: "Karel Sadsuitubun Airport in Langgur — the air gateway to the Kei Islands",
    },
    className: "sm:col-span-2 sm:row-span-2",
    icon: MapPinIcon,
  },
  {
    title: {
      id: "KRI Karel Sadsuitubun (356)",
      en: "KRI Karel Sadsuitubun (356)",
    },
    description: {
      id: "Kapal perang Republik Indonesia yang membawa namanya berlayar menjaga nusantara.",
      en: "The Indonesian warship that carries his name, sailing to guard the archipelago.",
    },
    image: "/images/heritage/kriel_356.png",
    alt: {
      id: "KRI Karel Sadsuitubun (356) — kapal perang TNI AL yang memakai namanya",
      en: "KRI Karel Sadsuitubun (356) — the Indonesian Navy warship that bears his name",
    },
    className: "sm:col-span-1 sm:row-span-1",
    icon: FlagIcon,
  },
  {
    title: {
      id: "Jalan Karel Sadsuitubun",
      en: "Karel Sadsuitubun Street",
    },
    description: {
      id: "Nama jalan di berbagai daerah yang mencatat jejak patriotisme ke dalam keseharian warga.",
      en: "Streets across the region that inscribe his patriotism into the daily lives of citizens.",
    },
    image: "/images/heritage/karel_street.png",
    alt: {
      id: "Plang Jalan Karel Sadsuitubun — nama yang hidup dalam keseharian warga",
      en: "Karel Sadsuitubun Street sign — a name alive in the daily life of citizens",
    },
    className: "sm:col-span-1 sm:row-span-1",
    icon: MapPinIcon,
  },
  {
    title: {
      id: "Potret Formal Karel Sadsuitubun",
      en: "Formal Portrait of Karel Sadsuitubun",
    },
    description: {
      id: "Potret resmi sang putra Evav yang menghiasi ruang kenegaraan sebagai pengingat akan jasa pengabdiannya.",
      en: "The official portrait of Evav's son that adorns state rooms as a reminder of his service.",
    },
    image: "/images/heritage/foto-formal-karel-sadsuitubun.png",
    alt: {
      id: "Potret formal Karel Sadsuitubun — pengingat jasa pengabdiannya bagi bangsa",
      en: "Formal portrait of Karel Sadsuitubun — a reminder of his service to the nation",
    },
    className: "md:col-span-1 md:row-span-1",
    icon: CameraIcon,
  },
  {
    title: {
      id: "Monumen Pengabdian",
      en: "Monument of Devotion",
    },
    description: {
      id: "Monumen yang berdiri mengenang semangat dan pengorbanannya bagi merah-putih.",
      en: "A monument standing in memory of his spirit and sacrifice for the red-and-white.",
    },
    image: "/images/heritage/karel_monument_tragedy.jpeg",
    alt: {
      id: "Monumen peringatan Karel Sadsuitubun yang mengenang pengabdiannya",
      en: "Memorial monument of Karel Sadsuitubun honoring his devotion",
    },
    className: "sm:col-span-2 sm:row-span-1",
    icon: BuildingLibraryIcon,
  },
];

export default function KarelHeritageSection({ lang }: { lang: "id" | "en" }) {
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
        gsap.set(".karel-reveal", { opacity: 1, y: 0 });
        return;
      }

      gsap.utils.toArray<HTMLElement>(".karel-reveal").forEach((el) => {
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

      gsap.utils.toArray<HTMLElement>(".karel-parallax").forEach((el) => {
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
      id="karel"
      ref={sectionRef}
      aria-labelledby="karel-title"
      className="relative w-full md:snap-start md:snap-always z-[5] bg-section"
    >
      {/* 4.1 Pengantar */}
      <div className="relative w-full py-20 md:py-28">
        <div className="max-w-[98%] xl:max-w-[1600px] mx-auto px-4 md:px-8 w-full">
          <p className="karel-reveal font-sans text-fluid-eyebrow uppercase tracking-[0.3em] text-brand mb-4">
            {lang === "en" ? "Patriot Trail · I" : "Jejak Patriot · I"}
          </p>
          <h2
            id="karel-title"
            className="karel-reveal font-serif text-fluid-h2 leading-[1.12] text-black mb-12"
          >
            {lang === "en" ? (
              <>
                Karel Sadsuitubun, <span className="text-brand">Son of Evav</span>
              </>
            ) : (
              <>
                Karel Sadsuitubun, <span className="text-brand">Putra Evav</span>
              </>
            )}
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 xl:gap-16 items-center">
            <div className="karel-reveal relative w-full h-[360px] md:h-[480px] rounded-xl-design overflow-hidden shadow-card group">
              <div className="karel-parallax absolute -top-[12%] left-0 h-[124%] w-full">
                <Image
                  src="/images/heritage/foto-formal-karel-sadsuitubun.png"
                  alt={lang === "en" ? "Formal portrait of Karel Sadsuitubun — a hero from Ohoi Rumadian" : "Potret formal Karel Sadsuitubun — pahlawan dari Ohoi Rumadian"}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover object-center transition-transform duration-700 group-hover:scale-105"
                />
              </div>
            </div>

            <div className="karel-reveal">
              <p className="font-sans text-fluid-body text-black/70 leading-relaxed">
                {lang === "en" ? (
                  <>
                    Born 14 Oct 1928 with the nickname &ldquo;Kace&rdquo;,
                    Karel Sadsuitubun was a son of Ohoi Rumadian, Southeast
                    Maluku, who spent nearly his entire life in devotion to
                    guarding the red-and-white. From RMS Ambon, DI/TII
                    Aceh&ndash;Sulsel, PRRI PERMESTA 1958, to TRIKORA 1961, his
                    footsteps weave a long chapter of Indonesia&rsquo;s
                    sovereignty.
                  </>
                ) : (
                  <>
                    Lahir 14 Okt 1928 dengan panggilan akrab &ldquo;Kace&rdquo;,
                    Karel Sadsuitubun adalah putra Ohoi Rumadian, Maluku
                    Tenggara, yang melewati hampir sepanjang hidupnya mengabdi
                    menjaga merah-putih. Dari RMS Ambon, DI/TII
                    Aceh&ndash;Sulsel, PRRI PERMESTA 1958, hingga TRIKORA 1961,
                    jejaknya merangkai babak panjang sejarah kedaulatan
                    Indonesia.
                  </>
                )}
              </p>
              <p className="mt-6 font-sans text-fluid-body text-black/70 leading-relaxed">
                {lang === "en" ? (
                  <>
                    He is not merely a name in the archives. He is living proof
                    that even the smallest son of the eastern islands stands
                    shoulder to shoulder in guarding the nation&rsquo;s unity.
                  </>
                ) : (
                  <>
                    Ia bukan sekadar nama dalam arsip. Ia adalah wujud nyata
                    bahwa putra terkecil dari kepulauan timur pun berdiri sejajar
                    menjaga persatuan bangsa.
                  </>
                )}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* 4.2 Latar Belakang */}
      <div className="relative w-full py-20 md:py-28">
        <div className="max-w-[98%] xl:max-w-[1600px] mx-auto px-4 md:px-8 w-full">
          <h3 className="karel-reveal font-serif text-fluid-h3 text-black mb-12">
            {lang === "en" ? "Background" : "Latar Belakang"}
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 xl:gap-16 items-center">
            <div className="karel-reveal order-2 md:order-1">
              <span className="inline-block mb-6 px-5 py-3 rounded-lg-design bg-brand/10 text-brand font-sans text-fluid-h4 font-semibold">
                1928
              </span>
              <p className="font-sans text-fluid-body text-black/70 leading-relaxed">
                {lang === "en" ? (
                  <>
                    The year 1928 was no mere number. In Ohoi Rumadian, a life
                    was born to later bind itself to the fate of a young nation
                    just sprouting. The nickname &ldquo;Kace&rdquo; grew amid the
                    Kei adat that teaches brotherhood &mdash; a value he would
                    carry to a far wider field of devotion than his homeland.
                  </>
                ) : (
                  <>
                    Tahun 1928 bukan sekadar angka. Di Ohoi Rumadian, sebuah
                    nyawa lahir untuk kelak mengikat dirinya pada nasib satu
                    bangsa yang baru bertunas. Panggilan &ldquo;Kace&rdquo; tumbuh
                    di tengah adat Kei yang mengajarkan persaudaraan &mdash; nilai
                    yang kelak ia bawa ke medan pengabdian yang jauh lebih luas
                    dari kampung halamannya.
                  </>
                )}
              </p>
              <p className="mt-6 font-sans text-fluid-body text-black/70 leading-relaxed">
                {lang === "en" ? (
                  <>
                    His humble origins became a firm root: that love of country is
                    not decided by birthplace, but by the willingness to defend
                    the one.
                  </>
                ) : (
                  <>
                    Latar belakangnya yang bersahaja justru menjadi akar teguh:
                    bahwa cinta tanah air tidak ditentukan oleh tempat lahir,
                    melainkan oleh kerelaan untuk membela yang satu.
                  </>
                )}
              </p>
            </div>

            <div className="karel-reveal order-1 md:order-2 relative w-full h-[320px] md:h-[420px] rounded-xl-design overflow-hidden shadow-card group">
              <div className="karel-parallax absolute -top-[12%] left-0 h-[124%] w-full">
                <Image
                  src="/images/heritage/karel_street.png"
                  alt={lang === "en" ? "Ohoi Rumadian — the hometown of Karel Sadsuitubun in the Kei Islands" : "Ohoi Rumadian — kampung halaman Karel Sadsuitubun di Kepulauan Kei"}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover object-center transition-transform duration-700 group-hover:scale-105"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 4.3 Rekam Jejak — Timeline Vertikal */}
      <div className="relative w-full py-20 md:py-28">
        <div className="max-w-[98%] xl:max-w-[1600px] mx-auto px-4 md:px-8 w-full">
          <p className="karel-reveal font-sans text-fluid-eyebrow uppercase tracking-[0.3em] text-brand mb-4">
            {lang === "en" ? "Patriot Trail · III" : "Jejak Patriot · III"}
          </p>
          <h3 className="karel-reveal font-serif text-fluid-h3 text-black mb-12">
            {lang === "en" ? "Footsteps" : "Rekam Jejak"}
          </h3>

          <ol className="relative ml-3 md:ml-6 border-l-2 border-brand/30">
            {TIMELINE.map((node) => {
              const Icon = node.icon;
              return (
                <li key={node.year} className="karel-reveal relative pl-6 md:pl-12 pb-10 last:pb-0">
                  <span
                    className="absolute -left-[11px] top-2 flex h-5 w-5 items-center justify-center rounded-full bg-brand shadow-soft"
                    aria-hidden="true"
                  >
                    <span className="h-2 w-2 rounded-full bg-white" />
                  </span>
                  <div className="bg-white border border-brand/10 rounded-lg-design shadow-card hover:border-brand/30 transition-colors p-5 md:p-8">
                    <div className="flex items-center gap-3 mb-3">
                      <Icon className="h-5 w-5 text-brand" aria-hidden="true" />
                      <span className="font-serif text-fluid-h4 text-brand">
                        {node.year}
                      </span>
                    </div>
                    <h4 className="font-serif text-fluid-h4 text-black mb-2">
                      {node.title[lang]}
                    </h4>
                    <p className="font-sans text-fluid-body text-black/70 leading-relaxed">
                      {node.description[lang]}
                    </p>
                  </div>
                </li>
              );
            })}
          </ol>
        </div>
      </div>

      {/* 4.4 Tragedi & Pengabdian Akhir */}
      <div className="relative w-full py-20 md:py-28">
        <div className="max-w-[98%] xl:max-w-[1600px] mx-auto px-4 md:px-8 w-full">
          <p className="karel-reveal font-sans text-fluid-eyebrow uppercase tracking-[0.3em] text-brand mb-4">
            {lang === "en" ? "Patriot Trail · IV" : "Jejak Patriot · IV"}
          </p>
          <h3 className="karel-reveal font-serif text-fluid-h3 text-black mb-12">
            {lang === "en" ? "Tragedy & Final Devotion" : "Tragedi & Pengabdian Akhir"}
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 xl:gap-16 items-center">
            <div className="karel-reveal relative w-full h-[360px] md:h-[480px] rounded-xl-design overflow-hidden shadow-card group">
              <div className="karel-parallax absolute -top-[12%] left-0 h-[124%] w-full">
                <Image
                  src="/images/heritage/karel_monument_tragedy.jpeg"
                  alt={lang === "en" ? "Memorial monument for the fall of Karel Sadsuitubun in the G30S/PKI tragedy" : "Monumen peringatan gugurnya Karel Sadsuitubun dalam peristiwa G30S/PKI"}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover object-center transition-transform duration-700 group-hover:scale-105"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
            </div>

            <div className="karel-reveal">
              <p className="font-sans text-fluid-body text-black/70 leading-relaxed">
                {lang === "en" ? (
                  <>
                    In the G30S/PKI tragedy on 30 Sep 1965, Karel Sadsuitubun
                    fell while carrying out his state duties. He was in the
                    entourage of WAPERDAM II Dr. J. Leimena, his final devotion
                    leading him to the edge of life for the red-and-white.
                  </>
                ) : (
                  <>
                    Dalam peristiwa G30S/PKI pada 30 Sep 1965, Karel
                    Sadsuitubun gugur saat menjalankan tugas negara. Ia berada
                    dalam rombongan WAPERDAM II Dr. J. Leimena, pengabdian
                    terakhir yang membawanya ke ujung nyawa demi merah-putih.
                  </>
                )}
              </p>
              <p className="mt-6 font-sans text-fluid-body text-black/70 leading-relaxed">
                {lang === "en" ? (
                  <>
                    The tragedy did not end his story. He was named a
                    Revolutionary Hero &mdash; an eternal name, not mere memory.
                  </>
                ) : (
                  <>
                    Tragedi itu tidak mengakhiri kisahnya. Ia ditetapkan sebagai
                    Pahlawan Revolusi &mdash; nama yang abadi, bukan sekadar
                    kenangan.
                  </>
                )}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* 4.5 Penghormatan & Anugerah */}
      <div className="relative w-full py-20 md:py-28">
        <div className="max-w-[98%] xl:max-w-[1600px] mx-auto px-4 md:px-8 w-full">
          <p className="karel-reveal font-sans text-fluid-eyebrow uppercase tracking-[0.3em] text-brand mb-4">
            {lang === "en" ? "Patriot Trail · V" : "Jejak Patriot · V"}
          </p>
          <h3 className="karel-reveal font-serif text-fluid-h3 text-black mb-12">
            {lang === "en" ? "Honor & Awards" : "Penghormatan & Anugerah"}
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 xl:gap-8">
            {AWARDS.map((award) => {
              const Icon = award.icon;
              return (
                <div
                  key={award.title.id}
                  className="karel-reveal bg-white border border-brand/10 rounded-lg-design shadow-soft hover:border-brand/30 transition-colors p-8"
                >
                  <span className="flex h-12 w-12 items-center justify-center rounded-full bg-brand/10 text-brand mb-5">
                    <Icon className="h-6 w-6" aria-hidden="true" />
                  </span>
                  <h4 className="font-serif text-fluid-h4 text-black mb-3">
                    {award.title[lang]}
                  </h4>
                  <p className="font-sans text-fluid-body text-black/70 leading-relaxed">
                    {award.description[lang]}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* 4.6 Warisan Terabadikan — Kolase Asimetris */}
      <div className="relative w-full py-20 md:py-28">
        <div className="max-w-[98%] xl:max-w-[1600px] mx-auto px-4 md:px-8 w-full">
          <p className="karel-reveal font-sans text-fluid-eyebrow uppercase tracking-[0.3em] text-brand mb-4">
            {lang === "en" ? "Patriot Trail · VI" : "Jejak Patriot · VI"}
          </p>
          <h3 className="karel-reveal font-serif text-fluid-h3 text-black mb-12">
            {lang === "en" ? "An Enduring Legacy" : "Warisan Terabadikan"}
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 auto-rows-[200px] sm:auto-rows-[220px] md:auto-rows-[240px] gap-4 md:gap-6">
            {LEGACY.map((item) => {
              const Icon = item.icon;
              return (
                <figure
                  key={item.title.id}
                  className={`karel-reveal relative w-full h-full rounded-xl-design overflow-hidden shadow-card group ${item.className} sm:col-span-1`}
                >
                  <div className="karel-parallax absolute -top-[12%] left-0 h-[124%] w-full">
                    <Image
                      src={item.image}
                      alt={item.alt[lang]}
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="object-cover object-center transition-transform duration-700 group-hover:scale-105"
                    />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                  <figcaption className="absolute inset-x-0 bottom-0 p-5 md:p-6">
                    <div className="flex items-center gap-2 mb-1">
                      <Icon className="h-4 w-4 text-white" aria-hidden="true" />
                      <span className="font-serif text-fluid-h4 text-white">
                        {item.title[lang]}
                      </span>
                    </div>
                    <p className="font-sans text-sm text-white/85 leading-relaxed">
                      {item.description[lang]}
                    </p>
                  </figcaption>
                </figure>
              );
            })}
          </div>
        </div>
      </div>

      {/* 4.7 Penutup Karel */}
      <div className="relative w-full py-24 md:py-32">
        <div className="max-w-[98%] xl:max-w-[1600px] mx-auto px-4 md:px-8 w-full">
          <blockquote className="karel-reveal max-w-4xl font-serif text-fluid-h3 leading-[1.3] text-black">
            {lang === "en" ? (
              <>
                &ldquo;Let us remember and nurture the patriotic spirit he
                bequeathed. History is not merely a record of the past, but a
                compass for a future built upon Pancasila and the 1945
                Constitution.&rdquo;
              </>
            ) : (
              <>
                &ldquo;Mari mengenang dan merawat semangat patriotisme yang ia
                wariskan. Sejarah bukan sekadar catatan masa lalu, melainkan
                kompas bagi masa depan bangsa yang berlandaskan Pancasila dan UUD
                1945.&rdquo;
              </>
            )}
          </blockquote>

          <div className="karel-reveal mt-12">
            <Link
              href={`/${lang}/culture`}
              onMouseMove={onMouseMove}
              onMouseLeave={onMouseLeave}
              aria-label={lang === "en" ? "Discover the Kei Customary Culture" : "Kenali Budaya Adat Kepulauan Kei"}
              className="btn-cta group inline-flex items-center gap-2 rounded-xl px-6 py-3 font-sans text-sm font-semibold uppercase tracking-widest focus-ring"
            >
              {lang === "en" ? "Discover the Customary Culture" : "Kenali Budaya Adat"}
              <ChevronRightIcon
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
