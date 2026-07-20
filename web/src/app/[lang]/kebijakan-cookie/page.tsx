import { notFound } from "next/navigation";
import { hasLocale } from "@/content/dictionaries";
import LegalLayout from "@/components/legal/LegalLayout";

export async function generateMetadata({
  params,
}: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  return {
    title: lang === "en" ? "Cookie Policy" : "Kebijakan Cookie",
    description:
      lang === "en"
        ? "Simfoni Evav Cookie Policy — the local storage technology and third-party services actually used by this site."
        : "Kebijakan Cookie Simfoni Evav — teknologi penyimpanan lokal dan layanan pihak ketiga yang benar-benar digunakan situs ini.",
    alternates: {
      canonical: "/kebijakan-cookie",
      languages: {
        id: "/id/kebijakan-cookie",
        en: "/en/kebijakan-cookie",
        "x-default": "/id/kebijakan-cookie",
      },
    },
    openGraph: {
      title: lang === "en" ? "Cookie Policy | Simfoni Evav" : "Kebijakan Cookie | Simfoni Evav",
      description:
        lang === "en"
          ? "An honest explanation of the local storage technology and third-party services used by this Kei Islands tourism site."
          : "Penjelasan jujur teknologi penyimpanan lokal dan layanan pihak ketiga yang digunakan situs pariwisata Kepulauan Kei.",
      url: "/kebijakan-cookie",
      locale: lang === "en" ? "en_US" : "id_ID",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: lang === "en" ? "Cookie Policy | Simfoni Evav" : "Kebijakan Cookie | Simfoni Evav",
      description:
        lang === "en"
          ? "An honest explanation of the local storage technology and third-party services used by this site."
          : "Penjelasan jujur teknologi penyimpanan lokal dan layanan pihak ketiga yang digunakan situs.",
    },
  };
}

