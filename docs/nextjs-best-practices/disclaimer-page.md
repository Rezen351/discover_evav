# Best Practice Audit: /disclaimer (web/src/app/disclaimer/page.tsx)

> Audit berbasis standar Next.js 16.2.6 (App Router), React 19.2.4, TypeScript 5.
> Tanggal audit: 2026-07-20. Sumber rujukan: `nextjs.org/docs`, AGENTS.md proyek `web/`.

---

## Ringkasan

Halaman `/disclaimer` adalah halaman legal statis yang ditulis dengan sangat bersih dan **seluruhnya sebagai Server Component tanpa `use client`**. Komponen membungkus konten ke dalam `LegalLayout` yang sudah menyediakan struktur semantik (`<article>`, `<header>`, `<footer>`, satu `<h1>`). Metadata statis sudah didefinisikan dengan `export const metadata`. Secara arsitektur ini sudah mengikuti praktik terbaik App Router untuk halaman statis.

Namun terdapat beberapa kelemahan terkait **SEO/Metadata** dan **penggunaan `<a>` vs `next/link`** pada tautan yang sebenarnya bisa/perlu diperbaiki:

- **Judul metadata belum mengikuti `title.template`** dari root layout, sehingga hasil `<title>` menjadi `Disclaimer` (tanpa brand suffix `| Simfoni Evav`).
- **Metadata kurang lengkap**: belum ada `alternates.canonical`, `openGraph`, `robots`, dan `keywords` untuk halaman legal ini.
- **Tautan eksternal** (`https://discoverevav.id`, `mailto:`) menggunakan `<a>` HTML mentah. Meskipun untuk URL eksternal ini boleh dibenarkan, kurangnya `rel="noopener"` (untuk `https://`) dan atribut `aria-label`/teks deskriptif yang konsisten adalah isu aksesibilitas ringan.

**Rating: Baik (Good) — Kepatuhan tinggi pada fondasi App Router, perlu penyempurnaan metadata & tautan.**

**Skor: 82 / 100**

| Kategori | Skor |
| --- | --- |
| Server/Client Component boundary | 20/20 |
| Metadata & SEO | 14/25 |
| Semantic HTML & A11y | 16/20 |
| Rendering statis / Performa | 16/16 |
| Konvensi App Router & TS | 16/19 |

---

## Standar Next.js yang Direview

1. **Server vs Client Components** — Minimalkan JS klien; default Server Component; `"use client"` hanya bila butuh event/hooks/browser API.
2. **Metadata API** — `export const metadata` / `generateMetadata`; `metadataBase`, `title.template`, `canonical`, `openGraph`, `robots`.
3. **Static vs Dynamic Rendering & Caching** — Halaman statis di-prerender; `dynamic = 'force-static'` bila perlu; hindari dynamic API yang tidak perlu.
4. **Semantic HTML & Accessibility** — Satu `<h1>`, heading berurutan, `aria-label` pada tautan ikon, `lang`, kontras.
5. **Navigasi** — Prefer `next/link` untuk rute internal; atribut `rel` aman untuk eksternal.
6. **Konvensi App Router** — `loading.tsx`/`error.tsx`/`not-found.tsx` di segmen rute; colocation; path alias `@/*`.
7. **TypeScript & Convention** — `strict: true`, impor `type`, penamaan eksplisit.
8. **Performance** — Tidak ada JS/client tidak perlu, tidak ada gambar berat; `next/font` dipakai di layout.

---

## Analisis Kepatuhan

