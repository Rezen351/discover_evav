# Best Practice Audit: /kebijakan-privasi (web/src/app/kebijakan-privasi/page.tsx)

## Ringkasan

Halaman `kebijakan-privasi` merupakan halaman legal/statis yang ditulis dengan pendekatan **Server Component** yang benar: tidak ada `"use client"`, tidak ada data fetching sisi klien, dan konten dirender sebagai HTML statis. Metadata dasar (`title`, `description`) sudah didefinisikan. Layout (`LegalLayout`) menggunakan `<article>`, `<header>`, `<footer>` yang semantik, tautan "Beranda" memakai `next/link`, dan aksesibilitas label sudah ada.

Namun, terdapat beberapa celah kepatuhan terhadap standar Next.js 16 App Router:
- **Metadata SEO tidak lengkap** — tidak ada `alternates.canonical`, `openGraph`, `robots`, atau `keywords` spesifik halaman, sehingga mengandalkan turunan dari root layout dan rawan duplikasi title tag dengan home.
- **Tidak ada struktur data JSON-LD** (`WebPage`/`Article`/`PrivacyPolicy`) untuk rich result hukum.
- **Beberapa tautan eksternal** (`https://discoverevav.id`, `mailto:`) tidak memakai `rel` yang sesuai (mis. `noopener`) dan tidak konsisten dengan `next/link` yang dipakai di `LegalLayout`.

**Rating: Baik / Cukup Baik (Good)** — skor **78/100**.

## Standar Next.js yang Direview

1. **Server vs Client Components** — Halaman legal/statis harus tetap Server Component (default), tanpa `"use client"` kecuali benar-benar butuh interaktivitas.
2. **Metadata API untuk SEO** — `metadata`/`generateMetadata`, `title`/`description`, `alternates.canonical`, `openGraph`, `twitter`, `robots`, `keywords`.
3. **Static vs Dynamic Rendering & Caching** — Halaman tanpa data dinamis dirender statis (SSG) secara otomatis di App Router.
4. **Semantic HTML & Accessibility (a11y)** — Penggunaan elemen semantik (`article`, `main`, heading hierarki), `aria-label`, tautan aksesibel, skip link.
5. **`next/link` & `next/image`** — Tautan internal via `next/link`; gambar via `next/image`.
6. **`loading.tsx` / `error.tsx` / `not-found.tsx`** — Penanganan status loading/error.
7. **Route Segment Config** — `export const dynamic`, `revalidate`, dll. bila perlu.
8. **TypeScript Conventions** — `strict: true`, tipe eksplisit, hindari `any`.
9. **Performance** — Minimal JS di klien, `next/font`, hindari CLS.

## Analisis Kepatuhan

