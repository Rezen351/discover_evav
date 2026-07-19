# Best Practice Audit: /taste (web/src/app/taste/page.tsx)

> Framework: Next.js 16.2.6 (App Router) · React 19.2.4 · TypeScript 5 · Tailwind CSS v4
> Tanggal audit: 2026-07-20
> Auditor: AI Agent (mode riset + analisis, tanpa modifikasi kode sumber)

---

## Ringkasan

Halaman `/taste` adalah **Server Component** (`web/src/app/taste/page.tsx:27`) yang bertugas sebagai *composition root* — ia hanya mengimpor `Navbar`, `Footer`, dan enam section kuliner, lalu menyusunnya di dalam `<main id="main-content">`. Metadata statis sudah diisi dengan baik (title, description, canonical, openGraph), dan sebuah `opengraph-image.tsx` dinamis juga tersedia. Secara arsitektural ini **sudah mengikuti pola App Router yang benar** dan konsisten dengan halaman lain (`/culture`, `/explore`, `/heritage`).

Namun, hampir seluruh子树 UI ditandai `"use client"` (semua enam section + `Navbar` + `Footer`), padahal isinya sepenuhnya **konten statis** yang diimpor dari `src/content/taste.ts` dan tidak butuh state/event browser di level section. Konsekuensinya: JS klien yang dikirim ke browser membengkak (GSAP + ScrollTrigger + lucide-react + @heroicons + react), dan seluruh halaman kehilangan manfaat render statis murni. Animasi GSAP juga dijalankan di setiap section terlepas dari apakah elemen masuk viewport, dan tidak ada `loading.tsx`/`error.tsx` per-segmen.

**Rating kepatuhan: Baik (Arsitektur benar, komposisi client-server kurang optimal).**

**Skor: 72 / 100**

| Kategori | Skor |
| --- | --- |
| Server vs Client Components | 14/25 |
| Metadata & SEO | 18/20 |
| Data fetching & rendering | 10/10 (statis, tidak ada fetch) |
| next/image & media | 9/10 |
| Aksesibilitas & semantik | 13/15 |
| Performance & bundle | 4/10 |
| Pola App Router / konvensi | 4/10 |

---

## Standar Next.js yang Direview

Referensi standar diambil dari dokumentasi resmi Next.js 16 (`nextjs.org/docs`) dan panduan produksi 2026:

