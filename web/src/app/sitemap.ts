import { MetadataRoute } from 'next';
import { news } from '@/content/news';

const SITE_URL = 'https://discoverevav.id';

export default function sitemap(): MetadataRoute.Sitemap {
  const routes: Array<{
    path: string;
    changeFrequency: MetadataRoute.Sitemap[number]['changeFrequency'];
    priority: number;
  }> = [
    { path: '/', changeFrequency: 'weekly', priority: 1.0 },
    { path: '/eksplorasi', changeFrequency: 'weekly', priority: 0.9 },
    { path: '/culture', changeFrequency: 'weekly', priority: 0.9 },
    { path: '/heritage', changeFrequency: 'monthly', priority: 0.9 },
    { path: '/taste', changeFrequency: 'monthly', priority: 0.8 },
    { path: '/interaction', changeFrequency: 'monthly', priority: 0.7 },
    { path: '/news', changeFrequency: 'weekly', priority: 0.8 },
  ];

  const newsRoutes = news.map((n) => ({
    path: `/news/${n.slug}`,
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));

  return [...routes, ...newsRoutes].map(({ path, changeFrequency, priority }) => ({
    url: `${SITE_URL}${path}`,
    lastModified: new Date(),
    changeFrequency,
    priority,
  }));
}
