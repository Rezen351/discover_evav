import type { Metadata } from "next";
import LegalLayout from "@/components/legal/LegalLayout";

export const metadata: Metadata = {
  title: "Kebijakan Privasi",
  description:
    "Kebijakan Privasi Simfoni Evav — bagaimana kami memperlakukan data Anda saat menjelajahi situs pariwisata Kepulauan Kei.",
  keywords: [
    "Kebijakan Privasi",
    "Privasi Simfoni Evav",
    "Perlindungan Data",
    "UU PDP",
    "GDPR",
    "Discover Evav",
  ],
  alternates: {
    canonical: "/kebijakan-privasi",
  },
  openGraph: {
    title: "Kebijakan Privasi | Simfoni Evav",
    description:
      "Bagaimana Simfoni Evav memperlakukan data Anda: formulir sukarela, log server, peta interaktif, dan preferensi bahasa lokal.",
    url: "/kebijakan-privasi",
    siteName: "Simfoni Evav",
    locale: "id_ID",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Kebijakan Privasi | Simfoni Evav",
    description:
      "Bagaimana Simfoni Evav memperlakukan data Anda saat menjelajahi Kepulauan Kei.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

const privacyPolicyJsonLd = {
  "@context": "https://schema.org",
  "@type": "PrivacyPolicy",
  name: "Kebijakan Privasi Simfoni Evav",
  description:
    "Kebijakan Privasi Simfoni Evav — bagaimana kami memperlakukan data Anda saat menjelajahi situs pariwisata Kepulauan Kei.",
  url: "https://discoverevav.id/kebijakan-privasi",
  inLanguage: "id-ID",
  dateModified: "2026-07-19",
  publisher: {
    "@type": "Organization",
    name: "Tim Simfoni Evav",
    url: "https://discoverevav.id",
  },
};

export default function PrivacyPolicyPage() {
  return (
    <LegalLayout
      title="Kebijakan Privasi"
      subtitle="Simfoni Evav adalah situs promosi pariwisata budaya dan alam Kepulauan Kei (Evav), Maluku Tenggara, Indonesia. Dokumen ini menjelaskan bagaimana kami memperlakukan informasi yang berkaitan dengan Anda."
      lastUpdated="19 Juli 2026"
    >
      <h2>1. Pendahuluan</h2>
      <p>
        Selamat datang di <strong>Simfoni Evav</strong> (selanjutnya disebut
        &ldquo;Situs&rdquo;, &ldquo;kami&rdquo;, &ldquo;kita&rdquo;), situs
        promosi pariwisata budaya dan alam Kepulauan Kei (Evav), Maluku
        Tenggara, Indonesia. Situs ini diakses melalui{" "}
        <a href="https://discoverevav.id" rel="noopener noreferrer">
          https://discoverevav.id
        </a> dan
        dikelola oleh Tim Simfoni Evav.
      </p>
      <p>
        Kebijakan Privasi ini menjelaskan bagaimana kami memperlakukan informasi
        yang berkaitan dengan Anda (&ldquo;Pengguna&rdquo;, &ldquo;Anda&rdquo;)
        saat Anda mengunjungi dan berinteraksi dengan Situs. Kami berkomitmen
        untuk menghormati privasi Anda dan hanya memproses data sebatas yang
        diperlukan untuk menyajikan pengalaman menjelajah Kepulauan Kei yang
        informatif dan nyaman.
      </p>
      <p>
        Situs ini merupakan situs promosi publik. <strong>Situs ini tidak
        memiliki sistem akun pengguna, login, maupun pendaftaran member.</strong>{" "}
        Anda dapat menikmati seluruh konten tanpa harus memberikan identitas apa
        pun.
      </p>

      <h2>2. Informasi yang Kami Kumpulkan</h2>
      <p>
        Kami membagi informasi menjadi tiga kategori berdasarkan cara
        pengumpulannya.
      </p>

      <h3>2.1. Informasi yang Anda Berikan secara Sukarela (melalui Formulir)</h3>
      <p>
        Situs menyediakan satu formulir interaktif, yaitu{" "}
        <strong>Formulir Keterhubungan</strong> (pada halaman Interaksi), yang
        menampung kolom berikut:
      </p>
      <ul>
        <li>
          <strong>Nama panggilan</strong> — nama yang Anda isikan secara sukarela
          untuk sapaan.
        </li>
        <li>
          <strong>Alamat email</strong> — alamat yang dapat kami gunakan untuk
          membalas sapaan Anda.
        </li>
        <li>
          <strong>Pesan</strong> — isi pesan, pertanyaan, saran, atau niat
          kolaborasi yang Anda tulis.
        </li>
        <li>
          <strong>Topik sapaan</strong> — pilihan kategori (Pertanyaan Umum,
          Kerja Sama &amp; Partnership, Saran &amp; Masukan, Laporan Masalah,
          atau Lainnya) yang Anda pilih sebagai pelabelan pesan.
        </li>
      </ul>
      <p>
        Pengisian formulir ini sepenuhnya sukarela. Tidak ada kolom yang wajib
        diisi untuk sekadar menjelajahi Situs.
      </p>
      <blockquote>
        <strong>Catatan teknis penting:</strong> Pada versi Situs saat ini,
        formulir Keterhubungan <strong>hanya berjalan di sisi peramban (browser)
        dan belum terhubung ke server atau layanan pengiriman pesan</strong>.
        Saat ini pesan yang Anda kirimkan hanya dikonfirmasi secara lokal di
        layar (&ldquo;Terima kasih! Sampai jumpa di Kei&rdquo;) dan{" "}
        <strong>tidak dikirimkan, disimpan, atau diteruskan</strong> ke
        penyelenggara situs. Oleh karena itu, pada kondisi ini kami{" "}
        <strong>tidak mengumpulkan atau menyimpan</strong> data formulir
        tersebut ke sistem kami. Apabila di kemudian waktu fitur pengiriman
        aktif, kami akan memperbarui kebijakan ini dan memberitahu Anda.
      </blockquote>
      <p>
        Selain formulir di atas, halaman <strong>Hubungi Kami</strong> hanya
        menyediakan tautan langsung ke saluran komunikasi eksternal (email{" "}
        <a href="mailto:keluarga@evav.id" aria-label="Kirim email ke keluarga@evav.id">
          keluarga@evav.id
        </a> dan WhatsApp +62
        821-1234-5678). Jika Anda menghubungi kami lewat saluran tersebut, data
        yang Anda berikan menjadi berada di bawah kendali penyedia layanan
        masing-masing (penyedia email/WhatsApp), bukan di dalam Situs ini.
      </p>

      <h3>2.2. Data Otomatis (Log Server &amp; Protokol Standar)</h3>
      <p>
        Seperti situs web pada umumnya, penyedia hosting kami (Vercel) secara
        otomatis mencatat informasi teknis standar setiap kali Situs diakses,
        yang dapat mencakup:
      </p>
      <ul>
        <li>Alamat IP (Internet Protocol) perangkat Anda.</li>
        <li>Jenis dan versi peramban (user agent) serta sistem operasi.</li>
        <li>Halaman yang dikunjungi, waktu akses, dan merujuk (referrer).</li>
        <li>Data kinerja dan keandalan teknis (mis. log kesalahan).</li>
      </ul>
      <p>
        Data ini bersifat agregat dan digunakan semata-mata untuk keperluan
        operasional, keamanan, dan pemeliharaan teknis Situs.
      </p>

      <h3>2.3. Data Lokasi (Peta Interaktif)</h3>
      <p>
        Situs menyajikan <strong>Peta Penjelajahan Kei</strong> (Journey Map)
        menggunakan pustaka peta MapLibre GL yang memuat peta dasar (basemap)
        dari Carto CDN. Peta ini{" "}
        <strong>tidak meminta, tidak mengambil, dan tidak melacak lokasi
        geografis perangkat Anda</strong> (tidak ada permintaan izin GPS/lokasi).
        Satu-satunya koordinat yang digunakan adalah titik-titik wisata tetap
        (presisi destinasi seperti Pantai Ngurbloat, Goa Hawang, dll.) yang sudah
        ditentukan sebelumnya sebagai bagian dari konten promosi.
      </p>

      <h3>2.4. Preferensi Lokal (Local Storage)</h3>
      <p>
        Untuk kenyamanan penjelajahan, Situs menyimpan preferensi{" "}
        <strong>bahasa tampilan</strong> (Indonesia atau Inggris) pada
        penyimpanan lokal peramban Anda (<code>localStorage</code>) dengan kunci{" "}
        <code>lang</code>. Data ini <strong>tidak dikirimkan ke server mana
        pun</strong> dan hanya berfungsi di perangkat Anda sendiri.
      </p>

      <h2>3. Cara Penggunaan Informasi</h2>
      <p>Informasi yang kami kelola digunakan untuk tujuan berikut:</p>
      <ul>
        <li>
          <strong>Menyajikan konten pariwisata</strong> budaya dan alam
          Kepulauan Kei secara informatif dan menarik.
        </li>
        <li>
          <strong>Memelihara dan mengamankan Situs</strong>, termasuk memantau
          kinerja teknis, mendeteksi gangguan, serta mencegah penyalahgunaan.
        </li>
        <li>
          <strong>Menyediakan fitur interaktif</strong>, seperti peta destinasi
          dan pengaturan preferensi bahasa, agar pengalaman menjelajah lebih
          personal.
        </li>
        <li>
          <strong>Menjawab sapaan atau pertanyaan</strong> Anda, khususnya jika
          fitur pengiriman formulir telah diaktifkan di masa depan atau jika Anda
          menghubungi kami lewat saluran kontak langsung.
        </li>
      </ul>
      <p>
        Kami <strong>tidak</strong> menggunakan informasi Anda untuk pemasaran
        otomatis, penargetan iklan (advertising), atau pengambilan keputusan
        otomatis (automated decision-making) yang berdampak hukum bagi Anda.
      </p>

      <h2>4. Berbagi Informasi dengan Pihak Ketiga</h2>
      <p>
        Kami berusaha meminimalkan berbagi data dengan pihak lain. Berikut pihak
        ketiga yang terlibat dalam pengoperasian Situs:
      </p>
      <ul>
        <li>
          <strong>Penyedia Hosting &amp; Infrastruktur (Vercel):</strong> Situs
          dihosting dan dilayani melalui platform Vercel. Vercel memproses data
          teknis standar (lihat §2.2) sebagai bagian dari penyediaan layanan
          hosting.
        </li>
        <li>
          <strong>Penyedia Peta (Carto / MapLibre GL):</strong> Peta dasar
          dimuat dari Carto CDN (<code>basemaps.cartocdn.com</code>). Penggunaan
          peta tidak mengirimkan data pribadi Anda; hanya permintaan berkas peta
          (tile) yang dikirimkan ke Carto saat peta ditampilkan. Tidak ada token
          API atau kredensial yang diekspos ke peramban.
        </li>
        <li>
          <strong>Platform Media Sosial:</strong> Situs menampilkan tautan ke
          akun resmi kami di Instagram, TikTok, YouTube, Facebook, dan WhatsApp.
          Mengklik tautan tersebut akan membawa Anda keluar dari Situs menuju
          platform tersebut, yang memiliki kebijakan privasi sendiri. Kami tidak
          membagikan data pribadi Anda kepada platform media sosial tersebut.
        </li>
      </ul>
      <p>
        <strong>Layanan Analitik Pihak Ketiga:</strong> Situs ini{" "}
        <strong>tidak menggunakan layanan analitik pihak ketiga</strong> apa pun
        (seperti Google Analytics, Google Tag Manager, Meta Pixel, Plausible,
        Hotjar, Mixpanel, atau sejenisnya). Kami tidak memasang pelacak
        (tracker), piksel, atau skrip pengintaian perilaku pengguna. Kami juga{" "}
        <strong>tidak menggunakan cookie pelacakan</strong> (lihat §7).
      </p>
      <p>
        Kami <strong>tidak akan</strong> menjual, menyewakan, atau memperdagangkan
        data pribadi Anda kepada pihak manapun. Kami hanya dapat mengungkapkan
        informasi jika diwajibkan oleh hukum yang berlaku atau untuk melindungi
        hak, properti, dan keselamatan Tim Simfoni Evav serta pengguna lain.
      </p>

      <h2>5. Penyimpanan &amp; Keamanan Data</h2>
      <ul>
        <li>
          <strong>Formulir Keterhubungan:</strong> Seperti dijelaskan pada §2.1,
          data formulir saat ini tidak dikirimkan atau disimpan ke sistem kami,
          sehingga tidak ada penyimpanan data pribadi dari formulir tersebut.
        </li>
        <li>
          <strong>Data log &amp; teknis:</strong> Disimpan dan dikelola oleh
          penyedia hosting (Vercel) sesuai praktik keamanan standar industri.
        </li>
        <li>
          <strong>Preferensi bahasa:</strong> Disimpan langsung di perangkat Anda
          (<code>localStorage</code>) dan tidak ditransmisikan keluar.
        </li>
      </ul>
      <p>
        Kami menerapkan langkah-langkah teknis yang wajar untuk melindungi Situs
        dari akses tidak sah, kehilangan, atau penyalahgunaan data. Namun, perlu
        diingat bahwa tidak ada transmisi data melalui internet yang sepenuhnya
        kebal risiko. Kami mengimbau Anda untuk tidak mengirimkan informasi yang
        sangat sensitif melalui saluran yang tidak terenkripsi.
      </p>

      <h2>6. Retensi Data</h2>
      <ul>
        <li>
          <strong>Data teknis/log:</strong> Disimpan selama periode yang
          diperlukan untuk operasional dan pemecahan masalah teknis, sesuai
          kebijakan penyedia hosting.
        </li>
        <li>
          <strong>Preferensi bahasa:</strong> Tetap tersimpan di peramban Anda
          hingga Anda menghapus data situs (cache/storage) secara manual.
        </li>
        <li>
          <strong>Formulir &amp; pesan:</strong> Karena belum disimpan ke sistem
          (lihat §2.1), tidak ada retensi data formulir yang berlaku saat ini.
        </li>
        <li>
          <strong>Komunikasi langsung:</strong> Jika Anda menghubungi kami lewat
          email atau WhatsApp, retensi pesan tunduk pada kebijakan layanan
          masing-masing penyedia serta kebutuhan balasan kami.
        </li>
      </ul>

      <h2>7. Cookie &amp; Teknologi Pelacakan</h2>
      <p>
        Situs ini <strong>tidak menggunakan cookie pelacakan atau teknologi
        pelacakan pihak ketiga</strong>. Situs ini juga{" "}
        <strong>tidak menggunakan alat analitik</strong> sebagaimana dijelaskan
        pada §4.
      </p>
      <p>
        Satu-satunya penyimpanan sisi klien yang kami gunakan adalah{" "}
        <code>localStorage</code> untuk preferensi bahasa (lihat §2.4), yang
        bukan merupakan cookie dan tidak melacak aktivitas Anda. Anda dapat
        menghapus data ini kapan saja melalui pengaturan &ldquo;hapus data
        situs&rdquo; di peramban Anda tanpa memengaruhi fungsi inti Situs.
      </p>

      <h2>8. Hak Pengguna</h2>
      <p>
        Sesuai dengan <strong>Undang-Undang Pelindungan Data Pribadi (UU PDP)
        Republik Indonesia</strong> serta prinsip{" "}
        <strong>Peraturan Perlindungan Data Umum (GDPR)</strong> Uni Eropa bagi
        pengguna yang berhak, Anda memiliki hak-hak berikut atas data pribadi
        Anda:
      </p>
      <ul>
        <li>
          <strong>Hak akses</strong> — mengetahui data pribadi apa yang kami
          miliki tentang Anda.
        </li>
        <li>
          <strong>Hak koreksi</strong> — meminta perbaikan atas data yang tidak
          akurat atau tidak lengkap.
        </li>
        <li>
          <strong>Hak penghapusan</strong> — meminta penghapusan data pribadi
          Anda (hak untuk dilupakan), sejauh diizinkan hukum.
        </li>
        <li>
          <strong>Hak penarikan persetujuan</strong> — menarik kembali
          persetujuan Anda kapan saja, tanpa mengurangi keabsahan pemrosesan yang
          dilakukan sebelumnya.
        </li>
        <li>
          <strong>Hak untuk tidak diprofilkan</strong> — menolak pemrosesan untuk
          tujuan pemasaran otomatis (yang saat ini tidak kami lakukan).
        </li>
      </ul>
      <p>
        Karena Situs pada saat ini tidak menyimpan data pribadi dari formulir
        (lihat §2.1), sebagian besar hak di atas berlaku terutama terhadap
        komunikasi langsung yang Anda lakukan dengan kami. Untuk menggunakan hak
        Anda, silakan hubungi kami melalui{" "}
        <a href="mailto:privasi@discoverevav.id" aria-label="Kirim email ke privasi@discoverevav.id">
          privasi@discoverevav.id
        </a>.
        Kami akan merespons permintaan Anda dalam waktu yang wajar sesuai
        ketentuan hukum yang berlaku.
      </p>

      <h2>9. Perubahan Kebijakan</h2>
      <p>
        Kami dapat memperbarui Kebijakan Privasi ini dari waktu ke waktu seiring
        perkembangan fitur Situs (misalnya jika fitur pengiriman formulir
        diaktifkan atau layanan pihak ketiga baru ditambahkan). Setiap perubahan
        akan diumumkan melalui pembaruan tanggal &ldquo;Berlaku sejak&rdquo; di
        bagian atas dokumen ini. Apabila terdapat perubahan material yang
        memengaruhi cara kami memproses data Anda, kami akan berupaya memberikan
        pemberitahuan yang wajar melalui Situs.
      </p>
      <p>
        Kami menganjurkan Anda untuk secara berkala meninjau halaman ini guna
        memahami bagaimana data Anda dilindungi.
      </p>

      <h2>10. Informasi Kontak</h2>
      <p>
        Jika Anda memiliki pertanyaan, keluhan, atau permintaan terkait privasi
        dan data pribadi, silakan hubungi Pengontrol Data:
      </p>
      <ul>
        <li>
          <strong>Nama:</strong> Tim Simfoni Evav
        </li>
        <li>
          <strong>Situs:</strong>{" "}
          <a href="https://discoverevav.id" rel="noopener noreferrer">
            https://discoverevav.id
          </a>
        </li>
        <li>
          <strong>Email Privasi:</strong>{" "}
          <a href="mailto:privasi@discoverevav.id" aria-label="Kirim email ke privasi@discoverevav.id">
            privasi@discoverevav.id
          </a>
        </li>
        <li>
          <strong>Email Umum:</strong>{" "}
          <a href="mailto:keluarga@evav.id" aria-label="Kirim email ke keluarga@evav.id">
            keluarga@evav.id
          </a>
        </li>
        <li>
          <strong>WhatsApp:</strong> +62 821-1234-5678
        </li>
      </ul>

      <hr />
      <p>
        Dokumen ini disusun khusus untuk situs Simfoni Evav (&ldquo;Discover
        Evav&rdquo;) dan merefleksikan fitur nyata yang tersedia pada Situs per
        19 Juli 2026: formulir Keterhubungan, peta interaktif MapLibre/Carto,
        audio ambient ombak Kei, dan tautan media sosial. Dokumen ini bukan
        nasihat hukum; untuk kepatuhan regulasi tertentu, disarankan berkonsultasi
        dengan ahli hukum.
      </p>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(privacyPolicyJsonLd) }}
      />
    </LegalLayout>
  );
}
