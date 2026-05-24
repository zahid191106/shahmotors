"use client";
import Link from 'next/link';
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";

export default function BlogPage() {

  const sections = [
    { id: "intro", title: "Introduction" },
    { id: "budget", title: "Budgeting & VRT" },
    { id: "nct", title: "NCT & History" },
    { id: "finance", title: "Finance (PCP/HP)" },
    // { id: "dealers", title: "Finding Dealers" },
    { id: "tax", title: "Motor Tax & VLC" },
    // { id: "faq", title: "FAQs" }
  ];
  return (
    <main className="min-h-screen">
        {/* You can add page-specific SEO or wrappers here */}
        <div className="relative max-w-7xl mx-auto pb-16">
            <Navbar />
        </div>
        {/* Blog content */}
        <section className="py-12 md:px-6 max-w-7xl mx-auto overflow-visible">
          {}
          <header className="bg-slate-50 py-16 md:py-24 px-6 mb-12">
            <div className="max-w-4xl mx-auto text-center">
              <div className="flex items-center justify-center gap-2 mb-6">
                <span className="h-px w-8 bg-red-600"></span>
                <span className="text-red-600 font-bold uppercase tracking-[0.2em] text-xs">Essential Guide</span>
                <span className="h-px w-8 bg-red-600"></span>
              </div>
              <h1 className="text-4xl md:text-6xl font-black text-slate-900 mb-8 leading-[1.1]">
                How to Buy a Car in Ireland: <span className="text-red-600">The 2026 Dublin Guide</span>
              </h1>
              <p className="text-xl text-slate-500 leading-relaxed max-w-2xl mx-auto">
                Everything you need to know about navigating the Irish car market, from understanding VRT to securing the best finance rates in Dublin.
              </p>
            </div>
          </header>

          {}
          <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16 py-8 px-6">
            
            {/* Left Sidebar: Sticky Navigation */}
            <aside className="hidden lg:block lg:col-span-3">
              <div className="sticky top-12 space-y-10">
                <div>
                  <h4 className="text-[11px] font-black uppercase tracking-widest text-slate-400 mb-6">Table of Contents</h4>
                  <ul className="space-y-4">
                    {sections.map((section) => (
                      <li key={section.id}>
                        <Link 
                          href={`#${section.id}`} 
                          className="group flex items-center gap-3 text-slate-600 hover:text-red-600 font-bold transition-all text-sm"
                        >
                          <span className="w-0 group-hover:w-4 h-0.5 bg-red-600 transition-all"></span>
                          {section.title}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
                
                {/* CTA Sidebar Box */}
                <div className="p-8 bg-red-600 rounded-3xl text-white shadow-2xl shadow-red-200">
                  <h4 className="text-lg font-black mb-3">Ready to Buy?</h4>
                  <p className="text-sm text-red-50/80 mb-6 leading-relaxed">Browse our collection of verified used cars with 12 months NCT.</p>
                  <Link 
                    href="/cars" 
                    target="_blank"
                    rel="noopener noreferrer"
                    className=""
                  >
                    <button className="w-full py-4 bg-white text-red-600 font-black cursor-pointer rounded-xl hover:bg-slate-100 transition-transform active:scale-95 shadow-lg">
                      VIEW STOCK
                    </button>
                  </Link>
                </div>
              </div>
            </aside>

            {}
            <article className="lg:col-span-9 max-w-3xl">
              <section id="intro" className="mb-20">
                <h2 className="text-3xl font-black mb-8 text-slate-900 leading-tight border-b-4 border-red-600 inline-block">The Irish Car Market in 2026</h2>
                <div className="prose prose-lg prose-slate text-slate-600">
                  <p className="mb-6 first-letter:text-5xl first-letter:font-black first-letter:text-red-600 first-letter:mr-3 first-letter:float-left">
                    Buying a vehicle in Ireland involves a specific set of rules and costs that differ significantly from our neighbors in the UK. Since Brexit, the landscape of importing vehicles has shifted, making domestic purchases in Dublin, Cork, and Galway more attractive. 
                  </p>
                  <p className="mb-6">
                    Whether you are looking for a reliable hybrid or a family SUV, understanding local requirements like <strong>VRT (Vehicle Registration Tax)</strong>, <strong>NCT (National Car Test)</strong>, and <strong>Motor Tax</strong> is the difference between a great deal and a financial headache.
                  </p>
                </div>
              </section>

              {/* Key Terms Highlight Component */}
              <div className="my-16 py-5 md:p-10 bg-slate-50 border-t-8 border-red-600 rounded-b-3xl">
                <h3 className="font-black text-slate-900 mb-6 text-xl uppercase italic tracking-tighter">Essential Irish Auto Terms</h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {[
                    "VRT (Registration Tax)", "NCT Certificate", "Motor Tax Online", 
                    "Logbook (VLC)", "Revenue Commissioners", "Cartell Check", 
                    "MyVehicle.ie History", "PCP Finance", "Hire Purchase", "Third Party Fire/Theft",
                    "SIMI Registered Dealer", "Euro NCAP Ratings", "Service History (FSH)", "Odometer Check",
                    "SEAI EV Grants", "V5C Logbook", "Dublin Eircode Rates", "Revenue ROS"
                  ].map(keyword => (
                    <div key={keyword} className="flex items-center gap-2 text-xs font-bold text-slate-500 uppercase tracking-tight bg-white p-3 rounded-lg border border-slate-100 shadow-sm">
                      <div className="w-1.5 h-1.5 rounded-full bg-red-600"></div>
                      {keyword}
                    </div>
                  ))}
                </div>
              </div>

              <section id="budget" className="mb-20">
                <h2 className="text-3xl font-black mb-8 text-slate-900 leading-tight">1. Budgeting, VRT, and Hidden Costs</h2>
                <div className="prose prose-lg text-slate-600 space-y-6">
                  <p>
                    When buying a car, the sticker price is just the beginning. In Ireland, the <strong>VRT (Vehicle Registration Tax)</strong> is a tax paid when a vehicle is first registered in the State. If you're buying a used car already registered in Ireland, VRT is included in the price, but you must check the annual Motor Tax.
                  </p>
                  <div className="bg-red-50 p-8 rounded-2xl border-l-8 border-red-600 my-10">
                    <p className="text-red-900 font-bold text-xl italic mb-2">Expert Tip:</p>
                    <p className="text-red-800">"Always calculate your annual Motor Tax before buying. High-emission vehicles can cost over €1,000 per year, while modern EVs or hybrids can be as low as €120."</p>
                  </div>
                  <p>
                    For those looking at Electric Vehicles, check the <strong>SEAI grants</strong>. Currently, grants of up to €3,500 are available for private buyers of battery electric vehicles (BEVs), though these figures are subject to change by the Revenue Commissioners.
                  </p>
                </div>
              </section>

              <section id="nct" className="mb-20">
                <h2 className="text-3xl font-black mb-8 text-slate-900 leading-tight">2. The NCT: Non-Negotiable Safety</h2>
                <div className="prose prose-lg text-slate-600">
                  <p className="mb-6">
                    The <strong>National Car Test (NCT)</strong> is a compulsory vehicle inspection program. Buying a car without a valid NCT is risky and often makes it impossible to get <strong>Car Insurance in Ireland</strong>.
                  </p>
                  <ul className="space-y-4 mb-8">
                    <li className="flex gap-4">
                      <span className="text-red-600 font-black">01.</span>
                      <span><strong>NCT Disc:</strong> Always check the disc on the windscreen and match the serial number.</span>
                    </li>
                    <li className="flex gap-4">
                      <span className="text-red-600 font-black">02.</span>
                      <span><strong>History Reports:</strong> Use Cartell.ie or MyVehicle.ie to check if the car was a "Category C" or "Category D" write-off.</span>
                    </li>
                    <li className="flex gap-4">
                      <span className="text-red-600 font-black">03.</span>
                      <span><strong>Clocking:</strong> Verify that the odometer readings match the service history and NCT reports.</span>
                    </li>
                  </ul>
                </div>
              </section>

              <section id="finance" className="mb-20">
                <h2 className="text-3xl font-black mb-8 text-slate-900 leading-tight border-b-4 border-red-600 inline-block">3. Finance: PCP vs Hire Purchase</h2>
                <p className="text-lg text-slate-600 mb-8 leading-relaxed">
                  In Dublin, most dealerships offer <strong>PCP (Personal Contract Plan)</strong> or <strong>Hire Purchase (HP)</strong>. PCP offers lower monthly payments but requires a large "Balloon Payment" at the end. HP allows you to own the car after the final payment. Ensure you check the APR with Irish lenders like AIB, Bank of Ireland, or specialized providers like Finance Ireland.
                </p>
              </section>

              <section id="tax" className="mb-20">
                <h2 className="text-3xl font-black mb-8 text-slate-900 leading-tight">4. Paperwork: Logbooks (VLC) and Tax</h2>
                <p className="text-lg text-slate-600 mb-8 leading-relaxed">
                  The deal isn't done until the <strong>Logbook (Vehicle Licensing Certificate)</strong> is updated. The seller must sign the back of the VLC and post it to the Department of Transport in Shannon, Co. Clare. As the new owner, you will then receive the new logbook by post in about 10 working days.
                </p>
              </section>

              {/* Final CTA Area */}
              <div className="bg-slate-900 rounded-3xl p-5 py-10 md:p-12 text-center text-white overflow-hidden relative">
                <div className="absolute top-0 right-0 w-64 h-64 bg-red-600/10 rounded-full -mr-32 -mt-32 blur-3xl"></div>
                <h3 className="text-3xl font-black mb-6">Drive Your New Car Today</h3>
                <p className="text-slate-400 mb-10 max-w-xl mx-auto">Don't risk a private sale without protection. Explore our 100% verified, SIMI-registered stock in Dublin today.</p>
                <div className="flex flex-col sm:flex-row justify-center gap-4">
                  <button className="bg-red-600 px-10 py-4 rounded-xl font-black text-lg hover:bg-red-700 transition-all hover:-translate-y-1 shadow-xl shadow-red-600/20">
                    BROWSE CARS
                  </button>
                  <button className="bg-white/10 px-10 py-4 rounded-xl font-black text-lg hover:bg-white/20 transition-all">
                    BOOK A TEST DRIVE
                  </button>
                </div>
              </div>
            </article>
          </div>
        </section>
        <Footer />
    </main>
  );
}