import type { Metadata } from "next";
import { PlusIcon, CalendarDaysIcon } from "@heroicons/react/24/outline";
import AdminShell from "@/components/admin/AdminShell";
import AdminPageHeader from "@/components/admin/AdminPageHeader";
import AdminTable, { type AdminColumn } from "@/components/admin/AdminTable";
import AdminButton from "@/components/admin/AdminButton";
import { eventList, type EventRow } from "@/content/admin-mock";

export const metadata: Metadata = {
  title: "Event — Simfoni Evav",
  description: "Kelola festival dan event pariwisata Kepulauan Kei.",
};

const columns: AdminColumn<EventRow>[] = [
  { key: "nama", header: "Nama Event" },
  { key: "kategori", header: "Kategori" },
  { key: "lokasi", header: "Lokasi" },
  {
    key: "tanggal",
    header: "Jadwal",
    render: (row: EventRow) => (
      <span className="inline-flex items-center gap-1.5 text-black/80">
        <CalendarDaysIcon className="w-3.5 h-3.5 text-brand-navy" aria-hidden="true" />
        {row.tanggal}
      </span>
    ),
  },
  { key: "status", header: "Status" },
];

export default function AdminEventPage() {
  return (
    <AdminShell>
      <AdminPageHeader
        eyebrow="KONTEN"
        title="Event"
        description="Kelola festival, pameran, dan kegiatan pariwisata Kepulauan Kei."
        action={
          <AdminButton href="/admin/events/baru" ariaLabel="Tambah event">
            <PlusIcon className="w-4 h-4" /> Tambah Event
          </AdminButton>
        }
      />
      <AdminTable
        columns={columns}
        rows={eventList}
        statusField="status"
        caption="Daftar seluruh event"
      />
    </AdminShell>
  );
}
