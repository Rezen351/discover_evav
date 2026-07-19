# Best Practice Audit: /admin (web/src/app/admin/page.tsx)

> Auditor: Next.js 16 App Router Expert
> Tanggal: 2026-07-20
> Target: `web/src/app/admin/page.tsx` (route `/admin` — dashboard admin CMS "Simfoni Evav")
> Versi: Next.js 16.2.6, React 19.2.4, TypeScript 5.

---

## Ringkasan

Halaman `/admin` ditulis sebagai **Server Component** murni dengan Metadata API yang benar, struktur HTML semantik yang baik (`section`, `h1`–`h4`, `aria-label`, `caption` pada tabel), dan komponen pembungkus (`AdminShell`) yang memisahkan concern interaktif (drawer sidebar) ke Client Component terpisah. Ini adalah fondasi arsitektur yang sehat.

Namun, sebagai **dashboard admin**, halaman ini gagal di aspek paling kritis: **tidak ada proteksi autentikasi/otorisasi sama sekali** (tidak ada `middleware`/`proxy.ts`, tidak ada Data Access Layer, tidak ada pengecekan sesi), konten bersifat **statis mock** tanpa data fetching asli, dan tidak ditandai `force-dynamic` padahal berisi data sensitif yang seharusnya selalu segar. Navigasi internal juga masih menggunakan `<a href>` alih-alih `next/link`, tidak konsisten dengan sisa kodebasis.

**Rating: ⚠️ Perlu Perbaikan Signifikan (terutama keamanan).**

**Skor Kepatuhan: 48/100** — arsitektur komponen & aksesibilitas bagus, tetapi keamanan (auth) dan data-fetching praktis absen, yang merupakan syarat mutlak untuk halaman admin.

---

## Standar Next.js yang Direview

Referensi praktik terbaik diambil dari dokumentasi resmi `nextjs.org/docs` (App Router, Metadata, Data Fetching, Caching, `loading.tsx`/`error.tsx`, `next/link`, `next/image`, `next/font`) serta panduan keamanan App Router 2026 (model autentikasi berlapis: Data Access Layer + Server Components + proxy.ts opsional, dan perlindungan Server Action/Route Handler). Standar yang diaudit:

1. **Server vs Client Component boundary** — meminimalkan JS klien, `"use client"` hanya pada komponen daun yang butuh interaktivitas.
2. **Data fetching** — Server Component `async`, `fetch` dengan caching/revalidasi eksplisit, atau DAL.
3. **Route segment config & rendering** — `force-dynamic`/`revalidate` untuk konten sensitif/selalu-baru.
4. **Autentikasi & otorisasi** — perlindungan rute admin (proxy.ts + verifikasi di Server Component/DAL), defense-in-depth.
5. **Metadata API** — `metadata` ekspor.
6. **Navigasi** — `next/link` untuk navigasi internal (prefetch, tidak full-reload).
7. **Aksesibilitas & HTML semantik** — landmark, heading order, ARIA, skip link.
8. **UX error/loading** — `error.tsx`, `loading.tsx`, `Suspense`.
9. **TypeScript & konvensi** — strict typing, alias `@/*`, tanpa `any`.
10. **Styling & performa** — Tailwind utilitas, `next/image`, meminimalkan client bundle.

---

## Analisis Kepatuhan

| Standar | Status | Bukti (file:line) |
|---|---|---|
| Server Component (default) | ✅ | `page.tsx:57` `export default function AdminDashboardPage()` tanpa `"use client"` |
| Pemisahan client boundary (`AdminShell`) | ✅ | `AdminShell.tsx:1` `"use client"` hanya untuk state drawer; page tetap server |
| Metadata API | ✅ | `page.tsx:18-21` `export const metadata: Metadata` |
| TypeScript strict / tanpa `any` | ✅ | Tipe eksplisit di `admin-mock.ts` (`UmkmRow`, `BeritaRow`, dll.); props `AdminColumn<UmkmRow>` `page.tsx:23` |
| Alias `@/*` | ✅ | Import `@/components/admin/...`, `@/content/admin-mock` di `page.tsx:3-16` |
| HTML semantik & ARIA | ✅ | `section aria-label` (`page.tsx:74`), `caption` tabel (`page.tsx:122,135`), heading `h1`–`h4` konsisten |
| Data fetching asli (async server) | ❌ | Tidak ada `async`/`fetch`; data dari mock statis `admin-mock.ts` (`page.tsx:7-16`) |
| Route segment config (dynamic) | ❌ | Tidak ada `export const dynamic = "force-dynamic"` meski dashboard admin |
| Autentikasi/otorisasi rute | ❌ | Tidak ada `proxy.ts`/`middleware.ts`; tidak ada `verifySession`/DAL di mana pun (`grep` auth → 0 hasil di admin) |
| Navigasi `next/link` | ❌ | `<a href="/admin/umkm">` (`page.tsx:118`), `<a href="/admin/news">` (`page.tsx:131`); `AdminButton.tsx:34` juga `<a href>` |
| `error.tsx` / `loading.tsx` / `Suspense` | ⚠️ | Tidak ada `admin/loading.tsx` atau `admin/error.tsx`; relevan saat data asli ditambahkan |
| `next/image` | N/A | Halaman tidak menampilkan gambar (chart pakai div CSS, `admin-mock.ts:137`) |
| `next/font` | ✅ | Menggunakan `--font-serif`/`--font-sans` terpusat (`page.tsx:64,84,93,115,128`) yang di-set di `layout.tsx:10-15` |
| Container width standar | ⚠️ | Wrapper lebar di `AdminShell.tsx:23` (`max-w-[1600px] mx-auto`) sudah benar; tapi section di page tidak pakai `max-w-[98%]` seperti konvensi `.cursorrules` (bersifat kosmetik) |

