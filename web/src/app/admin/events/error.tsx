"use client";

export default function Error({ reset }: { error: Error; reset: () => void }) {
  return (
    <div className="text-center py-10" role="alert">
      <p className="text-black/60 mb-3">Gagal memuat data event.</p>
      <button type="button" onClick={reset} className="btn-cta">
        Coba lagi
      </button>
    </div>
  );
}
