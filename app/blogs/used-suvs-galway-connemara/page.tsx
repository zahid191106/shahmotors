import type { Metadata } from 'next';
import ClientPage from './page.client'; // Import the client-only page component

// Render the interactive client page from a client-only file.
// This keeps `metadata` on the server while the UI stays interactive.
// const ClientPage = dynamic(() => import('./page.client.tsx'), { ssr: false });

// Metadata Block for Next.js App Router (blog routing configuration)
export const metadata = {
  title: 'Top Used SUVs and 4x4s for Connemara Galway Roads | ShahMotors',
  description: 'Looking for a reliable pre-owned SUV or 4x4 for the West of Ireland? Discover the best used models for Connemara’s rugged rural roads, winter storms, and bog terrain.',
  keywords: [
    'used suvs galway', 'best 4x4 cars ireland', 'rural driving cars', 'used four wheel drive ireland', 
    'buy suv galway', 'connemara driving cars', 'family suvs galway', 'toyota land cruiser used', 
    'hyundai tucson galway', 'nissan qashqai awd ireland', 'land rover discovery sport used', 'second hand cars galway'
  ],
  alternates: { canonical: 'https://www.shahmotors.ie/blogs/used-suvs-galway-connemara' },
  openGraph: {
    title: 'Top Used SUVs and 4x4s for Connemara Galway Roads | ShahMotors',
    description: 'Looking for a reliable pre-owned SUV or 4x4 for the West of Ireland? Discover the best used models for Connemara’s rugged rural roads, winter storms, and bog terrain.',
    type: 'article',
    locale: 'en_IE',
    images: ['/images/blogs/blog-6.webp'],
  },
};

export default function Page() {
  return <ClientPage />;
}