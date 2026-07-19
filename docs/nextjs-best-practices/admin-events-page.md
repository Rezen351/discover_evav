# Best Practice Audit: /admin/events (web/src/app/admin/events/page.tsx)

> **Tujuan dokumen:** Audit kepatuhan halaman `/admin/events` terhadap standar Next.js 16 App Router (Server/Client Components, Server Actions, Metadata, data fetching, auth, performa, aksesibilitas). Laporan ini **hanya analisis** — tidak mengubah kode sumber kecuali pembuatan file ini.

---

## Ringkasan

Halaman `web/src/app/admin/events/page.tsx` adalah halaman list CRUD admin yang **relatif bersih dan mengikuti pola Server Component** untuk presentasi data (tidak ada `"use client"` yang tidak perlu, tabel dirender di server, `metadata` terdefinisi). Namun, sebagai halaman **admin/CMS yang bertujuan produksi**, halaman ini memiliki celah kepatuhan kritis:

1. **Tidak ada proteksi rute sama sekali** — tidak ada `proxy.ts`/`middleware.ts`, tidak ada pemeriksaan sesi di level layout maupun halaman. Setiap orang dapat mengakses `/admin/events` (dan seluruh panel `/admin`).
2. **Tombol "Tambah Event" mengarah ke rute yang tidak ada** (`/admin/events/baru`), sehingga menghasilkan 404.
3. **Data bersifat mock statis** (`eventList` dari `@/content/admin-mock`), bukan hasil fetch/server action nyata — belum menerapkan data fetching async server component, caching, atau mutation.
4. **Navigasi menggunakan `<a>` murni** (bukan `next/link`) pada `AdminButton`/`AdminSidebar`, sehingga kehilangan prefetch & client-side navigation.
5. **Tidak ada `loading.tsx` / `error.tsx`** di segmen admin.

**Rating: 🟡 Cukup / Perlu Perbaikan**
**Skor: 58 / 100** (kepatuhan struktural baik, namun fungsionalitas admin inti — auth, data nyata, rute tujuan — belum dipenuhi).

---

## Standar Next.js yang Direview

Standar diambil dari dokumentasi resmi `nextjs.org/docs` (App Router, versi 16.2.x) dan panduan praktik terbaik 2025–2026:

| # | Standar | Referensi |
|---|---------|-----------|
| 1 | Server vs Client Components (`"use client"` boundary) | `nextjs.org/docs/app/building-your-application/rendering/server-components` |
| 2 | Data fetching (async Server Component, caching, revalidation) | `nextjs.org/docs/app/building-your-application/data-fetching` |
| 3 | Server Actions & mutations (form, `"use server"`) | `nextjs.org/docs/app/guides/forms`, `/guides/server-actions` |
| 4 | Metadata API | `nextjs.org/docs/app/api-reference/functions/generate-metadata` |
| 5 | `next/link` untuk navigasi internal | `nextjs.org/docs/app/api-reference/components/link` |
| 6 | `loading.tsx` / `error.tsx` / `Suspense` (streaming) | `nextjs.org/docs/app/api-reference/file-conventions/loading`, `/error` |
| 7 | Route protection / auth (proxy/middleware + DAL) | `nextjs.org/docs/app/guides/authentication` |
| 8 | Aksesibilitas & semantic HTML | `nextjs.org/docs/app/building-your-application/accessibility` |
| 9 | Performa (RSC, no unnecessary client JS, `next/image`) | `nextjs.org/docs/app/building-your-application/optimizing` |
| 10 | TypeScript conventions (strict, typed) | `nextjs.org/docs/app/building-your-application/configuring/typescript` |
| 11 | App Router conventions (file structure, colocation) | `nextjs.org/docs/app/api-reference/file-conventions` |

---

## Analisis Kepatuhan

