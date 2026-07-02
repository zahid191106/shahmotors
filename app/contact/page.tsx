import type { Metadata } from "next";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";

export const metadata: Metadata = {
  title: "Contact ShahMotors | Galway Used Car Dealer",
  description: "Contact ShahMotors in Galway for enquiries on our Irish used car stock, finance advice, and test drive bookings.",
  keywords: ["contact ShahMotors", "Galway car dealer contact", "used cars Ireland contact", "Irish car dealership"],
  alternates: {
    canonical: "https://www.shahmotors.ie/contact",
  },
  openGraph: {
    title: "Contact ShahMotors | Galway Used Car Dealer",
    description: "Contact ShahMotors in Galway for enquiries on our Irish used car stock, finance advice, and test drive bookings.",
    type: "website",
    locale: "en_IE",
    images: ["/logo-car.png"],
  },
};

export default function ContactPage() {
  return (
    <main className="min-h-screen">
        {/* You can add page-specific SEO or wrappers here */}
        <div className="relative max-w-7xl mx-auto pb-16">
            <Navbar />
        </div>
        <Contact />
        <Footer />
    </main>
  );
}