import type { Metadata } from 'next';
import ClientPage from './page.client'; // Import the client-only page component

// Render the interactive client page from a client-only file.
// This keeps `metadata` on the server while the UI stays interactive.
// const ClientPage = dynamic(() => import('./page.client.tsx'), { ssr: false });

export const metadata: Metadata = {
  title: 'Best Used Commuter Cars Galway to Dublin M6 | ShahMotors',
  description: 'Commuting from Galway to Dublin? Discover the most fuel-efficient, reliable, and comfortable used saloons, hybrids, and hatchbacks for the M6 motorway.',
  keywords: [
    'best commuter cars ireland', 'used cars galway', 'used cars dublin', 'toyota prius ireland', 
    'skoda octavia used ireland', 'vw passat used', 'fuel efficient cars ireland', 
    'm6 motorway commuter', 'hybrid cars galway', 'diesel vs hybrid ireland', 
    'automatic commuter cars', 'shahmotors'
  ],
  alternates: { canonical: 'https://www.shahmotors.ie/blog/best-commuter-cars-galway' },
  openGraph: {
    title: 'Best Used Commuter Cars Galway to Dublin M6 | ShahMotors',
    description: 'Commuting from Galway to Dublin? Discover the most fuel-efficient, reliable, and comfortable used saloons, hybrids, and hatchbacks for the M6 motorway.',
    type: 'article',
    locale: 'en_IE',
    images: ['/logo-car.png'],
  },
};

export default function Page() {
  return <ClientPage />;
}