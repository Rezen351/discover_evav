# 📦 DAFTAR ASET — Simfoni Evav (Discover Evav)

> **Tujuan:** Inventarisasi seluruh aset (gambar, video, audio, ikon, OG) yang tersimpan di
> `web/public/` berdasarkan `docs/GRAND_DESIGN.md`, keenam `docs/page-designs/*.md`, dan referensi
> visual di `docs/Copywriting/*.pdf`.
>
> **Status:** Diperbarui 2026-07-18 (audit mandiri terhadap filesystem `web/public/`). Dokumen ini
> diselaraskan dengan kondisi aktual folder `public/` setelah penambahan, penghapusan, perapihan,
> dan **penggabungan folder eksplorasi** oleh pengguna. **Seluruh 124 file aset yang tercantum di
> bawah ini benar-benar ada di disk** dan dicatat di `web/src/content/asset-attributions.ts`.
>
> **Sumber utama:** Unsplash / Wikimedia Commons / Pexels (lisensi bebas) + aset fotografer lokal
> Kei (folder `umkm/`) + aset original/brand (logo & ikon SVG). Atribusi wajib di
> `web/src/content/asset-attributions.ts` (lihat § Atribusi).

---

## 🔢 RINGKASAN INVENTARIS (reaktor dari `find web/public`)

- **Total file aset aktual di `public/`: 124 file** (tanpa `view_budaya.html` yang bukan aset, dan
  tanpa file `*.Zone.Identifier` yang sudah dibersihkan).
- **Berdasarkan ekstensi:** `png` 90 · `jpeg` 16 · `jpg` 2 · `svg` 6 · `mp4` 4 · `webm` 1
  (total 119 image/svg + 4 video + 1 audio = 124).
- **Berdasarkan kategori folder:**
  - Hero video: 3 (`hero/video/`)
  - Budaya: 26 (`images/budaya/`)
  - Eksplorasi (spot wisata): 6 (`images/eksplorasi/`)
  - Heritage/Sejarah Karel: 22 (`images/heritage/`)
  - Kuliner: 12 (`images/kuliner/`)
  - Meti: 14 (`images/meti/`)
  - Satwa & Alam: 8 (`images/satwa/`)
  - Sejarah arsip: 2 (`images/sejarah/`)
  - Teknologi (Sasi/Hawear/Meti): 3 (`images/teknologi/`)
  - UMKM: 16 (`images/umkm/`)
  - OG image: 1 (`images/og/`)
  - Audio: 1 (`sounds/`)
  - Video eksplorasi: 1 (`videos/eksplorasi/`)
  - SVG root (logo & ikon): 5 (`Kapal.svg`, `Logo Black/Color/White.svg`, `MAatahari.svg`)

---

## 🗂️ STRUKTUR FOLDER PUBLIC (aktual — 2026-07-18, sudah rapi)

```
public/
├── hero/video/                  ✅ animal.mp4, culture.mp4, nature.mp4 (3 video)
├── images/
│   ├── budaya/                  ✅ 26 file (lihat Kategori 2)
│   ├── eksplorasi/              ✅ 6 file spot wisata (pasir_panjang, ohoiluk_gua, viewpoint_bukit,
│   │                             snorkeling_ngurtavur, pulau_tersembunyi, gua_hawang_inner)
│   ├── heritage/                ✅ 22 file (lihat Kategori 2 — sejarah Karel & ohoi)
│   ├── kuliner/                 ✅ 12 file (lihat Kategori 4)
│   ├── meti/                    ✅ 14 file (lihat Kategori 3 — Meti/Meti Kei)
│   ├── og/                      ✅ simfoni-evav-og.jpg
│   ├── satwa/                   ✅ 8 file (lihat Kategori 5)
│   ├── sejarah/                 ✅ 2 file (arsip_koperasi.png, arsip_monumen.png)
│   ├── teknologi/               ✅ 3 file (kei_technology_hawear/meti/sasi)
│   └── umkm/                    ✅ 16 file jpeg (lihat Kategori 6)
├── sounds/                      ✅ kei-waves.webm
├── videos/eksplorasi/           ✅ meti-timelapse.mp4
└── *.svg (root)                 ✅ Logo Black/Color/White, Kapal, MAatahari
```

