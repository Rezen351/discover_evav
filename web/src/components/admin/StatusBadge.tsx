import { CheckCircleIcon, ClockIcon } from "@heroicons/react/24/outline";
import type { ContentStatus } from "@/content/admin-mock";

interface StatusBadgeProps {
  status: ContentStatus;
}

/**
 * Badge status Draft / Published untuk tabel konten admin.
 * Published = hijau brand-teal, Draft = pink coral (brand).
 */
export default function StatusBadge({ status }: StatusBadgeProps) {
  const isPublished = status === "Published";
  return (
    <span
      className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold ${
        isPublished
          ? "bg-brand-teal/15 text-brand-navy"
          : "bg-brand/10 text-brand"
      }`}
      style={{ fontFamily: "var(--font-sans)" }}
    >
      {isPublished ? (
        <CheckCircleIcon className="w-3.5 h-3.5" aria-hidden="true" />
      ) : (
        <ClockIcon className="w-3.5 h-3.5" aria-hidden="true" />
      )}
      {status}
    </span>
  );
}
