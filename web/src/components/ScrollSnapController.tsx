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
      root.classList.add("snap-y", "snap-mandatory");
    } else {
      root.classList.remove("snap-y", "snap-mandatory");
    }
  }, [isLanding]);

  return null;
}
