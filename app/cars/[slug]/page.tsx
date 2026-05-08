import { client } from '@/lib/sanity.client';
import { SINGLE_CAR_QUERY, CAR_SLUGS_QUERY } from '@/lib/sanity.queries';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
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
  MessageSquare,
  ShieldCheck,
  Info,
  Share2,
  Heart
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
    <div className="min-h-screen bg-gray-50 pb-24 md:pb-12">
      {/* Header Navigation */}
      <nav className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
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
            <button className="p-2.5 rounded-full hover:bg-gray-100 text-gray-500 transition-colors">
              <Share2 size={20} />
            </button>
            <button className="p-2.5 rounded-full hover:bg-gray-100 text-gray-500 transition-colors">
              <Heart size={20} />
            </button>
          </div>
        </div>
      </nav>

      <main className="container mx-auto px-4 py-6 md:py-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* LEFT COLUMN: VISUALS */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Main Image Slider Container */}
            <div className="relative group">
              {/* Massive SOLD Stamp Overlay */}
              {isSold && (
                <div className="absolute inset-0 flex items-center justify-center z-20 pointer-events-none select-none overflow-hidden rounded-3xl">
                  <div className="animate-in fade-in zoom-in duration-700 scale-110 md:scale-150">
                    <svg width="300" height="300" viewBox="0 0 400 400" className="drop-shadow-[0_20px_50px_rgba(0,0,0,0.5)] opacity-95" xmlns="http://www.w3.org/2000/svg">
                      <defs>
                        <radialGradient id="redGrad" cx="50%" cy="50%" r="50%">
                          <stop offset="0%" stopColor="#ff4d4d"/>
                          <stop offset="100%" stopColor="#8b0000"/>
                        </radialGradient>
                      </defs>
                      <g transform="rotate(-15 200 200)">
                        <polygon 
                          points="200,25 225,70 275,45 285,95 335,85 320,135 370,155 335,195 375,230 325,245 340,295 290,290 280,340 230,315 200,370 170,315 120,340 110,290 60,295 75,245 25,230 65,195 30,155 80,135 65,85 115,95 125,45 175,70" 
                          fill="url(#redGrad)" 
                          stroke="#fff" 
                          strokeWidth="12"
                        />
                        <text x="200" y="225" textAnchor="middle" fontFamily="Arial Black, sans-serif" fontSize="76" fontWeight="900" fill="white">
                          SOLD
                        </text>
                      </g>
                    </svg>
                  </div>
                </div>
              )}

              {/* Main Image Display */}
              <div className="relative aspect-[16/10] w-full rounded-3xl overflow-hidden bg-gray-200 shadow-xl border-4 border-white">
                {car.images?.[0]?.asset?.url ? (
                  <Image
                    src={car.images[0].asset.url}
                    alt={car.title}
                    fill
                    className={`object-cover transition-all duration-1000 ${isSold ? 'grayscale-[0.6] brightness-50 contrast-125' : 'group-hover:scale-105'}`}
                    priority
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-gray-400">Image Unavailable</div>
                )}
              </div>

              {/* Enhanced Thumbnails Scroll */}
              {car.images && car.images.length > 1 && (
                <div className="flex gap-4 mt-6 overflow-x-auto pb-2 scrollbar-hide no-scrollbar">
                  {car.images.map((img: any, idx: number) => (
                    <div 
                      key={idx} 
                      className="relative h-20 w-28 md:h-24 md:w-32 flex-shrink-0 rounded-2xl overflow-hidden border-2 border-transparent hover:border-red-600 cursor-pointer transition-all shadow-sm bg-white"
                    >
                      <Image
                        src={img.asset.url}
                        alt={`${car.title} view ${idx + 1}`}
                        fill
                        className="object-cover"
                      />
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Premium Highlights (Desktop Positioning) */}
            <div className="hidden lg:block bg-white p-10 rounded-3xl border shadow-sm ring-1 ring-black/5">
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-2xl font-bold flex items-center gap-3">
                  <CheckCircle2 className="text-green-500" size={28} />
                  Features & Options
                </h2>
                <span className="px-3 py-1 bg-green-50 text-green-700 text-xs font-bold rounded-full uppercase tracking-tighter">Verified</span>
              </div>
              <div className="grid grid-cols-2 gap-y-5 gap-x-12">
                {car.features?.map((feature: string, i: number) => (
                  <div key={i} className="flex items-center gap-4 text-gray-700 group">
                    <div className="h-2 w-2 rounded-full bg-red-500 group-hover:scale-150 transition-transform" />
                    <span className="text-base font-medium">{feature}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN: PRICING & CONVERSION */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-white p-6 md:p-8 rounded-3xl border shadow-lg sticky top-24 ring-1 ring-black/5">
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
                    ${car.price?.toLocaleString()}
                  </span>
                  <span className="text-lg text-gray-400 font-medium line-through">
                    ${(car.price * 1.08).toLocaleString()}
                  </span>
                </div>
                <p className="text-xs text-gray-500 mt-1 font-medium">Excluding taxes & insurance fees</p>
              </div>

              {/* Technical Grid */}
              <div className="grid grid-cols-2 gap-4 mb-8">
                <QuickSpec icon={<Gauge size={20}/>} label="Mileage" value={`${car.mileage?.toLocaleString()} km`} />
                <QuickSpec icon={<Settings2 size={20}/>} label="Gearbox" value={car.gearbox} />
                <QuickSpec icon={<Fuel size={20}/>} label="Fuel" value={car.fuelType} />
                <QuickSpec icon={<CarFront size={20}/>} label="Body" value={car.bodyType} />
                <QuickSpec icon={<DoorClosed size={20}/>} label="Doors" value={`${car.doors} Doors`} />
                <QuickSpec icon={<Palette size={20}/>} label="Ext. Color" value={car.color} />
              </div>

              {/* Action Stack (Desktop) */}
              <div className="hidden md:flex flex-col gap-4">
                <button 
                  disabled={isSold}
                  className={`w-full py-5 rounded-2xl font-black text-xl transition-all shadow-2xl ${
                    isSold 
                    ? 'bg-gray-100 text-gray-400 cursor-not-allowed shadow-none' 
                    : 'bg-gray-900 text-white hover:bg-black hover:-translate-y-1 active:scale-95 shadow-black/10'
                  }`}
                >
                  {isSold ? 'Vehicle Already Sold' : 'Reserve for $500'}
                </button>
                
                <div className="grid grid-cols-2 gap-4">
                  <button className="flex items-center justify-center gap-3 py-4 rounded-2xl border-2 border-gray-100 font-bold text-gray-800 hover:bg-gray-50 hover:border-gray-200 transition-all">
                    <Phone size={20} />
                    Call Us
                  </button>
                  <button className="flex items-center justify-center gap-3 py-4 rounded-2xl border-2 border-green-100 bg-green-50/30 font-bold text-green-700 hover:bg-green-50 transition-all">
                    <MessageSquare size={20} />
                    WhatsApp
                  </button>
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
            <div className="bg-white p-8 rounded-3xl border shadow-sm">
              <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                <Info size={22} className="text-red-500" />
                Seller's Note
              </h3>
              <p className="text-gray-600 leading-loose text-base">
                {car.description || "Looking for a reliable, well-maintained vehicle? This car is in pristine condition, regularly serviced at authorized centers, and comes with a fresh set of tires. Perfect for families or professionals seeking comfort and safety."}
              </p>
            </div>
          </div>
        </div>
      </main>

      {/* MOBILE CONVERSION BAR (Floating) */}
      <div className="md:hidden fixed bottom-6 left-4 right-4 z-50">
        <div className="bg-white/95 backdrop-blur-xl p-3 rounded-[2rem] shadow-[0_20px_50px_rgba(0,0,0,0.15)] border border-white flex gap-3 items-center">
          <div className="flex-1 pl-4">
             <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest leading-none">Total Price</p>
             <p className="text-xl font-black text-gray-900 leading-none mt-1">${car.price?.toLocaleString()}</p>
          </div>
          <button 
            disabled={isSold}
            className={`flex-[1.5] py-4 rounded-2xl font-black text-sm shadow-xl transition-all active:scale-95 ${
              isSold ? 'bg-gray-200 text-gray-400' : 'bg-red-600 text-white shadow-red-500/20'
            }`}
          >
            {isSold ? 'Sold' : 'Contact Dealer'}
          </button>
        </div>
      </div>
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