# Best Practice Audit: /admin/news (web/src/app/admin/news/page.tsx)

> Audit kepatuhan terhadap standar **Next.js 16 App Router** untuk halaman daftar CRUD admin.
> Dihasilkan secara otomatis oleh sesi audit (mode: RESEARCH + ANALYISIS + PENULISAN LAPORAN).
> Tanggal audit: 2026-07-20. Versi framework: Next.js 16.2.6, React 19.2.4, TypeScript 5 (`strict`).

---

## Ringkasan

Halaman `/admin/news` adalah halaman daftar (list) panel admin yang **bersih, server-rendered, dan taat pada prinsip Server Component**. Komponen `page.tsx` tidak membawa JavaScript klien sendiri, menyajikan metadata yang benar, serta mendelegasikan UI ke komponen presentasional (`AdminTable`, `AdminPageHeader`, `AdminButton`) yang sudah rapi. Namun, sebagai halaman admin CRUD, ia **belum memenuhi standar produksi** pada aspek paling kritis: **tidak ada proteksi rute (auth)**, data masih berasal dari **mock statis** (bukan data fetching nyata / Server Action), tautan navigasi menggunakan tag `<a>` biasa alih-alih `next/link`, dan tidak ada `loading.tsx`/`error.tsx` maupun `revalidate`/strategi rendering eksplisit.

**Rating: Cukup / Perlu Perbaikan (Production-Not-Ready pada aspek keamanan & data).**

**Skor: 58 / 100**
- Server/Client boundary: baik (+15)
- Metadata & a11y dasar: baik (+12)
- TypeScript & struktur: baik (+10)
- Navigasi `next/link`: kurang (−10)
- Auth/route protection: kritis, tidak ada (−25)
- Data fetching nyata / Server Action: tidak ada (−10)
- Loading/error boundaries & dynamic rendering: tidak ada (−10)
- (Sisa poin netral/tidak relevan)

---

## Standar Next.js yang Direview

Standar berikut diambil dari dokumentasi resmi `nextjs.org/docs` (App Router, Next.js 16) dan praktik produksi 2026 (Server Actions, middleware/`proxy.ts`, streaming). Fokus difilter untuk **halaman admin list/CRUD**:

1. **Server vs Client Components** — Default Server Component; `"use client"` hanya di komponen daun yang butuh interaktivitas.
2. **Data Fetching & Mutations** — Async Server Component untuk baca data; **Server Actions** (`"use server"`) untuk mutasi (create/update/delete) dari form.
3. **Route Protection / Auth** — Proteksi rute admin via `middleware`/`proxy.ts` (Next.js 16 mengganti `middleware.ts` → `proxy.ts`, `middleware` → `proxy`) atau guard di level Server Component.
4. **Metadata API** — `export const metadata` untuk title/description SEO & aksesibilitas.
5. **Navigasi** — `next/link` (bukan `<a href>`) untuk client-side navigation & prefetch.
6. **Loading / Error Boundaries** — `loading.tsx` (Suspense/streaming) dan `error.tsx` per segmen rute.
7. **Dynamic vs Static Rendering & Revalidation** — `export const dynamic`, `revalidate`, `cache` untuk kontrol render data sensitif/admin.
8. **Accessibility & Semantic HTML** — `aria-label`, caption tabel, heading hierarki, focus ring.
9. **Performance & next/image** — optimasi gambar bila ada aset visual.
10. **TypeScript Conventions** — `strict`, tanpa `any`, tipe eksplisit untuk props/kontrak data.

---

## Analisis Kepatuhan

