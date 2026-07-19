"use client";

import { useState } from "react";
import { ChevronDownIcon } from "@heroicons/react/24/outline";
import { faqItems } from "@/content/keterhubungan";

export default function FaqAccordionSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (index: number) => {
    setOpenIndex((current) => (current === index ? null : index));
  };

  return (
    <section
      id="faq"
      aria-labelledby="faq-heading"
      className="relative w-full min-h-screen snap-start snap-always flex items-center justify-center bg-tropical-dark z-[2] py-16 md:py-24"
    >
      <div className="max-w-[98%] xl:max-w-[1600px] mx-auto px-4 md:px-8 w-full">
        <div className="max-w-3xl mx-auto">
          <p
            className="text-brand font-bold tracking-[0.2em] uppercase text-fluid-eyebrow mb-3"
            style={{ fontFamily: "var(--font-sans)" }}
          >
            Tanya Jawab
          </p>

          <h2
            id="faq-heading"
            className="text-fluid-h2 leading-[1.12] text-white font-normal"
            style={{ fontFamily: "var(--font-serif)" }}
          >
            Pertanyaan yang Sering
            <br className="hidden md:block" />
            Terlintas
          </h2>

          <p
            className="text-fluid-body text-white/60 mt-4 mb-10 leading-relaxed"
            style={{ fontFamily: "var(--font-sans)" }}
          >
            Belum yakin tentang sesuatu? Berikut jawaban dari saudara-saudari kami
            di Evav.
          </p>

          <div className="flex flex-col">
            {faqItems.map((item, index) => {
              const isOpen = openIndex === index;
              const panelId = `faq-panel-${index}`;
              const buttonId = `faq-button-${index}`;

              return (
                <div key={item.question} className="border-b border-white/10">
                  <h3 className="m-0">
                    <button
                      id={buttonId}
                      type="button"
                      onClick={() => toggle(index)}
                      aria-expanded={isOpen}
                      aria-controls={panelId}
                      className="focus-ring group flex w-full items-center justify-between gap-4 py-5 text-left"
                    >
                      <span
                        className={`text-fluid-body font-medium transition-colors duration-300 ${
                          isOpen ? "text-brand" : "text-white"
                        }`}
                        style={{ fontFamily: "var(--font-sans)" }}
                      >
                        {item.question}
                      </span>
                      <ChevronDownIcon
                        aria-hidden="true"
                        className={`h-5 w-5 shrink-0 transition-transform duration-300 ${
                          isOpen
                            ? "rotate-180 text-brand"
                            : "text-white/50 group-hover:text-white/70"
                        }`}
                      />
                    </button>
                  </h3>

                  <div
                    id={panelId}
                    role="region"
                    aria-labelledby={buttonId}
                    hidden={!isOpen}
                    className="overflow-hidden"
                  >
                    <p
                      className="pb-6 pr-9 text-fluid-body text-white/70 leading-relaxed"
                      style={{ fontFamily: "var(--font-sans)" }}
                    >
                      {item.answer}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
