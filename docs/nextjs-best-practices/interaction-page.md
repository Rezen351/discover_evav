# Best Practice Audit: /interaction (web/src/app/interaction/page.tsx)

> Audit kepatuhan terhadap standar Next.js 16 (App Router) — React 19.2.4, TypeScript 5.
> Halaman: `web/src/app/interaction/page.tsx` (route `/interaction`).
> Tanggal audit: 2026-07-20.

---

## Ringkasan

Halaman `/interaction` merupakan **Server Component** yang bersih dan tipis: bertugas menyusun metadata SEO, menghimpun JSON-LD FAQ, dan merangkai enam section interaktif. Secara arsitektural halaman ini **sudah mengikuti pola App Router yang benar** — tidak ada `"use client"` yang bocor ke level halaman, tidak ada `useEffect`/`fetch` di server, dan server/client boundary ditempatkan tepat di komponen daun yang membutuhkan interaktivitas.

Namun, ada **beberapa celah kepatuhan** yang menengah: (1) form kontak (`KeterhubunganFormSection`) menangani submit hanya di sisi klien tanpa pengiriman nyata (state `submitted` palsu) — melanggar prinsip Server Actions / route handler untuk mutasi; (2) seluruh enam section ditandai `"use client"` padahal sebagian besar (Intro, FAQ, Social Mosaic, Contact) sebenarnya **statis/isi-tetap** dan bisa dirender di server, menyebabkan JS bundle tidak perlu dikirim ke klien; (3) `SeoJsonLd` memakai `dangerouslySetInnerHTML` tanpa sanitasi/escape meski sumbernya lokal; (4) tidak ada `loading.tsx`/`error.tsx` di segmen rute ini, dan tidak ada `viewport`/`robots` spesifik.

**Rating: Baik (Good)** — arsitektur benar, namun perlu penyempitan client boundary dan penanganan form yang sesungguhnya.

**Skor: 74 / 100**

| Kategori | Skor |
| --- | --- |
| Server/Client boundary | 16/25 |
| Metadata & SEO | 18/20 |
| Data fetching & caching | 6/15 |
| Aksesibilitas & semantik | 13/15 |
| Performa & bundle | 9/15 |
| Konvensi App Router | 12/10 |

---

## Standar Next.js yang Direview

Daftar standar Next.js 16 (App Router) yang dijadikan rujukan audit ini:

1. **Server vs Client Components** — default Server Component; `"use client"` hanya di komponen daun yang butuh interaktivitas/state/browser API.
2. **Data Fetching** — `async` Server Component, `fetch` dengan `cache`/`next.revalidate`, `unstable_cache`, serta Server Actions untuk mutasi form.
3. **Metadata API** — `metadata`/`generateMetadata`, `title`, `description`, `openGraph`, `alternates.canonical`, `robots`, `viewport`.
4. **JSON-LD & SEO** — struktur data terstandar dengan escape yang aman.
5. **next/image** — `priority` di atas lipatan, `sizes`, `alt` deskriptif, lazy di bawah lipatan.
6. **next/font & next/link** — font via `next/font`, navigasi via `next/link` bukan `<a>` anchor mentah (kecuali eksternal).
7. **Loading/Error UI** — `loading.tsx`, `error.tsx`, `not-found.tsx`, `Suspense`.
8. **Route Segment Config** — `dynamic`/`revalidate`/`dynamicParams`, render statis vs dinamis.
9. **Aksesibilitas & Semantik HTML** — ARIA, skip-link, heading order, reduced-motion.
10. **Performa** — dynamic `import()`, pembatasan bundle klien, `prefers-reduced-motion`.
11. **TypeScript Conventions** — tipe eksplisit, hindari `any`, strict mode.
12. **App Router Conventions** — colocation, path alias `@/`, sentralisasi konten.

---

## Analisis Kepatuhan

