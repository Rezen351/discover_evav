# Best Practice Audit: /admin/destinations (web/src/app/admin/destinations/page.tsx)

> Auditor: Next.js 16 App Router Expert
> Tanggal: 2026-07-20
> Target: `web/src/app/admin/destinations/page.tsx` (route `/admin/destinations` — daftar destinasi CMS "Simfoni Evav")
> Versi: Next.js 16.2.6, React 19.2.4, TypeScript 5.

---

## Ringkasan

Halaman `/admin/destinations` merupakan **Server Component** murni dengan Metadata API yang benar, HTML semantik yang baik (tabel dengan `caption` `sr-only`, heading `h1` di `AdminPageHeader`, ikon dekoratif `aria-hidden`), dan komponen presentasional (`AdminTable`) tanpa `"use client"`. Secara arsitektur komponen & aksesibilitas, halaman ini sehat dan konsisten dengan pola `web/src/app/admin/page.tsx`.

Namun, sebagai halaman **admin CRUD**, ia gagal di aspek paling kritis: **tidak ada proteksi autentikasi/otorisasi sama sekali** (tidak ada `middleware`/`proxy.ts`, tidak ada Data Access Layer, tidak ada pengecekan sesi), data bersifat **statis mock** tanpa data fetching asli, dan tidak ditandai `force-dynamic` padahal memuat konten sensitif. Selain itu, tombol "Tambah Destinasi" menunjuk ke `/admin/destinations/baru` yang **belum ada** (broken route), dan navigasi internal masih menggunakan `<a href>` alih-alih `next/link`. Halaman ini juga absen dari Server Actions — mutasi (tambah/edit/hapus) belum diimplementasikan sama sekali, yang seharusnya menjadi inti dari halaman admin CRUD.

**Rating: ⚠️ Perlu Perbaikan Signifikan (terutama keamanan & data-fetching).**

**Skor Kepatuhan: 47/100** — arsitektur komponen & aksesibilitas bagus, tetapi keamanan (auth), data-fetching asli, penanganan mutasi (Server Actions), dan keutuhan rute praktis absen, yang merupakan syarat mutlak untuk halaman admin.

---

## Standar Next.js yang Direview

Referensi praktik terbaik diambil dari dokumentasi resmi `nextjs.org/docs` (App Router, Metadata, Data Fetching, Caching, `loading.tsx`/`error.tsx`, `next/link`, `next/image`, `next/font`, Server Actions & Mutations) serta panduan keamanan App Router 2026 (model autentikasi berlapis: Data Access Layer + Server Components + `proxy.ts` opsional, dan perlindungan Server Action/Route Handler sebagai endpoint publik). Standar yang diaudit:

1. **Server vs Client Component boundary** — meminimalkan JS klien, `"use client"` hanya pada komponen daun yang butuh interaktivitas.
2. **Data fetching** — Server Component `async`, `fetch` dengan caching/revalidasi eksplisit, atau DAL; bukan mock statis untuk produksi.
3. **Route segment config & rendering** — `force-dynamic`/`revalidate` untuk konten sensitif/selalu-baru (admin list).
4. **Autentikasi & otorisasi** — perlindungan rute admin (proxy.ts + verifikasi di Server Component/DAL), defense-in-depth; Server Actions wajib cek auth di dalamnya.
5. **Server Actions untuk mutasi** — CRUD (create/edit/delete) sebaiknya via `"use server"` + `useActionState`/`revalidatePath`, bukan client fetch.
6. **Metadata API** — `metadata` ekspor.
7. **Navigasi** — `next/link` untuk navigasi internal (prefetch, tanpa full-reload).
8. **Aksesibilitas & HTML semantik** — landmark, heading order, ARIA, skip link.
9. **UX error/loading** — `error.tsx`, `loading.tsx`, `Suspense`.
10. **TypeScript & konvensi** — strict typing, alias `@/*`, tanpa `any`.
11. **Styling & performa** — Tailwind utilitas, `next/image`, meminimalkan client bundle.

