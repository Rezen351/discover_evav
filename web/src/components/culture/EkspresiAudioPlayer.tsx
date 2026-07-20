"use client";

import { useState } from "react";
import Image from "next/image";
import {
  PlayIcon,
  SpeakerWaveIcon,
  SpeakerXMarkIcon,
} from "@heroicons/react/24/outline";
import type { EkspresiTrack } from "@/content/culture";

export default function EkspresiAudioPlayer({
  tracks,
  fallbackCover,
}: {
  tracks: EkspresiTrack[];
  fallbackCover: string;
}) {
  const [trackIndex, setTrackIndex] = useState(0);
  const [activeId, setActiveId] = useState<string | null>(null);
  const [muted, setMuted] = useState(false);

  const current = tracks[trackIndex];
  const cover = current.cover ?? fallbackCover;

  // Pilih track dari playlist — langsung muat (lazy) iframe YouTube
  const selectTrack = (index: number) => {
    setTrackIndex(index);
    setActiveId(tracks[index].youtubeId);
  };

  // Putar dari tombol play pada cover (lazy load iframe)
  const playFromCover = () => {
    if (activeId === current.youtubeId) return;
    setActiveId(current.youtubeId);
  };

  const toggleMute = () => setMuted((m) => !m);

  return (
    <div className="flex h-full min-h-0 flex-col gap-5 rounded-xl-design bg-gradient-to-b from-[#1f1a2e] via-[#141024] to-[#0b0814] p-5 md:p-6 text-white lg:flex-row lg:gap-6">
      {/* Kiri — now playing (cover / video) */}
      <div className="flex min-h-0 flex-col justify-center gap-4 lg:w-1/2">
        <div className="flex shrink-0 flex-col items-center text-center">
          <div className="relative aspect-video w-full max-w-[320px] overflow-hidden rounded-xl-design shadow-2xl">
            {activeId === current.youtubeId ? (
              <iframe
                className="absolute inset-0 h-full w-full"
                src={`https://www.youtube-nocookie.com/embed/${current.youtubeId}?rel=0${
                  muted ? "&mute=1" : ""
                }`}
                title={`${current.title} — ${current.artist}`}
                loading="lazy"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
              />
            ) : (
              <button
                type="button"
                onClick={playFromCover}
                aria-label={`Putar lagu ${current.title}`}
                className="absolute inset-0 flex items-center justify-center focus-ring"
              >
                <Image
                  src={cover}
                  alt={`Sampul ${current.title}`}
                  fill
                  sizes="(max-width: 768px) 80vw, 320px"
                  className="object-cover brightness-90"
                />
                <span className="absolute flex h-14 w-14 items-center justify-center rounded-full bg-[#1DB954] text-black shadow-lg transition-transform duration-300 hover:scale-110">
                  <PlayIcon className="ml-0.5 h-6 w-6" aria-hidden="true" fill="currentColor" />
                </span>
              </button>
            )}
          </div>
          <h4 className="mt-3 font-serif text-fluid-h4 text-white">
            {current.title}
          </h4>
          <p className="mt-0.5 font-sans text-fluid-small text-white/60">
            {current.artist}
          </p>
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
            aria-label={muted ? "Nyalakan suara" : "Bisukan suara"}
            className="text-white/60 transition-colors hover:text-white focus-ring rounded-full"
          >
            {muted ? (
              <SpeakerXMarkIcon className="h-5 w-5" aria-hidden="true" />
            ) : (
              <SpeakerWaveIcon className="h-5 w-5" aria-hidden="true" />
            )}
          </button>
        </div>

        <ul className="flex min-h-0 flex-1 flex-col gap-1 overflow-y-auto">
          {tracks.map((track, index) => {
            const active = index === trackIndex;
            const playing = active && activeId === track.youtubeId;
            return (
              <li key={track.id}>
                <button
                  type="button"
                  onClick={() => selectTrack(index)}
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
                    {playing ? (
                      <span className="flex items-end justify-center gap-[2px]" aria-hidden="true">
                        <span className="w-[3px] h-3 bg-[#1DB954] animate-[equalize_0.9s_ease-in-out_infinite]" />
                        <span className="w-[3px] h-3 bg-[#1DB954] animate-[equalize_0.9s_ease-in-out_infinite_0.2s]" />
                        <span className="w-[3px] h-3 bg-[#1DB954] animate-[equalize_0.9s_ease-in-out_infinite_0.4s]" />
                      </span>
                    ) : index + 1}
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
    </div>
  );
}
