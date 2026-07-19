# Best Practice Audit: /admin/products (web/src/app/admin/products/page.tsx)

> Laporan audit kepatuhan praktik terbaik Next.js 16 (App Router) untuk halaman daftar produk pada panel admin CMS "Simfoni Evav".
> Framework: Next.js 16.2.6, React 19.2.4, TypeScript 5. Diperiksa: 2026-07-20.

---

## Ringkasan

Halaman `web/src/app/admin/products/page.tsx` adalah komponen **Server Component** murni yang merender daftar produk secara deklaratif melalui `AdminShell` → `AdminPageHeader` → `AdminTable`. Secara struktural, pemisahan Server/Client Component sudah cukup baik (tabel dan halaman tetap di server, hanya shell/sidebar yang berbasis client). Namun, sebagai halaman **ADMIN CRUD**, halaman ini belum mengikuti praktik inti Next.js 16:

- Data masih diambil dari **mock statis** (`@/content/admin-mock`) alih-alih *data fetching* asinkron di Server Component.
- **Tidak ada proteksi rute/autentikasi** sama sekali (tidak ada middleware, `cookies()`, `redirect()`, atau session check) — ini kritis untuk rute `/admin`.
- Navigasi menggunakan `<a href>` (bukan `next/link`) sehingga kehilangan prefetch & client-side navigation.
- **Tidak ada Server Actions / Route Handlers** untuk mutasi (tambah/edit/hapus) — mutasi CRUD wajib menggunakan `use server`, bukan client fetch.
- Tidak ada `loading.tsx`, `error.tsx`, atau `Suspense` untuk UX streaming.
- Tombol CTA utama tidak menggunakan kelas global `.btn-cta` yang diwajibkan oleh `AGENTS.md`.

**Rating: 🟡 Cukup / Perlu Perbaikan (Fase Scaffold/Prototipe).**
**Skor: 52 / 100** (struktur komponen & aksesibilitas dasar baik, namun fungsionalitas admin, keamanan, dan pola data mutasi belum memenuhi standar).

---

## Standar Next.js yang Direview

Standar berikut diambil dari dokumentasi resmi `nextjs.org/docs` (v16.2.x) dan panduan produksi 2026, dengan penekanan pada halaman ADMIN CRUD:

1. **Server vs Client Components** — Server Component sebagai default; dorong `"use client"` sedekat mungkin ke daun interaktif.
2. **Data Fetching (Server Components)** — `async function` + `await` (fetch/ORM) di server; komposisi & passing data, bukan koupling SQL ke UI.
3. **Server Actions & Mutations** — `'use server'` untuk mutasi (tambah/edit/hapus), `revalidatePath`/`revalidateTag`, `useActionState` + progressive enhancement.
4. **Form Handling** — form terikat Server Action, validasi input (Zod), penanganan error via `useActionState`.
5. **Metadata API** — `metadata` export / `generateMetadata`.
6. **next/link** — navigasi antar-rute via `<Link>` (prefetch, client nav) bukan `<a href>`.
7. **next/image** — gambar via `Image` dengan `remotePatterns`.
8. **next/font** — font via `next/font` (sudah di layout).
9. **loading.tsx / error.tsx / Suspense** — streaming & error boundary per segmen rute.
10. **Route Segment Config & Dynamic/Static Rendering** — `export const dynamic`, `revalidate`, keputusan render.
11. **Auth & Route Protection** — middleware / `cookies()` + `redirect()` untuk rute terproteksi.
12. **Accessibility & Semantic HTML** — ARIA, skip link, `prefers-reduced-motion`.
13. **Performance** — minimal JS ke client, no layout shift.
14. **TypeScript Conventions** — `strict`, no `any`, tipe eksplisit (terpenuhi di proyek ini).
15. **App Router Conventions** — colocation, alias `@/*`, struktur folder.

---

## Analisis Kepatuhan

