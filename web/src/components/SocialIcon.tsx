import {
  FaInstagram,
  FaTiktok,
  FaYoutube,
  FaFacebookF,
  FaWhatsapp,
} from "react-icons/fa";
import type { IconType } from "react-icons";

// Pemetaan platform ke ikon brand dari library `react-icons` (sudah menjadi
// dependency proyek). Menggantikan ikon generik heroicons yang sebelumnya
// tidak merepresentasikan platform secara akurat (GRAND_DESIGN §17).
const SOCIAL_ICONS: Record<string, IconType> = {
  instagram: FaInstagram,
  tiktok: FaTiktok,
  youtube: FaYoutube,
  facebook: FaFacebookF,
  whatsapp: FaWhatsapp,
};

export type SocialPlatform =
  | "instagram"
  | "tiktok"
  | "youtube"
  | "facebook"
  | "whatsapp";

export default function SocialIcon({
  platform,
  className,
}: {
  platform: SocialPlatform;
  className?: string;
}) {
  const Icon = SOCIAL_ICONS[platform];
  if (!Icon) return null;
  return <Icon className={className} aria-hidden="true" />;
}
