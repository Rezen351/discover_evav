import type { Metadata } from "next";
import { PlusIcon } from "@heroicons/react/24/outline";
import AdminShell from "@/components/admin/AdminShell";
import AdminPageHeader from "@/components/admin/AdminPageHeader";
import AdminTable, { type AdminColumn } from "@/components/admin/AdminTable";
import AdminButton from "@/components/admin/AdminButton";
import { beritaList, type BeritaRow } from "@/content/admin-mock";

export const metadata: Metadata = {
  title: "Berita — Simfoni Evav",
  description: "Kelola artikel, pengumuman, dan konten berita pariwisata Kepulauan Kei.",
};

const columns: AdminColumn<BeritaRow>[] = [
  { key: "judul", header: "Judul" },
  { key: "kategori", header: "Kategori" },
  { key: "penulis", header: "Penulis" },
  { key: "status", header: "Status" },
  { key: "tanggal", header: "Tanggal" },
];

export default function AdminBeritaPage() {
  return (
    <AdminShell>
      <AdminPageHeader
        eyebrow="KONTEN"
        title="Berita"
        description="Kelola artikel, pengumuman, dan konten editorial pariwisata Kepulauan Kei."
        action={
          <AdminButton href="/admin/berita/baru" ariaLabel="Tambah berita">
            <PlusIcon className="w-4 h-4" /> Tambah Berita
          </AdminButton>
        }
      />
      <AdminTable
        columns={columns}
        rows={beritaList}
        statusField="status"
        caption="Daftar seluruh berita"
      />
    </AdminShell>
  );
}