| Standar | Status | Bukti (file:line) |
|---|---|---|
| Server vs Client Components | ✅ | `page.tsx` tidak punya `"use client"` (Server Component); `AdminTable` juga Server Component (`AdminTable.tsx:26`). Interaktivitas hanya di `AdminShell`/`AdminSidebar` (client). |
| Data Fetching (Server Components) | ❌ | `page.tsx:7` mengimpor `produkList` mock statis; `page.tsx:31-52` fungsi `AdminProdukPage` **bukan `async`** dan tidak memanggil data. Tidak ada `await fetch`/ORM. |
| Server Actions & Mutations | ❌ | Tidak ada file `actions.ts`/`route.ts`; tidak ada direktif `'use server'`. Mutasi CRUD tidak diimplementasikan. |
| Form Handling | ❌ | Tidak ada form pada halaman ini (hanya tombol navigasi ke `/admin/products/baru`). Belum ada pola form + validasi. |
| Metadata API | ✅ | `page.tsx:9-12` `export const metadata: Metadata` dengan title & description Bahasa Indonesia. |
| next/link | ❌ | `AdminButton.tsx:34` dan `AdminSidebar.tsx:83` memakai `<a href={...}>` alih-alih `<Link>`. `page.tsx:39` memanggil `AdminButton href=...`. |
| next/image | N/A | Halaman daftar produk tidak menampilkan gambar (seluruhnya teks/tabel). |
| next/font | ✅ | Font di-set di root layout via `next/font` (`var(--font-sans)` dipakai di `page.tsx`/`AdminTable.tsx:35`). |
| loading.tsx / error.tsx | ❌ | Tidak ada `web/src/app/admin/products/loading.tsx` maupun `error.tsx` (glob: no match). |
| Suspense / Streaming | ❌ | Tidak ada `<Suspense>` di `page.tsx`. Karena data statis, tidak krusial saat ini, tapi wajib saat beralih ke data nyata. |
| Route Segment Config & Rendering | ⚠️ | Tidak ada `export const dynamic`/`revalidate`. Saat ini statis (mock). Perlu `dynamic = "force-dynamic"` saat data admin nyata (data privat, per-request). |
| Auth & Route Protection | ❌ | Tidak ada `middleware.ts` (glob: no match) dan tidak ada pemanggilan `cookies()`/`getServerSession()`/`redirect()` di mana pun (grep: no match). Rute `/admin` **terbuka**. |
| Accessibility & Semantic HTML | ✅ | `AdminTable.tsx:36-38` pakai `<caption className="sr-only">` + `scope="col"`; `AdminShell`/`Sidebar` punya `aria-label`, `aria-current`, `aria-hidden` pada ikon, tombol tutup ber-`aria-label`. |
| Performance | ⚠️ | JS client minim (hanya shell/sidebar) ✅, namun pemakaian `<a>` + data statis menunda arsitektur asli. |
| TypeScript Conventions | ✅ | `ProdukRow` typed (`admin-mock.ts:176-184`), `AdminColumn<T>` generik, tidak ada `any`. `strict: true` terpenuhi. |
| App Router Conventions | ✅ | Alias `@/*` konsisten (`page.tsx:3-7`), colocation di `src/app/admin/products/`, import terpusat di `src/content/`. |
| Standar Tombol CTA (`AGENTS.md` §7.2) | ❌ | `AdminButton` (`AdminButton.tsx:26-30`) pakai gradient `bg-nav-gradient` (background terisi), bukan kelas global `.btn-cta` tanpa background. |

---

## Temuan & Masalah

