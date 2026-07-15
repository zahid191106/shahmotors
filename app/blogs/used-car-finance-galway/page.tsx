import type { Metadata } from 'next';
import ClientPage from './page.client';

export const metadata: Metadata = {
  title: "Used Car Finance Galway | Hire Purchase & Car Loans Guide",
  description: "Struggling to decode PCP, HP, or local Galway credit union car loans? Read our comprehensive, expert financial guide on getting fast credit approvals in Ireland.",
  keywords: [
    'used car finance galway',
    'hire purchase ireland',
    'car loans galway',
    'pcp vs hp ireland',
    'shahmotors finance',
    'credit union car loan galway',
    'car finance approval ireland',
    'bad credit car finance galway'
  ],
  alternates: {
    canonical: 'https://www.shahmotors.ie/blogs/used-car-finance-galway',
  },
  openGraph: {
    title: "A Local's Guide to Used Car Finance Options in Galway",
    description: "Confused by PCP, HP, and traditional car loans? Discover how car finance works in Galway, how to secure fast approval, and how to structure your budget.",
    url: 'https://www.shahmotors.ie/blogs/used-car-finance-galway',
    siteName: 'ShahMotors Galway',
    images: [
      {
        url: 'https://www.shahmotors.ie/images/blogs/blog-11.webp',
        width: 1200,
        height: 630,
        alt: 'Professional consult of used car finance documentation in Galway, Ireland',
      },
    ],
    locale: 'en_IE',
    type: 'article',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Used Car Finance Options in Galway - Complete Buyer Guide",
    description: "Learn how the Central Credit Register operates and estimate your monthly HP/PCP payments with our live local finance calculator.",
    images: ['https://www.shahmotors.ie/images/blogs/blog-11.webp'],
  },
};

export const getLocalCarFinanceSchema = () => {
  return {
    "@context": "https://schema.org",
    "@type": "TechArticle",
    "headline": "A Local’s Guide to Used Car Finance Options in Galway",
    "description": "An in-depth study analyzing Hire Purchase, PCP structures, bank personal loans, credit scoring databases, and financial preparation strategies for used car buyers in Galway.",
    "image": "https://www.shahmotors.ie/images/blogs/blog-11.webp",
    "author": {
      "@type": "Organization",
      "name": "ShahMotors Financial Planning Team",
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
    "mainEntityOfPage": "https://www.shahmotors.ie/blogs/used-car-finance-galway",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "How does Hire Purchase (HP) differ from a Personal Contract Plan (PCP) for second-hand cars?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "With Hire Purchase (HP), you pay a deposit and borrow the remaining balance over a fixed term. Once the final monthly payment is cleared, you own the car outright. With a Personal Contract Plan (PCP), payments are lower because a large chunk of the car's value is deferred as a balloon payment due at the end of the term."
        }
      },
      {
        "@type": "Question",
        "name": "What is the 'Half Rule' under Irish Hire Purchase agreements?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "The 'Half Rule' (Section 99 of the Consumer Credit Act 1995) allows you to terminate a Hire Purchase or PCP agreement and return the vehicle to the lender once you have paid at least 50% of the total hire purchase price, provided the car is returned in reasonable condition and arrears are cleared."
        }
      }
    ]
  };
};

export default function Page() {
  return <ClientPage />;
}