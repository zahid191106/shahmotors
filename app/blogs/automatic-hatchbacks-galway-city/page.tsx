import type { Metadata } from 'next';
import ClientPage from './page.client'; // Import the client-only page component

// Render the interactive client page from a client-only file.
// This keeps `metadata` on the server while the UI stays interactive.
// const ClientPage = dynamic(() => import('./page.client.tsx'), { ssr: false });

// Metadata Block for Next.js App Router (blog routing configuration)
export const metadata: Metadata = {
  title: 'Used Automatic Hatchbacks Galway | Best Commuter Cars Ireland',
  description: 'Tired of manual gearboxes on Newcastle roads? Discover the best used automatic hatchbacks in Galway. Read our fuel economy, JDM CVT reliability, and insurance security guide.',
  keywords: [
    'used automatic hatchbacks galway',
    'best automatic cars ireland',
    'toyota aqua galway',
    'honda fit hybrid ireland',
    'japanese import automatics galway',
    'used cars galway',
    'automatic hatchbacks under 10000',
    'stop start traffic commute galway'
  ],
  alternates: {
    canonical: 'https://www.shahmotors.ie/blogs/automatic-hatchbacks-galway-city',
  },
  openGraph: {
    title: 'Navigating the Galway City Commute: Best Used Automatic Hatchbacks',
    description: 'Banish clutch fatigue past the Tuam Road and Salthill. Compare the top 5 most reliable, fuel-efficient used automatic hatchbacks perfect for Galway roads.',
    url: 'https://www.shahmotors.ie/blogs/automatic-hatchbacks-galway-city',
    siteName: 'ShahMotors Galway',
    images: [
      {
        url: 'https://www.shahmotors.ie/images/blogs/blog-8.webp',
        width: 1200,
        height: 630,
        alt: 'Premium pre-owned automatic hatchbacks at ShahMotors Galway showroom',
      },
    ],
    locale: 'en_IE',
    type: 'article',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Best Used Automatic Hatchbacks for Galway Commuters',
    description: 'Calculate your stop-start fuel savings and explore the top-rated CVT and torque-converter automatic imports.',
    images: ['https://www.shahmotors.ie/images/blogs/blog-8.webp'],
  },
};

export default function Page() {
  return <ClientPage />;
}