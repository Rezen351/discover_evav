"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import {
  EnvelopeIcon,
  PhoneIcon,
  MapPinIcon,
  ChevronRightIcon,
} from "@heroicons/react/24/outline";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SocialIcon from "@/components/SocialIcon";
import { useSpotlight } from "@/hooks/useSpotlight";
import {
  CONTACT_EMAIL,
  EMAIL_URL,
  WHATSAPP_URL,
  SOCIAL_LINKS,
} from "@/content/social";


if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface ChannelItem {
  idLabel: string;
  enLabel: string;
  value: string;
  enValue?: string;
  href: string;
  Icon: typeof EnvelopeIcon;
}

const channels: ChannelItem[] = [
  {
    idLabel: "Email",
    enLabel: "Email",
    value: CONTACT_EMAIL,
    href: EMAIL_URL,
    Icon: EnvelopeIcon,
  },
  {
    idLabel: "Telepon & WhatsApp",
    enLabel: "Phone & WhatsApp",
    value: "+62 821-1234-5678",
    href: WHATSAPP_URL,
    Icon: PhoneIcon,
  },
  {
    idLabel: "Lokasi",
    enLabel: "Location",
    value: "Kepulauan Kei, Maluku Tenggara",
    enValue: "Kei Islands, Southeast Maluku",
    href: "https://maps.google.com/?q=Kepulauan+Kei+Maluku+Tenggara",
    Icon: MapPinIcon,
  },
];

const socials = SOCIAL_LINKS;

