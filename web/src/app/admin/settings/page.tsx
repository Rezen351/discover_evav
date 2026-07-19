import type { Metadata } from "next";
import { DocumentCheckIcon } from "@heroicons/react/24/outline";
import AdminShell from "@/components/admin/AdminShell";
import AdminPageHeader from "@/components/admin/AdminPageHeader";
import AdminButton from "@/components/admin/AdminButton";
import { pengaturanList } from "@/content/admin-mock";

export const metadata: Metadata = {
  title: "Pengaturan — Simfoni Evav",
  description: "Konfigurasi umum, konten, dan notifikasi panel admin CMS Simfoni Evav.",
};

export default function AdminPengaturanPage() {
  const grup = Array.from(new Set(pengaturanList.map((s) => s.grup)));

  return (
    <AdminShell>
      <AdminPageHeader
        eyebrow="SISTEM"
        title="Pengaturan"
        description="Konfigurasi umum, konten, dan preferensi notifikasi panel admin."
        action={
          <AdminButton type="submit" form="form-pengaturan" ariaLabel="Simpan pengaturan">
            <DocumentCheckIcon className="w-4 h-4" /> Simpan
          </AdminButton>
        }
      />

      <form id="form-pengaturan" className="flex flex-col gap-6">
        {grup.map((namaGrup) => {
          const itemGrup = pengaturanList.filter((s) => s.grup === namaGrup);
          return (
            <section
              key={namaGrup}
              className="bg-white rounded-lg-design shadow-soft border border-brand/10 p-5 md:p-6"
              aria-label={`Pengaturan ${namaGrup}`}
            >
              <h2
                className="text-fluid-h4 text-black font-normal mb-4"
                style={{ fontFamily: "var(--font-serif)" }}
              >
                {namaGrup}
              </h2>
              <div className="flex flex-col divide-y divide-black/5">
                {itemGrup.map((item) => (
                  <div key={item.id} className="flex flex-col md:flex-row md:items-center gap-2 md:gap-4 py-4 first:pt-0 last:pb-0">
                    <div className="md:flex-1 min-w-0">
                      <p className="text-sm font-medium text-black">{item.nama}</p>
                      <p className="text-fluid-small text-black/50">{item.deskripsi}</p>
                    </div>
                    <input
                      type="text"
                      defaultValue={item.nilai}
                      aria-label={item.nama}
                      className="w-full md:w-64 bg-section border border-brand/10 rounded-md-design px-3.5 py-2.5 text-sm text-black focus-ring transition-colors"
                    />
                  </div>
                ))}
              </div>
            </section>
          );
        })}
      </form>
    </AdminShell>
  );
}
