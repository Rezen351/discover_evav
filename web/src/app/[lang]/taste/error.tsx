"use client";

import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <section className="min-h-[60vh] flex flex-col items-center justify-center gap-4 px-4 text-center">
      <h2 className="font-serif text-fluid-h3">Halaman rasa Kei gagal dimuat</h2>
      <p className="max-w-md text-sm text-neutral-600">
        Terjadi kendala saat menampilkan halaman ini. Silakan coba lagi.
      </p>
      <button onClick={reset} className="btn-cta" aria-label="Coba muat ulang halaman rasa Kei">
        Coba lagi
      </button>
    </section>
  );
}
