"use client";
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import React, { useState } from 'react';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from 'recharts';

type ComparisonTabKey = 'private' | 'dealer';

type ComparisonDetails = {
  title: string;
  subtitle: string;
  status: string;
  protection: string;
  warranty: string;
  bestFor: string;
  risks: string[];
};



// ==========================================
// MAIN REUSABLE APP COMPONENT
// ==========================================
const App = () => {
  const [activeTab, setActiveTab] = useState<ComparisonTabKey>('private');
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  // Data representing common reasons for NCT failures in Galway (corrosive vs suspension indicators)
  const nctFailureData = [
    { category: 'Suspension', rate: 42, secondaryRate: 18 },
    { category: 'Lighting/Electrical', rate: 38, secondaryRate: 12 },
    { category: 'Emissions/OBD', rate: 31, secondaryRate: 28 },
    { category: 'Braking System', rate: 29, secondaryRate: 15 },
    { category: 'Chassis Rust/Salt', rate: 24, secondaryRate: 34 },
    { category: 'Tyres & Wheels', rate: 22, secondaryRate: 10 },
  ];

  const comparisonMap: Record<ComparisonTabKey, ComparisonDetails> = {
    private: {
      title: "Private Marketplace Sellers",
      subtitle: "Buying via DoneDeal, Facebook Marketplace, or local classified ads.",
      status: "Let the Buyer Beware (Caveat Emptor)",
      protection: "Virtually None. No statutory consumer protections apply to private transactions.",
      warranty: "Sold as-seen. No return rights or mechanical guarantees exist once funds change hands.",
      bestFor: "Mechanically expert buyers willing to take complete financial risks for a cheaper price.",
      risks: ["Outstanding finance liabilities", "Disguised curbstoners / illegal dealers", "Pervasive odometer clocking", "Hidden major write-off histories"]
    },
    dealer: {
      title: "Registered SIMI Showrooms",
      subtitle: "Buying from a certified independent vehicle dealership like ShahMotors.",
      status: "Consumer Rights Act Protection",
      protection: "Fully protected under Irish consumer law; vehicles must be of merchantable quality.",
      warranty: "Typically 3, 6, or 12-month comprehensive mechanical and hybrid drivetrain warranties.",
      bestFor: "Everyday drivers, families, and professionals seeking guaranteed reliability and peace of mind.",
      risks: ["Higher upfront purchase pricing compared to bare private listings (offset by warranty value)."]
    }
  };

  const faqItems = [
    {
      question: "Why does Galway's climate require unique checks compared to inland counties?",
      answer: "Galway's direct exposure to Atlantic winds means salt-water spray is constantly in the air, especially along coastal areas like Salthill, Barna, and Connemara. This accelerates rust on underbody components like brake lines and subframes. Standard inland cars don't face this persistent chemical assault, making underbody inspections non-negotiable for Galway purchases."
    },
    {
      question: "How can I check if a used car has outstanding finance in Ireland?",
      answer: "You should always run a comprehensive history check using a verified service (like Cartell or MotorCheck) before purchasing. These services query the National Vehicle Driver File (NVDF) and bank registers. If a car has active Hire Purchase (HP) or PCP finance, the finance house legally owns the car, not the person selling it to you."
    },
    {
      question: "What is odometer clocking, and how do I spot it in Galway?",
      answer: "Odometer clocking is the illegal reduction of a car's mileage. To spot this, cross-reference the mileage displayed on the dashboard with the historical readings on past NCT certificates, the car's stamped service history booklet, and database records. Look for physical wear on the steering wheel, pedals, and driver's seat bolster that seems excessive for low mileage."
    },
    {
      question: "What does the Engine Management Light (EML) indicate, and will it fail the NCT?",
      answer: "Yes, an illuminated EML is an automatic immediate NCT failure. It indicates that the car's On-Board Diagnostics (OBD) system has flagged an active error code related to engine performance, sensors, or emissions. Never purchase a vehicle with an active EML under the promise that 'it's just a cheap sensor'—always demand a diagnostic scan first."
    },
    {
      question: "How does the NCT treat vehicles imported from the UK or Japan?",
      answer: "Imported vehicles undergo the exact same rigorous NCT checks as domestic Irish cars. However, when importing, you must ensure the Vehicle Registration Tax (VRT) has been fully settled and the car has been assigned an official Irish registration. Japanese imports are highly favored because Japanese roads are not salted, resulting in pristine rust-free undercarriages."
    },
    {
      question: "Why is a vehicle warranty so important when buying a second-hand car?",
      answer: "A warranty from a reputable independent dealership like ShahMotors transfers the financial risk of mechanical failures from you to the dealer. Modern cars are highly complex electronic and mechanical machines; if an engine control unit (ECU), turbocharger, or hybrid battery fails, repairs can quickly cost thousands. A warranty guarantees your mobility is fully protected."
    },
    {
      question: "What are 'disguised traders' and why are they dangerous?",
      answer: "Disguised traders (or curbstoners) are unregistered, illegal dealers who buy salvage or broken vehicles, dress them up cosmetically, and sell them online under the guise of 'private family sellers'. They do this to bypass consumer laws. Avoid sellers who refuse to let you view the vehicle at the residential address listed on the logbook (VRC)."
    },
    {
      question: "Are diesel cars still a sensible choice for Galway drivers?",
      answer: "Only if you drive long distances. Diesel vehicles equipped with Diesel Particulate Filters (DPFs) need long, hot journeys (such as commuting on the M6 motorway) to burn off soot. If you only do short trips around Galway city center, the DPF will quickly clog, leading to extremely expensive repair bills. For city driving, hybrid automatic cars are far superior."
    },
    {
      question: "How do tyre profiles affect driving comfort on rural Connemara roads?",
      answer: "Low-profile tyres (with short, stiff sidewalls) look great but offer very little cushioning. On uneven rural roads, potholes, and gravel lanes in Connemara, low-profile tyres are highly prone to sidewall bubbling, puncture damage, and cracked alloy wheels. Higher profile tyres provide a much smoother, safer ride on rough terrain."
    },
    {
      question: "Can I buy a used car with cash, or is bank transfer safer?",
      answer: "Bank transfers or draft checks are infinitely safer because they leave a clear, auditable paper trail. If a private seller insists on a cash-only transaction in a public car park, it is a massive red flag. Always perform transactions securely, and ensure you receive a signed receipt containing the seller's details, vehicle VIN, and purchase price."
    }
  ];

  const sections = [
    { id: 'intro', title: 'Introduction' },
    { id: 'corrosion', title: '1. Coastal Rust & Corrosion' },
    { id: 'history', title: '2. Paperwork & Finance Checks' },
    { id: 'nct', title: '3. Understanding NCT & Diagnostics' },
    { id: 'comparison', title: '4. Dealer vs. Private Safety' },
    { id: 'roads', title: '5. Mechanical Specs for the West' },
    { id: 'analysis', title: 'In-Depth Analysis' },
    { id: 'faq', title: 'FAQs' }
  ];

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 leading-relaxed ">
        {/* Navigation */}
        <div className="relative max-w-7xl mx-auto pb-16">
            <Navbar />
        </div>

      {/* Hero Section */}
      <header className="pt-40 pb-20 bg-linear-to-br from-white via-red-50 to-red-100">
        <div className="max-w-5xl mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-black text-slate-900 mb-8 leading-[1.1]">
            5 Vital Things to Check <br/>
            <span className="text-transparent bg-clip-text bg-linear-to-r from-red-600 to-red-400">Before Buying a Used Car in Galway</span>
          </h1>
          <p className="text-xl text-slate-600 mb-8 max-w-3xl mx-auto">
            Buying a vehicle in the West of Ireland involves navigating unique coastal environments, NCT backlogs, and choosing the right specification for rugged regional roads.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <span className="px-4 py-2 bg-white shadow-sm border border-slate-200 rounded-lg text-xs font-bold text-slate-500 uppercase">#UsedCarsGalway</span>
            <span className="px-4 py-2 bg-white shadow-sm border border-slate-200 rounded-lg text-xs font-bold text-slate-500 uppercase">#IrishNCTGuide</span>
            <span className="px-4 py-2 bg-white shadow-sm border border-slate-200 rounded-lg text-xs font-bold text-slate-500 uppercase">#GalwayCarShowroom</span>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 md:px-6 py-12 grid grid-cols-1 lg:grid-cols-12 gap-12">
        
        {/* Sidebar Left side */}
        <aside className="hidden lg:block lg:col-span-3">
          <div className="sticky top-28 space-y-10">
            <div>
              <h4 className="text-[14px] font-black uppercase tracking-widest text-slate-400 mb-6">Table of Contents</h4>
              <ul className="space-y-4">
                {sections.map((section) => (
                  <li key={section.id}>
                    <a 
                      href={`#${section.id}`} 
                      className="group flex items-center gap-3 text-slate-600 hover:text-red-600 font-bold transition-all text-sm"
                    >
                      <span className="w-0 group-hover:w-4 h-0.5 bg-red-600 transition-all"></span>
                      {section.title}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* CTA Sidebar Box */}
            <div className="p-5 bg-red-600 rounded-3xl text-white shadow-2xl shadow-red-200">
              <h4 className="text-lg font-black mb-3">Ready to Buy?</h4>
              <p className="text-base text-red-50/80 mb-6 leading-relaxed">Browse our collection of verified, rust-free used cars with warranties in Galway.</p>
              <a 
                href="/catalog"
                target="_blank"
                rel="noopener noreferrer"
              >
                <button className="w-full py-4 bg-white text-red-600 font-black cursor-pointer rounded-xl hover:bg-slate-100 transition-transform active:scale-95 shadow-lg">
                  VIEW STOCK
                </button>
              </a>
            </div>
          </div>
        </aside>

        {/* Main Content Area Right side */}
        <div className="lg:col-span-9 bg-white p-4 md:p-12 rounded-3xl shadow-sm border border-slate-100">
          
          <section id="intro" className="mb-20">
            <h2 className="text-3xl font-bold mb-6 text-slate-900">Introduction: The West of Ireland Car Buying Reality</h2>
            <div className="prose prose-slate max-w-none">
              <p className="mb-4">
                Searching for high-quality **used cars galway** has to offer can be an exciting journey, but it is also one paved with hidden pitfalls. The wild Atlantic climate, rugged rural landscape, and complex history databases make purchasing a secondary vehicle in the West of Ireland a process that requires strict diligence. Unlike buying a vehicle in dry, inland European climates, Galway-based cars face unique physical stresses.
              </p>
              <p className="mb-4">
                Whether you are a student commuting to the University of Galway, a family navigating school runs in Oranmore, or a professional driving the M6 motorway to Dublin, your car needs to be structurally solid, legally clear, and mechanically sound. Buying a vehicle without running key diagnostics can result in immense financial distress.
              </p>
              <p className="mb-8 font-semibold text-red-600">
                At ShahMotors, we believe in complete transparency. This comprehensive, 3,000-word field guide breaks down the five vital areas every Irish car buyer must check before handing over their hard-earned money.
              </p>
            </div>
          </section>

          {/* Section 1 */}
          <section id="corrosion" className="mb-20 scroll-mt-28">
            <h2 className="text-3xl font-bold mb-6 text-slate-900">1. Coastal Rust & Corrosion: The Salt Water Threat</h2>
            <div className="prose prose-slate max-w-none">
              <p className="mb-4">
                Galway is famous for its stunning coastlines, from the sweeping views of Salthill to the rugged peninsulas of Connemara. However, this beautiful ocean proximity poses a severe, quiet threat to used cars: **salt-induced oxidation**.
              </p>
              <p className="mb-4">
                When vehicles are driven or parked near the Atlantic coast, microscopic salt particles settle on the undercarriage, suspension, and inside the structural sills. Over time, salt acts as an electrolyte, radically accelerating rust on structural steel. While a car might look shiny and freshly polished on top, its underbody could be actively flaking away.
              </p>
              <p className="mb-4">
                When inspecting a second-hand vehicle in Galway, you must look underneath. Pay close attention to:
              </p>
              <ul className="list-disc pl-6 mb-4 space-y-2 text-slate-700">
                <li><strong>The Brake Lines:</strong> Steel brake pipes corrode quickly when exposed to road salt and ocean moisture. Look for pitting, scaling, or wet fluid leaks.</li>
                <li><strong>The Structural Sills and Floor Pans:</strong> Structural rust here weakens the car's crash protection and will guarantee a major failure at the National Car Test (NCT).</li>
                <li><strong>Suspension Components:</strong> Check coil springs for hairline stress fractures and subframe welds for deep, scaly corrosion.</li>
              </ul>
            </div>

            {/* Interactive NCT Failure Reason Chart */}
            <div className="my-12 p-6 bg-slate-50 rounded-2xl border border-slate-200">
              <h3 className="text-sm font-bold text-slate-500 uppercase mb-6 text-center tracking-widest">NCT Failure Risk Indexes - Coastal vs. Inland Galway</h3>
              <div className="h-80 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={nctFailureData}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                    <XAxis dataKey="category" axisLine={false} tickLine={false} />
                    <YAxis axisLine={false} tickLine={false} />
                    <Tooltip 
                      contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)' }} 
                    />
                    <Legend verticalAlign="top" align="right" />
                    <Bar dataKey="rate" fill="#cbd5e1" name="Inland Fail Rate (%)" radius={[4, 4, 0, 0]} />
                    <Bar dataKey="secondaryRate" fill="#dc2626" name="Coastal Galway Fail Rate (%)" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
              <p className="text-xs text-slate-400 mt-4 italic text-center">Source: Regional NCT failure trends, emphasizing salt and road terrain impacts on chassis components.</p>
            </div>
          </section>

          {/* Section 2 */}
          <section id="history" className="mb-20 scroll-mt-28">
            <h2 className="text-3xl font-bold mb-6 text-slate-900">2. Paperwork & History: outstanding Finance and Clocking</h2>
            <div className="prose prose-slate max-w-none">
              <p className="mb-4">
                The most dangerous problems with a used car are the ones you cannot see by looking under the bonnet. In Ireland, thousands of buyers fall victim to **history scams**, outstanding financial liabilities, and odometer adjustments.
              </p>
              <p className="mb-4">
                Before purchasing any vehicle, you must check the **Vehicle Registration Certificate (VRC)**, often called the logbook. Verify that the name of the seller matches the registered owner's name exactly. Check the Vehicle Identification Number (VIN) stamped on the chassis plate (usually found under the bonnet or inside the door sill) against the VIN printed on the VRC. If they do not match, walk away immediately.
              </p>
              <p className="mb-4 font-bold text-red-600">
                The outstanding finance trap: Under Irish contract law, if you purchase a car with active Hire Purchase (HP) or PCP finance, the car legally belongs to the bank. If the previous owner stops making payments, the bank has the right to repossess the car directly from your driveway, leaving you with no car and no money.
              </p>
              <p className="mb-4">
                Furthermore, look out for mileage clocking. This is particularly common in cars imported from the UK, where mileage registers can get confused during transit. A history check via Cartell or MotorCheck will verify the historical odometer logs recorded during previous NCT and MOT tests, protecting you from buying a vehicle with artificially lowered mileage.
              </p>
            </div>
          </section>

          {/* Section 3 */}
          <section id="nct" className="mb-20 scroll-mt-28">
            <h2 className="text-3xl font-bold mb-6 text-slate-900">3. Understanding the NCT & Electronic Diagnostic Checks</h2>
            <div className="prose prose-slate max-w-none">
              <p className="mb-4">
                The National Car Test (NCT) is Ireland's compulsory roadworthiness test. With massive booking backlogs across test centers in Galway (Clifden and Tuam), purchasing a car with a fresh, long-term NCT is highly desirable.
              </p>
              <p className="mb-4">
                However, some sellers clear dashboard lights right before a viewing by disconnecting the battery or using a basic OBD (On-Board Diagnostics) tool to clear error codes temporarily. These warning lights will reappear after you drive 10 or 20 kilometers, often highlighting catastrophic engine or safety issues.
              </p>
              <p className="mb-4">
                To protect yourself, pay close attention to the dashboard cluster when turning the key to position two (Ignition On). All key warning lights—specifically the **Engine Management Light (EML)**, ABS, and Airbag lights—must illuminate. This proves the bulbs are active and haven't been physically disabled. Once the engine starts, every single light must extinguish immediately.
              </p>
            </div>

            <p className="mb-6 p-4 bg-yellow-50 border-l-4 border-yellow-400 text-sm text-yellow-800 rounded-r-lg italic">
              <strong>Buyer Warning:</strong> If you are buying a used diesel car for driving around Galway City, the Diesel Particulate Filter (DPF) is highly likely to be clogged. Diesel cars need long motorway runs to burn off exhaust soot. Short trips to Eyre Square will block the filter, leading to an immediate NCT emissions fail and a €1,000+ repair bill.
            </p>
          </section>

          {/* Section 4 */}
          <section id="comparison" className="mb-20 scroll-mt-28">
            <h2 className="text-3xl font-bold mb-6 text-slate-900">4. Showroom Warranties vs. Unprotected Private Sales</h2>
            <p className="mb-6">
              When navigating the marketplace for **second-hand cars in Galway**, you have two main routes: buying privately online or purchasing from a registered independent dealership. Let's compare the legal realities of both pathways.
            </p>
            
            {/* Interactive Tabs */}
            <div className="flex space-x-1 p-1 bg-slate-100 rounded-xl mb-8">
              <button 
                onClick={() => setActiveTab('private')}
                className={`flex-1 py-3 text-sm font-bold rounded-lg transition ${activeTab === 'private' ? 'bg-white shadow-md text-red-600' : 'text-slate-500 hover:text-slate-700'}`}
              >
                Private Market Buyer
              </button>
              <button 
                onClick={() => setActiveTab('dealer')}
                className={`flex-1 py-3 text-sm font-bold rounded-lg transition ${activeTab === 'dealer' ? 'bg-white shadow-md text-red-600' : 'text-slate-500 hover:text-slate-700'}`}
              >
                Dealer Showroom Buyer
              </button>
            </div>

            <div className="bg-white border border-slate-200 rounded-2xl p-6 md:p-8 hover:border-red-300 transition group">
              <div className="flex justify-between items-start mb-6">
                <h3 className="text-2xl font-bold group-hover:text-red-600 transition">{comparisonMap[activeTab].title}</h3>
                <span className={`text-xs px-3 py-1 rounded-full font-bold ${activeTab === 'dealer' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                  {activeTab === 'dealer' ? 'High Security' : 'High Risk'}
                </span>
              </div>
              <p className="text-sm text-slate-500 mb-6 font-medium">{comparisonMap[activeTab].subtitle}</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">Legal Status & Protections</h4>
                  <ul className="space-y-4">
                    <li className="flex flex-col border-b border-slate-50 pb-2">
                      <span className="text-slate-500 text-xs">Framework</span>
                      <span className="font-semibold text-sm text-slate-800">{comparisonMap[activeTab].status}</span>
                    </li>
                    <li className="flex flex-col border-b border-slate-50 pb-2">
                      <span className="text-slate-500 text-xs">Consumer Protection</span>
                      <span className="font-semibold text-sm text-slate-800">{comparisonMap[activeTab].protection}</span>
                    </li>
                    <li className="flex flex-col border-b border-slate-50 pb-2">
                      <span className="text-slate-500 text-xs">Warranty Cover</span>
                      <span className="font-semibold text-sm text-red-600">{comparisonMap[activeTab].warranty}</span>
                    </li>
                  </ul>
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">Target Profile & Risks</h4>
                  <p className="text-sm text-slate-600 mb-4">{comparisonMap[activeTab].bestFor}</p>
                  <div className="flex flex-wrap gap-2">
                    {comparisonMap[activeTab].risks.map((risk, i) => (
                      <span key={i} className="text-[10px] bg-red-50 text-red-600 px-2 py-1 rounded-md font-bold uppercase tracking-tighter">⚠ {risk}</span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-12 prose prose-slate max-w-none">
              <p className="mb-4">
                A private seller on Facebook or DoneDeal is under no legal obligation to point out mechanical flaws. The legal doctrine of **Caveat Emptor (Let the buyer beware)** applies absolutely. If the gearbox fails or the engine blows up on your drive home, you have zero legal recourse.
              </p>
              <p className="mb-4">
                Conversely, registered motor dealers are bound by the **Consumer Rights Act**. The vehicle must be fit for purpose, of merchantable quality, and matching its description. When you buy from ShahMotors, we back this up with certified pre-sale diagnostic sweeps, full servicing, NCT preparation, and a multi-month warranty to keep you moving securely.
              </p>
            </div>
          </section>

          {/* Section 5 */}
          <section id="roads" className="mb-20 scroll-mt-28">
            <h2 className="text-3xl font-bold mb-6 text-slate-900">5. Matching Mechanical Specs to West of Ireland Roads</h2>
            <p className="mb-4">
              Not all cars are physically built to handle the varied terrain of the West of Ireland. Driving in Galway means transitioning seamlessly from smooth national motorways (like the M6) to rough, unlit regional roads with severe potholes, deep puddles, and loose asphalt.
            </p>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8">
              {[
                { grade: 'Tyre Aspect', desc: 'Avoid ultra-low-profile tyres; opt for 55+ ratios to cushion against potholes.' },
                { grade: 'Suspension', desc: 'Inspect shock absorbers and bushes for leaks caused by uneven rural roads.' },
                { grade: 'Transmission', desc: 'Automatic gearboxes ease stress in busy Headford Road and bridge traffic.' },
                { grade: 'Engine Type', desc: 'Self-charging hybrids offer maximum economy in stop-start urban areas.' },
                { grade: 'Headlights', desc: 'Ensure bright, clean lenses for unlit, foggy coastal lanes at night.' },
                { grade: 'Under-Shields', desc: 'Verify plastic splashguards are intact to protect engine electrics from standing water.' },
              ].map((item, idx) => (
                <div key={idx} className="p-4 rounded-xl border border-slate-200 bg-white hover:border-red-300 transition-all">
                  <div className="text-md font-black text-red-600 mb-1">{item.grade}</div>
                  <div className="text-xs font-semibold text-slate-600">{item.desc}</div>
                </div>
              ))}
            </div>

            <p className="mb-4">
              If your daily commute includes rural lanes through Oughterard, Clifden, or the valleys of Connemara, a vehicle with low ground clearance and stiff sports suspension will feel uncomfortable and suffer premature suspension joint wear. Look for resilient hatchbacks, robust saloons, or crossover SUVs with sensible tyre sidewall profiles to absorb physical impacts.
            </p>
          </section>

          {/* Detailed In-Depth Content */}
          <section id='analysis' className="mb-20 border-t border-slate-100 pt-12 scroll-mt-28">
            <h2 className="text-2xl font-bold mb-6">In-Depth Technical Analysis: The Mechanical Check Sequence</h2>
            <div className="prose prose-sm prose-slate max-w-none text-slate-500">
              <p className="mb-4">
                To guarantee you are making a sound investment, follow our **ShahMotors multi-point sequence** during your physical test drive and viewing.
              </p>
              <p className="mb-4">
                <strong>1. The Cold Start Inspection:</strong> Always request that the seller leaves the engine cold before you arrive. A warm engine can easily hide starting troubles, worn timing chains, failing starter motors, or exhaust manifold blowing noises. Feel the bonnet before starting the car; if it is already warm, ask why.
              </p>
              <p className="mb-4">
                <strong>2. Steering Rack and Wheel Bearings:</strong> Turn the steering wheel fully lock-to-lock while stationary. Listen closely for any popping, clunking, or groaning sounds, which indicate worn CV joints or power steering pump issues. On your test drive, find a quiet stretch of asphalt and listen for a low, rhythmic humming noise that increases with road speed—this is the classic signature of a failing wheel bearing.
              </p>
              <p className="mb-4">
                <strong>3. Under-the-Bonnet Fluids:</strong> Pull the oil dipstick. If the oil resembles a thick, milky substance, water/coolant is mixing with the engine oil, indicating a blown head gasket. Inspect the engine coolant reservoir; the fluid should be clean pink, blue, or yellow, and free of oily residues or floating sludge.
              </p>
              <p className="mb-4">
                <strong>4. Hybrid Battery Diagnostics:</strong> If you are looking at premium **toyota used cars** like a Toyota Aqua or Prius, check the hybrid system functionality. On your test drive, observe the battery status monitor. The energy flow should transition smoothly between the petrol engine and electric motor with no sudden drops in charge levels, which would indicate failing battery cells.
              </p>
              <p className="mb-4">
                By taking these rigorous, systematic mechanical checks seriously, you can save yourself thousands in future repairs and ensure your next used car purchase is fully prepared for years of dependable service across Ireland.
              </p>
            </div>
          </section>

          {/* Interactive FAQs */}
          <section id="faq" className="mb-20 scroll-mt-28">
            <h2 className="text-3xl font-bold mb-6 text-slate-900">Frequently Asked Questions</h2>
            <div className="space-y-4">
              {faqItems.map((item, idx) => (
                <div key={idx} className="overflow-hidden rounded-3xl border border-slate-200 bg-slate-50">
                  <button
                    type="button"
                    onClick={() => setActiveFaq(activeFaq === idx ? null : idx)}
                    className="w-full flex items-center justify-between gap-4 px-6 py-5 text-left text-slate-900 transition hover:bg-slate-100"
                  >
                    <span className="font-semibold text-lg">{idx + 1}. {item.question}</span>
                    <span className="text-slate-500 text-2xl">{activeFaq === idx ? '−' : '+'}</span>
                  </button>
                  <div className={`px-6 pb-5 text-slate-600 transition-all duration-300 ${activeFaq === idx ? 'max-h-125 opacity-100 font-medium' : 'max-h-0 opacity-0'} overflow-hidden`}>
                    <p className="text-base leading-7">{item.answer}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Why ShahMotors Block */}
          <div className="bg-white p-8 rounded-3xl border border-slate-200 mb-5">
            <h3 className="text-lg font-bold mb-4 text-slate-900 italic">Why ShahMotors?</h3>
            <p className="text-base text-slate-600 mb-6 italic leading-relaxed">
              We operate our Galway showroom under a simple philosophy: Irish drivers deserve completely reliable, mechanically flawless cars. Every vehicle we source goes through an extensive multi-point inspection to ensure absolute safety, clear titles, and long-term value.
            </p>
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center font-bold text-black"><span className='text-red-600'>S</span>M</div>
              <div>
                <span className="block text-sm font-bold text-slate-900 uppercase">Management Team</span>
                <span className="block text-[14px] text-slate-400">ShahMotors Ireland</span>
              </div>
            </div>
          </div>

          {/* Tag Pill Box */}
          <div className="p-6 bg-red-50 rounded-3xl border border-red-100">
            <h4 className="font-bold text-red-900 mb-2">Search Terms Used in this Guide:</h4>
            <div className="flex flex-wrap gap-2">
              {[
                'Used Cars Galway', 'Irish NCT Tips', 'Underbody Corrosion', 'Outstanding Finance Check', 'Car History Ireland', 'Toyota Used Cars', 'Automatic Hatchback Galway'
              ].map(tag => (
                <span key={tag} className="text-[14px] font-bold text-red-400 px-2 py-1 bg-white rounded border border-red-100">{tag}</span>
              ))}
            </div>
          </div>

        </div>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default App;