# Best Practice Audit: /culture (web/src/app/culture/page.tsx)

> **Framework**: Next.js 16.2.6 (App Router), React 19.2.4, TypeScript 5
> **Route**: `/culture` — Halaman Budaya & Sejarah Kepulauan Kei ("Simfoni Evav")
> **Tanggal audit**: 2026-07-20
> **Metodologi**: Research dokumentasi resmi Next.js (`nextjs.org/docs`) + analisis statis kode sumber aktual.

---

## Ringkasan

Halaman `/culture` merupakan Server Component tipis yang menyusun 7 section budaya dan menyediakan `metadata` statis secara benar. Secara struktural halaman ini **patuh** terhadap pola App Router: halaman tidak memaksakan `"use client"`, metadata dikelola lewat Metadata API (bukan `<head>` manual), OG image dihasilkan via `next/og`, data konten disentralisasi di `src/content/`, dan gambar menggunakan `next/image` dengan `sizes`/prioritas yang tepat.

Namun, **seluruh 7 section bawahan ditandai `"use client"`**, termasuk section yang murni render data statis (LarvulNgabal, WarisanTakbenda, BudayaTimeline) hanya demi animasi GSAP scroll-reveal. Ini mengirim JS GSAP + ScrollTrigger + Heroicons + isi section ke bundle klien untuk konten yang sepenuhnya statis dan bisa dirender di server. Selain itu route `/culture` **tidak memiliki `loading.tsx`, `error.tsx`, atau `not-found.tsx`** lokal, sehingga tidak ada error boundary maupun streaming skeleton di tingkat segmen. Tidak ada pula `generateMetadata`/`JSON-LD` spesifik artikel Budaya (hanya OG image statis).

**Rating: Baik dengan catatan performa (Good with caveats).**
**Skor kepatuhan: 78 / 100**

---

## Standar Next.js yang Direview

Referensi praktik terbaik diambil dari dokumentasi resmi dan artikel produksi 2026:

1. **Server vs Client Components** — Default Server Component; `"use client"` hanya untuk leaf yang butuh interaktivitas (hooks, event, browser API). Dorong batas klien sedalam mungkin.
2. **Metadata API** — Gunakan `metadata`/`generateMetadata` (bukan tag `<head>` manual); sertakan canonical, Open Graph, Twitter, dan `metadataBase`.
3. **Open Graph Image** — `opengraph-image.tsx` dengan `ImageResponse` (`next/og`) untuk OG dinamis/terpusat.
4. **next/image** — Selalu pakai `Image`; tetapkan `sizes`, `priority` untuk LCP, hindari `unoptimized` kecuali perlu.
5. **next/font** — Font lewat `next/font/google`, tidak ada `<link>` Google Fonts manual.
6. **next/link** — Navigasi internal pakai `next/link` (bukan `<a href>`).
7. **Data fetching & caching** — Fetch di Server Component; `cache`/`revalidate` eksplisit; jangan fetch di Client Component dengan secret.
8. **Streaming & Suspense** — `loading.tsx` dan `error.tsx` lokal per segmen; `Suspense` untuk subtree async.
9. **Route segment config & rendering** — Static vs dynamic; `generateStaticParams` untuk rute dinamis; `dynamicParams`.
10. **Aksesibilitas & HTML semantik** — Heading hierarki, `aria-*`, skip-link, `prefers-reduced-motion`.
11. **Performance** — Dynamic import untuk lib berat, bundle JS minimal, audit First Load JS.
12. **TypeScript & konvensi** — `strict`, alias `@/*`, tipe eksplisit, `import type` untuk tipe.
13. **JSON-LD / Structured Data** — `Article`/`TouristAttraction` schema untuk halaman editorial/SEO.

---

## Analisis Kepatuhan

