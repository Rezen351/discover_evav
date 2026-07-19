# Best Practice Audit: /heritage (web/src/app/heritage/page.tsx)

Laporan audit kepatuhan _Next.js 16 App Router_ untuk halaman rute `/heritage`. Analisis berfokus pada `web/src/app/heritage/page.tsx` beserta enam komponen section yang di-import‑nya, serta konfigurasi terkait (`layout.tsx`, `next.config.ts`, `opengraph-image.tsx`, `useSpotlight`).

---

## Ringkasan

Halaman `/heritage` ditulis sebagai **Server Component** dengan metadata statis yang bersih, canonical, dan Open Graph yang benar. Struktur JSX sudah semantic (`main`, `section`, `h1`–`h4`, `figure`/`figcaption`, `ol`/`li`, `blockquote`) dan hampir seluruh teks memiliki atribut `aria-label`/heading yang tepat. Namun, secara arsitektural halaman ini memiliki **kelemahan struktural serius**: `page.tsx` hanya berupa "shell kosong" yang merangkai enam section yang **seluruhnya berstatus `"use client"`** walau sebagian besar isinya adalah konten statis (teks panjang, timeline, list). Akibatnya seluruh subtree halaman masuk ke client bundle, membatalkan manfaat utama Server Component dan menempatkan konten naratif (yang krusial untuk SEO) di belakang hidrasi GSAP.

Selain itu, rute ini **tidak memiliki `loading.tsx`, `error.tsx`, maupun `not-found.tsx`** di segmennya, tidak ada `JSON-LD` structured data, metadata belum menyertakan `twitter`/`robots` eksplisit di level halaman, dan tidak ada `Suspense`/`revalidate` karena memang tidak ada data fetching (konten di-hardcode). Penggunaan `md:snap-start md:snap-always` juga berpotensi memicu scroll-jacking yang bertentangan dengan preferensi `prefers-reduced-motion`.

**Rating:** 🟡 Cukup Baik — butuh perbaikan arsitektural

**Skor: 64 / 100**

| Kategori | Skor |
| --- | --- |
| Server/Client boundary | 30/100 |
| Metadata & SEO | 78/100 |
| Accessibility & Semantic HTML | 82/100 |
| Performance & Rendering | 60/100 |
| Error/Loading/Resiliensi | 40/100 |
| Konvensi App Router & TS | 85/100 |

---

## Standar Next.js yang Direview

Daftar standar yang dijadikan rujukan audit (berdasarkan `nextjs.org/docs` App Router, Next.js 16.2.6):

1. **Server vs Client Components** — komponen `app/` default Server Component; `"use client"` hanya untuk batas interaktif sekecil mungkin (daun pohon), bukan seluruh halaman.
2. **Data Fetching** — async Server Component, `fetch` dengan `cache`/`revalidate`, `generateStaticParams`, Suspense streaming.
3. **Metadata API** — `metadata`/`generateMetadata`, `metadataBase`, `alternates.canonical`, `openGraph`, `twitter`, `robots`, `title.template`.
4. **File konvensi** — `loading.tsx`, `error.tsx` (wajib `"use client"`), `not-found.tsx`, `opengraph-image.tsx`.
5. **next/image** — `priority` untuk above-the-fold, `sizes`, `alt`, lazy di bawah lipatan.
6. **next/link & next/font** — navigasi deklaratif, font via `next/font`.
7. **Accessibility & Semantic HTML** — landmark, heading order, ARIA, `prefers-reduced-motion`, skip link.
8. **Performance** — meminimalkan client JS, dynamic import, menghindari scroll-jacking.
9. **TypeScript & App Router conventions** — `strict`, alias `@/*`, colocation.

---

## Analisis Kepatuhan

