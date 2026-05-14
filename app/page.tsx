"use client";
import React, { useState, useEffect } from 'react';
// Typing animation quotes
const TYPING_QUOTES = [
  'Best way to find your dream car',
  'You can find No.1 cars here',
  'You can become your dream car owner',
];

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

import { 
  SiHonda, 
  SiAudi, 
  SiNissan, 
  SiMazda, 
  SiToyota 
} from '@icons-pack/react-simple-icons';
import path from 'path/win32';

import { client } from '@/lib/sanity.client';
import { ALL_CARS_QUERY } from '@/lib/sanity.queries';
import { useRouter } from 'next/navigation'; // Make sure it is 'next/navigation', not 'next/router'
import CarCard from '@/components/CarCard';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import AboutUs from '@/components/AboutUs';
import Blogs from '@/components/Blogs';
import Contact from '@/components/Contact';

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

export default function App() {

  const [activeBrand, setActiveBrand] = useState('Honda');

  // Typing animation state
  const [currentQuoteIdx, setCurrentQuoteIdx] = useState(0);
  const [displayedText, setDisplayedText] = useState('');
  const [typing, setTyping] = useState(true);

  // Fetch cars from Sanity
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
      // 1. Fetch the raw lists (may contain duplicates with spaces)
      const data = await client.fetch(`{
        "makes": *[_type == "car" && defined(make)].make,
        "models": *[_type == "car" && defined(model)].model
      }`);
      
      // 2. This helper function trims spaces and then uses "Set" to remove duplicates
      const getCleanUniqueList = (arr: string[]) => {
        return Array.from(new Set(arr.map(item => item.trim())))
          .sort((a, b) => a.localeCompare(b));
      };

      // 3. Set the cleaned lists to your state
      setDynamicMakes(getCleanUniqueList(data.makes));
      setDynamicModels(getCleanUniqueList(data.models));
    }
    fetchFilterData();
  }, []);

  const router = useRouter();

  // State for all filters
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

    // Mapping your local state keys to the URL parameter names your Car Page expects
    if (filters.brand) params.set('make', filters.brand.trim());
    if (filters.model) params.set('model', filters.model.trim());
    if (filters.minPrice) params.set('minPrice', filters.minPrice);
    if (filters.maxPrice) params.set('maxPrice', filters.maxPrice);
    if (filters.minYear) params.set('minYear', filters.minYear);
    if (filters.maxYear) params.set('maxYear', filters.maxYear);
    if (filters.minMileage) params.set('minMileage', filters.minMileage);
    if (filters.maxMileage) params.set('maxMileage', filters.maxMileage);

    // Redirect to the /cars page with the query string
    // Note: Check if your folder is named 'car' or 'cars' and adjust below
    router.push(`/cars?${params.toString()}`);
  };

  return (
    <div className="min-h-screen bg-white font-sans text-gray-900 overflow-x-hidden">
      
      {/* --- HERO SECTION --- */}
      <section className="relative bg-[#1a1c23] text-white min-h-[90vh] flex flex-col items-center justify-center px-4 py-12 md:py-20 overflow-hidden">
        {/* Background Decorative Red Glow */}
        <div className="absolute top-1/2 right-[-10%] -translate-y-1/2 w-[60%] h-[60%] bg-red-600/20 blur-[120px] rounded-full pointer-events-none"></div>

        {/* Navbar */}
        <Navbar />
        <div className="max-w-7xl w-full grid grid-cols-1 lg:grid-cols-2 gap-8 items-center relative z-10 pt-16">
          {/* Left Content */}
          <div className="space-y-6 md:space-y-8 text-center lg:text-left">
            <h4 className="text-red-500 font-bold uppercase tracking-[0.3em] text-xs md:text-sm">
              Welcome to Motex!
            </h4>
            <h1 className="text-5xl md:text-6xl font-black leading-none tracking-tight min-h-18 md:min-h-22">
              {/* Typing animation with color for 'Dream' if present */}
              {(() => {
                // Highlight 'Dream' if present in the text
                const match = displayedText.match(/(.*)(Dream)(.*)/i);
                if (match) {
                  return <>{match[1]}<span className="text-red-600">{match[2]}</span>{match[3]}</>;
                }
                return displayedText;
              })()}
              <span className="border-r-2 border-red-600 ml-1 animate-pulse" style={{display: 'inline-block', width: '1ch', height: '1em', verticalAlign: 'middle'}} />
            </h1>
            <p className="text-gray-400 max-w-lg mx-auto lg:mx-0 leading-relaxed text-lg">
              There are many variations of passages orem ipsum available but the majority have suffered alteration in some form.
            </p>
            <div className="hidden md:flex flex-wrap justify-center lg:justify-start gap-4 pt-4">
              <a href="#about" className="bg-red-600 hover:bg-red-700 px-10 py-4 rounded-md font-bold flex items-center transition-all group">
                About US <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </a>
              <a href="/cars" className="bg-white text-gray-900 hover:bg-gray-100 px-10 py-4 rounded-md font-bold flex items-center transition-all group">
                View All Cars <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </a>
            </div>
          </div>

          {/* Hero Car Image (No Background) */}
          <div className="relative flex justify-center items-center h-full animate-car-flow will-change-transform">
            <img 
              src="./images/car-02.png" 
              alt="Transparent Red Sports Car"
              className="w-full md:min-w-4xl drop-shadow-[0_35px_35px_rgba(0,0,0,0.6)] transform lg:scale-125 lg:-translate-x-10 motion-safe:animate-pulse duration-3000"
            />
          </div>
        </div>

        {/* Carousel Indicators/Controls */}
        {/* <div className="absolute left-8 bottom-1/2 -translate-y-1/2 hidden xl:flex flex-col gap-4">
            <button className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center hover:bg-red-600 hover:border-red-600 transition-all">
                <ChevronLeft className="w-6 h-6" />
            </button>
        </div>
        <div className="absolute right-8 bottom-1/2 -translate-y-1/2 hidden xl:flex flex-col gap-4">
            <button className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center hover:bg-red-600 hover:border-red-600 transition-all">
                <ChevronRight className="w-6 h-6" />
            </button>
        </div> */}
      </section>

      {/* --- QUICK SEARCH BAR --- */}
      <div className="max-w-6xl mx-auto px-4 -mt-16 relative z-10">
        <div className="bg-white shadow-[0_20px_60px_-15px_rgba(0,0,0,0.2)] rounded-2xl p-8 lg:p-10 border border-gray-100">
          <h3 className="text-2xl font-bold mb-8">Let's Find Your Perfect Car</h3>
          
          <div className="space-y-8">
            {/* Row 1: Brand, Model, Price */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="space-y-2">
                <label className="text-xs font-black text-gray-400 uppercase tracking-widest">Select Brand</label>
                <select 
                  onChange={(e) => setFilters({...filters, brand: e.target.value})}
                  className="w-full border-b-2 border-gray-200 py-3 font-semibold outline-none focus:border-red-500 transition-colors bg-transparent"
                >
                  <option value="">All Brands</option>
                  {/* Map over dynamicMakes instead of BRAND_DATA */}
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
                <label className="text-xs font-black text-gray-400 uppercase tracking-widest">Min Price (SAR)</label>
                <input 
                  type="number" 
                  placeholder="10,000" 
                  onChange={(e) => setFilters({...filters, minPrice: e.target.value})}
                  className="w-full border-b-2 border-gray-200 py-3 font-semibold outline-none focus:border-red-500 transition-colors" 
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-black text-gray-400 uppercase tracking-widest">Max Price (SAR)</label>
                <input 
                  type="number" 
                  placeholder="500,000" 
                  onChange={(e) => setFilters({...filters, maxPrice: e.target.value})}
                  className="w-full border-b-2 border-gray-200 py-3 font-semibold outline-none focus:border-red-500 transition-colors" 
                />
              </div>
            </div>

            {/* Row 2: Mileage and Year */}
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

      {/* --- CAR EXPLORER SECTION --- */}
      <section className="bg-gray-50/50 py-24 px-6">
        <div className="max-w-7xl mx-auto text-center space-y-6">
          <p className="text-red-600 font-black uppercase tracking-[0.3em] text-sm">Top Rated Dealer</p>
          <h2 className="text-5xl font-black tracking-tight">Explore Our Top Deal</h2>
          
          {/* Decorative Divider */}
          <div className="flex justify-center items-center space-x-3 opacity-30">
            <div className="w-12 h-1 bg-red-600"></div>
            <div className="w-4 h-4 border-2 border-red-600 rounded-full flex items-center justify-center">
                <div className="w-1.5 h-1.5 bg-red-600 rounded-full"></div>
            </div>
            <div className="w-12 h-1 bg-red-600"></div>
          </div>
          <div className="flex justify-end items-center">
            <a href="/cars" className='text-red-600 font-semibold'>View All Cars &gt; &gt;</a>
          </div>

          {/* Car Grid with Transparent PNGs */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 text-left">
            {cars
              .slice(0, 6)
              .map(car => (
                <CarCard key={car._id} car={car} />
            ))}
          </div>

          {/* Pagination Indicators */}
          <div className="flex justify-center items-center space-x-3 pt-2">
            <a href="/cars" className="w-full hover:bg-red-700 text-red-600 hover:text-white px-6 py-3 rounded-xl font-black uppercase tracking-widest transition-all shadow-lg shadow-red-200">
              View All Cars
            </a>
          </div>
        </div>
      </section>

      {/* --- ABOUT SECTION --- */}
      <AboutUs />

      {/* BLOGS SECTION */}
      <Blogs />

      {/* CONTACT US SECTION */}
      <Contact />

      {/* --- NEWSLETTER SECTION --- */}
      <section className="bg-white py-32 px-6">
        <div className="max-w-7xl mx-auto flex flex-col items-center relative">
          {/* Transparent Decorative Car like in image */}
          <img 
            src="./images/pic1.png" 
            alt="Yellow Camaro"
            className="absolute -left-32 top-0 w-md hidden xl:block opacity-90 drop-shadow-2xl"
          />
          
          <div className="text-center space-y-6 max-w-xl z-10">
            <h2 className="text-5xl font-black tracking-tight">Newsletter</h2>
            <p className="text-gray-500 text-lg">Subscribe to our newsletter and stay updated with our latest offers and luxury fleet updates.</p>
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

      {/* --- FOOTER --- */}
      <Footer />
    </div>
  );
}