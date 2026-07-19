# Responsive UI/UX Playbook — Discover Evav (Simfoni Evav)

> **Acuan wajib** untuk agent yang memperbaiki responsivitas tiap halaman.
> Tujuan: situs **tetap utuh & enak dipakai di mobile (360px) dan tablet (768–1024px)**,
> **TANPA mengubah tampilan desktop** yang sudah ada sekarang.

---

## 1. Riset & Standar (2025/2026)

- **Mobile-First Indexing**: Google menilai versi mobile untuk ranking. Situs WAJIB usable di 360px.
- **Breakpoint Tailwind default** (v4, mobile-first / min-width):
  - `sm` 640px — large phone / small tablet
  - `md` 768px — tablet
  - `lg` 1024px — laptop
  - `xl` 1280px — desktop
  - `2xl` 1536px — large desktop
- **Target uji wajib**: 360px (small phone), 390px (iPhone), 768px (tablet), 1024px (tablet landscape), 1280px+ (desktop — jangan diubah).
- **Unit**: gunakan `rem`/`%`/`vw`/`clamp()` untuk type & spacing. Hindari px fix untuk layout.
  - Type scale sudah fluid via `--text-fluid-*` di `globals.css` → gunakan class `text-fluid-*`.
- **Container**: wrapper section utama sudah pakai `max-w-[98%] xl:max-w-[1600px] mx-auto px-4 md:px-8 w-full` (sesuai AGENTS.md §7.2.4). Pertahankan.
- **Touch target**: minimal 44×44px untuk tombol/link navigasi.
- **Grid → stack**: `grid-cols-1` di mobile, naik ke `sm:grid-cols-2` / `lg:grid-cols-3` di layar besar. Jangan biarkan 3 kolom menumpuk sempit di 360px.
- **Jangan sembunyikan konten penting di mobile** (mis. hero cards yang `hidden md:flex` → beri fallback mobile, mis. carousel/stack sederhana atau sembunyikan saja yg murni dekoratif tapi pastikan CTA & teks tetap ada).

## 2. Aturan Besi (Agent Wajib Patuh)

1. **JANGAN ubah layout/style untuk `lg:` ke atas** (desktop & large desktop tetap persis seperti sekarang).
2. Hanya TAMBAH kelas responsif (`<lg` prefix: default mobile, `sm:`, `md:`) — jangan hapus kelas existing kecuali yg menyebabkan break.
3. Gunakan **mobile-first**: default = gaya mobile, `sm:`/`md:` = perbaikan ke tablet.
4. Paste konten (teks, gambar, CTA) tidak boleh hilang di mobile.
5. Hindari horizontal scroll di 360px (cek `overflow-x`).
6. Gambar/Video: pertahankan `next/image` + `sizes` responsif; `priority` hanya di hero di atas lipatan.
7. Aksesibilitas (AGENTS.md §9): tombol & link punya `aria-label`, fokus ring (`focus-ring`) tetap, skip-link jangan rusak.
8. Respect `prefers-reduced-motion` (sudah di-handle GSAP di banyak section — jangan cabut).

## 3. Checklist per Halaman

- [ ] Teks tidak overflow / tidak terpotong di 360px.
- [ ] Heading pakai `text-fluid-*` (skala otomatis).
- [ ] Grid/layout stack rapi di mobile & tablet.
- [ ] Navbar & menu mobile berfungsi (sudah ada drawer `lg:hidden`).
- [ ] Tidak ada elemen yang `hidden` tanpa fallback di mobile (khususnya hero).
- [ ] Spacing `px-4` mobile, `md:px-8` tablet ke atas.
- [ ] Tidak ada horizontal scrollbar di 360px.
- [ ] Tombol CTA bisa di-tap (>=44px), pakai `.btn-cta`/`.btn-spotlight` sesuai konvensi.

## 4. Cara Uji (manual, agent tidak bisa lihat visual)

- Jalankan `npm run build` & `npm run lint` harus lolos (tanpa error).
- Cek tidak ada kelas Tailwind salah / undefined.
- Pastikan tidak ada `console.error` syntax. Agent **DILARANG** klaim "sudah diuji visual" — cukup pastikan build & lint hijau dan logika kelas responsif benar.

---

*Setiap agent hanya mengedit section-component milik halamannya + page.tsx-nya. Jangan sentuh file halaman lain atau komponen shared (Navbar/Footer/AppShell) kecuali disebutkan.*
