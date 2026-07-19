# Best Practice Audit: /admin/umkm (web/src/app/admin/umkm/page.tsx)

> Laporan audit kepatuhan *best practice* Next.js 16 (App Router) untuk halaman panel admin `/admin/umkm`.
> Framework: Next.js 16.2.6, React 19.2.4, TypeScript 5 (strict).
> Tanggal audit: 2026-07-20.

---

## Ringkasan

Halaman `web/src/app/admin/umkm/page.tsx` (43 baris) adalah **Server Component statis** yang sangat bersih dan konsisten dengan konvensi App Router untuk presentasi: tidak ada `"use client"` yang tidak perlu, memanfaatkan `metadata` ekspor, tipe eksplisit tanpa `any`, serta komponen anak (`AdminTable`, `AdminPageHeader`) yang juga *server-rendered*. Secara struktural ini contoh yang baik.

Namun, sebagai halaman **CRUD admin**, halaman ini masih berupa **prototype berbasis data mock statis** dan **belum memenuhi standar produksi** Next.js 16 untuk halaman admin: tidak ada proteksi rute (auth/middleware), tidak ada `loading.tsx`/`error.tsx`, belum ada Server Actions atau data fetching asinkron, dan navigasi masih menggunakan `<a href>` (bukan `next/link`). Mock diimpor langsung (`umkmList` dari `@/content/admin-mock`), sehingga halaman ter-*static-render* dengan data yang tidak pernah berubah — tidak sesuai untuk data UMKM nyata yang butuh `dynamic`/`no-store`.

**Rating: BAIK SEBAGAI PROTOTYPE, BELUM PRODUKSI-READY (ADMIN CRUD).**

**Skor kepatuhan: 58 / 100**

| Kategori | Skor |
| --- | --- |
| Server/Client boundaries | 9/10 |
| Metadata API | 9/10 |
| TypeScript conventions | 9/10 |
| Semantic HTML & Accessibility | 7/10 |
| Data fetching / Server Actions | 2/15 |
| Auth / Route protection | 0/10 |
| Loading/Error/Suspense | 0/10 |
| Routing (next/link) | 1/6 |
| Performance (caching/revalidation) | 1/10 |
| Rendering mode correctness | 0/10 |

---

## Standar Next.js yang Direview

Berikut standar Next.js 16 App Router yang diaudit (sumber: `nextjs.org/docs/app`, dokumen lokal `web/node_modules/next/dist/docs/01-app/`, dan panduan `AGENTS.md` proyek):

1. **Server vs Client Components** — Komponen default adalah Server Component; `"use client"` hanya untuk yang butuh interaktivitas. (docs `05-server-and-client-components.md`)
2. **Data Fetching di Server** — Gunakan `async` Server Component + `fetch`/query langsung; deduplikasi via `React.cache`. (docs `06-fetching-data.md`)
3. **Server Actions & Mutations** — Mutasi (tambah/edit/hapus) lewat Server Action, bukan fetch client manual. (docs `07-mutating-data.md`)
4. **Caching & Revalidation** — Kontrol `cache: 'no-store'` / `revalidate` untuk data dinamis. (docs `06-fetching-data.md`)
5. **Metadata API** — Ekspor `metadata`/`generateMetadata`. (docs `14-metadata-and-og-images.md`)
6. **next/link** — Navigasi antar-rute pakai `<Link>`, bukan `<a href>`. (docs `04-linking-and-navigating.md`)
7. **next/image** — Gambar pakai `Image`. (docs `12-images.md`) — N/A untuk halaman ini.
8. **next/font** — Font via `next/font`. (docs `13-fonts.md`) — N/A (sudah di layout).
9. **Loading / Error / Suspense** — Sediakan `loading.tsx`, `error.tsx`, streaming. (docs `06-fetching-data.md` streaming).
10. **Route Segment Config & Dynamic vs Static** — `export const dynamic = 'force-dynamic'` bila perlu; pahami kapan render statis vs dinamis.
11. **Auth / Route Protection** — Lindungi rute admin via Middleware/`auth()` di layout. (docs `02-guides/authentication.md`)
12. **Accessibility & Semantic HTML** — `aria-label`, struktur tabel semantik, skip link, `prefers-reduced-motion`. (panduan `AGENTS.md` §9)
13. **TypeScript Conventions** — `strict: true`, tanpa `any`, tipe eksplisit. (`AGENTS.md` §7.1)
14. **App Router Conventions** — File khusus (`layout.tsx`, `loading.tsx`, `error.tsx`), colocation, alias `@/*`.