1. **Server vs Client Components** — Default Server Component; `"use client"` hanya untuk interaktivitas/state/efek/browser API. Push directive ke *leaf* component. (https://nextjs.org/docs/app/getting-started/server-and-client-components)
2. **Metadata API** — Gunakan `export const metadata` (statis) atau `generateMetadata` (dinamis). metadataBase, canonical, openGraph, twitter. (https://nextjs.org/docs/app/api-reference/functions/generate-metadata)
3. **Dynamic OG Image** — `opengraph-image.tsx` dengan `ImageResponse`.
4. **Data fetching & rendering** — Async Server Components, streaming via `Suspense`, `loading.tsx`/`error.tsx` per-segmen. (https://nextjs.org/docs/app/getting-started/fetching-data)
5. **Caching & route segment config** — `next.config.ts` **tidak** mengaktifkan `cacheComponents`; artinya model caching sebelumnya berlaku (`fetch` tidak di-cache by default). Tidak ada `export const dynamic` yang diperlukan di halaman statis ini. (https://nextjs.org/docs/app/api-reference/file-conventions/route-segment-config)
6. **next/image** — `priority` untuk above-the-fold, `sizes` akurat, `alt` deskriptif, hindari `unoptimized` tanpa alasan. (https://nextjs.org/docs/app/api-reference/components/image)
7. **next/font** — Font via `next/font/google` di `layout.tsx` (Montserrat, Montaga, Ephesis). ✅ sudah dilakukan.
8. **next/link** — Prefer `next/link` daripada `<a href>` untuk navigasi internal. (https://nextjs.org/docs/app/api-reference/components/link)
9. **Accessibility & semantik HTML** — `skip-link`, heading hierarchy, ARIA labels, `prefers-reduced-motion`. (AGENTS.md §9)
10. **Performance** — Minimalkan JS klien, dynamic import untuk dependency berat, hindari memuat semua client di awal.
11. **TypeScript & konvensi** — Strict typing, alias `@/*`, colocation. (AGENTS.md §4, §7)

---

## Analisis Kepatuhan

| Standar | Status | Bukti |
| --- | --- | --- |
| Page adalah Server Component | ✅ | `web/src/app/taste/page.tsx:27` — tidak ada `"use client"`, hanya komposisi |
| Metadata statis lengkap | ✅ | `page.tsx:11-25` — title, description, canonical, openGraph |
| `metadataBase` & template title | ✅ | `web/src/app/layout.tsx:45-49` (`SITE_URL`, template `%s`) |
| Dynamic OG image | ✅ | `web/src/app/taste/opengraph-image.tsx` (ImageResponse 1200×630) |
| `next/font` terpusat | ✅ | `layout.tsx:9-24` (Montserrat, Montaga, Ephesis via `next/font/google`) |
| next/image digunakan | ✅ | `HeroTasteSection.tsx:54`, `SignatureDishesSection.tsx:75`, dll. |
| `priority` untuk hero image | ✅ | `HeroTasteSection.tsx:58` |
| `alt` deskriptif pada image | ✅ | Setiap `Image` punya `alt` dari konten terpusat |
| Skip-to-content link | ✅ | `layout.tsx:189-195` (`#main-content`) |
| `prefers-reduced-motion` dihormati | ✅ | Tiap section GSAP (mis. `HeroTasteSection.tsx:21-29`) cek `matchMedia` |
| GSAP cleanup (`ctx.revert()`) | ✅ | `HeroTasteSection.tsx:41`, `SignatureDishesSection.tsx:43`, dll. |
| Konten sentralisasi | ✅ | `web/src/content/taste.ts` (sesuai AGENTS.md §4.10) |
| `"use client"` dipush ke leaf | ❌ | Keenam section + Navbar + Footer full `"use client"` padahal konten statis |
| Minimalisasi JS klien | ⚠️ | GSAP+ScrollTrigger, lucide-react, @heroicons ikut ke bundle klien |
| `next/link` untuk nav internal | ⚠️ | `Navbar.tsx:157-164` & `Footer.tsx:205-235` pakai `<a href>` bukan `<Link>` |
| `loading.tsx` per-segmen | ❌ | Tidak ada `web/src/app/taste/loading.tsx` (seluruh app tidak punya) |
| `error.tsx` per-segmen | ❌ | Tidak ada `web/src/app/taste/error.tsx` |
| Tombol CTA pakai `.btn-cta` | ⚠️ | AGENTS.md §7.2 mewajibkan `.btn-cta`; taste pakai `.btn-spotlight` (ClosingSection.tsx:79, UmkmCatalogSection.tsx:229) — tidak konsisten, perlu klarifikasi desain |
| `aria-labelledby` pada section | ✅ | `SignatureDishesSection.tsx:50`, `StorySection.tsx:50`, `BentoSection.tsx:60`, `UmkmCatalogSection.tsx:95` |
| ScrollTrigger tanpa guard viewport | ⚠️ | Animasi dipasang pada mount semua section, tidak lazy-init per elemen terlihat (kecuali trigger ScrollTrigger yang memang menunggu scroll) |
| `sizes` akurat pada image | ✅ | Mis. `SignatureDishesSection.tsx:79`, `BentoSection.tsx:95-99` |
| StAndar container width | ✅ | `max-w-[98%] xl:max-w-[1600px] mx-auto px-4 md:px-8` konsisten di semua section |

---

## Temuan & Masalah

### Severity: 🔴 High

**H1. Seluruh subtree UI adalah Client Component padahal konten statis.**
- Lokasi: `web/src/app/taste/page.tsx:1-9` (impor 6 section `"use client"`), `HeroTasteSection.tsx:1`, `SignatureDishesSection.tsx:1`, `StorySection.tsx:1`, `BentoSection.tsx:1`, `UmkmCatalogSection.tsx:1`, `ClosingSection.tsx:1`, `Navbar.tsx:1`, `Footer.tsx:1`.
- Dampak: Halaman kehilangan render statis murni. JS bundle klien memuat GSAP + ScrollTrigger + `lucide-react` + `@heroicons/react` + `react` untuk konten yang sebenarnya bisa 100% di-render di server. Bertentangan dengan prinsip "push `'use client'` ke leaf" (Next.js docs, Server and Client Components).
- Catatan: `UmkmCatalogSection` memang butuh state (`page`, `filter`) → wajar client. Tapi 5 section lainnya (Hero, Signature, Story, Bento, Closing) **hanya butuh GSAP reveal** yang bisa diisolasi ke komponen leaf kecil, menyisakan section sebagai Server Component.

**H2. Tidak ada `error.tsx` per-segmen rute `/taste`.**
- Lokasi: `web/src/app/taste/` hanya punya `page.tsx` + `opengraph-image.tsx`.
- Dampak: Jika salah satu section melempar error pada runtime, seluruh halaman (termasuk Navbar/Footer) gagal tanpa fallback yang terisolasi. Panduan produksi menyarankan `error.tsx` di-colocate dengan segmen rute (ZTABS 2026, "Two Levels Required").

### Severity: 🟡 Medium

**M1. Navigasi internal pakai `<a href>` bukan `<next/link>`.**
- Lokasi: `Navbar.tsx:157-165` (link nav), `Footer.tsx:205-235` (link legal & sosial).
- Dampak: Kehilangan prefetch, client-side navigation, dan deduplikasi layout yang ditingkatkan di Next.js 16. Menggunakan `next/link` akan mempercepat transisi antar-halaman.

**M2. Tidak ada `loading.tsx` untuk streaming/UX navigasi.**
- Lokasi: `web/src/app/taste/`.
- Dampak: Meski halaman ini statis (tidak ada fetch), keberadaan `loading.tsx` memberi *instant loading state* yang konsisten dan siap jika kelak ditambah data dinamis. Seluruh aplikasi juga tidak memilikinya (glob `loading.tsx` tidak ditemukan).

**M3. GSAP dimuat & dijalankan di setiap section tanpa code-splitting per kebutuhan.**
- Lokasi: Setiap section mengimpor `gsap` + `gsap/ScrollTrigger` dan memanggil `gsap.registerPlugin` di module-level (`HeroTasteSection.tsx:10-12`, dst.).
- Dampak: GSAP masuk ke bundle klien global. Idealnya di-load via `next/dynamic` atau diisolasi ke satu hook/util `useReveal` bersama agar tidak diimpor berulang dan tidak memicu animasi sebelum section terlihat.

**M4. Inkonsistensi kelas tombol CTA vs AGENTS.md §7.2.**
- Lokasi: `ClosingSection.tsx:79` (`btn-spotlight`), `UmkmCatalogSection.tsx:229` (`btn-spotlight`).
- Dampak: AGENTS.md mewajibkan tombol CTA utama memakai `.btn-cta` (global, tanpa background, hover pink). Di sini digunakan `.btn-spotlight` (ada efek radial gradient). Perlu klarifikasi apakah `.btn-spotlight` adalah varian CTA yang disengaja (maka dokumentasikan di GRAND_DESIGN) atau pelanggaran konvensi.

### Severity: 🟢 Low / Catatan

**L1. `Footer.tsx:156` pakai `<img>` bukan `next/image`.**
- `<img src="/Logo White.svg" .../>` — melewatkan optimasi Next.js. Minor karena aset SVG kecil, tapi tidak konsisten dengan `next/image` di tempat lain.

**L2. `UmkmCatalogSection.tsx:127` menggunakan `umkms[0].image` sebagai foto headline tetap.**
- Bukan bug, tapi foto "landscape" di Div 1 selalu mengambil item pertama katalog (bisa berganti saat filter?). Sebaiknya jadi konten eksplisit di `content/umkm.ts` atau `content/taste.ts` agar deterministik.

**L3. ScrollTrigger `toggleActions: "play none none reverse"`** pada section reveal (`SignatureDishesSection.tsx:38`, `StorySection.tsx:39`, `BentoSection.tsx:47`, `ClosingSection.tsx:40`) akan membalikkan animasi (elemen jadi `opacity:0`) saat user scroll ke atas melewati batas. Ini sering menyebabkan "elemen hilang" jika user scroll bolak-balik. Pertimbangkan `"play none none none"` atau pastikan state akhir permanen.

---

## Rekomendasi Perbaikan

**R1 — Pisahkan animasi GSAP ke leaf Client Component, jadikan section Server Component.**
Buat satu komponen client kecil yang membungkus children dan menjalankan reveal:

```tsx
// src/components/Reveal.tsx  ("use client")
"use client";
import { useEffect, useRef, ReactNode } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Reveal({
  children,
  className = "",
  y = 40,
  start = "top 85%",
}: {
  children: ReactNode;
  className?: string;
  y?: number;
  start?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const ctx = gsap.context(() => {
      if (reduce) {
        gsap.set(el, { opacity: 1, y: 0 });
        return;
      }
      gsap.from(el, {
        opacity: 0,
        y,
        duration: 0.8,
        ease: "power2.out",
        scrollTrigger: { trigger: el, start, toggleActions: "play none none none" },
      });
    }, ref);
    return () => ctx.revert();
  }, [y, start]);
  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
```

Lalu `SignatureDishesSection` menjadi Server Component:

```tsx
// src/components/taste/SignatureDishesSection.tsx  (TANPA "use client")
import Reveal from "@/components/Reveal";
import Image from "next/image";
import { signatureDishes } from "@/content/taste";

export default function SignatureDishesSection() {
  return (
    <section id="signature-dishes" aria-labelledby="signature-dishes-title" className="...">
      {/* heading & grid tanpa state -> dirender di server */}
      {signatureDishes.dishes.map((dish) => (
        <Reveal key={dish.id} className="...">
          <article className="... group relative ...">
            <Image src={dish.image} alt={dish.imageAlt} fill sizes="..." className="..." />
            {/* ... */}
          </article>
        </Reveal>
      ))}
    </section>
  );
}
```

Ini menurunkan JS klien drastis (GSAP hanya di `Reveal`, section statis di-render server).

**R2 — Tambahkan `error.tsx` di segmen `/taste`.**

```tsx
// src/app/taste/error.tsx
"use client";
import { useEffect } from "react";

export default function Error({ error, reset }: { error: Error; reset: () => void }) {
  useEffect(() => { console.error(error); }, [error]);
  return (
    <main className="min-h-screen grid place-items-center text-center px-4">
      <div>
        <h1 className="font-serif text-fluid-h2 text-black">Terjadi kesalahan</h1>
        <p className="mt-3 text-black/60">Halaman rasa Kei sedang tidak dapat ditampilkan.</p>
        <button onClick={reset} className="btn-cta mt-6 inline-flex items-center gap-2">
          Coba lagi
        </button>
      </div>
    </main>
  );
}
```

**R3 — Gunakan `next/link` untuk navigasi internal.**

```tsx
// Navbar.tsx — ganti <a href={item.href}> menjadi:
import Link from "next/link";
// ...
<Link href={item.href} className="...">{item.label}</Link>
```

Sama untuk link legal di `Footer.tsx` (`/kebijakan-privasi`, dll). Link eksternal (WhatsApp, sosial media) tetap `<a target="_blank" rel="noreferrer">`.

**R4 — Tambahkan `loading.tsx` (skeleton) untuk segmen `/taste`.**

```tsx
// src/app/taste/loading.tsx
export default function Loading() {
  return (
    <main id="main-content" className="min-h-screen bg-section">
      <div className="max-w-[98%] xl:max-w-[1600px] mx-auto px-4 md:px-8 py-24">
        <div className="h-10 w-1/3 rounded bg-black/5 animate-pulse" />
        <div className="mt-6 h-64 rounded-xl bg-black/5 animate-pulse" />
      </div>
    </main>
  );
}
```

**R5 — Konsistensi kelas CTA.**
Putuskan & dokumentasikan: jika `.btn-spotlight` adalah varian CTA resmi, tambahkan penjelasan di `docs/GRAND_DESIGN.md` §6.5. Jika tidak, ganti ke `.btn-cta` sesuai AGENTS.md §7.2 (tanpa background, hover pink, ikon `text-current`).

**R6 — Perbaiki `toggleActions` agar elemen tidak "hilang" saat scroll balik** (lihat L3): ganti `"play none none reverse"` → `"play none none none"` di `SignatureDishesSection.tsx:38`, `StorySection.tsx:39`, `BentoSection.tsx:47`, `ClosingSection.tsx:40`, `UmkmCatalogSection.tsx:69`.

**R7 — Ganti `<img>` di `Footer.tsx:156` dengan `next/image`** (atau setidaknya konsisten).

---

## Referensi

- Next.js — Server and Client Components: https://nextjs.org/docs/app/getting-started/server-and-client-components
- Next.js — Fetching Data (Server Components, Suspense, loading.js): https://nextjs.org/docs/app/getting-started/fetching-data
- Next.js — File Conventions: loading: https://nextjs.org/docs/app/api-reference/file-conventions/loading
- Next.js — Metadata API: https://nextjs.org/docs/app/api-reference/functions/generate-metadata
- Next.js — next/image: https://nextjs.org/docs/app/api-reference/components/image
- Next.js — next/link: https://nextjs.org/docs/app/api-reference/components/link
- Next.js — Route Segment Config (Next.js 16): https://nextjs.org/docs/app/api-reference/file-conventions/route-segment-config
- Next.js — Caching & Cache Components (Next.js 16): https://nextjs.org/docs/app/getting-started/caching
- Next.js 16 Blog: https://nextjs.org/blog/next-16
- ZTABS — Next.js App Router Best Practices (2026): https://ztabs.co/blog/nextjs-app-router-best-practices
- ECOSIRE — Next.js 16 Production Patterns: https://ecosire.com/blog/nextjs-16-app-router-production
- AGENTS.md proyek (aturan bahasa, arsitektur, CTA `.btn-cta`, aksesibilitas): `/home/almuzky/discover_evav/AGENTS.md`
- GRAND_DESIGN.md: `/home/almuzky/discover_evav/docs/GRAND_DESIGN.md`

### File yang diaudit
- `web/src/app/taste/page.tsx`
- `web/src/app/taste/opengraph-image.tsx`
- `web/src/components/taste/HeroTasteSection.tsx`
- `web/src/components/taste/SignatureDishesSection.tsx`
- `web/src/components/taste/StorySection.tsx`
- `web/src/components/taste/BentoSection.tsx`
- `web/src/components/taste/UmkmCatalogSection.tsx`
- `web/src/components/taste/ClosingSection.tsx`
- `web/src/components/Navbar.tsx`, `web/src/components/Footer.tsx`
- `web/src/app/layout.tsx`, `web/src/content/taste.ts`, `web/src/hooks/useSpotlight.ts`
