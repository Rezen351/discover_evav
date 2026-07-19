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
      // Aktifkan scroll-snap magnetik (GRAND_DESIGN §4.2). Styling snap ada di
      // globals.css (.snap-active) agar tidak bergantung utility Tailwind dari JS.
      root.classList.add("snap-active");
    } else {
      root.classList.remove("snap-active");
    }
  }, [isLanding]);

  return null;
}
