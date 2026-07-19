# Best Practice Audit: /admin/news/baru (web/src/app/admin/news/baru/page.tsx)

> Laporan audit kepatuhan terhadap standar **Next.js 16 (App Router)**, React 19, dan TypeScript.
> Halaman target: formulir pembuatan artikel berita baru di panel admin (`/admin/news/baru`).
> Tanggal audit: 2026-07-20. Framework: Next.js 16.2.6, React 19.2.4, TypeScript 5 (strict).

---

## Ringkasan

Halaman `/admin/news/baru` adalah formulir pembuatan berita yang **seluruhnya dijalankan sebagai Client Component** (`"use client"` di baris 1) dengan state `useState` lokal dan handler `onClick` manual. Beban utama terhadap praktik terbaik Next.js 16 adalah: **tidak ada pengiriman data nyata (mock `console.log` + `router.push`)**, **tidak menggunakan Server Actions / `useActionState`**, **tidak ada validasi**, **tidak ada perlindungan rute (auth)**, dan **tidak ada `Metadata`**. Formulir tidak dibungkus elemen `<form>` sehingga kehilangan *progressive enhancement* dan aksesibilitas semantik. Di sisi positif, komponen pendukung (`RichTextEditor`, `AdminShell`, `AdminButton`) ditulis dengan perhatian aksesibilitas yang baik (aria-label, focus-ring), dan konstanta kategori/status diketik erat (tuple `as const`).

| Skor Kepatuhan | Nilai |
| --- | --- |
| **Rating** | 🟡 C (Butuh Perbaikan Signifikan) |
| **Skor** | **42 / 100** |

Skor rendah terutama karena absennya Server Actions, validasi, auth, dan semantik `<form>` yang merupakan inti dari halaman *admin create form* di App Router.

---

## Standar Next.js yang Direview

Daftar standar yang diuji terhadap kode aktual (berdasarkan dokumentasi resmi `nextjs.org/docs` App Router & panduan lokal `node_modules/next/dist/docs`):

1. **Server vs Client Components** — batas `"use client"`; jaga komponen Server sebanyak mungkin.
2. **Server Actions & Mutasi Data** — `"use server"`, `<form action={...}>`, `revalidatePath`, `redirect`.
3. **Penanganan Form & `useActionState`** — progressive enhancement, error state, pending state.
4. **Validasi Input** — skema (mis. Zod) di Server Action; tanpa data mentah masuk ke penyimpanan.
5. **Metadata API** — `export const metadata` per halaman.
6. **next/image / next/font / next/link** — aset & navigasi.
7. **loading.tsx / error.tsx / Suspense** — UX & pemisahan bundel.
8. **Route Segment Config & Rendering** — `dynamic`/`static`, `force-*`.
9. **Auth / Perlindungan Rute** — middleware/guard untuk area admin.
10. **Aksesibilitas & HTML Semantik** — `<form>`, `<label htmlFor>`, `aria-*`, `prefers-reduced-motion`.
11. **Performa & TypeScript** — `strict: true`, hindari `any`, kelola state & bundel.

---

## Analisis Kepatuhan

