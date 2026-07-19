# Best Practice Audit: /explore (web/src/app/explore/page.tsx)

> Audit kepatuhan halaman `/explore` terhadap standar Next.js 16 App Router (Next.js 16.2.6, React 19.2.4, TypeScript 5). Dilakukan dengan membaca kode sumber aktual dan merujuk dokumentasi resmi Next.js (nextjs.org/docs, versi 16.2.10).

## Ringkasan

Halaman `/explore` mayoritas **patuh** terhadap praktik terbaik App Router. Halaman itu sendiri adalah Server Component murni (tidak ada `"use client"`), melakukan komposisi dari komponen-komponen yang memang butuh interaktivitas (GSAP, Swiper, slideshow) sebagai Client Components yang terisolasi dengan benar. Metadata SEO, JSON-LD terstruktur, `opengraph-image.tsx`, penggunaan `next/image` dengan `priority`/`sizes`, dan preferensi `prefers-reduced-motion` sudah diterapkan dengan baik.

Namun terdapat **beberapa pelanggaran arsitektur yang nyata**:

1. **Duplikasi elemen `<main id="main-content">`** — `layout.tsx` (baris 197) sudah menyediakan `<main id="main-content">`, tetapi `explore/page.tsx:58` merender `<main id="main-content">` lagi. Ini menghasilkan DOM tidak valid (ID ganda) dan skip-link aksesibilitas di layout menjadi merujuk ke elemen yang salah/salah satu dari dua `main`.
2. **Tidak ada `error.tsx` / `loading.tsx` / `Suspense`** pada segmen rute `/explore`, padahal halaman ini berat (beberapa GSAP + Swiper + video) dan rentan terhadap rendering-error komponen client tanpa batas kesalahan.
3. **Content centralization & SITE_URL hardcode** — `SITE_URL` di `page.tsx:32` di-hardcode (`"https://discoverevav.id"`) padahal `metadataBase` sudah didefinisikan di layout. Selain itu `src/content/explore.ts` menggunakan koordinat berstatus *perkiraan/riset web* (lihat komentar baris 8–15) yang langsung diterbitkan ke JSON-LD `TouristAttraction` sebagai fakta geospasial — risiko akurasi data SEO.

**Rating keseluruhan: Cukup (Perlu Perbaikan minor–sedang).**

**Skor: 78 / 100**

| Kategori | Skor |
| --- | --- |
| Server/Client Component boundary | 18/20 |
| Metadata & SEO | 17/20 |
| next/image & aset | 15/15 |
| Data fetching & caching | 10/10 (tidak ada data dinamis; statis) |
| Aksesibilitas & semantik | 8/15 |
| Error/loading & resiliensi | 4/10 |
| Arsitektur & konvensi file | 6/10 |

## Standar Next.js yang Direview

- **Server vs Client Components**: default Server Component; `"use client"` hanya di batas komponen interaktif; kurangi JS bundle klien.
- **Data Fetching**: async Server Component, `fetch` caching/revalidation, hindari waterfalls; gunakan `cacheComponents`/`use cache` bila relevan.
- **Metadata API**: `metadata`/`generateMetadata`, `openGraph`, `alternates.canonical`, `metadataBase`; `opengraph-image` files.
- **JSON-LD / Structured Data**: `<script type="application/ld+json">` dengan data terpercaya.
- **next/image**: optimasi otomatis, `alt` wajib, `sizes`, `priority` untuk above-the-fold, `loading="lazy"` di bawah lipatan.
- **next/font**: font via `next/font/google`, hindari layout shift, gunakan CSS variable.
- **next/link**: navigasi internal menggunakan `<Link>`.
- **File konvensi**: `loading.tsx`, `error.tsx`, `not-found.tsx`, `template.tsx`, `Suspense` untuk streaming.
- **Route Segment Config & rendering**: static vs dynamic, `dynamicParams`, `revalidate`.
- **Aksesibilitas & semantik HTML**: skip-to-content, ARIA, satu `main` per halaman, `prefers-reduced-motion`.
- **Performance**: dynamic `import()`, bundle size, hapus JS tidak perlu di klien.
- **TypeScript**: strict typing, hindari `any`, tipe eksplisit.
- **Cache Components (Next.js 16)**: model caching baru berbasis komponen (referensi).

