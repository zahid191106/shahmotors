"use client"

import { url } from "inspector/promises";

export default function Blogs(){
    return(
        <>
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
                                image: "./images/pic1.png",
                                url: "/blogs/how-to-buy-car"
                            },
                            {
                                title: "Top 10 Fuel Efficient Cars in 2024",
                                excerpt: "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
                                image: "./images/pic2.png",
                                url: "/blogs/top-10-fuel-efficient-cars-2024"
                            },
                            {
                                title: "The Future of Electric Vehicles",
                                excerpt: "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
                                image: "./images/pic3.png",
                                url: "/blogs/the-future-of-electric-vehicles"
                            },
                            {
                                title: "How to Choose the Right Car for You",
                                excerpt: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
                                image: "./images/pic4.png",
                                url: "/blogs/how-to-choose-car"
                            },
                            {
                                title: "Top 10 Fuel Efficient Cars in 2024",
                                excerpt: "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
                                image: "./images/pic5.png",
                                url: "/blogs/top-10-fuel-efficient-cars-2024"
                            },
                            {
                                title: "The Future of Electric Vehicles",
                                excerpt: "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
                                image: "./images/pic6.png",
                                url: "/blogs/the-future-of-electric-vehicles"
                            }
                        ].map((blog, i) => (
                        <a key={i} href={blog.url} className="flex flex-col bg-white rounded-2xl overflow-hidden shadow-[0_15px_40px_-10px_rgba(0,0,0,0.1)] border border-gray-100 group transition-all hover:-translate-y-2 h-full">
                            {/* Image */}
                            <img src={blog.image} alt={blog.title} className="w-full h-64 object-cover" />
                            
                            {/* Content Area - flex-1 makes this section expand to fill empty space */}
                            <div className="p-6 flex-1">
                                <h3 className="text-xl font-bold text-gray-800 mb-2">{blog.title}</h3>
                                <p className="text-gray-500">{blog.excerpt}</p>
                            </div>
                            
                            {/* Button - Now locked to the bottom */}
                            <span className="block bg-red-400 text-center py-2 text-white font-bold group-hover:bg-red-500 transition-colors">
                                Read More
                            </span>
                        </a>
                        ))}
                    </div>
                </div>
            </section>
        </>
    );
}