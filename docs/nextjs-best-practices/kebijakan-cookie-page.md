# Best Practice Audit: /kebijakan-cookie (web/src/app/kebijakan-cookie/page.tsx)

## Ringkasan

Halaman `/kebijakan-cookie` (kebijakan cookie) diimplementasikan dengan sangat baik dan mengikuti konvensi inti Next.js 16 App Router. Halaman ini adalah **Server Component statis murni** (tidak ada `"use client"`), menggunakan Metadata API, mewarisi `metadataBase` serta `title.template` dari root layout, dan menyerahkan seluruh penataan gaya/struktur ke `LegalLayout` yang sudah aksesibel. Konten legal disajikan sebagai HTML semantik (`<article>`, `<h2>`, `<h3>`, `<table>`, `<ul>`) langsung di server sehingga langsung terindeks crawler.

**Rating: Baik / Strong** — **Skor: 92/100**

Dua kelemahan utama yang menyisakan pengurangan poin: (1) metadata page hanya berisi `title` dan `description` tanpa `alternates.canonical` eksplisit (meskipun warisan root memberikan `/`, ini tidak spesifik untuk route ini dan dapat menimbulkan duplikasi canonical pada halaman legal), dan (2) tidak ada Open Graph / Twitter Card khusus halaman sehingga pratinjau sosial menggunakan fallback root tanpa penyesuaian judul/deskripsi halaman ini. Selain itu, tabel pada baris 46 dan 72 kekurangan elemen `<caption>` dan atribut `scope` pada `<th>` untuk aksesibilitas penuh.

---

## Standar Next.js yang Direview

Laporan ini mengevaluasi kepatuhan halaman terhadap standar berikut (berdasarkan dokumentasi resmi Next.js 16 App Router, `nextjs.org/docs`, serta panduan SEO teknis untuk App Router):

1. **Server vs Client Components** — komponen halaman default Server Component; `"use client"` hanya untuk interaktivitas.
2. **Metadata API (SEO)** — `metadata`/`generateMetadata`, pewarisan layout, `metadataBase`, `title.template`, `alternates.canonical`, Open Graph, Twitter Card.
3. **Static vs Dynamic Rendering & Caching** — default SSG untuk halaman statis; hindari `force-dynamic` yang tidak perlu.
4. **Semantic HTML & Accessibility** — struktur heading, tabel yang aksesibel, kontras, navigasi keyboard.
5. **Data Fetching** — fetching di server; tidak ada pemanggilan rahasia di klien.
6. **next/link, next/image, next/font** — penggunaan yang benar.
7. **Route Segment Config & File Conventions** — `loading.tsx`/`error.tsx`/`sitemap.ts`/`robots.ts`.
8. **TypeScript Conventions** — `strict`, tipe eksplisit, alias `@/*`.
9. **Performance** — hindari Client Component berat dan bundle tidak perlu pada konten statis.

---

## Analisis Kepatuhan

