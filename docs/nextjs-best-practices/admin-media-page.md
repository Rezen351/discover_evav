# Best Practice Audit: /admin/media (web/src/app/admin/media/page.tsx)

Laporan audit kepatuhan terhadap standar **Next.js 16 App Router** untuk halaman pengelola media/aset admin. Halaman ini saat ini merupakan **prototype bertenaga data mock statis** — belum memiliki pengambilan data nyata, unggah berkas, proteksi rute, maupun galeri visual. Laporan ini mengevaluasi kode yang **ada** dan mengidentifikasi celah yang wajib ditutup sebelum rute ini layak rilis ke produksi.

---

## Ringkasan

Halaman `web/src/app/admin/media/page.tsx` mengikuti pola Server Component yang bersih, memisahkan presentasi ke komponen yang dapat digunakan ulang (`AdminShell`, `AdminPageHeader`, `AdminTable`, `AdminButton`), dan mendeklarasikan `metadata` dengan benar. Namun, sebagai sebuah *media/asset manager*, halaman ini memiliki kelemahan fundamental: data di-*hardcode* dari mock, tidak ada `next/image` (karena tidak menampilkan pratinjau media), tidak ada penanganan unggah (Server Action), **tidak ada proteksi autentikasi/otorisasi sama sekali**, dan merujuk ke rute `/admin/media/baru` yang **belum ada** (tautan rusak). Tidak ada `loading.tsx`/`error.tsx`/`Suspense` untuk batas pemuatan data asinkron di masa depan.

**Rating: ⚠️ Cukup — perlu perbaikan sebelum produksi**
**Skor: 52 / 100**

| Kategori | Skor |
| --- | --- |
| Server vs Client Components | 9/10 |
| Metadata API | 9/10 |
| Aksesibilitas & HTML Semantik | 8/10 |
| next/image & Media Presentation | 2/10 |
| Data Fetching & Upload (Server Actions) | 2/10 |
| Auth / Route Protection | 0/10 |
| Loading / Error / Suspense | 3/10 |
| Routing Integrity (broken link) | 2/10 |
| TypeScript & App Router Conventions | 9/10 |
| Performance & Dynamic Rendering | 4/10 |

---

## Standar Next.js yang Direview

Standar berikut diambil dari dokumentasi resmi `nextjs.org/docs` (App Router, Next.js 16.2.6) serta panduan komunitas terverifikasi 2026 terkait unggah berkas dan `next/image`:

1. **Server vs Client Components** — Default Server Component; `"use client"` hanya untuk interaktivitas (`nextjs.org/docs/app/building-your-application/rendering/server-components`).
2. **Data Fetching & Mutations (Server Actions)** — Mutasi lewat Server Action berbasis `FormData`, validasi server, `revalidatePath`/`revalidateTag` (`nextjs.org/docs/app/building-your-application/data-fetching/server-actions-and-mutations`).
3. **File Upload Handling** — Server Action untuk berkas kecil (<4–10 MB), route handler/presigned URL untuk besar; selalu validasi server (magic bytes, ukuran, ekstensi); sanitasi nama berkas; autentikasi wajib (`nextjs.org/docs`, makerkit.dev, nextjslaunchpad.com 2026).
4. **Metadata API** — `metadata`/`generateMetadata` ekspor dari page/layout (`nextjs.org/docs/app/api-reference/functions/generate-metadata`).
5. **next/image** — Wajib untuk pratinjau media: `alt` wajib, `width`/`height` atau `fill`+parent relatif, `sizes` untuk responsif, daftar `remotePatterns` (`nextjs.org/docs/app/api-reference/components/image`).
6. **next/link & next/font** — Navigasi antar-rute via `next/link`; font via `next/font` (sudah di root layout).
7. **loading.tsx / error.tsx / Suspense** — Batas UX untuk pemuatan/error data asinkron (`nextjs.org/docs/app/api-reference/file-conventions`).
8. **Route Segment Config & Rendering** — `dynamic`/`revalidate`/`force-dynamic` sesuai sifat data.
9. **Auth / Route Protection** — Verifikasi sesi di layout/server action; middleware untuk perlindungan segmen `/admin` (`nextjs.org/docs/app/building-your-application/auth`).
10. **Aksesibilitas & Semantic HTML** — ARIA label, `caption` tabel, navigasi keyboard, `prefers-reduced-motion` (`nextjs.org/docs/app/building-your-application/accessibility`).
11. **Performance** — Lazy loading, dynamic import untuk pustaka berat, hindari layout shift (CLS).
12. **TypeScript Conventions** — `strict`, tanpa `any`, tipe eksplisit (`tsconfig.json` proyek).

