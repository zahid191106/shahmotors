import type { Metadata } from "next";
import Blogs from "@/components/Blogs";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";

export const metadata: Metadata = {
  title: "ShahMotors Blog | Irish Car Buyer Tips",
  description: "Read ShahMotors expert blog posts on buying cars in Ireland, NCT guidance, finance tips and Dublin vehicle market insights.",
  keywords: ["Irish car buying blog", "NCT advice", "Dublin car market", "ShahMotors blog", "used car tips Ireland"],
  openGraph: {
    title: "ShahMotors Blog | Irish Car Buyer Tips",
    description: "Read ShahMotors expert blog posts on buying cars in Ireland, NCT guidance, finance tips and Dublin vehicle market insights.",
    type: "website",
    locale: "en_IE",
    images: ["/logo-car.png"],
  },
};

export default function BlogPage() {
  return (
    <main className="min-h-screen">
        {/* You can add page-specific SEO or wrappers here */}
        <div className="relative max-w-7xl mx-auto pb-16">
            <Navbar />
        </div>
        <Blogs />
        <Footer />
    </main>
  );
}