| # | Severity | Masalah | Lokasi |
|---|---|---|---|
| 1 | 🔴 Critical | **Tidak ada autentikasi/proteksi rute** untuk seluruh panel `/admin`. Siapa pun dapat mengakses daftar produk (dan kelak mutasi data) tanpa login. Tidak ada middleware atau pengecekan session di server. | `web/src/app/admin/products/page.tsx` (tiadanya guard); tidak ada `middleware.ts`; tidak ada `cookies()`/`redirect()` di `AdminShell`/`layout`. |
| 2 | 🔴 Critical | **Data masih mock statis**, bukan data fetching server. Halaman bukan `async` dan tidak mengambil data dari sumber nyata — melanggar pola Server Component untuk halaman data-heavy/admin. | `page.tsx:7` (`import { produkList }`), `page.tsx:31` (fungsi sync). |
| 3 | 🟠 High | **Tidak ada Server Actions / Route Handlers untuk mutasi CRUD.** Tambah/edit/hapus produk tidak memiliki jalur mutasi server (`'use server'`, `revalidatePath`). Pola client fetch manual tidak direkomendasikan di App Router. | Tidak ada `actions.ts`/`route.ts` di `web/src/app/admin/products/`. |
| 4 | 🟠 High | **Navigasi pakai `<a href>` bukan `<Link>`** sehingga kehilangan prefetch, client-side transition, dan integrasi router. Terjadi di tombol "Tambah Produk" dan seluruh menu sidebar. | `AdminButton.tsx:34`, `AdminSidebar.tsx:83`, dipakai `page.tsx:39`. |
| 5 | 🟡 Medium | **Tidak ada `loading.tsx` / `error.tsx` / `Suspense`** di segmen rute admin. Saat data beralih ke sumber nyata (async), tidak ada UX streaming atau error boundary. | `web/src/app/admin/products/` (tidak ada file tersebut). |
| 6 | 🟡 Medium | **Keputusan rendering tidak dideklarasikan.** Tanpa `export const dynamic`/`revalidate`, data admin (privat, per-request) berisiko ter-cache statis saat di-deploy. | `page.tsx` (tiada export konfigurasi). |
| 7 | 🟡 Medium | **Tombol CTA utama melanggar standar `.btn-cta`** (`AGENTS.md` §7.2): memakai background gradient terisi, bukan border/netral tanpa shadow. | `AdminButton.tsx:26-30`, dipakai `page.tsx:39`. |
| 8 | 🟢 Low | **Deklarasi `columns` di luar komponen** (`page.tsx:14-29`) bagus untuk stabilitas referensi, namun `render` berisi JSX/inline class — dapat dipusatkan ke modul konten agar konsisten dengan sentralisasi string (`AGENTS.md` §4.10). | `page.tsx:14-29`. |

---

## Rekomendasi Perbaikan

### 1. Tambahkan proteksi rute (Middleware) — Severity 🔴
Buat `web/src/middleware.ts` untuk melindungi semua rute `/admin`:

```ts
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

> Catatan: validasi session sebaiknya juga diikuti pengecekan di sisi Server Component (`cookies()` + `redirect()` dari `next/navigation`) sebagai defense-in-depth.

### 2. Jadikan halaman async + fetch data nyata — Severity 🔴
```ts
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export const dynamic = "force-dynamic"; // data admin privat, per-request

export default async function AdminProdukPage() {
  const session = (await cookies()).get("session");
  if (!session) redirect("/login");

  const produkList = await getProdukList(); // service layer di src/lib
  // ...render dengan produkList
}
```

Gunakan service layer (`src/lib/produk.ts`) agar komponen tidak mengkoupling query ke UI (sesuai panduan produksi 2026).

### 3. Implementasikan Server Actions untuk mutasi — Severity 🟠
Buat `web/src/app/admin/products/actions.ts`:
```ts
"use server";

import { revalidatePath } from "next/cache";
import { z } from "zod";

const ProdukSchema = z.object({
  nama: z.string().min(1, "Nama wajib diisi"),
  umkm: z.string().min(1),
  harga: z.string().min(1),
  kategori: z.enum(["Kuliner", "Kerajinan", "Oleh-oleh"]),
  stok: z.coerce.number().int().min(0),
});