| # | Standar | Status | Bukti (file:baris) |
| --- | --- | --- | --- |
| 1 | Server vs Client Components | ⚠️ | `"use client"` baris 1 menandai **seluruh halaman** sebagai client. Halaman admin create form sebagian besar dapat tetap Server Component dengan Server Action; hanya `RichTextEditor` (Tiptap) yang wajib client. |
| 2 | Server Actions & Mutasi | ❌ | Tidak ada `"use server"` di manapun di proyek (`grep` `"use server"` → 0 hasil). `handleSimpan` (baris 29-33) hanya `console.log` lalu `router.push("/admin/news")`. Data **tidak disimpan** ke mana pun. |
| 3 | Form & `useActionState` | ❌ | Tidak ada elemen `<form>` (baris 35-166). Submit via `<button onClick={handleSimpan}>` (baris 154-160). Tidak ada `useActionState`, `useFormStatus`, `pending`, atau `aria-live` untuk error/pesan. Kehilangan progressive enhancement. |
| 4 | Validasi Input | ❌ | Tidak ada validasi sama sekali. Field bisa dikirim kosong (judul/isi/penulis kosong). Tidak ada skema (Zod/serupa). `select` di-cast dengan `as (typeof KATEGORI)[number]` (baris 107, 141) tanpa pemeriksaan nilai valid. |
| 5 | Metadata API | ❌ | Tidak ada `export const metadata`. Bandingkan `web/src/app/admin/news/page.tsx:9-12` yang memiliki `metadata` — halaman `baru` tidak. |
| 6 | next/image / next/font / next/link | ✅ | Tidak ada penggunaan yang melanggar. `AdminButton` menggunakan `<a href>` (bukan `next/link`) — dapat diterima untuk internal admin tetapi `next/link` lebih ideal (lihat rekomendasi). Font dikelola di `AdminShell` via `var(--font-sans)`. |
| 7 | loading.tsx / error.tsx / Suspense | N/A | Halaman tidak async/data-fetch berat di sisi server; belum relevan, namun `<RichTextEditor>` memuat TipTap (client) tanpa skeleton (minor). |
| 8 | Route Config & Rendering | ⚠️ | Tidak ada `export const dynamic`/`revalidate`. Karena halaman client + mock, tidak kritis saat ini, namun setelah migrasi ke Server Action perlu ditetapkan agar revalidasi berjalan. |
| 9 | Auth / Perlindungan Rute | ❌ | Tidak ada `middleware.ts` (glob → 0 hasil) dan tidak ada pemeriksaan sesi di halaman maupun Server Action. **Area `/admin` sepenuhnya tidak terproteksi.** |
| 10 | Aksesibilitas & Semantik | ⚠️ | Positif: semua `<input>/<select>` punya `<label htmlFor>` (baris 52, 66, 81, 100, 120, 134) dan tombol punya `ariaLabel`. Negatif: tidak ada `<form>` (label terlepas dari submit), tidak ada `required`, tidak ada `aria-live`/announce error, `RichTextEditor` tiada `prefers-reduced-motion` handling (namun bukan animasi). |
| 11 | Performa & TypeScript | ⚠️ | Tipe erat (`as const` baris 10-11, tuple) — baik. Namun menandai **seluruh halaman** client (baris 1) memaksa bundel React + state besar dikirim ke klien padahal tidak perlu untuk layout. `form=""` di `AdminButton` (baris 157) adalah *no-op* yang membingungkan. |

**Legenda:** ✅ Memenuhi · ⚠️ Sebagian / Perlu perhatian · ❌ Melanggar / Tidak ada · N/A Tidak berlaku

---

## Temuan & Masalah

| Severity | Masalah | Lokasi |
| --- | --- | --- |
| 🔴 Critical | **Tidak ada penyimpanan data.** `handleSimpan` hanya `console.log` + `router.push`; artikel tidak tersimpan ke DB/store mana pun (baris 29-33). Fitur inti tidak berfungsi. | `page.tsx:29-33` |
| 🔴 Critical | **Tidak ada Server Action.** Seluruh alur mutasi dilakukan di client; melanggar pola mutasi data App Router (seharusnya `"use server"` + `<form action>`). | `page.tsx:1,29-33` |
| 🔴 Critical | **Area admin tidak terproteksi (no auth).** Tidak ada `middleware`/guard/sesi. Siapa pun bisa mengakses `/admin/*`. | proyek (tidak ada `middleware.ts`) |
| 🟠 High | **Tidak ada validasi input.** Field kosong diperbolehkan; tidak ada skema validasi. Berisiko data rusak & abuse. | `page.tsx:22-27,29-33` |
| 🟠 High | **Formulir tidak semantik (`<form>` absen).** Submit via `onClick` bukan `<form action>`, kehilangan progressive enhancement (gagal saat JS non-aktif/lambat) & submit keyboard standar. | `page.tsx:35-166,154-160` |
| 🟠 High | **Tidak ada feedback state (pending/error/sukses).** Tidak `useActionState`/`useFormStatus`; tombol tidak `disabled` saat mengirim; tidak ada `aria-live` untuk pesan. | `page.tsx:154-160` |
| 🟡 Medium | **Tidak ada `metadata`.** Halaman admin kehilangan title/description SEO & tab. | `page.tsx` (seluruh file) |
| 🟡 Medium | **Seluruh halaman dijadikan Client Component.** Layout admin (header, field statis) tidak butuh state; membesar bundel klien. Sebaiknya hanya leaf component (editor) yang client. | `page.tsx:1` |
| 🟡 Medium | **`form=""` pada `AdminButton`** (baris 157) adalah atribut kosong yang tidak melakukan apa-apa; menunjukkan niat `<form>` yang tak selesai. | `page.tsx:157`, `AdminButton.tsx:9,41` |
| 🟡 Medium | **Casting `as` pada `select`** tanpa verifikasi nilai (baris 107, 141). Jika opsi berubah, tipe bisa salah secara diam-diam. |
| 🟢 Low | `AdminButton` menggunakan `<a href>` alih-alih `next/link` untuk navigasi internal; kehilangan prefetch & SPA nav. | `AdminButton.tsx:34` |

