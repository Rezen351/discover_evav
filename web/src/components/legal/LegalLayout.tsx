import Link from "next/link";
import type { ReactNode } from "react";

type LegalLayoutProps = {
  title: string;
  subtitle?: string;
  lastUpdated?: string;
  children: ReactNode;
};

export default function LegalLayout({
  title,
  subtitle,
  lastUpdated,
  children,
}: LegalLayoutProps) {
  return (
    <article
      className="min-h-screen w-full bg-white text-[var(--color-text-black)]"
      style={{ fontFamily: "var(--font-sans)" }}
    >
      <div className="mx-auto w-full max-w-[760px] px-6 py-16 md:py-24">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm text-[var(--color-text-grey)] transition-colors hover:text-[var(--color-primary-pink)]"
          aria-label="Kembali ke beranda"
        >
          <span aria-hidden>&larr;</span>
          <span>Beranda</span>
        </Link>

        <header className="mt-10 border-b border-black/10 pb-8">
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[var(--color-primary-pink)]">
            Simfoni Evav
          </p>
          <h1
            className="mt-3 text-[clamp(2rem,1.4rem+2.6vw,3.25rem)] font-normal leading-tight text-[var(--color-text-black)]"
            style={{ fontFamily: "var(--font-serif)" }}
          >
            {title}
          </h1>
          {subtitle && (
            <p className="mt-4 max-w-[60ch] text-[var(--text-fluid-body)] leading-relaxed text-[var(--color-text-grey)]">
              {subtitle}
            </p>
          )}
          {lastUpdated && (
            <p className="mt-4 text-xs tracking-wide text-[var(--color-text-grey)]">
              Berlaku sejak {lastUpdated}
            </p>
          )}
        </header>

        <div className="legal-prose mt-10">{children}</div>

        <footer className="mt-16 border-t border-black/10 pt-8">
          <p className="text-xs text-[var(--color-text-grey)]">
            &copy; 2026 Simfoni Evav. Semua Hak Dilindungi.
          </p>
        </footer>
      </div>
    </article>
  );
}
