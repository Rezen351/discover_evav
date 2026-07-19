# Best Practice Audit: `/` (web/src/app/page.tsx)

> **Halaman审计** — Laporan hasil audit kesesuaian `page.tsx` (rute `/`, beranda/landing page "Simfoni Evav") terhadap standar pengembangan Next.js 16 App Router.

---

## Ringkasan

Halaman beranda ini merupakan **Server Component** yang sangat tipis: ia hanya mendeklarasikan `metadata` statis dan menyusun 10 komponen section turunan. Seluruh logika interaktif (GSAP, Swiper, MapLibre, form, autoplay) berada di komponen `"use client"` masing-masing, sehingga batas Server/Client sudah dipisahkan dengan benar dan `page.tsx` sendiri mengirim JavaScript klien mendekati nol.

Namun, karena `page.tsx` tidak melakukan *data fetching* (semua konten bersifat statis/hardcoded di dalam komponen klien), halaman ini **sepenuhnya statis** dan tidak memanfaatkan kemampuan utama App Router (async Server Components, caching, streaming). Selain itu terdapat sejumlah pelanggaran konkret pada komponen yang dibenamkan: penggunaan `<img>` mentah (bukan `next/image`) di beberapa tempat, `key` yang berubah tiap render memicu *remount* peta/animasi, bug keyboard (`e.key === "ArrowRightIcon"` yang tak akan pernah cocok), dan ketiadaan `loading.tsx`/`error.tsx` di segment rute.

**Rating keseluruhan: Cukup (Perlu Perbaikan)**
**Skor: 68 / 100**

---

## Standar Next.js yang Direview

Berikut standar Next.js 16 (App Router) yang dijadikan rujukan, diambil dari dokumentasi resmi (`nextjs.org/docs`, versi 16.2.x):

- **Server vs Client Components** — Secara default `layout`/`page` adalah Server Component; hanya tandai `"use client"` pada komponen yang butuh interaktivitas/state/browser API agar bundle klien tetap kecil. (docs: *Server and Client Components*)
- **Data Fetching di Server Component** — Gunakan `async function` + `await fetch(...)` (atau ORM) di Server Component; `fetch` tidak di-cache secara default dan akan memblokir render — bungkus dengan `<Suspense>` atau `use cache` bila lambat. (docs: *Fetching Data*)
- **Parallel vs Sequential fetching** — Inisiasi beberapa `fetch` serentak lalu `await Promise.all(...)` untuk menghindari *waterfall*. (docs: *Fetching Data*)
- **Metadata API** — Ekspor objek `metadata`/`generateMetadata` (hanya di Server Component) untuk SEO; dukung `openGraph`, `twitter`, `alternates.canonical`, `robots`. (docs: *Metadata and OG images*)
- **next/image** — Selalu gunakan komponen `Image` (bukan `<img>`) untuk optimasi otomatis; wajib `alt`, `sizes`, dan `priority` hanya untuk gambar *above-the-fold*. (docs: *Optimizing Images*)
- **next/font** — Gunakan `next/font/google` (bukan `<link>`/CDN) agar font di-host lokal & tanpa CLS. (docs: *Optimizing Fonts*)
- **next/link** — Gunakan `next/link` untuk navigasi internal, bukan `<a href>`. (docs: *Linking and Navigating*)
- **Loading UI & Error** — Sediakan `loading.tsx` (Suspense per-segment) dan `error.tsx` (batas penanganan kesalahan). (docs: *File Conventions*)
- **Suspense & Streaming** — Pecah halaman jadi *chunk* dan *stream* konten lambat dengan `<Suspense>`/skeleton. (docs: *Streaming*)
- **Route Segment Config & Rendering** — Pahami `static` vs `dynamic` rendering, `dynamicParams`, `revalidate`, dan `unstable_instant` untuk navigasi instan. (docs: *Route Segment Config*)
- **Aksesibilitas & Semantic HTML** — Elemen interaktif butuh `aria-label`, tautan *skip-to-content*, `prefers-reduced-motion` dihargai, `lang` yang benar. (docs: *Accessibility*)
- **Performance & Dynamic Imports** — Kurangi bundle klien; gunakan `next/dynamic` untuk komponen berat (peta, carousel) bila perlu guna *code-splitting*. (docs: *Lazy Loading / `next/dynamic`*)
- **TypeScript Conventions** — `strict: true`, hindari `any`, gunakan `type`/`interface` eksplisit untuk props & data. (docs: *TypeScript*)
- **File/Folder Conventions** — `app/`, `layout.tsx`, `page.tsx`, `loading.tsx`, `error.tsx`, `metadata`-export, alias `@/*`. (docs: *Project Structure*)

