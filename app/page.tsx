import type { Metadata } from "next";
import HomePage from "@/components/HomePage";

const homeStructuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "AutomotiveBusiness",
      "@id": "https://www.shahmotors.ie/#automotivebusiness",
      "name": "Shah Motors",
      "url": "https://www.shahmotors.ie",
      "logo": "https://www.shahmotors.ie/logo-car.png",
      "image": "https://www.shahmotors.ie/logo-car.png",
      "telephone": "+353833526830",
      "email": "shahmotors14@yahoo.com",
      "priceRange": "€€",
      "currenciesAccepted": "EUR",
      "paymentAccepted": "Cash, Credit Card, Bank Transfer",
      "areaServed": [
        { "@type": "AdministrativeArea", "name": "Galway" },
        { "@type": "AdministrativeArea", "name": "Connacht" },
        { "@type": "AdministrativeArea", "name": "Ireland" }
      ],
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "Two Ditch, Castlegar",
        "addressLocality": "Galway",
        "addressRegion": "Co. Galway",
        "postalCode": "H91 EE9F",
        "addressCountry": "IE"
      },
      "geo": {
        "@type": "GeoCoordinates",
        "latitude": "53.2919",
        "longitude": "-9.0224"
      },
      "hasMap": "https://maps.google.com/?q=Shah+Motors+Castlegar+Galway",
      "openingHoursSpecification": [
        {
          "@type": "OpeningHoursSpecification",
          "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
          "opens": "09:00",
          "closes": "21:00"
        }
      ],
      "sameAs": [
        // "https://facebook.com/shahmotors",
        // "https://x.com/shahmotors",
        // "https://instagram.com/shahmotors",
        // "https://youtube.com/@shahmotors",
        "https://tiktok.com/@shahmotors144"
      ]
    },
    {
      "@type": "WebPage",
      "@id": "https://www.shahmotors.ie/#webpage",
      "url": "https://www.shahmotors.ie/",
      "name": "Shah Motors Galway | Used Car Showroom",
      "description": "Shah Motors is a Galway used car showroom offering certified pre-owned vehicles, NCT-ready inspections, and flexible finance across Ireland.",
      "publisher": {
        "@id": "https://www.shahmotors.ie/#automotivebusiness"
      },
      "inLanguage": "en-IE"
    },
    {
      "@type": "FAQPage",
      "@id": "https://www.shahmotors.ie/#faq",
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
        },
        {
          "@type": "Question",
          "name": "Do you sell high-quality Japanese import cars in Ireland?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Yes, we specialize in premium Japanese imports. All our imported vehicles undergo full conversions to match Irish road regulations, receive comprehensive history checks, and come pre-cleared through customs."
          }
        },
        {
          "@type": "Question",
          "name": "Is Vehicle Registration Tax (VRT) included in your car prices?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Yes, all vehicles listed for sale at Shah Motors have their Vehicle Registration Tax (VRT) fully paid and settled. The price you see includes all Irish registration fees."
          }
        },
        {
          "@type": "Question",
          "name": "Can I trade in my old car at Shah Motors Galway?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Absolutely. We accept trade-ins and part-exchanges for all makes and models. Bring your car to our Castlegar showroom for a transparent valuation against any vehicle in our stock."
          }
        },
        {
          "@type": "Question",
          "name": "Do you deliver vehicles to buyers outside of Galway?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Yes, while our main showroom is in Galway, we offer secure nationwide vehicle delivery options across the Republic of Ireland for absolute buying convenience."
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
