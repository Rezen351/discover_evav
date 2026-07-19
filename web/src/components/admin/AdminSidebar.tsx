"use client";

import { usePathname } from "next/navigation";
import { Squares2X2Icon, NewspaperIcon, BuildingStorefrontIcon, ShoppingBagIcon, MapPinIcon, CalendarDaysIcon, PhotoIcon, Cog6ToothIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { adminMenu, type AdminMenuKey } from "@/content/admin-mock";

const iconMap: Record<AdminMenuKey, typeof Squares2X2Icon> = {
  dashboard: Squares2X2Icon,
  berita: NewspaperIcon,
  umkm: BuildingStorefrontIcon,
  produk: ShoppingBagIcon,
  destinasi: MapPinIcon,
  event: CalendarDaysIcon,
  media: PhotoIcon,
  pengaturan: Cog6ToothIcon,
};

interface AdminSidebarProps {
  /** State mobile dikontrol dari parent (topbar) bila perlu. */
  open: boolean;
  onClose: () => void;
}

/**
 * Sidebar panel admin — logo "Simfoni Evav" + menu navigasi.
 * Client component (interaktif): toggle drawer mobile + highlight aktif.
 */
export default function AdminSidebar({ open, onClose }: AdminSidebarProps) {
  const pathname = usePathname();

  return (
    <>
      {/* Overlay mobile */}
      {open && (
        <div
          className="fixed inset-0 z-40 bg-black/40 md:hidden"
          onClick={onClose}
          aria-hidden="true"
        />
      )}

      <aside
        className={`fixed md:static inset-y-0 left-0 z-50 w-72 shrink-0 bg-tropical-dark text-white flex flex-col transition-transform duration-300 ${
          open ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        }`}
        style={{ fontFamily: "var(--font-sans)" }}
        aria-label="Navigasi panel admin"
      >
        {/* Brand */}
        <div className="flex items-center justify-between gap-3 px-6 h-20 border-b border-white/10">
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center w-10 h-10 rounded-md-design bg-nav-gradient text-tropical-dark">
              <MapPinIcon className="w-5 h-5" aria-hidden="true" />
            </div>
            <div className="flex flex-col leading-tight">
              <span className="text-base font-semibold tracking-wide" style={{ fontFamily: "var(--font-serif)" }}>
                Simfoni Evav
              </span>
              <span className="text-[10px] text-white/50 uppercase tracking-[0.18em]">
                Admin Panel
              </span>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Tutup menu"
            className="md:hidden text-white/70 hover:text-white focus-ring rounded-lg p-1"
          >
            <XMarkIcon className="w-5 h-5" />
          </button>
        </div>

        {/* Menu */}
        <nav className="flex-1 overflow-y-auto py-5 px-3 no-scrollbar">
          <ul className="flex flex-col gap-1">
            {adminMenu.map((item) => {
              const Icon = iconMap[item.key];
              const aktif = pathname === item.href;
              return (
                <li key={item.key}>
                  <a
                    href={item.href}
                    aria-current={aktif ? "page" : undefined}
                    className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors focus-ring ${
                      aktif
                        ? "bg-brand/15 text-brand"
                        : "text-white/70 hover:bg-white/5 hover:text-white"
                    }`}
                  >
                    <Icon className="w-5 h-5 shrink-0" aria-hidden="true" />
                    {item.label}
                    {aktif && <span className="ml-auto w-1.5 h-1.5 rounded-full bg-brand" aria-hidden="true" />}
                  </a>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Footer mini */}
        <div className="px-6 py-4 border-t border-white/10 text-[11px] text-white/40">
          Simfoni Evav · v1.0
        </div>
      </aside>
    </>
  );
}
