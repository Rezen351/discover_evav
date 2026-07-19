# Best Practice Audit: /admin/settings (web/src/app/admin/settings/page.tsx)

> **Metode audit:** Peninjauan statis (static review) kode sumber + riset praktik terbaik Next.js 16 (App Router) dari dokumentasi resmi nextjs.org/docs dan sumber tepercaya 2026. Tidak ada perubahan kode yang dilakukan (hanya laporan ini).

---

## Ringkasan

Halaman `/admin/settings` adalah halaman formulir penyimpanan **pengaturan (settings)** pada panel admin CMS. Saat ini halaman tersebut **tidak berfungsi sebagai formulir yang sebenarnya**: tidak ada atribut `action` pada elemen `<form>`, tidak ada atribut `name` pada `<input>`, tidak ada Server Action, tidak ada validasi, tidak ada `useActionState`, dan tidak ada perlindungan autentikasi/otorisasi. Secara visual halaman terlihat lengkap (header, grup pengaturan, tombol "Simpan"), namun secara fungsional **tombol Simpan tidak melakukan apa-apa** dan nilai yang diubah tidak pernah dikirim ke server.

Halaman ini mengikuti beberapa konvensi yang baik (Server Component default, Metadata API, sentralisasi konten di `src/content/admin-mock.ts`, aksesibilitas label dasar), namun gagal memenuhi standar inti Next.js 16 untuk **mutasi data via Server Actions**, **penanganan formulir & validasi**, dan **keamanan akses admin**.

**Rating: ❌ Tidak Memenuhi Standar (Fungsionalitas formulir rusak)**

**Skor: 38 / 100**

| Kategori | Skor |
| --- | --- |
| Server/Client Component boundary | 18/20 |
| Metadata API | 10/10 |
| Sentralisasi konten | 8/10 |
| Aksesibilitas dasar (label) | 7/10 |
| Data fetching / mutasi (Server Actions) | 0/20 |
| Validasi & penanganan error | 0/10 |
| Keamanan (auth/otorisasi form) | 0/10 |
| **Total** | **38/100** |

---

## Standar Next.js yang Direview

Standar praktik terbaik Next.js 16 (App Router) yang dijadikan rujukan dalam audit ini:

1. **Server vs Client Components** — Komponen default adalah Server Component; `"use client"` hanya untuk interaktivitas (`useState`, `useEffect`, `useActionState`). Sumber: nextjs.org/docs/app/getting-started/server-and-client-components.
2. **Server Actions untuk mutasi** — Mutasi data (menyimpan pengaturan) dilakukan via fungsi `"use server"` yang diikat ke atribut `action` form, bukan API route terpisah. Sumber: nextjs.org/docs/app/guides/forms.
3. **Penanganan formulir & `useActionState`** — Formulir menggunakan `action={formAction}` dari `useActionState` untuk pending state, error, dan progressive enhancement. Sumber: nextjs.org/docs/app/guides/forms.
4. **Validasi input (Zod `safeParse`)** — Validasi server-side wajib; jangan percaya validasi klien. Sumber: nextjs.org/docs/app/guides/forms, securestartkit.com.
5. **Penanganan error terstruktur** — Kembalikan objek state terstruktur (`{ ok, errors }`), jangan lempar exception untuk error validasi. Sumber: nextjs.org/docs/app/guides/forms.
6. **Revalidasi setelah mutasi** — Gunakan `revalidatePath`/`revalidateTag` setelah menyimpan data. Sumber: nextjs.org/docs/app/guides/forms, nextjs.org/docs/app/building-your-application/caching.
7. **Metadata API** — Ekspor `metadata` dari halaman. Sumber: nextjs.org/docs/app/getting-started/metadata-and-og-images.
8. **Keamanan: autentikasi & otorisasi di dalam Server Action** — Setiap Server Action adalah endpoint HTTP publik; harus verifikasi authz di dalam action, bukan hanya mengandalkan layout/middleware. Sumber: nextjs.org/docs/app/guides/forms, nextjs.org/docs/app/guides/authentication.
9. **Aksesibilitas formulir (semantik HTML & label)** — `<label htmlFor>` terkait `id`, `aria-live`/`role="alert"` untuk error, `disabled={pending}`. Sumber: nextjs.org/docs/app/guides/forms, WAI-ARIA.
10. **Sentralisasi konten** — Data statis di file konten terpusat (sesuai AGENTS.md §4.10).
11. **Route segment config / rendering** — Pemahaman dynamic vs static, `dynamic = "force-dynamic"` bila perlu data sesi.

---

## Analisis Kepatuhan

