import { BuildingStorefrontIcon, ShoppingBagIcon, NewspaperIcon, UsersIcon, ArrowTrendingUpIcon, ArrowTrendingDownIcon } from "@heroicons/react/24/outline";
import type { AdminStat } from "@/content/admin-mock";

interface StatCardProps {
  stat: AdminStat;
}

const iconMap = {
  umkm: BuildingStorefrontIcon,
  produk: ShoppingBagIcon,
  berita: NewspaperIcon,
  visitor: UsersIcon,
} as const;

/**
 * Kartu statistik ringkas untuk halaman Dashboard admin.
 * Menampilkan nilai, delta persen, dan ikon brand.
 */
export default function StatCard({ stat }: StatCardProps) {
  const Icon = iconMap[stat.icon];
  const naik = stat.delta >= 0;
  const DeltaIcon = naik ? ArrowTrendingUpIcon : ArrowTrendingDownIcon;

  return (
    <article
      className="group bg-white rounded-lg-design shadow-soft border border-brand/10 p-5 md:p-6 transition-all duration-300 hover:shadow-card hover:border-brand/30"
      style={{ fontFamily: "var(--font-sans)" }}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex flex-col gap-1">
          <span className="text-fluid-small font-medium text-black/50">{stat.label}</span>
          <span
            className="text-fluid-h3 text-black font-normal leading-none"
            style={{ fontFamily: "var(--font-serif)" }}
          >
            {stat.value.toLocaleString("id-ID")}
          </span>
        </div>
        <div
          className="flex items-center justify-center w-11 h-11 rounded-md-design bg-brand/10 text-brand transition-transform duration-300 group-hover:scale-105"
          aria-hidden="true"
        >
          <Icon className="w-5 h-5" />
        </div>
      </div>
      <div
        className={`mt-4 inline-flex items-center gap-1.5 text-xs font-semibold ${
          naik ? "text-brand-navy" : "text-brand"
        }`}
      >
        <DeltaIcon className="w-3.5 h-3.5" aria-hidden="true" />
        {naik ? "+" : ""}
        {stat.delta}% <span className="text-black/40 font-normal">vs bulan lalu</span>
      </div>
    </article>
  );
}
