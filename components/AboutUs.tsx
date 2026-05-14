'use client'

import { 
  Settings, 
  ArrowRight
} from 'lucide-react';

export default function About(){
    return(
        <div>
            <section id="about" className="py-32 px-6 max-w-7xl mx-auto overflow-visible">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
                {/* About Image with Transparent Silhouette */}
                <div className="relative">
                    {/* The Solid Red Circle from the screenshot */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 sm:w-md sm:h-112 bg-red-600 rounded-full z-0"></div>
                    
                    <img 
                        src="./images/car-03.png" 
                        alt="Transparent Acura"
                        className="relative z-10 w-[310px] md:w-full md:max-w-xl mx-auto transform scale-125"
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
        </div>
    );
}