---

## Analisis Kepatuhan

| Standar | Status | Bukti (file:baris / snippet) |
|---|---|---|
| Server vs Client Components | ✅ Patuh | `page.tsx:1-46` tidak punya `"use client"`; semua state/efek ada di komponen anak (`"use client"` di `HeroSection.tsx:1`, dll.). |
| Data Fetching (Server) | ⚠️ Sebagian | `page.tsx` tidak mem-fetch apa pun. Konten (destinasi, berita, UMKM) **hardcoded** di komponen klien (`BeritaUmkmSection.tsx:38-228`, `DestinasiTerbaikSection.tsx:37-247`). Potensi *waterfall*/duplikasi tidak relevan karena tidak ada fetch. |
| Parallel/Serial Fetching | N/A | Tidak ada `fetch` di rute ini. |
| Metadata API | ✅ Patuh | `page.tsx:14-28` mengekspor `metadata` dengan `title`, `description`, `alternates.canonical`, `openGraph`. Diperkuat `layout.tsx:44-107` (`metadataBase`, `twitter`, `robots`). |
| next/image | ❌ Tidak Patuh | `FunFactSection.tsx:361,419` dan `Footer.tsx:156` menggunakan `<img>` mentah (bukan `next/image`), membatalkan optimasi. `AGENTS.md §7.3` & Next.js melarang ini. |
| next/font | ✅ Patuh | `layout.tsx:9-24` memakai `Montserrat`, `Montaga`, `Ephesis` via `next/font/google`, divariasikan ke `--font-sans/serif/cursive`. |
| next/link | ⚠️ Sebagian | Navigasi internal mayoritas pakai `next/link` (`Navbar.tsx:135`), tapi banyak `<a href="/news">`, `<a href="/taste">`, `<a href="/kebijakan-privasi">` di `BeritaUmkmSection.tsx:344,410,582` & `Footer.tsx:205-235`. |
| Loading UI (`loading.tsx`) | ❌ Tidak Patuh | Tidak ada `src/app/loading.tsx`. Halaman mengandalkan `AppShell.tsx` (client overlay) sebagai loading screen — bukan mekanisme Suspense Next.js. |
| Error UI (`error.tsx`) | ❌ Tidak Patuh | Tidak ada `src/app/error.tsx` untuk batas penanganan kesalahan rute. |
| Suspense & Streaming | ❌ Tidak Patuh | Tidak ada `<Suspense>` di `page.tsx`; halaman statis tanpa streaming. `AppShell` memakai `setTimeout` + `LoadingScreen` (implikasi *blocking* render, bukan stream). |
| Route Segment Config | ⚠️ Sebagian | Tidak ada `export const dynamic`/`revalidate`. Karena tanpa fetch, rute **statically prerendered** (wajar), tapi tidak ada deklarasi eksplisit. Catatan: `next.config.ts` punya `allowedDevOrigins` (ok) namun tidak ada `unstable_instant`. |
| Accessibility & Semantic HTML | ⚠️ Sebagian | `skip-link` ada (`layout.tsx:189-195`); `prefers-reduced-motion` dihormati di banyak section; tapi `HeroSection.tsx:207` pakai `onClick` di `<section>` tanpa `role`/`tabIndex`, dan `JourneyMapSection` tidak punya fallback teks peta. |
| Performance / Dynamic Imports | ⚠️ Sebagian | Peta MapLibre & Swiper selalu di-bundle ke rute beranda. Tidak ada `next/dynamic` untuk menunda peta berat hingga terlihat. (lihat `JourneyMapSection.tsx:1,8`) |
| TypeScript Conventions | ✅ Patuh | `strict` diaktifkan; komponen pakai `type`/`interface` eksplisit (`FunFactSection.tsx:25-32`, `DestinasiTerbaikSection.tsx:19-27`). Tidak ada `any` yang terlihat. |
| File/Folder Conventions | ✅ Patuh | Struktur `app/`, `layout.tsx`, `page.tsx`, `robots.ts`, `sitemap.ts`, `opengraph-image.tsx`, alias `@/*` (`tsconfig`) dipatuhi. |

