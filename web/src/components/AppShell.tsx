"use client";

import { useEffect, useState } from "react";
import LoadingScreen from "@/components/LoadingScreen";
import { useTimeOfDay } from "@/hooks/useTimeOfDay";
import { keiVocabulary } from "@/content/kei-vocabulary";

export default function AppShell({ children }: { children: React.ReactNode }) {
  const [loading, setLoading] = useState(true);
  const timeOfDay = useTimeOfDay();

  useEffect(() => {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) {
      const timer = window.setTimeout(() => setLoading(false), 0);
      return () => window.clearTimeout(timer);
    }
    const timer = window.setTimeout(() => setLoading(false), keiVocabulary.length * 800 + 600);
    return () => window.clearTimeout(timer);
  }, []);

  return (
    <div data-time={timeOfDay}>
      {loading && <LoadingScreen onComplete={() => setLoading(false)} />}
      {children}
    </div>
  );
}