| Standar | Status | Bukti |
| --- | --- | --- |
| `page.tsx` adalah Server Component | ✅ | `page.tsx:27` `export default function HeritagePage()` tanpa `"use client"` |
| Metadata statis (`title`, `description`, `canonical`, `openGraph`) | ✅ | `page.tsx:11-25` lengkap & deskriptif (Bahasa Indonesia) |
| `metadataBase` tersedia untuk resolve URL relatif | ✅ | `layout.tsx:45` `metadataBase: new URL(SITE_URL)` → `alternates.canonical: "/heritage"` valid |
| `opengraph-image.tsx` file konvensi | ✅ | `heritage/opengraph-image.tsx:1-54` pakai `next/og` (1200×630, `alt`) |
| Semantic HTML (main/section/h1-h4/figure/ol) | ✅ | `page.tsx:31` `<main id="main-content">`; section pakai `aria-labelledby` + heading hierarkis |
| `next/image` dipakai konsisten + `alt` + `sizes` | ✅ | seluruh section pakai `<Image fill sizes alt>` (mis. `HeroHeritageSection.tsx:53`) |
| `next/link` untuk navigasi internal | ✅ | `PenutupHeritageSection.tsx:97,111,125` pakai `<Link href>` |
| ARIA label pada kontrol ikon/tautan | ✅ | `aria-label` di banyak anchor (mis. `HeroHeritageSection.tsx:87`) |
| `prefers-reduced-motion` dihormati | ✅ | tiap section cek `matchMedia("(prefers-reduced-motion: reduce)")` (`HeroHeritageSection.tsx:20`) |
| GSAP cleanup (`ctx.revert()`) | ✅ | `return () => ctx.revert()` pada tiap `useEffect` (mis. `KarelHeritageSection.tsx:196`) |
| **Server/Client boundary minimal** (top issue) | ❌ | `page.tsx` merakit 6 section yang **semua** `"use client"` (`HeroHeritageSection.tsx:1`, `PrologHeritageSection.tsx:1`, `KarelHeritageSection.tsx:1`, `RatskapHeritageSection.tsx:1`, `PenghormatanHeritageSection.tsx:1`, `PenutupHeritageSection.tsx:1`) |
| Konten naratif statis di Server Component | ❌ | Teks panjang (timeline, sejarah) di-hardcode di client section → tidak ada di HTML statis murni sebelum hidrasi |
| `loading.tsx` di segmen rute | ❌ | file tidak ada di `heritage/` |
| `error.tsx` di segmen rute | ❌ | file tidak ada di `heritage/` |
| `not-found.tsx` / `notFound()` | ⚠️ | tidak relevan (tidak ada dynamic param) tetapi tidak ada fallback lokal |
| `JSON-LD` structured data | ❌ | tidak ada `application/ld+json` untuk artikel/sejarah |
| Metadata `twitter` & `robots` di level halaman | ⚠️ | `page.tsx:11-25` tidak mengoverride `twitter`/`robots` (warisan dari layout — boleh, tapi OG image lokal tidak diset per-halaman) |
| `title.template` dimanfaatkan | ⚠️ | `page.tsx:12` menulis title **lengkap** `"Warisan — ... | Simfoni Evav"` secara manual而非 memakai `template` dari layout (duplikasi brand) |
| Scroll-jacking (`snap-start`/`snap-always`) | ⚠️ | `md:snap-start md:snap-always` di banyak section (mis. `HeroHeritageSection.tsx:50`) — dapat mengganggu UX & aksesibilitas gerakan |
| Bundle GSAP di client | ⚠️ | `gsap` + `ScrollTrigger` diimpor di 6 client component; register plugin berulang (`if (typeof window !== "undefined") gsap.registerPlugin(...)`) |
| Route segment config (`revalidate`/`dynamic`) | N/A | halaman statis murni tanpa data fetching — tidak diperlukan |

---

## Temuan & Masalah

### 🔴 Tinggi (Critical / Architectural)

1. **Seluruh subtree halaman menjadi Client Component** — `web/src/app/heritage/page.tsx:32-37`
   Keenam section di‑import semuanya diawali `"use client"` (`HeroHeritageSection.tsx:1`, `PrologHeritageSection.tsx:1`, `KarelHeritageSection.tsx:1`, `RatskapHeritageSection.tsx:1`, `PenghormatanHeritageSection.tsx:1`, `PenutupHeritageSection.tsx:1`). Karena `page.tsx` hanya merakit mereka tanpa membungkasnya dalam Server Component, **seluruh halaman masuk client bundle**. Konten naratif sejarah (yang penting untuk SEO & first paint) tidak dirender sebagai HTML statis murni di server; ia dirender lewat hidrasi client. Ini mengurangi manfaat utama App Router dan memperbesar JS yang dikirim.

