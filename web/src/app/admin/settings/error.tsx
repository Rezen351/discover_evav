"use client";

export default function Error({ error: _error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <div className="flex flex-col gap-4" role="alert">
      <p className="text-black">Terjadi kesalahan saat memuat pengaturan.</p>
      <button type="button" onClick={reset} className="btn-cta self-start">
        Coba lagi
      </button>
    </div>
  );
}