> **Catatan perapihan (2026-07-18):** Dua folder dieja mirip `images/eksplorasi/` (spot wisata)
> dan `images/explorasi/` (duplikat Meti) **sudah digabung**. Salinan `kei_*` di `explorasi/`
> terbukti identik (md5 sama) dengan `images/meti/kei_*` — maka `images/explorasi/` **dihapus**
> dan seluruh kode dialihkan ke `images/meti/`. Duplikat `images/meti/eka-bagus-spot/` (salinan
> identik `images/explorasi/eka-bagus-spot/`) juga dihapus; kini hanya ada satu sumber di
> `images/eksplorasi/` (tidak lagi dipakai kode setelah repoint ke `pasir_panjang.png`). Semua
> file `*.Zone.Identifier` telah dibersihkan.

---

## 📋 DAFTAR ASET PER KATEGORI (semua ✅ = ada di disk & tercatat di attributions)

### KATEGORI 1 — HERO & JEDA JIWA (Landing `/`)
| Asset | Path | Status | Catatan |
|-------|------|--------|---------|
| Video hero — satwa | `hero/video/animal.mp4` | ✅ | Original (Simfoni Evav). |
| Video hero — budaya | `hero/video/culture.mp4` | ✅ | Original (Simfoni Evav). |
| Video hero — alam | `hero/video/nature.mp4` | ✅ | Original (Simfoni Evav). |
| Foto senja laut Kei (JedaJiwa) | `images/meti/kei-sunset-jeda.jpg` | ✅ | Wikimedia Commons (Miranda Rachellina). |
| Foto malam berbintang (Footer) | `images/heritage/kei_night_stars.png` | ✅ | Wikimedia Commons. |
| OG image social share | `images/og/simfoni-evav-og.jpg` | ✅ | 1200×630. |

### KATEGORI 2 — BUDAYA, HERITAGE & SEJARAH (`/budaya`, `/heritage`, `/sejarah`)
| Asset | Path | Status |
|-------|------|--------|
| Tenun batik Kei | `images/budaya/kei_batik.png` | ✅ |
| Potret masyarakat Kei | `images/budaya/kei_people_portrait.png` | ✅ |
| Senja pesisir Kei | `images/budaya/kei_coast_sunset.png` | ✅ |
| Budaya Kei (umum) | `images/budaya/kei_culture.png` | ✅ |
| Ritual budaya Kei | `images/budaya/kei_culture_ritual.png` | ✅ |
| Alat musik Dada/Tifa | `images/budaya/kei_dada_tifa.png` | ✅ |
| Simbol bahasa daerah | `images/budaya/kei_language_symbol.png` | ✅ |
| Larvul Ngabal (ilustrasi) | `images/budaya/kei_larvul_spear.png` | ✅ |
| Elemen laut surut (Meti) | `images/budaya/kei_meti_reef.png` | ✅ |
| Busana adat Kei | `images/budaya/kei_busana_adat.png` | ✅ |
| 7 Pilar adat — Damai | `images/budaya/kei_rule_damai.png` | ✅ |
| 7 Pilar adat — Harta | `images/budaya/kei_rule_harta.png` | ✅ |
| 7 Pilar adat — Kehormatan | `images/budaya/kei_rule_kehormatan.png` | ✅ |
| 7 Pilar adat — Kekerasan | `images/budaya/kei_rule_kekerasan.png` | ✅ |
| 7 Pilar adat — Keluarga | `images/budaya/kei_rule_keluarga.png` | ✅ |
| 7 Pilar adat — Sumpah | `images/budaya/kei_rule_sumpah.png` | ✅ |
| 7 Pilar adat — Tanah | `images/budaya/kei_rule_tanah.png` | ✅ |
| Tanimbar (identitas) | `images/budaya/kei_tanimbar.png` | ✅ |
| Tari Sawat 1–3 | `images/budaya/kei_tari_sawat_{1,2,3}.png` | ✅ |
| Wajah UMKM/berita 1–3 | `images/budaya/kei_umkm_face_{1,2,3}.png` | ✅ |
| Penari perang adat | `images/budaya/kei_warriors_dance.png` | ✅ |
| Watermark Tenun Elat (SVG) | `images/budaya/tenun_elat_watermark.svg` | ✅ |
| Ohoi Rumadian | `images/heritage/ohoi_rumadian.png` | ✅ |
| Ohoi Tel Nangan | `images/heritage/ohoi_tel_nangan.png` | ✅ |
| Elang kecil (endemik) | `images/heritage/elang_kecil.png` | ✅ |
| Warisan Evav (montase) | `images/heritage/evav_legacy.png` | ✅ |
| Gong Dada Wadlau | `images/heritage/gong_dada_wadlau.png` | ✅ |
| Kampung adat — Debut | `images/heritage/kampung_debut.png` | ✅ |
| Kampung adat — Lairngaggas | `images/heritage/kampung_lairngaggas.png` | ✅ |
| Kampung adat — Namar | `images/heritage/kampung_namar.png` | ✅ |
| Kampung adat — Ngayub | `images/heritage/kampung_ngayub.png` | ✅ |
| Kampung adat — Ngilngof | `images/heritage/kampung_ngilngof.png` | ✅ |
| Kampung adat — Ohoiluk | `images/heritage/kampung_ohoiluk.png` | ✅ |
| Kampung adat — Selayar | `images/heritage/kampung_selayar.png` | ✅ |
| Bandara Karel Sadsuitubun | `images/heritage/karel_airport.png` | ✅ |
| Karel — potret formal | `images/heritage/karel_formal_portrait.png` | ✅ |
| Karel — monumen | `images/heritage/karel_monument.png` | ✅ |
| Karel — monumen tragedi | `images/heritage/karel_monument_tragedy.png` | ✅ |
| Karel — potret | `images/heritage/karel_portrait.png` | ✅ |
| Karel — Rumadian | `images/heritage/karel_rumadian.png` | ✅ |
| Karel — jalan (street) | `images/heritage/karel_street.png` | ✅ |
| Karel — penari perang (alt) | `images/heritage/kei_warriors_dance.png` | ✅ |
| Kriel 356 (referensi) | `images/heritage/kriel_356.png` | ✅ |
| Arsip koperasi | `images/sejarah/arsip_koperasi.png` | ✅ |
| Arsip monumen | `images/sejarah/arsip_monumen.png` | ✅ |

