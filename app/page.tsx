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

// Mock Data with Transparent PNGs (using high-quality placeholders that mimic the "no background" look)
// const BRANDS = ['Honda', 'Audi', 'Nissan', 'Mazda', 'Toyota'];
const BRAND_DATA = [
  { name: 'Honda', icon: SiHonda },
  { name: 'Audi', icon: SiAudi },
  { name: 'Nissan', icon: SiNissan },
  { name: 'Mazda', icon: SiMazda },
  { name: 'Toyota', icon: SiToyota },
];

import { client } from '@/lib/sanity.client';
import { ALL_CARS_QUERY } from '@/lib/sanity.queries';
import CarCard from '@/components/CarCard';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

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
              <a href="/cars" className="w-full bg-red-600 text-white h-14 rounded-xl font-black uppercase tracking-widest flex items-center justify-center space-x-3 hover:bg-red-700 transition-all shadow-lg shadow-red-200 active:scale-95">
                <Search className="w-5 h-5" />
                <span>Search Now</span>
              </a>
            </div>
          </div>
        </div>
      </div>

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
                  className={`cursor-pointer px-10 py-4 rounded-xl font-black uppercase tracking-widest flex items-center space-x-3 transition-all border-2 shadow-sm ${
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

            <button
              className={`px-10 py-4 rounded-xl font-black uppercase tracking-widest flex items-center space-x-3 transition-all border-2 shadow-sm ${
                activeBrand === 'Explore All'
                  ? 'bg-red-600 border-red-600 text-white shadow-red-200'
                  : 'bg-white border-transparent text-gray-500 hover:border-gray-200'
              }`}
              onClick={() => setActiveBrand('Explore All')}
            >
              <span>Explore All</span>
            </button>
          </div>

          {/* Car Grid with Transparent PNGs */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 text-left">
            {cars
              .filter(car => activeBrand === 'Explore All' || car.make === activeBrand)
              .map(car => (
                <CarCard key={car._id} car={car} />
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

        {/* --- ABOUT SECTION --- */}
      <section id="about" className="py-32 px-6 max-w-7xl mx-auto overflow-visible">
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

      {/* BLOGS SECTION */}
      <section className="bg-gray-50/50 py-32 px-6">
        <div className="max-w-7xl mx-auto text-center space-y-6">
          <p className="text-red-600 font-black uppercase tracking-[0.3em] text-sm">Latest News</p>
          <h2 className="text-5xl font-black tracking-tight">Read Our Latest Blogs</h2>
          
          {/* Decorative Divider */}
          <div className="flex justify-center items-center space-x-3 opacity-30">
            <div className="w-12 h-1 bg-red-600"></div>
            <div className="w-4 h-4 border-2 border-red-600 rounded-full flex items-center justify-center">
                <div className="w-1.5 h-1.5 bg-red-600 rounded-full"></div>
            </div>
            <div className="w-12 h-1 bg-red-600"></div>
          </div>

          {/* Blog Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 text-left">
            {[
              {
                title: "How to Choose the Right Car for You",
                excerpt: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
                image: "./images/pic1.png"
              },
              {
                title: "Top 10 Fuel Efficient Cars in 2024",
                excerpt: "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
                image: "./images/pic2.png"
              },
              {
                title: "The Future of Electric Vehicles",
                excerpt: "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
                image: "./images/pic3.png"
              },
              {
                title: "How to Choose the Right Car for You",
                excerpt: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
                image: "./images/pic4.png"
              },
              {
                title: "Top 10 Fuel Efficient Cars in 2024",
                excerpt: "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
                image: "./images/pic5.png"
              },
              {
                title: "The Future of Electric Vehicles",
                excerpt: "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
                image: "./images/pic6.png"
              }
            ].map((blog, i) => (
              <div key={i} className="bg-white rounded-2xl overflow-hidden shadow-[0_15px_40px_-10px_rgba(0,0,0,0.1)] border border-gray-100 group transition-all hover:-translate-y-2">
                <img src={blog.image} alt={blog.title} className="w-full h-64 object-cover" />
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-800 mb-2">{blog.title}</h3>
                  <p className="text-gray-500">{blog.excerpt}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CONTACT US SECTION */}
      <section id="contact" className="bg-gray-50/50 py-32 px-6">
        <div className="max-w-7xl mx-auto text-center space-y-6">
          <p className="text-red-600 font-black uppercase tracking-[0.3em] text-sm">Get In Touch</p>
          <h2 className="text-5xl font-black tracking-tight">Contact Us</h2>
          
          {/* Decorative Divider */}
          <div className="flex justify-center items-center space-x-3 opacity-30">
            <div className="w-12 h-1 bg-red-600"></div>
            <div className="w-4 h-4 border-2 border-red-600 rounded-full flex items-center justify-center">
                <div className="w-1.5 h-1.5 bg-red-600 rounded-full"></div>
            </div>
            <div className="w-12 h-1 bg-red-600"></div>
          </div>

          {/* Contact Info Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 pt-16">
            <img src="./images/pic7.png" alt="Showroom Map" className="w-full h-80 object-cover" />

            <div className='grid gap-2'>
              {/* Phone Card */}
              <div className="grid md:grid-cols-2 items-center bg-white rounded-3xl overflow-hidden shadow-[0_15px_40px_-10px_rgba(0,0,0,0.1)] border border-gray-100 group transition-all hover:-translate-y-2 p-5 space-y-6">
                <div className="w-20 h-20 bg-red-100 rounded-2xl flex items-center justify-center mb-0 mx-auto group-hover:bg-red-600 group-hover:text-white transition-all">
                  <Phone className="w-10 h-10 text-red-600 group-hover:text-white" />
                </div>
                <div>
                  <h3 className="text-2xl font-black">Call Us</h3>
                  <a href="tel:+1-234-567-8900" className="text-lg font-bold text-red-600 hover:text-red-700 transition-colors">
                    +1 (234) 567-8900
                  </a>
                  <p className="text-gray-500 text-sm">Available 24/7 for your queries</p>
                </div>
              </div>

              {/* WhatsApp Card */}
              <div className="grid md:grid-cols-2 items-center bg-white rounded-3xl overflow-hidden shadow-[0_15px_40px_-10px_rgba(0,0,0,0.1)] border border-gray-100 group transition-all hover:-translate-y-2 p-5 space-y-6">
                <div className="w-20 h-20 bg-green-100 rounded-2xl flex items-center justify-center mb-0 mx-auto group-hover:bg-green-500 group-hover:text-white transition-all">
                  <MessageCircle className="w-10 h-10 text-green-600 group-hover:text-white" />
                </div>
                <div>
                  <h3 className="text-2xl font-black">WhatsApp</h3>
                  <a href="https://wa.me/1234567890" className="text-lg font-bold text-green-600 hover:text-green-700 transition-colors">
                    +1 (234) 567-8900
                  </a>
                  <p className="text-gray-500 text-sm">Quick response via WhatsApp</p>
                </div>
              </div>

              {/* Email Card */}
              <div className="grid md:grid-cols-2 items-center bg-white rounded-3xl overflow-hidden shadow-[0_15px_40px_-10px_rgba(0,0,0,0.1)] border border-gray-100 group transition-all hover:-translate-y-2 p-5 space-y-6">
                <div className="w-20 h-20 bg-blue-100 rounded-2xl flex items-center justify-center mb-0 mx-auto group-hover:bg-blue-600 group-hover:text-white transition-all">
                  <Mail className="w-10 h-10 text-blue-600 group-hover:text-white" />
                </div>
                <div>
                  <h3 className="text-2xl font-black">Email Us</h3>
                  <a href="mailto:info@shahmotors.com" className="text-lg font-bold text-blue-600 hover:text-blue-700 transition-colors">
                    info@shahmotors.com
                  </a>
                  <p className="text-gray-500 text-sm">We'll respond within 24 hours</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Location and Map Section */}
        <div className="max-w-7xl mx-auto mt-32 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Location Info */}
          <div className="space-y-8">
            <div className="flex items-center text-red-600 font-black uppercase tracking-[0.2em] text-sm">
              <div className="w-8 h-1 bg-red-600 mr-3 rounded-full"></div> Our Location
            </div>
            <h2 className="text-4xl md:text-5xl font-black leading-[1.1] tracking-tight">
              Visit Our <span className="text-red-600">Showroom</span>
            </h2>
            <p className="text-gray-500 text-lg leading-relaxed">
              Come and experience our world-class fleet of vehicles. Our showroom is open 7 days a week with dedicated staff to assist you.
            </p>
            <div className="space-y-6 pt-4">
              <div className="flex items-start space-x-4 group">
                <div className="p-4 bg-red-100 rounded-xl group-hover:bg-red-600 transition-colors shrink-0">
                  <MapPin className="w-6 h-6 text-red-600 group-hover:text-white" />
                </div>
                <div>
                  <p className="text-xs text-gray-400 font-black uppercase tracking-wider">Address</p>
                  <span className="text-gray-800 font-bold leading-tight block text-lg">2972 Westheimer Rd. Santa Ana, Illinois 85486</span>
                </div>
              </div>
              <div className="flex items-start space-x-4 group">
                <div className="p-4 bg-red-100 rounded-xl group-hover:bg-red-600 transition-colors shrink-0">
                  <Clock className="w-6 h-6 text-red-600 group-hover:text-white" />
                </div>
                <div>
                  <p className="text-xs text-gray-400 font-black uppercase tracking-wider">Business Hours</p>
                  <span className="text-gray-800 font-bold block text-lg">Mon - Sun: 9:00 AM - 9:00 PM</span>
                  <span className="text-gray-600 text-sm">Holidays: 10:00 AM - 6:00 PM</span>
                </div>
              </div>
            </div>
          </div>

          {/* Map Embed */}
          <div className="rounded-3xl overflow-hidden shadow-[0_15px_40px_-10px_rgba(0,0,0,0.1)] border border-gray-100 h-96 bg-gray-200">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3024.2219901290355!2d-118.24368!3d34.07!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x80ddd2fa2f6b8005%3A0x1234567890!2s2972%20Westheimer%20Rd%2C%20Santa%20Ana%2C%20CA%2085486!5e0!3m2!1sen!2sus!4v1234567890"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen={true}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="w-full h-full"
            ></iframe>
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
      <Footer />
    </div>
  );
}