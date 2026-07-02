import type { Metadata } from 'next';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: 'Support | Shah Motors Galway',
  description: 'Get help from Shah Motors support for enquiries, aftersales care, finance guidance, and Galway showroom assistance.',
  alternates: {
    canonical: 'https://www.shahmotors.ie/support',
  },
};

export default function SupportPage() {
  return (
    <main className="min-h-screen bg-white text-slate-900">
      <div className="max-w-7xl mx-auto px-6 py-10">
        <Navbar />
        <section className="mt-12 space-y-6">
          <h1 className="text-4xl font-black tracking-tight">Support</h1>
          <p className="text-base text-slate-600 leading-relaxed max-w-3xl">
            Need assistance with a vehicle enquiry, finance application, or aftersales support? Our Galway support team is ready to help you make the right purchase decision and keep your car running smoothly after delivery.
          </p>
          <div className="space-y-4 text-slate-700 leading-relaxed">
            <p>
              Contact us by email at shahmotors14@yahoo.com, call +353 833526830, or use the contact form on our website for help with bookings, paperwork, or warranty support.
            </p>
            <p>
              We aim to respond to support inquiries promptly and make the Shah Motors ownership experience transparent, reliable, and easy to understand.
            </p>
          </div>
        </section>
      </div>
      <Footer />
    </main>
  );
}
