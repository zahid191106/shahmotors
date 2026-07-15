import type { Metadata } from 'next';
import ClientPage from './page.client'; 

export const metadata: Metadata = {
  title: "Galway Student's First Used Car Guide | Cheap Insurance Tips",
  description: "Heading to University of Galway or ATU? Discover the ultimate guide to buying a reliable used car in Galway under budget, with cheap insurance and low tax secrets.",
  keywords: [
    'used cars galway',
    'student first car ireland',
    'cheap insurance first car ireland',
    'atu galway used cars',
    'university of galway student car',
    'reliable first cars ireland',
    'automatic cars galway',
    'young driver insurance hacks'
  ],
  alternates: {
    canonical: 'https://www.shahmotors.ie/blogs/student-first-car-guide-galway',
  },
  openGraph: {
    title: "The Galway Student's Guide to Sourcing Your First Used Car",
    description: "Don't get scammed. Learn how to verify vehicle records, locate low-tax engine categories, and navigate Newcastle student parking smoothly.",
    url: 'https://www.shahmotors.ie/blogs/student-first-car-guide-galway',
    siteName: 'ShahMotors Galway',
    images: [
      {
        url: 'https://www.shahmotors.ie/images/blogs/blog-9.webp',
        width: 1200,
        height: 630,
        alt: 'Reliable cheap used cars for university students in Galway',
      },
    ],
    locale: 'en_IE',
    type: 'article',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Galway Student First Car & Cheap Insurance Guide",
    description: "Settle into college with a dependable, low-maintenance ride. Learn how to bypass the DoneDeal cash scams and secure named-driver discounts.",
    images: ['https://www.shahmotors.ie/images/blogs/blog-9.webp'],
  },
};

export const getStudentFirstCarSchema = () => {
  return {
    "@context": "https://schema.org",
    "@type": "Guide",
    "headline": "The Galway Student's Guide to Buying Your First Used Car",
    "description": "Comprehensive tutorial covering young driver car insurance in Ireland, specific student commuter routes, mechanical checklists, and low-tax vehicle options.",
    "image": "https://www.shahmotors.ie/images/blogs/blog-9.webp",
    "author": {
      "@type": "Organization",
      "name": "ShahMotors Engineering Team",
      "url": "https://www.shahmotors.ie"
    },
    "publisher": {
      "@type": "AutoDealer",
      "name": "ShahMotors Galway",
      "logo": "https://www.shahmotors.ie/logo.png",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "Galway City & Nationwide Delivery",
        "addressLocality": "Galway",
        "addressRegion": "Galway",
        "postalCode": "H91",
        "addressCountry": "IE"
      }
    },
    "mainEntityOfPage": "https://www.shahmotors.ie/blogs/student-first-car-guide-galway",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "What engine displacement is ideal for cheap first-time insurance in Ireland?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "First-time young driver premiums in Ireland are heavily loaded by engine size. Keep your search strictly to engines under 1,250cc (like 1.0L or 1.2L petrol units). Selecting an engine over 1.4L can cause initial annual premiums to exceed €3,000."
        }
      },
      {
        "@type": "Question",
        "name": "How do you bypass insurance loading for Japanese imported student cars?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Many pre-owned JDM (Japanese Domestic Market) vehicles do not feature factory anti-theft engines from the production line because car theft is highly rare in Japan. To satisfy Irish underwriters, ensure an Irish-approved Thatcham immobiliser security system is physically installed before insurance quotation attempts."
        }
      }
    ]
  };
};

export default function Page() {
  return <ClientPage />;
}