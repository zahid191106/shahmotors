import { client } from '@/lib/sanity.client';
import { CAR_SLUGS_QUERY } from '@/lib/sanity.queries';

// CRITICAL SEO FIX: Force 'www' to match your production site canonical domain
const baseUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://www.shahmotors.ie';

export const dynamic = 'force-static';

// Optional: Tell Next.js how often to revalidate this static file (e.g., once every hour)
export const revalidate = 3600; 

export default async function sitemap() {
  // Ensure your CAR_SLUGS_QUERY fetches both the slug AND the _updatedAt field
  const slugs = await client.fetch(CAR_SLUGS_QUERY);

  const staticPaths = [
    '',
    'about',
    'blogs',
    'blogs/japanese-import-cars',
    'blogs/buying-used-car-galway',
    'blogs/best-commuter-cars-galway',
    'blogs/how-to-buy-car', // further static blog pages if needed
    'cars',
    'contact',
  ];

  // const buildUrl = (path: string) => {
  //   return `${baseUrl}/${path}`.replace(/\/$/, '');
  // };
  const buildUrl = (path: string) => {
    if (!path) return baseUrl; // Keeps it clean as 'https://www.shahmotors.ie' or add trailing slash if desired
    return `${baseUrl}/${path}`.replace(/\/$/, '');
  };

  const routes = staticPaths.map((path) => ({
    url: buildUrl(path),
    lastModified: new Date(), // Static pages can safely use build time
  }));

  const carRoutes = slugs
    .filter((item: any) => item?.slug)
    .map((item: any) => ({
      url: `${baseUrl}/cars/${item.slug}`,
      // SEO OPTIMIZATION: Use real update times from Sanity if available, otherwise fallback
      lastModified: item?._updatedAt ? new Date(item._updatedAt) : new Date(),
    }));

  return [...routes, ...carRoutes];
}