# SEO Reference — Discover Evav (Simfoni Evav)

> **Dokumen acuan** untuk membangun SEO yang profesional, *AI-friendly*, dan *Google-friendly* untuk situs **Discover Evav / Simfoni Evav** — situs pariwisata Kepulauan Kei, Maluku Tenggara.
>
> Dokumen ini bersifat **living reference**. Setiap perubahan strategi SEO wajib dicatat di sini terlebih dahulu (lihat AGENTS.md §7.2.0 *Grand Design* dan §3 *Logging*), lalu diimplementasikan ke kode.

---

## 0. Ringkasan Strategi (TL;DR)

Situs ini adalah **storytelling site** dengan 6 rute publik utama. Strategi SEO-nya berpusat pada:

1. **Technical SEO solid** — metadata lengkap di setiap rute, `sitemap.xml` dinamis, `robots.txt`, `manifest.json`, kecepatan/CLS terjaga (Next.js sudah membantu).
2. **Structured data (JSON-LD)** kaya — `Organization`, `WebSite`, `TouristDestination`, `TouristAttraction`, `Article/BlogPosting`, `FAQPage`, `BreadcrumbList`, `ImageObject`, agar Google & AI (SGE, ChatGPT, Perplexity) paham konten.
3. **AI-friendly content** — heading terstruktur, FAQ eksplisit, fakta (koordinat, sejarah, tahun) tersedia secara terang, `llms.txt` untuk *LLM crawler*.
4. **Geo & local SEO** — fokus "Kepulauan Kei / Maluku Tenggara", markup destinasi wisata + koordinat.
5. **Shareability** — Open Graph + Twitter Card + *dynamic OG images* per halaman.
6. **Bahasa Indonesia** sebagai bahasa UI (sesuai AGENTS.md §1), namun `hreflang`/`locale` `id_ID`.

---

## 1. Inventaris Rute & Kanonik

| Rute | Judul (SEO) | Prioritas | ChangeFreq | Tipe Konten |
|------|-------------|-----------|------------|-------------|
| `/` | Simfoni Evav — Peradaban di Atas Pasir Putih | 1.0 | weekly | Landing / storytelling |
| `/eksplorasi` | Eksplorasi — Festival Pesona Meti Kei | 0.9 | weekly | Budaya + wisata alam |
| `/budaya` | Jiwa Kei — Budaya & Sejarah Kepulauan Kei | 0.9 | weekly | Sejarah adat |
| `/heritage` | Warisan — Jejak & Kedaulatan Evav | 0.9 | monthly | Sejarah tokoh |
| `/taste` | Taste — Kuliner & Cita Rasa Kepulauan Kei | 0.8 | monthly | Kuliner |
| `/interaction` | Keterhubungan — Mari Terhubung | 0.7 | monthly | Kontak / FAQ / Sosmed |
| `/admin/*` | *(noindex, disallow)* | — | — | CMS internal |

`SITE_URL = https://discoverevav.id` (sumber: `web/src/app/layout.tsx:23`).

---

## 2. Metadata Standar per Halaman (wajib)

Setiap `page.tsx` & `layout.tsx` wajib mengekspor `Metadata` dengan field minimal:

```ts
export const metadata: Metadata = {
  title: { default: "...", template: "%s | Simfoni Evav" },
  description: "...",                       // 150–160 char
  keywords: [...],                          // + keyword lokal
  alternates: { canonical: "/path" },
  openGraph: { title, description, url, siteName, locale: "id_ID", type, images },
  twitter: { card: "summary_large_image", title, description, images },
  robots: { index: true, follow: true },
};
```

### Aturan Judul & Deskripsi
- **Title**: 50–60 karakter, mengandung *primary keyword* di awal (`Kepulauan Kei`, `Wisata Kei`, `Maluku Tenggara`).
- **Description**: 150–160 karakter, *actionable*, mengandung *secondary keyword*.
- **Hindari duplikasi title/description** antar halaman (saat ini hampir semua halaman memakai `title.absolute` yang menyebabkan template `%s | Simfoni Evav` tidak berlaku — ubah ke `title: "..."` agar template terpakai & konsisten).

### Viewport & Theme Color (via `generateViewport`)
Tambahkan `export const viewport: Viewport` di root layout:
```ts
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#0b1020" },
  ],
};
```

---

## 3. Structured Data (JSON-LD) — Inti AI-Friendliness