## Analisis Kepatuhan

| Standar | Status | Bukti |
| --- | --- | --- |
| Halaman sebagai Server Component | ✅ | `web/src/app/explore/page.tsx:31` — tidak ada `"use client"`, hanya komposisi & map data. |
| Pembatasan `"use client"` ke leaf component | ✅ | Semua section interaktif (`HeroMetiSection`, `WisataAlamSection`, dll.) berdiri sendiri dengan `"use client"` di baris 1 masing-masing; page tidak ikut jadi client. |
| Metadata SEO (`title`, `description`, `canonical`, `openGraph`) | ✅ | `page.tsx:15-29`. `alternates.canonical: "/explore"` dan `openGraph` terisi. |
| `metadataBase` konsisten | ⚠️ | Layout punya `metadataBase` (`layout.tsx:45`), tetapi `page.tsx` menulis ulang URL absolut secara manual (`page.tsx:32,40-41,52`) alih-alih mengandalkan `metadataBase`. |
| `opengraph-image.tsx` | ✅ | `web/src/app/explore/opengraph-image.tsx` — `ImageResponse` dengan `size`, `contentType`, `alt`. |
| JSON-LD terstruktur | ⚠️ | `page.tsx:34-61` memetakan `spotAlam` ke `TouristAttraction`. Baik secara teknis, tapi data `geo` berasal dari koordinat *perkiraan* (`src/content/explore.ts:8-15`) — akurasi diragukan. |
| `next/image` (alt, sizes, priority, lazy) | ✅ | `HeroMetiSection.tsx:109-119` `priority={i === 0}`, `sizes="100vw"`; section lain pakai `sizes` responsif & `fill`. `alt` selalu ada. |
| Lazy video (kondisional saat aktif) | ✅ | `HeroMetiSection.tsx:121-134` — `<video>` hanya dirender saat `isActive` (IntersectionObserver), `preload="none"`. Sesuai §7.3.2 AGENTS. |
| GSAP cleanup (`gsap.context` + `ctx.revert`) | ✅ | Seluruh section membungkus animasi dalam `gsap.context(..., ref)` dan `return () => ctx.revert()` (mis. `HeroMetiSection.tsx:68-97`). |
| `prefers-reduced-motion` | ✅ | Hampir semua section & `useSlideshow` memeriksa `matchMedia("(prefers-reduced-motion: reduce)")` (mis. `page`-hook `useSlideshow.ts:17-23`). |
| `next/font` | ✅ | Font di-load di `layout.tsx:9-24` via `next/font/google` dengan CSS variable `--font-sans/--font-serif/--font-cursive`. |
| `next/link` untuk navigasi internal | ⚠️ | `InformasiPenutupSection.tsx:212` menggunakan `<Link href="/keterhubungan">` (baik), tapi banyak tautan internal lain dipakai sebagai `<a href="/culture">` (`SatwaEndemikSection.tsx:154`) dan `<a href="/destinasi">` (kode mati di `WisataAlamSection.tsx:269`). |
| Satu `<main>` & skip-link | ❌ | `layout.tsx:197` sudah `<main id="main-content">`, tetapi `page.tsx:58` merender `<main id="main-content">` lagi → ID ganda & struktur semantik rusak. |
| `error.tsx` / `loading.tsx` / `Suspense` | ❌ | Tidak ada `error.tsx`/`loading.tsx`/`template.tsx` di `web/src/app/explore/` (diverifikasi via `ls`). Tidak ada `Suspense` di page. |
| TypeScript strict | ✅ | `SeoJsonLd` pakai `jsonLd: unknown`; tipe eksplisit di `content/explore.ts` (`SpotAlam`, `KategoriAlam`). Tidak ditemukan `any`. |
| Sentralisasi konten (AGENTS §4.10) | ✅ | Data spot di `src/content/explore.ts`, tidak di-hardcode di komponen. |
| Render statis / tidak ada waterfalls | ✅ | Tidak ada `fetch` dinamis; semua data lokal → halaman dapat di-static-render (kecuali di-override oleh client components yang tetap SSR). |