2. **Konten statis dipaksa ke client, menghambat SEO/static rendering** — `KarelHeritageSection.tsx:45-143`, `RatskapHeritageSection.tsx:33-76`
   Data `TIMELINE`, `AWARDS`, `LEGACY`, `KAMPUNG_ADAT`, `SUCCESSION`, `RESPONSIBILITIES` adalah konstanta statis murni, namun berada di dalam komponen `"use client"`. Idealnya data & markup statis dirender di Server Component, dan hanya lapisan animasi GSAP yang di‑extract ke Client Component kecil.

### 🟠 Sedang (Medium)

3. **Tidak ada `loading.tsx` / `error.tsx` di segmen rute** — direktori `web/src/app/heritage/` hanya berisi `page.tsx` & `opengraph-image.tsx`.
   Bila suatu section client melempar error saat render/hidrasi, tidak ada error boundary lokal; fallback hanya mengandalkan root. Tidak ada skeleton/loading UI bila kelak ditambahkan data asinkron.

4. **Tidak ada `JSON-LD` structured data** — tidak ada di `page.tsx` maupun section.
   Halaman bertema sejarah/budaya (`article`/`AboutPage`) layak mendapat JSON-LD agar memicu rich result Google. Seluruh konten berada di client, sehingga JSON-LD pun ikut tertunda.

5. **Scroll-jacking via `md:snap-start md:snap-always`** — `HeroHeritageSection.tsx:50`, `PrologHeritageSection.tsx:54`, `KarelHeritageSection.tsx:204`, `RatskapHeritageSection.tsx:137`, `PenghormatanHeritageSection.tsx:46`, `PenutupHeritageSection.tsx:62`.
   CSS scroll-snap强制 memaksa section per layar penuh. Meski animasi GSAP menghormati `prefers-reduced-motion`, **scroll-snap itu sendiri tidak dinonaktifkan** saat user memilih reduce motion — dapat menyebabkan pengalaman "terjebak" bagi pengguna dengan sensitivitas gerakan.

### 🟡 Rendah (Low / Polish)

6. **Duplikasi registrasi GSAP & import berulang** — setiap section: `import gsap from "gsap"; import { ScrollTrigger } ...; if (typeof window !== "undefined") gsap.registerPlugin(ScrollTrigger)`.
   Registrasi plugin diulang 6×; lebih baik satu modul shared/utility client yang mendaftarkan plugin sekali.

7. **Title ditulis manual lengkap, bukan pakai `title.template`** — `page.tsx:12`.
   Layout sudah punya `template: "%s | Simfoni Evav"` (`layout.tsx:48`); page sebaiknya cukup `title: "Warisan — Jejak & Kedaulatan Evav"` agar konsisten & mudah dipelihara.

8. **Metadata per-halaman tidak mengoverride `twitter`/`robots`/`openGraph.images`** — `page.tsx:11-25`.
   OG image lokal (`opengraph-image.tsx`) akan tetap terpakai, tapi eksplisitnya `twitter.card` per halaman akan membantu keterjaminan preview sosial.

---

## Rekomendasi Perbaikan

### 1. Pisahkan boundary: Server Component untuk konten, Client Component hanya untuk animasi (CRITICAL)

Buat wrapper client kecil yang menerima **Server Component children** (pattern "server children"), sehingga teks & markup statis tetap di‑server.

```tsx
// web/src/components/heritage/Reveal.tsx  (Client Component minimal)
"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") gsap.registerPlugin(ScrollTrigger);

export function Reveal({ selector, className, children }: {
  selector: string; className?: string; children: React.ReactNode;
}) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const ctx = gsap.context(() => {
      if (prefersReduced) { gsap.set(selector, { opacity: 1, y: 0 }); return; }
      gsap.from(selector, { opacity: 0, y: 30, duration: 0.9, stagger: 0.15,
        scrollTrigger: { trigger: el, start: "top 80%", toggleActions: "play none none reverse" } });
    }, ref);
    return () => ctx.revert();
  }, [selector]);
  return <div ref={ref} className={className}>{children}</div>;
}
```

Lalu `KarelHeritageSection` diubah jadi **Server Component** (hapus `"use client"`), dan elemen yang butuh reveal dibungkus `<Reveal selector=".karel-reveal">…konten statis…</Reveal>`. Data `TIMELINE`/`AWARDS`/`LEGACY` tetap di server. Hasil: teks sejarah ada di HTML statis, GSAP hanya di bundle kecil.

