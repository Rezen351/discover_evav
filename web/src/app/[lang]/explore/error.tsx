"use client";

import { useEffect } from "react";
import Link from "next/link";

export default function ExploreError({
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
    <main
      id="main-content"
      className="flex min-h-screen items-center justify-center px-4"
    >
      <div className="text-center">
        <h1 className="font-serif text-fluid-h2">Terjadi kesalahan</h1>
        <p className="mt-4 font-sans text-black/70">
          Halaman eksplorasi tidak dapat ditampilkan.
        </p>
        <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
          <button
            type="button"
            onClick={reset}
            className="btn-cta rounded-full px-6 py-3"
            aria-label="Coba muat ulang halaman eksplorasi"
          >
            Coba lagi
          </button>
          <Link
            href="/"
            className="btn-cta rounded-full px-6 py-3"
            aria-label="Kembali ke beranda"
          >
            Kembali ke Beranda
          </Link>
        </div>
      </div>
    </main>
  );
}
