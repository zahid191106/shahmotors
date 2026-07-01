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
                        implications, or seeking competitive car finance rates in Galway, our team of experts breaks down 
                        everything you need to know. Dive into our latest motoring guides, tips, and industry news to 
                        make your next vehicle purchase with absolute confidence.
                    </p>

                    {/* Blog Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 text-left">
                        {[
                            {
                                title: "How to Choose the Right Used Car for Irish Roads",
                                excerpt: "Buying a vehicle in Ireland involves navigating specific NCT histories, body types for tight parking spaces, and finding the sweet spot between efficiency and performance.",
                                image: "/images/pic1.png",
                                url: "/blogs/how-to-buy-car"
                            },
                            {
                                title: "The Ultimate Guide to Japanese Import Cars",
                                excerpt: "Everything you need to know about buying Toyota used cars, navigating VRT, and why Japanese imports are the smartest choice for Galway drivers in 2024.",
                                image: "/images/pic2.png",
                                url: "/blogs/japanese-import-cars"
                            },
                            {
                                "title": "5 Vital Things to Check Before Buying a Used Car in Galway",
                                "excerpt": "Buying a car in the West comes with unique considerations. From checking coastal salt-water chassis corrosion to verifying local service histories, here is what Galway buyers need to know before handing over cash.",
                                "image": "/images/blogs/blog-3.webp",
                                "url": "/blogs/buying-used-car-galway"
                            },
                            {
                                "title": "The Best Used Commuter Cars for the Galway-to-Dublin M6 Drive",
                                "excerpt": "Commuting from Galway to Dublin weekly or daily? We round up the most fuel-efficient, reliable, and comfortable used saloons and hatchbacks that make the M6 journey effortless and affordable.",
                                "image": "/images/blogs/blog-4.webp",
                                "url": "/blogs/best-commuter-cars-galway"
                            },
                            {
                                "title": "Buying a Used Car in Galway: Showroom Warranty vs Private Cash Sales",
                                "excerpt": "Thinking of buying a car privately on DoneDeal or Facebook Marketplace in Galway? Learn why consumer rights, dealership warranties, and rigorous pre-sale checks offer far better protection in the long run.",
                                "image": "/images/blogs/blog-5.webp",
                                "url": "/blogs/galway-car-showroom-warranty"
                            },
                            {
                                "title": "Top Used SUVs and 4x4s for Navigating Connemara’s Rural Roads",
                                "excerpt": "Rural roads in the West require a vehicle that can handle tight bends, uneven surfaces, and harsh winter weather. Here are the top pre-owned SUVs perfect for Connemara families and commuters.",
                                "image": "/images/blogs/blog-6.webp",
                                "url": "/blogs/used-suvs-galway-connemara"
                            },
                            {
                                "title": "How to Find a Reliable Second-Hand Car in Galway Under €15,000",
                                "excerpt": "On a strict budget but need a dependable ride? We highlight the best value-for-money used cars currently hitting the market in Galway that won't break the bank on maintenance or tax.",
                                "image": "/images/blogs/blog-7.webp",
                                "url": "/blogs/second-hand-cars-galway-under-10k"
                            },
                            {
                                "title": "Navigating the Galway City Commute: The Best Used Automatic Hatchbacks",
                                "excerpt": "Tired of riding the clutch past the Tuam Road or through the Salthill traffic? Discover the most reliable, compact, second-hand automatic hatchbacks that make city driving and parking easy.",
                                "image": "/images/blogs/blog-8.webp",
                                "url": "/blogs/automatic-hatchbacks-galway-city"
                            },
                            {
                                "title": "The Galway Student's Guide to Buying Your First Used Car",
                                "excerpt": "Heading to University of Galway or ATU? This comprehensive guide breaks down how to choose a safe, reliable first car with low motor tax and cheap insurance groups for younger drivers.",
                                "image": "/images/blogs/blog-9.webp",
                                "url": "/blogs/student-first-car-guide-galway"
                            },
                            {
                                "title": "West of Ireland Driving: How Severe Weather Affects Your Car Selection",
                                "excerpt": "Rain, heavy coastal winds, and winter surface water are staple conditions in the West. Learn which vehicle features—from traction control setups to headlight tech—you should prioritize for maximum safety.",
                                "image": "/images/blogs/blog-10.webp",
                                "url": "/blogs/cars-for-irish-weather-galway"
                            },
                            {
                                "title": "A Local’s Guide to Used Car Finance Options in Galway",
                                "excerpt": "Confused by PCP, HP, and traditional car loans? We break down how used car finance works in Galway, how to get approved quickly, and how to structure your payments to fit your monthly budget.",
                                "image": "/images/blogs/blog-11.webp",
                                "url": "/blogs/used-car-finance-galway"
                            },
                            {
                                "title": "How ShahMotors Prepares Every Used Car for the Galway Roads",
                                "excerpt": "Take a look behind the scenes at our Galway showroom. Learn about our strict multi-point vehicle history checks, mechanical detailing, and NCT preparation that guarantees peace of mind.",
                                "image": "/images/blogs/blog-12.webp",
                                "url": "/blogs/how-shahmotors-prepares-used-cars"
                            },
                            {
                                "title": "The Ultimate Checklist for Buying a Used Car in Ireland",
                                "excerpt": "Don’t get caught out by hidden vehicle issues. Our definitive, step-by-step guide covers everything from checking logbooks and finance status to verifying open market histories.",
                                "image": "/images/blogs/blog-13.webp",
                                "url": "/blogs/buying-used-car-ireland-checklist"
                            },
                            {
                                "title": "Top 7 Most Reliable Used Cars for Irish Roads and Motor Tax Bands",
                                "excerpt": "Looking for a car that won't let you down or drain your wallet? We rank Ireland's most dependable pre-owned vehicles based on fuel economy, low annual motor tax, and overall longevity.",
                                "image": "/images/blogs/blog-14.webp",
                                "url": "/blogs/most-reliable-used-cars-ireland"
                            },
                            {
                                "title": "How to Avoid Buying a Clocked or Written-Off Used Car in Ireland",
                                "excerpt": "Vehicle scams are an unfortunate reality. Learn how to accurately read an Irish car history report, check for outstanding finance, and spot physical signs of mileage clocking or past crash damage.",
                                "image": "/images/blogs/blog-15.webp",
                                "url": "/blogs/avoid-clocked-written-off-cars-ireland"
                            },
                            {
                                "title": "Used Diesel vs. Petrol vs. Hybrid: Which is Best for Irish Drivers?",
                                "excerpt": "With shifting fuel prices and emissions policies, choosing a fuel type is tricky. We break down the real-world math to help you decide which engine type suits your daily mileage and commute type.",
                                "image": "/images/blogs/blog-16.webp",
                                "url": "/blogs/used-diesel-petrol-hybrid-ireland"
                            },
                            {
                                "title": "The Secret to Passing Your NCT First Time: A Used Car Owner’s Guide",
                                "excerpt": "With extensive National Car Test backlogs across Ireland, failing is a major headache. Follow this simple pre-NCT checklist covering tyres, lights, and suspension to ensure your car passes on the first attempt.",
                                "image": "/images/blogs/blog-17.webp",
                                "url": "/blogs/pass-nct-first-time-guide"
                            },
                            {
                                "title": "How Used Car Finance Works in Ireland: A Complete Beginner's Guide",
                                "excerpt": "Want to spread the cost of your next vehicle? This guide explains the step-by-step process of securing used car finance in Ireland, including what documents you need and how to improve your approval odds.",
                                "image": "/images/blogs/blog-18.webp",
                                "url": "/blogs/how-used-car-finance-works-ireland"
                            },
                            {
                                "title": "The Best Used Cars for Low Insurance Categories in Ireland",
                                "excerpt": "Irish car insurance premiums can be staggering. We outline the top pre-owned vehicles that sit in the lowest insurance groups, helping young, returning, or budget-conscious drivers save hundreds annually.",
                                "image": "/images/blogs/blog-19.webp",
                                "url": "/blogs/cheap-insurance-used-cars-ireland"
                            },
                            {
                                "title": "Buying a Used Car Online with Nationwide Home Delivery in Ireland",
                                "excerpt": "Can't make it to the showroom? Discover how ShahMotors makes buying your next car online completely safe, transparent, and seamless, complete with virtual walkarounds and delivery straight to your driveway.",
                                "image": "/images/blogs/blog-20.webp",
                                "url": "/blogs/buy-used-car-online-delivery-ireland"
                            },
                            {
                                "title": "What Does a Full Used Car Service History Actually Mean in Ireland?",
                                "excerpt": "A 'full service history' sticker is a major selling point, but what should you actually look for in the service booklet? Learn how to verify genuine garage stamps and receipts to protect your investment.",
                                "image": "/images/blogs/blog-21.webp",
                                "url": "/blogs/full-car-service-history-meaning-ireland"
                            },
                            {
                                "title": "How Irish Car Tax Bands Work: Pre-2008 vs. Modern Emissions Ratings",
                                "excerpt": "Don't get surprised by a €750 annual tax bill. We simplify how Ireland’s motor tax system calculates rates differently for older engine-size based cars versus modern, emissions-based vehicles.",
                                "image": "/images/blogs/blog-22.webp",
                                "url": "/blogs/calculate-motor-tax-bands-ireland"
                            }
                        ].map((blog, i) => (
                        <Link key={i} href={blog.url} className="flex flex-col bg-white rounded-2xl overflow-hidden shadow-[0_15px_40px_-10px_rgba(0,0,0,0.1)] border border-gray-100 group transition-all hover:-translate-y-2 h-full">
                            {/* Image */}
                            <img src={blog.image} alt={`${blog.title} - Shah Motors Galway`} className="w-full h-64 object-cover" />
                            
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