## Temuan & Masalah

### 🔴 High

**H1. Duplikasi `<main id="main-content">` — pelanggaran semantik & aksesibilitas**
- **File/Baris:** `web/src/app/explore/page.tsx:58` (dan `web/src/app/layout.tsx:197`).
- **Penjelasan:** Root layout sudah membungkus `children` dengan `<main id="main-content">`. Page `/explore` merender `<main id="main-content">` sendiri, sehingga HTML final memiliki **dua elemen `<main>` dengan ID identik**. Ini (a) melanggar aturan "satu `main` per halaman" untuk aksesibilitas/screen reader, (b) membuat skip-link "Lompat ke konten utama" (`layout.tsx:189-195`) merujuk ke ID yang ambigu/duplikat, dan (c) menghasilkan ID tidak-unik (invalid HTML). Dampak: navigasi keyboard & pembaca layar terganggu.
- **Perbaikan:** Hapus `<main>` di `page.tsx` dan jadikan root `section` pertama (atau `<div>`/`<>`), karena `<main>` sudah disediakan layout. Cukup pertahankan `id="main-content"` hanya di layout.

### 🟠 Medium

**M1. Tidak ada `error.tsx` / `loading.tsx` / `Suspense` pada segmen `/explore`**
- **File/Baris:** `web/src/app/explore/` (tidak ada file tersebut).
- **Penjelasan:** Halaman sangat berat (GSAP ScrollTrigger di 7 section, Swiper di 2 section, slideshow, video). Jika satu Client Component melempar error saat render, seluruh rute `/explore` akan gagal tanpa batas kesalahan (error boundary) yang ramah pengguna. Tidak ada `loading.tsx` untuk fallback saat transisi/streaming. Praktik produksi Next.js menyarankan `error.tsx` (error boundary per-segmen) dan `loading.tsx`/`Suspense`.
- **Perbaikan:** Tambah `web/src/app/explore/error.tsx` (Client Component dengan `use client` + `reset`) dan pertimbangkan `loading.tsx`.

**M2. `SITE_URL` di-hardcode di page, duplikat dengan `metadataBase`**
- **File/Baris:** `web/src/app/explore/page.tsx:32, 40-41, 52`.
- **Penjelasan:** `"https://discoverevav.id"` di-hardcode untuk membangun URL JSON-LD, padahal `metadataBase` sudah didefinisikan di `layout.tsx:45`. Selain melanggar prinsip single source of truth (AGENTS §4.9), jika domain berubah, JSON-LD di `/explore` akan usang sementara metadata lain ikut `metadataBase`.
- **Perbaikan:** Ekspos `SITE_URL` dari konstanta terpusat (mis. `src/content/site.ts` atau env `NEXT_PUBLIC_SITE_URL`) dan impor di kedua tempat.

**M3. Akurasi koordinat JSON-LD `TouristAttraction` diragukan**
- **File/Baris:** `web/src/content/explore.ts:8-15` digabung ke JSON-LD di `page.tsx:42-46`.
- **Penjelasan:** Beberapa `lat`/`lng` berstatus "perkiraan berdasar riset web" / "pulley" (lihat komentar sumber). Data ini diterbitkan sebagai fakta `GeoCoordinates` ke schema.org `TouristAttraction`, yang bisa menyesatkan mesin pencari/peta. Bukan bug kode, tetapi risiko kualitas data SEO.
- **Perbaikan:** Pisahkan field `geo` opsional; hanya terbitkan `geo` untuk spot dengan koordinat *terverifikasi*. Atau tandai perkiraan secara eksplisit dan jangan masukkan ke JSON-LD.

**M4. Tautan internal menggunakan `<a>` bukan `<next/link>`**
- **File/Baris:** `SatwaEndemikSection.tsx:154` (`<a href="/culture">`); juga kode mati `WisataAlamSection.tsx:269` (`<a href="/destinasi">`).
- **Penjelasan:** Navigasi internal sebaiknya `<Link>` agar mendapat prefetch & client-side navigation (Next.js mempercepat navigasi, menghindari full reload). `InformasiPenutupSection.tsx:212` sudah benar pakai `<Link>`.
- **Perbaikan:** Ganti `<a href="/culture">` menjadi `<Link href="/culture">`. Hapus blok kode mati (M5).

