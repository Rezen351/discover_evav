export default function Loading() {
  return (
    <div
      className="min-h-screen flex items-center justify-center"
      role="status"
      aria-live="polite"
      aria-label="Memuat dashboard admin"
    >
      <div
        className="h-10 w-10 animate-spin rounded-full border-2 border-brand border-t-transparent"
        aria-hidden="true"
      />
    </div>
  );
}