| # | Standar | Status | Bukti (file:baris) |
| --- | --- | --- | --- |
| 1 | Server vs Client Component boundary | ✅ | `page.tsx:13` — `export default function AdminPengaturanPage()` tanpa `"use client"` (Server Component). Benar. |
| 2 | Server Actions untuk mutasi | ❌ | `page.tsx:29` — `<form id="form-pengaturan" ...>` **tidak punya atribut `action`**. Tidak ada file `"use server"` sama sekali di `src/` (grep `use server` = kosong). |
| 3 | `useActionState` / form action | ❌ | `page.tsx:29` form statis; tombol submit di `page.tsx:23` (`AdminButton type="submit" form="form-pengaturan"`) tidak terhubung ke action apa pun. |
| 4 | Atribut `name` pada input | ❌ | `page.tsx:51-56` — `<input>` tidak memiliki `name`. Tanpa `name`, `FormData` kosong; tidak ada data yang terkirim. |
| 5 | Validasi input (Zod) | ❌ | Tidak ada skema validasi. `zod` tidak terinstall (grep `zod` di `package.json`/`src` = kosong). |
| 6 | Penanganan error terstruktur | ❌ | Tidak ada state error, tidak ada `role="alert"`/`aria-live`. |
| 7 | Revalidasi setelah mutasi | ❌ | `revalidatePath`/`revalidateTag` tidak digunakan (tidak ada Server Action). |
| 8 | Metadata API | ✅ | `page.tsx:8-11` — `export const metadata: Metadata = {...}` lengkap dengan `title` & `description` Bahasa Indonesia. |
| 9 | Keamanan: auth/otorisasi | ❌ | Tidak ada pemeriksaan auth di halaman maupun layout (`web/src/app/admin/layout.tsx` tidak ada; grep `auth/session/middleware/redirect` di `src/app/admin` = kosong). |
| 10 | Aksesibilitas formulir | ⚠️ | `page.tsx:54` ada `aria-label` pada input, tapi tidak ada `<label htmlFor>`/`id`, tidak ada `role="alert"` untuk error, tidak ada `disabled={pending}`. |
| 11 | Sentralisasi konten | ✅ | Data di `src/content/admin-mock.ts:272` (`pengaturanList`) — sesuai AGENTS.md §4.10. |
| 12 | Dynamic/static rendering | ⚠️ | Halaman statis (data mock), tapi sebagai admin settings yang menyimpan data pengguna, seharusnya diproteksi & dirender dinamis. Tidak ada `dynamic` config. |

---

## Temuan & Masalah

### Kritis (Formulir tidak berfungsi & tidak aman)

- **F-1 (Kritis): Form tidak memiliki `action` → tombol Simpan tidak melakukan apa pun.**
  `web/src/app/admin/settings/page.tsx:29` — `<form id="form-pengaturan" className="flex flex-col gap-6">` tidak punya `action`. Submit mengirim request POST navigasi biasa tanpa handler; tidak ada penyimpanan. **Severity: Critical.**

- **F-2 (Kritis): Input tidak memiliki atribut `name`.**
  `web/src/app/admin/settings/page.tsx:51-56` — `<input type="text" defaultValue={item.nilai} ... />` tanpa `name`. Server tidak akan menerima nilai apa pun dari `FormData`. **Severity: Critical.**

- **F-3 (Kritis): Tidak ada Server Action / logika penyimpanan.**
  Seluruh `src/` tidak mengandung `"use server"`. Menyimpan pengaturan tidak mungkin dilakukan. **Severity: Critical.**

- **F-4 (Kritis): Tidak ada autentikasi/otorisasi pada halaman admin.**
  `web/src/app/admin/` tidak punya `layout.tsx` dengan pengecekan sesi, tidak ada `middleware.ts` yang melindungi `/admin/*`, dan tidak ada cek auth di dalam action (karena action tidak ada). Halaman settings dapat diakses siapa saja. **Severity: Critical** (keamanan).

### Tinggi (Mutasi & UX tidak sesuai standar)

- **F-5 (Tinggi): Tidak ada validasi input.**
  Tidak ada Zod/skema validasi; `zod` tidak terinstall. Input seperti "Email Redaksi" (`page.tsx` data `s5`) seharusnya divalidasi format email. **Severity: High.**

- **F-6 (Tinggi): Tidak ada `useActionState` / pending state / error display.**
  Tidak ada `aria-live`, `role="alert"`, atau `disabled={pending}` sehingga pengguna tidak mendapat umpan balik saat menyimpan. **Severity: High.**

- **F-7 (Tinggi): Tidak ada revalidasi cache setelah mutasi.**
  Tanpa `revalidatePath`/`revalidateTag`, data yang disimpan tidak tercermin di UI. **Severity: High.** (Tergantung F-3 terlebih dahulu.)