---

## Rekomendasi Perbaikan

### 1. Gunakan Server Action untuk penyimpanan (ganti mock)
Buat `web/src/app/admin/news/actions.ts` dengan `"use server"`. Lakukan validasi di server, lalu `revalidatePath` + `redirect`.

```ts
// web/src/app/admin/news/actions.ts
"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

const KATEGORI = ["Budaya", "Event", "Infrastruktur", "Pengumuman"] as const;
const STATUS = ["Draft", "Publikasikan"] as const;

export interface BeritaState {
  message?: string;
  errors?: Record<string, string[]>;
}

export async function createBerita(
  _prev: BeritaState,
  formData: FormData,
): Promise<BeritaState> {
  const judul = String(formData.get("judul") ?? "").trim();
  const isi = String(formData.get("isi") ?? "").trim();
  const penulis = String(formData.get("penulis") ?? "").trim();
  const ringkasan = String(formData.get("ringkasan") ?? "").trim();
  const kategori = String(formData.get("kategori") ?? "");
  const status = String(formData.get("status") ?? "");

  const errors: Record<string, string[]> = {};
  if (!judul) errors.judul = ["Judul wajib diisi."];
  if (!isi) errors.isi = ["Isi berita wajib diisi."];
  if (!penulis) errors.penulis = ["Nama penulis wajib diisi."];
  if (!KATEGORI.includes(kategori as (typeof KATEGORI)[number]))
    errors.kategori = ["Kategori tidak valid."];
  if (!STATUS.includes(status as (typeof STATUS)[number]))
    errors.status = ["Status tidak valid."];

  if (Object.keys(errors).length > 0) {
    return { errors };
  }

  // await saveBeritaToDb({ judul, isi, penulis, ringkasan, kategori, status });

  revalidatePath("/admin/news");
  redirect("/admin/news");
}
```

### 2. Ubah halaman menjadi form semantik dengan `useActionState`
Hapus `"use client"` dari level halaman bila memungkinkan; pisahkan leaf form ke Client Component yang memanggil `useActionState`.

```tsx
// web/src/app/admin/news/baru/BeritaForm.tsx  ("use client")
"use client";
import { useActionState } from "react";
import { createBerita, type BeritaState } from "../actions";
import RichTextEditor from "@/components/admin/RichTextEditor";

const initialState: BeritaState = {};

export default function BeritaForm() {
  const [state, formAction, pending] = useActionState(createBerita, initialState);

  return (
    <form action={formAction} className="space-y-6">
      <div>
        <label htmlFor="judul" className={labelClass}>Judul Berita</label>
        <input id="judul" name="judul" required className={inputClass} />
        {state.errors?.judul && (
          <p className="text-red-600 text-xs mt-1" aria-live="polite">{state.errors.judul[0]}</p>
        )}
      </div>

      <div>
        <label htmlFor="isi" className={labelClass}>Isi Berita</label>
        <RichTextEditor name="isi" />
      </div>

      {/* ringkasan, kategori, penulis, status dengan name="" + required */}
      <button type="submit" disabled={pending} aria-label="Simpan berita">
        {pending ? "Menyimpan…" : "Simpan Berita"}
      </button>
    </form>
  );
}
```