---

## Analisis Kepatuhan

| Standar | Status | Bukti (file:baris) |
| --- | --- | --- |
| Server Component default | ✅ | `media/page.tsx:1` — tidak ada `"use client"`; halaman murni Server Component |
| Pemisahan presentasi | ✅ | Komponen `AdminShell`, `AdminPageHeader`, `AdminTable`, `AdminButton` dipisah (`page.tsx:3-6`) |
| Metadata API | ✅ | `page.tsx:9-12` — `export const metadata` dengan `title`/`description` |
| TypeScript typed (no any) | ✅ | `MediaRow` di-`import type` (`page.tsx:7`), `render: (row: MediaRow)` (`page.tsx:18`) |
| Aksesibilitas ikon dekoratif | ✅ | `aria-hidden="true"` pada ikon (`page.tsx:23`); `ariaLabel` pada tombol (`page.tsx:43`) |
| Semantic HTML (tabel) | ✅ | `AdminTable` pakai `<table>` + `<caption>` + `scope="col"` (`AdminTable.tsx:36-48`) |
| next/image untuk pratinjau media | ❌ | `page.tsx:18-28` — hanya ikon Heroicons; tidak ada `<Image>`/pratinjau thumbnail media |
| Data fetching nyata | ❌ | `mediaList` diimpor dari mock statis (`page.tsx:7` → `admin-mock.ts:251`) |
| Upload via Server Action | ❌ | Tidak ada `actions.ts`, tidak ada `<form action={...}>`, tidak ada `revalidatePath` |
| Auth / route protection | ❌ | Tidak ada `middleware.ts`; tidak ada `auth()`/`redirect()` di mana pun (`grep` → NONE FOUND) |
| Routing integrity | ❌ | `page.tsx:43` merujuk `/admin/media/baru` yang **tidak ada** (folder hanya berisi `page.tsx`) |
| loading.tsx / error.tsx | ❌ | Tidak ada di segmen `admin/media` maupun `admin` |
| Tautan internal pakai next/link | ⚠️ | `AdminButton` pakai `<a href>` (`AdminButton.tsx:34`) bukan `next/link` |
| Dynamic vs static rendering | ⚠️ | Halaman statis (data mock) — belum `force-dynamic`; akan salah bila data nyata masuk |
| Suspense boundary | ⚠️ | Tidak ada `<Suspense>` untuk data asinkron di masa depan |
| Performance (thumbnails) | ⚠️ | Tanpa `next/image` + `sizes`, pratinjau di masa depan berisiko CLS/over-fetch |

---

## Temuan & Masalah

### 🔴 Kritis (harus diperbaiki sebelum rilis)

1. **Tidak ada proteksi autentikasi/otorisasi pada rute admin.**
   - *Severity:* Critical
   - *Lokasi:* `web/src/app/admin/media/page.tsx` (seluruh segmen `admin`), tidak ada `web/src/middleware.ts`.
   - *Dampak:* Rute `/admin/*` dapat diakses publik tanpa login. Ini adalah kebocoran keamanan parah untuk panel manajemen media.

2. **Tautan "Unggah Media" merujuk ke rute yang tidak ada (broken link).**
   - *Severity:* Critical (fungsional)
   - *Lokasi:* `page.tsx:43` → `href="/admin/media/baru"`.
   - *Dampak:* Klik tombol mengarah ke 404. Alur unggah media sama sekali belum dibangun.

