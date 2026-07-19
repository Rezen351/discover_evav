# Best Practice Audit: /syarat-ketentuan (web/src/app/syarat-ketentuan/page.tsx)

> Auditor: Next.js Expert Audit · Target: Next.js 16.2.6 (App Router), React 19.2.4, TypeScript 5
> File utama: `web/src/app/syarat-ketentuan/page.tsx` (294 baris)
> Dependensi terkait: `web/src/components/legal/LegalLayout.tsx`, `web/src/app/layout.tsx`, `web/src/app/globals.css` (`.legal-prose`)

---

## Ringkasan

Halaman **Syarat & Ketentuan** adalah halaman legal statis yang, secara keseluruhan, **sudah sangat sesuai** dengan praktik terbaik Next.js 16 App Router untuk halaman konten statis. Halaman ini adalah **Server Component murni** (tidak ada `"use client"`), menggunakan **Metadata API** dengan benar (`export const metadata`), memanfaatkan **template judul** dari root layout, dan menyajikan konten dengan **HTML semantik** (`<h2>`, `<p>`, `<ul>`, `<li>`, `<em>`, `<strong>`, `<code>`). Karena tidak ada API dinamis (`cookies()`, `headers()`, `searchParams`) maupun fetch data, halaman ini **otomatis dirender statis (SSG)** pada waktu build — sasaran ideal untuk halaman legal.

Kelemahan yang ditemukan bersifat **minor** dan sebagian besar berhubungan dengan SEO tambahan (`canonical` per-halaman), maintainability (konten legal di-hardcode dalam JSX alih-alih data terpisah), aksesibilitas struktur heading (`<h2>` tanpa `<h1>` di file page — namun `<h1>` dipasok oleh `LegalLayout`, jadi ini valid), serta konsistensi tanggal (`lastUpdated` di-hardcode sebagai string).

| Aspek | Nilai |
| --- | --- |
| **Rating** | **Sangat Baik (Excellent)** |
| **Skor** | **92 / 100** |
| Server Component (tanpa `use client` sia-sia) | ✅ Sangat baik |
| Static rendering (SSG) | ✅ Otomatis statis |
| Metadata / SEO | ⚠️ Baik, kurang `canonical` per-halaman |
| HTML semantik & aksesibilitas | ✅ Baik |
| TypeScript & konvensi App Router | ✅ Baik |

---

## Standar Next.js yang Direview

Standar berikut diambil dari dokumentasi resmi Next.js (App Router) dan praktik produksi Next.js 16 (2026), difokuskan pada karakteristik halaman **legal/statis**:

1. **Server vs Client Components** — Setiap komponen di `app/` adalah Server Component secara default. `"use client"` hanya ditambahkan bila butuh state/efek/event handler/browser API. Untuk halaman legal statis, TIDAK boleh ada `"use client"`.
2. **Static vs Dynamic Rendering & Caching** — Route dirender statis di build time kecuali memakai sinyal dinamis (`cookies()`, `headers()`, `searchParams`, atau data tak-tercache). Halaman legal harus tetap statis.
3. **Metadata API untuk SEO** — Gunakan `export const metadata` atau `generateMetadata()` alih-alih tag `<head>` manual. Sediakan `title`, `description`, dan idealnya `alternates.canonical` + `openGraph`.
4. **Konvensi App Router** — `page.tsx` sebagai entry route; `default export` komponen; `layout.tsx`, `loading.tsx`, `error.tsx` di segmen yang tepat.
5. **HTML Semantik & Aksesibilitas** — Struktur heading berurut (`<h1>` → `<h2>`), landmark (`<article>`, `<header>`, `<main>`, `<footer>`), teks tautan bermakna, `lang` yang benar.
6. **next/link, next/image, next/font** — Navigasi internal via `next/link`; gambar via `next/image`; font via `next/font`.
7. **TypeScript** — Tipe `Metadata`, props bertipe, tanpa `any`.
8. **Performance** — Minimalkan JS ke klien; hindari komponen klien yang tidak perlu; halaman statis = TTFB & FCP optimal.
9. **loading.tsx / error.tsx / Suspense** — Untuk halaman statis tanpa data async, tidak wajib, tapi `error.tsx` di root/segmen tetap baik untuk resiliensi.

---

## Analisis Kepatuhan

