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
  Clock
} from 'lucide-react';

import { 
  SiHonda, 
  SiAudi, 
  SiNissan, 
  SiMazda, 
  SiToyota 
} from '@icons-pack/react-simple-icons';

// Mock Data with Transparent PNGs (using high-quality placeholders that mimic the "no background" look)
// const BRANDS = ['Honda', 'Audi', 'Nissan', 'Mazda', 'Toyota'];
const BRAND_DATA = [
  { name: 'Honda', icon: SiHonda },
  { name: 'Audi', icon: SiAudi },
  { name: 'Nissan', icon: SiNissan },
  { name: 'Mazda', icon: SiMazda },
  { name: 'Toyota', icon: SiToyota },
];

const CARS = [
  {
    id: 1,
    brand: 'Honda',
    name: 'Honda Accord 5 Seater Car',
    dayPrice: 50,
    monthPrice: 1500,
    specs: { mileage: '20k', trans: 'Auto', fuel: 'Petrol' },
    image: './images/pic1.png'
  },
  {
    id: 2,
    brand: 'Honda',
    name: 'Honda City 5 Seater Car',
    dayPrice: 50,
    monthPrice: 1500,
    specs: { mileage: '20k', trans: 'Auto', fuel: 'Petrol' },
    image: './images/pic2.png'
  },
  {
    id: 3,
    brand: 'Honda',
    name: 'Honda CRV 7 Seater Car',
    dayPrice: 50,
    monthPrice: 1500,
    specs: { mileage: '20k', trans: 'Auto', fuel: 'Petrol' },
    image: './images/pic3.png'
  },
  {
    id: 3,
    brand: 'Honda',
    name: 'Honda CRV 7 Seater Car',
    dayPrice: 50,
    monthPrice: 1500,
    specs: { mileage: '20k', trans: 'Auto', fuel: 'Petrol' },
    image: './images/pic4.png'
  },
  {
    id: 3,
    brand: 'Honda',
    name: 'Honda CRV 7 Seater Car',
    dayPrice: 50,
    monthPrice: 1500,
    specs: { mileage: '20k', trans: 'Auto', fuel: 'Petrol' },
    image: './images/pic5.png'
  },
  {
    id: 3,
    brand: 'Honda',
    name: 'Honda CRV 7 Seater Car',
    dayPrice: 50,
    monthPrice: 1500,
    specs: { mileage: '20k', trans: 'Auto', fuel: 'Petrol' },
    image: './images/pic6.png'
  }
  
];

