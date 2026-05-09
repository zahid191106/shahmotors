"use client";

import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";

export default function Navbar() {
const router = useRouter();
const pathname = usePathname();
const searchParams = useSearchParams();
const [navOpen, setNavOpen] = useState(false);

const [searchTerm, setSearchTerm] = useState("");

const handleSearch = (e: React.FormEvent) => {
e.preventDefault();
if (searchTerm.trim()) {
router.push(`/cars?make=${encodeURIComponent(searchTerm.trim())}`);
}
};

return (
<nav className="absolute top-0 w-full max-w-7xl px-6 py-8 flex justify-between items-center z-30">
    {/* Logo */}
    <div className="text-2xl font-black tracking-tighter italic flex items-center gap-2">
        <span className="text-red-600 text-3xl">SHAH</span>MOTORS
    </div>
    {/* Desktop Nav Links */}
    <div className="hidden md:flex space-x-10 font-bold text-sm uppercase tracking-wider">
        <a href="/" className={ pathname==="/" ? "text-red-600" : "hover:text-red-400 transition-colors" }>
            Home
        </a>
        <a href="#about" className={ pathname==="/#about" ? "text-red-600" : "hover:text-red-400 transition-colors" }>
            About Us
        </a>
        <a href="/cars" className={ pathname==="/cars" ? "text-red-600" : "hover:text-red-400 transition-colors" }>
            Cars List
        </a>
        <a href="/blogs" className={ pathname==="/blogs" ? "text-red-600" : "hover:text-red-400 transition-colors" }>
            Blogs
        </a>
    </div>
    {/* Desktop Contact Button */}
    <a href="#contact"
        className="hidden md:block bg-red-600 text-white px-8 py-2.5 uppercase rounded shadow-lg shadow-red-600/20 font-bold hover:bg-red-700 transition-all active:scale-95">
        Contact US
    </a>
    {/* Mobile Hamburger Icon */}
    <button
        className="md:hidden flex items-center justify-center p-2 rounded focus:outline-none focus:ring-2 focus:ring-red-500"
        aria-label="Open menu" onClick={()=> setNavOpen(true)}
        >
        {/* SVG Hamburger icon */}
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"
            strokeLinecap="round" strokeLinejoin="round" className="text-red-600">
            <line x1="4" y1="6" x2="20" y2="6" />
            <line x1="4" y1="12" x2="20" y2="12" />
            <line x1="4" y1="18" x2="20" y2="18" />
        </svg>
    </button>
    {/* Mobile Nav Overlay */}
    {navOpen && (
    <div className="fixed inset-0 z-50 bg-white flex flex-col animate-fade-in">
        <style>
            {
                ` @keyframes fade-in {
                    0% {
                        opacity: 0;
                    }

                    100% {
                        opacity: 1;
                    }
                }

                .animate-fade-in {
                    animation: fade-in 0.2s cubic-bezier(0.4, 0, 0.2, 1);
                }

                `
            }
        </style>
        <div className="flex items-center justify-between px-6 py-6 border-b border-gray-100">
            <div className="text-2xl font-black tracking-tighter italic flex items-center gap-2 text-gray-900">
                <span className="text-red-600 text-3xl">SHAH</span>MOTORS
            </div>
            <button className="p-2 rounded focus:outline-none focus:ring-2 focus:ring-red-500" aria-label="Close menu"
                onClick={()=> setNavOpen(false)}
                >
                {/* SVG X icon */}
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"
                    strokeLinecap="round" strokeLinejoin="round" className="text-red-600">
                    <line x1="18" y1="6" x2="6" y2="18" />
                    <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
            </button>
        </div>
        <nav className="flex flex-col gap-2 px-8 py-8 font-bold text-lg uppercase tracking-wider text-gray-900 flex-1">
            <a href="/" className={`py-3 px-2 rounded hover:bg-red-50 font-extrabold transition-colors${pathname==="/"
                ? " text-red-600" : "" }`} onClick={()=> setNavOpen(false)}
                >
                Home
            </a>
            <a href="#about" className={`py-3 px-2 rounded hover:bg-red-50 transition-colors${pathname==="/#about"
                ? " text-red-600" : "" }`} onClick={()=> setNavOpen(false)}
                >
                About Us
            </a>
            <a href="/cars" className={`py-3 px-2 rounded hover:bg-red-50 transition-colors${pathname==="/cars"
                ? " text-red-600" : "" }`} onClick={()=> setNavOpen(false)}
                >
                Cars List
            </a>
            <div className="flex flex-col gap-2 w-full">
                <a href="/blogs" className={`py-3 px-2 rounded hover:bg-red-50 transition-colors${pathname==="/blogs"
                    ? " text-red-600" : "" }`} onClick={()=> setNavOpen(false)}
                    >
                    Blogs
                </a>
                <a href="#contact"
                    className="w-full bg-red-600 text-white px-8 py-4 uppercase rounded-xl shadow-lg shadow-red-600/20 font-bold hover:bg-red-700 transition-all active:scale-95 text-base tracking-widest mt-2"
                    onClick={()=> setNavOpen(false)}
                    >
                    Contact US
                </a>
            </div>
        </nav>
    </div>
    )}
</nav>
);
}