### KATEGORI 3 — EKSPLORASI / METI KEI (`/eksplorasi`)
| Asset | Path | Status |
|-------|------|--------|
| Video timelapse Meti (hero) | `videos/eksplorasi/meti-timelapse.mp4` | ✅ |
| Wer Warat — tali janur kuning | `images/meti/wer_warat.png` | ✅ |
| Lomba Perahu Belan | `images/meti/perahu_belan.png` | ✅ |
| Masyarakat melambai | `images/meti/kei_waving.png` | ✅ |
| Ngurbloat Beach | `images/meti/kei_ngurbloat.png` | ✅ |
| Ngurtavur | `images/meti/kei_ngurtavur.png` | ✅ |
| Bair Island | `images/meti/kei_bair.png` | ✅ |
| Hawang | `images/meti/kei_hawang.png` | ✅ |
| Resort | `images/meti/kei_resort.png` | ✅ |
| Snorkeling | `images/meti/kei_snorkeling.png` | ✅ |
| Beach | `images/meti/kei_beach.png` | ✅ |
| Social mosaic 1,3,4,5 | `images/meti/kei_mosaic_{1,3,4,5}.png` | ✅ |
| Komunitas 1,2 | `images/meti/kei_community_{1,2}.png` | ✅ |
| Spot — Pasir Panjang | `images/eksplorasi/pasir_panjang.png` | ✅ |
| Spot — Gua Ohoiluk | `images/eksplorasi/ohoiluk_gua.png` | ✅ |
| Spot — Viewpoint Bukit | `images/eksplorasi/viewpoint_bukit.png` | ✅ |
| Spot — Snorkeling Ngurtavur | `images/eksplorasi/snorkeling_ngurtavur.png` | ✅ |
| Spot — Pulau Tersembunyi | `images/eksplorasi/pulau_tersembunyi.png` | ✅ |
| Spot — Gua Hawang (dalam) | `images/eksplorasi/gua_hawang_inner.png` | ✅ |

