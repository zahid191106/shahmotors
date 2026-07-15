import type { Metadata } from 'next';
import ClientPage from './page.client'; 

export const metadata: Metadata = {
  title: "Cars for Irish Weather Galway | Safe Used SUVs & AWDs Guide",
  description: "Driving in wet, windy West of Ireland conditions? Discover how to choose a reliable used car in Galway with smart AWD, rust protection, and headlights optimized for storms.",
  keywords: [
    'cars for irish weather galway',
    'used cars galway',
    'awd cars ireland',
    'safe driving west of ireland',
    'best cars for rain ireland',
    'coastal rust prevention cars',
    '4x4s for sale galway',
    'toyota hybrid imports galway'
  ],
  alternates: {
    canonical: 'https://www.shahmotors.ie/blogs/cars-for-irish-weather-galway',
  },
  openGraph: {
    title: "West of Ireland Driving: How Severe Weather Affects Your Car Selection",
    description: "Don't let Atlantic storms catch you out. Learn what safety tech, lighting, and rust-proofing configurations you should prioritize for maximum road safety.",
    url: 'https://www.shahmotors.ie/blogs/cars-for-irish-weather-galway',
    siteName: 'ShahMotors Galway',
    images: [
      {
        url: 'https://www.shahmotors.ie/images/blogs/blog-10.webp',
        width: 1200,
        height: 630,
        alt: 'Safe, reliable AWD hybrid SUV driving through wet coastal weather in County Galway',
      },
    ],
    locale: 'en_IE',
    type: 'article',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Galway & Connemara Winter Driving & Used Car Selection Guide",
    description: "Survive winter downpours and mountain frost. Compare the top-rated AWD and high-clearance Japanese hybrid imports.",
    images: ['https://www.shahmotors.ie/images/blogs/blog-10.webp'],
  },
};

export const getWestIrelandWeatherSchema = () => {
  return {
    "@context": "https://schema.org",
    "@type": "TechArticle",
    "headline": "West of Ireland Driving: How Severe Weather Affects Your Used Car Selection",
    "description": "A comprehensive study of coastal winds, rainfall statistics, rust protection, and traction systems required for safe driving in County Galway and Connemara.",
    "image": "https://www.shahmotors.ie/images/blogs/blog-10.webp",
    "author": {
      "@type": "Organization",
      "name": "ShahMotors Technical Team",
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
    "mainEntityOfPage": "https://www.shahmotors.ie/blogs/cars-for-irish-weather-galway",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "How does ocean salt air affect vehicles parked near the coast in Galway?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Salt spray carries moisture that settles on steel undercarriage components, acting as a catalyst for oxidation and structural rust. ShahMotors protects all vehicle imports with thick, marine-grade protective rust-proofing."
        }
      },
      {
        "@type": "Question",
        "name": "What traction system is safest for unlit rural roads in Connemara during winter storms?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Intelligent All-Wheel Drive (AWD) is the safest system, dynamically distributing torque to wheels with the most traction to prevent dangerous slides on wet, icy, or muddy roads."
        }
      }
    ]
  };
};

export default function Page() {
  return <ClientPage />;
}