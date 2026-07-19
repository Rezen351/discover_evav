"use client";

import { MagnifyingGlassIcon, BellIcon, Bars3Icon, UserCircleIcon } from "@heroicons/react/24/outline";

interface AdminTopbarProps {
  onMenuClick: () => void;
  adminName?: string;
}

/**
 * Topbar panel admin — tombol menu mobile, pencarian, notifikasi, profil.
 */
export default function AdminTopbar({ onMenuClick, adminName = "Admin Evav" }: AdminTopbarProps) {
  return (
    <header
      className="sticky top-0 z-30 flex items-center gap-3 h-20 px-4 md:px-8 bg-section/90 backdrop-blur-md border-b border-brand/10"
      style={{ fontFamily: "var(--font-sans)" }}
    >
      <button
        type="button"
        onClick={onMenuClick}
        aria-label="Buka menu"
        className="md:hidden text-black/70 hover:text-brand focus-ring rounded-lg p-2"
      >
        <Bars3Icon className="w-5 h-5" />
      </button>

      {/* MagnifyingGlassIcon */}
      <div className="relative flex-1 max-w-md">
        <MagnifyingGlassIcon className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-black/40" aria-hidden="true" />
        <input
          type="search"
          aria-label="Cari konten"
          placeholder="Cari berita, UMKM, produk…"
          className="w-full bg-white border border-brand/10 rounded-full pl-10 pr-4 py-2.5 text-sm text-black placeholder:text-black/40 focus-ring transition-colors"
        />
      </div>

      <div className="ml-auto flex items-center gap-2 md:gap-3">
        <button
          type="button"
          aria-label="Notifikasi"
          className="relative text-black/60 hover:text-brand focus-ring rounded-full p-2.5 transition-colors"
        >
          <BellIcon className="w-5 h-5" />
          <span className="absolute top-2 right-2.5 w-2 h-2 rounded-full bg-brand" aria-hidden="true" />
        </button>

        <div className="flex items-center gap-2.5 pl-2 md:pl-3 md:border-l border-brand/10">
          <div className="flex items-center justify-center w-9 h-9 rounded-full bg-nav-gradient text-tropical-dark">
            <UserCircleIcon className="w-5 h-5" aria-hidden="true" />
          </div>
          <div className="hidden sm:flex flex-col leading-tight">
            <span className="text-sm font-semibold text-black">{adminName}</span>
            <span className="text-[11px] text-black/50">Administrator</span>
          </div>
        </div>
      </div>
    </header>
  );
}