| # | Standar | Status | Bukti (file:baris) |
|---|---------|--------|--------------------|
| 1 | Server vs Client Components | ⚠️ | `page.tsx:28` Server Component ✅; tapi 7 section semua `"use client"` (`HeroBudayaSection.tsx:1`, `LarvulNgabalSection.tsx:1`, `FilosofiSection.tsx:1`, `EkspresiBudayaSection.tsx:1`, `BreatherSection.tsx:1`, `WarisanTakbendaSection.tsx:1`, `BudayaTimelineSection.tsx:1`) |
| 2 | Metadata API | ✅ | `page.tsx:12-26` `export const metadata: Metadata` dengan title/description/canonical/openGraph; `metadataBase` di `layout.tsx:45` |
| 3 | Open Graph Image | ✅ | `culture/opengraph-image.tsx:1` pakai `ImageResponse` (`next/og`) |
| 4 | next/image | ✅ | `HeroBudayaSection.tsx:54-61` (`priority`, `sizes="100vw"`), `LarvulNgabalSection.tsx:93-99`, `WarisanTakbendaSection.tsx:90-96`, `EkspresiBudayaSection.tsx:159-166` |
| 5 | next/font | ✅ | `layout.tsx:9-24` `Montserrat`/`Montaga`/`Ephesis` via `next/font/google`; tidak ada `<link>` manual |
| 6 | next/link | ⚠️ | `FilosofiSection.tsx:152` pakai `next/link` ✅; tapi navigasi utama Navbar (`Navbar.tsx:157-165`, `199-208`) & Footer legal (`Footer.tsx:205-235`) pakai `<a href>` biasa |
| 7 | Data fetching & caching | ✅ | Tidak ada fetch eksternal; konten statis terpusat di `src/content/culture.ts` (tanpa `"use client"`), diimpor section — pola aman & sejalan AGENTS.md §4.10 |
| 8 | Streaming & Suspense / error boundary | ❌ | Tidak ada `culture/loading.tsx`, `culture/error.tsx`, `culture/not-found.tsx` (lihat `glob` culture dir: hanya `page.tsx` + `opengraph-image.tsx`) |
| 9 | Route config & rendering | ✅ | Halaman statis (tidak pakai `cookies()`/`headers()`); akan di-prerender. Tidak perlu `generateStaticParams` karena rute statis |
| 10 | Aksesibilitas & semantik | ✅ | Heading `h1`→`h4` hierarkis (`HeroBudayaSection.tsx:82`, dll.); `aria-label`/`aria-labelledby` pada section (`LarvulNgabalSection.tsx:52`); tab/`role` di `EkspresiBudayaSection.tsx`; skip-link di `layout.tsx:189-195`; `prefers-reduced-motion` di semua section (mis. `HeroBudayaSection.tsx:21-29`) |
| 11 | Performance / bundle | ⚠️ | GSAP + ScrollTrigger di-bundle ke klien di 7 file (`gsap.registerPlugin(ScrollTrigger)` di tiap section: `HeroBudayaSection.tsx:10-12` dst.); Heroicons diimpor langsung (named) ✅; `unoptimized` pada logo Navbar (`Navbar.tsx:141`) |
| 12 | TypeScript & konvensi | ✅ | `import type { Metadata }` (`page.tsx:1`); alias `@/*` konsisten; tipe eksplisit (`FilosofiSection.tsx:22`, `WarisanTakbendaSection.tsx:15`) |
| 13 | JSON-LD terstruktur | ⚠️ | `layout.tsx:114-175` hanya JSON-LD Organization/WebSite/TouristDestination global; tidak ada `Article`/`TouristAttraction` spesifik `/culture` di `page.tsx` |

---

## Temuan & Masalah

### 🔴 High

**H-1 — 7 section budaya seluruhnya `"use client"` padahal sebagian besar konten statis (client-JS bloat).**
- File: `web/src/components/culture/LarvulNgabalSection.tsx:1`, `WarisanTakbendaSection.tsx:1`, `BudayaTimelineSection.tsx:1`, `BreatherSection.tsx:1`, `FilosofiSection.tsx:1`, `HeroBudayaSection.tsx:1`, `EkspresiBudayaSection.tsx:1`
- Dampak: Ketiga section `LarvulNgabal`, `WarisanTakbenda`, `BudayaTimeline` **hanya** melakukan animasi GSAP scroll-reveal (`gsap.from` pada `*.reveal`). Mereka tidak butuh state/event/hook apa pun selain `useEffect` untuk animasi. Menandainya `"use client"` memaksa GSAP, ScrollTrigger, Heroicons, dan seluruh teks/bundle section turun ke klien — padahal kontennya bisa dirender penuh di server (SSR) dan dihidupkan animasinya lewat client-island kecil. Ini melanggar prinsip "dorong `'use client'` ke leaf" (Next.js 16 production guidelines).
- Bukti: `WarisanTakbendaSection.tsx:27-56` — satu-satunya alasan `"use client"` adalah `useEffect`+`gsap.context`; tidak ada `useState` interaktif.

**H-2 — Tidak ada error boundary & loading skeleton di segmen `/culture`.**
- File: `web/src/app/culture/` (hanya `page.tsx` + `opengraph-image.tsx`)
- Dampak: Jika salah satu section gagal (mis. `content/culture.ts` corrupt, atau runtime error saat hidrasi GSAP), seluruh halaman `/culture` tidak memiliki fallback `error.tsx` lokal — error akan naik ke `global-error.tsx` (yang kehilangan layout/provider). Tidak ada `loading.tsx` untuk streaming skeleton saat navigasi ke route ini. Praktik produksi 2026 mewajibkan `loading.tsx`/`error.tsx` terkolokasi per segmen.

