# Simfoni Evav — Discover Evav (Web)

Website pariwisata *storytelling* Kepulauan Kei, Maluku Tenggara. Next.js 16 (App Router) · React 19 · TypeScript · Tailwind CSS v4 · GSAP · MapLibre GL.

## Menjalankan Secara Lokal

> **Catatan:** Proyek ini membutuhkan **Node.js >= 20.9.0**. Jika default `node` di sistem adalah v18, gunakan versi 20 (mis. via nvm: `nvm use 20`).

```bash
npm install
npm run dev
```

Buka [http://localhost:3000](http://localhost:3000).

Perintah lainnya:

```bash
npm run build   # production build (implisit typecheck)
npm run lint    # ESLint (eslint-config-next)
```

## Struktur Rute (`src/app/`)

| Rute | Isi |
|------|-----|
| `/` | Halaman utama (Hero, FunFact, JourneyMap, BudayaAdat, DestinasiTerbaik, BeritaUmkm, Contact, Footer) |
| `/destinasi` | Halaman destinasi wisata alam (Pantai Ngurbloat, Gua Hawang, Pulau Bair, Ngurtafur, Kei Besar, Petroglyph) |
| `/budaya` | Halaman budaya & sejarah (Larvul Ngabal, Ain Ni Ain, Belis, Tenun Ikat, Islam 1252 M) |
| `/kuliner` | Halaman kuliner (Papeda, Sagu Kasbi, Enbal, Terasi Dobo, Tumis Sirsir, Lompa-lompa, dll) |
| `/admin` | Dashboard CMS sederhana (statistik, tabel data, status publikasi) |
| `/keterhubungan` | Halaman keterhubungan / community-based tourism |

## Konvensi Desain

Semua keputusan desain (tipografi, warna, radius, animasi, aksesibilitas) **terpusat** di [`docs/GRAND_DESIGN.md`](../docs/GRAND_DESIGN.md). Aturan project (bahasa, arsitektur, keamanan) ada di [`AGENTS.md`](../AGENTS.md).

Singkatnya:
- Teks UI berbahasa Indonesia; nama variabel/fungsi bahasa Inggris.
- Gunakan utility class terpusat (`text-brand`, `bg-section`, `bg-tropical-dark`) — jangan hardcode hex.
- Konten statis dipusatkan di `src/content/*`.
- Gambar wajib `next/image`; hostname eksternal didaftar di `next.config.ts`.

## Catatan Build

Lint mungkin menampilkan error pre-existing di `src/components/Navbar.tsx` (terkait React Compiler / hook rules) yang berada di luar scope pengembangan halaman ini. Build (`next build`) tetap lolos.