3. **Tidak ada penanganan unggah berkas (Server Action / Route Handler).**
   - *Severity:* Critical (fungsional untuk media manager)
   - *Lokasi:* Tidak ada `actions.ts` atau `route.ts` di `app/admin/media`.
   - *Dampak:* Halaman hanya menampilkan daftar mock; tidak ada mekanisme mutasi, validasi, atau penyimpanan berkas.

### 🟡 Sedang

4. **Tidak ada `next/image` untuk pratinjau aset media.**
   - *Severity:* Medium
   - *Lokasi:* `page.tsx:18-28` hanya merender ikon tipe (`PhotoIcon`/`FilmIcon`), bukan pratinjau berkas.
   - *Dampak:* Pengelola media tidak melihat thumbnail; bila kelak ditambahkan tanpa `next/image`, berisiko CLS, over-fetch, dan kurang aksesibilitas (`alt`).

5. **Data di-*hardcode* dari mock statis (tidak ada single source of truth dinamis).**
   - *Severity:* Medium
   - *Lokasi:* `page.tsx:7` mengimpor `mediaList` dari `admin-mock.ts:251`.
   - *Dampak:* Sesuai konvensi AGENTS.md (§4.10 sentralisasi konten) ini boleh untuk mock, tetapi rute produksi wajib mengganti dengan fetch/DB + `revalidatePath`.

6. **Tautan internal menggunakan `<a href>` bukan `next/link`.**
   - *Severity:* Medium
   - *Lokasi:* `AdminButton.tsx:34`, `AdminSidebar.tsx:82`.
   - *Dampak:* Kehilangan prefetch, client-side navigation, dan penanganan scroll/recovery navigasi bawaan Next.js.

### 🟢 Ringan / Perlu persiapan

7. **Tidak ada `loading.tsx` / `error.tsx` / `Suspense`.**
   - *Severity:* Low
   - *Lokasi:* Segmen `admin/media` dan `admin`.
   - *Dampak:* Saat data asinkron nyata ditambahkan, tidak ada UX pemuatan/error yang konsisten.

8. **Rendering statis bukan `force-dynamic`.**
   - *Severity:* Low
   - *Lokasi:* `page.tsx` tidak mendeklarasikan `export const dynamic = "force-dynamic"`.
   - *Dampak:* Bila data diambil dari DB/session, halaman dapat ter-cache secara tidak tepat.

---

## Rekomendasi Perbaikan

### 1. Tambahkan proteksi rute (Middleware + verifikasi sesi)
Buat `web/src/middleware.ts` untuk melindungi seluruh segmen `/admin`:

```ts
import { NextRequest, NextResponse } from "next/server";
import { verifySession } from "@/lib/auth"; // implementasi auth (cookie/JWT)

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  if (pathname.startsWith("/admin")) {
    const session = await verifySession(req);
    if (!session) {
      const url = new URL("/login", req.url);
      url.searchParams.set("redirect", pathname);
      return NextResponse.redirect(url);
    }
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
```
Juga validasi sesi di setiap Server Action unggah (setiap Server Action adalah endpoint POST publik — `nextjs.org/docs`).

### 2. Perbaiki tautan rusak — bangun rute unggah
Buat `web/src/app/admin/media/baru/page.tsx` yang memuat form unggah (lihat rekomendasi 4). Hapus atau perbaiki `href` di `page.tsx:43` hanya setelah rute ada.

### 3. Gunakan `next/link` untuk navigasi internal
Di `AdminButton.tsx` dan `AdminSidebar.tsx`, ganti `<a href>` dengan `next/link`:

```tsx
import Link from "next/link";

// AdminButton.tsx (saat ada href)
if (href) {
  return (
    <Link href={href} className={className} aria-label={ariaLabel}>
      {children}
    </Link>
  );
}
```

### 4. Implementasikan unggah via Server Action dengan validasi
`web/src/app/admin/media/actions.ts`:

```ts
"use server";

import { revalidatePath } from "next/cache";
import { verifySession } from "@/lib/auth";

const MAX_SIZE = 10 * 1024 * 1024; // 10 MB
const ALLOWED = ["image/jpeg", "image/png", "image/webp", "video/mp4"];

export async function uploadMedia(prevState: { error: string | null; success: boolean }, formData: FormData) {
  const session = await verifySession(); // guard
  if (!session) return { error: "Tidak terautentikasi", success: false };

  const file = formData.get("file") as File | null;
  if (!file || file.size === 0) return { error: "Berkas kosong", success: false };
  if (file.size > MAX_SIZE) return { error: "Ukuran maksimal 10 MB", success: false };
  if (!ALLOWED.includes(file.type)) return { error: "Tipe berkas tidak didukung", success: false };

  // Simpan ke storage (jangan percaya file.type — cek magic bytes),
  // generate nama unik (crypto.randomUUID), tulis metadata ke DB.
  // ...

  revalidatePath("/admin/media");
  return { error: null, success: true };
}
```
Untuk berkas >10 MB (video `.mp4` di mock mencapai 62 MB), gunakan **presigned URL** (Route Handler) agar tidak membebani server — sesuai panduan 2026.

### 5. Tampilkan pratinjau dengan `next/image`
Di `AdminTable`/`page.tsx`, tambahkan kolom thumbnail:

```tsx
<Image
  src={row.thumbnailUrl}
  alt={`Pratinjau ${row.nama}`}
  width={48}
  height={48}
  sizes="48px"
  className="rounded-md object-cover"
/>
```
Untuk gambar remote, daftarkan hostname di `next.config.ts` → `images.remotePatterns` (AGENTS.md §4.8). Untuk `fill`, pastikan parent `position: relative` + tinggi eksplisit + `sizes`.

### 6. Tambahkan `loading.tsx` & `error.tsx`
`web/src/app/admin/media/loading.tsx`:
```tsx
export default function Loading() {
  return <p className="text-black/50">Memuat daftar media…</p>;
}
```
`web/src/app/admin/media/error.tsx` (harus `"use client"`):
```tsx
"use client";
export default function Error({ reset }: { error: Error; reset: () => void }) {
  return (
    <div role="alert">
      <p>Gagal memuat media.</p>
      <button onClick={reset}>Coba lagi</button>
    </div>
  );
}
```

### 7. Deklarasikan rendering dinamis
Bila data diambil dari DB/session, tambahkan di `page.tsx`:
```ts
export const dynamic = "force-dynamic";
```

### 8. Ganti mock dengan fetch + revalidasi (produksi)
Ganti impor `mediaList` (`page.tsx:7`) dengan:
```ts
const mediaList = await getMediaList(); // Server Component fetch
```
lalu `revalidatePath("/admin/media")` setelah mutasi unggah.

---

## Referensi

- Next.js — Server Actions & Mutations: `https://nextjs.org/docs/app/building-your-application/data-fetching/server-actions-and-mutations`
- Next.js — Image Component: `https://nextjs.org/docs/app/api-reference/components/image`
- Next.js — File Conventions (loading/error): `https://nextjs.org/docs/app/api-reference/file-conventions`
- Next.js — Authentication: `https://nextjs.org/docs/app/building-your-application/auth`
- Next.js — Accessibility: `https://nextjs.org/docs/app/building-your-application/accessibility`
- MakerKit — Next.js Server Actions Guide (2026): `https://makerkit.dev/blog/tutorials/nextjs-server-actions`
- Next.js File Upload (Server Actions vs Presigned URLs, 2026): `https://nextjslaunchpad.com/article/nextjs-file-uploads-server-actions-route-handlers-s3-presigned-urls-drag-and-drop`
- AGENTS.md proyek (§4.8 remotePatterns, §4.10 sentralisasi konten, §5 keamanan, §9 aksesibilitas)
- Kode yang diaudit: `web/src/app/admin/media/page.tsx`, `web/src/content/admin-mock.ts`, `web/src/components/admin/*`