### 🟡 Medium

**M-1 — Navigasi internal Navbar & Footer menggunakan `<a href>` bukan `next/link`.**
- File: `Navbar.tsx:157-165` (desktop), `Navbar.tsx:199-208` (mobile drawer), `Footer.tsx:205-235` (link legal)
- Dampak: Hilangnya prefetch, client-side navigation, dan Router Cache; setiap klik memicu full page reload. Ini bukan halaman eksternal (semua `/culture`, `/heritage`, dll. rute internal).

**M-2 — GSAP `registerPlugin` duplikat di 7 modul terpisah.**
- File: `HeroBudayaSection.tsx:10-12`, `LarvulNgabalSection.tsx:10-12`, `FilosofiSection.tsx:18-20`, `EkspresiBudayaSection.tsx:21-23`, `BreatherSection.tsx:10-12`, `WarisanTakbendaSection.tsx:11-13`, `BudayaTimelineSection.tsx:8-10`
- Dampak: `gsap.registerPlugin(ScrollTrigger)` dieksekusi berulang per modul. Meski idempoten, ini menambah noise dan menyulitkan triage; lebih baik di-centralisasi (mis. satu module `lib/gsap.ts` yang mengekspor instance terdaftar).

**M-3 — Tidak ada `generateMetadata`/JSON-LD `Article` spesifik rute budaya.**
- File: `page.tsx:12-26` (metadata statis), `layout.tsx:114-175` (JSON-LD global saja)
- Dampak: Metadata statis sudah baik, tapi halaman editorial budaya tidak punya JSON-LD `Article`/`TouristAttraction` terstruktur yang mencocokkan konten terlihat — kehilangan peluang SEO kaya (rich result) untuk halaman ini.

### 🟢 Low

**L-1 — `unoptimized` pada logo Navbar.**
- File: `Navbar.tsx:141` (`<Image ... unoptimized />`)
- Dampipak: Melewati optimasi Next.js untuk aset SVG logo. SVG lokal biasanya aman tanpa optimasi, namun sebaiknya dievaluasi; bukan blocker.

**L-2 — Inline `style` untuk font-family di banyak elemen.**
- File: `Navbar.tsx:145,148` (`style={{ fontFamily: "var(--font-serif)" }}`), pola serupa di `Footer.tsx`, semua section budaya
- Dampak: Bukan pelanggaran Next.js, tapi duplikasi gaya; lebih baik utility class Tailwind terpusat (sesuai GRAND_DESIGN §7.2). Tidak memengaruhi fungsionalitas.

---

## Rekomendasi Perbaikan

### R-1 (High) — Pisahkan animasi GSAP ke client-island; jadikan section statis Server Component.
Section `LarvulNgabal`, `WarisanTakbenda`, `BudayaTimeline`, `Breather` tidak butuh state. Hapus `"use client"` dan pindahkan `gsap.context` ke komponen kecil `RevealOnScroll` (`"use client"`) yang membungkus children.

```tsx
// web/src/components/RevealOnScroll.tsx  ("use client")
"use client";
import { useEffect, useRef, type ReactNode } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function RevealOnScroll({
  children,
  selector = ".reveal",
}: {
  children: ReactNode;
  selector?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const ctx = gsap.context(() => {
      if (prefersReduced) {
        gsap.set(selector, { opacity: 1, y: 0 });
        return;
      }
      gsap.utils.toArray<HTMLElement>(selector).forEach((node) => {
        gsap.from(node, {
          opacity: 0, y: 40, duration: 0.8, ease: "power2.out",
          scrollTrigger: { trigger: node, start: "top 88%", toggleActions: "play none none reverse" },
        });
      });
    }, ref);
    return () => ctx.revert();
  }, [selector]);
  return <div ref={ref}>{children}</div>;
}
```

```tsx
// LarvulNgabalSection.tsx  (HAPUS "use client")
import RevealOnScroll from "@/components/RevealOnScroll";
// ...render sebagai Server Component, bungkus konten:
export default function LarvulNgabalSection() {
  return (
    <RevealOnScroll>
      <section id="larvul-ngabal" aria-labelledby="larvul-title" className="...">
        {/* ...tanpa useRef/useEffect, class .reveal sebagai ganti .larvul-reveal */}
      </section>
    </RevealOnScroll>
  );
}
```
Hasil: JS GSAP hanya di-bundle sekali (di `RevealOnScroll`), dan konten teks/HTML dirender di server → LCP & SEO lebih baik.

