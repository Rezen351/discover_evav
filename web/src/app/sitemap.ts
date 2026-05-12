import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: 'https://discoverevav.id',
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    },
    // Nanti Anda bisa menambahkan halaman lain di sini seperti /sejarah, /budaya, dll.
  ];
}