| # | Standar | Status | Bukti (file:baris) |
|---|---------|--------|--------------------|
| 1 | Server Component (default, tanpa `"use client"`) | ✅ | `page.tsx:22` — `export default function AdminBeritaPage()` tanpa `"use client"`; komponen murni presentasional. |
| 2 | Pemisahan Client boundary (`AdminShell` `"use client"`) | ✅ | `AdminShell.tsx:1` mendeklarasikan `"use client"` hanya untuk drawer mobile; page tetap Server Component. |
| 3 | Data fetching nyata (async server) / sumber data | ❌ | `page.tsx:7,37` mengimpor `beritaList` dari mock statis `src/content/admin-mock.ts:154` — bukan `await fetch`/DB. Tidak ada `async` di page. |
| 4 | Server Actions untuk mutasi | ❌ | Tidak ada `"use server"` di mana pun di `src/` (grep kosong). `baru/page.tsx:29` hanya `console.log` + `router.push`. |
| 5 | Route protection / Auth | ❌ | Tidak ada `middleware.ts`/`proxy.ts` maupun guard auth di `src/` (grep `auth/session/proxy` kosong). Rute `/admin/*` terbuka. |
| 6 | Metadata API | ✅ | `page.tsx:9-12` — `export const metadata: Metadata` dengan title & description Bahasa Indonesia. |
| 7 | Navigasi `next/link` | ❌ | `AdminButton.tsx:34` merender `<a href={href}>` (bukan `<Link>`). Digunakan di `page.tsx:30` untuk "Tambah Berita". |
| 8 | `loading.tsx` / `error.tsx` | ❌ | Tidak ada `admin/news/loading.tsx` maupun `admin/news/error.tsx` (ls kosong). |
| 9 | Dynamic rendering / revalidate eksplisit | ⚠️ | Page statis (mock) tanpa `export const dynamic = "force-dynamic"`. Bila kelak pakai data live admin, butuh `force-dynamic`/revalidate. |
| 10 | Semantic HTML & a11y tabel | ✅ | `AdminTable.tsx:36-38` `<caption className="sr-only">`, `th scope="col"` (`AdminTable.tsx:44`), `aria-hidden` ikon (`StatusBadge.tsx`). |
| 11 | ARIA pada kontrol ikon | ✅ | `page.tsx:30` `ariaLabel="Tambah berita"` diteruskan ke `<a aria-label>` (`AdminButton.tsx:34`). |
| 12 | TypeScript strict / tanpa `any` | ✅ | Tipe eksplisit `BeritaRow` (`admin-mock.ts:52-59`), `AdminColumn<T>` generik (`AdminTable.tsx:5-11`). |
| 13 | Centralized content (mock) | ✅ | Data disentralisasi di `src/content/admin-mock.ts` sesuai aturan proyek (Single Source of Truth). |
| 14 | `next/image` / performa aset | N/A | Halaman list tidak menampilkan gambar; tidak relevan. |
| 15 | Standard container width | ✅ | `AdminShell.tsx:23` sudah `max-w-[1600px] mx-auto px-4 md:px-8` sesuai `.cursorrules`. |

---

## Temuan & Masalah

| Severity | Masalah | Lokasi | Penjelasan |
|----------|---------|--------|------------|
| 🔴 Critical | **Tidak ada proteksi rute admin** | `src/` (tidak ada `proxy.ts`/`middleware.ts`); `page.tsx` | Rute `/admin/news` dan seluruh `/admin/*` dapat diakses publik tanpa autentikasi/otorisasi. Ini kerentanan keamanan terbesar untuk halaman CRUD. |
| 🔴 Critical | **Data mock, bukan fetching nyata** | `page.tsx:7,37`; `admin-mock.ts:154` | `beritaList` statis; page tidak `async` dan tidak `await` sumber data. Daftar tidak mencerminkan data sesungguhnya & tidak akan berubah saat mutasi. |
| 🟠 High | **Mutasi tidak melalui Server Action** | `baru/page.tsx:29-33` | `handleSimpan` hanya `console.log` + `router.push`. Tidak ada penulisan data/validasi/Server Action; data tidak persisten. |
| 🟠 High | **Navigasi pakai `<a>` bukan `next/link`** | `AdminButton.tsx:32-37` | Kehilangan client-side navigation, prefetch, dan penanganan `Link` yang optimal; memicu full reload. |
| 🟡 Medium | **Tidak ada `loading.tsx`/`error.tsx`** | `admin/news/` | Tanpa boundary, kegagalan fetch/server akan merusak seluruh segmen; tidak ada UX streaming/skeleton untuk data admin. |
| 🟡 Medium | **Rendering statis tanpa `dynamic` eksplisit** | `page.tsx` | Bila data live ditambahkan, komponen dapat ter-*cache* statis dan menampilkan data kedaluwarsa ke admin. Perlu `force-dynamic`/`revalidate`. |
| 🟢 Low | **Pagination/search/filter belum ada** | `AdminTable` / `page.tsx` | Daftar panjang butuh paginasi atau pencarian; saat ini menampilkan semua baris sekaligus (masalah skalabilitas, bukan pelanggaran standar). |

---

## Rekomendasi Perbaikan

### 1. Proteksi rute admin (CRITICAL)
Tambahkan `src/proxy.ts` (Next.js 16 mengganti `middleware.ts` → `proxy.ts`, fungsi `middleware` → `proxy`) untuk memblokir akses `/admin/*` tanpa sesi.

```ts
// src/proxy.ts  (Next.js 16: formerly middleware.ts)
import { NextResponse, type NextRequest } from "next/server";

const PROTECTED = ["/admin/:path*"];

export function proxy(req: NextRequest) {
  const token = req.cookies.get("session")?.value;
  if (!token && req.nextUrl.pathname.startsWith("/admin")) {
    const url = req.nextUrl.clone();
    url.pathname = "/login";
    url.searchParams.set("redirect", req.nextUrl.pathname);
    return NextResponse.redirect(url);
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
```
> Catatan: validasi token harus dilakukan dengan lib edge-compatible (mis. `jose`), bukan `jsonwebtoken`.

