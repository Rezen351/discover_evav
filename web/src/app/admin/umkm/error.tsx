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
    <div
      role="alert"
      className="rounded-md-design border border-red-300 bg-red-50 p-6"
    >
      <p className="font-semibold text-red-800">Gagal memuat data UMKM.</p>
      <button type="button" onClick={reset} className="btn-cta mt-3">
        Coba lagi
      </button>
    </div>
  );
}
