"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import AdminShell from "@/components/admin/AdminShell";
import AdminPageHeader from "@/components/admin/AdminPageHeader";
import AdminButton from "@/components/admin/AdminButton";
import RichTextEditor from "@/components/admin/RichTextEditor";

const KATEGORI = ["Budaya", "Event", "Infrastruktur", "Pengumuman"] as const;
const STATUS = ["Draft", "Publikasikan"] as const;

const labelClass = "block text-sm font-semibold text-black/70 mb-1.5";
const inputClass =
  "w-full rounded-md-design border border-brand/15 bg-white px-3 py-2.5 text-sm text-black/80 focus:outline-none focus-ring";

const sectionClass =
  "snap-start snap-always min-h-screen w-full flex flex-col justify-center px-4 md:px-8 py-10";

export default function AdminBeritaBaruPage() {
  const router = useRouter();
  const [judul, setJudul] = useState("");
  const [kategori, setKategori] = useState<(typeof KATEGORI)[number]>("Budaya");
  const [penulis, setPenulis] = useState("");
  const [ringkasan, setRingkasan] = useState("");
  const [isi, setIsi] = useState("");
  const [status, setStatus] = useState<(typeof STATUS)[number]>("Draft");

  function handleSimpan() {
    const artikel = { judul, kategori, penulis, ringkasan, isi, status };
    console.log("Artikel berita (mock):", artikel);
    router.push("/admin/news");
  }

  return (
    <AdminShell>
      <AdminPageHeader
        eyebrow="KONTEN"
        title="Tulis Berita Baru"
        description="Buat artikel, pengumuman, atau konten editorial pariwisata Kepulauan Kei."
        action={
          <AdminButton href="/admin/news" variant="ghost" ariaLabel="Batal">
            Batal
          </AdminButton>
        }
      />

      {/* Layar 1 — Penulisan artikel */}
      <section className={sectionClass}>
        <div className="w-full max-w-[1600px] mx-auto space-y-6">
          <div className="rounded-md-design border border-brand/15 bg-white p-5">
            <label htmlFor="judul" className={labelClass}>
              Judul Berita
            </label>
            <input
              id="judul"
              name="judul"
              type="text"
              value={judul}
              onChange={(e) => setJudul(e.target.value)}
              placeholder="Masukkan judul berita"
              className={inputClass}
            />
          </div>

          <div className="rounded-md-design border border-brand/15 bg-white p-5">
            <label className={labelClass}>Isi Berita</label>
            <RichTextEditor value={isi} onChange={setIsi} />
          </div>

          <p className="text-center text-xs text-black/40">
            Geser ke bawah untuk mengatur metadata berita ↓
          </p>
        </div>
      </section>

      {/* Layar 2 — Metadata & publikasi */}
      <section className={sectionClass}>
        <div className="w-full max-w-[1600px] mx-auto">
          <div className="grid gap-6 lg:grid-cols-[1fr_320px]">
            <div className="rounded-md-design border border-brand/15 bg-white p-5">
              <label htmlFor="ringkasan" className={labelClass}>
                Ringkasan
              </label>
              <textarea
                id="ringkasan"
                name="ringkasan"
                value={ringkasan}
                onChange={(e) => setRingkasan(e.target.value)}
                rows={6}
                placeholder="Ringkasan singkat untuk pratinjau berita"
                className={inputClass}
              />
              <p className="mt-2 text-xs text-black/40">
                Ringkasan ditampilkan pada daftar berita dan pratinjau kartu.
              </p>
            </div>

            <aside className="space-y-6">
              <div className="rounded-md-design border border-brand/15 bg-white p-5 space-y-4">
                <div>
                  <label htmlFor="kategori" className={labelClass}>
                    Kategori
                  </label>
                  <select
                    id="kategori"
                    name="kategori"
                    value={kategori}
                    onChange={(e) =>
                      setKategori(e.target.value as (typeof KATEGORI)[number])
                    }
                    className={inputClass}
                  >
                    {KATEGORI.map((k) => (
                      <option key={k} value={k}>
                        {k}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label htmlFor="penulis" className={labelClass}>
                    Penulis
                  </label>
                  <input
                    id="penulis"
                    name="penulis"
                    type="text"
                    value={penulis}
                    onChange={(e) => setPenulis(e.target.value)}
                    placeholder="Nama penulis"
                    className={inputClass}
                  />
                </div>

                <div>
                  <label htmlFor="status" className={labelClass}>
                    Status
                  </label>
                  <select
                    id="status"
                    name="status"
                    value={status}
                    onChange={(e) =>
                      setStatus(e.target.value as (typeof STATUS)[number])
                    }
                    className={inputClass}
                  >
                    {STATUS.map((s) => (
                      <option key={s} value={s}>
                        {s}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <AdminButton
                onClick={handleSimpan}
                ariaLabel="Simpan berita"
              >
                Simpan Berita
              </AdminButton>
            </aside>
          </div>
        </div>
      </section>
    </AdminShell>
  );
}
