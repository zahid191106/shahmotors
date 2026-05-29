import { MetadataRoute } from 'next';

// Use the native Next.js Metadata configuration for cleaner compilation
export default function robots(): MetadataRoute.Robots {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://www.shahmotors.ie';

  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: '/studio',
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}