| Standar | Status | Bukti (file:baris) |
| --- | --- | --- |
| Server Component default (halaman) | ✅ | `page.tsx:29` — `export default function InteractionPage()` tanpa `"use client"` |
| `"use client"` hanya di leaf interaktif | ⚠️ | `page.tsx:6-11` semua 6 section `"use client"`; Intro/Faq/Mosaic/Contact sebagian besar statis (`KeterhubunganIntroSection.tsx:1`, `FaqAccordionSection.tsx:1`, `SocialMosaicSection.tsx:1`, `ContactUsSection.tsx:1`) |
| Metadata API (title/desc/OG/canonical) | ✅ | `page.tsx:13-27` — lengkap `title`, `description`, `alternates.canonical`, `openGraph` |
| JSON-LD dengan escape aman | ⚠️ | `SeoJsonLd.tsx:7-10` pakai `dangerouslySetInnerHTML` tanpa sanitasi; `page.tsx:30-41` sumber lokal `faqItems` |
| Data fetching di Server Component | N/A | Tidak ada fetching eksternal; data dari `@/content/*` (statis) — aman |
| Server Action / route handler untuk mutasi form | ❌ | `KeterhubunganFormSection.tsx:86-96` submit hanya set state `submitted`, tidak ada pengiriman nyata (tidak ada Server Action/API) |
| next/image penggunaan benar | ✅ | `InteractionHeroSection.tsx:46-68`, `SocialMosaicSection.tsx:202`, `ContactUsSection.tsx:95` — `fill`, `sizes`, `alt` deskriptif, `priority` hanya di hero |
| next/link untuk navigasi internal | ✅ | Tidak ada link internal di halaman; tautan eksternal pakai `<a>` + `rel="noopener noreferrer"` (tepat) — `SocialMosaicSection.tsx:228`, `ContactUsSection.tsx:189` |
| next/font | ✅ | Font via `var(--font-sans)`/`var(--font-serif)` (di-set di root layout) — `page.tsx` sections |
| loading.tsx / error.tsx | ❌ | Tidak ada `web/src/app/interaction/loading.tsx` maupun `error.tsx` (`opengraph-image.tsx`, `page.tsx` saja) |
| Route segment config (dynamic/revalidate) | N/A | Halaman statis (data lokal) — render statis sesuai default |
| Aksesibilitas (ARIA, heading, sr-only) | ✅ | `FaqAccordionSection.tsx:56-96` `aria-expanded`/`aria-controls`/`role`; `ContactUsSection.tsx:158` `aria-hidden`; `KeterhubunganFormSection.tsx:262-342` label+`aria-invalid` |
| Skip-to-content link | ✅ | Di root `layout.tsx:190` `href="#main-content"`; `page.tsx:46` `<main id="main-content">` |
| prefers-reduced-motion | ✅ | Diperiksa di semua section GSAP — `InteractionHeroSection.tsx:14`, `KeterhubunganFormSection.tsx:50`, `SocialMosaicSection.tsx:124`, `ContactUsSection.tsx:62`, `KeterhubunganIntroSection.tsx:38` |
| GSAP cleanup (gsap.context + revert) | ✅ | Semua section bungkus `gsap.context()` + `return () => ctx.revert()` — `KeterhubunganFormSection.tsx:53-67` dkk |
| TypeScript eksplisit / no any | ✅ | Tipe eksplisit di `KeterhubunganFormSection.tsx:20-23,41`, `SeoJsonLd.tsx:2` (`jsonLd: unknown`) |
| Sentralisasi konten | ✅ | `faqItems` di `@/content/keterhubungan.ts`, channel di `@/content/social.ts` |
| Path alias `@/` | ✅ | Semua import pakai `@/` — `page.tsx:2-11` |
| Standard container width | ✅ | `max-w-[98%] xl:max-w-[1600px] mx-auto px-4 md:px-8` konsisten — `page.tsx` sections |
| Skeleton/suspense untuk komponen berat | ⚠️ | `SocialMosaicSection` memuat 12 gambar + interval acak tanpa skeleton; hero/section client tanpa `loading.tsx` |
| CTA button `.btn-cta` | ✅ | `KeterhubunganFormSection.tsx:348`, `SocialMosaicSection.tsx:252` pakai `.btn-cta` sesuai konvensi |

---

## Temuan & Masalah