---

## Analisis Kepatuhan

| # | Standar | Status | Bukti (file:baris) |
| --- | --- | --- | --- |
| 1 | Server/Client boundary | ✅ | `page.tsx:22` Server Component; `"use client"` hanya di `AdminShell`/`AdminSidebar`/`AdminTopbar` yang memang butuh state (`AdminShell.tsx:1`, `AdminSidebar.tsx:1`). |
| 2 | Data fetching di Server | ❌ | Tidak ada `async`/fetch. Data diimpor statis dari mock: `page.tsx:7` `import { umkmList } from "@/content/admin-mock"`. Tidak ada query nyata. |
| 3 | Server Actions / Mutations | ❌ | Tombol "Tambah UMKM" hanya navigasi (`page.tsx:30`), tidak memanggil Server Action. Tidak ada file `action.ts`/`actions.ts`. |
| 4 | Caching & Revalidation | ❌ | Data mock statis → *static render* tanpa `no-store`/`revalidate`. Tidak ada kontrol cache sama sekali. |
| 5 | Metadata API | ✅ | `page.tsx:9-12` `export const metadata: Metadata` dengan title & description (sesuai `AGENTS.md` §1 Bahasa Indonesia). |
| 6 | next/link | ❌ | Navigasi pakai `<a href>` di `AdminButton.tsx:34` dan `AdminSidebar.tsx:83`; bukan `<Link>` dari `next/link`. |
| 7 | next/image | N/A | Tidak ada gambar di halaman ini. |
| 8 | next/font | ✅ | Font akses via CSS var `var(--font-sans)`/`var(--font-serif)` (inherit dari root layout). |
| 9 | Loading/Error/Suspense | ❌ | Tidak ada `web/src/app/admin/umkm/loading.tsx` maupun `error.tsx`. (struktur direktori hanya `page.tsx`). |
| 10 | Route Segment Config (dynamic) | ❌ | Tidak ada `export const dynamic`. Dengan data mock, halaman *static* — salah untuk data admin yang harus dinamis. |
| 11 | Auth / Route Protection | ❌ | Tidak ada `middleware.ts`, tidak ada `admin/layout.tsx` dengan `auth()`, tidak ada pemeriksaan sesi. Halaman admin dapat diakses publik. |
| 12 | Accessibility & Semantic HTML | ⚠️ | `AdminTable` pakai `<table>/<th scope="col">/<caption class="sr-only">` (baik, `AdminTable.tsx:36-49`). Tapi: `AdminButton` pakai `<a>` tanpa `next/link`; tidak ada skip-link di level halaman ini; tidak ada `aria-live`/status untuk tabel. |
| 13 | TypeScript conventions | ✅ | Tipe eksplisit: `UmkmRow`, `AdminColumn<UmkmRow>` (`page.tsx:5,14`); `strict` tanpa `any`; `import type` dipakai (`page.tsx:1`). |
| 14 | App Router conventions | ⚠️️ | Colocation & alias `@/*` benar (`page.tsx:3-7`). Tapi tidak ada `admin/layout.tsx` (shell di-*render* ulang tiap halaman), dan tidak ada file `loading.tsx`/`error.tsx`. |

---

## Temuan & Masalah

