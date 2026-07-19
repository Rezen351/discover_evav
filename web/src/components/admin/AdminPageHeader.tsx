import type { ReactNode } from "react";

interface AdminPageHeaderProps {
  eyebrow?: string;
  title: string;
  description?: string;
  action?: ReactNode;
}

/**
 * Header konsisten untuk tiap halaman panel admin.
 * Menampilkan judul, deskripsi, dan (opsional) tombol aksi di kanan.
 */
export default function AdminPageHeader({ eyebrow, title, description, action }: AdminPageHeaderProps) {
  return (
    <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-6">
      <div>
        {eyebrow && (
          <p className="text-fluid-small font-bold tracking-[0.2em] uppercase text-brand mb-1">{eyebrow}</p>
        )}
        <h1
          className="text-fluid-h2 text-black font-normal"
          style={{ fontFamily: "var(--font-serif)" }}
        >
          {title}
        </h1>
        {description && <p className="text-fluid-small text-black/50 mt-1">{description}</p>}
      </div>
      {action && <div className="shrink-0">{action}</div>}
    </div>
  );
}