---

## Analisis Kepatuhan

| Standar | Status | Bukti (file:line) |
|---|---|---|
| Server Component (default) | ✅ | `page.tsx:31` `export default function AdminDestinasiPage()` tanpa `"use client"` |
| Pemisahan client boundary | ✅ | Interaktivitas (drawer) di `AdminShell.tsx:1` `"use client"`; `page.tsx` tetap server; `AdminTable.tsx` tanpa `"use client"` |
| Metadata API | ✅ | `page.tsx:9-12` `export const metadata: Metadata` (`title`, `description`) |
| TypeScript strict / tanpa `any` | ✅ | Tipe eksplisit `DestinasiRow` (`admin-mock.ts:199-206`); `AdminColumn<DestinasiRow>[]` (`page.tsx:14`) |
| Alias `@/*` | ✅ | Import `@/components/admin/...`, `@/content/admin-mock` di `page.tsx:2-7` |
| HTML semantik & ARIA | ✅ | `caption` `sr-only` di `AdminTable.tsx:37`; `h1` di `AdminPageHeader.tsx:21`; ikon `aria-hidden` (`page.tsx:23`); tombol punya `ariaLabel` (`page.tsx:39`) |
| Data fetching asli (async server) | ❌ | Tidak ada `async`/`fetch`/DAL; data dari mock statis `destinasiList` (`page.tsx:7`, `admin-mock.ts:208-215`) |
| Route segment config (dynamic) | ❌ | Tidak ada `export const dynamic = "force-dynamic"` padahal daftar admin sensitif |
| Autentikasi/otorisasi rute | ❌ | Tidak ada `proxy.ts`/`middleware.ts`; tidak ada `verifySession`/DAL (`grep` auth → 0 hasil di `web/`); `AdminTopbar.tsx:13` `adminName` di-hardcode `"Admin Evav"` |
| Server Actions untuk mutasi CRUD | ❌ | Tidak ada `"use server"` di mana pun; tambah/edit/hapus destinasi belum diimplementasikan |
| Keutuhan rute (broken link) | ❌ | `AdminButton` `href="/admin/destinations/baru"` (`page.tsx:39`) → file `admin/destinations/baru/page.tsx` **tidak ada** |
| Navigasi `next/link` | ⚠️ | `AdminButton.tsx:34` pakai `<a href>`; tidak konsisten dengan App Router (`next/link` memberi prefetch + client nav) |
| `error.tsx` / `loading.tsx` / `Suspense` | ⚠️ | Tidak ada `admin/destinations/loading.tsx` atau `error.tsx`; relevan saat data asli ditambahkan |
| `next/image` | N/A | Halaman hanya menampilkan tabel tanpa gambar |
| `next/font` | ✅ | `AdminTable.tsx:35` & `AdminShell.tsx:19` pakai `--font-sans` terpusat dari `layout.tsx` |
| Container width standar | ✅ | Wrapper `max-w-[1600px] mx-auto px-4 md:px-8` di `AdminShell.tsx:23` sesuai konvensi |

---

## Temuan & Masalah

