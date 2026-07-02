import type { Metadata } from "next";
import HomePage from "@/components/HomePage";

const homeStructuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": "https://www.shahmotors.ie/#organization",
      "name": "Shah Motors Limited",
      "url": "https://www.shahmotors.ie",
      "logo": "https://www.shahmotors.ie/logo-car.png",
      "sameAs": [
        "https://facebook.com/shahmotors",
        "https://x.com/shahmotors",
        "https://instagram.com/shahmotors",
        "https://youtube.com/@shahmotors",
        "https://tiktok.com/@shahmotors"
      ],
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "Two Ditch, Castlegar Co. (H91 EE9F)",
        "addressLocality": "Galway",
        "addressCountry": "IE"
      },
      "telephone": "+353833526830",
      "email": "shahmotors14@yahoo.com"
    },
    {
      "@type": "WebPage",
      "@id": "https://www.shahmotors.ie/#webpage",
      "url": "https://www.shahmotors.ie/",
      "name": "Shah Motors Galway | Used Car Showroom",
      "description": "Shah Motors is a Galway used car showroom offering certified pre-owned vehicles, NCT-ready inspections, and flexible finance across Ireland.",
      "publisher": {
        "@id": "https://www.shahmotors.ie/#organization"
      },
      "inLanguage": "en-IE"
    },
    {
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "What types of used cars are available at Shah Motors Galway?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "We stock inspected, NCT-ready used cars from premium hatchbacks and family SUVs to executive saloons, hybrids, and locally compliant imports."
          }
        },
        {
          "@type": "Question",
          "name": "Can I get finance and warranty for a car bought from your Galway showroom?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Yes. Shah Motors offers flexible finance packages and warranty support for qualifying vehicles purchased from our Galway showroom."
          }
        },
        {
          "@type": "Question",
          "name": "How does Shah Motors verify car history and NCT readiness?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Every car is inspected against a 35-point Galway readiness checklist, including NCT preparation, service history validation, and a full Irish compliance review."
          }
        }
      ]
    }
  ]
};

export const metadata: Metadata = {
  title: "ShahMotors | Galway's Trusted Used Car Dealer",
  description: "Shop verified used cars from our Galway showroom and across Ireland with ShahMotors. Transparent pricing, finance support, and NCT-ready vehicles.",
  keywords: [
    "used cars Galway",
    "Galway car dealership",
    "NCT ready cars",
    "Irish car finance",
    "premium used cars",
  ],
  alternates: {
    canonical: "https://www.shahmotors.ie",
  },
  openGraph: {
    title: "ShahMotors | Galway's Trusted Used Car Dealer",
    description: "Shop verified used cars from our Galway showroom and across Ireland with ShahMotors. Transparent pricing, finance support, and NCT-ready vehicles.",
    type: "website",
    locale: "en_IE",
    images: ["/logo-car.png"],
  },
};

export default function Page() {
  return (
    <>
      <HomePage />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(homeStructuredData) }}
      />
    </>
  );
}
