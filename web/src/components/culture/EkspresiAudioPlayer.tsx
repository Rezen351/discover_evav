"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import {
  PlayIcon,
  PauseIcon,
  BackwardIcon,
  ForwardIcon,
  SpeakerWaveIcon,
  SpeakerXMarkIcon,
} from "@heroicons/react/24/outline";
import type { EkspresiTrack } from "@/content/culture";

function formatTime(seconds: number): string {
  if (!Number.isFinite(seconds) || seconds < 0) return "0:00";
  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60);
  return `${m}:${s.toString().padStart(2, "0")}`;
}

export default function EkspresiAudioPlayer({
  tracks,
  fallbackCover,
}: {
  tracks: EkspresiTrack[];
  fallbackCover: string;
}) {
  const audioRef = useRef<HTMLAudioElement>(null);

  const [trackIndex, setTrackIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const [hasError, setHasError] = useState(false);

  const current = tracks[trackIndex];
  const cover = current.cover ?? fallbackCover;

  // Muat & putar saat track berganti
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    setCurrentTime(0);
    setDuration(0);
    setHasError(false);
    audio.load();
    if (isPlaying) {
      audio.play().catch(() => setHasError(true));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [trackIndex]);

  const togglePlay = () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (audio.paused) {
      audio
        .play()
        .then(() => {
          setIsPlaying(true);
          setHasError(false);
        })
        .catch(() => setHasError(true));
    } else {
      audio.pause();
      setIsPlaying(false);
    }
  };

  const playAt = (index: number) => {
    const next = (index + tracks.length) % tracks.length;
    setTrackIndex(next);
    setIsPlaying(true);
    // Play akan dipicu oleh effect + interaksi; pastikan resume
    requestAnimationFrame(() => {
      audioRef.current?.play().catch(() => setHasError(true));
    });
  };

  const prevTrack = () => playAt(trackIndex - 1);
  const nextTrack = () => playAt(trackIndex + 1);

  const onSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const audio = audioRef.current;
    if (!audio) return;
    const value = Number(e.target.value);
    audio.currentTime = value;
    setCurrentTime(value);
  };

  const toggleMute = () => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.muted = !audio.muted;
    setIsMuted(audio.muted);
  };

  const progress = duration > 0 ? (currentTime / duration) * 100 : 0;

  return (
    <div className="flex h-full min-h-0 flex-col gap-5 rounded-xl-design bg-gradient-to-b from-[#1f1a2e] via-[#141024] to-[#0b0814] p-5 md:p-6 text-white lg:flex-row lg:gap-6">
      {/* Kiri — now playing + kontrol */}
      <div className="flex min-h-0 flex-col justify-center gap-4 lg:w-1/2">
        {/* Now playing — cover + info */}
        <div className="flex shrink-0 flex-col items-center text-center">
          <div className="relative aspect-square w-28 md:w-36 overflow-hidden rounded-xl-design shadow-2xl">
            <Image
              key={current.id}
              src={cover}
              alt={`Sampul ${current.title}`}
              fill
              sizes="(max-width: 768px) 30vw, 150px"
              className="object-cover"
            />
          </div>
          <h4 className="mt-3 font-serif text-fluid-h4 text-white">
            {current.title}
          </h4>
          <p className="mt-0.5 font-sans text-fluid-small text-white/60">
            {current.artist}
          </p>
          {hasError && (
            <p className="mt-1 font-sans text-[0.7rem] text-amber-300/80">
              Audio belum tersedia — segera hadir.
            </p>
          )}
        </div>

        {/* Progress bar */}
        <div className="shrink-0">
          <input
            type="range"
            min={0}
            max={duration || 0}
            step={0.1}
            value={currentTime}
            onChange={onSeek}
            aria-label={`Geser posisi ${current.title}`}
            className="ekspresi-range h-1.5 w-full cursor-pointer appearance-none rounded-full focus-ring"
            style={{
              background: `linear-gradient(to right, #1DB954 ${progress}%, rgba(255,255,255,0.2) ${progress}%)`,
            }}
          />
          <div className="mt-2 flex items-center justify-between font-sans text-[0.7rem] text-white/50">
            <span>{formatTime(currentTime)}</span>
            <span>{formatTime(duration)}</span>
          </div>
        </div>

        {/* Kontrol transport */}
        <div className="flex items-center justify-center gap-6">
          <button
            type="button"
            onClick={prevTrack}
            aria-label="Track sebelumnya"
            className="text-white/70 transition-colors hover:text-white focus-ring rounded-full"
          >
            <BackwardIcon className="h-6 w-6" aria-hidden="true" fill="currentColor" />
          </button>

          <button
            type="button"
            onClick={togglePlay}
            aria-label={isPlaying ? "Jeda" : "Putar"}
            className="flex h-14 w-14 items-center justify-center rounded-full bg-[#1DB954] text-black shadow-lg transition-transform hover:scale-105 active:press focus-ring"
          >
            {isPlaying ? (
              <PauseIcon className="h-6 w-6" aria-hidden="true" fill="currentColor" />
            ) : (
              <PlayIcon className="ml-0.5 h-6 w-6" aria-hidden="true" fill="currentColor" />
            )}
          </button>

          <button
            type="button"
            onClick={nextTrack}
            aria-label="Track berikutnya"
            className="text-white/70 transition-colors hover:text-white focus-ring rounded-full"
          >
            <ForwardIcon className="h-6 w-6" aria-hidden="true" fill="currentColor" />
          </button>
        </div>
      </div>

      {/* Kanan — playlist */}
      <div className="flex min-h-0 flex-1 flex-col gap-2 lg:border-l lg:border-white/10 lg:pl-6">
        <div className="flex shrink-0 items-center justify-between">
          <span className="font-sans text-[0.7rem] uppercase tracking-[0.2em] text-white/40">
            Playlist
          </span>
          <button
            type="button"
            onClick={toggleMute}
            aria-label={isMuted ? "Nyalakan suara" : "Bisukan suara"}
            className="text-white/60 transition-colors hover:text-white focus-ring rounded-full"
          >
            {isMuted ? (
              <SpeakerXMarkIcon className="h-5 w-5" aria-hidden="true" />
            ) : (
              <SpeakerWaveIcon className="h-5 w-5" aria-hidden="true" />
            )}
          </button>
        </div>

        <ul className="flex min-h-0 flex-1 flex-col gap-1 overflow-y-auto">
          {tracks.map((track, index) => {
            const active = index === trackIndex;
            return (
              <li key={track.id}>
                <button
                  type="button"
                  onClick={() => playAt(index)}
                  aria-current={active}
                  className={`flex w-full items-center gap-3 rounded-lg-design px-3 py-2 text-left transition-colors focus-ring ${
                    active ? "bg-white/10" : "hover:bg-white/5"
                  }`}
                >
                  <span
                    className={`w-4 shrink-0 text-center font-sans text-fluid-small ${
                      active ? "text-[#1DB954]" : "text-white/40"
                    }`}
                  >
                    {active && isPlaying ? (
                      <PauseIcon className="h-3.5 w-3.5" aria-hidden="true" fill="currentColor" />
                    ) : (
                      index + 1
                    )}
                  </span>
                  <span className="min-w-0 flex-1">
                    <span
                      className={`block truncate font-sans text-fluid-small ${
                        active ? "text-white" : "text-white/80"
                      }`}
                    >
                      {track.title}
                    </span>
                    <span className="block truncate font-sans text-[0.7rem] text-white/45">
                      {track.artist}
                    </span>
                  </span>
                </button>
              </li>
            );
          })}
        </ul>
      </div>

      <audio
        ref={audioRef}
        preload="metadata"
        onTimeUpdate={(e) => setCurrentTime(e.currentTarget.currentTime)}
        onLoadedMetadata={(e) => setDuration(e.currentTarget.duration)}
        onEnded={nextTrack}
        onError={() => setHasError(true)}
      >
        <source src={current.src} type="audio/mpeg" />
      </audio>
    </div>
  );
}
