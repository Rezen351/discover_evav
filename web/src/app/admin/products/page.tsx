import type { Metadata } from "next";
import { PlusIcon } from "@heroicons/react/24/outline";
import AdminShell from "@/components/admin/AdminShell";
import AdminPageHeader from "@/components/admin/AdminPageHeader";
import AdminTable, { type AdminColumn } from "@/components/admin/AdminTable";
import AdminButton from "@/components/admin/AdminButton";
import { produkList, type ProdukRow } from "@/content/admin-mock";

export const metadata: Metadata = {
  title: "Produk — Simfoni Evav",
  description: "Kelola produk yang dijual oleh UMKM pariwisata Kepulauan Kei.",
};

const columns: AdminColumn<ProdukRow>[] = [
  { key: "nama", header: "Nama Produk" },
  { key: "umkm", header: "UMKM" },
  { key: "kategori", header: "Kategori" },
  { key: "harga", header: "Harga" },
  {
    key: "stok",
    header: "Stok",
    render: (row: ProdukRow) => (
      <span className={row.stok === 0 ? "text-brand font-semibold" : "text-black/80"}>
        {row.stok === 0 ? "Habis" : row.stok}
      </span>
    ),
  },
  { key: "status", header: "Status" },
];

export default function AdminProdukPage() {
  return (
    <AdminShell>
      <AdminPageHeader
        eyebrow="KONTEN"
        title="Produk"
        description="Kelola produk yang ditawarkan oleh UMKM binaan pariwisata Kepulauan Kei."
        action={
          <AdminButton href="/admin/products/baru" ariaLabel="Tambah produk">
            <PlusIcon className="w-4 h-4" /> Tambah Produk
          </AdminButton>
        }
      />
      <AdminTable
        columns={columns}
        rows={produkList}
        statusField="status"
        caption="Daftar seluruh produk"
      />
    </AdminShell>
  );
}
