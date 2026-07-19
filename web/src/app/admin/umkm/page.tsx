import type { Metadata } from "next";
import { PlusIcon } from "@heroicons/react/24/outline";
import AdminShell from "@/components/admin/AdminShell";
import AdminPageHeader from "@/components/admin/AdminPageHeader";
import AdminTable, { type AdminColumn } from "@/components/admin/AdminTable";
import AdminButton from "@/components/admin/AdminButton";
import { umkmList, type UmkmRow } from "@/content/admin-mock";

export const metadata: Metadata = {
  title: "UMKM — Simfoni Evav",
  description: "Kelola data pelaku UMKM pariwisata Kepulauan Kei.",
};

const columns: AdminColumn<UmkmRow>[] = [
  { key: "nama", header: "Nama UMKM" },
  { key: "kategori", header: "Kategori" },
  { key: "lokasi", header: "Lokasi" },
  { key: "status", header: "Status" },
  { key: "updateTerakhir", header: "Update" },
];

export default function AdminUmkmPage() {
  return (
    <AdminShell>
      <AdminPageHeader
        eyebrow="KONTEN"
        title="UMKM"
        description="Kelola pelaku usaha mikro, kecil, dan menengah di Kepulauan Kei."
        action={
          <AdminButton href="/admin/umkm/baru" ariaLabel="Tambah UMKM">
            <PlusIcon className="w-4 h-4" /> Tambah UMKM
          </AdminButton>
        }
      />
      <AdminTable
        columns={columns}
        rows={umkmList}
        statusField="status"
        caption="Daftar seluruh UMKM"
      />
    </AdminShell>
  );
}
