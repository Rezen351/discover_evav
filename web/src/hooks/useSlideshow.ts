import { useEffect, useState } from "react";

interface UseSlideshowOptions {
  count: number;
  interval?: number;
}

// Cross-fade slideshow index manager dengan autoplay dan preferensi
// prefers-reduced-motion (saat aktif, tampil foto pertama saja, tanpa autoplay).
// Timer dibersihkan di cleanup agar tidak bocor (§6.6 / §7.1.4 AGENTS).
export function useSlideshow({ count, interval = 5000 }: UseSlideshowOptions) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (count <= 1) return;

    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReduced) {
      return;
    }

    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % count);
    }, interval);

    return () => clearInterval(timer);
  }, [count, interval]);

  return { index, setIndex };
}
