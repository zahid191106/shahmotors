import type { Metadata } from 'next';
import dynamic from 'next/dynamic';
import ClientPage from './page.client'; // Import the client-only page component

// Render the interactive client page from a client-only file.
// This keeps `metadata` on the server while the UI stays interactive.
// const ClientPage = dynamic(() => import('./page.client.tsx'), { ssr: false });

export const metadata: Metadata = {
  title: 'Japanese Import Cars Ireland | Used Cars Galway & Dublin',
  description: 'Looking for premium Japanese used cars in Ireland? ShahMotors is a trusted car dealership in Galway supplying Grade 4+ Toyota Aqua, Prius, & automatic cars.',
  keywords: [
    'Toyota', 'toyota aqua', 'toyota used cars', 'toyota prius', 
    'japanese cars', 'automatic cars', 'toyota for sale', 
    'japanese import cars', 'japanese used cars dealer', 
    'japanese cars importer galway', 'used cars galway', 'used cars dublin', 'irish car dealership', 'shahmotors'
  ],
  alternates: { canonical: 'https://www.shahmotors.ie/blog/japanese-import-cars' },
  openGraph: {
    title: 'Japanese Import Cars Ireland | Used Cars Galway & Dublin',
    description: 'Looking for premium Japanese used cars in Ireland? ShahMotors is a trusted car dealership in Galway supplying Grade 4+ Toyota Aqua, Prius, & automatic cars.',
    type: 'article',
    locale: 'en_IE',
    images: ['/logo-car.png'],
  },
};

export default function Page() {
  return <ClientPage />;
}