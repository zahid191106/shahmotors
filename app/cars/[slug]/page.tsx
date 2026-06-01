import type { Metadata } from 'next';
import { client } from '@/lib/sanity.client';
import { SINGLE_CAR_QUERY, CAR_SLUGS_QUERY } from '@/lib/sanity.queries';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import CarImageSlider from '@/components/CarImageSlider';
import ShareButton from '@/components/ShareButton';
import WishlistButton from '@/components/WishlistButton';

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const car = await getCar(params.slug);

  if (!car) {
    return {
      title: 'Car not found | ShahMotors Ireland',
      description: 'The requested car was not found in our Dublin inventory. Browse verified Irish used cars at ShahMotors.',
      openGraph: {
        title: 'Car not found | ShahMotors Ireland',
        description: 'The requested car was not found in our Dublin inventory. Browse verified Irish used cars at ShahMotors.',
        type: 'website',
        locale: 'en_IE',
        images: ['/logo-car.png'],
      },
    };
  }

  const imageUrl = car.images?.[0]?.asset?.url ?? '/logo-car.png';
  const title = `${car.make} ${car.model} ${car.year} | ShahMotors Ireland`;
  const description = `View this ${car.year} ${car.make} ${car.model} with full service history, NCT ready, and Irish compliance from ShahMotors in Dublin.`;

  return {
    title,
    description,
    keywords: [
      car.make,
      car.model,
      'used cars Ireland',
      'Dublin car dealer',
      'NCT ready cars',
    ],
    openGraph: {
      title,
      description,
      type: 'article',
      locale: 'en_IE',
      images: [
        {
          url: imageUrl,
          alt: `${car.make} ${car.model} image`,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [imageUrl],
    },
  };
}
import {
  ArrowLeft,
  Gauge,
  Settings2,
  Fuel,
  CarFront,
  DoorClosed,
  Palette,
  Calendar,
  CheckCircle2,
  Phone,
  Mail,
  MessageSquare,
  ShieldCheck,
  Share2,
  Heart,
  Building2,
  Car,
  Wrench,
} from 'lucide-react';

export async function generateStaticParams() {
  const slugs = await client.fetch(CAR_SLUGS_QUERY);
  return slugs.map((item: any) => ({
    slug: item.slug,
  }));
}

async function getCar(slug: string) {
  return await client.fetch(SINGLE_CAR_QUERY, { slug });
}

export default async function CarDetailPage({ 
  params 
}: { 
  params: Promise<{ slug: string }> 
}) {
  const { slug } = await params;
  const car = await getCar(slug);

  if (!car) {
    notFound();
  }

  const isSold = car.availability === 'sold';

  return (
    <div className="relative min-h-[90vh]  flex flex-col items-center justify-center px-2 md:px-4 pb-12 md:pb-20 overflow-hidden">
      <section className="relative max-w-7xl min-h-[400px] flex items-center overflow-hidden rounded-b-xl bg-white pt-20">
        <Navbar />
        <main className="container mx-auto px-1 md:px-4 py-6 md:py-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* LEFT COLUMN: VISUALS */}
            <div className="lg:col-span-7 space-y-6">
              <div className="container mx-auto h-16 flex items-center justify-between">
                <Link 
                  href="/cars" 
                  className="group flex items-center gap-2 text-gray-600 hover:text-red-600 transition-all font-semibold"
                >
                  <div className="p-1.5 rounded-full group-hover:bg-red-50 transition-colors">
                    <ArrowLeft size={20} />
                  </div>
                  <span>Back to Inventory</span>
                </Link>
                
                <div className="flex items-center gap-3">
                  <ShareButton title={`Check out this ${car.year} ${car.make} ${car.model} at ShahMotors!`} />
                  <WishlistButton carId={car._id} />
                </div>
              </div>
              <CarImageSlider images={car.images} title={car.title} isSold={isSold} />

              {/* Premium Highlights (Desktop Positioning) */}
              <div className="hidden lg:block bg-white p-10 rounded-xl border shadow-sm ring-1 ring-black/5">
                <div className="flex items-center justify-between mb-8">
                  <h2 className="text-2xl font-bold flex items-center gap-3">
                    <CheckCircle2 className="text-green-500" size={28} />
                    Descriptions
                  </h2>
                  <span className="px-3 py-1 bg-green-50 text-green-700 text-xs font-bold rounded-full uppercase tracking-tighter">Verified</span>
                </div>
                <div className="grid grid-cols-1 gap-y-5 gap-x-12">
                  {/* {car.description?.split('\n').map((line: string, i: number) => ( */}
                    <div className="flex items-center gap-4 text-gray-700 group">
                      <div className="h-full w-2 rounded-full bg-red-500 transition-transform" />
                      <span className="text-base font-medium whitespace-pre-line leading-relaxed">{car.description}</span>
                    </div>
                  {/* ))} */}
                </div>
              </div>
            </div>

            {/* RIGHT COLUMN: PRICING & CONVERSION */}
            <div className="lg:col-span-5 space-y-6">
              <div className="bg-white p-6 md:p-8 rounded-xl border shadow-lg sticky ring-1 ring-black/5">
                {/* Status & Badge */}
                <div className="flex items-center gap-2 mb-4">
                  <span className="px-3 py-1 bg-red-50 text-red-600 text-[10px] font-black rounded-lg uppercase tracking-widest border border-red-100">
                    {car.make} {car.year}
                  </span>
                  {isSold ? (
                    <span className="px-3 py-1 bg-gray-100 text-gray-500 text-[10px] font-black rounded-lg uppercase tracking-widest border border-gray-200">Out of Stock</span>
                  ) : (
                    <span className="px-3 py-1 bg-green-50 text-green-600 text-[10px] font-black rounded-lg uppercase tracking-widest border border-green-100 flex items-center gap-1">
                      <div className="h-1.5 w-1.5 rounded-full bg-green-500 animate-pulse" />
                      Live
                    </span>
                  )}
                </div>

                {/* Title & Price */}
                <h1 className="text-3xl md:text-4xl font-black text-gray-900 leading-[1.1] mb-4">
                  {car.title}
                </h1>
                
                <div className="flex flex-col mb-8">
                  <div className="flex items-baseline gap-3">
                    <span className="text-4xl font-black text-red-600">
                      €{car.price?.toLocaleString()}
                    </span>
                    <span className="text-lg text-gray-400 font-medium line-through">
                      €{(car.price * 1.08).toLocaleString()}
                    </span>
                  </div>
                  <p className="text-xs text-gray-500 mt-1 font-medium">Excluding taxes & insurance fees</p>
                </div>

                {/* Technical Grid */}
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8">
                  <QuickSpec icon={<Gauge size={20}/>} label="Mileage" value={`${car.mileage?.toLocaleString()} km`} />
                  <QuickSpec icon={<Settings2 size={20}/>} label="Gearbox" value={car.gearbox} />
                  <QuickSpec icon={<Fuel size={20}/>} label="Fuel" value={car.fuelType} />
                  <QuickSpec icon={<CarFront size={20}/>} label="Body" value={car.bodyType} />
                  <QuickSpec icon={<DoorClosed size={20}/>} label="Doors" value={`${car.doors} Doors`} />
                  <QuickSpec icon={<Palette size={20}/>} label="Ext. Color" value={car.color} />
                  <QuickSpec icon={<Calendar size={20}/>} label="Year" value={car.year} />
                  <QuickSpec icon={<Building2 size={20}/>} label="Make" value={car.make} />
                  <QuickSpec icon={<Wrench size={20}/>} label="Engine" value={car.engine} />
                  <QuickSpec icon={<Car size={20}/>} label="Model" value={car.model} />
                </div>

                {/* Action Stack (Desktop) */}
                <div className="hidden md:flex flex-col gap-4">
                  <div className="grid grid-cols-1 gap-4">
                    <Link
                      href="tel:+353833526830"
                      className="flex items-center justify-center gap-3 py-4 rounded-2xl border-2 border-gray-100 font-bold text-gray-800 hover:bg-gray-50 hover:border-gray-200 transition-all"
                    >
                      <Phone size={20} />
                      Call Us
                    </Link>
                    <Link
                      href="mailto:shahmotors14@yahoo.com"
                      className="flex items-center justify-center gap-3 py-4 rounded-2xl border-2 border-gray-100 font-bold text-gray-800 hover:bg-gray-50 hover:border-gray-200 transition-all"
                    >
                      <Mail size={20} />
                      Email Us
                    </Link>
                    <Link
                      href={`https://wa.me/353833526830?text=Hello%20I%20am%20interested%20in%20${encodeURIComponent(car.title)}`}
                      target="_blank"
                      rel="noreferrer"
                      className="flex items-center justify-center gap-3 py-4 rounded-2xl border-2 border-green-100 bg-green-50/30 font-bold text-green-700 hover:bg-green-50 transition-all"
                    >
                      <MessageSquare size={25} />
                      WhatsApp
                    </Link>
                  </div>
                </div>

                {/* Warranty Badge */}
                <div className="mt-8 pt-8 border-t border-gray-100">
                  <div className="flex items-start gap-4">
                    <div className="h-12 w-12 rounded-2xl bg-blue-50 flex items-center justify-center text-blue-600 shrink-0 shadow-sm">
                      <ShieldCheck size={24} />
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-900 text-sm">Certified Peace of Mind</h4>
                      <p className="text-xs text-gray-500 mt-0.5 leading-relaxed">Includes 6-month engine warranty and full service history document.</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Mobile/Secondary Description */}
              <div className="block lg:hidden bg-white p-5 mb-20 md:mb-5 rounded-xl border shadow-sm ring-1 ring-black/5">
                <div className="flex items-center justify-between mb-8">
                  <h2 className="text-2xl font-bold flex items-center gap-3">
                    <CheckCircle2 className="text-green-500" size={28} />
                    Descriptions
                  </h2>
                  <span className="px-3 py-1 bg-green-50 text-green-700 text-xs font-bold rounded-full uppercase tracking-tighter">Verified</span>
                </div>
                <div className="grid grid-cols-1 gap-y-5 gap-x-12">
                  {/* {car.description?.split('\n').map((line: string, i: number) => ( */}
                    <div className="flex items-center gap-4 text-gray-700 group">
                      <div className="h-full w-2 rounded-full bg-red-500 transition-transform" />
                      <span className="text-base font-medium whitespace-pre-line leading-relaxed">{car.description}</span>
                    </div>
                  {/* ))} */}
                </div>
              </div>
            </div>
          </div>
        </main>

        {/* MOBILE CONVERSION BAR (Floating) */}
        <div className="md:hidden fixed bottom-4 left-4 right-4 z-100">
          <div className="bg-white/95 backdrop-blur-xl p-3 rounded-[2rem] shadow-[0_20px_50px_rgba(0,0,0,0.15)] border border-white space-y-3">
            <div className="flex items-center justify-between gap-3">
              <div>
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest leading-none">Total Price</p>
                <p className="text-xl font-black text-gray-900 leading-none mt-1">€{car.price?.toLocaleString()}</p>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-2">
              <Link
                href="tel:+353833526830"
                className="flex items-center justify-center gap-2 py-3 rounded-2xl border border-gray-100 bg-white text-gray-800 font-bold text-xs transition-all hover:bg-gray-50"
              >
                <Phone size={16} />
                Call
              </Link>
              <Link
                href="mailto:shahmotors14@yahoo.com"
                className="flex items-center justify-center gap-2 py-3 rounded-2xl border border-gray-100 bg-white text-gray-800 font-bold text-xs transition-all hover:bg-gray-50"
              >
                <Mail size={16} />
                Email
              </Link>
              <Link
                href={`https://wa.me/353833526830?text=Hello%20I%20am%20interested%20in%20${encodeURIComponent(car.title)}`}
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-center gap-2 py-3 rounded-2xl border border-green-100 bg-green-50 text-green-700 font-bold text-xs transition-all hover:bg-green-100"
              >
                <MessageSquare size={16} />
                WhatsApp
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

function QuickSpec({ icon, label, value }: { icon: React.ReactNode, label: string, value: string | number }) {
  return (
    <div className="flex flex-col p-4 bg-gray-50/50 rounded-2xl border border-gray-100 hover:bg-white hover:shadow-md transition-all group">
      <div className="text-red-500 mb-3 group-hover:scale-110 transition-transform origin-left">{icon}</div>
      <p className="text-[10px] uppercase tracking-tighter text-gray-400 font-extrabold mb-0.5">{label}</p>
      <p className="text-sm font-bold text-gray-900 truncate">{value || 'N/A'}</p>
    </div>
  );
}