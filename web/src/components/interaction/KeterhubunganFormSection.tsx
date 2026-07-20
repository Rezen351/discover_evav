"use client";

import { useEffect, useRef, useState } from "react";
import {
  PhoneIcon,
  EnvelopeIcon,
  ClockIcon,
  ChevronRightIcon,
  CheckCircleIcon,
} from "@heroicons/react/24/outline";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useSpotlight } from "@/hooks/useSpotlight";
import { WHATSAPP_URL, EMAIL_URL, CONTACT_EMAIL } from "@/content/social";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

type TopicTabLang = { id: string; idLabel: string; enLabel: string };

const TOPIC_TABS: TopicTabLang[] = [
  { id: "umum", idLabel: "Pertanyaan Umum", enLabel: "General Questions" },
  { id: "partner", idLabel: "Kerja Sama & Partnership", enLabel: "Partnership & Collaboration" },
  { id: "saran", idLabel: "Saran & Masukan", enLabel: "Suggestions & Feedback" },
  { id: "masalah", idLabel: "Laporan Masalah", enLabel: "Report an Issue" },
  { id: "lainnya", idLabel: "Lainnya", enLabel: "Others" },
];

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function KeterhubunganFormSection({ lang }: { lang: "id" | "en" }) {
  const sectionRef = useRef<HTMLElement>(null);
  const formPanelRef = useRef<HTMLDivElement>(null);
  const { onMouseMove, onMouseLeave } = useSpotlight();

  const [activeTab, setActiveTab] = useState<string>(TOPIC_TABS[0].id);
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [errors, setErrors] = useState<{
    name?: string;
    email?: string;
    message?: string;
  }>({});
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) return;

    const ctx = gsap.context(() => {
      gsap.from(formPanelRef.current, {
        y: 40,
        opacity: 0,
        duration: 0.8,
        ease: "power2.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 70%",
          toggleActions: "play none none reverse",
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const validate = () => {
    const next: typeof errors = {};
    if (!formData.name.trim()) {
      next.name =
        lang === "en"
          ? "Tell us your nickname first 🌊"
          : "Tuliskan nama panggilanmu dulu ya 🌊";
    }
    if (!formData.email.trim()) {
      next.email =
        lang === "en"
          ? "We need an address we can reply to 🏖️"
          : "Kami perlu alamat yang bisa kami balas 🏖️";
    } else if (!EMAIL_RE.test(formData.email.trim())) {
      next.email =
        lang === "en"
          ? "This email address doesn't look quite right. Please check again 🏖️"
          : "Alamat email ini sepertinya belum pas. Coba periksa lagi 🏖️";
    }
    if (!formData.message.trim()) {
      next.message =
        lang === "en"
          ? "Share your dream for Kei first 🌊"
          : "Ceritakan dulu impianmu ke Kei 🌊";
    }
    return next;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const next = validate();
    setErrors(next);
    if (Object.keys(next).length > 0) return;

    setSubmitted(true);
    setFormData({ name: "", email: "", message: "" });
    setErrors({});
    setTimeout(() => setSubmitted(false), 5000);
  };

  const handleChange =
    (field: keyof typeof formData) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setFormData((prev) => ({ ...prev, [field]: e.target.value }));
      if (errors[field]) {
        setErrors((prev) => ({ ...prev, [field]: undefined }));
      }
    };

  const isError = (field: keyof typeof errors) => Boolean(errors[field]);

  return (
    <section
      id="panggung-percakapan"
      ref={sectionRef}
      className="relative w-full min-h-screen snap-start snap-always flex items-center justify-center bg-section z-[3] py-16 md:py-24"
    >
      <div className="max-w-[98%] xl:max-w-[1600px] mx-auto px-4 md:px-8 w-full">
        <div className="flex flex-col lg:flex-row gap-10 xl:gap-16 items-stretch">
          {/* LEFT — Channels */}
          <div className="w-full lg:w-1/2 flex flex-col">
            <div className="lg:sticky lg:top-24 flex flex-col gap-5 h-fit">
              <span
                className="text-brand font-bold tracking-[0.2em] uppercase text-xs md:text-sm mb-1 inline-block"
                style={{ fontFamily: "var(--font-sans)" }}
              >
                {lang === "en" ? "OTHER CHANNELS" : "JALUR LAIN"}
              </span>
              <h2
                className="text-fluid-h3 text-black font-normal leading-[1.2] mb-2"
                style={{ fontFamily: "var(--font-serif)" }}
              >
                {lang === "en" ? "Or Say Hello Another Way" : "Atau Sapa Lewat Jalur Lain"}
              </h2>
              <p
                className="text-black/60 text-sm md:text-base leading-relaxed mb-4"
                style={{ fontFamily: "var(--font-sans)" }}
              >
                {lang === "en"
                  ? "Not a fan of forms? Pick the channel you're most comfortable with. We welcome every hello as warmly as the Kei people welcome you."
                  : "Tidak suka menulis form? Pilih jalur yang paling nyaman. Kami menyambut setiap sapa sehangat sambutan orang Kei."}
              </p>

              <a
                href={WHATSAPP_URL}
                className="group flex items-center gap-4 bg-white/70 border border-brand/20 rounded-md-design p-4 hover:border-brand transition-colors focus-ring"
                style={{ fontFamily: "var(--font-sans)" }}
                aria-label={lang === "en" ? "Contact us via WhatsApp and phone at +62 821-1234-5678" : "Hubungi kami lewat WhatsApp dan telepon di nomor +62 821-1234-5678"}
              >
                <PhoneIcon className="w-6 h-6 text-brand shrink-0" />
                <span className="flex flex-col">
                  <span className="text-sm font-semibold text-black">{lang === "en" ? "WhatsApp & Phone" : "WhatsApp &amp; Telepon"}</span>
                  <span className="text-sm text-black/60 group-hover:text-brand transition-colors">
                    +62 821-1234-5678
                  </span>
                </span>
              </a>

              <a
                href={EMAIL_URL}
                className="group flex items-center gap-4 bg-white/70 border border-brand/20 rounded-md-design p-4 hover:border-brand transition-colors focus-ring"
                style={{ fontFamily: "var(--font-sans)" }}
                aria-label={lang === "en" ? `Send an email directly to ${CONTACT_EMAIL}` : `Kirim surel langsung ke ${CONTACT_EMAIL}`}
              >
                <EnvelopeIcon className="w-6 h-6 text-brand shrink-0" />
                <span className="flex flex-col">
                  <span className="text-sm font-semibold text-black">{lang === "en" ? "Email" : "Surel"}</span>
                  <span className="text-sm text-black/60 group-hover:text-brand transition-colors">
                    keluarga@evav.id
                  </span>
                </span>
              </a>

              <div
                className="flex items-start gap-4 bg-white/70 border border-brand/20 rounded-md-design p-4"
                style={{ fontFamily: "var(--font-sans)" }}
              >
                <ClockIcon className="w-6 h-6 text-brand shrink-0 mt-0.5" />
                <span className="flex flex-col">
                  <span className="text-sm font-semibold text-black">{lang === "en" ? "Response Hours" : "Jam Sambutan"}</span>
                  <span className="text-sm text-black/60">
                    {lang === "en"
                      ? "We reply within 1–2 days, like a letter sent between islands."
                      : "Kami membalas dalam 1–2 hari, seperti surat antar pulau."}
                  </span>
                </span>
              </div>
            </div>
          </div>

          {/* RIGHT — Form */}
          <div className="w-full lg:w-1/2">
            <div ref={formPanelRef} className="flex flex-col">
              <span
                className="text-brand font-bold tracking-[0.2em] uppercase text-xs md:text-sm mb-3 inline-block"
                style={{ fontFamily: "var(--font-sans)" }}
              >
                {lang === "en" ? "SAY HELLO TO THE EVAv FAMILY" : "SAPA KELUARGA EVAv"}
              </span>
              <h2
                className="text-fluid-h2 leading-[1.12] text-black font-normal mb-4"
                style={{ fontFamily: "var(--font-serif)" }}
              >
                {lang === "en" ? (
                  <>
                    Write Your Hello{" "}
                    <span className="text-brand">for Kei</span>
                  </>
                ) : (
                  <>
                    Tuliskan Sapamu{" "}
                    <span className="text-brand">untuk Kei</span>
                  </>
                )}
              </h2>
              <p
                className="text-black/60 text-sm md:text-base leading-relaxed mb-8"
                style={{ fontFamily: "var(--font-sans)" }}
              >
                {lang === "en"
                  ? "One message from you is enough to start a conversation. We read every hello like a letter from a sibling."
                  : "Satu pesan darimu cukup untuk memulai percakapan. Kami baca setiap sapaan seperti surat dari saudara."}
              </p>

              {submitted ? (
                <div
                  className="bg-white/80 backdrop-blur-md rounded-2xl p-8 text-center flex flex-col items-center justify-center border border-brand/10 animate-[fadeSlideUp_0.4s_ease-out]"
                  style={{ fontFamily: "var(--font-sans)" }}
                  role="status"
                  aria-live="polite"
                >
                  <div className="w-16 h-16 rounded-full bg-brand/10 flex items-center justify-center mb-4 text-brand">
                    <CheckCircleIcon className="w-8 h-8" />
                  </div>
                  <h3
                    className="text-fluid-h3 font-normal text-black mb-2"
                    style={{ fontFamily: "var(--font-serif)" }}
                  >
                    {lang === "en" ? "Thank you! See you in Kei 🌊" : "Terima kasih! Sampai jumpa di Kei 🌊"}
                  </h3>
                  <p className="text-sm text-black/60">
                    {lang === "en"
                      ? "We have received your hello. We will reply through the channel closest to you."
                      : "Sapaanmu sudah kami terima. Kami akan membalas lewat jalur yang paling dekat denganmu."}
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="flex flex-col gap-5" noValidate>
                  {/* Topic tabs */}
                  <div
                    role="tablist"
                    aria-label={lang === "en" ? "Choose a greeting topic" : "Pilih topik sapaan"}
                    className="flex flex-nowrap gap-2 overflow-x-auto no-scrollbar sm:flex-wrap sm:overflow-visible"
                  >
                    {TOPIC_TABS.map((tab) => {
                      const active = tab.id === activeTab;
                      return (
                        <button
                          key={tab.id}
                          type="button"
                          role="tab"
                          aria-selected={active}
                          onClick={() => setActiveTab(tab.id)}
                          className={[
                            "px-3.5 py-2 rounded-md-design text-xs md:text-sm font-medium transition-colors focus-ring whitespace-nowrap shrink-0",
                            active
                              ? "bg-nav-gradient text-brand border border-brand/100"
                              : "text-black/60 hover:text-brand bg-white/70 border border-brand/20",
                          ].join(" ")}
                          style={{ fontFamily: "var(--font-sans)" }}
                        >
                          {lang === "en" ? tab.enLabel : tab.idLabel}
                        </button>
                      );
                    })}
                  </div>

                  {/* Name */}
                  <div className="flex flex-col gap-1.5">
                    <label
                      htmlFor="kh-name"
                      className="text-sm font-medium text-black"
                      style={{ fontFamily: "var(--font-sans)" }}
                    >
                      {lang === "en" ? "Your nickname" : "Nama panggilanmu"}
                    </label>
                    <input
                      id="kh-name"
                      type="text"
                      value={formData.name}
                      onChange={handleChange("name")}
                      aria-invalid={isError("name")}
                      className="w-full bg-white/95 rounded-xl px-4 py-3.5 border border-brand/10 focus:border-brand outline-none text-black transition-all placeholder:text-black/40 text-sm md:text-base"
                      style={{ fontFamily: "var(--font-sans)" }}
                    />
                    {errors.name && (
                      <p
                        className="text-sm text-brand"
                        style={{ fontFamily: "var(--font-sans)" }}
                      >
                        {errors.name}
                      </p>
                    )}
                  </div>

                  {/* Email */}
                  <div className="flex flex-col gap-1.5">
                    <label
                      htmlFor="kh-email"
                      className="text-sm font-medium text-black"
                      style={{ fontFamily: "var(--font-sans)" }}
                    >
                      {lang === "en" ? "Email we can reply to" : "Email yang bisa kami balas"}
                    </label>
                    <input
                      id="kh-email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange("email")}
                      aria-invalid={isError("email")}
                      className="w-full bg-white/95 rounded-xl px-4 py-3.5 border border-brand/10 focus:border-brand outline-none text-black transition-all placeholder:text-black/40 text-sm md:text-base"
                      style={{ fontFamily: "var(--font-sans)" }}
                    />
                    {errors.email && (
                      <p
                        className="text-sm text-brand"
                        style={{ fontFamily: "var(--font-sans)" }}
                      >
                        {errors.email}
                      </p>
                    )}
                  </div>

                  {/* Message */}
                  <div className="flex flex-col gap-1.5">
                    <label
                      htmlFor="kh-message"
                      className="text-sm font-medium text-black"
                      style={{ fontFamily: "var(--font-sans)" }}
                    >
                      {lang === "en" ? "Message" : "Pesan"}
                    </label>
                    <textarea
                      id="kh-message"
                      value={formData.message}
                      onChange={handleChange("message")}
                      aria-invalid={isError("message")}
                      placeholder={lang === "en" ? "Tell us your travel dream for Kei..." : "Ceritakan impian perjalananmu ke Kei..."}
                      className="w-full bg-white/95 rounded-xl px-4 py-3.5 border border-brand/10 focus:border-brand outline-none text-black transition-all placeholder:text-black/40 text-sm md:text-base h-32 resize-none"
                      style={{ fontFamily: "var(--font-sans)" }}
                    />
                    {errors.message && (
                      <p
                        className="text-sm text-brand"
                        style={{ fontFamily: "var(--font-sans)" }}
                      >
                        {errors.message}
                      </p>
                    )}
                  </div>

                  <button
                    type="submit"
                    onMouseMove={onMouseMove}
                    onMouseLeave={onMouseLeave}
                    className="btn-cta group/btn w-full rounded-xl py-3.5 font-semibold text-sm md:text-base active:press focus-ring"
                    style={{ fontFamily: "var(--font-sans)" }}
                    >
                      {lang === "en" ? "Send Your Hello" : "Kirim Sapaan"}
                      <ChevronRightIcon className="w-4 h-4 text-current transition-transform duration-300 group-hover/btn:translate-x-1" />
                    </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