| # | Severity | Masalah | File:Line |
|---|---|---|---|
| 1 | 🔴 Kritis | **Tidak ada proteksi autentikasi/otorisasi** pada rute admin. Siapa pun dapat mengakses `/admin/destinations` dan (kelak) mutasi data. Tidak ada `proxy.ts`/`middleware.ts`, tidak ada DAL, tidak ada cek sesi di Server Component. | `page.tsx:31`, `AdminTopbar.tsx:13` |
| 2 | 🔴 Kritis | **Tidak ada data fetching asli** — daftar destinasi diambil dari mock statis `destinasiList`, bukan database/DAL. Halaman admin tidak menampilkan data produksi. | `page.tsx:7`, `admin-mock.ts:208-215` |
| 3 | 🟠 Tinggi | **Tidak ada Server Action untuk mutasi CRUD.** Halaman admin bertujuan mengelola destinasi, namun create/edit/delete belum diimplementasikan dengan `"use server"` + `revalidatePath`/`updateTag`. Tanpa ini, admin tidak fungsional. | seluruh `admin/destinations` (tidak ada `actions`) |
| 4 | 🟠 Tinggi | **Broken route**: tombol "Tambah Destinasi" menunjuk ke `/admin/destinations/baru` yang **belum ada** (404 saat diklik). | `page.tsx:39` (`AdminButton href`) |
| 5 | 🟡 Sedang | **Tidak ada `force-dynamic`**. Daftar admin berisi data sensitif yang seharusnya selalu segar; tanpa konfigurasi segmen, halaman dapat di-cache statis saat build. | `page.tsx` (tidak ada `export const dynamic`) |
| 6 | 🟡 Sedang | **Navigasi internal pakai `<a href>`** bukan `next/link`. Kehilangan prefetch, client-side navigation, dan tidak konsisten dengan App Router. | `AdminButton.tsx:34` |
| 7 | 🟢 Rendah | **Tidak ada `loading.tsx`/`error.tsx`** di segmen `admin/destinations`. Akan relevan & penting begitu data asli (async) ditambahkan untuk UX error/loading. | `admin/destinations/` (tidak ada file tsb) |
| 8 | 🟢 Rendah | **`adminName` di-hardcode** `"Admin Evav"` di `AdminTopbar.tsx:13` alih-alih diambil dari sesi pengguna. Indikasi auth belum terintegrasi. | `AdminTopbar.tsx:13` |

---

## Rekomendasi Perbaikan

### 1. Tambahkan perlindungan rute berlapis (defense-in-depth)
Buat `proxy.ts` (Edge) sebagai gate cepat, lalu verifikasi sesi di dalam Server Component halaman (tidak cukup mengandalkan proxy karena rute & Server Action dapat diakses langsung).

```ts
// web/proxy.ts  (gate cepat berbasis cookie JWT)
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function proxy(request: NextRequest) {
  const token = request.cookies.get("auth_tokens")?.value;
  if (!token && request.nextUrl.pathname.startsWith("/admin")) {
    return NextResponse.redirect(new URL("/login", request.url));
  }
  // dekode role; set header x-user-role untuk dibaca Server Component
  return NextResponse.next();
}

export const config = { matcher: ["/admin/:path*"] };
```

```ts
// web/src/lib/dal.ts  (Data Access Layer — server-only)
import "server-only";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export async function requireAdmin() {
  const h = await headers();
  const role = h.get("x-user-role");
  // fallback: cek DB jika perlu (secure check)
  if (role !== "admin") redirect("/unauthorized");
}
```

```ts
// page.tsx — panggil di awal (Layer 2)
import { requireAdmin } from "@/lib/dal";

export default async function AdminDestinasiPage() {
  await requireAdmin(); // ⛨ cek otorisasi di server, bukan hanya proxy
  const list = await getDestinasiList();
  // ...
}
```

### 2. Ganti mock dengan data fetching asli (async Server Component + DAL)
```ts
// page.tsx
import { getDestinasiList } from "@/lib/dal";

export const dynamic = "force-dynamic"; // data admin selalu segar

export default async function AdminDestinasiPage() {
  await requireAdmin();
  const rows = await getDestinasiList(); // query DB, kembalikan DTO minimal
  return (
    <AdminShell>
      {/* ... */}
      <AdminTable columns={columns} rows={rows} statusField="status" caption="Daftar seluruh destinasi" />
    </AdminShell>
  );
}
```

