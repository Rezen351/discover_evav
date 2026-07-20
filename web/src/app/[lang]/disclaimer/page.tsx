import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { hasLocale } from "@/content/dictionaries";
import LegalLayout from "@/components/legal/LegalLayout";

export async function generateMetadata({
  params,
}: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  return {
    title: lang === "en" ? "Disclaimer" : "Disclaimer",
    description:
      lang === "en"
        ? "Simfoni Evav Disclaimer — limitations of liability for the Kei Islands tourism information presented on this site."
        : "Disclaimer Simfoni Evav — batasan tanggung jawab atas informasi pariwisata Kepulauan Kei yang disajikan di situs ini.",
    alternates: {
      canonical: "/disclaimer",
      languages: {
        id: "/id/disclaimer",
        en: "/en/disclaimer",
        "x-default": "/id/disclaimer",
      },
    },
    openGraph: {
      title: lang === "en" ? "Disclaimer | Simfoni Evav" : "Disclaimer | Simfoni Evav",
      description:
        lang === "en"
          ? "Simfoni Evav Disclaimer — limitations of liability for Kei Islands tourism information."
          : "Disclaimer Simfoni Evav — batasan tanggung jawab atas informasi pariwisata Kepulauan Kei.",
      url: "/disclaimer",
      siteName: "Simfoni Evav",
      locale: lang === "en" ? "en_US" : "id_ID",
      type: "article",
    },
    robots: {
      index: true,
      follow: true,
    },
    keywords:
      lang === "en"
        ? ["Disclaimer", "Simfoni Evav", "Kei Islands", "Disclaimer Notice", "Kei Tourism"]
        : ["Disclaimer", "Simfoni Evav", "Kepulauan Kei", "Penafian", "Pariwisata Kei"],
  };
}