---

## Temuan & Masalah

### Temuan 1 — Penggunaan `<img>` mentah melanggar standar `next/image`
- **Severity: Medium**
- **Lokasi:** `web/src/components/FunFactSection.tsx:360-366` (matahari `MAatahari.svg`), `FunFactSection.tsx:418-423` (kapal `Kapal.svg`), `web/src/components/Footer.tsx:156` (logo `Logo White.svg`).
- **Penjelasan:** Ketiga tempat memakai elemen `<img>` HTML standar (dengan komentar `eslint-disable-next-line @next/next/no-img-element`). Ini membatalkan optimasi gambar Next.js (resize, format modern, lazy-load, prevent CLS) dan melanggar panduan resmi sekaligus `AGENTS.md §7.2` ("Selalu gunakan `next/image`"). Untuk SVG dekoratif, sebaiknya diimpor sebagai komponen (mis. `import Sun from "@/public/MAatahari.svg"`) atau dibiarkan `<img>` **hanya** bila SVG memang tidak didukung — tapi logo `Footer.tsx:156` sebaiknya pakai `next/image` seperti `Navbar.tsx:136`.

### Temuan 2 — Bug keyboard: `e.key === "ArrowRightIcon"` tidak akan pernah cocok
- **Severity: High** (bug fungsional)
- **Lokasi:** `web/src/components/DestinasiTerbaikSection.tsx:321`
  ```ts
  if (e.key === "ArrowRightIcon") {   // SALAH: e.key mengembalikan "ArrowRight", bukan nama komponen
    goToDest((activeDest + 1) % totalItems);
  }
  ```
- **Penjelasan:** `KeyboardEvent.key` mengembalikan string seperti `"ArrowRight"` / `"ArrowLeft"`, bukan nama ikon `"ArrowRightIcon"`. Akibatnya logika navigasi panah di section Destinasi **sama sekali tidak berfungsi**. Ini juga masalah aksesibilitas (pengguna keyboard tidak bisa mengganti destinasi lewat panah).

### Temuan 3 — `key` dinamis memicu remount berat pada peta & animasi
- **Severity: Medium**
- **Lokasi:** `JourneyMapSection.tsx:421-422` (`key={activeLoc.id}` pada `<Image>` di dalam card), `DestinasiTerbaikSection.tsx:411` (`key={`main-${activeDestTab}-${activeDest}`}`), `BeritaUmkmSection.tsx` tidak, tapi pola sama di banyak section.
- **Penjelasan:** Mengubah `key` pada elemen di dalam subtree berat (terutama gambar di dalam card peta MapLibre) memaksa React **membongkar & memasang ulang** subtree tersebut tiap kali state berubah. Untuk peta, ini berisiko memutus instance MapLibre / memicu Layout Shift. Lebih baik biarkan `key` stabil dan andalkan properti `src`/`alt` yang berubah (Next.js `Image` sudah menangani *swap* gambar tanpa remount).

### Temuan 4 — Tidak ada `loading.tsx` / `error.tsx` di segment beranda
- **Severity: Medium**
- **Lokasi:** `web/src/app/` (tidak ada `loading.tsx` maupun `error.tsx`). Loading screen ditangani oleh `AppShell.tsx` (client `setTimeout` + `LoadingScreen`).
- **Penjelasan:** Pendekatan `AppShell` menunda penampilan konten dengan `setTimeout` (lihat `AppShell.tsx:18`: `keiVocabulary.length * 800 + 600` ms), yang secara efektif **memblokir** render pertama selama berdetik-detik — berlawanan dengan filosofi *streaming* Next.js dan merugikan FCP/LCP. Tanpa `error.tsx`, bila salah satu komponen klien melempar error saat render, seluruh beranda akan *crash* tanpa batas pemulihan.

