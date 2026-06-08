'use client'
import { useState } from 'react';
import Link from 'next/link';
import { 
  Settings, 
  ArrowRight,
  ChevronDown
} from 'lucide-react';


export default function About(){
    const [activeIndex, setActiveIndex] = useState<number | null>(null);

    const points = [
        {
            title: "Comprehensive Vehicle History & Mileage Verification",
            detail: "Every single vehicle in our Galway showroom undergoes a rigorous, independent vehicle history check to ensure complete transparency. We verify that the mileage is 100% accurate, confirm the car has never been written off or involved in major accidents, and guarantee it is completely clear of any outstanding finance, giving you absolute peace of mind before you drive off the forecourt."
        },
        {
            title: "Tailored Car Finance Packages Arranged Quickly",
            detail: "We understand that purchasing a vehicle is a major financial decision, which is why we partner with leading Irish lenders to offer highly competitive, flexible car finance solutions. Whether you have an immaculate credit history or need assistance securing approval, our team handles the entire application process quickly and discretely to match your monthly budget."
        },
        {
            title: "Comprehensive Parts & Labour Warranty Included",
            detail: "To ensure your long-term driving confidence, all our premium pre-owned vehicles come backed by a robust, comprehensive parts and labour warranty. Should any unexpected mechanical or electrical issues arise, our dedicated customer support team and network of trusted technicians are ready to get you back on the road with minimal disruption."
        },
        {
            title: "Top-Tier Market Valuations for Trade-Ins & Part-Exchange",
            detail: "Upgrading your vehicle is effortless at Shah Motors thanks to our seamless part-exchange program. We utilize live automotive market data across Ireland to provide you with a fair, highly competitive, and transparent valuation for your current car, allowing you to offset its value directly against your new premium purchase."
        },
        {
            title: "Rigorous Multi-Point Inspections & Premium Professional Valeting",
            detail: "Before any car is listed for sale, it must pass a meticulous bumper-to-bumper mechanical and diagnostic inspection conducted by qualified technicians. Once cleared mechanically, each vehicle undergoes an intensive interior and exterior deep-clean detailing process, ensuring your next car looks, feels, and smells brand new."
        }
    ];

    const toggleAccordion = (index: number) => {
        setActiveIndex(activeIndex === index ? null : index);
    };

    return(
        <div>
            <section id="about" className="py-24 px-6 max-w-7xl mx-auto overflow-visible">
                <div className="grid grid-cols-1 lg:grid-cols-5 gap-20 items-center">
                    {/* About Image with Transparent Silhouette */}
                    <div className="relative col-span-2 hidden md:block">
                        {/* The Solid Red Circle from the screenshot */}
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 sm:w-md sm:h-112 bg-red-600 rounded-full z-0"></div>
                        
                        <img 
                            src="./images/car-03.png" 
                            alt="Transparent Acura"
                            className="relative z-10 w-[310px] md:w-[490px] md:max-w-xl mx-auto transform scale-125"
                        />
                        
                        {/* 30 Years Badge */}
                        <div className="absolute -top-20 -left-4 sm:left-0 z-20 bg-[#1a1c23] text-white p-5 rounded-2xl flex items-center space-x-4 shadow-2xl border border-white/10">
                            <div className="bg-red-600 p-3 rounded-xl shadow-inner">
                                <Settings className="w-7 h-7 text-white" />
                            </div>
                            <div className="text-sm font-black uppercase tracking-tight">
                                100% VERIFIED <br />
                                <span className="text-gray-400 font-normal normal-case">Quality Used Cars</span>
                            </div>
                        </div>
                    </div>

                    {/* About Text Content */}
                    <div className="space-y-8 col-span-3">
                        <div className="flex items-center text-red-600 font-black uppercase tracking-[0.2em] text-sm">
                            <div className="w-8 h-1 bg-red-600 mr-3 rounded-full"></div> ABOUT US
                        </div>
                        <h2 className="text-3xl md:text-5xl font-black leading-[1.1] tracking-tight">
                            Galway’s Premier Independent <span className="text-red-600">Car Specialists</span>.
                        </h2>
                        <p className="text-gray-500 text-lg leading-relaxed">
                            At Shah Motors, we are passionate about delivering a premium, transparent car-buying experience across Ireland. We specialize in sourcing top-tier, 
                            hand-picked pre-owned vehicles that meet strict quality, performance, and safety benchmarks. Whether you are searching for an efficient hybrid or a luxury family vehicle, 
                            we eliminate the guesswork with comprehensive history checks, professional preparation, and dedicated customer support.
                        </p>
                        <ul className="space-y-2">
                            {/* {bullet_points.map((text, i) => (
                                <li key={i} className="flex items-center text-gray-800 font-bold text-lg">
                                    <div className="w-6 h-6 rounded-full border-2 border-red-600 flex items-center justify-center mr-4 shrink-0">
                                        <div className="w-2.5 h-2.5 bg-red-600 rounded-full"></div>
                                    </div>
                                    {text}
                                </li>
                            ))} */}

                            {points.map((point, index) => {
                                const isOpen = activeIndex === index;
                                return (
                                    <div 
                                        key={index} 
                                        className="border-b border-gray-200 transition-all duration-300"
                                    >
                                        <button
                                            onClick={() => toggleAccordion(index)}
                                            className="flex items-center justify-between w-full text-left font-bold text-gray-900 hover:text-red-600 transition-colors py-2 group"
                                        >
                                            <div className="flex items-center gap-3">
                                                {/* Red dot indicator matching your UI design */}
                                                <span className={`h-3 w-3 rounded-full border-2 border-red-500  transition-colors ${isOpen ? 'bg-red-500' : 'bg-white'}`} />
                                                <span className="text-base md:text-lg">{point.title}</span>
                                            </div>
                                            <ChevronDown 
                                                className={`w-5 h-5 text-gray-500  transition-transform duration-300 ${isOpen ? 'rotate-180 text-red-600' : ''}`} 
                                            />
                                        </button>
                                        
                                        <div 
                                            className={`grid transition-all duration-300 ease-in-out ${isOpen ? 'grid-rows-[1fr] opacity-100 ' : 'grid-rows-[0fr] opacity-0'}`}
                                        >
                                            <div className="overflow-hidden">
                                                <p className="text-gray-600 leading-relaxed text-sm md:text-base pl-6 pb-2">
                                                    {point.detail}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}

                        </ul>
                        <Link 
                            href="https://wa.me/353833526830?text=Hi%20ShahMotors,%20I%20would%20like%20to%20discover%20more%20about%20your%20car%20listings!" 
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-block w-full md:w-auto"
                            >
                            <button className="w-full bg-red-600 hover:bg-red-700 text-white px-10 py-5 cursor-pointer rounded-xl font-black uppercase tracking-widest flex items-center justify-center transition-all shadow-xl shadow-red-900/20 group">
                                Discover More 
                                <ArrowRight className="ml-3 w-5 h-5 group-hover:translate-x-2 transition-transform" />
                            </button>
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    );
}