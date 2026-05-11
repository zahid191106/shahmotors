'use client';

import React from 'react';
import { 
  Car, 
  Linkedin, 
  Mail, 
  Phone,
  MessageSquare, 
  MapPin, 
  ArrowRight,
  ShieldCheck,
  Clock
} from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#0a0a0a] text-white pt-24 pb-12 overflow-hidden relative">
      {/* Background Decorative Element */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-red-600/5 blur-[120px] rounded-full -mr-64 -mt-64" />
      
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-8 mb-20">
          
          {/* Brand Identity Section */}
          <div className="lg:col-span-4 space-y-8">
            <div className="space-y-4">
              <img 
                src="logo-car.png" 
                alt="Shah Motors Limited" 
                className="w-auto object-contain brightness-110"
              />
              <p className="text-gray-400 font-medium leading-relaxed max-w-sm">
                Redefining the premium automotive experience. At Shah Motors Limited, we curate only the finest vehicles for the most discerning enthusiasts.
              </p>
            </div>
            
            <div className="flex items-center gap-4">
              {[Car, Car, Car, Car].map((Icon, i) => (
                <a 
                  key={i} 
                  href="#" 
                  className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center transition-all hover:bg-red-600 hover:-translate-y-1 group"
                >
                  <Icon size={20} className="text-gray-400 group-hover:text-white" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links Section */}
          <div className="lg:col-span-2 space-y-8">
            <h4 className="text-sm font-black uppercase tracking-[0.2em] text-red-600">Inventory</h4>
            <ul className="space-y-4">
              {['All Vehicles', 'New Arrivals', 'Electric Elite', 'Luxury Sedans', 'Performance SUVs'].map((link) => (
                <li key={link}>
                  <a href="/cars" className="text-gray-400 hover:text-white font-bold transition-colors flex items-center gap-2 group">
                    <div className="w-0 h-0.5 bg-red-600 transition-all group-hover:w-3" />
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Section */}
          <div className="lg:col-span-2 space-y-8">
            <h4 className="text-sm font-black uppercase tracking-[0.2em] text-red-600">The Agency</h4>
            <ul className="space-y-4">
              {['Home', 'About Us', 'Car Listings', 'Blog', 'Contact'].map((link) => (
                <li key={link}>
                  <a href="#" className="text-gray-400 hover:text-white font-bold transition-colors flex items-center gap-2 group">
                    <div className="w-0 h-0.5 bg-red-600 transition-all group-hover:w-3" />
                    {link}
                  </a>
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
                  <p className="font-bold text-gray-200">Main Boulevard, Sector G-11</p>
                  <p className="text-gray-500 text-sm font-medium">Islamabad, Pakistan</p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="p-3 bg-white/5 rounded-xl text-red-600">
                  <Phone size={20} />
                </div>
                <p className="font-bold text-gray-200">+92 300 1234567</p>
              </div>

              <div className="flex items-center gap-4">
                <div className="p-3 bg-white/5 rounded-xl text-red-600">
                  <MessageSquare size={20} />
                </div>
                <p className="font-bold text-gray-200">example@email.com</p>
              </div>

              <div className="relative group">
                <div className="flex items-center gap-8">
                  <a href="#" className="text-gray-500 hover:text-white text-[10px] font-black uppercase tracking-widest transition-colors">Privacy Policy</a>
                  <a href="#" className="text-gray-500 hover:text-white text-[10px] font-black uppercase tracking-widest transition-colors">Terms of Service</a>
                  <a href="#" className="text-gray-500 hover:text-white text-[10px] font-black uppercase tracking-widest transition-colors">Cookies</a>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="md:absolute md:bottom-8 md:right-[-6.25%] animate-car-flow will-change-transform">
            <img 
            src="./images/car-02.png" 
            alt="Footer Red Car" 
            className="md:max-w-2xl object-contain drop-shadow-xl translate-y-8 rotate-3 opacity-80"
          />
        </div>

        {/* Copyright Section */}
        <div className="pt-12 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-gray-500 text-xs font-bold uppercase tracking-widest">
            © {currentYear} Shah Motors Limited. All Rights Reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}