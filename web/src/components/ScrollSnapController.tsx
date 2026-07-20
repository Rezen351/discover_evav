"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

/**
 * Menerapkan scroll-snap (magnetik) HANYA di landing page ("/").
 * Halaman lain menggunakan scroll biasa/normal tanpa snap.
 * Class per-section (snap-start) menjadi inert tanpa container snap di sini.
 */
export default function ScrollSnapController() {
  const pathname = usePathname();
  const isLanding = pathname === "/";

  useEffect(() => {
    const root = document.documentElement;
    if (isLanding) {
      // Aktifkan scroll-snap magnetik (GRAND_DESIGN §4.2) HANYA di landing
      // page. Styling snap ada di globals.css (.snap-active pada <html>) agar
      // tidak bergantung utility Tailwind yang di-inject lewat JS. Class pada
      // <html> memastikan snap tidak bocor ke halaman lain.
      root.classList.add("snap-active");
    } else {
      root.classList.remove("snap-active");
    }
  }, [isLanding]);

  return null;
}