### 3. Implementasikan Server Actions untuk mutasi CRUD
```ts
// web/src/app/admin/destinations/actions.ts
"use server";
import { revalidatePath } from "next/cache";
import { requireAdmin } from "@/lib/dal";
import { z } from "zod";

const schema = z.object({
  nama: z.string().trim().min(3),
  kategori: z.enum(["Pantai", "Budaya", "Alam", "Sejarah"]),
  lokasi: z.string().trim().min(3),
});

export async function createDestinasi(prev: unknown, formData: FormData) {
  await requireAdmin(); // ⛨ auth di DALAM action, bukan hanya di halaman
  const parsed = schema.safeParse(Object.fromEntries(formData));
  if (!parsed.success) {
    return { ok: false as const, errors: parsed.error.flatten().fieldErrors };
  }
  await db.destinasi.create({ data: parsed.data });
  revalidatePath("/admin/destinations"); // segar setelah mutasi
  return { ok: true as const, errors: null };
}
```

```tsx
// web/src/app/admin/destinations/baru/page.tsx  (BUAT file ini — perbaiki broken link)
"use client";
import { useActionState } from "react";
import { createDestinasi } from "../actions";

export default function NewDestinasiPage() {
  const [state, formAction, pending] = useActionState(createDestinasi, null);
  return (
    <form action={formAction}>
      <input name="nama" aria-label="Nama destinasi" />
      {state?.errors?.nama && <p role="alert">{state.errors.nama}</p>}
      <button type="submit" disabled={pending} aria-label="Simpan destinasi">Simpan</button>
    </form>
  );
}
```

### 4. Gunakan `next/link` untuk navigasi internal
`AdminButton` sebaiknya menerima `Link` dari `next/link` alih-alih `<a href>` mentah agar mendapat prefetch & client navigation:

```tsx
// AdminButton.tsx
import Link from "next/link";

if (href) {
  return (
    <Link href={href} className={className} aria-label={ariaLabel}>
      {children}
    </Link>
  );
}
```

### 5. Tambahkan `loading.tsx` & `error.tsx` di segmen admin
```tsx
// web/src/app/admin/destinations/loading.tsx
export default function Loading() {
  return <p className="text-black/50" aria-busy="true">Memuat daftar destinasi…</p>;
}
```
```tsx
// web/src/app/admin/destinations/error.tsx
"use client";
export default function Error({ reset }: { error: Error; reset: () => void }) {
  return (
    <div role="alert">
      <p>Gagal memuat data destinasi.</p>
      <button onClick={reset} aria-label="Coba lagi">Coba lagi</button>
    </div>
  );
}
```

### 6. Ambil identitas admin dari sesi, bukan hardcode
Ganti `adminName = "Admin Evav"` di `AdminTopbar.tsx:13` dengan nilai dari `requireAdmin()`/`getAuthUser()` (mis. `user.name`) yang diteruskan dari Server Component.

---

## Referensi

- Next.js Docs — Mutating Data (Server Functions / Server Actions): https://nextjs.org/docs/app/getting-started/mutating-data
- Next.js Docs — Authentication (Data Access Layer, proxy.ts, defense-in-depth): https://nextjs.org/docs/app/guides/authentication
- Next.js Docs — Metadata API: https://nextjs.org/docs/app/getting-started/metadata
- Next.js Docs — `loading.tsx` / `error.tsx` / `Suspense`: https://nextjs.org/docs/app/api-reference/file-conventions
- Next.js Docs — `next/link`: https://nextjs.org/docs/app/api-reference/components/link
- Next.js Docs — `revalidatePath` / `revalidateTag` / `updateTag` (caching & mutations): https://nextjs.org/docs/app/api-reference/functions/revalidatePath
- Server Actions production patterns 2026 (auth, Zod, IDOR, rate limiting): https://www.digitalapplied.com/blog/nextjs-server-actions-production-patterns-2026-guide
- RBAC di App Router (middleware + Server Component + Server Action): https://www.averagedevs.com/blog/rbac-zero-trust-architecture-nextjs
- Next.js 16 three-layer auth model: https://shubhra.dev/tutorials/nextjs-16-authentication-3-layer-security
- AGENTS.md proyek (aturan bahasa & arsitektur `web/`): `/home/almuzky/discover_evav/AGENTS.md`
- Dokumen audit serupa: `docs/nextjs-best-practices/admin-dashboard-page.md`