export async function buatProduk(prevState: FormState, formData: FormData) {
  const parsed = ProdukSchema.safeParse(Object.fromEntries(formData));
  if (!parsed.success) {
    return { message: "Validasi gagal", errors: parsed.error.flatten().fieldErrors };
  }
  await createProduk(parsed.data);
  revalidatePath("/admin/products");
  return { message: "Produk berhasil ditambahkan", errors: {} };
}
```
Pada form, gunakan `useActionState` (client leaf) untuk progressive enhancement.

### 4. Ganti `<a href>` dengan `<Link>` — Severity 🟠
Di `AdminButton.tsx` dan `AdminSidebar.tsx`, impor `Link` dari `next/link`:
```tsx
import Link from "next/link";
// ...
if (href) {
  return <Link href={href} className={className} aria-label={ariaLabel}>{children}</Link>;
}
```

### 5. Tambahkan loading.tsx & error.tsx — Severity 🟡
`web/src/app/admin/products/loading.tsx`:
```tsx
export default function Loading() {
  return (
    <div className="rounded-lg-design border border-brand/10 bg-white p-6 animate-pulse">
      <div className="h-6 w-40 bg-black/10 rounded mb-4" />
      <div className="space-y-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="h-10 bg-black/5 rounded" />
        ))}
      </div>
    </div>
  );
}
```
`web/src/app/admin/products/error.tsx` (wajib `"use client"`):
```tsx
"use client";
export default function Error({ reset }: { error: Error; reset: () => void }) {
  return (
    <div className="text-center py-10">
      <p className="text-black/70">Gagal memuat data produk.</p>
      <button onClick={reset} className="btn-cta mt-4">Coba lagi</button>
    </div>
  );
}
```

### 6. Deklarasikan rendering mode — Severity 🟡
Tambahkan `export const dynamic = "force-dynamic";` (atau `revalidate`) di `page.tsx` begitu data bersumber dari server (data admin tidak boleh di-cache statis).

### 7. Gunakan `.btn-cta` untuk CTA utama — Severity 🟡
Sesuai `AGENTS.md` §7.2, tombol "Tambah Produk" (`page.tsx:39`) harus memakai kelas global `.btn-cta` (tanpa background, border & teks hitam, hover → aksen pink), bukan gradient `bg-nav-gradient`. Refactor `AdminButton` variant `primary` agar menyertakan `btn-cta` atau buat varian khusus CTA.

### 8. Sentralisasi definisi kolom — Severity 🟢
Pindahkan array `columns` (`page.tsx:14-29`) ke modul konten (`src/content/admin-produk.ts`) agar konsisten dengan aturan sentralisasi string/konfigurasi (`AGENTS.md` §4.10), terutama menjelang i18n.

---

## Referensi

- Next.js Docs — Fetching Data (App Router): https://nextjs.org/docs/app/getting-started/fetching-data
- Next.js Docs — Server Actions (Updating Data): https://nextjs.org/docs/app/getting-started/updating-data
- Next.js Docs — Forms & Mutations: https://nextjs.org/docs/app/building-your-application/data-fetching/server-actions-and-mutations
- Next.js Docs — Metadata API: https://nextjs.org/docs/app/building-your-application/optimizing/metadata
- Next.js Docs — Linking and Navigating (`next/link`): https://nextjs.org/docs/app/building-your-application/caching/linking-and-navigating
- Next.js Docs — `loading.js` / `error.js` / `Suspense`: https://nextjs.org/docs/app/api-reference/file-conventions/loading
- Next.js Docs — Middleware & Authentication: https://nextjs.org/docs/app/building-your-application/routing/middleware
- Next.js 16 in 2026 — what's new (caching explicit, Server Actions matured): https://www.nirajiitr.com/blog/nextjs-16-2026-whats-new-what-to-use
- Production App Router Patterns 2026 (service layer, parallel fetch): https://www.jagatjeet.com/blog/nextjs-app-router-patterns-2026
- AGENTS.md proyek (`web/`): aturan bahasa, `.btn-cta`, sentralisasi konten, keamanan.

> File yang diaudit: `web/src/app/admin/products/page.tsx`, `web/src/components/admin/AdminTable.tsx`, `web/src/components/admin/AdminShell.tsx`, `web/src/components/admin/AdminSidebar.tsx`, `web/src/components/admin/AdminButton.tsx`, `web/src/content/admin-mock.ts`.
