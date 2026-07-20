import { useEffect, useState } from "react";

export type TimeOfDay = "pagi" | "siang" | "senja" | "malam";

function toTimeOfDay(hour: number): TimeOfDay {
  if (hour >= 5 && hour < 9) return "pagi";
  if (hour >= 9 && hour < 15) return "siang";
  if (hour >= 15 && hour < 19) return "senja";
  return "malam";
}

export function useTimeOfDay(): TimeOfDay {
  const [time, setTime] = useState<TimeOfDay>("senja");
  useEffect(() => {
    const timer = window.setTimeout(() => {
      setTime(toTimeOfDay(new Date().getHours()));
    }, 0);
    return () => window.clearTimeout(timer);
  }, []);
  return time;
}

export const temporalGreetings: Record<TimeOfDay, { kei: string; id: string; en: string }> = {
  pagi: { kei: "Marhoba vu'un", id: "Selamat pagi, selamat datang", en: "Good morning, welcome" },
  siang: { kei: "Marhoba", id: "Selamat datang", en: "Welcome" },
  senja: { kei: "Marhoba ukat", id: "Selamat sore, waktu paling indah di Kei", en: "Good afternoon, the most beautiful time in Kei" },
  malam: { kei: "Marhoba vuan", id: "Selamat malam, bintang Kei menyambut", en: "Good evening, the stars of Kei welcome you" },
};