### 2. Data fetching nyata di Server Component (HIGH)
Jadikan page `async` dan ambil data dari sumber nyata (DB/Route Handler), bukan mock.

```tsx
// web/src/app/admin/news/page.tsx
export const dynamic = "force-dynamic"; // data admin selalu segar

export default async function AdminBeritaPage() {
  const beritaList = await getBeritaList(); // server-only fetch
  // ...render sama, tapi pakai data asli
}
```

### 3. Server Action untuk mutasi (HIGH)
Ganti `console.log` di `baru/page.tsx` dengan Server Action + `useActionState` + validasi Zod.

```ts
// web/src/app/admin/news/actions.ts
"use server";
import { z } from "zod";
import { revalidatePath } from "next/cache";

const schema = z.object({
  judul: z.string().min(3),
  kategori: z.enum(["Budaya", "Event", "Infrastruktur", "Pengumuman"]),
  penulis: z.string().min(1),
  status: z.enum(["Draft", "Published"]),
});

export async function createBerita(prev: unknown, formData: FormData) {
  const parsed = schema.safeParse(Object.fromEntries(formData));
  if (!parsed.success) return { error: parsed.error.flatten().fieldErrors };
  await db.berita.create(parsed.data); // cek auth di sini juga!
  revalidatePath("/admin/news");
  return { ok: true };
}
```
Panggil via `<form action={formAction}>` di client component, bukan `router.push` mentah.

### 4. Gunakan `next/link` untuk navigasi (HIGH)
Perbaiki `AdminButton` agar meneruskan `href` ke `<Link>`.

```tsx
// web/src/components/admin/AdminButton.tsx
import Link from "next/link";
// ...
if (href) {
  return (
    <Link href={href} className={className} aria-label={ariaLabel}>
      {children}
    </Link>
  );
}
```

### 5. Tambahkan `loading.tsx` & `error.tsx` (MEDIUM)
```tsx
// web/src/app/admin/news/loading.tsx
export default function Loading() {
  return <p className="text-black/50 text-sm">Memuat daftar berita…</p>;
}

// web/src/app/admin/news/error.tsx
"use client";
export default function Error({ reset }: { reset: () => void }) {
  return (
    <div className="text-center py-10">
      <p className="text-black/60 mb-3">Gagal memuat data berita.</p>
      <button onClick={reset} className="btn-cta">Coba lagi</button>
    </div>
  );
}
```

### 6. Eksplisitkan rendering (MEDIUM)
Untuk data admin yang dinamis, tetapkan `export const dynamic = "force-dynamic";` (lihat rekomendasi #2) agar tidak ter-*cache* statis secara tidak sengaja.

---

## Referensi

- Next.js Docs — [Server Components](https://nextjs.org/docs/app/building-your-application/rendering/server-components)
- Next.js Docs — [Server Actions](https://nextjs.org/docs/app/building-your-application/data-fetching/server-actions-and-mutations)
- Next.js Docs — [Metadata](https://nextjs.org/docs/app/building-your-application/optimizing/metadata)
- Next.js Docs — [Linking and Navigating (`next/link`)](https://nextjs.org/docs/app/building-your-application/routing/linking-and-navigating)
- Next.js Docs — [Loading UI and Streaming (`loading.tsx`)](https://nextjs.org/docs/app/building-your-application/routing/loading-ui-and-streaming)
- Next.js Docs — [Error Handling (`error.tsx`)](https://nextjs.org/docs/app/building-your-application/routing/error-handling)
- Next.js Docs — [Middleware (Next.js 16: `proxy.ts`)](https://nextjs.org/docs/app/building-your-application/routing/middleware)
- Authgear — [Next.js Middleware Authentication (2026, noting `proxy.ts` rename)](https://www.authgear.com/post/nextjs-middleware-authentication/)
- MakerKit — [Next.js Server Actions: The Complete Guide (2026)](https://makerkit.dev/blog/tutorials/nextjs-server-actions)
- Keval Lad — [Next.js Server Actions Security Best Practices (2026)](https://www.keval.site/blog/nextjs-server-actions-security)
- Adam Arant — [Next.js Server Actions security: 13 advisories and 2026 fixes](https://adamarant.com/en/blog/nextjs-server-actions-security-middleware-auth-and-2026-fixes)

---
*Catatan auditor: Laporan ini hanya mengaudit dan menulis dokumen; tidak ada file sumber (`*.tsx`/`*.ts`) yang dimodifikasi.*
