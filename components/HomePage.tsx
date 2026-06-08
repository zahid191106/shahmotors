"use client";
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  Search,
  ArrowRight
} from 'lucide-react';

import { 
  SiHonda, 
  SiAudi, 
  SiNissan, 
  SiMazda, 
  SiToyota 
} from '@icons-pack/react-simple-icons';

import { client } from '@/lib/sanity.client';
import { ALL_CARS_QUERY } from '@/lib/sanity.queries';
import { useRouter } from 'next/navigation';
import CarCard from '@/components/CarCard';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import AboutUs from '@/components/AboutUs';
import Blogs from '@/components/Blogs';
import Contact from '@/components/Contact';

const TYPING_QUOTES = [
  'Drive Your Dream Car today',
  'Find Your Dream Car in Galway',
  'Your Next Dream Car Awaits'
];

type Car = {
  _id: string;
  title: string;
  slug: { current: string };
  make: string;
  model: string;
  year: number;
  price: number;
  mileage: number;
  fuelType: string;
  transmission: string;
  images: Array<{ asset: { url: string } }>;
};

export default function HomePage() {
  const [activeBrand, setActiveBrand] = useState('Honda');

  const [currentQuoteIdx, setCurrentQuoteIdx] = useState(0);
  const [displayedText, setDisplayedText] = useState('');
  const [typing, setTyping] = useState(true);

  const [cars, setCars] = useState<Car[]>([]);

  useEffect(() => {
    async function fetchCars() {
      const data = await client.fetch(ALL_CARS_QUERY);
      setCars(data);
    }
    fetchCars();
  }, []);

  useEffect(() => {
    let timeout: NodeJS.Timeout;
    const fullText = TYPING_QUOTES[currentQuoteIdx];
    if (typing) {
      if (displayedText.length < fullText.length) {
        timeout = setTimeout(() => {
          setDisplayedText(fullText.slice(0, displayedText.length + 1));
        }, 50);
      } else {
        setTyping(false);
        timeout = setTimeout(() => {
          setTyping(false);
        }, 1200);
      }
    } else {
      timeout = setTimeout(() => {
        setDisplayedText('');
        setTyping(true);
        setCurrentQuoteIdx((prev) => (prev + 1) % TYPING_QUOTES.length);
      }, 1200);
    }
    return () => clearTimeout(timeout);
  }, [displayedText, typing, currentQuoteIdx]);

  const [dynamicMakes, setDynamicMakes] = useState<string[]>([]);
  const [dynamicModels, setDynamicModels] = useState<string[]>([]);

  useEffect(() => {
    async function fetchFilterData() {
      const data = await client.fetch(`{
        "makes": *[_type == "car" && defined(make)].make,
        "models": *[_type == "car" && defined(model)].model
      }`);

      const getCleanUniqueList = (arr: string[]) => {
        return Array.from(new Set(arr.map(item => item.trim())))
          .sort((a, b) => a.localeCompare(b));
      };

      setDynamicMakes(getCleanUniqueList(data.makes));
      setDynamicModels(getCleanUniqueList(data.models));
    }
    fetchFilterData();
  }, []);

  const router = useRouter();

  const [filters, setFilters] = useState({
    brand: '',
    model: '',
    minPrice: '',
    maxPrice: '',
    minMileage: '',
    maxMileage: '',
    minYear: '',
    maxYear: ''
  });

  const handleSearch = () => {
    const params = new URLSearchParams();

    if (filters.brand) params.set('make', filters.brand.trim());
    if (filters.model) params.set('model', filters.model.trim());
    if (filters.minPrice) params.set('minPrice', filters.minPrice);
    if (filters.maxPrice) params.set('maxPrice', filters.maxPrice);
    if (filters.minYear) params.set('minYear', filters.minYear);
    if (filters.maxYear) params.set('maxYear', filters.maxYear);
    if (filters.minMileage) params.set('minMileage', filters.minMileage);
    if (filters.maxMileage) params.set('maxMileage', filters.maxMileage);

    router.push(`/cars?${params.toString()}`);
  };

  return (
    <div className="min-h-screen bg-white font-sans text-gray-900 overflow-x-hidden">
      <section className="relative bg-[#1a1c23] text-white min-h-[90vh] flex flex-col items-center justify-center px-4 py-12 md:py-20 overflow-hidden">
        <div className="absolute top-1/2 right-[-10%] -translate-y-1/2 w-[60%] h-[60%] bg-red-600/20 blur-[120px] rounded-full pointer-events-none"></div>
        <Navbar />
        <div className="max-w-7xl w-full grid grid-cols-1 lg:grid-cols-2 gap-8 items-center relative z-10 pt-16">
          <div className="space-y-6 md:space-y-8 text-center lg:text-left">
            <h4 className="text-red-500 font-bold uppercase tracking-[0.3em] text-xs md:text-sm">
              Welcome to SHAH MOTORS!
            </h4>
            <h1 className="text-5xl md:text-6xl font-black leading-none tracking-tight min-h-18 md:min-h-22">
              {(() => {
                const match = displayedText.match(/(.*)(Dream)(.*)/i);
                if (match) {
                  return <>{match[1]}<span className="text-red-600">{match[2]}</span>{match[3]}</>;
                }
                return displayedText;
              })()}
              <span className="border-r-2 border-red-600 ml-1 animate-pulse" style={{display: 'inline-block', width: '1ch', height: '1em', verticalAlign: 'middle'}} />
            </h1>
            <p className="text-gray-300 max-w-lg mx-auto lg:mx-0 leading-relaxed text-lg">
              Discover a premium selection of quality used cars in Galway. At Shah Motors, we make finding, financing, and driving your next vehicle seamless, transparent, and completely hassle-free.
            </p>
            <div className="hidden md:flex flex-wrap justify-center lg:justify-start gap-4 pt-4">
              <Link href="/about" className="bg-red-600 hover:bg-red-700 px-10 py-4 rounded-md font-bold flex items-center transition-all group">
                About US <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link href="/cars" className="bg-white text-gray-900 hover:bg-gray-100 px-10 py-4 rounded-md font-bold flex items-center transition-all group">
                View All Cars <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
          <div className="relative flex justify-center items-center h-full animate-car-flow will-change-transform">
            <img 
              src="./images/car-02.png" 
              alt="Transparent Red Sports Car"
              className="w-full md:min-w-4xl drop-shadow-[0_35px_35px_rgba(0,0,0,0.6)] transform lg:scale-125 lg:-translate-x-10 motion-safe:animate-pulse duration-3000"
            />
          </div>
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-4 -mt-16 relative z-10">
        <div className="bg-white shadow-[0_20px_60px_-15px_rgba(0,0,0,0.2)] rounded-2xl p-8 lg:p-10 border border-gray-100">
          <h3 className="text-2xl font-bold mb-8">Let's Find Your Perfect Car</h3>
          <div className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="space-y-2">
                <label className="text-xs font-black text-gray-400 uppercase tracking-widest">Select Brand</label>
                <select 
                  onChange={(e) => setFilters({...filters, brand: e.target.value})}
                  className="w-full border-b-2 border-gray-200 py-3 font-semibold outline-none focus:border-red-500 transition-colors bg-transparent"
                >
                  <option value="">All Brands</option>
                  {dynamicMakes.map((make) => (
                    <option key={make} value={make}>{make}</option>
                  ))}
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-xs font-black text-gray-400 uppercase tracking-widest">Select Model</label>
                <select 
                  onChange={(e) => setFilters({...filters, model: e.target.value})}
                  className="w-full border-b-2 border-gray-200 py-3 font-semibold outline-none focus:border-red-500 transition-colors bg-transparent"
                >
                  <option value="">Any Model</option>
                  {dynamicModels.map((model) => (
                    <option key={model} value={model}>{model}</option>
                  ))}
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-xs font-black text-gray-400 uppercase tracking-widest">Min Price (€)</label>
                <input 
                  type="number" 
                  placeholder="10,000" 
                  onChange={(e) => setFilters({...filters, minPrice: e.target.value})}
                  className="w-full border-b-2 border-gray-200 py-3 font-semibold outline-none focus:border-red-500 transition-colors" 
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-black text-gray-400 uppercase tracking-widest">Max Price (€)</label>
                <input 
                  type="number" 
                  placeholder="500,000" 
                  onChange={(e) => setFilters({...filters, maxPrice: e.target.value})}
                  className="w-full border-b-2 border-gray-200 py-3 font-semibold outline-none focus:border-red-500 transition-colors" 
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 items-end">
              <div className="space-y-2 lg:col-span-1">
                <label className="text-xs font-black text-gray-400 uppercase tracking-widest">Min Mileage</label>
                <input 
                  type="number" 
                  placeholder="0" 
                  onChange={(e) => setFilters({...filters, minMileage: e.target.value})}
                  className="w-full border-b-2 border-gray-200 py-3 font-semibold outline-none focus:border-red-500 transition-colors" 
                />
              </div>
              <div className="space-y-2 lg:col-span-1">
                <label className="text-xs font-black text-gray-400 uppercase tracking-widest">Max Mileage</label>
                <input 
                  type="number" 
                  placeholder="100,000" 
                  onChange={(e) => setFilters({...filters, maxMileage: e.target.value})}
                  className="w-full border-b-2 border-gray-200 py-3 font-semibold outline-none focus:border-red-500 transition-colors" 
                />
              </div>
              <div className="space-y-2 lg:col-span-1">
                <label className="text-xs font-black text-gray-400 uppercase tracking-widest">Min Year</label>
                <input 
                  type="number" 
                  placeholder="2015" 
                  onChange={(e) => setFilters({...filters, minYear: e.target.value})}
                  className="w-full border-b-2 border-gray-200 py-3 font-semibold outline-none focus:border-red-500 transition-colors" 
                />
              </div>
              <div className="space-y-2 lg:col-span-1">
                <label className="text-xs font-black text-gray-400 uppercase tracking-widest">Max Year</label>
                <input 
                  type="number" 
                  placeholder="2024" 
                  onChange={(e) => setFilters({...filters, maxYear: e.target.value})}
                  className="w-full border-b-2 border-gray-200 py-3 font-semibold outline-none focus:border-red-500 transition-colors" 
                />
              </div>
              <button 
                onClick={handleSearch}
                className="w-full bg-red-600 text-white h-14 rounded-xl font-black cursor-pointer uppercase tracking-widest flex items-center justify-center space-x-3 hover:bg-red-700 transition-all shadow-lg shadow-red-200 active:scale-95"
              >
                <Search className="w-5 h-5" />
                <span>Search Now</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <section className="bg-gray-50/50 py-24 px-6">
        <div className="max-w-7xl mx-auto text-center space-y-6">
          <p className="text-red-600 font-black uppercase tracking-[0.3em] text-sm">TRUSTED LOCAL SIMI DEALER</p>
          <h2 className="text-5xl font-black tracking-tight">Explore Our Top Deals on Used Cars in Galway</h2>
          <p className="text-gray-600 max-w-5xl mx-auto leading-relaxed text-sm md:text-base">
            Looking for reliable, premium used cars in Galway? At Shah Motors, we stock a premier selection of hand-picked, certified second-hand cars in Ireland to suit every budget and lifestyle. 
            Whether you are searching for an eco-friendly hybrid city commuter, a family-ready SUV, or a premium executive saloon, our vehicles undergo rigorous mechanical checks and come fully valeted, 
            warrantied, and history-verified. Browse our latest arrivals today and ask about our flexible car finance options in Galway to get you on the road faster.
          </p>
          <div className="flex justify-center items-center space-x-3 opacity-30">
            <div className="w-12 h-1 bg-red-600"></div>
            <div className="w-4 h-4 border-2 border-red-600 rounded-full flex items-center justify-center">
                <div className="w-1.5 h-1.5 bg-red-600 rounded-full"></div>
            </div>
            <div className="w-12 h-1 bg-red-600"></div>
          </div>
          <div className="flex justify-end items-center">
            <Link href="/cars" className='text-red-600 font-semibold'>View All Cars &gt; &gt;</Link>
          </div>
          {cars.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 text-left">
              {cars
                .slice(0, 6)
                .map(car => (
                  <CarCard key={car._id} car={car} />
              ))}
            </div>
          ) : (
            <div className="w-full py-16 flex flex-col items-center justify-center space-y-6 rounded-[2rem] border border-red-100 bg-red-50/80">
              <div className="w-64 h-64 rounded-full bg-red-100 flex items-center justify-center">
                <img src="images/pic1.png" alt="No cars found" className="w-full h-full" />
              </div>
              <div className="text-center max-w-2xl">
                <h3 className="text-3xl font-black text-gray-900">No cars available right now</h3>
                <p className="mt-3 text-sm md:text-base text-slate-600">Our showroom is being updated. If you have a specific car in mind, contact us and we’ll source it for you.</p>
              </div>
              <div className="flex flex-col sm:flex-row gap-3">
                <Link href="/cars" className="px-6 py-3 rounded-md bg-white text-red-600 border border-red-600 font-semibold hover:bg-red-50 transition">
                  View Cars Later
                </Link>
                <Link href="/contact" className="px-6 py-3 rounded-md bg-red-600 text-white font-semibold hover:bg-red-700 transition">
                  Contact Dealer
                </Link>
              </div>
            </div>
          )}
          {cars.length > 0 ? (
            <div className="flex justify-center items-center space-x-3 pt-2">
              <Link href="/cars" className="w-full hover:bg-red-700 text-red-600 hover:text-white px-6 py-3 rounded-xl font-black uppercase tracking-widest transition-all shadow-lg shadow-red-200">
                View All Cars
              </Link>
            </div>
          ) : null}
        </div>
      </section>

      <AboutUs />
      <Blogs />
      <Contact />

      <section className="bg-white py-24 px-6">
        <div className="max-w-7xl mx-auto flex flex-col items-end relative">
          <img 
            src="./images/pic1.png" 
            alt="Yellow Camaro"
            className="absolute -left-30 top-0 w-2xl hidden xl:block opacity-90 drop-shadow-2xl"
          />
          <div className="text-center space-y-6 max-w-3xl z-10">
            <p className="text-red-600 font-black uppercase tracking-[0.3em] text-xs md:text-sm">
              Stay In The Loop
            </p>
            <h2 className="text-4xl md:text-5xl font-black tracking-tight">Subscribe to the Shah Motors Newsletter</h2>
            <p className="text-gray-500 max-w-2xl mx-auto lg:mx-0 leading-relaxed text-base">
              Be the very first to know when certified new arrivals hit our showroom. Subscribe today 
              to receive exclusive luxury fleet updates, immediate price drops, and expert motoring guides 
              delivered straight to your inbox.
            </p>
            <div className="flex flex-col sm:flex-row gap-0 mt-10 w-full rounded-2xl overflow-hidden shadow-2xl border border-gray-100">
              <input 
                type="email" 
                placeholder="Your Email Address..." 
                className="flex-1 px-8 py-5 outline-none text-gray-700 text-lg bg-gray-50 focus:bg-white transition-all"
              />
              <button className="bg-[#ff6b52] hover:bg-[#ff563a] text-white px-10 py-5 font-black uppercase tracking-widest transition-all">
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