| Standar | Status | Bukti (file + baris) |
| --- | --- | --- |
| Server Component (tanpa `"use client"` sia-sia) | ✅ | `page.tsx` tidak memuat `"use client"`; hanya impor `Metadata` (tipe) & `LegalLayout` (baris 1-2). `LegalLayout.tsx` juga Server Component (baris 1-2 hanya impor `next/link` + tipe `ReactNode`). Ini pola komposisi yang benar. |
| Static rendering (SSG) | ✅ | Tidak ada `cookies()`, `headers()`, `searchParams`, `fetch`, atau `dynamic`/`revalidate`. Konten sepenuhnya statis (baris 10-294) → dirender statis otomatis di build time. Ideal untuk halaman legal. |
| Metadata API (title & description) | ✅ | `export const metadata: Metadata` (baris 4-8) dengan `title: "Syarat & Ketentuan"` dan `description` deskriptif berbahasa Indonesia. Bertipe `Metadata` (baris 1). |
| Title template | ✅ | Root layout mendefinisikan `template: "%s \| Simfoni Evav"` (`layout.tsx` baris 48), sehingga judul akhir menjadi "Syarat & Ketentuan \| Simfoni Evav" tanpa duplikasi manual. |
| `alternates.canonical` per-halaman | ⚠️ | `page.tsx` metadata (baris 4-8) tidak menyetel `alternates.canonical`. Root layout menyetel `canonical: "/"` (`layout.tsx` baris 71-73) yang TIDAK diwarisi sebagai canonical per-path yang benar; halaman ini idealnya `canonical: "/syarat-ketentuan"`. |
| OpenGraph/Twitter per-halaman | ⚠️/N/A | Tidak ada OG/Twitter khusus di page (baris 4-8); mewarisi default OG dari root layout (`layout.tsx` baris 74-90). Dapat diterima untuk halaman legal, namun `openGraph.title` spesifik akan lebih rapi. |
| Konvensi App Router (`page.tsx`, default export) | ✅ | `export default function TermsOfServicePage()` (baris 10). Lokasi & penamaan segmen `syarat-ketentuan/page.tsx` benar. |
| HTML semantik | ✅ | `LegalLayout` memakai `<article>` (baris 18), `<header>` (baris 32), `<h1>` (baris 36), `<footer>` (baris 56); page memakai `<h2>`, `<p>`, `<ul>`, `<li>`, `<em>`, `<strong>`, `<code>` konsisten. Root membungkus `<main id="main-content">` (`layout.tsx` baris 197). |
| Hirarki heading (`h1` → `h2`) | ✅ | `<h1>` dari `LegalLayout` (baris 36) + `<h2>` bagian 1-10 di page (baris 17, 39, 81, …, 284). Urut & tidak melompat. |
| Escaping entitas & tanda kutip | ✅ | Konsisten memakai `&ldquo;`, `&rdquo;`, `&amp;`, `{" "}` untuk menjaga spasi (mis. baris 21, 28-29, 84, 95). Menghindari error `react/no-unescaped-entities`. |
| `next/link` untuk navigasi internal | ✅ | `LegalLayout` memakai `<Link href="/">` (baris 23-30) dengan `aria-label` (baris 26). |
| `next/font` | ✅ | Font dimuat via `next/font/google` di root (`layout.tsx` baris 2, 9-24) dan dipakai lewat CSS var (`--font-sans/serif`). |
| `next/image` | N/A | Halaman legal tidak memuat gambar → tidak relevan. |
| Aksesibilitas tautan `mailto` | ✅ | `<a href="mailto:hukum@discoverevav.id">` (baris 290) dengan teks bermakna (bukan "klik di sini"). |
| `lang` benar | ✅ | `<html lang="id">` (`layout.tsx` baris 179), sesuai konten Indonesia. |
| TypeScript (tanpa `any`, tipe eksplisit) | ✅ | `Metadata` (baris 1), props `LegalLayoutProps` bertipe (`LegalLayout.tsx` baris 4-9). Tidak ada `any`. |
| Performance (JS klien minimal) | ✅ | Page + `LegalLayout` = 0 KB JS klien (keduanya Server Component). Satu-satunya JS klien berasal dari `AppShell` root (`layout.tsx` baris 196), bukan dari halaman ini. |
| `loading.tsx` / `error.tsx` / Suspense | N/A/⚠️ | Tidak ada data async → `loading.tsx` tak diperlukan. Segmen `syarat-ketentuan/` tidak punya `error.tsx` (hanya `page.tsx`), tapi ini opsional untuk konten statis. |
| Maintainability konten legal | ⚠️ | Seluruh isi klausul di-hardcode dalam JSX (baris 17-291) dan `lastUpdated="19 Juli 2026"` string manual (baris 15). Menyulitkan pembaruan & konsistensi antar halaman legal. |

---

