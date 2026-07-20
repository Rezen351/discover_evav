"use client";

const QUOTES: Record<"id" | "en", string[]> = {
  id: [
    "Pasir Ngurbloat sehalus tepung, legit di kaki setiap pejalan.",
    "Di atas pasir putih ini, leluhur mengajarkan menjaga alam.",
    "Laut Kei dua warna — biru tenang membelai pasir timbul.",
    "Larvul Ngabal jaga tatanan, sejak ratusan tahun silam.",
    "Meti Kei memanggil: mari panen ikan bersama warga Evav.",
    "Terumbu karang Kei rumah ribuan spesies di segitiga emas.",
  ],
  en: [
    "Ngurbloat sand, soft as flour, gentle beneath every traveler's feet.",
    "Upon this white sand, our ancestors teach us to guard nature.",
    "Kei's sea holds two colors — calm blue caressing the emerged sand.",
    "Larvul Ngabal keeps the order, for hundreds of years since.",
    "Kei Meti calls: come harvest fish together with the Evav people.",
    "Kei coral reefs host thousands of species in the golden triangle.",
  ],
};

export default function QuoteMarquee({ lang = "id" }: { lang?: "id" | "en" }) {
  const quotes = QUOTES[lang];
  const loop = [...quotes, ...quotes];
  return (
    <div
      className="relative w-full overflow-hidden py-4 berita-fade"
      aria-hidden="true"
    >
      <div className="flex w-max gap-8 animate-[marquee_38s_linear_infinite]">
        {loop.map((q, i) => (
          <span
            key={i}
            className="flex items-center gap-8 text-black/55 text-fluid-small font-light whitespace-nowrap"
            style={{ fontFamily: "var(--font-serif)" }}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-brand/60"></span>
            {q}
          </span>
        ))}
      </div>
    </div>
  );
}
