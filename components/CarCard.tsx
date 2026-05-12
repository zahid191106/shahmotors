import Link from 'next/link'
import Image from 'next/image'
import { urlFor } from '@/lib/sanity.client'
import { 
  Search, 
  MapPin, 
  Phone, 
  Mail, 
  ArrowRight, 
  ChevronLeft, 
  ChevronRight,
  Heart,
  Settings,
  Zap,
  Droplet,
  Gauge,
  Clock,
  MessageCircle
} from 'lucide-react';

export default function CarCard({ car }: { car: any }) {
  // Support both array and single object for images
  const firstImage = Array.isArray(car.images) ? car.images[0] : car.images;

  return (
    <Link href={`/cars/${car.slug.current}`}>
      {/* <div className="border rounded-lg overflow-hidden shadow hover:shadow-lg transition">
        {firstImage && (
          <div className="relative h-48 w-full">
            <Image
              src={urlFor(firstImage).url()}
              alt={car.title}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          </div>
        )}
        <div className="p-4">
          <h3 className="text-xl font-bold">{car.title}</h3>
          <p className="text-gray-600">{car.year} {car.make} {car.model}</p>
          <p className="text-green-600 font-bold text-lg mt-2">
            ${car.price.toLocaleString()}
          </p>
          <div className="mt-2 flex gap-2 text-sm text-gray-500">
            <span>{car.mileage?.toLocaleString()} mi</span>
            <span>•</span>
            <span>{car.gearbox}</span>
            <span>•</span>
            <span>{car.fuelType}</span>
          </div>
        </div>
      </div> */}

      {/* --- CAR EXPLORER SECTION --- */}
      <div className="bg-white rounded-xl h-full overflow-hidden shadow-[0_15px_40px_-10px_rgba(0,0,0,0.1)] border border-gray-100 group transition-all hover:-translate-y-2">
        <div className="relative group h-72 overflow-hidden flex items-center justify-center transition-colors group-hover:bg-gray-100">
          <p className="absolute top-0 left-0 bg-red-600 text-white py-1 px-3 font-black uppercase tracking-widest">
            {car.year}
          </p>
          {/* sold overlay when car is sold  */}
          {car.availability === 'sold' && (
            <div className="absolute top-4 right-4 z-20 pointer-events-none">
              <svg width="120" height="120" viewBox="0 0 400 400" className="drop-shadow-xl" xmlns="http://www.w3.org/2000/svg">
                <defs>
                  <radialGradient id="redGrad" cx="50%" cy="50%" r="50%">
                    <stop offset="0%" stopColor="#ff5a5a"/>
                    <stop offset="100%" stopColor="#b30000"/>
                  </radialGradient>
                </defs>
                <g transform="rotate(-15 200 200)">
                  <polygon 
                    points="200,25 225,70 275,45 285,95 335,85 320,135 370,155 335,195 375,230 325,245 340,295 290,290 280,340 230,315 200,370 170,315 120,340 110,290 60,295 75,245 25,230 65,195 30,155 80,135 65,85 115,95 125,45 175,70" 
                    fill="url(#redGrad)" 
                    stroke="#fff" 
                    strokeWidth="10"
                  />
                  <text x="200" y="225" textAnchor="middle" fontFamily="Arial Black, sans-serif" fontSize="70" fontWeight="900" fill="white">
                    SOLD
                  </text>
                </g>
              </svg>
            </div>
          )}
          
          {firstImage && (
            <div className="relative h-48 w-full">
              <Image
                src={urlFor(firstImage).url()}
                alt={car.title}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
            </div>
          )}
        </div>
        <div className="p-8 space-y-6">
          <h3 className="text-2xl font-black tracking-tight h-[64px]">{car.title.length > 40 ? car.title.slice(0, 40) + " ..." : car.title}</h3>
          <div className="flex justify-between items-center py-4 border-y border-gray-100">
            <div className="flex items-baseline gap-1">
              <span className="text-3xl font-black text-red-600">€{car.price.toLocaleString()}</span>
            </div>
            <div className="flex items-baseline gap-1">
              <span className="text-xs font-black text-gray-400 uppercase">{car.make}</span>
            </div>
          </div>
          
          {/* Specs with specific icons from images */}
          <div className="flex justify-between text-gray-500 font-bold text-sm">
            <div className="flex items-center gap-2">
              <Gauge className="w-5 h-5 text-red-500" />
              {car.mileage?.toLocaleString()} km
            </div>
            <div className="flex items-center gap-2">
              <Settings className="w-5 h-5 text-red-500" />
              {/* <svg className="w-4 h-4 text-red-500" width="100%" height="100%" viewBox="0 0 18 18" fill="none">
                <path id="Path" d="M15.75 0C14.5073 0 13.5 1.00733 13.5 2.25C13.5 3.08227 13.9531 3.80723 14.625 4.19648V7.875H10.6875H10.125V4.19648C10.337 4.07363 10.5266 3.91748 10.6875 3.73478C11.0365 3.33833 11.25 2.8197 11.25 2.25C11.25 1.00733 10.2427 0 9 0C7.75733 0 6.75 1.00733 6.75 2.25C6.75 3.08227 7.20315 3.80723 7.875 4.19648V7.875H3.375V4.19648C4.04685 3.80723 4.5 3.08227 4.5 2.25C4.5 1.00733 3.49267 0 2.25 0C1.00733 0 0 1.00733 0 2.25C0 3.08227 0.45315 3.80723 1.125 4.19648V13.8033C0.45315 14.1925 0 14.9175 0 15.7498C0 16.9924 1.00733 17.9998 2.25 17.9998C3.49267 17.9998 4.5 16.9924 4.5 15.7498C4.5 14.9175 4.04685 14.1923 3.375 13.8033V10.125H7.875V13.8035C7.20315 14.1928 6.75 14.9177 6.75 15.75C6.75 16.9927 7.75733 18 9 18C10.2427 18 11.25 16.9927 11.25 15.75C11.25 15.1803 11.0365 14.6617 10.6875 14.2652C10.5266 14.0825 10.337 13.9264 10.125 13.8035V10.125H10.6875H15.75C16.3712 10.125 16.875 9.62122 16.875 9V4.19648C17.5469 3.80723 18 3.08227 18 2.25C18 1.00733 16.9927 0 15.75 0Z" fill="#666666"></path>
              </svg> */}
              {car.gearbox}
            </div>
            <div className="flex items-center gap-2">
              <Droplet className="w-5 h-5 text-red-500" />
              {car.fuelType}
            </div>
          </div>

          <button className="w-full bg-red-600 hover:bg-red-700 cursor-pointer text-white py-5 rounded-2xl font-black uppercase tracking-widest transition-all shadow-xl shadow-red-100 active:scale-95">
            View Details
          </button>
        </div>
      </div>
    </Link>
  )
}