| Severity | Masalah | Lokasi |
| --- | --- | --- |
| 🔴 CRITICAL | **Tidak ada proteksi rute/auth.** Halaman admin `/admin/umkm` dapat diakses siapa pun tanpa login. Tidak ada `middleware.ts` maupun `auth()` di layout. | `web/src/app/admin/umkm/page.tsx` (keseluruhan); tidak ada `web/src/middleware.ts`; tidak ada `web/src/app/admin/layout.tsx` |
| 🔴 CRITICAL | **Data mock statis, bukan data nyata.** `umkmList` diimpor dari `@/content/admin-mock.ts` → halaman *static-render* dengan data yang tak pernah berubah. Tidak ada `fetch`/query/Server Action. | `page.tsx:7`, `page.tsx:37`; `admin-mock.ts:165` |
| 🟠 HIGH | **Menggunakan `<a href>` bukan `<Link>`** — kehilangan *client-side navigation*, prefetch, dan penanganan `prefers-reduced-motion`/scroll restoration Next.js. | `AdminButton.tsx:34`, `AdminSidebar.tsx:83` |
| 🟠 HIGH | **Tidak ada `loading.tsx` / `error.tsx`** untuk segment admin/umkm. Bila nanti data di-fetch async, tidak ada UX *streaming*/boundary error. | direktori `web/src/app/admin/umkm/` hanya berisi `page.tsx` |
| 🟠 HIGH | **Tidak ada `admin/layout.tsx`** — `AdminShell` (dengan sidebar/topbar) di-*render* ulang dan di-*pass* sebagai children di tiap halaman admin, bukan di-share via layout tersarang. Menghambat sharing UI & proteksi rute terpusat. | tidak ada `web/src/app/admin/layout.tsx` |
| 🟡 MEDIUM | **Mode render salah untuk CRUD admin.** Tanpa `export const dynamic = 'force-dynamic'` (atau fetch `no-store`), data berisiko di-*cache* statis saat produksi. | `page.tsx` (tidak ada segment config) |
| 🟡 MEDIUM | **Tidak ada Server Actions untuk mutasi.** Alur "Tambah UMKM" hanya navigasi ke `/admin/umkm/baru`; belum ada pola mutasi deklaratif Next.js 16. | `page.tsx:29-33`; tidak ada `actions.ts` |
| 🟡 MEDIUM | **Tidak ada skip-link / fokus ke konten utama** di level halaman admin (`#main-content`), padahal `AGENTS.md` §9 mewajibkannya. | `page.tsx` / `AdminShell.tsx` |
| 🟢 LOW | **Tabel tanpa `aria-live`/region** untuk mengumumkan perubahan data (mis. setelah mutasi). `caption` `sr-only` sudah ada tapi sifatnya statis. | `AdminTable.tsx:36-37` |
| 🟢 LOW | **Kolom `updateTerakhir`** adalah `string` ("12 Jul 2026") daripada `Date` — kurang ideal untuk sorting/internationalization di masa depan. | `admin-mock.ts:49`, `:105-170` |

---

## Rekomendasi Perbaikan

### 1. Proteksi rute dengan Middleware (CRITICAL)
Buat `web/src/middleware.ts` untuk melindungi seluruh grup `/admin`:

```ts
// web/src/middleware.ts
import { NextResponse, type NextRequest } from "next/server";

const PROTECTED = ["/admin"];

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const isProtected = PROTECTED.some(
    (p) => pathname === p || pathname.startsWith(`${p}/`)
  );
  if (!isProtected) return NextResponse.next();

  const token = req.cookies.get("session")?.value;
  if (!token) {
    const url = req.nextUrl.clone();
    url.pathname = "/login";
    url.searchParams.set("callbackUrl", pathname);
    return NextResponse.redirect(url);
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
```

### 2. Pindahkan shell ke `admin/layout.tsx` + data fetching (CRITICAL/HIGH)
Gunakan layout tersarang agar shell & auth dicek sekali, dan fetch data asinkron:

```tsx
// web/src/app/admin/layout.tsx
import { redirect } from "next/navigation";
import AdminShell from "@/components/admin/AdminShell";
import { getSessionUser } from "@/lib/auth";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getSessionUser();
  if (!user) redirect("/login");

  return <AdminShell adminName={user.name}>{children}</AdminShell>;
}
```

```tsx
// web/src/app/admin/umkm/page.tsx (potongan)
import { getUmkmList } from "@/lib/queries/umkm";

export const dynamic = "force-dynamic"; // data admin selalu fresh

export default async function AdminUmkmPage() {
  const umkmList = await getUmkmList(); // query nyata (DB/API)
  // ...render AdminTable rows={umkmList}
}
```

### 3. Ganti `<a href>` dengan `<Link>` (HIGH)
Di `AdminButton.tsx` dan `AdminSidebar.tsx`, gunakan `next/link`:

```tsx
// AdminButton.tsx
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

```tsx
// AdminSidebar.tsx
import Link from "next/link";
// ...
<Link href={item.href} aria-current={aktif ? "page" : undefined} className={...}>
```

### 4. Tambahkan `loading.tsx` & `error.tsx` (HIGH)
```tsx
// web/src/app/admin/umkm/loading.tsx
export default function Loading() {
  return (
    <div className="animate-pulse space-y-4" aria-busy="true" aria-label="Memuat data UMKM">
      <div className="h-10 w-48 rounded bg-black/10" />
      <div className="h-64 w-full rounded-lg-design bg-black/5" />
    </div>
  );
}
```

```tsx
// web/src/app/admin/umkm/error.tsx
"use client";
import { useEffect } from "react";

export default function Error({ error, reset }: { error: Error; reset: () => void }) {
  useEffect(() => { console.error(error); }, [error]);
  return (
    <div role="alert" className="rounded-lg-design border border-red-300 bg-red-50 p-6">
      <p className="font-semibold text-red-800">Gagal memuat data UMKM.</p>
      <button onClick={reset} className="btn-cta mt-3">Coba lagi</button>
    </div>
  );
}
```

### 5. Gunakan Server Action untuk mutasi (MEDIUM)
Untuk tombol aksi baris (edit/hapus) dan form "Tambah UMKM", deklarasikan Server Action:

```tsx
// web/src/app/admin/umkm/actions.ts
"use server";
import { revalidatePath } from "next/cache";
import { deleteUmkm } from "@/lib/queries/umkm";

export async function hapusUmkm(id: string) {
  await deleteUmkm(id);
  revalidatePath("/admin/umkm");
}
```

```tsx
// pada baris tabel (AdminTable render):
<form action={hapusUmkm.bind(null, row.id)}>
  <button type="submit" aria-label={`Hapus ${row.nama}`} className="btn-cta">Hapus</button>
</form>
```

### 6. Skip-link & aksesibilitas (MEDIUM)
Tambahkan di `AdminShell.tsx` (atau root layout admin):

```tsx
<a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:z-50 focus:top-2 focus:left-2 focus:bg-white focus:px-3 focus:py-2 rounded">
  Lewati ke konten utama
</a>
<main id="main-content">{children}</main>
```

### 7. Jangan hardcode data mock di komponen produksi (LOW)
Pindahkan `umkmList` ke layer query (`@/lib/queries/umkm.ts`) dengan `React.cache`, dan ubah tipe `updateTerakhir` ke `Date` bila memungkinkan untuk sorting/i18n.

---

## Referensi

- Next.js Docs — Server and Client Components: `web/node_modules/next/dist/docs/01-app/01-getting-started/05-server-and-client-components.md`
- Next.js Docs — Fetching Data: `web/node_modules/next/dist/docs/01-app/01-getting-started/06-fetching-data.md`
- Next.js Docs — Mutating Data (Server Actions): `web/node_modules/next/dist/docs/01-app/01-getting-started/07-mutating-data.md`
- Next.js Docs — Linking and Navigating: `web/node_modules/next/dist/docs/01-app/01-getting-started/04-linking-and-navigating.md`
- Next.js Docs — Metadata: `web/node_modules/next/dist/docs/01-app/01-getting-started/14-metadata-and-og-images.md`
- Next.js Docs — Authentication: `web/node_modules/next/dist/docs/01-app/02-guides/authentication.md`
- Next.js Docs — Data Security: `web/node_modules/next/dist/docs/01-app/02-guides/data-security.md`
- Next.js Docs (online): https://nextjs.org/docs/app — "Server Functions", "Route Segment Config", "Loading UI and Streaming"
- Panduan proyek `AGENTS.md` (web/): §1 Bahasa, §4 Arsitektur, §7 Koding, §9 Aksesibilitas.
- Kode yang diaudit:
  - `web/src/app/admin/umkm/page.tsx`
  - `web/src/components/admin/AdminShell.tsx`, `AdminSidebar.tsx`, `AdminTopbar.tsx`, `AdminTable.tsx`, `AdminButton.tsx`, `AdminPageHeader.tsx`
  - `web/src/content/admin-mock.ts`
