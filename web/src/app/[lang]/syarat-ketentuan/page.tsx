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
    title: lang === "en" ? "Terms & Conditions" : "Syarat & Ketentuan",
    description:
      lang === "en"
        ? "Simfoni Evav Terms & Conditions — rules for using the Kei Islands cultural and nature tourism promotion site."
        : "Syarat & Ketentuan Simfoni Evav — aturan penggunaan situs promosi pariwisata Kepulauan Kei.",
    alternates: {
      canonical: "/syarat-ketentuan",
      languages: {
        id: "/id/syarat-ketentuan",
        en: "/en/syarat-ketentuan",
        "x-default": "/id/syarat-ketentuan",
      },
    },
    openGraph: {
      title: lang === "en" ? "Terms & Conditions | Simfoni Evav" : "Syarat & Ketentuan | Simfoni Evav",
      description:
        lang === "en"
          ? "Rules for using the cultural and nature tourism promotion site of the Kei Islands."
          : "Aturan penggunaan situs promosi pariwisata budaya dan alam Kepulauan Kei.",
      url: "/syarat-ketentuan",
      locale: lang === "en" ? "en_US" : "id_ID",
      type: "article",
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

export const dynamic = "force-static";

export default async function TermsOfServicePage({
  params,
}: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();

  return (
    <LegalLayout
      title="Syarat & Ketentuan"
      subtitle="Aturan penggunaan situs promosi pariwisata budaya dan alam Kepulauan Kei. Dengan mengakses situs ini, Anda dianggap menyetujui ketentuan berikut."
      lastUpdated="19 Juli 2026"
    >
      <h2>1. Pendahuluan</h2>
      <p>
        Selamat datang di <strong>Simfoni Evav</strong>, situs promosi pariwisata
        budaya dan alam yang memperkenalkan keindahan, sejarah, dan kebudayaan
        Kepulauan Kei (Evav), Maluku Tenggara, Indonesia. Situs ini{" "}
        <strong>bukan</strong> toko e-commerce dan <strong>tidak</strong>{" "}
        menyediakan layanan transaksi pembayaran, pembelian barang, atau
        penjualan produk secara langsung.
      </p>
      <p>
        Dengan mengakses, menjelajahi, atau menggunakan situs ini (selanjutnya
        disebut &ldquo;Situs&rdquo;), Anda dianggap telah membaca, memahami, dan
        menyetujui Syarat &amp; Ketentuan berikut. Jika Anda tidak menyetujui
        syarat ini, mohon untuk tidak menggunakan Situs.
      </p>
      <p>
        <strong>Status Pengembangan:</strong> Situs ini masih dalam tahap
        pengembangan dan akan terus berkembang dari waktu ke waktu. Kami
        menyadari bahwa kekurangan, ketidaksempurnaan, atau kesalahan penyajian
        masih mungkin ditemukan, dan seluruh kekurangan tersebut akan terus kami
        pantau serta perbaiki secara berkala seiring berjalannya pengembangan.
      </p>
      <p>
        Istilah &ldquo;Situs&rdquo;, &ldquo;kami&rdquo;, atau &ldquo;Simfoni
        Evav&rdquo; merujuk pada pengelola situs promosi pariwisata Simfoni
        Evav. Istilah &ldquo;Anda&rdquo; atau &ldquo;Pengguna&rdquo; merujuk pada
        setiap individu yang mengakses atau menggunakan Situs.
      </p>

      <h2>2. Penggunaan Situs</h2>
      <p>
        Situs ini disediakan semata-mata untuk tujuan informasi, edukasi, dan
        promosi pariwisata budaya serta alam Kepulauan Kei. Dengan menggunakan
        Situs, Anda menyetujui untuk:
      </p>
      <ul>
        <li>
          Menggunakan Situs hanya untuk tujuan yang sah dan sesuai dengan
          peraturan perundang-undangan yang berlaku.
        </li>
        <li>
          Menghormati nilai, budaya, dan warisan adat masyarakat Kei (termasuk
          hukum adat <em>Larvul Ngabal</em>) yang ditampilkan dalam Situs.
        </li>
        <li>
          Tidak menyalahgunakan, mengganggu, atau merusak operasional Situs,
          termasuk namun tidak terbatas pada penyebaran malware, peretasan, atau
          beban trafik yang berlebihan.
        </li>
      </ul>
      <p>Anda <strong>dilarang</strong> untuk:</p>
      <ul>
        <li>
          Menggunakan Situs untuk menyebarkan konten yang ilegal, bersifat
          ancaman, kebencian (hate speech), pornografi, diskriminatif, atau
          melanggar hak pihak lain.
        </li>
        <li>
          Meniru, memalsukan identitas, atau mengatasnamakan Simfoni Evav untuk
          tujuan yang menyesatkan.
        </li>
        <li>
          Melakukan ekstraksi data otomatis (scraping) yang melanggar batas wajar
          atau merugikan Situs tanpa izin tertulis.
        </li>
        <li>
          Menggunakan Situs untuk aktivitas komersial yang tidak sah atau
          penipuan.
        </li>
      </ul>

      <h2>3. Konten &amp; Hak Kekayaan Intelektual</h2>
      <p>
        Seluruh teks, desain, tata letak, logo, merek, video, dan karya asli
        lainnya dalam Situs yang dihasilkan oleh <strong>Simfoni Evav</strong>{" "}
        merupakan milik pengelola Situs dan dilindungi oleh ketentuan Hak
        Kekayaan Intelektual (HKI), termasuk Undang-Undang Nomor 28 Tahun 2014
        tentang Hak Cipta.
      </p>
      <p>
        Sebagian aset visual dan media dalam Situs bersumber dari pihak ketiga
        dengan lisensi terbuka (seperti Unsplash, Wikimedia Commons, Pexels, dan
        Freesound) atau merupakan dokumentasi asli masyarakat Kei. Rincian
        atribusi, sumber, penulis, dan jenis lisensi masing-masing aset tercatat
        secara terpusat dalam berkas <code>asset-attributions</code>, antara
        lain:
      </p>
      <ul>
        <li>
          <strong>Karya asli Simfoni Evav</strong> — lisensi{" "}
          <em>Proprietary</em> (logo merek) atau <em>CC0</em> (karya yang dilepas
          ke domain publik).
        </li>
        <li>
          <strong>Ilustrasi &amp; aset generatif (AI-generated)</strong> —
          sebagian gambar/ilustrasi (termasuk namun tidak terbatas pada ikon,
          motif dekoratif, dan aset bertanda &ldquo;generated&rdquo; dalam berkas{" "}
          <code>asset-attributions</code>) dihasilkan secara sintesis
          (kecerdasan buatan / alat generatif) atau berasal dari pustaka
          representatif, dan <strong>bukan</strong> foto dokumenter asli
          Kepulauan Kei. Aset tersebut disajikan untuk tujuan ilustratif dengan
          lisensi <em>CC0</em> atau milik pengelola, tanpa klaim
          merepresentasikan kondisi objek asli secara persis.
        </li>
        <li>
          <strong>Unsplash</strong> — lisensi <em>Unsplash License</em> (bebas
          digunakan).
        </li>
        <li>
          <strong>Wikimedia Commons</strong> — lisensi <em>CC BY-SA</em> (wajib
          menyebutkan sumber &amp; penulis, serta menyebarluaskan dengan lisensi
          serupa).
        </li>
        <li>
          <strong>Pexels</strong> — lisensi <em>Pexels License</em> (bebas
          digunakan).
        </li>
        <li>
          <strong>Freesound</strong> — lisensi <em>CC0 1.0</em> (domain publik).
        </li>
        <li>
          <strong>Dokumentasi Kei (Fotografer Kei / UMKM Kei)</strong> — lisensi{" "}
          <em>CC BY (lokal)</em> dengan kewajiban atribusi.
        </li>
      </ul>
      <p>
        Konten budaya, wisata, dan profil UMKM unggulan Kepulauan Kei yang
        ditampilkan di Situs disajikan untuk tujuan promosi non-komersial.
        Pengguna diperbolehkan menggunakan, menyalin, atau menyebarkan sebagian
        konten Situs untuk keperluan <strong>non-komersial</strong> (seperti
        edukasi atau dokumentasi pribadi) dengan <strong>syarat menyertakan
        atribusi yang layak</strong> kepada Simfoni Evav dan pihak sumber sesuai
        lisensi masing-masing.
      </p>
      <p>
        Beberapa ilustrasi dalam Situs dihasilkan secara generatif
        (kecerdasan buatan / alat sintesis gambar) atau menggunakan aset
        representatif dari pustaka pihak ketiga (seperti Unsplash) yang{" "}
        <strong>tidak sepenuhnya merepresentasikan</strong> objek, kondisi,
        atau tampilan asli di lapangan. Ilustrasi tersebut bersifat pendukung
        visual semata dan tidak dimaksudkan sebagai dokumentasi faktual.
      </p>
      <p>
        Penggunaan konten untuk tujuan komersial, modifikasi yang merugikan, atau
        penghapusan atribusi tanpa izin tertulis dari pemegang hak adalah{" "}
        <strong>dilarang</strong>.
      </p>

      <h2>4. Kontribusi Pengguna</h2>
      <p>Situs menyediakan fitur interaksi Pengguna, antara lain:</p>
      <ul>
        <li>
          <strong>Formulir Kontak / &ldquo;Sapa Keluarga Evav&rdquo;</strong>{" "}
          (bagian Hubungi Kami).
        </li>
        <li>
          <strong>Formulir Keterhubungan</strong> dengan pilihan topik seperti
          Pertanyaan Umum, Kerja Sama &amp; Partnership, Saran &amp; Masukan, dan
          Laporan Masalah.
        </li>
        <li>
          Tautan langsung ke WhatsApp, surel (email), dan media sosial resmi.
        </li>
      </ul>
      <p>
        Dengan mengirimkan nama, alamat surel, pesan, atau konten lainnya
        (&ldquo;Kontribusi&rdquo;) melalui fitur tersebut, Anda menyatakan bahwa:
      </p>
      <ul>
        <li>
          Kontribusi yang Anda kirim adalah milik Anda, tidak melanggar hak pihak
          lain, dan tidak mengandung konten ilegal, melecehkan, atau melanggar
          hukum.
        </li>
        <li>
          Anda memberi Simfoni Evav izin non-eksklusif untuk membaca, mencatat,
          dan merespons Kontribusi demi keperluan layanan informasi dan
          komunikasi.
        </li>
        <li>
          Anda bertanggung jawab sepenuhnya atas kebenaran, legalitas, dan dampak
          dari Kontribusi yang Anda kirimkan.
        </li>
        <li>
          Simfoni Evav berhak, namun tidak berkewajiban, untuk tidak membalas,
          memfilter, atau menolak Kontribusi yang melanggar Syarat &amp;
          Ketentuan ini.
        </li>
      </ul>
      <p>
        Simfoni Evav <strong>tidak</strong> mengumpulkan, menjual, atau memproses
        data Pengguna untuk transaksi komersial. Data yang Anda berikan hanya
        digunakan untuk keperluan komunikasi balasan sebagaimana dijelaskan dalam
        Kebijakan Privasi.
      </p>

      <h2>5. Tautan Pihak Ketiga</h2>
      <p>
        Situs berisi tautan, penyematan (embed), dan integrasi pihak ketiga,
        antara lain:
      </p>
      <ul>
        <li>
          <strong>Peta interaktif</strong> yang menggunakan layanan peta{" "}
          <em>MapLibre GL</em> dengan gaya dasar dari <em>CARTO Positron</em> (
          <code>basemaps.cartocdn.com</code>) serta data titik lokasi wisata.
        </li>
        <li>
          <strong>Media sosial</strong> resmi (Instagram, TikTok, YouTube,
          Facebook, WhatsApp) yang diakses melalui tautan eksternal.
        </li>
        <li>
          <strong>Situs eksternal</strong> lain yang mungkin dirujuk dalam
          konten.
        </li>
      </ul>
      <p>
        Tautan dan layanan pihak ketiga tersebut dikelola sepenuhnya oleh
        penyedia masing-masing. Simfoni Evav <strong>tidak bertanggung jawab</strong>{" "}
        atas konten, kebijakan privasi, keamanan, ketersediaan, atau praktik dari
        situs, peta, atau layanan pihak ketiga tersebut. Kehadiran tautan tidak
        merupakan dukungan atau afiliasi resmi, kecuali dinyatakan secara tegas.
      </p>

      <h2>6. Batasan Tanggung Jawab / Disclaimer</h2>
      <p>
        Situs disediakan &ldquo;sebagaimana adanya&rdquo; (<em>as-is</em>) dan
        &ldquo;sebagaimana tersedia&rdquo; (<em>as-available</em>) untuk tujuan
        informasi pariwisata semata. Meskipun kami berupaya menyajikan informasi
        yang akurat mengenai destinasi, budaya, sejarah, kuliner, satwa, dan UMKM
        Kepulauan Kei, Simfoni Evav <strong>tidak menjamin</strong> ketepatan,
        kelengkapan, atau keaktualan seluruh informasi yang ditampilkan.
      </p>
      <p>
        Simfoni Evav <strong>tidak memberikan jaminan perjalanan, jaminan kondisi
        lapangan, atau jaminan ketersediaan</strong> destinasi, fasilitas, atau
        layanan pihak ketiga (termasuk UMKM, akomodasi, dan transportasi) yang
        disebutkan dalam Situs. Setiap rencana perjalanan, kunjungan, atau
        transaksi yang Anda lakukan dengan pihak ketiga sepenuhnya merupakan
        risiko dan tanggung jawab Anda sendiri.
      </p>
      <p>
        Dengan menggunakan Situs, Anda membebaskan Simfoni Evav dari segala
        klaim, kerugian, atau kerusakan yang timbul secara langsung maupun tidak
        langsung akibat:
      </p>
      <ul>
        <li>Ketergantungan pada informasi dalam Situs.</li>
        <li>Akses atau penggunaan layanan pihak ketiga.</li>
        <li>Gangguan teknis, kesalahan, atau ketidaktersediaan Situs.</li>
      </ul>
      <p>
        Beberapa konten (termasuk foto representatif dari sumber pihak ketiga)
        bersifat ilustratif dan mungkin tidak sepenuhnya merepresentasikan
        kondisi objek asli.
      </p>

      <h2>7. Pengakhiran Akses</h2>
      <p>
        Simfoni Evav berhak, atas kebijakan kami, untuk menghentikan atau
        membatasi akses Anda terhadap Situs, baik sebagian maupun seluruhnya,
        tanpa pemberitahuan terlebih dahulu, apabila terdapat dugaan pelanggaran
        Syarat &amp; Ketentuan ini atau penyalahgunaan Situs.
      </p>
      <p>
        <strong>Bagian Area Terbatas:</strong> Situs memiliki{" "}
        <strong>panel admin</strong> (<code>/admin</code>) yang merupakan area
        internal khusus bagi pengelola untuk mengelola konten (destinasi, berita,
        UMKM, media, pengaturan). Area tersebut <strong>bukan</strong> untuk
        Pengguna umum dan tidak tersedia bagi publik. Akses tanpa otorisasi ke
        area terbatas dilarang.
      </p>

      <h2>8. Hukum yang Berlaku</h2>
      <p>
        Syarat &amp; Ketentuan ini diatur dan ditafsirkan berdasarkan{" "}
        <strong>Hukum Negara Republik Indonesia</strong>. Segala sengketa yang
        timbul dari penggunaan Situs akan diselesaikan secara musyawarah untuk
        mufakat, dan apabila diperlukan, melalui jalur hukum di wilayah yurisdiksi{" "}
        <strong>Maluku Tenggara</strong> atau Indonesia sesuai dengan ketentuan
        perundang-undangan yang berlaku.
      </p>

      <h2>9. Perubahan Syarat</h2>
      <p>
        Simfoni Evav dapat memperbarui, mengubah, atau menghentikan sebagian
        maupun seluruh Syarat &amp; Ketentuan ini dari waktu ke waktu tanpa
        pemberitahuan terpisah. Versi terbaru akan dicantumkan dalam halaman ini
        dengan pembaruan tanggal berlaku. Dengan tetap menggunakan Situs setelah
        perubahan dilakukan, Anda dianggap menyetujui Syarat &amp; Ketentuan yang
        telah diperbarui.
      </p>

      <h2>10. Kontak</h2>
      <p>
        Pertanyaan, saran, atau permohonan terkait Syarat &amp; Ketentuan ini
        dapat disampaikan melalui surel resmi:
      </p>
      <p>
        <a href="mailto:hukum@discoverevav.id">hukum@discoverevav.id</a>
      </p>
    </LegalLayout>
  );
}