| Standar | Status | Bukti (file:line) |
| --- | --- | --- |
| Server Component (tanpa `"use client"`) | ✅ | `page.tsx:1-196` — tidak ada direktif `"use client"`; komponen hanya me-render JSX statis. |
| Komponen dibungkus layout legal bersama | ✅ | `page.tsx:12` `<LegalLayout ...>` — `LegalLayout` juga Server Component (`components/legal/LegalLayout.tsx:1`). |
| Satu `<h1>` per halaman | ✅ | `LegalLayout.tsx:36-41` merender `<h1>{title}</h1>`; `page.tsx` hanya menggunakan `<h2>` (`page.tsx:17,33,51,…`). |
| Heading berurutan (h2→konten) | ✅ | Semua sub-bagian pakai `<h2>` (`page.tsx:17,33,51,80,99,127,155,176,185`); tidak ada lompatan level. |
| `export const metadata` statis | ✅ | `page.tsx:4-8` mendefinisikan `title` + `description`. |
| `title` mengikuti `title.template` root | ❌ | `page.tsx:5` `title: "Disclaimer"` (string) → menghasilkan `<title>Disclaimer</title>`. Root layout punya `template: "%s | Simfoni Evav"` (`layout.tsx`). String `title` menggantikan template, bukan menggunakannya. |
| `metadataBase` / `canonical` | ⚠️ | `metadataBase` ada di root (`layout.tsx`), tapi halaman ini tidak menetapkan `alternates.canonical: "/disclaimer"` → crawler dapat mengindeks URL duplikat. |
| `openGraph` / `twitter` | ❌ | `page.tsx:4-8` tidak ada `openGraph`/`twitter`. Root layout punya OG default, tapi halaman legal lebih baik punya OG eksplisit (title/description lokal). |
| `robots` (index/follow) | ❌ | Tidak ada `robots` eksplisit; legal page boleh diindeks, tetapi eksplisit lebih aman & terdokumentasi. |
| `keywords` halaman | ⚠️ | Tidak ada `keywords` spesifik halaman legal. |
| Penggunaan `next/link` untuk tautan | ⚠️ | `page.tsx:20` & `page.tsx:192` pakai `<a href="https://...">` / `<a href="mailto:">` (bukan `next/link`). Untuk URL eksternal ini *diperbolehkan*, namun `<a>` eksternal sebaiknya `rel="noopener noreferrer"`. |
| `rel="noopener"` pada tautan eksternal | ❌ | `page.tsx:20` `<a href="https://discoverevav.id">` tanpa `rel="noopener noreferrer"`. |
| `aria-label` pada tautan non-teks | ✅ | Di `LegalLayout.tsx:26` tautan "Beranda" ikon memiliki `aria-label`. (Tautan teks di page cukup deskriptif.) |
| `lang` & struktur dokumen | ✅ | `lang="id"` di root layout; `<article>` + `<header>` + `<footer>` di `LegalLayout.tsx:18,32,56`. |
| Static rendering (prerender) | ✅ | Tidak ada `cookies()`, `headers()`, `searchParams`, atau fetch dinamis → halaman dapat di-prerender statis (SSG) otomatis. |
| `loading.tsx` / `error.tsx` / `not-found.tsx` | N/A | Tidak ada di segmen `/disclaimer`. Untuk halaman statis murni tidak kritis, namun `error.tsx` disarankan sebagai best practice defensif. |
| Path alias `@/*` | ✅ | `page.tsx:2` `import LegalLayout from "@/components/legal/LegalLayout"`. |
| Impor `type` eksplisit | ✅ | `page.tsx:1` `import type { Metadata } from "next"`. |
| `next/font` | ✅ | Font di-handle di root layout (`layout.tsx` — Montserrat/Montaga/Ephesis), diwarisi halaman. |
| `next/image` | N/A | Halaman legal ini tidak menggunakan gambar (wajar untuk dokumen teks). |
| Teks UI Bahasa Indonesia | ✅ | Semua konten & label (`page.tsx`, `LegalLayout.tsx`) berbahasa Indonesia sesuai AGENTS.md §1. |

---

## Temuan & Masalah

| # | Severity | Masalah | File:Line |
| --- | --- | --- | --- |
| F1 | 🔴 Tinggi | `title: "Disclaimer"` (string) **mengabaikan** `title.template` root (`"%s | Simfoni Evav"`). Hasil `<title>` menjadi `Disclaimer` tanpa brand suffix, buruk untuk SEO/branding & konsistensi. | `page.tsx:5` |
| F2 | 🟡 Sedang | Metadata kurang lengkap untuk SEO: tidak ada `alternates.canonical`, `openGraph`, `robots`, `keywords`. Berisiko URL duplikat terindeks & pratinjau social media lemah. | `page.tsx:4-8` |
| F3 | 🟡 Sedang | Tautan eksternal `<a href="https://discoverevav.id">` tanpa `rel="noopener noreferrer"` (praktik keamanan saat membuka URL eksternal). | `page.tsx:20` |
| F4 | 🟢 Rendah | `loading.tsx` / `error.tsx` tidak ada di segmen rute; sebagai pertahanan untuk error render. | `src/app/disclaimer/` |
| F5 | 🟢 Rendah | `mailto:` link (`page.tsx:192`) berupa teks telanjang `info@discoverevav.id` — dapat disederhanakan namun sudah cukup aksesibel; tidak ada isu fungsional. | `page.tsx:192` |

