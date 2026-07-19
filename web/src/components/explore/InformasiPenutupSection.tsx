"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  MapPinIcon,
  PaperAirplaneIcon,
  BuildingOfficeIcon,
  ArrowRightIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { useSpotlight } from "@/hooks/useSpotlight";

if (typeof window !== "undefined") gsap.registerPlugin(ScrollTrigger);

const JADWAL_RESSMI_URL = "https://www.malukutenggarakab.go.id";

export default function InformasiPenutupSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const barRef = useRef<HTMLDivElement>(null);
  const [showPinned, setShowPinned] = useState(false);
  const [dismissed, setDismissed] = useState(false);
  const [isLightSection, setIsLightSection] = useState(false);
  const { onMouseMove, onMouseLeave } = useSpotlight();

  useEffect(() => {
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const ctx = gsap.context(() => {
      if (prefersReduced) {
        gsap.set(".penutup-fade", { opacity: 1, y: 0 });
      } else {
        gsap.from(".penutup-fade", {
          opacity: 0,
          y: 30,
          duration: 1.1,
          stagger: 0.18,
          ease: "power2.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 70%",
            toggleActions: "play none none reverse",
          },
        });
      }
    }, sectionRef);

    const handleScroll = () => {
      if (dismissed) return;
      const scrollY = window.scrollY;
      const threshold =
        (document.documentElement.scrollHeight - window.innerHeight) * 0.5;
      setShowPinned(scrollY > threshold);

      // Deteksi section aktif untuk penyesuaian tema overlay
      const sections = document.querySelectorAll("section");
      let activeSectionId = "";
      const testPoint = window.innerHeight - 100;

      sections.forEach((section) => {
        const rect = section.getBoundingClientRect();
        if (rect.top <= testPoint && rect.bottom >= testPoint) {
          activeSectionId = section.id;
        }
      });

      const lightSectionIds = [
        "wer-warat",
        "pentas-seni",
        "perahu-belan",
        "wisata-alam",
        "satwa-endemik",
      ];

      setIsLightSection(lightSectionIds.includes(activeSectionId));
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll);

    if (barRef.current && !prefersReduced) {
      gsap.set(barRef.current, { yPercent: 150, opacity: 0 });
    }

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
      ctx.revert();
    };
  }, [dismissed]);

  useEffect(() => {
    const bar = barRef.current;
    if (!bar) return;
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReduced) {
      gsap.set(bar, { yPercent: 0, opacity: 1 });
      return;
    }
    gsap.to(bar, {
      yPercent: showPinned ? 0 : 150,
      opacity: showPinned ? 1 : 0,
      duration: 0.4,
      ease: "power2.out",
    });
  }, [showPinned]);

  return (
    <>
      <section
        id="informasi-penutup"
        ref={sectionRef}
        aria-label="Informasi dan penutup Festival Pesona Meti Kei"
        className="relative w-full min-h-screen snap-start snap-always flex items-center bg-[#0C121D] z-[2] py-16 sm:py-20 md:py-28"
      >
        <div className="max-w-[98%] xl:max-w-[1600px] mx-auto px-4 md:px-8 w-full">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
            <div className="penutup-fade relative w-full aspect-[4/3] md:aspect-[16/10] rounded-xl-design overflow-hidden brightness-110 contrast-105">
              <Image
                src="/images/meti/kei_beach.png"
                alt="Masyarakat Kei melambai menyambut wisatawan di pantai saat senja"
                fill
                className="object-cover rounded-xl-design"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>

            <div className="flex flex-col gap-6">
              <p className="penutup-fade font-sans text-xs md:text-sm uppercase tracking-[0.3em] text-white/60">
                Rencanakan Kunjungan
              </p>

              <h2 className="penutup-fade font-serif text-fluid-h1 md:text-5xl lg:text-6xl leading-tight text-white break-words">
                Mari{" "}
                <span className="font-cursive text-brand">
                  Jelajahi Tanah Evav
                </span>
              </h2>

              <p className="penutup-fade font-sans text-base md:text-lg leading-relaxed text-white/80">
                Dari Pasir Timbul Ngurtavur yang membelah laut, Pantai
                Ngurbloat berselimut pasir terhalus di dunia, Pulau Bair bak
                Raja Ampat mini, hingga Goa Hawang berair sebening kaca —
                keindahan alam Kei menanti. Festival mengikuti ritme bulan,
                bergeser mengikuti surut ekstrem yang ajaib. Pantau jadwal resmi
                Dinas Pariwisata Maluku Tenggara, siapkan penerbangan menuju
                Langgur, dan jadilah bagian dari perayaan alam yang hanya
                terjadi setahun sekali. Sampai jumpa di Tanah Evav.
              </p>

              <ul className="penutup-fade flex flex-col">
                <li className="flex items-start gap-3 py-4 border-b border-white/10 text-white/80">
                  <MapPinIcon
                    className="h-6 w-6 shrink-0 text-brand"
                    aria-hidden="true"
                  />
                  <span>
                    <span className="font-sans font-semibold">
                      Ngurbloat · Ngurtavur · Bair · Hawang
                    </span>{" "}
                    — permata alam Kepulauan Kei
                  </span>
                </li>
                <li className="flex items-start gap-3 py-4 border-b border-white/10 text-white/80">
                  <PaperAirplaneIcon
                    className="h-6 w-6 shrink-0 text-brand"
                    aria-hidden="true"
                  />
                  <span>
                    <span className="font-sans font-semibold">
                      Bandara Langgur
                    </span>{" "}
                    — pintu masuk Kei
                  </span>
                </li>
                <li className="flex items-start gap-3 py-4 border-b border-white/10 text-white/80">
                  <BuildingOfficeIcon
                    className="h-6 w-6 shrink-0 text-brand"
                    aria-hidden="true"
                  />
                  <span>
                    <span className="font-sans font-semibold">
                      Dinas Pariwisata Maluku Tenggara
                    </span>{" "}
                    — jadwal resmi
                  </span>
                </li>
              </ul>

              <div className="penutup-fade flex flex-col sm:flex-row flex-wrap items-start gap-4 mt-2">
                <a
                  href={JADWAL_RESSMI_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Pantau jadwal resmi Festival Meti Kei"
                  onMouseMove={onMouseMove}
                  onMouseLeave={onMouseLeave}
                  className="btn-spotlight btn-cta-dark rounded-full px-6 py-3 font-sans text-sm md:text-base font-semibold"
                >
                  Pantau Jadwal Resmi
                  <ArrowRightIcon className="h-5 w-5 text-current" aria-hidden="true" />
                </a>

                <Link
                  href="/keterhubungan"
                  aria-label="Hubungi Keluarga Evav"
                  onMouseMove={onMouseMove}
                  onMouseLeave={onMouseLeave}
                  className="btn-spotlight btn-cta-dark rounded-full px-6 py-3 font-sans text-sm md:text-base font-semibold"
                >
                  Hubungi Keluarga Evav
                  <ArrowRightIcon className="h-5 w-5 text-current" aria-hidden="true" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div
        ref={barRef}
        role="region"
        aria-label="Aksi cepat Festival Meti"
        className={`fixed bottom-0 left-0 right-0 z-[90] backdrop-blur-md border-t transition-all duration-300 ${isLightSection
          ? "bg-white/80 text-black border-brand/20"
          : "bg-tropical-dark/80 text-white border-white/15"
          }`}
      >
        <div className="max-w-[98%] xl:max-w-[1600px] mx-auto px-4 md:px-8 w-full py-1 sm:py-4 flex items-center justify-start gap-4">
          <button
            type="button"
            onClick={() => setDismissed(true)}
            aria-label="Tutup aksi cepat"
            className={`focus-ring shrink-0 rounded-full p-2.5 min-h-11 min-w-11 flex items-center justify-center transition-colors cursor-pointer ${isLightSection
              ? "text-black/55 hover:text-black"
              : "text-white/70 hover:text-white"
              }`}
          >
            <XMarkIcon className="h-5 w-5" aria-hidden="true" />
          </button>

          <p className="font-sans text-sm md:text-base flex flex-wrap items-center gap-3 md:gap-4">
            <span className={`hidden sm:inline ${isLightSection ? "text-black/70" : "text-white/80"}`}>
              Meti hanya setahun sekali —
            </span>
            <a
              href={JADWAL_RESSMI_URL}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Pantau jadwal resmi Festival Meti Kei"
              className={`btn-spotlight rounded-full px-4 py-2 font-sans text-xs md:text-sm font-semibold inline-flex items-center gap-2 transition-colors duration-300 ${isLightSection ? "btn-cta" : "btn-cta-dark"
                }`}
            >
              Pantau Jadwal Resmi
              <ArrowRightIcon className="h-4 w-4 text-current" aria-hidden="true" />
            </a>
          </p>
        </div>
      </div>
    </>
  );
}
