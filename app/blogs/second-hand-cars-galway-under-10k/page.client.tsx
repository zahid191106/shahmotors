"use client";
import React, { useState, useMemo } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Link from 'next/link';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from 'recharts';

type VehicleProfileKey = 'yaris' | 'polo' | 'focus' | 'swift' | 'jazz';

interface VehicleProfile {
  name: string;
  engine: string;
  roadTax: string;
  economy: string;
  insuranceGroup: string;
  knownIssues: string[];
  bestFor: string;
  pros: string[];
}


export default function BudgetCarGuide() {
  const [activeTab, setActiveTab] = useState<VehicleProfileKey>('yaris');
  const [activeFaq, setActiveFaq] = useState<number | null>(null);
  
  // Running Cost State
  const [annualKM, setAnnualKM] = useState<number>(15000);
  const [fuelPrice, setFuelPrice] = useState<number>(1.82); // € per litre in Ireland

  // Interactive Checklist State
  const [checks, setChecks] = useState({
    tyres: false,
    rust: false,
    smokes: false,
    clutch: false,
    warningLights: false,
    serviceHistory: false,
    matchingPaint: false,
    brakesSqueal: false,
  });

  const vehicles: Record<VehicleProfileKey, VehicleProfile> = {
    yaris: {
      name: 'Toyota Yaris / Vitz (1.0L / 1.3L VVT-i)',
      engine: '1.0L Petrol (3-Cylinder) / 1.3L 4-Cylinder',
      roadTax: '€180 - €270 per year',
      economy: '4.7L/100km (Approx. 60 MPG)',
      insuranceGroup: 'Low (Group 4-6) - Ideal for students',
      knownIssues: ['Water pump leaks on pre-2015 models', 'Worn clutches on manual urban city cars', 'Stiff gearbox linkages'],
      bestFor: 'University of Galway/ATU students, first-time drivers, and solo Salthill commuters prioritizing zero-headache mechanicals.',
      pros: ['Incredibly reliable engine timing chain', 'Cheap replacement parts are widely stocked', 'Exceptional resale retention value in Ireland']
    },
    polo: {
      name: 'Volkswagen Polo (1.2L TSI / 1.4L Trendline)',
      engine: '1.2L TSI Turbocharged Petrol / 1.4L Naturally Aspirated',
      roadTax: '€270 per year',
      economy: '5.1L/100km (Approx. 55 MPG)',
      insuranceGroup: 'Medium-Low (Group 7-9)',
      knownIssues: ['Timing chain tensioner wear on pre-2014 TSI units', 'Electric window switches', 'EGR valve soot buildup on early engines'],
      bestFor: 'Daily long-distance commuters driving the M6 route from Oranmore to Athenry who need refined cabin insulation.',
      pros: ['Premium cabin feel and dashboard layout', 'Solid structural feel at motorway cruising speeds', 'Superb paint thickness and galvanization resistant to rust']
    },
    focus: {
      name: 'Ford Focus (1.0L EcoBoost / 1.6L Zetec)',
      engine: '1.0L 3-Cylinder Turbo Petrol / 1.6L Naturally Aspirated',
      roadTax: '€190 - €280 per year',
      economy: '5.3L/100km (Approx. 53 MPG)',
      insuranceGroup: 'Medium (Group 10-12)',
      knownIssues: ['Wet-belt breakdown on EcoBoost engines if wrong oil used', 'PowerShift automatic gearboxes fail frequently', 'Rear suspension bushing wear'],
      bestFor: 'Growing families around Tuam or Headford needing a larger boot space and balanced suspension chassis control.',
      pros: ['Phenomenal handling balance and steering feedback', 'Massive boot volume for sporting gear or buggies', 'Affordable servicing at any independent Galway garage']
    },
    swift: {
      name: 'Suzuki Swift (1.2L Dualjet / JDM Hybrid)',
      engine: '1.2L 4-Cylinder Naturally Aspirated Petrol / Mild-Hybrid',
      roadTax: '€190 per year',
      economy: '4.9L/100km (Approx. 57 MPG)',
      insuranceGroup: 'Very Low (Group 5-7)',
      knownIssues: ['Thin body panels scratch easily', 'Slightly noisy cabin at high motorway speeds', 'Small boot capacity'],
      bestFor: 'Drivers seeking absolute Japanese reliability with a highly engaging, sporty physical steering design.',
      pros: ['Exemplary mechanical design with timing chain', 'Extremely lightweight, dynamic, and easy to park', 'Excellent standard features like Bluetooth and Air Con']
    },
    jazz: {
      name: 'Honda Jazz (1.3L i-VTEC / Fit Hybrid)',
      engine: '1.3L 4-Cylinder i-VTEC / 1.5L JDM Petrol-Hybrid',
      roadTax: '€190 - €200 per year',
      economy: '4.8L/100km (Approx. 58 MPG)',
      insuranceGroup: 'Low (Group 6-8)',
      knownIssues: ['CVT automatic fluids must be changed regularly', 'Noisy engine note under hard acceleration', 'Tailgate wiper motor failures'],
      bestFor: 'Couples, dog owners, and antique hunters needing unparalleled interior versatility and cabin loading height.',
      pros: ['Famous "Magic Seats" fold completely flat in seconds', 'Exceptional structural cabin visibility with slim pillars', 'Impeccable mechanical record over 200,000+ kilometers']
    }
  };

  // Run Calculations
  const runningCosts = useMemo(() => {
    // 1.0L Small Petrol Car: Avg 5.0L/100km
    // Older 2.0L Diesel: Avg 6.8L/100km
    const petrolLiters = (annualKM / 100) * 5.0;
    const dieselLiters = (annualKM / 100) * 6.8;
    const petrolCost = Math.round(petrolLiters * fuelPrice);
    const dieselCost = Math.round(dieselLiters * fuelPrice);
    
    // Tax: Small Petrol €190, Old Diesel €400 (pre-2008 often calculated on engine size or high emissions bands)
    return [
      { name: 'Annual Petrol / Diesel Cost', Petrol: petrolCost, Diesel: dieselCost },
      { name: 'Annual Motor Road Tax', Petrol: 190, Diesel: 400 },
      { name: 'Estimated Annual Repairs', Petrol: 150, Diesel: 500 } // Diesels have costly DPF, EGR, turbos
    ];
  }, [annualKM, fuelPrice]);

  const toggleCheck = (key: keyof typeof checks) => {
    setChecks(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const calculatedNctRisk = useMemo(() => {
    let risk = 100; // Start with clean safety margin
    if (checks.tyres) risk -= 25;
    if (checks.rust) risk -= 30;
    if (checks.smokes) risk -= 20;
    if (checks.clutch) risk -= 15;
    if (checks.warningLights) risk -= 25;
    if (checks.brakesSqueal) risk -= 10;
    if (checks.serviceHistory) risk += 15; // Positive multiplier
    
    const finalScore = Math.max(10, Math.min(100, risk));
    if (finalScore > 75) return { label: 'LOW RISK (NCT Ready)', color: 'text-emerald-600 bg-emerald-50 border-emerald-200' };
    if (finalScore > 45) return { label: 'MODERATE RISK (Needs Vetting)', color: 'text-amber-500 bg-amber-50 border-amber-200' };
    return { label: 'HIGH FAIL RISK (Do Not Buy Without Mechanical Audit)', color: 'text-red-600 bg-red-50 border-red-200' };
  }, [checks]);

  const faqItems = [
    {
      q: "Why is the sub-€10,000 used car market in Galway so competitive right now?",
      a: "Since Brexit, importing low-cost used cars from the UK into Ireland has become financially unviable due to the introduction of 10% customs duties, 23% VAT, and high NOx levies on diesel vehicles. This has trapped domestic stock within Ireland, raising the price of local second-hand cars Galway has to offer. Buyers looking for budget-friendly cars under €10,000 must compete aggressively for a shrinking pool of reliable vehicles. This is why high-grade Japanese import cars from ShahMotors have become the ultimate loophole—providing premium specification, rust-free, low-mileage vehicles directly to the Irish market at fair prices."
    },
    {
      q: "How does Galway's coastal maritime air affect cheap used cars?",
      a: "Galway's proximity to the Atlantic Ocean is a major hazard for cheap used cars. Salt spray blown inland from Galway Bay, Salthill, and across the Connemara coastline settles on the structural undercarriages of vehicles. Over time, this salt-laden moisture eats away at brake pipes, subframes, coil springs, and steel chassis panels, leading to structural failures during the NCT. Unlike domestic or UK-sourced cars that have spent years exposed to road salt and ocean breezes, metropolitan Japanese imports (sourced from regions like Tokyo, where road salt is not used) feature immaculate, corrosion-free structures that are far more durable under Galway's harsh environmental conditions."
    },
    {
      q: "Should I buy a cheap diesel or stick to petrol/hybrid under €10,000?",
      a: "For 90% of buyers looking at cars under €10,000, diesel is a trap. Older Euro 5 and Euro 6 diesel vehicles feature complex emissions control systems like Diesel Particulate Filters (DPFs), Exhaust Gas Recirculation (EGR) valves, and turbochargers. If you are doing short trips—such as commuting from Knocknacarra to the industrial estates or navigating the daily Terryland Roundabout traffic—these filters will choke with soot, resulting in repair bills ranging from €800 to €2,000. Under a €10,000 budget, a naturally aspirated Japanese petrol or hybrid engine is far simpler, runs cleaner, and avoids catastrophic component failures entirely."
    },
    {
      q: "Why are Japanese imports often automatic, and is that reliable?",
      a: "The Japanese domestic market is heavily dominated by automatic vehicles, particularly CVT (Continuously Variable Transmission) units. These gearboxes are designed to optimize engine RPM for urban efficiency. For Galway drivers, an automatic car is a massive benefit, turning the slow, stop-start grind across the Quincentennial Bridge or along the Headford Road into a stress-free, two-pedal commute. Japanese automatic transmissions from companies like Toyota and Honda are internationally renowned for outlasting the vehicles they are housed in, provided they undergo simple fluid changes every 60,000km."
    },
    {
      q: "How do I secure affordable car insurance on a budget car in Galway?",
      a: "Irish insurance underwriters calculate premiums based heavily on vehicle age, engine displacement size, and vehicle import history. To keep your insurance costs as low as possible, target vehicles with engines under 1.4 liters (such as a 1.0L Yaris or a 1.2L Swift). Furthermore, make sure any Japanese import car you consider has an active, Thatcham-certified aftermarket immobiliser system installed. At ShahMotors, we fit certified security hardware to all our Japanese stock before handover, ensuring you can secure competitive insurance quotes from major underwriters like AXA, Liberty, and Allianz on day one."
    },
    {
      q: "What should I check on an Irish car's history report before buying?",
      a: "Never buy a second-hand car in Ireland without a comprehensive history report from a reliable verifier like MotorCheck or Cartell. You must check three critical indices: first, outstanding finance (to ensure a bank cannot repossess your new purchase); second, write-off status (verifying if the car has been classified as Category C or D structural crash damage); and third, mileage discrepancies (to spot clocking scams). At ShahMotors, we handle all this vetting beforehand, supplying a clean, certified history report for every single car on our lot."
    }
  ];

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 leading-relaxed">
        <div className="relative max-w-7xl mx-auto pb-16">
            <Navbar />
        </div>

      {}
      {/* Hero Section */}
      <header className="pt-20 pb-24 bg-linear-to-br from-white via-red-50/50 to-red-100/40 border-b border-slate-100">
        <div className="max-w-5xl mx-auto px-4 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-red-50 border border-red-200 rounded-full text-red-600 text-xs font-black uppercase tracking-wider mb-6">
            <span className="w-2 h-2 rounded-full bg-red-600 animate-pulse"></span>
            Galway Budget Car Buyer's Manual
          </div>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-black text-slate-900 mb-8 leading-[1.05] tracking-tight">
            How to Find a Reliable <br/>
            <span className="text-transparent bg-clip-text bg-linear-to-r from-red-600 to-red-500">Used Car Under €10,000</span>
          </h1>
          <p className="text-lg md:text-xl text-slate-600 mb-8 max-w-3xl mx-auto leading-relaxed">
            Don't waste money on high-tax, rusty domestic models or clocked imports. Learn how to navigate the competitive Irish second-hand car market, avoid mechanical traps along the West Coast, and secure a bulletproof ride that passes the NCT first time.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <span className="px-4 py-2 bg-white shadow-sm border border-slate-200 rounded-xl text-xs font-bold text-slate-500 uppercase tracking-wide">#UsedCarsGalway</span>
            <span className="px-4 py-2 bg-white shadow-sm border border-slate-200 rounded-xl text-xs font-bold text-slate-500 uppercase tracking-wide">#CarsForSaleGalway</span>
            <span className="px-4 py-2 bg-white shadow-sm border border-slate-200 rounded-xl text-xs font-bold text-slate-500 uppercase tracking-wide">#CheapCarsIreland</span>
          </div>
        </div>
      </header>

      {/* Main Grid Layout */}
      <main className="max-w-7xl mx-auto px-4 py-12 grid grid-cols-1 lg:grid-cols-12 gap-12">
        
        {/* Sidebar Left side */}
        <aside className="hidden lg:block lg:col-span-3">
          <div className="sticky top-12 space-y-10">
            <div>
              <h4 className="text-[12px] font-black uppercase tracking-widest text-slate-400 mb-6">Pillar Guide Map</h4>
              <ul className="space-y-4">
                <li>
                  <a href="#intro" className="group flex items-center gap-3 text-slate-600 hover:text-red-600 font-bold transition-all text-sm">
                    <span className="w-0 group-hover:w-4 h-0.5 bg-red-600 transition-all"></span>
                    1. The €10k Used Car Crisis
                  </a>
                </li>
                <li>
                  <a href="#hazards" className="group flex items-center gap-3 text-slate-600 hover:text-red-600 font-bold transition-all text-sm">
                    <span className="w-0 group-hover:w-4 h-0.5 bg-red-600 transition-all"></span>
                    2. Galway Environmental Hazards
                  </a>
                </li>
                <li>
                  <a href="#top-picks" className="group flex items-center gap-3 text-slate-600 hover:text-red-600 font-bold transition-all text-sm">
                    <span className="w-0 group-hover:w-4 h-0.5 bg-red-600 transition-all"></span>
                    3. Best 5 Used Cars Vetted
                  </a>
                </li>
                <li>
                  <a href="#calculator" className="group flex items-center gap-3 text-slate-600 hover:text-red-600 font-bold transition-all text-sm">
                    <span className="w-0 group-hover:w-4 h-0.5 bg-red-600 transition-all"></span>
                    4. Cost Calculator Simulator
                  </a>
                </li>
                <li>
                  <a href="#checklist" className="group flex items-center gap-3 text-slate-600 hover:text-red-600 font-bold transition-all text-sm">
                    <span className="w-0 group-hover:w-4 h-0.5 bg-red-600 transition-all"></span>
                    5. The 10-Point Pre-Sale Audit
                  </a>
                </li>
                <li>
                  <a href="#nct-calc" className="group flex items-center gap-3 text-slate-600 hover:text-red-600 font-bold transition-all text-sm">
                    <span className="w-0 group-hover:w-4 h-0.5 bg-red-600 transition-all"></span>
                    6. NCT Interactive Check
                  </a>
                </li>
                <li>
                  <a href="#faq" className="group flex items-center gap-3 text-slate-600 hover:text-red-600 font-bold transition-all text-sm">
                    <span className="w-0 group-hover:w-4 h-0.5 bg-red-600 transition-all"></span>
                    7. Frequently Asked Questions
                  </a>
                </li>
              </ul>
            </div>

            {/* Live CTA Box */}
            <div className="p-6 bg-slate-950 text-white rounded-3xl shadow-xl border border-slate-800 relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-24 h-24 bg-red-600 rounded-full blur-2xl opacity-20 group-hover:opacity-40 transition-opacity"></div>
              <h4 className="text-lg font-black mb-2 text-white">Need a Inspected Car?</h4>
              <p className="text-xs text-slate-400 mb-6 leading-relaxed">
                Avoid DoneDeal headaches. Every car in our inventory comes with an NCT guarantee, deep mechanical check, and warranty coverage.
              </p>
              <Link href="/cars" className="w-full flex items-center justify-center py-4 bg-red-600 hover:bg-red-500 text-white font-black rounded-xl transition duration-200 active:scale-95 shadow-lg shadow-red-900/30">
                VEHICLES UNDER €10K
              </Link>
            </div>
          </div>
        </aside>

        {/* Content Panel */}
        <div className="lg:col-span-9 bg-white p-6 md:p-12 rounded-3xl shadow-sm border border-slate-100">
          
          {}
          {/* Section 1: Introduction */}
          <section id="intro" className="mb-16 scroll-mt-6">
            <h2 className="text-2xl md:text-3xl font-black mb-6 text-slate-900">1. Navigating the Used Car Crisis: What €10,000 Buys You in Galway</h2>
            <div className="prose prose-slate max-w-none text-slate-600 leading-relaxed space-y-4">
              <p>
                There was a time in the Irish motor industry when a budget of ten thousand euros would secure a premium, low-mileage executive saloon or a near-new family hatchback with minimal wear and tear. Today, however, navigating the market for <strong>used cars Galway</strong> or the wider Connacht region under €10,000 can feel like walking through a mechanical minefield.
              </p>
              <p>
                Following Brexit, the traditional route of importing affordable second-hand cars from Great Britain has collapsed. With the introduction of hefty custom duties, standard VAT, and punitive NOx (nitrogen oxide) emission levies, importing a cheap vehicle from the UK can add up to 40% to its original purchase price. This regulatory wall has trapped domestic stock within Ireland. Because there are fewer incoming vehicles, prices of <strong>second hand cars Galway</strong> dealers and private sellers list have skyrocketed, while the average age of available cars has crept upward.
              </p>
              <p>
                When you browse classified websites like DoneDeal, Adverts, or Facebook Marketplace today, €10,000 often presents you with cars that have exceeded 180,000 kilometers, have spotty service records, or carry hidden mechanical issues. However, finding a reliable, fuel-efficient vehicle under this budget is still entirely possible—if you know what to look for, which models are structurally bulletproof, and how to verify a car's mechanical health before parting with your hard-earned cash.
              </p>
              <div className="p-6 bg-red-50 border-l-4 border-red-600 rounded-r-2xl my-8">
                <p className="font-bold text-red-900 text-base mb-1">Dealer Advisory:</p>
                <p className="text-red-900 text-sm italic">
                  "At a sub-€10,000 price point, your priority must pivot from cosmetic features and prestige badges to absolute mechanical simplicity. A clean, basic hatchback with a transparent service book will save you thousands over an older, high-specification luxury saloon with high mileage."
                </p>
              </div>
            </div>
          </section>

          {}
          {/* Section 2: Galway Environmental Hazards */}
          <section id="hazards" className="mb-16 scroll-mt-6 border-t border-slate-100 pt-12">
            <h2 className="text-2xl md:text-3xl font-black mb-6 text-slate-900">2. The Galway Environmental Toll: Salt Air, Corrosion, and Road Trauma</h2>
            <div className="prose prose-slate max-w-none text-slate-600 leading-relaxed space-y-4">
              <p>
                Galway is one of the most mechanically punishing counties in Ireland for used vehicles. Understanding these unique regional hazards will help you spot structural warning signs that buyers on the East Coast might completely ignore.
              </p>
              <h3 className="text-lg font-bold text-slate-900 mt-6">Coastal Salt Exposure and Chassis Rust</h3>
              <p>
                If a budget-friendly vehicle has spent its life in Salthill, Oranmore, Claddagh, or along the coastal routes of Barna and Spiddal, it has been subjected to constant Atlantic salt air. This salty moisture acts as an electrolyte, rapidly accelerating the electrochemical process of rust. 
              </p>
              <p>
                When inspecting any cheap vehicle, look beneath the sills, examine the brake lines, and check the structural subframes. Surface rust can be treated, but deep, flaky corrosion on suspension components or floorboards is an immediate NCT failure that is highly expensive to repair. This is a primary reason why high-specification, dry-climate <strong>Japanese imports Galway</strong> drivers buy are highly sought-after—they are fundamentally rust-free.
              </p>
              
              <h3 className="text-lg font-bold text-slate-900 mt-6">Potholes and Suspension Wear</h3>
              <p>
                While the M6 motorway offers smooth driving, the secondary regional and R-roads connecting Athenry, Tuam, Headford, and Oughterard are plagued with uneven surfaces and deep potholes. 
              </p>
              <p>
                Budget hatchbacks driven over these routes frequently suffer from cracked coil springs, worn suspension bushings, leaking shock absorbers, and bent alloy wheels. During your test drive, turn off the radio and listen carefully for knocking, creaking, or pulling sounds when turning corners or crossing speed bumps.
              </p>

              <h3 className="text-lg font-bold text-slate-900 mt-6">City Stop-Start Congestion</h3>
              <p>
                Commuting daily past the Terryland Roundabout, across the Quincentennial Bridge, or down the Tuam Road is incredibly taxing on manual clutches and gearboxes. Buying an older car that has spent years riding the clutch in bumper-to-bumper Galway traffic increases the likelihood of an imminent clutch replacement (typically a €600 - €900 bill). If your route is heavily urban, switching to a reliable automatic car or a self-charging Japanese hybrid is the smartest way to minimize mechanical wear.
              </p>
            </div>
          </section>

          {}
          {/* Section 3: Top Picks */}
          <section id="top-picks" className="mb-16 scroll-mt-6 border-t border-slate-100 pt-12">
            <h2 className="text-2xl md:text-3xl font-black mb-4 text-slate-900">3. Vetted and Proven: Top 5 Best Used Cars Under €10,000</h2>
            <p className="text-slate-600 mb-8 leading-relaxed">
              If reliability, cheap servicing, low road tax, and bulletproof drivetrains are your priorities, these are the five best-performing pre-owned cars in County Galway that fit a €10,000 budget.
            </p>

            {/* Interactive Tab Interface */}
            <div className="flex flex-wrap gap-2 p-1 bg-slate-100 rounded-2xl mb-8">
              {(Object.keys(vehicles) as VehicleProfileKey[]).map((key) => (
                <button
                  key={key}
                  onClick={() => setActiveTab(key)}
                  className={`px-4 py-3 text-xs md:text-sm font-black rounded-xl transition duration-150 ${activeTab === key ? 'bg-white shadow-md text-red-600' : 'text-slate-500 hover:text-slate-800'}`}
                >
                  {vehicles[key].name.split(' ')[1] || vehicles[key].name}
                </button>
              ))}
            </div>

            <div className="bg-linear-to-br from-slate-50 to-white border border-slate-200 rounded-3xl p-6 md:p-8 hover:border-red-200 transition duration-300">
              <div className="flex flex-wrap justify-between items-start gap-4 mb-6">
                <div>
                  <span className="text-xs font-black uppercase text-red-600 tracking-widest bg-red-50 px-3 py-1 rounded-full border border-red-100">
                    NCT & Insurance Friendly
                  </span>
                  <h3 className="text-2xl md:text-3xl font-black text-slate-900 mt-2">{vehicles[activeTab].name}</h3>
                </div>
                <div className="bg-emerald-50 text-emerald-700 text-xs px-3 py-1.5 rounded-full font-bold border border-emerald-100">
                  Recommended Pick
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-4">
                  <h4 className="text-[11px] font-black uppercase tracking-widest text-slate-400">Running Profile</h4>
                  <ul className="space-y-3">
                    <li className="flex justify-between border-b border-slate-100 pb-2 text-sm">
                      <span className="text-slate-500">Engine Profile</span>
                      <span className="font-bold text-slate-800 text-right">{vehicles[activeTab].engine}</span>
                    </li>
                    <li className="flex justify-between border-b border-slate-100 pb-2 text-sm">
                      <span className="text-slate-500">Real Fuel Economy</span>
                      <span className="font-bold text-slate-800">{vehicles[activeTab].economy}</span>
                    </li>
                    <li className="flex justify-between border-b border-slate-100 pb-2 text-sm">
                      <span className="text-slate-500">Irish Road Tax</span>
                      <span className="font-bold text-red-600">{vehicles[activeTab].roadTax}</span>
                    </li>
                    <li className="flex justify-between border-b border-slate-100 pb-2 text-sm">
                      <span className="text-slate-500">Insurance Level</span>
                      <span className="font-bold text-slate-800">{vehicles[activeTab].insuranceGroup}</span>
                    </li>
                  </ul>
                </div>

                <div className="space-y-4">
                  <h4 className="text-[11px] font-black uppercase tracking-widest text-slate-400">West of Ireland Match</h4>
                  <p className="text-sm text-slate-600 leading-relaxed mb-4">{vehicles[activeTab].bestFor}</p>
                  
                  <div>
                    <h5 className="text-[10px] font-black text-slate-400 uppercase tracking-wider mb-2">Watch For:</h5>
                    <ul className="space-y-1 mb-4">
                      {vehicles[activeTab].knownIssues.map((issue, idx) => (
                        <li key={idx} className="text-xs text-red-600 font-semibold">• {issue}</li>
                      ))}
                    </ul>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {vehicles[activeTab].pros.map((pro, i) => (
                      <span key={i} className="text-[10px] md:text-xs bg-slate-900 text-white px-3 py-1 rounded-lg font-bold tracking-tight">
                        ✓ {pro}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </section>

          {}
          {/* Section 4: Economic Calculator */}
          <section id="calculator" className="mb-16 scroll-mt-6 border-t border-slate-100 pt-12">
            <h2 className="text-2xl md:text-3xl font-black mb-4 text-slate-900">4. Interactive Calculator: True Annual Running Costs</h2>
            <p className="text-slate-600 mb-8 leading-relaxed">
              When working with a budget under €10,000, many buyers mistakenly choose older diesel cars because of cheap fuel consumption figures. However, when you factor in high road tax, premium insurance brackets, and complex mechanical breakdowns, a modern compact petrol or hybrid is often far cheaper to run over a standard 3-year ownership period.
            </p>

            {/* Interactive Sliders */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 bg-slate-50 p-6 md:p-8 rounded-3xl border border-slate-200/80 mb-8">
              <div className="space-y-6">
                <h4 className="text-sm font-black uppercase tracking-wider text-slate-800">Model Your Annual Commute</h4>
                
                <div>
                  <div className="flex justify-between text-xs font-bold text-slate-500 mb-2">
                    <span>Your Annual Mileage:</span>
                    <span className="text-red-600 font-bold">{annualKM.toLocaleString()} km</span>
                  </div>
                  <input 
                    type="range" 
                    min="5000" 
                    max="30000" 
                    step="1000" 
                    value={annualKM} 
                    onChange={(e) => setAnnualKM(Number(e.target.value))}
                    className="w-full accent-red-600 h-2 bg-slate-200 rounded-lg cursor-pointer"
                  />
                  <span className="text-[10px] text-slate-400 block mt-1">Average Irish driver covers around 16,000 km per year.</span>
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
                <h5 className="text-xs font-black uppercase tracking-widest text-slate-400 mb-4 text-center">Annual Cost Projection (€)</h5>
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={runningCosts}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} />
                    <XAxis dataKey="name" tick={{ fontSize: 10 }} />
                    <YAxis tick={{ fontSize: 10 }} />
                    <Tooltip contentStyle={{ borderRadius: '12px', border: 'none', fontSize: 12 }} />
                    <Legend wrapperStyle={{ fontSize: 10 }} />
                    <Bar dataKey="Petrol" fill="#dc2626" name="Compact Petrol / Hybrid" radius={[4, 4, 0, 0]} />
                    <Bar dataKey="Diesel" fill="#64748b" name="Older Diesel 4x4 or Saloon" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            <p className="text-sm text-slate-500 italic text-center mb-8">
              Calculations assume a combined cycle of 5.0L/100km for compact petrol vs. 6.8L/100km for an older, unvetted diesel engine.
            </p>
          </section>

          {}
          {/* Section 5: Mechanical Checklist */}
          <section id="checklist" className="mb-16 scroll-mt-6 border-t border-slate-100 pt-12">
            <h2 className="text-2xl md:text-3xl font-black mb-6 text-slate-900">5. The 10-Point Pre-Purchase Physical Inspection</h2>
            <p className="text-slate-600 mb-8 leading-relaxed">
              If you decide to buy a cheap car privately through Irish classifieds, never pay cash without performing these physical inspections. A clean NCT disc does not mean the vehicle is currently mechanically sound.
            </p>

            <div className="space-y-6">
              {[
                { title: "Check under the oil cap (Sludge & Emulsion)", body: "Unscrew the engine oil filler cap. If you spot a thick, cream-colored, mayonnaise-like residue under the cap, it suggests that water is mixing with the oil. This indicates a failed head gasket—a catastrophic mechanical issue that will write off a €5,000 vehicle." },
                { title: "Inspect tyres and tread wear symmetry", body: "Ensure tyres have a minimum of 1.6mm of tread depth across the center (at least 3mm is recommended for winter rain in Galway). More importantly, check for uneven tyre wear. Baldness on the inner or outer edges suggests worn steering linkages or misaligned tracking, which will pull your vehicle off-course on rough secondary roads." },
                { title: "Test the clutch bite point (Manual Cars)", body: "Start the engine, apply the handbrake firmly, engage third gear, and slowly release the clutch pedal while pressing the accelerator. The engine should stall immediately. If the engine revs up while the pedal is released, the clutch is slipping and needs immediate replacement." },
                { title: "Audit the cold startup & warning lights", body: "Make sure the engine is completely cold before you start it (feel the bonnet first). When you turn the ignition key to position two, ensure the Check Engine, ABS, and Airbag warning lights illuminate. Once the engine starts, all warning lights must turn off immediately. If any light stays on, do not buy the car." },
                { title: "Examine structural chassis rust", body: "Bring a flashlight, kneel down, and inspect the structural sills beneath the doors, the exhaust hangers, and the front and rear suspension mounting brackets. Look for bubbling paint or flaking metal. Deep structural rust cannot be repaired easily and will result in a permanent NCT failure." }
              ].map((step, idx) => (
                <div key={idx} className="flex gap-4 p-5 bg-slate-50 border border-slate-200/60 rounded-2xl hover:border-red-100 transition duration-150">
                  <span className="w-8 h-8 rounded-full bg-red-100 text-red-600 flex items-center justify-center font-black shrink-0 text-sm">
                    {idx + 1}
                  </span>
                  <div>
                    <h4 className="font-bold text-slate-900 mb-1">{step.title}</h4>
                    <p className="text-xs text-slate-600 leading-relaxed">{step.body}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {}
          {/* Section 6: Interactive NCT Tool */}
          <section id="nct-calc" className="mb-16 scroll-mt-6 border-t border-slate-100 pt-12">
            <h2 className="text-2xl md:text-3xl font-black mb-4 text-slate-900">6. Interactive Diagnostic Check Tool</h2>
            <p className="text-slate-600 mb-8 leading-relaxed">
              Before traveling to inspect a used car listed online, check off these common private vehicle warning signs to estimate its immediate structural fail risk.
            </p>

            <div className="bg-slate-950 text-white rounded-3xl p-6 md:p-8 shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-48 h-48 bg-red-600 rounded-full blur-3xl opacity-10"></div>
              
              <div className="space-y-6">
                <span className="text-xs font-black uppercase tracking-widest text-red-500">Diagnostic Check Tool</span>
                <h3 className="text-xl md:text-2xl font-black">Tick any of the following that apply to the vehicle:</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {[
                    { key: 'tyres', label: 'Tyre tread depth is near or below 1.6mm limit' },
                    { key: 'rust', label: 'Heavy structural flaking under the chassis sills' },
                    { key: 'smokes', label: 'Blue or thick white smoke from exhaust on cold start' },
                    { key: 'clutch', label: 'Manual clutch bites at the very top of pedal travel' },
                    { key: 'warningLights', label: 'Dashboard engine warning light stays illuminated' },
                    { key: 'brakesSqueal', label: 'High-pitched metal squealing under firm braking' },
                    { key: 'serviceHistory', label: 'Includes a complete service book with stamps' },
                    { key: 'matchingPaint', label: 'Mismatched paint shades on structural side panels' }
                  ].map((chk) => (
                    <button
                      key={chk.key}
                      onClick={() => toggleCheck(chk.key as keyof typeof checks)}
                      className={`p-4 rounded-xl border text-left transition duration-150 flex items-center gap-3 ${checks[chk.key as keyof typeof checks] ? 'border-red-600 bg-red-600/10 text-white font-bold' : 'border-slate-800 bg-slate-900/50 hover:border-slate-600 text-slate-300'}`}
                    >
                      <div className={`w-4 h-4 rounded-sm flex items-center justify-center shrink-0 border ${checks[chk.key as keyof typeof checks] ? 'bg-red-600 border-red-600 text-white' : 'border-slate-700 bg-transparent'}`}>
                        {checks[chk.key as keyof typeof checks] && '✓'}
                      </div>
                      <span className="text-xs">{chk.label}</span>
                    </button>
                  ))}
                </div>

                <div className="border-t border-slate-800 pt-6">
                  <div className="flex flex-wrap items-center justify-between gap-4">
                    <div>
                      <span className="text-[10px] font-black uppercase tracking-widest text-slate-400 block mb-1">Estimated Diagnostic Rating:</span>
                      <div className={`px-4 py-2 rounded-xl text-xs font-black border uppercase ${calculatedNctRisk.color}`}>
                        {calculatedNctRisk.label}
                      </div>
                    </div>
                    <button
                      onClick={() => setChecks({
                        tyres: false, rust: false, smokes: false, clutch: false, warningLights: false, serviceHistory: false, matchingPaint: false, brakesSqueal: false
                      })}
                      className="text-xs font-bold text-slate-400 hover:text-white transition"
                    >
                      Reset Checklist
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {}
          {/* Section 7: Japanese JDM Imports */}
          <section id="imports" className="mb-16 scroll-mt-6 border-t border-slate-100 pt-12">
            <h2 className="text-2xl md:text-3xl font-black mb-6 text-slate-900">7. Japanese JDM Imports: The Modern €10,000 Loophole</h2>
            <div className="prose prose-slate max-w-none text-slate-600 leading-relaxed space-y-4">
              <p>
                As budget-conscious buyers realize that domestic Irish stock is heavily depleted and UK imports are blocked by post-Brexit VAT and VRT levies, the <strong>Japanese Domestic Market (JDM)</strong> import sector has emerged as the ultimate loophole for Galway motorists.
              </p>
              <p>
                In Japan, car owners are subject to an incredibly rigorous vehicle safety and roadworthiness inspection system called the "Shaken." This inspection increases significantly in cost as a vehicle reaches 5 to 7 years of age. As a result, Japanese car owners frequently sell near-pristine, low-mileage vehicles to export brokers, allowing premier independent dealerships like ShahMotors to import high-specification models into County Galway at highly competitive rates.
              </p>
              <p>
                Beyond being highly cost-effective, JDM imports offer critical advantages over typical second-hand domestic cars:
              </p>
              <ul className="list-disc pl-5 space-y-2 text-sm text-slate-600">
                <li><strong>No Undercarriage Rust:</strong> Unlike Irish local cars or salted UK imports, metropolitan Japan (such as Tokyo and Osaka) does not use road salt in winter. This means a 10-year-old JDM vehicle frequently features a cleaner underside than a 3-year-old Irish equivalent.</li>
                <li><strong>Extremely Low Mileage:</strong> Public transport infrastructure in Japan is world-class. Many domestic car owners only use their vehicles for light weekend shopping, resulting in exceptionally low odometer readings compared to high-mileage Irish diesel commuters.</li>
                <li><strong>Premium Standard Technology:</strong> JDM cars come highly equipped with advanced features, including active parking sensors, high-definition lane keeping assist, electric folding wing mirrors, and climate control, as standard.</li>
              </ul>
            </div>
          </section>

          {}
          {/* Section 8: Passing NCT First Time */}
          <section id="nct-tips" className="mb-16 scroll-mt-6 border-t border-slate-100 pt-12">
            <h2 className="text-2xl md:text-3xl font-black mb-6 text-slate-900">8. Navigating the Tuam Road NCT Center Backlog</h2>
            <div className="prose prose-slate max-w-none text-slate-600 leading-relaxed space-y-4">
              <p>
                The National Car Test (NCT) backlog across Ireland remains a major headache for motorists, with the Tuam Road test center in Galway City frequently reporting long waiting times for test dates. Failing an NCT on a simple, avoidable issue means a 28-day wait for a visual or mechanical retest, during which you may be driving a vehicle with expired road credentials.
              </p>
              <p>
                If you are running a budget-friendly used car, you can pass the NCT first time by following this quick, low-cost pre-inspection audit checklist:
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-8">
                <div className="p-6 bg-slate-50 border border-slate-200 rounded-2xl">
                  <h4 className="font-bold text-slate-900 mb-2">Check Your Bulbs</h4>
                  <p className="text-xs text-slate-600">Simple blown bulbs account for nearly 20% of immediate failures. Turn on your hazard lights, main beams, fog lights, and reverse lights. Check that all license plate illumination is working. Replace faulty bulbs yourself for under €5.</p>
                </div>
                <div className="p-6 bg-slate-50 border border-slate-200 rounded-2xl">
                  <h4 className="font-bold text-slate-900 mb-2">Clean the Undercarriage</h4>
                  <p className="text-xs text-slate-600">NCT inspectors must be able to clearly see all structural suspension linkages. Take your vehicle to a local jetwash bay in Galway and spray the underbody clean. Dirt or thick mud blocking chassis inspections will result in an immediate refusal to test.</p>
                </div>
              </div>

              <p>
                Ensure that your washer fluid reservoir is fully topped up, safety belts are clean and buckled across the seats, and your alloy wheel hubcaps are removed (so the wheel nuts are visible to inspectors). Taking these simple prep steps will save you time, stress, and unnecessary retest fees.
              </p>
            </div>
          </section>

          {}
          {/* Section 9: FAQ */}
          <section id="faq" className="mb-16 scroll-mt-6 border-t border-slate-100 pt-12">
            <h2 className="text-2xl md:text-3xl font-black mb-8 text-slate-900">9. Frequently Asked Questions</h2>
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

          {}
          {/* Final Brand Box */}
          <div className="bg-linear-to-br from-red-600 to-red-500 text-white p-8 md:p-12 rounded-3xl shadow-xl mt-16 text-center">
            <h3 className="text-2xl md:text-3xl font-black mb-4">Ready to Drive a Quality Used Car?</h3>
            <p className="text-red-50 max-w-xl mx-auto text-sm md:text-base leading-relaxed mb-8 opacity-90">
              Don't risk your hard-earned cash on unvetted private sales. Explore our physical stock of inspected, clean, and rust-free used vehicles under €10,000 in Galway. Ready to drive away with an NCT guarantee.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <button className="px-8 py-4 bg-white text-red-600 font-black rounded-xl hover:bg-slate-50 transition duration-150 shadow-lg">
                BROWSE VEHICLES UNDER €10K
              </button>
              <button className="px-8 py-4 bg-slate-950 text-white font-black rounded-xl hover:bg-slate-900 transition duration-150 border border-slate-800">
                BOOK VEHICLE VALUATION
              </button>
            </div>
          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
}