---

## Temuan & Masalah

### 🔴 High — Kritis

**H1. Tidak ada proteksi autentikasi/otorisasi pada rute admin.**
- Lokasi: `web/src/app/admin/page.tsx` (seluruh rute `/admin` dan sub-rute `umkm`, `news`, `products`, `destinations`, `events`, `media`, `settings`).
- Bukti: Tidak ada `proxy.ts`/`middleware.ts` di root proyek (`find` → 0 hasil), tidak ada pemanggilan `verifySession()`/cek cookie di `page.tsx`, dan `grep` kata `auth|session|cookie` di `src/` tidak menemukan logika proteksi di area admin.
- Dampak: Siapa pun yang mengetahui URL `/admin` dapat mengakses dashboard CMS (dan, saat Route Handler `/api/admin/*` dibuat, data sensitif) tanpa login. Ini adalah kerentanan akses tidak sah (broken access control).
- Standar 2026: Next.js 16 menuntut **defense-in-depth** — proteksi opsional di `proxy.ts` (UX redirect) **ditambah** verifikasi sesi di Server Component/DAL sebelum menampilkan/memuat data. Mengandalkan hanya satu lapisan tidak cukup; CVE-2025-29927 dan CVE-2026-44574 membuktikan proxy bisa dibypass.

**H2. Tidak ada data fetching asli; konten statis mock.**
- Lokasi: `page.tsx:7-16` mengimpor `adminStats`, `umkmTerbaru`, `beritaTerbaru`, `aktivitasTerbaru`, `visitorMingguan` dari `admin-mock.ts`.
- Dampak: Dashboard tidak menampilkan data nyata dan tidak memiliki jalur pengambilan data (DAL/`fetch`) yang kelak harus diproteksi. Status "CMS siap terhubung ke Route Handler" (`page.tsx:139`) menunjukkan ini baru kerangka; namun tanpa DAL, saat dihubungkan nanti rawan dilupakan pengecekan auth (lihat H1).

### 🟠 Medium

**M1. Rute tidak ditandai `force-dynamic`.**
- Lokasi: `web/src/app/admin/page.tsx` (tidak ada `export const dynamic`).
- Dampak: Sebagai dashboard yang berisi data yang berubah (statistik, aktivitas terbaru), halaman berisiko di-cache statis (terutama saat kelak menggunakan `fetch` tanpa opsi `cache: "no-store"`/`next: { revalidate }`). Untuk area admin, `force-dynamic` atau `cache: "no-store"` adalah praktik yang disarankan.

**M2. Navigasi internal menggunakan `<a href>` bukan `next/link`.**
- Lokasi: `page.tsx:118` (`<a href="/admin/umkm">`), `page.tsx:131` (`<a href="/admin/news">`); juga `AdminButton.tsx:34`.
- Bukti perbandingan: Sisa kodebasis secara konsisten pakai `import Link from "next/link"` (Navbar, LegalLayout, FilosofiSection, dll.).
- Dampak: Kehilangan prefetch, memicu full page reload (menghancurkan state drawer di `AdminShell` yang sedang terbuka), dan tidak optimal secara performa/UX.

### 🟡 Low

**L1. Tidak ada `loading.tsx`/`error.tsx` di segmen `admin`.**
- Lokasi: `web/src/app/admin/` (hanya `page.tsx`).
- Dampak: Saat data asli ditambahkan, tidak ada UX loading/skeleton atau penanganan error terpusat untuk segmen admin.

**L2. Wrapper section tidak pakai lebar standar `.cursorrules`.**
- Lokasi: section di `page.tsx:74,81,113,126` — langsung `grid`/`section` tanpa `max-w-[98%] xl:max-w-[1600px] mx-auto px-4 md:px-8 w-full`. Lebar sudah diatur oleh `AdminShell.tsx:23`, namun tidak seragam dengan konvensi navbar↔footer.

**L3. `VisitorChart` tidak ramah `prefers-reduced-motion`.**
- Lokasi: `page.tsx:46` `transition-all duration-500`. Animasi bar chart tidak dibungkus pengecekan `prefers-reduced-motion` (sesuai AGENTS.md §9). Minor karena dekoratif & `aria-hidden`.

---

## Rekomendasi Perbaikan

### R1 (High) — Tambahkan proteksi rute berlapis (proxy.ts + DAL)