| Standar | Status | Bukti / Evidence |
| --- | --- | --- |
| Server Component (tanpa `"use client"`) | ✅ | `page.tsx:10` `export default function PrivacyPolicyPage()` — tidak ada direktif `"use client"`, halaman statis murni. |
| Rendering statis (SSG) otomatis | ✅ | Tidak ada `fetch`, tidak ada dynamic API; Next.js merender statis di build time (`page.tsx:1-359`). |
| `metadata` title & description | ✅ | `page.tsx:4-8` mendefinisikan `title` dan `description`. |
| `alternates.canonical` per halaman | ❌ | Tidak ada `alternates.canonical: "/kebijakan-privasi"`. Root layout hanya set canonical `/` (`layout.tsx:71-73`), sehingga halaman ini mewarisi canonical home — berisiko duplikasi SEO. |
| `openGraph` / `twitter` per halaman | ❌ | Tidak didefinisikan; halaman mewarisi OG root layout (title home) yang tidak cocok untuk privacy policy. |
| `robots` per halaman | ⚠️ | Tidak eksplisit; mewarisi `index/follow` dari root (`layout.tsx:91-101`) — aman tapi tidak disengaja/dokumentasi. |
| `keywords` per halaman | ⚠️ | Tidak ada; mewarisi keyword root yang bertema pariwisata, kurang relevan untuk halaman legal. |
| JSON-LD Structured Data | ❌ | Tidak ada `PrivacyPolicy`/`WebPage` JSON-LD di halaman ini (hanya Organization/WebSite di root `layout.tsx:114-175`). |
| Semantic HTML | ✅ | `LegalLayout.tsx:18` `<article>`, `:32` `<header>`, `:56` `<footer>`, heading `h1-h3` terstruktur (`page.tsx:17,41,47,...`). |
| Hierarchy heading (h1→h2→h3) | ✅ | `LegalLayout` render `<h1>` (`title`), page render `<h2>`/`<h3>` (`page.tsx:17,47,97,...`). Tidak ada lompatan level. |
| Aksesibilitas tautan (aria-label) | ✅ | `LegalLayout.tsx:26` `aria-label="Kembali ke beranda"` pada `next/link`. |
| `next/link` untuk tautan internal | ✅ | `LegalLayout.tsx:23` tautan Beranda pakai `next/link` `href="/"`. |
| `rel` pada tautan eksternal | ⚠️ | `page.tsx:23,333` tautan `https://discoverevav.id` pakai `<a href>` tanpa `rel="noopener noreferrer"`. `mailto:` (`page.tsx:91,302,337,341`) tanpa penanganan a11y/label eksplisit. |
| Konsistensi tautan (link vs anchor) | ⚠️ | Tautan eksternal menggunakan `<a>` mentah bukan `next/link` (aman untuk eksternal) tapi tanpa atribut keamanan `rel`. |
| `next/image` untuk gambar | N/A | Halaman tidak menggunakan gambar — sesuai untuk dokumen legal. |
| `loading.tsx` / `error.tsx` / `not-found.tsx` | ⚠️ | Tidak ada `error.tsx`/`not-found.tsx` di segmen ini (glob tidak menemukan `web/src/app/{loading,error,not-found}.tsx`). Tidak kritis untuk halaman statis, tapi `not-found.tsx` disarankan untuk route-level 404. |
| Route Segment Config (`dynamic`/`revalidate`) | N/A | Tidak diperlukan; halaman statis default sudah benar. |
| TypeScript strict & tipe eksplisit | ✅ | `page.tsx:1` `import type { Metadata }`, tidak ada `any`. `LegalLayout` memiliki `LegalLayoutProps` terdefinisi (`LegalLayout.tsx:4-9`). |
| Performance (zero client JS) | ✅ | Halaman tidak mengirim JS interaktif; hanya bergantung pada font & global shell. |
| `next/font` digunakan | ✅ | Font di-load di root layout (`layout.tsx:2-24`) dan diteruskan via CSS variables; digunakan di `LegalLayout.tsx:20,38`. |
| Pencegahan CLS | ✅ | Tidak ada resource berat; tipografi pakai `clamp()` stabil (`LegalLayout.tsx:37`). |

## Temuan & Masalah

| # | Severity | File : Line | Masalah |
| --- | --- | --- | --- |
| F1 | ⚠️ Sedang | `web/src/app/kebijakan-privasi/page.tsx:4-8` | Metadata tidak memiliki `alternates.canonical`. Karena root layout mendefinisikan `canonical: "/"` (`layout.tsx:71-73`), halaman ini akan mewarisi canonical ke home, menciptakan sinyal SEO duplikat yang salah. |
| F2 | ⚠️ Sedang | `web/src/app/kebijakan-privasi/page.tsx:4-8` | Tidak ada `openGraph`/`twitter` spesifik halaman. Saat dibagikan di media sosial, preview akan menggunakan title/description home (template `%s \| Simfoni Evav` dari `layout.tsx:48` cukup, tapi OG description/image mengikuti root). |
| F3 | 🔴 Rendah–Sedang | `web/src/app/kebijakan-privasi/page.tsx:23,333` | Tautan eksternal `https://discoverevav.id` menggunakan `<a href>` tanpa `rel="noopener noreferrer"` (keamanan `target="_blank"`-style / best practice eksternal). Meski tanpa `target`, praktik eksternal menyarankan `rel`. |
| F4 | ⚠️ Rendah | `web/src/app/kebijakan-privasi/page.tsx` (seluruh) | Tidak ada JSON-LD terstruktur (`PrivacyPolicy` / `WebPage`). Google mendukung schema legal dokumen untuk rich result. |
| F5 | ⚠️ Rendah | `web/src/app/kebijakan-privasi/page.tsx:4-8` | Tidak ada `keywords` atau `robots` eksplisit di level halaman (bergantung warisan root). Kurang eksplisit/terdokumentasi. |
| F6 | 🔔 Info | `web/src/app/kebijakan-privasi/` (segment) | Tidak ada `not-found.tsx` / `error.tsx` di segmen ini. Untuk halaman statis tidak kritis, tapi disarankan `not-found.tsx` agar 404 konsisten dengan desain legal. |
| F7 | 🔔 Info | `web/src/app/kebijakan-privasi/page.tsx:91,302,337,341` | Tautan `mailto:` tidak memiliki `aria-label` deskriptif (mis. "Kirim email ke privasi"). Cukup dengan teks tautan, namun bisa ditingkatkan untuk screen reader. |

## Rekomendasi Perbaikan

