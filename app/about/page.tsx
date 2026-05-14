import About from "@/components/AboutUs";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";

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