"use client";

const quotes = [
  "Pasir Ngurbloat sehalus tepung, legit di kaki setiap pejalan.",
  "Di atas pasir putih ini, leluhur mengajarkan menjaga alam.",
  "Laut Kei dua warna — biru tenang membelai pasir timbul.",
  "Larvul Ngabal jaga tatanan, sejak ratusan tahun silam.",
  "Meti Kei memanggil: mari panen ikan bersama warga Evav.",
  "Terumbu karang Kei rumah ribuan spesies di segitiga emas.",
];

export default function QuoteMarquee() {
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