> Catatan: `RichTextEditor` saat ini mengembalikan HTML via `onChange` (controlled). Untuk digunakan di `<form action>`, editor harus menulis ke hidden `<input name="isi">` (lihat poin 3) karena Server Action membaca `FormData`, bukan state React.

### 3. Adaptasi `RichTextEditor` untuk Server Action
Tambahkan `name` prop dan sinkronkan HTML ke `<input type="hidden" name={name}>`:

```tsx
// dalam RichTextEditor, terima prop name?: string
{name && <input type="hidden" name={name} value={value} />}
```

### 4. Tambahkan `metadata` pada halaman
```ts
// web/src/app/admin/news/baru/page.tsx
export const metadata: Metadata = {
  title: "Tulis Berita Baru — Simfoni Evav",
  description: "Buat artikel, pengumuman, atau konten editorial pariwisata Kepulauan Kei.",
};
```

### 5. Proteksi rute admin (auth)
Buat `web/src/middleware.ts` yang memeriksa sesi untuk segmen `/admin` (kecuali halaman login). Selalu verifikasi otorisasi **di dalam** Server Action juga (dok: "Server Functions are reachable via direct POST requests… Always verify authentication inside every Server Function").

```ts
// web/src/middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const token = req.cookies.get("session")?.value;
  if (!token) {
    return NextResponse.redirect(new URL("/admin/login", req.url));
  }
  return NextResponse.next();
}

export const config = { matcher: ["/admin/:path*"] };
```

### 6. Gunakan `next/link` di `AdminButton` untuk navigasi internal
Ganti `<a href>` dengan `next/link` agar prefetch & SPA navigation aktif (`AdminButton.tsx:34`).

### 7. Batasi `"use client"` ke leaf component
`AdminShell`, `AdminPageHeader` dapat tetap Server Component; hanya `RichTextEditor` dan `BeritaForm` (karena `useActionState`) yang butuh client. Hapus `"use client"` di `page.tsx` utama dan delegasikan interaktivitas ke `BeritaForm`.

---

## Referensi

- Next.js — Mutating Data (Server Actions): `https://nextjs.org/docs/app/getting-started/mutating-data`
- Next.js — Forms (validation, `useActionState`, pending): `node_modules/next/dist/docs/01-app/02-guides/forms.md`
- Next.js — Authentication guide: `node_modules/next/dist/docs/01-app/02-guides/authentication.md`
- Next.js — Data Security (auth di Server Functions): `node_modules/next/dist/docs/01-app/02-guides/data-security.md`
- Next.js — Error Handling (`useActionState`): `node_modules/next/dist/docs/01-app/01-getting-started/10-error-handling.md`
- Next.js — `revalidatePath` / `redirect` API Reference: `node_modules/next/dist/docs/01-app/03-api-reference/`
- React — `useActionState`: `https://react.dev/reference/react/useActionState`
- React — `useFormStatus`: `https://react.dev/reference/react-dom/hooks/useFormStatus`
- AGENTS.md proyek (`web/`): aturan Bahasa ID, Server/Client boundary, validasi input (§5.2), aksesibilitas (§9).
- Dokumen terkait proyek: `docs/GRAND_DESIGN.md`, `web/src/content/admin-mock.ts` (tipe `BeritaRow`).
- File yang diaudit: `web/src/app/admin/news/baru/page.tsx`, `web/src/components/admin/{AdminButton,RichTextEditor,AdminShell,AdminPageHeader,AdminSidebar,AdminTopbar}.tsx`, `web/src/app/admin/news/page.tsx`.