### R1 — Tambahkan `alternates.canonical` dan perluas Metadata SEO (F1, F2, F5)

Ganti blok metadata di `web/src/app/kebijakan-privasi/page.tsx:4-8`:

```tsx
export const metadata: Metadata = {
  title: "Kebijakan Privasi",
  description:
    "Kebijakan Privasi Simfoni Evav — bagaimana kami memperlakukan data Anda saat menjelajahi situs pariwisata Kepulauan Kei.",
  keywords: [
    "Kebijakan Privasi",
    "Privasi Simfoni Evav",
    "Perlindungan Data",
    "UU PDP",
    "GDPR",
    "Discover Evav",
  ],
  alternates: {
    canonical: "/kebijakan-privasi",
  },
  openGraph: {
    title: "Kebijakan Privasi | Simfoni Evav",
    description:
      "Bagaimana Simfoni Evav memperlakukan data Anda: formulir sukarela, log server, peta interaktif, dan preferensi bahasa lokal.",
    url: "/kebijakan-privasi",
    siteName: "Simfoni Evav",
    locale: "id_ID",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Kebijakan Privasi | Simfoni Evav",
    description:
      "Bagaimana Simfoni Evav memperlakukan data Anda saat menjelajahi Kepulauan Kei.",
  },
  robots: {
    index: true,
    follow: true,
  },
};
```

> Catatan: `metadataBase` sudah di-set di root (`layout.tsx:45`), sehingga URL relatif (`/kebijakan-privasi`) akan otomatis di-resolve menjadi absolut.

### R2 — Tambahkan JSON-LD `PrivacyPolicy` (F4)

Sisipkan script JSON-LD di dalam komponen halaman (Server Component, aman):

```tsx
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "PrivacyPolicy",
  name: "Kebijakan Privasi Simfoni Evav",
  description:
    "Kebijakan Privasi Simfoni Evav — bagaimana kami memperlakukan data Anda saat menjelajahi situs pariwisata Kepulauan Kei.",
  url: "https://discoverevav.id/kebijakan-privasi",
  inLanguage: "id-ID",
  dateModified: "2026-07-19",
  publisher: {
    "@type": "Organization",
    name: "Tim Simfoni Evav",
    url: "https://discoverevav.id",
  },
};

// di dalam return, sebelum </LegalLayout>:
<script
  type="application/ld+json"
  dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
/>
```

`@type: "PrivacyPolicy"` adalah tipe schema.org yang valid untuk dokumen legal.

### R3 — Perbaiki tautan eksternal & `mailto` (F3, F7)

Gunakan atribut `rel` pada tautan eksternal dan tambahkan `aria-label` pada `mailto`:

```tsx
<a href="https://discoverevav.id" rel="noopener noreferrer">
  https://discoverevav.id
</a>

<a href="mailto:privasi@discoverevav.id" aria-label="Kirim email ke privasi@discoverevav.id">
  privasi@discoverevav.id
</a>
```

Untuk tautan eksternal yang bukan `mailto`, pertimbangkan tetap pakai `<a>` (bukan `next/link`) karena `next/link` khusus internal — namun selalu sertakan `rel="noopener noreferrer"`.

### R4 — Tambahkan `not-found.tsx` di segmen legal (F6)

Buat `web/src/app/kebijakan-privasi/not-found.tsx` (atau di `app/not-found.tsx` global) yang membungkus pesan 404 dengan `LegalLayout` agar konsisten secara visual.

### R5 — Pertahankan praktik baik (tidak diubah)

- Jangan tambahkan `"use client"` — halaman sudah benar sebagai Server Component statis.
- Pertahankan `<article>`/`<header>`/`<footer>` semantik dan hierarki heading `h1→h2→h3`.
- Pertahankan `next/link` untuk tautan internal (Beranda).

## Referensi

- Next.js Docs — Metadata and OG images: https://nextjs.org/docs/app/getting-started/metadata-and-og-images
- Next.js Docs — `metadata` file convention: https://nextjs.org/docs/app/api-reference/file-conventions/metadata
- Next.js Docs — Server and Client Components: https://nextjs.org/docs/app/getting-started/server-and-client-components
- Next.js Docs — `use client` directive: https://nextjs.org/docs/app/api-reference/directives/use-client
- Next.js Learn — Server and Client Components: https://nextjs.org/learn/react-foundations/server-and-client-components
- schema.org — PrivacyPolicy: https://schema.org/PrivacyPolicy
- Google Search Central — Metadata / canonical: https://developers.google.com/search/docs/appearance/title-link
- Artikel praktik SEO Next.js 16 (2026): https://jsdevspace.substack.com/p/how-to-configure-seo-in-nextjs-16
