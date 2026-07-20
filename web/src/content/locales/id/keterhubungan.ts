// Data terpusat FAQ halaman /interaction (Section #6 — Tanya Jawab).
// Konten dipindahkan ke sini mengikuti pola sentralisasi konten (lih. taste.ts,
// budaya.ts, eksplorasi.ts). FAQ memakai nada Ain Ni Ain: hangat, aktif, spesifik
// (GRAND_DESIGN §8.6 Microcopy Voice Guide).
// Semua teks UI berbahasa Indonesia; kosakata Kei (Ngurbloat, Larvul Ngabal,
// Evav) sebagai aksen autentik (GRAND_DESIGN §16).
//
// ⚠️ Validasi fakta lokal & kosakata Kei dengan informan lokal Kei sebelum production.

export type FaqItem = {
  question: string;
  answer: string;
};

export const faqItems: FaqItem[] = [
  {
    question: "Kapan waktu terbaik berkunjung ke Kei?",
    answer:
      "Oktober hingga Maret, saat langit cerah dan laut tenang — waktu sempurna snorkeling di Ngurbloat dan merasakan pasir yang tak pernah panas di telapak kaki.",
  },
  {
    question: "Apakah aman untuk backpacker solo?",
    answer:
      "Sangat. Orang Kei ramah dan gotong-royong (Larvul Ngabal). Tetap bijak menjaga barang dan menghormati adat.",
  },
  {
    question: "Bisakah saya berkontribusi ke komunitas?",
    answer:
      "Tentu. Lewat form di atas atau gabung komunitas kami — setiap tangan yang peduli membantu Kei tetap lestari.",
  },
  {
    question: "Apakah ada panduan perjalanan untuk pertama kali ke Kei?",
    answer:
      "Ada. Tim keluarga Evav siap menyusun ritme perjalananmu — dari pasir Ngurbloat hingga desa adat — sesuka langkahmu sendiri.",
  },
  {
    question: "Bagaimana jika saya tersesat atau butuh bantuan saat di sana?",
    answer:
      "Kau tak pernah benar-benar tersesat di Kei. Hubungi kami kapan saja; kami yang akan menuntunmu kembali seperti menyambut saudara.",
  },
];
