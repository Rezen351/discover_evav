"use client";

export default function Error({ reset }: { error: Error; reset: () => void }) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-4 bg-section">
      <p className="text-black/70 font-sans">Terjadi gangguan memuat halaman.</p>
      <button className="btn-cta" onClick={reset}>
        Coba lagi
      </button>
    </div>
  );
}
