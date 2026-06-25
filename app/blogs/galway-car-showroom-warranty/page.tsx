import type { Metadata } from 'next';
import ClientPage from './page.client'; // Import the client-only page component

// Render the interactive client page from a client-only file.
// This keeps `metadata` on the server while the UI stays interactive.
// const ClientPage = dynamic(() => import('./page.client.tsx'), { ssr: false });

export const metadata: Metadata = {
  title: 'Galway Used Cars: Showroom Warranty vs Private Cash Sales | ShahMotors',
  description: 'Buying a used car in Galway? Compare the legal protections of a SIMI showroom warranty under the Consumer Rights Act 2022 vs buying privately on DoneDeal.',
  keywords: [
    'used cars galway', 'car warranty ireland', 'buying car privately done deal', 
    'consumer rights act 2022 ireland', 'simi car dealers galway', 'private vs dealer car sales', 
    'second hand cars galway', 'car finance galway', 'reliable used cars ireland', 
    'disguised car traders ireland', 'cartell check ireland', 'shahmotors'
  ],
  alternates: { canonical: 'https://www.shahmotors.ie/blogs/galway-car-showroom-warranty' },
  openGraph: {
    title: 'Galway Used Cars: Showroom Warranty vs Private Cash Sales | ShahMotors',
    description: 'Buying a used car in Galway? Compare the legal protections of a SIMI showroom warranty under the Consumer Rights Act 2022 vs buying privately on DoneDeal.',
    type: 'article',
    locale: 'en_IE',
    images: ['/images/blogs/blog-5.webp'],
  },
};

export default function Page() {
  return <ClientPage />;
}