import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRightIcon } from "@heroicons/react/24/outline";
import AdminShell from "@/components/admin/AdminShell";
import StatCard from "@/components/admin/StatCard";
import AdminTable, { type AdminColumn } from "@/components/admin/AdminTable";
import StatusBadge from "@/components/admin/StatusBadge";
import {
  adminStats,
  umkmTerbaru,
  beritaTerbaru,
  aktivitasTerbaru,
  visitorMingguan,
  type UmkmRow,
  type BeritaRow,
  type SeriesPoint,
} from "@/content/admin-mock";

export const metadata: Metadata = {
  title: "Dashboard Admin — Simfoni Evav",
  description: "Panel admin CMS Simfoni Evav untuk mengelola berita, UMKM, produk, destinasi, dan event Kepulauan Kei.",
};

// Dashboard admin berisi data yang selalu berubah (statistik, aktivitas);
// selalu render dinamis dan jangan di-cache statis. (audit M1/R2)
export const dynamic = "force-dynamic";

const umkmColumns: AdminColumn<UmkmRow>[] = [
  { key: "nama", header: "Nama UMKM" },
  { key: "kategori", header: "Kategori" },
  { key: "lokasi", header: "Lokasi" },
  { key: "status", header: "Status" },
  { key: "updateTerakhir", header: "Update" },
];

const beritaColumns: AdminColumn<BeritaRow>[] = [
  { key: "judul", header: "Judul" },
  { key: "kategori", header: "Kategori" },
  { key: "penulis", header: "Penulis" },
  { key: "status", header: "Status" },
  { key: "tanggal", header: "Tanggal" },
];

function VisitorChart({ data }: { data: SeriesPoint[] }) {
  const max = Math.max(...data.map((d) => d.nilai));
  return (
    <div className="flex items-end gap-2 md:gap-3 h-44 px-2" aria-hidden="true">
      {data.map((d) => (
        <div key={d.label} className="flex flex-1 flex-col items-center justify-end gap-2 h-full">
          <div
            className="w-full max-w-[36px] rounded-t-md-design bg-nav-gradient transition-all duration-500 hover:brightness-105"
            style={{ height: `${(d.nilai / max) * 100}%` }}
            title={`${d.label}: ${d.nilai.toLocaleString("id-ID")}`}
          />
          <span className="text-[10px] md:text-xs text-black/50">{d.label}</span>
        </div>
      ))}
    </div>
  );
}

export default function AdminDashboardPage() {
  return (
    <AdminShell>
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-6">
        <div>
          <p className="text-fluid-small font-bold tracking-[0.2em] uppercase text-brand mb-1">PANEL ADMIN</p>
          <h1 className="text-fluid-h2 text-black font-normal" style={{ fontFamily: "var(--font-serif)" }}>
            Selamat datang di <span className="text-brand">Simfoni Evav</span>
          </h1>
          <p className="text-fluid-small text-black/50 mt-1">
            Kelola konten pariwisata Kepulauan Kei dari satu tempat.
          </p>
        </div>
      </div>

      {/* Statistik */}
      <section aria-label="Statistik ringkas" className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 md:gap-5">
        {adminStats.map((stat) => (
          <StatCard key={stat.key} stat={stat} />
        ))}
      </section>

      {/* Grafik + Aktivitas */}
      <section className="grid grid-cols-1 xl:grid-cols-3 gap-5 mt-6">
        <div className="xl:col-span-2 bg-white rounded-lg-design shadow-soft border border-brand/10 p-5 md:p-6">
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-fluid-h4 text-black font-normal" style={{ fontFamily: "var(--font-serif)" }}>
              Visitor 7 Hari Terakhir
            </h2>
            <span className="text-fluid-small text-black/50">Total {visitorMingguan.reduce((a, b) => a + b.nilai, 0).toLocaleString("id-ID")}</span>
          </div>
          <VisitorChart data={visitorMingguan} />
        </div>

        <div className="bg-white rounded-lg-design shadow-soft border border-brand/10 p-5 md:p-6">
          <h2 className="text-fluid-h4 text-black font-normal mb-4" style={{ fontFamily: "var(--font-serif)" }}>
            Aktivitas Terbaru
          </h2>
          <ul className="flex flex-col gap-4">
            {aktivitasTerbaru.map((a) => (
              <li key={a.id} className="flex items-start gap-3">
                <span className="mt-1 flex items-center justify-center w-8 h-8 shrink-0 rounded-md-design bg-brand/10 text-brand text-[10px] font-bold uppercase">
                  {a.tipe.slice(0, 2)}
                </span>
                <div className="min-w-0">
                  <p className="text-sm font-medium text-black leading-snug">{a.judul}</p>
                  <p className="text-fluid-small text-black/50 truncate">{a.meta} · {a.waktu}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Tabel UMKM */}
      <section className="mt-6">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-fluid-h4 text-black font-normal" style={{ fontFamily: "var(--font-serif)" }}>
            UMKM Terbaru
          </h2>
          <Link href="/admin/umkm" className="inline-flex items-center gap-1 text-sm font-semibold text-brand hover:text-brand/70 transition-colors focus-ring rounded">
            Lihat semua <ArrowUpRightIcon className="w-4 h-4" />
          </Link>
        </div>
        <AdminTable columns={umkmColumns} rows={umkmTerbaru} statusField="status" caption="Daftar UMKM terbaru" />
      </section>

      {/* Tabel Berita */}
      <section className="mt-6">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-fluid-h4 text-black font-normal" style={{ fontFamily: "var(--font-serif)" }}>
            Berita Terbaru
          </h2>
          <Link href="/admin/news" className="inline-flex items-center gap-1 text-sm font-semibold text-brand hover:text-brand/70 transition-colors focus-ring rounded">
            Lihat semua <ArrowUpRightIcon className="w-4 h-4" />
          </Link>
        </div>
        <AdminTable columns={beritaColumns} rows={beritaTerbaru} statusField="status" caption="Daftar berita terbaru" />
      </section>

      <p className="mt-8 text-fluid-small text-black/40 flex items-center gap-2">
        <StatusBadge status="Published" /> CMS siap terhubung ke Route Handler <code className="text-black/50">/api/admin/*</code>.
      </p>
    </AdminShell>
  );
}
