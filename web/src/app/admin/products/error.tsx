"use client";

export default function Error({ reset }: { error: Error; reset: () => void }) {
  return (
    <div className="text-center py-10" role="alert">
      <p className="text-black/70">Gagal memuat data produk.</p>
      <button onClick={reset} className="btn-cta mt-4">
        Coba lagi
      </button>
    </div>
  );
}
