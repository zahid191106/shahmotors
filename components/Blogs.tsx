"use client"

import { url } from "inspector/promises";
import Link from "next/link";

export default function Blogs(){
    return(
        <>
            <section className="bg-gray-50/50 py-24 px-6">
                <div className="max-w-7xl mx-auto text-center space-y-6">
                    <p className="text-red-600 font-black uppercase tracking-[0.3em] text-sm">Expert Advice & Insights</p>
                    <h2 className="text-4xl md:text-5xl font-black tracking-tight">The Shah Motors Car Buying Guide</h2>
                    
                    {/* Decorative Divider */}
                    <div className="flex justify-center items-center space-x-3 opacity-30">
                        <div className="w-12 h-1 bg-red-600"></div>
                        <div className="w-4 h-4 border-2 border-red-600 rounded-full flex items-center justify-center">
                            <div className="w-1.5 h-1.5 bg-red-600 rounded-full"></div>
                        </div>
                        <div className="w-12 h-1 bg-red-600"></div>
                    </div>
                    <p className="text-gray-600 max-w-5xl mx-auto leading-relaxed text-base md:text-lg pt-2 pb-8">
                        Navigating the Irish automotive market doesn't have to be complicated. Whether you are looking 
                        to buy your very first second-hand hatchback, looking to understand Vehicle Registration Tax (VRT) 
                        implications, or seeking competitive car finance rates in Dublin, our team of experts breaks down 
                        everything you need to know. Dive into our latest motoring guides, tips, and industry news to 
                        make your next vehicle purchase with absolute confidence.
                    </p>

                    {/* Blog Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 text-left">
                        {[
                            {
                                title: "How to Choose the Right Used Car for Irish Roads",
                                excerpt: "Buying a vehicle in Ireland involves navigating specific NCT histories, body types for tight parking spaces, and finding the sweet spot between efficiency and performance.",
                                image: "./images/pic1.png",
                                url: "/blogs/how-to-buy-car"
                            },
                            {
                                title: "Top 10 Most Fuel-Efficient Hybrid Cars in Ireland",
                                excerpt: "With fuel prices fluctuating, hybrid engines are dominating Irish roads. We break down the absolute best self-charging and plug-in models saving you money at the pumps.",
                                image: "./images/pic2.png",
                                url: "/blogs/top-10-fuel-efficient-cars"
                            },
                            {
                                title: "The Future of Electric Vehicles: An Irish Buyer's Perspective",
                                excerpt: "Thinking of going fully electric? From the latest SEAI grants to Ireland’s expanding charging network infrastructure, here is what EV ownership looks like today.",
                                image: "./images/pic3.png",
                                url: "/blogs/the-future-of-evs-ireland"
                            },
                            {
                                title: "Understanding VRT & Motor Tax Before You Buy",
                                excerpt: "Don't get caught out by hidden vehicle expenses. Learn exactly how Vehicle Registration Tax (VRT) and annual emissions-based road tax bands are calculated in Ireland.",
                                image: "./images/pic4.png",
                                url: "/blogs/understanding-vrt-motor-tax"
                            },
                            {
                                title: "A Complete Guide to Securing Quick Car Finance in Dublin",
                                excerpt: "Ready to upgrade your drive but unsure about financing? Discover how tailored hire purchase (HP) and PCP options work, plus tips to secure rapid approval.",
                                image: "./images/pic5.png",
                                url: "/blogs/car-finance-guide-dublin"
                            },
                            {
                                title: "The Ultimate Checklist When Buying a Second-Hand Car",
                                excerpt: "Avoid showroom stress with our definitive pre-owned inspection checklist. Learn how to verify mileage consistency, review service histories, and check for hidden finance.",
                                image: "./images/pic6.png",
                                url: "/blogs/buying-second-hand-checklist"
                            }
                        ].map((blog, i) => (
                        <Link key={i} href={blog.url} className="flex flex-col bg-white rounded-2xl overflow-hidden shadow-[0_15px_40px_-10px_rgba(0,0,0,0.1)] border border-gray-100 group transition-all hover:-translate-y-2 h-full">
                            {/* Image */}
                            <img src={blog.image} alt={`${blog.title} - Shah Motors Dublin`} className="w-full h-64 object-cover" />
                            
                            {/* Content Area - flex-1 makes this section expand to fill empty space */}
                            <div className="p-6 flex-1">
                                <h3 className="text-xl font-bold text-gray-800 mb-2">{blog.title}</h3>
                                <p className="text-gray-500">{blog.excerpt}</p>
                            </div>
                            
                            {/* Button - Now locked to the bottom */}
                            <span className="block bg-red-400 text-center py-2 text-white font-bold group-hover:bg-red-500 transition-colors">
                                Read More
                            </span>
                        </Link>
                        ))}
                    </div>
                </div>
            </section>
        </>
    );
}