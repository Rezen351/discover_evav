"use client";

export default function Error({ reset }: { error: Error; reset: () => void }) {
  return (
    <div role="alert">
      <p>Gagal memuat media.</p>
      <button onClick={reset}>Coba lagi</button>
    </div>
  );
}