### KATEGORI 4 — KULINER (`/kuliner`)
| Asset | Path | Status |
|-------|------|--------|
| Enbal (makanan laut) | `images/kuliner/kei_culinary_enbal.png` | ✅ |
| Ikan (makanan laut) | `images/kuliner/kei_culinary_fish.png` | ✅ |
| Sirsir (makanan laut) | `images/kuliner/kei_culinary_sirsir.png` | ✅ |
| Lanskap makanan tradisional | `images/kuliner/kei_food_atmosfer.png` | ✅ |
| Hutan sagu & proses | `images/kuliner/kei_sagu_process.png` | ✅ |
| Enbal bunga | `images/kuliner/kei_enbal_bunga.png` | ✅ |
| Enbal love | `images/kuliner/kei_enbal_love.png` | ✅ |
| Enbal stik | `images/kuliner/kei_enbal_stik.png` | ✅ |
| Pisang Enbal + sambal | `images/kuliner/kei_pisang_enbal.png` | ✅ |
| Ikan Bakar Colo-Colo | `images/kuliner/kei_ikan_colocolo.png` | ✅ |
| Lat / Anggur Laut | `images/kuliner/kei_lat.png` | ✅ |
| Olahan mangrove (inovasi) | `images/kuliner/kei_mangrove_stick.png` | ✅ |

### KATEGORI 5 — SATWA & ALAM (`/`, FunFact, JourneyMap)
| Asset | Path | Status |
|-------|------|--------|
| Terumbu karang (coral) | `images/satwa/kei_coral.png` | ✅ |
| Lumba-lumba (dolphin) | `images/satwa/kei_dolphin.png` | ✅ |
| Satwa endemik (burung) | `images/satwa/kei_endemic_bird.png` | ✅ |
| Hutan mangrove | `images/satwa/kei_mangrove.png` | ✅ |
| Satwa laut (ikan) | `images/satwa/kei_reef_fish.png` | ✅ |
| Penyu (sea turtle) | `images/satwa/kei_seaturtle.png` | ✅ |
| Laguna / underwater | `images/satwa/kei_underwater.png` | ✅ |
| Satwa liar umum | `images/satwa/kei_wildlife.png` | ✅ |

### KATEGORI 6 — KETERHUBUNGAN & UMKM (`/keterhubungan`, BeritaUMKM)
| Asset | Path | Status |
|-------|------|--------|
| UMKM Enbal Bunga 1–2 | `images/umkm/kei_umkm_enbal_bunga_{1,2}.jpeg` | ✅ |
| UMKM Enbal Crispy Rumput Laut | `images/umkm/kei_umkm_enbal_crispy_rumput_laut.jpeg` | ✅ |
| UMKM Enbal Kacang 1–2 | `images/umkm/kei_umkm_enbal_kacang_{1,2}.jpeg` | ✅ |
| UMKM Enbal Stick 1–3 | `images/umkm/kei_umkm_enbal_stick_{1,2,3}.jpeg` | ✅ |
| UMKM Kacang Botol 1–2 | `images/umkm/kei_umkm_kacang_botol_{1,2}.jpeg` | ✅ |
| UMKM Kerupuk Enbal Super | `images/umkm/kei_umkm_kerupuk_enbal_super.jpeg` | ✅ |
| UMKM Kue Kering Mocaf Makmur 1–2 | `images/umkm/kei_umkm_kue_kering_mocaf_makmur_{1,2}.jpeg` | ✅ |
| UMKM Kue Kering Mocaf Saleha | `images/umkm/kei_umkm_kue_kering_mocaf_saleha.jpeg` | ✅ |
| UMKM Piece Enbal | `images/umkm/kei_umkm_piece_enbal.jpeg` | ✅ |
| UMKM Tepung Mocaf | `images/umkm/kei_umkm_tepung_mocaf.jpeg` | ✅ |
| Penari perang adat (form kiri) | `images/budaya/kei_warriors_dance.png` | ✅ |
| Wajah UMKM/berita 1–3 | `images/budaya/kei_umkm_face_{1,2,3}.png` | ✅ |

