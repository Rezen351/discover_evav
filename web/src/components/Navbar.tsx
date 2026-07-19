"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { GlobeAltIcon, XMarkIcon } from "@heroicons/react/24/outline";

const navItemsId: { label: string; href: string }[] = [
  { label: "Eksplorasi", href: "/eksplorasi" },
  { label: "Culture", href: "/budaya" },
  { label: "Heritage", href: "/heritage" },
  { label: "Taste", href: "/taste" },
  { label: "Interaction", href: "/interaction" },
];

const navItemsEn: { label: string; href: string }[] = [
  { label: "Eksplorasi", href: "/eksplorasi" },
  { label: "Culture", href: "/budaya" },
  { label: "Heritage", href: "/heritage" },
  { label: "Taste", href: "/taste" },
  { label: "Interaction", href: "/interaction" },
];

const BRAND_SUBTITLE: Record<"id" | "en", string> = {
  id: "Peradaban di Atas Pasir Putih",
  en: "Civilization Upon White Sands",
};

type Lang = "id" | "en";

export default function Navbar() {
  const [showNavbar, setShowNavbar] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [lang, setLang] = useState<Lang>("id");
  const [isDarkTheme, setIsDarkTheme] = useState(false);

  useEffect(() => {
    const saved = window.localStorage.getItem("lang");
    if (saved === "id" || saved === "en") {
      setTimeout(() => setLang(saved), 0);
    }
  }, []);

  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  const toggleLang = () => {
    const next: Lang = lang === "id" ? "en" : "id";
    setLang(next);
    document.documentElement.lang = next;
    window.localStorage.setItem("lang", next);
  };

  const navItems = lang === "id" ? navItemsId : navItemsEn;
  const pathname = usePathname();
  const isLanding = pathname === "/";

  useEffect(() => {
    const handleScroll = () => {
      // Di landing page, navbar baru muncul setelah SELURUH section KEDUA (#jeda-jiwa)
      // terlewati. Di halaman lain, navbar muncul setelah section hero terlewati.
      let show = false;
      if (isLanding) {
        const second = document.getElementById("jeda-jiwa");
        show = !!second && second.getBoundingClientRect().bottom <= 0;
      } else {
        const heroEls = Array.from(document.querySelectorAll<HTMLElement>("[data-hero]"));
        show = heroEls.some((el) => el.getBoundingClientRect().bottom <= 0);
      }
      setShowNavbar(show);

      // Detect which section is under the navbar (around y = 100px)
      const sections = ["hero", "funfact", "journey", "budaya-adat", "destinasi-terbaik", "berita-umkm", "join-community", "footer", "meti-hero", "wer-warat", "pentas-seni", "perahu-belan", "wisata-kuliner", "penghormatan", "informasi-penutup", "heritage-hero", "heritage-prolog", "karel", "ratskap", "heritage-penghormatan", "heritage-penutup", "budaya-hero", "larvul-ngabal", "filosofi-kei", "ekspresi-budaya", "jeda-budaya", "warisan-takbenda", "linimasa-kei", "taste-hero", "signature-dishes", "taste-story", "taste-bento", "taste-closing", "interaction-hero", "keterhubungan-intro", "panggung-percakapan", "ruang-bersama", "faq", "pintu-keluar"];
      let activeSectionId = "";

      for (const id of sections) {
        const el = document.getElementById(id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 100 && rect.bottom >= 100) {
            activeSectionId = id;
            break;
          }
        }
      }

      const darkSections = ["hero", "funfact", "footer", "meti-hero", "penghormatan", "informasi-penutup", "heritage-hero", "heritage-penghormatan", "heritage-penutup", "budaya-hero", "taste-hero", "interaction-hero", "pintu-keluar"];
      setIsDarkTheme(darkSections.includes(activeSectionId));
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    // Run once on mount to capture initial section state
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isLanding]);

  const handleNavMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const pct = (x / rect.width) * 100;
    e.currentTarget.style.backgroundPosition = `${pct}% 50%`;
  };

  const handleNavMouseLeave = (e: React.MouseEvent<HTMLElement>) => {
    e.currentTarget.style.backgroundPosition = "50% 50%";
  };

  const closeMobile = () => setMobileOpen(false);

  return (
    <div className="fixed top-6 left-0 w-full z-[100] flex justify-center pointer-events-none">
      <nav
        onMouseMove={handleNavMouseMove}
        onMouseLeave={handleNavMouseLeave}
        className={`
          pointer-events-auto transition-all duration-[500ms] ease-[cubic-bezier(0.16,1,0.3,1)] origin-top
          backdrop-blur-xl
          overflow-visible flex items-center justify-center
          w-[95%] md:w-[85%] max-w-[1100px] rounded-full py-1.5 px-4 md:px-8
          ${isDarkTheme ? "bg-black/35 border border-white/10 text-white shadow-sm" : "bg-white/35 border border-white/20 text-black shadow-sm"}
          ${showNavbar ? "opacity-100 scale-100 translate-y-0" : "opacity-0 scale-x-[0.2] scale-y-[0.4] -translate-y-4 pointer-events-none"}
        `}
        style={{ backgroundPosition: "50% 50%", transition: "background-position 0.4s ease, opacity 500ms, transform 500ms, background-color 500ms, border-color 500ms, color 500ms" }}
      >
        <div className={`flex items-center justify-between w-full mx-auto h-10 md:h-12 transition-opacity duration-700 delay-100 ${showNavbar ? "opacity-100" : "opacity-0"}`}>

          {/* Left: Logo & Brand Name */}
          <Link href="/" className="flex items-center gap-3 cursor-pointer focus-ring rounded-md">
            <Image
              src={isDarkTheme ? "/Logo White.svg" : "/Logo%20Color.svg"}
              alt="Logo Simfoni Evav"
              width={36}
              height={36}
              unoptimized
              className={`object-contain w-8 h-8 md:w-9 md:h-9 ${isDarkTheme ? "brightness-0 invert" : ""}`}
            />
            <div className="flex flex-col justify-center overflow-hidden">
              <span className={`tracking-wide leading-tight text-sm md:text-base transition-colors duration-500 ${isDarkTheme ? "text-white" : "text-black"}`} style={{ fontFamily: "var(--font-serif)" }}>
                SIMFONI EVAV
              </span>
              <span className={`font-medium tracking-wide text-[9px] transition-colors duration-500 ${isDarkTheme ? "text-white/80" : "text-black/80"}`} style={{ fontFamily: "var(--font-sans)" }}>
                {BRAND_SUBTITLE[lang]}
              </span>
            </div>
          </Link>

          {/* Right: Links & GlobeAltIcon */}
          <div className="hidden lg:flex items-center gap-6">
            {navItems.map((item, i) => (
              <a
                key={i}
                href={item.href}
                className={`font-medium tracking-wide transition-colors duration-500 text-xs focus-ring rounded ${isDarkTheme ? "text-white/90 hover:text-brand" : "text-black hover:text-brand"}`}
                style={{ fontFamily: "var(--font-sans)" }}
              >
                {item.label}
              </a>
            ))}
            {/* Language Toggle */}
            <button
              type="button"
              onClick={toggleLang}
              aria-label={lang === "id" ? "Ganti ke bahasa Inggris" : "Switch to Indonesian"}
              className={`cursor-pointer transition-colors duration-500 flex items-center gap-2 border-l pl-4 focus-ring rounded ${isDarkTheme ? "text-white hover:text-brand border-white/15" : "text-black hover:text-brand border-black/10"}`}
            >
              <GlobeAltIcon className="w-4 h-4" />
              <span className="text-xs font-semibold tracking-wide" style={{ fontFamily: "var(--font-sans)" }}>
                {lang === "id" ? "ID" : "EN"}
              </span>
            </button>
          </div>

          {/* Mobile Menu Icon */}
          <button
            type="button"
            aria-label="Buka menu"
            onClick={() => setMobileOpen((v) => !v)}
            className={`lg:hidden cursor-pointer focus-ring rounded transition-colors duration-500 ${isDarkTheme ? "text-white" : "text-black"}`}
          >
            {mobileOpen ? (
              <XMarkIcon className="w-5 h-5" />
            ) : (
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" /></svg>
            )}
          </button>
        </div>
      </nav>

      {/* Mobile Drawer */}
      {mobileOpen && (
        <div className={`lg:hidden absolute top-[72px] w-[92%] max-w-[420px] rounded-3xl border backdrop-blur-xl shadow-xl py-4 px-5 flex flex-col gap-1 pointer-events-auto transition-colors duration-500 ${isDarkTheme ? "bg-black/85 border-white/10 text-white" : "bg-white/90 border-white/40 text-black"}`}>
          {navItems.map((item, i) => (
            <a
              key={i}
              href={item.href}
              onClick={closeMobile}
              className={`font-medium tracking-wide transition-colors duration-500 text-sm py-2.5 border-b last:border-0 ${isDarkTheme ? "text-white/90 hover:text-brand border-white/10" : "text-black hover:text-brand border-black/5"}`}
              style={{ fontFamily: "var(--font-sans)" }}
            >
              {item.label}
            </a>
          ))}
          <button
            type="button"
            onClick={toggleLang}
            className={`flex items-center gap-2 pt-3 cursor-pointer text-left transition-colors duration-500 ${isDarkTheme ? "text-white/70 hover:text-brand" : "text-black/70 hover:text-brand"}`}
          >
            <GlobeAltIcon className="w-4 h-4" />
            <span className="text-xs font-medium" style={{ fontFamily: "var(--font-sans)" }}>
              {lang === "id" ? "Ganti ke Inggris (EN)" : "Switch to Indonesian (ID)"}
            </span>
          </button>
        </div>
      )}
    </div>
  );
}