| Standar | Status | Bukti (file:baris) |
|---|---|---|
| Server Component (tanpa `"use client"`) | ✅ | `page.tsx:1-10` — tidak ada direktif `"use client"`; komponen fungsi murni. |
| Metadata API (static `metadata` export) | ✅ | `page.tsx:4-8` — `export const metadata: Metadata`. |
| `metadataBase` & `title.template` warisan | ✅ | Root `layout.tsx:45-49` (`metadataBase`, `template: "%s \| Simfoni Evav"`); page `title: "Kebijakan Cookie"` otomatis menjadi "Kebijakan Cookie \| Simfoni Evav". |
| `alternates.canonical` spesifik halaman | ⚠️ | `page.tsx:4-8` tidak mendefinisikan `canonical`; hanya mewarisi `/` dari root `layout.tsx:71-73`. Tidak unik per halaman legal. |
| Open Graph / Twitter Card khusus halaman | ⚠️ | `page.tsx:4-8` tidak meng-override `openGraph`/`twitter`; menggunakan fallback root (judul/deskripsi/OG image generik). |
| Rendering statis (SSG) | ✅ | Tidak ada data dinamis/param; halaman statis murni, ter-prerender saat build. |
| Semantic HTML (`<article>`, heading, list) | ✅ | `LegalLayout.tsx:18` `<article>`; `page.tsx` menggunakan `<h2>`/`h3>`/`ul`/`li` berurutan. |
| Aksesibilitas tabel | ⚠️ | `page.tsx:46-65` & `72-100` — `<table>` tanpa `<caption>` dan `<th>` tanpa `scope="col"`. |
| `next/link` untuk navigasi internal | ✅ | `LegalLayout.tsx:23` — `<Link href="/" aria-label="Kembali ke beranda">`. |
| `next/font` (self-hosted) | ✅ | Root `layout.tsx:9-24` menggunakan `next/font/google` (Montserrat, Montaga, Ephesis) yang di-host mandiri. |
| `next/image` untuk gambar | ✅ | N/A — halaman ini tidak menampilkan gambar (`next/image` digunakan di bagian lain situs). |
| Data fetching di server | ✅ | N/A — tidak ada fetching (konten statis). Tidak ada secret di klien. |
| TypeScript strict & alias `@/*` | ✅ | `page.tsx:2` `import LegalLayout from "@/components/legal/LegalLayout"`; tipe `Metadata` eksplisit. |
| `sitemap.ts` mencakup halaman | ✅ | `sitemap.ts` ada di proyek (diperiksa); route `/kebijakan-cookie` publik dan dapat diindeks. |
| Skema JSON-LD terkait | ❌ | Tidak ada JSON-LD bertipe `WebPage`/`Article` spesifik untuk dokumen legal ini. |
| `loading.tsx` / `error.tsx` | N/A | Tidak diperlukan untuk halaman statis tanpa async data. |

---

## Temuan & Masalah

| # | Severity | File:Baris | Masalah |
|---|---|---|---|
| 1 | 🟡 Menengah | `page.tsx:4-8` | Metadata tidak menyertakan `alternates.canonical` eksplisit. Halaman legal mewarisi canonical `/` dari root layout, yang dapat menyebabkan beberapa halaman legal (cookie, privasi, syarat) dianggap memiliki canonical yang sama (beranda). Disarankan canonical absolut per halaman. |
| 2 | 🟡 Menengah | `page.tsx:4-8` | Tidak ada override `openGraph`/`twitter`. Saat dibagikan di media sosial, pratinjau menggunakan judul/deskripsi/OG image root, bukan judul "Kebijakan Cookie". |
| 3 | 🟡 Rendah | `page.tsx:46-65`, `72-100` | Tabel kehilangan `<caption>` dan atribut `scope="col"` pada `<th>`, mengurangi aksesibilitas pembaca layar. |
| 4 | 🟢 Rendah | `page.tsx` (seluruh) | Tidak ada JSON-LD bertipe `WebPage`/`Article` untuk dokumen legal; peluang SEO terstruktur yang terlewat (opsional namun direkomendasikan untuk halaman hukum penting). |
| 5 | 🟢 Info | `page.tsx:18`, `236` | Penggunaan `<a href="https://...">` dan `mailto:` sudah benar untuk tautan eksternal (bukan internal), sehingga `next/link` memang tidak diperlukan di sini — ini sudah tepat. |

Catatan: Tidak ditemukan pelanggaran kritis. Halaman **tidak** menggunakan `"use client"` yang tidak perlu, tidak melakukan fetching di klien, dan tidak memuat bundle berat — sangat sesuai untuk halaman legal statis.

---

## Rekomendasi Perbaikan

### 1. Tambahkan `alternates.canonical` eksplisit (Severity 🟡)
Hindari kanonisasi salah ke beranda dengan mendeklarasikan canonical absolut per halaman. Karena `metadataBase` sudah di-set di root (`https://discoverevav.id`), cukup gunakan path relatif.

```tsx
// web/src/app/kebijakan-cookie/page.tsx
export const metadata: Metadata = {
  title: "Kebijakan Cookie",
  description:
    "Kebijakan Cookie Simfoni Evav — teknologi penyimpanan lokal dan layanan pihak ketiga yang benar-benar digunakan situs ini.",
  alternates: {
    canonical: "/kebijakan-cookie",
  },
};
```