### KATEGORI 7 — AUDIO, OG & IKON BRAND
| Asset | Path | Status |
|-------|------|--------|
| Suara ombak Kei (ambient) | `sounds/kei-waves.webm` | ✅ |
| OG image | `images/og/simfoni-evav-og.jpg` | ✅ |
| Logo Black | `Logo Black.svg` | ✅ |
| Logo Color | `Logo Color.svg` | ✅ |
| Logo White | `Logo White.svg` | ✅ |
| Kapal (dekoratif) | `Kapal.svg` | ✅ |
| Matahari (dekoratif) | `MAatahari.svg` | ✅ |
| Watermark tenun | `images/budaya/tenun_elat_watermark.svg` | ✅ |

### KATEGORI 8 — TEKNOLOGI (Sasi / Hawear / Meti)
| Asset | Path | Status |
|-------|------|--------|
| Teknologi Hawear | `images/teknologi/kei_technology_hawear.png` | ✅ |
| Teknologi Meti | `images/teknologi/kei_technology_meti.png` | ✅ |
| Teknologi Sasi | `images/teknologi/kei_technology_sasi.png` | ✅ |

---

## ⚠️ PERINGATAN / REGRESI (hasil audit 2026-07-18)

1. **Kehilangan foto asli fotografer lokal.** Saat menggabungkan folder, ditemukan bahwa
   `images/explorasi/eka-bagus-spot/` dan `images/meti/eka-bagus-spot/` adalah **duplikat identik**
   (md5 sama) yang keduanya ikut terhapus, begitu pula `images/explorasi/mahasiswa-kkn/`. Folder
   `web/public/` berstatus *untracked* di git sehingga **tidak dapat dipulihkan**.
   - `mahasiswa-kkn/` tidak direferensikan kode mana pun → dampak nol (hanya kehilangan arsip).
   - `eka-bagus-spot/eka-bagus-2.jpeg` direferensikan `PenghormatanSection.tsx:50` → telah
     **dialihkan** ke `images/eksplorasi/pasir_panjang.png` agar tidak ada gambar rusak.
   > **Tindakan:** Jika foto asli Eka Bagus Spot & dokumentasi KKN masih ada di lokal pengguna,
   > mohon diunggah kembali ke `images/eksplorasi/eka-bagus-spot/` & `images/eksplorasi/mahasiswa-kkn/`
   > lalu perbarui path di `PenghormatanSection.tsx` & tambahkan entri atribusi.

2. **Entri atribusi yatim sudah dibersihkan** (audit sebelumnya): `pentas_seni.png`,
   `kei_mosaic_2/6/7.png`, `kei_community_3.png` — file tidak ada, entri dihapus.

---

## 📝 ATTRIBUSI (Wajib — §18.3, AGENTS.md §7.3)

Setiap aset web **wajib** dicatat di `web/src/content/asset-attributions.ts`. Saat ini **125 entri**
mencakup seluruh 124 file aset riil (OG image tercatat 2x di Kategori 1 & 7). Format:

```ts
export const assetAttributions: { file: string; source: string; author: string; license: string; url: string }[] = [
  // { file: "images/meti/wer_warat.png", source: "Unsplash", author: "Sean O.", license: "Unsplash License (free)", url: "https://images.unsplash.com/..." },
];
```

> ⚠️ Foto stok adalah **fallback sementara**. Skor 100/100 (§28.3) hanya dari lensa fotografer Kei
> asli. Ganti dengan foto otentik saat tersedia & validasi kosakata/fakta dengan informan lokal.

---

## ✅ CHECKLIST AGENT PER KATEGORI
- [x] Nama file snake_case sesuai tabel & konvensi `kei_<subjek>`.
- [x] Resolusi memenuhi §18.3 (hero ≥1920px, card ≥800px) — verifikasi manual di browser.
- [x] Lisensi bebas (Unsplash/Wikimedia/Pexels) atau original/brand; TIDAK ada watermark.
- [x] Seluruh aset tercatat di `asset-attributions.ts` (125 entri / 124 file).
- [x] Tidak ada folder duplikat (`explorasi/` & `meti/eka-bagus-spot/` sudah digabung/dihapus).
- [x] Video & audio dikompresi (video <8MB, audio webm).