### Temuan 5 — Form kontak meniru submit tanpa Route Handler / validasi
- **Severity: Low** (functional gap, bukan pelanggaran Next.js keras)
- **Lokasi:** `web/src/components/ContactSection.tsx:70-78`
  ```ts
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email) return;
    setSubmitted(true); // hanya state lokal, tidak ada pengiriman ke server
    ...
  };
  ```
- **Penjelasan:** Form "Jadi Bagian dari Keluarga Evav" hanya menyetel state `submitted` tanpa mengirim data ke mana pun (tidak ada `fetch` ke Route Handler, tida pula validasi Zod/skema sesuai `AGENTS.md §5.2/§10.3`). Ini mungkin disengaja (placeholder), tapi bila ditujukan produksi, wajib ada `app/api/.../route.ts` dengan validasi eksplisit.

### Temuan 6 — Navigasi internal masih pakai `<a href>` bukan `next/link`
- **Severity: Low**
- **Lokasi:** `BeritaUmkmSection.tsx:344,410,582`; `Footer.tsx:205-235`.
- **Penjelasan:** Tautan ke `/news`, `/taste`, `/kebijakan-privasi`, dll. memakai `<a>` biasa sehingga **kehilangan prefetch & client-side navigation** yang disediakan `next/link` (penilaian full reload, lebih lambat). Di `BeritaUmkmSection.tsx:344,380` tautan `href="#berita-umkm"` memang wajar sebagai anchor, tapi tautan rute sebaiknya `next/link`.

### Temuan 7 — Bundle klien berat (MapLibre + Swiper + GSAP) tanpa `next/dynamic`
- **Severity: Low**
- **Lokasi:** `JourneyMapSection.tsx:8` (`react-map-gl/maplibre`), `BudayaAdatSection.tsx:7`, `HeritageSection.tsx:8`, `DestinasiTerbaikSection.tsx:9` (`swiper/react`), semua section GSAP.
- **Penjelasan:** Seluruh library berat ini masuk ke bundle beranda karena diimpor secara statis di komponen `"use client"` yang selalu di-render. `AGENTS.md §7.3.3` menyarankan skeleton + lazy-load untuk peta. Bisa dipertimbangkan `next/dynamic({ ssr: false })` untuk `JourneyMapSection` agar peta tidak di-download hingga section terlihat.

---

## Rekomendasi Perbaikan

### 1. Perbaiki bug keyboard di `DestinasiTerbaikSection`
`web/src/components/DestinasiTerbaikSection.tsx:321`
```tsx
// SEBELUM (salah)
if (e.key === "ArrowRightIcon") {
// SESUDAH
if (e.key === "ArrowRight") {
  goToDest((activeDest + 1) % totalItems);
} else if (e.key === "ArrowLeft") {
  goToDest((activeDest - 1 + totalItems) % totalItems);
}
```

### 2. Ganti `<img>` mentah dengan `next/image` (atau impor SVG)
`web/src/components/Footer.tsx:156`
```tsx
import Image from "next/image";
// ...
<Image src="/Logo White.svg" alt="Simfoni Evav" width={28} height={28}
  className="w-7 h-7 object-contain brightness-0 invert" />
```
Untuk SVG dekoratif di `FunFactSection` (`MAatahari.svg`, `Kapal.svg`), impor sebagai komponen React agar tetap optimal:
```tsx
import Sun from "@/public/MAatahari.svg";
// ...
<Sun className="w-[62%] h-auto mx-auto select-none" aria-hidden="true" />
```
Hapus komentar `eslint-disable-next-line @next/next/no-img-element` yang sudah tidak diperlukan.

