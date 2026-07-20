"use client";

export default function Error({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <main id="main-content" className="flex min-h-screen items-center justify-center">
      <div className="text-center">
        <h1 className="font-serif text-fluid-h2">Terjadi kesalahan</h1>
        <p className="mt-4 text-fluid-body">
          Maaf, halaman warisan sedang tidak dapat ditampilkan.
        </p>
        <button onClick={reset} className="btn-cta mt-6">
          Coba lagi
        </button>
      </div>
    </main>
  );
}
