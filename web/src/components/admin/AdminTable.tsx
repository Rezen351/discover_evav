import type { ReactNode } from "react";
import StatusBadge from "./StatusBadge";
import type { ContentStatus } from "@/content/admin-mock";

export interface AdminColumn<T> {
  key: string;
  header: string;
  /** Render sel. Jika tidak diisi, pakai akses `row[key]`. */
  render?: (row: T) => ReactNode;
  className?: string;
}

interface AdminTableProps<T> {
  columns: AdminColumn<T>[];
  rows: T[];
  /** Field status pada tiap row (untuk badge) — opsional. */
  statusField?: keyof T & string;
  caption?: string;
  emptyMessage?: string;
}

/**
 * Tabel data generik untuk panel admin (UMKM, Berita, dll).
 * Render sebagai Server Component (tanpa "use client") — murni presentasional.
 */
export default function AdminTable<T extends { id: string }>({
  columns,
  rows,
  statusField,
  caption,
  emptyMessage = "Belum ada data.",
}: AdminTableProps<T>) {
  return (
    <div className="w-full overflow-x-auto no-scrollbar rounded-lg-design border border-brand/10 bg-white shadow-soft">
      <table className="w-full border-collapse text-left" style={{ fontFamily: "var(--font-sans)" }}>
        {caption && (
          <caption className="sr-only">{caption}</caption>
        )}
        <thead>
          <tr className="border-b border-brand/10">
            {columns.map((col) => (
              <th
                key={col.key}
                scope="col"
                className={`px-4 md:px-5 py-3.5 text-fluid-small font-bold uppercase tracking-[0.08em] text-black/50 ${col.className ?? ""}`}
              >
                {col.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.length === 0 ? (
            <tr>
              <td colSpan={columns.length} className="px-5 py-10 text-center text-black/50 text-sm">
                {emptyMessage}
              </td>
            </tr>
          ) : (
            rows.map((row) => (
              <tr
                key={row.id}
                className="border-b border-black/5 last:border-0 transition-colors hover:bg-brand/5"
              >
                {columns.map((col) => {
                  const cell =
                    col.render !== undefined ? (
                      col.render(row)
                    ) : statusField && col.key === statusField ? (
                      <StatusBadge status={row[statusField] as ContentStatus} />
                    ) : (
                      String(row[col.key as keyof T] ?? "")
                    );
                  return (
                    <td
                      key={col.key}
                      className={`px-4 md:px-5 py-3.5 text-fluid-small text-black/80 ${col.className ?? ""}`}
                    >
                      {cell}
                    </td>
                  );
                })}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
