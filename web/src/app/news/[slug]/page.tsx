import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { CalendarIcon, MapPinIcon, ArrowLeftIcon, ArrowUpRightIcon } from "@heroicons/react/24/outline";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { news, getNewsBySlug } from "@/content/news";

const SITE_URL = "https://discoverevav.id";

export function generateStaticParams() {
  return news.map((n) => ({ slug: n.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const article = getNewsBySlug(slug);
  if (!article) {
    return {
      title: "Artikel Tidak Ditemukan | Discover Evav",
      description: "Artikel yang Anda cari tidak tersedia.",
    };
  }
  return {
    title: `${article.title} | Discover Evav`,
    description: article.excerpt,
    alternates: { canonical: `/news/${article.slug}` },
    openGraph: {
      title: article.title,
      description: article.excerpt,
      url: `/news/${article.slug}`,
      type: "article",
      images: [{ url: article.image }],
    },
  };
}

export default async function NewsDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = getNewsBySlug(slug);
  if (!article) notFound();

  const related = news.filter((n) => n.id !== article.id).slice(0, 3);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "NewsArticle",
    headline: article.title,
    description: article.excerpt,
    image: `${SITE_URL}${article.image}`,
    datePublished: article.dateISO,
    inLanguage: "id-ID",
    publisher: { "@id": `${SITE_URL}/#organization` },
    about: {
      "@type": "TouristAttraction",
      name: "Kepulauan Kei",
      address: { "@type": "PostalAddress", addressRegion: "Maluku Tenggara", addressCountry: "ID" },
    },
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Navbar />

      <main data-hero className="w-full bg-section pt-32 pb-20 md:pt-40 md:pb-28">
        <article className="max-w-[98%] xl:max-w-[1100px] mx-auto px-4 md:px-8 w-full flex flex-col gap-8">
          {/* Breadcrumb */}
          <Link
            href="/news"
            className="inline-flex items-center gap-2 text-black/60 hover:text-brand text-sm font-medium transition-colors w-fit"
            style={{ fontFamily: "var(--font-sans)" }}
          >
            <ArrowLeftIcon className="w-4 h-4" />
            Kembali ke Berita
          </Link>

          {/* Header */}
          <header className="flex flex-col gap-4">
            <div className="flex items-center gap-2 flex-wrap">
              <span
                className="text-xs font-bold px-3 py-1.5 rounded-full uppercase tracking-wide bg-brand/10 text-brand"
                style={{ fontFamily: "var(--font-sans)" }}
              >
                {article.category}
              </span>
              <div
                className="flex items-center gap-1.5 text-black/50 text-xs"
                style={{ fontFamily: "var(--font-sans)" }}
              >
                <CalendarIcon className="w-3.5 h-3.5" />
                <time dateTime={article.dateISO}>{article.date}</time>
                <span className="mx-1">•</span>
                <MapPinIcon className="w-3.5 h-3.5" />
                {article.location}
              </div>
            </div>
            <h1
              className="text-3xl md:text-5xl leading-[1.1] text-black font-normal"
              style={{ fontFamily: "var(--font-serif)" }}
            >
              {article.title}
            </h1>
            <p
              className="text-black/60 text-base md:text-lg leading-relaxed max-w-3xl"
              style={{ fontFamily: "var(--font-sans)" }}
            >
              {article.excerpt}
            </p>
          </header>

          {/* Hero Image */}
          <div className="relative w-full h-[260px] md:h-[440px] rounded-lg-design overflow-hidden shadow-sm">
            <Image
              src={article.image}
              alt={article.title}
              fill
              priority
              sizes="(max-width: 768px) 100vw, 1100px"
              className="object-cover"
            />
          </div>

          {/* Content */}
          <div className="flex flex-col gap-5 max-w-3xl">
            {article.content.map((block, i) => {
              if (block.type === "heading") {
                return (
                  <h2
                    key={i}
                    className="text-xl md:text-2xl text-black font-normal mt-2"
                    style={{ fontFamily: "var(--font-serif)" }}
                  >
                    {block.text}
                  </h2>
                );
              }
              if (block.type === "paragraph") {
                return (
                  <p
                    key={i}
                    className="text-black/80 text-base md:text-lg leading-relaxed text-justify"
                    style={{ fontFamily: "var(--font-sans)" }}
                  >
                    {block.text}
                  </p>
                );
              }
              if (block.type === "list") {
                return (
                  <ul key={i} className="flex flex-col gap-2 pl-1">
                    {block.items.map((item, j) => (
                      <li
                        key={j}
                        className="flex items-start gap-3 text-black/80 text-base leading-relaxed text-justify"
                        style={{ fontFamily: "var(--font-sans)" }}
                      >
                        <span className="mt-2 w-1.5 h-1.5 rounded-full bg-brand flex-none" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                );
              }
              return (
                <blockquote
                  key={i}
                  className="border-l-4 border-brand pl-4 py-1 text-black/80 text-lg italic"
                  style={{ fontFamily: "var(--font-serif)" }}
                >
                  {block.text}
                </blockquote>
              );
            })}

            {/* References */}
            {article.references.length > 0 && (
              <div className="mt-4 pt-5 border-t border-black/10">
                <h3
                  className="text-sm font-bold uppercase tracking-wide text-black/50 mb-2"
                  style={{ fontFamily: "var(--font-sans)" }}
                >
                  Sumber Rujukan
                </h3>
                <ul className="flex flex-col gap-1.5">
                  {article.references.map((ref, i) => (
                    <li key={i}>
                      <a
                        href={ref}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1.5 text-brand/80 hover:text-brand text-sm break-all transition-colors"
                        style={{ fontFamily: "var(--font-sans)" }}
                      >
                        <ArrowUpRightIcon className="w-3.5 h-3.5 flex-none" />
                        {ref}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </article>

        {/* Related */}
        <section className="max-w-[98%] xl:max-w-[1100px] mx-auto px-4 md:px-8 w-full mt-14">
          <h2
            className="text-2xl md:text-3xl text-black font-normal mb-6"
            style={{ fontFamily: "var(--font-serif)" }}
          >
            Baca Juga
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {related.map((item) => (
              <Link
                key={item.id}
                href={`/news/${item.slug}`}
                className="group flex flex-col bg-white/55 hover:bg-white/80 border border-brand/10 hover:border-brand/30 rounded-lg-design overflow-hidden transition-all duration-300"
              >
                <div className="relative h-44 overflow-hidden">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
                <div className="p-5 flex flex-col gap-2 flex-1">
                  <div
                    className="flex items-center gap-1.5 text-black/50 text-[10px] md:text-xs"
                    style={{ fontFamily: "var(--font-sans)" }}
                  >
                    <CalendarIcon className="w-3 h-3" />
                    {item.date}
                  </div>
                  <h3
                    className="text-base md:text-lg text-black font-normal leading-snug group-hover:text-brand transition-colors"
                    style={{ fontFamily: "var(--font-serif)" }}
                  >
                    {item.title}
                  </h3>
                </div>
              </Link>
            ))}
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
