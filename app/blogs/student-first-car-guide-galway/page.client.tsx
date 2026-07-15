"use client";
import React, { useState, useMemo, useTransition } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Link from 'next/link';
import { useRouter } from "next/navigation";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from 'recharts';


type StudentVehicleKey = 'vitz' | 'swift' | 'micra' | 'up' | 'fiesta';

interface StudentVehicleProfile {
  name: string;
  engineSize: string;
  roadTax: string;
  mpg: string;
  insGroup: string;
  pros: string[];
  cons: string[];
  bestFor: string;
  description: string;
}

export default function StudentCarGuide() {
  const [activeTab, setActiveTab] = useState<StudentVehicleKey>('vitz');
  const [activeFaq, setActiveFaq] = useState<number | null>(null);
  const [selectedRoute, setSelectedRoute] = useState<string>('newcastle');
  const [isPending, startTransition] = useTransition();

  // Interactive Cost Simulator State
  const [driverAge, setDriverAge] = useState<number>(19);
  const [licenseType, setLicenseType] = useState<string>('learner'); // 'learner' or 'full'
  const [engineVolume, setEngineVolume] = useState<number>(1.0); // 1.0L, 1.2L, 1.4L
  const [yearlyKM, setYearlyKM] = useState<number>(10000);

  // Pre-purchase checklist state
  const [scamChecks, setScamChecks] = useState({
    logbook: false,
    history: false,
    chassis: false,
    clutch: false,
    warningLights: false,
    tyres: false
  });

  // loading on button click
  const router = useRouter();
  const handleClick = () => {
    startTransition(() => {
      router.push("/cars");
    });
  };

  const vehicles: Record<StudentVehicleKey, StudentVehicleProfile> = {
    vitz: {
      name: 'Toyota Vitz / Yaris (1.0L / JDM automatic)',
      engineSize: '996cc - 1.3L Petrol',
      roadTax: '€180 - €270 per year',
      mpg: '4.8L/100km (Approx 58 MPG)',
      insGroup: 'Insurance Group 3-5 (Incredibly low)',
      pros: ['Renowned Toyota bulletproof reliability', 'Extremely compact for parking in Newcastle/ATU', 'Excellent fuel sipping in slow city traffic'],
      cons: ['Cabin is basic on older pre-2015 baseline grades', '1.0L engine can feel noisy at motorway cruising speeds on the M6'],
      bestFor: 'University of Galway / ATU students who need a zero-maintenance commute companion that fits tight on-street parking spaces.',
      description: 'The Toyota Vitz (internationally branded as the Yaris) is the absolute gold standard for Irish student drivers. Sourced as a premium, rust-free Japanese import, it provides modern safety technology, clean automatic shifting, and a highly efficient engine with a tiny displacement profile that insurance companies actively favor.'
    },
    swift: {
      name: 'Suzuki Swift (1.2L Dualjet)',
      engineSize: '1,242cc Petrol',
      roadTax: '€190 per year',
      mpg: '4.9L/100km (Approx 57 MPG)',
      insGroup: 'Insurance Group 6-8 (Low-Medium)',
      pros: ['Engaging, sporty steering and fun handling characteristics', 'Very modern dashboard console on post-2015 models', 'Solid Japanese engineering with timing chain'],
      cons: ['Boot volume is smaller than the Toyota Yaris', 'Suspension can feel slightly firm over rural potholes in Headford or Tuam'],
      bestFor: 'Younger drivers who still want some styling character and engaging steering feedback without breaking the bank on premiums.',
      description: 'The Suzuki Swift combines exceptional mechanical durability with a fun, lightweight European design language. Its 1.2L naturally aspirated engine is robust and avoids high-emissions penalties, ensuring your annual Irish motor tax is kept to an absolute minimum.'
    },
    micra: {
      name: 'Nissan Micra / JDM March (1.2L)',
      engineSize: '1,198cc Petrol',
      roadTax: '€200 per year',
      mpg: '5.0L/100km (Approx 56 MPG)',
      insGroup: 'Insurance Group 4-6 (Incredibly low)',
      pros: ['Exceptionally cheap purchase price on the second-hand market', 'Generous headroom for taller drivers', 'Superb turning circle for parallel parking'],
      cons: ['Interior plastics can feel scratchy and cheap', 'Steering feedback is quite light and slow at speed'],
      bestFor: 'Students on an absolute shoestring budget looking for the maximum possible value for money.',
      description: 'The Nissan Micra (and its high-spec Japanese import equivalent, the Nissan March) is a classic student workhorse. Its mechanical simplicity means replacement parts are stocked in every Galway motor factor shop at rock-bottom prices, keeping servicing costs incredibly cheap.'
    },
    up: {
      name: 'Volkswagen Up! / Skoda Citigo (1.0L)',
      engineSize: '999cc 3-Cylinder Petrol',
      roadTax: '€180 per year',
      mpg: '4.5L/100km (Approx 62 MPG)',
      insGroup: 'Insurance Group 2-4 (Lowest possible class)',
      pros: ['Extremely refined cabin comfort and noise dampening', 'Remarkably spacious interior given its tiny outer dimensions', 'Minimal mechanical tax rating'],
      cons: ['Manual gearboxes can occasionally feel stiff into reverse', 'Rear glass window tailgate is expensive to replace if cracked'],
      bestFor: 'Daily city commuters navigating the busy Quincentennial Bridge or Terryland Roundabout.',
      description: 'Designed specifically for tight European urban spaces, the Volkswagen Up! (alongside its siblings, the Skoda Citigo and Seat Mii) is a masterpiece of compact engineering. Its tiny 1.0-litre engine produces low CO2 emissions, making it one of the cheapest modern vehicles to tax and insure in Ireland today.'
    },
    fiesta: {
      name: 'Ford Fiesta (1.25L Zetec)',
      engineSize: '1,242cc Petrol',
      roadTax: '€270 per year',
      mpg: '5.2L/100km (Approx 54 MPG)',
      insGroup: 'Insurance Group 7-9 (Medium-low)',
      pros: ['Superb driving dynamics and motorway composure', 'Massive domestic parts availability throughout Connacht', 'Comfortable supportive seats'],
      cons: ['Older 1.25L engine is less efficient than modern Japanese hybrids', 'Known for minor electrical niggles (heated windscreen, locking issues)'],
      bestFor: 'Students commuting longer distances back home to Mayo, Roscommon, or Sligo on weekends.',
      description: 'The Ford Fiesta has been a favorite for generations of Irish drivers. If your weekly schedule involves highway journeys on national routes alongside stop-and-go Galway city driving, the Fiesta provides excellent high-speed highway stability.'
    }
  };

  const routes: Record<string, { name: string; distance: string; traffic: string; time: string; stress: string; advice: string }> = {
    newcastle: {
      name: 'Newcastle Road to University of Galway (Main Campus)',
      distance: '3.5 km',
      traffic: 'Severe peak congestion (Dangan, Newcastle Road)',
      time: '15 - 25 minutes during mornings',
      stress: 'High - stop-start, tight lanes, pedestrian crossings',
      advice: 'The constant clutching in standard manual gearboxes on this route will tire you out. A compact Japanese automatic like the Toyota Vitz allows you to crawl smoothly and park in tight residential spaces without burning through your clutch plate.'
    },
    atu: {
      name: 'Renmore to ATU Galway City Campus (Dublin Road)',
      distance: '5.2 km',
      traffic: 'Moderate-Severe (Dublin Road choke points)',
      time: '20 - 30 minutes',
      stress: 'High - complex lane changes, busy roundabouts',
      advice: 'With large roundabouts connecting Wellpark and Renmore, you need responsive low-end acceleration. Vehicles with high visual height and a clear viewing angle, like the Suzuki Swift, make lane changes far less intimidating for new drivers.'
    },
    oranmore: {
      name: 'Oranmore / Athenry to Galway City (ATU / UG)',
      distance: '14.5 km',
      traffic: 'Motorway and Dual-Carriageway merging delays',
      time: '25 - 40 minutes',
      stress: 'Moderate - higher driving speeds, wind exposure',
      advice: 'Because you will spend significant time at 100km/h on the dual-carriageway, prioritize a car with solid wind insulation and Electronic Stability Control. The VW Up! offers incredible motorway composure for its size class.'
    },
    salthill: {
      name: 'Salthill Promenade to Westside / Newcastle',
      distance: '4.8 km',
      traffic: 'Leisurely but congested on dry days (coastal parking search)',
      time: '15 - 20 minutes',
      stress: 'Moderate - pedestrian paths, parallel parking demand',
      advice: 'Coastal air carries damp, salt-water spray. Make sure your first car has a structurally sound chassis that has been professionally rust-proofed. Salthill parking also demands a tight steering radius, making the compact Nissan Micra a top pick.'
    }
  };

  const calculatedCosts = useMemo(() => {
    // Basic insurance estimate based on age & license
    let baseInsurance = 2400; // Average base for 19yo on provisional
    
    if (driverAge >= 21) baseInsurance -= 400;
    if (driverAge >= 23) baseInsurance -= 600;
    if (licenseType === 'full') baseInsurance -= 500;
    
    // Engine size multiplier (catastrophic for young drivers in Ireland)
    if (engineVolume > 1.0 && engineVolume <= 1.25) baseInsurance += 300;
    if (engineVolume > 1.25 && engineVolume <= 1.4) baseInsurance += 700;
    if (engineVolume > 1.4) baseInsurance += 1500;

    // Fuel cost calculation: assume 5.0L/100km average
    const fuelLiters = (yearlyKM / 100) * 5.0;
    const fuelCost = Math.round(fuelLiters * 1.84); // €1.84 per litre average
    const taxCost = engineVolume <= 1.0 ? 180 : engineVolume <= 1.25 ? 200 : engineVolume <= 1.4 ? 270 : 390;
    const servicingCost = 200; // Average annual oil/filter/brake service for simple Japanese cars

    return [
      { name: 'Estimated Insurance', Cost: baseInsurance, color: '#dc2626' },
      { name: 'Annual Petrol Fuel', Cost: fuelCost, color: '#3b82f6' },
      { name: 'Irish Motor Tax', Cost: taxCost, color: '#10b981' },
      { name: 'Annual Basic Service', Cost: servicingCost, color: '#f59e0b' }
    ];
  }, [driverAge, licenseType, engineVolume, yearlyKM]);

  const totalCalculatedCost = useMemo(() => {
    return calculatedCosts.reduce((acc, curr) => acc + curr.Cost, 0);
  }, [calculatedCosts]);

  const toggleCheck = (key: keyof typeof scamChecks) => {
    setScamChecks(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const calculatedScamRisk = useMemo(() => {
    let checkedCount = Object.values(scamChecks).filter(Boolean).length;
    if (checkedCount === 6) return { label: 'LOWEST SCAM RISK (Safe to Proceed)', color: 'text-emerald-600 bg-emerald-50 border-emerald-200' };
    if (checkedCount >= 4) return { label: 'MODERATE RISK (Verify Missing Documents)', color: 'text-amber-600 bg-amber-50 border-amber-200' };
    return { label: 'CRITICAL FAIL RISK (Do Not Pay Cash Without Checks)', color: 'text-red-600 bg-red-50 border-red-200' };
  }, [scamChecks]);

  const faqItems = [
    {
      q: "Can a student realistically get affordable first-time car insurance in Galway?",
      a: "Yes, but you have to play by the underwriters' strict rules. In Ireland, insurance premiums for first-time drivers are determined largely by three factors: your age, your license status (Learner Permit vs. Full Irish License), and the displacement size of your engine. To keep your initial quote as close to €1,500 - €2,000 as possible, you must target vehicles with engines under 1,250cc (such as a 1.0L Toyota Vitz or VW Up!). Additionally, putting a parent on your policy as a named driver can slash your premiums by up to 20% overnight."
    },
    {
      q: "Why are Japanese imports like the Toyota Vitz highly recommended for Galway students?",
      a: "Irish domestic market used cars at lower price points are often severely worn out, have high mileage, or suffer from chassis rust due to damp coastal conditions. Japanese imports, however, are sourced from metropolitan regions like Tokyo where road salt is not used in winter, preserving the structural undercarriage. Furthermore, Japanese car culture enforces strict roadworthiness inspections ('Shaken'), meaning imported cars arrive in Galway with low, verified mileage, clean cabins, and advanced standard safety features like lane assist and collision warnings."
    },
    {
      q: "What is the real cost of parking at ATU and University of Galway?",
      a: "Parking at Galway's higher education campuses requires careful planning. At the University of Galway, student parking permits are available but highly restricted—you must verify your address eligibility, and holding a permit does not guarantee a physical parking slot at the busy Dangan or Newcastle Road lots. ATU Galway City (Dublin Road) operates pay-and-display and permit zones. If you park without a valid physical permit or ticket, clamping operations are highly active and will cost €80+ to release, making a compact, easy-to-park hatchback your best asset for accessing on-street parking nearby."
    },
    {
      q: "Should I buy my first car privately or go to an independent dealer in Galway?",
      a: "While buying privately on platforms like DoneDeal or Facebook Marketplace can sometimes save you a few hundred euros initially, it is highly risky for students with limited mechanical knowledge. Private cash sales in Ireland carry zero legal consumer protection—if the gearbox fails or the engine blows 10 minutes after you buy it, you have no recourse. Buying from a registered independent dealer like ShahMotors guarantees your legal protection under Irish Consumer Law, providing a clear history check, an active vehicle warranty, fresh servicing, and an NCT guarantee."
    },
    {
      q: "How does a Learner Permit vs. a Full Driver's License affect student running costs?",
      a: "The financial impact is substantial. Holding a Learner Permit in Ireland means you must display physical 'L' plates and be accompanied at all times by a fully licensed driver who has held their clean license for at least two years. Insurance companies penalize learner drivers with significantly higher premium loadings. Passing your driving test and securing a Full Irish License will instantly reduce your annual insurance quote by €500 to €1,000, which is why we advise students to book their driving test at the Westside or Carnmore centers as early as possible."
    },
    {
      q: "How can I avoid getting scammed by 'clocked' or written-off second-hand cars in Ireland?",
      a: "Always verify the vehicle's unique 17-digit VIN (Chassis Number) and run a comprehensive check on sites like Cartell or MotorCheck before paying any cash. Look out for mismatched paint panels which suggest structural crash repairs (often classified as Cat C or Cat D insurance write-offs). Ensure the physical mileage aligns with past NCT certificates. At ShahMotors, we take this stress away by providing a certified, untampered odometer check and complete history verification for every single first car we list."
    }
  ];

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 leading-relaxed scroll-smooth">
      <div className="relative max-w-7xl mx-auto pb-16">
        <Navbar />
      </div>
      <header className="pt-20 pb-24 bg-linear-to-br from-white via-red-50/50 to-red-100/40 border-b border-slate-100">
        <div className="max-w-5xl mx-auto px-4 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-red-50 border border-red-200 rounded-full text-red-600 text-xs font-black uppercase tracking-wider mb-6">
            <span className="w-2 h-2 rounded-full bg-red-600 animate-pulse"></span>
            University of Galway & ATU First Car Blueprint
          </div>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-black text-slate-900 mb-8 leading-[1.05] tracking-tight">
            The Galway Student's Guide <br/>
            <span className="text-transparent bg-clip-text bg-linear-to-r from-red-600 to-red-500">to Buying Your First Used Car</span>
          </h1>
          <p className="text-lg md:text-xl text-slate-600 mb-8 max-w-3xl mx-auto leading-relaxed">
            Avoid overpriced runarounds, heavy insurance premiums, and rusty chassis trap doors. Discover how to source a dependable, low-tax, easy-to-insure used car that will safely get you to your morning lectures, weekend jobs, and trips back home.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <span className="px-4 py-2 bg-white shadow-sm border border-slate-200 rounded-xl text-xs font-bold text-slate-500 uppercase tracking-wide">#CheapInsuranceIreland</span>
            <span className="px-4 py-2 bg-white shadow-sm border border-slate-200 rounded-xl text-xs font-bold text-slate-500 uppercase tracking-wide">#StudentCarsGalway</span>
            <span className="px-4 py-2 bg-white shadow-sm border border-slate-200 rounded-xl text-xs font-bold text-slate-500 uppercase tracking-wide">#NCTPrepGalway</span>
          </div>
        </div>
      </header>

      {/* Main Grid Layout */}
      <main className="max-w-7xl mx-auto px-4 py-12 grid grid-cols-1 lg:grid-cols-12 gap-12">
        
        {/* Sticky Sidebar Left */}
        <aside className="hidden lg:block lg:col-span-3">
          <div className="sticky top-24 space-y-10">
            <div>
              <h4 className="text-[12px] font-black uppercase tracking-widest text-slate-400 mb-6">Navigation Chapters</h4>
              <ul className="space-y-4">
                <li>
                  <a href="#intro" className="group flex items-center gap-3 text-slate-600 hover:text-red-600 font-bold transition-all text-sm">
                    <span className="w-0 group-hover:w-4 h-0.5 bg-red-600 transition-all"></span>
                    1. The Student Car Market
                  </a>
                </li>
                <li>
                  <a href="#commute" className="group flex items-center gap-3 text-slate-600 hover:text-red-600 font-bold transition-all text-sm">
                    <span className="w-0 group-hover:w-4 h-0.5 bg-red-600 transition-all"></span>
                    2. Campus Commute Stress
                  </a>
                </li>
                <li>
                  <a href="#student-picks" className="group flex items-center gap-3 text-slate-600 hover:text-red-600 font-bold transition-all text-sm">
                    <span className="w-0 group-hover:w-4 h-0.5 bg-red-600 transition-all"></span>
                    3. Top 5 Student Picks
                  </a>
                </li>
                <li>
                  <a href="#calculator" className="group flex items-center gap-3 text-slate-600 hover:text-red-600 font-bold transition-all text-sm">
                    <span className="w-0 group-hover:w-4 h-0.5 bg-red-600 transition-all"></span>
                    4. Student Budget Planner
                  </a>
                </li>
                <li>
                  <a href="#checklist" className="group flex items-center gap-3 text-slate-600 hover:text-red-600 font-bold transition-all text-sm">
                    <span className="w-0 group-hover:w-4 h-0.5 bg-red-600 transition-all"></span>
                    5. Pre-Viewing Check
                  </a>
                </li>
                <li>
                  <a href="#insurance" className="group flex items-center gap-3 text-slate-600 hover:text-red-600 font-bold transition-all text-sm">
                    <span className="w-0 group-hover:w-4 h-0.5 bg-red-600 transition-all"></span>
                    6. Young Driver Insurance Hacks
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
              <h4 className="text-lg font-black mb-2 text-white">Need a Certified First Car?</h4>
              <p className="text-xs text-slate-400 mb-6 leading-relaxed">
                Avoid DoneDeal cash scams. Every student car in our inventory comes with insurance-ready immobilisers, 12 months warranty, and a fresh NCT guarantee.
              </p>
              <Link href="/cars" className="w-full flex items-center justify-center py-2 bg-red-600 hover:bg-red-500 text-white font-black rounded-xl transition duration-200 active:scale-95 shadow-lg shadow-red-900/30">
                BROWSE STUDENT STOCK
              </Link>
            </div>
          </div>
        </aside>

        {/* Content Panel Right side */}
        <div className="lg:col-span-9 bg-white p-6 md:p-12 rounded-3xl shadow-sm border border-slate-100">
          
          <section id="intro" className="mb-16 scroll-mt-24">
            <h2 className="text-2xl md:text-3xl font-black mb-6 text-slate-900">1. Navigating the Student Car Market in Galway City</h2>
            <div className="prose prose-slate max-w-none text-slate-600 leading-relaxed space-y-4">
              <p>
                Taking the leap and buying your first car as a third-level student at the <strong>University of Galway</strong> or <strong>Atlantic Technological University (ATU)</strong> is a massive milestone. It represents true independence: freedom from waiting for unreliable buses in the lashing rain at Eyre Square, freedom to easily travel back home to Mayo or Roscommon on Friday afternoons, and the ability to work evening part-time jobs across Oranmore, Salthill, or Knocknacarra.
              </p>
              <p>
                However, navigating the second-hand car market in the West of Ireland has never been more challenging for young, budget-conscious drivers. Ever since Brexit put a stop to cheap, low-mileage imports from Great Britain due to heavy custom tariffs and high emissions VRT (Vehicle Registration Tax) rates, the supply of affordable, small-engine <strong>used cars Galway</strong> dealerships used to list has shrunk significantly. 
              </p>
              <p>
                In its place, the Irish market has been flooded with worn-out, high-mileage local runarounds. Private sellers on classified websites frequently list cars for €3,000 to €5,000 that have neglected service books, worn gearboxes, or structural rust hidden beneath the sills. As a young driver, you also have to contend with high insurance premium loadings. If you choose the wrong model—such as a car with an engine displacement over 1.4L or one lacking robust anti-theft immobilisers—underwriters will quote you premiums that exceed the value of the car itself.
              </p>
              <p>
                To succeed in this market, you need to understand that the cheapest purchase price does not always translate to the lowest overall cost. A vehicle purchased privately for €2,500 that immediately fails its NCT on emissions, worn steering linkage, or chassis corrosion can quickly become an expensive mistake. By focusing on highly reliable, small-engine Japanese imports or thoroughly vetted domestic hatchbacks, you can establish a predictable, low-stress cost of ownership throughout your college years.
              </p>
              <div className="p-6 bg-red-50 border-l-4 border-red-600 rounded-r-2xl my-8">
                <p className="font-bold text-red-900 text-lg mb-1">Student Safety Note:</p>
                <p className="text-red-900 text-sm md:text-lg italic">
                  "As a student, your financial priority must be keeping fixed running costs as low as possible. A cheap upfront purchase price is a trap if the car has a high motor tax band, requires frequent repairs to pass its NCT, or costs €3,000 a year to insure because of an engine size that triggers insurance red flags."
                </p>
              </div>
            </div>
          </section>

          <section id="commute" className="mb-16 scroll-mt-24 border-t border-slate-100 pt-12">
            <h2 className="text-2xl md:text-3xl font-black mb-4 text-slate-900">2. Interactive Planner: Sizing Up Your Galway Campus Commute</h2>
            <p className="text-slate-600 mb-8 leading-relaxed">
              Galway's road layout is notoriously challenging. Squeezed between Lough Corrib and the Atlantic, traffic bottlenecks are a daily reality. Click on your primary college route below to discover the specific driving challenges you will face and find mechanical strategies to survive the drive.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-3 mb-8">
              {Object.keys(routes).map((key) => (
                <button
                  key={key}
                  onClick={() => setSelectedRoute(key)}
                  className={`p-4 rounded-xl border text-left transition duration-150 ${selectedRoute === key ? 'border-red-600 bg-red-50 text-red-600 font-bold' : 'border-slate-200 hover:bg-slate-100 text-slate-700'}`}
                >
                  <span className="text-xs uppercase font-black text-slate-400 block mb-1">Select Path</span>
                  <span className="text-sm tracking-tight block truncate">{routes[key].name.split(' to ')[0]}</span>
                </button>
              ))}
            </div>

            <div className="bg-slate-900 text-white rounded-3xl p-6 md:p-8 border border-slate-800 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-36 h-36 bg-red-600 rounded-full blur-3xl opacity-10"></div>
              <span className="text-sm font-black uppercase text-red-500 tracking-wider">Active Route Analysis</span>
              <h3 className="text-xl md:text-2xl font-black mt-2 mb-4">{routes[selectedRoute].name}</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <span className="text-xs text-slate-400 uppercase font-black block">Traffic Index:</span>
                    <span className="text-sm font-semibold text-red-400">{routes[selectedRoute].traffic}</span>
                  </div>
                  <div>
                    <span className="text-xs text-slate-400 uppercase font-black block">Average One-Way Travel Time:</span>
                    <span className="text-sm font-semibold text-white">{routes[selectedRoute].time}</span>
                  </div>
                  <div>
                    <span className="text-xs text-slate-400 uppercase font-black block">Route Driving Stress:</span>
                    <span className="text-sm font-semibold text-white">{routes[selectedRoute].stress}</span>
                  </div>
                </div>
                <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800 flex flex-col justify-between">
                  <div>
                    <h4 className="text-xs font-black uppercase text-slate-400 mb-2">Automotive Survival Strategy:</h4>
                    <p className="text-sm text-slate-300 leading-relaxed">{routes[selectedRoute].advice}</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="prose prose-slate max-w-none text-slate-600 leading-relaxed space-y-4 mt-6">
              <p>
                Whether you commute from Renmore, Oranmore, or Knocknacarra, navigating traffic is a key part of your day. Standard clutches suffer heavy wear over years of daily Terryland Roundabout loops or Quincentennial Bridge crawls, which is why a small, automatic self-charging hybrid import has become a favored option for Galway city commuters. These automatic hybrids recover deceleration energy directly into their hybrid drive batteries, keeping fuel consumption low during slow crawls.
              </p>
            </div>
          </section>

          <section id="student-picks" className="mb-16 scroll-mt-24 border-t border-slate-100 pt-12">
            <h2 className="text-2xl md:text-3xl font-black mb-4 text-slate-900">3. Vetted & Proven: Top 5 Best Used First Cars for Students</h2>
            <p className="text-slate-600 mb-8 leading-relaxed">
              If low insurance categories, small engine displacements, reliable timing chains, and cheap replacement parts are your priorities, these five pre-owned vehicles stand head and shoulders above the rest for Galway student drivers.
            </p>

            {/* Interactive Tab Interface */}
            <div className="flex flex-wrap gap-2 p-1 bg-slate-100 rounded-2xl mb-8">
              {(Object.keys(vehicles) as StudentVehicleKey[]).map((key) => (
                <button
                  key={key}
                  onClick={() => setActiveTab(key)}
                  className={`px-4 py-3 text-xs md:text-sm font-black rounded-xl transition duration-150 ${activeTab === key ? 'bg-white shadow-md text-red-600' : 'text-slate-500 hover:text-slate-800'}`}
                >
                  {vehicles[key].name.split(' / ')[0]}
                </button>
              ))}
            </div>

            <div className="bg-linear-to-br from-slate-50 to-white border border-slate-200 rounded-3xl p-6 md:p-8 hover:border-red-200 transition duration-300">
              <div className="flex flex-wrap justify-between items-start gap-4 mb-6">
                <div>
                  <span className="text-xs font-black uppercase text-red-600 tracking-widest bg-red-50 px-3 py-1 rounded-full border border-red-100">
                    {vehicles[activeTab].insGroup}
                  </span>
                  <h3 className="text-2xl md:text-3xl font-black text-slate-900 mt-2">{vehicles[activeTab].name}</h3>
                </div>
                <div className="bg-emerald-50 text-emerald-700 text-xs px-3 py-1.5 rounded-full font-bold border border-emerald-100">
                  Highly Recommended
                </div>
              </div>

              <p className="text-slate-600 text-sm leading-relaxed mb-6">{vehicles[activeTab].description}</p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-4">
                  <h4 className="text-xs font-black uppercase tracking-widest text-slate-400">Student Vital Statistics</h4>
                  <ul className="space-y-3">
                    <li className="flex justify-between border-b border-slate-100 pb-2 text-sm">
                      <span className="text-slate-500">Engine Displacement</span>
                      <span className="font-bold text-slate-800 text-right">{vehicles[activeTab].engineSize}</span>
                    </li>
                    <li className="flex justify-between border-b border-slate-100 pb-2 text-sm">
                      <span className="text-slate-500">Real Fuel Economy</span>
                      <span className="font-bold text-slate-800">{vehicles[activeTab].mpg}</span>
                    </li>
                    <li className="flex justify-between border-b border-slate-100 pb-2 text-sm">
                      <span className="text-slate-500">Annual Irish Road Tax</span>
                      <span className="font-bold text-red-600">{vehicles[activeTab].roadTax}</span>
                    </li>
                  </ul>
                </div>

                <div className="space-y-4">
                  <h4 className="text-xs font-black uppercase tracking-widest text-slate-400">The Pros & Cons Breakdown</h4>
                  <div>
                    <h5 className="text-xs font-black text-emerald-600 uppercase tracking-wider mb-1">Key Advantages:</h5>
                    <ul className="space-y-1 mb-3">
                      {vehicles[activeTab].pros.map((pro, idx) => (
                        <li key={idx} className="text-sm text-slate-700 font-semibold flex items-center gap-1">
                          <span className="text-emerald-500">✓</span> {pro}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h5 className="text-xs font-black text-red-600 uppercase tracking-wider mb-1">Key Considerations:</h5>
                    <ul className="space-y-1">
                      {vehicles[activeTab].cons.map((con, idx) => (
                        <li key={idx} className="text-sm text-slate-600 flex items-start gap-1">
                          <span className="text-red-400">•</span> {con}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
              
              <div className="mt-6 pt-6 border-t border-slate-100">
                <span className="text-xs font-black text-slate-400 uppercase tracking-wider">Perfect Campus Match:</span>
                <p className="text-sm text-slate-700 font-semibold mt-1">{vehicles[activeTab].bestFor}</p>
              </div>
            </div>
          </section>

          <section id="calculator" className="mb-16 scroll-mt-24 border-t border-slate-100 pt-12">
            <h2 className="text-2xl md:text-3xl font-black mb-4 text-slate-900">4. Cost Analyst: Modifying Your Running Budgets</h2>
            <p className="text-slate-600 mb-8 leading-relaxed">
              When planning your monthly allowance or part-time salary, you must look at the **Total Cost of Ownership (TCO)**, not just the upfront cash paid for the car. Move the sliders below to see how your age, license class, and engine size choice impact your real annual driving costs.
            </p>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 bg-slate-50 p-6 md:p-8 rounded-3xl border border-slate-200/80 mb-8">
              <div className="space-y-6">
                <h4 className="text-sm font-black uppercase tracking-wider text-slate-800">Your Student Variables</h4>
                
                {/* Driver Age Slider */}
                <div>
                  <div className="flex justify-between text-xs font-bold text-slate-500 mb-2">
                    <span>Driver Age:</span>
                    <span className="text-red-600 font-bold">{driverAge} Years Old</span>
                  </div>
                  <input 
                    type="range" 
                    min="17" 
                    max="25" 
                    step="1" 
                    value={driverAge} 
                    onChange={(e) => setDriverAge(Number(e.target.value))}
                    className="w-full accent-red-600 h-2 bg-slate-200 rounded-lg cursor-pointer"
                  />
                  <span className="text-[10px] text-slate-400 block mt-1">Premiums begin to fall significantly after reaching age 21 and 23.</span>
                </div>

                {/* License Selector */}
                <div>
                  <span className="text-xs font-bold text-slate-500 block mb-2">Your Irish License Status:</span>
                  <div className="flex gap-2">
                    <button 
                      onClick={() => setLicenseType('learner')}
                      className={`flex-1 py-2 rounded-xl text-xs font-bold border transition ${licenseType === 'learner' ? 'bg-red-600 text-white border-red-600 shadow-sm' : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-100'}`}
                    >
                      Learner Permit (L-Plates)
                    </button>
                    <button 
                      onClick={() => setLicenseType('full')}
                      className={`flex-1 py-2 rounded-xl text-xs font-bold border transition ${licenseType === 'full' ? 'bg-red-600 text-white border-red-600 shadow-sm' : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-100'}`}
                    >
                      Full Irish License (N-Plates)
                    </button>
                  </div>
                </div>

                {/* Engine Size Selector */}
                <div>
                  <div className="flex justify-between text-xs font-bold text-slate-500 mb-2">
                    <span>Target Engine Size:</span>
                    <span className="text-red-600 font-bold">{engineVolume.toFixed(1)} Litre</span>
                  </div>
                  <input 
                    type="range" 
                    min="1.0" 
                    max="1.6" 
                    step="0.2" 
                    value={engineVolume} 
                    onChange={(e) => setEngineVolume(Number(e.target.value))}
                    className="w-full accent-red-600 h-2 bg-slate-200 rounded-lg cursor-pointer"
                  />
                  <span className="text-[10px] text-slate-400 block mt-1">Engines over 1.4L cause premiums to climb rapidly for younger drivers.</span>
                </div>

                {/* Yearly KM Slider */}
                <div>
                  <div className="flex justify-between text-xs font-bold text-slate-500 mb-2">
                    <span>Expected Annual Travel:</span>
                    <span className="text-red-600 font-bold">{yearlyKM.toLocaleString()} km / Year</span>
                  </div>
                  <input 
                    type="range" 
                    min="5000" 
                    max="20000" 
                    step="1000" 
                    value={yearlyKM} 
                    onChange={(e) => setYearlyKM(Number(e.target.value))}
                    className="w-full accent-red-600 h-2 bg-slate-200 rounded-lg cursor-pointer"
                  />
                </div>
              </div>

              {/* Cost Chart Display */}
              <div className="h-62 lg:h-auto min-h-62 w-full flex flex-col justify-between">
                <div>
                  <h5 className="text-xs font-black uppercase tracking-widest text-slate-400 mb-4 text-center">Annual Cost Projection</h5>
                  <div className="h-48 w-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={calculatedCosts}>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} />
                        <XAxis dataKey="name" tick={{ fontSize: 9 }} />
                        <YAxis tick={{ fontSize: 10 }} />
                        <Tooltip contentStyle={{ borderRadius: '12px', border: 'none', fontSize: 12 }} />
                        <Bar dataKey="Cost" fill="#dc2626" radius={[4, 4, 0, 0]} />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </div>
                <div className="text-center bg-slate-900 text-white px-2 py-4 rounded-2xl border border-slate-800 mt-4">
                  <span className="text-xs font-black uppercase text-slate-400 block tracking-wider">Total Running Cost per Year</span>
                  <span className="text-2xl font-black text-red-500">€{totalCalculatedCost.toLocaleString()}</span>
                  <span className="text-xs text-slate-200 block mt-1">Includes estimated insurance, petrol, tax, and routine basic service.</span>
                </div>
              </div>
            </div>
          </section>

          <section id="checklist" className="mb-16 scroll-mt-24 border-t border-slate-100 pt-12">
            <h2 className="text-2xl md:text-3xl font-black mb-4 text-slate-900">5. Student Pre-Viewing Tool: Avoid Cash Traps & Scams</h2>
            <p className="text-slate-600 mb-8 leading-relaxed">
              If you decide to buy a cheap used car privately, you have to be your own inspector. Tick off these critical pre-purchase items when inspecting any private vehicle in Ireland to calculate its potential purchase safety index.
            </p>

            <div className="bg-slate-950 text-white rounded-3xl p-6 md:p-8 shadow-2xl relative overflow-hidden mb-12">
              <div className="absolute top-0 right-0 w-48 h-48 bg-red-600 rounded-full blur-3xl opacity-10"></div>
              
              <div className="space-y-6">
                <span className="text-sm font-black uppercase tracking-widest text-red-500">Physical Inspection Diagnostic</span>
                <h3 className="text-xl md:text-2xl font-black">Verify the following details before handing over cash:</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {[
                    { key: 'logbook', title: 'Verify original logbook (VRC) matches seller\'s ID', desc: 'Ensure you are buying from the registered owner, not an unregistered middleman.' },
                    { key: 'history', title: 'Check cartell / motorcheck history report', desc: 'Verify the vehicle was never a written-off Cat C or Cat D chassis damage car.' },
                    { key: 'chassis', title: 'Inspect chassis sills and frame for coastal rust', desc: 'Salthill sea air accelerates rust. Reject cars with crumbling sills.' },
                    { key: 'clutch', title: 'Perform stall test in 3rd gear (Manual)', desc: 'Start the car, engage 3rd gear, apply handbrake and release clutch. It must stall.' },
                    { key: 'warningLights', title: 'Ensure engine check & airbag lights clear', desc: 'Dashboard warning lights are an automatic NCT fail.' },
                    { key: 'tyres', title: 'Check tyre tread depth is above 1.6mm', desc: 'Bald tyres require immediate replacement, costing you €200 - €400.' }
                  ].map((chk) => (
                    <button
                      key={chk.key}
                      onClick={() => toggleCheck(chk.key as keyof typeof scamChecks)}
                      className={`p-4 rounded-xl border text-left transition duration-150 flex items-start gap-3 ${scamChecks[chk.key as keyof typeof scamChecks] ? 'border-red-600 bg-red-600/10 text-white' : 'border-slate-800 bg-slate-900/50 hover:border-slate-600 text-slate-300'}`}
                    >
                      <div className={`w-4 h-4 rounded-sm flex items-center justify-center shrink-0 border mt-1 ${scamChecks[chk.key as keyof typeof scamChecks] ? 'bg-red-600 border-red-600 text-white' : 'border-slate-700 bg-transparent'}`}>
                        {scamChecks[chk.key as keyof typeof scamChecks] && '✓'}
                      </div>
                      <div>
                        <span className="text-xs font-bold block mb-1">{chk.title}</span>
                        <span className="text-xs text-slate-400 block leading-relaxed">{chk.desc}</span>
                      </div>
                    </button>
                  ))}
                </div>

                <div className="border-t border-slate-800 pt-6 flex flex-wrap items-center justify-between gap-4">
                  <div>
                    <span className="text-xs font-black uppercase tracking-widest text-slate-300 block mb-1">Diagnostic Safety Rating:</span>
                    <div className={`px-4 py-2 rounded-xl text-sm font-black border uppercase ${calculatedScamRisk.color}`}>
                      {calculatedScamRisk.label}
                    </div>
                  </div>
                  <button
                    onClick={() => setScamChecks({
                      logbook: false, history: false, chassis: false, clutch: false, warningLights: false, tyres: false
                    })}
                    className="text-sm font-bold text-slate-400 hover:text-white transition"
                  >
                    Reset Inspection
                  </button>
                </div>
              </div>
            </div>
          </section>

          <section id="insurance" className="mb-16 scroll-mt-24 border-t border-slate-100 pt-12">
            <h2 className="text-2xl md:text-3xl font-black mb-6 text-slate-900">6. The Insurance Blueprint: 5 Hacks to Slash Student Premiums</h2>
            <div className="prose prose-slate max-w-none text-slate-600 leading-relaxed space-y-4">
              <p>
                Car insurance premiums in Ireland for drivers under 25 are among the highest in Europe. However, with the right strategy and vehicle choice, you can easily reduce your premium by several hundred euros. Use our proven, student-tested strategy to secure affordable coverage:
              </p>
              
              <h3 className="text-lg font-bold text-slate-900 mt-6">Hack #1: Add a Parent as a Named Driver</h3>
              <p>
                Adding a fully licensed parent with a clean driving record and multiple years of no-claims bonus to your student policy is the single most effective way to lower your premiums. Insurance underwriters calculate that a shared vehicle carries a lower statistical risk, which can reduce your initial quote by up to 20%. Ensure you are listed as the main driver, as 'fronting' (claiming a parent is the main driver when they are not) is illegal.
              </p>
              
              <h3 className="text-lg font-bold text-slate-900 mt-6">Hack #2: Install a Certified Security System</h3>
              <p>
                Many high-quality, pre-owned Japanese imports do not leave the factory with passive engine immobilisers because vehicle theft is extremely rare in Japan. When these cars land in Ireland, insurance underwriters identify this as a security risk and may load premiums or refuse to quote. Sourcing your import from a premier dealer like <strong>ShahMotors</strong> ensures your vehicle is fitted with a Thatcham-certified immobiliser and alarm system before handover, with certificate papers supplied.
              </p>

              <h3 className="text-lg font-bold text-slate-900 mt-6">Hack #3: Pay Annually If Possible</h3>
              <p>
                While breaking your insurance bill into monthly installments is tempting for students on limited budgets, finance charges can add up to 15% to the total cost. If you can save or borrow the funds to pay your premium upfront for the year, you will avoid high interest charges.
              </p>

              <h3 className="text-lg font-bold text-slate-900 mt-6">Hack #4: Opt for Telematics (Smart Box / App Policies)</h3>
              <p>
                Specialist young driver policies like BoxyMo, MyPolicy, or AXA's telematics app log your driving metrics—such as braking forces, speeds, and cornering angles—via GPS. Demonstrating smooth, safe driving habits over your first few months will unlock substantial premium discounts and build your no-claims history faster.
              </p>
              
              <h3 className="text-lg font-bold text-slate-900 mt-6">Hack #5: Target vehicles in the lowest insurance groups</h3>
              <p>
                Irish underwriters divide cars into groups from 1 to 50 based on vehicle weight, acceleration times, replacement parts cost, and physical safety profiles. Small, low-power hatchbacks under 1.25L such as the Toyota Yaris, VW Up!, or Nissan Micra reside in groups 2 through 6. This represents a safe baseline compared to a 1.6L or 2.0L diesel saloon which places you into group 15+ immediately, inflating your costs.
              </p>
            </div>
          </section>

          <section id="local-info" className="mb-16 scroll-mt-24 border-t border-slate-100 pt-12">
            <h2 className="text-2xl md:text-3xl font-black mb-6 text-slate-900">7. Surviving Newcastle, Westside, and ATU Dublin Road Parking</h2>
            <div className="prose prose-slate max-w-none text-slate-600 leading-relaxed space-y-4">
              <p>
                Securing your first car in Galway is only half the battle; the other half is finding a place to park it. For students living in popular residential hubs like Newcastle, Westside, Wellpark, or Renmore, parking is a major daily challenge.
              </p>
              <p>
                <strong>University of Galway:</strong> The main university campus is highly restricted. Student parking permits are issued only to those who live outside a specific distance boundary. If you live nearby in Newcastle or Dangan, you will not qualify for a permit. The campus uses active parking enforcement—meaning parking on footpaths, grass verges, or in staff bays without a valid permit will result in an immediate clamp or tow. Sizing down to an ultra-compact city car like the Volkswagen Up! makes finding legal on-street parking in the surrounding estate lanes far easier.
              </p>
              <p>
                <strong>ATU Galway City (Dublin Road):</strong> While ATU has larger designated parking areas, these spaces fill up very quickly before 9:00 AM lectures. Arriving later in the morning often forces you into surrounding estates or pay-and-display bays, where wardens are highly active.
              </p>
              <p>
                <strong>Salthill, Claddagh, and Westside:</strong> Salthill and Claddagh offer beautiful views but present tight, parallel street parking spaces. If you own a large estate or a crossover SUV, parallel-parking on narrow streets with oncoming traffic behind you is highly stressful. Driving a compact hatch with an agile turning radius, like the Nissan Micra, turns parallel-parking into a simple task.
              </p>
            </div>
          </section>

          <section id="faq" className="mb-16 scroll-mt-24 border-t border-slate-100 pt-12">
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
            <h3 className="text-2xl md:text-3xl font-black mb-4">Ready to Secure Your First Student Car?</h3>
            <p className="text-red-50 max-w-xl mx-auto text-sm md:text-base leading-relaxed mb-8 opacity-90">
              Don't compromise on mechanical reliability or safety. Explore our hand-picked range of certified, low-tax, cheap-to-insure first cars. Serviced, NCT-ready, and fitted with approved immobilisers.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <button
                onClick={handleClick}
                disabled={isPending}
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-red-600 font-black rounded-xl hover:bg-slate-50 transition duration-150 shadow-lg disabled:opacity-80 disabled:cursor-not-allowed min-w-70"
              >
                {isPending ? (
                  <>
                    {/* Tailwind Loading Spinner */}
                    <svg
                      className="animate-spin h-5 w-5 text-red-600"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        // removed the invalid disabled={isPending} line from here
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    LOADING...
                  </>
                ) : (
                  "VIEW STUDENT VEHICLES"
                )}
              </button>
              <button 
                onClick={() => {
                  const url = `https://wa.me/353833526830?text=${encodeURIComponent("Hi, I'd like to book a test drive!")}`;
                  window.open(url, "_blank", "noopener,noreferrer");
                }}
                className="px-8 py-4 bg-slate-950 text-white font-black rounded-xl hover:bg-slate-900 transition duration-150 border border-slate-800"
              >
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