export default async function CookiePolicyPage({
  params,
}: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();

  return (
    <LegalLayout
      title="Kebijakan Cookie"
      subtitle="Dokumen ini menjelaskan secara jujur dan akurat teknologi penyimpanan lokal serta layanan pihak ketiga yang benar-benar digunakan oleh situs ini."
      lastUpdated="19 Juli 2026"
    >
      <p>
        Situs: <a href="https://discoverevav.id">discoverevav.id</a> —
        &ldquo;Simfoni Evav&rdquo;, situs pariwisata Kepulauan Kei / Evav, Maluku
        Tenggara, Indonesia.
      </p>

      <h2>Apa itu Cookie</h2>
      <p>
        Cookie adalah berkas teks kecil yang disimpan di perangkat Anda oleh situs
        web melalui peramban (browser). Selain cookie, situs modern juga dapat
        menggunakan teknik penyimpanan lokal lainnya, seperti{" "}
        <code>localStorage</code> dan <code>sessionStorage</code>, untuk
        menyimpan preferensi di perangkat Anda tanpa mengirimkannya kembali ke
        server kami setiap kali.
      </p>

      <h2>Cookie yang Kami Gunakan</h2>
      <p>
        Berdasarkan peninjauan kode sumber situs, <strong>Simfoni Evav tidak
        memasang cookie pelacakan (tracking cookie) dan tidak menggunakan layanan
        analitik pihak ketiga</strong> (seperti Google Analytics, Google Tag
        Manager, Meta Pixel, Plausible, Umami, Hotjar, Mixpanel, atau sejenisnya).
      </p>
      <p>
        Satu-satunya penyimpanan lokal yang digunakan situs ini adalah untuk
        keperluan fungsional/preferensi, dijelaskan pada tabel berikut.
      </p>

      <h3>1. Cookie / Storage Penting &amp; Teknis</h3>
      <table>
        <thead>
          <tr>
            <th>Nama</th>
            <th>Jenis</th>
            <th>Fungsi</th>
            <th>Durasi</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Tidak ada cookie sesi atau token autentikasi yang digunakan</td>
            <td>—</td>
            <td>
              Situs bersifat publik dan tidak memiliki sistem login/akun pengguna
            </td>
            <td>—</td>
          </tr>
        </tbody>
      </table>
      <p>
        Situs ini <strong>tidak</strong> menggunakan <code>sessionStorage</code>,{" "}
        <code>indexedDB</code>, token autentikasi, maupun cookie sesi apa pun.
      </p>

      <h3>2. Cookie Preferensi</h3>
      <table>
        <thead>
          <tr>
            <th>Nama</th>
            <th>Jenis</th>
            <th>Fungsi</th>
            <th>Durasi</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <code>lang</code>
            </td>
            <td>
              <code>localStorage</code> (browser)
            </td>
            <td>
              Menyimpan pilihan bahasa antarmuka pengguna (&ldquo;id&rdquo; untuk
              Bahasa Indonesia atau &ldquo;en&rdquo; untuk Inggris) agar pilihan
              tetap konsisten saat berpindah halaman. Diatur melalui komponen
              Navbar.
            </td>
            <td>
              Tetap (persistent) hingga dihapus manual oleh pengguna.
            </td>
          </tr>
        </tbody>
      </table>
      <p>
        <strong>Catatan mengenai audio ambient:</strong> Tombol suara ombak Kei
        bersifat sementara dan <strong>tidak</strong> menyimpan preferensi ke{" "}
        <code>localStorage</code>/cookie. Status aktif/nonaktif suara hanya
        berlaku selama sesi halaman terbuka dan akan kembali ke kondisi awal
        (bisu) setelah halaman dimuat ulang.
      </p>

      <h3>3. Analitik</h3>
      <p>
        <strong>TIDAK ADA.</strong> Situs ini tidak memuat skrip analitik atau
        pelacakan pengunjung apa pun. Kami tidak mengumpulkan data perilaku
        penjelajahan Anda melalui cookie pihak ketiga.
      </p>

      <h3>4. Pihak Ketiga</h3>
      <p>
        Situs memuat sumber daya dari pihak ketiga berikut untuk keperluan tampilan
        dan peta (lihat detail di bawah). Layanan ini tidak digunakan untuk
        menyimpan cookie pelacakan di situs kami.
      </p>

      <h2>Cookie Pihak Ketiga</h2>
      <h3>Peta — MapLibre GL &amp; Basemap CARTO</h3>
      <p>
        Halaman penjelajahan peta menggunakan <strong>MapLibre GL JS</strong>{" "}
        (pustaka peta sumber terbuka) melalui pembungkus{" "}
        <code>react-map-gl/maplibre</code>. Peta memuat gaya basemap dari{" "}
        <strong>CARTO</strong> (CartoDB):
      </p>
      <p>
        <code>https://basemaps.cartocdn.com/gl/positron-gl-style/style.json</code>
      </p>
      <p>
        Saat peta dimuat, peramban Anda akan mengambil berkas gaya, ubin peta
        (tiles), dan aset peta dari server CARTO (<code>basemaps.cartocdn.com</code>
        ). Permintaan ini dilakukan oleh peramban Anda langsung ke server CARTO.
        CARTO mungkin mencatat alamat IP dan data teknis standar permintaan (seperti
        halnya setiap pengambilan aset web). Penggunaan ini murni untuk menampilkan
        peta lokasi wisata Kepulauan Kei dan <strong>bukan</strong> untuk
        pelacakan pengguna.
      </p>
      <p>
        Situs <strong>tidak</strong> menggunakan Mapbox berbayar dan{" "}
        <strong>tidak</strong> memerlukan token API pihak ketiga untuk peta.
      </p>

      <h3>Font — Google Fonts (Di-hosting Mandiri)</h3>
      <p>
        Situs menggunakan font Montserrat, Montaga, dan Ephesis melalui{" "}
        <code>next/font/google</code>. Penting untuk dicatat: Next.js{" "}
        <strong>mengunduh dan meng-host font tersebut saat proses build</strong>,
        sehingga font dihidangkan (served) langsung dari domain kami sendiri (
        <code>discoverevav.id</code>). Situs <strong>tidak</strong> memuat skrip
        atau stylesheet dari <code>fonts.googleapis.com</code>/
        <code>fonts.gstatic.com</code> di peramban pengguna saat runtime, sehingga
        tidak ada permintaan pelacakan ke Google Fonts dari sisi klien.
      </p>

      <h3>Gambar — Unsplash</h3>
      <p>
        Gambar konten (destinasi, budaya, kuliner, warisan) diambil dari Unsplash (
        <code>images.unsplash.com</code>) sebagai sumber cadangan web. Domain ini
        terdaftar di <code>images.remotePatterns</code>. Pengambilan gambar
        dilakukan melalui komponen <code>next/image</code> dari server kami; tidak
        ada piksel pelacakan yang disematkan.
      </p>

      <h3>Tautan Media Sosial</h3>
      <p>
        Situs hanya menampilkan <strong>tautan</strong> ke akun resmi (Instagram,
        TikTok, YouTube, Facebook) dan tidak menyematkan (embed) iframe atau pemutar
        media sosial di dalam halaman. Karena itu, tidak ada cookie dari platform
        media sosial tersebut yang dimuat saat Anda membuka situs kami. Cookie baru
        hanya akan muncul jika Anda mengklik tautan tersebut dan masuk ke situs
        platform terkait.
      </p>

      <h2>Manajemen Cookie &amp; Preferensi Pengguna</h2>
      <p>
        Karena situs ini <strong>tidak menggunakan cookie pelacakan dan tidak
        memuat layanan analitik pihak ketiga</strong>, <strong>kami saat ini tidak
        menyediakan banner konsen cookie tersendiri</strong> di dalam situs.
        Satu-satunya data yang disimpan di perangkat Anda adalah preferensi bahasa (
        <code>localStorage</code> kunci <code>lang</code>), yang bersifat
        fungsional dan tidak keluar dari perangkat Anda.
      </p>
      <p>
        Anda tetap dapat mengelola atau menghapus penyimpanan lokal kapan saja
        melalui peramban:
      </p>
      <ul>
        <li>
          <strong>Google Chrome / Microsoft Edge:</strong> Setelan → Privasi dan
          keamanan → Cookie dan data situs lainnya → Lihat semua data situs → Cari{" "}
          <code>discoverevav.id</code> → Hapus.
        </li>
        <li>
          <strong>Mozilla Firefox:</strong> Setelan → Privasi &amp; Keamanan →
          Cookie dan Data Situs → Kelola Data → Cari <code>discoverevav.id</code> →
          Hapus.
        </li>
        <li>
          <strong>Safari:</strong> Preferensi → Privasi → Kelola Data Situs Web →
          Cari <code>discoverevav.id</code> → Hapus.
        </li>
      </ul>
      <p>
        Anda juga dapat menonaktifkan JavaScript atau menggunakan mode &ldquo;Do Not
        Track&rdquo; / pemblokir pelacakan di peramban Anda. Perlu diperhatikan
        bahwa menonaktifkan JavaScript akan membuat peta interaktif (MapLibre) dan
        beberapa interaksi tidak berfungsi sebagaimana mestinya.
      </p>
      <p>
        Untuk menghapus preferensi bahasa saja tanpa memengaruhi lainnya, cukup
        hapus (clear) data situs <code>discoverevav.id</code> melalui langkah di
        atas.
      </p>

      <h2>Pembaruan Kebijakan</h2>
      <p>
        Kami dapat memperbarui Kebijakan Cookie ini sewaktu-waktu apabila terjadi
        perubahan teknologi atau layanan pihak ketiga yang kami gunakan. Versi
        terbaru akan selalu ditandai dengan tanggal berlaku di bagian atas dokumen.
        Apabila di kemudian hari kami menambahkan layanan analitik atau cookie
        pelacakan, kami akan memperbarui dokumen ini dan, bila diperlukan,
        menyediakan mekanisme persetujuan yang sesuai.
      </p>

      <h2>Kontak</h2>
      <p>
        Jika Anda memiliki pertanyaan mengenai kebijakan cookie atau penanganan
        data di situs ini, silakan hubungi:
      </p>
      <p>
        <a href="mailto:privasi@discoverevav.id">privasi@discoverevav.id</a>
      </p>
    </LegalLayout>
  );
}