### 3. Stabilkan `key` agar tidak memicu remount peta
`web/src/components/JourneyMapSection.tsx:421` — hilangkan `key` dinamis pada `<Image>` card:
```tsx
{/* SEBELUM: key={activeLoc.id} */}
<Image
  src={activeLoc.image}
  alt={activeLoc.title}
  fill
  sizes="(max-width: 768px) 100vw, 60vw"
  className="object-cover transition-transform duration-1000 group-hover:scale-105 ..."
/>
```
(Next.js `Image` akan mengganti sumber gambar tanpa membongkar subtree saat `src` berubah.)

### 4. Tambahkan `loading.tsx` dan `error.tsx` di segment beranda
`web/src/app/loading.tsx` (skeleton ringan, bukan blocking timer):
```tsx
export default function Loading() {
  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-section">
      <div className="h-10 w-10 animate-spin rounded-full border-4 border-brand border-t-transparent" />
    </div>
  );
}
```
`web/src/app/error.tsx`:
```tsx
"use client";
export default function Error({ reset }: { error: Error; reset: () => void }) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-4 bg-section">
      <h2 className="text-xl font-semibold">Terjadi kesalahan</h2>
      <button onClick={reset} className="btn-cta px-6 py-3 rounded-full">Coba lagi</button>
    </div>
  );
}
```
Dan pertimbangkan memindahkan loading screen `AppShell` ke `loading.tsx` agar tidak memblokir FCP.

### 5. Gunakan `next/link` untuk semua tautan rute internal
`web/src/components/BeritaUmkmSection.tsx` & `Footer.tsx`:
```tsx
import Link from "next/link";
// ...
<Link href="/news" className="btn-cta ...">Lihat Semua Berita</Link>
```
Ubah semua `<a href="/...">` yang menunjuk ke rute internal (bukan anchor `#...`).

### 6. (Opsional) Lazy-load peta berat dengan `next/dynamic`
`web/src/components/JourneyMapSection.tsx` — bungkus impor peta:
```tsx
import dynamic from "next/dynamic";
const JourneyMapInner = dynamic(() => import("@/components/JourneyMapSection"), {
  ssr: false,
  loading: () => <div className="absolute inset-0 bg-section" aria-hidden />,
});
```
lalu render `<JourneyMapInner />` dari `page.tsx`. Ini menunda bundle MapLibre hingga komponen dibutuhkan (sesuai `AGENTS.md §7.3.3` tentang skeleton peta).

### 7. (Jika produksi) Realisasikan submit form lewat Route Handler
Buat `web/src/app/api/subscribe/route.ts` dengan validasi (mis. Zod) dan panggil via `fetch` dari `ContactSection.handleSubmit`, sesuai `AGENTS.md §4.5` & §5.2.

---

## Referensi

- Server and Client Components — https://nextjs.org/docs/app/building-your-application/rendering/server-components
- Fetching Data (Server Components, parallel/sequential, Suspense) — https://nextjs.org/docs/app/building-your-application/data-fetching/fetching
- Metadata and OG Images — https://nextjs.org/docs/app/building-your-application/optimizing/metadata
- Optimizing Images (`next/image`) — https://nextjs.org/docs/app/building-your-application/optimizing/images
- Optimizing Fonts (`next/font`) — https://nextjs.org/docs/app/building-your-application/optimizing/fonts
- Linking and Navigating (`next/link`) — https://nextjs.org/docs/app/building-your-application/routing/linking-and-navigating
- File Conventions: `loading` / `error` — https://nextjs.org/docs/app/api-reference/file-conventions/loading , https://nextjs.org/docs/app/api-reference/file-conventions/error
- Lazy Loading (`next/dynamic`) — https://nextjs.org/docs/app/building-your-application/optimizing/lazy-loading
- Route Segment Config — https://nextjs.org/docs/app/api-reference/file-conventions/route-segment-config
- TypeScript — https://nextjs.org/docs/app/building-your-application/configuring/typescript
- Panduan proyek (`AGENTS.md`, `GRAND_DESIGN.md`) — `/home/almuzky/discover_evav/AGENTS.md`
