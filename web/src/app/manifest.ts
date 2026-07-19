import { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Simfoni Evav — Discover Evav',
    short_name: 'Simfoni Evav',
    description: 'Peradaban di Atas Pasir Putih — Kepulauan Kei, Maluku Tenggara',
    start_url: '/',
    display: 'standalone',
    background_color: '#ffffff',
    theme_color: '#0b1020',
    icons: [
      {
        src: '/icon.svg',
        sizes: 'any',
        type: 'image/svg+xml',
      },
    ],
  };
}