Buat `proxy.ts` di root `web/` (setara dengan `app`) untuk redirect optimistik, **dan** verifikasi sesi di Server Component sebelum render data.

```ts
// web/proxy.ts  (Next.js 16 — pengganti middleware.ts)
import { NextRequest, NextResponse } from "next/server";

const PUBLIC = ["/", "/login", "/api/auth"];
const ADMIN_PREFIX = "/admin";

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  if (PUBLIC.some((p) => pathname === p || pathname.startsWith(p + "/"))) {
    return NextResponse.next();
  }
  const token = request.cookies.get("session")?.value;
  if (!token && pathname.startsWith(ADMIN_PREFIX)) {
    const login = new URL("/login", request.url);
    login.searchParams.set("redirect", pathname);
    return NextResponse.redirect(login);
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|public/).*)"],
};
```

```ts
// web/src/lib/auth.ts  (Data Access Layer — primary enforcement)
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { cache } from "react";

export const verifySession = cache(async () => {
  const token = (await cookies()).get("session")?.value;
  const user = token ? await decrypt(token) : null; // jose/Web Crypto
  if (!user) redirect("/login?redirect=/admin");
  if (user.role !== "admin") redirect("/403");
  return user;
});
```

```tsx
// web/src/app/admin/page.tsx
export default async function AdminDashboardPage() {
  await verifySession(); // ⛨ setiap render admin memverifikasi ulang
  // ...fetch data via DAL...
}
```

### R2 (High) — Ganti mock dengan data fetching asli lewat DAL

```tsx
import { getAdminDashboard } from "@/lib/dal";

export const dynamic = "force-dynamic"; // M1

export default async function AdminDashboardPage() {
  await verifySession();
  const { adminStats, umkmTerbaru, beritaTerbaru, aktivitasTerbaru, visitorMingguan } =
    await getAdminDashboard();
  // ...render...
}
```
Pastikan setiap fungsi di `dal.ts` memanggil `verifySession()` sebelum query DB (defense-in-depth).

### R3 (Medium) — Gunakan `next/link` untuk navigasi internal

```tsx
// page.tsx:118 dan :131
import Link from "next/link";
// ...
<Link href="/admin/umkm" className="inline-flex items-center gap-1 text-sm font-semibold text-brand hover:text-brand/70 transition-colors focus-ring rounded">
  Lihat semua <ArrowUpRightIcon className="w-4 h-4" />
</Link>
```
Terapkan juga di `AdminButton.tsx:32-37` (ganti `<a href>` dengan `<Link>`).

### R4 (Low) — Tambah `loading.tsx` & `error.tsx` di segmen admin

```tsx
// web/src/app/admin/loading.tsx
export default function Loading() {
  return <div className="animate-pulse space-y-4" aria-busy="true" aria-label="Memuat dashboard">…</div>;
}
```

```tsx
// web/src/app/admin/error.tsx
"use client";
export default function Error({ reset }: { error: Error; reset: () => void }) {
  return <button onClick={reset} className="btn-cta">Coba lagi</button>;
}
```

### R5 (Low) — Seragamkan lebar container & hormati reduced-motion

- Bungkus section dengan `className="max-w-[98%] xl:max-w-[1600px] mx-auto px-4 md:px-8 w-full"` atau andalkan `AdminShell` (sudah benar di `AdminShell.tsx:23`); pastikan konsisten.
- Untuk `VisitorChart` (`page.tsx:46`), buat animasi bersyarat `motion-safe:` (Tailwind) atau cek `prefers-reduced-motion` agar sesuai AGENTS.md §9.

---

## Referensi

- Next.js Docs — Authentication: https://nextjs.org/docs/app/building-your-application/authentication
- Next.js Docs — Data Fetching: https://nextjs.org/docs/app/building-your-application/data-fetching/fetching
- Next.js Docs — Caching & `revalidate`/`dynamic`: https://nextjs.org/docs/app/building-your-application/caching
- Next.js Docs — Metadata API: https://nextjs.org/docs/app/building-your-application/optimizing/metadata
- Next.js Docs — Linking & Navigating (`next/link`): https://nextjs.org/docs/app/building-your-application/caching/linking-and-navigating
- Next.js Docs — `loading.tsx` / `error.tsx` / `Suspense`: https://nextjs.org/docs/app/api-reference/file-conventions
- Next.js 16 auth model (DAL + Server Components + proxy.ts): https://www.thanosk.eu/deep-dives/authentication-architecture-nextjs-16
- WorkOS — Next.js App Router auth guide 2026: https://workos.com/blog/nextjs-app-router-authentication-guide-2026
- CVE-2025-29927 (middleware bypass) & CVE-2026-44574: https://www.nexgismo.com/blog/nextjs-16-auth-security-mistakes-2026
- AGENTS.md proyek (`web/`): aturan bahasa, container width, `prefers-reduced-motion` (§9).
- Kode: `web/src/app/admin/page.tsx`, `web/src/components/admin/AdminShell.tsx`, `web/src/components/admin/AdminButton.tsx`, `web/src/content/admin-mock.ts`.
