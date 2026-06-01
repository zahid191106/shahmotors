import type { Metadata } from "next";
import HomePage from "@/components/HomePage";
// Typing animation quotes
const TYPING_QUOTES = [
  'Drive Your Dream Car today',
  'Find Your Dream Car in Dublin',
  'Your Next Dream Car Awaits'
];

export const metadata: Metadata = {
  title: "ShahMotors | Ireland's Premium Used Car Dealer",
  description: "Shop verified used cars in Dublin and across Ireland with ShahMotors. Transparent pricing, finance support, and NCT-ready vehicles.",
  keywords: [
    "used cars Dublin",
    "Ireland car dealership",
    "NCT ready cars",
    "Irish car finance",
    "premium used cars",
  ],
  openGraph: {
    title: "ShahMotors | Ireland's Premium Used Car Dealer",
    description: "Shop verified used cars in Dublin and across Ireland with ShahMotors. Transparent pricing, finance support, and NCT-ready vehicles.",
    type: "website",
    locale: "en_IE",
    images: ["/logo-car.png"],
  },
};


type Car = {
  _id: string;
  title: string;
  slug: { current: string };
  make: string;
  model: string;
  year: number;
  price: number;
  mileage: number;
  fuelType: string;
  transmission: string;
  images: Array<{ asset: { url: string } }>;
};

export default function Page() {
  return <HomePage />;
}
