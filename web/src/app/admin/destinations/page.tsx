import type { Metadata } from "next";
import { PlusIcon, StarIcon } from "@heroicons/react/24/outline";
import AdminShell from "@/components/admin/AdminShell";
import AdminPageHeader from "@/components/admin/AdminPageHeader";
import AdminTable, { type AdminColumn } from "@/components/admin/AdminTable";
import AdminButton from "@/components/admin/AdminButton";
import { destinasiList, type DestinasiRow } from "@/content/admin-mock";

export const metadata: Metadata = {
  title: "Destinasi — Simfoni Evav",
  description: "Kelola tempat wisata dan destinasi pariwisata Kepulauan Kei.",
};

const columns: AdminColumn<DestinasiRow>[] = [
  { key: "nama", header: "Nama Destinasi" },
  { key: "kategori", header: "Kategori" },
  { key: "lokasi", header: "Lokasi" },
  {
    key: "rating",
    header: "Rating",
    render: (row: DestinasiRow) => (
      <span className="inline-flex items-center gap-1 text-black/80">
        <StarIcon className="w-3.5 h-3.5 text-brand-navy fill-brand-navy" aria-hidden="true" />
        {row.rating.toFixed(1)}
      </span>
    ),
  },
  { key: "status", header: "Status" },
];

export default function AdminDestinasiPage() {
  return (
    <AdminShell>
      <AdminPageHeader
        eyebrow="KONTEN"
        title="Destinasi"
        description="Kelola pantai, budaya, alam, dan situs sejarah di Kepulauan Kei."
        action={
          <AdminButton href="/admin/destinasi/baru" ariaLabel="Tambah destinasi">
            <PlusIcon className="w-4 h-4" /> Tambah Destinasi
          </AdminButton>
        }
      />
      <AdminTable
        columns={columns}
        rows={destinasiList}
        statusField="status"
        caption="Daftar seluruh destinasi"
      />
    </AdminShell>
  );
}