### Menengah (Aksesibilitas & struktur form)

- **F-8 (Menengah): Input memakai `aria-label` tapi tanpa `<label htmlFor>` + `id`.**
  `page.tsx:54` hanya `aria-label={item.nama}`. Lebih baik gunakan `<label htmlFor={item.id}>` eksplisit yang terhubung ke `id` input untuk asosiasi label yang kuat. **Severity: Medium.**

- **F-9 (Menengah): Tombol submit berada di luar `<form>` (header) dan diikat via `form="form-pengaturan"`.**
  `page.tsx:23` (`AdminButton form="form-pengaturan"`) — ini valid HTML, tapi butuh `type="submit"` yang benar (sudah diberikan) DAN form harus memiliki action yang nyata. Saat ini pengikatan ini tidak berguna karena F-1. **Severity: Medium.**

- **F-10 (Menengah): `defaultValue` tanpa kunci `key`/`revalidatePath` dapat menampilkan data stale.**
  `page.tsx:53` `defaultValue={item.nilai}` — bila data diubah di server, Server Component tidak otomatis merender ulang tanpa revalidasi. **Severity: Medium.**

### Rendah (Kecil)

- **F-11 (Rendah): Tidak ada `dynamic` route segment config.**
  Untuk halaman yang membaca sesi/admin, pertimbangkan `export const dynamic = "force-dynamic"` agar tidak ter-cache secara statis. **Severity: Low.**

- **F-12 (Rendah): Tidak ada `loading.tsx`/`error.tsx`/`Suspense` di segmen admin.**
  Standar App Router menyarankan boundary ini untuk UX yang tangguh. **Severity: Low.**

---

## Rekomendasi Perbaikan

> Catatan: Sesuai AGENTS.md §6.4 & §7.4, penambahan dependensi (`zod`) memerlukan persetujuan pengguna. Rekomendasi di bawah menggunakan pola tanpa library eksternal (validasi manual) sebagai opsi minimal, dengan catatan opsional Zod.

### R-1 (Wajib) — Tambahkan Server Action penyimpanan + `action` pada form

Buat `web/src/app/admin/settings/actions.ts`:

```ts
"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
// import { requireAdmin } from "@/lib/auth"; // TODO: sesuaikan dengan implementasi auth proyek

export interface SettingsState {
  ok: boolean;
  message?: string;
  errors?: Record<string, string[]>;
}

const allowedKeys = new Set([
  "s1", "s2", "s3", "s4", "s5", "s6",
]);

export async function saveSettings(
  _prev: SettingsState,
  formData: FormData,
): Promise<SettingsState> {
  // 1) Authorize (setiap action adalah endpoint publik)
  // await requireAdmin();

  // 2) Validasi (minimal, tanpa dependensi)
  const errors: Record<string, string[]> = {};
  const values: Record<string, string> = {};

  for (const [key, value] of formData.entries()) {
    if (!allowedKeys.has(key)) continue; // tolak field tak dikenal
    const v = String(value).trim();
    if (key === "s5" && v && !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(v)) {
      errors[key] = ["Format email tidak valid."];
    }
    if (!v) errors[key] = ["Nilai tidak boleh kosong."];
    values[key] = v;
  }

  if (Object.keys(errors).length > 0) {
    return { ok: false, errors };
  }

  // 3) Simpan ke sumber data (DB/env) — ganti dengan DAL proyek
  // await updateSiteSettings(values);

  // 4) Revalidasi agar UI mencerminkan perubahan
  revalidatePath("/admin/settings");

  return { ok: true, message: "Pengaturan berhasil disimpan." };
}
```

### R-2 (Wajib) — Hubungkan form ke Server Action via `useActionState`

Karena form butuh state (`useActionState`), pisahkan menjadi Client Component `SettingsForm.tsx` dan panggil dari Server Component `page.tsx`.

`web/src/app/admin/settings/SettingsForm.tsx`:

```tsx
"use client";

import { useActionState } from "react";
import { saveSettings, type SettingsState } from "./actions";
import { pengaturanList } from "@/content/admin-mock";

const initialState: SettingsState = { ok: false };

export default function SettingsForm() {
  const [state, formAction, pending] = useActionState(saveSettings, initialState);
  const grup = Array.from(new Set(pengaturanList.map((s) => s.grup)));

  return (
    <form action={formAction} className="flex flex-col gap-6">
      {state.ok && (
        <p role="status" className="text-sm text-green-700">{state.message}</p>
      )}
      {state.errors?._form && (
        <p role="alert" className="text-sm text-red-600">{state.errors._form[0]}</p>
      )}

      {grup.map((namaGrup) => {
        const itemGrup = pengaturanList.filter((s) => s.grup === namaGrup);
        return (
          <section key={namaGrup} aria-label={`Pengaturan ${namaGrup}`} className="...">
            <h2>{namaGrup}</h2>
            {itemGrup.map((item) => (
              <div key={item.id}>
                <label htmlFor={item.id} className="...">{item.nama}</label>
                <p>{item.deskripsi}</p>
                <input
                  id={item.id}
                  name={item.id}            /* F-2: name wajib ada */
                  type="text"
                  defaultValue={item.nilai}
                  aria-invalid={Boolean(state.errors?.[item.id])}
                  aria-describedby={state.errors?.[item.id] ? `${item.id}-err` : undefined}
                  className="..."
                />
                {state.errors?.[item.id] && (
                  <p id={`${item.id}-err`} role="alert" className="text-sm text-red-600">
                    {state.errors[item.id][0]}
                  </p>
                )}
              </div>
            ))}
          </section>
        );
      })}

      <button type="submit" disabled={pending} className="btn-cta">
        {pending ? "Menyimpan…" : "Simpan"}
      </button>
    </form>
  );
}
```

Kemudian `page.tsx` cukup merender `<SettingsForm />` di dalam `AdminShell` (tanpa `"use client"` di page).

### R-3 (Wajib) — Tambahkan perlindungan akses admin

Buat `web/src/app/admin/layout.tsx` (atau `middleware.ts`) yang memeriksa sesi dan me-redirect jika bukan admin:

```tsx
import { redirect } from "next/navigation";
// import { getSession } from "@/lib/auth";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  // const session = await getSession();
  // if (!session?.user || session.user.role !== "admin") redirect("/login");
  return <>{children}</>;
}
```

**Penting:** Cek auth di layout **tidak cukup** untuk Server Action — action sendiri harus memanggil `requireAdmin()` (lihat R-1 langkah 1), karena action adalah endpoint HTTP terpisah yang bisa di-POST langsung.

### R-4 (Disarankan) — Gunakan Zod untuk validasi terpusat

Setelah persetujuan penambahan `zod` (AGENTS.md §6.4), ganti validasi manual di R-1 dengan:

```ts
import { z } from "zod";
const schema = z.object({
  s1: z.string().min(1),
  s2: z.string().min(1),
  s3: z.string().min(1),
  s4: z.string().min(1),
  s5: z.string().email("Format email tidak valid."),
  s6: z.string().min(1),
});
const parsed = schema.safeParse(Object.fromEntries(formData));
if (!parsed.success) {
  return { ok: false, errors: parsed.error.flatten().fieldErrors };
}
```

### R-5 (Disarankan) — Aksesibilitas label eksplisit

Ganti `aria-label` tunggal (`page.tsx:54`) dengan `<label htmlFor={item.id}>` + `id` pada input (sudah ditunjukkan di R-2), sesuai panduan form Next.js & WAI-ARIA.

### R-6 (Opsional) — Tambahkan `loading.tsx` / `error.tsx` di segmen admin

```tsx
// web/src/app/admin/settings/loading.tsx
export default function Loading() {
  return <p className="text-black/50">Memuat pengaturan…</p>;
}
```

---

## Referensi

- Next.js — **Forms & Server Actions**: https://nextjs.org/docs/app/guides/forms
- Next.js — **Server Actions & Mutations**: https://nextjs.org/docs/app/building-your-application/data-fetching/server-actions-and-mutations
- Next.js — **Authentication (verifikasi auth di dalam action)**: https://nextjs.org/docs/app/guides/authentication
- Next.js — **Metadata API**: https://nextjs.org/docs/app/getting-started/metadata-and-og-images
- Next.js — **Server and Client Components**: https://nextjs.org/docs/app/getting-started/server-and-client-components
- Next.js — **Caching & Revalidation (revalidatePath/revalidateTag)**: https://nextjs.org/docs/app/building-your-application/caching
- React — **useActionState**: https://react.dev/reference/react/useActionState
- React — **useFormStatus**: https://react.dev/reference/react-dom/useFormStatus
- SecureStartKit — **Server Actions + Zod validate every input (2026)**: https://securestartkit.com/blog/next-js-server-actions-zod-the-complete-guide-to-type-safe-form-validation
- Tomoda Hinata — **RHF × Next.js Server Actions (2026)**: https://tomodahinata.com/en/blog/react-hook-form-nextjs-server-actions-useactionstate-guide
- AGENTS.md proyek (`web/`) — §4.10 Sentralisasi Konten, §5 Keamanan, §6.4 Larangan Dependensi Tanpa Izin.