## Temuan & Masalah

### 1. [LOW · SEO] Tidak ada `alternates.canonical` per-halaman
- **Lokasi:** `web/src/app/syarat-ketentuan/page.tsx` baris 4-8
- **Masalah:** Metadata halaman tidak menyetel canonical URL. Root layout menetapkan `canonical: "/"` (`web/src/app/layout.tsx` baris 71-73). Metadata App Router memang bersifat merge/override per segmen, tetapi karena page tidak meng-override `alternates`, canonical yang efektif bisa menunjuk ke `/` (root) atau tidak spesifik ke `/syarat-ketentuan`. Ini berisiko sinyal canonical yang salah bagi mesin pencari.
- **Dampak:** Kecil, namun untuk halaman legal yang di-index sebaiknya canonical tepat.

### 2. [LOW · SEO] Tidak ada OpenGraph/Twitter spesifik halaman
- **Lokasi:** `web/src/app/syarat-ketentuan/page.tsx` baris 4-8
- **Masalah:** Halaman mewarisi OG/Twitter global (`layout.tsx` baris 74-90) yang berjudul "Simfoni Evav — Peradaban di Atas Pasir Putih". Saat halaman T&C dibagikan, judul preview tidak mencerminkan konten halaman.
- **Dampak:** Kecil; wajar untuk halaman legal, tetapi `openGraph.title` khusus meningkatkan kualitas share.

### 3. [LOW · Maintainability] Konten legal & tanggal berlaku di-hardcode dalam JSX
- **Lokasi:** `web/src/app/syarat-ketentuan/page.tsx` baris 15 (`lastUpdated="19 Juli 2026"`) dan baris 17-291 (seluruh klausul).
- **Masalah:** Teks legal panjang ditulis langsung sebagai markup. Pembaruan klausul membutuhkan edit JSX; risiko inkonsistensi tanggal antar halaman legal (`kebijakan-privasi`, dsb.). Tanggal berupa string bebas, bukan tanggal terstruktur (`<time dateTime="...">`).
- **Dampak:** Kecil untuk runtime, tetapi menurunkan maintainability & konsistensi.

### 4. [INFO · A11y] Tanggal berlaku tidak memakai elemen `<time>`
- **Lokasi:** `web/src/components/legal/LegalLayout.tsx` baris 47-51 ("Berlaku sejak {lastUpdated}").
- **Masalah:** Tanggal ditampilkan sebagai teks biasa di dalam `<p>`, tanpa `<time dateTime="2026-07-19">`. Elemen `<time>` memberi semantik machine-readable (baik untuk SEO & aksesibilitas).
- **Dampak:** Sangat kecil (peningkatan kualitas).

### 5. [INFO · Resiliensi] Tidak ada `error.tsx` di segmen legal
- **Lokasi:** direktori `web/src/app/syarat-ketentuan/` (hanya berisi `page.tsx`).
- **Masalah:** Tidak ada error boundary khusus segmen. Untuk halaman statis murni risikonya minim (tidak ada fetch yang bisa gagal), sehingga ini opsional.
- **Dampak:** Dapat diabaikan; hanya catatan resiliensi.

> Catatan positif penting: Tidak ditemukan `"use client"` yang tidak perlu, tidak ada penggunaan API dinamis yang membuat halaman jatuh ke dynamic rendering, tidak ada `any`, dan tidak ada tag `<head>` manual. Ini adalah pelanggaran-yang-TIDAK-terjadi — hal terbaik yang bisa dicapai untuk halaman legal.

---

## Rekomendasi Perbaikan

### R1. Tambahkan `canonical` (dan opsional OG) spesifik halaman — memperbaiki Temuan #1 & #2
Karena `metadataBase` sudah diset di root (`layout.tsx` baris 45), cukup gunakan path relatif untuk canonical.

```tsx
// web/src/app/syarat-ketentuan/page.tsx (baris 4-8)
export const metadata: Metadata = {
  title: "Syarat & Ketentuan",
  description:
    "Syarat & Ketentuan Simfoni Evav — aturan penggunaan situs promosi pariwisata Kepulauan Kei.",
  alternates: {
    canonical: "/syarat-ketentuan",
  },
  openGraph: {
    title: "Syarat & Ketentuan | Simfoni Evav",
    description:
      "Aturan penggunaan situs promosi pariwisata budaya dan alam Kepulauan Kei.",
    url: "/syarat-ketentuan",
    type: "article",
  },
};
```

### R2. Jadikan tanggal berlaku semantik dengan `<time>` — memperbaiki Temuan #4
Ubah `LegalLayout` agar menerima tanggal ISO opsional dan me-render `<time>`.

