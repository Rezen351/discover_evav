import type { ReactNode } from "react";

interface AdminButtonProps {
  children: ReactNode;
  href?: string;
  onClick?: () => void;
  variant?: "primary" | "ghost";
  type?: "button" | "submit";
  form?: string;
  ariaLabel?: string;
}

/**
 * Tombol aksi konsisten untuk panel admin (tambah, filter, dsb).
 * primary = brand gradient; ghost = outline netral.
 */
export default function AdminButton({
  children,
  href,
  onClick,
  variant = "primary",
  type = "button",
  form,
  ariaLabel,
}: AdminButtonProps) {
  const className = `inline-flex items-center gap-2 px-4 py-2.5 rounded-md-design text-sm font-semibold transition-colors focus-ring ${
    variant === "primary"
      ? "bg-nav-gradient text-tropical-dark hover:brightness-105"
      : "bg-white border border-brand/15 text-black/70 hover:bg-brand/5 hover:text-brand"
  }`;

  if (href) {
    return (
      <a href={href} className={className} aria-label={ariaLabel}>
        {children}
      </a>
    );
  }

  return (
    <button type={type} onClick={onClick} form={form} className={className} aria-label={ariaLabel}>
      {children}
    </button>
  );
}