### 3.1 Root Layout (`@graph`)
Sudah ada `Organization` + `WebSite` (layout.tsx:101). **Tambahkan**:
- `WebSite` + `SearchAction` (sitelinks search box):
  ```json
  {
    "@type": "WebSite",
    "potentialAction": {
      "@type": "SearchAction",
      "target": "https://discoverevav.id/eksplorasi?q={search_term_string}",
      "query-input": "required name=search_term_string"
    }
  }
  ```
- `TouristDestination` untuk Kepulauan Kei (geo, `containsPlace` destinasi unggulan).

### 3.2 Halaman Destinasi (`/eksplorasi`)
Setiap spot di `src/content/eksplorasi.ts` (ngurbloat, ngurtavur, hawang, bair, dll.) di-render sebagai `TouristAttraction` dengan `geo` (lat/lng), `description`, `image`, `address` (Kepulauan Kei, Maluku Tenggara). Data koordinat **sudah tersedia** di `spotAlam` — gunakan sebagai sumber tunggal (single source of truth).

### 3.3 Halaman FAQ (`/interaction`)
Karena ada `FaqAccordionSection`, tambahkan skema `FAQPage` (`@type: Question/Answer`) agar muncul *rich result* & mudah diambil LLM.

### 3.4 Halaman Artikel/Berita (CMS, future)
Gunakan `BlogPosting`/`Article` dengan `headline`, `image[]`, `datePublished`, `dateModified`, `author`, `publisher` (Organization).

### 3.5 BreadcrumbList
Untuk halaman dalam (eksplorasi, budaya, dst.) tambahkan `BreadcrumbList` agar *breadcrumb rich result*.

> **Catatan keamanan (AGENTS.md §5)**: JSON-LD di-generate dari data terpercaya/internal, bukan input user mentah. Hindari `dangerouslySetInnerHTML` dengan data tak terpercaya.

---

## 4. Sitemap Dinamis (`src/app/sitemap.ts`)

Perbaiki agar:
- Menyertakan **semua** rute publik (`/`, `/eksplorasi`, `/budaya`, `/heritage`, `/taste`, `/interaction`).
- Menambahkan `<priority>` & `<changefreq>` sesuai tabel §1.
- Mendukung **sitemap indeks** jika kelak ada ratusan URL (berita/UMKM) via `generateSitemaps`.
- Menambahkan `alternates.languages` jika ada i18n (saat ini hanya `id`).
- `lastModified` per-rute (bukan satu tanggal global) — idealnya dari data CMS.

Contoh target:
```ts
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: `${SITE_URL}/`, lastModified: new Date(), changeFrequency: "weekly", priority: 1 },
    { url: `${SITE_URL}/eksplorasi`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.9 },
    // ...
  ];
}
```

---

## 5. Robots & Crawl Control (`src/app/robots.ts`)

Sudah benar: `* allow /`, `disallow /admin/`, sitemap + host terdaftar. **Tambahkan**:
- `disallow: /private/` (sudah ada) + pastikan path CMS aman.
- ` Crawl-delay` tidak diperlukan.
- Pastikan `sitemap` absolut (`https://discoverevav.id/sitemap.xml`).

---

## 6. Web App Manifest & PWA-friendliness

Tambahkan `src/app/manifest.ts` (`MetadataRoute.Manifest`):
```ts
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Simfoni Evav — Discover Evav",
    short_name: "Simfoni Evav",
    description: "Peradaban di Atas Pasir Putih — Kepulauan Kei",
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#0b1020",
    icons: [{ src: "/icon.svg", sizes: "any", type: "image/svg+xml" }],
  };
}
```
Daftarkan di `metadata.manifest = "/manifest.webmanifest"`.

---

## 7. AI-Friendly: `llms.txt` & `llms-full.txt`

Buat `public/llms.txt` (konvensi *llmstxt.org*) agar crawler LLM (ChatGPT, Claude, Perplexity, Gemini) menemukan ringkasan & tautan penting:

```
# Simfoni Evav — Discover Evav

> Situs pariwisata Kepulauan Kei, Maluku Tenggara, Indonesia.

## Halaman Utama
- [Beranda](https://discoverevav.id/) — Peradaban di Atas Pasir Putih.
- [Eksplorasi](https://discoverevav.id/eksplorasi) — Festival Pesona Meti Kei & wisata alam.
- [Budaya](https://discoverevav.id/budaya) — Larvul Ngabal, Ain Ni Ain, tenun Elat.
- [Warisan](https://discoverevav.id/heritage) — Karel Sadsuitubun & Ratskap Manyeuw.
- [Taste](https://discoverevav.id/taste) — Kuliner Kei: Enbal, Colo-colo, sagu.

## Fakta Singkat
- Lokasi: Kepulauan Kei, Kabupaten Maluku Tenggara, Provinsi Maluku.
- Pantai Ngurbloat: pasir terhalus di Asia (National Geographic).
...
```

