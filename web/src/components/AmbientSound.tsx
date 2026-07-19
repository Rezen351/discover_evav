"use client";

import { useEffect, useRef, useState } from "react";

export default function AmbientSound() {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.volume = 0.08;
    if (enabled) {
      audio
        .play()
        .catch(() => {});
    } else {
      audio.pause();
    }
  }, [enabled]);

  return (
    <div className="fixed bottom-4 right-4 z-[300]">
      <button
        type="button"
        onClick={() => setEnabled((v) => !v)}
        aria-label={enabled ? "Bisukan suara ombak Kei" : "Putar suara ombak Kei"}
        className="flex h-11 w-11 items-center justify-center rounded-full border border-brand/30 bg-white/90 text-brand shadow-lg backdrop-blur transition-colors hover:bg-brand hover:text-white"
      >
        {enabled ? (
          <svg className="h-5 w-5 fill-current" viewBox="0 0 24 24" aria-hidden="true">
            <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3a4.5 4.5 0 0 0-2.5-4.03v8.06A4.5 4.5 0 0 0 16.5 12zM14 3.23v2.06a7 7 0 0 1 0 13.42v2.06a9 9 0 0 0 0-17.54z" />
          </svg>
        ) : (
          <svg className="h-5 w-5 fill-current" viewBox="0 0 24 24" aria-hidden="true">
            <path d="M16.5 12A4.5 4.5 0 0 0 14 7.97v2.21l2.45 2.45c.03-.2.05-.41.05-.63zm2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51A8.96 8.96 0 0 0 21 12a9 9 0 0 0-9-9v2c1.66 0 3.2.55 4.43 1.48l1.43-1.43L17.36 5 19 6.64 18 7.7C19.47 9 20.4 10.4 20.95 12h-2.45zM4.27 3 3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06a9 9 0 0 0 3.69-1.81L19.73 21 21 19.73l-9-9L4.27 3zM12 4 9.91 6.09 12 8.18V4z" />
          </svg>
        )}
      </button>
      <audio ref={audioRef} src="/sounds/kei-waves.webm" loop preload="none" />
    </div>
  );
}
