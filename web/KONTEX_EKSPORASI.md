# BRIEF BERSAMA — IMPLEMENTASI MENU EKSPORASI (Festival Pesona Meti Kei)

Dokumen ini adalah konteks WAJIB bagi semua subagent yang mengerjakan komponen menu `/eksplorasi`.
Baca seluruh isi ini sebelum mulai. Setiap subagent adalah **Expert Frontend Developer sekaligus peminat seni & kebudayaan Kei** — hasil harus teknis sempurna DAN sarat nuansa budaya.

---

## 1. TUJUAN
Membangun halaman `/eksplorasi` (Festival Pesona Meti Kei) sebagai scrollytelling sinematik 7 babak,
konsisten dengan desain web `web/` yang sudah ada (Next.js 16 App Router, React 19, Tailwind v4, GSAP, TypeScript strict).

## 2. DESAIN DOKUMEN UTAMA
- `docs/page-designs/explorasi.md` — spesifikasi layout & copywriting tiap section (SUMBER UTAMA).
- `docs/GRAND_DESIGN.md` (v2.3) — Single Source of Truth token/aturan.
- `docs/page-designs/landing-page.md` & `keterhubungan.md` — referensi ritme & pola yang sudah jadi.

## 3. STACK & KONVENSI WAJIB (sudah terpasang, JANGAN install ulang kecuali benar-benar perlu)
- Next.js 16 App Router, React 19, TypeScript `strict: true` (HINDARI `any`).
- Tailwind CSS v4 (CSS-first via globals.css, class utility terpusat).
- GSAP + ScrollTrigger untuk animasi (via `gsap.context()` + `ctx.revert()` cleanup wajib).
- `@heroicons/react/24/outline` untuk ikon.
- `next/image` untuk semua gambar (wajib `alt` spesifik Bahasa Indonesia, §18.3).
- Font variable: `--font-sans` (Montserrat), `--font-serif` (Montaga), `--font-cursive` (Ephesis).
- Path alias `@/*` → `./src/*`.

## 4. TOKEN & UTILITY YANG SUDAH ADA (jangan hardcode hex, pakai ini)
- Warna: `text-brand` / `bg-brand` (= `--color-primary-pink` #E6677C), `bg-section` (= `--color-accent-pink`),
  `bg-tropical-dark` (#0B1F2A), `bg-tropical-dark-2`, `bg-hero-dark`, `bg-ocean-indigo`,
  `bg-nav-gradient`, `text-black/60`, `text-white/60` dll (opacity modifier didukung).
- Utility: `.btn-cta` (tanpa bg, border hitam→hover pink), `.btn-glass`, `.btn-glass-dark`,
  `.rounded-xl-design`, `.shadow-soft`, `.focus-ring`, `.bg-section`, `.bg-nav-gradient`.
- Container utama: `max-w-[98%] xl:max-w-[1600px] mx-auto px-4 md:px-8 w-full`.
- Setiap section: `className="relative w-full min-h-screen snap-start snap-always ... "`.
- GSAP: cek `prefers-reduced-motion`, `gsap.context(()=>{...}, ref)` + `return () => ctx.revert()`.

## 5. STRUKTUR FILE YANG AKAN DIBUAT
- `src/components/eksplorasi/HeroMetiSection.tsx` (Bagian I)
- `src/components/eksplorasi/WerWaratSection.tsx` (Bagian II)
- `src/components/eksplorasi/PentasSeniSection.tsx` (Bagian III)
- `src/components/eksplorasi/PerahuBelanSection.tsx` (Bagian IV)
- `src/components/eksplorasi/WisataAlamSection.tsx` (Bagian V — Wisata Alam, etalase spot alam)
- `src/components/eksplorasi/PenghormatanSection.tsx` (Bagian VI)
- `src/components/eksplorasi/InformasiPenutupSection.tsx` (Bagian VII, termasuk pinned CTA bar)
- `src/app/eksplorasi/page.tsx` (menggabungkan semua section + Navbar + Footer + skip-link)

## 6. ATURAN EMAS (AGENTS.md)
- Bahasa UI = Bahasa Indonesia (hangat/aktif/spesifik, nada Ain Ni Ain §8.6).
- Zero-hex hardcode — pakai token.
- `cursive` HANYA di Hero tagline + salam penutup (§2.4).
- A11y: `aria-label` ikon, `focus-ring`, skip-to-content, respek `prefers-reduced-motion`.
- Dark section (§19): `text-white`, border `border-white/10`, glow bukan shadow, foto `brightness-110 contrast-105`.
- Max 1 CTA primer + 1 sekunder per section.
- Hanya `Client Component` bila butuh interaktivitas (GSAP/state/event); sisanya bisa Server Component.
- JANGAN commit; JANGAN hapus komentar/dokumentasi existing di file lain.

## 7. REFERENSI POLA (dari riset web, sudah diadaptasi di explorasi.md)
- Gallery-Walk Scroll: tiap section = layar penuh, 1 foto sinematik + 1 narasi besar.
- Scroll-Darkening Narrative: terang (I–V) → dark tenang (VI) → dark bintang (VII).
- Escalating CTA: CTA "Pantau Jadwal Resmi" tumbuh jadi tombol penuh di §7.
- Fixed Bottom CTA bar di §7 (muncul >50% scroll, dismissible, a11y region).

## 8. ASSET GAMBAR
Belum ada file gambar spesifik Meti. Gunakan placeholder path di `/images/eksplorasi/...` (mis.
`/images/eksplorasi/meti_hero.jpg`, `/images/eksplorasi/wer_warat.jpg`, dst.) dengan `alt` deskriptif.
Gambar eksternal (bila dipakai) wajib didaftarkan di `next.config.ts` `images.remotePatterns`.
Untuk video hero: path `/videos/eksplorasi/meti-timelapse.mp4` (lazy-load, `preload="none"`).

## 9. CONTOH POLA KOMPONEN (dari JedaJiwaSection.tsx — ikuti ini)
```tsx
"use client";
import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
if (typeof window !== "undefined") gsap.registerPlugin(ScrollTrigger);

export default function XSection() {
  const ref = useRef<HTMLElement>(null);
  useEffect(() => {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const ctx = gsap.context(() => {
      if (prefersReduced) { gsap.set(".x-fade", { opacity: 1, y: 0 }); return; }
      gsap.from(".x-fade", { opacity: 0, y: 30, duration: 1.1, stagger: 0.2, ease: "power2.out",
        scrollTrigger: { trigger: ref.current, start: "top 70%", toggleActions: "play none none reverse" } });
    }, ref);
    return () => ctx.revert();
  }, []);
  return (<section id="x" ref={ref} className="relative w-full min-h-screen snap-start snap-always ...">...</section>);
}
```

## 10. NAVBAR (diperbarui oleh Subagent 8)
Tambahkan item navigasi `Eksplorasi` → `/eksplorasi` ke `navItemsId` & `navItemsEn` di `src/components/Navbar.tsx`,
serta daftarkan id section `/eksplorasi` ke logika `sections` dan `darkSections` agar tema navbar benar.
Tambahkan juga ke `src/app/sitemap.ts` bila ada.
