import type { Metadata } from 'next';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: 'Terms of Service | Shah Motors Galway',
  description: 'Review the Shah Motors terms of service for buying certified used cars from our Galway showroom and accessing our website services.',
  alternates: {
    canonical: 'https://www.shahmotors.ie/terms',
  },
};

export default function TermsPage() {
  return (
    <main className="min-h-screen bg-white text-slate-900">
      <div className="max-w-7xl mx-auto px-6 py-10">
        <Navbar />
        <section className="mt-12 space-y-6">
          <h1 className="text-4xl font-black tracking-tight">Terms of Service</h1>
          <p className="text-base text-slate-600 leading-relaxed max-w-3xl">
            These terms govern your use of the Shah Motors website and the process for purchasing a used vehicle from our Galway showroom. Please read them carefully before contacting us, requesting finance, or arranging a test drive.
          </p>
          <div className="space-y-4 text-slate-700 leading-relaxed">
            <p>
              By using this site, you agree that Shah Motors will provide transparent pricing, accurate vehicle information, and support through every stage of the purchase process. All sales are subject to our inspection and delivery terms.
            </p>
            <p>
              If you need help understanding these terms, contact our support team at shahmotors14@yahoo.com or call +353 833526830.
            </p>
          </div>
        </section>
      </div>
      <Footer />
    </main>
  );
}
