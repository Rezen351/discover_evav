"use client";

export default function Error({ reset }: { error: Error; reset: () => void }) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-4 bg-section">
      <h2 className="text-xl font-semibold">Terjadi kesalahan</h2>
      <button
        onClick={reset}
        className="btn-cta px-6 py-3 rounded-full"
      >
        Coba lagi
      </button>
    </div>
  );
}