export default function ContactUsSection({ lang }: { lang: "id" | "en" }) {
  const sectionRef = useRef<HTMLElement>(null);
  const { onMouseMove, onMouseLeave } = useSpotlight();

  useEffect(() => {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) return;

    const ctx = gsap.context(() => {
      gsap.from(".fade-up", {
        y: 40,
        opacity: 0,
        duration: 0.8,
        stagger: 0.12,
        ease: "power2.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="pintu-keluar"
      ref={sectionRef}
      className="relative w-full min-h-screen snap-start snap-always flex items-center justify-center bg-tropical-dark z-[1] py-16 md:py-24"
    >
      <div className="max-w-[98%] xl:max-w-[1600px] mx-auto px-4 md:px-8 w-full">
        <div className="w-full flex flex-col lg:flex-row items-stretch rounded-2xl overflow-hidden glass-dark">
          {/* LEFT COLUMN: Budaya image with teal glow + farewell quote */}
          <div className="w-full lg:w-1/2 min-h-[320px] lg:min-h-[70vh] relative overflow-hidden glass-dark"
            style={{ boxShadow: "0 0 30px -10px rgba(111,194,190,0.35)" }}
          >
            <Image
              src="/images/budaya/tari-sawat-infopublik.jpg"
              alt={lang === "en" ? "The Sawat dance of the Kei Islands welcoming guests as siblings" : "Tari Sawat Kepulauan Kei menyambut tamu sebagai saudara"}
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover object-center brightness-110 contrast-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/10 to-black/25 pointer-events-none" />

            <div className="absolute inset-0 flex items-center justify-center p-8">
              <div className="relative">
                <Image
                  src="/images/budaya/tari-sawat-infopublik.jpg"
                  alt=""
                  aria-hidden="true"
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover object-center rounded-3xl blur-2xl scale-110 opacity-40"
                />
                <blockquote
                  className="relative glass-dark rounded-2xl px-7 py-6 text-center max-w-md"
                  style={{ boxShadow: "0 0 30px -10px rgba(111,194,190,0.35)" }}
                >
                <p className="text-white leading-snug text-2xl md:text-3xl"
                  style={{ fontFamily: "var(--font-serif)" }}
                >
                  {lang === "en" ? (
                    <>
                      One archipelago, one family.
                      <br />
                      Let&rsquo;s connect.
                    </>
                  ) : (
                    <>
                      Satu kepulauan, satu keluarga.
                      <br />
                      Mari kita terhubung.
                    </>
                  )}
                </p>
              </blockquote>
              </div>
            </div>

            {/* Vertical gradient lis between columns */}
            <div className="absolute right-0 top-0 bottom-0 w-[1px] bg-gradient-to-b from-[var(--color-accent-navy)] via-[var(--color-primary-teal)] to-[var(--color-primary-navy)] z-[4] hidden lg:block" />
          </div>

          {/* RIGHT COLUMN: Contact channels panel */}
          <div className="w-full lg:w-1/2 p-8 md:p-12 lg:p-16 flex flex-col justify-center glass-dark"
            style={{ boxShadow: "0 0 24px -8px rgba(230,103,124,0.40)" }}
          >
            <span className="fade-up text-brand font-semibold tracking-[0.18em] uppercase text-xs md:text-sm mb-4 inline-block"
              style={{ fontFamily: "var(--font-sans)" }}
            >
              {lang === "en" ? "Contact Us" : "Hubungi Kami"}
            </span>

            <h2 className="fade-up text-fluid-h2 font-normal text-white leading-[1.12] mb-5"
              style={{ fontFamily: "var(--font-serif)" }}
            >
              {lang === "en" ? (
                <>
                  Connect With the
                  <br />
                  Evav Family
                </>
              ) : (
                <>
                  Mari Terhubung
                  <br />
                  dengan Keluarga Evav
                </>
              )}
            </h2>

            <p className="fade-up text-white/70 text-sm md:text-base leading-relaxed font-light mb-8 max-w-xl"
              style={{ fontFamily: "var(--font-sans)" }}
            >
              {lang === "en"
                ? "Have a question, a collaboration idea, or just want to say hello? Write your travel dream, send a suggestion, or invite us to collaborate — we will greet you back like welcoming a sibling."
                : "Punya pertanyaan, ide kolaborasi, atau sekadar ingin menyapa? Tuliskan impian perjalananmu, kirimkan saran, atau ajak kami berkolaborasi — kami akan menyapamu kembali seperti menyambut saudara."}
            </p>

            <ul className="fade-up flex flex-col">
              {channels.map(({ idLabel, enLabel, value, enValue, href, Icon }) => (
                <li key={idLabel} className="border-t border-white/10 first:border-t-0">
                  <a
                    href={href}
                    target={href.startsWith("mailto:") ? undefined : "_blank"}
                    rel={href.startsWith("mailto:") ? undefined : "noopener noreferrer"}
                    className="group flex items-center gap-4 py-4 transition-colors hover:text-brand focus-ring rounded-lg"
                  >
                    <Icon className="w-5 h-5 shrink-0 text-brand" aria-hidden="true" />
                    <span className="flex flex-col">
                      <span className="text-white/40 text-xs uppercase tracking-wide"
                        style={{ fontFamily: "var(--font-sans)" }}
                      >
                        {lang === "en" ? enLabel : idLabel}
                      </span>
                      <span className="text-white text-sm md:text-base"
                        style={{ fontFamily: "var(--font-sans)" }}
                      >
                        {lang === "en" && enValue ? enValue : value}
                      </span>
                    </span>
                  </a>
                </li>
              ))}

              {/* Media sosial */}
              <li className="border-t border-white/10">
                <div className="flex items-center gap-4 py-4">
                  <span className="flex flex-col w-full">
                    <span className="text-white/40 text-xs uppercase tracking-wide mb-2"
                      style={{ fontFamily: "var(--font-sans)" }}
                    >
                      {lang === "en" ? "Social Media" : "Media Sosial"}
                    </span>
                    <div className="flex items-center gap-3">
                      {socials.map(({ label, href, platform }) => (
                        <a
                          key={label}
                          href={href}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={lang === "en" ? `Discover Evav on ${platform}` : `Discover Evav di ${platform}`}
                          className="w-10 h-10 flex items-center justify-center rounded-full border border-white/10 text-white/60 hover:text-brand hover:border-brand transition-colors focus-ring"
                        >
                          <SocialIcon platform={platform} className="w-5 h-5" />
                        </a>
                      ))}
                    </div>
                  </span>
                </div>
              </li>
            </ul>

            <div className="fade-up mt-8">
              <a
                href={EMAIL_URL}
                onMouseMove={onMouseMove}
                onMouseLeave={onMouseLeave}
                className="btn-cta-dark btn-cta-dark:hover group inline-flex items-center justify-center gap-2 rounded-xl py-3.5 px-6 text-sm md:text-base font-semibold active:press focus-ring"
                style={{ fontFamily: "var(--font-sans)" }}
              >
                {lang === "en" ? "Say Hello" : "Sapa Kami"}
                <ChevronRightIcon className="w-4 h-4 text-current transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