```tsx
// web/src/components/legal/LegalLayout.tsx
type LegalLayoutProps = {
  title: string;
  subtitle?: string;
  lastUpdated?: string;      // label tampil, mis. "19 Juli 2026"
  lastUpdatedISO?: string;   // machine-readable, mis. "2026-07-19"
  children: ReactNode;
};

// ...
{lastUpdated && (
  <p className="mt-4 text-xs tracking-wide text-[var(--color-text-grey)]">
    Berlaku sejak{" "}
    <time dateTime={lastUpdatedISO ?? undefined}>{lastUpdated}</time>
  </p>
)}
```

```tsx
// web/src/app/syarat-ketentuan/page.tsx (baris 12-16)
<LegalLayout
  title="Syarat & Ketentuan"
  subtitle="Aturan penggunaan situs promosi pariwisata budaya dan alam Kepulauan Kei. Dengan mengakses situs ini, Anda dianggap menyetujui ketentuan berikut."
  lastUpdated="19 Juli 2026"
  lastUpdatedISO="2026-07-19"
>
```

### R3. (Opsional) Deklarasikan rendering statis secara eksplisit
Halaman ini SUDAH statis otomatis. Menambahkan segment config berikut hanya untuk mendokumentasikan intent (dan mencegah regresi bila kelak seseorang menambah API dinamis). Aman untuk halaman legal:

```tsx
// web/src/app/syarat-ketentuan/page.tsx (di atas komponen)
export const dynamic = "force-static";
// (opsional) segarkan berkala jika konten legal bisa berubah dari sumber eksternal:
// export const revalidate = false; // default: cache selamanya untuk statis
```

> Catatan: jangan tambahkan ini jika Anda ingin membiarkan default Next.js — halaman tetap statis tanpa config. Gunakan hanya sebagai penegasan intent.

### R4. (Opsional · Maintainability) Pisahkan konten legal ke modul data — memperbaiki Temuan #3
Untuk skala jangka panjang, pindahkan klausul ke struktur data (mis. `web/src/content/legal/syarat-ketentuan.ts`) berisi array `{ heading, body }`, lalu render melalui komponen. Ini menyeragamkan format antar halaman legal (`kebijakan-privasi`, `kebijakan-cookie`) dan memusatkan pembaruan tanggal/versi. Untuk konten murni statis seperti ini, tetap render sebagai Server Component (JANGAN gunakan `dangerouslySetInnerHTML` kecuali sumbernya tepercaya). Ini peningkatan opsional, bukan keharusan.

### R5. (Opsional) Tambahkan `error.tsx` di root App (bukan wajib per-segmen)
Karena halaman ini statis, error boundary per-segmen tidak diperlukan. Cukup pastikan ada `web/src/app/error.tsx` + `web/src/app/global-error.tsx` global untuk resiliensi seluruh aplikasi (di luar cakupan halaman ini).

---

## Referensi

- Next.js Docs — Server and Client Components: https://nextjs.org/docs/app/getting-started/server-and-client-components
- Next.js Docs — Metadata API & SEO: https://nextjs.org/docs/app/getting-started/metadata-and-og-images
- Next.js Docs — Rendering: Static & Dynamic (Partial Prerendering): https://nextjs.org/docs/app/getting-started/partial-prerendering
- Next.js Docs — Route Segment Config (`dynamic`, `revalidate`): https://nextjs.org/docs/app/api-reference/file-conventions/route-segment-config
- Next.js Docs — `generateMetadata` / `alternates.canonical`: https://nextjs.org/docs/app/api-reference/functions/generate-metadata
- Next.js Docs — Linking and Navigating (`next/link`): https://nextjs.org/docs/app/getting-started/linking-and-navigating
- Next.js Docs — Fonts (`next/font`): https://nextjs.org/docs/app/getting-started/fonts
- "Next.js 16 App Router in Production: Patterns, Pitfalls & Monorepo Design" (2026): https://ecosire.com/blog/nextjs-16-app-router-production
- "Next.js App Router Best Practices for Production (2026)" — ZTABS: https://ztabs.co/blog/nextjs-app-router-best-practices
- "Next.js App Router Best Practices in 2026" — TheKitBase: https://thekitbase.app/blog/nextjs-app-router-best-practices-2026
- "Next.js: The App Router in Production (2026)" — Jose Nobile: https://josenobile.co/guides/nextjs/
- MDN — `<time>` element: https://developer.mozilla.org/en-US/docs/Web/HTML/Element/time
