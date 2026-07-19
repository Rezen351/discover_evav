import type { Metadata } from "next";
import { PlusIcon, PhotoIcon, FilmIcon } from "@heroicons/react/24/outline";
import AdminShell from "@/components/admin/AdminShell";
import AdminPageHeader from "@/components/admin/AdminPageHeader";
import AdminTable, { type AdminColumn } from "@/components/admin/AdminTable";
import AdminButton from "@/components/admin/AdminButton";
import { mediaList, type MediaRow } from "@/content/admin-mock";

export const metadata: Metadata = {
  title: "Media — Simfoni Evav",
  description: "Kelola galeri foto dan video pariwisata Kepulauan Kei.",
};

const columns: AdminColumn<MediaRow>[] = [
  {
    key: "nama",
    header: "Berkas",
    render: (row: MediaRow) => {
      const Icon = row.tipe === "Video" ? FilmIcon : PhotoIcon;
      return (
        <span className="inline-flex items-center gap-2.5 text-black/80">
          <span className="flex items-center justify-center w-9 h-9 rounded-md-design bg-brand/10 text-brand">
            <Icon className="w-4 h-4" aria-hidden="true" />
          </span>
          {row.nama}
        </span>
      );
    },
  },
  { key: "kategori", header: "Kategori" },
  { key: "ukuran", header: "Ukuran" },
  { key: "diunggah", header: "Diunggah" },
];

export default function AdminMediaPage() {
  return (
    <AdminShell>
      <AdminPageHeader
        eyebrow="GALERI"
        title="Media"
        description="Kelola foto dan video yang ditampilkan di situs pariwisata Kepulauan Kei."
        action={
          <AdminButton href="/admin/media/baru" ariaLabel="Unggah media">
            <PlusIcon className="w-4 h-4" /> Unggah Media
          </AdminButton>
        }
      />
      <AdminTable
        columns={columns}
        rows={mediaList}
        caption="Daftar seluruh berkas media"
      />
    </AdminShell>
  );
}
