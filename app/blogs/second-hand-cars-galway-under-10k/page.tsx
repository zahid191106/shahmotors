import type { Metadata } from 'next';
import ClientPage from './page.client'; // Import the client-only page component

// Render the interactive client page from a client-only file.
// This keeps `metadata` on the server while the UI stays interactive.
// const ClientPage = dynamic(() => import('./page.client.tsx'), { ssr: false });

// Metadata Block for Next.js App Router (blog routing configuration)
export const budgetCarUnder10kMetadata: Metadata = {
  title: 'Reliable Used Cars Under €10,000 Galway | Second Hand Guide',
  description: 'Looking for a reliable second-hand car in Galway under €10,000? Read our ultimate guide to finding cheap, reliable cars, physical check lists, and low-tax models.',
  keywords: [
    'used cars galway under 10000',
    'second hand cars galway',
    'cheap cars ireland',
    'reliable used cars galway',
    'cars for sale galway under 10k',
    'toyota aqua galway',
    'nct preparation galway',
    'first car young drivers ireland'
  ],
  alternates: {
    canonical: 'https://www.shahmotors.ie/blogs/second-hand-cars-galway-under-10k',
  },
  openGraph: {
    title: 'How to Find a Reliable Second-Hand Car in Galway Under €10,000',
    description: 'On a strict budget but need a dependable ride? We highlight the best value-for-money used cars currently hitting the market in Galway that won\'t break the bank.',
    url: 'https://www.shahmotors.ie/blogs/second-hand-cars-galway-under-10k',
    siteName: 'ShahMotors Galway',
    images: [
      {
        url: 'https://www.shahmotors.ie/images/blogs/blog-7.webp',
        width: 1200,
        height: 630,
        alt: 'Affordable reliable used cars under 10000 euro in Galway',
      },
    ],
    locale: 'en_IE',
    type: 'article',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'How to Find a Reliable Second-Hand Car in Galway Under €10,000',
    description: 'Avoid private sale scams. Learn what mechanical flaws to look for and calculate your real driving cost budgets on a sub-€10k used car.',
    images: ['https://www.shahmotors.ie/images/blogs/blog-7.webp'],
  },
};

export default function Page() {
  return <ClientPage />;
}