"use client";

import { useEffect, useRef, useState } from "react";
import { keiVocabulary } from "@/content/kei-vocabulary";

interface LoadingScreenProps {
  onComplete: () => void;
}

export default function LoadingScreen({ onComplete }: LoadingScreenProps) {
  const [index, setIndex] = useState(0);
  const [progress, setProgress] = useState(0);

  const onCompleteRef = useRef(onComplete);
  useEffect(() => {
    onCompleteRef.current = onComplete;
  }, [onComplete]);

  useEffect(() => {
    const total = keiVocabulary.length;
    let current = 0;
    const interval = window.setInterval(() => {
      current = (current + 1) % total;
      setIndex(current);
      setProgress(((current + 1) / total) * 100);
      if (current === 0) {
        window.clearInterval(interval);
        window.setTimeout(() => onCompleteRef.current(), 600);
      }
    }, 800);
    return () => window.clearInterval(interval);
  }, []);

  const word = keiVocabulary[index];

  return (
    <div
      className="fixed inset-0 z-[500] flex flex-col items-center justify-center bg-tropical-dark"
      role="status"
      aria-live="polite"
    >
      <p
        className="text-white font-normal text-center px-6 leading-tight text-[clamp(2rem,9vw,3.75rem)]"
        style={{ fontFamily: "var(--font-serif)" }}
      >
        {word.kei}
      </p>
      <p
        className="text-white/50 uppercase mt-4 text-center px-6 leading-relaxed text-[clamp(0.625rem,2.6vw,0.875rem)] tracking-[0.25em] md:tracking-[0.35em]"
        style={{ fontFamily: "var(--font-sans)" }}
      >
        {word.id}
      </p>
      <div className="mt-10 w-48 h-[2px] bg-white/10 overflow-hidden rounded-full">
        <div
          className="h-full bg-brand transition-all duration-700 ease-out"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
}
