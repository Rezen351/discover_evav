export default function Loading() {
  return (
    <div
      className="animate-pulse space-y-4"
      aria-busy="true"
      aria-label="Memuat data UMKM"
    >
      <div className="h-10 w-48 rounded-md-design bg-black/10" />
      <div className="h-64 w-full rounded-md-design bg-black/5" />
    </div>
  );
}
