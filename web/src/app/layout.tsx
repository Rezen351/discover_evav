import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Simfoni Evav: Peradaban di Atas Pasir Putih",
  description: "Jelajahi keindahan, sejarah, dan kebudayaan Kepulauan Kei melalui Simfoni Evav. Temukan pesona peradaban yang berdiri megah di atas hamparan pasir putih yang memukau.",
  keywords: ["Kepulauan Kei", "Evav", "Pasir Putih", "Maluku Tenggara", "Pariwisata", "Budaya Kei", "Simfoni Evav"],
  authors: [{ name: "Simfoni Evav Team" }],
  openGraph: {
    title: "Simfoni Evav: Peradaban di Atas Pasir Putih",
    description: "Pesona peradaban yang berdiri megah di atas hamparan pasir putih Kepulauan Kei.",
    url: "https://discoverevav.id",
    siteName: "Discover Evav",
    locale: "id_ID",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col" suppressHydrationWarning>{children}</body>
    </html>
  );
}