### R-2 (High) — Tambahkan `error.tsx`, `loading.tsx`, `not-found.tsx` lokal di `culture/`.
```tsx
// web/src/app/culture/error.tsx
"use client";
export default function Error({ reset }: { error: Error; reset: () => void }) {
  return (
    <section className="min-h-[60vh] flex flex-col items-center justify-center gap-4">
      <h2 className="font-serif text-fluid-h3">Halaman budaya gagal dimuat</h2>
      <button onClick={reset} className="btn-cta">Coba lagi</button>
    </section>
  );
}
```
```tsx
// web/src/app/culture/loading.tsx
export default function Loading() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="h-10 w-10 animate-spin rounded-full border-2 border-brand border-t-transparent" aria-hidden="true" />
    </div>
  );
}
```

### R-3 (Medium) — Ganti `<a href>` internal di Navbar/Footer dengan `next/link`.
```tsx
// Navbar.tsx — ganti blok map saat ini
{navItems.map((item) => (
  <Link key={item.href} href={item.href} className="...">{item.label}</Link>
))}
```
Sama untuk drawer mobile (`Navbar.tsx:199-208`) dan link legal Footer (`Footer.tsx:205-235`). Eksternal (sosmed) tetap `<a target="_blank" rel="noreferrer">`.

### R-4 (Medium) — Centralisasi registrasi GSAP.
```tsx
// web/src/lib/gsap.ts
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
if (typeof window !== "undefined") gsap.registerPlugin(ScrollTrigger);
export { gsap, ScrollTrigger };
```
Impor dari `lib/gsap` di `RevealOnScroll` dan section interaktif (`EkspresiBudayaSection`), hapus 7 blok `registerPlugin` duplikat.

### R-5 (Medium) — Tambahkan JSON-LD `Article`/`TouristAttraction` di `page.tsx`.
```tsx
// di dalam BudayaPage(), sebelum return:
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "Jiwa Kei — Budaya & Sejarah Kepulauan Kei",
  description: "...", // sama dgn metadata.description
  inLanguage: "id-ID",
  about: { "@type": "TouristAttraction", name: "Kepulauan Kei" },
};
// render: <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
```

### R-6 (Low) — Evaluasi `unoptimized` logo & pindahkan `fontFamily` inline ke utility class.
- `Navbar.tsx:141`: pertimbangkan hapus `unoptimized` (SVG lokal via `next/image` aman) atau biarkan bila sengaja untuk performa.
- Pindahkan `style={{ fontFamily: "var(--font-serif)" }}` ke class utilitas (mis. `.font-serif-token`) untuk konsistensi dengan GRAND_DESIGN §7.2.

---

## Referensi

- Next.js Docs — [Adding Metadata](https://nextjs.org/docs/app/getting-started/metadata-and-og-images) (Metadata API, `generateMetadata`, OG images, `metadataBase`)
- Next.js Docs — [Server and Client Components](https://nextjs.org/docs/app/getting-started/server-and-client-components) (default Server, `"use client"` boundary)
- Next.js Learn — [Adding Metadata](https://nextjs.org/learn/dashboard-app/adding-metadata) (`title.template`, canonical, OG)
- Next.js Docs — [File Conventions: loading / error / not-found](https://nextjs.org/docs/app/api-reference/file-conventions) (Streaming, error boundaries per segment)
- Next.js Docs — [`next/image`](https://nextjs.org/docs/app/api-reference/components/image) (`priority`, `sizes`, `fill`)
- Next.js Docs — [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) (`next/font/google`)
- Next.js Docs — [`next/link`](https://nextjs.org/docs/app/api-reference/components/link) (prefetch, client navigation)
- Next.js Docs — [Dynamic Routes & `generateStaticParams`](https://nextjs.org/docs/app/building-your-application/routing/dynamic-routes)
- Artikel produksi 2026: ECOSIRE, ZTABS, TheKitBase, DevStash, CodeAustral, Digital Applied — pola App Router production (server-first, client-island, `loading.tsx`/`error.tsx` per segmen, audit First Load JS).
- `web/src/app/culture/page.tsx`, `web/src/app/layout.tsx`, `web/src/app/culture/opengraph-image.tsx`, `web/src/components/culture/*.tsx`, `web/src/components/Navbar.tsx`, `web/src/components/Footer.tsx`, `web/src/content/culture.ts`, `web/next.config.ts` (kode aktual yang diaudit).
- `AGENTS.md` (proyek) — §4.10 sentralisasi konten, §7.2 styling/Tailwind, §9 aksesibilitas.
