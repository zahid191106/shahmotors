'use client';

import Link from 'next/link';
import React from 'react';
import { 
  Car, 
  Mail, 
  Phone,
  MessageSquare, 
  MapPin, 
  ArrowRight,
  ShieldCheck,
  Clock
} from 'lucide-react';

import { 
  SiFacebook, 
  SiX, 
  SiInstagram, 
  SiWhatsapp,
  SiTiktok,
  SiYoutube 
} from '@icons-pack/react-simple-icons';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About Us', path: '/about' },
    { name: 'Car Listings', path: '/cars' },
    { name: 'Blogs', path: '/blogs' },
    { name: 'Contact', path: '/contact' },
  ];

  const filterLinks = [
    { name: 'All Vehicles', query: '' },
    { name: 'New Arrivals', query: '?maxMileage=1' },
    { name: 'Budget Friendly', query: '?maxPrice=30000' }, // Example: Under 30k
    { name: 'Premium Range', query: '?minPrice=100000' }, // Example: Above 100k
    { name: 'Recent Models', query: '?minYear=2024' },    // Example: 2024 and newer
    { name: 'Electric Elite', query: '?fuelType=Electric' },
    { name: 'Luxury Sedans', query: '?bodyType=Sedan' },
    { name: 'Performance SUVs', query: '?bodyType=SUV' },
  ];

  const socialLinks = [
    { icon: SiFacebook, href: 'https://facebook.com/shahmotors', color: 'hover:bg-[#1877F2]' },
    { icon: SiX, href: 'https://x.com/shahmotors', color: 'hover:bg-[#000000]' },
    { icon: SiInstagram, href: 'https://instagram.com/shahmotors', color: 'hover:bg-[#E4405F]' },
    { icon: SiTiktok, href: 'https://tiktok.com/@shahmotors', color: 'hover:bg-[#000000]' },
    { icon: SiYoutube, href: 'https://youtube.com/@shahmotors', color: 'hover:bg-[#FF0000]' },
    { icon: SiWhatsapp, href: 'https://wa.me/353833526830', color: 'hover:bg-[#25D366]' },
  ];

  return (
    <footer className="bg-[#0a0a0a] text-white pt-24 pb-12 overflow-hidden relative">
      {/* Background Decorative Element */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-red-600 blur-[120px] rounded-full -mr-64 -mt-64" />
      
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-8 mb-10">
          
          {/* Brand Identity Section */}
          <div className="lg:col-span-4 space-y-8">
            <div className="space-y-4">
              <img 
                src="/logo-car.png" 
                alt="Shah Motors Limited" 
                className="w-auto object-contain brightness-110"
              />
              <p className="text-gray-400 font-medium leading-relaxed max-w-sm">
                Redefining the premium automotive journey across Ireland. At Shah Motors Limited, we specialize in sourcing and preparing the finest quality pre-owned cars in Dublin for discerning drivers who value reliability, transparency, and luxury.
              </p>
            </div>
            
            <div className="flex items-center gap-4">
              {socialLinks.map((social, i) => {
                const Icon = social.icon;
                return (
                  <Link 
                    key={i} 
                    href={social.href} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className={`w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center transition-all hover:-translate-y-1 group ${social.color || 'hover:bg-red-600'}`}
                  >
                    <Icon size={20} className="text-gray-400 group-hover:text-white transition-colors" />
                  </Link>
                );
              })}
            </div>

            <div className="relative group">
                <div className="flex items-center gap-8">
                  <Link href="#" className="text-gray-500 hover:text-white text-[10px] font-black uppercase tracking-widest transition-colors">Privacy Policy</Link>
                  <Link href="#" className="text-gray-500 hover:text-white text-[10px] font-black uppercase tracking-widest transition-colors">Terms of Service</Link>
                  <Link href="#" className="text-gray-500 hover:text-white text-[10px] font-black uppercase tracking-widest transition-colors">Cookies</Link>
                </div>
              </div>
          </div>

          {/* Quick Links Section */}
          <div className="lg:col-span-2 space-y-8">
            <h4 className="text-sm font-black uppercase tracking-[0.2em] text-red-600">Inventory</h4>
            <ul className="space-y-2">
              {filterLinks.map((link) => (
                <li key={link.name}>
                  <Link 
                    href={`/cars${link.query}`} 
                    className="text-gray-400 hover:text-white font-bold transition-colors flex items-center gap-2 group"
                  >
                    {/* Animated red line */}
                    <div className="w-0 h-0.5 bg-red-600 transition-all group-hover:w-3" />
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Section */}
          <div className="lg:col-span-2 space-y-8">
            <h4 className="text-sm font-black uppercase tracking-[0.2em] text-red-600">The Agency</h4>
            <ul className="space-y-4">
              {navLinks.map((link) => (
                <li key={link.name}>
                  <Link href={link.path} className="text-gray-400 hover:text-white font-bold transition-colors flex items-center gap-2 group">
                    <div className="w-0 h-0.5 bg-red-600 transition-all group-hover:w-3" />
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact & Newsletter Section */}
          <div className="lg:col-span-4 space-y-8">
            <h4 className="text-sm font-black uppercase tracking-[0.2em] text-red-600">Visit Our Showroom</h4>
            <div className="space-y-3">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-white/5 rounded-xl text-red-600">
                  <MapPin size={20} />
                </div>
                <div>
                  <p className="font-bold text-gray-200">Two Ditch, Castlegar Co. (H91 EE9F)</p>
                  <p className="text-gray-500 text-sm font-medium">Galway, Ireland</p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="p-3 bg-white/5 rounded-xl text-red-600">
                  <Phone size={20} />
                </div>
                <p className="font-bold text-gray-200">+353 833526830</p>
              </div>

              <div className="flex items-center gap-4">
                <div className="p-3 bg-white/5 rounded-xl text-red-600">
                  <MessageSquare size={20} />
                </div>
                <p className="font-bold text-gray-200">shahmotors14@yahoo.com</p>
              </div>
            </div>
          </div>
        </div>

        <div className="md:absolute md:bottom-8 md:right-[-6.25%] animate-car-flow will-change-transform">
            <img 
            src="/images/car-02.png" 
            alt="Footer Red Car" 
            className="md:max-w-2xl object-contain drop-shadow-xl translate-y-8 rotate-3 opacity-80"
          />
        </div>

        {/* Copyright Section */}
        <div className="pt-12 sm:pt-0 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-gray-500 text-xs font-bold uppercase tracking-widest">
            © {currentYear} Shah Motors Limited. All Rights Reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}