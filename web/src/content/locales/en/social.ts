// Centralized source of all Discover Evav social media links & official contacts.
// Change URLs in this single file so the whole site updates (GRAND_DESIGN §4.10).

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

// Official handles (change here if they change).
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

// List of social links to render as icons (SocialIcon).
export const SOCIAL_LINKS: SocialLink[] = [
  { platform: "instagram", label: "Discover Evav on Instagram", href: INSTAGRAM_URL },
  { platform: "tiktok", label: "Discover Evav on TikTok", href: TIKTOK_URL },
  { platform: "youtube", label: "Discover Evav on YouTube", href: YOUTUBE_URL },
  { platform: "whatsapp", label: "Discover Evav on WhatsApp", href: WHATSAPP_URL },
];

// Official contact.
export const CONTACT_EMAIL = "keluarga@evav.id";
export const EMAIL_URL = `mailto:${CONTACT_EMAIL}`;

// Channel list for the social wall (SocialMosaicSection) — handles differ
// from the footer links, but still managed from this single file.
export const SOCIAL_MOSAIC_CHANNELS: SocialLink[] = [
  { platform: "instagram", label: "Instagram", href: "#" },
  { platform: "tiktok", label: "TikTok", href: "#" },
  { platform: "youtube", label: "YouTube", href: "#" },
  { platform: "facebook", label: "Facebook", href: "#" },
];