| Standar | Status | Bukti (file:baris) |
|---------|--------|--------------------|
| 1. Server vs Client Components | ✅ | `page.tsx` tidak punya `"use client"` (Server Component); `AdminTable` juga Server Component (`AdminTable.tsx:26`). `AdminShell`/`AdminSidebar` memang butuh client (drawer/mobile) — `AdminShell.tsx:1` `"use client"` wajar. |
| 2. Data fetching (async/caching) | ❌ | Halaman tidak melakukan fetch. Data statis impor langsung `eventList` dari `@/content/admin-mock` (`page.tsx:7`). Tidak ada `async function`, `fetch`, `cache()`, atau `revalidatePath`. |
| 3. Server Actions & mutations | ❌ | Tidak ada form create/edit/delete, tidak ada `"use server"`. Tombol "Tambah Event" hanya navigasi (`page.tsx:39`). |
| 4. Metadata API | ✅ | `metadata` terdefinisi dengan `title`/`description` (`page.tsx:9-12`). |
| 5. `next/link` navigasi internal | ❌ | `AdminButton` merender `<a href>` murni (`AdminButton.tsx:32-37`); `AdminSidebar` juga `<a href>` (`AdminSidebar.tsx:82-94`). Tidak pakai `next/link` → tidak ada prefetch/client transition. |
| 6. `loading.tsx` / `error.tsx` | ❌ | Tidak ada `loading.tsx` maupun `error.tsx` di `/admin` maupun `/admin/events` (hasil `glob web/src/app/admin/**`). |
| 7. Route protection / auth | ❌ | Tidak ada `proxy.ts`/`middleware.ts` di `web/src` (hasil `glob`). Tidak ada `cookies()`/`auth()`/`session` di layout maupun page (`grep` auth → 0 hasil relevan di admin). |
| 8. Aksesibilitas & semantic HTML | ⚠️ | Baik: `AdminTable` pakai `<table>`+`<th scope="col">`+`<caption className="sr-only">` (`AdminTable.tsx:36-49`), ikon `aria-hidden`. Lemah: tombol "Tambah Event" pakai `ariaLabel` tapi `<a>` bukan `<button>`/link semantik; `AdminShell` tidak sediakan skip-link `#main-content`. |
| 9. Performa | ⚠️ | RSC digunakan (bagus). Tapi client bundle tidak perlu: `AdminShell.tsx:1` memaksa **seluruh pohon admin** jadi client karena `AdminShell` dikembalikan di dalam `page.tsx` Server Component — boundary client terlalu tinggi (lihat Temuan). Tidak ada `next/image` di halaman ini (tidak relevan, tabel teks). |
| 10. TypeScript conventions | ✅ | `strict`, typed: `EventRow` interface (`admin-mock.ts:221-228`), `AdminColumn<EventRow>[]` (`page.tsx:14`), tanpa `any`. |
| 11. App Router conventions | ⚠️ | Struktur `app/admin/events/page.tsx` benar. Tapi rute tujuan `baru` tidak ada → link mati (`page.tsx:39` → `/admin/events/baru` 404, hanya `news/baru` yang ada). |

---

## Temuan & Masalah

### 🔴 Kritis (Security / Broken functionality)

**F-1 — Tidak ada proteksi rute admin (auth bypass).** [Severity: Critical]
- `web/src/app/admin/events/page.tsx` (dan seluruh `/admin`) dapat diakses tanpa autentikasi. Tidak ada `proxy.ts`, `middleware.ts`, atau pengecekan sesi di `AdminShell`/layout.
- Ref: `nextjs.org/docs/app/guides/authentication` — "Proxy can be useful for initial checks… majority of security checks should be performed as close as possible to your data source (DAL)". Bahkan tanpa DAL, minimal redirect unauthenticated user di proxy.
- Dampak: panel CMS terbuka untuk publik.

**F-2 — Link "Tambah Event" mengarah ke rute yang tidak ada (404).** [Severity: Critical]
- `page.tsx:39` → `<AdminButton href="/admin/events/baru" ...>`. Direktori `web/src/app/admin/events/baru/` **tidak ada** (hanya `news/baru` yang ada). Klik tombol → 404.
- Dampak: fitur inti CRUD "create" tidak dapat dijangkau.