export default async function DisclaimerPage({
  params,
}: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();

  return (
    <LegalLayout
      title="Disclaimer"
      subtitle="Situs informasi dan edukasi pariwisata Kepulauan Kei. Dokumen ini membatasi tanggung jawab atas konten yang kami sajikan."
      lastUpdated="19 Juli 2026"
    >
      <h2>Pendahuluan</h2>
      <p>
        Situs <strong>Simfoni Evav</strong> (
        <a
          href="https://discoverevav.id"
          target="_blank"
          rel="noopener noreferrer"
        >
          https://discoverevav.id
        </a>) adalah
        sebuah platform informasi dan edukasi pariwisata yang memperkenalkan
        keindahan alam, kebudayaan, sejarah, dan kuliner Kepulauan Kei (Evav),
        Maluku Tenggara, Indonesia. Situs ini <strong>bukan</strong> penyedia
        layanan perjalanan resmi, biro perjalanan (travel agent), operator tur,
        maupun lembaga pemerintah. Seluruh konten disajikan semata-mata untuk
        tujuan informasi, apresiasi budaya, dan promosi pariwisata daerah.
      </p>
      <p>
        Penggunaan situs ini menandakan bahwa Anda telah membaca, memahami, dan
        menyetujui ketentuan dalam dokumen disclaimer ini.
      </p>

      <h2>Batasan atas Informasi</h2>
      <p>
        Seluruh informasi yang tersaji — termasuk namun tidak terbatas pada
        deskripsi destinasi wisata, lokasi, koordinat geografis, jadwal peristiwa
        alam (seperti fenomena <em>Meti</em> / surut ekstrem), harga, rating, nama
        UMKM, kontak, serta informasi satwa endemik dan budaya — dikumpulkan dari
        berbagai sumber riset dan disusun untuk tujuan ilustratif.
      </p>
      <p>
        Kami berupaya menyajikan data yang setepat mungkin, namun{" "}
        <strong>tidak menjamin</strong> bahwa informasi tersebut selalu akurat,
        lengkap, mutakhir, atau bebas dari kesalahan. Kondisi destinasi,
        ketersediaan akses, jadwal kegiatan adat, status konservasi satwa, dan
        data operasional UMKM dapat berubah sewaktu-waktu tanpa pemberitahuan.
        Pengguna wajib memverifikasi secara mandiri setiap informasi penting
        sebelum bertindak atau merencanakan perjalanan.
      </p>

      <h2>Tidak Ada Jaminan Perjalanan atau Reservasi</h2>
      <p>
        Simfoni Evav <strong>tidak menyelenggarakan, menjual, atau
        memfasilitasi</strong> paket wisata, transportasi, akomodasi, reservasi,
        maupun layanan pandu wisata. Tautan &ldquo;Lihat di Peta&rdquo;, tombol
        penghubung WhatsApp UMKM, maupun fitur peta interaktif hanya bersifat
        referensial dan mengarahkan pengguna ke sumber pihak ketiga (termasuk
        Google Maps dan nomor kontak pelaku UMKM lokal).
      </p>
      <p>
        Kami <strong>tidak memberi jaminan</strong> atas keamanan, kenyamanan,
        keselamatan, maupun kelancaran perjalanan Anda. Setiap risiko perjalanan —
        termasuk namun tidak terbatas pada kondisi cuaca, aksesibilitas medan,
        keselamatan bermalam di alam, aktivitas bawah air (snorkeling/diving),
        interaksi dengan satwa liar, dan kepatuhan regulasi setempat — sepenuhnya
        menjadi tanggung jawab pengguna. Kami sangat menyarankan pengguna untuk:
      </p>
      <ul>
        <li>
          Mengonfirmasi kondisi terkini destinasi kepada otoritas lokal, pandu
          berlisensi, atau warga setempat;
        </li>
        <li>Menjaga kelestarian alam dan menghormati sasi serta aturan adat yang berlaku;</li>
        <li>
          Menyiapkan perbekalan, asuransi perjalanan, dan izin yang diperlukan
          secara mandiri.
        </li>
      </ul>

      <h2>Konten Budaya &amp; Sejarah</h2>
      <p>
        Materi terkait adat, filsafat, dan sejarah Kepulauan Kei — termasuk{" "}
        <em>Larvul Ngabal</em>, <em>Ain Ni Ain</em>, <em>Belis</em>,{" "}
        <em>Tenun Ikat Elat</em>, <em>Tradisi Meti &amp; Sasi Laut</em>, serta
        linimasa sejarah — disajikan sebagai bentuk <strong>apresiasi dan
        edukasi</strong> terhadap warisan lisan dan takbenda masyarakat Kei.
      </p>
      <p>
        Sebagian besar hukum adat Kei diwariskan secara{" "}
        <strong>lisan turun-temurun</strong>, sehingga terdapat kemungkinan
        perbedaan interpretasi, versi narasi, atau penyederhanaan dalam
        penyajiannya. Konten ini tidak dimaksudkan sebagai otoritas hukum, teks
        keagamaan, maupun rujukan akademis yang final. Untuk keperluan penelitian,
        upacara adat, atau kepentingan formal, pengguna diharapkan berkonsultasi
        langsung dengan tetua adat, pemangku adat, atau informan lokal Kei yang
        berwenang.
      </p>

      <h2>Tautan Pihak Ketiga</h2>
      <p>
        Situs ini memuat tautan serta integrasi ke layanan pihak ketiga, antara
        lain:
      </p>
      <ul>
        <li>
          Peta interaktif berbasis MapLibre GL JS dengan gaya peta dari Carto
          (Positron);
        </li>
        <li>Tautan pencarian Google Maps untuk setiap destinasi;</li>
        <li>Akun media sosial resmi (Instagram, TikTok, YouTube, Facebook);</li>
        <li>Nomor WhatsApp pelaku UMKM yang ditampilkan pada katalog kuliner/oleh-oleh.</li>
      </ul>
      <p>
        Kami tidak memiliki kendali atas konten, kebijakan privasi, ketersediaan,
        atau praktik layanan pihak ketiga tersebut. Kehadiran tautan tidak
        merupakan endorsemen, afiliasi, atau jaminan terhadap layanan pihak
        ketiga. Pengguna membuka dan menggunakan layanan pihak ketiga tersebut
        dengan risiko sendiri dan tunduk pada syarat masing-masing penyedia.
      </p>
      <p>
        Beberapa nomor WhatsApp UMKM yang ditampilkan merupakan{" "}
        <strong>data contoh (placeholder)</strong> yang disiapkan untuk keperluan
        pengembangan; pengguna wajib memverifikasi keabsahannya sebelum melakukan
        komunikasi atau transaksi.
      </p>

      <h2>Ketersediaan Fitur Teknis</h2>
      <p>
        Simfoni Evav menyajikan fitur teknis interaktif, termasuk:
      </p>
      <ul>
        <li>
          <strong>Peta Penjelajahan Kei</strong> yang memuat peta interaktif
          destinasi;
        </li>
        <li>
          <strong>Suara Ambient Ombak Kei</strong> berupa audio latar opsional
          yang dapat diaktifkan oleh pengguna;
        </li>
        <li>
          <strong>Audio budaya</strong> (kidung, pantun, dan nyanyian tradisi)
          pada halaman budaya.
        </li>
      </ul>
      <p>
        Ketersediaan, performa, dan penampilan fitur-fitur tersebut{" "}
        <strong>bergantung pada perangkat, peramban (browser), koneksi internet,
        serta pengaturan perangkat keras</strong> masing-masing pengguna. Fitur
        peta dan audio mungkin tidak tersedia, tertunda, atau berkinerja berbeda
        pada perangkat tertentu, koneksi terbatas, atau saat layanan pihak ketiga
        (seperti server peta) sedang bermasalah. Kami tidak bertanggung jawab atas
        ketidakmampuan untuk mengakses atau menggunakan fitur teknis tersebut.
      </p>

      <h2>Batasan Tanggung Jawab</h2>
      <p>
        Sejauh diizinkan oleh hukum yang berlaku, Simfoni Evav dan seluruh
        pengelola, penyusun, dan kontributornya <strong>tidak bertanggung
        jawab</strong> atas segala kerugian, baik langsung maupun tidak langsung,
        insidental, khusus, maupun yang timbul akibat:
      </p>
      <ul>
        <li>Pengandalan pengguna terhadap informasi di situs ini;</li>
        <li>Ketidakakuratan, kelalaian, atau perubahan informasi;</li>
        <li>Kejadian atau risiko selama perjalanan, kunjungan, atau interaksi dengan pihak ketiga;</li>
        <li>Kegagalan atau gangguan fitur teknis situs;</li>
        <li>Akses terhadap situs yang terputus atau tidak tersedia.</li>
      </ul>
      <p>
        Semua konten disediakan <strong>&ldquo;sebagaimana adanya&rdquo;
        (as-is)</strong> tanpa jaminan apa pun, baik tersurat maupun tersirat,
        termasuk namun tidak terbatas pada jaminan mengenai kelayakan untuk tujuan
        tertentu, ketepatan, atau tidak adanya pelanggaran hak pihak lain.
      </p>

      <h2>Perubahan Disclaimer</h2>
      <p>
        Kami dapat memperbarui disclaimer ini dari waktu ke waktu guna
        menyesuaikan dengan perkembangan situs dan ketentuan hukum. Versi terbaru
        akan dipublikasikan pada halaman ini dengan pembaruan tanggal efektif.
        Penggunaan situs setelah perubahan tersebut merupakan persetujuan atas
        ketentuan yang baru.
      </p>

      <h2>Kontak</h2>
      <p>
        Apabila Anda memiliki pertanyaan, koreksi atas informasi, atau ingin
        memberikan masukan terkait konten situs, silakan menghubungi kami melalui
        surel:
      </p>
      <p>
        <a href="mailto:info@discoverevav.id">info@discoverevav.id</a>
      </p>
    </LegalLayout>
  );
}