### 🟡 Low

**L1. Kode mati / komentar ter-comment di section**
- **File/Baris:** `WisataAlamSection.tsx:267-291` (blok CTA di-comment), `WerWaratSection.tsx:132-143` (blok CTA di-comment).
- **Penjelasan:** Menyisakan JSX ter-comment besar. AGENTS §6.2 melarang placeholder, tapi ini kode mati (tidak aktif). Sebaiknya hapus agar bundle/reading bersih, atau aktifkan jika memang fitur.

**L2. `SeoJsonLd` tidak melakukan escaping/sanitasi pada `jsonLd`**
- **File/Baris:** `web/src/components/SeoJsonLd.tsx:5-11`.
- **Penjelasan:** Menggunakan `dangerouslySetInnerHTML` dengan `JSON.stringify`. Saat ini datanya dari konten internal terpercaya (aman), tetapi komponen bersifat umum (`jsonLd: unknown`). Bila suatu saat menerima data eksternal, berpotensi XSS via JSON-LD. AGENTS §5.3 melarang `dangerouslySetInnerHTML` dengan data tak terpercaya tanpa sanitasi. Rekomendasi: validasi skema (Zod) sebelum render, atau batasi tipe props.

**L3. `gsap.registerPlugin` dipanggil di module scope dengan guard `typeof window`**
- **File/Baris:** `HeroMetiSection.tsx:10-12`, pola berulang di setiap section.
- **Penjelasan:** Teknik `if (typeof window !== "undefined") gsap.registerPlugin(...)` di module top-level aman & umum, tetapi diulang di 7 file (duplikasi). Bisa dipusatkan ke satu modul utilitas `gsapSetup.ts` (DRY, AGENTS §10.2 — cek duplikasi sebelum membuat helper).
- **Perbaikan:** Buat `src/lib/gsap.ts` yang mengekspor plugin ter-register; impor di section.

**L4. `WisataAlamSection` mendefinisikan `SpotCard` di dalam render via IIFE**
- **File/Baris:** `WisataAlamSection.tsx:192-264`.
- **Penjelasan:** Mendefinisikan komponen di dalam body render (pola IIFE) menyebabkan komponen dibuat ulang setiap render → bisa menghancurkan state/refs internal dan memicu remount tidak perlu. Sebaiknya ekstrak `SpotCard` ke modul tingkat atas (atau file terpisah).
- **Perbaikan:** Deklarasikan `function SpotCard(...)` di luar komponen `WisataAlamSection`.

## Rekomendasi Perbaikan

### R1 — Perbaiki duplikasi `<main>` (H1)

`web/src/app/explore/page.tsx` — hapus `<main>` sendiri, gunakan fragment/section:

```tsx
export default function EksplorasiPage() {
  const SITE_URL = "https://discoverevav.id"; // → ganti ke konstanta terpusat (lihat R2)
  const spotJsonLd = spotAlam.map(/* ... */);

  return (
    <>
      <Navbar />
      {/* HAPUS <main id="main-content"> — sudah disediakan RootLayout */}
      {spotJsonLd.map((jsonLd) => (
        <SeoJsonLd key={jsonLd["@id"]} jsonLd={jsonLd} />
      ))}
      <HeroMetiSection />
      {/* ...section lain... */}
      <Footer />
    </>
  );
}
```

Catatan: karena `Navbar`/`Footer` dipanggil di page, pastikan tidak mengganggu struktur `<main>` milik layout. Lebih ideal: pindahkan `Navbar`/`Footer` ke dalam layout (atau `AppShell`) dan biarkan page hanya berisi section.

### R2 — Sentralisasikan `SITE_URL` (M2)

Buat `web/src/content/site.ts`:

```ts
export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://discoverevav.id";
```

Lalu di `layout.tsx` dan `explore/page.tsx` impor `SITE_URL` dari sana (dan `metadataBase` di layout bisa pakai `new URL(SITE_URL)`).

### R3 — Tambah `error.tsx` (M1)

`web/src/app/explore/error.tsx`:

```tsx
"use client";

import { useEffect } from "react";

export default function ExploreError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <main id="main-content" className="flex min-h-screen items-center justify-center">
      <div className="text-center">
        <h1 className="font-serif text-fluid-h2">Terjadi kesalahan</h1>
        <p className="mt-4 font-sans">Halaman eksplorasi tidak dapat ditampilkan.</p>
        <button
          type="button"
          onClick={reset}
          className="btn-cta mt-6 rounded-full px-6 py-3"
          aria-label="Coba muat ulang halaman"
        >
          Coba lagi
        </button>
      </div>
    </main>
  );
}
```

> Catatan: karena R1 menghapus `<main>` di page, `error.tsx` boleh memiliki `<main id="main-content">` sendiri sebagai pengganti sementara saat error (error boundary menggantikan seluruh subtree termasuk layout `main`).

Pertimbangkan juga `web/src/app/explore/loading.tsx` dengan skeleton statis untuk mencegah CLS.

### R4 — Navigasi internal pakai `<Link>` (M4)

`web/src/components/explore/SatwaEndemikSection.tsx`:

```tsx
import Link from "next/link";
// ...
<Link
  href="/culture"
  className="btn-spotlight btn-cta inline-flex items-center gap-2 ..."
  aria-label="Kenali budaya adat Kepulauan Kei"
>
  Kenali Budaya Adat
  <ArrowRightIcon className="h-4 w-4 md:h-5 md:w-5 text-current" />
</Link>
```

### R5 — Bersihkan kode mati & ekstrak `SpotCard` (L1, L4)

Hapus blok JSX ter-comment di `WisataAlamSection.tsx:267-291` dan `WerWaratSection.tsx:132-143`. Pindahkan `SpotCard` ke luar komponen:

```tsx
function SpotCard({ spot }: { spot: (typeof spotAlam)[number] }) {
  return (/* ...JSX... */);
}

export default function WisataAlamSection() {
  // ...
  {filtered.map((spot) => (
    <div key={spot.id} className="alam-fade">
      <SpotCard spot={spot} />
    </div>
  ))}
}
```

### R6 — Amankan/validasi `SeoJsonLd` (L2)

Batasi tipe props & validasi sebelum render:

```tsx
import { z } from "zod";

const JsonLdSchema = z.object({
  "@context": z.literal("https://schema.org"),
  "@type": z.string(),
}).passthrough();

export default function SeoJsonLd({ jsonLd }: { jsonLd: unknown }) {
  const parsed = JsonLdSchema.safeParse(jsonLd);
  if (!parsed.success) return null;
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(parsed.data) }}
    />
  );
}
```

### R7 — Pusatkan setup GSAP (L3)

`web/src/lib/gsap.ts`:

```ts
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export { gsap, ScrollTrigger };
```

Impor `{ gsap, ScrollTrigger }` dari `@/lib/gsap` di semua section, hapus blok `registerPlugin` lokal.

## Referensi

- Server and Client Components — https://nextjs.org/docs/app/getting-started/server-and-client-components
- Metadata and OG images — https://nextjs.org/docs/app/getting-started/metadata-and-og-images
- Image Optimization — https://nextjs.org/docs/app/getting-started/images
- Font Optimization — https://nextjs.org/docs/app/getting-started/fonts
- Linking and Navigating — https://nextjs.org/docs/app/getting-started/linking-and-navigating
- Fetching Data — https://nextjs.org/docs/app/getting-started/fetching-data
- Caching — https://nextjs.org/docs/app/getting-started/caching
- Revalidating — https://nextjs.org/docs/app/getting-started/revalidating
- Error Handling (error.js) — https://nextjs.org/docs/app/getting-started/error-handling
- File Conventions: error — https://nextjs.org/docs/app/api-reference/file-conventions/error
- File Conventions: loading — https://nextjs.org/docs/app/api-reference/file-conventions/loading
- JSON-LD Guide — https://nextjs.org/docs/app/guides/json-ld
- Route Segment Config — https://nextjs.org/docs/app/api-reference/file-conventions/route-segment-config
- Next.js Docs Index (llms.txt, v16.2.10) — https://nextjs.org/docs/llms.txt
