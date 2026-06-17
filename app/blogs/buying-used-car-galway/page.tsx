import type { Metadata } from 'next';
import ClientPage from './page.client'; // Import the client-only page component

// Render the interactive client page from a client-only file.
// This keeps `metadata` on the server while the UI stays interactive.
// const ClientPage = dynamic(() => import('./page.client.tsx'), { ssr: false });

export const metadata: Metadata = {
  title: '5 Vital Checks Before Buying a Used Car in Galway | ShahMotors',
  description: 'Buying a second-hand car in Galway? Avoid costly mistakes. Learn about coastal rust checks, history/finance loops, and choosing the right specs for Irish roads.',
  keywords: [
    'used cars galway', 'second hand cars galway', 'car dealership galway', 
    'buying a used car ireland', 'nct checklist ireland', 'car history check', 
    'outstanding finance check car', 'galway car showroom', 'toyota used cars', 
    'automatic cars galway', 'coastal rust inspection', 'shahmotors'
  ],
  alternates: { canonical: 'https://www.shahmotors.ie/blogs/buying-used-car-galway' },
  openGraph: {
    title: '5 Vital Checks Before Buying a Used Car in Galway | ShahMotors',
    description: 'Buying a second-hand car in Galway? Avoid costly mistakes. Learn about coastal rust checks, history/finance loops, and choosing the right specs for Irish roads.',
    type: 'article',
    locale: 'en_IE',
    images: ['/logo-car.png'],
  },
};

export default function Page() {
  return <ClientPage />;
}