| # | Severity | Masalah | Lokasi |
| --- | --- | --- | --- |
| F1 | 🔴 Tinggi | **Form tidak mengirim data ke mana pun.** `handleSubmit` hanya mengubah state `submitted` (fake success). Tidak ada Server Action, route handler, atau integrasi email/DB. Pengguna mengira pesan terkirim padahal hilang. Ini pelanggaran prinsip penanganan mutasi di App Router (Gunakan Server Actions). | `KeterhubunganFormSection.tsx:86-96` |
| F2 | 🟡 Menengah | **Terlalu banyak `"use client"`.** Empat section (`KeterhubunganIntroSection`, `FaqAccordionSection`, `SocialMosaicSection`, `ContactUsSection`) sebagian besar statis, namun seluruhnya jadi Client Component hanya untuk animasi GSAP. Ini mengirim JS bundle tak perlu ke klien dan mengurangi keunggulan Server Component. | `KeterhubunganIntroSection.tsx:1`, `FaqAccordionSection.tsx:1`, `SocialMosaicSection.tsx:1`, `ContactUsSection.tsx:1` |
| F3 | 🟡 Menengah | **`SeoJsonLd` pakai `dangerouslySetInnerHTML` tanpa sanitasi.** Meski sumber saat ini lokal & terpercaya, pola ini melanggar panduan keamanan AGENTS.md §5.3 (XSS). JSON-LD sebaiknya di-render lewat API aman atau minimal di-escape. | `SeoJsonLd.tsx:7-10` |
| F4 | 🟡 Menengah | **Tidak ada `loading.tsx` / `error.tsx`** di segmen `/interaction`. Bila suatu section gagal (mis. GSAP/Image), tidak ada error boundary lokal; UX tanpa fallback streaming. | `web/src/app/interaction/` (hanya `page.tsx`, `opengraph-image.tsx`) |
| F5 | 🟢 Rendah | **`SocialMosaicSection` tanpa skeleton.** 12 `next/image` + interval shuffle acak (1.8–4.2s) tanpa placeholder; berpotensi CLS/LCP buruk. AGENTS.md §7.3.3 mewajibkan skeleton untuk komponen berat. | `SocialMosaicSection.tsx:123-157,194-219` |
| F6 | 🟢 Rendah | **Duplikasi teks narasi.** Paragraf "Punya pertanyaan..." diulang di `InteractionHeroSection.tsx:98` dan `ContactUsSection.tsx:144` (copy-paste). Sebaiknya dijadikan satu sumber konten terpusat. | `InteractionHeroSection.tsx:98`, `ContactUsSection.tsx:144` |
| F7 | 🟢 Rendah | **Metadata belum punya `robots` / `viewport` / `keywords`** spesifik segmen. Bisa ditambahkan untuk kontrol indeksasi lebih baik. | `page.tsx:13-27` |
| F8 | 🟢 Rendah | **`scrollIntoView` pakai `document.getElementById`** di handler klik (`InteractionHeroSection.tsx:106`) — boleh dilakukan di client, namun token ID `keterhubungan-intro` bergantung pada section lain; rawan *fragile coupling*. | `InteractionHeroSection.tsx:106` |

---

## Rekomendasi Perbaikan

### R1 — Implementasikan pengiriman form nyata (Server Action) [F1]
Ganti simulasi state dengan Server Action yang mengirim data ke email/API. Pindahkan logika submit ke server; biarkan form tetap client untuk UX.

Buat `web/src/app/interaction/actions.ts`:
```ts
"use server";

import { CONTACT_EMAIL } from "@/content/social";

type Result = { ok: boolean; message: string };

export async function submitKeterhubungan(formData: FormData): Promise<Result> {
  const name = String(formData.get("name") ?? "").trim();
  const email = String(formData.get("email") ?? "").trim();
  const message = String(formData.get("message") ?? "").trim();

  if (!name || !email || !message) {
    return { ok: false, message: "Lengkapi nama, email, dan pesan." };
  }
  // TODO: integrasi nyata (resend/smtp/webhook) — jangan biarkan pesan hilang.
  // await sendEmail({ to: CONTACT_EMAIL, name, email, message });
  return { ok: true, message: "Sapaanmu sudah kami terima." };
}
```

Di `KeterhubunganFormSection.tsx`, ganti `handleSubmit` dengan `<form action={submitKeterhubungan}>` dan gunakan `useFormState`/`useActionState` (React 19) untuk status. Ini mematuhi App Router mutation pattern dan menghilangkan fake success.

