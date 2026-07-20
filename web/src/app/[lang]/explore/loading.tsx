export default function ExploreLoading() {
  return (
    <div
      id="main-content"
      className="min-h-screen w-full bg-section px-4 md:px-8 py-16 sm:py-20"
      aria-busy="true"
      aria-label="Memuat halaman eksplorasi"
    >
      <div className="max-w-[98%] xl:max-w-[1600px] mx-auto w-full">
        <div className="flex flex-col gap-6">
          <div className="h-6 w-40 rounded-full bg-black/10" />
          <div className="h-12 w-2/3 rounded-lg bg-black/10" />
          <div className="h-4 w-full rounded bg-black/10" />
          <div className="h-4 w-5/6 rounded bg-black/10" />
        </div>
        <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <div
              key={i}
              className="h-[320px] rounded-xl-design bg-black/10"
            />
          ))}
        </div>
      </div>
    </div>
  );
}
