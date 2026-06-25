"use client";
import React, { useState, useMemo } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
  PieChart, Pie, Cell
} from 'recharts';
import Link from 'next/link';



// Type definitions
type SUVKey = 'rav4' | 'xtrail' | 'outlander' | 'forester' | 'vitara';

interface SUVDetail {
  name: string;
  engine: string;
  economy: string;
  tax: string;
  drivetrain: string;
  bestFor: string;
  pros: string[];
}

export default function ConnemaraSUVGuide() {
  const [activeTab, setActiveTab] = useState<SUVKey>('rav4');
  const [activeFaq, setActiveFaq] = useState<number | null>(null);
  
  // Running Cost Calculator State
  const [annualKM, setAnnualKM] = useState<number>(18000);
  const [fuelPrice, setFuelPrice] = useState<number>(1.85); // € per litre
  
  // Interactive Matcher State
  const [matcherStep, setMatcherStep] = useState<number>(1);
  const [familySize, setFamilySize] = useState<string>('');
  const [offRoadNeed, setOffRoadNeed] = useState<string>('');
  const [commuteType, setCommuteType] = useState<string>('');
  const [matcherResult, setMatcherResult] = useState<SUVKey | null>(null);

  // Market & Cost Data
  const fuelSavingsData = useMemo(() => {
    // Traditional Diesel SUV: 8.5L / 100km
    // Modern Japanese Hybrid SUV: 5.2L / 100km
    const dieselLiters = (annualKM / 100) * 8.5;
    const hybridLiters = (annualKM / 100) * 5.2;
    const dieselCost = Math.round(dieselLiters * fuelPrice);
    const hybridCost = Math.round(hybridLiters * fuelPrice);
    
    // Tax estimates: Diesel €600, Hybrid €190
    return [
      { name: 'Fuel Costs', Diesel: dieselCost, Hybrid: hybridCost },
      { name: 'Annual Motor Tax', Diesel: 600, Hybrid: 190 },
      { name: 'Est. Servicing/DPF Repairs', Diesel: 450, Hybrid: 200 },
    ];
  }, [annualKM, fuelPrice]);

  const suvSpecs: Record<SUVKey, SUVDetail> = {
    rav4: {
      name: 'Toyota RAV4 Hybrid (AWD-i)',
      engine: '2.5L Self-Charging Hybrid',
      economy: '5.1L/100km (Approx. 55 MPG)',
      tax: '€190 per year',
      drivetrain: 'Intelligent All-Wheel Drive (E-Four)',
      bestFor: 'Daily long-distance Galway to Dublin commuters who require bulletproof reliability and elite resale value.',
      pros: ['Sips petrol on city gridlock', 'No battery range anxiety', 'Renowned for lasting past 300,000km']
    },
    xtrail: {
      name: 'Nissan X-Trail e-POWER (e-4ORCE)',
      engine: '1.5L Turbo Hybrid (Electric Drive)',
      economy: '5.8L/100km (Approx. 48 MPG)',
      tax: '€270 per year',
      drivetrain: 'Dual-Motor Active All-Wheel Drive',
      bestFor: 'Growing Galway families traveling between Oughterard and Clifden needing modular seating and enormous cabin space.',
      pros: ['7-seater configuration available', 'Instant electric torque response', 'Plush premium interior cabin']
    },
    outlander: {
      name: 'Mitsubishi Outlander PHEV',
      engine: '2.4L Plug-In Hybrid',
      economy: '2.0L/100km (When charged) / 6.2L/100km fuel mode',
      tax: '€170 per year',
      drivetrain: 'Super All-Wheel Control (S-AWC)',
      bestFor: 'Salthill or Galway City residents with home chargers who can commute to work on pure electricity and use petrol for the weekend drive to Letterfrack.',
      pros: ['Up to 50km pure EV range', 'Heavy-duty 4WD mud and snow lock', 'Saves thousands on local school runs']
    },
    forester: {
      name: 'Subaru Forester AWD (e-Boxer)',
      engine: '2.0L Mild-Hybrid Boxer',
      economy: '6.7L/100km (Approx. 42 MPG)',
      tax: '€270 per year',
      drivetrain: 'Legendary Symmetrical Permanent AWD',
      bestFor: 'Connemara farmers, outdoor enthusiasts, and builders navigating steep gravel tracks and flooded boglands around Maam Cross.',
      pros: ['Unmatched off-road traction control', 'Extremely low center of gravity', 'Exceptional structural safety frame']
    },
    vitara: {
      name: 'Suzuki Vitara Boosterjet AllGrip',
      engine: '1.4L Boosterjet Mild-Hybrid',
      economy: '5.6L/100km (Approx. 50 MPG)',
      tax: '€210 per year',
      drivetrain: 'AllGrip Selectable 4WD',
      bestFor: 'Solo drivers or couples looking for a compact, highly reliable, easy-to-park 4x4 for the winding coastal roads of Salthill.',
      pros: ['Very lightweight and agile', 'Incredibly easy to park in city spaces', 'Superb mechanical simplicity']
    }
  };

  const handleMatcherNext = () => {
    if (matcherStep === 1 && familySize) setMatcherStep(2);
    else if (matcherStep === 2 && offRoadNeed) setMatcherStep(3);
    else if (matcherStep === 3 && commuteType) {
      // Logic to determine result
      if (familySize === 'large') {
        setMatcherResult('xtrail');
      } else if (offRoadNeed === 'rough') {
        setMatcherResult('forester');
      } else if (commuteType === 'short' && offRoadNeed === 'light') {
        setMatcherResult('outlander');
      } else if (familySize === 'small' && commuteType === 'city') {
        setMatcherResult('vitara');
      } else {
        setMatcherResult('rav4');
      }
      setMatcherStep(4);
    }
  };

  const resetMatcher = () => {
    setMatcherStep(1);
    setFamilySize('');
    setOffRoadNeed('');
    setCommuteType('');
    setMatcherResult(null);
  };

  const faqItems = [
    {
      q: "Why are Japanese import SUVs so much cleaner and rust-free compared to UK imports in Galway?",
      a: "The difference is road salt. In the UK and Ireland, salt is heavily gritted onto icy roads during winter, which kicks up under the chassis and causes severe, structural rust on steel components over time. In contrast, Japan's primary metropolitan areas (where most export cars are sourced) do not use road salt. Japanese vehicle owners are also fanatical about undercarriage cleanliness. This means when you buy a Japanese import from a premium dealer like ShahMotors, you get a clean chassis that is ready to withstand the salty sea breeze of Salthill and the rain-swept roads of Oughterard."
    },
    {
      q: "Is a hybrid SUV really capable of handling flooded rural roads in the West of Ireland?",
      a: "Yes, modern Japanese hybrid SUVs are highly capable. Vehicles like the Toyota RAV4 Hybrid (AWD-i) and Mitsubishi Outlander PHEV feature advanced, sealed hybrid battery units positioned safely in the floor chassis, well away from water exposure. With elevated ground clearances ranging from 180mm to 220mm, these vehicles easily navigate coastal surface flooding, farm tracks, and uneven bog roads along the N59 without sacrificing safety or mechanical reliability."
    },
    {
      q: "What is the difference between AWD and traditional 4WD for daily Connemara driving?",
      a: "For 95% of Connemara drivers, an Intelligent All-Wheel Drive (AWD) system is the superior choice. Unlike heavy, old-school 4WD systems that require manual engagement and ruin fuel efficiency, modern electronic AWD (like Toyota's E-Four or Nissan's e-4ORCE) remains front-wheel drive on dry tarmac to save fuel. The instant its wheel-sensors detect a patch of wet mud, loose gravel, or black ice, the system routes torque to the rear wheels in milliseconds. This gives you instant stability on winding country bends without the massive fuel bills of a traditional engine-driven 4x4."
    },
    {
      q: "Are parts readily available for Japanese imported SUVs in County Galway?",
      a: "Absolutely. Many popular Japanese import models are identical to their European counterparts (for example, the Japanese Toyota Aqua shares parts with the Prius c, and the RAV4 Hybrid is built on a global platform). At ShahMotors, we maintain strong supply lines directly from Japan and domestic distributors, ensuring that spare parts, cosmetic panels, and hybrid batteries are readily available. Any local, independent mechanic in Galway can easily service these vehicles with standard diagnostic tools."
    },
    {
      q: "How does the Japanese Auction Grading system protect me when buying a used SUV?",
      a: "Unlike domestic car markets where you have to take the seller's word, Japanese imports are subject to a incredibly strict, legally binding inspection before they ever leave Japan. Certified independent inspectors check the engine, chassis, paintwork, interior, and electronics, assigning an overall grade. Grade 5 is brand new, Grade 4.5 is near-perfect, and Grade 4.0 indicates an excellent used vehicle with zero structural defects. At ShahMotors, we exclusively import Grade 4.0 and above. We provide the original, untampered Japanese auction sheets to our Galway buyers for absolute transparency."
    },
    {
      q: "Will I face extremely high insurance premiums in Ireland for a Japanese import SUV?",
      a: "There is a common myth that imports are uninsurable, but the reality is straightforward: it is all about anti-theft security. Because Japan has exceptionally low vehicle crime rates, many Japanese-market cars do not leave the factory with active engine immobilisers. When these cars reach Ireland, insurance underwriters classify them as high risk. To solve this, ShahMotors installs an Irish-certified, Thatcham-approved immobiliser system in every single Japanese import SUV before handover. This simple step guarantees you can obtain cheap, hassle-free insurance quotes from mainstream providers like AXA, Allianz, and Aviva."
    }
  ];

  const sections = [
    { id: 'intro', title: '1. The Connemara Challenge' },
    { id: 'anatomy', title: '2. The Anatomy of a Galway SUV' },
    { id: 'picks', title: '3. Top 5 Used SUVs & 4x4s Vetted' },
    { id: 'calculator', title: '4. The Economic Math: Cost Calculator' },
    { id: 'matcher', title: '5. Matcher Tool' },
    { id: 'grading', title: '6. The Grading Matrix' },
    { id: 'security', title: '7. Anti-Theft & Insurance' },
    { id: 'faq', title: '8. Frequently Asked Questions' }
  ];

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 leading-relaxed font-sans">
        <div className="relative max-w-7xl mx-auto pb-16">
            <Navbar />
        </div>

      {/* Hero Section */}
      <header className="pt-20 pb-24 bg-linear-to-br from-white via-red-50/50 to-red-100/40 border-b border-slate-100">
        <div className="max-w-5xl mx-auto px-4 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-red-50 border border-red-200 rounded-full text-red-600 text-xs font-black uppercase tracking-wider mb-6">
            <span className="w-2 h-2 rounded-full bg-red-600 animate-pulse"></span>
            Galway & Connemara Driver's Guide
          </div>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-black text-slate-900 mb-8 leading-[1.05] tracking-tight">
            Top Used SUVs and 4x4s for <br/>
            <span className="text-transparent bg-clip-text bg-linear-to-r from-red-600 to-red-500">Connemara's Rural Roads</span>
          </h1>
          <p className="text-lg md:text-xl text-slate-600 mb-8 max-w-3xl mx-auto leading-relaxed">
            From the tight hairpin bends of Maam Cross to the salty coastal breezes of Salthill, rural driving in the West of Ireland demands a rugged, efficient, and robust vehicle. Discover why smart Galway families are skipping high-emission diesels and switching to pre-owned Japanese import SUVs.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <span className="px-4 py-2 bg-white shadow-sm border border-slate-200 rounded-xl text-xs font-bold text-slate-500 uppercase tracking-wide">#UsedSUVsGalway</span>
            <span className="px-4 py-2 bg-white shadow-sm border border-slate-200 rounded-xl text-xs font-bold text-slate-500 uppercase tracking-wide">#4x4sForSaleIreland</span>
            <span className="px-4 py-2 bg-white shadow-sm border border-slate-200 rounded-xl text-xs font-bold text-slate-500 uppercase tracking-wide">#JapaneseImportsGalway</span>
          </div>
        </div>
      </header>

      {/* Main Grid Layout */}
      <main className="max-w-7xl mx-auto px-4 py-12 grid grid-cols-1 lg:grid-cols-12 gap-12">
        
        {/* Sticky Sidebar */}
        <aside className="hidden lg:block lg:col-span-3">
          <div className="sticky top-12 space-y-10">
            <div>
              <h4 className="text-[12px] font-black uppercase tracking-widest text-slate-400 mb-6">Table of Contents</h4>
              <ul className="space-y-4">
                {sections.map((section) => (
                  <li key={section.id}>
                    <a href={`#${section.id}`} className="group flex items-center gap-3 text-slate-600 hover:text-red-600 font-bold transition-all text-sm">
                      <span className="w-0 group-hover:w-4 h-0.5 bg-red-600 transition-all"></span>
                      {section.title}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Live CTA Box */}
            <div className="p-6 bg-slate-950 text-white rounded-3xl shadow-xl border border-slate-800 relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-24 h-24 bg-red-600 rounded-full blur-2xl opacity-20 group-hover:opacity-40 transition-opacity"></div>
              <h4 className="text-lg font-black mb-2 text-white">Find Your Next Ride</h4>
              <p className="text-xs text-slate-400 mb-6 leading-relaxed">
                Skip the mechanical gambles. Check out our physical inventory in Galway, vetted with certified multi-point history sheets.
              </p>
              <Link href='/cars' className="w-full flex items-center justify-center py-4 bg-red-600 hover:bg-red-500 text-white font-black rounded-xl transition duration-200 active:scale-95 shadow-lg shadow-red-900/30">
                EXPLORE SUV STOCK
              </Link>
            </div>
          </div>
        </aside>

        {/* Content Panel */}
        <div className="lg:col-span-9 bg-white p-6 md:p-12 rounded-3xl shadow-sm border border-slate-100">
          
          {/* Section 1: Introduction */}
          <section id="intro" className="mb-16 scroll-mt-6">
            <h2 className="text-2xl md:text-3xl font-black mb-6 text-slate-900">1. The Connemara Challenge: Why Rural Galway Demands More Than a Standard Hatchback</h2>
            <div className="prose prose-slate max-w-none text-slate-600 leading-relaxed space-y-4">
              <p>
                To tourists, driving the Wild Atlantic Way or navigating the winding roads through Clifden, Letterfrack, and Oughterard is a postcard-perfect dream. To the people who live and work here, however, the roads of County Galway represent one of the most mechanically demanding environments in northern Europe. The West of Ireland is a place where wild Atlantic winds, sudden freezing spells, wandering livestock, and relentless coastal rain create roads that chew through inferior passenger cars.
              </p>
              <p>
                If you are driving a low-riding saloon or a compact city hatchback daily down the N59 or along the exposed coastal curves of Salthill, you are already familiar with the symptoms: bottoming out on harsh country bumps, scraping tyre sidewalls against hidden stone borders, and feeling the steering wheel tug violently as you hit deep pools of standing water. Standard passenger cars simply lack the suspension travel, tire height, and underbody protection required for long-term survival in this region.
              </p>
              <p>
                In the past, the default answer for rural Irish drivers was to buy a heavy, high-emission diesel car. However, modern environmental policy, rising diesel pump costs, and the notorious mechanical failure of DPF (Diesel Particulate Filter) systems on short, cold trips have rendered diesels highly impractical for many families. This is why the search for <strong>used SUVs Galway</strong> and reliable <strong>4x4s for sale Ireland</strong> has shifted focus toward robust, self-charging hybrid systems.
              </p>
              <div className="p-6 bg-red-50 border-l-4 border-red-600 rounded-r-2xl my-8">
                <p className="font-bold text-red-900 text-base mb-1">Local Perspective:</p>
                <p className="text-red-900 text-sm italic">
                  "Navigating Maam Cross on an icy January night in a front-wheel-drive saloon with high winds is an exercise in stress. Upgrading to a vehicle with smart, active all-wheel traction doesn't just save your car's suspension—it provides absolute peace of mind for you and your family."
                </p>
              </div>
            </div>
          </section>

          {/* Section 2: Anatomy */}
          <section id="anatomy" className="mb-16 scroll-mt-6 border-t border-slate-100 pt-12">
            <h2 className="text-2xl md:text-3xl font-black mb-6 text-slate-900">2. The Anatomy of a Connemara-Proof SUV</h2>
            <p className="text-slate-600 mb-8 leading-relaxed">
              When searching the market for <strong>second-hand cars Galway</strong> or browsing lists of import vehicles, it is critical to look beyond pure aesthetic design. A truly capable rural SUV needs to check specific engineering boxes to withstand the unique road layout of the West of Ireland. Here is what you should look for:
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
              <div className="p-6 bg-slate-50 rounded-2xl border border-slate-200/60">
                <div className="bg-red-100 text-red-600 w-10 h-10 flex items-center justify-center rounded-xl font-bold mb-4">
                  180+
                </div>
                <h4 className="font-black text-slate-900 mb-2">Ground Clearance</h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  A minimum of 180mm of vertical height keeps your oil sump, exhaust system, and floorboards safe from flooding and bottoming out on sunken bog roads.
                </p>
              </div>
              <div className="p-6 bg-slate-50 rounded-2xl border border-slate-200/60">
                <div className="bg-red-100 text-red-600 w-10 h-10 flex items-center justify-center rounded-xl font-bold mb-4">
                  AWD
                </div>
                <h4 className="font-black text-slate-900 mb-2">Intelligent AWD</h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Avoid heavy manual diff-locks. Look for smart electronic systems that engage the rear axle instantly when they detect black ice, mud, or heavy rain.
                </p>
              </div>
              <div className="p-6 bg-slate-50 rounded-2xl border border-slate-200/60">
                <div className="bg-red-100 text-red-600 w-10 h-10 flex items-center justify-center rounded-xl font-bold mb-4">
                  Profile
                </div>
                <h4 className="font-black text-slate-900 mb-2">High-Profile Tyres</h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Avoid thin, ultra-low-profile sports wheels. Thicker tyre sidewalls absorb the shock of deep potholes and resist pinch-flat damage on rough gravel.
                </p>
              </div>
            </div>
            
            <div className="prose prose-slate max-w-none text-slate-600 leading-relaxed space-y-4">
              <p>
                An often overlooked feature is **water wading capability**. Winding coastal highways around Roundstone can easily collect tidal surge water, while heavy Connemara cloudbursts routinely drown low-lying road gullies in Maam Valley. SUVs built on modular architectures, like the Toyota RAV4 Hybrid, have their high-voltage electrical lines heavily shielded and routed high in the engine bay to safely wade through surface pooling that would stall a standard car.
              </p>
            </div>
          </section>

          {/* Section 3: Picks */}
          <section id="picks" className="mb-16 scroll-mt-6 border-t border-slate-100 pt-12">
            <h2 className="text-2xl md:text-3xl font-black mb-2 text-slate-900">3. Top 5 Used SUVs & 4x4s Vetted for Galway Roads</h2>
            <p className="text-slate-600 mb-8 leading-relaxed">
              Based on local repair frequencies, chassis corrosion resistance, and real-world fuel economy under Irish conditions, here are our top pre-owned picks from our <strong>japanese imports Galway</strong> stock.
            </p>

            {/* Interactive Tab Interface */}
            <div className="flex flex-wrap gap-2 p-1 bg-slate-100 rounded-2xl mb-8">
              {(Object.keys(suvSpecs) as SUVKey[]).map((key) => (
                <button
                  key={key}
                  onClick={() => setActiveTab(key)}
                  className={`px-4 py-3 text-xs md:text-sm font-black rounded-xl transition duration-150 ${activeTab === key ? 'bg-white shadow-md text-red-600' : 'text-slate-500 hover:text-slate-800'}`}
                >
                  {suvSpecs[key].name.split(' ')[1] || suvSpecs[key].name}
                </button>
              ))}
            </div>

            <div className="bg-linear-to-br from-slate-50 to-white border border-slate-200 rounded-3xl p-6 md:p-8 hover:border-red-200 transition duration-300">
              <div className="flex flex-wrap justify-between items-start gap-4 mb-6">
                <div>
                  <span className="text-xs font-black uppercase text-red-600 tracking-widest bg-red-50 px-3 py-1 rounded-full border border-red-100">
                    {suvSpecs[activeTab].drivetrain}
                  </span>
                  <h3 className="text-2xl md:text-3xl font-black text-slate-900 mt-2">{suvSpecs[activeTab].name}</h3>
                </div>
                <div className="bg-emerald-50 text-emerald-700 text-xs px-3 py-1.5 rounded-full font-bold border border-emerald-100">
                  Highly Vetted Import
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-4">
                  <h4 className="text-[11px] font-black uppercase tracking-widest text-slate-400">Mechanical Credentials</h4>
                  <ul className="space-y-3">
                    <li className="flex justify-between border-b border-slate-100 pb-2 text-sm">
                      <span className="text-slate-500">Powertrain</span>
                      <span className="font-bold text-slate-800">{suvSpecs[activeTab].engine}</span>
                    </li>
                    <li className="flex justify-between border-b border-slate-100 pb-2 text-sm">
                      <span className="text-slate-500">Fuel Economy</span>
                      <span className="font-bold text-slate-800">{suvSpecs[activeTab].economy}</span>
                    </li>
                    <li className="flex justify-between border-b border-slate-100 pb-2 text-sm">
                      <span className="text-slate-500">Annual Road Tax</span>
                      <span className="font-bold text-red-600">{suvSpecs[activeTab].tax}</span>
                    </li>
                  </ul>
                </div>

                <div className="space-y-4">
                  <h4 className="text-[11px] font-black uppercase tracking-widest text-slate-400">West of Ireland Focus</h4>
                  <p className="text-sm text-slate-600 leading-relaxed mb-4">{suvSpecs[activeTab].bestFor}</p>
                  <div className="flex flex-wrap gap-2">
                    {suvSpecs[activeTab].pros.map((pro, i) => (
                      <span key={i} className="text-[10px] md:text-xs bg-slate-900 text-white px-3 py-1 rounded-lg font-bold tracking-tight">
                        ✓ {pro}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Section 4: Economic Calculator */}
          <section id="calculator" className="mb-16 scroll-mt-6 border-t border-slate-100 pt-12">
            <h2 className="text-2xl md:text-3xl font-black mb-4 text-slate-900">4. The Economic Math: Hybrid SUV vs. Diesel 4x4</h2>
            <p className="text-slate-600 mb-8 leading-relaxed">
              Many Irish car buyers hold the outdated belief that petrol hybrid SUVs are expensive to run over long distances compared to traditional diesels. Let's do the real-world math. Modern Euro 6 diesels are heavily penalized under the current <strong>Irish motor tax bands</strong> system, and short-trip commuting causes carbon buildup that ruins DPF filters—a repair that can cost up to €1,500. 
            </p>

            {/* Interactive Sliders */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 bg-slate-50 p-6 md:p-8 rounded-3xl border border-slate-200/80 mb-8">
              <div className="space-y-6">
                <h4 className="text-sm font-black uppercase tracking-wider text-slate-800">Customize Your Commute</h4>
                
                <div>
                  <div className="flex justify-between text-xs font-bold text-slate-500 mb-2">
                    <span>Annual Driving Distance:</span>
                    <span className="text-red-600 font-bold">{annualKM.toLocaleString()} km</span>
                  </div>
                  <input 
                    type="range" 
                    min="5000" 
                    max="40000" 
                    step="1000" 
                    value={annualKM} 
                    onChange={(e) => setAnnualKM(Number(e.target.value))}
                    className="w-full accent-red-600 h-2 bg-slate-200 rounded-lg cursor-pointer"
                  />
                  <span className="text-[10px] text-slate-400 block mt-1">Average Irish driver covers 16,000 - 20,000 km per year.</span>
                </div>

                <div>
                  <div className="flex justify-between text-xs font-bold text-slate-500 mb-2">
                    <span>Average Fuel Price:</span>
                    <span className="text-red-600 font-bold">€{fuelPrice.toFixed(2)} / Litre</span>
                  </div>
                  <input 
                    type="range" 
                    min="1.50" 
                    max="2.20" 
                    step="0.05" 
                    value={fuelPrice} 
                    onChange={(e) => setFuelPrice(Number(e.target.value))}
                    className="w-full accent-red-600 h-2 bg-slate-200 rounded-lg cursor-pointer"
                  />
                </div>
              </div>

              {/* Live Cost Chart Display */}
              <div className="h-64 w-full">
                <h5 className="text-xs font-black uppercase tracking-widest text-slate-400 mb-4 text-center">Annual Running Cost Breakdown (€)</h5>
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={fuelSavingsData}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} />
                    <XAxis dataKey="name" tick={{ fontSize: 10 }} />
                    <YAxis tick={{ fontSize: 10 }} />
                    <Tooltip contentStyle={{ borderRadius: '12px', border: 'none', fontSize: 12 }} />
                    <Legend wrapperStyle={{ fontSize: 10 }} />
                    <Bar dataKey="Diesel" fill="#94a3b8" name="Traditional Diesel" radius={[4, 4, 0, 0]} />
                    <Bar dataKey="Hybrid" fill="#dc2626" name="Japanese Hybrid" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            <p className="text-sm text-slate-500 italic text-center mb-8">
              Note: Estimates are calculated based on a real-world combined test cycle of 8.5L/100km (Diesel SUV) vs. 5.2L/100km (Self-charging Hybrid).
            </p>
          </section>

          {/* Section 5: Dynamic Matcher */}
          <section id="matcher" className="mb-16 scroll-mt-6 border-t border-slate-100 pt-12">
            <h2 className="text-2xl md:text-3xl font-black mb-4 text-slate-900">5. Interactive Tool: Find Your Ideal Connemara SUV</h2>
            <p className="text-slate-600 mb-8 leading-relaxed">
              Don't guess what vehicle fits your lifestyle. Use our quick 3-step terrain matching tool to instantly view the recommended model for your daily Galway routine.
            </p>

            <div className="bg-slate-950 text-white rounded-3xl p-6 md:p-8 shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-48 h-48 bg-red-600 rounded-full blur-3xl opacity-10"></div>
              
              {matcherStep === 1 && (
                <div className="space-y-6">
                  <span className="text-xs font-black uppercase tracking-widest text-red-500">Step 1 of 3</span>
                  <h3 className="text-xl md:text-2xl font-black">How large is your typical traveling group?</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {[
                      { key: 'small', label: '1 - 2 People', desc: 'No kids, minimal heavy luggage requirements' },
                      { key: 'medium', label: '3 - 4 People', desc: 'Typical family setup with school bags or dog crates' },
                      { key: 'large', label: '5+ People', desc: 'Need active modular seating / 7-seater option' },
                    ].map((opt) => (
                      <button
                        key={opt.key}
                        onClick={() => setFamilySize(opt.key)}
                        className={`p-5 rounded-2xl border text-left transition duration-150 ${familySize === opt.key ? 'border-red-600 bg-red-600/10 text-white' : 'border-slate-800 bg-slate-900/50 hover:border-slate-600 text-slate-300'}`}
                      >
                        <span className="block font-bold text-base mb-1">{opt.label}</span>
                        <span className="block text-xs text-slate-400">{opt.desc}</span>
                      </button>
                    ))}
                  </div>
                  <div className="flex justify-end mt-4">
                    <button
                      disabled={!familySize}
                      onClick={handleMatcherNext}
                      className="px-6 py-3 bg-red-600 disabled:bg-slate-800 disabled:cursor-not-allowed font-black rounded-xl text-white hover:bg-red-500 transition"
                    >
                      Next Step
                    </button>
                  </div>
                </div>
              )}

              {matcherStep === 2 && (
                <div className="space-y-6">
                  <span className="text-xs font-black uppercase tracking-widest text-red-500">Step 2 of 3</span>
                  <h3 className="text-xl md:text-2xl font-black">What is your typical road surface/terrain requirement?</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {[
                      { key: 'tarmac', label: 'Mostly Sealed Roads', desc: 'N59, Salthill promenade, and city commuting' },
                      { key: 'light', label: 'Mixed Rural Roads', desc: 'Narrow lanes, standard farm entry tracks, coastal paths' },
                      { key: 'rough', label: 'Rough Off-Road Terrain', desc: 'Bog paths, steep rocky gravel, towing trailers' },
                    ].map((opt) => (
                      <button
                        key={opt.key}
                        onClick={() => setOffRoadNeed(opt.key)}
                        className={`p-5 rounded-2xl border text-left transition duration-150 ${offRoadNeed === opt.key ? 'border-red-600 bg-red-600/10 text-white' : 'border-slate-800 bg-slate-900/50 hover:border-slate-600 text-slate-300'}`}
                      >
                        <span className="block font-bold text-base mb-1">{opt.label}</span>
                        <span className="block text-xs text-slate-400">{opt.desc}</span>
                      </button>
                    ))}
                  </div>
                  <div className="flex justify-between mt-4">
                    <button
                      onClick={() => setMatcherStep(1)}
                      className="px-6 py-3 bg-slate-900 font-bold rounded-xl text-slate-400 hover:text-white transition"
                    >
                      Back
                    </button>
                    <button
                      disabled={!offRoadNeed}
                      onClick={handleMatcherNext}
                      className="px-6 py-3 bg-red-600 disabled:bg-slate-800 disabled:cursor-not-allowed font-black rounded-xl text-white hover:bg-red-500 transition"
                    >
                      Next Step
                    </button>
                  </div>
                </div>
              )}

              {matcherStep === 3 && (
                <div className="space-y-6">
                  <span className="text-xs font-black uppercase tracking-widest text-red-500">Step 3 of 3</span>
                  <h3 className="text-xl md:text-2xl font-black">What does your weekly mileage split look like?</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {[
                      { key: 'city', label: 'City & Stop-Start', desc: 'Under 10,000km annually. Lots of school runs and traffic' },
                      { key: 'mixed', label: 'Balanced Commute', desc: '10,000 - 20,000km. Combining Galway City trips with weekend drives' },
                      { key: 'long', label: 'Heavy Long-Distance', desc: 'Over 20,000km. Regular long motorway hauls across Ireland' },
                    ].map((opt) => (
                      <button
                        key={opt.key}
                        onClick={() => setCommuteType(opt.key)}
                        className={`p-5 rounded-2xl border text-left transition duration-150 ${commuteType === opt.key ? 'border-red-600 bg-red-600/10 text-white' : 'border-slate-800 bg-slate-900/50 hover:border-slate-600 text-slate-300'}`}
                      >
                        <span className="block font-bold text-base mb-1">{opt.label}</span>
                        <span className="block text-xs text-slate-400">{opt.desc}</span>
                      </button>
                    ))}
                  </div>
                  <div className="flex justify-between mt-4">
                    <button
                      onClick={() => setMatcherStep(2)}
                      className="px-6 py-3 bg-slate-900 font-bold rounded-xl text-slate-400 hover:text-white transition"
                    >
                      Back
                    </button>
                    <button
                      disabled={!commuteType}
                      onClick={handleMatcherNext}
                      className="px-6 py-3 bg-red-600 disabled:bg-slate-800 disabled:cursor-not-allowed font-black rounded-xl text-white hover:bg-red-500 transition"
                    >
                      Show Recommendation
                    </button>
                  </div>
                </div>
              )}

              {matcherStep === 4 && matcherResult && (
                <div className="space-y-6 text-center">
                  <span className="text-xs font-black uppercase tracking-widest text-emerald-500 block">We Found Your Match!</span>
                  <h3 className="text-3xl font-black text-white">{suvSpecs[matcherResult].name}</h3>
                  <p className="text-slate-300 max-w-lg mx-auto text-sm leading-relaxed">
                    {suvSpecs[matcherResult].bestFor} It offers a robust {suvSpecs[matcherResult].engine} setup and returns an impressive {suvSpecs[matcherResult].economy}.
                  </p>
                  
                  <div className="flex justify-center gap-2 max-w-md mx-auto py-2">
                    {suvSpecs[matcherResult].pros.map((pro, idx) => (
                      <span key={idx} className="bg-slate-900 text-red-400 text-[10px] uppercase font-black px-3 py-1 rounded-full border border-slate-800">
                        {pro}
                      </span>
                    ))}
                  </div>

                  <div className="flex flex-col sm:flex-row justify-center gap-4 mt-6">
                    <button
                      onClick={resetMatcher}
                      className="px-6 py-3 bg-slate-900 hover:bg-slate-800 text-slate-300 font-bold rounded-xl transition text-sm"
                    >
                      Start Over
                    </button>
                    <button
                      onClick={() => {
                        setActiveTab(matcherResult);
                        const element = document.getElementById('picks');
                        if (element) element.scrollIntoView({ behavior: 'smooth' });
                      }}
                      className="px-6 py-3 bg-red-600 hover:bg-red-500 text-white font-black rounded-xl transition text-sm shadow-lg shadow-red-900/30"
                    >
                      View Full Specs Above
                    </button>
                  </div>
                </div>
              )}
            </div>
          </section>

          {/* Section 6: Grading */}
          <section id="grading" className="mb-16 scroll-mt-6 border-t border-slate-100 pt-12">
            <h2 className="text-2xl md:text-3xl font-black mb-6 text-slate-900">6. Demystifying the Japanese Auction Grading Matrix</h2>
            <p className="text-slate-600 mb-8 leading-relaxed">
              For drivers looking for <strong>high-quality cars for sale Galway</strong> can provide, the concept of buying an imported vehicle from Japan might feel unfamiliar. However, the Japanese domestic car market is actually the most regulated and transparent used car sector globally. Unlike local classified sites where mileage tampering and hidden frame repairs are common, every Japanese vehicle undergoes a strict independent auction inspection before export.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
              {[
                { g: 'Grade 5.0 / S', t: 'As Close to New as Possible', d: 'Perfect paint, immaculate interior, practically zero mileage.' },
                { g: 'Grade 4.5', t: 'Near Perfect Condition', d: 'Very minor superficial stone chips, pristine engine bay and chassis.' },
                { g: 'Grade 4.0', t: 'Excellent Standard Used', d: 'Minimal physical wear. Mechanically bulletproof with verified records.' },
                { g: 'Grade 3.5', t: 'Fair Condition', d: 'Visible scratches or interior wear. Generally avoided by premier showrooms.' },
                { g: 'Grade R / RA', t: 'Accident History', d: 'Vehicles that have suffered structural panel damage or repairs.' },
                { g: 'Grade 0 / XX', t: 'Major Damage', d: 'Severe structural collision damage or flood submersion history.' }
              ].map((item, idx) => (
                <div key={idx} className={`p-5 rounded-2xl border ${idx < 3 ? 'bg-red-50/40 border-red-200' : 'bg-white border-slate-200'}`}>
                  <span className={`text-lg font-black block ${idx < 3 ? 'text-red-600' : 'text-slate-400'}`}>{item.g}</span>
                  <span className="text-xs font-black text-slate-800 block mt-1 mb-2">{item.t}</span>
                  <p className="text-xs text-slate-600 leading-relaxed">{item.d}</p>
                </div>
              ))}
            </div>

            <p className="p-4 bg-amber-50 border-l-4 border-amber-500 text-xs text-amber-900 rounded-r-xl leading-relaxed">
              <strong>Why this matters to you:</strong> Some high-volume dealerships import Grade 3.5 or Grade R vehicles because they are cheaper at auction, allowing them to maximize profit. At ShahMotors, we maintain an uncompromising standard. We exclusively purchase Grade 4.0, 4.5, and 5.0 vehicles. This is our guarantee of mechanical integrity for the motorists of Galway and Connemara.
            </p>
          </section>

          {/* Section 7: Security */}
          <section id="security" className="mb-16 scroll-mt-6 border-t border-slate-100 pt-12">
            <h2 className="text-2xl md:text-3xl font-black mb-6 text-slate-900">7. The Security & Insurance Reality for Japanese Imports</h2>
            <div className="prose prose-slate max-w-none text-slate-600 leading-relaxed space-y-4">
              <p>
                If you have spent any time researching <strong>hybrid cars Ireland</strong> on forums or social media groups, you have probably run into the common insurance warning: *"Don't buy a Japanese import, because you can't get it insured!"* This rumor is widespread, but it ignores a very simple technical fix.
              </p>
              <p>
                In Japan, vehicle theft is virtually non-existent due to incredibly strict local laws and societal norms. Because of this, Japanese manufacturers often omit active engine immobilisers and alarms on domestic vehicles to save production costs. When these vehicles are imported to Ireland—where car theft is, unfortunately, a real concern—insurance underwriters identify the lack of a factory immobiliser as a major security loophole and will refuse coverage.
              </p>
              <p className="font-bold text-slate-900">
                The solution is simple: Certified physical installation of Irish-approved immobiliser hardware.
              </p>
              <p>
                At ShahMotors, we have eliminated this friction entirely. Before any imported SUV leaves our Galway showroom, our certified automotive technicians install an insurance-compliant, Thatcham-approved immobiliser system. We provide the certified installation paperwork directly with the vehicle handover. This guarantees that you can secure normal, competitive insurance quotes from all major Irish underwriters, including AXA, Aviva, and Allianz.
              </p>
            </div>
          </section>

          {/* Section 8: FAQ */}
          <section id="faq" className="mb-16 scroll-mt-6 border-t border-slate-100 pt-12">
            <h2 className="text-2xl md:text-3xl font-black mb-8 text-slate-900">8. Frequently Asked Questions</h2>
            <div className="space-y-4">
              {faqItems.map((item, idx) => (
                <div key={idx} className="overflow-hidden rounded-2xl border border-slate-200 bg-slate-50">
                  <button
                    type="button"
                    onClick={() => setActiveFaq(activeFaq === idx ? null : idx)}
                    className="w-full flex items-center justify-between gap-4 p-6 text-left transition hover:bg-slate-100"
                  >
                    <span className="font-bold text-slate-900 text-sm md:text-base">{item.q}</span>
                    <span className="text-slate-500 text-2xl shrink-0">{activeFaq === idx ? '−' : '+'}</span>
                  </button>
                  <div className={`px-6 pb-6 text-xs md:text-sm text-slate-600 leading-relaxed transition-all duration-300 ${activeFaq === idx ? 'block' : 'hidden'}`}>
                    {item.a}
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Final Brand Box */}
          <div className="bg-linear-to-br from-red-600 to-red-500 text-white p-8 md:p-12 rounded-3xl shadow-xl mt-16 text-center">
            <h3 className="text-2xl md:text-3xl font-black mb-4">Ready to Upgrade Your Galway Commute?</h3>
            <p className="text-red-50 max-w-xl mx-auto text-sm md:text-base leading-relaxed mb-8 opacity-90">
              Don't compromise on reliability or pay extreme diesel tax bills. Browse our latest arrivals of premium, Grade-vetted Japanese hybrid SUVs. Fully serviced, alarm-equipped, and road-ready for the West of Ireland.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <button className="px-8 py-4 bg-white text-red-600 font-black rounded-xl hover:bg-slate-50 transition duration-150 shadow-lg">
                VIEW INSTANT STOCK
              </button>
              <button className="px-8 py-4 bg-slate-950 text-white font-black rounded-xl hover:bg-slate-900 transition duration-150 border border-slate-800">
                BOOK TEST DRIVE
              </button>
            </div>
          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
}