### 🟡 Sedang (Best-practice violations)

**F-3 — Boundary Client Component terlalu tinggi: `AdminShell` mem-"use client" seluruh pohon.** [Severity: Medium]
- `AdminShell.tsx:1` mendeklarasikan `"use client"` karena butuh `useState` drawer. Karena `page.tsx` me-render `<AdminShell>{children}</AdminShell>`, `children` (Server Component) tetap RSC, **tapi** `AdminTopbar`/`AdminSidebar` selalu client. Ini wajar untuk shell, namun ideally interaktivitas dipisah ke komponen daun (mis. tombol drawer saja) agar header/sidebar statis tetap server. Saat ini `AdminSidebar.tsx:1` juga `"use client"` penuh hanya untuk `usePathname` + toggle.
- Catatan: ini *acceptable* untuk admin shell, tapi bisa dioptimasi.

**F-4 — Navigasi internal tidak menggunakan `next/link`.** [Severity: Medium]
- `AdminButton.tsx:34` (`<a href>`), `AdminSidebar.tsx:83` (`<a href>`). Next.js merekomendasikan `next/link` untuk optimasi (prefetch, client-side nav, tidak full reload). `page.tsx:39` & navigasi sidebar kehilangan manfaat ini.

**F-5 — Tidak ada data fetching nyata / masih mock statis.** [Severity: Medium]
- `page.tsx:7` impor `eventList` statis. Sebagai halaman admin produksi, seharusnya `export default async function` yang `fetch`/baca DB, dengan `revalidatePath`/`revalidateTag` saat mutasi. Belum ada pola async server component.

**F-6 — Tidak ada `loading.tsx` / `error.tsx` di segmen admin.** [Severity: Low/Medium]
- Bila kelak data di-fetch, tidak ada Suspense fallback/skeleton (`loading.tsx`) dan tidak ada error boundary (`error.tsx`). Sesuai AGENTS.md §7.3.3, heavy section wajib skeleton.

### 🟢 Minor

**F-7 — Tidak ada skip-link / `#main-content` di AdminShell.** [Severity: Low]
- AGENTS.md §9 mewajibkan skip-to-content link. `AdminShell.tsx:18-27` tidak menyediakannya.

**F-8 — `ariaLabel` pada `<a>` tautan ikon.** [Severity: Low]
- `page.tsx:39` `ariaLabel="Tambah event"` diteruskan ke `<a>` (`AdminButton.tsx:34`). Acceptable karena teks "Tambah Event" sudah ada, tapi sebaiknya elemen navigasi berupa `Link` dengan `aria-label` yang bermakna, bukan `<a>` polos.

---

## Rekomendasi Perbaikan

### R-1 (F-1) — Tambahkan proteksi rute via `proxy.ts` (Next.js 16)
Buat `web/src/proxy.ts` (di Next.js 16, `middleware.ts` diganti `proxy.ts` dengan `export function proxy`):

```ts
// web/src/proxy.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const protectedRoutes = ["/admin"];
const publicRoutes = ["/login"];

export async function proxy(req: NextRequest) {
  const path = req.nextUrl.pathname;
  const isProtected = protectedRoutes.some(
    (r) => path === r || path.startsWith(`${r}/`)
  );
  const cookie = req.cookies.get("session")?.value;
  const session = cookie ? await decrypt(cookie) : null; // sesuaikan dg lib auth Anda

  if (isProtected && !session?.userId) {
    return NextResponse.redirect(new URL("/login", req.nextUrl));
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|.*\\.png$).*)"],
};
```
> Plus: lakukan validasi sesi lengkap di *Data Access Layer* (server) sebelum query data sensitif.

### R-2 (F-2) — Buat rute `/admin/events/baru` atau ubah link
Opsi A (direkomendasikan): buat `web/src/app/admin/events/baru/page.tsx` berisi form dengan Server Action:

```tsx
// web/src/app/admin/events/baru/page.tsx
import { createEvent } from "@/app/admin/events/actions";

export default function NewEventPage() {
  return (
    <form action={createEvent}>
      <input name="nama" required />
      <select name="kategori">
        <option value="Festival">Festival</option>
        {/* ... */}
      </select>
      <button type="submit">Simpan</button>
    </form>
  );
}
```

```ts
// web/src/app/admin/events/actions.ts
"use server";
import { revalidatePath } from "next/cache";

export async function createEvent(formData: FormData) {
  // 1. auth check (wajib di setiap action)
  // 2. validasi (Zod)
  // 3. tulis DB
  revalidatePath("/admin/events");
  // redirect("/admin/events") bila sukses
}
```
Opsi B (cepat): ubah `page.tsx:39` `href` ke rute yang memang ada, atau hapus tombol sampai fitur siap.

### R-3 (F-4, F-8) — Ganti `<a href>` dengan `next/link`
Di `AdminButton.tsx` dan `AdminSidebar.tsx`, impor `Link` dari `next/link`:

```tsx
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
(komponen `AdminButton` saat ini Server Component — aman dipakai di dalam RSC.)

### R-4 (F-5) — Jadikan halaman async + fetch data nyata
```tsx
export const dynamic = "force-dynamic"; // admin butuh data segar
// atau gunakan fetch(..., { next: { revalidate: 60 } })

export default async function AdminEventPage() {
  const eventList = await getEvents(); // server query
  return ( /* ... */ );
}
```

### R-5 (F-6) — Tambahkan `loading.tsx` & `error.tsx`
```tsx
// web/src/app/admin/events/loading.tsx
export default function Loading() {
  return <div className="animate-pulse rounded-lg-design border border-brand/10 bg-white p-6">Memuat event…</div>;
}
```
```tsx
// web/src/app/admin/events/error.tsx
"use client";
export default function Error({ reset }: { reset: () => void }) {
  return (
    <div role="alert">
      <p>Gagal memuat data event.</p>
      <button onClick={reset}>Coba lagi</button>
    </div>
  );
}
```

### R-6 (F-7) — Skip-link di `AdminShell`
```tsx
// AdminShell.tsx, sebelum <div className="flex min-h-screen ...">
<a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:z-50 ...">Lewati ke konten</a>
```
dan beri `id="main-content"` pada wrapper `{children}`.

### R-7 (F-3) — Kecilkan boundary client (opsional)
Pindahkan state drawer ke komponen daun khusus (mis. `AdminMobileNav`), biarkan `AdminShell` tetap Server Component yang hanya merender `AdminSidebar`/`AdminTopbar` statis + satu client toggle. Ini mengurangi client JS di admin.

---

## Referensi

- Next.js — Authentication (App Router): https://nextjs.org/docs/app/guides/authentication
- Next.js — Forms & Server Actions: https://nextjs.org/docs/app/guides/forms
- Next.js — Server Actions & Mutations: https://nextjs.org/docs/app/guides/server-actions
- Next.js — `loading.js` (Streaming/Suspense): https://nextjs.org/docs/app/api-reference/file-conventions/loading
- Next.js — `error.js` (Error Boundaries): https://nextjs.org/docs/app/api-reference/file-conventions/error
- Next.js — `next/link`: https://nextjs.org/docs/app/api-reference/components/link
- Next.js — Server Components: https://nextjs.org/docs/app/building-your-application/rendering/server-components
- Next.js 16 Proxy (mantan middleware): https://www.authgear.com/post/nextjs-middleware-authentication/ (catatan `proxy.ts` untuk v16)
- Next.js — Accessibility: https://nextjs.org/docs/app/building-your-application/accessibility
- AGENTS.md proyek (aturan bahasa, CTA, aksesibilitas, sentralisasi konten): `/home/almuzky/discover_evav/AGENTS.md`
- GRAND_DESIGN.md (hierarki CTA, token desain): `/home/almuzky/discover_evav/docs/GRAND_DESIGN.md`

---

*Laporan dibuat sebagai hasil audit statis (tidak menjalankan build/visual test). Skor bersifat estimasi berdasarkan kepatuhan standar di atas terhadap kode aktual.*
