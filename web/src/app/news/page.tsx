import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { CalendarIcon, MapPinIcon, ArrowUpRightIcon } from "@heroicons/react/24/outline";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { news, type NewsCategory } from "@/content/news";

const SITE_URL = "https://discoverevav.id";

export const metadata: Metadata = {
  title: "Berita & Artikel — Discover Evav | Kepulauan Kei",
  description:
    "Kumpulan berita dan artikel terkini seputar Kepulauan Kei: Festival Pesona Meti Kei, budaya bahari Evav, dan dampak ekonomi wisata bagi masyarakat lokal Maluku Tenggara.",
  alternates: {
    canonical: "/news",
  },
  openGraph: {
    title: "Berita & Artikel — Discover Evav",
    description:
      "Cerita dari atas pasir putih: Festival Pesona Meti Kei, transformasi tradisi bahari, dan kesejahteraan masyarakat lokal Kepulauan Kei.",
    url: "/news",
    type: "website",
  },
};

const categoryStyle: Record<NewsCategory, string> = {
  Budaya: "bg-brand/10 text-brand",
  Event: "bg-[var(--color-primary-teal)]/15 text-[var(--color-primary-navy)]",
  Infrastruktur: "bg-[var(--color-primary-orange)]/15 text-[var(--color-primary-orange)]",
  Pengumuman: "bg-[var(--color-primary-green)]/15 text-[var(--color-primary-green)]",
};

export default function NewsListPage() {
  const featured = news.find((n) => n.featured) ?? news[0];
  const regular = news.filter((n) => n.id !== featured.id);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "NewsArticle",
            headline: "Berita & Artikel Kepulauan Kei",
            description:
              "Kumpulan berita dan artikel terkini seputar Kepulauan Kei dan Festival Pesona Meti Kei.",
            publisher: { "@id": `${SITE_URL}/#organization` },
            inLanguage: "id-ID",
          }),
        }}
      />
      <Navbar />

      <main data-hero className="w-full bg-section pt-32 pb-20 md:pt-40 md:pb-28">
        <div className="max-w-[98%] xl:max-w-[1600px] mx-auto px-4 md:px-8 w-full flex flex-col gap-10">
          {/* HEADER */}
          <header className="flex flex-col gap-3">
            <div
              className="text-brand font-bold tracking-[0.2em] uppercase text-xs md:text-sm"
              style={{ fontFamily: "var(--font-sans)" }}
            >
              CERITA EVAK
            </div>
            <h1
              className="text-4xl md:text-6xl leading-[1.1] text-black font-normal"
              style={{ fontFamily: "var(--font-serif)" }}
            >
              Berita &amp; Artikel <span className="text-brand">Terbaru</span>
            </h1>
            <p
              className="text-black/60 text-sm md:text-base max-w-2xl leading-relaxed"
              style={{ fontFamily: "var(--font-sans)" }}
            >
              Kabar dari atas pasir putih: festival bahari, kearifan lokal, dan
              bagaimana wisata di Kepulauan Kei mensejahterakan masyarakatnya.
            </p>
          </header>

          {/* FEATURED */}
          <Link
            href={`/news/${featured.slug}`}
            className="group relative w-full h-[320px] md:h-[440px] rounded-lg-design overflow-hidden shadow-sm block"
          >
            <Image
              src={featured.image}
              alt={featured.title}
              fill
              sizes="(max-width: 768px) 100vw, 100vw"
              className="object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />
            <div className="absolute top-5 left-5">
              <span
                className={`text-xs font-bold px-3 py-1.5 rounded-full uppercase tracking-wide bg-white text-black`}
                style={{ fontFamily: "var(--font-sans)" }}
              >
                {featured.category}
              </span>
            </div>
            <div className="absolute bottom-6 left-6 right-6">
              <div
                className="flex items-center gap-1.5 text-white/70 text-xs mb-2"
                style={{ fontFamily: "var(--font-sans)" }}
              >
                <CalendarIcon className="w-3.5 h-3.5" />
                {featured.date}
                <span className="mx-1">•</span>
                <MapPinIcon className="w-3.5 h-3.5" />
                {featured.location}
              </div>
              <h2
                className="text-2xl md:text-4xl text-white font-normal leading-snug drop-shadow-md"
                style={{ fontFamily: "var(--font-serif)" }}
              >
                {featured.title}
              </h2>
              <p
                className="text-white/85 text-sm mt-2 line-clamp-2 hidden md:block max-w-3xl"
                style={{ fontFamily: "var(--font-sans)" }}
              >
                {featured.excerpt}
              </p>
            </div>
          </Link>

          {/* GRID REGULAR */}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {regular.map((item) => (
              <Link
                key={item.id}
                href={`/news/${item.slug}`}
                className="group flex flex-col bg-white/55 hover:bg-white/80 border border-brand/10 hover:border-brand/30 rounded-lg-design overflow-hidden shadow-none transition-all duration-300"
              >
                <div className="relative h-52 overflow-hidden">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute top-4 left-4">
                    <span
                      className={`text-[10px] font-bold px-3 py-1.5 rounded-full uppercase tracking-wide bg-white text-black`}
                      style={{ fontFamily: "var(--font-sans)" }}
                    >
                      {item.category}
                    </span>
                  </div>
                </div>
                <div className="p-5 flex flex-col gap-3 flex-1">
                  <div
                    className="flex items-center gap-1.5 text-black/50 text-[10px] md:text-xs"
                    style={{ fontFamily: "var(--font-sans)" }}
                  >
                    <CalendarIcon className="w-3 h-3" />
                    {item.date}
                    <span className="mx-1">•</span>
                    <MapPinIcon className="w-3 h-3" />
                    {item.location}
                  </div>
                  <h3
                    className="text-lg md:text-xl text-black font-normal leading-snug group-hover:text-brand transition-colors"
                    style={{ fontFamily: "var(--font-serif)" }}
                  >
                    {item.title}
                  </h3>
                  <p
                    className="text-black/60 text-sm leading-relaxed line-clamp-3"
                    style={{ fontFamily: "var(--font-sans)" }}
                  >
                    {item.excerpt}
                  </p>
                  <span className="mt-auto flex items-center gap-1.5 text-brand text-sm font-medium">
                    Baca Selengkapnya
                    <ArrowUpRightIcon className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </span>
                </div>
              </Link>
            ))}
          </div>

          {/* CTA UMKM */}
          <div className="flex justify-center md:justify-start">
            <Link
              href="/taste"
              className="btn-cta w-full md:w-auto inline-flex items-center justify-center gap-2 font-sans text-sm md:text-base font-medium focus-ring rounded-full px-6 py-3"
            >
              Jelajahi UMKM Kepulauan Kei
              <ArrowUpRightIcon className="w-4 h-4 text-current" />
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
