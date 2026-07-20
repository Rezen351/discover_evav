export default function Loading() {
  return (
    <div
      className="rounded-lg-design border border-brand/10 bg-white p-6 animate-pulse"
      aria-hidden="true"
    >
      <div className="h-6 w-40 bg-black/10 rounded mb-4" />
      <div className="space-y-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="h-10 bg-black/5 rounded" />
        ))}
      </div>
    </div>
  );
}