### 2. Tambahkan Open Graph & Twitter Card khusus halaman (Severity 🟡)
Agar pratinjau sosial merefleksikan judul halaman ini (warna/preferensi merah muda `primary-pink` tidak relevan di sini; fokus pada SEO):

```tsx
export const metadata: Metadata = {
  title: "Kebijakan Cookie",
  description:
    "Kebijakan Cookie Simfoni Evav — teknologi penyimpanan lokal dan layanan pihak ketiga yang benar-benar digunakan situs ini.",
  alternates: { canonical: "/kebijakan-cookie" },
  openGraph: {
    title: "Kebijakan Cookie | Simfoni Evav",
    description:
      "Penjelasan jujur teknologi penyimpanan lokal dan layanan pihak ketiga yang digunakan situs pariwisata Kepulauan Kei.",
    url: "/kebijakan-cookie",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Kebijakan Cookie | Simfoni Evav",
    description:
      "Penjelasan jujur teknologi penyimpanan lokal dan layanan pihak ketiga yang digunakan situs.",
  },
};
```

> Catatan: `openGraph.images` dapat diwariskan dari root (OG image default). Jika ingin konsisten, biarkan field `images` tidak diisi agar fallback root dipakai, atau set eksplisit.

### 3. Perbaiki aksesibilitas tabel (Severity 🟡)
Tambahkan `<caption>` dan `scope` pada header:

```tsx
<table>
  <caption className="sr-only">
    Daftar cookie/storage penting dan teknis yang digunakan situs
  </caption>
  <thead>
    <tr>
      <th scope="col">Nama</th>
      <th scope="col">Jenis</th>
      <th scope="col">Fungsi</th>
      <th scope="col">Durasi</th>
    </tr>
  </thead>
  {/* ... */}
</table>
```

Lakukan hal yang sama untuk tabel kedua (`page.tsx:72`).

### 4. (Opsional) Tambahkan JSON-LD `WebPage` (Severity 🟢)
Sisipkan skema terstruktur di bagian bawah halaman (Server Component, aman):

```tsx
<script
  type="application/ld+json"
  dangerouslySetInnerHTML={{
    __html: JSON.stringify({
      "@context": "https://schema.org",
      "@type": "WebPage",
      name: "Kebijakan Cookie",
      url: "https://discoverevav.id/kebijakan-cookie",
      inLanguage: "id-ID",
      publisher: { "@id": "https://discoverevav.id/#organization" },
    }),
  }}
/>
```

### 5. Konsistensi lintas halaman legal
Terapkan pola `canonical` + `openGraph` + `twitter` yang sama ke `kebijakan-privasi/page.tsx`, `syarat-ketentuan/page.tsx`, dan `disclaimer/page.tsx` agar seluruh dokumen legal memiliki metadata kanonik yang unik (saat ini keempatnya hanya mendeklarasikan `title`/`description`).

---

## Referensi

- Next.js — Metadata API (generateMetadata): https://nextjs.org/docs/app/api-reference/functions/generate-metadata
- Next.js — Adding Metadata (App Router): https://nextjs.org/learn/dashboard-app/adding-metadata
- Next.js — Metadata File Conventions (sitemap.ts, robots.ts): https://nextjs.org/docs/app/api-reference/file-conventions/metadata
- Next.js — Optimizing Fonts (next/font): https://nextjs.org/docs/app/building-your-application/optimizing/fonts
- Next.js — Linking and Navigating (next/link): https://nextjs.org/docs/app/building-your-application/routing/linking-and-navigating
- Varnox — Next.js App Router SEO Checklist (2026): https://varnox.io/blog/nextjs-seo-app-router-checklist
- Jardine Studio — Technical SEO for Next.js App Router: https://jardinestudio.com/journal/technical-seo-for-nextjs
- ECOSIRE — Next.js 16 App Router: Production Patterns and Pitfalls: https://ecosire.com/blog/nextjs-16-app-router-production
- MDN — HTML table basics & accessibility (scope/caption): https://developer.mozilla.org/en-US/docs/Learn/HTML/Tables/Advanced
