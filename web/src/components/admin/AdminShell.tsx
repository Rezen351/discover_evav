"use client";

import { useState } from "react";
import AdminSidebar from "./AdminSidebar";
import AdminTopbar from "./AdminTopbar";

interface AdminShellProps {
  children: React.ReactNode;
}

/**
 * Shell layout panel admin — mengelola state drawer sidebar (mobile).
 * Page `/admin` dirender di dalamnya sebagai Server Component children.
 */
export default function AdminShell({ children }: AdminShellProps) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-section" style={{ fontFamily: "var(--font-sans)" }}>
      <AdminSidebar open={menuOpen} onClose={() => setMenuOpen(false)} />
      <div className="flex flex-col flex-1 min-w-0">
        <AdminTopbar onMenuClick={() => setMenuOpen(true)} />
        <div className="flex-1 px-4 md:px-8 py-6 md:py-8 w-full max-w-[1600px] mx-auto">
          {children}
        </div>
      </div>
    </div>
  );
}
