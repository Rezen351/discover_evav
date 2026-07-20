// Sumber terpusat semua tautan media sosial & kontak resmi Discover Evav.
// Ubah URL di satu file ini agar seluruh situs ikut diperbarui (GRAND_DESIGN §4.10).

export type SocialPlatform =
  | "instagram"
  | "tiktok"
  | "youtube"
  | "facebook"
  | "whatsapp";

export interface SocialLink {
  platform: SocialPlatform;
  label: string;
  href: string;
}

// Handles resmi (ganti di sini bila berubah).
export const SOCIAL_HANDLES = {
  instagram: "evav.id",
  tiktok: "@evav.id",
  youtube: "@evav.id",
  facebook: "discoverevav",
  whatsapp: "6282112345678",
} as const;

export const INSTAGRAM_URL = "#";
export const TIKTOK_URL = "#";
export const YOUTUBE_URL = "#";
export const FACEBOOK_URL = "#";
export const WHATSAPP_URL = "#";

// Daftar tautan sosial untuk dirender sebagai ikon (SocialIcon).
export const SOCIAL_LINKS: SocialLink[] = [
  { platform: "instagram", label: "Discover Evav di Instagram", href: INSTAGRAM_URL },
  { platform: "tiktok", label: "Discover Evav di TikTok", href: TIKTOK_URL },
  { platform: "youtube", label: "Discover Evav di YouTube", href: YOUTUBE_URL },
  { platform: "whatsapp", label: "Discover Evav di WhatsApp", href: WHATSAPP_URL },
];

// Kontak resmi.
export const CONTACT_EMAIL = "keluarga@evav.id";
export const EMAIL_URL = `mailto:${CONTACT_EMAIL}`;

// Daftar channel untuk dinding sosial (SocialMosaicSection) — handles berbeda
// dari tautan footer, namun tetap dikelola dari satu file ini.
export const SOCIAL_MOSAIC_CHANNELS: SocialLink[] = [
  { platform: "instagram", label: "Instagram", href: "#" },
  { platform: "tiktok", label: "TikTok", href: "#" },
  { platform: "youtube", label: "YouTube", href: "#" },
  { platform: "facebook", label: "Facebook", href: "#" },
];
