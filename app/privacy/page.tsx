import type { Metadata } from 'next';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: 'Privacy Policy | Shah Motors Galway',
  description: 'Read the Shah Motors privacy policy for our Galway showroom and learn how we protect customer information when buying a used car in Ireland.',
  alternates: {
    canonical: 'https://www.shahmotors.ie/privacy',
  },
};

export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-white text-slate-900">
      <div className="max-w-7xl mx-auto px-6 py-10">
        <Navbar />
        <section className="mt-12 space-y-6">
          <h1 className="text-4xl font-black tracking-tight">Privacy Policy</h1>
          <p className="text-base text-slate-600 leading-relaxed max-w-3xl">
            At Shah Motors, we respect your privacy and only use customer information to support your vehicle purchase, finance application, and service requests. This policy explains how we collect, store, and protect personal data when you contact our Galway showroom or browse our site.
          </p>
          <div className="space-y-4 text-slate-700 leading-relaxed">
            <p>
              We collect only the information needed to respond to enquiries, arrange test drives, and help you secure car finance. We never sell your data to third parties and use secure systems to protect contact details and purchase information.
            </p>
            <p>
              If you have questions about how we use your personal data, please contact us at shahmotors14@yahoo.com or call +353 833526830.
            </p>
          </div>
        </section>
      </div>
      <Footer />
    </main>
  );
}
