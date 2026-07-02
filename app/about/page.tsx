import type { Metadata } from "next";
import About from "@/components/AboutUs";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";

export const metadata: Metadata = {
  title: "About ShahMotors | Galway Car Dealership",
  description: "Learn about ShahMotors in Galway, an Irish used car dealership delivering inspected, NCT-ready vehicles and transparent car buying.",
  keywords: ["ShahMotors", "Irish car dealer", "Galway car dealership", "about ShahMotors", "used cars Ireland"],
  alternates: {
    canonical: "https://www.shahmotors.ie/about",
  },
  openGraph: {
    title: "About ShahMotors | Galway Car Dealership",
    description: "Learn about ShahMotors in Galway, an Irish used car dealership delivering inspected, NCT-ready vehicles and transparent car buying.",
    type: "website",
    locale: "en_IE",
    images: ["/logo-car.png"],
  },
};

export default function AboutPage() {
  return (
    <main className="min-h-screen">
        {/* You can add page-specific SEO or wrappers here */}
        <div className="relative max-w-7xl mx-auto pb-16">
            <Navbar />
        </div>
        <About />
        <Footer />
    </main>
  );
}