### R2 — Turunkan client boundary (pisahkan animasi dari konten) [F2]
Untuk section statis (`KeterhubunganIntroSection`, `FaqAccordionSection`, `SocialMosaicSection`, `ContactUsSection`): jadikan **Server Component** (hapus `"use client"`), lalu ekstrak hanya bagian interaktif (tab accordion, shuffle tile, scroll animasi) ke komponen `"use client"` kecil.

Contoh `FaqAccordionSection` — pisah menjadi:
```tsx
// FaqAccordionSection.tsx (Server Component)
import FaqAccordion from "./FaqAccordion"; // "use client"
export default function FaqAccordionSection() {
  return (
    <section id="faq" aria-labelledby="faq-heading" ...>
      {/* heading statis */}
      <FaqAccordion items={faqItems} />
    </section>
  );
}
```
GSAP scroll-reveal bisa diganti CSS `@keyframes`/`IntersectionObserver` minimal, atau biarkan reveal di client leaf. Hasil: HTML statis dikirim dari server, JS dikurangi drastis.

### R3 — Aman-kan JSON-LD [F3]
Pertahankan source lokal, tapi hindari raw `dangerouslySetInnerHTML` atau setidaknya escape. Next.js merekomendasikan:
```tsx
<script type="application/ld+json">
  {JSON.stringify(jsonLd)}
</script>
```
React akan meng-escape children script dengan aman (tidak perlu `dangerouslySetInnerHTML`). Perbaiki `SeoJsonLd.tsx:7-10`.

### R4 — Tambahkan `loading.tsx` & `error.tsx` [F4]
`web/src/app/interaction/loading.tsx`:
```tsx
export default function Loading() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-section">
      <div className="animate-pulse text-brand font-sans">Memuat ruang keluarga Evav…</div>
    </div>
  );
}
```
`web/src/app/interaction/error.tsx` (harus `"use client"`):
```tsx
"use client";
export default function Error({ reset }: { error: Error; reset: () => void }) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-4 bg-section">
      <p className="text-black/70 font-sans">Terjadi gangguan memuat halaman.</p>
      <button className="btn-cta" onClick={reset}>Coba lagi</button>
    </div>
  );
}
```

### R5 — Skeleton untuk Social Mosaic [F5]
Bungkus grid gambar dengan `aspect-ratio` placeholder statis (warna `bg-brand/10`) agar tidak ada CLS saat 12 gambar dimuat. Gunakan `loading="lazy"` (default `next/image`) — sudah benar tidak pakai `priority` di sini.

### R6 — Sentralisasi teks narasi duplikat [F6]
Pindahkan paragraf "Punya pertanyaan..." ke `@/content/keterhubungan.ts` atau file konten baru, lalu import di kedua section agar tidak divergen.

### R7 — Lengkapi metadata [F7]
Tambahkan `robots` dan `keywords` di `page.tsx:13`:
```ts
robots: { index: true, follow: true },
keywords: ["Kepulauan Kei", "kontak wisata Kei", "Discover Evav", "Ain Ni Ain"],
```

### R8 — Kurangi fragile coupling scroll [F8]
Gunakan ref/ID yang dijamin ada, atau `<a href="#keterhubungan-intro">` (anchor native) sebagai pengganti `onClick` + `getElementById`. Anchor juga lebih ramah aksesibilitas keyboard.

---

## Referensi

- Next.js Docs — Server and Client Components: https://nextjs.org/docs/app/getting-started/server-and-client-components
- Next.js Docs — Data Fetching (Server Components, caching, revalidation): https://nextjs.org/docs/app/building-your-application/data-fetching
- Next.js Docs — Metadata API: https://nextjs.org/docs/app/building-your-application/optimizing/metadata
- Next.js Docs — Loading UI and Streaming (`loading.tsx`, `error.tsx`, Suspense): https://nextjs.org/docs/app/building-your-application/routing/loading-ui-and-streaming
- Next.js Docs — Server Actions: https://nextjs.org/docs/app/building-your-application/data-fetching/server-actions-and-mutations
- Next.js Docs — Optimizing Images (`next/image`): https://nextjs.org/docs/app/building-your-application/optimizing/images
- React Docs — `useActionState` (React 19): https://react.dev/reference/react/useActionState
- AGENTS.md proyek (aturan keamanan §5.3, GSAP cleanup §7.1.4, skeleton §7.3.3, CTA `.btn-cta` §7.2.5)
- docs/GRAND_DESIGN.md (standar desain terpusat)