---

## Rekomendasi Perbaikan

### R1 — Perbaiki `title` agar mengikuti `title.template` (F1)

Gunakan `title.absolute` **hanya jika** Anda benar-benar ingin memutus template. Untuk konsistensi brand, lebih baik biarkan template berlaku:

```tsx
// web/src/app/disclaimer/page.tsx
export const metadata: Metadata = {
  title: "Disclaimer", // akan menjadi "Disclaimer | Simfoni Evav" via title.template root
  description:
    "Disclaimer Simfoni Evav — batasan tanggung jawab atas informasi pariwisata Kepulauan Kei yang disajikan di situs ini.",
};
```

Jika ingin teks persis `Disclaimer` tanpa suffix, gunakan `title: { absolute: "Disclaimer" }`. Rekomendasi: biarkan template (hapus `'use client'` tidak relevan → pastikan string saja).

### R2 — Lengkapi Metadata SEO (F2)

```tsx
export const metadata: Metadata = {
  title: "Disclaimer",
  description:
    "Disclaimer Simfoni Evav — batasan tanggung jawab atas informasi pariwisata Kepulauan Kei yang disajikan di situs ini.",
  alternates: {
    canonical: "/disclaimer",
  },
  openGraph: {
    title: "Disclaimer | Simfoni Evav",
    description:
      "Disclaimer Simfoni Evav — batasan tanggung jawab atas informasi pariwisata Kepulauan Kei.",
    url: "/disclaimer",
    siteName: "Simfoni Evav",
    type: "article",
  },
  robots: {
    index: true,
    follow: true,
  },
  keywords: [
    "Disclaimer",
    "Simfoni Evav",
    "Kepulauan Kei",
    "Penafian",
    "Pariwisata Kei",
  ],
};
```

`metadataBase` sudah diwarisi dari root layout, sehingga `url: "/disclaimer"` otomatis menjadi absolut.

### R3 — Tambahkan `rel` aman pada tautan eksternal (F3)

```tsx
{/* page.tsx:20 */}
<a
  href="https://discoverevav.id"
  target="_blank"
  rel="noopener noreferrer"
>
  https://discoverevav.id
</a>
```

Untuk `mailto:` (`page.tsx:192`) `rel` tidak diperlukan, tetapi dapat diberi `aria-label` eksplisit jika diinginkan.

### R4 — Tambahkan `error.tsx` (dan opsional `loading.tsx`) di segmen rute (F4)

```tsx
// web/src/app/disclaimer/error.tsx
"use client";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <main className="mx-auto max-w-[760px] px-6 py-16">
      <h1>Terjadi kesalahan</h1>
      <p>Maaf, halaman disclaimer sedang tidak dapat ditampilkan.</p>
      <button onClick={reset}>Coba lagi</button>
    </main>
  );
}
```

Karena halaman statis, `loading.tsx` opsional (tidak ada Suspense boundary dinamis).

### R5 — Pertahankan praktik baik yang sudah ada

Jangan ubah: struktur `<article>/<header>/<footer>`, satu `<h1>`, tidak ada `"use client"`, penggunaan alias `@/*`, dan teks Bahasa Indonesia. Semua sudah sesuai standar.

---

## Referensi

- Next.js Docs — `metadata` object & `generateMetadata`: https://nextjs.org/docs/app/api-reference/functions/generate-metadata
- Next.js Docs — Metadata file conventions: https://nextjs.org/docs/app/api-reference/file-conventions/metadata
- Next.js Docs — `title.template` / `title.absolute`: https://nextjs.org/docs/app/api-reference/functions/generate-metadata#template
- Next.js Docs — Server & Client Components: https://nextjs.org/docs/app/getting-started/server-and-client-components
- Next.js Docs — `error.js` (error.tsx): https://nextjs.org/docs/app/api-reference/file-conventions/error
- Next.js SEO Best Practices 2026 (Webkul): https://webkul.com/blog/next-js-16-seo-best-practices
- Next.js App Router Complete Guide 2026 (Craftly): https://getcraftly.dev/blog/nextjs-16-app-router-guide
- AGENTS.md proyek `web/` — §1 Bahasa, §4 Arsitektur, §7 Coding Guidelines, §9 Accessibility.
- Kode yang diaudit: `web/src/app/disclaimer/page.tsx`, `web/src/components/legal/LegalLayout.tsx`, `web/src/app/layout.tsx`, `web/src/app/globals.css` (`.legal-prose`).