export default function App() {

  const [activeBrand, setActiveBrand] = useState('Honda');
  const [navOpen, setNavOpen] = useState(false);

  // Typing animation state
  const [currentQuoteIdx, setCurrentQuoteIdx] = useState(0);
  const [displayedText, setDisplayedText] = useState('');
  const [typing, setTyping] = useState(true);

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

  return (
    <div className="min-h-screen bg-white font-sans text-gray-900 overflow-x-hidden">
      
      {/* --- HERO SECTION --- */}
      <section className="relative bg-[#1a1c23] text-white min-h-[90vh] flex flex-col items-center justify-center px-4 py-12 md:py-20 overflow-hidden">
        {/* Background Decorative Red Glow */}
        <div className="absolute top-1/2 right-[-10%] -translate-y-1/2 w-[60%] h-[60%] bg-red-600/20 blur-[120px] rounded-full pointer-events-none"></div>

        {/* Navbar */}
        <nav className="absolute top-0 w-full max-w-7xl px-6 py-8 flex justify-between items-center z-30">
          {/* Logo */}
          <div className="text-2xl font-black tracking-tighter italic flex items-center gap-2">
            <span className="text-red-600 text-3xl">SHAH</span>MOTORS
          </div>
          {/* Desktop Nav Links */}
          <div className="hidden md:flex space-x-10 font-bold text-sm uppercase tracking-wider">
            <a href="#" className="text-red-500">Home</a>
            <a href="#" className="hover:text-red-400 transition-colors">About Us</a>
            <a href="#" className="hover:text-red-400 transition-colors">Cars List</a>
            <a href="#" className="hover:text-red-400 transition-colors">Services</a>
            <a href="#" className="hover:text-red-400 transition-colors">Blogs</a>
          </div>
          {/* Desktop Contact Button */}
          <button className="hidden md:block bg-red-600 text-white px-8 py-2.5 uppercase rounded shadow-lg shadow-red-600/20 font-bold hover:bg-red-700 transition-all active:scale-95">
            Contact US
          </button>
          {/* Mobile Hamburger Icon */}
          <button
            className="md:hidden flex items-center justify-center p-2 rounded focus:outline-none focus:ring-2 focus:ring-red-500"
            aria-label="Open menu"
            onClick={() => setNavOpen(true)}
          >
            {/* SVG Hamburger icon */}
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-red-600">
              <line x1="4" y1="6" x2="20" y2="6" />
              <line x1="4" y1="12" x2="20" y2="12" />
              <line x1="4" y1="18" x2="20" y2="18" />
            </svg>
          </button>
          {/* Mobile Nav Overlay */}
          {navOpen && (
            <div className="fixed inset-0 z-50 bg-white flex flex-col animate-fade-in">
              <style>{`
                @keyframes fade-in {
                  0% { opacity: 0; }
                  100% { opacity: 1; }
                }
                .animate-fade-in {
                  animation: fade-in 0.2s cubic-bezier(0.4,0,0.2,1);
                }
              `}</style>
              <div className="flex items-center justify-between px-6 py-6 border-b border-gray-100">
                <div className="text-2xl font-black tracking-tighter italic flex items-center gap-2 text-gray-900">
                  <span className="text-red-600 text-3xl">SHAH</span>MOTORS
                </div>
                <button
                  className="p-2 rounded focus:outline-none focus:ring-2 focus:ring-red-500"
                  aria-label="Close menu"
                  onClick={() => setNavOpen(false)}
                >
                  {/* SVG X icon */}
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-red-600">
                    <line x1="18" y1="6" x2="6" y2="18" />
                    <line x1="6" y1="6" x2="18" y2="18" />
                  </svg>
                </button>
              </div>
              <nav className="flex flex-col gap-2 px-8 py-8 font-bold text-lg uppercase tracking-wider text-gray-900 flex-1">
                <a href="#" className="py-3 px-2 rounded hover:bg-red-50 text-red-600 font-extrabold transition-colors" onClick={() => setNavOpen(false)}>Home</a>
                <a href="#" className="py-3 px-2 rounded hover:bg-red-50 transition-colors" onClick={() => setNavOpen(false)}>About Us</a>
                <a href="#" className="py-3 px-2 rounded hover:bg-red-50 transition-colors" onClick={() => setNavOpen(false)}>Cars List</a>
                <a href="#" className="py-3 px-2 rounded hover:bg-red-50 transition-colors" onClick={() => setNavOpen(false)}>Services</a>
                <div className="flex flex-col gap-2 w-full">
                  <a href="#" className="py-3 px-2 rounded hover:bg-red-50 transition-colors" onClick={() => setNavOpen(false)}>Blogs</a>
                  <button className="w-full bg-red-600 text-white px-8 py-4 uppercase rounded-xl shadow-lg shadow-red-600/20 font-bold hover:bg-red-700 transition-all active:scale-95 text-base tracking-widest mt-2" onClick={() => setNavOpen(false)}>
                    Contact US
                  </button>
                </div>
              </nav>
            </div>
          )}
        </nav>

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
              <button className="bg-red-600 hover:bg-red-700 px-10 py-4 rounded-md font-bold flex items-center transition-all group">
                About More <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
              <button className="bg-white text-gray-900 hover:bg-gray-100 px-10 py-4 rounded-md font-bold flex items-center transition-all group">
                Learn More <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
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
        <div className="bg-white shadow-[0_20px_60px_-15px_rgba(0,0,0,0.2)] rounded-2xl p-10 border border-gray-100">
          <h3 className="text-2xl font-bold mb-8">Let's Find Your Perfect Car</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="space-y-2">
              <label className="text-xs font-black text-gray-400 uppercase tracking-widest">Select Brand</label>
              <select className="w-full border-b-2 border-gray-200 py-3 font-semibold outline-none focus:border-red-500 transition-colors bg-transparent">
                <option>All Brands</option>
                {BRAND_DATA.map(b => <option key={b.name}>{b.name}</option>)}
              </select>
            </div>
            <div className="space-y-2">
              <label className="text-xs font-black text-gray-400 uppercase tracking-widest">Select Model</label>
              <select className="w-full border-b-2 border-gray-200 py-3 font-semibold outline-none focus:border-red-500 transition-colors bg-transparent">
                <option>Any Model</option>
              </select>
            </div>
            <div className="space-y-2">
              <label className="text-xs font-black text-gray-400 uppercase tracking-widest">Min Price</label>
              <input type="text" placeholder="$10,000" className="w-full border-b-2 border-gray-200 py-3 font-semibold outline-none focus:border-red-500 transition-colors" />
            </div>
            <div className="flex items-end">
              <button className="w-full bg-red-600 text-white h-14 rounded-xl font-black uppercase tracking-widest flex items-center justify-center space-x-3 hover:bg-red-700 transition-all shadow-lg shadow-red-200 active:scale-95">
                <Search className="w-5 h-5" />
                <span>Search Now</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* --- ABOUT SECTION --- */}
      <section className="py-32 px-6 max-w-7xl mx-auto overflow-visible">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          {/* About Image with Transparent Silhouette */}
          <div className="relative">
            {/* The Solid Red Circle from the screenshot */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 sm:w-md sm:h-112 bg-red-600 rounded-full z-0"></div>
            
            <img 
              src="./images/car-03.png" 
              alt="Transparent Acura"
              className="relative z-10 w-full max-w-xl mx-auto transform scale-125"
            />
            
            {/* 30 Years Badge */}
            <div className="absolute -top-10 -left-4 sm:left-0 z-20 bg-[#1a1c23] text-white p-5 rounded-2xl flex items-center space-x-4 shadow-2xl border border-white/10">
              <div className="bg-red-600 p-3 rounded-xl shadow-inner">
                <Settings className="w-7 h-7 text-white" />
              </div>
              <div className="text-sm font-black uppercase tracking-tight">
                30 Years Of <br />
                <span className="text-gray-400 font-normal normal-case">Quality Service</span>
              </div>
            </div>
          </div>

          {/* About Text Content */}
          <div className="space-y-8">
            <div className="flex items-center text-red-600 font-black uppercase tracking-[0.2em] text-sm">
              <div className="w-8 h-1 bg-red-600 mr-3 rounded-full"></div> ABOUT US
            </div>
            <h2 className="text-4xl md:text-6xl font-black leading-[1.1] tracking-tight">
              World Largest <span className="text-red-600">Car Dealer</span> Marketplace.
            </h2>
            <p className="text-gray-500 text-lg leading-relaxed">
              There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour.
            </p>
            <ul className="space-y-5">
              {[
                "At vero eos et accusamus et iusto odio.",
                "Established fact that a reader will be distracted.",
                "Sed ut perspiciatis unde omnis iste natus sit."
              ].map((text, i) => (
                <li key={i} className="flex items-center text-gray-800 font-bold text-lg">
                  <div className="w-6 h-6 rounded-full border-2 border-red-600 flex items-center justify-center mr-4 shrink-0">
                    <div className="w-2.5 h-2.5 bg-red-600 rounded-full"></div>
                  </div>
                  {text}
                </li>
              ))}
            </ul>
            <button className="bg-red-600 hover:bg-red-700 text-white px-10 py-5 rounded-xl font-black uppercase tracking-widest flex items-center transition-all shadow-xl shadow-red-200 group">
              Discover More <ArrowRight className="ml-3 w-5 h-5 group-hover:translate-x-2 transition-transform" />
            </button>
          </div>
        </div>
      </section>

      {/* --- CAR EXPLORER SECTION --- */}
      <section className="bg-gray-50/50 py-32 px-6">
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

          {/* Brand Tabs */}
          <div className="flex flex-wrap justify-center gap-4 py-12">
            {BRAND_DATA.map((brand) => {
              const BrandIcon = brand.icon; // Assign to capitalized variable
              
              return (
                <button
                  key={brand.name}
                  onClick={() => setActiveBrand(brand.name)}
                  className={`px-10 py-4 rounded-xl font-black uppercase tracking-widest flex items-center space-x-3 transition-all border-2 shadow-sm ${
                    activeBrand === brand.name 
                    ? 'bg-red-600 border-red-600 text-white shadow-red-200' 
                    : 'bg-white border-transparent text-gray-500 hover:border-gray-200'
                  }`}
                >
                  <BrandIcon 
                    size={24} 
                    className={activeBrand === brand.name ? 'text-white' : 'text-gray-400'} 
                  />
                  <span>{brand.name}</span>
                </button>
              );
            })}

            <button className="px-10 py-4 rounded-xl font-black uppercase tracking-widest bg-white text-gray-500 border-2 border-transparent hover:border-gray-200 transition-all shadow-sm">
              Explore All
            </button>
          </div>

          {/* Car Grid with Transparent PNGs */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 text-left">
            {CARS.map((car) => (
              <div key={car.id} className="bg-white rounded-[2.5rem] overflow-hidden shadow-[0_15px_40px_-10px_rgba(0,0,0,0.1)] border border-gray-100 group transition-all hover:-translate-y-2">
                <div className="relative h-72 overflow-hidden bg-[#f3f4f6] flex items-center justify-center p-12 transition-colors group-hover:bg-gray-100">
                  <button className="absolute top-6 right-6 z-10 bg-white/80 backdrop-blur-md p-3 rounded-full text-red-500 shadow-lg hover:bg-red-600 hover:text-white transition-all">
                    <Heart className="w-5 h-5" />
                  </button>
                  <img 
                    src={car.image} 
                    alt={car.name}
                    className="w-full h-full object-contain drop-shadow-xl group-hover:scale-110 transition-transform duration-700"
                  />
                </div>
                <div className="p-8 space-y-6">
                  <h3 className="text-2xl font-black tracking-tight">{car.name}</h3>
                  <div className="flex justify-between items-center py-4 border-y border-gray-100">
                    <div className="flex items-baseline gap-1">
                      <span className="text-3xl font-black text-red-600">${car.dayPrice}</span>
                      <span className="text-xs font-black text-gray-400 uppercase">/Day</span>
                    </div>
                    <div className="flex items-baseline gap-1">
                      <span className="text-xl font-black text-gray-800">${car.monthPrice}</span>
                      <span className="text-xs font-black text-gray-400 uppercase">/Month</span>
                    </div>
                  </div>
                  
                  {/* Specs with specific icons from images */}
                  <div className="flex justify-between text-gray-500 font-bold text-sm">
                    <div className="flex items-center gap-2">
                      <Gauge className="w-5 h-5 text-red-500" />
                      {car.specs.mileage}
                    </div>
                    <div className="flex items-center gap-2">
                      <Settings className="w-5 h-5 text-red-500" />
                      {car.specs.trans}
                    </div>
                    <div className="flex items-center gap-2">
                      <Droplet className="w-5 h-5 text-red-500" />
                      {car.specs.fuel}
                    </div>
                  </div>

                  <button className="w-full bg-red-600 hover:bg-red-700 text-white py-5 rounded-2xl font-black uppercase tracking-widest transition-all shadow-xl shadow-red-100 active:scale-95">
                    Rent Now
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Pagination Indicators */}
          <div className="flex justify-center items-center space-x-3 pt-16">
            <div className="w-10 h-2.5 bg-red-600 rounded-full"></div>
            <div className="w-2.5 h-2.5 bg-gray-300 rounded-full"></div>
            <div className="w-2.5 h-2.5 bg-gray-300 rounded-full"></div>
          </div>
        </div>
      </section>

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
      <footer className="bg-[#1a1c23] text-gray-400 pt-16 pb-12 px-6 relative overflow-hidden">
        {/* Decorative background elements */}
        <div className="absolute top-0 left-0 w-64 h-full bg-linear-to-r from-red-600/5 to-transparent skew-x-[-15deg] -translate-x-32"></div>
        <div className="absolute top-0 right-0 w-32 h-full bg-white/5 opacity-5 pointer-events-none"></div>

        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-16 relative z-10">
          {/* Brand Info */}
          <div className="">
            <div className="flex items-center space-x-3">
              <img src="./logo-car.png" alt="logo" className='max-w-sm object-contain drop-shadow-xl opacity-80' />
            </div>
            <p className="text-base leading-relaxed">
              Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit.
            </p>
            <div className="flex space-x-4 pt-8">
              {/* Social icons removed due to missing exports in lucide-react. Replace with other icon library or SVGs. */}
              {/* Example placeholder icons: */}
              <a href="#" className="w-12 h-12 rounded-xl bg-gray-800 flex items-center justify-center hover:bg-red-600 hover:scale-110 transition-all shadow-lg">
                <span className="w-6 h-6 bg-white rounded-full block" />
              </a>
              <a href="#" className="w-12 h-12 rounded-xl bg-gray-800 flex items-center justify-center hover:bg-red-600 hover:scale-110 transition-all shadow-lg">
                <span className="w-6 h-6 bg-white rounded-full block" />
              </a>
              <a href="#" className="w-12 h-12 rounded-xl bg-gray-800 flex items-center justify-center hover:bg-red-600 hover:scale-110 transition-all shadow-lg">
                <span className="w-6 h-6 bg-white rounded-full block" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-8">
            <h4 className="text-white font-black uppercase tracking-widest text-lg">Basic Information</h4>
            <div className="grid grid-cols-1 gap-y-3 font-bold text-sm">
              {["Changing Oil", "Saving Fuel", "Antilock Brakes", "Battery", "Tips On Long Trips", "Air Pressure", "Tire Replacement"].map(link => (
                <a key={link} href="#" className="hover:text-red-500 transition-colors flex items-center">
                  <span className="w-1.5 h-1.5 bg-red-600 rounded-full mr-3"></span>
                  {link}
                </a>
              ))}
            </div>
          </div>

          {/* Contact Details */}
          <div className="space-y-8">
            <h4 className="text-white font-black uppercase tracking-widest text-lg">Contact Us</h4>
            <div className="space-y-6">
              <div className="flex items-start space-x-4 group">
                <div className="p-3 bg-gray-800 rounded-xl group-hover:bg-red-600 transition-colors">
                  <Phone className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="text-xs text-gray-500 font-black uppercase">Call Us</p>
                  <span className="text-white font-bold">(406) 555-0120</span>
                </div>
              </div>
              <div className="flex items-start space-x-4 group">
                <div className="p-3 bg-gray-800 rounded-xl group-hover:bg-red-600 transition-colors">
                  <MapPin className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="text-xs text-gray-500 font-black uppercase">Location</p>
                  <span className="text-white font-bold leading-tight block">2972 Westheimer Rd. Santa Ana, Illinois</span>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Footer Car Image - The Red Car silhouette from the screenshot */}
        <div className="md:absolute md:bottom-8 md:right-[-6.25%] animate-car-flow will-change-transform">
            <img 
            src="./images/car-02.png" 
            alt="Footer Red Car" 
            className="md:max-w-2xl object-contain drop-shadow-xl translate-y-8 rotate-3 opacity-80"
          />
        </div>

        {/* Copyright */}
        <div className="border-t border-white/5 mt-10 pt-10 text-center z-10 relative">
          <p className="text-sm font-bold tracking-widest uppercase">
            Copyright © 2026 <span className="text-red-600">Impel Car Dealers</span>. All Rights Reserved
          </p>
        </div>
      </footer>
    </div>
  );
}