### 2. Nonaktifkan scroll-snap saat `prefers-reduced-motion` (MEDIUM)

Tambahkan di CSS global / Tailwind layer:

```css
@media (prefers-reduced-motion: reduce) {
  .snap-container { scroll-snap-type: none; }
}
```

…dan ganti kelas section dari `md:snap-start md:snap-always` ke container dengan kelas `snap-container` yang dinonaktifkan oleh media query di atas. Atau gunakan utility `motion-reduce:snap-none` (jika didukung) pada tiap section.

### 3. Tambahkan `error.tsx` dan `loading.tsx` di segmen (MEDIUM)

```tsx
// web/src/app/heritage/error.tsx
"use client";
export default function Error({ reset }: { error: Error; reset: () => void }) {
  return (
    <main id="main-content" className="flex min-h-screen items-center justify-center">
      <div className="text-center">
        <h1 className="font-serif text-fluid-h2">Terjadi kesalahan</h1>
        <button onClick={reset} className="btn-cta mt-6">Coba lagi</button>
      </div>
    </main>
  );
}
```

```tsx
// web/src/app/heritage/loading.tsx
export default function Loading() {
  return (
    <main id="main-content" className="flex min-h-screen items-center justify-center">
      <div className="h-10 w-10 animate-pulse rounded-full bg-brand/30" aria-hidden="true" />
    </main>
  );
}
```

### 4. Tambahkan JSON-LD (MEDIUM)

Di `page.tsx` (Server Component), sisipkan structured data:

```tsx
import { Metadata } from "next";

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "Warisan — Jejak & Kedaulatan Evav",
  description: "…",
  author: { "@type": "Organization", name: "Tim Simfoni Evav" },
  publisher: { "@type": "Organization", name: "Simfoni Evav" },
};
// di dalam return:
// <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
```

Pastikan JSON-LD di-generate di server (bukan di client) agar crawler langsung menerimanya.

### 5. Gunakan `title.template` & lengkapi metadata (LOW)

```tsx
export const metadata: Metadata = {
  title: "Warisan — Jejak & Kedaulatan Evav", // template layout menambahkan " | Simfoni Evav"
  description: "…",
  alternates: { canonical: "/heritage" },
  openGraph: { /* … */ },
  twitter: { card: "summary_large_image" },
  robots: { index: true, follow: true },
};
```

### 6. Sentralisasi registrasi GSAP (LOW)

Buat `web/src/lib/gsap.ts` (client) yang mendaftarkan `ScrollTrigger` sekali, lalu diimpor oleh wrapper `Reveal` di atas — menghilangkan 6× duplikasi `registerPlugin`.

---

## Referensi

- Next.js — Server and Client Components: https://nextjs.org/docs/app/getting-started/server-and-client-components
- Next.js — Composition Patterns (server children / interleaving): https://nextjs.org/docs/app/getting-started/server-and-client-components#passing-server-components-to-client-components
- Next.js — Metadata API (`metadataBase`, `alternates.canonical`, `openGraph`): https://nextjs.org/docs/app/api-reference/functions/generate-metadata
- Next.js — file conventions `loading.tsx`: https://nextjs.org/docs/app/api-reference/file-conventions/loading
- Next.js — file conventions `error.tsx` (wajib `"use client"`): https://nextjs.org/docs/app/getting-started/error-handling
- Next.js — `opengraph-image.tsx`: https://nextjs.org/docs/app/api-reference/file-conventions/opengraph-image
- Next.js — `next/link`, `next/image`, `next/font`: https://nextjs.org/docs/app/api-reference/components
- Next.js — Suspense & Streaming: https://nextjs.org/docs/app/getting-started/suspense
- Next.js — JSON-LD / Structured Data guidance: https://nextjs.org/docs/app/building-your-application/optimizing
- AGENTS.md proyek (§4.9 GSAP cleanup, §7.2 CTA `.btn-cta`, §9 aksesibilitas `prefers-reduced-motion`): /home/almuzky/discover_evav/AGENTS.md
- GRAND_DESIGN.md (§6.5 Design Restraint, §13 spot-light): /home/almuzky/discover_evav/docs/GRAND_DESIGN.md

---

_Dokumen ini hanya hasil audit & rekomendasi; tidak mengubah source code kecuali pembuatan file laporan ini._