Tambahkan `<link rel="alternate" type="text/markdown" href="/llms.txt">` di layout.

---

## 8. Open Graph & Dynamic OG Images

- OG statis sudah ada (`/images/og/simfoni-evav-og.jpg`). **Tingkatkan**: buat *dynamic OG image* per halaman menggunakan `next/og` (`ImageResponse`) via file `opengraph-image.tsx` di tiap rute — menghasilkan gambar 1200×630 otomatis berbasis teks + brand.
- Pastikan `og:image`, `og:image:width`, `og:image:height`, `og:image:alt` lengkap.
- `twitter:card: summary_large_image` + `twitter:site` (handle `@discoverevav` jika ada).

---

## 9. Semantic HTML & Accessibility (SEO sinyal)

Sesuai AGENTS.md §9:
- Satu `<h1>` per halaman (hero), heading bertingkat `h2`→`h3` tanpa lompatan.
- `lang="id"` sudah ada di `<html>`.
- Alt teks pada semua `<Image>` (data `alt` sudah ada di `eksplorasi.ts`).
- Skip-link "Lompat ke konten utama" sudah ada.
- Struktur `<main id="main-content">` + landmark `header/nav/footer`.

---

## 10. Performance & Core Web Vitals

- `next/image` sudah digunakan — pastikan `priority` hanya di hero (AGENTS.md §7.3.1).
- Video hero di-render kondisional saat aktif (AGENTS.md §7.3.2) — bantu LCP.
- Skeleton loader untuk peta MapLibre (AGENTS.md §7.3.3) — cegah CLS.
- Font via `next/font` (Montserrat, Montaga, Ephesis) — zero layout shift.
- Hindari *render-blocking*; manfaatkan Server Components.

---

## 11. Local & Geo SEO

- Markup `TouristDestination` dengan `geo` (bounding box Kepulauan Kei ≈ lat -5.6, lng 132.7).
- `address`: `{ "@type": "PostalAddress", "addressRegion": "Maluku Tenggara", "addressCountry": "ID" }`.
- Daftarkan di Google Business Profile & Bing Places (opsional, di luar kode).
- `sameAs` ke media sosial (`instagram.com/discoverevav`) — sudah ada di Organization.

---

## 12. Analytics & Monitoring (opsional tapi disarankan)

- Google Search Console → submit `sitemap.xml`, pantau *index coverage*.
- Bing Webmaster Tools (untuk Copilot/AI).
- Schema.org validator & Rich Results Test.
- `Yandex`/`Baidu` bila target perluas.
- Jangan tambahkan skrip analytics tanpa persetujuan (AGENTS.md §6.8 *Unmanaged Dependencies*).

---

## 13. Keyword Bank (Bahasa Indonesia)

**Primary**: Kepulauan Kei, Wisata Kepulauan Kei, Maluku Tenggara, Pulau Kei, Discover Evav.
**Secondary**: Pantai Ngurbloat, Pasir Putih Kei, Festival Meti Kei, Larvul Ngabal, Ain Ni Ain, tenun ikat Elat, Pulau Bair, Goa Hawang, Ngurtavur, kuliner Kei, Enbal, Colo-colo, budaya Maluku, wisata bahari Maluku, surga tersembunyi Indonesia.
**Long-tail**: "pantai pasir terhalus di Asia", "festival adat Kepulauan Kei", "destinasi snorkeling Maluku Tenggara", "sejarah Karel Sadsuitubun Kei".

---

## 14. Checklist Implementasi (To-Do Agent)

- [ ] Perbaiki `title` halaman (gunakan template, bukan `absolute`) — konsisten `%s | Simfoni Evav`.
- [ ] Tambah `viewport` (themeColor) di root layout.
- [ ] Perluas JSON-LD: `SearchAction`, `TouristDestination`, `TouristAttraction` per spot.
- [ ] Tambah `FAQPage` JSON-LD di `/interaction`.
- [ ] Tambah `BreadcrumbList` di halaman dalam.
- [ ] Perluas `sitemap.ts` (semua rute + priority/changefreq).
- [ ] Buat `manifest.ts` + daftarkan di metadata.
- [ ] Buat `public/llms.txt` + link di layout.
- [ ] Buat dynamic `opengraph-image.tsx` per rute utama.
- [ ] Validasi Structured Data & Rich Results.

---

*Dokumen ini dibuat sebagai acuan SEO. Implementasi dilakukan oleh sub-agent terpisah; setiap penyimpangan dari dokumen wajib dicatat di `logs.md`.*
