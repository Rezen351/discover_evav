export default function Loading() {
  return (
    <main id="main-content" className="flex min-h-screen items-center justify-center">
      <div
        className="h-10 w-10 animate-pulse rounded-full bg-brand/30"
        aria-hidden="true"
      />
      <span className="sr-only">Memuat halaman warisan…</span>
    </main>
  );
}
